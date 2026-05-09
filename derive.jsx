/* ============================================================
   derive.jsx — pure character derivation
   Given a draft (race, klass, subclass, background, level,
   baseStats, asiPicks, skillProfs, equipment), return a fully
   derived character (final stats, AC, HP, prof, slots, sources).
   ============================================================ */

(function (global) {
  const SRD = global.SRD;

  const mod = (s) => Math.floor((s - 10) / 2);
  const sign = (n) => (n >= 0 ? "+" + n : "" + n);
  const profByLevel = (lvl) => 2 + Math.floor((Math.max(1, Math.min(20, lvl)) - 1) / 4);

  // ─── Standard arrays / point-buy ─────────────────────────
  const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
  const POINT_BUY_COST = { 8:0, 9:1, 10:2, 11:3, 12:4, 13:5, 14:7, 15:9 };
  const POINT_BUY_BUDGET = 27;

  const pointBuyCost = (score) => POINT_BUY_COST[score] ?? 999;

  const pointBuyTotal = (stats) =>
    Object.values(stats).reduce((sum, v) => sum + pointBuyCost(v), 0);

  // ─── Race ASI application ────────────────────────────────
  // race.asi is an object like {dex:2} or {str:2,cha:1} or {all:1} or {cha:2,choose:[1,1]}
  // For "choose", `asiPicks` is an array of ability keys to apply +1 to (validated upstream).
  const applyRaceASI = (baseStats, race, asiPicks) => {
    const out = { ...baseStats };
    if (!race) return out;
    const a = race.asi || {};
    if (a.all) {
      for (const k of Object.keys(out)) out[k] += a.all;
    }
    for (const k of ["str","dex","con","int","wis","cha"]) {
      if (a[k]) out[k] += a[k];
    }
    if (a.choose && Array.isArray(asiPicks)) {
      asiPicks.slice(0, a.choose.length).forEach((key, i) => {
        if (out[key] !== undefined) out[key] += a.choose[i];
      });
    }
    return out;
  };

  // ─── Skill source map ─────────────────────────────────────
  // Returns: { skillName: ["class","background","race"] } – ordered list of sources
  const skillSources = (draft) => {
    const sources = {};
    const add = (skill, src) => {
      if (!sources[skill]) sources[skill] = [];
      if (!sources[skill].includes(src)) sources[skill].push(src);
    };
    // Background — automatic, no choice
    const bg = SRD.backgrounds.find(b => b.name === draft.background);
    if (bg) bg.skills.forEach(s => add(s, "background"));
    // Class — chosen from a list
    (draft.classSkills || []).forEach(s => add(s, "class"));
    // Race extras (e.g. half-elf skill versatility) — chosen
    (draft.raceSkills || []).forEach(s => add(s, "race"));
    return sources;
  };

  // ─── HP per class (avg-after-1st rule) ───────────────────
  const hpForClass = (cls, level, conMod) => {
    if (!cls) return 0;
    const hd = cls.hd;
    let hp = hd + conMod;                                  // 1st-level max
    for (let l = 2; l <= level; l++) {
      hp += Math.floor(hd / 2) + 1 + conMod;               // avg roll
    }
    return Math.max(1, hp);
  };

  // ─── AC ───────────────────────────────────────────────────
  // Naive AC: armor decides. If "Unarmored Defense" + class = Barbarian or Monk we apply that.
  const computeAC = (draft, finalStats) => {
    const dex = mod(finalStats.dex);
    const con = mod(finalStats.con);
    const wis = mod(finalStats.wis);
    const armor = (draft.equipment || []).find(e => e.kind === "armor");
    const hasShield = (draft.equipment || []).some(e => e.name === "Shield");
    let ac = 10 + dex;
    if (armor) {
      const a = SRD.armor.find(x => x.name === armor.name);
      if (a) {
        if (a.cat === "Light")  ac = parseInt(a.ac) + dex;
        if (a.cat === "Medium") ac = parseInt(a.ac) + Math.min(2, dex);
        if (a.cat === "Heavy")  ac = parseInt(a.ac);
      }
    } else {
      // Unarmored
      if (draft.klass === "Barbarian") ac = 10 + dex + con;
      if (draft.klass === "Monk")      ac = 10 + dex + wis;
    }
    if (hasShield && draft.klass !== "Monk") ac += 2;
    return ac;
  };

  // ─── Encumbrance ─────────────────────────────────────────
  const carryWeight = (draft) =>
    (draft.equipment || []).reduce((sum, e) => sum + (e.weight || 0) * (e.qty || 1), 0);

  const carryCapacity = (finalStats) => finalStats.str * 15;

  // ─── Spell slots (full caster table for now) ─────────────
  const FULL_CASTERS = ["Bard","Cleric","Druid","Sorcerer","Wizard"];
  const HALF_CASTERS = ["Paladin","Ranger"];

  const spellSlotsFor = (klass, level) => {
    if (FULL_CASTERS.includes(klass)) {
      return SRD.fullCasterSlots[level] || [0,0,0,0,0,0,0,0,0];
    }
    if (HALF_CASTERS.includes(klass) && level >= 2) {
      // Half caster = full caster table at floor((level)/2) +1 ish; approximate via halved level
      const eff = Math.floor((level + 1) / 2);
      return SRD.fullCasterSlots[eff] || [0,0,0,0,0,0,0,0,0];
    }
    return [0,0,0,0,0,0,0,0,0];
  };

  // ─── Class & subclass features unlocked at level ─────────
  // Pulls base class features for the level, then merges in the chosen
  // subclass's features (if any). Subclass entries are objects of the
  // shape { name, blurb, features:[{lvl, name, text}] }.
  const featuresAtLevel = (klass, subclass, level) => {
    const cls = SRD.classes.find(c => c.name === klass);
    if (!cls) return [];
    const base = (cls.features || []).filter(f => f.lvl <= level);
    if (!subclass) return base;
    const sub = (cls.subclasses || []).find(s => s && s.name === subclass);
    if (!sub) return base;
    const subF = (sub.features || []).filter(f => f.lvl <= level)
      .map(f => ({ ...f, sub: sub.name })); // tag with subclass name for display
    return [...base, ...subF];
  };

  // ─── Master derive ───────────────────────────────────────
  const derive = (draft) => {
    const race = SRD.races.find(r => r.name === draft.race);
    const cls  = SRD.classes.find(c => c.name === draft.klass);
    const bg   = SRD.backgrounds.find(b => b.name === draft.background);

    const baseStats = draft.stats || { str:10,dex:10,con:10,int:10,wis:10,cha:10 };
    const finalStats = applyRaceASI(baseStats, race, draft.asiPicks);

    const level = Math.max(1, Math.min(20, draft.level || 1));
    const prof = profByLevel(level);

    const sources = skillSources(draft);
    const skillProfs = Object.keys(sources);

    const conMod = mod(finalStats.con);
    const hp = hpForClass(cls, level, conMod);
    const ac = computeAC(draft, finalStats);
    const carry = carryWeight(draft);
    const cap = carryCapacity(finalStats);
    const slots = spellSlotsFor(draft.klass, level);
    const features = featuresAtLevel(draft.klass, draft.subclass, level);

    // Save mods
    const saves = {};
    for (const a of ["str","dex","con","int","wis","cha"]) {
      const isProf = (cls?.saves || []).includes(a);
      saves[a] = mod(finalStats[a]) + (isProf ? prof : 0);
    }

    // Skill mods
    const skills = {};
    for (const s of SRD.skills) {
      const isProf = skillProfs.includes(s.name);
      skills[s.name] = mod(finalStats[s.ability]) + (isProf ? prof : 0);
    }

    return {
      race, cls, bg,
      level, prof,
      baseStats, finalStats,
      hp, ac, conMod,
      carry, cap, encumbered: carry > cap,
      slots, features,
      saves, skills,
      skillSources: sources,
      skillProfs
    };
  };

  global.Derive = {
    mod, sign, profByLevel,
    STANDARD_ARRAY, POINT_BUY_COST, POINT_BUY_BUDGET,
    pointBuyCost, pointBuyTotal,
    applyRaceASI, skillSources, hpForClass, computeAC,
    carryWeight, carryCapacity, spellSlotsFor, featuresAtLevel,
    derive
  };
})(window);

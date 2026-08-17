/*
 * Shared character sheet helpers.
 *
 * These are the bits that are identical (or near-identical) across every
 * character page today. Character pages still own their own updateDashboard,
 * rollAttack, shortRest/longRest, and any class-specific resource handlers.
 *
 * The standard skill list lives here too so each character only has to
 * declare which skills they're proficient in, not redeclare the table.
 */

// --- ABILITY MATH ---
function getMod(score) {
    return Math.floor((score - 10) / 2);
}

function fmtSign(n) {
    return n >= 0 ? "+" + n : "" + n;
}

// --- DICE ---
function rollD20() {
    const roll = Math.floor(Math.random() * 20) + 1;
    return { roll, isCrit: roll === 20, isFail: roll === 1 };
}

function rollDice(count, faces) {
    const rolls = [];
    let total = 0;
    for (let i = 0; i < count; i++) {
        const r = Math.floor(Math.random() * faces) + 1;
        rolls.push(r);
        total += r;
    }
    return { rolls, total };
}

// Parse a dice string like "2d8+3" or "1d10-1" into its parts.
function parseDice(diceStr) {
    const match = diceStr.match(/(\d+)d(\d+)([+-]\d+)?/);
    if (!match) return null;
    return {
        count: parseInt(match[1]),
        faces: parseInt(match[2]),
        mod:   match[3] ? parseInt(match[3]) : 0
    };
}

// Roll a dice string. On a crit the dice count is doubled. Returns
// { total, formula } where formula is a "1+2+3+MOD" style string.
function parseAndRoll(diceStr, isCrit) {
    const parsed = parseDice(diceStr);
    if (!parsed) return { total: 0, formula: 'error' };
    let count = parsed.count;
    if (isCrit) count *= 2;
    const { rolls, total: rollSum } = rollDice(count, parsed.faces);
    const total = rollSum + parsed.mod;
    let formula = rolls.join('+');
    if (parsed.mod !== 0) formula += parsed.mod > 0 ? `+${parsed.mod}` : parsed.mod;
    return { total, formula };
}

// --- COMBAT LOG ---
function logMsg(html) {
    const log = document.getElementById('combat-log');
    if (!log) return;
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `> ${html}`;
    log.prepend(entry);
}

function clearLog() {
    const log = document.getElementById('combat-log');
    if (!log) return;
    log.innerHTML = '<div class="log-entry">> Log cleared.</div>';
}

// --- HP BAR ---
// Updates #hp-bar to reflect #current-hp / #max-hp, applying warning/danger
// classes at 50%/25% (or whatever thresholds the caller passes). If a
// #hp-bar-temp element exists and #temp-hp-display has a value, it positions
// a blue temp-HP segment after the main bar.
function updateHpBar(opts) {
    opts = opts || {};
    const warningPct = opts.warningPct != null ? opts.warningPct : 50;
    const dangerPct  = opts.dangerPct  != null ? opts.dangerPct  : 25;

    const curInput  = document.getElementById('current-hp');
    const maxSpan   = document.getElementById('max-hp');
    const greenBar  = document.getElementById('hp-bar');
    if (!curInput || !maxSpan || !greenBar) return;

    const max = parseInt(maxSpan.innerText) || 1;
    let cur = parseInt(curInput.value) || 0;
    if (cur > max) { cur = max; curInput.value = max; }
    if (cur < 0)   cur = 0;

    const greenPct = Math.max(0, (cur / max) * 100);
    greenBar.style.width = greenPct + '%';
    greenBar.classList.remove('warning', 'danger');
    if (greenPct <= dangerPct)       greenBar.classList.add('danger');
    else if (greenPct <= warningPct) greenBar.classList.add('warning');

    // Optional temp HP overlay
    const blueBar  = document.getElementById('hp-bar-temp');
    const thpBadge = document.getElementById('temp-hp-display');
    if (blueBar && thpBadge) {
        let thp = 0;
        if (thpBadge.style.display !== 'none') {
            thp = parseInt(thpBadge.innerText.replace('+', '')) || 0;
        }
        if (thp > 0) {
            const tempPct = (thp / max) * 100;
            blueBar.style.left  = greenPct + '%';
            blueBar.style.width = tempPct  + '%';
            blueBar.style.display = 'block';
        } else {
            blueBar.style.width = '0%';
            blueBar.style.display = 'none';
        }
    }
}

// --- STANDARD 5E SKILL TABLE ---
const ALL_SKILLS = [
    { name: "Acrobatics",      ability: "dex" },
    { name: "Animal Handling", ability: "wis" },
    { name: "Arcana",          ability: "int" },
    { name: "Athletics",       ability: "str" },
    { name: "Deception",       ability: "cha" },
    { name: "History",         ability: "int" },
    { name: "Insight",         ability: "wis" },
    { name: "Intimidation",    ability: "cha" },
    { name: "Investigation",   ability: "int" },
    { name: "Medicine",        ability: "wis" },
    { name: "Nature",          ability: "int" },
    { name: "Perception",      ability: "wis" },
    { name: "Performance",     ability: "cha" },
    { name: "Persuasion",      ability: "cha" },
    { name: "Religion",        ability: "int" },
    { name: "Sleight of Hand", ability: "dex" },
    { name: "Stealth",         ability: "dex" },
    { name: "Survival",        ability: "wis" }
];

// --- ABILITY/SKILL/SAVE/FEATURE RENDERERS ---
// Each operates on the standard DOM IDs that both character pages share.

// Writes the six ability score boxes (#str / #str-mod / etc.) and #prof-bonus.
// `data` must contain str/dex/con/int/wis/cha numeric scores and a `prof` field.
// Returns the computed mods so the caller can keep using them.
function renderAbilities(data) {
    const mods = {
        str: getMod(data.str), dex: getMod(data.dex), con: getMod(data.con),
        int: getMod(data.int), wis: getMod(data.wis), cha: getMod(data.cha)
    };
    ['str','dex','con','int','wis','cha'].forEach(key => {
        const el    = document.getElementById(key);
        const elMod = document.getElementById(`${key}-mod`);
        if (el)    el.innerText    = data[key];
        if (elMod) elMod.innerText = fmtSign(mods[key]);
    });
    const profEl = document.getElementById('prof-bonus');
    if (profEl) profEl.innerText = fmtSign(data.prof);
    return mods;
}

// Render the Saving Throws block. `saves` is an array of
//   { name: "Strength", mod: -1, prof: false, extra?: number, suffix?: string }
// `extra` is added to the total (e.g. Aura of Protection); `suffix` is appended
// to the total text (e.g. " + 1d4" while Bless is up).
function renderSaves(containerId, saves, profBonus) {
    const c = document.getElementById(containerId);
    if (!c) return;
    let html = '';
    saves.forEach(s => {
        const total = s.mod + (s.prof ? profBonus : 0) + (s.extra || 0);
        const cls = s.prof ? 'skill-prof' : '';
        const text = fmtSign(total) + (s.suffix || '');
        html += `<div class="skill-row"><span class="${cls}">${s.name}</span> <span class="${cls}">${text}</span></div>`;
    });
    c.innerHTML = html;
}

// Render the Skills block. `proficient` is an array of skill names
// (matching ALL_SKILLS[i].name). `bonusFn(skill, mod)` is optional and
// returns an extra additive bonus per skill.
function renderSkills(containerId, mods, profBonus, proficient, bonusFn) {
    const c = document.getElementById(containerId);
    if (!c) return;
    let html = '';
    ALL_SKILLS.forEach(skill => {
        const baseMod = mods[skill.ability];
        const isProf  = proficient.includes(skill.name);
        const extra   = bonusFn ? bonusFn(skill.name, baseMod) : 0;
        const total   = baseMod + (isProf ? profBonus : 0) + extra;
        const cls     = isProf ? 'skill-prof' : '';
        const star    = isProf ? ' ★' : '';
        html += `<div class="skill-row"><span class="${cls}">${skill.name}${star}</span> <span class="${cls}">${fmtSign(total)}</span></div>`;
    });
    c.innerHTML = html;
}

// Render the Features list. `features` is an accumulated array of
//   { name: "Lay on Hands", source: "Paladin 1", desc: "<HTML>" }
function renderFeatures(containerId, features) {
    const c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = '';
    features.forEach(f => {
        const item = document.createElement('div');
        item.className = 'feature-item';
        const source = f.source || 'Class';
        item.innerHTML = `<span class="feat-name">${f.name} <span class="feat-source">${source}</span></span><div class="feat-desc">${f.desc}</div>`;
        c.appendChild(item);
    });
}

// Walk levels 1..lvl and accumulate every entry's `features` array into one list.
function accumulateFeatures(levels, lvl) {
    const out = [];
    for (let i = 1; i <= lvl; i++) {
        if (levels[i] && levels[i].features) {
            for (const f of levels[i].features) out.push(f);
        }
    }
    return out;
}

// --- IMAGE FALLBACK ---
// Attach a generic placeholder to broken images so a missing asset doesn't
// leave a gaping hole in the sheet.
function installImageFallback(placeholder) {
    const fallback = placeholder ||
        'https://placehold.co/400x300/1c1917/d97706?text=Image+Missing';
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function () { this.src = fallback; };
    });
}

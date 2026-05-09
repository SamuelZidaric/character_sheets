/* ============================================================
   app.jsx — shell for The Codex
   Loaded after: SRD, MY_CHARS, Derive, gen-steps (Step* globals),
   tweaks-panel (TweaksPanel + useTweaks).
   ============================================================ */

const { useState, useEffect, useMemo, useRef } = React;
const { mod, sign, profByLevel } = Derive;

// ─── Persistence ────────────────────────────────────────
const STORE_KEY = "dnd_codex_v2";
const loadStore = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; } };
const saveStore = (s) => { try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch {} };
const useStore = () => {
  const [store, setStore] = useState(() => {
    const s = loadStore();
    if (!s.drafts) s.drafts = [];
    if (!s.activeDraftId) s.activeDraftId = null;
    return s;
  });
  useEffect(() => saveStore(store), [store]);
  return [store, setStore];
};

// ─── Hash route ─────────────────────────────────────────
const useHashRoute = () => {
  const [route, setRoute] = useState(() => location.hash.slice(1) || "home");
  useEffect(() => {
    const h = () => setRoute(location.hash.slice(1) || "home");
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  const go = (r) => { location.hash = r; };
  return [route, go];
};

// ─── Free-form dice expression: 1d20+5, 2d6, 4d6kh3 ─────
const parseDice = (str) => {
  const s = String(str).replace(/\s/g, "").toLowerCase();
  // segment + segment ... e.g. 2d6+1d4+3
  const segs = s.split(/(?=[+-])/);
  const parts = [];
  for (const seg of segs) {
    const m = seg.match(/^([+-]?)(\d+)?d(\d+)(kh\d+|kl\d+)?$/);
    if (m) {
      parts.push({
        sign: m[1] === "-" ? -1 : 1,
        n: parseInt(m[2] || "1"),
        sides: parseInt(m[3]),
        keep: m[4] || null
      });
      continue;
    }
    const m2 = seg.match(/^([+-]?\d+)$/);
    if (m2) {
      parts.push({ sign: 1, flat: parseInt(m2[1]) });
      continue;
    }
    return null;
  }
  return parts.length ? parts : null;
};

const rollExpr = (parts) => {
  let total = 0;
  const detail = [];
  for (const p of parts) {
    if (p.flat !== undefined) {
      total += p.flat;
      detail.push((p.flat >= 0 ? "+" : "") + p.flat);
      continue;
    }
    const rolls = [];
    for (let i = 0; i < p.n; i++) rolls.push(1 + Math.floor(Math.random() * p.sides));
    let kept = rolls.slice();
    if (p.keep) {
      const m = p.keep.match(/^k([hl])(\d+)$/);
      if (m) {
        const k = parseInt(m[2]);
        kept = rolls.slice().sort((a, b) => m[1] === "h" ? b - a : a - b).slice(0, k);
      }
    }
    const sub = kept.reduce((a, b) => a + b, 0) * p.sign;
    total += sub;
    detail.push((p.sign > 0 ? "+" : "-") + p.n + "d" + p.sides + (p.keep ? p.keep : "") + " [" + rolls.join(",") + (kept.length !== rolls.length ? "→" + kept.join(",") : "") + "]");
  }
  return { total, detail: detail.join(" ").replace(/^\+/, "") };
};

// ─── Dice tray ──────────────────────────────────────────
function DiceTray({ open, onClose }) {
  const [history, setHistory] = useState([]);
  const [expr, setExpr] = useState("1d20");
  const [adv, setAdv] = useState("normal"); // normal | adv | dis
  const inputRef = useRef(null);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  const doRoll = (rawExpr, advMode) => {
    const e = rawExpr || expr;
    const a = advMode || adv;
    let parts = parseDice(e);
    if (!parts) return;
    // adv/dis: if a 1d20 is in the expression, swap it for 2d20kh1 / kl1
    if (a !== "normal") {
      parts = parts.map(p => (p.sides === 20 && p.n === 1 && !p.keep) ? { ...p, n: 2, keep: a === "adv" ? "kh1" : "kl1" } : p);
    }
    const r = rollExpr(parts);
    setHistory(h => [{ expr: e, adv: a, ...r, t: Date.now() }, ...h].slice(0, 30));
  };
  if (!open) return null;
  return (
    <div className="dice-tray" data-screen-label="Dice">
      <div className="dice-tray-head">
        <span className="dice-tray-title">Dice</span>
        <button className="x-btn" onClick={onClose} aria-label="Close">×</button>
      </div>
      <form className="dice-tray-form" onSubmit={(e) => { e.preventDefault(); doRoll(); }}>
        <input ref={inputRef} value={expr} onChange={e => setExpr(e.target.value)} className="dice-input" placeholder="1d20+5, 2d6, 4d6kh3, 1d8+1d4+2"/>
        <button type="submit" className="dice-roll-btn">Roll</button>
      </form>
      <div className="dice-adv">
        {[["dis","Dis"],["normal","Normal"],["adv","Adv"]].map(([k,l]) =>
          <button key={k} className={"dice-adv-tab" + (adv === k ? " on" : "")} onClick={() => setAdv(k)}>{l}</button>
        )}
      </div>
      <div className="dice-quick">
        {["1d4","1d6","1d8","1d10","1d12","1d20","1d100","2d6","4d6kh3"].map(d =>
          <button key={d} className="dice-chip" onClick={() => { setExpr(d); doRoll(d); }}>{d}</button>
        )}
      </div>
      <div className="dice-history">
        {history.length === 0 && <div className="dice-empty">No rolls yet. Press <kbd>d</kbd> anywhere to toggle.</div>}
        {history.map((h, i) => (
          <div key={i} className="dice-row">
            <div className="dice-row-top">
              <span className="dice-expr">{h.expr}{h.adv !== "normal" ? " · " + h.adv : ""}</span>
              <span className="dice-total">{h.total}</span>
            </div>
            <div className="dice-detail muted small">{h.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Default draft ──────────────────────────────────────
const blankDraft = () => ({
  id: "draft-" + Math.random().toString(36).slice(2, 9),
  name: "",
  race: "Human",
  klass: "Fighter",
  subclass: "",
  background: "Soldier",
  alignment: "True Neutral",
  level: 1,
  appliedLevel: 1,                                          // committed level
  stats: { str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 },
  statMode: "pointBuy",
  asiPicks: [],
  classSkills: [],
  raceSkills: [],
  equipment: [],
  notes: "",
  created: Date.now()
});

// ─── Generator ──────────────────────────────────────────
const STEPS = [
  { id: "basics",     name: "Basics",     comp: () => StepBasics },
  { id: "race",       name: "Race",       comp: () => StepRace },
  { id: "class",      name: "Class",      comp: () => StepClass },
  { id: "background", name: "Background", comp: () => StepBackground },
  { id: "stats",      name: "Abilities",  comp: () => StepStats },
  { id: "skills",     name: "Skills",     comp: () => StepSkills },
  { id: "equipment",  name: "Equipment",  comp: () => StepEquipment },
  { id: "review",     name: "Review",     comp: () => StepReview }
];

function Generator({ store, setStore, onClose }) {
  const drafts = store.drafts || [];
  const [activeId, setActiveId] = useState(store.activeDraftId || (drafts[0] && drafts[0].id) || null);
  const [stepIdx, setStepIdx] = useState(0);

  const activeDraft = drafts.find(d => d.id === activeId);

  useEffect(() => {
    if (!activeDraft && drafts.length === 0) {
      const fresh = blankDraft();
      setStore(s => ({ ...s, drafts: [...(s.drafts || []), fresh], activeDraftId: fresh.id }));
      setActiveId(fresh.id);
    }
  }, []);

  const set = (patch) => setStore(s => ({ ...s, drafts: (s.drafts || []).map(d => d.id === activeId ? { ...d, ...patch } : d) }));
  const newDraft = () => { const f = blankDraft(); setStore(s => ({ ...s, drafts: [...(s.drafts || []), f], activeDraftId: f.id })); setActiveId(f.id); setStepIdx(0); };
  const switchDraft = (id) => { setActiveId(id); setStore(s => ({ ...s, activeDraftId: id })); };
  const deleteDraft = (id) => { if (!confirm("Delete this character?")) return; setStore(s => ({ ...s, drafts: (s.drafts || []).filter(d => d.id !== id) })); if (id === activeId) setActiveId(null); };

  const exportJSON = () => {
    if (!activeDraft) return;
    const blob = new Blob([JSON.stringify(activeDraft, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = (activeDraft.name || "character").replace(/\s+/g, "_") + ".json"; a.click();
    URL.revokeObjectURL(url);
  };

  const printSheet = () => {
    if (!activeDraft) return;
    sessionStorage.setItem("codex_print_draft", JSON.stringify(activeDraft));
    window.open("print-sheet.html", "_blank");
  };

  if (!activeDraft) return <div className="empty-state">Loading…</div>;
  const StepComp = STEPS[stepIdx].comp();
  const isPreview = activeDraft.level !== (activeDraft.appliedLevel || 1);

  return (
    <div className="gen-shell">
      <div className="gen-side">
        <div className="gen-side-head">
          <span>Drafts</span>
          <button className="ghost-btn" onClick={newDraft}>＋ New</button>
        </div>
        <div className="gen-draft-list">
          {drafts.map(d => (
            <div key={d.id} className={"gen-draft" + (d.id === activeId ? " active" : "")} onClick={() => switchDraft(d.id)}>
              <div className="gen-draft-name">{d.name || <em className="muted">unnamed</em>}</div>
              <div className="gen-draft-meta muted">{d.race} {d.klass} • Lv {d.appliedLevel || d.level}</div>
              <button className="x-btn small" onClick={(e) => { e.stopPropagation(); deleteDraft(d.id); }}>×</button>
            </div>
          ))}
          {drafts.length === 0 && <div className="muted small">No drafts yet.</div>}
        </div>

        <div className="gen-stepper">
          {STEPS.map((s, i) => (
            <button key={s.id} className={"step-tab" + (i === stepIdx ? " on" : "")} onClick={() => setStepIdx(i)} title="Jump to step (any order)">
              <span className="step-num">{i + 1}</span>
              <span className="step-name">{s.name}</span>
            </button>
          ))}
        </div>

        <div className="gen-actions">
          <div className="field">
            <span>
              Level <strong>{activeDraft.level}</strong>
              {isPreview && <em className="muted small"> (preview — applied: Lv {activeDraft.appliedLevel || 1})</em>}
            </span>
            <input type="range" min="1" max="20" value={activeDraft.level} onChange={e => set({ level: parseInt(e.target.value) })}/>
            <div className="level-actions">
              {isPreview ? (
                <>
                  <button className="solid-btn small" onClick={() => set({ appliedLevel: activeDraft.level })}>Apply Lv {activeDraft.level}</button>
                  <button className="ghost-btn small" onClick={() => set({ level: activeDraft.appliedLevel || 1 })}>Revert</button>
                </>
              ) : <span className="muted small">Move slider to preview a level.</span>}
            </div>
          </div>
          <button className="ghost-btn" onClick={exportJSON}>Export JSON</button>
          <button className="ghost-btn" onClick={printSheet}>Print Sheet ↗</button>
          <button className="ghost-btn" onClick={onClose}>Done</button>
        </div>
      </div>
      <div className="gen-main">
        <div className="gen-step-head">
          <h3>{STEPS[stepIdx].name}</h3>
          <div className="gen-step-nav">
            <button disabled={stepIdx === 0} onClick={() => setStepIdx(i => i - 1)}>← Prev</button>
            <span className="muted small">Step {stepIdx + 1} of {STEPS.length}</span>
            <button disabled={stepIdx === STEPS.length - 1} onClick={() => setStepIdx(i => i + 1)}>Next →</button>
          </div>
        </div>
        <div className="gen-step-body">
          <StepComp draft={activeDraft} set={set}/>
        </div>
      </div>
    </div>
  );
}

// ─── Database browser ───────────────────────────────────
const DB_TABS = [
  { id: "races",       label: "Races / Species" },
  { id: "classes",     label: "Classes" },
  { id: "backgrounds", label: "Backgrounds" },
  { id: "spells",      label: "Spells" },
  { id: "feats",       label: "Feats" },
  { id: "weapons",     label: "Weapons" },
  { id: "armor",       label: "Armor" },
  { id: "items",       label: "Magic Items" },
  { id: "monsters",    label: "Bestiary" },
  { id: "conditions",  label: "Conditions" },
  { id: "sections",    label: "Rules" },
  { id: "planes",      label: "Planes" }
];

const renderEntry = (tab, entry) => {
  switch (tab) {
    case "races":      return <>
      <div className="db-name">{entry.name}</div>
      <div className="db-meta">{entry.size} • {entry.speed} ft • {entry.asiText}</div>
      <div className="db-blurb">{entry.blurb}</div>
      <div className="tag-row">{entry.traits.slice(0,4).map(t => <span key={t} className="tag">{t}</span>)}</div>
      {entry.subraces && entry.subraces.length > 0 && <div className="muted small">Subraces: {entry.subraces.map(s => s.name).join(", ")}</div>}
    </>;
    case "classes":    return <>
      <div className="db-name">{entry.name}</div>
      <div className="db-meta">d{entry.hd} • {entry.primary.map(s => s.toUpperCase()).join("/")} • Saves {entry.saves.map(s => s.toUpperCase()).join(" / ")}</div>
      <div className="db-blurb">{entry.blurb}</div>
      <div className="muted small">Subclasses: {entry.subclasses.map(s => typeof s === "string" ? s : s.name).join(", ")}</div>
    </>;
    case "backgrounds":return <>
      <div className="db-name">{entry.name}</div>
      <div className="db-meta">{entry.skills.join(" • ")}</div>
      <div className="db-blurb">{entry.blurb}</div>
      <div className="muted small">Feature: {entry.feature}</div>
    </>;
    case "spells":     return <>
      <div className="db-name">
        {entry.name} <span className="db-badge">{entry.level === 0 ? "Cantrip" : "Lv " + entry.level}</span>
        {entry.ritual && <span className="db-badge" style={{marginLeft:4}}>Ritual</span>}
        {entry.concentration && <span className="db-badge" style={{marginLeft:4}}>Conc.</span>}
      </div>
      <div className="db-meta">{entry.school} • {entry.cast} • {entry.range} • {entry.duration}</div>
      <div className="db-blurb">{entry.blurb}</div>
      <div className="tag-row">{entry.classes.map(c => <span key={c} className="tag">{c}</span>)}</div>
    </>;
    case "feats":      return <><div className="db-name">{entry.name}</div><div className="db-blurb">{entry.blurb}</div></>;
    case "weapons":    return <>
      <div className="db-name">{entry.name}</div>
      <div className="db-meta">{entry.cat} • {entry.dmg} • {entry.weight} lb</div>
      <div className="db-blurb">{entry.props}</div>
    </>;
    case "armor":      return <>
      <div className="db-name">{entry.name}</div>
      <div className="db-meta">{entry.cat} • AC {entry.ac} • {entry.weight} lb</div>
      <div className="db-blurb">Stealth: {entry.stealth}</div>
    </>;
    case "items":      return <>
      <div className="db-name">{entry.name} <span className="db-badge">{entry.rarity}</span></div>
      <div className="db-meta">{entry.type || "Wondrous Item"} • {entry.attune ? (entry.attuneDesc || "Attunement required") : "No attunement"}</div>
      <div className="db-blurb">{entry.blurb}</div>
    </>;
    case "monsters":   {
      const speedStr = entry.speed && typeof entry.speed === "object"
        ? Object.entries(entry.speed).map(([k,v]) => k === "walk" ? `${v} ft` : `${k} ${v} ft`).join(", ")
        : "";
      const subtitle = [
        entry.size, entry.type, entry.subtype && `(${entry.subtype})`, entry.alignment
      ].filter(Boolean).join(" ");
      return <>
        <div className="db-name">{entry.name} <span className="db-badge">CR {entry.cr}</span></div>
        <div className="db-meta">{subtitle}</div>
        <div className="db-meta">HP {entry.hp}{entry.hitDice ? ` (${entry.hitDice})` : ""} • AC {entry.ac}{entry.armorDesc ? ` (${entry.armorDesc})` : ""}{speedStr ? ` • ${speedStr}` : ""}</div>
        <div className="db-blurb">{entry.blurb}</div>
        {(entry.specialAbilities || []).length > 0 && (
          <div className="muted small">Traits: {entry.specialAbilities.map(a => a.name).join(", ")}</div>
        )}
        {(entry.actions || []).length > 0 && (
          <div className="muted small">Actions: {entry.actions.map(a => a.name).join(", ")}</div>
        )}
        {(entry.legendaryActions || []).length > 0 && (
          <div className="muted small" style={{color:"var(--accent, currentColor)"}}>Legendary: {entry.legendaryActions.map(a => a.name).join(", ")}</div>
        )}
        {entry.environments && entry.environments.length > 0 && (
          <div className="tag-row">{entry.environments.slice(0,4).map(e => <span key={e} className="tag">{e}</span>)}</div>
        )}
      </>;
    }
    case "conditions": return <>
      <div className="db-name">{entry.name}</div>
      <div className="db-blurb" style={{whiteSpace:"pre-wrap"}}>{entry.desc}</div>
    </>;
    case "sections":   return <>
      <div className="db-name">{entry.name} {entry.parent && <span className="db-badge">{entry.parent}</span>}</div>
      <div className="db-blurb">{entry.blurb}</div>
    </>;
    case "planes":     return <>
      <div className="db-name">{entry.name}</div>
      <div className="db-blurb">{entry.blurb}</div>
    </>;
    default: return null;
  }
};

// ─── Detail modal ───────────────────────────────────────
// Reusable abilities list block (Traits / Actions / etc).
const AbilityList = ({ title, items, tag }) => (items && items.length > 0) ? (
  <div className="detail-section">
    <h4>{title}{tag && <span className="legendary-tag">{tag}</span>}</h4>
    {items.map((it, i) => (
      <div key={i} className="ability-block">
        <span className="ab-name">{it.name}.</span>{" "}
        <span className="ab-desc">{it.desc}</span>
      </div>
    ))}
  </div>
) : null;

const KV = ({ k, v }) => v != null && v !== "" ? (
  <div className="kv-line"><span className="k">{k}</span>{v}</div>
) : null;

function MonsterDetail({ m }) {
  const speedStr = m.speed && typeof m.speed === "object"
    ? Object.entries(m.speed).map(([k, v]) => k === "walk" ? `${v} ft` : `${k} ${v} ft`).join(", ")
    : "";
  const stats = m.stats || {};
  const saves = m.saves || {};
  const skills = m.skills || {};
  const hasImg = !!m.img;

  return (
    <div className={"detail-body" + (hasImg ? " has-img" : "")}>
      {hasImg && <img src={m.img} alt={m.name} className="detail-img" />}
      <div>
        <KV k="AC"    v={`${m.ac}${m.armorDesc ? ` (${m.armorDesc})` : ""}`} />
        <KV k="HP"    v={`${m.hp}${m.hitDice ? ` (${m.hitDice})` : ""}`} />
        <KV k="Speed" v={speedStr || "—"} />

        <div className="stat-grid-6">
          {[["str", "STR"], ["dex", "DEX"], ["con", "CON"], ["int", "INT"], ["wis", "WIS"], ["cha", "CHA"]].map(([k, lbl]) => (
            <div key={k} className="stat-cell">
              <div className="ab">{lbl}</div>
              <div className="v">{stats[k] ?? "?"}</div>
              <div className="m">({sign(mod(stats[k] || 10))})</div>
            </div>
          ))}
        </div>

        {Object.keys(saves).length > 0 && (
          <KV k="Saving Throws" v={Object.entries(saves).map(([k, v]) => `${k.toUpperCase()} ${sign(typeof v === "number" ? v : parseInt(v))}`).join(", ")} />
        )}
        {Object.keys(skills).length > 0 && (
          <KV k="Skills" v={Object.entries(skills).map(([k, v]) => `${k.charAt(0).toUpperCase() + k.slice(1)} ${sign(typeof v === "number" ? v : parseInt(v))}`).join(", ")} />
        )}
        <KV k="Vulnerabilities"        v={m.vulnerabilities} />
        <KV k="Resistances"            v={m.resistances} />
        <KV k="Damage Immunities"      v={m.immunities} />
        <KV k="Condition Immunities"   v={m.conditionImmunities} />
        <KV k="Senses"                 v={m.senses} />
        <KV k="Languages"              v={m.languages} />
        <KV k="Challenge"              v={`CR ${m.cr}`} />

        <AbilityList title="Traits"        items={m.specialAbilities} />
        <AbilityList title="Actions"       items={m.actions} />
        <AbilityList title="Bonus Actions" items={m.bonusActions} />
        <AbilityList title="Reactions"     items={m.reactions} />
        {(m.legendaryActions || []).length > 0 && (
          <div className="detail-section">
            <h4>Legendary Actions <span className="legendary-tag">Legendary</span></h4>
            {m.legendaryDesc && <p>{m.legendaryDesc}</p>}
            {m.legendaryActions.map((it, i) => (
              <div key={i} className="ability-block">
                <span className="ab-name">{it.name}.</span>{" "}
                <span className="ab-desc">{it.desc}</span>
              </div>
            ))}
          </div>
        )}

        {(m.environments || []).length > 0 && (
          <div className="detail-section">
            <h4>Environments</h4>
            <div className="tag-row">{m.environments.map(e => <span key={e} className="tag">{e}</span>)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function SpellDetail({ s }) {
  return (
    <div className="detail-body">
      <div>
        <KV k="Casting Time" v={s.cast} />
        <KV k="Range"        v={s.range} />
        <KV k="Components"   v={`${s.components || ""}${s.material ? ` (${s.material})` : ""}`} />
        <KV k="Duration"     v={s.duration} />
        <KV k="School"       v={`${s.school}${s.ritual ? " · Ritual" : ""}${s.concentration ? " · Concentration" : ""}`} />
        {s.desc && <div className="detail-section"><p>{s.desc}</p></div>}
        {s.higher_level && <div className="detail-section"><h4>At Higher Levels</h4><p>{s.higher_level}</p></div>}
        {(s.classes || []).length > 0 && (
          <div className="detail-section">
            <h4>Classes</h4>
            <div className="tag-row">{s.classes.map(c => <span key={c} className="tag">{c}</span>)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function ItemDetail({ it }) {
  return (
    <div className="detail-body">
      <div>
        <KV k="Type"       v={it.type} />
        <KV k="Rarity"     v={it.rarity} />
        <KV k="Attunement" v={it.attune ? (it.attuneDesc || "Required") : "Not required"} />
        {it.desc && <div className="detail-section"><p>{it.desc}</p></div>}
      </div>
    </div>
  );
}

function RaceDetail({ r }) {
  return (
    <div className="detail-body">
      <div>
        <KV k="Size"     v={r.size} />
        <KV k="Speed"    v={r.speed ? `${r.speed} ft` : null} />
        <KV k="ASI"      v={r.asiText} />
        <KV k="Languages"v={(r.languages || []).join(", ")} />
        {r.blurb && <div className="detail-section"><p>{r.blurb}</p></div>}
        {(r.traits || []).length > 0 && (
          <div className="detail-section"><h4>Traits</h4><ul>{r.traits.map((t, i) => <li key={i}>{t}</li>)}</ul></div>
        )}
        {(r.subraces || []).length > 0 && (
          <div className="detail-section">
            <h4>Subraces</h4>
            {r.subraces.map(sr => (
              <div key={sr.name} className="ability-block">
                <div className="ab-name">{sr.name}{sr.asiText ? ` — ${sr.asiText}` : ""}</div>
                {sr.blurb && <div className="ab-desc" style={{ fontStyle: "italic", display: "block", margin: "4px 0" }}>{sr.blurb}</div>}
                {sr.traits && <ul>{sr.traits.map((t, i) => <li key={i}>{t}</li>)}</ul>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ClassDetail({ c }) {
  return (
    <div className="detail-body">
      <div>
        <KV k="Hit Die"  v={`d${c.hd}`} />
        <KV k="Primary"  v={(c.primary || []).map(p => p.toUpperCase()).join(" / ")} />
        <KV k="Saves"    v={(c.saves || []).map(s => s.toUpperCase()).join(" / ")} />
        <KV k="Armor"    v={(c.armor || []).length ? c.armor.join(", ") : "None"} />
        <KV k="Weapons"  v={(c.weapons || []).join(", ")} />
        {c.skills && (
          <KV k="Skills" v={`${c.skills.count} from ${c.skills.list === "any" ? "any" : c.skills.list.join(", ")}`} />
        )}
        {c.blurb && <div className="detail-section"><p>{c.blurb}</p></div>}
        <AbilityList title="Class Features" items={(c.features || []).map(f => ({ name: `Lv ${f.lvl} — ${f.name}`, desc: f.text }))} />
        {(c.subclasses || []).length > 0 && (
          <div className="detail-section">
            <h4>Subclasses</h4>
            {c.subclasses.map(s => {
              const name = typeof s === "string" ? s : s.name;
              const blurb = typeof s === "string" ? "" : (s.blurb || "");
              const features = typeof s === "string" ? [] : (s.features || []);
              return (
                <div key={name} className="ability-block" style={{ marginBottom: 14 }}>
                  <div className="ab-name">{name}</div>
                  {blurb && <div style={{ fontStyle: "italic", color: "var(--ink-soft)", margin: "2px 0 4px" }}>{blurb}</div>}
                  {features.length > 0 ? (
                    <ul style={{ marginTop: 4 }}>
                      {features.map((f, i) => <li key={i}><strong>Lv {f.lvl} — {f.name}.</strong> {f.text}</li>)}
                    </ul>
                  ) : <div className="muted small">Features pending.</div>}
                </div>
              );
            })}
          </div>
        )}
        {(c.equipment || []).length > 0 && (
          <div className="detail-section">
            <h4>Starting Equipment</h4>
            <ul>{c.equipment.map((e, i) => <li key={i}>{e}</li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}

function BackgroundDetail({ b }) {
  return (
    <div className="detail-body">
      <div>
        <KV k="Skills"    v={(b.skills || []).join(", ")} />
        {b.tools && b.tools.length > 0 && <KV k="Tools" v={b.tools.join(", ")} />}
        {b.languages !== undefined && <KV k="Languages" v={b.languages} />}
        <KV k="Feature"   v={b.feature} />
        {b.blurb && <div className="detail-section"><p>{b.blurb}</p></div>}
      </div>
    </div>
  );
}

function FeatDetail({ f })   { return <div className="detail-body"><div><div className="detail-section"><p>{f.blurb}</p></div></div></div>; }
function WeaponDetail({ w }) {
  return <div className="detail-body"><div>
    <KV k="Category"   v={w.cat} />
    <KV k="Damage"     v={w.dmg} />
    <KV k="Properties" v={w.props} />
    <KV k="Weight"     v={w.weight} />
    <KV k="Cost"       v={w.cost} />
  </div></div>;
}
function ArmorDetail({ a }) {
  return <div className="detail-body"><div>
    <KV k="Category" v={a.cat} />
    <KV k="AC"       v={a.ac} />
    <KV k="Stealth"  v={a.stealth} />
    <KV k="Weight"   v={a.weight} />
    <KV k="Cost"     v={a.cost} />
    {a.strReq && <KV k="Strength" v={a.strReq} />}
  </div></div>;
}
function LongTextDetail({ entry }) {
  return <div className="detail-body"><div><div className="detail-section"><p>{entry.desc || entry.blurb}</p></div></div></div>;
}

const renderDetail = (tab, e) => {
  switch (tab) {
    case "monsters":    return <MonsterDetail m={e} />;
    case "spells":      return <SpellDetail s={e} />;
    case "items":       return <ItemDetail it={e} />;
    case "races":       return <RaceDetail r={e} />;
    case "classes":     return <ClassDetail c={e} />;
    case "backgrounds": return <BackgroundDetail b={e} />;
    case "feats":       return <FeatDetail f={e} />;
    case "weapons":     return <WeaponDetail w={e} />;
    case "armor":       return <ArmorDetail a={e} />;
    case "conditions":  return <LongTextDetail entry={e} />;
    case "sections":    return <LongTextDetail entry={e} />;
    case "planes":      return <LongTextDetail entry={e} />;
    default:            return null;
  }
};

function DetailModal({ tab, entry, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const subtitle = (() => {
    if (tab === "monsters")    return [entry.size, entry.type, entry.subtype && `(${entry.subtype})`, entry.alignment].filter(Boolean).join(" ");
    if (tab === "spells")      return entry.level === 0 ? "Cantrip" : `${entry.school || ""} • Level ${entry.level}`;
    if (tab === "items")       return `${entry.type || "Magic Item"} • ${entry.rarity || ""}`;
    if (tab === "races")       return `${entry.size || ""}${entry.speed ? ` • ${entry.speed} ft` : ""}`;
    if (tab === "classes")     return `Hit Die d${entry.hd}`;
    if (tab === "backgrounds") return `Feature: ${entry.feature || ""}`;
    if (tab === "weapons")     return entry.cat;
    if (tab === "armor")       return entry.cat;
    if (tab === "sections")    return entry.parent || "";
    return "";
  })();

  return (
    <div className="detail-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="detail-panel" role="dialog" aria-modal="true">
        <div className="detail-head">
          <div>
            <div className="detail-title">{entry.name}</div>
            {subtitle && <div className="detail-subtitle">{subtitle}</div>}
          </div>
          <button className="x-btn detail-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        {renderDetail(tab, entry)}
      </div>
    </div>
  );
}

function Database() {
  const [tab, setTab] = useState("races");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);
  const data = SRD[tab] || [];
  const filtered = useMemo(() => {
    if (!q.trim()) return data;
    const lo = q.toLowerCase();
    return data.filter(e => JSON.stringify(e).toLowerCase().includes(lo));
  }, [tab, q, data]);
  return (
    <div className="db-shell" data-screen-label="Database">
      <div className="db-side">
        <div className="db-side-head">Catalog</div>
        {DB_TABS.map(t => (
          <button key={t.id} className={"db-tab" + (tab === t.id ? " on" : "")} onClick={() => { setTab(t.id); setSelected(null); }}>
            <span>{t.label}</span>
            <span className="db-tab-count">{(SRD[t.id] || []).length}</span>
          </button>
        ))}
        <div className="db-attrib">{SRD.attribution.short}</div>
      </div>
      <div className="db-main">
        <div className="db-toolbar">
          <input className="db-search" placeholder={"Search " + DB_TABS.find(t => t.id === tab).label.toLowerCase() + "…"} value={q} onChange={e => setQ(e.target.value)}/>
          <span className="muted small">{filtered.length} of {data.length}</span>
        </div>
        <div className="db-grid">
          {filtered.map((e, i) => (
            <div key={(e.name || "") + i} className="db-card" onClick={() => setSelected(e)}>
              {renderEntry(tab, e)}
            </div>
          ))}
          {filtered.length === 0 && <div className="empty-state">No matches.</div>}
        </div>
      </div>
      {selected && <DetailModal tab={tab} entry={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

// ─── Cast (public) ──────────────────────────────────────
function Cast() {
  return (
    <div className="cast-shell" data-screen-label="Cast">
      <div className="cast-section">
        <div className="cast-section-head">
          <h3>Featured Cast</h3>
          <span className="muted small">A look at characters built in The Codex.</span>
        </div>
        <div className="cast-grid">
          {MY_CHARS.map(c => (
            <a key={c.id} className="cast-card" href={c.sheet}>
              <div className="cast-portrait" style={{ backgroundImage: `url(${c.portrait})` }}>
                <span className="cast-level">Lv {c.level}</span>
              </div>
              <div className="cast-meta">
                <div className="cast-name">{c.short}</div>
                <div className="cast-epithet">{c.epithet}</div>
                <div className="cast-tags">
                  <span className="tag tag-class">{c.subclass} {c.klass}</span>
                  <span className="tag tag-race">{c.race}</span>
                </div>
                <div className="cast-quote">“{c.quote}”</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Vault (private) ────────────────────────────────────
function Vault({ store, onOpenSheet, onNew }) {
  const myDrafts = store.drafts || [];
  return (
    <div className="vault-shell" data-screen-label="Vault">
      <div className="vault-banner">
        <div className="vault-banner-icon">⚿</div>
        <div>
          <div className="vault-banner-title">The Vault</div>
          <div className="vault-banner-sub muted">Your private codex. Linked sheets, drafts in progress, and characters only you can see.</div>
        </div>
      </div>

      <div className="cast-section">
        <div className="cast-section-head">
          <h3>Your Cast</h3>
          <span className="muted small">{MY_CHARS.length} active sheets</span>
        </div>
        <div className="cast-grid">
          {MY_CHARS.map(c => (
            <a key={c.id} className="cast-card" href={c.sheet}>
              <div className="cast-portrait" style={{ backgroundImage: `url(${c.portrait})` }}>
                <span className="cast-level">Lv {c.level}</span>
              </div>
              <div className="cast-meta">
                <div className="cast-name">{c.short}</div>
                <div className="cast-epithet">{c.epithet}</div>
                <div className="cast-tags">
                  <span className="tag tag-class">{c.subclass} {c.klass}</span>
                  <span className="tag tag-race">{c.race}</span>
                </div>
                <div className="cast-quote">“{c.quote}”</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="cast-section">
        <div className="cast-section-head">
          <h3>Drafts</h3>
          <button className="ghost-btn" onClick={onNew}>＋ New character</button>
        </div>
        <div className="cast-grid">
          {myDrafts.length === 0 && <div className="empty-state">No drafts yet — start one.</div>}
          {myDrafts.map(d => (
            <div key={d.id} className="cast-card draft" onClick={() => onOpenSheet(d.id)}>
              <div className="cast-portrait placeholder">
                <span className="cast-level">Lv {d.appliedLevel || d.level}</span>
              </div>
              <div className="cast-meta">
                <div className="cast-name">{d.name || <em className="muted">unnamed</em>}</div>
                <div className="cast-epithet">{d.race} {d.klass}</div>
                <div className="cast-tags">
                  <span className="tag">{d.background}</span>
                  <span className="tag">{d.alignment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Home ───────────────────────────────────────────────
function Home({ go, onNew }) {
  return (
    <div className="home-shell" data-screen-label="Home">
      <section className="home-hero">
        <div className="home-hero-text">
          <div className="home-eyebrow">A field-codex of heroes &amp; their world</div>
          <h1 className="home-title">Forge characters. Catalogue everything.</h1>
          <p className="home-lede">A working sheet, a step-by-step generator, and a complete reference — bound under a single cover. Your characters live in private chambers; the database is open to all.</p>
          <div className="home-cta">
            <button className="solid-btn" onClick={onNew}>＋ Begin a new character</button>
            <button className="ghost-btn" onClick={() => go("db")}>Browse the database</button>
            <button className="ghost-btn" onClick={() => go("vault")}>The Vault ⚿</button>
          </div>
        </div>
        <div className="home-hero-flourish" aria-hidden="true">
          <svg viewBox="0 0 200 240" width="200" height="240">
            <rect x="20" y="30" width="160" height="190" fill="none" stroke="currentColor" strokeWidth="1"/>
            <rect x="28" y="38" width="144" height="174" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3"/>
            <line x1="100" y1="38" x2="100" y2="212" stroke="currentColor" strokeWidth="0.5"/>
            <text x="100" y="120" textAnchor="middle" fontFamily="serif" fontSize="64" fill="currentColor" opacity="0.6">⌘</text>
            <text x="100" y="155" textAnchor="middle" fontFamily="serif" fontSize="11" fill="currentColor" letterSpacing="2">CODEX</text>
            <text x="100" y="170" textAnchor="middle" fontFamily="serif" fontSize="8" fill="currentColor" opacity="0.7">vol. i</text>
          </svg>
        </div>
      </section>

      <section className="home-cards">
        {[
          { v: "cast", k: "Cast",     d: "Featured characters built in the Codex. Click any to read their sheet." },
          { v: "db",   k: "Database", d: "Races, classes, backgrounds, spells, feats, gear, bestiary. Search across all." },
          { v: "gen",  k: "Forge",    d: "Step-by-step generator. Jump in at any step. Auto-derives mods, saves, AC, slots, encumbrance." }
        ].map(c => (
          <button key={c.v} className="home-card" onClick={() => c.v === "gen" ? onNew() : go(c.v)}>
            <div className="home-card-key">{c.k}</div>
            <div className="home-card-d">{c.d}</div>
            <div className="home-card-arrow">→</div>
          </button>
        ))}
      </section>

      <section className="home-meta">
        <div>
          <strong>Provenance.</strong> Mechanics drawn from the D&amp;D 5e <abbr title="Systems Reference Document">SRD</abbr> 5.1 by Wizards of the Coast, distributed under CC BY 4.0.
          Original phrasing throughout. Unaffiliated and unofficial.
        </div>
      </section>
    </div>
  );
}

// ─── App shell ──────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "paperWarmth": "cream",
  "accent": "#9b1c1c"
}/*EDITMODE-END*/;

const PAPER_PALETTES = {
  cream: { paper:"#f1e7cf", surface:"#ebe0c2", surface2:"#e0d3ac" },
  bone:  { paper:"#f7f1e1", surface:"#efe6cf", surface2:"#e3d6ad" },
  aged:  { paper:"#e8d8b0", surface:"#dec99e", surface2:"#cdb780" }
};

const ACCENT_OPTIONS = ["#9b1c1c", "#3a5a8a", "#4a3a8a", "#2a6b3a"];

function App({ themeName }) {
  const [store, setStore] = useStore();
  const [route, go] = useHashRoute();
  const [diceOpen, setDiceOpen] = useState(false);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to root CSS vars
  useEffect(() => {
    const palette = PAPER_PALETTES[tweaks.paperWarmth] || PAPER_PALETTES.cream;
    const r = document.documentElement;
    r.style.setProperty("--paper", palette.paper);
    r.style.setProperty("--surface", palette.surface);
    r.style.setProperty("--surface-2", palette.surface2);
    r.style.setProperty("--accent", tweaks.accent);
    r.style.setProperty("--danger", tweaks.accent);
  }, [tweaks]);

  // Keyboard shortcut for dice
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "d" || e.key === "D") setDiceOpen(o => !o);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const newCharacter = () => {
    const fresh = blankDraft();
    setStore(s => ({ ...s, drafts: [...(s.drafts || []), fresh], activeDraftId: fresh.id }));
    go("gen");
  };
  const openSheet = (id) => { setStore(s => ({ ...s, activeDraftId: id })); go("gen"); };

  const view = route.split("/")[0];

  return (
    <div className={"app theme-" + themeName.toLowerCase().replace(/\s+/g, "-")}>
      <header className="topbar">
        <div className="brand" onClick={() => go("home")} role="button">
          <span className="brand-mark">⌘</span>
          <span className="brand-title">The Codex</span>
          <span className="brand-sub">{themeName}</span>
        </div>
        <nav className="nav">
          <button className={view === "home" ? "on" : ""} onClick={() => go("home")}>Frontispiece</button>
          <button className={view === "cast" ? "on" : ""} onClick={() => go("cast")}>Cast</button>
          <button className={view === "db"   ? "on" : ""} onClick={() => go("db")}>Database</button>
          <button className={view === "gen"  ? "on" : ""} onClick={() => view === "gen" ? null : newCharacter()}>＋ Forge</button>
          <button className={view === "vault"? "on vault-tab" : "vault-tab"} onClick={() => go("vault")} title="Your private codex">⚿ Vault</button>
        </nav>
        <div className="topbar-tools">
          <span className="owner-badge" title="You are signed in as the codex-owner">⚜ Owner</span>
          <button className="ghost-btn" onClick={() => setDiceOpen(o => !o)}>🎲 Dice <kbd>d</kbd></button>
        </div>
      </header>

      <main className="main">
        {view === "home"  && <Home go={go} onNew={newCharacter}/>}
        {view === "cast"  && <Cast/>}
        {view === "vault" && <Vault store={store} onOpenSheet={openSheet} onNew={newCharacter}/>}
        {view === "db"    && <Database/>}
        {view === "gen"   && <Generator store={store} setStore={setStore} onClose={() => go("vault")}/>}
      </main>

      <footer className="bottombar">
        <div className="footer-attrib">{SRD.attribution.long}</div>
      </footer>

      <DiceTray open={diceOpen} onClose={() => setDiceOpen(false)}/>

      <TweaksPanel>
        <TweakSection label="Paper">
          <TweakRadio label="Warmth" value={tweaks.paperWarmth} onChange={v => setTweak("paperWarmth", v)}
            options={["cream","bone","aged"]}/>
        </TweakSection>
        <TweakSection label="Accent">
          <TweakColor label="Rubrication" value={tweaks.accent} onChange={v => setTweak("accent", v)} options={ACCENT_OPTIONS}/>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.render(<App themeName={window.__THEME || "Codex"}/>, document.getElementById("root"));

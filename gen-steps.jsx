/* ============================================================
   gen-steps.jsx — generator step components
   Depends on: window.SRD, window.Derive, React
   Exports onto window: StepBasics, StepRace, StepClass,
   StepBackground, StepStats, StepSkills, StepEquipment, StepReview
   ============================================================ */

const { useState: useStateGS, useMemo: useMemoGS } = React;

// ─── Basics ─────────────────────────────────────────────
function StepBasics({ draft, set }) {
  return (
    <div className="step-grid">
      <label className="field">
        <span>Name</span>
        <input value={draft.name} onChange={e => set({ name: e.target.value })} placeholder="Name your hero"/>
      </label>
      <label className="field">
        <span>Alignment</span>
        <select value={draft.alignment} onChange={e => set({ alignment: e.target.value })}>
          {["Lawful Good","Neutral Good","Chaotic Good","Lawful Neutral","True Neutral","Chaotic Neutral","Lawful Evil","Neutral Evil","Chaotic Evil"].map(a => <option key={a}>{a}</option>)}
        </select>
      </label>
      <label className="field full">
        <span>Concept / Notes</span>
        <textarea value={draft.notes} onChange={e => set({ notes: e.target.value })} placeholder="A sentence or three. Origin, drive, secret." rows={3}/>
      </label>
    </div>
  );
}

// ─── Race (with comparison drawer) ──────────────────────
function StepRace({ draft, set }) {
  const [compare, setCompare] = useStateGS([]);
  const toggle = (n) => setCompare(c => c.includes(n) ? c.filter(x => x !== n) : c.length >= 3 ? [c[1], c[2], n] : [...c, n]);
  return (
    <div>
      <div className="pick-grid">
        {SRD.races.map(r => (
          <div key={r.name} className={"pick-card" + (draft.race === r.name ? " selected" : "") + (compare.includes(r.name) ? " comparing" : "")}>
            <button className="pick-card-main" onClick={() => set({ race: r.name })}>
              <div className="pick-name">{r.name}</div>
              <div className="pick-meta">{r.size} • {r.speed} ft • {r.asiText}</div>
              <div className="pick-blurb">{r.blurb}</div>
              <div className="pick-tags">{r.traits.slice(0,3).map(t => <span key={t} className="tag">{t}</span>)}</div>
              {r.subraces && r.subraces.length > 0 && (
                <div className="pick-sub muted small">Subraces: {r.subraces.map(s => s.name).join(", ")}</div>
              )}
            </button>
            <button className="pick-compare-btn" onClick={() => toggle(r.name)} title="Add to comparison">
              {compare.includes(r.name) ? "✓ Compare" : "+ Compare"}
            </button>
          </div>
        ))}
      </div>
      {compare.length > 0 && <CompareDrawer items={compare.map(n => SRD.races.find(r => r.name === n))} type="race" onClose={() => setCompare([])} />}
    </div>
  );
}

// ─── Class (with comparison + subclass picker) ──────────
function StepClass({ draft, set }) {
  const [compare, setCompare] = useStateGS([]);
  const toggle = (n) => setCompare(c => c.includes(n) ? c.filter(x => x !== n) : c.length >= 3 ? [c[1], c[2], n] : [...c, n]);
  const cls = SRD.classes.find(c => c.name === draft.klass);
  return (
    <div>
      <div className="pick-grid">
        {SRD.classes.map(c => (
          <div key={c.name} className={"pick-card" + (draft.klass === c.name ? " selected" : "") + (compare.includes(c.name) ? " comparing" : "")}>
            <button className="pick-card-main" onClick={() => set({ klass: c.name, subclass: "" })}>
              <div className="pick-name">{c.name}</div>
              <div className="pick-meta">d{c.hd} • {c.primary.map(s => s.toUpperCase()).join("/")} • Saves {c.saves.map(s => s.toUpperCase()).join(" / ")}</div>
              <div className="pick-blurb">{c.blurb}</div>
              <div className="pick-sub muted small">{c.subclasses.length} subclass{c.subclasses.length === 1 ? "" : "es"}</div>
            </button>
            <button className="pick-compare-btn" onClick={() => toggle(c.name)} title="Add to comparison">
              {compare.includes(c.name) ? "✓ Compare" : "+ Compare"}
            </button>
          </div>
        ))}
      </div>
      {cls && draft.level >= 3 && (
        <div className="subclass-row">
          <span className="muted small">Subclass (chosen at 3rd):</span>
          {cls.subclasses.map(s => {
            const name  = typeof s === "string" ? s : s.name;
            const blurb = typeof s === "string" ? "" : (s.blurb || "");
            const hasFeatures = typeof s !== "string" && Array.isArray(s.features) && s.features.length > 0;
            return (
              <button
                key={name}
                className={"sub-chip" + (draft.subclass === name ? " on" : "") + (hasFeatures ? "" : " stub")}
                onClick={() => set({ subclass: name })}
                title={blurb + (hasFeatures ? "" : " (features coming soon)")}
              >
                {name}
                {!hasFeatures && <span className="muted small" style={{marginLeft:6}}>—</span>}
              </button>
            );
          })}
        </div>
      )}
      {/* Class skills */}
      {cls && cls.skills.list !== "any" && (
        <div className="classskill-row">
          <div className="muted small">Choose {cls.skills.count} class skills:</div>
          <div className="skill-chip-row">
            {cls.skills.list.map(s => {
              const on = (draft.classSkills || []).includes(s);
              return (
                <button key={s} className={"skill-chip" + (on ? " on" : "")} onClick={() => {
                  const cur = draft.classSkills || [];
                  if (on) set({ classSkills: cur.filter(x => x !== s) });
                  else if (cur.length < cls.skills.count) set({ classSkills: [...cur, s] });
                }}>{s}</button>
              );
            })}
          </div>
        </div>
      )}
      {compare.length > 0 && <CompareDrawer items={compare.map(n => SRD.classes.find(r => r.name === n))} type="class" onClose={() => setCompare([])} />}
    </div>
  );
}

function CompareDrawer({ items, type, onClose }) {
  return (
    <div className="compare-drawer">
      <div className="compare-head">
        <span>Compare</span>
        <button className="x-btn" onClick={onClose}>×</button>
      </div>
      <div className="compare-cols">
        {items.map(it => (
          <div key={it.name} className="compare-col">
            <div className="compare-name">{it.name}</div>
            {type === "race" && <>
              <div className="compare-row"><span>Size</span><strong>{it.size}</strong></div>
              <div className="compare-row"><span>Speed</span><strong>{it.speed} ft</strong></div>
              <div className="compare-row"><span>ASI</span><strong>{it.asiText}</strong></div>
              <div className="compare-row"><span>Traits</span><strong>{it.traits.length}</strong></div>
              <ul className="compare-list">{it.traits.map(t => <li key={t}>{t}</li>)}</ul>
            </>}
            {type === "class" && <>
              <div className="compare-row"><span>Hit Die</span><strong>d{it.hd}</strong></div>
              <div className="compare-row"><span>Primary</span><strong>{it.primary.map(s => s.toUpperCase()).join("/")}</strong></div>
              <div className="compare-row"><span>Saves</span><strong>{it.saves.map(s => s.toUpperCase()).join(", ")}</strong></div>
              <div className="compare-row"><span>Armor</span><strong>{it.armor.join(", ") || "None"}</strong></div>
              <div className="compare-row"><span>Skills</span><strong>{it.skills.count} chosen</strong></div>
              <div className="compare-row"><span>Subclasses</span><strong>{it.subclasses.length}</strong></div>
            </>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Background ─────────────────────────────────────────
function StepBackground({ draft, set }) {
  return (
    <div className="pick-grid">
      {SRD.backgrounds.map(b => (
        <button key={b.name} className={"pick-card pick-card-main" + (draft.background === b.name ? " selected" : "")} onClick={() => set({ background: b.name })}>
          <div className="pick-name">{b.name}</div>
          <div className="pick-meta">{b.skills.join(" • ")}</div>
          <div className="pick-blurb">{b.blurb}</div>
          <div className="pick-sub muted small">Feature: {b.feature}{b.tools && b.tools.length ? " • " + b.tools.join(", ") : ""}</div>
        </button>
      ))}
    </div>
  );
}

// ─── Stats: 3 modes ─────────────────────────────────────
function StepStats({ draft, set }) {
  const mode = draft.statMode || "pointBuy";
  const setMode = (m) => set({ statMode: m });
  const stats = draft.stats;
  const finalStats = Derive.applyRaceASI(stats, SRD.races.find(r => r.name === draft.race), draft.asiPicks);
  const usedPoints = Derive.pointBuyTotal(stats);

  // Standard array assignment
  const [arrayLeft, setArrayLeft] = useStateGS(Derive.STANDARD_ARRAY.slice());

  const setStat = (k, v) => set({ stats: { ...stats, [k]: v } });
  const setAll  = (obj) => set({ stats: { ...stats, ...obj } });

  const resetTo = (val) => setAll({ str:val,dex:val,con:val,int:val,wis:val,cha:val });

  return (
    <div className="stats-shell">
      <div className="stats-modes">
        {[["pointBuy","Point Buy"],["array","Standard Array"],["manual","Manual"]].map(([m,l]) =>
          <button key={m} className={"stat-mode-tab" + (mode === m ? " on" : "")} onClick={() => setMode(m)}>{l}</button>
        )}
      </div>

      {mode === "pointBuy" && (
        <div className="stats-pb-head">
          <strong>{usedPoints} / {Derive.POINT_BUY_BUDGET}</strong> points used.
          <span className="muted small"> Scores 8–15. Costs: 8→0, 13→5, 14→7, 15→9.</span>
          <button className="ghost-btn small" onClick={() => resetTo(8)}>Reset to 8s</button>
        </div>
      )}

      {mode === "array" && (
        <div className="stats-pb-head">
          Drag-or-click to assign: <strong>{Derive.STANDARD_ARRAY.join(", ")}</strong>.
          <button className="ghost-btn small" onClick={() => { setArrayLeft(Derive.STANDARD_ARRAY.slice()); resetTo(0); }}>Reset</button>
        </div>
      )}

      <div className="stat-row-grid">
        {SRD.abilities.map(a => {
          const v = stats[a.key];
          const fv = finalStats[a.key];
          const m = Derive.mod(fv);
          const bonus = fv - v;
          return (
            <div key={a.key} className="stat-pick">
              <div className="stat-pick-key">{a.name}</div>
              <div className="stat-pick-blurb muted">{a.blurb}</div>
              {mode === "pointBuy" && (
                <div className="stat-pick-controls">
                  <button onClick={() => setStat(a.key, Math.max(8, v - 1))} disabled={v <= 8}>−</button>
                  <span className="stat-pick-val">{v}</span>
                  <button onClick={() => {
                    const next = v + 1;
                    if (next > 15) return;
                    const newTotal = usedPoints - Derive.pointBuyCost(v) + Derive.pointBuyCost(next);
                    if (newTotal > Derive.POINT_BUY_BUDGET) return;
                    setStat(a.key, next);
                  }} disabled={v >= 15}>+</button>
                  <span className="stat-pick-mod">{Derive.sign(m)}</span>
                </div>
              )}
              {mode === "array" && (
                <div className="stat-pick-controls array">
                  <select value={v} onChange={e => {
                    const newV = parseInt(e.target.value) || 0;
                    setStat(a.key, newV);
                    setArrayLeft(arr => {
                      const a2 = arr.slice();
                      // put old value back
                      if (v && Derive.STANDARD_ARRAY.includes(v)) a2.push(v);
                      // remove new value
                      const idx = a2.indexOf(newV);
                      if (idx >= 0) a2.splice(idx, 1);
                      return a2;
                    });
                  }}>
                    <option value="0">—</option>
                    {Derive.STANDARD_ARRAY.map((n, i) => (
                      <option key={i} value={n} disabled={!arrayLeft.includes(n) && v !== n}>{n}</option>
                    ))}
                  </select>
                  <span className="stat-pick-val">{v || "—"}</span>
                  <span className="stat-pick-mod">{v ? Derive.sign(m) : ""}</span>
                </div>
              )}
              {mode === "manual" && (
                <div className="stat-pick-controls">
                  <button onClick={() => setStat(a.key, Math.max(1, v - 1))}>−</button>
                  <input type="number" value={v} min="1" max="30" onChange={e => setStat(a.key, parseInt(e.target.value) || 0)} className="stat-pick-input"/>
                  <button onClick={() => setStat(a.key, Math.min(30, v + 1))}>+</button>
                  <span className="stat-pick-mod">{Derive.sign(m)}</span>
                </div>
              )}
              {bonus > 0 && (
                <div className="stat-bonus muted small">→ {fv} <em>({Derive.sign(bonus)} race)</em></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Skills (with sources) ──────────────────────────────
function StepSkills({ draft, set }) {
  const sources = Derive.skillSources(draft);
  const cls = SRD.classes.find(c => c.name === draft.klass);
  const remainingClass = (cls?.skills?.count || 0) - (draft.classSkills || []).length;
  return (
    <div>
      <div className="muted small skills-help">
        Skills come from your <strong>background</strong> (auto), <strong>class</strong> (chose {cls?.skills?.count || 0} on the Class step
        {remainingClass > 0 ? `, ${remainingClass} left` : ""}), and sometimes <strong>race</strong>. Hover any chip to see where it came from.
      </div>
      <div className="skills-pick-grid">
        {SRD.skills.map(s => {
          const srcs = sources[s.name] || [];
          const on = srcs.length > 0;
          return (
            <div key={s.name} className={"skill-chip with-source" + (on ? " on" : "")} title={srcs.length ? `From: ${srcs.join(", ")}` : "Not proficient"}>
              <span className="skill-chip-name">{s.name}</span>
              <span className="skill-chip-ability">{s.ability.toUpperCase()}</span>
              <span className="skill-chip-source">{srcs.map(s => s[0].toUpperCase()).join("")}</span>
            </div>
          );
        })}
      </div>
      <div className="skills-legend">
        <span className="legend-key"><span className="legend-dot bg-class">C</span> Class</span>
        <span className="legend-key"><span className="legend-dot bg-bg">B</span> Background</span>
        <span className="legend-key"><span className="legend-dot bg-race">R</span> Race</span>
      </div>
    </div>
  );
}

// ─── Equipment (starting gear + carry) ──────────────────
function StepEquipment({ draft, set }) {
  const startGear = SRD.startingGear[draft.klass] || [];
  const eq = draft.equipment || [];
  const carry = Derive.carryWeight(draft);
  const finalStats = Derive.applyRaceASI(draft.stats, SRD.races.find(r => r.name === draft.race), draft.asiPicks);
  const cap = Derive.carryCapacity(finalStats);

  const grantStarting = () => {
    const items = startGear.map(name => {
      const w = SRD.weapons.find(x => x.name === name);
      const a = SRD.armor.find(x => x.name === name);
      if (w) return { kind: "weapon", name, weight: w.weight, qty: 1 };
      if (a) return { kind: "armor",  name, weight: a.weight, qty: 1 };
      return { kind: "gear", name, weight: 0, qty: 1 };
    });
    set({ equipment: items });
  };

  const addItem = (kind, name, weight) => {
    set({ equipment: [...eq, { kind, name, weight, qty: 1 }] });
  };
  const removeAt = (i) => set({ equipment: eq.filter((_, j) => j !== i) });
  const setQty = (i, q) => set({ equipment: eq.map((e, j) => j === i ? { ...e, qty: Math.max(1, q) } : e) });

  return (
    <div className="eq-shell">
      <div className="eq-side">
        <div className="eq-head">
          <span>Equipped</span>
          <button className="ghost-btn small" onClick={grantStarting}>Grant {draft.klass} starting gear</button>
        </div>
        {eq.length === 0 && <div className="muted small">Nothing yet. Grant your starting kit, or add items from the right.</div>}
        <ul className="eq-list">
          {eq.map((e, i) => (
            <li key={i} className="eq-item">
              <span className="eq-kind muted small">{e.kind}</span>
              <span className="eq-name">{e.name}</span>
              <input type="number" value={e.qty} onChange={ev => setQty(i, parseInt(ev.target.value) || 1)} className="eq-qty" min="1"/>
              <span className="eq-wt muted small">{(e.weight || 0) * (e.qty || 1)} lb</span>
              <button className="x-btn small" onClick={() => removeAt(i)}>×</button>
            </li>
          ))}
        </ul>
        <div className={"eq-encum" + (carry > cap ? " over" : "")}>
          <strong>{carry}</strong> / {cap} lb {carry > cap && <em>— encumbered</em>}
          <div className="eq-bar"><div className="eq-bar-fill" style={{ width: Math.min(100, carry / cap * 100) + "%" }}></div></div>
        </div>
      </div>
      <div className="eq-catalog">
        <div className="eq-head">Catalog</div>
        <details open>
          <summary>Weapons</summary>
          <ul className="eq-cat-list">
            {SRD.weapons.map(w => (
              <li key={w.name}><button className="ghost-btn small" onClick={() => addItem("weapon", w.name, w.weight)}>+</button> <strong>{w.name}</strong> <span className="muted small">{w.dmg} • {w.weight} lb</span></li>
            ))}
          </ul>
        </details>
        <details>
          <summary>Armor</summary>
          <ul className="eq-cat-list">
            {SRD.armor.map(w => (
              <li key={w.name}><button className="ghost-btn small" onClick={() => addItem("armor", w.name, w.weight)}>+</button> <strong>{w.name}</strong> <span className="muted small">AC {w.ac} • {w.weight} lb</span></li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}

// ─── Review (uses derive engine) ────────────────────────
function StepReview({ draft }) {
  const d = Derive.derive(draft);
  return (
    <div className="review-shell">
      <div className="review-head">
        <h2 className="review-name">{draft.name || <em className="muted">unnamed</em>}</h2>
        <div className="muted">{d.race?.name || "?"} • {d.cls?.name || "?"}{draft.subclass ? " (" + draft.subclass + ")" : ""} • {d.bg?.name || "?"} • {draft.alignment} • Level {d.level}</div>
        {draft.notes && <p className="review-notes">{draft.notes}</p>}
      </div>

      <div className="review-vitals">
        <div className="vital"><span className="vital-key">HP</span><span className="vital-val">{d.hp}</span></div>
        <div className="vital"><span className="vital-key">AC</span><span className="vital-val">{d.ac}</span></div>
        <div className="vital"><span className="vital-key">Init</span><span className="vital-val">{Derive.sign(Derive.mod(d.finalStats.dex))}</span></div>
        <div className="vital"><span className="vital-key">Speed</span><span className="vital-val">{d.race?.speed || 30}</span></div>
        <div className="vital"><span className="vital-key">Prof</span><span className="vital-val">{Derive.sign(d.prof)}</span></div>
      </div>

      <div className="review-cols">
        <div>
          <div className="review-section-head">Abilities & Saves</div>
          <table className="mini-table">
            <thead><tr><th></th><th>Score</th><th>Mod</th><th>Save</th></tr></thead>
            <tbody>
              {SRD.abilities.map(a => {
                const v = d.finalStats[a.key];
                const isProf = (d.cls?.saves || []).includes(a.key);
                return (
                  <tr key={a.key}>
                    <td>{a.name}</td>
                    <td>{v}</td>
                    <td>{Derive.sign(Derive.mod(v))}</td>
                    <td className={isProf ? "prof" : ""}>{Derive.sign(d.saves[a.key])}{isProf ? <sup>★</sup> : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div>
          <div className="review-section-head">Skill Proficiencies</div>
          <ul className="review-skill-list">
            {Object.keys(d.skillSources).length === 0 && <li className="muted"><em>None.</em></li>}
            {Object.entries(d.skillSources).map(([s, srcs]) => (
              <li key={s}>
                <strong>{s}</strong>
                <span className="muted small"> {Derive.sign(d.skills[s])} • from {srcs.join(", ")}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="review-section-head">Class Features (≤ Lv {d.level})</div>
          <ul className="review-feat-list">
            {d.features.map(f => <li key={f.name}><strong>Lv {f.lvl} — {f.name}.</strong> <span className="muted">{f.text}</span></li>)}
          </ul>

          {d.slots.some(n => n > 0) && <>
            <div className="review-section-head">Spell Slots</div>
            <div className="slot-row">
              {d.slots.map((n, i) => n > 0 && (
                <span key={i} className="slot-chip">L{i+1}: <strong>{n}</strong></span>
              ))}
            </div>
          </>}

          {d.race && <>
            <div className="review-section-head">Race Traits</div>
            <ul className="review-trait-list">{d.race.traits.map(t => <li key={t}>{t}</li>)}</ul>
          </>}
        </div>
      </div>

      <div className="review-section-head">Equipment ({d.carry} / {d.cap} lb {d.encumbered && <em className="warn">— encumbered</em>})</div>
      <div className="tag-row">
        {(draft.equipment || []).length === 0 && <em className="muted">Nothing equipped.</em>}
        {(draft.equipment || []).map((e, i) => <span key={i} className="tag">{e.name}{e.qty > 1 ? " ×" + e.qty : ""}</span>)}
      </div>
    </div>
  );
}

// ─── Export to global ────────────────────────────────────
Object.assign(window, { StepBasics, StepRace, StepClass, StepBackground, StepStats, StepSkills, StepEquipment, StepReview });

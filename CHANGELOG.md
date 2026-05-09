# Codex — Changelog

Tracks every meaningful change to:

- `data/srd.js`, `data/srd-bulk.js`, `data/fetch-open5e.py`, `data/my-characters.js`
- `app.jsx`, `derive.jsx`, `gen-steps.jsx`, `tweaks-panel.jsx`
- `index.html`, `atlas.html`, `tome.html`, `field-notes.html`, `compare.html`, `print-sheet.html`
- `styles/base.css`, `styles/additions.css`, `styles/theme-*.css`
- `legacy/*` (frozen — should never change)

Newest entries at the top.

> **Rollback strategy.** This file is the human-readable index. Actual rollback runs through git — every entry below should map to a commit (and a tag for big milestones). The repo currently has the React Codex work **uncommitted** (last commit `8dd40c2` predates the pivot), so historical entries describe the surgical-undo path until we tag a baseline. Once we commit a `codex-baseline` tag, future rollbacks become `git revert <commit>` or `git checkout <tag> -- <path>`.

> **How to add a new entry.** Append at the top of the log. Use the template at the bottom of this file. Every entry should answer: *what changed, why, which files, how to undo, how it was verified*.

---

## 2026-05-08 · Click-to-detail modal + image enrichment + field-level merge

**What changed**
- Every DB card is now clickable. Opens a centered modal with full detail.
- New components in `app.jsx`: `DetailModal`, `renderDetail()`, plus per-tab detail renderers (`MonsterDetail`, `SpellDetail`, `ItemDetail`, `RaceDetail`, `ClassDetail`, `BackgroundDetail`, `FeatDetail`, `WeaponDetail`, `ArmorDetail`, `LongTextDetail`) and helpers (`KV`, `AbilityList`).
- `Database` now owns a `selected` state; switching tabs auto-closes the modal.
- Modal closes on backdrop click and on `Escape`.
- Added `img` to the monster transform (rewrites `http://` → `https://`). Twelve SRD monsters have art on Open5e (Aboleth, Basilisk, Bulette, etc.).
- **Field-level merge** replaced wholesale-shadow. Curated keys win on every key they define; imported keys fill gaps. So curated Goblin/Fireball/Bag of Holding now keep their hand-written blurbs *and* gain the imported actions / full desc / type.

**Why**
- Cards were too sparse: rich data was already in `data/srd-bulk.js` but invisible.
- Wholesale-shadow merge was throwing away imported `actions`, `specialAbilities`, `desc`, `higher_level`, etc. for every entry that had a curated counterpart (~115 entries across spells/monsters/items).
- Asked for: "If I click on a monster I should see more from him, also images could be linked."

**Files modified**
- `app.jsx` — inserted Detail* components and modal state; modified `Database()` body to track `selected` and render `<DetailModal>`.
- `data/fetch-open5e.py` — `transform_monster()` now writes `img`; merge IIFE in `render_js()` switched to `Object.assign({}, imp, c)` (curated-wins-per-key) plus `enriched` counter in the log.
- `data/srd-bulk.js` — regenerated (≈ 2.04 MB).
- `styles/additions.css` — appended `/* ---------- DB Detail Modal ---------- */` block (.detail-overlay, .detail-panel, .detail-head, .detail-body, .detail-img, .detail-section, .stat-grid-6, .kv-line, .ability-block, .legendary-tag).

**Rollback**
1. In `app.jsx`, delete the block from `// ─── Detail modal ───` through the line just before `function Database() {`. Inside `Database()`, remove the `selected` state, the `setSelected` arg in the tab-click handler, the `onClick` on `.db-card`, and the trailing `{selected && <DetailModal …/>}`. Reverts the modal feature.
2. In `data/fetch-open5e.py`:
   - Remove the `"img": ((m.get("img_main") …))` line and the comment above it from `transform_monster()`.
   - Replace the merge IIFE in `render_js()` with the wholesale-shadow version (filter incoming by curated-name set, then `curated.concat(toAdd)` — no `Object.assign`).
3. Re-run `python data/fetch-open5e.py` to regenerate `data/srd-bulk.js`.
4. In `styles/additions.css`, delete everything from the `/* ---------- DB Detail Modal ---------- */` comment to end of file.

**Verification**
- Aboleth modal opens with image (URL https rewritten, `naturalWidth > 0`), shows: AC 17 (natural armor), HP 135 (18d10+36), 10 ft + swim 40 ft, full ability score grid, traits (Amphibious/Mucous Cloud/Probing Telepathy), 4 actions, legendary actions with description, environment tags.
- Goblin modal (no image) shows enriched curated data: AC 15 (leather armor, shield), HP 7 (2d6), Stealth +6, darkvision 60 ft, Common+Goblin languages, Nimble Escape trait, Scimitar + Shortbow actions, environments — all from import while curated blurb persists.
- Fireball modal shows curated short blurb + full PHB-style description paragraph + "At Higher Levels" section.
- Esc closes; backdrop click closes; tab switch closes.

---

## 2026-05-08 · Full Open5e extraction — weapons, armor, conditions, rules, planes; rich monster data

**What changed**
- Rewrote `data/fetch-open5e.py` to extract every available field per category.
- Monsters now carry: subtype, group, alignment, armor description, hit dice, all six speeds, ability scores, saves, perception, skills, vulnerabilities/resistances/immunities/condition immunities, senses, languages, full action lists (actions/bonus actions/reactions/legendary actions/special abilities) with names + descriptions + attack bonus + damage dice when applicable, spell list, environments, full desc.
- Spells now carry: full desc, higher_level, material, ritual flag, concentration flag.
- Magic items now carry: full desc, type, attune description string.
- Added new endpoints: `weapons` (37 SRD), `armor` (18 SRD), `conditions` (15), `sections` (45 rules excerpts), `planes` (8). Conditions/sections/planes are brand-new categories that didn't exist in curated SRD.
- Added 3 new DB tabs in `app.jsx`: Conditions, Rules, Planes.
- Enriched `renderEntry` cases: spell card now shows Ritual / Conc. badges; item card shows type + attunement detail; monster card shows alignment + speed + traits/actions/legendary listing + environment tags.

**Why**
- Asked for: "Extrapolate what you can from the sources / Every detail and data you can obtain from each / Descriptions, sourcebook, whatever."

**Files modified**
- `data/fetch-open5e.py` — full rewrite with `transform_*` for every category; output `bulk` dict now has 8 keys.
- `data/srd-bulk.js` — regenerated (≈ 2.04 MB, up from 793 KB).
- `app.jsx` — `DB_TABS` extended; `renderEntry` cases enriched and 3 new cases added (`conditions`, `sections`, `planes`).

**Rollback**
1. In `data/fetch-open5e.py`, restore the slimmer transforms (return only `name, cr, size, type, hp, ac, blurb, source` for monsters; drop `weapons/armor/conditions/sections/planes` fetch+transform calls; drop them from `bulk` dict and from the `merge_lines` / `new_lines` template).
2. Re-run `python data/fetch-open5e.py`.
3. In `app.jsx`, remove the three new entries from `DB_TABS` and remove the `conditions`/`sections`/`planes` cases from `renderEntry`. Revert the enriched monster/spell/item cases to their previous minimal forms.

**Verification**
- Tab counts after merge: Spells 322, Bestiary 326, Magic Items 240, Weapons 40, Armor 19, Conditions 15, Rules 45, Planes 8.
- Aboleth has 4 actions and 3 special abilities accessible via `SRD.monsters.find(m => m.name==='Aboleth').actions`.
- No console errors beyond the pre-existing React 18 `ReactDOM.render` deprecation warning.

---

## 2026-05-08 · Open5e bulk import (initial pass)

**What changed**
- New file `data/fetch-open5e.py`: one-time importer that hits Open5e API filtered to `document__slug=wotc-srd`, transforms each entry to the curated SRD schema, tags imported entries with `source: "open5e"`, and emits `data/srd-bulk.js`.
- New file `data/srd-bulk.js` (auto-generated, ≈ 793 KB initially): contains `window.SRD_BULK = {…}` plus an IIFE that merges into `window.SRD` after curated load. **Wholesale-shadow** at this stage — curated entries entirely replaced any imported entry with the same name (case-insensitive).
- All 5 entry HTMLs (`index.html`, `atlas.html`, `tome.html`, `field-notes.html`, `print-sheet.html`) now load `data/srd-bulk.js` immediately after `data/srd.js`.
- Categories imported: spells (319), monsters (322), magic items (237).

**Why**
- Asked for: "Isn't there an already existing db from where we could do a massive import?"
- Curated DB had only 81/28/16 entries respectively; long tail was missing for browsing.

**Files added/modified**
- `data/fetch-open5e.py` — created.
- `data/srd-bulk.js` — created (auto-generated; do not hand-edit).
- `index.html`, `atlas.html`, `tome.html`, `field-notes.html`, `print-sheet.html` — added `<script src="data/srd-bulk.js"></script>` after `data/srd.js`.

**Rollback**
1. Delete `data/srd-bulk.js` and `data/fetch-open5e.py`.
2. Remove the `<script src="data/srd-bulk.js"></script>` line from each of the 5 HTML files.

**Verification**
- DB tab counts grew: Spells 81 → 322 (+241; 78 SRD names shadowed by curated), Bestiary 28 → 326, Magic Items 16 → 240. Curated Fire Bolt still wins (`SRD.spells.find(s=>s.name==='Fire Bolt').source` returns `'curated'`/undefined).
- Console logs `[srd-bulk] merged: …` once per page load.

> **Note:** This entry was superseded by the field-level merge change (see 2026-05-08 detail-modal entry). The wholesale-shadow logic shipped here was the bug that caused curated entries to lose imported richness; the later entry fixes it.

---

## 2026-05-08 · Hand-curate canonical subclass features + fill (12 classes, +31 spells, +8 feats, +8 items, +8 monsters)

**What changed**
- Schema upgrade: every class's `subclasses` field went from `["Name1","Name2",…]` (string array) to `[{name, blurb, features:[{lvl, name, text}]}, …]` (object array).
- One canonical subclass per class was filled with full features (4–7 features each, level 1–18 progression):
  Path of the Berserker, College of Lore, Life Domain, Circle of the Land, Champion, Way of the Open Hand, Oath of Devotion, Hunter, Thief, Draconic Bloodline, The Fiend, School of Evocation.
- The other 24 subclasses ship as `{name, blurb, features: []}` stubs.
- `derive.jsx` `featuresAtLevel(klass, level)` → `featuresAtLevel(klass, subclass, level)`. Merges base class features + subclass features at the given level. Subclass-derived features get tagged `f.sub` for display attribution.
- `gen-steps.jsx` subclass picker now handles object entries: shows blurb in tooltip, marks stubs with a `—` glyph and "features coming soon" hint.
- `app.jsx` `renderEntry` case for `classes` now extracts subclass names from objects (with string fallback for safety).
- Subraces in `data/srd.js` expanded from `{name, bonus: "string"}` to `{name, asi:{…}, asiText, traits:[…], blurb}` for Elf (3), Dwarf (2), Halfling (2), Gnome (2).
- +31 hand-curated spells (Mending, Spare the Dying, Burning Hands, Hunter's Mark, Aid, Lesser Restoration, Suggestion, Animate Dead, Spirit Guardians, Hypnotic Pattern, Slow, Stoneskin, Death Ward, Dimension Door, Bigby's Hand, Mass Cure Wounds, Telekinesis, Chain Lightning, Mass Suggestion, Forcecage, Teleport, Antimagic Field, Earthquake, Astral Projection, Power Word Kill, etc.).
- +8 hand-curated feats (Crossbow Expert, Defensive Duelist, Dual Wielder, Elemental Adept, Fey Touched, Inspiring Leader, Observant, Skill Expert).
- +8 hand-curated magic items (Amulet of Health, Cloak of Protection, Gauntlets of Ogre Power, Belt of Hill Giant Strength, Boots of Speed, Headband of Intellect, Pearl of Power, Stone of Good Luck).
- +8 hand-curated monsters (Bandit, Giant Spider, Bugbear, Animated Armor, Banshee, Stone Giant, Vampire, Tarrasque).

**Why**
- Asked for: "we have to start filling the db."
- Subclass picks at L3+ in the generator were dead — choosing "Oath of Devotion" did nothing for the derived feature list.

**Files modified**
- `data/srd.js` — every class entry rewritten to use object subclasses; subraces expanded; spells/feats/items/monsters appended.
- `derive.jsx` — `featuresAtLevel()` rewrite; call site in `derive()` updated.
- `gen-steps.jsx` — subclass chip render updated to handle objects.
- `app.jsx` — `renderEntry` `classes` case updated.

**Rollback**
1. `data/srd.js` — bigger lift since this was a full rewrite of subclass shape. Easiest path: restore from git baseline (the version before this session's work). Otherwise revert by:
   - For each class, replace its subclasses object array with the original string array. Original strings preserved in this changelog above.
   - Restore the original race subraces as `{name, bonus: "…"}` strings (originals were summary fragments — see git for canonical form).
   - Trim `spells`, `feats`, `items`, `monsters` back to the pre-curation set (delete the entries listed above).
2. `derive.jsx` — restore `featuresAtLevel(klass, level)` to read only `cls.features`.
3. `gen-steps.jsx` — restore subclass chip render to `cls.subclasses.map(s => <button …>{s}</button>)`.
4. `app.jsx` — restore `renderEntry` `classes` case to use `entry.subclasses.join(", ")`.

**Verification**
- L8 builds across 6 classes (Paladin/Devotion, Wizard/Evocation, Cleric/Life, Sorcerer/Draconic, Rogue/Thief, Warlock/Fiend) all return base + subclass features at correct levels.
- Champion Fighter L8: HP 68, AC 12, Prof +3, features include Lv3 Improved Critical (Champion) and Lv7 Remarkable Athlete (Champion).
- DB browser shows correct counts (Spells 81, Bestiary 28, Magic Items 16) before the bulk import.
- Generator subclass chips show selected subclass + stubs marked with `—` and "features coming soon" tooltip.

---

## 2026-05-07 · React Codex pivot (USER, off-camera)

> Captured for context. The work was done by the user between sessions; this entry isn't a Codex change but the architectural baseline everything after assumes.

**What changed**
- Replaced the original "extract sheet engine" plan (Phase 1A in worktree) with a full React app.
- New files: `app.jsx`, `derive.jsx`, `gen-steps.jsx`, `tweaks-panel.jsx`, `design-canvas.jsx`.
- New theme HTMLs: `atlas.html`, `tome.html`, `field-notes.html` (each loads the same JSX with a `window.__THEME` flag and a different `theme-*.css`).
- `compare.html` shows all three themes side-by-side via iframes.
- `print-sheet.html` is a stand-alone printable view that reads the active draft from sessionStorage.
- `data/srd.js` — curated SRD content (12 classes, 9 races, 12 backgrounds, 50 spells, 12 feats, 19 weapons, 13 armor, 8 items, 20 monsters). Hand-written prose voice.
- `data/my-characters.js` — summary objects for the legacy two characters; `sheet:` field points to `legacy/<id>.html` for full fidelity.
- `legacy/paladdin.html`, `legacy/chin_chun_chan.html`, `legacy/index.html` — the original hand-coded sheets, frozen.
- The Phase 1A files I created in `.claude/worktrees/quirky-pare-426831/` (`css/sheet.css`, `js/sheet.js`, `characters/*.js`) are obsolete and not used by the main app.

**Why**
- The legacy per-character HTMLs diverged enough (different resource cards, Pet Hook Horror vs Find Steed, custom subclasses) that a single shared `sheet.html?character=<id>` would have required designing a resource-card schema first. The user pivoted to building a generic React character builder instead, keeping the legacy sheets as-is.

**Files modified**
- All new (untracked in git as of 2026-05-08).

**Rollback**
- The legacy sheets in `legacy/` are unchanged from their pre-pivot state. To roll back to "no Codex", delete the new top-level files (`app.jsx`, `*.jsx`, `atlas.html`, `tome.html`, `field-notes.html`, `compare.html`, `print-sheet.html`, `data/`, `styles/`, `index.html`'s new version), and copy `legacy/index.html` back to `index.html`. The original `paladdin.html` and `chin_chun_chan.html` at the project root are still the pre-pivot versions.

---

## Pre-2026-05-07 · Original hand-coded sheets (committed history)

Last committed state before the pivot is `8dd40c2 Merge pull request #11`. To see what shipped, `git checkout 8dd40c2 -- .` from the project root. The Codex work above all sits on top of that baseline as untracked changes.

---

## Template — paste at the top for each new entry

```md
## YYYY-MM-DD · One-line title

**What changed**
- bullet
- bullet

**Why**
- bullet

**Files modified**
- `path/to/file` — short summary

**Rollback**
1. Step
2. Step

**Verification**
- bullet
```

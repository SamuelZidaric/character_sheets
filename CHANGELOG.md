# Codex — Changelog

Tracks every meaningful change to:

- `data/srd.js`, `data/srd-bulk.js`, `data/fetch-open5e.py`, `data/my-characters.js`
- `app.jsx`, `derive.jsx`, `gen-steps.jsx`, `tweaks-panel.jsx`
- `index.html`, `atlas.html`, `tome.html`, `field-notes.html`, `compare.html`, `print-sheet.html`
- `styles/base.css`, `styles/additions.css`, `styles/theme-*.css`
- `legacy/*` (frozen — should never change)

Newest entries at the top.

> **Rollback strategy.** This file is the human-readable index. Actual rollback runs through git — every entry below should map to a commit (and a tag for big milestones). The React Codex work is committed as `e1bcc5b` and tagged **`codex-baseline`** (pushed to origin 2026-07-06), so rollbacks are `git revert <commit>` or `git checkout codex-baseline -- <path>`. Entries below the baseline describe the older surgical-undo path from when the work was still uncommitted.

> **How to add a new entry.** Append at the top of the log. Use the template at the bottom of this file. Every entry should answer: *what changed, why, which files, how to undo, how it was verified*.

---

## 2026-07-27 · Load diet (−95% blocking JS) + full Open5e completeness sweep

**What changed**
- **Load weight** (nothing removed — everything moved to on-demand):
  - `data/srd-bulk.js` no longer ships as a synchronous `<script>` on any app page. `app.jsx` injects it ~60 ms after mount; every view re-renders when the merge lands (`bulkReady` state; Database shows a "binding full catalog…" spinner until then). `print-sheet.html` keeps it synchronous for equipped-item fidelity.
  - `fetch-open5e.py` now emits compact JSON: srd-bulk.js 2,040,755 → 1,688,752 bytes (−17%, byte-identical content).
  - All five entry pages switched from React **development** UMD builds to **production.min** (fresh SRI hashes) — roughly 850 KB less JS and no dev-mode overhead.
  - Companion/chip images get `loading="lazy"`.
  - Measured (localhost): JS fetched before DOMContentLoaded fell from ≈3.9 MB to **204 KB**; srd-bulk arrives ≈1.1 s after first paint without blocking.
- **Completeness sweep** — audited every v2 document against every content endpoint; everything Open5e serves is now importable:
  - New `V2_SUPPLEMENTS` map folds v2-only categories into their sibling packs (name-deduped): **Tome of Heroes +76 subclasses**, **Open5e originals +17 subclasses**, Tal'Dorei +4 subclasses (Blood Domain …), Black Flag +1 class, A5E +1 class, **A5E backgrounds 16→27** (Adventurer's/Dungeon Delver's/Gate Pass), **A5E +6 conditions**.
  - Orphan subclasses (parent class in another document) render as standalone entries: `subclassOf` field, "Subclass" badge, tolerant class card/detail/subtitle (no more `dundefined` when `hd` is absent).
  - `srd-2014-x` pack gains 50 reference **Rules** entries: Languages (19), Damage Types (13), Environments (with descriptions).
- **Fixed the two blank theme pages**: `atlas.html` and `field-notes.html` were missing the `derive/tweaks-panel/gen-steps` script tags since the JSX split (pre-baseline bug found in the 2026-07-06 assessment) — both render now, and all entry HTMLs are structurally in sync again.

**Why**
- Asked for: "All that is in Open5e should be here and made way less heavy to load without losing content."

**Files modified**
- `index.html`, `tome.html`, `atlas.html`, `field-notes.html`, `print-sheet.html` — production React, no sync bulk, dependency fix.
- `app.jsx` — lazy bulk injection + `bulkReady`, subclass-tolerant class renderers, lazy images, catalog spinner.
- `data/fetch-open5e.py` — compact JSON. `data/srd-bulk.js` — regenerated.
- `data/fetch-packs.py` — `V2_SUPPLEMENTS`, `v2_class_any`, `v2_condition`, `fetch_reference_sections`.
- `data/packs/{a5e,blackflag,toh,taldorei,o5e,srd-2014-x,manifest}.js` — regenerated.

**Rollback**
1. `git checkout <prev> -- index.html tome.html atlas.html field-notes.html print-sheet.html app.jsx data/fetch-open5e.py data/fetch-packs.py data/srd-bulk.js data/packs/`
   (note: reverting the HTMLs re-breaks atlas/field-notes deliberately).

**Verification**
- Fresh load of index.html: 204 KB JS before DOMContentLoaded, production React confirmed, srd-bulk injected ≈1.1 s post-DCL at 1,649 KB, merge lands (Spells 322), Home renders instantly.
- `atlas.html` and `field-notes.html` render (first time since the split); Field Notes → DB → ToH pack on → Classes 100 with "Ancient Dragons | Subclass of …" cards badged ToH.
- Supplement dedupe held: +0 duplicate ToH races/feats, +1 net background.

---

## 2026-07-27 · Official-content audit: Gear & Tools tab, SRD 5.1 gear/variants pack, 2024 gear

**What changed**
- Audited official (WotC) coverage against Open5e v2. Both official 5e SRDs were already in (5.1 monsters/spells matched exactly), but three official chunks were missing and are now imported:
  - **New "Gear & Tools" DB tab** (`gear` category) with card + `GearDetail` renderers.
  - **New pack `srd-2014-x` — "SRD 5.1 — Gear & Item Variants"** (new "D&D 2014 Rules" group): 257 gear entries (237 mundane items + 20 equipment sets with contents lists) and 288 magic-item variants the v1 API never enumerated (per-armor Adamantine, +1/+2/+3 per weapon, …), deduped by name against the existing 5.1 import via `existing_item_names()` reading `srd-bulk.js`.
  - **srd-2024 pack now ships its 203 mundane gear items** (previously fetched only for weapon/armor cost joins).
- `data/fetch-packs.py`: `fetch_srd2014_extras()`, `v2_gear`/`v2_itemset` transforms with `fmt_money`/`fmt_weight`, itemset-into-item merge (defensive), `--only` no longer triggers a spurious full v1 refetch for v2-only packs.
- Filter-param lesson encoded: `document__key` on `/v2/items` loose-matches across documents (440 rows for srd-2024, only 203 real) — client-side key verification is what keeps counts honest.
- Older-edition official SRD research (3.5e/d20) delegated to a subagent — outcome tracked separately.

**Why**
- Asked for: "Did we include all the official ones?" — the answer was "almost": gear, equipment sets, and item variants are official SRD content that was invisible.

**Files added/modified**
- `data/fetch-packs.py`, `data/packs/srd-2014-x.js` (new), `data/packs/srd-2024.js` + `manifest.js` (regenerated, 19 packs), `app.jsx` (Gear tab), `CHANGELOG.md`.

**Rollback**
1. Remove the `gear` entries from `DB_TABS`/`renderEntry`/`renderDetail`/`DetailModal` in `app.jsx`.
2. Delete `data/packs/srd-2014-x.js`; rerun `python data/fetch-packs.py --only srd-2024` after reverting `fetch-packs.py`.

**Verification**
- Browser: Sources panel shows 19 packs; enabling both SRD packs gives Gear & Tools 460 (203 + 257) and Magic Items 1,285 (997 + 288); gear cards show type • cost • weight with source badges; Burglar's Pack detail lists Category/Cost/Weight and full contents; 2014-vs-2024 same-name entries coexist with distinct badges by design.

---

## 2026-07-19 · Character profile pages, cast redesign, +180 spells (STDS pack)

**What changed**
- **In-Codex character profiles** at `#char/<id>` for the two legacy heroes, built from data mined out of the legacy sheets (which remain the interactive ground truth, linked from every profile):
  - Hero section: full-body art in a double-ruled frame, per-character accent color (`accent` field), epithet, quote, tag row, HP/AC/Init/Prof vitals, six-ability grid.
  - Identity grid (Physical/Personality/Ideals/Bonds/Flaws — lifted verbatim from the sheets' Identity cards).
  - Signature Moves: Paladdin's Nick/Vex + **Elemental Smite with all four genie modes** (Dao/Djinni/Efreeti/Marid), Lay on Hands, Magic Initiate; Chin's Sharp Friend, Pommel Strike, Amethyst Breath, Fighting Spirit, Action Surge, Second Wind, Gem Flight, Psionic Mind.
  - **Companion dossiers with stage carousels**: Marcus Gallus the hook horror across Infant/Young/Juvenile/Adult (full stat blocks + growth art), Golden Stormstrider in Prize Bird/Ascended forms.
  - Story chapters (collapsible; Chin's saga abridged from the sheet's seven-chapter epic) and Field Notes (fun facts).
- **Cast/Vault card redesign** (`CastCard`, shared — removes the old duplicated markup): taller portraits with accent frames, HP/AC + six-ability vitals strip, companion chip with art overlapping the portrait, hover lift; cards now open the profile page (legacy sheet is linked from there).
- `data/my-characters.js`: schema grown with `accent`, `identity`, `signature` (with `modes`), `companions[].stages[]`, `story`, `facts`. All values extracted from `legacy/*.html`.
- **New content pack**: *Spells That Don't Suck* (180 spells, CC BY 4.0) via Open5e v2 — total now 18 packs.
- `data/fetch-packs.py`: `--only <id>[,<id>]` flag for incremental pack refresh (parses committed manifest, replaces just the requested packs); generalized v2 spells-only doc support (`V2_SPELL_DOCS`).
- `styles/additions.css`: `/* ---------- Cast cards v2 + character profiles ---------- */` block.

**Why**
- Asked for: "Improve even more, especially the design for the unique characters, and add more data."
- The cast cards were thin summaries linking straight out to legacy HTML; the sheets' richest content (genie smites, the hook-horror growth chart, the story) was invisible from the Codex.
- Probed all v2-only Open5e documents: STDS was the one real addition (180 new spells); bfrd/a5e-ag v2 are near-duplicates of their v1 packs; no monster art exists on the API (checked `/v2/images` — 32 condition icons only).

**Files added/modified**
- `data/my-characters.js` — enriched (hand-written from legacy-sheet extraction).
- `app.jsx` — `CastCard`, `CharacterPage`, `#char/<id>` route, Cast/Vault use the shared card, Cast tab stays lit on profile pages.
- `styles/additions.css` — profile + card styles appended.
- `data/fetch-packs.py` — STDS pack, `--only` mode.
- `data/packs/spells-that-dont-suck.js` — new; `data/packs/manifest.js` — regenerated (18 packs).

**Rollback**
1. `git checkout <prev> -- data/my-characters.js app.jsx styles/additions.css data/fetch-packs.py data/packs/manifest.js`
2. Delete `data/packs/spells-that-dont-suck.js`.

**Verification**
- Browser (localhost preview): Cast shows 2 v2 cards with vitals strips (Paladdin HP 68 / AC 15 / DEX +5) and companion chips (Golden, Marcus); cards route to `#char/…`.
- Chin's profile: 5 sections, 5 identity cards, 8 signature moves, 4 companion stages — clicking ADULT swaps to `hook_horror_adult.png` with AC 15 / HP 75 / Multiattack; 7 story chapters; 6 field notes.
- Paladdin's profile: amber accent applied (`#b45309`), 4 genie modes listed, steed carousel Prize Bird ↔ Ascended.
- DB Sources panel: 18 packs; STDS tooltip shows "180 spells (241 KB) · License: …/by/4.0".

---

## 2026-07-06 · Content packs: full Open5e catalog + D&D 2024 SRD 5.2, with a Sources picker

**What changed**
- New `data/fetch-packs.py`: imports every document Open5e serves beyond the core 5.1 SRD, one lazy-loadable pack per source:
  - **D&D 2024 rules (SRD 5.2, CC BY 4.0)** via the v2 API — 331 monsters, 339 spells, 757 magic items, 9 species, all 12 classes with 2024 subclass features, 4 backgrounds, 17 feats, 38 weapons (with Mastery properties), 13 armor, 56 rules sections.
  - Kobold Press: Tome of Beasts 1/2/3 + 2023 edition, Creature Codex, Deep Magic (+Extended), Vault of Magic, Tome of Heroes, KP Compilation, Warlock Archives.
  - EN Publishing: Level Up Advanced 5e (spells/items/feats/backgrounds) + Monstrous Menagerie (586 monsters).
  - Black Flag SRD / Tales of the Valiant (360 monsters), Tal'Dorei, Open5e originals.
  - Output: `data/packs/<id>.js` (17 packs, ≈12.4 MB) + `data/packs/manifest.js` (labels, publisher groups, badges, per-tab counts, sizes, per-document license URLs).
  - Headline totals across packs: ≈2,885 new monsters, ≈1,455 new spells, ≈2,138 new items.
- `app.jsx`:
  - New pack runtime before the Database section: `usePacks()` (manifest injection at mount, per-pack script injection on enable, enabled set persisted in localStorage `dnd_codex_packs_v1`), `injectScript()`, and a WeakMap-cached `searchBlob()` so search doesn't re-stringify thousands of entries per keystroke.
  - `Database()`: **Sources** panel in the sidebar (packs grouped by publisher; toggling lazy-loads the pack script; base SRD is never mutated — pack rows are concatenated per tab at render time); tab counts include enabled packs; per-card source badge (top-right, e.g. `2024`, `ToB`, `A5E`); pack label + license in tooltips and the detail modal; "Show more" pagination (first 150 cards, +300 per click).
  - Detail renderers: `FeatDetail` now shows prerequisite + full text; `MonsterDetail` gained a Lore section for pack monsters with descriptions; spell/item/long-text descriptions keep paragraph breaks.
- `styles/additions.css`: appended `/* ---------- Content packs (Database sources) ---------- */` block.
- No HTML entry-point changes — the manifest is injected at runtime, so the (currently hand-synced) theme HTMLs didn't need edits.
- API quirks handled in the fetcher: v2 filter param naming is inconsistent per endpoint (`document` vs `document__key`), so both are sent and every entry is verified client-side; v1 entries are grouped by their `document__slug`.

**Why**
- Asked for: "pull from the internet all the available content — different versions of dnd too."
- The 2024 SRD 5.2 is the true "different version"; A5E and Tales of the Valiant are alternate 5e-family systems; the KP books are the long-tail 5e catalog. Older editions (3.5e, AD&D) have no licensed machine-readable source and are not included.
- Packs are opt-in + lazy so the 12 MB of expansion data costs nothing until a source is enabled.

**Files added/modified**
- `data/fetch-packs.py` — created.
- `data/packs/*.js` — created (auto-generated; do not hand-edit; regenerate with `python data/fetch-packs.py`).
- `app.jsx` — pack runtime + Database rewrite (sources, badges, pagination, search cache).
- `styles/additions.css` — pack UI styles appended.
- `CHANGELOG.md` — this entry; also corrected the stale top-note (baseline is committed/tagged/pushed as of 2026-07-06).

**Rollback**
1. Delete `data/packs/` and `data/fetch-packs.py`.
2. `git checkout codex-baseline -- app.jsx styles/additions.css` (or surgically: remove the `// ─── Content packs` block, restore `Database()` to read `SRD[tab]` directly, drop the FeatDetail/MonsterDetail/pre-wrap tweaks, and delete the packs CSS block).

**Verification**
- `python` spot-checks: manifest parses (17 packs, license URLs present); 2024 Goblin Boss (CR 1, HP 21, AC 17 natural armor, darkvision 60 ft, Multiattack/Scimitar/Shortbow), Fireball 2024 (Lv 3, V/S/M, 150 feet, Sorcerer+Wizard), Paladin 2024 (d10, WIS/CHA saves, 27 features, Oath of Devotion), Dwarf 2024 traits, Bag of Holding (Uncommon), ToB "Aboleth, Nihilith" (CR 12, pack-tagged).
- Browser: Sources panel renders; enabling packs loads scripts on demand and grows tab counts; cards show source badges; modal shows pack attribution; pagination caps initial render; graceful "no packs found" note when `data/packs/` is absent.

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

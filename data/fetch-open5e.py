#!/usr/bin/env python3
"""
One-time importer: pulls SRD 5.1 content from open5e.com and writes
data/srd-bulk.js. Run this any time you want to refresh the long-tail
content. Curated entries in data/srd.js always win on duplicate names.

Usage:
    python data/fetch-open5e.py
"""
import json
import re
import sys
import urllib.request
from pathlib import Path

API = "https://api.open5e.com/v1"
SRD_SLUG = "wotc-srd"          # 5e Core Rules (CC BY 4.0, WotC)
LIMIT = 500                    # >= largest SRD category (~322)

SOURCE_TAG = "open5e"

UA = "Codex-fetch/1.0 (+https://example.local)"


def fetch(endpoint, srd_only=True):
    """Fetch a single page (LIMIT >= max SRD count), returning .results list."""
    qs = f"?document__slug={SRD_SLUG}&limit={LIMIT}" if srd_only else f"?limit={LIMIT}"
    url = f"{API}/{endpoint}/{qs}"
    sys.stderr.write(f"  GET {url}\n")
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        payload = json.loads(resp.read())
    sys.stderr.write(f"    → {payload['count']} entries\n")
    return payload["results"]


def first_sentence(text, max_chars=200):
    if not text:
        return ""
    text = text.replace("\r", "").strip()
    m = re.match(r"^(.+?[.!?])(?:\s|$)", text, re.DOTALL)
    short = m.group(1) if m else text
    short = short.split("\n")[0]
    if len(short) > max_chars:
        short = short[: max_chars - 1].rstrip() + "…"
    return short


def title_case(s):
    if not s:
        return ""
    return s[0].upper() + s[1:]


def slim_actions(arr):
    """Strip Open5e action objects to the fields we want, dropping nulls."""
    out = []
    for a in arr or []:
        item = {"name": a.get("name", ""), "desc": (a.get("desc") or "").strip()}
        # Optional structured combat fields when present:
        for k in ("attack_bonus", "damage_dice", "damage_bonus"):
            v = a.get(k)
            if v not in (None, ""):
                item[k] = v
        out.append(item)
    return out


# ─── Transforms ─────────────────────────────────────────────────────────────

def transform_spell(s):
    classes = [c.strip() for c in (s.get("dnd_class") or "").split(",") if c.strip()]
    return {
        "name": s["name"],
        "level": s.get("level_int", 0),
        "school": title_case(s.get("school", "")),
        "cast": s.get("casting_time", ""),
        "range": s.get("range", ""),
        "components": s.get("components", ""),
        "material": (s.get("material") or "").strip(),
        "ritual": s.get("can_be_cast_as_ritual") is True,
        "concentration": s.get("requires_concentration") is True,
        "duration": s.get("duration", ""),
        "classes": classes,
        "blurb": first_sentence(s.get("desc", "")),
        "desc": (s.get("desc") or "").strip(),
        "higher_level": (s.get("higher_level") or "").strip(),
        "source": SOURCE_TAG,
    }


def transform_monster(m):
    desc = (m.get("desc") or "").strip()
    blurb = first_sentence(desc)
    if not blurb:
        sa = m.get("special_abilities") or []
        actions = m.get("actions") or []
        if sa and isinstance(sa, list) and sa[0].get("desc"):
            blurb = first_sentence(sa[0]["desc"])
        elif actions and isinstance(actions, list) and actions[0].get("desc"):
            blurb = first_sentence(actions[0]["desc"])
        else:
            blurb = f"{m.get('size','')} {m.get('type','')}.".strip()

    saves = {}
    for k_long, k_short in [("strength","str"),("dexterity","dex"),("constitution","con"),
                            ("intelligence","int"),("wisdom","wis"),("charisma","cha")]:
        v = m.get(f"{k_long}_save")
        if v is not None:
            saves[k_short] = v

    return {
        "name": m["name"],
        "slug": m.get("slug", ""),
        "size": m.get("size", ""),
        "type": m.get("type", ""),
        "subtype": m.get("subtype") or "",
        "group": m.get("group") or "",
        "alignment": m.get("alignment", ""),
        "cr": m.get("challenge_rating", "?"),
        "crNum": m.get("cr", 0),
        "hp": m.get("hit_points", 0),
        "hitDice": m.get("hit_dice", "") or "",
        "ac": m.get("armor_class", 0),
        "armorDesc": m.get("armor_desc", "") or "",
        "speed": m.get("speed") or {},
        "stats": {
            "str": m.get("strength", 10), "dex": m.get("dexterity", 10),
            "con": m.get("constitution", 10), "int": m.get("intelligence", 10),
            "wis": m.get("wisdom", 10), "cha": m.get("charisma", 10),
        },
        "saves": saves,
        "perception": m.get("perception"),
        "skills": m.get("skills") or {},
        "vulnerabilities":     (m.get("damage_vulnerabilities") or "").strip(),
        "resistances":         (m.get("damage_resistances") or "").strip(),
        "immunities":          (m.get("damage_immunities") or "").strip(),
        "conditionImmunities": (m.get("condition_immunities") or "").strip(),
        "senses":   (m.get("senses") or "").strip(),
        "languages":(m.get("languages") or "").strip(),
        "actions":          slim_actions(m.get("actions")),
        "bonusActions":     slim_actions(m.get("bonus_actions")),
        "reactions":        slim_actions(m.get("reactions")),
        "legendaryDesc":    (m.get("legendary_desc") or "").strip(),
        "legendaryActions": slim_actions(m.get("legendary_actions")),
        "specialAbilities": slim_actions(m.get("special_abilities")),
        "spellList":        m.get("spell_list") or [],
        "environments":     m.get("environments") or [],
        # Open5e serves images over http://; rewrite to https:// so it works
        # if the page is served over HTTPS without mixed-content blocks.
        "img":              ((m.get("img_main") or "").replace("http://", "https://")) or "",
        "blurb": blurb,
        "desc":  desc,
        "source": SOURCE_TAG,
    }


def transform_item(it):
    rarity = it.get("rarity", "") or ""
    rarity = title_case(rarity) if rarity else "Common"
    attune_field = it.get("requires_attunement") or ""
    desc = (it.get("desc") or "").strip()
    blurb = desc.split("\n")[0]
    if len(blurb) > 220:
        blurb = blurb[:219].rstrip() + "…"
    return {
        "name": it["name"],
        "rarity": rarity,
        "attune": bool(attune_field),
        "attuneDesc": attune_field.strip(),
        "type": (it.get("type") or "").strip(),
        "blurb": blurb,
        "desc": desc,
        "source": SOURCE_TAG,
    }


def transform_weapon(w):
    dice = (w.get("damage_dice") or "").strip()
    dtype = (w.get("damage_type") or "").strip()
    dmg = f"{dice} {dtype}".strip()
    props = w.get("properties") or []
    cat = (w.get("category") or "").replace(" Weapons", "").strip()  # "Martial Melee" not "Martial Melee Weapons"
    weight = (w.get("weight") or "").replace("lb.", "lb").strip() or "—"
    return {
        "name": w["name"],
        "cat": cat,
        "dmg": dmg,
        "props": ", ".join(props) if props else "—",
        "weight": weight,
        "cost": w.get("cost") or "—",
        "source": SOURCE_TAG,
    }


def transform_armor(a):
    cat = (a.get("category") or "").replace(" Armor", "").strip() or "Armor"
    ac_string = a.get("ac_string") or str(a.get("base_ac", "?"))
    weight = (a.get("weight") or "").strip() or "—"
    return {
        "name": a["name"],
        "cat": cat,
        "ac": ac_string,
        "stealth": "Disadvantage" if a.get("stealth_disadvantage") else "—",
        "weight": weight,
        "cost": a.get("cost") or "—",
        "strReq": a.get("strength_requirement") or None,
        "source": SOURCE_TAG,
    }


def transform_condition(c):
    return {
        "name": c["name"],
        "desc": (c.get("desc") or "").strip(),
        "blurb": first_sentence(c.get("desc", "")),
        "source": SOURCE_TAG,
    }


def transform_section(s):
    return {
        "name": s["name"],
        "parent": (s.get("parent") or "").strip(),
        "desc": (s.get("desc") or "").strip(),
        "blurb": first_sentence(s.get("desc", ""), 240),
        "source": SOURCE_TAG,
    }


def transform_plane(p):
    return {
        "name": p["name"],
        "desc": (p.get("desc") or "").strip(),
        "blurb": first_sentence(p.get("desc", ""), 240),
        "source": SOURCE_TAG,
    }


# ─── Output ─────────────────────────────────────────────────────────────────

def render_js(bulk):
    """Render the bulk data as a window.SRD_BULK file with merge logic."""
    # Categories that already exist in curated SRD (merge-with-shadow):
    merge_cats = ["spells", "monsters", "items", "weapons", "armor"]
    # Brand-new categories (just append):
    new_cats   = ["conditions", "sections", "planes"]

    merge_lines = "\n  ".join([
        f'spells:     merge("spells"),',
        f'monsters:   merge("monsters"),',
        f'items:      merge("items"),',
        f'weapons:    merge("weapons"),',
        f'armor:      merge("armor"),',
    ])
    new_lines = "\n  ".join([
        f'window.SRD.conditions = (window.SRD_BULK.conditions || []).slice();',
        f'window.SRD.sections   = (window.SRD_BULK.sections   || []).slice();',
        f'window.SRD.planes     = (window.SRD_BULK.planes     || []).slice();',
    ])
    return f"""/* ============================================================
   srd-bulk.js — auto-generated SRD content imported from open5e.
   DO NOT EDIT BY HAND. Regenerate with: python data/fetch-open5e.py

   Curated entries in data/srd.js shadow imported ones with the same
   name (case-insensitive). Imported entries are tagged source:"open5e".
   New categories (conditions, sections, planes) are appended fresh.
   ============================================================ */
window.SRD_BULK = {json.dumps(bulk, indent=2, ensure_ascii=False)};

(function () {{
  if (!window.SRD) {{
    console.warn("[srd-bulk] SRD not loaded; nothing to merge.");
    return;
  }}
  // Field-level merge: for each curated entry, pull in any fields the import
  // has but the curated entry doesn't. Curated values WIN on every key they
  // define (including blurb), so the user's voice is preserved while imported
  // data fills gaps (actions, specialAbilities, full desc, higher_level, etc.).
  const merge = (cat) => {{
    const curated  = window.SRD[cat] || [];
    const incoming = window.SRD_BULK[cat] || [];
    const incomingByName = new Map(incoming.map(e => [(e.name || "").toLowerCase(), e]));
    let enriched = 0;
    const merged = curated.map(c => {{
      const imp = incomingByName.get((c.name || "").toLowerCase());
      if (!imp) return c;
      enriched++;
      return Object.assign({{}}, imp, c);  // curated wins on every key it defines
    }});
    const have = new Set(curated.map(e => (e.name || "").toLowerCase()));
    const toAdd = incoming.filter(e => !have.has((e.name || "").toLowerCase()));
    window.SRD[cat] = merged.concat(toAdd);
    return {{ curated: curated.length, enriched, added: toAdd.length }};
  }};
  const r = {{
    {merge_lines}
  }};
  // Append categories that don't exist in curated SRD:
  {new_lines}
  console.log("[srd-bulk] merged:", r,
    "| conditions:", window.SRD.conditions.length,
    "sections:",     window.SRD.sections.length,
    "planes:",       window.SRD.planes.length);
}})();
"""


def main():
    out = Path(__file__).parent / "srd-bulk.js"
    sys.stderr.write("Fetching Open5e SRD content (full extraction)...\n")

    sys.stderr.write("Spells:\n");      spells  = [transform_spell(s)    for s in fetch("spells")]
    sys.stderr.write("Monsters:\n");    monsters= [transform_monster(m)  for m in fetch("monsters")]
    sys.stderr.write("Magic items:\n"); items   = [transform_item(it)    for it in fetch("magicitems")]
    sys.stderr.write("Weapons:\n");     weapons = [transform_weapon(w)   for w in fetch("weapons")]
    sys.stderr.write("Armor:\n");       armor   = [transform_armor(a)    for a in fetch("armor")]
    sys.stderr.write("Conditions:\n");  conds   = [transform_condition(c)for c in fetch("conditions")]
    sys.stderr.write("Sections:\n");    sects   = [transform_section(s)  for s in fetch("sections")]
    sys.stderr.write("Planes:\n");      planes  = [transform_plane(p)    for p in fetch("planes")]

    bulk = {
        "spells":     spells,
        "monsters":   monsters,
        "items":      items,
        "weapons":    weapons,
        "armor":      armor,
        "conditions": conds,
        "sections":   sects,
        "planes":     planes,
    }
    out.write_text(render_js(bulk), encoding="utf-8")

    sys.stderr.write(
        f"\nWrote {out} ({out.stat().st_size:,} bytes)\n"
        f"  spells={len(spells)}  monsters={len(monsters)}  items={len(items)}\n"
        f"  weapons={len(weapons)}  armor={len(armor)}\n"
        f"  conditions={len(conds)}  sections={len(sects)}  planes={len(planes)}\n"
    )


if __name__ == "__main__":
    main()

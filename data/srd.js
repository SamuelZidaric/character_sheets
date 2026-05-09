/* ============================================================
   D&D Reference Data — SRD 5.1 derived sample
   ------------------------------------------------------------
   Original-phrasing summaries of mechanics published by Wizards
   of the Coast under the SRD 5.1 (CC BY 4.0). Full game content
   comes from the Player's Handbook, Dungeon Master's Guide, and
   Monster Manual © Wizards of the Coast. The application is not
   affiliated with or endorsed by WotC.

   Production note: pull from open5e.com / dnd5eapi.co (both
   SRD-licensed) on demand and cache locally.
   ============================================================ */

window.SRD = {
  attribution: {
    short: "Mechanics from D&D 5e SRD © Wizards of the Coast (CC BY 4.0). Unaffiliated.",
    long:  "This database surfaces game-system mechanics drawn from the Systems Reference Document 5.1, distributed by Wizards of the Coast LLC under a Creative Commons Attribution 4.0 International License. Dungeons & Dragons, D&D, and related logos are trademarks of Wizards of the Coast. This project is unofficial fan content and is not approved or endorsed by Wizards. Character art, lore, and house-ruled content belong to their respective creators."
  },

  // ─── Abilities & Skills ─────────────────────────────────
  abilities: [
    {key:"str", name:"Strength",     blurb:"Physical power, athletic prowess. Carrying, breaking, throwing."},
    {key:"dex", name:"Dexterity",    blurb:"Agility, reflexes, balance. Stealth, evasion, finesse."},
    {key:"con", name:"Constitution", blurb:"Health, stamina, vital force. Hit points, fortitude saves."},
    {key:"int", name:"Intelligence", blurb:"Reasoning, memory, analytical thought. Lore, investigation."},
    {key:"wis", name:"Wisdom",       blurb:"Awareness, intuition, insight. Perception, willpower."},
    {key:"cha", name:"Charisma",     blurb:"Force of personality, persuasiveness. Influence, presence."}
  ],

  skills: [
    {name:"Acrobatics",      ability:"dex"},
    {name:"Animal Handling", ability:"wis"},
    {name:"Arcana",          ability:"int"},
    {name:"Athletics",       ability:"str"},
    {name:"Deception",       ability:"cha"},
    {name:"History",         ability:"int"},
    {name:"Insight",         ability:"wis"},
    {name:"Intimidation",    ability:"cha"},
    {name:"Investigation",   ability:"int"},
    {name:"Medicine",        ability:"wis"},
    {name:"Nature",          ability:"int"},
    {name:"Perception",      ability:"wis"},
    {name:"Performance",     ability:"cha"},
    {name:"Persuasion",      ability:"cha"},
    {name:"Religion",        ability:"int"},
    {name:"Sleight of Hand", ability:"dex"},
    {name:"Stealth",         ability:"dex"},
    {name:"Survival",        ability:"wis"}
  ],

  // ─── Races (9 PHB races with subrace notes) ─────────────
  races: [
    {name:"Human", size:"Medium", speed:30, asi:{all:1}, asiText:"+1 to all abilities",
     traits:["Versatile feat at 1st (variant)", "Extra skill (variant)", "Extra language"],
     subraces:[], languages:["Common","one extra"], blurb:"Adaptable wanderers from every climate. The most numerous and varied folk of the world."},

    {name:"Elf", size:"Medium", speed:30, asi:{dex:2}, asiText:"+2 Dex (+ subrace bonus)",
     traits:["Darkvision 60 ft","Keen Senses (Perception prof.)","Fey Ancestry","Trance (4 hr rest)"],
     subraces:[
       {name:"High Elf", asi:{int:1}, asiText:"+1 Int",
        traits:["Cantrip from the wizard list (Int)","Extra language of your choice","Proficiency with longsword, shortsword, shortbow, longbow"],
        blurb:"Scholar-elves of high courts and crystalline libraries. Magic is their birth-tongue."},
       {name:"Wood Elf", asi:{wis:1}, asiText:"+1 Wis",
        traits:["Speed 35 ft","Mask of the Wild (hide when only lightly obscured by foliage, weather, or terrain)","Proficiency with longsword, shortsword, shortbow, longbow"],
        blurb:"Elves of the deep wood. Quiet feet, quieter eyes."},
       {name:"Drow",     asi:{cha:1}, asiText:"+1 Cha",
        traits:["Superior Darkvision 120 ft","Sunlight Sensitivity (disadv on attacks and Perception in direct sun)","Drow Magic: Dancing Lights; Faerie Fire (3rd, 1/day); Darkness (5th, 1/day)","Proficiency with rapiers, shortswords, hand crossbows"],
        blurb:"Underdark exiles or worse — surface drow walk in dim places, watching for daylight."}
     ], languages:["Common","Elvish"],
     blurb:"Ageless folk attuned to magic and forest. Their grace is the slow grace of long-thinking things."},

    {name:"Dwarf", size:"Medium", speed:25, asi:{con:2}, asiText:"+2 Con (+ subrace bonus)",
     traits:["Darkvision 60 ft","Dwarven Resilience (adv. vs poison)","Stonecunning","Combat Training (axe, hammer)","Speed not reduced by heavy armor"],
     subraces:[
       {name:"Hill Dwarf",     asi:{wis:1}, asiText:"+1 Wis",
        traits:["Dwarven Toughness: max HP increases by 1 per level"],
        blurb:"Hill-clan dwarves: shrewd, observant, deeply rooted. Long memories for kindness and slight."},
       {name:"Mountain Dwarf", asi:{str:2}, asiText:"+2 Str",
        traits:["Proficiency with light and medium armor"],
        blurb:"Mountain-stock dwarves: built for high places and heavy armor. Spare with words, generous with ale."}
     ], languages:["Common","Dwarvish"],
     blurb:"Mountain-born artisans of stone and steel. Long memories, longer grudges."},

    {name:"Halfling", size:"Small", speed:25, asi:{dex:2}, asiText:"+2 Dex (+ subrace bonus)",
     traits:["Lucky (reroll natural 1s)","Brave (adv. vs frightened)","Halfling Nimbleness (move through larger creatures)"],
     subraces:[
       {name:"Lightfoot", asi:{cha:1}, asiText:"+1 Cha",
        traits:["Naturally Stealthy: hide even when only obscured by a creature at least one size larger"],
        blurb:"Halflings of the road and the inn. Cheerful, quick to vanish when the mood turns."},
       {name:"Stout",     asi:{con:1}, asiText:"+1 Con",
        traits:["Stout Resilience: advantage on saves vs poison; resistance to poison damage"],
        blurb:"Halflings of farm and forge. Steady, stubborn, harder to poison than most cats."}
     ], languages:["Common","Halfling"],
     blurb:"Cheerful folk with an instinct for survival. Trouble passes them by, mostly."},

    {name:"Dragonborn", size:"Medium", speed:30, asi:{str:2,cha:1}, asiText:"+2 Str, +1 Cha",
     traits:["Draconic Ancestry (chosen)","Breath Weapon (action, 2d6 → 5d6)","Damage Resistance (ancestry type)"],
     subraces:[],
     languages:["Common","Draconic"],
     blurb:"Scaled descendants of dragons. They wear their heritage on their hides."},

    {name:"Gnome", size:"Small", speed:25, asi:{int:2}, asiText:"+2 Int (+ subrace bonus)",
     traits:["Darkvision 60 ft","Gnome Cunning (adv. on Int/Wis/Cha saves vs magic)"],
     subraces:[
       {name:"Forest Gnome", asi:{dex:1}, asiText:"+1 Dex",
        traits:["Natural Illusionist: know the Minor Illusion cantrip (Int)","Speak with Small Beasts: communicate simple ideas to Small or smaller beasts"],
        blurb:"Forest-clan gnomes: shy, mischievous, friends to fox and finch."},
       {name:"Rock Gnome",   asi:{con:1}, asiText:"+1 Con",
        traits:["Artificer's Lore: add double prof on History checks about magic items, alchemy, technology","Tinker: build clockwork toys (mechanical bird, fire starter, music box) with tinker's tools"],
        blurb:"Workshop-clan gnomes: clockmakers, alchemists, polite obsessives of the small mechanism."}
     ], languages:["Common","Gnomish"],
     blurb:"Curious tinkerers and illusionists. They live four centuries and laugh through every one."},

    {name:"Half-Elf", size:"Medium", speed:30, asi:{cha:2,choose:[1,1]}, asiText:"+2 Cha, +1 to two other abilities",
     traits:["Darkvision 60 ft","Fey Ancestry","Skill Versatility (two extra skills)"],
     subraces:[],
     languages:["Common","Elvish","one extra"],
     blurb:"Walkers between two worlds, belonging fully to neither. Often diplomats, often wanderers."},

    {name:"Half-Orc", size:"Medium", speed:30, asi:{str:2,con:1}, asiText:"+2 Str, +1 Con",
     traits:["Darkvision 60 ft","Menacing (Intimidation prof.)","Relentless Endurance (drop to 1 HP, 1/long rest)","Savage Attacks (extra crit damage die)"],
     subraces:[],
     languages:["Common","Orc"],
     blurb:"Fierce, enduring, and proud. Born of two worlds, fighting for one."},

    {name:"Tiefling", size:"Medium", speed:30, asi:{cha:2,int:1}, asiText:"+2 Cha, +1 Int",
     traits:["Darkvision 60 ft","Hellish Resistance (fire)","Infernal Legacy (thaumaturgy → hellish rebuke → darkness)"],
     subraces:[],
     languages:["Common","Infernal"],
     blurb:"Touched by the lower planes. The shadow of an ancient pact runs in their blood."}
  ],

  // ─── Classes (all 12 PHB) ───────────────────────────────
  classes: [
    {name:"Barbarian", hd:12, primary:["str"], saves:["str","con"],
     armor:["Light","Medium","Shields"], weapons:["Simple","Martial"],
     skills:{count:2, list:["Animal Handling","Athletics","Intimidation","Nature","Perception","Survival"]},
     subclasses:[
       {name:"Path of the Berserker", blurb:"Rage as raw frenzy. The cost is paid afterward, in exhaustion.", features:[
         {lvl:3,  name:"Frenzy",                text:"While raging, bonus action each turn: extra melee weapon attack. When rage ends, take one level of exhaustion."},
         {lvl:3,  name:"Mindless Rage",         text:"Can't be charmed or frightened while raging. Suspended effects resume after."},
         {lvl:6,  name:"Intimidating Presence", text:"Action: target one creature within 30 ft. Wis save (DC 8 + prof + Cha) or frightened until end of next turn."},
         {lvl:10, name:"Retaliation",           text:"Reaction: when damaged by a creature within 5 ft, make a melee weapon attack against it."}
       ]},
       {name:"Path of the Totem Warrior", blurb:"Bond with a primal spirit; gain its gifts.", features:[]}
     ],
     features:[
       {lvl:1, name:"Rage", text:"Bonus action: advantage on Str checks/saves, +damage on melee, resistance to bludgeoning/piercing/slashing. 2/day at 1st."},
       {lvl:1, name:"Unarmored Defense", text:"AC = 10 + Dex + Con while not wearing armor."},
       {lvl:2, name:"Reckless Attack",   text:"Trade defense for advantage on Str-based melee attacks this turn."},
       {lvl:2, name:"Danger Sense",      text:"Advantage on Dex saves vs effects you can see."},
       {lvl:5, name:"Extra Attack",      text:"Attack twice when you take the Attack action."},
       {lvl:5, name:"Fast Movement",     text:"Speed +10 ft when not in heavy armor."},
       {lvl:9, name:"Brutal Critical",   text:"+1 damage die on melee crits."}
     ],
     equipment:["(a) greataxe or (b) any martial melee","(a) two handaxes or (b) any simple weapon","Explorer's pack","Four javelins"],
     blurb:"A fierce warrior of primal fury, capable of feats no civilized fighter can match."},

    {name:"Bard", hd:8, primary:["cha"], saves:["dex","cha"],
     armor:["Light"], weapons:["Simple","Hand Crossbow","Longsword","Rapier","Shortsword"],
     skills:{count:3, list:"any"},
     subclasses:[
       {name:"College of Lore", blurb:"Bards who hoard secrets and skewer pretension with cutting words.", features:[
         {lvl:3,  name:"Bonus Proficiencies",          text:"Gain proficiency in three skills of your choice."},
         {lvl:3,  name:"Cutting Words",                text:"Reaction: spend a Bardic Inspiration die to subtract from a creature's attack, ability check, or damage roll within 60 ft."},
         {lvl:6,  name:"Additional Magical Secrets",   text:"Learn two spells of your choice from any class. Count as bard spells; don't count against spells known."},
         {lvl:14, name:"Peerless Skill",               text:"On your own ability check: spend a Bardic Inspiration die and add it to the roll."}
       ]},
       {name:"College of Valor", blurb:"Skalds and warrior-poets — songs that fall like blows.", features:[]}
     ],
     features:[
       {lvl:1, name:"Spellcasting",          text:"Cha-based caster; known cantrips/spells, slots scale by level."},
       {lvl:1, name:"Bardic Inspiration",    text:"Bonus action: grant a creature a d6 (rising to d12) to add to a roll within 10 minutes."},
       {lvl:2, name:"Jack of All Trades",    text:"Add half prof to non-proficient ability checks."},
       {lvl:2, name:"Song of Rest",          text:"During short rest, allies regain extra d6 HP from hit dice."},
       {lvl:3, name:"Expertise",             text:"Double prof on two chosen skills (two more at 10th)."},
       {lvl:5, name:"Font of Inspiration",   text:"Bardic Inspiration recharges on short rest."},
       {lvl:6, name:"Countercharm",          text:"Action: until end of next turn, allies adv. on saves vs frightened/charmed."}
     ],
     equipment:["(a) rapier, (b) longsword, or (c) any simple weapon","(a) diplomat's pack or (b) entertainer's pack","(a) lute or (b) any other instrument","Leather armor and dagger"],
     blurb:"An inspiring magician whose power echoes the music of creation."},

    {name:"Cleric", hd:8, primary:["wis"], saves:["wis","cha"],
     armor:["Light","Medium","Shields"], weapons:["Simple"],
     skills:{count:2, list:["History","Insight","Medicine","Persuasion","Religion"]},
     subclasses:[
       {name:"Life Domain", blurb:"Servants of healing, wardens against death's hunger.", features:[
         {lvl:1,  name:"Bonus Proficiency",   text:"Gain proficiency with heavy armor."},
         {lvl:1,  name:"Disciple of Life",    text:"Healing spells of 1st level or higher restore extra HP equal to 2 + the spell's level."},
         {lvl:1,  name:"Domain Spells",       text:"Bless, Cure Wounds (1st); Lesser Restoration, Spiritual Weapon (3rd); Beacon of Hope, Revivify (5th); Death Ward, Guardian of Faith (7th); Mass Cure Wounds, Raise Dead (9th)."},
         {lvl:2,  name:"Channel Divinity: Preserve Life", text:"Action: pool of healing equal to 5×cleric level, distributed among creatures within 30 ft. Can't raise a target above half max HP."},
         {lvl:6,  name:"Blessed Healer",      text:"When a healing spell you cast restores HP to others, you regain 2 + the spell's level."},
         {lvl:8,  name:"Divine Strike",       text:"Once per turn on a weapon hit: +1d8 radiant damage. Increases to 2d8 at 14th."},
         {lvl:17, name:"Supreme Healing",     text:"When a healing spell would roll dice for HP, treat each die as its maximum value."}
       ]},
       {name:"Light Domain",     blurb:"Sun and flame; revelation as weapon.",       features:[]},
       {name:"War Domain",       blurb:"Battle-priests anointed for the front line.", features:[]},
       {name:"Knowledge Domain", blurb:"Keepers of forbidden lore; truth as a relic.",features:[]},
       {name:"Nature Domain",    blurb:"Druidic clerics — green faith with rites.",   features:[]},
       {name:"Tempest Domain",   blurb:"Storm and sea, thunder and reckoning.",       features:[]},
       {name:"Trickery Domain",  blurb:"Whispers, veils, and a saint's sleight of hand.", features:[]}
     ],
     features:[
       {lvl:1, name:"Spellcasting",       text:"Wis-based caster; prepare from full cleric list each long rest."},
       {lvl:1, name:"Divine Domain",      text:"Choose a domain at 1st; grants spells, skills, and features."},
       {lvl:2, name:"Channel Divinity",   text:"Turn Undead, plus a domain option. 1/rest, scaling to 3/rest."},
       {lvl:5, name:"Destroy Undead",     text:"Turn Undead destroys low-CR undead."},
       {lvl:10,name:"Divine Intervention",text:"Once/long rest: %=level chance your deity intervenes."}
     ],
     equipment:["(a) mace or (b) warhammer (if proficient)","(a) scale mail, (b) leather, or (c) chain mail (if proficient)","(a) light crossbow & 20 bolts or (b) any simple weapon","(a) priest's pack or (b) explorer's pack","Shield and holy symbol"],
     blurb:"A priestly champion who wields divine magic in the service of a higher power."},

    {name:"Druid", hd:8, primary:["wis"], saves:["int","wis"],
     armor:["Light","Medium (non-metal)","Shields (non-metal)"], weapons:["Club","Dagger","Dart","Javelin","Mace","Quarterstaff","Scimitar","Sickle","Sling","Spear"],
     skills:{count:2, list:["Arcana","Animal Handling","Insight","Medicine","Nature","Perception","Religion","Survival"]},
     subclasses:[
       {name:"Circle of the Land", blurb:"Druids of arcane lineage; mystics of place.", features:[
         {lvl:2,  name:"Bonus Cantrip",   text:"Learn one druid cantrip of your choice."},
         {lvl:2,  name:"Natural Recovery",text:"On a short rest 1/day: recover spell slots whose total combined level ≤ half druid level (rounded up). No 6th+ slots."},
         {lvl:3,  name:"Circle Spells",   text:"Choose a land (Arctic, Coast, Desert, Forest, Grassland, Mountain, Swamp, Underdark). Add themed spells to prepared list at 3rd, 5th, 7th, 9th levels."},
         {lvl:6,  name:"Land's Stride",   text:"Move through nonmagical difficult terrain at normal speed. Advantage on saves vs plants that magically impede."},
         {lvl:10, name:"Nature's Ward",   text:"Immune to poison/disease and to being charmed/frightened by elementals or fey."},
         {lvl:14, name:"Nature's Sanctuary", text:"Beasts and plants hesitate to attack you. Wis save (DC 8 + prof + Wis) or pick a different target."}
       ]},
       {name:"Circle of the Moon", blurb:"Wild Shape into apex predators; defenders of the wilderness.", features:[]}
     ],
     features:[
       {lvl:1, name:"Druidic",        text:"Secret druid language; leave hidden messages."},
       {lvl:1, name:"Spellcasting",   text:"Wis-based caster; prepare from full druid list each long rest."},
       {lvl:2, name:"Wild Shape",     text:"Action: assume the form of a beast you've seen. 2/short rest; CR/forms scale."},
       {lvl:2, name:"Druid Circle",   text:"Subclass features; Land grants extra spells & natural recovery."},
       {lvl:18,name:"Timeless Body",  text:"Age slowly; aging magic doesn't affect you."}
     ],
     equipment:["(a) wooden shield or (b) any simple weapon","(a) scimitar or (b) any simple melee","Leather armor, explorer's pack, druidic focus"],
     blurb:"A priest of the Old Faith, calling on nature and the moon."},

    {name:"Fighter", hd:10, primary:["str","dex"], saves:["str","con"],
     armor:["All armor","Shields"], weapons:["Simple","Martial"],
     skills:{count:2, list:["Acrobatics","Animal Handling","Athletics","History","Insight","Intimidation","Perception","Survival"]},
     subclasses:[
       {name:"Champion", blurb:"Pure martial excellence. Crit early and often.", features:[
         {lvl:3,  name:"Improved Critical",        text:"Weapon attacks score a critical hit on a roll of 19 or 20."},
         {lvl:7,  name:"Remarkable Athlete",       text:"Add half your prof bonus (round up) to any Str/Dex/Con check that doesn't already use prof. Running long jumps go +Str ft."},
         {lvl:10, name:"Additional Fighting Style",text:"Choose a second Fighting Style."},
         {lvl:15, name:"Superior Critical",        text:"Weapon attacks score a critical hit on a roll of 18, 19, or 20."},
         {lvl:18, name:"Survivor",                 text:"At the start of your turn, regain 5 + Con mod HP if at half max HP or below (and above 0)."}
       ]},
       {name:"Battle Master",    blurb:"Tactician with maneuvers — the science of the strike.", features:[]},
       {name:"Eldritch Knight",  blurb:"Fighter laced with abjuration and evocation.", features:[]}
     ],
     features:[
       {lvl:1, name:"Fighting Style",   text:"Choose: Archery, Defense, Dueling, Great Weapon, Protection, Two-Weapon."},
       {lvl:1, name:"Second Wind",      text:"Bonus action: regain 1d10 + level HP. 1/short rest."},
       {lvl:2, name:"Action Surge",     text:"Take an additional action on your turn. 1/short rest, 2 at 17th."},
       {lvl:5, name:"Extra Attack",     text:"Attack twice (3 at 11th, 4 at 20th)."},
       {lvl:9, name:"Indomitable",      text:"Reroll a failed save. Uses scale with level."}
     ],
     equipment:["(a) chain mail or (b) leather, longbow, 20 arrows","(a) martial weapon & shield or (b) two martial weapons","(a) light crossbow & 20 bolts or (b) two handaxes","(a) dungeoneer's pack or (b) explorer's pack"],
     blurb:"A master of martial combat, skilled with a variety of weapons and armor."},

    {name:"Monk", hd:8, primary:["dex","wis"], saves:["str","dex"],
     armor:[], weapons:["Simple","Shortsword"],
     skills:{count:2, list:["Acrobatics","Athletics","History","Insight","Religion","Stealth"]},
     subclasses:[
       {name:"Way of the Open Hand", blurb:"The fundamental discipline. Body as weapon, breath as anchor.", features:[
         {lvl:3,  name:"Open Hand Technique",  text:"On a Flurry of Blows hit, choose: target Dex save or knocked prone; Str save or pushed up to 15 ft; or no reactions until end of your next turn."},
         {lvl:6,  name:"Wholeness of Body",    text:"Action: regain HP equal to 3×monk level. 1/long rest."},
         {lvl:11, name:"Tranquility",          text:"At end of long rest, gain Sanctuary (DC 8 + Wis + prof) until your next long rest."},
         {lvl:17, name:"Quivering Palm",       text:"Spend 3 ki on hit to set vibrations. Later, action to end them: Con save (DC 8 + Wis + prof) or 10d10 necrotic; half on save."}
       ]},
       {name:"Way of Shadow",          blurb:"Ninja arts — silence and the dark as allies.", features:[]},
       {name:"Way of the Four Elements", blurb:"Channel ki as elemental disciplines.",        features:[]}
     ],
     features:[
       {lvl:1, name:"Unarmored Defense", text:"AC = 10 + Dex + Wis without armor or shield."},
       {lvl:1, name:"Martial Arts",      text:"Use Dex for unarmed strikes & monk weapons; bonus unarmed strike."},
       {lvl:2, name:"Ki",                text:"Pool of ki points = monk level. Spend on Flurry of Blows, Patient Defense, Step of the Wind."},
       {lvl:2, name:"Unarmored Movement",text:"+10 ft speed without armor; scales to +30."},
       {lvl:5, name:"Extra Attack",      text:"Attack twice when you take the Attack action."},
       {lvl:5, name:"Stunning Strike",   text:"Spend 1 ki on a hit: Con save or stunned until end of your next turn."}
     ],
     equipment:["(a) shortsword or (b) any simple weapon","(a) dungeoneer's pack or (b) explorer's pack","10 darts"],
     blurb:"A martial artist channeling unarmed power and the body's hidden currents."},

    {name:"Paladin", hd:10, primary:["str","cha"], saves:["wis","cha"],
     armor:["All armor","Shields"], weapons:["Simple","Martial"],
     skills:{count:2, list:["Athletics","Insight","Intimidation","Medicine","Persuasion","Religion"]},
     subclasses:[
       {name:"Oath of Devotion", blurb:"The clean oath: honor, courage, compassion. Steel and sunlight.", features:[
         {lvl:3,  name:"Channel Divinity: Sacred Weapon", text:"Action: weapon you hold gains +Cha to hit, sheds 20 ft bright light, becomes magical for 1 minute."},
         {lvl:3,  name:"Channel Divinity: Turn the Unholy", text:"Action: each fiend or undead within 30 ft makes a Wis save or is turned for 1 minute."},
         {lvl:3,  name:"Oath Spells", text:"Protection from Evil, Sanctuary (3rd); Lesser Restoration, Zone of Truth (5th); Beacon of Hope, Dispel Magic (9th); Freedom of Movement, Guardian of Faith (13th); Commune, Flame Strike (17th)."},
         {lvl:7,  name:"Aura of Devotion",    text:"You and friendly creatures within 10 ft can't be charmed while you're conscious. 30 ft at 18th."},
         {lvl:15, name:"Purity of Spirit",    text:"You always have Protection from Evil and Good active on yourself."},
         {lvl:20, name:"Holy Nimbus",         text:"Action: 30 ft sunlight aura for 1 minute. Hostile creatures starting their turn in it take 10 radiant. Adv on saves vs spells from fiends/undead. 1/long rest."}
       ]},
       {name:"Oath of the Ancients", blurb:"Old oath of the green: light, life, and the laughter of springs.", features:[]},
       {name:"Oath of Vengeance",    blurb:"Hunters of the irredeemable. Mercy is a tool, not a master.",  features:[]}
     ],
     features:[
       {lvl:1, name:"Divine Sense",   text:"Action: detect celestials, fiends, undead within 60 ft. 1+Cha mod uses/long rest."},
       {lvl:1, name:"Lay on Hands",   text:"Healing pool of 5×level HP, restored on long rest."},
       {lvl:2, name:"Fighting Style", text:"Choose: Defense, Dueling, Great Weapon, Protection."},
       {lvl:2, name:"Spellcasting",   text:"Cha-based half-caster; prepare paladin spells."},
       {lvl:2, name:"Divine Smite",   text:"On a hit, expend a spell slot for +2d8 radiant (+1d8 per slot above 1st)."},
       {lvl:3, name:"Sacred Oath",    text:"Choose your oath; gain Channel Divinity & oath spells."},
       {lvl:5, name:"Extra Attack",   text:"Attack twice when you take the Attack action."},
       {lvl:6, name:"Aura of Protection", text:"You and allies within 10 ft add your Cha mod to saves."}
     ],
     equipment:["(a) martial weapon & shield or (b) two martial weapons","(a) five javelins or (b) any simple melee","(a) priest's pack or (b) explorer's pack","Chain mail and holy symbol"],
     blurb:"A holy warrior bound by sacred oath, channel of divine light made manifest in steel."},

    {name:"Ranger", hd:10, primary:["dex","wis"], saves:["str","dex"],
     armor:["Light","Medium","Shields"], weapons:["Simple","Martial"],
     skills:{count:3, list:["Animal Handling","Athletics","Insight","Investigation","Nature","Perception","Stealth","Survival"]},
     subclasses:[
       {name:"Hunter", blurb:"Specialist tracker; tactics tuned to a chosen prey.", features:[
         {lvl:3,  name:"Hunter's Prey", text:"Pick one: Colossus Slayer (+1d8 vs wounded once/turn); Giant Killer (reaction attack vs Large+ creature missing within 5 ft); Horde Breaker (extra attack vs different creature in reach)."},
         {lvl:7,  name:"Defensive Tactics", text:"Pick one: Escape the Horde (disadv on OAs against you); Multiattack Defense (+4 AC after first hit by a creature this turn); Steel Will (adv on saves vs frightened)."},
         {lvl:11, name:"Multiattack",       text:"Pick one: Volley (cone of ranged attacks); Whirlwind Attack (melee attack against any number of creatures within 5 ft)."},
         {lvl:15, name:"Superior Hunter's Defense", text:"Pick one: Evasion; Stand Against the Tide (reaction redirect missed melee attack at another); Uncanny Dodge."}
       ]},
       {name:"Beast Master", blurb:"Pact-bond with a beast companion that fights alongside you.", features:[]}
     ],
     features:[
       {lvl:1, name:"Favored Enemy",   text:"Choose a creature type; advantage on tracking and Int checks to recall lore."},
       {lvl:1, name:"Natural Explorer",text:"Choose terrain; difficult terrain doesn't slow you, doubled prof on Int/Wis there."},
       {lvl:2, name:"Spellcasting",    text:"Wis-based half-caster; learn ranger spells (no preparing)."},
       {lvl:2, name:"Fighting Style",  text:"Choose: Archery, Defense, Dueling, Two-Weapon."},
       {lvl:3, name:"Ranger Archetype",text:"Subclass features."},
       {lvl:5, name:"Extra Attack",    text:"Attack twice when you take the Attack action."}
     ],
     equipment:["(a) scale mail or (b) leather","(a) two shortswords or (b) two simple melee","(a) dungeoneer's pack or (b) explorer's pack","Longbow and 20 arrows"],
     blurb:"A warrior who combats threats on the edges of civilization."},

    {name:"Rogue", hd:8, primary:["dex"], saves:["dex","int"],
     armor:["Light"], weapons:["Simple","Hand Crossbow","Longsword","Rapier","Shortsword"],
     skills:{count:4, list:["Acrobatics","Athletics","Deception","Insight","Intimidation","Investigation","Perception","Performance","Persuasion","Sleight of Hand","Stealth"]},
     subclasses:[
       {name:"Thief", blurb:"Burglar's craft: hands quicker than judgement.", features:[
         {lvl:3,  name:"Fast Hands",        text:"Cunning Action can also: Sleight of Hand check, use thieves' tools to disarm a trap or pick a lock, or use an object."},
         {lvl:3,  name:"Second-Story Work", text:"Climbing speed = walking speed. Running long jump distance increases by Dex mod (in feet)."},
         {lvl:9,  name:"Supreme Sneak",     text:"Advantage on Stealth if you move no more than half your speed on the same turn."},
         {lvl:13, name:"Use Magic Device",  text:"Ignore class, race, and level requirements on the use of magic items."},
         {lvl:17, name:"Thief's Reflexes",  text:"Take two turns during the first round of combat (the second on initiative count − 10)."}
       ]},
       {name:"Assassin",         blurb:"Death-merchant. Surprise + auto-crit on the unaware.",      features:[]},
       {name:"Arcane Trickster", blurb:"Rogue with enchantment and illusion sleight of hand.",      features:[]}
     ],
     features:[
       {lvl:1, name:"Expertise",       text:"Double prof on two chosen skills (two more at 6th)."},
       {lvl:1, name:"Sneak Attack",    text:"Once/turn: extra 1d6 (rises to 10d6) on a hit with advantage or an ally adjacent."},
       {lvl:1, name:"Thieves' Cant",   text:"Secret rogue argot."},
       {lvl:2, name:"Cunning Action",  text:"Bonus action: Dash, Disengage, or Hide."},
       {lvl:5, name:"Uncanny Dodge",   text:"Reaction: halve damage from one attacker you can see."},
       {lvl:7, name:"Evasion",         text:"On Dex saves for half: take none on success, half on fail."}
     ],
     equipment:["(a) rapier or (b) shortsword","(a) shortbow & quiver or (b) shortsword","(a) burglar's pack, (b) dungeoneer's, or (c) explorer's","Leather armor, two daggers, thieves' tools"],
     blurb:"A scoundrel who uses stealth and trickery — and a knife in the back when no one is looking."},

    {name:"Sorcerer", hd:6, primary:["cha"], saves:["con","cha"],
     armor:[], weapons:["Dagger","Dart","Sling","Quarterstaff","Light Crossbow"],
     skills:{count:2, list:["Arcana","Deception","Insight","Intimidation","Persuasion","Religion"]},
     subclasses:[
       {name:"Draconic Bloodline", blurb:"Inheritor of dragon blood; scales beneath the skin.", features:[
         {lvl:1,  name:"Dragon Ancestor",     text:"Choose a chromatic or metallic ancestor. Learn Draconic. Charisma checks involving dragons double prof."},
         {lvl:1,  name:"Draconic Resilience", text:"Max HP increases by 1 per sorcerer level. Unarmored AC = 13 + Dex."},
         {lvl:6,  name:"Elemental Affinity",  text:"When casting a spell of your ancestor's damage type, add Cha mod to one damage roll. Spend 1 sorcery point: gain resistance to that damage for 1 hour."},
         {lvl:14, name:"Dragon Wings",        text:"Bonus action: grow leathery wings, fly speed = walking speed. Lasts until you dismiss them."},
         {lvl:18, name:"Draconic Presence",   text:"Spend 5 sorcery points: 60 ft aura of awe or dread for 1 minute. Wis save or charmed/frightened (your choice)."}
       ]},
       {name:"Wild Magic", blurb:"Sorcerer who is also a leak in reality. Bend the laws; the laws bend back.", features:[]}
     ],
     features:[
       {lvl:1, name:"Spellcasting",       text:"Cha-based caster; spells known, no preparing."},
       {lvl:1, name:"Sorcerous Origin",   text:"Subclass; Draconic grants extra HP, scaled skin AC; Wild Magic rolls on a chaos table."},
       {lvl:2, name:"Font of Magic",      text:"Sorcery points = level. Convert slots ↔ points."},
       {lvl:3, name:"Metamagic",          text:"Twin, Quicken, Subtle, Heightened, Distant, Empowered, Extended, Careful."},
       {lvl:20,name:"Sorcerous Restoration", text:"Regain 4 sorcery points on short rest (1/rest)."}
     ],
     equipment:["(a) light crossbow & 20 bolts or (b) any simple weapon","(a) component pouch or (b) arcane focus","(a) dungeoneer's pack or (b) explorer's pack","Two daggers"],
     blurb:"A spellcaster who draws on inherent magic — a gift, a curse, a bloodline that hums beneath the skin."},

    {name:"Warlock", hd:8, primary:["cha"], saves:["wis","cha"],
     armor:["Light"], weapons:["Simple"],
     skills:{count:2, list:["Arcana","Deception","History","Intimidation","Investigation","Nature","Religion"]},
     subclasses:[
       {name:"The Fiend", blurb:"Pact with a devil or demon. Power for souls — fair, or unfair?", features:[
         {lvl:1,  name:"Expanded Spell List",  text:"Add to known: Burning Hands, Command (1st); Blindness/Deafness, Scorching Ray (2nd); Fireball, Stinking Cloud (3rd); Fire Shield, Wall of Fire (4th); Flame Strike, Hallow (5th)."},
         {lvl:1,  name:"Dark One's Blessing",  text:"When you reduce a hostile to 0 HP, gain Cha mod + warlock level temp HP."},
         {lvl:6,  name:"Dark One's Own Luck",  text:"Add 1d10 to one ability check or save you make. Recharges on short rest."},
         {lvl:10, name:"Fiendish Resilience",  text:"At rest end, choose a damage type. Resistance to that damage until you choose another."},
         {lvl:14, name:"Hurl Through Hell",    text:"On a hit, send the creature on a hellish trip. Returns at start of next turn taking 10d10 psychic. 1/long rest."}
       ]},
       {name:"The Archfey",      blurb:"Court-bound bargain. Charm and glamour as currency.", features:[]},
       {name:"The Great Old One",blurb:"Pact with the unknowable. Telepathy and quiet wrongness.", features:[]}
     ],
     features:[
       {lvl:1, name:"Otherworldly Patron", text:"Subclass; grants expanded spells and an early feature."},
       {lvl:1, name:"Pact Magic",          text:"Cha-based; few slots that recharge on a short rest, all of the highest level you can cast."},
       {lvl:2, name:"Eldritch Invocations",text:"Magical perks; pick from a list, more at higher levels."},
       {lvl:3, name:"Pact Boon",           text:"Pact of the Chain (familiar), Blade (summoned weapon), or Tome (extra cantrips)."},
       {lvl:11,name:"Mystic Arcanum",      text:"One 6th-level spell, free 1/long rest. (Adds 7th–9th later.)"}
     ],
     equipment:["(a) light crossbow & 20 bolts or (b) any simple weapon","(a) component pouch or (b) arcane focus","(a) scholar's pack or (b) dungeoneer's pack","Leather armor, simple weapon, two daggers"],
     blurb:"A wielder of magic granted by a pact with an otherworldly being."},

    {name:"Wizard", hd:6, primary:["int"], saves:["int","wis"],
     armor:[], weapons:["Dagger","Dart","Sling","Quarterstaff","Light Crossbow"],
     skills:{count:2, list:["Arcana","History","Insight","Investigation","Medicine","Religion"]},
     subclasses:[
       {name:"School of Evocation", blurb:"Wizards who shape force into form: fire, lightning, the architecture of harm.", features:[
         {lvl:2,  name:"Evocation Savant",     text:"Time and gold to copy evocation spells into your spellbook is halved."},
         {lvl:2,  name:"Sculpt Spells",        text:"On an evocation spell that lets others save, choose a number of creatures = 1 + spell level. They auto-save and take no damage."},
         {lvl:6,  name:"Potent Cantrip",       text:"On a save vs your cantrip: target still takes half damage (no other effects)."},
         {lvl:10, name:"Empowered Evocation",  text:"Add Int mod to one damage roll of any wizard evocation spell."},
         {lvl:14, name:"Overchannel",          text:"Cast a 1st–5th level spell with maximum damage dice. After first use, suffer 2d12 necrotic per spell level on subsequent uses (rising) until long rest."}
       ]},
       {name:"School of Abjuration",   blurb:"Defensive magic; wards and counterspell.",     features:[]},
       {name:"School of Conjuration",  blurb:"Summoning and translocation.",                 features:[]},
       {name:"School of Divination",   blurb:"Foresight; portent dice that bend probability.", features:[]},
       {name:"School of Enchantment",  blurb:"Charm, hypnosis, the politics of the mind.",   features:[]},
       {name:"School of Illusion",     blurb:"Lies made real enough to wound.",              features:[]},
       {name:"School of Necromancy",   blurb:"Death magic, blood magic, undead bound.",      features:[]},
       {name:"School of Transmutation",blurb:"Change is the world's only constant — accelerate it.", features:[]}
     ],
     features:[
       {lvl:1, name:"Spellcasting",          text:"Int-based; prepare from your spellbook each long rest."},
       {lvl:1, name:"Arcane Recovery",       text:"On a short rest 1/day: recover slots totaling half your level (no 6th+)."},
       {lvl:2, name:"Arcane Tradition",      text:"Subclass; School features."},
       {lvl:18,name:"Spell Mastery",         text:"Cast one 1st- and one 2nd-level spell at will (chosen)."}
     ],
     equipment:["(a) quarterstaff or (b) dagger","(a) component pouch or (b) arcane focus","(a) scholar's pack or (b) explorer's pack","Spellbook"],
     blurb:"A scholarly magic-user supreme, master of cantrip and conflagration alike."}
  ],

  // ─── Backgrounds ────────────────────────────────────────
  backgrounds: [
    {name:"Acolyte",       skills:["Insight","Religion"],          tools:[],            languages:2, feature:"Shelter of the Faithful", blurb:"You spent your life in the service of a temple. You know its rites, its language, its wounded silences."},
    {name:"Charlatan",     skills:["Deception","Sleight of Hand"], tools:["Disguise kit","Forgery kit"], languages:0, feature:"False Identity", blurb:"Charm and a quick lie have always paid the rent."},
    {name:"Criminal",      skills:["Deception","Stealth"],         tools:["Gaming set","Thieves' tools"], languages:0, feature:"Criminal Contact", blurb:"You've broken laws — most of them. You know the underworld's price."},
    {name:"Entertainer",   skills:["Acrobatics","Performance"],    tools:["Disguise kit","Musical instrument"], languages:0, feature:"By Popular Demand", blurb:"You earn coin and lodging with talent and presence."},
    {name:"Folk Hero",     skills:["Animal Handling","Survival"],  tools:["Artisan's tools","Vehicles (land)"], languages:0, feature:"Rustic Hospitality", blurb:"The common folk see you as one of their own — and a champion."},
    {name:"Guild Artisan", skills:["Insight","Persuasion"],        tools:["Artisan's tools"], languages:1, feature:"Guild Membership", blurb:"You are a craftsperson of standing. Your guild is family and contract both."},
    {name:"Hermit",        skills:["Medicine","Religion"],         tools:["Herbalism kit"], languages:1, feature:"Discovery", blurb:"You spent years in seclusion. You returned with a truth no one else has."},
    {name:"Noble",         skills:["History","Persuasion"],        tools:["Gaming set"], languages:1, feature:"Position of Privilege", blurb:"You were born to wealth, expectation, and the cold civility of high tables."},
    {name:"Outlander",     skills:["Athletics","Survival"],        tools:["Musical instrument"], languages:1, feature:"Wanderer", blurb:"You know the wilderness as a city-dweller knows their street. It's home."},
    {name:"Sage",          skills:["Arcana","History"],            tools:[], languages:2, feature:"Researcher", blurb:"A life among books, a head full of footnotes."},
    {name:"Sailor",        skills:["Athletics","Perception"],      tools:["Navigator's tools","Vehicles (water)"], languages:0, feature:"Ship's Passage", blurb:"Salt under the nails, horizon in the eye."},
    {name:"Soldier",       skills:["Athletics","Intimidation"],    tools:["Gaming set","Vehicles (land)"], languages:0, feature:"Military Rank", blurb:"You served. The discipline never left you."}
  ],

  // ─── Spells (50, levels 0–9) ────────────────────────────
  spells: [
    // Cantrips (lvl 0)
    {name:"Fire Bolt",         level:0, school:"Evocation",    cast:"Action",       range:"120 ft",      components:"V,S",   duration:"Instant",       classes:["Sorcerer","Wizard"], blurb:"Hurl a mote of fire (1d10 fire) at a target. Scales by level."},
    {name:"Mage Hand",         level:0, school:"Conjuration",  cast:"Action",       range:"30 ft",       components:"V,S",   duration:"1 minute",      classes:["Bard","Sorcerer","Warlock","Wizard"], blurb:"A spectral hand manipulates objects up to 10 lb."},
    {name:"Light",             level:0, school:"Evocation",    cast:"Action",       range:"Touch",       components:"V,M",   duration:"1 hour",        classes:["Bard","Cleric","Sorcerer","Wizard"], blurb:"Touched object sheds 20 ft bright, 20 ft dim light."},
    {name:"Sacred Flame",      level:0, school:"Evocation",    cast:"Action",       range:"60 ft",       components:"V,S",   duration:"Instant",       classes:["Cleric"], blurb:"Flame-like radiance descends; Dex save or 1d8 radiant."},
    {name:"Eldritch Blast",    level:0, school:"Evocation",    cast:"Action",       range:"120 ft",      components:"V,S",   duration:"Instant",       classes:["Warlock"], blurb:"Beam of crackling energy (1d10 force). Adds beams at 5/11/17."},
    {name:"Vicious Mockery",   level:0, school:"Enchantment",  cast:"Action",       range:"60 ft",       components:"V",     duration:"Instant",       classes:["Bard"], blurb:"Wis save or 1d4 psychic and disadvantage on next attack."},
    {name:"Prestidigitation",  level:0, school:"Transmutation",cast:"Action",       range:"10 ft",       components:"V,S",   duration:"Up to 1 hour",  classes:["Bard","Sorcerer","Warlock","Wizard"], blurb:"Minor magical trick: clean, flavor, light tap, etc."},
    {name:"Druidcraft",        level:0, school:"Transmutation",cast:"Action",       range:"30 ft",       components:"V,S",   duration:"Instant",       classes:["Druid"], blurb:"Predict weather, bloom a flower, light/snuff a flame."},

    // Lvl 1
    {name:"Shield",            level:1, school:"Abjuration",   cast:"Reaction",     range:"Self",        components:"V,S",   duration:"1 round",       classes:["Sorcerer","Wizard"], blurb:"+5 AC until your next turn; immune to magic missile."},
    {name:"Magic Missile",     level:1, school:"Evocation",    cast:"Action",       range:"120 ft",      components:"V,S",   duration:"Instant",       classes:["Sorcerer","Wizard"], blurb:"Three darts of force, 1d4+1 each, auto-hit."},
    {name:"Cure Wounds",       level:1, school:"Evocation",    cast:"Action",       range:"Touch",       components:"V,S",   duration:"Instant",       classes:["Bard","Cleric","Druid","Paladin","Ranger"], blurb:"Touched creature regains 1d8 + spellcasting mod HP."},
    {name:"Bless",             level:1, school:"Enchantment",  cast:"Action",       range:"30 ft",       components:"V,S,M", duration:"Conc., 1 min",  classes:["Cleric","Paladin"], blurb:"Up to three creatures add 1d4 to attacks and saves."},
    {name:"Detect Magic",      level:1, school:"Divination",   cast:"Action",       range:"Self",        components:"V,S",   duration:"Conc., 10 min", classes:["Bard","Cleric","Druid","Paladin","Ranger","Sorcerer","Wizard"], blurb:"Sense the presence of magic within 30 ft."},
    {name:"Sleep",             level:1, school:"Enchantment",  cast:"Action",       range:"90 ft",       components:"V,S,M", duration:"1 min",         classes:["Bard","Sorcerer","Wizard"], blurb:"5d8 HP of creatures fall unconscious (lowest first)."},
    {name:"Healing Word",      level:1, school:"Evocation",    cast:"Bonus Action", range:"60 ft",       components:"V",     duration:"Instant",       classes:["Bard","Cleric","Druid"], blurb:"Heal 1d4 + spellcasting mod at range."},
    {name:"Faerie Fire",       level:1, school:"Evocation",    cast:"Action",       range:"60 ft",       components:"V",     duration:"Conc., 1 min",  classes:["Bard","Druid"], blurb:"20-ft cube; Dex save or outline creatures (advantage to hit)."},
    {name:"Hex",               level:1, school:"Enchantment",  cast:"Bonus Action", range:"90 ft",       components:"V,S,M", duration:"Conc., 1 hr",   classes:["Warlock"], blurb:"Curse a creature: +1d6 necrotic on your hits, disadv. on a chosen ability."},
    {name:"Thunderwave",       level:1, school:"Evocation",    cast:"Action",       range:"Self (15-ft cube)", components:"V,S", duration:"Instant",   classes:["Bard","Druid","Sorcerer","Wizard"], blurb:"15-ft cube; Con save or 2d8 thunder and pushed 10 ft."},

    // Lvl 2
    {name:"Misty Step",        level:2, school:"Conjuration",  cast:"Bonus Action", range:"Self",        components:"V",     duration:"Instant",       classes:["Sorcerer","Warlock","Wizard"], blurb:"Teleport up to 30 ft to an unoccupied space you can see."},
    {name:"Mirror Image",      level:2, school:"Illusion",     cast:"Action",       range:"Self",        components:"V,S",   duration:"1 min",         classes:["Sorcerer","Warlock","Wizard"], blurb:"Three illusory duplicates that misdirect attacks."},
    {name:"Hold Person",       level:2, school:"Enchantment",  cast:"Action",       range:"60 ft",       components:"V,S,M", duration:"Conc., 1 min",  classes:["Bard","Cleric","Druid","Sorcerer","Warlock","Wizard"], blurb:"Humanoid Wis save or paralyzed."},
    {name:"Spiritual Weapon",  level:2, school:"Evocation",    cast:"Bonus Action", range:"60 ft",       components:"V,S",   duration:"1 min",         classes:["Cleric"], blurb:"Floating weapon attacks for 1d8 + Wis force. Move 20 ft as bonus action."},
    {name:"Web",               level:2, school:"Conjuration",  cast:"Action",       range:"60 ft",       components:"V,S,M", duration:"Conc., 1 hr",   classes:["Sorcerer","Wizard"], blurb:"20-ft sticky cube; Str save or restrained, difficult terrain."},
    {name:"Invisibility",      level:2, school:"Illusion",     cast:"Action",       range:"Touch",       components:"V,S,M", duration:"Conc., 1 hr",   classes:["Bard","Sorcerer","Warlock","Wizard"], blurb:"Touched creature becomes invisible until they attack/cast."},

    // Lvl 3
    {name:"Fireball",          level:3, school:"Evocation",    cast:"Action",       range:"150 ft",      components:"V,S,M", duration:"Instant",       classes:["Sorcerer","Wizard"], blurb:"20-ft radius, 8d6 fire (Dex save half)."},
    {name:"Counterspell",      level:3, school:"Abjuration",   cast:"Reaction",     range:"60 ft",       components:"S",     duration:"Instant",       classes:["Sorcerer","Warlock","Wizard"], blurb:"Interrupt a spell of 3rd level or lower automatically."},
    {name:"Fly",               level:3, school:"Transmutation",cast:"Action",       range:"Touch",       components:"V,S,M", duration:"Conc., 10 min", classes:["Sorcerer","Warlock","Wizard"], blurb:"Target gains a flying speed of 60 ft."},
    {name:"Lightning Bolt",    level:3, school:"Evocation",    cast:"Action",       range:"Self (100-ft line)", components:"V,S,M", duration:"Instant", classes:["Sorcerer","Wizard"], blurb:"100-ft line, 8d6 lightning (Dex save half)."},
    {name:"Revivify",          level:3, school:"Necromancy",   cast:"Action",       range:"Touch",       components:"V,S,M", duration:"Instant",       classes:["Cleric","Paladin"], blurb:"Bring back a creature dead within 1 minute (no missing parts)."},
    {name:"Haste",             level:3, school:"Transmutation",cast:"Action",       range:"30 ft",       components:"V,S,M", duration:"Conc., 1 min",  classes:["Sorcerer","Wizard"], blurb:"Target: 2× speed, +2 AC, advantage on Dex saves, extra action."},
    {name:"Dispel Magic",      level:3, school:"Abjuration",   cast:"Action",       range:"120 ft",      components:"V,S",   duration:"Instant",       classes:["Bard","Cleric","Druid","Paladin","Sorcerer","Warlock","Wizard"], blurb:"End a spell on a target (auto for ≤3rd; check otherwise)."},

    // Lvl 4
    {name:"Polymorph",         level:4, school:"Transmutation",cast:"Action",       range:"60 ft",       components:"V,S,M", duration:"Conc., 1 hr",   classes:["Bard","Druid","Sorcerer","Wizard"], blurb:"Transform a creature into a beast of equal or lesser CR."},
    {name:"Wall of Fire",      level:4, school:"Evocation",    cast:"Action",       range:"120 ft",      components:"V,S,M", duration:"Conc., 1 min",  classes:["Druid","Sorcerer","Wizard"], blurb:"Create an opaque wall of flame; 5d8 fire on entry."},
    {name:"Greater Invisibility", level:4, school:"Illusion",  cast:"Action",       range:"Touch",       components:"V,S",   duration:"Conc., 1 min",  classes:["Bard","Sorcerer","Wizard"], blurb:"Invisible even after attacking or casting."},
    {name:"Banishment",        level:4, school:"Abjuration",   cast:"Action",       range:"60 ft",       components:"V,S,M", duration:"Conc., 1 min",  classes:["Cleric","Paladin","Sorcerer","Warlock","Wizard"], blurb:"Cha save or sent to harmless demiplane (or home plane)."},

    // Lvl 5
    {name:"Cone of Cold",      level:5, school:"Evocation",    cast:"Action",       range:"Self (60-ft cone)", components:"V,S,M", duration:"Instant", classes:["Sorcerer","Wizard"], blurb:"60-ft cone, 8d8 cold (Con save half)."},
    {name:"Raise Dead",        level:5, school:"Necromancy",   cast:"1 hour",       range:"Touch",       components:"V,S,M", duration:"Instant",       classes:["Bard","Cleric"], blurb:"Return a creature dead up to 10 days to life."},
    {name:"Hold Monster",      level:5, school:"Enchantment",  cast:"Action",       range:"90 ft",       components:"V,S,M", duration:"Conc., 1 min",  classes:["Bard","Sorcerer","Warlock","Wizard"], blurb:"Wis save or paralyzed (any non-undead)."},
    {name:"Wall of Force",     level:5, school:"Evocation",    cast:"Action",       range:"120 ft",      components:"V,S,M", duration:"Conc., 10 min", classes:["Wizard"], blurb:"Invisible, indestructible barrier up to 10×10 ft panels."},

    // Lvl 6
    {name:"Disintegrate",      level:6, school:"Transmutation",cast:"Action",       range:"60 ft",       components:"V,S,M", duration:"Instant",       classes:["Sorcerer","Wizard"], blurb:"Dex save or 10d6+40 force; 0 HP → ash."},
    {name:"Heal",              level:6, school:"Evocation",    cast:"Action",       range:"60 ft",       components:"V,S",   duration:"Instant",       classes:["Cleric","Druid"], blurb:"Restore 70 HP and end blindness/deafness/disease."},
    {name:"True Seeing",       level:6, school:"Divination",   cast:"Action",       range:"Touch",       components:"V,S,M", duration:"1 hour",        classes:["Bard","Cleric","Sorcerer","Warlock","Wizard"], blurb:"See in normal & magical darkness, see invisible & ethereal."},

    // Lvl 7
    {name:"Finger of Death",   level:7, school:"Necromancy",   cast:"Action",       range:"60 ft",       components:"V,S",   duration:"Instant",       classes:["Sorcerer","Warlock","Wizard"], blurb:"Con save or 7d8+30 necrotic; humanoid killed rises as zombie."},
    {name:"Plane Shift",       level:7, school:"Conjuration",  cast:"Action",       range:"Touch",       components:"V,S,M", duration:"Instant",       classes:["Cleric","Druid","Sorcerer","Warlock","Wizard"], blurb:"Send up to 8 willing creatures (or one unwilling) to another plane."},

    // Lvl 8
    {name:"Power Word Stun",   level:8, school:"Enchantment",  cast:"Action",       range:"60 ft",       components:"V",     duration:"Instant",       classes:["Bard","Sorcerer","Warlock","Wizard"], blurb:"Target with ≤150 HP: stunned (Con save ends on its turns)."},
    {name:"Sunburst",          level:8, school:"Evocation",    cast:"Action",       range:"150 ft",      components:"V,S,M", duration:"Instant",       classes:["Druid","Sorcerer","Wizard"], blurb:"60-ft radius, 12d6 radiant + blinded; great vs undead."},

    // Lvl 9
    {name:"Wish",              level:9, school:"Conjuration",  cast:"Action",       range:"Self",        components:"V",     duration:"Instant",       classes:["Sorcerer","Wizard"], blurb:"Duplicate any spell ≤8th level — or risk literal monkey's-paw consequences."},
    {name:"Meteor Swarm",      level:9, school:"Evocation",    cast:"Action",       range:"1 mile",      components:"V,S",   duration:"Instant",       classes:["Sorcerer","Wizard"], blurb:"Four 40-ft spheres; 20d6 fire + 20d6 bludgeoning each."},
    {name:"Time Stop",         level:9, school:"Transmutation",cast:"Action",       range:"Self",        components:"V",     duration:"Instant",       classes:["Sorcerer","Wizard"], blurb:"1d4 + 1 turns of stopped time, ending if you affect another."},
    {name:"True Resurrection", level:9, school:"Necromancy",   cast:"1 hour",       range:"Touch",       components:"V,S,M", duration:"Instant",       classes:["Cleric","Druid"], blurb:"Restore a creature dead up to 200 years; new body if needed."},

    // ── Cantrips ──
    {name:"Mending",           level:0, school:"Transmutation",cast:"1 minute",     range:"Touch",       components:"V,S,M", duration:"Instant",       classes:["Bard","Cleric","Druid","Sorcerer","Wizard"], blurb:"Repair a single break or tear in an object held."},
    {name:"Spare the Dying",   level:0, school:"Necromancy",   cast:"Action",       range:"Touch",       components:"V,S",   duration:"Instant",       classes:["Cleric"], blurb:"Stabilize a creature at 0 HP. No HP restored."},
    {name:"Guidance",          level:0, school:"Divination",   cast:"Action",       range:"Touch",       components:"V,S",   duration:"Conc., 1 min",  classes:["Cleric","Druid"], blurb:"Target adds 1d4 to one ability check (chosen before the roll)."},
    {name:"Toll the Dead",     level:0, school:"Necromancy",   cast:"Action",       range:"60 ft",       components:"V,S",   duration:"Instant",       classes:["Cleric","Warlock","Wizard"], blurb:"Wis save or 1d8 necrotic (1d12 if already wounded)."},

    // ── 1st level ──
    {name:"Burning Hands",     level:1, school:"Evocation",    cast:"Action",       range:"Self (15-ft cone)", components:"V,S",   duration:"Instant",   classes:["Sorcerer","Wizard"], blurb:"15-ft cone, 3d6 fire (Dex save half). Ignites unattended flammables."},
    {name:"Charm Person",      level:1, school:"Enchantment",  cast:"Action",       range:"30 ft",       components:"V,S",   duration:"1 hour",        classes:["Bard","Druid","Sorcerer","Warlock","Wizard"], blurb:"Wis save or charmed; ends if you or allies harm them."},
    {name:"Identify",          level:1, school:"Divination",   cast:"1 min (ritual)", range:"Touch",     components:"V,S,M", duration:"Instant",       classes:["Bard","Wizard"], blurb:"Learn an item's magical properties and how to use them."},
    {name:"Mage Armor",        level:1, school:"Abjuration",   cast:"Action",       range:"Touch",       components:"V,S,M", duration:"8 hours",       classes:["Sorcerer","Wizard"], blurb:"Willing target without armor: AC = 13 + Dex."},
    {name:"Hunter's Mark",     level:1, school:"Divination",   cast:"Bonus Action", range:"90 ft",       components:"V",     duration:"Conc., 1 hour", classes:["Ranger"], blurb:"Mark a creature: +1d6 weapon damage; advantage on Perception/Survival to find it."},

    // ── 2nd level ──
    {name:"Aid",                level:2, school:"Abjuration",   cast:"Action",      range:"30 ft",       components:"V,S,M", duration:"8 hours",       classes:["Cleric","Paladin"], blurb:"Three creatures: +5 max HP and current HP. Scales by slot."},
    {name:"Lesser Restoration", level:2, school:"Abjuration",   cast:"Action",      range:"Touch",       components:"V,S",   duration:"Instant",       classes:["Bard","Cleric","Druid","Paladin","Ranger"], blurb:"End one disease or one condition: blinded, deafened, paralyzed, poisoned."},
    {name:"Suggestion",         level:2, school:"Enchantment",  cast:"Action",      range:"30 ft",       components:"V,M",   duration:"Conc., 8 hours",classes:["Bard","Sorcerer","Warlock","Wizard"], blurb:"Wis save or follow a reasonable course of action you suggest."},
    {name:"Scorching Ray",      level:2, school:"Evocation",    cast:"Action",      range:"120 ft",      components:"V,S",   duration:"Instant",       classes:["Sorcerer","Wizard"], blurb:"Three rays of fire (each 2d6); make a separate ranged spell attack for each."},

    // ── 3rd level ──
    {name:"Animate Dead",       level:3, school:"Necromancy",  cast:"1 minute",     range:"10 ft",       components:"V,S,M", duration:"Instant",       classes:["Cleric","Wizard"], blurb:"Reanimate a Medium humanoid corpse as a skeleton or zombie under your command."},
    {name:"Spirit Guardians",   level:3, school:"Conjuration", cast:"Action",       range:"Self (15-ft radius)", components:"V,S,M", duration:"Conc., 10 min", classes:["Cleric"], blurb:"Spirits swirl: 3d8 radiant/necrotic on enter or end-of-turn; speed halved (Wis save half)."},
    {name:"Hypnotic Pattern",   level:3, school:"Illusion",    cast:"Action",       range:"120 ft",      components:"S,M",   duration:"Conc., 1 min",  classes:["Bard","Sorcerer","Warlock","Wizard"], blurb:"30-ft cube; Wis save or charmed and incapacitated until shaken."},
    {name:"Slow",               level:3, school:"Transmutation",cast:"Action",      range:"120 ft",      components:"V,S,M", duration:"Conc., 1 min",  classes:["Sorcerer","Wizard"], blurb:"Up to 6 creatures in 40-ft cube; Wis save or speed halved, -2 AC, lose reactions."},

    // ── 4th level ──
    {name:"Stoneskin",          level:4, school:"Abjuration",  cast:"Action",       range:"Touch",       components:"V,S,M", duration:"Conc., 1 hour", classes:["Druid","Ranger","Sorcerer","Wizard"], blurb:"Target gains resistance to nonmagical bludgeoning, piercing, and slashing damage."},
    {name:"Death Ward",         level:4, school:"Abjuration",  cast:"Action",       range:"Touch",       components:"V,S",   duration:"8 hours",       classes:["Cleric","Paladin"], blurb:"First time target would drop to 0 HP, drops to 1 instead. Spell ends."},
    {name:"Dimension Door",     level:4, school:"Conjuration", cast:"Action",       range:"500 ft",      components:"V",     duration:"Instant",       classes:["Bard","Sorcerer","Warlock","Wizard"], blurb:"Teleport yourself (and one Medium-or-smaller willing creature you touch) up to 500 ft."},

    // ── 5th level ──
    {name:"Bigby's Hand",       level:5, school:"Evocation",   cast:"Action",       range:"120 ft",      components:"V,S,M", duration:"Conc., 1 min",  classes:["Sorcerer","Wizard"], blurb:"Spectral hand: shove, grapple, attack (4d8 force), or interpose as bonus action."},
    {name:"Mass Cure Wounds",   level:5, school:"Evocation",   cast:"Action",       range:"60 ft",       components:"V,S",   duration:"Instant",       classes:["Bard","Cleric","Druid"], blurb:"Up to 6 creatures within a 30-ft radius regain 3d8 + spellcasting mod HP each."},
    {name:"Telekinesis",        level:5, school:"Transmutation",cast:"Action",      range:"60 ft",       components:"V,S",   duration:"Conc., 10 min", classes:["Sorcerer","Wizard"], blurb:"Move a creature or object (≤1000 lb). Contested check vs Str/your spellcasting."},

    // ── 6th level ──
    {name:"Chain Lightning",    level:6, school:"Evocation",   cast:"Action",       range:"150 ft",      components:"V,S,M", duration:"Instant",       classes:["Sorcerer","Wizard"], blurb:"10d8 lightning to one creature; arcs to 3 others within 30 ft (Dex save half)."},
    {name:"Mass Suggestion",    level:6, school:"Enchantment", cast:"Action",       range:"60 ft",       components:"V,M",   duration:"24 hours",      classes:["Bard","Sorcerer","Warlock","Wizard"], blurb:"Up to 12 creatures: Wis save or follow a suggested reasonable course of action."},

    // ── 7th level ──
    {name:"Forcecage",          level:7, school:"Evocation",   cast:"Action",       range:"100 ft",      components:"V,S,M", duration:"1 hour",        classes:["Bard","Warlock","Wizard"], blurb:"Invisible cube of force (cage or solid box). Trapped creatures get a Cha save to teleport out, once."},
    {name:"Teleport",           level:7, school:"Conjuration", cast:"Action",       range:"10 ft",       components:"V",     duration:"Instant",       classes:["Bard","Sorcerer","Wizard"], blurb:"Transport up to 8 willing creatures (or one object) to a destination you know."},

    // ── 8th level ──
    {name:"Antimagic Field",    level:8, school:"Abjuration",  cast:"Action",       range:"Self (10-ft sphere)", components:"V,S,M", duration:"Conc., 1 hour", classes:["Cleric","Wizard"], blurb:"10-ft sphere of suppression. Spells, items, and effects (yours included) don't function inside."},
    {name:"Earthquake",         level:8, school:"Evocation",   cast:"Action",       range:"500 ft",      components:"V,S,M", duration:"Conc., 1 min",  classes:["Cleric","Druid","Sorcerer"], blurb:"100-ft radius tremor; structures collapse, ground fissures, creatures knocked prone (Dex save)."},

    // ── 9th level ──
    {name:"Astral Projection",  level:9, school:"Necromancy",  cast:"1 hour",       range:"10 ft",       components:"V,S,M", duration:"Special",       classes:["Cleric","Warlock","Wizard"], blurb:"Project up to 8 willing souls into the Astral Plane; bodies remain in stasis."},
    {name:"Power Word Kill",    level:9, school:"Enchantment", cast:"Action",       range:"60 ft",       components:"V",     duration:"Instant",       classes:["Bard","Sorcerer","Warlock","Wizard"], blurb:"Target with ≤100 HP dies instantly. No save."}
  ],

  // ─── Feats ──────────────────────────────────────────────
  feats: [
    {name:"Alert",               blurb:"+5 init; can't be surprised; unseen attackers don't gain advantage on you."},
    {name:"Great Weapon Master", blurb:"Trade -5 to hit for +10 damage with heavy melee; bonus attack on crit/kill."},
    {name:"Sharpshooter",        blurb:"Trade -5 to hit for +10 damage with ranged; ignore cover; no long-range disadvantage."},
    {name:"Lucky",               blurb:"3 luck points/long rest; reroll a d20 or force a reroll."},
    {name:"Magic Initiate",      blurb:"Two cantrips and one 1st-level spell from a chosen class."},
    {name:"Resilient",           blurb:"+1 to a chosen ability; gain proficiency in its saving throws."},
    {name:"Tough",               blurb:"Maximum HP increases by twice your level."},
    {name:"War Caster",          blurb:"Adv on conc. saves; cast as opportunity attack; somatic with weapons."},
    {name:"Polearm Master",      blurb:"Bonus-action butt strike (1d4); reach weapons trigger OAs on entry."},
    {name:"Sentinel",            blurb:"OA stops movement; OA on Disengage; ally hit triggers your OA."},
    {name:"Mobile",              blurb:"+10 ft speed; ignore difficult terrain when Dashing; melee target ignores OA from you."},
    {name:"Healer",              blurb:"Use a healer's kit for 1d6+4 + level HP; revive at 1 HP."},
    {name:"Crossbow Expert",     blurb:"Ignore loading on hand crossbows; no disadvantage at 5 ft; bonus-action shot after a one-handed weapon attack."},
    {name:"Defensive Duelist",   blurb:"Reaction with a finesse weapon: add prof to AC against one melee attack."},
    {name:"Dual Wielder",        blurb:"+1 AC while wielding two weapons; can two-weapon fight with non-Light weapons; draw two weapons at once."},
    {name:"Elemental Adept",     blurb:"Pick a damage type. Spells of that type ignore resistance; treat 1s as 2s on damage dice."},
    {name:"Fey Touched",         blurb:"+1 to a chosen mental ability; learn Misty Step and one 1st-level divination/enchantment, free 1/long rest each."},
    {name:"Inspiring Leader",    blurb:"10-min pep talk: up to six creatures within 30 ft gain temp HP = level + Cha mod."},
    {name:"Observant",           blurb:"+1 Int or Wis; +5 to passive Perception/Investigation; read lips."},
    {name:"Skill Expert",        blurb:"+1 to any ability; gain a skill proficiency; gain expertise in one already proficient skill."}
  ],

  // ─── Weapons ────────────────────────────────────────────
  weapons: [
    {name:"Dagger",        cat:"Simple Melee",    dmg:"1d4 piercing",    props:"Finesse, Light, Thrown 20/60", weight:1, cost:"2 gp"},
    {name:"Quarterstaff",  cat:"Simple Melee",    dmg:"1d6 bludgeoning", props:"Versatile (1d8)",              weight:4, cost:"2 sp"},
    {name:"Spear",         cat:"Simple Melee",    dmg:"1d6 piercing",    props:"Thrown 20/60, Versatile (1d8)",weight:3, cost:"1 gp"},
    {name:"Handaxe",       cat:"Simple Melee",    dmg:"1d6 slashing",    props:"Light, Thrown 20/60",          weight:2, cost:"5 gp"},
    {name:"Mace",          cat:"Simple Melee",    dmg:"1d6 bludgeoning", props:"—",                            weight:4, cost:"5 gp"},
    {name:"Shortbow",      cat:"Simple Ranged",   dmg:"1d6 piercing",    props:"Ammunition 80/320, Two-handed",weight:2, cost:"25 gp"},
    {name:"Light Crossbow",cat:"Simple Ranged",   dmg:"1d8 piercing",    props:"Ammunition 80/320, Loading, Two-handed", weight:5, cost:"25 gp"},
    {name:"Longsword",     cat:"Martial Melee",   dmg:"1d8 slashing",    props:"Versatile (1d10)",             weight:3, cost:"15 gp"},
    {name:"Shortsword",    cat:"Martial Melee",   dmg:"1d6 piercing",    props:"Finesse, Light",               weight:2, cost:"10 gp"},
    {name:"Rapier",        cat:"Martial Melee",   dmg:"1d8 piercing",    props:"Finesse",                      weight:2, cost:"25 gp"},
    {name:"Greatsword",    cat:"Martial Melee",   dmg:"2d6 slashing",    props:"Heavy, Two-handed",            weight:6, cost:"50 gp"},
    {name:"Greataxe",      cat:"Martial Melee",   dmg:"1d12 slashing",   props:"Heavy, Two-handed",            weight:7, cost:"30 gp"},
    {name:"Glaive",        cat:"Martial Melee",   dmg:"1d10 slashing",   props:"Heavy, Reach, Two-handed",     weight:6, cost:"20 gp"},
    {name:"Maul",          cat:"Martial Melee",   dmg:"2d6 bludgeoning", props:"Heavy, Two-handed",            weight:10,cost:"10 gp"},
    {name:"Warhammer",     cat:"Martial Melee",   dmg:"1d8 bludgeoning", props:"Versatile (1d10)",             weight:2, cost:"15 gp"},
    {name:"Scimitar",      cat:"Martial Melee",   dmg:"1d6 slashing",    props:"Finesse, Light",               weight:3, cost:"25 gp"},
    {name:"Longbow",       cat:"Martial Ranged",  dmg:"1d8 piercing",    props:"Ammunition 150/600, Heavy, Two-handed", weight:2, cost:"50 gp"},
    {name:"Hand Crossbow", cat:"Martial Ranged",  dmg:"1d6 piercing",    props:"Ammunition 30/120, Light, Loading", weight:3, cost:"75 gp"},
    {name:"Heavy Crossbow",cat:"Martial Ranged",  dmg:"1d10 piercing",   props:"Ammunition 100/400, Heavy, Loading, Two-handed", weight:18, cost:"50 gp"}
  ],

  // ─── Armor ──────────────────────────────────────────────
  armor: [
    {name:"Padded",      cat:"Light",  ac:"11 + Dex",         stealth:"Disadvantage", weight:8,  cost:"5 gp"},
    {name:"Leather",     cat:"Light",  ac:"11 + Dex",         stealth:"—",            weight:10, cost:"10 gp"},
    {name:"Studded",     cat:"Light",  ac:"12 + Dex",         stealth:"—",            weight:13, cost:"45 gp"},
    {name:"Hide",        cat:"Medium", ac:"12 + Dex (max 2)", stealth:"—",            weight:12, cost:"10 gp"},
    {name:"Chain Shirt", cat:"Medium", ac:"13 + Dex (max 2)", stealth:"—",            weight:20, cost:"50 gp"},
    {name:"Scale Mail",  cat:"Medium", ac:"14 + Dex (max 2)", stealth:"Disadvantage", weight:45, cost:"50 gp"},
    {name:"Breastplate", cat:"Medium", ac:"14 + Dex (max 2)", stealth:"—",            weight:20, cost:"400 gp"},
    {name:"Half Plate",  cat:"Medium", ac:"15 + Dex (max 2)", stealth:"Disadvantage", weight:40, cost:"750 gp"},
    {name:"Ring Mail",   cat:"Heavy",  ac:"14",               stealth:"Disadvantage", weight:40, cost:"30 gp"},
    {name:"Chain Mail",  cat:"Heavy",  ac:"16",               stealth:"Disadvantage", weight:55, cost:"75 gp"},
    {name:"Splint",      cat:"Heavy",  ac:"17",               stealth:"Disadvantage", weight:60, cost:"200 gp"},
    {name:"Plate",       cat:"Heavy",  ac:"18",               stealth:"Disadvantage", weight:65, cost:"1500 gp"},
    {name:"Shield",      cat:"Shield", ac:"+2",               stealth:"—",            weight:6,  cost:"10 gp"}
  ],

  // ─── Items / magical ────────────────────────────────────
  items: [
    {name:"Bag of Holding",                  rarity:"Uncommon", attune:false, blurb:"500 lb / 64 cu. ft. interior, weighs 15 lb regardless."},
    {name:"Cloak of Elvenkind",              rarity:"Uncommon", attune:true,  blurb:"Advantage on Stealth; disadvantage on Perception to spot you."},
    {name:"Boots of Striding and Springing", rarity:"Uncommon", attune:true,  blurb:"Speed 30 ft regardless of size or carry; jump distance tripled."},
    {name:"Wand of Magic Missiles",          rarity:"Uncommon", attune:false, blurb:"7 charges; expend to cast Magic Missile (up to 3 charges)."},
    {name:"Ring of Protection",              rarity:"Rare",     attune:true,  blurb:"+1 to AC and saving throws."},
    {name:"Flame Tongue (Longsword)",        rarity:"Rare",     attune:true,  blurb:"Bonus action ignites; +2d6 fire damage on hits."},
    {name:"Bracers of Defense",              rarity:"Rare",     attune:true,  blurb:"+2 AC when wearing no armor or shield."},
    {name:"Manual of Quickness of Action",   rarity:"Very Rare",attune:false, blurb:"Permanently +2 Dex (max 24) after 48 hours of study."},
    {name:"Amulet of Health",                rarity:"Rare",     attune:true,  blurb:"Set Constitution to 19 while worn (no effect if already higher)."},
    {name:"Cloak of Protection",             rarity:"Uncommon", attune:true,  blurb:"+1 to AC and to all saving throws while worn."},
    {name:"Gauntlets of Ogre Power",         rarity:"Uncommon", attune:true,  blurb:"Set Strength to 19 while worn (no effect if already higher)."},
    {name:"Belt of Hill Giant Strength",     rarity:"Rare",     attune:true,  blurb:"Set Strength to 21 while worn (no effect if already higher)."},
    {name:"Boots of Speed",                  rarity:"Rare",     attune:true,  blurb:"Bonus action to double speed for 10 minutes; opportunity attacks against you have disadvantage. 1/long rest."},
    {name:"Headband of Intellect",           rarity:"Uncommon", attune:true,  blurb:"Set Intelligence to 19 while worn (no effect if already higher)."},
    {name:"Pearl of Power",                  rarity:"Uncommon", attune:true,  blurb:"Action: regain one expended spell slot of 3rd level or lower. Recharges next dawn."},
    {name:"Stone of Good Luck",              rarity:"Uncommon", attune:true,  blurb:"+1 to ability checks and saving throws while held."}
  ],

  // ─── Monsters (20 across CRs) ───────────────────────────
  monsters: [
    {name:"Goblin",             cr:"1/4", size:"Small",      type:"Humanoid",  hp:7,   ac:15, blurb:"Sneaky, cowardly raiders. Nimble Escape lets them disengage as a bonus action."},
    {name:"Wolf",               cr:"1/4", size:"Medium",     type:"Beast",     hp:11,  ac:13, blurb:"Pack hunter; bite knocks prone (Str save DC 11)."},
    {name:"Skeleton",           cr:"1/4", size:"Medium",     type:"Undead",    hp:13,  ac:13, blurb:"Animated bone soldier; vulnerable to bludgeoning."},
    {name:"Zombie",             cr:"1/4", size:"Medium",     type:"Undead",    hp:22,  ac:8,  blurb:"Shambling corpse; Undead Fortitude lets it survive lethal hits on a Con save."},
    {name:"Orc",                cr:"1/2", size:"Medium",     type:"Humanoid",  hp:15,  ac:13, blurb:"Aggressive raider; Aggressive lets it Dash toward a hostile as a bonus action."},
    {name:"Hobgoblin",          cr:"1/2", size:"Medium",     type:"Humanoid",  hp:11,  ac:18, blurb:"Disciplined martial cohort; Martial Advantage adds 2d6 vs flanked enemies."},
    {name:"Gnoll",              cr:"1/2", size:"Medium",     type:"Humanoid",  hp:22,  ac:15, blurb:"Demon-tainted scavenger; Rampage lets it move and bite again on a kill."},
    {name:"Ogre",               cr:"2",   size:"Large",      type:"Giant",     hp:59,  ac:11, blurb:"Brutish giant with a greatclub. Stupid but absurdly strong."},
    {name:"Owlbear",            cr:"3",   size:"Large",      type:"Monstrosity",hp:59, ac:13, blurb:"Bear-bird with multiattack and keen senses. Beloved by reckless rangers."},
    {name:"Hook Horror",        cr:"3",   size:"Large",      type:"Monstrosity",hp:75, ac:15, blurb:"Underdark hunter with crustacean hooks. Echolocating, blind beyond 10 ft."},
    {name:"Manticore",          cr:"3",   size:"Large",      type:"Monstrosity",hp:68, ac:14, blurb:"Lion-bodied terror that fires tail spikes (3 attacks at +5, 1d8+1)."},
    {name:"Wight",              cr:"3",   size:"Medium",     type:"Undead",    hp:45,  ac:14, blurb:"Sentient undead; Life Drain reduces max HP and may raise zombies."},
    {name:"Troll",              cr:"5",   size:"Large",      type:"Giant",     hp:84,  ac:15, blurb:"Three attacks; regenerates 10 HP/turn unless hit by acid or fire."},
    {name:"Young Red Dragon",   cr:"10",  size:"Large",      type:"Dragon",    hp:178, ac:18, blurb:"Fire breath in a 30-ft cone, 16d6. Multiattack of bite + 2 claws."},
    {name:"Mind Flayer",        cr:"7",   size:"Medium",     type:"Aberration",hp:71,  ac:15, blurb:"Tentacled psion devourer of brains; Mind Blast stuns in a 60-ft cone."},
    {name:"Lich",               cr:"21",  size:"Medium",     type:"Undead",    hp:135, ac:17, blurb:"Master spellcaster, paralyzing touch, immune to charm/fear/exhaustion."},
    {name:"Beholder",           cr:"13",  size:"Large",      type:"Aberration",hp:180, ac:18, blurb:"Floating eye with ten anti-magic ray-eyes — and a central anti-magic cone."},
    {name:"Adult Black Dragon", cr:"14",  size:"Huge",       type:"Dragon",    hp:195, ac:19, blurb:"Acid breath in a 60-ft line; legendary actions, frightful presence."},
    {name:"Pit Fiend",          cr:"20",  size:"Large",      type:"Fiend",     hp:300, ac:19, blurb:"General of Hell; Multiattack with bite, claw, mace, tail; innate spellcasting."},
    {name:"Ancient Red Dragon", cr:"24",  size:"Gargantuan", type:"Dragon",    hp:546, ac:22, blurb:"Tyrant of mountains; cone of fire, legendary resistance, lair actions."},
    {name:"Bandit",             cr:"1/8", size:"Medium",     type:"Humanoid",  hp:11,  ac:12, blurb:"Roadside cutthroat. Scimitar and crossbow. Travels in packs."},
    {name:"Giant Spider",       cr:"1",   size:"Large",      type:"Beast",     hp:26,  ac:14, blurb:"Web-spinner of caves and ruined places. Bite delivers poison; web restrains."},
    {name:"Bugbear",            cr:"1",   size:"Medium",     type:"Humanoid",  hp:27,  ac:16, blurb:"Brutish goblinoid. Surprise Attack adds 2d6 on first hit; Brute increases weapon damage."},
    {name:"Animated Armor",     cr:"1",   size:"Medium",     type:"Construct", hp:33,  ac:18, blurb:"Empty plate, sliding into a fighting stance. Multiattack with two slams. Dumb and dangerous."},
    {name:"Banshee",            cr:"4",   size:"Medium",     type:"Undead",    hp:58,  ac:12, blurb:"Sorrow-bound spirit. Wail (Con save vs 0 HP); Corrupting Touch (3d6 necrotic)."},
    {name:"Stone Giant",        cr:"7",   size:"Huge",       type:"Giant",     hp:126, ac:17, blurb:"Quiet artisan-warriors of the deep mountains. Hurl boulders; catch hurled boulders."},
    {name:"Vampire",            cr:"13",  size:"Medium",     type:"Undead",    hp:144, ac:16, blurb:"Charm gaze, bite drains, regenerates 20/turn unless in sun or running water; legendary actions."},
    {name:"Tarrasque",          cr:"30",  size:"Gargantuan", type:"Monstrosity",hp:676,ac:25, blurb:"Apocalypse-scale predator. Magic Resistance, Reflective Carapace, Siege Monster. The end of cities."}
  ]
};

// Convenience: starting equipment by class (referenced in generator)
window.SRD.startingGear = {
  "Barbarian":  ["Greataxe", "Two handaxes", "4 javelins", "Explorer's pack"],
  "Bard":       ["Rapier",    "Diplomat's pack", "Lute", "Leather armor", "Dagger"],
  "Cleric":     ["Mace",      "Scale mail", "Light crossbow & 20 bolts", "Priest's pack", "Shield", "Holy symbol"],
  "Druid":      ["Scimitar",  "Wooden shield", "Leather armor", "Explorer's pack", "Druidic focus"],
  "Fighter":    ["Longsword", "Shield", "Light crossbow & 20 bolts", "Chain mail", "Dungeoneer's pack"],
  "Monk":       ["Shortsword","10 darts", "Dungeoneer's pack"],
  "Paladin":    ["Longsword", "Shield", "5 javelins", "Chain mail", "Priest's pack", "Holy symbol"],
  "Ranger":     ["Two shortswords", "Longbow & 20 arrows", "Scale mail", "Dungeoneer's pack"],
  "Rogue":      ["Rapier",    "Shortbow & 20 arrows", "Leather armor", "Two daggers", "Burglar's pack", "Thieves' tools"],
  "Sorcerer":   ["Light crossbow & 20 bolts", "Two daggers", "Component pouch", "Dungeoneer's pack"],
  "Warlock":    ["Light crossbow & 20 bolts", "Two daggers", "Leather armor", "Component pouch", "Scholar's pack"],
  "Wizard":     ["Quarterstaff", "Component pouch", "Spellbook", "Scholar's pack"]
};

// Convenience: spell slots by class & level (full casters; half casters scale similarly)
window.SRD.fullCasterSlots = {
  // [lvl1, lvl2, lvl3, lvl4, lvl5, lvl6, lvl7, lvl8, lvl9]
   1:[2,0,0,0,0,0,0,0,0],   2:[3,0,0,0,0,0,0,0,0],
   3:[4,2,0,0,0,0,0,0,0],   4:[4,3,0,0,0,0,0,0,0],
   5:[4,3,2,0,0,0,0,0,0],   6:[4,3,3,0,0,0,0,0,0],
   7:[4,3,3,1,0,0,0,0,0],   8:[4,3,3,2,0,0,0,0,0],
   9:[4,3,3,3,1,0,0,0,0],  10:[4,3,3,3,2,0,0,0,0],
  11:[4,3,3,3,2,1,0,0,0],  12:[4,3,3,3,2,1,0,0,0],
  13:[4,3,3,3,2,1,1,0,0],  14:[4,3,3,3,2,1,1,0,0],
  15:[4,3,3,3,2,1,1,1,0],  16:[4,3,3,3,2,1,1,1,0],
  17:[4,3,3,3,2,1,1,1,1],  18:[4,3,3,3,3,1,1,1,1],
  19:[4,3,3,3,3,2,1,1,1],  20:[4,3,3,3,3,2,2,1,1]
};

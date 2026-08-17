/*
 * Character data for Paiman "Paladdin" Aladdin.
 *
 * Phase 1A note: the schema here is deliberately a verbatim extraction of
 * what was previously hard-coded inline in paladdin.html. It will get
 * normalized in Phase 2; for now the goal is just to separate data from
 * engine without changing behavior.
 */
window.CHARACTERS = window.CHARACTERS || {};

window.CHARACTERS.paladdin = {
    id: 'paladdin',
    name: 'Paiman "Paladdin" Aladdin',
    short: 'Paladdin',
    classSummary: 'Oath of Noble Genies • Human • Elemental Duelist',
    rulesBadge: 'Dexadin',
    image: 'images/paladdin.png',
    portrait: 'images/paladdin_face.png',

    // Skill proficiencies by character level (Skilled feat at L1 plus
    // Acrobatics added at L3 from Defensive Duelist tier).
    proficientSkills: {
        1: ["Deception", "Sleight of Hand", "Persuasion", "Intimidation", "Perception", "Athletics", "Stealth", "Insight"],
        3: ["Deception", "Sleight of Hand", "Persuasion", "Intimidation", "Perception", "Athletics", "Stealth", "Insight", "Acrobatics"]
    },

    // Paladin (half-caster) slot table: [1st, 2nd, 3rd, 4th, 5th] by character level.
    spellSlotsByLevel: {
        1: [2,0,0,0,0], 2: [2,0,0,0,0], 3: [3,0,0,0,0], 4: [3,0,0,0,0],
        5: [4,2,0,0,0], 6: [4,2,0,0,0], 7: [4,3,0,0,0], 8: [4,3,0,0,0],
        9: [4,3,2,0,0], 10: [4,3,2,0,0], 11: [4,3,3,0,0], 12: [4,3,3,0,0],
        13: [4,3,3,1,0], 14: [4,3,3,1,0], 15: [4,3,3,2,0], 16: [4,3,3,2,0],
        17: [4,3,3,3,1], 18: [4,3,3,3,1], 19: [4,3,3,3,2], 20: [4,3,3,3,2]
    },

    // 2024 Paladin "Spells Prepared" table.
    preparedTable: {
        1: 2,  2: 3,  3: 4,  4: 5,  5: 6,  6: 6,  7: 7,  8: 7,  9: 9, 10: 9,
        11: 10, 12: 10, 13: 11, 14: 11, 15: 12, 16: 12, 17: 14, 18: 14, 19: 15, 20: 15
    },

    // Magic Initiate (Wizard) — fixed list always available.
    magicInitiateSpells: [
        { name: "Fire Bolt",       level: 0, school: "Evoc", note: "36m, 1d10 Fire", desc: "Ranged spell attack. 1d10 Fire damage. (Alchemy Vial)", upcast: "Damage increases to 2d10 (5th), 3d10 (11th), 4d10 (17th).", roll: { type: "attack", dice: "1d10", dmgType: "Fire" } },
        { name: "Minor Illusion",  level: 0, school: "Illu", note: "Utility",        desc: "Create a sound or image of an object (1 min).",                upcast: null, roll: { type: "info", desc: "Created an illusion (12m range)." } },
        { name: "Shield",          level: 1, school: "Abjur", note: "Reaction: +5 AC", desc: "Reaction when hit. +5 AC until next turn. Magic Missile immunity. (Use Resource Card for Free Cast).", upcast: null, roll: { type: "buff", desc: "Shield! +5 AC until next turn." } }
    ],

    // Genie subclass bonus spells (added to known list at the listed level).
    genieSpellsByLevel: {
        3: [
            { name: "Chromatic Orb",     level: 1, desc: "3d8 Elemental Dmg. 27m.",            note: "Genie Spells", upcast: "+1d8 damage per slot.", roll: { type: "attack", dice: "3d8", dmgType: "Elemental" } },
            { name: "Thunderous Smite",  level: 1, desc: "BA. +2d6 Thunder + Push/Prone.",     note: "Genie Spells", upcast: null, roll: { type: "buff", desc: "Next hit: +2d6 Thunder + Push/Prone." } }
        ],
        5: [
            { name: "Mirror Image",      level: 2, desc: "Create 3 duplicates (Defense).",      note: "Genie Spells", upcast: null, roll: { type: "buff", desc: "3 duplicates active." } },
            { name: "Phantasmal Force",  level: 2, desc: "1d6 Psychic/turn (INT Save).",        note: "Genie Spells", roll: { type: "save", save: "INT", desc: "Illusion creates 1d6 Psychic/turn." } }
        ],
        9: [
            { name: "Fly",                       level: 3, desc: "Gain 18m fly speed.",                                       note: "Genie Spells", upcast: "+1 target per slot level.", roll: { type: "buff", desc: "Target gains Fly Speed (Conc)." } },
            { name: "Protection from Energy",    level: 3, desc: "Resistance to Acid/Cold/Fire/Lightning/Thunder.",            note: "Genie Spells", roll: { type: "buff", desc: "Target resists chosen element." } }
        ],
        13: [
            { name: "Freedom of Movement",  level: 4, desc: "Ignore difficult terrain/paralysis/restraints.", note: "Genie Spells", roll: { type: "buff", desc: "Active: Immune to movement impairments." } },
            { name: "Summon Elemental",     level: 4, desc: "Summon Ally (Air/Earth/Fire/Water).",            note: "Genie Spells", roll: { type: "info", desc: "Elemental Summoned." } }
        ],
        17: [
            { name: "Creation",      level: 5, desc: "Pull material from Shadowfell.",          note: "Genie Spells", roll: { type: "info", desc: "Object created." } },
            { name: "Wall of Stone", level: 5, desc: "Create solid wall (AC 15, 30HP/inch).",   note: "Genie Spells", roll: { type: "info", desc: "Wall created." } }
        ]
    },

    // Per-level snapshot: stats, hp, features unlocked at this level, prepared spell list.
    levels: {
        1: { str:8, dex:17, con:14, int:8, wis:10, cha:16, prof:2, hp:12, features: [
            { name:"Human: Versatile",         source:"Species",   desc:"<b>Feat: Magic Initiate (Wizard)</b>.<br>Spells: Fire Bolt, Minor Illusion, Shield (1/LR)." },
            { name:"Background: Charlatan",    source:"Origin",    desc:"Stats: +2 DEX, +1 CHA.<br><b>Feat: Skilled</b> (Gain 3 Skill Proficiencies).<br>Skills: Deception, Sleight of Hand.<br><i></i>" },
            { name:"Human: Heroic Inspiration",source:"Species",   desc:"Gain Inspiration after Long Rest. Reroll any die." },
            { name:"Weapon Mastery",           source:"Paladin 1", desc:"Scimitar (Nick): Extra attack is part of Action.<br>Shortsword (Vex): Adv on next hit." }
        ], prepared: [
            { name:"Divine Favor", level:1, roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } },
            { name:"Heroism",      level:1, school:"Ench", desc:"Immune to Frightened + Temp HP.", roll:{ type:"buff", desc:"Target gains Temp HP start of turn." } }
        ] },
        2: { str:8, dex:17, con:14, int:8, wis:10, cha:16, prof:2, hp:20, features: [
            { name:"Fighting Style: Two-Weapon Fighting", source:"Paladin 2", desc:"Add Ability Mod to damage of the extra attack of the Light weapon property." },
            { name:"Divine Smite",                        source:"Paladin 2", desc:"BA after hit. 2d8 Radiant (slot). 1 Free/LR." }
        ], prepared: [
            { name:"Divine Favor", level:1, roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } },
            { name:"Heroism",      level:1, school:"Ench",  roll:{ type:"buff", desc:"Target gains Temp HP." } },
            { name:"Cure Wounds",  level:1, school:"Abjur", roll:{ type:"heal", dice:"2d8+MOD", desc:"Touch heal." } }
        ] },
        3: { str:8, dex:17, con:14, int:8, wis:10, cha:16, prof:2, hp:28, features: [
            { name:"Genie's Splendor",  source:"Oath 3", desc:"AC includes CHA modifier if no heavy armor." },
            { name:"Channel Divinity", source:"Oath 3", desc:"Elemental Smite (Add effect to Smite)." }
        ], prepared: [
            { name:"Divine Favor",     level:1,                roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } },
            { name:"Heroism",          level:1, school:"Ench", roll:{ type:"buff", desc:"Target gains Temp HP." } },
            { name:"Cure Wounds",      level:1, school:"Abjur",roll:{ type:"heal", dice:"2d8+MOD", desc:"Touch heal." } },
            { name:"Shield of Faith",  level:1, school:"Abjur", desc:"BA. +2 AC.", roll:{ type:"buff", desc:"+2 AC (Conc)." } }
        ] },
        4: { str:8, dex:18, con:14, int:8, wis:10, cha:16, prof:2, hp:36, features: [
            { name:"Feat: Defensive Duelist", source:"Lvl 4", desc:"Reaction: Add PB to AC against one melee attack (+1 DEX)." }
        ], prepared: [
            { name:"Divine Favor",              level:1,                 roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } },
            { name:"Heroism",                   level:1, school:"Ench",  roll:{ type:"buff", desc:"Target gains Temp HP." } },
            { name:"Cure Wounds",               level:1, school:"Abjur", roll:{ type:"heal", dice:"2d8+MOD", desc:"Touch heal." } },
            { name:"Shield of Faith",           level:1, school:"Abjur", roll:{ type:"buff", desc:"+2 AC (Conc)." } },
            { name:"Protection from Evil & Good", level:1, school:"Abjur", desc:"Disadv on attacks against you by Undead/Fiends/Fey.", roll:{ type:"buff", desc:"Active: Protection vs Types." } }
        ] },
        5: { str:8, dex:18, con:14, int:8, wis:10, cha:16, prof:3, hp:44, features: [
            { name:"Extra Attack", source:"Paladin 5", desc:"Attack twice per Action." },
            { name:"Find Steed",   source:"Paladin 5", desc:"You always have this spell prepared." }
        ], prepared: [
            { name:"Divine Smite",      level:1, typeClass:"always", roll:{ type:"attack", dice:"2d8", desc:"BA. Radiant Dmg." } },
            { name:"Find Steed",        level:2, typeClass:"always", roll:{ type:"info",   desc:"Summon Steed." } },
            { name:"Shield",            level:1, typeClass:"always", roll:{ type:"buff",   desc:"+5 AC Reaction." } },
            { name:"Chromatic Orb",     level:1, typeClass:"genie",  roll:{ type:"attack", dice:"3d8", desc:"Elemental Dmg." } },
            { name:"Thunderous Smite",  level:1, typeClass:"genie",  roll:{ type:"buff",   desc:"Next Hit: +2d6 Thunder + Prone." } },
            { name:"Mirror Image",      level:2, typeClass:"genie",  roll:{ type:"buff",   desc:"3 Duplicates." } },
            { name:"Phantasmal Force",  level:2, typeClass:"genie",  roll:{ type:"save",   save:"INT", desc:"1d6 Psychic/turn." } },
            { name:"Bless",             level:1, school:"Ench",      desc:"3 Allies add +1d4 to Atk/Saves.", roll:{ type:"buff", desc:"Active: +1d4 Hit/Save." } },
            { name:"Cure Wounds",       level:1, school:"Abjur",     roll:{ type:"heal", dice:"2d8+MOD", desc:"Touch heal." } },
            { name:"Shield of Faith",   level:1, school:"Abjur",     roll:{ type:"buff", desc:"+2 AC (Conc)." } },
            { name:"Aid",               level:2, school:"Abjur",     desc:"Max HP +5 (8 hours).", roll:{ type:"buff", desc:"3 Targets +5 Max HP." } },
            { name:"Lesser Restoration",level:2, school:"Abjur",     desc:"BA. End Condition.",   roll:{ type:"heal", dice:"0d0", desc:"Cure Condition." } },
            { name:"Prayer of Healing", level:2, school:"Evoc",      desc:"10 min cast. Grant Short Rest.", roll:{ type:"heal", dice:"2d8", desc:"Short Rest + Heal." } }
        ] },
        6: { str:8, dex:18, con:14, int:8, wis:10, cha:16, prof:3, hp:52, features: [
            { name:"Aura of Protection", source:"Paladin 6", desc:"Allies within 3m add +CHA to Saves." }
        ], prepared: [
            { name:"Divine Favor",       level:1,                 roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } },
            { name:"Aid",                level:2, school:"Abjur", roll:{ type:"buff", desc:"3 Targets gain +5 Max HP." } },
            { name:"Misty Step",         level:2, school:"Conj",  roll:{ type:"info", desc:"Teleport 9m." } },
            { name:"Lesser Restoration", level:2, school:"Abjur", roll:{ type:"heal", dice:"0d0", desc:"Cure Condition." } },
            { name:"Shield of Faith",    level:1, school:"Abjur", roll:{ type:"buff", desc:"+2 AC (Conc)." } },
            { name:"Cure Wounds",        level:1, school:"Abjur", roll:{ type:"heal", dice:"2d8+MOD", desc:"Touch heal." } }
        ] },
        7: { str:8, dex:18, con:14, int:8, wis:10, cha:16, prof:3, hp:60, features: [
            { name:"Aura of Warding", source:"Oath 7", desc:"Resistance to Spell Damage for you and allies in Aura." }
        ], prepared: [
            { name:"Divine Favor",       level:1,                  roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } },
            { name:"Aid",                level:2, school:"Abjur",  roll:{ type:"buff", desc:"3 Targets gain +5 Max HP." } },
            { name:"Misty Step",         level:2, school:"Conj",   roll:{ type:"info", desc:"Teleport 9m." } },
            { name:"Lesser Restoration", level:2, school:"Abjur",  roll:{ type:"heal", dice:"0d0", desc:"Cure Condition." } },
            { name:"Shield of Faith",    level:1, school:"Abjur",  roll:{ type:"buff", desc:"+2 AC (Conc)." } },
            { name:"Magic Weapon",       level:2, school:"Trans",  desc:"Weapon becomes +1.", roll:{ type:"buff", desc:"Weapon is +1 Magic." } },
            { name:"Cure Wounds",        level:1, school:"Abjur",  roll:{ type:"heal", dice:"2d8+MOD", desc:"Touch heal." } }
        ] },
        8: { str:8, dex:20, con:14, int:8, wis:10, cha:16, prof:3, hp:68, features: [
            { name:"ASI: Dexterity +2", source:"Lvl 8", desc:"DEX capped at 20. +1 AC, +1 Hit/Dmg." }
        ], prepared: [
            { name:"Divine Favor",       level:1,                  roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } },
            { name:"Aid",                level:2, school:"Abjur",  roll:{ type:"buff", desc:"3 Targets gain +5 Max HP." } },
            { name:"Misty Step",         level:2, school:"Conj",   roll:{ type:"info", desc:"Teleport 9m." } },
            { name:"Lesser Restoration", level:2, school:"Abjur",  roll:{ type:"heal", dice:"0d0", desc:"Cure Condition." } },
            { name:"Shield of Faith",    level:1, school:"Abjur",  roll:{ type:"buff", desc:"+2 AC (Conc)." } },
            { name:"Magic Weapon",       level:2, school:"Trans",  roll:{ type:"buff", desc:"Weapon is +1 Magic." } },
            { name:"Cure Wounds",        level:1, school:"Abjur",  roll:{ type:"heal", dice:"2d8+MOD", desc:"Touch heal." } }
        ] },
        9: { str:8, dex:20, con:14, int:8, wis:10, cha:16, prof:4, hp:76, features: [], prepared: [
            { name:"Revivify",           level:3, school:"Necro", roll:{ type:"info", desc:"Revive within 1 min." } },
            { name:"Spirit Shroud",      level:3, school:"Necro", desc:"BA. +1d8 Radiant/Cold/Necro to all hits. No heal for enemy.", roll:{ type:"buff", desc:"Active: +1d8 Dmg/hit." } },
            { name:"Dispel Magic",       level:3, school:"Abjur", desc:"End spells on target.", roll:{ type:"info", desc:"Dispel Magic cast." } },
            { name:"Aura of Vitality",   level:3, school:"Evoc",  desc:"2d6 Heal as BA.", roll:{ type:"heal", dice:"2d6", desc:"Aura Heal (BA)." } },
            { name:"Misty Step",         level:2, school:"Conj",  roll:{ type:"info", desc:"Teleport 9m." } },
            { name:"Aid",                level:2, school:"Abjur", roll:{ type:"buff", desc:"3 Targets gain +5 Max HP." } },
            { name:"Lesser Restoration", level:2, school:"Abjur", roll:{ type:"heal", dice:"0d0", desc:"Cure Condition." } },
            { name:"Divine Favor",       level:1,                 roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } },
            { name:"Shield of Faith",    level:1, school:"Abjur", roll:{ type:"buff", desc:"+2 AC (Conc)." } }
        ] },
        10: { str:8, dex:20, con:14, int:8, wis:10, cha:16, prof:4, hp:84, features: [
            { name:"Aura of Courage", source:"Paladin 10", desc:"Immune to Frightened (3m Aura)." }
        ], prepared: [
            { name:"Revivify",           level:3, school:"Necro", roll:{ type:"info", desc:"Revive within 1 min." } },
            { name:"Spirit Shroud",      level:3, school:"Necro", roll:{ type:"buff", desc:"Active: +1d8 Dmg/hit." } },
            { name:"Dispel Magic",       level:3, school:"Abjur", roll:{ type:"info", desc:"Dispel Magic cast." } },
            { name:"Aura of Vitality",   level:3, school:"Evoc",  roll:{ type:"heal", dice:"2d6", desc:"Aura Heal (BA)." } },
            { name:"Misty Step",         level:2, school:"Conj",  roll:{ type:"info", desc:"Teleport 9m." } },
            { name:"Aid",                level:2, school:"Abjur", roll:{ type:"buff", desc:"3 Targets gain +5 Max HP." } },
            { name:"Lesser Restoration", level:2, school:"Abjur", roll:{ type:"heal", dice:"0d0", desc:"Cure Condition." } },
            { name:"Divine Favor",       level:1,                 roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } },
            { name:"Shield of Faith",    level:1, school:"Abjur", roll:{ type:"buff", desc:"+2 AC (Conc)." } }
        ] },
        11: { str:8, dex:20, con:14, int:8, wis:10, cha:16, prof:4, hp:92, features: [
            { name:"Radiant Strikes", source:"Paladin 11", desc:"<b>Improve Divine Smite:</b> All melee hits deal +1d8 Radiant damage." }
        ], prepared: [
            { name:"Revivify",           level:3, school:"Necro", roll:{ type:"info", desc:"Revive within 1 min." } },
            { name:"Spirit Shroud",      level:3, school:"Necro", roll:{ type:"buff", desc:"Active: +1d8 Dmg/hit." } },
            { name:"Dispel Magic",       level:3, school:"Abjur", roll:{ type:"info", desc:"Dispel Magic cast." } },
            { name:"Aura of Vitality",   level:3, school:"Evoc",  roll:{ type:"heal", dice:"2d6", desc:"Aura Heal (BA)." } },
            { name:"Blinding Smite",     level:3, school:"Evoc",  desc:"BA. +3d8 Radiant + Blind.", roll:{ type:"buff", desc:"Next Hit: 3d8 + Blind." } },
            { name:"Misty Step",         level:2, school:"Conj",  roll:{ type:"info", desc:"Teleport 9m." } },
            { name:"Aid",                level:2, school:"Abjur", roll:{ type:"buff", desc:"3 Targets gain +5 Max HP." } },
            { name:"Lesser Restoration", level:2, school:"Abjur", roll:{ type:"heal", dice:"0d0", desc:"Cure Condition." } },
            { name:"Divine Favor",       level:1,                 roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } },
            { name:"Shield of Faith",    level:1, school:"Abjur", roll:{ type:"buff", desc:"+2 AC (Conc)." } }
        ] },
        12: { str:8, dex:20, con:14, int:8, wis:10, cha:17, prof:4, hp:100, features: [
            { name:"Feat: Fey Touched", source:"Lvl 12", desc:"+1 CHA. Learn Misty Step & Silvery Barbs (Free 1/LR)." }
        ], prepared: [
            { name:"Silvery Barbs",      level:1, school:"Ench",  typeClass:"always", desc:"Reaction. Reroll success. Grant Adv.", roll:{ type:"buff", desc:"Reroll forced." } },
            { name:"Revivify",           level:3, school:"Necro", roll:{ type:"info", desc:"Revive within 1 min." } },
            { name:"Spirit Shroud",      level:3, school:"Necro", roll:{ type:"buff", desc:"Active: +1d8 Dmg/hit." } },
            { name:"Dispel Magic",       level:3, school:"Abjur", roll:{ type:"info", desc:"Dispel Magic cast." } },
            { name:"Aura of Vitality",   level:3, school:"Evoc",  roll:{ type:"heal", dice:"2d6", desc:"Aura Heal (BA)." } },
            { name:"Blinding Smite",     level:3, school:"Evoc",  roll:{ type:"buff", desc:"Next Hit: 3d8 + Blind." } },
            { name:"Misty Step",         level:2, school:"Conj",  roll:{ type:"info", desc:"Teleport 9m." } },
            { name:"Aid",                level:2, school:"Abjur", roll:{ type:"buff", desc:"3 Targets gain +5 Max HP." } },
            { name:"Lesser Restoration", level:2, school:"Abjur", roll:{ type:"heal", dice:"0d0", desc:"Cure Condition." } },
            { name:"Divine Favor",       level:1,                 roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } },
            { name:"Shield of Faith",    level:1, school:"Abjur", roll:{ type:"buff", desc:"+2 AC (Conc)." } }
        ] },
        13: { str:8, dex:20, con:14, int:8, wis:10, cha:17, prof:5, hp:108, features: [
            { name:"Find Greater Steed", source:"Paladin 13", desc:"Summon Pegasus (Fly 90ft)." }
        ], prepared: [
            { name:"Banishment",         level:4, school:"Abjur", desc:"CHA Save or banished.", roll:{ type:"save", save:"CHA", desc:"Target Banished (Conc)." } },
            { name:"Death Ward",         level:4, school:"Abjur", desc:"Prevent death once (8 hours).", roll:{ type:"buff", desc:"Death Ward active." } },
            { name:"Silvery Barbs",      level:1, school:"Ench",  typeClass:"always", roll:{ type:"buff", desc:"Reroll forced." } },
            { name:"Revivify",           level:3, school:"Necro", roll:{ type:"info", desc:"Revive within 1 min." } },
            { name:"Spirit Shroud",      level:3, school:"Necro", roll:{ type:"buff", desc:"Active: +1d8 Dmg/hit." } },
            { name:"Dispel Magic",       level:3, school:"Abjur", roll:{ type:"info", desc:"Dispel Magic cast." } },
            { name:"Aura of Vitality",   level:3, school:"Evoc",  roll:{ type:"heal", dice:"2d6", desc:"Aura Heal (BA)." } },
            { name:"Misty Step",         level:2, school:"Conj",  roll:{ type:"info", desc:"Teleport 9m." } },
            { name:"Aid",                level:2, school:"Abjur", roll:{ type:"buff", desc:"3 Targets gain +5 Max HP." } },
            { name:"Lesser Restoration", level:2, school:"Abjur", roll:{ type:"heal", dice:"0d0", desc:"Cure Condition." } },
            { name:"Divine Favor",       level:1,                 roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } }
        ] },
        14: { str:8, dex:20, con:14, int:8, wis:10, cha:17, prof:5, hp:116, features: [
            { name:"Cleansing Touch", source:"Paladin 14", desc:"Action. End one spell on yourself/willing creature (CHA Mod/LR)." }
        ], prepared: [
            { name:"Banishment",         level:4, school:"Abjur", roll:{ type:"save", save:"CHA", desc:"Target Banished (Conc)." } },
            { name:"Death Ward",         level:4, school:"Abjur", roll:{ type:"buff", desc:"Death Ward active." } },
            { name:"Silvery Barbs",      level:1, school:"Ench",  typeClass:"always", roll:{ type:"buff", desc:"Reroll forced." } },
            { name:"Revivify",           level:3, school:"Necro", roll:{ type:"info", desc:"Revive within 1 min." } },
            { name:"Spirit Shroud",      level:3, school:"Necro", roll:{ type:"buff", desc:"Active: +1d8 Dmg/hit." } },
            { name:"Dispel Magic",       level:3, school:"Abjur", roll:{ type:"info", desc:"Dispel Magic cast." } },
            { name:"Aura of Vitality",   level:3, school:"Evoc",  roll:{ type:"heal", dice:"2d6", desc:"Aura Heal (BA)." } },
            { name:"Misty Step",         level:2, school:"Conj",  roll:{ type:"info", desc:"Teleport 9m." } },
            { name:"Aid",                level:2, school:"Abjur", roll:{ type:"buff", desc:"3 Targets gain +5 Max HP." } },
            { name:"Lesser Restoration", level:2, school:"Abjur", roll:{ type:"heal", dice:"0d0", desc:"Cure Condition." } },
            { name:"Divine Favor",       level:1,                 roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } }
        ] },
        15: { str:8, dex:20, con:14, int:8, wis:10, cha:17, prof:5, hp:124, features: [
            { name:"Noble Escape", source:"Oath 15", desc:"Reaction to taking dmg: Teleport 18m + Invisible until start of next turn." }
        ], prepared: [
            { name:"Banishment",         level:4, school:"Abjur", roll:{ type:"save", save:"CHA", desc:"Target Banished (Conc)." } },
            { name:"Death Ward",         level:4, school:"Abjur", roll:{ type:"buff", desc:"Death Ward active." } },
            { name:"Aura of Life",       level:4, school:"Abjur", desc:"Resistance to Necrotic.", roll:{ type:"buff", desc:"Active: Resist Necrotic." } },
            { name:"Silvery Barbs",      level:1, school:"Ench",  typeClass:"always", roll:{ type:"buff", desc:"Reroll forced." } },
            { name:"Revivify",           level:3, school:"Necro", roll:{ type:"info", desc:"Revive within 1 min." } },
            { name:"Spirit Shroud",      level:3, school:"Necro", roll:{ type:"buff", desc:"Active: +1d8 Dmg/hit." } },
            { name:"Dispel Magic",       level:3, school:"Abjur", roll:{ type:"info", desc:"Dispel Magic cast." } },
            { name:"Aura of Vitality",   level:3, school:"Evoc",  roll:{ type:"heal", dice:"2d6", desc:"Aura Heal (BA)." } },
            { name:"Misty Step",         level:2, school:"Conj",  roll:{ type:"info", desc:"Teleport 9m." } },
            { name:"Aid",                level:2, school:"Abjur", roll:{ type:"buff", desc:"3 Targets gain +5 Max HP." } },
            { name:"Lesser Restoration", level:2, school:"Abjur", roll:{ type:"heal", dice:"0d0", desc:"Cure Condition." } },
            { name:"Divine Favor",       level:1,                 roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } }
        ] },
        16: { str:8, dex:20, con:14, int:8, wis:10, cha:19, prof:5, hp:132, features: [
            { name:"ASI: Charisma +2", source:"Lvl 16", desc:"Max Aura (+4). Spell Save DC increases." }
        ], prepared: [
            { name:"Banishment",         level:4, school:"Abjur", roll:{ type:"save", save:"CHA", desc:"Target Banished (Conc)." } },
            { name:"Death Ward",         level:4, school:"Abjur", roll:{ type:"buff", desc:"Death Ward active." } },
            { name:"Aura of Life",       level:4, school:"Abjur", roll:{ type:"buff", desc:"Active: Resist Necrotic." } },
            { name:"Silvery Barbs",      level:1, school:"Ench",  typeClass:"always", roll:{ type:"buff", desc:"Reroll forced." } },
            { name:"Revivify",           level:3, school:"Necro", roll:{ type:"info", desc:"Revive within 1 min." } },
            { name:"Spirit Shroud",      level:3, school:"Necro", roll:{ type:"buff", desc:"Active: +1d8 Dmg/hit." } },
            { name:"Dispel Magic",       level:3, school:"Abjur", roll:{ type:"info", desc:"Dispel Magic cast." } },
            { name:"Aura of Vitality",   level:3, school:"Evoc",  roll:{ type:"heal", dice:"2d6", desc:"Aura Heal (BA)." } },
            { name:"Misty Step",         level:2, school:"Conj",  roll:{ type:"info", desc:"Teleport 9m." } },
            { name:"Aid",                level:2, school:"Abjur", roll:{ type:"buff", desc:"3 Targets gain +5 Max HP." } },
            { name:"Lesser Restoration", level:2, school:"Abjur", roll:{ type:"heal", dice:"0d0", desc:"Cure Condition." } },
            { name:"Divine Favor",       level:1,                 roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } }
        ] },
        17: { str:8, dex:20, con:14, int:8, wis:10, cha:19, prof:6, hp:140, features: [], prepared: [
            { name:"Circle of Power",    level:5, school:"Abjur", desc:"Advantage on Save vs Spells + Evasion for Aura.", roll:{ type:"buff", desc:"Aura: Adv vs Spells + Evasion." } },
            { name:"Holy Weapon",        level:5, school:"Evoc",  desc:"Weapon deals +2d8 Radiant.", roll:{ type:"buff", desc:"Active: +2d8 Radiant." } },
            { name:"Destructive Wave",   level:5, school:"Evoc",  desc:"10d6 Area Damage.", roll:{ type:"attack", dice:"10d6", desc:"Area Damage (Thunder/Radiant)." } },
            { name:"Banishment",         level:4, school:"Abjur", roll:{ type:"save", save:"CHA", desc:"Target Banished (Conc)." } },
            { name:"Death Ward",         level:4, school:"Abjur", roll:{ type:"buff", desc:"Death Ward active." } },
            { name:"Silvery Barbs",      level:1, school:"Ench",  typeClass:"always", roll:{ type:"buff", desc:"Reroll forced." } },
            { name:"Revivify",           level:3, school:"Necro", roll:{ type:"info", desc:"Revive within 1 min." } },
            { name:"Spirit Shroud",      level:3, school:"Necro", roll:{ type:"buff", desc:"Active: +1d8 Dmg/hit." } },
            { name:"Dispel Magic",       level:3, school:"Abjur", roll:{ type:"info", desc:"Dispel Magic cast." } },
            { name:"Aura of Vitality",   level:3, school:"Evoc",  roll:{ type:"heal", dice:"2d6", desc:"Aura Heal (BA)." } },
            { name:"Misty Step",         level:2, school:"Conj",  roll:{ type:"info", desc:"Teleport 9m." } },
            { name:"Aid",                level:2, school:"Abjur", roll:{ type:"buff", desc:"3 Targets gain +5 Max HP." } },
            { name:"Lesser Restoration", level:2, school:"Abjur", roll:{ type:"heal", dice:"0d0", desc:"Cure Condition." } },
            { name:"Divine Favor",       level:1,                 roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } }
        ] },
        18: { str:8, dex:20, con:14, int:8, wis:10, cha:19, prof:6, hp:148, features: [
            { name:"Aura Expansion", source:"Paladin 18", desc:"Aura ranges increase to 9m." }
        ], prepared: [
            { name:"Circle of Power",    level:5, school:"Abjur", desc:"Advantage on Save vs Spells + Evasion for Aura.", roll:{ type:"buff", desc:"Aura: Adv vs Spells + Evasion." } },
            { name:"Holy Weapon",        level:5, school:"Evoc",  desc:"Weapon deals +2d8 Radiant.", roll:{ type:"buff", desc:"Active: +2d8 Radiant." } },
            { name:"Destructive Wave",   level:5, school:"Evoc",  desc:"10d6 Area Damage.", roll:{ type:"attack", dice:"10d6", desc:"Area Damage (Thunder/Radiant)." } },
            { name:"Banishment",         level:4, school:"Abjur", roll:{ type:"save", save:"CHA", desc:"Target Banished (Conc)." } },
            { name:"Death Ward",         level:4, school:"Abjur", roll:{ type:"buff", desc:"Death Ward active." } },
            { name:"Silvery Barbs",      level:1, school:"Ench",  typeClass:"always", roll:{ type:"buff", desc:"Reroll forced." } },
            { name:"Revivify",           level:3, school:"Necro", roll:{ type:"info", desc:"Revive within 1 min." } },
            { name:"Spirit Shroud",      level:3, school:"Necro", roll:{ type:"buff", desc:"Active: +1d8 Dmg/hit." } },
            { name:"Dispel Magic",       level:3, school:"Abjur", roll:{ type:"info", desc:"Dispel Magic cast." } },
            { name:"Aura of Vitality",   level:3, school:"Evoc",  roll:{ type:"heal", dice:"2d6", desc:"Aura Heal (BA)." } },
            { name:"Misty Step",         level:2, school:"Conj",  roll:{ type:"info", desc:"Teleport 9m." } },
            { name:"Aid",                level:2, school:"Abjur", roll:{ type:"buff", desc:"3 Targets gain +5 Max HP." } },
            { name:"Lesser Restoration", level:2, school:"Abjur", roll:{ type:"heal", dice:"0d0", desc:"Cure Condition." } },
            { name:"Divine Favor",       level:1,                 roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } }
        ] },
        19: { str:8, dex:20, con:14, int:8, wis:10, cha:20, prof:6, hp:156, features: [
            { name:"Epic Boon: Dimensional Travel", source:"Lvl 19", desc:"+1 CHA. Teleport 9m immediately after Attack or Spell." }
        ], prepared: [
            { name:"Circle of Power",    level:5, school:"Abjur", desc:"Advantage on Save vs Spells + Evasion for Aura.", roll:{ type:"buff", desc:"Aura: Adv vs Spells + Evasion." } },
            { name:"Holy Weapon",        level:5, school:"Evoc",  desc:"Weapon deals +2d8 Radiant.", roll:{ type:"buff", desc:"Active: +2d8 Radiant." } },
            { name:"Destructive Wave",   level:5, school:"Evoc",  desc:"10d6 Area Damage.", roll:{ type:"attack", dice:"10d6", desc:"Area Damage (Thunder/Radiant)." } },
            { name:"Summon Celestial",   level:5, school:"Conj",  desc:"Summon celestial defender.", roll:{ type:"info", desc:"Celestial Summoned." } },
            { name:"Banishment",         level:4, school:"Abjur", roll:{ type:"save", save:"CHA", desc:"Target Banished (Conc)." } },
            { name:"Death Ward",         level:4, school:"Abjur", roll:{ type:"buff", desc:"Death Ward active." } },
            { name:"Silvery Barbs",      level:1, school:"Ench",  typeClass:"always", roll:{ type:"buff", desc:"Reroll forced." } },
            { name:"Revivify",           level:3, school:"Necro", roll:{ type:"info", desc:"Revive within 1 min." } },
            { name:"Spirit Shroud",      level:3, school:"Necro", roll:{ type:"buff", desc:"Active: +1d8 Dmg/hit." } },
            { name:"Dispel Magic",       level:3, school:"Abjur", roll:{ type:"info", desc:"Dispel Magic cast." } },
            { name:"Aura of Vitality",   level:3, school:"Evoc",  roll:{ type:"heal", dice:"2d6", desc:"Aura Heal (BA)." } },
            { name:"Misty Step",         level:2, school:"Conj",  roll:{ type:"info", desc:"Teleport 9m." } },
            { name:"Aid",                level:2, school:"Abjur", roll:{ type:"buff", desc:"3 Targets gain +5 Max HP." } },
            { name:"Lesser Restoration", level:2, school:"Abjur", roll:{ type:"heal", dice:"0d0", desc:"Cure Condition." } },
            { name:"Divine Favor",       level:1,                 roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } }
        ] },
        20: { str:8, dex:20, con:14, int:8, wis:10, cha:20, prof:6, hp:164, features: [
            { name:"Elder Genie Champion", source:"Oath 20", desc:"Bonus Action transformation (1 min): Flight 18m, Resist all Dmg from Spells, Enemy starts turn in aura takes 10 Radiant." }
        ], prepared: [
            { name:"Circle of Power",    level:5, school:"Abjur", desc:"Advantage on Save vs Spells + Evasion for Aura.", roll:{ type:"buff", desc:"Aura: Adv vs Spells + Evasion." } },
            { name:"Holy Weapon",        level:5, school:"Evoc",  desc:"Weapon deals +2d8 Radiant.", roll:{ type:"buff", desc:"Active: +2d8 Radiant." } },
            { name:"Destructive Wave",   level:5, school:"Evoc",  desc:"10d6 Area Damage.", roll:{ type:"attack", dice:"10d6", desc:"Area Damage (Thunder/Radiant)." } },
            { name:"Summon Celestial",   level:5, school:"Conj",  desc:"Summon celestial defender.", roll:{ type:"info", desc:"Celestial Summoned." } },
            { name:"Banishment",         level:4, school:"Abjur", roll:{ type:"save", save:"CHA", desc:"Target Banished (Conc)." } },
            { name:"Death Ward",         level:4, school:"Abjur", roll:{ type:"buff", desc:"Death Ward active." } },
            { name:"Silvery Barbs",      level:1, school:"Ench",  typeClass:"always", roll:{ type:"buff", desc:"Reroll forced." } },
            { name:"Revivify",           level:3, school:"Necro", roll:{ type:"info", desc:"Revive within 1 min." } },
            { name:"Spirit Shroud",      level:3, school:"Necro", roll:{ type:"buff", desc:"Active: +1d8 Dmg/hit." } },
            { name:"Dispel Magic",       level:3, school:"Abjur", roll:{ type:"info", desc:"Dispel Magic cast." } },
            { name:"Aura of Vitality",   level:3, school:"Evoc",  roll:{ type:"heal", dice:"2d6", desc:"Aura Heal (BA)." } },
            { name:"Misty Step",         level:2, school:"Conj",  roll:{ type:"info", desc:"Teleport 9m." } },
            { name:"Aid",                level:2, school:"Abjur", roll:{ type:"buff", desc:"3 Targets gain +5 Max HP." } },
            { name:"Lesser Restoration", level:2, school:"Abjur", roll:{ type:"heal", dice:"0d0", desc:"Cure Condition." } },
            { name:"Divine Favor",       level:1,                 roll:{ type:"buff", desc:"Active: +1d4 Radiant on hits." } }
        ] }
    }
};

/*
 * Character data for Chin Chun Chan.
 *
 * Phase 1A note: verbatim extraction of what was previously inline in
 * chin_chun_chan.html. Schema gets normalized in Phase 2.
 */
window.CHARACTERS = window.CHARACTERS || {};

window.CHARACTERS.chin_chun_chan = {
    id: 'chin_chun_chan',
    name: 'Chin Chun Chan',
    short: 'Chin-Chu',
    classSummary: 'Fighter (Samurai) • Amethyst Dragonborn Outlander • w/ Baby Hook Horror',
    rulesBadge: 'Samurai',
    image: 'images/chin_chun_chan.png',
    portrait: 'images/chin_chun_chan_face.png',

    // Samurai gets Persuasion or History + Outlander background skills
    proficientSkills: ["Athletics", "Perception", "Survival", "Persuasion", "Intimidation"],

    // Per-level snapshot.
    levels: {
        1: {
            str: 16, dex: 12, con: 16, int: 8, wis: 14, cha: 8, prof: 2, hp: 13,
            fightingSpirit: 3, actionSurge: 0, secondWind: 1,
            features: [
                { name: "Amethyst Dragonborn",     source: "Species",  desc: "Force Resistance. Breath Weapon. Psionic Mind." },
                { name: "Background: The Oopsie",  source: "History",  desc: "Abandoned at a tavern, raised by dwarves." },
                { name: "Fighting Style: Defense", source: "Fighter 1", desc: "+1 AC while wearing armor." }
            ]
        },
        2: {
            str: 16, dex: 12, con: 16, int: 8, wis: 14, cha: 8, prof: 2, hp: 22,
            fightingSpirit: 3, actionSurge: 1, secondWind: 1,
            features: [
                { name: "Action Surge", source: "Fighter 2", desc: "Take one additional Action on your turn. Recharges on Short Rest." }
            ]
        },
        3: {
            str: 16, dex: 12, con: 16, int: 8, wis: 14, cha: 8, prof: 2, hp: 31,
            fightingSpirit: 3, actionSurge: 1, secondWind: 1,
            features: [
                { name: "Fighting Spirit", source: "Samurai 3", desc: "<span class='kw-bonus'>Bonus Action</span>. Gain Advantage on attacks & 5 Temp HP." }
            ]
        },
        4: {
            str: 16, dex: 12, con: 16, int: 8, wis: 14, cha: 8, prof: 2, hp: 40,
            fightingSpirit: 3, actionSurge: 1, secondWind: 1,
            features: [
                { name: "Feat: Sentinel", source: "Fighter 4", desc: "<span class='kw-react'>Reaction</span>. 1. Hit = 0 Speed. 2. No Disengage. 3. Attack enemy hitting ally." }
            ]
        },
        5: {
            str: 16, dex: 12, con: 16, int: 8, wis: 14, cha: 8, prof: 3, hp: 49,
            fightingSpirit: 3, actionSurge: 1, secondWind: 1, gemFlight: true,
            features: [
                { name: "Extra Attack", source: "Fighter 5",                desc: "Attack twice when taking the Attack action." },
                { name: "Gem Flight",   source: "Amethyst Dragonborn 5",    desc: "<span class='kw-bonus'>Bonus Action</span>. Gain 30ft fly speed for 10 minutes." }
            ]
        },
        6: {
            str: 16, dex: 12, con: 16, int: 8, wis: 14, cha: 8, prof: 3, hp: 58,
            fightingSpirit: 3, actionSurge: 1, secondWind: 1, gemFlight: true,
            features: [
                { name: "Feat: Polearm Master", source: "Fighter 6", desc: "1. OA triggered when enemy ENTERS reach. 2. Bonus Action attack (1d4)." }
            ]
        },
        7: {
            str: 16, dex: 12, con: 16, int: 8, wis: 14, cha: 8, prof: 3, hp: 67,
            fightingSpirit: 3, actionSurge: 1, secondWind: 1, gemFlight: true,
            features: [
                { name: "Elegant Courtier", source: "Samurai 7", desc: "Add WIS mod to Persuasion. Gain WIS Save Proficiency." }
            ]
        },
        8: {
            str: 18, dex: 12, con: 16, int: 8, wis: 14, cha: 8, prof: 3, hp: 76,
            fightingSpirit: 3, actionSurge: 1, secondWind: 1, gemFlight: true,
            features: [
                { name: "ASI", source: "Fighter 8", desc: "+2 STR (now 18)." }
            ]
        },
        9: {
            str: 18, dex: 12, con: 16, int: 8, wis: 14, cha: 8, prof: 4, hp: 85,
            fightingSpirit: 3, actionSurge: 1, secondWind: 1, gemFlight: true,
            features: [
                { name: "Indomitable", source: "Fighter 9", desc: "Reroll a failed saving throw. 1/Long Rest." }
            ]
        },
        10: {
            str: 18, dex: 12, con: 16, int: 8, wis: 14, cha: 8, prof: 4, hp: 94,
            fightingSpirit: 3, actionSurge: 1, secondWind: 1, gemFlight: true,
            features: [
                { name: "Tireless Spirit", source: "Samurai 10", desc: "If you have 0 Fighting Spirit uses when rolling initiative, regain 1." }
            ]
        },
        11: {
            str: 18, dex: 12, con: 16, int: 8, wis: 14, cha: 8, prof: 4, hp: 103,
            fightingSpirit: 3, actionSurge: 1, secondWind: 1, gemFlight: true,
            features: [
                { name: "Extra Attack (x2)", source: "Fighter 11", desc: "Attack THREE times when taking the Attack action." }
            ]
        },
        12: {
            str: 20, dex: 12, con: 16, int: 8, wis: 14, cha: 8, prof: 4, hp: 112,
            fightingSpirit: 3, actionSurge: 1, secondWind: 1, gemFlight: true,
            features: [
                { name: "ASI", source: "Fighter 12", desc: "+2 STR (Max 20). Essential for Sentinel accuracy." }
            ]
        },
        13: {
            str: 20, dex: 12, con: 16, int: 8, wis: 14, cha: 8, prof: 5, hp: 121,
            fightingSpirit: 3, actionSurge: 1, secondWind: 1, gemFlight: true,
            features: [
                { name: "Indomitable (x2)", source: "Fighter 13", desc: "Two uses per Long Rest." }
            ]
        },
        14: {
            str: 20, dex: 12, con: 16, int: 8, wis: 14, cha: 8, prof: 5, hp: 130,
            fightingSpirit: 3, actionSurge: 1, secondWind: 1, gemFlight: true,
            features: [
                { name: "Feat: Great Weapon Master", source: "Fighter 14", desc: "1. -5 Hit / +10 Dmg toggle. 2. Crit/Kill grants Bonus Action attack." }
            ]
        },
        15: {
            str: 20, dex: 12, con: 16, int: 8, wis: 14, cha: 8, prof: 5, hp: 139,
            fightingSpirit: 3, actionSurge: 1, secondWind: 1, gemFlight: true,
            features: [
                { name: "Rapid Strike", source: "Samurai 15", desc: "If you have Advantage, forego it on one attack to make an additional attack." }
            ]
        },
        16: {
            str: 20, dex: 12, con: 18, int: 8, wis: 14, cha: 8, prof: 5, hp: 164,
            fightingSpirit: 3, actionSurge: 1, secondWind: 1, gemFlight: true,
            features: [
                { name: "ASI", source: "Fighter 16", desc: "+2 CON (now 18). More HP for tanking." }
            ]
        },
        17: {
            str: 20, dex: 12, con: 18, int: 8, wis: 14, cha: 8, prof: 6, hp: 174,
            fightingSpirit: 3, actionSurge: 2, secondWind: 1, gemFlight: true,
            features: [
                { name: "Action Surge (x2)", source: "Fighter 17", desc: "Two uses per Short Rest." },
                { name: "Indomitable (x3)",  source: "Fighter 17", desc: "Three uses per Long Rest." }
            ]
        },
        18: {
            str: 20, dex: 12, con: 18, int: 8, wis: 14, cha: 8, prof: 6, hp: 184,
            fightingSpirit: 3, actionSurge: 2, secondWind: 1, gemFlight: true,
            features: [
                { name: "Strength Before Death", source: "Samurai 18", desc: "<span class='kw-react'>Reaction</span>. If you hit 0 HP, take an immediate extra turn before falling unconscious." }
            ]
        },
        19: {
            str: 20, dex: 12, con: 20, int: 8, wis: 14, cha: 8, prof: 6, hp: 209,
            fightingSpirit: 3, actionSurge: 2, secondWind: 1, gemFlight: true,
            features: [
                { name: "ASI", source: "Fighter 19", desc: "+2 CON (Max 20). Maximum beef." }
            ]
        },
        20: {
            str: 20, dex: 12, con: 20, int: 8, wis: 14, cha: 8, prof: 6, hp: 224,
            fightingSpirit: 3, actionSurge: 2, secondWind: 1, gemFlight: true,
            features: [
                { name: "Extra Attack (x3)", source: "Fighter 20", desc: "Attack FOUR times when taking the Attack action." }
            ]
        }
    },

    // Companion (Marcus Gallus the baby Hook Horror) growth stages.
    petStages: [
        {
            stage: "INFANT",
            age: "Up to 1 month",
            size: "Tiny",
            img: "images/hook_horror_infant.png",
            ac: "10",
            hp: "4 (1d4+2)",
            spd: "10 ft",
            str: "9 (-1)", dex: "10 (+0)", con: "10 (+0)",
            int: "2 (-4)", wis: "6 (-2)", cha: "3 (-4)",
            attackHTML: `<span style="color:#94a3b8;">No effective attacks.</span>`
        },
        {
            stage: "YOUNG",
            age: "1–3 months",
            size: "Small",
            img: "images/hook_horror_young.png",
            ac: "11",
            hp: "11 (2d6+4)",
            spd: "15 ft",
            str: "12 (+1)", dex: "10 (+0)", con: "12 (+1)",
            int: "3 (-4)",  wis: "8 (-1)",  cha: "4 (-3)",
            attackHTML: `<strong style="color:#fff">Hook:</strong> <span style="color:var(--success)">+3 Hit</span>, <span style="color:var(--samurai-highlight)">1d4+1</span> Piercing.`
        },
        {
            stage: "JUVENILE",
            age: "3–6 months",
            size: "Medium",
            img: "images/hook_horror_juvenile.png",
            ac: "13",
            hp: "39 (6d8+12)",
            spd: "20 ft",
            str: "15 (+2)", dex: "10 (+0)", con: "14 (+2)",
            int: "5 (-3)",  wis: "10 (+0)", cha: "6 (-2)",
            attackHTML: `<strong style="color:#fff">Hook:</strong> <span style="color:var(--success)">+4 Hit</span>, <span style="color:var(--samurai-highlight)">1d6+2</span> Piercing.`
        },
        {
            stage: "ADULT",
            age: "6+ months",
            size: "Large",
            img: "images/hook_horror_adult.png",
            ac: "15 (Natural)",
            hp: "75 (10d10+20)",
            spd: "30 ft, Climb 30 ft",
            str: "18 (+4)", dex: "10 (+0)", con: "15 (+2)",
            int: "6 (-2)",  wis: "12 (+1)", cha: "7 (-2)",
            attackHTML: `
                <div style="text-align:left; margin-bottom:6px; padding-bottom:6px; border-bottom:1px solid #334155;">
                    <div style="font-size:0.85em; color:#cbd5e1; margin-bottom:2px;">
                        <strong>Skills:</strong> Perception +3
                    </div>
                    <div style="font-size:0.85em; color:#cbd5e1; margin-bottom:2px;">
                        <strong>Senses:</strong> Blindsight 60ft (Blind beyond), Darkvision 120ft
                    </div>
                    <div style="font-size:0.8em; color:#94a3b8; font-style:italic;">
                        <strong>Traits:</strong> Echolocation (No blindsight if deafened), Keen Hearing (Adv. on hearing Perception).
                    </div>
                </div>
                <div style="text-align:left;">
                    <div style="margin-bottom:4px;"><strong style="color:#fff">Multiattack:</strong> Two hook attacks.</div>
                    <div>
                        <strong style="color:#fff">Hook:</strong>
                        <span style="color:var(--success)">+6 Hit</span>, Reach 10ft.
                        <span style="color:var(--samurai-highlight)">11 (2d6+4)</span> Piercing.
                    </div>
                </div>`
        }
    ]
};

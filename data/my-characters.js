/* ============================================================
   User-owned characters — these are private to the account holder
   (the existing two legacy sheets, kept verbatim in /legacy).

   Summary fields power the Cast/Vault cards; the rich fields
   (identity, signature, companions, story, facts) power the
   in-Codex profile pages at #char/<id>. Everything here is
   lifted from the legacy sheets — they remain the ground truth
   and the fully interactive versions.
   ============================================================ */

window.MY_CHARS = [
  {
    id: "paladdin",
    name: "Paiman \"Paladdin\" Aladdin",
    short: "Paladdin",
    klass: "Paladin",
    subclass: "Oath of Noble Genies",
    race: "Human",
    background: "Charlatan",
    level: 8,
    alignment: "Lawful Good",
    portrait: "images/paladdin_face.png",
    full: "images/paladdin.png",
    sheet: "legacy/paladdin.html",
    epithet: "Elemental Duelist",
    tags: ["Dexadin", "Bandolier of Essences", "Telepathic? No.", "Vain"],
    quote: "The Nose Knows.",
    stats: { str: 8, dex: 20, con: 14, int: 8, wis: 10, cha: 16 },
    hp: 68, ac: 15,
    summary: "Mixed Chinese/Persian heritage; refuses trail rations on principle. Fights via essences and a steed of his grandfather's prize bird.",

    accent: "#b45309",
    identity: {
      Physical: "Mixed Chinese/Persian descent. Wears reinforced silk robes of Tyrian purple — no metal armor. Carries a \"Bandolier of Essences\" as a focus. Smells of ozone and sandalwood.",
      Personality: "\"The Nose Knows.\" Experiences the world through scent. Aggressively sophisticated; refuses trail rations. Refers to himself as \"The Paladdin.\"",
      Ideals: "Refinement & Synthesis — the world is raw; I must distill it into something pure. Strength comes from mixing cultures.",
      Bonds: "Seek the ingredients of the \"Breath of Heaven\" to restore the family fortune. My Steed is the spirit of my grandfather's prize bird.",
      Flaws: "Sensory Overload (bad smells). Materialistic. Combat Vanity — must look good while fighting."
    },
    signature: [
      { name: "Scimitar — \"Nick\"", tag: "+5 · 1d6+3 slashing", text: "The extra attack is part of the Action itself, keeping the bonus action free for more important, more fragrant things." },
      { name: "Shortsword — \"Vex\"", tag: "+5 · 1d6 piercing", text: "On a hit: advantage on the next attack. Elegance as a weapon system." },
      { name: "Elemental Smite", tag: "Channel Divinity", text: "Triggered immediately after Divine Smite — the bandolier decides the flavor.", modes: [
        { name: "Dao — Earth", text: "Dao's Crush: the target is Grappled and Restrained. Escape DC equals his spell save DC." },
        { name: "Djinni — Air", text: "Djinni's Escape: teleport 30 ft, resistance to bludgeoning/piercing/slashing, immune to grapple and restrain until the end of his next turn." },
        { name: "Efreeti — Fire", text: "Efreeti's Fury: +2d4 fire, and the flame leaps to another enemy within 30 ft for 2d4." },
        { name: "Marid — Water", text: "Marid's Surge: everything in a 10-ft emanation makes a STR save or is pushed 15 ft and knocked prone." }
      ]},
      { name: "Lay on Hands", tag: "Bonus action", text: "A healing pool delivered with the smug efficiency of a sommelier decanting a vintage." },
      { name: "Magic Initiate", tag: "Fire Bolt · Minor Illusion · Shield", text: "Fire Bolt is, he insists, just an alchemy vial with excellent marketing." }
    ],
    companions: [
      {
        name: "Golden Stormstrider",
        kind: "Spirit Steed — Find Steed, 1/long rest",
        blurb: "The spirit of his grandfather's prize bird, summoned at full gallop. Refuses to be called a chicken.",
        stages: [
          { stage: "Prize Bird", age: "Standard summon", size: "Large", img: "images/ostrich.png",
            ac: "11", hp: "19", spd: "15 m",
            attack: "A blur of gold feathers and disdain. Carries the Paladdin wherever looking good demands." },
          { stage: "Ascended", age: "Greater summon", size: "Large", img: "images/ostrich_ascended.png",
            ac: "13", hp: "30", spd: "27 m fly",
            attack: "The Stormstrider remembers the sky. Wings of storm-light; the ground is merely a suggestion." }
        ]
      }
    ],
    story: [
      { title: "The Dossier", text: "Heir to a perfume dynasty that lost everything, Paiman Aladdin swore the Oath of Noble Genies to four elemental patrons — Dao, Djinni, Efreeti, Marid — carrying their essences in a bandolier across his chest. Every smite is a blend; every duel is a tasting. The family fortune will be rebuilt one ingredient at a time, and the \"Breath of Heaven\" — the perfume that ends all perfumes — will be his masterwork." },
      { title: "Fighting Style", text: "A dexterity paladin — the \"Dexadin\" — who treats combat as choreography. Nick and Vex flick in and out like atomizer sprays while the bandolier decides which genie answers the Divine Smite. He will absolutely hold a smite until the lighting is right." }
    ],
    facts: [
      "Refuses trail rations on principle; carries a private spice kit instead.",
      "Combat Vanity is a real mechanic in his head: if it didn't look good, it didn't count.",
      "Navigates socially by scent — allies are catalogued by note (the cleric is \"cedar and regret\").",
      "His amulet grants +1 to his save DC; he claims it is \"simply confidence, distilled.\"",
      "\"The Paladdin\" is, he insists, a title. Nobody granted it."
    ]
  },
  {
    id: "chin_chun_chan",
    name: "Chin Chun Chan",
    short: "Chin-Chu",
    klass: "Fighter",
    subclass: "Samurai",
    race: "Amethyst Dragonborn",
    background: "Outlander",
    level: 8,
    alignment: "Chaotic Good",
    portrait: "images/chin_chun_chan_face.png",
    full: "images/chin_chun_chan.png",
    sheet: "legacy/chin_chun_chan.html",
    epithet: "The Profound Fool",
    tags: ["Naginata: \"Sharp Friend\"", "Baby Hook Horror", "Bows to rocks"],
    quote: "Violence is just spicy peace.",
    stats: { str: 16, dex: 14, con: 16, int: 10, wis: 14, cha: 10 },
    hp: 49, ac: 17,
    summary: "Abandoned at a tavern, raised by dwarves, taught the blade by a weeb dwarf. Believes his breath weapon is just 'breathing really hard'.",

    accent: "#7c3aed",
    identity: {
      Origin: "Abandoned by wealthy dragonborn merchants at a tavern. Raised by the dwarven Clan of the Iron Blossom; taught the blade by Master Thorin Ironwhisker — a dwarf who is, in dwarf terms, \"kind of a weeb.\"",
      Personality: "Speaks in \"profound wisdom\" that is actually just obvious observations (\"Hunger is when you haven't eaten\"). Bows to everyone, including rocks.",
      Ideals: "Enlightenment — \"To know light, one must also know darkness.\" That is why he walked into this cave.",
      Bonds: "My naginata, \"Sharp Friend.\" My adoptive dwarf family. Marcus Gallus, my baby Hook Horror.",
      Flaws: "Believes he is a master flute player (he is terrible). Thinks his breath weapon is just \"breathing really hard.\""
    },
    signature: [
      { name: "Naginata — \"Sharp Friend\"", tag: "+5 · 1d10+3 slashing · reach 10 ft", text: "The \"No.\" stick — hit enemies before they reach you. Great Weapon Master when the moment calls for −5/+10 diplomacy." },
      { name: "Pommel Strike", tag: "Bonus action · +5 · 1d4+3", text: "The blunt end, for enemies who have not yet earned the sharp end." },
      { name: "Breath Weapon — Amethyst", tag: "15-ft cone · DC 14 DEX · 2d10 force", text: "He is just breathing really hard. The fact that it shatters stone is a coincidence." },
      { name: "Fighting Spirit", tag: "Bonus action · adv. + 5 temp HP", text: "Advantage on every attack until end of turn. The spirit was inside him all along; it is mostly spite." },
      { name: "Action Surge", tag: "Short rest", text: "One additional action. He yells \"DOUBLE TIME!\" because he believes he is moving twice as fast. He is not." },
      { name: "Second Wind", tag: "Bonus action · 1d10+5", text: "\"The first wind was free. The second one I had to earn.\"" },
      { name: "Gem Flight", tag: "Bonus action · fly 30 ft · 10 min", text: "Amethyst wings. He assumed everyone could do this if they flexed correctly." },
      { name: "Psionic Mind", tag: "Telepathy 9 m", text: "\"Thinking Loudly.\" He does not understand it is magic; he thinks he is simply very focused." }
    ],
    companions: [
      {
        name: "Marcus Gallus",
        kind: "Hook Horror — adopted in the Underdark",
        blurb: "A baby hook horror who imprinted on the only creature in the Underdark that bowed to him. Growth chart maintained with parental pride.",
        stages: [
          { stage: "Infant", age: "Up to 1 month", size: "Tiny", img: "images/hook_horror_infant.png",
            ac: "10", hp: "4 (1d4+2)", spd: "10 ft",
            stats: { str: 9, dex: 10, con: 10, int: 2, wis: 6, cha: 3 },
            attack: "No effective attacks. Maximum effective screeching." },
          { stage: "Young", age: "1–3 months", size: "Small", img: "images/hook_horror_young.png",
            ac: "11", hp: "11 (2d6+4)", spd: "15 ft",
            stats: { str: 12, dex: 10, con: 12, int: 3, wis: 8, cha: 4 },
            attack: "Hook: +3 to hit, 1d4+1 piercing." },
          { stage: "Juvenile", age: "3–6 months", size: "Medium", img: "images/hook_horror_juvenile.png",
            ac: "13", hp: "39 (6d8+12)", spd: "20 ft",
            stats: { str: 15, dex: 10, con: 14, int: 5, wis: 10, cha: 6 },
            attack: "Hook: +4 to hit, 1d6+2 piercing." },
          { stage: "Adult", age: "6+ months", size: "Large", img: "images/hook_horror_adult.png",
            ac: "15 (natural)", hp: "75 (10d10+20)", spd: "30 ft, climb 30 ft",
            stats: { str: 18, dex: 10, con: 15, int: 6, wis: 12, cha: 7 },
            attack: "Multiattack — two hooks: +6 to hit, reach 10 ft, 11 (2d6+4) piercing. Echolocation, keen hearing, blindsight 60 ft, darkvision 120 ft." }
        ]
      }
    ],
    story: [
      { title: "Chapter 1 — The Oopsie", text: "Two wealthy dragonborn merchants — real fancy types, the kind who would absolutely, definitely, 100% remember to bring their child when leaving a tavern — did not. Baby Chin spent the night staring at a wall." },
      { title: "Chapter 2 — The Dwarves Were Confused But They Had Spirit", text: "The Clan of the Iron Blossom found him the next morning. A dwarf named Grungi poked him with a stick. Chin's first words: \"Stick is long rock.\" The dwarves decided this was deeply profound. It was not. They kept him anyway." },
      { title: "Chapter 3 — The Samurai Arc", text: "Master Thorin Ironwhisker had traveled to Kara-Tur, learned the way of the samurai, and owned a naginata. He was, in dwarf terms, \"kind of a weeb.\" Nobody said it to his face. He taught Chin everything: the blade, the discipline, the bowing. Especially the bowing." },
      { title: "Chapter 5 — The Terrible Decision", text: "At age twenty-something (Chin lost count because \"time is just now happening repeatedly\"), he left to see the world, carrying Thorin's blessing and his naginata. He then chose, of all destinations, the Underdark — because \"to know light, one must also know darkness.\"" },
      { title: "Chapter 6 — Chin's Excellent Underdark Adventure (It Was Not Excellent)", text: "The Underdark is really big, really dark, and really easy to get lost in — especially when your navigation strategy is \"follow the vibes.\" Somewhere in the dark he bowed to a hook horror nest. One egg bowed back, sort of. That was Marcus Gallus." },
      { title: "Chapter 7 — The Present", text: "Roughly forty days in (he doesn't really understand calendars), Chin carries: Sharp Friend; a falcon feather from his dwarf family he sometimes talks to; a flute that has damaged more morale than his sword; a notebook of \"wisdom\"; approximately 47 rations he keeps mysteriously finding; and a bear trap he has forgotten he is carrying." },
      { title: "The Philosophy", text: "On Death: \"When you die, you stop being alive, which is basically the same as being not alive, which is death. So death is death. I am very smart.\" On Being Lost: \"I am not lost. I am exactly where I am. Which is here. Here is a place. Therefore I am in a place. Checkmate, geography.\" On Strategy: \"Every battle is a surprise party. Except I'm the one surprising them. By hitting them.\"" }
    ],
    facts: [
      "Thinks his breath weapon is him \"breathing really hard\" — he does not know it is magic.",
      "Once tried to meditate for three days; actually just fell asleep standing up.",
      "Calls his telepathy \"thinking really loudly at people.\"",
      "The dwarves gave him a falcon feather as a tracking device; he believes it is a sacred symbol.",
      "Has never successfully played a song on the flute; believes he has played thousands.",
      "Bows to everyone — enemies, mushrooms, and once a particularly interesting rock."
    ]
  }
];

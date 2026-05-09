/* ============================================================
   User-owned characters — these are private to the account holder
   (the existing two legacy sheets, kept verbatim in /legacy and
   summarized here for the database/cast view).
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
    tags: ["Dexadin","Bandolier of Essences","Telepathic? No.","Vain"],
    quote: "The Nose Knows.",
    stats: {str:8, dex:20, con:14, int:8, wis:10, cha:16},
    hp: 68, ac: 15,
    summary: "Mixed Chinese/Persian heritage; refuses trail rations on principle. Fights via essences and a steed of his grandfather's prize bird."
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
    tags: ["Naginata: \"Sharp Friend\"","Baby Hook Horror","Bows to rocks"],
    quote: "Violence is just spicy peace.",
    stats: {str:16, dex:14, con:16, int:10, wis:14, cha:10},
    hp: 49, ac: 17,
    summary: "Abandoned at a tavern, raised by dwarves, taught the blade by a weeb dwarf. Believes his breath weapon is just 'breathing really hard'."
  }
];

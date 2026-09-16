// Base de données enrichie des niveaux et mots pour "La Fabrique à Phrases"

const LEVELS_DATA = {
  // ==========================================
  // NIVEAU 1 : FACILE (APPRENTI) - 10 Niveaux
  // Phrases courtes (3 à 6 mots), 0 intrus
  // ==========================================
  easy: [
    {
      id: "easy-1",
      difficulty: "easy",
      title: "Le félin",
      hint: "🐱 Un animal paisible en pleine sieste",
      sentence: "Le chat dort sur le coussin .",
      alternatives: ["Sur le coussin le chat dort ."],
      distractors: [],
      wordTypes: {
        "Le": "article",
        "chat": "noun",
        "dort": "verb",
        "sur": "prep",
        "le": "article",
        "coussin": "noun",
        ".": "punct"
      }
    },
    {
      id: "easy-2",
      difficulty: "easy",
      title: "Belle journée",
      hint: "☀️ La météo est splendide aujourd'hui",
      sentence: "Le soleil brille dans le ciel .",
      alternatives: ["Dans le ciel le soleil brille ."],
      distractors: [],
      wordTypes: {
        "Le": "article",
        "soleil": "noun",
        "brille": "verb",
        "dans": "prep",
        "le": "article",
        "ciel": "noun",
        ".": "punct"
      }
    },
    {
      id: "easy-3",
      difficulty: "easy",
      title: "Le goûter",
      hint: "🍎 Un en-cas croquant et sucré",
      sentence: "La petite fille mange une pomme .",
      alternatives: [],
      distractors: [],
      wordTypes: {
        "La": "article",
        "petite": "adj",
        "fille": "noun",
        "mange": "verb",
        "une": "article",
        "pomme": "noun",
        ".": "punct"
      }
    },
    {
      id: "easy-4",
      difficulty: "easy",
      title: "Jeux au parc",
      hint: "🐶 Un compagnon fidèle qui s'amuse",
      sentence: "Le chien court après la balle .",
      alternatives: [],
      distractors: [],
      wordTypes: {
        "Le": "article",
        "chien": "noun",
        "court": "verb",
        "après": "prep",
        "la": "article",
        "balle": "noun",
        ".": "punct"
      }
    },
    {
      id: "easy-5",
      difficulty: "easy",
      title: "Le concert matinal",
      hint: "🐦 Ils saluent l'aube dans les branches",
      sentence: "Les oiseaux chantent une jolie mélodie .",
      alternatives: [],
      distractors: [],
      wordTypes: {
        "Les": "article",
        "oiseaux": "noun",
        "chantent": "verb",
        "une": "article",
        "jolie": "adj",
        "mélodie": "noun",
        ".": "punct"
      }
    },
    {
      id: "easy-6",
      difficulty: "easy",
      title: "Pause gourmande",
      hint: "☕ Une bonne boisson chaude et réconfortante",
      sentence: "Mon ami prépare un bon chocolat .",
      alternatives: [],
      distractors: [],
      wordTypes: {
        "Mon": "article",
        "ami": "noun",
        "prépare": "verb",
        "un": "article",
        "bon": "adj",
        "chocolat": "noun",
        ".": "punct"
      }
    },
    {
      id: "easy-7",
      difficulty: "easy",
      title: "Nuit paisible",
      hint: "🌙 L'astre de la nuit veille sur nous",
      sentence: "La lune éclaire la nuit calme .",
      alternatives: [],
      distractors: [],
      wordTypes: {
        "La": "article",
        "lune": "noun",
        "éclaire": "verb",
        "la": "article",
        "nuit": "noun",
        "calme": "adj",
        ".": "punct"
      }
    },
    {
      id: "easy-8",
      difficulty: "easy",
      title: "Le jardin vert",
      hint: "🌳 Un grand végétal plein de feuilles",
      sentence: "Le grand arbre pousse dans le jardin .",
      alternatives: ["Dans le jardin le grand arbre pousse ."],
      distractors: [],
      wordTypes: {
        "Le": "article",
        "grand": "adj",
        "arbre": "noun",
        "pousse": "verb",
        "dans": "prep",
        "le": "article",
        "jardin": "noun",
        ".": "punct"
      }
    },
    {
      id: "easy-9",
      difficulty: "easy",
      title: "Dans les champs",
      hint: "🦋 Des insectes ailés et multicolores",
      sentence: "Les papillons volent autour des fleurs .",
      alternatives: ["Autour des fleurs les papillons volent ."],
      distractors: [],
      wordTypes: {
        "Les": "article",
        "papillons": "noun",
        "volent": "verb",
        "autour": "prep",
        "des": "article",
        "fleurs": "noun",
        ".": "punct"
      }
    },
    {
      id: "easy-10",
      difficulty: "easy",
      title: "Le voyage",
      hint: "🚂 Il entre lentement en gare sur ses rails",
      sentence: "Le train arrive à la gare .",
      alternatives: [],
      distractors: [],
      wordTypes: {
        "Le": "article",
        "train": "noun",
        "arrive": "verb",
        "à": "prep",
        "la": "article",
        "gare": "noun",
        ".": "punct"
      }
    }
  ],

  // ==========================================
  // NIVEAU 2 : MOYEN (DÉTECTIVE) - 10 Niveaux
  // Phrases riches (5 à 8 mots) + 2 à 4 intrus
  // ==========================================
  medium: [
    {
      id: "med-1",
      difficulty: "medium",
      title: "L'aventure pirate",
      hint: "🏴‍☠️ Une quête d'or sur une île lointaine (Attention aux intrus !)",
      sentence: "Le pirate cherche un trésor secret .",
      alternatives: [],
      distractors: ["vole", "fusée", "bleue"],
      wordTypes: {
        "Le": "article",
        "pirate": "noun",
        "cherche": "verb",
        "un": "article",
        "trésor": "noun",
        "secret": "adj",
        ".": "punct",
        "vole": "verb",
        "fusée": "noun",
        "bleue": "adj"
      }
    },
    {
      id: "med-2",
      difficulty: "medium",
      title: "Vers les étoiles",
      hint: "🚀 Un voyage spatial impressionnant",
      sentence: "La fusée décolle vers la lune mystérieuse .",
      alternatives: [],
      distractors: ["sous-marin", "dort", "vert"],
      wordTypes: {
        "La": "article",
        "fusée": "noun",
        "décolle": "verb",
        "vers": "prep",
        "la": "article",
        "lune": "noun",
        "mystérieuse": "adj",
        ".": "punct",
        "sous-marin": "noun",
        "dort": "verb",
        "vert": "adj"
      }
    },
    {
      id: "med-3",
      difficulty: "medium",
      title: "La tempête",
      hint: "🍃 La nature se déchaîne dans la forêt",
      sentence: "Le vent souffle fort dans les grands arbres .",
      alternatives: ["Dans les grands arbres le vent souffle fort ."],
      distractors: ["chocolat", "nage", "joyeux"],
      wordTypes: {
        "Le": "article",
        "vent": "noun",
        "souffle": "verb",
        "fort": "adv",
        "dans": "prep",
        "les": "article",
        "grands": "adj",
        "arbres": "noun",
        ".": "punct",
        "chocolat": "noun",
        "nage": "verb",
        "joyeux": "adj"
      }
    },
    {
      id: "med-4",
      difficulty: "medium",
      title: "Le livre mystère",
      hint: "📖 La lecture ouvre des mondes extraordinaires",
      sentence: "Ce livre magique raconte une merveilleuse histoire .",
      alternatives: [],
      distractors: ["fourchette", "mange", "vite"],
      wordTypes: {
        "Ce": "article",
        "livre": "noun",
        "magique": "adj",
        "raconte": "verb",
        "une": "article",
        "merveilleuse": "adj",
        "histoire": "noun",
        ".": "punct",
        "fourchette": "noun",
        "mange": "verb",
        "vite": "adv"
      }
    },
    {
      id: "med-5",
      difficulty: "medium",
      title: "La légende",
      hint: "🐉 Un être ailé qui illumine la nuit de son souffle",
      sentence: "Le dragon crache des flammes géantes .",
      alternatives: [],
      distractors: ["vélo", "tricote", "petit"],
      wordTypes: {
        "Le": "article",
        "dragon": "noun",
        "crache": "verb",
        "des": "article",
        "flammes": "noun",
        "géantes": "adj",
        ".": "punct",
        "vélo": "noun",
        "tricote": "verb",
        "petit": "adj"
      }
    },
    {
      id: "med-6",
      difficulty: "medium",
      title: "Dans les abysses",
      hint: "🐋 Une géante des mers qui nage vers les profondeurs",
      sentence: "La gentille baleine plonge dans l' océan profond .",
      alternatives: [],
      distractors: ["avion", "chante", "rouge"],
      wordTypes: {
        "La": "article",
        "gentille": "adj",
        "baleine": "noun",
        "plonge": "verb",
        "dans": "prep",
        "l'": "article",
        "océan": "noun",
        "profond": "adj",
        ".": "punct",
        "avion": "noun",
        "chante": "verb",
        "rouge": "adj"
      }
    },
    {
      id: "med-7",
      difficulty: "medium",
      title: "L'atelier du chef",
      hint: "🍲 Préparation d'un bon plat d'hiver bien chaud",
      sentence: "Le jeune cuisinier prépare une délicieuse soupe chaude .",
      alternatives: [],
      distractors: ["marteau", "roule", "neige"],
      wordTypes: {
        "Le": "article",
        "jeune": "adj",
        "cuisinier": "noun",
        "prépare": "verb",
        "une": "article",
        "délicieuse": "adj",
        "soupe": "noun",
        "chaude": "adj",
        ".": "punct",
        "marteau": "noun",
        "roule": "verb",
        "neige": "noun"
      }
    },
    {
      id: "med-8",
      difficulty: "medium",
      title: "L'exploratrice martienne",
      hint: "🔴 Une scientifique fait ses premiers pas sur Mars",
      sentence: "L' astronaute courageuse marche sur le sol rouge .",
      alternatives: [],
      distractors: ["voiture", "pomme", "dort"],
      wordTypes: {
        "L'": "article",
        "astronaute": "noun",
        "courageuse": "adj",
        "marche": "verb",
        "sur": "prep",
        "le": "article",
        "sol": "noun",
        "rouge": "adj",
        ".": "punct",
        "voiture": "noun",
        "pomme": "noun",
        "dort": "verb"
      }
    },
    {
      id: "med-9",
      difficulty: "medium",
      title: "Mélodie au piano",
      hint: "🎹 Des notes qui font naître de grandes émotions",
      sentence: "Le pianiste passionné joue un morceau très émouvant .",
      alternatives: [],
      distractors: ["bicyclette", "danse", "bleu"],
      wordTypes: {
        "Le": "article",
        "pianiste": "noun",
        "passionné": "adj",
        "joue": "verb",
        "un": "article",
        "morceau": "noun",
        "très": "adv",
        "émouvant": "adj",
        ".": "punct",
        "bicyclette": "noun",
        "danse": "verb",
        "bleu": "adj"
      }
    },
    {
      id: "med-10",
      difficulty: "medium",
      title: "Dans la clairière",
      hint: "🦊 Un animal rusé qui guette discrètement",
      sentence: "Le petit renard roux observe les lapins blancs .",
      alternatives: [],
      distractors: ["requin", "vole", "jaune"],
      wordTypes: {
        "Le": "article",
        "petit": "adj",
        "renard": "noun",
        "roux": "adj",
        "observe": "verb",
        "les": "article",
        "lapins": "noun",
        "blancs": "adj",
        ".": "punct",
        "requin": "noun",
        "vole": "verb",
        "jaune": "adj"
      }
    }
  ],

  // ==========================================
  // NIVEAU 3 : DIFFICILE (MAÎTRE DES MOTS) - 10 Niveaux
  // Phrases longues (7 à 11 mots) + pièges d'accords & conjugaison
  // ==========================================
  hard: [
    {
      id: "hard-1",
      difficulty: "hard",
      title: "Nuit étoilée",
      hint: "🔭 Attention aux accords pluriels des noms et adjectifs !",
      sentence: "Les enfants curieux observent les étoiles scintillantes .",
      alternatives: [],
      distractors: ["observe", "l'enfant", "étoile", "scintillante"],
      wordTypes: {
        "Les": "article",
        "enfants": "noun",
        "curieux": "adj",
        "observent": "verb",
        "les": "article",
        "étoiles": "noun",
        "scintillantes": "adj",
        ".": "punct",
        "observe": "verb",
        "l'enfant": "noun",
        "étoile": "noun",
        "scintillante": "adj"
      }
    },
    {
      id: "hard-2",
      difficulty: "hard",
      title: "Le concert symphonique",
      hint: "🎻 Attention à l'accord du verbe et de l'adjectif féminin",
      sentence: "Cette musicienne talentueuse joue une magnifique mélodie .",
      alternatives: [],
      distractors: ["talentueux", "jouent", "magnifiques", "ce"],
      wordTypes: {
        "Cette": "article",
        "musicienne": "noun",
        "talentueuse": "adj",
        "joue": "verb",
        "une": "article",
        "magnifique": "adj",
        "mélodie": "noun",
        ".": "punct",
        "talentueux": "adj",
        "jouent": "verb",
        "magnifiques": "adj",
        "ce": "article"
      }
    },
    {
      id: "hard-3",
      difficulty: "hard",
      title: "Les pâtissiers gourmands",
      hint: "🎂 Veille à accorder le sujet au pluriel avec son verbe",
      sentence: "Nos voisins préparent un délicieux gâteau au chocolat .",
      alternatives: [],
      distractors: ["voisin", "prépare", "délicieuse", "des"],
      wordTypes: {
        "Nos": "article",
        "voisins": "noun",
        "préparent": "verb",
        "un": "article",
        "délicieux": "adj",
        "gâteau": "noun",
        "au": "prep",
        "chocolat": "noun",
        ".": "punct",
        "voisin": "noun",
        "prépare": "verb",
        "délicieuse": "adj",
        "des": "article"
      }
    },
    {
      id: "hard-4",
      difficulty: "hard",
      title: "Le gardien de l'océan",
      hint: "🌊 Gare aux pièges d'accords féminins et pluriels !",
      sentence: "Les vagues puissantes frappent le vieux phare rocheux .",
      alternatives: [],
      distractors: ["vague", "frappe", "puissant", "vieille"],
      wordTypes: {
        "Les": "article",
        "vagues": "noun",
        "puissantes": "adj",
        "frappent": "verb",
        "le": "article",
        "vieux": "adj",
        "phare": "noun",
        "rocheux": "adj",
        ".": "punct",
        "vague": "noun",
        "frappe": "verb",
        "puissant": "adj",
        "vieille": "adj"
      }
    },
    {
      id: "hard-5",
      difficulty: "hard",
      title: "La chevauchée sauvage",
      hint: "🐎 Attention au pluriel irrégulier de cheval et aux accords",
      sentence: "Ces chevaux sauvages galopent à travers la vaste plaine .",
      alternatives: ["À travers la vaste plaine ces chevaux sauvages galopent ."],
      distractors: ["cheval", "sauvage", "galope", "vastes"],
      wordTypes: {
        "Ces": "article",
        "chevaux": "noun",
        "sauvages": "adj",
        "galopent": "verb",
        "à": "prep",
        "travers": "prep",
        "la": "article",
        "vaste": "adj",
        "plaine": "noun",
        ".": "punct",
        "cheval": "noun",
        "sauvage": "adj",
        "galope": "verb",
        "vastes": "adj"
      }
    },
    {
      id: "hard-6",
      difficulty: "hard",
      title: "Le laboratoire futuriste",
      hint: "💡 Féminin pluriel exigeant pour les savantes et leurs machines",
      sentence: "Les savantes ingénieuses inventent des machines futuristes très fascinantes .",
      alternatives: [],
      distractors: ["savant", "ingénieux", "invente", "fascinant"],
      wordTypes: {
        "Les": "article",
        "savantes": "noun",
        "ingénieuses": "adj",
        "inventent": "verb",
        "des": "article",
        "machines": "noun",
        "futuristes": "adj",
        "très": "adv",
        "fascinantes": "adj",
        ".": "punct",
        "savant": "noun",
        "ingénieux": "adj",
        "invente": "verb",
        "fascinant": "adj"
      }
    },
    {
      id: "hard-7",
      difficulty: "hard",
      title: "Au crépuscule",
      hint: "⛅ Pluriel des nuages et singulier de la lueur du soleil",
      sentence: "De sombres nuages menaçants cachent la lueur dorée du soleil .",
      alternatives: [],
      distractors: ["sombre", "menaçant", "cache", "doré"],
      wordTypes: {
        "De": "article",
        "sombres": "adj",
        "nuages": "noun",
        "menaçants": "adj",
        "cachent": "verb",
        "la": "article",
        "lueur": "noun",
        "dorée": "adj",
        "du": "prep",
        "soleil": "noun",
        ".": "punct",
        "sombre": "adj",
        "menaçant": "adj",
        "cache": "verb",
        "doré": "adj"
      }
    },
    {
      id: "hard-8",
      difficulty: "hard",
      title: "Expédition polaire",
      hint: "❄️ Attention au pluriel des explorateurs et à l'accord de l'adjectif",
      sentence: "Les explorateurs polaires bravent le froid glacial avec un grand courage .",
      alternatives: ["Avec un grand courage les explorateurs polaires bravent le froid glacial ."],
      distractors: ["explorateur", "polaire", "brave", "glaciaux"],
      wordTypes: {
        "Les": "article",
        "explorateurs": "noun",
        "polaires": "adj",
        "bravent": "verb",
        "le": "article",
        "froid": "noun",
        "glacial": "adj",
        "avec": "prep",
        "un": "article",
        "grand": "adj",
        "courage": "noun",
        ".": "punct",
        "explorateur": "noun",
        "polaire": "adj",
        "brave": "verb",
        "glaciaux": "adj"
      }
    },
    {
      id: "hard-9",
      difficulty: "hard",
      title: "Les gardiennes de la nuit",
      hint: "🦉 Chouettes au féminin pluriel et sous-bois au singulier",
      sentence: "Ces chouettes attentives surveillent le sous-bois silencieux avec patience .",
      alternatives: ["Avec patience ces chouettes attentives surveillent le sous-bois silencieux ."],
      distractors: ["chouette", "attentif", "surveille", "silencieuse"],
      wordTypes: {
        "Ces": "article",
        "chouettes": "noun",
        "attentives": "adj",
        "surveillent": "verb",
        "le": "article",
        "sous-bois": "noun",
        "silencieux": "adj",
        "avec": "prep",
        "patience": "noun",
        ".": "punct",
        "chouette": "noun",
        "attentif": "adj",
        "surveille": "verb",
        "silencieuse": "adj"
      }
    },
    {
      id: "hard-10",
      difficulty: "hard",
      title: "Le festin du roi",
      hint: "👑 Mets raffinés et convives ravis : tout s'accorde au pluriel !",
      sentence: "Les convives ravis dégustent de succulents mets délicatement préparés .",
      alternatives: [],
      distractors: ["convive", "ravi", "déguste", "succulent"],
      wordTypes: {
        "Les": "article",
        "convives": "noun",
        "ravis": "adj",
        "dégustent": "verb",
        "de": "article",
        "succulents": "adj",
        "mets": "noun",
        "délicatement": "adv",
        "préparés": "adj",
        ".": "punct",
        "convive": "noun",
        "ravi": "adj",
        "déguste": "verb",
        "succulent": "adj"
      }
    }
  ],

  // ==========================================
  // MODE CRÉATIF (BAC À SABLE) - 100+ MOTS
  // Classés par catégorie grammaticale pour composer
  // une infinité de phrases libres et amusantes !
  // ==========================================
  sandbox: {
    title: "Atelier Créatif Libre",
    description: "Compose la phrase de ton choix avec plus de 100 mots disponibles, et écoute-la !",
    words: [
      // Articles & Déterminants (14)
      { text: "Un", type: "article" },
      { text: "Une", type: "article" },
      { text: "Le", type: "article" },
      { text: "La", type: "article" },
      { text: "Les", type: "article" },
      { text: "Des", type: "article" },
      { text: "Mon", type: "article" },
      { text: "Ma", type: "article" },
      { text: "Mes", type: "article" },
      { text: "Ce", type: "article" },
      { text: "Cette", type: "article" },
      { text: "Ces", type: "article" },
      { text: "Notre", type: "article" },
      { text: "Chaque", type: "article" },

      // Noms (32)
      { text: "chat", type: "noun" },
      { text: "chien", type: "noun" },
      { text: "robot", type: "noun" },
      { text: "sorcier", type: "noun" },
      { text: "sorcière", type: "noun" },
      { text: "dinosaure", type: "noun" },
      { text: "licorne", type: "noun" },
      { text: "dragon", type: "noun" },
      { text: "pirate", type: "noun" },
      { text: "astronaute", type: "noun" },
      { text: "princesse", type: "noun" },
      { text: "détective", type: "noun" },
      { text: "super-héros", type: "noun" },
      { text: "grenouille", type: "noun" },
      { text: "panda", type: "noun" },
      { text: "oiseau", type: "noun" },
      { text: "pizza", type: "noun" },
      { text: "gâteau", type: "noun" },
      { text: "glace", type: "noun" },
      { text: "chocolat", type: "noun" },
      { text: "étoile", type: "noun" },
      { text: "nuage", type: "noun" },
      { text: "soleil", type: "noun" },
      { text: "lune", type: "noun" },
      { text: "fusée", type: "noun" },
      { text: "château", type: "noun" },
      { text: "forêt", type: "noun" },
      { text: "océan", type: "noun" },
      { text: "trésor", type: "noun" },
      { text: "musique", type: "noun" },
      { text: "livre", type: "noun" },
      { text: "machine", type: "noun" },

      // Verbes (24)
      { text: "mange", type: "verb" },
      { text: "prépare", type: "verb" },
      { text: "danse", type: "verb" },
      { text: "vole", type: "verb" },
      { text: "chante", type: "verb" },
      { text: "invente", type: "verb" },
      { text: "explore", type: "verb" },
      { text: "dort", type: "verb" },
      { text: "pilote", type: "verb" },
      { text: "regarde", type: "verb" },
      { text: "écoute", type: "verb" },
      { text: "cherche", type: "verb" },
      { text: "trouve", type: "verb" },
      { text: "dessine", type: "verb" },
      { text: "construit", type: "verb" },
      { text: "transforme", type: "verb" },
      { text: "protège", type: "verb" },
      { text: "adore", type: "verb" },
      { text: "déguste", type: "verb" },
      { text: "rigole", type: "verb" },
      { text: "joue", type: "verb" },
      { text: "court", type: "verb" },
      { text: "saute", type: "verb" },
      { text: "partage", type: "verb" },

      // Adjectifs (22)
      { text: "joyeux", type: "adj" },
      { text: "joyeuse", type: "adj" },
      { text: "géant", type: "adj" },
      { text: "géante", type: "adj" },
      { text: "petit", type: "adj" },
      { text: "petite", type: "adj" },
      { text: "magique", type: "adj" },
      { text: "multicolore", type: "adj" },
      { text: "gourmand", type: "adj" },
      { text: "gourmande", type: "adj" },
      { text: "invisible", type: "adj" },
      { text: "secret", type: "adj" },
      { text: "secrète", type: "adj" },
      { text: "brillant", type: "adj" },
      { text: "brillante", type: "adj" },
      { text: "courageux", type: "adj" },
      { text: "courageuse", type: "adj" },
      { text: "électrique", type: "adj" },
      { text: "rapide", type: "adj" },
      { text: "fantastique", type: "adj" },
      { text: "lumineux", type: "adj" },
      { text: "magnifique", type: "adj" },

      // Prépositions & Positions (10)
      { text: "sur", type: "prep" },
      { text: "sous", type: "prep" },
      { text: "dans", type: "prep" },
      { text: "avec", type: "prep" },
      { text: "sans", type: "prep" },
      { text: "pour", type: "prep" },
      { text: "vers", type: "prep" },
      { text: "chez", type: "prep" },
      { text: "devant", type: "prep" },
      { text: "derrière", type: "prep" },

      // Adverbes (8)
      { text: "très", type: "adv" },
      { text: "toujours", type: "adv" },
      { text: "joyeusement", type: "adv" },
      { text: "doucement", type: "adv" },
      { text: "rapidement", type: "adv" },
      { text: "souvent", type: "adv" },
      { text: "soudain", type: "adv" },
      { text: "bien", type: "adv" },

      // Conjonctions (5)
      { text: "et", type: "conj" },
      { text: "mais", type: "conj" },
      { text: "car", type: "conj" },
      { text: "puis", type: "conj" },
      { text: "parce que", type: "conj" },

      // Ponctuations (4)
      { text: "!", type: "punct" },
      { text: "?", type: "punct" },
      { text: ".", type: "punct" },
      { text: "...", type: "punct" }
    ]
  }
};

const GRAMMAR_TYPES = {
  article: { label: "Article", className: "type-article" },
  noun: { label: "Nom", className: "type-noun" },
  verb: { label: "Verbe", className: "type-verb" },
  adj: { label: "Adjectif", className: "type-adj" },
  prep: { label: "Préposition", className: "type-prep" },
  adv: { label: "Adverbe", className: "type-adv" },
  conj: { label: "Conjonction", className: "type-conj" },
  punct: { label: "Ponctuation", className: "type-punct" }
};

if (typeof window !== "undefined") {
  window.LEVELS_DATA = LEVELS_DATA;
  window.GRAMMAR_TYPES = GRAMMAR_TYPES;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { LEVELS_DATA, GRAMMAR_TYPES };
}

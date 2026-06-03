/* ═══════════════════════════════════════════════════════════════
   topic-data.js — Datos de temas y juegos  |  Aura Languages
   ═══════════════════════════════════════════════════════════════ */

/* ── Topics (Bronce A1) ──────────────────────────────────────── */
var TOPICS=[
  {id:1,rank:'Bronce',cefr:'A1',title:'THE IDENTITY\nCODE',sub:'Personal Pronouns',
   img:IMG('diverse silhouettes of faces identity characters dark background'),xp:175,steps:7},
  {id:2,rank:'Bronce',cefr:'A1',title:'TO BE\nPRESENT',sub:'am / is / are',
   img:'https://image.pollinations.ai/prompt/to-be-verb-present-english-learning,vibrant,flat-design?width=400&height=220&nologo=true',xp:175,steps:7},
  {id:3,rank:'Bronce',cefr:'A1',title:'A OR\nTHE?',sub:'Articles',
   img:IMG('golden letters typography dark surface'),xp:175,steps:5},
  {id:4,rank:'Bronce',cefr:'A1',title:'NAME\nEVERYTHING',sub:'Basic Nouns',
   img:IMG('labeled everyday objects still life'),xp:175,steps:5},
  {id:5,rank:'Bronce',cefr:'A1',title:'COUNT THE\nWORLD',sub:'Numbers & Counting',
   img:IMG('floating numbers digits geometric'),xp:175,steps:5},
  {id:6,rank:'Bronce',cefr:'A1',title:'COLOR YOUR\nWORDS',sub:'Basic Adjectives',
   img:IMG('colorful paint splash dark background'),xp:175,steps:5},
  {id:7,rank:'Bronce',cefr:'A1',title:'DAILY\nHABITS',sub:'Present Simple',
   img:IMG('morning routine coffee book'),xp:200,steps:6},
  {id:8,rank:'Bronce',cefr:'A1',title:'HERE\n& THERE',sub:'Prepositions of Place',
   img:IMG('compass map navigation location'),xp:175,steps:5},
  {id:9,rank:'Bronce',cefr:'A1',title:'ASK\nAWAY',sub:'Basic Questions',
   img:IMG('neon question mark glowing dark'),xp:175,steps:5},
  {id:10,rank:'Bronce',cefr:'A1',title:'NOT\nTODAY',sub:'Negation',
   img:IMG('forbidden sign crossed out'),xp:175,steps:5},
];

/* ── Game data: Tarjeta 1 — THE IDENTITY CODE ────────────────── */
var GAMES1=[
  { id:'translate', label:'Traducción', xp:25,
    instr:'Elige la traducción correcta al inglés para cada pronombre.',
    items:[
      { src:'Yo',       opts:['He','I','You','We'],     correct:1 },
      { src:'Tú',       opts:['You','He','She','They'], correct:0 },
      { src:'Él',       opts:['She','It','He','We'],    correct:2 },
      { src:'Ella',     opts:['He','She','It','You'],   correct:1 },
      { src:'Nosotros', opts:['They','You','We','I'],   correct:2 },
      { src:'Ellos',    opts:['He','We','You','They'],  correct:3 }
    ]
  },
  { id:'mc', label:'Quiz Rápido', xp:25,
    q:'¿Qué pronombre se usa para hablar de un hombre que NO está en la conversación?',
    opts:['I','She','He','They'], correct:2
  },
  { id:'match', label:'Empareja', xp:30,
    instr:'Haz clic en un pronombre y luego en su significado.',
    pairs:[
      ['I',    'Yo — el que habla'],
      ['You',  'Tú — el que escucha'],
      ['He',   'Él — un hombre ausente'],
      ['She',  'Ella — una mujer ausente'],
      ['We',   'Nosotros — el hablante y otros'],
      ['They', 'Ellos — un grupo de personas']
    ]
  },
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el pronombre correcto para llenar el espacio.',
    sents:[
      { pre:'', ans:'I',    post:' am a student.',     bank:['I','Me','My','He'] },
      { pre:'', ans:'She',  post:' is my sister.',     bank:['Her','She','It','He'] },
      { pre:'', ans:'We',   post:' are best friends.', bank:['Us','We','They','I'] },
      { pre:'', ans:'They', post:' are at home.',      bank:['He','Them','They','She'] }
    ]
  },
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Toca las letras en el orden correcto para formar el pronombre.',
    words:[
      { scrambled:['H','E','S'],     ans:'SHE',  hint:'Pronombre femenino singular' },
      { scrambled:['H','E','Y','T'], ans:'THEY', hint:'Plural — ellos / ellas' },
      { scrambled:['E','W'],         ans:'WE',   hint:'Yo + otras personas' },
      { scrambled:['O','Y','U'],     ans:'YOU',  hint:'La persona que escucha' }
    ]
  },
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto para formar la oración.',
    sents:[
      { words:['am','I','happy'],         ans:['I','am','happy'] },
      { words:['is','She','my','sister'], ans:['She','is','my','sister'] },
      { words:['are','We','friends'],     ans:['We','are','friends'] }
    ]
  },
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige el pronombre correcto.',
    sents:[
      { words:['Him','is','a','doctor','.'],     wi:0, correct:'He',   choices:['He','His','Her','They'] },
      { words:['Me','am','a','student','.'],     wi:0, correct:'I',    choices:['I','My','Mine','We'] },
      { words:['Them','are','my','friends','.'], wi:0, correct:'They', choices:['Their','They','Those','Them'] }
    ]
  }
];

/* ── Game data: Tarjeta 2 — TO BE PRESENT ───────────────────── */
var GAMES2=[
  { id:'translate', label:'Traducción', xp:25,
    instr:'Elige la traducción correcta al inglés.',
    items:[
      { src:'Yo soy',         opts:['I is','I am','I are','I be'],             correct:1 },
      { src:'Tú eres',        opts:['You is','You am','You are','You be'],      correct:2 },
      { src:'Él es',          opts:['He are','He am','He is','He be'],          correct:2 },
      { src:'Ella es',        opts:['She am','She is','She are','She be'],      correct:1 },
      { src:'Nosotros somos', opts:['We is','We are','We am','We be'],          correct:1 },
      { src:'Ellos son',      opts:['They is','They am','They are','They be'],  correct:2 }
    ]
  },
  { id:'mc', label:'Quiz Rápido', xp:25,
    q:'¿Qué forma del verbo TO BE se usa con el pronombre "I"?',
    opts:['is','are','am','be'], correct:2
  },
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Lee cada afirmación y decide si es verdadera o falsa.',
    stmts:[
      { text:"Con 'He' se usa la forma 'is'.",  ans:true,  expl:'Correcto. He, She e It siempre usan IS.' },
      { text:"Con 'They' se usa 'is'.",          ans:false, expl:'Falso. They usa ARE porque es plural.' },
      { text:"Con 'I' se usa 'am'.",             ans:true,  expl:'Correcto. El pronombre I siempre va con AM.' },
      { text:"Con 'We' se usa 'am'.",            ans:false, expl:'Falso. We es plural y usa ARE.' }
    ]
  },
  { id:'match', label:'Empareja', xp:30,
    instr:'Haz clic en una forma en inglés y luego en su traducción.',
    pairs:[
      ['I am',    'Yo soy'],
      ['You are', 'Tú eres'],
      ['He is',   'Él es'],
      ['She is',  'Ella es'],
      ['We are',  'Nosotros somos'],
      ['They are','Ellos son']
    ]
  },
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca la forma correcta del verbo TO BE para llenar el espacio.',
    sents:[
      { pre:'I ',    ans:'am',  post:' a teacher.', bank:['is','are','am','be'] },
      { pre:'She ',  ans:'is',  post:' my mother.', bank:['are','am','is','be'] },
      { pre:'We ',   ans:'are', post:' students.',  bank:['is','am','are','be'] },
      { pre:'They ', ans:'are', post:' happy.',     bank:['is','am','are','be'] }
    ]
  },
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto para formar la oración.',
    sents:[
      { words:['am','I','a','student'],   ans:['I','am','a','student'] },
      { words:['is','She','my','friend'], ans:['She','is','my','friend'] },
      { words:['are','We','at','home'],   ans:['We','are','at','home'] }
    ]
  },
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige la forma correcta del verbo TO BE.',
    sents:[
      { words:['I','is','happy','.'],           wi:1, correct:'am',  choices:['am','are','be','is'] },
      { words:['She','are','my','teacher','.'], wi:1, correct:'is',  choices:['am','is','are','be'] },
      { words:['They','am','friends','.'],      wi:1, correct:'are', choices:['is','are','am','be'] }
    ]
  }
];

/* ── getGames ────────────────────────────────────────────────── */
function getGames(id){
  if(id===1) return GAMES1;
  if(id===2) return GAMES2;
  return null;
}

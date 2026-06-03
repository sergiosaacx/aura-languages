/* ============================================================
   progreso-data.js — Datos estáticos del currículo Aura
   ============================================================ */

const PT_RANK_ORDER = ['Bronce','Plata','Oro','Platino','Diamante','Challenger'];
const PT_RANK_LVL   = {Bronce:1,Plata:2,Oro:3,Platino:4,Diamante:5,Challenger:6};
const PT_RANK_META  = {
  Bronce    :{cefr:'A1',color:'#cd7f32',desc:'Fundamentos esenciales'},
  Plata     :{cefr:'A2',color:'#d1d5db',desc:'Expresión elemental'},
  Oro       :{cefr:'B1',color:'#fbbf24',desc:'Independencia comunicativa'},
  Platino   :{cefr:'B2',color:'#5eead4',desc:'Fluidez avanzada'},
  Diamante  :{cefr:'C1',color:'#60a5fa',desc:'Dominio del idioma'},
  Challenger:{cefr:'C2',color:'#c084fc',desc:'Maestría total'},
};

const PT_SHIELD_PATH = 'M30,3 L54,11 L54,32 Q54,52 30,65 Q6,52 6,32 L6,11 Z';
function ptRankShieldSVG(color, locked){
  if(locked){
    return `<svg viewBox="0 0 60 68" aria-hidden="true">
      <defs><linearGradient id="ptShineLocked" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".22"/>
        <stop offset=".6" stop-color="#fff" stop-opacity="0"/>
      </linearGradient></defs>
      <path d="${PT_SHIELD_PATH}" fill="#262626" stroke="rgba(0,0,0,.6)" stroke-width="2"/>
      <path d="${PT_SHIELD_PATH}" fill="url(#ptShineLocked)"/>
      <path d="M30,9 L50,16 L50,32 Q50,49 30,60 Q10,49 10,32 L10,16 Z" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="1"/>
    </svg>`;
  }
  const id = 'ptSh-' + Math.random().toString(36).slice(2,8);
  return `<svg viewBox="0 0 60 68" aria-hidden="true">
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".45"/>
        <stop offset=".55" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="${PT_SHIELD_PATH}" fill="${color}" stroke="rgba(0,0,0,.55)" stroke-width="2"/>
    <path d="${PT_SHIELD_PATH}" fill="url(#${id})"/>
    <path d="M30,9 L50,16 L50,32 Q50,49 30,60 Q10,49 10,32 L10,16 Z" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="1"/>
  </svg>`;
}

const PT_T_ICO = {
  Grammar:'◎', Vocabulary:'◈', Speaking:'◉',
  Writing:'✦', Reading:'◇', 'All Skills':'❋'
};

const _PT_IMG_STYLE = ', minimalist abstract concept art, dark moody cinematic photography, deep shadows, dramatic lighting';
function ptImgUrl(prompt){
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + _PT_IMG_STYLE)}?width=320&height=480&nologo=true&model=flux&seed=42`;
}

const PT_TOPICS = [
  /* ─── BRONCE A1 ─── */
  {id:1, rank:'Bronce', title:'THE IDENTITY\nCODE',   sub:'Personal Pronouns',           type:'Grammar',    img:ptImgUrl('diverse silhouettes of faces, identity, portraits')},
  {id:2, rank:'Bronce', title:'AM IS\nARE',            sub:'Verb To Be',                  type:'Grammar',    img:ptImgUrl('abstract being and existence, flowing light')},
  {id:3, rank:'Bronce', title:'A OR\nTHE?',            sub:'Articles',                    type:'Grammar',    img:ptImgUrl('golden letters typography on dark surface')},
  {id:4, rank:'Bronce', title:'NAME\nEVERYTHING',      sub:'Basic Nouns',                 type:'Vocabulary', img:ptImgUrl('labeled everyday objects, still life arrangement')},
  {id:5, rank:'Bronce', title:'COUNT THE\nWORLD',      sub:'Numbers & Counting',          type:'Vocabulary', img:ptImgUrl('floating numbers and digits, geometric')},
  {id:6, rank:'Bronce', title:'COLOR YOUR\nWORDS',     sub:'Basic Adjectives',            type:'Vocabulary', img:ptImgUrl('colorful paint splash on dark background')},
  {id:7, rank:'Bronce', title:'DAILY\nHABITS',         sub:'Present Simple',              type:'Grammar',    img:ptImgUrl('morning routine, coffee cup and open book')},
  {id:8, rank:'Bronce', title:'HERE\n& THERE',         sub:'Prepositions of Place & Time',type:'Grammar',    img:ptImgUrl('compass and map, navigation, location')},
  {id:9, rank:'Bronce', title:'ASK\nAWAY',             sub:'Basic Questions',             type:'Speaking',   img:ptImgUrl('neon question mark glowing in the dark')},
  {id:10,rank:'Bronce', title:'NOT\nTODAY',            sub:'Negation',                    type:'Grammar',    img:ptImgUrl('forbidden sign, crossed out, no entry')},

  /* ─── PLATA A2 ─── */
  {id:11,rank:'Plata',  title:'HAPPENING\nNOW',        sub:'Present Continuous',          type:'Grammar',    img:ptImgUrl('motion blur action, person walking street')},
  {id:12,rank:'Plata',  title:'WHAT\nHAPPENED?',       sub:'Past Simple — Regular',       type:'Grammar',    img:ptImgUrl('vintage memory, scattered old photographs')},
  {id:13,rank:'Plata',  title:'RULE\nBREAKERS',        sub:'Past Simple — Irregular',     type:'Grammar',    img:ptImgUrl('broken rules, shattered glass chaos')},
  {id:14,rank:'Plata',  title:'THE BIG\nPLAN',         sub:'Going To',                    type:'Grammar',    img:ptImgUrl('blueprint planning, architect roadmap')},
  {id:15,rank:'Plata',  title:'FUTURE\nPROMISE',       sub:'Future with Will',            type:'Grammar',    img:ptImgUrl('sunrise horizon, hopeful future light')},
  {id:16,rank:'Plata',  title:'BETTER\n& BEST',        sub:'Comparatives & Superlatives', type:'Grammar',    img:ptImgUrl('balance scale weighing, comparison')},
  {id:17,rank:'Plata',  title:'POWER\nWORDS',          sub:'Can, Could, Should',          type:'Grammar',    img:ptImgUrl('strong powerful hand, capability strength')},
  {id:18,rank:'Plata',  title:'MINE\nYOURS OURS',      sub:'Possessives',                 type:'Grammar',    img:ptImgUrl('ornate keys and treasure, ownership')},
  {id:19,rank:'Plata',  title:'COUNT\nOR NOT?',        sub:'Countable & Uncountable',     type:'Grammar',    img:ptImgUrl('scattered grains versus stacked objects')},
  {id:20,rank:'Plata',  title:'WHAT\nIF?',             sub:'Zero & First Conditional',    type:'Grammar',    img:ptImgUrl('forked path in forest, choices')},

  /* ─── ORO B1 ─── */
  {id:21,rank:'Oro',    title:'BEEN\nTHERE',           sub:'Present Perfect',             type:'Grammar',    img:ptImgUrl('old passport with travel stamps, memories')},
  {id:22,rank:'Oro',    title:'IN THE\nMIDDLE OF',     sub:'Past Continuous',             type:'Grammar',    img:ptImgUrl('motion blur action mid-movement')},
  {id:23,rank:'Oro',    title:'EVEN FURTHER\nBACK',    sub:'Past Perfect',                type:'Grammar',    img:ptImgUrl('ancient ruins, archaeology history')},
  {id:24,rank:'Oro',    title:'IN ANOTHER\nWORLD',     sub:'Second Conditional',          type:'Grammar',    img:ptImgUrl('parallel dimension portal, abstract')},
  {id:25,rank:'Oro',    title:'HE SAID\nSHE SAID',     sub:'Reported Speech',             type:'Grammar',    img:ptImgUrl('two silhouettes whispering, conversation')},
  {id:26,rank:'Oro',    title:'THE PASSIVE\nTURN',     sub:'Passive Voice',               type:'Grammar',    img:ptImgUrl('mirror reflection, inverted perspective')},
  {id:27,rank:'Oro',    title:'DOING OR\nTO DO?',      sub:'Gerunds & Infinitives',       type:'Grammar',    img:ptImgUrl('dancer in motion, dynamic action')},
  {id:28,rank:'Oro',    title:'VERB\nCOMBOS',          sub:'Common Phrasal Verbs',        type:'Vocabulary', img:ptImgUrl('puzzle pieces fitting together')},
  {id:29,rank:'Oro',    title:'MUST\nVS MIGHT',        sub:'Advanced Modals',             type:'Grammar',    img:ptImgUrl('foggy mist mystery, uncertainty')},
  {id:30,rank:'Oro',    title:'SO VERY\nMUCH',         sub:'Adverbs & Intensifiers',      type:'Grammar',    img:ptImgUrl('dramatic spotlight beam in darkness')},

  /* ─── PLATINO B2 ─── */
  {id:31,rank:'Platino',title:'STILL\nRUNNING',        sub:'Present Perfect Continuous',  type:'Grammar',    img:ptImgUrl('endless infinity loop, ongoing motion')},
  {id:32,rank:'Platino',title:'WAY\nBEFORE',           sub:'Past Perfect Continuous',     type:'Grammar',    img:ptImgUrl('sepia archaeology distant past artifacts')},
  {id:33,rank:'Platino',title:'WHAT COULD\nHAVE BEEN',sub:'Third Conditional',           type:'Grammar',    img:ptImgUrl('somber regret, empty chair, melancholy')},
  {id:34,rank:'Platino',title:'TIMELINES\nCOLLIDE',    sub:'Mixed Conditionals',          type:'Grammar',    img:ptImgUrl('tangled threads converging, time lines')},
  {id:35,rank:'Platino',title:'PASSIVE\nMASTER',       sub:'Advanced Passive Voice',      type:'Grammar',    img:ptImgUrl('masterful virtuoso hand, refined technique')},
  {id:36,rank:'Platino',title:'THE\nCONNECTOR',        sub:'Relative Clauses',            type:'Grammar',    img:ptImgUrl('network web connections, glowing nodes')},
  {id:37,rank:'Platino',title:'VISION OF\nTHE FUTURE', sub:'Future Perfect & Continuous', type:'Grammar',    img:ptImgUrl('futuristic skyline horizon, distant city')},
  {id:38,rank:'Platino',title:'THE FULL\nSTORY',       sub:'Narrative Tenses',            type:'Grammar',    img:ptImgUrl('campfire storytelling, narrative scene')},

  /* ─── DIAMANTE C1 ─── */
  {id:39,rank:'Diamante',title:'FLIP THE\nSCRIPT',     sub:'Inversion',                   type:'Grammar',    img:ptImgUrl('upside down landscape, inverted reflection')},
  {id:40,rank:'Diamante',title:'SHARP\nFOCUS',         sub:'Cleft Sentences',             type:'Grammar',    img:ptImgUrl('laser focused beam, sharp precision')},
  {id:41,rank:'Diamante',title:'MODAL\nELITE',         sub:'Advanced Modal Expressions',  type:'Grammar',    img:ptImgUrl('luxury premium exclusive lounge')},
  {id:42,rank:'Diamante',title:'TURN VERBS\nTO NOUNS', sub:'Nominalization',              type:'Grammar',    img:ptImgUrl('metamorphosis transformation butterfly')},
  {id:43,rank:'Diamante',title:'FORMAL\nCONDITIONS',   sub:'Advanced Conditionals',       type:'Grammar',    img:ptImgUrl('classical architecture columns formal')},
  {id:44,rank:'Diamante',title:'COMPLEX\nPASSIVE',     sub:'Complex Passive Structures',  type:'Grammar',    img:ptImgUrl('intricate machinery clockwork gears')},
  {id:45,rank:'Diamante',title:'THE\nGLUE',            sub:'Discourse Markers & Cohesion',type:'Writing',    img:ptImgUrl('woven threads bonds connecting fabric')},

  /* ─── CHALLENGER C2 ─── */
  {id:46,rank:'Challenger',title:'SHAPE\nSHIFTER',     sub:'Register & Style',            type:'Speaking',   img:ptImgUrl('chameleon shapeshifter adaptation')},
  {id:47,rank:'Challenger',title:'HIDDEN\nLANGUAGE',   sub:'Idioms & Metaphors',          type:'Vocabulary', img:ptImgUrl('hidden secret door mystery shadow')},
  {id:48,rank:'Challenger',title:'ACADEMIC\nVOICE',    sub:'Academic & Professional',     type:'Writing',    img:ptImgUrl('grand library wall of antique books')},
  {id:49,rank:'Challenger',title:'BETWEEN\nTHE LINES', sub:'Implicit Meaning & Subtext',  type:'Reading',    img:ptImgUrl('open book with light between pages')},
  {id:50,rank:'Challenger',title:'THE FINAL\nFORM',    sub:'Native-Level Mastery',        type:'All Skills', img:ptImgUrl('mountain peak summit triumph sunrise')},
];

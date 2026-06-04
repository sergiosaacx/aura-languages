/* ===============================================================
   topic-data-011.js - Juego 11/350
   Tarjeta: 2/50 - AM, IS, ARE - Posicion 4/7
   Temas: To Be negativo - isn't / aren't (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: truefalse - translate - order - fix - scramble - mc - fill
   =============================================================== */

_registerGames(11, 'To Be Negativo · Isn't / Aren't', [

  /* Actividad 1 - truefalse */
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada oracion negativa con TO BE es correcta.',
    stmts:[
      { text:"'She isn't happy.' es correcto.", ans:true,  expl:'Correcto. isn\'t = is + not, va con he/she/it.' },
      { text:"'They isn't here.' es correcto.", ans:false, expl:'Falso. they es plural: They aren\'t here.' },
      { text:"'I'm not tired.' es correcto.",   ans:true,  expl:'Correcto. con I se dice I\'m not (no amn\'t).' },
      { text:"'I amn't ready.' es correcto.",   ans:false, expl:'Falso. amn\'t no existe. Se dice I\'m not ready.' }
    ]
  },

  /* Actividad 2 - translate */
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige la forma negativa correcta del verbo TO BE.',
    items:[
      { src:'El no es',       opts:['He not is','He isn\'t','He aren\'t','He amn\'t'],   correct:1 },
      { src:'Ellos no son',   opts:['They isn\'t','They aren\'t','They amn\'t','They not are'], correct:1 },
      { src:'Yo no soy',      opts:['I amn\'t','I isn\'t','I\'m not','I aren\'t'],        correct:2 },
      { src:'Ella no es',     opts:['She aren\'t','She isn\'t','She amn\'t','She not is'],correct:1 },
      { src:'Nosotros no somos',opts:['We isn\'t','We amn\'t','We aren\'t','We not are'],correct:2 },
      { src:'Eso no es',      opts:['It aren\'t','It amn\'t','It isn\'t','It not is'],    correct:2 }
    ]
  },

  /* Actividad 3 - order */
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto para formar la oracion negativa.',
    sents:[
      { words:['isn\'t','She','happy'],    ans:['She','isn\'t','happy'] },
      { words:['aren\'t','They','here'],   ans:['They','aren\'t','here'] },
      { words:['not','I\'m','tired'],      ans:['I\'m','not','tired'] }
    ]
  },

  /* Actividad 4 - fix */
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige la forma negativa correcta.',
    sents:[
      { words:['They','isn\'t','here','.'],   wi:1, correct:'aren\'t', choices:['aren\'t','isn\'t','amn\'t','not'] },
      { words:['He','aren\'t','tall','.'],    wi:1, correct:'isn\'t',  choices:['isn\'t','aren\'t','amn\'t','not'] },
      { words:['We','isn\'t','ready','.'],    wi:1, correct:'aren\'t', choices:['aren\'t','isn\'t','amn\'t','not'] }
    ]
  },

  /* Actividad 5 - scramble */
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma la palabra de la negacion (sin apostrofo).',
    words:[
      { scrambled:['O','N','T'],     ans:'NOT',  hint:'la palabra que niega' },
      { scrambled:['S','I'],         ans:'IS',   hint:'forma que se niega como isn\'t' },
      { scrambled:['R','A','E'],     ans:'ARE',  hint:'forma que se niega como aren\'t' },
      { scrambled:['M','A'],         ans:'AM',   hint:'forma que va con I (I am not)' }
    ]
  },

  /* Actividad 6 - mc */
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Cual es la negacion correcta para "they"?',
    opts:["isn't","aren't","amn't","not is"], correct:1
  },

  /* Actividad 7 - fill */
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca la forma negativa correcta de TO BE.',
    sents:[
      { pre:'She ',  ans:"isn't",  post:' at home.',  bank:["isn't","aren't","amn't","not"] },
      { pre:'They ', ans:"aren't", post:' ready.',    bank:["isn't","aren't","amn't","not"] },
      { pre:'It ',   ans:"isn't",  post:' cold.',     bank:["isn't","aren't","amn't","not"] },
      { pre:'We ',   ans:"aren't", post:' late.',     bank:["isn't","aren't","amn't","not"] }
    ]
  }

]);

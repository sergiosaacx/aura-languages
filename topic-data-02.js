/* ═══════════════════════════════════════════════════════════════
   topic-data-02.js — Tarjeta 2: AM, IS, ARE
   Temas: To Be afirmativo · To Be negativo · To Be preguntas
   Rango: Bronce A1 · Juegos globales: 8–14
   ═══════════════════════════════════════════════════════════════ */

_registerGames(2, [
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige la traduccion correcta al ingles.',
    items:[
      { src:'Yo soy',         opts:['I is','I am','I are','I be'],             correct:1 },
      { src:'Tu eres',        opts:['You is','You am','You are','You be'],      correct:2 },
      { src:'El es',          opts:['He are','He am','He is','He be'],          correct:2 },
      { src:'Ella es',        opts:['She am','She is','She are','She be'],      correct:1 },
      { src:'Nosotros somos', opts:['We is','We are','We am','We be'],          correct:1 },
      { src:'Ellos son',      opts:['They is','They am','They are','They be'],  correct:2 }
    ]
  },
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Que forma del verbo TO BE se usa con el pronombre "I"?',
    opts:['is','are','am','be'], correct:2
  },
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Lee cada afirmacion y decide si es verdadera o falsa.',
    stmts:[
      { text:"Con 'He' se usa la forma 'is'.",  ans:true,  expl:'Correcto. He, She e It siempre usan IS.' },
      { text:"Con 'They' se usa 'is'.",          ans:false, expl:'Falso. They usa ARE porque es plural.' },
      { text:"Con 'I' se usa 'am'.",             ans:true,  expl:'Correcto. El pronombre I siempre va con AM.' },
      { text:"Con 'We' se usa 'am'.",            ans:false, expl:'Falso. We es plural y usa ARE.' }
    ]
  },
  { id:'match', label:'Empareja', xp:30,
    instr:'Haz clic en una forma en ingles y luego en su traduccion.',
    pairs:[
      ['I am','Yo soy'],['You are','Tu eres'],
      ['He is','El es'],['She is','Ella es'],
      ['We are','Nosotros somos'],['They are','Ellos son']
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
    instr:'Toca las palabras en el orden correcto para formar la oracion.',
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
]);

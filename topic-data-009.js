/* ===============================================================
   topic-data-009.js - Juego 9/350
   Tarjeta: 2/50 - AM, IS, ARE - Posicion 2/7
   Temas: To Be afirmativo - regla de uso (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: mc - truefalse - fill - order - fix - scramble - translate
   =============================================================== */

_registerGames(9, 'To Be Afirmativo · Regla de Uso', [

  /* Actividad 1 - mc */
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Con que grupo de pronombres se usa la forma ARE?',
    opts:['I, he, she','you, we, they','he, she, it','solo I'], correct:1
  },

  /* Actividad 2 - truefalse */
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada regla del verbo TO BE es correcta.',
    stmts:[
      { text:'Con "I" se usa "am".',          ans:true,  expl:'Correcto. I siempre va con am.' },
      { text:'Con "they" se usa "is".',       ans:false, expl:'Falso. they es plural y usa are.' },
      { text:'Con "he", "she", "it" se usa "is".', ans:true, expl:'Correcto. La tercera persona singular usa is.' },
      { text:'Con "we" se usa "am".',         ans:false, expl:'Falso. we es plural y usa are.' }
    ]
  },

  /* Actividad 3 - fill */
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca la forma correcta de TO BE.',
    sents:[
      { pre:'She ',  ans:'is',  post:' happy.',   bank:['am','is','are','be'] },
      { pre:'We ',   ans:'are', post:' students.',bank:['am','is','are','be'] },
      { pre:'I ',    ans:'am',  post:' here.',    bank:['am','is','are','be'] },
      { pre:'It ',   ans:'is',  post:' a cat.',   bank:['am','is','are','be'] }
    ]
  },

  /* Actividad 4 - order */
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto para formar la oracion.',
    sents:[
      { words:['is','He','my','teacher'], ans:['He','is','my','teacher'] },
      { words:['are','They','at','home'], ans:['They','are','at','home'] },
      { words:['am','I','a','student'],   ans:['I','am','a','student'] }
    ]
  },

  /* Actividad 5 - fix */
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige la forma correcta de TO BE.',
    sents:[
      { words:['I','is','happy','.'],          wi:1, correct:'am',  choices:['am','is','are','be'] },
      { words:['She','are','my','friend','.'], wi:1, correct:'is',  choices:['is','am','are','be'] },
      { words:['We','is','students','.'],      wi:1, correct:'are', choices:['are','am','is','be'] }
    ]
  },

  /* Actividad 6 - scramble */
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma la palabra del verbo TO BE.',
    words:[
      { scrambled:['M','A'],     ans:'AM',  hint:'forma que va con I' },
      { scrambled:['S','I'],     ans:'IS',  hint:'forma que va con he/she/it' },
      { scrambled:['R','A','E'], ans:'ARE', hint:'forma que va con we/you/they' },
      { scrambled:['E','B'],     ans:'BE',  hint:'forma base del verbo' }
    ]
  },

  /* Actividad 7 - translate */
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige la forma correcta del verbo TO BE.',
    items:[
      { src:'Ella es',  opts:['She am','She is','She are','She be'],   correct:1 },
      { src:'Nosotros somos', opts:['We am','We is','We are','We be'], correct:2 },
      { src:'Yo soy',   opts:['I is','I are','I am','I be'],           correct:2 },
      { src:'Tu eres',  opts:['You am','You are','You is','You be'],   correct:1 },
      { src:'El es',    opts:['He are','He am','He is','He be'],       correct:2 },
      { src:'Ellos son',opts:['They is','They are','They am','They be'],correct:1 }
    ]
  }

]);

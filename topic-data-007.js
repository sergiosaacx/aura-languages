/* ===============================================================
   topic-data-007.js - Juego 7/350
   Tarjeta: 1/50 - THE IDENTITY CODE - Posicion 7/7
   Temas: Sujeto vs Objeto - errores tipicos (MEZCLADO)
   Rango: Bronce A1
   Tipos: mc - match - scramble - order - fix - truefalse - fill
   =============================================================== */

_registerGames(7, 'Sujeto vs Objeto · Errores Típicos', [

  /* Actividad 1 - mc */
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Cual oracion es correcta?',
    opts:['Her is my teacher.','She is my teacher.','Hers is my teacher.','Him is my teacher.'], correct:1
  },

  /* Actividad 2 - match */
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada oracion con error con su version corregida.',
    pairs:[
      ['Me am happy','I am happy'],
      ['Her is tall','She is tall'],
      ['Them are here','They are here'],
      ['Him is my friend','He is my friend'],
      ['Us are students','We are students'],
      ['I see she','I see her']
    ]
  },

  /* Actividad 3 - scramble */
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma el pronombre sujeto que corrige el error.',
    words:[
      { scrambled:['H','E','S'],     ans:'SHE',  hint:'corrige "Her is my teacher"' },
      { scrambled:['H','E','Y','T'], ans:'THEY', hint:'corrige "Them are my friends"' },
      { scrambled:['E','H'],         ans:'HE',   hint:'corrige "Him is my friend"' },
      { scrambled:['E','W'],         ans:'WE',   hint:'corrige "Us are students"' }
    ]
  },

  /* Actividad 4 - order */
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto para formar la oracion.',
    sents:[
      { words:['is','He','my','friend'], ans:['He','is','my','friend'] },
      { words:['are','They','here'],     ans:['They','are','here'] },
      { words:['see','I','her'],         ans:['I','see','her'] }
    ]
  },

  /* Actividad 5 - fix */
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige el pronombre correcto.',
    sents:[
      { words:['Her','is','my','teacher','.'],   wi:0, correct:'She',  choices:['She','Her','Hers','They'] },
      { words:['Me','am','happy','.'],           wi:0, correct:'I',    choices:['I','Me','My','We'] },
      { words:['Them','are','my','friends','.'], wi:0, correct:'They', choices:['They','Them','Their','Those'] }
    ]
  },

  /* Actividad 6 - truefalse */
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada oracion usa bien el pronombre.',
    stmts:[
      { text:'"She is my friend." es correcto.',      ans:true,  expl:'Correcto. She es sujeto.' },
      { text:'"Me am happy." es correcto.',           ans:false, expl:'Falso. El sujeto correcto es I: I am happy.' },
      { text:'"I can see them." es correcto.',         ans:true,  expl:'Correcto. them es objeto despues del verbo.' },
      { text:'"Them are my friends." es correcto.',    ans:false, expl:'Falso. El sujeto correcto es They.' }
    ]
  },

  /* Actividad 7 - fill */
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el pronombre correcto (evita el error indicado).',
    sents:[
      { pre:'', ans:'She',  post:' is my teacher. (no Her)',  bank:['She','Her','Hers','They'] },
      { pre:'', ans:'They', post:' are my friends. (no Them)',bank:['They','Them','Their','Those'] },
      { pre:'I help ', ans:'them', post:'. (no they)',        bank:['they','their','them','those'] },
      { pre:'', ans:'We',   post:' are students. (no Us)',    bank:['Us','We','Our','They'] }
    ]
  }

]);

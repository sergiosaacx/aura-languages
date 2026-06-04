/* ===============================================================
   topic-data-003.js - Juego 3/350
   Tarjeta: 1/50 - THE IDENTITY CODE - Posicion 3/7 en esta tarjeta
   Temas: Pronombres Objeto - reconocimiento (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: translate - match - scramble - truefalse - order - fill - fix
   =============================================================== */

_registerGames(3, 'Pronombres Objeto · Reconocimiento', [

  /* Actividad 1 - translate */
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige el pronombre objeto correcto en ingles.',
    items:[
      { src:'a mi',       opts:['I','me','my','mine'],          correct:1 },
      { src:'a el',       opts:['he','his','him','her'],        correct:2 },
      { src:'a ella',     opts:['she','her','hers','him'],      correct:1 },
      { src:'a nosotros', opts:['we','our','us','them'],        correct:2 },
      { src:'a ellos',    opts:['they','their','them','those'], correct:2 },
      { src:'a ti',       opts:['you','your','yours','they'],   correct:0 }
    ]
  },

  /* Actividad 2 - match */
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada pronombre sujeto con su pronombre objeto equivalente.',
    pairs:[
      ['I','me'],
      ['you','you'],
      ['he','him'],
      ['she','her'],
      ['we','us'],
      ['they','them']
    ]
  },

  /* Actividad 3 - scramble */
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Toca las letras en el orden correcto para formar el pronombre objeto.',
    words:[
      { scrambled:['S','U'],         ans:'US',   hint:'a nosotros' },
      { scrambled:['M','I','H'],     ans:'HIM',  hint:'a el' },
      { scrambled:['E','R','H'],     ans:'HER',  hint:'a ella' },
      { scrambled:['M','T','H','E'], ans:'THEM', hint:'a ellos' }
    ]
  },

  /* Actividad 4 - truefalse */
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada afirmacion sobre los pronombres objeto es correcta.',
    stmts:[
      { text:'"me" es el pronombre objeto de "I".',   ans:true,  expl:'Correcto. I (sujeto) se convierte en me (objeto).' },
      { text:'"him" es el pronombre objeto de "she".',ans:false, expl:'Falso. him corresponde a he. El objeto de she es her.' },
      { text:'"us" es el pronombre objeto de "we".',  ans:true,  expl:'Correcto. we (sujeto) se convierte en us (objeto).' },
      { text:'"they" es un pronombre objeto.',        ans:false, expl:'Falso. they es sujeto. Su pronombre objeto es them.' }
    ]
  },

  /* Actividad 5 - order */
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto para formar la oracion.',
    sents:[
      { words:['him','She','likes'], ans:['She','likes','him'] },
      { words:['us','They','help'],  ans:['They','help','us'] },
      { words:['her','I','see'],     ans:['I','see','her'] }
    ]
  },

  /* Actividad 6 - fill */
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el pronombre objeto correcto para llenar el espacio.',
    sents:[
      { pre:'Look at ',     ans:'me',   post:'.',            bank:['I','me','my','mine'] },
      { pre:'I know ',      ans:'him',  post:' well.',       bank:['he','his','him','her'] },
      { pre:'We visited ',  ans:'them', post:' yesterday.',  bank:['they','their','them','those'] },
      { pre:'Give it to ',  ans:'her',  post:'.',            bank:['she','her','hers','he'] }
    ]
  },

  /* Actividad 7 - fix */
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige el pronombre objeto correcto.',
    sents:[
      { words:['Call','I','tonight','.'], wi:1, correct:'me',   choices:['me','I','my','mine'] },
      { words:['I','see','they','.'],     wi:2, correct:'them', choices:['them','they','their','those'] },
      { words:['Help','we','please','.'], wi:1, correct:'us',   choices:['us','we','our','they'] }
    ]
  }

]);

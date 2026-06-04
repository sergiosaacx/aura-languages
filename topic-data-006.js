/* ===============================================================
   topic-data-006.js - Juego 6/350
   Tarjeta: 1/50 - THE IDENTITY CODE - Posicion 6/7
   Temas: Pronombres Objeto - en contexto (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: translate - truefalse - listen - sort - transform - fill - dialogue
   =============================================================== */

_registerGames(6, 'Pronombres Objeto · En Contexto', [

  /* Actividad 1 - translate */
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige el pronombre objeto correcto en ingles.',
    items:[
      { src:'a mi',       opts:['I','me','my','mine'],          correct:1 },
      { src:'a nosotros', opts:['we','our','us','them'],        correct:2 },
      { src:'a el',       opts:['he','his','him','her'],        correct:2 },
      { src:'a ella',     opts:['she','her','hers','him'],      correct:1 },
      { src:'a ellos',    opts:['they','their','them','those'], correct:2 },
      { src:'a ti',       opts:['you','your','yours','they'],   correct:0 }
    ]
  },

  /* Actividad 2 - truefalse */
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada oracion usa bien el pronombre objeto.',
    stmts:[
      { text:'"Please help me." es correcto.',  ans:true,  expl:'Correcto. me es objeto despues del verbo help.' },
      { text:'"I can see he." es correcto.',     ans:false, expl:'Falso. Despues del verbo va him: I can see him.' },
      { text:'"Call us tonight." es correcto.',  ans:true,  expl:'Correcto. us es el pronombre objeto.' },
      { text:'"She knows they." es correcto.',   ans:false, expl:'Falso. Despues del verbo va them: She knows them.' }
    ]
  },

  /* Actividad 3 - listen */
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'Help me, please.', type:'select', opts:['Help me, please.','Help him, please.','Help us, please.','Help her, please.'], correct:0 },
      { tts:'I see her.',       type:'select', opts:['I see her.','I see him.','I see them.','I see us.'],                           correct:0 },
      { tts:'They call us.',    type:'select', opts:['They call us.','They call them.','They call him.','They call me.'],            correct:0 }
    ]
  },

  /* Actividad 4 - sort */
  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada pronombre objeto como singular o plural.',
    categories:['Objeto singular','Objeto plural'],
    items:[
      { text:'me',   correct:0 },
      { text:'him',  correct:0 },
      { text:'her',  correct:0 },
      { text:'it',   correct:0 },
      { text:'us',   correct:1 },
      { text:'them', correct:1 }
    ]
  },

  /* Actividad 5 - transform */
  { id:'transform', label:'Transforma', xp:35,
    instr:'Reemplaza el nombre por el pronombre objeto correcto.',
    transforms:[
      { original:'I help Tom.',          task:'Usa pronombre objeto', opts:['I help him.','I help he.','I help his.','I help them.'],         correct:0 },
      { original:'She calls Ana.',       task:'Usa pronombre objeto', opts:['She calls her.','She calls she.','She calls hers.','She calls him.'], correct:0 },
      { original:'We visit our friends.',task:'Usa pronombre objeto', opts:['We visit them.','We visit they.','We visit their.','We visit us.'], correct:0 },
      { original:'Listen to me and Ana.',task:'Usa pronombre objeto', opts:['Listen to us.','Listen to we.','Listen to them.','Listen to our.'], correct:0 }
    ]
  },

  /* Actividad 6 - fill */
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el pronombre objeto correcto para llenar el espacio.',
    sents:[
      { pre:'Please help ', ans:'me',  post:', I am lost.',   bank:['I','me','my','mine'] },
      { pre:'Can you call ',ans:'him', post:' later?',        bank:['he','his','him','her'] },
      { pre:'I will visit ',ans:'her', post:' tomorrow.',     bank:['she','her','hers','he'] },
      { pre:'They invited ',ans:'us',  post:' to dinner.',    bank:['we','our','us','them'] }
    ]
  },

  /* Actividad 7 - dialogue */
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo eligiendo el pronombre objeto correcto.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Do you need help?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, please help me.','Yes, please help I.','Yes, please help my.','Yes, please help mine.'], correct:0 },
      { speaker:0, text:'Should I call your brother?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, call him.','Yes, call he.','Yes, call his.','Yes, call them.'], correct:0 },
      { speaker:0, text:'Okay!', blank:false }
    ]
  }

]);

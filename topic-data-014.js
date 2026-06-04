/* ===============================================================
   topic-data-014.js - Juego 14/350
   Tarjeta: 2/50 - AM, IS, ARE - Posicion 7/7
   Temas: To Be - errores tipicos de los 3 usos (MEZCLADO)
   Rango: Bronce A1
   Tipos: match - order - fix - sort - listen - mc - truefalse
   =============================================================== */

_registerGames(14, 'To Be · Errores Típicos', [

  /* Actividad 1 - match */
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada oracion con error con su version corregida.',
    pairs:[
      ['I is happy','I am happy'],
      ['She are tall','She is tall'],
      ['They am here','They are here'],
      ['He are busy','He is busy'],
      ['We is ready','We are ready'],
      ['You is kind','You are kind']
    ]
  },

  /* Actividad 2 - order */
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto para formar la oracion.',
    sents:[
      { words:['is','She','my','friend'], ans:['She','is','my','friend'] },
      { words:['are','they','Where'],     ans:['Where','are','they'] },
      { words:['not','He','is','tall'],   ans:['He','is','not','tall'] }
    ]
  },

  /* Actividad 3 - fix */
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige la forma correcta de TO BE.',
    sents:[
      { words:['I','is','happy','.'],          wi:1, correct:'am',  choices:['am','is','are','be'] },
      { words:['She','are','my','friend','.'], wi:1, correct:'is',  choices:['is','am','are','be'] },
      { words:['They','am','not','here','.'],  wi:1, correct:'are', choices:['are','am','is','be'] }
    ]
  },

  /* Actividad 4 - sort */
  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada oracion como correcta o incorrecta.',
    categories:['Correcta','Incorrecta'],
    items:[
      { text:'I am happy',   correct:0 },
      { text:'He are tall',  correct:1 },
      { text:'They are here', correct:0 },
      { text:'She am nice',  correct:1 },
      { text:'We are ready', correct:0 },
      { text:'I is late',    correct:1 }
    ]
  },

  /* Actividad 5 - listen */
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion correcta que oyes.',
    items:[
      { tts:'She is my friend.',   type:'select', opts:['She is my friend.','She are my friend.','She am my friend.','She be my friend.'], correct:0 },
      { tts:'They are not here.',  type:'select', opts:['They are not here.','They is not here.','They am not here.','They be not here.'], correct:0 },
      { tts:'I am happy.',         type:'select', opts:['I am happy.','I is happy.','I are happy.','I be happy.'],                         correct:0 }
    ]
  },

  /* Actividad 6 - mc */
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Cual oracion es correcta?',
    opts:['She are my friend.','She is my friend.','She am my friend.','She be my friend.'], correct:1
  },

  /* Actividad 7 - truefalse */
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada oracion usa bien el verbo TO BE.',
    stmts:[
      { text:'"I is happy." es correcto.',         ans:false, expl:'Falso. Con I se usa am: I am happy.' },
      { text:'"They are here." es correcto.',       ans:true,  expl:'Correcto. they + are.' },
      { text:'"She are my friend." es correcto.',   ans:false, expl:'Falso. Con she se usa is: She is my friend.' },
      { text:'"We are ready." es correcto.',        ans:true,  expl:'Correcto. we + are.' }
    ]
  }

]);

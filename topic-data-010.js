/* ===============================================================
   topic-data-010.js - Juego 10/350
   Tarjeta: 2/50 - AM, IS, ARE - Posicion 3/7
   Temas: To Be afirmativo - asociacion pronombre-verbo (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: match - listen - sort - transform - dialogue - mc - fill
   =============================================================== */

_registerGames(10, 'To Be Afirmativo · Pronombre-Verbo', [

  /* Actividad 1 - match */
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada pronombre con su oracion correcta del verbo TO BE.',
    pairs:[
      ['I','I am late'],
      ['You','You are early'],
      ['He','He is busy'],
      ['It','It is cold'],
      ['We','We are ready'],
      ['They','They are tired']
    ]
  },

  /* Actividad 2 - listen */
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'You are early.', type:'select', opts:['You are early.','You is early.','You am early.','You be early.'],         correct:0 },
      { tts:'He is busy.',    type:'select', opts:['He is busy.','He are busy.','He am busy.','He be busy.'],                  correct:0 },
      { tts:'We are ready.',  type:'select', opts:['We are ready.','We is ready.','We am ready.','We be ready.'],             correct:0 }
    ]
  },

  /* Actividad 3 - sort */
  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada pronombre segun la forma de TO BE que usa.',
    categories:['usa AM','usa IS','usa ARE'],
    items:[
      { text:'I',    correct:0 },
      { text:'he',   correct:1 },
      { text:'it',   correct:1 },
      { text:'you',  correct:2 },
      { text:'we',   correct:2 },
      { text:'they', correct:2 }
    ]
  },

  /* Actividad 4 - transform */
  { id:'transform', label:'Transforma', xp:35,
    instr:'Elige la oracion donde el pronombre y la forma de TO BE coinciden.',
    transforms:[
      { original:'pronombre: She', task:'Une con su forma', opts:['She is nice.','She are nice.','She am nice.','She be nice.'], correct:0 },
      { original:'pronombre: They',task:'Une con su forma', opts:['They are nice.','They is nice.','They am nice.','They be nice.'], correct:0 },
      { original:'pronombre: I',   task:'Une con su forma', opts:['I am nice.','I is nice.','I are nice.','I be nice.'],         correct:0 },
      { original:'pronombre: He',  task:'Une con su forma', opts:['He is nice.','He are nice.','He am nice.','He be nice.'],     correct:0 }
    ]
  },

  /* Actividad 5 - dialogue */
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo con la forma correcta de TO BE.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Where is Sara?', blank:false },
      { speaker:1, text:null, blank:true, opts:['She is at home.','She are at home.','She am at home.','She be at home.'], correct:0 },
      { speaker:0, text:'And the children?', blank:false },
      { speaker:1, text:null, blank:true, opts:['They are at school.','They is at school.','They am at school.','They be at school.'], correct:0 },
      { speaker:0, text:'Perfect.', blank:false }
    ]
  },

  /* Actividad 6 - mc */
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Que forma de TO BE va con el pronombre "it"?',
    opts:['am','is','are','be'], correct:1
  },

  /* Actividad 7 - fill */
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca la forma de TO BE que corresponde al pronombre.',
    sents:[
      { pre:'You ', ans:'are', post:' my friend.', bank:['am','is','are','be'] },
      { pre:'He ',  ans:'is',  post:' my brother.',bank:['am','is','are','be'] },
      { pre:'I ',   ans:'am',  post:' ready.',     bank:['am','is','are','be'] },
      { pre:'They ',ans:'are', post:' here.',      bank:['am','is','are','be'] }
    ]
  }

]);

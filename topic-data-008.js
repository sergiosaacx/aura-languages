/* ===============================================================
   topic-data-008.js - Juego 8/350
   Tarjeta: 2/50 - AM, IS, ARE - Posicion 1/7
   Temas: To Be afirmativo - conjugacion (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: translate - mc - match - listen - sort - transform - dialogue
   =============================================================== */

_registerGames(8, 'To Be Afirmativo · Conjugación', [

  /* Actividad 1 - translate */
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige la forma correcta del verbo TO BE.',
    items:[
      { src:'Yo soy',        opts:['I is','I are','I am','I be'],            correct:2 },
      { src:'El es',         opts:['He are','He am','He is','He be'],        correct:2 },
      { src:'Ellos son',     opts:['They is','They are','They am','They be'],correct:1 },
      { src:'Nosotros somos',opts:['We am','We is','We are','We be'],        correct:2 },
      { src:'Ella es',       opts:['She is','She are','She am','She be'],    correct:0 },
      { src:'Tu eres',       opts:['You am','You are','You is','You be'],    correct:1 }
    ]
  },

  /* Actividad 2 - mc */
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Cual es la forma correcta del verbo TO BE con el pronombre I?',
    opts:['I is','I are','I am','I be'], correct:2
  },

  /* Actividad 3 - match */
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada pronombre con su oracion afirmativa correcta.',
    pairs:[
      ['I','I am ready'],
      ['You','You are tall'],
      ['He','He is here'],
      ['She','She is kind'],
      ['We','We are happy'],
      ['They','They are friends']
    ]
  },

  /* Actividad 4 - listen */
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I am happy.',     type:'select', opts:['I am happy.','I is happy.','I are happy.','I be happy.'],         correct:0 },
      { tts:'She is tall.',    type:'select', opts:['She is tall.','She are tall.','She am tall.','She be tall.'],     correct:0 },
      { tts:'They are here.',  type:'select', opts:['They are here.','They is here.','They am here.','They be here.'], correct:0 }
    ]
  },

  /* Actividad 5 - sort */
  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada pronombre segun la forma de TO BE que usa.',
    categories:['usa AM','usa IS','usa ARE'],
    items:[
      { text:'I',    correct:0 },
      { text:'he',   correct:1 },
      { text:'she',  correct:1 },
      { text:'it',   correct:1 },
      { text:'you',  correct:2 },
      { text:'we',   correct:2 },
      { text:'they', correct:2 }
    ]
  },

  /* Actividad 6 - transform */
  { id:'transform', label:'Transforma', xp:35,
    instr:'Corrige cada oracion a su forma afirmativa correcta.',
    transforms:[
      { original:'I is happy.',     task:'Forma correcta', opts:['I am happy.','I are happy.','I be happy.','I happy am.'],       correct:0 },
      { original:'He are tall.',    task:'Forma correcta', opts:['He is tall.','He am tall.','He are tall.','He be tall.'],       correct:0 },
      { original:'They am here.',   task:'Forma correcta', opts:['They are here.','They is here.','They am here.','They be here.'],correct:0 },
      { original:'We is friends.',  task:'Forma correcta', opts:['We are friends.','We am friends.','We is friends.','We be friends.'], correct:0 }
    ]
  },

  /* Actividad 7 - dialogue */
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo con la forma correcta de TO BE.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'How are you?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I am fine.','I is fine.','I are fine.','I be fine.'], correct:0 },
      { speaker:0, text:'And your brothers?', blank:false },
      { speaker:1, text:null, blank:true, opts:['They are great.','They is great.','They am great.','They be great.'], correct:0 },
      { speaker:0, text:'Good to hear!', blank:false }
    ]
  }

]);

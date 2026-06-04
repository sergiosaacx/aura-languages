/* ===============================================================
   topic-data-012.js - Juego 12/350
   Tarjeta: 2/50 - AM, IS, ARE - Posicion 5/7
   Temas: To Be afirmativo y negativo - estructura (MEZCLADO)
   Rango: Bronce A1
   Tipos: match - listen - sort - transform - dialogue - order - fix
   =============================================================== */

_registerGames(12, 'To Be Afirmativo y Negativo · Estructura', [

  /* Actividad 1 - match */
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada oracion afirmativa con su forma negativa.',
    pairs:[
      ['I am happy',"I am not happy"],
      ['She is here',"She isn't here"],
      ['They are ready',"They aren't ready"],
      ['He is tall',"He isn't tall"],
      ['We are late',"We aren't late"],
      ['You are early',"You aren't early"]
    ]
  },

  /* Actividad 2 - listen */
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'She is not my teacher.', type:'select', opts:["She is not my teacher.","She is my teacher.","She are not my teacher.","She not is my teacher."], correct:0 },
      { tts:'We are at home.',        type:'select', opts:["We are at home.","We aren't at home.","We is at home.","We are at school."],                   correct:0 },
      { tts:'I am not happy.',        type:'select', opts:["I am not happy.","I am happy.","I is not happy.","I are not happy."],                          correct:0 }
    ]
  },

  /* Actividad 3 - sort */
  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada oracion como afirmativa o negativa.',
    categories:['Afirmativa','Negativa'],
    items:[
      { text:'I am ready',     correct:0 },
      { text:"She isn't here", correct:1 },
      { text:'We are late',    correct:0 },
      { text:"They aren't ready", correct:1 },
      { text:'He is tall',     correct:0 },
      { text:"It isn't cold",  correct:1 }
    ]
  },

  /* Actividad 4 - transform */
  { id:'transform', label:'Transforma', xp:35,
    instr:'Convierte cada oracion a su forma negativa.',
    transforms:[
      { original:'She is my teacher.', task:'Forma negativa', opts:["She isn't my teacher.","She is not teacher.","She aren't my teacher.","Is she my teacher?"], correct:0 },
      { original:'They are at home.',  task:'Forma negativa', opts:["They aren't at home.","They isn't at home.","They not are at home.","Are they at home?"],   correct:0 },
      { original:'I am happy.',        task:'Forma negativa', opts:["I'm not happy.","I amn't happy.","I not am happy.","Am I happy?"],                          correct:0 },
      { original:'He is tall.',        task:'Forma negativa', opts:["He isn't tall.","He aren't tall.","He not is tall.","Is he tall?"],                         correct:0 }
    ]
  },

  /* Actividad 5 - dialogue */
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo con la forma correcta de TO BE.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Are you tired?', blank:false },
      { speaker:1, text:null, blank:true, opts:["No, I'm not tired.","No, I amn't tired.","No, I not tired.","No, I aren't tired."], correct:0 },
      { speaker:0, text:'Is your sister home?', blank:false },
      { speaker:1, text:null, blank:true, opts:["No, she isn't home.","No, she aren't home.","No, she not home.","No, she amn't home."], correct:0 },
      { speaker:0, text:'Okay.', blank:false }
    ]
  },

  /* Actividad 6 - order */
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto para formar la oracion.',
    sents:[
      { words:['is','She','not','my','teacher'], ans:['She','is','not','my','teacher'] },
      { words:['are','We','at','home'],          ans:['We','are','at','home'] },
      { words:['not','I','am','happy'],          ans:['I','am','not','happy'] }
    ]
  },

  /* Actividad 7 - fix */
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige la forma correcta.',
    sents:[
      { words:['He',"aren't",'tall','.'],       wi:1, correct:"isn't",  choices:["isn't","aren't","amn't","not"] },
      { words:['They',"isn't",'ready','.'],     wi:1, correct:"aren't", choices:["aren't","isn't","amn't","not"] },
      { words:['She','are','not','here','.'],   wi:1, correct:'is',     choices:['is','are','am','be'] }
    ]
  }

]);

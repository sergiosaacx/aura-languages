/* ===============================================================
   topic-data-019.js - Juego 19/350
   Tarjeta: 3/50 - NAME THE WORLD - Posicion 5/7
   Temas: There is / There are - estructura (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: mc - match - sort - transform - dialogue - order - fill
   =============================================================== */

_registerGames(19, 'There is / There are · Estructura', [

  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Que usas con un sustantivo plural?',
    opts:['There is','There are','There be','There am'], correct:1
  },

  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada grupo de palabras con su oracion correcta.',
    pairs:[
      ['a book','There is a book'],
      ['three apples','There are three apples'],
      ['no water','There is no water'],
      ['two dogs','There are two dogs'],
      ['one chair','There is one chair'],
      ['many people','There are many people']
    ]
  },

  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada grupo segun si usa There is o There are.',
    categories:['There is (singular)','There are (plural)'],
    items:[
      { text:'a book',    correct:0 },
      { text:'three cats',correct:1 },
      { text:'water',     correct:0 },
      { text:'two dogs',  correct:1 },
      { text:'one apple', correct:0 },
      { text:'many cars', correct:1 }
    ]
  },

  { id:'transform', label:'Transforma', xp:35,
    instr:'Convierte cada oracion al plural indicado.',
    transforms:[
      { original:'There is a book.',  task:'Plural (3)', opts:['There are three books.','There is three books.','There are a books.','There be three books.'], correct:0 },
      { original:'There is a cat.',   task:'Plural (2)', opts:['There are two cats.','There is two cats.','There are a cats.','There be two cats.'],          correct:0 },
      { original:'There is an apple.',task:'Plural (4)', opts:['There are four apples.','There is four apples.','There are an apples.','There be four apples.'],correct:0 },
      { original:'There is a dog.',   task:'Plural (5)', opts:['There are five dogs.','There is five dogs.','There are a dogs.','There be five dogs.'],        correct:0 }
    ]
  },

  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo con There is o There are.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What is in the box?', blank:false },
      { speaker:1, text:null, blank:true, opts:['There is a ball.','There are a ball.','There is two ball.','There be a ball.'], correct:0 },
      { speaker:0, text:'And on the table?', blank:false },
      { speaker:1, text:null, blank:true, opts:['There are three books.','There is three books.','There are a books.','There be three books.'], correct:0 },
      { speaker:0, text:'Great.', blank:false }
    ]
  },

  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto para formar la oracion.',
    sents:[
      { words:['is','There','a','book'],        ans:['There','is','a','book'] },
      { words:['are','There','three','apples'], ans:['There','are','three','apples'] },
      { words:['is','There','no','water'],      ans:['There','is','no','water'] }
    ]
  },

  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca There is o There are segun corresponda.',
    sents:[
      { pre:'', ans:'There is',  post:' a dog outside.', bank:['There is','There are','There be','There am'] },
      { pre:'', ans:'There are', post:' five books.',    bank:['There is','There are','There be','There am'] },
      { pre:'', ans:'There is',  post:' no milk.',       bank:['There is','There are','There be','There am'] },
      { pre:'', ans:'There are', post:' two cats.',      bank:['There is','There are','There be','There am'] }
    ]
  }

]);

/* ===============================================================
   topic-data-023.js - Juego 23/350
   Tarjeta: 4/50 - A OR THE? - Posicion 2/7
   Temas: a/an vs the - primera mencion vs referencia conocida (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: mc - order - fix - sort - transform - dialogue - fill
   =============================================================== */

_registerGames(23, 'A/An vs The · Primera Mencion', [

  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'There is ___ cat in the garden. ___ cat is black. Como se completan?',
    opts:['the / A','a / The','an / A','the / The'], correct:1
  },

  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto para formar la oracion.',
    sents:[
      { words:['a','I','have','dog'],   ans:['I','have','a','dog'] },
      { words:['sun','The','is','hot'], ans:['The','sun','is','hot'] },
      { words:['an','She','has','apple'],ans:['She','has','an','apple'] }
    ]
  },

  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca el articulo incorrecto y elige el correcto.',
    sents:[
      { words:['I','see','a','sun','.'],               wi:2, correct:'the', choices:['the','a','an','one'] },
      { words:['There','is','the','cat','outside','.'],wi:2, correct:'a',   choices:['a','an','the','one'] },
      { words:['She','has','a','umbrella','.'],         wi:2, correct:'an',  choices:['an','a','the','one'] }
    ]
  },

  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada frase segun el articulo que necesita.',
    categories:['Primera mencion (a/an)','Conocido o unico (the)'],
    items:[
      { text:'a new car',     correct:0 },
      { text:'the sun',       correct:1 },
      { text:'an idea',       correct:0 },
      { text:'the moon',      correct:1 },
      { text:'a dog',         correct:0 },
      { text:'the president', correct:1 }
    ]
  },

  { id:'transform', label:'Transforma', xp:35,
    instr:'Elige la segunda mencion correcta (con the).',
    transforms:[
      { original:'I have a dog. (segunda mencion)',     task:'Elige el articulo', opts:['The dog is big.','A dog is big.','An dog is big.','One dog is big.'],     correct:0 },
      { original:'She bought an apple. (segunda mencion)',task:'Elige el articulo', opts:['The apple is red.','A apple is red.','An apple is red.','One apple is red.'], correct:0 },
      { original:'There is a car. (segunda mencion)',   task:'Elige el articulo', opts:['The car is fast.','A car is fast.','An car is fast.','Car is fast.'],       correct:0 },
      { original:'Primera mencion de un libro nuevo',   task:'Elige el articulo', opts:['I read a book.','I read the book.','I read an book.','I read book.'],       correct:0 }
    ]
  },

  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo con el articulo correcto.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'I saw a dog today.', blank:false },
      { speaker:1, text:null, blank:true, opts:['Was the dog big?','Was a dog big?','Was an dog big?','Was dog big?'], correct:0 },
      { speaker:0, text:'Yes! And I saw a cat too.', blank:false },
      { speaker:1, text:null, blank:true, opts:['What color was the cat?','What color was a cat?','What color was an cat?','What color was cat?'], correct:0 },
      { speaker:0, text:'Black.', blank:false }
    ]
  },

  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el articulo correcto (a / an / the).',
    sents:[
      { pre:'I have ', ans:'a',  post:' new phone.',  bank:['a','an','the','one'] },
      { pre:'',        ans:'The',post:' sun is bright.',bank:['A','An','The','One'] },
      { pre:'She ate ',ans:'an', post:' orange.',     bank:['a','an','the','one'] },
      { pre:'Close ',  ans:'the',post:' door, please.',bank:['a','an','the','one'] }
    ]
  }

]);

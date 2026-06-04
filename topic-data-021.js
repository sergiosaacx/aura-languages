/* ===============================================================
   topic-data-021.js - Juego 21/350
   Tarjeta: 3/50 - NAME THE WORLD - Posicion 7/7
   Temas: Errores tipicos de los 3 temas (MEZCLADO)
   Rango: Bronce A1
   Tipos: match - order - sort - transform - dialogue - fix - mc
   =============================================================== */

_registerGames(21, 'Sustantivos y Demostrativos · Errores', [

  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada oracion con error con su version corregida.',
    pairs:[
      ['These is my book','This is my book'],
      ['There are a dog','There is a dog'],
      ['Those chair is red','That chair is red'],
      ['This are my pens','These are my pens'],
      ['Two childs','Two children'],
      ['There is many cars','There are many cars']
    ]
  },

  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto para formar la oracion.',
    sents:[
      { words:['is','This','my','book'],   ans:['This','is','my','book'] },
      { words:['are','There','two','dogs'],ans:['There','are','two','dogs'] },
      { words:['are','These','my','pens'], ans:['These','are','my','pens'] }
    ]
  },

  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada oracion como correcta o incorrecta.',
    categories:['Correcta','Incorrecta'],
    items:[
      { text:'This is my book',     correct:0 },
      { text:'These is my book',    correct:1 },
      { text:'There are two cats',  correct:0 },
      { text:'There are a dog',     correct:1 },
      { text:'Two children',        correct:0 },
      { text:'Two childs',          correct:1 }
    ]
  },

  { id:'transform', label:'Transforma', xp:35,
    instr:'Corrige cada oracion a su forma correcta.',
    transforms:[
      { original:'These is my book.',     task:'Forma correcta', opts:['This is my book.','These are book.','That is my books.','Those is my book.'], correct:0 },
      { original:'There are a dog.',      task:'Forma correcta', opts:['There is a dog.','There are a dogs.','There be a dog.','There is dogs.'],     correct:0 },
      { original:'Those chair is red.',   task:'Forma correcta', opts:['That chair is red.','Those chairs is red.','This chairs is red.','That chairs is red.'], correct:0 },
      { original:'Two childs are here.',  task:'Forma correcta', opts:['Two children are here.','Two childrens are here.','Two child are here.','Two childes are here.'], correct:0 }
    ]
  },

  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo eligiendo la correccion correcta.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Is "These is my pen" correct?', blank:false },
      { speaker:1, text:null, blank:true, opts:['No, it is "This is my pen".','No, it is "These is my pens".','Yes, it is correct.','No, it is "That are my pen".'], correct:0 },
      { speaker:0, text:'And "There are a cat"?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It should be "There is a cat".','It is correct.','It should be "There are a cats".','It should be "There be a cat".'], correct:0 },
      { speaker:0, text:'Thanks!', blank:false }
    ]
  },

  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['These','is','my','book','.'],   wi:0, correct:'This', choices:['This','That','Those','It'] },
      { words:['There','are','a','dog','.'],    wi:1, correct:'is',   choices:['is','are','be','am'] },
      { words:['Those','chair','is','red','.'], wi:0, correct:'That', choices:['That','These','This','Them'] }
    ]
  },

  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Cual oracion es correcta?',
    opts:['These is my book.','This is my book.','This are my book.','These is my books.'], correct:1
  }

]);

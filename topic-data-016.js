/* ===============================================================
   topic-data-016.js - Juego 16/350
   Tarjeta: 3/50 - NAME THE WORLD - Posicion 2/7
   Temas: This/That/These/Those - regla de uso (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: mc - truefalse - sort - listen - order - fill - fix
   =============================================================== */

_registerGames(16, 'Demostrativos · Regla de Uso', [

  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Senalas varios objetos que estan cerca de ti. Que demostrativo usas?',
    opts:['this','that','these','those'], correct:2
  },

  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada regla de los demostrativos es correcta.',
    stmts:[
      { text:'"This" se usa para algo cercano y singular.', ans:true,  expl:'Correcto. this = cerca + singular.' },
      { text:'"Those" se usa para algo cercano y plural.',  ans:false, expl:'Falso. those = lejos + plural. Cerca plural es these.' },
      { text:'"That" se usa para algo lejano y singular.',  ans:true,  expl:'Correcto. that = lejos + singular.' },
      { text:'"These" se usa para una sola cosa.',          ans:false, expl:'Falso. these es plural.' }
    ]
  },

  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada demostrativo como singular o plural.',
    categories:['Singular','Plural'],
    items:[
      { text:'this',  correct:0 },
      { text:'that',  correct:0 },
      { text:'these', correct:1 },
      { text:'those', correct:1 }
    ]
  },

  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'This is my book.',   type:'select', opts:['This is my book.','These are my books.','That is my book.','Those are my books.'], correct:0 },
      { tts:'Those are my shoes.',type:'select', opts:['Those are my shoes.','These are my shoes.','That is my shoe.','This is my shoe.'],  correct:0 },
      { tts:'That is a car.',     type:'select', opts:['That is a car.','This is a car.','Those are cars.','These are cars.'],               correct:0 }
    ]
  },

  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto para formar la oracion.',
    sents:[
      { words:['is','This','my','pen'],     ans:['This','is','my','pen'] },
      { words:['are','These','my','books'], ans:['These','are','my','books'] },
      { words:['is','That','a','car'],      ans:['That','is','a','car'] }
    ]
  },

  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el demostrativo correcto segun la distancia y el numero.',
    sents:[
      { pre:'', ans:'This',  post:' is my pen. (cerca, singular)',    bank:['This','That','These','Those'] },
      { pre:'', ans:'These', post:' are my shoes. (cerca, plural)',   bank:['This','That','These','Those'] },
      { pre:'', ans:'That',  post:' is a bird. (lejos, singular)',    bank:['This','That','These','Those'] },
      { pre:'', ans:'Those', post:' are my friends. (lejos, plural)', bank:['This','That','These','Those'] }
    ]
  },

  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige el demostrativo correcto.',
    sents:[
      { words:['This','are','my','books','.'], wi:0, correct:'These', choices:['These','This','That','It'] },
      { words:['Those','is','my','pen','.'],   wi:0, correct:'That',  choices:['That','Those','These','This'] },
      { words:['These','is','a','dog','.'],    wi:0, correct:'This',  choices:['This','These','Those','That'] }
    ]
  }

]);

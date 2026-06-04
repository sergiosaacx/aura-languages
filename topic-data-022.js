/* ===============================================================
   topic-data-022.js - Juego 22/350
   Tarjeta: 4/50 - A OR THE? - Posicion 1/7
   Temas: a vs an - regla fonetica (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: translate - mc - match - fill - scramble - truefalse - listen
   =============================================================== */

_registerGames(22, 'A vs An · Regla Fonetica', [

  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige el articulo correcto (a o an).',
    items:[
      { src:'una manzana', opts:['a apple','an apple','the apple','one apple'],    correct:1 },
      { src:'un libro',    opts:['an book','a book','the book','one book'],        correct:1 },
      { src:'una hora',    opts:['a hour','an hour','the hour','one hour'],        correct:1 },
      { src:'un huevo',    opts:['a egg','an egg','the egg','one egg'],            correct:1 },
      { src:'un carro',    opts:['an car','a car','the car','one car'],            correct:1 },
      { src:'una naranja', opts:['a orange','an orange','the orange','one orange'],correct:1 }
    ]
  },

  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Que articulo va antes de la palabra "apple"?',
    opts:['a','an','the','one'], correct:1
  },

  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada sustantivo con su forma correcta de articulo.',
    pairs:[
      ['apple','an apple'],
      ['book','a book'],
      ['hour','an hour'],
      ['car','a car'],
      ['egg','an egg'],
      ['dog','a dog']
    ]
  },

  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca a o an segun el sonido de la palabra.',
    sents:[
      { pre:'I have ',  ans:'an', post:' apple.', bank:['a','an','the','one'] },
      { pre:'She reads ',ans:'a', post:' book.',  bank:['a','an','the','one'] },
      { pre:'Wait ',    ans:'an', post:' hour.',  bank:['a','an','the','one'] },
      { pre:'He has ',  ans:'a',  post:' dog.',   bank:['a','an','the','one'] }
    ]
  },

  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma la palabra y recuerda si lleva a o an.',
    words:[
      { scrambled:['P','A','L','P','E'], ans:'APPLE', hint:'lleva an (vocal)' },
      { scrambled:['R','U','O','H'],     ans:'HOUR',  hint:'lleva an (h muda)' },
      { scrambled:['O','K','B','O'],     ans:'BOOK',  hint:'lleva a (consonante)' },
      { scrambled:['G','E','G'],         ans:'EGG',   hint:'lleva an (vocal)' }
    ]
  },

  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada uso de a/an es correcto.',
    stmts:[
      { text:'Se dice "an apple".', ans:true,  expl:'Correcto. apple empieza con vocal -> an.' },
      { text:'Se dice "an book".',  ans:false, expl:'Falso. book empieza con consonante -> a book.' },
      { text:'Se dice "an hour".',  ans:true,  expl:'Correcto. la h de hour es muda, suena vocal -> an.' },
      { text:'Se dice "a egg".',    ans:false, expl:'Falso. egg empieza con vocal -> an egg.' }
    ]
  },

  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I have an apple.', type:'select', opts:['I have an apple.','I have a apple.','I have an apples.','I have the apple.'], correct:0 },
      { tts:'She reads a book.',type:'select', opts:['She reads a book.','She reads an book.','She reads a books.','She reads an books.'], correct:0 },
      { tts:'Wait an hour.',    type:'select', opts:['Wait an hour.','Wait a hour.','Wait an hours.','Wait the hour.'], correct:0 }
    ]
  }

]);

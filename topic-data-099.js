/* topic-data-099.js - Juego 99/350 | T15 1/7 HOW MUCH? | contables vs incontables (ESPECIALIZADO) | Plata A2 */
_registerGames(99, 'Contables vs Incontables', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Identifica si cada sustantivo es contable o incontable.',
    items:[
      { src:'water (agua)', opts:['contable','incontable','plural','articulo'], correct:1 },
      { src:'apple (manzana)', opts:['contable','incontable','plural','articulo'], correct:0 },
      { src:'money (dinero)', opts:['contable','incontable','plural','articulo'], correct:1 },
      { src:'book (libro)', opts:['contable','incontable','plural','articulo'], correct:0 },
      { src:'information', opts:['contable','incontable','plural','articulo'], correct:1 },
      { src:'car (carro)', opts:['contable','incontable','plural','articulo'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es un sustantivo incontable?', opts:['apple','water','book','car'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'I have three ', ans:'books', post:'.', bank:['book','books','informations','waters'] },
      { pre:'I drink a lot of ', ans:'water', post:'.', bank:['water','waters','a water','many water'] },
      { pre:'She gave me some ', ans:'advice', post:'.', bank:['advice','advices','an advice','many advice'] },
      { pre:'There are many ', ans:'cars', post:'.', bank:['car','cars','carses','a cars'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada sustantivo como contable o incontable.',
    categories:['Contable','Incontable'],
    items:[ {text:'apple',correct:0},{text:'water',correct:1},{text:'book',correct:0},{text:'money',correct:1},{text:'car',correct:0},{text:'information',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I have three books.', type:'select', opts:['I have three books.','I have three book.','I have three waters.','I have three informations.'], correct:0 },
      { tts:'I need some water.', type:'select', opts:['I need some water.','I need some waters.','I need a water.','I need three water.'], correct:0 },
      { tts:'She gave me some advice.', type:'select', opts:['She gave me some advice.','She gave me some advices.','She gave me an advice.','She gave me three advice.'], correct:0 } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la forma correcta para cada sustantivo.',
    transforms:[
      { original:'apple', task:'Plural', opts:['apples','apple','an apple','informations'], correct:0 },
      { original:'water', task:'Cuantificador', opts:['some water','a water','waters','many water'], correct:0 },
      { original:'book', task:'Plural', opts:['books','book','a book','bookes'], correct:0 },
      { original:'money', task:'Cuantificador', opts:['some money','a money','moneys','many money'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'How many books do you have?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I have ten books.','I have ten book.','I have ten informations.','I have ten waters.'], correct:0 },
      { speaker:0, text:'Do you want some water?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, some water, please.','Yes, a water, please.','Yes, three water, please.','Yes, waters, please.'], correct:0 },
      { speaker:0, text:'Here you go.', blank:false } ] }
]);

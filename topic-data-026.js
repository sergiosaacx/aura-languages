/* topic-data-026.js - Juego 26/350 | T4 5/7 A OR THE? | a/an/the en oraciones (ESPECIALIZADO) | Bronce A1 */
_registerGames(26, 'Articulos · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige el articulo correcto dentro de la frase.',
    items:[
      { src:'un carro rojo',     opts:['a red car','an red car','the red car','red car'], correct:0 },
      { src:'un paraguas',       opts:['a umbrella','an umbrella','the umbrella','umbrella'], correct:1 },
      { src:'el sol',            opts:['a sun','an sun','the sun','sun'], correct:2 },
      { src:'un perro grande',   opts:['an big dog','a big dog','the big dog','big dog'], correct:1 },
      { src:'una idea',          opts:['a idea','an idea','the idea','idea'], correct:1 },
      { src:'la luna',           opts:['a moon','an moon','the moon','moon'], correct:2 }
    ]
  },
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Que articulo va con "sun" (algo unico)?',
    opts:['a','an','the','one'], correct:2 },
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada sustantivo con su forma con articulo.',
    pairs:[ ['red car','a red car'],['umbrella','an umbrella'],['sun','the sun'],['old house','an old house'],['big dog','a big dog'],['moon','the moon'] ] },
  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada sustantivo segun el articulo que necesita.',
    categories:['a','an','the'],
    items:[ {text:'book',correct:0},{text:'apple',correct:1},{text:'sun',correct:2},{text:'egg',correct:1},{text:'dog',correct:0},{text:'moon',correct:2} ] },
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'She has a red car.', type:'select', opts:['She has a red car.','She has an red car.','She has the red car.','She has red car.'], correct:0 },
      { tts:'I need an umbrella.', type:'select', opts:['I need an umbrella.','I need a umbrella.','I need the umbrella.','I need umbrella.'], correct:0 },
      { tts:'The sun is hot.', type:'select', opts:['The sun is hot.','A sun is hot.','An sun is hot.','Sun is hot.'], correct:0 } ] },
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['a','She','has','car'],ans:['She','has','a','car']},{words:['is','The','sun','hot'],ans:['The','sun','is','hot']},{words:['an','I','need','umbrella'],ans:['I','need','an','umbrella']} ] },
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca el articulo incorrecto y elige el correcto.',
    sents:[
      { words:['She','has','an','car','.'], wi:2, correct:'a', choices:['a','an','the','one'] },
      { words:['I','need','a','umbrella','.'], wi:2, correct:'an', choices:['an','a','the','one'] },
      { words:['A','sun','is','hot','.'], wi:0, correct:'The', choices:['The','A','An','One'] } ] }
]);

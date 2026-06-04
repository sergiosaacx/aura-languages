/* topic-data-057.js - Juego 57/350 | T9 1/7 HERE & THERE | Preposiciones de lugar reconocimiento (ESPECIALIZADO) | Bronce A1 */
_registerGames(57, 'Preposiciones de Lugar · Reconocimiento', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la preposicion de lugar correcta.',
    items:[
      { src:'dentro de', opts:['on','in','under','at'], correct:1 },
      { src:'sobre / encima', opts:['in','on','under','next to'], correct:1 },
      { src:'debajo de', opts:['on','in','under','behind'], correct:2 },
      { src:'al lado de', opts:['next to','under','in','behind'], correct:0 },
      { src:'entre', opts:['behind','between','under','on'], correct:1 },
      { src:'detras de', opts:['behind','between','next to','in'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que preposicion significa "encima de una superficie"?', opts:['in','on','under','behind'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada preposicion en ingles con su significado.',
    pairs:[ ['in','dentro'],['on','sobre'],['under','debajo'],['next to','al lado'],['between','entre'],['behind','detras'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la preposicion de lugar correcta.',
    sents:[
      { pre:'The cat is ', ans:'on', post:' the table.', bank:['in','on','under','at'] },
      { pre:'The ball is ', ans:'under', post:' the chair.', bank:['on','in','under','behind'] },
      { pre:'The keys are ', ans:'in', post:' the bag.', bank:['in','on','under','next to'] },
      { pre:'The dog is ', ans:'behind', post:' the door.', bank:['behind','between','on','in'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada preposicion segun la posicion que indica.',
    categories:['Contacto/encima','Dentro/cubierto'],
    items:[ {text:'on',correct:0},{text:'in',correct:1},{text:'under',correct:1},{text:'on top',correct:0} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'The cat is on the table.', type:'select', opts:['The cat is on the table.','The cat is in the table.','The cat is under the table.','The cat is behind the table.'], correct:0 },
      { tts:'The ball is under the chair.', type:'select', opts:['The ball is under the chair.','The ball is on the chair.','The ball is in the chair.','The ball is next to the chair.'], correct:0 },
      { tts:'The keys are in the bag.', type:'select', opts:['The keys are in the bag.','The keys are on the bag.','The keys are under the bag.','The keys are behind the bag.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con la preposicion correcta.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Where is my phone?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It is on the table.','It is in the table.','It is at the table.','It is behind on table.'], correct:0 },
      { speaker:0, text:'And my keys?', blank:false },
      { speaker:1, text:null, blank:true, opts:['They are in the bag.','They are on the bag inside.','They are at the bag.','They are under in bag.'], correct:0 },
      { speaker:0, text:'Thanks!', blank:false } ] }
]);

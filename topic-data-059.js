/* topic-data-059.js - Juego 59/350 | T9 3/7 HERE & THERE | Preposiciones de tiempo categorias (ESPECIALIZADO) | Bronce A1 */
_registerGames(59, 'Preposiciones de Tiempo · Categorias', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que preposicion usas con "the morning"?', opts:['in','on','at','to'], correct:0 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada expresion con su preposicion correcta.',
    pairs:[ ['the morning','in the morning'],['Monday','on Monday'],['noon','at noon'],['2019','in 2019'],['my birthday','on my birthday'],['night','at night'] ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion segun la preposicion que usa.',
    categories:['in','on','at'],
    items:[ {text:'July',correct:0},{text:'Monday',correct:1},{text:'noon',correct:2},{text:'2019',correct:0},{text:'my birthday',correct:1},{text:'night',correct:2} ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la preposicion correcta.',
    sents:[
      { pre:'I read ', ans:'in', post:' the morning.', bank:['in','on','at','to'] },
      { pre:'See you ', ans:'on', post:' Friday.', bank:['in','on','at','to'] },
      { pre:'I sleep ', ans:'at', post:' night.', bank:['in','on','at','to'] },
      { pre:'We met ', ans:'in', post:' 2020.', bank:['in','on','at','to'] } ] },
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la expresion de tiempo correcta.',
    items:[
      { src:'en la manana', opts:['on the morning','in the morning','at the morning','to the morning'], correct:1 },
      { src:'el lunes', opts:['in Monday','on Monday','at Monday','to Monday'], correct:1 },
      { src:'al mediodia', opts:['in noon','on noon','at noon','to noon'], correct:2 },
      { src:'en 2019', opts:['in 2019','on 2019','at 2019','to 2019'], correct:0 },
      { src:'en mi cumpleanos', opts:['in my birthday','on my birthday','at my birthday','to my birthday'], correct:1 },
      { src:'en la noche', opts:['in night','on night','at night','to night'], correct:2 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con la preposicion correcta.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'When do you study?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I study in the morning.','I study on the morning.','I study at the morning.','I study to the morning.'], correct:0 },
      { speaker:0, text:'When is the party?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It is on Saturday.','It is in Saturday.','It is at Saturday.','It is to Saturday.'], correct:0 },
      { speaker:0, text:'Great!', blank:false } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I work in the morning.', type:'select', opts:['I work in the morning.','I work on the morning.','I work at the morning.','I work to the morning.'], correct:0 },
      { tts:'See you on Monday.', type:'select', opts:['See you on Monday.','See you in Monday.','See you at Monday.','See you to Monday.'], correct:0 },
      { tts:'I sleep at night.', type:'select', opts:['I sleep at night.','I sleep in night.','I sleep on night.','I sleep to night.'], correct:0 } ] }
]);

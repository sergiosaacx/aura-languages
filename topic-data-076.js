/* topic-data-076.js - Juego 76/350 | T11 6/7 WHAT HAPPENED? | regulares e irregulares en contexto (MEZCLADO) | Plata A2 */
_registerGames(76, 'Pasado Simple · En Contexto', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['I waked up late','I woke up late','I wake up late','I waik up late'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el pasado correcto para la historia.',
    sents:[
      { pre:'Yesterday I ', ans:'woke', post:' up late.', bank:['wake','woke','waked','woken'] },
      { pre:'I ', ans:'missed', post:' the bus.', bank:['miss','missed','mist','missing'] },
      { pre:'I ', ans:'walked', post:' to school.', bank:['walk','walked','walkd','walking'] },
      { pre:'I ', ans:'ate', post:' breakfast there.', bank:['eat','ate','eated','eaten'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada pasado es correcto.',
    stmts:[
      { text:'"I woke up late." es correcto.', ans:true, expl:'Correcto. wake -> woke.' },
      { text:'"I missed the bus." es correcto.', ans:true, expl:'Correcto. miss -> missed.' },
      { text:'"She buyed a book." es correcto.', ans:false, expl:'Falso. buy -> bought.' },
      { text:'"They runned fast." es correcto.', ans:false, expl:'Falso. run -> ran.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Escribe el pasado de cada verbo.',
    transforms:[
      { original:'wake', task:'Pasado', opts:['woke','waked','woken','wakes'], correct:0 },
      { original:'buy', task:'Pasado', opts:['bought','buyed','buys','buying'], correct:0 },
      { original:'run', task:'Pasado', opts:['ran','runned','run','runs'], correct:0 },
      { original:'miss', task:'Pasado', opts:['missed','mist','miss','missing'], correct:0 } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I woke up late.', type:'select', opts:['I woke up late.','I wake up late.','I waked up late.','I woken up late.'], correct:0 },
      { tts:'She bought a book.', type:'select', opts:['She bought a book.','She buyed a book.','She buy a book.','She boughted a book.'], correct:0 },
      { tts:'They ran fast.', type:'select', opts:['They ran fast.','They runned fast.','They run fast.','They running fast.'], correct:0 } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada pasado como regular o irregular.',
    categories:['Regular','Irregular'],
    items:[ {text:'missed',correct:0},{text:'woke',correct:1},{text:'walked',correct:0},{text:'ate',correct:1},{text:'played',correct:0},{text:'ran',correct:1} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo en pasado.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What happened this morning?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I woke up late and missed the bus.','I wake up late and miss the bus.','I woke up late and missing the bus.','I waked up late and missed the bus.'], correct:0 },
      { speaker:0, text:'How did you get to work?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I walked to work.','I walk to work.','I walking to work.','I walkd to work.'], correct:0 },
      { speaker:0, text:'Oh no!', blank:false } ] }
]);

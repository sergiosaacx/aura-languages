/* topic-data-061.js - Juego 61/350 | T9 5/7 HERE & THERE | lugar y tiempo en oraciones (MEZCLADO) | Bronce A1 */
_registerGames(61, 'Lugar y Tiempo · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la preposicion correcta.',
    items:[
      { src:'sobre la mesa', opts:['in the table','on the table','at the table','under the table'], correct:1 },
      { src:'a las 7', opts:['in 7','on 7','at 7','to 7'], correct:2 },
      { src:'en la manana', opts:['on the morning','in the morning','at the morning','to the morning'], correct:1 },
      { src:'entre Tom y Ana', opts:['between Tom and Ana','under Tom and Ana','on Tom and Ana','in Tom and Ana'], correct:0 },
      { src:'el lunes', opts:['in Monday','on Monday','at Monday','to Monday'], correct:1 },
      { src:'dentro de la caja', opts:['on the box','at the box','in the box','under the box'], correct:2 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada frase con su preposicion.',
    pairs:[ ['the table','on the table'],['7 am','at 7 am'],['the morning','in the morning'],['Monday','on Monday'],['the box','in the box'],['July','in July'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la preposicion correcta.',
    sents:[
      { pre:'The keys are ', ans:'on', post:' the table.', bank:['in','on','at','under'] },
      { pre:'I wake up ', ans:'at', post:' 7.', bank:['in','on','at','to'] },
      { pre:'She sits ', ans:'between', post:' Tom and Ana.', bank:['between','under','on','in'] },
      { pre:'We meet ', ans:'in', post:' the morning.', bank:['in','on','at','to'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:['on','keys','The','are','the','table'], ans:['The','keys','are','on','the','table'] },
      { words:['at','wake','I','up','7'], ans:['I','wake','up','at','7'] },
      { words:['in','We','meet','the','morning'], ans:['We','meet','in','the','morning'] } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la preposicion incorrecta y elige la correccion.',
    sents:[
      { words:['The','cat','is','in','the','table','.'], wi:3, correct:'on', choices:['on','in','at','under'] },
      { words:['I','wake','up','in','7','.'], wi:3, correct:'at', choices:['at','in','on','to'] },
      { words:['We','meet','on','the','morning','.'], wi:2, correct:'in', choices:['in','on','at','to'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada preposicion segun lo que indica.',
    categories:['Lugar','Tiempo'],
    items:[ {text:'on the table',correct:0},{text:'at 7',correct:1},{text:'in the box',correct:0},{text:'on Monday',correct:1},{text:'under the bed',correct:0},{text:'in July',correct:1} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Where are my keys?', blank:false },
      { speaker:1, text:null, blank:true, opts:['They are on the table.','They are in the table.','They are at the table.','They are to the table.'], correct:0 },
      { speaker:0, text:'What time do you wake up?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I wake up at 7.','I wake up in 7.','I wake up on 7.','I wake up to 7.'], correct:0 },
      { speaker:0, text:'Early!', blank:false } ] }
]);

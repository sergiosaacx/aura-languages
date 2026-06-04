/* topic-data-041.js - Juego 41/350 | T6 6/7 MINE & YOURS | Imperativos en contexto (ESPECIALIZADO) | Bronce A1 */
_registerGames(41, 'Imperativos · En Contexto Real', [
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Para dar una orden de forma cortes, que palabra anades?',
    opts:['please','thank you','sorry','hello'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el imperativo correcto para cada instruccion.',
    sents:[
      { pre:'', ans:'Open', post:' the door, please.', bank:['Open','Opens','Opening','Opened'] },
      { pre:'', ans:"Don't", post:' run in the hallway.', bank:["Don't","Not","No","Doesn't"] },
      { pre:'', ans:'Raise', post:' your hand.', bank:['Raise','Raises','Raising','Rise'] },
      { pre:'', ans:'Turn', post:' off the lights.', bank:['Turn','Turns','Turning','Turned'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:['the','Open','door','please'], ans:['Open','the','door','please'] },
      { words:['hand','Raise','your'], ans:['Raise','your','hand'] },
      { words:['run',"Don't",'here'], ans:["Don't",'run','here'] } ] },
  { id:'transform', label:'Transforma', xp:35,
    instr:'Convierte cada instruccion en imperativo.',
    transforms:[
      { original:'You must open the door.', task:'En imperativo', opts:['Open the door.','You open the door.','Opens the door.','To open the door.'], correct:0 },
      { original:'You must not run.', task:'En imperativo negativo', opts:["Don't run.","Not run.","No run.","You not run."], correct:0 },
      { original:'You must raise your hand.', task:'En imperativo', opts:['Raise your hand.','You raise your hand.','Raises your hand.','Raising your hand.'], correct:0 },
      { original:'You must not shout.', task:'En imperativo negativo', opts:["Don't shout.","Not shout.","No shout.","You not shout."], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo con el imperativo correcto.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'It is dark here.', blank:false },
      { speaker:1, text:null, blank:true, opts:['Turn on the lights.','You turn on the lights.','Turning on the lights.','To turn on the lights.'], correct:0 },
      { speaker:0, text:'The floor is wet.', blank:false },
      { speaker:1, text:null, blank:true, opts:["Don't run here.","Not run here.","No run here.","You not run here."], correct:0 },
      { speaker:0, text:'Okay!', blank:false } ] },
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la orden que oyes.',
    items:[
      { tts:'Open the door, please.', type:'select', opts:['Open the door, please.','Opens the door, please.','You open the door.','Opening the door.'], correct:0 },
      { tts:"Don't run in the hallway.", type:'select', opts:["Don't run in the hallway.","Not run in the hallway.","No run in the hallway.","You run in the hallway."], correct:0 },
      { tts:'Raise your hand.', type:'select', opts:['Raise your hand.','Raises your hand.','Raising your hand.','You raise your hand.'], correct:0 } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada afirmacion sobre imperativos es correcta.',
    stmts:[
      { text:'"Please sit down." es un imperativo cortes.', ans:true, expl:'Correcto. please suaviza la orden.' },
      { text:'"You raise your hand." es la forma normal del imperativo.', ans:false, expl:'Falso. Se omite you: Raise your hand.' },
      { text:'"Don\'t touch it." es un imperativo negativo.', ans:true, expl:"Correcto. Don't + verbo." },
      { text:'El imperativo cambia el verbo a tercera persona.', ans:false, expl:'Falso. Usa el verbo base sin -s.' } ] }
]);

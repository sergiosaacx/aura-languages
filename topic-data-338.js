/* topic-data-338.js - Juego 338/350 | T49 2/7 DISCOURSE ANALYSIS | implicatura (ESPECIALIZADO) | Challenger C2 */
_registerGames(338, 'Implicatura · Lo que se Dice vs lo que se Comunica', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Can you pass the salt?" comunica...', opts:['una pregunta sobre tu habilidad','una peticion','una orden grosera','una queja'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada enunciado con lo que comunica.',
    pairs:[ ['Can you pass the salt?','pasame la sal'],['It is getting cold in here','cierra la ventana'],['Do you know the time?','dime la hora'],['Is there any coffee left?','quiero cafe'],['That music is loud','baja el volumen'],['I have an early start','me voy a dormir'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca lo que realmente se comunica.',
    sents:[
      { pre:'"It is cold in here" usually means: please ', ans:'close the window', post:'.', bank:['close the window','open the door','sit down','leave now'] },
      { pre:'"Can you pass the salt?" is really a ', ans:'request', post:'.', bank:['request','question','threat','complaint'] },
      { pre:'"Is there coffee left?" implies the speaker ', ans:'wants coffee', post:'.', bank:['wants coffee','hates coffee','made coffee','sells coffee'] },
      { pre:'"I have an early start" can imply ', ans:'I should leave', post:'.', bank:['I should leave','I am tired of you','I love mornings','I will be late'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la interpretacion pragmatica es correcta.',
    stmts:[
      { text:'"Can you pass the salt?" es una peticion, no una pregunta literal.', ans:true, expl:'Correcto.' },
      { text:'"It is getting cold in here" suele ser literal sobre el clima.', ans:false, expl:'Falso. suele implicar cerrar la ventana.' },
      { text:'La implicatura depende del contexto.', ans:true, expl:'Correcto.' },
      { text:'Las implicaturas se interpretan siempre de forma literal.', ans:false, expl:'Falso. requieren inferencia pragmatica.' } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Identifica la implicatura.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Would you like more coffee?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I have an early meeting tomorrow.','Yes, two cups please now.','I love coffee a lot.','Coffee grows in Colombia.'], correct:0 },
      { speaker:0, text:'It is getting cold in here.', blank:false },
      { speaker:1, text:null, blank:true, opts:['I will close the window.','Yes, winter is coming.','The thermometer reads 18.','Cold is relative really.'], correct:0 },
      { speaker:0, text:'Thanks.', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada enunciado.',
    categories:['Significado literal','Implicatura (peticion)'],
    items:[ {text:'The window is open (statement)',correct:0},{text:'It is cold in here',correct:1},{text:'The salt is on the table',correct:0},{text:'Can you pass the salt?',correct:1},{text:'There is no coffee',correct:0},{text:'Is there any coffee left?',correct:1} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la implicatura mas probable.',
    transforms:[
      { original:'It is getting cold in here.', task:'Implicatura', opts:['Please close the window.','The weather report is wrong.','I like cold rooms.','Winter has arrived.'], correct:0 },
      { original:'Do you know what time it is?', task:'Implicatura', opts:['Please tell me the time.','I doubt you own a watch.','Time is an illusion.','I am testing you.'], correct:0 },
      { original:'That music is very loud.', task:'Implicatura', opts:['Please turn it down.','I love this song.','Music is art.','The speakers are big.'], correct:0 },
      { original:'I have an early start tomorrow.', task:'Implicatura', opts:['I should probably leave.','I love early mornings.','Mornings are bright.','I set an alarm.'], correct:0 } ] }
]);

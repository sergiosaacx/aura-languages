/* topic-data-342.js - Juego 342/350 | T49 6/7 DISCOURSE ANALYSIS | implicaturas y actos en conversacion (MEZCLADO) | Challenger C2 */
_registerGames(342, 'Implicaturas y Actos de Habla · En Conversacion', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'A: "More coffee?" B: "I have an early meeting." B implica...', opts:['quiere mas cafe','rechaza cortesmente','no entiende','tiene sueno ahora'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada respuesta con lo que implica.',
    pairs:[ ['I have an early meeting','rechaza (no, gracias)'],['It is rather late','deberiamos terminar'],['I am driving','no bebere alcohol'],['My phone is dead','no pude llamar'],['It is a bit chilly','cierra la ventana'],['I have read better','no me gusto'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca lo que implica la respuesta.',
    sents:[
      { pre:'"I have an early meeting" implies a polite ', ans:'refusal', post:'.', bank:['refusal','acceptance','question','threat'] },
      { pre:'"I am driving" implies "I will not ', ans:'drink', post:'."', bank:['drink','eat','sleep','drive fast'] },
      { pre:'"It is rather late" implies we should ', ans:'leave', post:'.', bank:['leave','stay','start','wait'] },
      { pre:'"I have read better" implies the book was ', ans:'disappointing', post:'.', bank:['disappointing','excellent','long','cheap'] } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con la respuesta pragmaticamente adecuada.', speakers:['Anfitrion','Invitado'],
    lines:[
      { speaker:0, text:'Would you like a glass of wine?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Thanks, but I am driving tonight.','Yes, wine is made from grapes.','Driving is fun on weekends.','I own a red car.'], correct:0 },
      { speaker:0, text:'Shall we stay a bit longer?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It is getting rather late, actually.','Time is a human construct.','The clock is on the wall.','Late is a relative term.'], correct:0 },
      { speaker:0, text:'Of course, let us go.', blank:false } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la inferencia es correcta.',
    stmts:[
      { text:'"I have an early meeting" puede implicar un rechazo cortes.', ans:true, expl:'Correcto.' },
      { text:'"I am driving" implica que la persona bebera alcohol.', ans:false, expl:'Falso. implica que no bebera.' },
      { text:'"It is rather late" puede implicar que es hora de irse.', ans:true, expl:'Correcto.' },
      { text:'"I have read better" es un elogio al libro.', ans:false, expl:'Falso. implica decepcion.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada respuesta.',
    categories:['Acepta','Rechaza (implicito)'],
    items:[ {text:'Yes, please, I would love some',correct:0},{text:'I have an early meeting',correct:1},{text:'That sounds great',correct:0},{text:'I am driving tonight',correct:1},{text:'Absolutely, thank you',correct:0},{text:'Maybe another time',correct:1} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la respuesta pragmaticamente adecuada.',
    transforms:[
      { original:'rechazar vino cortesmente', task:'Respuesta', opts:['Thanks, but I am driving.','No.','Wine is grapes.','I have a car.'], correct:0 },
      { original:'sugerir que es hora de irse', task:'Respuesta', opts:['It is getting rather late.','The clock works.','Time flies.','I like clocks.'], correct:0 },
      { original:'indicar que el libro decepciono', task:'Respuesta', opts:['I have read better.','It has pages.','Books are paper.','I read it twice.'], correct:0 },
      { original:'aceptar mas cafe', task:'Respuesta', opts:['Yes, please, I would love some.','Coffee is a bean.','I have a mug.','Caffeine exists.'], correct:0 } ] }
]);

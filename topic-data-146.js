/* topic-data-146.js - Juego 146/350 | T21 6/7 STILL GOING | Simple vs Continuo en contexto (MEZCLADO) | Oro B1 */
_registerGames(146, 'Perfecto Simple vs Continuo · En Contexto', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Para enfatizar cuantos (3 books), que usas?', opts:['have been reading','have read','am reading','was reading'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta segun el enfasis.',
    sents:[
      { pre:'I ', ans:'have been reading', post:' this book for a week.', bank:['have been reading','have read','am reading','was reading'] },
      { pre:'I ', ans:'have read', post:' three books this month.', bank:['have been reading','have read','am reading','was reading'] },
      { pre:'She ', ans:'has been writing', post:' since morning.', bank:['has been writing','has written','is writing','was writing'] },
      { pre:'She ', ans:'has written', post:' five emails today.', bank:['has been writing','has written','is writing','was writing'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"I have read three books." enfatiza la cantidad.', ans:true, expl:'Correcto. cuantos -> simple.' },
      { text:'"I have been reading for a week." enfatiza la duracion.', ans:true, expl:'Correcto. cuanto tiempo -> continuo.' },
      { text:'"I have been reading three books." es la mejor forma para contar libros.', ans:false, expl:'Falso. I have read three books.' },
      { text:'"I have written all day." enfatiza la duracion del proceso.', ans:false, expl:'Falso. I have been writing all day.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige simple o continuo segun la pista.',
    transforms:[
      { original:'duracion: read for a week', task:'Simple o Continuo', opts:['I have been reading for a week.','I have read for a week.','I am reading for a week.','I read for a week.'], correct:0 },
      { original:'cantidad: read 3 books', task:'Simple o Continuo', opts:['I have read three books.','I have been reading three books.','I am reading three books.','I read three books.'], correct:0 },
      { original:'proceso: write since morning', task:'Simple o Continuo', opts:['She has been writing since morning.','She has written since morning.','She is writing since morning.','She writes since morning.'], correct:0 },
      { original:'resultado: write 5 emails', task:'Simple o Continuo', opts:['She has written five emails.','She has been writing five emails.','She is writing five emails.','She writes five emails.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'How many emails have you written?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I have written ten emails.','I have been writing ten emails.','I am writing ten emails.','I write ten emails.'], correct:0 },
      { speaker:0, text:'You look tired. What have you been doing?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I have been working all day.','I have worked all day been.','I am working all day.','I was working all day.'], correct:0 },
      { speaker:0, text:'Take a break!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada oracion como simple o continuo.',
    categories:['Simple (cuantos)','Continuo (cuanto tiempo)'],
    items:[ {text:'have read 3 books',correct:0},{text:'have been reading for a week',correct:1},{text:'have written 5 emails',correct:0},{text:'have been working all day',correct:1},{text:'have finished',correct:0},{text:'have been waiting for hours',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I have read three books this month.', type:'select', opts:['I have read three books this month.','I have been reading three books this month.','I am reading three books this month.','I read three books this month.'], correct:0 },
      { tts:'I have been reading for a week.', type:'select', opts:['I have been reading for a week.','I have read for a week.','I am reading for a week.','I read for a week.'], correct:0 },
      { tts:'She has written five emails today.', type:'select', opts:['She has written five emails today.','She has been writing five emails today.','She is writing five emails today.','She writes five emails today.'], correct:0 } ] }
]);

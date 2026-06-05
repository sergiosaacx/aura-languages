/* topic-data-141.js - Juego 141/350 | T21 1/7 STILL GOING | Presente Perfecto Continuo (ESPECIALIZADO) | Oro B1 */
_registerGames(141, 'Presente Perfecto Continuo · Reconocimiento', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta (have been + -ing).',
    items:[
      { src:'Llevo dos horas estudiando', opts:['I have studied for two hours','I have been studying for two hours','I am studying for two hours','I was studying for two hours'], correct:1 },
      { src:'Ella lleva trabajando todo el dia', opts:['She has worked all day','She has been working all day','She is working all day','She was working all day'], correct:1 },
      { src:'Llevamos esperando una hora', opts:['We have waited for an hour','We have been waiting for an hour','We are waiting for an hour','We were waiting for an hour'], correct:1 },
      { src:'El lleva corriendo 30 minutos', opts:['He has run for 30 minutes','He has been running for 30 minutes','He is running for 30 minutes','He was running for 30 minutes'], correct:1 },
      { src:'Llevo viviendo aqui mucho tiempo', opts:['I have lived here for a long time','I have been living here for a long time','I am living here a long time','I was living here a long time'], correct:1 },
      { src:'Ellos llevan jugando dos horas', opts:['They have played for two hours','They have been playing for two hours','They are playing for two hours','They were playing for two hours'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Como se forma el presente perfecto continuo?', opts:['have + -ing','have been + -ing','am + -ing','have + participio'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta.',
    sents:[
      { pre:'I have been ', ans:'studying', post:' for two hours.', bank:['study','studying','studied','studies'] },
      { pre:'She has ', ans:'been', post:' working all day.', bank:['been','being','be','was'] },
      { pre:'We have been ', ans:'waiting', post:' for an hour.', bank:['wait','waiting','waited','waits'] },
      { pre:'They ', ans:'have', post:' been running.', bank:['have','has','are','were'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['N','E','E','B'],ans:'BEEN',hint:'have ... studying'},{scrambled:['G','N','I','Y','D','U','T','S'],ans:'STUDYING',hint:'-ing de study'},{scrambled:['G','N','I','T','I','A','W'],ans:'WAITING',hint:'-ing de wait'},{scrambled:['E','V','A','H'],ans:'HAVE',hint:'auxiliar'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'El presente perfecto continuo usa "have/has been + -ing".', ans:true, expl:'Correcto. I have been studying.' },
      { text:'"I have studying for two hours." es correcto.', ans:false, expl:'Falso. Falta been.' },
      { text:'"She has been working." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"I am studying for two hours." (desde hace 2h) es correcto.', ans:false, expl:'Falso. I have been studying for two hours.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma el presente perfecto continuo.',
    transforms:[
      { original:'study (I)', task:'Have been -ing', opts:['I have been studying.','I have studied.','I am studying.','I was studying.'], correct:0 },
      { original:'work (she)', task:'Have been -ing', opts:['She has been working.','She has worked.','She is working.','She was working.'], correct:0 },
      { original:'wait (we)', task:'Have been -ing', opts:['We have been waiting.','We have waited.','We are waiting.','We were waiting.'], correct:0 },
      { original:'run (they)', task:'Have been -ing', opts:['They have been running.','They have run.','They are running.','They were running.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What have you been doing?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I have been studying all day.','I have studied all day been.','I am studying all day.','I was studying all day.'], correct:0 },
      { speaker:0, text:'And your sister?', blank:false },
      { speaker:1, text:null, blank:true, opts:['She has been working too.','She has working too.','She is been working too.','She have been working too.'], correct:0 },
      { speaker:0, text:'You are busy!', blank:false } ] }
]);

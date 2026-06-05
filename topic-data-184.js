/* topic-data-184.js - Juego 184/350 | T27 2/7 VERB PATTERNS | doble significado -ing vs inf (ESPECIALIZADO) | Oro B1 */
_registerGames(184, 'Verbos con Doble Significado', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"I remember meeting her" significa...', opts:['lo recuerdo (ya paso)','no debo olvidarlo','lo hare pronto','no la conozco'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta segun el significado.',
    sents:[
      { pre:'Remember ', ans:'to call', post:' her tomorrow.', bank:['to call','calling','call','called'] },
      { pre:'I remember ', ans:'meeting', post:' her last year.', bank:['meeting','to meet','meet','met'] },
      { pre:'He stopped ', ans:'smoking', post:' two years ago.', bank:['smoking','to smoke','smoke','smokes'] },
      { pre:'We stopped ', ans:'to rest', post:' for a while.', bank:['to rest','resting','rest','rests'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"Remember to call" = no olvides hacerlo (futuro).', ans:true, expl:'Correcto. infinitivo = accion futura.' },
      { text:'"I remember meeting her" = recuerdo el encuentro pasado.', ans:true, expl:'Correcto. gerundio = recuerdo del pasado.' },
      { text:'"He stopped to smoke" y "He stopped smoking" significan lo mismo.', ans:false, expl:'Falso. to smoke = paro para fumar; smoking = dejo de fumar.' },
      { text:'Con "forget", el gerundio se refiere a un recuerdo pasado.', ans:true, expl:'Correcto. I will never forget meeting you.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la forma correcta segun el significado.',
    transforms:[
      { original:'no olvides llamar (futuro)', task:'-ing o to', opts:['Remember to call.','Remember calling.','Remember call.','Remember to calling.'], correct:0 },
      { original:'recuerdo haberla conocido (pasado)', task:'-ing o to', opts:['I remember meeting her.','I remember to meet her.','I remember meet her.','I remember to meeting her.'], correct:0 },
      { original:'dejo de fumar (abandonar)', task:'-ing o to', opts:['He stopped smoking.','He stopped to smoke.','He stopped smoke.','He stopped to smoking.'], correct:0 },
      { original:'paramos para descansar (proposito)', task:'-ing o to', opts:['We stopped to rest.','We stopped resting.','We stopped rest.','We stopped to resting.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Did you call the doctor?', blank:false },
      { speaker:1, text:null, blank:true, opts:["Oh no, I forgot to call him.","Oh no, I forgot calling him.","Oh no, I forgot call him.","Oh no, I forgot to calling him."], correct:0 },
      { speaker:0, text:'Do you know her?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I remember meeting her.','Yes, I remember to meet her.','Yes, I remember meet her.','Yes, I remember to meeting her.'], correct:0 },
      { speaker:0, text:'Nice.', blank:false } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'Remember to lock the door.', type:'select', opts:['Remember to lock the door.','Remember locking the door.','Remember lock the door.','Remember to locking the door.'], correct:0 },
      { tts:'I remember meeting him.', type:'select', opts:['I remember meeting him.','I remember to meet him.','I remember meet him.','I remember to meeting him.'], correct:0 },
      { tts:'He stopped smoking.', type:'select', opts:['He stopped smoking.','He stopped to smoke.','He stopped smoke.','He stopped to smoking.'], correct:0 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada frase con su significado.',
    pairs:[ ['remember to call','no lo olvides (futuro)'],['remember calling','recuerdo pasado'],['stop smoking','dejar de fumar'],['stop to smoke','parar para fumar'],['forget to lock','olvidar hacerlo'],['forget meeting','olvidar el recuerdo'] ] }
]);

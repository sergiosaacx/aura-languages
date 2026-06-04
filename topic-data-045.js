/* topic-data-045.js - Juego 45/350 | T7 3/7 COLOR YOUR WORDS | Adverbios de frecuencia significado (ESPECIALIZADO) | Bronce A1 */
_registerGames(45, 'Adverbios de Frecuencia · Significado', [
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige el adverbio de frecuencia correcto.',
    items:[
      { src:'100% del tiempo', opts:['never','always','sometimes','rarely'], correct:1 },
      { src:'0% del tiempo',   opts:['always','never','usually','often'], correct:1 },
      { src:'a veces (40%)',   opts:['always','never','sometimes','usually'], correct:2 },
      { src:'normalmente (80%)',opts:['usually','rarely','never','sometimes'], correct:0 },
      { src:'rara vez (20%)',  opts:['often','rarely','always','usually'], correct:1 },
      { src:'a menudo (60%)',  opts:['often','never','rarely','always'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Que adverbio significa el 100% del tiempo?',
    opts:['usually','always','often','sometimes'], correct:1 },
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada adverbio con su porcentaje.',
    pairs:[ ['always','100%'],['usually','80%'],['often','60%'],['sometimes','40%'],['rarely','20%'],['never','0%'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el adverbio que corresponde a la frecuencia.',
    sents:[
      { pre:'(100%) I ', ans:'always', post:' brush my teeth.', bank:['always','never','rarely','sometimes'] },
      { pre:'(0%) She ', ans:'never', post:' eats meat.', bank:['never','always','usually','often'] },
      { pre:'(40%) We ', ans:'sometimes', post:' watch TV.', bank:['sometimes','never','always','rarely'] },
      { pre:'(80%) He ', ans:'usually', post:' walks to work.', bank:['usually','never','rarely','always'] } ] },
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I always drink water.', type:'select', opts:['I always drink water.','I never drink water.','I usually drink water.','I sometimes drink water.'], correct:0 },
      { tts:'She never smokes.', type:'select', opts:['She never smokes.','She always smokes.','She often smokes.','She usually smokes.'], correct:0 },
      { tts:'We sometimes travel.', type:'select', opts:['We sometimes travel.','We always travel.','We never travel.','We usually travel.'], correct:0 } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"always" significa el 100% del tiempo.', ans:true, expl:'Correcto. always = siempre (100%).' },
      { text:'"never" significa a veces.', ans:false, expl:'Falso. never = nunca (0%).' },
      { text:'"usually" es mas frecuente que "sometimes".', ans:true, expl:'Correcto. usually (80%) > sometimes (40%).' },
      { text:'"rarely" significa muy frecuente.', ans:false, expl:'Falso. rarely = rara vez (20%).' } ] },
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo con el adverbio de frecuencia.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Do you exercise?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I always exercise.','Yes, I exercise always do.','Yes, I am always exercise.','Yes, always I exercise.'], correct:0 },
      { speaker:0, text:'Do you eat fast food?', blank:false },
      { speaker:1, text:null, blank:true, opts:['No, I never eat fast food.','No, I eat never fast food.','No, I am never eat fast food.','No, never I eat fast food.'], correct:0 },
      { speaker:0, text:'Healthy!', blank:false } ] }
]);

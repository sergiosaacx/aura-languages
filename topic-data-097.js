/* topic-data-097.js - Juego 97/350 | T14 6/7 WHAT'S HAPPENING? | simple vs continuo en contexto (MEZCLADO) | Plata A2 */
_registerGames(97, 'Simple vs Continuo · En Contexto', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'I usually ___ to work. (rutina)', opts:['walk','walking','am walking','walks'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta segun el contexto.',
    sents:[
      { pre:'I usually ', ans:'walk', post:' to work.', bank:['walk','walking','am walking','walks'] },
      { pre:'But today I ', ans:'am', post:' taking the bus.', bank:['am','is','are','do'] },
      { pre:'She normally ', ans:'cooks', post:' but now she is resting.', bank:['cooks','cooking','is cooking','cook'] },
      { pre:'Look! It ', ans:'is', post:' raining.', bank:['is','does','do','are'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"I usually walk." usa presente simple para una rutina.', ans:true, expl:'Correcto. usually -> simple.' },
      { text:'"Today I am taking the bus." usa continuo para hoy.', ans:true, expl:'Correcto. today/now -> continuo.' },
      { text:'"I am walking every day." es correcto para una rutina.', ans:false, expl:'Falso. I walk every day.' },
      { text:'"She cook now." es correcto.', ans:false, expl:'Falso. She is cooking now.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la forma correcta segun la pista.',
    transforms:[
      { original:'rutina: I / walk to work', task:'Simple', opts:['I walk to work.','I am walking to work.','I walking to work.','I walks to work.'], correct:0 },
      { original:'ahora: I / take the bus', task:'Continuo', opts:['I am taking the bus.','I take the bus.','I taking the bus.','I takes the bus.'], correct:0 },
      { original:'rutina: She / cook dinner', task:'Simple', opts:['She cooks dinner.','She is cooking dinner.','She cooking dinner.','She cook dinner.'], correct:0 },
      { original:'ahora: They / play football', task:'Continuo', opts:['They are playing football.','They play football.','They playing football.','They plays football.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Do you usually take the bus?', blank:false },
      { speaker:1, text:null, blank:true, opts:['No, I usually walk.','No, I usually walking.','No, I am usually walk.','No, I usually walks.'], correct:0 },
      { speaker:0, text:'What are you doing right now?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I am taking the bus today.','I take the bus today.','I taking the bus today.','I takes the bus today.'], correct:0 },
      { speaker:0, text:'I see!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion segun el tiempo verbal.',
    categories:['Simple (rutina)','Continuo (ahora)'],
    items:[ {text:'usually',correct:0},{text:'now',correct:1},{text:'every day',correct:0},{text:'at the moment',correct:1},{text:'on Mondays',correct:0},{text:'right now',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I usually walk to work.', type:'select', opts:['I usually walk to work.','I usually walking to work.','I am usually walk to work.','I usually walks to work.'], correct:0 },
      { tts:'Today I am taking the bus.', type:'select', opts:['Today I am taking the bus.','Today I take the bus.','Today I taking the bus.','Today I takes the bus.'], correct:0 },
      { tts:'Look! It is raining.', type:'select', opts:['Look! It is raining.','Look! It rains.','Look! It raining.','Look! It is rain.'], correct:0 } ] }
]);

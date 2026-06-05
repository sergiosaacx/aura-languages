/* topic-data-125.js - Juego 125/350 | T18 6/7 CAN YOU? | modales en situaciones cotidianas (MEZCLADO) | Plata A2 */
_registerGames(125, 'Modales · Situaciones Cotidianas', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'You look tired. You ___ get some rest.', opts:['can','should','must','could'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el modal correcto segun el contexto.',
    sents:[
      { pre:'You look tired. You ', ans:'should', post:' get some rest.', bank:['should','can','must','could'] },
      { pre:'Students ', ans:'must', post:' wear uniforms.', bank:['must','can','should','could'] },
      { pre:'She ', ans:'can', post:' swim very well.', bank:['can','must','should','have'] },
      { pre:'You ', ans:"shouldn't", post:' eat so fast.', bank:["shouldn't","can't","mustn't","won't"] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'Para un consejo se usa "should".', ans:true, expl:'Correcto. You should rest.' },
      { text:'Para una habilidad se usa "should".', ans:false, expl:'Falso. habilidad = can.' },
      { text:'Para una regla obligatoria se usa "must".', ans:true, expl:'Correcto. must/have to.' },
      { text:'"can" se usa para dar consejos.', ans:false, expl:'Falso. consejo = should.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion con el modal correcto.',
    transforms:[
      { original:'consejo: rest', task:'Modal', opts:['You should rest.','You can rest.','You must rest.','You could rest.'], correct:0 },
      { original:'habilidad: swim', task:'Modal', opts:['She can swim.','She should swim.','She must swim.','She would swim.'], correct:0 },
      { original:'regla: wear uniform', task:'Modal', opts:['Students must wear a uniform.','Students can wear a uniform.','Students should wear a uniform.','Students could wear a uniform.'], correct:0 },
      { original:'prohibicion: not enter', task:'Modal', opts:["You mustn't enter.","You can enter.","You should enter.","You would enter."], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'I have a headache.', blank:false },
      { speaker:1, text:null, blank:true, opts:['You should take a rest.','You can take a rest.','You must can take a rest.','You would take a rest.'], correct:0 },
      { speaker:0, text:'Can your sister drive?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, she can drive.','Yes, she should drive.','Yes, she must drive.','Yes, she can to drive.'], correct:0 },
      { speaker:0, text:'Great.', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada situacion segun el modal.',
    categories:['Consejo (should)','Obligacion (must)','Habilidad (can)'],
    items:[ {text:'You look tired',correct:0},{text:'rule at school',correct:1},{text:'play piano',correct:2},{text:'eat healthy',correct:0},{text:'pay taxes',correct:1},{text:'speak French',correct:2} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'You should get some rest.', type:'select', opts:['You should get some rest.','You can get some rest.','You should to get some rest.','You must can get some rest.'], correct:0 },
      { tts:'Students must wear uniforms.', type:'select', opts:['Students must wear uniforms.','Students must to wear uniforms.','Students musts wear uniforms.','Students must wearing uniforms.'], correct:0 },
      { tts:'She can swim very well.', type:'select', opts:['She can swim very well.','She can to swim very well.','She cans swim very well.','She can swimming very well.'], correct:0 } ] }
]);

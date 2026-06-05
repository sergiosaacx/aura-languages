/* topic-data-174.js - Juego 174/350 | T25 6/7 PASSIVE VOICE | Activa vs pasiva segun contexto (MEZCLADO) | Oro B1 */
_registerGames(174, 'Activa vs Pasiva · Segun Contexto', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'The Mona Lisa ___ by Leonardo da Vinci.', opts:['painted','was painted','is painting','paints'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta segun el foco.',
    sents:[
      { pre:'The Mona Lisa ', ans:'was painted', post:' by Leonardo.', bank:['was painted','painted','is painting','paints'] },
      { pre:'Someone ', ans:'stole', post:' my bike yesterday.', bank:['stole','was stolen','steals','is stealing'] },
      { pre:'This house ', ans:'was built', post:' 100 years ago.', bank:['was built','built','builds','is building'] },
      { pre:'My grandfather ', ans:'built', post:' this house.', bank:['built','was built','builds','is building'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"The Mona Lisa was painted by da Vinci." es correcto.', ans:true, expl:'Correcto. foco en el objeto -> pasiva.' },
      { text:'"Someone stole my bike." es activa correcta.', ans:true, expl:'Correcto. agente conocido (someone) -> activa.' },
      { text:'"The Mona Lisa painted by da Vinci." es correcto.', ans:false, expl:'Falso. was painted.' },
      { text:'"My bike was stole yesterday." es correcto.', ans:false, expl:'Falso. was stolen (participio).' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la voz correcta segun el foco.',
    transforms:[
      { original:'da Vinci / paint / Mona Lisa (foco en cuadro)', task:'Activa o pasiva', opts:['The Mona Lisa was painted by da Vinci.','The Mona Lisa painted da Vinci.','Da Vinci was painted the Mona Lisa.','The Mona Lisa paints.'], correct:0 },
      { original:'someone / steal / my bike', task:'Activa o pasiva', opts:['My bike was stolen.','My bike stole.','My bike steals.','My bike is stealing.'], correct:0 },
      { original:'my grandfather / build / this house', task:'Activa o pasiva', opts:['My grandfather built this house.','This house was built my grandfather.','My grandfather was built this house.','This house builds.'], correct:0 },
      { original:'they / speak / English here', task:'Activa o pasiva', opts:['English is spoken here.','English speaks here.','English was spoken here.','English spoke here.'], correct:0 } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'The Mona Lisa was painted by da Vinci.', type:'select', opts:['The Mona Lisa was painted by da Vinci.','The Mona Lisa painted by da Vinci.','The Mona Lisa is painting by da Vinci.','The Mona Lisa paints da Vinci.'], correct:0 },
      { tts:'Someone stole my bike.', type:'select', opts:['Someone stole my bike.','Someone was stolen my bike.','Someone steals my bike now.','Someone is stolen my bike.'], correct:0 },
      { tts:'This house was built 100 years ago.', type:'select', opts:['This house was built 100 years ago.','This house built 100 years ago.','This house builds 100 years ago.','This house is built 100 years ago.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Who painted the Mona Lisa?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It was painted by da Vinci.','It painted by da Vinci.','It paints da Vinci.','It is painting da Vinci.'], correct:0 },
      { speaker:0, text:'What happened to your bike?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It was stolen last week.','It stole last week.','It steals last week.','It is stolen last week now.'], correct:0 },
      { speaker:0, text:'Sorry to hear.', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica segun si necesita activa o pasiva.',
    categories:['Necesita activa','Necesita pasiva'],
    items:[ {text:'My grandfather built it',correct:0},{text:'The Mona Lisa ... by da Vinci',correct:1},{text:'Someone stole it',correct:0},{text:'English ... here',correct:1},{text:'She paints well',correct:0},{text:'This bridge ... in 1920',correct:1} ] }
]);

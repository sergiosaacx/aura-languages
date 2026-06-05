/* topic-data-255.js - Juego 255/350 | T37 3/7 PHRASAL VERBS II | multiples significados (ESPECIALIZADO) | Platino B2 */
_registerGames(255, 'Phrasal Verbs con Multiples Significados', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"take off" puede significar...', opts:['solo despegar','solo quitarse','despegar, quitarse o tener exito','rendirse'], correct:2 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada uso con su significado.',
    pairs:[ ['the plane took off','despegar'],['take off your coat','quitarse'],['the business took off','tener exito'],['get over an illness','recuperarse'],['get over a problem','superar'],['make out a shape','distinguir'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el phrasal verb correcto.',
    sents:[
      { pre:'The plane ', ans:'took off', post:' on time.', bank:['took off','made out','got over','came across'] },
      { pre:'She finally ', ans:'got over', post:' her cold.', bank:['got over','took off','made out','brought up'] },
      { pre:'I cannot ', ans:'make out', post:' his handwriting.', bank:['make out','take off','get over','bring up'] },
      { pre:'The new business really ', ans:'took off', post:'.', bank:['took off','got over','made out','came across'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"take off" puede significar despegar o tener exito.', ans:true, expl:'Correcto. multiples significados.' },
      { text:'"get over" solo significa saltar algo.', ans:false, expl:'Falso. tambien superar o recuperarse.' },
      { text:'"make out" puede significar distinguir o entender.', ans:true, expl:'Correcto.' },
      { text:'"take off" siempre significa despegar.', ans:false, expl:'Falso. tiene varios significados.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el uso correcto segun el significado.',
    transforms:[
      { original:'despegar (avion)', task:'take off', opts:['The plane took off.','The plane got over.','The plane made out.','The plane came across.'], correct:0 },
      { original:'recuperarse de algo', task:'get over', opts:['She got over the flu.','She took off the flu.','She made out the flu.','She brought up the flu.'], correct:0 },
      { original:'distinguir algo', task:'make out', opts:['I could not make out the sign.','I could not take off the sign.','I could not get over the sign.','I could not bring up the sign.'], correct:0 },
      { original:'tener exito (negocio)', task:'take off', opts:['The business took off.','The business got over.','The business made out.','The business came across.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'How is your new shop doing?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Great, it has really taken off!','Great, it has really got over!','Great, it has really made out!','Great, it has really come across!'], correct:0 },
      { speaker:0, text:'Are you better now?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I got over my cold.','Yes, I took off my cold.','Yes, I made out my cold.','Yes, I brought up my cold.'], correct:0 },
      { speaker:0, text:'Glad to hear it.', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada uso de "take off".',
    categories:['Despegar','Quitarse','Tener exito'],
    items:[ {text:'the plane took off',correct:0},{text:'take off your shoes',correct:1},{text:'the sales took off',correct:2},{text:'the jet took off',correct:0},{text:'take off your hat',correct:1},{text:'her career took off',correct:2} ] }
]);

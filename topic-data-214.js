/* topic-data-214.js - Juego 214/350 | T31 4/7 PERFECT TIMING | Past Perfect vs Past Simple (ESPECIALIZADO) | Platino B2 */
_registerGames(214, 'Past Perfect vs Past Simple', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Con "after" y "before", el Past Perfect es...', opts:['obligatorio','opcional','prohibido','siempre incorrecto'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"After she had left, I arrived" y "After she left, I arrived" son ambos correctos.', ans:true, expl:'Correcto. con after el Past Perfect es opcional.' },
      { text:'Con "by the time" suele usarse el Past Perfect.', ans:true, expl:'Correcto. By the time we arrived, it had started.' },
      { text:'El Past Perfect nunca es necesario.', ans:false, expl:'Falso. con when/by the time suele ser necesario.' },
      { text:'"Before I had eaten, I went out" siempre requiere Past Perfect.', ans:false, expl:'Falso. con before es opcional.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'By the time we arrived, the film ', ans:'had started', post:'.', bank:['had started','started','starts','was started'] },
      { pre:'After she ', ans:'had left', post:', I arrived.', bank:['had left','leaves','leaving','was leaving'] },
      { pre:'When I got home, they ', ans:'had eaten', post:'.', bank:['had eaten','eat','eating','were eat'] },
      { pre:'Before he ', ans:'arrived', post:', I had finished.', bank:['arrived','had arrived','arrive','arriving'] } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la secuencia correcta.',
    transforms:[
      { original:'by the time / arrive / film start', task:'Secuencia', opts:['By the time we arrived, the film had started.','By the time we arrived, the film started.','By the time we arrive, the film starts.','By the time we arrived, the film was started.'], correct:0 },
      { original:'after / she leave / I arrive', task:'Secuencia', opts:['After she had left, I arrived.','After she has left, I arrived.','After she leaves, I arrived.','After she was left, I arrived.'], correct:0 },
      { original:'when / I get home / they eat', task:'Secuencia', opts:['When I got home, they had eaten.','When I got home, they eat.','When I get home, they had eaten.','When I got home, they were eaten.'], correct:0 },
      { original:'I finish / before / he arrive', task:'Secuencia', opts:['I had finished before he arrived.','I have finished before he arrived.','I finished before he had arrived.','I was finished before he arrived.'], correct:0 } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['had','By','the','time','we','arrived','it','started'],ans:['By','the','time','we','arrived','it','had','started']},{words:['had','After','she','left','I','arrived'],ans:['After','she','had','left','I','arrived']},{words:['had','When','I','came','they','gone'],ans:['When','I','came','they','had','gone']} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada marcador.',
    categories:['Past Perfect necesario','Past Perfect opcional'],
    items:[ {text:'by the time',correct:0},{text:'after',correct:1},{text:'when (already)',correct:0},{text:'before',correct:1},{text:'by then',correct:0},{text:'as soon as',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'By the time we arrived, the film had started.', type:'select', opts:['By the time we arrived, the film had started.','By the time we arrived, the film started.','By the time we arrive, the film starts.','By the time we arrived, the film was started.'], correct:0 },
      { tts:'After she had left, I arrived.', type:'select', opts:['After she had left, I arrived.','After she has left, I arrived.','After she leaves, I arrived.','After she was left, I arrived.'], correct:0 },
      { tts:'When I got home, they had eaten.', type:'select', opts:['When I got home, they had eaten.','When I got home, they eat.','When I get home, they had eaten.','When I got home, they were eaten.'], correct:0 } ] }
]);

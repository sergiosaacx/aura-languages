/* topic-data-151.js - Juego 151/350 | T22 4/7 USED TO | Pasado Continuo usos (ESPECIALIZADO) | Oro B1 */
_registerGames(151, 'Pasado Continuo · Usos y Contraste', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual describe una accion en progreso interrumpida?', opts:['I cooked when he called','I was cooking when he called','I cook when he called','I have cooked when he called'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"I was sleeping when the phone rang." es correcto.', ans:true, expl:'Correcto. continuo + simple (interrupcion).' },
      { text:'"While I was cooking, he called." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"She was knowing the answer." es correcto.', ans:false, expl:'Falso. know es estativo: She knew.' },
      { text:'"I was sleep when he arrived." es correcto.', ans:false, expl:'Falso. I was sleeping.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'I was ', ans:'sleeping', post:' when the phone rang.', bank:['sleeping','slept','sleep','sleeps'] },
      { pre:'While she ', ans:'was', post:' cooking, he called.', bank:['was','were','is','did'] },
      { pre:'They ', ans:'were', post:' watching TV when I arrived.', bank:['were','was','are','did'] },
      { pre:'What ', ans:'were', post:' you doing at 8pm?', bank:['were','was','are','did'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['was','I','sleeping','when','he','arrived'],ans:['I','was','sleeping','when','he','arrived']},{words:['were','They','playing','when','it','rained'],ans:['They','were','playing','when','it','rained']},{words:['was','While','I','cooking','he','called'],ans:['While','I','was','cooking','he','called']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['I','was','sleep','when','he','called','.'], wi:2, correct:'sleeping', choices:['sleeping','sleep','slept','sleeps'] },
      { words:['They','was','playing','.'], wi:1, correct:'were', choices:['were','was','are','did'] },
      { words:['We','was','running','.'], wi:1, correct:'were', choices:['were','was','are','did'] } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I was sleeping when the phone rang.', type:'select', opts:['I was sleeping when the phone rang.','I slept when the phone rang.','I was sleep when the phone rang.','I sleeping when the phone rang.'], correct:0 },
      { tts:'While I was cooking, he called.', type:'select', opts:['While I was cooking, he called.','While I cooked, he called.','While I was cook, he called.','While I cooking, he called.'], correct:0 },
      { tts:'They were watching TV.', type:'select', opts:['They were watching TV.','They was watching TV.','They were watch TV.','They watching TV.'], correct:0 } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion con pasado continuo.',
    transforms:[
      { original:'sleep / phone ring', task:'Continuo + Simple', opts:['I was sleeping when the phone rang.','I slept when the phone rang.','I was sleep when the phone rang.','I sleeping when the phone rang.'], correct:0 },
      { original:'cook / he call', task:'While + continuo', opts:['While I was cooking, he called.','While I cooked, he called.','While I was cook, he called.','While I cooking, he called.'], correct:0 },
      { original:'they watch TV / I arrive', task:'Continuo + Simple', opts:['They were watching TV when I arrived.','They watched TV when I arrived.','They were watch TV when I arrived.','They watching TV when I arrived.'], correct:0 },
      { original:'she read / lights go out', task:'Continuo + Simple', opts:['She was reading when the lights went out.','She read when the lights went out.','She was read when the lights went out.','She reading when the lights went out.'], correct:0 } ] }
]);

/* topic-data-285.js - Juego 285/350 | T41 5/7 ELLIPSIS | elipsis y sustitucion en dialogos (MEZCLADO) | Diamante C1 */
_registerGames(285, 'Elipsis y Sustitucion · En Dialogos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la respuesta correcta.',
    items:[
      { src:'Ella sabe tocar el piano y su hermana tambien', opts:['She can play the piano and her sister can too play','She can play the piano and so can her sister','She can play the piano and so does her sister','She can play the piano and her sister so can'], correct:1 },
      { src:'Creo que deberiamos irnos. Yo tambien lo creo', opts:['I think we should leave. I think so too','I think we should leave. I think it too','I think we should leave. I think do so','I think we should leave. So think I'], correct:0 },
      { src:'No me gusta. A mi tampoco', opts:['I do not like it. So do I','I do not like it. Neither do I','I do not like it. Neither am I','I do not like it. Me neither do'], correct:1 },
      { src:'Necesito un boli. Toma uno', opts:['I need a pen. Take it','I need a pen. Take one','I need a pen. Take do so','I need a pen. Take such'], correct:1 },
      { src:'Has estado en Japon? No, nunca', opts:['Have you been to Japan? No, never have','Have you been to Japan? No, I have not','Have you been to Japan? No, I do not','Have you been to Japan? No, I am not'], correct:1 },
      { src:'Estoy cansado. Yo tambien', opts:['I am tired. So am I','I am tired. So do I','I am tired. Neither am I','I am tired. So I am'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"She can play the piano and so ___ her sister."', opts:['does','can','is','has'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'She can play and so ', ans:'can', post:' her sister.', bank:['can','does','is','has'] },
      { pre:'I think we should leave. I think ', ans:'so', post:' too.', bank:['so','it','do','one'] },
      { pre:'I do not like it. Neither ', ans:'do', post:' I.', bank:['do','am','have','can'] },
      { pre:'I need a pen. Take ', ans:'one', post:'.', bank:['one','it','do so','such'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['can','and','so','her','sister'],ans:['and','so','can','her','sister']},{words:['so','I','think','too'],ans:['I','think','so','too']},{words:['do','Neither','I'],ans:['Neither','do','I']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el auxiliar o sustituto incorrecto y elige la correccion.',
    sents:[
      { words:['She','can','play','and','so','does','her','sister','.'], wi:5, correct:'can', choices:['can','does','is','has'] },
      { words:['I','do','not','like','it','.','So','do','I','.'], wi:6, correct:'Neither', choices:['Neither','So','Also','Too'] },
      { words:['I','need','a','pen','.','Take','it','.'], wi:6, correct:'one', choices:['one','it','do so','such'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada respuesta es correcta.',
    stmts:[
      { text:'"She can play and so can her sister." es correcto.', ans:true, expl:'Correcto. mismo auxiliar can.' },
      { text:'"I think we should leave. I think so too." es correcto.', ans:true, expl:'Correcto. so sustituye la idea.' },
      { text:'"I do not like it. So do I." es correcto.', ans:false, expl:'Falso. Neither do I.' },
      { text:'"I need a pen. Take it." (un boli cualquiera) es correcto.', ans:false, expl:'Falso. Take one (no especifico).' } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'I am exhausted today.', blank:false },
      { speaker:1, text:null, blank:true, opts:['So am I.','So do I.','Neither am I.','So I am.'], correct:0 },
      { speaker:0, text:'I have never been to Japan.', blank:false },
      { speaker:1, text:null, blank:true, opts:['Neither have I.','So have I.','Neither do I.','Neither I have.'], correct:0 },
      { speaker:0, text:'We should go someday.', blank:false } ] }
]);

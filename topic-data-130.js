/* topic-data-130.js - Juego 130/350 | T19 4/7 IF YOU... | unless y when (ESPECIALIZADO) | Plata A2 */
_registerGames(130, 'Unless y When', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"unless" significa:', opts:['if','if not','when','because'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"unless" significa "if not".', ans:true, expl:"Correcto. Unless you study = If you don't study." },
      { text:'"Unless you study, you won\'t pass" = "If you don\'t study, you won\'t pass".', ans:true, expl:'Correcto.' },
      { text:'"Unless you don\'t study, you will fail." es correcto.', ans:false, expl:'Falso. unless ya es negativo.' },
      { text:'"when" se usa para algo seguro que pasara.', ans:true, expl:'Correcto. when = en el momento en que.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca unless o when.',
    sents:[
      { pre:'', ans:'Unless', post:' you hurry, you will be late.', bank:['Unless','When','If','Because'] },
      { pre:'', ans:'When', post:' I arrive, I will call you.', bank:['Unless','When','If','Because'] },
      { pre:"You won't pass ", ans:'unless', post:' you study.', bank:['unless','when','if','because'] },
      { pre:'Call me ', ans:'when', post:' you get home.', bank:['unless','when','if','because'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['Unless','study','you','you','will','fail'],ans:['Unless','you','study','you','will','fail']},{words:['I','will','call','when','I','arrive','you'],ans:['I','will','call','you','when','I','arrive']},{words:['hurry','Unless','you','late','will','be','you'],ans:['Unless','you','hurry','you','will','be','late']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['Unless','you','hurry','you','are','late','.'], wi:4, correct:'will be', choices:['will be','are','were','be'] },
      { words:['I','will','call','you','when','I','arrives','.'], wi:6, correct:'arrive', choices:['arrive','arrives','arrived','arriving'] },
      { words:['Unless','you','study','you','pass','.'], wi:4, correct:"won't pass", choices:["won't pass","pass","passed","passes"] } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'Unless you hurry, you will be late.', type:'select', opts:['Unless you hurry, you will be late.','If you hurry, you will be late.','When you hurry, you will be late.','Unless you hurry, you are late.'], correct:0 },
      { tts:'When I arrive, I will call you.', type:'select', opts:['When I arrive, I will call you.','When I will arrive, I will call you.','Unless I arrive, I will call you.','If I arrive, I call you.'], correct:0 },
      { tts:"You won't pass unless you study.", type:'select', opts:["You won't pass unless you study.","You won't pass unless you don't study.","You won't pass when you study.","You pass unless you study."], correct:0 } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Reescribe con unless o when.',
    transforms:[
      { original:"If you don't study, you will fail.", task:'Con unless', opts:['Unless you study, you will fail.',"Unless you don't study, you will fail.","If you study, you will fail.","When you study, you will fail."], correct:0 },
      { original:"If you don't hurry, you will be late.", task:'Con unless', opts:['Unless you hurry, you will be late.',"Unless you don't hurry, you will be late.","When you hurry, you will be late.","If you hurry, you will be late."], correct:0 },
      { original:'momento seguro: arrive / call', task:'Con when', opts:['When I arrive, I will call.','Unless I arrive, I will call.','If I will arrive, I will call.','When I will arrive, I will call.'], correct:0 },
      { original:"If you don't eat, you will be hungry.", task:'Con unless', opts:['Unless you eat, you will be hungry.',"Unless you don't eat, you will be hungry.","When you eat, you will be hungry.","If you eat, you will be hungry."], correct:0 } ] }
]);

/* topic-data-158.js - Juego 158/350 | T23 4/7 WILL & MIGHT | will vs going to (ESPECIALIZADO) | Oro B1 */
_registerGames(158, 'Will vs Going To', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Para una decision espontanea, que usas?', opts:['will','going to','would','used to'], correct:0 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"Look at those clouds, it is going to rain." es correcto.', ans:true, expl:'Correcto. going to con evidencia.' },
      { text:'"Look! It will rain." (con nubes) es la mejor opcion.', ans:false, expl:'Falso. it is going to rain.' },
      { text:'"I\'ll call you later." (decision del momento) es correcto.', ans:true, expl:'Correcto. will para decision espontanea.' },
      { text:'"I am going to call you" para una decision del momento es lo mejor.', ans:false, expl:'Falso. Decision espontanea: I will call you.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta.',
    sents:[
      { pre:'Look at the clouds! It is ', ans:'going', post:' to rain.', bank:['going','will','would','used'] },
      { pre:'The phone is ringing. I ', ans:'will', post:' answer it.', bank:['will','am going','would','used'] },
      { pre:'I have a plan. I am ', ans:'going', post:' to study tonight.', bank:['going','will','would','used'] },
      { pre:'I think she ', ans:'will', post:' win.', bank:['will','is going','would','used'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['will','I','call','you','later'],ans:['I','will','call','you','later']},{words:['going','It','is','to','rain'],ans:['It','is','going','to','rain']},{words:['will','I','answer','it'],ans:['I','will','answer','it']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['Look','It','will','rain','soon','.'], wi:2, correct:'is going to', choices:['is going to','will','would','used to'] },
      { words:['I','am','going','answer','it','.'], wi:3, correct:'to answer', choices:['to answer','answer','answering','answered'] },
      { words:['She','wills','come','.'], wi:1, correct:'will', choices:['will','wills','will to','willing'] } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'It is going to rain.', type:'select', opts:['It is going to rain.','It will rain going to.','It going to rain.','It is go to rain.'], correct:0 },
      { tts:"I'll answer the phone.", type:'select', opts:["I'll answer the phone.","I'll to answer the phone.","I answer the phone will.","I'll answering the phone."], correct:0 },
      { tts:'I am going to study tonight.', type:'select', opts:['I am going to study tonight.','I will going to study tonight.','I am go to study tonight.','I going to study tonight.'], correct:0 } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige will o going to.',
    transforms:[
      { original:'evidencia: clouds / rain', task:'will o going to', opts:['It is going to rain.','It will rain.','It will to rain.','It going to rain.'], correct:0 },
      { original:'espontaneo: phone / answer', task:'will o going to', opts:["I'll answer it.","I am going to answer it.","I answer it.","I will to answer it."], correct:0 },
      { original:'plan: study tonight', task:'will o going to', opts:['I am going to study tonight.','I will study going to.','I study tonight.','I am go to study tonight.'], correct:0 },
      { original:'prediccion: she / win', task:'will o going to', opts:['I think she will win.','I think she is going win.','I think she win.','I think she will to win.'], correct:0 } ] }
]);

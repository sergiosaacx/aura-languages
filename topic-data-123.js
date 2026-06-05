/* topic-data-123.js - Juego 123/350 | T18 4/7 CAN YOU? | should/shouldn't (ESPECIALIZADO) | Plata A2 */
_registerGames(123, "Should / Shouldn't · Consejos", [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['You should to sleep','You should sleep','You shoulds sleep','You should sleeping'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'Despues de "should" va el infinitivo sin "to".', ans:true, expl:'Correcto. You should sleep.' },
      { text:'"You should to sleep more." es correcto.', ans:false, expl:'Falso. should sleep (sin to).' },
      { text:'"She shouldn\'t eat so much sugar." es correcto.', ans:true, expl:"Correcto. shouldn't + infinitivo." },
      { text:'"He should studies." es correcto.', ans:false, expl:'Falso. He should study.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'You ', ans:'should', post:' drink more water.', bank:['should','should to','shoulds','have'] },
      { pre:'She ', ans:"shouldn't", post:' eat so much sugar.', bank:["shouldn't","should to","shoulds","shouldnt to"] },
      { pre:'We ', ans:'should', post:' study tonight.', bank:['should','should to','shoulds','have'] },
      { pre:'He ', ans:"shouldn't", post:' smoke.', bank:["shouldn't","should to","shoulds","shouldnt to"] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['should','You','rest'],ans:['You','should','rest']},{words:["shouldn't",'She','smoke'],ans:['She',"shouldn't",'smoke']},{words:['should','We','help','them'],ans:['We','should','help','them']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['You','should','sleeps','.'], wi:2, correct:'sleep', choices:['sleep','sleeps','sleeping','slept'] },
      { words:['She','shoulds','study','.'], wi:1, correct:'should', choices:['should','shoulds','should to','shoulding'] },
      { words:['He','should','studies','.'], wi:2, correct:'study', choices:['study','studies','studying','studied'] } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'You should drink more water.', type:'select', opts:['You should drink more water.','You should to drink more water.','You shoulds drink more water.','You should drinking more water.'], correct:0 },
      { tts:"She shouldn't eat so much.", type:'select', opts:["She shouldn't eat so much.","She shouldn't to eat so much.","She shoulds not eat so much.","She shouldn't eating so much."], correct:0 },
      { tts:'We should study tonight.', type:'select', opts:['We should study tonight.','We should to study tonight.','We shoulds study tonight.','We should studying tonight.'], correct:0 } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Da un consejo con should/shouldn\'t.',
    transforms:[
      { original:'consejo: drink water', task:'Con should', opts:['You should drink water.','You should to drink water.','You shoulds drink water.','You should drinking water.'], correct:0 },
      { original:'consejo negativo: not smoke', task:"Con shouldn't", opts:["You shouldn't smoke.","You shouldn't to smoke.","You shoulds not smoke.","You shouldn't smoking."], correct:0 },
      { original:'consejo: rest more', task:'Con should', opts:['You should rest more.','You should to rest more.','You shoulds rest more.','You should resting more.'], correct:0 },
      { original:'consejo negativo: not worry', task:"Con shouldn't", opts:["You shouldn't worry.","You shouldn't to worry.","You shoulds not worry.","You shouldn't worrying."], correct:0 } ] }
]);

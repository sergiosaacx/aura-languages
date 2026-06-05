/* topic-data-128.js - Juego 128/350 | T19 2/7 IF YOU... | Condicional 1 (ESPECIALIZADO) | Plata A2 */
_registerGames(128, 'Condicional 1 · Situaciones Reales', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'En el condicional 1, que va en la clausula principal?', opts:['present','will + infinitivo','would + infinitivo','past'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada clausula if con su resultado.',
    pairs:[ ['If it rains','I will stay home'],['If you study','you will pass'],['If she comes','we will be happy'],['If I have time','I will call you'],['If they win','they will celebrate'],['If we hurry','we will catch the bus'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['will','If','it','rains','I','stay'],ans:['If','it','rains','I','will','stay']},{words:['will','If','you','study','you','pass'],ans:['If','you','study','you','will','pass']},{words:['will','I','call','you','if','I','have','time'],ans:['I','will','call','you','if','I','have','time']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['If','it','rain','I','will','stay','.'], wi:2, correct:'rains', choices:['rains','rain','will rain','rained'] },
      { words:['If','you','study','you','pass','.'], wi:4, correct:'will pass', choices:['will pass','pass','passed','passing'] },
      { words:['If','she','comes','we','will','celebrating','.'], wi:5, correct:'celebrate', choices:['celebrate','celebrating','celebrated','celebrates'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada parte segun su tiempo verbal.',
    categories:['Clausula if (present)','Clausula principal (will)'],
    items:[ {text:'it rains',correct:0},{text:'I will stay',correct:1},{text:'you study',correct:0},{text:'you will pass',correct:1},{text:'she comes',correct:0},{text:'we will go',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'If it rains, I will stay home.', type:'select', opts:['If it rains, I will stay home.','If it will rain, I will stay home.','If it rains, I stay home.','If it rained, I will stay home.'], correct:0 },
      { tts:'If you study, you will pass.', type:'select', opts:['If you study, you will pass.','If you will study, you will pass.','If you study, you pass.','If you studied, you will pass.'], correct:0 },
      { tts:'I will call you if I have time.', type:'select', opts:['I will call you if I have time.','I will call you if I will have time.','I call you if I have time.','I will call you if I had time.'], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'If it rains, I ', ans:'will', post:' stay home.', bank:['will','am','do','would'] },
      { pre:'If you ', ans:'study', post:', you will pass.', bank:['study','will study','studied','studying'] },
      { pre:'She will be happy if she ', ans:'comes', post:'.', bank:['comes','will come','came','coming'] },
      { pre:'We ', ans:'will', post:' help if you ask.', bank:['will','are','do','would'] } ] }
]);

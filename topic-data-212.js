/* topic-data-212.js - Juego 212/350 | T31 2/7 PERFECT TIMING | Pasado Perfecto Continuo (ESPECIALIZADO) | Platino B2 */
_registerGames(212, 'Pasado Perfecto Continuo', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'She was tired because she ___ all day.', opts:['had worked','had been working','was working','has been working'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'She was tired because she had been ', ans:'working', post:' all day.', bank:['working','worked','work','works'] },
      { pre:'They had been ', ans:'waiting', post:' for hours.', bank:['waiting','waited','wait','waits'] },
      { pre:'He was wet because it ', ans:'had been raining', post:'.', bank:['had been raining','had rained','was raining','has been raining'] },
      { pre:'I had been ', ans:'studying', post:' before the exam.', bank:['studying','studied','study','studies'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada situacion con su causa en Pasado Perfecto Continuo.',
    pairs:[ ['she was tired','had been working'],['they were bored','had been waiting'],['the ground was wet','had been raining'],['his eyes were red','had been crying'],['I was nervous','had been studying'],['we were hungry','had been cooking'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['been','She','had','working','all','day'],ans:['She','had','been','working','all','day']},{words:['been','They','had','waiting'],ans:['They','had','been','waiting']},{words:['been','It','had','raining'],ans:['It','had','been','raining']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['She','had','working','all','day','.'], wi:2, correct:'been working', choices:['been working','working','work','worked'] },
      { words:['They','had','been','wait','.'], wi:3, correct:'waiting', choices:['waiting','wait','waited','waits'] },
      { words:['It','had','rained','all','night','.'], wi:2, correct:'been raining', choices:['been raining','rained','raining','rains'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'El Pasado Perfecto Continuo se forma con "had been + -ing".', ans:true, expl:'Correcto.' },
      { text:'"She had been working all day." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"She had working all day." es correcto.', ans:false, expl:'Falso. had been working.' },
      { text:'El Pasado Perfecto Continuo enfatiza la duracion.', ans:true, expl:'Correcto.' } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'She had been working all day.', type:'select', opts:['She had been working all day.','She had working all day.','She has been working all day.','She was working all day.'], correct:0 },
      { tts:'They had been waiting for hours.', type:'select', opts:['They had been waiting for hours.','They had waiting for hours.','They have been waiting for hours.','They were waiting for hours.'], correct:0 },
      { tts:'It had been raining all night.', type:'select', opts:['It had been raining all night.','It had raining all night.','It has been raining all night.','It was raining all night.'], correct:0 } ] }
]);

/* topic-data-222.js - Juego 222/350 | T32 5/7 IF ONLY | cond 3 y mixtos en oraciones (MEZCLADO) | Platino B2 */
_registerGames(222, 'Condicional 3 y Mixtos · En Oraciones', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"If she had taken the job, she would be living in Paris now" es...', opts:['Cond. 2','Cond. 3','mixto','Cond. 1'], correct:2 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'If she had taken the job, she would be ', ans:'living', post:' in Paris now.', bank:['living','live','lived','to live'] },
      { pre:'I wish I ', ans:'had not said', post:' that.', bank:['had not said','did not say','do not say','will not say'] },
      { pre:'If I had known, I ', ans:'would have helped', post:'.', bank:['would have helped','would help','will help','had helped'] },
      { pre:'If he had left earlier, he ', ans:'would be', post:' here now.', bank:['would be','would have been','will be','is'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada inicio con su final correcto.',
    pairs:[ ['If she had taken the job','she would be in Paris now'],['If I had studied','I would have passed'],['I wish I','had not said that'],['If he had slept','he would not be tired'],['If they had called','I would have come'],['If I had saved','I would be rich now'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['have','If','I','had','known','I','would','helped'],ans:['If','I','had','known','I','would','have','helped']},{words:['be','If','she','had','left','she','would','here','now'],ans:['If','she','had','left','she','would','be','here','now']},{words:['said','I','wish','I','had','not','that'],ans:['I','wish','I','had','not','said','that']} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion correcta.',
    transforms:[
      { original:'cond 3: study / pass', task:'Forma', opts:['If I had studied, I would have passed.','If I studied, I would pass.','If I had studied, I would pass.','If I have studied, I would have passed.'], correct:0 },
      { original:'mixto: take job / live Paris now', task:'Forma', opts:['If she had taken the job, she would be living in Paris now.','If she took the job, she would live in Paris now.','If she had taken the job, she would have lived in Paris.','If she takes the job, she will live in Paris.'], correct:0 },
      { original:'wish pasado: not say that', task:'Forma', opts:['I wish I had not said that.','I wish I did not say that.','I wish I do not say that.','I wish I would not say that.'], correct:0 },
      { original:'mixto: sleep / not tired now', task:'Forma', opts:['If I had slept, I would not be tired now.','If I slept, I would not be tired.','If I had slept, I would not have been tired.','If I sleep, I will not be tired.'], correct:0 } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada oracion por su tipo.',
    categories:['Condicional 3','Mixto','Wish'],
    items:[ {text:'If I had studied, I would have passed',correct:0},{text:'If I had slept, I would not be tired now',correct:1},{text:'I wish I had not said that',correct:2},{text:'If you had called, I would have come',correct:0},{text:'If she had taken it, she would be here now',correct:1},{text:'I wish I were taller',correct:2} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'If she had taken the job, she would be living in Paris now.', type:'select', opts:['If she had taken the job, she would be living in Paris now.','If she took the job, she would live in Paris now.','If she had taken the job, she would have lived in Paris.','If she takes the job, she will live in Paris.'], correct:0 },
      { tts:'I wish I had not said that.', type:'select', opts:['I wish I had not said that.','I wish I did not say that.','I wish I do not say that.','I wish I would not say that.'], correct:0 },
      { tts:'If I had known, I would have helped.', type:'select', opts:['If I had known, I would have helped.','If I knew, I would help.','If I had known, I would help.','If I have known, I would have helped.'], correct:0 } ] }
]);

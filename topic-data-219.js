/* topic-data-219.js - Juego 219/350 | T32 2/7 IF ONLY | condicionales mixtos (ESPECIALIZADO) | Platino B2 */
_registerGames(219, 'Condicionales Mixtos', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"If I had studied medicine, I would be a doctor now." es...', opts:['Cond. 2','Cond. 3','condicional mixto','Cond. 1'], correct:2 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'If I had studied medicine, I ', ans:'would be', post:' a doctor now.', bank:['would be','would have been','will be','am'] },
      { pre:'If I ', ans:'had taken', post:' the job, I would be rich now.', bank:['had taken','took','take','have taken'] },
      { pre:'If she were more careful, she ', ans:'would not have', post:' had the accident.', bank:['would not have','would not','will not','had not'] },
      { pre:'If he were not so lazy, he ', ans:'would have finished', post:' yesterday.', bank:['would have finished','would finish','will finish','had finished'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada condicion con su resultado.',
    pairs:[ ['If I had studied medicine','I would be a doctor now'],['If I had saved money','I would be rich now'],['If she were taller','she would have joined the team'],['If I had slept','I would not be tired now'],['If he were smart','he would have noticed'],['If they had left earlier','they would be here now'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['be','If','I','had','studied','I','would','a','doctor','now'],ans:['If','I','had','studied','I','would','be','a','doctor','now']},{words:['rich','If','I','had','saved','I','would','be','now'],ans:['If','I','had','saved','I','would','be','rich','now']},{words:['tired','If','I','had','slept','I','would','not','be','now'],ans:['If','I','had','slept','I','would','not','be','tired','now']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['If','I','had','studied','I','will','be','a','doctor','now','.'], wi:5, correct:'would', choices:['would','will','had','have'] },
      { words:['If','I','had','saved','I','would','been','rich','now','.'], wi:6, correct:'be', choices:['be','been','was','am'] },
      { words:['If','I','slept','I','would','not','be','tired','now','.'], wi:2, correct:'had slept', choices:['had slept','slept','sleep','have slept'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'Un condicional mixto puede unir un pasado hipotetico con un resultado presente.', ans:true, expl:'Correcto.' },
      { text:'"If I had studied medicine, I would be a doctor now." es un condicional mixto.', ans:true, expl:'Correcto.' },
      { text:'En un condicional mixto la clausula if siempre usa "will".', ans:false, expl:'Falso. usa past perfect o past simple.' },
      { text:'El resultado presente de un mixto usa "would + infinitivo".', ans:true, expl:'Correcto. would be.' } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'If I had studied medicine, I would be a doctor now.', type:'select', opts:['If I had studied medicine, I would be a doctor now.','If I studied medicine, I would be a doctor now.','If I had studied medicine, I will be a doctor now.','If I have studied medicine, I would be a doctor now.'], correct:0 },
      { tts:'If I had saved money, I would be rich now.', type:'select', opts:['If I had saved money, I would be rich now.','If I saved money, I would be rich now.','If I had saved money, I will be rich now.','If I have saved money, I would be rich now.'], correct:0 },
      { tts:'If I had slept, I would not be tired now.', type:'select', opts:['If I had slept, I would not be tired now.','If I slept, I would not be tired now.','If I had slept, I will not be tired now.','If I have slept, I would not be tired now.'], correct:0 } ] }
]);

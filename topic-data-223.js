/* topic-data-223.js - Juego 223/350 | T32 6/7 IF ONLY | cond 3, mixtos y wish en contexto (MEZCLADO) | Platino B2 */
_registerGames(223, 'Cond. 3, Mixtos y Wish · En Contexto', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Si hubiera estudiado mas, habria aprobado', opts:['If he studied harder, he would pass','If he had studied harder, he would have passed','If he had studied harder, he would pass','If he has studied harder, he would have passed'], correct:1 },
      { src:'Ojala no hubiera dicho esas cosas', opts:['I wish I did not say those things','I wish I had not said those things','I wish I do not say those things','I wish I would not say those things'], correct:1 },
      { src:'Si tuviera tiempo, te ayudaria', opts:['If I had time, I would help you','If I had had time, I would have helped you','If I have time, I will help you','If I had time, I will help you'], correct:0 },
      { src:'Si hubiera dormido, no estaria cansado ahora', opts:['If I slept, I would not be tired now','If I had slept, I would not be tired now','If I had slept, I would not have been tired','If I sleep, I will not be tired'], correct:1 },
      { src:'Ojala fuera mas paciente', opts:['I wish I am more patient','I wish I were more patient','I wish I had been more patient','I wish I will be more patient'], correct:1 },
      { src:'Si me lo hubieras dicho, habria entendido', opts:['If you told me, I would understand','If you had told me, I would have understood','If you had told me, I would understand','If you have told me, I would have understood'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'If he ___ harder, he would have passed.', opts:['studied','had studied','studies','has studied'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'If he ', ans:'had studied', post:' harder, he would have passed.', bank:['had studied','studied','studies','has studied'] },
      { pre:'I wish I ', ans:'had not said', post:' those things.', bank:['had not said','did not say','do not say','will not say'] },
      { pre:'If I had slept, I would not ', ans:'be', post:' tired now.', bank:['be','have been','being','am'] },
      { pre:'If you had told me, I would have ', ans:'understood', post:'.', bank:['understood','understand','understanding','understands'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['have','If','he','had','studied','he','would','passed'],ans:['If','he','had','studied','he','would','have','passed']},{words:['said','I','wish','I','had','not','those','things'],ans:['I','wish','I','had','not','said','those','things']},{words:['be','If','I','had','slept','I','would','not','tired','now'],ans:['If','I','had','slept','I','would','not','be','tired','now']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['If','he','studied','harder','he','would','have','passed','.'], wi:2, correct:'had studied', choices:['had studied','studied','studies','has studied'] },
      { words:['I','wish','I','had','not','say','that','.'], wi:5, correct:'said', choices:['said','say','saying','says'] },
      { words:['If','you','told','me','I','would','have','understood','.'], wi:2, correct:'had told', choices:['had told','told','tell','have told'] } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Why did he fail?', blank:false },
      { speaker:1, text:null, blank:true, opts:['If he had studied harder, he would have passed.','If he studied harder, he would pass.','If he had studied harder, he would pass.','If he has studied harder, he would have passed.'], correct:0 },
      { speaker:0, text:'Do you regret your words?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I wish I had not said those things.','Yes, I wish I did not say those things.','Yes, I wish I do not say those things.','Yes, I wish I would not say those things.'], correct:0 },
      { speaker:0, text:'I understand.', blank:false } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['D','A','H'],ans:'HAD',hint:'if + ... + participio'},{scrambled:['D','L','U','O','W'],ans:'WOULD',hint:'resultado'},{scrambled:['D','O','O','T','S','R','E','D','N','U'],ans:'UNDERSTOOD',hint:'participio de understand'},{scrambled:['H','S','I','W'],ans:'WISH',hint:'ojala'} ] }
]);

/* topic-data-272.js - Juego 272/350 | T39 6/7 INVERSION | enfasis en contexto literario y formal (MEZCLADO) | Diamante C1 */
_registerGames(272, 'Enfasis en Contexto Literario y Formal', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Never ___ I seen such courage." (tiempo pasado)', opts:['have','had','was','did'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta segun el tiempo.',
    sents:[
      { pre:'Never ', ans:'had', post:' I seen such courage.', bank:['had','have','was','did'] },
      { pre:'It ', ans:'was', post:' the manager who made the final decision.', bank:['was','is','were','had'] },
      { pre:'Seldom ', ans:'does', post:' one witness such kindness.', bank:['does','do','did','is'] },
      { pre:'Only later ', ans:'did', post:' he realise the truth.', bank:['did','was','had','does'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada inicio enfatico con su auxiliar.',
    pairs:[ ['Never ... I seen','had'],['Seldom ... one witness','does'],['Only later ... he realise','did'],['It ... the manager who decided','was'],['Rarely ... we find','do'],['No sooner ... I arrived','had then'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['had','Never','I','seen','such','courage'],ans:['Never','had','I','seen','such','courage']},{words:['was','It','the','manager','who','decided'],ans:['It','was','the','manager','who','decided']},{words:['did','Only','later','he','realise'],ans:['Only','later','did','he','realise']} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"Never had I seen such courage." es correcto.', ans:true, expl:'Correcto. tiempo pasado.' },
      { text:'"It was the manager who made the decision." es correcto.', ans:true, expl:'Correcto. cleft.' },
      { text:'"Never have I saw such courage." es correcto.', ans:false, expl:'Falso. Never had I seen.' },
      { text:'"Only later did he realised the truth." es correcto.', ans:false, expl:'Falso. did he realise (base).' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Reescribe con enfasis.',
    transforms:[
      { original:'I had never seen such courage.', task:'Inversion', opts:['Never had I seen such courage.','Never I had seen such courage.','Never have I seen such courage.','Never was I seen such courage.'], correct:0 },
      { original:'The manager made the decision.', task:'Cleft', opts:['It was the manager who made the decision.','It was the manager which made it.','It was the manager he made it.','It was the manager that made him.'], correct:0 },
      { original:'He realised the truth only later.', task:'Inversion', opts:['Only later did he realise the truth.','Only later he realised the truth.','Only later was he realise.','Only later he did realise.'], correct:0 },
      { original:'One seldom witnesses such kindness.', task:'Inversion', opts:['Seldom does one witness such kindness.','Seldom one witnesses such kindness.','Seldom witnesses one kindness.','Seldom one does witness.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo de registro formal.', speakers:['Narrador','Lector'],
    lines:[
      { speaker:0, text:'How to emphasise that he never saw such bravery?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Never had he seen such bravery.','Never he had seen such bravery.','Never have he seen such bravery.','Never did he saw such bravery.'], correct:0 },
      { speaker:0, text:'And to stress who decided?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It was the manager who decided.','It was the manager which decided.','It was the manager he decided.','It was the manager that decided him.'], correct:0 },
      { speaker:0, text:'Elegant.', blank:false } ] }
]);

/* topic-data-267.js - Juego 267/350 | T39 1/7 INVERSION | adverbios negativos (ESPECIALIZADO) | Diamante C1 */
_registerGames(267, 'Inversion con Adverbios Negativos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion con inversion correcta.',
    items:[
      { src:'Nunca habia visto algo asi', opts:['Never I had seen such a thing','Never had I seen such a thing','Never I have seen such a thing','Never did I saw such a thing'], correct:1 },
      { src:'Rara vez sale tan tarde', opts:['Rarely he goes out so late','Rarely does he go out so late','Rarely he does go out so late','Rarely goes he out so late'], correct:1 },
      { src:'No solo llego tarde, sino que olvido el trabajo', opts:['Not only she was late, but she forgot the work','Not only was she late, but she also forgot the work','Not only she late was, but forgot the work','Not only late she was, but forgot'], correct:1 },
      { src:'Apenas habia llegado cuando empezo a llover', opts:['Hardly I had arrived when it started raining','Hardly had I arrived when it started raining','Hardly I arrived when it started','Hardly did I arrived when it rained'], correct:1 },
      { src:'No bien sali, llamo', opts:['No sooner I left than he called','No sooner had I left than he called','No sooner I had left than he called','No sooner did I left than he called'], correct:1 },
      { src:'En ningun momento se quejo', opts:['At no time he complained','At no time did he complain','At no time he did complain','At no time complained he'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Tras un adverbio negativo al inicio, el orden es...', opts:['sujeto + verbo','auxiliar + sujeto + verbo','verbo + sujeto','sin cambios'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el auxiliar correcto para la inversion.',
    sents:[
      { pre:'Never ', ans:'had', post:' I seen such a thing.', bank:['had','I','have','did'] },
      { pre:'Rarely ', ans:'does', post:' he go out so late.', bank:['does','he','is','did'] },
      { pre:'Hardly ', ans:'had', post:' I arrived when it rained.', bank:['had','I','have','did'] },
      { pre:'Not only ', ans:'was', post:' she late, but she forgot the work.', bank:['was','she','did','had'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el adverbio negativo.',
    words:[ {scrambled:['R','E','V','E','N'],ans:'NEVER',hint:'nunca + inversion'},{scrambled:['Y','L','E','R','A','R'],ans:'RARELY',hint:'rara vez'},{scrambled:['M','O','D','L','E','S'],ans:'SELDOM',hint:'rara vez (formal)'},{scrambled:['Y','L','D','R','A','H'],ans:'HARDLY',hint:'apenas'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"Never had I seen such a thing." es correcto.', ans:true, expl:'Correcto. inversion con never.' },
      { text:'"Never I had seen such a thing." es correcto.', ans:false, expl:'Falso. Never had I seen (inversion).' },
      { text:'"Rarely does he go out." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"Hardly I had arrived when it rained." es correcto.', ans:false, expl:'Falso. Hardly had I arrived.' } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['I','Never','had','seen','it'],ans:['Never','had','I','seen','it']},{words:['he','Rarely','does','go','out'],ans:['Rarely','does','he','go','out']},{words:['I','Hardly','had','arrived'],ans:['Hardly','had','I','arrived']} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Reescribe con inversion.',
    transforms:[
      { original:'I had never seen such a thing.', task:'Inversion', opts:['Never had I seen such a thing.','Never I had seen such a thing.','Never have I seen such a thing.','Never did I saw such a thing.'], correct:0 },
      { original:'He rarely goes out so late.', task:'Inversion', opts:['Rarely does he go out so late.','Rarely he goes out so late.','Rarely goes he out so late.','Rarely he does go out.'], correct:0 },
      { original:'I had hardly arrived when it rained.', task:'Inversion', opts:['Hardly had I arrived when it rained.','Hardly I had arrived when it rained.','Hardly did I arrive when it rained.','Hardly I arrived when it rained.'], correct:0 },
      { original:'She was not only late but also forgot.', task:'Inversion', opts:['Not only was she late, but she also forgot.','Not only she was late, but forgot.','Not only late she was, but forgot.','Not only she late was, but forgot.'], correct:0 } ] }
]);

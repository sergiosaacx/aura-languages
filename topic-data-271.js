/* topic-data-271.js - Juego 271/350 | T39 5/7 INVERSION | inversiones y cleft en oraciones (MEZCLADO) | Diamante C1 */
_registerGames(271, 'Inversiones y Cleft Sentences · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'No solo gano el premio, sino que tambien batio el record', opts:['Not only she won the prize, but she also broke the record','Not only did she win the prize, but she also broke the record','Not only won she the prize, but broke the record','Not only she did win the prize, but broke it'], correct:1 },
      { src:'Fue en Paris donde se conocieron por primera vez', opts:['It was in Paris that they first met','It was in Paris who they first met','It was Paris they first met','It was in Paris where met first'], correct:0 },
      { src:'Nunca habia estado tan feliz', opts:['Never I had been so happy','Never had I been so happy','Never was I been so happy','Never I was so happy'], correct:1 },
      { src:'Fue Juan quien lo hizo', opts:['It was Juan who did it','It was Juan which did it','It was Juan he did it','It was Juan that did him'], correct:0 },
      { src:'Apenas se sento cuando sono el telefono', opts:['Hardly he had sat when the phone rang','Hardly had he sat when the phone rang','Hardly he sat when the phone rang','Hardly did he sat when it rang'], correct:1 },
      { src:'Fue el dinero lo que perdieron', opts:['It was the money who they lost','It was the money that they lost','It was the money they lost it','It was money that lost them'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Not only ___ she win, but she also broke the record."', opts:['did','was','had','does'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta.',
    sents:[
      { pre:'Not only ', ans:'did', post:' she win, but she also broke the record.', bank:['did','was','had','does'] },
      { pre:'It was in Paris ', ans:'that', post:' they first met.', bank:['that','who','where','which'] },
      { pre:'Never ', ans:'had', post:' I been so happy.', bank:['had','was','did','have'] },
      { pre:'It was Juan ', ans:'who', post:' did it.', bank:['who','which','that he','where'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['did','Not','only','she','win','but','also','broke'],ans:['Not','only','did','she','win','but','also','broke']},{words:['that','It','was','in','Paris','they','met'],ans:['It','was','in','Paris','that','they','met']},{words:['had','Never','I','been','happier'],ans:['Never','had','I','been','happier']} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Reescribe con inversion o cleft.',
    transforms:[
      { original:'She won and also broke the record.', task:'Inversion', opts:['Not only did she win, but she also broke the record.','Not only she won, but broke the record.','Not only won she, but broke the record.','Not only she did win, but broke it.'], correct:0 },
      { original:'They first met in Paris.', task:'Cleft', opts:['It was in Paris that they first met.','It was in Paris who they first met.','It was Paris they first met.','It was in Paris where met.'], correct:0 },
      { original:'I had never been so happy.', task:'Inversion', opts:['Never had I been so happy.','Never I had been so happy.','Never was I been so happy.','Never I was so happy.'], correct:0 },
      { original:'Juan did it.', task:'Cleft', opts:['It was Juan who did it.','It was Juan which did it.','It was Juan he did it.','It was Juan that did him.'], correct:0 } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"Not only did she win, but she also broke the record." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"It was in Paris who they met." es correcto.', ans:false, expl:'Falso. that, no who, para lugar.' },
      { text:'"Never had I been so happy." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"Not only she won, but broke the record." es correcto.', ans:false, expl:'Falso. Not only did she win.' } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['D','I','D'],ans:'DID',hint:'Not only ... she win'},{scrambled:['T','A','H','T'],ans:'THAT',hint:'It was in Paris ...'},{scrambled:['O','H','W'],ans:'WHO',hint:'It was Juan ...'},{scrambled:['D','A','H'],ans:'HAD',hint:'Never ... I been'} ] }
]);

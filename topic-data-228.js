/* topic-data-228.js - Juego 228/350 | T33 4/7 THE PASSIVE GAME | estructuras impersonales (ESPECIALIZADO) | Platino B2 */
_registerGames(228, 'Estructuras Impersonales · It is said that', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Se dice que el es rico', opts:['It says that he is rich','It is said that he is rich','He says that he is rich','It is say that he is rich'], correct:1 },
      { src:'Se cree que ella es brillante', opts:['It believes that she is brilliant','It is believed that she is brilliant','She is believe brilliant','It is belief that she is brilliant'], correct:1 },
      { src:'Se informa que la economia mejorara', opts:['It reports the economy will improve','It is reported that the economy will improve','The economy is report to improve','It is report that the economy will improve'], correct:1 },
      { src:'Se dice que el es rico (forma 2)', opts:['He is said to be rich','He says to be rich','He is said that he is rich','He is say to be rich'], correct:0 },
      { src:'Se cree que ella vive aqui', opts:['She is believed to live here','She believes to live here','She is believe to live here','It believes she lives here'], correct:0 },
      { src:'Se sabe que es peligroso', opts:['It knows that it is dangerous','It is known that it is dangerous','It is know that it is dangerous','It known that it is dangerous'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"It is said that he is rich" equivale a...', opts:['He is said to be rich','He says he is rich','It says he is rich','He is said that rich'], correct:0 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada forma impersonal con su equivalente.',
    pairs:[ ['It is said that he is rich','He is said to be rich'],['It is believed that she is smart','She is believed to be smart'],['It is known that it is safe','It is known to be safe'],['It is thought that they left','They are thought to have left'],['It is reported that it works','It is reported to work'],['It is said that she sings','She is said to sing'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'It is ', ans:'said', post:' that he is rich.', bank:['said','says','say','saying'] },
      { pre:'He is said to ', ans:'be', post:' rich.', bank:['be','is','being','been'] },
      { pre:'It is ', ans:'believed', post:' that she is smart.', bank:['believed','believes','believe','belief'] },
      { pre:'She is ', ans:'believed', post:' to be smart.', bank:['believed','believes','believe','beliefs'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['D','I','A','S'],ans:'SAID',hint:'it is ... that'},{scrambled:['D','E','V','E','I','L','E','B'],ans:'BELIEVED',hint:'it is ... that'},{scrambled:['N','W','O','N','K'],ans:'KNOWN',hint:'it is ... that'},{scrambled:['E','B'],ans:'BE',hint:'said to ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"It is said that he is rich" y "He is said to be rich" son equivalentes.', ans:true, expl:'Correcto. dos formas impersonales.' },
      { text:'"He is said that he is rich." es correcto.', ans:false, expl:'Falso. He is said to be rich.' },
      { text:'"It is believed that she is smart." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"It is said to be rich." (sin sujeto personal) es correcto.', ans:false, expl:'Falso. He is said to be rich.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Pasa a la forma con sujeto personal.',
    transforms:[
      { original:'It is said that he is rich.', task:'Forma 2', opts:['He is said to be rich.','He says to be rich.','He is said that rich.','He is say to be rich.'], correct:0 },
      { original:'It is believed that she is smart.', task:'Forma 2', opts:['She is believed to be smart.','She believes to be smart.','She is believe to be smart.','It believes she is smart.'], correct:0 },
      { original:'It is known that it is safe.', task:'Forma 2', opts:['It is known to be safe.','It knows to be safe.','It is know to be safe.','It is known that safe.'], correct:0 },
      { original:'It is thought that he is honest.', task:'Forma 2', opts:['He is thought to be honest.','He thinks to be honest.','He is thought that honest.','He is think to be honest.'], correct:0 } ] }
]);

/* topic-data-229.js - Juego 229/350 | T33 5/7 THE PASSIVE GAME | pasivas complejas en contexto formal (MEZCLADO) | Platino B2 */
_registerGames(229, 'Pasivas Complejas · Contexto Formal', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la pasiva correcta.',
    items:[
      { src:'Los resultados habran sido anunciados manana', opts:['The results will announce by tomorrow','The results will have been announced by tomorrow','The results have been announced tomorrow','The results are announced by tomorrow'], correct:1 },
      { src:'Se cree que la economia mejorara', opts:['It believes the economy will improve','It is believed that the economy will improve','The economy is believe to improve','It is belief the economy improves'], correct:1 },
      { src:'El edificio esta siendo construido', opts:['The building is built','The building is being built','The building has been built','The building will be built'], correct:1 },
      { src:'El informe debe ser revisado', opts:['The report must reviewed','The report must be reviewed','The report must been reviewed','The report must review'], correct:1 },
      { src:'La decision ha sido tomada', opts:['The decision is made','The decision has been made','The decision was make','The decision will made'], correct:1 },
      { src:'Se dice que es el mejor', opts:['It says he is the best','It is said the best','He is said to be the best','He says to be the best'], correct:2 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'The results will have been ___ by tomorrow.', opts:['announce','announced','announcing','announces'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'The results will have been ', ans:'announced', post:' by tomorrow.', bank:['announced','announce','announcing','announces'] },
      { pre:'It is ', ans:'believed', post:' that the economy will improve.', bank:['believed','believes','believe','belief'] },
      { pre:'The building is being ', ans:'built', post:'.', bank:['built','build','building','builds'] },
      { pre:'The report must be ', ans:'reviewed', post:'.', bank:['reviewed','review','reviewing','reviews'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['announced','The','results','will','have','been'],ans:['The','results','will','have','been','announced']},{words:['built','The','building','is','being'],ans:['The','building','is','being','built']},{words:['reviewed','The','report','must','be'],ans:['The','report','must','be','reviewed']} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la pasiva correcta.',
    transforms:[
      { original:'announce results (futuro perfecto)', task:'Pasiva', opts:['The results will have been announced.','The results will announce.','The results have been announced.','The results are announced.'], correct:0 },
      { original:'build building (continuo)', task:'Pasiva', opts:['The building is being built.','The building is built.','The building has been built.','The building will be built.'], correct:0 },
      { original:'review report (modal)', task:'Pasiva', opts:['The report must be reviewed.','The report must reviewed.','The report must been reviewed.','The report must review.'], correct:0 },
      { original:'believe economy improves (impersonal)', task:'Pasiva', opts:['It is believed that the economy will improve.','It believes the economy improves.','The economy is believe to improve.','It is belief the economy improves.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'When will we know the results?', blank:false },
      { speaker:1, text:null, blank:true, opts:['They will have been announced by tomorrow.','They will announce by tomorrow.','They have been announced tomorrow.','They are announced by tomorrow.'], correct:0 },
      { speaker:0, text:'What about the economy?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It is believed that it will improve.','It believes that it will improve.','It is belief it will improve.','It believe it will improve.'], correct:0 },
      { speaker:0, text:'Let us hope so.', blank:false } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['N','E','E','B'],ans:'BEEN',hint:'will have ...'},{scrambled:['G','N','I','E','B'],ans:'BEING',hint:'is ... built'},{scrambled:['D','E','C','N','U','O','N','N','A'],ans:'ANNOUNCED',hint:'participio de announce'},{scrambled:['E','B'],ans:'BE',hint:'must ... reviewed'} ] }
]);

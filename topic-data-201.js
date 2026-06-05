/* topic-data-201.js - Juego 201/350 | T29 5/7 LINK IT UP | marcadores y relativos en oraciones (MEZCLADO) | Oro B1 */
_registerGames(201, 'Marcadores y Relativos · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Sin embargo, los resultados fueron malos', opts:['However, the results were bad','Therefore, the results were bad','Moreover, the results were bad','Because the results were bad'], correct:0 },
      { src:'La mujer cuyo coche fue robado llamo', opts:['The woman who car was stolen called','The woman whose car was stolen called','The woman which car was stolen called','The woman where car was stolen called'], correct:1 },
      { src:'El hombre que vive aqui es medico', opts:['The man which lives here is a doctor','The man who lives here is a doctor','The man where lives here is a doctor','The man whose lives here is a doctor'], correct:1 },
      { src:'Estudio mucho; por lo tanto, aprobo', opts:['He studied hard; however, he passed','He studied hard; therefore, he passed','He studied hard; moreover, he passed','He studied hard; although he passed'], correct:1 },
      { src:'El libro que lei era genial', opts:['The book who I read was great','The book which I read was great','The book where I read was great','The book whose I read was great'], correct:1 },
      { src:'Hacia frio; no obstante, salimos', opts:['It was cold; therefore, we went out','It was cold; nevertheless, we went out','It was cold; moreover, we went out','It was cold; so we went out'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'The woman ___ car was stolen called.', opts:['who','whose','which','where'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta.',
    sents:[
      { pre:'The man ', ans:'who', post:' called is my brother.', bank:['who','which','where','whose'] },
      { pre:'It was raining. ', ans:'However', post:', we went out.', bank:['However','Therefore','Moreover','Because'] },
      { pre:'The house ', ans:'where', post:' I live is old.', bank:['where','who','which','whose'] },
      { pre:'She trained hard. ', ans:'Therefore', post:', she won.', bank:['Therefore','However','Moreover','Although'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['who','The','man','called','is','my','friend'],ans:['The','man','who','called','is','my','friend']},{words:['whose','The','woman','car','broke','down','called'],ans:['The','woman','whose','car','broke','down','called']},{words:['where','This','is','the','town','I','grew','up'],ans:['This','is','the','town','where','I','grew','up']} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el relativo o marcador correcto.',
    transforms:[
      { original:'mujer + posesion de coche', task:'Relativo', opts:['The woman whose car was stolen','The woman who car was stolen','The woman which car was stolen','The woman where car was stolen'], correct:0 },
      { original:'contraste entre dos ideas', task:'Marcador', opts:['However, it was worth it.','Therefore, it was worth it.','Moreover, it was worth it.','Because it was worth it.'], correct:0 },
      { original:'libro (cosa)', task:'Relativo', opts:['The book which I read','The book who I read','The book where I read','The book whose I read'], correct:0 },
      { original:'resultado de estudiar', task:'Marcador', opts:['Therefore, he passed.','However, he passed.','Moreover, he passed.','Although he passed.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Whose car broke down?', blank:false },
      { speaker:1, text:null, blank:true, opts:['The woman whose car broke down is here.','The woman who car broke down is here.','The woman which car broke down is here.','The woman where car broke down is here.'], correct:0 },
      { speaker:0, text:'It was cold. Did you stay home?', blank:false },
      { speaker:1, text:null, blank:true, opts:['No. However, we went out.','No. Therefore, we went out.','No. Moreover, we went out.','No. Because we went out.'], correct:0 },
      { speaker:0, text:'Brave!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada palabra.',
    categories:['Pronombre relativo','Marcador del discurso'],
    items:[ {text:'who',correct:0},{text:'however',correct:1},{text:'which',correct:0},{text:'therefore',correct:1},{text:'whose',correct:0},{text:'moreover',correct:1} ] }
]);

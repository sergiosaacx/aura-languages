/* topic-data-172.js - Juego 172/350 | T25 4/7 PASSIVE VOICE | Pasiva con modales (ESPECIALIZADO) | Oro B1 */
_registerGames(172, 'Pasiva con Modales', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Como se forma la pasiva con modales?', opts:['modal + participio','modal + be + participio','modal + been + participio','modal + to be + participio'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"The car must be repaired." es correcta.', ans:true, expl:'Correcto. modal + be + participio.' },
      { text:'"The letter should been sent." es correcta.', ans:false, expl:'Falso. should be sent (be, no been).' },
      { text:'"It can be fixed." es correcta.', ans:true, expl:'Correcto.' },
      { text:'"The work must done." es correcta.', ans:false, expl:'Falso. must be done.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'The work must ', ans:'be', post:' done today.', bank:['be','been','being','is'] },
      { pre:'It can be ', ans:'fixed', post:'.', bank:['fix','fixed','fixing','fixes'] },
      { pre:'The report should ', ans:'be', post:' finished.', bank:['be','been','being','is'] },
      { pre:'This must be ', ans:'cleaned', post:'.', bank:['clean','cleaned','cleaning','cleans'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['be','The','work','must','done'],ans:['The','work','must','be','done']},{words:['be','It','can','fixed'],ans:['It','can','be','fixed']},{words:['be','The','report','should','finished'],ans:['The','report','should','be','finished']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['The','work','must','done','.'], wi:3, correct:'be done', choices:['be done','done','did','doing'] },
      { words:['It','can','been','fixed','.'], wi:2, correct:'be', choices:['be','been','being','is'] },
      { words:['The','letter','should','be','send','.'], wi:4, correct:'sent', choices:['sent','send','sending','sends'] } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'The work must be done today.', type:'select', opts:['The work must be done today.','The work must done today.','The work must been done today.','The work must be do today.'], correct:0 },
      { tts:'It can be fixed easily.', type:'select', opts:['It can be fixed easily.','It can fixed easily.','It can be fix easily.','It can been fixed easily.'], correct:0 },
      { tts:'The report should be finished.', type:'select', opts:['The report should be finished.','The report should finished.','The report should been finished.','The report should be finish.'], correct:0 } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Convierte cada oracion en pasiva con modal.',
    transforms:[
      { original:'You must do the work.', task:'Pasiva', opts:['The work must be done.','The work must done.','The work must been done.','The work must be do.'], correct:0 },
      { original:'They can fix it.', task:'Pasiva', opts:['It can be fixed.','It can fixed.','It can be fix.','It can been fixed.'], correct:0 },
      { original:'You should send the letter.', task:'Pasiva', opts:['The letter should be sent.','The letter should sent.','The letter should been sent.','The letter should be send.'], correct:0 },
      { original:'They must clean the room.', task:'Pasiva', opts:['The room must be cleaned.','The room must cleaned.','The room must been cleaned.','The room must be clean.'], correct:0 } ] }
]);

/* topic-data-227.js - Juego 227/350 | T33 3/7 THE PASSIVE GAME | pasiva con modales en todos los tiempos (ESPECIALIZADO) | Platino B2 */
_registerGames(227, 'Pasiva con Modales · Todos los Tiempos', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'La pasiva con modal perfecto se forma con...', opts:['modal + be + PP','modal + have been + PP','modal + been + PP','modal + PP'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'The work must ', ans:'be done', post:' today.', bank:['be done','done','been done','be do'] },
      { pre:'It could ', ans:'be improved', post:'.', bank:['be improved','improved','been improved','be improve'] },
      { pre:'The match might ', ans:'be cancelled', post:'.', bank:['be cancelled','cancelled','been cancelled','be cancel'] },
      { pre:'You should have ', ans:'been told', post:' earlier.', bank:['been told','told','be told','being told'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada modal activo con su pasiva.',
    pairs:[ ['must do','must be done'],['should have told','should have been told'],['could improve','could be improved'],['might cancel','might be cancelled'],['can fix','can be fixed'],['will finish','will be finished'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['done','The','work','must','be'],ans:['The','work','must','be','done']},{words:['improved','It','could','be'],ans:['It','could','be','improved']},{words:['told','You','should','have','been'],ans:['You','should','have','been','told']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['The','work','must','done','.'], wi:3, correct:'be done', choices:['be done','done','been done','be do'] },
      { words:['It','could','improved','.'], wi:2, correct:'be improved', choices:['be improved','improved','been improved','be improve'] },
      { words:['You','should','been','told','.'], wi:2, correct:'have been', choices:['have been','been','be','having been'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"The work must be done." es pasiva con modal correcta.', ans:true, expl:'Correcto. modal + be + PP.' },
      { text:'"You should have been told." es correcto.', ans:true, expl:'Correcto. modal perfecto pasivo.' },
      { text:'"It could improved." es correcto.', ans:false, expl:'Falso. could be improved.' },
      { text:'"It might be cancelled." es pasiva correcta.', ans:true, expl:'Correcto.' } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'The work must be done today.', type:'select', opts:['The work must be done today.','The work must done today.','The work must been done today.','The work must be do today.'], correct:0 },
      { tts:'You should have been told.', type:'select', opts:['You should have been told.','You should been told.','You should have told.','You should be told have.'], correct:0 },
      { tts:'It could be improved.', type:'select', opts:['It could be improved.','It could improved.','It could been improved.','It could be improve.'], correct:0 } ] }
]);

/* topic-data-230.js - Juego 230/350 | T33 6/7 THE PASSIVE GAME | elegir forma pasiva segun tiempo (MEZCLADO) | Platino B2 */
_registerGames(230, 'Forma Pasiva · Segun el Tiempo', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'The new law ___ next year. (introduce)', opts:['is introduced','will be introduced','has been introduced','was introduced'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma pasiva correcta.',
    sents:[
      { pre:'The new law ', ans:'will be introduced', post:' next year.', bank:['will be introduced','is introduced','has been introduced','was introduced'] },
      { pre:'Several mistakes ', ans:'were made', post:' during the process.', bank:['were made','are made','will be made','have made'] },
      { pre:'The bridge ', ans:'is being built', post:' right now.', bank:['is being built','is built','was built','will be built'] },
      { pre:'The work ', ans:'has been done', post:' already.', bank:['has been done','is done','was done','will be done'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada marcador de tiempo con su pasiva.',
    pairs:[ ['next year','will be introduced'],['during the process (pasado)','were made'],['right now','is being built'],['already','has been done'],['every day','is cleaned'],['yesterday','was sent'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['introduced','The','law','will','be','next','year'],ans:['The','law','will','be','introduced','next','year']},{words:['made','Several','mistakes','were'],ans:['Several','mistakes','were','made']},{words:['built','The','bridge','is','being'],ans:['The','bridge','is','being','built']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['The','law','will','introduced','next','year','.'], wi:3, correct:'be introduced', choices:['be introduced','introduced','been introduced','be introduce'] },
      { words:['Several','mistakes','was','made','.'], wi:2, correct:'were', choices:['were','was','is','are'] },
      { words:['The','work','has','done','.'], wi:3, correct:'been done', choices:['been done','done','do','be done'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada pasiva por su tiempo.',
    categories:['Futuro','Pasado','Presente continuo'],
    items:[ {text:'will be introduced',correct:0},{text:'were made',correct:1},{text:'is being built',correct:2},{text:'will be sold',correct:0},{text:'was sent',correct:1},{text:'is being cleaned',correct:2} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'The new law will be introduced next year.', type:'select', opts:['The new law will be introduced next year.','The new law is introduced next year.','The new law has been introduced next year.','The new law was introduced next year.'], correct:0 },
      { tts:'Several mistakes were made.', type:'select', opts:['Several mistakes were made.','Several mistakes are made.','Several mistakes will be made.','Several mistakes have made.'], correct:0 },
      { tts:'The bridge is being built.', type:'select', opts:['The bridge is being built.','The bridge is built.','The bridge was built.','The bridge will be built.'], correct:0 } ] }
]);

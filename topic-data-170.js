/* topic-data-170.js - Juego 170/350 | T25 2/7 PASSIVE VOICE | by + agente (ESPECIALIZADO) | Oro B1 */
_registerGames(170, 'By + Agente', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cuando incluyes "by + agente"?', opts:['siempre','cuando el agente es importante','nunca','solo en presente'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada oracion con su descripcion.',
    pairs:[ ['The window was broken by Tom','agente importante'],['The window was broken','agente desconocido'],['The book was written by Tolkien','autor importante'],['My car was stolen','agente desconocido 2'],['The Mona Lisa was painted by da Vinci','artista importante'],['The room was cleaned','agente obvio'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['by','The','window','was','broken','Tom'],ans:['The','window','was','broken','by','Tom']},{words:['by','The','book','was','written','Tolkien'],ans:['The','book','was','written','by','Tolkien']},{words:['was','My','car','stolen'],ans:['My','car','was','stolen']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la preposicion incorrecta y elige la correccion.',
    sents:[
      { words:['The','window','was','broken','from','Tom','.'], wi:4, correct:'by', choices:['by','from','with','of'] },
      { words:['The','book','was','written','from','Tolkien','.'], wi:4, correct:'by', choices:['by','from','with','of'] },
      { words:['The','cake','was','made','from','my','mother','.'], wi:4, correct:'by', choices:['by','from','with','of'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada oracion segun si incluye el agente.',
    categories:['Incluye agente (by)','No incluye agente'],
    items:[ {text:'painted by da Vinci',correct:0},{text:'was stolen',correct:1},{text:'written by Tolkien',correct:0},{text:'was cleaned',correct:1},{text:'built by the Romans',correct:0},{text:'was repaired',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'The window was broken by Tom.', type:'select', opts:['The window was broken by Tom.','The window was broken from Tom.','The window broke by Tom.','The window is broken by Tom now.'], correct:0 },
      { tts:'My bike was stolen yesterday.', type:'select', opts:['My bike was stolen yesterday.','My bike stole yesterday.','My bike is stolen yesterday.','My bike was steal yesterday.'], correct:0 },
      { tts:'The book was written by Tolkien.', type:'select', opts:['The book was written by Tolkien.','The book was written from Tolkien.','The book wrote by Tolkien.','The book was wrote by Tolkien.'], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta.',
    sents:[
      { pre:'The window was broken ', ans:'by', post:' Tom.', bank:['by','from','with','of'] },
      { pre:'The Mona Lisa was painted ', ans:'by', post:' da Vinci.', bank:['by','from','with','of'] },
      { pre:'My phone was ', ans:'stolen', post:'.', bank:['stolen','stole','steal','stealing'] },
      { pre:'This bridge was ', ans:'built', post:' in 1920.', bank:['built','build','building','builds'] } ] }
]);

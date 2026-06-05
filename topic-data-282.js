/* topic-data-282.js - Juego 282/350 | T41 2/7 ELLIPSIS | so/neither + auxiliar (ESPECIALIZADO) | Diamante C1 */
_registerGames(282, 'So / Neither + Auxiliar', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"I am tired." Respuesta de acuerdo:', opts:['So do I','So am I','Neither am I','So I am'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada afirmacion con la sustitucion correcta.',
    pairs:[ ['I am tired','So am I'],['I do not like it','Neither do I'],['I can swim','So can I'],['I have not been there','Neither have I'],['I went home','So did I'],['I cannot drive','Neither can I'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el auxiliar correcto.',
    sents:[
      { pre:'I am tired. So ', ans:'am', post:' I.', bank:['am','do','have','can'] },
      { pre:'I do not like it. Neither ', ans:'do', post:' I.', bank:['do','am','have','can'] },
      { pre:'I can swim. So ', ans:'can', post:' I.', bank:['can','am','do','have'] },
      { pre:'I have not been there. Neither ', ans:'have', post:' I.', bank:['have','am','do','can'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['I','So','am'],ans:['So','am','I']},{words:['I','Neither','do'],ans:['Neither','do','I']},{words:['I','So','can'],ans:['So','can','I']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el auxiliar incorrecto y elige la correccion.',
    sents:[
      { words:['I','am','tired','.','So','do','I','.'], wi:5, correct:'am', choices:['am','do','have','can'] },
      { words:['I','do','not','like','it','.','Neither','am','I','.'], wi:7, correct:'do', choices:['do','am','have','can'] },
      { words:['I','have','seen','it','.','So','do','I','.'], wi:6, correct:'have', choices:['have','do','am','can'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada respuesta es correcta.',
    stmts:[
      { text:'"I am tired. So am I." es correcto.', ans:true, expl:'Correcto. mismo auxiliar (am).' },
      { text:'"I do not like it. So do I." es correcto.', ans:false, expl:'Falso. Neither do I (negativo).' },
      { text:'"I can swim. So can I." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"I am happy. Neither am I." expresa acuerdo positivo.', ans:false, expl:'Falso. So am I (positivo).' } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la respuesta que oyes.',
    items:[
      { tts:'So am I.', type:'select', opts:['So am I.','So do I.','Neither am I.','So I am.'], correct:0 },
      { tts:'Neither do I.', type:'select', opts:['Neither do I.','So do I.','Neither am I.','Neither I do.'], correct:0 },
      { tts:'So can I.', type:'select', opts:['So can I.','So do I.','Neither can I.','So I can.'], correct:0 } ] }
]);

/* topic-data-286.js - Juego 286/350 | T41 6/7 ELLIPSIS | so/neither/one/do so en conversacion (MEZCLADO) | Diamante C1 */
_registerGames(286, 'So / Neither / One / Do So · En Conversacion', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"I have never been to Japan." "Neither ___ I."', opts:['do','have','am','did'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'I have never been to Japan. Neither ', ans:'have', post:' I.', bank:['have','do','am','did'] },
      { pre:'Would you like a pen? I have several ', ans:'ones', post:'.', bank:['ones','one','it','do so'] },
      { pre:'I love jazz. So ', ans:'do', post:' I.', bank:['do','am','have','can'] },
      { pre:'She asked me to sit, so I ', ans:'did so', post:'.', bank:['did so','did one','it','such'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada afirmacion con su respuesta.',
    pairs:[ ['I love jazz','So do I'],['I am hungry','So am I'],['I have not eaten','Neither have I'],['I cannot swim','Neither can I'],['I went there','So did I'],['I will help','So will I'] ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['I','have','not','been','.','Neither','do','I','.'], wi:6, correct:'have', choices:['have','do','am','did'] },
      { words:['Do','you','want','a','pen','?','I','have','one','a','.'], wi:9, correct:'(nada)', choices:['(nada)','a','one','the'] },
      { words:['I','love','tea','.','So','am','I','.'], wi:5, correct:'do', choices:['do','am','have','can'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada respuesta es correcta.',
    stmts:[
      { text:'"I have never been there. Neither have I." es correcto.', ans:true, expl:'Correcto. mismo auxiliar have.' },
      { text:'"I love jazz. So am I." es correcto.', ans:false, expl:'Falso. So do I (love = do).' },
      { text:'"I have several ones." es correcto.', ans:true, expl:'Correcto. ones para plural contable.' },
      { text:'"She asked me to sit, so I did so." es correcto.', ans:true, expl:'Correcto. do so sustituye el predicado.' } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'I love this song.', blank:false },
      { speaker:1, text:null, blank:true, opts:['So do I.','So am I.','Neither do I.','So I do.'], correct:0 },
      { speaker:0, text:'I have not seen the film yet.', blank:false },
      { speaker:1, text:null, blank:true, opts:['Neither have I.','So have I.','Neither do I.','Neither I have.'], correct:0 },
      { speaker:0, text:'Let us watch it together.', blank:false } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['have','Neither','I'],ans:['Neither','have','I']},{words:['do','So','I'],ans:['So','do','I']},{words:['so','I','did'],ans:['I','did','so']} ] }
]);

/* topic-data-335.js - Juego 335/350 | T48 6/7 GRAMMAR EDGE | arcaismos y estructuras formales en contexto (MEZCLADO) | Challenger C2 */
_registerGames(335, 'Arcaismos y Estructuras Formales · En Contexto', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"The contract shall be null and void ___" (de aqui en adelante)', opts:['henceforth','hitherto','forthwith','whilst'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el arcaismo o estructura correcta.',
    sents:[
      { pre:'The contract shall be null and void ', ans:'henceforth', post:'.', bank:['henceforth','hitherto','whilst','methinks'] },
      { pre:'', ans:'Given', post:' the evidence presented, the court finds him guilty.', bank:['Given','Giving','Gave','Gives'] },
      { pre:'The defendant must appear ', ans:'forthwith', post:'.', bank:['forthwith','hitherto','whilst','methinks'] },
      { pre:'The terms were, ', ans:'hitherto', post:', undefined.', bank:['hitherto','henceforth','forthwith','whilst'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada hueco con la palabra correcta.',
    pairs:[ ['de aqui en adelante','henceforth'],['dado / considerando','given'],['inmediatamente','forthwith'],['hasta ahora','hitherto'],['aunque','albeit'],['mientras','whilst'] ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si el uso es apropiado.',
    stmts:[
      { text:'"null and void henceforth" es un uso legal apropiado.', ans:true, expl:'Correcto.' },
      { text:'"Given the evidence, the court finds..." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"appear hitherto" significa aparecer inmediatamente.', ans:false, expl:'Falso. forthwith = inmediatamente.' },
      { text:'"henceforth" mira hacia el pasado.', ans:false, expl:'Falso. mira hacia el futuro.' } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['henceforth','The','contract','is','void'],ans:['The','contract','is','void','henceforth']},{words:['Given','the','evidence','he','is','guilty'],ans:['Given','the','evidence','he','is','guilty']},{words:['forthwith','Appear','please'],ans:['Appear','forthwith','please']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el arcaismo mal usado y elige la correccion.',
    sents:[
      { words:['Appear','hitherto','please','.'], wi:1, correct:'forthwith', choices:['forthwith','hitherto','henceforth','whilst'] },
      { words:['The','contract','is','void','hitherto','.'], wi:4, correct:'henceforth', choices:['henceforth','hitherto','whilst','methinks'] },
      { words:['Giving','the','evidence',',','guilty','.'], wi:0, correct:'Given', choices:['Given','Giving','Gave','Gives'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el arcaismo.',
    words:[ {scrambled:['H','T','R','O','F','E','C','N','E','H'],ans:'HENCEFORTH',hint:'de aqui en adelante'},{scrambled:['O','T','R','E','H','T','I','H'],ans:'HITHERTO',hint:'hasta ahora'},{scrambled:['H','T','I','W','H','T','R','O','F'],ans:'FORTHWITH',hint:'inmediatamente'},{scrambled:['N','E','V','I','G'],ans:'GIVEN',hint:'dado / considerando'} ] }
]);

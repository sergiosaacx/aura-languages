/* topic-data-274.js - Juego 274/350 | T40 1/7 SUBJUNCTIVE | subjuntivo presente forma base (ESPECIALIZADO) | Diamante C1 */
_registerGames(274, 'Subjuntivo Presente · Forma Base', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma subjuntiva correcta.',
    items:[
      { src:'Sugiero que el se vaya ahora', opts:['I suggest that he leaves now','I suggest that he leave now','I suggest that he left now','I suggest that he leaving now'], correct:1 },
      { src:'Es importante que ella este presente', opts:['It is important that she is present','It is important that she be present','It is important that she being present','It is important that she are present'], correct:1 },
      { src:'Insisto en que el llegue temprano', opts:['I insist that he arrives early','I insist that he arrive early','I insist that he arrived early','I insist that he arriving early'], correct:1 },
      { src:'Recomiendan que pague hoy', opts:['They recommend that he pays today','They recommend that he pay today','They recommend that he paid today','They recommend that he paying today'], correct:1 },
      { src:'Exigen que ella firme', opts:['They demand that she signs','They demand that she sign','They demand that she signed','They demand that she signing'], correct:1 },
      { src:'Es vital que sean puntuales', opts:['It is vital that they are punctual','It is vital that they be punctual','It is vital that they being punctual','It is vital that they is punctual'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'En "I suggest that he ___ now", la forma subjuntiva es...', opts:['leaves','leave','left','leaving'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma base del subjuntivo.',
    sents:[
      { pre:'I suggest that he ', ans:'leave', post:' now.', bank:['leave','leaves','left','leaving'] },
      { pre:'It is important that she ', ans:'be', post:' present.', bank:['be','is','are','being'] },
      { pre:'I insist that he ', ans:'arrive', post:' early.', bank:['arrive','arrives','arrived','arriving'] },
      { pre:'They demand that she ', ans:'sign', post:' the form.', bank:['sign','signs','signed','signing'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el verbo en subjuntivo.',
    words:[ {scrambled:['E','V','A','E','L'],ans:'LEAVE',hint:'that he ... (sin s)'},{scrambled:['E','B'],ans:'BE',hint:'that she ... present'},{scrambled:['E','V','I','R','R','A'],ans:'ARRIVE',hint:'that he ... early'},{scrambled:['N','G','I','S'],ans:'SIGN',hint:'that she ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"I suggest that he leave now." es subjuntivo correcto.', ans:true, expl:'Correcto. forma base sin -s.' },
      { text:'"It is important that she is present." es subjuntivo correcto.', ans:false, expl:'Falso. that she be present.' },
      { text:'"I insist that he arrive early." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"They demand that she signs." es subjuntivo correcto.', ans:false, expl:'Falso. that she sign.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Pasa al subjuntivo.',
    transforms:[
      { original:'He leaves now. (I suggest that...)', task:'Subjuntivo', opts:['I suggest that he leave now.','I suggest that he leaves now.','I suggest that he left now.','I suggest that he leaving now.'], correct:0 },
      { original:'She is present. (It is important that...)', task:'Subjuntivo', opts:['It is important that she be present.','It is important that she is present.','It is important that she are present.','It is important that she being present.'], correct:0 },
      { original:'He arrives early. (I insist that...)', task:'Subjuntivo', opts:['I insist that he arrive early.','I insist that he arrives early.','I insist that he arrived early.','I insist that he arriving early.'], correct:0 },
      { original:'She signs. (They demand that...)', task:'Subjuntivo', opts:['They demand that she sign.','They demand that she signs.','They demand that she signed.','They demand that she signing.'], correct:0 } ] }
  ,{ id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['leave','I','suggest','that','he','now'],ans:['I','suggest','that','he','leave','now']},{words:['be','It','is','important','that','she','present'],ans:['It','is','important','that','she','be','present']},{words:['arrive','I','insist','that','he','early'],ans:['I','insist','that','he','arrive','early']} ] }
]);

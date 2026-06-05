/* topic-data-275.js - Juego 275/350 | T40 2/7 SUBJUNCTIVE | should como alternativa (ESPECIALIZADO) | Diamante C1 */
_registerGames(275, 'Should como Alternativa al Subjuntivo', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"I suggest that he leave" equivale a "I suggest that he ___ leave".', opts:['would','should','will','could'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta con should.',
    sents:[
      { pre:'I suggest that he ', ans:'should leave', post:' now.', bank:['should leave','would leave','will leave','leaves'] },
      { pre:'It is important that she ', ans:'should be', post:' present.', bank:['should be','would be','will be','is'] },
      { pre:'They recommend that he ', ans:'should pay', post:' today.', bank:['should pay','would pay','will pay','pays'] },
      { pre:'I insist that they ', ans:'should attend', post:'.', bank:['should attend','would attend','will attend','attends'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"I suggest that he should leave" y "I suggest that he leave" son ambos correctos.', ans:true, expl:'Correcto. should es alternativa.' },
      { text:'"I suggest that he would leave" es correcto.', ans:false, expl:'Falso. se usa should, no would.' },
      { text:'El subjuntivo puro omite "should".', ans:true, expl:'Correcto. that he leave.' },
      { text:'"It is important that she will be present" es correcto.', ans:false, expl:'Falso. should be o be.' } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada subjuntivo puro con su version con should.',
    pairs:[ ['that he leave','that he should leave'],['that she be','that she should be'],['that they attend','that they should attend'],['that he pay','that he should pay'],['that it stop','that it should stop'],['that we go','that we should go'] ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Reescribe con should.',
    transforms:[
      { original:'I suggest that he leave.', task:'Con should', opts:['I suggest that he should leave.','I suggest that he would leave.','I suggest that he will leave.','I suggest that he leaves.'], correct:0 },
      { original:'It is important that she be present.', task:'Con should', opts:['It is important that she should be present.','It is important that she would be present.','It is important that she will be present.','It is important that she is present.'], correct:0 },
      { original:'They recommend that he pay.', task:'Con should', opts:['They recommend that he should pay.','They recommend that he would pay.','They recommend that he will pay.','They recommend that he pays.'], correct:0 },
      { original:'I insist that they attend.', task:'Con should', opts:['I insist that they should attend.','I insist that they would attend.','I insist that they will attend.','I insist that they attends.'], correct:0 } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['should','I','suggest','that','he','leave'],ans:['I','suggest','that','he','should','leave']},{words:['should','It','is','important','that','she','be','present'],ans:['It','is','important','that','she','should','be','present']},{words:['should','They','recommend','that','he','pay'],ans:['They','recommend','that','he','should','pay']} ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['D','L','U','O','H','S'],ans:'SHOULD',hint:'alternativa al subjuntivo'},{scrambled:['E','V','A','E','L'],ans:'LEAVE',hint:'that he should ...'},{scrambled:['E','B'],ans:'BE',hint:'that she should ...'},{scrambled:['Y','A','P'],ans:'PAY',hint:'that he should ...'} ] }
]);

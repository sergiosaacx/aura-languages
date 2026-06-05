/* topic-data-278.js - Juego 278/350 | T40 5/7 SUBJUNCTIVE | subjuntivo y should formal en oraciones (MEZCLADO) | Diamante C1 */
_registerGames(278, 'Subjuntivo y Should Formal · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion formal correcta.',
    items:[
      { src:'El comite recomendo que se revisara la politica', opts:['The committee recommended that the policy is revised','The committee recommended that the policy be revised','The committee recommended that the policy was revised','The committee recommended that the policy revises'], correct:1 },
      { src:'Es esencial que cada estudiante entregue su trabajo a tiempo', opts:['It is essential that every student submits their work on time','It is essential that every student submit their work on time','It is essential that every student submitted their work','It is essential that every student submitting'], correct:1 },
      { src:'Insistieron en que el firmara', opts:['They insisted that he signs','They insisted that he sign','They insisted that he signed it then','They insisted that he signing'], correct:1 },
      { src:'Es vital que esten presentes', opts:['It is vital that they are present','It is vital that they be present','It is vital that they were present','It is vital that they being present'], correct:1 },
      { src:'Sugiero que el deberia esperar', opts:['I suggest that he should wait','I suggest that he would wait','I suggest that he will wait','I suggest that he waits maybe'], correct:0 },
      { src:'Recomendaron que la reunion comenzara temprano', opts:['They recommended that the meeting begins early','They recommended that the meeting begin early','They recommended that the meeting began early','They recommended that the meeting beginning'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"The committee recommended that the policy ___ revised."', opts:['is','be','was','revises'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma subjuntiva correcta.',
    sents:[
      { pre:'The committee recommended that the policy ', ans:'be', post:' revised.', bank:['be','is','was','being'] },
      { pre:'It is essential that every student ', ans:'submit', post:' their work.', bank:['submit','submits','submitted','submitting'] },
      { pre:'They insisted that he ', ans:'sign', post:' the form.', bank:['sign','signs','signed','signing'] },
      { pre:'It is vital that they ', ans:'be', post:' present.', bank:['be','are','were','being'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['be','They','recommended','that','it','revised'],ans:['They','recommended','that','it','be','revised']},{words:['submit','Each','student','must','their','work'],ans:['Each','student','must','submit','their','work']},{words:['be','It','is','vital','that','they','present'],ans:['It','is','vital','that','they','be','present']} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"...recommended that the policy be revised." es correcto.', ans:true, expl:'Correcto. subjuntivo.' },
      { text:'"It is essential that every student submits their work." es correcto.', ans:false, expl:'Falso. that every student submit.' },
      { text:'"They insisted that he sign the form." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"It is vital that they are present." es correcto.', ans:false, expl:'Falso. that they be present.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion con subjuntivo formal.',
    transforms:[
      { original:'the policy is revised (recommend that)', task:'Subjuntivo', opts:['...recommended that the policy be revised.','...recommended that the policy is revised.','...recommended that the policy was revised.','...recommended that the policy revises.'], correct:0 },
      { original:'every student submits (it is essential that)', task:'Subjuntivo', opts:['It is essential that every student submit.','It is essential that every student submits.','It is essential that every student submitted.','It is essential that every student submitting.'], correct:0 },
      { original:'he signs (they insisted that)', task:'Subjuntivo', opts:['They insisted that he sign.','They insisted that he signs.','They insisted that he signed.','They insisted that he signing.'], correct:0 },
      { original:'they are present (it is vital that)', task:'Subjuntivo', opts:['It is vital that they be present.','It is vital that they are present.','It is vital that they were present.','It is vital that they being present.'], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el verbo.',
    words:[ {scrambled:['E','B'],ans:'BE',hint:'that the policy ... revised'},{scrambled:['T','I','M','B','U','S'],ans:'SUBMIT',hint:'that every student ...'},{scrambled:['N','G','I','S'],ans:'SIGN',hint:'that he ...'},{scrambled:['D','N','E','T','T','A'],ans:'ATTEND',hint:'that everyone ...'} ] }
]);

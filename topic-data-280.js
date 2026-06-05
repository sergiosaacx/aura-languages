/* topic-data-280.js - Juego 280/350 | T40 7/7 SUBJUNCTIVE | errores tipicos (MEZCLADO) | Diamante C1 */
_registerGames(280, 'Subjuntivo · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Sugiero que el se vaya de inmediato', opts:['I suggest that he leaves immediately','I suggest that he leave immediately','I suggest that he left immediately','I suggest that he leaving immediately'], correct:1 },
      { src:'Es esencial que ella este presente', opts:['It is essential that she is present','It is essential that she be present','It is essential that she was present','It is essential that she being present'], correct:1 },
      { src:'Ya es hora de que decidas', opts:["It's time you will decide","It's time you decided","It's time you decide","It's time you have decided"], correct:1 },
      { src:'Insisto en que el pague', opts:['I insist that he pays','I insist that he pay','I insist that he paid','I insist that he paying'], correct:1 },
      { src:'Recomiendan que se revise', opts:['They recommend that it is revised','They recommend that it be revised','They recommend that it was revised','They recommend that it revises'], correct:1 },
      { src:'Es vital que ellos asistan', opts:['It is vital that they attends','It is vital that they attend','It is vital that they attended','It is vital that they attending'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['I suggest that he leaves','I suggest that he leave','I suggest that he left','I suggest that he leaving'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['that he leaves','that he leave'],['that she is present','that she be present'],["it's time you will decide","it's time you decided"],['that he pays','that he pay'],['that it is revised','that it be revised'],['that they attends','that they attend'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['leave','I','suggest','that','he','now'],ans:['I','suggest','that','he','leave','now']},{words:['be','It','is','essential','that','she','present'],ans:['It','is','essential','that','she','be','present']},{words:['decided','It','is','time','you'],ans:['It','is','time','you','decided']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la forma incorrecta y elige la correccion.',
    sents:[
      { words:['I','suggest','that','he','leaves','.'], wi:4, correct:'leave', choices:['leave','leaves','left','leaving'] },
      { words:['It','is','essential','that','she','is','present','.'], wi:5, correct:'be', choices:['be','is','was','being'] },
      { words:['It','is','time','you','will','decide','.'], wi:4, correct:'decided', choices:['decided','will','decide','have'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el verbo correcto.',
    words:[ {scrambled:['E','V','A','E','L'],ans:'LEAVE',hint:'that he ... (sin s)'},{scrambled:['E','B'],ans:'BE',hint:'that she ... present'},{scrambled:['D','E','D','I','C','E','D'],ans:'DECIDED',hint:'it is time you ...'},{scrambled:['Y','A','P'],ans:'PAY',hint:'that he ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"I suggest that he leave immediately." es correcto.', ans:true, expl:'Correcto. subjuntivo base.' },
      { text:'"It is essential that she is present." es correcto.', ans:false, expl:'Falso. that she be present.' },
      { text:"\"It's time you decided.\" es correcto.", ans:true, expl:'Correcto. pasado subjuntivo.' },
      { text:'"I insist that he pays." es correcto.', ans:false, expl:'Falso. that he pay.' } ] }
]);

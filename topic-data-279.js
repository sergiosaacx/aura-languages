/* topic-data-279.js - Juego 279/350 | T40 6/7 SUBJUNCTIVE | subjuntivo en texto formal/legal (MEZCLADO) | Diamante C1 */
_registerGames(279, 'Subjuntivo · En Texto Formal y Legal', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'We recommend that the report ___ before Friday.', opts:['is submitted','be submitted','submits','was submitted'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma subjuntiva correcta.',
    sents:[
      { pre:'We recommend that the report ', ans:'be submitted', post:' before Friday.', bank:['be submitted','is submitted','submits','was submitted'] },
      { pre:'It is vital that everyone ', ans:'attend', post:' the hearing.', bank:['attend','attends','attended','attending'] },
      { pre:'The court ordered that he ', ans:'pay', post:' the fine.', bank:['pay','pays','paid','paying'] },
      { pre:'It is required that each member ', ans:'sign', post:' the agreement.', bank:['sign','signs','signed','signing'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"We recommend that the report be submitted." es correcto.', ans:true, expl:'Correcto. subjuntivo formal.' },
      { text:'"It is vital that everyone attends." es correcto.', ans:false, expl:'Falso. that everyone attend.' },
      { text:'"The court ordered that he pay the fine." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"It is required that each member signs." es correcto.', ans:false, expl:'Falso. that each member sign.' } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada inicio formal con su forma subjuntiva.',
    pairs:[ ['the report','be submitted'],['everyone','attend'],['he','pay the fine'],['each member','sign'],['the policy','be revised'],['the witness','testify'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['submitted','We','recommend','that','it','be'],ans:['We','recommend','that','it','be','submitted']},{words:['attend','It','is','vital','that','everyone'],ans:['It','is','vital','that','everyone','attend']},{words:['pay','The','court','ordered','that','he','the','fine'],ans:['The','court','ordered','that','he','pay','the','fine']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la forma incorrecta y elige la correccion.',
    sents:[
      { words:['We','recommend','that','it','is','submitted','.'], wi:4, correct:'be', choices:['be','is','was','being'] },
      { words:['It','is','vital','that','everyone','attends','.'], wi:5, correct:'attend', choices:['attend','attends','attended','attending'] },
      { words:['It','is','required','that','he','signs','.'], wi:5, correct:'sign', choices:['sign','signs','signed','signing'] } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el documento formal.', speakers:['Juez','Abogado'],
    lines:[
      { speaker:0, text:'How should we word the order?', blank:false },
      { speaker:1, text:null, blank:true, opts:['The court orders that he pay the fine.','The court orders that he pays the fine.','The court orders that he paid the fine.','The court orders that he paying the fine.'], correct:0 },
      { speaker:0, text:'And the submission?', blank:false },
      { speaker:1, text:null, blank:true, opts:['We recommend that the report be submitted by Friday.','We recommend that the report is submitted by Friday.','We recommend that the report submits by Friday.','We recommend that the report was submitted.'], correct:0 },
      { speaker:0, text:'Approved.', blank:false } ] }
]);

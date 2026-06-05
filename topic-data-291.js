/* topic-data-291.js - Juego 291/350 | T42 4/7 ADVANCED MODALS | inferir situaciones (ESPECIALIZADO) | Diamante C1 */
_registerGames(291, 'Modales Perfectos · Inferir Situaciones', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Her phone is off. She ___ forgotten the meeting."', opts:['must have',"can't have",'should have','would have'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el modal perfecto que encaja con la pista.',
    sents:[
      { pre:'The ground is wet. It ', ans:'must have', post:' rained.', bank:['must have',"can't have",'should have','would have'] },
      { pre:'He never lies. He ', ans:"can't have", post:' deceived us.', bank:["can't have",'must have','should have','might have'] },
      { pre:'She arrived much later. She ', ans:'might have', post:' taken a different route.', bank:['might have','must have',"can't have",'should have'] },
      { pre:'He failed the test. He ', ans:'should have', post:' studied more.', bank:['should have','must have',"can't have",'might have'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada inferencia es logica.',
    stmts:[
      { text:'"She must have forgotten the meeting; her phone is off." es una inferencia logica.', ans:true, expl:'Correcto. deduccion razonable.' },
      { text:'"He must have been at the party" cuando sabemos que estaba en el trabajo, es logico.', ans:false, expl:"Falso. should be can't have been." },
      { text:'"It might have rained" expresa una posibilidad.', ans:true, expl:'Correcto.' },
      { text:'"can\'t have" se usa para algo que seguramente ocurrio.', ans:false, expl:'Falso. se usa para algo imposible.' } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada pista con su deduccion.',
    pairs:[ ['phone is off','must have forgotten'],['was at work','cannot have been at the party'],['arrived later','might have taken another route'],['failed the test','should have studied'],['the cake is gone','must have eaten it'],['he is soaked','must have been caught in the rain'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['have','She','must','forgotten'],ans:['She','must','have','forgotten']},{words:['have','He','cannot','been','there'],ans:['He','cannot','have','been','there']},{words:['have','It','might','rained'],ans:['It','might','have','rained']} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la deduccion correcta.',
    transforms:[
      { original:'wet ground (deduccion segura)', task:'Modal', opts:['It must have rained.','It might have rained.','It cannot have rained.','It should have rained.'], correct:0 },
      { original:'he was at work (imposible en la fiesta)', task:'Modal', opts:["He can't have been at the party.",'He must have been at the party.','He might have been at the party.','He should have been at the party.'], correct:0 },
      { original:'arrived late (posible otra ruta)', task:'Modal', opts:['She might have taken another route.','She must have taken another route.',"She can't have taken another route.",'She should have taken another route.'], correct:0 },
      { original:'failed the exam (critica)', task:'Modal', opts:['He should have studied more.','He must have studied more.',"He can't have studied more.",'He might have studied more.'], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el participio.',
    words:[ {scrambled:['N','E','T','T','O','G','R','O','F'],ans:'FORGOTTEN',hint:'must have ...'},{scrambled:['D','E','N','I','A','R'],ans:'RAINED',hint:'must have ...'},{scrambled:['N','E','K','A','T'],ans:'TAKEN',hint:'might have ... another route'},{scrambled:['N','E','E','B'],ans:'BEEN',hint:"can't have ... there"} ] }
]);

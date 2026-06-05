/* topic-data-293.js - Juego 293/350 | T42 6/7 ADVANCED MODALS | en narraciones cotidianas (MEZCLADO) | Diamante C1 */
_registerGames(293, 'Modales Perfectos · Narraciones Cotidianas', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"He looks exhausted. He ___ been working all night."', opts:['must have','should have',"can't have",'would have'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el modal perfecto segun la certeza.',
    sents:[
      { pre:'He looks exhausted. He ', ans:'must have', post:' been working all night.', bank:['must have','should have',"can't have",'would have'] },
      { pre:'She arrived much later. She ', ans:'might have', post:' taken a different route.', bank:['might have','must have',"can't have",'should have'] },
      { pre:'They knew the answer. They ', ans:'must have', post:' studied.', bank:['must have',"can't have",'might not have','would have'] },
      { pre:'I feel sick. I ', ans:'should have', post:" eaten that. (no debi)", bank:['should have',"shouldn't have",'must have','might have'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada situacion con su modal perfecto.',
    pairs:[ ['looks exhausted','must have been working'],['arrived much later','might have taken another route'],['knew the answer','must have studied'],['feels sick','should not have eaten that'],['is soaked','must have been caught in rain'],['failed','should have revised'] ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada deduccion es adecuada.',
    stmts:[
      { text:'"He looks exhausted. He must have been working all night." es adecuado.', ans:true, expl:'Correcto. deduccion segura.' },
      { text:'"She arrived later. She can\'t have taken another route." es la mejor deduccion.', ans:false, expl:'Falso. might have (posibilidad).' },
      { text:'"They knew it. They must have studied." es adecuado.', ans:true, expl:'Correcto.' },
      { text:'"I feel sick. I must have eaten well." es coherente.', ans:false, expl:"Falso. shouldn't have eaten that." } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la deduccion mas adecuada.',
    transforms:[
      { original:'exhausted (deduccion segura)', task:'Modal', opts:['must have been working','might have been working',"can't have been working",'should have been working'], correct:0 },
      { original:'arrived later (posibilidad)', task:'Modal', opts:['might have taken another route','must have taken another route',"can't have taken another route",'should have taken another route'], correct:0 },
      { original:'sick after eating (arrepentimiento)', task:'Modal', opts:["shouldn't have eaten that",'must have eaten that',"can't have eaten that",'would have eaten that'], correct:0 },
      { original:'knew the answer (deduccion)', task:'Modal', opts:['must have studied','might not have studied',"can't have studied",'should have studied'], correct:0 } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['have','He','must','been','working'],ans:['He','must','have','been','working']},{words:['have','She','might','taken','it'],ans:['She','might','have','taken','it']},{words:['have','They','must','studied'],ans:['They','must','have','studied']} ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el participio.',
    words:[ {scrambled:['N','E','E','B'],ans:'BEEN',hint:'must have ... working'},{scrambled:['N','E','K','A','T'],ans:'TAKEN',hint:'might have ... a route'},{scrambled:['D','E','I','D','U','T','S'],ans:'STUDIED',hint:'must have ...'},{scrambled:['N','E','T','A','E'],ans:'EATEN',hint:"shouldn't have ..."} ] }
]);

/* topic-data-235.js - Juego 235/350 | T34 4/7 REPORTED ADVANCED | backshift completo (ESPECIALIZADO) | Platino B2 */
_registerGames(235, 'Backshift Completo · Todos los Tiempos', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'En el backshift, "is doing" cambia a...', opts:['was doing','had done','would do','did'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma con backshift correcto.',
    sents:[
      { pre:'"I am working" -> He said he ', ans:'was working', post:'.', bank:['was working','is working','had worked','would work'] },
      { pre:'"I have finished" -> She said she ', ans:'had finished', post:'.', bank:['had finished','has finished','finished','would finish'] },
      { pre:'"I will call" -> He said he ', ans:'would call', post:'.', bank:['would call','will call','called','had called'] },
      { pre:'"I can swim" -> She said she ', ans:'could swim', post:'.', bank:['could swim','can swim','swam','had swum'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada forma directa con su backshift.',
    pairs:[ ['is working','was working'],['have finished','had finished'],['will call','would call'],['can swim','could swim'],['am eating','was eating'],['has gone','had gone'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['working','He','said','he','was'],ans:['He','said','he','was','working']},{words:['finished','She','said','she','had'],ans:['She','said','she','had','finished']},{words:['call','He','said','he','would'],ans:['He','said','he','would','call']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['He','said','he','is','working','.'], wi:3, correct:'was', choices:['was','is','are','were'] },
      { words:['She','said','she','has','finished','.'], wi:3, correct:'had', choices:['had','has','have','was'] },
      { words:['He','said','he','will','call','.'], wi:3, correct:'would', choices:['would','will','can','was'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada cambio es correcto.',
    stmts:[
      { text:'"is working" cambia a "was working" en el backshift.', ans:true, expl:'Correcto. present continuous -> past continuous.' },
      { text:'"have finished" cambia a "had finished".', ans:true, expl:'Correcto. present perfect -> past perfect.' },
      { text:'"will" no cambia en el backshift.', ans:false, expl:'Falso. will -> would.' },
      { text:'"can" cambia a "could" en el backshift.', ans:true, expl:'Correcto.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Aplica el backshift completo.',
    transforms:[
      { original:'"I am working," he said.', task:'Backshift', opts:['He said he was working.','He said he is working.','He said he had worked.','He said he would work.'], correct:0 },
      { original:'"I have finished," she said.', task:'Backshift', opts:['She said she had finished.','She said she has finished.','She said she finished.','She said she would finish.'], correct:0 },
      { original:'"I will call," he said.', task:'Backshift', opts:['He said he would call.','He said he will call.','He said he called.','He said he had called.'], correct:0 },
      { original:'"I can swim," she said.', task:'Backshift', opts:['She said she could swim.','She said she can swim.','She said she swam.','She said she had swum.'], correct:0 } ] }
]);

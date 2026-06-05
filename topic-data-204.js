/* topic-data-204.js - Juego 204/350 | T30 1/7 WORD BUILDER | prefijos significado (ESPECIALIZADO) | Oro B1 */
_registerGames(204, 'Prefijos · Significado y Reconocimiento', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la palabra con el prefijo correcto.',
    items:[
      { src:'infeliz', opts:['dishappy','unhappy','inhappy','nonhappy'], correct:1 },
      { src:'rehacer', opts:['redo','undo','predo','misdo'], correct:0 },
      { src:'malentender', opts:['ununderstand','misunderstand','disunderstand','overunderstand'], correct:1 },
      { src:'pagar de mas', opts:['underpay','overpay','repay','mispay'], correct:1 },
      { src:'precalentar', opts:['reheat','preheat','overheat','misheat'], correct:1 },
      { src:'cocinar de menos', opts:['overcook','undercook','recook','miscook'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que prefijo significa "de nuevo"?', opts:['un-','re-','mis-','pre-'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada prefijo con su significado.',
    pairs:[ ['un-','no/deshacer'],['re-','de nuevo'],['pre-','antes'],['mis-','mal'],['over-','demasiado'],['under-','insuficiente'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta.',
    sents:[
      { pre:'I am ', ans:'unhappy', post:' with the result.', bank:['unhappy','dishappy','inhappy','nonhappy'] },
      { pre:'Please ', ans:'redo', post:' the exercise.', bank:['redo','undo','predo','misdo'] },
      { pre:'I think you ', ans:'misunderstood', post:' me.', bank:['misunderstood','ununderstood','disunderstood','overunderstood'] },
      { pre:'Do not ', ans:'overcook', post:' the pasta.', bank:['overcook','undercook','recook','miscook'] } ] },
  { id:'scramble', label:'Descifra el prefijo', xp:20, instr:'Forma el prefijo.',
    words:[ {scrambled:['N','U'],ans:'UN',hint:'no/deshacer'},{scrambled:['E','R'],ans:'RE',hint:'de nuevo'},{scrambled:['S','I','M'],ans:'MIS',hint:'mal'},{scrambled:['R','E','V','O'],ans:'OVER',hint:'demasiado'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada significado es correcto.',
    stmts:[
      { text:'"un-" puede significar lo contrario (unhappy).', ans:true, expl:'Correcto.' },
      { text:'"re-" significa antes.', ans:false, expl:'Falso. re- = de nuevo. pre- = antes.' },
      { text:'"over-" significa demasiado (overcook).', ans:true, expl:'Correcto.' },
      { text:'"mis-" significa de nuevo.', ans:false, expl:'Falso. mis- = mal/equivocado.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada palabra por su prefijo.',
    categories:['un- / mis-','re- / pre-','over- / under-'],
    items:[ {text:'unhappy',correct:0},{text:'redo',correct:1},{text:'overcook',correct:2},{text:'misunderstand',correct:0},{text:'preheat',correct:1},{text:'underpay',correct:2} ] }
]);

/* topic-data-290.js - Juego 290/350 | T42 3/7 ADVANCED MODALS | funcion y grado de certeza (ESPECIALIZADO) | Diamante C1 */
_registerGames(290, 'Modales Perfectos · Funcion y Certeza', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que modal perfecto expresa un 0% de probabilidad?', opts:['must have','might have',"can't have",'should have'], correct:2 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada modal perfecto con su funcion.',
    pairs:[ ['must have','95% seguro'],['should have','critica'],['might have','50% posible'],["can't have",'0% imposible'],['could have','posibilidad pasada'],['would have','resultado condicional'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el modal segun el grado de certeza.',
    sents:[
      { pre:'The lights are on. Someone ', ans:'must have', post:' come in. (casi seguro)', bank:['must have','might have',"can't have",'should have'] },
      { pre:'He failed; he ', ans:'should have', post:' revised. (critica)', bank:['should have','must have',"can't have",'might have'] },
      { pre:'I am not sure. She ', ans:'might have', post:' called. (50%)', bank:['might have','must have',"can't have",'should have'] },
      { pre:'It is impossible. He ', ans:"can't have", post:' done it. (0%)', bank:["can't have",'must have','might have','should have'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada modal por su grado de certeza.',
    categories:['Casi seguro','Posible','Imposible'],
    items:[ {text:'must have',correct:0},{text:'might have',correct:1},{text:"can't have",correct:2},{text:'may have',correct:1},{text:'could have',correct:1},{text:'cannot have',correct:2} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"must have" indica una certeza del 95%.', ans:true, expl:'Correcto. casi seguro.' },
      { text:'"can\'t have" indica un 100% de certeza positiva.', ans:false, expl:'Falso. indica imposibilidad (0%).' },
      { text:'"might have" indica una posibilidad del 50%.', ans:true, expl:'Correcto.' },
      { text:'"should have" se usa para una deduccion segura.', ans:false, expl:'Falso. expresa critica o expectativa.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el modal segun la funcion.',
    transforms:[
      { original:'deduccion casi segura', task:'Modal', opts:['must have done','might have done',"can't have done",'should have done'], correct:0 },
      { original:'imposibilidad', task:'Modal', opts:["can't have done",'must have done','might have done','should have done'], correct:0 },
      { original:'critica', task:'Modal', opts:['should have done','must have done','might have done',"can't have done"], correct:0 },
      { original:'posibilidad incierta', task:'Modal', opts:['might have done','must have done',"can't have done",'should have done'], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el modal.',
    words:[ {scrambled:['T','S','U','M'],ans:'MUST',hint:'... have (casi seguro)'},{scrambled:['T','H','G','I','M'],ans:'MIGHT',hint:'... have (posible)'},{scrambled:['D','L','U','O','H','S'],ans:'SHOULD',hint:'... have (critica)'},{scrambled:['T','N','A','C'],ans:'CANT',hint:"... have (imposible)"} ] }
]);

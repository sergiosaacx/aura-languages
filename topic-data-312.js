/* topic-data-312.js - Juego 312/350 | T45 4/7 ACADEMIC DISCOURSE | distancia epistemica (ESPECIALIZADO) | Diamante C1 */
_registerGames(312, 'Distancia Epistemica · Marcar la Certeza', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual marca la certeza de forma apropiada (no categorica)?', opts:['This proves that...','The evidence suggests that...','This always means...','It is certain that...'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada expresion con su grado de certeza.',
    pairs:[ ['it would appear that','probable'],['the evidence suggests','indicio moderado'],['it is conceivable that','posible'],['this may indicate','posibilidad cautelosa'],['it is likely that','bastante probable'],['it seems that','aparente'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la expresion epistemica apropiada.',
    sents:[
      { pre:'The evidence ', ans:'suggests', post:' a link between the two.', bank:['suggests','proves','guarantees','confirms absolutely'] },
      { pre:'It would ', ans:'appear', post:' that the trend is rising.', bank:['appear','prove','confirm','guarantee'] },
      { pre:'This ', ans:'may', post:' indicate a deeper problem.', bank:['may','definitely','certainly','absolutely'] },
      { pre:'It is ', ans:'conceivable', post:' that other factors are involved.', bank:['conceivable','impossible','certain','undeniable'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la afirmacion academica es apropiada.',
    stmts:[
      { text:'"The evidence suggests a correlation." es apropiado.', ans:true, expl:'Correcto. marca incertidumbre adecuada.' },
      { text:'"This proves beyond doubt that..." es apropiado sin evidencia fuerte.', ans:false, expl:'Falso. demasiado categorico.' },
      { text:'"It is conceivable that..." expresa posibilidad.', ans:true, expl:'Correcto.' },
      { text:'"This always means..." es una afirmacion academica cauta.', ans:false, expl:'Falso. es demasiado absoluta.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion.',
    categories:['Cauta (apropiada)','Categorica (inapropiada)'],
    items:[ {text:'the evidence suggests',correct:0},{text:'this proves',correct:1},{text:'it would appear that',correct:0},{text:'it is certain that',correct:1},{text:'this may indicate',correct:0},{text:'this always means',correct:1} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Suaviza cada afirmacion academica.',
    transforms:[
      { original:'This proves a correlation.', task:'Cauta', opts:['The evidence suggests a correlation.','This proves a correlation absolutely.','This always shows a correlation.','It is certain there is a correlation.'], correct:0 },
      { original:'The trend is definitely rising.', task:'Cauta', opts:['It would appear that the trend is rising.','The trend is definitely rising.','The trend always rises.','It is certain the trend rises.'], correct:0 },
      { original:'There is a deeper problem.', task:'Cauta', opts:['This may indicate a deeper problem.','There is definitely a deeper problem.','There is always a deeper problem.','It is certain there is a problem.'], correct:0 },
      { original:'Other factors are involved.', task:'Cauta', opts:['It is conceivable that other factors are involved.','Other factors are certainly involved.','Other factors are always involved.','It is undeniable other factors exist.'], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra epistemica.',
    words:[ {scrambled:['S','T','S','E','G','G','U','S'],ans:'SUGGESTS',hint:'the evidence ...'},{scrambled:['R','A','E','P','P','A'],ans:'APPEAR',hint:'it would ... that'},{scrambled:['Y','A','M'],ans:'MAY',hint:'this ... indicate'},{scrambled:['Y','L','E','K','I','L'],ans:'LIKELY',hint:'it is ... that'} ] }
]);

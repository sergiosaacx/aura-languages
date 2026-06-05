/* topic-data-276.js - Juego 276/350 | T40 3/7 SUBJUNCTIVE | verbos y expresiones que desencadenan (ESPECIALIZADO) | Diamante C1 */
_registerGames(276, 'Detonantes del Subjuntivo', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual expresion desencadena el subjuntivo?', opts:['I think that','It is essential that','I know that','I see that'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada detonante con su patron.',
    pairs:[ ['insist','that + subjuntivo'],['it is essential','that + subjuntivo (esencial)'],['demand','that + base'],['recommend','that + base (consejo)'],['it is vital','that + subjuntivo (vital)'],['propose','that + base (propuesta)'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma subjuntiva correcta.',
    sents:[
      { pre:'It is essential that he ', ans:'be', post:' on time.', bank:['be','is','are','being'] },
      { pre:'They demand that she ', ans:'apologise', post:'.', bank:['apologise','apologises','apologised','apologising'] },
      { pre:'I propose that the meeting ', ans:'begin', post:' at nine.', bank:['begin','begins','began','beginning'] },
      { pre:'It is vital that everyone ', ans:'attend', post:'.', bank:['attend','attends','attended','attending'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"insist that" puede desencadenar el subjuntivo.', ans:true, expl:'Correcto.' },
      { text:'"I think that" desencadena el subjuntivo.', ans:false, expl:'Falso. usa indicativo normal.' },
      { text:'"It is essential that he be present" es correcto.', ans:true, expl:'Correcto.' },
      { text:'"They demand that she apologises" es subjuntivo correcto.', ans:false, expl:'Falso. that she apologise.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion.',
    categories:['Desencadena subjuntivo','No desencadena'],
    items:[ {text:'insist that',correct:0},{text:'I think that',correct:1},{text:'it is essential that',correct:0},{text:'I know that',correct:1},{text:'demand that',correct:0},{text:'I see that',correct:1} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion con subjuntivo.',
    transforms:[
      { original:'he is on time (it is essential that)', task:'Subjuntivo', opts:['It is essential that he be on time.','It is essential that he is on time.','It is essential that he are on time.','It is essential that he being on time.'], correct:0 },
      { original:'she apologises (they demand that)', task:'Subjuntivo', opts:['They demand that she apologise.','They demand that she apologises.','They demand that she apologised.','They demand that she apologising.'], correct:0 },
      { original:'the meeting begins (I propose that)', task:'Subjuntivo', opts:['I propose that the meeting begin.','I propose that the meeting begins.','I propose that the meeting began.','I propose that the meeting beginning.'], correct:0 },
      { original:'everyone attends (it is vital that)', task:'Subjuntivo', opts:['It is vital that everyone attend.','It is vital that everyone attends.','It is vital that everyone attended.','It is vital that everyone attending.'], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el detonante o verbo.',
    words:[ {scrambled:['T','S','I','S','N','I'],ans:'INSIST',hint:'... that + subjuntivo'},{scrambled:['D','N','A','M','E','D'],ans:'DEMAND',hint:'... that + base'},{scrambled:['E','B'],ans:'BE',hint:'that he ... present'},{scrambled:['D','N','E','T','T','A'],ans:'ATTEND',hint:'that everyone ...'} ] }
]);

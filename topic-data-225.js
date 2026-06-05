/* topic-data-225.js - Juego 225/350 | T33 1/7 THE PASSIVE GAME | pasiva en tiempos compuestos (ESPECIALIZADO) | Platino B2 */
_registerGames(225, 'Pasiva en Tiempos Compuestos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la pasiva correcta.',
    items:[
      { src:'El trabajo ha sido terminado', opts:['The work is finished','The work has been finished','The work was finished','The work will be finished'], correct:1 },
      { src:'La casa sera vendida', opts:['The house is sold','The house has been sold','The house will be sold','The house was sold'], correct:2 },
      { src:'El coche esta siendo reparado', opts:['The car is repaired','The car is being repaired','The car has been repaired','The car will be repaired'], correct:1 },
      { src:'La carta ha sido enviada', opts:['The letter is sent','The letter has been sent','The letter was sent','The letter will be sent'], correct:1 },
      { src:'El puente sera construido', opts:['The bridge is built','The bridge has been built','The bridge will be built','The bridge was built'], correct:2 },
      { src:'Las habitaciones estan siendo limpiadas', opts:['The rooms are cleaned','The rooms are being cleaned','The rooms have been cleaned','The rooms will be cleaned'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'La pasiva del Present Perfect se forma con...', opts:['is + participio','has been + participio','will be + participio','is being + participio'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'The work ', ans:'has been', post:' finished.', bank:['has been','is','was','will be'] },
      { pre:'The house will ', ans:'be', post:' sold next year.', bank:['be','been','being','is'] },
      { pre:'The car is ', ans:'being', post:' repaired now.', bank:['being','been','be','is'] },
      { pre:'The letters have been ', ans:'sent', post:'.', bank:['sent','send','sending','sends'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['N','E','E','B'],ans:'BEEN',hint:'has ... finished'},{scrambled:['G','N','I','E','B'],ans:'BEING',hint:'is ... repaired'},{scrambled:['E','B'],ans:'BE',hint:'will ... sold'},{scrambled:['T','N','E','S'],ans:'SENT',hint:'participio de send'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"The work has been finished." es pasiva del Present Perfect.', ans:true, expl:'Correcto. has been + participio.' },
      { text:'"The house will sold." es pasiva correcta del futuro.', ans:false, expl:'Falso. will be sold.' },
      { text:'"The car is being repaired." es pasiva continua.', ans:true, expl:'Correcto. is being + participio.' },
      { text:'"The letter has sent." es pasiva correcta.', ans:false, expl:'Falso. has been sent.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Convierte cada activa en pasiva.',
    transforms:[
      { original:'They have finished the work.', task:'Pasiva', opts:['The work has been finished.','The work is finished.','The work was finished.','The work will finish.'], correct:0 },
      { original:'They will sell the house.', task:'Pasiva', opts:['The house will be sold.','The house is sold.','The house has been sold.','The house was sold.'], correct:0 },
      { original:'They are repairing the car.', task:'Pasiva', opts:['The car is being repaired.','The car is repaired.','The car has been repaired.','The car will be repaired.'], correct:0 },
      { original:'They have sent the letter.', task:'Pasiva', opts:['The letter has been sent.','The letter is sent.','The letter was sent.','The letter will be sent.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Is the report ready?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, it has been finished.','Yes, it is finished now then.','Yes, it has finished.','Yes, it will finished.'], correct:0 },
      { speaker:0, text:'What about the car?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It is being repaired.','It is repaired being.','It has repaired.','It will repaired.'], correct:0 },
      { speaker:0, text:'Good.', blank:false } ] }
]);

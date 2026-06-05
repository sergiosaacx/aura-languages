/* topic-data-250.js - Juego 250/350 | T36 5/7 REGISTER SHIFT | formales y hedging en contexto (MEZCLADO) | Platino B2 */
_registerGames(250, 'Expresiones Formales y Hedging · En Contexto', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la version formal correcta.',
    items:[
      { src:'Pareceria que los resultados fueron poco concluyentes', opts:['It would appear that the results were inconclusive','It looks like the results were not clear','It seems the results were a bit off','The results were kinda unclear'], correct:0 },
      { src:'Me gustaria preguntar sobre el puesto', opts:['I wanna ask about the job','I would like to enquire about the position','I wanna know about the gig','Can I ask about the job?'], correct:1 },
      { src:'Necesitamos obtener mas informacion', opts:['We gotta get more info','We need to obtain more information','We wanna get more stuff','We need more info quick'], correct:1 },
      { src:'La reunion comenzara a las nueve', opts:['The meeting will commence at nine','The meeting will kick off at nine','The meeting starts at nine, cool','The meeting is gonna start at nine'], correct:0 },
      { src:'Los datos parecen apoyar la teoria', opts:['The data seems to support the theory','The data totally backs the theory','The data definitely proves it','The data shows it for sure'], correct:0 },
      { src:'Habia aproximadamente cien personas', opts:['There were like a hundred people','There were approximately a hundred people','There were a hundred-ish people','There were tons of people'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es mas formal?', opts:['It would appear that...','It looks like...','It seems kinda...','I guess that...'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra formal correcta.',
    sents:[
      { pre:'I would like to ', ans:'enquire', post:' about the position.', bank:['enquire','ask','wanna ask','find out'] },
      { pre:'We need to ', ans:'obtain', post:' more information.', bank:['obtain','get','grab','pick up'] },
      { pre:'It would ', ans:'appear', post:' that the results were inconclusive.', bank:['appear','look','seem like','feel'] },
      { pre:'The meeting will ', ans:'commence', post:' at nine.', bank:['commence','start','kick off','begin'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['enquire','I','would','like','to','about','the','position'],ans:['I','would','like','to','enquire','about','the','position']},{words:['obtain','We','need','to','more','information'],ans:['We','need','to','obtain','more','information']},{words:['appear','It','would','that','it','is','true'],ans:['It','would','appear','that','it','is','true']} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Pasa cada oracion al registro formal.',
    transforms:[
      { original:'I wanna ask about the job.', task:'Formal', opts:['I would like to enquire about the position.','I wanna know about the job.','I wanna ask about the gig.','Can I ask about the job?'], correct:0 },
      { original:'We gotta get more info.', task:'Formal', opts:['We need to obtain more information.','We gotta grab more info.','We wanna get more stuff.','We need info quick.'], correct:0 },
      { original:'The meeting kicks off at nine.', task:'Formal', opts:['The meeting will commence at nine.','The meeting starts at nine.','The meeting begins, cool.','The meeting is gonna start.'], correct:0 },
      { original:'It looks like it is wrong.', task:'Formal', opts:['It would appear that it is incorrect.','It looks kinda wrong.','It seems off.','I guess it is wrong.'], correct:0 } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es de registro formal.',
    stmts:[
      { text:'"I would like to enquire about the position." es formal.', ans:true, expl:'Correcto.' },
      { text:'"We gotta get more info." es formal.', ans:false, expl:'Falso. es informal.' },
      { text:'"It would appear that..." es una expresion formal de hedging.', ans:true, expl:'Correcto.' },
      { text:'"The meeting kicks off at nine." es formal.', ans:false, expl:'Falso. es informal.' } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra formal.',
    words:[ {scrambled:['E','R','I','U','Q','N','E'],ans:'ENQUIRE',hint:'formal de ask'},{scrambled:['N','I','A','T','B','O'],ans:'OBTAIN',hint:'formal de get'},{scrambled:['E','C','N','E','M','M','O','C'],ans:'COMMENCE',hint:'formal de begin'},{scrambled:['R','A','E','P','P','A'],ans:'APPEAR',hint:'it would ...'} ] }
]);

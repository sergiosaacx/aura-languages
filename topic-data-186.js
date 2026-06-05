/* topic-data-186.js - Juego 186/350 | T27 4/7 VERB PATTERNS | percepcion + -ing vs inf (ESPECIALIZADO) | Oro B1 */
_registerGames(186, 'Verbos de Percepcion + -ing vs Infinitivo', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Lo vi cruzar la calle', opts:['I saw him to cross the street','I saw him cross the street','I saw him crossing to the street','I saw him crosses the street'], correct:1 },
      { src:'La oi cantar en la ducha', opts:['I heard her to sing in the shower','I heard her singing in the shower','I heard her to singing','I heard her sings'], correct:1 },
      { src:'Lo vi caer', opts:['I saw him to fall','I saw him fall','I saw him to falling','I saw him falls'], correct:1 },
      { src:'Los escuche discutir', opts:['I heard them to argue','I heard them arguing','I heard them to arguing','I heard them argues'], correct:1 },
      { src:'Senti temblar el suelo', opts:['I felt the ground to shake','I felt the ground shake','I felt the ground to shaking','I felt the ground shakes'], correct:1 },
      { src:'La vi esperando el bus', opts:['I saw her to wait the bus','I saw her waiting for the bus','I saw her to waiting','I saw her waits'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Despues de verbos de percepcion (see/hear) NO se usa...', opts:['-ing','infinitivo sin to','to + infinitivo','objeto'], correct:2 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada inicio con su continuacion correcta.',
    pairs:[ ['I saw him','cross the street'],['I heard her','singing'],['I watched them','play football'],['I felt it','shake'],['I saw her','crying'],['I heard him','shout'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'I saw him ', ans:'cross', post:' the street.', bank:['cross','to cross','crosses','to crossing'] },
      { pre:'I heard her ', ans:'singing', post:' in the shower.', bank:['singing','to sing','sings','to singing'] },
      { pre:'We watched them ', ans:'play', post:' football.', bank:['play','to play','plays','to playing'] },
      { pre:'I felt the ground ', ans:'shake', post:'.', bank:['shake','to shake','shakes','to shaking'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"I saw him cross the street." es correcto.', ans:true, expl:'Correcto. percepcion + inf sin to.' },
      { text:'"I saw him to cross the street." es correcto.', ans:false, expl:'Falso. sin to: I saw him cross.' },
      { text:'"I heard her singing" enfatiza la accion en proceso.', ans:true, expl:'Correcto. -ing = en proceso.' },
      { text:'Despues de "see" siempre se usa "to + infinitivo".', ans:false, expl:'Falso. inf sin to o -ing.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion de percepcion correcta.',
    transforms:[
      { original:'cross / I saw him (accion completa)', task:'Percepcion', opts:['I saw him cross the street.','I saw him to cross the street.','I saw him crosses the street.','I saw him to crossing.'], correct:0 },
      { original:'sing / I heard her (en proceso)', task:'Percepcion', opts:['I heard her singing.','I heard her to sing.','I heard her sings.','I heard her to singing.'], correct:0 },
      { original:'play / we watched them', task:'Percepcion', opts:['We watched them play.','We watched them to play.','We watched them plays.','We watched them to playing.'], correct:0 },
      { original:'shake / I felt it', task:'Percepcion', opts:['I felt it shake.','I felt it to shake.','I felt it shakes.','I felt it to shaking.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Did you see the accident?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I saw the car hit the wall.','Yes, I saw the car to hit the wall.','Yes, I saw the car hits the wall.','Yes, I saw the car to hitting the wall.'], correct:0 },
      { speaker:0, text:'What was she doing?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I heard her crying in her room.','I heard her to cry in her room.','I heard her cries in her room.','I heard her to crying.'], correct:0 },
      { speaker:0, text:'Poor thing.', blank:false } ] }
]);

/* topic-data-331.js - Juego 331/350 | T48 2/7 GRAMMAR EDGE | binomiales irreversibles (ESPECIALIZADO) | Challenger C2 */
_registerGames(331, 'Binomiales Irreversibles · Orden Fijo', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es el orden correcto?', opts:['white and black','black and white','black or white','white or black'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada binomial con su significado.',
    pairs:[ ['black and white','claro/sin matices'],['bread and butter','el sustento'],['now and then','de vez en cuando'],['pros and cons','ventajas y desventajas'],['hit and run','atropello y fuga'],['come and go','ir y venir'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el orden correcto del binomial.',
    sents:[
      { pre:'It is not all ', ans:'black and white', post:'.', bank:['black and white','white and black','white or black','black or white'] },
      { pre:'Teaching is my ', ans:'bread and butter', post:'.', bank:['bread and butter','butter and bread','bread or butter','butter or bread'] },
      { pre:'I see her ', ans:'now and then', post:'.', bank:['now and then','then and now','then or now','now or then'] },
      { pre:'We weighed the ', ans:'pros and cons', post:'.', bank:['pros and cons','cons and pros','cons or pros','pros or cons'] } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra mal ordenada y elige la correccion.',
    sents:[
      { words:['It','is','white','and','black','.'], wi:2, correct:'black', choices:['black','white','grey','dark'] },
      { words:['my','butter','and','bread','.'], wi:1, correct:'bread', choices:['bread','butter','toast','jam'] },
      { words:['I','see','her','then','and','now','.'], wi:3, correct:'now', choices:['now','then','soon','later'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si el orden es el convencional.',
    stmts:[
      { text:'"black and white" es el orden correcto.', ans:true, expl:'Correcto.' },
      { text:'"butter and bread" es el orden convencional.', ans:false, expl:'Falso. bread and butter.' },
      { text:'"now and then" es el orden correcto.', ans:true, expl:'Correcto.' },
      { text:'"cons and pros" es el orden convencional.', ans:false, expl:'Falso. pros and cons.' } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['white','black','and'],ans:['black','and','white']},{words:['butter','bread','and'],ans:['bread','and','butter']},{words:['cons','pros','and'],ans:['pros','and','cons']} ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['K','C','A','L','B'],ans:'BLACK',hint:'... and white'},{scrambled:['D','A','E','R','B'],ans:'BREAD',hint:'... and butter'},{scrambled:['S','O','R','P'],ans:'PROS',hint:'... and cons'},{scrambled:['W','O','N'],ans:'NOW',hint:'... and then'} ] }
]);

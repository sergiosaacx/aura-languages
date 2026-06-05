/* topic-data-248.js - Juego 248/350 | T36 3/7 REGISTER SHIFT | eufemismos y lenguaje diplomatico (ESPECIALIZADO) | Platino B2 */
_registerGames(248, 'Eufemismos y Lenguaje Diplomatico', [
  { id:'translate', label:'Significado real', xp:25, instr:'Elige el significado real del eufemismo.',
    items:[
      { src:'pass away', opts:['die','travel','leave a job','retire'], correct:0 },
      { src:'let go', opts:['promote','fire','hire','train'], correct:1 },
      { src:'downsizing', opts:['growth','layoffs','expansion','merger'], correct:1 },
      { src:'between jobs', opts:['on holiday','unemployed','promoted','retired'], correct:1 },
      { src:'economical with the truth', opts:['honest','lying','generous','careful'], correct:1 },
      { src:'senior citizen', opts:['child','old person','manager','student'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"let go" es un eufemismo de...', opts:['promote','fire','hire','train'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada eufemismo con su significado real.',
    pairs:[ ['pass away','die'],['let go','fire'],['downsizing','layoffs'],['between jobs','unemployed'],['senior citizen','old person'],['pre-owned','used'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el eufemismo correcto.',
    sents:[
      { pre:'I am sorry, your grandfather ', ans:'passed away', post:' last night.', bank:['passed away','let go','downsized','retired'] },
      { pre:'The company had to ', ans:'let go', post:' 100 employees.', bank:['let go','pass away','enquire','obtain'] },
      { pre:'He is currently ', ans:'between jobs', post:'.', bank:['between jobs','passed away','downsizing','let go'] },
      { pre:'This is a ', ans:'pre-owned', post:' car.', bank:['pre-owned','passed away','let go','between jobs'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"pass away" es un eufemismo de "die".', ans:true, expl:'Correcto.' },
      { text:'"let go" significa contratar.', ans:false, expl:'Falso. significa despedir.' },
      { text:'"between jobs" es una forma suave de decir desempleado.', ans:true, expl:'Correcto.' },
      { text:'"downsizing" significa expansion.', ans:false, expl:'Falso. significa recortes/despidos.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion.',
    categories:['Eufemismo','Lenguaje directo'],
    items:[ {text:'pass away',correct:0},{text:'die',correct:1},{text:'let go',correct:0},{text:'fire',correct:1},{text:'between jobs',correct:0},{text:'unemployed',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'He passed away peacefully.', type:'select', opts:['He passed away peacefully.','He passed by peacefully.','He passed out peacefully.','He passed up peacefully.'], correct:0 },
      { tts:'They let him go last week.', type:'select', opts:['They let him go last week.','They let him out last week.','They let him in last week.','They let him off last week.'], correct:0 },
      { tts:'She is between jobs right now.', type:'select', opts:['She is between jobs right now.','She is beside jobs right now.','She is among jobs right now.','She is between job right now.'], correct:0 } ] }
]);

/* topic-data-036.js - Juego 36/350 | T6 1/7 MINE & YOURS | Adjetivos posesivos reconocimiento (ESPECIALIZADO) | Bronce A1 */
_registerGames(36, 'Adjetivos Posesivos · Reconocimiento', [
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige el adjetivo posesivo correcto en ingles.',
    items:[
      { src:'mi',            opts:['me','my','mine','I'], correct:1 },
      { src:'tu (posesivo)', opts:['your','you','yours','my'], correct:0 },
      { src:'su (de el)',    opts:['her','him','his','he'], correct:2 },
      { src:'su (de ella)',  opts:['his','her','hers','she'], correct:1 },
      { src:'nuestro',       opts:['us','our','ours','we'], correct:1 },
      { src:'su (de ellos)', opts:['their','them','theirs','they'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Que adjetivo posesivo va con "she"?',
    opts:['his','her','its','their'], correct:1 },
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada pronombre con su adjetivo posesivo.',
    pairs:[ ['I','my'],['you','your'],['he','his'],['she','her'],['we','our'],['they','their'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el adjetivo posesivo correcto.',
    sents:[
      { pre:'This is ', ans:'my', post:' book.', bank:['I','my','me','mine'] },
      { pre:'That is ', ans:'his', post:' car.', bank:['he','his','him','her'] },
      { pre:'It is ', ans:'her', post:' bag.', bank:['she','her','hers','his'] },
      { pre:'This is ', ans:'our', post:' house.', bank:['we','our','us','ours'] } ] },
  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada posesivo como singular o plural.',
    categories:['Singular','Plural'],
    items:[ {text:'my',correct:0},{text:'his',correct:0},{text:'her',correct:0},{text:'its',correct:0},{text:'our',correct:1},{text:'their',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'This is my book.', type:'select', opts:['This is my book.','This is your book.','This is his book.','This is her book.'], correct:0 },
      { tts:'That is her bag.', type:'select', opts:['That is her bag.','That is his bag.','That is your bag.','That is their bag.'], correct:0 },
      { tts:'It is their house.', type:'select', opts:['It is their house.','It is our house.','It is your house.','It is his house.'], correct:0 } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"my" es el posesivo de "I".', ans:true, expl:'Correcto. I -> my.' },
      { text:'"his" es el posesivo de "she".', ans:false, expl:'Falso. his es de he. De she es her.' },
      { text:'"our" es el posesivo de "we".', ans:true, expl:'Correcto. we -> our.' },
      { text:'"their" es el posesivo de "I".', ans:false, expl:'Falso. their es de they. De I es my.' } ] }
]);

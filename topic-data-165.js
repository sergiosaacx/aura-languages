/* topic-data-165.js - Juego 165/350 | T24 4/7 IF I HAD | were en Condicional 2 (ESPECIALIZADO) | Oro B1 */
_registerGames(165, 'Were en Condicional 2', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'En lenguaje formal, cual usas en el cond 2?', opts:['If I was','If I were','If I am','If I will be'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"If I were you, I would apologize." es la forma correcta.', ans:true, expl:'Correcto. were para todos en cond 2 formal.' },
      { text:'"If she was rich..." es aceptado en lenguaje informal.', ans:true, expl:'Correcto, aunque were es mas formal.' },
      { text:'"If I were you" se considera incorrecto.', ans:false, expl:'Falso. Es la forma correcta y formal.' },
      { text:'"If I am you, I would help." es correcto.', ans:false, expl:'Falso. If I were you.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'If I ', ans:'were', post:' you, I would study.', bank:['were','was','am','will be'] },
      { pre:'If she ', ans:'were', post:' here, she would help.', bank:['were','was','is','will be'] },
      { pre:'If he ', ans:'were', post:' taller, he would play basketball.', bank:['were','was','is','will be'] },
      { pre:'I would travel if I ', ans:'were', post:' rich.', bank:['were','was','am','will be'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['were','If','I','you','I','would','apologize'],ans:['If','I','were','you','I','would','apologize']},{words:['were','If','she','here','help','she','would'],ans:['If','she','were','here','she','would','help']},{words:['were','If','I','rich','I','would','travel'],ans:['If','I','were','rich','I','would','travel']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion (formal).',
    sents:[
      { words:['If','I','was','you','I','would','help','.'], wi:2, correct:'were', choices:['were','was','am','will be'] },
      { words:['If','she','is','here','she','would','help','.'], wi:2, correct:'were', choices:['were','is','was','will be'] },
      { words:['If','I','am','rich','I','would','travel','.'], wi:2, correct:'were', choices:['were','am','was','will be'] } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'If I were you, I would apologize.', type:'select', opts:['If I were you, I would apologize.','If I was you, I would apologize.','If I am you, I would apologize.','If I will be you, I would apologize.'], correct:0 },
      { tts:'If she were here, she would help.', type:'select', opts:['If she were here, she would help.','If she was here, she would help.','If she is here, she would help.','If she will be here, she would help.'], correct:0 },
      { tts:'I would travel if I were rich.', type:'select', opts:['I would travel if I were rich.','I would travel if I was rich.','I would travel if I am rich.','I would travel if I will be rich.'], correct:0 } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion con were (formal).',
    transforms:[
      { original:'consejo: be you / apologize', task:'Con were', opts:['If I were you, I would apologize.','If I was you, I would apologize.','If I am you, I would apologize.','If I will be you, I would apologize.'], correct:0 },
      { original:'hipotesis: she be here / help', task:'Con were', opts:['If she were here, she would help.','If she was here, she would help.','If she is here, she would help.','If she will be here, she would help.'], correct:0 },
      { original:'hipotesis: I be rich / travel', task:'Con were', opts:['If I were rich, I would travel.','If I was rich, I would travel.','If I am rich, I would travel.','If I will be rich, I would travel.'], correct:0 },
      { original:'consejo: be him / study', task:'Con were', opts:['If I were him, I would study.','If I was him, I would study.','If I am him, I would study.','If I will be him, I would study.'], correct:0 } ] }
]);

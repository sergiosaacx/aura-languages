/* topic-data-200.js - Juego 200/350 | T29 4/7 LINK IT UP | relativas especificativas vs explicativas (ESPECIALIZADO) | Oro B1 */
_registerGames(200, 'Relativas Especificativas vs Explicativas', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Una relativa explicativa (informacion extra) lleva...', opts:['sin comas','con comas','sin pronombre','sin verbo'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"The man who called is my brother." es especificativa (sin comas).', ans:true, expl:'Correcto. info esencial.' },
      { text:'"My brother, who called, is a doctor." es explicativa.', ans:true, expl:'Correcto. info extra entre comas.' },
      { text:'Las relativas especificativas llevan comas.', ans:false, expl:'Falso. van sin comas.' },
      { text:'En una relativa explicativa se puede omitir el pronombre relativo.', ans:false, expl:'Falso. no se omite en explicativas.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el pronombre relativo correcto.',
    sents:[
      { pre:'My brother, ', ans:'who', post:' lives in Paris, is a doctor.', bank:['who','which','where','whose'] },
      { pre:'The house, ', ans:'which', post:' is very old, needs repair.', bank:['which','who','where','whose'] },
      { pre:'Paris, ', ans:'where', post:' I was born, is beautiful.', bank:['where','who','which','whose'] },
      { pre:'Anna, ', ans:'whose', post:' dog is huge, is my friend.', bank:['whose','who','which','where'] } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la puntuacion correcta segun el tipo.',
    transforms:[
      { original:'info esencial (sin comas)', task:'Relativa', opts:['The man who called is my brother.','The man, who called, is my brother.','The man who called, is my brother.','The man, who called is my brother.'], correct:0 },
      { original:'info extra (con comas)', task:'Relativa', opts:['My brother, who called, is a doctor.','My brother who called is a doctor.','My brother who called, is a doctor.','My brother, who called is a doctor.'], correct:0 },
      { original:'info esencial sobre el libro', task:'Relativa', opts:['The book that I read was good.','The book, that I read, was good.','The book, that I read was good.','The book that I read, was good.'], correct:0 },
      { original:'info extra sobre Paris', task:'Relativa', opts:['Paris, which is in France, is lovely.','Paris which is in France is lovely.','Paris which is in France, is lovely.','Paris, which is in France is lovely.'], correct:0 } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['who','The','man','called','is','my','brother'],ans:['The','man','who','called','is','my','brother']},{words:['which','The','car','is','red','is','mine'],ans:['The','car','which','is','red','is','mine']},{words:['whose','The','woman','car','broke','called'],ans:['The','woman','whose','car','broke','called']} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada oracion por el tipo de relativa.',
    categories:['Especificativa (sin comas)','Explicativa (con comas)'],
    items:[ {text:'The man who called is my brother',correct:0},{text:'My brother, who called, is a doctor',correct:1},{text:'The book that I read',correct:0},{text:'Paris, where I was born',correct:1},{text:'The girl who won',correct:0},{text:'Tom, who is tall',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'The man who called is my brother.', type:'select', opts:['The man who called is my brother.','The man which called is my brother.','The man where called is my brother.','The man whose called is my brother.'], correct:0 },
      { tts:'My brother, who is a doctor, lives here.', type:'select', opts:['My brother, who is a doctor, lives here.','My brother, which is a doctor, lives here.','My brother, where is a doctor, lives here.','My brother, whose is a doctor, lives here.'], correct:0 },
      { tts:'Paris, where I was born, is beautiful.', type:'select', opts:['Paris, where I was born, is beautiful.','Paris, which I was born, is beautiful.','Paris, who I was born, is beautiful.','Paris, whose I was born, is beautiful.'], correct:0 } ] }
]);

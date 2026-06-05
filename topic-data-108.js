/* topic-data-108.js - Juego 108/350 | T16 3/7 I HAVE DONE IT | ever/never (ESPECIALIZADO) | Plata A2 */
_registerGames(108, 'Ever / Never', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta con ever/never.',
    items:[
      { src:'Has estado alguna vez en Londres?', opts:['Have you never been to London?','Have you ever been to London?','Have you been ever to London never?','Do you ever been to London?'], correct:1 },
      { src:'Nunca he comido sushi', opts:['I have ever eaten sushi','I have never eaten sushi','I never have eaten sushi ever','I have not never eaten sushi'], correct:1 },
      { src:'Alguna vez has visto un leon?', opts:['Have you ever seen a lion?','Have you never seen a lion?','Did you ever see a lion never?','Have you ever saw a lion?'], correct:0 },
      { src:'Ella nunca ha viajado', opts:['She has ever travelled','She has never travelled','She never has travelled ever','She has not never travelled'], correct:1 },
      { src:'Has probado alguna vez el cafe?', opts:['Have you ever tried coffee?','Have you never tried coffee?','Did you ever tried coffee?','Have you ever try coffee?'], correct:0 },
      { src:'Yo nunca he estado aqui', opts:['I have ever been here','I have never been here','I never been here ever','I have not ever been here never'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada uso con su descripcion.',
    pairs:[ ['ever','en preguntas (alguna vez)'],['never','en afirmativas (nunca)'],['Have you ever...?','pregunta de experiencia'],['I have never...','sin experiencia'],['ever seen','alguna vez visto'],['never been','nunca ha estado'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['R','E','V','E'],ans:'EVER',hint:'en preguntas (alguna vez)'},{scrambled:['R','E','V','E','N'],ans:'NEVER',hint:'nunca'},{scrambled:['N','E','E','B'],ans:'BEEN',hint:'participio de be'},{scrambled:['N','E','E','S'],ans:'SEEN',hint:'participio de see'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"ever" se usa en preguntas: "Have you ever...?".', ans:true, expl:'Correcto. ever en preguntas.' },
      { text:'"never" se usa en afirmativas con sentido negativo.', ans:true, expl:'Correcto. I have never been.' },
      { text:'"I have ever been there." es correcto.', ans:false, expl:'Falso. En afirmativa: never.' },
      { text:'"Have you never tried it?" es la forma normal de preguntar.', ans:false, expl:'Falso. Have you ever tried it?' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion con ever o never.',
    transforms:[
      { original:'experiencia (pregunta)', task:'ever/never', opts:['Have you ever been to Rome?','Have you never been to Rome?','Did you ever been to Rome?','Have you ever was to Rome?'], correct:0 },
      { original:'sin experiencia', task:'ever/never', opts:['I have never seen snow.','I have ever seen snow.','I never have seen snow today.','I have not never seen snow.'], correct:0 },
      { original:'pregunta de comida', task:'ever/never', opts:['Have you ever eaten sushi?','Have you never eaten sushi?','Did you ever eaten sushi?','Have you ever ate sushi?'], correct:0 },
      { original:'sin experiencia (ella)', task:'ever/never', opts:['She has never flown.','She has ever flown.','She never has flown ever.','She has not never flown.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con ever/never.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:null, blank:true, opts:['Have you ever been to Japan?','Have you never been to Japan?','Did you ever been to Japan?','Have you ever was to Japan?'], correct:0 },
      { speaker:1, text:null, blank:true, opts:["No, I have never been there.","No, I have ever been there.","No, I never been there.","No, I have not never been there."], correct:0 },
      { speaker:0, text:'You should go!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada frase segun use ever o never.',
    categories:['ever (preguntas)','never (afirmativas)'],
    items:[ {text:'Have you ever...?',correct:0},{text:'I have never...',correct:1},{text:'ever seen?',correct:0},{text:'never been',correct:1},{text:'Has she ever...?',correct:0},{text:'They have never...',correct:1} ] }
]);

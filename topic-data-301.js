/* topic-data-301.js - Juego 301/350 | T43 7/7 STYLE & REGISTER | uso incorrecto de recursos (MEZCLADO) | Diamante C1 */
_registerGames(301, 'Recursos Estilisticos · Uso Incorrecto', [
  { id:'translate', label:'Identifica', xp:25, instr:'Elige la version correcta de la figura.',
    items:[
      { src:'simil de terquedad', opts:['as stubborn as a mule','as stubborn as a fish','as stubborn as a cloud','as stubborn as a leaf'], correct:0 },
      { src:'metafora del corazon bondadoso', opts:['a heart of stone','a heart of gold','a heart of glass','a heart of wood'], correct:1 },
      { src:'understatement de algo excelente', opts:['not bad at all','the worst ever','absolutely awful','a total disaster'], correct:0 },
      { src:'simil de rapidez', opts:['as fast as lightning','as fast as a rock','as fast as a wall','as fast as mud'], correct:0 },
      { src:'metafora del tiempo valioso', opts:['time is money','time is water','time is sand','time is air'], correct:0 },
      { src:'hiperbole de cansancio', opts:['I could sleep for a year','I am a bit tired','I rested well','I feel fine'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es la forma convencional?', opts:['a heart of stone (bondad)','a heart of gold (bondad)','a heart of glass (bondad)','a heart of wood (bondad)'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada figura deformada con su forma correcta.',
    pairs:[ ['as stubborn as a fish','as stubborn as a mule'],['a heart of stone (bondad)','a heart of gold'],['as fast as a rock','as fast as lightning'],['time is water','time is money'],['as busy as a cat','as busy as a bee'],['a flood of stones','a flood of tears'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['mule','as','stubborn','as','a'],ans:['as','stubborn','as','a','mule']},{words:['gold','a','heart','of'],ans:['a','heart','of','gold']},{words:['money','Time','is'],ans:['Time','is','money']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['as','stubborn','as','a','fish','.'], wi:4, correct:'mule', choices:['mule','fish','cloud','leaf'] },
      { words:['a','heart','of','stone','.'], wi:3, correct:'gold', choices:['gold','stone','glass','wood'] },
      { words:['as','busy','as','a','cat','.'], wi:4, correct:'bee', choices:['bee','cat','dog','bird'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada figura es convencional.',
    stmts:[
      { text:'"as stubborn as a mule" es la forma correcta.', ans:true, expl:'Correcto.' },
      { text:'"a heart of stone" describe a alguien bondadoso.', ans:false, expl:'Falso. a heart of gold para bondad.' },
      { text:'"as fast as lightning" es la forma correcta.', ans:true, expl:'Correcto.' },
      { text:'"as busy as a cat" es la forma convencional.', ans:false, expl:'Falso. as busy as a bee.' } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['E','L','U','M'],ans:'MULE',hint:'as stubborn as a ...'},{scrambled:['E','E','B'],ans:'BEE',hint:'as busy as a ...'},{scrambled:['D','L','O','G'],ans:'GOLD',hint:'heart of ...'},{scrambled:['G','N','I','N','T','H','G','I','L'],ans:'LIGHTNING',hint:'as fast as ...'} ] }
]);

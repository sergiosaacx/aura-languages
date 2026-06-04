/* topic-data-068.js - Juego 68/350 | T10 5/7 ASK AWAY | Preguntas WH completas estructura (ESPECIALIZADO) | Bronce A1 */
_registerGames(68, 'Preguntas WH · Completas', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual pregunta esta bien formada?', opts:['How many brothers you have?','How many brothers do you have?','How many brothers have you?','How many brother do you have?'], correct:1 },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:['live','Where','you','do'], ans:['Where','do','you','live'] },
      { words:['crying','is','Why','she'], ans:['Why','is','she','crying'] },
      { words:['have','do','How','many','brothers','you'], ans:['How','many','brothers','do','you','have'] } ] },
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la pregunta completa correcta.',
    items:[
      { src:'Donde vives?', opts:['Where you live?','Where do you live?','Where does you live?','Where live you?'], correct:1 },
      { src:'Por que llora ella?', opts:['Why she cry?','Why is she crying?','Why she crying?','Why does she crying?'], correct:1 },
      { src:'Cuantos hermanos tienes?', opts:['How many brothers you have?','How many brothers do you have?','How much brothers do you have?','How many brother do you have?'], correct:1 },
      { src:'Que comes?', opts:['What you eat?','What do you eat?','What does you eat?','What eat you?'], correct:1 },
      { src:'Cuando empieza?', opts:['When it start?','When does it start?','When do it start?','When start it?'], correct:1 },
      { src:'Quien es ella?', opts:['Who she is?','Who is she?','Who does she?','Who she?'], correct:1 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra de la pregunta.',
    words:[ {scrambled:['R','E','H','W','E'],ans:'WHERE',hint:'... do you live?'},{scrambled:['Y','H','W'],ans:'WHY',hint:'... is she crying?'},{scrambled:['O','W','H'],ans:'WHO',hint:'... is she?'},{scrambled:['E','V','I','L'],ans:'LIVE',hint:'Where do you ...?'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada pregunta esta bien formada.',
    stmts:[
      { text:'"Where do you live?" es correcto.', ans:true, expl:'Correcto. WH + do + sujeto + verbo.' },
      { text:'"Why she crying?" es correcto.', ans:false, expl:'Falso. Falta el verbo to be: Why is she crying?' },
      { text:'"How many brothers do you have?" es correcto.', ans:true, expl:'Correcto. estructura completa.' },
      { text:'"What you eat?" es correcto.', ans:false, expl:'Falso. Falta el auxiliar: What do you eat?' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada pregunta como correcta o incorrecta.',
    categories:['Correcta','Incorrecta'],
    items:[ {text:'Where do you live?',correct:0},{text:'Where you live?',correct:1},{text:'Why is she crying?',correct:0},{text:'Why she crying?',correct:1},{text:'What do you eat?',correct:0},{text:'What you eat?',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la pregunta que oyes.',
    items:[
      { tts:'Where do you live?', type:'select', opts:['Where do you live?','Where you live?','Where does you live?','Where live you?'], correct:0 },
      { tts:'How many brothers do you have?', type:'select', opts:['How many brothers do you have?','How much brothers do you have?','How many brothers you have?','How many brother do you have?'], correct:0 },
      { tts:'Why is she crying?', type:'select', opts:['Why is she crying?','Why she crying?','Why she is crying?','Why does she crying?'], correct:0 } ] }
]);

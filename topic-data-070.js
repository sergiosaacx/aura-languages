/* topic-data-070.js - Juego 70/350 | T10 7/7 ASK AWAY | errores tipicos en preguntas WH (MEZCLADO) | Bronce A1 */
_registerGames(70, 'Preguntas WH · Errores Tipicos', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['Where you work?','Where do you work?','Where does you work?','Where work you?'], correct:1 },
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Donde trabajas?', opts:['Where you work?','Where do you work?','Where does you work?','Where work you?'], correct:1 },
      { src:'Cuanta leche quieres?', opts:['How many milk do you want?','How much milk do you want?','How old milk do you want?','How much milk you want?'], correct:1 },
      { src:'Quien vive aqui?', opts:['Who does lives here?','Who lives here?','Who do lives here?','Who live here?'], correct:1 },
      { src:'Que comes?', opts:['What you eat?','What do you eat?','What does you eat?','What eat you?'], correct:1 },
      { src:'Cuantos anos tienes?', opts:['How many years you have?','How old are you?','How much are you?','How old you are?'], correct:1 },
      { src:'Cuando empieza?', opts:['When it starts?','When does it start?','When start it?','When it start?'], correct:1 } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:['work','Where','you','do'], ans:['Where','do','you','work'] },
      { words:['here','Who','lives'], ans:['Who','lives','here'] },
      { words:['milk','How','much','want','you','do'], ans:['How','much','milk','do','you','want'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['H','C','U','M'],ans:'MUCH',hint:'How ... milk?'},{scrambled:['V','I','E','S','L'],ans:'LIVES',hint:'Who ... here?'},{scrambled:['O','D'],ans:'DO',hint:'Where ... you work?'},{scrambled:['K','O','R','W'],ans:'WORK',hint:'Where do you ...?'} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['Where','you','work','?'], wi:1, correct:'do', choices:['do','you','does','are'] },
      { words:['How','many','milk','do','you','want','?'], wi:1, correct:'much', choices:['much','many','old','long'] },
      { words:['When','works','here','?'], wi:0, correct:'Who', choices:['Who','When','What','Where'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada pregunta como correcta o incorrecta.',
    categories:['Correcta','Incorrecta'],
    items:[ {text:'Where do you work?',correct:0},{text:'Where you work?',correct:1},{text:'How much milk?',correct:0},{text:'How many milk?',correct:1},{text:'Who lives here?',correct:0},{text:'Who does lives here?',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la pregunta correcta que oyes.',
    items:[
      { tts:'Where do you work?', type:'select', opts:['Where do you work?','Where you work?','Where does you work?','Where work you?'], correct:0 },
      { tts:'How much milk do you want?', type:'select', opts:['How much milk do you want?','How many milk do you want?','How old milk do you want?','How much milk you want?'], correct:0 },
      { tts:'Who lives here?', type:'select', opts:['Who lives here?','Who does lives here?','Who do lives here?','Who live here?'], correct:0 } ] }
]);

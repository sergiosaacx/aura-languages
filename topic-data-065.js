/* topic-data-065.js - Juego 65/350 | T10 2/7 ASK AWAY | WH segun tipo de respuesta (ESPECIALIZADO) | Bronce A1 */
_registerGames(65, 'Palabras WH · Segun la Respuesta', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Si la respuesta es "In London", que WH usas?', opts:['What','Where','Who','When'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada respuesta con su palabra WH.',
    pairs:[ ['In London','Where'],['Because I am tired','Why'],['At 7 o\'clock','When'],['My friend Tom','Who'],['A book','What'],['By bus','How'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra WH segun la respuesta.',
    sents:[
      { pre:'', ans:'Where', post:' do you live? (In Madrid)', bank:['What','Where','Who','When'] },
      { pre:'', ans:'Who', post:' is that? (My brother)', bank:['What','Who','Where','Why'] },
      { pre:'', ans:'When', post:' is your birthday? (In May)', bank:['Where','When','Who','How'] },
      { pre:'', ans:'Why', post:' are you happy? (Because it is Friday)', bank:['Why','How','What','Who'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada relacion WH-respuesta es correcta.',
    stmts:[
      { text:'"Where" pregunta por un lugar.', ans:true, expl:'Correcto. Where -> lugar.' },
      { text:'"Who" pregunta por un lugar.', ans:false, expl:'Falso. Who -> persona.' },
      { text:'"Why" pregunta por una razon.', ans:true, expl:'Correcto. Why -> razon (because...).' },
      { text:'"When" pregunta por una persona.', ans:false, expl:'Falso. When -> tiempo.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la pregunta WH para cada respuesta.',
    transforms:[
      { original:'Respuesta: In London', task:'Elige WH', opts:['Where do you live?','What do you live?','Who do you live?','When do you live?'], correct:0 },
      { original:'Respuesta: My brother', task:'Elige WH', opts:['Who is that?','What is that?','Where is that?','Why is that?'], correct:0 },
      { original:'Respuesta: At 8 o\'clock', task:'Elige WH', opts:['When does it start?','Where does it start?','Who does it start?','What does it start?'], correct:0 },
      { original:'Respuesta: Because I am sick', task:'Elige WH', opts:['Why are you home?','How are you home?','When are you home?','Who are you home?'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con la palabra WH correcta.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:null, blank:true, opts:['Where do you live?','What do you live?','Who do you live?','When do you live?'], correct:0 },
      { speaker:1, text:'I live in Madrid.', blank:false },
      { speaker:0, text:null, blank:true, opts:['Who is your teacher?','What is your teacher?','Where is your teacher?','Why is your teacher?'], correct:0 },
      { speaker:1, text:'My teacher is Mr. Lee.', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra WH incorrecta y elige la correccion.',
    sents:[
      { words:['What','do','you','live','?'], wi:0, correct:'Where', choices:['Where','What','Who','When'] },
      { words:['Where','is','your','brother','?'], wi:0, correct:'Who', choices:['Who','Where','What','Why'] },
      { words:['Who','are','you','sad','?'], wi:0, correct:'Why', choices:['Why','Who','How','When'] } ] }
]);

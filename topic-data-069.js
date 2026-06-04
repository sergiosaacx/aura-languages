/* topic-data-069.js - Juego 69/350 | T10 6/7 ASK AWAY | WH en conversaciones reales (MEZCLADO) | Bronce A1 */
_registerGames(69, 'Palabras WH · En Conversaciones', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"___ is your name? — My name is Ana." Que WH va?', opts:['Where','What','Who','When'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra WH segun la respuesta dada.',
    sents:[
      { pre:'', ans:'What', post:' is your name? — My name is Ana.', bank:['What','Where','Who','When'] },
      { pre:'', ans:'Where', post:' do you live? — In Madrid.', bank:['What','Where','Who','Why'] },
      { pre:'', ans:'How', post:' old are you? — I am 25.', bank:['How','What','Who','When'] },
      { pre:'', ans:'When', post:' is the party? — On Saturday.', bank:['Where','When','Who','How'] } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con la palabra WH correcta.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:null, blank:true, opts:['What is your name?','Where is your name?','Who is your name?','When is your name?'], correct:0 },
      { speaker:1, text:'My name is Tom.', blank:false },
      { speaker:0, text:null, blank:true, opts:['Where do you work?','What do you work?','Who do you work?','When do you work?'], correct:0 },
      { speaker:1, text:'I work in a bank.', blank:false } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada respuesta con su pregunta WH.',
    pairs:[ ['My name is Ana','What is your name?'],['In Madrid','Where do you live?'],['I am 25','How old are you?'],['On Saturday','When is the party?'],['My brother','Who is that?'],['Because I am tired','Why are you sad?'] ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la pregunta WH para cada respuesta.',
    transforms:[
      { original:'My name is Ana.', task:'Pregunta WH', opts:['What is your name?','Where is your name?','Who is your name?','When is your name?'], correct:0 },
      { original:'In Madrid.', task:'Pregunta WH', opts:['Where do you live?','What do you live?','Who do you live?','When do you live?'], correct:0 },
      { original:'I am 25.', task:'Pregunta WH', opts:['How old are you?','How much are you?','How many are you?','How long are you?'], correct:0 },
      { original:'Because it is fun.', task:'Pregunta WH', opts:['Why do you play?','When do you play?','Where do you play?','Who do you play?'], correct:0 } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra WH incorrecta y elige la correccion.',
    sents:[
      { words:['Where','is','your','name','?'], wi:0, correct:'What', choices:['What','Where','Who','When'] },
      { words:['What','old','are','you','?'], wi:0, correct:'How', choices:['How','What','Who','When'] },
      { words:['When','is','that','man','?'], wi:0, correct:'Who', choices:['Who','When','What','Where'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada par pregunta-respuesta es correcto.',
    stmts:[
      { text:'"Where do you live?" — "In Madrid." es correcto.', ans:true, expl:'Correcto. Where pregunta lugar.' },
      { text:'"Who is your name?" — "My name is Ana." es correcto.', ans:false, expl:'Falso. Se usa What: What is your name?' },
      { text:'"How old are you?" — "I am 25." es correcto.', ans:true, expl:'Correcto. How old para la edad.' },
      { text:'"What do you live?" — "In Madrid." es correcto.', ans:false, expl:'Falso. Se usa Where: Where do you live?' } ] }
]);

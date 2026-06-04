/* topic-data-067.js - Juego 67/350 | T10 4/7 ASK AWAY | Estructura de preguntas WH (ESPECIALIZADO) | Bronce A1 */
_registerGames(67, 'Preguntas WH · Estructura', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es el orden correcto de una pregunta WH?', opts:['WH + sujeto + verbo','WH + auxiliar + sujeto + verbo','WH + verbo + sujeto','sujeto + WH + verbo'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada pregunta con error con su version correcta.',
    pairs:[ ['Where you live?','Where do you live?'],['What she eat?','What does she eat?'],['How old you are?','How old are you?'],['Why he cry?','Why does he cry?'],['When you start?','When do you start?'],['Who you are?','Who are you?'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:['live','Where','you','do'], ans:['Where','do','you','live'] },
      { words:['eat','does','What','she'], ans:['What','does','she','eat'] },
      { words:['are','How','you','old'], ans:['How','old','are','you'] } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el error y elige el auxiliar correcto.',
    sents:[
      { words:['Where','you','live','?'], wi:1, correct:'do', choices:['do','you','does','are'] },
      { words:['What','she','eat','?'], wi:1, correct:'does', choices:['does','she','do','is'] },
      { words:['Where','he','works','?'], wi:2, correct:'work', choices:['work','works','working','worked'] } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con la pregunta correcta.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:null, blank:true, opts:['Where do you live?','Where you live?','Where does you live?','Where you do live?'], correct:0 },
      { speaker:1, text:'I live in Rome.', blank:false },
      { speaker:0, text:null, blank:true, opts:['What does she do?','What she does?','What she do?','What does she does?'], correct:0 },
      { speaker:1, text:'She is a doctor.', blank:false } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Corrige cada pregunta WH.',
    transforms:[
      { original:'Where you live?', task:'Forma correcta', opts:['Where do you live?','Where you live?','Where does you live?','Where live you?'], correct:0 },
      { original:'What she eat?', task:'Forma correcta', opts:['What does she eat?','What she eats?','What do she eat?','What she does eat?'], correct:0 },
      { original:'How old you are?', task:'Forma correcta', opts:['How old are you?','How old you are?','How old do you are?','How old is you?'], correct:0 },
      { original:'Why he cries?', task:'Forma correcta', opts:['Why does he cry?','Why he cry?','Why do he cry?','Why he does cry?'], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el auxiliar correcto.',
    sents:[
      { pre:'Where ', ans:'do', post:' you live?', bank:['do','does','is','are'] },
      { pre:'What ', ans:'does', post:' she eat?', bank:['do','does','is','are'] },
      { pre:'How old ', ans:'are', post:' you?', bank:['do','does','is','are'] },
      { pre:'Why ', ans:'does', post:' he cry?', bank:['do','does','is','are'] } ] }
]);

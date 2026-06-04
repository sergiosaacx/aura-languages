/* topic-data-055.js - Juego 55/350 | T8 6/7 DAILY HABITS | los 3 temas en contexto de rutinas (MEZCLADO) | Bronce A1 */
_registerGames(55, 'Presente Simple · Rutinas Diarias', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'She ___ up at 7am. (wake)', opts:['wake','wakes','waking','woke'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta para cada rutina.',
    sents:[
      { pre:'She ', ans:'wakes', post:' up at 7am.', bank:['wake','wakes','waking','woke'] },
      { pre:'They ', ans:"don't", post:' eat breakfast.', bank:["don't","doesn't","isn't","not"] },
      { pre:'', ans:'Does', post:' he walk to work?', bank:['Do','Does','Is','Are'] },
      { pre:'He ', ans:'has', post:' lunch at noon.', bank:['have','has','having','had'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion sobre rutinas es correcta.',
    stmts:[
      { text:'"She gets up at 7." es correcto.', ans:true, expl:'Correcto. 3ra persona con -s.' },
      { text:'"He have breakfast." es correcto.', ans:false, expl:'Falso. Con he: He has breakfast.' },
      { text:'"They go to bed late." es correcto.', ans:true, expl:'Correcto. they + go.' },
      { text:'"She don\'t work." es correcto.', ans:false, expl:"Falso. Con she: She doesn't work." } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Transforma cada rutina segun la tarea.',
    transforms:[
      { original:'I wake up at 7.', task:'Con "she"', opts:['She wakes up at 7.','She wake up at 7.','She waking up at 7.','She is wake up at 7.'], correct:0 },
      { original:'He eats breakfast.', task:'Negativa', opts:["He doesn't eat breakfast.","He don't eat breakfast.","He doesn't eats breakfast.","He not eat breakfast."], correct:0 },
      { original:'You walk to work.', task:'Pregunta', opts:['Do you walk to work?','Does you walk to work?','Do you walks to work?','Is you walk to work?'], correct:0 },
      { original:'I have lunch at noon.', task:'Con "he"', opts:['He has lunch at noon.','He have lunch at noon.','He haves lunch at noon.','He having lunch at noon.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo sobre rutinas.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What time does she wake up?', blank:false },
      { speaker:1, text:null, blank:true, opts:['She wakes up at 7.','She wake up at 7.','She waking up at 7.','She is wake up at 7.'], correct:0 },
      { speaker:0, text:'Does he walk to work?', blank:false },
      { speaker:1, text:null, blank:true, opts:["Yes, he walks to work.","Yes, he walk to work.","Yes, he walking to work.","Yes, he is walk to work."], correct:0 },
      { speaker:0, text:'Healthy!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada oracion como correcta o incorrecta.',
    categories:['Correcta','Incorrecta'],
    items:[ {text:'She wakes up early',correct:0},{text:'She wake up early',correct:1},{text:'He has breakfast',correct:0},{text:'He have breakfast',correct:1},{text:"They don't sleep late",correct:0},{text:"They doesn't sleep late",correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'She wakes up at seven.', type:'select', opts:['She wakes up at seven.','She wake up at seven.','She waking up at seven.','She is wake up at seven.'], correct:0 },
      { tts:'He has lunch at noon.', type:'select', opts:['He has lunch at noon.','He have lunch at noon.','He haves lunch at noon.','He having lunch at noon.'], correct:0 },
      { tts:"They don't eat breakfast.", type:'select', opts:["They don't eat breakfast.","They doesn't eat breakfast.","They don't eats breakfast.","They not eat breakfast."], correct:0 } ] }
]);

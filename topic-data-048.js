/* topic-data-048.js - Juego 48/350 | T7 6/7 COLOR YOUR WORDS | Adverbios de frecuencia en contexto (ESPECIALIZADO) | Bronce A1 */
_registerGames(48, 'Adverbios de Frecuencia · En Contexto', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Si haces algo todos los dias, que adverbio usas?', opts:['never','always','rarely','sometimes'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el adverbio segun la frecuencia descrita.',
    sents:[
      { pre:'(todos los dias) I ', ans:'always', post:' eat breakfast.', bank:['always','never','rarely','sometimes'] },
      { pre:'(una vez al mes) I ', ans:'rarely', post:' go to the gym.', bank:['always','usually','rarely','often'] },
      { pre:'(casi todos los dias) She ', ans:'usually', post:' walks.', bank:['usually','never','rarely','always'] },
      { pre:'(nunca) He ', ans:'never', post:' drinks soda.', bank:['never','always','usually','often'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el adverbio de frecuencia.',
    words:[ {scrambled:['Y','A','L','W','A','S'],ans:'ALWAYS',hint:'todos los dias'},{scrambled:['V','E','R','E','N'],ans:'NEVER',hint:'0%'},{scrambled:['L','E','R','A','Y','R'],ans:'RARELY',hint:'casi nunca'},{scrambled:['F','E','T','O','N'],ans:'OFTEN',hint:'a menudo'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada adverbio segun su frecuencia.',
    categories:['Alta frecuencia','Baja frecuencia'],
    items:[ {text:'always',correct:0},{text:'usually',correct:0},{text:'often',correct:0},{text:'sometimes',correct:1},{text:'rarely',correct:1},{text:'never',correct:1} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Usa un adverbio de frecuencia para cada descripcion.',
    transforms:[
      { original:'I eat breakfast every day.', task:'Usa adverbio', opts:['I always eat breakfast.','I never eat breakfast.','I rarely eat breakfast.','I eat always breakfast.'], correct:0 },
      { original:'I go to the gym once a year.', task:'Usa adverbio', opts:['I rarely go to the gym.','I always go to the gym.','I usually go to the gym.','I rarely go the gym to.'], correct:0 },
      { original:'She drinks coffee every morning.', task:'Usa adverbio', opts:['She always drinks coffee.','She never drinks coffee.','She drinks always coffee.','She is always drinks coffee.'], correct:0 },
      { original:'He watches TV 4 days a week.', task:'Usa adverbio', opts:['He often watches TV.','He never watches TV.','He watches often TV.','He is often watches TV.'], correct:0 } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'Si comes algo todos los dias, usas "always".', ans:true, expl:'Correcto. always = siempre.' },
      { text:'"rarely" se usa para algo muy frecuente.', ans:false, expl:'Falso. rarely = rara vez.' },
      { text:'"usually" indica algo que pasa casi siempre.', ans:true, expl:'Correcto. usually = normalmente (80%).' },
      { text:'"never" se usa para algo que pasa a diario.', ans:false, expl:'Falso. never = nunca (0%).' } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I always eat breakfast.', type:'select', opts:['I always eat breakfast.','I never eat breakfast.','I usually eat breakfast.','I rarely eat breakfast.'], correct:0 },
      { tts:'She rarely watches TV.', type:'select', opts:['She rarely watches TV.','She always watches TV.','She often watches TV.','She never watches TV.'], correct:0 },
      { tts:'He usually walks to work.', type:'select', opts:['He usually walks to work.','He never walks to work.','He always walks to work.','He rarely walks to work.'], correct:0 } ] }
]);

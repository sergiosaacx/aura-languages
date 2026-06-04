/* topic-data-074.js - Juego 74/350 | T11 4/7 WHAT HAPPENED? | Expresiones de tiempo pasado (ESPECIALIZADO) | Plata A2 */
_registerGames(74, 'Pasado Simple · Expresiones de Tiempo', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que expresion va con el pasado simple?', opts:['yesterday','now','tomorrow','today'], correct:0 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"yesterday" se usa con pasado simple.', ans:true, expl:'Correcto. yesterday + pasado.' },
      { text:'"She went there last Monday." es correcto.', ans:true, expl:'Correcto. last Monday + pasado.' },
      { text:'"I have seen him yesterday." es correcto.', ans:false, expl:'Falso. yesterday va con pasado: I saw him yesterday.' },
      { text:'"two years ago" se usa con presente.', ans:false, expl:'Falso. ago va con pasado simple.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la expresion de tiempo correcta.',
    sents:[
      { pre:'I saw her ', ans:'yesterday', post:'.', bank:['yesterday','tomorrow','now','today'] },
      { pre:'They moved here two years ', ans:'ago', post:'.', bank:['ago','before','since','for'] },
      { pre:'We met ', ans:'last', post:' week.', bank:['last','next','this','ago'] },
      { pre:'She was born ', ans:'in', post:' 2005.', bank:['in','on','at','ago'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['went','I','yesterday','home'],ans:['I','went','home','yesterday']},{words:['saw','We','last','her','night'],ans:['We','saw','her','last','night']},{words:['ago','He','left','an','hour'],ans:['He','left','an','hour','ago']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la expresion incorrecta y elige la correccion.',
    sents:[
      { words:['I','saw','her','tomorrow','.'], wi:3, correct:'yesterday', choices:['yesterday','tomorrow','now','today'] },
      { words:['They','left','two','hours','before','.'], wi:4, correct:'ago', choices:['ago','before','since','for'] },
      { words:['She','went','there','next','week','.'], wi:3, correct:'last', choices:['last','next','this','ago'] } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Pon cada oracion en pasado con la expresion de tiempo.',
    transforms:[
      { original:'I see him. (yesterday)', task:'Pasado', opts:['I saw him yesterday.','I seen him yesterday.','I see him yesterday.','I have seen him yesterday.'], correct:0 },
      { original:'They go home. (last night)', task:'Pasado', opts:['They went home last night.','They goed home last night.','They go home last night.','They gone home last night.'], correct:0 },
      { original:'She eats pizza. (yesterday)', task:'Pasado', opts:['She ate pizza yesterday.','She eated pizza yesterday.','She eats pizza yesterday.','She eaten pizza yesterday.'], correct:0 },
      { original:'We watch a film. (last week)', task:'Pasado', opts:['We watched a film last week.','We watch a film last week.','We watching a film last week.','We watchd a film last week.'], correct:0 } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I saw her yesterday.', type:'select', opts:['I saw her yesterday.','I see her yesterday.','I saw her tomorrow.','I seen her yesterday.'], correct:0 },
      { tts:'They left two hours ago.', type:'select', opts:['They left two hours ago.','They left two hours before.','They leave two hours ago.','They left two hour ago.'], correct:0 },
      { tts:'We met last week.', type:'select', opts:['We met last week.','We meet last week.','We met next week.','We meeting last week.'], correct:0 } ] }
]);

/* topic-data-109.js - Juego 109/350 | T16 4/7 I HAVE DONE IT | Perfecto vs Pasado Simple (ESPECIALIZADO) | Plata A2 */
_registerGames(109, 'Presente Perfecto vs Pasado Simple', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que tiempo usa una expresion especifica (yesterday)?', opts:['Presente Perfecto','Pasado Simple','Ambos','Ninguno'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"I have seen that movie yesterday." es correcto.', ans:false, expl:'Falso. yesterday -> I saw it yesterday.' },
      { text:'"She has lived in Paris." (sin tiempo) es correcto.', ans:true, expl:'Correcto. experiencia sin tiempo especifico.' },
      { text:'El pasado simple se usa con tiempo especifico.', ans:true, expl:'Correcto. last week, yesterday.' },
      { text:'El presente perfecto se usa con "yesterday".', ans:false, expl:'Falso. yesterday -> pasado simple.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta segun el contexto.',
    sents:[
      { pre:'I ', ans:'saw', post:' her yesterday.', bank:['saw','have seen','see','seen'] },
      { pre:'She ', ans:'has', post:' lived in Rome. (experiencia)', bank:['has','have','did','was'] },
      { pre:'They ', ans:'went', post:' to Spain last year.', bank:['went','have gone','go','gone'] },
      { pre:'I ', ans:'have', post:' never eaten octopus.', bank:['have','has','did','was'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['seen','I','have','it'],ans:['I','have','seen','it']},{words:['yesterday','her','saw','I'],ans:['I','saw','her','yesterday']},{words:['lived','She','has','in','Paris'],ans:['She','has','lived','in','Paris']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['I','seen','him','yesterday','.'], wi:1, correct:'saw', choices:['saw','seen','see','seed'] },
      { words:['She','have','lived','here','.'], wi:1, correct:'has', choices:['has','have','did','was'] },
      { words:['They','have','went','to','Spain','.'], wi:2, correct:'gone', choices:['gone','went','go','going'] } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I saw her yesterday.', type:'select', opts:['I saw her yesterday.','I have seen her yesterday.','I see her yesterday.','I seen her yesterday.'], correct:0 },
      { tts:'She has lived in Paris.', type:'select', opts:['She has lived in Paris.','She has live in Paris.','She have lived in Paris.','She lived in Paris yesterday.'], correct:0 },
      { tts:'They went to Spain last year.', type:'select', opts:['They went to Spain last year.','They have gone to Spain last year.','They go to Spain last year.','They gone to Spain last year.'], correct:0 } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el tiempo correcto.',
    transforms:[
      { original:'see her (yesterday)', task:'Tiempo', opts:['I saw her yesterday.','I have seen her yesterday.','I see her yesterday.','I seen her yesterday.'], correct:0 },
      { original:'live in Rome (experiencia)', task:'Tiempo', opts:['She has lived in Rome.','She lived in Rome yesterday.','She live in Rome.','She has live in Rome.'], correct:0 },
      { original:'visit Spain (last year)', task:'Tiempo', opts:['They visited Spain last year.','They have visited Spain last year.','They visit Spain last year.','They has visited Spain last year.'], correct:0 },
      { original:'eat sushi (never)', task:'Tiempo', opts:['I have never eaten sushi.','I never ate sushi yesterday.','I never eat sushi.','I have never ate sushi.'], correct:0 } ] }
]);

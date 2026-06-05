/* topic-data-111.js - Juego 111/350 | T16 6/7 I HAVE DONE IT | Perfecto vs Pasado en contexto (MEZCLADO) | Plata A2 */
_registerGames(111, 'Perfecto vs Pasado · En Contexto', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Con "before" (sin tiempo especifico), que tiempo?', opts:['Pasado Simple','Presente Perfecto','Futuro','Presente'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta segun el contexto.',
    sents:[
      { pre:'I ', ans:'saw', post:' that film last week.', bank:['saw','have seen','see','seen'] },
      { pre:'I ', ans:'have seen', post:' that film before.', bank:['saw','have seen','see','seen'] },
      { pre:'She ', ans:'visited', post:' Rome in 2019.', bank:['visited','has visited','visit','visiting'] },
      { pre:'She ', ans:'has visited', post:' Rome twice.', bank:['visited','has visited','visit','visiting'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"I saw it last week." usa pasado simple.', ans:true, expl:'Correcto. last week -> pasado.' },
      { text:'"I have seen it before." usa presente perfecto.', ans:true, expl:'Correcto. before/experiencia.' },
      { text:'"I have seen it last week." es correcto.', ans:false, expl:'Falso. last week -> I saw it.' },
      { text:'"I saw it before." es la forma de hablar de experiencia.', ans:false, expl:'Falso. I have seen it before.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el tiempo correcto.',
    transforms:[
      { original:'see film (last week)', task:'Tiempo', opts:['I saw the film last week.','I have seen the film last week.','I see the film last week.','I seen the film last week.'], correct:0 },
      { original:'see film (before)', task:'Tiempo', opts:['I have seen the film before.','I saw the film before now.','I see the film before.','I seen the film before.'], correct:0 },
      { original:'visit Rome (in 2019)', task:'Tiempo', opts:['She visited Rome in 2019.','She has visited Rome in 2019.','She visit Rome in 2019.','She has visit Rome in 2019.'], correct:0 },
      { original:'visit Rome (twice)', task:'Tiempo', opts:['She has visited Rome twice.','She visited Rome twice yesterday.','She visit Rome twice.','She has visit Rome twice.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Have you ever been to Rome?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I have been there twice.','Yes, I was there twice ago.','Yes, I have been there yesterday.','Yes, I been there twice.'], correct:0 },
      { speaker:0, text:'When did you go last time?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I went there last summer.','I have gone there last summer.','I go there last summer.','I gone there last summer.'], correct:0 },
      { speaker:0, text:'Nice!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion segun el tiempo verbal.',
    categories:['Pasado Simple','Presente Perfecto'],
    items:[ {text:'last week',correct:0},{text:'before',correct:1},{text:'in 2019',correct:0},{text:'ever',correct:1},{text:'yesterday',correct:0},{text:'twice (experiencia)',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I saw it last week.', type:'select', opts:['I saw it last week.','I have seen it last week.','I see it last week.','I seen it last week.'], correct:0 },
      { tts:'I have seen it before.', type:'select', opts:['I have seen it before.','I saw it before now.','I see it before.','I seen it before.'], correct:0 },
      { tts:'She has visited Rome twice.', type:'select', opts:['She has visited Rome twice.','She visited Rome twice yesterday.','She visit Rome twice.','She has visit Rome twice.'], correct:0 } ] }
]);

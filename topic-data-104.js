/* topic-data-104.js - Juego 104/350 | T15 6/7 HOW MUCH? | cuantificadores en conversacion (MEZCLADO) | Plata A2 */
_registerGames(104, 'Cuantificadores · En Conversacion', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'I have ___ friends (pocos). Que va?', opts:['a little','a few','much','a lot'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el cuantificador correcto.',
    sents:[
      { pre:'I have ', ans:'a few', post:' friends in this city.', bank:['a few','a little','much','a few of'] },
      { pre:'We need ', ans:'a little', post:' milk.', bank:['a little','a few','many','a little of'] },
      { pre:'He has ', ans:'a lot of', post:' experience.', bank:['a lot of','many','a few','a lot'] },
      { pre:"I don't have ", ans:'much', post:' money.', bank:['much','many','a few','a lot'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"a few friends" significa pocos amigos.', ans:true, expl:'Correcto. a few + contable.' },
      { text:'"a little milk" significa poca leche.', ans:true, expl:'Correcto. a little + incontable.' },
      { text:'"many experience" es correcto.', ans:false, expl:'Falso. a lot of experience.' },
      { text:'"a few milk" es correcto.', ans:false, expl:'Falso. a little milk.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el cuantificador correcto.',
    transforms:[
      { original:'friends (pocos)', task:'Cuantificador', opts:['a few friends','a little friends','much friends','a lot friends'], correct:0 },
      { original:'milk (poca)', task:'Cuantificador', opts:['a little milk','a few milk','many milk','a lot milk'], correct:0 },
      { original:'experience (mucha)', task:'Cuantificador', opts:['a lot of experience','many experience','a few experience','a little of experience'], correct:0 },
      { original:'people (muchas)', task:'Cuantificador', opts:['a lot of people','much people','a little people','a few of people'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Do you have many friends here?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I have a few friends.','I have a little friends.','I have much friends.','I have a few of friends.'], correct:0 },
      { speaker:0, text:'Do we need milk?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, we need a little milk.','Yes, we need a few milk.','Yes, we need many milk.','Yes, we need a few of milk.'], correct:0 },
      { speaker:0, text:'Okay.', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada sustantivo segun a few o a little.',
    categories:['a few (contable)','a little (incontable)'],
    items:[ {text:'friends',correct:0},{text:'milk',correct:1},{text:'books',correct:0},{text:'water',correct:1},{text:'apples',correct:0},{text:'money',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I have a few friends.', type:'select', opts:['I have a few friends.','I have a little friends.','I have much friends.','I have a few of friends.'], correct:0 },
      { tts:'We need a little milk.', type:'select', opts:['We need a little milk.','We need a few milk.','We need many milk.','We need a little of milk.'], correct:0 },
      { tts:'He has a lot of experience.', type:'select', opts:['He has a lot of experience.','He has many experience.','He has a few experience.','He has a lot experience.'], correct:0 } ] }
]);

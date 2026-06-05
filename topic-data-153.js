/* topic-data-153.js - Juego 153/350 | T22 6/7 USED TO | los 3 temas en texto narrativo (MEZCLADO) | Oro B1 */
_registerGames(153, 'Narracion Pasada · En Texto', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'When I was young, I ___ play in the park.', opts:['used to','was','would have','am used to'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta para la historia.',
    sents:[
      { pre:'When I was young, I ', ans:'used to', post:' play in the park.', bank:['used to','was','would have','am used to'] },
      { pre:'One day, while I ', ans:'was', post:' climbing a tree, I fell.', bank:['was','were','used to','would'] },
      { pre:'I ', ans:'fell', post:' and broke my arm.', bank:['fell','was falling','used to fall','fall'] },
      { pre:'My mother ', ans:'was', post:' cooking when it happened.', bank:['was','were','used to','would'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"used to" se usa para habitos pasados en narracion.', ans:true, expl:'Correcto. I used to play.' },
      { text:'El pasado continuo describe la accion de fondo.', ans:true, expl:'Correcto. while I was climbing.' },
      { text:'"While I was climb a tree, I fell." es correcto.', ans:false, expl:'Falso. while I was climbing.' },
      { text:'Para la accion interrumpida se usa el pasado continuo.', ans:false, expl:'Falso. La interrupcion va en pasado simple: I fell.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el tiempo correcto.',
    transforms:[
      { original:'habito: play in park', task:'Used to', opts:['I used to play in the park.','I was playing in the park.','I would have played in the park.','I am used to play in the park.'], correct:0 },
      { original:'fondo: climb a tree', task:'Pasado continuo', opts:['While I was climbing a tree...','While I climbed a tree...','While I was climb a tree...','While I climbing a tree...'], correct:0 },
      { original:'interrupcion: fall', task:'Pasado simple', opts:['I fell.','I was falling.','I used to fall.','I have fallen.'], correct:0 },
      { original:'fondo: she cook / phone ring', task:'Pasado continuo', opts:['She was cooking when the phone rang.','She cooked when the phone rang.','She was cook when the phone rang.','She cooking when the phone rang.'], correct:0 } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I used to play in the park.', type:'select', opts:['I used to play in the park.','I was play in the park.','I use to play in the park.','I would playing in the park.'], correct:0 },
      { tts:'While I was climbing a tree, I fell.', type:'select', opts:['While I was climbing a tree, I fell.','While I climbed a tree, I fell.','While I was climb a tree, I fell.','While I climbing a tree, I fell.'], correct:0 },
      { tts:'My mother was cooking dinner.', type:'select', opts:['My mother was cooking dinner.','My mother cooked dinner.','My mother was cook dinner.','My mother cooking dinner.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Tell me about your childhood.', blank:false },
      { speaker:1, text:null, blank:true, opts:['I used to play in the park every day.','I was playing in the park every day.','I use to play in the park every day.','I would have played in the park.'], correct:0 },
      { speaker:0, text:'What happened that day?', blank:false },
      { speaker:1, text:null, blank:true, opts:['While I was climbing, I fell.','While I climbed, I was falling.','While I was climb, I fell.','While I climbing, I fell.'], correct:0 },
      { speaker:0, text:'Oh no!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada forma segun su uso.',
    categories:['Habito (used to)','Fondo (continuo)','Interrupcion (simple)'],
    items:[ {text:'used to play',correct:0},{text:'was climbing',correct:1},{text:'fell',correct:2},{text:'used to visit',correct:0},{text:'was cooking',correct:1},{text:'rang',correct:2} ] }
]);

/* topic-data-139.js - Juego 139/350 | T20 6/7 TELL ME MORE | conectores y adverbios en texto (MEZCLADO) | Plata A2 */
_registerGames(139, 'Conectores y Adverbios · En Texto', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'I wanted to go out ___ it was raining.', opts:['so','but','because','although'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta para el texto.',
    sents:[
      { pre:'I wanted to go out ', ans:'but', post:' it was raining.', bank:['so','but','because','although'] },
      { pre:'', ans:'So', post:' I stayed home.', bank:['So','But','Because','Although'] },
      { pre:'I read ', ans:'quietly', post:'.', bank:['quietly','quiet','quietness','quietely'] },
      { pre:'I stayed home ', ans:'because', post:' it rained.', bank:['so','but','because','although'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"but" muestra un contraste.', ans:true, expl:'Correcto. queria salir pero llovia.' },
      { text:'"so" muestra un resultado.', ans:true, expl:'Correcto. por eso me quede.' },
      { text:'"quietly" es un sustantivo.', ans:false, expl:'Falso. quietly es un adverbio de modo.' },
      { text:'"because" introduce un resultado.', ans:false, expl:'Falso. because = causa.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el conector o adverbio correcto.',
    transforms:[
      { original:'contraste: want go out / rain', task:'Conector', opts:['I wanted to go out but it was raining.','I wanted to go out so it was raining.','I wanted to go out because it was raining.','I wanted to go out and it was raining.'], correct:0 },
      { original:'resultado: rain / stay home', task:'Conector', opts:['It rained so I stayed home.','It rained but I stayed home.','It rained because I stayed home.','It rained although I stayed home.'], correct:0 },
      { original:'modo: read (quiet)', task:'Adverbio', opts:['I read quietly.','I read quiet.','I quietly read it.','I read quietness.'], correct:0 },
      { original:'concesion: cold / go out', task:'Conector', opts:['Although it was cold, I went out.','So it was cold, I went out.','Because it was cold, I went out.','But it was cold, I went out.'], correct:0 } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I stayed home because it was raining.', type:'select', opts:['I stayed home because it was raining.','I stayed home so it was raining.','I stayed home but it was raining.','I stayed home although it was raining.'], correct:0 },
      { tts:'She read the book quietly.', type:'select', opts:['She read the book quietly.','She read the book quiet.','She quietly read the book here.','She read quietly the book.'], correct:0 },
      { tts:'Although it was late, we kept working.', type:'select', opts:['Although it was late, we kept working.','So it was late, we kept working.','Because it was late, we kept working.','But it was late, we kept working.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Why did you stay home?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Because it was raining.','So it was raining.','But it was raining.','Although it was raining.'], correct:0 },
      { speaker:0, text:'What did you do?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I read quietly all evening.','I read quiet all evening.','I quietly read it all evening here.','I read quietness all evening.'], correct:0 },
      { speaker:0, text:'Sounds nice.', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada palabra como conector o adverbio.',
    categories:['Conector','Adverbio'],
    items:[ {text:'but',correct:0},{text:'so',correct:0},{text:'because',correct:0},{text:'quietly',correct:1},{text:'carefully',correct:1},{text:'slowly',correct:1} ] }
]);

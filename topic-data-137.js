/* topic-data-137.js - Juego 137/350 | T20 4/7 TELL ME MORE | Posicion del adverbio de modo (ESPECIALIZADO) | Plata A2 */
_registerGames(137, 'Adverbios de Modo · Posicion', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Donde va el adverbio de modo?', opts:['antes del verbo','despues del verbo u objeto','antes del sujeto','entre to be'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"She sings beautifully." es correcto.', ans:true, expl:'Correcto. adverbio despues del verbo.' },
      { text:'"She beautifully sings." es correcto.', ans:false, expl:'Falso. She sings beautifully.' },
      { text:'"He speaks English well." es correcto.', ans:true, expl:'Correcto. adverbio despues del objeto.' },
      { text:'"He drove carefully the car." es correcto.', ans:false, expl:'Falso. He drove the car carefully.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el adverbio correcto.',
    sents:[
      { pre:'She sings ', ans:'beautifully', post:'.', bank:['beautifully','beautiful','beauty','beautifuly'] },
      { pre:'He drove the car ', ans:'carefully', post:'.', bank:['carefully','careful','carefuly','carefulely'] },
      { pre:'They speak English ', ans:'well', post:'.', bank:['well','good','goodly','better'] },
      { pre:'She runs ', ans:'quickly', post:'.', bank:['quickly','quick','quicky','quikly'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['beautifully','She','sings'],ans:['She','sings','beautifully']},{words:['carefully','He','drives'],ans:['He','drives','carefully']},{words:['well','speaks','He','English'],ans:['He','speaks','English','well']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige el adverbio correcto.',
    sents:[
      { words:['She','sings','beautiful','.'], wi:2, correct:'beautifully', choices:['beautifully','beautiful','beauty','beautifuly'] },
      { words:['He','speaks','good','.'], wi:2, correct:'well', choices:['well','good','goodly','better'] },
      { words:['They','work','careful','.'], wi:2, correct:'carefully', choices:['carefully','careful','carefuly','carefulely'] } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'She sings beautifully.', type:'select', opts:['She sings beautifully.','She beautifully sings.','She sings beautiful.','She sing beautifully.'], correct:0 },
      { tts:'He drove the car carefully.', type:'select', opts:['He drove the car carefully.','He carefully drove the car.','He drove carefully the car.','He drove the car careful.'], correct:0 },
      { tts:'They speak English well.', type:'select', opts:['They speak English well.','They well speak English.','They speak well English.','They speak English good.'], correct:0 } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Coloca el adverbio en la posicion correcta.',
    transforms:[
      { original:'She sings (beautiful)', task:'Adverbio', opts:['She sings beautifully.','She sings beautiful.','She beautifully sings.','She sing beautifully.'], correct:0 },
      { original:'He works (careful)', task:'Adverbio', opts:['He works carefully.','He works careful.','He carefully works.','He work carefully.'], correct:0 },
      { original:'She speaks (good)', task:'Adverbio', opts:['She speaks well.','She speaks good.','She well speaks.','She speak well.'], correct:0 },
      { original:'They run (quick)', task:'Adverbio', opts:['They run quickly.','They run quick.','They quickly run.','They quick run.'], correct:0 } ] }
]);

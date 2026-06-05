/* topic-data-118.js - Juego 118/350 | T17 6/7 COMPARE THE WORLD | much/a lot + comparativo (ESPECIALIZADO) | Plata A2 */
_registerGames(118, 'Intensificadores del Comparativo', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual NO se usa para intensificar un comparativo?', opts:['much','a lot','far','very'], correct:3 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el intensificador correcto.',
    sents:[
      { pre:'This hotel is ', ans:'much', post:' more comfortable.', bank:['much','very','so','too'] },
      { pre:'It is ', ans:'a lot', post:' more expensive.', bank:['a lot','very','so','too'] },
      { pre:'This way is ', ans:'far', post:' easier.', bank:['far','very','so','too'] },
      { pre:'She is ', ans:'much', post:' taller than me.', bank:['much','very','so','too'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"much better" es correcto.', ans:true, expl:'Correcto. much + comparativo.' },
      { text:'"very better" es correcto.', ans:false, expl:'Falso. much better.' },
      { text:'"a lot more expensive" es correcto.', ans:true, expl:'Correcto. a lot + comparativo.' },
      { text:'"so taller" es correcto.', ans:false, expl:'Falso. much taller.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Anade un intensificador al comparativo.',
    transforms:[
      { original:'better', task:'Intensificador', opts:['much better','very better','so better','too better'], correct:0 },
      { original:'more expensive', task:'Intensificador', opts:['a lot more expensive','very more expensive','so more expensive','too more expensive'], correct:0 },
      { original:'easier', task:'Intensificador', opts:['far easier','very easier','so easier','too easier'], correct:0 },
      { original:'taller', task:'Intensificador', opts:['much taller','very taller','so taller','too taller'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Is this hotel better?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, it is much better.','Yes, it is very better.','Yes, it is so better.','Yes, it is too better.'], correct:0 },
      { speaker:0, text:'Is it expensive?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, a lot more expensive.','Yes, very more expensive.','Yes, so more expensive.','Yes, too more expensive.'], correct:0 },
      { speaker:0, text:'Wow!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada frase como correcta o incorrecta con comparativo.',
    categories:['Correcto','Incorrecto'],
    items:[ {text:'much better',correct:0},{text:'very better',correct:1},{text:'a lot taller',correct:0},{text:'so taller',correct:1},{text:'far easier',correct:0},{text:'too bigger',correct:1} ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['H','C','U','M'],ans:'MUCH',hint:'... better'},{scrambled:['T','O','L'],ans:'LOT',hint:'a ... more'},{scrambled:['R','A','F'],ans:'FAR',hint:'... easier'},{scrambled:['R','E','T','T','E','B'],ans:'BETTER',hint:'comparativo de good'} ] }
]);

/* topic-data-197.js - Juego 197/350 | T29 1/7 LINK IT UP | marcadores del discurso reconocimiento (ESPECIALIZADO) | Oro B1 */
_registerGames(197, 'Marcadores del Discurso · Reconocimiento', [
  { id:'translate', label:'Significado', xp:25, instr:'Elige el marcador en ingles correcto.',
    items:[
      { src:'sin embargo', opts:['therefore','however','moreover','because'], correct:1 },
      { src:'por lo tanto', opts:['however','therefore','moreover','although'], correct:1 },
      { src:'ademas', opts:['however','moreover','therefore','but'], correct:1 },
      { src:'no obstante', opts:['nevertheless','therefore','moreover','so'], correct:0 },
      { src:'en consecuencia', opts:['however','moreover','consequently','although'], correct:2 },
      { src:'no obstante (otro)', opts:['nonetheless','because','moreover','and'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que marcador expresa contraste?', opts:['therefore','however','moreover','consequently'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada marcador con su significado.',
    pairs:[ ['however','sin embargo'],['therefore','por lo tanto'],['moreover','ademas'],['nevertheless','no obstante'],['consequently','en consecuencia'],['furthermore','es mas'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el marcador correcto.',
    sents:[
      { pre:'It was raining. ', ans:'However', post:', we went out.', bank:['However','Therefore','Moreover','Because'] },
      { pre:'He studied hard. ', ans:'Therefore', post:', he passed.', bank:['Therefore','However','Moreover','Although'] },
      { pre:'The hotel was cheap. ', ans:'Moreover', post:', it was clean.', bank:['Moreover','However','Therefore','But'] },
      { pre:'It was hard. ', ans:'Nevertheless', post:', she finished.', bank:['Nevertheless','Therefore','Moreover','So'] } ] },
  { id:'scramble', label:'Descifra el marcador', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['R','E','V','E','W','O','H'],ans:'HOWEVER',hint:'sin embargo'},{scrambled:['E','R','O','M','E','V','O','R'],ans:'MOREOVER',hint:'ademas'},{scrambled:['S','U','H','T'],ans:'THUS',hint:'asi/por tanto'},{scrambled:['O','S'],ans:'SO',hint:'entonces'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada significado es correcto.',
    stmts:[
      { text:'"however" expresa contraste.', ans:true, expl:'Correcto. sin embargo.' },
      { text:'"therefore" expresa adicion.', ans:false, expl:'Falso. expresa resultado.' },
      { text:'"moreover" anade informacion.', ans:true, expl:'Correcto. ademas.' },
      { text:'"consequently" expresa contraste.', ans:false, expl:'Falso. expresa consecuencia.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada marcador por su funcion.',
    categories:['Contraste','Resultado','Adicion'],
    items:[ {text:'however',correct:0},{text:'therefore',correct:1},{text:'moreover',correct:2},{text:'nevertheless',correct:0},{text:'consequently',correct:1},{text:'furthermore',correct:2} ] }
]);

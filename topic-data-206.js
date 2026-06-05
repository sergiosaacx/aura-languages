/* topic-data-206.js - Juego 206/350 | T30 3/7 WORD BUILDER | familias de palabras (ESPECIALIZADO) | Oro B1 */
_registerGames(206, 'Familias de Palabras', [
  { id:'translate', label:'Forma', xp:25, instr:'Elige la forma derivada correcta.',
    items:[
      { src:'create (sustantivo)', opts:['creative','creation','creatively','creates'], correct:1 },
      { src:'decide (sustantivo)', opts:['decision','decisive','decidedly','decides'], correct:0 },
      { src:'happy (adverbio)', opts:['happiness','happy','happily','happen'], correct:2 },
      { src:'beauty (adjetivo)', opts:['beauty','beautiful','beautifully','beautify'], correct:1 },
      { src:'success (verbo)', opts:['success','successful','succeed','successfully'], correct:2 },
      { src:'strong (sustantivo)', opts:['strongly','strength','stronger','strong'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'El sustantivo de "decide" es...', opts:['decisive','decision','decidedly','decides'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada palabra con su sustantivo.',
    pairs:[ ['create','creation'],['decide','decision'],['happy','happiness'],['strong','strength'],['beautiful','beauty'],['succeed','success'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'The ', ans:'decision', post:' was difficult.', bank:['decision','decide','decisive','decidedly'] },
      { pre:'Her ', ans:'creativity', post:' is amazing.', bank:['creativity','create','creative','creatively'] },
      { pre:'They live in ', ans:'happiness', post:'.', bank:['happiness','happy','happily','happen'] },
      { pre:'He has great ', ans:'strength', post:'.', bank:['strength','strong','strongly','stronger'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el sustantivo.',
    words:[ {scrambled:['N','O','I','T','A','E','R','C'],ans:'CREATION',hint:'sustantivo de create'},{scrambled:['N','O','I','S','I','C','E','D'],ans:'DECISION',hint:'sustantivo de decide'},{scrambled:['H','T','G','N','E','R','T','S'],ans:'STRENGTH',hint:'sustantivo de strong'},{scrambled:['Y','T','U','A','E','B'],ans:'BEAUTY',hint:'sustantivo'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"creation" es el sustantivo de "create".', ans:true, expl:'Correcto.' },
      { text:'"decision" es un verbo.', ans:false, expl:'Falso. es sustantivo. el verbo es decide.' },
      { text:'"happily" es el adverbio de "happy".', ans:true, expl:'Correcto.' },
      { text:'"strength" es un adjetivo.', ans:false, expl:'Falso. es sustantivo. el adjetivo es strong.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada palabra por su categoria.',
    categories:['Sustantivo','Adjetivo','Adverbio'],
    items:[ {text:'creation',correct:0},{text:'creative',correct:1},{text:'creatively',correct:2},{text:'decision',correct:0},{text:'decisive',correct:1},{text:'happily',correct:2} ] }
]);

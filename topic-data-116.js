/* topic-data-116.js - Juego 116/350 | T17 4/7 COMPARE THE WORLD | as...as (ESPECIALIZADO) | Plata A2 */
_registerGames(116, 'As ... As · Igualdad', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Como expresas igualdad?', opts:['more...than','as...as','the most','-er than'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada estructura con su significado.',
    pairs:[ ['as tall as','igual de alto'],['not as tall as','menos alto que'],['taller than','mas alto que'],['as big as','igual de grande'],['not as big as','menos grande que'],['the tallest','el mas alto'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['as','She','is','tall','as','him'],ans:['She','is','as','tall','as','him']},{words:['not','He','is','as','tall','as','me'],ans:['He','is','not','as','tall','as','me']},{words:['as','It','is','big','as','that'],ans:['It','is','as','big','as','that']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She','is','as','tall','than','him','.'], wi:4, correct:'as', choices:['as','than','to','that'] },
      { words:['He','is','taller','as','me','.'], wi:3, correct:'than', choices:['than','as','to','that'] },
      { words:['It','is','not','as','big','than','this','.'], wi:5, correct:'as', choices:['as','than','to','that'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada estructura como igualdad o desigualdad.',
    categories:['Igualdad (as...as)','Desigualdad (-er than)'],
    items:[ {text:'as tall as',correct:0},{text:'taller than',correct:1},{text:'as big as',correct:0},{text:'bigger than',correct:1},{text:'as fast as',correct:0},{text:'faster than',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'She is as tall as her brother.', type:'select', opts:['She is as tall as her brother.','She is as tall than her brother.','She is more tall as her brother.','She is taller as her brother.'], correct:0 },
      { tts:'He is not as fast as me.', type:'select', opts:['He is not as fast as me.','He is not as fast than me.','He is not more fast as me.','He is faster as me.'], correct:0 },
      { tts:'This book is as good as that one.', type:'select', opts:['This book is as good as that one.','This book is as good than that one.','This book is more good as that one.','This book is gooder as that one.'], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta.',
    sents:[
      { pre:'She is as tall ', ans:'as', post:' her sister.', bank:['as','than','to','that'] },
      { pre:'He is ', ans:'not', post:' as strong as me.', bank:['not','more','most','very'] },
      { pre:'This is as good ', ans:'as', post:' that.', bank:['as','than','to','of'] },
      { pre:'My car is as fast ', ans:'as', post:' yours.', bank:['as','than','to','of'] } ] }
]);

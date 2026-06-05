/* topic-data-284.js - Juego 284/350 | T41 4/7 ELLIPSIS | anafora discursiva (ESPECIALIZADO) | Diamante C1 */
_registerGames(284, 'Anafora Discursiva · This / That / These', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Para retomar una idea entera mencionada antes se usa...', opts:['it','this','one','do so'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra de referencia correcta.',
    sents:[
      { pre:'Sales fell sharply. ', ans:'This', post:' worried the board.', bank:['This','One','Do so','It is'] },
      { pre:'He arrived late again. ', ans:'That', post:' annoyed everyone.', bank:['That','One','Do so','Such'] },
      { pre:'Several errors appeared. ', ans:'These', post:' had to be fixed.', bank:['These','This one','Do so','It'] },
      { pre:'The results were poor. ', ans:'This', post:' suggests a problem.', bank:['This','One','Do so','Such a'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"this" puede referirse a una idea entera mencionada antes.', ans:true, expl:'Correcto. anafora discursiva.' },
      { text:'Una referencia ambigua mejora la cohesion.', ans:false, expl:'Falso. la empeora.' },
      { text:'"This shows that..." retoma una idea previa.', ans:true, expl:'Correcto.' },
      { text:'"these" se usa para referirse a un solo elemento.', ans:false, expl:'Falso. these es plural.' } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada referencia con su uso.',
    pairs:[ ['this','idea singular cercana'],['that','idea singular distante'],['these','varias ideas cercanas'],['those','varias ideas distantes'],['such','un tipo de cosa'],['it','algo especifico ya nombrado'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['This','worried','the','board'],ans:['This','worried','the','board']},{words:['everyone','That','annoyed'],ans:['That','annoyed','everyone']},{words:['suggests','This','a','problem'],ans:['This','suggests','a','problem']} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada referencia por su numero.',
    categories:['Singular','Plural'],
    items:[ {text:'this',correct:0},{text:'these',correct:1},{text:'that',correct:0},{text:'those',correct:1},{text:'it',correct:0},{text:'them',correct:1} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa con la referencia correcta.', speakers:['Profesor','Alumno'],
    lines:[
      { speaker:0, text:'Sales dropped. How do I refer to that fact?', blank:false },
      { speaker:1, text:null, blank:true, opts:['This worried the board.','One worried the board.','Do so worried the board.','It worried the board the fact.'], correct:0 },
      { speaker:0, text:'And several errors appeared?', blank:false },
      { speaker:1, text:null, blank:true, opts:['These had to be corrected.','This had to be corrected.','It had to be corrected them.','Do so had to be corrected.'], correct:0 },
      { speaker:0, text:'Good.', blank:false } ] }
]);

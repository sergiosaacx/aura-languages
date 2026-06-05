/* topic-data-265.js - Juego 265/350 | T38 6/7 ACADEMIC WRITING | conectores en ensayo argumentativo (MEZCLADO) | Platino B2 */
_registerGames(265, 'Conectores en un Ensayo Argumentativo', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Para introducir una idea opuesta en un ensayo se usa...', opts:['furthermore','however','as a result','for example'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el conector segun la relacion logica.',
    sents:[
      { pre:'Online learning is flexible. ', ans:'However', post:', it can feel isolating.', bank:['However','Furthermore','As a result','For example'] },
      { pre:'It saves time. ', ans:'Furthermore', post:', it reduces costs.', bank:['Furthermore','However','In contrast','Nevertheless'] },
      { pre:'Students are more motivated. ', ans:'As a result', post:', grades improve.', bank:['As a result','However','In contrast','Although'] },
      { pre:'Technology can fail. ', ans:'For instance', post:', the internet may drop.', bank:['For instance','However','Therefore','Nevertheless'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada relacion con su conector.',
    pairs:[ ['contraste','however'],['adicion','furthermore'],['resultado','as a result'],['ejemplo','for instance'],['concesion','although'],['conclusion','in conclusion'] ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada conector por su funcion.',
    categories:['Contraste','Adicion','Resultado'],
    items:[ {text:'however',correct:0},{text:'furthermore',correct:1},{text:'as a result',correct:2},{text:'in contrast',correct:0},{text:'moreover',correct:1},{text:'consequently',correct:2} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['However','it','can','feel','isolating'],ans:['However','it','can','feel','isolating']},{words:['Furthermore','it','reduces','costs'],ans:['Furthermore','it','reduces','costs']},{words:['result','As','a','grades','improve'],ans:['As','a','result','grades','improve']} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la eleccion del conector es correcta.',
    stmts:[
      { text:'"It is flexible. However, it can feel isolating." usa contraste correctamente.', ans:true, expl:'Correcto.' },
      { text:'"It saves time. However, it reduces costs." es correcto.', ans:false, expl:'Falso. deberia ser Furthermore (adicion).' },
      { text:'"Students are motivated. As a result, grades improve." es correcto.', ans:true, expl:'Correcto. causa-efecto.' },
      { text:'"Technology fails. For instance, it is reliable." es coherente.', ans:false, expl:'Falso. el ejemplo no apoya la idea.' } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el ensayo eligiendo el conector adecuado.', speakers:['Profesor','Alumno'],
    lines:[
      { speaker:0, text:'How do I add a second benefit?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Furthermore, it reduces costs.','However, it reduces costs.','In contrast, it reduces costs.','Although it reduces costs.'], correct:0 },
      { speaker:0, text:'And to show a downside?', blank:false },
      { speaker:1, text:null, blank:true, opts:['However, it can feel isolating.','Furthermore, it can feel isolating.','As a result, it can feel isolating.','For example, it can feel isolating.'], correct:0 },
      { speaker:0, text:'Perfect.', blank:false } ] }
]);

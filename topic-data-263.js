/* topic-data-263.js - Juego 263/350 | T38 4/7 ACADEMIC WRITING | coherencia textual (ESPECIALIZADO) | Platino B2 */
_registerGames(263, 'Coherencia Textual · Fluidez y Logica', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Para unir una causa con su efecto se usa...', opts:['however','therefore','in contrast','on the other hand'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el conector que mantiene la coherencia.',
    sents:[
      { pre:'It rained heavily. ', ans:'Therefore', post:', the match was cancelled.', bank:['Therefore','However','In contrast','Although'] },
      { pre:'The theory is popular. ', ans:'However', post:', it lacks evidence.', bank:['However','Therefore','As a result','Thus'] },
      { pre:'She studied hard. ', ans:'Consequently', post:', she passed.', bank:['Consequently','In contrast','However','Nonetheless'] },
      { pre:'The data is limited. ', ans:'Nevertheless', post:', it is useful.', bank:['Nevertheless','Therefore','As a result','Thus'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la conexion logica es correcta.',
    stmts:[
      { text:'"It rained. Therefore, the match was cancelled." es coherente.', ans:true, expl:'Correcto. causa-efecto.' },
      { text:'"It rained. However, the match was cancelled." es coherente.', ans:false, expl:'Falso. however indica contraste, no causa-efecto.' },
      { text:'"She studied hard. Consequently, she passed." es coherente.', ans:true, expl:'Correcto.' },
      { text:'"The theory is weak. Therefore, it is widely accepted." es coherente.', ans:false, expl:'Falso. la logica no fluye.' } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada relacion logica con su conector.',
    pairs:[ ['causa-efecto','therefore'],['contraste','however'],['adicion','furthermore'],['concesion','nevertheless'],['ejemplo','for instance'],['conclusion','in conclusion'] ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada conector por su relacion logica.',
    categories:['Causa-efecto','Contraste'],
    items:[ {text:'therefore',correct:0},{text:'however',correct:1},{text:'consequently',correct:0},{text:'nevertheless',correct:1},{text:'as a result',correct:0},{text:'in contrast',correct:1} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el conector que rompe la coherencia y elige el correcto.',
    sents:[
      { words:['It','rained','.','However',',','the','match','was','cancelled','.'], wi:3, correct:'Therefore', choices:['Therefore','However','In contrast','Although'] },
      { words:['She','studied','.','In','contrast',',','she','passed','.'], wi:3, correct:'Consequently', choices:['Consequently','In','However','Nevertheless'] },
      { words:['The','data','is','weak','.','Therefore',',','it','is','reliable','.'], wi:5, correct:'Nevertheless', choices:['Nevertheless','Therefore','Thus','So'] } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo eligiendo el conector coherente.', speakers:['Profesor','Alumno'],
    lines:[
      { speaker:0, text:'It rained. What connector links the cancellation?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Therefore, the match was cancelled.','However, the match was cancelled.','In contrast, the match was cancelled.','Although the match was cancelled.'], correct:0 },
      { speaker:0, text:'The theory lacks proof but is popular. Which connector?', blank:false },
      { speaker:1, text:null, blank:true, opts:['However, it is popular.','Therefore, it is popular.','As a result, it is popular.','Thus, it is popular.'], correct:0 },
      { speaker:0, text:'Well done.', blank:false } ] }
]);

/* topic-data-261.js - Juego 261/350 | T38 2/7 ACADEMIC WRITING | estructura del parrafo (ESPECIALIZADO) | Platino B2 */
_registerGames(261, 'Estructura del Parrafo Academico', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'La oracion que presenta la idea principal del parrafo es...', opts:['supporting sentence','topic sentence','concluding sentence','example'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada parte con su funcion.',
    pairs:[ ['topic sentence','presenta la idea principal'],['supporting sentence','aporta detalles o evidencia'],['concluding sentence','cierra el parrafo'],['example','ilustra un punto'],['transition','enlaza ideas'],['thesis','idea central del ensayo'] ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada oracion por su funcion en el parrafo.',
    categories:['Topic sentence','Supporting sentence','Concluding sentence'],
    items:[ {text:'Exercise has many benefits.',correct:0},{text:'For example, it reduces stress.',correct:1},{text:'In short, exercise is essential.',correct:2},{text:'Technology has changed education.',correct:0},{text:'Studies show higher engagement.',correct:1},{text:'Thus, its role keeps growing.',correct:2} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'La topic sentence suele ir al inicio del parrafo.', ans:true, expl:'Correcto.' },
      { text:'La concluding sentence presenta la idea principal.', ans:false, expl:'Falso. la presenta la topic sentence.' },
      { text:'Las supporting sentences aportan evidencia o detalles.', ans:true, expl:'Correcto.' },
      { text:'Un parrafo academico no necesita topic sentence.', ans:false, expl:'Falso. es esencial.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta.',
    sents:[
      { pre:'The ', ans:'topic sentence', post:' states the main idea.', bank:['topic sentence','example','detail','quote'] },
      { pre:'Supporting sentences provide ', ans:'evidence', post:'.', bank:['evidence','the title','the heading','the date'] },
      { pre:'The ', ans:'concluding sentence', post:' summarises the paragraph.', bank:['concluding sentence','topic sentence','first example','quotation'] },
      { pre:'A good paragraph has ', ans:'one main idea', post:'.', bank:['one main idea','many topics','no structure','no evidence'] } ] },
  { id:'order', label:'Ordena el parrafo', xp:30, instr:'Ordena las partes del parrafo.',
    sents:[ {words:['supporting','topic','concluding'],ans:['topic','supporting','concluding']},{words:['evidence','idea','summary'],ans:['idea','evidence','summary']},{words:['detail','main','closing'],ans:['main','detail','closing']} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo sobre estructura.', speakers:['Profesor','Alumno'],
    lines:[
      { speaker:0, text:'Where should the main idea go?', blank:false },
      { speaker:1, text:null, blank:true, opts:['In the topic sentence at the start.','In the concluding sentence.','In a supporting example.','In the title only.'], correct:0 },
      { speaker:0, text:'And how do we end?', blank:false },
      { speaker:1, text:null, blank:true, opts:['With a concluding sentence.','With a new topic.','With more evidence only.','With a question always.'], correct:0 },
      { speaker:0, text:'Exactly.', blank:false } ] }
]);

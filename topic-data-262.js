/* topic-data-262.js - Juego 262/350 | T38 3/7 ACADEMIC WRITING | recursos de cohesion (ESPECIALIZADO) | Platino B2 */
_registerGames(262, 'Recursos de Cohesion · Referencia y Sustitucion', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Para evitar repetir un verbo se puede usar...', opts:['this','do so','these','one'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada recurso con su funcion.',
    pairs:[ ['it / they','pronombre de referencia'],['this / these','referencia a una idea'],['do so','sustitucion verbal'],['one / ones','sustitucion de sustantivo contable'],['such','referencia a un tipo'],['synonym','evitar repeticion lexica'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el recurso de cohesion correcto.',
    sents:[
      { pre:'I needed a pen, so I bought a new ', ans:'one', post:'.', bank:['one','it','do so','this'] },
      { pre:'She asked me to leave, and I ', ans:'did so', post:'.', bank:['did so','one','it','these'] },
      { pre:'The results were poor. ', ans:'This', post:' surprised everyone.', bank:['This','One','Do so','It is'] },
      { pre:'I have two ideas; both of ', ans:'them', post:' are useful.', bank:['them','it','one','do so'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"do so" sustituye un predicado verbal.', ans:true, expl:'Correcto. evita repetir el verbo.' },
      { text:'"one" sustituye sustantivos incontables.', ans:false, expl:'Falso. sustituye contables.' },
      { text:'"this" puede referirse a una idea mencionada antes.', ans:true, expl:'Correcto.' },
      { text:'Usar sinonimos no ayuda a la cohesion.', ans:false, expl:'Falso. evita la repeticion.' } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el recurso incorrecto y elige la correccion.',
    sents:[
      { words:['I','need','a','pen','—','do','you','have','it','?'], wi:8, correct:'one', choices:['one','it','this','do so'] },
      { words:['She','asked','me','to','help','and','I','did','it','.'], wi:8, correct:'so', choices:['so','it','one','this'] },
      { words:['I','have','two','pens','.','Take','this','one','.'], wi:6, correct:'this one', choices:['this one','this','that','it'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada recurso por su tipo.',
    categories:['Referencia','Sustitucion'],
    items:[ {text:'it / they',correct:0},{text:'one / ones',correct:1},{text:'this / these',correct:0},{text:'do so',correct:1},{text:'such',correct:0},{text:'do this',correct:1} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['one','I','bought','a','new'],ans:['I','bought','a','new','one']},{words:['so','She','left','and','I','did'],ans:['She','left','and','I','did','so']},{words:['This','surprised','everyone'],ans:['This','surprised','everyone']} ] }
]);

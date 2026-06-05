/* topic-data-168.js - Juego 168/350 | T24 7/7 IF I HAD | errores del Condicional 2 (MEZCLADO) | Oro B1 */
_registerGames(168, 'Condicional 2 · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Si tuviera dinero, viajaria', opts:["If I would have money, I'd travel","If I had money, I'd travel","If I have money, I'd travel","If I had money, I'll travel"], correct:1 },
      { src:'Ojala fuera mas alto', opts:['I wish I will be taller','I wish I were taller','I wish I am taller','I hope I were taller'], correct:1 },
      { src:'Si fuera rica, compraria un yate', opts:['If she is rich, she would buy a yacht','If she were rich, she would buy a yacht','If she were rich, she will buy a yacht','If she would be rich, she buy a yacht'], correct:1 },
      { src:'Si supiera, te ayudaria', opts:['If I would know, I would help','If I knew, I would help','If I know, I would help','If I knew, I will help'], correct:1 },
      { src:'Ojala tuviera un coche', opts:['I wish I will have a car','I wish I had a car','I wish I have a car','I hope I had a car'], correct:1 },
      { src:'Si fuera tu, no lo haria', opts:["If I was you, I wouldn't do it","If I were you, I wouldn't do it","If I am you, I wouldn't do it","If I were you, I won't do it"], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['If I would have money','If I had money','If I have money would','If I would had money'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['If I would have money','If I had money'],['I wish I will be taller','I wish I were taller'],['If she is rich (cond 2)','If she were rich'],['If I would know','If I knew'],['I wish I have a car','I wish I had a car'],['If I was you (formal)','If I were you'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['had','If','I','money','I','would','travel'],ans:['If','I','had','money','I','would','travel']},{words:['were','I','wish','I','taller'],ans:['I','wish','I','were','taller']},{words:['were','If','she','rich','she','would','buy'],ans:['If','she','were','rich','she','would','buy']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['If','I','have','money','I','would','travel','.'], wi:2, correct:'had', choices:['had','have','will have','would have'] },
      { words:['I','wish','I','am','taller','.'], wi:3, correct:'were', choices:['were','am','will be','would be'] },
      { words:['If','she','is','rich','she','would','buy','.'], wi:2, correct:'were', choices:['were','is','was','will be'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['D','A','H'],ans:'HAD',hint:'corrige would have'},{scrambled:['E','R','E','W'],ans:'WERE',hint:'corrige wish I will be'},{scrambled:['D','L','U','O','W'],ans:'WOULD',hint:'clausula resultado'},{scrambled:['H','S','I','W'],ans:'WISH',hint:'deseo'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'No se usa "would" en la clausula if del cond 2.', ans:true, expl:'Correcto. If I had money.' },
      { text:'"I wish I will be taller." es correcto.', ans:false, expl:'Falso. I wish I were taller.' },
      { text:'En el cond 2 se usa el pasado simple en la clausula if.', ans:true, expl:'Correcto. If I had / If she were.' },
      { text:'"If she is rich, she would buy a yacht." es correcto.', ans:false, expl:'Falso. If she were rich.' } ] }
]);

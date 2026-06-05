/* topic-data-224.js - Juego 224/350 | T32 7/7 IF ONLY | errores del Condicional 3 (MEZCLADO) | Platino B2 */
_registerGames(224, 'Condicional 3 · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Si lo hubiera sabido, te habria ayudado', opts:['If I would have known, I would have helped','If I had known, I would have helped','If I have known, I would have helped','If I knew, I would have helped'], correct:1 },
      { src:'Ella desearia haberselo dicho', opts:['She wish she had told him','She wishes she had told him','She wished she has told him','She wish she told him'], correct:1 },
      { src:'Ojala tuviera mas dinero', opts:['I wish I would have more money','I wish I had more money','I wish I have more money','I wish I will have more money'], correct:1 },
      { src:'Si hubieras venido, te habrias divertido', opts:['If you would have come, you would have fun','If you had come, you would have had fun','If you have come, you would have had fun','If you came, you would have fun'], correct:1 },
      { src:'Si no hubiera llovido, habriamos jugado', opts:['If it would not have rained, we would have played','If it had not rained, we would have played','If it has not rained, we would have played','If it did not rain, we would have played'], correct:1 },
      { src:'Ojala hubiera estudiado mas', opts:['I wish I would have studied more','I wish I had studied more','I wish I have studied more','I wish I studied more'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['If I would have known','If I had known','If I have known','If I would known'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['If I would have known','If I had known'],['She wish','She wishes'],['I wish I would have money','I wish I had money'],['it would not have rained','it had not rained'],['If you would have come','If you had come'],['I wish I would have studied','I wish I had studied'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['had','If','I','known','I','would','have','helped'],ans:['If','I','had','known','I','would','have','helped']},{words:['had','I','wish','I','more','money'],ans:['I','wish','I','had','more','money']},{words:['wishes','She','she','had','told','him'],ans:['She','wishes','she','had','told','him']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['If','I','have','known','I','would','have','helped','.'], wi:2, correct:'had', choices:['had','have','has','would'] },
      { words:['She','wish','she','had','told','him','.'], wi:1, correct:'wishes', choices:['wishes','wish','wished','wishing'] },
      { words:['I','wish','I','have','more','money','.'], wi:3, correct:'had', choices:['had','have','has','would'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['D','A','H'],ans:'HAD',hint:'corrige would have (if)'},{scrambled:['S','E','H','S','I','W'],ans:'WISHES',hint:'corrige she wish'},{scrambled:['D','L','U','O','W'],ans:'WOULD',hint:'clausula resultado'},{scrambled:['N','W','O','N','K'],ans:'KNOWN',hint:'participio de know'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'En el Condicional 3 no se usa "would have" en la clausula if.', ans:true, expl:'Correcto. If I had known.' },
      { text:'"She wish she had told him." es correcto.', ans:false, expl:'Falso. She wishes she had told him.' },
      { text:'"I wish I had more money." es correcto para un deseo presente.', ans:true, expl:'Correcto.' },
      { text:'"I wish I would have more money." es correcto.', ans:false, expl:'Falso. I wish I had more money.' } ] }
]);

/* topic-data-344.js - Juego 344/350 | T50 1/7 NATIVE FLUENCY | expresiones nativas de alta opacidad (ESPECIALIZADO) | Challenger C2 */
_registerGames(344, 'Expresiones Nativas de Alta Opacidad', [
  { id:'translate', label:'Significado', xp:25, instr:'Elige el equivalente comunicativo.',
    items:[
      { src:'fair enough', opts:['de acuerdo, tiene sentido','no es justo','bastante feria','suficiente dinero'], correct:0 },
      { src:'go figure', opts:['vete a calcular','quien lo diria','dibuja una figura','adivina el numero'], correct:1 },
      { src:'you do not say', opts:['no lo digas','no me digas (sorpresa)','tu no hablas','di algo'], correct:1 },
      { src:'I will say', opts:['lo dire','ya lo creo / desde luego','dire algo','no dire nada'], correct:1 },
      { src:'so much for that', opts:['mucho de eso','tanto para eso (decepcion)','demasiado caro','gracias por eso'], correct:1 },
      { src:'suit yourself', opts:['ponte un traje','haz lo que quieras','vistete bien','queda contigo'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Fair enough" comunica...', opts:['estoy de acuerdo','no es justo','es una feria','es suficiente comida'], correct:0 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada expresion con su sentido.',
    pairs:[ ['fair enough','de acuerdo'],['go figure','quien lo diria'],['you do not say','no me digas'],['I will say','ya lo creo'],['so much for that','tanto para eso'],['suit yourself','haz lo que quieras'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la expresion nativa correcta.',
    sents:[
      { pre:'You want to do it alone? ', ans:'Suit yourself', post:'.', bank:['Suit yourself','Go figure','Fair enough now','I will say'] },
      { pre:'The trip was cancelled. ', ans:'So much for that', post:'.', bank:['So much for that','Fair enough','I will say','You do not say'] },
      { pre:'"That was an amazing game." "', ans:'I will say', post:'!"', bank:['I will say','Go figure','Suit yourself','So much'] },
      { pre:'"It rained on the one dry day." "', ans:'Go figure', post:'."', bank:['Go figure','Fair enough','I will say','Suit yourself'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada significado es correcto.',
    stmts:[
      { text:'"fair enough" expresa acuerdo o aceptacion.', ans:true, expl:'Correcto.' },
      { text:'"you do not say" es una orden de callar.', ans:false, expl:'Falso. expresa sorpresa irónica.' },
      { text:'"suit yourself" significa haz lo que quieras.', ans:true, expl:'Correcto.' },
      { text:'"so much for that" expresa entusiasmo.', ans:false, expl:'Falso. expresa decepcion.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion por su funcion.',
    categories:['Acuerdo / Concesion','Sorpresa / Decepcion'],
    items:[ {text:'fair enough',correct:0},{text:'go figure',correct:1},{text:'suit yourself',correct:0},{text:'so much for that',correct:1},{text:'that is fine by me',correct:0},{text:'you do not say',correct:1} ] }
  ,{ id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['R','I','A','F'],ans:'FAIR',hint:'... enough'},{scrambled:['E','R','U','G','I','F'],ans:'FIGURE',hint:'go ...'},{scrambled:['T','I','U','S'],ans:'SUIT',hint:'... yourself'},{scrambled:['Y','A','S'],ans:'SAY',hint:'I will ...'} ] }
]);

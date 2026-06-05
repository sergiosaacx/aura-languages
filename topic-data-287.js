/* topic-data-287.js - Juego 287/350 | T41 7/7 ELLIPSIS | errores de elipsis y sustitucion (MEZCLADO) | Diamante C1 */
_registerGames(287, 'Elipsis y Sustitucion · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Me gusta el cafe y a ella tambien', opts:['I like coffee and so do she','I like coffee and so does she','I like coffee and so she does','I like coffee and so is she'], correct:1 },
      { src:'A mi tampoco', opts:['Neither I do','Neither do I','Neither am I do','So neither I'], correct:1 },
      { src:'Necesito un boli. Tienes uno?', opts:['I need a pen. Do you have one a?','I need a pen. Do you have one?','I need a pen. Do you have a one?','I need a pen. Do you have it one?'], correct:1 },
      { src:'Ella puede nadar y yo tambien', opts:['She can swim and so do I','She can swim and so can I','She can swim and so am I','She can swim and so I can'], correct:1 },
      { src:'No he terminado. Yo tampoco', opts:["I have not finished. Neither do I","I have not finished. Neither have I","I have not finished. So have I","I have not finished. Neither I have"], correct:1 },
      { src:'Quieres los rojos? Si, esos', opts:['Do you want the red ones? Yes, those','Do you want the red one? Yes, those','Do you want the red ones? Yes, that','Do you want the red ones? Yes, it'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['so do she','so does she','so she does','so is she'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['so do she','so does she'],['Neither I do','Neither do I'],['do you have one a','do you have one'],['so do I (con can)','so can I'],['Neither do I (con have)','Neither have I'],['the red one (plural)','the red ones'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['does','and','so','she'],ans:['and','so','does','she']},{words:['do','Neither','I'],ans:['Neither','do','I']},{words:['can','and','so','I'],ans:['and','so','can','I']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['I','like','coffee','and','so','do','she','.'], wi:5, correct:'does', choices:['does','do','is','can'] },
      { words:['Neither','I','do','.'], wi:1, correct:'do I', choices:['do I','I do','I','am I'] },
      { words:['Do','you','have','one','a','?'], wi:4, correct:'(nada)', choices:['(nada)','a','one','the'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['S','E','O','D'],ans:'DOES',hint:'and so ... she'},{scrambled:['R','E','H','T','I','E','N'],ans:'NEITHER',hint:'... do I'},{scrambled:['E','N','O'],ans:'ONE',hint:'do you have ...?'},{scrambled:['S','E','N','O'],ans:'ONES',hint:'the red ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"I like coffee and so does she." es correcto.', ans:true, expl:'Correcto. does para she.' },
      { text:'"Neither I do." es correcto.', ans:false, expl:'Falso. Neither do I (inversion).' },
      { text:'"Do you have one?" es correcto.', ans:true, expl:'Correcto. one sin articulo extra.' },
      { text:'"She can swim and so do I." es correcto.', ans:false, expl:'Falso. so can I.' } ] }
]);

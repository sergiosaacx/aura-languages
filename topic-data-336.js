/* topic-data-336.js - Juego 336/350 | T48 7/7 GRAMMAR EDGE | errores en estructuras complejas (MEZCLADO) | Challenger C2 */
_registerGames(336, 'Estructuras Sintacticas Complejas · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Hablo en terminos de blanco y negro', opts:['She spoke in black or white terms','She spoke in black and white terms','She spoke in white and black terms','She spoke in white or black terms'], correct:1 },
      { src:'De aqui en adelante, descansare', opts:['Henceforth, I feel very tired today','Henceforth, I will rest','Hitherto, I will rest','Forthwith I feel tired today'], correct:1 },
      { src:'Pan y mantequilla', opts:['butter and bread','bread and butter','bread or butter','butter or bread'], correct:1 },
      { src:'Considerando todo', opts:['Considering all things badly','All things considered','All considered things','Things all considered'], correct:1 },
      { src:'Sangre, sudor y lagrimas', opts:['blood, tears and sweat','blood, sweat and tears','sweat, blood and tears','tears, sweat and blood'], correct:1 },
      { src:'Si el tiempo lo permite', opts:['Weather permits','Weather permitting','Permitting weather','If the weather permit'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['black or white terms','black and white terms','white and black terms','white or black terms'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['black or white terms','black and white terms'],['butter and bread','bread and butter'],['Henceforth, I feel tired today','Henceforth, I will rest'],['tears, sweat and blood','blood, sweat and tears'],['Weather permits we go','Weather permitting, we go'],['Considering all things badly','All things considered'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['white','black','and','terms'],ans:['black','and','white','terms']},{words:['butter','bread','and'],ans:['bread','and','butter']},{words:['tears','blood','sweat','and'],ans:['blood','sweat','and','tears']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['black','or','white','terms','.'], wi:1, correct:'and', choices:['and','or','nor','but'] },
      { words:['butter','and','bread','.'], wi:0, correct:'bread', choices:['bread','butter','toast','jam'] },
      { words:['Henceforth',',','I','feel','tired','today','.'], wi:3, correct:'will rest', choices:['will rest','feel','felt','am'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"black and white terms" es correcto.', ans:true, expl:'Correcto.' },
      { text:'"Henceforth, I feel very tired today." usa bien el arcaismo.', ans:false, expl:'Falso. henceforth mira al futuro: I will rest.' },
      { text:'"bread and butter" es el orden correcto.', ans:true, expl:'Correcto.' },
      { text:'"tears, sweat and blood" es el orden convencional.', ans:false, expl:'Falso. blood, sweat and tears.' } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['D','N','A'],ans:'AND',hint:'black ... white'},{scrambled:['D','A','E','R','B'],ans:'BREAD',hint:'... and butter'},{scrambled:['D','O','O','L','B'],ans:'BLOOD',hint:'..., sweat and tears'},{scrambled:['G','N','I','T','T','I','M','R','E','P'],ans:'PERMITTING',hint:'weather ...'} ] }
]);

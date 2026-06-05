/* topic-data-147.js - Juego 147/350 | T21 7/7 STILL GOING | errores tipicos (MEZCLADO) | Oro B1 */
_registerGames(147, 'Perfecto Continuo · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Ella lleva horas estudiando', opts:['She has been study for hours','She has been studying for hours','She has studying for hours','She is been studying for hours'], correct:1 },
      { src:'Llevo viviendo aqui diez anos', opts:['I have lived here since ten years','I have lived here for ten years','I have been living here since ten years','I am living here for ten years'], correct:1 },
      { src:'El la conoce desde el colegio', opts:['He has been knowing her since school','He has known her since school','He has knowing her since school','He is knowing her since school'], correct:1 },
      { src:'Llevamos esperando una hora', opts:['We have been wait for an hour','We have been waiting for an hour','We have waiting for an hour','We are been waiting for an hour'], correct:1 },
      { src:'Ella lleva trabajando desde las 8', opts:['She has been working since 8','She has been working for 8','She has worked since 8','She is been working since 8'], correct:1 },
      { src:'Me gusta esto desde hace anos', opts:['I have been liking this for years','I have liked this for years','I am liking this for years','I have liking this for years'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['She has been study','She has been studying','She has studying','She is been studying'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['has been study','has been studying'],['since ten years','for ten years'],['has been knowing','has known'],['have been wait','have been waiting'],['has been working for 8','has been working since 8'],['have been liking','have liked'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['studying','She','has','been','for','hours'],ans:['She','has','been','studying','for','hours']},{words:['known','He','has','her','since','school'],ans:['He','has','known','her','since','school']},{words:['for','I','have','lived','here','ten','years'],ans:['I','have','lived','here','for','ten','years']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She','has','been','study','for','hours','.'], wi:3, correct:'studying', choices:['studying','study','studies','studied'] },
      { words:['I','have','lived','here','since','ten','years','.'], wi:4, correct:'for', choices:['for','since','from','ago'] },
      { words:['He','has','knowing','her','.'], wi:2, correct:'known', choices:['known','knowing','know','knew'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['G','N','I','Y','D','U','T','S'],ans:'STUDYING',hint:'corrige has been study'},{scrambled:['R','O','F'],ans:'FOR',hint:'corrige since ten years'},{scrambled:['N','W','O','N','K'],ans:'KNOWN',hint:'corrige has been knowing'},{scrambled:['N','E','E','B'],ans:'BEEN',hint:'have ... waiting'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'El perfecto continuo necesita "been + -ing".', ans:true, expl:'Correcto. has been studying.' },
      { text:'"I have lived here since ten years." es correcto.', ans:false, expl:'Falso. for ten years.' },
      { text:'"know" es estativo: "has known", no "has been knowing".', ans:true, expl:'Correcto.' },
      { text:'"She has been study." es correcto.', ans:false, expl:'Falso. has been studying.' } ] }
]);

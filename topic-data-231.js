/* topic-data-231.js - Juego 231/350 | T33 7/7 THE PASSIVE GAME | errores de pasivas avanzadas (MEZCLADO) | Platino B2 */
_registerGames(231, 'Pasivas Avanzadas · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Debio haberse hecho antes', opts:['It should been done earlier','It should have been done earlier','It should be done earlier already','It should has been done earlier'], correct:1 },
      { src:'Se dice que el es brillante', opts:['He is said that he is brilliant','It is said that he is brilliant','He is said brilliant','It said that he is brilliant'], correct:1 },
      { src:'El trabajo ha sido terminado', opts:['The work has finished','The work has been finished','The work is been finished','The work have been finished'], correct:1 },
      { src:'La casa esta siendo construida', opts:['The house is build','The house is being built','The house is been built','The house being built'], correct:1 },
      { src:'Debe ser revisado', opts:['It must reviewed','It must be reviewed','It must been reviewed','It must to be reviewed'], correct:1 },
      { src:'Se cree que ella es honesta (forma 2)', opts:['She is believed that honest','She is believed to be honest','She believed to be honest','She is believe to be honest'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['should been done','should have been done','should be been done','should has been done'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['should been done','should have been done'],['He is said that he is rich','He is said to be rich'],['has finished (pasiva)','has been finished'],['is build','is being built'],['must reviewed','must be reviewed'],['is believed that honest','is believed to be honest'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['been','It','should','have','done'],ans:['It','should','have','been','done']},{words:['be','He','is','said','to','rich'],ans:['He','is','said','to','be','rich']},{words:['been','The','work','has','finished'],ans:['The','work','has','been','finished']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['It','should','been','done','earlier','.'], wi:2, correct:'have been', choices:['have been','been','be','has been'] },
      { words:['He','is','said','that','rich','.'], wi:3, correct:'to be', choices:['to be','that','is','to'] },
      { words:['The','work','has','finished','.'], wi:3, correct:'been finished', choices:['been finished','finished','finish','be finished'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['E','V','A','H'],ans:'HAVE',hint:'should ... been done'},{scrambled:['N','E','E','B'],ans:'BEEN',hint:'has ... finished'},{scrambled:['G','N','I','E','B'],ans:'BEING',hint:'is ... built'},{scrambled:['E','B'],ans:'BE',hint:'said to ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"It should have been done earlier." es correcto.', ans:true, expl:'Correcto. modal + have been + PP.' },
      { text:'"He is said that he is brilliant." es correcto.', ans:false, expl:'Falso. He is said to be brilliant.' },
      { text:'"The work has been finished." es pasiva correcta.', ans:true, expl:'Correcto.' },
      { text:'"It should been done." es correcto.', ans:false, expl:'Falso. should have been done.' } ] }
]);

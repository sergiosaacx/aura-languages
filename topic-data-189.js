/* topic-data-189.js - Juego 189/350 | T27 7/7 VERB PATTERNS | errores tipicos (MEZCLADO) | Oro B1 */
_registerGames(189, 'Verb Patterns · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Ella disfruta bailar', opts:['She enjoys to dance','She enjoys dancing','She enjoy dancing','She enjoys dance'], correct:1 },
      { src:'El me hizo quedarme tarde', opts:['He made me to stay late','He made me stay late','He made me staying late','He make me stay late'], correct:1 },
      { src:'La vi salir del edificio', opts:['I saw her to leave the building','I saw her leave the building','I saw her to leaving the building','I saw her leaves the building'], correct:1 },
      { src:'Quiero aprender', opts:['I want learning','I want to learn','I want learn','I want to learning'], correct:1 },
      { src:'Evito conducir', opts:['I avoid to drive','I avoid driving','I avoid drive','I avoid to driving'], correct:1 },
      { src:'Dejalo ir', opts:['Let him to go','Let him go','Let him going','Let him goes'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['enjoys to dance','enjoys dancing','enjoy dancing','enjoys dance'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['enjoys to dance','enjoys dancing'],['made me to stay','made me stay'],['saw her to leave','saw her leave'],['want learning','want to learn'],['avoid to drive','avoid driving'],['let him to go','let him go'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['dancing','She','enjoys'],ans:['She','enjoys','dancing']},{words:['stay','He','made','me','late'],ans:['He','made','me','stay','late']},{words:['leave','I','saw','her','the','building'],ans:['I','saw','her','leave','the','building']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la forma incorrecta y elige la correccion.',
    sents:[
      { words:['She','enjoys','dance','.'], wi:2, correct:'dancing', choices:['dancing','dance','to dance','dances'] },
      { words:['He','made','me','staying','late','.'], wi:3, correct:'stay', choices:['stay','staying','to stay','stays'] },
      { words:['I','want','learning','.'], wi:2, correct:'to learn', choices:['to learn','learning','learn','learns'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['G','N','I','C','N','A','D'],ans:'DANCING',hint:'enjoy + ...'},{scrambled:['Y','A','T','S'],ans:'STAY',hint:'made me ...'},{scrambled:['N','R','A','E','L'],ans:'LEARN',hint:'want to ...'},{scrambled:['E','V','A','E','L'],ans:'LEAVE',hint:'saw her ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"She enjoys to dance." es incorrecto.', ans:true, expl:'Correcto. enjoys dancing.' },
      { text:'"He made me stay late." es correcto.', ans:true, expl:'Correcto. make + inf sin to.' },
      { text:'"I saw her to leave." es correcto.', ans:false, expl:'Falso. saw her leave (sin to).' },
      { text:'"I want to learn." es correcto.', ans:true, expl:'Correcto. want + inf con to.' } ] }
]);

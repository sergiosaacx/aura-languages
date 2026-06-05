/* topic-data-098.js - Juego 98/350 | T14 7/7 WHAT'S HAPPENING? | errores tipicos (MEZCLADO) | Plata A2 */
_registerGames(98, 'Presente Continuo · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Ella sabe la respuesta', opts:['She is knowing the answer','She knows the answer','She knowing the answer','She know the answer'], correct:1 },
      { src:'El esta corriendo rapido', opts:['He runing fast','He is running fast','He running fast','He is runing fast'], correct:1 },
      { src:'Yo quiero un cafe', opts:['I am wanting a coffee','I want a coffee','I wanting a coffee','I wants a coffee'], correct:1 },
      { src:'Ellos estan nadando', opts:['They are swiming','They are swimming','They swimming','They is swimming'], correct:1 },
      { src:'Me gusta el te', opts:['I am liking tea','I like tea','I liking tea','I likes tea'], correct:1 },
      { src:'Ella esta haciendo un pastel', opts:['She is makeing a cake','She is making a cake','She making a cake','She makes a cake'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['She is knowing it','She knows it','She knowing it','She know it'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['She is knowing','She knows'],['He runing','He is running'],['I am wanting','I want'],['They are swiming','They are swimming'],['She is makeing','She is making'],['I am liking','I like'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['knows','She','the','answer'],ans:['She','knows','the','answer']},{words:['running','He','is','fast'],ans:['He','is','running','fast']},{words:['want','I','a','coffee'],ans:['I','want','a','coffee']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['He','runing','fast','.'], wi:1, correct:'runs', choices:['runs','runing','running','run'] },
      { words:['I','wanting','coffee','.'], wi:1, correct:'want', choices:['want','wanting','wants','wanted'] },
      { words:['They','are','swiming','.'], wi:2, correct:'swimming', choices:['swimming','swiming','swimng','swim'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['S','W','O','N','K'],ans:'KNOWS',hint:'corrige is knowing'},{scrambled:['G','N','I','N','N','U','R'],ans:'RUNNING',hint:'corrige runing'},{scrambled:['T','N','A','W'],ans:'WANT',hint:'corrige am wanting'},{scrambled:['G','N','I','M','M','I','W','S'],ans:'SWIMMING',hint:'corrige swiming'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"know" es estativo, no usa -ing.', ans:true, expl:'Correcto. She knows.' },
      { text:'"He runing fast." es correcto.', ans:false, expl:'Falso. He is running (doble n).' },
      { text:'"I want a coffee." es correcto.', ans:true, expl:'Correcto. want es estativo.' },
      { text:'"They are swiming." es correcto.', ans:false, expl:'Falso. swimming (doble m).' } ] }
]);

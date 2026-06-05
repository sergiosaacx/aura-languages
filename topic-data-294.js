/* topic-data-294.js - Juego 294/350 | T42 7/7 ADVANCED MODALS | errores tipicos (MEZCLADO) | Diamante C1 */
_registerGames(294, 'Modales Perfectos · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Debe de haber olvidado sus llaves', opts:['She must have forgot her keys','She must have forgotten her keys','She must forgot her keys','She must has forgotten her keys'], correct:1 },
      { src:'Deberia haber llamado antes', opts:['He should has called earlier','He should have called earlier','He should called earlier','He should have call earlier'], correct:1 },
      { src:'No pueden haberlo sabido', opts:["They can't have knew about it","They can't have known about it","They can't knew about it","They can't have know about it"], correct:1 },
      { src:'Debe de haberse ido', opts:['He must have went','He must have gone','He must gone','He must has gone'], correct:1 },
      { src:'Podria haberlo hecho', opts:['She could have did it','She could have done it','She could did it','She could have do it'], correct:1 },
      { src:'No deberias haberlo comido', opts:["You shouldn't have ate it","You shouldn't have eaten it","You shouldn't ate it","You shouldn't have eat it"], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['must have forgot','must have forgotten','must forgot','must has forgotten'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['must have forgot','must have forgotten'],['should has called','should have called'],["can't have knew","can't have known"],['must have went','must have gone'],['could have did','could have done'],["shouldn't have ate","shouldn't have eaten"] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['forgotten','She','must','have','her','keys'],ans:['She','must','have','forgotten','her','keys']},{words:['called','He','should','have','earlier'],ans:['He','should','have','called','earlier']},{words:['gone','He','must','have'],ans:['He','must','have','gone']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['She','must','have','forgot','her','keys','.'], wi:3, correct:'forgotten', choices:['forgotten','forgot','forget','forgetting'] },
      { words:['He','should','has','called','.'], wi:2, correct:'have', choices:['have','has','had','having'] },
      { words:['They',"can't",'have','knew','it','.'], wi:3, correct:'known', choices:['known','knew','know','knowing'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el participio correcto.',
    words:[ {scrambled:['N','E','T','T','O','G','R','O','F'],ans:'FORGOTTEN',hint:'corrige forgot'},{scrambled:['N','W','O','N','K'],ans:'KNOWN',hint:'corrige knew'},{scrambled:['E','N','O','G'],ans:'GONE',hint:'corrige went'},{scrambled:['E','N','O','D'],ans:'DONE',hint:'corrige did'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"She must have forgotten her keys." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"He should has called earlier." es correcto.', ans:false, expl:'Falso. should have called.' },
      { text:'"They can\'t have known about it." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"He must have went." es correcto.', ans:false, expl:'Falso. must have gone.' } ] }
]);

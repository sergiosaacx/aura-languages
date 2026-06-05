/* topic-data-112.js - Juego 112/350 | T16 7/7 I HAVE DONE IT | errores tipicos (MEZCLADO) | Plata A2 */
_registerGames(112, 'Presente Perfecto · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Ella ha ido a Paris', opts:['She has went to Paris','She has gone to Paris','She have gone to Paris','She has go to Paris'], correct:1 },
      { src:'Ya he comido', opts:['I have already eaten yet','I have already eaten','I have eaten already yet','I already eaten'], correct:1 },
      { src:'Lo viste ayer?', opts:['Have you seen him yesterday?','Did you see him yesterday?','Have you saw him yesterday?','Did you saw him yesterday?'], correct:1 },
      { src:'El ha hecho su tarea', opts:['He has did his homework','He has done his homework','He have done his homework','He has do his homework'], correct:1 },
      { src:'Nunca he estado alli', opts:['I have ever been there','I have never been there','I never been there ever','I have not never been there'], correct:1 },
      { src:'Han visto la pelicula?', opts:['Have they saw the film?','Have they seen the film?','Did they seen the film?','Have they see the film?'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['She has went','She has gone','She have gone','She has go'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['has went','has gone'],['has did','has done'],['have saw','have seen'],['Have you seen him yesterday?','Did you see him yesterday?'],['have already eaten yet','have already eaten'],['have ever been (afirm)','have never been'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['gone','She','has','to','Paris'],ans:['She','has','gone','to','Paris']},{words:['done','He','has','his','homework'],ans:['He','has','done','his','homework']},{words:['seen','have','We','it'],ans:['We','have','seen','it']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el participio incorrecto y elige la correccion.',
    sents:[
      { words:['She','has','went','to','Paris','.'], wi:2, correct:'gone', choices:['gone','went','go','going'] },
      { words:['He','has','did','his','homework','.'], wi:2, correct:'done', choices:['done','did','do','doing'] },
      { words:['We','have','saw','the','film','.'], wi:2, correct:'seen', choices:['seen','saw','see','seed'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el participio correcto.',
    words:[ {scrambled:['E','N','O','G'],ans:'GONE',hint:'corrige has went'},{scrambled:['N','O','D','E'],ans:'DONE',hint:'corrige has did'},{scrambled:['N','E','E','S'],ans:'SEEN',hint:'corrige have saw'},{scrambled:['R','E','V','E','N'],ans:'NEVER',hint:'corrige have ever (afirm)'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'Despues de "has/have" va el participio.', ans:true, expl:'Correcto. has gone (no has went).' },
      { text:'"She has went." es correcto.', ans:false, expl:'Falso. She has gone.' },
      { text:'"Have you seen him yesterday?" es correcto.', ans:false, expl:'Falso. Did you see him yesterday?' },
      { text:'"He has done his homework." es correcto.', ans:true, expl:'Correcto. has + done.' } ] }
]);

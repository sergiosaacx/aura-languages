/* topic-data-175.js - Juego 175/350 | T25 7/7 PASSIVE VOICE | errores tipicos (MEZCLADO) | Oro B1 */
_registerGames(175, 'Voz Pasiva · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'El libro fue escrito por Tolkien', opts:['The book was wrote by Tolkien','The book was written by Tolkien','The book is written by Tolkien now','The book wrote by Tolkien'], correct:1 },
      { src:'Ha sido reparado', opts:['It is been repaired','It has been repaired','It was been repaired','It is repaired been'], correct:1 },
      { src:'La ventana fue rota por el', opts:['The window was break by him','The window was broken by him','The window was broke by him','The window is broken by him now'], correct:1 },
      { src:'El ingles se habla aqui', opts:['English is speak here','English is spoken here','English speaks here','English was spoken here'], correct:1 },
      { src:'La carta fue enviada', opts:['The letter was send','The letter was sent','The letter is sent now','The letter sent'], correct:1 },
      { src:'Los coches son hechos en Japon', opts:['The cars are make in Japan','The cars are made in Japan','The cars made in Japan','The cars were made in Japan'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['was wrote','was written','is wrote','wrote was'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['was wrote','was written'],['was break','was broken'],['is speak','is spoken'],['was send','was sent'],['are make','are made'],['was took','was taken'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['written','The','book','was','by','Tolkien'],ans:['The','book','was','written','by','Tolkien']},{words:['spoken','English','is','here'],ans:['English','is','spoken','here']},{words:['sent','The','letter','was'],ans:['The','letter','was','sent']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el participio incorrecto y elige la correccion.',
    sents:[
      { words:['The','book','was','wrote','by','Tolkien','.'], wi:3, correct:'written', choices:['written','wrote','write','writes'] },
      { words:['The','window','was','break','.'], wi:3, correct:'broken', choices:['broken','break','broke','breaks'] },
      { words:['English','is','speak','here','.'], wi:2, correct:'spoken', choices:['spoken','speak','spoke','speaks'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el participio correcto.',
    words:[ {scrambled:['N','E','T','T','I','R','W'],ans:'WRITTEN',hint:'corrige was wrote'},{scrambled:['N','E','K','O','R','B'],ans:'BROKEN',hint:'corrige was break'},{scrambled:['N','E','K','O','P','S'],ans:'SPOKEN',hint:'corrige is speak'},{scrambled:['T','N','E','S'],ans:'SENT',hint:'corrige was send'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'La pasiva usa el participio pasado, no el pasado simple.', ans:true, expl:'Correcto. was written.' },
      { text:'"The book was wrote." es correcto.', ans:false, expl:'Falso. was written.' },
      { text:'"English is spoken here." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"The window was break." es correcto.', ans:false, expl:'Falso. was broken.' } ] }
]);

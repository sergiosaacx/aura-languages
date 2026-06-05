/* topic-data-257.js - Juego 257/350 | T37 5/7 PHRASAL VERBS II | avanzados en oraciones naturales (MEZCLADO) | Platino B2 */
_registerGames(257, 'Phrasal Verbs Avanzados · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Se le ocurrio una idea brillante', opts:['She came across a brilliant idea','She came up with a brilliant idea','She came up a brilliant idea','She came over a brilliant idea'], correct:1 },
      { src:'No dejes que se salgan con la suya', opts:['Do not let them get away with it','Do not let them get over with it','Do not let them come across it','Do not let them put up with it'], correct:0 },
      { src:'El trato fracaso a ultima hora', opts:['The deal came across at the last minute','The deal fell through at the last minute','The deal got over at the last minute','The deal brought up at the last minute'], correct:1 },
      { src:'Encontre un viejo amigo por casualidad', opts:['I came up with an old friend','I came across an old friend','I put up with an old friend','I got over an old friend'], correct:1 },
      { src:'No soporto el ruido', opts:['I cannot come across the noise','I cannot put up with the noise','I cannot come up with the noise','I cannot get over the noise'], correct:1 },
      { src:'Saco el tema en la reunion', opts:['He brought up the topic in the meeting','He came across the topic in the meeting','He fell through the topic','He got away with the topic'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'She ___ a brilliant idea.', opts:['came across','came up with','came over','came up'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el phrasal verb correcto.',
    sents:[
      { pre:'She ', ans:'came up with', post:' a great plan.', bank:['came up with','came across','got away with','fell through'] },
      { pre:'Do not let them ', ans:'get away with', post:' it.', bank:['get away with','come up with','come across','put up with'] },
      { pre:'The project ', ans:'fell through', post:'.', bank:['fell through','came across','brought up','got over'] },
      { pre:'I cannot ', ans:'put up with', post:' this any longer.', bank:['put up with','come up with','come across','fall through'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['with','She','came','up','a','plan'],ans:['She','came','up','with','a','plan']},{words:['through','The','deal','fell'],ans:['The','deal','fell','through']},{words:['up','He','brought','the','topic'],ans:['He','brought','up','the','topic']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la particula incorrecta y elige la correccion.',
    sents:[
      { words:['She','came','across','with','an','idea','.'], wi:2, correct:'up', choices:['up','across','over','off'] },
      { words:['The','deal','fell','across','.'], wi:3, correct:'through', choices:['through','across','over','off'] },
      { words:['I','cannot','put','off','with','it','.'], wi:3, correct:'up', choices:['up','off','across','over'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"She came up with a brilliant idea." es correcto.', ans:true, expl:'Correcto. come up with = idear.' },
      { text:'"The deal fell across." es correcto.', ans:false, expl:'Falso. fell through.' },
      { text:'"He brought up the topic." es correcto.', ans:true, expl:'Correcto. bring up = sacar un tema.' },
      { text:'"I cannot put off with it." es correcto.', ans:false, expl:'Falso. put up with.' } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'How did the deal go?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Unfortunately, it fell through.','Unfortunately, it came across.','Unfortunately, it put up with.','Unfortunately, it brought up.'], correct:0 },
      { speaker:0, text:'Who solved the problem?', blank:false },
      { speaker:1, text:null, blank:true, opts:['She came up with the solution.','She came across the solution it.','She got away with the solution.','She fell through the solution.'], correct:0 },
      { speaker:0, text:'Impressive.', blank:false } ] }
]);

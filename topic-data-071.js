/* topic-data-071.js - Juego 71/350 | T11 1/7 WHAT HAPPENED? | Verbos irregulares forma pasada (ESPECIALIZADO) | Plata A2 */
_registerGames(71, 'Pasado Irregular · Formas', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el pasado irregular correcto.',
    items:[
      { src:'go (pasado)', opts:['goed','went','gone','goes'], correct:1 },
      { src:'see (pasado)', opts:['seed','saw','seen','sees'], correct:1 },
      { src:'eat (pasado)', opts:['eated','ate','eaten','eats'], correct:1 },
      { src:'have (pasado)', opts:['haved','had','has','having'], correct:1 },
      { src:'come (pasado)', opts:['comed','came','come','comes'], correct:1 },
      { src:'do (pasado)', opts:['doed','did','done','does'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es el pasado de "see"?', opts:['seed','saw','seen','sees'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el pasado correcto.',
    sents:[
      { pre:'Yesterday I ', ans:'went', post:' to school.', bank:['go','went','gone','goes'] },
      { pre:'She ', ans:'ate', post:' pizza.', bank:['eat','ate','eaten','eats'] },
      { pre:'We ', ans:'saw', post:' a movie.', bank:['see','saw','seen','sees'] },
      { pre:'He ', ans:'had', post:' a car.', bank:['have','had','has','having'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el pasado del verbo.',
    words:[ {scrambled:['T','N','E','W'],ans:'WENT',hint:'pasado de go'},{scrambled:['W','A','S'],ans:'SAW',hint:'pasado de see'},{scrambled:['E','T','A'],ans:'ATE',hint:'pasado de eat'},{scrambled:['M','C','A','E'],ans:'CAME',hint:'pasado de come'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada pasado es correcto.',
    stmts:[
      { text:'El pasado de "go" es "went".', ans:true, expl:'Correcto. go es irregular: went.' },
      { text:'El pasado de "see" es "seed".', ans:false, expl:'Falso. see -> saw.' },
      { text:'El pasado de "have" es "had".', ans:true, expl:'Correcto. have -> had.' },
      { text:'El pasado de "eat" es "eated".', ans:false, expl:'Falso. eat -> ate.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Escribe el pasado de cada verbo.',
    transforms:[
      { original:'go', task:'Pasado', opts:['went','goed','gone','goes'], correct:0 },
      { original:'see', task:'Pasado', opts:['saw','seed','seen','sees'], correct:0 },
      { original:'eat', task:'Pasado', opts:['ate','eated','eaten','eats'], correct:0 },
      { original:'come', task:'Pasado', opts:['came','comed','come','comes'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con el pasado correcto.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Where did you go yesterday?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I went to the park.','I goed to the park.','I gone to the park.','I go to the park.'], correct:0 },
      { speaker:0, text:'What did you eat?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I ate a sandwich.','I eated a sandwich.','I eaten a sandwich.','I eat a sandwich.'], correct:0 },
      { speaker:0, text:'Nice!', blank:false } ] }
]);

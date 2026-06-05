/* topic-data-106.js - Juego 106/350 | T16 1/7 I HAVE DONE IT | Participios pasados irregulares (ESPECIALIZADO) | Plata A2 */
_registerGames(106, 'Participios Pasados · Irregulares', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el participio pasado correcto.',
    items:[
      { src:'go (participio)', opts:['went','gone','goed','going'], correct:1 },
      { src:'see (participio)', opts:['saw','seen','seed','seeing'], correct:1 },
      { src:'eat (participio)', opts:['ate','eaten','eated','eating'], correct:1 },
      { src:'write (participio)', opts:['wrote','written','writed','writing'], correct:1 },
      { src:'do (participio)', opts:['did','done','doed','doing'], correct:1 },
      { src:'be (participio)', opts:['was','been','beed','being'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es el participio de "see"?', opts:['saw','seen','seed','seeing'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el participio correcto.',
    sents:[
      { pre:'I have ', ans:'gone', post:' to Paris.', bank:['go','went','gone','going'] },
      { pre:'She has ', ans:'eaten', post:' lunch.', bank:['eat','ate','eaten','eating'] },
      { pre:'They have ', ans:'seen', post:' the film.', bank:['see','saw','seen','seeing'] },
      { pre:'He has ', ans:'written', post:' a letter.', bank:['write','wrote','written','writing'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el participio pasado.',
    words:[ {scrambled:['E','N','O','G'],ans:'GONE',hint:'participio de go'},{scrambled:['N','E','E','S'],ans:'SEEN',hint:'participio de see'},{scrambled:['N','O','D','E'],ans:'DONE',hint:'participio de do'},{scrambled:['N','E','E','B'],ans:'BEEN',hint:'participio de be'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada participio es correcto.',
    stmts:[
      { text:'El participio de "go" es "gone".', ans:true, expl:'Correcto. go-went-gone.' },
      { text:'El participio de "see" es "saw".', ans:false, expl:'Falso. saw es pasado. Participio: seen.' },
      { text:'El participio de "do" es "done".', ans:true, expl:'Correcto. do-did-done.' },
      { text:'El participio de "eat" es "eated".', ans:false, expl:'Falso. eaten.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Escribe el participio de cada verbo.',
    transforms:[
      { original:'go', task:'Participio', opts:['gone','went','goed','going'], correct:0 },
      { original:'write', task:'Participio', opts:['written','wrote','writed','writing'], correct:0 },
      { original:'see', task:'Participio', opts:['seen','saw','seed','seeing'], correct:0 },
      { original:'eat', task:'Participio', opts:['eaten','ate','eated','eating'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con el participio correcto.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Have you finished your work?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I have done it.','Yes, I have did it.','Yes, I have do it.','Yes, I have doing it.'], correct:0 },
      { speaker:0, text:'Have you seen this film?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I have seen it.','Yes, I have saw it.','Yes, I have see it.','Yes, I have seeing it.'], correct:0 },
      { speaker:0, text:'Great!', blank:false } ] }
]);

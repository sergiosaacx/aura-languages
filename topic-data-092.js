/* topic-data-092.js - Juego 92/350 | T14 1/7 WHAT'S HAPPENING? | Presente Continuo formacion (ESPECIALIZADO) | Plata A2 */
_registerGames(92, 'Presente Continuo · Formacion', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma -ing correcta.',
    items:[
      { src:'run (-ing)', opts:['runing','running','runng','runnig'], correct:1 },
      { src:'make (-ing)', opts:['makeing','making','makng','makin'], correct:1 },
      { src:'swim (-ing)', opts:['swiming','swimming','swimng','swimmng'], correct:1 },
      { src:'study (-ing)', opts:['studing','studying','studyng','studiing'], correct:1 },
      { src:'write (-ing)', opts:['writeing','writing','writng','writin'], correct:1 },
      { src:'play (-ing)', opts:['playing','plaing','playng','plaiing'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Como se forma el presente continuo?', opts:['verbo + ing','to be + verbo-ing','will + verbo-ing','verbo + ed'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma -ing correcta.',
    sents:[
      { pre:'She is ', ans:'running', post:' fast.', bank:['run','running','runing','runs'] },
      { pre:'They are ', ans:'making', post:' a cake.', bank:['make','making','makeing','makes'] },
      { pre:'I am ', ans:'studying', post:' now.', bank:['study','studying','studing','studies'] },
      { pre:'He is ', ans:'swimming', post:'.', bank:['swim','swimming','swiming','swims'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el verbo en -ing.',
    words:[ {scrambled:['G','N','I','N','N','U','R'],ans:'RUNNING',hint:'-ing de run'},{scrambled:['I','M','A','K','N','G'],ans:'MAKING',hint:'-ing de make'},{scrambled:['G','N','I','T','I','R','W'],ans:'WRITING',hint:'-ing de write'},{scrambled:['G','N','I','Y','A','L','P'],ans:'PLAYING',hint:'-ing de play'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada -ing es correcto.',
    stmts:[
      { text:'El -ing de "run" es "running".', ans:true, expl:'Correcto. CVC duplica: running.' },
      { text:'El -ing de "make" es "makeing".', ans:false, expl:'Falso. Se quita la e: making.' },
      { text:'El -ing de "play" es "playing".', ans:true, expl:'Correcto. play -> playing.' },
      { text:'El -ing de "swim" es "swiming".', ans:false, expl:'Falso. Se duplica la m: swimming.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Escribe la forma -ing de cada verbo.',
    transforms:[
      { original:'run', task:'Forma -ing', opts:['running','runing','runng','runs'], correct:0 },
      { original:'make', task:'Forma -ing', opts:['making','makeing','makng','makes'], correct:0 },
      { original:'write', task:'Forma -ing', opts:['writing','writeing','writng','writes'], correct:0 },
      { original:'swim', task:'Forma -ing', opts:['swimming','swiming','swimng','swims'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo en presente continuo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What is she doing?', blank:false },
      { speaker:1, text:null, blank:true, opts:['She is running.','She is runing.','She running.','She is runs.'], correct:0 },
      { speaker:0, text:'And the kids?', blank:false },
      { speaker:1, text:null, blank:true, opts:['They are playing.','They are plaing.','They playing.','They are plays.'], correct:0 },
      { speaker:0, text:'Nice!', blank:false } ] }
]);

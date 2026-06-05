/* topic-data-211.js - Juego 211/350 | T31 1/7 PERFECT TIMING | Pasado Perfecto reconocimiento (ESPECIALIZADO) | Platino B2 */
_registerGames(211, 'Pasado Perfecto · Reconocimiento', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Cuando llegue, ella ya se habia ido', opts:['When I arrived, she has already left','When I arrived, she had already left','When I arrived, she already left','When I arrived, she was already left'], correct:1 },
      { src:'Ya habia comido', opts:['I have already eaten','I had already eaten','I already ate','I was already eaten'], correct:1 },
      { src:'El tren ya habia salido', opts:['The train has already left','The train had already left','The train already left','The train was already left'], correct:1 },
      { src:'Ella ya habia visto la pelicula', opts:['She has already seen the film','She had already seen the film','She already saw the film','She was already seen the film'], correct:1 },
      { src:'Habian terminado antes de las 5', opts:['They have finished before 5','They had finished before 5','They finished before 5 already','They were finished before 5'], correct:1 },
      { src:'Yo nunca habia estado alli', opts:['I have never been there','I had never been there','I never was there','I was never been there'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'El Pasado Perfecto se forma con...', opts:['have + participio','had + participio','was + participio','did + infinitivo'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'When I arrived, she had already ', ans:'left', post:'.', bank:['left','leave','leaving','leaves'] },
      { pre:'I ', ans:'had', post:' eaten before he came.', bank:['had','have','was','did'] },
      { pre:'The train had ', ans:'gone', post:' when we got there.', bank:['gone','go','went','going'] },
      { pre:'She had never ', ans:'seen', post:' snow before.', bank:['seen','see','saw','seeing'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['D','A','H'],ans:'HAD',hint:'auxiliar del pasado perfecto'},{scrambled:['N','E','E','B'],ans:'BEEN',hint:'participio de be'},{scrambled:['E','N','O','G'],ans:'GONE',hint:'participio de go'},{scrambled:['N','E','E','S'],ans:'SEEN',hint:'participio de see'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"When I arrived, she had already left." es correcto.', ans:true, expl:'Correcto. accion anterior con had.' },
      { text:'El Pasado Perfecto usa "have + participio".', ans:false, expl:'Falso. usa had + participio.' },
      { text:'"I had eaten before he came." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"The train has already left when we arrived." es correcto.', ans:false, expl:'Falso. had already left.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma el Pasado Perfecto del evento anterior.',
    transforms:[
      { original:'she / leave (antes de llegar yo)', task:'Pasado Perfecto', opts:['She had left.','She has left.','She leaves.','She was left.'], correct:0 },
      { original:'I / eat (antes)', task:'Pasado Perfecto', opts:['I had eaten.','I have eaten.','I ate.','I was eaten.'], correct:0 },
      { original:'they / finish (antes)', task:'Pasado Perfecto', opts:['They had finished.','They have finished.','They finished.','They were finished.'], correct:0 },
      { original:'he / go (antes)', task:'Pasado Perfecto', opts:['He had gone.','He has gone.','He went.','He was gone.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Why did you miss the train?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It had already left when I arrived.','It has already left when I arrived.','It already left when I arrived.','It was already left when I arrived.'], correct:0 },
      { speaker:0, text:'Were you hungry?', blank:false },
      { speaker:1, text:null, blank:true, opts:['No, I had already eaten.','No, I have already eaten.','No, I already eat.','No, I was already eaten.'], correct:0 },
      { speaker:0, text:'I see.', blank:false } ] }
]);

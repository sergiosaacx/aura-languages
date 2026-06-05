/* topic-data-217.js - Juego 217/350 | T31 7/7 PERFECT TIMING | errores Past Perfect (MEZCLADO) | Platino B2 */
_registerGames(217, 'Past Perfect · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Cuando llegue, ella ya se habia ido', opts:['When I arrived, she already left','When I arrived, she had already left','When I arrived, she has already left','When I arrived, she was already left'], correct:1 },
      { src:'El habia estado trabajando toda la noche', opts:['He had been work all night','He had been working all night','He had work all night','He has been working all night'], correct:1 },
      { src:'Para entonces, habian terminado', opts:['By then, they have finished','By then, they had finished','By then, they finished already','By then, they was finished'], correct:1 },
      { src:'Ella ya habia comido', opts:['She already had eaten before','She had already eaten','She has already eaten then','She was already eaten'], correct:1 },
      { src:'Habia estado lloviendo', opts:['It had been rain','It had been raining','It had raining','It has been raining'], correct:1 },
      { src:'El tren ya habia salido', opts:['The train have already left','The train had already left','The train already left','The train was already left'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['she already left (antes)','she had already left','she has already left','she was already left'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['she already left','she had already left'],['had been work','had been working'],['they have finished (by then)','they had finished'],['had been rain','had been raining'],['the train have left','the train had left'],['I have finished by then','I had finished'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['had','When','I','arrived','she','already','left'],ans:['When','I','arrived','she','had','already','left']},{words:['been','He','had','working','all','night'],ans:['He','had','been','working','all','night']},{words:['had','By','then','they','finished'],ans:['By','then','they','had','finished']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['When','I','arrived','she','already','left','.'], wi:5, correct:'had left', choices:['had left','left','leaves','was left'] },
      { words:['He','had','been','work','all','night','.'], wi:3, correct:'working', choices:['working','work','worked','works'] },
      { words:['By','then','they','have','finished','.'], wi:3, correct:'had', choices:['had','have','has','was'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['D','A','H'],ans:'HAD',hint:'corrige have (by then)'},{scrambled:['N','E','E','B'],ans:'BEEN',hint:'had ... working'},{scrambled:['G','N','I','K','R','O','W'],ans:'WORKING',hint:'had been ...'},{scrambled:['T','F','E','L'],ans:'LEFT',hint:'participio de leave'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"When I arrived, she had already left." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"He had been work all night." es correcto.', ans:false, expl:'Falso. had been working.' },
      { text:'"By then, they had finished." es correcto.', ans:true, expl:'Correcto. had, no have.' },
      { text:'"By then, they have finished." es correcto.', ans:false, expl:'Falso. had finished.' } ] }
]);

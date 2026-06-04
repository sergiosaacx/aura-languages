/* topic-data-046.js - Juego 46/350 | T7 4/7 COLOR YOUR WORDS | Posicion del adverbio (ESPECIALIZADO) | Bronce A1 */
_registerGames(46, 'Adverbios de Frecuencia · Posicion', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Donde va el adverbio de frecuencia con el verbo TO BE?', opts:['antes de to be','despues de to be','al final','al inicio'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion tiene el adverbio bien ubicado.',
    stmts:[
      { text:'El adverbio de frecuencia va ANTES del verbo principal.', ans:true, expl:'Correcto. Ej: She always works.' },
      { text:'"I always am tired." es correcto.', ans:false, expl:'Falso. Con to be va despues: I am always tired.' },
      { text:'"He is never late." es correcto.', ans:true, expl:'Correcto. Con to be, el adverbio va despues.' },
      { text:'El adverbio siempre va al final de la oracion.', ans:false, expl:'Falso. Va antes del verbo principal o despues de to be.' } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['always','She','works'],ans:['She','always','works']},{words:['is','He','never','late'],ans:['He','is','never','late']},{words:['sometimes','We','go','out'],ans:['We','sometimes','go','out']} ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el adverbio de frecuencia.',
    words:[ {scrambled:['Y','A','L','W','A','S'],ans:'ALWAYS',hint:'100%'},{scrambled:['V','E','R','E','N'],ans:'NEVER',hint:'0%'},{scrambled:['F','E','T','O','N'],ans:'OFTEN',hint:'60%'},{scrambled:['L','U','A','S','U','Y','L'],ans:'USUALLY',hint:'80%'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada oracion como correcta o incorrecta.',
    categories:['Correcta','Incorrecta'],
    items:[ {text:'She always works',correct:0},{text:'I always am tired',correct:1},{text:'He is never late',correct:0},{text:'They go always home',correct:1},{text:'We sometimes win',correct:0},{text:'She always is happy',correct:1} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Coloca el adverbio en la posicion correcta.',
    transforms:[
      { original:'I always am tired.', task:'Posicion correcta', opts:['I am always tired.','I always am tired.','Always I am tired.','I am tired always.'], correct:0 },
      { original:'She works always.', task:'Posicion correcta', opts:['She always works.','She works always.','Always works she.','She is always works.'], correct:0 },
      { original:'He late is never.', task:'Posicion correcta', opts:['He is never late.','He never is late.','He is late never.','Never he late is.'], correct:0 },
      { original:'They go usually by bus.', task:'Posicion correcta', opts:['They usually go by bus.','They go usually by bus.','Usually they go by bus do.','They are usually go by bus.'], correct:0 } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'She always works hard.', type:'select', opts:['She always works hard.','She works always hard.','She is always works hard.','Always she works hard.'], correct:0 },
      { tts:'He is never late.', type:'select', opts:['He is never late.','He never is late.','He is late never.','Never he is late.'], correct:0 },
      { tts:'We sometimes travel.', type:'select', opts:['We sometimes travel.','We travel sometimes do.','We are sometimes travel.','Sometimes we are travel.'], correct:0 } ] }
]);

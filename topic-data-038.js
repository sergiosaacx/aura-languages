/* topic-data-038.js - Juego 38/350 | T6 3/7 MINE & YOURS | pronombre->posesivo (ESPECIALIZADO) | Bronce A1 */
_registerGames(38, 'Adjetivos Posesivos · Pronombre a Posesivo', [
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige el adjetivo posesivo de cada pronombre.',
    items:[
      { src:'el posesivo de "I"',    opts:['me','my','mine','I'], correct:1 },
      { src:'el posesivo de "you"',  opts:['your','you','yours','my'], correct:0 },
      { src:'el posesivo de "he"',   opts:['him','his','her','he'], correct:1 },
      { src:'el posesivo de "she"',  opts:['his','her','hers','she'], correct:1 },
      { src:'el posesivo de "we"',   opts:['us','our','ours','we'], correct:1 },
      { src:'el posesivo de "they"', opts:['their','them','theirs','they'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Que posesivo corresponde a "they"?',
    opts:['our','their','your','its'], correct:1 },
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada pronombre con su adjetivo posesivo.',
    pairs:[ ['I','my'],['you','your'],['he','his'],['she','her'],['it','its'],['we','our'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma el adjetivo posesivo.',
    words:[ {scrambled:['Y','M'],ans:'MY',hint:'posesivo de I'},{scrambled:['S','I','H'],ans:'HIS',hint:'posesivo de he'},{scrambled:['R','U','O'],ans:'OUR',hint:'posesivo de we'},{scrambled:['I','E','R','T','H'],ans:'THEIR',hint:'posesivo de they'} ] },
  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada posesivo segun a cuantos se refiere.',
    categories:['Una persona','Varias personas'],
    items:[ {text:'my',correct:0},{text:'his',correct:0},{text:'her',correct:0},{text:'its',correct:0},{text:'our',correct:1},{text:'their',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'This is his pen.', type:'select', opts:['This is his pen.','This is her pen.','This is its pen.','This is your pen.'], correct:0 },
      { tts:'That is our dog.', type:'select', opts:['That is our dog.','That is their dog.','That is your dog.','That is my dog.'], correct:0 },
      { tts:'It is my idea.', type:'select', opts:['It is my idea.','It is your idea.','It is his idea.','It is her idea.'], correct:0 } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada correspondencia es correcta.',
    stmts:[
      { text:'"he" se corresponde con "his".', ans:true, expl:'Correcto. he -> his.' },
      { text:'"they" se corresponde con "our".', ans:false, expl:'Falso. they -> their. our es de we.' },
      { text:'"she" se corresponde con "her".', ans:true, expl:'Correcto. she -> her.' },
      { text:'"I" se corresponde con "your".', ans:false, expl:'Falso. I -> my. your es de you.' } ] }
]);

/* topic-data-295.js - Juego 295/350 | T43 1/7 STYLE & REGISTER | dispositivos retoricos reconocimiento (ESPECIALIZADO) | Diamante C1 */
_registerGames(295, 'Dispositivos Retoricos · Reconocimiento', [
  { id:'translate', label:'Nombre', xp:25, instr:'Elige el nombre correcto en ingles.',
    items:[
      { src:'aliteracion', opts:['alliteration','assonance','metaphor','simile'], correct:0 },
      { src:'metafora', opts:['simile','metaphor','hyperbole','irony'], correct:1 },
      { src:'simil', opts:['metaphor','simile','oxymoron','irony'], correct:1 },
      { src:'personificacion', opts:['personification','hyperbole','metaphor','simile'], correct:0 },
      { src:'hiperbole', opts:['hyperbole','litotes','metaphor','irony'], correct:0 },
      { src:'oximoron', opts:['oxymoron','paradox','simile','metaphor'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"As brave as a lion" es un ejemplo de...', opts:['metaphor','simile','hyperbole','oxymoron'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada figura con su definicion.',
    pairs:[ ['alliteration','repeticion de sonidos iniciales'],['metaphor','comparacion implicita'],['simile','comparacion con as/like'],['personification','dar cualidades humanas'],['hyperbole','exageracion'],['oxymoron','dos terminos opuestos'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la figura retorica correcta.',
    sents:[
      { pre:'"Time is money" is a ', ans:'metaphor', post:'.', bank:['metaphor','simile','hyperbole','oxymoron'] },
      { pre:'"As cold as ice" is a ', ans:'simile', post:'.', bank:['simile','metaphor','irony','litotes'] },
      { pre:'"Deafening silence" is an ', ans:'oxymoron', post:'.', bank:['oxymoron','hyperbole','simile','metaphor'] },
      { pre:'"The wind whispered" is ', ans:'personification', post:'.', bank:['personification','hyperbole','simile','irony'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el nombre de la figura.',
    words:[ {scrambled:['R','O','H','P','A','T','E','M'],ans:'METAPHOR',hint:'comparacion implicita'},{scrambled:['E','L','I','M','I','S'],ans:'SIMILE',hint:'con as/like'},{scrambled:['E','L','O','B','R','E','P','Y','H'],ans:'HYPERBOLE',hint:'exageracion'},{scrambled:['N','O','R','O','M','Y','X','O'],ans:'OXYMORON',hint:'terminos opuestos'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'Un simil usa "as" o "like".', ans:true, expl:'Correcto.' },
      { text:'Una metafora usa "like" o "as".', ans:false, expl:'Falso. es una comparacion implicita, sin like/as.' },
      { text:'La personificacion da cualidades humanas a algo no humano.', ans:true, expl:'Correcto.' },
      { text:'Un oximoron es una exageracion.', ans:false, expl:'Falso. combina dos terminos opuestos.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada ejemplo por su figura.',
    categories:['Simile','Metaphor','Personification'],
    items:[ {text:'as brave as a lion',correct:0},{text:'time is money',correct:1},{text:'the wind whispered',correct:2},{text:'as white as snow',correct:0},{text:'life is a journey',correct:1},{text:'the sun smiled',correct:2} ] }
]);

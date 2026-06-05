/* topic-data-299.js - Juego 299/350 | T43 5/7 STYLE & REGISTER | figuras en oraciones literarias (MEZCLADO) | Diamante C1 */
_registerGames(299, 'Figuras Estilisticas · En Oraciones Literarias', [
  { id:'translate', label:'Identifica', xp:25, instr:'Elige la figura de cada oracion.',
    items:[
      { src:'"Time is money, so do not waste it"', opts:['metaphor','simile','irony','litotes'], correct:0 },
      { src:'"Life is but a walking shadow"', opts:['metaphor','simile','hyperbole','irony'], correct:0 },
      { src:'"As busy as a bee"', opts:['metaphor','simile','oxymoron','irony'], correct:1 },
      { src:'"The stars danced in the sky"', opts:['personification','simile','litotes','irony'], correct:0 },
      { src:'"I have told you a million times"', opts:['hyperbole','simile','metaphor','litotes'], correct:0 },
      { src:'"A deafening silence filled the room"', opts:['oxymoron','simile','metaphor','irony'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Life is but a walking shadow" es...', opts:['metaphor','simile','irony','litotes'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra que completa la figura.',
    sents:[
      { pre:'As busy as a ', ans:'bee', post:'. (simile)', bank:['bee','dog','lion','fish'] },
      { pre:'The stars ', ans:'danced', post:' in the sky. (personification)', bank:['danced','fell','shone','were'] },
      { pre:'I told you a ', ans:'million', post:' times. (hyperbole)', bank:['million','few','couple','dozen'] },
      { pre:'A ', ans:'deafening', post:' silence. (oxymoron)', bank:['deafening','soft','quiet','gentle'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada oracion con su figura.',
    pairs:[ ['Time is money','metaphor'],['As busy as a bee','simile'],['The stars danced','personification'],['A million times','hyperbole'],['Deafening silence','oxymoron'],['Lovely weather (storm)','irony'] ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada ejemplo.',
    categories:['Metaphor','Simile','Hyperbole'],
    items:[ {text:'time is money',correct:0},{text:'as cold as ice',correct:1},{text:'a million times',correct:2},{text:'life is a journey',correct:0},{text:'as brave as a lion',correct:1},{text:'I could eat a horse',correct:2} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['money','Time','is'],ans:['Time','is','money']},{words:['danced','The','stars'],ans:['The','stars','danced']},{words:['bee','as','busy','as','a'],ans:['as','busy','as','a','bee']} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la identificacion es correcta.',
    stmts:[
      { text:'"As busy as a bee" es un simil.', ans:true, expl:'Correcto. usa as...as.' },
      { text:'"The stars danced" es una hiperbole.', ans:false, expl:'Falso. es personificacion.' },
      { text:'"I told you a million times" es hiperbole.', ans:true, expl:'Correcto. exageracion.' },
      { text:'"Deafening silence" es un simil.', ans:false, expl:'Falso. es un oximoron.' } ] }
]);

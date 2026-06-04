/* topic-data-084.js - Juego 84/350 | T12 7/7 PAST STORIES | errores tipicos negativo e interrogativo (MEZCLADO) | Plata A2 */
_registerGames(84, 'Pasado Negativo e Interrogativo · Errores', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Ella no fue al trabajo', opts:["She didn't went to work","She didn't go to work","She don't go to work","She not went to work"], correct:1 },
      { src:'Desayuno el?', opts:['Did he ate breakfast?','Did he eat breakfast?','Does he eat breakfast?','Did he eaten breakfast?'], correct:1 },
      { src:'Era el tu profesor?', opts:['Were he your teacher?','Was he your teacher?','Did he your teacher?','Is he your teacher?'], correct:1 },
      { src:'No vimos la pelicula', opts:["We didn't saw the film","We didn't see the film","We don't see the film","We not saw the film"], correct:1 },
      { src:'Jugaron ellos?', opts:['Did they played?','Did they play?','Do they play?','Did they playing?'], correct:1 },
      { src:'Ella no estaba en casa', opts:["She weren't at home","She wasn't at home","She isn't at home","She not was at home"], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:["She didn't went","She didn't go","She don't go","She not go"], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ["didn't went","didn't go"],['Did he ate?','Did he eat?'],['Were he?','Was he?'],["didn't saw","didn't see"],['Did they played?','Did they play?'],["she weren't","she wasn't"] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:["didn't",'She','go','to','work'],ans:['She',"didn't",'go','to','work']},{words:['Did','eat','he','breakfast'],ans:['Did','he','eat','breakfast']},{words:['Was','your','he','teacher'],ans:['Was','he','your','teacher']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She',"didn't",'went','to','work','.'], wi:2, correct:'go', choices:['go','went','gone','goes'] },
      { words:['Did','he','ate','breakfast','?'], wi:2, correct:'eat', choices:['eat','ate','eaten','eats'] },
      { words:['Were','he','your','teacher','?'], wi:0, correct:'Was', choices:['Was','Were','Did','Is'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['O','G'],ans:'GO',hint:"didn't ..."},{scrambled:['T','A','E'],ans:'EAT',hint:'Did he ...?'},{scrambled:['S','A','W'],ans:'WAS',hint:'... he your teacher?'},{scrambled:['E','E','S'],ans:'SEE',hint:"didn't ..."} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'Despues de "didn\'t" va el infinitivo: "didn\'t go".', ans:true, expl:"Correcto. didn't + infinitivo." },
      { text:'"Did he ate?" es correcto.', ans:false, expl:'Falso. Did he eat?' },
      { text:'Con "he" en pregunta de pasado se usa "Was".', ans:true, expl:'Correcto. Was he?' },
      { text:'"She didn\'t went." es correcto.', ans:false, expl:"Falso. She didn't go." } ] }
]);

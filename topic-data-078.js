/* topic-data-078.js - Juego 78/350 | T12 1/7 PAST STORIES | was/were (ESPECIALIZADO) | Plata A2 */
_registerGames(78, 'Was / Were · Pasado de To Be', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta del pasado de to be.',
    items:[
      { src:'Yo estaba', opts:['I were','I was','I am','I been'], correct:1 },
      { src:'Ellos estaban', opts:['They was','They were','They are','They been'], correct:1 },
      { src:'Ella estaba', opts:['She were','She was','She is','She been'], correct:1 },
      { src:'Nosotros estabamos', opts:['We was','We were','We are','We been'], correct:1 },
      { src:'El no estaba', opts:["He weren't","He wasn't","He isn't","He not was"], correct:1 },
      { src:'Ellos no estaban', opts:["They wasn't","They weren't","They aren't","They not were"], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que forma usas con "they" en pasado?', opts:['was','were','is','are'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca was o were.',
    sents:[
      { pre:'I ', ans:'was', post:' at home.', bank:['was','were','am','been'] },
      { pre:'They ', ans:'were', post:' happy.', bank:['was','were','are','been'] },
      { pre:'She ', ans:'was', post:' tired.', bank:['was','were','is','been'] },
      { pre:'We ', ans:'were', post:' late.', bank:['was','were','are','been'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra (sin apostrofo).',
    words:[ {scrambled:['S','A','W'],ans:'WAS',hint:'pasado de is/am'},{scrambled:['R','E','E','W'],ans:'WERE',hint:'pasado de are'},{scrambled:['N','T','A','S','W'],ans:'WASNT',hint:'was + not'},{scrambled:['E','R','E','W','N','T'],ans:'WERENT',hint:'were + not'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada regla es correcta.',
    stmts:[
      { text:'Con "I" en pasado se usa "was".', ans:true, expl:'Correcto. I was.' },
      { text:'Con "they" en pasado se usa "was".', ans:false, expl:'Falso. they were.' },
      { text:'Con "you" en pasado se usa "were".', ans:true, expl:'Correcto. you were.' },
      { text:'Con "she" en pasado se usa "were".', ans:false, expl:'Falso. she was.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Pon cada oracion en pasado.',
    transforms:[
      { original:'I am here.', task:'Pasado', opts:['I was here.','I were here.','I been here.','I is here.'], correct:0 },
      { original:'They are happy.', task:'Pasado', opts:['They were happy.','They was happy.','They been happy.','They are happy.'], correct:0 },
      { original:'She is tired.', task:'Pasado', opts:['She was tired.','She were tired.','She been tired.','She is tired.'], correct:0 },
      { original:'We are friends.', task:'Pasado', opts:['We were friends.','We was friends.','We been friends.','We are friends.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con was/were.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Where were you yesterday?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I was at home.','I were at home.','I been at home.','I is at home.'], correct:0 },
      { speaker:0, text:'Were your friends there?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, they were there.','Yes, they was there.','Yes, they been there.','Yes, they are there.'], correct:0 },
      { speaker:0, text:'Nice.', blank:false } ] }
]);

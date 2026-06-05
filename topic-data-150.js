/* topic-data-150.js - Juego 150/350 | T22 3/7 USED TO | Pasado Continuo was/were + -ing (ESPECIALIZADO) | Oro B1 */
_registerGames(150, 'Pasado Continuo · Was/Were + -ing', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta del pasado continuo.',
    items:[
      { src:'Yo estaba cocinando', opts:['I was cooking','I were cooking','I am cooking','I was cook'], correct:0 },
      { src:'Ellos estaban jugando', opts:['They was playing','They were playing','They are playing','They were play'], correct:1 },
      { src:'Ella estaba durmiendo', opts:['She were sleeping','She was sleeping','She is sleeping','She was sleep'], correct:1 },
      { src:'Nosotros estabamos estudiando', opts:['We was studying','We were studying','We are studying','We were study'], correct:1 },
      { src:'El estaba leyendo', opts:['He were reading','He was reading','He is reading','He was read'], correct:1 },
      { src:'Tu estabas trabajando', opts:['You was working','You were working','You are working','You were work'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que forma usas con "they" en pasado continuo?', opts:['was','were','is','are'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada pronombre con su forma de pasado continuo.',
    pairs:[ ['I','I was'],['He','He was'],['She','She was'],['It','It was'],['We','We were'],['They','They were'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca was o were.',
    sents:[
      { pre:'I ', ans:'was', post:' cooking.', bank:['was','were','am','is'] },
      { pre:'They ', ans:'were', post:' playing.', bank:['was','were','are','is'] },
      { pre:'She ', ans:'was', post:' sleeping.', bank:['was','were','is','are'] },
      { pre:'We ', ans:'were', post:' studying.', bank:['was','were','are','is'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['S','A','W'],ans:'WAS',hint:'I/he/she/it ...'},{scrambled:['R','E','E','W'],ans:'WERE',hint:'you/we/they ...'},{scrambled:['G','N','I','K','O','O','C'],ans:'COOKING',hint:'-ing de cook'},{scrambled:['G','N','I','P','E','E','L','S'],ans:'SLEEPING',hint:'-ing de sleep'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'Con "they" se usa "were" en pasado continuo.', ans:true, expl:'Correcto. They were playing.' },
      { text:'Con "she" se usa "were".', ans:false, expl:'Falso. She was.' },
      { text:'Con "I" se usa "was".', ans:true, expl:'Correcto. I was.' },
      { text:'Con "we" se usa "was".', ans:false, expl:'Falso. We were.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada pronombre segun was o were.',
    categories:['was','were'],
    items:[ {text:'I',correct:0},{text:'he',correct:0},{text:'she',correct:0},{text:'you',correct:1},{text:'we',correct:1},{text:'they',correct:1} ] }
]);

/* topic-data-066.js - Juego 66/350 | T10 3/7 ASK AWAY | How much/many/old usos (ESPECIALIZADO) | Bronce A1 */
_registerGames(66, 'How Much / Many / Old · Usos', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que usas con sustantivos contables (books)?', opts:['How much','How many','How old','How long'], correct:1 },
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la pregunta correcta.',
    items:[
      { src:'Cuantos libros?', opts:['How much books?','How many books?','How old books?','How long books?'], correct:1 },
      { src:'Cuanta agua?', opts:['How many water?','How much water?','How old water?','How long water?'], correct:1 },
      { src:'Cuantos anos tienes?', opts:['How much are you?','How many are you?','How old are you?','How long are you?'], correct:2 },
      { src:'Cuanto dinero?', opts:['How many money?','How much money?','How old money?','How long money?'], correct:1 },
      { src:'Cuantos amigos?', opts:['How much friends?','How many friends?','How old friends?','How long friends?'], correct:1 },
      { src:'Cuanta leche?', opts:['How many milk?','How much milk?','How old milk?','How long milk?'], correct:1 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca How much, How many o How old.',
    sents:[
      { pre:'', ans:'How many', post:' apples do you want?', bank:['How much','How many','How old','How long'] },
      { pre:'', ans:'How much', post:' water is there?', bank:['How much','How many','How old','How long'] },
      { pre:'', ans:'How old', post:' is your brother?', bank:['How much','How many','How old','How long'] },
      { pre:'', ans:'How many', post:' books do you have?', bank:['How much','How many','How old','How long'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada palabra segun la pregunta correcta.',
    categories:['How many','How much'],
    items:[ {text:'books',correct:0},{text:'water',correct:1},{text:'friends',correct:0},{text:'money',correct:1},{text:'apples',correct:0},{text:'milk',correct:1} ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['N','Y','A','M'],ans:'MANY',hint:'How ... books? (contable)'},{scrambled:['H','C','U','M'],ans:'MUCH',hint:'How ... water? (incontable)'},{scrambled:['D','L','O'],ans:'OLD',hint:'How ... are you?'},{scrambled:['O','W','H'],ans:'HOW',hint:'... many / much / old'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada pregunta es correcta.',
    stmts:[
      { text:'"How many books?" es correcto.', ans:true, expl:'Correcto. many con contables.' },
      { text:'"How many water?" es correcto.', ans:false, expl:'Falso. water es incontable: How much water?' },
      { text:'"How old are you?" es correcto.', ans:true, expl:'Correcto. How old para la edad.' },
      { text:'"How much books?" es correcto.', ans:false, expl:'Falso. books es contable: How many books?' } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la pregunta que oyes.',
    items:[
      { tts:'How many books do you have?', type:'select', opts:['How many books do you have?','How much books do you have?','How old books do you have?','How long books do you have?'], correct:0 },
      { tts:'How much water is there?', type:'select', opts:['How much water is there?','How many water is there?','How old water is there?','How long water is there?'], correct:0 },
      { tts:'How old are you?', type:'select', opts:['How old are you?','How much are you?','How many are you?','How long are you?'], correct:0 } ] }
]);

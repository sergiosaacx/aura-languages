/* topic-data-100.js - Juego 100/350 | T15 2/7 HOW MUCH? | much vs many (ESPECIALIZADO) | Plata A2 */
_registerGames(100, 'Much vs Many', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'How ___ water? (incontable)', opts:['many','much','a lot','few'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada frase con su cuantificador correcto.',
    pairs:[ ['___ water','much water'],['___ books','many books'],['___ money','much money'],['___ friends','many friends'],['___ time','much time'],['___ apples','many apples'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['much','How','water'],ans:['How','much','water']},{words:['many','How','books'],ans:['How','many','books']},{words:['much','have',"don't",'I','money'],ans:['I',"don't",'have','much','money']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el cuantificador incorrecto y elige la correccion.',
    sents:[
      { words:['How','many','water','?'], wi:1, correct:'much', choices:['much','many','few','little'] },
      { words:['How','much','books','?'], wi:1, correct:'many', choices:['many','much','few','little'] },
      { words:['I',"don't",'have','many','money','.'], wi:3, correct:'much', choices:['much','many','few','little'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada sustantivo segun much o many.',
    categories:['much (incontable)','many (contable)'],
    items:[ {text:'water',correct:0},{text:'books',correct:1},{text:'money',correct:0},{text:'friends',correct:1},{text:'time',correct:0},{text:'cars',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la pregunta que oyes.',
    items:[
      { tts:'How much water do you drink?', type:'select', opts:['How much water do you drink?','How many water do you drink?','How much waters do you drink?','How many waters do you drink?'], correct:0 },
      { tts:'How many books do you have?', type:'select', opts:['How many books do you have?','How much books do you have?','How many book do you have?','How much book do you have?'], correct:0 },
      { tts:"I don't have much money.", type:'select', opts:["I don't have much money.","I don't have many money.","I don't have much moneys.","I don't have many moneys."], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca much o many.',
    sents:[
      { pre:'How ', ans:'much', post:' water do you drink?', bank:['much','many','few','little'] },
      { pre:'How ', ans:'many', post:' books do you have?', bank:['much','many','few','little'] },
      { pre:"I don't have ", ans:'much', post:' time.', bank:['much','many','few','little'] },
      { pre:'There are ', ans:'many', post:' people.', bank:['much','many','few','little'] } ] }
]);

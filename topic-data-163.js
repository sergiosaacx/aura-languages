/* topic-data-163.js - Juego 163/350 | T24 2/7 IF I HAD | Wish + pasado simple (ESPECIALIZADO) | Oro B1 */
_registerGames(163, 'Wish + Pasado Simple', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Como se forma un deseo sobre el presente?', opts:['wish + present','wish + past simple','wish + will','hope + past'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada deseo con su significado.',
    pairs:[ ['I wish I had a car','no tengo coche'],['I wish I were taller','no soy alto'],['I wish I knew French','no se frances'],['I wish I had more time','no tengo tiempo'],['I wish I lived by the sea','no vivo cerca del mar'],['I wish I could fly','no puedo volar'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['wish','I','I','had','a','car'],ans:['I','wish','I','had','a','car']},{words:['wish','I','were','I','taller'],ans:['I','wish','I','were','taller']},{words:['wish','I','knew','I','French'],ans:['I','wish','I','knew','French']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['I','wish','I','have','a','car','.'], wi:3, correct:'had', choices:['had','have','will have','would have'] },
      { words:['I','wish','I','am','taller','.'], wi:3, correct:'were', choices:['were','am','will be','would be'] },
      { words:['I','wish','I','know','French','.'], wi:3, correct:'knew', choices:['knew','know','will know','would know'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada deseo como correcto o incorrecto.',
    categories:['Correcta','Incorrecta'],
    items:[ {text:'I wish I had a car',correct:0},{text:'I wish I have a car',correct:1},{text:'I wish I were rich',correct:0},{text:'I wish I am rich',correct:1},{text:'I wish I knew it',correct:0},{text:'I wish I will know it',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I wish I had a car.', type:'select', opts:['I wish I had a car.','I wish I have a car.','I wish I will have a car.','I wish I would have a car.'], correct:0 },
      { tts:'I wish I were taller.', type:'select', opts:['I wish I were taller.','I wish I am taller.','I wish I will be taller.','I wish I would be taller.'], correct:0 },
      { tts:'I wish I knew French.', type:'select', opts:['I wish I knew French.','I wish I know French.','I wish I will know French.','I wish I would know French.'], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta (wish + pasado).',
    sents:[
      { pre:'I wish I ', ans:'had', post:' more money.', bank:['had','have','will have','would have'] },
      { pre:'I wish I ', ans:'were', post:' on holiday.', bank:['were','am','will be','would be'] },
      { pre:'I wish I ', ans:'knew', post:' the answer.', bank:['knew','know','will know','would know'] },
      { pre:'I wish I ', ans:'lived', post:' near the sea.', bank:['lived','live','will live','would live'] } ] }
]);

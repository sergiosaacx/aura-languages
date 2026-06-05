/* topic-data-121.js - Juego 121/350 | T18 2/7 CAN YOU? | must vs have to (ESPECIALIZADO) | Plata A2 */
_registerGames(121, 'Must vs Have To', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['I must to go','I must go','I have go','I must going'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada forma con su significado.',
    pairs:[ ['must','obligacion personal'],['have to','obligacion externa/regla'],["mustn't",'prohibicion'],["don't have to",'no es necesario'],['must finish','obligacion fuerte'],['have to wear','regla'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['must','I','finish','this'],ans:['I','must','finish','this']},{words:['to','have','We','work'],ans:['We','have','to','work']},{words:['must','You','study'],ans:['You','must','study']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['I','have','go','now','.'], wi:1, correct:'must', choices:['must','have','can','should'] },
      { words:['She','musts','study','.'], wi:1, correct:'must', choices:['must','musts','musting','musted'] },
      { words:['We','have','must','work','.'], wi:2, correct:'to', choices:['to','must','can','should'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada situacion segun must o have to.',
    categories:['must (personal)','have to (regla)'],
    items:[ {text:'I feel I must help',correct:0},{text:'Students have to wear uniform',correct:1},{text:'I must call mom',correct:0},{text:'You have to pay tax',correct:1},{text:'I must sleep',correct:0},{text:'We have to follow rules',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I must finish this today.', type:'select', opts:['I must finish this today.','I must to finish this today.','I musts finish this today.','I have finish this today.'], correct:0 },
      { tts:'We have to work tomorrow.', type:'select', opts:['We have to work tomorrow.','We have work tomorrow.','We must to work tomorrow.','We haves to work tomorrow.'], correct:0 },
      { tts:'You must study hard.', type:'select', opts:['You must study hard.','You must to study hard.','You musts study hard.','You have study hard.'], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca must o have to.',
    sents:[
      { pre:'I ', ans:'must', post:' call my mother.', bank:['must','must to','have','musts'] },
      { pre:'Students ', ans:'have to', post:' wear a uniform.', bank:['have to','must to','have','musts'] },
      { pre:'You ', ans:'must', post:' be careful.', bank:['must','must to','have','musts'] },
      { pre:'We ', ans:'have to', post:' pay taxes.', bank:['have to','must to','have','musts'] } ] }
]);

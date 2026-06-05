/* topic-data-149.js - Juego 149/350 | T22 2/7 USED TO | used to vs would (ESPECIALIZADO) | Oro B1 */
_registerGames(149, 'Used To vs Would', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Para un estado pasado (vivir, ser), que NO se usa?', opts:['used to','would','was/were','had'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada oracion con su tipo.',
    pairs:[ ['We used to live near the beach','estado: vivir'],['He would walk to school','habito: caminar'],['She used to have a car','estado: tener'],['They would play every day','habito: jugar'],['I used to be shy','estado: ser'],['We would visit grandma','habito: visitar'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['used','We','to','live','here'],ans:['We','used','to','live','here']},{words:['would','He','walk','to','school'],ans:['He','would','walk','to','school']},{words:['used','She','to','be','shy'],ans:['She','used','to','be','shy']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['We','would','live','here','.'], wi:1, correct:'used to', choices:['used to','would','use to','are used to'] },
      { words:['She','would','be','shy','.'], wi:1, correct:'used to', choices:['used to','would','use to','are used to'] },
      { words:['He','use','to','walk','.'], wi:1, correct:'used', choices:['used','use','uses','using'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada verbo segun used to o ambos.',
    categories:['Solo used to (estado)','used to o would (habito)'],
    items:[ {text:'live',correct:0},{text:'walk',correct:1},{text:'be',correct:0},{text:'play',correct:1},{text:'have',correct:0},{text:'visit',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'We used to live near the beach.', type:'select', opts:['We used to live near the beach.','We would live near the beach.','We use to live near the beach.','We are used to live near the beach.'], correct:0 },
      { tts:'He would walk to school every day.', type:'select', opts:['He would walk to school every day.','He would walked to school every day.','He would walking to school every day.','He would walks to school every day.'], correct:0 },
      { tts:'She used to be very shy.', type:'select', opts:['She used to be very shy.','She would be very shy.','She use to be very shy.','She is used to be very shy.'], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca used to o would.',
    sents:[
      { pre:'We ', ans:'used to', post:' live by the sea. (estado)', bank:['used to','would','use to','are used to'] },
      { pre:'He ', ans:'would', post:' walk to school. (habito)', bank:['would','used','use','was'] },
      { pre:'She used to ', ans:'be', post:' shy.', bank:['be','being','was','is'] },
      { pre:'They ', ans:'used to', post:' have a big house. (estado)', bank:['used to','would','use to','are used to'] } ] }
]);

/* topic-data-177.js - Juego 177/350 | T26 2/7 REPORTED SPEECH | say vs tell (ESPECIALIZADO) | Oro B1 */
_registerGames(177, 'Say vs Tell', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que verbo necesita objeto de persona (me, him)?', opts:['say','tell','both','neither'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada oracion con say o told.',
    pairs:[ ['She ___ that she was happy','said'],['He ___ me the truth','told'],['They ___ goodbye','said hi'],['Can you ___ me the time?','tell'],['She ___ hello','said hello'],['He ___ us a story','told us'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca say o tell segun corresponda.',
    sents:[
      { pre:'She ', ans:'said', post:' that she was happy.', bank:['said','told','say','tell'] },
      { pre:'He ', ans:'told', post:' me the truth.', bank:['told','said','tell','say'] },
      { pre:'They ', ans:'said', post:' goodbye.', bank:['said','told','say','tell'] },
      { pre:'Can you ', ans:'tell', post:' me the time?', bank:['tell','say','told','said'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['me','He','told','the','truth'],ans:['He','told','me','the','truth']},{words:['that','She','said','she','was','happy'],ans:['She','said','that','she','was','happy']},{words:['us','He','told','a','story'],ans:['He','told','us','a','story']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el verbo incorrecto y elige la correccion.',
    sents:[
      { words:['She','said','me','the','truth','.'], wi:1, correct:'told', choices:['told','said','say','tell'] },
      { words:['He','told','that','he','was','tired','.'], wi:1, correct:'said', choices:['said','told','say','tell'] },
      { words:['Can','you','say','me','the','time','?'], wi:2, correct:'tell', choices:['tell','say','told','said'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion segun use say o tell.',
    categories:['say (sin objeto persona)','tell (con objeto persona)'],
    items:[ {text:'say hello',correct:0},{text:'tell me',correct:1},{text:'say that...',correct:0},{text:'tell him a story',correct:1},{text:'say goodbye',correct:0},{text:'tell us the news',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'He told me the truth.', type:'select', opts:['He told me the truth.','He said me the truth.','He tell me the truth.','He told that the truth.'], correct:0 },
      { tts:'She said that she was happy.', type:'select', opts:['She said that she was happy.','She told that she was happy.','She said me that she was happy.','She say that she was happy.'], correct:0 },
      { tts:'Can you tell me the time?', type:'select', opts:['Can you tell me the time?','Can you say me the time?','Can you told me the time?','Can you tell the time me?'], correct:0 } ] }
]);

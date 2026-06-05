/* topic-data-135.js - Juego 135/350 | T20 2/7 TELL ME MORE | Conectores (ESPECIALIZADO) | Plata A2 */
_registerGames(135, 'Conectores · And/But/Because/So/Although', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Estaba cansada ___ se fue a dormir temprano.', opts:['but','so','because','although'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada conector con su significado.',
    pairs:[ ['and','y (adicion)'],['but','pero (contraste)'],['because','porque (causa)'],['so','entonces (resultado)'],['although','aunque (concesion)'],['or','o (alternativa)'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['because','I','stayed','home','it','rained'],ans:['I','stayed','home','because','it','rained']},{words:['so','tired','was','She','she','slept'],ans:['She','was','tired','so','she','slept']},{words:['but','like','I','coffee','not','tea'],ans:['I','like','coffee','but','not','tea']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el conector incorrecto y elige la correccion.',
    sents:[
      { words:['I','like','coffee','because','not','tea','.'], wi:3, correct:'but', choices:['but','because','so','and'] },
      { words:['She','was','tired','but','she','slept','.'], wi:3, correct:'so', choices:['so','but','because','and'] },
      { words:['I','stayed','home','so','it','rained','.'], wi:3, correct:'because', choices:['because','so','but','and'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada conector segun su funcion.',
    categories:['Adicion','Causa/Resultado','Contraste'],
    items:[ {text:'and',correct:0},{text:'or',correct:0},{text:'because',correct:1},{text:'so',correct:1},{text:'but',correct:2},{text:'although',correct:2} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I stayed home because it rained.', type:'select', opts:['I stayed home because it rained.','I stayed home so it rained.','I stayed home but it rained.','I stayed home although it rained.'], correct:0 },
      { tts:'She was tired so she went to bed.', type:'select', opts:['She was tired so she went to bed.','She was tired because she went to bed.','She was tired but she went to bed.','She was tired and she went to bed.'], correct:0 },
      { tts:'I like coffee but not tea.', type:'select', opts:['I like coffee but not tea.','I like coffee so not tea.','I like coffee because not tea.','I like coffee although not tea.'], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el conector correcto.',
    sents:[
      { pre:'She was tired ', ans:'so', post:' she went to bed.', bank:['so','but','because','although'] },
      { pre:'I like coffee ', ans:'but', post:' not tea.', bank:['so','but','because','although'] },
      { pre:'I stayed home ', ans:'because', post:' it rained.', bank:['so','but','because','although'] },
      { pre:'', ans:'Although', post:' it was cold, we went out.', bank:['Although','So','Because','And'] } ] }
]);

/* topic-data-156.js - Juego 156/350 | T23 2/7 WILL & MIGHT | may vs might (ESPECIALIZADO) | Oro B1 */
_registerGames(156, 'May vs Might', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que expresa MENOS probabilidad?', opts:['will','may','might','going to'], correct:2 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada oracion con su significado.',
    pairs:[ ['It may rain','50% posible'],['It might rain','menos probable'],['She will come','seguro'],["She won't come",'seguro que no'],['I may be late','quiza llegue tarde'],['I might go','quiza vaya (poco probable)'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['might','She','come','to','the','party'],ans:['She','might','come','to','the','party']},{words:['may','It','rain','today'],ans:['It','may','rain','today']},{words:['might','I','not','go'],ans:['I','might','not','go']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She','mights','come','.'], wi:1, correct:'might', choices:['might','mights','might to','mighting'] },
      { words:['It','mays','rain','.'], wi:1, correct:'may', choices:['may','mays','may to','maying'] },
      { words:['I','might','going','.'], wi:2, correct:'go', choices:['go','going','goes','went'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada oracion segun la certeza.',
    categories:['Seguro (will)','Posible (may/might)'],
    items:[ {text:'will rain',correct:0},{text:'may rain',correct:1},{text:"won't come",correct:0},{text:'might come',correct:1},{text:'will be',correct:0},{text:'may be',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'It might rain this afternoon.', type:'select', opts:['It might rain this afternoon.','It might to rain this afternoon.','It mights rain this afternoon.','It might raining this afternoon.'], correct:0 },
      { tts:'She may come to the party.', type:'select', opts:['She may come to the party.','She may to come to the party.','She mays come to the party.','She may coming to the party.'], correct:0 },
      { tts:'I might not go.', type:'select', opts:['I might not go.','I might not to go.','I mights not go.','I might not going.'], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca may o might.',
    sents:[
      { pre:'It ', ans:'might', post:' rain, the sky is dark.', bank:['might','will','would','should'] },
      { pre:'She ', ans:'may', post:' come, but she is not sure.', bank:['may','will','would','must'] },
      { pre:'I might ', ans:'go', post:' to the beach.', bank:['go','going','goes','to go'] },
      { pre:'They ', ans:'may', post:' be late.', bank:['may','will','would','must'] } ] }
]);

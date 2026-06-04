/* topic-data-072.js - Juego 72/350 | T11 2/7 WHAT HAPPENED? | Verbos regulares -ed (ESPECIALIZADO) | Plata A2 */
_registerGames(72, 'Pasado Regular · -ed', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es el pasado de "stop"?', opts:['stoped','stopped','stopd','stopt'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada verbo con su pasado regular.',
    pairs:[ ['walk','walked'],['stop','stopped'],['study','studied'],['play','played'],['watch','watched'],['cry','cried'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['walked','I','to','school'],ans:['I','walked','to','school']},{words:['played','They','football'],ans:['They','played','football']},{words:['studied','She','English'],ans:['She','studied','English']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el pasado mal formado y elige la correccion.',
    sents:[
      { words:['He','stoped','the','car','.'], wi:1, correct:'stopped', choices:['stopped','stoped','stopd','stoppd'] },
      { words:['She','studyed','hard','.'], wi:1, correct:'studied', choices:['studied','studyed','studed','studeed'] },
      { words:['They','playd','tennis','.'], wi:1, correct:'played', choices:['played','playd','plaied','plaid'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada pasado segun su regla de formacion.',
    categories:['Solo -ed','Doble consonante','y a ied'],
    items:[ {text:'walked',correct:0},{text:'stopped',correct:1},{text:'studied',correct:2},{text:'played',correct:0},{text:'planned',correct:1},{text:'cried',correct:2} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I walked to school.', type:'select', opts:['I walked to school.','I walk to school.','I walking to school.','I walket to school.'], correct:0 },
      { tts:'She studied English.', type:'select', opts:['She studied English.','She studyed English.','She study English.','She studed English.'], correct:0 },
      { tts:'They stopped the car.', type:'select', opts:['They stopped the car.','They stoped the car.','They stop the car.','They stoppd the car.'], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el pasado regular correcto.',
    sents:[
      { pre:'Yesterday I ', ans:'walked', post:' home.', bank:['walk','walked','walking','walkd'] },
      { pre:'He ', ans:'stopped', post:' the car.', bank:['stop','stopped','stoped','stopping'] },
      { pre:'She ', ans:'studied', post:' a lot.', bank:['study','studied','studyed','studying'] },
      { pre:'They ', ans:'played', post:' chess.', bank:['play','played','playd','playing'] } ] }
]);

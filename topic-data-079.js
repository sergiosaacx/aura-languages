/* topic-data-079.js - Juego 79/350 | T12 2/7 PAST STORIES | didn't negacion (ESPECIALIZADO) | Plata A2 */
_registerGames(79, "Didn't · Negacion del Pasado", [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Como se niega "She went"?', opts:["She didn't went","She didn't go","She not go","She don't go"], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada afirmacion con su negacion.',
    pairs:[ ['She went',"She didn't go"],['They ate',"They didn't eat"],['He saw',"He didn't see"],['I played',"I didn't play"],['We studied',"We didn't study"],['You came',"You didn't come"] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:["didn't",'She','go','home'],ans:['She',"didn't",'go','home']},{words:["didn't",'They','eat','meat'],ans:['They',"didn't",'eat','meat']},{words:["didn't",'I','see','him'],ans:['I',"didn't",'see','him']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She',"didn't",'went','.'], wi:2, correct:'go', choices:['go','went','gone','goes'] },
      { words:['They',"didn't",'ate','.'], wi:2, correct:'eat', choices:['eat','ate','eaten','eats'] },
      { words:['He',"don't",'go','.'], wi:1, correct:"didn't", choices:["didn't","don't","doesn't","not"] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada negacion como correcta o incorrecta.',
    categories:['Correcta','Incorrecta'],
    items:[ {text:"She didn't go",correct:0},{text:"She didn't went",correct:1},{text:"They didn't eat",correct:0},{text:"They didn't ate",correct:1},{text:"He didn't see",correct:0},{text:"He didn't saw",correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:"She didn't go to school.", type:'select', opts:["She didn't go to school.","She didn't went to school.","She don't go to school.","She not go to school."], correct:0 },
      { tts:"They didn't eat dinner.", type:'select', opts:["They didn't eat dinner.","They didn't ate dinner.","They don't eat dinner.","They not eat dinner."], correct:0 },
      { tts:"I didn't see him.", type:'select', opts:["I didn't see him.","I didn't saw him.","I don't see him.","I not see him."], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:"Toca didn't para negar en pasado.",
    sents:[
      { pre:'She ', ans:"didn't", post:' go to work.', bank:["didn't","don't","doesn't","wasn't"] },
      { pre:'They ', ans:"didn't", post:' finish.', bank:["didn't","don't","doesn't","weren't"] },
      { pre:'He ', ans:"didn't", post:' call me.', bank:["didn't","don't","doesn't","wasn't"] },
      { pre:'We ', ans:"didn't", post:' win.', bank:["didn't","don't","doesn't","weren't"] } ] }
]);

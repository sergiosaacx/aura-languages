/* topic-data-081.js - Juego 81/350 | T12 4/7 PAST STORIES | was/were negativo e interrogativo (ESPECIALIZADO) | Plata A2 */
_registerGames(81, 'Was / Were · Negativo e Interrogativo', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['Was they happy?','Were they happy?','Are they happy?','Did they happy?'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada sujeto con su forma de was/were.',
    pairs:[ ['I','Was I...?'],['he','Was he...?'],['they','Were they...?'],['you','Were you...?'],['she',"She wasn't"],['we',"We weren't"] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['Were','at','you','home'],ans:['Were','you','at','home']},{words:["wasn't",'He','there'],ans:['He',"wasn't",'there']},{words:['Was','happy','she'],ans:['Was','she','happy']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['Was','they','happy','?'], wi:0, correct:'Were', choices:['Were','Was','Are','Is'] },
      { words:['He',"weren't",'there','.'], wi:1, correct:"wasn't", choices:["wasn't","weren't","isn't","not"] },
      { words:['Were','she','tired','?'], wi:0, correct:'Was', choices:['Was','Were','Is','Are'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada pronombre segun use was o were.',
    categories:['was','were'],
    items:[ {text:'I',correct:0},{text:'he',correct:0},{text:'she',correct:0},{text:'you',correct:1},{text:'we',correct:1},{text:'they',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'Were you at home?', type:'select', opts:['Were you at home?','Was you at home?','Are you at home?','Did you at home?'], correct:0 },
      { tts:"He wasn't there.", type:'select', opts:["He wasn't there.","He weren't there.","He isn't there.","He not was there."], correct:0 },
      { tts:'Was she happy?', type:'select', opts:['Was she happy?','Were she happy?','Is she happy?','Did she happy?'], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta de was/were.',
    sents:[
      { pre:'', ans:'Were', post:' you at school?', bank:['Was','Were','Are','Is'] },
      { pre:'', ans:'Was', post:' he your teacher?', bank:['Was','Were','Are','Is'] },
      { pre:'She ', ans:"wasn't", post:' at home.', bank:["wasn't","weren't","isn't","aren't"] },
      { pre:'They ', ans:"weren't", post:' ready.', bank:["wasn't","weren't","isn't","aren't"] } ] }
]);

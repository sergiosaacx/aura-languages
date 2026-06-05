/* topic-data-114.js - Juego 114/350 | T17 2/7 COMPARE THE WORLD | Superlativos (ESPECIALIZADO) | Plata A2 */
_registerGames(114, 'Superlativos · The + -est / The Most', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es el superlativo de "good"?', opts:['the goodest','the best','the most good','the better'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada adjetivo con su superlativo.',
    pairs:[ ['tall','the tallest'],['big','the biggest'],['beautiful','the most beautiful'],['good','the best'],['bad','the worst'],['happy','the happiest'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['the','She','is','tallest'],ans:['She','is','the','tallest']},{words:['the','It','is','best'],ans:['It','is','the','best']},{words:['most','the','This','is','expensive'],ans:['This','is','the','most','expensive']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige el superlativo correcto.',
    sents:[
      { words:['She','is','the','goodest','.'], wi:3, correct:'best', choices:['best','goodest','better','most good'] },
      { words:['He','is','the','baddest','player','.'], wi:3, correct:'worst', choices:['worst','baddest','worse','most bad'] },
      { words:['This','is','the','expensivest','car','.'], wi:3, correct:'most expensive', choices:['most expensive','expensivest','more expensive','expensiver'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada adjetivo segun su superlativo.',
    categories:['the + -est','the most'],
    items:[ {text:'tall',correct:0},{text:'big',correct:0},{text:'happy',correct:0},{text:'beautiful',correct:1},{text:'expensive',correct:1},{text:'interesting',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'She is the tallest in the class.', type:'select', opts:['She is the tallest in the class.','She is the most tall in the class.','She is the taller in the class.','She is tallest in the class.'], correct:0 },
      { tts:'It is the best film.', type:'select', opts:['It is the best film.','It is the goodest film.','It is the most good film.','It is the better film.'], correct:0 },
      { tts:'This is the most expensive car.', type:'select', opts:['This is the most expensive car.','This is the expensivest car.','This is the more expensive car.','This is the expensiver car.'], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el superlativo correcto.',
    sents:[
      { pre:'She is ', ans:'the tallest', post:' in her class.', bank:['the tallest','the most tall','taller','tallest'] },
      { pre:'It is ', ans:'the best', post:' film ever.', bank:['the best','the goodest','the most good','the better'] },
      { pre:'This is ', ans:'the most', post:' expensive phone.', bank:['the most','the more','the','most'] },
      { pre:'He is ', ans:'the worst', post:' player.', bank:['the worst','the baddest','the most bad','the worse'] } ] }
]);

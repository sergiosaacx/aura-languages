/* topic-data-093.js - Juego 93/350 | T14 2/7 WHAT'S HAPPENING? | Verbos estativos (ESPECIALIZADO) | Plata A2 */
_registerGames(93, 'Verbos Estativos · Sin -ing', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['I am knowing the answer','I know the answer','I am know the answer','I knowing the answer'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su forma correcta.',
    pairs:[ ['I am knowing','I know'],['I am wanting','I want'],['I am liking','I like'],['She is loving','She loves'],['He is needing','He needs'],['They are believing','They believe'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['the','I','know','answer'],ans:['I','know','the','answer']},{words:['coffee','She','likes'],ans:['She','likes','coffee']},{words:['help','They','need'],ans:['They','need','help']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el verbo incorrecto y elige la forma correcta.',
    sents:[
      { words:['I','knowing','the','answer','.'], wi:1, correct:'know', choices:['know','knowing','knows','knew'] },
      { words:['She','liking','coffee','.'], wi:1, correct:'likes', choices:['likes','liking','like','liked'] },
      { words:['They','wanting','help','.'], wi:1, correct:'want', choices:['want','wanting','wants','wanted'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada verbo como estativo o de accion.',
    categories:['Estativo (no -ing)','Accion (si -ing)'],
    items:[ {text:'know',correct:0},{text:'run',correct:1},{text:'like',correct:0},{text:'eat',correct:1},{text:'want',correct:0},{text:'play',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I know the answer.', type:'select', opts:['I know the answer.','I am knowing the answer.','I knowing the answer.','I knows the answer.'], correct:0 },
      { tts:'She likes coffee.', type:'select', opts:['She likes coffee.','She is liking coffee.','She liking coffee.','She like coffee.'], correct:0 },
      { tts:'They need help.', type:'select', opts:['They need help.','They are needing help.','They needing help.','They needs help.'], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta (verbos estativos sin -ing).',
    sents:[
      { pre:'I ', ans:'know', post:' the answer.', bank:['know','knowing','am knowing','knows'] },
      { pre:'She ', ans:'likes', post:' tea.', bank:['likes','is liking','liking','like'] },
      { pre:'They ', ans:'want', post:' a car.', bank:['want','are wanting','wanting','wants'] },
      { pre:'He ', ans:'needs', post:' money.', bank:['needs','is needing','needing','need'] } ] }
]);

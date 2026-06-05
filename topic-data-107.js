/* topic-data-107.js - Juego 107/350 | T16 2/7 I HAVE DONE IT | just/already/yet (ESPECIALIZADO) | Plata A2 */
_registerGames(107, 'Just / Already / Yet', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Donde va "yet"?', opts:['al inicio','antes del participio','al final en negativas y preguntas','despues del sujeto'], correct:2 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada adverbio con su significado.',
    pairs:[ ['just','acaba de'],['already','ya'],['yet','todavia (neg/preg)'],['just finished','recien terminado'],['already eaten','ya comido'],['not yet','todavia no'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['just','I','have','finished'],ans:['I','have','just','finished']},{words:['already','She','has','eaten'],ans:['She','has','already','eaten']},{words:['yet','you','Have','arrived'],ans:['Have','you','arrived','yet']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el adverbio incorrecto y elige la correccion.',
    sents:[
      { words:['Have','you','eaten','already','?'], wi:3, correct:'yet', choices:['yet','already','just','still'] },
      { words:['She','has','yet','arrived','.'], wi:2, correct:'already', choices:['already','yet','just','still'] },
      { words:['I',"haven't",'finished','already','.'], wi:3, correct:'yet', choices:['yet','already','just','still'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada adverbio segun el tipo de oracion.',
    categories:['Afirmativa (just/already)','Negativa/pregunta (yet)'],
    items:[ {text:'just',correct:0},{text:'already',correct:0},{text:'yet',correct:1},{text:'not yet',correct:1},{text:'just finished',correct:0},{text:'arrived yet?',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I have just finished.', type:'select', opts:['I have just finished.','I just have finished.','I have finished just.','Just I have finished.'], correct:0 },
      { tts:'She has already eaten.', type:'select', opts:['She has already eaten.','She already has eaten.','She has eaten already now.','Already she has eaten.'], correct:0 },
      { tts:'Have you arrived yet?', type:'select', opts:['Have you arrived yet?','Have yet you arrived?','Yet have you arrived?','Have you yet arrived?'], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el adverbio correcto.',
    sents:[
      { pre:'I have ', ans:'just', post:' arrived.', bank:['just','already','yet','still'] },
      { pre:'She has ', ans:'already', post:' left.', bank:['just','already','yet','still'] },
      { pre:'Have you eaten ', ans:'yet', post:'?', bank:['just','already','yet','still'] },
      { pre:"They haven't called ", ans:'yet', post:'.', bank:['just','already','yet','still'] } ] }
]);

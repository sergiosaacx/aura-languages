/* topic-data-086.js - Juego 86/350 | T13 2/7 GOING TO | want to vs would like to (ESPECIALIZADO) | Plata A2 */
_registerGames(86, 'Want To vs Would Like To', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'En una tienda, que es mas cortes?', opts:['I want a coffee','I would like a coffee','I like a coffee','I wanting a coffee'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada frase informal con su version formal.',
    pairs:[ ['I want to eat','I would like to eat'],['I want a coffee','I would like a coffee'],['Do you want help?','Would you like help?'],['I want to go','I would like to go'],['I want water','I would like water'],['I want to know','I would like to know'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['like','I','would','to','travel'],ans:['I','would','like','to','travel']},{words:['want','They','to','eat'],ans:['They','want','to','eat']},{words:['like','Would','you','tea'],ans:['Would','you','like','tea']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['I','would','want','to','go','.'], wi:2, correct:'like', choices:['like','want','wanting','liked'] },
      { words:['She','like','to','travel','.'], wi:1, correct:'wants', choices:['wants','like','likes','want'] },
      { words:['I','wants','to','eat','.'], wi:1, correct:'want', choices:['want','wants','wanted','wanting'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada frase como informal o formal.',
    categories:['Informal (want to)','Formal (would like to)'],
    items:[ {text:'I want to go',correct:0},{text:'I would like to go',correct:1},{text:'Do you want?',correct:0},{text:'Would you like?',correct:1},{text:'I want water',correct:0},{text:'I would like water',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I would like a coffee.', type:'select', opts:['I would like a coffee.','I want a coffee.','I would want a coffee.','I like a coffee.'], correct:0 },
      { tts:'They want to eat.', type:'select', opts:['They want to eat.','They would eat.','They want eat.','They wanting to eat.'], correct:0 },
      { tts:'Would you like some tea?', type:'select', opts:['Would you like some tea?','Do you want some tea?','Would you want some tea?','You would like some tea?'], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta.',
    sents:[
      { pre:'I would ', ans:'like', post:' to travel.', bank:['like','want','would','liked'] },
      { pre:'They ', ans:'want', post:' to eat.', bank:['want','would','like','wants'] },
      { pre:'', ans:'Would', post:' you like a drink?', bank:['Would','Want','Do','Are'] },
      { pre:'She wants ', ans:'to', post:' learn French.', bank:['to','for','at','of'] } ] }
]);

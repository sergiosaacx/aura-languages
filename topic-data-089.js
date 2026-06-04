/* topic-data-089.js - Juego 89/350 | T13 5/7 GOING TO | going to / want to / would like to (MEZCLADO) | Plata A2 */
_registerGames(89, 'Futuro y Deseos · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Ella va a empezar un trabajo', opts:['She going to start a job','She is going to start a new job','She is go to start a job','She will going to start a job'], correct:1 },
      { src:'Me gustaria viajar a Japon', opts:['I want travel to Japan','I would like to travel to Japan','I would want to travel to Japan','I like to travel to Japan'], correct:1 },
      { src:'Ellos quieren comprar una casa', opts:['They want buy a house','They want to buy a house','They wants to buy a house','They would buy a house'], correct:1 },
      { src:'Voy a aprender frances', opts:['I going to learn French','I am going to learn French','I am go to learn French','I will going to learn French'], correct:1 },
      { src:'Me gustaria un cafe', opts:['I want a coffee','I would like a coffee','I would want a coffee','I like a coffee'], correct:1 },
      { src:'El va a estudiar', opts:['He going to study','He is going to study','He are going to study','He is go to study'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada frase en espanol con su forma en ingles.',
    pairs:[ ['voy a estudiar','I am going to study'],['me gustaria viajar','I would like to travel'],['quiero comer','I want to eat'],['ella va a trabajar','She is going to work'],['nos gustaria ir','We would like to go'],['ellos quieren jugar','They want to play'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['I','G','O','N','G'],ans:'GOING',hint:'... to'},{scrambled:['T','N','A','W'],ans:'WANT',hint:'... to eat'},{scrambled:['D','L','U','O','W'],ans:'WOULD',hint:'... like to'},{scrambled:['E','K','I','L'],ans:'LIKE',hint:'would ... to'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada oracion segun su estructura.',
    categories:['going to','want to','would like to'],
    items:[ {text:'I am going to study',correct:0},{text:'I want to eat',correct:1},{text:'I would like to go',correct:2},{text:'She is going to work',correct:0},{text:'They want to play',correct:1},{text:'We would like to travel',correct:2} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['going','She','is','to','start'],ans:['She','is','going','to','start']},{words:['like','I','would','to','travel'],ans:['I','would','like','to','travel']},{words:['want','They','to','buy'],ans:['They','want','to','buy']} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What are you going to do this summer?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I am going to visit Italy.','I going to visit Italy.','I am go to visit Italy.','I will going to visit Italy.'], correct:0 },
      { speaker:0, text:'And what would you like to learn?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I would like to learn Italian.','I want learn Italian.','I would want to learn Italian.','I like learn Italian.'], correct:0 },
      { speaker:0, text:'Great!', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She','will','going','to','start','.'], wi:1, correct:'is', choices:['is','will','are','am'] },
      { words:['I','would','want','to','travel','.'], wi:2, correct:'like', choices:['like','want','wants','liked'] },
      { words:['They','wants','to','buy','a','house','.'], wi:1, correct:'want', choices:['want','wants','wanted','wanting'] } ] }
]);

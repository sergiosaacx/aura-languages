/* topic-data-152.js - Juego 152/350 | T22 5/7 USED TO | used to, would y Pasado Continuo (MEZCLADO) | Oro B1 */
_registerGames(152, 'Habitos y Pasado Continuo · Narracion', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'De nino solia jugar futbol', opts:['When I was a child, I would playing football','When I was a child, I used to play football','When I was a child, I use to play football','When I was a child, I was play football'], correct:1 },
      { src:'Ella estaba leyendo cuando se fue la luz', opts:['She read when the lights went out','She was reading when the lights went out','She was read when the lights went out','She reading when the lights went out'], correct:1 },
      { src:'Soliamos visitar a la abuela', opts:['We would visit grandma','We use to visit grandma','We were visit grandma','We are used to visit grandma'], correct:0 },
      { src:'El estaba durmiendo cuando llegue', opts:['He slept when I arrived','He was sleeping when I arrived','He was sleep when I arrived','He sleeping when I arrived'], correct:1 },
      { src:'Yo solia ser muy timido', opts:['I would be very shy','I used to be very shy','I use to be very shy','I was be very shy'], correct:1 },
      { src:'Estaban jugando cuando empezo a llover', opts:['They played when it started to rain','They were playing when it started to rain','They were play when it started to rain','They playing when it started to rain'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada frase en espanol con su forma en ingles.',
    pairs:[ ['solia jugar','used to play'],['solia visitar','would visit'],['estaba leyendo','was reading'],['estaban jugando','were playing'],['solia ser','used to be'],['estaba durmiendo','was sleeping'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['D','E','S','U'],ans:'USED',hint:'... to play'},{scrambled:['D','L','U','O','W'],ans:'WOULD',hint:'... visit'},{scrambled:['S','A','W'],ans:'WAS',hint:'... reading'},{scrambled:['R','E','E','W'],ans:'WERE',hint:'... playing'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada forma como habito pasado o accion en progreso.',
    categories:['Habito pasado','Accion en progreso'],
    items:[ {text:'used to play',correct:0},{text:'was reading',correct:1},{text:'would visit',correct:0},{text:'were playing',correct:1},{text:'used to be',correct:0},{text:'was sleeping',correct:1} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['used','I','to','play','football'],ans:['I','used','to','play','football']},{words:['was','She','reading','then'],ans:['She','was','reading','then']},{words:['were','They','playing','outside'],ans:['They','were','playing','outside']} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What did you do as a child?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I used to play in the park.','I would playing in the park.','I use to play in the park.','I was play in the park.'], correct:0 },
      { speaker:0, text:'What were you doing when I called?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I was reading a book.','I read a book.','I was read a book.','I reading a book.'], correct:0 },
      { speaker:0, text:'I see.', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['I','use','to','play','football','.'], wi:1, correct:'used', choices:['used','use','uses','using'] },
      { words:['She','was','read','when','I','came','.'], wi:2, correct:'reading', choices:['reading','read','reads','reader'] },
      { words:['They','was','playing','.'], wi:1, correct:'were', choices:['were','was','are','did'] } ] }
]);

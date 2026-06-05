/* topic-data-102.js - Juego 102/350 | T15 4/7 HOW MUCH? | incontables reglas especiales (ESPECIALIZADO) | Plata A2 */
_registerGames(102, 'Incontables · Reglas Especiales', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['an advice','some advice','an advices','advices'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"some advice" es correcto.', ans:true, expl:'Correcto. advice es incontable.' },
      { text:'"an information" es correcto.', ans:false, expl:'Falso. some information.' },
      { text:'"I need some information." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"many homeworks" es correcto.', ans:false, expl:'Falso. a lot of homework.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'I need some ', ans:'information', post:'.', bank:['information','informations','an information','informationes'] },
      { pre:'Can I have some ', ans:'advice', post:'?', bank:['advice','advices','an advice','advicees'] },
      { pre:'I have a lot of ', ans:'homework', post:'.', bank:['homework','homeworks','a homework','homeworkes'] },
      { pre:'We have ', ans:'some', post:' luggage.', bank:['some','a','an','many'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['some','I','need','information'],ans:['I','need','some','information']},{words:['advice','some','Give','me'],ans:['Give','me','some','advice']},{words:['homework','have','a lot of','I'],ans:['I','have','a lot of','homework']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['Can','I','have','an','advice','?'], wi:3, correct:'some', choices:['some','an','a','many'] },
      { words:['I','need','some','informations','.'], wi:3, correct:'information', choices:['information','informations','informationes','informationsi'] },
      { words:['She','has','much','homeworks','.'], wi:3, correct:'homework', choices:['homework','homeworks','homeworkes','a homework'] } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I need some information.', type:'select', opts:['I need some information.','I need an information.','I need some informations.','I need a information.'], correct:0 },
      { tts:'Can I have some advice?', type:'select', opts:['Can I have some advice?','Can I have an advice?','Can I have some advices?','Can I have a advice?'], correct:0 },
      { tts:'I have a lot of homework.', type:'select', opts:['I have a lot of homework.','I have many homeworks.','I have a homework.','I have homeworks.'], correct:0 } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la forma correcta del incontable.',
    transforms:[
      { original:'information', task:'Correcto', opts:['some information','an information','informations','a information'], correct:0 },
      { original:'advice', task:'Correcto', opts:['some advice','an advice','advices','a advice'], correct:0 },
      { original:'homework', task:'Correcto', opts:['a lot of homework','many homeworks','a homework','homeworks'], correct:0 },
      { original:'luggage', task:'Correcto', opts:['some luggage','a luggage','luggages','many luggages'], correct:0 } ] }
]);

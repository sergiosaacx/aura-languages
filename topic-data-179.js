/* topic-data-179.js - Juego 179/350 | T26 4/7 REPORTED SPEECH | Cambio de referencias (ESPECIALIZADO) | Oro B1 */
_registerGames(179, 'Cambio de Referencias', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'En discurso indirecto, "now" cambia a...', opts:['then','here','today','soon'], correct:0 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada cambio es correcto.',
    stmts:[
      { text:'"here" cambia a "there" en discurso indirecto.', ans:true, expl:'Correcto. She said she was there.' },
      { text:'"tomorrow" cambia a "the next day".', ans:true, expl:'Correcto.' },
      { text:'"now" no cambia en discurso indirecto.', ans:false, expl:'Falso. now -> then.' },
      { text:'"today" cambia a "that day".', ans:true, expl:'Correcto.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la referencia correcta.',
    sents:[
      { pre:'She said she was ', ans:'there', post:' then.', bank:['there','here','where','near'] },
      { pre:'He said he would come the ', ans:'next', post:' day.', bank:['next','last','same','other'] },
      { pre:'She said she was busy that ', ans:'day', post:'.', bank:['day','today','now','here'] },
      { pre:'He said he was tired ', ans:'then', post:'.', bank:['then','now','today','soon'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['there','She','said','she','was'],ans:['She','said','she','was','there']},{words:['then','He','said','he','was','busy'],ans:['He','said','he','was','busy','then']},{words:['day','He','would','come','the','next'],ans:['He','would','come','the','next','day']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la referencia incorrecta y elige la correccion.',
    sents:[
      { words:['She','said','she','was','here','.'], wi:4, correct:'there', choices:['there','here','where','near'] },
      { words:['He','said','he','was','tired','now','.'], wi:5, correct:'then', choices:['then','now','today','soon'] },
      { words:['She','said','she','would','come','tomorrow','.'], wi:5, correct:'the next day', choices:['the next day','tomorrow','today','yesterday'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la referencia indirecta.',
    words:[ {scrambled:['E','R','E','H','T'],ans:'THERE',hint:'here se vuelve...'},{scrambled:['N','E','H','T'],ans:'THEN',hint:'now se vuelve...'},{scrambled:['T','X','E','N'],ans:'NEXT',hint:'the ... day'},{scrambled:['T','A','H','T'],ans:'THAT',hint:'today -> ... day'} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'She said she was there then.', type:'select', opts:['She said she was there then.','She said she was here now.','She said she is there then.','She said she was there now.'], correct:0 },
      { tts:'He would come the next day.', type:'select', opts:['He would come the next day.','He would come tomorrow.','He will come the next day.','He would come the last day.'], correct:0 },
      { tts:'She said she was busy that day.', type:'select', opts:['She said she was busy that day.','She said she is busy today.','She said she was busy today.','She said she was busy this day.'], correct:0 } ] }
]);

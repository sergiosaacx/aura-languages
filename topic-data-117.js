/* topic-data-117.js - Juego 117/350 | T17 5/7 COMPARE THE WORLD | comparativos y superlativos en oraciones (MEZCLADO) | Plata A2 */
_registerGames(117, 'Comparativos y Superlativos · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Este libro es mas interesante que ese', opts:['This book is interesting than that','This book is more interesting than that one','This book is most interesting than that','This book is more interesting as that'], correct:1 },
      { src:'Ella es la mas alta de su clase', opts:['She is taller in her class','She is the tallest in her class','She is most tall in her class','She is the most tall in her class'], correct:1 },
      { src:'El corre mas rapido que su hermano', opts:['He runs more fast than his brother','He runs faster than his brother','He runs fastest than his brother','He runs faster as his brother'], correct:1 },
      { src:'Esta es la mejor pelicula', opts:['This is the best film','This is the goodest film','This is the most good film','This is better film'], correct:0 },
      { src:'Mi casa es mas grande que la tuya', opts:['My house is bigger than yours','My house is more big than yours','My house is biggest than yours','My house is bigger as yours'], correct:0 },
      { src:'El es el chico mas inteligente', opts:['He is the most intelligent boy','He is the intelligentest boy','He is more intelligent boy','He is intelligent boy'], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['R','E','T','S','A','F'],ans:'FASTER',hint:'comparativo de fast'},{scrambled:['T','S','E','L','L','A','T'],ans:'TALLEST',hint:'superlativo de tall'},{scrambled:['N','A','H','T'],ans:'THAN',hint:'... his brother'},{scrambled:['E','R','O','M'],ans:'MORE',hint:'... interesting'} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Escribe la forma pedida.',
    transforms:[
      { original:'interesting', task:'Comparativo', opts:['more interesting','interestinger','most interesting','interesting'], correct:0 },
      { original:'tall', task:'Superlativo', opts:['the tallest','the most tall','taller','tallest'], correct:0 },
      { original:'fast', task:'Comparativo', opts:['faster','more fast','fastest','fast'], correct:0 },
      { original:'good', task:'Superlativo', opts:['the best','the goodest','the most good','better'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Which book is better?', blank:false },
      { speaker:1, text:null, blank:true, opts:['This one is more interesting than that.','This one is interesting than that.','This one is most interesting than that.','This one is more interesting as that.'], correct:0 },
      { speaker:0, text:'Who is the tallest in your family?', blank:false },
      { speaker:1, text:null, blank:true, opts:['My brother is the tallest.','My brother is taller.','My brother is the most tall.','My brother is tallest.'], correct:0 },
      { speaker:0, text:'I see!', blank:false } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'She is the tallest in her class.', type:'select', opts:['She is the tallest in her class.','She is taller in her class.','She is the most tall in her class.','She is tallest in her class.'], correct:0 },
      { tts:'He runs faster than his brother.', type:'select', opts:['He runs faster than his brother.','He runs more fast than his brother.','He runs fastest than his brother.','He runs faster as his brother.'], correct:0 },
      { tts:'This is the best film.', type:'select', opts:['This is the best film.','This is the goodest film.','This is the most good film.','This is better film.'], correct:0 } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['than','He','runs','faster','his','brother'],ans:['He','runs','faster','than','his','brother']},{words:['the','She','is','tallest'],ans:['She','is','the','tallest']},{words:['than','more','This','is','interesting','that'],ans:['This','is','more','interesting','than','that']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['He','runs','faster','as','me','.'], wi:3, correct:'than', choices:['than','as','to','that'] },
      { words:['She','is','tallest','in','class','.'], wi:2, correct:'the tallest', choices:['the tallest','tallest','taller','most tall'] },
      { words:['This','is','more','good','than','that','.'], wi:3, correct:'better', choices:['better','good','best','more good'] } ] }
]);

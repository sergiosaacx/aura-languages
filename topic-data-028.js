/* topic-data-028.js - Juego 28/350 | T4 7/7 A OR THE? | errores tipicos de articulos (MEZCLADO) | Bronce A1 */
_registerGames(28, 'Articulos · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige la forma correcta del articulo.',
    items:[
      { src:'una doctora',       opts:['a doctor','an doctor','the doctor','doctor'], correct:0 },
      { src:'algo de leche',     opts:['any milk','some milk','a milk','the milk'], correct:1 },
      { src:'la vida (general)', opts:['the life','a life','an life','life'], correct:3 },
      { src:'un ingeniero',      opts:['a engineer','an engineer','the engineer','engineer'], correct:1 },
      { src:'una hora',          opts:['a hour','an hour','the hour','hour'], correct:1 },
      { src:'ingles (idioma)',   opts:['the English','a English','an English','English'], correct:3 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Cual oracion es correcta?',
    opts:['She is an doctor.','She is a doctor.','She is the doctor.','She is doctor.'], correct:1 },
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada error con su correccion.',
    pairs:[ ['an doctor','a doctor'],['some any milk','some milk'],['the life (general)','life'],['a apple','an apple'],['the football','football'],['an book','a book'] ] },
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['a','She','is','doctor'],ans:['She','is','a','doctor']},{words:['English','He','speaks'],ans:['He','speaks','English']},{words:['an','I','have','apple'],ans:['I','have','an','apple']} ] },
  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada frase como correcta o incorrecta.',
    categories:['Correcta','Incorrecta'],
    items:[ {text:'a doctor',correct:0},{text:'an doctor',correct:1},{text:'some milk',correct:0},{text:'some any milk',correct:1},{text:'an apple',correct:0},{text:'a apple',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion correcta.',
    items:[
      { tts:'She is a doctor.', type:'select', opts:['She is a doctor.','She is an doctor.','She is the doctor.','She is doctor.'], correct:0 },
      { tts:'I have some milk.', type:'select', opts:['I have some milk.','I have any milk.','I have a milk.','I have the milk.'], correct:0 },
      { tts:'He speaks English.', type:'select', opts:['He speaks English.','He speaks the English.','He speaks a English.','He speaks an English.'], correct:0 } ] },
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca el articulo incorrecto y elige la correccion.',
    sents:[
      { words:['She','is','an','doctor','.'], wi:2, correct:'a', choices:['a','an','the','some'] },
      { words:['I','have','any','milk','.'], wi:2, correct:'some', choices:['some','any','a','the'] },
      { words:['There','is','the','dog','outside','.'], wi:2, correct:'a', choices:['a','an','the','one'] } ] }
]);

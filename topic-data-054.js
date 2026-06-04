/* topic-data-054.js - Juego 54/350 | T8 5/7 DAILY HABITS | afirmativas, negativas y preguntas (MEZCLADO) | Bronce A1 */
_registerGames(54, 'Presente Simple · Afirmativa, Negativa y Pregunta', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Ella trabaja cada dia', opts:['She work every day','She works every day','She working every day','She is work every day'], correct:1 },
      { src:'Ellos no comen carne', opts:["They doesn't eat meat","They don't eat meat","They don't eats meat","They not eat meat"], correct:1 },
      { src:'Juega el guitarra?', opts:['Do he play guitar?','Does he play guitar?','Does he plays guitar?','Is he play guitar?'], correct:1 },
      { src:'El no trabaja aqui', opts:["He don't work here","He doesn't work here","He doesn't works here","He not work here"], correct:1 },
      { src:'Estudias ingles?', opts:['Does you study English?','Do you study English?','Do you studies English?','Is you study English?'], correct:1 },
      { src:'Ella va a la escuela', opts:['She go to school','She goes to school','She going to school','She does go to school'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada tipo de oracion con su ejemplo.',
    pairs:[ ['afirmativa','She works every day'],['negativa',"They don't eat meat"],['pregunta','Does he play guitar?'],['afirmativa 3ra','He watches TV'],['negativa con he',"He doesn't sleep"],['pregunta con they','Do they study?'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el verbo o auxiliar.',
    words:[ {scrambled:['K','R','O','W','S'],ans:'WORKS',hint:'ella trabaja'},{scrambled:['E','S','O','D'],ans:'DOES',hint:'auxiliar con he/she'},{scrambled:['T','A','E'],ans:'EAT',hint:"They don't ..."},{scrambled:['Y','A','L','P'],ans:'PLAY',hint:'Does he ...?'} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Transforma cada oracion segun la tarea.',
    transforms:[
      { original:'She works.', task:'Negativa', opts:["She doesn't work.","She don't work.","She doesn't works.","She not work."], correct:0 },
      { original:'They eat meat.', task:'Pregunta', opts:['Do they eat meat?','Does they eat meat?','Do they eats meat?','Is they eat meat?'], correct:0 },
      { original:'He plays.', task:'Negativa', opts:["He doesn't play.","He don't play.","He doesn't plays.","He not play."], correct:0 },
      { original:'You live here.', task:'Pregunta', opts:['Do you live here?','Does you live here?','Do you lives here?','Is you live here?'], correct:0 } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:['works','She','every','day'], ans:['She','works','every','day'] },
      { words:["don't",'They','eat','meat'], ans:['They',"don't",'eat','meat'] },
      { words:['he','Does','play','guitar'], ans:['Does','he','play','guitar'] } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She','work','every','day','.'], wi:1, correct:'works', choices:['works','work','working','worked'] },
      { words:['They',"doesn't",'eat','meat','.'], wi:1, correct:"don't", choices:["don't","doesn't","isn't","aren't"] },
      { words:['Do','he','play','?'], wi:0, correct:'Does', choices:['Does','Do','Is','Are'] } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'She works every day.', type:'select', opts:['She works every day.','She work every day.','She working every day.','She is work every day.'], correct:0 },
      { tts:"They don't eat meat.", type:'select', opts:["They don't eat meat.","They doesn't eat meat.","They don't eats meat.","They not eat meat."], correct:0 },
      { tts:'Does he play guitar?', type:'select', opts:['Does he play guitar?','Do he play guitar?','Does he plays guitar?','Is he play guitar?'], correct:0 } ] }
]);

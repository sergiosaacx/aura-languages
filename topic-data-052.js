/* topic-data-052.js - Juego 52/350 | T8 3/7 DAILY HABITS | Do/Does en preguntas (ESPECIALIZADO) | Bronce A1 */
_registerGames(52, 'Do / Does · En Preguntas', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que auxiliar usas en preguntas con "he"?', opts:['Do','Does','Is','Are'], correct:1 },
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la pregunta correcta.',
    items:[
      { src:'Juega el?', opts:['Do he play?','Does he play?','Is he play?','Does he plays?'], correct:1 },
      { src:'Trabajan ellos?', opts:['Does they work?','Do they work?','Is they work?','Do they works?'], correct:1 },
      { src:'Come ella?', opts:['Do she eat?','Does she eats?','Does she eat?','Is she eat?'], correct:2 },
      { src:'Vives tu?', opts:['Does you live?','Do you live?','Is you live?','Do you lives?'], correct:1 },
      { src:'Estudia el?', opts:['Do he study?','Does he studies?','Does he study?','Is he study?'], correct:2 },
      { src:'Jugamos nosotros?', opts:['Does we play?','Do we play?','Is we play?','Do we plays?'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada sujeto con su auxiliar de pregunta.',
    pairs:[ ['I','Do I...?'],['You','Do you...?'],['He','Does he...?'],['She','Does she...?'],['We','Do we...?'],['They','Do they...?'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el auxiliar de preguntas.',
    words:[ {scrambled:['O','D'],ans:'DO',hint:'con I/you/we/they'},{scrambled:['E','S','O','D'],ans:'DOES',hint:'con he/she/it'},{scrambled:['Y','A','L','P'],ans:'PLAY',hint:'Do you ...?'},{scrambled:['K','O','R','W'],ans:'WORK',hint:'Does he ...?'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada pregunta es correcta.',
    stmts:[
      { text:'"Does he work?" es correcto.', ans:true, expl:'Correcto. Does con he + verbo base.' },
      { text:'"Do she like it?" es correcto.', ans:false, expl:'Falso. Con she se usa Does: Does she like it?' },
      { text:'"Do they play?" es correcto.', ans:true, expl:'Correcto. Do con they.' },
      { text:'"Does he plays?" es correcto.', ans:false, expl:'Falso. Con does el verbo no lleva -s: Does he play?' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Convierte cada afirmacion en pregunta.',
    transforms:[
      { original:'He plays tennis.', task:'Forma pregunta', opts:['Does he play tennis?','Do he play tennis?','Does he plays tennis?','Is he play tennis?'], correct:0 },
      { original:'They work here.', task:'Forma pregunta', opts:['Do they work here?','Does they work here?','Do they works here?','Is they work here?'], correct:0 },
      { original:'She eats fruit.', task:'Forma pregunta', opts:['Does she eat fruit?','Do she eat fruit?','Does she eats fruit?','Is she eat fruit?'], correct:0 },
      { original:'You live here.', task:'Forma pregunta', opts:['Do you live here?','Does you live here?','Do you lives here?','Is you live here?'], correct:0 } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la pregunta que oyes.',
    items:[
      { tts:'Does he play tennis?', type:'select', opts:['Does he play tennis?','Do he play tennis?','Does he plays tennis?','Is he play tennis?'], correct:0 },
      { tts:'Do they work here?', type:'select', opts:['Do they work here?','Does they work here?','Do they works here?','Is they work here?'], correct:0 },
      { tts:'Does she like coffee?', type:'select', opts:['Does she like coffee?','Do she like coffee?','Does she likes coffee?','Is she like coffee?'], correct:0 } ] }
]);

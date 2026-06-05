/* topic-data-096.js - Juego 96/350 | T14 5/7 WHAT'S HAPPENING? | continuo afirm/neg/preg (MEZCLADO) | Plata A2 */
_registerGames(96, 'Presente Continuo · Afirmativa, Negativa y Pregunta', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Yo estoy cocinando la cena', opts:['I cooking dinner','I am cooking dinner','I am cook dinner','I cooks dinner'], correct:1 },
      { src:'Ellos no estan viendo TV', opts:["They aren't watching TV","They not watching TV","They aren't watch TV","They isn't watching TV"], correct:0 },
      { src:'Esta ella estudiando?', opts:['Is she studying?','She is studying?','Is she study?','Does she studying?'], correct:0 },
      { src:'El esta durmiendo', opts:['He sleeping','He is sleeping','He is sleep','He sleeps'], correct:1 },
      { src:'No estamos trabajando', opts:["We aren't working","We not working","We aren't work","We isn't working"], correct:0 },
      { src:'Estas tu leyendo?', opts:['Are you reading?','You are reading?','Are you read?','Do you reading?'], correct:0 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada tipo de oracion con su ejemplo.',
    pairs:[ ['afirmativa','I am cooking dinner'],['negativa',"They aren't watching TV"],['pregunta','Is she studying?'],['afirmativa 2','He is sleeping'],['negativa 2',"We aren't working"],['pregunta 2','Are you reading?'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['G','N','I','K','O','O','C'],ans:'COOKING',hint:'-ing de cook'},{scrambled:['G','N','I','D','A','E','R'],ans:'READING',hint:'-ing de read'},{scrambled:['T','N','E','R','A'],ans:'ARENT',hint:'are + not (sin apostrofo)'},{scrambled:['S','I'],ans:'IS',hint:'... she studying?'} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Transforma cada oracion segun la tarea.',
    transforms:[
      { original:'She studies.', task:'Continuo', opts:['She is studying.','She studying.','She is study.','She studies now.'], correct:0 },
      { original:'They watch TV.', task:'Negativa', opts:["They aren't watching TV.","They not watching TV.","They aren't watch TV.","They isn't watching TV."], correct:0 },
      { original:'You read.', task:'Pregunta', opts:['Are you reading?','You are reading?','Are you read?','Do you reading?'], correct:0 },
      { original:'I cook.', task:'Continuo', opts:['I am cooking.','I cooking.','I am cook.','I cooks.'], correct:0 } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I am cooking dinner.', type:'select', opts:['I am cooking dinner.','I cooking dinner.','I am cook dinner.','I cooks dinner.'], correct:0 },
      { tts:"They aren't watching TV.", type:'select', opts:["They aren't watching TV.","They not watching TV.","They aren't watch TV.","They isn't watching TV."], correct:0 },
      { tts:'Is she studying?', type:'select', opts:['Is she studying?','She is studying?','Is she study?','Does she studying?'], correct:0 } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['cooking','I','am','dinner'],ans:['I','am','cooking','dinner']},{words:['studying','she','Is'],ans:['Is','she','studying']},{words:["aren't",'They','watching','TV'],ans:['They',"aren't",'watching','TV']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She','is','study','now','.'], wi:2, correct:'studying', choices:['studying','study','studies','studied'] },
      { words:['They','is','watching','TV','.'], wi:1, correct:'are', choices:['are','is','am','be'] },
      { words:['He','are','sleeping','.'], wi:1, correct:'is', choices:['is','are','am','be'] } ] }
]);

/* topic-data-082.js - Juego 82/350 | T12 5/7 PAST STORIES | preguntas y negaciones (MEZCLADO) | Plata A2 */
_registerGames(82, 'Pasado Simple · Preguntas y Negaciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Te llamo ella ayer?', opts:['Did she called you?','Did she call you yesterday?','Does she call you?','Did she calls you?'], correct:1 },
      { src:'No terminaron la tarea', opts:["They didn't finished the homework","They didn't finish the homework","They don't finish the homework","They not finish the homework"], correct:1 },
      { src:'Estaba el en la fiesta?', opts:['Was he at the party?','Were he at the party?','Is he at the party?','Did he at the party?'], correct:0 },
      { src:'No fui al cine', opts:["I didn't went to the cinema","I didn't go to the cinema","I don't go to the cinema","I not go to the cinema"], correct:1 },
      { src:'Viste la pelicula?', opts:['Did you saw the film?','Did you see the film?','Do you see the film?','Did you seen the film?'], correct:1 },
      { src:'No estaban en casa', opts:["They wasn't at home","They weren't at home","They aren't at home","They not were at home"], correct:1 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra (sin apostrofo).',
    words:[ {scrambled:['I','D','D'],ans:'DID',hint:'preguntas en pasado'},{scrambled:['T','N','I','D','D'],ans:'DIDNT',hint:'negacion en pasado'},{scrambled:['S','A','W'],ans:'WAS',hint:'pasado de is'},{scrambled:['R','E','E','W'],ans:'WERE',hint:'pasado de are'} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Transforma cada oracion segun la tarea.',
    transforms:[
      { original:'She called you.', task:'Negativa', opts:["She didn't call you.","She didn't called you.","She don't call you.","She not call you."], correct:0 },
      { original:'They finished.', task:'Pregunta', opts:['Did they finish?','Did they finished?','Do they finish?','Did they finishing?'], correct:0 },
      { original:'He was at home.', task:'Pregunta', opts:['Was he at home?','Were he at home?','Did he at home?','Is he at home?'], correct:0 },
      { original:'You saw it.', task:'Negativa', opts:["You didn't see it.","You didn't saw it.","You don't see it.","You not see it."], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Did you call Tom?', blank:false },
      { speaker:1, text:null, blank:true, opts:["No, I didn't call him.","No, I didn't called him.","No, I don't call him.","No, I not call him."], correct:0 },
      { speaker:0, text:'Were you tired?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I was very tired.','Yes, I were very tired.','Yes, I am very tired.','Yes, I been very tired.'], correct:0 },
      { speaker:0, text:'I see.', blank:false } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'Did she call you yesterday?', type:'select', opts:['Did she call you yesterday?','Did she called you yesterday?','Does she call you yesterday?','Did she calls you yesterday?'], correct:0 },
      { tts:"They didn't finish the homework.", type:'select', opts:["They didn't finish the homework.","They didn't finished the homework.","They don't finish the homework.","They not finish the homework."], correct:0 },
      { tts:'Was he at the party?', type:'select', opts:['Was he at the party?','Were he at the party?','Is he at the party?','Did he at the party?'], correct:0 } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['Did','call','she','you'],ans:['Did','she','call','you']},{words:["didn't",'They','finish'],ans:['They',"didn't",'finish']},{words:['Was','at','he','the','party'],ans:['Was','he','at','the','party']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['Did','she','called','you','?'], wi:2, correct:'call', choices:['call','called','calls','calling'] },
      { words:['They',"didn't",'finished','.'], wi:2, correct:'finish', choices:['finish','finished','finishes','finishing'] },
      { words:['Was','they','there','?'], wi:0, correct:'Were', choices:['Were','Was','Are','Is'] } ] }
]);

/* topic-data-080.js - Juego 80/350 | T12 3/7 PAST STORIES | Did preguntas (ESPECIALIZADO) | Plata A2 */
_registerGames(80, 'Did · Preguntas en Pasado', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la pregunta correcta en pasado.',
    items:[
      { src:'Comiste?', opts:['Did you ate?','Did you eat?','Do you eat?','Did you eaten?'], correct:1 },
      { src:'Fue ella?', opts:['Did she went?','Did she go?','Does she go?','Did she gone?'], correct:1 },
      { src:'Vieron ellos?', opts:['Did they saw?','Did they see?','Do they see?','Did they seen?'], correct:1 },
      { src:'Jugaste?', opts:['Did you played?','Did you play?','Do you play?','Did you playing?'], correct:1 },
      { src:'Vino el?', opts:['Did he came?','Did he come?','Does he come?','Did he comes?'], correct:1 },
      { src:'Estudiaron?', opts:['Did they studied?','Did they study?','Do they study?','Did they studying?'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada verbo con su pregunta en pasado.',
    pairs:[ ['eat','Did you eat?'],['go','Did she go?'],['see','Did they see?'],['play','Did he play?'],['come','Did we come?'],['study','Did you study?'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['I','D','D'],ans:'DID',hint:'auxiliar de preguntas en pasado'},{scrambled:['T','A','E'],ans:'EAT',hint:'Did you ...?'},{scrambled:['O','G'],ans:'GO',hint:'Did she ...?'},{scrambled:['E','E','S'],ans:'SEE',hint:'Did they ...?'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada pregunta es correcta.',
    stmts:[
      { text:'"Did you eat?" es correcto.', ans:true, expl:'Correcto. Did + sujeto + infinitivo.' },
      { text:'"Did she went?" es correcto.', ans:false, expl:'Falso. Did she go? (infinitivo).' },
      { text:'"Did they play?" es correcto.', ans:true, expl:'Correcto. Did + infinitivo.' },
      { text:'"Do she go?" pregunta por el pasado.', ans:false, expl:'Falso. En pasado: Did she go?' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Convierte cada afirmacion en pregunta.',
    transforms:[
      { original:'You ate.', task:'Pregunta', opts:['Did you eat?','Did you ate?','Do you eat?','Did you eaten?'], correct:0 },
      { original:'She went.', task:'Pregunta', opts:['Did she go?','Did she went?','Does she go?','Did she gone?'], correct:0 },
      { original:'They played.', task:'Pregunta', opts:['Did they play?','Did they played?','Do they play?','Did they playing?'], correct:0 },
      { original:'He came.', task:'Pregunta', opts:['Did he come?','Did he came?','Does he come?','Did he comes?'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con preguntas en pasado.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:null, blank:true, opts:['Did you go to the party?','Did you went to the party?','Do you go to the party?','Did you gone to the party?'], correct:0 },
      { speaker:1, text:'Yes, I did.', blank:false },
      { speaker:0, text:null, blank:true, opts:['Did you see Tom?','Did you saw Tom?','Do you see Tom?','Did you seen Tom?'], correct:0 },
      { speaker:1, text:'Yes, he was there.', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada pregunta como correcta o incorrecta.',
    categories:['Correcta','Incorrecta'],
    items:[ {text:'Did you eat?',correct:0},{text:'Did you ate?',correct:1},{text:'Did she go?',correct:0},{text:'Did she went?',correct:1},{text:'Did they play?',correct:0},{text:'Did they played?',correct:1} ] }
]);

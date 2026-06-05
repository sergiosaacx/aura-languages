/* topic-data-110.js - Juego 110/350 | T16 5/7 I HAVE DONE IT | Perfecto con adverbios (MEZCLADO) | Plata A2 */
_registerGames(110, 'Presente Perfecto · Con Adverbios', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Acabo de terminar mi tarea', opts:['I have already finished my homework','I have just finished my homework','I just have finished my homework','I have finished just my homework'], correct:1 },
      { src:'Has estado alguna vez en Londres?', opts:['Have you never been to London?','Have you ever been to London?','Have you been ever to London?','Did you ever been to London?'], correct:1 },
      { src:'Ella no ha llamado todavia', opts:["She hasn't called already","She hasn't called yet","She hasn't yet called","She hasn't called just"], correct:1 },
      { src:'Ya he comido', opts:['I have yet eaten','I have already eaten','I have just already eaten','I already have eaten yet'], correct:1 },
      { src:'Nunca he visto nieve', opts:['I have ever seen snow','I have never seen snow','I never have seen snow ever','I have not never seen snow'], correct:1 },
      { src:'El acaba de irse', opts:['He has already left','He has just left','He just has left','He has left just already'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada adverbio con su significado.',
    pairs:[ ['just','acaba de'],['already','ya'],['yet','todavia (neg/preg)'],['ever','alguna vez (preguntas)'],['never','nunca (afirmativas)'],['just finished','recien terminado'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['T','S','U','J'],ans:'JUST',hint:'acaba de'},{scrambled:['Y','D','A','E','R','L','A'],ans:'ALREADY',hint:'ya'},{scrambled:['T','E','Y'],ans:'YET',hint:'todavia'},{scrambled:['R','E','V','E'],ans:'EVER',hint:'alguna vez'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada adverbio segun el tipo de oracion.',
    categories:['Afirmativa','Negativa/Pregunta'],
    items:[ {text:'just',correct:0},{text:'already',correct:0},{text:'never',correct:0},{text:'yet',correct:1},{text:'ever',correct:1},{text:'not yet',correct:1} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['just','I','have','finished'],ans:['I','have','just','finished']},{words:['ever','you','Have','been','there'],ans:['Have','you','ever','been','there']},{words:['yet',"hasn't",'She','called'],ans:['She',"hasn't",'called','yet']} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Have you finished your homework?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I have just finished it.','Yes, I have yet finished it.','Yes, I just have finished it.','Yes, I have finished it just.'], correct:0 },
      { speaker:0, text:'Have you ever been to London?', blank:false },
      { speaker:1, text:null, blank:true, opts:["No, I have never been there.","No, I have ever been there.","No, I never been there.","No, I have not never been there."], correct:0 },
      { speaker:0, text:'You should go!', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el adverbio incorrecto y elige la correccion.',
    sents:[
      { words:['I','have','finished','yet','.'], wi:3, correct:'already', choices:['already','yet','just','ever'] },
      { words:['Have','you','already','been','there','?'], wi:2, correct:'ever', choices:['ever','already','just','yet'] },
      { words:['She',"hasn't",'called','already','.'], wi:3, correct:'yet', choices:['yet','already','just','ever'] } ] }
]);

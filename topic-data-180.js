/* topic-data-180.js - Juego 180/350 | T26 5/7 REPORTED SPEECH | afirmaciones y preguntas (MEZCLADO) | Oro B1 */
_registerGames(180, 'Indirecto · Afirmaciones y Preguntas', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el discurso indirecto correcto.',
    items:[
      { src:'Me pregunto si queria ir', opts:['He asked me if I wanted to go','He asked me if I want to go','He asked me do I want to go','He asked me if did I want to go'], correct:0 },
      { src:'Ella le dijo que lo amaba', opts:['She told him that she loved him','She said him that she loved him','She told him that she loves him','She told that she loved him'], correct:0 },
      { src:'Preguntaron donde vivia ella', opts:['They asked where did she live','They asked where she lived','They asked where she lives','They asked where does she live'], correct:1 },
      { src:'Me pregunto si estaba listo', opts:['She asked me if I was ready','She asked me if I am ready','She asked me was I ready','She asked me if was I ready'], correct:0 },
      { src:'El dijo que estaba cansado', opts:['He said that he was tired','He told that he was tired','He said that he is tired','He say that he was tired'], correct:0 },
      { src:'Pregunto que hora era', opts:['He asked what time was it','He asked what time it was','He asked what time is it','He asked what time does it be'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada tipo de oracion con su forma indirecta.',
    pairs:[ ['yes/no question','asked if I wanted to go'],['WH question','asked where she lived'],['statement','said that she was tired'],['question with what','asked what time it was'],['statement with tell','told him that she loved him'],['yes/no with ready','asked if I was ready'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['D','E','K','S','A'],ans:'ASKED',hint:'pasado de ask'},{scrambled:['F','I'],ans:'IF',hint:'pregunta si/no'},{scrambled:['R','E','H','W','E'],ans:'WHERE',hint:'pregunta de lugar'},{scrambled:['T','A','H','T'],ans:'THAT',hint:'afirmacion'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada forma indirecta.',
    categories:['Afirmacion (that)','Pregunta (if/WH)'],
    items:[ {text:'said that she was tired',correct:0},{text:'asked if I wanted to go',correct:1},{text:'told him that she loved him',correct:0},{text:'asked where she lived',correct:1},{text:'said that he was busy',correct:0},{text:'asked what time it was',correct:1} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['if','He','asked','me','I','wanted','to','go'],ans:['He','asked','me','if','I','wanted','to','go']},{words:['where','They','asked','she','lived'],ans:['They','asked','where','she','lived']},{words:['that','She','told','him','she','loved','him'],ans:['She','told','him','that','she','loved','him']} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What did he ask?', blank:false },
      { speaker:1, text:null, blank:true, opts:['He asked if I wanted to go.','He asked do I want to go.','He asked if did I want to go.','He asked if I want to go.'], correct:0 },
      { speaker:0, text:'And what did she say?', blank:false },
      { speaker:1, text:null, blank:true, opts:['She said that she was busy.','She said that she is busy.','She told that she was busy.','She say that she was busy.'], correct:0 },
      { speaker:0, text:'I see.', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['He','asked','me','do','I','wanted','to','go','.'], wi:3, correct:'if', choices:['if','do','did','that'] },
      { words:['They','asked','where','she','lives','.'], wi:4, correct:'lived', choices:['lived','lives','live','living'] },
      { words:['She','said','him','that','she','loved','him','.'], wi:1, correct:'told', choices:['told','said','say','tell'] } ] }
]);

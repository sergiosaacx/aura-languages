/* topic-data-039.js - Juego 39/350 | T6 4/7 MINE & YOURS | Imperativos afirmativos y negativos (ESPECIALIZADO) | Bronce A1 */
_registerGames(39, 'Imperativos · Afirmativos y Negativos', [
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Como se forma el imperativo negativo?',
    opts:["Verbo + not","Don't + verbo","No + verbo","Not + verbo"], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca la forma correcta del imperativo.',
    sents:[
      { pre:'', ans:'Open', post:' the door, please.', bank:['Open','Opens','Opening','To open'] },
      { pre:'', ans:"Don't", post:' run in the hallway.', bank:["Don't","Not","No","Doesn't"] },
      { pre:'', ans:'Close', post:' the window.', bank:['Close','Closes','Closing','Closed'] },
      { pre:'', ans:'Sit', post:' down, please.', bank:['Sit','Sits','Sitting','To sit'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:['the','Open','door'], ans:['Open','the','door'] },
      { words:['run',"Don't",'here'], ans:["Don't",'run','here'] },
      { words:['please','Sit','down'], ans:['Sit','down','please'] } ] },
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['You','open','the','window','.'], wi:0, correct:'Open', choices:['Open','You','Opens','Opening'] },
      { words:['Not','run','here','.'], wi:0, correct:"Don't", choices:["Don't",'Not','No',"Doesn't"] },
      { words:['You','close','the','door','.'], wi:0, correct:'Close', choices:['Close','You','Closes','Closing'] } ] },
  { id:'transform', label:'Transforma', xp:35,
    instr:'Convierte cada imperativo afirmativo en negativo.',
    transforms:[
      { original:'Run!', task:'Hazlo negativo', opts:["Don't run!","Not run!","No run!","You run!"], correct:0 },
      { original:'Open the door!', task:'Hazlo negativo', opts:["Don't open the door!","Not open the door!","No open the door!","You open the door!"], correct:0 },
      { original:'Talk!', task:'Hazlo negativo', opts:["Don't talk!","Not talk!","No talk!","Talks not!"], correct:0 },
      { original:'Touch it!', task:'Hazlo negativo', opts:["Don't touch it!","Not touch it!","No touch it!","You touch it!"], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo con el imperativo correcto.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'I am cold.', blank:false },
      { speaker:1, text:null, blank:true, opts:['Close the window, please.','You close the window.','Closing the window.','To close the window.'], correct:0 },
      { speaker:0, text:'The baby is sleeping.', blank:false },
      { speaker:1, text:null, blank:true, opts:["Don't make noise.","Not make noise.","No make noise.","You make noise."], correct:0 },
      { speaker:0, text:'Okay.', blank:false } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada regla del imperativo es correcta.',
    stmts:[
      { text:"'Don't + verbo' forma el imperativo negativo.", ans:true, expl:"Correcto. Ej: Don't run!" },
      { text:'El imperativo usa "you" como sujeto siempre.', ans:false, expl:'Falso. El imperativo omite el sujeto.' },
      { text:'"Open the door!" es un imperativo afirmativo correcto.', ans:true, expl:'Correcto. Verbo base sin sujeto.' },
      { text:'"You sit down!" es la forma normal del imperativo.', ans:false, expl:'Falso. Se omite you: Sit down!' } ] }
]);

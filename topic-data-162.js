/* topic-data-162.js - Juego 162/350 | T24 1/7 IF I HAD | Condicional 2 (ESPECIALIZADO) | Oro B1 */
_registerGames(162, 'Condicional 2 · Hipotesis Presentes', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el condicional 2 correcto.',
    items:[
      { src:'Si tuviera dinero, viajaria', opts:['If I have money, I would travel','If I had money, I would travel','If I had money, I will travel','If I would have money, I travel'], correct:1 },
      { src:'Si fuera rico, compraria un coche', opts:['If I am rich, I would buy a car','If I were rich, I would buy a car','If I were rich, I will buy a car','If I would be rich, I buy a car'], correct:1 },
      { src:'Si supiera la respuesta, te lo diria', opts:['If I know the answer, I would tell you','If I knew the answer, I would tell you','If I knew the answer, I will tell you','If I would know, I tell you'], correct:1 },
      { src:'Si viviera cerca, te visitaria', opts:['If I live near, I would visit you','If I lived near, I would visit you','If I lived near, I will visit you','If I would live near, I visit you'], correct:1 },
      { src:'Si tuviera tiempo, ayudaria', opts:['If I have time, I would help','If I had time, I would help','If I had time, I will help','If I would have time, I help'], correct:1 },
      { src:'Si hablara frances, conseguiria el trabajo', opts:['If I speak French, I would get the job','If I spoke French, I would get the job','If I spoke French, I will get the job','If I would speak French, I get the job'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Como se forma el condicional 2?', opts:['if + present + will','if + past + would','if + past + will','if + would + past'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'If I had money, I ', ans:'would', post:' travel.', bank:['would','will','had','have'] },
      { pre:'If she ', ans:'knew', post:' the answer, she would tell us.', bank:['knew','knows','will know','would know'] },
      { pre:'I would help if I ', ans:'had', post:' time.', bank:['had','have','will have','would have'] },
      { pre:'If I ', ans:'were', post:' you, I would apologize.', bank:['were','am','will be','would be'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['D','L','U','O','W'],ans:'WOULD',hint:'condicional 2'},{scrambled:['D','A','H'],ans:'HAD',hint:'if I ... money'},{scrambled:['F','I'],ans:'IF',hint:'condicional'},{scrambled:['L','E','V','A','R','T'],ans:'TRAVEL',hint:'I would ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'El condicional 2 usa "if + pasado simple + would".', ans:true, expl:'Correcto. If I had money, I would travel.' },
      { text:'"If I have money, I would travel." es correcto.', ans:false, expl:'Falso. If I had money.' },
      { text:'"If I had a car, I would drive." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"If I would have money, I travel." es correcto.', ans:false, expl:'Falso. No se usa would en la clausula if.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma el condicional 2.',
    transforms:[
      { original:'have money / travel', task:'Cond. 2', opts:['If I had money, I would travel.','If I have money, I would travel.','If I had money, I will travel.','If I would have money, I travel.'], correct:0 },
      { original:'know answer / tell you', task:'Cond. 2', opts:['If I knew the answer, I would tell you.','If I know the answer, I would tell you.','If I knew the answer, I will tell you.','If I would know, I tell you.'], correct:0 },
      { original:'be rich / buy a house', task:'Cond. 2', opts:['If I were rich, I would buy a house.','If I am rich, I would buy a house.','If I were rich, I will buy a house.','If I would be rich, I buy a house.'], correct:0 },
      { original:'live near / visit you', task:'Cond. 2', opts:['If I lived near, I would visit you.','If I live near, I would visit you.','If I lived near, I will visit you.','If I would live near, I visit you.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What would you do if you won the lottery?', blank:false },
      { speaker:1, text:null, blank:true, opts:['If I won, I would travel the world.','If I win, I would travel the world.','If I won, I will travel the world.','If I would win, I travel the world.'], correct:0 },
      { speaker:0, text:'And if you had more time?', blank:false },
      { speaker:1, text:null, blank:true, opts:['If I had time, I would learn the piano.','If I have time, I would learn the piano.','If I had time, I will learn the piano.','If I would have time, I learn the piano.'], correct:0 },
      { speaker:0, text:'Nice dreams!', blank:false } ] }
]);

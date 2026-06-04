/* topic-data-094.js - Juego 94/350 | T14 3/7 WHAT'S HAPPENING? | Simple vs Continuo (ESPECIALIZADO) | Plata A2 */
_registerGames(94, 'Presente Simple vs Continuo', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta segun el contexto.',
    items:[
      { src:'Ella trabaja a las 9 (rutina)', opts:['She is working at 9','She works at 9','She work at 9','She working at 9'], correct:1 },
      { src:'Ella esta trabajando ahora', opts:['She works now','She is working now','She working now','She work now'], correct:1 },
      { src:'Yo leo todos los dias', opts:['I am reading every day','I read every day','I reading every day','I reads every day'], correct:1 },
      { src:'Yo estoy leyendo ahora', opts:['I read now','I am reading now','I reading now','I reads now'], correct:1 },
      { src:'Ellos juegan los lunes', opts:['They are playing on Mondays','They play on Mondays','They playing on Mondays','They plays on Mondays'], correct:1 },
      { src:'Ellos estan jugando ahora', opts:['They play now','They are playing now','They playing now','They plays now'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada expresion con su tiempo verbal.',
    pairs:[ ['every day','present simple'],['now','present continuous'],['usually','present simple (frecuencia)'],['at the moment','present continuous (momento)'],['on Mondays','present simple (dias)'],['right now','present continuous (ahora)'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['W','O','N'],ans:'NOW',hint:'senal de continuo'},{scrambled:['L','A','U','S','U','Y','L'],ans:'USUALLY',hint:'senal de simple'},{scrambled:['G','N','I','K','R','O','W'],ans:'WORKING',hint:'-ing de work'},{scrambled:['S','K','R','O','W'],ans:'WORKS',hint:'simple 3ra persona'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'El presente simple se usa para rutinas y habitos.', ans:true, expl:'Correcto. every day, usually.' },
      { text:'"She is working now." describe una rutina.', ans:false, expl:'Falso. now -> accion en progreso.' },
      { text:'El presente continuo describe algo que pasa ahora.', ans:true, expl:'Correcto. now, at the moment.' },
      { text:'"I read now." es correcto para algo en progreso.', ans:false, expl:'Falso. I am reading now.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la forma correcta segun la pista.',
    transforms:[
      { original:'She works. (now)', task:'Continuo', opts:['She is working now.','She works now.','She working now.','She is works now.'], correct:0 },
      { original:'I read. (every day)', task:'Simple', opts:['I read every day.','I am reading every day.','I reading every day.','I reads every day.'], correct:0 },
      { original:'They play. (at the moment)', task:'Continuo', opts:['They are playing at the moment.','They play at the moment.','They playing at the moment.','They are play at the moment.'], correct:0 },
      { original:'He studies. (usually)', task:'Simple', opts:['He usually studies.','He is usually studying.','He usually studying.','He usually study.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What are you doing now?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I am cooking dinner.','I cook dinner.','I cooking dinner.','I cooks dinner.'], correct:0 },
      { speaker:0, text:'Do you cook every day?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I cook every day.','Yes, I am cooking every day.','Yes, I cooking every day.','Yes, I cooks every day.'], correct:0 },
      { speaker:0, text:'Great!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada oracion como rutina o accion en progreso.',
    categories:['Rutina (Simple)','Ahora (Continuo)'],
    items:[ {text:'I work every day',correct:0},{text:'I am working now',correct:1},{text:'She plays on Mondays',correct:0},{text:'She is playing now',correct:1},{text:'They study usually',correct:0},{text:'They are studying now',correct:1} ] }
]);

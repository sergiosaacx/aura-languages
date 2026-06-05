/* topic-data-155.js - Juego 155/350 | T23 1/7 WILL & MIGHT | will futuro simple (ESPECIALIZADO) | Oro B1 */
_registerGames(155, 'Will · Futuro y Predicciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta con will/won\'t.',
    items:[
      { src:'Llovera manana', opts:['It will rain tomorrow','It rains tomorrow','It is raining tomorrow','It would rain tomorrow'], correct:0 },
      { src:'No vendre a la fiesta', opts:["I won't come to the party","I don't come to the party","I am not coming to the party","I wouldn't come to the party"], correct:0 },
      { src:'Ella sera doctora', opts:['She will be a doctor','She is a doctor','She would be a doctor','She is being a doctor'], correct:0 },
      { src:'Te ayudare', opts:['I will help you','I help you','I am helping you','I would help you'], correct:0 },
      { src:'Ellos ganaran el partido', opts:['They will win the match','They win the match','They are winning the match','They would win the match'], correct:0 },
      { src:'No funcionara', opts:["It won't work","It doesn't work","It is not working","It wouldn't work"], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Como se forma el futuro simple?', opts:['will + infinitivo','will + -ing','going to + will','would + infinitivo'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'It ', ans:'will', post:' rain tomorrow.', bank:['will','would','is','does'] },
      { pre:'I ', ans:"won't", post:' be late.', bank:["won't","don't","wouldn't","isn't"] },
      { pre:'She will ', ans:'be', post:' a great teacher.', bank:['be','being','is','was'] },
      { pre:'They ', ans:'will', post:' arrive soon.', bank:['will','would','are','do'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra (sin apostrofo).',
    words:[ {scrambled:['L','I','W','L'],ans:'WILL',hint:'futuro simple'},{scrambled:['T','N','O','W'],ans:'WONT',hint:'will + not'},{scrambled:['N','I','A','R'],ans:'RAIN',hint:'it will ...'},{scrambled:['E','B'],ans:'BE',hint:'will ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"will + infinitivo" forma el futuro simple.', ans:true, expl:'Correcto. It will rain.' },
      { text:'"It will to rain." es correcto.', ans:false, expl:'Falso. will + infinitivo sin to.' },
      { text:'"won\'t" es la contraccion de "will not".', ans:true, expl:'Correcto.' },
      { text:'"She wills come." es correcto.', ans:false, expl:'Falso. She will come (sin -s).' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma el futuro con will.',
    transforms:[
      { original:'rain', task:'Con will', opts:['It will rain.','It wills rain.','It will to rain.','It will raining.'], correct:0 },
      { original:'help you', task:'Con will', opts:['I will help you.','I will to help you.','I wills help you.','I will helping you.'], correct:0 },
      { original:'not be late', task:"Con won't", opts:["I won't be late.","I don't be late.","I wouldn't be late.","I am not late."], correct:0 },
      { original:'be a doctor', task:'Con will', opts:['She will be a doctor.','She wills be a doctor.','She will to be a doctor.','She will being a doctor.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con will.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What will the weather be like?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It will be sunny.','It wills be sunny.','It will to be sunny.','It will being sunny.'], correct:0 },
      { speaker:0, text:'Will you come to my party?', blank:false },
      { speaker:1, text:null, blank:true, opts:["Yes, I will come.","Yes, I will to come.","Yes, I wills come.","Yes, I will coming."], correct:0 },
      { speaker:0, text:'Great!', blank:false } ] }
]);

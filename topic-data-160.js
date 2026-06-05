/* topic-data-160.js - Juego 160/350 | T23 6/7 WILL & MIGHT | modales de futuro en conversacion (MEZCLADO) | Oro B1 */
_registerGames(160, 'Modales de Futuro · En Conversacion', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'I am not sure, but I ___ go to the party.', opts:['will','might','wont','am going'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el modal segun el grado de certeza.',
    sents:[
      { pre:'I am not sure, but I ', ans:'might', post:' go to the party.', bank:['might','will','am going','used to'] },
      { pre:'Do not worry, I ', ans:'will', post:' help you.', bank:['will','might','may','used to'] },
      { pre:'She ', ans:'may', post:' be at home, I saw her car.', bank:['may','will','must','used to'] },
      { pre:'It ', ans:"won't", post:' rain, the sky is clear.', bank:["won't","might","may","used to"] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"might" expresa duda o poca certeza.', ans:true, expl:'Correcto. I might go.' },
      { text:'Para tranquilizar a alguien se usa "will" (promesa).', ans:true, expl:'Correcto. I will help you.' },
      { text:'"might" expresa total certeza.', ans:false, expl:'Falso. might = poca certeza.' },
      { text:'"will" expresa duda.', ans:false, expl:'Falso. will = certeza/decision.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el modal de futuro correcto.',
    transforms:[
      { original:'duda: go to party', task:'Modal', opts:['I might go to the party.','I will go to the party.','I might to go to the party.','I am going go to the party.'], correct:0 },
      { original:'promesa: help you', task:'Modal', opts:['I will help you.','I might help you.','I will to help you.','I am going help you.'], correct:0 },
      { original:'posibilidad: she / be home', task:'Modal', opts:['She may be home.','She will be home.','She may to be home.','She mays be home.'], correct:0 },
      { original:'seguro que no: rain', task:'Modal', opts:["It won't rain.","It might rain.","It may rain.","It won't to rain."], correct:0 } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I might go to the party.', type:'select', opts:['I might go to the party.','I might to go to the party.','I mights go to the party.','I might going to the party.'], correct:0 },
      { tts:'I will help you.', type:'select', opts:['I will help you.','I will to help you.','I wills help you.','I will helping you.'], correct:0 },
      { tts:'She may be at home.', type:'select', opts:['She may be at home.','She may to be at home.','She mays be at home.','She may being at home.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Will you come tonight?', blank:false },
      { speaker:1, text:null, blank:true, opts:["I am not sure, I might come.","I am not sure, I will come.","I am not sure, I might to come.","I am not sure, I am going come."], correct:0 },
      { speaker:0, text:'I need help with this.', blank:false },
      { speaker:1, text:null, blank:true, opts:["Do not worry, I will help you.","Do not worry, I might help you.","Do not worry, I will to help you.","Do not worry, I help you."], correct:0 },
      { speaker:0, text:'Thank you!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada modal segun la certeza.',
    categories:['Certeza (will)','Posibilidad (may/might)'],
    items:[ {text:'will help',correct:0},{text:'might go',correct:1},{text:"won't rain",correct:0},{text:'may be',correct:1},{text:'will win',correct:0},{text:'might come',correct:1} ] }
]);

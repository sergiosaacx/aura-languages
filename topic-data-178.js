/* topic-data-178.js - Juego 178/350 | T26 3/7 REPORTED SPEECH | Backshift (ESPECIALIZADO) | Oro B1 */
_registerGames(178, 'Backshift · Cambio de Tiempos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el indirecto con el backshift correcto.',
    items:[
      { src:'Dijo: "Trabajo aqui"', opts:['He said he works here','He said he worked here','He said he will work here','He said he work here'], correct:1 },
      { src:'Dijo: "Te ayudare"', opts:['She said she will help me','She said she would help me','She said she helps me','She said she helped me'], correct:1 },
      { src:'Dijo: "Puedo nadar"', opts:['He said he can swim','He said he could swim','He said he swims','He said he would swim'], correct:1 },
      { src:'Dijo: "Estoy ocupado"', opts:['He said he is busy','He said he was busy','He said he will be busy','He said he were busy'], correct:1 },
      { src:'Dijo: "Vivo en Paris"', opts:['She said she lives in Paris','She said she lived in Paris','She said she will live in Paris','She said she live in Paris'], correct:1 },
      { src:'Dijo: "Lo hare"', opts:['He said he will do it','He said he would do it','He said he does it','He said he did it'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada forma directa con su forma indirecta.',
    pairs:[ ['work (present)','worked'],['will help','would help'],['can swim','could swim'],['is busy','was busy'],['am eating','was eating'],['have done','had done'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra del backshift.',
    words:[ {scrambled:['D','L','U','O','W'],ans:'WOULD',hint:'will se vuelve...'},{scrambled:['D','L','U','O','C'],ans:'COULD',hint:'can se vuelve...'},{scrambled:['S','A','W'],ans:'WAS',hint:'is/am se vuelve...'},{scrambled:['D','A','H'],ans:'HAD',hint:'have se vuelve...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada regla es correcta.',
    stmts:[
      { text:'"will" cambia a "would" en discurso indirecto.', ans:true, expl:'Correcto. I will -> he would.' },
      { text:'"can" cambia a "could" en discurso indirecto.', ans:true, expl:'Correcto. I can -> he could.' },
      { text:'"is" no cambia en discurso indirecto.', ans:false, expl:'Falso. is -> was.' },
      { text:'El presente simple cambia a pasado simple.', ans:true, expl:'Correcto. works -> worked.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Aplica el backshift al pasar a indirecto.',
    transforms:[
      { original:'"I work here," he said.', task:'Backshift', opts:['He said he worked here.','He said he works here.','He said he will work here.','He said he work here.'], correct:0 },
      { original:'"I will help," she said.', task:'Backshift', opts:['She said she would help.','She said she will help.','She said she helps.','She said she helped.'], correct:0 },
      { original:'"I can swim," he said.', task:'Backshift', opts:['He said he could swim.','He said he can swim.','He said he swims.','He said he would swim.'], correct:0 },
      { original:'"I am busy," he said.', task:'Backshift', opts:['He said he was busy.','He said he is busy.','He said he will be busy.','He said he were busy.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con el backshift.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'He said: "I will come."', blank:false },
      { speaker:1, text:null, blank:true, opts:['So he said he would come.','So he said he will come.','So he said he comes.','So he said he came.'], correct:0 },
      { speaker:0, text:'She said: "I can drive."', blank:false },
      { speaker:1, text:null, blank:true, opts:['So she said she could drive.','So she said she can drive.','So she said she drives.','So she said she would drive.'], correct:0 },
      { speaker:0, text:'I understand.', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada cambio de backshift.',
    categories:['Presente -> Pasado','Modal -> Modal pasado'],
    items:[ {text:'work -> worked',correct:0},{text:'will -> would',correct:1},{text:'is -> was',correct:0},{text:'can -> could',correct:1},{text:'live -> lived',correct:0},{text:'may -> might',correct:1} ] }
]);

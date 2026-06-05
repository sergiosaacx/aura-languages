/* topic-data-176.js - Juego 176/350 | T26 1/7 REPORTED SPEECH | estructura basica (ESPECIALIZADO) | Oro B1 */
_registerGames(176, 'Discurso Indirecto · Estructura Basica', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el discurso indirecto correcto.',
    items:[
      { src:'Ella dijo que estaba cansada', opts:['She said that she is tired','She said that she was tired','She say that she was tired','She told that she was tired'], correct:1 },
      { src:'El me dijo que llamaria', opts:['He told me that he will call','He told me that he would call','He said me that he would call','He told that he would call'], correct:1 },
      { src:'Dijeron que tenian hambre', opts:['They said that they are hungry','They said that they were hungry','They told that they were hungry','They say that they were hungry'], correct:1 },
      { src:'Ella dijo que le gustaba', opts:['She said that she likes it','She said that she liked it','She said that she like it','She told that she liked it'], correct:1 },
      { src:'El dijo que estaba ocupado', opts:['He said that he is busy','He said that he was busy','He say that he was busy','He told that he was busy'], correct:1 },
      { src:'Dijo que volveria pronto', opts:['She said that she will return soon','She said that she would return soon','She told that she would return soon','She say that she would return'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'En discurso indirecto, "I am tired" se vuelve...', opts:['I was tired','I am tired','I will be tired','I were tired'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'She said that she ', ans:'was', post:' tired.', bank:['was','is','were','will be'] },
      { pre:'He told me that he ', ans:'would', post:' call.', bank:['would','will','can','was'] },
      { pre:'They said that they ', ans:'were', post:' hungry.', bank:['were','are','was','will'] },
      { pre:'She said that she ', ans:'liked', post:' it.', bank:['liked','likes','like','will like'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['D','I','A','S'],ans:'SAID',hint:'pasado de say'},{scrambled:['D','L','O','T'],ans:'TOLD',hint:'pasado de tell'},{scrambled:['T','A','H','T'],ans:'THAT',hint:'conector del indirecto'},{scrambled:['S','A','W'],ans:'WAS',hint:'is se vuelve...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'En discurso indirecto, "is" cambia a "was".', ans:true, expl:'Correcto. She said she was tired.' },
      { text:'"She said that she is tired." es discurso indirecto correcto.', ans:false, expl:'Falso. she was tired (backshift).' },
      { text:'Se puede usar "that" para introducir el discurso indirecto.', ans:true, expl:'Correcto. She said that...' },
      { text:'"He told me that he would call." es correcto.', ans:true, expl:'Correcto. will -> would.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Convierte el estilo directo en indirecto.',
    transforms:[
      { original:'"I am tired," she said.', task:'Indirecto', opts:['She said that she was tired.','She said that she is tired.','She told that she was tired.','She said that I was tired.'], correct:0 },
      { original:'"I will call," he told me.', task:'Indirecto', opts:['He told me that he would call.','He told me that he will call.','He said me that he would call.','He told that he would call.'], correct:0 },
      { original:'"We are hungry," they said.', task:'Indirecto', opts:['They said that they were hungry.','They said that they are hungry.','They told that they were hungry.','They said that we were hungry.'], correct:0 },
      { original:'"I like it," she said.', task:'Indirecto', opts:['She said that she liked it.','She said that she likes it.','She told that she liked it.','She said that I liked it.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What did Anna say?', blank:false },
      { speaker:1, text:null, blank:true, opts:['She said that she was busy.','She said that she is busy.','She told that she was busy.','She say that she was busy.'], correct:0 },
      { speaker:0, text:'And Tom?', blank:false },
      { speaker:1, text:null, blank:true, opts:['He told me that he would come.','He told me that he will come.','He said me that he would come.','He told that he would come.'], correct:0 },
      { speaker:0, text:'Great.', blank:false } ] }
]);

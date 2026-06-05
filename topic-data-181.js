/* topic-data-181.js - Juego 181/350 | T26 6/7 REPORTED SPEECH | directo a indirecto (MEZCLADO) | Oro B1 */
_registerGames(181, 'Transformar Directo a Indirecto', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el discurso indirecto correcto.',
    items:[
      { src:'"Te ayudare"', opts:['She said that she will help me','She said that she would help me','She said that she helps me','She told that she would help me'], correct:1 },
      { src:'"Estoy cansado"', opts:['He said that he is tired','He said that he was tired','He told that he was tired','He say that he was tired'], correct:1 },
      { src:'"Puedo conducir"', opts:['She said that she can drive','She said that she could drive','She said that she drives','She told that she could drive'], correct:1 },
      { src:'"Vivimos aqui"', opts:['They said that they live there','They said that they lived there','They said that they lived here','They told that they lived there'], correct:1 },
      { src:'"Lo terminare manana"', opts:['He said he would finish it tomorrow','He said he would finish it the next day','He said he will finish it the next day','He said he finishes it the next day'], correct:1 },
      { src:'"Me gusta"', opts:['She said that she likes it','She said that she liked it','She told that she liked it','She say that she liked it'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"I will help you," she said. -> She said that she ___ help me.', opts:['will','would','can','helps'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta del indirecto.',
    sents:[
      { pre:'She said that she ', ans:'would', post:' help me.', bank:['would','will','can','helped'] },
      { pre:'He said that he ', ans:'was', post:' tired.', bank:['was','is','were','will be'] },
      { pre:'She said that she ', ans:'could', post:' drive.', bank:['could','can','would','drives'] },
      { pre:'They said that they ', ans:'lived', post:' there.', bank:['lived','live','will live','living'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['would','She','said','she','help','me'],ans:['She','said','she','would','help','me']},{words:['was','He','said','he','tired'],ans:['He','said','he','was','tired']},{words:['could','She','said','she','drive'],ans:['She','said','she','could','drive']} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Convierte el estilo directo en indirecto.',
    transforms:[
      { original:'"I will help you," she said.', task:'Indirecto', opts:['She said that she would help me.','She said that she will help me.','She told that she would help me.','She said that she helps me.'], correct:0 },
      { original:'"I am tired," he said.', task:'Indirecto', opts:['He said that he was tired.','He said that he is tired.','He told that he was tired.','He said that I was tired.'], correct:0 },
      { original:'"I can drive," she said.', task:'Indirecto', opts:['She said that she could drive.','She said that she can drive.','She said that she drives.','She told that she could drive.'], correct:0 },
      { original:'"We live here," they said.', task:'Indirecto', opts:['They said that they lived there.','They said that they live there.','They said that they lived here.','They told that they lived there.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'She said: "I will help you."', blank:false },
      { speaker:1, text:null, blank:true, opts:['So she said she would help me.','So she said she will help me.','So she told she would help me.','So she said she helps me.'], correct:0 },
      { speaker:0, text:'He said: "I am tired."', blank:false },
      { speaker:1, text:null, blank:true, opts:['So he said he was tired.','So he said he is tired.','So he told he was tired.','So he said he were tired.'], correct:0 },
      { speaker:0, text:'Got it.', blank:false } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'She said that she would help me.', type:'select', opts:['She said that she would help me.','She said that she will help me.','She told that she would help me.','She said that she helps me.'], correct:0 },
      { tts:'He said that he was tired.', type:'select', opts:['He said that he was tired.','He said that he is tired.','He told that he was tired.','He said that he were tired.'], correct:0 },
      { tts:'They said that they lived there.', type:'select', opts:['They said that they lived there.','They said that they live there.','They said that they lived here.','They told that they lived there.'], correct:0 } ] }
]);

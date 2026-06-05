/* topic-data-132.js - Juego 132/350 | T19 6/7 IF YOU... | formas verbales en condicionales (MEZCLADO) | Plata A2 */
_registerGames(132, 'Condicionales · Formas Verbales', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'If she ___ (study), she will pass.', opts:['study','studies','will study','studied'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma verbal correcta.',
    sents:[
      { pre:'If she ', ans:'studies', post:', she will pass.', bank:['studies','will study','studied','study'] },
      { pre:'If you touch fire, it ', ans:'burns', post:' you.', bank:['burns','will burn','burned','burning'] },
      { pre:'If it rains, we ', ans:'will', post:' stay home.', bank:['will','are','do','would'] },
      { pre:'Water freezes if you ', ans:'cool', post:' it enough.', bank:['cool','will cool','cooled','cooling'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"If she studies, she will pass." es correcto (cond. 1).', ans:true, expl:'Correcto. if + present, will.' },
      { text:'"If you touch fire, it burns you." es correcto (cond. zero).', ans:true, expl:'Correcto. hecho general.' },
      { text:'"If she will study, she passes." es correcto.', ans:false, expl:'Falso. No se usa will en la clausula if.' },
      { text:'"If it rains, I will stayed home." es correcto.', ans:false, expl:'Falso. will + infinitivo: will stay.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige las formas verbales correctas.',
    transforms:[
      { original:'she study / she pass', task:'Cond. 1', opts:['If she studies, she will pass.','If she will study, she passes.','If she study, she will pass.','If she studied, she pass.'], correct:0 },
      { original:'touch fire / burn (hecho)', task:'Cond. Zero', opts:['If you touch fire, it burns you.','If you touch fire, it will burn you.','If you will touch fire, it burns you.','If you touched fire, it burns you.'], correct:0 },
      { original:'rain / stay home (futuro)', task:'Cond. 1', opts:['If it rains, I will stay home.','If it rains, I stay home.','If it will rain, I stay home.','If it rained, I stay home.'], correct:0 },
      { original:'heat ice / melt (hecho)', task:'Cond. Zero', opts:['If you heat ice, it melts.','If you heat ice, it will melt.','If you will heat ice, it melts.','If you heated ice, it melts.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What will happen if she studies?', blank:false },
      { speaker:1, text:null, blank:true, opts:['If she studies, she will pass.','If she will study, she passes.','If she study, she will pass.','If she studied, she pass.'], correct:0 },
      { speaker:0, text:'What happens if you touch fire?', blank:false },
      { speaker:1, text:null, blank:true, opts:['If you touch fire, it burns you.','If you touch fire, it will burns you.','If you will touch fire, it burns you.','If you touched fire, it burns you.'], correct:0 },
      { speaker:0, text:'Careful!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada parte segun su forma verbal.',
    categories:['Clausula if (presente)','Clausula resultado'],
    items:[ {text:'she studies',correct:0},{text:'she will pass',correct:1},{text:'you touch',correct:0},{text:'it burns',correct:1},{text:'it rains',correct:0},{text:'I will stay',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'If she studies, she will pass.', type:'select', opts:['If she studies, she will pass.','If she will study, she passes.','If she study, she will pass.','If she studied, she pass.'], correct:0 },
      { tts:'If you touch fire, it burns you.', type:'select', opts:['If you touch fire, it burns you.','If you touch fire, it will burns you.','If you will touch fire, it burns you.','If you touched fire, it burns you.'], correct:0 },
      { tts:'If it rains, I will stay home.', type:'select', opts:['If it rains, I will stay home.','If it will rain, I will stay home.','If it rains, I stay home.','If it rained, I will stay home.'], correct:0 } ] }
]);

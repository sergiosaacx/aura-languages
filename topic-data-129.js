/* topic-data-129.js - Juego 129/350 | T19 3/7 IF YOU... | Zero vs First (ESPECIALIZADO) | Plata A2 */
_registerGames(129, 'Zero vs First Conditional', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta segun el tipo.',
    items:[
      { src:'hecho general (siempre verdad)', opts:['If you heat ice, it melts','If you heat ice, it will melt','If you will heat ice, it melts','If you heated ice, it melts'], correct:0 },
      { src:'posibilidad futura', opts:['If it rains, I stay home','If it rains, I will stay home','If it will rain, I stay home','If it rained, I stay home'], correct:1 },
      { src:'verdad cientifica', opts:['Water boils if you heat it','Water will boil if you heat it','Water boils if you will heat it','Water boiled if you heat it'], correct:0 },
      { src:'plan posible', opts:['If you study, you pass','If you study, you will pass','If you will study, you pass','If you studied, you pass'], correct:1 },
      { src:'rutina/habito', opts:['If I am tired, I sleep','If I am tired, I will sleep','If I will be tired, I sleep','If I was tired, I sleep'], correct:0 },
      { src:'evento futuro probable', opts:['If she calls, I answer','If she calls, I will answer','If she will call, I answer','If she called, I answer'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada oracion con su tipo de condicional.',
    pairs:[ ['Water boils if you heat it','Zero (siempre verdad)'],['If it rains, I will stay','First (posible futuro)'],['If you mix colors, you get new ones','Zero (hecho)'],['If you study, you will pass','First (posibilidad)'],['Ice melts if it gets warm','Zero (general)'],['If they come, we will eat','First (futuro)'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['F','I'],ans:'IF',hint:'condicional'},{scrambled:['L','I','W','L'],ans:'WILL',hint:'condicional 1'},{scrambled:['O','R','E','Z'],ans:'ZERO',hint:'condicional de hechos'},{scrambled:['T','S','R','I','F'],ans:'FIRST',hint:'condicional de posibilidad'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'El condicional zero describe hechos siempre verdaderos.', ans:true, expl:'Correcto. If + present, present.' },
      { text:'El condicional 1 describe hechos cientificos.', ans:false, expl:'Falso. El 1 describe posibilidades futuras.' },
      { text:'"If it rains, I will stay home." es condicional 1.', ans:true, expl:'Correcto. posibilidad futura.' },
      { text:'"Water boils if you heat it." es condicional 1.', ans:false, expl:'Falso. Es zero (hecho general).' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el condicional correcto.',
    transforms:[
      { original:'hecho: heat ice / melt', task:'Zero o First', opts:['If you heat ice, it melts.','If you heat ice, it will melt.','If you will heat ice, it melts.','If you heated ice, it melts.'], correct:0 },
      { original:'futuro: rain / stay home', task:'Zero o First', opts:['If it rains, I will stay home.','If it rains, I stay home.','If it will rain, I stay home.','If it rained, I stay home.'], correct:0 },
      { original:'hecho: no sun / cold', task:'Zero o First', opts:['If there is no sun, it gets cold.','If there is no sun, it will get cold.','If there will be no sun, it gets cold.','If there was no sun, it gets cold.'], correct:0 },
      { original:'futuro: study / pass', task:'Zero o First', opts:['If you study, you will pass.','If you study, you pass.','If you will study, you pass.','If you studied, you pass.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What happens if you mix red and blue?', blank:false },
      { speaker:1, text:null, blank:true, opts:['If you mix them, you get purple.','If you mix them, you will get purple.','If you will mix them, you get purple.','If you mixed them, you get purple.'], correct:0 },
      { speaker:0, text:'What will you do if it rains tomorrow?', blank:false },
      { speaker:1, text:null, blank:true, opts:['If it rains, I will stay home.','If it rains, I stay home.','If it will rain, I stay home.','If it rained, I stay home.'], correct:0 },
      { speaker:0, text:'Good plan!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada oracion como Zero o First.',
    categories:['Zero (hecho)','First (posibilidad)'],
    items:[ {text:'Water boils if heated',correct:0},{text:'If it rains I will stay',correct:1},{text:'Ice melts if warm',correct:0},{text:'If you study you will pass',correct:1},{text:'If you mix colors you get new',correct:0},{text:'If she comes we will eat',correct:1} ] }
]);

/* topic-data-167.js - Juego 167/350 | T24 6/7 IF I HAD | Cond 2 y wish en contexto (MEZCLADO) | Oro B1 */
_registerGames(167, 'Condicional 2 y Wish · En Contexto', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'If I ___ (be) you, I would not say that.', opts:['am','were','was','will be'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'If I ', ans:'were', post:' you, I would not say that.', bank:['were','am','was','will be'] },
      { pre:'I wish I ', ans:'could', post:' fly.', bank:['could','can','will','would'] },
      { pre:'If she ', ans:'had', post:' a car, she would drive.', bank:['had','has','will have','would have'] },
      { pre:'I wish it ', ans:'were', post:' summer.', bank:['were','is','will be','would be'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"If I were you, I wouldn\'t do that." es correcto.', ans:true, expl:'Correcto. cond 2 con were.' },
      { text:'"I wish I could fly." es correcto.', ans:true, expl:'Correcto. wish + could.' },
      { text:'"If I was you, I will help." es correcto.', ans:false, expl:'Falso. If I were you, I would help.' },
      { text:'"I wish I can fly." es correcto.', ans:false, expl:'Falso. I wish I could fly.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion correcta.',
    transforms:[
      { original:'be you / not say that', task:'Cond. 2', opts:["If I were you, I wouldn't say that.","If I am you, I won't say that.","If I were you, I won't say that.","If I would be you, I not say that."], correct:0 },
      { original:'wish: can fly', task:'Wish', opts:['I wish I could fly.','I wish I can fly.','I wish I will fly.','I hope I could fly.'], correct:0 },
      { original:'have a car / drive', task:'Cond. 2', opts:['If I had a car, I would drive.','If I have a car, I will drive.','If I had a car, I will drive.','If I would have a car, I drive.'], correct:0 },
      { original:'wish: be on holiday', task:'Wish', opts:['I wish I were on holiday.','I wish I am on holiday.','I wish I will be on holiday.','I hope I were on holiday.'], correct:0 } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:"If I were you, I wouldn't say that.", type:'select', opts:["If I were you, I wouldn't say that.","If I was you, I won't say that.","If I am you, I wouldn't say that.","If I were you, I won't say that."], correct:0 },
      { tts:'I wish I could fly.', type:'select', opts:['I wish I could fly.','I wish I can fly.','I wish I will fly.','I wish I would fly.'], correct:0 },
      { tts:'If she had a car, she would drive.', type:'select', opts:['If she had a car, she would drive.','If she has a car, she will drive.','If she had a car, she will drive.','If she would have a car, she drives.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Should I tell him the truth?', blank:false },
      { speaker:1, text:null, blank:true, opts:["If I were you, I would tell him.","If I was you, I will tell him.","If I were you, I will tell him.","If I would be you, I tell him."], correct:0 },
      { speaker:0, text:'I want a superpower.', blank:false },
      { speaker:1, text:null, blank:true, opts:['I wish I could fly.','I wish I can fly.','I wish I will fly.','I hope I could fly.'], correct:0 },
      { speaker:0, text:'Me too!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada estructura como condicional 2 o wish.',
    categories:['Condicional 2','Wish'],
    items:[ {text:'If I were you',correct:0},{text:'I wish I could fly',correct:1},{text:'If she had a car',correct:0},{text:'I wish I were rich',correct:1},{text:'If I knew it',correct:0},{text:'I wish I lived there',correct:1} ] }
]);

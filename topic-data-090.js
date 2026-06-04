/* topic-data-090.js - Juego 90/350 | T13 6/7 GOING TO | planes futuros en conversacion (MEZCLADO) | Plata A2 */
_registerGames(90, 'Planes Futuros · En Conversacion', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'What are you ___ do this weekend?', opts:['go to','going to','will to','want'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta.',
    sents:[
      { pre:'What are you ', ans:'going', post:' to do this weekend?', bank:['go','going','will','goes'] },
      { pre:'I ', ans:'want', post:' to visit my family.', bank:['want','would','going','am'] },
      { pre:'She would ', ans:'like', post:' to learn French.', bank:['like','want','going','to'] },
      { pre:'We are going ', ans:'to', post:' relax.', bank:['to','for','at','of'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"I am going to rest." es un plan correcto.', ans:true, expl:'Correcto. going to + infinitivo.' },
      { text:'"I want visit my family." es correcto.', ans:false, expl:'Falso. Falta to: I want to visit.' },
      { text:'"She would like to learn." es correcto.', ans:true, expl:'Correcto. would like to + infinitivo.' },
      { text:'"What are you going do?" es correcto.', ans:false, expl:'Falso. Falta to: going to do.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Completa cada plan correctamente.',
    transforms:[
      { original:'plan: yo / descansar', task:'Going to', opts:['I am going to rest.','I going to rest.','I am go to rest.','I will going to rest.'], correct:0 },
      { original:'deseo formal: yo / un te', task:'Would like', opts:['I would like a tea.','I want a tea.','I would want a tea.','I like a tea.'], correct:0 },
      { original:'deseo: ellos / viajar', task:'Want to', opts:['They want to travel.','They want travel.','They wants to travel.','They would travel.'], correct:0 },
      { original:'plan: ella / estudiar', task:'Going to', opts:['She is going to study.','She going to study.','She is go to study.','She are going to study.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo sobre planes.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What are you going to do tomorrow?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I am going to study.','I going to study.','I am go to study.','I will going to study.'], correct:0 },
      { speaker:0, text:'Would you like to come to dinner?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I would like to come.','Yes, I want come.','Yes, I would want to come.','Yes, I like come.'], correct:0 },
      { speaker:0, text:'Perfect!', blank:false } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['going','I','am','to','rest'],ans:['I','am','going','to','rest']},{words:['like','would','I','to','help'],ans:['I','would','like','to','help']},{words:['want','We','to','travel'],ans:['We','want','to','travel']} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I am going to study.', type:'select', opts:['I am going to study.','I going to study.','I am go to study.','I will going to study.'], correct:0 },
      { tts:'I would like to travel.', type:'select', opts:['I would like to travel.','I want travel.','I would want to travel.','I like travel.'], correct:0 },
      { tts:'They want to buy a car.', type:'select', opts:['They want to buy a car.','They want buy a car.','They wants to buy a car.','They would buy a car.'], correct:0 } ] }
]);

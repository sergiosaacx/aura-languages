/* topic-data-088.js - Juego 88/350 | T13 4/7 GOING TO | planes e intenciones (ESPECIALIZADO) | Plata A2 */
_registerGames(88, 'Going To · Planes e Intenciones', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Para un plan ya decidido, que usas?', opts:['will','going to','would','want'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"I am going to visit my parents next week." es un plan.', ans:true, expl:'Correcto. going to para planes.' },
      { text:'Con evidencia presente se usa "going to".', ans:true, expl:'Correcto. Look! It is going to rain.' },
      { text:'"going to" se usa para decisiones espontaneas.', ans:false, expl:'Falso. Para el momento se usa will.' },
      { text:'"Look! It will rain." (con nubes) es la mejor opcion.', ans:false, expl:'Falso. Con evidencia: It is going to rain.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta.',
    sents:[
      { pre:'Look at the clouds! It is ', ans:'going', post:' to rain.', bank:['go','going','will','goes'] },
      { pre:'I am going to ', ans:'visit', post:' my parents next week.', bank:['visit','visits','visiting','visited'] },
      { pre:'She is going to ', ans:'start', post:' a new job.', bank:['start','starts','starting','started'] },
      { pre:'They are ', ans:'going', post:' to move house.', bank:['go','going','will','goes'] } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion con going to.',
    transforms:[
      { original:'plan: I / study tonight', task:'Going to', opts:['I am going to study tonight.','I going to study tonight.','I will study going to.','I am go to study tonight.'], correct:0 },
      { original:'evidencia: It / rain', task:'Going to', opts:['It is going to rain.','It will rain going to.','It going to rain.','It is go to rain.'], correct:0 },
      { original:'plan: We / travel in July', task:'Going to', opts:['We are going to travel in July.','We going to travel in July.','We is going to travel in July.','We are go to travel in July.'], correct:0 },
      { original:'plan: She / buy a car', task:'Going to', opts:['She is going to buy a car.','She going to buy a car.','She are going to buy a car.','She is go to buy a car.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo sobre planes.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What are your plans for the weekend?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I am going to visit my family.','I will going to visit my family.','I going to visit my family.','I am go to visit my family.'], correct:0 },
      { speaker:0, text:'Look at the sky!', blank:false },
      { speaker:1, text:null, blank:true, opts:['It is going to rain.','It will rain now.','It going to rain.','It is go to rain.'], correct:0 },
      { speaker:0, text:'Take an umbrella!', blank:false } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['going','I','am','to','study'],ans:['I','am','going','to','study']},{words:['going','It','is','to','rain'],ans:['It','is','going','to','rain']},{words:['going','We','are','to','travel'],ans:['We','are','going','to','travel']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She','will','going','to','travel','.'], wi:1, correct:'is', choices:['is','will','are','am'] },
      { words:['I','am','go','to','study','.'], wi:2, correct:'going', choices:['going','go','goes','gone'] },
      { words:['They','are','going','to','ate','.'], wi:4, correct:'eat', choices:['eat','ate','eaten','eating'] } ] }
]);

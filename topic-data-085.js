/* topic-data-085.js - Juego 85/350 | T13 1/7 GOING TO | reconocimiento de la estructura (ESPECIALIZADO) | Plata A2 */
_registerGames(85, 'Going To · Estructura', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta con going to.',
    items:[
      { src:'Voy a estudiar', opts:['I going to study','I am going to study','I will to study','I am go to study'], correct:1 },
      { src:'Ella va a viajar', opts:['She going to travel','She is going to travel','She are going to travel','She is go to travel'], correct:1 },
      { src:'Ellos van a comer', opts:['They going to eat','They are going to eat','They is going to eat','They are go to eat'], correct:1 },
      { src:'El va a trabajar', opts:['He going to work','He is going to work','He are going to work','He is go to work'], correct:1 },
      { src:'Vamos a jugar', opts:['We going to play','We are going to play','We is going to play','We are go to play'], correct:1 },
      { src:'Tu vas a ganar', opts:['You going to win','You are going to win','You is going to win','You are go to win'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Como se forma el futuro con going to?', opts:['going to + verbo','to be + going to + verbo','will + going to','go to + verbo'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta.',
    sents:[
      { pre:'I am ', ans:'going', post:' to study.', bank:['go','going','goes','gone'] },
      { pre:'She ', ans:'is', post:' going to travel.', bank:['is','are','am','be'] },
      { pre:'They are going to ', ans:'eat', post:'.', bank:['eat','eats','eating','ate'] },
      { pre:'We ', ans:'are', post:' going to win.', bank:['is','are','am','be'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['I','G','O','N','G'],ans:'GOING',hint:'... to study'},{scrambled:['L','I','W','L'],ans:'WILL',hint:'otro futuro'},{scrambled:['D','U','T','S','Y'],ans:'STUDY',hint:'going to ...'},{scrambled:['V','A','R','T','E','L'],ans:'TRAVEL',hint:'going to ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"I am going to study." es correcto.', ans:true, expl:'Correcto. to be + going to + infinitivo.' },
      { text:'"She going to travel." es correcto.', ans:false, expl:'Falso. Falta is: She is going to travel.' },
      { text:'"They are going to eat." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"He is go to work." es correcto.', ans:false, expl:'Falso. He is going to work.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma el futuro con going to.',
    transforms:[
      { original:'I study.', task:'Going to', opts:['I am going to study.','I going to study.','I am go to study.','I will going to study.'], correct:0 },
      { original:'She travels.', task:'Going to', opts:['She is going to travel.','She going to travel.','She is go to travel.','She are going to travel.'], correct:0 },
      { original:'They eat.', task:'Going to', opts:['They are going to eat.','They going to eat.','They is going to eat.','They are go to eat.'], correct:0 },
      { original:'We play.', task:'Going to', opts:['We are going to play.','We going to play.','We is going to play.','We are go to play.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con going to.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What are you going to do tonight?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I am going to watch a film.','I going to watch a film.','I am go to watch a film.','I will going to watch a film.'], correct:0 },
      { speaker:0, text:'And your sister?', blank:false },
      { speaker:1, text:null, blank:true, opts:['She is going to study.','She going to study.','She are going to study.','She is go to study.'], correct:0 },
      { speaker:0, text:'Nice!', blank:false } ] }
]);

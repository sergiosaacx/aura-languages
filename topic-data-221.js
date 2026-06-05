/* topic-data-221.js - Juego 221/350 | T32 4/7 IF ONLY | enfasis emocional (ESPECIALIZADO) | Platino B2 */
_registerGames(221, 'If Only · Enfasis Emocional', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Ojala te hubiera escuchado!', opts:['If only I listened to you!','If only I had listened to you!','If only I would listen to you!','If only I have listened to you!'], correct:1 },
      { src:'Ojala fuera mas rico', opts:['If only I am richer','If only I were richer','If only I had been richer','If only I will be richer'], correct:1 },
      { src:'Ojala no hubiera vendido la casa', opts:['If only I did not sell the house','If only I had not sold the house','If only I do not sell the house','If only I would not sell the house'], correct:1 },
      { src:'Ojala supiera la verdad', opts:['If only I know the truth','If only I knew the truth','If only I had known the truth','If only I will know the truth'], correct:1 },
      { src:'Ojala hubiera venido', opts:['If only I came','If only I had come','If only I come','If only I would come'], correct:1 },
      { src:'Ojala dejara de gritar', opts:['If only he stops shouting','If only he would stop shouting','If only he stopped shouting','If only he had stopped shouting'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"If only" es como "wish" pero con...', opts:['menos enfasis','mas enfasis emocional','tiempo presente','tiempo futuro'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'If only I ', ans:'had listened', post:' to you!', bank:['had listened','listened','would listen','have listened'] },
      { pre:'If only I ', ans:'were', post:' richer.', bank:['were','am','had been','will be'] },
      { pre:'If only it ', ans:'would', post:' stop raining!', bank:['would','will','stops','stopped'] },
      { pre:'If only I ', ans:'knew', post:' the answer.', bank:['knew','know','had known','will know'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['Y','L','N','O'],ans:'ONLY',hint:'if ...'},{scrambled:['D','A','H'],ans:'HAD',hint:'if only I ... listened'},{scrambled:['E','R','E','W'],ans:'WERE',hint:'if only I ... richer'},{scrambled:['D','L','U','O','W'],ans:'WOULD',hint:'if only it ... stop'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"If only I had listened to you!" es correcto.', ans:true, expl:'Correcto. deseo sobre el pasado.' },
      { text:'"If only I would have more time" es correcto para un deseo presente.', ans:false, expl:'Falso. If only I had more time.' },
      { text:'"If only" usa las mismas estructuras verbales que "wish".', ans:true, expl:'Correcto.' },
      { text:'"If only I will be taller" es correcto.', ans:false, expl:'Falso. If only I were taller.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion con "If only".',
    transforms:[
      { original:'pasado: escuchar', task:'If only', opts:['If only I had listened!','If only I listened!','If only I would listen!','If only I have listened!'], correct:0 },
      { original:'presente: ser rico', task:'If only', opts:['If only I were rich.','If only I am rich.','If only I had been rich.','If only I will be rich.'], correct:0 },
      { original:'cambio: parar de gritar', task:'If only', opts:['If only he would stop shouting.','If only he stops shouting.','If only he stopped shouting.','If only he had stopped shouting.'], correct:0 },
      { original:'pasado: no vender la casa', task:'If only', opts:['If only I had not sold the house.','If only I did not sell the house.','If only I do not sell the house.','If only I would not sell the house.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'You should have listened to me.', blank:false },
      { speaker:1, text:null, blank:true, opts:['I know. If only I had listened!','I know. If only I listened!','I know. If only I would listen!','I know. If only I have listened!'], correct:0 },
      { speaker:0, text:'Do you want more money?', blank:false },
      { speaker:1, text:null, blank:true, opts:['If only I were richer.','If only I am richer.','If only I had been richer.','If only I will be richer.'], correct:0 },
      { speaker:0, text:'Me too.', blank:false } ] }
]);

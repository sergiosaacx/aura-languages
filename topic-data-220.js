/* topic-data-220.js - Juego 220/350 | T32 3/7 IF ONLY | wish + tiempos (ESPECIALIZADO) | Platino B2 */
_registerGames(220, 'Wish + Tiempos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Ojala fuera mas alto (presente)', opts:['I wish I am taller','I wish I were taller','I wish I had been taller','I wish I will be taller'], correct:1 },
      { src:'Ojala hubiera estudiado (pasado)', opts:['I wish I studied','I wish I had studied','I wish I study','I wish I would study'], correct:1 },
      { src:'Ojala dejara de llover', opts:['I wish it stops raining','I wish it would stop raining','I wish it stopped raining','I wish it had stopped raining'], correct:1 },
      { src:'Ojala supiera la respuesta (presente)', opts:['I wish I know the answer','I wish I knew the answer','I wish I had known the answer','I wish I will know the answer'], correct:1 },
      { src:'Ojala no hubiera dicho eso (pasado)', opts:['I wish I did not say that','I wish I had not said that','I wish I do not say that','I wish I would not say that'], correct:1 },
      { src:'Ojala fueras mas amable', opts:['I wish you are nicer','I wish you were nicer','I wish you had been nicer','I wish you will be nicer'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Para un deseo sobre el PASADO se usa wish + ...', opts:['past simple','past perfect','would','will'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada tipo de deseo con su estructura.',
    pairs:[ ['deseo presente','wish + past simple'],['deseo sobre el pasado','wish + past perfect'],['deseo de cambio','wish + would'],['I wish I were taller','presente'],['I wish I had studied','pasado'],['I wish it would stop','cambio'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['H','S','I','W'],ans:'WISH',hint:'ojala'},{scrambled:['E','R','E','W'],ans:'WERE',hint:'wish I ... taller'},{scrambled:['D','A','H'],ans:'HAD',hint:'wish I ... studied'},{scrambled:['D','L','U','O','W'],ans:'WOULD',hint:'wish it ... stop'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada deseo por su tiempo.',
    categories:['Deseo presente','Deseo pasado','Deseo de cambio'],
    items:[ {text:'I wish I were taller',correct:0},{text:'I wish I had studied',correct:1},{text:'I wish it would stop',correct:2},{text:'I wish I knew',correct:0},{text:'I wish I had not said that',correct:1},{text:'I wish you would help',correct:2} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Do you regret not studying?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I wish I had studied.','Yes, I wish I studied.','Yes, I wish I study.','Yes, I wish I would study.'], correct:0 },
      { speaker:0, text:'Are you happy with your height?', blank:false },
      { speaker:1, text:null, blank:true, opts:['No, I wish I were taller.','No, I wish I am taller.','No, I wish I had been taller.','No, I wish I will be taller.'], correct:0 },
      { speaker:0, text:'I see.', blank:false } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"I wish I were taller" expresa un deseo presente.', ans:true, expl:'Correcto. wish + past simple.' },
      { text:'"I wish I had studied" expresa un deseo sobre el pasado.', ans:true, expl:'Correcto. wish + past perfect.' },
      { text:'"I wish I will be taller" es correcto.', ans:false, expl:'Falso. I wish I were taller.' },
      { text:'"I wish it would stop raining" expresa deseo de cambio.', ans:true, expl:'Correcto. wish + would.' } ] }
]);

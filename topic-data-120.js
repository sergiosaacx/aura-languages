/* topic-data-120.js - Juego 120/350 | T18 1/7 CAN YOU? | can/can't/could (ESPECIALIZADO) | Plata A2 */
_registerGames(120, 'Can / Cant / Could', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el modal correcto.',
    items:[
      { src:'Yo puedo nadar', opts:['I can swim','I can to swim','I cans swim','I am can swim'], correct:0 },
      { src:'Ella no puede venir', opts:["She can't come","She can't to come","She cannot to come","She no can come"], correct:0 },
      { src:'Podias tu nadar? (pasado)', opts:['Can you swim?','Could you swim?','Did you can swim?','Could you to swim?'], correct:1 },
      { src:'El puede hablar frances', opts:['He can speak French','He can to speak French','He cans speak French','He could speak French'], correct:0 },
      { src:'No puedo ir', opts:["I can't go","I can't to go","I cannot to go","I no can go"], correct:0 },
      { src:'Podrias ayudarme? (cortes)', opts:['Can you help me please?','Could you help me please?','Did you could help me?','Could you to help me?'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['I can to swim','I can swim','I cans swim','I am can swim'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el modal correcto.',
    sents:[
      { pre:'I ', ans:'can', post:' speak English.', bank:['can','can to','cans','am can'] },
      { pre:'She ', ans:"can't", post:' come today.', bank:["can't","can to","cans","no can"] },
      { pre:'', ans:'Could', post:' you help me?', bank:['Can to','Could','Did can','Could to'] },
      { pre:'He ', ans:'can', post:' play guitar.', bank:['can','can to','cans','could to'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['N','A','C'],ans:'CAN',hint:'puedo / se'},{scrambled:['D','L','U','O','C'],ans:'COULD',hint:'podia / podrias'},{scrambled:['M','I','W','S'],ans:'SWIM',hint:'can ...'},{scrambled:['P','E','L','H'],ans:'HELP',hint:'Could you ...?'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'Despues de "can" va el infinitivo sin "to".', ans:true, expl:'Correcto. I can swim.' },
      { text:'"I can to swim." es correcto.', ans:false, expl:'Falso. I can swim (sin to).' },
      { text:'"could" es el pasado de "can".', ans:true, expl:'Correcto. could = podia.' },
      { text:'"She cans swim." es correcto.', ans:false, expl:'Falso. She can swim (sin -s).' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion con el modal correcto.',
    transforms:[
      { original:'swim (habilidad)', task:'Con can', opts:['I can swim.','I can to swim.','I cans swim.','I am can swim.'], correct:0 },
      { original:'come (no poder)', task:"Con can't", opts:["She can't come.","She can't to come.","She cannot to come.","She no can come."], correct:0 },
      { original:'help (cortes)', task:'Con could', opts:['Could you help me?','Can you to help me?','Did you could help me?','Could you to help me?'], correct:0 },
      { original:'play (habilidad)', task:'Con can', opts:['He can play.','He can to play.','He cans play.','He could to play.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con modales.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Can you swim?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I can swim very well.','Yes, I can to swim very well.','Yes, I cans swim very well.','Yes, I am can swim very well.'], correct:0 },
      { speaker:0, text:'Could you help me later?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Sure, I can help you.','Sure, I can to help you.','Sure, I cans help you.','Sure, I could to help you.'], correct:0 },
      { speaker:0, text:'Thanks!', blank:false } ] }
]);

/* topic-data-083.js - Juego 83/350 | T12 6/7 PAST STORIES | pasado completo en conversacion (MEZCLADO) | Plata A2 */
_registerGames(83, 'Pasado Simple · En Conversacion', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'___ you go to the party? (pasado)', opts:['Do','Did','Was','Were'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta del pasado.',
    sents:[
      { pre:'', ans:'Did', post:' you go to the party?', bank:['Do','Did','Was','Were'] },
      { pre:'No, I ', ans:"didn't", post:'.', bank:["didn't","don't","wasn't","weren't"] },
      { pre:'I ', ans:'was', post:' tired.', bank:['was','were','did','am'] },
      { pre:'', ans:'Were', post:' your friends there?', bank:['Was','Were','Did','Do'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"Did you go?" pregunta por una accion en pasado.', ans:true, expl:'Correcto. Did + infinitivo.' },
      { text:'"I wasn\'t tired." es una negacion correcta con to be.', ans:true, expl:"Correcto. wasn't = was not." },
      { text:'"Did you went?" es correcto.', ans:false, expl:'Falso. Did you go? (infinitivo).' },
      { text:'"Were he there?" es correcto.', ans:false, expl:'Falso. Was he there? (singular).' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Transforma cada oracion segun la tarea.',
    transforms:[
      { original:'You went.', task:'Pregunta', opts:['Did you go?','Did you went?','Do you go?','Were you go?'], correct:0 },
      { original:'I was tired.', task:'Negativa', opts:["I wasn't tired.","I weren't tired.","I didn't tired.","I not was tired."], correct:0 },
      { original:'They were happy.', task:'Pregunta', opts:['Were they happy?','Was they happy?','Did they happy?','Do they happy?'], correct:0 },
      { original:'She called.', task:'Negativa', opts:["She didn't call.","She didn't called.","She wasn't call.","She not call."], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo en pasado.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:null, blank:true, opts:['Did you go to the party?','Were you go to the party?','Do you go to the party?','Did you went to the party?'], correct:0 },
      { speaker:1, text:null, blank:true, opts:["No, I didn't. I was tired.","No, I don't. I was tired.","No, I wasn't. I was tired.","No, I weren't. I was tired."], correct:0 },
      { speaker:0, text:'Oh, what a pity.', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada palabra segun si usa Did o was/were.',
    categories:['Usa Did','Usa was/were'],
    items:[ {text:'go',correct:0},{text:'eat',correct:0},{text:'tired',correct:1},{text:'happy',correct:1},{text:'play',correct:0},{text:'at home',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'Did you go to the party?', type:'select', opts:['Did you go to the party?','Did you went to the party?','Do you go to the party?','Were you go to the party?'], correct:0 },
      { tts:"I wasn't tired.", type:'select', opts:["I wasn't tired.","I weren't tired.","I didn't tired.","I not tired."], correct:0 },
      { tts:'Were your friends there?', type:'select', opts:['Were your friends there?','Was your friends there?','Did your friends there?','Do your friends there?'], correct:0 } ] }
]);

/* topic-data-087.js - Juego 87/350 | T13 3/7 GOING TO | going to en todas las personas (ESPECIALIZADO) | Plata A2 */
_registerGames(87, 'Going To · Todas las Personas', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta de going to.',
    items:[
      { src:'Yo (going to)', opts:['I going to','I am going to','I will going to','I are going to'], correct:1 },
      { src:'El (going to)', opts:['He going to','He is going to','He are going to','He am going to'], correct:1 },
      { src:'Nosotros (going to)', opts:['We going to','We are going to','We is going to','We am going to'], correct:1 },
      { src:'Ellos (going to)', opts:['They going to','They are going to','They is going to','They am going to'], correct:1 },
      { src:'Tu (going to)', opts:['You going to','You are going to','You is going to','You am going to'], correct:1 },
      { src:'Ella (going to)', opts:['She going to','She is going to','She are going to','She am going to'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada pronombre con su contraccion de going to.',
    pairs:[ ['I',"I'm going to"],['He',"He's going to"],['She',"She's going to"],['We',"We're going to"],['They',"They're going to"],['You',"You're going to"] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['I','G','O','N','G'],ans:'GOING',hint:'... to'},{scrambled:['M','A'],ans:'AM',hint:'I ... going to'},{scrambled:['S','I'],ans:'IS',hint:'He ... going to'},{scrambled:['R','E','A'],ans:'ARE',hint:'We ... going to'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada forma es correcta.',
    stmts:[
      { text:'"I am going to" es correcto.', ans:true, expl:'Correcto. I am going to.' },
      { text:'"She are going to" es correcto.', ans:false, expl:'Falso. She is going to.' },
      { text:'"They are going to" es correcto.', ans:true, expl:'Correcto. They are going to.' },
      { text:'"I going to" es correcto.', ans:false, expl:'Falso. Falta am: I am going to.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el verbo to be correcto.',
    transforms:[
      { original:'I ___ going to run.', task:'to be', opts:['am','is','are','be'], correct:0 },
      { original:'She ___ going to sing.', task:'to be', opts:['is','am','are','be'], correct:0 },
      { original:'We ___ going to dance.', task:'to be', opts:['are','is','am','be'], correct:0 },
      { original:'He ___ going to read.', task:'to be', opts:['is','am','are','be'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con going to.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What is he going to do?', blank:false },
      { speaker:1, text:null, blank:true, opts:['He is going to cook.','He are going to cook.','He going to cook.','He am going to cook.'], correct:0 },
      { speaker:0, text:'And you?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I am going to rest.','I is going to rest.','I going to rest.','I are going to rest.'], correct:0 },
      { speaker:0, text:'Good plan!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada pronombre segun su forma de to be.',
    categories:['am','is','are'],
    items:[ {text:'I',correct:0},{text:'he',correct:1},{text:'she',correct:1},{text:'it',correct:1},{text:'we',correct:2},{text:'they',correct:2} ] }
]);

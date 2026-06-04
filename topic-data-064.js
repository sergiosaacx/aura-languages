/* topic-data-064.js - Juego 64/350 | T10 1/7 ASK AWAY | Palabras WH reconocimiento (ESPECIALIZADO) | Bronce A1 */
_registerGames(64, 'Palabras WH · Reconocimiento', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la palabra interrogativa correcta.',
    items:[
      { src:'que', opts:['What','Where','Who','When'], correct:0 },
      { src:'donde', opts:['What','Where','Who','Why'], correct:1 },
      { src:'quien', opts:['What','Who','Where','When'], correct:1 },
      { src:'cuando', opts:['Where','When','Who','How'], correct:1 },
      { src:'como', opts:['Why','How','What','When'], correct:1 },
      { src:'por que', opts:['Why','How','Who','Where'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que palabra WH significa "donde"?', opts:['What','Where','Who','When'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada palabra WH con su significado.',
    pairs:[ ['What','que'],['Where','donde'],['Who','quien'],['When','cuando'],['How','como'],['Why','por que'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra WH correcta.',
    sents:[
      { pre:'', ans:'What', post:' is your name?', bank:['What','Where','Who','When'] },
      { pre:'', ans:'Where', post:' do you live?', bank:['What','Where','Who','Why'] },
      { pre:'', ans:'When', post:' is the party?', bank:['Where','When','Who','How'] },
      { pre:'', ans:'Why', post:' are you sad?', bank:['Why','How','Who','What'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra interrogativa.',
    words:[ {scrambled:['H','A','W','T'],ans:'WHAT',hint:'que'},{scrambled:['R','E','H','W','E'],ans:'WHERE',hint:'donde'},{scrambled:['H','O','W'],ans:'WHO',hint:'quien'},{scrambled:['Y','H','W'],ans:'WHY',hint:'por que'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada WH segun el tipo de respuesta.',
    categories:['Lugar/Tiempo','Persona/Cosa'],
    items:[ {text:'Where',correct:0},{text:'When',correct:0},{text:'Who',correct:1},{text:'What',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la pregunta que oyes.',
    items:[
      { tts:'What is your name?', type:'select', opts:['What is your name?','Where is your name?','Who is your name?','When is your name?'], correct:0 },
      { tts:'Where do you live?', type:'select', opts:['Where do you live?','What do you live?','When do you live?','Why do you live?'], correct:0 },
      { tts:'Why are you here?', type:'select', opts:['Why are you here?','How are you here?','Who are you here?','When are you here?'], correct:0 } ] }
]);

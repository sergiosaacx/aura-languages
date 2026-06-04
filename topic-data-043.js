/* topic-data-043.js - Juego 43/350 | T7 1/7 COLOR YOUR WORDS | Adjetivos descriptivos vocabulario (ESPECIALIZADO) | Bronce A1 */
_registerGames(43, 'Adjetivos Descriptivos · Vocabulario', [
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige el adjetivo correcto en ingles.',
    items:[
      { src:'grande',  opts:['small','big','tall','long'], correct:1 },
      { src:'pequeno', opts:['small','short','little','big'], correct:0 },
      { src:'alto',    opts:['short','tall','high','big'], correct:1 },
      { src:'viejo',   opts:['new','young','old','ugly'], correct:2 },
      { src:'feliz',   opts:['sad','angry','happy','tired'], correct:2 },
      { src:'frio',    opts:['hot','warm','cold','cool'], correct:2 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Cual es el opuesto de "big"?',
    opts:['tall','small','long','old'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el adjetivo correcto segun el contexto.',
    sents:[
      { pre:'The elephant is ', ans:'big', post:'.', bank:['big','small','short','old'] },
      { pre:'Ice is ', ans:'cold', post:'.', bank:['hot','cold','warm','cool'] },
      { pre:'My grandfather is ', ans:'old', post:'.', bank:['young','old','new','tall'] },
      { pre:'She is very ', ans:'happy', post:'.', bank:['sad','happy','angry','tired'] } ] },
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'The house is big.', type:'select', opts:['The house is big.','The house is small.','The house is tall.','The house is old.'], correct:0 },
      { tts:'The water is cold.', type:'select', opts:['The water is cold.','The water is hot.','The water is warm.','The water is cool.'], correct:0 },
      { tts:'She is happy.', type:'select', opts:['She is happy.','She is sad.','She is angry.','She is tired.'], correct:0 } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada traduccion es correcta.',
    stmts:[
      { text:'"big" significa grande.', ans:true, expl:'Correcto. big = grande.' },
      { text:'"cold" significa caliente.', ans:false, expl:'Falso. cold = frio. caliente es hot.' },
      { text:'"happy" significa feliz.', ans:true, expl:'Correcto. happy = feliz.' },
      { text:'"old" significa nuevo.', ans:false, expl:'Falso. old = viejo. nuevo es new.' } ] },
  { id:'transform', label:'Transforma', xp:35,
    instr:'Di el adjetivo opuesto.',
    transforms:[
      { original:'big', task:'El opuesto', opts:['small','tall','long','old'], correct:0 },
      { original:'hot', task:'El opuesto', opts:['cold','warm','cool','wet'], correct:0 },
      { original:'happy', task:'El opuesto', opts:['sad','angry','tired','glad'], correct:0 },
      { original:'old', task:'El opuesto', opts:['new','young','big','tall'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo con el adjetivo correcto.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'How is the weather?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It is cold today.','It is colding today.','It is a cold today.','It is colds today.'], correct:0 },
      { speaker:0, text:'And how do you feel?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I am happy.','I am happys.','I am a happy.','I am happying.'], correct:0 },
      { speaker:0, text:'Great!', blank:false } ] }
]);

/* topic-data-258.js - Juego 258/350 | T37 6/7 PHRASAL VERBS II | idiomaticas y phrasal en conversacion (MEZCLADO) | Platino B2 */
_registerGames(258, 'Idiomaticas y Phrasal Verbs · En Conversacion', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"I have been feeling ___ this week." (bajo de salud)', opts:['over the moon','under the weather','on the fence','out of the blue'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la expresion correcta.',
    sents:[
      { pre:'I have been feeling ', ans:'under the weather', post:' this week.', bank:['under the weather','over the moon','on the fence','out of the blue'] },
      { pre:'She really ', ans:'comes across', post:' as confident.', bank:['comes across','comes up with','gets over','puts up with'] },
      { pre:'He finally ', ans:'got over', post:' his ex.', bank:['got over','came across','brought up','fell through'] },
      { pre:'Can you ', ans:'come up with', post:' a better plan?', bank:['come up with','come across','put up with','get away with'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada expresion con su significado.',
    pairs:[ ['under the weather','sentirse mal'],['come across as','dar la impresion de'],['get over','superar'],['come up with','idear'],['put up with','tolerar'],['fall through','fracasar'] ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'You look pale. Are you okay?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I am a bit under the weather.','I am a bit over the moon.','I am a bit on the fence.','I am a bit out of the blue.'], correct:0 },
      { speaker:0, text:'What is your impression of the new manager?', blank:false },
      { speaker:1, text:null, blank:true, opts:['She comes across as very capable.','She comes up with as very capable.','She gets over as very capable.','She puts up with as very capable.'], correct:0 },
      { speaker:0, text:'I agree.', blank:false } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada uso es correcto.',
    stmts:[
      { text:'"come across as" significa dar la impresion de.', ans:true, expl:'Correcto.' },
      { text:'"under the weather" significa estar muy feliz.', ans:false, expl:'Falso. sentirse mal.' },
      { text:'"get over" puede significar superar algo.', ans:true, expl:'Correcto.' },
      { text:'"put up with" significa proponer.', ans:false, expl:'Falso. significa tolerar.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la expresion que encaja.',
    transforms:[
      { original:'sentirse mal', task:'Expresion', opts:['under the weather','over the moon','on the fence','out of the blue'], correct:0 },
      { original:'dar la impresion de confiado', task:'Phrasal', opts:['come across as confident','come up with confident','get over confident','put up with confident'], correct:0 },
      { original:'superar una ruptura', task:'Phrasal', opts:['get over a breakup','come across a breakup','bring up a breakup','fall through a breakup'], correct:0 },
      { original:'idear un plan', task:'Phrasal', opts:['come up with a plan','come across a plan','get over a plan','put up with a plan'], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra clave.',
    words:[ {scrambled:['R','E','H','T','A','E','W'],ans:'WEATHER',hint:'under the ...'},{scrambled:['S','S','O','R','C','A'],ans:'ACROSS',hint:'come ... as'},{scrambled:['R','E','V','O'],ans:'OVER',hint:'get ...'},{scrambled:['P','U'],ans:'UP',hint:'come ... with'} ] }
]);

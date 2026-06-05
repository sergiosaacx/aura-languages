/* topic-data-157.js - Juego 157/350 | T23 3/7 WILL & MIGHT | usos de will (ESPECIALIZADO) | Oro B1 */
_registerGames(157, 'Usos de Will', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el ejemplo correcto para cada uso.',
    items:[
      { src:'oferta de ayuda', opts:['It will rain',"I'll help you","I'll never lie","I think she will win"], correct:1 },
      { src:'promesa', opts:["I'll help you now","I'll never forget you","It will be cold","She will be late"], correct:1 },
      { src:'prediccion', opts:["I'll get it","I'll always love you","It will be sunny tomorrow","I'll pay"], correct:2 },
      { src:'decision espontanea', opts:["I'll answer the phone","I'll always be there","It will snow","She will come"], correct:0 },
      { src:'negacion de futuro', opts:["I'll go","It will rain","She won't come","I'll help"], correct:2 },
      { src:'oferta', opts:["I'll carry that for you","It will be late","I'll never lie","She will win"], correct:0 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada oracion con su uso.',
    pairs:[ ["I'll help you",'oferta'],["I'll never lie",'promesa'],['It will be cold','prediccion'],["I'll get the phone",'decision espontanea'],["I'll carry it",'oferta de ayuda'],['She will win','prediccion segura'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['L','I','W','L'],ans:'WILL',hint:'futuro'},{scrambled:['P','E','L','H'],ans:'HELP',hint:"I'll ... you"},{scrambled:['E','S','I','M','O','R','P'],ans:'PROMISE',hint:'lo que haces con will'},{scrambled:['R','F','E','F','O'],ans:'OFFER',hint:"I'll help = una ..."} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada uso es correcto.',
    stmts:[
      { text:'"I\'ll help you." es una oferta de ayuda.', ans:true, expl:'Correcto. oferta espontanea.' },
      { text:'"It will be cold tomorrow." es una promesa.', ans:false, expl:'Falso. Es una prediccion.' },
      { text:'"I\'ll never lie to you." es una promesa.', ans:true, expl:'Correcto.' },
      { text:'"I think it will rain." es una oferta.', ans:false, expl:'Falso. Es una prediccion.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion con will.',
    transforms:[
      { original:'ofrecer ayuda', task:'Con will', opts:["I'll help you.","I help you.","I am helping you.","I would help you."], correct:0 },
      { original:'hacer una promesa', task:'Con will', opts:["I'll never forget you.","I never forget you.","I am never forgetting you.","I would never forget you."], correct:0 },
      { original:'predecir el clima', task:'Con will', opts:['It will be sunny.','It is sunny.','It is being sunny.','It would be sunny.'], correct:0 },
      { original:'decision del momento', task:'Con will', opts:["I'll get it.","I get it.","I am getting it.","I would get it."], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'This bag is so heavy.', blank:false },
      { speaker:1, text:null, blank:true, opts:["I'll carry it for you.","I carry it for you.","I am carrying it for you.","I would carry it for you."], correct:0 },
      { speaker:0, text:'The phone is ringing.', blank:false },
      { speaker:1, text:null, blank:true, opts:["I'll answer it.","I answer it.","I am answering it.","I would answer it."], correct:0 },
      { speaker:0, text:'Thanks!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada oracion segun su uso.',
    categories:['Oferta','Promesa','Prediccion'],
    items:[ {text:"I'll help you",correct:0},{text:"I'll never lie",correct:1},{text:'It will rain',correct:2},{text:"I'll carry it",correct:0},{text:"I'll always love you",correct:1},{text:'She will win',correct:2} ] }
]);

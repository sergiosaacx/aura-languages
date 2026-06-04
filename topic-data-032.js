/* topic-data-032.js - Juego 32/350 | T5 4/7 COUNT THE WORLD | La hora reglas (ESPECIALIZADO) | Bronce A1 */
_registerGames(32, 'La Hora · Reglas', [
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige la forma correcta de decir la hora.',
    items:[
      { src:'son las 3 en punto', opts:["It is three o'clock","It is three half","It is three quarter","It is half three"], correct:0 },
      { src:'son las 2 y media',  opts:["It is half past two","It is quarter past two","It is half to two","It is two half"], correct:0 },
      { src:'son las 4 menos cuarto', opts:["It is quarter to four","It is quarter past four","It is half to four","It is four quarter"], correct:0 },
      { src:'son las 5 y cuarto', opts:["It is quarter past five","It is quarter to five","It is half past five","It is five quarter"], correct:0 },
      { src:'son las 6 en punto', opts:["It is six o'clock","It is half past six","It is quarter six","It is six half"], correct:0 },
      { src:'son las 9 y media',  opts:["It is half past nine","It is quarter past nine","It is half to nine","It is nine half"], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Como se dice "y media"?',
    opts:['half past','quarter past','half to','quarter to'], correct:0 },
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:['half','It','is','past','two'], ans:['It','is','half','past','two'] },
      { words:['quarter','It','is','to','four'], ans:['It','is','quarter','to','four'] },
      { words:["o'clock",'It','is','three'], ans:['It','is','three',"o'clock"] } ] },
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['It','is','half','to','two','.'], wi:3, correct:'past', choices:['past','to','for','of'] },
      { words:['It','is','quarter','for','five','.'], wi:3, correct:'to', choices:['to','for','past','at'] },
      { words:['It','is','three','clock','.'], wi:3, correct:"o'clock", choices:["o'clock",'clock','hour','time'] } ] },
  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada hora segun como se dice.',
    categories:['En punto','Y media'],
    items:[ {text:'3:00',correct:0},{text:'2:30',correct:1},{text:'5:00',correct:0},{text:'9:30',correct:1},{text:'7:00',correct:0},{text:'4:30',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la hora que oyes.',
    items:[
      { tts:'It is half past two.', type:'select', opts:["It is half past two.","It is quarter past two.","It is half to two.","It is two o'clock."], correct:0 },
      { tts:"It is three o'clock.", type:'select', opts:["It is three o'clock.","It is half past three.","It is quarter to three.","It is three half."], correct:0 },
      { tts:'It is quarter to five.', type:'select', opts:["It is quarter to five.","It is quarter past five.","It is half past five.","It is five o'clock."], correct:0 } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada equivalencia de la hora es correcta.',
    stmts:[
      { text:'2:30 = "It is half past two".', ans:true, expl:'Correcto. half past = y media.' },
      { text:'3:15 = "It is quarter past four".', ans:false, expl:'Falso. 3:15 es quarter past three.' },
      { text:'4:45 = "It is quarter to five".', ans:true, expl:'Correcto. quarter to = 15 min antes.' },
      { text:'"half to three" es una forma correcta.', ans:false, expl:'Falso. Se dice half past, no half to.' } ] }
]);

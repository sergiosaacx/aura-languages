/* topic-data-034.js - Juego 34/350 | T5 6/7 COUNT THE WORLD | Dias, meses y numeros en contexto (MEZCLADO) | Bronce A1 */
_registerGames(34, 'Dias, Meses y Numeros · Contexto', [
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige la palabra correcta en ingles.',
    items:[
      { src:'lunes',     opts:['Monday','Sunday','March','May'], correct:0 },
      { src:'julio',     opts:['June','July','Friday','January'], correct:1 },
      { src:'veinte (20)',opts:['twelve','twenty','twenteen','two'], correct:1 },
      { src:'sabado',    opts:['Saturday','Sunday','September','March'], correct:0 },
      { src:'marzo',     opts:['May','March','Monday','August'], correct:1 },
      { src:'doce (12)', opts:['twenty','twelve','twelfth','two'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'En "The meeting is on ___", que palabra encaja?',
    opts:['July','Monday','twenty','blue'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca la palabra correcta segun el contexto.',
    sents:[
      { pre:'My birthday is in ', ans:'May', post:'. (mes)', bank:['May','Monday','many','March'] },
      { pre:'The meeting is on ', ans:'Friday', post:'. (dia)', bank:['Friday','March','forty','free'] },
      { pre:'I have ', ans:'thirty', post:' books. (numero)', bank:['thirty','Thursday','March','thirsty'] },
      { pre:'There are ', ans:'twelve', post:' months in a year.', bank:['twelve','twenty','Tuesday','two'] } ] },
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra mal escrita y elige la correccion.',
    sents:[
      { words:['Today','is','Wensday','.'], wi:2, correct:'Wednesday', choices:['Wednesday','Wensday','Wendsday','Wednsday'] },
      { words:['My','birthday','is','in','Julay','.'], wi:4, correct:'July', choices:['July','Julay','Jully','Juley'] },
      { words:['I','have','twenti','books','.'], wi:2, correct:'twenty', choices:['twenty','twenti','twentty','twentie'] } ] },
  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada palabra como dia, mes o numero.',
    categories:['Dia','Mes','Numero'],
    items:[ {text:'Monday',correct:0},{text:'July',correct:1},{text:'twenty',correct:2},{text:'Friday',correct:0},{text:'March',correct:1},{text:'fifty',correct:2} ] },
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'My birthday is in May.', type:'select', opts:['My birthday is in May.','My birthday is in March.','My birthday is in Monday.','My birthday is in many.'], correct:0 },
      { tts:'The meeting is on Friday.', type:'select', opts:['The meeting is on Friday.','The meeting is on February.','The meeting is on forty.','The meeting is on free.'], correct:0 },
      { tts:'I have twenty books.', type:'select', opts:['I have twenty books.','I have twelve books.','I have Tuesday books.','I have twenteen books.'], correct:0 } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'Los meses en ingles van con mayuscula (July, May).', ans:true, expl:'Correcto. Dias y meses van en mayuscula.' },
      { text:'"monday" se escribe con minuscula en ingles.', ans:false, expl:'Falso. Los dias van en mayuscula: Monday.' },
      { text:'"twenty" es el numero 20.', ans:true, expl:'Correcto. twenty = 20.' },
      { text:'"July" es un dia de la semana.', ans:false, expl:'Falso. July es un mes (julio).' } ] }
]);

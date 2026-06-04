/* topic-data-031.js - Juego 31/350 | T5 3/7 COUNT THE WORLD | Meses del ano (ESPECIALIZADO) | Bronce A1 */
_registerGames(31, 'Meses del Ano', [
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Como se dice "agosto" en ingles?',
    opts:['October','August','April','September'], correct:1 },
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada mes en espanol con su nombre en ingles.',
    pairs:[ ['enero','January'],['junio','June'],['julio','July'],['agosto','August'],['octubre','October'],['diciembre','December'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el mes correcto.',
    sents:[
      { pre:'My birthday is in ', ans:'July', post:'.', bank:['June','July','January','March'] },
      { pre:'Christmas is in ', ans:'December', post:'.', bank:['December','November','October','September'] },
      { pre:'Summer starts in ', ans:'June', post:'.', bank:['June','July','January','May'] },
      { pre:'The year ends in ', ans:'December', post:'.', bank:['December','November','January','October'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma el mes en ingles.',
    words:[ {scrambled:['Y','A','M'],ans:'MAY',hint:'el quinto mes'},{scrambled:['N','U','J','E'],ans:'JUNE',hint:'el sexto mes'},{scrambled:['L','Y','J','U'],ans:'JULY',hint:'el septimo mes'},{scrambled:['R','A','P','I','L'],ans:'APRIL',hint:'el cuarto mes'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"January" es el primer mes del ano.', ans:true, expl:'Correcto. January = enero.' },
      { text:'"July" es el mes de junio.', ans:false, expl:'Falso. July = julio. Junio es June.' },
      { text:'"December" es el ultimo mes del ano.', ans:true, expl:'Correcto. December = diciembre.' },
      { text:'"October" es el octavo mes.', ans:false, expl:'Falso. October es el decimo mes. El octavo es August.' } ] },
  { id:'transform', label:'Transforma', xp:35,
    instr:'Escribe cada mes en ingles.',
    transforms:[
      { original:'enero', task:'En ingles', opts:['January','June','July','March'], correct:0 },
      { original:'agosto', task:'En ingles', opts:['August','October','April','September'], correct:0 },
      { original:'diciembre', task:'En ingles', opts:['December','November','October','September'], correct:0 },
      { original:'julio', task:'En ingles', opts:['July','June','January','May'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo con el mes correcto.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'When is your birthday?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It is in June.','It is in July.','It is in Juny.','It is in Jun.'], correct:0 },
      { speaker:0, text:'And when is Christmas?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It is in December.','It is in November.','It is in Desember.','It is in Decembre.'], correct:0 },
      { speaker:0, text:'Nice!', blank:false } ] }
]);

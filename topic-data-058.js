/* topic-data-058.js - Juego 58/350 | T9 2/7 HERE & THERE | Preposiciones de tiempo in/on/at regla (ESPECIALIZADO) | Bronce A1 */
_registerGames(58, 'Preposiciones de Tiempo · Regla', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que preposicion usas con un dia (Monday)?', opts:['in','on','at','to'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la preposicion de tiempo correcta.',
    sents:[
      { pre:'I have class ', ans:'on', post:' Monday.', bank:['in','on','at','to'] },
      { pre:'My birthday is ', ans:'in', post:' July.', bank:['in','on','at','to'] },
      { pre:'The film starts ', ans:'at', post:' 8 o\'clock.', bank:['in','on','at','to'] },
      { pre:'I was born ', ans:'in', post:' 2010.', bank:['in','on','at','to'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:['on','class','I','have','Monday'], ans:['I','have','class','on','Monday'] },
      { words:['in','born','was','I','2010'], ans:['I','was','born','in','2010'] },
      { words:['at','starts','It','noon'], ans:['It','starts','at','noon'] } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la preposicion incorrecta y elige la correccion.',
    sents:[
      { words:['I','have','class','in','Monday','.'], wi:3, correct:'on', choices:['on','in','at','to'] },
      { words:['My','birthday','is','on','July','.'], wi:3, correct:'in', choices:['in','on','at','to'] },
      { words:['It','starts','in','noon','.'], wi:2, correct:'at', choices:['at','in','on','to'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la preposicion de tiempo.',
    words:[ {scrambled:['N','I'],ans:'IN',hint:'con meses y anos'},{scrambled:['N','O'],ans:'ON',hint:'con dias y fechas'},{scrambled:['T','A'],ans:'AT',hint:'con horas'},{scrambled:['N','O','O','N'],ans:'NOON',hint:'at ... (mediodia)'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada regla es correcta.',
    stmts:[
      { text:'Se usa "in" con meses y anos.', ans:true, expl:'Correcto. in July, in 2010.' },
      { text:'Se usa "in" con los dias de la semana.', ans:false, expl:'Falso. Con dias se usa on: on Monday.' },
      { text:'Se usa "at" con las horas.', ans:true, expl:'Correcto. at 8 o\'clock.' },
      { text:'Se usa "on" con las horas.', ans:false, expl:'Falso. Con horas se usa at.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la preposicion de tiempo correcta.',
    transforms:[
      { original:'___ Monday', task:'in/on/at', opts:['on Monday','in Monday','at Monday','to Monday'], correct:0 },
      { original:'___ July', task:'in/on/at', opts:['in July','on July','at July','to July'], correct:0 },
      { original:"___ 3 o'clock", task:'in/on/at', opts:["at 3 o'clock","in 3 o'clock","on 3 o'clock","to 3 o'clock"], correct:0 },
      { original:'___ 2019', task:'in/on/at', opts:['in 2019','on 2019','at 2019','to 2019'], correct:0 } ] }
]);

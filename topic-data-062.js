/* topic-data-062.js - Juego 62/350 | T9 6/7 HERE & THERE | in/on/at lugar y tiempo en contexto (MEZCLADO) | Bronce A1 */
_registerGames(62, 'In / On / At · Lugar y Tiempo', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'I was born ___ June. Que preposicion va?', opts:['in','on','at','to'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la preposicion correcta (lugar o tiempo).',
    sents:[
      { pre:'I was born ', ans:'in', post:' June.', bank:['in','on','at','to'] },
      { pre:'The meeting is ', ans:'on', post:' Monday.', bank:['in','on','at','to'] },
      { pre:'The cat is ', ans:'in', post:' the box.', bank:['in','on','at','under'] },
      { pre:'We start ', ans:'at', post:' 9.', bank:['in','on','at','to'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la preposicion.',
    words:[ {scrambled:['N','I'],ans:'IN',hint:'meses, anos, dentro'},{scrambled:['N','O'],ans:'ON',hint:'dias, sobre'},{scrambled:['T','A'],ans:'AT',hint:'horas, punto exacto'},{scrambled:['X','B','O'],ans:'BOX',hint:'in the ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada uso es correcto.',
    stmts:[
      { text:'"I was born in June." es correcto.', ans:true, expl:'Correcto. in con meses.' },
      { text:'"The party is in Friday." es correcto.', ans:false, expl:'Falso. Con dias se usa on: on Friday.' },
      { text:'"The cat is in the box." es correcto.', ans:true, expl:'Correcto. in = dentro.' },
      { text:'"We meet at Monday." es correcto.', ans:false, expl:'Falso. Con dias se usa on: on Monday.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la preposicion correcta.',
    transforms:[
      { original:'I was born ___ 1990.', task:'in/on/at', opts:['in 1990','on 1990','at 1990','to 1990'], correct:0 },
      { original:'The meeting is ___ Monday.', task:'in/on/at', opts:['on Monday','in Monday','at Monday','to Monday'], correct:0 },
      { original:'The cat is ___ the box.', task:'in/on/at', opts:['in the box','on the box','at the box','to the box'], correct:0 },
      { original:'We start ___ noon.', task:'in/on/at', opts:['at noon','in noon','on noon','to noon'], correct:0 } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I was born in June.', type:'select', opts:['I was born in June.','I was born on June.','I was born at June.','I was born to June.'], correct:0 },
      { tts:'The meeting is on Monday.', type:'select', opts:['The meeting is on Monday.','The meeting is in Monday.','The meeting is at Monday.','The meeting is to Monday.'], correct:0 },
      { tts:'The cat is in the box.', type:'select', opts:['The cat is in the box.','The cat is on the box.','The cat is at the box.','The cat is under the box.'], correct:0 } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion segun su preposicion.',
    categories:['in','on','at'],
    items:[ {text:'June',correct:0},{text:'Monday',correct:1},{text:'noon',correct:2},{text:'the box',correct:0},{text:'my birthday',correct:1},{text:'night',correct:2} ] }
]);

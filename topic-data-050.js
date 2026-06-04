/* topic-data-050.js - Juego 50/350 | T8 1/7 DAILY HABITS | Presente Simple 3ra persona (ESPECIALIZADO) | Bronce A1 */
_registerGames(50, 'Presente Simple · 3ra Persona', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta con he/she.',
    items:[
      { src:'El trabaja', opts:['He work','He works','He workes','He working'], correct:1 },
      { src:'Ella juega', opts:['She plays','She play','She playes','She plaies'], correct:0 },
      { src:'El mira', opts:['He watchs','He watches','He watch','He watchies'], correct:1 },
      { src:'Ella estudia', opts:['She studys','She studyes','She studies','She study'], correct:2 },
      { src:'El come', opts:['He eat','He eates','He eats','He eating'], correct:2 },
      { src:'Ella va', opts:['She gos','She goes','She go','She goees'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Como se escribe "ella mira" (watch)?', opts:['She watchs','She watches','She watch','She watchies'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta del verbo.',
    sents:[
      { pre:'He ', ans:'works', post:' every day.', bank:['work','works','workes','working'] },
      { pre:'She ', ans:'studies', post:' English.', bank:['study','studys','studies','studyes'] },
      { pre:'He ', ans:'watches', post:' TV.', bank:['watch','watchs','watches','watchies'] },
      { pre:'She ', ans:'plays', post:' tennis.', bank:['play','plays','playes','plaies'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el verbo en 3ra persona.',
    words:[ {scrambled:['K','R','O','W','S'],ans:'WORKS',hint:'el trabaja'},{scrambled:['S','Y','A','L','P'],ans:'PLAYS',hint:'ella juega'},{scrambled:['T','A','S','E'],ans:'EATS',hint:'el come'},{scrambled:['S','O','E','G'],ans:'GOES',hint:'ella va'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada forma es correcta.',
    stmts:[
      { text:'Con "he" el verbo lleva -s: "he works".', ans:true, expl:'Correcto. 3ra persona singular anade -s.' },
      { text:'"She study" es correcto.', ans:false, expl:'Falso. study termina en y -> studies.' },
      { text:'"He watches" es correcto.', ans:true, expl:'Correcto. verbos en -ch anaden -es.' },
      { text:'"He work" es correcto.', ans:false, expl:'Falso. Con he se dice he works.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Conjuga el verbo en 3ra persona.',
    transforms:[
      { original:'I work.', task:'Con "he"', opts:['He works.','He work.','He workes.','He working.'], correct:0 },
      { original:'I study.', task:'Con "she"', opts:['She studies.','She studys.','She study.','She studyes.'], correct:0 },
      { original:'I watch.', task:'Con "he"', opts:['He watches.','He watchs.','He watch.','He watchies.'], correct:0 },
      { original:'I go.', task:'Con "she"', opts:['She goes.','She gos.','She go.','She goees.'], correct:0 } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'He works every day.', type:'select', opts:['He works every day.','He work every day.','He working every day.','He workes every day.'], correct:0 },
      { tts:'She studies English.', type:'select', opts:['She studies English.','She study English.','She studys English.','She studyes English.'], correct:0 },
      { tts:'He watches TV.', type:'select', opts:['He watches TV.','He watch TV.','He watchs TV.','He watchies TV.'], correct:0 } ] }
]);

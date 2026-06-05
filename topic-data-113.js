/* topic-data-113.js - Juego 113/350 | T17 1/7 COMPARE THE WORLD | Comparativos regulares (ESPECIALIZADO) | Plata A2 */
_registerGames(113, 'Comparativos · Formacion', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el comparativo correcto.',
    items:[
      { src:'tall (comparativo)', opts:['more tall','taller','tallest','more taller'], correct:1 },
      { src:'big (comparativo)', opts:['more big','biger','bigger','more bigger'], correct:2 },
      { src:'beautiful (comparativo)', opts:['beautifuler','more beautiful','beautifulest','most beautiful'], correct:1 },
      { src:'fast (comparativo)', opts:['more fast','faster','fastest','more faster'], correct:1 },
      { src:'happy (comparativo)', opts:['happier','more happy','happyer','happiest'], correct:0 },
      { src:'expensive (comparativo)', opts:['expensiver','more expensive','expensivest','most expensive'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es el comparativo de "big"?', opts:['more big','biger','bigger','most big'], correct:2 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma comparativa correcta.',
    sents:[
      { pre:'A car is ', ans:'faster', post:' than a bike.', bank:['fast','faster','fastest','more fast'] },
      { pre:'This book is ', ans:'more', post:' interesting than that one.', bank:['more','most','er','much'] },
      { pre:'She is ', ans:'taller', post:' than her sister.', bank:['tall','taller','tallest','more tall'] },
      { pre:'This phone is ', ans:'more', post:' expensive.', bank:['more','most','er','very'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el comparativo.',
    words:[ {scrambled:['R','E','L','L','A','T'],ans:'TALLER',hint:'comparativo de tall'},{scrambled:['R','E','G','G','I','B'],ans:'BIGGER',hint:'comparativo de big'},{scrambled:['R','E','T','S','A','F'],ans:'FASTER',hint:'comparativo de fast'},{scrambled:['R','E','I','P','P','A','H'],ans:'HAPPIER',hint:'comparativo de happy'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada comparativo es correcto.',
    stmts:[
      { text:'El comparativo de "tall" es "taller".', ans:true, expl:'Correcto. 1 silaba: +er.' },
      { text:'El comparativo de "beautiful" es "beautifuler".', ans:false, expl:'Falso. more beautiful.' },
      { text:'El comparativo de "big" es "bigger".', ans:true, expl:'Correcto. CVC duplica.' },
      { text:'El comparativo de "fast" es "more fast".', ans:false, expl:'Falso. faster.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Escribe el comparativo de cada adjetivo.',
    transforms:[
      { original:'tall', task:'Comparativo', opts:['taller','more tall','tallest','more taller'], correct:0 },
      { original:'big', task:'Comparativo', opts:['bigger','more big','biger','most big'], correct:0 },
      { original:'beautiful', task:'Comparativo', opts:['more beautiful','beautifuler','beautifulest','most beautiful'], correct:0 },
      { original:'happy', task:'Comparativo', opts:['happier','more happy','happyer','happiest'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con comparativos.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Is your brother tall?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, he is taller than me.','Yes, he is more tall than me.','Yes, he is tallest than me.','Yes, he is more taller than me.'], correct:0 },
      { speaker:0, text:'Is this phone expensive?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, it is more expensive than mine.','Yes, it is expensiver than mine.','Yes, it is most expensive than mine.','Yes, it is more expensiver than mine.'], correct:0 },
      { speaker:0, text:'Wow!', blank:false } ] }
]);

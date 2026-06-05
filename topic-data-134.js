/* topic-data-134.js - Juego 134/350 | T20 1/7 TELL ME MORE | Adverbios de modo -ly (ESPECIALIZADO) | Plata A2 */
_registerGames(134, 'Adverbios de Modo · -ly', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el adverbio correcto.',
    items:[
      { src:'quick (adverbio)', opts:['quick','quickly','quicky','quikly'], correct:1 },
      { src:'careful (adverbio)', opts:['carefuly','carefully','carefuel','careful'], correct:1 },
      { src:'happy (adverbio)', opts:['happyly','happily','happly','happy'], correct:1 },
      { src:'good (adverbio)', opts:['goodly','well','gooder','best'], correct:1 },
      { src:'fast (adverbio)', opts:['fastly','fast','fastely','faster'], correct:1 },
      { src:'slow (adverbio)', opts:['slowly','slow','slowy','slower'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es el adverbio de "good"?', opts:['goodly','well','better','good'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el adverbio correcto.',
    sents:[
      { pre:'She speaks ', ans:'slowly', post:'.', bank:['slow','slowly','slowy','slower'] },
      { pre:'He runs ', ans:'fast', post:'.', bank:['fast','fastly','fastely','faster'] },
      { pre:'She sings ', ans:'well', post:'.', bank:['good','well','goodly','better'] },
      { pre:'They work ', ans:'carefully', post:'.', bank:['careful','carefully','carefuly','carefulely'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el adverbio.',
    words:[ {scrambled:['Y','L','K','C','I','U','Q'],ans:'QUICKLY',hint:'adverbio de quick'},{scrambled:['L','L','E','W'],ans:'WELL',hint:'adverbio de good'},{scrambled:['Y','L','I','P','P','A','H'],ans:'HAPPILY',hint:'adverbio de happy'},{scrambled:['T','S','A','F'],ans:'FAST',hint:'adverbio igual al adjetivo'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada adverbio es correcto.',
    stmts:[
      { text:'El adverbio de "quick" es "quickly".', ans:true, expl:'Correcto. +ly.' },
      { text:'El adverbio de "good" es "goodly".', ans:false, expl:'Falso. Es irregular: well.' },
      { text:'El adverbio de "fast" es "fast" (sin cambio).', ans:true, expl:'Correcto. fast no cambia.' },
      { text:'El adverbio de "happy" es "happyly".', ans:false, expl:'Falso. happily (y -> i).' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Escribe el adverbio de cada adjetivo.',
    transforms:[
      { original:'quick', task:'Adverbio', opts:['quickly','quick','quicky','quikly'], correct:0 },
      { original:'good', task:'Adverbio', opts:['well','goodly','better','good'], correct:0 },
      { original:'happy', task:'Adverbio', opts:['happily','happyly','happly','happy'], correct:0 },
      { original:'careful', task:'Adverbio', opts:['carefully','carefuly','carefuel','careful'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con adverbios.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'How does she drive?', blank:false },
      { speaker:1, text:null, blank:true, opts:['She drives carefully.','She drives careful.','She drives carefuly.','She drives carefulely.'], correct:0 },
      { speaker:0, text:'How does he sing?', blank:false },
      { speaker:1, text:null, blank:true, opts:['He sings well.','He sings good.','He sings goodly.','He sings better good.'], correct:0 },
      { speaker:0, text:'Nice!', blank:false } ] }
]);

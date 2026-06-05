/* topic-data-218.js - Juego 218/350 | T32 1/7 IF ONLY | Condicional 3 (ESPECIALIZADO) | Platino B2 */
_registerGames(218, 'Condicional 3 · Arrepentimiento', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el Condicional 3 correcto.',
    items:[
      { src:'Si hubiera estudiado, habria aprobado', opts:['If I studied, I would pass','If I had studied, I would have passed','If I had studied, I would pass','If I have studied, I would have passed'], correct:1 },
      { src:'Si me hubieras llamado, habria venido', opts:['If you called me, I would come','If you had called me, I would have come','If you had called me, I would come','If you have called me, I would have come'], correct:1 },
      { src:'Si hubiera sabido, te habria ayudado', opts:['If I knew, I would help','If I had known, I would have helped','If I had known, I would help','If I have known, I would have helped'], correct:1 },
      { src:'Si no hubiera llovido, habriamos salido', opts:['If it did not rain, we would go out','If it had not rained, we would have gone out','If it had not rained, we would go out','If it has not rained, we would have gone out'], correct:1 },
      { src:'Si hubiera tenido dinero, lo habria comprado', opts:['If I had money, I would buy it','If I had had money, I would have bought it','If I had had money, I would buy it','If I have had money, I would have bought it'], correct:1 },
      { src:'Si hubieras venido, te habrias divertido', opts:['If you came, you would have fun','If you had come, you would have had fun','If you had come, you would have fun','If you have come, you would have had fun'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'El Condicional 3 se forma con...', opts:['if + past simple + would','if + past perfect + would have + PP','if + present + will','if + would have + had'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'If I had studied, I ', ans:'would have passed', post:'.', bank:['would have passed','would pass','will pass','had passed'] },
      { pre:'If you ', ans:'had called', post:' me, I would have come.', bank:['had called','called','call','have called'] },
      { pre:'If I had known, I would have ', ans:'helped', post:'.', bank:['helped','help','helping','helps'] },
      { pre:'If it had not rained, we would have ', ans:'gone', post:' out.', bank:['gone','go','went','going'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['D','A','H'],ans:'HAD',hint:'if + ... + participio'},{scrambled:['D','L','U','O','W'],ans:'WOULD',hint:'... have + participio'},{scrambled:['E','V','A','H'],ans:'HAVE',hint:'would ... + participio'},{scrambled:['D','E','S','S','A','P'],ans:'PASSED',hint:'participio de pass'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'El Condicional 3 habla de situaciones imposibles del pasado.', ans:true, expl:'Correcto. arrepentimiento.' },
      { text:'"If I had studied, I would have passed." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"If I would have studied, I would have passed." es correcto.', ans:false, expl:'Falso. If I had studied.' },
      { text:'El Condicional 3 usa "if + past perfect".', ans:true, expl:'Correcto.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma el Condicional 3.',
    transforms:[
      { original:'study / pass', task:'Cond. 3', opts:['If I had studied, I would have passed.','If I studied, I would pass.','If I had studied, I would pass.','If I have studied, I would have passed.'], correct:0 },
      { original:'call / come', task:'Cond. 3', opts:['If you had called, I would have come.','If you called, I would come.','If you had called, I would come.','If you have called, I would have come.'], correct:0 },
      { original:'know / help', task:'Cond. 3', opts:['If I had known, I would have helped.','If I knew, I would help.','If I had known, I would help.','If I have known, I would have helped.'], correct:0 },
      { original:'not rain / go out', task:'Cond. 3', opts:['If it had not rained, we would have gone out.','If it did not rain, we would go out.','If it had not rained, we would go out.','If it has not rained, we would have gone out.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Why did you fail the exam?', blank:false },
      { speaker:1, text:null, blank:true, opts:['If I had studied, I would have passed.','If I studied, I would pass.','If I had studied, I would pass.','If I have studied, I would have passed.'], correct:0 },
      { speaker:0, text:'Why are you angry?', blank:false },
      { speaker:1, text:null, blank:true, opts:['If you had called, I would have come.','If you called, I would come.','If you had called, I would come.','If you have called, I would have come.'], correct:0 },
      { speaker:0, text:'Sorry.', blank:false } ] }
]);

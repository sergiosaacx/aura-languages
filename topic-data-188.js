/* topic-data-188.js - Juego 188/350 | T27 6/7 VERB PATTERNS | gerundio e infinitivo en contexto (MEZCLADO) | Oro B1 */
_registerGames(188, 'Gerundio e Infinitivo · En Contexto', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'I have decided ___ to a new city.', opts:['moving','to move','move','to moving'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta segun el verbo principal.',
    sents:[
      { pre:'I have decided ', ans:'to move', post:' to a new city.', bank:['to move','moving','move','moves'] },
      { pre:'She cannot stand ', ans:'waiting', post:' in queues.', bank:['waiting','to wait','wait','waits'] },
      { pre:'He let her ', ans:'borrow', post:' his car.', bank:['borrow','to borrow','borrowing','borrows'] },
      { pre:'They keep ', ans:'arguing', post:' about money.', bank:['arguing','to argue','argue','argues'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada regla es correcta.',
    stmts:[
      { text:'"cannot stand" va seguido de gerundio.', ans:true, expl:'Correcto. She cannot stand waiting.' },
      { text:'"decide" va seguido de infinitivo con to.', ans:true, expl:'Correcto. I decided to move.' },
      { text:'"let" va seguido de infinitivo con to.', ans:false, expl:'Falso. let + obj + inf sin to.' },
      { text:'"keep" va seguido de gerundio.', ans:true, expl:'Correcto. They keep arguing.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion con el patron correcto.',
    transforms:[
      { original:'decide / move', task:'Patron', opts:['I have decided to move.','I have decided moving.','I have decided move.','I have decided to moving.'], correct:0 },
      { original:'cannot stand / wait', task:'Patron', opts:['She cannot stand waiting.','She cannot stand to wait.','She cannot stand wait.','She cannot stand to waiting.'], correct:0 },
      { original:'let / her / borrow', task:'Patron', opts:['He let her borrow his car.','He let her to borrow his car.','He let her borrowing his car.','He let her borrows his car.'], correct:0 },
      { original:'avoid / make', task:'Patron', opts:['I avoid making mistakes.','I avoid to make mistakes.','I avoid make mistakes.','I avoid to making mistakes.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What did you decide?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I have decided to move abroad.','I have decided moving abroad.','I have decided move abroad.','I have decided to moving abroad.'], correct:0 },
      { speaker:0, text:'Can she wait in line?', blank:false },
      { speaker:1, text:null, blank:true, opts:['No, she cannot stand waiting.','No, she cannot stand to wait.','No, she cannot stand wait.','No, she cannot stand to waiting.'], correct:0 },
      { speaker:0, text:'I understand.', blank:false } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada verbo con la forma que rige.',
    pairs:[ ['decide','to move'],['cannot stand','waiting'],['let her','borrow'],['keep','arguing'],['want','to go'],['avoid','making'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['to','I','have','decided','move'],ans:['I','have','decided','to','move']},{words:['waiting','She','cannot','stand'],ans:['She','cannot','stand','waiting']},{words:['borrow','He','let','her','his','car'],ans:['He','let','her','borrow','his','car']} ] }
]);

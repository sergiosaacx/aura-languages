/* topic-data-029.js - Juego 29/350 | T5 1/7 COUNT THE WORLD | Numeros 1-100 (ESPECIALIZADO) | Bronce A1 */
_registerGames(29, 'Numeros · 1 a 100', [
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige el numero correcto en ingles.',
    items:[
      { src:'15', opts:['fifty','fifteen','fivety','fiveteen'], correct:1 },
      { src:'50', opts:['fifteen','fifty','fivteen','fiftty'], correct:1 },
      { src:'13', opts:['thirty','thirteen','threeteen','thirdteen'], correct:1 },
      { src:'30', opts:['thirteen','thirty','thirtty','thirdty'], correct:1 },
      { src:'14', opts:['forty','fourteen','fortteen','fourtteen'], correct:1 },
      { src:'40', opts:['fourteen','forty','fourty','fortty'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Como se escribe el numero 40?',
    opts:['fourteen','forty','fourty','fortty'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el numero correcto.',
    sents:[
      { pre:'I am ', ans:'fifteen', post:' years old.', bank:['fifty','fifteen','fivety','fiveteen'] },
      { pre:'She has ', ans:'thirty', post:' books.', bank:['thirteen','thirty','thirtty','thirdty'] },
      { pre:'There are ', ans:'forty', post:' students.', bank:['fourteen','forty','fourty','fortty'] },
      { pre:'He is ', ans:'thirteen', post:' years old.', bank:['thirty','thirteen','threeteen','thirdteen'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma el numero en ingles.',
    words:[ {scrambled:['E','T','N'],ans:'TEN',hint:'el numero 10'},{scrambled:['Y','T','W','E','N','T'],ans:'TWENTY',hint:'el numero 20'},{scrambled:['F','I','E','V'],ans:'FIVE',hint:'el numero 5'},{scrambled:['G','H','T','I','E'],ans:'EIGHT',hint:'el numero 8'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada equivalencia es correcta.',
    stmts:[
      { text:'"fifteen" es el numero 15.', ans:true, expl:'Correcto. fifteen = 15.' },
      { text:'"fifty" es el numero 15.', ans:false, expl:'Falso. fifty = 50. El 15 es fifteen.' },
      { text:'"thirty" es el numero 30.', ans:true, expl:'Correcto. thirty = 30.' },
      { text:'"fourteen" es el numero 40.', ans:false, expl:'Falso. fourteen = 14. El 40 es forty.' } ] },
  { id:'transform', label:'Transforma', xp:35,
    instr:'Escribe cada numero en ingles.',
    transforms:[
      { original:'13', task:'En ingles', opts:['thirteen','thirty','threeteen','thirdteen'], correct:0 },
      { original:'40', task:'En ingles', opts:['forty','fourteen','fourty','fortty'], correct:0 },
      { original:'15', task:'En ingles', opts:['fifteen','fifty','fivety','fiveteen'], correct:0 },
      { original:'20', task:'En ingles', opts:['twenty','twelve','twenteen','twoty'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo con el numero correcto.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'How old are you?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I am fifteen.','I am fifty.','I am fivety.','I am fiveteen.'], correct:0 },
      { speaker:0, text:'How many books do you have?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I have thirty.','I have thirteen.','I have threeteen.','I have thirdty.'], correct:0 },
      { speaker:0, text:'Wow!', blank:false } ] }
]);

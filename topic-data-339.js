/* topic-data-339.js - Juego 339/350 | T49 3/7 DISCOURSE ANALYSIS | actos de habla (ESPECIALIZADO) | Challenger C2 */
_registerGames(339, 'Actos de Habla · Clasificacion', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"I promise to help you" es un acto de habla...', opts:['assertive','directive','commissive','expressive'], correct:2 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada tipo con su ejemplo.',
    pairs:[ ['assertive','The earth is round'],['directive','Close the door'],['commissive','I promise to come'],['expressive','I am sorry'],['declarative','I now pronounce you married'],['question','What time is it?'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el tipo de acto de habla.',
    sents:[
      { pre:'"Close the door" is a ', ans:'directive', post:'.', bank:['directive','assertive','commissive','expressive'] },
      { pre:'"I promise to help" is a ', ans:'commissive', post:'.', bank:['commissive','directive','assertive','expressive'] },
      { pre:'"Congratulations!" is an ', ans:'expressive', post:'.', bank:['expressive','directive','assertive','declarative'] },
      { pre:'"The meeting is adjourned" is a ', ans:'declarative', post:'.', bank:['declarative','assertive','expressive','directive'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada enunciado por su acto de habla.',
    categories:['Assertive','Directive','Commissive / Expressive'],
    items:[ {text:'It is raining',correct:0},{text:'Please sit down',correct:1},{text:'I promise to call',correct:2},{text:'Water boils at 100C',correct:0},{text:'Pass me the book',correct:1},{text:'Thank you so much',correct:2} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la clasificacion es correcta.',
    stmts:[
      { text:'Un acto assertive afirma algo sobre el mundo.', ans:true, expl:'Correcto.' },
      { text:'"Close the door" es un acto expressive.', ans:false, expl:'Falso. es directive.' },
      { text:'"I promise to help" es un acto commissive.', ans:true, expl:'Correcto.' },
      { text:'"I now pronounce you married" es un acto assertive.', ans:false, expl:'Falso. es declarative.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Identifica el acto de habla.',
    transforms:[
      { original:'"The sky is blue."', task:'Acto', opts:['assertive','directive','commissive','expressive'], correct:0 },
      { original:'"Open the window, please."', task:'Acto', opts:['directive','assertive','commissive','expressive'], correct:0 },
      { original:'"I will pay you back."', task:'Acto', opts:['commissive','directive','assertive','expressive'], correct:0 },
      { original:'"I am delighted to see you."', task:'Acto', opts:['expressive','directive','commissive','assertive'], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el tipo de acto.',
    words:[ {scrambled:['E','V','I','T','R','E','S','S','A'],ans:'ASSERTIVE',hint:'afirma algo'},{scrambled:['E','V','I','T','C','E','R','I','D'],ans:'DIRECTIVE',hint:'da una orden'},{scrambled:['E','V','I','S','S','I','M','M','O','C'],ans:'COMMISSIVE',hint:'compromete al hablante'},{scrambled:['E','V','I','S','S','E','R','P','X','E'],ans:'EXPRESSIVE',hint:'expresa emocion'} ] }
]);

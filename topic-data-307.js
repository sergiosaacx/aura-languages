/* topic-data-307.js - Juego 307/350 | T44 6/7 COLLOCATION MASTER | colocaciones en texto C1 (MEZCLADO) | Diamante C1 */
_registerGames(307, 'Colocaciones · En Texto de Nivel C1', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"He ___ a detailed analysis of the situation."', opts:['made','did','carried out','took'], correct:2 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el colocado convencional.',
    sents:[
      { pre:'He ', ans:'carried out', post:' a detailed analysis.', bank:['carried out','made','did','took'] },
      { pre:'The company ', ans:'made', post:' a loss of two million.', bank:['made','did','took','gave'] },
      { pre:'They ', ans:'reached', post:' an agreement.', bank:['reached','made','did','took'] },
      { pre:'She ', ans:'raised', post:' an important question.', bank:['raised','made','did','took'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada sustantivo con su verbo colocacional.',
    pairs:[ ['an analysis','carry out'],['a loss','make'],['an agreement','reach'],['a question','raise'],['a profit','make a'],['a conclusion','draw'] ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada colocacion es correcta.',
    stmts:[
      { text:'"carry out an analysis" es correcto.', ans:true, expl:'Correcto.' },
      { text:'"do a loss" es correcto.', ans:false, expl:'Falso. make a loss.' },
      { text:'"reach an agreement" es correcto.', ans:true, expl:'Correcto.' },
      { text:'"make a question" es la colocacion convencional.', ans:false, expl:'Falso. raise/ask a question.' } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['out','He','carried','an','analysis'],ans:['He','carried','out','an','analysis']},{words:['made','The','company','a','loss'],ans:['The','company','made','a','loss']},{words:['reached','They','an','agreement'],ans:['They','reached','an','agreement']} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada sustantivo por su verbo.',
    categories:['make','carry out / reach','raise / draw'],
    items:[ {text:'a loss',correct:0},{text:'an analysis',correct:1},{text:'a question',correct:2},{text:'a profit',correct:0},{text:'an agreement',correct:1},{text:'a conclusion',correct:2} ] },
  { id:'scramble', label:'Descifra el verbo', xp:20, instr:'Forma el verbo.',
    words:[ {scrambled:['Y','R','R','A','C'],ans:'CARRY',hint:'... out an analysis'},{scrambled:['E','D','A','M'],ans:'MADE',hint:'... a loss'},{scrambled:['D','E','H','C','A','E','R'],ans:'REACHED',hint:'... an agreement'},{scrambled:['E','S','I','A','R'],ans:'RAISE',hint:'... a question'} ] }
]);

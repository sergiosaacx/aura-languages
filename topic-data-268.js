/* topic-data-268.js - Juego 268/350 | T39 2/7 INVERSION | cleft sentences (ESPECIALIZADO) | Diamante C1 */
_registerGames(268, 'Cleft Sentences · It is / was ... who / that', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Para enfatizar a una persona se usa "It was ... ___".', opts:['which','who','where','whose'], correct:1 },
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la cleft sentence correcta.',
    items:[
      { src:'Fue John quien rompio la ventana', opts:['It was John who broke the window','It was John which broke the window','It was John broke the window','It is John who broke the window'], correct:0 },
      { src:'Fue la ventana lo que John rompio', opts:['It was the window who John broke','It was the window that John broke','It was the window John broke it','It was the window which broke John'], correct:1 },
      { src:'Fue en Paris donde se conocieron', opts:['It was in Paris that they met','It was in Paris who they met','It was Paris they met in','It was in Paris where met they'], correct:0 },
      { src:'Fue ayer cuando llego', opts:['It was yesterday who he arrived','It was yesterday that he arrived','It was yesterday he arrived then','It is yesterday that he arrived'], correct:1 },
      { src:'Fue Maria quien gano', opts:['It was Maria who won','It was Maria which won','It was Maria that won her','It was Maria she won'], correct:0 },
      { src:'Fue el coche lo que compraron', opts:['It was the car who they bought','It was the car that they bought','It was the car they bought it','It was the car which bought'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada elemento enfatizado con su pronombre.',
    pairs:[ ['John (persona)','who'],['the window (cosa)','that'],['in Paris (lugar)','that + lugar'],['yesterday (tiempo)','that + tiempo'],['Maria (sujeto)','who won'],['the car (objeto)','that they bought'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el pronombre correcto para la cleft sentence.',
    sents:[
      { pre:'It was John ', ans:'who', post:' broke the window.', bank:['who','which','where','whose'] },
      { pre:'It was the window ', ans:'that', post:' John broke.', bank:['that','who','where','whose'] },
      { pre:'It was in Paris ', ans:'that', post:' they first met.', bank:['that','who','where','whose'] },
      { pre:'It was Maria ', ans:'who', post:' won the prize.', bank:['who','which','where','whose'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['who','It','was','John','broke','it'],ans:['It','was','John','who','broke','it']},{words:['that','It','was','the','car','they','bought'],ans:['It','was','the','car','that','they','bought']},{words:['that','It','was','in','Paris','they','met'],ans:['It','was','in','Paris','that','they','met']} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada cleft sentence es correcta.',
    stmts:[
      { text:'"It was John who broke the window." enfatiza a John.', ans:true, expl:'Correcto. enfasis en el sujeto.' },
      { text:'"It was John which broke the window." es correcto.', ans:false, expl:'Falso. who para personas.' },
      { text:'"It was the window that John broke." enfatiza el objeto.', ans:true, expl:'Correcto.' },
      { text:'"It is John who broke it." es correcto para un evento pasado.', ans:false, expl:'Falso. It was John (pasado).' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma una cleft sentence que enfatice el elemento dado.',
    transforms:[
      { original:'John broke the window. (enfasis: John)', task:'Cleft', opts:['It was John who broke the window.','It was John which broke the window.','It was the window John broke.','It was John broke the window.'], correct:0 },
      { original:'John broke the window. (enfasis: window)', task:'Cleft', opts:['It was the window that John broke.','It was the window who John broke.','It was the window John broke it.','It was window that broke.'], correct:0 },
      { original:'They met in Paris. (enfasis: Paris)', task:'Cleft', opts:['It was in Paris that they met.','It was in Paris who they met.','It was Paris they met.','It was in Paris where met.'], correct:0 },
      { original:'Maria won. (enfasis: Maria)', task:'Cleft', opts:['It was Maria who won.','It was Maria which won.','It was Maria that won her.','It was Maria she won.'], correct:0 } ] }
]);

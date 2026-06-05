/* topic-data-281.js - Juego 281/350 | T41 1/7 ELLIPSIS | elipsis verbal (ESPECIALIZADO) | Diamante C1 */
_registerGames(281, 'Elipsis Verbal · Omitir lo Conocido', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la respuesta con elipsis correcta.',
    items:[
      { src:'Sabes nadar? Si, se', opts:['Can you swim? Yes, I can swim','Can you swim? Yes, I can','Can you swim? Yes, I do','Can you swim? Yes, I am'], correct:1 },
      { src:'Ella quiere ir y yo tambien', opts:['She wants to go and I want to go too','She wants to go and so do I','She wants to go and so am I','She wants to go and so I do'], correct:1 },
      { src:'Has terminado? Si, ya termine', opts:['Have you finished? Yes, I have','Have you finished? Yes, I do','Have you finished? Yes, I am','Have you finished? Yes, I finished have'], correct:0 },
      { src:'Vendras? Si, vendre', opts:['Will you come? Yes, I will','Will you come? Yes, I do','Will you come? Yes, I am','Will you come? Yes, I come'], correct:0 },
      { src:'Le gusta el cafe? Si, le gusta', opts:['Does she like coffee? Yes, she does','Does she like coffee? Yes, she likes','Does she like coffee? Yes, she is','Does she like coffee? Yes, she do'], correct:0 },
      { src:'Estas listo? Si, lo estoy', opts:['Are you ready? Yes, I am','Are you ready? Yes, I do','Are you ready? Yes, I can','Are you ready? Yes, I ready'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Can you swim?" Respuesta corta con elipsis:', opts:['Yes, I can swim','Yes, I can','Yes, I do','Yes, I am'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el auxiliar correcto para la elipsis.',
    sents:[
      { pre:'Can you swim? Yes, I ', ans:'can', post:'.', bank:['can','do','am','will'] },
      { pre:'Have you finished? Yes, I ', ans:'have', post:'.', bank:['have','do','am','can'] },
      { pre:'Will you come? Yes, I ', ans:'will', post:'.', bank:['will','do','am','have'] },
      { pre:'Does she like it? Yes, she ', ans:'does', post:'.', bank:['does','is','has','can'] } ] },
  { id:'scramble', label:'Descifra el auxiliar', xp:20, instr:'Forma el auxiliar.',
    words:[ {scrambled:['N','A','C'],ans:'CAN',hint:'Can you swim? Yes, I ...'},{scrambled:['E','V','A','H'],ans:'HAVE',hint:'Have you finished? Yes, I ...'},{scrambled:['L','L','I','W'],ans:'WILL',hint:'Will you come? Yes, I ...'},{scrambled:['S','E','O','D'],ans:'DOES',hint:'Does she? Yes, she ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada respuesta usa elipsis correcta.',
    stmts:[
      { text:'"Can you swim? Yes, I can." usa elipsis correcta.', ans:true, expl:'Correcto. se omite swim.' },
      { text:'"Have you finished? Yes, I do." es correcto.', ans:false, expl:'Falso. Yes, I have.' },
      { text:'"She wants to go and so do I." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"Will you come? Yes, I am." es correcto.', ans:false, expl:'Falso. Yes, I will.' } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada pregunta con su respuesta corta.',
    pairs:[ ['Can you swim?','Yes, I can'],['Have you finished?','Yes, I have'],['Will you come?','Yes, I will'],['Are you ready?','Yes, I am'],['Does she like it?','Yes, she does'],['Did they leave?','Yes, they did'] ] }
  ,{ id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['can','Yes','I'],ans:['Yes','I','can']},{words:['have','Yes','I'],ans:['Yes','I','have']},{words:['will','Yes','I'],ans:['Yes','I','will']} ] }
]);

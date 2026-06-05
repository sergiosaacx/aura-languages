/* topic-data-350.js - Juego 350/350 | T50 7/7 NATIVE FLUENCY | pulir el ingles avanzado (MEZCLADO) | Challenger C2 */
_registerGames(350, 'Pulir el Ingles Avanzado · De Correcto a Nativo', [
  { id:'translate', label:'Version nativa', xp:25, instr:'Elige la version nativa correcta.',
    items:[
      { src:'hice una foto', opts:['I made a photo','I took a photo','I did a photo','I gave a photo'], correct:1 },
      { src:'ella tiene 30 anos', opts:['she has 30 years','she is 30 years old','she makes 30 years','she has 30 years old'], correct:1 },
      { src:'depende de ti', opts:['it depends of you','it depends on you','it depends to you','it depends from you'], correct:1 },
      { src:'estoy muy emocionado', opts:['I am very excited','I am very exciting','I have much excitation','I make excitement'], correct:0 },
      { src:'me explico esto', opts:['he explained me this','he explained this to me','he me explained this','he explain me this'], correct:1 },
      { src:'al final lo conseguimos', opts:['in the final we got it','in the end we made it','at the final we did it','to the end we got it'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"I made a photo" deberia ser...', opts:['I took a photo','I did a photo','I gave a photo','I had a photo'], correct:0 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada calco con su forma nativa.',
    pairs:[ ['I made a photo','I took a photo'],['she has 30 years','she is 30'],['it depends of you','it depends on you'],['I am exciting (yo)','I am excited'],['he explained me this','he explained this to me'],['in the final','in the end'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['photo','I','took','a'],ans:['I','took','a','photo']},{words:['old','she','is','30','years'],ans:['she','is','30','years','old']},{words:['you','it','depends','on'],ans:['it','depends','on','you']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el calco y elige la forma nativa.',
    sents:[
      { words:['I','made','a','photo','.'], wi:1, correct:'took', choices:['took','made','did','gave'] },
      { words:['She','has','30','years','.'], wi:1, correct:'is', choices:['is','has','makes','holds'] },
      { words:['It','depends','of','you','.'], wi:2, correct:'on', choices:['on','of','to','from'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la oracion es nativa.',
    stmts:[
      { text:'"I took a photo" es la forma nativa.', ans:true, expl:'Correcto.' },
      { text:'"She has 30 years" es la forma nativa.', ans:false, expl:'Falso. She is 30 (years old).' },
      { text:'"it depends on you" es correcto.', ans:true, expl:'Correcto.' },
      { text:'"he explained me this" es la forma nativa.', ans:false, expl:'Falso. he explained this to me.' } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['K','O','O','T'],ans:'TOOK',hint:'I ... a photo'},{scrambled:['N','O'],ans:'ON',hint:'depends ... you'},{scrambled:['D','E','T','I','C','X','E'],ans:'EXCITED',hint:'I am ...'},{scrambled:['D','N','E'],ans:'END',hint:'in the ... (al final)'} ] }
]);

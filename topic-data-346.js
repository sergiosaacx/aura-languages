/* topic-data-346.js - Juego 346/350 | T50 3/7 NATIVE FLUENCY | errores del hablante avanzado (ESPECIALIZADO) | Challenger C2 */
_registerGames(346, 'Errores Tipicos del Hablante Avanzado', [
  { id:'translate', label:'Forma nativa', xp:25, instr:'Elige la forma nativa correcta.',
    items:[
      { src:'hacer una foto', opts:['make a photo','take a photo','do a photo','give a photo'], correct:1 },
      { src:'tengo 30 anos', opts:['I have 30 years','I am 30 years old','I have 30 years old','I make 30 years'], correct:1 },
      { src:'depende de ti', opts:['it depends of you','it depends on you','it depends to you','it depends from you'], correct:1 },
      { src:'estoy de acuerdo', opts:['I am agree','I agree','I am agreed','I do agree with myself'], correct:1 },
      { src:'explicame esto', opts:['explain me this','explain this to me','explain to me this thing here','me explain this'], correct:1 },
      { src:'estoy aburrido', opts:['I am boring','I am bored','I have boredom','I make bored'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['make a photo','take a photo','do a photo','give a photo'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su forma nativa.',
    pairs:[ ['make a photo','take a photo'],['I have 30 years','I am 30 years old'],['depends of you','depends on you'],['I am agree','I agree'],['explain me this','explain this to me'],['I am boring (yo)','I am bored'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['photo','take','a'],ans:['take','a','photo']},{words:['old','I','am','30','years'],ans:['I','am','30','years','old']},{words:['you','It','depends','on'],ans:['It','depends','on','you']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el error y elige la correccion.',
    sents:[
      { words:['I','want','to','make','a','photo','.'], wi:3, correct:'take', choices:['take','make','do','give'] },
      { words:['I','have','30','years','.'], wi:1, correct:'am', choices:['am','have','make','do'] },
      { words:['It','depends','of','you','.'], wi:2, correct:'on', choices:['on','of','to','from'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es nativa.',
    stmts:[
      { text:'"take a photo" es la forma nativa.', ans:true, expl:'Correcto.' },
      { text:'"I have 30 years" es la forma nativa.', ans:false, expl:'Falso. I am 30 years old.' },
      { text:'"it depends on you" es correcto.', ans:true, expl:'Correcto.' },
      { text:'"I am agree" es la forma nativa.', ans:false, expl:'Falso. I agree.' } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['E','K','A','T'],ans:'TAKE',hint:'... a photo'},{scrambled:['N','O'],ans:'ON',hint:'depends ... you'},{scrambled:['E','E','R','G','A'],ans:'AGREE',hint:'I ...'},{scrambled:['D','E','R','O','B'],ans:'BORED',hint:'I am ...'} ] }
]);

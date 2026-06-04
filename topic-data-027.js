/* topic-data-027.js - Juego 27/350 | T4 6/7 A OR THE? | some/any/the/a/an en contexto (MEZCLADO) | Bronce A1 */
_registerGames(27, 'Articulos y Cuantificadores · Contexto Real', [
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'En una frase negativa con "money", que palabra usas?',
    opts:['some','any','a','an'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca la palabra correcta para cada contexto.',
    sents:[
      { pre:'I do not have ', ans:'any', post:' money.', bank:['some','any','a','the'] },
      { pre:'Can I have ', ans:'some', post:' water?', bank:['some','any','an','the'] },
      { pre:'There is ', ans:'a', post:' dog outside.', bank:['a','an','some','any'] },
      { pre:'She is ', ans:'an', post:' artist.', bank:['a','an','the','some'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma la palabra.',
    words:[ {scrambled:['O','S','E','M'],ans:'SOME',hint:'afirmativas'},{scrambled:['N','Y','A'],ans:'ANY',hint:'negativas y preguntas'},{scrambled:['H','E','T'],ans:'THE',hint:'algo conocido o unico'},{scrambled:['N','A'],ans:'AN',hint:'antes de vocal'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"There is a cat outside." es correcto.', ans:true, expl:'Correcto. a + primera mencion.' },
      { text:'"I do not have some money." es correcto.', ans:false, expl:'Falso. En negativa se usa any.' },
      { text:'"The moon is bright." es correcto.', ans:true, expl:'Correcto. the para algo unico.' },
      { text:'"There is an dog." es correcto.', ans:false, expl:'Falso. dog empieza con consonante: a dog.' } ] },
  { id:'transform', label:'Transforma', xp:35,
    instr:'Corrige cada oracion a su forma correcta.',
    transforms:[
      { original:'I have any books.', task:'Forma correcta', opts:['I have some books.','I have a books.','I have an books.','I have the books.'], correct:0 },
      { original:'I do not have some milk.', task:'Forma correcta', opts:['I do not have any milk.','I do not have a milk.','I do not have an milk.','I do not have the milk.'], correct:0 },
      { original:'She is a artist.', task:'Forma correcta', opts:['She is an artist.','She is a artist.','She is the artist.','She is some artist.'], correct:0 },
      { original:'He plays a guitar.', task:'Instrumento (the)', opts:['He plays the guitar.','He plays a guitar.','He plays an guitar.','He plays guitar.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Do we have any milk?', blank:false },
      { speaker:1, text:null, blank:true, opts:['No, we do not have any milk.','No, we do not have some milk.','No, we do not have a milk.','No, we do not have the milk.'], correct:0 },
      { speaker:0, text:'Can you buy some bread?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I will buy some bread.','Yes, I will buy any bread.','Yes, I will buy a bread.','Yes, I will buy an bread.'], correct:0 },
      { speaker:0, text:'Thanks!', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['I','have','any','friends','.'], wi:2, correct:'some', choices:['some','any','a','the'] },
      { words:['She','is','a','engineer','.'], wi:2, correct:'an', choices:['an','a','the','some'] },
      { words:['I','see','a','moon','.'], wi:2, correct:'the', choices:['the','a','an','one'] } ] }
]);

/* topic-data-047.js - Juego 47/350 | T7 5/7 COLOR YOUR WORDS | Adjetivos y adverbios en oraciones (MEZCLADO) | Bronce A1 */
_registerGames(47, 'Adjetivos y Adverbios · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la palabra correcta en ingles.',
    items:[
      { src:'azul', opts:['blue','green','black','red'], correct:0 },
      { src:'siempre', opts:['never','always','sometimes','often'], correct:1 },
      { src:'pequeno', opts:['big','small','tall','long'], correct:1 },
      { src:'nunca', opts:['always','never','usually','often'], correct:1 },
      { src:'viejo', opts:['new','old','young','big'], correct:1 },
      { src:'a veces', opts:['always','sometimes','never','usually'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['She wears always a blue dress.','She always wears a blue dress.','She always wears a dress blue.','Always she wears a blue dress.'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada frase en espanol con su forma en ingles.',
    pairs:[ ['un vestido azul','a blue dress'],['ella siempre','she always'],['un carro pequeno','a small car'],['el nunca','he never'],['un perro viejo','an old dog'],['a veces nosotros','sometimes we'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta.',
    sents:[
      { pre:'She always wears a ', ans:'blue', post:' dress.', bank:['blue','blues','bluely','bluer'] },
      { pre:'He is ', ans:'never', post:' late.', bank:['never','nevers','no','not'] },
      { pre:'I have a small ', ans:'old', post:' car.', bank:['old','older','olds','oldly'] },
      { pre:'We ', ans:'sometimes', post:' watch films.', bank:['sometimes','sometime','some','always'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['always','She','a','blue','wears','dress'],ans:['She','always','wears','a','blue','dress']},{words:['is','He','never','late'],ans:['He','is','never','late']},{words:['have','I','a','small','old','car'],ans:['I','have','a','small','old','car']} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What does she wear?', blank:false },
      { speaker:1, text:null, blank:true, opts:['She always wears a blue dress.','She wears always a blue dress.','She always wears a dress blue.','She is always wears a blue dress.'], correct:0 },
      { speaker:0, text:'Is he ever late?', blank:false },
      { speaker:1, text:null, blank:true, opts:['No, he is never late.','No, he never is late.','No, he is late never.','No, he is not never late.'], correct:0 },
      { speaker:0, text:'Good.', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['I','have','a','blue','cars','.'], wi:4, correct:'car', choices:['car','cars','blue','blues'] },
      { words:['The','ice','is','hot','.'], wi:3, correct:'cold', choices:['cold','hot','warm','cool'] },
      { words:['He','is','a','old','man','.'], wi:2, correct:'an', choices:['an','a','the','one'] } ] }
]);

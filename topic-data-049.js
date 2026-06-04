/* topic-data-049.js - Juego 49/350 | T7 7/7 COLOR YOUR WORDS | errores tipicos de los 3 temas (MEZCLADO) | Bronce A1 */
_registerGames(49, 'Adjetivos y Adverbios · Errores', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'un carro rojo', opts:['a car red','a red car','red a car','a red cars'], correct:1 },
      { src:'ella siempre va', opts:['she goes always','she always goes','always she goes','she is always goes'], correct:1 },
      { src:'un hombre alto y viejo', opts:['a old tall man','a tall old man','an tall old man','a man tall old'], correct:1 },
      { src:'un vestido azul', opts:['a dress blue','a blue dress','blue a dress','a blue dresses'], correct:1 },
      { src:'el nunca llega tarde', opts:['he never is late','he is never late','he is late never','never he is late'], correct:1 },
      { src:'un perro pequeno', opts:['a dog small','a small dog','small a dog','a small dogs'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['I have a car red.','I have a red car.','I have red a car.','I have a red cars.'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['a car red','a red car'],['she goes always','she always goes'],['a old tall man','a tall old man'],['he is late never','he is never late'],['a dress blue','a blue dress'],['a dog small','a small dog'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['red','a','car'],ans:['a','red','car']},{words:['always','She','goes'],ans:['She','always','goes']},{words:['is','He','never','late'],ans:['He','is','never','late']} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada frase como correcta o incorrecta.',
    categories:['Correcta','Incorrecta'],
    items:[ {text:'a red car',correct:0},{text:'a car red',correct:1},{text:'she always goes',correct:0},{text:'she goes always',correct:1},{text:'a tall old man',correct:0},{text:'a old tall man',correct:1} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo eligiendo la correccion.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Is "a car red" correct?', blank:false },
      { speaker:1, text:null, blank:true, opts:['No, it is "a red car".','Yes, it is correct.','No, it is "a red cars".','No, it is "red a car".'], correct:0 },
      { speaker:0, text:'And "she goes always"?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It should be "she always goes".','It is correct.','It should be "she go always".','It should be "always goes she".'], correct:0 },
      { speaker:0, text:'Thanks!', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['He','is','a','old','man','.'], wi:2, correct:'an', choices:['an','a','the','one'] },
      { words:['The','water','is','hot','.'], wi:3, correct:'cold', choices:['cold','hot','warm','cool'] },
      { words:['I','have','a','blue','cars','.'], wi:4, correct:'car', choices:['car','cars','blue','blues'] } ] }
]);

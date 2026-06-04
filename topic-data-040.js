/* topic-data-040.js - Juego 40/350 | T6 5/7 MINE & YOURS | posesivos y genitivo en oraciones (MEZCLADO) | Bronce A1 */
_registerGames(40, 'Posesivos y Genitivo · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige la traduccion correcta.',
    items:[
      { src:'su nombre (de ella)',     opts:['his name','her name','its name','their name'], correct:1 },
      { src:'nuestro profesor',        opts:['our teacher','their teacher','your teacher','his teacher'], correct:0 },
      { src:'el carro de mi hermano',  opts:["my brother car","my brother's car","my brothers car","brother's my car"], correct:1 },
      { src:'su casa (de ellos)',      opts:['his house','her house','their house','our house'], correct:2 },
      { src:'mi libro',                opts:['me book','my book','mine book','I book'], correct:1 },
      { src:'el perro de Tom',         opts:["Tom dog","Toms dog","Tom's dog","dogs Tom"], correct:2 } ] },
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada frase en espanol con su forma en ingles.',
    pairs:[ ['mi libro','my book'],['su nombre (ella)','her name'],['nuestro profesor','our teacher'],['el carro de Tom',"Tom's car"],['su casa (ellos)','their house'],['tu amigo','your friend'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma el adjetivo posesivo.',
    words:[ {scrambled:['R','E','H'],ans:'HER',hint:'posesivo de she'},{scrambled:['R','U','O'],ans:'OUR',hint:'posesivo de we'},{scrambled:['I','E','R','T','H'],ans:'THEIR',hint:'posesivo de they'},{scrambled:['Y','M'],ans:'MY',hint:'posesivo de I'} ] },
  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada forma como adjetivo posesivo o genitivo sajon.',
    categories:['Adjetivo posesivo','Genitivo sajon'],
    items:[ {text:'my',correct:0},{text:"Tom's",correct:1},{text:'her',correct:0},{text:"Ana's",correct:1},{text:'our',correct:0},{text:"the dog's",correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:"This is my brother's car.", type:'select', opts:["This is my brother's car.","This is my brothers car.","This is me brother's car.","This is mine brother's car."], correct:0 },
      { tts:'Her name is Ana.', type:'select', opts:['Her name is Ana.','His name is Ana.','Their name is Ana.','Your name is Ana.'], correct:0 },
      { tts:'Our teacher is kind.', type:'select', opts:['Our teacher is kind.','Their teacher is kind.','Your teacher is kind.','My teacher is kind.'], correct:0 } ] },
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:["brother's",'This','is','my','car'], ans:['This','is','my',"brother's",'car'] },
      { words:['name','Her','is','Ana'], ans:['Her','name','is','Ana'] },
      { words:['teacher','Our','is','kind'], ans:['Our','teacher','is','kind'] } ] },
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['This','is','me','book','.'], wi:2, correct:'my', choices:['my','me','mine','I'] },
      { words:['His','name','is','Ana','.'], wi:0, correct:'Her', choices:['Her','His','Hers','She'] },
      { words:['That','is','Toms','car','.'], wi:2, correct:"Tom's", choices:["Tom's","Toms","Tom","Toms'"] } ] }
]);

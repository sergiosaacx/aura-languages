/* topic-data-037.js - Juego 37/350 | T6 2/7 MINE & YOURS | Genitivo sajon 's regla (ESPECIALIZADO) | Bronce A1 */
_registerGames(37, "Genitivo Sajon · Regla de Uso", [
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Como se dice "el libro de Maria"?',
    opts:["Maria book","Marys book","Maria's book","book of Maria"], correct:2 },
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca la forma correcta del genitivo sajon.',
    sents:[
      { pre:'This is ', ans:"Maria's", post:' book.', bank:["Maria's","Marias","Maria","Marias'"] },
      { pre:'That is ', ans:"the dog's", post:' bone.', bank:["the dog's","the dogs","the dogs'","the dog"] },
      { pre:'It is ', ans:"Tom's", post:' car.', bank:["Tom's","Toms","Tom","Toms'"] },
      { pre:'Where is ', ans:"Ana's", post:' bag?', bank:["Ana's","Anas","Ana","Anas'"] } ] },
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:["brother's",'This','is','my','car'], ans:['This','is','my',"brother's",'car'] },
      { words:["Tom's",'That','is','dog'], ans:['That','is',"Tom's",'dog'] },
      { words:["Ana's",'I','have','book'], ans:['I','have',"Ana's",'book'] } ] },
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige la forma correcta del genitivo.',
    sents:[
      { words:['This','is','Marias','book','.'], wi:2, correct:"Maria's", choices:["Maria's","Marias","Maria","Marias'"] },
      { words:['The','dogs','bone','is','here','.'], wi:1, correct:"dog's", choices:["dog's","dogs","dogs'","dog"] },
      { words:['That','is','Toms','car','.'], wi:2, correct:"Tom's", choices:["Tom's","Toms","Tom","Toms'"] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma la palabra.',
    words:[ {scrambled:['K','O','O','B'],ans:'BOOK',hint:"Maria's ..."},{scrambled:['R','A','C'],ans:'CAR',hint:"Tom's ..."},{scrambled:['G','O','D'],ans:'DOG',hint:"the ...'s bone"},{scrambled:['E','N','O','B'],ans:'BONE',hint:"the dog's ..."} ] },
  { id:'transform', label:'Transforma', xp:35,
    instr:'Usa el genitivo sajon en cada frase.',
    transforms:[
      { original:'the book of Maria', task:'Genitivo sajon', opts:["Maria's book","Marias book","Maria book","Marias' book"], correct:0 },
      { original:'the car of Tom', task:'Genitivo sajon', opts:["Tom's car","Toms car","Tom car","Toms' car"], correct:0 },
      { original:'the bone of the dog', task:'Genitivo sajon', opts:["the dog's bone","the dogs bone","the dog bone","the dogs' bone"], correct:0 },
      { original:'the bag of Ana', task:'Genitivo sajon', opts:["Ana's bag","Anas bag","Ana bag","Anas' bag"], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo con el genitivo correcto.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Whose book is this?', blank:false },
      { speaker:1, text:null, blank:true, opts:["It is Maria's book.","It is Marias book.","It is Maria book.","It is Marias' book."], correct:0 },
      { speaker:0, text:'And whose car is that?', blank:false },
      { speaker:1, text:null, blank:true, opts:["It is Tom's car.","It is Toms car.","It is Tom car.","It is Toms' car."], correct:0 },
      { speaker:0, text:'I see!', blank:false } ] }
]);

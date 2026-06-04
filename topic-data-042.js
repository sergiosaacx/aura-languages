/* topic-data-042.js - Juego 42/350 | T6 7/7 MINE & YOURS | errores tipicos de los 3 temas (MEZCLADO) | Bronce A1 */
_registerGames(42, 'Posesivos, Genitivo e Imperativos · Errores', [
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige la forma correcta.',
    items:[
      { src:'sus llaves (de ella)',  opts:["her's keys","her keys","hers keys","she keys"], correct:1 },
      { src:'el libro de Maria',     opts:["Marias book","Maria's book","Maria book","Marias' book"], correct:1 },
      { src:'abre la ventana (orden)',opts:["You open the window","Open the window","Opens the window","Opening the window"], correct:1 },
      { src:'su carro (de el)',      opts:["he car","his car","him car","his's car"], correct:1 },
      { src:'el perro de Tom',       opts:["Tom dog","Tom's dog","Toms dog","Toms' dog"], correct:1 },
      { src:'no corras (orden)',     opts:["Not run","Don't run","No run","You don't run"], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Cual es correcto?',
    opts:["her's keys","her keys","hers keys","she keys"], correct:1 },
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada error con su correccion.',
    pairs:[ ["her's keys","her keys"],["Marias book","Maria's book"],["You open the window!","Open the window!"],["Toms car","Tom's car"],["Not run!","Don't run!"],["me book","my book"] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma la palabra correcta.',
    words:[ {scrambled:['R','E','H'],ans:'HER',hint:"corrige her's keys"},{scrambled:['Y','M'],ans:'MY',hint:'corrige me book'},{scrambled:['N','E','P','O'],ans:'OPEN',hint:'corrige You open!'},{scrambled:['G','O','D'],ans:'DOG',hint:"Tom's ..."} ] },
  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada frase como correcta o incorrecta.',
    categories:['Correcta','Incorrecta'],
    items:[ {text:'her keys',correct:0},{text:"her's keys",correct:1},{text:"Maria's book",correct:0},{text:'Marias book',correct:1},{text:'Open the window!',correct:0},{text:'You open the window!',correct:1} ] },
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:['lost','She','her','keys'], ans:['She','lost','her','keys'] },
      { words:['the','Open','window'], ans:['Open','the','window'] },
      { words:["Maria's",'This','is','book'], ans:['This','is',"Maria's",'book'] } ] },
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She','lost',"her's",'keys','.'], wi:2, correct:'her', choices:['her','hers','she','his'] },
      { words:['The','Marias','book','is','here','.'], wi:1, correct:"Maria's", choices:["Maria's","Marias","Maria","Marias'"] },
      { words:['You','open','the','window','.'], wi:0, correct:'Open', choices:['Open','You','Opens','Opening'] } ] }
]);

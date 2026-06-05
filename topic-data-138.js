/* topic-data-138.js - Juego 138/350 | T20 5/7 TELL ME MORE | conectores y adverbios en oraciones (MEZCLADO) | Plata A2 */
_registerGames(138, 'Conectores y Adverbios · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Estudio mucho asi que aprobo', opts:['She studied hard but she passed','She studied hard so she passed','She studied hard because she passed','She studied hard although she passed'], correct:1 },
      { src:'Aunque hacia frio, fueron a nadar', opts:['Although it was cold, they went swimming','Because it was cold, they went swimming','So it was cold, they went swimming','But it was cold, they went swimming'], correct:0 },
      { src:'Ella canta muy bien', opts:['She sings very good','She sings very well','She very well sings','She sing very well'], correct:1 },
      { src:'El conduce con cuidado', opts:['He drives careful','He drives carefully','He carefully drives','He drive carefully'], correct:1 },
      { src:'Me gusta el cafe pero no el te', opts:['I like coffee so not tea','I like coffee but not tea','I like coffee because not tea','I like coffee and not tea'], correct:1 },
      { src:'Corre rapido', opts:['She runs fastly','She runs fast','She fast runs','She run fast'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada palabra en espanol con su forma en ingles.',
    pairs:[ ['asi que','so'],['aunque','although'],['con cuidado','carefully'],['muy bien','very well'],['porque','because'],['rapido','fast'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['O','S'],ans:'SO',hint:'resultado'},{scrambled:['L','L','E','W'],ans:'WELL',hint:'adverbio de good'},{scrambled:['H','G','U','O','A','L','T','H'],ans:'ALTHOUGH',hint:'aunque'},{scrambled:['Y','L','K','C','I','U','Q'],ans:'QUICKLY',hint:'adverbio de quick'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada palabra como conector o adverbio.',
    categories:['Conector','Adverbio de modo'],
    items:[ {text:'so',correct:0},{text:'but',correct:0},{text:'although',correct:0},{text:'well',correct:1},{text:'carefully',correct:1},{text:'quickly',correct:1} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['so','She','studied','hard','she','passed'],ans:['She','studied','hard','so','she','passed']},{words:['well','He','speaks','English'],ans:['He','speaks','English','well']},{words:['but','I','like','coffee','not','tea'],ans:['I','like','coffee','but','not','tea']} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Did you pass the exam?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I studied hard so I passed.','Yes, I studied hard but I passed.','Yes, I studied hard because I passed.','Yes, I studied hard although I passed.'], correct:0 },
      { speaker:0, text:'How does she sing?', blank:false },
      { speaker:1, text:null, blank:true, opts:['She sings very well.','She sings very good.','She very well sings.','She sing very well.'], correct:0 },
      { speaker:0, text:'Great!', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She','studied','hard','but','she','passed','.'], wi:3, correct:'so', choices:['so','but','because','and'] },
      { words:['He','speaks','English','good','.'], wi:3, correct:'well', choices:['well','good','goodly','better'] },
      { words:['She','sings','beautiful','.'], wi:2, correct:'beautifully', choices:['beautifully','beautiful','beauty','beautifuly'] } ] }
]);

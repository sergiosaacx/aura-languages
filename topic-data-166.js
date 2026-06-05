/* topic-data-166.js - Juego 166/350 | T24 5/7 IF I HAD | Cond 2 y wish en oraciones (MEZCLADO) | Oro B1 */
_registerGames(166, 'Condicional 2 y Wish · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Si hablara frances, solicitaria ese trabajo', opts:['If I speak French, I would apply','If I spoke French, I would apply for that job','If I spoke French, I will apply','If I would speak French, I apply'], correct:1 },
      { src:'Ojala fuera mas alto', opts:['I wish I am taller','I wish I were taller','I wish I will be taller','I hope I were taller'], correct:1 },
      { src:'Ella seria mas feliz si tuviera mas tiempo', opts:['She would be happier if she has more time','She would be happier if she had more free time','She will be happier if she had more time','She would be happier if she would have time'], correct:1 },
      { src:'Ojala supiera nadar', opts:['I wish I can swim','I wish I could swim','I wish I will swim','I hope I could swim'], correct:1 },
      { src:'Si tuviera un coche, conduciria al trabajo', opts:['If I have a car, I would drive','If I had a car, I would drive to work','If I had a car, I will drive','If I would have a car, I drive'], correct:1 },
      { src:'Ojala viviera cerca', opts:['I wish I live near','I wish I lived near','I wish I will live near','I hope I lived near'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada frase en espanol con su forma en ingles.',
    pairs:[ ['si hablara frances','if I spoke French'],['ojala fuera mas alto','I wish I were taller'],['si tuviera tiempo','if she had more time'],['ojala supiera nadar','I wish I could swim'],['si tuviera un coche','if I had a car'],['ojala viviera cerca','I wish I lived near'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['D','L','U','O','W'],ans:'WOULD',hint:'condicional 2'},{scrambled:['H','S','I','W'],ans:'WISH',hint:'deseo'},{scrambled:['E','R','E','W'],ans:'WERE',hint:'I wish I ... taller'},{scrambled:['D','L','U','O','C'],ans:'COULD',hint:'I wish I ... swim'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada estructura como condicional 2 o wish.',
    categories:['Condicional 2 (if)','Wish (deseo)'],
    items:[ {text:'If I spoke French',correct:0},{text:'I wish I were taller',correct:1},{text:'If she had time',correct:0},{text:'I wish I could swim',correct:1},{text:'If I had a car',correct:0},{text:'I wish I lived near',correct:1} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['spoke','If','I','French','I','would','apply'],ans:['If','I','spoke','French','I','would','apply']},{words:['were','I','wish','I','taller'],ans:['I','wish','I','were','taller']},{words:['had','If','I','a','car','I','would','drive'],ans:['If','I','had','a','car','I','would','drive']} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Why do you not apply for that job?', blank:false },
      { speaker:1, text:null, blank:true, opts:['If I spoke French, I would apply.','If I speak French, I would apply.','If I spoke French, I will apply.','If I would speak French, I apply.'], correct:0 },
      { speaker:0, text:'Do you want to be taller?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I wish I were taller.','Yes, I wish I am taller.','Yes, I wish I will be taller.','Yes, I hope I were taller.'], correct:0 },
      { speaker:0, text:'I see.', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['If','I','speak','French','I','would','apply','.'], wi:2, correct:'spoke', choices:['spoke','speak','will speak','would speak'] },
      { words:['I','wish','I','am','taller','.'], wi:3, correct:'were', choices:['were','am','will be','would be'] },
      { words:['If','I','had','time','I','will','help','.'], wi:5, correct:'would', choices:['would','will','had','have'] } ] }
]);

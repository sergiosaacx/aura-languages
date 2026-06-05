/* topic-data-159.js - Juego 159/350 | T23 5/7 WILL & MIGHT | will/wont/may/might en oraciones (MEZCLADO) | Oro B1 */
_registerGames(159, 'Modales de Futuro · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Ella quiza no venga a la reunion', opts:['She might not come to the meeting','She will not come to the meeting','She might to not come','She not might come'], correct:0 },
      { src:'Definitivamente terminare esto hoy', opts:['I might finish this today','I will definitely finish this today','I will to finish this today','I definitely finish this today'], correct:1 },
      { src:'Puede que llueva esta tarde', opts:['It will rain this afternoon','It may rain this afternoon','It may to rain this afternoon','It mays rain this afternoon'], correct:1 },
      { src:'No te decepcionare', opts:["I won't let you down","I don't let you down","I might let you down","I wouldn't let you down"], correct:0 },
      { src:'Quiza vayan a la playa', opts:['They will go to the beach','They might go to the beach','They might to go to the beach','They mights go to the beach'], correct:1 },
      { src:'El ganara el premio (seguro)', opts:['He might win the prize','He will win the prize','He may win the prize','He wills win the prize'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada frase en espanol con su forma en ingles.',
    pairs:[ ['quiza no venga','might not come'],['definitivamente terminare','will definitely finish'],['puede que llueva','may rain'],['no te decepcionare',"won't let you down"],['quiza vayan','might go'],['ganara (seguro)','will win'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra (sin apostrofo).',
    words:[ {scrambled:['L','I','W','L'],ans:'WILL',hint:'seguro'},{scrambled:['Y','A','M'],ans:'MAY',hint:'50% posible'},{scrambled:['T','H','G','I','M'],ans:'MIGHT',hint:'menos probable'},{scrambled:['T','N','O','W'],ans:'WONT',hint:'will not'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada oracion segun la certeza.',
    categories:['Seguro','Posible'],
    items:[ {text:'will finish',correct:0},{text:'might come',correct:1},{text:"won't go",correct:0},{text:'may rain',correct:1},{text:'will win',correct:0},{text:'might be',correct:1} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['might','She','not','come'],ans:['She','might','not','come']},{words:['will','I','definitely','win'],ans:['I','will','definitely','win']},{words:['may','It','rain','later'],ans:['It','may','rain','later']} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Are you coming to the meeting?', blank:false },
      { speaker:1, text:null, blank:true, opts:["I might come, I am not sure.","I might to come, I am not sure.","I mights come, I am not sure.","I might coming, I am not sure."], correct:0 },
      { speaker:0, text:'Will you finish the report?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I will definitely finish it.','Yes, I will to finish it.','Yes, I wills finish it.','Yes, I will finishing it.'], correct:0 },
      { speaker:0, text:'Good.', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She','mights','come','.'], wi:1, correct:'might', choices:['might','mights','might to','mighting'] },
      { words:['It','mays','rain','.'], wi:1, correct:'may', choices:['may','mays','may to','maying'] },
      { words:['I','will','definitely','finishing','.'], wi:3, correct:'finish', choices:['finish','finishing','finishes','finished'] } ] }
]);

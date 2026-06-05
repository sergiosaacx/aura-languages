/* topic-data-145.js - Juego 145/350 | T21 5/7 STILL GOING | Perfecto Continuo con for/since (MEZCLADO) | Oro B1 */
_registerGames(145, 'Perfecto Continuo · Con For/Since', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Ella lleva aprendiendo ingles cinco anos', opts:['She has learned English for five years','She has been learning English for five years','She is learning English for five years','She has been learning English since five years'], correct:1 },
      { src:'Llevan esperando desde las 9', opts:['They have waited since 9','They have been waiting since 9','They have been waiting for 9','They are waiting since 9'], correct:1 },
      { src:'Llevo trabajando aqui desde 2018', opts:['I have worked here since 2018','I have been working here since 2018','I have been working here for 2018','I am working here since 2018'], correct:1 },
      { src:'El lleva leyendo dos horas', opts:['He has read for two hours','He has been reading for two hours','He has been reading since two hours','He is reading for two hours'], correct:1 },
      { src:'Llevamos viviendo aqui desde marzo', opts:['We have lived here since March','We have been living here since March','We have been living here for March','We are living here since March'], correct:1 },
      { src:'Ella lleva corriendo media hora', opts:['She has run for half an hour','She has been running for half an hour','She has been running since half an hour','She is running for half an hour'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada frase en espanol con su forma en ingles.',
    pairs:[ ['lleva aprendiendo 5 anos','has been learning for five years'],['llevan esperando desde las 9','have been waiting since 9'],['llevo trabajando desde 2018','have been working since 2018'],['lleva leyendo 2 horas','has been reading for two hours'],['llevamos viviendo desde marzo','have been living since March'],['lleva corriendo media hora','has been running for half an hour'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['N','E','E','B'],ans:'BEEN',hint:'have ... learning'},{scrambled:['R','O','F'],ans:'FOR',hint:'... five years'},{scrambled:['E','C','N','I','S'],ans:'SINCE',hint:'... nine'},{scrambled:['G','N','I','N','R','A','E','L'],ans:'LEARNING',hint:'-ing de learn'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion segun for o since.',
    categories:['for','since'],
    items:[ {text:'five years',correct:0},{text:'9 oclock',correct:1},{text:'2018',correct:1},{text:'two hours',correct:0},{text:'March',correct:1},{text:'half an hour',correct:0} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['for','She','has','been','learning','five','years'],ans:['She','has','been','learning','for','five','years']},{words:['since','They','have','been','waiting','9'],ans:['They','have','been','waiting','since','9']},{words:['since','I','have','been','working','2018'],ans:['I','have','been','working','since','2018']} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'How long have you been learning English?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I have been learning for five years.','I have been learning since five years.','I have learned for five years.','I am learning for five years.'], correct:0 },
      { speaker:0, text:'How long have they been waiting?', blank:false },
      { speaker:1, text:null, blank:true, opts:["They have been waiting since nine.","They have been waiting for nine.","They have waited since nine.","They are waiting since nine."], correct:0 },
      { speaker:0, text:'That is a long time!', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She','has','been','learning','since','five','years','.'], wi:4, correct:'for', choices:['for','since','from','ago'] },
      { words:['They','have','been','waiting','for','9','.'], wi:4, correct:'since', choices:['since','for','from','ago'] },
      { words:['I','have','working','here','since','2018','.'], wi:2, correct:'been working', choices:['been working','working','worked','work'] } ] }
]);

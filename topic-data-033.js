/* topic-data-033.js - Juego 33/350 | T5 5/7 COUNT THE WORLD | La hora en oraciones (ESPECIALIZADO) | Bronce A1 */
_registerGames(33, 'La Hora · En Oraciones', [
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Que preposicion usas: "The class starts ___ nine"?',
    opts:['at','in','on','to'], correct:0 },
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada hora con como se dice.',
    pairs:[ ['2:30','half past two'],['4:15','quarter past four'],['6:45','quarter to seven'],['8:00',"eight o'clock"],['5:30','half past five'],['7:15','quarter past seven'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca la palabra correcta.',
    sents:[
      { pre:'The class starts ', ans:'at', post:' nine.', bank:['at','in','on','to'] },
      { pre:'It is half ', ans:'past', post:' three.', bank:['past','to','at','for'] },
      { pre:'It is quarter ', ans:'to', post:' five.', bank:['to','past','at','for'] },
      { pre:'What ', ans:'time', post:' is it?', bank:['time','hour','day','clock'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma la palabra relacionada con la hora.',
    words:[ {scrambled:['M','T','I','E'],ans:'TIME',hint:'what ... is it?'},{scrambled:['L','A','H','F'],ans:'HALF',hint:'la mitad: ... past'},{scrambled:['T','S','A','P'],ans:'PAST',hint:'half ... two'},{scrambled:['R','U','A','T','E','R','Q'],ans:'QUARTER',hint:'un cuarto'} ] },
  { id:'transform', label:'Transforma', xp:35,
    instr:'Di cada hora con palabras.',
    transforms:[
      { original:'2:30', task:'Di la hora', opts:['It is half past two.','It is quarter past two.','It is half to two.','It is two thirty past.'], correct:0 },
      { original:'9:00', task:'Di la hora', opts:["It is nine o'clock.","It is half past nine.","It is quarter nine.","It is nine past."], correct:0 },
      { original:'4:15', task:'Di la hora', opts:['It is quarter past four.','It is quarter to four.','It is half past four.','It is four quarter.'], correct:0 },
      { original:'7:45', task:'Di la hora', opts:['It is quarter to eight.','It is quarter past seven.','It is half past seven.','It is seven quarter.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo sobre la hora.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What time is it?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It is half past three.','It is half to three.','It is three half.','It is past half three.'], correct:0 },
      { speaker:0, text:'When does the class start?', blank:false },
      { speaker:1, text:null, blank:true, opts:["At nine o'clock.","In nine o'clock.","On nine o'clock.","To nine o'clock."], correct:0 },
      { speaker:0, text:'Thanks!', blank:false } ] },
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:['time','What','is','it'], ans:['What','time','is','it'] },
      { words:['past','It','is','half','three'], ans:['It','is','half','past','three'] },
      { words:['at','starts','class','The','nine'], ans:['The','class','starts','at','nine'] } ] }
]);

/* topic-data-035.js - Juego 35/350 | T5 7/7 COUNT THE WORLD | errores tipicos de los 4 temas (MEZCLADO) | Bronce A1 */
_registerGames(35, 'Numeros, Dias, Meses y Hora · Errores', [
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Cual esta bien escrito?',
    opts:['Thuesday','Tuesday','Tusday','Tuseday'], correct:1 },
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada error con su correccion.',
    pairs:[ ['Thuesday','Tuesday'],['Wensday','Wednesday'],['Julay','July'],['fivty','fifty'],['half to three','half past three'],['March 32','March 31'] ] },
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:['is','Today','Tuesday'], ans:['Today','is','Tuesday'] },
      { words:['past','It','is','half','three'], ans:['It','is','half','past','three'] },
      { words:['in','My','birthday','is','May'], ans:['My','birthday','is','in','May'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma la palabra correcta.',
    words:[ {scrambled:['A','D','S','U','E','T','Y'],ans:'TUESDAY',hint:'corrige Thuesday'},{scrambled:['Y','T','F','I','F'],ans:'FIFTY',hint:'corrige fivty'},{scrambled:['L','Y','U','J'],ans:'JULY',hint:'corrige Julay'},{scrambled:['T','S','A','P'],ans:'PAST',hint:'corrige half to'} ] },
  { id:'transform', label:'Transforma', xp:35,
    instr:'Corrige cada oracion a su forma correcta.',
    transforms:[
      { original:'Today is Thuesday.', task:'Forma correcta', opts:['Today is Tuesday.','Today is Thursday.','Today is Tusday.','Today is Tuseday.'], correct:0 },
      { original:'It is half to three.', task:'Forma correcta', opts:['It is half past three.','It is half to three.','It is quarter to three.','It is three half.'], correct:0 },
      { original:'My birthday is on March 32.', task:'Forma correcta', opts:['My birthday is on March 31.','My birthday is on March 32.','My birthday is on March 35.','My birthday is on March 40.'], correct:0 },
      { original:'I am fivty years old.', task:'Forma correcta', opts:['I am fifty years old.','I am fivety years old.','I am fifteen years old.','I am five years old.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo eligiendo la correccion.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Is "Thuesday" correct?', blank:false },
      { speaker:1, text:null, blank:true, opts:['No, it is "Tuesday".','Yes, it is correct.','No, it is "Thursday".','No, it is "Tusday".'], correct:0 },
      { speaker:0, text:'And "half to three"?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It should be "half past three".','It is correct.','It should be "half three past".','It should be "quarter to three".'], correct:0 },
      { speaker:0, text:'Got it!', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['Today','is','Thuesday','.'], wi:2, correct:'Tuesday', choices:['Tuesday','Thursday','Tusday','Tuseday'] },
      { words:['It','is','half','to','three','.'], wi:3, correct:'past', choices:['past','to','for','at'] },
      { words:['I','am','fivty','.'], wi:2, correct:'fifty', choices:['fifty','fivty','fifteen','fivety'] } ] }
]);

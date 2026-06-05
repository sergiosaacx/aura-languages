/* topic-data-143.js - Juego 143/350 | T21 3/7 STILL GOING | Perfecto Simple vs Continuo (ESPECIALIZADO) | Oro B1 */
_registerGames(143, 'Perfecto Simple vs Continuo', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta segun el enfasis.',
    items:[
      { src:'He escrito un libro (resultado)', opts:['I have been writing a book','I have written a book','I am writing a book','I write a book'], correct:1 },
      { src:'He estado escribiendo un libro (proceso)', opts:['I have written a book','I have been writing a book','I am writing a book','I write a book'], correct:1 },
      { src:'Ella ha leido tres libros (resultado)', opts:['She has been reading three books','She has read three books','She is reading three books','She reads three books'], correct:1 },
      { src:'Ella ha estado leyendo todo el dia (proceso)', opts:['She has read all day','She has been reading all day','She is reading all day','She reads all day'], correct:1 },
      { src:'Hemos pintado la casa (resultado)', opts:['We have been painting the house','We have painted the house','We are painting the house','We paint the house'], correct:1 },
      { src:'Hemos estado pintando todo el dia (proceso)', opts:['We have painted all day','We have been painting all day','We are painting all day','We paint all day'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada enfasis con su forma.',
    pairs:[ ['resultado completado','have written'],['proceso/duracion','have been writing'],['cuantos (3 books)','have read'],['cuanto tiempo','have been reading'],['terminado','have finished'],['en progreso','have been working'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['N','E','T','T','I','R','W'],ans:'WRITTEN',hint:'participio de write'},{scrambled:['N','E','E','B'],ans:'BEEN',hint:'have ... writing'},{scrambled:['G','N','I','T','I','R','W'],ans:'WRITING',hint:'-ing de write'},{scrambled:['D','A','E','R'],ans:'READ',hint:'have ... three books'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'El perfecto simple enfatiza el resultado.', ans:true, expl:'Correcto. I have written a book.' },
      { text:'El perfecto continuo enfatiza el proceso/duracion.', ans:true, expl:'Correcto. I have been writing.' },
      { text:'"I have read three books." enfatiza la duracion.', ans:false, expl:'Falso. Enfatiza cuantos (resultado).' },
      { text:'"I have been writing." indica un resultado terminado.', ans:false, expl:'Falso. Indica proceso.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige simple o continuo segun la pista.',
    transforms:[
      { original:'write a book (resultado)', task:'Simple o Continuo', opts:['I have written a book.','I have been writing a book.','I am writing a book.','I write a book.'], correct:0 },
      { original:'write a book (proceso)', task:'Simple o Continuo', opts:['I have been writing a book.','I have written a book.','I am writing a book.','I write a book.'], correct:0 },
      { original:'read 3 books (resultado)', task:'Simple o Continuo', opts:['She has read three books.','She has been reading three books.','She is reading three books.','She reads three books.'], correct:0 },
      { original:'read all day (proceso)', task:'Simple o Continuo', opts:['She has been reading all day.','She has read all day.','She is reading all day.','She reads all day.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Have you finished the book?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I have read it.','Yes, I have been reading it.','Yes, I am reading it.','Yes, I read it now.'], correct:0 },
      { speaker:0, text:'Why are your eyes red?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I have been reading all night.','I have read all night.','I am read all night.','I read all night now.'], correct:0 },
      { speaker:0, text:'You should rest!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada oracion como simple o continuo.',
    categories:['Simple (resultado)','Continuo (proceso)'],
    items:[ {text:'have written a book',correct:0},{text:'have been writing',correct:1},{text:'have read 3 books',correct:0},{text:'have been reading all day',correct:1},{text:'have finished',correct:0},{text:'have been working',correct:1} ] }
]);

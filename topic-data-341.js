/* topic-data-341.js - Juego 341/350 | T49 5/7 DISCOURSE ANALYSIS | variacion de registro en textos (MEZCLADO) | Challenger C2 */
_registerGames(341, 'Variacion de Registro en Textos', [
  { id:'translate', label:'Registro', xp:25, instr:'Elige la version del registro indicado.',
    items:[
      { src:'cientifico: el agua hierve a 100C', opts:['Water boils at 100C under standard pressure','Water gets super hot and bubbles','Water be boiling at 100','The water, like, boils'], correct:0 },
      { src:'coloquial: estoy cansado', opts:['I am utterly exhausted, sir','I am knackered','One is fatigued','I hereby declare my tiredness'], correct:1 },
      { src:'legal: el acuerdo termina', opts:['The agreement shall hereby terminate','The deal is over now','The agreement, like, ends','Bye to the agreement'], correct:0 },
      { src:'periodistico: hubo un accidente', opts:['A serious accident occurred on the motorway','Some crash thing happened','An accident, methinks, occurred','The accident be happening'], correct:0 },
      { src:'coloquial: que tal?', opts:['How do you do, sir','What is up?','I trust you fare well','I salute thee'], correct:1 },
      { src:'formal: gracias por tu ayuda', opts:['I am most grateful for your assistance','Thanks a bunch','Cheers mate','Ta very much'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"I am knackered" pertenece al registro...', opts:['formal','coloquial','legal','cientifico'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada expresion con su registro.',
    pairs:[ ['Water boils at 100C','cientifico'],['I am knackered','coloquial'],['shall hereby terminate','legal'],['A serious accident occurred','periodistico'],['I am most grateful','formal'],['What is up?','coloquial casual'] ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion por su registro.',
    categories:['Formal / Tecnico','Coloquial'],
    items:[ {text:'I am most grateful',correct:0},{text:'cheers mate',correct:1},{text:'shall hereby terminate',correct:0},{text:'what is up',correct:1},{text:'the data indicates',correct:0},{text:'I am knackered',correct:1} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Pasa al registro indicado.',
    transforms:[
      { original:'estoy muy cansado (coloquial)', task:'Coloquial', opts:['I am knackered.','I am utterly exhausted, sir.','One is fatigued.','I declare my tiredness.'], correct:0 },
      { original:'gracias (formal)', task:'Formal', opts:['I am most grateful.','Cheers mate.','Ta very much.','Thanks a bunch.'], correct:0 },
      { original:'el acuerdo termina (legal)', task:'Legal', opts:['The agreement shall hereby terminate.','The deal is over.','The agreement just ends.','Bye agreement.'], correct:0 },
      { original:'que tal (coloquial)', task:'Coloquial', opts:['What is up?','How do you do, sir.','I trust you fare well.','I salute thee.'], correct:0 } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si el registro corresponde.',
    stmts:[
      { text:'"shall hereby terminate" es registro legal.', ans:true, expl:'Correcto.' },
      { text:'"cheers mate" es registro formal.', ans:false, expl:'Falso. es coloquial.' },
      { text:'"the data indicates" es registro tecnico.', ans:true, expl:'Correcto.' },
      { text:'"I am knackered" es apropiado en un informe legal.', ans:false, expl:'Falso. es coloquial.' } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['L','A','M','R','O','F'],ans:'FORMAL',hint:'registro de respeto'},{scrambled:['L','A','G','E','L'],ans:'LEGAL',hint:'registro juridico'},{scrambled:['L','A','I','U','Q','O','L','L','O','C'],ans:'COLLOQUIAL',hint:'registro informal'},{scrambled:['R','E','T','S','I','G','E','R'],ans:'REGISTER',hint:'nivel de formalidad'} ] }
]);

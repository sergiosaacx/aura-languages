/* topic-data-319.js - Juego 319/350 | T46 4/7 RHETORICAL POWER | oratoria en discursos famosos (ESPECIALIZADO) | Challenger C2 */
_registerGames(319, 'Dispositivos de Oratoria en Discursos Famosos', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"I have a dream... I have a dream..." emplea...', opts:['anaphora','chiasmus','zeugma','tricolon'], correct:0 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada cita con su dispositivo.',
    pairs:[ ['I have a dream...','anaphora (inicio)'],['veni, vidi, vici','tricolon (tres)'],['Ask not what your country...','antithesis'],['We shall fight on the beaches...','anaphora (repeticion)'],['government of the people...','tricolon (gobierno)'],['Let us never negotiate out of fear...','chiasmus'] ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si el dispositivo identificado es correcto.',
    stmts:[
      { text:'"I have a dream..." repetido es anaphora.', ans:true, expl:'Correcto.' },
      { text:'"veni, vidi, vici" es un chiasmus.', ans:false, expl:'Falso. es un tricolon.' },
      { text:'"of the people, by the people, for the people" es un tricolon.', ans:true, expl:'Correcto.' },
      { text:'"Ask not what your country can do for you..." es anaphora pura.', ans:false, expl:'Falso. es antithesis (y chiasmus).' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el dispositivo correcto.',
    sents:[
      { pre:'"We shall fight... we shall fight..." uses ', ans:'anaphora', post:'.', bank:['anaphora','chiasmus','zeugma','tricolon'] },
      { pre:'"veni, vidi, vici" is a ', ans:'tricolon', post:'.', bank:['tricolon','anaphora','chiasmus','zeugma'] },
      { pre:'"Ask not what your country..." shows ', ans:'antithesis', post:'.', bank:['antithesis','anaphora','tricolon','zeugma'] },
      { pre:'"Never fear to negotiate, never negotiate out of fear" is a ', ans:'chiasmus', post:'.', bank:['chiasmus','anaphora','tricolon','zeugma'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada cita por su dispositivo.',
    categories:['Anaphora','Tricolon','Antithesis / Chiasmus'],
    items:[ {text:'I have a dream...',correct:0},{text:'veni, vidi, vici',correct:1},{text:'Ask not what your country...',correct:2},{text:'We shall fight...',correct:0},{text:'of, by, for the people',correct:1},{text:'never fear to negotiate...',correct:2} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Identifica el dispositivo de cada cita.',
    transforms:[
      { original:'"I have a dream... I have a dream..."', task:'Dispositivo', opts:['anaphora','chiasmus','zeugma','tricolon'], correct:0 },
      { original:'"veni, vidi, vici"', task:'Dispositivo', opts:['tricolon','anaphora','chiasmus','zeugma'], correct:0 },
      { original:'"Ask not what your country can do for you, ask what you can do for your country"', task:'Dispositivo', opts:['antithesis','anaphora','tricolon','zeugma'], correct:0 },
      { original:'"of the people, by the people, for the people"', task:'Dispositivo', opts:['tricolon','chiasmus','zeugma','antithesis'], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el dispositivo.',
    words:[ {scrambled:['A','R','O','H','P','A','N','A'],ans:'ANAPHORA',hint:'I have a dream...'},{scrambled:['N','O','L','O','C','I','R','T'],ans:'TRICOLON',hint:'veni, vidi, vici'},{scrambled:['S','I','S','E','H','T','I','T','N','A'],ans:'ANTITHESIS',hint:'Ask not...'},{scrambled:['S','U','M','S','A','I','H','C'],ans:'CHIASMUS',hint:'estructura invertida'} ] }
]);

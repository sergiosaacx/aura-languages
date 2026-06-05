/* topic-data-309.js - Juego 309/350 | T45 1/7 ACADEMIC DISCOURSE | vocabulario academico avanzado (ESPECIALIZADO) | Diamante C1 */
_registerGames(309, 'Vocabulario Academico Avanzado', [
  { id:'translate', label:'Termino', xp:25, instr:'Elige el equivalente academico correcto.',
    items:[
      { src:'hipotesis', opts:['hypothesis','theory','guess','idea'], correct:0 },
      { src:'metodologia', opts:['method','methodology','way','system'], correct:1 },
      { src:'aunque (formal)', opts:['although','albeit','despite','however'], correct:1 },
      { src:'no obstante (formal)', opts:['notwithstanding','but','so','then'], correct:0 },
      { src:'hasta ahora (formal)', opts:['hitherto','soon','later','now'], correct:0 },
      { src:'empirico', opts:['theoretical','empirical','abstract','random'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Albeit" significa...', opts:['por lo tanto','aunque','ademas','sin embargo'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada termino academico con su significado.',
    pairs:[ ['hypothesis','hipotesis'],['methodology','metodologia'],['albeit','aunque'],['notwithstanding','no obstante'],['hitherto','hasta ahora'],['empirical','empirico'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el termino academico correcto.',
    sents:[
      { pre:'The study tested a clear ', ans:'hypothesis', post:'.', bank:['hypothesis','guess','idea','theory'] },
      { pre:'The results were based on ', ans:'empirical', post:' evidence.', bank:['empirical','random','abstract','vague'] },
      { pre:'The plan succeeded, ', ans:'albeit', post:' with some delays.', bank:['albeit','because','so','then'] },
      { pre:'This term was, ', ans:'hitherto', post:', unknown.', bank:['hitherto','soon','later','now'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el termino academico.',
    words:[ {scrambled:['S','I','S','E','H','T','O','P','Y','H'],ans:'HYPOTHESIS',hint:'hipotesis'},{scrambled:['L','A','C','I','R','I','P','M','E'],ans:'EMPIRICAL',hint:'empirico'},{scrambled:['T','I','E','B','L','A'],ans:'ALBEIT',hint:'aunque'},{scrambled:['M','G','I','D','A','R','A','P'],ans:'PARADIGM',hint:'modelo/paradigma'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada definicion es correcta.',
    stmts:[
      { text:'"hypothesis" es una suposicion comprobable.', ans:true, expl:'Correcto.' },
      { text:'"empirical" significa basado en teoria pura.', ans:false, expl:'Falso. basado en la observacion/experiencia.' },
      { text:'"albeit" significa aunque.', ans:true, expl:'Correcto.' },
      { text:'"hitherto" significa de ahora en adelante.', ans:false, expl:'Falso. significa hasta ahora.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada palabra.',
    categories:['Sustantivo','Conector / Adverbio formal'],
    items:[ {text:'hypothesis',correct:0},{text:'albeit',correct:1},{text:'methodology',correct:0},{text:'notwithstanding',correct:1},{text:'paradigm',correct:0},{text:'hitherto',correct:1} ] }
]);

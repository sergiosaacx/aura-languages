/* topic-data-310.js - Juego 310/350 | T45 2/7 ACADEMIC DISCOURSE | cita y atribucion (ESPECIALIZADO) | Diamante C1 */
_registerGames(310, 'Cita y Atribucion · Verbos de Reporte Academico', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Para presentar una afirmacion firme de un autor se usa...', opts:['says','argues','tells','speaks'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada verbo con su matiz.',
    pairs:[ ['argue','sostener con razones'],['claim','afirmar (sin prueba plena)'],['assert','afirmar con firmeza'],['acknowledge','reconocer'],['concede','admitir a reganadientes'],['contend','sostener (en debate)'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el verbo de atribucion mas preciso.',
    sents:[
      { pre:'Smith (2020) ', ans:'argues', post:' that the policy failed.', bank:['argues','says','tells','speaks'] },
      { pre:'The author ', ans:'acknowledges', post:' the limitations of the study.', bank:['acknowledges','tells','says','speaks'] },
      { pre:'Critics ', ans:'claim', post:' that the data is flawed.', bank:['claim','tell','say','speak'] },
      { pre:'She ', ans:'concedes', post:' that more research is needed.', bank:['concedes','tells','says','speaks'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada uso es apropiado.',
    stmts:[
      { text:'"Smith argues that..." es apropiado en un texto academico.', ans:true, expl:'Correcto.' },
      { text:'"Smith says that..." es el verbo academico mas preciso.', ans:false, expl:'Falso. argues/claims/contends son mas precisos.' },
      { text:'"acknowledge" implica reconocer algo.', ans:true, expl:'Correcto.' },
      { text:'"concede" significa afirmar con total seguridad.', ans:false, expl:'Falso. significa admitir a reganadientes.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada verbo por su funcion.',
    categories:['Afirmar / Sostener','Reconocer / Admitir'],
    items:[ {text:'argue',correct:0},{text:'acknowledge',correct:1},{text:'assert',correct:0},{text:'concede',correct:1},{text:'contend',correct:0},{text:'admit',correct:1} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el verbo de atribucion mas preciso.',
    transforms:[
      { original:'sostener con argumentos', task:'Verbo', opts:['argue','say','tell','speak'], correct:0 },
      { original:'reconocer una limitacion', task:'Verbo', opts:['acknowledge','say','tell','speak'], correct:0 },
      { original:'afirmar sin prueba plena', task:'Verbo', opts:['claim','say','tell','speak'], correct:0 },
      { original:'admitir a reganadientes', task:'Verbo', opts:['concede','say','tell','speak'], correct:0 } ] },
  { id:'scramble', label:'Descifra el verbo', xp:20, instr:'Forma el verbo de reporte.',
    words:[ {scrambled:['E','U','G','R','A'],ans:'ARGUE',hint:'sostener con razones'},{scrambled:['M','I','A','L','C'],ans:'CLAIM',hint:'afirmar sin prueba'},{scrambled:['T','R','E','S','S','A'],ans:'ASSERT',hint:'afirmar con firmeza'},{scrambled:['E','D','E','C','N','O','C'],ans:'CONCEDE',hint:'admitir a reganadientes'} ] }
]);

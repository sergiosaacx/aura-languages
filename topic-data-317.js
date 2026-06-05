/* topic-data-317.js - Juego 317/350 | T46 2/7 RHETORICAL POWER | ethos/pathos/logos (ESPECIALIZADO) | Challenger C2 */
_registerGames(317, 'Lenguaje Persuasivo · Ethos / Pathos / Logos', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Apelar a la emocion del publico es...', opts:['ethos','pathos','logos','kairos'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada pilar con su definicion.',
    pairs:[ ['ethos','credibilidad'],['pathos','emocion'],['logos','logica'],['statistics','apela a logos'],['personal story','apela a pathos'],['expert credentials','apela a ethos'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el pilar persuasivo correcto.',
    sents:[
      { pre:'"As a doctor with 20 years of experience..." appeals to ', ans:'ethos', post:'.', bank:['ethos','pathos','logos','kairos'] },
      { pre:'"Think of the children who suffer..." appeals to ', ans:'pathos', post:'.', bank:['pathos','ethos','logos','kairos'] },
      { pre:'"Studies show a 40% increase..." appeals to ', ans:'logos', post:'.', bank:['logos','ethos','pathos','kairos'] },
      { pre:'"You can trust me; I have been honest..." appeals to ', ans:'ethos', post:'.', bank:['ethos','pathos','logos','kairos'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'Ethos apela a la credibilidad del orador.', ans:true, expl:'Correcto.' },
      { text:'Logos apela a las emociones.', ans:false, expl:'Falso. logos apela a la logica.' },
      { text:'Pathos busca conmover al publico.', ans:true, expl:'Correcto.' },
      { text:'Las estadisticas son un ejemplo de pathos.', ans:false, expl:'Falso. son logos.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada recurso por su pilar.',
    categories:['Ethos','Pathos','Logos'],
    items:[ {text:'expert credentials',correct:0},{text:'an emotional story',correct:1},{text:'statistics',correct:2},{text:'a trusted reputation',correct:0},{text:'a vivid image of suffering',correct:1},{text:'logical reasoning',correct:2} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Identifica el pilar de cada fragmento.',
    transforms:[
      { original:'"As an expert, I assure you..."', task:'Pilar', opts:['ethos','pathos','logos','kairos'], correct:0 },
      { original:'"Imagine the pain of those families..."', task:'Pilar', opts:['pathos','ethos','logos','kairos'], correct:0 },
      { original:'"The data clearly demonstrates..."', task:'Pilar', opts:['logos','ethos','pathos','kairos'], correct:0 },
      { original:'"My years of service prove my integrity..."', task:'Pilar', opts:['ethos','pathos','logos','kairos'], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el pilar.',
    words:[ {scrambled:['S','O','H','T','E'],ans:'ETHOS',hint:'credibilidad'},{scrambled:['S','O','H','T','A','P'],ans:'PATHOS',hint:'emocion'},{scrambled:['S','O','G','O','L'],ans:'LOGOS',hint:'logica'},{scrambled:['S','O','R','I','A','K'],ans:'KAIROS',hint:'el momento oportuno'} ] }
]);

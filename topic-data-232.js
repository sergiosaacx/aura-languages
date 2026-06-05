/* topic-data-232.js - Juego 232/350 | T34 1/7 REPORTED ADVANCED | verbos de reporte reconocimiento (ESPECIALIZADO) | Platino B2 */
_registerGames(232, 'Verbos de Reporte Avanzados · Reconocimiento', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el verbo de reporte correcto.',
    items:[
      { src:'sugerir', opts:['admit','suggest','deny','warn'], correct:1 },
      { src:'admitir', opts:['admit','deny','accuse','warn'], correct:0 },
      { src:'negar', opts:['admit','deny','suggest','insist'], correct:1 },
      { src:'acusar', opts:['warn','accuse','admit','suggest'], correct:1 },
      { src:'advertir', opts:['warn','deny','suggest','admit'], correct:0 },
      { src:'insistir', opts:['admit','deny','insist','accuse'], correct:2 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que verbo significa "negar"?', opts:['admit','deny','suggest','warn'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada verbo con su significado.',
    pairs:[ ['suggest','sugerir'],['admit','admitir'],['deny','negar'],['accuse','acusar'],['warn','advertir'],['insist','insistir'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el verbo de reporte correcto.',
    sents:[
      { pre:'He ', ans:'admitted', post:' the mistake.', bank:['admitted','denied','suggested','warned'] },
      { pre:'She ', ans:'denied', post:' stealing the money.', bank:['denied','admitted','suggested','accused'] },
      { pre:'They ', ans:'suggested', post:' going to the cinema.', bank:['suggested','denied','warned','admitted'] },
      { pre:'He ', ans:'warned', post:' us about the danger.', bank:['warned','admitted','denied','suggested'] } ] },
  { id:'scramble', label:'Descifra el verbo', xp:20, instr:'Forma el verbo.',
    words:[ {scrambled:['T','S','E','G','G','U','S'],ans:'SUGGEST',hint:'sugerir'},{scrambled:['T','I','M','D','A'],ans:'ADMIT',hint:'admitir'},{scrambled:['Y','N','E','D'],ans:'DENY',hint:'negar'},{scrambled:['N','R','A','W'],ans:'WARN',hint:'advertir'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada significado es correcto.',
    stmts:[
      { text:'"deny" significa negar.', ans:true, expl:'Correcto.' },
      { text:'"admit" significa negar.', ans:false, expl:'Falso. admit = admitir.' },
      { text:'"warn" significa advertir.', ans:true, expl:'Correcto.' },
      { text:'"suggest" significa acusar.', ans:false, expl:'Falso. suggest = sugerir.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada verbo por su sentido.',
    categories:['Confesar / Negar','Aconsejar / Advertir'],
    items:[ {text:'admit',correct:0},{text:'warn',correct:1},{text:'deny',correct:0},{text:'suggest',correct:1},{text:'confess',correct:0},{text:'recommend',correct:1} ] }
]);

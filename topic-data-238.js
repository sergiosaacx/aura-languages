/* topic-data-238.js - Juego 238/350 | T34 7/7 REPORTED ADVANCED | errores tipicos (MEZCLADO) | Platino B2 */
_registerGames(238, 'Verbos de Reporte Avanzados · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Sugirieron ir al cine', opts:['They suggested to go to the cinema','They suggested going to the cinema','They suggested go to the cinema','They suggested for going'], correct:1 },
      { src:'Lo acusaron de robar', opts:['He accused her for stealing','They accused her of stealing','They accused her to steal','They accused her stealing'], correct:1 },
      { src:'Negaron participar', opts:['They denied to take part','They denied taking part','They denied take part','They denied to taking part'], correct:1 },
      { src:'El admitio el error', opts:['He admitted to the mistake','He admitted the mistake','He admitted of the mistake','He admitted for the mistake'], correct:1 },
      { src:'Insistieron en quedarse', opts:['They insisted to stay','They insisted on staying','They insisted staying','They insisted in staying'], correct:1 },
      { src:'Nos advirtio que no condujeramos', opts:['She warned us to not drive','She warned us not to drive','She warned us not driving','She warned us no drive'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['suggested to go','suggested going','suggested go','suggested for going'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['suggested to go','suggested going'],['accused her for stealing','accused her of stealing'],['denied to take part','denied taking part'],['insisted to stay','insisted on staying'],['warned to not drive','warned not to drive'],['admitted to lie','admitted lying'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['going','They','suggested','to','the','cinema'],ans:['They','suggested','going','to','the','cinema']},{words:['of','They','accused','her','stealing'],ans:['They','accused','her','of','stealing']},{words:['drive','She','warned','us','not','to'],ans:['She','warned','us','not','to','drive']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['They','suggested','to','go','.'], wi:2, correct:'going', choices:['going','to','go','went'] },
      { words:['They','accused','her','for','stealing','.'], wi:3, correct:'of', choices:['of','for','to','with'] },
      { words:['They','denied','to','take','part','.'], wi:2, correct:'taking', choices:['taking','to','take','took'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['G','N','I','O','G'],ans:'GOING',hint:'suggested ...'},{scrambled:['F','O'],ans:'OF',hint:'accused her ... stealing'},{scrambled:['N','O'],ans:'ON',hint:'insisted ... staying'},{scrambled:['T','O','N'],ans:'NOT',hint:'warned ... to drive'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"They suggested going to the cinema." es correcto.', ans:true, expl:'Correcto. suggest + -ing.' },
      { text:'"They accused her for stealing." es correcto.', ans:false, expl:'Falso. accused her of stealing.' },
      { text:'"They insisted on staying." es correcto.', ans:true, expl:'Correcto. insist + on + -ing.' },
      { text:'"They denied to take part." es correcto.', ans:false, expl:'Falso. denied taking part.' } ] }
]);

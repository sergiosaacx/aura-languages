/* topic-data-237.js - Juego 237/350 | T34 6/7 REPORTED ADVANCED | en texto de noticias (MEZCLADO) | Platino B2 */
_registerGames(237, 'Verbos de Reporte · En Texto de Noticias', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'The minister ___ that taxes would increase.', opts:['accused','announced','denied','warned'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el verbo de reporte correcto segun el contexto.',
    sents:[
      { pre:'The minister ', ans:'announced', post:' that taxes would increase.', bank:['announced','accused','denied','warned'] },
      { pre:'The opposition ', ans:'accused', post:' him of lying.', bank:['accused','announced','suggested','admitted'] },
      { pre:'The company ', ans:'denied', post:' any wrongdoing.', bank:['denied','announced','accused','warned'] },
      { pre:'Experts ', ans:'warned', post:' that prices could rise.', bank:['warned','admitted','suggested','denied'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada verbo con su uso periodistico.',
    pairs:[ ['announced','dio a conocer'],['accused','culpo a alguien'],['denied','nego'],['warned','advirtio'],['admitted','reconocio'],['claimed','afirmo sin prueba'] ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada uso es correcto.',
    stmts:[
      { text:'"The minister announced that taxes would rise." es correcto.', ans:true, expl:'Correcto. announce + that.' },
      { text:'"They accused him of lying." es correcto.', ans:true, expl:'Correcto. accuse + of + -ing.' },
      { text:'"The company denied to do it." es correcto.', ans:false, expl:'Falso. denied doing it.' },
      { text:'"Experts warned that prices could rise." es correcto.', ans:true, expl:'Correcto. warn + that.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el verbo de reporte adecuado.',
    transforms:[
      { original:'dar a conocer una noticia', task:'Verbo', opts:['announced the news','accused the news','denied the news','warned the news'], correct:0 },
      { original:'culpar de mentir', task:'Verbo', opts:['accused him of lying','announced him of lying','denied him of lying','warned him of lying'], correct:0 },
      { original:'negar cualquier delito', task:'Verbo', opts:['denied any crime','announced any crime','accused any crime','admitted any crime'], correct:0 },
      { original:'advertir de un peligro', task:'Verbo', opts:['warned of a danger','announced of a danger','denied of a danger','admitted of a danger'], correct:0 } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['announced','The','minister','the','news'],ans:['The','minister','announced','the','news']},{words:['of','They','accused','him','lying'],ans:['They','accused','him','of','lying']},{words:['warned','Experts','of','danger'],ans:['Experts','warned','of','danger']} ] },
  { id:'scramble', label:'Descifra el verbo', xp:20, instr:'Forma el verbo.',
    words:[ {scrambled:['D','E','C','N','U','O','N','N','A'],ans:'ANNOUNCED',hint:'dio a conocer'},{scrambled:['D','E','S','U','C','C','A'],ans:'ACCUSED',hint:'culpo'},{scrambled:['D','E','I','N','E','D'],ans:'DENIED',hint:'nego'},{scrambled:['D','E','N','R','A','W'],ans:'WARNED',hint:'advirtio'} ] }
]);

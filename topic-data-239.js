/* topic-data-239.js - Juego 239/350 | T35 1/7 NOUN POWER | sustantivos abstractos (ESPECIALIZADO) | Platino B2 */
_registerGames(239, 'Sustantivos Abstractos · Vocabulario Avanzado', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el sustantivo abstracto correcto.',
    items:[
      { src:'conocimiento', opts:['knowledge','acknowledgement','knowing','known'], correct:0 },
      { src:'conciencia', opts:['awareness','aware','awaring','awared'], correct:0 },
      { src:'determinacion', opts:['determine','determination','determined','determinant'], correct:1 },
      { src:'logro', opts:['achieve','achievement','achieving','achiever'], correct:1 },
      { src:'evidencia', opts:['evident','evidence','evidently','evidencing'], correct:1 },
      { src:'responsabilidad', opts:['responsible','responsibility','responsibly','responding'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'El sustantivo abstracto de "aware" es...', opts:['awareness','awaring','awared','aware'], correct:0 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada sustantivo abstracto con su significado.',
    pairs:[ ['knowledge','conocimiento'],['awareness','conciencia'],['determination','determinacion'],['achievement','logro'],['evidence','evidencia'],['significance','importancia'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el sustantivo correcto.',
    sents:[
      { pre:'His ', ans:'knowledge', post:' of history is vast.', bank:['knowledge','known','knowing','knew'] },
      { pre:'Her ', ans:'determination', post:' was admirable.', bank:['determination','determined','determine','determinant'] },
      { pre:'The ', ans:'evidence', post:' was clear.', bank:['evidence','evident','evidently','evidencing'] },
      { pre:'It was a great ', ans:'achievement', post:'.', bank:['achievement','achieve','achieving','achiever'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el sustantivo.',
    words:[ {scrambled:['E','G','D','E','L','W','O','N','K'],ans:'KNOWLEDGE',hint:'conocimiento'},{scrambled:['E','C','N','E','D','I','V','E'],ans:'EVIDENCE',hint:'evidencia'},{scrambled:['S','S','E','N','E','R','A','W','A'],ans:'AWARENESS',hint:'conciencia'},{scrambled:['T','N','E','M','E','V','E','I','H','C','A'],ans:'ACHIEVEMENT',hint:'logro'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"knowledge" es un sustantivo abstracto.', ans:true, expl:'Correcto.' },
      { text:'"determined" es el sustantivo de "determine".', ans:false, expl:'Falso. el sustantivo es determination.' },
      { text:'"achievement" significa logro.', ans:true, expl:'Correcto.' },
      { text:'"evident" es un sustantivo.', ans:false, expl:'Falso. es adjetivo. el sustantivo es evidence.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada palabra.',
    categories:['Sustantivo abstracto','No es sustantivo'],
    items:[ {text:'knowledge',correct:0},{text:'aware',correct:1},{text:'determination',correct:0},{text:'evident',correct:1},{text:'achievement',correct:0},{text:'responsible',correct:1} ] }
]);

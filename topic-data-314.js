/* topic-data-314.js - Juego 314/350 | T45 6/7 ACADEMIC DISCOURSE | completar parrafo de discusion (MEZCLADO) | Diamante C1 */
_registerGames(314, 'Completar Parrafo de Discusion Academica', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"As Smith (2020) ___, the results indicate a significant shift."', opts:['says','argues','tells','speaks'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra academica correcta.',
    sents:[
      { pre:'As Smith (2020) ', ans:'argues', post:', the results indicate a shift.', bank:['argues','says','tells','speaks'] },
      { pre:'The data ', ans:'suggests', post:' a strong trend.', bank:['suggests','proves','totally shows','guarantees'] },
      { pre:'', ans:'Nevertheless', post:', further research is required.', bank:['Nevertheless','Plus','Anyway','So'] },
      { pre:'This ', ans:'may', post:' indicate a wider issue.', bank:['may','definitely','certainly','absolutely'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada hueco con la palabra correcta.',
    pairs:[ ['Smith (2020) ...','argues'],['the data ...','suggests'],['contraste formal','Nevertheless'],['posibilidad cauta','may indicate'],['ademas (formal)','Furthermore'],['por lo tanto','Therefore'] ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada eleccion es apropiada.',
    stmts:[
      { text:'"As Smith argues, the results indicate a shift." es apropiado.', ans:true, expl:'Correcto.' },
      { text:'"The data proves it beyond doubt." es apropiado sin pruebas firmes.', ans:false, expl:'Falso. demasiado categorico.' },
      { text:'"Nevertheless, further research is required." es apropiado.', ans:true, expl:'Correcto.' },
      { text:'"Plus, more study is needed." es academico.', ans:false, expl:'Falso. usa Furthermore.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la opcion academica.',
    transforms:[
      { original:'Smith says (academico)', task:'Verbo', opts:['Smith argues','Smith says','Smith tells','Smith speaks'], correct:0 },
      { original:'el dato indica (cauto)', task:'Verbo', opts:['the data suggests','the data proves','the data totally shows','the data guarantees'], correct:0 },
      { original:'contraste formal', task:'Conector', opts:['Nevertheless','Plus','Anyway','So'], correct:0 },
      { original:'posibilidad cauta', task:'Modal', opts:['may indicate','definitely shows','certainly proves','absolutely means'], correct:0 } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['argues','As','Smith','the','shift','is','clear'],ans:['As','Smith','argues','the','shift','is','clear']},{words:['suggests','The','data','a','trend'],ans:['The','data','suggests','a','trend']},{words:['required','Further','research','is'],ans:['Further','research','is','required']} ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra academica.',
    words:[ {scrambled:['E','U','G','R','A'],ans:'ARGUE',hint:'Smith ...s'},{scrambled:['T','S','E','G','G','U','S'],ans:'SUGGEST',hint:'the data ...s'},{scrambled:['S','S','E','L','E','H','T','R','E','V','E','N'],ans:'NEVERTHELESS',hint:'contraste formal'},{scrambled:['Y','A','M'],ans:'MAY',hint:'... indicate'} ] }
]);

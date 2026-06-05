/* topic-data-318.js - Juego 318/350 | T46 3/7 RHETORICAL POWER | estructuras de argumento (ESPECIALIZADO) | Challenger C2 */
_registerGames(318, 'Estructuras de Argumento en Discurso Publico', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Presentar un problema y luego su remedio es la estructura...', opts:['Problem-Solution','Cause-Effect','Compare-Contrast','Claim-Evidence'], correct:0 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada estructura con su descripcion.',
    pairs:[ ['Problem-Solution','problema y remedio'],['Cause-Effect','causa y consecuencia'],['Compare-Contrast','semejanzas y diferencias'],['Claim-Evidence-Warrant','tesis, prueba y enlace'],['Chronological','orden temporal'],['Spatial','orden espacial'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la estructura correcta.',
    sents:[
      { pre:'"Crime is rising; here is how we fix it" uses ', ans:'Problem-Solution', post:'.', bank:['Problem-Solution','Cause-Effect','Compare-Contrast','Claim-Evidence'] },
      { pre:'"Pollution rose, so health declined" uses ', ans:'Cause-Effect', post:'.', bank:['Cause-Effect','Problem-Solution','Compare-Contrast','Spatial'] },
      { pre:'"City life vs country life" uses ', ans:'Compare-Contrast', post:'.', bank:['Compare-Contrast','Cause-Effect','Problem-Solution','Chronological'] },
      { pre:'"We must act, because data shows X" uses ', ans:'Claim-Evidence', post:'.', bank:['Claim-Evidence','Spatial','Compare-Contrast','Chronological'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada extracto por su estructura.',
    categories:['Problem-Solution','Cause-Effect','Compare-Contrast'],
    items:[ {text:'crime rises; here is the fix',correct:0},{text:'rain fell, so floods came',correct:1},{text:'dogs vs cats as pets',correct:2},{text:'poverty grows; we propose aid',correct:0},{text:'smoking causes disease',correct:1},{text:'old vs new methods',correct:2} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'Problem-Solution presenta un problema y su remedio.', ans:true, expl:'Correcto.' },
      { text:'Cause-Effect compara dos elementos.', ans:false, expl:'Falso. eso es Compare-Contrast.' },
      { text:'Claim-Evidence-Warrant incluye una tesis y su prueba.', ans:true, expl:'Correcto.' },
      { text:'Compare-Contrast describe causas y consecuencias.', ans:false, expl:'Falso. eso es Cause-Effect.' } ] },
  { id:'order', label:'Ordena la estructura', xp:30, instr:'Ordena los pasos del argumento.',
    sents:[ {words:['Solution','Problem','Result'],ans:['Problem','Solution','Result']},{words:['Effect','Cause','Response'],ans:['Cause','Effect','Response']},{words:['Evidence','Claim','Warrant'],ans:['Claim','Evidence','Warrant']} ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra clave.',
    words:[ {scrambled:['M','E','L','B','O','R','P'],ans:'PROBLEM',hint:'... - Solution'},{scrambled:['E','S','U','A','C'],ans:'CAUSE',hint:'... - Effect'},{scrambled:['M','I','A','L','C'],ans:'CLAIM',hint:'... - Evidence'},{scrambled:['E','C','N','E','D','I','V','E'],ans:'EVIDENCE',hint:'Claim - ...'} ] }
]);

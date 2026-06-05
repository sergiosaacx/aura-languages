/* topic-data-311.js - Juego 311/350 | T45 3/7 ACADEMIC DISCOURSE | convenciones de genero textual (ESPECIALIZADO) | Diamante C1 */
_registerGames(311, 'Convenciones de Genero Textual Academico', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'La seccion que resume todo el articulo es...', opts:['Introduction','Abstract','Methodology','Conclusion'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada seccion con su funcion.',
    pairs:[ ['Abstract','resumen del articulo'],['Introduction','presenta el tema y objetivos'],['Literature Review','revisa estudios previos'],['Methodology','describe el metodo'],['Discussion','interpreta los resultados'],['Conclusion','cierra y resume hallazgos'] ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Ordena las secciones por su lugar en el paper.',
    categories:['Inicio','Medio','Final'],
    items:[ {text:'Abstract',correct:0},{text:'Methodology',correct:1},{text:'Conclusion',correct:2},{text:'Introduction',correct:0},{text:'Discussion',correct:1},{text:'References',correct:2} ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la seccion correcta.',
    sents:[
      { pre:'The ', ans:'Abstract', post:' summarises the whole paper.', bank:['Abstract','Introduction','Methodology','Conclusion'] },
      { pre:'The ', ans:'Methodology', post:' explains how the study was done.', bank:['Methodology','Abstract','Discussion','Conclusion'] },
      { pre:'The ', ans:'Literature Review', post:' surveys previous studies.', bank:['Literature Review','Abstract','Methodology','Conclusion'] },
      { pre:'The ', ans:'Discussion', post:' interprets the findings.', bank:['Discussion','Abstract','Introduction','References'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'El Abstract resume el articulo completo.', ans:true, expl:'Correcto.' },
      { text:'La Methodology interpreta los resultados.', ans:false, expl:'Falso. eso lo hace la Discussion.' },
      { text:'La Conclusion cierra y resume los hallazgos.', ans:true, expl:'Correcto.' },
      { text:'La Introduction revisa toda la literatura previa.', ans:false, expl:'Falso. eso es la Literature Review.' } ] },
  { id:'order', label:'Ordena las secciones', xp:30, instr:'Ordena las secciones del paper.',
    sents:[ {words:['Methodology','Abstract','Introduction'],ans:['Abstract','Introduction','Methodology']},{words:['Conclusion','Discussion','Methodology'],ans:['Methodology','Discussion','Conclusion']},{words:['References','Discussion','Introduction'],ans:['Introduction','Discussion','References']} ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el nombre de la seccion.',
    words:[ {scrambled:['T','C','A','R','T','S','B','A'],ans:'ABSTRACT',hint:'resumen'},{scrambled:['D','O','H','T','E','M'],ans:'METHOD',hint:'metodo'},{scrambled:['N','O','I','S','S','U','C','S','I','D'],ans:'DISCUSSION',hint:'interpreta resultados'},{scrambled:['S','E','C','N','E','R','E','F','E','R'],ans:'REFERENCES',hint:'bibliografia'} ] }
]);

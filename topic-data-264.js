/* topic-data-264.js - Juego 264/350 | T38 5/7 ACADEMIC WRITING | oraciones academicas con conectores (MEZCLADO) | Platino B2 */
_registerGames(264, 'Oraciones Academicas · Conectores Avanzados', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion academica correcta.',
    items:[
      { src:'Ademas, los resultados sugieren una fuerte correlacion', opts:['Furthermore, the results suggest a strong correlation','Also the results suggest a strong correlation','Plus the results suggest a strong correlation','And the results suggest a strong correlation'], correct:0 },
      { src:'En conclusion, se necesita mas investigacion', opts:['In conclusion, further research is needed','So we need more research','To end, we need more research','At last, more research is needed'], correct:0 },
      { src:'Sin embargo, los datos son limitados', opts:['However, the data is limited','But the data is limited','Though the data is limited badly','Anyway the data is limited'], correct:0 },
      { src:'Como resultado, el experimento se repitio', opts:['As a result, the experiment was repeated','So the experiment was repeated','Then the experiment was repeated','Because the experiment was repeated'], correct:0 },
      { src:'Con respecto a los costos, son altos', opts:['With regard to the costs, they are high','About the costs, they are high','For the costs, they are high','On costs, they are high'], correct:0 },
      { src:'Por lo tanto, la hipotesis es valida', opts:['Therefore, the hypothesis is valid','So the hypothesis is valid','Then the hypothesis is valid','Thus and the hypothesis is valid'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Para anadir un argumento en un texto academico se usa...', opts:['plus','furthermore','and so','also kinda'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el conector academico correcto.',
    sents:[
      { pre:'', ans:'Furthermore', post:', the results suggest a strong correlation.', bank:['Furthermore','Plus','And','Also kinda'] },
      { pre:'', ans:'In conclusion', post:', further research is needed.', bank:['In conclusion','So','To end','At last'] },
      { pre:'', ans:'However', post:', the sample was small.', bank:['However','But','Though badly','Anyway'] },
      { pre:'', ans:'As a result', post:', the model was revised.', bank:['As a result','So','Then','Because'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['Furthermore','the','results','suggest','a','correlation'],ans:['Furthermore','the','results','suggest','a','correlation']},{words:['conclusion','In','research','is','needed'],ans:['In','conclusion','research','is','needed']},{words:['result','As','a','it','was','revised'],ans:['As','a','result','it','was','revised']} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Reescribe en registro academico.',
    transforms:[
      { original:'Plus, the results show a link.', task:'Academico', opts:['Furthermore, the results suggest a correlation.','Plus, the results show a link.','And the results show stuff.','Also the results show it.'], correct:0 },
      { original:'So we need more research.', task:'Academico', opts:['In conclusion, further research is needed.','So we need more research.','To end, we need research.','At last, research is needed.'], correct:0 },
      { original:'But the data is small.', task:'Academico', opts:['However, the data is limited.','But the data is small.','Though the data is tiny.','Anyway the data is small.'], correct:0 },
      { original:'So the test was redone.', task:'Academico', opts:['As a result, the test was repeated.','So the test was redone.','Then the test was redone.','Because the test was redone.'], correct:0 } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la oracion es de registro academico.',
    stmts:[
      { text:'"Furthermore, the results suggest a strong correlation." es academico.', ans:true, expl:'Correcto.' },
      { text:'"Plus, the results show stuff." es academico.', ans:false, expl:'Falso. registro informal.' },
      { text:'"In conclusion, further research is needed." es academico.', ans:true, expl:'Correcto.' },
      { text:'"Anyway the data is limited." es academico.', ans:false, expl:'Falso. anyway es informal.' } ] },
  { id:'scramble', label:'Descifra el conector', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['E','R','O','M','R','E','H','T','R','U','F'],ans:'FURTHERMORE',hint:'ademas'},{scrambled:['N','O','I','S','U','L','C','N','O','C'],ans:'CONCLUSION',hint:'in ...'},{scrambled:['T','L','U','S','E','R'],ans:'RESULT',hint:'as a ...'},{scrambled:['R','E','V','E','W','O','H'],ans:'HOWEVER',hint:'sin embargo'} ] }
]);

/* topic-data-266.js - Juego 266/350 | T38 7/7 ACADEMIC WRITING | errores de escritura academica (MEZCLADO) | Platino B2 */
_registerGames(266, 'Escritura Academica · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la version academica correcta.',
    items:[
      { src:'Los resultados fueron positivos. Sin embargo, se necesita mas investigacion.', opts:['The results were positive. But, further research is needed.','The results were positive. However, further research is needed.','The results were positive. So, more research is needed.','The results were positive. Anyway, research is needed.'], correct:1 },
      { src:'Obtuvimos buenos resultados.', opts:['We got good results.','We obtained good results.','We grabbed good results.','We picked up good results.'], correct:1 },
      { src:'El estudio demuestra el efecto.', opts:['The study shows the effect.','The study demonstrates the effect.','The study tells the effect.','The study says the effect.'], correct:1 },
      { src:'Ademas, los datos confirman la teoria.', opts:['Plus, the data confirms the theory.','Furthermore, the data confirms the theory.','And the data confirms the theory.','Also the data confirms it.'], correct:1 },
      { src:'En conclusion, la hipotesis es valida.', opts:['So the hypothesis is valid.','In conclusion, the hypothesis is valid.','To end, the hypothesis is valid.','At last, it is valid.'], correct:1 },
      { src:'Necesitamos obtener mas datos.', opts:['We need to get more data.','We need to obtain more data.','We need to grab more data.','We need more data quick.'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'En un texto academico, "But, ..." al inicio deberia ser...', opts:['So','However','And','Plus'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion academica.',
    pairs:[ ['But, further research...','However, further research...'],['We got results','We obtained results'],['The study shows','The study demonstrates'],['Plus, the data...','Furthermore, the data...'],['So we conclude','In conclusion'],['get more data','obtain more data'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['However','further','research','is','needed'],ans:['However','further','research','is','needed']},{words:['obtained','We','good','results'],ans:['We','obtained','good','results']},{words:['demonstrates','The','study','the','effect'],ans:['The','study','demonstrates','the','effect']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra de registro incorrecto y elige la correccion.',
    sents:[
      { words:['But',',','further','research','is','needed','.'], wi:0, correct:'However', choices:['However','But','So','And'] },
      { words:['We','got','good','results','.'], wi:1, correct:'obtained', choices:['obtained','got','grabbed','picked'] },
      { words:['The','study','shows','the','effect','.'], wi:2, correct:'demonstrates', choices:['demonstrates','shows','tells','says'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la oracion es academicamente correcta.',
    stmts:[
      { text:'"However, further research is needed." es academico.', ans:true, expl:'Correcto.' },
      { text:'"We got good results." es academico.', ans:false, expl:'Falso. We obtained good results.' },
      { text:'"The study demonstrates the effect." es academico.', ans:true, expl:'Correcto.' },
      { text:'"Plus, the data confirms it." es academico.', ans:false, expl:'Falso. Furthermore.' } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra academica.',
    words:[ {scrambled:['R','E','V','E','W','O','H'],ans:'HOWEVER',hint:'corrige But'},{scrambled:['D','E','N','I','A','T','B','O'],ans:'OBTAINED',hint:'corrige got'},{scrambled:['E','R','O','M','R','E','H','T','R','U','F'],ans:'FURTHERMORE',hint:'corrige Plus'},{scrambled:['N','O','I','S','U','L','C','N','O','C'],ans:'CONCLUSION',hint:'in ...'} ] }
]);

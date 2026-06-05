/* topic-data-313.js - Juego 313/350 | T45 5/7 ACADEMIC DISCOURSE | lenguaje academico formal (MEZCLADO) | Diamante C1 */
_registerGames(313, 'Lenguaje Academico Formal · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion academica correcta.',
    items:[
      { src:'Los hallazgos sugieren una fuerte correlacion entre factores socioeconomicos y rendimiento academico', opts:['The findings suggest a strong correlation between socioeconomic factors and academic performance','The findings prove a link between money and grades','The results totally show a connection','The data clearly proves it all'], correct:0 },
      { src:'Smith (2020) sostiene que la politica fracaso', opts:['Smith (2020) says the policy was bad','Smith (2020) argues that the policy failed','Smith (2020) tells the policy failed','Smith (2020) speaks the policy failed'], correct:1 },
      { src:'La evidencia indica una posible tendencia', opts:['The evidence proves a trend','The evidence indicates a possible trend','The evidence totally shows a trend','The evidence guarantees a trend'], correct:1 },
      { src:'Se requiere mas investigacion', opts:['We need more research, basically','Further research is required','We gotta do more research','More research is needed, for sure totally'], correct:1 },
      { src:'Es concebible que otros factores influyan', opts:['Maybe other factors matter','It is conceivable that other factors are involved','Other factors definitely matter','Other factors always matter'], correct:1 },
      { src:'El estudio reconoce sus limitaciones', opts:['The study admits it is bad','The study acknowledges its limitations','The study says it is limited','The study tells its limits'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es mas academico?', opts:['The findings prove it.','The findings suggest a correlation.','The data totally shows it.','It clearly proves it all.'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra academica correcta.',
    sents:[
      { pre:'The findings ', ans:'suggest', post:' a strong correlation.', bank:['suggest','prove','totally show','guarantee'] },
      { pre:'Smith (2020) ', ans:'argues', post:' that the policy failed.', bank:['argues','says','tells','speaks'] },
      { pre:'Further research is ', ans:'required', post:'.', bank:['required','needed badly','gotta be done','a must'] },
      { pre:'The study ', ans:'acknowledges', post:' its limitations.', bank:['acknowledges','admits it is bad','says sorry','tells'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['suggest','The','findings','a','correlation'],ans:['The','findings','suggest','a','correlation']},{words:['argues','Smith','that','it','failed'],ans:['Smith','argues','that','it','failed']},{words:['required','Further','research','is'],ans:['Further','research','is','required']} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es de registro academico.',
    stmts:[
      { text:'"The findings suggest a strong correlation." es academico.', ans:true, expl:'Correcto.' },
      { text:'"The data totally proves it." es academico.', ans:false, expl:'Falso. demasiado informal y categorico.' },
      { text:'"Further research is required." es academico.', ans:true, expl:'Correcto.' },
      { text:'"We gotta do more research." es academico.', ans:false, expl:'Falso. informal.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Pasa al registro academico.',
    transforms:[
      { original:'The data totally proves a link.', task:'Academico', opts:['The data suggests a link.','The data totally proves a link.','The data clearly shows it all.','The data guarantees a link.'], correct:0 },
      { original:'Smith says the policy failed.', task:'Academico', opts:['Smith argues that the policy failed.','Smith says it failed.','Smith tells it failed.','Smith speaks of failure.'], correct:0 },
      { original:'We need more research.', task:'Academico', opts:['Further research is required.','We need more research badly.','We gotta research more.','More research, for sure.'], correct:0 },
      { original:'The study admits it is bad.', task:'Academico', opts:['The study acknowledges its limitations.','The study admits it is bad.','The study says sorry.','The study tells its flaws.'], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra academica.',
    words:[ {scrambled:['T','S','E','G','G','U','S'],ans:'SUGGEST',hint:'the findings ...'},{scrambled:['E','U','G','R','A'],ans:'ARGUE',hint:'Smith ...s that'},{scrambled:['D','E','R','I','U','Q','E','R'],ans:'REQUIRED',hint:'research is ...'},{scrambled:['E','T','A','C','I','D','N','I'],ans:'INDICATE',hint:'the evidence ...s'} ] }
]);

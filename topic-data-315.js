/* topic-data-315.js - Juego 315/350 | T45 7/7 ACADEMIC DISCOURSE | errores de escritura academica avanzada (MEZCLADO) | Diamante C1 */
_registerGames(315, 'Escritura Academica Avanzada · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la version academica correcta.',
    items:[
      { src:'El estudio sugiere que...', opts:['The study proves that...','The study suggests that...','The study totally shows that...','The study guarantees that...'], correct:1 },
      { src:'Smith sostiene que...', opts:['Smith says that...','Smith argues that...','Smith tells that...','Smith speaks that...'], correct:1 },
      { src:'Este es un hallazgo particularmente significativo', opts:['This is a really important finding','This is a particularly significant finding','This is a super cool finding','This is a big finding'], correct:1 },
      { src:'La evidencia indica una posible relacion', opts:['The evidence proves a relation','The evidence indicates a possible relation','The evidence totally shows a relation','The evidence guarantees a relation'], correct:1 },
      { src:'Se requiere mas investigacion', opts:['We need more research', 'Further research is required','We gotta research more','More research, for sure'], correct:1 },
      { src:'El autor reconoce las limitaciones', opts:['The author admits it is bad','The author acknowledges the limitations','The author says it is limited','The author tells the limits'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"The study proves that..." es demasiado...', opts:['cauto','categorico','informal','breve'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['The study proves that','The study suggests that'],['Smith says that','Smith argues that'],['a really important finding','a particularly significant finding'],['totally shows','indicates'],['we gotta research','further research is required'],['admits it is bad','acknowledges limitations'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['suggests','The','study','that','it','works'],ans:['The','study','suggests','that','it','works']},{words:['argues','Smith','that','it','failed'],ans:['Smith','argues','that','it','failed']},{words:['required','Further','research','is'],ans:['Further','research','is','required']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra inapropiada y elige la correccion.',
    sents:[
      { words:['The','study','proves','that','it','works','.'], wi:2, correct:'suggests', choices:['suggests','proves','totally shows','guarantees'] },
      { words:['Smith','says','that','it','failed','.'], wi:1, correct:'argues', choices:['argues','says','tells','speaks'] },
      { words:['This','is','a','really','important','finding','.'], wi:3, correct:'particularly', choices:['particularly','really','super','very'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es academicamente apropiada.',
    stmts:[
      { text:'"The study suggests that..." es apropiado.', ans:true, expl:'Correcto. cauto.' },
      { text:'"Smith says that..." es el verbo academico mas preciso.', ans:false, expl:'Falso. argues/contends.' },
      { text:'"a particularly significant finding" es apropiado.', ans:true, expl:'Correcto.' },
      { text:'"This is a really important finding." es academico.', ans:false, expl:'Falso. particularly significant.' } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['T','S','E','G','G','U','S'],ans:'SUGGEST',hint:'corrige prove'},{scrambled:['E','U','G','R','A'],ans:'ARGUE',hint:'corrige say'},{scrambled:['E','T','A','C','I','D','N','I'],ans:'INDICATE',hint:'corrige totally show'},{scrambled:['T','N','A','C','I','F','I','N','G','I','S'],ans:'SIGNIFICANT',hint:'particularly ...'} ] }
]);

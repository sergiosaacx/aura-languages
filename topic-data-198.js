/* topic-data-198.js - Juego 198/350 | T29 2/7 LINK IT UP | clausulas de relativo (ESPECIALIZADO) | Oro B1 */
_registerGames(198, 'Clausulas de Relativo · Who / Which / That', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'The man ___ lives next door is a doctor.', opts:['which','who','where','whose'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el pronombre relativo correcto.',
    sents:[
      { pre:'The man ', ans:'who', post:' lives next door is a doctor.', bank:['who','which','where','whose'] },
      { pre:'The book ', ans:'which', post:' I bought is great.', bank:['which','who','where','whose'] },
      { pre:'This is the city ', ans:'where', post:' I grew up.', bank:['where','who','which','whose'] },
      { pre:'The woman ', ans:'whose', post:' car was stolen called.', bank:['whose','who','which','where'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada relativo con su uso.',
    pairs:[ ['who','personas'],['which','cosas'],['where','lugares'],['whose','posesion'],['that','personas y cosas'],['when','tiempo'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['who','The','man','lives','here','is','my','uncle'],ans:['The','man','who','lives','here','is','my','uncle']},{words:['which','The','book','I','bought','is','good'],ans:['The','book','which','I','bought','is','good']},{words:['where','This','is','the','place','we','met'],ans:['This','is','the','place','where','we','met']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el relativo incorrecto y elige la correccion.',
    sents:[
      { words:['The','man','which','lives','here','.'], wi:2, correct:'who', choices:['who','which','where','whose'] },
      { words:['The','book','who','I','read','.'], wi:2, correct:'which', choices:['which','who','where','whose'] },
      { words:['The','city','which','I','live','.'], wi:2, correct:'where', choices:['where','which','who','whose'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada regla es correcta.',
    stmts:[
      { text:'"who" se usa para personas.', ans:true, expl:'Correcto.' },
      { text:'"which" se usa para personas.', ans:false, expl:'Falso. which = cosas.' },
      { text:'"whose" indica posesion.', ans:true, expl:'Correcto. The man whose car...' },
      { text:'"where" se usa para cosas.', ans:false, expl:'Falso. where = lugares.' } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'The man who lives next door is a doctor.', type:'select', opts:['The man who lives next door is a doctor.','The man which lives next door is a doctor.','The man where lives next door is a doctor.','The man whose lives next door is a doctor.'], correct:0 },
      { tts:'The book which I bought is great.', type:'select', opts:['The book which I bought is great.','The book who I bought is great.','The book where I bought is great.','The book whose I bought is great.'], correct:0 },
      { tts:'This is the city where I grew up.', type:'select', opts:['This is the city where I grew up.','This is the city which I grew up.','This is the city who I grew up.','This is the city whose I grew up.'], correct:0 } ] }
]);

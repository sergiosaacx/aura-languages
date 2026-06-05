/* topic-data-333.js - Juego 333/350 | T48 4/7 GRAMMAR EDGE | multinomiales (ESPECIALIZADO) | Challenger C2 */
_registerGames(333, 'Multinomiales y Expresiones Coordinadas', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es el orden correcto?', opts:['able, ready and willing','ready, willing and able','willing, able and ready','ready, able and willing'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada multinomial con su significado.',
    pairs:[ ['ready, willing and able','totalmente dispuesto y capaz'],['blood, sweat and tears','gran esfuerzo'],['stop, drop and roll','protocolo contra el fuego'],['lock, stock and barrel','todo por completo'],['hook, line and sinker','por completo (engano)'],['signed, sealed and delivered','hecho y confirmado'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra que completa el multinomial.',
    sents:[
      { pre:'She is ready, willing and ', ans:'able', post:'.', bank:['able','capable','strong','fit'] },
      { pre:'It took blood, sweat and ', ans:'tears', post:'.', bank:['tears','toil','time','work'] },
      { pre:'He bought it lock, stock and ', ans:'barrel', post:'.', bank:['barrel','box','crate','case'] },
      { pre:'They fell for it hook, line and ', ans:'sinker', post:'.', bank:['sinker','rod','net','bait'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si el orden es el convencional.',
    stmts:[
      { text:'"ready, willing and able" es el orden correcto.', ans:true, expl:'Correcto.' },
      { text:'"tears, sweat and blood" es el orden convencional.', ans:false, expl:'Falso. blood, sweat and tears.' },
      { text:'"lock, stock and barrel" es el orden correcto.', ans:true, expl:'Correcto.' },
      { text:'"line, hook and sinker" es el orden convencional.', ans:false, expl:'Falso. hook, line and sinker.' } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['able','ready','willing','and'],ans:['ready','willing','and','able']},{words:['tears','blood','sweat','and'],ans:['blood','sweat','and','tears']},{words:['barrel','lock','stock','and'],ans:['lock','stock','and','barrel']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra mal ordenada y elige la correccion.',
    sents:[
      { words:['blood',',','tears','and','sweat','.'], wi:2, correct:'sweat', choices:['sweat','tears','toil','work'] },
      { words:['ready',',','able','and','willing','.'], wi:2, correct:'willing', choices:['willing','able','fit','keen'] },
      { words:['hook',',','sinker','and','line','.'], wi:2, correct:'line', choices:['line','sinker','rod','net'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['E','L','B','A'],ans:'ABLE',hint:'ready, willing and ...'},{scrambled:['S','R','A','E','T'],ans:'TEARS',hint:'blood, sweat and ...'},{scrambled:['L','E','R','R','A','B'],ans:'BARREL',hint:'lock, stock and ...'},{scrambled:['R','E','K','N','I','S'],ans:'SINKER',hint:'hook, line and ...'} ] }
]);

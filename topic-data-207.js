/* topic-data-207.js - Juego 207/350 | T30 4/7 WORD BUILDER | reglas ortograficas (ESPECIALIZADO) | Oro B1 */
_registerGames(207, 'Reglas Ortograficas de Prefijos y Sufijos', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'un + necessary = ?', opts:['unecessary','unnecessary','unneccesary','unecesary'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada regla es correcta.',
    stmts:[
      { text:'"un + necessary = unnecessary" (doble n).', ans:true, expl:'Correcto. el prefijo no cambia la raiz.' },
      { text:'"happy + -ness = happyness".', ans:false, expl:'Falso. happiness (y->i).' },
      { text:'Los prefijos normalmente no cambian la ortografia de la raiz.', ans:true, expl:'Correcto. mis+spell=misspell.' },
      { text:'"un + necessary = unecessary" (una sola n).', ans:false, expl:'Falso. unnecessary.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra bien escrita.',
    sents:[
      { pre:'un + necessary = ', ans:'unnecessary', post:'.', bank:['unnecessary','unecessary','unneccesary','unecesary'] },
      { pre:'happy + -ness = ', ans:'happiness', post:'.', bank:['happiness','happyness','hapiness','happines'] },
      { pre:'mis + spell = ', ans:'misspell', post:'.', bank:['misspell','mispell','mispelll','mispel'] },
      { pre:'beauty + -ful = ', ans:'beautiful', post:'.', bank:['beautiful','beautyful','beatiful','beautifull'] } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Une la raiz con el afijo correctamente.',
    transforms:[
      { original:'un + necessary', task:'Une', opts:['unnecessary','unecessary','unneccesary','unecesary'], correct:0 },
      { original:'happy + -ness', task:'Une', opts:['happiness','happyness','hapiness','happines'], correct:0 },
      { original:'mis + spell', task:'Une', opts:['misspell','mispell','mispelll','mispel'], correct:0 },
      { original:'use + -ful', task:'Une', opts:['useful','usefull','usful','usefful'], correct:0 } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['unnecessary','un','plus','necessary','equals'],ans:['un','plus','necessary','equals','unnecessary']},{words:['happiness','happy','plus','-ness','equals'],ans:['happy','plus','-ness','equals','happiness']},{words:['misspell','mis','plus','spell','equals'],ans:['mis','plus','spell','equals','misspell']} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'It is unnecessary.', type:'select', opts:['It is unnecessary.','It is unecessary.','It is unneccesary.','It is unecesary.'], correct:0 },
      { tts:'Her happiness is clear.', type:'select', opts:['Her happiness is clear.','Her happyness is clear.','Her hapiness is clear.','Her happines is clear.'], correct:0 },
      { tts:'Do not misspell it.', type:'select', opts:['Do not misspell it.','Do not mispell it.','Do not missspell it.','Do not mispel it.'], correct:0 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada combinacion con la palabra correcta.',
    pairs:[ ['un + necessary','unnecessary'],['happy + ness','happiness'],['mis + spell','misspell'],['use + ful','useful'],['beauty + ful','beautiful'],['re + enter','reenter'] ] }
]);

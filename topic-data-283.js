/* topic-data-283.js - Juego 283/350 | T41 3/7 ELLIPSIS | one/ones, do so, former/latter (ESPECIALIZADO) | Diamante C1 */
_registerGames(283, 'Sustitucion · One / Do So / Former / Latter', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"I need a pen. Do you have a red ___?"', opts:['it','one','do so','that'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada sustituto con su uso.',
    pairs:[ ['one / ones','sustituye sustantivos contables'],['do so','sustituye un predicado'],['the former','el primer elemento'],['the latter','el segundo elemento'],['it','sustituye algo especifico'],['such','sustituye un tipo'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el sustituto correcto.',
    sents:[
      { pre:'I need a pen. Do you have a red ', ans:'one', post:'?', bank:['one','it','do so','that'] },
      { pre:'She asked me to wait, and I ', ans:'did so', post:'.', bank:['did so','one','it','those'] },
      { pre:'I like tea and coffee, but I prefer the ', ans:'former', post:'.', bank:['former','latter','one','do so'] },
      { pre:'These books are old; I want the new ', ans:'ones', post:'.', bank:['ones','one','it','do so'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"one" sustituye un sustantivo contable singular.', ans:true, expl:'Correcto. a red one.' },
      { text:'"do so" sustituye un sustantivo.', ans:false, expl:'Falso. sustituye un predicado verbal.' },
      { text:'"the former" se refiere al primer elemento mencionado.', ans:true, expl:'Correcto.' },
      { text:'"the latter" se refiere al primer elemento.', ans:false, expl:'Falso. al segundo.' } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['one','I','want','a','red'],ans:['I','want','a','red','one']},{words:['so','She','asked','and','I','did'],ans:['She','asked','and','I','did','so']},{words:['former','I','prefer','the'],ans:['I','prefer','the','former']} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada sustituto por lo que reemplaza.',
    categories:['Sustituye sustantivo','Sustituye predicado','Indica orden'],
    items:[ {text:'one / ones',correct:0},{text:'do so',correct:1},{text:'the former',correct:2},{text:'such a thing',correct:0},{text:'do this',correct:1},{text:'the latter',correct:2} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la sustitucion correcta.',
    transforms:[
      { original:'I need a pen — a red pen.', task:'Sustituye', opts:['I need a red one.','I need a red it.','I need a red do so.','I need a red that.'], correct:0 },
      { original:'She asked me to leave, and I left.', task:'Sustituye', opts:['She asked me to leave, and I did so.','She asked me to leave, and I did one.','She asked me to leave, and I it.','She asked me to leave, and I such.'], correct:0 },
      { original:'tea and coffee; I prefer tea.', task:'Sustituye', opts:['I prefer the former.','I prefer the latter.','I prefer the one.','I prefer do so.'], correct:0 },
      { original:'old books; I want new books.', task:'Sustituye', opts:['I want the new ones.','I want the new one.','I want the new it.','I want the new do so.'], correct:0 } ] }
]);

/* topic-data-191.js - Juego 191/350 | T28 2/7 PHRASAL VERBS I | separables vs inseparables (ESPECIALIZADO) | Oro B1 */
_registerGames(191, 'Separables vs Inseparables', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Con un phrasal verb separable y pronombre, donde va el pronombre?', opts:['al final','entre el verbo y la particula','antes del verbo','no importa'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"Turn it off." es correcto (separable).', ans:true, expl:'Correcto. el pronombre va en medio.' },
      { text:'"Turn off it." es correcto.', ans:false, expl:'Falso. Turn it off (pronombre en medio).' },
      { text:'"Look after them." es correcto (inseparable).', ans:true, expl:'Correcto. inseparable: objeto al final.' },
      { text:'"Look them after." es correcto.', ans:false, expl:'Falso. Look after them.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'Can you turn ', ans:'it off', post:'?', bank:['it off','off it','it of','off it now'] },
      { pre:'Please look ', ans:'after them', post:'.', bank:['after them','them after','for them after','them for'] },
      { pre:'I picked ', ans:'them up', post:' at six.', bank:['them up','up them','them in','in them'] },
      { pre:'She looks ', ans:'after him', post:'.', bank:['after him','him after','for him after','him for'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['off','Turn','it'],ans:['Turn','it','off']},{words:['them','Look','after'],ans:['Look','after','them']},{words:['up','Pick','it'],ans:['Pick','it','up']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra mal ubicada y elige la correccion.',
    sents:[
      { words:['Turn','off','it','.'], wi:1, correct:'it', choices:['it','off','on','up'] },
      { words:['Look','them','after','.'], wi:1, correct:'after', choices:['after','them','for','up'] },
      { words:['Pick','up','it','.'], wi:1, correct:'it', choices:['it','up','on','off'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada phrasal verb.',
    categories:['Separable','Inseparable'],
    items:[ {text:'turn off',correct:0},{text:'look after',correct:1},{text:'pick up',correct:0},{text:'look for',correct:1},{text:'switch on',correct:0},{text:'get on (a bus)',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'Turn it off, please.', type:'select', opts:['Turn it off, please.','Turn off it, please.','Turn it of, please.','Turn off it now.'], correct:0 },
      { tts:'Look after them.', type:'select', opts:['Look after them.','Look them after.','Look for them after.','Look them for.'], correct:0 },
      { tts:'I picked them up at six.', type:'select', opts:['I picked them up at six.','I picked up them at six.','I picked them in at six.','I picked in them at six.'], correct:0 } ] }
]);

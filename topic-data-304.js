/* topic-data-304.js - Juego 304/350 | T44 3/7 COLLOCATION MASTER | conjuntos lexicos (ESPECIALIZADO) | Diamante C1 */
_registerGames(304, 'Conjuntos Lexicos', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual verbo NO suele combinar con "time"?', opts:['waste','kill','save','earn'], correct:3 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada verbo con su sustantivo central.',
    pairs:[ ['spare / kill / waste','time'],['earn / spend / invest','money'],['catch / miss / take','a train'],['tell / crack / get','a joke'],['break / keep / make','a promise'],['draw / reach / make','a conclusion'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el verbo que combina con el sustantivo.',
    sents:[
      { pre:'I need to ', ans:'kill', post:' some time.', bank:['kill','earn','catch','tell'] },
      { pre:'She wants to ', ans:'earn', post:' more money.', bank:['earn','kill','catch','tell'] },
      { pre:'We might ', ans:'miss', post:' the train.', bank:['miss','earn','kill','tell'] },
      { pre:'He likes to ', ans:'tell', post:' jokes.', bank:['tell','earn','kill','catch'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada verbo segun su sustantivo central.',
    categories:['+ time','+ money','+ a train'],
    items:[ {text:'waste',correct:0},{text:'spend',correct:1},{text:'catch',correct:2},{text:'kill',correct:0},{text:'invest',correct:1},{text:'miss',correct:2} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada combinacion es natural.',
    stmts:[
      { text:'"kill time" es una colocacion natural.', ans:true, expl:'Correcto.' },
      { text:'"earn time" es una colocacion natural.', ans:false, expl:'Falso. se gana dinero, no tiempo (waste/save time).' },
      { text:'"invest money" es natural.', ans:true, expl:'Correcto.' },
      { text:'"catch a joke" es natural.', ans:false, expl:'Falso. tell/crack a joke.' } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['time','I','need','to','kill','some'],ans:['I','need','to','kill','some','time']},{words:['money','She','wants','to','earn'],ans:['She','wants','to','earn','money']},{words:['train','We','might','miss','the'],ans:['We','might','miss','the','train']} ] },
  { id:'scramble', label:'Descifra el verbo', xp:20, instr:'Forma el verbo.',
    words:[ {scrambled:['L','L','I','K'],ans:'KILL',hint:'... time'},{scrambled:['N','R','A','E'],ans:'EARN',hint:'... money'},{scrambled:['H','C','T','A','C'],ans:'CATCH',hint:'... a train'},{scrambled:['T','S','A','W','E'],ans:'WASTE',hint:'... time / money'} ] }
]);

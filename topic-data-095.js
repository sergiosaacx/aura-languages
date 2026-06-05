/* topic-data-095.js - Juego 95/350 | T14 4/7 WHAT'S HAPPENING? | Reglas ortograficas del -ing (ESPECIALIZADO) | Plata A2 */
_registerGames(95, 'Reglas del -ing', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es el -ing de "sit"?', opts:['siting','sitting','sitng','sittng'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma -ing correcta.',
    sents:[
      { pre:'He is ', ans:'sitting', post:' down.', bank:['sit','sitting','siting','sits'] },
      { pre:'She is ', ans:'coming', post:' home.', bank:['come','coming','comeing','comes'] },
      { pre:'The baby is ', ans:'lying', post:' down.', bank:['lie','lying','lieing','lies'] },
      { pre:'They are ', ans:'making', post:' lunch.', bank:['make','making','makeing','makes'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada -ing es correcto.',
    stmts:[
      { text:'El -ing de "sit" es "sitting".', ans:true, expl:'Correcto. CVC duplica: sitting.' },
      { text:'El -ing de "make" es "makeing".', ans:false, expl:'Falso. Se quita la e: making.' },
      { text:'El -ing de "lie" es "lying".', ans:true, expl:'Correcto. -ie -> -ying: lying.' },
      { text:'El -ing de "come" es "comeing".', ans:false, expl:'Falso. coming (se quita la e).' } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['sitting','He','is','down'],ans:['He','is','sitting','down']},{words:['coming','She','is','home'],ans:['She','is','coming','home']},{words:['making','They','are','lunch'],ans:['They','are','making','lunch']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el -ing mal formado y elige la correccion.',
    sents:[
      { words:['He','is','siting','down','.'], wi:2, correct:'sitting', choices:['sitting','siting','sittng','sit'] },
      { words:['She','is','makeing','dinner','.'], wi:2, correct:'making', choices:['making','makeing','makng','make'] },
      { words:['The','cat','is','lieing','there','.'], wi:3, correct:'lying', choices:['lying','lieing','liing','lie'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el verbo en -ing.',
    words:[ {scrambled:['G','N','I','T','T','I','S'],ans:'SITTING',hint:'-ing de sit'},{scrambled:['G','N','I','M','O','C'],ans:'COMING',hint:'-ing de come'},{scrambled:['G','N','I','Y','L'],ans:'LYING',hint:'-ing de lie'},{scrambled:['I','M','A','K','N','G'],ans:'MAKING',hint:'-ing de make'} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'He is sitting down.', type:'select', opts:['He is sitting down.','He is siting down.','He sitting down.','He is sits down.'], correct:0 },
      { tts:'She is coming home.', type:'select', opts:['She is coming home.','She is comeing home.','She coming home.','She is comes home.'], correct:0 },
      { tts:'They are making lunch.', type:'select', opts:['They are making lunch.','They are makeing lunch.','They making lunch.','They are makes lunch.'], correct:0 } ] }
]);

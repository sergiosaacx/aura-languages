/* topic-data-233.js - Juego 233/350 | T34 2/7 REPORTED ADVANCED | patrones gramaticales (ESPECIALIZADO) | Platino B2 */
_registerGames(233, 'Patrones de Verbos de Reporte', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'He admitted ___ the money. (steal)', opts:['to steal','stealing','steal','stole'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la estructura correcta.',
    sents:[
      { pre:'He admitted ', ans:'stealing', post:' the money.', bank:['stealing','to steal','steal','stole'] },
      { pre:'She denied ', ans:'taking', post:' it.', bank:['taking','to take','take','took'] },
      { pre:'They accused him ', ans:'of lying', post:'.', bank:['of lying','to lie','lying','of to lie'] },
      { pre:'He warned us ', ans:'not to go', post:' there.', bank:['not to go','to not go','not going','no to go'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada verbo con su patron.',
    pairs:[ ['admit','+ -ing'],['deny','+ -ing (gerundio)'],['suggest','+ -ing or that'],['accuse','+ of + -ing'],['warn','+ not to'],['insist','+ on + -ing'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['stealing','He','admitted','the','money'],ans:['He','admitted','stealing','the','money']},{words:['lying','They','accused','him','of'],ans:['They','accused','him','of','lying']},{words:['go','He','warned','us','not','to'],ans:['He','warned','us','not','to','go']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['He','admitted','steal','.'], wi:2, correct:'stealing', choices:['stealing','steal','to steal','stole'] },
      { words:['They','accused','him','for','lying','.'], wi:3, correct:'of', choices:['of','for','to','with'] },
      { words:['He','warned','us','go','there','.'], wi:3, correct:'not to go', choices:['not to go','go','to go','going'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada patron es correcto.',
    stmts:[
      { text:'"admit" va seguido de gerundio (-ing).', ans:true, expl:'Correcto. He admitted stealing.' },
      { text:'"accuse" usa la estructura "accuse + of + -ing".', ans:true, expl:'Correcto. accused him of lying.' },
      { text:'"warn" usa "warn + to + -ing".', ans:false, expl:'Falso. warn + (not) to + infinitivo.' },
      { text:'"insist" usa "insist + on + -ing".', ans:true, expl:'Correcto. insisted on paying.' } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'He admitted stealing the money.', type:'select', opts:['He admitted stealing the money.','He admitted to steal the money.','He admitted steal the money.','He admitted stole the money.'], correct:0 },
      { tts:'They accused him of lying.', type:'select', opts:['They accused him of lying.','They accused him for lying.','They accused him to lie.','They accused him lying.'], correct:0 },
      { tts:'He warned us not to go there.', type:'select', opts:['He warned us not to go there.','He warned us to not go there.','He warned us not going there.','He warned us no to go there.'], correct:0 } ] }
]);

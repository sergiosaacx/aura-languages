/* topic-data-142.js - Juego 142/350 | T21 2/7 STILL GOING | for vs since (ESPECIALIZADO) | Oro B1 */
_registerGames(142, 'For vs Since', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que usas con un punto de inicio (2010)?', opts:['for','since','from','ago'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada expresion con su forma correcta.',
    pairs:[ ['two hours','for two hours'],['2010','since 2010'],['Monday','since Monday'],['three days','for three days'],['this morning','since this morning'],['a week','for a week'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['for','I','have','lived','here','five','years'],ans:['I','have','lived','here','for','five','years']},{words:['since','She','has','worked','here','2015'],ans:['She','has','worked','here','since','2015']},{words:['for','We','have','waited','an','hour'],ans:['We','have','waited','for','an','hour']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['I','have','lived','here','since','five','years','.'], wi:4, correct:'for', choices:['for','since','from','ago'] },
      { words:['She','has','worked','here','for','2015','.'], wi:4, correct:'since', choices:['since','for','from','ago'] },
      { words:['They','have','been','waiting','since','three','hours','.'], wi:4, correct:'for', choices:['for','since','from','ago'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion segun for o since.',
    categories:['for (duracion)','since (inicio)'],
    items:[ {text:'two hours',correct:0},{text:'2010',correct:1},{text:'Monday',correct:1},{text:'a week',correct:0},{text:'this morning',correct:1},{text:'ten minutes',correct:0} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I have lived here for five years.', type:'select', opts:['I have lived here for five years.','I have lived here since five years.','I have lived here from five years.','I have lived here ago five years.'], correct:0 },
      { tts:'She has worked here since 2015.', type:'select', opts:['She has worked here since 2015.','She has worked here for 2015.','She has worked here from 2015.','She has worked here ago 2015.'], correct:0 },
      { tts:'We have been waiting for an hour.', type:'select', opts:['We have been waiting for an hour.','We have been waiting since an hour.','We have been waiting from an hour.','We have been waiting ago an hour.'], correct:0 } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca for o since.',
    sents:[
      { pre:'I have lived here ', ans:'for', post:' ten years.', bank:['for','since','from','ago'] },
      { pre:'She has been here ', ans:'since', post:' Monday.', bank:['for','since','from','ago'] },
      { pre:'We have waited ', ans:'for', post:' two hours.', bank:['for','since','from','ago'] },
      { pre:'They have known each other ', ans:'since', post:' school.', bank:['for','since','from','ago'] } ] }
]);

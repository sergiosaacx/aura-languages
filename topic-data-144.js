/* topic-data-144.js - Juego 144/350 | T21 4/7 STILL GOING | Verbos estativos (ESPECIALIZADO) | Oro B1 */
_registerGames(144, 'Verbos Estativos · Perfecto', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['I have been knowing her for years','I have known her for years','I am knowing her for years','I have been known her'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"I have been knowing her for years." es correcto.', ans:false, expl:'Falso. I have known her.' },
      { text:'"She has been living here since 2010." es correcto.', ans:true, expl:'Correcto. live es de accion.' },
      { text:'"I have liked it for a long time." es correcto.', ans:true, expl:'Correcto. like es estativo.' },
      { text:'"I have been wanting it." es la forma normal.', ans:false, expl:'Falso. I have wanted it.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'I have ', ans:'known', post:' her for years.', bank:['known','been knowing','knowing','know'] },
      { pre:'She has been ', ans:'living', post:' here since 2010.', bank:['living','lived','live','lives'] },
      { pre:'I have ', ans:'loved', post:' music all my life.', bank:['loved','been loving','loving','love'] },
      { pre:'We have been ', ans:'working', post:' for hours.', bank:['working','worked','work','works'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['known','I','have','her','for','years'],ans:['I','have','known','her','for','years']},{words:['living','She','has','been','here'],ans:['She','has','been','living','here']},{words:['loved','I','have','music'],ans:['I','have','loved','music']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['I','have','knowing','her','.'], wi:2, correct:'known', choices:['known','knowing','know','knew'] },
      { words:['I','have','wanting','it','.'], wi:2, correct:'wanted', choices:['wanted','wanting','want','wants'] },
      { words:['She','has','liking','it','.'], wi:2, correct:'liked', choices:['liked','liking','like','likes'] } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I have known her for years.', type:'select', opts:['I have known her for years.','I have been knowing her for years.','I have knowing her for years.','I am knowing her for years.'], correct:0 },
      { tts:'She has been living here since 2010.', type:'select', opts:['She has been living here since 2010.','She has lived been here since 2010.','She has living here since 2010.','She is been living here since 2010.'], correct:0 },
      { tts:'I have wanted this for a long time.', type:'select', opts:['I have wanted this for a long time.','I have been wanting this for a long time.','I have wanting this for a long time.','I am wanting this for a long time.'], correct:0 } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la forma correcta del verbo.',
    transforms:[
      { original:'know her (estativo)', task:'Forma correcta', opts:['I have known her.','I have been knowing her.','I am knowing her.','I have knowing her.'], correct:0 },
      { original:'live here (accion)', task:'Forma correcta', opts:['She has been living here.','She has lived been here.','She has living here.','She is been living here.'], correct:0 },
      { original:'want it (estativo)', task:'Forma correcta', opts:['I have wanted it.','I have been wanting it.','I am wanting it.','I have wanting it.'], correct:0 },
      { original:'work (accion)', task:'Forma correcta', opts:['They have been working.','They have working.','They are been working.','They have been work.'], correct:0 } ] }
]);

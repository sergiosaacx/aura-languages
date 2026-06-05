/* topic-data-292.js - Juego 292/350 | T42 5/7 ADVANCED MODALS | en situaciones de deduccion (MEZCLADO) | Diamante C1 */
_registerGames(292, 'Modales Perfectos · Situaciones de Deduccion', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Debe de haberse ido temprano; su bolso no esta', opts:["She must have left early — her bag isn't here","She must leave early — her bag isn't here","She can't have left early — her bag isn't here","She should have left early"], correct:0 },
      { src:'No deberias haberle dicho eso', opts:["You shouldn't have said that to him","You shouldn't say that to him","You couldn't have said that to him","You wouldn't have said that"], correct:0 },
      { src:'Debe de haber perdido el tren', opts:['He must miss the train','He must have missed the train','He should have missed the train',"He can't have missed the train"], correct:1 },
      { src:'Podrias haber ganado', opts:['You should have won','You could have won','You must have won','You might win'], correct:1 },
      { src:'No puede haberlo sabido', opts:["He can't have known it","He must have known it","He should have known it","He might know it"], correct:0 },
      { src:'Quizas no lo recibieron', opts:["They might not have received it","They must not receive it","They can't receive it","They should receive it"], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"She ___ left early; her bag is gone."', opts:['must have','must','can have','should has'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'She must have ', ans:'left', post:' early.', bank:['left','leave','leaving','leaves'] },
      { pre:"You shouldn't have ", ans:'said', post:' that.', bank:['said','say','saying','says'] },
      { pre:'He must have ', ans:'missed', post:' the train.', bank:['missed','miss','missing','misses'] },
      { pre:"He can't have ", ans:'known', post:' the truth.', bank:['known','know','knew','knowing'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['have','She','must','left','early'],ans:['She','must','have','left','early']},{words:['have','You','should','not','said','that'],ans:['You','should','not','have','said','that']},{words:['have','He','must','missed','it'],ans:['He','must','have','missed','it']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['She','must','left','early','.'], wi:2, correct:'have left', choices:['have left','left','leave','has left'] },
      { words:['He','must','have','miss','the','train','.'], wi:3, correct:'missed', choices:['missed','miss','missing','misses'] },
      { words:['You','should','not','said','that','.'], wi:3, correct:'have said', choices:['have said','said','say','had said'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"She must have left early." es correcto.', ans:true, expl:'Correcto. must have + participio.' },
      { text:'"He must have miss the train." es correcto.', ans:false, expl:'Falso. must have missed.' },
      { text:'"You shouldn\'t have said that." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"She must left early." es correcto.', ans:false, expl:'Falso. must have left.' } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Where is Sara? Her bag is gone.', blank:false },
      { speaker:1, text:null, blank:true, opts:['She must have left early.','She must leave early.','She must left early.','She can have left early.'], correct:0 },
      { speaker:0, text:'He looked upset after my comment.', blank:false },
      { speaker:1, text:null, blank:true, opts:["You shouldn't have said that.","You shouldn't say that.","You couldn't have said that.","You wouldn't say that."], correct:0 },
      { speaker:0, text:'You are right.', blank:false } ] }
]);

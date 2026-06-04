/* topic-data-053.js - Juego 53/350 | T8 4/7 DAILY HABITS | reglas de los 3 temas (MEZCLADO) | Bronce A1 */
_registerGames(53, 'Presente Simple · Reglas Mezcladas', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['Does she likes it?','Does she like it?','Do she like it?','Does she liking it?'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"He doesn\'t work." es correcto.', ans:true, expl:'Correcto. doesn\'t + verbo base.' },
      { text:'"Does she likes it?" es correcto.', ans:false, expl:'Falso. Con does el verbo no lleva -s.' },
      { text:'"They don\'t eat meat." es correcto.', ans:true, expl:"Correcto. don't con they." },
      { text:'"Do he play?" es correcto.', ans:false, expl:'Falso. Con he se usa Does.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'She ', ans:'works', post:' every day.', bank:['work','works','working','worked'] },
      { pre:'They ', ans:"don't", post:' eat meat.', bank:["don't","doesn't","isn't","not"] },
      { pre:'', ans:'Does', post:' he play guitar?', bank:['Do','Does','Is','Are'] },
      { pre:'He ', ans:"doesn't", post:' like tea.', bank:["don't","doesn't","isn't","not"] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:['works','She','every','day'], ans:['She','works','every','day'] },
      { words:["don't",'They','eat','meat'], ans:['They',"don't",'eat','meat'] },
      { words:['Does','play','he','guitar'], ans:['Does','he','play','guitar'] } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She',"don't",'work','.'], wi:1, correct:"doesn't", choices:["doesn't","don't","isn't","not"] },
      { words:['Does','he','works','?'], wi:2, correct:'work', choices:['work','works','working','worked'] },
      { words:['They',"doesn't",'play','.'], wi:1, correct:"don't", choices:["don't","doesn't","isn't","aren't"] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada oracion como correcta o incorrecta.',
    categories:['Correcta','Incorrecta'],
    items:[ {text:'He works here',correct:0},{text:'He work here',correct:1},{text:"They don't eat",correct:0},{text:"They doesn't eat",correct:1},{text:'Does she like it?',correct:0},{text:'Does she likes it?',correct:1} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Does he work here?', blank:false },
      { speaker:1, text:null, blank:true, opts:["No, he doesn't work here.","No, he don't work here.","No, he doesn't works here.","No, he not work here."], correct:0 },
      { speaker:0, text:'Do they eat meat?', blank:false },
      { speaker:1, text:null, blank:true, opts:["No, they don't eat meat.","No, they doesn't eat meat.","No, they don't eats meat.","No, they not eat meat."], correct:0 },
      { speaker:0, text:'I see.', blank:false } ] }
]);

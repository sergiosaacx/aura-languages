/* topic-data-051.js - Juego 51/350 | T8 2/7 DAILY HABITS | don't vs doesn't (ESPECIALIZADO) | Bronce A1 */
_registerGames(51, "Don't vs Doesn't", [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'She ___ like coffee. Que forma negativa va?', opts:["don't","doesn't","isn't","not"], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada sujeto con su forma negativa.',
    pairs:[ ['I',"I don't"],['You',"You don't"],['He',"He doesn't"],['She',"She doesn't"],['We',"We don't"],['They',"They don't"] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:"Toca don't o doesn't segun el sujeto.",
    sents:[
      { pre:'She ', ans:"doesn't", post:' like coffee.', bank:["don't","doesn't","isn't","not"] },
      { pre:'They ', ans:"don't", post:' play football.', bank:["don't","doesn't","isn't","not"] },
      { pre:'He ', ans:"doesn't", post:' work here.', bank:["don't","doesn't","isn't","not"] },
      { pre:'We ', ans:"don't", post:' eat meat.', bank:["don't","doesn't","isn't","not"] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:["doesn't",'She','like','coffee'], ans:['She',"doesn't",'like','coffee'] },
      { words:["don't",'They','eat','meat'], ans:['They',"don't",'eat','meat'] },
      { words:["doesn't",'He','work','here'], ans:['He',"doesn't",'work','here'] } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She',"don't",'like','tea','.'], wi:1, correct:"doesn't", choices:["doesn't","don't","isn't","not"] },
      { words:['They',"doesn't",'play','.'], wi:1, correct:"don't", choices:["don't","doesn't","isn't","aren't"] },
      { words:['He',"don't",'work','.'], wi:1, correct:"doesn't", choices:["doesn't","don't","isn't","not"] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:"Clasifica cada pronombre segun use don't o doesn't.",
    categories:["usa don't","usa doesn't"],
    items:[ {text:'I',correct:0},{text:'you',correct:0},{text:'he',correct:1},{text:'she',correct:1},{text:'it',correct:1},{text:'they',correct:0} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con la forma negativa correcta.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Does she like coffee?', blank:false },
      { speaker:1, text:null, blank:true, opts:["No, she doesn't like coffee.","No, she don't like coffee.","No, she isn't like coffee.","No, she not like coffee."], correct:0 },
      { speaker:0, text:'Do they play football?', blank:false },
      { speaker:1, text:null, blank:true, opts:["No, they don't play football.","No, they doesn't play football.","No, they isn't play football.","No, they not play football."], correct:0 },
      { speaker:0, text:'Okay.', blank:false } ] }
]);

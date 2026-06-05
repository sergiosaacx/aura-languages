/* topic-data-246.js - Juego 246/350 | T36 1/7 REGISTER SHIFT | formal vs informal (ESPECIALIZADO) | Platino B2 */
_registerGames(246, 'Vocabulario Formal vs Informal', [
  { id:'translate', label:'Formal', xp:25, instr:'Elige el equivalente formal.',
    items:[
      { src:'ask (formal)', opts:['enquire','tell','say','speak'], correct:0 },
      { src:'get (formal)', opts:['obtain','take','have','hold'], correct:0 },
      { src:'show (formal)', opts:['demonstrate','see','watch','look'], correct:0 },
      { src:'need (formal)', opts:['require','want','wish','like'], correct:0 },
      { src:'begin (formal)', opts:['commence','open','launch','run'], correct:0 },
      { src:'end (formal)', opts:['conclude','stop','close','finish'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'El equivalente formal de "get" es...', opts:['obtain','take','have','hold'], correct:0 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada palabra informal con su forma formal.',
    pairs:[ ['ask','enquire'],['get','obtain'],['show','demonstrate'],['need','require'],['begin','commence'],['end','conclude'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra formal correcta.',
    sents:[
      { pre:'I would like to ', ans:'enquire', post:' about the position.', bank:['enquire','ask','tell','say'] },
      { pre:'You ', ans:'require', post:' a permit for this.', bank:['require','need','want','wish'] },
      { pre:'The meeting will ', ans:'commence', post:' at noon.', bank:['commence','begin','open','run'] },
      { pre:'The report will ', ans:'demonstrate', post:' the results.', bank:['demonstrate','show','see','watch'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra formal.',
    words:[ {scrambled:['N','I','A','T','B','O'],ans:'OBTAIN',hint:'formal de get'},{scrambled:['E','R','I','U','Q','E','R'],ans:'REQUIRE',hint:'formal de need'},{scrambled:['E','D','U','L','C','N','O','C'],ans:'CONCLUDE',hint:'formal de end'},{scrambled:['E','R','I','U','Q','N','E'],ans:'ENQUIRE',hint:'formal de ask'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada par es correcto.',
    stmts:[
      { text:'"obtain" es la forma formal de "get".', ans:true, expl:'Correcto.' },
      { text:'"commence" es la forma informal de "begin".', ans:false, expl:'Falso. commence es la forma formal.' },
      { text:'"require" es la forma formal de "need".', ans:true, expl:'Correcto.' },
      { text:'"say" es la forma formal de "ask".', ans:false, expl:'Falso. la forma formal es enquire.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada palabra por su registro.',
    categories:['Formal','Informal'],
    items:[ {text:'obtain',correct:0},{text:'get',correct:1},{text:'commence',correct:0},{text:'begin',correct:1},{text:'enquire',correct:0},{text:'ask',correct:1} ] }
]);

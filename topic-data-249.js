/* topic-data-249.js - Juego 249/350 | T36 4/7 REGISTER SHIFT | registro apropiado segun contexto (ESPECIALIZADO) | Platino B2 */
_registerGames(249, 'Registro Apropiado · Segun Contexto', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'En un email formal, cual expresion es apropiada?', opts:['It sounds pretty cool','It appears very promising','It is gonna be great','I wanna know more'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si el registro es apropiado en un texto formal.',
    stmts:[
      { text:'"I would like to enquire about the position." es apropiado en un email formal.', ans:true, expl:'Correcto. registro formal.' },
      { text:'"This is pretty cool." es apropiado en un email formal.', ans:false, expl:'Falso. registro informal.' },
      { text:'"I am writing to request information." es apropiado formalmente.', ans:true, expl:'Correcto.' },
      { text:'"gonna" y "wanna" son apropiados en textos formales.', ans:false, expl:'Falso. son informales.' } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada expresion informal con su version formal.',
    pairs:[ ['pretty cool','very appealing'],['gonna','going to'],['wanna','want to'],['a lot of','a great deal of'],['kids','children'],['get in touch','contact'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la version formal correcta.',
    sents:[
      { pre:'I am ', ans:'going to', post:' attend the meeting.', bank:['going to','gonna','wanna','gotta'] },
      { pre:'I would like to ', ans:'contact', post:' you regarding this.', bank:['contact','get in touch with','reach out to','ping'] },
      { pre:'The proposal is very ', ans:'appealing', post:'.', bank:['appealing','cool','awesome','neat'] },
      { pre:'There were a great ', ans:'deal', post:' of applicants.', bank:['deal','lot','bunch','load'] } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra informal y elige la formal.',
    sents:[
      { words:['It','sounds','pretty','cool','.'], wi:2, correct:'very appealing', choices:['very appealing','pretty','quite','really'] },
      { words:['I','wanna','know','more','.'], wi:1, correct:'would like to', choices:['would like to','wanna','gonna','gotta'] },
      { words:['We','got','good','results','.'], wi:1, correct:'obtained', choices:['obtained','got','made','did'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion por su registro.',
    categories:['Formal','Informal'],
    items:[ {text:'enquire',correct:0},{text:'gonna',correct:1},{text:'contact',correct:0},{text:'wanna',correct:1},{text:'a great deal of',correct:0},{text:'pretty cool',correct:1} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Elige la respuesta de registro apropiado para un contexto formal.', speakers:['Cliente','Empleado'],
    lines:[
      { speaker:0, text:'Could you tell me about the service?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Certainly. I would be happy to assist you.','Sure thing, no worries.','Yeah, gonna explain it.','Cool, lemme tell you.'], correct:0 },
      { speaker:0, text:'And the price?', blank:false },
      { speaker:1, text:null, blank:true, opts:['The cost is approximately 50 dollars.','It is like fifty bucks.','Around fifty, I guess.','Fifty-ish, dunno exactly.'], correct:0 },
      { speaker:0, text:'Thank you.', blank:false } ] }
]);

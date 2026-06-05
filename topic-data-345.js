/* topic-data-345.js - Juego 345/350 | T50 2/7 NATIVE FLUENCY | code-switching (ESPECIALIZADO) | Challenger C2 */
_registerGames(345, 'Cambio de Estilo en Tiempo Real · Code-Switching', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Hablando con tu jefe, cual es mas natural y apropiado?', opts:['Hey, gimme a sec','One moment, please','Hold up','Wait wait wait'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada mensaje con su version segun el interlocutor.',
    pairs:[ ['a un amigo: espera','hang on a sec'],['a un cliente: espera','one moment, please'],['a un amigo: no se','no idea, mate'],['a un jefe: no se','I am not certain, let me check'],['a un amigo: genial','awesome'],['en un informe: genial','highly satisfactory'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la version apropiada al contexto.',
    sents:[
      { pre:'(to a client) ', ans:'One moment, please', post:'.', bank:['One moment, please','Hang on','Gimme a sec','Hold up'] },
      { pre:'(to a friend) ', ans:'Hang on a sec', post:'.', bank:['Hang on a sec','One moment, please','I shall return shortly','Kindly wait'] },
      { pre:'(in a report) The results were ', ans:'highly satisfactory', post:'.', bank:['highly satisfactory','awesome','super cool','pretty great'] },
      { pre:'(to a friend) The party was ', ans:'awesome', post:'.', bank:['awesome','highly satisfactory','most agreeable','quite splendid'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion por su contexto.',
    categories:['Informal (amigo)','Formal (jefe/cliente)'],
    items:[ {text:'gimme a sec',correct:0},{text:'one moment, please',correct:1},{text:'no idea, mate',correct:0},{text:'let me check for you',correct:1},{text:'awesome',correct:0},{text:'highly satisfactory',correct:1} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Adapta el mensaje al nuevo interlocutor.',
    transforms:[
      { original:'"Gimme a sec" -> a un cliente', task:'Formal', opts:['One moment, please.','Gimme a sec.','Hold up.','Wait.'], correct:0 },
      { original:'"I am not certain" -> a un amigo', task:'Informal', opts:['No idea, mate.','I am not certain.','I remain uncertain.','I cannot ascertain.'], correct:0 },
      { original:'"awesome" -> en un informe', task:'Formal', opts:['highly satisfactory','awesome','super cool','epic'], correct:0 },
      { original:'"Kindly wait" -> a un amigo', task:'Informal', opts:['Hang on a sec.','Kindly wait.','Please remain.','Await my return.'], correct:0 } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si el registro es apropiado.',
    stmts:[
      { text:'"One moment, please" es apropiado con un cliente.', ans:true, expl:'Correcto.' },
      { text:'"Gimme a sec" es apropiado en un email a un cliente.', ans:false, expl:'Falso. demasiado informal.' },
      { text:'"highly satisfactory" encaja en un informe.', ans:true, expl:'Correcto.' },
      { text:'"awesome" es ideal para un documento academico.', ans:false, expl:'Falso. es informal.' } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['T','N','E','M','O','M'],ans:'MOMENT',hint:'one ..., please'},{scrambled:['E','M','O','S','E','W','A'],ans:'AWESOME',hint:'informal: genial'},{scrambled:['G','N','A','H'],ans:'HANG',hint:'... on a sec'},{scrambled:['K','C','E','H','C'],ans:'CHECK',hint:'let me ... for you'} ] }
]);

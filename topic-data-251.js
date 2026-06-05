/* topic-data-251.js - Juego 251/350 | T36 6/7 REGISTER SHIFT | transformar informal a formal (MEZCLADO) | Platino B2 */
_registerGames(251, 'Transformar Informal a Formal', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"We need to get more info" en formal usa...', opts:['get / info','obtain / information','grab / data','find / stuff'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra formal correcta.',
    sents:[
      { pre:'We need to ', ans:'obtain', post:' more information regarding this matter.', bank:['obtain','get','grab','pick up'] },
      { pre:'I would like to ', ans:'enquire', post:' about the vacancy.', bank:['enquire','ask','wonder','find out'] },
      { pre:'The project will ', ans:'commence', post:' shortly.', bank:['commence','start','kick off','begin'] },
      { pre:'Please ', ans:'contact', post:' us if you have questions.', bank:['contact','get in touch','reach out','ping'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada palabra informal con su forma formal.',
    pairs:[ ['get','obtain'],['info','information'],['ask','enquire'],['start','commence'],['need','require'],['show','demonstrate'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['obtain','We','need','to','more','information'],ans:['We','need','to','obtain','more','information']},{words:['enquire','I','would','like','to'],ans:['I','would','like','to','enquire']},{words:['commence','The','project','will','soon'],ans:['The','project','will','commence','soon']} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Pasa cada oracion al registro formal.',
    transforms:[
      { original:'We need to get more info.', task:'Formal', opts:['We need to obtain more information.','We gotta grab more info.','We wanna get more data.','We need info now.'], correct:0 },
      { original:'Can I ask about the job?', task:'Formal', opts:['I would like to enquire about the position.','Can I ask about the gig?','Wanna know about the job?','Let me ask about it.'], correct:0 },
      { original:'It starts soon.', task:'Formal', opts:['It will commence shortly.','It kicks off soon.','It is gonna start.','It starts in a bit.'], correct:0 },
      { original:'Show me the results.', task:'Formal', opts:['Please demonstrate the results.','Gimme the results.','Show me the stuff.','Let me see the results.'], correct:0 } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra informal y elige la formal.',
    sents:[
      { words:['We','need','to','get','information','.'], wi:3, correct:'obtain', choices:['obtain','get','grab','pick'] },
      { words:['I','wanna','ask','about','it','.'], wi:1, correct:'would like to', choices:['would like to','wanna','gonna','gotta'] },
      { words:['It','will','start','soon','.'], wi:2, correct:'commence', choices:['commence','start','kick off','begin'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra formal.',
    words:[ {scrambled:['N','I','A','T','B','O'],ans:'OBTAIN',hint:'formal de get'},{scrambled:['N','O','I','T','A','M','R','O','F','N','I'],ans:'INFORMATION',hint:'formal de info'},{scrambled:['E','C','N','E','M','M','O','C'],ans:'COMMENCE',hint:'formal de start'},{scrambled:['E','R','I','U','Q','N','E'],ans:'ENQUIRE',hint:'formal de ask'} ] }
]);

/* topic-data-252.js - Juego 252/350 | T36 7/7 REGISTER SHIFT | registro inconsistente (MEZCLADO) | Platino B2 */
_registerGames(252, 'Registro Inconsistente · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la version de registro consistente y formal.',
    items:[
      { src:'Escribo para preguntar sobre el puesto. Suena muy interesante.', opts:['I am writing to ask about the job. It sounds pretty cool.','I am writing to enquire about the position. It appears very appealing.','Writing to ask about the gig. Sounds cool.','I wanna ask about the job. It is awesome.'], correct:1 },
      { src:'Gracias por su tiempo. Nos vemos.', opts:['Thank you for your time. See ya.','Thank you for your time. I look forward to hearing from you.','Thanks a lot. Catch you later.','Cheers for the time. Bye.'], correct:1 },
      { src:'Adjunto mi CV. Echele un vistazo.', opts:['I attach my CV. Take a look.','Please find my CV attached for your consideration.','Here is my CV. Check it out.','My CV is attached. Have a peek.'], correct:1 },
      { src:'Obtuvimos buenos resultados.', opts:['We got good results.','We obtained positive results.','We grabbed good results.','We picked up good results.'], correct:1 },
      { src:'Quisiera solicitar una reunion.', opts:['I wanna set up a meeting.','I would like to request a meeting.','Lemme get a meeting.','Can we meet up?'], correct:1 },
      { src:'El informe demuestra los hallazgos.', opts:['The report shows the stuff.','The report demonstrates the findings.','The report shows the things.','The report tells the findings.'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'En un email formal, "It sounds pretty cool" deberia ser...', opts:['It sounds awesome','It appears very appealing','It is super cool','It seems neat'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada expresion informal con su correccion formal.',
    pairs:[ ['pretty cool','very appealing'],['see ya','look forward to hearing from you'],['take a look','find attached'],['got results','obtained results'],['wanna','would like to'],['check it out','consider it'] ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra de registro incorrecto y elige la formal.',
    sents:[
      { words:['It','sounds','pretty','cool','.'], wi:3, correct:'appealing', choices:['appealing','cool','awesome','neat'] },
      { words:['We','got','good','results','.'], wi:1, correct:'obtained', choices:['obtained','got','grabbed','picked'] },
      { words:['I','wanna','request','a','meeting','.'], wi:1, correct:'would like to', choices:['would like to','wanna','gonna','gotta'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion por su registro.',
    categories:['Apropiado (formal)','Inapropiado (informal)'],
    items:[ {text:'I look forward to hearing from you',correct:0},{text:'see ya',correct:1},{text:'please find attached',correct:0},{text:'check it out',correct:1},{text:'obtained results',correct:0},{text:'got results',correct:1} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si el registro es consistente y formal.',
    stmts:[
      { text:'"I am writing to enquire about the position." es formal.', ans:true, expl:'Correcto.' },
      { text:'"It sounds pretty cool." es apropiado en un email formal.', ans:false, expl:'Falso. usa very appealing.' },
      { text:'"Please find my CV attached." es formal.', ans:true, expl:'Correcto.' },
      { text:'"See ya" es apropiado para cerrar un email formal.', ans:false, expl:'Falso. usa I look forward to hearing from you.' } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Elige la respuesta de registro formal consistente.', speakers:['Reclutador','Candidato'],
    lines:[
      { speaker:0, text:'Why are you interested in this role?', blank:false },
      { speaker:1, text:null, blank:true, opts:['The position appears very appealing and aligns with my goals.','It sounds pretty cool and stuff.','It is awesome, I wanna do it.','It seems neat, I guess.'], correct:0 },
      { speaker:0, text:'When can you start?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I would be able to commence immediately.','I can kick off right away.','I am gonna start now.','I can jump in whenever.'], correct:0 },
      { speaker:0, text:'Excellent.', blank:false } ] }
]);

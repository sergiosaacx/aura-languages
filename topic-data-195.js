/* topic-data-195.js - Juego 195/350 | T28 6/7 PHRASAL VERBS I | en conversaciones cotidianas (MEZCLADO) | Oro B1 */
_registerGames(195, 'Phrasal Verbs · Conversaciones', [
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el phrasal verb correcto segun el contexto.',
    sents:[
      { pre:'I need to ', ans:'find out', post:' about the course.', bank:['find out','give up','turn off','run out'] },
      { pre:'Do not ', ans:'give up', post:'! You are almost there.', bank:['give up','pick up','turn on','look up'] },
      { pre:'We ', ans:'ran out of', post:' coffee this morning.', bank:['ran out of','gave up','looked up','set up'] },
      { pre:'Can you ', ans:'pick up', post:' some bread on your way?', bank:['pick up','give up','find out','break down'] } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Do not give up!" anima a la persona a...', opts:['parar','seguir intentando','apagar algo','buscar algo'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada situacion con su phrasal verb.',
    pairs:[ ['buscar informacion','find out'],['no rendirse','dont give up'],['quedarse sin algo','run out of'],['recoger algo','pick up'],['posponer','put off'],['establecer','set up'] ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'I cannot solve this problem.', blank:false },
      { speaker:1, text:null, blank:true, opts:['Do not give up! Keep trying.','Do not turn off! Keep trying.','Do not look up! Keep trying.','Do not run out! Keep trying.'], correct:0 },
      { speaker:0, text:'We have no milk.', blank:false },
      { speaker:1, text:null, blank:true, opts:['We ran out of it again.','We gave up it again.','We looked up it again.','We set up it again.'], correct:0 },
      { speaker:0, text:'I will buy some.', blank:false } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada uso es correcto.',
    stmts:[
      { text:'"I need to find out the price." es correcto.', ans:true, expl:'Correcto. find out = averiguar.' },
      { text:'"Do not give up." anima a seguir.', ans:true, expl:'Correcto.' },
      { text:'"We ran out of time" significa que sobra tiempo.', ans:false, expl:'Falso. significa que se acabo el tiempo.' },
      { text:'"Put off the meeting" significa posponerla.', ans:true, expl:'Correcto.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el phrasal verb que encaja.',
    transforms:[
      { original:'averiguar la verdad', task:'phrasal', opts:['find out the truth','give up the truth','turn off the truth','run out the truth'], correct:0 },
      { original:'posponer la reunion', task:'phrasal', opts:['put off the meeting','pick up the meeting','give up the meeting','look up the meeting'], correct:0 },
      { original:'recoger a un amigo', task:'phrasal', opts:['pick up a friend','give up a friend','turn off a friend','run out a friend'], correct:0 },
      { original:'montar una empresa', task:'phrasal', opts:['set up a company','give up a company','turn off a company','run out a company'], correct:0 } ] },
  { id:'scramble', label:'Descifra el phrasal', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['D','N','I','F'],ans:'FIND',hint:'... out (averiguar)'},{scrambled:['E','V','I','G'],ans:'GIVE',hint:'... up (rendirse)'},{scrambled:['K','C','I','P'],ans:'PICK',hint:'... up (recoger)'},{scrambled:['T','E','S'],ans:'SET',hint:'... up (establecer)'} ] }
]);

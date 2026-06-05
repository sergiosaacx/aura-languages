/* topic-data-277.js - Juego 277/350 | T40 4/7 SUBJUNCTIVE | it's time + subjuntivo pasado (ESPECIALIZADO) | Diamante C1 */
_registerGames(277, "It's Time + Subjuntivo Pasado", [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Es hora de que te vayas a la cama', opts:["It's time you go to bed","It's time you went to bed","It's time you will go to bed","It's time you have gone to bed"], correct:1 },
      { src:'Ya es hora de que tomemos una decision', opts:["It's high time we make a decision","It's high time we made a decision","It's high time we will make a decision","It's high time we have made a decision"], correct:1 },
      { src:'Es hora de que ella se vaya', opts:["It's time she leaves","It's time she left","It's time she will leave","It's time she has left"], correct:1 },
      { src:'Ya es hora de que estudies', opts:["It's high time you study","It's high time you studied","It's high time you will study","It's high time you have studied"], correct:1 },
      { src:'Es hora de que paguen', opts:["It's time they pay","It's time they paid","It's time they will pay","It's time they have paid"], correct:1 },
      { src:'Ya es hora de que crezcas', opts:["It's high time you grow up","It's high time you grew up","It's high time you will grow up","It's high time you have grown up"], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Despues de "It\'s time" se usa...', opts:['presente simple','pasado simple (subjuntivo)','futuro','presente perfecto'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:"It's time you ", ans:'went', post:' to bed.', bank:['went','go','will go','have gone'] },
      { pre:"It's high time we ", ans:'made', post:' a decision.', bank:['made','make','will make','have made'] },
      { pre:"It's time she ", ans:'left', post:'.', bank:['left','leaves','will leave','has left'] },
      { pre:"It's high time you ", ans:'studied', post:' harder.', bank:['studied','study','will study','have studied'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:"\"It's time we made a decision.\" es correcto.", ans:true, expl:'Correcto. pasado subjuntivo.' },
      { text:"\"It's high time she leaves.\" es correcto.", ans:false, expl:"Falso. It's high time she left." },
      { text:"\"It's time you went to bed.\" es correcto.", ans:true, expl:'Correcto.' },
      { text:"\"It's time they pay.\" es correcto.", ans:false, expl:"Falso. It's time they paid." } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['went','It','is','time','you','to','bed'],ans:['It','is','time','you','went','to','bed']},{words:['made','It','is','high','time','we','a','decision'],ans:['It','is','high','time','we','made','a','decision']},{words:['left','It','is','time','she'],ans:['It','is','time','she','left']} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion con "It\'s time".',
    transforms:[
      { original:'you go to bed', task:"It's time", opts:["It's time you went to bed.","It's time you go to bed.","It's time you will go to bed.","It's time you have gone to bed."], correct:0 },
      { original:'we make a decision', task:"It's high time", opts:["It's high time we made a decision.","It's high time we make a decision.","It's high time we will make a decision.","It's high time we have made a decision."], correct:0 },
      { original:'she leaves', task:"It's time", opts:["It's time she left.","It's time she leaves.","It's time she will leave.","It's time she has left."], correct:0 },
      { original:'you study harder', task:"It's high time", opts:["It's high time you studied harder.","It's high time you study harder.","It's high time you will study harder.","It's high time you have studied harder."], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el verbo en pasado.',
    words:[ {scrambled:['T','N','E','W'],ans:'WENT',hint:'it is time you ... to bed'},{scrambled:['E','D','A','M'],ans:'MADE',hint:'it is high time we ... a decision'},{scrambled:['T','F','E','L'],ans:'LEFT',hint:'it is time she ...'},{scrambled:['D','I','A','P'],ans:'PAID',hint:'it is time they ...'} ] }
]);

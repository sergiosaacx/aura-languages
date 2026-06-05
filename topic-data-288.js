/* topic-data-288.js - Juego 288/350 | T42 1/7 ADVANCED MODALS | modales perfectos deduccion (ESPECIALIZADO) | Diamante C1 */
_registerGames(288, 'Modales Perfectos · Deduccion sobre el Pasado', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el modal perfecto correcto.',
    items:[
      { src:'Debe de haber olvidado la reunion', opts:['He must forget the meeting','He must have forgotten the meeting','He might forget the meeting','He can have forgotten the meeting'], correct:1 },
      { src:'No puede haber sabido la verdad', opts:["He can't know the truth","He can't have known the truth","He must have known the truth","He might know the truth"], correct:1 },
      { src:'Quizas se fue temprano', opts:['She might leave early','She might have left early','She must have left early','She cannot have left early'], correct:1 },
      { src:'Deben de haber llegado ya', opts:['They must arrive already','They must have arrived already','They might arrive already','They cannot have arrived'], correct:1 },
      { src:'No puede haberlo hecho ella', opts:['She cannot do it','She cannot have done it','She must have done it','She might do it'], correct:1 },
      { src:'Quizas no lo vio', opts:["He might not see it","He might not have seen it","He must not see it","He cannot see it"], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Para una deduccion casi segura sobre el pasado se usa...', opts:["can't have + PP","must have + PP","might have + PP","would have + PP"], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada modal perfecto con su grado de certeza.',
    pairs:[ ['must have','casi seguro'],["can't have",'imposible'],['might have','quizas'],['could have','posible'],['may have','posible (formal)'],['should have','lo esperado'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el modal perfecto correcto.',
    sents:[
      { pre:'Her phone is off. She ', ans:'must have', post:' forgotten.', bank:['must have','can have','will have','should has'] },
      { pre:'He was at work. He ', ans:"can't have", post:' been at the party.', bank:["can't have",'must have','might have','should have'] },
      { pre:'I am not sure, but she ', ans:'might have', post:' left.', bank:['might have','must have',"can't have",'will have'] },
      { pre:'The food is gone. They ', ans:'must have', post:' eaten it.', bank:['must have',"can't have",'might not have','would have'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el participio o palabra.',
    words:[ {scrambled:['N','E','T','T','O','G','R','O','F'],ans:'FORGOTTEN',hint:'must have ...'},{scrambled:['N','W','O','N','K'],ans:'KNOWN',hint:"can't have ..."},{scrambled:['E','V','A','H'],ans:'HAVE',hint:'must ... + participio'},{scrambled:['T','S','U','M'],ans:'MUST',hint:'... have (casi seguro)'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada deduccion es correcta.',
    stmts:[
      { text:'"He must have forgotten." expresa una deduccion casi segura.', ans:true, expl:'Correcto.' },
      { text:'"can\'t have + PP" expresa certeza positiva.', ans:false, expl:'Falso. expresa imposibilidad.' },
      { text:'"might have + PP" expresa posibilidad.', ans:true, expl:'Correcto.' },
      { text:'"must have" se usa cuando algo es imposible.', ans:false, expl:'Falso. para algo casi seguro.' } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Why is she not answering?', blank:false },
      { speaker:1, text:null, blank:true, opts:['She must have forgotten her phone.','She must forget her phone.','She can have forgotten her phone.','She should has forgotten her phone.'], correct:0 },
      { speaker:0, text:'Could he have been at the party?', blank:false },
      { speaker:1, text:null, blank:true, opts:["No, he can't have been there; he was at work.","No, he must have been there.","No, he might be there.","No, he can be there."], correct:0 },
      { speaker:0, text:'I see.', blank:false } ] }
]);

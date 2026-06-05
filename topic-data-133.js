/* topic-data-133.js - Juego 133/350 | T19 7/7 IF YOU... | errores tipicos (MEZCLADO) | Plata A2 */
_registerGames(133, 'Condicionales · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Si llueve, me quedare en casa', opts:["If it will rain, I'll stay home","If it rains, I'll stay home","If it rained, I'll stay home","If it rains, I'd stay home"], correct:1 },
      { src:'A menos que te apures, llegaras tarde', opts:["Unless you don't hurry, you'll be late","Unless you hurry, you'll be late","Unless you hurry, you'd be late","If you hurry, you'll be late"], correct:1 },
      { src:'Si ella estudia, aprobara', opts:['If she studies, she would pass','If she studies, she will pass','If she will study, she pass','If she studied, she will pass'], correct:1 },
      { src:'Si calientas hielo, se derrite', opts:['If you heat ice, it will melt','If you heat ice, it melts','If you will heat ice, it melts','If you heated ice, it melts'], correct:1 },
      { src:'Te ayudare si me lo pides', opts:["I'll help you if you'll ask","I'll help you if you ask","I help you if you ask","I'd help you if you ask"], correct:1 },
      { src:'A menos que estudies, fallaras', opts:["Unless you don't study, you'll fail","Unless you study, you'll fail","Unless you study, you'd fail","If you study, you'll fail"], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto (para el futuro)?', opts:['If it will rain','If it rains','If it would rain','If it rained tomorrow'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['If it will rain','If it rains'],["Unless you don't hurry","Unless you hurry"],['If she studies, she would pass','If she studies, she will pass'],['if you will ask','if you ask'],['If it will be sunny','If it is sunny'],["Unless you don't study","Unless you study"] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['rains','If','it','I','will','stay'],ans:['If','it','rains','I','will','stay']},{words:['hurry','Unless','you','will','be','you','late'],ans:['Unless','you','hurry','you','will','be','late']},{words:['studies','If','she','she','will','pass'],ans:['If','she','studies','she','will','pass']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['If','it','rain','I','will','stay','.'], wi:2, correct:'rains', choices:['rains','rain','will rain','rained'] },
      { words:['If','she','studies','she','would','pass','.'], wi:4, correct:'will', choices:['will','would','can','must'] },
      { words:['I','will','help','if','you','asks','.'], wi:5, correct:'ask', choices:['ask','asks','will ask','asked'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['S','N','I','A','R'],ans:'RAINS',hint:'corrige if it will rain'},{scrambled:['L','I','W','L'],ans:'WILL',hint:'corrige would en cond 1'},{scrambled:['S','E','L','N','U','S'],ans:'UNLESS',hint:'si no'},{scrambled:['Y','R','R','U','H'],ans:'HURRY',hint:'unless you ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'No se usa "will" en la clausula if del cond. 1.', ans:true, expl:'Correcto. If it rains (no If it will rain).' },
      { text:'"Unless you don\'t study" es correcto.', ans:false, expl:'Falso. Unless you study.' },
      { text:'En el cond. 1 se usa "will", no "would".', ans:true, expl:'Correcto. she will pass.' },
      { text:'"If it will rain, I will stay." es correcto.', ans:false, expl:'Falso. If it rains.' } ] }
]);

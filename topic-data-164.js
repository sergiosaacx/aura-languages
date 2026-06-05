/* topic-data-164.js - Juego 164/350 | T24 3/7 IF I HAD | Cond 1 vs Cond 2 (ESPECIALIZADO) | Oro B1 */
_registerGames(164, 'Condicional 1 vs Condicional 2', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta segun el tipo.',
    items:[
      { src:'posible: si estudio, aprobare', opts:['If I study, I will pass','If I studied, I would pass','If I will study, I pass','If I would study, I pass'], correct:0 },
      { src:'imaginario: si fuera rico, viajaria', opts:['If I am rich, I will travel','If I were rich, I would travel','If I were rich, I will travel','If I would be rich, I travel'], correct:1 },
      { src:'posible: si llueve, me quedo', opts:['If it rains, I will stay','If it rained, I would stay','If it will rain, I stay','If it would rain, I stay'], correct:0 },
      { src:'imaginario: si tuviera alas, volaria', opts:['If I have wings, I will fly','If I had wings, I would fly','If I had wings, I will fly','If I would have wings, I fly'], correct:1 },
      { src:'posible: si me llamas, vendre', opts:['If you call me, I will come','If you called me, I would come','If you will call me, I come','If you would call me, I come'], correct:0 },
      { src:'imaginario: si pudiera, lo haria', opts:['If I can, I will do it','If I could, I would do it','If I could, I will do it','If I would can, I do it'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada situacion con su tipo.',
    pairs:[ ['si estudio, aprobare','First (posible)'],['si fuera rico','Second (imaginario)'],['si llueve, me quedo','First (real)'],['si tuviera alas','Second (irreal)'],['si me llamas, vendre','First (futuro)'],['si pudiera','Second (hipotetico)'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['L','I','W','L'],ans:'WILL',hint:'condicional 1'},{scrambled:['D','L','U','O','W'],ans:'WOULD',hint:'condicional 2'},{scrambled:['D','A','H'],ans:'HAD',hint:'if I ... (cond 2)'},{scrambled:['E','V','A','H'],ans:'HAVE',hint:'if I ... (cond 1)'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'El condicional 1 describe situaciones posibles en el futuro.', ans:true, expl:'Correcto. If I study, I will pass.' },
      { text:'El condicional 2 describe situaciones reales y probables.', ans:false, expl:'Falso. El 2 es imaginario.' },
      { text:'"If I were a bird, I would fly." es condicional 2.', ans:true, expl:'Correcto. imaginario.' },
      { text:'"If it rains, I would stay home." es correcto.', ans:false, expl:'Falso. If it rains, I will stay.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el condicional correcto.',
    transforms:[
      { original:'posible: study / pass', task:'Cond. 1 o 2', opts:['If I study, I will pass.','If I studied, I would pass.','If I will study, I pass.','If I would study, I pass.'], correct:0 },
      { original:'imaginario: be rich / travel', task:'Cond. 1 o 2', opts:['If I were rich, I would travel.','If I am rich, I will travel.','If I were rich, I will travel.','If I would be rich, I travel.'], correct:0 },
      { original:'posible: rain / stay', task:'Cond. 1 o 2', opts:['If it rains, I will stay.','If it rained, I would stay.','If it will rain, I stay.','If it would rain, I stay.'], correct:0 },
      { original:'imaginario: have wings / fly', task:'Cond. 1 o 2', opts:['If I had wings, I would fly.','If I have wings, I will fly.','If I had wings, I will fly.','If I would have wings, I fly.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What will you do if it rains tomorrow?', blank:false },
      { speaker:1, text:null, blank:true, opts:['If it rains, I will stay home.','If it rained, I would stay home.','If it will rain, I stay home.','If it would rain, I stay home.'], correct:0 },
      { speaker:0, text:'What would you do if you were a millionaire?', blank:false },
      { speaker:1, text:null, blank:true, opts:['If I were a millionaire, I would help people.','If I am a millionaire, I will help people.','If I were a millionaire, I will help people.','If I would be a millionaire, I help people.'], correct:0 },
      { speaker:0, text:'Generous!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada oracion como condicional 1 o 2.',
    categories:['Condicional 1 (real)','Condicional 2 (irreal)'],
    items:[ {text:'If I study I will pass',correct:0},{text:'If I were rich I would travel',correct:1},{text:'If it rains I will stay',correct:0},{text:'If I had wings I would fly',correct:1},{text:'If you call I will come',correct:0},{text:'If I could I would help',correct:1} ] }
]);

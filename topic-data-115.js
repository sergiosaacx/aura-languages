/* topic-data-115.js - Juego 115/350 | T17 3/7 COMPARE THE WORLD | Comparativos irregulares (ESPECIALIZADO) | Plata A2 */
_registerGames(115, 'Comparativos Irregulares', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma irregular correcta.',
    items:[
      { src:'good (comparativo)', opts:['gooder','better','more good','best'], correct:1 },
      { src:'bad (comparativo)', opts:['badder','worse','more bad','worst'], correct:1 },
      { src:'good (superlativo)', opts:['the goodest','the best','the most good','the better'], correct:1 },
      { src:'bad (superlativo)', opts:['the baddest','the worst','the most bad','the worse'], correct:1 },
      { src:'far (comparativo)', opts:['farer','farther','more far','farthest'], correct:1 },
      { src:'little (comparativo)', opts:['littler','less','more little','least'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada base con su comparativo o superlativo.',
    pairs:[ ['good','better'],['bad','worse'],['far','farther'],['little','less'],['good (super)','best'],['bad (super)','worst'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la forma irregular.',
    words:[ {scrambled:['R','E','T','T','E','B'],ans:'BETTER',hint:'comparativo de good'},{scrambled:['E','S','R','O','W'],ans:'WORSE',hint:'comparativo de bad'},{scrambled:['T','S','E','B'],ans:'BEST',hint:'superlativo de good'},{scrambled:['T','S','R','O','W'],ans:'WORST',hint:'superlativo de bad'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada forma es correcta.',
    stmts:[
      { text:'El comparativo de "good" es "better".', ans:true, expl:'Correcto. good-better-best.' },
      { text:'El comparativo de "bad" es "more bad".', ans:false, expl:'Falso. bad -> worse.' },
      { text:'El superlativo de "good" es "the best".', ans:true, expl:'Correcto.' },
      { text:'El comparativo de "good" es "gooder".', ans:false, expl:'Falso. better.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Escribe la forma pedida.',
    transforms:[
      { original:'good', task:'Comparativo', opts:['better','gooder','more good','best'], correct:0 },
      { original:'bad', task:'Comparativo', opts:['worse','badder','more bad','worst'], correct:0 },
      { original:'good', task:'Superlativo', opts:['the best','the goodest','the most good','the better'], correct:0 },
      { original:'bad', task:'Superlativo', opts:['the worst','the baddest','the most bad','the worse'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'How is your English now?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It is better than before.','It is gooder than before.','It is more good than before.','It is best than before.'], correct:0 },
      { speaker:0, text:'Was the weather bad?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, it was the worst day.','Yes, it was the baddest day.','Yes, it was the most bad day.','Yes, it was the worse day.'], correct:0 },
      { speaker:0, text:'Oh no!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada forma como comparativo o superlativo.',
    categories:['Comparativo','Superlativo'],
    items:[ {text:'better',correct:0},{text:'best',correct:1},{text:'worse',correct:0},{text:'worst',correct:1},{text:'less',correct:0},{text:'least',correct:1} ] }
]);

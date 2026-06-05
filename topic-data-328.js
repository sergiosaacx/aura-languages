/* topic-data-328.js - Juego 328/350 | T47 6/7 IDIOMATIC MASTERY | completar modismos (MEZCLADO) | Challenger C2 */
_registerGames(328, 'Completar Modismos con la Palabra Correcta', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Do not put all your ___ in one basket."', opts:['eggs','fruit','apples','coins'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra exacta del modismo.',
    sents:[
      { pre:'Do not put all your ', ans:'eggs', post:' in one basket.', bank:['eggs','fruit','apples','coins'] },
      { pre:'The grass is always greener on the other ', ans:'side', post:'.', bank:['side','field','garden','place'] },
      { pre:'Actions speak louder than ', ans:'words', post:'.', bank:['words','speech','silence','noise'] },
      { pre:'A bird in the hand is worth two in the ', ans:'bush', post:'.', bank:['bush','tree','sky','nest'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada modismo incompleto con su palabra clave.',
    pairs:[ ['all your ... in one basket','eggs'],['the grass is always ...','greener'],['louder than ...','words'],['a bird in the ...','hand'],['kill two birds with one ...','stone'],['the early bird catches the ...','worm'] ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la palabra es la convencional.',
    stmts:[
      { text:'"Do not put all your eggs in one basket" usa "eggs".', ans:true, expl:'Correcto.' },
      { text:'"The grass is always taller on the other side." es la forma correcta.', ans:false, expl:'Falso. greener.' },
      { text:'"Actions speak louder than words." usa "words".', ans:true, expl:'Correcto.' },
      { text:'"Kill two birds with one rock." es la forma convencional.', ans:false, expl:'Falso. with one stone.' } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['all','your','apples','in','one','basket','.'], wi:2, correct:'eggs', choices:['eggs','apples','fruit','coins'] },
      { words:['the','grass','is','always','taller','.'], wi:4, correct:'greener', choices:['greener','taller','wetter','softer'] },
      { words:['kill','two','birds','with','one','rock','.'], wi:5, correct:'stone', choices:['stone','rock','brick','ball'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra del modismo.',
    words:[ {scrambled:['S','G','G','E'],ans:'EGGS',hint:'all your ... in one basket'},{scrambled:['R','E','N','E','E','R','G'],ans:'GREENER',hint:'the grass is always ...'},{scrambled:['E','N','O','T','S'],ans:'STONE',hint:'two birds with one ...'},{scrambled:['M','R','O','W'],ans:'WORM',hint:'the early bird catches the ...'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada modismo por su tema.',
    categories:['Riesgo / Prudencia','Esfuerzo / Oportunidad'],
    items:[ {text:'all eggs in one basket',correct:0},{text:'the early bird catches the worm',correct:1},{text:'a bird in the hand',correct:0},{text:'kill two birds with one stone',correct:1},{text:'do not count your chickens',correct:0},{text:'strike while the iron is hot',correct:1} ] }
]);

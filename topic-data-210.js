/* topic-data-210.js - Juego 210/350 | T30 7/7 WORD BUILDER | errores formacion de palabras (MEZCLADO) | Oro B1 */
_registerGames(210, 'Formacion de Palabras · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Ella es muy cuidadosa con su trabajo', opts:['She is very care about her work','She is very careful about her work','She is very careless about her work','She is very carely about her work'], correct:1 },
      { src:'La informacion estaba mal', opts:['The informate was wrong','The information was wrong','The informative was wrong','The inform was wrong'], correct:1 },
      { src:'No tuvo exito en sus intentos', opts:['He was very unsuccess','He was very unsuccessful','He was very success','He was very successless'], correct:1 },
      { src:'Hablo claramente', opts:['She spoke clear','She spoke clearly','She spoke clearness','She spoke clearful'], correct:1 },
      { src:'Su felicidad era evidente', opts:['Her happy was clear','Her happiness was clear','Her happily was clear','Her happyness was clear'], correct:1 },
      { src:'Es imposible', opts:['It is unpossible','It is impossible','It is dispossible','It is nonpossible'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['very care','very careful','very carely','very careness'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['very care','careful'],['informate','information'],['unsuccess','unsuccessful'],['spoke clear','spoke clearly'],['her happy','her happiness'],['unpossible','impossible'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['careful','She','is','very'],ans:['She','is','very','careful']},{words:['information','The','was','wrong'],ans:['The','information','was','wrong']},{words:['clearly','He','spoke'],ans:['He','spoke','clearly']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra mal formada y elige la correccion.',
    sents:[
      { words:['She','is','very','care','.'], wi:3, correct:'careful', choices:['careful','care','carely','careness'] },
      { words:['The','informate','was','wrong','.'], wi:1, correct:'information', choices:['information','informate','informative','inform'] },
      { words:['He','was','very','unsuccess','.'], wi:3, correct:'unsuccessful', choices:['unsuccessful','unsuccess','success','successless'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['L','U','F','E','R','A','C'],ans:'CAREFUL',hint:'corrige care'},{scrambled:['N','O','I','T','A','M','R','O','F','N','I'],ans:'INFORMATION',hint:'corrige informate'},{scrambled:['Y','L','R','A','E','L','C'],ans:'CLEARLY',hint:'corrige clear'},{scrambled:['S','S','E','N','I','P','P','A','H'],ans:'HAPPINESS',hint:'corrige happy'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"She is very careful." es correcto.', ans:true, expl:'Correcto. adjetivo careful.' },
      { text:'"The informate was wrong." es correcto.', ans:false, expl:'Falso. The information was wrong.' },
      { text:'"He spoke clearly." usa el adverbio correcto.', ans:true, expl:'Correcto.' },
      { text:'"He was very unsuccess." es correcto.', ans:false, expl:'Falso. unsuccessful.' } ] }
]);

/* topic-data-136.js - Juego 136/350 | T20 3/7 TELL ME MORE | Conectores funcion logica (ESPECIALIZADO) | Plata A2 */
_registerGames(136, 'Conectores · Funcion Logica', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el conector para cada funcion.',
    items:[
      { src:'adicion (y)', opts:['but','and','because','so'], correct:1 },
      { src:'contraste (pero)', opts:['and','but','because','so'], correct:1 },
      { src:'causa (porque)', opts:['so','but','because','and'], correct:2 },
      { src:'resultado (por eso)', opts:['because','but','so','and'], correct:2 },
      { src:'concesion (aunque)', opts:['although','but','so','because'], correct:0 },
      { src:'alternativa (o)', opts:['and','or','but','so'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada conector con su funcion.',
    pairs:[ ['and','adicion'],['but','contraste'],['because','causa'],['so','resultado'],['although','concesion'],['or','alternativa'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el conector.',
    words:[ {scrambled:['D','N','A'],ans:'AND',hint:'adicion'},{scrambled:['T','U','B'],ans:'BUT',hint:'contraste'},{scrambled:['O','S'],ans:'SO',hint:'resultado'},{scrambled:['U','A','S','E','B','C','E'],ans:'BECAUSE',hint:'causa'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada funcion es correcta.',
    stmts:[
      { text:'"because" introduce una causa.', ans:true, expl:'Correcto. ... because it rained.' },
      { text:'"so" introduce un contraste.', ans:false, expl:'Falso. so = resultado.' },
      { text:'"although" introduce una concesion (aunque).', ans:true, expl:'Correcto.' },
      { text:'"and" introduce un contraste.', ans:false, expl:'Falso. and = adicion.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el conector de cada funcion.',
    transforms:[
      { original:'causa', task:'Conector', opts:['because','but','so','and'], correct:0 },
      { original:'resultado', task:'Conector', opts:['so','because','but','and'], correct:0 },
      { original:'contraste', task:'Conector', opts:['but','so','because','and'], correct:0 },
      { original:'concesion', task:'Conector', opts:['although','but','so','because'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con el conector correcto.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Why did you stay home?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I stayed home because it rained.','I stayed home so it rained.','I stayed home but it rained.','I stayed home and it rained.'], correct:0 },
      { speaker:0, text:'Did you like the film?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It was long but interesting.','It was long so interesting.','It was long because interesting.','It was long and so interesting not.'], correct:0 },
      { speaker:0, text:'Nice.', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada conector segun su funcion.',
    categories:['Adicion','Causa/Resultado','Contraste'],
    items:[ {text:'and',correct:0},{text:'or',correct:0},{text:'because',correct:1},{text:'so',correct:1},{text:'but',correct:2},{text:'although',correct:2} ] }
]);

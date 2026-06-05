/* topic-data-119.js - Juego 119/350 | T17 7/7 COMPARE THE WORLD | errores tipicos (MEZCLADO) | Plata A2 */
_registerGames(119, 'Comparativos y Superlativos · Errores', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Ella es mas alta que yo', opts:['She is more taller than me','She is taller than me','She is more tall than me','She is tallest than me'], correct:1 },
      { src:'El es el mejor jugador', opts:['He is the most best player','He is the best player','He is the better player','He is best player'], correct:1 },
      { src:'Esta es la peor pelicula', opts:['This is the most bad film','This is the worst film','This is the baddest film','This is the worse film'], correct:1 },
      { src:'Es mas grande que el mio', opts:['It is more bigger than mine','It is bigger than mine','It is more big than mine','It is biggest than mine'], correct:1 },
      { src:'Ella es la mas inteligente', opts:['She is the most intelligent','She is the intelligentest','She is more intelligent','She is intelligentest'], correct:0 },
      { src:'Es mejor que antes', opts:['It is more better than before','It is better than before','It is gooder than before','It is best than before'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['more taller','taller','most tall','tallerer'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['more taller','much taller'],['the most best','the best'],['the most bad','the worst'],['more bigger','bigger'],['more better','better'],['the intelligentest','the most intelligent'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['than','She','is','taller','me'],ans:['She','is','taller','than','me']},{words:['the','He','is','best','player'],ans:['He','is','the','best','player']},{words:['the','This','is','worst','film'],ans:['This','is','the','worst','film']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She','is','more','taller','than','me','.'], wi:2, correct:'much', choices:['much','more','most','very'] },
      { words:['He','is','the','goodest','player','.'], wi:3, correct:'best', choices:['best','goodest','better','most good'] },
      { words:['This','is','the','baddest','film','.'], wi:3, correct:'worst', choices:['worst','baddest','worse','most bad'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['R','E','L','L','A','T'],ans:'TALLER',hint:'corrige more taller'},{scrambled:['T','S','E','B'],ans:'BEST',hint:'corrige most best'},{scrambled:['T','S','R','O','W'],ans:'WORST',hint:'corrige most bad'},{scrambled:['R','E','T','T','E','B'],ans:'BETTER',hint:'corrige more better'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'No se usa doble comparativo: "more taller".', ans:true, expl:'Correcto. Solo taller.' },
      { text:'"the most best" es correcto.', ans:false, expl:'Falso. the best.' },
      { text:'El superlativo de "bad" es "the worst".', ans:true, expl:'Correcto.' },
      { text:'"more better" es correcto.', ans:false, expl:'Falso. better.' } ] }
]);

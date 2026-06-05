/* topic-data-273.js - Juego 273/350 | T39 7/7 INVERSION | errores de inversion y enfasis (MEZCLADO) | Diamante C1 */
_registerGames(273, 'Inversion y Enfasis · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Nunca he visto semejante desorden', opts:['Never I have seen such a mess','Never have I seen such a mess','Never I seen such a mess','Never has I seen such a mess'], correct:1 },
      { src:'Fue Juan quien lo rompio', opts:['It was John who did broke it','It was John who broke it','It was John he broke it','It was John which broke it'], correct:1 },
      { src:'No solo llego tarde, sino que olvido su trabajo', opts:['Not only she was late, but she forgot her work','Not only was she late, but she forgot her work','Not only late she was, but forgot work','Not only she late was, but forgot'], correct:1 },
      { src:'Rara vez sale', opts:['Rarely he goes out','Rarely does he go out','Rarely he does go out','Rarely goes he out'], correct:1 },
      { src:'Apenas habia llegado cuando llamo', opts:['Hardly I had arrived when he called','Hardly had I arrived when he called','Hardly I arrived when he called','Hardly did I arrived when called'], correct:1 },
      { src:'Fue ayer cuando ocurrio', opts:['It was yesterday who it happened','It was yesterday that it happened','It was yesterday it happened then','It is yesterday that it happened'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['Never I have seen','Never have I seen','Never has I seen','Never I seen'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['Never I have seen','Never have I seen'],['It was John who did broke it','It was John who broke it'],['Not only she was late','Not only was she late'],['Rarely he goes out','Rarely does he go out'],['Hardly I had arrived','Hardly had I arrived'],['It was yesterday who','It was yesterday that'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['have','Never','I','seen','such','a','mess'],ans:['Never','have','I','seen','such','a','mess']},{words:['was','Not','only','she','late','but','forgot'],ans:['Not','only','was','she','late','but','forgot']},{words:['who','It','was','John','broke','it'],ans:['It','was','John','who','broke','it']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['Never','I','have','seen','such','a','mess','.'], wi:1, correct:'have I', choices:['have I','I have','I','has I'] },
      { words:['It','was','John','who','did','broke','it','.'], wi:4, correct:'(nada)', choices:['(nada)','did','does','had'] },
      { words:['Rarely','he','goes','out','.'], wi:1, correct:'does he', choices:['does he','he','he does','goes he'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['E','V','A','H'],ans:'HAVE',hint:'Never ... I seen'},{scrambled:['O','H','W'],ans:'WHO',hint:'It was John ... broke it'},{scrambled:['S','E','O','D'],ans:'DOES',hint:'Rarely ... he go out'},{scrambled:['D','A','H'],ans:'HAD',hint:'Hardly ... I arrived'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"Never have I seen such a mess." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"It was John who did broke it." es correcto.', ans:false, expl:'Falso. who broke it (sin did).' },
      { text:'"Not only was she late, but she forgot her work." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"Rarely he goes out." es correcto.', ans:false, expl:'Falso. Rarely does he go out.' } ] }
]);

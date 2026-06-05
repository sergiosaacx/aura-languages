/* topic-data-203.js - Juego 203/350 | T29 7/7 LINK IT UP | errores tipicos (MEZCLADO) | Oro B1 */
_registerGames(203, 'Marcadores y Relativos · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'La mujer que llamo es mi hermana', opts:['The woman which called is my sister','The woman who called is my sister','The woman where called is my sister','The woman whose called is my sister'], correct:1 },
      { src:'Me gusta el cafe; sin embargo, no tomo te', opts:['Therefore I like coffee, I dislike tea','However, I like coffee; I dislike tea','Moreover I like coffee, I dislike tea','Because I like coffee, I dislike tea'], correct:1 },
      { src:'El coche que compre es rojo', opts:['The car who I bought is red','The car which I bought is red','The car where I bought is red','The car whose I bought is red'], correct:1 },
      { src:'Estudio; por lo tanto, aprobo', opts:['He studied; however, he passed','He studied; therefore, he passed','He studied; moreover, he passed','He studied; although he passed'], correct:1 },
      { src:'La ciudad donde naci es bonita', opts:['The city which I was born is nice','The city where I was born is nice','The city who I was born is nice','The city whose I was born is nice'], correct:1 },
      { src:'Es caro; no obstante, lo compre', opts:['It is expensive; therefore, I bought it','It is expensive; nevertheless, I bought it','It is expensive; moreover, I bought it','It is expensive; so I bought it'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['The woman which called','The woman who called','The woman where called','The woman whose called'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['woman which called','woman who called'],['car who I bought','car which I bought'],['Therefore (contraste)','However'],['city which I was born','city where I was born'],['man whose tall','man who is tall'],['book who I read','book which I read'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['who','The','woman','called','is','my','sister'],ans:['The','woman','who','called','is','my','sister']},{words:['which','The','car','I','bought','is','red'],ans:['The','car','which','I','bought','is','red']},{words:['where','The','city','I','was','born'],ans:['The','city','where','I','was','born']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['The','woman','which','called','.'], wi:2, correct:'who', choices:['who','which','where','whose'] },
      { words:['The','car','who','I','bought','.'], wi:2, correct:'which', choices:['which','who','where','whose'] },
      { words:['Therefore','I','like','coffee','I','dislike','tea','.'], wi:0, correct:'However', choices:['However','Therefore','Moreover','Because'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['O','H','W'],ans:'WHO',hint:'corrige which (personas)'},{scrambled:['H','C','I','H','W'],ans:'WHICH',hint:'corrige who (cosas)'},{scrambled:['E','R','E','H','W'],ans:'WHERE',hint:'corrige which (lugar)'},{scrambled:['R','E','V','E','W','O','H'],ans:'HOWEVER',hint:'corrige therefore (contraste)'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"The woman who called" usa el relativo correcto.', ans:true, expl:'Correcto. who = personas.' },
      { text:'"The car who I bought" es correcto.', ans:false, expl:'Falso. The car which I bought.' },
      { text:'Para expresar contraste se usa "however", no "therefore".', ans:true, expl:'Correcto.' },
      { text:'"The city which I was born" es correcto.', ans:false, expl:'Falso. The city where I was born.' } ] }
]);

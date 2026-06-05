/* topic-data-105.js - Juego 105/350 | T15 7/7 HOW MUCH? | errores tipicos (MEZCLADO) | Plata A2 */
_registerGames(105, 'Contables e Incontables · Errores', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Tengo mucha tarea', opts:['I have many homeworks','I have a lot of homework','I have many homework','I have a homework'], correct:1 },
      { src:'Ella me dio un consejo', opts:['She gave me an advice','She gave me some advice','She gave me advices','She gave me a advice'], correct:1 },
      { src:'Cuantos libros tienes?', opts:['How much books do you have?','How many books do you have?','How many book do you have?','How much book do you have?'], correct:1 },
      { src:'Necesito informacion', opts:['I need an information','I need some information','I need informations','I need a information'], correct:1 },
      { src:'Cuanta agua hay?', opts:['How many water is there?','How much water is there?','How many waters is there?','How much waters is there?'], correct:1 },
      { src:'Hay mucha gente', opts:['There are many peoples','There are a lot of people','There is many people','There are much people'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['many homeworks','a lot of homework','many homework','a homework'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['many homeworks','a lot of homework'],['an advice','some advice'],['How much books?','How many books?'],['an information','some information'],['How many water?','How much water?'],['many peoples','many people'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['a lot of','I','have','homework'],ans:['I','have','a lot of','homework']},{words:['some','She','gave','me','advice'],ans:['She','gave','me','some','advice']},{words:['many','How','books'],ans:['How','many','books']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['I','have','many','homeworks','.'], wi:3, correct:'homework', choices:['homework','homeworks','homeworkes','a homework'] },
      { words:['She','gave','me','an','advice','.'], wi:3, correct:'some', choices:['some','an','a','many'] },
      { words:['How','much','books','do','you','have','?'], wi:1, correct:'many', choices:['many','much','few','little'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['Y','N','A','M'],ans:'MANY',hint:'How ... books?'},{scrambled:['E','M','S','O'],ans:'SOME',hint:'... advice'},{scrambled:['H','C','U','M'],ans:'MUCH',hint:'How ... water?'},{scrambled:['E','L','P','O','E','P'],ans:'PEOPLE',hint:'plural de person'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"homework" es incontable: "a lot of homework".', ans:true, expl:'Correcto. No tiene plural.' },
      { text:'"an advice" es correcto.', ans:false, expl:'Falso. some advice.' },
      { text:'"How many books?" es correcto.', ans:true, expl:'Correcto. books es contable.' },
      { text:'"How much books?" es correcto.', ans:false, expl:'Falso. How many books?' } ] }
]);

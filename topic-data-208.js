/* topic-data-208.js - Juego 208/350 | T30 5/7 WORD BUILDER | derivadas en contexto (MEZCLADO) | Oro B1 */
_registerGames(208, 'Palabras Derivadas · En Contexto', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion con la forma correcta.',
    items:[
      { src:'El desarrollo del proyecto fue un exito', opts:['The develop of the project was a success','The development of the project was a success','The developing of the project was a success','The developed of the project was a success'], correct:1 },
      { src:'Ella conduce con cuidado', opts:['She drives careful','She drives carefully','She drives careless','She drives care'], correct:1 },
      { src:'Su amabilidad sorprendio a todos', opts:['His kind surprised everyone','His kindness surprised everyone','His kindly surprised everyone','His kinding surprised everyone'], correct:1 },
      { src:'La decision fue dificil', opts:['The decide was difficult','The decision was difficult','The decisive was difficult','The deciding was difficult'], correct:1 },
      { src:'El es muy creativo', opts:['He is very creation','He is very creative','He is very creatively','He is very create'], correct:1 },
      { src:'Hablo claramente', opts:['She spoke clear','She spoke clearly','She spoke clearness','She spoke clearful'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'The ___ of the project was a success. (develop)', opts:['develop','development','developing','developed'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma derivada correcta.',
    sents:[
      { pre:'The ', ans:'development', post:' was a success. (develop)', bank:['development','develop','developing','developed'] },
      { pre:'She drives ', ans:'carefully', post:'. (care)', bank:['carefully','careful','careless','care'] },
      { pre:'His ', ans:'kindness', post:' surprised us. (kind)', bank:['kindness','kind','kindly','kinding'] },
      { pre:'He is very ', ans:'creative', post:'. (create)', bank:['creative','create','creation','creatively'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['development','The','was','a','success'],ans:['The','development','was','a','success']},{words:['carefully','She','drives'],ans:['She','drives','carefully']},{words:['kindness','His','surprised','everyone'],ans:['His','kindness','surprised','everyone']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la forma incorrecta y elige la correccion.',
    sents:[
      { words:['The','develop','was','a','success','.'], wi:1, correct:'development', choices:['development','develop','developing','developed'] },
      { words:['She','drives','careful','.'], wi:2, correct:'carefully', choices:['carefully','careful','careless','care'] },
      { words:['His','kind','surprised','us','.'], wi:1, correct:'kindness', choices:['kindness','kind','kindly','kinding'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada palabra derivada.',
    categories:['Sustantivo','Adjetivo','Adverbio'],
    items:[ {text:'development',correct:0},{text:'creative',correct:1},{text:'carefully',correct:2},{text:'kindness',correct:0},{text:'useful',correct:1},{text:'clearly',correct:2} ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra derivada.',
    words:[ {scrambled:['T','N','E','M','P','O','L','E','V','E','D'],ans:'DEVELOPMENT',hint:'sustantivo de develop'},{scrambled:['S','S','E','N','D','N','I','K'],ans:'KINDNESS',hint:'sustantivo de kind'},{scrambled:['E','V','I','T','A','E','R','C'],ans:'CREATIVE',hint:'adjetivo de create'},{scrambled:['Y','L','R','A','E','L','C'],ans:'CLEARLY',hint:'adverbio de clear'} ] }
]);

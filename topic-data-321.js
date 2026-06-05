/* topic-data-321.js - Juego 321/350 | T46 6/7 RHETORICAL POWER | completar discursos persuasivos (MEZCLADO) | Challenger C2 */
_registerGames(321, 'Completar Discursos y Argumentos Persuasivos', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Para empezar tres frases con la misma palabra se usa...', opts:['anaphora','zeugma','chiasmus','antithesis'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra o dispositivo que completa el discurso.',
    sents:[
      { pre:'"Now is the time. Now is the moment. ', ans:'Now', post:' is our chance." (anaphora)', bank:['Now','Then','Soon','Later'] },
      { pre:'"We came, we saw, we ', ans:'conquered', post:'." (tricolon)', bank:['conquered','left','slept','waited'] },
      { pre:'"Ask not what... but what ', ans:'you', post:' can do." (antithesis)', bank:['you','they','we','he'] },
      { pre:'"As an expert, you can ', ans:'trust', post:' my judgement." (ethos)', bank:['trust','doubt','ignore','question'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada fragmento con el dispositivo que lo completa.',
    pairs:[ ['Now is the time. Now is...','anaphora'],['we came, we saw, we...','tricolon'],['credibility appeal','ethos'],['emotional appeal','pathos'],['logical appeal','logos'],['A-B-B-A structure','chiasmus'] ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la opcion que mejor completa el discurso.',
    transforms:[
      { original:'repeticion inicial (Now is...)', task:'Dispositivo', opts:['Now is our chance.','Then was the time.','Soon perhaps.','Later, maybe.'], correct:0 },
      { original:'cierre de tricolon', task:'Palabra', opts:['we conquered','we waited','we slept','we left'], correct:0 },
      { original:'apelar a credibilidad', task:'Pilar', opts:['As an expert, trust me.','Imagine the pain.','Data shows it.','Once upon a time.'], correct:0 },
      { original:'apelar a la emocion', task:'Pilar', opts:['Imagine their suffering.','As an expert...','The data proves it.','Statistically...'], correct:0 } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada eleccion completa bien el discurso.',
    stmts:[
      { text:'"Now is the time. Now is the moment. Now is our chance." es anaphora.', ans:true, expl:'Correcto.' },
      { text:'"We came, we saw, we waited" mantiene la fuerza del tricolon original.', ans:false, expl:'Falso. el clasico es we conquered.' },
      { text:'"As an expert, trust me" apela al ethos.', ans:true, expl:'Correcto.' },
      { text:'"Imagine their suffering" apela al logos.', ans:false, expl:'Falso. apela al pathos.' } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['conquered','we','came','we','saw','we'],ans:['we','came','we','saw','we','conquered']},{words:['time','Now','is','the'],ans:['Now','is','the','time']},{words:['trust','you','can','me'],ans:['you','can','trust','me']} ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra clave.',
    words:[ {scrambled:['A','R','O','H','P','A','N','A'],ans:'ANAPHORA',hint:'Now is... Now is...'},{scrambled:['N','O','L','O','C','I','R','T'],ans:'TRICOLON',hint:'we came, we saw, we conquered'},{scrambled:['S','O','H','T','E'],ans:'ETHOS',hint:'credibilidad'},{scrambled:['S','O','H','T','A','P'],ans:'PATHOS',hint:'emocion'} ] }
]);

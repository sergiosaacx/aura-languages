/* topic-data-185.js - Juego 185/350 | T27 3/7 VERB PATTERNS | make/let/help inf sin to (ESPECIALIZADO) | Oro B1 */
_registerGames(185, 'Make / Let / Help · Infinitivo sin To', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Me hizo esperar', opts:['She made me to wait','She made me wait','She made me waiting','She make me wait'], correct:1 },
      { src:'Dejame ir', opts:['Let me to go','Let me go','Let me going','Let me to going'], correct:1 },
      { src:'Me ayudo a llevar las bolsas', opts:['He helped me to carry the bags','He helped me carrying the bags','He help me carry the bags','He helped me to carrying the bags'], correct:0 },
      { src:'No me dejan salir', opts:["They don't let me to go out","They don't let me go out","They don't let me going out","They aren't let me go out"], correct:1 },
      { src:'El profesor nos hizo estudiar', opts:['The teacher made us to study','The teacher made us study','The teacher made us studying','The teacher make us study'], correct:1 },
      { src:'Ella me ayudo a cocinar', opts:['She helped me cook','She helped me to cooking','She help me cook','She helped me cooking'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que estructura usa "make"?', opts:['make + objeto + to + inf','make + objeto + inf (sin to)','make + objeto + -ing','make + to + inf'], correct:1 },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['wait','She','made','me'],ans:['She','made','me','wait']},{words:['go','Let','me'],ans:['Let','me','go']},{words:['study','The','teacher','made','us'],ans:['The','teacher','made','us','study']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la forma incorrecta y elige la correccion.',
    sents:[
      { words:['She','made','me','waiting','.'], wi:3, correct:'wait', choices:['wait','waiting','to wait','waits'] },
      { words:['Let','me','going','.'], wi:2, correct:'go', choices:['go','going','to go','goes'] },
      { words:['The','teacher','made','us','studying','.'], wi:4, correct:'study', choices:['study','studying','to study','studies'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el verbo.',
    words:[ {scrambled:['E','K','A','M'],ans:'MAKE',hint:'+ obj + inf sin to'},{scrambled:['T','E','L'],ans:'LET',hint:'+ obj + inf sin to'},{scrambled:['P','L','E','H'],ans:'HELP',hint:'+ obj + inf con o sin to'},{scrambled:['T','I','A','W'],ans:'WAIT',hint:'made me ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada regla es correcta.',
    stmts:[
      { text:'"make" va seguido de infinitivo sin "to".', ans:true, expl:'Correcto. She made me wait.' },
      { text:'"Let me to go." es correcto.', ans:false, expl:'Falso. Let me go (sin to).' },
      { text:'"help" puede ir con infinitivo con o sin "to".', ans:true, expl:'Correcto. helped me carry / helped me to carry.' },
      { text:'"She made me to wait." es correcto.', ans:false, expl:'Falso. She made me wait.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada estructura.',
    categories:['Sin to (make/let)','help (con o sin to)'],
    items:[ {text:'made me wait',correct:0},{text:'let him go',correct:0},{text:'helped me carry',correct:1},{text:'made us study',correct:0},{text:'let me try',correct:0},{text:'helped her cook',correct:1} ] }
]);

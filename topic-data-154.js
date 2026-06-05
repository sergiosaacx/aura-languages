/* topic-data-154.js - Juego 154/350 | T22 7/7 USED TO | errores tipicos (MEZCLADO) | Oro B1 */
_registerGames(154, 'Habitos Pasados y Pasado Continuo · Errores', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Yo solia vivir en Paris', opts:['I use to live in Paris','I used to live in Paris','I used to living in Paris','I was used to live in Paris'], correct:1 },
      { src:'Ella era muy timida de nina', opts:['She would be very shy as a child','She used to be very shy as a child','She was be very shy as a child','She use to be very shy as a child'], correct:1 },
      { src:'El estaba durmiendo cuando llegue', opts:['He were sleeping when I arrived','He was sleeping when I arrived','He was sleep when I arrived','He sleeping when I arrived'], correct:1 },
      { src:'Soliamos comer fuera', opts:['We use to eat out','We used to eat out','We used to eating out','We were used to eat out'], correct:1 },
      { src:'Estaban estudiando', opts:['They was studying','They were studying','They were study','They studying'], correct:1 },
      { src:'Yo solia tener un gato', opts:['I would have a cat','I used to have a cat','I use to have a cat','I was have a cat'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['I use to live there','I used to live there','I used to living there','I was used to live there'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['use to live','used to live'],['would be shy (estado)','used to be shy'],['He were sleeping','He was sleeping'],['use to eat','used to eat'],['They was studying','They were studying'],['would have a cat (estado)','used to have a cat'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['used','I','to','live','there'],ans:['I','used','to','live','there']},{words:['was','He','sleeping','then'],ans:['He','was','sleeping','then']},{words:['used','She','to','be','shy'],ans:['She','used','to','be','shy']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['I','use','to','live','in','Paris','.'], wi:1, correct:'used', choices:['used','use','uses','using'] },
      { words:['She','would','be','shy','.'], wi:1, correct:'used to', choices:['used to','would','use to','was'] },
      { words:['He','were','sleeping','.'], wi:1, correct:'was', choices:['was','were','is','did'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['D','E','S','U'],ans:'USED',hint:'corrige use to'},{scrambled:['S','A','W'],ans:'WAS',hint:'corrige He were'},{scrambled:['O','T'],ans:'TO',hint:'used ... live'},{scrambled:['R','E','E','W'],ans:'WERE',hint:'corrige They was'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"used to" se escribe con d.', ans:true, expl:'Correcto. used to (no use to).' },
      { text:'"would" se usa para estados pasados.', ans:false, expl:'Falso. Para estados: used to be/have/live.' },
      { text:'Con "he" en pasado continuo se usa "was".', ans:true, expl:'Correcto. He was sleeping.' },
      { text:'"He were sleeping." es correcto.', ans:false, expl:'Falso. He was sleeping.' } ] }
]);

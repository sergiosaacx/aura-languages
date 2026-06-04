/* topic-data-077.js - Juego 77/350 | T11 7/7 WHAT HAPPENED? | errores tipicos (MEZCLADO) | Plata A2 */
_registerGames(77, 'Pasado Simple · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta del pasado.',
    items:[
      { src:'Ella fue a la tienda', opts:['She goed to the store','She went to the store','She gone to the store','She go to the store'], correct:1 },
      { src:'El paro el carro', opts:['He stoped the car','He stopped the car','He stop the car','He stoppd the car'], correct:1 },
      { src:'Ellos dijeron adios', opts:['They sayed goodbye','They said goodbye','They sayd goodbye','They say goodbye'], correct:1 },
      { src:'Ella compro pan', opts:['She buyed bread','She bought bread','She buy bread','She boughted bread'], correct:1 },
      { src:'El corrio rapido', opts:['He runned fast','He ran fast','He run fast','He running fast'], correct:1 },
      { src:'Yo estudie ingles', opts:['I studyed English','I studied English','I study English','I studing English'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['She goed','She went','She gone','She going'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['goed','went'],['stoped','stopped'],['sayed','said'],['buyed','bought'],['runned','ran'],['studyed','studied'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['went','She','to','the','store'],ans:['She','went','to','the','store']},{words:['stopped','He','the','car'],ans:['He','stopped','the','car']},{words:['said','They','goodbye'],ans:['They','said','goodbye']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el pasado mal formado y elige la correccion.',
    sents:[
      { words:['She','goed','to','the','store','.'], wi:1, correct:'went', choices:['went','goed','gone','go'] },
      { words:['He','stoped','the','car','.'], wi:1, correct:'stopped', choices:['stopped','stoped','stopd','stop'] },
      { words:['They','sayed','goodbye','.'], wi:1, correct:'said', choices:['said','sayed','sayd','say'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el pasado correcto.',
    words:[ {scrambled:['T','N','E','W'],ans:'WENT',hint:'corrige goed'},{scrambled:['P','P','O','T','S','E','D'],ans:'STOPPED',hint:'corrige stoped'},{scrambled:['D','I','A','S'],ans:'SAID',hint:'corrige sayed'},{scrambled:['N','A','R'],ans:'RAN',hint:'corrige runned'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada pasado es correcto.',
    stmts:[
      { text:'El pasado de "go" es "went", no "goed".', ans:true, expl:'Correcto. go es irregular.' },
      { text:'El pasado de "stop" es "stoped".', ans:false, expl:'Falso. Se duplica la p: stopped.' },
      { text:'El pasado de "say" es "said".', ans:true, expl:'Correcto. say -> said.' },
      { text:'El pasado de "run" es "runned".', ans:false, expl:'Falso. run -> ran.' } ] }
]);

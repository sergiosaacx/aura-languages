/* topic-data-091.js - Juego 91/350 | T13 7/7 GOING TO | errores tipicos (MEZCLADO) | Plata A2 */
_registerGames(91, 'Going To · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Ella va a viajar manana', opts:['She going to travel tomorrow','She is going to travel tomorrow','She is go to travel tomorrow','She will going to travel tomorrow'], correct:1 },
      { src:'Voy a estudiar esta noche', opts:['I am going to studied tonight','I am going to study tonight','I going to study tonight','I am go to study tonight'], correct:1 },
      { src:'Ellos van a comer', opts:['They are go to eat','They are going to eat','They going to eat','They is going to eat'], correct:1 },
      { src:'El va a trabajar', opts:['He going to work','He is going to work','He is go to work','He are going to work'], correct:1 },
      { src:'Vamos a ganar', opts:['We are go to win','We are going to win','We going to win','We is going to win'], correct:1 },
      { src:'Tu vas a dormir', opts:['You going to sleep','You are going to sleep','You is going to sleep','You are go to sleep'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['She going to travel','She is going to travel','She is go to travel','She are going to travel'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['She going to travel','She is going to travel'],['I am going to studied','I am going to study'],['They are go to eat','They are going to eat'],['He going to work','He is going to work'],['We are go to win','We are going to win'],['You going to sleep','You are going to sleep'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['going','She','is','to','travel'],ans:['She','is','going','to','travel']},{words:['going','I','am','to','study'],ans:['I','am','going','to','study']},{words:['going','They','are','to','eat'],ans:['They','are','going','to','eat']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She','will','going','to','travel','.'], wi:1, correct:'is', choices:['is','will','are','am'] },
      { words:['I','am','going','to','studied','.'], wi:4, correct:'study', choices:['study','studied','studying','studies'] },
      { words:['They','are','go','to','eat','.'], wi:2, correct:'going', choices:['going','go','goes','gone'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['I','G','O','N','G'],ans:'GOING',hint:'... to travel'},{scrambled:['S','I'],ans:'IS',hint:'She ... going to'},{scrambled:['D','U','T','S','Y'],ans:'STUDY',hint:'going to ...'},{scrambled:['R','E','A'],ans:'ARE',hint:'They ... going to'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'Despues de "going to" va el infinitivo.', ans:true, expl:'Correcto. going to + infinitivo.' },
      { text:'"She going to travel." es correcto.', ans:false, expl:'Falso. Falta is: She is going to travel.' },
      { text:'"They are going to eat." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"I am going to studied." es correcto.', ans:false, expl:'Falso. going to study.' } ] }
]);

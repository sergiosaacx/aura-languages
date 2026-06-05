/* topic-data-259.js - Juego 259/350 | T37 7/7 PHRASAL VERBS II | errores con expresiones avanzadas (MEZCLADO) | Platino B2 */
_registerGames(259, 'Expresiones Avanzadas · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Ella supero la dificultad', opts:['She got over with the difficulty','She got over the difficulty','She got away the difficulty','She came over the difficulty'], correct:1 },
      { src:'No entiendo lo que dice', opts:['I cannot make out what he is speaking','I cannot make out what he is saying','I cannot make off what he is saying','I cannot make up what he is saying'], correct:1 },
      { src:'Se le ocurrio una idea', opts:['She came across an idea','She came up with an idea','She came up an idea','She came over an idea'], correct:1 },
      { src:'El trato fracaso', opts:['The deal fell off','The deal fell through','The deal fell across','The deal fell over'], correct:1 },
      { src:'No soporto esto', opts:['I cannot put up this','I cannot put up with this','I cannot put with this','I cannot put off with this'], correct:1 },
      { src:'Saco el tema', opts:['He brought on the topic','He brought up the topic','He brought across the topic','He brought over the topic'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['got over with the problem','got over the problem','got away the problem','came over the problem'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['got over with the difficulty','got over the difficulty'],['make out what he is speaking','make out what he is saying'],['came up an idea','came up with an idea'],['fell off (un plan)','fell through'],['put up this','put up with this'],['brought on the topic','brought up the topic'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['over','She','got','the','difficulty'],ans:['She','got','over','the','difficulty']},{words:['with','He','came','up','an','idea'],ans:['He','came','up','with','an','idea']},{words:['through','The','deal','fell'],ans:['The','deal','fell','through']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['She','got','over','with','it','.'], wi:3, correct:'(nada)', choices:['(nada)','with','off','up'] },
      { words:['He','came','up','an','idea','.'], wi:3, correct:'with an', choices:['with an','an','for an','of an'] },
      { words:['The','deal','fell','off','.'], wi:3, correct:'through', choices:['through','off','across','over'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['R','E','V','O'],ans:'OVER',hint:'got ... the problem'},{scrambled:['G','N','I','Y','A','S'],ans:'SAYING',hint:'make out what he is ...'},{scrambled:['H','G','U','O','R','H','T'],ans:'THROUGH',hint:'fell ...'},{scrambled:['H','T','I','W'],ans:'WITH',hint:'put up ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"She got over the difficulty." es correcto.', ans:true, expl:'Correcto. sin with.' },
      { text:'"I cannot make out what he is speaking." es correcto.', ans:false, expl:'Falso. what he is saying.' },
      { text:'"The deal fell through." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"I cannot put up this." es correcto.', ans:false, expl:'Falso. put up with this.' } ] }
]);

/* topic-data-322.js - Juego 322/350 | T46 7/7 RHETORICAL POWER | uso incorrecto de dispositivos (MEZCLADO) | Challenger C2 */
_registerGames(322, 'Dispositivos Retoricos · Uso Incorrecto', [
  { id:'translate', label:'Identifica', xp:25, instr:'Elige la version correcta de la figura.',
    items:[
      { src:'tricolon clasico de Cesar', opts:['we came, we saw, we conquered','we came and conquered','we saw and won','we came, we conquered'], correct:0 },
      { src:'anaphora correcta', opts:['Now is the time. Now is the moment.','Now is the time. The moment is now.','It is the time now. Now moment.','The time, the moment, now.'], correct:0 },
      { src:'chiasmus correcto', opts:['Fair is foul, and foul is fair','Fair is foul, and fair is foul','Foul is foul, and fair is fair','Fair and foul, foul and fair'], correct:0 },
      { src:'antithesis correcta', opts:['Ask not what your country can do for you...','Ask what your country does...','Your country asks you...','Do for your country only.'], correct:0 },
      { src:'tricolon correcto (gobierno)', opts:['of the people, by the people, for the people','of and by the people','for the people only','people of, people by'], correct:0 },
      { src:'anaphora correcta', opts:['We shall fight... we shall fight...','We fight and we shall...','Fighting we shall...','We, fighting, shall...'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es el tricolon correcto?', opts:['we came, we saw, we conquered','we came and conquered','we saw and won','we came, we conquered'], correct:0 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada version deformada con su forma correcta.',
    pairs:[ ['we came and conquered','we came, we saw, we conquered'],['Fair is foul, and fair is foul','Fair is foul, and foul is fair'],['of and by the people','of the people, by the people, for the people'],['Now the time, moment now','Now is the time. Now is the moment.'],['Ask what your country does','Ask not what your country can do for you'],['fighting we shall','we shall fight... we shall fight...'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['conquered','we','came','we','saw','we'],ans:['we','came','we','saw','we','conquered']},{words:['fair','Fair','is','foul','and','foul','is'],ans:['Fair','is','foul','and','foul','is','fair']},{words:['people','of','the','people','by','the'],ans:['of','the','people','by','the','people']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['Fair','is','foul','and','fair','is','foul','.'], wi:4, correct:'foul', choices:['foul','fair','good','bad'] },
      { words:['we','came','we','saw','we','won','.'], wi:5, correct:'conquered', choices:['conquered','won','left','waited'] },
      { words:['Ask','what','your','country','does','.'], wi:1, correct:'not', choices:['not','what','why','how'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la figura esta bien ejecutada.',
    stmts:[
      { text:'"we came, we saw, we conquered" es un tricolon correcto.', ans:true, expl:'Correcto.' },
      { text:'"Fair is foul, and fair is foul" es un chiasmus correcto.', ans:false, expl:'Falso. ...and foul is fair.' },
      { text:'"of the people, by the people, for the people" es un tricolon correcto.', ans:true, expl:'Correcto.' },
      { text:'"we came and conquered" mantiene el tricolon clasico.', ans:false, expl:'Falso. le falta el tercer elemento.' } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['D','E','R','E','U','Q','N','O','C'],ans:'CONQUERED',hint:'we came, we saw, we ...'},{scrambled:['R','I','A','F'],ans:'FAIR',hint:'foul is ...'},{scrambled:['E','L','P','O','E','P'],ans:'PEOPLE',hint:'of the ...'},{scrambled:['T','O','N'],ans:'NOT',hint:'Ask ... what your country'} ] }
]);

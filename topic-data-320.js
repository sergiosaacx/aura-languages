/* topic-data-320.js - Juego 320/350 | T46 5/7 RHETORICAL POWER | construcciones retoricas avanzadas (MEZCLADO) | Challenger C2 */
_registerGames(320, 'Construcciones Retoricas Avanzadas', [
  { id:'translate', label:'Identifica', xp:25, instr:'Elige el dispositivo de cada construccion.',
    items:[
      { src:'"Not that I loved Caesar less, but that I loved Rome more"', opts:['antithesis','anaphora','tricolon','zeugma'], correct:0 },
      { src:'"We shall fight on the beaches, we shall fight on the landing grounds..."', opts:['anaphora','chiasmus','zeugma','tricolon'], correct:0 },
      { src:'"Friends, Romans, countrymen"', opts:['tricolon','antithesis','chiasmus','zeugma'], correct:0 },
      { src:'"Fair is foul, and foul is fair"', opts:['chiasmus','anaphora','tricolon','zeugma'], correct:0 },
      { src:'"She broke his car and his heart"', opts:['zeugma','anaphora','tricolon','antithesis'], correct:0 },
      { src:'"Easy come, easy go"', opts:['anaphora','tricolon','zeugma','antithesis'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"She broke his car and his heart" es un ejemplo de...', opts:['zeugma','anaphora','tricolon','antithesis'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el dispositivo correcto.',
    sents:[
      { pre:'"Not that I loved Caesar less..." is ', ans:'antithesis', post:'.', bank:['antithesis','anaphora','tricolon','zeugma'] },
      { pre:'"Friends, Romans, countrymen" is a ', ans:'tricolon', post:'.', bank:['tricolon','antithesis','chiasmus','zeugma'] },
      { pre:'"Fair is foul, and foul is fair" is a ', ans:'chiasmus', post:'.', bank:['chiasmus','anaphora','tricolon','zeugma'] },
      { pre:'"She broke his car and his heart" is a ', ans:'zeugma', post:'.', bank:['zeugma','anaphora','tricolon','antithesis'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada construccion con su dispositivo.',
    pairs:[ ['Not X less, but Y more','antithesis'],['We shall fight... we shall fight...','anaphora'],['Friends, Romans, countrymen','tricolon'],['Fair is foul, foul is fair','chiasmus'],['broke his car and his heart','zeugma'],['Easy come, easy go','parallelism'] ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada construccion.',
    categories:['Repeticion','Inversion / Contraste','Doble sentido'],
    items:[ {text:'We shall fight... we shall fight...',correct:0},{text:'Fair is foul, foul is fair',correct:1},{text:'broke his car and his heart',correct:2},{text:'Easy come, easy go',correct:0},{text:'Not X less, but Y more',correct:1},{text:'lost his coat and his temper',correct:2} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la identificacion es correcta.',
    stmts:[
      { text:'"Friends, Romans, countrymen" es un tricolon.', ans:true, expl:'Correcto. serie de tres.' },
      { text:'"She broke his car and his heart" es anaphora.', ans:false, expl:'Falso. es zeugma.' },
      { text:'"Fair is foul, and foul is fair" es un chiasmus.', ans:true, expl:'Correcto.' },
      { text:'"We shall fight... we shall fight..." es un tricolon.', ans:false, expl:'Falso. es anaphora.' } ] }
  ,{ id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el dispositivo.',
    words:[ {scrambled:['A','M','G','U','E','Z'],ans:'ZEUGMA',hint:'un verbo, dos sentidos'},{scrambled:['N','O','L','O','C','I','R','T'],ans:'TRICOLON',hint:'serie de tres'},{scrambled:['S','U','M','S','A','I','H','C'],ans:'CHIASMUS',hint:'estructura A-B-B-A'},{scrambled:['A','R','O','H','P','A','N','A'],ans:'ANAPHORA',hint:'repeticion inicial'} ] }
]);

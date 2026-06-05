/* topic-data-240.js - Juego 240/350 | T35 2/7 NOUN POWER | nominalizacion (ESPECIALIZADO) | Platino B2 */
_registerGames(240, 'Nominalizacion', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'El sustantivo de "achieve" es...', opts:['achievment','achievement','achieving','achiever'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada verbo o adjetivo con su sustantivo.',
    pairs:[ ['develop','development'],['achieve','achievement'],['happy','happiness'],['decide','decision'],['strong','strength'],['analyse','analysis'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma nominal correcta.',
    sents:[
      { pre:'The ', ans:'development', post:' of the app took months.', bank:['development','develop','developing','developed'] },
      { pre:'Her ', ans:'achievement', post:' was remarkable.', bank:['achievement','achieve','achieving','achiever'] },
      { pre:'They made a ', ans:'decision', post:'.', bank:['decision','decide','decisive','deciding'] },
      { pre:'His ', ans:'strength', post:' is impressive.', bank:['strength','strong','strongly','stronger'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el sustantivo.',
    words:[ {scrambled:['T','N','E','M','P','O','L','E','V','E','D'],ans:'DEVELOPMENT',hint:'sustantivo de develop'},{scrambled:['N','O','I','S','I','C','E','D'],ans:'DECISION',hint:'sustantivo de decide'},{scrambled:['H','T','G','N','E','R','T','S'],ans:'STRENGTH',hint:'sustantivo de strong'},{scrambled:['S','S','E','N','I','P','P','A','H'],ans:'HAPPINESS',hint:'sustantivo de happy'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada nominalizacion es correcta.',
    stmts:[
      { text:'El sustantivo de "develop" es "development".', ans:true, expl:'Correcto.' },
      { text:'El sustantivo de "achieve" es "achievment".', ans:false, expl:'Falso. achievement (con e).' },
      { text:'El sustantivo de "decide" es "decision".', ans:true, expl:'Correcto.' },
      { text:'El sustantivo de "strong" es "strongness".', ans:false, expl:'Falso. strength.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Convierte cada palabra en su sustantivo.',
    transforms:[
      { original:'develop', task:'Sustantivo', opts:['development','developement','develop','developing'], correct:0 },
      { original:'achieve', task:'Sustantivo', opts:['achievement','achievment','achieve','achieving'], correct:0 },
      { original:'decide', task:'Sustantivo', opts:['decision','decide','decisive','deciding'], correct:0 },
      { original:'strong', task:'Sustantivo', opts:['strength','strongness','strongth','strongly'], correct:0 } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['development','The','took','months'],ans:['The','development','took','months']},{words:['decision','They','made','a'],ans:['They','made','a','decision']},{words:['strength','His','is','great'],ans:['His','strength','is','great']} ] }
]);

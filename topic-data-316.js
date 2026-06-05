/* topic-data-316.js - Juego 316/350 | T46 1/7 RHETORICAL POWER | dispositivos avanzados nomenclatura (ESPECIALIZADO) | Challenger C2 */
_registerGames(316, 'Dispositivos Retoricos Avanzados · Nomenclatura', [
  { id:'translate', label:'Nombre', xp:25, instr:'Elige el nombre en ingles.',
    items:[
      { src:'repeticion al inicio de frases', opts:['anaphora','epistrophe','chiasmus','zeugma'], correct:0 },
      { src:'estructura invertida (A-B-B-A)', opts:['anaphora','chiasmus','tricolon','antithesis'], correct:1 },
      { src:'contraposicion de ideas', opts:['antithesis','anaphora','epistrophe','zeugma'], correct:0 },
      { src:'repeticion al final de frases', opts:['anaphora','epistrophe','tricolon','chiasmus'], correct:1 },
      { src:'serie de tres elementos', opts:['tricolon','zeugma','chiasmus','anaphora'], correct:0 },
      { src:'un verbo rige dos complementos distintos', opts:['zeugma','tricolon','antithesis','anaphora'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"I have a dream... I have a dream..." es un ejemplo de...', opts:['anaphora','epistrophe','chiasmus','zeugma'], correct:0 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada figura con su definicion.',
    pairs:[ ['anaphora','repeticion al inicio'],['epistrophe','repeticion al final'],['chiasmus','estructura invertida'],['antithesis','contraposicion'],['tricolon','serie de tres'],['zeugma','un verbo, dos sentidos'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el nombre de la figura.',
    sents:[
      { pre:'"We shall fight... we shall fight..." uses ', ans:'anaphora', post:'.', bank:['anaphora','epistrophe','chiasmus','zeugma'] },
      { pre:'"Ask not what your country can do for you..." uses ', ans:'antithesis', post:'.', bank:['antithesis','anaphora','tricolon','zeugma'] },
      { pre:'"Veni, vidi, vici" is a ', ans:'tricolon', post:'.', bank:['tricolon','chiasmus','zeugma','epistrophe'] },
      { pre:'An A-B-B-A structure is ', ans:'chiasmus', post:'.', bank:['chiasmus','anaphora','tricolon','zeugma'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el nombre de la figura.',
    words:[ {scrambled:['A','R','O','H','P','A','N','A'],ans:'ANAPHORA',hint:'repeticion al inicio'},{scrambled:['S','U','M','S','A','I','H','C'],ans:'CHIASMUS',hint:'estructura A-B-B-A'},{scrambled:['N','O','L','O','C','I','R','T'],ans:'TRICOLON',hint:'serie de tres'},{scrambled:['A','M','G','U','E','Z'],ans:'ZEUGMA',hint:'un verbo, dos sentidos'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada definicion es correcta.',
    stmts:[
      { text:'La anaphora repite palabras al inicio de frases sucesivas.', ans:true, expl:'Correcto.' },
      { text:'La epistrophe repite palabras al inicio.', ans:false, expl:'Falso. al final.' },
      { text:'El tricolon es una serie de tres elementos.', ans:true, expl:'Correcto.' },
      { text:'El chiasmus mantiene el mismo orden A-B-A-B.', ans:false, expl:'Falso. es invertido A-B-B-A.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada figura por su mecanismo.',
    categories:['Repeticion','Inversion / Contraste','Serie'],
    items:[ {text:'anaphora',correct:0},{text:'chiasmus',correct:1},{text:'tricolon',correct:2},{text:'epistrophe',correct:0},{text:'antithesis',correct:1},{text:'zeugma',correct:2} ] }
]);

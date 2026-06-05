/* topic-data-182.js - Juego 182/350 | T26 7/7 REPORTED SPEECH | errores tipicos (MEZCLADO) | Oro B1 */
_registerGames(182, 'Discurso Indirecto · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Ella me dijo que estaba feliz', opts:['She said me that she was happy','She told me that she was happy','She told that she was happy','She said me she was happy'], correct:1 },
      { src:'El dijo que vendria', opts:['He told that he would come','He said that he would come','He said that he will come','He told he would come'], correct:1 },
      { src:'Ella dijo que ayudaria', opts:['She said she will help','She said she would help','She told she would help','She say she would help'], correct:1 },
      { src:'Me dijo la verdad', opts:['He said me the truth','He told me the truth','He told the truth me','He said the truth me'], correct:1 },
      { src:'Dijo que estaba ocupada', opts:['She told that she was busy','She said that she was busy','She said that she is busy','She say that she was busy'], correct:1 },
      { src:'El me dijo que llamaria', opts:['He said me that he would call','He told me that he would call','He told me that he will call','He said me he would call'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['She said me','She told me','She say me','She tell me'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['said me','told me'],['told that','said that'],['said she will help','said she would help'],['told the truth (sin objeto)','told me the truth'],['said that he is tired','said that he was tired'],['He say that','He said that'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['me','She','told','she','was','happy','that'],ans:['She','told','me','that','she','was','happy']},{words:['would','He','said','that','he','come'],ans:['He','said','that','he','would','come']},{words:['truth','He','told','me','the'],ans:['He','told','me','the','truth']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She','said','me','that','she','was','happy','.'], wi:1, correct:'told', choices:['told','said','say','tell'] },
      { words:['He','told','that','he','would','come','.'], wi:1, correct:'said', choices:['said','told','say','tell'] },
      { words:['She','said','she','will','help','.'], wi:3, correct:'would', choices:['would','will','can','was'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['D','L','O','T'],ans:'TOLD',hint:'corrige said me'},{scrambled:['D','I','A','S'],ans:'SAID',hint:'corrige told that'},{scrambled:['D','L','U','O','W'],ans:'WOULD',hint:'corrige will help'},{scrambled:['T','A','H','T'],ans:'THAT',hint:'conector afirmacion'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"She said me" es incorrecto; debe ser "She told me".', ans:true, expl:'Correcto. say no lleva objeto de persona.' },
      { text:'"He told that he would come." es correcto.', ans:false, expl:'Falso. He said that... (told necesita objeto).' },
      { text:'Despues de "tell" se usa un objeto de persona.', ans:true, expl:'Correcto. tell me, tell him.' },
      { text:'"She said she will help." mantiene el backshift correcto.', ans:false, expl:'Falso. she would help.' } ] }
]);

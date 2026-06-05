/* topic-data-140.js - Juego 140/350 | T20 7/7 TELL ME MORE | errores tipicos (MEZCLADO) | Plata A2 */
_registerGames(140, 'Adverbios y Conectores · Errores', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Ella canta hermosamente', opts:['She sings beautiful','She sings beautifully','She beautifully sings','She sing beautifully'], correct:1 },
      { src:'Estaba cansado asi que me acoste temprano', opts:['I was tired but I went to bed early','I was tired so I went to bed early','I was tired because I went to bed early','I was tired although I went to bed early'], correct:1 },
      { src:'El se fue corriendo rapido', opts:['He fastly ran away','He ran away fast','He fast ran away','He run away fast'], correct:1 },
      { src:'Ella trabaja con cuidado', opts:['She works careful','She works carefully','She carefully works it','She work carefully'], correct:1 },
      { src:'El habla bien', opts:['He speaks good','He speaks well','He well speaks','He speak well'], correct:1 },
      { src:'Estudio mucho asi que aprobo', opts:['She studied hard but passed','She studied hard so she passed','She studied hard because passed','She studied hard although passed'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['She sings beautiful','She sings beautifully','She beautifully sings','She sing beautifully'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['She sings beautiful','She sings beautifully'],['He fastly ran','He ran fast'],['I was tired but I slept','I was tired so I slept'],['She works careful','She works carefully'],['He speaks good','He speaks well'],['runs slow','runs slowly'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['beautifully','She','sings'],ans:['She','sings','beautifully']},{words:['fast','ran','He','away'],ans:['He','ran','away','fast']},{words:['so','tired','was','I','I','slept'],ans:['I','was','tired','so','I','slept']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She','sings','beautiful','.'], wi:2, correct:'beautifully', choices:['beautifully','beautiful','beauty','beautifuly'] },
      { words:['He','fastly','ran','away','.'], wi:1, correct:'fast', choices:['fast','fastly','fastely','faster'] },
      { words:['I','was','tired','but','I','slept','.'], wi:3, correct:'so', choices:['so','but','because','and'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['L','L','E','W'],ans:'WELL',hint:'corrige speaks good'},{scrambled:['T','S','A','F'],ans:'FAST',hint:'corrige fastly'},{scrambled:['O','S'],ans:'SO',hint:'resultado (corrige but)'},{scrambled:['Y','L','W','O','L','S'],ans:'SLOWLY',hint:'adverbio de slow'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'El adverbio de "beautiful" es "beautifully".', ans:true, expl:'Correcto. +ly.' },
      { text:'"He fastly ran." es correcto.', ans:false, expl:'Falso. He ran fast.' },
      { text:'"so" muestra resultado.', ans:true, expl:'Correcto. tired so I slept.' },
      { text:'El adverbio de "good" es "goodly".', ans:false, expl:'Falso. well.' } ] }
]);

/* topic-data-196.js - Juego 196/350 | T28 7/7 PHRASAL VERBS I | errores tipicos (MEZCLADO) | Oro B1 */
_registerGames(196, 'Phrasal Verbs · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Ella busco la palabra en el diccionario', opts:['She looked the word out','She looked up the word','She looked out the word in','She up looked the word'], correct:1 },
      { src:'Me quede sin dinero', opts:['I ran out money','I ran out of money','I ran of money','I run out money'], correct:1 },
      { src:'Puedes cuidarlo?', opts:['Can you look it after?','Can you look after it?','Can you after look it?','Can you look it for?'], correct:1 },
      { src:'Apaga la luz', opts:['Turn off the light','Turn the off light','Off turn the light','Turn light the off'], correct:0 },
      { src:'No te rindas', opts:['Do not give it up the','Do not give up','Do not up give','Do not give of up'], correct:1 },
      { src:'Recogela', opts:['Pick up it','Pick it up','Up pick it','It pick up'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['ran out money','ran out of money','ran of money','run out money'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['looked the word out','looked up the word'],['ran out money','ran out of money'],['look it after','look after it'],['give up it','give it up'],['pick up it','pick it up'],['turn off it','turn it off'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['up','She','looked','the','word'],ans:['She','looked','up','the','word']},{words:['of','I','ran','out','money'],ans:['I','ran','out','of','money']},{words:['after','Look','it'],ans:['Look','after','it']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el error y elige la correccion.',
    sents:[
      { words:['She','looked','out','the','word','.'], wi:2, correct:'up', choices:['up','out','off','in'] },
      { words:['I','ran','out','money','.'], wi:3, correct:'of money', choices:['of money','money','out money','for money'] },
      { words:['Pick','up','it','.'], wi:1, correct:'it', choices:['it','up','off','on'] } ] },
  { id:'scramble', label:'Descifra la particula', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['F','O'],ans:'OF',hint:'ran out ... money'},{scrambled:['P','U'],ans:'UP',hint:'looked ... the word'},{scrambled:['R','E','T','F','A'],ans:'AFTER',hint:'look ... it'},{scrambled:['T','I'],ans:'IT',hint:'pick ... up'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"I ran out of money." es correcto.', ans:true, expl:'Correcto. run out OF.' },
      { text:'"She looked the word out." es correcto.', ans:false, expl:'Falso. looked up the word.' },
      { text:'"Look after it." es correcto (inseparable).', ans:true, expl:'Correcto. objeto al final.' },
      { text:'"Pick up it." es correcto.', ans:false, expl:'Falso. Pick it up.' } ] }
]);

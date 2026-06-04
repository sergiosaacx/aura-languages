/* topic-data-060.js - Juego 60/350 | T9 4/7 HERE & THERE | Preposiciones de lugar en contexto (ESPECIALIZADO) | Bronce A1 */
_registerGames(60, 'Preposiciones de Lugar · En Contexto', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'El gato esta sobre la mesa. Que preposicion usas?', opts:['in','on','under','at'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion describe bien la posicion.',
    stmts:[
      { text:'"The cat is on the table." (el gato esta encima) es correcto.', ans:true, expl:'Correcto. on = sobre una superficie.' },
      { text:'"The book is in the chair." (sobre la silla) es correcto.', ans:false, expl:'Falso. Sobre una superficie es on: on the chair.' },
      { text:'"The ball is under the bed." (debajo) es correcto.', ans:true, expl:'Correcto. under = debajo.' },
      { text:'"The milk is on the fridge." (dentro) es correcto.', ans:false, expl:'Falso. Dentro es in: in the fridge.' } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la preposicion incorrecta y elige la correccion.',
    sents:[
      { words:['The','book','is','in','the','table','.'], wi:3, correct:'on', choices:['on','in','under','at'] },
      { words:['The','milk','is','on','the','fridge','.'], wi:3, correct:'in', choices:['in','on','under','at'] },
      { words:['The','shoes','are','on','the','bed','.'], wi:3, correct:'under', choices:['under','on','in','at'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:['on','cat','The','is','the','table'], ans:['The','cat','is','on','the','table'] },
      { words:['under','is','ball','The','the','bed'], ans:['The','ball','is','under','the','bed'] },
      { words:['in','keys','The','are','the','bag'], ans:['The','keys','are','in','the','bag'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la preposicion de lugar.',
    words:[ {scrambled:['N','O'],ans:'ON',hint:'sobre la superficie'},{scrambled:['N','I'],ans:'IN',hint:'dentro'},{scrambled:['R','E','D','N','U'],ans:'UNDER',hint:'debajo'},{scrambled:['D','N','I','H','E','B'],ans:'BEHIND',hint:'detras'} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la preposicion correcta para cada posicion.',
    transforms:[
      { original:'El gato encima de la mesa', task:'in/on/under', opts:['The cat is on the table.','The cat is in the table.','The cat is under the table.','The cat is at the table.'], correct:0 },
      { original:'La pelota debajo de la cama', task:'in/on/under', opts:['The ball is under the bed.','The ball is on the bed.','The ball is in the bed.','The ball is at the bed.'], correct:0 },
      { original:'La leche dentro del refri', task:'in/on/under', opts:['The milk is in the fridge.','The milk is on the fridge.','The milk is under the fridge.','The milk is at the fridge.'], correct:0 },
      { original:'El perro detras de la puerta', task:'behind', opts:['The dog is behind the door.','The dog is on the door.','The dog is in the door.','The dog is under the door.'], correct:0 } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'The cat is on the table.', type:'select', opts:['The cat is on the table.','The cat is in the table.','The cat is under the table.','The cat is behind the table.'], correct:0 },
      { tts:'The milk is in the fridge.', type:'select', opts:['The milk is in the fridge.','The milk is on the fridge.','The milk is under the fridge.','The milk is behind the fridge.'], correct:0 },
      { tts:'The ball is under the bed.', type:'select', opts:['The ball is under the bed.','The ball is on the bed.','The ball is in the bed.','The ball is behind the bed.'], correct:0 } ] }
]);

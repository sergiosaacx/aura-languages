/* topic-data-126.js - Juego 126/350 | T18 7/7 CAN YOU? | errores tipicos con modales (MEZCLADO) | Plata A2 */
_registerGames(126, 'Modales · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Ella sabe nadar', opts:['She can to swim','She can swim','She cans swim','She can swimming'], correct:1 },
      { src:'Deberias ver a un medico', opts:['You should to see a doctor','You should see a doctor','You shoulds see a doctor','You should seeing a doctor'], correct:1 },
      { src:'El debe trabajar mas', opts:['He must to work harder','He must work harder','He musts work harder','He must working harder'], correct:1 },
      { src:'Puedo ayudarte', opts:['I can to help you','I can help you','I cans help you','I can helping you'], correct:1 },
      { src:'No deberias preocuparte', opts:["You shouldn't to worry","You shouldn't worry","You shoulds not worry","You shouldn't worrying"], correct:1 },
      { src:'Debemos irnos ahora', opts:['We must to leave now','We must leave now','We musts leave now','We must leaving now'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['She can to swim','She can swim','She cans swim','She can swimming'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['can to swim','can swim'],['should to see','should see'],['must to work','must work'],['cans help','can help'],['shoulds rest','should rest'],['must leaving','must leave'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['swim','She','can'],ans:['She','can','swim']},{words:['see','should','You','a','doctor'],ans:['You','should','see','a','doctor']},{words:['work','He','must','harder'],ans:['He','must','work','harder']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She','cans','swim','.'], wi:1, correct:'can', choices:['can','cans','can to','canning'] },
      { words:['You','shoulds','rest','.'], wi:1, correct:'should', choices:['should','shoulds','should to','shoulding'] },
      { words:['He','must','works','.'], wi:2, correct:'work', choices:['work','works','working','worked'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el modal correcto.',
    words:[ {scrambled:['N','A','C'],ans:'CAN',hint:'corrige can to'},{scrambled:['D','L','U','O','H','S'],ans:'SHOULD',hint:'corrige should to'},{scrambled:['T','S','U','M'],ans:'MUST',hint:'corrige must to'},{scrambled:['M','I','W','S'],ans:'SWIM',hint:'can ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'Los modales van con infinitivo sin "to".', ans:true, expl:'Correcto. can swim, should see.' },
      { text:'"She can to swim." es correcto.', ans:false, expl:'Falso. She can swim.' },
      { text:'"He must work harder." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"You should to rest." es correcto.', ans:false, expl:'Falso. You should rest.' } ] }
]);

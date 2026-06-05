/* topic-data-289.js - Juego 289/350 | T42 2/7 ADVANCED MODALS | should/could/would have (ESPECIALIZADO) | Diamante C1 */
_registerGames(289, 'Should / Could / Would Have · Critica y Alternativas', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Para criticar algo que no se hizo se usa...', opts:['could have','should have','would have','might have'], correct:1 },
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el modal perfecto correcto.',
    items:[
      { src:'Deberias haber estudiado mas', opts:['You could have studied more','You should have studied more','You would have studied more','You might have studied more'], correct:1 },
      { src:'Podrias haber ganado (tenias posibilidad)', opts:['You should have won','You could have won','You would have won','You must have won'], correct:1 },
      { src:'Yo habria ayudado (si me lo hubieras pedido)', opts:['I should have helped','I could have helped','I would have helped','I might have helped'], correct:2 },
      { src:'No deberias haber dicho eso', opts:["You couldn't have said that","You shouldn't have said that","You wouldn't have said that","You mightn't have said that"], correct:1 },
      { src:'Podriamos haber ido (habia opcion)', opts:['We should have gone','We could have gone','We would have gone','We must have gone'], correct:1 },
      { src:'Deberia haber llamado antes', opts:['He could have called earlier','He should have called earlier','He would have called earlier','He might have called earlier'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada modal con su matiz.',
    pairs:[ ['should have','critica (debias)'],['could have','habia posibilidad'],['would have','condicion'],['might have','posibilidad incierta'],['ought to have','deber moral'],['needn\'t have','no hacia falta'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el modal perfecto correcto.',
    sents:[
      { pre:'You ', ans:'should have', post:' studied more.', bank:['should have','could have','would have','might have'] },
      { pre:'You ', ans:'could have', post:' won the race.', bank:['could have','should have','would have','must have'] },
      { pre:'I ', ans:'would have', post:' helped if you had asked.', bank:['would have','should have','could have','might have'] },
      { pre:'You ', ans:"shouldn't have", post:' said that.', bank:["shouldn't have","couldn't have","wouldn't have","mightn't have"] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['have','You','should','studied','more'],ans:['You','should','have','studied','more']},{words:['have','You','could','won'],ans:['You','could','have','won']},{words:['have','I','would','helped'],ans:['I','would','have','helped']} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"You should have studied." expresa una critica.', ans:true, expl:'Correcto. debias haberlo hecho.' },
      { text:'"could have" indica que no habia ninguna posibilidad.', ans:false, expl:'Falso. indica que habia posibilidad.' },
      { text:'"I would have helped if you had asked." es correcto.', ans:true, expl:'Correcto. condicion.' },
      { text:'"You should have said that" critica algo que si se hizo.', ans:false, expl:'Falso. critica algo que no se hizo (deberias haberlo dicho).' } ] }
  ,{ id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el modal.',
    words:[ {scrambled:['D','L','U','O','H','S'],ans:'SHOULD',hint:'... have (critica)'},{scrambled:['D','L','U','O','C'],ans:'COULD',hint:'... have (posibilidad)'},{scrambled:['D','L','U','O','W'],ans:'WOULD',hint:'... have (condicion)'},{scrambled:['E','V','A','H'],ans:'HAVE',hint:'should ... + participio'} ] }
]);

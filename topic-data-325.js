/* topic-data-325.js - Juego 325/350 | T47 3/7 IDIOMATIC MASTERY | British vs American (ESPECIALIZADO) | Challenger C2 */
_registerGames(325, 'Variacion Regional · British vs American', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Fortnight" (dos semanas) es...', opts:['American','British','ambos','ninguno'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada palabra britanica con su equivalente americano.',
    pairs:[ ['fortnight','two weeks'],['nought','zero'],['queue','line'],['lift','elevator'],['flat','apartment'],['lorry','truck'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el equivalente correcto.',
    sents:[
      { pre:'(British) I will see you in a ', ans:'fortnight', post:'.', bank:['fortnight','two weeks','biweek','semester'] },
      { pre:'(British) We waited in the ', ans:'queue', post:'.', bank:['queue','line','row','file'] },
      { pre:'(American) Take the ', ans:'elevator', post:' to floor five.', bank:['elevator','lift','stairs','escalator'] },
      { pre:'(British) She lives in a ', ans:'flat', post:'.', bank:['flat','apartment','condo','house'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada palabra por su variedad.',
    categories:['British','American'],
    items:[ {text:'fortnight',correct:0},{text:'truck',correct:1},{text:'queue',correct:0},{text:'elevator',correct:1},{text:'lorry',correct:0},{text:'apartment',correct:1} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"Lift" es la forma britanica de "elevator".', ans:true, expl:'Correcto.' },
      { text:'"Truck" es britanico y "lorry" es americano.', ans:false, expl:'Falso. lorry es britanico, truck es americano.' },
      { text:'"Queue" es la forma britanica de "line".', ans:true, expl:'Correcto.' },
      { text:'"Fortnight" se usa comunmente en ingles americano.', ans:false, expl:'Falso. es britanico.' } ] },
  { id:'translate', label:'Equivalente', xp:25, instr:'Elige el equivalente americano de la palabra britanica.',
    items:[
      { src:'lift', opts:['elevator','stairs','ramp','ladder'], correct:0 },
      { src:'lorry', opts:['car','truck','bus','van'], correct:1 },
      { src:'flat', opts:['house','apartment','room','floor'], correct:1 },
      { src:'queue', opts:['line','crowd','group','row'], correct:0 },
      { src:'nought', opts:['one','zero','none','null'], correct:1 },
      { src:'petrol', opts:['oil','gas','diesel','fuel tank'], correct:1 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['E','U','E','U','Q'],ans:'QUEUE',hint:'British de line'},{scrambled:['T','F','I','L'],ans:'LIFT',hint:'British de elevator'},{scrambled:['Y','R','R','O','L'],ans:'LORRY',hint:'British de truck'},{scrambled:['T','A','L','F'],ans:'FLAT',hint:'British de apartment'} ] }
]);

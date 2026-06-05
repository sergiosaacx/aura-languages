/* topic-data-216.js - Juego 216/350 | T31 6/7 PERFECT TIMING | simple/perfecto/continuo en texto (MEZCLADO) | Platino B2 */
_registerGames(216, 'Pasado Simple, Perfecto y Continuo', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Cuando llegue a la estacion, el tren ya se habia ido', opts:['When I arrived at the station, the train already left','When I arrived at the station, the train had already left','When I arrived at the station, the train has already left','When I arrived at the station, the train was already left'], correct:1 },
      { src:'Espere dos horas', opts:['I had waited for two hours','I waited for two hours','I have waited for two hours','I was waited for two hours'], correct:1 },
      { src:'Habia estado esperando cuando el llego', opts:['I was waiting when he came','I had been waiting when he came','I have been waiting when he came','I had waiting when he came'], correct:1 },
      { src:'Llegue tarde porque habia perdido el bus', opts:['I was late because I missed the bus','I was late because I had missed the bus','I was late because I have missed the bus','I was late because I was missed the bus'], correct:1 },
      { src:'Comimos despues de que ella llego', opts:['We ate after she had arrived','We had eaten after she arrived','We eat after she had arrived','We were eaten after she arrived'], correct:0 },
      { src:'El estaba cansado porque habia trabajado mucho', opts:['He was tired because he had worked hard','He was tired because he works hard','He is tired because he had worked hard','He was tired because he was worked hard'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'When I ___ at the station, the train had already left.', opts:['arrive','arrived','had arrived','was arriving'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el tiempo correcto.',
    sents:[
      { pre:'When I ', ans:'arrived', post:', the train had left.', bank:['arrived','arrive','had arrived','arriving'] },
      { pre:'The train ', ans:'had left', post:' before I got there.', bank:['had left','left','leaves','was left'] },
      { pre:'I ', ans:'waited', post:' for two hours.', bank:['waited','had waited','wait','was waited'] },
      { pre:'I had been ', ans:'waiting', post:' for an hour when it came.', bank:['waiting','waited','wait','waits'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['had','The','train','left','before','I','arrived'],ans:['The','train','had','left','before','I','arrived']},{words:['waited','I','two','hours','for'],ans:['I','waited','for','two','hours']},{words:['been','I','had','waiting'],ans:['I','had','been','waiting']} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el tiempo correcto segun la secuencia.',
    transforms:[
      { original:'evento anterior: tren irse', task:'Tiempo', opts:['The train had left.','The train left.','The train has left.','The train was left.'], correct:0 },
      { original:'evento posterior: yo esperar', task:'Tiempo', opts:['I waited.','I had waited.','I have waited.','I was waited.'], correct:0 },
      { original:'duracion antes: yo esperar', task:'Tiempo', opts:['I had been waiting.','I waited.','I have been waiting.','I had waiting.'], correct:0 },
      { original:'razon anterior: perder bus', task:'Tiempo', opts:['I had missed the bus.','I missed the bus.','I have missed the bus.','I was missed the bus.'], correct:0 } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada verbo por su tiempo.',
    categories:['Past Simple','Past Perfect','Past Perfect Continuo'],
    items:[ {text:'I waited',correct:0},{text:'had left',correct:1},{text:'had been waiting',correct:2},{text:'I arrived',correct:0},{text:'had missed',correct:1},{text:'had been working',correct:2} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'The train had already left.', type:'select', opts:['The train had already left.','The train already left.','The train has already left.','The train was already left.'], correct:0 },
      { tts:'I waited for two hours.', type:'select', opts:['I waited for two hours.','I had waited for two hours.','I have waited for two hours.','I was waited for two hours.'], correct:0 },
      { tts:'I had been waiting for an hour.', type:'select', opts:['I had been waiting for an hour.','I was waiting for an hour.','I have been waiting for an hour.','I had waiting for an hour.'], correct:0 } ] }
]);

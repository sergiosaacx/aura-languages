/* topic-data-213.js - Juego 213/350 | T31 3/7 PERFECT TIMING | secuencia temporal (ESPECIALIZADO) | Platino B2 */
_registerGames(213, 'Secuencia Temporal · Orden de Eventos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Cuando llegamos, la pelicula ya habia empezado', opts:['When we arrived, the film already started','When we arrived, the film had already started','When we arrived, the film has already started','When we arrived, the film was already started'], correct:1 },
      { src:'Despues de que ella se fue, llame', opts:['After she had left, I called','After she has left, I called','After she leaves, I called','After she was left, I called'], correct:0 },
      { src:'El ya habia cenado cuando volvi', opts:['He already had dinner when I returned','He had already had dinner when I returned','He has already had dinner when I returned','He was already had dinner'], correct:1 },
      { src:'Habian limpiado antes de que llegaramos', opts:['They cleaned before we arrived','They had cleaned before we arrived','They have cleaned before we arrived','They were cleaned before we arrived'], correct:1 },
      { src:'Cuando desperte, todos se habian ido', opts:['When I woke up, everyone already left','When I woke up, everyone had already left','When I woke up, everyone has already left','When I woke up, everyone was left'], correct:1 },
      { src:'No la reconoci porque habia cambiado', opts:['I did not recognize her because she changed','I did not recognize her because she had changed','I did not recognize her because she has changed','I did not recognize her because she was changed'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada concepto con el tiempo verbal correcto.',
    pairs:[ ['evento anterior','Past Perfect (had + PP)'],['evento posterior','Past Simple'],['ya habia empezado','had started'],['llegamos despues','arrived'],['accion mas antigua','had + participio'],['accion mas reciente','pasado simple'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['D','A','H'],ans:'HAD',hint:'evento anterior'},{scrambled:['D','E','T','R','A','T','S'],ans:'STARTED',hint:'participio de start'},{scrambled:['E','R','O','F','E','B'],ans:'BEFORE',hint:'antes de'},{scrambled:['R','E','T','F','A'],ans:'AFTER',hint:'despues de'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada evento por su tiempo verbal.',
    categories:['Past Perfect (anterior)','Past Simple (posterior)'],
    items:[ {text:'the film had started',correct:0},{text:'we arrived',correct:1},{text:'she had left',correct:0},{text:'I called',correct:1},{text:'everyone had gone',correct:0},{text:'I woke up',correct:1} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['had','When','we','arrived','the','film','started'],ans:['When','we','arrived','the','film','had','started']},{words:['had','He','left','before','I','called'],ans:['He','had','left','before','I','called']},{words:['had','They','cleaned','before','we','came'],ans:['They','had','cleaned','before','we','came']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el verbo incorrecto y elige la correccion.',
    sents:[
      { words:['When','we','arrived','the','film','started','already','.'], wi:5, correct:'had started', choices:['had started','started','starts','was started'] },
      { words:['He','already','left','when','I','called','.'], wi:2, correct:'had left', choices:['had left','left','leaves','was left'] },
      { words:['They','cleaned','before','we','arrived','.'], wi:1, correct:'had cleaned', choices:['had cleaned','cleaned','clean','were cleaned'] } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Did you see the beginning of the film?', blank:false },
      { speaker:1, text:null, blank:true, opts:['No, it had already started when we arrived.','No, it already started when we arrived.','No, it has already started when we arrived.','No, it was already started when we arrived.'], correct:0 },
      { speaker:0, text:'And the house was empty?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, everyone had left.','Yes, everyone left already then.','Yes, everyone has left.','Yes, everyone was left.'], correct:0 },
      { speaker:0, text:'Strange.', blank:false } ] }
]);

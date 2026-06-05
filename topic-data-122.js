/* topic-data-122.js - Juego 122/350 | T18 3/7 CAN YOU? | modales significado y uso (ESPECIALIZADO) | Plata A2 */
_registerGames(122, 'Modales · Significado y Uso', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el modal para cada funcion.',
    items:[
      { src:'habilidad', opts:['must','can','should','would'], correct:1 },
      { src:'obligacion fuerte', opts:['can','must','should','could'], correct:1 },
      { src:'consejo', opts:['must','can','should','could'], correct:2 },
      { src:'habilidad pasada', opts:['can','must','could','should'], correct:2 },
      { src:'no poder', opts:["can't","mustn't","shouldn't","couldn't"], correct:0 },
      { src:'prohibicion', opts:["can't","mustn't","shouldn't","wouldn't"], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada modal con su funcion.',
    pairs:[ ['can','habilidad'],['must','obligacion'],['should','consejo'],['could','posibilidad/pasado'],["mustn't",'prohibicion'],["can't",'incapacidad'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el modal.',
    words:[ {scrambled:['N','A','C'],ans:'CAN',hint:'habilidad'},{scrambled:['T','S','U','M'],ans:'MUST',hint:'obligacion'},{scrambled:['D','L','U','O','H','S'],ans:'SHOULD',hint:'consejo'},{scrambled:['D','L','U','O','C'],ans:'COULD',hint:'posibilidad'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada funcion es correcta.',
    stmts:[
      { text:'"can" expresa habilidad.', ans:true, expl:'Correcto. I can swim.' },
      { text:'"should" expresa obligacion fuerte.', ans:false, expl:'Falso. should = consejo.' },
      { text:'"must" expresa obligacion.', ans:true, expl:'Correcto.' },
      { text:'"can" expresa consejo.', ans:false, expl:'Falso. consejo = should.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion con el modal de la funcion.',
    transforms:[
      { original:'habilidad: I / swim', task:'Modal', opts:['I can swim.','I must swim.','I should swim.','I would swim.'], correct:0 },
      { original:'consejo: You / rest', task:'Modal', opts:['You should rest.','You can rest.','You must rest.','You could rest.'], correct:0 },
      { original:'obligacion: We / pay', task:'Modal', opts:['We must pay.','We can pay.','We should pay.','We could pay.'], correct:0 },
      { original:'prohibicion: You / smoke here', task:'Modal', opts:["You mustn't smoke here.","You can smoke here.","You should smoke here.","You would smoke here."], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con el modal correcto.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'I feel sick.', blank:false },
      { speaker:1, text:null, blank:true, opts:['You should see a doctor.','You can see a doctor.','You must can see a doctor.','You would see a doctor.'], correct:0 },
      { speaker:0, text:'The sign says no entry.', blank:false },
      { speaker:1, text:null, blank:true, opts:["So we mustn't go in.","So we can go in.","So we should go in.","So we would go in."], correct:0 },
      { speaker:0, text:'Right.', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada modal segun su funcion.',
    categories:['Habilidad','Obligacion','Consejo'],
    items:[ {text:'can',correct:0},{text:'could',correct:0},{text:'must',correct:1},{text:'have to',correct:1},{text:'should',correct:2},{text:'ought to',correct:2} ] }
]);

/* topic-data-073.js - Juego 73/350 | T11 3/7 WHAT HAPPENED? | Irregulares infinitivo a pasado (ESPECIALIZADO) | Plata A2 */
_registerGames(73, 'Pasado Irregular · Infinitivo a Pasado', [
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada infinitivo con su pasado irregular.',
    pairs:[ ['go','went'],['see','saw'],['make','made'],['take','took'],['know','knew'],['give','gave'] ] },
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el pasado irregular correcto.',
    items:[
      { src:'make (pasado)', opts:['maked','made','make','makes'], correct:1 },
      { src:'take (pasado)', opts:['taked','took','taken','takes'], correct:1 },
      { src:'know (pasado)', opts:['knowed','knew','known','knows'], correct:1 },
      { src:'give (pasado)', opts:['gived','gave','given','gives'], correct:1 },
      { src:'go (pasado)', opts:['goed','went','gone','goes'], correct:1 },
      { src:'see (pasado)', opts:['seed','saw','seen','sees'], correct:1 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el pasado irregular.',
    words:[ {scrambled:['D','A','E','M'],ans:'MADE',hint:'pasado de make'},{scrambled:['K','O','O','T'],ans:'TOOK',hint:'pasado de take'},{scrambled:['W','E','N','K'],ans:'KNEW',hint:'pasado de know'},{scrambled:['E','V','A','G'],ans:'GAVE',hint:'pasado de give'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada pasado es correcto.',
    stmts:[
      { text:'El pasado de "make" es "made".', ans:true, expl:'Correcto. make -> made.' },
      { text:'El pasado de "take" es "taked".', ans:false, expl:'Falso. take -> took.' },
      { text:'El pasado de "give" es "gave".', ans:true, expl:'Correcto. give -> gave.' },
      { text:'El pasado de "know" es "knowed".', ans:false, expl:'Falso. know -> knew.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Escribe el pasado de cada verbo.',
    transforms:[
      { original:'make', task:'Pasado', opts:['made','maked','make','makes'], correct:0 },
      { original:'take', task:'Pasado', opts:['took','taked','taken','takes'], correct:0 },
      { original:'give', task:'Pasado', opts:['gave','gived','given','gives'], correct:0 },
      { original:'know', task:'Pasado', opts:['knew','knowed','known','knows'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con el pasado correcto.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What did you make?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I made a cake.','I maked a cake.','I make a cake.','I made cake a.'], correct:0 },
      { speaker:0, text:'Who did you see?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I saw my friend.','I seed my friend.','I seen my friend.','I see my friend.'], correct:0 },
      { speaker:0, text:'Cool!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada pasado como correcto o incorrecto.',
    categories:['Correcto','Incorrecto'],
    items:[ {text:'made',correct:0},{text:'maked',correct:1},{text:'took',correct:0},{text:'taked',correct:1},{text:'knew',correct:0},{text:'knowed',correct:1} ] }
]);

/* topic-data-193.js - Juego 193/350 | T28 4/7 PHRASAL VERBS I | significados multiples (ESPECIALIZADO) | Oro B1 */
_registerGames(193, 'Significados Multiples', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"turn up" puede significar...', opts:['solo llegar','solo subir el volumen','llegar o subir el volumen','rendirse'], correct:2 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"turn up" puede significar llegar o subir el volumen.', ans:true, expl:'Correcto. dos significados.' },
      { text:'"pick up" puede significar recoger o aprender.', ans:true, expl:'Correcto. pick up a language.' },
      { text:'"look up" siempre significa buscar informacion.', ans:false, expl:'Falso. tambien = mejorar (things are looking up).' },
      { text:'Un phrasal verb solo puede tener un significado.', ans:false, expl:'Falso. muchos tienen varios.' } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada uso con su significado.',
    pairs:[ ['turn up the music','subir el volumen'],['He turned up late','llegar'],['pick up the kids','recoger'],['pick up Spanish','aprender'],['things are looking up','mejorar'],['look up a word','buscar'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el phrasal verb correcto.',
    sents:[
      { pre:'Can you ', ans:'turn up', post:' the music?', bank:['turn up','turn off','give up','look up'] },
      { pre:'He ', ans:'turned up', post:' an hour late.', bank:['turned up','turned off','gave up','looked up'] },
      { pre:'She ', ans:'picked up', post:' some French in Paris.', bank:['picked up','gave up','turned off','ran out'] },
      { pre:'Business is ', ans:'looking up', post:' this year.', bank:['looking up','giving up','turning off','running out'] } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la oracion con el significado dado.',
    transforms:[
      { original:'subir el volumen', task:'turn up', opts:['Turn up the radio.','Turn off the radio.','Give up the radio.','Look up the radio.'], correct:0 },
      { original:'llegar tarde', task:'turn up', opts:['He turned up late.','He turned off late.','He gave up late.','He looked up late.'], correct:0 },
      { original:'aprender un idioma', task:'pick up', opts:['I picked up Italian.','I gave up Italian.','I turned off Italian.','I ran out of Italian.'], correct:0 },
      { original:'mejorar', task:'look up', opts:['Things are looking up.','Things are giving up.','Things are turning off.','Things are running out.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'This song is great!', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, turn it up!','Yes, turn it off!','Yes, give it up!','Yes, look it up!'], correct:0 },
      { speaker:0, text:'Where did you learn Spanish?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I picked it up in Mexico.','I gave it up in Mexico.','I turned it off in Mexico.','I ran it out in Mexico.'], correct:0 },
      { speaker:0, text:'Impressive!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada uso de "pick up".',
    categories:['recoger','aprender'],
    items:[ {text:'pick up the kids',correct:0},{text:'pick up French',correct:1},{text:'pick up the phone',correct:0},{text:'pick up a habit',correct:1},{text:'pick up the box',correct:0},{text:'pick up some skills',correct:1} ] }
]);

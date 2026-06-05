/* topic-data-190.js - Juego 190/350 | T28 1/7 PHRASAL VERBS I | reconocimiento de significado (ESPECIALIZADO) | Oro B1 */
_registerGames(190, 'Phrasal Verbs · Reconocimiento', [
  { id:'translate', label:'Significado', xp:25, instr:'Elige el significado correcto del phrasal verb.',
    items:[
      { src:'give up', opts:['empezar','rendirse','recoger','buscar'], correct:1 },
      { src:'look up', opts:['mirar arriba','buscar (en diccionario)','rendirse','apagar'], correct:1 },
      { src:'turn off', opts:['encender','apagar','recoger','posponer'], correct:1 },
      { src:'pick up', opts:['recoger','dejar','buscar','apagar'], correct:0 },
      { src:'put off', opts:['ponerse','posponer','recoger','encender'], correct:1 },
      { src:'run out of', opts:['correr','quedarse sin','recoger','buscar'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que significa "turn on"?', opts:['apagar','encender','posponer','rendirse'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada phrasal verb con su significado.',
    pairs:[ ['give up','rendirse'],['look up','buscar info'],['turn on','encender'],['pick up','recoger'],['put off','posponer'],['run out of','quedarse sin'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el phrasal verb correcto.',
    sents:[
      { pre:'Please ', ans:'turn off', post:' the lights.', bank:['turn off','give up','look up','run out'] },
      { pre:'Do not ', ans:'give up', post:'! You can do it.', bank:['give up','pick up','put off','turn on'] },
      { pre:'I need to ', ans:'look up', post:' this word.', bank:['look up','give up','turn off','pick up'] },
      { pre:'We ', ans:'ran out of', post:' milk.', bank:['ran out of','gave up','looked up','put off'] } ] },
  { id:'scramble', label:'Descifra la particula', xp:20, instr:'Forma la particula.',
    words:[ {scrambled:['P','U'],ans:'UP',hint:'give ...'},{scrambled:['F','F','O'],ans:'OFF',hint:'turn ...'},{scrambled:['N','O'],ans:'ON',hint:'turn ...'},{scrambled:['T','U','O'],ans:'OUT',hint:'run ... of'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada significado es correcto.',
    stmts:[
      { text:'"give up" significa rendirse.', ans:true, expl:'Correcto.' },
      { text:'"turn off" significa encender.', ans:false, expl:'Falso. turn off = apagar.' },
      { text:'"run out of" significa quedarse sin algo.', ans:true, expl:'Correcto. We ran out of milk.' },
      { text:'"look up" significa solo mirar hacia arriba.', ans:false, expl:'Falso. tambien = buscar informacion.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada phrasal verb por su significado.',
    categories:['Encender / Apagar','Buscar / Recoger'],
    items:[ {text:'turn on',correct:0},{text:'turn off',correct:0},{text:'look up',correct:1},{text:'pick up',correct:1},{text:'switch on',correct:0},{text:'switch off',correct:0} ] }
]);

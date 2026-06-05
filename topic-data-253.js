/* topic-data-253.js - Juego 253/350 | T37 1/7 PHRASAL VERBS II | significados no evidentes (ESPECIALIZADO) | Platino B2 */
_registerGames(253, 'Phrasal Verbs Avanzados · Significados', [
  { id:'translate', label:'Significado', xp:25, instr:'Elige el significado correcto.',
    items:[
      { src:'come across', opts:['cruzar','encontrar por casualidad','venir','atravesar a nado'], correct:1 },
      { src:'bring up', opts:['traer arriba','sacar un tema','levantar','subir'], correct:1 },
      { src:'get away with', opts:['escaparse con','salirse con la suya','llevarse lejos','irse con'], correct:1 },
      { src:'fall through', opts:['caer por','fracasar (un plan)','atravesar cayendo','derrumbarse'], correct:1 },
      { src:'come up with', opts:['subir con','idear/proponer','venir con','encontrarse con'], correct:1 },
      { src:'put up with', opts:['poner con','tolerar/soportar','levantar con','alojar'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que significa "come up with"?', opts:['subir con','idear/proponer','venir con','encontrarse'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada phrasal verb con su significado.',
    pairs:[ ['come across','encontrar por casualidad'],['bring up','sacar un tema'],['get away with','salirse con la suya'],['fall through','fracasar'],['come up with','idear'],['put up with','tolerar'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el phrasal verb correcto.',
    sents:[
      { pre:'I ', ans:'came across', post:' an old photo yesterday.', bank:['came across','brought up','fell through','put up with'] },
      { pre:'She ', ans:'came up with', post:' a brilliant idea.', bank:['came up with','came across','got away with','fell through'] },
      { pre:'The deal ', ans:'fell through', post:' at the last minute.', bank:['fell through','came across','brought up','put up with'] },
      { pre:'I cannot ', ans:'put up with', post:' the noise.', bank:['put up with','come across','bring up','fall through'] } ] },
  { id:'scramble', label:'Descifra la particula', xp:20, instr:'Forma la particula.',
    words:[ {scrambled:['S','S','O','R','C','A'],ans:'ACROSS',hint:'come ...'},{scrambled:['P','U'],ans:'UP',hint:'bring ...'},{scrambled:['H','G','U','O','R','H','T'],ans:'THROUGH',hint:'fall ...'},{scrambled:['H','T','I','W'],ans:'WITH',hint:'get away ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada significado es correcto.',
    stmts:[
      { text:'"come across" significa encontrar por casualidad.', ans:true, expl:'Correcto.' },
      { text:'"fall through" significa tener exito.', ans:false, expl:'Falso. significa fracasar.' },
      { text:'"come up with" significa idear o proponer.', ans:true, expl:'Correcto.' },
      { text:'"put up with" significa rechazar.', ans:false, expl:'Falso. significa tolerar.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada phrasal verb por su sentido.',
    categories:['Crear / Encontrar','Problema / Aguantar'],
    items:[ {text:'come up with',correct:0},{text:'fall through',correct:1},{text:'come across',correct:0},{text:'put up with',correct:1},{text:'bring up',correct:0},{text:'get away with',correct:1} ] }
]);

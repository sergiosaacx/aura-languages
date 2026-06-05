/* topic-data-192.js - Juego 192/350 | T28 3/7 PHRASAL VERBS I | emparejamiento con significados (ESPECIALIZADO) | Oro B1 */
_registerGames(192, 'Phrasal Verbs · Significados', [
  { id:'translate', label:'Significado', xp:25, instr:'Elige el significado correcto.',
    items:[
      { src:'break down', opts:['averiarse','construir','recoger','encender'], correct:0 },
      { src:'carry on', opts:['detener','continuar','llevar','apagar'], correct:1 },
      { src:'find out', opts:['perder','averiguar','salir','recoger'], correct:1 },
      { src:'get along with', opts:['llevarse bien con','pelear con','buscar','irse'], correct:0 },
      { src:'look forward to', opts:['temer','esperar con ilusion','mirar atras','olvidar'], correct:1 },
      { src:'set up', opts:['terminar','montar/establecer','romper','bajar'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada phrasal verb con su significado.',
    pairs:[ ['break down','averiarse'],['carry on','continuar'],['find out','averiguar'],['get along with','llevarse bien'],['look forward to','esperar con ilusion'],['set up','establecer'] ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que significa "find out"?', opts:['perder','averiguar','salir','recoger'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el phrasal verb correcto.',
    sents:[
      { pre:'My car ', ans:'broke down', post:' on the way.', bank:['broke down','carried on','found out','set up'] },
      { pre:'I want to ', ans:'find out', post:' the truth.', bank:['find out','break down','carry on','get along'] },
      { pre:'They ', ans:'set up', post:' a new company.', bank:['set up','broke down','found out','carried on'] },
      { pre:'I ', ans:'get along with', post:' my colleagues.', bank:['get along with','break down','carry on','set up'] } ] },
  { id:'scramble', label:'Descifra la particula', xp:20, instr:'Forma la particula.',
    words:[ {scrambled:['N','W','O','D'],ans:'DOWN',hint:'break ...'},{scrambled:['N','O'],ans:'ON',hint:'carry ...'},{scrambled:['T','U','O'],ans:'OUT',hint:'find ...'},{scrambled:['P','U'],ans:'UP',hint:'set ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada significado es correcto.',
    stmts:[
      { text:'"carry on" significa continuar.', ans:true, expl:'Correcto.' },
      { text:'"break down" significa construir.', ans:false, expl:'Falso. break down = averiarse.' },
      { text:'"look forward to" significa esperar con ilusion.', ans:true, expl:'Correcto.' },
      { text:'"set up" significa romper.', ans:false, expl:'Falso. set up = establecer.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada phrasal verb por su sentido.',
    categories:['Significado positivo','Significado de problema'],
    items:[ {text:'get along with',correct:0},{text:'break down',correct:1},{text:'look forward to',correct:0},{text:'run out of',correct:1},{text:'set up',correct:0},{text:'give up',correct:1} ] }
]);

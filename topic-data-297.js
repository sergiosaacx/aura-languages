/* topic-data-297.js - Juego 297/350 | T43 3/7 STYLE & REGISTER | metafora y metonimia (ESPECIALIZADO) | Diamante C1 */
_registerGames(297, 'Metafora y Metonimia en el Ingles Cotidiano', [
  { id:'translate', label:'Significado', xp:25, instr:'Elige el significado real.',
    items:[
      { src:'Time is money', opts:['el tiempo es valioso','el tiempo es dinero literal','no hay tiempo','el dinero pasa'], correct:0 },
      { src:'the crown (metonimia)', opts:['un objeto de oro','la monarquia','una cabeza','una joya'], correct:1 },
      { src:'the press (metonimia)', opts:['una maquina','los medios de comunicacion','presionar','una imprenta'], correct:1 },
      { src:'life is a journey', opts:['un viaje literal','la vida es un proceso con etapas','un viaje corto','vacaciones'], correct:1 },
      { src:'the White House said', opts:['una casa hablo','el gobierno de EE.UU.','un edificio blanco','una familia'], correct:1 },
      { src:'a heart of gold', opts:['un corazon de metal','una persona muy bondadosa','un objeto caro','un organo'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"The crown" para referirse a la monarquia es...', opts:['metafora','metonimia','simil','ironia'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada expresion con su significado real.',
    pairs:[ ['time is money','el tiempo es valioso'],['the crown','la monarquia'],['the press','los medios'],['life is a journey','la vida tiene etapas'],['a heart of gold','muy bondadoso'],['the White House','el gobierno de EE.UU.'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra metaforica correcta.',
    sents:[
      { pre:'She has a heart of ', ans:'gold', post:'.', bank:['gold','stone','iron','wood'] },
      { pre:'Time is ', ans:'money', post:', so use it wisely.', bank:['money','gold','sand','water'] },
      { pre:'Life is a ', ans:'journey', post:', not a destination.', bank:['journey','race','game','box'] },
      { pre:'The ', ans:'press', post:' reported the scandal.', bank:['press','crown','house','chair'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"A heart of gold" significa una persona muy bondadosa.', ans:true, expl:'Correcto. metafora.' },
      { text:'"The crown" se refiere literalmente a una joya.', ans:false, expl:'Falso. metonimia de la monarquia.' },
      { text:'"Life is a journey" es una metafora.', ans:true, expl:'Correcto.' },
      { text:'En la metonimia se usa una palabra por otra relacionada.', ans:true, expl:'Correcto. the press = los medios.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion.',
    categories:['Metafora','Metonimia'],
    items:[ {text:'time is money',correct:0},{text:'the crown',correct:1},{text:'life is a journey',correct:0},{text:'the press',correct:1},{text:'a heart of gold',correct:0},{text:'the White House',correct:1} ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra clave.',
    words:[ {scrambled:['D','L','O','G'],ans:'GOLD',hint:'a heart of ...'},{scrambled:['Y','E','N','O','M'],ans:'MONEY',hint:'time is ...'},{scrambled:['N','W','O','R','C'],ans:'CROWN',hint:'the ... (monarquia)'},{scrambled:['S','S','E','R','P'],ans:'PRESS',hint:'the ... (medios)'} ] }
]);

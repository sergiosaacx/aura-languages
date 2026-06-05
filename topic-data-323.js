/* topic-data-323.js - Juego 323/350 | T47 1/7 IDIOMATIC MASTERY | modismos avanzados (ESPECIALIZADO) | Challenger C2 */
_registerGames(323, 'Modismos Avanzados', [
  { id:'translate', label:'Significado', xp:25, instr:'Elige el significado mas preciso.',
    items:[
      { src:'beat around the bush', opts:['ir al grano','andarse por las ramas','golpear arbustos','perder tiempo limpiando'], correct:1 },
      { src:'burn bridges', opts:['romper relaciones','cruzar un rio','quemar madera','avanzar rapido'], correct:0 },
      { src:'bite off more than you can chew', opts:['comer mucho','abarcar mas de lo que puedes','morder fuerte','elegir bien'], correct:1 },
      { src:'read between the lines', opts:['leer rapido','captar el sentido oculto','subrayar texto','leer en voz alta'], correct:1 },
      { src:'go cold turkey', opts:['dejar algo de golpe','cocinar pavo','enfriarse','rendirse poco a poco'], correct:0 },
      { src:'the ball is in your court', opts:['te toca a ti decidir','jugar al tenis','perder el control','empezar de nuevo'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"beat around the bush" significa...', opts:['ir al grano','andarse por las ramas','trabajar duro','descansar'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada modismo con su significado.',
    pairs:[ ['beat around the bush','andarse por las ramas'],['burn bridges','romper relaciones'],['bite off more than you can chew','abarcar demasiado'],['read between the lines','captar lo implicito'],['go cold turkey','dejar algo de golpe'],['the ball is in your court','te toca decidir'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el modismo correcto.',
    sents:[
      { pre:'Stop beating around the ', ans:'bush', post:' and tell me.', bank:['bush','tree','grass','wall'] },
      { pre:'He quit smoking by going cold ', ans:'turkey', post:'.', bank:['turkey','chicken','duck','fish'] },
      { pre:'You should read between the ', ans:'lines', post:'.', bank:['lines','words','pages','books'] },
      { pre:'Do not burn your ', ans:'bridges', post:' with them.', bank:['bridges','roads','doors','walls'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra clave.',
    words:[ {scrambled:['H','S','U','B'],ans:'BUSH',hint:'beat around the ...'},{scrambled:['S','E','G','D','I','R','B'],ans:'BRIDGES',hint:'burn ...'},{scrambled:['S','E','N','I','L'],ans:'LINES',hint:'read between the ...'},{scrambled:['Y','E','K','R','U','T'],ans:'TURKEY',hint:'go cold ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada significado es correcto.',
    stmts:[
      { text:'"go cold turkey" significa dejar un habito de golpe.', ans:true, expl:'Correcto.' },
      { text:'"beat around the bush" significa ir directo al punto.', ans:false, expl:'Falso. significa rodear el tema.' },
      { text:'"read between the lines" significa captar lo implicito.', ans:true, expl:'Correcto.' },
      { text:'"burn bridges" significa construir relaciones.', ans:false, expl:'Falso. significa romperlas.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada modismo por su tema.',
    categories:['Comunicacion','Decisiones / Acciones'],
    items:[ {text:'beat around the bush',correct:0},{text:'burn bridges',correct:1},{text:'read between the lines',correct:0},{text:'go cold turkey',correct:1},{text:'spill the beans',correct:0},{text:'the ball is in your court',correct:1} ] }
]);

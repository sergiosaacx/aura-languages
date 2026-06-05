/* topic-data-256.js - Juego 256/350 | T37 4/7 PHRASAL VERBS II | modismos literalidad vs significado (ESPECIALIZADO) | Platino B2 */
_registerGames(256, 'Modismos · Literalidad vs Significado', [
  { id:'translate', label:'Significado', xp:25, instr:'Elige el significado real del modismo.',
    items:[
      { src:'spill the beans', opts:['tirar comida','revelar un secreto','cocinar','derramar agua'], correct:1 },
      { src:'break a leg', opts:['romperse algo','buena suerte','caerse','herirse'], correct:1 },
      { src:'raining cats and dogs', opts:['animales cayendo','llover mucho','tormenta de granizo','dia raro'], correct:1 },
      { src:'piece of cake', opts:['postre','muy facil','una porcion','dulce'], correct:1 },
      { src:'hit the books', opts:['golpear libros','estudiar mucho','comprar libros','leer poco'], correct:1 },
      { src:'let the cat out of the bag', opts:['soltar un gato','revelar un secreto','perder algo','jugar'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"spill the beans" significa...', opts:['cocinar','revelar un secreto','derramar algo','comer'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada modismo con su significado.',
    pairs:[ ['spill the beans','revelar un secreto'],['break a leg','buena suerte'],['raining cats and dogs','llover mucho'],['piece of cake','muy facil'],['hit the books','estudiar mucho'],['under the weather','sentirse mal'] ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada significado es correcto.',
    stmts:[
      { text:'"spill the beans" significa revelar un secreto.', ans:true, expl:'Correcto. no es literal.' },
      { text:'"break a leg" significa hacerse dano.', ans:false, expl:'Falso. significa buena suerte.' },
      { text:'"piece of cake" significa que algo es muy facil.', ans:true, expl:'Correcto.' },
      { text:'"raining cats and dogs" se refiere a animales.', ans:false, expl:'Falso. significa llover mucho.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el modismo correcto.',
    sents:[
      { pre:'Do not ', ans:'spill the beans', post:' about the party.', bank:['spill the beans','break a leg','hit the books','piece of cake'] },
      { pre:'The exam was a ', ans:'piece of cake', post:'.', bank:['piece of cake','break a leg','spill the beans','hit the books'] },
      { pre:'I need to ', ans:'hit the books', post:' tonight.', bank:['hit the books','break a leg','spill the beans','piece of cake'] },
      { pre:'It is ', ans:'raining cats and dogs', post:' outside.', bank:['raining cats and dogs','a piece of cake','spilling the beans','hitting the books'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra clave.',
    words:[ {scrambled:['S','N','A','E','B'],ans:'BEANS',hint:'spill the ...'},{scrambled:['G','E','L'],ans:'LEG',hint:'break a ...'},{scrambled:['E','K','A','C'],ans:'CAKE',hint:'piece of ...'},{scrambled:['S','K','O','O','B'],ans:'BOOKS',hint:'hit the ...'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada modismo por su tema.',
    categories:['Secreto / Comunicacion','Dificultad / Estudio'],
    items:[ {text:'spill the beans',correct:0},{text:'piece of cake',correct:1},{text:'let the cat out of the bag',correct:0},{text:'hit the books',correct:1},{text:'keep it under wraps',correct:0},{text:'burn the midnight oil',correct:1} ] }
]);

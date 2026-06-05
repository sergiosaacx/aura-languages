/* topic-data-254.js - Juego 254/350 | T37 2/7 PHRASAL VERBS II | expresiones idiomaticas B2 (ESPECIALIZADO) | Platino B2 */
_registerGames(254, 'Expresiones Idiomaticas B2', [
  { id:'translate', label:'Significado', xp:25, instr:'Elige el significado correcto.',
    items:[
      { src:'bite the bullet', opts:['morder algo','afrontar algo dificil','enfadarse','rendirse'], correct:1 },
      { src:'on the fence', opts:['en la valla','indeciso','encerrado','protegido'], correct:1 },
      { src:'under the weather', opts:['bajo la lluvia','sentirse mal','deprimido por el clima','al aire libre'], correct:1 },
      { src:'once in a blue moon', opts:['de noche','muy raramente','con luna llena','una vez al mes'], correct:1 },
      { src:'hit the nail on the head', opts:['martillar','dar en el clavo','hacerse dano','clavar algo'], correct:1 },
      { src:'cost an arm and a leg', opts:['ser barato','ser carisimo','doler','romperse'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"under the weather" significa...', opts:['bajo la lluvia','sentirse mal','feliz','ocupado'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada modismo con su significado.',
    pairs:[ ['bite the bullet','afrontar algo dificil'],['on the fence','indeciso'],['under the weather','sentirse mal'],['once in a blue moon','muy raramente'],['hit the nail on the head','dar en el clavo'],['cost an arm and a leg','ser carisimo'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el modismo correcto.',
    sents:[
      { pre:'I am feeling ', ans:'under the weather', post:' today.', bank:['under the weather','on the fence','over the moon','out of the blue'] },
      { pre:'I see her ', ans:'once in a blue moon', post:'.', bank:['once in a blue moon','on the fence','under the weather','out of the blue'] },
      { pre:'You really ', ans:'hit the nail on the head', post:'.', bank:['hit the nail on the head','bit the bullet','sat on the fence','broke the ice'] },
      { pre:'That car must ', ans:'cost an arm and a leg', post:'.', bank:['cost an arm and a leg','bite the bullet','hit the road','break a leg'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra clave del modismo.',
    words:[ {scrambled:['T','E','L','L','U','B'],ans:'BULLET',hint:'bite the ...'},{scrambled:['E','C','N','E','F'],ans:'FENCE',hint:'on the ...'},{scrambled:['N','O','O','M'],ans:'MOON',hint:'once in a blue ...'},{scrambled:['L','I','A','N'],ans:'NAIL',hint:'hit the ... on the head'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada significado es correcto.',
    stmts:[
      { text:'"hit the nail on the head" significa dar exactamente en el punto.', ans:true, expl:'Correcto.' },
      { text:'"under the weather" significa estar feliz.', ans:false, expl:'Falso. significa sentirse mal.' },
      { text:'"once in a blue moon" significa muy raramente.', ans:true, expl:'Correcto.' },
      { text:'"on the fence" significa estar decidido.', ans:false, expl:'Falso. significa indeciso.' } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con el modismo correcto.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'How often do you go to the theatre?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Once in a blue moon, honestly.','Under the weather, honestly.','On the fence, honestly.','Out of the blue, honestly.'], correct:0 },
      { speaker:0, text:'You do not look well.', blank:false },
      { speaker:1, text:null, blank:true, opts:['I am a bit under the weather.','I am a bit on the fence.','I am a bit over the moon.','I am a bit out of the blue.'], correct:0 },
      { speaker:0, text:'Get well soon!', blank:false } ] }
]);

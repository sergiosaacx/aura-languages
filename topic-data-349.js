/* topic-data-349.js - Juego 349/350 | T50 6/7 NATIVE FLUENCY | textos autenticos con vocabulario nativo (MEZCLADO) | Challenger C2 */
_registerGames(349, 'Textos Autenticos con Vocabulario Nativo', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"To be honest, the film was a bit of a ___" (decepcion)', opts:['letdown','letup','letout','letoff'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la opcion mas nativa.',
    sents:[
      { pre:'To be honest, the film was a bit of a ', ans:'letdown', post:'.', bank:['letdown','letup','letout','letoff'] },
      { pre:'She landed the job; talk about a lucky ', ans:'break', post:'.', bank:['break','luck','chance','hit'] },
      { pre:'I cannot be bothered to cook; let us just grab a ', ans:'bite', post:'.', bank:['bite','meal','food','snack thing'] },
      { pre:'He gave a half-hearted ', ans:'attempt', post:' at fixing it.', bank:['attempt','try out','do','effort thing'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada hueco con la palabra nativa.',
    pairs:[ ['a bit of a ...','letdown'],['a lucky ...','break'],['grab a ...','bite'],['a half-hearted ...','attempt'],['cannot be ...','bothered'],['it is not my cup of ...','tea'] ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la expresion es nativa.',
    stmts:[
      { text:'"a bit of a letdown" significa una decepcion.', ans:true, expl:'Correcto.' },
      { text:'"a lucky break" significa mala suerte.', ans:false, expl:'Falso. significa un golpe de suerte.' },
      { text:'"grab a bite" significa comer algo rapido.', ans:true, expl:'Correcto.' },
      { text:'"not my cup of tea" significa que algo te encanta.', ans:false, expl:'Falso. significa que no es de tu gusto.' } ] },
  { id:'translate', label:'Mas nativo', xp:25, instr:'Elige la version mas nativa.',
    items:[
      { src:'una decepcion', opts:['a letdown','a sadness','a disappoint','a down'], correct:0 },
      { src:'un golpe de suerte', opts:['a lucky break','a luck hit','a good luck','a fortune punch'], correct:0 },
      { src:'comer algo rapido', opts:['grab a bite','catch a food','take a meal fast','do a snack'], correct:0 },
      { src:'no es de mi gusto', opts:['not my cup of tea','not my tea cup','not of my taste','not my like'], correct:0 },
      { src:'no me molesto', opts:['I cannot be bothered','I cannot be bother','I have no bother','I do not bother me'], correct:0 },
      { src:'un intento a medias', opts:['a half-hearted attempt','a middle attempt','a half try out','a halfway do'], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra nativa.',
    words:[ {scrambled:['N','W','O','D','T','E','L'],ans:'LETDOWN',hint:'a bit of a ...'},{scrambled:['K','A','E','R','B'],ans:'BREAK',hint:'a lucky ...'},{scrambled:['E','T','I','B'],ans:'BITE',hint:'grab a ...'},{scrambled:['A','E','T'],ans:'TEA',hint:'not my cup of ...'} ] }
  ,{ id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion por su sentido.',
    categories:['Decepcion / Negativo','Suerte / Positivo'],
    items:[ {text:'a letdown',correct:0},{text:'a lucky break',correct:1},{text:'not my cup of tea',correct:0},{text:'a golden opportunity',correct:1},{text:'a half-hearted attempt',correct:0},{text:'a stroke of luck',correct:1} ] }
]);

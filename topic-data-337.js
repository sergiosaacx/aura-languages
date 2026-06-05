/* topic-data-337.js - Juego 337/350 | T49 1/7 DISCOURSE ANALYSIS | terminologia (ESPECIALIZADO) | Challenger C2 */
_registerGames(337, 'Terminologia de Analisis del Discurso', [
  { id:'translate', label:'Termino', xp:25, instr:'Elige el termino en ingles.',
    items:[
      { src:'implicatura', opts:['implicature','inference','reference','deixis'], correct:0 },
      { src:'acto de habla', opts:['speech act','speech sound','speech rate','speech turn'], correct:0 },
      { src:'presuposicion', opts:['presupposition','proposition','preposition','position'], correct:0 },
      { src:'matizacion', opts:['hedging','framing','priming','bridging'], correct:0 },
      { src:'deixis', opts:['deixis','syntax','lexis','phonics'], correct:0 },
      { src:'coherencia', opts:['coherence','cohesion','reference','register'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Implicature" se refiere a...', opts:['lo que se comunica sin decirlo','la gramatica','el sonido','el vocabulario'], correct:0 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada termino con su definicion.',
    pairs:[ ['implicature','lo que se comunica sin decirlo'],['speech act','accion realizada al hablar'],['presupposition','lo que se da por sentado'],['hedging','matizar una afirmacion'],['deixis','referencia segun el contexto'],['coherence','sentido logico global'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el termino correcto.',
    sents:[
      { pre:'A request hidden in a question is an ', ans:'implicature', post:'.', bank:['implicature','inference','deixis','register'] },
      { pre:'Promising is a type of ', ans:'speech act', post:'.', bank:['speech act','presupposition','deixis','hedging'] },
      { pre:'"Words like here and now are examples of ', ans:'deixis', post:'."', bank:['deixis','hedging','coherence','register'] },
      { pre:'"It seems that..." is an example of ', ans:'hedging', post:'.', bank:['hedging','deixis','coherence','implicature'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada definicion es correcta.',
    stmts:[
      { text:'"implicature" es lo que se comunica mas alla de lo literal.', ans:true, expl:'Correcto.' },
      { text:'"presupposition" es lo que se afirma explicitamente.', ans:false, expl:'Falso. es lo que se da por sentado.' },
      { text:'"hedging" sirve para matizar.', ans:true, expl:'Correcto.' },
      { text:'"deixis" es independiente del contexto.', ans:false, expl:'Falso. depende del contexto (here, now, this).' } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el termino.',
    words:[ {scrambled:['E','R','U','T','A','C','I','L','P','M','I'],ans:'IMPLICATURE',hint:'lo no dicho'},{scrambled:['S','I','X','I','E','D'],ans:'DEIXIS',hint:'here, now, this'},{scrambled:['G','N','I','G','D','E','H'],ans:'HEDGING',hint:'matizar'},{scrambled:['E','C','N','E','R','E','H','O','C'],ans:'COHERENCE',hint:'sentido global'} ] }
  ,{ id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada termino por su area.',
    categories:['Pragmatica','Cohesion / Estructura'],
    items:[ {text:'implicature',correct:0},{text:'coherence',correct:1},{text:'speech act',correct:0},{text:'deixis',correct:1},{text:'presupposition',correct:0},{text:'reference',correct:1} ] }
]);

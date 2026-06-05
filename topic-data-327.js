/* topic-data-327.js - Juego 327/350 | T47 5/7 IDIOMATIC MASTERY | modismos y proverbios en contexto (MEZCLADO) | Challenger C2 */
_registerGames(327, 'Modismos y Proverbios · En Contexto Narrativo', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Deja de andarte por las ramas y dime que piensas', opts:['Stop beating around the bush and tell me','Stop beating the bush around and tell me','Stop beat around the bush and tell me','Stop the bush beating and tell me'], correct:0 },
      { src:'Abarco mas de lo que podia con ese proyecto', opts:['She bit off more than she could chew with that project','She bit more than chew with that project','She chewed more than she could bite','She bit off more she could chew'], correct:0 },
      { src:'Te toca a ti decidir', opts:['The ball is in your court','The ball is on your court','The ball is your court in','The court ball is in you'], correct:0 },
      { src:'No pongas todos los huevos en una cesta', opts:["Don't put all your eggs in one basket","Don't put all eggs your in one basket","Don't all your eggs put in basket","Don't put your all eggs in one basket"], correct:0 },
      { src:'Mas vale tarde que nunca', opts:['Better late than never','Better never than late','Late better than never','Never late than better'], correct:0 },
      { src:'Los hechos hablan mas que las palabras', opts:['Actions speak louder than words','Words speak louder than actions','Actions louder speak than words','Speak actions louder than words'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Stop beating around the bush" pide que la persona...', opts:['vaya al grano','siga rodeando','descanse','se vaya'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra que completa el modismo.',
    sents:[
      { pre:'Stop beating around the ', ans:'bush', post:'.', bank:['bush','tree','grass','wall'] },
      { pre:'She bit off more than she could ', ans:'chew', post:'.', bank:['chew','eat','bite','swallow'] },
      { pre:'The ball is in your ', ans:'court', post:'.', bank:['court','field','game','hand'] },
      { pre:'Better late than ', ans:'never', post:'.', bank:['never','soon','early','now'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['bush','Stop','beating','around','the'],ans:['Stop','beating','around','the','bush']},{words:['court','The','ball','is','in','your'],ans:['The','ball','is','in','your','court']},{words:['never','Better','late','than'],ans:['Better','late','than','never']} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada uso es correcto.',
    stmts:[
      { text:'"She bit off more than she could chew." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"The ball is on your court." es la forma correcta.', ans:false, expl:'Falso. in your court.' },
      { text:'"Better late than never." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"Beating the bush around" es la forma correcta.', ans:false, expl:'Falso. beating around the bush.' } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'So... well... the thing is... maybe...', blank:false },
      { speaker:1, text:null, blank:true, opts:['Stop beating around the bush!','Stop biting the bullet!','Stop spilling the beans!','Stop breaking the ice!'], correct:0 },
      { speaker:0, text:'I took on five projects at once.', blank:false },
      { speaker:1, text:null, blank:true, opts:['You bit off more than you can chew.','You spilled the beans.','You broke the ice.','You turned a blind eye.'], correct:0 },
      { speaker:0, text:'I know.', blank:false } ] }
  ,{ id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra clave del modismo.',
    words:[ {scrambled:['H','S','U','B'],ans:'BUSH',hint:'beat around the ...'},{scrambled:['W','E','H','C'],ans:'CHEW',hint:'more than you can ...'},{scrambled:['T','R','U','O','C'],ans:'COURT',hint:'the ball is in your ...'},{scrambled:['R','E','V','E','N'],ans:'NEVER',hint:'better late than ...'} ] }
]);

/* topic-data-269.js - Juego 269/350 | T39 3/7 INVERSION | adverbio + estructura (ESPECIALIZADO) | Diamante C1 */
_registerGames(269, 'Estructuras de Inversion', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"No sooner had I left ___ he called."', opts:['when','than','that','then'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada inicio de inversion con su continuacion.',
    pairs:[ ['Not only...','but also'],['No sooner...','than'],['Hardly...','when'],['Little did...','know'],['Scarcely...','scarcely when'],['Only then...','did'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra que completa la estructura.',
    sents:[
      { pre:'No sooner had I left ', ans:'than', post:' he called.', bank:['than','when','that','then'] },
      { pre:'Hardly had I arrived ', ans:'when', post:' it rained.', bank:['when','than','that','then'] },
      { pre:'Not only was she late, ', ans:'but', post:' she also forgot.', bank:['but','than','when','that'] },
      { pre:'Little did he ', ans:'know', post:' what awaited him.', bank:['know','knew','knows','knowing'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['than','No','sooner','had','I','left','he','called'],ans:['No','sooner','had','I','left','than','he','called']},{words:['when','Hardly','had','I','arrived','it','rained'],ans:['Hardly','had','I','arrived','when','it','rained']},{words:['know','Little','did','he','the','truth'],ans:['Little','did','he','know','the','truth']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['No','sooner','had','I','left','when','he','called','.'], wi:5, correct:'than', choices:['than','when','that','then'] },
      { words:['Hardly','had','I','arrived','than','it','rained','.'], wi:4, correct:'when', choices:['when','than','that','then'] },
      { words:['Not','only','was','she','late','and','she','forgot','.'], wi:5, correct:'but', choices:['but','and','than','when'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada estructura es correcta.',
    stmts:[
      { text:'"No sooner had I left than he called." es correcto.', ans:true, expl:'Correcto. No sooner...than.' },
      { text:'"Hardly had I arrived than it rained." es correcto.', ans:false, expl:'Falso. Hardly...when.' },
      { text:'"Not only was she late, but she also forgot." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"Little did he knew the truth." es correcto.', ans:false, expl:'Falso. Little did he know.' } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra de enlace.',
    words:[ {scrambled:['N','A','H','T'],ans:'THAN',hint:'No sooner ...'},{scrambled:['N','E','H','W'],ans:'WHEN',hint:'Hardly ...'},{scrambled:['T','U','B'],ans:'BUT',hint:'Not only ... also'},{scrambled:['W','O','N','K'],ans:'KNOW',hint:'Little did he ...'} ] }
]);

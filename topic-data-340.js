/* topic-data-340.js - Juego 340/350 | T49 4/7 DISCOURSE ANALYSIS | presuposiciones (ESPECIALIZADO) | Challenger C2 */
_registerGames(340, 'Presuposiciones · Lo que se Da por Sentado', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Have you stopped smoking?" presupone que...', opts:['no fumas','fumabas','odias fumar','vendes tabaco'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada enunciado con su presuposicion.',
    pairs:[ ['Have you stopped smoking?','fumabas antes'],['The king of France is bald','hay un rey de Francia'],['My sister is a doctor','tengo una hermana'],['He regrets selling the car','vendio el coche'],['She passed the exam again','ya la habia aprobado antes'],['Close the door','la puerta esta abierta'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la presuposicion correcta.',
    sents:[
      { pre:'"Have you stopped smoking?" presupposes you ', ans:'used to smoke', post:'.', bank:['used to smoke','never smoked','hate smoke','sell tobacco'] },
      { pre:'"My brother is tall" presupposes I ', ans:'have a brother', post:'.', bank:['have a brother','am tall','am an only child','want a brother'] },
      { pre:'"He regrets selling the car" presupposes he ', ans:'sold the car', post:'.', bank:['sold the car','kept the car','bought a car','wants a car'] },
      { pre:'"She is here again" presupposes she ', ans:'was here before', post:'.', bank:['was here before','is leaving','never came','is new'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la presuposicion es correcta.',
    stmts:[
      { text:'"Have you stopped smoking?" presupone que la persona fumaba.', ans:true, expl:'Correcto.' },
      { text:'"My sister is a doctor" no presupone que tengas una hermana.', ans:false, expl:'Falso. si la presupone.' },
      { text:'"He regrets selling the car" presupone que vendio el coche.', ans:true, expl:'Correcto.' },
      { text:'"She passed again" presupone que es la primera vez.', ans:false, expl:'Falso. presupone que ya lo habia hecho antes.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada palabra desencadenante.',
    categories:['Verbo factivo / de cambio','Otro desencadenante'],
    items:[ {text:'stop (smoking)',correct:0},{text:'the (king of France)',correct:1},{text:'regret',correct:0},{text:'my (sister)',correct:1},{text:'again',correct:0},{text:'too (also)',correct:1} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la presuposicion del enunciado.',
    transforms:[
      { original:'"Have you stopped lying?"', task:'Presuposicion', opts:['You used to lie.','You never lied.','You hate lies.','You are honest.'], correct:0 },
      { original:'"He regrets quitting."', task:'Presuposicion', opts:['He quit.','He stayed.','He never started.','He was fired.'], correct:0 },
      { original:'"My daughter studies law."', task:'Presuposicion', opts:['I have a daughter.','I am a lawyer.','I have no children.','I study law.'], correct:0 },
      { original:'"She arrived late again."', task:'Presuposicion', opts:['She arrived late before.','She is always early.','She never arrives.','She left early.'], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el desencadenante.',
    words:[ {scrambled:['P','O','T','S'],ans:'STOP',hint:'have you ...ped smoking'},{scrambled:['T','E','R','G','E','R'],ans:'REGRET',hint:'... selling = lo vendio'},{scrambled:['N','I','A','G','A'],ans:'AGAIN',hint:'... = ya paso antes'},{scrambled:['O','O','T'],ans:'TOO',hint:'... = ademas'} ] }
]);

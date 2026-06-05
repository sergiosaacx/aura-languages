/* topic-data-169.js - Juego 169/350 | T25 1/7 PASSIVE VOICE | reconocimiento basico (ESPECIALIZADO) | Oro B1 */
_registerGames(169, 'Voz Pasiva · Reconocimiento', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion en voz pasiva correcta.',
    items:[
      { src:'El libro es leido por muchos', opts:['Many read the book','The book is read by many','The book reads by many','The book was read by many'], correct:1 },
      { src:'La casa fue construida en 1990', opts:['They built the house in 1990','The house was built in 1990','The house is built in 1990','The house built in 1990'], correct:1 },
      { src:'El ingles se habla en todo el mundo', opts:['People speak English worldwide','English is spoken all over the world','English speaks all over the world','English was spoken worldwide'], correct:1 },
      { src:'La carta fue enviada ayer', opts:['Someone sent the letter','The letter was sent yesterday','The letter is sent yesterday','The letter sent yesterday'], correct:1 },
      { src:'Estos coches son hechos en Japon', opts:['They make these cars','These cars are made in Japan','These cars make in Japan','These cars were made in Japan'], correct:1 },
      { src:'La ventana fue rota', opts:['Someone broke the window','The window was broken','The window is broken now','The window breaks'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Como se forma la pasiva en presente?', opts:['to be + participio','to be + -ing','have + participio','to be + infinitivo'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta de la pasiva.',
    sents:[
      { pre:'The book ', ans:'is', post:' read by many people.', bank:['is','are','was','has'] },
      { pre:'The house ', ans:'was', post:' built in 1990.', bank:['was','is','were','has'] },
      { pre:'English is ', ans:'spoken', post:' worldwide.', bank:['speak','spoken','speaking','speaks'] },
      { pre:'The letters ', ans:'were', post:' sent yesterday.', bank:['were','was','are','has'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el participio.',
    words:[ {scrambled:['N','E','K','O','P','S'],ans:'SPOKEN',hint:'participio de speak'},{scrambled:['T','L','I','U','B'],ans:'BUILT',hint:'participio de build'},{scrambled:['E','D','A','M'],ans:'MADE',hint:'participio de make'},{scrambled:['T','N','E','S'],ans:'SENT',hint:'participio de send'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'La voz pasiva usa "to be + participio".', ans:true, expl:'Correcto. is read, was built.' },
      { text:'"The house built in 1990." es pasiva correcta.', ans:false, expl:'Falso. The house was built.' },
      { text:'"English is spoken worldwide." es pasiva correcta.', ans:true, expl:'Correcto.' },
      { text:'"The book is read." usa la voz activa.', ans:false, expl:'Falso. Es pasiva.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Convierte cada oracion activa en pasiva.',
    transforms:[
      { original:'Many people read this book.', task:'Pasiva', opts:['This book is read by many people.','This book reads by many people.','This book was read.','This book read by many.'], correct:0 },
      { original:'They built the house in 1990.', task:'Pasiva', opts:['The house was built in 1990.','The house is built in 1990.','The house built in 1990.','The house were built in 1990.'], correct:0 },
      { original:'People speak English worldwide.', task:'Pasiva', opts:['English is spoken worldwide.','English speaks worldwide.','English was spoken worldwide.','English spoken worldwide.'], correct:0 },
      { original:'Someone sent the letter.', task:'Pasiva', opts:['The letter was sent.','The letter is sent.','The letter sent.','The letter were sent.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con la pasiva.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Who reads this book?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It is read by millions.','It reads by millions.','It was read by millions now.','It read by millions.'], correct:0 },
      { speaker:0, text:'When was the bridge built?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It was built in 1920.','It is built in 1920.','It built in 1920.','It were built in 1920.'], correct:0 },
      { speaker:0, text:'Interesting!', blank:false } ] }
]);

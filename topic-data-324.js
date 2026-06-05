/* topic-data-324.js - Juego 324/350 | T47 2/7 IDIOMATIC MASTERY | proverbios (ESPECIALIZADO) | Challenger C2 */
_registerGames(324, 'Proverbios · Significado y Aplicacion', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Do not put all your eggs in one basket" aconseja...', opts:['ahorrar comida','diversificar / no arriesgar todo en uno','comer huevos','trabajar duro'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada proverbio con su significado.',
    pairs:[ ['A stitch in time saves nine','actuar a tiempo evita problemas'],['The grass is always greener','lo ajeno parece mejor'],['Do not put all your eggs in one basket','no arriesgar todo en uno'],['Actions speak louder than words','los hechos valen mas que las palabras'],['Better late than never','mas vale tarde que nunca'],['When in Rome, do as the Romans','adaptarse al lugar'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra que completa el proverbio.',
    sents:[
      { pre:'Do not put all your ', ans:'eggs', post:' in one basket.', bank:['eggs','fruit','apples','coins'] },
      { pre:'The grass is always ', ans:'greener', post:' on the other side.', bank:['greener','taller','wetter','softer'] },
      { pre:'Actions speak louder than ', ans:'words', post:'.', bank:['words','sounds','noise','speech'] },
      { pre:'A stitch in time saves ', ans:'nine', post:'.', bank:['nine','ten','five','time'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada aplicacion es correcta.',
    stmts:[
      { text:'"A stitch in time saves nine" aconseja actuar a tiempo.', ans:true, expl:'Correcto.' },
      { text:'"The grass is always greener" significa que tu situacion es la mejor.', ans:false, expl:'Falso. lo ajeno parece mejor.' },
      { text:'"Actions speak louder than words" valora los hechos.', ans:true, expl:'Correcto.' },
      { text:'"Better late than never" significa que nunca hay que llegar tarde.', ans:false, expl:'Falso. mas vale tarde que nunca.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el proverbio para cada situacion.',
    transforms:[
      { original:'no inviertas todo en un solo sitio', task:'Proverbio', opts:['Do not put all your eggs in one basket.','The grass is always greener.','Better late than never.','When in Rome...'], correct:0 },
      { original:'reparar a tiempo evita males mayores', task:'Proverbio', opts:['A stitch in time saves nine.','The grass is always greener.','Actions speak louder than words.','Better late than never.'], correct:0 },
      { original:'los hechos importan mas que hablar', task:'Proverbio', opts:['Actions speak louder than words.','Better late than never.','When in Rome...','The grass is always greener.'], correct:0 },
      { original:'adaptarse a las costumbres del lugar', task:'Proverbio', opts:['When in Rome, do as the Romans do.','Better late than never.','A stitch in time saves nine.','The grass is always greener.'], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra clave.',
    words:[ {scrambled:['S','G','G','E'],ans:'EGGS',hint:'all your ... in one basket'},{scrambled:['R','E','N','E','E','R','G'],ans:'GREENER',hint:'the grass is always ...'},{scrambled:['S','D','R','O','W'],ans:'WORDS',hint:'louder than ...'},{scrambled:['E','N','I','N'],ans:'NINE',hint:'saves ...'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada proverbio por su tema.',
    categories:['Precaucion / Tiempo','Actitud / Comportamiento'],
    items:[ {text:'A stitch in time saves nine',correct:0},{text:'Actions speak louder than words',correct:1},{text:'Do not put all your eggs in one basket',correct:0},{text:'When in Rome, do as the Romans',correct:1},{text:'Better late than never',correct:0},{text:'The grass is always greener',correct:1} ] }
]);

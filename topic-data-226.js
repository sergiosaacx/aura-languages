/* topic-data-226.js - Juego 226/350 | T33 2/7 THE PASSIVE GAME | pasiva de doble objeto (ESPECIALIZADO) | Platino B2 */
_registerGames(226, 'Pasiva de Doble Objeto', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la pasiva correcta (persona como sujeto).',
    items:[
      { src:'Le dieron un premio (a ella)', opts:['She was given a prize','A prize was given her','She gave a prize','She was give a prize'], correct:0 },
      { src:'Me ofrecieron el trabajo', opts:['I was offered the job','The job was offered me','I offered the job','I was offer the job'], correct:0 },
      { src:'Le enviaron una carta', opts:['He was sent a letter','A letter was sent he','He sent a letter','He was send a letter'], correct:0 },
      { src:'Nos contaron la historia', opts:['We were told the story','The story was told we','We told the story','We were tell the story'], correct:0 },
      { src:'Le ensenaron ingles', opts:['She was taught English','English was taught she','She taught English','She was teach English'], correct:0 },
      { src:'Me pagaron bien', opts:['I was paid well','Well was paid me','I paid well','I was pay well'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"They gave her a prize" en pasiva (con ella como sujeto) es...', opts:['She was given a prize','A prize gave her','She gave a prize','Her was given a prize'], correct:0 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada activa con su pasiva.',
    pairs:[ ['They gave her a prize','She was given a prize'],['They offered me the job','I was offered the job'],['They sent him a letter','He was sent a letter'],['They told us the story','We were told the story'],['They taught her English','She was taught English'],['They paid me well','I was paid well'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el participio correcto.',
    sents:[
      { pre:'She was ', ans:'given', post:' a prize.', bank:['given','gave','give','giving'] },
      { pre:'I was ', ans:'offered', post:' the job.', bank:['offered','offer','offering','offers'] },
      { pre:'He was ', ans:'sent', post:' a letter.', bank:['sent','send','sending','sends'] },
      { pre:'We were ', ans:'told', post:' the story.', bank:['told','tell','telling','tells'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['given','She','was','a','prize'],ans:['She','was','given','a','prize']},{words:['offered','I','was','the','job'],ans:['I','was','offered','the','job']},{words:['sent','He','was','a','letter'],ans:['He','was','sent','a','letter']} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"She was given a prize." es una pasiva de doble objeto correcta.', ans:true, expl:'Correcto. la persona como sujeto.' },
      { text:'"A prize was given to her." tambien es correcta.', ans:true, expl:'Correcto. el objeto como sujeto.' },
      { text:'"She was give a prize." es correcta.', ans:false, expl:'Falso. given (participio).' },
      { text:'En la pasiva de doble objeto solo el objeto directo puede ser sujeto.', ans:false, expl:'Falso. la persona tambien puede.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada pasiva por su sujeto.',
    categories:['Persona como sujeto','Cosa como sujeto'],
    items:[ {text:'She was given a prize',correct:0},{text:'A prize was given to her',correct:1},{text:'I was offered the job',correct:0},{text:'The job was offered to me',correct:1},{text:'He was sent a letter',correct:0},{text:'A letter was sent to him',correct:1} ] }
]);

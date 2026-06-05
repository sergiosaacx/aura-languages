/* topic-data-215.js - Juego 215/350 | T31 5/7 PERFECT TIMING | Past Perfect y Continuo en narrativa (MEZCLADO) | Platino B2 */
_registerGames(215, 'Past Perfect y Continuo · En Narrativa', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Para cuando llegamos, la pelicula ya habia empezado', opts:['By the time we arrived, the film already started','By the time we arrived, the film had already started','By the time we arrived, the film has already started','By the time we arrived, the film was already started'], correct:1 },
      { src:'Habia estado llorando durante horas antes de contarnos', opts:['She was crying for hours before she told us','She had been crying for hours before she told us','She has been crying for hours before she told us','She had crying for hours before she told us'], correct:1 },
      { src:'El estaba cansado porque habia estado corriendo', opts:['He was tired because he ran','He was tired because he had been running','He was tired because he has run','He was tired because he was run'], correct:1 },
      { src:'Ya habian comido cuando llegue', opts:['They already ate when I arrived','They had already eaten when I arrived','They have already eaten when I arrived','They were already eaten when I arrived'], correct:1 },
      { src:'Yo habia estado esperando una hora', opts:['I was waiting for an hour','I had been waiting for an hour','I have been waiting for an hour','I had waiting for an hour'], correct:1 },
      { src:'Cuando me desperte, habia dejado de nevar', opts:['When I woke up, it stopped snowing','When I woke up, it had stopped snowing','When I woke up, it has stopped snowing','When I woke up, it was stopped snowing'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'She ___ for hours before she told us. (cry)', opts:['was crying','had been crying','has been crying','had crying'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'By the time we arrived, the film had ', ans:'started', post:'.', bank:['started','start','starting','starts'] },
      { pre:'She had been ', ans:'crying', post:' for hours.', bank:['crying','cried','cry','cries'] },
      { pre:'He was tired because he had been ', ans:'running', post:'.', bank:['running','ran','run','runs'] },
      { pre:'They had already ', ans:'eaten', post:' when I arrived.', bank:['eaten','eat','ate','eating'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['had','By','then','the','film','started'],ans:['By','then','the','film','had','started']},{words:['been','She','had','crying','for','hours'],ans:['She','had','been','crying','for','hours']},{words:['had','They','already','eaten'],ans:['They','had','already','eaten']} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion correcta.',
    transforms:[
      { original:'film / start (antes de llegar)', task:'Past Perfect', opts:['The film had started.','The film has started.','The film started.','The film was started.'], correct:0 },
      { original:'she / cry / hours (duracion antes)', task:'Past Perfect Cont.', opts:['She had been crying for hours.','She was crying for hours.','She has been crying for hours.','She had crying for hours.'], correct:0 },
      { original:'he / run (duracion antes)', task:'Past Perfect Cont.', opts:['He had been running.','He was running.','He has been running.','He had running.'], correct:0 },
      { original:'they / eat (antes de llegar)', task:'Past Perfect', opts:['They had eaten.','They have eaten.','They ate.','They were eaten.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Why were her eyes red?', blank:false },
      { speaker:1, text:null, blank:true, opts:['She had been crying for hours.','She was crying for hours.','She has been crying for hours.','She had crying for hours.'], correct:0 },
      { speaker:0, text:'Did you see the start of the film?', blank:false },
      { speaker:1, text:null, blank:true, opts:['No, it had already started.','No, it has already started.','No, it already started.','No, it was already started.'], correct:0 },
      { speaker:0, text:'What a pity.', blank:false } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['D','A','H'],ans:'HAD',hint:'auxiliar'},{scrambled:['N','E','E','B'],ans:'BEEN',hint:'had ... crying'},{scrambled:['G','N','I','Y','R','C'],ans:'CRYING',hint:'had been ...'},{scrambled:['N','E','T','A','E'],ans:'EATEN',hint:'participio de eat'} ] }
]);

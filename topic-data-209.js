/* topic-data-209.js - Juego 209/350 | T30 6/7 WORD BUILDER | prefijos y sufijos en texto real (MEZCLADO) | Oro B1 */
_registerGames(209, 'Prefijos y Sufijos · En Texto Real', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'His ___ surprised everyone. (kind)', opts:['kind','kindness','kindly','kinding'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra derivada correcta.',
    sents:[
      { pre:'His ', ans:'kindness', post:' surprised everyone. (kind)', bank:['kindness','kind','kindly','kinding'] },
      { pre:'The project was ', ans:'incomplete', post:'. (complete)', bank:['incomplete','uncomplete','discomplete','complete'] },
      { pre:'She is a ', ans:'successful', post:' lawyer. (success)', bank:['successful','success','succeed','successfully'] },
      { pre:'Please ', ans:'rewrite', post:' this. (write)', bank:['rewrite','unwrite','miswrite','write'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"incomplete" significa no completo.', ans:true, expl:'Correcto. in- = no.' },
      { text:'"kindness" es el sustantivo de kind.', ans:true, expl:'Correcto.' },
      { text:'"successful" es un verbo.', ans:false, expl:'Falso. es adjetivo. el verbo es succeed.' },
      { text:'"rewrite" significa escribir mal.', ans:false, expl:'Falso. re- = de nuevo.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la palabra derivada correcta.',
    transforms:[
      { original:'kind (sustantivo)', task:'Deriva', opts:['kindness','kind','kindly','kinding'], correct:0 },
      { original:'complete (negativo)', task:'Deriva', opts:['incomplete','uncomplete','discomplete','complete'], correct:0 },
      { original:'success (adjetivo)', task:'Deriva', opts:['successful','success','succeed','successfully'], correct:0 },
      { original:'write (de nuevo)', task:'Deriva', opts:['rewrite','unwrite','miswrite','write'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'How was his behaviour?', blank:false },
      { speaker:1, text:null, blank:true, opts:['His kindness surprised us.','His kind surprised us.','His kindly surprised us.','His kinding surprised us.'], correct:0 },
      { speaker:0, text:'Is the report finished?', blank:false },
      { speaker:1, text:null, blank:true, opts:['No, it is still incomplete.','No, it is still uncomplete.','No, it is still discomplete.','No, it is still complete.'], correct:0 },
      { speaker:0, text:'Keep working then.', blank:false } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada combinacion con la palabra correcta.',
    pairs:[ ['kind + ness','kindness'],['in + complete','incomplete'],['success + ful','successful'],['re + write','rewrite'],['care + less','careless'],['un + lock','unlock'] ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'His kindness surprised everyone.', type:'select', opts:['His kindness surprised everyone.','His kind surprised everyone.','His kindly surprised everyone.','His kinding surprised everyone.'], correct:0 },
      { tts:'The work is incomplete.', type:'select', opts:['The work is incomplete.','The work is uncomplete.','The work is discomplete.','The work is complete.'], correct:0 },
      { tts:'She is a successful writer.', type:'select', opts:['She is a successful writer.','She is a success writer.','She is a succeed writer.','She is a successfully writer.'], correct:0 } ] }
]);

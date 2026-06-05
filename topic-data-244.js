/* topic-data-244.js - Juego 244/350 | T35 6/7 NOUN POWER | nominalizaciones y colocaciones en texto (MEZCLADO) | Platino B2 */
_registerGames(244, 'Nominalizaciones y Colocaciones · En Texto', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'The ___ to close the factory affected 500 workers. (decide)', opts:['decide','decision','decisive','deciding'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'The ', ans:'decision', post:' to close the factory affected 500 workers.', bank:['decision','decide','decisive','deciding'] },
      { pre:'She ', ans:'made', post:' great progress in her studies.', bank:['made','did','took','gave'] },
      { pre:'They must ', ans:'take', post:' responsibility for the error.', bank:['take','make','do','give'] },
      { pre:'The ', ans:'analysis', post:' of the data took weeks.', bank:['analysis','analyse','analysing','analysed'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada elemento con su forma correcta.',
    pairs:[ ['decide (sustantivo)','decision'],['make + ?','progress'],['take + ?','responsibility'],['analyse (sustantivo)','analysis'],['pay + ?','attention'],['do + ?','research'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['decision','The','affected','workers'],ans:['The','decision','affected','workers']},{words:['progress','She','made','great'],ans:['She','made','great','progress']},{words:['responsibility','They','took'],ans:['They','took','responsibility']} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"She made great progress." es correcto.', ans:true, expl:'Correcto. make progress.' },
      { text:'"The decide to close" es correcto.', ans:false, expl:'Falso. The decision to close.' },
      { text:'"They took responsibility." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"She did great progress." es correcto.', ans:false, expl:'Falso. made great progress.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la forma correcta.',
    transforms:[
      { original:'decide (sustantivo)', task:'Forma', opts:['decision','decide','decisive','deciding'], correct:0 },
      { original:'make + progreso', task:'Colocacion', opts:['make progress','do progress','take progress','give progress'], correct:0 },
      { original:'take + responsabilidad', task:'Colocacion', opts:['take responsibility','make responsibility','do responsibility','give responsibility'], correct:0 },
      { original:'analyse (sustantivo)', task:'Forma', opts:['analysis','analyse','analysing','analysed'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'How are her studies going?', blank:false },
      { speaker:1, text:null, blank:true, opts:['She has made great progress.','She has done great progress.','She has took great progress.','She has gave great progress.'], correct:0 },
      { speaker:0, text:'Who is responsible for the error?', blank:false },
      { speaker:1, text:null, blank:true, opts:['They took responsibility for it.','They made responsibility for it.','They did responsibility for it.','They gave responsibility for it.'], correct:0 },
      { speaker:0, text:'Good.', blank:false } ] }
]);

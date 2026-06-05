/* topic-data-306.js - Juego 306/350 | T44 5/7 COLLOCATION MASTER | colocaciones en oraciones avanzadas (MEZCLADO) | Diamante C1 */
_registerGames(306, 'Colocaciones · En Oraciones Avanzadas', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion con la colocacion correcta.',
    items:[
      { src:'Hizo una contribucion significativa al campo', opts:['She did a significant contribution to the field','She made a significant contribution to the field','She took a significant contribution','She gave a significant contribution'], correct:1 },
      { src:'La noticia fue una sorpresa total', opts:['The news came as a complete surprise','The news did a complete surprise','The news made a complete surprise to us','The news took a complete surprise'], correct:0 },
      { src:'Prestaron mucha atencion', opts:['They paid close attention','They did close attention','They made close attention','They gave close attention strongly'], correct:0 },
      { src:'Llevaron a cabo un experimento', opts:['They made an experiment','They carried out an experiment','They did out an experiment','They took an experiment'], correct:1 },
      { src:'Tuvo un gran impacto', opts:['It made a strong impact','It had a strong impact','It did a strong impact','It took a strong impact'], correct:1 },
      { src:'Asumio la responsabilidad', opts:['He made responsibility','He took responsibility','He did responsibility','He gave responsibility'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"She ___ a significant contribution."', opts:['did','made','took','gave'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el verbo colocacional correcto.',
    sents:[
      { pre:'She ', ans:'made', post:' a significant contribution.', bank:['made','did','took','gave'] },
      { pre:'They ', ans:'carried out', post:' the experiment.', bank:['carried out','made','did','took'] },
      { pre:'It ', ans:'had', post:' a strong impact.', bank:['had','made','did','took'] },
      { pre:'He ', ans:'took', post:' responsibility.', bank:['took','made','did','gave'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['made','She','a','contribution'],ans:['She','made','a','contribution']},{words:['out','They','carried','the','experiment'],ans:['They','carried','out','the','experiment']},{words:['had','It','a','strong','impact'],ans:['It','had','a','strong','impact']} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"She made a significant contribution." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"The news made a complete surprise." es correcto.', ans:false, expl:'Falso. came as a complete surprise.' },
      { text:'"They carried out an experiment." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"It made a strong impact." es la colocacion convencional.', ans:false, expl:'Falso. had a strong impact.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la colocacion correcta.',
    transforms:[
      { original:'contribucion (verbo)', task:'Colocacion', opts:['make a contribution','do a contribution','take a contribution','give a contribution'], correct:0 },
      { original:'experimento (verbo)', task:'Colocacion', opts:['carry out an experiment','make an experiment','do out an experiment','take an experiment'], correct:0 },
      { original:'impacto (verbo)', task:'Colocacion', opts:['have an impact','make an impact strongly','do an impact','take an impact'], correct:0 },
      { original:'responsabilidad (verbo)', task:'Colocacion', opts:['take responsibility','make responsibility','do responsibility','give responsibility'], correct:0 } ] },
  { id:'scramble', label:'Descifra el verbo', xp:20, instr:'Forma el verbo.',
    words:[ {scrambled:['E','D','A','M'],ans:'MADE',hint:'... a contribution'},{scrambled:['D','A','H'],ans:'HAD',hint:'... an impact'},{scrambled:['K','O','O','T'],ans:'TOOK',hint:'... responsibility'},{scrambled:['Y','A','P'],ans:'PAY',hint:'... attention'} ] }
]);

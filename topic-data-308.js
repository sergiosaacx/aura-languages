/* topic-data-308.js - Juego 308/350 | T44 7/7 COLLOCATION MASTER | errores de colocaciones (MEZCLADO) | Diamante C1 */
_registerGames(308, 'Colocaciones · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la colocacion correcta.',
    items:[
      { src:'Hizo una gran actuacion', opts:['She did a great performance','She gave a great performance','She made a great performance','She took a great performance'], correct:1 },
      { src:'El clima tuvo un fuerte impacto', opts:['The weather made a strong impact','The weather had a strong impact','The weather did a strong impact','The weather took a strong impact'], correct:1 },
      { src:'Cometio un error en sus calculos', opts:['He took a mistake','He made a mistake','He did a mistake','He gave a mistake'], correct:1 },
      { src:'Prestaron atencion', opts:['They gave attention','They paid attention','They made attention','They did attention'], correct:1 },
      { src:'Llevaron a cabo el plan', opts:['They made out the plan','They carried out the plan','They did out the plan','They took out the plan'], correct:1 },
      { src:'Alcanzaron un acuerdo', opts:['They made an agreement','They reached an agreement','They did an agreement','They took an agreement'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['did a performance','gave a performance','made a performance','took a performance'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['did a great performance','gave a great performance'],['made a strong impact','had a strong impact'],['took a mistake','made a mistake'],['gave attention','paid attention'],['made out the plan','carried out the plan'],['made an agreement','reached an agreement'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['gave','She','a','performance'],ans:['She','gave','a','performance']},{words:['had','It','a','strong','impact'],ans:['It','had','a','strong','impact']},{words:['made','He','a','mistake'],ans:['He','made','a','mistake']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el verbo incorrecto y elige la correccion.',
    sents:[
      { words:['She','did','a','great','performance','.'], wi:1, correct:'gave', choices:['gave','did','made','took'] },
      { words:['It','made','a','strong','impact','.'], wi:1, correct:'had', choices:['had','made','did','took'] },
      { words:['He','took','a','mistake','.'], wi:1, correct:'made', choices:['made','took','did','gave'] } ] },
  { id:'scramble', label:'Descifra el verbo', xp:20, instr:'Forma el verbo correcto.',
    words:[ {scrambled:['E','V','A','G'],ans:'GAVE',hint:'... a performance'},{scrambled:['D','A','H'],ans:'HAD',hint:'... an impact'},{scrambled:['E','D','A','M'],ans:'MADE',hint:'... a mistake'},{scrambled:['D','I','A','P'],ans:'PAID',hint:'... attention'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"She gave a great performance." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"The weather made a strong impact." es correcto.', ans:false, expl:'Falso. had a strong impact.' },
      { text:'"He made a mistake." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"They gave attention." es correcto.', ans:false, expl:'Falso. paid attention.' } ] }
]);

/* topic-data-205.js - Juego 205/350 | T30 2/7 WORD BUILDER | sufijos categoria gramatical (ESPECIALIZADO) | Oro B1 */
_registerGames(205, 'Sufijos · Categoria Gramatical', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que sufijo convierte "happy" en sustantivo?', opts:['-ful','-ness','-ly','-ize'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada sufijo con la categoria que forma.',
    pairs:[ ['-ness','sustantivo'],['-ful','adjetivo'],['-ly','adverbio'],['-ize','verbo'],['-tion','sustantivo (accion)'],['-less','adjetivo (sin)'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra derivada correcta.',
    sents:[
      { pre:'happy + -ness = ', ans:'happiness', post:' (sustantivo).', bank:['happiness','happyness','happly','happyful'] },
      { pre:'care + -ful = ', ans:'careful', post:' (adjetivo).', bank:['careful','careness','carely','careize'] },
      { pre:'quick + -ly = ', ans:'quickly', post:' (adverbio).', bank:['quickly','quickness','quickful','quickize'] },
      { pre:'modern + -ize = ', ans:'modernize', post:' (verbo).', bank:['modernize','modernness','modernly','modernful'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['-ness','happy','plus','equals','happiness'],ans:['happy','plus','-ness','equals','happiness']},{words:['-ful','care','plus','equals','careful'],ans:['care','plus','-ful','equals','careful']},{words:['-ly','quick','plus','equals','quickly'],ans:['quick','plus','-ly','equals','quickly']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra mal formada y elige la correccion.',
    sents:[
      { words:['He','answered','quick','.'], wi:2, correct:'quickly', choices:['quickly','quick','quickness','quickful'] },
      { words:['Her','happyness','surprised','us','.'], wi:1, correct:'happiness', choices:['happiness','happyness','happily','happyful'] },
      { words:['This','is','a','use','tool','.'], wi:3, correct:'useful', choices:['useful','use','useless','usely'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada regla es correcta.',
    stmts:[
      { text:'"-ness" forma sustantivos (happiness).', ans:true, expl:'Correcto.' },
      { text:'"-ly" forma adjetivos.', ans:false, expl:'Falso. -ly forma adverbios.' },
      { text:'"-ize" forma verbos (modernize).', ans:true, expl:'Correcto.' },
      { text:'"-ful" forma adverbios.', ans:false, expl:'Falso. -ful forma adjetivos.' } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'Her happiness surprised everyone.', type:'select', opts:['Her happiness surprised everyone.','Her happy surprised everyone.','Her happily surprised everyone.','Her happyness surprised everyone.'], correct:0 },
      { tts:'He is a careful driver.', type:'select', opts:['He is a careful driver.','He is a careless driver.','He is a care driver.','He is a carely driver.'], correct:0 },
      { tts:'She finished quickly.', type:'select', opts:['She finished quickly.','She finished quick.','She finished quickness.','She finished quickful.'], correct:0 } ] }
]);

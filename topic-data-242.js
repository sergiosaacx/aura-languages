/* topic-data-242.js - Juego 242/350 | T35 4/7 NOUN POWER | colocaciones nominales (ESPECIALIZADO) | Platino B2 */
_registerGames(242, 'Colocaciones Nominales', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['do a decision','make a decision','take a decision quickly always','give a decision'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada verbo con su colocacion correcta.',
    pairs:[ ['make','a decision'],['pay','attention'],['do','research'],['take','responsibility'],['make','progress'],['have','an effect'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el verbo correcto.',
    sents:[
      { pre:'She had to ', ans:'make', post:' a decision.', bank:['make','do','take','give'] },
      { pre:'Please ', ans:'pay', post:' attention.', bank:['pay','make','do','give'] },
      { pre:'They ', ans:'did', post:' a lot of research.', bank:['did','made','took','gave'] },
      { pre:'You must ', ans:'take', post:' responsibility.', bank:['take','make','do','give'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada colocacion es correcta.',
    stmts:[
      { text:'"make a decision" es la colocacion correcta.', ans:true, expl:'Correcto.' },
      { text:'"do a mistake" es correcto.', ans:false, expl:'Falso. make a mistake.' },
      { text:'"pay attention" es la colocacion correcta.', ans:true, expl:'Correcto.' },
      { text:'"make research" es correcto.', ans:false, expl:'Falso. do research.' } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el verbo incorrecto y elige la correccion.',
    sents:[
      { words:['She','did','a','mistake','.'], wi:1, correct:'made', choices:['made','did','took','gave'] },
      { words:['They','make','research','.'], wi:1, correct:'do', choices:['do','make','take','give'] },
      { words:['He','gave','attention','.'], wi:1, correct:'paid', choices:['paid','gave','made','did'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada colocacion por su verbo.',
    categories:['make','do','take'],
    items:[ {text:'a decision',correct:0},{text:'research',correct:1},{text:'responsibility',correct:2},{text:'progress',correct:0},{text:'homework',correct:1},{text:'a break',correct:2} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'She made a decision.', type:'select', opts:['She made a decision.','She did a decision.','She took a decision now.','She gave a decision.'], correct:0 },
      { tts:'Please pay attention.', type:'select', opts:['Please pay attention.','Please make attention.','Please do attention.','Please give attention.'], correct:0 },
      { tts:'They did research.', type:'select', opts:['They did research.','They made research.','They took research.','They gave research.'], correct:0 } ] }
]);

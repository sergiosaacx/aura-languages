/* topic-data-305.js - Juego 305/350 | T44 4/7 COLLOCATION MASTER | restricciones colocacionales (ESPECIALIZADO) | Diamante C1 */
_registerGames(305, 'Restricciones Colocacionales', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual viola una restriccion colocacional?', opts:['make a mistake','do a mistake','strong wind','heavy traffic'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada colocacion es correcta.',
    stmts:[
      { text:'"do a mistake" es correcto.', ans:false, expl:'Falso. make a mistake.' },
      { text:'"strong wind" es correcto.', ans:true, expl:'Correcto.' },
      { text:'"make research" es correcto.', ans:false, expl:'Falso. do research.' },
      { text:'"heavy traffic" es correcto.', ans:true, expl:'Correcto.' } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su forma correcta.',
    pairs:[ ['do a mistake','make a mistake'],['make research','do research'],['give a speech (wrong: take)','give a speech'],['strong rain','heavy rain'],['make harm','do harm'],['do a decision','make a decision'] ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el verbo o adjetivo incorrecto y elige la correccion.',
    sents:[
      { words:['She','did','a','mistake','.'], wi:1, correct:'made', choices:['made','did','took','gave'] },
      { words:['They','make','research','.'], wi:1, correct:'do', choices:['do','make','take','give'] },
      { words:['We','had','strong','rain','.'], wi:2, correct:'heavy', choices:['heavy','strong','deep','high'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada colocacion.',
    categories:['Correcta','Incorrecta'],
    items:[ {text:'make a mistake',correct:0},{text:'do a mistake',correct:1},{text:'heavy rain',correct:0},{text:'strong rain',correct:1},{text:'do research',correct:0},{text:'make research',correct:1} ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'She ', ans:'made', post:' a mistake.', bank:['made','did','took','gave'] },
      { pre:'They ', ans:'did', post:' research.', bank:['did','made','took','gave'] },
      { pre:'There was ', ans:'heavy', post:' traffic.', bank:['heavy','strong','deep','high'] },
      { pre:'It was a ', ans:'strong', post:' wind.', bank:['strong','heavy','deep','high'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['E','D','A','M'],ans:'MADE',hint:'... a mistake'},{scrambled:['D','I','D'],ans:'DID',hint:'... research'},{scrambled:['Y','V','A','E','H'],ans:'HEAVY',hint:'... traffic'},{scrambled:['G','N','O','R','T','S'],ans:'STRONG',hint:'... wind'} ] }
]);

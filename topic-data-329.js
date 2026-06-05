/* topic-data-329.js - Juego 329/350 | T47 7/7 IDIOMATIC MASTERY | modismos deformados (MEZCLADO) | Challenger C2 */
_registerGames(329, 'Modismos Deformados o Usados Incorrectamente', [
  { id:'translate', label:'Forma correcta', xp:25, instr:'Elige la forma correcta del modismo.',
    items:[
      { src:'morder la mano que te da de comer', opts:['bite the arm that feeds you','bite the hand that feeds you','bite the hand that gives you','eat the hand that feeds you'], correct:1 },
      { src:'matar dos pajaros de un tiro', opts:['kill two birds with one rock','kill two birds with one stone','kill two birds with a shot','hit two birds with one stone'], correct:1 },
      { src:'la punta del iceberg', opts:['the tip of the iceberg','the top of the iceberg','the point of the iceberg','the edge of the iceberg'], correct:0 },
      { src:'costar un ojo de la cara', opts:['cost an arm and a leg','cost an arm and a foot','cost a leg and an eye','cost an eye and a hand'], correct:0 },
      { src:'una vez cada muerte de obispo', opts:['once in a blue moon','once in a red moon','once in a full moon','once in a blue sun'], correct:0 },
      { src:'dar en el clavo', opts:['hit the nail on the head','hit the head on the nail','hit the nail on the top','put the nail on the head'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es la forma correcta?', opts:['bite the arm that feeds you','bite the hand that feeds you','bite the leg that feeds you','eat the hand that feeds you'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada modismo deformado con su forma correcta.',
    pairs:[ ['bite the arm that feeds you','bite the hand that feeds you'],['kill two birds with one rock','kill two birds with one stone'],['the top of the iceberg','the tip of the iceberg'],['cost an arm and a foot','cost an arm and a leg'],['once in a red moon','once in a blue moon'],['hit the head on the nail','hit the nail on the head'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['hand','bite','the','that','feeds','you'],ans:['bite','the','hand','that','feeds','you']},{words:['stone','kill','two','birds','with','one'],ans:['kill','two','birds','with','one','stone']},{words:['iceberg','the','tip','of','the'],ans:['the','tip','of','the','iceberg']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['bite','the','arm','that','feeds','you','.'], wi:2, correct:'hand', choices:['hand','arm','leg','foot'] },
      { words:['kill','two','birds','with','one','rock','.'], wi:5, correct:'stone', choices:['stone','rock','brick','ball'] },
      { words:['the','top','of','the','iceberg','.'], wi:1, correct:'tip', choices:['tip','top','point','edge'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['D','N','A','H'],ans:'HAND',hint:'bite the ... that feeds you'},{scrambled:['E','N','O','T','S'],ans:'STONE',hint:'two birds with one ...'},{scrambled:['P','I','T'],ans:'TIP',hint:'the ... of the iceberg'},{scrambled:['N','O','O','M'],ans:'MOON',hint:'once in a blue ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si el modismo es correcto.',
    stmts:[
      { text:'"bite the hand that feeds you" es la forma correcta.', ans:true, expl:'Correcto.' },
      { text:'"kill two birds with one rock" es correcto.', ans:false, expl:'Falso. with one stone.' },
      { text:'"the tip of the iceberg" es correcto.', ans:true, expl:'Correcto.' },
      { text:'"once in a red moon" es la forma correcta.', ans:false, expl:'Falso. blue moon.' } ] }
]);

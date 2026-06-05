/* topic-data-202.js - Juego 202/350 | T29 6/7 LINK IT UP | conectores y relativos en texto (MEZCLADO) | Oro B1 */
_registerGames(202, 'Conectores y Relativos · En Texto', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'The company ___ I work for is successful.', opts:['who','which','where','whose'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta.',
    sents:[
      { pre:'The company ', ans:'which', post:' I work for is successful.', bank:['which','who','where','whose'] },
      { pre:'The salary is good. ', ans:'However', post:', the hours are long.', bank:['However','Therefore','Moreover','Because'] },
      { pre:'The man ', ans:'who', post:' hired me is kind.', bank:['who','which','where','whose'] },
      { pre:'I love my job. ', ans:'Moreover', post:', it pays well.', bank:['Moreover','However','Therefore','Although'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"The company which I work for" usa el relativo correcto.', ans:true, expl:'Correcto. which = cosa.' },
      { text:'"However" puede unir dos ideas en contraste.', ans:true, expl:'Correcto.' },
      { text:'"The man which hired me" es correcto.', ans:false, expl:'Falso. The man who hired me.' },
      { text:'"Therefore" introduce un contraste.', ans:false, expl:'Falso. introduce resultado.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la opcion correcta.',
    transforms:[
      { original:'empresa (cosa) donde trabajo', task:'Relativo', opts:['the company which I work for','the company who I work for','the company where I work for it','the company whose I work for'], correct:0 },
      { original:'unir contraste', task:'Marcador', opts:['However, the pay is low.','Therefore, the pay is low.','Moreover, the pay is low.','Because the pay is low.'], correct:0 },
      { original:'persona que me contrato', task:'Relativo', opts:['the man who hired me','the man which hired me','the man where hired me','the man whose hired me'], correct:0 },
      { original:'anadir un punto positivo', task:'Marcador', opts:['Moreover, it pays well.','However, it pays well.','Therefore, it pays well.','Although it pays well.'], correct:0 } ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'The company which I work for is successful.', type:'select', opts:['The company which I work for is successful.','The company who I work for is successful.','The company where I work for is successful.','The company whose I work for is successful.'], correct:0 },
      { tts:'However, the salary is not high.', type:'select', opts:['However, the salary is not high.','Therefore, the salary is not high.','Moreover, the salary is not high.','Because the salary is not high.'], correct:0 },
      { tts:'The man who hired me is kind.', type:'select', opts:['The man who hired me is kind.','The man which hired me is kind.','The man where hired me is kind.','The man whose hired me is kind.'], correct:0 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada hueco con la palabra correcta.',
    pairs:[ ['company (cosa)','which'],['contraste','however'],['persona','who'],['adicion','moreover'],['lugar','where'],['posesion','whose'] ] },
  { id:'scramble', label:'Descifra el relativo', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['H','C','I','H','W'],ans:'WHICH',hint:'para cosas'},{scrambled:['O','H','W'],ans:'WHO',hint:'para personas'},{scrambled:['E','S','O','H','W'],ans:'WHOSE',hint:'posesion'},{scrambled:['E','R','E','H','W'],ans:'WHERE',hint:'lugar'} ] }
]);

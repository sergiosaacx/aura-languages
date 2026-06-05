/* topic-data-260.js - Juego 260/350 | T38 1/7 ACADEMIC WRITING | conectores academicos reconocimiento (ESPECIALIZADO) | Platino B2 */
_registerGames(260, 'Conectores Academicos · Reconocimiento', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el conector academico correcto.',
    items:[
      { src:'ademas', opts:['furthermore','but','so','then'], correct:0 },
      { src:'en contraste', opts:['in contrast','because','therefore','also'], correct:0 },
      { src:'como resultado', opts:['as a result','however','moreover','although'], correct:0 },
      { src:'en conclusion', opts:['in conclusion','first','meanwhile','besides'], correct:0 },
      { src:'con respecto a', opts:['with regard to','because of','instead of','due to'], correct:0 },
      { src:'no obstante', opts:['notwithstanding','therefore','as well','moreover'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que conector expresa resultado en un texto academico?', opts:['furthermore','as a result','in contrast','with regard to'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada conector academico con su significado.',
    pairs:[ ['furthermore','ademas'],['in contrast','en contraste'],['as a result','como resultado'],['in conclusion','en conclusion'],['with regard to','con respecto a'],['notwithstanding','no obstante'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el conector academico correcto.',
    sents:[
      { pre:'', ans:'Furthermore', post:', the data supports the hypothesis.', bank:['Furthermore','But','So','Then'] },
      { pre:'', ans:'In contrast', post:', the second group showed no change.', bank:['In contrast','Because','Therefore','Also'] },
      { pre:'', ans:'As a result', post:', the experiment was repeated.', bank:['As a result','However','Moreover','Although'] },
      { pre:'', ans:'In conclusion', post:', further research is needed.', bank:['In conclusion','First','Meanwhile','Besides'] } ] },
  { id:'scramble', label:'Descifra el conector', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['E','R','O','M','R','E','H','T','R','U','F'],ans:'FURTHERMORE',hint:'ademas'},{scrambled:['T','S','A','R','T','N','O','C'],ans:'CONTRAST',hint:'in ...'},{scrambled:['T','L','U','S','E','R'],ans:'RESULT',hint:'as a ...'},{scrambled:['D','R','A','G','E','R'],ans:'REGARD',hint:'with ... to'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada significado es correcto.',
    stmts:[
      { text:'"furthermore" expresa adicion.', ans:true, expl:'Correcto. ademas.' },
      { text:'"in contrast" expresa resultado.', ans:false, expl:'Falso. expresa contraste.' },
      { text:'"as a result" expresa consecuencia.', ans:true, expl:'Correcto.' },
      { text:'"in conclusion" se usa para empezar un texto.', ans:false, expl:'Falso. se usa para cerrar.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada conector por su funcion.',
    categories:['Adicion','Contraste','Resultado'],
    items:[ {text:'furthermore',correct:0},{text:'in contrast',correct:1},{text:'as a result',correct:2},{text:'moreover',correct:0},{text:'however',correct:1},{text:'therefore',correct:2} ] }
]);

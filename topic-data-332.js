/* topic-data-332.js - Juego 332/350 | T48 3/7 GRAMMAR EDGE | arcaismos en uso actual (ESPECIALIZADO) | Challenger C2 */
_registerGames(332, 'Arcaismos en Uso Actual', [
  { id:'translate', label:'Equivalente moderno', xp:25, instr:'Elige el equivalente moderno.',
    items:[
      { src:'henceforth', opts:['from now on','until now','long ago','meanwhile'], correct:0 },
      { src:'albeit', opts:['although','because','therefore','unless'], correct:0 },
      { src:'heretofore', opts:['until now','from now on','soon','never'], correct:0 },
      { src:'forthwith', opts:['immediately','later','slowly','perhaps'], correct:0 },
      { src:'methinks', opts:['I think','I doubt','I forget','I refuse'], correct:0 },
      { src:'whilst', opts:['while','before','after','since'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Henceforth" significa...', opts:['de ahora en adelante','hasta ahora','hace tiempo','mientras tanto'], correct:0 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada arcaismo con su equivalente moderno.',
    pairs:[ ['henceforth','from now on'],['albeit','although'],['heretofore','until now'],['forthwith','immediately'],['methinks','I think'],['whilst','while'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el arcaismo correcto.',
    sents:[
      { pre:'The contract is valid ', ans:'henceforth', post:'.', bank:['henceforth','heretofore','methinks','whilst'] },
      { pre:'He succeeded, ', ans:'albeit', post:' with difficulty.', bank:['albeit','forthwith','methinks','heretofore'] },
      { pre:'Please respond ', ans:'forthwith', post:'.', bank:['forthwith','heretofore','methinks','whilst'] },
      { pre:'This was, ', ans:'heretofore', post:', unknown.', bank:['heretofore','forthwith','methinks','henceforth'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada equivalencia es correcta.',
    stmts:[
      { text:'"henceforth" significa de ahora en adelante.', ans:true, expl:'Correcto.' },
      { text:'"heretofore" significa de ahora en adelante.', ans:false, expl:'Falso. significa hasta ahora.' },
      { text:'"forthwith" significa inmediatamente.', ans:true, expl:'Correcto.' },
      { text:'"albeit" significa porque.', ans:false, expl:'Falso. significa aunque.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada arcaismo por su contexto tipico.',
    categories:['Legal / Formal','Literario / Arcaico'],
    items:[ {text:'henceforth',correct:0},{text:'methinks',correct:1},{text:'forthwith',correct:0},{text:'whilst',correct:1},{text:'heretofore',correct:0},{text:'albeit',correct:1} ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el arcaismo.',
    words:[ {scrambled:['H','T','R','O','F','E','C','N','E','H'],ans:'HENCEFORTH',hint:'de ahora en adelante'},{scrambled:['T','I','E','B','L','A'],ans:'ALBEIT',hint:'aunque'},{scrambled:['H','T','I','W','H','T','R','O','F'],ans:'FORTHWITH',hint:'inmediatamente'},{scrambled:['S','K','N','I','H','T','E','M'],ans:'METHINKS',hint:'I think'} ] }
]);

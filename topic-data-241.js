/* topic-data-241.js - Juego 241/350 | T35 3/7 NOUN POWER | sustantivos compuestos (ESPECIALIZADO) | Platino B2 */
_registerGames(241, 'Sustantivos Compuestos', [
  { id:'translate', label:'Significado', xp:25, instr:'Elige el significado correcto.',
    items:[
      { src:'traffic jam', opts:['semaforo','atasco de trafico','multa','cruce'], correct:1 },
      { src:'deadline', opts:['fecha limite','linea muerta','frontera','meta'], correct:0 },
      { src:'breakthrough', opts:['ruptura','avance importante','descanso','fractura'], correct:1 },
      { src:'drawback', opts:['ventaja','desventaja','dibujo','retroceso fisico'], correct:1 },
      { src:'feedback', opts:['comida','retroalimentacion','retorno','respuesta automatica'], correct:1 },
      { src:'outcome', opts:['salida','resultado','llegada','ingreso'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que significa "deadline"?', opts:['fecha limite','linea muerta','frontera','meta'], correct:0 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada sustantivo compuesto con su significado.',
    pairs:[ ['traffic jam','atasco'],['deadline','fecha limite'],['breakthrough','avance'],['drawback','desventaja'],['feedback','retroalimentacion'],['outcome','resultado'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el sustantivo compuesto correcto.',
    sents:[
      { pre:'We were stuck in a ', ans:'traffic jam', post:' for an hour.', bank:['traffic jam','deadline','feedback','outcome'] },
      { pre:'The ', ans:'deadline', post:' is next Friday.', bank:['deadline','drawback','breakthrough','feedback'] },
      { pre:'Thanks for your ', ans:'feedback', post:' on my essay.', bank:['feedback','deadline','outcome','traffic jam'] },
      { pre:'The main ', ans:'drawback', post:' is the cost.', bank:['drawback','breakthrough','feedback','outcome'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el sustantivo compuesto.',
    words:[ {scrambled:['E','N','I','L','D','A','E','D'],ans:'DEADLINE',hint:'fecha limite'},{scrambled:['E','M','O','C','T','U','O'],ans:'OUTCOME',hint:'resultado'},{scrambled:['K','C','A','B','D','E','E','F'],ans:'FEEDBACK',hint:'retroalimentacion'},{scrambled:['K','C','A','B','W','A','R','D'],ans:'DRAWBACK',hint:'desventaja'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada significado es correcto.',
    stmts:[
      { text:'"deadline" significa fecha limite.', ans:true, expl:'Correcto.' },
      { text:'"drawback" significa ventaja.', ans:false, expl:'Falso. drawback = desventaja.' },
      { text:'"breakthrough" significa avance importante.', ans:true, expl:'Correcto.' },
      { text:'"feedback" significa comida.', ans:false, expl:'Falso. feedback = retroalimentacion.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada compuesto por su sentido.',
    categories:['Positivo','Negativo / Neutro'],
    items:[ {text:'breakthrough',correct:0},{text:'drawback',correct:1},{text:'feedback',correct:0},{text:'traffic jam',correct:1},{text:'outcome',correct:0},{text:'deadline',correct:1} ] }
]);

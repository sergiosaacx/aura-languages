/* topic-data-199.js - Juego 199/350 | T29 3/7 LINK IT UP | marcadores funcion logica (ESPECIALIZADO) | Oro B1 */
_registerGames(199, 'Marcadores del Discurso · Funcion Logica', [
  { id:'translate', label:'Funcion', xp:25, instr:'Elige el marcador que cumple esa funcion.',
    items:[
      { src:'expresar contraste', opts:['however','therefore','moreover','so'], correct:0 },
      { src:'expresar resultado', opts:['however','therefore','moreover','but'], correct:1 },
      { src:'anadir informacion', opts:['however','moreover','therefore','although'], correct:1 },
      { src:'expresar concesion', opts:['although','therefore','moreover','so'], correct:0 },
      { src:'expresar consecuencia', opts:['however','consequently','moreover','but'], correct:1 },
      { src:'mostrar oposicion', opts:['nevertheless','therefore','moreover','and'], correct:0 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada marcador con su funcion.',
    pairs:[ ['however','contraste'],['therefore','resultado'],['moreover','adicion'],['although','concesion'],['consequently','consecuencia'],['furthermore','informacion extra'] ] },
  { id:'scramble', label:'Descifra el marcador', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['E','R','O','F','E','R','E','H','T'],ans:'THEREFORE',hint:'por lo tanto'},{scrambled:['R','E','V','E','W','O','H'],ans:'HOWEVER',hint:'sin embargo'},{scrambled:['H','G','U','O','H','T','L','A'],ans:'ALTHOUGH',hint:'aunque'},{scrambled:['O','S'],ans:'SO',hint:'entonces'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada marcador por su funcion logica.',
    categories:['Contraste/Concesion','Resultado','Adicion'],
    items:[ {text:'however',correct:0},{text:'therefore',correct:1},{text:'moreover',correct:2},{text:'although',correct:0},{text:'consequently',correct:1},{text:'furthermore',correct:2} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con el marcador correcto.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'It was expensive. Which word shows contrast?', blank:false },
      { speaker:1, text:null, blank:true, opts:['However, it was worth it.','Therefore, it was worth it.','Moreover, it was worth it.','Because it was worth it.'], correct:0 },
      { speaker:0, text:'He trained hard. Which shows result?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Therefore, he won.','However, he won.','Moreover, he won.','Although he won.'], correct:0 },
      { speaker:0, text:'Exactly.', blank:false } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que marcador expresa resultado?', opts:['however','therefore','moreover','although'], correct:1 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada funcion es correcta.',
    stmts:[
      { text:'"however" introduce un contraste.', ans:true, expl:'Correcto.' },
      { text:'"therefore" introduce una adicion.', ans:false, expl:'Falso. introduce resultado.' },
      { text:'"although" expresa concesion.', ans:true, expl:'Correcto. aunque.' },
      { text:'"moreover" expresa contraste.', ans:false, expl:'Falso. expresa adicion.' } ] }
]);

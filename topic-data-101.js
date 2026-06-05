/* topic-data-101.js - Juego 101/350 | T15 3/7 HOW MUCH? | a few / a little / a lot of (ESPECIALIZADO) | Plata A2 */
_registerGames(101, 'A Few / A Little / A Lot Of', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el cuantificador correcto.',
    items:[
      { src:'unos pocos libros', opts:['a little books','a few books','much books','a lot books'], correct:1 },
      { src:'un poco de agua', opts:['a few water','a little water','many water','a lot water'], correct:1 },
      { src:'muchos amigos', opts:['a lot of friends','a little friends','much friends','a few of friends'], correct:0 },
      { src:'pocas manzanas', opts:['a little apples','a few apples','much apples','a lot apple'], correct:1 },
      { src:'un poco de dinero', opts:['a few money','a little money','many money','a few of money'], correct:1 },
      { src:'mucha agua', opts:['a lot of water','a few water','many water','a little of water'], correct:0 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada cuantificador con su uso.',
    pairs:[ ['a few','con contables'],['a little','con incontables'],['a lot of','con ambos'],['a few apples','pocos (contable)'],['a little water','poco (incontable)'],['a lot of money','mucho (incontable)'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['W','E','F'],ans:'FEW',hint:'a ... books (contable)'},{scrambled:['E','L','I','T','T','L'],ans:'LITTLE',hint:'a ... water'},{scrambled:['T','O','L'],ans:'LOT',hint:'a ... of'},{scrambled:['Y','N','A','M'],ans:'MANY',hint:'... books'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada regla es correcta.',
    stmts:[
      { text:'"a few" se usa con sustantivos contables.', ans:true, expl:'Correcto. a few books.' },
      { text:'"a little" se usa con contables.', ans:false, expl:'Falso. a little + incontables.' },
      { text:'"a lot of" se usa con contables e incontables.', ans:true, expl:'Correcto. a lot of books / water.' },
      { text:'"a few water" es correcto.', ans:false, expl:'Falso. water es incontable: a little water.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el cuantificador correcto.',
    transforms:[
      { original:'books (pocos)', task:'Cuantificador', opts:['a few books','a little books','much books','a lot book'], correct:0 },
      { original:'water (poco)', task:'Cuantificador', opts:['a little water','a few water','many water','a lot water'], correct:0 },
      { original:'friends (muchos)', task:'Cuantificador', opts:['a lot of friends','a little friends','much friends','a few of friends'], correct:0 },
      { original:'money (poco)', task:'Cuantificador', opts:['a little money','a few money','many money','a lot money'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'How much sugar do you want?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Just a little, please.','Just a few, please.','Just many, please.','Just a few of, please.'], correct:0 },
      { speaker:0, text:'And how many cookies?', blank:false },
      { speaker:1, text:null, blank:true, opts:['A few, please.','A little, please.','Much, please.','A little of, please.'], correct:0 },
      { speaker:0, text:'Okay!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada sustantivo segun a few o a little.',
    categories:['Contable (a few)','Incontable (a little)'],
    items:[ {text:'books',correct:0},{text:'water',correct:1},{text:'apples',correct:0},{text:'money',correct:1},{text:'friends',correct:0},{text:'time',correct:1} ] }
]);

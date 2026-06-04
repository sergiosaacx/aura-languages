/* topic-data-044.js - Juego 44/350 | T7 2/7 COLOR YOUR WORDS | Orden de adjetivos (ESPECIALIZADO) | Bronce A1 */
_registerGames(44, 'Orden de Adjetivos', [
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Cual es correcto?',
    opts:['a car red','a red car','red a car','car red a'], correct:1 },
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada frase con error con su version correcta.',
    pairs:[ ['a car red','a red car'],['a house big','a big house'],['a dog black','a black dog'],['a old big house','a big old house'],['a dress blue','a blue dress'],['a tall man old','a tall old man'] ] },
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:['car','a','red'], ans:['a','red','car'] },
      { words:['old','a','house','big'], ans:['a','big','old','house'] },
      { words:['dress','a','blue'], ans:['a','blue','dress'] } ] },
  { id:'transform', label:'Transforma', xp:35,
    instr:'Pon los adjetivos en el orden correcto.',
    transforms:[
      { original:'a car red', task:'Orden correcto', opts:['a red car','a car red','red car a','a red cars'], correct:0 },
      { original:'a house big old', task:'Orden correcto', opts:['a big old house','a old big house','a house big old','a big house old'], correct:0 },
      { original:'a dress blue', task:'Orden correcto', opts:['a blue dress','a dress blue','blue a dress','a blue dresses'], correct:0 },
      { original:'a man tall old', task:'Orden correcto', opts:['a tall old man','a old tall man','a man tall old','a tall man old'], correct:0 } ] },
  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada adjetivo segun su tipo.',
    categories:['Tamano','Color','Edad'],
    items:[ {text:'big',correct:0},{text:'red',correct:1},{text:'old',correct:2},{text:'small',correct:0},{text:'blue',correct:1},{text:'new',correct:2} ] },
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma el adjetivo.',
    words:[ {scrambled:['G','I','B'],ans:'BIG',hint:'tamano grande'},{scrambled:['D','E','R'],ans:'RED',hint:'un color'},{scrambled:['D','L','O'],ans:'OLD',hint:'edad: viejo'},{scrambled:['L','A','M','L','S'],ans:'SMALL',hint:'tamano pequeno'} ] },
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la frase que oyes.',
    items:[
      { tts:'a big old house', type:'select', opts:['a big old house','a old big house','a house big old','a big house old'], correct:0 },
      { tts:'a beautiful red car', type:'select', opts:['a beautiful red car','a red beautiful car','a car beautiful red','a beautiful car red'], correct:0 },
      { tts:'a small black dog', type:'select', opts:['a small black dog','a black small dog','a dog small black','a small dog black'], correct:0 } ] }
]);

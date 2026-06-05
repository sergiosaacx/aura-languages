/* topic-data-103.js - Juego 103/350 | T15 5/7 HOW MUCH? | cuantificadores en oraciones (MEZCLADO) | Plata A2 */
_registerGames(103, 'Cuantificadores · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Hay pocos estudiantes', opts:['There are a little students','There are a few students','There are much students','There is a few students'], correct:1 },
      { src:'No tengo mucho tiempo', opts:["I don't have many time","I don't have much time","I don't have a few time","I don't have a lot time"], correct:1 },
      { src:'Ella bebe mucha agua', opts:['She drinks many water','She drinks a lot of water','She drinks a few water','She drinks many waters'], correct:1 },
      { src:'Tengo pocos amigos aqui', opts:['I have a little friends','I have a few friends','I have much friends','I have a few of friends'], correct:1 },
      { src:'Hay mucha gente', opts:['There are a few people','There are a lot of people','There is many people','There are much people'], correct:1 },
      { src:'Necesitamos un poco de leche', opts:['We need a few milk','We need a little milk','We need many milk','We need a few of milk'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada frase en espanol con su forma en ingles.',
    pairs:[ ['pocos estudiantes','a few students'],['mucho tiempo','much time'],['mucha agua','a lot of water'],['pocas manzanas','a few apples'],['poco dinero','a little money'],['muchos coches','a lot of cars'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['W','E','F'],ans:'FEW',hint:'a ... students'},{scrambled:['H','C','U','M'],ans:'MUCH',hint:'... time'},{scrambled:['T','O','L'],ans:'LOT',hint:'a ... of water'},{scrambled:['E','L','I','T','T','L'],ans:'LITTLE',hint:'a ... milk'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada frase segun el tipo de sustantivo.',
    categories:['Contable','Incontable'],
    items:[ {text:'a few students',correct:0},{text:'much time',correct:1},{text:'a lot of water',correct:1},{text:'a few apples',correct:0},{text:'many cars',correct:0},{text:'a little milk',correct:1} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['a few','There','are','students'],ans:['There','are','a few','students']},{words:['much',"don't",'I','have','time'],ans:['I',"don't",'have','much','time']},{words:['a lot of','She','drinks','water'],ans:['She','drinks','a lot of','water']} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'How many students are in the class?', blank:false },
      { speaker:1, text:null, blank:true, opts:['There are a few students.','There are a little students.','There are much students.','There is a few students.'], correct:0 },
      { speaker:0, text:'Do you have much free time?', blank:false },
      { speaker:1, text:null, blank:true, opts:["No, I don't have much time.","No, I don't have many time.","No, I don't have a few time.","No, I don't have a lot time."], correct:0 },
      { speaker:0, text:'Me neither.', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el cuantificador incorrecto y elige la correccion.',
    sents:[
      { words:['There','are','a little','students','.'], wi:2, correct:'a few', choices:['a few','a little','much','a lot'] },
      { words:['I','have','many','time','.'], wi:2, correct:'much', choices:['much','many','a few','a lot'] },
      { words:['She','drinks','many','water','.'], wi:2, correct:'a lot of', choices:['a lot of','many','a few','much'] } ] }
]);

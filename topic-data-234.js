/* topic-data-234.js - Juego 234/350 | T34 3/7 REPORTED ADVANCED | verbo de reporte -> patron (ESPECIALIZADO) | Platino B2 */
_registerGames(234, 'Verbo de Reporte a Patron Gramatical', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Sugirieron ir al cine', opts:['They suggested to go to the cinema','They suggested going to the cinema','They suggested go to the cinema','They suggested that going'], correct:1 },
      { src:'El admitio haber mentido', opts:['He admitted to lie','He admitted lying','He admitted lie','He admitted to lying'], correct:1 },
      { src:'Lo acusaron de robar', opts:['They accused him to steal','They accused him of stealing','They accused him for stealing','They accused him stealing'], correct:1 },
      { src:'Nos advirtio que no fueramos', opts:['She warned us to not go','She warned us not to go','She warned us not going','She warned us no go'], correct:1 },
      { src:'Me aconsejo estudiar', opts:['He advised me to study','He advised me studying','He advised me study','He advised me to studying'], correct:0 },
      { src:'Ella nego haberlo tomado', opts:['She denied to take it','She denied taking it','She denied take it','She denied to taking it'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"suggest" va seguido de...', opts:['to + infinitivo','-ing o that','of + -ing','not to'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada verbo con su patron.',
    pairs:[ ['suggest','+ -ing / that'],['admit','+ -ing'],['accuse','+ of + -ing'],['warn','+ not to + inf'],['advise','+ objeto + to + inf'],['insist','+ on + -ing'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la preposicion o palabra.',
    words:[ {scrambled:['F','O'],ans:'OF',hint:'accuse ... -ing'},{scrambled:['T','O','N'],ans:'NOT',hint:'warn ... to'},{scrambled:['N','O'],ans:'ON',hint:'insist ... -ing'},{scrambled:['T','A','H','T'],ans:'THAT',hint:'suggest ...'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada verbo por su patron.',
    categories:['+ -ing','+ preposicion + -ing','+ to + infinitivo'],
    items:[ {text:'admit',correct:0},{text:'accuse',correct:1},{text:'advise',correct:2},{text:'deny',correct:0},{text:'insist',correct:1},{text:'warn',correct:2} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What did they propose?', blank:false },
      { speaker:1, text:null, blank:true, opts:['They suggested going to the cinema.','They suggested to go to the cinema.','They suggested go to the cinema.','They suggested that going.'], correct:0 },
      { speaker:0, text:'Did he confess?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, he admitted lying.','Yes, he admitted to lie.','Yes, he admitted lie.','Yes, he admitted to lying.'], correct:0 },
      { speaker:0, text:'I see.', blank:false } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada patron es correcto.',
    stmts:[
      { text:'"accuse" usa "of + -ing".', ans:true, expl:'Correcto. accused of stealing.' },
      { text:'"advise" usa "advise + objeto + to + infinitivo".', ans:true, expl:'Correcto. advised me to study.' },
      { text:'"admit" usa "to + infinitivo".', ans:false, expl:'Falso. admit + -ing.' },
      { text:'"warn" usa "warn + not to + infinitivo".', ans:true, expl:'Correcto.' } ] }
]);

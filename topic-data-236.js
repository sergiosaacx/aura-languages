/* topic-data-236.js - Juego 236/350 | T34 5/7 REPORTED ADVANCED | verbos de reporte en oraciones (MEZCLADO) | Platino B2 */
_registerGames(236, 'Verbos de Reporte Avanzados · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Ella nego haber tomado el dinero', opts:['She denied to take the money','She denied having taken the money','She denied take the money','She denied taken the money'], correct:1 },
      { src:'El nos advirtio que no fueramos alli', opts:['He warned us to not go there','He warned us not to go there','He warned us not going there','He warned us no go there'], correct:1 },
      { src:'Sugirieron ir al cine', opts:['They suggested to go to the cinema','They suggested going to the cinema','They suggested go to the cinema','They suggested that going'], correct:1 },
      { src:'Lo acusaron de hacer trampa', opts:['They accused him to cheat','They accused him of cheating','They accused him for cheating','They accused him cheating'], correct:1 },
      { src:'El admitio haber roto la ventana', opts:['He admitted to break the window','He admitted breaking the window','He admitted break the window','He admitted broken the window'], correct:1 },
      { src:'Insistio en pagar', opts:['He insisted to pay','He insisted on paying','He insisted paying','He insisted in paying'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'She denied ___ the money. (take)', opts:['to take','having taken','take','taken'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'She denied ', ans:'having taken', post:' the money.', bank:['having taken','to take','take','taken'] },
      { pre:'He warned us ', ans:'not to go', post:' there.', bank:['not to go','to not go','not going','no to go'] },
      { pre:'They suggested ', ans:'going', post:' to the cinema.', bank:['going','to go','go','gone'] },
      { pre:'They accused him ', ans:'of cheating', post:'.', bank:['of cheating','to cheat','for cheating','cheating'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['taken','She','denied','having','the','money'],ans:['She','denied','having','taken','the','money']},{words:['go','He','warned','us','not','to'],ans:['He','warned','us','not','to','go']},{words:['cheating','They','accused','him','of'],ans:['They','accused','him','of','cheating']} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la oracion de reporte correcta.',
    transforms:[
      { original:'deny / take money', task:'Reporte', opts:['She denied having taken the money.','She denied to take the money.','She denied take the money.','She denied taken the money.'], correct:0 },
      { original:'warn / not go there', task:'Reporte', opts:['He warned us not to go there.','He warned us to not go there.','He warned us not going there.','He warned us no go there.'], correct:0 },
      { original:'suggest / go cinema', task:'Reporte', opts:['They suggested going to the cinema.','They suggested to go to the cinema.','They suggested go to the cinema.','They suggested that going.'], correct:0 },
      { original:'admit / break window', task:'Reporte', opts:['He admitted breaking the window.','He admitted to break the window.','He admitted break the window.','He admitted broken the window.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Did she confess?', blank:false },
      { speaker:1, text:null, blank:true, opts:['No, she denied taking the money.','No, she denied to take the money.','No, she denied take the money.','No, she denied taken the money.'], correct:0 },
      { speaker:0, text:'What did he say about the trip?', blank:false },
      { speaker:1, text:null, blank:true, opts:['He warned us not to go there.','He warned us to not go there.','He warned us not going there.','He warned us no go there.'], correct:0 },
      { speaker:0, text:'Good advice.', blank:false } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el verbo o palabra.',
    words:[ {scrambled:['D','E','I','N','E','D'],ans:'DENIED',hint:'pasado de deny'},{scrambled:['F','O'],ans:'OF',hint:'accuse ... -ing'},{scrambled:['N','R','A','W'],ans:'WARN',hint:'advertir'},{scrambled:['N','O'],ans:'ON',hint:'insist ... -ing'} ] }
]);

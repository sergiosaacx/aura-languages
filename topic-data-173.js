/* topic-data-173.js - Juego 173/350 | T25 5/7 PASSIVE VOICE | Pasivas en diferentes tiempos (MEZCLADO) | Oro B1 */
_registerGames(173, 'Pasivas · En Diferentes Tiempos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la pasiva correcta.',
    items:[
      { src:'Este puente fue construido en 1920', opts:['This bridge built in 1920','This bridge was built in 1920','This bridge is built in 1920','This bridge builds in 1920'], correct:1 },
      { src:'El ingles se habla en todo el mundo', opts:['English speaks worldwide','English is spoken all over the world','English was spoken worldwide','English spoke worldwide'], correct:1 },
      { src:'El informe debe terminarse hoy', opts:['The report must finished today','The report must be finished today','The report must been finished today','The report must finish today'], correct:1 },
      { src:'Las casas son limpiadas cada semana', opts:['The houses clean every week','The houses are cleaned every week','The houses were cleaned every week','The houses cleaned every week'], correct:1 },
      { src:'El cuadro fue robado anoche', opts:['The painting stole last night','The painting was stolen last night','The painting is stolen last night','The painting steals last night'], correct:1 },
      { src:'Estos productos se hacen en China', opts:['These products make in China','These products are made in China','These products were made in China','These products made in China'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada tiempo con su forma pasiva.',
    pairs:[ ['presente','is spoken'],['pasado','was built'],['con modal','must be finished'],['presente plural','are cleaned'],['pasado plural','were stolen'],['presente (made)','are made'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el participio.',
    words:[ {scrambled:['T','L','I','U','B'],ans:'BUILT',hint:'participio de build'},{scrambled:['N','E','K','O','P','S'],ans:'SPOKEN',hint:'participio de speak'},{scrambled:['E','B'],ans:'BE',hint:'must ... finished'},{scrambled:['E','D','A','M'],ans:'MADE',hint:'participio de make'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada pasiva segun el tiempo.',
    categories:['Presente','Pasado','Con modal'],
    items:[ {text:'is spoken',correct:0},{text:'was built',correct:1},{text:'must be done',correct:2},{text:'are made',correct:0},{text:'were stolen',correct:1},{text:'can be fixed',correct:2} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['was','This','bridge','built','in','1920'],ans:['This','bridge','was','built','in','1920']},{words:['is','English','spoken','worldwide'],ans:['English','is','spoken','worldwide']},{words:['be','The','report','must','finished'],ans:['The','report','must','be','finished']} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'When was this bridge built?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It was built in 1920.','It built in 1920.','It is built in 1920.','It builds in 1920.'], correct:0 },
      { speaker:0, text:'Where are these cars made?', blank:false },
      { speaker:1, text:null, blank:true, opts:['They are made in Germany.','They make in Germany.','They were made in Germany.','They made in Germany.'], correct:0 },
      { speaker:0, text:'I see.', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['This','bridge','built','in','1920','.'], wi:2, correct:'was built', choices:['was built','built','is built','builds'] },
      { words:['English','speaks','worldwide','.'], wi:1, correct:'is spoken', choices:['is spoken','speaks','spoke','spoken'] },
      { words:['The','report','must','finished','.'], wi:3, correct:'be finished', choices:['be finished','finished','finish','finishes'] } ] }
]);

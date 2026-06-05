/* topic-data-326.js - Juego 326/350 | T47 4/7 IDIOMATIC MASTERY | origen historico de modismos (ESPECIALIZADO) | Challenger C2 */
_registerGames(326, 'Origen Historico de Modismos', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Bite the bullet" se asocia historicamente a...', opts:['soldados que mordian una bala durante operaciones','cazadores','panaderos','marineros'], correct:0 },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si el origen es correcto (no un mito).',
    stmts:[
      { text:'"Bite the bullet" se relaciona con soldados que mordian algo durante cirugias sin anestesia.', ans:true, expl:'Correcto. origen ampliamente aceptado.' },
      { text:'"Let the cat out of the bag" no tiene relacion literal con gatos como mascotas modernas.', ans:true, expl:'Correcto. se vincula a fraudes de mercado.' },
      { text:'"Spill the beans" significa derramar frijoles literalmente como origen.', ans:false, expl:'Falso. se refiere a revelar un secreto.' },
      { text:'"Break the ice" originalmente describia romper hielo para barcos y luego paso a lo social.', ans:true, expl:'Correcto.' } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada modismo con su origen aceptado.',
    pairs:[ ['bite the bullet','cirugias sin anestesia'],['break the ice','romper hielo para barcos'],['let the cat out of the bag','fraudes de mercado'],['caught red-handed','sangre en las manos'],['turn a blind eye','un almirante que ignoro senales'],['pull out all the stops','registros de organo'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra clave del modismo.',
    sents:[
      { pre:'I will just have to bite the ', ans:'bullet', post:'.', bank:['bullet','bread','rope','stone'] },
      { pre:'Let me break the ', ans:'ice', post:' with a joke.', bank:['ice','wall','silence','door'] },
      { pre:'He was caught red-', ans:'handed', post:'.', bank:['handed','faced','eyed','footed'] },
      { pre:'They turned a blind ', ans:'eye', post:' to the problem.', bank:['eye','ear','face','hand'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada explicacion.',
    categories:['Origen aceptado','Mito popular'],
    items:[ {text:'bite the bullet (cirugias)',correct:0},{text:'spill the beans (frijoles caidos)',correct:1},{text:'break the ice (barcos)',correct:0},{text:'raining cats and dogs (mascotas del tejado)',correct:1},{text:'caught red-handed (sangre)',correct:0},{text:'turn a blind eye (broma sin base)',correct:1} ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra clave.',
    words:[ {scrambled:['T','E','L','L','U','B'],ans:'BULLET',hint:'bite the ...'},{scrambled:['E','C','I'],ans:'ICE',hint:'break the ...'},{scrambled:['E','Y','E'],ans:'EYE',hint:'turn a blind ...'},{scrambled:['D','E','D','N','A','H'],ans:'HANDED',hint:'caught red-...'} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'I really do not want to do this, but...', blank:false },
      { speaker:1, text:null, blank:true, opts:["You will just have to bite the bullet.","You will just have to spill the beans.","You will just have to break a leg.","You will just have to turn a blind eye."], correct:0 },
      { speaker:0, text:'The party felt awkward at first.', blank:false },
      { speaker:1, text:null, blank:true, opts:['Someone had to break the ice.','Someone had to bite the bullet.','Someone had to spill the beans.','Someone had to pull a leg.'], correct:0 },
      { speaker:0, text:'True.', blank:false } ] }
]);

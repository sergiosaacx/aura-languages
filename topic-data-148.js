/* topic-data-148.js - Juego 148/350 | T22 1/7 USED TO | used to habitos pasados (ESPECIALIZADO) | Oro B1 */
_registerGames(148, 'Used To · Habitos Pasados', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la estructura correcta con used to.',
    items:[
      { src:'Yo solia fumar', opts:['I use to smoke','I used to smoke','I used to smoking','I am used to smoke'], correct:1 },
      { src:'Ella solia vivir aqui', opts:['She use to live here','She used to live here','She used to living here','She is used to live here'], correct:1 },
      { src:'Soliamos jugar futbol', opts:['We use to play football','We used to play football','We used to playing football','We are used to play football'], correct:1 },
      { src:'El solia tener un perro', opts:['He use to have a dog','He used to have a dog','He used to having a dog','He is used to have a dog'], correct:1 },
      { src:'No me solia gustar el cafe', opts:["I didn't used to like coffee","I didn't use to like coffee","I used to not like coffee","I usen't to like coffee"], correct:1 },
      { src:'Soliamos ir a la playa', opts:['We use to go to the beach','We used to go to the beach','We used to going to the beach','We are used to go to the beach'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Como se forma un habito pasado?', opts:['use to + verbo','used to + infinitivo','used to + -ing','am used to + verbo'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'I ', ans:'used to', post:' smoke.', bank:['used to','use to','am used to','used'] },
      { pre:'She ', ans:'used to', post:' live near the sea.', bank:['used to','use to','am used to','used'] },
      { pre:'We used to ', ans:'play', post:' together.', bank:['play','playing','played','plays'] },
      { pre:'He used to ', ans:'have', post:' long hair.', bank:['have','having','had','has'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['D','E','S','U'],ans:'USED',hint:'... to smoke'},{scrambled:['O','T'],ans:'TO',hint:'used ... smoke'},{scrambled:['E','K','O','M','S'],ans:'SMOKE',hint:'used to ...'},{scrambled:['E','V','I','L'],ans:'LIVE',hint:'used to ... here'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"used to + infinitivo" expresa un habito pasado.', ans:true, expl:'Correcto. I used to smoke.' },
      { text:'"I used to smoking." es correcto.', ans:false, expl:'Falso. used to smoke.' },
      { text:'"She used to live here." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"I use to play football (de nino)." es correcto.', ans:false, expl:'Falso. used to (con d).' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma el habito pasado con used to.',
    transforms:[
      { original:'smoke', task:'Used to', opts:['I used to smoke.','I use to smoke.','I used to smoking.','I am used to smoke.'], correct:0 },
      { original:'live here', task:'Used to', opts:['She used to live here.','She use to live here.','She used to living here.','She is used to live here.'], correct:0 },
      { original:'play', task:'Used to', opts:['We used to play.','We use to play.','We used to playing.','We are used to play.'], correct:0 },
      { original:'have a dog', task:'Used to', opts:['He used to have a dog.','He use to have a dog.','He used to having a dog.','He is used to have a dog.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con used to.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Did you do sports as a child?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I used to play football.','Yes, I use to play football.','Yes, I used to playing football.','Yes, I am used to play football.'], correct:0 },
      { speaker:0, text:'Where did you live?', blank:false },
      { speaker:1, text:null, blank:true, opts:['We used to live by the sea.','We use to live by the sea.','We used to living by the sea.','We are used to live by the sea.'], correct:0 },
      { speaker:0, text:'Lovely!', blank:false } ] }
]);

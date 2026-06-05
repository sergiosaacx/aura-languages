/* topic-data-300.js - Juego 300/350 | T43 6/7 STYLE & REGISTER | completar figuras en texto (MEZCLADO) | Diamante C1 */
_registerGames(300, 'Identificar y Completar Figuras Retoricas', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"She has got a ___ of gold" (metafora del corazon)', opts:['heart','soul','mind','head'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra que completa la figura.',
    sents:[
      { pre:'She has got a ', ans:'heart', post:' of gold.', bank:['heart','soul','mind','head'] },
      { pre:'The news was not ', ans:'particularly', post:' welcome. (understatement)', bank:['particularly','very','extremely','totally'] },
      { pre:'He is as stubborn as a ', ans:'mule', post:'. (simile)', bank:['mule','bird','cat','tree'] },
      { pre:'Her smile was a ', ans:'ray', post:' of sunshine. (metaphor)', bank:['ray','box','piece','drop'] } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada figura incompleta con su palabra.',
    pairs:[ ['heart of ...','gold'],['as stubborn as a ...','mule'],['a ray of ...','sunshine'],['not ... welcome (understatement)','particularly'],['as light as a ...','feather'],['a flood of ...','tears'] ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la figura correcta.',
    transforms:[
      { original:'persona muy bondadosa (metaphor)', task:'Figura', opts:['a heart of gold','a heart of stone','a head of gold','a soul of iron'], correct:0 },
      { original:'noticia horrible (understatement)', task:'Figura', opts:['not particularly welcome','very welcome','extremely welcome','totally welcome'], correct:0 },
      { original:'muy terco (simile)', task:'Figura', opts:['as stubborn as a mule','as stubborn as a bird','as soft as a mule','as quick as a mule'], correct:0 },
      { original:'sonrisa alegre (metaphor)', task:'Figura', opts:['a ray of sunshine','a box of sunshine','a drop of sunshine','a piece of sunshine'], correct:0 } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada figura esta bien completada.',
    stmts:[
      { text:'"a heart of gold" es una metafora correcta.', ans:true, expl:'Correcto.' },
      { text:'"as stubborn as a bird" es la forma convencional.', ans:false, expl:'Falso. as stubborn as a mule.' },
      { text:'"not particularly welcome" es un understatement.', ans:true, expl:'Correcto.' },
      { text:'"a ray of sunshine" describe algo deprimente.', ans:false, expl:'Falso. describe algo alegre.' } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra clave.',
    words:[ {scrambled:['T','R','A','E','H'],ans:'HEART',hint:'... of gold'},{scrambled:['E','L','U','M'],ans:'MULE',hint:'as stubborn as a ...'},{scrambled:['Y','A','R'],ans:'RAY',hint:'a ... of sunshine'},{scrambled:['D','L','O','G'],ans:'GOLD',hint:'heart of ...'} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa con la figura adecuada.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'How would you describe her kindness?', blank:false },
      { speaker:1, text:null, blank:true, opts:['She has a heart of gold.','She has a heart of stone.','She has a head of gold.','She has a soul of iron.'], correct:0 },
      { speaker:0, text:'The bad news, put mildly?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It was not particularly welcome.','It was very welcome.','It was totally welcome.','It was extremely welcome.'], correct:0 },
      { speaker:0, text:'Well put.', blank:false } ] }
]);

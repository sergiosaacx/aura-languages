/* topic-data-075.js - Juego 75/350 | T11 5/7 WHAT HAPPENED? | afirmativas Pasado Simple (MEZCLADO) | Plata A2 */
_registerGames(75, 'Pasado Simple · Afirmativas', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta en pasado.',
    items:[
      { src:'Ella fue a la escuela ayer', opts:['She go to school yesterday','She went to school yesterday','She goed to school yesterday','She gone to school yesterday'], correct:1 },
      { src:'Ellos comieron pizza', opts:['They eat pizza','They ate pizza','They eated pizza','They eaten pizza'], correct:1 },
      { src:'Yo vi una pelicula', opts:['I see a movie','I saw a movie','I seen a movie','I seed a movie'], correct:1 },
      { src:'El camino a casa', opts:['He walk home','He walked home','He walking home','He walkd home'], correct:1 },
      { src:'Nosotros jugamos futbol', opts:['We play football','We played football','We plaied football','We playd football'], correct:1 },
      { src:'Ella estudio mucho', opts:['She study a lot','She studied a lot','She studyed a lot','She studing a lot'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada verbo en pasado con su forma.',
    pairs:[ ['ir (pasado)','went'],['ver (pasado)','saw'],['comer (pasado)','ate'],['caminar (pasado)','walked'],['jugar (pasado)','played'],['estudiar (pasado)','studied'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el pasado del verbo.',
    words:[ {scrambled:['T','N','E','W'],ans:'WENT',hint:'pasado de go'},{scrambled:['E','T','A'],ans:'ATE',hint:'pasado de eat'},{scrambled:['W','A','S'],ans:'SAW',hint:'pasado de see'},{scrambled:['D','E','K','L','A','W'],ans:'WALKED',hint:'pasado de walk'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada pasado como regular o irregular.',
    categories:['Regular','Irregular'],
    items:[ {text:'walked',correct:0},{text:'went',correct:1},{text:'played',correct:0},{text:'ate',correct:1},{text:'studied',correct:0},{text:'saw',correct:1} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['went','She','to','school','yesterday'],ans:['She','went','to','school','yesterday']},{words:['ate','They','pizza','last','night'],ans:['They','ate','pizza','last','night']},{words:['saw','I','a','movie'],ans:['I','saw','a','movie']} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo en pasado.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What did you do last night?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I watched a film.','I watch a film.','I watching a film.','I watchd a film.'], correct:0 },
      { speaker:0, text:'And your sister?', blank:false },
      { speaker:1, text:null, blank:true, opts:['She went to a party.','She goed to a party.','She go to a party.','She gone to a party.'], correct:0 },
      { speaker:0, text:'Fun!', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el verbo incorrecto y elige la correccion.',
    sents:[
      { words:['She','go','to','school','yesterday','.'], wi:1, correct:'went', choices:['went','go','goed','gone'] },
      { words:['They','eated','pizza','.'], wi:1, correct:'ate', choices:['ate','eated','eat','eaten'] },
      { words:['I','seen','a','movie','.'], wi:1, correct:'saw', choices:['saw','seen','see','seed'] } ] }
]);

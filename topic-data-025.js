/* ===============================================================
   topic-data-025.js - Juego 25/350
   Tarjeta: 4/50 - A OR THE? - Posicion 4/7
   Temas: Zero article - cuando no hay articulo (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: mc - fill - order - transform - dialogue - scramble - truefalse
   =============================================================== */

_registerGames(25, 'Zero Article · Sin Articulo', [

  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Cual es correcto?',
    opts:['I play the tennis.','I play tennis.','I play a tennis.','I play an tennis.'], correct:1
  },

  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca la opcion correcta (muchos casos no llevan articulo).',
    sents:[
      { pre:'She speaks ', ans:'English', post:'.',           bank:['English','the English','an English','a English'] },
      { pre:'I play ',     ans:'football',post:' on Sundays.',bank:['football','the football','a football','an football'] },
      { pre:'I like ',     ans:'music',   post:'.',           bank:['music','the music','a music','an music'] },
      { pre:'We have ',    ans:'lunch',   post:' at noon.',   bank:['lunch','the lunch','a lunch','an lunch'] }
    ]
  },

  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto para formar la oracion.',
    sents:[
      { words:['English','She','speaks'], ans:['She','speaks','English'] },
      { words:['football','play','I'],    ans:['I','play','football'] },
      { words:['music','like','We'],      ans:['We','like','music'] }
    ]
  },

  { id:'transform', label:'Transforma', xp:35,
    instr:'Corrige cada oracion quitando el articulo innecesario.',
    transforms:[
      { original:'I play the football.',     task:'Forma correcta', opts:['I play football.','I play a football.','I play an football.','I play footballs.'],     correct:0 },
      { original:'She speaks the English.',  task:'Forma correcta', opts:['She speaks English.','She speaks a English.','She speaks an English.','She speak English.'], correct:0 },
      { original:'I like the music.',        task:'Forma correcta', opts:['I like music.','I like a music.','I like an music.','I likes music.'],                  correct:0 },
      { original:'We have the lunch at noon.',task:'Forma correcta',opts:['We have lunch at noon.','We have a lunch at noon.','We have an lunch at noon.','We haves lunch at noon.'], correct:0 }
    ]
  },

  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo (recuerda: deportes e idiomas sin articulo).',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Do you play football?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I play football.','Yes, I play the football.','Yes, I play a football.','Yes, I play an football.'], correct:0 },
      { speaker:0, text:'Do you speak French?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I speak French.','Yes, I speak the French.','Yes, I speak a French.','Yes, I speak an French.'], correct:0 },
      { speaker:0, text:'Cool!', blank:false }
    ]
  },

  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma la palabra (recuerda: estas no llevan articulo en general).',
    words:[
      { scrambled:['U','M','I','C','S'], ans:'MUSIC', hint:'no lleva articulo en general' },
      { scrambled:['C','L','U','N','H'], ans:'LUNCH', hint:'comida, sin articulo' },
      { scrambled:['A','D','E','R','B'], ans:'BREAD', hint:'comida, sin articulo' },
      { scrambled:['R','T','O','P','S'], ans:'SPORT', hint:'deporte, sin articulo' }
    ]
  },

  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada oracion usa bien el articulo cero.',
    stmts:[
      { text:'"She speaks English." es correcto.',         ans:true,  expl:'Correcto. Los idiomas no llevan articulo.' },
      { text:'"I play the football." es correcto.',        ans:false, expl:'Falso. Los deportes no llevan articulo: I play football.' },
      { text:'"I like music." es correcto (en general).',  ans:true,  expl:'Correcto. En sentido general, music sin articulo.' },
      { text:'"He speaks the Spanish." es correcto.',      ans:false, expl:'Falso. Los idiomas no llevan articulo: He speaks Spanish.' }
    ]
  }

]);

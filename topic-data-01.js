/* ═══════════════════════════════════════════════════════════════
   topic-data-01.js — Tarjeta 1: THE IDENTITY CODE
   Temas: Pronombres Sujeto · Pronombres Objeto
   Rango: Bronce A1 · Juegos globales: 1–7
   ═══════════════════════════════════════════════════════════════ */

_registerGames(1, [
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige la traduccion correcta al ingles para cada pronombre.',
    items:[
      { src:'Yo',       opts:['He','I','You','We'],     correct:1 },
      { src:'Tu',       opts:['You','He','She','They'], correct:0 },
      { src:'El',       opts:['She','It','He','We'],    correct:2 },
      { src:'Ella',     opts:['He','She','It','You'],   correct:1 },
      { src:'Nosotros', opts:['They','You','We','I'],   correct:2 },
      { src:'Ellos',    opts:['He','We','You','They'],  correct:3 }
    ]
  },
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Que pronombre se usa para hablar de un hombre que NO esta en la conversacion?',
    opts:['I','She','He','They'], correct:2
  },
  { id:'match', label:'Empareja', xp:30,
    instr:'Haz clic en un pronombre y luego en su significado.',
    pairs:[
      ['I','Yo - el que habla'],['You','Tu - el que escucha'],
      ['He','El - un hombre ausente'],['She','Ella - una mujer ausente'],
      ['We','Nosotros - el hablante y otros'],['They','Ellos - un grupo']
    ]
  },
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el pronombre correcto para llenar el espacio.',
    sents:[
      { pre:'', ans:'I',    post:' am a student.',     bank:['I','Me','My','He'] },
      { pre:'', ans:'She',  post:' is my sister.',     bank:['Her','She','It','He'] },
      { pre:'', ans:'We',   post:' are best friends.', bank:['Us','We','They','I'] },
      { pre:'', ans:'They', post:' are at home.',      bank:['He','Them','They','She'] }
    ]
  },
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Toca las letras en el orden correcto para formar el pronombre.',
    words:[
      { scrambled:['H','E','S'],     ans:'SHE',  hint:'Pronombre femenino singular' },
      { scrambled:['H','E','Y','T'], ans:'THEY', hint:'Plural - ellos / ellas' },
      { scrambled:['E','W'],         ans:'WE',   hint:'Yo + otras personas' },
      { scrambled:['O','Y','U'],     ans:'YOU',  hint:'La persona que escucha' }
    ]
  },
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto para formar la oracion.',
    sents:[
      { words:['am','I','happy'],         ans:['I','am','happy'] },
      { words:['is','She','my','sister'], ans:['She','is','my','sister'] },
      { words:['are','We','friends'],     ans:['We','are','friends'] }
    ]
  },
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige el pronombre correcto.',
    sents:[
      { words:['Him','is','a','doctor','.'],     wi:0, correct:'He',   choices:['He','His','Her','They'] },
      { words:['Me','am','a','student','.'],     wi:0, correct:'I',    choices:['I','My','Mine','We'] },
      { words:['Them','are','my','friends','.'], wi:0, correct:'They', choices:['Their','They','Those','Them'] }
    ]
  }
]);

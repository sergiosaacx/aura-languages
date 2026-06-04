/* ===============================================================
   topic-data-005.js - Juego 5/350
   Tarjeta: 1/50 - THE IDENTITY CODE - Posicion 5/7 en esta tarjeta
   Temas: Pronombres Sujeto - en oraciones (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: translate - match - scramble - order - fill - mc - fix
   =============================================================== */

_registerGames(5, 'Pronombres Sujeto · En Oraciones', [

  /* Actividad 1 - translate */
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige el pronombre sujeto correcto en ingles.',
    items:[
      { src:'Nosotros', opts:['Us','We','Our','They'],   correct:1 },
      { src:'Ellos',    opts:['Them','They','Their','We'],correct:1 },
      { src:'Ella',     opts:['Her','She','Hers','He'],   correct:1 },
      { src:'El',       opts:['Him','He','His','It'],     correct:1 },
      { src:'Yo',       opts:['Me','I','My','Mine'],      correct:1 },
      { src:'Tu',       opts:['You','Your','Yours','We'], correct:0 }
    ]
  },

  /* Actividad 2 - match */
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada pronombre sujeto con una oracion correcta.',
    pairs:[
      ['I','I am a student'],
      ['You','You are kind'],
      ['He','He is tall'],
      ['She','She is happy'],
      ['We','We are friends'],
      ['They','They are here']
    ]
  },

  /* Actividad 3 - scramble */
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Toca las letras en el orden correcto para formar el pronombre sujeto.',
    words:[
      { scrambled:['E','W'],         ans:'WE',   hint:'nosotros' },
      { scrambled:['U','O','Y'],     ans:'YOU',  hint:'tu' },
      { scrambled:['Y','E','T','H'], ans:'THEY', hint:'ellos' },
      { scrambled:['E','S','H'],     ans:'SHE',  hint:'ella' }
    ]
  },

  /* Actividad 4 - order */
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto para formar la oracion.',
    sents:[
      { words:['my','She','is','friend'],     ans:['She','is','my','friend'] },
      { words:['students','We','are'],        ans:['We','are','students'] },
      { words:['happy','They','are','very'],  ans:['They','are','very','happy'] }
    ]
  },

  /* Actividad 5 - fill */
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el pronombre sujeto correcto segun la pista.',
    sents:[
      { pre:'', ans:'He',   post:' is my brother. (el)',      bank:['He','She','It','They'] },
      { pre:'', ans:'We',   post:' are students. (nosotros)', bank:['I','You','We','She'] },
      { pre:'', ans:'They', post:' are happy. (ellos)',       bank:['He','She','It','They'] },
      { pre:'', ans:'She',  post:' is a teacher. (ella)',     bank:['He','She','It','We'] }
    ]
  },

  /* Actividad 6 - mc */
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Cual oracion esta bien formada?',
    opts:['Are we students.','We are students.','We students are.','Students we are.'], correct:1
  },

  /* Actividad 7 - fix */
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige el pronombre sujeto correcto.',
    sents:[
      { words:['Me','am','a','student','.'], wi:0, correct:'I',    choices:['I','Me','My','We'] },
      { words:['Them','are','happy','.'],    wi:0, correct:'They', choices:['They','Them','Their','Those'] },
      { words:['Us','are','friends','.'],    wi:0, correct:'We',   choices:['We','Us','Our','They'] }
    ]
  }

]);

/* ===============================================================
   topic-data-002.js - Juego 2/350
   Tarjeta: 1/50 - THE IDENTITY CODE - Posicion 2/7 en esta tarjeta
   Temas: Pronombres Sujeto - uso en contexto (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: translate - mc - listen - scramble - sort - transform - dialogue
   =============================================================== */

_registerGames(2, [

  /* Actividad 1 - translate */
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige el pronombre sujeto correcto segun a quien se refiere.',
    items:[
      { src:'un grupo de personas',      opts:['Them','They','We','He'],  correct:1 },
      { src:'tu y yo juntos',            opts:['Us','We','They','You'],   correct:1 },
      { src:'un perro (cosa o animal)',  opts:['He','She','It','They'],   correct:2 },
      { src:'una mujer',                 opts:['Her','She','He','It'],    correct:1 },
      { src:'un hombre',                 opts:['Him','He','She','It'],    correct:1 },
      { src:'la persona que te escucha', opts:['You','He','We','I'],      correct:0 }
    ]
  },

  /* Actividad 2 - mc */
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Que pronombre sujeto usas para hablar de un grupo de personas?',
    opts:['Them','They','Us','Their'], correct:1
  },

  /* Actividad 3 - listen */
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'He is my teacher.',   type:'select', opts:['He is my teacher.','She is my teacher.','We are my teacher.','They are my teacher.'], correct:0 },
      { tts:'We are friends.',     type:'select', opts:['We are friends.','They are friends.','You are friends.','She is friends.'],          correct:0 },
      { tts:'They are students.',  type:'select', opts:['They are students.','We are students.','He is students.','You are students.'],        correct:0 }
    ]
  },

  /* Actividad 4 - scramble */
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Toca las letras en el orden correcto para formar el pronombre sujeto.',
    words:[
      { scrambled:['E','H','T','Y'], ans:'THEY', hint:'un grupo (ellos / ellas)' },
      { scrambled:['E','W'],         ans:'WE',   hint:'tu y yo (nosotros)' },
      { scrambled:['E','H'],         ans:'HE',   hint:'un hombre (el)' },
      { scrambled:['H','E','S'],     ans:'SHE',  hint:'una mujer (ella)' }
    ]
  },

  /* Actividad 5 - sort */
  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada pronombre sujeto como singular o plural.',
    categories:['Singular','Plural'],
    items:[
      { text:'I',    correct:0 },
      { text:'he',   correct:0 },
      { text:'she',  correct:0 },
      { text:'it',   correct:0 },
      { text:'we',   correct:1 },
      { text:'they', correct:1 }
    ]
  },

  /* Actividad 6 - transform */
  { id:'transform', label:'Transforma', xp:35,
    instr:'Reemplaza el sujeto subrayado por el pronombre sujeto correcto.',
    transforms:[
      { original:'Tom is tall.',         task:'Usa pronombre sujeto', opts:['He is tall.','Him is tall.','His is tall.','It is tall.'],            correct:0 },
      { original:'Ana and I are happy.', task:'Usa pronombre sujeto', opts:['We are happy.','They are happy.','Us are happy.','You are happy.'],   correct:0 },
      { original:'The cats are black.',  task:'Usa pronombre sujeto', opts:['They are black.','It are black.','Them are black.','We are black.'],  correct:0 },
      { original:'Maria is here.',       task:'Usa pronombre sujeto', opts:['She is here.','Her is here.','He is here.','It is here.'],             correct:0 }
    ]
  },

  /* Actividad 7 - dialogue */
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo eligiendo el pronombre sujeto correcto.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Who is that man?', blank:false },
      { speaker:1, text:null, blank:true, opts:['He is my uncle.','Him is my uncle.','His is my uncle.','She is my uncle.'], correct:0 },
      { speaker:0, text:'And those people?', blank:false },
      { speaker:1, text:null, blank:true, opts:['They are my cousins.','Them are my cousins.','Their are my cousins.','We are my cousins.'], correct:0 },
      { speaker:0, text:'Nice family!', blank:false }
    ]
  }

]);

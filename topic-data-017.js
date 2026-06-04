/* ===============================================================
   topic-data-017.js - Juego 17/350
   Tarjeta: 3/50 - NAME THE WORLD - Posicion 3/7
   Temas: This/That/These/Those - asociacion (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: translate - match - scramble - transform - dialogue - mc - sort
   =============================================================== */

_registerGames(17, 'Demostrativos · Asociacion', [

  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige el demostrativo correcto en ingles.',
    items:[
      { src:'esto (cerca, singular)', opts:['this','that','these','those'], correct:0 },
      { src:'eso (lejos, singular)',  opts:['this','that','these','those'], correct:1 },
      { src:'estos (cerca, plural)',  opts:['this','that','these','those'], correct:2 },
      { src:'esos (lejos, plural)',   opts:['this','that','these','those'], correct:3 },
      { src:'esta cosa cercana',      opts:['these','this','those','that'], correct:1 },
      { src:'aquellas cosas lejanas', opts:['these','this','those','that'], correct:2 }
    ]
  },

  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada demostrativo con su descripcion.',
    pairs:[
      ['this','cerca, singular'],
      ['that','lejos, singular'],
      ['these','cerca, plural'],
      ['those','lejos, plural']
    ]
  },

  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma el demostrativo.',
    words:[
      { scrambled:['H','I','T','S'],     ans:'THIS',  hint:'cerca, singular' },
      { scrambled:['A','T','H','T'],     ans:'THAT',  hint:'lejos, singular' },
      { scrambled:['E','S','H','T','E'], ans:'THESE', hint:'cerca, plural' },
      { scrambled:['O','T','H','S','E'], ans:'THOSE', hint:'lejos, plural' }
    ]
  },

  { id:'transform', label:'Transforma', xp:35,
    instr:'Convierte cada frase singular en plural.',
    transforms:[
      { original:'this book',  task:'Hazlo plural', opts:['these books','those books','this books','that books'], correct:0 },
      { original:'that car',   task:'Hazlo plural', opts:['those cars','these cars','that cars','this cars'],     correct:0 },
      { original:'this apple', task:'Hazlo plural', opts:['these apples','those apples','this apples','that apples'], correct:0 },
      { original:'that dog',   task:'Hazlo plural', opts:['those dogs','these dogs','that dogs','this dogs'],      correct:0 }
    ]
  },

  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo con el demostrativo correcto.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What is this, near you?', blank:false },
      { speaker:1, text:null, blank:true, opts:['This is a pen.','These is a pen.','That is a pen.','Those is a pen.'], correct:0 },
      { speaker:0, text:'And those, far away?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Those are birds.','That are birds.','These are birds.','This are birds.'], correct:0 },
      { speaker:0, text:'I see!', blank:false }
    ]
  },

  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Que demostrativo describe algo lejano y plural?',
    opts:['this','that','these','those'], correct:3
  },

  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada demostrativo segun la distancia.',
    categories:['Cerca','Lejos'],
    items:[
      { text:'this',  correct:0 },
      { text:'these', correct:0 },
      { text:'that',  correct:1 },
      { text:'those', correct:1 }
    ]
  }

]);

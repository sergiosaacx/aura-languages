/* ===============================================================
   topic-data-020.js - Juego 20/350
   Tarjeta: 3/50 - NAME THE WORLD - Posicion 6/7
   Temas: This/That/These/Those en contexto (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: translate - mc - truefalse - scramble - listen - fill - fix
   =============================================================== */

_registerGames(20, 'Demostrativos · En Contexto', [

  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige el demostrativo correcto en ingles.',
    items:[
      { src:'esto (cerca, sing)',   opts:['this','that','these','those'], correct:0 },
      { src:'esos (lejos, plural)', opts:['this','that','these','those'], correct:3 },
      { src:'estos (cerca, plural)',opts:['this','that','these','those'], correct:2 },
      { src:'eso (lejos, sing)',    opts:['this','that','these','those'], correct:1 },
      { src:'esta cosa de aqui',    opts:['these','this','those','that'], correct:1 },
      { src:'aquella cosa de alla', opts:['these','this','those','that'], correct:3 }
    ]
  },

  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Senalas un libro que esta lejos de ti. Que demostrativo usas?',
    opts:['this','that','these','those'], correct:1
  },

  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada uso del demostrativo es correcto.',
    stmts:[
      { text:'Para un objeto lejano y singular usas "that".',   ans:true,  expl:'Correcto. that = lejos + singular.' },
      { text:'Para objetos cercanos y plurales usas "this".',   ans:false, expl:'Falso. cerca + plural = these.' },
      { text:'Para objetos lejanos y plurales usas "those".',   ans:true,  expl:'Correcto. those = lejos + plural.' },
      { text:'"this" se usa para cosas lejanas.',               ans:false, expl:'Falso. this = cerca.' }
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

  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'These are my keys.', type:'select', opts:['These are my keys.','This is my key.','Those are my keys.','That is my key.'], correct:0 },
      { tts:'That is a house.',   type:'select', opts:['That is a house.','This is a house.','Those are houses.','These are houses.'], correct:0 },
      { tts:'This is my phone.',  type:'select', opts:['This is my phone.','These are my phones.','That is my phone.','Those are my phones.'], correct:0 }
    ]
  },

  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el demostrativo correcto segun el contexto.',
    sents:[
      { pre:'', ans:'This',  post:' is my pen. (cerca)',             bank:['This','That','These','Those'] },
      { pre:'', ans:'Those', post:' are my friends. (lejos, plural)',bank:['This','That','These','Those'] },
      { pre:'', ans:'That',  post:' book is new. (lejos)',           bank:['This','That','These','Those'] },
      { pre:'', ans:'These', post:' shoes are mine. (cerca, plural)',bank:['This','That','These','Those'] }
    ]
  },

  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca el demostrativo incorrecto y elige el correcto.',
    sents:[
      { words:['This','books','are','new','.'], wi:0, correct:'These', choices:['These','This','That','Those'] },
      { words:['Those','pen','is','blue','.'],  wi:0, correct:'That',  choices:['That','Those','These','This'] },
      { words:['These','car','is','fast','.'],  wi:0, correct:'This',  choices:['This','These','Those','That'] }
    ]
  }

]);

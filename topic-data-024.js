/* ===============================================================
   topic-data-024.js - Juego 24/350
   Tarjeta: 4/50 - A OR THE? - Posicion 3/7
   Temas: Some y Any - contextos de uso (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: translate - match - scramble - truefalse - listen - mc - sort
   =============================================================== */

_registerGames(24, 'Some y Any · Contextos', [

  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige some o any segun el contexto.',
    items:[
      { src:'algo de agua (afirmativo)',   opts:['some water','any water','a water','the water'],       correct:0 },
      { src:'nada de dinero (negativo)',   opts:['some money','any money','a money','the money'],       correct:1 },
      { src:'algunas manzanas (afirmativo)',opts:['any apples','some apples','a apples','the apples'],   correct:1 },
      { src:'alguna pregunta? (pregunta)', opts:['some question','any question','a question','the question'], correct:1 },
      { src:'algo de pan (afirmativo)',    opts:['some bread','any bread','a bread','the bread'],        correct:0 },
      { src:'ningun amigo (negativo)',     opts:['some friends','any friends','a friends','the friends'],correct:1 }
    ]
  },

  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada frase con su version completa correcta.',
    pairs:[
      ['I have ... books','I have some books'],
      ['I do not have ... money',"I don't have any money"],
      ['Do you have ... questions?','Do you have any questions?'],
      ['She bought ... apples','She bought some apples'],
      ['There is not ... water',"There isn't any water"],
      ['We need ... help','We need some help']
    ]
  },

  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma la palabra relacionada con some y any.',
    words:[
      { scrambled:['O','S','E','M'], ans:'SOME', hint:'en frases afirmativas' },
      { scrambled:['N','Y','A'],     ans:'ANY',  hint:'en negativas y preguntas' },
      { scrambled:['T','O','N'],     ans:'NOT',  hint:'la negacion que pide any' },
      { scrambled:['O','D'],         ans:'DO',   hint:'auxiliar de preguntas que pide any' }
    ]
  },

  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada regla de some/any es correcta.',
    stmts:[
      { text:'Se usa "some" en frases afirmativas.',         ans:true,  expl:'Correcto. some va en afirmativas.' },
      { text:'Se usa "some" en preguntas normalmente.',      ans:false, expl:'Falso. En preguntas se usa any.' },
      { text:'Se usa "any" en frases negativas.',            ans:true,  expl:'Correcto. any va en negativas y preguntas.' },
      { text:'"I do not have some money" es correcto.',      ans:false, expl:'Falso. En negativa se usa any: I do not have any money.' }
    ]
  },

  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'I have some apples.',          type:'select', opts:['I have some apples.','I have any apples.','I have a apples.','I have the apples.'], correct:0 },
      { tts:'I do not have any money.',     type:'select', opts:["I don't have any money.","I don't have some money.","I don't have a money.","I don't have the money."], correct:0 },
      { tts:'Do you have any questions?',   type:'select', opts:['Do you have any questions?','Do you have some questions?','Do you have a questions?','Do you have the questions?'], correct:0 }
    ]
  },

  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'En una frase negativa, que usas: some o any?',
    opts:['some','any','both','neither'], correct:1
  },

  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada frase segun si usa some o any.',
    categories:['Usa some','Usa any'],
    items:[
      { text:'I have ___ books (afirmativa)',      correct:0 },
      { text:'I do not have ___ money (negativa)', correct:1 },
      { text:'Do you have ___ time? (pregunta)',   correct:1 },
      { text:'She wants ___ coffee (afirmativa)',  correct:0 },
      { text:'There is not ___ bread (negativa)',  correct:1 },
      { text:'We need ___ help (afirmativa)',      correct:0 }
    ]
  }

]);

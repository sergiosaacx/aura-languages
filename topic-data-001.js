/* ===============================================================
   topic-data-001.js - Juego 1/350
   Tarjeta: 1/50 - THE IDENTITY CODE - Posicion 1/7 en esta tarjeta
   Temas: Pronombres Sujeto (especializado)
   Rango: Bronce A1
   Tipos: translate - mc - match - truefalse - order - fill - fix
   =============================================================== */

_registerGames(1, 'Pronombres Sujeto · Reconocimiento', [

  /* Actividad 1 - translate */
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige la traduccion correcta al ingles para cada pronombre sujeto.',
    items:[
      { src:'Yo',       opts:['Me','I','You','He'],     correct:1 },
      { src:'Tu',       opts:['You','We','She','They'], correct:0 },
      { src:'El',       opts:['She','It','He','We'],    correct:2 },
      { src:'Ella',     opts:['He','She','It','They'],  correct:1 },
      { src:'Nosotros', opts:['They','You','We','I'],   correct:2 },
      { src:'Ellos',    opts:['He','We','You','They'],  correct:3 }
    ]
  },

  /* Actividad 2 - mc */
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Que pronombre sujeto usas para hablar de una sola mujer (ella)?',
    opts:['He','She','It','They'], correct:1
  },

  /* Actividad 3 - match */
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada pronombre sujeto con su descripcion.',
    pairs:[
      ['I','la persona que habla'],
      ['you','la persona que escucha'],
      ['he','un hombre (el)'],
      ['she','una mujer (ella)'],
      ['it','una cosa o un animal'],
      ['they','un grupo de personas']
    ]
  },

  /* Actividad 4 - truefalse */
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Lee cada afirmacion sobre los pronombres sujeto y decide si es correcta.',
    stmts:[
      { text:'"They" es un pronombre plural.',            ans:true,  expl:'Correcto. They se usa para un grupo (ellos o ellas).' },
      { text:'"It" se usa para hablar de una persona.',   ans:false, expl:'Falso. It se usa para cosas o animales, no para personas.' },
      { text:'"I" siempre se escribe con mayuscula.',     ans:true,  expl:'Correcto. El pronombre I siempre va en mayuscula en ingles.' },
      { text:'"We" se usa para una sola persona.',        ans:false, expl:'Falso. We es plural: significa nosotros.' }
    ]
  },

  /* Actividad 5 - order */
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto para formar la oracion.',
    sents:[
      { words:['is','She','my','friend'], ans:['She','is','my','friend'] },
      { words:['are','We','students'],    ans:['We','are','students'] },
      { words:['happy','They','are'],     ans:['They','are','happy'] }
    ]
  },

  /* Actividad 6 - fill */
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el pronombre sujeto correcto segun la pista entre parentesis.',
    sents:[
      { pre:'', ans:'He',   post:' is my brother. (el)',       bank:['He','She','It','They'] },
      { pre:'', ans:'They', post:' are my parents. (ellos)',   bank:['He','She','It','They'] },
      { pre:'', ans:'We',   post:' are a team. (nosotros)',    bank:['I','You','We','She'] },
      { pre:'', ans:'It',   post:' is a cat. (cosa o animal)', bank:['He','She','It','We'] }
    ]
  },

  /* Actividad 7 - fix */
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige el pronombre sujeto correcto.',
    sents:[
      { words:['Me','am','happy','.'],           wi:0, correct:'I',    choices:['I','Me','My','We'] },
      { words:['Her','is','tall','.'],           wi:0, correct:'She',  choices:['She','Her','Hers','They'] },
      { words:['Them','are','my','friends','.'], wi:0, correct:'They', choices:['They','Them','Their','Those'] }
    ]
  }

]);

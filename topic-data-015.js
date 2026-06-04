/* ===============================================================
   topic-data-015.js - Juego 15/350
   Tarjeta: 3/50 - NAME THE WORLD - Posicion 1/7
   Temas: Sustantivos - singular y plural basico (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: translate - mc - match - fill - scramble - transform - dialogue
   =============================================================== */

_registerGames(15, 'Sustantivos · Singular y Plural', [

  /* Actividad 1 - translate */
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige el plural correcto en ingles.',
    items:[
      { src:'libros (book)',    opts:['bookes','books','bookies','booken'],      correct:1 },
      { src:'sillas (chair)',   opts:['chairs','chaires','chairen','charis'],    correct:0 },
      { src:'manzanas (apple)', opts:['applies','apples','appales','applen'],    correct:1 },
      { src:'ninos (child)',    opts:['childs','children','childes','childrens'],correct:1 },
      { src:'pies (foot)',      opts:['foots','feets','feet','footes'],          correct:2 },
      { src:'ratones (mouse)',  opts:['mouses','mice','mousen','mices'],         correct:1 }
    ]
  },

  /* Actividad 2 - mc */
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Cual es el plural correcto de "child"?',
    opts:['childs','children','childes','childrens'], correct:1
  },

  /* Actividad 3 - match */
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada sustantivo singular con su plural.',
    pairs:[
      ['book','books'],
      ['child','children'],
      ['man','men'],
      ['foot','feet'],
      ['mouse','mice'],
      ['box','boxes']
    ]
  },

  /* Actividad 4 - fill */
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el plural correcto para completar la oracion.',
    sents:[
      { pre:'I have two ',      ans:'books',    post:'.',          bank:['book','books','bookes','booken'] },
      { pre:'There are three ', ans:'children', post:'.',          bank:['childs','children','childrens','childes'] },
      { pre:'She has five ',    ans:'apples',   post:'.',          bank:['apple','apples','applies','appales'] },
      { pre:'My ',              ans:'feet',     post:' are cold.', bank:['foots','feets','feet','foot'] }
    ]
  },

  /* Actividad 5 - scramble */
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma el sustantivo en plural.',
    words:[
      { scrambled:['O','B','O','K','S'], ans:'BOOKS', hint:'plural de book' },
      { scrambled:['T','E','E','F'],     ans:'FEET',  hint:'plural de foot' },
      { scrambled:['E','C','M','I'],     ans:'MICE',  hint:'plural de mouse' },
      { scrambled:['E','M','N'],         ans:'MEN',   hint:'plural de man' }
    ]
  },

  /* Actividad 6 - transform */
  { id:'transform', label:'Transforma', xp:35,
    instr:'Convierte cada sustantivo singular en plural.',
    transforms:[
      { original:'one book',  task:'Hazlo plural', opts:['two books','two bookes','two book','two booken'],       correct:0 },
      { original:'one child', task:'Hazlo plural', opts:['two children','two childs','two childrens','two childes'], correct:0 },
      { original:'one man',   task:'Hazlo plural', opts:['two men','two mans','two mens','two man'],               correct:0 },
      { original:'one box',   task:'Hazlo plural', opts:['two boxes','two boxs','two boxies','two box'],           correct:0 }
    ]
  },

  /* Actividad 7 - dialogue */
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo con el plural correcto.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'How many books do you have?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I have three books.','I have three bookes.','I have three book.','I have three booken.'], correct:0 },
      { speaker:0, text:'And children?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I have two children.','I have two childs.','I have two childrens.','I have two childes.'], correct:0 },
      { speaker:0, text:'Nice!', blank:false }
    ]
  }

]);

/* ===============================================================
   topic-data-013.js - Juego 13/350
   Tarjeta: 2/50 - AM, IS, ARE - Posicion 6/7
   Temas: To Be preguntas - Am I? / Is he? / Are they? (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: translate - mc - fill - scramble - truefalse - transform - dialogue
   =============================================================== */

_registerGames(13, 'To Be Preguntas · Am I? / Is he?', [

  /* Actividad 1 - translate */
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige la forma correcta de la pregunta con TO BE.',
    items:[
      { src:'Eres tu...?',         opts:['Are you...?','Is you...?','Am you...?','You are...?'],   correct:0 },
      { src:'Es el...?',           opts:['Are he...?','Is he...?','Am he...?','He is...?'],         correct:1 },
      { src:'Estan ellos...?',     opts:['Is they...?','Am they...?','Are they...?','They are...?'],correct:2 },
      { src:'Estoy yo...?',        opts:['Am I...?','Is I...?','Are I...?','I am...?'],             correct:0 },
      { src:'Es ella...?',         opts:['Are she...?','Am she...?','Is she...?','She is...?'],     correct:2 },
      { src:'Estamos nosotros...?',opts:['Is we...?','Are we...?','Am we...?','We are...?'],        correct:1 }
    ]
  },

  /* Actividad 2 - mc */
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Como se forma una pregunta con el verbo TO BE?',
    opts:['sujeto + verbo','verbo TO BE + sujeto','sujeto + not','solo el verbo'], correct:1
  },

  /* Actividad 3 - fill */
  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca la forma correcta de TO BE para completar la pregunta.',
    sents:[
      { pre:'', ans:'Is',  post:' she your sister?', bank:['Am','Is','Are','Be'] },
      { pre:'', ans:'Are', post:' they at school?',  bank:['Am','Is','Are','Be'] },
      { pre:'', ans:'Am',  post:' I late?',          bank:['Am','Is','Are','Be'] },
      { pre:'', ans:'Are', post:' you ready?',       bank:['Am','Is','Are','Be'] }
    ]
  },

  /* Actividad 4 - scramble */
  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma la palabra del verbo TO BE para preguntas.',
    words:[
      { scrambled:['S','I'],     ans:'IS',  hint:'Is he...?' },
      { scrambled:['R','A','E'], ans:'ARE', hint:'Are they...?' },
      { scrambled:['M','A'],     ans:'AM',  hint:'Am I...?' },
      { scrambled:['E','B'],     ans:'BE',  hint:'forma base del verbo' }
    ]
  },

  /* Actividad 5 - truefalse */
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada pregunta esta bien formada.',
    stmts:[
      { text:'"Is he your friend?" es una pregunta correcta.', ans:true,  expl:'Correcto. is va antes del sujeto he.' },
      { text:'"You are happy?" es la forma correcta de preguntar.', ans:false, expl:'Falso. La pregunta invierte: Are you happy?' },
      { text:'"Are they ready?" es correcto.', ans:true,  expl:'Correcto. are + they.' },
      { text:'"Am you tired?" es correcto.',   ans:false, expl:'Falso. Con you se usa are: Are you tired?' }
    ]
  },

  /* Actividad 6 - transform */
  { id:'transform', label:'Transforma', xp:35,
    instr:'Convierte cada afirmacion en una pregunta.',
    transforms:[
      { original:'She is your sister.', task:'Forma pregunta', opts:['Is she your sister?','She is your sister?','Are she your sister?','Am she your sister?'], correct:0 },
      { original:'They are at home.',   task:'Forma pregunta', opts:['Are they at home?','Is they at home?','They are at home?','Am they at home?'],            correct:0 },
      { original:'You are ready.',      task:'Forma pregunta', opts:['Are you ready?','Is you ready?','You are ready?','Am you ready?'],                        correct:0 },
      { original:'He is tall.',         task:'Forma pregunta', opts:['Is he tall?','Are he tall?','He is tall?','Am he tall?'],                                 correct:0 }
    ]
  },

  /* Actividad 7 - dialogue */
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo eligiendo la pregunta correcta.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'I have some questions.', blank:false },
      { speaker:0, text:null, blank:true, opts:['Are you from Spain?','Is you from Spain?','Am you from Spain?','You are from Spain?'], correct:0 },
      { speaker:1, text:'Yes, I am.', blank:false },
      { speaker:0, text:null, blank:true, opts:['Is your friend here?','Are your friend here?','Am your friend here?','Your friend is here?'], correct:0 },
      { speaker:1, text:'Yes, he is.', blank:false }
    ]
  }

]);

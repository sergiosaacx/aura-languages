/* ===============================================================
   topic-data-004.js - Juego 4/350
   Tarjeta: 1/50 - THE IDENTITY CODE - Posicion 4/7 en esta tarjeta
   Temas: Sujeto vs Objeto - diferenciacion (MEZCLADO)
   Rango: Bronce A1
   Tipos: truefalse - mc - listen - sort - transform - dialogue - fix
   =============================================================== */

_registerGames(4, 'Sujeto vs Objeto · Diferenciación', [

  /* Actividad 1 - truefalse */
  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada oracion usa bien el pronombre sujeto u objeto.',
    stmts:[
      { text:'"She is my friend." es correcto.',  ans:true,  expl:'Correcto. She es sujeto y va al inicio de la oracion.' },
      { text:'"Him is my friend." es correcto.',  ans:false, expl:'Falso. Him es objeto. El sujeto correcto es He.' },
      { text:'"I can see them." es correcto.',     ans:true,  expl:'Correcto. them es objeto y va despues del verbo.' },
      { text:'"Her likes music." es correcto.',    ans:false, expl:'Falso. Her es objeto. El sujeto correcto es She.' }
    ]
  },

  /* Actividad 2 - mc */
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Cual oracion usa correctamente el sujeto y el objeto?',
    opts:['Me see him.','I see him.','I see he.','Me see he.'], correct:1
  },

  /* Actividad 3 - listen */
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'She knows him.', type:'select', opts:['She knows him.','Her knows him.','She knows he.','Her knows he.'], correct:0 },
      { tts:'We help them.',  type:'select', opts:['We help them.','Us help them.','We help they.','Us help they.'],   correct:0 },
      { tts:'They see us.',   type:'select', opts:['They see us.','Them see us.','They see we.','Them see we.'],       correct:0 }
    ]
  },

  /* Actividad 4 - sort */
  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada pronombre segun su funcion en la oracion.',
    categories:['Sujeto (inicio)','Objeto (despues del verbo)'],
    items:[
      { text:'I',    correct:0 },
      { text:'me',   correct:1 },
      { text:'he',   correct:0 },
      { text:'him',  correct:1 },
      { text:'she',  correct:0 },
      { text:'her',  correct:1 },
      { text:'they', correct:0 },
      { text:'them', correct:1 }
    ]
  },

  /* Actividad 5 - transform */
  { id:'transform', label:'Transforma', xp:35,
    instr:'Corrige cada oracion a su forma correcta.',
    transforms:[
      { original:'Me am tired.',     task:'Forma correcta', opts:['I am tired.','Me is tired.','My am tired.','Mine am tired.'],     correct:0 },
      { original:'Them are happy.',  task:'Forma correcta', opts:['They are happy.','Them is happy.','Their are happy.','Theirs are happy.'], correct:0 },
      { original:'I see she.',       task:'Forma correcta', opts:['I see her.','I see hers.','Me see her.','I see she.'],            correct:0 },
      { original:'Her is nice.',     task:'Forma correcta', opts:['She is nice.','Hers is nice.','Her are nice.','She are nice.'],   correct:0 }
    ]
  },

  /* Actividad 6 - dialogue */
  { id:'dialogue', label:'Dialogo', xp:35,
    instr:'Completa el dialogo eligiendo la forma correcta.',
    speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Is that your sister?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, she is here.','Yes, her is here.','Yes, hers is here.','Yes, him is here.'], correct:0 },
      { speaker:0, text:'Can you see your friends?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Yes, I can see them.','Yes, I can see they.','Yes, I can see their.','Yes, me can see them.'], correct:0 },
      { speaker:0, text:'Great!', blank:false }
    ]
  },

  /* Actividad 7 - fix */
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca la palabra incorrecta y elige el pronombre correcto.',
    sents:[
      { words:['Him','is','my','friend','.'],  wi:0, correct:'He',   choices:['He','Him','His','They'] },
      { words:['I','like','they','.'],         wi:2, correct:'them', choices:['them','they','their','those'] },
      { words:['Her','is','my','teacher','.'], wi:0, correct:'She',  choices:['She','Her','Hers','They'] }
    ]
  }

]);

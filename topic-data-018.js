/* ===============================================================
   topic-data-018.js - Juego 18/350
   Tarjeta: 3/50 - NAME THE WORLD - Posicion 4/7
   Temas: Plurales regulares e irregulares (ESPECIALIZADO)
   Rango: Bronce A1
   Tipos: translate - truefalse - fill - order - fix - scramble - listen
   =============================================================== */

_registerGames(18, 'Plurales · Regulares e Irregulares', [

  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige el plural correcto en ingles.',
    items:[
      { src:'cajas (box)',     opts:['boxs','boxes','boxies','boxen'],          correct:1 },
      { src:'ciudades (city)', opts:['citys','cities','cityes','citis'],        correct:1 },
      { src:'hojas (leaf)',    opts:['leafs','leaves','leafes','leavs'],        correct:1 },
      { src:'mujeres (woman)', opts:['womans','women','womens','womes'],        correct:1 },
      { src:'dientes (tooth)', opts:['tooths','teeth','toothes','teeths'],      correct:1 },
      { src:'ninos (child)',   opts:['childs','children','childes','childrens'],correct:1 }
    ]
  },

  { id:'truefalse', label:'Verdadero o Falso', xp:20,
    instr:'Decide si cada regla de plural es correcta.',
    stmts:[
      { text:'El plural de "city" es "cities".', ans:true,  expl:'Correcto. Consonante + y cambia a -ies.' },
      { text:'El plural de "man" es "mans".',    ans:false, expl:'Falso. Es irregular: man -> men.' },
      { text:'El plural de "box" es "boxes".',   ans:true,  expl:'Correcto. Palabras en -x anaden -es.' },
      { text:'El plural de "leaf" es "leafs".',  ans:false, expl:'Falso. Es leaf -> leaves.' }
    ]
  },

  { id:'fill', label:'Rellena los espacios', xp:35,
    instr:'Toca el plural correcto para completar la oracion.',
    sents:[
      { pre:'There are three ', ans:'cities', post:' here.',  bank:['citys','cities','cityes','citis'] },
      { pre:'I see two ',       ans:'men',    post:'.',       bank:['mans','men','mens','man'] },
      { pre:'She has many ',    ans:'boxes',  post:'.',       bank:['boxs','boxes','boxies','box'] },
      { pre:'The tree has green ',ans:'leaves',post:'.',      bank:['leafs','leaves','leafes','leaf'] }
    ]
  },

  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto para formar la oracion.',
    sents:[
      { words:['are','There','two','men'],   ans:['There','are','two','men'] },
      { words:['have','I','three','boxes'],  ans:['I','have','three','boxes'] },
      { words:['are','These','my','teeth'],  ans:['These','are','my','teeth'] }
    ]
  },

  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca el plural incorrecto y elige la forma correcta.',
    sents:[
      { words:['I','have','two','childs','.'],  wi:3, correct:'children', choices:['children','childs','childrens','childes'] },
      { words:['Three','mans','are','here','.'],wi:1, correct:'men',      choices:['men','mans','mens','man'] },
      { words:['The','leafs','are','green','.'],wi:1, correct:'leaves',   choices:['leaves','leafs','leafes','leaf'] }
    ]
  },

  { id:'scramble', label:'Descifra la palabra', xp:20,
    instr:'Forma el sustantivo en plural.',
    words:[
      { scrambled:['N','E','M'],             ans:'MEN',    hint:'plural de man' },
      { scrambled:['E','T','T','E','H'],     ans:'TEETH',  hint:'plural de tooth' },
      { scrambled:['E','S','I','T','I','C'], ans:'CITIES', hint:'plural de city' },
      { scrambled:['X','B','E','S','O'],     ans:'BOXES',  hint:'plural de box' }
    ]
  },

  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion correcta que oyes.',
    items:[
      { tts:'There are two men.',  type:'select', opts:['There are two men.','There are two mans.','There are two mens.','There are two man.'], correct:0 },
      { tts:'I have three boxes.', type:'select', opts:['I have three boxes.','I have three boxs.','I have three boxies.','I have three box.'], correct:0 },
      { tts:'These are my teeth.', type:'select', opts:['These are my teeth.','These are my tooths.','These are my teeths.','These are my tooth.'], correct:0 }
    ]
  }

]);

/* topic-data-302.js - Juego 302/350 | T44 1/7 COLLOCATION MASTER | verbo-sustantivo (ESPECIALIZADO) | Diamante C1 */
_registerGames(302, 'Colocaciones Verbo-Sustantivo', [
  { id:'translate', label:'Colocacion', xp:25, instr:'Elige el verbo colocacional correcto.',
    items:[
      { src:'hacer una sugerencia', opts:['make a suggestion','do a suggestion','take a suggestion','give a suggestion'], correct:0 },
      { src:'hacer dano', opts:['make harm','do harm','take harm','give harm'], correct:1 },
      { src:'tomar medidas', opts:['make action','do action','take action','give action'], correct:2 },
      { src:'tener una conversacion', opts:['make a conversation','do a conversation','have a conversation','take a conversation'], correct:2 },
      { src:'dar un discurso', opts:['make a speech','do a speech','give a speech','take a speech'], correct:2 },
      { src:'cometer un error', opts:['make a mistake','do a mistake','take a mistake','give a mistake'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['make harm','do harm','take harm','give harm'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada sustantivo con su verbo colocacional.',
    pairs:[ ['a suggestion','make'],['harm','do'],['action','take'],['a conversation','have'],['a speech','give'],['a decision','make a'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el verbo correcto.',
    sents:[
      { pre:'Can I ', ans:'make', post:' a suggestion?', bank:['make','do','take','give'] },
      { pre:'Smoking can ', ans:'do', post:' harm to your health.', bank:['do','make','take','give'] },
      { pre:'We must ', ans:'take', post:' action now.', bank:['take','make','do','give'] },
      { pre:'She will ', ans:'give', post:' a speech tonight.', bank:['give','make','do','take'] } ] },
  { id:'scramble', label:'Descifra el verbo', xp:20, instr:'Forma el verbo colocacional.',
    words:[ {scrambled:['E','K','A','M'],ans:'MAKE',hint:'... a suggestion'},{scrambled:['O','D'],ans:'DO',hint:'... harm'},{scrambled:['E','K','A','T'],ans:'TAKE',hint:'... action'},{scrambled:['E','V','I','G'],ans:'GIVE',hint:'... a speech'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada colocacion es correcta.',
    stmts:[
      { text:'"make a suggestion" es correcto.', ans:true, expl:'Correcto.' },
      { text:'"make harm" es correcto.', ans:false, expl:'Falso. do harm.' },
      { text:'"take action" es correcto.', ans:true, expl:'Correcto.' },
      { text:'"give action" es correcto.', ans:false, expl:'Falso. take action.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada sustantivo por su verbo.',
    categories:['make','do','take / give'],
    items:[ {text:'a suggestion',correct:0},{text:'harm',correct:1},{text:'action',correct:2},{text:'a mistake',correct:0},{text:'research',correct:1},{text:'a speech',correct:2} ] }
]);

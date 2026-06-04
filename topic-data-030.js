/* topic-data-030.js - Juego 30/350 | T5 2/7 COUNT THE WORLD | Dias de la semana (ESPECIALIZADO) | Bronce A1 */
_registerGames(30, 'Dias de la Semana', [
  { id:'translate', label:'Traduccion', xp:25,
    instr:'Elige el dia correcto en ingles.',
    items:[
      { src:'lunes',     opts:['Monday','Sunday','Tuesday','Friday'], correct:0 },
      { src:'miercoles', opts:['Tuesday','Wednesday','Thursday','Monday'], correct:1 },
      { src:'sabado',    opts:['Sunday','Saturday','Friday','Monday'], correct:1 },
      { src:'jueves',    opts:['Tuesday','Thursday','Wednesday','Friday'], correct:1 },
      { src:'domingo',   opts:['Saturday','Sunday','Monday','Friday'], correct:1 },
      { src:'viernes',   opts:['Thursday','Friday','Saturday','Monday'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25,
    q:'Que dia va despues del Tuesday?',
    opts:['Monday','Wednesday','Thursday','Friday'], correct:1 },
  { id:'match', label:'Empareja', xp:30,
    instr:'Empareja cada dia en espanol con su nombre en ingles.',
    pairs:[ ['lunes','Monday'],['martes','Tuesday'],['miercoles','Wednesday'],['jueves','Thursday'],['viernes','Friday'],['domingo','Sunday'] ] },
  { id:'order', label:'Ordena las palabras', xp:30,
    instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['is','Today','Monday'],ans:['Today','is','Monday']},{words:['on','See','Friday','you'],ans:['See','you','on','Friday']},{words:['is','Tomorrow','Sunday'],ans:['Tomorrow','is','Sunday']} ] },
  { id:'fix', label:'Corrige el error', xp:35,
    instr:'Toca el dia mal escrito y elige la forma correcta.',
    sents:[
      { words:['Today','is','Wensday','.'], wi:2, correct:'Wednesday', choices:['Wednesday','Wensday','Wendsday','Wednsday'] },
      { words:['See','you','on','Thrusday','.'], wi:3, correct:'Thursday', choices:['Thursday','Thrusday','Thusday','Thurday'] },
      { words:['Tomorrow','is','Sathurday','.'], wi:2, correct:'Saturday', choices:['Saturday','Sathurday','Saterday','Satturday'] } ] },
  { id:'sort', label:'Clasificar', xp:30,
    instr:'Clasifica cada dia como dia de semana o fin de semana.',
    categories:['Dia de semana','Fin de semana'],
    items:[ {text:'Monday',correct:0},{text:'Tuesday',correct:0},{text:'Wednesday',correct:0},{text:'Friday',correct:0},{text:'Saturday',correct:1},{text:'Sunday',correct:1} ] },
  { id:'listen', label:'Escuchar', xp:30,
    instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'Today is Monday.', type:'select', opts:['Today is Monday.','Today is Sunday.','Today is Friday.','Today is Tuesday.'], correct:0 },
      { tts:'See you on Friday.', type:'select', opts:['See you on Friday.','See you on Monday.','See you on Sunday.','See you on Thursday.'], correct:0 },
      { tts:'Tomorrow is Saturday.', type:'select', opts:['Tomorrow is Saturday.','Tomorrow is Sunday.','Tomorrow is Monday.','Tomorrow is Tuesday.'], correct:0 } ] }
]);

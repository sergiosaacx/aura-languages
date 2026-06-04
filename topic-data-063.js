/* topic-data-063.js - Juego 63/350 | T9 7/7 HERE & THERE | errores tipicos de preposiciones (MEZCLADO) | Bronce A1 */
_registerGames(63, 'Preposiciones · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'a las 7 en punto', opts:["in 7 o'clock","on 7 o'clock","at 7 o'clock","to 7 o'clock"], correct:2 },
      { src:'en la calle Baker', opts:['in Baker Street','on Baker Street','at Baker Street','to Baker Street'], correct:1 },
      { src:'el viernes', opts:['in Friday','on Friday','at Friday','to Friday'], correct:1 },
      { src:'en julio', opts:['in July','on July','at July','to July'], correct:0 },
      { src:'sobre la mesa', opts:['in the table','on the table','at the table','to the table'], correct:1 },
      { src:'en la noche', opts:['in night','on night','at night','to night'], correct:2 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:["I wake up on 7 o'clock","I wake up at 7 o'clock","I wake up in 7 o'clock","I wake up to 7 o'clock"], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ["on 7 o'clock","at 7 o'clock"],['in Baker Street','on Baker Street'],['in Friday','on Friday'],['on July','in July'],['at Monday','on Monday'],['on the morning','in the morning'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:['at','up','I','wake','7'], ans:['I','wake','up','at','7'] },
      { words:['on','lives','She','Baker','Street'], ans:['She','lives','on','Baker','Street'] },
      { words:['on','is','party','The','Friday'], ans:['The','party','is','on','Friday'] } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la preposicion incorrecta y elige la correccion.',
    sents:[
      { words:['I','wake','up','on','7','.'], wi:3, correct:'at', choices:['at','on','in','to'] },
      { words:['She','lives','in','Baker','Street','.'], wi:2, correct:'on', choices:['on','in','at','to'] },
      { words:['The','party','is','in','Friday','.'], wi:3, correct:'on', choices:['on','in','at','to'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"I wake up at 7." es correcto.', ans:true, expl:'Correcto. at con horas.' },
      { text:'"She lives in Baker Street." es correcto.', ans:false, expl:'Falso. Con calles se usa on: on Baker Street.' },
      { text:'"The party is on Friday." es correcto.', ans:true, expl:'Correcto. on con dias.' },
      { text:'"My birthday is on July." es correcto.', ans:false, expl:'Falso. Con meses se usa in: in July.' } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo eligiendo la correccion.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Is "in Friday" correct?', blank:false },
      { speaker:1, text:null, blank:true, opts:['No, it is "on Friday".','Yes, it is correct.','No, it is "at Friday".','No, it is "to Friday".'], correct:0 },
      { speaker:0, text:'And "on July"?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It should be "in July".','It is correct.','It should be "at July".','It should be "to July".'], correct:0 },
      { speaker:0, text:'Got it!', blank:false } ] }
]);

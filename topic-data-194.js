/* topic-data-194.js - Juego 194/350 | T28 5/7 PHRASAL VERBS I | en oraciones con objeto (MEZCLADO) | Oro B1 */
_registerGames(194, 'Phrasal Verbs · Con Objeto', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Puedes apagar las luces?', opts:['Can you turn off the lights?','Can you turn the lights?','Can you off the lights?','Can you turn lights off the?'], correct:0 },
      { src:'Puedes apagarlas?', opts:['Can you turn off them?','Can you turn them off?','Can you them turn off?','Can you off turn them?'], correct:1 },
      { src:'Ella recogio a los ninos', opts:['She picked up the children','She picked the up children','She up picked the children','She picked children the up'], correct:0 },
      { src:'Los recogio', opts:['She picked up them','She picked them up','She them picked up','She up picked them'], correct:1 },
      { src:'Apaga la television', opts:['Turn off the TV','Turn the off TV','Off turn the TV','Turn TV the off'], correct:0 },
      { src:'Apagala', opts:['Turn off it','Turn it off','It turn off','Off it turn'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Con un objeto pronombre (it/them), el phrasal separable va...', opts:['verbo + particula + pronombre','verbo + pronombre + particula','pronombre + verbo + particula','particula + verbo'], correct:1 },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['off','Can','you','turn','the','lights'],ans:['Can','you','turn','off','the','lights']},{words:['up','She','picked','the','children'],ans:['She','picked','up','the','children']},{words:['off','Turn','it'],ans:['Turn','it','off']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra mal ubicada y elige la correccion.',
    sents:[
      { words:['Turn','off','them','.'], wi:1, correct:'them', choices:['them','off','it','up'] },
      { words:['She','picked','up','them','.'], wi:2, correct:'them', choices:['them','up','off','in'] },
      { words:['Turn','off','it','.'], wi:1, correct:'it', choices:['it','off','them','on'] } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'Can you turn ', ans:'them off', post:'?', bank:['them off','off them','them of','off them now'] },
      { pre:'She picked ', ans:'them up', post:' from school.', bank:['them up','up them','them in','in them'] },
      { pre:'Please turn ', ans:'it on', post:'.', bank:['it on','on it','it in','in it'] },
      { pre:'I will pick ', ans:'you up', post:' at eight.', bank:['you up','up you','you in','in you'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"Turn it off." es correcto.', ans:true, expl:'Correcto. pronombre en medio.' },
      { text:'"Turn off it." es correcto.', ans:false, expl:'Falso. Turn it off.' },
      { text:'"She picked the children up." es correcto.', ans:true, expl:'Correcto. nombre puede ir en medio o al final.' },
      { text:'"She picked up them." es correcto.', ans:false, expl:'Falso. She picked them up.' } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'The lights are still on.', blank:false },
      { speaker:1, text:null, blank:true, opts:['I will turn them off.','I will turn off them.','I will them turn off.','I will off turn them.'], correct:0 },
      { speaker:0, text:'Who gets the kids?', blank:false },
      { speaker:1, text:null, blank:true, opts:['I will pick them up.','I will pick up them.','I will them pick up.','I will up pick them.'], correct:0 },
      { speaker:0, text:'Thanks.', blank:false } ] }
]);

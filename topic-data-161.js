/* topic-data-161.js - Juego 161/350 | T23 7/7 WILL & MIGHT | errores con will/may/might (MEZCLADO) | Oro B1 */
_registerGames(161, 'Will y May/Might · Errores', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Ella te llamara mas tarde', opts:['She will to call you later','She will call you later','She wills call you later','She will calling you later'], correct:1 },
      { src:'El podria estar en casa', opts:['He might to be at home','He might be at home','He mights be at home','He might being at home'], correct:1 },
      { src:'Quiza vaya', opts:['I will might go','I might go','I might to go','I mights go'], correct:1 },
      { src:'No vendre', opts:["I won't to come","I won't come","I willn't come","I will not to come"], correct:1 },
      { src:'Puede que llueva', opts:['It may to rain','It may rain','It mays rain','It may raining'], correct:1 },
      { src:'Te ayudare', opts:['I will to help you','I will help you','I wills help you','I will helping you'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['She will to call','She will call','She wills call','She will calling'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['will to call','will call'],['might to be','might be'],['I will might go','I might go'],["won't to come","won't come"],['may to rain','may rain'],['mights go','might go'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['call','She','will','you'],ans:['She','will','call','you']},{words:['be','He','might','home','at'],ans:['He','might','be','at','home']},{words:['go','I','might'],ans:['I','might','go']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She','wills','call','you','.'], wi:1, correct:'will', choices:['will','wills','will to','willing'] },
      { words:['He','might','being','home','.'], wi:2, correct:'be', choices:['be','being','been','is'] },
      { words:['I','mights','go','.'], wi:1, correct:'might', choices:['might','mights','might to','mighting'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['L','I','W','L'],ans:'WILL',hint:'corrige will to'},{scrambled:['T','H','G','I','M'],ans:'MIGHT',hint:'corrige might to'},{scrambled:['E','B'],ans:'BE',hint:'might ... home'},{scrambled:['Y','A','M'],ans:'MAY',hint:'corrige may to'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'Los modales (will/may/might) no llevan "to" despues.', ans:true, expl:'Correcto. will call, might be.' },
      { text:'"She will to call." es correcto.', ans:false, expl:'Falso. She will call.' },
      { text:'No se pueden combinar dos modales: "will might".', ans:true, expl:'Correcto. Solo uno.' },
      { text:'"He might to be home." es correcto.', ans:false, expl:'Falso. He might be home.' } ] }
]);

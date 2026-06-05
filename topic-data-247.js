/* topic-data-247.js - Juego 247/350 | T36 2/7 REGISTER SHIFT | hedging (ESPECIALIZADO) | Platino B2 */
_registerGames(247, 'Hedging · Matizacion', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Para suavizar una afirmacion insegura se usa...', opts:['definitely','it seems that','certainly','without doubt'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada expresion de hedging con su funcion.',
    pairs:[ ['seem to','parece que'],['tend to','suele'],['it appears that','al parecer'],['approximately','aproximadamente'],['it would seem','pareceria'],['roughly','mas o menos'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la expresion de hedging correcta.',
    sents:[
      { pre:'The results ', ans:'seem to', post:' support the theory.', bank:['seem to','definitely','certainly','must'] },
      { pre:'Prices ', ans:'tend to', post:' rise in winter.', bank:['tend to','always','never','must'] },
      { pre:'It ', ans:'appears', post:' that the data is incomplete.', bank:['appears','proves','confirms','guarantees'] },
      { pre:'There were ', ans:'approximately', post:' 200 people.', bank:['approximately','exactly','precisely','definitely'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"it seems that" suaviza una afirmacion.', ans:true, expl:'Correcto. expresa incertidumbre.' },
      { text:'"definitely" es una expresion de hedging.', ans:false, expl:'Falso. expresa certeza total.' },
      { text:'"tend to" indica una tendencia, no una certeza.', ans:true, expl:'Correcto.' },
      { text:'"approximately" indica un numero exacto.', ans:false, expl:'Falso. indica aproximacion.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Suaviza cada afirmacion con hedging.',
    transforms:[
      { original:'The results support the theory.', task:'Hedging', opts:['The results seem to support the theory.','The results definitely support the theory.','The results certainly support the theory.','The results must support the theory.'], correct:0 },
      { original:'Prices rise in winter.', task:'Hedging', opts:['Prices tend to rise in winter.','Prices always rise in winter.','Prices must rise in winter.','Prices definitely rise in winter.'], correct:0 },
      { original:'The data is incomplete.', task:'Hedging', opts:['It appears that the data is incomplete.','The data is definitely incomplete.','The data is certainly incomplete.','The data must be incomplete.'], correct:0 },
      { original:'There were 200 people.', task:'Hedging', opts:['There were approximately 200 people.','There were exactly 200 people.','There were precisely 200 people.','There were definitely 200 people.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo de forma matizada.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Are you sure about the figures?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It would seem so, but I am not certain.','It is definitely so, no doubt.','It is certainly so, for sure.','It must be so, without question.'], correct:0 },
      { speaker:0, text:'How many came?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Roughly fifty, I think.','Exactly fifty, no more.','Precisely fifty, for certain.','Definitely fifty.'], correct:0 },
      { speaker:0, text:'I see.', blank:false } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra de hedging.',
    words:[ {scrambled:['M','E','E','S'],ans:'SEEM',hint:'... to support'},{scrambled:['D','N','E','T'],ans:'TEND',hint:'... to rise'},{scrambled:['S','R','A','E','P','P','A'],ans:'APPEARS',hint:'it ... that'},{scrambled:['Y','L','H','G','U','O','R'],ans:'ROUGHLY',hint:'mas o menos'} ] }
]);

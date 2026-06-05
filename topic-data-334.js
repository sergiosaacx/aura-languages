/* topic-data-334.js - Juego 334/350 | T48 5/7 GRAMMAR EDGE | estructuras sintacticas avanzadas (MEZCLADO) | Challenger C2 */
_registerGames(334, 'Estructuras Sintacticas Avanzadas · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Habiendose deteriorado la situacion, el gobierno decidio intervenir', opts:['The situation having deteriorated rapidly, the government decided to intervene','The situation deteriorated, government intervened','Having deteriorated the situation, government decided','The government decided, situation deteriorating'], correct:0 },
      { src:'Considerando todo, fue un logro notable', opts:['All things considered, it was a remarkable achievement','Considering all, it was remarkable','All considered, achievement remarkable','It was remarkable, considering all things badly'], correct:0 },
      { src:'Si el tiempo lo permite, saldremos', opts:['Weather permitting, we will go out','Weather permits, we go out','If weather, we go out','Permitting the weather, out we go'], correct:0 },
      { src:'Dicho esto, hay matices', opts:['That said, there are nuances','Said that, nuances there','That saying, there nuances','There are nuances, said that'], correct:0 },
      { src:'Con la reunion terminada, nos fuimos', opts:['The meeting over, we left','The meeting was over and left','Over the meeting, we left','We left the meeting being over'], correct:0 },
      { src:'A todos los efectos, esta hecho', opts:['For all intents and purposes, it is done','For all the intents, done it is','To all effects done','It is, for effects, done'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Weather permitting, we will go" es una...', opts:['condicion abreviada','pregunta','orden','negacion'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta.',
    sents:[
      { pre:'The situation ', ans:'having', post:' deteriorated, they acted.', bank:['having','had','has','have'] },
      { pre:'All things ', ans:'considered', post:', it was a success.', bank:['considered','considering','consider','considers'] },
      { pre:'Weather ', ans:'permitting', post:', we will travel.', bank:['permitting','permits','permitted','permit'] },
      { pre:'That ', ans:'said', post:', there are exceptions.', bank:['said','saying','says','say'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['having','The','situation','deteriorated','they','acted'],ans:['The','situation','having','deteriorated','they','acted']},{words:['considered','All','things','it','worked'],ans:['All','things','considered','it','worked']},{words:['permitting','Weather','we','will','go'],ans:['Weather','permitting','we','will','go']} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"The situation having deteriorated, they acted." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"Considering all, it remarkable" es correcto.', ans:false, expl:'Falso. All things considered, it was remarkable.' },
      { text:'"Weather permitting, we will go out." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"Said that, there are nuances." es la forma estandar.', ans:false, expl:'Falso. That said, ...' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma la estructura avanzada correcta.',
    transforms:[
      { original:'situacion deteriorada (participio absoluto)', task:'Estructura', opts:['The situation having deteriorated, they acted.','Having deteriorated the situation, they acted.','The situation deteriorated, acted they.','They acted, situation deteriorating badly.'], correct:0 },
      { original:'todo considerado', task:'Estructura', opts:['All things considered, it was a success.','Considering all things, success.','All considered things, success it.','It was a success, all to consider.'], correct:0 },
      { original:'si el tiempo lo permite', task:'Estructura', opts:['Weather permitting, we will go.','If weather, we go.','Weather permits we go.','Permitting weather out we go.'], correct:0 },
      { original:'dicho esto', task:'Estructura', opts:['That said, there are exceptions.','Said that, exceptions.','That saying, exceptions there.','Exceptions there, said that.'], correct:0 } ] }
  ,{ id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['G','N','I','V','A','H'],ans:'HAVING',hint:'... deteriorated'},{scrambled:['D','E','R','E','D','I','S','N','O','C'],ans:'CONSIDERED',hint:'all things ...'},{scrambled:['G','N','I','T','T','I','M','R','E','P'],ans:'PERMITTING',hint:'weather ...'},{scrambled:['D','I','A','S'],ans:'SAID',hint:'that ...'} ] }
]);

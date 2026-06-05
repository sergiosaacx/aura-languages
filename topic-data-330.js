/* topic-data-330.js - Juego 330/350 | T48 1/7 GRAMMAR EDGE | estructuras sintacticas complejas (ESPECIALIZADO) | Challenger C2 */
_registerGames(330, 'Estructuras Sintacticas de Alta Complejidad', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la traduccion que mantiene la complejidad.',
    items:[
      { src:'Habiendose deteriorado la situacion, el gobierno intervino', opts:['The situation having deteriorated, the government intervened','The situation deteriorated, the government intervened','When situation bad, government acted','The government intervened the situation deteriorating'], correct:0 },
      { src:'Considerando todo, fue un logro notable', opts:['All things considered, it was a remarkable achievement','Considering all the things, it was good','All considered things, remarkable it was','It was remarkable, all things to consider'], correct:0 },
      { src:'Con el trabajo terminado, se fueron a casa', opts:['The work finished, they went home','The work was finished and home','With work finish, home they went','They went home the work finishing'], correct:0 },
      { src:'Dicho esto, hay objeciones', opts:['That said, there are objections','Said that, objections there are','That saying, objections exist','There are objections, that said before'], correct:0 },
      { src:'El sol habiendose puesto, encendimos las luces', opts:['The sun having set, we turned on the lights','The sun set, we lights on','Having the sun set, lights we turned','We turned lights, the sun setting on'], correct:0 },
      { src:'A todos los efectos, el proyecto concluyo', opts:['For all intents and purposes, the project concluded','For all the intents, project ended','To all effects, project concluded now','The project, for all effects, concluding'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"The situation having deteriorated, ..." es un...', opts:['participio absoluto','gerundio simple','infinitivo','imperativo'], correct:0 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada estructura con su funcion.',
    pairs:[ ['having deteriorated','participio absoluto'],['all things considered','clausula fija'],['that said','conector de concesion'],['the work finished','nominative absolute'],['for all intents and purposes','expresion fija'],['weather permitting','condicion abreviada'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['deteriorated','The','situation','having','they','acted'],ans:['The','situation','having','deteriorated','they','acted']},{words:['considered','All','things','it','was','good'],ans:['All','things','considered','it','was','good']},{words:['finished','The','work','they','left'],ans:['The','work','finished','they','left']} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"The situation having deteriorated, the government intervened." es correcto.', ans:true, expl:'Correcto. participio absoluto.' },
      { text:'"All things considered" es una clausula fija valida.', ans:true, expl:'Correcto.' },
      { text:'"Having the situation deteriorated" es la forma estandar.', ans:false, expl:'Falso. The situation having deteriorated.' },
      { text:'"Weather permitting, we will go" es correcto.', ans:true, expl:'Correcto. condicion abreviada.' } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['G','N','I','V','A','H'],ans:'HAVING',hint:'... deteriorated'},{scrambled:['D','E','R','E','D','I','S','N','O','C'],ans:'CONSIDERED',hint:'all things ...'},{scrambled:['D','E','H','S','I','N','I','F'],ans:'FINISHED',hint:'the work ...'},{scrambled:['G','N','I','T','T','I','M','R','E','P'],ans:'PERMITTING',hint:'weather ...'} ] }
  ,{ id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra correcta.',
    sents:[
      { pre:'The situation ', ans:'having', post:' deteriorated, they acted.', bank:['having','had','has','have'] },
      { pre:'All things ', ans:'considered', post:', it was good.', bank:['considered','considering','consider','considers'] },
      { pre:'That ', ans:'said', post:', there are objections.', bank:['said','saying','says','say'] },
      { pre:'Weather ', ans:'permitting', post:', we will go.', bank:['permitting','permits','permitted','permit'] } ] }
]);

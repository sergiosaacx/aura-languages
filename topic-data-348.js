/* topic-data-348.js - Juego 348/350 | T50 5/7 NATIVE FLUENCY | naturalidad y fluidez (MEZCLADO) | Challenger C2 */
_registerGames(348, 'Produccion Casi Nativa · Naturalidad y Fluidez', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual suena mas natural?', opts:['I have the intention to go','I am planning to go','I make plans of going','I hold the wish to go'], correct:1 },
  { id:'translate', label:'Mas natural', xp:25, instr:'Elige la version mas natural.',
    items:[
      { src:'tengo la intencion de ir', opts:['I have the intention to go','I am planning to go','I make plans of going','I hold a wish to go'], correct:1 },
      { src:'me di cuenta de que...', opts:['I realised that...','I gave myself account that...','I took notice that...','I made realisation that...'], correct:0 },
      { src:'vale la pena', opts:['it is worth it','it vales the pain','it merits the pain','it pays the pain'], correct:0 },
      { src:'echo de menos a mi familia', opts:['I throw less my family','I miss my family','I lack my family','I want less my family'], correct:1 },
      { src:'al final del dia (en conclusion)', opts:['at the end of the day','in the final of the day','at the day end','to the day final'], correct:0 },
      { src:'no es para tanto', opts:['it is not for so much','it is no big deal','it is not for that much','it has no bigness'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada idea con su version nativa.',
    pairs:[ ['tengo intencion de ir','I am planning to go'],['me di cuenta','I realised'],['vale la pena','it is worth it'],['echo de menos','I miss'],['en conclusion','at the end of the day'],['no es para tanto','it is no big deal'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la opcion mas natural.',
    sents:[
      { pre:'I am ', ans:'planning', post:' to go next week.', bank:['planning','having intention','making plans','holding wish'] },
      { pre:'Honestly, it is no big ', ans:'deal', post:'.', bank:['deal','thing','matter','problem so much'] },
      { pre:'I really ', ans:'miss', post:' my family.', bank:['miss','throw less','lack','want less'] },
      { pre:'At the end of the ', ans:'day', post:', it is worth it.', bank:['day','time','week','matter'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la oracion suena nativa.',
    stmts:[
      { text:'"I am planning to go" suena natural.', ans:true, expl:'Correcto.' },
      { text:'"I throw less my family" es nativo.', ans:false, expl:'Falso. I miss my family.' },
      { text:'"it is worth it" es natural.', ans:true, expl:'Correcto.' },
      { text:'"it is not for so much" es nativo.', ans:false, expl:'Falso. it is no big deal.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige la version mas natural.',
    transforms:[
      { original:'I have the intention to go.', task:'Natural', opts:['I am planning to go.','I have the intention to go.','I make plans of going.','I hold a wish to go.'], correct:0 },
      { original:'I throw less my friends.', task:'Natural', opts:['I miss my friends.','I throw less my friends.','I lack my friends.','I want less my friends.'], correct:0 },
      { original:'It vales the pain.', task:'Natural', opts:['It is worth it.','It vales the pain.','It merits the pain.','It pays the pain.'], correct:0 },
      { original:'It is not for so much.', task:'Natural', opts:['It is no big deal.','It is not for so much.','It has no bigness.','It is not for that much.'], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['G','N','I','N','N','A','L','P'],ans:'PLANNING',hint:'I am ... to go'},{scrambled:['S','S','I','M'],ans:'MISS',hint:'I ... my family'},{scrambled:['H','T','R','O','W'],ans:'WORTH',hint:'it is ... it'},{scrambled:['L','A','E','D'],ans:'DEAL',hint:'no big ...'} ] }
]);

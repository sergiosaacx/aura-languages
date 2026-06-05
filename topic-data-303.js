/* topic-data-303.js - Juego 303/350 | T44 2/7 COLLOCATION MASTER | adjetivo-sustantivo (ESPECIALIZADO) | Diamante C1 */
_registerGames(303, 'Colocaciones Adjetivo-Sustantivo', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es la colocacion convencional?', opts:['strong rain','heavy rain','deep rain','high rain'], correct:1 },
  { id:'translate', label:'Colocacion', xp:25, instr:'Elige el adjetivo colocacional correcto.',
    items:[
      { src:'sueno profundo', opts:['deep sleep','heavy sleep','strong sleep','high sleep'], correct:0 },
      { src:'lluvia fuerte', opts:['strong rain','heavy rain','deep rain','high rain'], correct:1 },
      { src:'cafe cargado', opts:['heavy coffee','deep coffee','strong coffee','high coffee'], correct:2 },
      { src:'altas expectativas', opts:['strong expectations','heavy expectations','high expectations','deep expectations'], correct:2 },
      { src:'a plena luz del dia', opts:['broad daylight','wide daylight','large daylight','big daylight'], correct:0 },
      { src:'fuerte contraste', opts:['sharp contrast','heavy contrast','deep contrast','high contrast'], correct:0 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada sustantivo con su adjetivo colocacional.',
    pairs:[ ['sleep','deep'],['rain','heavy'],['coffee','strong'],['expectations','high'],['daylight','broad'],['contrast','sharp'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca el adjetivo correcto.',
    sents:[
      { pre:'I fell into a ', ans:'deep', post:' sleep.', bank:['deep','heavy','strong','high'] },
      { pre:'We had ', ans:'heavy', post:' rain all day.', bank:['heavy','strong','deep','high'] },
      { pre:'He drinks ', ans:'strong', post:' coffee.', bank:['strong','heavy','deep','high'] },
      { pre:'They have ', ans:'high', post:' expectations.', bank:['high','strong','heavy','deep'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada colocacion es correcta.',
    stmts:[
      { text:'"deep sleep" es correcto.', ans:true, expl:'Correcto.' },
      { text:'"strong rain" es la forma convencional.', ans:false, expl:'Falso. heavy rain.' },
      { text:'"strong coffee" es correcto.', ans:true, expl:'Correcto.' },
      { text:'"deep coffee" es la forma convencional.', ans:false, expl:'Falso. strong coffee.' } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca el adjetivo incorrecto y elige la correccion.',
    sents:[
      { words:['We','had','strong','rain','.'], wi:2, correct:'heavy', choices:['heavy','strong','deep','high'] },
      { words:['He','drinks','deep','coffee','.'], wi:2, correct:'strong', choices:['strong','deep','heavy','high'] },
      { words:['I','had','a','heavy','sleep','.'], wi:3, correct:'deep', choices:['deep','heavy','strong','high'] } ] },
  { id:'scramble', label:'Descifra el adjetivo', xp:20, instr:'Forma el adjetivo.',
    words:[ {scrambled:['P','E','E','D'],ans:'DEEP',hint:'... sleep'},{scrambled:['Y','V','A','E','H'],ans:'HEAVY',hint:'... rain'},{scrambled:['G','N','O','R','T','S'],ans:'STRONG',hint:'... coffee'},{scrambled:['D','A','O','R','B'],ans:'BROAD',hint:'... daylight'} ] }
]);

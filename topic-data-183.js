/* topic-data-183.js - Juego 183/350 | T27 1/7 VERB PATTERNS | Gerundio vs infinitivo (ESPECIALIZADO) | Oro B1 */
_registerGames(183, 'Gerundio vs Infinitivo · Verbos Comunes', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta del segundo verbo.',
    items:[
      { src:'Disfruto nadar', opts:['I enjoy to swim','I enjoy swimming','I enjoy swim','I enjoy to swimming'], correct:1 },
      { src:'Quiero aprender ingles', opts:['I want learning English','I want to learn English','I want learn English','I want to learning English'], correct:1 },
      { src:'Termine de comer', opts:['I finished to eat','I finished eating','I finished eat','I finish to eat'], correct:1 },
      { src:'Decidi quedarme', opts:['I decided staying','I decided to stay','I decided stay','I decided to staying'], correct:1 },
      { src:'Evito conducir de noche', opts:['I avoid to drive at night','I avoid driving at night','I avoid drive at night','I avoid to driving at night'], correct:1 },
      { src:'Espero verte pronto', opts:['I hope seeing you soon','I hope to see you soon','I hope see you soon','I hope to seeing you soon'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Que verbo va seguido de gerundio (-ing)?', opts:['want','enjoy','decide','hope'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada verbo con la forma que rige.',
    pairs:[ ['enjoy','swimming'],['want','to learn'],['finish','eating'],['decide','to stay'],['avoid','driving'],['hope','to see'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta.',
    sents:[
      { pre:'I enjoy ', ans:'swimming', post:' in the sea.', bank:['swimming','to swim','swim','swims'] },
      { pre:'I want ', ans:'to learn', post:' English.', bank:['to learn','learning','learn','learns'] },
      { pre:'She finished ', ans:'eating', post:'.', bank:['eating','to eat','eat','eats'] },
      { pre:'They decided ', ans:'to stay', post:'.', bank:['to stay','staying','stay','stays'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el verbo.',
    words:[ {scrambled:['Y','O','J','N','E'],ans:'ENJOY',hint:'+ gerundio'},{scrambled:['T','N','A','W'],ans:'WANT',hint:'+ infinitivo'},{scrambled:['D','I','O','V','A'],ans:'AVOID',hint:'+ gerundio'},{scrambled:['E','P','O','H'],ans:'HOPE',hint:'+ infinitivo'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada regla es correcta.',
    stmts:[
      { text:'"enjoy" va seguido de gerundio (-ing).', ans:true, expl:'Correcto. I enjoy swimming.' },
      { text:'"I want swimming." es correcto.', ans:false, expl:'Falso. I want to swim (infinitivo).' },
      { text:'"decide" va seguido de infinitivo (to).', ans:true, expl:'Correcto. I decided to stay.' },
      { text:'"I enjoy to read." es correcto.', ans:false, expl:'Falso. I enjoy reading.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada verbo segun la forma que rige.',
    categories:['+ gerundio (-ing)','+ infinitivo (to)'],
    items:[ {text:'enjoy',correct:0},{text:'want',correct:1},{text:'finish',correct:0},{text:'decide',correct:1},{text:'avoid',correct:0},{text:'hope',correct:1} ] }
]);

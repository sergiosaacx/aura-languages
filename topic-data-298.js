/* topic-data-298.js - Juego 298/350 | T43 4/7 STYLE & REGISTER | understatement y litotes (ESPECIALIZADO) | Diamante C1 */
_registerGames(298, 'Understatement y Litotes', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Not bad at all" como elogio significa...', opts:['malo','muy bueno','regular','aceptable'], correct:1 },
  { id:'translate', label:'Significado real', xp:25, instr:'Elige el significado real.',
    items:[
      { src:'"That is not bad at all" (elogio)', opts:['es malo','es muy bueno','es regular','es feo'], correct:1 },
      { src:'"It is not exactly cheap"', opts:['es barato','es bastante caro','es gratis','es razonable'], correct:1 },
      { src:'"She is no fool"', opts:['es tonta','es muy inteligente','es ingenua','es lenta'], correct:1 },
      { src:'"I was a little annoyed" (tras un gran problema)', opts:['estaba tranquilo','estaba muy enfadado','estaba feliz','no me importo'], correct:1 },
      { src:'"It is not the best idea"', opts:['es excelente','es una mala idea','es perfecta','es genial'], correct:1 },
      { src:'"He is not unkind"', opts:['es cruel','es bastante amable','es indiferente','es duro'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada understatement con su significado real.',
    pairs:[ ['not bad at all','muy bueno'],['not exactly cheap','muy caro'],['no fool','muy listo'],['a little annoyed','muy enfadado'],['not the best idea','una mala idea'],['not unkind','bastante amable'] ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada afirmacion es correcta.',
    stmts:[
      { text:'"Not bad" puede ser un elogio fuerte.', ans:true, expl:'Correcto. understatement.' },
      { text:'"It is not exactly cheap" significa que es barato.', ans:false, expl:'Falso. significa que es caro.' },
      { text:'Litotes es afirmar algo negando lo contrario.', ans:true, expl:'Correcto. no fool = listo.' },
      { text:'El understatement exagera lo dicho.', ans:false, expl:'Falso. dice menos para enfatizar.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la palabra del understatement.',
    sents:[
      { pre:'The cake was not ', ans:'bad', post:' at all. (delicioso)', bank:['bad','good','great','perfect'] },
      { pre:'She is no ', ans:'fool', post:'. (muy lista)', bank:['fool','genius','child','expert'] },
      { pre:'It is not exactly ', ans:'cheap', post:'. (caro)', bank:['cheap','expensive','free','costly'] },
      { pre:'He is not ', ans:'unkind', post:'. (amable)', bank:['unkind','kind','rude','cruel'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada expresion segun su valor real.',
    categories:['Significa positivo','Significa negativo'],
    items:[ {text:'not bad at all',correct:0},{text:'not exactly cheap',correct:1},{text:'no fool',correct:0},{text:'a little annoyed',correct:1},{text:'not unkind',correct:0},{text:'not the best idea',correct:1} ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Elige el understatement equivalente.',
    transforms:[
      { original:'It was delicious.', task:'Understatement', opts:['It was not bad at all.','It was a disaster.','It was awful.','It was the worst.'], correct:0 },
      { original:'She is very intelligent.', task:'Litotes', opts:['She is no fool.','She is a fool.','She is unwise.','She is silly.'], correct:0 },
      { original:'It is very expensive.', task:'Understatement', opts:['It is not exactly cheap.','It is quite cheap.','It is free.','It is a bargain.'], correct:0 },
      { original:'He is quite kind.', task:'Litotes', opts:['He is not unkind.','He is unkind.','He is cruel.','He is harsh.'], correct:0 } ] }
]);

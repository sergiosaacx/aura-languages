/* topic-data-127.js - Juego 127/350 | T19 1/7 IF YOU... | Condicional Zero (ESPECIALIZADO) | Plata A2 */
_registerGames(127, 'Condicional Zero · Hechos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige el condicional zero correcto.',
    items:[
      { src:'Si calientas el hielo, se derrite', opts:['If you heat ice, it melts','If you will heat ice, it melts','If you heat ice, it will melt','If you heated ice, it melts'], correct:0 },
      { src:'Si llueve, el suelo se moja', opts:['If it rains, the ground gets wet','If it will rain, the ground gets wet','If it rains, the ground will get wet','If it rained, the ground gets wet'], correct:0 },
      { src:'Si mezclas azul y amarillo, obtienes verde', opts:['If you mix blue and yellow, you get green','If you will mix blue and yellow, you get green','If you mix blue and yellow, you will get green','If you mixed blue and yellow, you get green'], correct:0 },
      { src:'Si no comes, tienes hambre', opts:["If you don't eat, you get hungry","If you won't eat, you get hungry","If you don't eat, you will get hungry","If you didn't eat, you get hungry"], correct:0 },
      { src:'El agua hierve si la calientas', opts:['Water boils if you heat it','Water will boil if you heat it','Water boils if you will heat it','Water boiled if you heat it'], correct:0 },
      { src:'Si tocas fuego, te quemas', opts:['If you touch fire, you burn','If you will touch fire, you burn','If you touch fire, you will burn','If you touched fire, you burn'], correct:0 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'En el condicional zero, que tiempos se usan?', opts:['if + present, present','if + will, present','if + past, would','if + present, will'], correct:0 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma correcta (condicional zero).',
    sents:[
      { pre:'If you heat ice, it ', ans:'melts', post:'.', bank:['melts','will melt','melted','melting'] },
      { pre:'If it ', ans:'rains', post:', the ground gets wet.', bank:['rains','will rain','rained','raining'] },
      { pre:'Water ', ans:'boils', post:' if you heat it.', bank:['boils','will boil','boiled','boiling'] },
      { pre:'If you ', ans:'touch', post:' fire, it burns.', bank:['touch','will touch','touched','touching'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['F','I'],ans:'IF',hint:'condicional'},{scrambled:['S','T','L','E','M'],ans:'MELTS',hint:'ice ...'},{scrambled:['S','L','I','O','B'],ans:'BOILS',hint:'water ...'},{scrambled:['N','R','U','B'],ans:'BURN',hint:'fire makes you ...'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'El condicional zero usa presente en ambas clausulas.', ans:true, expl:'Correcto. If + present, present.' },
      { text:'"If you will heat ice, it melts." es correcto.', ans:false, expl:'Falso. No se usa will en la clausula if.' },
      { text:'"If you heat ice, it melts." es correcto.', ans:true, expl:'Correcto. hecho general.' },
      { text:'El condicional zero usa "would".', ans:false, expl:'Falso. Eso es el condicional 2.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Forma el condicional zero.',
    transforms:[
      { original:'heat ice / it melts', task:'Cond. Zero', opts:['If you heat ice, it melts.','If you will heat ice, it melts.','If you heat ice, it will melt.','If you heated ice, it melts.'], correct:0 },
      { original:'mix colors / get new color', task:'Cond. Zero', opts:['If you mix colors, you get a new one.','If you will mix colors, you get a new one.','If you mix colors, you will get a new one.','If you mixed colors, you get a new one.'], correct:0 },
      { original:"not water plants / they die", task:'Cond. Zero', opts:["If you don't water plants, they die.","If you won't water plants, they die.","If you don't water plants, they will die.","If you didn't water plants, they die."], correct:0 },
      { original:'touch fire / burn', task:'Cond. Zero', opts:['If you touch fire, you burn.','If you will touch fire, you burn.','If you touch fire, you will burn.','If you touched fire, you burn.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'What happens if you heat water to 100 degrees?', blank:false },
      { speaker:1, text:null, blank:true, opts:['If you heat it to 100, it boils.','If you will heat it, it boils.','If you heat it, it will boil.','If you heated it, it boils.'], correct:0 },
      { speaker:0, text:'And if you freeze it?', blank:false },
      { speaker:1, text:null, blank:true, opts:['If you freeze it, it becomes ice.','If you will freeze it, it becomes ice.','If you freeze it, it will become ice.','If you froze it, it becomes ice.'], correct:0 },
      { speaker:0, text:'Science!', blank:false } ] }
]);

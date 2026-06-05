/* topic-data-270.js - Juego 270/350 | T39 4/7 INVERSION | fronting (ESPECIALIZADO) | Diamante C1 */
_registerGames(270, 'Fronting · Llevar el Foco al Inicio', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'El fronting consiste en...', opts:['quitar el sujeto','mover un complemento al inicio para enfatizar','invertir el objeto','omitir el verbo'], correct:1 },
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion con fronting correcta.',
    items:[
      { src:'Sobre la mesa habia un objeto extrano', opts:['On the table a strange object was','On the table was a strange object','A strange object on the table was','On the table there a strange object'], correct:1 },
      { src:'Aqui viene el autobus', opts:['Here the bus comes','Here comes the bus','Comes here the bus','Here is come the bus'], correct:1 },
      { src:'En el centro del jardin se erguia una estatua', opts:['In the centre of the garden stood a statue','In the centre of the garden a statue stood','A statue in the centre stood','In the centre stood the garden a statue'], correct:0 },
      { src:'Tan emocionante fue la pelicula que lloramos', opts:['So exciting the film was that we cried','So exciting was the film that we cried','So exciting was that the film we cried','The film so exciting was that we cried'], correct:1 },
      { src:'Alli van', opts:['There go they','There they go','There they going','Go there they'], correct:1 },
      { src:'Bajo el puente se escondia un gato', opts:['Under the bridge a cat hid','Under the bridge hid a cat','Under the bridge was hid a cat','A cat under the bridge hid'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada oracion normal con su version con fronting.',
    pairs:[ ['A statue stood in the centre','In the centre stood a statue'],['The bus comes here','Here comes the bus'],['A cat hid under the bridge','Under the bridge hid a cat'],['An object was on the table','On the table was an object'],['They go there','There they go'],['A river ran below','Below ran a river'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['was','On','the','table','a','strange','object'],ans:['On','the','table','was','a','strange','object']},{words:['comes','Here','the','bus'],ans:['Here','comes','the','bus']},{words:['stood','In','the','centre','a','statue'],ans:['In','the','centre','stood','a','statue']} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion con fronting es correcta.',
    stmts:[
      { text:'"On the table was a strange object." es fronting correcto.', ans:true, expl:'Correcto.' },
      { text:'"Here the bus comes." es fronting correcto.', ans:false, expl:'Falso. Here comes the bus.' },
      { text:'"In the centre stood a statue." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"There they go." es correcto.', ans:true, expl:'Correcto. con pronombre el orden se mantiene.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Reescribe con fronting.',
    transforms:[
      { original:'A strange object was on the table.', task:'Fronting', opts:['On the table was a strange object.','On the table a strange object was.','A strange object on the table was.','On the table there an object.'], correct:0 },
      { original:'The bus comes here.', task:'Fronting', opts:['Here comes the bus.','Here the bus comes.','Comes here the bus.','Here is come the bus.'], correct:0 },
      { original:'A statue stood in the centre.', task:'Fronting', opts:['In the centre stood a statue.','In the centre a statue stood.','A statue in the centre stood.','In the centre was stood a statue.'], correct:0 },
      { original:'A cat hid under the bridge.', task:'Fronting', opts:['Under the bridge hid a cat.','Under the bridge a cat hid.','A cat under the bridge hid.','Under the bridge was hid a cat.'], correct:0 } ] }
  ,{ id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra del fronting.',
    words:[ {scrambled:['N','O'],ans:'ON',hint:'... the table was an object'},{scrambled:['E','R','E','H'],ans:'HERE',hint:'... comes the bus'},{scrambled:['D','O','O','T','S'],ans:'STOOD',hint:'In the centre ...'},{scrambled:['R','E','D','N','U'],ans:'UNDER',hint:'... the bridge hid a cat'} ] }
]);

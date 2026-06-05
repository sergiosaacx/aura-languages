/* topic-data-245.js - Juego 245/350 | T35 7/7 NOUN POWER | errores de nominalizaciones y colocaciones (MEZCLADO) | Platino B2 */
_registerGames(245, 'Nominalizaciones y Colocaciones · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'El desarrollo de la app tomo meses', opts:['The develop of the app took months','The development of the app took months','The developing of the app took months','The developed of the app took months'], correct:1 },
      { src:'Tomo una buena decision', opts:['She did a good decision','She made a good decision','She took a good decision then','She gave a good decision'], correct:1 },
      { src:'Logro algo grande', opts:['He took a big achievement','He achieved something great','He made a big achievement only','He did a big achievement'], correct:1 },
      { src:'Presta atencion', opts:['Give attention','Pay attention','Make attention','Do attention'], correct:1 },
      { src:'Hicieron una investigacion', opts:['They made research','They did research','They took research','They gave research'], correct:1 },
      { src:'Cometio un error', opts:['He did a mistake','He made a mistake','He took a mistake','He gave a mistake'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:['did a decision','made a decision','took a decision now','gave a decision'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ['the develop of the app','the development of the app'],['did a good decision','made a good decision'],['took an achievement','achieved something'],['give attention','pay attention'],['made research','did research'],['did a mistake','made a mistake'] ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['development','The','took','months'],ans:['The','development','took','months']},{words:['decision','She','made','a','good'],ans:['She','made','a','good','decision']},{words:['attention','Pay','please'],ans:['Pay','attention','please']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la parte incorrecta y elige la correccion.',
    sents:[
      { words:['The','develop','took','months','.'], wi:1, correct:'development', choices:['development','develop','developing','developed'] },
      { words:['She','did','a','good','decision','.'], wi:1, correct:'made', choices:['made','did','took','gave'] },
      { words:['They','made','research','.'], wi:1, correct:'did', choices:['did','made','took','gave'] } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['T','N','E','M','P','O','L','E','V','E','D'],ans:'DEVELOPMENT',hint:'corrige develop'},{scrambled:['E','D','A','M'],ans:'MADE',hint:'... a decision'},{scrambled:['D','I','A','P'],ans:'PAID',hint:'... attention'},{scrambled:['D','I','D'],ans:'DID',hint:'... research'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"She made a good decision." es correcto.', ans:true, expl:'Correcto.' },
      { text:'"The develop of the app took months." es correcto.', ans:false, expl:'Falso. The development.' },
      { text:'"Pay attention." es la colocacion correcta.', ans:true, expl:'Correcto.' },
      { text:'"They made research." es correcto.', ans:false, expl:'Falso. did research.' } ] }
]);

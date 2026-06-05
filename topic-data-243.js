/* topic-data-243.js - Juego 243/350 | T35 5/7 NOUN POWER | abstractos y nominalizaciones en contexto (MEZCLADO) | Platino B2 */
_registerGames(243, 'Abstractos y Nominalizaciones · En Contexto', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'El desarrollo de nuevas tecnologias cambio la comunicacion', opts:['The develop of new technologies changed communication','The development of new technologies changed communication','The developing of new technologies changed communication','The developed of new technologies changed communication'], correct:1 },
      { src:'Su determinacion lo llevo al exito', opts:['His determine led to his success','His determination led to his success','His determined led to his success','His determining led to his success'], correct:1 },
      { src:'La decision afecto a muchos', opts:['The decide affected many','The decision affected many','The decisive affected many','The deciding affected many'], correct:1 },
      { src:'El conocimiento es poder', opts:['Knowing is power','Knowledge is power','Known is power','Knew is power'], correct:1 },
      { src:'Hizo grandes progresos', opts:['She did great progress','She made great progress','She took great progress','She gave great progress'], correct:1 },
      { src:'La importancia del estudio es clara', opts:['The significant of the study is clear','The significance of the study is clear','The significantly of the study is clear','The signify of the study is clear'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'The ___ of new technologies changed communication. (develop)', opts:['develop','development','developing','developed'], correct:1 },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la forma nominal correcta.',
    sents:[
      { pre:'The ', ans:'development', post:' of the app took years.', bank:['development','develop','developing','developed'] },
      { pre:'His ', ans:'determination', post:' was inspiring.', bank:['determination','determine','determined','determining'] },
      { pre:'They reached a ', ans:'decision', post:'.', bank:['decision','decide','decisive','deciding'] },
      { pre:'The ', ans:'significance', post:' of the result is clear.', bank:['significance','significant','signify','significantly'] } ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['development','The','changed','communication'],ans:['The','development','changed','communication']},{words:['determination','His','was','admirable'],ans:['His','determination','was','admirable']},{words:['decision','The','affected','many'],ans:['The','decision','affected','many']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la forma incorrecta y elige la correccion.',
    sents:[
      { words:['The','develop','of','the','app','took','years','.'], wi:1, correct:'development', choices:['development','develop','developing','developed'] },
      { words:['His','determine','was','clear','.'], wi:1, correct:'determination', choices:['determination','determine','determined','determining'] },
      { words:['She','made','a','decide','.'], wi:3, correct:'decision', choices:['decision','decide','decisive','deciding'] } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Convierte el verbo en su sustantivo en la oracion.',
    transforms:[
      { original:'develop -> ?', task:'Nominaliza', opts:['development','develop','developing','developed'], correct:0 },
      { original:'determine -> ?', task:'Nominaliza', opts:['determination','determine','determined','determining'], correct:0 },
      { original:'decide -> ?', task:'Nominaliza', opts:['decision','decide','decisive','deciding'], correct:0 },
      { original:'significant -> ?', task:'Nominaliza', opts:['significance','significant','signify','significantly'], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el sustantivo.',
    words:[ {scrambled:['T','N','E','M','P','O','L','E','V','E','D'],ans:'DEVELOPMENT',hint:'de develop'},{scrambled:['N','O','I','S','I','C','E','D'],ans:'DECISION',hint:'de decide'},{scrambled:['E','G','D','E','L','W','O','N','K'],ans:'KNOWLEDGE',hint:'conocimiento'},{scrambled:['S','S','E','R','G','O','R','P'],ans:'PROGRESS',hint:'make ...'} ] }
]);

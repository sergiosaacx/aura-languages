/* topic-data-187.js - Juego 187/350 | T27 5/7 VERB PATTERNS | patterns en oraciones (MEZCLADO) | Oro B1 */
_registerGames(187, 'Verb Patterns · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Ella disfruta leer por las tardes', opts:['She enjoys to read in the evenings','She enjoys reading in the evenings','She enjoy reading in the evenings','She enjoys read in the evenings'], correct:1 },
      { src:'El me hizo disculparme', opts:['He made me to apologize','He made me apologize','He made me apologizing','He make me apologize'], correct:1 },
      { src:'La oi cantar en la ducha', opts:['I heard her to sing in the shower','I heard her singing in the shower','I heard her sings in the shower','I heard her to singing'], correct:1 },
      { src:'Decidi mudarme', opts:['I decided moving','I decided to move','I decided move','I decided to moving'], correct:1 },
      { src:'Dejame ayudarte', opts:['Let me to help you','Let me help you','Let me helping you','Let me helps you'], correct:1 },
      { src:'Evito comer tarde', opts:['I avoid to eat late','I avoid eating late','I avoid eat late','I avoid to eating late'], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'En "He made me apologize", apologize esta en...', opts:['gerundio','infinitivo sin to','infinitivo con to','participio'], correct:1 },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el verbo.',
    words:[ {scrambled:['Y','O','J','N','E'],ans:'ENJOY',hint:'+ gerundio'},{scrambled:['E','K','A','M'],ans:'MAKE',hint:'+ inf sin to'},{scrambled:['D','I','C','E','D','E'],ans:'DECIDE',hint:'+ infinitivo'},{scrambled:['R','A','E','H'],ans:'HEAR',hint:'+ -ing o inf sin to'} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['reading','She','enjoys','in','the','evenings'],ans:['She','enjoys','reading','in','the','evenings']},{words:['apologize','He','made','me'],ans:['He','made','me','apologize']},{words:['singing','I','heard','her'],ans:['I','heard','her','singing']} ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la forma incorrecta y elige la correccion.',
    sents:[
      { words:['She','enjoys','read','.'], wi:2, correct:'reading', choices:['reading','read','to read','reads'] },
      { words:['He','made','me','apologizing','.'], wi:3, correct:'apologize', choices:['apologize','apologizing','to apologize','apologizes'] },
      { words:['I','decided','moving','.'], wi:2, correct:'to move', choices:['to move','moving','move','moves'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada verbo segun el patron que rige.',
    categories:['+ gerundio','+ inf con to','+ inf sin to'],
    items:[ {text:'enjoy reading',correct:0},{text:'decide to go',correct:1},{text:'make me wait',correct:2},{text:'avoid eating',correct:0},{text:'want to stay',correct:1},{text:'let him go',correct:2} ] },
  { id:'listen', label:'Escuchar', xp:30, instr:'Escucha y elige la oracion que oyes.',
    items:[
      { tts:'She enjoys reading in the evenings.', type:'select', opts:['She enjoys reading in the evenings.','She enjoys to read in the evenings.','She enjoy reading in the evenings.','She enjoys read in the evenings.'], correct:0 },
      { tts:'He made me apologize to everyone.', type:'select', opts:['He made me apologize to everyone.','He made me to apologize to everyone.','He made me apologizing to everyone.','He make me apologize.'], correct:0 },
      { tts:'I heard her singing in the shower.', type:'select', opts:['I heard her singing in the shower.','I heard her to sing in the shower.','I heard her sings in the shower.','I heard her to singing.'], correct:0 } ] }
]);

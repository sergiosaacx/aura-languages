/* topic-data-056.js - Juego 56/350 | T8 7/7 DAILY HABITS | errores tipicos (MEZCLADO) | Bronce A1 */
_registerGames(56, 'Presente Simple · Errores Tipicos', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la forma correcta.',
    items:[
      { src:'Ella no trabaja los domingos', opts:["She don't work on Sundays","She doesn't work on Sundays","She doesn't works on Sundays","She not work on Sundays"], correct:1 },
      { src:'Trabaja el aqui?', opts:['Does he works here?','Does he work here?','Do he work here?','Is he work here?'], correct:1 },
      { src:'Ellos no hacen deporte', opts:["They doesn't play sports","They don't play sports","They don't plays sports","They not play sports"], correct:1 },
      { src:'El estudia mucho', opts:['He study a lot','He studies a lot','He studys a lot','He studyes a lot'], correct:1 },
      { src:'Le gusta a ella el te?', opts:['Do she like tea?','Does she likes tea?','Does she like tea?','Is she like tea?'], correct:2 },
      { src:'Nosotros no vivimos aqui', opts:["We doesn't live here","We don't live here","We don't lives here","We not live here"], correct:1 } ] },
  { id:'mc', label:'Quiz Rapido', xp:25, q:'Cual es correcto?', opts:["She don't work","She doesn't work","She doesn't works","She not work"], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada error con su correccion.',
    pairs:[ ["She don't work","She doesn't work"],['Does he works?','Does he work?',],["They doesn't play","They don't play"],['He study','He studies'],['Do she like it?','Does she like it?'],['He go to work','He goes to work'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra correcta.',
    words:[ {scrambled:['E','S','O','D'],ans:'DOES',hint:'auxiliar con he/she/it'},{scrambled:['S','I','E','D','U','T','S'],ans:'STUDIES',hint:'el estudia'},{scrambled:['S','E','O','G'],ans:'GOES',hint:'el va'},{scrambled:['K','O','R','W'],ans:'WORK',hint:'Does he ...?'} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[
      { words:["doesn't",'She','work','here'], ans:['She',"doesn't",'work','here'] },
      { words:['he','Does','work','here'], ans:['Does','he','work','here'] },
      { words:['studies','He','a','lot'], ans:['He','studies','a','lot'] } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['She',"don't",'work','on','Sundays','.'], wi:1, correct:"doesn't", choices:["doesn't","don't","isn't","not"] },
      { words:['Does','he','works','here','?'], wi:2, correct:'work', choices:['work','works','working','worked'] },
      { words:['They',"doesn't",'play','sports','.'], wi:1, correct:"don't", choices:["don't","doesn't","isn't","aren't"] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'"He goes to work." es correcto.', ans:true, expl:'Correcto. go -> goes en 3ra persona.' },
      { text:'"She don\'t like it." es correcto.', ans:false, expl:"Falso. Con she: She doesn't like it." },
      { text:'"Do they study?" es correcto.', ans:true, expl:'Correcto. Do con they.' },
      { text:'"Does he works?" es correcto.', ans:false, expl:'Falso. Con does el verbo no lleva -s.' } ] }
]);

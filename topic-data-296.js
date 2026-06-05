/* topic-data-296.js - Juego 296/350 | T43 2/7 STYLE & REGISTER | ironia y sarcasmo (ESPECIALIZADO) | Diamante C1 */
_registerGames(296, 'Ironia y Sarcasmo', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'La ironia comunica...', opts:['lo mismo que dice','lo contrario de lo que dice','solo informacion','una pregunta'], correct:1 },
  { id:'translate', label:'Significado real', xp:25, instr:'Elige el significado real del enunciado ironico.',
    items:[
      { src:'(bajo la lluvia) "Lovely weather!"', opts:['It is sunny','The weather is bad','I love rain','It is warm'], correct:1 },
      { src:'(tras un error) "Great job!"', opts:['You did well','You did badly','Well done truly','Keep going'], correct:1 },
      { src:'(en un atasco) "This is going so fast"', opts:['We are quick','We are stuck','I am happy','We arrived'], correct:1 },
      { src:'(ante un desastre) "Just perfect"', opts:['It is perfect','It is a disaster','I am pleased','All is fine'], correct:1 },
      { src:'(a alguien muy lento) "No rush at all"', opts:['Take your time','Please hurry up','I am patient','It is fine slowly'], correct:1 },
      { src:'(tras una grosería) "How polite"', opts:['Very polite indeed','Very rude','Quite kind','So gentle'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada frase ironica con su significado real.',
    pairs:[ ['Lovely weather! (raining)','el clima es malo'],['Great job! (after a mistake)','lo hiciste mal'],['No rush! (to a slow person)','date prisa'],['Just perfect (a disaster)','es un desastre'],['How polite (after rudeness)','fue grosero'],['So fast (in a jam)','vamos lentisimo'] ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la interpretacion es correcta.',
    stmts:[
      { text:'"Lovely weather!" bajo la lluvia es ironico.', ans:true, expl:'Correcto. significa lo contrario.' },
      { text:'La ironia debe interpretarse siempre literalmente.', ans:false, expl:'Falso. el contexto revela el sentido opuesto.' },
      { text:'"Great job!" tras un error suele ser sarcasmo.', ans:true, expl:'Correcto.' },
      { text:'El tono y el contexto no afectan a la ironia.', ans:false, expl:'Falso. son clave para detectarla.' } ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la respuesta ironica adecuada.',
    sents:[
      { pre:'(stuck in traffic) "Oh, we are moving so ', ans:'fast', post:'."', bank:['fast','slowly','well','badly'] },
      { pre:'(after spilling coffee) "', ans:'Perfect', post:'."', bank:['Perfect','Awful','Sad','Wet'] },
      { pre:'(raining hard) "What ', ans:'lovely', post:' weather!"', bank:['lovely','terrible','grey','wet'] },
      { pre:'(after a rude reply) "How ', ans:'charming', post:'."', bank:['charming','rude','unkind','harsh'] } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada enunciado.',
    categories:['Literal','Ironico'],
    items:[ {text:'Lovely weather! (sunny day)',correct:0},{text:'Lovely weather! (storm)',correct:1},{text:'Great job! (real success)',correct:0},{text:'Great job! (big mistake)',correct:1},{text:'So fast! (a racing car)',correct:0},{text:'So fast! (a traffic jam)',correct:1} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Identifica la intencion ironica.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'I forgot the tickets at home.', blank:false },
      { speaker:1, text:null, blank:true, opts:['Oh, brilliant. Just what we needed.','Oh, brilliant. That is wonderful news.','Oh, brilliant. I am so happy.','Oh, brilliant. Well organised.'], correct:0 },
      { speaker:0, text:'It started raining on our picnic.', blank:false },
      { speaker:1, text:null, blank:true, opts:['Perfect timing, as always.','Perfect timing, the sun is out.','Perfect timing, so dry today.','Perfect timing, lovely sunshine.'], correct:0 },
      { speaker:0, text:'Tell me about it.', blank:false } ] }
]);

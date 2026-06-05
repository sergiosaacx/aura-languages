/* topic-data-131.js - Juego 131/350 | T19 5/7 IF YOU... | condicionales en oraciones (MEZCLADO) | Plata A2 */
_registerGames(131, 'Condicionales · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Si estudias mucho, aprobaras', opts:['If you study hard, you pass','If you study hard, you will pass','If you will study hard, you pass','If you studied hard, you pass'], correct:1 },
      { src:'El agua hierve si la calientas a 100', opts:['Water boils if you heat it to 100','Water will boil if you heat it to 100','Water boils if you will heat it to 100','Water boiled if you heat it to 100'], correct:0 },
      { src:'Si lo riegas, la planta crece', opts:['If you water it, the plant grows','If you will water it, the plant grows','If you water it, the plant will grow','If you watered it, the plant grows'], correct:0 },
      { src:'Te llamare si tengo tiempo', opts:['I will call you if I have time','I call you if I have time','I will call you if I will have time','I will call you if I had time'], correct:0 },
      { src:'Si hace sol, iremos a la playa', opts:["If it is sunny, we go to the beach","If it is sunny, we will go to the beach","If it will be sunny, we go to the beach","If it was sunny, we go to the beach"], correct:1 },
      { src:'Si lo congelas, se vuelve hielo', opts:['If you freeze it, it becomes ice','If you will freeze it, it becomes ice','If you freeze it, it will become ice','If you froze it, it becomes ice'], correct:0 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada clausula con su parte correcta.',
    pairs:[ ['If you study','you will pass'],['Water boils','if you heat it'],['If it rains','we will stay'],['If you water it','it grows'],['I will help','if you ask'],['If she calls','I will answer'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['F','I'],ans:'IF',hint:'condicional'},{scrambled:['L','I','W','L'],ans:'WILL',hint:'condicional 1'},{scrambled:['S','S','A','P'],ans:'PASS',hint:'you will ...'},{scrambled:['S','L','I','O','B'],ans:'BOILS',hint:'water ...'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada parte segun la clausula.',
    categories:['Clausula if','Clausula resultado'],
    items:[ {text:'you study',correct:0},{text:'you will pass',correct:1},{text:'it rains',correct:0},{text:'we will stay',correct:1},{text:'you heat it',correct:0},{text:'it boils',correct:1} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['will','If','you','study','you','pass'],ans:['If','you','study','you','will','pass']},{words:['if','Water','boils','you','heat','it'],ans:['Water','boils','if','you','heat','it']},{words:['will','I','help','if','you','ask'],ans:['I','will','help','if','you','ask']} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Will you go to the party?', blank:false },
      { speaker:1, text:null, blank:true, opts:['If I have time, I will go.','If I will have time, I go.','If I have time, I go.','If I had time, I go.'], correct:0 },
      { speaker:0, text:'What happens if you heat water a lot?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It boils if you heat it enough.','It will boil if you will heat it.','It boil if you heat it.','It boiled if you heat it.'], correct:0 },
      { speaker:0, text:'Right!', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['If','you','study','you','pass','the','exam','.'], wi:4, correct:'will pass', choices:['will pass','pass','passed','passes'] },
      { words:['Water','boil','if','you','heat','it','.'], wi:1, correct:'boils', choices:['boils','boil','will boil','boiled'] },
      { words:['I','call','you','if','I','have','time','.'], wi:1, correct:'will call', choices:['will call','call','called','calls'] } ] }
]);

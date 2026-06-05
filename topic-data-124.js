/* topic-data-124.js - Juego 124/350 | T18 5/7 CAN YOU? | oraciones con 3 modales (MEZCLADO) | Plata A2 */
_registerGames(124, 'Modales · En Oraciones', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la oracion correcta.',
    items:[
      { src:'Deberias beber mas agua', opts:['You should to drink more water','You should drink more water','You shoulds drink more water','You should drinking more water'], correct:1 },
      { src:'Ella no puede venir', opts:["She can't to come","She can't come","She cannot to come","She can't coming"], correct:1 },
      { src:'Debemos terminar esto hoy', opts:['We must to finish this today','We must finish this today','We musts finish this today','We must finishing this today'], correct:1 },
      { src:'Puedes nadar?', opts:['Can you to swim?','Can you swim?','Cans you swim?','Can you swimming?'], correct:1 },
      { src:'No deberias fumar', opts:["You shouldn't to smoke","You shouldn't smoke","You shoulds not smoke","You shouldn't smoking"], correct:1 },
      { src:'Tienes que estudiar', opts:['You have to study','You have study','You must to study','You haves to study'], correct:0 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada frase en espanol con su forma en ingles.',
    pairs:[ ['deberias descansar','You should rest'],['no puedo ir',"I can't go"],['debemos pagar','We must pay'],['puedes ayudar?','Can you help?'],['no deberias fumar',"You shouldn't smoke"],['tienes que trabajar','You have to work'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el modal.',
    words:[ {scrambled:['D','L','U','O','H','S'],ans:'SHOULD',hint:'consejo'},{scrambled:['N','A','C'],ans:'CAN',hint:'habilidad'},{scrambled:['T','S','U','M'],ans:'MUST',hint:'obligacion'},{scrambled:['P','E','L','H'],ans:'HELP',hint:'Can you ...?'} ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada modal segun su funcion.',
    categories:['Habilidad','Obligacion','Consejo'],
    items:[ {text:'can',correct:0},{text:'must',correct:1},{text:'should',correct:2},{text:"can't",correct:0},{text:'have to',correct:1},{text:"shouldn't",correct:2} ] },
  { id:'order', label:'Ordena las palabras', xp:30, instr:'Toca las palabras en el orden correcto.',
    sents:[ {words:['should','You','drink','water'],ans:['You','should','drink','water']},{words:["can't",'She','come'],ans:['She',"can't",'come']},{words:['must','We','finish','this'],ans:['We','must','finish','this']} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con modales.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'I am very tired.', blank:false },
      { speaker:1, text:null, blank:true, opts:['You should rest.','You should to rest.','You shoulds rest.','You should resting.'], correct:0 },
      { speaker:0, text:'Can you come tonight?', blank:false },
      { speaker:1, text:null, blank:true, opts:["No, I can't come.","No, I can't to come.","No, I cannot to come.","No, I can't coming."], correct:0 },
      { speaker:0, text:'Okay.', blank:false } ] },
  { id:'fix', label:'Corrige el error', xp:35, instr:'Toca la palabra incorrecta y elige la correccion.',
    sents:[
      { words:['You','should','drinks','water','.'], wi:2, correct:'drink', choices:['drink','drinks','drinking','drank'] },
      { words:['She',"can't",'comes','.'], wi:2, correct:'come', choices:['come','comes','coming','came'] },
      { words:['We','musts','finish','.'], wi:1, correct:'must', choices:['must','musts','must to','musting'] } ] }
]);

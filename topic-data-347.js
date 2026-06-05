/* topic-data-347.js - Juego 347/350 | T50 4/7 NATIVE FLUENCY | comprension de matices (ESPECIALIZADO) | Challenger C2 */
_registerGames(347, 'Textos Autenticos · Comprension de Matices', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'"Well, that went well," dicho tras un fracaso, es...', opts:['un elogio sincero','ironia','una orden','una pregunta'], correct:1 },
  { id:'translate', label:'Interpretacion', xp:25, instr:'Elige la interpretacion correcta del matiz.',
    items:[
      { src:'"Well, that went well." (tras un desastre)', opts:['salio bien','salio mal (ironia)','fue normal','fue rapido'], correct:1 },
      { src:'"He is not exactly a genius."', opts:['es muy listo','no es muy listo (eufemismo)','es un genio','es raro'], correct:1 },
      { src:'"Bless his heart." (sur de EE.UU., a veces)', opts:['solo elogio','a veces compasion con criticism','un insulto directo','una oracion'], correct:1 },
      { src:'"It is fine." (con tono cortante)', opts:['todo bien','no esta nada bien','perfecto','genial'], correct:1 },
      { src:'"Interesting choice." (sobre algo dudoso)', opts:['eleccion excelente','eleccion cuestionable','eleccion obvia','eleccion rapida'], correct:1 },
      { src:'"You could say that." (reticente)', opts:['acuerdo total','acuerdo parcial/reticente','negacion','sorpresa'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada frase con su matiz real.',
    pairs:[ ['that went well (tras un fracaso)','ironia'],['not exactly a genius','eufemismo critico'],['it is fine (cortante)','no esta bien'],['interesting choice','duda cortes'],['you could say that','acuerdo reticente'],['I am sure you tried','consuelo con criticism'] ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la interpretacion es correcta.',
    stmts:[
      { text:'"Well, that went well" tras un fracaso es ironia.', ans:true, expl:'Correcto.' },
      { text:'"He is not exactly a genius" es un elogio directo.', ans:false, expl:'Falso. es un eufemismo critico.' },
      { text:'"It is fine" con tono cortante puede significar lo contrario.', ans:true, expl:'Correcto.' },
      { text:'"Interesting choice" siempre es un elogio sincero.', ans:false, expl:'Falso. a menudo expresa duda.' } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada enunciado.',
    categories:['Literal / Sincero','Ironico / Velado'],
    items:[ {text:'That was genuinely excellent',correct:0},{text:'Well, that went well (failure)',correct:1},{text:'Thank you, I mean it',correct:0},{text:'Interesting choice...',correct:1},{text:'I really appreciate it',correct:0},{text:'It is fine (cortante)',correct:1} ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Identifica el matiz.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'I painted the wall bright orange.', blank:false },
      { speaker:1, text:null, blank:true, opts:['Interesting choice... (duda)','That is objectively perfect.','Orange is a wavelength.','Walls are vertical.'], correct:0 },
      { speaker:0, text:'The presentation crashed twice.', blank:false },
      { speaker:1, text:null, blank:true, opts:['Well, that went well. (ironia)','A flawless performance indeed.','Crashes happen in software.','Twice is a number.'], correct:0 },
      { speaker:0, text:'I know, I know.', blank:false } ] }
  ,{ id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la interpretacion correcta.',
    sents:[
      { pre:'"Well, that went well" after a failure is ', ans:'ironic', post:'.', bank:['ironic','sincere','literal','formal'] },
      { pre:'"Not exactly a genius" is a ', ans:'euphemism', post:'.', bank:['euphemism','compliment','threat','question'] },
      { pre:'"It is fine" said curtly may mean it is ', ans:'not fine', post:'.', bank:['not fine','perfect','great','wonderful'] },
      { pre:'"Interesting choice" can express ', ans:'doubt', post:'.', bank:['doubt','praise','anger','joy'] } ] }
]);

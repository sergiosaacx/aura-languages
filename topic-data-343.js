/* topic-data-343.js - Juego 343/350 | T49 7/7 DISCOURSE ANALYSIS | falta de competencia pragmatica (MEZCLADO) | Challenger C2 */
_registerGames(343, 'Falta de Competencia Pragmatica', [
  { id:'mc', label:'Quiz Rapido', xp:25, q:'A: "Could you help me?" B: "Yes, I could." Esta respuesta es...', opts:['pragmaticamente adecuada','gramatical pero inadecuada','agramatical','grosera a proposito'], correct:1 },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada respuesta inadecuada con su version adecuada.',
    pairs:[ ['Yes, I could (sin ayudar)','Sure, what do you need?'],['Yes, I know the time (sin decirla)','It is half past three'],['Yes, I can pass it (sin pasarla)','Here you go'],['No (sin suavizar)','I am afraid not, sorry'],['Yes (a una invitacion sin gracias)','Yes, thank you, I would love to'],['It is cold (ignorando la indirecta)','I will close the window'] ] },
  { id:'fill', label:'Rellena los espacios', xp:35, instr:'Toca la respuesta pragmaticamente adecuada.',
    sents:[
      { pre:'A: "Could you help me?" B: "', ans:'Sure, what do you need', post:'?"', bank:['Sure, what do you need','Yes, I could','That is a question','Help is a noun'] },
      { pre:'A: "Do you know the time?" B: "', ans:'It is three o clock', post:'."', bank:['It is three o clock','Yes, I do','Time exists','I own a watch'] },
      { pre:'A: "It is cold in here." B: "', ans:'I will close the window', post:'."', bank:['I will close the window','Yes, it is','Cold is relative','The window is glass'] },
      { pre:'A: "Would you like to join us?" B: "', ans:'Yes, thank you, I would love to', post:'."', bank:['Yes, thank you, I would love to','Yes','Joining is possible','You have chairs'] } ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si la respuesta es pragmaticamente adecuada.',
    stmts:[
      { text:'A: "Could you help?" B: "Yes, I could." (sin actuar) es adecuada.', ans:false, expl:'Falso. ignora la peticion real.' },
      { text:'A: "Do you know the time?" B: "It is three." es adecuada.', ans:true, expl:'Correcto. responde a la intencion.' },
      { text:'Ignorar una indirecta puede ser pragmaticamente inadecuado.', ans:true, expl:'Correcto.' },
      { text:'Una respuesta gramatical siempre es pragmaticamente adecuada.', ans:false, expl:'Falso. puede ignorar la intencion.' } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Elige la respuesta pragmaticamente adecuada.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Could you possibly pass the salt?', blank:false },
      { speaker:1, text:null, blank:true, opts:['Of course, here you are.','Yes, I am able to.','Salt is sodium chloride.','The salt is over there.'], correct:0 },
      { speaker:0, text:'It is rather stuffy in here.', blank:false },
      { speaker:1, text:null, blank:true, opts:['Shall I open a window?','Yes, it is stuffy.','Air has oxygen.','Stuffy is an adjective.'], correct:0 },
      { speaker:0, text:'Thank you.', blank:false } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Convierte la respuesta inadecuada en una adecuada.',
    transforms:[
      { original:'"Yes, I could." (a una peticion de ayuda)', task:'Adecuada', opts:['Sure, what do you need?','Yes, I could.','Could is a modal.','Help is good.'], correct:0 },
      { original:'"Yes, I know." (a "do you know the time?")', task:'Adecuada', opts:['It is half past two.','Yes, I know.','Knowing is power.','Time passes.'], correct:0 },
      { original:'"It is cold." (ignorando la indirecta)', task:'Adecuada', opts:['I will close the window.','Yes, it is cold.','Cold is a feeling.','Brr.'], correct:0 },
      { original:'"Yes." (a una invitacion)', task:'Adecuada', opts:['Yes, thank you, I would love to.','Yes.','Affirmative.','Invitations are nice.'], correct:0 } ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma la palabra.',
    words:[ {scrambled:['E','R','U','S'],ans:'SURE',hint:'... what do you need'},{scrambled:['E','S','O','L','C'],ans:'CLOSE',hint:'I will ... the window'},{scrambled:['K','N','A','H','T'],ans:'THANK',hint:'Yes, ... you'},{scrambled:['P','L','E','H'],ans:'HELP',hint:'peticion de ayuda'} ] }
]);

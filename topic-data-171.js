/* topic-data-171.js - Juego 171/350 | T25 3/7 PASSIVE VOICE | Activa a Pasiva (ESPECIALIZADO) | Oro B1 */
_registerGames(171, 'Activa a Pasiva · Transformacion', [
  { id:'translate', label:'Traduccion', xp:25, instr:'Elige la pasiva correcta.',
    items:[
      { src:'Shakespeare escribio Hamlet', opts:['Hamlet wrote by Shakespeare','Hamlet was written by Shakespeare','Hamlet is written by Shakespeare','Hamlet writes by Shakespeare'], correct:1 },
      { src:'Alguien robo mi coche', opts:['My car was stolen','My car stole','My car is stolen now','My car steals'], correct:0 },
      { src:'Construyen casas aqui', opts:['Houses build here','Houses are built here','Houses were built here','Houses built here'], correct:1 },
      { src:'Picasso pinto el cuadro', opts:['The painting painted by Picasso','The painting was painted by Picasso','The painting is painted by Picasso','The painting paints'], correct:1 },
      { src:'Limpian las oficinas cada dia', opts:['The offices clean every day','The offices are cleaned every day','The offices were cleaned every day','The offices cleaned every day'], correct:1 },
      { src:'Inventaron el telefono en 1876', opts:['The phone invented in 1876','The phone was invented in 1876','The phone is invented in 1876','The phone invents in 1876'], correct:1 } ] },
  { id:'match', label:'Empareja', xp:30, instr:'Empareja cada oracion activa con su pasiva.',
    pairs:[ ['Shakespeare wrote Hamlet','Hamlet was written by Shakespeare'],['They clean the rooms','The rooms are cleaned'],['Someone stole my bike','My bike was stolen'],['Picasso painted it','It was painted by Picasso'],['They build cars here','Cars are built here'],['They invented it in 1876','It was invented in 1876'] ] },
  { id:'scramble', label:'Descifra la palabra', xp:20, instr:'Forma el participio.',
    words:[ {scrambled:['N','E','T','T','I','R','W'],ans:'WRITTEN',hint:'participio de write'},{scrambled:['N','E','T','A','I','P','D'],ans:'PAINTED',hint:'participio de paint'},{scrambled:['N','E','L','O','T','S'],ans:'STOLEN',hint:'participio de steal'},{scrambled:['Y','B'],ans:'BY',hint:'el agente'} ] },
  { id:'truefalse', label:'Verdadero o Falso', xp:20, instr:'Decide si cada oracion es correcta.',
    stmts:[
      { text:'En la pasiva, el objeto de la activa pasa a ser el sujeto.', ans:true, expl:'Correcto. They built the house -> The house was built.' },
      { text:'"Hamlet wrote by Shakespeare." es pasiva correcta.', ans:false, expl:'Falso. Hamlet was written by Shakespeare.' },
      { text:'"My car was stolen." es pasiva correcta.', ans:true, expl:'Correcto.' },
      { text:'En la pasiva no se usa el verbo to be.', ans:false, expl:'Falso. La pasiva usa to be + participio.' } ] },
  { id:'transform', label:'Transforma', xp:35, instr:'Convierte cada activa en pasiva.',
    transforms:[
      { original:'Shakespeare wrote Hamlet.', task:'Pasiva', opts:['Hamlet was written by Shakespeare.','Hamlet wrote by Shakespeare.','Hamlet is written by Shakespeare.','Hamlet writes.'], correct:0 },
      { original:'They clean the office daily.', task:'Pasiva', opts:['The office is cleaned daily.','The office cleans daily.','The office was cleaned daily.','The office clean daily.'], correct:0 },
      { original:'Someone stole my bike.', task:'Pasiva', opts:['My bike was stolen.','My bike is stolen.','My bike stole.','My bike were stolen.'], correct:0 },
      { original:'Picasso painted this.', task:'Pasiva', opts:['This was painted by Picasso.','This painted by Picasso.','This is painted by Picasso.','This paints by Picasso.'], correct:0 } ] },
  { id:'dialogue', label:'Dialogo', xp:35, instr:'Completa el dialogo con la pasiva.', speakers:['Ana','Tom'],
    lines:[
      { speaker:0, text:'Who wrote this novel?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It was written by Orwell.','It wrote by Orwell.','It is written by Orwell now.','It writes by Orwell.'], correct:0 },
      { speaker:0, text:'What happened to your bike?', blank:false },
      { speaker:1, text:null, blank:true, opts:['It was stolen last night.','It stole last night.','It is stolen last night.','It steals last night.'], correct:0 },
      { speaker:0, text:'Oh no!', blank:false } ] },
  { id:'sort', label:'Clasificar', xp:30, instr:'Clasifica cada oracion como activa o pasiva.',
    categories:['Activa','Pasiva'],
    items:[ {text:'Shakespeare wrote it',correct:0},{text:'It was written',correct:1},{text:'They built it',correct:0},{text:'It was built',correct:1},{text:'She paints',correct:0},{text:'It is painted',correct:1} ] }
]);

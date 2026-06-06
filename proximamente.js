/* Personaliza el mensaje según ?feature=Nombre (opcional).
   Ej: proximamente.html?feature=Tienda  */
var params = new URLSearchParams(location.search);
var feature = params.get('feature');
if(feature){
  document.getElementById('crumb').textContent = feature.toLowerCase();
  document.getElementById('feat').innerHTML = 'Estamos puliendo <b>' + feature + '</b> para ti.';
  document.title = feature + ' — Próximamente · Aura';
}

/* Botones "Volver" */
function goBack(e){
  e.preventDefault();
  if(history.length > 1){ history.back(); }
  else{ window.location.href = 'dashboard.html'; }
}
document.getElementById('back').addEventListener('click', goBack);
document.getElementById('back2').addEventListener('click', goBack);

/* examen-vocab-engine.js v6-diag */
(function(){

// TEST INMEDIATO - fuerza output visible sin condiciones
function _forceShow(){
  var el = document.querySelector('.mid-content[data-skill="vocab"]');
  if(el){
    el.innerHTML = '<div style="background:#5BE9F6;color:#000;padding:16px;font-family:monospace;font-size:13px;border-radius:8px;">ENGINE v6 ACTIVO - rank=' + _getRank() + ' - ' + new Date().toLocaleTimeString() + '</div>';
  }
}

function _getRank(){
  if(typeof getCurrentRank==='function') return getCurrentRank();
  return document.body.dataset.examRank || 'bronce';
}

// Intentar inmediatamente y cada 200ms hasta lograrlo
var _tries = 0;
var _interval = setInterval(function(){
  var el = document.querySelector('.mid-content[data-skill="vocab"]');
  _tries++;
  if(el || _tries > 20){
    clearInterval(_interval);
    if(el) _forceShow();
  }
}, 200);

// Exponer función global para pruebas
window.initExamVocab = function(){ _forceShow(); };
window._vceCtx = function(){};
window._vceFam = function(){};
window.vocabNext = function(){};

})();

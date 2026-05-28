/* examen-vocab-engine.js v7-diag */
(function(){

function _showBanner(msg){
  var d = document.createElement('div');
  d.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:9999999;background:#5BE9F6;color:#000;padding:10px;font-family:monospace;font-size:13px;text-align:center;font-weight:bold;';
  d.textContent = msg;
  var attach = function(){
    if(document.body){ document.body.appendChild(d); }
    else { document.addEventListener('DOMContentLoaded', function(){ document.body.appendChild(d); }); }
  };
  attach();
  setTimeout(function(){ if(d.parentNode) d.parentNode.removeChild(d); }, 10000);
}

// Aparece inmediatamente - imposible de ignorar
_showBanner('VOCAB ENGINE v7 CARGADO - ' + new Date().toLocaleTimeString());

window.initExamVocab = function(){ _showBanner('initExamVocab LLAMADO'); };
window._vceCtx = function(){};
window._vceFam = function(){};
window.vocabNext = function(){};

})();

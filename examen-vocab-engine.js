/* examen-vocab-engine.js v11
   El sistema de vocab session está en examen-ascenso.html:
   _loadVocabSession → _renderVocabWord → _vocabAdvanceWord
   Este archivo solo provee el hook initExamVocab que lo dispara. */
(function(){

  window.initExamVocab = function(opts){
    /* Delegar al sistema _loadVocabSession del HTML principal */
    if(typeof _loadVocabSession === 'function'){
      var v = (typeof EXAM_VERSION !== 'undefined') ? EXAM_VERSION : 1;
      _loadVocabSession(v);
    }
  };

})();

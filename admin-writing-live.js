/* admin-writing-live.js — carga ejercicio real de Writing desde Supabase en el editor admin
   Depende de: examen-writing-hooks.js (define _applyWriteRandom, _writeInitEngine)
   _applyWriteRandom(v) lee VERSION_MID[v].write (array) e inyecta un ejercicio random. */
(function () {
  'use strict';

  function _getV() {
    return typeof window._admGetV === 'function' ? window._admGetV() : (window.EXAM_VERSION || 1);
  }

  function _doLoadWrite(v) {
    if (typeof window._applyWriteRandom === 'function') {
      window._applyWriteRandom(v);
    }
  }

  /* ── Envolver applyVersion para recargar writing al cambiar versión ── */
  if (typeof window.applyVersion === 'function' && !window.applyVersion._writeLivePatch) {
    var _orig = window.applyVersion;
    window.applyVersion = function (v) {
      _orig.apply(this, arguments);
      var activeTab = document.querySelector('.tab.active');
      var activeSkill = activeTab ? activeTab.dataset.skill : '';
      if (activeSkill === 'write') {
        setTimeout(function () { _doLoadWrite(v); }, 300);
      }
    };
    window.applyVersion._writeLivePatch = true;
  }

  /* ── Hook en click del tab Writing ── */
  document.addEventListener('click', function (e) {
    if (e.target.closest('.tab[data-skill="write"]')) {
      setTimeout(function () { _doLoadWrite(_getV()); }, 200);
    }
  });

})();

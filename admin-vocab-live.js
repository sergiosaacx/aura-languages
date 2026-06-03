/* admin-vocab-live.js — carga palabras reales de vocab desde Supabase en el editor admin
   Se dispara en: carga inicial, cambio de versión, y click en tab Vocabulary.
   Depende de: examen-vocab-hooks.js (define _loadVocabSession, _renderVocabWord) */
(function () {
  'use strict';

  /* ── Asegurar que vtask1/vtask2 tengan su ID aunque el HTML sea antiguo ──
     Necesario para V1-V4 donde VERSION_MID[v].vocab se carga de Supabase
     y puede no tener los IDs si fue guardado antes de este fix. */
  function _ensureVocabIds() {
    if (!document.getElementById('vtask1')) {
      var mid = document.querySelector('.mid-content[data-skill="vocab"]');
      if (!mid) return;
      var panels = mid.querySelectorAll('.exam-panel');
      if (panels[0] && !panels[0].id) panels[0].id = 'vtask1';
      if (panels[1] && !panels[1].id) panels[1].id = 'vtask2';
    }
  }

  /* ── Carga la sesión vocab y desbloquea paneles para vista admin ──
     En el examen real, vtask1 se desbloquea al responder la hero card quiz.
     En el editor admin lo mostramos desbloqueado para previsualizar el contenido. */
  function _doLoadVocab(v) {
    if (typeof window._loadVocabSession !== 'function') return;
    _ensureVocabIds();
    window._loadVocabSession(v);
    // Desbloquear después de que _loadVocabSession popule el contenido
    setTimeout(function () {
      var vt1 = document.getElementById('vtask1');
      if (vt1) vt1.classList.remove('vocab-task-locked');
      var vt2 = document.getElementById('vtask2');
      if (vt2) vt2.classList.remove('vocab-task-locked');
    }, 500);
  }

  /* ── Versión actual del admin ── */
  function _getV() {
    return (typeof window._admGetV === 'function') ? window._admGetV() : (window.EXAM_VERSION || 1);
  }

  /* ── Envolver applyVersion para recargar vocab al cambiar versión ──
     Sólo dispara si el tab activo es vocab para no interferir con la hero card
     de otras pestañas. */
  if (typeof window.applyVersion === 'function' && !window.applyVersion._vocabLivePatch) {
    var _orig = window.applyVersion;
    window.applyVersion = function (v) {
      _orig.apply(this, arguments);
      var activeTab = document.querySelector('.tab.active');
      var activeSkill = activeTab ? activeTab.dataset.skill : 'vocab';
      if (activeSkill === 'vocab') {
        setTimeout(function () { _doLoadVocab(v); }, 350);
      }
    };
    window.applyVersion._vocabLivePatch = true;
  }

  /* ── Hook en click del tab Vocabulary ── */
  document.addEventListener('click', function (e) {
    if (e.target.closest('.tab[data-skill="vocab"]')) {
      setTimeout(function () { _doLoadVocab(_getV()); }, 250);
    }
  });

  /* ── Carga inicial (vocab es la pestaña activa por defecto en el editor) ── */
  setTimeout(function () { _doLoadVocab(_getV()); }, 700);

})();

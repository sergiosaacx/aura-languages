/* admin-vocab-live.js v2 — vocab real en el editor, idéntico a la vista previa
   Depende de: examen-vocab-hooks.js (_loadVocabSession, _renderVocabWord)
   Diferencias editor→examen que corrige este archivo:
   1. Oculta .hc-audio y .hc-bottom (no existen en el examen real)
   2. Limpia la opción "pre-seleccionada" que applySkill aplica con inline styles
   3. vtask1 arranca bloqueado; se desbloquea al responder el hero card quiz
   4. Añade evaluación correcto/incorrecto en el quiz del hero card */
(function () {
  'use strict';

  /* ── CSS: ocultar elementos del hero card que no están en el examen ── */
  (function () {
    if (document.getElementById('avl-css')) return;
    var s = document.createElement('style');
    s.id = 'avl-css';
    s.textContent = [
      '.avl-vocab-active .hc-audio { display:none!important; }',
      '.avl-vocab-active .hc-bottom { display:none!important; }'
    ].join('');
    (document.head || document.documentElement).appendChild(s);
  })();

  /* ── Asegurar IDs en vocab mid panel (para V1-V4 con HTML antiguo de Supabase) ── */
  function _ensureVocabIds() {
    if (!document.getElementById('vtask1')) {
      var mid = document.querySelector('.mid-content[data-skill="vocab"]');
      if (!mid) return;
      var panels = mid.querySelectorAll('.exam-panel');
      if (panels[0] && !panels[0].id) panels[0].id = 'vtask1';
      if (panels[1] && !panels[1].id) panels[1].id = 'vtask2';
    }
  }

  /* ── Handler de evaluación en el hero card quiz (igual que examen-shell.js) ── */
  function _hcOptClick(e) {
    var btn = e.target.closest('.hc-opt');
    if (!btn) return;
    var hcQuiz = btn.closest('.hc-quiz');
    if (!hcQuiz || hcQuiz.dataset.answered) return;
    hcQuiz.dataset.answered = '1';
    // Limpiar estilos de "selected" del shell + aplicar evaluación
    hcQuiz.querySelectorAll('.hc-opt').forEach(function (o) {
      o.style.pointerEvents = 'none';
      o.style.background    = '';
      o.style.borderColor   = '';
      o.style.boxShadow     = '';
      var ob = o.querySelector('b');
      if (ob) { ob.style.background = ''; ob.style.borderColor = ''; ob.style.color = ''; }
      if (o.dataset.correct === '1') o.classList.add('vc-correct');
    });
    if (btn.dataset.correct !== '1') btn.classList.add('vc-wrong');
    // Desbloquear vtask1 (igual que el examen)
    var vt1 = document.getElementById('vtask1');
    if (vt1) vt1.classList.remove('vocab-task-locked');
    if (window.AuraRightPanel) AuraRightPanel.recordAnswer(btn.dataset.correct === '1');
  }

  /* ── Activar modo vocab en el hero card ── */
  function _activateVocabHero() {
    // 1. Ocultar .hc-audio y .hc-bottom
    var hero = document.querySelector('.hero-card');
    if (hero) hero.classList.add('avl-vocab-active');

    // 2. Limpiar inline styles de la opción pre-seleccionada por applySkill
    var hcQuiz = document.querySelector('.hc-quiz');
    if (!hcQuiz) return;
    delete hcQuiz.dataset.answered;
    hcQuiz.querySelectorAll('.hc-opt').forEach(function (opt) {
      opt.style.background    = '';
      opt.style.borderColor   = '';
      opt.style.boxShadow     = '';
      opt.style.pointerEvents = '';
      opt.classList.remove('selected', 'vc-correct', 'vc-wrong');
      var b = opt.querySelector('b');
      if (b) { b.style.background = ''; b.style.borderColor = ''; b.style.color = ''; }
    });

    // 3. Añadir handler de evaluación (addEventListener deduplica automáticamente)
    hcQuiz.addEventListener('click', _hcOptClick);

    // 4. vtask1 arranca bloqueado (se desbloquea en _hcOptClick)
    var vt1 = document.getElementById('vtask1');
    if (vt1) vt1.classList.add('vocab-task-locked');
  }

  /* ── Desactivar modo vocab (al cambiar a otro tab) ── */
  function _deactivateVocabHero() {
    var hero = document.querySelector('.hero-card');
    if (hero) hero.classList.remove('avl-vocab-active');
    var hcQuiz = document.querySelector('.hc-quiz');
    if (hcQuiz) {
      hcQuiz.removeEventListener('click', _hcOptClick);
      delete hcQuiz.dataset.answered;
    }
  }

  /* ── Versión admin actual ── */
  function _getV() {
    return typeof window._admGetV === 'function' ? window._admGetV() : (window.EXAM_VERSION || 1);
  }

  /* ── Cargar vocab real + activar hero card ── */
  function _doLoadVocab(v) {
    if (typeof window._loadVocabSession !== 'function') return;
    _ensureVocabIds();
    window._loadVocabSession(v);
    // Esperar a que _renderVocabWord popule data-correct en los opts (~300-600ms de Supabase)
    setTimeout(_activateVocabHero, 800);
  }

  /* ── Wrap applyVersion ── */
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

  /* ── Tab clicks ── */
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.tab[data-skill]');
    if (!tab) return;
    if (tab.dataset.skill === 'vocab') {
      setTimeout(function () { _doLoadVocab(_getV()); }, 250);
    } else {
      _deactivateVocabHero();
    }
  });

  /* ── Carga inicial (vocab es la pestaña activa por defecto) ── */
  setTimeout(function () { _doLoadVocab(_getV()); }, 700);

})();

/* admin-vocab-live.js v3 — vocab real en el editor, idéntico a la vista previa
   Depende de: examen-vocab-hooks.js (_loadVocabSession, _renderVocabWord)

   Bugs que corrige:
   1. Oculta .hc-audio y .hc-bottom (no están en el examen real)
   2. Limpia la opción "pre-seleccionada" con inline styles de applySkill
   3. vtask1 arranca bloqueado; se desbloquea al responder el hero quiz
   4. Handler correcto de evaluación en el hero quiz (correcto/incorrecto)
   5. Debounce de 400ms para evitar múltiples _loadVocabSession concurrentes
      (el wrapper de applyVersion y el timer inicial se solapaban → datos cruzados) */

(function () {
  'use strict';

  /* ── CSS: ocultar elementos del hero card que no existen en el examen ── */
  if (!document.getElementById('avl-css')) {
    var _s = document.createElement('style');
    _s.id = 'avl-css';
    _s.textContent =
      '.avl-vocab-active .hc-audio{display:none!important;}' +
      '.avl-vocab-active .hc-bottom{display:none!important;}';
    (document.head || document.documentElement).appendChild(_s);
  }

  /* ── Debounce: solo un _loadVocabSession a la vez ── */
  var _debounceTimer = null;
  var _activateTimer = null;

  /* ── Asegurar IDs en vocab mid panel ── */
  function _ensureVocabIds() {
    if (!document.getElementById('vtask1')) {
      var mid = document.querySelector('.mid-content[data-skill="vocab"]');
      if (!mid) return;
      var panels = mid.querySelectorAll('.exam-panel');
      if (panels[0] && !panels[0].id) panels[0].id = 'vtask1';
      if (panels[1] && !panels[1].id) panels[1].id = 'vtask2';
    }
  }

  /* ── Handler de evaluación en el hero quiz (igual que examen-shell.js) ── */
  function _hcOptClick(e) {
    var btn = e.target.closest('.hc-opt');
    if (!btn) return;
    var hcQuiz = btn.closest('.hc-quiz');
    if (!hcQuiz || hcQuiz.dataset.answered) return;
    hcQuiz.dataset.answered = '1';
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
    var vt1 = document.getElementById('vtask1');
    if (vt1) vt1.classList.remove('vocab-task-locked');
    if (window.AuraRightPanel) AuraRightPanel.recordAnswer(btn.dataset.correct === '1');
  }

  /* ── Activar modo vocab: ocultar extras, limpiar estilos, handlers correctos ── */
  function _activateVocabHero() {
    var hero = document.querySelector('.hero-card');
    if (hero) hero.classList.add('avl-vocab-active');

    var hcQuiz = document.querySelector('.hc-quiz');
    if (!hcQuiz) return;

    delete hcQuiz.dataset.answered;

    // Limpiar inline styles de la pre-selección de applySkill
    hcQuiz.querySelectorAll('.hc-opt').forEach(function (opt) {
      opt.style.background    = '';
      opt.style.borderColor   = '';
      opt.style.boxShadow     = '';
      opt.style.pointerEvents = '';
      opt.classList.remove('selected', 'vc-correct', 'vc-wrong');
      var b = opt.querySelector('b');
      if (b) { b.style.background = ''; b.style.borderColor = ''; b.style.color = ''; }
    });

    // Adjuntar handler de evaluación (addEventListener deduplicado por referencia)
    hcQuiz.addEventListener('click', _hcOptClick);

    // vtask1 arranca bloqueado (se desbloquea al responder el hero quiz)
    var vt1 = document.getElementById('vtask1');
    if (vt1) vt1.classList.add('vocab-task-locked');
  }

  /* ── Desactivar modo vocab al cambiar de tab ── */
  function _deactivateVocabHero() {
    var hero = document.querySelector('.hero-card');
    if (hero) hero.classList.remove('avl-vocab-active');
    var hcQuiz = document.querySelector('.hc-quiz');
    if (hcQuiz) {
      hcQuiz.removeEventListener('click', _hcOptClick);
      delete hcQuiz.dataset.answered;
    }
  }

  /* ── Versión admin ── */
  function _getV() {
    return typeof window._admGetV === 'function' ? window._admGetV() : (window.EXAM_VERSION || 1);
  }

  /* ── Cargar vocab con debounce de 400ms (evita llamadas concurrentes) ──
     Cualquier llamada anterior pendiente se cancela. Solo la última se ejecuta. */
  function _doLoadVocab(v) {
    clearTimeout(_debounceTimer);
    clearTimeout(_activateTimer);
    _debounceTimer = setTimeout(function () {
      if (typeof window._loadVocabSession !== 'function') return;
      _ensureVocabIds();
      window._loadVocabSession(v);
      // Esperar a que _renderVocabWord popule data-correct (~300-600ms Supabase)
      _activateTimer = setTimeout(_activateVocabHero, 900);
    }, 400);
  }

  /* ── Wrap applyVersion ── */
  if (typeof window.applyVersion === 'function' && !window.applyVersion._vocabLivePatch) {
    var _orig = window.applyVersion;
    window.applyVersion = function (v) {
      _orig.apply(this, arguments);
      var activeTab = document.querySelector('.tab.active');
      if (activeTab && activeTab.dataset.skill === 'vocab') {
        _doLoadVocab(v); // debounce cancela llamadas previas pendientes
      }
    };
    window.applyVersion._vocabLivePatch = true;
  }

  /* ── Tab clicks ── */
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.tab[data-skill]');
    if (!tab) return;
    if (tab.dataset.skill === 'vocab') {
      _doLoadVocab(_getV());
  
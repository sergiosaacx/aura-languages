/* admin-writing-live.js v2 — writing real en el editor, idéntico a la vista previa
   Depende de: examen-writing-hooks.js (_applyWriteRandom, _writeInitEngine)

   Problema que corrige:
   admin-examen-shell.js hace `el.innerHTML = VERSION_MID[v].write` pero
   VERSION_MID[v].write es un ARRAY (no un string HTML). Eso destruye el
   #write-preview-wrap. La solución: interceptar applyVersion, eliminar
   VERSION_MID[v].write antes de que el shell lo toque, restaurarlo después,
   y luego llamar _applyWriteRandom(v) — igual que hace examen-reading-hooks.js
   para reading. */

(function () {
  'use strict';

  if (typeof window.applyVersion !== 'function') return;
  if (window.applyVersion._writeLivePatch) return;

  var _orig = window.applyVersion;

  window.applyVersion = function (v) {
    /* ── Guardar y eliminar write pool ANTES de que el shell lo toque ── */
    var _saved;
    if (typeof VERSION_MID !== 'undefined' && VERSION_MID[v]) {
      _saved = VERSION_MID[v]['write'];
      if (_saved !== undefined) delete VERSION_MID[v]['write'];
    }

    /* ── Ejecutar applyVersion original (el shell omite write porque ya no está) ── */
    _orig.apply(this, arguments);

    /* ── Restaurar write pool ── */
    if (typeof VERSION_MID !== 'undefined' && VERSION_MID[v] && _saved !== undefined) {
      VERSION_MID[v]['write'] = _saved;
    }

    /* ── Aplicar ejercicio de writing (siempre, igual que examen-shell.js) ── */
    if (typeof window._applyWriteRandom === 'function') {
      window._applyWriteRandom(v);
    }
  };

  window.applyVersion._writeLivePatch = true;

  /* ── Tab click: recargar writing al volver al tab ── */
  document.addEventListener('click', function (e) {
    if (e.target.closest('.tab[data-skill="write"]')) {
      var v = typeof window._admGetV === 'function' ? window._admGetV() : 1;
      if (typeof window._applyWriteRandom === 'function') {
        window._applyWriteRandom(v);
      }
    }
  });

})();

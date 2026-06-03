/* admin-speaking-live.js — adaptador de Speaking para el editor admin
   examen-speaking-hooks.js ya maneja: tab clicks, applyVersion wrap, initExamSpeaking.
   Este archivo solo:
   1. Provee getCurrentRank() basado en la versión admin (para que el engine cargue el rango correcto)
   2. Restaura el hero card al cambiar a otra pestaña (speaking-hooks lo oculta con display:none) */
(function () {
  'use strict';

  /* ── getCurrentRank para speaking-hooks y speaking-engine ── */
  var RANKS = { 1: 'bronce', 2: 'plata', 3: 'oro', 4: 'platino', 5: 'diamante' };
  window.getCurrentRank = function () {
    var v = typeof window._admGetV === 'function' ? window._admGetV() : 1;
    return RANKS[v] || 'diamante';
  };

  /* ── Restaurar hero card al salir de Speaking ──
     speaking-hooks hace hero.style.display='none' al activar Speaking.
     Al cambiar a otro tab hay que restaurarlo. */
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.tab[data-skill]');
    if (tab && tab.dataset.skill !== 'speak') {
      var hero = document.querySelector('.hero-card');
      if (hero) hero.style.display = '';
    }
  });

})();

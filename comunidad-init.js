/* ============================================================
   comunidad-init.js — Inicialización del topbar de Comunidad
   Patrón: igual que home-init.js
   Datos: window._aura.profile (cargado por aura-supabase.js)
   ============================================================ */
(function () {
  'use strict';

  function set(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function applyXP(p) {
    if (!window.AuraXP || !AuraXP.calcLevel) return;
    var c = AuraXP.calcLevel(p.xp || 0);

    // Label "XP · Lv→Lv+1"
    set('cm-xp-label', 'XP · ' + c.level + '→' + (c.level + 1));

    // Barra de progreso (con pequeño delay para que la transición CSS se vea)
    setTimeout(function () {
      var fill = document.getElementById('cm-xp-fill');
      if (fill) fill.style.width = c.percent + '%';
    }, 400);

    // Texto "420/1000"
    var val = document.getElementById('cm-xp-val');
    if (val) val.innerHTML = '<b>' + c.xpIntoLevel.toLocaleString() + '</b>/' + c.xpForNext.toLocaleString();
  }

  function initComunidad() {
    var aura = window._aura;

    // Esperar a que aura-supabase.js cargue el perfil
    if (!aura || !aura.userId || !aura.profile || !aura.lang_progress) {
      setTimeout(initComunidad, 200);
      return;
    }

    var p      = aura.profile;
    var streak = p.streak_actual || 0;
    var ap     = p.aura_points   || 0;

    // ── Fecha de hoy ──────────────────────────────────────────
    var dateLabel = window.auraTodayLabel ? window.auraTodayLabel() : (function () {
      var DAYS   = ['dom','lun','mar','mié','jue','vie','sáb'];
      var MONTHS = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
      var d = new Date();
      return DAYS[d.getDay()] + ' · ' + d.getDate() + ' ' + MONTHS[d.getMonth()];
    })();
    set('cm-hello-date', dateLabel);

    // ── Racha: número ────────────────────────────────────────
    set('cm-streak-num', streak);

    // ── Racha: arco SVG del donut ─────────────────────────────
    // Circunferencia = 264 (r=42). 100 días = arco completo.
    var arc = document.getElementById('cm-streak-arc');
    if (arc) {
      var pct = Math.min(streak / 100, 1);
      arc.setAttribute('stroke-dashoffset', (264 * (1 - pct)).toFixed(1));
    }

    // ── Aura Points ───────────────────────────────────────────
    set('cm-ap-num', ap.toLocaleString());

    // ── XP / Nivel ────────────────────────────────────────────
    applyXP(p);
  }

  // Arrancar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComunidad);
  } else {
    initComunidad();
  }

})();

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

  function loadCommunityStats(sb) {
    // Inicio de hoy (medianoche local en UTC)
    var now  = new Date();
    var todayISO = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    // 24 horas atrás para "en línea"
    var h24ago = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

    Promise.all([
      // 1. Total de miembros
      sb.from('profiles').select('id', { count: 'exact', head: true }),

      // 2. Usuarios activos últimas 24h (proxy: language_progress.updated_at)
      sb.from('language_progress')
        .select('user_id', { count: 'exact', head: true })
        .gte('updated_at', h24ago),

      // 3. Posts nuevos hoy
      sb.from('community_posts')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', todayISO)

    ]).then(function (results) {
      var members = results[0].count;
      var online  = results[1].count;
      var posts   = results[2].count;

      if (members !== null) set('cm-members', members.toLocaleString('es-CO'));
      if (online  !== null) set('cm-online',  online.toLocaleString('es-CO'));
      if (posts   !== null) set('cm-posts-today', posts.toLocaleString('es-CO'));
    }).catch(function (err) {
      console.warn('[comunidad-init] stats error:', err);
    });
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

    // ── Stats de comunidad (miembros, en línea, posts hoy) ────
    if (aura.sb) {
      loadCommunityStats(aura.sb);
    }
  }

  // Arrancar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComunidad);
  } else {
    initComunidad();
  }

})();

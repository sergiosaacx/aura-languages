// ============================================================
//  AURA LANGUAGES — aura-dashboard.js  v1
//  Rellena las tarjetas del dashboard con datos reales de
//  Supabase (session_history + profiles).
//
//  REQUISITO: aura-supabase.js + aura-xp.js deben cargarse ANTES.
//  Este archivo se carga al final del <body> en dashboard.html.
// ============================================================

(function () {
  'use strict';

  // ── Mapeo herramienta → emoji ─────────────────────────────
  var TOOL_EMOJI = {
    'flashcards'  : '📝',
    'lyriclab'    : '🎵',
    'play-movies' : '🎬',
    'slanglab'    : '🗣️',
    'collocations': '📖',
    'speakmaster' : '🎤',
  };
  var TOOL_LABEL = {
    'flashcards'  : 'Flashcards',
    'lyriclab'    : 'LyricLab',
    'play-movies' : 'Movie Challenge',
    'slanglab'    : 'SlangLab',
    'collocations': 'Collocations',
    'speakmaster' : 'SpeakMaster',
  };

  // ── Colores por skill ─────────────────────────────────────
  var SKILL_COLOR = {
    'Vocabulary': '#c4ff3d',
    'Listening' : '#38bdf8',
    'Speaking'  : '#fb923c',
    'Grammar'   : '#a78bfa',
    'Writing'   : '#f472b6',
    'General'   : '#94a3b8',
  };

  // ── Helpers ───────────────────────────────────────────────
  function _sb()     { return window._aura && window._aura.sb; }
  function _userId() { return window._aura && window._aura.userId; }

  function _waitForAura() {
    return new Promise(function (resolve, reject) {
      if (_userId()) return resolve();
      var n = 0;
      var t = setInterval(function () {
        if (_userId()) { clearInterval(t); resolve(); return; }
        if (++n > 100) { clearInterval(t); reject(); }
      }, 100);
    });
  }

  // Fecha local en formato ISO YYYY-MM-DD
  function _localDate(d) {
    var dt = d || new Date();
    return dt.getFullYear() + '-' +
      String(dt.getMonth() + 1).padStart(2, '0') + '-' +
      String(dt.getDate()).padStart(2, '0');
  }

  // Nombre corto del día (L M X J V S D)
  var DAY_NAMES = ['D','L','M','X','J','V','S'];

  // Calcula el offset del dasharray para un donut r=42 (circunferencia=264)
  function _donutOffset(pct) {
    return Math.round(264 - (264 * Math.max(0, Math.min(100, pct)) / 100));
  }

  // ── CARGA DE DATOS ────────────────────────────────────────
  async function _fetchSessions() {
    var ago30 = new Date();
    ago30.setDate(ago30.getDate() - 30);
    var res = await _sb().from('session_history')
      .select('tool, skill, xp_earned, pm_earned, ap_earned, accuracy, played_at')
      .eq('user_id', _userId())
      .gte('played_at', ago30.toISOString())
      .order('played_at', { ascending: false });
    return res.data || [];
  }

  async function _fetchLecciones() {
    var res = await _sb().from('profiles')
      .select('lecciones_completadas').eq('id', _userId()).single();
    return (res.data && res.data.lecciones_completadas) || 0;
  }

  // ── CARD C1: Lecciones completadas ───────────────────────
  function _renderC1(lecciones) {
    var el = document.getElementById('c1Lecciones');
    if (el) el.textContent = lecciones.toLocaleString();
  }

  // ── CARD C3: Main Skills (barras) ────────────────────────
  //
  //  Fórmula: nivel (35%) + rango (35%) + participación ponderada (30%)
  //  100% = Lv 100 + Challenger + ≥50 pts ponderados en ese skill
  //
  //  Cada herramienta contribuye a 1-3 skills con peso diferente:
  //    lyriclab    → Listening×1.0  Vocabulary×0.5  Grammar×0.3
  //    play-movies → Listening×1.0  Vocabulary×0.4  Grammar×0.3
  //    flashcards  → Vocabulary×1.0 Writing×0.4     Grammar×0.3
  //    collocations→ Grammar×0.8   Vocabulary×0.7  Writing×0.5
  //
  var RANK_INDEX = { Bronce:0, Plata:1, Oro:2, Platino:3, Diamante:4, Challenger:5 };
  var MAX_WEIGHTED = 50; // puntos ponderados para considerar participación plena

  var TOOL_SKILL_WEIGHTS = {
    'lyriclab'    : { Listening:1.0, Vocabulary:0.5, Grammar:0.3 },
    'play-movies' : { Listening:1.0, Vocabulary:0.4, Grammar:0.3 },
    'flashcards'  : { Vocabulary:1.0, Writing:0.4,   Grammar:0.3 },
    'collocations': { Grammar:0.8,   Vocabulary:0.7, Writing:0.5 },
  };

  function _renderC3(sessions, profile) {
    var nivel = (profile && profile.nivel) || 1;
    var rango = (profile && profile.rango) || 'Bronce';

    var levelScore = (nivel - 1) / 99;
    var rankScore  = (RANK_INDEX[rango] || 0) / 5;

    var skills = ['Grammar','Vocabulary','Listening','Speaking','Writing'];
    // Acumular puntos ponderados por skill según la herramienta jugada
    var weighted = {};
    skills.forEach(function(s){ weighted[s] = 0; });

    sessions.forEach(function(s) {
      var w = TOOL_SKILL_WEIGHTS[s.tool];
      if (!w) return;
      Object.keys(w).forEach(function(skill) {
        if (weighted[skill] !== undefined) weighted[skill] += w[skill];
      });
    });

    skills.forEach(function(skill) {
      var key       = skill.toLowerCase();
      var partScore = Math.min(weighted[skill] || 0, MAX_WEIGHTED) / MAX_WEIGHTED;
      var pct = Math.round((levelScore * 0.35 + rankScore * 0.35 + partScore * 0.30) * 100);
      pct = Math.max(0, Math.min(100, pct));

      var fillEl = document.getElementById('c3-fill-' + key);
      var pctEl  = document.getElementById('c3-pct-'  + key);
      if (fillEl) {
        fillEl.style.width = pct + '%';
        if (pct >= 95) fillEl.classList.add('peak');
        else           fillEl.classList.remove('peak');
      }
      if (pctEl) pctEl.textContent = pct + '%';
    });
  }

  // ── CARD C4: XP esta semana (barras por día) ─────────────
  function _renderC4(sessions) {
    // Construir array de los últimos 7 días (hoy = índice 6)
    var days = [];
    for (var i = 6; i >= 0; i--) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      days.push({ date: _localDate(d), day: DAY_NAMES[d.getDay()], xp: 0 });
    }

    sessions.forEach(function(s) {
      var sd = s.played_at ? s.played_at.substring(0, 10) : '';
      var found = days.find(function(d){ return d.date === sd; });
      if (found) found.xp += (s.xp_earned || 0);
    });

    var maxXP = Math.max(1, Math.max.apply(null, days.map(function(d){ return d.xp; })));

    var bars = document.querySelectorAll('.c4-bar');
    var axisSpans = document.querySelectorAll('.c4-axis span');

    days.forEach(function(day, idx) {
      var pct = Math.round((day.xp / maxXP) * 100);
      if (pct < 4 && day.xp === 0) pct = 4; // altura mínima visual

      var bar = bars[idx];
      if (bar) {
        bar.style.height = pct + '%';
        bar.setAttribute('data-v', day.xp > 0 ? '+' + day.xp + ' XP' : '–');
        // Peak = día con más XP
        if (day.xp === maxXP && day.xp > 0) bar.classList.add('peak');
        else bar.classList.remove('peak');
      }
      var axEl = axisSpans[idx];
      if (axEl) axEl.textContent = day.day;
    });
  }

  // ── CARD C5: Skills Hoy (donuts) ─────────────────────────
  function _renderC5(sessions) {
    var today = _localDate();
    var todaySessions = sessions.filter(function(s) {
      return s.played_at && s.played_at.substring(0,10) === today;
    });

    // Acumular XP por skill hoy
    var bySkill = {};
    todaySessions.forEach(function(s) {
      bySkill[s.skill] = (bySkill[s.skill] || 0) + (s.xp_earned || 0);
    });

    var skillList = Object.keys(bySkill).sort(function(a,b){ return bySkill[b]-bySkill[a]; });
    var totalXP = skillList.reduce(function(sum,k){ return sum + bySkill[k]; }, 0) || 1;

    var donutsEl = document.getElementById('c5-donuts');
    var legendEl = document.getElementById('c5-legend');
    if (!donutsEl || !legendEl) return;

    if (skillList.length === 0) {
      donutsEl.innerHTML = '<div style="color:rgba(255,255,255,.3);font-size:13px;text-align:center;padding:20px 0;">Sin actividad hoy</div>';
      legendEl.innerHTML = '';
      return;
    }

    // Mostrar top 2 skills
    var top = skillList.slice(0, 2);
    donutsEl.innerHTML = '';
    legendEl.innerHTML = '';

    top.forEach(function(skill) {
      var pct = Math.round((bySkill[skill] / totalXP) * 100);
      var color = SKILL_COLOR[skill] || '#94a3b8';
      var offset = _donutOffset(pct);

      // Icono SVG por skill
      var icons = {
        'Vocabulary': '<path d="M12 2 4 6v6c0 5 4 9 8 10 4-1 8-5 8-10V6l-8-4z"/>',
        'Listening' : '<path d="M3 12h3l3-9 6 18 3-9h3"/>',
        'Speaking'  : '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/>',
        'Grammar'   : '<path d="M4 6h16M4 12h8M4 18h12"/>',
        'Writing'   : '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5l3 3L12 15l-4 1 1-4z"/>',
        'General'   : '<circle cx=12 cy=12 r=10/><path d="M12 8v4M12 16h.01"/>',
      };
      var iconPath = icons[skill] || icons['General'];

      donutsEl.innerHTML +=
        '<div class="donut">' +
          '<svg viewBox="0 0 100 100">' +
            '<circle class="donut-track" cx=50 cy=50 r=42></circle>' +
            '<circle class="donut-fill" cx=50 cy=50 r=42 stroke="' + color + '" stroke-dasharray=264 stroke-dashoffset=' + offset + '></circle>' +
          '</svg>' +
          '<div class="donut-icon"><svg viewBox="0 0 24 24">' + iconPath + '</svg></div>' +
        '</div>';

      legendEl.innerHTML += '<span style="color:' + color + '">' + skill + ' ' + pct + '%</span>';
    });
  }

  // ── CARD C7: Historial de Lecciones ──────────────────────
  function _renderC7(sessions) {
    var bodyEl = document.getElementById('c7-body');
    if (!bodyEl) return;

    var recent = sessions.slice(0, 6);
    if (recent.length === 0) {
      bodyEl.innerHTML = '<div style="color:rgba(255,255,255,.3);font-size:13px;text-align:center;padding:20px 0;">Sin sesiones recientes</div>';
      return;
    }

    bodyEl.innerHTML = '';
    recent.forEach(function(s) {
      var date = s.played_at ? new Date(s.played_at) : new Date();
      var dateStr = date.toLocaleDateString('es-CO', { day:'numeric', month:'short', year:'numeric' }) +
        ' · ' + date.toLocaleTimeString('es-CO', { hour:'2-digit', minute:'2-digit' });
      var emoji   = TOOL_EMOJI[s.tool] || '📚';
      var toolLbl = TOOL_LABEL[s.tool] || s.tool;
      var xpTxt   = s.xp_earned > 0 ? ' · +' + s.xp_earned + ' XP' : '';

      bodyEl.innerHTML +=
        '<div class="hist-row">' +
          '<div class="hist-img">' + emoji + '</div>' +
          '<div class="hist-meta">' +
            '<b>' + toolLbl + '</b>' +
            '<span>' + dateStr + ' · ' + (s.skill||'General') + xpTxt + '</span>' +
          '</div>' +
          '<span class="hist-arrow">›</span>' +
        '</div>';
    });
  }

  // ── CARD C8: Intensidad Diaria (línea SVG 30 días) ───────
  function _renderC8(sessions) {
    var pathEl   = document.getElementById('c8-path');
    var fillEl   = document.getElementById('c8-fill');
    var footEl   = document.getElementById('c8-foot');
    if (!pathEl && !fillEl) return;

    // Construir buckets de 30 días
    var buckets = [];
    for (var i = 29; i >= 0; i--) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      buckets.push({ date: _localDate(d), count: 0 });
    }

    sessions.forEach(function(s) {
      var sd = s.played_at ? s.played_at.substring(0,10) : '';
      var b  = buckets.find(function(x){ return x.date === sd; });
      if (b) b.count++;
    });

    var maxCount = Math.max(1, Math.max.apply(null, buckets.map(function(b){ return b.count; })));

    // Calcular puntos SVG (300×110 viewBox)
    var W = 300, H = 110, PAD = 10;
    var points = buckets.map(function(b, i) {
      var x = Math.round((i / (buckets.length - 1)) * W);
      var y = Math.round(H - PAD - ((b.count / maxCount) * (H - PAD * 2)));
      return [x, y];
    });

    var lineD = points.map(function(p, i){ return (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]; }).join(' ');
    var areaD = lineD + ' L' + W + ',' + H + ' L0,' + H + ' Z';

    if (pathEl) pathEl.setAttribute('d', lineD);
    if (fillEl) fillEl.setAttribute('d', areaD);

    // Dot en el último punto
    var dotEl = document.getElementById('c8-dot');
    var dotGlEl = document.getElementById('c8-dotgl');
    var last = points[points.length - 1];
    if (dotEl && last) { dotEl.setAttribute('cx', last[0]); dotEl.setAttribute('cy', last[1]); }
    if (dotGlEl && last) { dotGlEl.setAttribute('cx', last[0]); dotGlEl.setAttribute('cy', last[1]); }

    // Footer: sesiones activas hoy
    if (footEl) {
      var todayBucket = buckets[buckets.length - 1];
      footEl.innerHTML = 'Lecciones completadas hoy | <b>' + (todayBucket ? todayBucket.count : 0) + '</b>';
    }
  }

  // ── CARD C9: Accuracy ────────────────────────────────────
  function _renderC9(sessions) {
    var fillEl = document.getElementById('c9-accuracy-fill');
    var numEl  = document.getElementById('c9-accuracy-num');
    if (!fillEl && !numEl) return;

    var withAcc = sessions.filter(function(s){ return s.accuracy > 0; });
    var avg = 0;
    if (withAcc.length > 0) {
      avg = Math.round(withAcc.reduce(function(sum,s){ return sum + s.accuracy; }, 0) / withAcc.length);
    }

    if (fillEl) fillEl.setAttribute('stroke-dashoffset', _donutOffset(avg));
    if (numEl)  numEl.textContent = avg + '%';
  }

  // ── RENDER PRINCIPAL ──────────────────────────────────────
  async function render() {
    try {
      await _waitForAura();
      var sessions  = await _fetchSessions();
      var lecciones = await _fetchLecciones();

      _renderC1(lecciones);
      _renderC3(sessions, (window._aura && window._aura.profile) || {});
      _renderC4(sessions);
      _renderC5(sessions);
      _renderC7(sessions);
      _renderC8(sessions);
      _renderC9(sessions);
    } catch(e) {
      console.warn('[AuraDashboard] Error cargando datos:', e);
    }
  }

  // Recargar cuando se registre una nueva sesión en la misma página
  document.addEventListener('aura:session', function() {
    setTimeout(render, 500);
  });

  // Iniciar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }

})();

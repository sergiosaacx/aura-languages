// ============================================================
//  AURA LANGUAGES — aura-xp.js  v2
//  Módulo de XP, niveles CEFR, AuraPoints y Puntos de Mérito
//
//  REQUISITO: aura-supabase.js debe cargarse ANTES que este archivo.
//  Reutiliza window._aura.sb y window._aura.userId — no crea
//  un cliente Supabase nuevo.
//
//  ── USO EN CADA PÁGINA ───────────────────────────────────
//  En el <head> (después de aura-supabase.js):
//    <script src="aura-xp.js"></script>
//
//  Al cargar la página (después de que _aura esté listo):
//    AuraXP.init().then(() => AuraXP.refreshBars());
//
//  Donde quieras mostrar la barra XP (en el HTML):
//    <div data-aura-xp-bar></div>
//
//  Cuando el usuario acierta en un juego:
//    await AuraXP.addXP(10);   // +XP
//    await AuraXP.addPM(5);    // +Puntos de Mérito (exámenes de rango)
//    await AuraXP.addAP(2);    // +AuraPoints (tienda)
// ============================================================

(function (global) {
  'use strict';

  // ── TABLA XP POR NIVEL (CEFR-alineada) ───────────────────
  //  A1  Lv  1–20  →  1.200 XP/nivel   → Bronce
  //  A2  Lv 21–40  →  2.000 XP/nivel   → Plata   (exam unlock Lv 20)
  //  B1  Lv 41–55  →  3.000 XP/nivel   → Oro     (exam unlock Lv 40)
  //  B2  Lv 56–70  →  5.000 XP/nivel   → Platino (exam unlock Lv 55)
  //  C1  Lv 71–85  →  8.000 XP/nivel   → Diamante(exam unlock Lv 70)
  //  C2  Lv 86–100 → 12.000 XP/nivel   → Challenger(exam unlock Lv 85)
  function xpForLevel(level) {
    if (level >= 1  && level <= 20) return 1200;
    if (level >= 21 && level <= 40) return 2000;
    if (level >= 41 && level <= 55) return 3000;
    if (level >= 56 && level <= 70) return 5000;
    if (level >= 71 && level <= 85) return 8000;
    if (level >= 86 && level <= 99) return 12000;
    return null; // Lv 100 = máximo
  }

  function cefrLabel(level) {
    if (level <= 20) return 'A1';
    if (level <= 40) return 'A2';
    if (level <= 55) return 'B1';
    if (level <= 70) return 'B2';
    if (level <= 85) return 'C1';
    return 'C2';
  }

  function rankForLevel(level) {
    if (level >= 85) return 'Challenger';
    if (level >= 70) return 'Diamante';
    if (level >= 55) return 'Platino';
    if (level >= 40) return 'Oro';
    if (level >= 20) return 'Plata';
    return 'Bronce';
  }

  // Dado el XP total acumulado, calcula nivel y progreso dentro del nivel
  function calcLevel(totalXP) {
    var level     = 1;
    var remaining = totalXP;
    while (level < 100) {
      var cost = xpForLevel(level);
      if (!cost || remaining < cost) break;
      remaining -= cost;
      level++;
    }
    var nextCost = xpForLevel(level);
    return {
      level       : level,
      xpIntoLevel : remaining,
      xpForNext   : nextCost || 0,
      percent     : nextCost ? Math.min(100, Math.floor((remaining / nextCost) * 100)) : 100,
      cefr        : cefrLabel(level),
      rank        : rankForLevel(level),
    };
  }

  // XP total acumulado para llegar exactamente al nivel indicado
  function xpToReachLevel(targetLevel) {
    var total = 0;
    for (var lv = 1; lv < targetLevel; lv++) {
      var c = xpForLevel(lv);
      if (!c) break;
      total += c;
    }
    return total;
  }

  // ── ESTADO INTERNO ────────────────────────────────────────
  var _ready = false;
  var _state = { total_xp: 0, level: 1, merit_pm: 0, aura_ap: 0 };

  // ── HELPERS SUPABASE ──────────────────────────────────────
  function _sb()     { return global._aura && global._aura.sb; }
  function _userId() { return global._aura && global._aura.userId; }

  // Espera hasta que _aura.userId esté disponible (máx 8 segundos)
  function _waitForAura() {
    return new Promise(function (resolve, reject) {
      if (_userId()) return resolve();
      var attempts = 0;
      var timer = setInterval(function () {
        if (_userId()) { clearInterval(timer); resolve(); return; }
        if (++attempts > 80) { clearInterval(timer); reject(new Error('[AuraXP] _aura no disponible')); }
      }, 100);
    });
  }

  async function _loadFromDB() {
    var res = await _sb().from('profiles').select('xp, nivel, merit_pm, aura_points')
      .eq('id', _userId()).single();
    if (res.data) {
      _state.total_xp = res.data.xp          || 0;
      _state.level    = res.data.nivel        || 1;
      _state.merit_pm = res.data.merit_pm     || 0;
      _state.aura_ap  = res.data.aura_points  || 0;
    }
  }

  async function _saveToDB(patch) {
    await _sb().from('profiles').update(patch).eq('id', _userId());
  }

  // ── RENDERIZADO DE BARRA XP ───────────────────────────────
  var _stylesInjected = false;

  function _injectStyles() {
    if (_stylesInjected) return;
    _stylesInjected = true;
    var s = document.createElement('style');
    s.textContent = [
      '.axp-wrap{font-family:"Open Sans",sans-serif;width:100%;box-sizing:border-box;}',
      '.axp-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;}',
      '.axp-lv{font-size:14px;color:#f0ede6;}',
      '.axp-lv strong{font-size:16px;color:#c084fc;}',
      '.axp-cefr{font-size:11px;background:rgba(168,85,247,.18);color:#c084fc;',
        'padding:2px 8px;border-radius:99px;border:1px solid rgba(168,85,247,.35);}',
      '.axp-xp-txt{margin-left:auto;font-size:11px;color:rgba(240,237,230,.5);}',
      '.axp-track{width:100%;height:7px;background:rgba(255,255,255,.08);border-radius:99px;overflow:hidden;}',
      '.axp-fill{height:100%;background:linear-gradient(90deg,#7c3aed,#a855f7,#c084fc);',
        'border-radius:99px;transition:width .6s cubic-bezier(.4,0,.2,1);}',
      '.axp-footer{display:flex;gap:14px;margin-top:6px;}',
      '.axp-pm{font-size:11px;color:#facc15;}',
      '.axp-ap{font-size:11px;color:#a855f7;}',
    ].join('');
    document.head.appendChild(s);
  }

  function _renderBar(el) {
    var calc = calcLevel(_state.total_xp);
    el.innerHTML =
      '<div class="axp-wrap">' +
        '<div class="axp-header">' +
          '<span class="axp-lv">Lv <strong>' + calc.level + '</strong></span>' +
          '<span class="axp-cefr">' + calc.cefr + '</span>' +
          '<span class="axp-xp-txt">' +
            calc.xpIntoLevel.toLocaleString() + ' / ' + calc.xpForNext.toLocaleString() + ' XP' +
          '</span>' +
        '</div>' +
        '<div class="axp-track"><div class="axp-fill" style="width:' + calc.percent + '%"></div></div>' +
        '<div class="axp-footer">' +
          '<span class="axp-pm">⭐ ' + _state.merit_pm.toLocaleString() + ' PM</span>' +
          '<span class="axp-ap">◆ ' + _state.aura_ap.toLocaleString() + ' AP</span>' +
        '</div>' +
      '</div>';
    _injectStyles();
  }

  // Actualiza los elementos del dashboard/topbar que maneja aura-supabase.js
  function _syncUI() {
    var calc = calcLevel(_state.total_xp);

    // Topbar: nivel numérico
    var elNivel = document.getElementById('statLevel');
    if (elNivel) elNivel.textContent = calc.level;

    // Topbar: AuraPoints
    var elAura  = document.getElementById('statAura');
    if (elAura)  elAura.textContent  = _state.aura_ap.toLocaleString();
    var elAura2 = document.getElementById('statAura2');
    if (elAura2) elAura2.textContent = _state.aura_ap.toLocaleString();

    // Barra XP legacy (lyriclab / dashboard)
    var xpVal = document.getElementById('xpValue');
    if (xpVal) xpVal.textContent = calc.xpIntoLevel.toLocaleString() + ' / ' + calc.xpForNext.toLocaleString();
    var xpBar = document.getElementById('xpBar');
    if (xpBar) xpBar.style.width = calc.percent + '%';

    // Badge de nivel en lyriclab
    var lvBadge = document.querySelector('.level-number');
    if (lvBadge) lvBadge.textContent = 'Nv. ' + calc.level;

    // Subtitle en topbar (tb-name span)
    var tbS = document.querySelector('.tb-name span');
    if (tbS) tbS.textContent = calc.cefr + ' · ' + calc.rank;

    // Todas las barras [data-aura-xp-bar]
    document.querySelectorAll('[data-aura-xp-bar]').forEach(function (el) { _renderBar(el); });
  }

  // Dispara evento cuando sube de nivel
  function _dispatchLevelUp(oldLv, newLv) {
    document.dispatchEvent(new CustomEvent('aura:levelup', {
      detail: { oldLevel: oldLv, newLevel: newLv, cefr: cefrLabel(newLv), rank: rankForLevel(newLv) }
    }));
  }

  // ── API PÚBLICA ───────────────────────────────────────────
  var AuraXP = {

    // Inicializar — espera a que _aura esté listo y carga el perfil
    init: async function () {
      await _waitForAura();
      await _loadFromDB();
      _ready = true;
      _syncUI();
      return this;
    },

    // Sumar XP (llamar cuando el usuario responde bien)
    addXP: async function (amount) {
      amount = amount || 10;
      if (!_ready) await this.init();
      var before   = calcLevel(_state.total_xp);
      _state.total_xp += amount;
      var after    = calcLevel(_state.total_xp);
      _state.level = after.level;

      await _saveToDB({
        xp    : _state.total_xp,
        nivel : after.level,
      });

      if (after.level > before.level) _dispatchLevelUp(before.level, after.level);

      // Actualizar también en _aura.profile para consistencia
      if (global._aura && global._aura.profile) {
        global._aura.profile.xp    = _state.total_xp;
        global._aura.profile.nivel = after.level;
      }

      _syncUI();
      return after;
    },

    // Sumar AuraPoints (tienda — se ganan poquitos en partidas o se compran)
    addAP: async function (amount) {
      amount = amount || 0;
      if (!_ready) await this.init();
      _state.aura_ap += amount;
      await _saveToDB({ aura_points: _state.aura_ap });
      if (global._aura && global._aura.profile) global._aura.profile.aura_points = _state.aura_ap;
      _syncUI();
    },

    // Sumar Puntos de Mérito (solo en partidas — requisito para exámenes de rango)
    addPM: async function (amount) {
      amount = amount || 0;
      if (!_ready) await this.init();
      _state.merit_pm += amount;
      await _saveToDB({ merit_pm: _state.merit_pm });
      if (global._aura && global._aura.profile) global._aura.profile.merit_pm = _state.merit_pm;
      _syncUI();
    },

    // Renderizar barra XP en un selector o elemento
    renderBar: function (selector) {
      var el = typeof selector === 'string' ? document.querySelector(selector) : selector;
      if (el) _renderBar(el);
    },

    // Re-renderizar todas las barras [data-aura-xp-bar] de la página
    refreshBars: function () { _syncUI(); },

    // Estado actual con cálculo completo
    getState: function () {
      return Object.assign({}, _state, calcLevel(_state.total_xp));
    },

    // Utilidades públicas
    calcLevel      : calcLevel,
    xpToReachLevel : xpToReachLevel,
    cefrLabel      : cefrLabel,
    rankForLevel   : rankForLevel,
  };

  global.AuraXP = AuraXP;

})(window);

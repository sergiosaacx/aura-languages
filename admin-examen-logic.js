/* admin-examen-logic.js -- dispatcher del editor admin
   Arquitectura de plugins: cada pestaña registra su propio
   render/save en window.admEditorRender[skill] y window.admEditorSave[skill].
   Los tabs sin módulo propio usan el fallback genérico (HTML textarea).
   ─────────────────────────────────────────────────────────────────────── */

// Registros globales -- disponibles antes de que carguen los módulos de pestaña
window.admEditorRender = window.admEditorRender || {};
window.admEditorSave   = window.admEditorSave   || {};

// ── Sync hero card con clip real cargado por examen-listening-engine.js ──
if (typeof window.onExamListeningPick === 'function') {
  window.onExamListeningPick(function (clip) {
    if (!clip) return;
    var title = clip.pelicula_titulo || clip.pelicula_slug || 'clip';
    var fT = function (s) { s = +s || 0; return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0'); };
    var ipa = 'audio · ' + fT(clip.start || 0) + ' / ' + fT(clip.end || 0);
    skillData.listen.word = title;
    skillData.listen.ipa  = ipa;
    if (document.querySelector('.tab.active')?.dataset.skill === 'listen') {
      var wEl   = heroCard.querySelector('.hc-word');
      var ipaEl = heroCard.querySelector('.hc-ipa');
      if (wEl)   wEl.textContent   = title;
      if (ipaEl) ipaEl.textContent = ipa;
    }
  });
}

// Aplicar versión inicial
applyVersion(EXAM_VERSION);

// ── Core del editor (drawer, publicar, toast) ─────────────────────────────
(function () {
  'use strict';

  document.body.classList.add('adm-mode');
  let _v = 1, _skill = null;

  /* Helpers internos */
  function fixIframes(container) {
    container.querySelectorAll('iframe').forEach(function (iframe) {
      var ni = document.createElement('iframe');
      Array.from(iframe.attributes).forEach(function (a) { ni.setAttribute(a.name, a.value); });
      iframe.parentNode.replaceChild(ni, iframe);
    });
  }

  /* Helper compartido: renderiza los campos del Hero Card.
     Los módulos de pestaña pueden llamarlo si lo necesitan. */
  window._admRenderHeroCard = function (sd, body) {
    if (!sd) return;
    var sec  = document.createElement('div');
    sec.innerHTML = '<div class="adm-section-label">Hero Card</div>';
    var grid = document.createElement('div');
    grid.className = 'adm-hero-grid';
    [
      { key: 'word',   label: 'Título' },
      { key: 'ipa',    label: 'IPA / Subtítulo' },
      { key: 'pos',    label: 'Categoría' },
      { key: 'chip',   label: 'Chip' },
      { key: 'rating', label: 'Rating' },
      { key: 'qLabel', label: 'Instrucción' }
    ].forEach(function (f) {
      var w = document.createElement('div');
      w.className = 'adm-field';
      w.innerHTML = '<label>' + f.label + '</label><input type="text" data-key="' + f.key + '" value="' + (sd[f.key] || '').replace(/"/g, '&quot;') + '">';
      grid.appendChild(w);
    });
    if (sd.opts) {
      var w = document.createElement('div');
      w.className = 'adm-field';
      w.style.gridColumn = '1/-1';
      w.innerHTML = '<label>Opciones (separar con |)</label><input type="text" data-key="opts" value="' + sd.opts.map(function (o) { return o.t || o; }).join('|') + '">';
      grid.appendChild(w);
    }
    sec.appendChild(grid);
    body.appendChild(sec);
  };

  /* Accesores para módulos de pestaña */
  window._admGetV     = function () { return _v; };
  window._admGetSkill = function () { return _skill; };

  /* Agrega botones ✏ Editar a cada panel */
  function admAddEditBtns() {
    document.querySelectorAll('.mid-content[data-skill]').forEach(function (panel) {
      if (panel.querySelector('.adm-ep-btn')) return;
      var skill = panel.dataset.skill;
      var btn   = document.createElement('button');
      btn.className   = 'adm-ep-btn';
      btn.textContent = '✏ Editar';
      btn.onclick = function (e) { e.stopPropagation(); window.admOpenDrawer(skill); };
      panel.appendChild(btn);
    });
  }

  /* ── API pública ────────────────────────────────────────────────────── */

  window.admSetVersion = function (v) {
    _v = v;
    document.querySelectorAll('.adm-vtab').forEach(function (t) {
      t.classList.toggle('active', parseInt(t.dataset.v) === v);
    });
    var st = document.getElementById('adm-status');
    if (st) st.textContent = 'Editando V' + v;
    if (typeof applyVersion === 'function') applyVersion(v);
    setTimeout(admAddEditBtns, 150);
  };

  window.admSetLang  = function (lang) { window.admShowToast('Idioma: ' + lang); };
  window.admSetScore = function () {};

  /* Abre el drawer de edición para una pestaña */
  window.admOpenDrawer = function (skill) {
    _skill = skill;
    var titleEl = document.getElementById('adm-dw-title');
    if (titleEl) titleEl.textContent = 'Editar · ' + skill.toUpperCase();

    // Obtener datos actuales
    var sd = null, midHtml = '';
    if (typeof VERSION_SD !== 'undefined' && VERSION_SD[_v] && VERSION_SD[_v][skill]) {
      sd = VERSION_SD[_v][skill];
    } else if (typeof skillData !== 'undefined' && skillData[skill]) {
      sd = skillData[skill];
    }
    if (typeof VERSION_MID !== 'undefined' && VERSION_MID[_v] && VERSION_MID[_v][skill]) {
      midHtml = VERSION_MID[_v][skill];
    } else {
      var el = document.querySelector('.mid-content[data-skill="' + skill + '"]');
      if (el) midHtml = el.innerHTML;
    }

    var body = document.getElementById('adm-dw-body');
    body.innerHTML = '';

    // ── Delegar a módulo de pestaña (si existe) ──
    var handled = false;
    if (typeof window.admEditorRender[skill] === 'function') {
      handled = window.admEditorRender[skill](sd, midHtml, body, _v);
    }

    // ── Fallback genérico: Hero Card + textarea HTML ──
    if (!handled) {
      window._admRenderHeroCard(sd, body);
      var msec = document.createElement('div');
      msec.innerHTML = '<div class="adm-section-label">Contenido Central (HTML)</div>';
      var mf = document.createElement('div');
      mf.className = 'adm-field';
      mf.innerHTML = '<label>HTML del panel</label><textarea data-key="midHtml" rows="10">' +
        midHtml.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</textarea>';
      msec.appendChild(mf);
      body.appendChild(msec);
    }

    document.getElementById('adm-overlay').classList.add('open');
    document.getElementById('adm-drawer').classList.add('open');
  };

  window.admCloseDrawer = function () {
    document.getElementById('adm-overlay').classList.remove('open');
    document.getElementById('adm-drawer').classList.remove('open');
    _skill = null;
  };

  /* Guarda -- delega a módulo de pestaña o usa fallback genérico */
  window.admSaveDrawer = function () {
    if (!_skill) return;

    if (typeof window.admEditorSave[_skill] === 'function') {
      window.admEditorSave[_skill](_v, _skill, fixIframes);
      return;
    }

    // Fallback genérico
    var heroData = {};
    document.querySelectorAll('#adm-dw-body input[data-key]').forEach(function (inp) {
      var k = inp.dataset.key;
      if (['yt_id', 'yt_start', 'yt_end'].includes(k)) return;
      heroData[k] = k === 'opts' ? inp.value.split('|').map(function (s) { return s.trim(); }) : inp.value;
    });
    var midTa   = document.querySelector('#adm-dw-body textarea[data-key="midHtml"]');
    var midHtml = midTa ? midTa.value : '';

    if (typeof VERSION_SD !== 'undefined') {
      if (!VERSION_SD[_v]) VERSION_SD[_v] = {};
      VERSION_SD[_v][_skill] = Object.assign(VERSION_SD[_v][_skill] || {}, heroData);
    }
    if (typeof VERSION_MID !== 'undefined') {
      if (!VERSION_MID[_v]) VERSION_MID[_v] = {};
      VERSION_MID[_v][_skill] = midHtml;
    }
    var el = document.querySelector('.mid-content[data-skill="' + _skill + '"]');
    if (el) { el.innerHTML = midHtml; fixIframes(el); }
    if (typeof applyVersion === 'function') applyVersion(_v);
    window.admCloseDrawer();
    window.admShowToast('✓ Cambios aplicados · V' + _v + ' · ' + _skill);
  };

  window.admPreview = function () {
    window.admShowToast('Abriendo preview…');
    window.open('https://sergiosaacx.github.io/aura-languages/examen-ascenso.html', '_blank');
  };

  window.admPublish = function () {
    var lang    = (document.getElementById('adm-lang') || {}).value || 'en';
    var payload = {
      section:  'full',
      rank:     (['bronce', 'plata', 'oro', 'platino', 'diamante', 'challenger'][_v] || 'diamante'),
      language: lang,
      content:  JSON.stringify({
        version: _v,
        sd:  (typeof VERSION_SD  !== 'undefined') ? VERSION_SD[_v]  : {},
        mid: (typeof VERSION_MID !== 'undefined') ? VERSION_MID[_v] : {}
      }),
      active: true
    };
    if (typeof window.auraSupabase !== 'undefined' && window.auraSupabase) {
      window.auraSupabase.from('exam_content')
        .upsert(payload, { onConflict: 'section,rank,language' })
        .then(function (r) {
          window.admShowToast(r.error ? '❌ ' + r.error.message : '✅ Publicado V' + _v);
        });
    } else {
      navigator.clipboard?.writeText(JSON.stringify(payload, null, 2))
        .then(function ()  { window.admShowToast('📋 JSON copiado'); })
        .catch(function () { window.admShowToast('⚠ Sin Supabase'); });
    }
  };

  window.admShowToast = function (msg) {
    var t = document.getElementById('adm-toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._tid);
    t._tid = setTimeout(function () { t.classList.remove('show'); }, 2800);
  };

  function initAdmin() {
    admAddEditBtns();
    window.admSetVersion(1);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdmin);
  } else {
    initAdmin();
  }

})();

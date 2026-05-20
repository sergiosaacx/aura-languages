(function() {
  'use strict';

  /* ── CSS ─────────────────────────────────────────────────────────────── */
  if (!document.getElementById('_aura-pdd-css')) {
    var st = document.createElement('style');
    st.id = '_aura-pdd-css';
    st.textContent = [
      '#profileMenu{display:none;position:fixed;z-index:10001;background:#1f1f1f;border:1px solid #333;border-radius:12px;padding:6px;min-width:220px;flex-direction:column;gap:2px;box-shadow:0 8px 32px rgba(0,0,0,.5);}',
      '.pm-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:13px;font-weight:500;color:#c8c8c8;cursor:pointer;transition:background .15s,color .15s;border:none;background:none;width:100%;text-align:left;font:inherit;}',
      '.pm-item:hover{background:rgba(255,255,255,.05);color:#f5f5f5;}',
      '.pm-logout{color:#f87171!important;}',
      '.pm-logout:hover{background:rgba(239,68,68,.08)!important;color:#fca5a5!important;}',
      '.pm-div{height:1px;background:#262626;margin:2px 0;}',
      '.pm-status{display:flex;align-items:center;justify-content:space-between;padding:9px 12px;}',
      '.pm-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;flex-shrink:0;display:inline-block;}',
      '.pm-dot.away{background:#f59e0b;}',
      '.pm-pill{font-size:11px;font-weight:600;padding:4px 10px;border-radius:999px;cursor:pointer;transition:all .15s;background:rgba(34,197,94,.15);color:#22c55e;border:1px solid rgba(34,197,94,.3);}',
      '.pm-pill.away{background:rgba(245,158,11,.15);color:#f59e0b;border-color:rgba(245,158,11,.3);}'
    ].join('');
    document.head.appendChild(st);
  }

  /* ── Inyectar #profileMenu ───────────────────────────────────────────── */
  if (!document.getElementById('profileMenu')) {
    var menu = document.createElement('div');
    menu.id = 'profileMenu';
    var ic = function(d) {
      return '<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.8;flex-shrink:0">' + d + '</svg>';
    };
    menu.innerHTML =
      '<div class="pm-status">' +
        '<div style="display:flex;align-items:center;gap:8px;">' +
          '<span class="pm-dot" id="pmDot"></span>' +
          '<span style="font-size:13px;font-weight:600;color:#f5f5f5;" id="pmStatusTxt">En línea</span>' +
        '</div>' +
        '<span class="pm-pill" id="pmPill" onclick="pmToggleStatus(event)">En línea</span>' +
      '</div>' +
      '<div class="pm-div"></div>' +
      '<button class="pm-item">' + ic('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>') + 'Información de la cuenta</button>' +
      '<button class="pm-item">' + ic('<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>') + 'Seguridad de la cuenta</button>' +
      '<button class="pm-item" onclick="if(window.auraNav)auraNav(\'settings.html\')">' + ic('<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>') + 'Ajustes</button>' +
      '<div class="pm-div"></div>' +
      '<button class="pm-item pm-logout" onclick="cerrarSesion()">' + ic('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>') + 'Cerrar sesión</button>';
    document.body.appendChild(menu);
  }

  /* ── photoInput ─────────────────────────────────────────────────────── */
  if (!document.getElementById('photoInput')) {
    var inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'image/*'; inp.id = 'photoInput'; inp.style.display = 'none';
    inp.addEventListener('change', function() {
      if (!inp.files[0]) return;
      var reader = new FileReader();
      reader.onload = function(ev) {
        var src = ev.target.result;
        window._applyAvatar(src);
        try { localStorage.setItem('aura_profile_photo', src); } catch(e) {}
        if (window._aura) window._aura.uploadAvatar(inp.files[0]);
      };
      reader.readAsDataURL(inp.files[0]);
    });
    document.body.appendChild(inp);
  }

  /* ── FUNCIONES GLOBALES ──────────────────────────────────────────────── */

  window.toggleProfileMenu = function(e) {
    if (e) e.stopPropagation();
    var m = document.getElementById('profileMenu');
    if (!m) return;
    if (m.style.display === 'none' || !m.style.display) {
      var btn = (e && e.currentTarget) ? e.currentTarget : document.querySelector('.tb-profile');
      var rect = btn ? btn.getBoundingClientRect() : { bottom: 60, right: window.innerWidth - 82 };
      m.style.display = 'flex';
      m.style.top    = (rect.bottom + 8) + 'px';
      m.style.right  = (window.innerWidth - rect.right) + 'px';
      m.style.left   = 'auto';
    } else {
      m.style.display = 'none';
    }
  };

  var _pmStatus = 'online';
  window.pmToggleStatus = function(e) {
    if (e) e.stopPropagation();
    _pmStatus = _pmStatus === 'online' ? 'away' : 'online';
    var label = _pmStatus === 'online' ? 'En línea' : 'Ausente';
    var dot  = document.getElementById('pmDot');
    var txt  = document.getElementById('pmStatusTxt');
    var pill = document.getElementById('pmPill');
    if (dot)  { dot.className  = 'pm-dot' + (_pmStatus === 'away' ? ' away' : ''); }
    if (txt)  { txt.textContent  = label; }
    if (pill) { pill.textContent = label; pill.className = 'pm-pill' + (_pmStatus === 'away' ? ' away' : ''); }
  };

  window.triggerPhotoUpload = function() {
    var i = document.getElementById('photoInput');
    if (i) i.click();
  };

  window._applyAvatar = function(src) {
    ['tbAvatar', 'pmAvatar', 'hm-avatar', '_aura-nav-avatar'].forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (src) el.innerHTML = '<img src="' + src + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
    });
  };

  window.cerrarSesion = function() {
    var m = document.getElementById('profileMenu');
    if (m) m.style.display = 'none';
    if (window.auraLogout) { window.auraLogout(); return; }
    try { if (window._aura && window._aura.sb) window._aura.sb.auth.signOut(); } catch(ex) {}
    window.location.href = 'login.html';
  };

  /* ── Cerrar al click fuera ───────────────────────────────────────────── */
  document.addEventListener('click', function() {
    var m = document.getElementById('profileMenu');
    if (m) m.style.display = 'none';
  });

  /* ── Rellenar datos de perfil ────────────────────────────────────────── */
  var _att = 0;
  function _fillProfile() {
    var p = window._aura && window._aura.profile;
    if (!p) { if (++_att < 40) setTimeout(_fillProfile, 300); return; }
    var nombre   = p.nombre || p.name || p.email || '—';
    var initials = nombre.split(' ').map(function(w){ return w[0]; }).join('').toUpperCase().slice(0, 2) || '?';
    var foto     = p.foto_url || null;
    // Avatares en topbar
    ['tbAvatar', 'hm-avatar'].forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (foto) el.innerHTML = '<img src="' + foto + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
      else el.textContent = initials;
    });
    // Nombre en topbar dashboard
    var tn = document.getElementById('tbNameText');
    if (tn) tn.textContent = nombre;
    // pmName (compat)
    var pmN = document.getElementById('pmName');
    if (pmN) pmN.textContent = nombre;
  }

  /* ── Auto-wire .tb-profile sin onclick ──────────────────────────────── */
  function _wire() {
    var btns = document.querySelectorAll('.tb-profile');
    btns.forEach(function(btn) {
      if (btn.dataset.pddWired || btn.getAttribute('onclick')) return;
      btn.dataset.pddWired = '1';
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', function(e) { window.toggleProfileMenu(e); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { _wire(); _fillProfile(); });
  } else {
    _wire(); _fillProfile();
  }

})();

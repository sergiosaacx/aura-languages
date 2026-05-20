(function() {
  'use strict';

  /* ─── CSS del dropdown de perfil ────────────────────────────────────────── */
  if (!document.getElementById('_aura-pdd-css')) {
    var s = document.createElement('style');
    s.id = '_aura-pdd-css';
    s.textContent =
      '.pm-item{color:rgba(255,255,255,.75);transition:background .15s,color .15s;}' +
      '.pm-item:hover{background:rgba(255,255,255,.06);color:#f5f5f5;}';
    document.head.appendChild(s);
  }

  /* ─── INYECTAR profileMenu si no existe ─────────────────────────────────── */
  if (!document.getElementById('profileMenu')) {
    var menu = document.createElement('div');
    menu.id = 'profileMenu';
    menu.style.cssText = 'display:none;position:fixed;z-index:10000;background:rgba(18,12,35,.97);border:1px solid rgba(196,255,61,.25);border-radius:14px;backdrop-filter:blur(24px);padding:12px 0;min-width:200px;box-shadow:0 8px 32px rgba(0,0,0,.6);';
    menu.innerHTML =
      '<div style="padding:12px 16px 10px;border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:center;gap:10px;">' +
        '<div id="pmAvatar" style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#0c0c0c,#a8e02f);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:.9rem;overflow:hidden;flex-shrink:0;"></div>' +
        '<div>' +
          '<div id="pmName" style="font-size:.85rem;font-weight:700;color:#f0ede6;">···</div>' +
          '<div style="font-size:.7rem;color:rgba(255,255,255,.4);display:flex;align-items:center;gap:4px;">' +
            '<span style="width:7px;height:7px;border-radius:50%;background:#22c55e;display:inline-block;"></span>En línea' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div style="padding:6px 0;">' +
        '<div class="pm-item" style="padding:8px 16px;font-size:.82rem;cursor:pointer;" onclick="auraNav(\'settings.html\')">Configuración</div>' +
        '<div style="height:1px;background:rgba(255,255,255,.07);margin:6px 0;"></div>' +
        '<div class="pm-item" style="padding:8px 16px;font-size:.82rem;cursor:pointer;color:#f87171;" onclick="auraLogout()">Cerrar sesión</div>' +
      '</div>';
    document.body.appendChild(menu);
  }

  /* ─── INYECTAR photoInput si no existe ──────────────────────────────────── */
  if (!document.getElementById('photoInput')) {
    var inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = 'image/*';
    inp.id = 'photoInput';
    inp.style.display = 'none';
    inp.addEventListener('change', function() {
      if (!inp.files[0]) return;
      var reader = new FileReader();
      reader.onload = function(ev) {
        var src = ev.target.result;
        _applyAvatar(src);
        try { localStorage.setItem('aura_profile_photo', src); } catch(e) {}
        if (window._aura) window._aura.uploadAvatar(inp.files[0]);
      };
      reader.readAsDataURL(inp.files[0]);
    });
    document.body.appendChild(inp);
  }

  /* ─── FUNCIONES GLOBALES DE PERFIL ──────────────────────────────────────── */

  window.toggleProfileMenu = function(e) {
    if (e) e.stopPropagation();
    var m = document.getElementById('profileMenu');
    if (!m) return;
    if (m.style.display === 'none' || !m.style.display) {
      var rect = (e && e.currentTarget) ? e.currentTarget.getBoundingClientRect() : {bottom: 60, right: 80};
      m.style.display = 'block';
      m.style.right   = '70px';
      m.style.top     = (rect.bottom + 8) + 'px';
    } else {
      m.style.display = 'none';
    }
  };

  window.triggerPhotoUpload = function() {
    var inp = document.getElementById('photoInput');
    if (inp) inp.click();
  };

  window._applyAvatar = function(src) {
    ['tbAvatar', 'srProfile', 'pmAvatar', '_aura-nav-avatar'].forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (src && src.startsWith('data:')) {
        el.innerHTML = '<img src="' + src + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
      } else if (src) {
        el.innerHTML = '<img src="' + src + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
      }
    });
  };

  window.cerrarSesion = function() {
    if (window.auraLogout) {
      window.auraLogout();
    } else {
      try { if (window._aura && window._aura.sb) window._aura.sb.auth.signOut(); } catch(e) {}
      window.location.href = 'login.html';
    }
  };

  /* ─── CERRAR AL CLICK FUERA ──────────────────────────────────────────────── */
  document.addEventListener('click', function() {
    var m = document.getElementById('profileMenu');
    if (m) m.style.display = 'none';
  });

  /* ─── RELLENAR PERFIL cuando _aura esté listo ───────────────────────────── */
  var _attempts = 0;
  function _fillProfile() {
    var p = window._aura && window._aura.profile;
    if (!p) {
      if (++_attempts < 40) setTimeout(_fillProfile, 300);
      return;
    }
    var nombre   = p.nombre || p.name || p.email || '—';
    var initials = nombre.split(' ').map(function(w){ return w[0]; }).join('').toUpperCase().slice(0,2) || '?';
    var foto     = p.foto_url || null;

    // pmName
    var pmN = document.getElementById('pmName');
    if (pmN) pmN.textContent = nombre;

    // pmAvatar
    var pmA = document.getElementById('pmAvatar');
    if (pmA) {
      if (foto) {
        pmA.innerHTML = '<img src="' + foto + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
      } else {
        pmA.textContent = initials;
      }
    }

    // pmUserName (compatibilidad con pages antiguas)
    var pmUN = document.getElementById('pmUserName');
    if (pmUN) pmUN.textContent = nombre;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _fillProfile);
  } else {
    _fillProfile();
  }

})();

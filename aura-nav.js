// ── aura-nav.js — sidebar de navegación compartido ──────────────────────────
// Inyecta el sidebar izquierdo + perfil mini en todas las páginas de Aura.
// Uso: agregar <nav id="aura-nav-left"></nav> donde va el sidebar, luego
//      cargar este script después de aura-supabase.js.
// ─────────────────────────────────────────────────────────────────────────────
(function () {
  'use strict';

  /* ── Items de navegación ─────────────────────────── */
  var NAV_ITEMS = [
    {
      id: 'home', lbl: 'Home', href: 'home.html',
      match: ['home.html'],
      svg: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'
    },
    {
      id: 'dashboard', lbl: 'Dashboard', href: 'dashboard.html',
      match: ['dashboard.html'],
      svg: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'
    },
    {
      id: 'ranking', lbl: 'Ranking', href: null,
      match: ['ranking.html'],
      svg: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>'
    },
    {
      id: 'examen', lbl: 'Examen', href: 'examen-ascenso.html',
      match: ['examen-ascenso.html'],
      svg: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
    },
    {
      id: 'comunidad', lbl: 'Comunidad', href: null,
      match: ['comunidad.html'],
      svg: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>'
    },
    {
      id: 'tienda', lbl: 'Tienda', href: 'tienda.html',
      match: ['tienda.html'],
      svg: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>'
    }
  ];

  var CFG_ITEM = {
    id: 'settings', lbl: 'Configuración', href: 'settings.html',
    match: ['settings.html'],
    svg: '<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>'
  };

  /* ── Página activa ───────────────────────────────── */
  function getActiveId() {
    var path = window.location.href;
    var all = NAV_ITEMS.concat([CFG_ITEM]);
    for (var i = 0; i < all.length; i++) {
      for (var j = 0; j < all[i].match.length; j++) {
        if (path.indexOf(all[i].match[j]) !== -1) return all[i].id;
      }
    }
    return null;
  }

  /* ── CSS ─────────────────────────────────────────── */
  function injectCSS() {
    if (document.getElementById('_an-css')) return;
    var s = document.createElement('style');
    s.id = '_an-css';
    s.textContent = [
      '#aura-nav-left,._an-nav{',
        'width:54px;flex-shrink:0;',
        'background:rgba(23,23,23,.58);',
        'backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);',
        'border:1px solid rgba(255,255,255,.07);',
        'border-radius:var(--r,18px);',
        'display:flex;flex-direction:column;align-items:center;',
        'padding:16px 0;gap:6px;',
        'transition:width .28s cubic-bezier(.4,0,.2,1);overflow:hidden;',
      '}',
      '._an-nav:hover{width:190px;box-shadow:4px 0 32px rgba(0,0,0,.45);}',
      '._an-logo{',
        'width:34px;height:34px;',
        'display:flex;align-items:center;justify-content:center;',
        'color:var(--accent,#c4ff3d);',
        'font-family:"Airstrike",ui-monospace,monospace;',
        'font-size:1.4rem;line-height:1;margin-bottom:10px;',
        'text-shadow:0 0 10px rgba(196,255,61,.4);',
        'flex-shrink:0;cursor:pointer;',
      '}',
      '._an-btn{',
        'width:38px;height:38px;border-radius:10px;',
        'display:flex;align-items:center;justify-content:center;',
        'color:var(--muted,#7a7a7a);',
        'transition:all .15s;cursor:pointer;',
        'background:none;border:none;font:inherit;',
        'flex-shrink:0;gap:0;padding:0;',
      '}',
      '._an-nav:hover ._an-btn{',
        'width:162px;padding:0 12px;',
        'justify-content:flex-start;gap:12px;',
      '}',
      '._an-btn:hover{color:var(--ink,#f5f5f5);background:rgba(255,255,255,.04);}',
      '._an-btn.active{color:var(--accent-ink,#0c0c0c);background:var(--accent,#c4ff3d);}',
      '._an-btn svg{',
        'width:17px;height:17px;stroke:currentColor;fill:none;',
        'stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;',
        'flex-shrink:0;',
      '}',
      '._an-lbl{',
        'font-family:var(--sans,"Plus Jakarta Sans",-apple-system,sans-serif);',
        'font-size:13px;font-weight:600;',
        'white-space:nowrap;opacity:0;width:0;overflow:hidden;',
        'transition:opacity .2s,width .2s;',
      '}',
      '._an-nav:hover ._an-lbl{opacity:1;width:auto;}',
      '._an-spacer{flex:1;}',
      '._an-divider{',
        'width:30px;height:1px;',
        'background:rgba(255,255,255,.07);',
        'flex-shrink:0;margin:2px 0;',
      '}',
      /* Profile mini-card */
      '._an-profile{',
        'display:flex;align-items:center;gap:10px;',
        'padding:0;width:38px;',
        'overflow:hidden;cursor:pointer;flex-shrink:0;',
        'border-radius:10px;transition:all .28s cubic-bezier(.4,0,.2,1);',
        'background:none;border:none;font:inherit;',
      '}',
      '._an-nav:hover ._an-profile{',
        'width:162px;padding:6px 12px;',
        'background:rgba(255,255,255,.03);',
      '}',
      '._an-nav:hover ._an-profile:hover{background:rgba(255,255,255,.06);}',
      '._an-avatar{',
        'width:30px;height:30px;border-radius:50%;',
        'background:linear-gradient(135deg,#c4ff3d,#7a9d1f);',
        'color:#0c0c0c;',
        'display:flex;align-items:center;justify-content:center;',
        'font-weight:800;font-size:11px;',
        'flex-shrink:0;overflow:hidden;',
        'border:2px solid rgba(196,255,61,.25);',
      '}',
      '._an-avatar img{width:100%;height:100%;object-fit:cover;border-radius:50%;}',
      '._an-pmeta{',
        'display:flex;flex-direction:column;gap:1px;',
        'opacity:0;width:0;overflow:hidden;',
        'transition:opacity .2s,width .2s;',
        'white-space:nowrap;text-align:left;',
      '}',
      '._an-nav:hover ._an-pmeta{opacity:1;width:auto;}',
      '._an-pname{',
        'font-size:12px;font-weight:700;',
        'color:var(--ink,#f5f5f5);',
        'font-family:var(--sans,"Plus Jakarta Sans",-apple-system,sans-serif);',
      '}',
      '._an-plevel{',
        'font-size:9px;color:var(--accent,#c4ff3d);',
        'font-family:var(--mono,"JetBrains Mono",ui-monospace,monospace);',
        'font-weight:700;letter-spacing:.04em;',
      '}'
    ].join('');
    document.head.appendChild(s);
  }

  /* ── Construir sidebar ───────────────────────────── */
  function buildNav() {
    var activeId = getActiveId();

    var nav = document.createElement('nav');
    nav.className = '_an-nav';
    nav.id = 'leftSidebar';

    /* Logo */
    var logo = document.createElement('div');
    logo.className = '_an-logo';
    logo.textContent = 'A';
    logo.title = 'AURA Languages';
    logo.onclick = function () { window.location.href = 'home.html'; };
    nav.appendChild(logo);

    /* Items principales */
    NAV_ITEMS.forEach(function (item) {
      var btn = document.createElement('button');
      btn.className = '_an-btn' + (activeId === item.id ? ' active' : '');
      btn.title = item.lbl;
      btn.innerHTML = '<svg viewBox="0 0 24 24">' + item.svg + '</svg>'
        + '<span class="_an-lbl">' + item.lbl + '</span>';
      if (item.href) {
        btn.onclick = function () { window.location.href = item.href; };
      }
      nav.appendChild(btn);
    });

    /* Spacer */
    var spacer = document.createElement('div');
    spacer.className = '_an-spacer';
    nav.appendChild(spacer);

    /* Mini perfil */
    var profile = document.createElement('button');
    profile.className = '_an-profile';
    profile.id = '_an-profile-wrap';
    profile.title = 'Mi perfil';
    profile.onclick = function () { window.location.href = 'settings.html'; };
    profile.innerHTML =
      '<div class="_an-avatar" id="_an-avatar">?</div>'
      + '<div class="_an-pmeta">'
      + '<span class="_an-pname" id="_an-pname">Perfil</span>'
      + '<span class="_an-plevel" id="_an-plevel">Lv 1</span>'
      + '</div>';
    nav.appendChild(profile);

    /* Divisor */
    var divider = document.createElement('div');
    divider.className = '_an-divider';
    nav.appendChild(divider);

    /* Configuración */
    var cfg = document.createElement('button');
    cfg.className = '_an-btn' + (activeId === 'settings' ? ' active' : '');
    cfg.title = CFG_ITEM.lbl;
    cfg.innerHTML = '<svg viewBox="0 0 24 24">' + CFG_ITEM.svg + '</svg>'
      + '<span class="_an-lbl">' + CFG_ITEM.lbl + '</span>';
    cfg.onclick = function () { window.location.href = CFG_ITEM.href; };
    nav.appendChild(cfg);

    return nav;
  }

  /* ── Rellenar datos del perfil ───────────────────── */
  function fillProfile(p) {
    var avatarEl = document.getElementById('_an-avatar');
    var nameEl   = document.getElementById('_an-pname');
    var levelEl  = document.getElementById('_an-plevel');
    if (!avatarEl) return;

    var nombre   = p.nombre || p.name || '?';
    var initials = nombre.trim().split(/\s+/).slice(0, 2)
                         .map(function (w) { return w[0] || ''; })
                         .join('').toUpperCase();

    if (p.foto_url) {
      avatarEl.innerHTML = '<img src="' + p.foto_url + '" alt="' + initials + '">';
    } else {
      avatarEl.textContent = initials || '?';
    }

    if (nameEl) nameEl.textContent = nombre.split(/\s+/)[0] || nombre;

    if (levelEl) {
      var xp    = p.xp    || 0;
      var nivel = Math.max(1, Math.floor(xp / 500) + 1);
      levelEl.textContent = 'Lv ' + nivel;
    }
  }

  /* ── Montar en el placeholder ────────────────────── */
  function mount() {
    injectCSS();
    var placeholder = document.getElementById('aura-nav-left');
    if (placeholder) {
      var nav = buildNav();
      placeholder.parentNode.replaceChild(nav, placeholder);
    }
    pollProfile();
  }

  /* ── Esperar datos del perfil ────────────────────── */
  var _attempts = 0;
  function pollProfile() {
    var p = window._aura && window._aura.profile;
    if (p && p.nombre !== undefined) {
      fillProfile(p);
      return;
    }
    _attempts++;
    if (_attempts < 25) setTimeout(pollProfile, 400);
  }

  /* ── Init ────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

})();

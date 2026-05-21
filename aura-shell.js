/* ============================================================
   aura-shell.js — Shell compartido · Aura Languages v1
   Módulos: [1] Sidebars · [2] Panel de Perfil · [3] Dropdown
   Reemplaza: aura-nav.js + aura-profile-dd.js
   Un solo <script src="aura-shell.js?v=1"> en cada página.
   ============================================================ */
(function () {
  'use strict';

  /* ════════════════════════════════════════════════════════════
     MÓDULO 1 — SIDEBARS (izquierda + derecha)
  ════════════════════════════════════════════════════════════ */

  var NAV_CSS = [
    '.aura-sl{position:fixed!important;left:14px;top:14px;bottom:14px;width:54px;z-index:9999;background:rgba(23,23,23,.55);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.07);border-radius:18px;display:flex;flex-direction:column;align-items:center;padding:16px 0;gap:6px;overflow:hidden;transition:width .3s cubic-bezier(.4,0,.2,1);}',
    '.aura-sl:hover{width:200px!important;box-shadow:6px 0 32px rgba(0,0,0,.65);}',
    '.aura-sl-logo{width:34px;height:34px;display:flex;align-items:center;justify-content:center;color:#c4ff3d;font-family:"Airstrike",monospace;font-size:1.4rem;line-height:1;margin-bottom:14px;text-shadow:0 0 10px rgba(196,255,61,.4);cursor:pointer;flex-shrink:0;}',
    '.aura-sl:hover .aura-sl-logo{width:calc(200px - 24px);justify-content:flex-start;padding:0 14px;}',
    '.aura-sl-btn{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#7a7a7a;transition:all .15s;border:none;background:none;cursor:pointer;font:inherit;flex-shrink:0;}',
    '.aura-sl-btn:hover{color:#f5f5f5;background:rgba(255,255,255,.04);}',
    '.aura-sl-btn.active{color:#0c0c0c;background:#c4ff3d;}',
    '.aura-sl-btn.active svg{stroke:#0c0c0c;}',
    '.aura-sl-btn svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;}',
    '.aura-sl-lbl{font-size:12px;font-weight:600;color:#c8c8c8;white-space:nowrap;opacity:0;max-width:0;overflow:hidden;transition:opacity .2s .05s,max-width .25s;pointer-events:none;display:inline-block;}',
    '.aura-sl:hover .aura-sl-lbl{opacity:1;max-width:140px;}',
    '.aura-sl:hover .aura-sl-btn{width:calc(200px - 24px)!important;height:38px!important;justify-content:flex-start!important;gap:12px!important;padding:0 14px!important;border-radius:10px!important;}',
    '.aura-sl-btn.active .aura-sl-lbl{color:#0c0c0c!important;}',
    '.aura-sl-spacer{flex:1;}',
    '.aura-right-col{position:fixed;right:14px;top:14px;bottom:14px;display:flex;flex-direction:column;align-items:flex-end;gap:14px;z-index:10002;}',
    '.aura-sr{width:54px;background:rgba(23,23,23,.55);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.07);border-radius:18px;display:flex;flex-direction:column;align-items:center;padding:14px 0;gap:6px;overflow:hidden;transition:width .3s cubic-bezier(.4,0,.2,1);}',
    '.aura-sr:hover{width:180px;box-shadow:-6px 0 32px rgba(0,0,0,.65);}',
    '.aura-sr-c{width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.04);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#c8c8c8;transition:all .2s;flex-shrink:0;border:none;cursor:pointer;font:inherit;padding:0;}',
    '.aura-sr:hover .aura-sr-c{width:calc(180px - 24px)!important;height:38px!important;border-radius:10px!important;justify-content:flex-start!important;gap:10px!important;padding:0 12px!important;}',
    '.aura-sr-c:hover{color:#f5f5f5;background:rgba(255,255,255,.04);}',
    '.aura-sr-active{background:#c4ff3d!important;color:#0c0c0c!important;}',
    '.aura-sr-active svg{stroke:#0c0c0c!important;}',
    '.aura-sr-active .aura-sl-lbl{color:#0c0c0c!important;}',
    '.aura-sr-c svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:1.8;flex-shrink:0;}',
    '.aura-sr-lbl{opacity:0;max-width:0;overflow:hidden;transition:opacity .2s .05s,max-width .25s;white-space:nowrap;font-size:12px;font-weight:600;color:#c8c8c8;display:inline-block;pointer-events:none;}',
    '.aura-sr:hover .aura-sr-lbl{opacity:1;max-width:120px;}',
    '.aura-sr-div{width:30px;height:1px;background:rgba(255,255,255,.08);flex-shrink:0;}',
    '.aura-logout{background:rgba(239,68,68,.08)!important;border:1px solid rgba(239,68,68,.22)!important;color:rgba(239,68,68,.8)!important;}',
    '.aura-logout:hover{background:rgba(239,68,68,.18)!important;border-color:rgba(239,68,68,.5)!important;color:#f87171!important;box-shadow:0 0 10px rgba(239,68,68,.2)!important;}'
  ].join('');

  if (!document.getElementById('_aura-nav-css')) {
    var ns = document.createElement('style');
    ns.id = '_aura-nav-css';
    ns.textContent = NAV_CSS;
    document.head.appendChild(ns);
  }

  var href = window.location.href;
  function pageIs(n) { return href.indexOf(n) !== -1; }

  var leftActive = '', rightActive = '';
  if      (pageIs('home.html'))                                  { leftActive = 'home'; }
  else if (pageIs('dashboard.html'))                             { leftActive = 'dashboard'; }
  else if (pageIs('examen-ascenso'))                             { leftActive = 'examen'; rightActive = 'examen'; }
  else if (pageIs('tienda.html'))                                { leftActive = 'tienda'; }
  else if (pageIs('settings.html'))                              { leftActive = 'settings'; }
  if      (pageIs('movies.html') || pageIs('play-movies.html')) { rightActive = 'movies'; }
  else if (pageIs('lyriclab.html'))                              { rightActive = 'lyriclab'; }
  else if (pageIs('flashcards.html'))                            { rightActive = 'flashcards'; }
  else if (pageIs('collocations.html'))                          { rightActive = 'collocations'; }
  else if (pageIs('shadowlab.html'))                             { rightActive = 'shadowlab'; }

  function slBtn(key, label, svg, dest) {
    var a = (leftActive === key) ? ' active' : '';
    var c = dest ? ' onclick="auraNav(\'' + dest + '\')"' : '';
    return '<button class="aura-sl-btn' + a + '"' + c + '>'
      + '<svg viewBox="0 0 24 24" style="flex-shrink:0">' + svg + '</svg>'
      + '<span class="aura-sl-lbl">' + label + '</span></button>';
  }

  function srBtn(key, label, svg, click) {
    var a = (rightActive === key) ? ' aura-sr-active' : '';
    var c = click ? ' onclick="' + click + '"' : '';
    return '<button class="aura-sr-c' + a + '"' + c + ' title="' + label + '">'
      + '<svg viewBox="0 0 24 24" style="flex-shrink:0">' + svg + '</svg>'
      + '<span class="aura-sr-lbl">' + label + '</span></button>';
  }

  // Eliminar elementos de navegación anteriores si existen
  var _old;
  _old = document.querySelector('nav.aura-sl, nav#leftSidebar, nav.sl');
  if (_old) _old.parentNode.removeChild(_old);
  _old = document.querySelector('aside.aura-right-col, aside.right-col');
  if (_old) _old.parentNode.removeChild(_old);

  var D = {
    home:    '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    dash:    '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    ranking: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M18 2H6v7a6 6 0 0 0 12 0V2z"/>',
    examen:  '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
    comuni:  '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
    tienda:  '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    config:  '<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>',
    movies:  '<rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/>',
    lyric:   '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    flash:   '<rect x="1" y="7" width="19" height="13" rx="2"/><path d="M4 5V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-2"/>',
    colloc:  '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    social:  '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
    logout:  '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    chat:    '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    teacher: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    friend:  '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>'
  };

  var nav = document.createElement('nav');
  nav.className = 'aura-sl';
  nav.id = 'leftSidebar';
  nav.innerHTML =
    '<div class="aura-sl-logo" onclick="auraNav(\'home.html\')">A</div>' +
    slBtn('home',      'Home',      D.home,    'home.html') +
    slBtn('dashboard', 'Dashboard', D.dash,    'dashboard.html') +
    slBtn('ranking',   'Ranking',   D.ranking, '') +
    slBtn('examen',    'Examen',    D.examen,  'examen-ascenso.html') +
    slBtn('comunidad', 'Comunidad', D.comuni,  '') +
    slBtn('tienda',    'Tienda',    D.tienda,  'tienda.html') +
    '<div class="aura-sl-spacer"></div>' +
    slBtn('settings',  'Config',    D.config,  null);
  document.body.appendChild(nav);

  // Asignar onclick al botón de settings en tiempo de click para chequear rol admin
  var _settBtn = nav.querySelector('.aura-sl-btn');
  // Buscamos el último botón (settings es el último del sidebar izquierdo)
  var _allSlBtns = nav.querySelectorAll('.aura-sl-btn');
  var _cfgBtn = _allSlBtns[_allSlBtns.length - 1]; // último = Config/Settings
  if (_cfgBtn) {
    _cfgBtn.onclick = function () {
      var role = (window._aura && window._aura.profile && window._aura.profile.role) || '';
      window.location.href = (role === 'admin') ? 'admin.html' : 'settings.html';
    };
  }

  var srTopHTML =
    srBtn('movies',       'Movies',       D.movies,  "auraNav('movies.html')") +
    srBtn('lyriclab',     'LyricLab',     D.lyric,   "auraNav('lyriclab.html')") +
    srBtn('flashcards',   'Flashcards',   D.flash,   "auraNav('flashcards.html')") +
    srBtn('collocations', 'Collocations', D.colloc,  "auraNav('collocations.html')") +
    srBtn('social',       'Social',       D.social,  '') +
    '<div class="aura-sr-div"></div>' +
    '<button class="aura-sr-c aura-logout" onclick="auraLogout()" title="Logout">' +
    '<svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0">' +
    D.logout + '</svg><span class="aura-sr-lbl">Cerrar sesion</span></button>';

  var srBotHTML =
    srBtn('--', 'Chat',    D.chat,    '') +
    srBtn('--', 'Teacher', D.teacher, '') +
    srBtn('--', 'Amigos',  D.friend,  'if(window.openAuraFriends)openAuraFriends()');

  var srTop = document.createElement('div');
  srTop.className = 'aura-sr';
  srTop.style.flex = '1';
  srTop.innerHTML = srTopHTML;

  var srBot = document.createElement('div');
  srBot.className = 'aura-sr';
  srBot.innerHTML = srBotHTML;

  var aside = document.createElement('aside');
  aside.className = 'aura-right-col';
  aside.appendChild(srTop);
  aside.appendChild(srBot);
  document.body.appendChild(aside);

  // Reservar espacio en el topbar para el panel de perfil fijo (right:82px, ~165px ancho)
  // Se aplica siempre, independiente del padding del body.
  (function () {
    var bp = parseInt(window.getComputedStyle(document.body).paddingRight || '0', 10);
    // El panel ocupa hasta ≈247px desde el borde derecho del viewport.
    // El topbar termina en (viewport - bp). Para no solapar: padding-right >= 247 - bp + 20px gap
    var needed = Math.max(247 - bp + 20, 160);
    if (!document.getElementById('_aura-topbar-fix')) {
      var fix = document.createElement('style');
      fix.id = '_aura-topbar-fix';
      fix.textContent = '.topbar{padding-right:' + needed + 'px!important;}';
      document.head.appendChild(fix);
    }
  })();

  /* ════════════════════════════════════════════════════════════
     MÓDULO 2 — PANEL DE PERFIL (trigger fijo superior derecho)
  ════════════════════════════════════════════════════════════ */

  var TB_CSS = [
    '#tbProfileBtn.aura-tb-trigger{position:fixed;top:14px;right:82px;z-index:10001;display:flex;align-items:center;gap:10px;background:rgba(23,23,23,.85);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.07);padding:5px 14px 5px 5px;border-radius:999px;cursor:pointer;user-select:none;transition:background .15s,border-color .15s;}',
    '#tbProfileBtn.aura-tb-trigger:hover{background:rgba(35,35,35,.95);border-color:rgba(255,255,255,.14);}',
    '#tbProfileBtn.aura-tb-trigger .aura-tb-av{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#c4ff3d,#7a9d1f);color:#0c0c0c;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex-shrink:0;overflow:hidden;}',
    '#tbProfileBtn.aura-tb-trigger .aura-tb-av img{width:100%;height:100%;object-fit:cover;border-radius:50%;}',
    '#tbProfileBtn.aura-tb-trigger .aura-tb-name{display:flex;flex-direction:column;line-height:1.25;}',
    '#tbProfileBtn.aura-tb-trigger .aura-tb-name b{font-size:13px;font-weight:700;color:#f5f5f5;white-space:nowrap;}',
    '#tbProfileBtn.aura-tb-trigger .aura-tb-name span{font-size:10px;color:#c4ff3d;font-family:monospace;white-space:nowrap;}',
    '#tbProfileBtn.aura-tb-trigger .aura-tb-caret{color:#7a7a7a;font-size:10px;margin-left:2px;transition:transform .2s;flex-shrink:0;}'
  ].join('');

  if (!document.getElementById('_aura-tb-css')) {
    var tbs = document.createElement('style');
    tbs.id = '_aura-tb-css';
    tbs.textContent = TB_CSS;
    document.head.appendChild(tbs);
  }

  // Eliminar triggers anteriores del DOM (hardcodeados en los HTML)
  ['tbDropdown', 'profileMenu', 'c1Pdd'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.parentNode.removeChild(el);
  });
  var _oldTrigger = document.getElementById('tbProfileBtn');
  if (_oldTrigger) _oldTrigger.parentNode.removeChild(_oldTrigger);
  var _oldTb = document.querySelector('.tb-profile');
  if (_oldTb) _oldTb.parentNode.removeChild(_oldTb);

  // Inyectar el trigger fijo unificado
  // IDs estándar compatibles con aura-supabase.js:
  //   #tbAvatar   → avatar (setAvatar)
  //   .tb-name b  → nombre (querySelector)
  //   .tb-name span → nivel/rango (querySelector)
  //   #tbCaret    → flecha del dropdown
  var tbTrigger = document.createElement('div');
  tbTrigger.id = 'tbProfileBtn';
  tbTrigger.className = 'aura-tb-trigger';
  tbTrigger.innerHTML =
    '<div class="aura-tb-av tb-avatar" id="tbAvatar"></div>' +
    '<div class="aura-tb-name tb-name"><b>—</b><span>— · —</span></div>' +
    '<span class="aura-tb-caret tb-caret" id="tbCaret">▾</span>';
  document.body.appendChild(tbTrigger);

  // Alinear verticalmente el panel con el topbar real de cada página
  function _auraAlignPanel() {
    requestAnimationFrame(function () {
      var tb = document.querySelector('.topbar');
      if (!tb) return;
      var rect   = tb.getBoundingClientRect();
      if (rect.height === 0) return; // layout aún no disponible
      var panelH = tbTrigger.offsetHeight || 44;
      var top    = Math.round(rect.top + (rect.height - panelH) / 2);
      tbTrigger.style.top = Math.max(top, 6) + 'px';
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _auraAlignPanel);
  } else {
    _auraAlignPanel();
  }

  /* ════════════════════════════════════════════════════════════
     MÓDULO 3 — DROPDOWN DE PERFIL
  ════════════════════════════════════════════════════════════ */

  var DD_CSS = [':root{--accent-rgb:196,255,61}',
    '.aura-dd-wrap{position:fixed;width:310px;z-index:10003;display:none;',
    'filter:drop-shadow(0 24px 48px rgba(0,0,0,.8));animation:aura-dd-in .16s ease-out}',
    '@keyframes aura-dd-in{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}',
    '.aura-dd-wrap.open{display:block}',
    '.aura-dd-wrap::before{content:"";position:absolute;top:-6px;right:28px;width:12px;height:12px;',
    'background:var(--card,#171717);border-left:1px solid var(--line,#262626);',
    'border-top:1px solid var(--line,#262626);transform:rotate(45deg);z-index:1}',
    '.aura-dd{background:var(--card,#171717);border:1px solid var(--line,#262626);border-radius:16px;',
    'padding:14px;display:flex;flex-direction:column;gap:11px;position:relative;overflow:hidden}',
    '.aura-dd::before{content:"";position:absolute;inset:0;pointer-events:none;',
    'background:radial-gradient(180px 120px at 100% 0%,rgba(var(--accent-rgb),.05),transparent 60%)}',
    '.aura-dd>*{position:relative}',
    '.aura-dd-head{display:flex;align-items:center;gap:11px}',
    '.aura-dd-av{position:relative;width:50px;height:50px;border-radius:50%;',
    'background:linear-gradient(135deg,var(--accent,#c4ff3d),var(--accent-d,#a8e02f));flex-shrink:0;overflow:hidden;',
    'border:2px solid rgba(var(--accent-rgb),.35);box-shadow:0 0 18px rgba(var(--accent-rgb),.15);',
    'display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px;',
    'color:var(--accent-ink,#0c0c0c)}',
    '.aura-dd-av-edit{position:absolute;bottom:-2px;right:-2px;width:20px;height:20px;border-radius:50%;',
    'background:var(--accent,#c4ff3d);color:var(--accent-ink,#0c0c0c);',
    'display:flex;align-items:center;justify-content:center;border:2px solid var(--card,#171717);',
    'cursor:pointer;transition:transform .15s;flex-shrink:0}',
    '.aura-dd-av-edit:hover{transform:scale(1.1)}',
    '.aura-dd-av-edit svg{width:9px;height:9px;stroke:currentColor;fill:none;stroke-width:2.2}',
    '.aura-dd-meta{flex:1;display:flex;flex-direction:column;gap:3px;min-width:0}',
    '.aura-dd-meta b{font-size:14px;font-weight:800;color:var(--ink,#f5f5f5);letter-spacing:-.01em;line-height:1.1;',
    'white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.aura-dd-meta-row{display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin-top:2px}',
    '.aura-dd-lv{font-family:var(--mono,monospace);font-size:8.5px;font-weight:800;',
    'color:var(--accent,#c4ff3d);background:rgba(var(--accent-rgb),.12);border:1px solid rgba(var(--accent-rgb),.2);',
    'padding:2px 6px;border-radius:4px;letter-spacing:.08em;text-transform:uppercase}',
    '.aura-dd-rk{font-family:var(--mono,monospace);font-size:8.5px;font-weight:800;',
    'padding:2px 6px;border-radius:4px;letter-spacing:.08em;text-transform:uppercase;',
    'display:flex;align-items:center;gap:3px}',
    '.aura-dd-rk::before{content:"";width:4px;height:4px;border-radius:50%;background:currentColor;',
    'box-shadow:0 0 5px currentColor;flex-shrink:0}',
    '.aura-dd-link{margin-top:3px;font-family:var(--mono,monospace);font-size:9px;',
    'color:var(--muted,#7a7a7a);display:flex;align-items:center;gap:4px;text-decoration:none}',
    '.aura-dd-link:hover{color:var(--accent,#c4ff3d)}',
    '.aura-dd-link svg{width:9px;height:9px;stroke:currentColor;fill:none;stroke-width:2.2}',
    '.aura-dd-pts{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
    '.aura-dd-pt{border:1px solid var(--line,#262626);border-radius:10px;padding:9px 10px;',
    'display:flex;flex-direction:column;gap:4px;overflow:hidden}',
    '.aura-dd-pt.ap{border-color:rgba(var(--accent-rgb),.18);background:rgba(var(--accent-rgb),.04)}',
    '.aura-dd-pt.pm{border-color:rgba(192,132,252,.2);background:rgba(192,132,252,.04)}',
    '.aura-dd-pt-top{display:flex;align-items:center;gap:6px}',
    '.aura-dd-ic{width:19px;height:19px;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0}',
    '.aura-dd-pt.ap .aura-dd-ic{background:var(--accent,#c4ff3d);color:var(--accent-ink,#0c0c0c)}',
    '.aura-dd-pt.pm .aura-dd-ic{background:var(--merit,#c084fc);color:#0c0c0c}',
    '.aura-dd-ic svg{width:10px;height:10px;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
    '.aura-dd-ic.fill svg{fill:currentColor;stroke:none}',
    '.aura-dd-pt-nm{font-family:var(--mono,monospace);font-size:8px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}',
    '.aura-dd-pt.ap .aura-dd-pt-nm{color:var(--accent,#c4ff3d)}',
    '.aura-dd-pt.pm .aura-dd-pt-nm{color:var(--merit,#c084fc)}',
    '.aura-dd-pt-val{font-size:18px;font-weight:800;color:var(--ink,#f5f5f5);letter-spacing:-.02em;line-height:1;font-feature-settings:"tnum"}',
    '.aura-dd-pt-dl{font-family:var(--mono,monospace);font-size:8.5px;color:var(--muted,#7a7a7a)}',
    '.aura-dd-pt-dl b{color:var(--ink,#f5f5f5);font-weight:700}',
    '.aura-dd-sh{display:flex;align-items:center;justify-content:space-between}',
    '.aura-dd-sh span{font-family:var(--mono,monospace);font-size:8.5px;font-weight:800;',
    'letter-spacing:.16em;text-transform:uppercase;color:var(--muted,#7a7a7a)}',
    '.aura-dd-sh b{font-family:var(--mono,monospace);font-size:9px;color:var(--accent,#c4ff3d);font-weight:700}',
    '.aura-dd-langs{display:flex;flex-direction:column;gap:4px;background:#0e0e0e;',
    'border:1px solid var(--line,#262626);border-radius:10px;padding:5px}',
    '.aura-dd-lang{display:grid;grid-template-columns:26px 1fr auto auto;gap:9px;',
    'align-items:center;padding:6px 8px;border-radius:7px;cursor:pointer;transition:background .15s;',
    'width:100%;text-align:left;font:inherit;color:inherit;border:none;background:none}',
    '.aura-dd-lang:hover{background:rgba(255,255,255,.04)}',
    '.aura-dd-lang.active{background:rgba(var(--accent-rgb),.08)}',
    '.aura-dd-flag{width:26px;height:18px;border-radius:3px;overflow:hidden;',
    'display:flex;flex-direction:column;box-shadow:0 0 0 1px rgba(255,255,255,.08) inset;',
    'flex-shrink:0;position:relative}',
    '.aura-dd-flag i{flex:1;display:block}',
    '.aura-dd-lang.en .aura-dd-flag{background:#012169}',
    '.aura-dd-lang.en .aura-dd-flag::before{content:"";position:absolute;inset:0;background:',
    'linear-gradient(to bottom right,transparent calc(50% - 1px),#fff calc(50% - 1px),#fff calc(50% + 1px),transparent calc(50% + 1px)),',
    'linear-gradient(to bottom left,transparent calc(50% - 1px),#fff calc(50% - 1px),#fff calc(50% + 1px),transparent calc(50% + 1px))}',
    '.aura-dd-lang.en .aura-dd-flag::after{content:"";position:absolute;inset:0;background:',
    'linear-gradient(to right,transparent calc(50% - 2px),#c8102e calc(50% - 2px),#c8102e calc(50% + 2px),transparent calc(50% + 2px)),',
    'linear-gradient(to bottom,transparent calc(50% - 2px),#c8102e calc(50% - 2px),#c8102e calc(50% + 2px),transparent calc(50% + 2px))}',
    '.aura-dd-lang.fr .aura-dd-flag{flex-direction:row}',
    '.aura-dd-lang.fr .aura-dd-flag i:nth-child(1){background:#0055a4}',
    '.aura-dd-lang.fr .aura-dd-flag i:nth-child(2){background:#fff}',
    '.aura-dd-lang.fr .aura-dd-flag i:nth-child(3){background:#ef4135}',
    '.aura-dd-lang.it .aura-dd-flag{flex-direction:row}',
    '.aura-dd-lang.it .aura-dd-flag i:nth-child(1){background:#008c45}',
    '.aura-dd-lang.it .aura-dd-flag i:nth-child(2){background:#f4f5f0}',
    '.aura-dd-lang.it .aura-dd-flag i:nth-child(3){background:#cd212a}',
    '.aura-dd-lang.es .aura-dd-flag{flex-direction:column}',
    '.aura-dd-lang.es .aura-dd-flag i:nth-child(1){background:#aa151b;flex:1}',
    '.aura-dd-lang.es .aura-dd-flag i:nth-child(2){background:#f1bf00;flex:2}',
    '.aura-dd-lang.es .aura-dd-flag i:nth-child(3){background:#aa151b;flex:1}',
    '.aura-dd-lang.pt .aura-dd-flag{flex-direction:row}',
    '.aura-dd-lang.pt .aura-dd-flag i:nth-child(1){background:#046a38;flex:2;position:relative}',
    '.aura-dd-lang.pt .aura-dd-flag i:nth-child(1)::after{content:"";position:absolute;top:50%;right:-3px;',
    'transform:translateY(-50%);width:5px;height:5px;border-radius:50%;background:#ffc726;box-shadow:0 0 0 1px #fff}',
    '.aura-dd-lang.pt .aura-dd-flag i:nth-child(2){background:#da291c;flex:3}',
    '.aura-dd-lang-name{display:flex;flex-direction:column;gap:1px;min-width:0}',
    '.aura-dd-lang-name b{font-size:12px;font-weight:700;color:var(--ink,#f5f5f5);line-height:1.15}',
    '.aura-dd-lang.active .aura-dd-lang-name b{color:var(--accent,#c4ff3d)}',
    '.aura-dd-lang-name span{font-family:var(--mono,monospace);font-size:8.5px;color:var(--muted,#7a7a7a);letter-spacing:.03em}',
    '.aura-dd-lang-prog{font-family:var(--mono,monospace);font-size:8.5px;color:var(--muted,#7a7a7a);white-space:nowrap}',
    '.aura-dd-lang-prog b{color:var(--ink,#f5f5f5);font-weight:700}',
    '.aura-dd-lang.active .aura-dd-lang-prog b{color:var(--accent,#c4ff3d)}',
    '.aura-dd-chk{width:17px;height:17px;border-radius:50%;border:1.5px solid var(--line-2,#333);',
    'display:flex;align-items:center;justify-content:center;color:transparent;flex-shrink:0;transition:.15s}',
    '.aura-dd-lang.active .aura-dd-chk{background:var(--accent,#c4ff3d);border-color:var(--accent,#c4ff3d);',
    'color:var(--accent-ink,#0c0c0c);box-shadow:0 0 10px rgba(var(--accent-rgb),.4)}',
    '.aura-dd-chk svg{width:9px;height:9px;stroke:currentColor;fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}',
    '.aura-dd-foot{display:flex;flex-direction:column;gap:1px;',
    'border-top:1px solid var(--line,#262626);padding-top:8px;margin-top:1px}',
    '.aura-dd-act{display:flex;align-items:center;gap:9px;padding:7px 8px;border-radius:7px;',
    'font-size:12px;font-weight:600;color:var(--ink-2,#c8c8c8);text-align:left;width:100%;',
    'transition:.15s;cursor:pointer;font:inherit;border:none;background:none}',
    '.aura-dd-act:hover{background:rgba(255,255,255,.04);color:var(--ink,#f5f5f5)}',
    '.aura-dd-act svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:1.8;',
    'stroke-linecap:round;stroke-linejoin:round;flex-shrink:0}',
    '.aura-dd-arr{margin-left:auto;color:var(--muted,#7a7a7a);font-size:10px}',
    '.aura-dd-act.danger{color:#ff8a8a}',
    '.aura-dd-act.danger:hover{background:rgba(255,90,90,.08);color:#ff5a5a}'
  ].join('');

  function _langBtn(code, name, sub, fi) {
    return '<button class="aura-dd-lang ' + code + '" onclick="_auraDdLang(\'' + code + '\')">'
      + '<span class="aura-dd-flag">' + fi + '</span>'
      + '<span class="aura-dd-lang-name"><b>' + name + '</b><span>' + sub + '</span></span>'
      + '<span class="aura-dd-lang-prog" id="auraDdLp' + code.toUpperCase() + '">—</span>'
      + '<span class="aura-dd-chk"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg></span>'
      + '</button>';
  }

  var DD_HTML = '<div class="aura-dd-wrap" id="auraDd"><div class="aura-dd">'
    + '<div class="aura-dd-head">'
    +   '<div class="aura-dd-av" id="auraDdAv">'
    +     '<button class="aura-dd-av-edit" id="auraDdEdit" title="Cambiar foto">'
    +       '<svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>'
    +     '</button>'
    +   '</div>'
    +   '<div class="aura-dd-meta">'
    +     '<b id="auraDdName">—</b>'
    +     '<div class="aura-dd-meta-row">'
    +       '<span class="aura-dd-lv" id="auraDdLv">Lv —</span>'
    +       '<span class="aura-dd-rk" id="auraDdRk">Bronce</span>'
    +     '</div>'
    +     '<a href="settings.html" class="aura-dd-link">ver perfil completo'
    +       '<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
    +     '</a>'
    +   '</div>'
    + '</div>'
    + '<div class="aura-dd-pts">'
    +   '<div class="aura-dd-pt ap">'
    +     '<div class="aura-dd-pt-top"><div class="aura-dd-ic fill"><svg viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg></div>'
    +     '<span class="aura-dd-pt-nm">Aura</span></div>'
    +     '<span class="aura-dd-pt-val" id="auraDdAP">—</span>'
    +     '<span class="aura-dd-pt-dl">▲ <b id="auraDdAPd">+0</b> esta semana</span>'
    +   '</div>'
    +   '<div class="aura-dd-pt pm">'
    +     '<div class="aura-dd-pt-top"><div class="aura-dd-ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"></circle><path d="M9 13l-3 9 6-3 6 3-3-9"></path></svg></div>'
    +     '<span class="aura-dd-pt-nm">Mérito</span></div>'
    +     '<span class="aura-dd-pt-val" id="auraDdPM">—</span>'
    +     '<span class="aura-dd-pt-dl">▲ <b id="auraDdPMd">+0</b> esta semana</span>'
    +   '</div>'
    + '</div>'
    + '<div class="aura-dd-sh"><span>Idioma que aprendo</span><b>5 disponibles</b></div>'
    + '<div class="aura-dd-langs">'
    + _langBtn('en', 'Inglés',    'english · A1-C2', '<i></i>')
    + _langBtn('fr', 'Francés',   'français · A1-B2', '<i></i><i></i><i></i>')
    + _langBtn('it', 'Italiano',  'italiano · A1-B2', '<i></i><i></i><i></i>')
    + _langBtn('es', 'Español',   'nativo · referencia', '<i></i><i></i><i></i>')
    + _langBtn('pt', 'Portugués', 'português · A1-B2', '<i></i><i></i>')
    + '</div>'
    + '<div class="aura-dd-foot">'
    +   '<button class="aura-dd-act" id="auraDdSettings">'
    +     '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"></path></svg>'
    +     'Ajustes de cuenta<span class="aura-dd-arr">›</span>'
    +   '</button>'
    +   '<button class="aura-dd-act">'
    +     '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'
    +     'Ayuda y feedback<span class="aura-dd-arr">›</span>'
    +   '</button>'
    +   '<button class="aura-dd-act danger" id="auraDdOut">'
    +     '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>'
    +     'Cerrar sesión'
    +   '</button>'
    + '</div>'
    + '</div></div>';

  function _ddInit() {
    var dds = document.createElement('style');
    dds.textContent = DD_CSS;
    document.head.appendChild(dds);
    document.body.insertAdjacentHTML('beforeend', DD_HTML);

    var trigger = document.getElementById('tbProfileBtn');
    if (!trigger) return;

    var editBtn = document.getElementById('auraDdEdit');
    if (editBtn) editBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (typeof triggerPhotoUpload === 'function') triggerPhotoUpload();
    });

    var settBtn = document.getElementById('auraDdSettings');
    if (settBtn) settBtn.addEventListener('click', function () {
      window.location.href = 'settings.html';
    });

    var outBtn = document.getElementById('auraDdOut');
    if (outBtn) outBtn.addEventListener('click', function () {
      if (typeof cerrarSesion === 'function') {
        cerrarSesion();
      } else if (window._aura && window._aura.sb) {
        window._aura.sb.auth.signOut().then(function () { window.location.href = 'login.html'; });
      }
    });

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var dd = document.getElementById('auraDd');
      if (!dd) return;
      if (dd.classList.contains('open')) {
        _ddClose();
      } else {
        _ddFill();
        _ddPosition(trigger);
        dd.classList.add('open');
        var caret = document.getElementById('tbCaret');
        if (caret) caret.style.transform = 'rotate(180deg)';
      }
    });

    document.addEventListener('click', function (e) {
      var dd = document.getElementById('auraDd');
      if (dd && !dd.contains(e.target) && !trigger.contains(e.target)) _ddClose();
    });

    var dd = document.getElementById('auraDd');
    if (dd) dd.addEventListener('click', function (e) { e.stopPropagation(); });
  }

  function _ddPosition(trigger) {
    var dd = document.getElementById('auraDd');
    if (!dd) return;
    var rect = trigger.getBoundingClientRect();
    var left = rect.right - 310;
    if (left < 8) left = 8;
    dd.style.top  = (rect.bottom + 10) + 'px';
    dd.style.left = left + 'px';
  }

  function _ddClose() {
    var dd = document.getElementById('auraDd');
    if (dd) dd.classList.remove('open');
    var caret = document.getElementById('tbCaret');
    if (caret) caret.style.transform = '';
  }

  function _ddFill() {
    var aura    = window._aura  || {};
    var profile = aura.profile  || {};

    // Avatar — copia desde #tbAvatar ya poblado por aura-supabase.js
    var srcAv = document.getElementById('tbAvatar');
    var dstAv = document.getElementById('auraDdAv');
    if (srcAv && dstAv) {
      var editBtnEl = dstAv.querySelector('.aura-dd-av-edit');
      dstAv.innerHTML = srcAv.innerHTML;
      var img = dstAv.querySelector('img');
      if (img) img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:50%';
      if (editBtnEl) dstAv.appendChild(editBtnEl);
    }

    // Nombre
    var nombre = profile.nombre || '';
    if (!nombre) {
      var nameEl = document.querySelector('#tbProfileBtn .tb-name b');
      if (nameEl) nombre = nameEl.textContent || '';
    }
    var ddName = document.getElementById('auraDdName');
    if (ddName) ddName.textContent = nombre || '—';

    // Nivel
    var nivel  = profile.nivel || aura.nivel || 1;
    var nivelNum = parseInt(nivel, 10) || 1;
    var ddLv   = document.getElementById('auraDdLv');
    if (ddLv) ddLv.textContent = 'Lv ' + nivelNum;

    // Rango con color dinámico
    var rango  = profile.rango || aura.rango || 'Bronce';
    var RANK_C = {Bronce:'#cd7f32',Plata:'#94a3b8',Oro:'#fbbf24',Platino:'#67e8f9',Diamante:'#818cf8',Challenger:'#c084fc'};
    var ddRk   = document.getElementById('auraDdRk');
    if (ddRk) {
      ddRk.textContent = rango;
      var rc  = RANK_C[rango] || '#cd7f32';
      var hex = rc.replace('#', '');
      var r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
      ddRk.style.color       = rc;
      ddRk.style.background  = 'rgba(' + r + ',' + g + ',' + b + ',.1)';
      ddRk.style.borderColor = 'rgba(' + r + ',' + g + ',' + b + ',.28)';
    }

    // Aura Points
    var ap   = profile.aura_points !== undefined ? profile.aura_points : (aura.aura_points || 0);
    var apEl = document.getElementById('auraDdAP');
    if (apEl) apEl.textContent = Number(ap).toLocaleString('es-CO');

    // Mérito Points
    var pm   = profile.merit_pm !== undefined ? profile.merit_pm : (aura.merit_pm || profile.merit || 0);
    var pmEl = document.getElementById('auraDdPM');
    if (pmEl) pmEl.textContent = Number(pm).toLocaleString('es-CO');

    // Idioma activo
    var _storedLang = null;
    try { _storedLang = localStorage.getItem('aura_lang'); } catch (e) {}
    var activeLang = _storedLang || aura.active_language || profile.active_language || 'en';
    var _rawUnlocked = aura.langsUnlocked || aura.languages_unlocked || profile.languages_unlocked || ['en'];
    var unlocked = Array.isArray(_rawUnlocked) ? _rawUnlocked : (typeof _rawUnlocked === 'string' ? _rawUnlocked.split(',') : ['en']);

    ['en', 'fr', 'it', 'es', 'pt'].forEach(function (code) {
      var row = document.querySelector('.aura-dd-lang.' + code);
      if (!row) return;
      var isActive   = activeLang === code;
      var isUnlocked = unlocked.indexOf(code) >= 0 || code === 'es';
      row.classList.toggle('active', isActive);
      var isAdmin = (aura && aura.profile && aura.profile.role === 'admin');
      row.style.opacity = (isUnlocked || isAdmin) ? '1' : '0.45';

      var progEl = document.getElementById('auraDdLp' + code.toUpperCase());
      if (!progEl) return;
      if (code === 'es') {
        progEl.textContent = 'nativo';
      } else if (!isUnlocked) {
        progEl.textContent = 'empezar →';
      } else if (isActive) {
        var map = {1:'A1',2:'A2',3:'A2',4:'B1',5:'B1',6:'B2',7:'B2',8:'C1',9:'C1',10:'C2'};
        progEl.innerHTML = '<b>' + (map[nivelNum] || 'A1') + '</b>';
      } else {
        progEl.textContent = '→';
      }
    });
  }

  window._auraDdFill = _ddFill;

  window._auraDdLang = function (code) {
    var aura     = window._aura;
    var profile  = (aura && aura.profile) || {};
    var unlocked = (aura && (aura.langsUnlocked || aura.languages_unlocked)) || profile.languages_unlocked || ['en'];
    var isAdmin  = (aura && aura.profile && aura.profile.role === 'admin');
    if (!isAdmin && code !== 'es' && unlocked.indexOf(code) < 0) return;
    if (aura) {
      aura.lang            = code;
      aura.active_language = code;
      if (profile) profile.active_language = code;
      try { localStorage.setItem('aura_lang', code); } catch (e) {}
      try {
        var sb = aura._sb || aura.sb;
        if (sb && aura.userId) {
          sb.from('profiles').update({active_language: code}).eq('id', aura.userId).then(function () {
            window.location.reload();
          });
        } else {
          window.location.reload();
        }
      } catch (e) { window.location.reload(); }
      return;
    }
    _ddFill();
    _ddClose();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _ddInit);
  } else {
    _ddInit();
  }

  /* ════════════════════════════════════════════════════════════
     GLOBALS — funciones disponibles en todas las páginas
  ════════════════════════════════════════════════════════════ */

  window.auraNav = function (dest) { window.location.href = dest; };

  window.auraLogout = function () {
    try { if (window._aura && window._aura.sb) { window._aura.sb.auth.signOut(); } } catch (ignore) {}
    try { localStorage.clear(); sessionStorage.clear(); } catch (ignore) {}
    window.location.href = 'login.html';
  };

  window.cerrarSesion = window.cerrarSesion || function () {
    if (window.auraLogout) { window.auraLogout(); }
  };

  window.openAuraChat = window.openAuraChat || function () {
    if (window._auraFriendsOpen) { window._auraFriendsOpen(); }
  };

  window.openAuraFriends = window.openAuraFriends || function () {
    if (window._auraFriendsOpen) { window._auraFriendsOpen(); }
  };

  // Compatibilidad: toggleProfileMenu ya no se usa (el shell maneja el click)
  window.toggleProfileMenu = window.toggleProfileMenu || function () {};

})();

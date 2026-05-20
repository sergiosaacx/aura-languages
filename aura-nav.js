(function() {
  'use strict';

  /* ─── CSS ─────────────────────────────────────────────────────────────── */
  var CSS = `
.aura-sl{position:fixed;left:14px;top:14px;bottom:14px;width:54px;z-index:9999;background:rgba(23,23,23,0.55);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.07);border-radius:18px;display:flex;flex-direction:column;align-items:center;padding:16px 0;gap:6px;overflow:hidden;transition:width .3s cubic-bezier(.4,0,.2,1);}
.aura-sl:hover{width:200px;box-shadow:6px 0 32px rgba(0,0,0,.65);}
.aura-sl-logo{width:34px;height:34px;display:flex;align-items:center;justify-content:center;color:#c4ff3d;font-family:'Airstrike',monospace;font-size:1.4rem;font-weight:900;margin-bottom:14px;text-shadow:0 0 10px rgba(196,255,61,.4);cursor:pointer;flex-shrink:0;}
.aura-sl:hover .aura-sl-logo{width:calc(200px - 24px);justify-content:flex-start;padding:0 14px;}
.aura-sl-btn{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#7a7a7a;transition:all .15s;border:none;background:none;cursor:pointer;font:inherit;flex-shrink:0;gap:0;padding:0;}
.aura-sl-btn:hover{color:#f5f5f5;background:rgba(255,255,255,.04);}
.aura-sl-btn.active{color:#0c0c0c;background:#c4ff3d;}
.aura-sl-btn.active svg{stroke:#0c0c0c;}
.aura-sl-btn svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;}
.aura-sl-lbl{font-size:12px;font-weight:600;color:#c8c8c8;white-space:nowrap;opacity:0;max-width:0;overflow:hidden;transition:opacity .2s .05s,max-width .25s;pointer-events:none;display:inline-block;}
.aura-sl:hover .aura-sl-lbl{opacity:1;max-width:140px;}
.aura-sl:hover .aura-sl-btn{width:calc(200px - 24px)!important;height:38px!important;justify-content:flex-start!important;gap:12px!important;padding:0 14px!important;border-radius:10px!important;}
.aura-sl-btn.active .aura-sl-lbl{color:#0c0c0c!important;}
.aura-sl-spacer{flex:1;}
.aura-right-col{position:fixed;right:14px;top:14px;bottom:14px;display:flex;flex-direction:column;gap:14px;z-index:9999;}
.aura-sr{width:54px;background:rgba(23,23,23,0.55);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.07);border-radius:18px;display:flex;flex-direction:column;align-items:center;padding:14px 0;gap:6px;overflow:hidden;transition:width .3s cubic-bezier(.4,0,.2,1);}
.aura-sr:hover{width:180px;box-shadow:-6px 0 32px rgba(0,0,0,.65);}
.aura-sr-c{width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.04);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#c8c8c8;transition:all .2s;flex-shrink:0;border:none;cursor:pointer;font:inherit;padding:0;}
.aura-sr:hover .aura-sr-c{width:calc(180px - 24px)!important;height:38px!important;border-radius:10px!important;justify-content:flex-start!important;gap:10px!important;padding:0 12px!important;}
.aura-sr-c:hover{color:#f5f5f5;background:rgba(255,255,255,.08);}
.aura-sr-active{background:#c4ff3d!important;color:#0c0c0c!important;}
.aura-sr-active svg{stroke:#0c0c0c!important;}
.aura-sr-active .aura-sr-lbl{color:#0c0c0c!important;}
.aura-sr-c svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:1.8;}
.aura-sr-lbl{opacity:0;max-width:0;overflow:hidden;transition:opacity .2s .05s,max-width .25s;white-space:nowrap;font-size:12px;font-weight:600;color:#c8c8c8;display:inline-block;pointer-events:none;}
.aura-sr:hover .aura-sr-lbl{opacity:1;max-width:120px;}
.aura-sr-div{width:30px;height:1px;background:rgba(255,255,255,.08);flex-shrink:0;}
.aura-logout{background:rgba(239,68,68,.08)!important;border:1px solid rgba(239,68,68,.22)!important;color:rgba(239,68,68,.8)!important;}
.aura-logout:hover{background:rgba(239,68,68,.18)!important;border-color:rgba(239,68,68,.5)!important;color:#f87171!important;}
`;

  /* ─── INJECT CSS ──────────────────────────────────────────────────────── */
  if (!document.getElementById('_aura-nav-css')) {
    var style = document.createElement('style');
    style.id = '_aura-nav-css';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  /* ─── ACTIVE PAGE DETECTION ──────────────────────────────────────────── */
  var href = window.location.href;
  function pageIs(name) {
    return href.indexOf(name) !== -1;
  }

  var leftActive = '';
  var rightActive = '';

  if (pageIs('home.html'))            { leftActive = 'home'; }
  else if (pageIs('dashboard.html'))  { leftActive = 'dashboard'; }
  else if (pageIs('examen-ascenso'))  { leftActive = 'examen'; rightActive = 'examen'; }
  else if (pageIs('tienda.html'))     { leftActive = 'tienda'; }
  else if (pageIs('settings.html'))   { leftActive = 'settings'; }

  if (pageIs('movies.html') || pageIs('play-movies.html')) { rightActive = 'movies'; }
  else if (pageIs('lyriclab.html'))      { rightActive = 'lyriclab'; }
  else if (pageIs('flashcards.html'))    { rightActive = 'flashcards'; }
  else if (pageIs('collocations.html'))  { rightActive = 'collocations'; }
  else if (pageIs('shadowlab.html'))     { rightActive = 'shadowlab'; }

  /* ─── HELPERS ────────────────────────────────────────────────────────── */
  function slBtn(id, label, svgContent, href, activeKey) {
    var isActive = (leftActive === activeKey) ? ' active' : '';
    var onclick = href ? ' onclick="window.location.href=\'' + href + '\'"' : '';
    return '<button class="aura-sl-btn' + isActive + '"' + onclick + ' data-nav="' + id + '">' +
           '<svg viewBox="0 0 24 24" style="flex-shrink:0">' + svgContent + '</svg>' +
           '<span class="aura-sl-lbl">' + label + '</span>' +
           '</button>';
  }

  function srBtn(id, label, svgContent, onclick, activeKey) {
    var isActive = (rightActive === activeKey) ? ' aura-sr-active' : '';
    var onclickAttr = onclick ? ' onclick="' + onclick + '"' : '';
    return '<button class="aura-sr-c' + isActive + '"' + onclickAttr + ' title="' + label + '">' +
           '<svg viewBox="0 0 24 24" style="flex-shrink:0">' + svgContent + '</svg>' +
           '<span class="aura-sr-lbl">' + label + '</span>' +
           '</button>';
  }

  /* ─── REMOVE EXISTING NAV ────────────────────────────────────────────── */
  var oldLeft = document.querySelector('nav.aura-sl, nav#leftSidebar');
  if (oldLeft) oldLeft.parentNode.removeChild(oldLeft);
  var oldRight = document.querySelector('aside.aura-right-col');
  if (oldRight) oldRight.parentNode.removeChild(oldRight);

  /* ─── BUILD LEFT SIDEBAR ─────────────────────────────────────────────── */
  var leftHTML = '<div class="aura-sl-logo" onclick="window.location.href=\'home.html\'">A</div>' +
    slBtn('home',      'Home',          'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',                                                  'home.html',          'home') +
    slBtn('dashboard', 'Dashboard',     '<rect x=3 y=3 width=7 height=7/><rect x=14 y=3 width=7 height=7/><rect x=3 y=14 width=7 height=7/><rect x=14 y=14 width=7 height=7/>', 'dashboard.html', 'dashboard') +
    slBtn('ranking',   'Ranking',       'M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M18 2H6v7a6 6 0 0 0 12 0V2z', '',                   'ranking') +
    slBtn('examen',    'Examen',        'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',   'examen-ascenso.html','examen') +
    slBtn('comunidad', 'Comunidad',     'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8',                     '',                   'comunidad') +
    slBtn('tienda',    'Tienda',        'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0',                 'tienda.html',        'tienda') +
    '<div class="aura-sl-spacer"></div>' +
    slBtn('settings', 'Configuración', '<circle cx=12 cy=12 r=3/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>', 'settings.html', 'settings');

  var leftNav = document.createElement('nav');
  leftNav.className = 'aura-sl';
  leftNav.id = 'leftSidebar';
  leftNav.innerHTML = leftHTML;
  document.body.appendChild(leftNav);

  /* ─── BUILD RIGHT SIDEBAR ────────────────────────────────────────────── */
  var rightTopHTML =
    srBtn('movies',      'Movies',      '<rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/>',
           "window.location.href='movies.html'", 'movies') +
    srBtn('lyriclab',    'LyricLab',    '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
           "window.location.href='lyriclab.html'", 'lyriclab') +
    srBtn('flashcards',  'Flashcards',  '<rect x="1" y="7" width="19" height="13" rx="2"/><path d="M4 5V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-2"/>',
           "window.location.href='flashcards.html'", 'flashcards') +
    srBtn('collocations','Collocations','<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
           "window.location.href='collocations.html'", 'collocations') +
    srBtn('shadowlab',   'ShadowLab',   '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
           "window.location.href='shadowlab.html'", 'shadowlab') +
    srBtn('examen-r',    'Examen',      'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
           "window.location.href='examen-ascenso.html'", 'examen') +
    srBtn('social',      'Social',      '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
           '', '') +
    '<div class="aura-sr-div"></div>' +
    '<button class="aura-sr-c aura-logout" onclick="window.auraLogout&&window.auraLogout()" title="Cerrar sesión">' +
      '<svg viewBox="0 0 24 24" style="flex-shrink:0;width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;">' +
        '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>' +
      '</svg>' +
      '<span class="aura-sr-lbl">Cerrar sesión</span>' +
    '</button>';

  var rightBotHTML =
    srBtn('chat',        'Chat',        '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
           'window.openAuraChat&&window.openAuraChat()', '') +
    srBtn('teacher',     'Teacher',     '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
           '', '') +
    srBtn('friend',      'Agregar amigo','<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>',
           'window.openAuraFriends&&window.openAuraFriends()', '');

  var srTop = document.createElement('div');
  srTop.className = 'aura-sr';
  srTop.style.flex = '1';
  srTop.innerHTML = rightTopHTML;

  var srBot = document.createElement('div');
  srBot.className = 'aura-sr';
  srBot.innerHTML = rightBotHTML;

  var rightCol = document.createElement('aside');
  rightCol.className = 'aura-right-col';
  rightCol.appendChild(srTop);
  rightCol.appendChild(srBot);
  document.body.appendChild(rightCol);

  /* ─── GLOBAL FUNCTIONS ───────────────────────────────────────────────── */
  window.auraLogout = function() {
    try { if (window._aura && window._aura.sb) window._aura.sb.auth.signOut(); } catch(e) {}
    try { localStorage.clear(); sessionStorage.clear(); } catch(e) {}
    window.location.href = 'login.html';
  };

  window.openAuraChat = function() {
    if (window._auraFriendsOpen) window._auraFriendsOpen();
  };

  window.openAuraFriends = function() {
    if (window._auraFriendsOpen) window._auraFriendsOpen();
  };

})();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
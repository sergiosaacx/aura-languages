/* ============================================================
   aura-shell.js — Shell compartido · Aura Languages v1
   Módulos: [1] Sidebars · [2] Panel de Perfil · [3] Dropdown
   Reemplaza: aura-nav.js + aura-profile-dd.js
   Un solo <script src="aura-shell.js?v=1"> en cada página.
   ============================================================ */
(function () {
  'use strict';
  // ── Fuente Airstrike (disponible en todas las páginas) ──────────────
  (function(){
    if (document.getElementById('_aura-airstrike-font')) return;
    var s = document.createElement('style');
    s.id = '_aura-airstrike-font';
    s.textContent = '@font-face{font-family:"Airstrike";font-weight:normal;font-style:normal;'
      +'src:url("assets/fonts/airstrike.woff2") format("woff2");font-display:swap;}';
    document.head.appendChild(s);
  })();



  /* ════════════════════════════════════════════════════════════
     MÓDULO 0 — SISTEMA I18N (Idioma de Interfaz)
     Controla el idioma de la UI (nativo). Independiente del
     idioma de aprendizaje (active_language).
     Clave localStorage: 'aura_ui_lang'  |  Campo Supabase: ui_language
  ════════════════════════════════════════════════════════════ */
  var _T = {
    es: {
      nav_exam:       "Examen",
      nav_community:  "Comunidad",
      nav_store:      "Tienda",
      nav_config:     "Config",
      nav_friends:    "Amigos",
      nav_ui_lang:    "Idioma",
      sidebar_logout: "Cerrar sesión",
      dd_profile:     "ver perfil completo",
      dd_this_week:   "esta semana",
      dd_merit:       "Mérito",
      dd_learning:    "Idioma que aprendo",
      dd_available:   "5 disponibles",
      dd_settings:    "Ajustes de cuenta",
      dd_help:        "Ayuda y feedback",
      dd_logout:      "Cerrar sesión",
      lang_native:    "nativo",
      lang_start:     "empezar →",
      lu_kicker:      "subida de nivel",
      lu_before:      "antes",
      lu_now:         "ahora",
      lu_level:       "Nivel",
      lu_new_rank:    "Nuevo rango: ",
      lu_rank_desc:   "Beneficios y retos exclusivos desbloqueados",
      lu_btn:         "¡Seguir entrenando! 🚀",
      ui_title:       "Idioma de la interfaz",
      ui_subtitle:    "Elige en qué idioma ves la app"
    },
    en: {
      nav_exam:       "Exam",
      nav_community:  "Community",
      nav_store:      "Store",
      nav_config:     "Settings",
      nav_friends:    "Friends",
      nav_ui_lang:    "Language",
      sidebar_logout: "Sign out",
      dd_profile:     "view full profile",
      dd_this_week:   "this week",
      dd_merit:       "Merit",
      dd_learning:    "Language I'm learning",
      dd_available:   "5 available",
      dd_settings:    "Account settings",
      dd_help:        "Help & feedback",
      dd_logout:      "Sign out",
      lang_native:    "native",
      lang_start:     "start →",
      lu_kicker:      "level up",
      lu_before:      "before",
      lu_now:         "now",
      lu_level:       "Level",
      lu_new_rank:    "New rank: ",
      lu_rank_desc:   "Exclusive benefits and challenges unlocked",
      lu_btn:         "Keep training! 🚀",
      ui_title:       "Interface language",
      ui_subtitle:    "Choose the app display language"
    },
    fr: {
      nav_exam:       "Examen",
      nav_community:  "Communauté",
      nav_store:      "Boutique",
      nav_config:     "Paramètres",
      nav_friends:    "Amis",
      nav_ui_lang:    "Langue",
      sidebar_logout: "Déconnexion",
      dd_profile:     "voir profil complet",
      dd_this_week:   "cette semaine",
      dd_merit:       "Mérite",
      dd_learning:    "Langue que j'apprends",
      dd_available:   "5 disponibles",
      dd_settings:    "Paramètres du compte",
      dd_help:        "Aide et feedback",
      dd_logout:      "Se déconnecter",
      lang_native:    "natif",
      lang_start:     "commencer →",
      lu_kicker:      "montée de niveau",
      lu_before:      "avant",
      lu_now:         "maintenant",
      lu_level:       "Niveau",
      lu_new_rank:    "Nouveau rang : ",
      lu_rank_desc:   "Avantages et défis exclusifs débloqués",
      lu_btn:         "Continuer l'entraînement ! 🚀",
      ui_title:       "Langue de l'interface",
      ui_subtitle:    "Choisissez la langue d'affichage"
    },
    it: {
      nav_exam:       "Esame",
      nav_community:  "Comunità",
      nav_store:      "Negozio",
      nav_config:     "Impostazioni",
      nav_friends:    "Amici",
      nav_ui_lang:    "Lingua",
      sidebar_logout: "Disconnetti",
      dd_profile:     "vedi profilo completo",
      dd_this_week:   "questa settimana",
      dd_merit:       "Merito",
      dd_learning:    "Lingua che sto imparando",
      dd_available:   "5 disponibili",
      dd_settings:    "Impostazioni account",
      dd_help:        "Aiuto e feedback",
      dd_logout:      "Esci",
      lang_native:    "nativo",
      lang_start:     "inizia →",
      lu_kicker:      "salita di livello",
      lu_before:      "prima",
      lu_now:         "ora",
      lu_level:       "Livello",
      lu_new_rank:    "Nuovo rango: ",
      lu_rank_desc:   "Vantaggi e sfide esclusivi sbloccati",
      lu_btn:         "Continua ad allenarti! 🚀",
      ui_title:       "Lingua dell'interfaccia",
      ui_subtitle:    "Scegli la lingua di visualizzazione"
    },
    pt: {
      nav_exam:       "Exame",
      nav_community:  "Comunidade",
      nav_store:      "Loja",
      nav_config:     "Configurações",
      nav_friends:    "Amigos",
      nav_ui_lang:    "Idioma",
      sidebar_logout: "Sair",
      dd_profile:     "ver perfil completo",
      dd_this_week:   "esta semana",
      dd_merit:       "Mérito",
      dd_learning:    "Idioma que aprendo",
      dd_available:   "5 disponíveis",
      dd_settings:    "Configurações da conta",
      dd_help:        "Ajuda e feedback",
      dd_logout:      "Sair",
      lang_native:    "nativo",
      lang_start:     "começar →",
      lu_kicker:      "subida de nível",
      lu_before:      "antes",
      lu_now:         "agora",
      lu_level:       "Nível",
      lu_new_rank:    "Novo rank: ",
      lu_rank_desc:   "Benefícios e desafios exclusivos desbloqueados",
      lu_btn:         "Continue treinando! 🚀",
      ui_title:       "Idioma da interface",
      ui_subtitle:    "Escolha o idioma de exibição"
    }
  };

  function _getUiLang() {
    try { return localStorage.getItem('aura_ui_lang') || 'es'; } catch(e) { return 'es'; }
  }
  function t(key) {
    var lang = _getUiLang();
    var dict = _T[lang] || _T['es'];
    return (dict[key] !== undefined) ? dict[key] : ((_T['es'][key] !== undefined) ? _T['es'][key] : key);
  }
  function _applyI18n() {
    var T = window.auraT || t;  // usar versión global (aura-i18n.js la extiende con claves de página)
    var elems = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < elems.length; i++) {
      var key = elems[i].getAttribute('data-i18n');
      var val = T(key);
      if (val !== key) elems[i].textContent = val;
    }
  }
  window.auraT = t;
  window.auraApplyI18n = _applyI18n;
  window._auraGetUiLang = _getUiLang;

  // Sincronizar ui_language desde Supabase al cargar perfil (sin reload)
  (function() {
    var _uls = setInterval(function() {
      if (window._aura && window._aura.profile) {
        clearInterval(_uls);
        var p = window._aura.profile;
        if (p.ui_language && !localStorage.getItem('aura_ui_lang')) {
          try { localStorage.setItem('aura_ui_lang', p.ui_language); } catch(e) {}
        }
      }
    }, 600);
  })();

  var _isMob = window.innerWidth <= 768;
  window._isMob = _isMob;

  /* ════════════════════════════════════════════════════════════
     MÓDULO 1 — SIDEBARS (izquierda + derecha)
  ════════════════════════════════════════════════════════════ */

  if (!_isMob) {
  var NAV_CSS = [
    '.aura-sl{position:fixed!important;left:14px;top:14px;bottom:14px;width:54px;z-index:400;background:rgba(23,23,23,.55);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.07);border-radius:18px;display:flex;flex-direction:column;align-items:center;padding:16px 0;gap:6px;overflow:hidden;transition:width .3s cubic-bezier(.4,0,.2,1);}',
    '.aura-sl:hover{width:200px!important;box-shadow:6px 0 32px rgba(0,0,0,.65);}',
    '.aura-sl-logo{width:34px;height:34px;display:flex;align-items:center;justify-content:center;color:var(--accent);font-family:"Airstrike",monospace;font-size:1.4rem;line-height:1;margin-bottom:14px;text-shadow:0 0 10px rgba(var(--accent-rgb),.4);cursor:pointer;flex-shrink:0;}',
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
    '.aura-right-col{position:fixed;right:14px;top:14px;bottom:14px;display:flex;flex-direction:column;align-items:flex-end;gap:14px;z-index:400;}',
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
  } // end if (!_isMob) NAV_CSS

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
    friend:  '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>',
    globe:   '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'
  };

  if (!_isMob) {
  // Eliminar elementos de navegación anteriores si existen
  var _old;
  _old = document.querySelector('nav.aura-sl, nav#leftSidebar, nav.sl');
  if (_old) _old.parentNode.removeChild(_old);
  _old = document.querySelector('aside.aura-right-col, aside.right-col');
  if (_old) _old.parentNode.removeChild(_old);

  var nav = document.createElement('nav');
  nav.className = 'aura-sl';
  nav.id = 'leftSidebar';
  nav.innerHTML =
    '<div class="aura-sl-logo" onclick="auraNav(\'home.html\')">A</div>' +
    slBtn('home',      'Home',      D.home,    'home.html') +
    slBtn('dashboard', 'Dashboard', D.dash,    'dashboard.html') +
    slBtn('ranking',   'Ranking',   D.ranking, '') +
    slBtn('examen',    t('nav_exam'),      D.examen,  'examen-ascenso.html') +
    slBtn('comunidad', t('nav_community'), D.comuni,  '') +
    slBtn('tienda',    t('nav_store'),     D.tienda,  'tienda.html') +
    '<div class="aura-sl-spacer"></div>' +
    slBtn('uilang',    t('nav_ui_lang'),   D.globe,   null) +
    slBtn('settings',  t('nav_config'),    D.config,  null);
  document.body.appendChild(nav);

  // Asignar onclick al botón de settings en tiempo de click para chequear rol admin
  var _settBtn = nav.querySelector('.aura-sl-btn');
  // Buscamos el último botón (settings es el último del sidebar izquierdo)
  var _allSlBtns = nav.querySelectorAll('.aura-sl-btn');
  var _cfgBtn   = _allSlBtns[_allSlBtns.length - 1]; // último = Config/Settings
  var _globeBtn = _allSlBtns[_allSlBtns.length - 2]; // penúltimo = UI lang
  if (_cfgBtn) {
    _cfgBtn.onclick = function () {
      var role = (window._aura && window._aura.profile && window._aura.profile.role) || '';
      window.location.href = (role === 'admin') ? 'admin.html' : 'settings.html';
    };
  }
  if (_globeBtn) {
    _globeBtn.onclick = function () {
      if (window._auraOpenUiLangModal) window._auraOpenUiLangModal();
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
    D.logout + '</svg><span class="aura-sr-lbl">' + t('sidebar_logout') + '</span></button>';

  var srBotHTML =
    srBtn('--', 'Chat',    D.chat,    '') +
    srBtn('--', 'Teacher', D.teacher, '') +
    srBtn('--', t('nav_friends'), D.friend, 'if(window.openAuraFriends)openAuraFriends()');

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
  } // end if (!_isMob) desktop sidebars

  if (!_isMob) {
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
  } // end if (!_isMob) topfix

  /* ════════════════════════════════════════════════════════════
     MÓDULO 2 — PANEL DE PERFIL (trigger fijo superior derecho)
  ════════════════════════════════════════════════════════════ */

  if (!_isMob) {
  var TB_CSS = [
    '#tbProfileBtn.aura-tb-trigger{position:fixed;top:14px;right:82px;z-index:150;display:flex;align-items:center;gap:10px;background:rgba(23,23,23,.85);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.07);padding:5px 14px 5px 5px;border-radius:999px;cursor:pointer;user-select:none;transition:background .15s,border-color .15s;}',
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
  } // end if (!_isMob) Module 2


  /* ════════════════════════════════════════════════════════════
     MÓDULO MOBILE — Top bar + Bottom bar + Hamburger panel
     Solo se inyecta en viewport ≤ 768px. Desktop sin cambios.
  ════════════════════════════════════════════════════════════ */
  if (_isMob) {
    // Override inline body padding
    document.body.style.setProperty('padding-left',   '0',    'important');
    document.body.style.setProperty('padding-right',  '0',    'important');
    document.body.style.setProperty('padding-top',    'calc(56px + env(safe-area-inset-top,0px))', 'important');
    document.body.style.setProperty('padding-bottom', 'calc(56px + env(safe-area-inset-bottom,0px))', 'important');

    var MOB_CSS = [
      '.topbar{display:none!important;}',
      '.tb-profile{display:none!important;}',

      '#_aura-mob-topbar{position:fixed;top:0;left:0;right:0;height:calc(56px + env(safe-area-inset-top,0px));padding-top:env(safe-area-inset-top,0px);background:rgba(10,10,10,.97);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:center;padding-left:16px;padding-right:16px;z-index:9990;gap:10px;}',

      '#_aura-mob-logo{font-family:"Airstrike",monospace;font-size:26px;color:var(--accent);'
      +'flex:0 0 auto;margin-right:auto;text-align:left;'
      +'text-shadow:0 0 10px rgba(var(--accent-rgb),.4);cursor:pointer;line-height:1;'
      +'background:none;border:none;padding:0;}',

      '#_aura-mob-topbar #tbProfileBtn{display:flex;align-items:center;gap:8px;',
      'background:rgba(23,23,23,.85);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);',
      'border:1px solid rgba(255,255,255,.07);padding:4px 12px 4px 4px;border-radius:999px;',
      'cursor:pointer;flex-shrink:0;font:inherit;position:static!important;top:auto!important;right:auto!important;}',
      '#_aura-mob-topbar #tbProfileBtn:active{background:rgba(35,35,35,.95);}',

      '#_aura-mob-topbar .aura-tb-av{width:30px;height:30px;border-radius:50%;',
      'background:linear-gradient(135deg,var(--accent),var(--accent-d));display:flex;align-items:center;',
      'justify-content:center;font-weight:800;font-size:11px;color:var(--accent-ink);flex-shrink:0;overflow:hidden;}',
      '#_aura-mob-topbar .aura-tb-av img{width:100%;height:100%;object-fit:cover;border-radius:50%;}',
      '#_aura-mob-topbar .aura-tb-name{display:flex!important;flex-direction:column;line-height:1.2;text-align:left;}',
      '#_aura-mob-topbar .aura-tb-name b{font-size:12px;font-weight:700;color:#f5f5f5;white-space:nowrap;}',
      '#_aura-mob-topbar .aura-tb-name span{font-size:9px;color:var(--accent);font-family:monospace;white-space:nowrap;}',
      '#_aura-mob-topbar .aura-tb-caret{color:#7a7a7a;font-size:10px;margin-left:2px;}',

      '#_aura-mob-hb{width:32px;height:32px;display:flex;align-items:center;',
      'justify-content:center;cursor:pointer;background:none;border:none;padding:4px;flex-shrink:0;}',
      '#_aura-mob-hb svg{width:22px;height:22px;stroke:#f0ede6;fill:none;',
      'stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}',

      '#_aura-mob-bbar{position:fixed;bottom:0;left:0;right:0;height:calc(56px + env(safe-area-inset-bottom,0px));padding-bottom:env(safe-area-inset-bottom,0px);background:rgba(23,23,23,.55);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-top:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:space-around;z-index:9990;}',
      '._mob-tab{display:flex;flex-direction:column;align-items:center;gap:3px;flex:1;',
      'cursor:pointer;padding:8px 0;border:none;background:none;color:rgba(255,255,255,.3);',
      'font:inherit;transition:color .15s;}',
      '._mob-tab svg{width:24px;height:24px;stroke:currentColor;fill:none;',
      'stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;}',
      '._mob-tab span{font-size:10px;color:inherit;letter-spacing:.1px;}',
      '._mob-tab.active{color:var(--accent);}',

      '#_aura-mob-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);'
      +'z-index:9991;opacity:0;pointer-events:none;transition:opacity .28s;}',
      '#_aura-mob-overlay.open{opacity:1;pointer-events:auto;}',

      '#_aura-mob-panel{position:fixed;top:0;right:-100%;bottom:0;'
      +'width:min(260px,78vw);'
      +'background:rgba(23,23,23,.55);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);'
      +'border-left:1px solid rgba(255,255,255,.07);border-radius:18px 0 0 18px;'
      +'z-index:9992;transition:right .28s cubic-bezier(.4,0,.2,1);'
      +'display:flex;flex-direction:column;overflow-y:auto;-webkit-overflow-scrolling:touch;}',
      '#_aura-mob-panel.open{right:0;}',

      '._mob-ph{padding:calc(70px + env(safe-area-inset-top,0px)) 12px 10px;'
      +'border-bottom:1px solid rgba(255,255,255,.07);}',
      '._mob-ph-name{font-size:14px;font-weight:700;color:#f5f5f5;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
      '._mob-ph-rank{font-size:10px;color:var(--accent);font-family:monospace;}',

      '._mob-psect{font-size:9px;font-weight:700;letter-spacing:1.5px;'
      +'color:rgba(255,255,255,.2);padding:10px 20px 4px;text-transform:uppercase;}',

      '._mob-pitem{display:flex;align-items:center;gap:12px;'
      +'height:38px;border-radius:10px;margin:1px 8px;width:calc(100% - 16px);'
      +'padding:0 12px;'
      +'color:#7a7a7a;cursor:pointer;border:none;background:none;font:inherit;'
      +'text-align:left;font-size:13px;font-weight:600;transition:all .15s;}',
      '._mob-pitem:hover,._mob-pitem:active{color:#f5f5f5;background:rgba(255,255,255,.04);}',
      '._mob-pitem svg{width:18px;height:18px;stroke:currentColor;fill:none;'
      +'stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;}',
      '._mob-pitem.active{color:var(--accent-ink)!important;background:var(--accent)!important;}',
      '._mob-pitem.active svg{stroke:var(--accent-ink)!important;}',
      '._mob-pitem.danger{color:rgba(239,68,68,.8);}',
      '._mob-pitem.danger:hover{color:#f87171;background:rgba(239,68,68,.08);}',
      '._mob-pdiv{height:.5px;background:rgba(255,255,255,.07);margin:4px 20px;}'
    ].join('');

    if (!document.getElementById('_aura-mob-css')) {
      var mcs = document.createElement('style');
      mcs.id = '_aura-mob-css';
      mcs.textContent = MOB_CSS;
      document.head.appendChild(mcs);
    }

    // ── Top bar ─────────────────────────────────────────────
    var mobTop = document.createElement('header');
    mobTop.id = '_aura-mob-topbar';
    mobTop.innerHTML =
      '<button id="_aura-mob-logo" onclick="auraNav(\'home.html\')" aria-label="Inicio">A</button>' +
      '<button id="tbProfileBtn">' +
        '<div class="aura-tb-av tb-avatar" id="tbAvatar"></div>' +
        '<div class="aura-tb-name tb-name"><b>—</b><span>— · —</span></div>' +
        '<span class="aura-tb-caret tb-caret" id="tbCaret">▾</span>' +
      '</button>' +
      '<button id="_aura-mob-hb" onclick="_auraMobTogglePanel()" aria-label="Menú">' +
        '<svg viewBox="0 0 24 24">' +
          '<line x1="3" y1="6" x2="21" y2="6"/>' +
          '<line x1="3" y1="12" x2="21" y2="12"/>' +
          '<line x1="3" y1="18" x2="21" y2="18"/>' +
        '</svg>' +
      '</button>';
    document.body.appendChild(mobTop);

    // ── Bottom bar (tools) ───────────────────────────────────
    function _mobTab(key, label, svg, dest) {
      var a = (rightActive === key) ? ' active' : '';
      var c = dest ? 'auraNav(\'' + dest + '\')' : '';
      return '<button class="_mob-tab' + a + '" onclick="' + c + '" aria-label="' + label + '">' +
        '<svg viewBox="0 0 24 24">' + svg + '</svg>' +
        '<span>' + label + '</span></button>';
    }
    var mobBBar = document.createElement('nav');
    mobBBar.id = '_aura-mob-bbar';
    mobBBar.setAttribute('aria-label', 'Herramientas');
    mobBBar.innerHTML =
      _mobTab('movies',       'Movies',        D.movies, 'movies.html') +
      _mobTab('lyriclab',     'LyricLab',      D.lyric,  'lyriclab.html') +
      _mobTab('flashcards',   'Flashcards',    D.flash,  'flashcards.html') +
      _mobTab('collocations', 'Coloc.',        D.colloc, 'collocations.html') +
      _mobTab('examen',       t('nav_exam'),   D.examen, 'examen-ascenso.html');
    document.body.appendChild(mobBBar);
    // Force bbar position so page CSS cannot override
    mobBBar.style.setProperty('position','fixed','important');
    mobBBar.style.setProperty('bottom','0','important');
    mobBBar.style.setProperty('left','0','important');
    mobBBar.style.setProperty('right','0','important');
    mobBBar.style.setProperty('z-index','9990','important');
    mobBBar.style.setProperty('display','flex','important');

    // ── Overlay ──────────────────────────────────────────────
    var mobOv = document.createElement('div');
    mobOv.id = '_aura-mob-overlay';
    mobOv.setAttribute('aria-hidden', 'true');
    mobOv.onclick = function() { window._auraMobClosePanel(); };
    document.body.appendChild(mobOv);

    // ── Hamburger panel (navigation) ─────────────────────────
    function _mobPItem(key, label, svgPath, dest, extra) {
      var a = (leftActive === key) ? ' active' : '';
      var cls = extra ? ' ' + extra : '';
      var onclick = '';
      if (dest) onclick = 'onclick="auraNav(\'' + dest + '\');_auraMobClosePanel()"';
      return '<button class="_mob-pitem' + a + cls + '" ' + onclick + '>' +
        '<svg viewBox="0 0 24 24">' + svgPath + '</svg>' + label + '</button>';
    }

    var mobPanel = document.createElement('nav');
    mobPanel.id = '_aura-mob-panel';
    mobPanel.setAttribute('aria-label', 'Menú de navegación');
    mobPanel.innerHTML =
      '<div class="_mob-ph">' +
        '<div class="_mob-ph-name" id="_mobPName">—</div>' +
        '<div class="_mob-ph-rank" id="_mobPRank">— · —</div>' +
      '</div>' +
      '<div class="_mob-psect">APRENDER</div>' +
      _mobPItem('home',      'Home',              D.home,    'home.html') +
      _mobPItem('dashboard', 'Dashboard',         D.dash,    'dashboard.html') +
      _mobPItem('ranking',   'Ranking',           D.ranking, '') +
      '<div class="_mob-pdiv"></div>' +
      '<div class="_mob-psect">SOCIAL</div>' +
      '<button class="_mob-pitem" id="_mobChatBtn">' +
        '<svg viewBox="0 0 24 24">' + D.chat + '</svg>Chat</button>' +
      '<button class="_mob-pitem" id="_mobFriendsBtn">' +
        '<svg viewBox="0 0 24 24">' + D.friend + '</svg>' + t('nav_friends') + '</button>' +
      '<div class="_mob-pdiv"></div>' +
      '<div class="_mob-psect">CUENTA</div>' +
      '<button class="_mob-pitem" id="_mobUiLangBtn">' +
        '<svg viewBox="0 0 24 24">' + D.globe + '</svg>' + t('nav_ui_lang') + '</button>' +
      '<button class="_mob-pitem" id="_mobSettBtn">' +
        '<svg viewBox="0 0 24 24">' + D.config + '</svg>' + t('nav_config') + '</button>' +
      _mobPItem('tienda', t('nav_store'), D.tienda, 'tienda.html') +
      '<div class="_mob-pdiv"></div>' +
      '<button class="_mob-pitem danger" id="_mobOutBtn">' +
        '<svg viewBox="0 0 24 24">' + D.logout + '</svg>' + t('sidebar_logout') + '</button>';
    document.body.appendChild(mobPanel);

    // Wire special buttons
    document.getElementById('_mobChatBtn').onclick    = function() { if(window.openAuraChat) openAuraChat(); _auraMobClosePanel(); };
    document.getElementById('_mobFriendsBtn').onclick = function() { if(window.openAuraFriends) openAuraFriends(); _auraMobClosePanel(); };
    document.getElementById('_mobUiLangBtn').onclick  = function() { if(window._auraOpenUiLangModal) _auraOpenUiLangModal(); _auraMobClosePanel(); };
    document.getElementById('_mobSettBtn').onclick    = function() {
      var role = (window._aura && window._aura.profile && window._aura.profile.role) || '';
      window.location.href = (role === 'admin') ? 'admin.html' : 'settings.html';
    };
    document.getElementById('_mobOutBtn').onclick     = function() { window.auraLogout(); };

    // Populate panel header AND topbar pill from profile data
    var _mobFillInt = setInterval(function() {
      if (window._aura && window._aura.profile) {
        clearInterval(_mobFillInt);
        var p = window._aura.profile;
        // Panel header
        var nEl = document.getElementById('_mobPName');
        var rEl = document.getElementById('_mobPRank');
        if (nEl && p.nombre) nEl.textContent = p.nombre;
        if (rEl) rEl.textContent = 'Lv ' + (p.nivel || 1) + ' · ' + (p.rango || 'Bronce');
        // Topbar pill — explicit selectors scoped to mob topbar
        var tbB = document.querySelector('#_aura-mob-topbar .tb-name b');
        var tbS = document.querySelector('#_aura-mob-topbar .tb-name span');
        if (tbB && p.nombre) tbB.textContent = p.nombre;
        if (tbS) {
          var lp = window._aura.lang_progress;
          tbS.textContent = 'Lv '+(p.nivel||1)+' · '+(lp && lp.rango ? lp.rango : (p.rango||'Bronce'));
        }
        // Avatar in topbar pill
        var avEl = document.getElementById('tbAvatar');
        if (avEl && !avEl.querySelector('img')) {
          var foto = p.foto_url || '';
          var ini  = (p.nombre||'?').charAt(0).toUpperCase();
          if (foto) {
            avEl.innerHTML = '<img src="'+foto+'" alt="avatar">';
          } else {
            avEl.textContent = ini;
          }
        }
      }
    }, 300);

    // ── Panel toggle functions (global) ──────────────────────
    window._auraMobTogglePanel = function() {
      var p  = document.getElementById('_aura-mob-panel');
      var ov = document.getElementById('_aura-mob-overlay');
      var hb = document.getElementById('_aura-mob-hb');
      if (!p) return;
      var opening = !p.classList.contains('open');
      p.classList.toggle('open');
      if (ov) ov.classList.toggle('open');
      if (hb) hb.innerHTML = opening
        ? '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    };

    window._auraMobClosePanel = function() {
      var p  = document.getElementById('_aura-mob-panel');
      var ov = document.getElementById('_aura-mob-overlay');
      var hb = document.getElementById('_aura-mob-hb');
      if (p)  p.classList.remove('open');
      if (ov) ov.classList.remove('open');
      if (hb) hb.innerHTML = '<svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    };
  } // end if (_isMob) mobile UI

  /* ════════════════════════════════════════════════════════════
     MÓDULO 3 — DROPDOWN DE PERFIL
  ════════════════════════════════════════════════════════════ */

  var DD_CSS = [':root{--accent-rgb:196,255,61}',
    '.aura-dd-wrap{position:fixed;width:310px;z-index:100;display:none;',
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
    +     '<a href="settings.html" class="aura-dd-link">' + t('dd_profile')
    +       '<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
    +     '</a>'
    +   '</div>'
    + '</div>'
    + '<div class="aura-dd-pts">'
    +   '<div class="aura-dd-pt ap">'
    +     '<div class="aura-dd-pt-top"><div class="aura-dd-ic fill"><svg viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg></div>'
    +     '<span class="aura-dd-pt-nm">Aura</span></div>'
    +     '<span class="aura-dd-pt-val" id="auraDdAP">—</span>'
    +     '<span class="aura-dd-pt-dl">▲ <b id="auraDdAPd">+0</b> ' + t('dd_this_week') + '</span>'
    +   '</div>'
    +   '<div class="aura-dd-pt pm">'
    +     '<div class="aura-dd-pt-top"><div class="aura-dd-ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"></circle><path d="M9 13l-3 9 6-3 6 3-3-9"></path></svg></div>'
    +     '<span class="aura-dd-pt-nm">' + t('dd_merit') + '</span></div>'
    +     '<span class="aura-dd-pt-val" id="auraDdPM">—</span>'
    +     '<span class="aura-dd-pt-dl">▲ <b id="auraDdPMd">+0</b> ' + t('dd_this_week') + '</span>'
    +   '</div>'
    + '</div>'
    + '<div class="aura-dd-sh"><span>' + t('dd_learning') + '</span><b>' + t('dd_available') + '</b></div>'
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
    +     t('dd_settings') + '<span class="aura-dd-arr">›</span>'
    +   '</button>'
    +   '<button class="aura-dd-act">'
    +     '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'
    +     t('dd_help') + '<span class="aura-dd-arr">›</span>'
    +   '</button>'
    +   '<button class="aura-dd-act danger" id="auraDdOut">'
    +     '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>'
    +     t('dd_logout')
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
    if (_isMob) {
      dd.style.top   = '66px';
      dd.style.right = '8px';
      dd.style.left  = 'auto';
      dd.style.width = 'calc(100vw - 16px)';
      dd.style.maxHeight = 'calc(100vh - 80px)';
      dd.style.overflowY = 'auto';
      return;
    }
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
      ddRk.textContent = (window.auraRankName ? window.auraRankName(rango) : rango);
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
        progEl.textContent = t('lang_native');
      } else if (!isUnlocked) {
        progEl.textContent = t('lang_start');
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

  /* ════════════════════════════════════════════════════════════
     MÓDULO 4 — POPUP DE SUBIDA DE NIVEL
     Escucha el evento 'aura:levelup' de aura-xp.js.
     NO se muestra en: lyriclab.html, play-movies.html, shadowlab.html
  ════════════════════════════════════════════════════════════ */
  (function () {
    var EXCLUDED = ['lyriclab.html', 'play-movies.html', 'shadowlab.html'];
    var _href    = window.location.href;
    var _blocked = EXCLUDED.some(function (p) { return _href.indexOf(p) !== -1; });

    var RANK_COLORS = {
      'Bronce':'#cd7f32','Plata':'#94a3b8','Oro':'#fbbf24',
      'Platino':'#67e8f9','Diamante':'#818cf8','Challenger':'#c084fc'
    };
    var RANK_EMOJI = {
      'Bronce':'\u{1F949}','Plata':'\u{1F948}','Oro':'\u{1F947}',
      'Platino':'\u{1F4A0}','Diamante':'\u{1F48E}','Challenger':'\u{1F451}'
    };

    function rankForLevel(lv) {
      if (lv >= 85) return 'Challenger';
      if (lv >= 70) return 'Diamante';
      if (lv >= 55) return 'Platino';
      if (lv >= 40) return 'Oro';
      if (lv >= 20) return 'Plata';
      return 'Bronce';
    }

    function injectCSS() {
      if (document.getElementById('_aura-lu-css')) return;
      var s = document.createElement('style');
      s.id = '_aura-lu-css';
      s.textContent = '#_aura-lu-ov{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(5,5,5,.85);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);animation:_luOvIn .25s ease;}@keyframes _luOvIn{from{opacity:0}to{opacity:1}}#_aura-lu-ov.hiding{animation:_luOvOut .2s ease forwards;}@keyframes _luOvOut{to{opacity:0}}._lu-modal{position:relative;width:min(400px,100%);background:#171717;border:1px solid #262626;border-radius:24px;padding:28px 24px 22px;text-align:center;overflow:hidden;font-family:"Plus Jakarta Sans",-apple-system,sans-serif;box-shadow:0 32px 80px rgba(0,0,0,.7);animation:_luModalIn .45s .05s cubic-bezier(.34,1.56,.64,1) backwards;}@keyframes _luModalIn{from{opacity:0;transform:translateY(20px) scale(.93)}to{opacity:1;transform:none}}._lu-bg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 280px 200px at 50% 0%,rgba(196,255,61,.09),transparent 70%);}._lu-close{position:absolute;top:14px;right:14px;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.05);color:#7a7a7a;display:flex;align-items:center;justify-content:center;cursor:pointer;border:none;transition:all .15s;}._lu-close:hover{background:rgba(255,255,255,.1);color:#f5f5f5;}._lu-close svg{width:11px;height:11px;stroke:currentColor;fill:none;stroke-width:2.5;stroke-linecap:round;}._lu-kicker{font-family:"JetBrains Mono",monospace;font-size:10px;font-weight:800;letter-spacing:.28em;text-transform:uppercase;color:#c4ff3d;display:flex;align-items:center;justify-content:center;gap:10px;position:relative;}._lu-kicker::before,._lu-kicker::after{content:"";width:24px;height:1px;background:rgba(196,255,61,.4);}._lu-arrow{font-size:52px;line-height:1;margin:16px 0 8px;animation:_luArrow .7s .2s cubic-bezier(.34,1.56,.64,1) backwards;}@keyframes _luArrow{from{transform:scale(.3) rotate(-30deg);opacity:0}to{transform:none;opacity:1}}._lu-levels{display:flex;align-items:center;justify-content:center;gap:18px;margin:6px 0 16px;}._lu-lv{display:flex;flex-direction:column;align-items:center;gap:4px;}._lu-lv-num{font-size:48px;font-weight:800;letter-spacing:-.04em;line-height:1;}._lu-lv-num.old{color:#2e2e2e;}._lu-lv-num.new{color:#c4ff3d;text-shadow:0 0 30px rgba(196,255,61,.5);animation:_luNumPop .7s .3s cubic-bezier(.34,1.56,.64,1) backwards;}@keyframes _luNumPop{from{transform:scale(.4);opacity:0}to{transform:scale(1);opacity:1}}._lu-lv-lbl{font-family:"JetBrains Mono",monospace;font-size:9px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;}._lu-lv-lbl.old{color:#2e2e2e;}._lu-lv-lbl.new{color:rgba(196,255,61,.7);}._lu-sep{font-size:28px;color:#2e2e2e;font-weight:300;margin-bottom:12px;}._lu-cefr{display:inline-flex;align-items:center;background:rgba(196,255,61,.1);border:1px solid rgba(196,255,61,.25);border-radius:999px;padding:5px 16px;margin-bottom:14px;}._lu-cefr span{font-family:"JetBrains Mono",monospace;font-size:11px;font-weight:800;color:#c4ff3d;letter-spacing:.14em;text-transform:uppercase;}._lu-rank-row{display:inline-flex;align-items:center;gap:10px;padding:10px 18px;border-radius:14px;margin-bottom:18px;border:1px solid rgba(255,255,255,.06);}._lu-rank-emoji{font-size:22px;}._lu-rank-text{display:flex;flex-direction:column;align-items:flex-start;gap:1px;}._lu-rank-text b{font-size:14px;font-weight:800;}._lu-rank-text span{font-family:"JetBrains Mono",monospace;font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#7a7a7a;}._lu-btn{width:100%;padding:13px;border-radius:12px;background:#c4ff3d;color:#0c0c0c;font-size:14px;font-weight:800;border:none;cursor:pointer;font-family:"Plus Jakarta Sans",-apple-system,sans-serif;transition:all .15s;box-shadow:0 8px 24px rgba(196,255,61,.28);}._lu-btn:hover{transform:translateY(-1px);box-shadow:0 12px 32px rgba(196,255,61,.45);}._lu-stars{position:absolute;inset:0;pointer-events:none;overflow:hidden;}._lu-star{position:absolute;animation:_luStar 1.4s ease-out forwards;}@keyframes _luStar{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-90px) scale(.3) rotate(200deg)}}';
      document.head.appendChild(s);
    }

    function spawnStars(container) {
      var icons = ['✦','✧','⭐','★','✨'];
      for (var i = 0; i < 14; i++) {
        (function(idx) {
          setTimeout(function() {
            var s = document.createElement('span');
            s.className = '_lu-star';
            s.textContent = icons[Math.floor(Math.random() * icons.length)];
            s.style.cssText = 'left:' + (8 + Math.random() * 84) + '%;top:' + (15 + Math.random() * 65) + '%;font-size:' + (10 + Math.random() * 10) + 'px;animation-delay:' + (Math.random() * .5) + 's;color:' + (Math.random() > .5 ? '#c4ff3d' : '#fff') + ';';
            container.appendChild(s);
          }, idx * 55);
        })(i);
      }
    }

    function showLevelUp(detail) {
      if (_blocked) return;
      injectCSS();

      var oldLv   = detail.oldLevel || 1;
      var newLv   = detail.newLevel || 2;
      var cefr    = detail.cefr    || 'A1';
      var newRank = rankForLevel(newLv);
      var oldRank = rankForLevel(oldLv);
      var rankChanged = newRank !== oldRank;
      var rankColor   = RANK_COLORS[newRank] || '#c4ff3d';
      var rankEmoji   = RANK_EMOJI[newRank]  || '⭐';

      var ov = document.createElement('div');
      ov.id  = '_aura-lu-ov';

      var rankHTML = rankChanged
        ? '<div class="_lu-rank-row" style="border-color:' + rankColor + '33;background:' + rankColor + '14;">' +
          '<span class="_lu-rank-emoji">' + rankEmoji + '</span>' +
          '<div class="_lu-rank-text"><b style="color:' + rankColor + '">' + t('lu_new_rank') + newRank + '</b>' +
          '<span>' + t('lu_rank_desc') + '</span></div></div>'
        : '';

      ov.innerHTML = '<div class="_lu-modal">' +
        '<div class="_lu-bg"></div>' +
        '<div class="_lu-stars" id="_lu-stars-c"></div>' +
        '<button class="_lu-close" id="_lu-close-btn"><svg viewBox="0 0 24 24"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button>' +
        '<div class="_lu-kicker">' + t('lu_kicker') + '</div>' +
        '<div class="_lu-arrow">⬆</div>' +
        '<div class="_lu-levels">' +
          '<div class="_lu-lv"><span class="_lu-lv-num old">' + oldLv + '</span><span class="_lu-lv-lbl old">' + t('lu_before') + '</span></div>' +
          '<span class="_lu-sep">→</span>' +
          '<div class="_lu-lv"><span class="_lu-lv-num new">' + newLv + '</span><span class="_lu-lv-lbl new">' + t('lu_now') + '</span></div>' +
        '</div>' +
        '<div class="_lu-cefr"><span>' + t('lu_level') + ' ' + newLv + '</span></div>' +
        rankHTML +
        '<button class="_lu-btn" id="_lu-ok-btn">' + t('lu_btn') + '</button>' +
      '</div>';

      document.body.appendChild(ov);
      spawnStars(document.getElementById('_lu-stars-c'));

      function close() {
        ov.classList.add('hiding');
        setTimeout(function() { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 220);
      }
      document.getElementById('_lu-close-btn').addEventListener('click', close);
      document.getElementById('_lu-ok-btn').addEventListener('click', close);
      ov.addEventListener('click', function(e) { if (e.target === ov) close(); });
    }

    document.addEventListener('aura:levelup', function (e) { showLevelUp(e.detail || {}); });
  })();

  /* ════════════════════════════════════════════════════════════
     MÓDULO 5 — MODAL DE IDIOMA DE INTERFAZ
  ════════════════════════════════════════════════════════════ */

  window._auraSetUiLang = function (code) {
    try { localStorage.setItem('aura_ui_lang', code); } catch(e) {}
    var aura = window._aura;
    if (aura && aura.sb && aura.userId) {
      try {
        aura.sb.from('profiles')
          .update({ ui_language: code })
          .eq('id', aura.userId)
          .then(function () { window.location.reload(); });
      } catch(e) { window.location.reload(); }
    } else {
      window.location.reload();
    }
  };

  window._auraOpenUiLangModal = function () {
    if (document.getElementById('_aura-ul-modal')) return;
    var current = _getUiLang();
    var LANGS = [
      { code: 'es', flag: '🇪🇸', name: 'Español',    sub: 'español' },
      { code: 'en', flag: '🇬🇧', name: 'English',    sub: 'english' },
      { code: 'fr', flag: '🇫🇷', name: 'Français',   sub: 'français' },
      { code: 'it', flag: '🇮🇹', name: 'Italiano',   sub: 'italiano' },
      { code: 'pt', flag: '🇧🇷', name: 'Português',  sub: 'português' }
    ];
    var rows = LANGS.map(function (l) {
      var act = l.code === current;
      var baseBtn = 'display:flex;align-items:center;gap:12px;width:100%;padding:11px 14px;border-radius:10px;background:' +
        (act ? 'rgba(196,255,61,.07)' : 'none') +
        ';border:1px solid ' + (act ? 'rgba(196,255,61,.22)' : 'rgba(255,255,255,.06)') +
        ';color:#f5f5f5;cursor:pointer;font:inherit;text-align:left;transition:all .15s;font-size:14px;font-weight:600;';
      var chk = act
        ? '<span style="width:20px;height:20px;border-radius:50%;background:#c4ff3d;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:11px;color:#0c0c0c;font-weight:800">✓</span>'
        : '<span style="width:20px;height:20px;border-radius:50%;border:1.5px solid rgba(255,255,255,.15);flex-shrink:0"></span>';
      return '<button onclick="_auraSetUiLang(\'' + l.code + '\')" style="' + baseBtn + '">' +
        '<span style="font-size:24px;line-height:1;flex-shrink:0">' + l.flag + '</span>' +
        '<span style="flex:1">' + l.name + '</span>' +
        chk +
        '</button>';
    }).join('');

    var ov = document.createElement('div');
    ov.id = '_aura-ul-modal';
    ov.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(5,5,5,.78);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);animation:_ulOvIn .2s ease;';
    ov.innerHTML =
      '<style>@keyframes _ulOvIn{from{opacity:0}to{opacity:1}}@keyframes _ulOvOut{to{opacity:0}}' +
      '@keyframes _ulCardIn{from{opacity:0;transform:translateY(12px) scale(.96)}to{opacity:1;transform:none}}</style>' +
      '<div style="position:relative;width:min(320px,100%);background:#171717;border:1px solid rgba(255,255,255,.09);border-radius:20px;padding:22px 18px 18px;font-family:inherit;animation:_ulCardIn .3s cubic-bezier(.34,1.3,.64,1) backwards;">' +
        '<button id="_aura-ul-close" style="position:absolute;top:13px;right:13px;width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,.05);color:#7a7a7a;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;line-height:1;transition:.15s;font-family:inherit;">×</button>' +
        '<div style="display:flex;align-items:center;gap:9px;margin-bottom:4px;">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c4ff3d" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' +
          '<span style="font-size:15px;font-weight:800;color:#f5f5f5">' + t('ui_title') + '</span>' +
        '</div>' +
        '<p style="font-size:11px;color:#7a7a7a;margin:0 0 14px 27px;font-family:monospace">' + t('ui_subtitle') + '</p>' +
        '<div style="display:flex;flex-direction:column;gap:6px;">' + rows + '</div>' +
      '</div>';

    document.body.appendChild(ov);

    function _closeUl() {
      ov.style.animation = '_ulOvOut .15s ease forwards';
      setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 160);
    }
    document.getElementById('_aura-ul-close').addEventListener('click', _closeUl);
    ov.addEventListener('click', function (e) { if (e.target === ov) _closeUl(); });
  };

  // Exponer para llamadas inline desde el botón generado
  window._auraSetUiLang = window._auraSetUiLang;

  // Aplicar data-i18n al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _applyI18n);
  } else {
    _applyI18n();
  }


})();

/* ============================================================
   aura-toast.js — Sistema global de notificaciones · Aura
   Uso:
     window.auraToast('levelUp', 'Nivel 21')
     window.auraToast('xp', 240)
     window.auraToast({ title:'Texto', sub:'Detalle', v:'success' })
   Variantes: success · error · warn · info · reward · reward-gold
              locked · premium · admin · admin-error
   ============================================================ */
(function () {
  'use strict';

  /* ── CSS ──────────────────────────────────────────────────── */
  var CSS = [
    '.aura-toast-stack{position:fixed;top:22px;right:22px;z-index:99999;width:360px;max-width:calc(100vw - 32px);display:flex;flex-direction:column;align-items:stretch;pointer-events:none;}',
    '.aura-toast{position:relative;display:grid;grid-template-columns:42px 1fr auto;column-gap:13px;align-items:flex-start;background:#171717;border:1px solid #262626;border-radius:14px;padding:14px 14px 15px;margin-bottom:12px;max-height:240px;overflow:hidden;pointer-events:auto;box-shadow:0 18px 40px -12px rgba(0,0,0,.7),0 2px 0 rgba(255,255,255,.02) inset;opacity:1;filter:blur(0);transform:translateY(0);transition:opacity .34s ease,filter .34s ease,transform .38s cubic-bezier(.2,.7,.25,1),max-height .4s ease,margin-bottom .4s ease,padding-top .4s ease,padding-bottom .4s ease;}',
    '.aura-toast.at-in{opacity:0;filter:blur(10px);transform:translateY(-10px);}',
    '.aura-toast.at-out{opacity:0;filter:blur(10px);transform:translateY(-8px);max-height:0!important;margin-bottom:0!important;padding-top:0!important;padding-bottom:0!important;}',
    '.aura-toast::before{content:"";position:absolute;top:0;left:14px;right:14px;height:1px;background:linear-gradient(90deg,transparent,var(--at-c,#c4ff3d),transparent);opacity:.55;}',
    '.aura-toast-ic{width:42px;height:42px;border-radius:11px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--at-c,#c4ff3d);border:1px solid rgba(255,255,255,.08);}',
    '.aura-toast-ic svg{width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;}',
    '.aura-toast-body{min-width:0;display:flex;flex-direction:column;gap:3px;padding-top:1px;}',
    '.aura-toast-title{font-size:13.5px;font-weight:700;color:#f5f5f5;letter-spacing:-.01em;line-height:1.3;font-family:"Plus Jakarta Sans","Open Sans",-apple-system,sans-serif;}',
    '.aura-toast-sub{font-family:"JetBrains Mono","Courier New",monospace;font-size:10px;color:#7a7a7a;letter-spacing:.06em;line-height:1.4;}',
    '.aura-toast-sub b{color:var(--at-c,#c4ff3d);font-weight:700;}',
    '.aura-toast-x{width:24px;height:24px;border-radius:7px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#7a7a7a;background:transparent;transition:color .14s,background .14s;margin:-2px -2px 0 0;border:none;cursor:pointer;font:inherit;}',
    '.aura-toast-x:hover{color:#f5f5f5;background:rgba(255,255,255,.06);}',
    '.aura-toast-x svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:round;}',
    '.aura-toast-bar{position:absolute;left:0;bottom:0;height:2px;background:var(--at-c,#c4ff3d);opacity:.6;border-radius:0 0 0 14px;transform-origin:left center;}',
    /* variants */
    '.aura-toast[data-v="success"]{--at-c:#c4ff3d;} .aura-toast[data-v="success"] .aura-toast-ic{background:rgba(196,255,61,.12);}',
    '.aura-toast[data-v="error"]{--at-c:#ff5a5a;} .aura-toast[data-v="error"] .aura-toast-ic{background:rgba(255,90,90,.12);}',
    '.aura-toast[data-v="warn"]{--at-c:#fbbf24;} .aura-toast[data-v="warn"] .aura-toast-ic{background:rgba(251,191,36,.12);}',
    '.aura-toast[data-v="info"]{--at-c:#7CB2FF;} .aura-toast[data-v="info"] .aura-toast-ic{background:rgba(124,178,255,.12);}',
    '.aura-toast[data-v="reward"]{--at-c:#c4ff3d;} .aura-toast[data-v="reward"] .aura-toast-ic{background:rgba(196,255,61,.12);box-shadow:0 0 16px -2px rgba(196,255,61,.3);}',
    '.aura-toast[data-v="reward-gold"]{--at-c:#fbbf24;} .aura-toast[data-v="reward-gold"] .aura-toast-ic{background:rgba(251,191,36,.12);box-shadow:0 0 16px -2px rgba(251,191,36,.3);}',
    '.aura-toast[data-v="locked"]{--at-c:#7a7a7a;} .aura-toast[data-v="locked"] .aura-toast-ic{background:rgba(255,255,255,.05);}',
    '.aura-toast[data-v="premium"]{--at-c:#fbbf24;} .aura-toast[data-v="premium"] .aura-toast-ic{background:rgba(251,191,36,.12);box-shadow:0 0 16px -2px rgba(251,191,36,.3);}',
    '.aura-toast[data-v="admin"]{--at-c:#c4ff3d;} .aura-toast[data-v="admin"] .aura-toast-ic{background:rgba(196,255,61,.1);}',
    '.aura-toast[data-v="admin"] .aura-toast-title{font-family:"JetBrains Mono","Courier New",monospace;font-size:12px;}',
    '.aura-toast[data-v="admin-error"]{--at-c:#ff5a5a;} .aura-toast[data-v="admin-error"] .aura-toast-ic{background:rgba(255,90,90,.12);}',
    '.aura-toast[data-v="admin-error"] .aura-toast-title{font-family:"JetBrains Mono","Courier New",monospace;font-size:12px;}',
    '.at-spin{animation:at-spin 1s linear infinite;transform-origin:12px 12px;}',
    '@keyframes at-spin{to{transform:rotate(360deg);}}'
  ].join('');

  /* ── ICONOS ───────────────────────────────────────────────── */
  var I = {
    check:      '<polyline points="20 6 9 17 4 12"/>',
    globe:      '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18"/>',
    alert:      '<path d="M10.3 3.7 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    wifiOff:    '<line x1="2" y1="2" x2="22" y2="22"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.8a16 16 0 0 1 4.2-2.6"/><path d="M22 8.8a16 16 0 0 0-7-3.4"/><path d="M5 12.5a10 10 0 0 1 2.5-1.6"/><path d="M19 12.5a10 10 0 0 0-3.5-2.1"/><line x1="12" y1="20" x2="12.01" y2="20"/>',
    cloudOff:   '<path d="M18 10h-1.3a7 7 0 0 0-11-4"/><path d="M5 10a4 4 0 0 0 0 8h11"/><line x1="2" y1="2" x2="22" y2="22"/>',
    sessionOut: '<path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"/><polyline points="9 16 4 11 9 6"/><line x1="4" y1="11" x2="15" y2="11"/>',
    music:      '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    film:       '<rect x="2" y="3" width="20" height="18" rx="2"/><line x1="7" y1="3" x2="7" y2="21"/><line x1="17" y1="3" x2="17" y2="21"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="2" y1="15" x2="22" y2="15"/>',
    scene:      '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.8"/><path d="m21 15-5-5L5 21"/>',
    micOff:     '<line x1="2" y1="2" x2="22" y2="22"/><path d="M9 9v3a3 3 0 0 0 5.1 2.1"/><path d="M12 4a3 3 0 0 1 3 3v4"/><path d="M19 10v2a7 7 0 0 1-.6 2.8"/><path d="M5 10v2a7 7 0 0 0 7 7"/><line x1="12" y1="19" x2="12" y2="22"/>',
    levelUp:    '<polyline points="17 11 12 6 7 11"/><polyline points="17 18 12 13 7 18"/>',
    flame:      '<path d="M12 2c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1.2.4-2 1-3c0 1.5 1 2 1.5 2C9 6.5 11 3.5 12 2z"/>',
    zap:        '<polygon points="13 2 3 14 11 14 9 22 21 9 13 9 13 2"/>',
    coin:       '<circle cx="12" cy="12" r="9"/><path d="M15 9a3.5 3.5 0 0 0-3-1.5C10 7.5 9 8.4 9 9.6c0 2.6 6 1.4 6 4.4 0 1.2-1 2.1-3 2.1A3.5 3.5 0 0 1 9 14.6"/><line x1="12" y1="6" x2="12" y2="18"/>',
    lock:       '<rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    crown:      '<path d="M3 7l4 5 5-7 5 7 4-5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><line x1="3" y1="20" x2="21" y2="20"/>',
    git:        '<line x1="6" y1="3" x2="6" y2="15"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
    gitX:       '<line x1="6" y1="3" x2="6" y2="9"/><circle cx="6" cy="12" r="3"/><line x1="14" y1="4" x2="20" y2="10"/><line x1="20" y1="4" x2="14" y2="10"/><path d="M9 12h4"/>',
    spinner:    '<path d="M12 3a9 9 0 1 0 9 9" class="at-spin"/>'
  };

  /* ── CATÁLOGO ─────────────────────────────────────────────── */
  // %1 se reemplaza con el segundo argumento de auraToast()
  var CATALOG = {
    // Perfil y cuenta
    avatar:    { v:'success',      icon:I.check,      title:'Avatar actualizado',          sub:'Tu foto de perfil se guardó' },
    saved:     { v:'success',      icon:I.check,      title:'Cambios guardados',            sub:'Todo al día' },
    lang:      { v:'info',         icon:I.globe,      title:'Idioma cambiado',              sub:'Ahora en <b>%1</b>' },
    saveErr:   { v:'error',        icon:I.alert,      title:'Error al guardar cambios',     sub:'Inténtalo de nuevo' },
    // Sesión y conexión
    offline:   { v:'warn',         icon:I.wifiOff,    title:'Sin conexión',                 sub:'Intenta de nuevo' },
    loadErr:   { v:'error',        icon:I.cloudOff,   title:'Error al cargar contenido',    sub:'No pudimos traer los datos' },
    expired:   { v:'warn',         icon:I.sessionOut, title:'Sesión expirada',              sub:'Inicia sesión de nuevo' },
    // Gameplay · herramientas
    songErr:   { v:'error',        icon:I.music,      title:'Error al cargar canción',      sub:'LyricLab no responde' },
    movieErr:  { v:'error',        icon:I.film,       title:'Error al cargar película',     sub:'Intenta de nuevo' },
    sceneErr:  { v:'error',        icon:I.scene,      title:'Error al cargar escena',       sub:'Reintenta en un momento' },
    voice:     { v:'warn',         icon:I.micOff,     title:'Sin reconocimiento de voz',    sub:'Tu navegador no lo soporta' },
    // Progreso y logros
    levelUp:   { v:'reward',       icon:I.levelUp,    title:'¡Subiste de nivel!',           sub:'<b>%1</b>' },
    streak:    { v:'reward-gold',  icon:I.flame,      title:'%1 días seguidos',             sub:'<b>+100 AuraPoints</b>' },
    xp:        { v:'reward',       icon:I.zap,        title:'XP ganada',                    sub:'<b>+%1 XP</b>' },
    points:    { v:'reward-gold',  icon:I.coin,       title:'AuraPoints ganados',           sub:'<b>+%1 AuraPoints</b>' },
    // Acceso y permisos
    needLvl:   { v:'locked',       icon:I.lock,       title:'Necesitas nivel %1',           sub:'Para acceder a este contenido' },
    premium:   { v:'premium',      icon:I.crown,      title:'Solo en plan Premium',         sub:'Mejora tu cuenta' },
    // Admin
    ghOk:      { v:'admin',        icon:I.git,        title:'Guardado en GitHub',           sub:'commit · main', persist:true },
    ghErr:     { v:'admin-error',  icon:I.gitX,       title:'Error al guardar en GitHub',   sub:'push rechazado' },
    process:   { v:'admin',        icon:I.spinner,    title:'Proceso iniciado',             sub:'Whisper · pool de palabras', persist:true }
  };

  /* ── ENGINE ───────────────────────────────────────────────── */
  var stack = null;

  function init() {
    if (document.getElementById('_aura-toast-stack')) {
      stack = document.getElementById('_aura-toast-stack');
      return;
    }
    var st = document.createElement('style');
    st.id = '_aura-toast-css';
    st.textContent = CSS;
    document.head.appendChild(st);

    stack = document.createElement('div');
    stack.id = '_aura-toast-stack';
    stack.className = 'aura-toast-stack';
    document.body.appendChild(stack);
  }

  function _show(cfg, param) {
    if (!stack) init();
    var dur    = cfg.persist ? 0 : 4200;
    var title  = param ? cfg.title.replace('%1', param) : cfg.title;
    var sub    = (param && cfg.sub) ? cfg.sub.replace('%1', param) : (cfg.sub || '');

    var el = document.createElement('div');
    el.className = 'aura-toast at-in';
    el.dataset.v = cfg.v;
    el.innerHTML =
      '<span class="aura-toast-ic"><svg viewBox="0 0 24 24">' + cfg.icon + '</svg></span>' +
      '<div class="aura-toast-body">' +
        '<div class="aura-toast-title">' + title + '</div>' +
        (sub ? '<div class="aura-toast-sub">' + sub + '</div>' : '') +
      '</div>' +
      '<button class="aura-toast-x" aria-label="Cerrar">' +
        '<svg viewBox="0 0 24 24"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>' +
      '</button>' +
      (dur ? '<span class="aura-toast-bar"></span>' : '');

    stack.prepend(el);
    while (stack.children.length > 5) _dismiss(stack.lastElementChild);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () { el.classList.remove('at-in'); });
    });

    el.querySelector('.aura-toast-x').addEventListener('click', function () { _dismiss(el); });

    if (dur) {
      var bar       = el.querySelector('.aura-toast-bar');
      var start     = performance.now();
      var remaining = dur;
      bar.style.transition = 'transform ' + dur + 'ms linear';
      bar.style.transform  = 'scaleX(1)';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { bar.style.transform = 'scaleX(0)'; });
      });
      var t = setTimeout(function () { _dismiss(el); }, dur);

      el.addEventListener('mouseenter', function () {
        clearTimeout(t);
        remaining -= performance.now() - start;
        var pct = bar.getBoundingClientRect().width / (bar.parentElement.getBoundingClientRect().width || 1);
        bar.style.transition = 'none';
        bar.style.transform  = 'scaleX(' + pct + ')';
      });
      el.addEventListener('mouseleave', function () {
        start = performance.now();
        bar.style.transition = 'transform ' + remaining + 'ms linear';
        requestAnimationFrame(function () { bar.style.transform = 'scaleX(0)'; });
        t = setTimeout(function () { _dismiss(el); }, remaining);
      });
    }
    return el;
  }

  function _dismiss(el) {
    if (!el || el.classList.contains('at-out')) return;
    el.style.maxHeight = el.offsetHeight + 'px';
    requestAnimationFrame(function () {
      el.classList.add('at-out');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 440);
    });
  }

  /* ── API PÚBLICA ──────────────────────────────────────────── */
  /*
   * window.auraToast(key, param?)
   *   auraToast('saved')
   *   auraToast('levelUp', '¡Nivel 21 alcanzado!')
   *   auraToast('xp', 240)
   *   auraToast('lang', 'Francés')
   *   auraToast('streak', 7)
   *
   * window.auraToast({ title, sub?, v?, icon?, persist? })
   *   auraToast({ title:'Listo', sub:'Proceso completado', v:'success' })
   */
  window.auraToast = function (keyOrCfg, param) {
    if (!stack) init();
    if (typeof keyOrCfg === 'string') {
      var entry = CATALOG[keyOrCfg];
      if (!entry) { console.warn('[auraToast] clave desconocida:', keyOrCfg); return; }
      return _show(entry, param !== undefined ? String(param) : null);
    }
    if (keyOrCfg && typeof keyOrCfg === 'object') {
      return _show({
        v:       keyOrCfg.v       || 'info',
        icon:    keyOrCfg.icon    || I.check,
        title:   keyOrCfg.title   || '',
        sub:     keyOrCfg.sub     || '',
        persist: !!keyOrCfg.persist
      }, null);
    }
  };

  /* ── INICIALIZAR ──────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

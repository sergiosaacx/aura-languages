/* ============================================================
   aura-tour.js  — Tour guiado cross-page de Aura Languages
   Se agrega a todas las páginas de la plataforma.
   Estado: localStorage('aura_tour_active', 'aura_tour_page', 'aura_tour_step')
   Inicio:  window.auraTourStart()
   Reinicio: window.auraTourRestart()
   ============================================================ */
(function () {
  'use strict';

  /* ── Orden de páginas del tour ─────────────────────────── */
  var TOUR_ORDER = [
    'home.html',
    'movies.html',
    'play-movies.html',
    'lyriclab.html',
    'flashcards.html',
    'shadowlab.html',
    'dashboard.html',
    'settings.html'
  ];

  /* ── Pasos por página ──────────────────────────────────── */
  /* Cada paso: { selD, selM, title, body, pos }
     selD = selector desktop | selM = selector móvil (opcional)
     pos: 'right' | 'left' | 'top' | 'bottom' | 'auto'       */
  var TOUR_STEPS = {

    'home.html': [
      {
        selD: '#leftSidebar',
        selM: '#_aura-mob-bbar',
        title: 'Navegación principal',
        body: 'Desde aquí accedes a todas las secciones de Aura: Dashboard, Ranking, Comunidad y más.',
        pos: 'right'
      },
      {
        selD: '#tbProfileBtn',
        selM: '#_aura-mob-topbar',
        title: 'Tu perfil',
        body: 'Aquí ves tu nombre, nivel y rango. También puedes cambiar de idioma y cerrar sesión.',
        pos: 'bottom'
      },
      {
        selD: '.hero',
        selM: '.hero',
        title: 'Novedades',
        body: 'Cada semana encontrarás aquí las últimas novedades, herramientas nuevas y contenido destacado.',
        pos: 'bottom'
      }
    ],

    'movies.html': [
      {
        selD: '#c2',
        selM: '#c2',
        title: 'Catálogo de películas',
        body: 'Navega por todas las películas disponibles. Cada una tiene múltiples escenas para practicar.',
        pos: 'bottom'
      },
      {
        selD: '#detail-poster',
        selM: '#detail-poster',
        title: 'Detalle de la película',
        body: 'Aquí ves la portada, descripción, nivel de dificultad y el acento del hablante.',
        pos: 'left'
      },
      {
        selD: '#feat-btn',
        selM: '#feat-btn',
        title: '¡A practicar!',
        body: 'Toca "Ver ahora" para entrar a la primera escena. Escucharás diálogos reales en inglés.',
        pos: 'top'
      }
    ],

    'play-movies.html': [
      {
        selD: '#ytPlayer',
        selM: '#ytPlayer',
        title: 'La escena',
        body: 'Mira y escucha la escena completa. Puedes pausar y repetirla las veces que quieras antes de jugar.',
        pos: 'bottom'
      },
      {
        selD: '#sceneTagBar',
        selM: '#sceneTagBar',
        title: 'Info de la escena',
        body: 'Aquí ves el número de escena, el tiempo restante y tu puntaje actual en tiempo real.',
        pos: 'bottom'
      },
      {
        selD: '#xpBar',
        selM: '#xpBar',
        title: 'Tu XP',
        body: 'Por cada escena completada ganas XP. Acumula suficiente para subir de nivel y rango.',
        pos: 'top'
      }
    ],

    'lyriclab.html': [
      {
        selD: '#videoList',
        selM: '#videoList',
        title: 'Las canciones',
        body: 'Elige cualquier canción para practicar. Están organizadas por dificultad y nivel requerido.',
        pos: 'right'
      },
      {
        selD: '#optionsGrid',
        selM: '#optionsGrid',
        title: 'El reto',
        body: 'Escucha la canción y elige la palabra correcta para completar la letra. ¡Sin trampa!',
        pos: 'top'
      },
      {
        selD: '#karaScroll',
        selM: '#karaScroll',
        title: 'Karaoke en vivo',
        body: 'Sigue la letra sincronizada en tiempo real mientras suena la canción. Ideal para practicar pronunciación.',
        pos: 'top'
      }
    ],

    'flashcards.html': [
      {
        selD: '.deck-wrap',
        selM: '.deck-wrap',
        title: 'Las tarjetas',
        body: 'Cada tarjeta tiene una palabra o frase en inglés. Tócala para ver la traducción y el ejemplo.',
        pos: 'right'
      },
      {
        selD: '#btnYes',
        selM: '#btnYes',
        title: 'Evalúate',
        body: 'Si la sabías: desliza a la derecha ✓. Si no: desliza a la izquierda ✗. El sistema aprende tus puntos débiles.',
        pos: 'top'
      },
      {
        selD: '.col-r',
        selM: '.col-r',
        title: 'Tu sesión',
        body: 'Sigue aquí tu combo, XP ganado y el historial de tarjetas de la sesión actual.',
        pos: 'left'
      }
    ],

    'shadowlab.html': [
      {
        selD: '.scene',
        selM: '.scene',
        title: 'La escena',
        body: 'Mira y escucha al hablante nativo. Presta atención a su ritmo, tono y pronunciación.',
        pos: 'right'
      },
      {
        selD: '#btnReplay',
        selM: '#btnReplay',
        title: 'Escucha y repite',
        body: 'Toca "Repetir" para volver a escuchar la línea. Luego graba tu voz para comparar.',
        pos: 'top'
      },
      {
        selD: '.score-card',
        selM: '.score-card',
        title: 'Tu pronunciación',
        body: 'El sistema analiza tu voz y te da un puntaje de similitud con el hablante nativo. Practica hasta llegar al 100%.',
        pos: 'top'
      }
    ],

    'dashboard.html': [
      {
        selD: '.card.c1',
        selM: '.card.c1',
        title: 'Tu tarjeta de perfil',
        body: 'Aquí ves tu foto, nombre, nivel, racha de días y XP acumulado en el idioma activo.',
        pos: 'right'
      },
      {
        selD: '.card.c3',
        selM: '.card.c3',
        title: 'Tus habilidades',
        body: 'Progreso detallado en cada habilidad: Gramática, Vocabulario, Listening, Speaking y Writing.',
        pos: 'left'
      },
      {
        selD: '.card.c2',
        selM: '.card.c2',
        title: 'Historial de XP',
        body: 'Tu curva de progreso en el tiempo. Cada pico representa una sesión de práctica intensa.',
        pos: 'bottom'
      }
    ],

    'settings.html': [
      {
        selD: '#pf-nombre',
        selM: '#pf-nombre',
        title: 'Tu perfil',
        body: 'Actualiza tu nombre, foto de perfil y datos de usuario desde aquí.',
        pos: 'bottom'
      },
      {
        selD: '#ap-meta',
        selM: '#ap-meta',
        title: 'Meta diaria',
        body: 'Configura cuántos minutos quieres practicar cada día. Aura te recordará si no cumples tu meta.',
        pos: 'top'
      }
    ]

  };

  /* ── Estado en localStorage ────────────────────────────── */
  var K_ACTIVE = 'aura_tour_active';
  var K_PAGE   = 'aura_tour_page';
  var K_STEP   = 'aura_tour_step';
  var K_DONE   = 'aura_tour_done';

  function getState() {
    return {
      active : localStorage.getItem(K_ACTIVE) === '1',
      page   : localStorage.getItem(K_PAGE)   || TOUR_ORDER[0],
      step   : parseInt(localStorage.getItem(K_STEP) || '0', 10)
    };
  }

  function setState(obj) {
    if ('active' in obj) localStorage.setItem(K_ACTIVE, obj.active ? '1' : '0');
    if ('page'   in obj) localStorage.setItem(K_PAGE,   obj.page);
    if ('step'   in obj) localStorage.setItem(K_STEP,   String(obj.step));
  }

  /* ── Página actual ─────────────────────────────────────── */
  var PAGE = (function () {
    var p = location.pathname.split('/').pop();
    return p || 'home.html';
  })();

  var isMobile = function () { return window.innerWidth < 768; };

  /* ── Esperar a que un elemento exista en el DOM ────────── */
  function waitFor(selector, cb, maxMs) {
    maxMs = maxMs || 6000;
    var elapsed = 0;
    var interval = 120;
    function check() {
      var el = document.querySelector(selector);
      if (el) { cb(el); return; }
      elapsed += interval;
      if (elapsed < maxMs) setTimeout(check, interval);
    }
    check();
  }

  /* ── Inyectar CSS del tour ─────────────────────────────── */
  function injectCSS() {
    if (document.getElementById('_aura-tour-css')) return;
    var s = document.createElement('style');
    s.id = '_aura-tour-css';
    s.textContent = [
      /* Backdrop */
      '#_at-backdrop{position:fixed;inset:0;z-index:99980;pointer-events:none;}',
      /* Caja de resaltado */
      '#_at-hbox{position:fixed;z-index:99982;border-radius:14px;border:2px solid var(--accent,#c4ff3d);background:rgba(196,255,61,.06);box-shadow:0 0 0 9999px rgba(8,7,26,.78);pointer-events:none;transition:top .35s,left .35s,width .35s,height .35s;}',
      /* Tooltip */
      '#_at-tip{position:fixed;z-index:99990;background:rgba(14,12,34,.97);border:1px solid var(--accent,#c4ff3d);border-radius:14px;padding:16px 18px 14px;width:240px;pointer-events:all;transition:top .3s,left .3s;}',
      '#_at-tip._at-mobile{width:calc(100vw - 32px);left:16px!important;right:16px;}',
      '._at-badge{display:inline-block;background:var(--accent,#c4ff3d);color:#0a0a0f;font-size:9px;font-weight:800;padding:2px 9px;border-radius:99px;margin-bottom:9px;letter-spacing:.5px;}',
      '._at-title{font-size:13px;font-weight:800;color:#f0ede6;margin-bottom:5px;line-height:1.3;}',
      '._at-body{font-size:11px;color:rgba(240,237,230,.6);line-height:1.6;margin-bottom:12px;}',
      '._at-footer{display:flex;align-items:center;justify-content:space-between;}',
      '._at-dots{display:flex;gap:5px;align-items:center;}',
      '._at-dot{width:6px;height:6px;border-radius:50%;background:rgba(240,237,230,.15);transition:all .2s;}',
      '._at-dot.active{background:var(--accent,#c4ff3d);width:16px;border-radius:4px;}',
      '._at-dot.done{background:rgba(196,255,61,.4);}',
      '._at-btn-next{background:var(--accent,#c4ff3d);color:#0a0a0f;border:none;border-radius:8px;font-size:11px;font-weight:800;padding:7px 15px;cursor:pointer;}',
      '._at-btn-next:hover{opacity:.85;}',
      '._at-btn-skip{background:none;border:none;font-size:10px;color:rgba(240,237,230,.35);cursor:pointer;text-decoration:underline;}',
      '._at-btn-skip:hover{color:rgba(240,237,230,.7);}',
      /* Pantalla de fin de página */
      '#_at-transition{position:fixed;inset:0;z-index:99995;background:rgba(8,7,26,.95);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;text-align:center;padding:24px;}',
      '._at-tr-ic{font-size:40px;}',
      '._at-tr-ti{font-size:17px;font-weight:800;color:#f0ede6;}',
      '._at-tr-sub{font-size:13px;color:rgba(240,237,230,.5);line-height:1.5;max-width:280px;}',
      '._at-tr-btn{background:var(--accent,#c4ff3d);color:#0a0a0f;border:none;border-radius:12px;font-size:13px;font-weight:800;padding:12px 28px;cursor:pointer;margin-top:6px;}',
      '._at-tr-btn:hover{opacity:.85;}',
      '._at-tr-skip{background:none;border:none;font-size:12px;color:rgba(240,237,230,.3);cursor:pointer;text-decoration:underline;margin-top:2px;}',
      /* Pantalla final */
      '#_at-finale{position:fixed;inset:0;z-index:99995;background:rgba(8,7,26,.96);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;text-align:center;padding:24px;}',
      '._at-fin-ic{font-size:56px;}',
      '._at-fin-ti{font-size:22px;font-weight:800;color:#f0ede6;}',
      '._at-fin-sub{font-size:13px;color:rgba(240,237,230,.5);line-height:1.55;max-width:300px;}',
      '._at-fin-btn{background:var(--accent,#c4ff3d);color:#0a0a0f;border:none;border-radius:12px;font-size:14px;font-weight:800;padding:13px 32px;cursor:pointer;margin-top:8px;}',
      '._at-fin-btn:hover{opacity:.85;}',
      /* Fade anim */
      '@keyframes _at-fi{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}',
      '._at-fi{animation:_at-fi .3s ease both;}'
    ].join('');
    document.head.appendChild(s);
  }

  /* ── Crear elementos del tour ──────────────────────────── */
  var hbox, tip;

  function buildElements() {
    if (document.getElementById('_at-hbox')) return;

    hbox = document.createElement('div');
    hbox.id = '_at-hbox';
    hbox.style.top = '-999px';
    document.body.appendChild(hbox);

    tip = document.createElement('div');
    tip.id = '_at-tip';
    tip.style.top = '-999px';
    document.body.appendChild(tip);
  }

  /* ── Posicionar tooltip ────────────────────────────────── */
  function positionTip(targetRect, resolvedPos) {
    var W = window.innerWidth;
    var H = window.innerHeight;
    var TW = isMobile() ? W - 32 : 240;
    var TH = 160; // estimado

    var pos = resolvedPos;

    // En móvil siempre bottom o top
    if (isMobile()) {
      tip.classList.add('_at-mobile');
      var t = targetRect.bottom + 10;
      if (t + TH > H - 16) t = targetRect.top - TH - 10;
      tip.style.top  = Math.max(8, t) + 'px';
      tip.style.left = '16px';
      return;
    }
    tip.classList.remove('_at-mobile');

    var top, left;
    if (pos === 'right') {
      top  = targetRect.top + targetRect.height / 2 - TH / 2;
      left = targetRect.right + 12;
      if (left + TW > W - 8) { pos = 'left'; }
    }
    if (pos === 'left') {
      top  = targetRect.top + targetRect.height / 2 - TH / 2;
      left = targetRect.left - TW - 12;
      if (left < 8) { pos = 'bottom'; }
    }
    if (pos === 'bottom') {
      top  = targetRect.bottom + 12;
      left = targetRect.left + targetRect.width / 2 - TW / 2;
    }
    if (pos === 'top') {
      top  = targetRect.top - TH - 12;
      left = targetRect.left + targetRect.width / 2 - TW / 2;
    }

    // Clamp
    top  = Math.max(8, Math.min(top,  H - TH - 8));
    left = Math.max(8, Math.min(left, W - TW - 8));

    tip.style.top  = top  + 'px';
    tip.style.left = left + 'px';
  }

  /* ── Mostrar paso ──────────────────────────────────────── */
  function showStep(stepIndex) {
    var steps   = TOUR_STEPS[PAGE];
    if (!steps) return;
    var step    = steps[stepIndex];
    if (!step)  return;

    var sel = (isMobile() && step.selM) ? step.selM : step.selD;

    waitFor(sel, function (el) {
      var rect = el.getBoundingClientRect();

      // Posicionar hbox
      var pad = 6;
      hbox.style.top    = (rect.top    - pad + window.scrollY) + 'px';
      hbox.style.left   = (rect.left   - pad + window.scrollX) + 'px';
      hbox.style.width  = (rect.width  + pad * 2) + 'px';
      hbox.style.height = (rect.height + pad * 2) + 'px';

      // Calcular posición real del tooltip (fixed, sin scroll)
      hbox.style.top    = (rect.top  - pad) + 'px';
      hbox.style.left   = (rect.left - pad) + 'px';
      hbox.style.position = 'fixed';

      // Contenido del tooltip
      var totalSteps  = steps.length;
      var isLast      = stepIndex === totalSteps - 1;
      var isLastPage  = PAGE === TOUR_ORDER[TOUR_ORDER.length - 1];

      var dots = '';
      for (var i = 0; i < totalSteps; i++) {
        dots += '<div class="_at-dot' + (i < stepIndex ? ' done' : (i === stepIndex ? ' active' : '')) + '"></div>';
      }

      tip.className = '_at-fi';
      tip.innerHTML = [
        '<div class="_at-badge">Paso ' + (stepIndex + 1) + ' de ' + totalSteps + '</div>',
        '<div class="_at-title">' + step.title + '</div>',
        '<div class="_at-body">'  + step.body  + '</div>',
        '<div class="_at-footer">',
          '<div class="_at-dots">' + dots + '</div>',
          '<div style="display:flex;gap:8px;align-items:center;">',
            '<button class="_at-btn-skip" id="_at-skip">Saltar</button>',
            '<button class="_at-btn-next" id="_at-next">',
              (isLast ? (isLastPage ? 'Finalizar ✓' : 'Siguiente página →') : 'Siguiente →'),
            '</button>',
          '</div>',
        '</div>'
      ].join('');

      positionTip(rect, step.pos || 'auto');

      document.getElementById('_at-next').addEventListener('click', advance);
      document.getElementById('_at-skip').addEventListener('click', skipTour);
    });
  }

  /* ── Avanzar ───────────────────────────────────────────── */
  function advance() {
    var steps      = TOUR_STEPS[PAGE];
    var state      = getState();
    var nextStep   = state.step + 1;

    if (nextStep < steps.length) {
      // Siguiente paso en esta página
      setState({ step: nextStep });
      showStep(nextStep);
    } else {
      // Fin de esta página → pasar a la siguiente
      var pageIdx  = TOUR_ORDER.indexOf(PAGE);
      var nextPage = TOUR_ORDER[pageIdx + 1];

      if (!nextPage) {
        // Tour completado
        finishTour();
      } else {
        showTransition(nextPage);
      }
    }
  }

  /* ── Pantalla de transición entre páginas ──────────────── */
  var PAGE_NAMES = {
    'home.html':        { name: 'Inicio',      icon: '🏠' },
    'movies.html':      { name: 'Movies',      icon: '🎬' },
    'play-movies.html': { name: 'Escena',       icon: '▶️' },
    'lyriclab.html':    { name: 'LyricLab',    icon: '🎵' },
    'flashcards.html':  { name: 'Flashcards',  icon: '🃏' },
    'shadowlab.html':   { name: 'ShadowLab',   icon: '🗣️' },
    'dashboard.html':   { name: 'Dashboard',   icon: '📊' },
    'settings.html':    { name: 'Ajustes',      icon: '⚙️' }
  };

  function showTransition(nextPage) {
    destroyTourUI();

    var info = PAGE_NAMES[nextPage] || { name: nextPage, icon: '📄' };

    var div = document.createElement('div');
    div.id = '_at-transition';
    div.className = '_at-fi';
    div.innerHTML = [
      '<div class="_at-tr-ic">' + info.icon + '</div>',
      '<div class="_at-tr-ti">Ahora: ' + info.name + '</div>',
      '<div class="_at-tr-sub">Vamos a mostrarte cómo funciona esta sección.</div>',
      '<button class="_at-tr-btn" id="_at-tr-go">Ir a ' + info.name + ' →</button>',
      '<button class="_at-tr-skip" id="_at-tr-skip">Saltar el tour</button>'
    ].join('');
    document.body.appendChild(div);

    document.getElementById('_at-tr-go').addEventListener('click', function () {
      setState({ page: nextPage, step: 0 });
      window.location.href = nextPage;
    });
    document.getElementById('_at-tr-skip').addEventListener('click', skipTour);
  }

  /* ── Tour completado ───────────────────────────────────── */
  function finishTour() {
    destroyTourUI();
    localStorage.setItem(K_ACTIVE, '0');
    localStorage.setItem(K_DONE, '1');

    var div = document.createElement('div');
    div.id = '_at-finale';
    div.className = '_at-fi';
    div.innerHTML = [
      '<div class="_at-fin-ic">🎉</div>',
      '<div class="_at-fin-ti">¡Ya conoces Aura!</div>',
      '<div class="_at-fin-sub">Conoces todas las herramientas. Ahora es tu turno de practicar.<br>¡A aprender inglés!</div>',
      '<button class="_at-fin-btn" id="_at-fin-close">¡Empezar a practicar!</button>'
    ].join('');
    document.body.appendChild(div);

    document.getElementById('_at-fin-close').addEventListener('click', function () {
      var el = document.getElementById('_at-finale');
      if (el) el.parentNode.removeChild(el);
    });
  }

  /* ── Saltar tour ───────────────────────────────────────── */
  function skipTour() {
    destroyTourUI();
    localStorage.setItem(K_ACTIVE, '0');
    localStorage.setItem(K_DONE, '1');
    // Limpiar pantallas de transición/finale si existen
    ['_at-transition', '_at-finale'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.parentNode.removeChild(el);
    });
  }

  /* ── Destruir elementos del tour ───────────────────────── */
  function destroyTourUI() {
    [hbox, tip].forEach(function (el) {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    });
    hbox = null;
    tip  = null;
  }

  /* ── Inicializar en esta página ────────────────────────── */
  function init() {
    var state = getState();
    if (!state.active) return;
    if (state.page !== PAGE) return; // no es nuestra página en el flujo

    var steps = TOUR_STEPS[PAGE];
    if (!steps || !steps.length) return;

    injectCSS();
    buildElements();

    var step = state.step;
    if (step >= steps.length) step = 0;

    showStep(step);
  }

  /* ── API pública ───────────────────────────────────────── */

  /**
   * Inicia el tour desde el principio (desde la página actual si está en TOUR_ORDER)
   * Llamado desde aura-onboarding.js
   */
  window.auraTourStart = function () {
    var startPage = TOUR_ORDER.indexOf(PAGE) >= 0 ? PAGE : TOUR_ORDER[0];
    setState({ active: true, page: startPage, step: 0 });
    localStorage.removeItem(K_DONE);
    injectCSS();
    buildElements();
    showStep(0);
  };

  /**
   * Reinicia el tour completamente desde home.html
   * Útil desde settings.html
   */
  window.auraTourRestart = function () {
    setState({ active: true, page: TOUR_ORDER[0], step: 0 });
    localStorage.removeItem(K_DONE);
    window.location.href = TOUR_ORDER[0];
  };

  /**
   * Salta / cancela el tour
   */
  window.auraTourSkip = skipTour;

  /* ── Arrancar al cargar la página ──────────────────────── */
  function onReady() {
    // Esperar un poco para que el shell inyecte sus elementos
    setTimeout(init, 700);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

})();

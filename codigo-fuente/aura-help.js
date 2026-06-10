/* ============================================================
   aura-help.js — Botón de ayuda (?) en navegación
   Inyecta el ? en sidebar izquierdo (desktop) y drawer móvil.
   Abre mini-menú con dos acciones:
     1. Repetir el tour
     2. Enviar sugerencia / reporte
   ============================================================ */
(function () {
  'use strict';

  /* ── Esperar a que un selector aparezca en el DOM ─────── */
  function waitFor(sel, cb, max) {
    max = max || 8000;
    var t = 0, iv = 150;
    (function check() {
      var el = document.querySelector(sel);
      if (el) { cb(el); return; }
      t += iv;
      if (t < max) setTimeout(check, iv);
    })();
  }

  /* ── CSS ─────────────────────────────────────────────── */
  function injectCSS() {
    if (document.getElementById('_ah-css')) return;
    var s = document.createElement('style');
    s.id = '_ah-css';
    s.textContent = [
      /* Botón ? en sidebar desktop — hereda .aura-sl-btn */
      '#_ah-sl-btn{margin-top:auto;}',

      /* Mini-menú */
      '#_ah-menu{position:fixed;z-index:99970;background:#111020;border:1px solid rgba(196,255,61,.25);border-radius:16px;padding:8px;width:220px;',
        'box-shadow:0 24px 56px rgba(0,0,0,.6);',
        'opacity:0;pointer-events:none;transition:opacity .18s,transform .18s;transform:translateX(-8px) scale(.97);}',
      '#_ah-menu.open{opacity:1;pointer-events:all;transform:none;}',
      '._ah-menu-head{padding:8px 10px 4px;font-family:"JetBrains Mono",monospace;font-size:9px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(196,255,61,.6);}',
      '._ah-menu-item{display:flex;align-items:center;gap:11px;width:100%;padding:10px 12px;border-radius:10px;border:none;background:none;color:#f0ede6;font-size:13px;font-weight:600;cursor:pointer;text-align:left;transition:background .15s;}',
      '._ah-menu-item:hover{background:rgba(255,255,255,.06);}',
      '._ah-menu-item svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;color:rgba(196,255,61,.8);}',
      '._ah-menu-item span{flex:1;}',
      '._ah-menu-div{height:1px;background:rgba(255,255,255,.07);margin:4px 8px;}',

      /* Botón en mobile drawer */
      '#_ah-mob-btn{display:flex;align-items:center;gap:12px;width:100%;padding:11px 20px;border:none;background:none;color:rgba(240,237,230,.65);font-size:14px;font-weight:600;cursor:pointer;text-align:left;transition:color .15s;}',
      '#_ah-mob-btn:hover{color:#f0ede6;}',
      '#_ah-mob-btn svg{width:17px;height:17px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;}',

      /* ── OVERLAY ──────────────────────────────────────── */
      '#_ah-overlay{position:fixed;inset:0;z-index:99980;display:flex;align-items:center;justify-content:center;padding:20px;',
        'background:rgba(6,6,6,.72);backdrop-filter:blur(7px);opacity:0;visibility:hidden;transition:opacity .22s,visibility .22s;}',
      '#_ah-overlay.open{opacity:1;visibility:visible;}',

      /* ── MODAL ────────────────────────────────────────── */
      '#_ah-modal{width:min(540px,100%);max-height:min(88vh,760px);display:flex;flex-direction:column;overflow:hidden;',
        'background:#171717;border:1px solid #333;border-radius:22px;position:relative;',
        'box-shadow:0 40px 90px rgba(0,0,0,.6);',
        'transform:translateY(14px) scale(.98);opacity:0;transition:transform .26s cubic-bezier(.2,.9,.3,1),opacity .26s;}',
      '#_ah-overlay.open #_ah-modal{transform:none;opacity:1;}',
      '#_ah-modal::before{content:"";position:absolute;inset:0;border-radius:22px;',
        'background:radial-gradient(420px 200px at 88% -4%,rgba(196,255,61,.10),transparent 64%);pointer-events:none;}',

      /* header */
      '._ah-m-head{display:flex;align-items:flex-start;gap:14px;padding:22px 22px 16px;}',
      '._ah-m-ic{width:46px;height:46px;border-radius:13px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--accent,#c4ff3d);color:#0c0c0c;box-shadow:0 0 24px rgba(196,255,61,.4);}',
      '._ah-m-ic svg{width:23px;height:23px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}',
      '._ah-m-head-tx{flex:1;min-width:0;padding-top:1px;}',
      '._ah-kick{font-family:"JetBrains Mono",monospace;font-size:9.5px;color:var(--accent,#c4ff3d);font-weight:700;letter-spacing:.2em;text-transform:uppercase;}',
      '._ah-m-head-tx h2{font-size:1.4rem;font-weight:800;letter-spacing:-.02em;line-height:1.12;margin-top:5px;color:#f5f5f5;}',
      '._ah-m-head-tx p{font-size:12.5px;color:#7a7a7a;margin-top:6px;line-height:1.45;}',
      '._ah-close{width:34px;height:34px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#7a7a7a;background:rgba(255,255,255,.04);border:1px solid #262626;cursor:pointer;transition:.15s;}',
      '._ah-close:hover{color:#f5f5f5;background:rgba(255,255,255,.08);}',
      '._ah-close svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2.4;stroke-linecap:round;}',

      /* body */
      '._ah-m-body{padding:4px 22px 8px;overflow-y:auto;}',
      '._ah-field{margin-top:18px;}',
      '._ah-field>label{display:block;font-family:"JetBrains Mono",monospace;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#c8c8c8;margin-bottom:10px;}',
      '._ah-field>label .opt{color:#525252;font-weight:600;}',
      '._ah-field>label .req{color:var(--accent,#c4ff3d);}',

      /* cats grid */
      '._ah-cats{display:grid;grid-template-columns:1fr 1fr;gap:9px;}',
      '._ah-cat{display:flex;align-items:center;gap:11px;padding:13px 14px;border-radius:13px;text-align:left;',
        'background:rgba(255,255,255,.025);border:1px solid #262626;transition:.15s;cursor:pointer;width:100%;}',
      '._ah-cat:hover{border-color:#333;background:rgba(255,255,255,.05);}',
      '._ah-cat.sel{border-color:var(--accent,#c4ff3d);background:rgba(196,255,61,.08);}',
      '._ah-cat-ic{width:34px;height:34px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.05);color:#c8c8c8;transition:.15s;}',
      '._ah-cat-ic svg{width:17px;height:17px;stroke:currentColor;fill:none;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;}',
      '._ah-cat.sel ._ah-cat-ic{background:var(--accent,#c4ff3d);color:#0c0c0c;box-shadow:0 0 16px rgba(196,255,61,.4);}',
      '._ah-cat-tx b{display:block;font-size:13px;font-weight:700;color:#f5f5f5;line-height:1.15;}',
      '._ah-cat-tx span{font-size:10.5px;color:#7a7a7a;}',

      /* inputs */
      '._ah-inp,._ah-sel,._ah-ta{width:100%;background:#1f1f1f;border:1px solid #262626;border-radius:12px;',
        'padding:13px 14px;font-size:14px;color:#f5f5f5;transition:.15s;font-family:inherit;}',
      '._ah-inp::placeholder,._ah-ta::placeholder{color:#525252;}',
      '._ah-inp:focus,._ah-sel:focus,._ah-ta:focus{outline:none;border-color:var(--accent,#c4ff3d);background:#1c1c1c;box-shadow:0 0 0 3px rgba(196,255,61,.12);}',
      '._ah-ta{resize:vertical;min-height:104px;line-height:1.55;}',
      '._ah-sel{appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%237a7a7a\' stroke-width=\'3\' stroke-linecap=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:38px;cursor:pointer;}',
      '._ah-sel option{background:#1c1c1c;color:#f5f5f5;}',
      '._ah-two{display:grid;grid-template-columns:1fr 1fr;gap:11px;}',
      '._ah-cc{font-family:"JetBrains Mono",monospace;font-size:10px;color:#525252;margin-top:7px;text-align:right;letter-spacing:.04em;}',

      /* media seg */
      '._ah-seg{display:inline-flex;gap:4px;background:#1f1f1f;border:1px solid #262626;border-radius:11px;padding:4px;}',
      '._ah-seg button{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:8px;font-size:12.5px;font-weight:700;color:#7a7a7a;transition:.15s;border:none;background:none;cursor:pointer;font-family:inherit;}',
      '._ah-seg button svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}',
      '._ah-seg button.on{background:var(--accent,#c4ff3d);color:#0c0c0c;}',

      /* cond block */
      '._ah-cond{display:none;}._ah-cond.show{display:block;}',
      '._ah-cond-card{margin-top:12px;padding:16px;border-radius:14px;background:rgba(196,255,61,.04);border:1px dashed rgba(196,255,61,.28);}',
      '._ah-hint{display:flex;align-items:center;gap:8px;font-family:"JetBrains Mono",monospace;font-size:10px;color:var(--accent,#c4ff3d);letter-spacing:.06em;margin-top:14px;}',
      '._ah-hint svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;flex-shrink:0;}',

      /* footer */
      '._ah-m-foot{display:flex;align-items:center;gap:12px;padding:16px 22px 20px;border-top:1px solid #262626;margin-top:8px;flex-shrink:0;}',
      '._ah-m-foot .note{flex:1;font-family:"JetBrains Mono",monospace;font-size:9.5px;color:#525252;letter-spacing:.06em;line-height:1.5;}',
      '._ah-btn{display:inline-flex;align-items:center;gap:9px;font-size:13px;font-weight:800;letter-spacing:.03em;padding:13px 20px;border-radius:12px;transition:.16s;white-space:nowrap;cursor:pointer;font-family:inherit;}',
      '._ah-btn svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;}',
      '._ah-btn.ghost{background:rgba(255,255,255,.04);border:1px solid #333;color:#c8c8c8;}',
      '._ah-btn.ghost:hover{color:#f5f5f5;background:rgba(255,255,255,.07);}',
      '._ah-btn.send{background:var(--accent,#c4ff3d);color:#0c0c0c;border:none;box-shadow:0 8px 22px rgba(196,255,61,.26);}',
      '._ah-btn.send:hover{background:#fff;}',
      '._ah-btn.send:disabled{opacity:.4;cursor:not-allowed;box-shadow:none;}',

      /* success */
      '._ah-success{display:none;flex-direction:column;align-items:center;text-align:center;padding:52px 34px;}',
      '._ah-success.show{display:flex;}',
      '._ah-tick{width:78px;height:78px;border-radius:24px;background:var(--accent,#c4ff3d);color:#0c0c0c;display:flex;align-items:center;justify-content:center;box-shadow:0 0 44px rgba(196,255,61,.45);margin-bottom:24px;}',
      '._ah-tick svg{width:38px;height:38px;stroke:currentColor;fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;}',
      '._ah-success h2{font-size:1.7rem;font-weight:800;letter-spacing:-.02em;color:#f5f5f5;}',
      '._ah-success h2 em{font-style:italic;color:var(--accent,#c4ff3d);}',
      '._ah-success p{font-size:13.5px;color:#7a7a7a;margin-top:12px;line-height:1.55;max-width:340px;}',
      '._ah-ticket{font-family:"JetBrains Mono",monospace;font-size:11px;color:#c8c8c8;margin-top:20px;background:rgba(255,255,255,.04);border:1px solid #262626;border-radius:10px;padding:9px 15px;}',
      '._ah-ticket b{color:var(--accent,#c4ff3d);}',

      '@media(max-width:480px){._ah-cats{grid-template-columns:1fr;}._ah-two{grid-template-columns:1fr;}._ah-m-foot{flex-wrap:wrap;}._ah-m-foot .note{order:3;flex-basis:100%;}}'
    ].join('');
    document.head.appendChild(s);
  }

  /* ── Icono SVG de ? ──────────────────────────────────── */
  var IC_HELP = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>';
  var IC_MAP  = '<svg viewBox="0 0 24 24"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>';
  var IC_MSG  = '<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  var IC_X    = '<svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  var IC_SEND = '<svg viewBox="0 0 24 24"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
  var IC_BUG  = '<svg viewBox="0 0 24 24"><rect x="8" y="6" width="8" height="13" rx="4"/><path d="M19 7l-3 2M5 7l3 2M20 13h-4M8 13H4M18 18l-2-1M6 18l2-1M12 3v3"/></svg>';
  var IC_IDEA = '<svg viewBox="0 0 24 24"><path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/></svg>';
  var IC_CONT = '<svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
  var IC_OTH  = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>';
  var IC_FILM = '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 4v16M17 4v16M2 9h5M17 9h5M2 15h5M17 15h5"/></svg>';
  var IC_MUSIC= '<svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
  var IC_INFO = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';
  var IC_CHECK= '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>';

  /* ── Mini-menú ─────────────────────────────────────────── */
  var menu = null;
  var menuOpen = false;

  function buildMenu() {
    menu = document.createElement('div');
    menu.id = '_ah-menu';
    menu.innerHTML = [
      '<div class="_ah-menu-head">Ayuda</div>',
      '<button class="_ah-menu-item" id="_ah-mi-tour">',
        IC_MAP,
        '<span>Repetir el tour</span>',
      '</button>',
      '<div class="_ah-menu-div"></div>',
      '<button class="_ah-menu-item" id="_ah-mi-sug">',
        IC_MSG,
        '<span>Sugerencias y reportes</span>',
      '</button>'
    ].join('');
    document.body.appendChild(menu);

    menu.querySelector('#_ah-mi-tour').addEventListener('click', function () {
      closeMenu();
      if (typeof window.auraTourRestart === 'function') {
        window.auraTourRestart();
      } else if (typeof window.auraTourStart === 'function') {
        window.auraTourStart();
      }
    });

    menu.querySelector('#_ah-mi-sug').addEventListener('click', function () {
      closeMenu();
      openModal();
    });

    document.addEventListener('click', function (e) {
      if (menuOpen && !menu.contains(e.target) && e.target.id !== '_ah-sl-btn' && e.target.id !== '_ah-mob-btn') {
        closeMenu();
      }
    });
  }

  function toggleMenu(anchorEl) {
    if (menuOpen) { closeMenu(); return; }
    var rect = anchorEl.getBoundingClientRect();
    menu.style.left = (rect.right + 10) + 'px';
    menu.style.top  = Math.min(rect.top, window.innerHeight - 180) + 'px';
    menu.classList.add('open');
    menuOpen = true;
  }

  function closeMenu() {
    if (menu) menu.classList.remove('open');
    menuOpen = false;
  }

  /* ── Inyectar en sidebar desktop ──────────────────────── */
  function injectDesktop(sidebar) {
    var btn = document.createElement('button');
    btn.id        = '_ah-sl-btn';
    btn.className = 'aura-sl-btn';
    btn.title     = 'Ayuda';
    btn.setAttribute('aria-label', 'Ayuda');
    btn.innerHTML = IC_HELP + '<span class="aura-sl-lbl">Ayuda</span>';
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu(btn);
    });

    // Insertarlo antes del último botón (logout/config) o al final
    var lastBtn = sidebar.querySelector('.aura-sl-btn:last-child');
    if (lastBtn) {
      sidebar.insertBefore(btn, lastBtn);
    } else {
      sidebar.appendChild(btn);
    }
  }

  /* ── Inyectar en drawer móvil ─────────────────────────── */
  function injectMobile(drawer) {
    var btn = document.createElement('button');
    btn.id = '_ah-mob-btn';
    btn.innerHTML = IC_HELP + '<span>Ayuda y sugerencias</span>';
    btn.addEventListener('click', function () {
      // Cerrar el drawer primero
      if (typeof window._auraMobCloseAll === 'function') window._auraMobCloseAll();
      setTimeout(openModal, 300);
    });

    // Insertar antes del botón de logout (danger)
    var danger = drawer.querySelector('.navlink.danger, #_mobOutBtn');
    var div = document.createElement('div');
    div.style.cssText = 'height:1px;background:rgba(255,255,255,.06);margin:6px 16px;';
    if (danger) {
      drawer.insertBefore(div, danger);
      drawer.insertBefore(btn, danger);
    } else {
      drawer.appendChild(div);
      drawer.appendChild(btn);
    }
  }

  /* ── Modal de sugerencias ─────────────────────────────── */
  var overlay = null, formView = null, successView = null;
  var state = { cat: null, media: 'cancion' };

  function buildModal() {
    overlay = document.createElement('div');
    overlay.id = '_ah-overlay';

    var modal = document.createElement('div');
    modal.id = '_ah-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    // FORM VIEW
    formView = document.createElement('div');
    formView.id = '_ah-form-view';
    formView.style.cssText = 'display:flex;flex-direction:column;min-height:0;';
    formView.innerHTML = [
      '<div class="_ah-m-head">',
        '<div class="_ah-m-ic">' + IC_IDEA + '</div>',
        '<div class="_ah-m-head-tx">',
          '<div class="_ah-kick">tu voz cuenta</div>',
          '<h2>Sugerencias y peticiones</h2>',
          '<p>Cuéntanos qué mejorarías, reporta un error o pide una canción o película.</p>',
        '</div>',
        '<button class="_ah-close" id="_ah-close-btn" aria-label="Cerrar">' + IC_X + '</button>',
      '</div>',

      '<div class="_ah-m-body">',
        /* categorías */
        '<div class="_ah-field">',
          '<label>¿Qué nos quieres compartir? <span class="req">*</span></label>',
          '<div class="_ah-cats" id="_ah-cats">',
            _cat('bug',     IC_BUG,   'Bug / Error',       'Algo no funciona'),
            _cat('idea',    IC_IDEA,  'Sugerencia',         'Una idea o mejora'),
            _cat('content', IC_CONT,  'Pedir contenido',    'Canción o película'),
            _cat('other',   IC_OTH,   'Otra solicitud',     'Cualquier otra cosa'),
          '</div>',
        '</div>',

        /* bloque condicional: contenido */
        '<div class="_ah-cond" id="_ah-content-block">',
          '<div class="_ah-cond-card">',
            '<div class="_ah-field" style="margin-top:0;">',
              '<label>¿Qué quieres que agreguemos? <span class="req">*</span></label>',
              '<div class="_ah-seg" id="_ah-media-seg">',
                '<button type="button" class="on" data-media="cancion">' + IC_MUSIC + ' Canción</button>',
                '<button type="button" data-media="pelicula">' + IC_FILM + ' Película</button>',
              '</div>',
            '</div>',
            '<div class="_ah-two">',
              '<div class="_ah-field"><label id="_ah-title-lbl">Título de la canción <span class="req">*</span></label>',
                '<input class="_ah-inp" id="_ah-title" placeholder="Ej. Bohemian Rhapsody"></div>',
              '<div class="_ah-field"><label id="_ah-by-lbl">Artista <span class="opt">(opcional)</span></label>',
                '<input class="_ah-inp" id="_ah-by" placeholder="Ej. Queen"></div>',
            '</div>',
            '<div class="_ah-field">',
              '<label>¿En qué idioma? <span class="req">*</span></label>',
              '<select class="_ah-sel" id="_ah-lang">',
                '<option value="" disabled selected>Selecciona un idioma…</option>',
                ['Inglés','Español','Francés','Alemán','Italiano','Portugués','Japonés','Coreano','Chino (mandarín)','Otro'].map(function(l){return '<option>'+l+'</option>';}).join(''),
              '</select>',
            '</div>',
            '<div class="_ah-hint">' + IC_INFO + ' Indícanos el idioma para preparar los ejercicios y subtítulos correctos.</div>',
          '</div>',
        '</div>',

        /* mensaje */
        '<div class="_ah-field">',
          '<label id="_ah-msg-lbl">Cuéntanos los detalles <span class="req">*</span></label>',
          '<textarea class="_ah-ta" id="_ah-message" maxlength="600" placeholder="Escribe aquí…"></textarea>',
          '<div class="_ah-cc"><span id="_ah-count">0</span>/600</div>',
        '</div>',

        /* email */
        '<div class="_ah-field" style="margin-top:6px;">',
          '<label>Tu correo <span class="opt">(opcional, para darte seguimiento)</span></label>',
          '<input class="_ah-inp" id="_ah-email" type="email" placeholder="tucorreo@ejemplo.com">',
        '</div>',
      '</div>',

      '<div class="_ah-m-foot">',
        '<span class="note">Tu reporte llega directo al equipo de Aura.</span>',
        '<button class="_ah-btn ghost" id="_ah-cancel-btn">Cancelar</button>',
        '<button class="_ah-btn send" id="_ah-send-btn" disabled>Enviar ' + IC_SEND + '</button>',
      '</div>'
    ].join('');

    // SUCCESS VIEW
    successView = document.createElement('div');
    successView.className = '_ah-success';
    successView.id = '_ah-success-view';
    successView.innerHTML = [
      '<div class="_ah-tick">' + IC_CHECK + '</div>',
      '<h2>¡Gracias<em id="_ah-thanks-name"></em>!</h2>',
      '<p id="_ah-success-msg">Recibimos tu mensaje. Nuestro equipo lo revisará pronto.</p>',
      '<div class="_ah-ticket">Ticket <b id="_ah-ticket-id">#AUR-0000</b></div>',
      '<button class="_ah-btn send" id="_ah-done-btn" style="margin-top:26px;">Listo</button>'
    ].join('');

    modal.appendChild(formView);
    modal.appendChild(successView);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    _wireModal();
  }

  function _cat(key, ic, label, sub) {
    return '<button type="button" class="_ah-cat" data-cat="' + key + '"><span class="_ah-cat-ic">' + ic + '</span><span class="_ah-cat-tx"><b>' + label + '</b><span>' + sub + '</span></span></button>';
  }

  function _wireModal() {
    var PH = {
      bug:     { ph: '¿Qué pasó? ¿En qué pantalla? ¿Qué esperabas que ocurriera?', lbl: 'Describe el error' },
      idea:    { ph: '¿Qué te gustaría que mejoráramos o añadiéramos?', lbl: 'Tu sugerencia' },
      content: { ph: 'Cuéntanos por qué te gustaría tener este contenido (opcional).', lbl: 'Notas adicionales' },
      other:   { ph: 'Escribe tu solicitud…', lbl: 'Cuéntanos los detalles' }
    };

    var cats      = overlay.querySelector('#_ah-cats');
    var cBlock    = overlay.querySelector('#_ah-content-block');
    var mediaSeg  = overlay.querySelector('#_ah-media-seg');
    var titleLbl  = overlay.querySelector('#_ah-title-lbl');
    var byLbl     = overlay.querySelector('#_ah-by-lbl');
    var titleInp  = overlay.querySelector('#_ah-title');
    var byInp     = overlay.querySelector('#_ah-by');
    var langSel   = overlay.querySelector('#_ah-lang');
    var msgLbl    = overlay.querySelector('#_ah-msg-lbl');
    var message   = overlay.querySelector('#_ah-message');
    var countEl   = overlay.querySelector('#_ah-count');
    var sendBtn   = overlay.querySelector('#_ah-send-btn');

    // Categorías
    cats.querySelectorAll('._ah-cat').forEach(function (btn) {
      btn.addEventListener('click', function () {
        cats.querySelectorAll('._ah-cat').forEach(function (c) { c.classList.remove('sel'); });
        btn.classList.add('sel');
        state.cat = btn.dataset.cat;
        cBlock.classList.toggle('show', state.cat === 'content');
        msgLbl.firstChild.textContent = PH[state.cat].lbl + ' ';
        message.placeholder = PH[state.cat].ph;
        msgLbl.querySelector('.req').style.display = state.cat === 'content' ? 'none' : '';
        _validate(titleInp, langSel, message, sendBtn);
      });
    });

    // Media toggle
    mediaSeg.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        mediaSeg.querySelectorAll('button').forEach(function (b) { b.classList.remove('on'); });
        btn.classList.add('on');
        state.media = btn.dataset.media;
        var peli = state.media === 'pelicula';
        titleLbl.firstChild.textContent = peli ? 'Título de la película ' : 'Título de la canción ';
        byLbl.firstChild.textContent    = peli ? 'Director / reparto '    : 'Artista ';
        titleInp.placeholder = peli ? 'Ej. El Padrino'        : 'Ej. Bohemian Rhapsody';
        byInp.placeholder    = peli ? 'Ej. Francis Ford Coppola' : 'Ej. Queen';
        _validate(titleInp, langSel, message, sendBtn);
      });
    });

    // Contador
    message.addEventListener('input', function () {
      countEl.textContent = message.value.length;
      _validate(titleInp, langSel, message, sendBtn);
    });
    [titleInp, langSel].forEach(function (el) { el.addEventListener('input', function () { _validate(titleInp, langSel, message, sendBtn); }); });

    // Enviar
    sendBtn.addEventListener('click', function () {
      _submitSuggestion({
        cat:     state.cat,
        media:   state.media,
        title:   titleInp.value.trim(),
        by:      byInp.value.trim(),
        lang:    langSel.value,
        message: message.value.trim(),
        email:   overlay.querySelector('#_ah-email').value.trim()
      });
    });

    // Cerrar
    overlay.querySelector('#_ah-close-btn').addEventListener('click', closeModal);
    overlay.querySelector('#_ah-cancel-btn').addEventListener('click', closeModal);
    overlay.querySelector('#_ah-done-btn').addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
    });
  }

  function _validate(titleInp, langSel, message, sendBtn) {
    var ok = !!state.cat;
    if (state.cat === 'content') {
      ok = ok && titleInp.value.trim().length > 1 && !!langSel.value;
    } else if (state.cat) {
      ok = ok && message.value.trim().length > 2;
    } else { ok = false; }
    sendBtn.disabled = !ok;
  }

  function _submitSuggestion(data) {
    var id = '#AUR-' + Math.floor(1000 + Math.random() * 9000);
    var msgs = {
      bug:  'Gracias por reportarlo. Revisaremos el error lo antes posible.',
      idea: '¡Tu sugerencia quedó registrada. Nos encanta recibir ideas!',
      other:'Recibimos tu solicitud. Te responderemos pronto.'
    };
    var msg = msgs[data.cat] || '';
    if (data.cat === 'content') {
      var tipo = data.media === 'pelicula' ? 'la película' : 'la canción';
      msg = 'Anotamos tu petición de ' + tipo + (data.title ? ' "' + data.title + '"' : '') + (data.lang ? ' en ' + data.lang : '') + '. Si la añadimos, te avisaremos.';
    }

    // Guardar en Supabase (best-effort)
    try {
      if (window._aura && window._aura.sb) {
        var row = {
          category: data.cat,
          media_type: data.media || null,
          title: data.title || null,
          by_field: data.by || null,
          language: data.lang || null,
          message: data.message || null,
          email: data.email || null,
          ticket_id: id,
          page: location.pathname.split('/').pop()
        };
        if (window._aura.userId) row.user_id = window._aura.userId;
        window._aura.sb.from('suggestions').insert(row).then(function(){}).catch(function(){});
      }
    } catch (e) {}

    // Mostrar éxito
    var nameEl = overlay.querySelector('#_ah-thanks-name');
    if (nameEl) {
      var nombre = '';
      try { nombre = (window._aura && window._aura.profile && window._aura.profile.nombre) ? ', ' + window._aura.profile.nombre.split(' ')[0] : ''; } catch(e) {}
      nameEl.textContent = nombre;
    }
    var msgEl = overlay.querySelector('#_ah-success-msg');
    if (msgEl) msgEl.textContent = msg;
    var tickEl = overlay.querySelector('#_ah-ticket-id');
    if (tickEl) tickEl.textContent = id;

    formView.style.display = 'none';
    successView.classList.add('show');
  }

  function openModal() {
    if (!overlay) buildModal();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(_resetModal, 280);
  }

  function _resetModal() {
    successView.classList.remove('show');
    formView.style.display = 'flex';
    overlay.querySelectorAll('._ah-cat').forEach(function (c) { c.classList.remove('sel'); });
    overlay.querySelector('#_ah-content-block').classList.remove('show');
    state = { cat: null, media: 'cancion' };
    ['#_ah-title','#_ah-by','#_ah-message','#_ah-email'].forEach(function (sel) {
      var el = overlay.querySelector(sel); if (el) el.value = '';
    });
    var ls = overlay.querySelector('#_ah-lang'); if (ls) ls.selectedIndex = 0;
    var ct = overlay.querySelector('#_ah-count'); if (ct) ct.textContent = '0';
    var sb = overlay.querySelector('#_ah-send-btn'); if (sb) sb.disabled = true;
    var ms = overlay.querySelector('#_ah-media-seg');
    if (ms) { ms.querySelectorAll('button').forEach(function(b,i){b.classList.toggle('on',i===0);}); }
  }

  /* ── API pública ─────────────────────────────────────── */
  window.openAuraHelp   = openModal;
  window.openAuraSuggest = openModal;

  /* ── Init ────────────────────────────────────────────── */
  function init() {
    injectCSS();
    buildMenu();

    // Desktop sidebar
    waitFor('#leftSidebar', injectDesktop);

    // Mobile drawer
    waitFor('#_aura-mob-left', injectMobile);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 800); });
  } else {
    setTimeout(init, 800);
  }

})();

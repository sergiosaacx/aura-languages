/* aura-profile-dd.js — Dropdown de perfil unificado para todas las páginas de Aura Languages */
(function () {
  'use strict';

  /* ── CSS ──────────────────────────────────────────────────────── */
  var CSS = [
    ':root{--dd-merit:var(--merit,#c084fc);--dd-bronze:var(--bronze,#cd7f32)}',
    '.aura-dd-wrap{position:fixed;width:360px;z-index:9999;display:none;',
    'filter:drop-shadow(0 30px 60px rgba(0,0,0,.75));animation:aura-dd-in .18s ease-out}',
    '@keyframes aura-dd-in{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}',
    '.aura-dd-wrap.open{display:block}',
    '.aura-dd-wrap::before{content:"";position:absolute;top:-7px;right:32px;width:14px;height:14px;',
    'background:var(--card,#171717);border-left:1px solid var(--line,#262626);border-top:1px solid var(--line,#262626);',
    'transform:rotate(45deg);z-index:1}',
    '.aura-dd{background:var(--card,#171717);border:1px solid var(--line,#262626);border-radius:18px;',
    'padding:18px;display:flex;flex-direction:column;gap:14px;position:relative;overflow:hidden}',
    '.aura-dd::before{content:"";position:absolute;inset:0;pointer-events:none;',
    'background:radial-gradient(220px 160px at 100% 0%,rgba(196,255,61,.05),transparent 60%)}',
    '.aura-dd>*{position:relative}',
    /* Head */
    '.aura-dd-head{display:flex;align-items:center;gap:14px}',
    '.aura-dd-av{position:relative;width:60px;height:60px;border-radius:50%;',
    'background:linear-gradient(135deg,#c4ff3d,#7a9d1f);flex-shrink:0;overflow:hidden;',
    'border:2px solid rgba(196,255,61,.4);box-shadow:0 0 24px rgba(196,255,61,.18);',
    'display:flex;align-items:center;justify-content:center;font-weight:800;font-size:22px;',
    'color:var(--accent-ink,#0c0c0c)}',
    '.aura-dd-av-edit{position:absolute;bottom:-2px;right:-2px;width:24px;height:24px;border-radius:50%;',
    'background:var(--accent,#c4ff3d);color:var(--accent-ink,#0c0c0c);',
    'display:flex;align-items:center;justify-content:center;border:2px solid var(--card,#171717);',
    'cursor:pointer;transition:transform .15s;flex-shrink:0}',
    '.aura-dd-av-edit:hover{transform:scale(1.1)}',
    '.aura-dd-av-edit svg{width:11px;height:11px;stroke:currentColor;fill:none;stroke-width:2.2}',
    '.aura-dd-meta{flex:1;display:flex;flex-direction:column;gap:3px;min-width:0}',
    '.aura-dd-meta b{font-size:16px;font-weight:800;color:var(--ink,#f5f5f5);letter-spacing:-.01em;line-height:1.1}',
    '.aura-dd-meta-row{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:2px}',
    '.aura-dd-lv{font-family:var(--mono,monospace);font-size:9.5px;font-weight:800;',
    'color:var(--accent,#c4ff3d);background:rgba(196,255,61,.12);border:1px solid rgba(196,255,61,.2);',
    'padding:3px 7px;border-radius:5px;letter-spacing:.08em;text-transform:uppercase}',
    '.aura-dd-rk{font-family:var(--mono,monospace);font-size:9.5px;font-weight:800;',
    'color:var(--dd-bronze);background:rgba(205,127,50,.12);border:1px solid rgba(205,127,50,.25);',
    'padding:3px 7px;border-radius:5px;letter-spacing:.08em;text-transform:uppercase;',
    'display:flex;align-items:center;gap:4px}',
    '.aura-dd-rk::before{content:"";width:5px;height:5px;border-radius:50%;',
    'background:var(--dd-bronze);box-shadow:0 0 6px var(--dd-bronze)}',
    '.aura-dd-link{margin-top:4px;font-family:var(--mono,monospace);font-size:10px;',
    'color:var(--muted,#7a7a7a);display:flex;align-items:center;gap:5px;text-decoration:none}',
    '.aura-dd-link:hover{color:var(--accent,#c4ff3d)}',
    '.aura-dd-link svg{width:10px;height:10px;stroke:currentColor;fill:none;stroke-width:2.2}',
    /* Points */
    '.aura-dd-pts{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
    '.aura-dd-pt{border:1px solid var(--line,#262626);border-radius:12px;padding:11px 12px;',
    'display:flex;flex-direction:column;gap:6px;position:relative;overflow:hidden}',
    '.aura-dd-pt.ap{border-color:rgba(196,255,61,.18);background:rgba(196,255,61,.04)}',
    '.aura-dd-pt.pm{border-color:rgba(192,132,252,.2);background:rgba(192,132,252,.04)}',
    '.aura-dd-pt-top{display:flex;align-items:center;gap:7px}',
    '.aura-dd-ic{width:22px;height:22px;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0}',
    '.aura-dd-pt.ap .aura-dd-ic{background:var(--accent,#c4ff3d);color:var(--accent-ink,#0c0c0c)}',
    '.aura-dd-pt.pm .aura-dd-ic{background:var(--dd-merit);color:#0c0c0c}',
    '.aura-dd-ic svg{width:12px;height:12px;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
    '.aura-dd-ic.fill svg{fill:currentColor;stroke:none}',
    '.aura-dd-pt-nm{font-family:var(--mono,monospace);font-size:9px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}',
    '.aura-dd-pt.ap .aura-dd-pt-nm{color:var(--accent,#c4ff3d)}',
    '.aura-dd-pt.pm .aura-dd-pt-nm{color:var(--dd-merit)}',
    '.aura-dd-pt-val{font-size:20px;font-weight:800;color:var(--ink,#f5f5f5);letter-spacing:-.02em;line-height:1;font-feature-settings:"tnum"}',
    '.aura-dd-pt-dl{font-family:var(--mono,monospace);font-size:9.5px;color:var(--muted,#7a7a7a)}',
    '.aura-dd-pt-dl b{color:var(--ink,#f5f5f5);font-weight:700}',
    /* Section header */
    '.aura-dd-sh{display:flex;align-items:center;justify-content:space-between}',
    '.aura-dd-sh span{font-family:var(--mono,monospace);font-size:9.5px;font-weight:800;',
    'letter-spacing:.18em;text-transform:uppercase;color:var(--muted,#7a7a7a)}',
    '.aura-dd-sh b{font-family:var(--mono,monospace);font-size:10px;color:var(--accent,#c4ff3d);font-weight:700}',
    /* Language list */
    '.aura-dd-langs{display:flex;flex-direction:column;gap:6px;background:#0e0e0e;',
    'border:1px solid var(--line,#262626);border-radius:12px;padding:6px}',
    '.aura-dd-lang{display:grid;grid-template-columns:30px 1fr auto auto;gap:11px;',
    'align-items:center;padding:8px 10px;border-radius:8px;cursor:pointer;transition:background .15s;',
    'width:100%;text-align:left;font:inherit;color:inherit;border:none;background:none}',
    '.aura-dd-lang:hover{background:rgba(255,255,255,.04)}',
    '.aura-dd-lang.active{background:rgba(196,255,61,.08)}',
    '.aura-dd-flag{width:30px;height:22px;border-radius:4px;overflow:hidden;',
    'display:flex;flex-direction:column;box-shadow:0 0 0 1px rgba(255,255,255,.08) inset;',
    'flex-shrink:0;position:relative}',
    '.aura-dd-flag i{flex:1;display:block}',
    /* EN */
    '.aura-dd-lang.en .aura-dd-flag{background:#012169}',
    '.aura-dd-lang.en .aura-dd-flag::before{content:"";position:absolute;inset:0;background:',
    'linear-gradient(to bottom right,transparent calc(50% - 1px),#fff calc(50% - 1px),#fff calc(50% + 1px),transparent calc(50% + 1px)),',
    'linear-gradient(to bottom left,transparent calc(50% - 1px),#fff calc(50% - 1px),#fff calc(50% + 1px),transparent calc(50% + 1px))}',
    '.aura-dd-lang.en .aura-dd-flag::after{content:"";position:absolute;inset:0;background:',
    'linear-gradient(to right,transparent calc(50% - 2px),#c8102e calc(50% - 2px),#c8102e calc(50% + 2px),transparent calc(50% + 2px)),',
    'linear-gradient(to bottom,transparent calc(50% - 2px),#c8102e calc(50% - 2px),#c8102e calc(50% + 2px),transparent calc(50% + 2px))}',
    /* FR */
    '.aura-dd-lang.fr .aura-dd-flag{flex-direction:row}',
    '.aura-dd-lang.fr .aura-dd-flag i:nth-child(1){background:#0055a4}',
    '.aura-dd-lang.fr .aura-dd-flag i:nth-child(2){background:#fff}',
    '.aura-dd-lang.fr .aura-dd-flag i:nth-child(3){background:#ef4135}',
    /* IT */
    '.aura-dd-lang.it .aura-dd-flag{flex-direction:row}',
    '.aura-dd-lang.it .aura-dd-flag i:nth-child(1){background:#008c45}',
    '.aura-dd-lang.it .aura-dd-flag i:nth-child(2){background:#f4f5f0}',
    '.aura-dd-lang.it .aura-dd-flag i:nth-child(3){background:#cd212a}',
    /* ES */
    '.aura-dd-lang.es .aura-dd-flag{flex-direction:column}',
    '.aura-dd-lang.es .aura-dd-flag i:nth-child(1){background:#aa151b;flex:1}',
    '.aura-dd-lang.es .aura-dd-flag i:nth-child(2){background:#f1bf00;flex:2}',
    '.aura-dd-lang.es .aura-dd-flag i:nth-child(3){background:#aa151b;flex:1}',
    /* PT */
    '.aura-dd-lang.pt .aura-dd-flag{flex-direction:row}',
    '.aura-dd-lang.pt .aura-dd-flag i:nth-child(1){background:#046a38;flex:2;position:relative}',
    '.aura-dd-lang.pt .aura-dd-flag i:nth-child(1)::after{content:"";position:absolute;top:50%;right:-3px;',
    'transform:translateY(-50%);width:6px;height:6px;border-radius:50%;background:#ffc726;box-shadow:0 0 0 1px #fff}',
    '.aura-dd-lang.pt .aura-dd-flag i:nth-child(2){background:#da291c;flex:3}',
    /* Lang meta */
    '.aura-dd-lang-name{display:flex;flex-direction:column;gap:1px;min-width:0}',
    '.aura-dd-lang-name b{font-size:13px;font-weight:700;color:var(--ink,#f5f5f5);letter-spacing:-.005em;line-height:1.15}',
    '.aura-dd-lang.active .aura-dd-lang-name b{color:var(--accent,#c4ff3d)}',
    '.aura-dd-lang-name span{font-family:var(--mono,monospace);font-size:9.5px;color:var(--muted,#7a7a7a);letter-spacing:.04em}',
    '.aura-dd-lang-prog{font-family:var(--mono,monospace);font-size:9.5px;color:var(--muted,#7a7a7a);white-space:nowrap}',
    '.aura-dd-lang-prog b{color:var(--ink,#f5f5f5);font-weight:700}',
    '.aura-dd-lang.active .aura-dd-lang-prog b{color:var(--accent,#c4ff3d)}',
    '.aura-dd-chk{width:20px;height:20px;border-radius:50%;border:1.5px solid var(--line-2,#333);',
    'display:flex;align-items:center;justify-content:center;color:transparent;flex-shrink:0;transition:.15s}',
    '.aura-dd-lang.active .aura-dd-chk{background:var(--accent,#c4ff3d);border-color:var(--accent,#c4ff3d);',
    'color:var(--accent-ink,#0c0c0c);box-shadow:0 0 12px rgba(196,255,61,.4)}',
    '.aura-dd-chk svg{width:11px;height:11px;stroke:currentColor;fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}',
    /* Footer */
    '.aura-dd-foot{display:flex;flex-direction:column;gap:2px;',
    'border-top:1px solid var(--line,#262626);padding-top:10px;margin-top:2px}',
    '.aura-dd-act{display:flex;align-items:center;gap:10px;padding:9px 8px;border-radius:8px;',
    'font-size:13px;font-weight:600;color:var(--ink-2,#c8c8c8);text-align:left;width:100%;',
    'transition:.15s;cursor:pointer;font:inherit;border:none;background:none}',
    '.aura-dd-act:hover{background:rgba(255,255,255,.04);color:var(--ink,#f5f5f5)}',
    '.aura-dd-act svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.8;',
    'stroke-linecap:round;stroke-linejoin:round;flex-shrink:0}',
    '.aura-dd-arr{margin-left:auto;color:var(--muted,#7a7a7a);font-size:11px}',
    '.aura-dd-act.danger{color:#ff8a8a}',
    '.aura-dd-act.danger:hover{background:rgba(255,90,90,.08);color:#ff5a5a}'
  ].join('');

  /* ── HTML ──────────────────────────────────────────────────────── */
  var HTML = '<div class="aura-dd-wrap" id="auraDd">'
    + '<div class="aura-dd">'
    /* Head */
    + '<div class="aura-dd-head">'
    +   '<div class="aura-dd-av" id="auraDdAv">'
    +     '<button class="aura-dd-av-edit" id="auraDdEdit" title="Cambiar foto de perfil">'
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
    /* Points */
    + '<div class="aura-dd-pts">'
    +   '<div class="aura-dd-pt ap">'
    +     '<div class="aura-dd-pt-top">'
    +       '<div class="aura-dd-ic fill"><svg viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg></div>'
    +       '<span class="aura-dd-pt-nm">Aura</span>'
    +     '</div>'
    +     '<span class="aura-dd-pt-val" id="auraDdAP">—</span>'
    +     '<span class="aura-dd-pt-dl">▲ <b id="auraDdAPd">+0</b> esta semana</span>'
    +   '</div>'
    +   '<div class="aura-dd-pt pm">'
    +     '<div class="aura-dd-pt-top">'
    +       '<div class="aura-dd-ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"></circle><path d="M9 13l-3 9 6-3 6 3-3-9"></path></svg></div>'
    +       '<span class="aura-dd-pt-nm">Mérito</span>'
    +     '</div>'
    +     '<span class="aura-dd-pt-val" id="auraDdPM">—</span>'
    +     '<span class="aura-dd-pt-dl">▲ <b id="auraDdPMd">+0</b> esta semana</span>'
    +   '</div>'
    + '</div>'
    /* Languages */
    + '<div class="aura-dd-sh"><span>Idioma que aprendo</span><b>5 disponibles</b></div>'
    + '<div class="aura-dd-langs">'
    + _langBtn('en','Inglés','english · A1-C2','<i></i>')
    + _langBtn('fr','Francés','français · A1-B2','<i></i><i></i><i></i>')
    + _langBtn('it','Italiano','italiano · A1-B2','<i></i><i></i><i></i>')
    + _langBtn('es','Español','nativo · referencia','<i></i><i></i><i></i>')
    + _langBtn('pt','Portugués','português · A1-B2','<i></i><i></i>')
    + '</div>'
    /* Footer */
    + '<div class="aura-dd-foot">'
    +   '<button class="aura-dd-act" onclick="window.location.href=\'settings.html\'">'
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

  function _langBtn(code, name, sub, flagInner) {
    return '<button class="aura-dd-lang ' + code + '" onclick="_auraDdLang(\'' + code + '\')">'
      + '<span class="aura-dd-flag">' + flagInner + '</span>'
      + '<span class="aura-dd-lang-name"><b>' + name + '</b><span>' + sub + '</span></span>'
      + '<span class="aura-dd-lang-prog" id="auraDdLp' + code.toUpperCase() + '">—</span>'
      + '<span class="aura-dd-chk"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg></span>'
      + '</button>';
  }

  /* ── Init ──────────────────────────────────────────────────────── */
  function init() {
    /* Inject CSS */
    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    /* Inject dropdown into body */
    document.body.insertAdjacentHTML('beforeend', HTML);

    /* Find the profile trigger — tb-profile or tbProfileBtn */
    var trigger = document.getElementById('tbProfileBtn') || document.querySelector('.tb-profile');
    if (!trigger) return;

    /* Neutralize old onclick */
    trigger.removeAttribute('onclick');
    trigger.style.cursor = 'pointer';

    /* Remove old dropdowns */
    ['tbDropdown','profileMenu','c1Pdd'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.parentNode.removeChild(el);
    });

    /* Edit button → photo upload */
    var editBtn = document.getElementById('auraDdEdit');
    if (editBtn) {
      editBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (typeof triggerPhotoUpload === 'function') triggerPhotoUpload();
      });
    }

    /* Cerrar sesión */
    var outBtn = document.getElementById('auraDdOut');
    if (outBtn) {
      outBtn.addEventListener('click', function() {
        if (typeof cerrarSesion === 'function') cerrarSesion();
      });
    }

    /* Toggle on trigger click */
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      var dd = document.getElementById('auraDd');
      if (!dd) return;
      if (dd.classList.contains('open')) {
        _auraDdClose();
      } else {
        _auraDdFill();
        _auraDdPosition(trigger);
        dd.classList.add('open');
        var caret = document.getElementById('tbCaret') || trigger.querySelector('.tb-caret');
        if (caret) caret.style.transform = 'rotate(180deg)';
      }
    });

    /* Close on outside click */
    document.addEventListener('click', function(e) {
      var dd = document.getElementById('auraDd');
      if (dd && !dd.contains(e.target) && !trigger.contains(e.target)) {
        _auraDdClose();
      }
    });

    /* Stop propagation inside dropdown */
    var dd = document.getElementById('auraDd');
    if (dd) dd.addEventListener('click', function(e) { e.stopPropagation(); });
  }

  /* ── Position (fixed, computed from trigger rect) ─────────────── */
  function _auraDdPosition(trigger) {
    var dd = document.getElementById('auraDd');
    if (!dd) return;
    var rect = trigger.getBoundingClientRect();
    var ddW = 360;
    var rightEdge = rect.right;
    var left = rightEdge - ddW;
    if (left < 8) left = 8;
    dd.style.top = (rect.bottom + 10) + 'px';
    dd.style.left = left + 'px';
    dd.style.right = 'auto';
  }

  /* ── Close ─────────────────────────────────────────────────────── */
  function _auraDdClose() {
    var dd = document.getElementById('auraDd');
    if (dd) dd.classList.remove('open');
    var caret = document.getElementById('tbCaret') || document.querySelector('.tb-caret');
    if (caret) caret.style.transform = '';
  }

  /* ── Fill data ─────────────────────────────────────────────────── */
  window._auraDdFill = function() {
    var aura = window._aura || {};

    /* Avatar: copy from tbAvatar */
    var srcAv = document.getElementById('tbAvatar');
    var dstAv = document.getElementById('auraDdAv');
    if (srcAv && dstAv) {
      var editBtnEl = dstAv.querySelector('.aura-dd-av-edit');
      dstAv.innerHTML = srcAv.innerHTML;
      if (editBtnEl) dstAv.appendChild(editBtnEl);
    }

    /* Name */
    var nameEl = document.getElementById('tbNameText') || document.querySelector('.tb-name b');
    var ddName = document.getElementById('auraDdName');
    if (ddName && nameEl) ddName.textContent = nameEl.textContent || '—';

    /* Level */
    var nivel = aura.nivel || 1;
    var ddLv = document.getElementById('auraDdLv');
    if (ddLv) ddLv.textContent = 'Lv ' + nivel;

    /* Rank with dynamic color */
    var rango = aura.rango || 'Bronce';
    var RANK_C = {Bronce:'#cd7f32',Plata:'#94a3b8',Oro:'#fbbf24',Platino:'#67e8f9',Diamante:'#818cf8',Challenger:'#c084fc'};
    var ddRk = document.getElementById('auraDdRk');
    if (ddRk) {
      ddRk.textContent = rango;
      var rc = RANK_C[rango] || '#cd7f32';
      ddRk.style.color = rc;
      /* convert hex to rgba for border */
      var r = parseInt(rc.slice(1,3),16), g = parseInt(rc.slice(3,5),16), b = parseInt(rc.slice(5,7),16);
      ddRk.style.borderColor = 'rgba('+r+','+g+','+b+',.28)';
      ddRk.style.background = 'rgba('+r+','+g+','+b+',.1)';
    }

    /* Points */
    var ap = (aura.auraPoints !== undefined ? aura.auraPoints : (aura.ap || 0));
    var pm = (aura.meritPoints !== undefined ? aura.meritPoints : (aura.pm || 0));
    var apEl = document.getElementById('auraDdAP'), pmEl = document.getElementById('auraDdPM');
    if (apEl) apEl.textContent = ap.toLocaleString('es-CO');
    if (pmEl) pmEl.textContent = pm.toLocaleString('es-CO');

    /* Active language */
    var activeLang = aura.lang || aura.active_language || 'en';
    var unlocked = aura.langsUnlocked || aura.languages_unlocked || ['en'];
    var LANG_PROG = {en:{l:'B2',p:38},fr:{l:'A2',p:12},it:null,es:null,pt:null};

    ['en','fr','it','es','pt'].forEach(function(code) {
      var row = document.querySelector('.aura-dd-lang.' + code);
      if (!row) return;
      var isActive = (activeLang === code);
      var isUnlocked = (unlocked.indexOf(code) >= 0);
      row.classList.toggle('active', isActive);
      row.style.opacity = isUnlocked ? '1' : '0.5';

      var progEl = document.getElementById('auraDdLp' + code.toUpperCase());
      if (progEl) {
        if (code === 'es') { progEl.textContent = 'nativo'; progEl.innerHTML = 'nativo'; }
        else if (!isUnlocked) { progEl.textContent = 'empezar →'; }
        else {
          var p = LANG_PROG[code];
          if (p) progEl.innerHTML = '<b>' + p.l + '</b> · ' + p.p + '%';
          else progEl.textContent = 'empezar →';
        }
      }
    });
  };
  var _auraDdFill = window._auraDdFill;

  /* ── Language switch ───────────────────────────────────────────── */
  window._auraDdLang = function(code) {
    var aura = window._aura;
    var unlocked = (aura && (aura.langsUnlocked || aura.languages_unlocked)) || ['en'];
    if (unlocked.indexOf(code) < 0) return;
    if (aura) {
      aura.lang = code;
      aura.active_language = code;
      try {
        var sb = (aura._sb || aura.sb);
        if (sb && aura.userId) sb.from('profiles').update({active_language: code}).eq('id', aura.userId).then(function(){});
      } catch(e) {}
    }
    _auraDdFill();
    _auraDdClose();
  };

  /* ── Boot ──────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

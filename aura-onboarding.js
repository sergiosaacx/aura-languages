/* ============================================================
   aura-onboarding.js  — Primeros pasos de usuario nuevo
   Aparece solo en home.html, solo la primera vez.
   Guarda respuestas en localStorage('aura_onboarding').
   Al terminar ofrece iniciar el tour (aura-tour.js).
   ============================================================ */
(function () {
  'use strict';

  var PAGE = location.pathname.split('/').pop() || 'home.html';
  if (PAGE !== 'home.html') return;
  if (localStorage.getItem('aura_onboarding_done') === '1') return;

  /* ── Preguntas ─────────────────────────────────────────── */
  var QUESTIONS = [
    {
      key: 'native_lang',
      icon: '🌍',
      title: '¿Cuál es tu idioma nativo?',
      type: 'select',
      options: [
        'Español','Portugués','Francés','Italiano',
        'Alemán','Chino','Japonés','Árabe','Hindi','Otro'
      ]
    },
    {
      key: 'goal',
      icon: '🎯',
      title: '¿Por qué quieres aprender inglés?',
      type: 'cards',
      options: [
        { val: 'work',      label: 'Trabajo',    icon: '💼' },
        { val: 'travel',    label: 'Viajes',      icon: '✈️' },
        { val: 'study',     label: 'Estudios',    icon: '🎓' },
        { val: 'fun',       label: 'Diversión',   icon: '🎮' }
      ]
    },
    {
      key: 'level',
      icon: '📊',
      title: '¿Cuál es tu nivel actual de inglés?',
      type: 'cards',
      options: [
        { val: 'beginner',      label: 'Principiante', icon: '🌱' },
        { val: 'basic',         label: 'Básico',        icon: '📖' },
        { val: 'intermediate',  label: 'Intermedio',    icon: '💬' },
        { val: 'advanced',      label: 'Avanzado',      icon: '🚀' }
      ]
    },
    {
      key: 'daily_minutes',
      icon: '⏱️',
      title: '¿Cuánto tiempo quieres practicar al día?',
      type: 'cards',
      options: [
        { val: '5',   label: '5 min',   icon: '⚡' },
        { val: '10',  label: '10 min',  icon: '🔥' },
        { val: '20',  label: '20 min',  icon: '💪' },
        { val: '30',  label: '30+ min', icon: '🏆' }
      ]
    },
    {
      key: 'skill_focus',
      icon: '🧠',
      title: '¿Qué habilidad quieres mejorar más?',
      type: 'cards',
      options: [
        { val: 'listening',  label: 'Escuchar',    icon: '👂' },
        { val: 'speaking',   label: 'Hablar',       icon: '🗣️' },
        { val: 'vocabulary', label: 'Vocabulario',  icon: '📚' },
        { val: 'all',        label: 'Todo',         icon: '⚡' }
      ]
    },
    {
      key: 'preferred_tool',
      icon: '🎬',
      title: '¿Cómo prefieres aprender?',
      type: 'cards',
      options: [
        { val: 'movies',     label: 'Películas',   icon: '🎬' },
        { val: 'music',      label: 'Música',       icon: '🎵' },
        { val: 'flashcards', label: 'Flashcards',   icon: '🃏' },
        { val: 'varied',     label: 'Variado',      icon: '🎯' }
      ]
    }
  ];

  var answers   = {};
  var current   = 0;
  var overlay   = null;
  var modal     = null;
  var selectVal = null;

  /* ── Esperar auth ──────────────────────────────────────── */
  function waitForAuth(cb, tries) {
    tries = tries || 0;
    if (tries > 40) return; // 10 s máximo
    if (window._aura && window._aura.userId) { cb(); return; }
    setTimeout(function () { waitForAuth(cb, tries + 1); }, 250);
  }

  /* ── CSS ───────────────────────────────────────────────── */
  function injectCSS() {
    var s = document.createElement('style');
    s.id = '_aura-ob-css';
    s.textContent = [
      '#_aura-ob-overlay{position:fixed;inset:0;background:rgba(8,7,26,.88);z-index:99990;display:flex;align-items:center;justify-content:center;padding:16px;}',
      '#_aura-ob-modal{background:#0e0c22;border:1px solid rgba(196,255,61,.22);border-radius:20px;width:100%;max-width:440px;padding:32px 28px 24px;position:relative;overflow:hidden;}',
      '._ob-glow{position:absolute;top:-60px;right:-60px;width:180px;height:180px;background:radial-gradient(circle,rgba(196,255,61,.07) 0%,transparent 70%);pointer-events:none;}',
      '._ob-prog{display:flex;gap:6px;margin-bottom:28px;}',
      '._ob-prog-dot{flex:1;height:3px;border-radius:99px;background:rgba(255,255,255,.1);transition:background .3s;}',
      '._ob-prog-dot.done{background:var(--accent,#c4ff3d);}',
      '._ob-prog-dot.active{background:rgba(196,255,61,.5);}',
      '._ob-q-icon{font-size:28px;margin-bottom:10px;display:block;}',
      '._ob-q-title{font-family:"Inter",sans-serif;font-size:18px;font-weight:800;color:#f0ede6;line-height:1.3;margin-bottom:20px;}',
      '._ob-select{width:100%;background:#18163a;border:1px solid rgba(255,255,255,.12);border-radius:10px;color:#f0ede6;font-size:14px;padding:10px 14px;outline:none;cursor:pointer;-webkit-appearance:none;appearance:none;}',
      '._ob-select:focus{border-color:rgba(196,255,61,.5);}',
      '._ob-cards{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:4px;}',
      '._ob-card{background:#18163a;border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:14px 10px;text-align:center;cursor:pointer;transition:border-color .2s,background .2s;}',
      '._ob-card:hover{border-color:rgba(196,255,61,.3);background:#1f1c40;}',
      '._ob-card.selected{border-color:var(--accent,#c4ff3d);background:rgba(196,255,61,.08);}',
      '._ob-card-ic{font-size:22px;display:block;margin-bottom:6px;}',
      '._ob-card-lbl{font-size:13px;font-weight:700;color:#f0ede6;}',
      '._ob-footer{display:flex;align-items:center;justify-content:space-between;margin-top:22px;}',
      '._ob-counter{font-size:12px;color:rgba(240,237,230,.4);}',
      '._ob-btn-next{background:var(--accent,#c4ff3d);color:#0a0a0f;border:none;border-radius:10px;font-size:13px;font-weight:800;padding:10px 22px;cursor:pointer;transition:opacity .15s;}',
      '._ob-btn-next:disabled{opacity:.35;cursor:not-allowed;}',
      '._ob-btn-next:not(:disabled):hover{opacity:.85;}',
      '._ob-btn-skip{background:none;border:none;font-size:12px;color:rgba(240,237,230,.35);cursor:pointer;text-decoration:underline;}',
      '._ob-btn-skip:hover{color:rgba(240,237,230,.7);}',
      /* Pantalla final */
      '._ob-finish{text-align:center;padding:8px 0;}',
      '._ob-finish-ic{font-size:48px;display:block;margin-bottom:12px;}',
      '._ob-finish-ti{font-size:22px;font-weight:800;color:#f0ede6;margin-bottom:8px;}',
      '._ob-finish-sub{font-size:13px;color:rgba(240,237,230,.55);line-height:1.5;margin-bottom:24px;}',
      '._ob-finish-btns{display:flex;flex-direction:column;gap:10px;}',
      '._ob-btn-tour{background:var(--accent,#c4ff3d);color:#0a0a0f;border:none;border-radius:12px;font-size:14px;font-weight:800;padding:13px;cursor:pointer;}',
      '._ob-btn-tour:hover{opacity:.85;}',
      '._ob-btn-later{background:none;border:1px solid rgba(255,255,255,.12);border-radius:12px;font-size:13px;font-weight:600;color:rgba(240,237,230,.6);padding:11px;cursor:pointer;}',
      '._ob-btn-later:hover{border-color:rgba(255,255,255,.25);color:#f0ede6;}',
      /* Fade in */
      '@keyframes _ob-fadein{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}',
      '._ob-fadein{animation:_ob-fadein .3s ease both;}'
    ].join('');
    document.head.appendChild(s);
  }

  /* ── Construir UI ──────────────────────────────────────── */
  function buildUI() {
    injectCSS();

    overlay = document.createElement('div');
    overlay.id = '_aura-ob-overlay';

    modal = document.createElement('div');
    modal.id = '_aura-ob-modal';

    var glow = document.createElement('div');
    glow.className = '_ob-glow';
    modal.appendChild(glow);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    renderQuestion(0);
  }

  /* ── Render pregunta ───────────────────────────────────── */
  function renderQuestion(n) {
    var q = QUESTIONS[n];
    modal.innerHTML = '';
    modal.className = '_ob-fadein';

    // glow decorativo
    var glow = document.createElement('div');
    glow.className = '_ob-glow';
    modal.appendChild(glow);

    // Barra de progreso
    var prog = document.createElement('div');
    prog.className = '_ob-prog';
    for (var i = 0; i < QUESTIONS.length; i++) {
      var dot = document.createElement('div');
      dot.className = '_ob-prog-dot' + (i < n ? ' done' : (i === n ? ' active' : ''));
      prog.appendChild(dot);
    }
    modal.appendChild(prog);

    // Icono
    var ic = document.createElement('span');
    ic.className = '_ob-q-icon';
    ic.textContent = q.icon;
    modal.appendChild(ic);

    // Título
    var ti = document.createElement('div');
    ti.className = '_ob-q-title';
    ti.textContent = q.title;
    modal.appendChild(ti);

    // Input
    if (q.type === 'select') {
      selectVal = answers[q.key] || null;
      var sel = document.createElement('select');
      sel.className = '_ob-select';
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = '— Selecciona —';
      placeholder.disabled = true;
      placeholder.selected = !selectVal;
      sel.appendChild(placeholder);
      q.options.forEach(function (opt) {
        var o = document.createElement('option');
        o.value = opt;
        o.textContent = opt;
        if (answers[q.key] === opt) o.selected = true;
        sel.appendChild(o);
      });
      sel.addEventListener('change', function () {
        selectVal = sel.value;
        answers[q.key] = selectVal;
        nextBtn.disabled = false;
      });
      modal.appendChild(sel);
      selectVal = answers[q.key] || null;
    } else {
      var grid = document.createElement('div');
      grid.className = '_ob-cards';
      q.options.forEach(function (opt) {
        var card = document.createElement('div');
        card.className = '_ob-card' + (answers[q.key] === opt.val ? ' selected' : '');
        card.innerHTML = '<span class="_ob-card-ic">' + opt.icon + '</span><span class="_ob-card-lbl">' + opt.label + '</span>';
        card.addEventListener('click', function () {
          grid.querySelectorAll('._ob-card').forEach(function (c) { c.classList.remove('selected'); });
          card.classList.add('selected');
          answers[q.key] = opt.val;
          nextBtn.disabled = false;
        });
        grid.appendChild(card);
      });
      modal.appendChild(grid);
    }

    // Footer
    var footer = document.createElement('div');
    footer.className = '_ob-footer';

    var skipBtn = document.createElement('button');
    skipBtn.className = '_ob-btn-skip';
    skipBtn.textContent = 'Saltar todo';
    skipBtn.addEventListener('click', skipAll);
    footer.appendChild(skipBtn);

    var right = document.createElement('div');
    right.style.display = 'flex';
    right.style.alignItems = 'center';
    right.style.gap = '12px';

    var counter = document.createElement('span');
    counter.className = '_ob-counter';
    counter.textContent = (n + 1) + ' / ' + QUESTIONS.length;
    right.appendChild(counter);

    var nextBtn = document.createElement('button');
    nextBtn.className = '_ob-btn-next';
    nextBtn.textContent = n === QUESTIONS.length - 1 ? 'Finalizar ✓' : 'Siguiente →';
    nextBtn.disabled = !(answers[q.key]);
    if (q.type === 'select' && selectVal) nextBtn.disabled = false;
    nextBtn.addEventListener('click', function () { advance(n); });
    right.appendChild(nextBtn);
    footer.appendChild(right);
    modal.appendChild(footer);
  }

  /* ── Avanzar ───────────────────────────────────────────── */
  function advance(n) {
    var q = QUESTIONS[n];
    if (!answers[q.key]) return;
    if (n < QUESTIONS.length - 1) {
      current = n + 1;
      renderQuestion(current);
    } else {
      saveAndFinish();
    }
  }

  /* ── Saltar todo ───────────────────────────────────────── */
  function skipAll() {
    localStorage.setItem('aura_onboarding_done', '1');
    fadeOut();
  }

  /* ── Guardar y mostrar pantalla final ──────────────────── */
  function saveAndFinish() {
    localStorage.setItem('aura_onboarding', JSON.stringify(answers));
    localStorage.setItem('aura_onboarding_done', '1');

    // Guardar en Supabase de forma asíncrona (best-effort)
    try {
      if (window._aura && window._aura.sb && window._aura.userId) {
        window._aura.sb.from('profiles')
          .update({ onboarding_data: answers })
          .eq('id', window._aura.userId)
          .then(function () {})
          .catch(function () {});
      }
    } catch (e) {}

    renderFinish();
  }

  /* ── Pantalla final — ¿Tour? ───────────────────────────── */
  function renderFinish() {
    modal.innerHTML = '';
    modal.className = '_ob-fadein';

    var glow = document.createElement('div');
    glow.className = '_ob-glow';
    modal.appendChild(glow);

    var wrap = document.createElement('div');
    wrap.className = '_ob-finish';

    wrap.innerHTML = [
      '<span class="_ob-finish-ic">🎉</span>',
      '<div class="_ob-finish-ti">¡Todo listo!</div>',
      '<div class="_ob-finish-sub">Hemos preparado tu perfil.<br>¿Quieres que te mostremos<br>cómo funciona la plataforma?</div>',
      '<div class="_ob-finish-btns">',
        '<button class="_ob-btn-tour" id="_ob-start-tour">¡Sí, muéstrame el tour! 🗺️</button>',
        '<button class="_ob-btn-later" id="_ob-later">Ahora no, explorar solo</button>',
      '</div>'
    ].join('');

    modal.appendChild(wrap);

    document.getElementById('_ob-start-tour').addEventListener('click', function () {
      fadeOut();
      if (typeof window.auraTourStart === 'function') {
        window.auraTourStart();
      }
    });

    document.getElementById('_ob-later').addEventListener('click', function () {
      fadeOut();
    });
  }

  /* ── Fade out y destruir ───────────────────────────────── */
  function fadeOut() {
    if (!overlay) return;
    overlay.style.transition = 'opacity .3s';
    overlay.style.opacity = '0';
    setTimeout(function () {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
      var css = document.getElementById('_aura-ob-css');
      if (css) css.parentNode.removeChild(css);
    }, 320);
  }

  /* ── Init ──────────────────────────────────────────────── */
  function start() {
    waitForAuth(buildUI);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(start, 900); });
  } else {
    setTimeout(start, 900);
  }

})();

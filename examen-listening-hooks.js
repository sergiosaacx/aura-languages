/* ══════════════════════════════════════════════════════════════════
   examen-listening-hooks.js
   ⚠️  PESTAÑA LISTENING — APROBADA (junio 2026) — NO MODIFICAR
   ══════════════════════════════════════════════════════════════════
   Contiene TODO el comportamiento específico del tab Listening:
   CSS, event delegation, applyVersion wrap y onExamListeningPick.

   Si examen-ascenso.html se sobreescribe, basta con conservar:
     <script src="examen-listening-engine.js"></script>
     <script src="examen-listening-hooks.js"></script>
   para que la pestaña funcione íntegramente.
   ══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── 1. CSS INJECTION ────────────────────────────────────────────────── */
  if (!document.getElementById('examen-listening-hooks-css')) {
    var _style = document.createElement('style');
    _style.id = 'examen-listening-hooks-css';
    _style.textContent = `
/* ── Listening engine (play-movies style) ── */
.listening-panel{padding:14px;}
.exl-player-wrap{position:relative;width:100%;aspect-ratio:16/9;background:#000;border-radius:10px;overflow:hidden;margin-bottom:12px;}
.exl-player-wrap iframe,.exl-player-wrap #exl-yt{width:100%!important;height:100%!important;border:none;display:block;}
.exl-phrase{padding:10px 12px;background:rgba(124,178,255,.06);border:1px solid rgba(124,178,255,.18);border-radius:10px;font-size:14px;line-height:1.85;color:#f6f4ef;margin-bottom:10px;min-height:42px;}
.exl-w{color:#cbc7da;}
.exl-speaker{color:#7CB2FF;font-weight:700;font-style:italic;margin-right:2px;}
.exl-blank-wrap{display:inline-flex;align-items:center;gap:2px;}
.exl-blank-inp{background:rgba(124,178,255,.1);border:1px solid rgba(124,178,255,.4);border-radius:6px;padding:2px 6px;color:#f6f4ef;font-family:var(--mono,monospace);font-size:13px;outline:none;}
.exl-blank-inp:focus{border-color:#7CB2FF;background:rgba(124,178,255,.18);}
.exl-blank-inp.correct{background:rgba(123,227,123,.16);border-color:#7BE37B;color:#7BE37B;}
.exl-blank-inp.partial{background:rgba(251,191,36,.16);border-color:#fbbf24;color:#fbbf24;}
.exl-blank-inp.wrong{background:rgba(255,90,90,.14);border-color:#ff5a5a;color:#ff5a5a;}
.exl-bank{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:8px 10px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:8px;margin-bottom:10px;}
.exl-bank-lbl{font-family:var(--mono,monospace);font-size:10px;color:rgba(255,255,255,.4);text-transform:uppercase;margin-right:6px;}
.exl-bank-opt{background:rgba(124,178,255,.1);border:1px solid rgba(124,178,255,.3);color:#cbc7da;border-radius:6px;padding:5px 10px;font-size:12px;cursor:pointer;transition:.12s;}
.exl-bank-opt:hover{background:rgba(124,178,255,.22);border-color:#7CB2FF;color:#fff;}
.exl-bank-opt.used{opacity:.4;}
.exl-actions{display:flex;gap:8px;}
.exl-btn-verify{flex:1;background:#7CB2FF;color:#0a0916;border:none;border-radius:8px;padding:9px;font-weight:700;font-size:13px;cursor:pointer;transition:.12s;}
.exl-btn-verify:hover{background:#9CC4FF;}
.exl-btn-verify.done{background:#7BE37B;}
.exl-btn-replay{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#cbc7da;border-radius:8px;padding:9px 14px;font-size:14px;cursor:pointer;}
.exl-btn-replay:hover{background:rgba(255,255,255,.12);}
/* Compactar: hero card sin question/options/nav cuando es listen */
body.exl-listen-active .hero-card .hc-quiz,
body.exl-listen-active .hero-card .hc-bottom{display:none!important;}
body.exl-listen-active .hero-card .hc-typo{display:none!important;}
body.exl-listen-active .hero-card{padding-bottom:18px;}
body.exl-listen-active .hero-card .hc-mid{padding-bottom:0;}
/* Color listen para el hero card — reemplaza el color vocab por defecto */
body.exl-listen-active .hero-card .hc-word{
  background:linear-gradient(180deg,#fff 30%,#7CB2FF)!important;
  -webkit-background-clip:text!important;
  background-clip:text!important;
  filter:drop-shadow(0 6px 30px rgba(124,178,255,.45))!important;
}
body.exl-listen-active .hero-card .hc-ipa{color:#7CB2FF!important;}
/* Fase 2: ocultar word card, mostrar panel de preguntas */
body.exl-phase2 .hero-card .hc-quiz,
body.exl-phase2 .hero-card .hc-bottom,
body.exl-phase2 .hero-card .hc-typo,
body.exl-phase2 .hero-card .hc-top{display:none!important;}
body.exl-phase2 .hero-card{overflow-y:auto!important;}
body.exl-phase2 #exl-questions-panel{display:flex!important;flex-direction:column;gap:8px;flex:1;padding:10px 4px;overflow-y:auto;}
.exl-questions-panel{display:none;flex-direction:column;gap:8px;margin-top:10px;padding-top:10px;border-top:1px dashed rgba(124,178,255,.2);max-height:300px;overflow-y:auto;}
`;
    document.head.appendChild(_style);
  }

  /* ── 2. ESTADO INTERNO ───────────────────────────────────────────────── */
  var _listenInitialized = false;

  function _getRank() {
    return (typeof getCurrentRank === 'function')
      ? getCurrentRank()
      : (document.body.dataset.examRank || 'bronce');
  }

  function _getLang() {
    return localStorage.getItem('aura_lang') || 'en';
  }

  function _startListening() {
    if (_listenInitialized || window.examListeningSessionActive) return;
    if (typeof window.initExamListening !== 'function') return;
    _listenInitialized = true;
    document.body.classList.add('exl-listen-active');
    window.initExamListening({ rank: _getRank(), lang: _getLang() });
  }

  function _stopListening() {
    document.body.classList.remove('exl-listen-active');
    _listenInitialized = false;
    if (typeof window.stopExamListening === 'function') window.stopExamListening();
  }

  /* ── 3. EVENT DELEGATION — TAB CLICKS ───────────────────────────────── */
  /* capture:true para ejecutar antes que los handlers inline del HTML */
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.tab[data-skill]');
    if (!tab) return;
    if (tab.dataset.skill === 'listen') {
      _startListening();
    } else {
      _stopListening();
    }
  }, true);

  /* ── 4. WRAP applyVersion ────────────────────────────────────────────── */
  /* applyVersion está definida en el script inline que carga antes que este
     archivo — podemos wrappearla de forma segura aquí. */
  if (typeof window.applyVersion === 'function') {
    var _origApply = window.applyVersion;
    window.applyVersion = function (v) {
      _origApply.call(this, v);
      var activeTab = document.querySelector('.tab.active');
      if (activeTab && activeTab.dataset.skill === 'listen') {
        /* Reiniciar flag para que la nueva versión pueda arrancar */
        _listenInitialized = false;
        setTimeout(_startListening, 100);
      }
    };
  }

  /* ── 5. onExamListeningPick — sync título en hero card ──────────────── */
  if (typeof window.onExamListeningPick === 'function') {
    window.onExamListeningPick(function (clip) {
      if (!clip) return;
      var title = clip.pelicula_titulo || clip.pelicula_slug || '';
      if (!title) return;
      var we = document.querySelector('.hc-word');
      if (we) we.textContent = title;
    });
  }

  /* ── 6. INIT EN CARGA — si listening ya es el tab activo ────────────── */
  (function () {
    var activeTab = document.querySelector('.tab.active');
    if (activeTab && activeTab.dataset.skill === 'listen') {
      setTimeout(_startListening, 150);
    }
  })();

})();

/* ══════════════════════════════════════════════════════════════════
   examen-speaking-hooks.js
   ⚠️  PESTAÑA SPEAKING — APROBADA — NO MODIFICAR
   ══════════════════════════════════════════════════════════════════
   Contiene el CSS, la lógica de activación/desactivación y el wrap
   de applyVersion para la pestaña Speaking del examen de ascenso.
   El engine principal vive en: examen-speaking-engine.js

   Si examen-ascenso.html se sobreescribe, basta conservar:
     <script src="examen-speaking-engine.js?v=1"></script>
     <script src="examen-speaking-hooks.js"></script>
   ══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── 1. CSS INJECTION ────────────────────────────────────────────────── */
  if (!document.getElementById('examen-speaking-hooks-css')) {
    var _style = document.createElement('style');
    _style.id = 'examen-speaking-hooks-css';
    _style.textContent = `
/* SPEAKING — ShadowLab */
.shadow-panel{padding:24px 26px 26px;}
.shadow-stage{display:flex;flex-direction:column;align-items:center;gap:10px;padding:8px 6px 4px;}
.shadow-sentence{font-size:18px;font-weight:600;line-height:1.4;letter-spacing:-.01em;text-align:center;max-width:520px;}
.shadow-sentence em{font-style:italic;color:rgba(var(--c),1);}
.shadow-ipa{font-family:var(--mono);font-size:11.5px;color:var(--ink-2);letter-spacing:.03em;text-align:center;}
.shadow-wave{display:flex;align-items:center;justify-content:center;gap:3px;height:38px;width:260px;margin-top:2px;}
.shadow-wave span{width:3px;background:rgba(var(--c),1);border-radius:1.5px;animation:wb 1.2s ease-in-out infinite;box-shadow:0 0 4px rgba(var(--c),.5);}
.shadow-wave span:nth-child(odd){background:color-mix(in oklch,rgba(var(--c),1) 70%,#fff);}
.shadow-wave span:nth-child(1){animation-delay:-1.1s;height:25%;}
.shadow-wave span:nth-child(2){animation-delay:-1.0s;height:50%;}
.shadow-wave span:nth-child(3){animation-delay:-.9s;height:75%;}
.shadow-wave span:nth-child(4){animation-delay:-.8s;height:60%;}
.shadow-wave span:nth-child(5){animation-delay:-.7s;height:88%;}
.shadow-wave span:nth-child(6){animation-delay:-.6s;height:42%;}
.shadow-wave span:nth-child(7){animation-delay:-.5s;height:80%;}
.shadow-wave span:nth-child(8){animation-delay:-.4s;height:55%;}
.shadow-wave span:nth-child(9){animation-delay:-.3s;height:70%;}
.shadow-wave span:nth-child(10){animation-delay:-.2s;height:45%;}
.shadow-wave span:nth-child(11){animation-delay:-.1s;height:65%;}
.shadow-wave span:nth-child(12){animation-delay:0s;height:35%;}
.shadow-wave span:nth-child(13){animation-delay:-.6s;height:58%;}
.shadow-wave span:nth-child(14){animation-delay:-1.0s;height:42%;}
.shadow-wave span:nth-child(15){animation-delay:-.3s;height:70%;}
.shadow-wave span:nth-child(16){animation-delay:-.7s;height:48%;}
.shadow-wave span:nth-child(17){animation-delay:-.4s;height:65%;}
.shadow-wave span:nth-child(18){animation-delay:-.8s;height:30%;}
.shadow-wave span:nth-child(19){animation-delay:-.2s;height:55%;}
.shadow-wave span:nth-child(20){animation-delay:-.5s;height:75%;}
.shadow-mic{
  position:relative;width:66px;height:66px;border-radius:50%;
  background:rgba(var(--c),1);color:#1a0a05;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 14px 38px rgba(var(--c),.45),0 0 0 6px rgba(var(--c),.12);
  transition:.18s;
}
.shadow-mic:hover{transform:scale(1.06);}
.shadow-mic svg{width:24px;height:24px;fill:currentColor;}
.shadow-mic::before,.shadow-mic::after{content:"";position:absolute;inset:-10px;border-radius:50%;border:2px solid rgba(var(--c),1);opacity:.32;animation:micRing 2s ease-out infinite;}
.shadow-mic::after{animation-delay:1s;}
@keyframes micRing{0%{transform:scale(1);opacity:.4;}100%{transform:scale(1.4);opacity:0;}}
.shadow-meta{display:flex;flex-direction:column;align-items:center;gap:3px;}
.shadow-meta b{font-family:var(--mono);font-size:11px;color:rgba(var(--c),1);letter-spacing:.18em;text-transform:uppercase;font-weight:900;display:flex;align-items:center;gap:7px;}
.shadow-meta b::before{content:"";width:7px;height:7px;border-radius:50%;background:rgba(var(--c),1);box-shadow:0 0 8px rgba(var(--c),1);animation:pulse 1.4s infinite;}
.shadow-meta span{font-family:var(--mono);font-size:11.5px;color:var(--ink-2);font-feature-settings:"tnum";}

/* SPEAKING parts switcher */
.speak-switch{display:flex;flex-direction:column;gap:8px;}
.ss-tab{display:grid;grid-template-columns:38px 1fr auto;gap:12px;align-items:center;padding:14px 16px;border-radius:13px;background:rgba(255,255,255,.025);border:1.5px solid var(--line);text-align:left;transition:.15s;}
.ss-tab:hover{border-color:rgba(var(--c),.4);}
.ss-tab.active{background:rgba(var(--c),.10);border-color:rgba(var(--c),.5);box-shadow:0 0 0 3px rgba(var(--c),.10);}
.ss-num{width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,.04);border:1px solid var(--line-2);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:14px;font-weight:900;color:var(--muted);}
.ss-tab.active .ss-num{background:rgba(var(--c),1);color:#0a0a0a;border-color:rgba(var(--c),1);}
.ss-meta{display:flex;flex-direction:column;gap:2px;}
.ss-meta b{font-size:13.5px;font-weight:800;letter-spacing:-.005em;}
.ss-meta span{font-family:var(--mono);font-size:10.5px;color:var(--muted);letter-spacing:.04em;}
.ss-status{font-family:var(--mono);font-size:9.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);padding:5px 10px;border-radius:var(--r-pill);background:rgba(255,255,255,.04);border:1px solid var(--line);}
.ss-status.live{color:rgba(var(--c),1);background:rgba(var(--c),.10);border-color:rgba(var(--c),.32);}
.ss-status.live::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:rgba(var(--c),1);box-shadow:0 0 6px rgba(var(--c),1);margin-right:6px;animation:pulse 1.4s infinite;}
    `;
    document.head.appendChild(_style);
  }

  /* ── 2. HELPERS ──────────────────────────────────────────────────────── */
  function _getRank() {
    return (typeof getCurrentRank === 'function')
      ? getCurrentRank()
      : (document.body.dataset.examRank || 'bronce');
  }
  function _getLang() {
    return localStorage.getItem('aura_lang') || 'en';
  }

  /* ── 3. ACTIVAR / DESACTIVAR ─────────────────────────────────────────── */
  function _start() {
    /* Ocultar tarjeta y contenido viejo inmediatamente — sin flash */
    var hero = document.querySelector('.hero-card');
    if (hero) hero.style.display = 'none';
    var host = document.querySelector('.mid-content[data-skill="speak"]');
    if (host) host.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;min-height:300px;color:rgba(255,154,108,.5);font-size:12px;">Cargando speaking…</div>';
    if (typeof window.initExamSpeaking === 'function') {
      setTimeout(function () {
        window.initExamSpeaking({ rank: _getRank(), lang: _getLang() });
      }, 150);
    }
  }

  function _stop() {
    if (typeof window.stopExamSpeaking === 'function') window.stopExamSpeaking();
  }

  /* ── 4. EVENT DELEGATION — TAB CLICKS ───────────────────────────────── */
  /* capture:true para ejecutar ANTES que otros handlers */
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.tab[data-skill]');
    if (!tab) return;
    if (tab.dataset.skill === 'speak') {
      _start();
    } else {
      _stop();
    }
  }, true);

  /* ── 5. WRAP applyVersion — skip speak ──────────────────────────────── */
  (function _wrapApply() {
    if (typeof window.applyVersion !== 'function') {
      /* applyVersion aún no existe — esperar */
      setTimeout(_wrapApply, 80);
      return;
    }
    var _orig = window.applyVersion;
    window.applyVersion = function (v) {
      _orig.call(this, v);
      /* Si la pestaña activa es Speaking, reiniciar el engine */
      var activeTab = document.querySelector('.tab.active');
      if (activeTab && activeTab.dataset.skill === 'speak') {
        setTimeout(_start, 100);
      }
    };
  })();

  /* ── 6. INIT EN CARGA — si Speaking ya es la pestaña activa ─────────── */
  (function () {
    var activeTab = document.querySelector('.tab.active');
    if (activeTab && activeTab.dataset.skill === 'speak') {
      setTimeout(_start, 200);
    }
  })();

})();

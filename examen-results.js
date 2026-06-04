/* ================================================================
   examen-results.js v1 — Aura Languages
   Módulo de calificación final y ascenso del Examen de Ascenso.

   RESPONSABILIDADES:
   1. Intercepta AuraRightPanel.recordAnswer() para tracking de scores
   2. Captura score de Writing desde window._examWriteScore o DOM
   3. Al "Terminar examen": calcula nota final ponderada, muestra modal
   4. Guarda en Supabase → tabla exam_attempts
   5. Si aprueba: actualiza language_progress.rango

   NO modifica ningún archivo existente.
   Se conecta únicamente a la API pública de AuraRightPanel.
   ================================================================ */

(function(){
  'use strict';

  /* ── Configuración ── */
  var PASS_THRESHOLD = 70;

  var WEIGHTS = {
    listen: 15, read: 15, vocab: 15,
    phrasal: 10, slang: 10, write: 20, speak: 15
  };

  var NEXT_RANK = {
    bronce: 'plata', plata: 'oro', oro: 'platino',
    platino: 'diamante', diamante: 'challenger', challenger: null
  };

  var RANK_LABEL = {
    bronce:'Bronce', plata:'Plata', oro:'Oro',
    platino:'Platino', diamante:'Diamante', challenger:'Challenger'
  };

  var SKILL_NAMES = {
    listen:'Listening', read:'Reading', vocab:'Vocabulary',
    phrasal:'Phrasal', slang:'Slang', write:'Writing', speak:'Speaking'
  };

  var SKILL_COLORS = {
    listen:'124,178,255', read:'167,139,250', vocab:'91,233,246',
    phrasal:'255,216,61', slang:'255,115,201', write:'123,227,123', speak:'255,107,107'
  };

  /* ── Estado local de scores (no depende de internals de otros módulos) ── */
  var _scores = {
    listen:  { correct:0, total:0 },
    read:    { correct:0, total:0 },
    vocab:   { correct:0, total:0 },
    phrasal: { correct:0, total:0 },
    slang:   { correct:0, total:0 },
    write:   { correct:0, total:0 },
    speak:   { correct:0, total:0 }
  };
  var _activeSkill = 'listen';
  var _intercepted = false;
  var _finished = false;

  /* ── Interceptar API pública de AuraRightPanel ── */
  function _setupInterceptor() {
    if(!window.AuraRightPanel || _intercepted) return;
    _intercepted = true;

    var _origRecord = window.AuraRightPanel.recordAnswer.bind(window.AuraRightPanel);
    window.AuraRightPanel.recordAnswer = function(isCorrect) {
      _origRecord(isCorrect);
      if(_scores[_activeSkill]) {
        _scores[_activeSkill].total++;
        if(isCorrect) _scores[_activeSkill].correct++;
      }
    };

    var _origSwitch = window.AuraRightPanel.switchSkill.bind(window.AuraRightPanel);
    window.AuraRightPanel.switchSkill = function(skillKey) {
      _origSwitch(skillKey);
      _activeSkill = skillKey;
    };
  }

  /* ── Score de Writing: window._examWriteScore (seteado por writing hooks) o DOM ── */
  function _getWriteScore() {
    if(typeof window._examWriteScore === 'number' && window._examWriteScore > 0) {
      return { correct: window._examWriteScore, total: 100, isDirect: true };
    }
    var el = document.getElementById('wap-total');
    if(el) {
      var num = parseInt((el.innerText || el.textContent || '').replace(/[^0-9]/,''), 10);
      if(!isNaN(num) && num > 0) return { correct: num, total: 100, isDirect: true };
    }
    return _scores.write;
  }

  /* ── Calcular nota final ponderada ── */
  function _calcFinalScore() {
    var ws = _getWriteScore();
    var all = Object.assign({}, _scores, { write: ws });
    var weightedSum = 0, totalWeight = 0;

    var breakdown = Object.keys(WEIGHTS).map(function(skill) {
      var w = WEIGHTS[skill];
      var s = all[skill];
      var pct = s.total > 0
        ? (s.isDirect && s.total === 100 ? s.correct : Math.round((s.correct / s.total) * 100))
        : 0;
      weightedSum += pct * w;
      totalWeight += w;
      return { skill: skill, pct: pct, correct: s.correct, total: s.total };
    });

    return { final: Math.round(weightedSum / totalWeight), breakdown: breakdown };
  }

  /* ── Helpers Supabase/auth ── */
  function _getSb()   { return window._aura && window._aura.sb; }
  function _getLang() { return localStorage.getItem('aura_lang') || 'en'; }
  function _getRank() {
    var lp = window._aura && window._aura.lang_progress;
    if(lp && lp.rango) return lp.rango;
    var p = window._aura && window._aura.profile;
    if(p && p.rango) return p.rango;
    return 'bronce';
  }

  /* ── CSS del modal ── */
  function _injectCSS() {
    if(document.getElementById('er-css')) return;
    var s = document.createElement('style');
    s.id = 'er-css';
    s.textContent =
      '#er-overlay{position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:9999;display:flex;'
        +'align-items:center;justify-content:center;backdrop-filter:blur(14px);'
        +'opacity:0;transition:opacity .4s;pointer-events:none;}'
      +'#er-overlay.er-show{opacity:1;pointer-events:all;}'
      +'#er-modal{width:min(540px,94vw);max-height:92vh;overflow-y:auto;background:#0f0f14;'
        +'border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:28px;'
        +'box-shadow:0 40px 100px rgba(0,0,0,.8);transform:translateY(28px) scale(.97);'
        +'transition:transform .4s;}'
      +'#er-overlay.er-show #er-modal{transform:translateY(0) scale(1);}'
      +'.er-eyebrow{font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;'
        +'color:rgba(255,255,255,.28);margin-bottom:6px;}'
      +'.er-verdict{font-size:30px;font-weight:900;letter-spacing:-.02em;margin-bottom:22px;}'
      +'.er-verdict.pass{color:#7BE37B;} .er-verdict.fail{color:#ff5a5a;}'
      +'.er-hero{display:flex;align-items:center;gap:20px;padding:18px 20px;'
        +'background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);'
        +'border-radius:14px;margin-bottom:18px;}'
      +'.er-gauge{position:relative;flex-shrink:0;width:90px;height:90px;}'
      +'.er-gauge svg{display:block;}'
      +'.er-gauge-num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;'
        +'font-size:21px;font-weight:900;font-family:"JetBrains Mono",monospace;}'
      +'.er-info-label{font-size:10px;letter-spacing:.12em;text-transform:uppercase;'
        +'color:rgba(255,255,255,.3);margin-bottom:3px;}'
      +'.er-info-score{font-size:34px;font-weight:900;font-family:"JetBrains Mono",monospace;'
        +'line-height:1;margin-bottom:5px;}'
      +'.er-info-sub{font-size:11px;color:rgba(255,255,255,.3);}'
      +'.er-bars{display:flex;flex-direction:column;gap:9px;margin-bottom:18px;}'
      +'.er-bar{display:grid;grid-template-columns:82px 1fr 38px;align-items:center;gap:10px;}'
      +'.er-bar-name{font-size:11px;font-weight:700;color:rgba(255,255,255,.5);text-align:right;}'
      +'.er-bar-track{height:7px;background:rgba(255,255,255,.06);border-radius:99px;overflow:hidden;}'
      +'.er-bar-fill{height:100%;border-radius:99px;transition:width .7s cubic-bezier(.16,1,.3,1);}'
      +'.er-bar-val{font-size:11px;font-family:"JetBrains Mono",monospace;color:rgba(255,255,255,.4);}'
      +'.er-rank{padding:16px 18px;border-radius:13px;margin-bottom:20px;text-align:center;}'
      +'.er-rank.pass{background:rgba(123,227,123,.07);border:1px solid rgba(123,227,123,.22);}'
      +'.er-rank.fail{background:rgba(255,90,90,.06);border:1px solid rgba(255,90,90,.18);}'
      +'.er-rank-eyebrow{font-size:10px;letter-spacing:.12em;text-transform:uppercase;'
        +'color:rgba(255,255,255,.28);margin-bottom:8px;}'
      +'.er-rank-line{font-size:20px;font-weight:900;margin-bottom:5px;}'
      +'.er-rank-sub{font-size:11.5px;color:rgba(255,255,255,.35);}'
      +'.er-cta{width:100%;padding:14px;border-radius:13px;font-size:14px;font-weight:800;'
        +'cursor:pointer;border:none;letter-spacing:.03em;transition:.18s;}'
      +'.er-cta.pass{background:#7BE37B;color:#0a0a0a;} .er-cta.pass:hover{background:#9aeea0;}'
      +'.er-cta.fail{background:rgba(255,255,255,.07);color:rgba(255,255,255,.65);'
        +'border:1px solid rgba(255,255,255,.12);}'
      +'.er-cta.fail:hover{background:rgba(255,255,255,.12);}'
      +'.er-saving{font-size:10.5px;color:rgba(255,255,255,.25);text-align:center;'
        +'margin-top:11px;min-height:15px;}';
    document.head.appendChild(s);
  }

  /* ── Construir modal ── */
  function _showModal(data, passed, rank) {
    _injectCSS();
    var next = NEXT_RANK[rank];
    var c    = passed ? '#7BE37B' : '#ff5a5a';
    var rgb  = passed ? '123,227,123' : '255,90,90';

    /* Gauge SVG */
    var R = 36, circ = 2 * Math.PI * R;
    var dash = (data.final / 100) * circ;
    var gauge =
      '<svg width="90" height="90" viewBox="0 0 90 90">'
      +'<circle cx="45" cy="45" r="'+R+'" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="8"/>'
      +'<circle cx="45" cy="45" r="'+R+'" fill="none" stroke="rgba('+rgb+',.9)" stroke-width="8"'
        +' stroke-dasharray="'+dash.toFixed(1)+' '+circ.toFixed(1)+'"'
        +' transform="rotate(-90 45 45)" stroke-linecap="round"/>'
      +'</svg>';

    /* Bars */
    var bars = data.breakdown.map(function(b) {
      var col = SKILL_COLORS[b.skill] || '255,255,255';
      var ok  = b.pct >= PASS_THRESHOLD;
      return '<div class="er-bar">'
        +'<div class="er-bar-name">'+SKILL_NAMES[b.skill]+'</div>'
        +'<div class="er-bar-track"><div class="er-bar-fill" '
          +'style="width:'+b.pct+'%;background:rgba('+col+','+(ok?'1':'.5')+');"></div></div>'
        +'<div class="er-bar-val">'+b.pct+'%</div>'
        +'</div>';
    }).join('');

    /* Rank box */
    var rankBox;
    if(passed && next) {
      rankBox = '<div class="er-rank pass">'
        +'<div class="er-rank-eyebrow">Nuevo rango desbloqueado</div>'
        +'<div class="er-rank-line" style="color:#7BE37B;">'
          +RANK_LABEL[rank]+' &rarr; '+RANK_LABEL[next]
        +'</div>'
        +'<div class="er-rank-sub">¡Felicitaciones! Ascendiste de rango.</div>'
        +'</div>';
    } else if(passed && !next) {
      rankBox = '<div class="er-rank pass">'
        +'<div class="er-rank-eyebrow">Rango máximo alcanzado</div>'
        +'<div class="er-rank-line" style="color:#7BE37B;">⭐ Challenger</div>'
        +'<div class="er-rank-sub">Has llegado al nivel más alto de Aura Languages.</div>'
        +'</div>';
    } else {
      rankBox = '<div class="er-rank fail">'
        +'<div class="er-rank-eyebrow">No alcanzaste el mínimo</div>'
        +'<div class="er-rank-line" style="color:#ff5a5a;">'+data.final+'% &lt; '+PASS_THRESHOLD+'% requerido</div>'
        +'<div class="er-rank-sub">Sigue practicando en el dashboard y vuelve a intentarlo.</div>'
        +'</div>';
    }

    var html =
      '<div id="er-overlay">'
        +'<div id="er-modal">'
          +'<div class="er-eyebrow">Examen de Ascenso · Resultados</div>'
          +'<div class="er-verdict '+(passed?'pass':'fail')+'">'
            +(passed ? '¡Aprobado! 🎉' : 'Reprobado')
          +'</div>'
          +'<div class="er-hero">'
            +'<div class="er-gauge">'+gauge
              +'<div class="er-gauge-num" style="color:'+c+';">'+data.final+'%</div>'
            +'</div>'
            +'<div>'
              +'<div class="er-info-label">Nota final</div>'
              +'<div class="er-info-score" style="color:'+c+';">'+data.final+' <small style="font-size:16px;color:rgba(255,255,255,.25);">/ 100</small></div>'
              +'<div class="er-info-sub">Mínimo para aprobar: '+PASS_THRESHOLD+'%</div>'
            +'</div>'
          +'</div>'
          +'<div class="er-bars">'+bars+'</div>'
          +rankBox
          +'<button class="er-cta '+(passed?'pass':'fail')+'" id="er-cta-btn">'
            +(passed ? '🚀 Ver mi nuevo rango en el dashboard' : '📚 Seguir practicando')
          +'</button>'
          +'<div class="er-saving" id="er-saving">Guardando resultados…</div>'
        +'</div>'
      +'</div>';

    document.body.insertAdjacentHTML('beforeend', html);

    requestAnimationFrame(function(){
      var ov = document.getElementById('er-overlay');
      if(ov) ov.classList.add('er-show');
    });

    document.getElementById('er-cta-btn').addEventListener('click', function(){
      if(passed) {
        window.location.href = 'dashboard.html';
      } else {
        var ov = document.getElementById('er-overlay');
        if(ov){ ov.classList.remove('er-show'); setTimeout(function(){ ov.remove(); }, 400); }
      }
    });
  }

  /* ── Guardar en Supabase + ascender rango si aprueba ── */
  async function _persist(data, passed, rank) {
    var sb = _getSb();
    var statusEl = document.getElementById('er-saving');
    if(!sb){ if(statusEl) statusEl.textContent=''; return; }

    try {
      var ud  = await sb.auth.getUser();
      var uid = ud && ud.data && ud.data.user && ud.data.user.id;
      var lang = _getLang();

      /* 1 — Registrar intento */
      await sb.from('exam_attempts').insert({
        user_id:     uid,
        rank:        rank,
        language:    lang,
        status:      passed ? 'passed' : 'failed',
        total_score: data.final,
        finished_at: new Date().toISOString()
      });

      /* 2 — Ascender rango si aprobó */
      if(passed && NEXT_RANK[rank]) {
        var nextRank = NEXT_RANK[rank];
        await sb.from('language_progress')
          .update({ rango: nextRank })
          .eq('user_id', uid)
          .eq('language', lang);

        /* Actualizar en memoria para consistencia inmediata */
        if(window._aura && window._aura.lang_progress)
          window._aura.lang_progress.rango = nextRank;
      }

      if(statusEl) statusEl.textContent = '✓ Resultados guardados correctamente';

    } catch(e) {
      console.error('[examen-results]', e);
      if(statusEl) statusEl.textContent = '⚠ Error al guardar: ' + (e.message || '');
    }
  }

  /* ── Flujo al terminar el examen ── */
  function _onFinish() {
    if(_finished) return;
    _finished = true;

    var data   = _calcFinalScore();
    var passed = data.final >= PASS_THRESHOLD;
    var rank   = _getRank();

    _showModal(data, passed, rank);
    _persist(data, passed, rank);
  }

  /* ── Hook en botón "Terminar examen" ── */
  function _hookNextBtn() {
    var nextBtn = document.getElementById('nextBtn');
    if(!nextBtn) return;
    var tabs = document.querySelectorAll('.tab[data-skill]');

    nextBtn.addEventListener('click', function() {
      var active = document.querySelector('.tab.active');
      var idx = Array.from(tabs).indexOf(active);
      if(idx === tabs.length - 1) {
        setTimeout(_onFinish, 350);
      }
    });
  }

  /* ── Countdown 45 minutos ── */
  var EXAM_DURATION = 45 * 60; // segundos
  var _remainSec = EXAM_DURATION;
  var _countdownInterval = null;

  function _startCountdown() {
    // Cancelar el count-up de examen-shell.js
    if(window._examTimerInterval) {
      clearInterval(window._examTimerInterval);
      window._examTimerInterval = null;
    }

    var el = document.getElementById('examElapsed');

    // Estilo urgente cuando queda poco tiempo
    function _updateDisplay() {
      var m = String(Math.floor(_remainSec / 60)).padStart(2, '0');
      var s = String(_remainSec % 60).padStart(2, '0');
      if(el) {
        el.textContent = m + ':' + s;
        // Rojo parpadeante en los últimos 5 minutos
        if(_remainSec <= 300) {
          el.style.color = _remainSec % 2 === 0 ? '#ff5a5a' : '#ff8a8a';
          el.style.fontWeight = '900';
        } else if(_remainSec <= 600) {
          el.style.color = '#FFD83D'; // Amarillo en últimos 10 min
        }
      }
    }

    _updateDisplay();

    _countdownInterval = setInterval(function() {
      _remainSec--;
      _updateDisplay();

      if(_remainSec <= 0) {
        clearInterval(_countdownInterval);
        _onTimeUp();
      }
    }, 1000);
  }

  /* ── Tiempo agotado: bloquear examen y autocalificar ── */
  function _onTimeUp() {
    // Bloquear todas las interacciones
    document.body.classList.add('exam-time-up');

    // Insertar overlay de tiempo agotado brevemente antes del modal
    var el = document.getElementById('examElapsed');
    if(el) { el.textContent = '00:00'; el.style.color = '#ff5a5a'; }

    // Mostrar aviso rápido y luego disparar calificación
    var toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);'
      + 'background:#ff5a5a;color:#fff;font-size:18px;font-weight:900;padding:18px 32px;'
      + 'border-radius:14px;z-index:9998;letter-spacing:.02em;text-align:center;'
      + 'box-shadow:0 8px 32px rgba(255,90,90,.4);';
    toast.textContent = '⏰ Tiempo agotado';
    document.body.appendChild(toast);

    setTimeout(function() {
      toast.remove();
      _onFinish();
    }, 1800);
  }

  /* ── CSS para bloquear inputs cuando se acaba el tiempo ── */
  function _injectTimerCSS() {
    if(document.getElementById('er-timer-css')) return;
    var s = document.createElement('style');
    s.id = 'er-timer-css';
    s.textContent =
      'body.exam-time-up .blank-input,'
      + 'body.exam-time-up .hc-opt,'
      + 'body.exam-time-up .smc-btn,'
      + 'body.exam-time-up .tf-btn,'
      + 'body.exam-time-up .tc-btn,'
      + 'body.exam-time-up .fam-pill,'
      + 'body.exam-time-up .wap-eval-btn,'
      + 'body.exam-time-up .shadow-mic,'
      + 'body.exam-time-up .ss-tab {'
      + '  pointer-events:none !important;'
      + '  opacity:0.35 !important;'
      + '}';
    document.head.appendChild(s);
  }

  /* ── Init: espera a que AuraRightPanel esté listo ── */
  document.addEventListener('DOMContentLoaded', function() {
    _injectTimerCSS();
    var attempts = 0;
    var check = setInterval(function() {
      if(window.AuraRightPanel) {
        clearInterval(check);
        _setupInterceptor();
        _hookNextBtn();
        _startCountdown();
      }
      if(++attempts > 40) clearInterval(check);
    }, 100);
  });

})();

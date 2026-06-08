// ── aura-streak.js — popup de racha diaria ────────────────────────────────
// Muestra el popup una vez por día al primer ingreso del usuario.
// Lee datos reales de window._aura.profile.
// ─────────────────────────────────────────────────────────────────────────
(function () {
  'use strict';

  var MILESTONES    = [7, 14, 21, 30, 60, 100, 150, 200, 365];
  var DAYS_LABEL    = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  var AP_DAILY      = 25;
  var XP_DAILY      = 40;

  /* ── helpers ─────────────────────────────────────── */
  function todayKey() { return new Date().toISOString().slice(0,10); }
  function shownToday()   { return localStorage.getItem('_aura_streak_day')      === todayKey(); }
  function rewardedToday(){ return localStorage.getItem('_aura_streak_rewarded') === todayKey(); }
  function markShown()    { localStorage.setItem('_aura_streak_day',      todayKey()); }
  function markRewarded() { localStorage.setItem('_aura_streak_rewarded', todayKey()); }

  function nextMilestone(streak) {
    for (var i = 0; i < MILESTONES.length; i++) {
      if (MILESTONES[i] > streak) return MILESTONES[i];
    }
    return streak + 30;
  }

  function buildWeek(streak) {
    var now      = new Date();
    var dow      = now.getDay();          // 0=Dom…6=Sáb
    var todayIdx = (dow + 6) % 7;         // 0=Lun…6=Dom
    var nextM    = nextMilestone(streak);
    var daysToM  = nextM - streak;
    var rows     = [];
    for (var i = 0; i < 7; i++) {
      var diff    = i - todayIdx;          // negative = past, 0 = today, positive = future
      var lbl     = i === todayIdx ? 'Hoy' : DAYS_LABEL[i];
      var state;
      if (i === todayIdx)                          state = 'today';
      else if (diff < 0 && Math.abs(diff) < streak) state = 'done';
      else if (diff > 0 && diff === daysToM)        state = 'future milestone';
      else                                           state = 'future';
      rows.push({ lbl: lbl, state: state });
    }
    return rows;
  }

  /* ── CSS (inyectado una sola vez) ───────────────── */
  function injectCSS() {
    if (document.getElementById('_aura-streak-css')) return;
    var s = document.createElement('style');
    s.id  = '_aura-streak-css';
    s.textContent = `
#_aura-streak-overlay{
  position:fixed;inset:0;z-index:99999;
  display:flex;align-items:center;justify-content:center;
  padding:20px;
  background:rgba(5,5,5,.82);
  backdrop-filter:blur(6px);
  -webkit-backdrop-filter:blur(6px);
  animation:_asOvIn .25s ease;
}
@keyframes _asOvIn{from{opacity:0}to{opacity:1}}
#_aura-streak-overlay.hiding{animation:_asOvOut .2s ease forwards;}
@keyframes _asOvOut{to{opacity:0}}
._as-modal{
  font-family:'Plus Jakarta Sans',-apple-system,sans-serif;
  font-size:14px;color:#f5f5f5;
  position:relative;width:min(420px,100%);
  background:#171717;border:1px solid #262626;border-radius:22px;
  padding:24px 22px 20px;
  box-shadow:0 30px 90px rgba(0,0,0,.7),0 0 80px rgba(251,146,60,.07);
  text-align:center;overflow:hidden;
  animation:_asModalIn .4s .05s cubic-bezier(.34,1.56,.64,1) backwards;
}
@keyframes _asModalIn{from{opacity:0;transform:translateY(18px) scale(.95)}to{opacity:1;transform:none}}
._as-close{
  position:absolute;top:14px;right:14px;
  width:30px;height:30px;border-radius:50%;
  background:rgba(255,255,255,.04);color:#7a7a7a;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;border:none;transition:all .15s;z-index:5;
}
._as-close:hover{background:rgba(255,255,255,.08);color:#f5f5f5;}
._as-close svg{width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;}
._as-kicker{
  font-family:'JetBrains Mono',ui-monospace,monospace;
  font-size:10px;font-weight:800;letter-spacing:.3em;text-transform:uppercase;
  color:#fdba74;display:flex;align-items:center;justify-content:center;gap:10px;
}
._as-kicker::before,._as-kicker::after{
  content:"";width:28px;height:1px;
  background:linear-gradient(90deg,transparent,rgba(251,146,60,.5));
}
._as-kicker::after{background:linear-gradient(90deg,rgba(251,146,60,.5),transparent);}
._as-hero{margin:18px 0 6px;display:flex;flex-direction:column;align-items:center;gap:4px;}
._as-flame-wrap{position:relative;width:110px;height:130px;display:flex;align-items:center;justify-content:center;}
._as-glow{
  position:absolute;inset:-20px;border-radius:50%;
  background:radial-gradient(circle at 50% 60%,rgba(251,146,60,.45),rgba(251,146,60,.12) 35%,transparent 65%);
  animation:_asGlow 2.4s ease-in-out infinite;
}
@keyframes _asGlow{0%,100%{transform:scale(1);opacity:.85}50%{transform:scale(1.08);opacity:1}}
._as-flame{position:relative;width:96px;height:114px;filter:drop-shadow(0 8px 24px rgba(251,146,60,.45));}
._as-flame-body{transform-origin:50% 95%;animation:_asFlicker 1.8s ease-in-out infinite;}
@keyframes _asFlicker{
  0%,100%{transform:scale(1,1) rotate(0)}
  25%{transform:scale(1.03,.98) rotate(-1.5deg)}
  50%{transform:scale(.97,1.04) rotate(1deg)}
  75%{transform:scale(1.02,1) rotate(-.5deg)}
}
._as-num{
  position:absolute;color:#fff;font-weight:900;font-size:42px;letter-spacing:-.04em;line-height:1;
  font-family:'Plus Jakarta Sans',-apple-system,sans-serif;
  text-shadow:0 2px 14px rgba(124,58,16,.7),0 0 24px rgba(255,180,80,.6);
  animation:_asNumPop .6s .15s cubic-bezier(.34,1.56,.64,1) backwards;
}
@keyframes _asNumPop{0%{transform:scale(.4);opacity:0}100%{transform:scale(1);opacity:1}}
._as-title{font-size:22px;font-weight:800;color:#f5f5f5;letter-spacing:-.02em;margin-top:10px;line-height:1.2;}
._as-title em{font-style:normal;background:linear-gradient(135deg,#fdba74,#fb923c);-webkit-background-clip:text;background-clip:text;color:transparent;}
._as-sub{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12.5px;color:#7a7a7a;margin-top:2px;letter-spacing:.04em;}
._as-sub b{color:#fdba74;font-weight:700;}
._as-week{
  margin:20px 0 18px;
  display:grid;grid-template-columns:repeat(7,1fr);gap:6px;
  padding:14px 12px;background:#0e0e0e;border:1px solid #262626;border-radius:16px;
}
._as-day{display:flex;flex-direction:column;align-items:center;gap:6px;font-family:'JetBrains Mono',ui-monospace,monospace;}
._as-day-l{font-size:9px;font-weight:700;color:#7a7a7a;letter-spacing:.12em;text-transform:uppercase;}
._as-day-d{
  width:32px;height:32px;border-radius:50%;
  background:rgba(255,255,255,.03);border:1px solid #262626;
  display:flex;align-items:center;justify-content:center;
  font-size:11px;font-weight:700;color:#7a7a7a;transition:all .2s;
}
._as-day-d svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;}
._as-day.done ._as-day-d{background:rgba(251,146,60,.14);border-color:rgba(251,146,60,.35);color:#fdba74;}
._as-day.done ._as-day-l{color:#fdba74;opacity:.6;}
._as-day.today ._as-day-d{
  background:#fb923c;border-color:#fb923c;color:#fff;
  box-shadow:0 0 0 3px rgba(251,146,60,.18),0 0 24px rgba(251,146,60,.55);
  animation:_asTodayPop .65s .3s cubic-bezier(.34,1.56,.64,1) backwards;
}
@keyframes _asTodayPop{0%{transform:scale(.3)}50%{transform:scale(1.2)}100%{transform:scale(1)}}
._as-day.today ._as-day-l{color:#f5f5f5;font-weight:800;}
._as-day.future ._as-day-d{opacity:.55;}
._as-day.milestone ._as-day-d{border-color:#c084fc;color:#c084fc;background:rgba(192,132,252,.08);}
._as-day.milestone ._as-day-d::after{content:"★";font-size:14px;}
._as-day.milestone ._as-day-l{color:#c084fc;}
._as-rewards{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;}
._as-reward{
  background:#0e0e0e;border:1px solid #262626;border-radius:14px;
  padding:12px;display:flex;align-items:center;gap:10px;position:relative;overflow:hidden;
  animation:_asRewardIn .5s .5s cubic-bezier(.34,1.56,.64,1) backwards;
}
._as-reward:nth-child(2){animation-delay:.6s;}
@keyframes _asRewardIn{0%{opacity:0;transform:translateY(8px) scale(.95)}100%{opacity:1;transform:none}}
._as-reward::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:var(--_c);opacity:.6;}
._as-reward.aura{--_c:#7ee787;}._as-reward.xp{--_c:#c4ff3d;}
._as-reward-ic{
  width:36px;height:36px;border-radius:10px;flex-shrink:0;
  background:color-mix(in oklab,var(--_c) 14%,transparent);color:var(--_c);
  display:flex;align-items:center;justify-content:center;
  border:1px solid color-mix(in oklab,var(--_c) 30%,transparent);
}
._as-reward-ic svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;}
._as-reward-meta{display:flex;flex-direction:column;gap:1px;align-items:flex-start;text-align:left;}
._as-reward-val{font-size:20px;font-weight:800;color:var(--_c);letter-spacing:-.02em;line-height:1;}
._as-reward-val::before{content:"+";}
._as-reward-lbl{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:9px;font-weight:700;color:#7a7a7a;letter-spacing:.16em;text-transform:uppercase;}
._as-milestone-row{
  background:linear-gradient(180deg,rgba(192,132,252,.06),rgba(192,132,252,.01));
  border:1px solid rgba(192,132,252,.18);border-radius:12px;
  padding:10px 14px;margin-bottom:16px;
  display:flex;align-items:center;gap:10px;
  animation:_asRewardIn .5s .7s cubic-bezier(.34,1.56,.64,1) backwards;
}
._as-milestone-ic{
  width:28px;height:28px;border-radius:8px;flex-shrink:0;
  background:rgba(192,132,252,.14);color:#c084fc;
  display:flex;align-items:center;justify-content:center;font-size:14px;
}
._as-milestone-meta{flex:1;display:flex;flex-direction:column;gap:1px;text-align:left;}
._as-milestone-l{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:9px;font-weight:700;color:#7a7a7a;letter-spacing:.16em;text-transform:uppercase;}
._as-milestone-t{font-size:12.5px;font-weight:700;color:#c8c8c8;}
._as-milestone-t b{color:#c084fc;font-weight:800;}
._as-milestone-bar{width:90px;height:6px;border-radius:999px;background:rgba(255,255,255,.04);overflow:hidden;flex-shrink:0;border:1px solid #262626;}
._as-milestone-fill{height:100%;background:linear-gradient(90deg,#a78bfa,#c084fc);border-radius:999px;box-shadow:0 0 10px rgba(192,132,252,.45);}
._as-actions{display:flex;gap:8px;animation:_asRewardIn .5s .9s cubic-bezier(.34,1.56,.64,1) backwards;}
._as-btn{
  flex:1;font-family:'Plus Jakarta Sans',-apple-system,sans-serif;
  font-size:13px;font-weight:700;padding:12px 14px;border-radius:11px;
  display:flex;align-items:center;justify-content:center;gap:7px;
  cursor:pointer;border:none;transition:all .15s;
}
._as-btn svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
._as-primary{background:#c4ff3d;color:#0c0c0c;box-shadow:0 8px 22px rgba(196,255,61,.28);}
._as-primary:hover{transform:translateY(-1px);box-shadow:0 12px 28px rgba(196,255,61,.45);}
._as-ghost{background:#1a1a1a;color:#c8c8c8;border:1px solid #262626;}
._as-ghost:hover{background:#222;color:#f5f5f5;border-color:#333;}
`;
    document.head.appendChild(s);
  }

  /* ── construir HTML del popup ───────────────────── */
  function buildPopup(p) {
    var streak    = p.streak_actual || 1;
    var best      = p.streak_maximo || streak;
    var nextM     = nextMilestone(streak);
    var daysToM   = nextM - streak;
    var fillPct   = Math.min(100, Math.round((streak / nextM) * 100));
    var weekDays  = buildWeek(streak);

    var weekHTML = weekDays.map(function(d) {
      var cls = '_as-day ' + d.state;
      var check = '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>';
      var inner = (d.state === 'done' || d.state === 'today') ? check : '';
      if (d.state.includes('milestone')) inner = ''; // star via CSS ::after
      return '<div class="' + cls + '">'
        + '<span class="_as-day-l">' + d.lbl + '</span>'
        + '<span class="_as-day-d">' + inner + '</span>'
        + '</div>';
    }).join('');

    var daysLabel  = daysToM === 1 ? '1 día' : daysToM + ' días';
    var streakWord = streak === 1   ? '1 día' : streak + ' días';

    var ov = document.createElement('div');
    ov.id  = '_aura-streak-overlay';
    ov.innerHTML = `
<div class="_as-modal" role="dialog" aria-modal="true">
  <button class="_as-close" id="_as-close-btn" aria-label="Cerrar">
    <svg viewBox="0 0 24 24"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
  </button>

  <div class="_as-kicker">bienvenido de vuelta</div>

  <div class="_as-hero">
    <div class="_as-flame-wrap">
      <div class="_as-glow"></div>
      <svg class="_as-flame" viewBox="0 0 96 114">
        <defs>
          <linearGradient id="_asfl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fde047"/>
            <stop offset="0.4" stop-color="#fb923c"/>
            <stop offset="1" stop-color="#dc2626"/>
          </linearGradient>
          <linearGradient id="_asflI" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fff"/>
            <stop offset="0.5" stop-color="#fde047"/>
            <stop offset="1" stop-color="#fb923c" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <g class="_as-flame-body">
          <path d="M48,6 C58,22 76,32 80,52 C84,76 70,104 48,108 C26,104 12,76 16,52 C20,32 38,22 48,6 Z" fill="url(#_asfl)"/>
          <path d="M48,30 C54,42 64,50 66,64 C68,82 60,98 48,100 C36,98 28,82 30,64 C32,50 42,42 48,30 Z" fill="url(#_asflI)" opacity=".85"/>
        </g>
      </svg>
      <span class="_as-num">${streak}</span>
    </div>
    <h2 class="_as-title"><em>${streakWord}</em> de racha</h2>
    <p class="_as-sub">tu mejor racha histórica: <b>${best} días</b></p>
  </div>

  <div class="_as-week">${weekHTML}</div>

  <div class="_as-rewards">
    <div class="_as-reward aura">
      <div class="_as-reward-ic">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 10c0-1.5 1.3-3 3-3s3 1.5 3 3-1.3 2.5-3 2.5-3 1-3 2.5 1.3 3 3 3 3-1.5 3-3"/></svg>
      </div>
      <div class="_as-reward-meta">
        <span class="_as-reward-val">${AP_DAILY}</span>
        <span class="_as-reward-lbl">puntos aura</span>
      </div>
    </div>
    <div class="_as-reward xp">
      <div class="_as-reward-ic">
        <svg viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>
      </div>
      <div class="_as-reward-meta">
        <span class="_as-reward-val">${XP_DAILY}</span>
        <span class="_as-reward-lbl">xp ganados</span>
      </div>
    </div>
  </div>

  <div class="_as-milestone-row">
    <div class="_as-milestone-ic">★</div>
    <div class="_as-milestone-meta">
      <span class="_as-milestone-l">próxima meta · ${nextM} días</span>
      <span class="_as-milestone-t">en <b>${daysLabel}</b> ganas <b>+100 aura</b> bonus</span>
    </div>
    <div class="_as-milestone-bar">
      <div class="_as-milestone-fill" style="width:${fillPct}%"></div>
    </div>
  </div>

  <div class="_as-actions">
    <button class="_as-btn _as-ghost" id="_as-later-btn">Más tarde</button>
    <button class="_as-btn _as-primary" id="_as-claim-btn">
      Reclamar y entrenar
      <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </button>
  </div>
</div>`;
    return ov;
  }

  /* ── cerrar popup ───────────────────────────────── */
  function closePopup(overlay) {
    overlay.classList.add('hiding');
    setTimeout(function() {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 220);
  }

  /* ── otorgar recompensa diaria en Supabase ──────── */
  async function grantDailyReward(userId) {
    if (rewardedToday()) return;
    if (!window._aura || !window._aura.sb) return;
    try {
      var sb = window._aura.sb;
      // Leer valores actuales
      var res = await sb.from('profiles').select('aura_points,xp').eq('id', userId).single();
      if (res.error || !res.data) return;
      var newAP = (res.data.aura_points || 0) + AP_DAILY;
      var newXP = (res.data.xp         || 0) + XP_DAILY;
      await sb.from('profiles').update({ aura_points: newAP, xp: newXP }).eq('id', userId);
      // Actualizar cache local
      if (window._aura.profile) {
        window._aura.profile.aura_points = newAP;
        window._aura.profile.xp          = newXP;
      }
      markRewarded();
    } catch(e) { /* silencioso */ }
  }

  /* ── mostrar popup ──────────────────────────────── */
  function showPopup(profile) {
    injectCSS();
    var overlay = buildPopup(profile);
    document.body.appendChild(overlay);
    markShown();

    // Otorgar recompensa automáticamente
    if (profile.id) grantDailyReward(profile.id);

    // Botón cerrar (×)
    document.getElementById('_as-close-btn').addEventListener('click', function() {
      closePopup(overlay);
    });
    // Más tarde
    document.getElementById('_as-later-btn').addEventListener('click', function() {
      closePopup(overlay);
    });
    // Reclamar y entrenar → cierra y va al home
    document.getElementById('_as-claim-btn').addEventListener('click', function() {
      closePopup(overlay);
      var path = window.location.pathname;
      if (!path.includes('home')) {
        window.location.href = 'home.html';
      }
    });
    // Clic fuera del modal
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closePopup(overlay);
    });
  }

  /* ── esperar perfil y mostrar ───────────────────── */
  var _attempts = 0;
  function tryShow() {
    if (shownToday()) return;
    var p = window._aura && window._aura.profile;
    if (p && (p.streak_actual !== undefined)) {
      showPopup(p);
      return;
    }
    _attempts++;
    if (_attempts < 20) setTimeout(tryShow, 400); // hasta ~8s
  }

  /* ── init ───────────────────────────────────────── */
  if (shownToday()) return; // ya mostrado hoy, salir inmediatamente
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(tryShow, 600); });
  } else {
    setTimeout(tryShow, 600);
  }

})();

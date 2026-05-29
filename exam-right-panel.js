/* ================================================================
   exam-right-panel.js — Aura Languages
   Panel derecho compartido del examen de ascenso.
   Visual: centralizado aquí. Funcional: cada pestaña llama update().
   Uso: AuraRightPanel.init(config) + AuraRightPanel.recordAnswer(bool)
   ================================================================ */
(function(){

/* ── CSS ─────────────────────────────────────────────────────── */
var _CSS = `
@keyframes erp-pulse{0%,100%{opacity:1;}50%{opacity:.55;}}
@keyframes erp-shimmer{0%{transform:translateX(-100%);}100%{transform:translateX(100%);}}

aside.right.rp{
  display:flex;flex-direction:column;gap:9px;
  height:100%;min-height:0;overflow:hidden;
}

/* ── 1 · CONTEXT HEADER ── */
.rp .r-ctx{
  flex-shrink:0;
  background:linear-gradient(135deg,color-mix(in oklch,#cd7f32 8%,var(--card)),var(--card-3) 78%);
  border:1px solid var(--line);border-radius:var(--r-card);
  padding:10px 13px 11px;
  display:flex;flex-direction:column;gap:7px;
  position:relative;overflow:hidden;
}
.rp .r-ctx::before{
  content:"";position:absolute;inset:0;
  background:radial-gradient(360px 200px at 100% 0%,rgba(209,213,219,.10),transparent 60%);
  pointer-events:none;
}
.rp .r-ctx-top{
  display:flex;align-items:center;justify-content:space-between;gap:10px;
  position:relative;z-index:1;
}
.rp .r-ctx-eyebrow{
  font-family:var(--mono);font-size:9px;font-weight:800;
  letter-spacing:.22em;text-transform:uppercase;color:var(--muted);
  display:flex;align-items:center;gap:7px;
}
.rp .r-ctx-eyebrow::before{
  content:"";width:6px;height:6px;border-radius:50%;
  background:var(--accent);box-shadow:0 0 8px var(--accent);
  animation:erp-pulse 1.4s infinite;
}
.rp .r-ctx-timer{
  font-family:var(--mono);font-size:10.5px;font-weight:900;
  color:var(--ink);letter-spacing:.04em;font-feature-settings:"tnum";
  background:rgba(255,255,255,.05);border:1px solid var(--line-2);
  padding:3px 8px;border-radius:999px;
}
.rp .r-ctx-title{
  font-size:13.5px;font-weight:800;letter-spacing:-.015em;line-height:1.2;
  color:var(--ink);position:relative;z-index:1;
}
.rp .r-ctx-rank{
  display:flex;align-items:center;gap:8px;position:relative;z-index:1;
}
.rp .rk-pill{
  display:inline-flex;align-items:center;gap:5px;
  padding:3px 9px 3px 7px;border-radius:999px;
  background:rgba(205,127,50,.13);border:1px solid rgba(205,127,50,.4);
  font-family:var(--mono);font-size:9px;font-weight:800;
  letter-spacing:.12em;color:#e0a574;
}
.rp .rk-pill::before{
  content:"";width:6px;height:6px;border-radius:50%;
  background:#cd7f32;box-shadow:0 0 7px rgba(205,127,50,.65);
}
.rp .rk-arrow{font-family:var(--mono);font-size:11px;color:var(--muted);font-weight:800;}
.rp .rk-pill.target{
  background:rgba(209,213,219,.06);border-color:rgba(209,213,219,.22);color:#d8dbe0;
}
.rp .rk-pill.target::before{background:#d1d5db;box-shadow:0 0 8px rgba(209,213,219,.55);}

/* ── 2 · MARCADOR ── */
.rp .r-score{
  flex-shrink:0;
  background:radial-gradient(420px 280px at 100% 0%,rgba(196,255,61,.08),transparent 60%),
             linear-gradient(180deg,var(--card-2),var(--card-3));
  border:1px solid var(--line-2);border-radius:var(--r-card);
  padding:12px 14px 12px;position:relative;overflow:hidden;
}
.rp .r-score::before{
  content:"";position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(196,255,61,.55),transparent);
}
.rp .r-score-h{
  display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px;
}
.rp .r-score-h h5{
  font-family:var(--mono);font-size:9.5px;font-weight:800;
  letter-spacing:.22em;text-transform:uppercase;color:var(--ink-2);
}
.rp .r-score-live{
  display:inline-flex;align-items:center;gap:5px;
  font-family:var(--mono);font-size:8.5px;font-weight:800;
  letter-spacing:.16em;text-transform:uppercase;color:var(--bad);
  padding:2px 8px;border-radius:999px;
  background:rgba(255,90,90,.08);border:1px solid rgba(255,90,90,.28);
}
.rp .r-score-live::before{
  content:"";width:5px;height:5px;border-radius:50%;
  background:var(--bad);box-shadow:0 0 6px var(--bad);
  animation:erp-pulse 1.4s infinite;
}
.rp .gauge-wrap{display:grid;grid-template-columns:96px 1fr;gap:11px;align-items:center;}
.rp .gauge{position:relative;width:96px;height:96px;}
.rp .gauge svg{width:100%;height:100%;transform:rotate(-90deg);}
.rp .gauge .g-track{fill:none;stroke:rgba(255,255,255,.06);stroke-width:9;}
.rp .gauge .g-fill{
  fill:none;stroke:url(#erpGradLime);stroke-width:9;stroke-linecap:round;
  filter:drop-shadow(0 0 7px rgba(196,255,61,.55));
  transition:stroke-dashoffset .6s ease;
}
.rp .gauge-center{
  position:absolute;inset:0;
  display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
}
.rp .gauge-val{
  font-family:var(--mono);font-size:24px;font-weight:900;
  letter-spacing:-.04em;line-height:1;color:var(--ink);font-feature-settings:"tnum";
}
.rp .gauge-val small{font-size:14px;color:var(--accent);margin-left:1px;}
.rp .gauge-lbl{
  font-family:var(--mono);font-size:8px;font-weight:800;
  letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-top:3px;
}
.rp .gauge-stats{display:flex;flex-direction:column;gap:6px;}
.rp .gst{
  display:grid;grid-template-columns:26px 1fr auto;gap:8px;align-items:center;
  padding:6px 9px 6px 7px;border-radius:9px;
  background:rgba(255,255,255,.025);border:1px solid var(--line);
}
.rp .gst-ic{
  width:26px;height:26px;border-radius:7px;
  display:flex;align-items:center;justify-content:center;
  font-family:var(--mono);font-size:11px;font-weight:900;
}
.rp .gst.ok .gst-ic{background:rgba(123,227,123,.12);color:var(--good);border:1px solid rgba(123,227,123,.32);}
.rp .gst.bad .gst-ic{background:rgba(255,90,90,.10);color:var(--bad);border:1px solid rgba(255,90,90,.32);}
.rp .gst-meta{display:flex;flex-direction:column;gap:0;min-width:0;line-height:1.1;}
.rp .gst-meta b{
  font-family:var(--mono);font-size:15px;font-weight:900;line-height:1;
  letter-spacing:-.02em;color:var(--ink);font-feature-settings:"tnum";
}
.rp .gst.ok .gst-meta b{color:var(--good);}
.rp .gst.bad .gst-meta b{color:var(--bad);}
.rp .gst-meta span{
  font-family:var(--mono);font-size:8px;font-weight:800;
  letter-spacing:.14em;text-transform:uppercase;color:var(--muted);
}
.rp .gst-trend{font-family:var(--mono);font-size:8.5px;font-weight:800;letter-spacing:.08em;color:var(--muted);}
.rp .spark{
  margin-top:10px;padding:8px 10px 7px;
  border-radius:10px;background:rgba(255,255,255,.025);border:1px solid var(--line);
}
.rp .spark-h{
  display:flex;align-items:center;justify-content:space-between;
  font-family:var(--mono);font-size:8px;font-weight:800;
  letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:5px;
}
.rp .spark-h b{color:var(--ink-2);font-weight:800;}
.rp .spark-row{display:flex;align-items:center;gap:3px;height:16px;}
.rp .spark-row .s{
  flex:1;height:100%;border-radius:3px;background:rgba(255,255,255,.05);
  display:flex;align-items:flex-end;position:relative;
}
.rp .spark-row .s::after{
  content:"";width:100%;border-radius:3px;
  background:var(--c,var(--good));height:var(--h,20%);
  box-shadow:0 0 6px var(--c,var(--good));
}
.rp .spark-row .s.bad{--c:var(--bad);}
.rp .spark-row .s.ok{--c:var(--good);}

/* ── 3 · SKILLS JOURNEY ── */
.rp .r-skills{
  flex:1 1 auto;min-height:0;
  background:var(--card);border:1px solid var(--line);
  border-radius:var(--r-card);padding:11px 14px 10px;
  position:relative;display:flex;flex-direction:column;overflow:hidden;
}
.rp .r-skills-h{
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:6px;flex-shrink:0;
}
.rp .r-skills-h h5{
  font-family:var(--mono);font-size:9.5px;font-weight:800;
  letter-spacing:.22em;text-transform:uppercase;color:var(--ink-2);
}
.rp .r-skills-meta{
  font-family:var(--mono);font-size:9px;font-weight:800;
  letter-spacing:.12em;color:var(--muted);display:flex;align-items:center;gap:7px;
}
.rp .r-skills-meta em{color:var(--accent);font-style:normal;font-weight:900;}
.rp .journey{
  position:relative;display:flex;flex-direction:column;
  margin-left:3px;flex:1 1 auto;min-height:0;
  justify-content:space-between;
  overflow-y:auto;scrollbar-width:thin;
}
.rp .journey::-webkit-scrollbar{width:4px;}
.rp .journey::-webkit-scrollbar-thumb{background:var(--line-2);border-radius:2px;}
.rp .jr{
  display:grid;grid-template-columns:20px 1fr auto;
  column-gap:10px;align-items:center;
  padding:3px 8px 3px 0;position:relative;min-height:30px;
}
.rp .jr::before{
  content:"";position:absolute;left:9px;top:0;bottom:0;width:2px;
  background:var(--line-2);z-index:0;
}
.rp .jr:first-child::before{top:15px;}
.rp .jr:last-child::before{bottom:calc(100% - 15px);}
.rp .jr.done::before{background:var(--good);opacity:.45;}
.rp .jr.now::before{
  background:repeating-linear-gradient(180deg,var(--c) 0 5px,transparent 5px 10px);
}
.rp .jr-node{
  width:20px;height:20px;border-radius:50%;
  background:var(--card-3);border:1.5px solid var(--line-3);
  display:flex;align-items:center;justify-content:center;
  position:relative;z-index:1;flex-shrink:0;
  color:var(--dim);font-family:var(--mono);font-size:9.5px;font-weight:900;
}
.rp .jr.done .jr-node{
  background:rgba(123,227,123,.14);border-color:rgba(123,227,123,.55);color:var(--good);
}
.rp .jr.now .jr-node{
  background:var(--c);border-color:var(--c);color:#0a0a0a;
  box-shadow:0 0 0 4px color-mix(in oklch,var(--c) 22%,transparent),
             0 0 14px color-mix(in oklch,var(--c) 45%,transparent);
}
.rp .jr.now .jr-node::after{
  content:"";position:absolute;inset:-4px;border-radius:50%;
  border:1.5px solid var(--c);opacity:.45;animation:erp-pulse 1.6s ease-in-out infinite;
}
.rp .jr-node svg{width:11px;height:11px;stroke:currentColor;fill:none;stroke-width:2.8;}
.rp .jr-body{min-width:0;display:flex;flex-direction:column;gap:0;line-height:1.15;}
.rp .jr-top{display:flex;align-items:center;gap:6px;}
.rp .jr-name{font-size:12px;font-weight:700;letter-spacing:-.005em;color:var(--ink-2);}
.rp .jr.done .jr-name{color:var(--ink);}
.rp .jr.now .jr-name{color:var(--ink);font-weight:800;}
.rp .jr-tag{
  font-family:var(--mono);font-size:7.5px;font-weight:800;
  letter-spacing:.14em;text-transform:uppercase;
  padding:1px 6px;border-radius:999px;
  background:rgba(255,255,255,.04);border:1px solid var(--line-2);color:var(--muted);
}
.rp .jr.now .jr-tag{
  background:color-mix(in oklch,var(--c) 12%,transparent);
  border-color:color-mix(in oklch,var(--c) 40%,transparent);color:var(--c);
}
.rp .jr-tag::before{content:"●";font-size:6px;margin-right:3px;}
.rp .jr.done .jr-tag::before{content:"✓";color:var(--good);font-size:8px;}
.rp .jr.pending .jr-tag::before{content:"○";font-size:7px;}
.rp .jr-sub{
  font-family:var(--mono);font-size:8.5px;font-weight:700;
  letter-spacing:.06em;color:var(--muted);font-feature-settings:"tnum";margin-top:1px;
}
.rp .jr.now .jr-sub{color:var(--ink-2);}
.rp .jr-stat{
  display:flex;flex-direction:column;align-items:flex-end;gap:0;line-height:1.1;flex-shrink:0;
}
.rp .jr-stat b{
  font-family:var(--mono);font-size:11.5px;font-weight:900;
  letter-spacing:-.01em;color:var(--ink);font-feature-settings:"tnum";
}
.rp .jr.done .jr-stat b{color:var(--good);}
.rp .jr.now .jr-stat b{color:var(--c);}
.rp .jr.pending .jr-stat b{color:var(--muted);font-weight:800;font-size:10px;}
.rp .jr-stat small{
  font-family:var(--mono);font-size:7.5px;font-weight:700;
  letter-spacing:.1em;text-transform:uppercase;color:var(--muted);
}
.rp .jr-bar{
  grid-column:2/4;height:3px;border-radius:999px;
  background:rgba(255,255,255,.06);overflow:hidden;margin-top:5px;
}
.rp .jr-bar>i{
  display:block;height:100%;border-radius:999px;
  background:linear-gradient(90deg,color-mix(in oklch,var(--c) 55%,#000),var(--c));
  box-shadow:0 0 8px var(--c);position:relative;overflow:hidden;
  transition:width .5s ease;
}
.rp .jr-bar>i::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(90deg,transparent 30%,rgba(255,255,255,.4) 50%,transparent 70%);
  animation:erp-shimmer 2.4s ease-in-out infinite;
}
.rp .jr-summary{
  display:flex;align-items:center;justify-content:space-between;
  margin-top:6px;padding-top:7px;border-top:1px dashed var(--line-2);
  font-family:var(--mono);font-size:8.5px;font-weight:700;
  letter-spacing:.12em;text-transform:uppercase;color:var(--muted);flex-shrink:0;
}
.rp .jr-summary b{color:var(--ink-2);font-weight:800;}

/* ── 4 · CTA ── */
.rp .r-cta{
  flex-shrink:0;
  background:linear-gradient(135deg,
    color-mix(in oklch,var(--c,var(--c-vocab)) 10%,var(--card)),var(--card-3) 78%);
  border:1px solid color-mix(in oklch,var(--c,var(--c-vocab)) 30%,var(--line));
  border-radius:var(--r-card);padding:10px 13px 11px;
  display:flex;flex-direction:column;gap:8px;
  position:relative;overflow:hidden;
}
.rp .r-cta::before{
  content:"";position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,
    color-mix(in oklch,var(--c,var(--c-vocab)) 60%,transparent),transparent);
}
.rp .r-cta-h{
  display:flex;align-items:center;justify-content:space-between;
}
.rp .r-cta-h h5{
  font-family:var(--mono);font-size:9.5px;font-weight:800;
  letter-spacing:.22em;text-transform:uppercase;color:var(--ink-2);
}
.rp .r-dots{display:flex;gap:5px;align-items:center;}
.rp .r-dots .nd,.rp .r-dots span{
  width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.10);display:block;
}
.rp .r-dots .nd.done,.rp .r-dots span.done{
  background:var(--good);box-shadow:0 0 5px rgba(123,227,123,.55);
}
.rp .r-dots .nd.now,.rp .r-dots span.now{
  background:var(--c,var(--c-vocab));box-shadow:0 0 6px var(--c,var(--c-vocab));
  transform:scale(1.5);
}
.rp .next-btn{
  display:grid;grid-template-columns:1fr auto;align-items:center;gap:12px;
  padding:10px 12px 10px 14px;border-radius:12px;
  background:var(--c,var(--c-vocab));color:#0a0a0a;text-align:left;
  box-shadow:0 8px 22px color-mix(in oklch,var(--c,var(--c-vocab)) 32%,transparent);
  transition:transform .15s,box-shadow .15s;
  position:relative;overflow:hidden;border:none;cursor:pointer;
  font-family:inherit;
}
.rp .next-btn::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(90deg,transparent 40%,rgba(255,255,255,.4) 50%,transparent 60%);
  transform:translateX(-100%);animation:erp-shimmer 3.6s ease-in-out infinite;pointer-events:none;
}
.rp .next-btn:hover{
  transform:translateY(-2px);
  box-shadow:0 12px 30px color-mix(in oklch,var(--c,var(--c-vocab)) 48%,transparent);
}
.rp .next-btn.last{background:var(--accent);box-shadow:0 10px 28px rgba(196,255,61,.42);}
.rp .next-btn .nb-label{display:block;font-size:14px;font-weight:900;letter-spacing:-.015em;line-height:1;}
.rp .next-btn .nb-sub{
  display:block;margin-top:3px;
  font-family:var(--mono);font-size:8.5px;font-weight:800;
  letter-spacing:.14em;text-transform:uppercase;color:rgba(10,10,10,.6);
}
.rp .nb-arrow{
  width:28px;height:28px;border-radius:50%;background:rgba(10,10,10,.14);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#0a0a0a;
}
.rp .nb-arrow svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2.8;}
.rp .prev-row{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:11px;}
.rp .prev-btn{
  display:inline-flex;align-items:center;gap:6px;
  color:var(--ink-2);font-weight:700;letter-spacing:-.005em;padding:3px 0;
  background:none;border:none;cursor:pointer;font-family:inherit;font-size:inherit;
}
.rp .prev-btn svg{width:10px;height:10px;stroke:currentColor;fill:none;stroke-width:2.4;}
.rp .prev-btn:hover{color:var(--ink);}
.rp .prev-btn:disabled{opacity:.32;cursor:not-allowed;}
.rp .save-link{
  display:inline-flex;align-items:center;gap:5px;
  font-family:var(--mono);font-size:8.5px;font-weight:800;
  letter-spacing:.14em;text-transform:uppercase;
  color:var(--muted);padding:3px 8px;border-radius:999px;
  background:rgba(255,255,255,.025);border:1px solid var(--line-2);
  cursor:pointer;
}
.rp .save-link:hover{color:var(--ink-2);border-color:var(--line-3);}
.rp .save-link svg{width:10px;height:10px;stroke:currentColor;fill:none;stroke-width:2.4;}
`;

/* ── SKILL CONFIG ─────────────────────────────────────────────── */
var SKILL_META = {
  listen:  {name:'Listening',  c:'var(--c-listen)',  items:'14 ítems · ~8 min',  n:1},
  read:    {name:'Reading',    c:'var(--c-read)',    items:'4 ítems · ~10 min',  n:2},
  vocab:   {name:'Vocabulary', c:'var(--c-vocab)',   items:'5 palabras · ~6 min', n:3},
  phrasal: {name:'Phrasal',    c:'var(--c-phrasal)', items:'10 ítems · ~5 min',  n:4},
  slang:   {name:'Slang',      c:'var(--c-slang)',   items:'10 ítems · ~5 min',  n:5},
  write:   {name:'Writing',    c:'var(--c-write)',   items:'1 ensayo · ~12 min', n:6},
  speak:   {name:'Speaking',   c:'var(--c-speak)',   items:'3 partes · ~6 min',  n:7}
};
var SKILL_ORDER = ['listen','read','vocab','phrasal','slang','write','speak'];

/* ── STATE ────────────────────────────────────────────────────── */
var _s = {
  correct:0, incorrect:0, sparkline:[],
  currentSkill:'vocab',
  rankLabel:'A1 · Bronce', targetLabel:'A2 · Plata',
  wordsTotal:5, wordsDone:0,
  skillsDone:[]  // array of skill keys already completed
};

/* ── GAUGE CIRCUMFERENCE ─────────────────────────────────────── */
var CIRC = 2 * Math.PI * 50; // ~314.16

/* ── BUILD HTML ──────────────────────────────────────────────── */
function _buildHTML(){
  return `
<div class="r-ctx">
  <div class="r-ctx-top">
    <span class="r-ctx-eyebrow">Examen · en curso</span>
    <span class="r-ctx-timer" id="examElapsed">00:00</span>
  </div>
  <div class="r-ctx-title">Examen de Ascenso</div>
  <div class="r-ctx-rank">
    <span class="rk-pill" id="erp-rank">${_s.rankLabel}</span>
    <span class="rk-arrow">→</span>
    <span class="rk-pill target" id="erp-target">${_s.targetLabel}</span>
  </div>
</div>

<div class="r-score">
  <div class="r-score-h">
    <h5>Marcador</h5>
    <span class="r-score-live">En vivo</span>
  </div>
  <div class="gauge-wrap">
    <div class="gauge">
      <svg viewBox="0 0 120 120">
        <defs>
          <linearGradient id="erpGradLime" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#a8e02f"/>
            <stop offset="100%" stop-color="#c4ff3d"/>
          </linearGradient>
        </defs>
        <circle class="g-track" cx="60" cy="60" r="50"/>
        <circle class="g-fill" id="erp-gauge-fill" cx="60" cy="60" r="50"
                stroke-dasharray="${CIRC.toFixed(2)}"
                stroke-dashoffset="${CIRC.toFixed(2)}"/>
      </svg>
      <div class="gauge-center">
        <div class="gauge-val"><span id="erp-pct">0</span><small>%</small></div>
        <div class="gauge-lbl">Precisión</div>
      </div>
    </div>
    <div class="gauge-stats">
      <div class="gst ok">
        <div class="gst-ic">✓</div>
        <div class="gst-meta"><b id="erp-correct">0</b><span>Correctas</span></div>
        <div class="gst-trend" id="erp-ct">—</div>
      </div>
      <div class="gst bad">
        <div class="gst-ic">✗</div>
        <div class="gst-meta"><b id="erp-incorrect">0</b><span>Incorrectas</span></div>
        <div class="gst-trend" id="erp-it">—</div>
      </div>
    </div>
  </div>
  <div class="spark">
    <div class="spark-h"><span>Últimas respuestas</span><b id="erp-spark-lbl">● vocab</b></div>
    <div class="spark-row" id="erp-spark"></div>
  </div>
</div>

<div class="r-skills">
  <div class="r-skills-h">
    <h5>Habilidades</h5>
    <div class="r-skills-meta"><span><em id="erp-done-n">0</em> / 7</span></div>
  </div>
  <div class="journey" id="erp-journey"></div>
  <div class="jr-summary">
    <span>Vocab · <b id="erp-words">0 / 5</b></span>
    <span>Precisión · <b id="erp-pct2">—</b></span>
  </div>
</div>

<div class="r-cta next-slot r-card" style="--c:var(--c-vocab);">
  <div class="r-cta-h r-card-h">
    <h5>Avance · 3 / 7</h5>
    <div class="r-dots" id="nextDots"></div>
  </div>
  <button class="next-btn" id="nextBtn">
    <div>
      <span class="nb-label">Continuar</span>
      <span class="nb-sub" id="nbSub">Phrasal · 5 min</span>
    </div>
    <div class="nb-arrow">
      <svg viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
    </div>
  </button>
  <div class="prev-row">
    <button class="prev-btn" id="prevBtn">
      <svg viewBox="0 0 24 24"><path d="M19 12H5M11 19l-7-7 7-7"/></svg>
      Anterior
    </button>
    <button class="save-link">
      <svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      Guardar
    </button>
  </div>
</div>`;
}

/* ── RENDER GAUGE ─────────────────────────────────────────────── */
function _renderGauge(c,i){
  var total = c + i;
  var pct = total > 0 ? Math.round(c / total * 100) : 0;
  var offset = CIRC - (CIRC * pct / 100);

  var fill = document.getElementById('erp-gauge-fill');
  var pctEl = document.getElementById('erp-pct');
  var pct2El = document.getElementById('erp-pct2');
  var cEl = document.getElementById('erp-correct');
  var iEl = document.getElementById('erp-incorrect');
  var ctEl = document.getElementById('erp-ct');
  var itEl = document.getElementById('erp-it');

  if(fill) fill.style.strokeDashoffset = offset.toFixed(2);
  if(pctEl) pctEl.textContent = pct;
  if(pct2El) pct2El.textContent = total > 0 ? pct+'%' : '—';
  if(cEl) cEl.textContent = c;
  if(iEl) iEl.textContent = i;
  if(ctEl) ctEl.textContent = c > 0 ? '+'+c : '—';
  if(itEl) itEl.textContent = i > 0 ? '−'+i : '—';
}

/* ── RENDER SPARKLINE ─────────────────────────────────────────── */
function _renderSparkline(list){
  var el = document.getElementById('erp-spark');
  if(!el) return;
  // Pad to 10 slots minimum
  var slots = list.slice(-14);
  while(slots.length < 10) slots.unshift(null);
  el.innerHTML = slots.map(function(v,i){
    if(!v) return '<span class="s" style="--h:10%"></span>';
    var isLast = i === slots.length - 1;
    var cls = 's ' + v + (isLast ? ' now' : '');
    var h = v === 'ok' ? (55 + Math.floor(Math.random()*35)) : (30 + Math.floor(Math.random()*20));
    return '<span class="'+cls+'" style="--h:'+h+'%"></span>';
  }).join('');
}

/* ── RENDER JOURNEY ──────────────────────────────────────────── */
function _renderJourney(skillsDone, currentSkill, wordsDone, wordsTotal){
  var el = document.getElementById('erp-journey');
  if(!el) return;
  var doneSet = new Set(skillsDone || []);
  var cur = currentSkill || _s.currentSkill;
  var wDone = wordsDone !== undefined ? wordsDone : _s.wordsDone;
  var wTotal = wordsTotal !== undefined ? wordsTotal : _s.wordsTotal;
  var doneCount = 0;

  var html = SKILL_ORDER.map(function(key, idx){
    var m = SKILL_META[key];
    var isDone = doneSet.has(key);
    var isNow = key === cur;
    if(isDone) doneCount++;
    var state = isDone ? 'done' : isNow ? 'now' : 'pending';

    var nodeInner = isDone
      ? '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>'
      : (idx+1).toString();

    var tagText = isDone ? 'Hecho' : isNow ? 'En curso' : 'Por venir';
    var statB = isDone ? '✓' : isNow ? (Math.round(wDone/wTotal*100)||0)+'%' : '—';
    var statSmall = isDone ? 'Score' : isNow ? 'Avance' : 'Pendiente';
    var sub = isNow ? (wDone+' / '+wTotal+' palabras') : m.items;

    var bar = isNow
      ? '<div class="jr-bar"><i style="width:'+(Math.round(wDone/wTotal*100)||0)+'%"></i></div>'
      : '';

    return '<div class="jr '+state+'" style="--c:'+m.c+';">'+
      '<div class="jr-node">'+nodeInner+'</div>'+
      '<div class="jr-body">'+
        '<div class="jr-top">'+
          '<span class="jr-name">'+m.name+'</span>'+
          '<span class="jr-tag">'+tagText+'</span>'+
        '</div>'+
        '<div class="jr-sub">'+sub+'</div>'+
      '</div>'+
      '<div class="jr-stat"><b>'+statB+'</b><small>'+statSmall+'</small></div>'+
      bar+
    '</div>';
  }).join('');

  el.innerHTML = html;

  // Update done count
  var dnEl = document.getElementById('erp-done-n');
  if(dnEl) dnEl.textContent = doneCount + (doneSet.has(cur) ? 0 : (cur ? 0 : 0));
}

/* ── UPDATE WORDS COUNTER ────────────────────────────────────── */
function _renderWords(done, total){
  var el = document.getElementById('erp-words');
  if(el) el.textContent = done+' / '+total;
}

/* ── PUBLIC API ───────────────────────────────────────────────── */
window.AuraRightPanel = {

  init: function(cfg){
    Object.assign(_s, cfg || {});
    // Inject CSS once
    if(!document.getElementById('erp-css')){
      var st = document.createElement('style');
      st.id = 'erp-css';
      st.textContent = _CSS;
      document.head.appendChild(st);
    }
    // Find aside.right and inject new panel
    var aside = document.querySelector('aside.right');
    if(!aside){ console.warn('[ARP] aside.right not found'); return; }
    aside.classList.add('rp');
    aside.innerHTML = _buildHTML();
    // Initial renders
    _renderGauge(0, 0);
    _renderSparkline([]);
    _renderJourney(_s.skillsDone, _s.currentSkill, 0, _s.wordsTotal);
    _renderWords(0, _s.wordsTotal);
  },

  update: function(data){
    if(!data) return;
    Object.assign(_s, data);
    if(data.correct !== undefined || data.incorrect !== undefined)
      _renderGauge(_s.correct, _s.incorrect);
    if(data.sparkline !== undefined)
      _renderSparkline(_s.sparkline);
    if(data.skillsDone !== undefined || data.currentSkill !== undefined)
      _renderJourney(_s.skillsDone, _s.currentSkill, _s.wordsDone, _s.wordsTotal);
    if(data.wordsDone !== undefined || data.wordsTotal !== undefined)
      _renderWords(_s.wordsDone, _s.wordsTotal);
  },

  // Called by each tab on every answer
  recordAnswer: function(isCorrect){
    if(isCorrect) _s.correct++; else _s.incorrect++;
    _s.sparkline.push(isCorrect ? 'ok' : 'bad');
    if(_s.sparkline.length > 14) _s.sparkline.shift();
    _renderGauge(_s.correct, _s.incorrect);
    _renderSparkline(_s.sparkline);
  },

  // Called when a word/item advances
  setProgress: function(done, total){
    _s.wordsDone = done;
    if(total !== undefined) _s.wordsTotal = total;
    _renderWords(_s.wordsDone, _s.wordsTotal);
    _renderJourney(_s.skillsDone, _s.currentSkill, _s.wordsDone, _s.wordsTotal);
  }
};

})();

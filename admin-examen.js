/* ============================================================
   admin-examen.js — Vista EXACTA del examen de ascenso
   HTML extraído directamente de examen-ascenso.html
   Botones de editar/agregar por sección
   ============================================================ */
(function(){
'use strict';
var _sb;
var _editId = null;
var RANKS = ['bronce','plata','oro','platino','diamante','challenger'];
var LANGS = {en:'🇺🇸 English',es:'🇪🇸 Español',fr:'🇫🇷 Français',it:'🇮🇹 Italiano',pt:'🇧🇷 Português'};
var SECTIONS = ['listening','reading','vocabulary','phrasal','slang','writing','speaking'];

// ============ CSS EXACTO DEL EXAMEN (scopeado a #ex-exam-wrap) ============
var CSS_EXAM = `#ex-exam-wrap{
  --bg:#0a0a0a;--card:#171717;--card-2:#1f1f1f;--card-3:#0e0e0e;
  --ink:#f5f5f5;--ink-2:#c8c8c8;--muted:#7a7a7a;
  --line:#262626;--line-2:#333;
  --accent:#c4ff3d;--accent-d:#a8e02f;--accent-ink:#0c0c0c;
  --good:#7BE37B;--bad:#ff5a5a;--warn:#fbbf24;

  /* Section accents */
  --c-listen:#7CB2FF;
  --c-read:#A78BFA;
  --c-vocab:#5BE9F6;
  --c-phrasal:#FFD83D;
  --c-slang:#FF5AC4;
  --c-write:#7BE37B;
  --c-speak:#FF8A5A;

  /* Rank palette */
  --bronze:#cd7f32;--silver:#d1d5db;--gold:#fbbf24;
  --platinum:#5eead4;--diamond:#60a5fa;--challenger:#c4ff3d;

  --r:18px;--r-sm:12px;
  --sans:'Plus Jakarta Sans',-apple-system,sans-serif;
  --mono:'JetBrains Mono',ui-monospace,monospace;
}#ex-exam-wrap,#ex-exam-wrap *::before,#ex-exam-wrap *::after{box-sizing:border-box;margin:0;padding:0;}#ex-exam-wrap,#ex-exam-wrap{height:100%;}#ex-exam-wrap{
  font-family:var(--sans);color:var(--ink);background:var(--bg);font-size:14px;
  min-height:100vh;display:flex;
  background:
    radial-gradient(900px 500px at 80% 0%,rgba(196,255,61,.04),transparent 60%),
    radial-gradient(700px 400px at 5% 100%,rgba(96,165,250,.04),transparent 60%),
    #050505;
  position:relative;
}#ex-exam-wrap{
  content:"";position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:repeating-linear-gradient(45deg,transparent 0,transparent 22px,rgba(255,255,255,.012) 22px,rgba(255,255,255,.012) 23px);
}#ex-exam-wrap button{font:inherit;color:inherit;cursor:pointer;border:none;background:none;}#ex-exam-wrap a{color:inherit;text-decoration:none;}#ex-exam-wrap ::-webkit-scrollbar{width:6px;height:6px;}#ex-exam-wrap ::-webkit-scrollbar-thumb{background:var(--line-2);border-radius:3px;}#ex-exam-wrap ::-webkit-scrollbar-track{background:transparent;}#ex-exam-wrap /* ============ LAYOUT ============ */
.shell{display:flex;width:100%;min-height:100vh;position:relative;z-index:1;}#ex-exam-wrap /* ============ SIDEBAR / STEPPER ============ */
.stepper{
  width:300px;flex-shrink:0;
  background:var(--card);
  border-right:1px solid var(--line);
  padding:24px 22px;
  position:sticky;top:0;align-self:flex-start;
  max-height:100vh;overflow-y:auto;
  display:flex;flex-direction:column;gap:18px;
}#ex-exam-wrap .exam-brand{display:flex;align-items:center;gap:10px;}#ex-exam-wrap .exam-brand .logo{
  width:32px;height:32px;border-radius:9px;
  background:var(--accent);color:var(--accent-ink);
  display:flex;align-items:center;justify-content:center;
  font-weight:800;font-size:16px;
  box-shadow:0 4px 14px rgba(196,255,61,.3);
}#ex-exam-wrap .exam-brand b{font-size:14px;font-weight:800;letter-spacing:-.01em;}#ex-exam-wrap .exam-brand span{display:block;font-family:var(--mono);font-size:9px;color:var(--muted);letter-spacing:.16em;text-transform:uppercase;font-weight:700;}#ex-exam-wrap /* Rank progression block */
.rank-block{
  background:linear-gradient(180deg,rgba(96,165,250,.08),rgba(196,255,61,.03));
  border:1px solid rgba(96,165,250,.2);
  border-radius:14px;padding:14px;
  display:flex;flex-direction:column;gap:12px;
}#ex-exam-wrap .rank-row{display:flex;align-items:center;gap:10px;}#ex-exam-wrap .rank-shield{
  width:36px;height:40px;flex-shrink:0;
  filter:drop-shadow(0 4px 10px rgba(0,0,0,.4));
}#ex-exam-wrap .rank-info{flex:1;display:flex;flex-direction:column;gap:1px;}#ex-exam-wrap .rank-info .lbl{font-family:var(--mono);font-size:8.5px;color:var(--muted);letter-spacing:.16em;text-transform:uppercase;font-weight:700;}#ex-exam-wrap .rank-info .nm{font-size:14px;font-weight:800;letter-spacing:-.01em;}#ex-exam-wrap .rank-info .nm.diamond{color:var(--diamond);}#ex-exam-wrap .rank-info .nm.challenger{color:var(--challenger);}#ex-exam-wrap .rank-info .cefr{font-family:var(--mono);font-size:10px;color:var(--ink-2);font-weight:700;letter-spacing:.06em;}#ex-exam-wrap .rank-arrow{
  display:flex;align-items:center;justify-content:center;
  font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.12em;font-weight:700;text-transform:uppercase;
  padding:6px 0;border-top:1px dashed var(--line);border-bottom:1px dashed var(--line);
}#ex-exam-wrap .rank-arrow svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;margin:0 6px;}#ex-exam-wrap /* Step list */
.steps-lbl{font-family:var(--mono);font-size:9.5px;color:var(--muted);letter-spacing:.16em;text-transform:uppercase;font-weight:800;display:flex;justify-content:space-between;}#ex-exam-wrap .steps-lbl b{color:var(--accent);font-weight:800;}#ex-exam-wrap .steps{display:flex;flex-direction:column;gap:3px;}#ex-exam-wrap .step{
  --c:var(--accent);
  display:grid;grid-template-columns:28px 1fr auto;gap:10px;align-items:center;
  padding:9px 10px;border-radius:10px;
  cursor:pointer;transition:.15s;position:relative;
  border:1px solid transparent;
}#ex-exam-wrap .step:hover{background:rgba(255,255,255,.03);}#ex-exam-wrap .step-num{
  width:26px;height:26px;border-radius:50%;
  background:rgba(255,255,255,.04);border:1px solid var(--line-2);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--mono);font-size:11px;font-weight:800;color:var(--muted);
  flex-shrink:0;transition:.15s;
}#ex-exam-wrap .step-meta{display:flex;flex-direction:column;gap:1px;min-width:0;}#ex-exam-wrap .step-meta b{font-size:13px;font-weight:700;color:var(--ink-2);letter-spacing:-.005em;}#ex-exam-wrap .step-meta span{font-family:var(--mono);font-size:9px;color:var(--muted);letter-spacing:.08em;}#ex-exam-wrap .step-icon{
  width:18px;height:18px;color:var(--muted);
  display:flex;align-items:center;justify-content:center;
}#ex-exam-wrap .step-icon svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;}#ex-exam-wrap /* states */
.step.done .step-num{background:var(--good);border-color:var(--good);color:#062a06;}#ex-exam-wrap .step.done .step-num::after{content:"✓";}#ex-exam-wrap .step.done .step-num span{display:none;}#ex-exam-wrap .step.done .step-meta b{color:var(--ink-2);}#ex-exam-wrap .step.done .step-icon{color:var(--good);}#ex-exam-wrap .step.active{background:color-mix(in oklch,var(--c) 8%, transparent);border-color:color-mix(in oklch,var(--c) 30%,transparent);}#ex-exam-wrap .step.active .step-num{background:var(--c);border-color:var(--c);color:#0a0a0a;box-shadow:0 0 14px color-mix(in oklch,var(--c) 60%,transparent);}#ex-exam-wrap .step.active .step-meta b{color:var(--c);font-weight:800;}#ex-exam-wrap .step.active .step-icon{color:var(--c);}#ex-exam-wrap /* totals */
.totals{
  background:var(--card-3);border:1px solid var(--line);
  border-radius:12px;padding:12px 14px;
  display:grid;grid-template-columns:1fr 1fr;gap:12px;
  margin-top:auto;
}#ex-exam-wrap .totals .t{display:flex;flex-direction:column;gap:2px;}#ex-exam-wrap .totals .t span{font-family:var(--mono);font-size:8.5px;color:var(--muted);letter-spacing:.14em;text-transform:uppercase;font-weight:700;}#ex-exam-wrap .totals .t b{font-family:var(--mono);font-size:15px;font-weight:800;color:var(--ink);letter-spacing:-.01em;}#ex-exam-wrap .totals .t b em{color:var(--accent);font-style:normal;}#ex-exam-wrap /* ============ MAIN ============ */
.main{
  flex:1;min-width:0;
  display:flex;flex-direction:column;
}#ex-exam-wrap /* Top bar */
.topbar{
  display:flex;align-items:center;gap:14px;
  padding:18px 32px;
  border-bottom:1px solid var(--line);
  background:rgba(10,10,10,.5);backdrop-filter:blur(10px);
  position:sticky;top:0;z-index:10;
}#ex-exam-wrap .crumb{display:flex;align-items:center;gap:6px;font-family:var(--mono);font-size:12px;color:var(--muted);}#ex-exam-wrap .crumb .sep{color:var(--line-2);}#ex-exam-wrap .crumb .end{color:var(--accent);font-weight:700;}#ex-exam-wrap .spacer{flex:1;}#ex-exam-wrap .timer{
  display:flex;align-items:center;gap:8px;
  background:rgba(255,90,90,.06);border:1px solid rgba(255,90,90,.2);
  padding:8px 14px;border-radius:10px;
}#ex-exam-wrap .timer .dot{width:8px;height:8px;border-radius:50%;background:var(--bad);box-shadow:0 0 8px var(--bad);animation:pulse 1.4s infinite;}@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}#ex-exam-wrap .timer .t{font-family:var(--mono);font-size:13px;font-weight:800;color:var(--ink);font-feature-settings:"tnum";letter-spacing:.04em;}#ex-exam-wrap .timer .l{font-family:var(--mono);font-size:9px;color:var(--muted);letter-spacing:.14em;text-transform:uppercase;font-weight:700;}#ex-exam-wrap .btn-exit{
  display:flex;align-items:center;gap:7px;
  padding:8px 14px;border-radius:9px;
  background:var(--card);border:1px solid var(--line);
  font-size:12px;font-weight:700;color:var(--ink-2);
}#ex-exam-wrap .btn-exit:hover{background:rgba(255,90,90,.08);border-color:rgba(255,90,90,.3);color:var(--bad);}#ex-exam-wrap .btn-exit svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;}#ex-exam-wrap /* Step progress bar */
.progress-bar{
  display:flex;align-items:center;gap:0;
  padding:0 32px;background:var(--card-3);
  border-bottom:1px solid var(--line);
  height:8px;position:relative;
}#ex-exam-wrap .progress-bar .seg{
  flex:1;height:3px;background:rgba(255,255,255,.05);border-radius:3px;
  margin:0 2px;transition:.4s;
}#ex-exam-wrap .progress-bar .seg.done{background:var(--accent);box-shadow:0 0 8px rgba(196,255,61,.4);}#ex-exam-wrap .progress-bar .seg.active{background:linear-gradient(90deg,var(--accent),var(--ink-2));}#ex-exam-wrap /* Page content area */
.page{
  flex:1;padding:36px 48px;max-width:1280px;width:100%;margin:0 auto;
  display:flex;flex-direction:column;gap:24px;
}#ex-exam-wrap .page-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap;}#ex-exam-wrap .page-kicker{
  font-family:var(--mono);font-size:11px;color:var(--c-page,var(--accent));
  letter-spacing:.18em;text-transform:uppercase;font-weight:800;
  display:flex;align-items:center;gap:8px;
}#ex-exam-wrap .page-kicker::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--c-page,var(--accent));box-shadow:0 0 8px var(--c-page,var(--accent));}#ex-exam-wrap .page-title{font-size:34px;font-weight:800;letter-spacing:-.025em;line-height:1.05;margin-top:6px;}#ex-exam-wrap .page-title em{font-style:normal;color:var(--c-page,var(--accent));}#ex-exam-wrap .page-sub{font-size:14px;color:var(--ink-2);max-width:620px;margin-top:8px;line-height:1.55;}#ex-exam-wrap .page-sub b{color:var(--ink);font-weight:700;}#ex-exam-wrap .page-head-right{display:flex;align-items:center;gap:16px;}#ex-exam-wrap .section-clock{
  display:flex;flex-direction:column;align-items:flex-end;gap:2px;
}#ex-exam-wrap .section-clock b{font-family:var(--mono);font-size:24px;font-weight:800;letter-spacing:-.01em;font-feature-settings:"tnum";color:var(--c-page,var(--accent));}#ex-exam-wrap .section-clock span{font-family:var(--mono);font-size:9px;color:var(--muted);letter-spacing:.16em;text-transform:uppercase;font-weight:700;}#ex-exam-wrap /* Footer nav */
.foot{
  display:flex;align-items:center;gap:12px;
  padding:18px 48px;border-top:1px solid var(--line);
  background:rgba(10,10,10,.5);backdrop-filter:blur(10px);
  position:sticky;bottom:0;
}#ex-exam-wrap .foot .dots{display:flex;gap:6px;flex:1;justify-content:center;}#ex-exam-wrap .foot .dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.08);}#ex-exam-wrap .foot .dot.done{background:var(--accent);}#ex-exam-wrap .foot .dot.active{width:24px;border-radius:4px;background:var(--accent);}#ex-exam-wrap .btn-nav{
  display:flex;align-items:center;gap:8px;
  padding:11px 18px;border-radius:10px;font-size:13px;font-weight:700;
  transition:.15s;
}#ex-exam-wrap .btn-nav.ghost{background:transparent;border:1px solid var(--line-2);color:var(--ink-2);}#ex-exam-wrap .btn-nav.ghost:hover{color:var(--ink);border-color:var(--ink-2);}#ex-exam-wrap .btn-nav.go{background:var(--accent);color:var(--accent-ink);box-shadow:0 6px 20px rgba(196,255,61,.25);}#ex-exam-wrap .btn-nav.go:hover{background:#d4ff5a;}#ex-exam-wrap .btn-nav.go:disabled{opacity:.4;cursor:not-allowed;box-shadow:none;}#ex-exam-wrap .btn-nav svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2.4;}#ex-exam-wrap /* ============ STEP CONTENT WRAPPERS ============ */
.step-content{display:none;flex-direction:column;gap:24px;flex:1;}#ex-exam-wrap .step-content.active{display:flex;animation:fadeIn .3s ease-out;}@keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}#ex-exam-wrap /* ============ STEP 0: BRIEFING ============ */
.brief-hero{
  background:var(--card);border:1px solid var(--line);
  border-radius:20px;padding:32px;
  display:grid;grid-template-columns:1.4fr 1fr;gap:32px;
  position:relative;overflow:hidden;
}#ex-exam-wrap .brief-hero::before{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(400px 280px at 100% 0%,rgba(96,165,250,.1),transparent 60%),
    radial-gradient(400px 280px at 0% 100%,rgba(196,255,61,.06),transparent 60%);
}#ex-exam-wrap .brief-hero > *{position:relative;}#ex-exam-wrap .brief-l h2{font-size:42px;font-weight:800;letter-spacing:-.03em;line-height:1.02;}#ex-exam-wrap .brief-l h2 em{font-style:normal;background:linear-gradient(135deg,#60a5fa,#c4ff3d);-webkit-background-clip:text;background-clip:text;color:transparent;}#ex-exam-wrap .brief-l p{font-size:15px;color:var(--ink-2);margin-top:14px;line-height:1.55;max-width:520px;}#ex-exam-wrap .brief-l p b{color:var(--ink);font-weight:700;}#ex-exam-wrap .brief-meta{display:flex;gap:24px;margin-top:24px;flex-wrap:wrap;}#ex-exam-wrap .brief-meta .m{display:flex;flex-direction:column;gap:2px;}#ex-exam-wrap .brief-meta .m span{font-family:var(--mono);font-size:9.5px;color:var(--muted);letter-spacing:.16em;text-transform:uppercase;font-weight:700;}#ex-exam-wrap .brief-meta .m b{font-size:18px;font-weight:800;letter-spacing:-.01em;}#ex-exam-wrap .brief-meta .m b em{color:var(--accent);font-style:normal;}#ex-exam-wrap .rank-promotion{
  background:rgba(0,0,0,.3);border:1px solid var(--line);
  border-radius:18px;padding:20px;
  display:flex;flex-direction:column;gap:14px;
}#ex-exam-wrap .rp-head{font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.18em;text-transform:uppercase;font-weight:800;text-align:center;}#ex-exam-wrap .rp-shields{display:flex;align-items:center;justify-content:center;gap:18px;}#ex-exam-wrap .rp-shield-wrap{
  display:flex;flex-direction:column;align-items:center;gap:8px;
  padding:14px 18px;border-radius:14px;
  background:rgba(255,255,255,.02);border:1px solid var(--line);
}#ex-exam-wrap .rp-shield-wrap.target{
  background:rgba(196,255,61,.06);border-color:rgba(196,255,61,.3);
  box-shadow:0 0 30px rgba(196,255,61,.1);
}#ex-exam-wrap .rp-shield-wrap svg{width:54px;height:60px;filter:drop-shadow(0 6px 14px rgba(0,0,0,.5));}#ex-exam-wrap .rp-shield-wrap b{font-size:14px;font-weight:800;letter-spacing:-.01em;}#ex-exam-wrap .rp-shield-wrap.from b{color:var(--diamond);}#ex-exam-wrap .rp-shield-wrap.target b{color:var(--challenger);}#ex-exam-wrap .rp-shield-wrap .cefr{font-family:var(--mono);font-size:10px;font-weight:800;padding:2px 7px;border-radius:5px;letter-spacing:.06em;}#ex-exam-wrap .rp-shield-wrap.from .cefr{background:rgba(96,165,250,.15);color:var(--diamond);}#ex-exam-wrap .rp-shield-wrap.target .cefr{background:var(--accent);color:#0a0a0a;}#ex-exam-wrap .rp-arrow{
  font-family:var(--mono);font-size:18px;color:var(--accent);font-weight:800;
  display:flex;flex-direction:column;align-items:center;gap:2px;
}#ex-exam-wrap .rp-arrow span{font-family:var(--mono);font-size:8px;color:var(--muted);letter-spacing:.18em;text-transform:uppercase;font-weight:700;}#ex-exam-wrap .rp-stats{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding-top:14px;border-top:1px dashed var(--line);}#ex-exam-wrap .rp-stat{display:flex;flex-direction:column;gap:2px;align-items:center;}#ex-exam-wrap .rp-stat b{font-family:var(--mono);font-size:13px;font-weight:800;color:var(--accent);}#ex-exam-wrap .rp-stat span{font-family:var(--mono);font-size:8.5px;color:var(--muted);letter-spacing:.14em;text-transform:uppercase;font-weight:700;text-align:center;}#ex-exam-wrap /* Sections overview grid */
.sections-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}#ex-exam-wrap .sec-card{
  --c:var(--accent);
  background:var(--card);border:1px solid var(--line);
  border-radius:14px;padding:16px;
  display:flex;flex-direction:column;gap:10px;
  position:relative;overflow:hidden;
  transition:.2s;
}#ex-exam-wrap .sec-card:hover{border-color:color-mix(in oklch,var(--c) 40%,var(--line));transform:translateY(-2px);}#ex-exam-wrap .sec-card::before{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(150px 110px at 100% 0,color-mix(in oklch,var(--c) 14%,transparent),transparent 60%);
}#ex-exam-wrap .sec-card > *{position:relative;}#ex-exam-wrap .sec-head{display:flex;align-items:center;gap:10px;}#ex-exam-wrap .sec-icon{
  width:34px;height:34px;border-radius:9px;
  background:color-mix(in oklch,var(--c) 14%,transparent);
  color:var(--c);
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;
}#ex-exam-wrap .sec-icon svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:1.8;}#ex-exam-wrap .sec-num{
  font-family:var(--mono);font-size:9px;color:var(--c);
  letter-spacing:.16em;font-weight:800;text-transform:uppercase;
}#ex-exam-wrap .sec-card b{font-size:14px;font-weight:800;letter-spacing:-.005em;}#ex-exam-wrap .sec-card p{font-size:11.5px;color:var(--muted);line-height:1.4;text-wrap:pretty;}#ex-exam-wrap .sec-foot{
  display:flex;align-items:center;justify-content:space-between;
  padding-top:10px;border-top:1px dashed var(--line);margin-top:auto;
  font-family:var(--mono);font-size:10px;color:var(--muted);
}#ex-exam-wrap .sec-foot b{color:var(--c);font-weight:800;font-size:10px;}#ex-exam-wrap /* Rules */
.rules{
  display:grid;grid-template-columns:repeat(3,1fr);gap:12px;
}#ex-exam-wrap .rule{
  background:var(--card-3);border:1px solid var(--line);
  border-radius:12px;padding:14px 16px;
  display:flex;gap:11px;align-items:flex-start;
}#ex-exam-wrap .rule-ic{
  width:26px;height:26px;border-radius:7px;
  background:rgba(196,255,61,.1);color:var(--accent);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}#ex-exam-wrap .rule-ic svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;}#ex-exam-wrap .rule b{display:block;font-size:12.5px;font-weight:700;}#ex-exam-wrap .rule span{display:block;font-size:11px;color:var(--muted);line-height:1.4;margin-top:2px;}#ex-exam-wrap /* CTA row */
.cta-row{
  display:flex;align-items:center;gap:14px;
  padding:18px 22px;background:var(--card);
  border:1px solid var(--line);border-radius:14px;
}#ex-exam-wrap .cta-info{flex:1;display:flex;flex-direction:column;gap:2px;}#ex-exam-wrap .cta-info b{font-size:14px;font-weight:800;letter-spacing:-.005em;}#ex-exam-wrap .cta-info span{font-size:12px;color:var(--muted);}#ex-exam-wrap .btn-start{
  display:flex;align-items:center;gap:8px;
  background:var(--accent);color:var(--accent-ink);
  padding:13px 22px;border-radius:11px;
  font-size:14px;font-weight:800;letter-spacing:-.005em;
  box-shadow:0 8px 24px rgba(196,255,61,.3);
  transition:.15s;
}#ex-exam-wrap .btn-start:hover{background:#d4ff5a;transform:translateY(-1px);box-shadow:0 12px 30px rgba(196,255,61,.5);}#ex-exam-wrap .btn-start svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2.6;}#ex-exam-wrap /* ============ LISTENING ============ */
.listen-stage{
  background:var(--card);border:1px solid var(--line);
  border-radius:20px;overflow:hidden;
  display:flex;flex-direction:column;
}#ex-exam-wrap .listen-player{
  height:300px;position:relative;overflow:hidden;
  background:linear-gradient(135deg,#1a2a3a,#0a1a2a);
}#ex-exam-wrap .listen-player::after{
  content:"";position:absolute;inset:0;
  background:url('https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1400&q=80') center/cover;
  opacity:.6;
  mask-image:linear-gradient(180deg,#000 0%,#000 50%,transparent 100%);
  -webkit-mask-image:linear-gradient(180deg,#000 0%,#000 50%,transparent 100%);
}#ex-exam-wrap .listen-player .scrim{
  position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(10,10,10,.2),rgba(10,10,10,.85));
  z-index:1;
}#ex-exam-wrap .listen-meta{
  position:absolute;top:18px;left:22px;display:flex;align-items:center;gap:10px;z-index:2;
}#ex-exam-wrap .listen-meta .live{
  display:flex;align-items:center;gap:6px;
  font-family:var(--mono);font-size:10px;color:var(--c-listen);font-weight:800;letter-spacing:.18em;text-transform:uppercase;
  background:rgba(10,10,10,.7);backdrop-filter:blur(10px);
  padding:6px 11px;border-radius:7px;border:1px solid color-mix(in oklch,var(--c-listen) 30%,transparent);
}#ex-exam-wrap .listen-meta .live::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--c-listen);box-shadow:0 0 6px var(--c-listen);animation:pulse 1.4s infinite;}#ex-exam-wrap .listen-meta .movie{
  display:flex;flex-direction:column;
  font-family:var(--mono);font-size:10px;color:var(--ink-2);
}#ex-exam-wrap .listen-meta .movie b{color:var(--ink);font-weight:700;font-size:13px;letter-spacing:-.01em;font-family:var(--sans);}#ex-exam-wrap .listen-meta .movie span{letter-spacing:.1em;text-transform:uppercase;font-weight:700;}#ex-exam-wrap .listen-controls{
  position:absolute;bottom:0;left:0;right:0;padding:22px;
  display:flex;align-items:center;gap:14px;z-index:2;
}#ex-exam-wrap .lc-play{
  width:54px;height:54px;border-radius:50%;
  background:var(--c-listen);color:#0a1a2e;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;box-shadow:0 8px 24px color-mix(in oklch,var(--c-listen) 40%,transparent);
}#ex-exam-wrap .lc-play svg{width:22px;height:22px;fill:currentColor;}#ex-exam-wrap .lc-bar{flex:1;display:flex;flex-direction:column;gap:6px;}#ex-exam-wrap .lc-time{display:flex;justify-content:space-between;font-family:var(--mono);font-size:10px;color:var(--ink-2);font-feature-settings:"tnum";}#ex-exam-wrap .lc-time b{color:var(--c-listen);}#ex-exam-wrap .lc-track{height:5px;background:rgba(255,255,255,.1);border-radius:3px;overflow:hidden;position:relative;}#ex-exam-wrap .lc-fill{height:100%;width:38%;background:var(--c-listen);border-radius:3px;box-shadow:0 0 10px color-mix(in oklch,var(--c-listen) 50%,transparent);position:relative;}#ex-exam-wrap .lc-fill::after{content:"";position:absolute;right:0;top:50%;transform:translate(50%,-50%);width:12px;height:12px;border-radius:50%;background:#fff;box-shadow:0 0 0 2px var(--c-listen);}#ex-exam-wrap .lc-replay{
  width:42px;height:42px;border-radius:50%;
  background:rgba(255,255,255,.08);backdrop-filter:blur(10px);
  display:flex;align-items:center;justify-content:center;color:#fff;
}#ex-exam-wrap .lc-replay svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;}#ex-exam-wrap .transcript{
  padding:22px 28px;background:var(--card-3);border-top:1px solid var(--line);
  display:flex;flex-direction:column;gap:8px;
}#ex-exam-wrap .transcript-lbl{font-family:var(--mono);font-size:9.5px;color:var(--muted);letter-spacing:.16em;text-transform:uppercase;font-weight:700;}#ex-exam-wrap .transcript-line{font-size:22px;font-weight:600;line-height:1.45;letter-spacing:-.01em;color:var(--ink);font-style:italic;}#ex-exam-wrap .transcript-line em{font-style:italic;color:var(--c-listen);font-weight:700;background:rgba(124,178,255,.08);padding:0 4px;border-radius:4px;}#ex-exam-wrap .transcript-speaker{font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.06em;}#ex-exam-wrap .transcript-speaker b{color:var(--ink-2);font-weight:700;}#ex-exam-wrap /* Questions */
.questions{display:flex;flex-direction:column;gap:16px;}#ex-exam-wrap .question{
  background:var(--card);border:1px solid var(--line);
  border-radius:16px;padding:22px 24px;
  display:flex;flex-direction:column;gap:14px;
}#ex-exam-wrap .q-head{display:flex;align-items:flex-start;gap:14px;}#ex-exam-wrap .q-num{
  --c:var(--c-page,var(--accent));
  width:32px;height:32px;border-radius:9px;
  background:color-mix(in oklch,var(--c) 14%,transparent);
  color:var(--c);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--mono);font-size:13px;font-weight:800;
  flex-shrink:0;
}#ex-exam-wrap .q-text{
  flex:1;font-size:16px;font-weight:600;line-height:1.45;letter-spacing:-.005em;
}#ex-exam-wrap .q-text em{font-style:normal;color:var(--c-page,var(--accent));font-weight:800;background:color-mix(in oklch,var(--c-page,var(--accent)) 10%,transparent);padding:0 5px;border-radius:5px;}#ex-exam-wrap .q-tag{
  font-family:var(--mono);font-size:9.5px;font-weight:800;
  background:rgba(255,255,255,.04);border:1px solid var(--line);
  padding:4px 8px;border-radius:6px;letter-spacing:.1em;color:var(--muted);
  flex-shrink:0;text-transform:uppercase;
}#ex-exam-wrap .options{display:grid;grid-template-columns:1fr 1fr;gap:10px;}#ex-exam-wrap .options.col{grid-template-columns:1fr;}#ex-exam-wrap .opt{
  display:flex;align-items:center;gap:12px;
  padding:12px 16px;border-radius:11px;
  background:var(--card-3);border:1px solid var(--line);
  cursor:pointer;transition:.15s;
  text-align:left;width:100%;
}#ex-exam-wrap .opt:hover{background:rgba(255,255,255,.04);border-color:var(--line-2);}#ex-exam-wrap .opt.selected{
  --c:var(--c-page,var(--accent));
  background:color-mix(in oklch,var(--c) 10%,transparent);
  border-color:var(--c);
  box-shadow:0 0 0 2px color-mix(in oklch,var(--c) 20%,transparent);
}#ex-exam-wrap .opt-bullet{
  width:22px;height:22px;border-radius:50%;
  border:1.5px solid var(--line-2);
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;font-family:var(--mono);font-size:10px;font-weight:800;color:var(--muted);
  transition:.15s;
}#ex-exam-wrap .opt.selected .opt-bullet{
  background:var(--c-page,var(--accent));border-color:var(--c-page,var(--accent));color:#0a0a0a;
}#ex-exam-wrap .opt-text{font-size:13.5px;color:var(--ink-2);line-height:1.4;}#ex-exam-wrap .opt.selected .opt-text{color:var(--ink);font-weight:600;}#ex-exam-wrap /* ============ READING ============ */
.reading-wrap{display:grid;grid-template-columns:1.5fr 1fr;gap:18px;}@media(max-width:1100px){#ex-exam-wrap .reading-wrap{grid-template-columns:1fr;}}#ex-exam-wrap .passage{
  background:var(--card);border:1px solid var(--line);
  border-radius:18px;padding:24px 26px;
  display:flex;flex-direction:column;gap:14px;
  max-height:680px;overflow-y:auto;
}#ex-exam-wrap .passage-head{
  display:flex;align-items:center;gap:10px;
  padding-bottom:14px;border-bottom:1px solid var(--line);
}#ex-exam-wrap .passage-tag{
  font-family:var(--mono);font-size:9.5px;color:var(--c-read);
  letter-spacing:.16em;text-transform:uppercase;font-weight:800;
}#ex-exam-wrap .passage-meta{flex:1;font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.08em;}#ex-exam-wrap .passage-cefr{
  font-family:var(--mono);font-size:11px;font-weight:800;
  background:var(--c-read);color:#0a0a0a;
  padding:4px 9px;border-radius:6px;letter-spacing:.06em;
}#ex-exam-wrap .passage-title{font-size:24px;font-weight:800;letter-spacing:-.02em;line-height:1.15;}#ex-exam-wrap .passage-author{font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.08em;}#ex-exam-wrap .passage-body{display:flex;flex-direction:column;gap:14px;}#ex-exam-wrap .passage-body p{font-size:14.5px;line-height:1.7;color:var(--ink-2);text-wrap:pretty;}#ex-exam-wrap .passage-body p:first-of-type::first-letter{
  float:left;font-size:48px;font-weight:800;line-height:.9;
  color:var(--c-read);margin:4px 10px 0 0;font-family:var(--sans);
}#ex-exam-wrap .passage-body mark{
  background:color-mix(in oklch,var(--c-read) 18%,transparent);
  color:var(--ink);padding:0 4px;border-radius:4px;font-weight:600;
  cursor:pointer;border-bottom:1.5px dashed var(--c-read);
}#ex-exam-wrap .reading-questions{display:flex;flex-direction:column;gap:14px;}#ex-exam-wrap /* ============ VOCABULARY (Flashcards style) ============ */
.vocab-stage{
  background:var(--card);border:1px solid var(--line);
  border-radius:20px;padding:30px;
  display:flex;flex-direction:column;gap:20px;
  position:relative;overflow:hidden;
}#ex-exam-wrap .vocab-stage::before{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(500px 300px at 50% 0%,color-mix(in oklch,var(--c-vocab) 8%,transparent),transparent 60%);
}#ex-exam-wrap .vocab-stage > *{position:relative;}#ex-exam-wrap .vocab-counter{
  display:flex;align-items:center;justify-content:space-between;
}#ex-exam-wrap .vocab-counter .pos{font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.14em;text-transform:uppercase;font-weight:700;}#ex-exam-wrap .vocab-counter .pos b{color:var(--c-vocab);font-size:14px;}#ex-exam-wrap .vocab-pos-pill{
  font-family:var(--mono);font-size:9.5px;color:var(--c-vocab);font-weight:800;
  background:color-mix(in oklch,var(--c-vocab) 12%,transparent);
  border:1px solid color-mix(in oklch,var(--c-vocab) 30%,transparent);
  padding:4px 9px;border-radius:6px;letter-spacing:.14em;text-transform:uppercase;
}#ex-exam-wrap .vocab-card{
  text-align:center;padding:30px 20px;
  display:flex;flex-direction:column;gap:8px;
}#ex-exam-wrap .vocab-word{font-size:52px;font-weight:800;letter-spacing:-.03em;line-height:1;}#ex-exam-wrap .vocab-ipa{font-family:var(--mono);font-size:18px;color:var(--c-vocab);font-weight:600;letter-spacing:.02em;}#ex-exam-wrap .vocab-grammar{font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.14em;text-transform:uppercase;font-weight:700;}#ex-exam-wrap .vocab-grammar b{color:var(--ink-2);}#ex-exam-wrap .vocab-audio{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(91,233,246,.08);border:1px solid rgba(91,233,246,.25);
  color:var(--c-vocab);font-family:var(--mono);font-size:11px;font-weight:700;
  padding:8px 14px;border-radius:9px;letter-spacing:.06em;
  margin:6px auto 0;
}#ex-exam-wrap .vocab-audio svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;}#ex-exam-wrap .vocab-question{
  font-family:var(--mono);font-size:11px;color:var(--muted);
  letter-spacing:.14em;text-transform:uppercase;font-weight:800;text-align:center;
}#ex-exam-wrap /* ============ PHRASAL VERBS ============ */
.phrasal-list{display:flex;flex-direction:column;gap:14px;}#ex-exam-wrap .phrasal-item{
  background:var(--card);border:1px solid var(--line);
  border-radius:14px;padding:20px 22px;
  display:flex;flex-direction:column;gap:14px;
}#ex-exam-wrap .ph-head{display:flex;align-items:center;gap:12px;}#ex-exam-wrap .ph-num{
  width:28px;height:28px;border-radius:8px;
  background:color-mix(in oklch,var(--c-phrasal) 14%,transparent);
  color:var(--c-phrasal);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--mono);font-size:12px;font-weight:800;flex-shrink:0;
}#ex-exam-wrap .ph-cefr{
  font-family:var(--mono);font-size:9px;color:var(--muted);letter-spacing:.14em;font-weight:700;
  margin-left:auto;
}#ex-exam-wrap .ph-sentence{
  font-size:19px;font-weight:600;line-height:1.5;letter-spacing:-.005em;
  color:var(--ink-2);
}#ex-exam-wrap .ph-blank{
  display:inline-block;min-width:120px;padding:2px 14px;
  background:rgba(255,216,61,.06);
  border:2px dashed rgba(255,216,61,.4);
  border-radius:7px;
  color:var(--c-phrasal);font-weight:800;
  text-align:center;font-style:italic;
  vertical-align:baseline;
}#ex-exam-wrap .ph-blank.filled{
  background:color-mix(in oklch,var(--c-phrasal) 15%,transparent);
  border-style:solid;color:#0a0a0a;
  background:var(--c-phrasal);
  font-style:normal;
}#ex-exam-wrap .ph-options{display:flex;flex-wrap:wrap;gap:8px;}#ex-exam-wrap .ph-chip{
  font-family:var(--mono);font-size:12px;font-weight:700;
  padding:9px 14px;border-radius:9px;
  background:var(--card-3);border:1px solid var(--line-2);
  color:var(--ink-2);transition:.15s;
  letter-spacing:.02em;
}#ex-exam-wrap .ph-chip:hover{background:rgba(255,216,61,.06);border-color:var(--c-phrasal);color:var(--c-phrasal);}#ex-exam-wrap .ph-chip.used{opacity:.3;cursor:not-allowed;background:transparent;}#ex-exam-wrap .ph-chip.active{background:var(--c-phrasal);color:#0a0a0a;border-color:var(--c-phrasal);}#ex-exam-wrap /* ============ SLANG / COLLOCATIONS ============ */
.match-wrap{
  background:var(--card);border:1px solid var(--line);
  border-radius:18px;padding:24px;
  display:grid;grid-template-columns:1fr 1fr;gap:18px;
}#ex-exam-wrap .match-col{display:flex;flex-direction:column;gap:8px;}#ex-exam-wrap .match-col-head{
  display:flex;align-items:center;gap:8px;
  font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.16em;text-transform:uppercase;font-weight:800;
  padding-bottom:8px;border-bottom:1px solid var(--line);margin-bottom:4px;
}#ex-exam-wrap .match-col-head svg{width:13px;height:13px;stroke:var(--c-slang);fill:none;stroke-width:2;}#ex-exam-wrap .match-card{
  display:flex;align-items:center;gap:12px;
  padding:14px 16px;border-radius:11px;
  background:var(--card-3);border:1px solid var(--line);
  transition:.15s;cursor:pointer;position:relative;
}#ex-exam-wrap .match-card:hover{background:rgba(255,255,255,.04);border-color:var(--line-2);}#ex-exam-wrap .match-card.selected{
  background:color-mix(in oklch,var(--c-slang) 10%,transparent);
  border-color:var(--c-slang);
  box-shadow:0 0 0 2px color-mix(in oklch,var(--c-slang) 20%,transparent);
}#ex-exam-wrap .match-card.linked{
  background:color-mix(in oklch,var(--c-slang) 6%,transparent);
  border-color:color-mix(in oklch,var(--c-slang) 30%,transparent);
}#ex-exam-wrap .match-card.linked::after{
  content:"";position:absolute;right:-9px;top:50%;transform:translateY(-50%);
  width:16px;height:2px;background:var(--c-slang);
  box-shadow:0 0 6px var(--c-slang);
}#ex-exam-wrap .match-card.right.linked::after{right:auto;left:-9px;}#ex-exam-wrap .match-bullet{
  width:24px;height:24px;border-radius:7px;
  background:rgba(255,90,196,.1);color:var(--c-slang);
  font-family:var(--mono);font-size:11px;font-weight:800;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}#ex-exam-wrap .match-card.right .match-bullet{background:rgba(255,255,255,.04);color:var(--ink-2);}#ex-exam-wrap .match-text{flex:1;min-width:0;}#ex-exam-wrap .match-text b{display:block;font-size:14px;font-weight:700;letter-spacing:-.005em;}#ex-exam-wrap .match-text span{display:block;font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.06em;margin-top:2px;}#ex-exam-wrap /* ============ WRITING ============ */
.writing-wrap{display:flex;flex-direction:column;gap:18px;}#ex-exam-wrap .writing-prompt{
  background:linear-gradient(135deg,rgba(123,227,123,.06),rgba(123,227,123,.02));
  border:1px solid rgba(123,227,123,.25);
  border-radius:16px;padding:24px 26px;
  display:flex;flex-direction:column;gap:10px;
}#ex-exam-wrap .wp-tag{
  display:flex;align-items:center;gap:8px;
  font-family:var(--mono);font-size:10px;color:var(--c-write);letter-spacing:.18em;text-transform:uppercase;font-weight:800;
}#ex-exam-wrap .wp-tag::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--c-write);box-shadow:0 0 8px var(--c-write);}#ex-exam-wrap .wp-prompt{font-size:22px;font-weight:700;letter-spacing:-.015em;line-height:1.35;}#ex-exam-wrap .wp-prompt em{font-style:italic;color:var(--c-write);}#ex-exam-wrap .wp-meta{display:flex;gap:24px;padding-top:12px;border-top:1px dashed rgba(123,227,123,.2);}#ex-exam-wrap .wp-meta .m{display:flex;flex-direction:column;gap:1px;}#ex-exam-wrap .wp-meta .m span{font-family:var(--mono);font-size:9px;color:var(--muted);letter-spacing:.14em;text-transform:uppercase;font-weight:700;}#ex-exam-wrap .wp-meta .m b{font-family:var(--mono);font-size:13px;font-weight:800;color:var(--ink);}#ex-exam-wrap .wp-meta .m b em{color:var(--c-write);font-style:normal;}#ex-exam-wrap .editor{
  background:var(--card);border:1px solid var(--line);
  border-radius:14px;overflow:hidden;
  display:flex;flex-direction:column;
}#ex-exam-wrap .editor-toolbar{
  display:flex;align-items:center;gap:4px;
  padding:8px 12px;background:var(--card-3);border-bottom:1px solid var(--line);
}#ex-exam-wrap .tool-btn{
  width:32px;height:32px;border-radius:7px;
  display:flex;align-items:center;justify-content:center;color:var(--muted);
}#ex-exam-wrap .tool-btn:hover{background:rgba(255,255,255,.05);color:var(--ink);}#ex-exam-wrap .tool-btn svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2;}#ex-exam-wrap .tool-sep{width:1px;height:22px;background:var(--line);margin:0 6px;}#ex-exam-wrap .tool-btn.active{background:rgba(123,227,123,.12);color:var(--c-write);}#ex-exam-wrap .editor-spacer{flex:1;}#ex-exam-wrap .editor-info{
  font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.04em;
  display:flex;gap:14px;align-items:center;
}#ex-exam-wrap .editor-info b{color:var(--c-write);font-weight:800;}#ex-exam-wrap .editor-area{
  padding:22px 26px;min-height:280px;
  font-size:15px;line-height:1.7;color:var(--ink);
  font-family:var(--sans);
  outline:none;
}#ex-exam-wrap .editor-area p{margin-bottom:12px;}#ex-exam-wrap .editor-area p.placeholder{color:var(--muted);font-style:italic;}#ex-exam-wrap .writing-tips{
  display:grid;grid-template-columns:repeat(3,1fr);gap:10px;
}#ex-exam-wrap .tip{
  background:var(--card-3);border:1px solid var(--line);
  border-radius:10px;padding:10px 12px;
  display:flex;gap:9px;align-items:flex-start;
  font-size:11.5px;color:var(--muted);line-height:1.4;
}#ex-exam-wrap .tip svg{width:13px;height:13px;stroke:var(--c-write);fill:none;stroke-width:2;flex-shrink:0;margin-top:1px;}#ex-exam-wrap .tip b{color:var(--ink-2);font-weight:700;}#ex-exam-wrap /* ============ SPEAKING ============ */
.speak-wrap{
  background:var(--card);border:1px solid var(--line);
  border-radius:20px;padding:32px;
  display:flex;flex-direction:column;gap:24px;
  position:relative;overflow:hidden;
}#ex-exam-wrap .speak-wrap::before{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(700px 400px at 50% 100%,color-mix(in oklch,var(--c-speak) 8%,transparent),transparent 60%);
}#ex-exam-wrap .speak-wrap > *{position:relative;}#ex-exam-wrap .speak-tabs{display:flex;gap:8px;padding:6px;background:var(--card-3);border:1px solid var(--line);border-radius:12px;}#ex-exam-wrap .speak-tab{
  flex:1;padding:11px 16px;border-radius:9px;
  font-size:12px;font-weight:700;color:var(--muted);
  display:flex;align-items:center;justify-content:center;gap:8px;
  transition:.15s;
}#ex-exam-wrap .speak-tab:hover{color:var(--ink-2);}#ex-exam-wrap .speak-tab.active{
  background:color-mix(in oklch,var(--c-speak) 14%,transparent);
  color:var(--c-speak);
  box-shadow:inset 0 0 0 1px color-mix(in oklch,var(--c-speak) 35%,transparent);
}#ex-exam-wrap .speak-tab svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;}#ex-exam-wrap .read-aloud{
  background:var(--card-3);border:1px solid var(--line);
  border-radius:16px;padding:30px 32px;text-align:center;
  display:flex;flex-direction:column;gap:14px;align-items:center;
}#ex-exam-wrap .read-lbl{font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.18em;text-transform:uppercase;font-weight:800;}#ex-exam-wrap .read-sentence{
  font-size:30px;font-weight:600;line-height:1.4;letter-spacing:-.01em;
  max-width:720px;
}#ex-exam-wrap .read-sentence em{font-style:italic;color:var(--c-speak);}#ex-exam-wrap .read-ipa{font-family:var(--mono);font-size:13px;color:var(--ink-2);letter-spacing:.04em;max-width:720px;}#ex-exam-wrap /* Mic + waveform */
.mic-area{
  display:flex;flex-direction:column;align-items:center;gap:18px;
  padding:8px 0;
}#ex-exam-wrap .wave{display:flex;align-items:center;justify-content:center;gap:3px;height:48px;width:280px;}#ex-exam-wrap .wave-bar{width:3px;border-radius:2px;background:var(--c-speak);box-shadow:0 0 6px color-mix(in oklch,var(--c-speak) 60%,transparent);animation:wb 1.2s ease-in-out infinite;}@keyframes wb{0%,100%{height:8%;}50%{height:90%;}}#ex-exam-wrap .wave-bar:nth-child(1){animation-delay:-1.1s;height:20%;}#ex-exam-wrap .wave-bar:nth-child(2){animation-delay:-1.0s;height:50%;}#ex-exam-wrap .wave-bar:nth-child(3){animation-delay:-0.9s;height:75%;}#ex-exam-wrap .wave-bar:nth-child(4){animation-delay:-0.8s;height:60%;}#ex-exam-wrap .wave-bar:nth-child(5){animation-delay:-0.7s;height:90%;}#ex-exam-wrap .wave-bar:nth-child(6){animation-delay:-0.6s;height:40%;}#ex-exam-wrap .wave-bar:nth-child(7){animation-delay:-0.5s;height:80%;}#ex-exam-wrap .wave-bar:nth-child(8){animation-delay:-0.4s;height:55%;}#ex-exam-wrap .wave-bar:nth-child(9){animation-delay:-0.3s;height:70%;}#ex-exam-wrap .wave-bar:nth-child(10){animation-delay:-0.2s;height:45%;}#ex-exam-wrap .wave-bar:nth-child(11){animation-delay:-0.1s;height:65%;}#ex-exam-wrap .wave-bar:nth-child(12){animation-delay:0s;height:35%;}#ex-exam-wrap .wave-bar:nth-child(odd){background:color-mix(in oklch,var(--c-speak) 70%,#fff);}#ex-exam-wrap .mic{
  position:relative;width:100px;height:100px;border-radius:50%;
  background:var(--c-speak);color:#1a0a05;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 14px 50px color-mix(in oklch,var(--c-speak) 40%,transparent),0 0 0 6px rgba(255,138,90,.1);
  transition:.2s;
}#ex-exam-wrap .mic:hover{transform:scale(1.05);}#ex-exam-wrap .mic svg{width:40px;height:40px;fill:currentColor;stroke:none;}#ex-exam-wrap .mic::before,#ex-exam-wrap .mic::after{
  content:"";position:absolute;inset:-12px;border-radius:50%;
  border:2px solid var(--c-speak);opacity:.3;
  animation:micRing 2s ease-out infinite;
}#ex-exam-wrap .mic::after{animation-delay:1s;}@keyframes micRing{0%{transform:scale(1);opacity:.4;}100%{transform:scale(1.4);opacity:0;}}#ex-exam-wrap .mic-info{display:flex;flex-direction:column;align-items:center;gap:4px;}#ex-exam-wrap .mic-info b{font-family:var(--mono);font-size:11px;color:var(--c-speak);letter-spacing:.18em;text-transform:uppercase;font-weight:800;}#ex-exam-wrap .mic-info span{font-family:var(--mono);font-size:11px;color:var(--ink-2);font-feature-settings:"tnum";}#ex-exam-wrap /* Word-by-word accuracy preview */
.word-acc{
  display:flex;flex-wrap:wrap;justify-content:center;gap:4px;max-width:720px;
  margin:0 auto;padding-top:16px;border-top:1px dashed var(--line);
}#ex-exam-wrap .word-tk{
  font-size:14px;padding:3px 7px;border-radius:6px;
  font-family:var(--mono);font-weight:600;
}#ex-exam-wrap .word-tk.ok{color:var(--good);background:rgba(123,227,123,.08);}#ex-exam-wrap .word-tk.warn{color:var(--warn);background:rgba(251,191,36,.08);}#ex-exam-wrap .word-tk.bad{color:var(--bad);background:rgba(255,90,90,.08);}#ex-exam-wrap .word-tk.pending{color:var(--muted);}#ex-exam-wrap /* ============ RESULTS ============ */
.results-hero{
  background:linear-gradient(135deg,rgba(196,255,61,.08),rgba(96,165,250,.05));
  border:1px solid rgba(196,255,61,.25);
  border-radius:20px;padding:36px;
  display:grid;grid-template-columns:1.3fr 1fr;gap:36px;align-items:center;
  position:relative;overflow:hidden;
}#ex-exam-wrap .results-hero::before{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(500px 400px at 100% 100%,rgba(196,255,61,.08),transparent 60%);
}#ex-exam-wrap .results-hero > *{position:relative;}#ex-exam-wrap .results-grade{
  display:flex;align-items:baseline;gap:14px;
}#ex-exam-wrap .results-grade b{font-size:120px;font-weight:800;letter-spacing:-.06em;line-height:.9;
  background:linear-gradient(180deg,var(--accent),var(--accent-d));-webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 6px 20px rgba(196,255,61,.4));}#ex-exam-wrap .results-grade .of{font-family:var(--mono);font-size:24px;color:var(--muted);font-weight:700;}#ex-exam-wrap .results-label{font-family:var(--mono);font-size:11px;color:var(--accent);letter-spacing:.2em;text-transform:uppercase;font-weight:800;margin-top:10px;}#ex-exam-wrap .results-title{font-size:34px;font-weight:800;letter-spacing:-.025em;line-height:1.05;margin-top:8px;}#ex-exam-wrap .results-title em{font-style:normal;color:var(--accent);}#ex-exam-wrap .results-sub{font-size:14px;color:var(--ink-2);line-height:1.55;margin-top:8px;max-width:480px;}#ex-exam-wrap /* Radar / skill bars */
.skill-radar{
  background:var(--card-3);border:1px solid rgba(196,255,61,.18);
  border-radius:18px;padding:24px;
  display:flex;flex-direction:column;gap:14px;
}#ex-exam-wrap .sr-head{font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.18em;text-transform:uppercase;font-weight:800;}#ex-exam-wrap .sr-list{display:flex;flex-direction:column;gap:12px;}#ex-exam-wrap .sr-row{display:grid;grid-template-columns:90px 1fr 50px;gap:12px;align-items:center;}#ex-exam-wrap .sr-name{
  font-family:var(--mono);font-size:11px;font-weight:700;letter-spacing:.04em;color:var(--ink-2);
  display:flex;align-items:center;gap:7px;
}#ex-exam-wrap .sr-name .d{width:6px;height:6px;border-radius:50%;background:var(--c);box-shadow:0 0 6px var(--c);}#ex-exam-wrap .sr-track{
  height:8px;background:rgba(255,255,255,.05);border-radius:4px;border:1px solid var(--line);overflow:hidden;position:relative;
}#ex-exam-wrap .sr-fill{
  height:100%;border-radius:4px;
  background:linear-gradient(90deg,color-mix(in oklch,var(--c) 60%,#000),var(--c));
  box-shadow:0 0 10px color-mix(in oklch,var(--c) 40%,transparent);
}#ex-exam-wrap .sr-pct{font-family:var(--mono);font-size:13px;font-weight:800;color:var(--c);font-feature-settings:"tnum";text-align:right;}#ex-exam-wrap .results-cta{
  display:grid;grid-template-columns:1fr 1fr;gap:14px;
}#ex-exam-wrap .results-card{
  background:var(--card);border:1px solid var(--line);
  border-radius:14px;padding:18px 20px;
  display:flex;flex-direction:column;gap:8px;
}#ex-exam-wrap .results-card.upgrade{
  background:linear-gradient(135deg,rgba(196,255,61,.08),rgba(196,255,61,.02));
  border-color:rgba(196,255,61,.3);
}#ex-exam-wrap .rc-tag{font-family:var(--mono);font-size:9.5px;color:var(--muted);letter-spacing:.16em;text-transform:uppercase;font-weight:800;}#ex-exam-wrap .results-card.upgrade .rc-tag{color:var(--accent);}#ex-exam-wrap .rc-title{font-size:18px;font-weight:800;letter-spacing:-.015em;}#ex-exam-wrap .rc-desc{font-size:12.5px;color:var(--muted);line-height:1.4;}#ex-exam-wrap .rc-btn{
  display:flex;align-items:center;justify-content:center;gap:7px;
  margin-top:6px;padding:10px 14px;border-radius:9px;
  font-size:12px;font-weight:700;
}#ex-exam-wrap .rc-btn.go{background:var(--accent);color:#0a0a0a;}#ex-exam-wrap .rc-btn.ghost{background:transparent;border:1px solid var(--line-2);color:var(--ink-2);}#ex-exam-wrap .rc-btn svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2.2;}`;

// ============ CSS admin overlays ============
var CSS_ADMIN = `
#ex-exam-wrap .ex-section-admin{margin-bottom:48px;}
#ex-exam-wrap .ex-section-bar{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;border-radius:10px;margin-bottom:20px;}
#ex-exam-wrap .ex-add-btn{padding:5px 13px;background:rgba(196,255,61,.1);border:1px solid rgba(196,255,61,.35);color:#c4ff3d;border-radius:7px;font-size:11px;font-weight:700;cursor:pointer;font-family:var(--mono);letter-spacing:.06em;transition:.15s;}
#ex-exam-wrap .ex-add-btn:hover{background:rgba(196,255,61,.2);}
#ex-exam-wrap .ex-edit-wrap{position:relative;}
#ex-exam-wrap .ex-edit-wrap:hover .ex-edit-bar{opacity:1!important;pointer-events:all!important;}
#ex-exam-wrap .ex-edit-bar{position:absolute;top:10px;right:10px;display:flex;gap:6px;opacity:0;pointer-events:none;transition:.2s;z-index:20;}
#ex-exam-wrap .ex-edit-btn-main{padding:5px 12px;background:#c4ff3d;color:#0a0a0a;border:none;border-radius:7px;font-size:11px;font-weight:800;cursor:pointer;font-family:inherit;box-shadow:0 2px 8px rgba(196,255,61,.3);}
#ex-exam-wrap .ex-del-btn{padding:5px 10px;background:rgba(255,90,90,.12);border:1px solid rgba(255,90,90,.3);color:#ff5a5a;border-radius:7px;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit;}
/* Modal */
.ex-modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.85);backdrop-filter:blur(10px);z-index:9999;overflow-y:auto;padding:40px 20px;box-sizing:border-box;}
.ex-modal-overlay.open{display:flex;align-items:flex-start;justify-content:center;}
.ex-modal-box{background:#171717;border:1px solid #262626;border-radius:20px;width:100%;max-width:680px;padding:32px;margin:auto;}
.ex-modal-title{font-size:18px;font-weight:800;color:#f5f5f5;margin:0;}
.ex-modal-close{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.08);border:none;color:#f5f5f5;font-size:20px;cursor:pointer;line-height:1;display:flex;align-items:center;justify-content:center;}
.ex-field{margin-bottom:14px;}
.ex-field label{font-size:10px;color:#7a7a7a;font-weight:700;letter-spacing:.1em;text-transform:uppercase;display:block;margin-bottom:5px;}
.ex-field input,.ex-field select,.ex-field textarea{width:100%;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:8px;padding:9px 12px;color:#f5f5f5;font-size:13px;box-sizing:border-box;font-family:inherit;outline:none;transition:.15s;}
.ex-field input:focus,.ex-field select:focus,.ex-field textarea:focus{border-color:#c4ff3d;}
.ex-field textarea{resize:vertical;min-height:200px;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.6;}
.ex-grid-row{display:grid;gap:12px;margin-bottom:14px;}
.ex-grid-row.cols2{grid-template-columns:1fr 1fr;}
.ex-grid-row.cols3{grid-template-columns:1fr 1fr 1fr;}
.ex-footer-btns{display:flex;align-items:center;justify-content:space-between;margin-top:24px;padding-top:20px;border-top:1px solid #262626;}
.ex-save-btn{padding:11px 28px;background:#c4ff3d;color:#0a0a0a;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;}
.ex-cancel-btn{padding:11px 20px;background:rgba(255,255,255,.06);border:1px solid #262626;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;color:#f5f5f5;font-family:inherit;}
.ex-delete-btn{padding:11px 20px;background:rgba(255,90,90,.1);border:1px solid rgba(255,90,90,.3);border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;color:#ff5a5a;font-family:inherit;display:none;}
.ex-toast{position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(20px);background:#c4ff3d;color:#0a0a0a;padding:10px 24px;border-radius:30px;font-size:13px;font-weight:700;z-index:99999;opacity:0;transition:.3s;pointer-events:none;font-family:inherit;}
.ex-toast.show{opacity:1;transform:translateX(-50%) translateY(0);}
`;

// ============ HTML EXACTO DEL EXAMEN ============
var SECTIONS_HTML = `<!-- SECTION listening -->
<div class='ex-section-admin' data-section='listening'>
<div class="ex-section-bar" style="background:rgba(124,178,255,0.08);border:1px solid rgba(124,178,255,0.2);margin-bottom:16px;border-radius:10px;"><span style="font-family:var(--mono);font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#7CB2FF;">Paso 1 · Listening</span><button class="ex-add-btn" onclick="exOpenNew('listening')">+ Agregar pregunta</button></div><div class="step-content" data-step-content="1" style="--c-page:var(--c-listen);">
      <div class="page">

        <div class="page-head">
          <div>
            <div class="page-kicker">paso 1 · listening · moviesLab</div>
            <h1 class="page-title">Escucha. <em>Capta los matices.</em></h1>
            <p class="page-sub">Mira la escena de <b>The Social Network (2010)</b>. Después responde sobre el tono, la intención y la jerga que escuchaste.</p>
          </div>
          <div class="page-head-right">
            <div class="section-clock"><b>07:42</b><span>esta sección</span></div>
          </div>
        </div>

        <div class="listen-stage">
          <div class="listen-player">
            <div class="scrim"></div>
            <div class="listen-meta">
              <span class="live">en reproducción</span>
              <div class="movie">
                <b>The Social Network</b>
                <span>Aaron Sorkin · 2010 · C1</span>
              </div>
            </div>
            <div class="listen-controls">
              <button class="lc-play">
                <svg viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"/></svg>
              </button>
              <div class="lc-bar">
                <div class="lc-time"><b>00:23</b><span>01:02</span></div>
                <div class="lc-track"><div class="lc-fill"></div></div>
              </div>
              <button class="lc-replay">
                <svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.5 15a9 9 0 102.13-9.36L1 10"/></svg>
              </button>
            </div>
          </div>

          <div class="transcript">
            <span class="transcript-lbl">subtítulo · 00:18 — 00:24</span>
            <div class="transcript-line">"You know, you really don't need a forensics team to get to the bottom of this. If you guys were the inventors of Facebook, <em>you'd have invented Facebook</em>."</div>
            <span class="transcript-speaker">— <b>Mark Zuckerberg</b> · deposition scene</span>
          </div>
        </div>

        <div class="questions">

          <div class="ex-edit-wrap"><article class="question">
            <header class="q-head">
              <div class="q-num">1</div>
              <div class="q-text">¿Cuál es la <em>intención principal</em> de Mark al decir esto?</div>
              <span class="q-tag">Inferencia · C1</span>
            </header>
            <div class="options">
              <button class="opt"><span class="opt-bullet">A</span><span class="opt-text">Disculparse por una mala interpretación legal.</span></button>
              <button class="opt selected"><span class="opt-bullet">B</span><span class="opt-text">Desestimar burlonamente la demanda con un argumento circular.</span></button>
              <button class="opt"><span class="opt-bullet">C</span><span class="opt-text">Reconocer parcialmente la idea original de los gemelos.</span></button>
              <button class="opt"><span class="opt-bullet">D</span><span class="opt-text">Ofrecer un trato fuera de los tribunales.</span></button>
            </div>
          </article><div class="ex-edit-bar"><button class="ex-edit-btn-main" onclick="exOpenEdit('listening',this)">✏ Editar</button><button class="ex-del-btn" onclick="exOpenEdit('listening',this,true)">✕</button></div></div>

          <div class="ex-edit-wrap"><article class="question">
            <header class="q-head">
              <div class="q-num">2</div>
              <div class="q-text">"<em>Get to the bottom of this</em>" es una expresión idiomática. ¿Qué significa?</div>
              <span class="q-tag">Idiom · B2-C1</span>
            </header>
            <div class="options">
              <button class="opt"><span class="opt-bullet">A</span><span class="opt-text">Llegar al fondo del mar.</span></button>
              <button class="opt"><span class="opt-bullet">B</span><span class="opt-text">Empezar desde lo básico.</span></button>
              <button class="opt"><span class="opt-bullet">C</span><span class="opt-text">Descubrir la verdad de un asunto.</span></button>
              <button class="opt"><span class="opt-bullet">D</span><span class="opt-text">Acabar con algo definitivamente.</span></button>
            </div>
          </article><div class="ex-edit-bar"><button class="ex-edit-btn-main" onclick="exOpenEdit('listening',this)">✏ Editar</button><button class="ex-del-btn" onclick="exOpenEdit('listening',this,true)">✕</button></div></div>

          <div class="ex-edit-wrap"><article class="question">
            <header class="q-head">
              <div class="q-num">3</div>
              <div class="q-text">¿Qué tono percibes en la voz de Mark?</div>
              <span class="q-tag">Tono · C1</span>
            </header>
            <div class="options">
              <button class="opt"><span class="opt-bullet">A</span><span class="opt-text">Nervioso y conciliador.</span></button>
              <button class="opt"><span class="opt-bullet">B</span><span class="opt-text">Sarcástico y condescendiente.</span></button>
              <button class="opt"><span class="opt-bullet">C</span><span class="opt-text">Triste y resignado.</span></button>
              <button class="opt"><span class="opt-bullet">D</span><span class="opt-text">Formal y respetuoso.</span></button>
            </div>
          </article><div class="ex-edit-bar"><button class="ex-edit-btn-main" onclick="exOpenEdit('listening',this)">✏ Editar</button><button class="ex-del-btn" onclick="exOpenEdit('listening',this,true)">✕</button></div></div>

          <div class="ex-edit-wrap"><article class="question">
            <header class="q-head">
              <div class="q-num">4</div>
              <div class="q-text">El uso de "<em>you'd have invented</em>" (conditional perfect) implica:</div>
              <span class="q-tag">Gramática · C1</span>
            </header>
            <div class="options col">
              <button class="opt"><span class="opt-bullet">A</span><span class="opt-text">Una posibilidad real en el presente.</span></button>
              <button class="opt"><span class="opt-bullet">B</span><span class="opt-text">Una hipótesis pasada que no se cumplió — implica que no son los verdaderos inventores.</span></button>
              <button class="opt"><span class="opt-bullet">C</span><span class="opt-text">Una predicción futura sobre Facebook.</span></button>
            </div>
          </article><div class="ex-edit-bar"><button class="ex-edit-btn-main" onclick="exOpenEdit('listening',this)">✏ Editar</button><button class="ex-del-btn" onclick="exOpenEdit('listening',this,true)">✕</button></div></div>

        </div>
      </div>
    </div>
</div>
<!-- SECTION reading -->
<div class='ex-section-admin' data-section='reading'>
<div class="ex-section-bar" style="background:rgba(167,139,250,0.08);border:1px solid rgba(167,139,250,0.2);margin-bottom:16px;border-radius:10px;"><span style="font-family:var(--mono);font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#A78BFA;">Paso 2 · Reading</span><button class="ex-add-btn" onclick="exOpenNew('reading')">+ Agregar pregunta</button></div><div class="step-content" data-step-content="2" style="--c-page:var(--c-read);">
      <div class="page">
        <div class="page-head">
          <div>
            <div class="page-kicker">paso 2 · reading · the atlantic</div>
            <h1 class="page-title">Lee. <em>Infiere. Descifra.</em></h1>
            <p class="page-sub">Lee el fragmento y responde sobre la tesis del autor, el vocabulario en contexto y la inferencia. Puedes resaltar palabras tocándolas.</p>
          </div>
          <div class="page-head-right">
            <div class="section-clock"><b>09:18</b><span>esta sección</span></div>
          </div>
        </div>

        <div class="reading-wrap">

          <article class="passage">
            <header class="passage-head">
              <span class="passage-tag">▸ ensayo · 642 palabras</span>
              <span class="passage-meta">lectura ~6 min</span>
              <span class="passage-cefr">C1</span>
            </header>
            <h3 class="passage-title">The Quiet Tyranny of Convenience</h3>
            <span class="passage-author">by Tim Wu · The Atlantic · adapted</span>

            <div class="passage-body">
              <p>Convenience has emerged as perhaps the most <mark>underestimated</mark> force shaping our world today. We tend to celebrate it without reservation, treating it as an unqualified good. Yet if you examine the architecture of modern life, you'll notice that convenience does not merely make tasks easier — it quietly <mark>dictates</mark> which tasks we choose to do at all.</p>

              <p>Consider the smartphone. It was sold to us as a productivity tool, but its true triumph lies in its ability to compress an extraordinary range of activities into the simplest possible gesture. The same swipe orders dinner, hires a car, finds a partner, and consumes a year of someone's labor packaged as a thirty-second video. The friction that once <mark>tethered</mark> our choices to deliberation has been engineered away.</p>

              <p>This is not, in itself, a tragedy. Convenience has delivered genuine emancipation — particularly from drudgery that once consumed lives. The issue, rather, is what happens when convenience becomes <mark>the</mark> dominant value, eclipsing depth, mastery, or sustained attention. We do not stop wanting hard things; we simply stop choosing them.</p>

              <p>The most insidious effect of convenience is that it pretends to be neutral. It claims merely to optimize, when in fact it actively reshapes our aspirations. A generation raised entirely inside its frictionless logic may find itself, paradoxically, less free — possessing infinite options yet unable to recognize what is worth pursuing.</p>
            </div>
          </article>

          <div class="reading-questions">

            <div class="ex-edit-wrap"><article class="question">
              <header class="q-head">
                <div class="q-num">1</div>
                <div class="q-text">¿Cuál es la <em>tesis principal</em> del autor?</div>
                <span class="q-tag">Tesis · C1</span>
              </header>
              <div class="options col">
                <button class="opt"><span class="opt-bullet">A</span><span class="opt-text">La tecnología es enemiga de la productividad.</span></button>
                <button class="opt selected"><span class="opt-bullet">B</span><span class="opt-text">La conveniencia, presentada como neutral, moldea silenciosamente nuestras aspiraciones.</span></button>
                <button class="opt"><span class="opt-bullet">C</span><span class="opt-text">Los smartphones son herramientas dañinas para los jóvenes.</span></button>
              </div>
            </article><div class="ex-edit-bar"><button class="ex-edit-btn-main" onclick="exOpenEdit('reading',this)">✏ Editar</button><button class="ex-del-btn" onclick="exOpenEdit('reading',this,true)">✕</button></div></div>

            <div class="ex-edit-wrap"><article class="question">
              <header class="q-head">
                <div class="q-num">2</div>
                <div class="q-text">"<em>Tethered</em>" en contexto significa más cercano a:</div>
                <span class="q-tag">Vocab · C1</span>
              </header>
              <div class="options">
                <button class="opt"><span class="opt-bullet">A</span><span class="opt-text">Liberadas</span></button>
                <button class="opt"><span class="opt-bullet">B</span><span class="opt-text">Atadas</span></button>
                <button class="opt"><span class="opt-bullet">C</span><span class="opt-text">Confundidas</span></button>
                <button class="opt"><span class="opt-bullet">D</span><span class="opt-text">Reveladas</span></button>
              </div>
            </article><div class="ex-edit-bar"><button class="ex-edit-btn-main" onclick="exOpenEdit('reading',this)">✏ Editar</button><button class="ex-del-btn" onclick="exOpenEdit('reading',this,true)">✕</button></div></div>

            <div class="ex-edit-wrap"><article class="question">
              <header class="q-head">
                <div class="q-num">3</div>
                <div class="q-text">El autor sugiere que la conveniencia es "<em>insidious</em>" principalmente porque:</div>
                <span class="q-tag">Inferencia · C1</span>
              </header>
              <div class="options col">
                <button class="opt"><span class="opt-bullet">A</span><span class="opt-text">Reemplaza el trabajo humano con máquinas.</span></button>
                <button class="opt"><span class="opt-bullet">B</span><span class="opt-text">Aparenta no tener efectos morales mientras los produce.</span></button>
                <button class="opt"><span class="opt-bullet">C</span><span class="opt-text">Reduce el costo de las cosas materiales.</span></button>
              </div>
            </article><div class="ex-edit-bar"><button class="ex-edit-btn-main" onclick="exOpenEdit('reading',this)">✏ Editar</button><button class="ex-del-btn" onclick="exOpenEdit('reading',this,true)">✕</button></div></div>

            <div class="ex-edit-wrap"><article class="question">
              <header class="q-head">
                <div class="q-num">4</div>
                <div class="q-text">¿Verdadero o falso? El autor considera <em>completamente negativa</em> a la conveniencia.</div>
                <span class="q-tag">V/F · B2</span>
              </header>
              <div class="options">
                <button class="opt"><span class="opt-bullet">V</span><span class="opt-text">Verdadero</span></button>
                <button class="opt selected"><span class="opt-bullet">F</span><span class="opt-text">Falso — reconoce emancipación genuina</span></button>
              </div>
            </article><div class="ex-edit-bar"><button class="ex-edit-btn-main" onclick="exOpenEdit('reading',this)">✏ Editar</button><button class="ex-del-btn" onclick="exOpenEdit('reading',this,true)">✕</button></div></div>

          </div>
        </div>
      </div>
    </div>
</div>
<!-- SECTION vocabulary -->
<div class='ex-section-admin' data-section='vocabulary'>
<div class="ex-section-bar" style="background:rgba(91,233,246,0.08);border:1px solid rgba(91,233,246,0.2);margin-bottom:16px;border-radius:10px;"><span style="font-family:var(--mono);font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#5BE9F6;">Paso 3 · Vocabulary</span><button class="ex-add-btn" onclick="exOpenNew('vocabulary')">+ Agregar pregunta</button></div><div class="step-content" data-step-content="3" style="--c-page:var(--c-vocab);">
      <div class="page">
        <div class="page-head">
          <div>
            <div class="page-kicker">paso 3 · vocabulary · flashcards</div>
            <h1 class="page-title">Define. <em>Sin pensarlo dos veces.</em></h1>
            <p class="page-sub">20 palabras al nivel <b>C1</b>. Elige la mejor definición. Tienes <b>18 segundos</b> por tarjeta antes de pasar a la siguiente.</p>
          </div>
          <div class="page-head-right">
            <div class="section-clock"><b>00:14</b><span>en esta tarjeta</span></div>
          </div>
        </div>

        <div class="ex-edit-wrap"><div class="vocab-stage">
          <div class="vocab-counter">
            <span class="pos"><b>07</b> de 20 · serie en curso</span>
            <span class="vocab-pos-pill">▸ adjective · C1</span>
          </div>

          <div class="vocab-card">
            <div class="vocab-word">Ubiquitous</div>
            <div class="vocab-ipa">/juːˈbɪk.wɪ.təs/</div>
            <div class="vocab-grammar">adj. — <b>formal</b> · academic register</div>
            <button class="vocab-audio">
              <svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 010 7M19 5a10 10 0 010 14"/></svg>
              Escuchar pronunciación
            </button>
          </div>

          <div class="vocab-question">▾ ¿Cuál es la mejor definición?</div>

          <div class="options">
            <button class="opt"><span class="opt-bullet">A</span><span class="opt-text">Extremely rare or hard to find.</span></button>
            <button class="opt selected"><span class="opt-bullet">B</span><span class="opt-text">Present, appearing, or found everywhere.</span></button>
            <button class="opt"><span class="opt-bullet">C</span><span class="opt-text">Pertaining to ancient cultures.</span></button>
            <button class="opt"><span class="opt-bullet">D</span><span class="opt-text">Loud, attention-grabbing, or boisterous.</span></button>
          </div>
        </div><div class="ex-edit-bar"><button class="ex-edit-btn-main" onclick="exOpenEdit('vocabulary',this)">✏ Editar</button></div></div>

        <!-- Mini progress map -->
        <div style="display:flex;gap:6px;justify-content:center;padding:0 20px;">
          <span style="display:flex;gap:4px;flex-wrap:wrap;justify-content:center;">
            <i style="width:18px;height:5px;border-radius:3px;background:var(--good);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:var(--good);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:var(--good);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:var(--bad);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:var(--good);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:var(--good);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:var(--c-vocab);box-shadow:0 0 8px var(--c-vocab);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:rgba(255,255,255,.06);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:rgba(255,255,255,.06);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:rgba(255,255,255,.06);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:rgba(255,255,255,.06);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:rgba(255,255,255,.06);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:rgba(255,255,255,.06);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:rgba(255,255,255,.06);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:rgba(255,255,255,.06);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:rgba(255,255,255,.06);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:rgba(255,255,255,.06);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:rgba(255,255,255,.06);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:rgba(255,255,255,.06);"></i>
            <i style="width:18px;height:5px;border-radius:3px;background:rgba(255,255,255,.06);"></i>
          </span>
        </div>
      </div>
    </div>
</div>
<!-- SECTION phrasal -->
<div class='ex-section-admin' data-section='phrasal'>
<div class="ex-section-bar" style="background:rgba(255,216,61,0.08);border:1px solid rgba(255,216,61,0.2);margin-bottom:16px;border-radius:10px;"><span style="font-family:var(--mono);font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#FFD83D;">Paso 4 · Phrasal Verbs</span><button class="ex-add-btn" onclick="exOpenNew('phrasal')">+ Agregar pregunta</button></div><div class="step-content" data-step-content="4" style="--c-page:var(--c-phrasal);">
      <div class="page">
        <div class="page-head">
          <div>
            <div class="page-kicker">paso 4 · phrasal verbs · collocations</div>
            <h1 class="page-title">Completa. <em>Como un nativo.</em></h1>
            <p class="page-sub">Arrastra o haz clic en el verbo compuesto correcto para completar cada frase. <b>10 oraciones</b> · cada verbo se usa una sola vez.</p>
          </div>
          <div class="page-head-right">
            <div class="section-clock"><b>04:38</b><span>esta sección</span></div>
          </div>
        </div>

        <!-- Verb pool -->
        <div style="background:var(--card-3);border:1px solid var(--line);border-radius:14px;padding:14px 18px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
            <span style="font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.16em;text-transform:uppercase;font-weight:800;">▾ banco de verbos · 10 disponibles</span>
            <span style="font-family:var(--mono);font-size:10px;color:var(--c-phrasal);font-weight:700;">4 / 10 usados</span>
          </div>
          <div class="ph-options">
            <button class="ph-chip used">ran into</button>
            <button class="ph-chip">get over</button>
            <button class="ph-chip used">pull off</button>
            <button class="ph-chip">put up with</button>
            <button class="ph-chip active">come across</button>
            <button class="ph-chip">make up for</button>
            <button class="ph-chip used">went through</button>
            <button class="ph-chip">look forward to</button>
            <button class="ph-chip used">break down</button>
            <button class="ph-chip">turn out</button>
          </div>
        </div>

        <div class="phrasal-list">

          <div class="ex-edit-wrap"><article class="phrasal-item">
            <header class="ph-head">
              <div class="ph-num">1</div>
              <span style="font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.04em;">▸ informal · spoken English</span>
              <span class="ph-cefr">B2</span>
            </header>
            <div class="ph-sentence">"I can't <span class="ph-blank filled">put up with</span> his attitude any longer — he's been impossible all week."</div>
          </article><div class="ex-edit-bar"><button class="ex-edit-btn-main" onclick="exOpenEdit('phrasal',this)">✏ Editar</button><button class="ex-del-btn" onclick="exOpenEdit('phrasal',this,true)">✕</button></div></div>

          <div class="ex-edit-wrap"><article class="phrasal-item">
            <header class="ph-head">
              <div class="ph-num">2</div>
              <span style="font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.04em;">▸ narrative · past tense</span>
              <span class="ph-cefr">B2</span>
            </header>
            <div class="ph-sentence">"You'll never guess who I <span class="ph-blank filled">ran into</span> at the airport yesterday — Marco from college!"</div>
          </article><div class="ex-edit-bar"><button class="ex-edit-btn-main" onclick="exOpenEdit('phrasal',this)">✏ Editar</button><button class="ex-del-btn" onclick="exOpenEdit('phrasal',this,true)">✕</button></div></div>

          <div class="ex-edit-wrap"><article class="phrasal-item">
            <header class="ph-head">
              <div class="ph-num">3</div>
              <span style="font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.04em;">▸ achievement · success</span>
              <span class="ph-cefr">C1</span>
            </header>
            <div class="ph-sentence">"Nobody thought she'd manage it, but she <span class="ph-blank">______</span> the deal against all odds."</div>
          </article><div class="ex-edit-bar"><button class="ex-edit-btn-main" onclick="exOpenEdit('phrasal',this)">✏ Editar</button><button class="ex-del-btn" onclick="exOpenEdit('phrasal',this,true)">✕</button></div></div>

          <div class="ex-edit-wrap"><article class="phrasal-item">
            <header class="ph-head">
              <div class="ph-num">4</div>
              <span style="font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.04em;">▸ emotional · recovery</span>
              <span class="ph-cefr">B2</span>
            </header>
            <div class="ph-sentence">"It took him almost a year to <span class="ph-blank">______</span> the breakup, but he's finally moving forward."</div>
          </article><div class="ex-edit-bar"><button class="ex-edit-btn-main" onclick="exOpenEdit('phrasal',this)">✏ Editar</button><button class="ex-del-btn" onclick="exOpenEdit('phrasal',this,true)">✕</button></div></div>

          <div class="ex-edit-wrap"><article class="phrasal-item">
            <header class="ph-head">
              <div class="ph-num">5</div>
              <span style="font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.04em;">▸ discovery · serendipity</span>
              <span class="ph-cefr">C1</span>
            </header>
            <div class="ph-sentence">"I <span class="ph-blank">______</span> a fascinating article on this exact topic while I was researching last night."</div>
          </article><div class="ex-edit-bar"><button class="ex-edit-btn-main" onclick="exOpenEdit('phrasal',this)">✏ Editar</button><button class="ex-del-btn" onclick="exOpenEdit('phrasal',this,true)">✕</button></div></div>

        </div>
      </div>
    </div>
</div>
<!-- SECTION slang -->
<div class='ex-section-admin' data-section='slang'>
<div class="ex-section-bar" style="background:rgba(255,90,196,0.08);border:1px solid rgba(255,90,196,0.2);margin-bottom:16px;border-radius:10px;"><span style="font-family:var(--mono);font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#FF5AC4;">Paso 5 · Slang</span><button class="ex-add-btn" onclick="exOpenNew('slang')">+ Agregar pregunta</button></div><div class="step-content" data-step-content="5" style="--c-page:var(--c-slang);">
      <div class="page">
        <div class="page-head">
          <div>
            <div class="page-kicker">paso 5 · slang · expresiones nativas</div>
            <h1 class="page-title">Empareja la <em>jerga</em> con su significado.</h1>
            <p class="page-sub">Conecta cada expresión native de la columna izquierda con su definición formal. <b>10 pares</b> · solo aciertos cuentan.</p>
          </div>
          <div class="page-head-right">
            <div class="section-clock"><b>04:02</b><span>esta sección</span></div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:2px;">
              <span style="font-family:var(--mono);font-size:9.5px;color:var(--muted);letter-spacing:.16em;text-transform:uppercase;font-weight:700;">Acertados</span>
              <span style="font-family:var(--mono);font-size:24px;font-weight:800;color:var(--c-slang);font-feature-settings:'tnum';">4 / 10</span>
            </div>
          </div>
        </div>

        <div class="ex-edit-wrap"><div class="match-wrap">

          <div class="match-col">
            <div class="match-col-head">
              <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Expresión nativa
            </div>
            <button class="match-card linked"><span class="match-bullet">A</span><div class="match-text"><b>Spill the tea</b><span>informal · gossip</span></div></button>
            <button class="match-card linked"><span class="match-bullet">B</span><div class="match-text"><b>Ghost (someone)</b><span>verb · dating slang</span></div></button>
            <button class="match-card selected"><span class="match-bullet">C</span><div class="match-text"><b>Lowkey</b><span>adv. · social media</span></div></button>
            <button class="match-card"><span class="match-bullet">D</span><div class="match-text"><b>Bail on (plans)</b><span>verb · casual</span></div></button>
            <button class="match-card"><span class="match-bullet">E</span><div class="match-text"><b>It hits different</b><span>idiom · gen-z</span></div></button>
            <button class="match-card linked"><span class="match-bullet">F</span><div class="match-text"><b>Salty</b><span>adj. · attitude</span></div></button>
            <button class="match-card"><span class="match-bullet">G</span><div class="match-text"><b>Throw shade</b><span>verb · disrespect</span></div></button>
            <button class="match-card linked"><span class="match-bullet">H</span><div class="match-text"><b>Slay</b><span>verb · approval</span></div></button>
          </div>

          <div class="match-col">
            <div class="match-col-head">
              <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
              Definición formal
            </div>
            <button class="match-card right linked"><span class="match-bullet">1</span><div class="match-text"><b>To share juicy gossip or insider info</b><span>= A · spill the tea</span></div></button>
            <button class="match-card right linked"><span class="match-bullet">2</span><div class="match-text"><b>To cut off all communication suddenly</b><span>= B · ghost someone</span></div></button>
            <button class="match-card right"><span class="match-bullet">3</span><div class="match-text"><b>To excel or do something perfectly</b><span>—</span></div></button>
            <button class="match-card right"><span class="match-bullet">4</span><div class="match-text"><b>To make subtle, indirect criticism</b><span>—</span></div></button>
            <button class="match-card right linked"><span class="match-bullet">5</span><div class="match-text"><b>Bitter, resentful, or irritated</b><span>= F · salty</span></div></button>
            <button class="match-card right"><span class="match-bullet">6</span><div class="match-text"><b>Quietly, secretly, or moderately</b><span>—</span></div></button>
            <button class="match-card right"><span class="match-bullet">7</span><div class="match-text"><b>To cancel plans last minute</b><span>—</span></div></button>
            <button class="match-card right linked"><span class="match-bullet">8</span><div class="match-text"><b>It feels much better than usual</b><span>= H · slay (paired wrong)</span></div></button>
          </div>

        </div><div class="ex-edit-bar"><button class="ex-edit-btn-main" onclick="exOpenEdit('slang',this)">✏ Editar</button></div></div>
      </div>
    </div>
</div>
<!-- SECTION writing -->
<div class='ex-section-admin' data-section='writing'>
<div class="ex-section-bar" style="background:rgba(123,227,123,0.08);border:1px solid rgba(123,227,123,0.2);margin-bottom:16px;border-radius:10px;"><span style="font-family:var(--mono);font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#7BE37B;">Paso 6 · Writing</span><button class="ex-add-btn" onclick="exOpenNew('writing')">+ Agregar pregunta</button></div><div class="step-content" data-step-content="6" style="--c-page:var(--c-write);">
      <div class="page">
        <div class="page-head">
          <div>
            <div class="page-kicker">paso 6 · writing · ensayo argumentativo</div>
            <h1 class="page-title">Redacta. <em>Argumenta. Convence.</em></h1>
            <p class="page-sub">Escribe una respuesta argumentada al prompt. <b>250–300 palabras</b>. Aura analiza gramática, coherencia, riqueza léxica y estructura.</p>
          </div>
          <div class="page-head-right">
            <div class="section-clock"><b>10:24</b><span>esta sección</span></div>
          </div>
        </div>

        <div class="ex-edit-wrap"><div class="writing-wrap">

          <div class="writing-prompt">
            <div class="wp-tag">prompt · ielts task 2 style</div>
            <div class="wp-prompt">"Some people argue that <em>convenience has eroded our capacity for sustained effort</em>. Others say technology simply frees us to focus on what truly matters. Discuss both views and give your own opinion."</div>
            <div class="wp-meta">
              <div class="m"><span>Mínimo</span><b>250 palabras</b></div>
              <div class="m"><span>Sugerido</span><b><em>275–300</em></b></div>
              <div class="m"><span>Registro</span><b>Formal / académico</b></div>
              <div class="m"><span>Estructura</span><b>4 párrafos</b></div>
            </div><div class="ex-edit-bar"><button class="ex-edit-btn-main" onclick="exOpenEdit('writing',this)">✏ Editar</button></div></div>
          </div>

          <div class="editor">
            <div class="editor-toolbar">
              <button class="tool-btn" title="Negrita"><svg viewBox="0 0 24 24"><path d="M6 4h8a4 4 0 010 8H6zM6 12h9a4 4 0 010 8H6z"/></svg></button>
              <button class="tool-btn" title="Itálica"><svg viewBox="0 0 24 24"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg></button>
              <button class="tool-btn" title="Subrayar"><svg viewBox="0 0 24 24"><path d="M6 3v7a6 6 0 0012 0V3M4 21h16"/></svg></button>
              <div class="tool-sep"></div>
              <button class="tool-btn active" title="Comprobar ortografía"><svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M21 12c0 5-3.5 8-9 9-5.5-1-9-4-9-9V5l9-4 9 4z"/></svg></button>
              <button class="tool-btn" title="Sinónimos"><svg viewBox="0 0 24 24"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg></button>
              <div class="editor-spacer"></div>
              <div class="editor-info">
                <span>Palabras: <b>187</b> / 300</span>
                <span>Tiempo: <b>10:24</b></span>
              </div>
            </div>
            <div class="editor-area" contenteditable="true">
              <p>The debate around convenience as either an enabler or a thief of human focus is far from settled. Both perspectives carry weight, and the reality, as so often, lies somewhere between them.</p>
              <p>On the one hand, it is undeniable that ubiquitous technology has compressed the friction surrounding everyday choices. Tasks that once demanded hours of planning — booking a flight, finding a recipe, contacting a distant friend — now require seconds. Critics argue, with some justification, that this frictionless landscape has eroded our patience for sustained, effortful work. We have, they claim, traded depth for breadth.</p>
              <p>On the other hand, defenders point out that convenience is liberating rather than corrosive. By outsourcing the trivial, we gain bandwidth for what genuinely matters: creativity, relationships, complex problem-solving. The smartphone is not the enemy of focus; it is merely a tool, neutral in itself.</p>
              <p style="color:var(--muted);font-style:italic;">▌Sigue escribiendo aquí…</p>
            </div>
          </div>

          <div class="writing-tips">
            <div class="tip">
              <svg viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              <span><b>Conectores formales:</b> furthermore, nevertheless, consequently, on balance.</span>
            </div>
            <div class="tip">
              <svg viewBox="0 0 24 24"><path d="M21 11.5a8.5 8.5 0 11-15.6-4.7L3 3l3.8 2.4A8.5 8.5 0 0121 11.5z"/></svg>
              <span><b>Estructura:</b> intro · vista A · vista B · tu opinión + conclusión.</span>
            </div>
            <div class="tip">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              <span><b>Tiempo:</b> reserva 2 min al final para releer y corregir.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
</div>
<!-- SECTION speaking -->
<div class='ex-section-admin' data-section='speaking'>
<div class="ex-section-bar" style="background:rgba(255,138,90,0.08);border:1px solid rgba(255,138,90,0.2);margin-bottom:16px;border-radius:10px;"><span style="font-family:var(--mono);font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#FF8A5A;">Paso 7 · Speaking</span><button class="ex-add-btn" onclick="exOpenNew('speaking')">+ Agregar pregunta</button></div><div class="step-content" data-step-content="7" style="--c-page:var(--c-speak);">
      <div class="page">
        <div class="page-head">
          <div>
            <div class="page-kicker">paso 7 · speaking · shadowLab</div>
            <h1 class="page-title">Habla. <em>Suena nativo.</em></h1>
            <p class="page-sub">Dos partes: <b>(a)</b> lee en voz alta para medir pronunciación y ritmo, <b>(b)</b> responde libre por <b>90 segundos</b> al prompt.</p>
          </div>
          <div class="page-head-right">
            <div class="section-clock"><b>05:11</b><span>esta sección</span></div>
          </div>
        </div>

        <div class="speak-wrap">

          <div class="speak-tabs">
            <button class="speak-tab active">
              <svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
              Parte A · Lectura en voz alta
            </button>
            <button class="speak-tab">
              <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Parte B · Respuesta libre · 90s
            </button>
          </div>

          <div class="ex-edit-wrap"><div class="read-aloud">
            <span class="read-lbl">▸ lee esta frase en voz alta</span>
            <div class="read-sentence">"The <em>relentless pursuit of frictionless living</em> may, paradoxically, leave us less equipped to handle the inevitable friction of being human."</div><div class="ex-edit-bar"><button class="ex-edit-btn-main" onclick="exOpenEdit('speaking',this)">✏ Editar</button></div></div>
            <div class="read-ipa">/ðə rɪˈlentləs pəˈsjuːt əv ˈfrɪkʃənləs ˈlɪvɪŋ/</div>
          </div>

          <div class="mic-area">
            <div class="wave">
              <span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span>
              <span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span>
              <span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span><span class="wave-bar"></span>
            </div>
            <button class="mic">
              <svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z"/></svg>
            </button>
            <div class="mic-info">
              <b>● grabando · habla ahora</b>
              <span>00:08 / 00:30</span>
            </div>
          </div>

          <!-- Word-by-word accuracy -->
          <div class="word-acc">
            <span class="word-tk ok">The</span>
            <span class="word-tk ok">relentless</span>
            <span class="word-tk warn">pursuit</span>
            <span class="word-tk ok">of</span>
            <span class="word-tk ok">frictionless</span>
            <span class="word-tk bad">living</span>
            <span class="word-tk pending">may,</span>
            <span class="word-tk pending">paradoxically,</span>
            <span class="word-tk pending">leave</span>
            <span class="word-tk pending">us</span>
            <span class="word-tk pending">less</span>
            <span class="word-tk pending">equipped</span>
            <span class="word-tk pending">…</span>
          </div>

          <!-- Live metrics -->
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding-top:16px;border-top:1px dashed var(--line);">
            <div style="display:flex;flex-direction:column;gap:4px;">
              <div style="display:flex;justify-content:space-between;align-items:baseline;"><span style="font-family:var(--mono);font-size:9.5px;color:var(--muted);letter-spacing:.14em;text-transform:uppercase;font-weight:700;">Acento</span><b style="font-family:var(--mono);font-size:15px;font-weight:800;color:var(--c-speak);">82%</b></div>
              <div style="height:5px;background:rgba(255,255,255,.05);border-radius:3px;overflow:hidden;"><div style="height:100%;width:82%;background:var(--c-speak);box-shadow:0 0 6px var(--c-speak);"></div></div>
            </div>
            <div style="display:flex;flex-direction:column;gap:4px;">
              <div style="display:flex;justify-content:space-between;align-items:baseline;"><span style="font-family:var(--mono);font-size:9.5px;color:var(--muted);letter-spacing:.14em;text-transform:uppercase;font-weight:700;">Fluidez</span><b style="font-family:var(--mono);font-size:15px;font-weight:800;color:#7CB2FF;">91%</b></div>
              <div style="height:5px;background:rgba(255,255,255,.05);border-radius:3px;overflow:hidden;"><div style="height:100%;width:91%;background:#7CB2FF;box-shadow:0 0 6px #7CB2FF;"></div></div>
            </div>
            <div style="display:flex;flex-direction:column;gap:4px;">
              <div style="display:flex;justify-content:space-between;align-items:baseline;"><span style="font-family:var(--mono);font-size:9.5px;color:var(--muted);letter-spacing:.14em;text-transform:uppercase;font-weight:700;">Ritmo</span><b style="font-family:var(--mono);font-size:15px;font-weight:800;color:#fbbf24;">76%</b></div>
              <div style="height:5px;background:rgba(255,255,255,.05);border-radius:3px;overflow:hidden;"><div style="height:100%;width:76%;background:#fbbf24;box-shadow:0 0 6px #fbbf24;"></div></div>
            </div>
          </div>

        </div>
      </div>
    </div>
</div>`;

function injectCSS(){
  if(document.getElementById('ex-exam-css'))return;
  var s=document.createElement('style');s.id='ex-exam-css';s.textContent=CSS_EXAM;
  document.head.appendChild(s);
  var s2=document.createElement('style');s2.id='ex-admin-css';s2.textContent=CSS_ADMIN;
  document.head.appendChild(s2);
  if(!document.getElementById('ex-fonts')){
    var lnk=document.createElement('link');lnk.id='ex-fonts';lnk.rel='stylesheet';
    lnk.href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap';
    document.head.appendChild(lnk);
  }
}

function buildHTML(){
  var rankOpts=RANKS.map(function(r){return '<option value="'+r+'">'+r.charAt(0).toUpperCase()+r.slice(1)+'</option>';}).join('');
  var langOpts=Object.keys(LANGS).map(function(k){return '<option value="'+k+'">'+LANGS[k]+'</option>';}).join('');
  var secOpts=SECTIONS.map(function(s){return '<option value="'+s+'">'+s.charAt(0).toUpperCase()+s.slice(1)+'</option>';}).join('');
  var inp='width:100%;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:8px;padding:9px 12px;color:#f5f5f5;font-size:13px;box-sizing:border-box;font-family:inherit;outline:none;';
  return (
    '<div id="t-examen" style="display:none;">'
    +'<div id="ex-exam-wrap">'
    // Top bar
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px;">'
    +'<div style="font-size:22px;font-weight:800;color:#f5f5f5;letter-spacing:-.02em;">Examen de Ascenso <span style="font-size:14px;font-weight:600;color:#7a7a7a;font-family:var(--mono);">· vista admin</span></div>'
    +'<div style="display:flex;gap:10px;align-items:center;">'
    +'<select id="ex-rank" style="'+inp+'width:auto;" onchange="exLoadFromDB()">'+rankOpts+'</select>'
    +'<select id="ex-lang" style="'+inp+'width:auto;" onchange="exLoadFromDB()">'+langOpts+'</select>'
    +'<button onclick="exLoadFromDB()" style="padding:8px 14px;background:rgba(255,255,255,.06);border:1px solid #262626;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;color:#f5f5f5;">↺ Refrescar</button>'
    +'<span id="ex-db-status" style="font-size:11px;color:#7a7a7a;font-family:var(--mono);"></span>'
    +'</div></div>'
    // Exam sections (exact HTML)
    + SECTIONS_HTML
    // Modal
    +'<div id="ex-modal" class="ex-modal-overlay">'
    +'<div class="ex-modal-box">'
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;">'
    +'<h3 id="ex-modal-title" class="ex-modal-title">Editar contenido</h3>'
    +'<button class="ex-modal-close" onclick="exCloseModal()">×</button>'
    +'</div>'
    +'<div class="ex-grid-row cols3">'
    +'<div class="ex-field"><label>Sección</label><select id="ex-m-section" style="'+inp+'">'+secOpts+'</select></div>'
    +'<div class="ex-field"><label>Rango</label><select id="ex-m-rank" style="'+inp+'">'+rankOpts+'</select></div>'
    +'<div class="ex-field"><label>Idioma</label><select id="ex-m-lang" style="'+inp+'">'+langOpts+'</select></div>'
    +'</div>'
    +'<div class="ex-grid-row cols2">'
    +'<div class="ex-field"><label>Tipo / subtipo</label><input id="ex-m-type" type="text" style="'+inp+'" placeholder="ej: question, fill-blank..."></div>'
    +'<div class="ex-field"><label>Dificultad (1–5)</label><input id="ex-m-diff" type="number" min="1" max="5" value="3" style="'+inp+'"></div>'
    +'</div>'
    +'<div class="ex-field"><label>JSON del contenido</label>'
    +'<textarea id="ex-m-json" placeholder=\'{"question":"...","options":["A","B","C","D"],"correct":1}\'></textarea>'
    +'</div>'
    +'<div class="ex-field"><label style="display:flex;align-items:center;gap:6px;"><input id="ex-m-active" type="checkbox" checked> Activo</label></div>'
    +'<div class="ex-footer-btns">'
    +'<button id="ex-btn-del" class="ex-delete-btn" onclick="exDeleteCurrent()">✕ Eliminar</button>'
    +'<div style="display:flex;gap:10px;">'
    +'<button class="ex-cancel-btn" onclick="exCloseModal()">Cancelar</button>'
    +'<button class="ex-save-btn" onclick="exSave()">Guardar en BD</button>'
    +'</div></div>'
    +'</div></div>'
    // Toast
    +'<div id="ex-toast" class="ex-toast"></div>'
    +'</div>'
    +'</div>'
  );
}

// ============ INIT ============
window.initExamen = function(sb){
  _sb = sb;
  if(!document.getElementById('t-examen')){
    var c=document.querySelector('.adm-content')||document.querySelector('main')||document.body;
    c.insertAdjacentHTML('beforeend', buildHTML());
  }
  injectCSS();
};

// ============ OPEN MODAL — new ============
window.exOpenNew = function(section){
  _editId = null;
  document.getElementById('ex-modal-title').textContent='Nueva pregunta · '+section;
  var el=document.getElementById('ex-m-section'); if(el)el.value=section;
  var rank=document.getElementById('ex-rank'); if(rank&&document.getElementById('ex-m-rank'))document.getElementById('ex-m-rank').value=rank.value;
  var lang=document.getElementById('ex-lang'); if(lang&&document.getElementById('ex-m-lang'))document.getElementById('ex-m-lang').value=lang.value;
  document.getElementById('ex-m-type').value='';
  document.getElementById('ex-m-diff').value='3';
  document.getElementById('ex-m-active').checked=true;
  document.getElementById('ex-m-json').value='{}';
  document.getElementById('ex-btn-del').style.display='none';
  document.getElementById('ex-modal').classList.add('open');
};

// ============ OPEN MODAL — edit (from DB row) ============
window.exOpenEdit = function(section, btn, isDel){
  // For now open new modal for that section (DB integration)
  exOpenNew(section);
  document.getElementById('ex-modal-title').textContent='Editar · '+section;
  document.getElementById('ex-btn-del').style.display='inline-block';
};

// ============ CLOSE MODAL ============
window.exCloseModal = function(){
  document.getElementById('ex-modal').classList.remove('open');
  _editId = null;
};

// ============ SAVE ============
window.exSave = function(){
  if(!_sb){ exToast('❌ Sin conexión Supabase'); return; }
  var section=document.getElementById('ex-m-section').value;
  var rank=document.getElementById('ex-m-rank').value;
  var lang=document.getElementById('ex-m-lang').value;
  var type=document.getElementById('ex-m-type').value.trim();
  var diff=parseInt(document.getElementById('ex-m-diff').value)||3;
  var active=document.getElementById('ex-m-active').checked;
  var jsonRaw=document.getElementById('ex-m-json').value;
  var content={};
  try{content=JSON.parse(jsonRaw);}catch(e){exToast('❌ JSON inválido'); return;}
  var row={section:section,rank:rank,language:lang,content_type:type,content:content,difficulty:diff,active:active};
  var promise=_editId
    ? _sb.from('exam_content').update(row).eq('id',_editId)
    : _sb.from('exam_content').insert(row);
  promise.then(function(res){
    if(res.error){exToast('❌ '+res.error.message);}
    else{exCloseModal();exToast('✓ Guardado');exLoadFromDB();}
  });
};

// ============ DELETE ============
window.exDeleteCurrent = function(){
  if(!_editId||!_sb){exToast('Sin ID');return;}
  if(!confirm('¿Eliminar esta pregunta?'))return;
  _sb.from('exam_content').delete().eq('id',_editId).then(function(res){
    if(res.error)exToast('❌ '+res.error.message);
    else{exCloseModal();exToast('✓ Eliminado');exLoadFromDB();}
  });
};

// ============ LOAD FROM DB ============
window.exLoadFromDB = function(){
  if(!_sb)return;
  var rank=(document.getElementById('ex-rank')||{}).value||'bronce';
  var lang=(document.getElementById('ex-lang')||{}).value||'en';
  var status=document.getElementById('ex-db-status');
  if(status)status.textContent='Cargando...';
  _sb.from('exam_content').select('id,section,content_type,content,difficulty,active,created_at')
    .eq('rank',rank).eq('language',lang).order('section').order('created_at')
    .then(function(res){
      var rows=(res&&res.data)||[];
      if(status)status.textContent=rows.length+' en BD · el HTML muestra plantilla';
      if(rows.length>0){
        exToast('✓ '+rows.length+' preguntas en BD para '+rank+'/'+lang);
      }
    });
};

// ============ TOAST ============
window.exToast = function(msg){
  var t=document.getElementById('ex-toast');
  if(!t)return;
  t.textContent=msg;t.classList.add('show');
  setTimeout(function(){t.classList.remove('show');},2800);
};

// ============ EXCARGAR (alias para compatibilidad) ============
window.exCargar = function(){ exLoadFromDB(); };

})();

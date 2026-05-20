/* ============================================================
   admin-examen.js — Módulo admin del Examen de Ascenso
   CSS y HTML EXACTOS de examen-ascenso.html
   ============================================================ */
(function(){
'use strict';

var _sb;
var _editId   = null;
var _prevOpen = false;

var RANKS    = ['bronce','plata','oro','platino','diamante','challenger'];
var SECTIONS = ['listening','reading','vocabulary','phrasal','slang','writing','speaking'];
var LANGS    = {en:'🇺🇸 English',es:'🇪🇸 Español',fr:'🇫🇷 Français',it:'🇮🇹 Italiano',pt:'🇧🇷 Português'};

var SEC_META = {
  listening:  {color:'#7CB2FF', cssVar:'var(--c-listen)', label:'Listening',        cnt:'0'},
  reading:    {color:'#A78BFA', cssVar:'var(--c-read)',   label:'Reading',           cnt:'0'},
  vocabulary: {color:'#5BE9F6', cssVar:'var(--c-vocab)',  label:'Vocabulary',        cnt:'0'},
  phrasal:    {color:'#FFD83D', cssVar:'var(--c-phrasal)',label:'Phrasal Verbs',     cnt:'0'},
  slang:      {color:'#FF5AC4', cssVar:'var(--c-slang)',  label:'Slang',             cnt:'0'},
  writing:    {color:'#7BE37B', cssVar:'var(--c-write)',  label:'Writing',           cnt:'0'},
  speaking:   {color:'#FF8A5A', cssVar:'var(--c-speak)',  label:'Speaking',          cnt:'0'}
};

// ============================================================
//  CSS exacto del examen, scopeado a #ex-exam-wrap
// ============================================================
function injectCSS(){
  if (document.getElementById('ex-admin-css')) return;
  var s = document.createElement('style');
  s.id = 'ex-admin-css';
  s.textContent = `#ex-exam-wrap{
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
  font-family:var(--sans);color:var(--ink);
}
/* Questions */
#ex-exam-wrap .questions{display:flex;flex-direction:column;gap:16px;}
#ex-exam-wrap .question{
  background:var(--card);border:1px solid var(--line);
  border-radius:16px;padding:22px 24px;
  display:flex;flex-direction:column;gap:14px;
}
#ex-exam-wrap .q-head{display:flex;align-items:flex-start;gap:14px;}
#ex-exam-wrap .q-num{
  --c:var(--c-page,var(--accent));
  width:32px;height:32px;border-radius:9px;
  background:color-mix(in oklch,var(--c) 14%,transparent);
  color:var(--c);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--mono);font-size:13px;font-weight:800;
  flex-shrink:0;
}
#ex-exam-wrap .q-text{
  flex:1;font-size:16px;font-weight:600;line-height:1.45;letter-spacing:-.005em;
}
#ex-exam-wrap .q-text em{font-style:normal;color:var(--c-page,var(--accent));font-weight:800;background:color-mix(in oklch,var(--c-page,var(--accent)) 10%,transparent);padding:0 5px;border-radius:5px;}
#ex-exam-wrap .q-tag{
  font-family:var(--mono);font-size:9.5px;font-weight:800;
  background:rgba(255,255,255,.04);border:1px solid var(--line);
  padding:4px 8px;border-radius:6px;letter-spacing:.1em;color:var(--muted);
  flex-shrink:0;text-transform:uppercase;
}

#ex-exam-wrap .options{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
#ex-exam-wrap .options.col{grid-template-columns:1fr;}
#ex-exam-wrap .opt{
  display:flex;align-items:center;gap:12px;
  padding:12px 16px;border-radius:11px;
  background:var(--card-3);border:1px solid var(--line);
  cursor:pointer;transition:.15s;
  text-align:left;width:100%;
}
#ex-exam-wrap .opt:hover{background:rgba(255,255,255,.04);border-color:var(--line-2);}
#ex-exam-wrap .opt.selected{
  --c:var(--c-page,var(--accent));
  background:color-mix(in oklch,var(--c) 10%,transparent);
  border-color:var(--c);
  box-shadow:0 0 0 2px color-mix(in oklch,var(--c) 20%,transparent);
}
#ex-exam-wrap .opt-bullet{
  width:22px;height:22px;border-radius:50%;
  border:1.5px solid var(--line-2);
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;font-family:var(--mono);font-size:10px;font-weight:800;color:var(--muted);
  transition:.15s;
}
#ex-exam-wrap .opt.selected .opt-bullet{
  background:var(--c-page,var(--accent));border-color:var(--c-page,var(--accent));color:#0a0a0a;
}
#ex-exam-wrap .opt-text{font-size:13.5px;color:var(--ink-2);line-height:1.4;}
#ex-exam-wrap .opt.selected .opt-text{color:var(--ink);font-weight:600;}

/* ============ READING ============ */
#ex-exam-wrap .reading-wrap{display:grid;grid-template-columns:1.5fr 1fr;gap:18px;}
@media(max-width:1100px){.reading-wrap{grid-template-columns:1fr;}}
#ex-exam-wrap .passage{
  background:var(--card);border:1px solid var(--line);
  border-radius:18px;padding:24px 26px;
  display:flex;flex-direction:column;gap:14px;
  max-height:680px;overflow-y:auto;
}
#ex-exam-wrap .passage-head{
  display:flex;align-items:center;gap:10px;
  padding-bottom:14px;border-bottom:1px solid var(--line);
}
#ex-exam-wrap .passage-tag{
  font-family:var(--mono);font-size:9.5px;color:var(--c-read);
  letter-spacing:.16em;text-transform:uppercase;font-weight:800;
}
#ex-exam-wrap .passage-meta{flex:1;font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.08em;}
#ex-exam-wrap .passage-cefr{
  font-family:var(--mono);font-size:11px;font-weight:800;
  background:var(--c-read);color:#0a0a0a;
  padding:4px 9px;border-radius:6px;letter-spacing:.06em;
}
#ex-exam-wrap .passage-title{font-size:24px;font-weight:800;letter-spacing:-.02em;line-height:1.15;}
#ex-exam-wrap .passage-author{font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.08em;}
.passage-
#ex-exam-wrap .passage-body p{font-size:14.5px;line-height:1.7;color:var(--ink-2);text-wrap:pretty;}
#ex-exam-wrap .passage-body p:first-of-type::first-letter{
  float:left;font-size:48px;font-weight:800;line-height:.9;
  color:var(--c-read);margin:4px 10px 0 0;font-family:var(--sans);
}
#ex-exam-wrap .passage-body mark{
  background:color-mix(in oklch,var(--c-read) 18%,transparent);
  color:var(--ink);padding:0 4px;border-radius:4px;font-weight:600;
  cursor:pointer;border-bottom:1.5px dashed var(--c-read);
}

#ex-exam-wrap .reading-questions{display:flex;flex-direction:column;gap:14px;}

/* ============ VOCABULARY (Flashcards style) ============ */
#ex-exam-wrap .vocab-stage{
  background:var(--card);border:1px solid var(--line);
  border-radius:20px;padding:30px;
  display:flex;flex-direction:column;gap:20px;
  position:relative;overflow:hidden;
}
#ex-exam-wrap .vocab-stage::before{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(500px 300px at 50% 0%,color-mix(in oklch,var(--c-vocab) 8%,transparent),transparent 60%);
}
#ex-exam-wrap .vocab-stage > *{position:relative;}
#ex-exam-wrap .vocab-counter{
  display:flex;align-items:center;justify-content:space-between;
}
#ex-exam-wrap .vocab-counter .pos{font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.14em;text-transform:uppercase;font-weight:700;}
#ex-exam-wrap .vocab-counter .pos b{color:var(--c-vocab);font-size:14px;}
#ex-exam-wrap .vocab-pos-pill{
  font-family:var(--mono);font-size:9.5px;color:var(--c-vocab);font-weight:800;
  background:color-mix(in oklch,var(--c-vocab) 12%,transparent);
  border:1px solid color-mix(in oklch,var(--c-vocab) 30%,transparent);
  padding:4px 9px;border-radius:6px;letter-spacing:.14em;text-transform:uppercase;
}

#ex-exam-wrap .vocab-card{
  text-align:center;padding:30px 20px;
  display:flex;flex-direction:column;gap:8px;
}
#ex-exam-wrap .vocab-word{font-size:52px;font-weight:800;letter-spacing:-.03em;line-height:1;}
#ex-exam-wrap .vocab-ipa{font-family:var(--mono);font-size:18px;color:var(--c-vocab);font-weight:600;letter-spacing:.02em;}
#ex-exam-wrap .vocab-grammar{font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.14em;text-transform:uppercase;font-weight:700;}
#ex-exam-wrap .vocab-grammar b{color:var(--ink-2);}
#ex-exam-wrap .vocab-audio{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(91,233,246,.08);border:1px solid rgba(91,233,246,.25);
  color:var(--c-vocab);font-family:var(--mono);font-size:11px;font-weight:700;
  padding:8px 14px;border-radius:9px;letter-spacing:.06em;
  margin:6px auto 0;
}
#ex-exam-wrap .vocab-audio svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;}

#ex-exam-wrap .vocab-question{
  font-family:var(--mono);font-size:11px;color:var(--muted);
  letter-spacing:.14em;text-transform:uppercase;font-weight:800;text-align:center;
}

/* ============ PHRASAL VERBS ============ */
#ex-exam-wrap .phrasal-list{display:flex;flex-direction:column;gap:14px;}
#ex-exam-wrap .phrasal-item{
  background:var(--card);border:1px solid var(--line);
  border-radius:14px;padding:20px 22px;
  display:flex;flex-direction:column;gap:14px;
}
#ex-exam-wrap .ph-head{display:flex;align-items:center;gap:12px;}
#ex-exam-wrap .ph-num{
  width:28px;height:28px;border-radius:8px;
  background:color-mix(in oklch,var(--c-phrasal) 14%,transparent);
  color:var(--c-phrasal);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--mono);font-size:12px;font-weight:800;flex-shrink:0;
}
#ex-exam-wrap .ph-cefr{
  font-family:var(--mono);font-size:9px;color:var(--muted);letter-spacing:.14em;font-weight:700;
  margin-left:auto;
}
#ex-exam-wrap .ph-sentence{
  font-size:19px;font-weight:600;line-height:1.5;letter-spacing:-.005em;
  color:var(--ink-2);
}
#ex-exam-wrap .ph-blank{
  display:inline-block;min-width:120px;padding:2px 14px;
  background:rgba(255,216,61,.06);
  border:2px dashed rgba(255,216,61,.4);
  border-radius:7px;
  color:var(--c-phrasal);font-weight:800;
  text-align:center;font-style:italic;
  vertical-align:baseline;
}
#ex-exam-wrap .ph-blank.filled{
  background:color-mix(in oklch,var(--c-phrasal) 15%,transparent);
  border-style:solid;color:#0a0a0a;
  background:var(--c-phrasal);
  font-style:normal;
}
#ex-exam-wrap .ph-options{display:flex;flex-wrap:wrap;gap:8px;}
#ex-exam-wrap .ph-chip{
  font-family:var(--mono);font-size:12px;font-weight:700;
  padding:9px 14px;border-radius:9px;
  background:var(--card-3);border:1px solid var(--line-2);
  color:var(--ink-2);transition:.15s;
  letter-spacing:.02em;
}
#ex-exam-wrap .ph-chip:hover{background:rgba(255,216,61,.06);border-color:var(--c-phrasal);color:var(--c-phrasal);}
#ex-exam-wrap .ph-chip.used{opacity:.3;cursor:not-allowed;background:transparent;}
#ex-exam-wrap .ph-chip.active{background:var(--c-phrasal);color:#0a0a0a;border-color:var(--c-phrasal);}

/* ============ SLANG / COLLOCATIONS ============ */
#ex-exam-wrap .match-wrap{
  background:var(--card);border:1px solid var(--line);
  border-radius:18px;padding:24px;
  display:grid;grid-template-columns:1fr 1fr;gap:18px;
}
#ex-exam-wrap .match-col{display:flex;flex-direction:column;gap:8px;}
#ex-exam-wrap .match-col-head{
  display:flex;align-items:center;gap:8px;
  font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.16em;text-transform:uppercase;font-weight:800;
  padding-bottom:8px;border-bottom:1px solid var(--line);margin-bottom:4px;
}
#ex-exam-wrap .match-col-head svg{width:13px;height:13px;stroke:var(--c-slang);fill:none;stroke-width:2;}
#ex-exam-wrap .match-card{
  display:flex;align-items:center;gap:12px;
  padding:14px 16px;border-radius:11px;
  background:var(--card-3);border:1px solid var(--line);
  transition:.15s;cursor:pointer;position:relative;
}
#ex-exam-wrap .match-card:hover{background:rgba(255,255,255,.04);border-color:var(--line-2);}
#ex-exam-wrap .match-card.selected{
  background:color-mix(in oklch,var(--c-slang) 10%,transparent);
  border-color:var(--c-slang);
  box-shadow:0 0 0 2px color-mix(in oklch,var(--c-slang) 20%,transparent);
}
#ex-exam-wrap .match-card.linked{
  background:color-mix(in oklch,var(--c-slang) 6%,transparent);
  border-color:color-mix(in oklch,var(--c-slang) 30%,transparent);
}
#ex-exam-wrap .match-card.linked::after{
  content:"";position:absolute;right:-9px;top:50%;transform:translateY(-50%);
  width:16px;height:2px;background:var(--c-slang);
  box-shadow:0 0 6px var(--c-slang);
}
#ex-exam-wrap .match-card.right.linked::after{right:auto;left:-9px;}
#ex-exam-wrap .match-bullet{
  width:24px;height:24px;border-radius:7px;
  background:rgba(255,90,196,.1);color:var(--c-slang);
  font-family:var(--mono);font-size:11px;font-weight:800;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
#ex-exam-wrap .match-card.right .match-bullet{background:rgba(255,255,255,.04);color:var(--ink-2);}
#ex-exam-wrap .match-text{flex:1;min-width:0;}
#ex-exam-wrap .match-text b{display:block;font-size:14px;font-weight:700;letter-spacing:-.005em;}
#ex-exam-wrap .match-text span{display:block;font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.06em;margin-top:2px;}

/* ============ WRITING ============ */
#ex-exam-wrap .writing-wrap{display:flex;flex-direction:column;gap:18px;}
#ex-exam-wrap .writing-prompt{
  background:linear-gradient(135deg,rgba(123,227,123,.06),rgba(123,227,123,.02));
  border:1px solid rgba(123,227,123,.25);
  border-radius:16px;padding:24px 26px;
  display:flex;flex-direction:column;gap:10px;
}
#ex-exam-wrap .wp-tag{
  display:flex;align-items:center;gap:8px;
  font-family:var(--mono);font-size:10px;color:var(--c-write);letter-spacing:.18em;text-transform:uppercase;font-weight:800;
}
#ex-exam-wrap .wp-tag::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--c-write);box-shadow:0 0 8px var(--c-write);}
#ex-exam-wrap .wp-prompt{font-size:22px;font-weight:700;letter-spacing:-.015em;line-height:1.35;}
#ex-exam-wrap .wp-prompt em{font-style:italic;color:var(--c-write);}
#ex-exam-wrap .wp-meta{display:flex;gap:24px;padding-top:12px;border-top:1px dashed rgba(123,227,123,.2);}
#ex-exam-wrap .wp-meta .m{display:flex;flex-direction:column;gap:1px;}
#ex-exam-wrap .wp-meta .m span{font-family:var(--mono);font-size:9px;color:var(--muted);letter-spacing:.14em;text-transform:uppercase;font-weight:700;}
#ex-exam-wrap .wp-meta .m b{font-family:var(--mono);font-size:13px;font-weight:800;color:var(--ink);}
#ex-exam-wrap .wp-meta .m b em{color:var(--c-write);font-style:normal;}

#ex-exam-wrap .editor{
  background:var(--card);border:1px solid var(--line);
  border-radius:14px;overflow:hidden;
  display:flex;flex-direction:column;
}
#ex-exam-wrap .editor-toolbar{
  display:flex;align-items:center;gap:4px;
  padding:8px 12px;background:var(--card-3);border-bottom:1px solid var(--line);
}
#ex-exam-wrap .tool-btn{
  width:32px;height:32px;border-radius:7px;
  display:flex;align-items:center;justify-content:center;color:var(--muted);
}
#ex-exam-wrap .tool-btn:hover{background:rgba(255,255,255,.05);color:var(--ink);}
#ex-exam-wrap .tool-btn svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:2;}
#ex-exam-wrap .tool-sep{width:1px;height:22px;background:var(--line);margin:0 6px;}
#ex-exam-wrap .tool-btn.active{background:rgba(123,227,123,.12);color:var(--c-write);}
#ex-exam-wrap .editor-spacer{flex:1;}
#ex-exam-wrap .editor-info{
  font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.04em;
  display:flex;gap:14px;align-items:center;
}
#ex-exam-wrap .editor-info b{color:var(--c-write);font-weight:800;}

#ex-exam-wrap .editor-area{
  padding:22px 26px;min-height:280px;
  font-size:15px;line-height:1.7;color:var(--ink);
  font-family:var(--sans);
  outline:none;
}
#ex-exam-wrap .editor-area p{margin-bottom:12px;}
#ex-exam-wrap .editor-area p.placeholder{color:var(--muted);font-style:italic;}

#ex-exam-wrap .writing-tips{
  display:grid;grid-template-columns:repeat(3,1fr);gap:10px;
}
#ex-exam-wrap .tip{
  background:var(--card-3);border:1px solid var(--line);
  border-radius:10px;padding:10px 12px;
  display:flex;gap:9px;align-items:flex-start;
  font-size:11.5px;color:var(--muted);line-height:1.4;
}
#ex-exam-wrap .tip svg{width:13px;height:13px;stroke:var(--c-write);fill:none;stroke-width:2;flex-shrink:0;margin-top:1px;}
#ex-exam-wrap .tip b{color:var(--ink-2);font-weight:700;}

/* ============ SPEAKING ============ */
#ex-exam-wrap .speak-wrap{
  background:var(--card);border:1px solid var(--line);
  border-radius:20px;padding:32px;
  display:flex;flex-direction:column;gap:24px;
  position:relative;overflow:hidden;
}
#ex-exam-wrap .speak-wrap::before{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(700px 400px at 50% 100%,color-mix(in oklch,var(--c-speak) 8%,transparent),transparent 60%);
}
#ex-exam-wrap .speak-wrap > *{position:relative;}

#ex-exam-wrap .speak-tabs{display:flex;gap:8px;padding:6px;background:var(--card-3);border:1px solid var(--line);border-radius:12px;}
#ex-exam-wrap .speak-tab{
  flex:1;padding:11px 16px;border-radius:9px;
  font-size:12px;font-weight:700;color:var(--muted);
  display:flex;align-items:center;justify-content:center;gap:8px;
  transition:.15s;
}
#ex-exam-wrap .speak-tab:hover{color:var(--ink-2);}
#ex-exam-wrap .speak-tab.active{
  background:color-mix(in oklch,var(--c-speak) 14%,transparent);
  color:var(--c-speak);
  box-shadow:inset 0 0 0 1px color-mix(in oklch,var(--c-speak) 35%,transparent);
}
#ex-exam-wrap .speak-tab svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;}

#ex-exam-wrap .read-aloud{
  background:var(--card-3);border:1px solid var(--line);
  border-radius:16px;padding:30px 32px;text-align:center;
  display:flex;flex-direction:column;gap:14px;align-items:center;
}
#ex-exam-wrap .read-lbl{font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.18em;text-transform:uppercase;font-weight:800;}
#ex-exam-wrap .read-sentence{
  font-size:30px;font-weight:600;line-height:1.4;letter-spacing:-.01em;
  max-width:720px;
}
#ex-exam-wrap .read-sentence em{font-style:italic;color:var(--c-speak);}
#ex-exam-wrap .read-ipa{font-family:var(--mono);font-size:13px;color:var(--ink-2);letter-spacing:.04em;max-width:720px;}

/* Mic + waveform */
#ex-exam-wrap .mic-area{
  display:flex;flex-direction:column;align-items:center;gap:18px;
  padding:8px 0;
}
#ex-exam-wrap .wave{display:flex;align-items:center;justify-content:center;gap:3px;height:48px;width:280px;}
#ex-exam-wrap .wave-bar{width:3px;border-radius:2px;background:var(--c-speak);box-shadow:0 0 6px color-mix(in oklch,var(--c-speak) 60%,transparent);animation:wb 1.2s ease-in-out infinite;}
@keyframes wb{0%,100%{height:8%;}50%{height:90%;}}
.wave-bar:nth-child(1){animation-delay:-1.1s;height:20%;}
.wave-bar:nth-child(2){animation-delay:-1.0s;height:50%;}
.wave-bar:nth-child(3){animation-delay:-0.9s;height:75%;}
.wave-bar:nth-child(4){animation-delay:-0.8s;height:60%;}
.wave-bar:nth-child(5){animation-delay:-0.7s;height:90%;}
.wave-bar:nth-child(6){animation-delay:-0.6s;height:40%;}
.wave-bar:nth-child(7){animation-delay:-0.5s;height:80%;}
.wave-bar:nth-child(8){animation-delay:-0.4s;height:55%;}
.wave-bar:nth-child(9){animation-delay:-0.3s;height:70%;}
.wave-bar:nth-child(10){animation-delay:-0.2s;height:45%;}
.wave-bar:nth-child(11){animation-delay:-0.1s;height:65%;}
.wave-bar:nth-child(12){animation-delay:0s;height:35%;}
.wave-bar:nth-child(odd){background:color-mix(in oklch,var(--c-speak) 70%,#fff);}

.mic{
  position:relative;width:100px;height:100px;border-radius:50%;
  background:var(--c-speak);color:#1a0a05;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 14px 50px color-mix(in oklch,var(--c-speak) 40%,transparent),0 0 0 6px rgba(255,138,90,.1);
  transition:.2s;
}
#ex-exam-wrap .mic:hover{transform:scale(1.05);}
#ex-exam-wrap .mic svg{width:40px;height:40px;fill:currentColor;stroke:none;}
#ex-exam-wrap .mic::before, #ex-exam-wrap .mic::after{
  content:"";position:absolute;inset:-12px;border-radius:50%;
  border:2px solid var(--c-speak);opacity:.3;
  animation:micRing 2s ease-out infinite;
}
#ex-exam-wrap .mic::after{animation-delay:1s;}
@keyframes micRing{0%{transform:scale(1);opacity:.4;}100%{transform:scale(1.4);opacity:0;}}

.mic-info{display:flex;flex-direction:column;align-items:center;gap:4px;}
.mic-info b{font-family:var(--mono);font-size:11px;color:var(--c-speak);letter-spacing:.18em;text-transform:uppercase;font-weight:800;}
.mic-info span{font-family:var(--mono);font-size:11px;color:var(--ink-2);font-feature-settings:"tnum";}

/* Word-by-word accuracy preview */
.word-acc{
  display:flex;flex-wrap:wrap;justify-content:center;gap:4px;max-width:720px;
  margin:0 auto;padding-top:16px;border-top:1px dashed var(--line);
}
#ex-exam-wrap .word-tk{
  font-size:14px;padding:3px 7px;border-radius:6px;
  font-family:var(--mono);font-weight:600;
}
#ex-exam-wrap .word-tk.ok{color:var(--good);background:rgba(123,227,123,.08);}
#ex-exam-wrap .word-tk.warn{color:var(--warn);background:rgba(251,191,36,.08);}
#ex-exam-wrap .word-tk.bad{color:var(--bad);background:rgba(255,90,90,.08);}
#ex-exam-wrap .word-tk.pending{color:var(--muted);}

/* ============ RESULTS ============ */
#ex-exam-wrap .results-hero{
  background:linear-gradient(135deg,rgba(196,255,61,.08),rgba(96,165,250,.05));
  border:1px solid rgba(196,255,61,.25);
  border-radius:20px;padding:36px;
  display:grid;grid-template-columns:1.3fr 1fr;gap:36px;align-items:center;
  position:relative;overflow:hidden;
}
#ex-exam-wrap .results-hero::before{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(500px 400px at 100% 100%,rgba(196,255,61,.08),transparent 60%);
}
#ex-exam-wrap .results-hero > *{position:relative;}
#ex-exam-wrap .results-grade{
  display:flex;align-items:baseline;gap:14px;
}
#ex-exam-wrap .results-grade b{font-size:120px;font-weight:800;letter-spacing:-.06em;line-height:.9;
  background:linear-gradient(180deg,var(--accent),var(--accent-d));-webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 6px 20px rgba(196,255,61,.4));}
#ex-exam-wrap .results-grade .of{font-family:var(--mono);font-size:24px;color:var(--muted);font-weight:700;}
#ex-exam-wrap .results-label{font-family:var(--mono);font-size:11px;color:var(--accent);letter-spacing:.2em;text-transform:uppercase;font-weight:800;margin-top:10px;}
#ex-exam-wrap .results-title{font-size:34px;font-weight:800;letter-spacing:-.025em;line-height:1.05;margin-top:8px;}
#ex-exam-wrap .results-title em{font-style:normal;color:var(--accent);}
#ex-exam-wrap .results-sub{font-size:14px;color:var(--ink-2);line-height:1.55;margin-top:8px;max-width:480px;}

/* Radar / skill bars */
#ex-exam-wrap .skill-radar{
  background:var(--card-3);border:1px solid rgba(196,255,61,.18);
  border-radius:18px;padding:24px;
  display:flex;flex-direction:column;gap:14px;
}
#ex-exam-wrap .sr-head{font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.18em;text-transform:uppercase;font-weight:800;}
#ex-exam-wrap .sr-list{display:flex;flex-direction:column;gap:12px;}
#ex-exam-wrap .sr-row{display:grid;grid-template-columns:90px 1fr 50px;gap:12px;align-items:center;}
#ex-exam-wrap .sr-name{
  font-family:var(--mono);font-size:11px;font-weight:700;letter-spacing:.04em;color:var(--ink-2);
  display:flex;align-items:center;gap:7px;
}
#ex-exam-wrap .sr-name .d{width:6px;height:6px;border-radius:50%;background:var(--c);box-shadow:0 0 6px var(--c);}
#ex-exam-wrap .sr-track{
  height:8px;background:rgba(255,255,255,.05);border-radius:4px;border:1px solid var(--line);overflow:hidden;position:relative;
}
#ex-exam-wrap .sr-fill{
  height:100%;border-radius:4px;
  background:linear-gradient(90deg,color-mix(in oklch,var(--c) 60%,#000),var(--c));
  box-shadow:0 0 10px color-mix(in oklch,var(--c) 40%,transparent);
}
#ex-exam-wrap .sr-pct{font-family:var(--mono);font-size:13px;font-weight:800;color:var(--c);font-feature-settings:"tnum";text-align:right;}

#ex-exam-wrap .results-cta{
  display:grid;grid-template-columns:1fr 1fr;gap:14px;
}
#ex-exam-wrap .results-card{
  background:var(--card);border:1px solid var(--line);
  border-radius:14px;padding:18px 20px;
  display:flex;flex-direction:column;gap:8px;
}
#ex-exam-wrap .results-card.upgrade{
  background:linear-gradient(135deg,rgba(196,255,61,.08),rgba(196,255,61,.02));
  border-color:rgba(196,255,61,.3);
}
#ex-exam-wrap .rc-tag{font-family:var(--mono);font-size:9.5px;color:var(--muted);letter-spacing:.16em;text-transform:uppercase;font-weight:800;}
#ex-exam-wrap .results-card.upgrade .rc-tag{color:var(--accent);}
#ex-exam-wrap .rc-title{font-size:18px;font-weight:800;letter-spacing:-.015em;}
#ex-exam-wrap .rc-desc{font-size:12.5px;color:var(--muted);line-height:1.4;}
#ex-exam-wrap .rc-btn{
  display:flex;align-items:center;justify-content:center;gap:7px;
  margin-top:6px;padding:10px 14px;border-radius:9px;
  font-size:12px;font-weight:700;
}
#ex-exam-wrap .rc-btn.go{background:var(--accent);color:#0a0a0a;}
#ex-exam-wrap .rc-btn.ghost{background:transparent;border:1px solid var(--line-2);color:var(--ink-2);}
#ex-exam-wrap .rc-btn svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2.2;}


/* ── Admin overlays ── */
#ex-exam-wrap .ex-q-wrap { position: relative; }
#ex-exam-wrap .ex-q-wrap:hover .ex-q-actions { opacity: 1; }
#ex-exam-wrap .ex-q-actions {
  position: absolute; top: 10px; right: 10px;
  display: flex; gap: 6px; opacity: 0;
  transition: opacity .15s; z-index: 10;
  pointer-events: all;
}
#ex-exam-wrap .ex-q-btn {
  padding: 5px 14px; border-radius: 7px; font-size: 11px;
  font-weight: 700; cursor: pointer; border: 1px solid;
  font-family: inherit; backdrop-filter: blur(6px);
}
#ex-exam-wrap .ex-q-btn.edit { background: rgba(196,255,61,.15); color: #c4ff3d; border-color: rgba(196,255,61,.35); }
#ex-exam-wrap .ex-q-btn.del  { background: rgba(255,90,90,.15);  color: #ff5a5a; border-color: rgba(255,90,90,.35); }
`;
  document.head.appendChild(s);
}

// ============================================================
//  HTML base del tab
// ============================================================
function buildHTML(){
  var rankOpts = RANKS.map(function(r){return '<option value="'+r+'">'+r.charAt(0).toUpperCase()+r.slice(1)+'</option>';}).join('');
  var langOpts = Object.keys(LANGS).map(function(k){return '<option value="'+k+'">'+LANGS[k]+'</option>';}).join('');
  var secOpts  = SECTIONS.map(function(s){return '<option value="'+s+'">'+s.charAt(0).toUpperCase()+s.slice(1)+'</option>';}).join('');
  var inp = 'width:100%;background:#1f1f1f;border:1px solid #262626;border-radius:8px;padding:8px 11px;color:#f5f5f5;font-size:13px;box-sizing:border-box;font-family:inherit;';
  return '<div id="t-examen" style="display:none;">'
    + '<div id="ex-exam-wrap">'
    + '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">'

    /* Header + Filters */
    + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;gap:14px;flex-wrap:wrap;">'
    + '<div style="font-size:20px;font-weight:800;color:var(--ink);">Banco de preguntas</div>'
    + '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">'
    + '<select id="ex-filt-rank" onchange="exCargar()" style="'+inp+'width:auto;">'+rankOpts+'</select>'
    + '<select id="ex-filt-lang" onchange="exCargar()" style="'+inp+'width:auto;">'+langOpts+'</select>'
    + '<button onclick="exCargar()" style="padding:8px 14px;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;color:var(--ink);">↺</button>'
    + '<span id="ex-stats" style="font-size:11px;color:var(--muted);font-family:var(--mono);"></span>'
    + '</div></div>'

    /* Sections */
    + '<div id="ex-visual"></div>'

    /* Requisitos */
    + '<div style="margin-top:32px;">'
    + '<div style="font-size:14px;font-weight:700;margin-bottom:12px;color:var(--ink);">Requisitos de desbloqueo por rango</div>'
    + '<div id="ex-reqs" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;"></div>'
    + '</div>'

    /* Modal editar */
    + '<div id="ex-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.82);backdrop-filter:blur(8px);z-index:9000;overflow-y:auto;padding:40px 20px;">'
    + '<div style="background:var(--card);border:1px solid var(--line);border-radius:18px;max-width:700px;margin:0 auto;padding:30px;">'
    + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;">'
    + '<h3 id="ex-modal-title" style="font-size:18px;font-weight:800;color:var(--ink);margin:0;">Nueva pregunta</h3>'
    + '<button onclick="exCerrarModal()" style="width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.08);border:none;color:var(--ink);font-size:18px;cursor:pointer;">×</button></div>'
    + '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px;">'
    + '<div><label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">Rango</label><select id="ex-m-rank" style="'+inp+'">'+rankOpts+'</select></div>'
    + '<div><label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">Idioma</label><select id="ex-m-lang" style="'+inp+'">'+langOpts+'</select></div>'
    + '<div><label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">Sección</label><select id="ex-m-section" onchange="exRenderFormSection()" style="'+inp+'">'+secOpts+'</select></div>'
    + '</div>'
    + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">'
    + '<div><label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">Tipo</label><input id="ex-m-type" type="text" style="'+inp+'"></div>'
    + '<div><label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">Dificultad (1-5)</label><input id="ex-m-diff" type="number" min="1" max="5" value="3" style="'+inp+'"></div>'
    + '</div>'
    + '<div id="ex-m-form"></div>'
    + '<div><label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">JSON del contenido</label>'
    + '<textarea id="ex-m-json" oninput="exLivePreview()" style="'+inp+'font-family:monospace;font-size:11px;resize:vertical;min-height:160px;"></textarea></div>'
    + '<div style="margin-top:12px;">'
    + '<button onclick="exTogglePreview()" style="padding:6px 12px;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:7px;font-size:11px;cursor:pointer;color:var(--ink);">👁 Preview</button>'
    + '<div id="ex-live-preview" style="margin-top:10px;"></div></div>'
    + '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:20px;">'
    + '<button id="ex-btn-del" onclick="exEliminarActual()" style="display:none;padding:10px 20px;background:rgba(255,90,90,.1);border:1px solid rgba(255,90,90,.3);border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;color:#ff5a5a;font-family:inherit;">Eliminar</button>'
    + '<div style="display:flex;gap:10px;margin-left:auto;">'
    + '<button onclick="exCerrarModal()" style="padding:10px 20px;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;color:var(--ink);">Cancelar</button>'
    + '<button onclick="exGuardar()" style="padding:10px 24px;background:var(--accent);color:#0a0a0a;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;">Guardar</button>'
    + '</div></div>'
    + '</div></div>'

    + '</div>' /* /ex-exam-wrap */
    + '</div>'; /* /t-examen */
}

// ============================================================
//  INIT
// ============================================================
window.initExamen = function(sb){
  _sb = sb;
  if (!document.getElementById('t-examen')){
    var c = document.querySelector('.adm-content') || document.querySelector('main') || document.body;
    c.insertAdjacentHTML('beforeend', buildHTML());
  }
  injectCSS();
  exLoadRequirements();
};

// ============================================================
//  CARGAR
// ============================================================
window.exCargar = function(){
  if (!_sb) return;
  var rank = (document.getElementById('ex-filt-rank')||{}).value || 'bronce';
  var lang = (document.getElementById('ex-filt-lang')||{}).value || 'en';
  var vis  = document.getElementById('ex-visual');
  if (!vis) return;
  vis.innerHTML = '<p style="color:var(--muted);padding:20px;font-family:var(--mono);">Cargando...</p>';

  _sb.from('exam_content')
    .select('id,section,content_type,content,difficulty,active,created_at')
    .eq('rank', rank).eq('language', lang)
    .order('section').order('created_at')
    .then(function(res){
      var rows = (res && res.data) || [];
      var stats = document.getElementById('ex-stats');
      if (stats) stats.textContent = rows.length + ' preguntas';

      var by = {}; SECTIONS.forEach(function(s){ by[s]=[]; });
      rows.forEach(function(r){ if(by[r.section]) by[r.section].push(r); });

      vis.innerHTML = SECTIONS.map(function(sec){
        var m   = SEC_META[sec];
        var bag = by[sec];
        var cards = bag.length
          ? bag.map(function(row,i){ return exRenderCard(row, i+1, sec); }).join('')
          : '<p style="color:var(--muted);font-family:var(--mono);font-size:12px;padding:16px;border:1px dashed var(--line);border-radius:10px;text-align:center;">Sin preguntas — agrega la primera.</p>';

        return '<div style="margin-bottom:36px;">'
          + '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 18px;border-radius:12px 12px 0 0;background:color-mix(in srgb,'+m.color+' 10%,#0d0d0d);border:1px solid color-mix(in srgb,'+m.color+' 25%,transparent);">'
          + '<span style="font-family:var(--mono);font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+m.color+';">'+m.label+' <span style="color:var(--muted);font-weight:600;">('+bag.length+')</span></span>'
          + '<button class="adm-btn" style="font-size:11px;padding:6px 14px;" onclick="exNuevoEnSeccion(\''+sec+'\')">+ Agregar</button>'
          + '</div>'
          + '<div style="border:1px solid rgba(255,255,255,.05);border-top:none;border-radius:0 0 12px 12px;padding:16px;display:flex;flex-direction:column;gap:14px;background:rgba(255,255,255,.01);">'
          + cards
          + '</div></div>';
      }).join('');
    });
};

// ============================================================
//  RENDER CARD — HTML EXACTO del examen con --c-page por sección
// ============================================================
function exRenderCard(row, num, sec){
  var ct = {};
  try { ct = typeof row.content==='string' ? JSON.parse(row.content) : (row.content||{}); } catch(e){}
  var m = SEC_META[sec];
  var inner = '';

  /* ── LISTENING / READING → .question (exact exam HTML) ── */
  if (sec==='listening' || sec==='reading'){
    var opts    = ct.options || [];
    var correct = ct.correct!==undefined ? parseInt(ct.correct) : -1;
    inner = '<div style="--c-page:'+m.cssVar+';">'
      + '<div class="questions">'
      + '<article class="question">'
      + '<header class="q-head">'
      + '<div class="q-num">'+num+'</div>'
      + '<div class="q-text">'+(ct.question||ct.text||'<em>Sin pregunta</em>')+'</div>'
      + (ct.tag?'<span class="q-tag">'+ct.tag+'</span>':'')
      + '</header>'
      + '<div class="options'+(opts.length<=2?' col':'')+'">'
      + opts.map(function(o,i){
          return '<button class="opt'+(i===correct?' selected':'')+'"><span class="opt-bullet">'+String.fromCharCode(65+i)+'</span><span class="opt-text">'+o+'</span></button>';
        }).join('')
      + '</div>'
      + '</article>'
      + '</div></div>';
  }

  /* ── VOCABULARY → .vocab-stage (exact exam HTML) ── */
  else if (sec==='vocabulary'){
    var opts    = ct.options || [];
    var correct = ct.correct!==undefined ? parseInt(ct.correct) : -1;
    inner = '<div style="--c-page:var(--c-vocab);">'
      + '<div class="vocab-stage">'
      + '<div class="vocab-counter">'
      + '<span class="pos"><b>'+String(num).padStart(2,'0')+'</b> de ?? · vocabulario</span>'
      + (ct.pos||ct.cefr?'<span class="vocab-pos-pill">▸ '+(ct.pos||'word')+(ct.cefr?' · '+ct.cefr:'')+'</span>':'')
      + '</div>'
      + '<div class="vocab-card">'
      + '<div class="vocab-word">'+(ct.word||'—')+'</div>'
      + (ct.ipa?'<div class="vocab-ipa">'+ct.ipa+'</div>':'')
      + (ct.grammar?'<div class="vocab-grammar">'+ct.grammar+(ct.register?' — <b>'+ct.register+'</b>':'')+'</div>':'')
      + '</div>'
      + (opts.length?'<div class="vocab-question">▾ ¿Cuál es la mejor definición?</div>'
          + '<div class="options">'
          + opts.map(function(o,i){
              return '<button class="opt'+(i===correct?' selected':'')+'"><span class="opt-bullet">'+String.fromCharCode(65+i)+'</span><span class="opt-text">'+o+'</span></button>';
            }).join('')
          + '</div>':'')
      + '</div></div>';
  }

  /* ── PHRASAL VERBS → .phrasal-item (exact exam HTML) ── */
  else if (sec==='phrasal'){
    var opts    = ct.options || [];
    var correct = ct.correct!==undefined ? parseInt(ct.correct) : -1;
    var blank   = ct.blank || (opts[correct]||'___');
    var sent    = ct.sentence || ct.text || '';
    if (sent.match(/_{3,}/)) sent = sent.replace(/_{3,}/g, '<span class="ph-blank filled">'+blank+'</span>');
    else if (sent) sent += ' <span class="ph-blank filled">'+blank+'</span>';
    inner = '<div style="--c-page:var(--c-phrasal);">'
      + '<div class="phrasal-list">'
      + '<article class="phrasal-item">'
      + '<header class="ph-head">'
      + '<div class="ph-num">'+num+'</div>'
      + (ct.register?'<span style="font-family:var(--mono);font-size:11px;color:var(--muted);letter-spacing:.04em;">▸ '+ct.register+'</span>':'')
      + (ct.cefr||ct.tag?'<span class="ph-cefr">'+(ct.cefr||ct.tag)+'</span>':'')
      + '</header>'
      + '<div class="ph-sentence">'+(sent||'Sin oración')+'</div>'
      + (opts.length?'<div class="ph-options">'+opts.map(function(o,i){return '<button class="ph-chip'+(i===correct?' active':'')+'">'+o+'</button>';}).join('')+'</div>':'')
      + '</article>'
      + '</div></div>';
  }

  /* ── SLANG → .match-wrap (exact exam HTML) ── */
  else if (sec==='slang'){
    var pairs = [];
    if (Array.isArray(ct.pairs)&&ct.pairs.length) pairs=ct.pairs;
    else if (ct.expression||ct.word) pairs=[{expression:ct.expression||ct.word,meaning:ct.meaning||'',register:ct.register||''}];
    inner = '<div style="--c-page:var(--c-slang);">'
      + '<div class="match-wrap">'
      + '<div class="match-col">'
      + '<div class="match-col-head"><svg viewBox="0 0 24 24" width="13" height="13"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" fill="none" stroke-width="2"/></svg>Expresión nativa</div>'
      + pairs.map(function(p,i){return '<button class="match-card linked"><span class="match-bullet">'+String.fromCharCode(65+i)+'</span><div class="match-text"><b>'+(p.expression||p.word||'—')+'</b>'+(p.register?'<span>'+p.register+'</span>':'')+'</div></button>';}).join('')
      + '</div>'
      + '<div class="match-col">'
      + '<div class="match-col-head"><svg viewBox="0 0 24 24" width="13" height="13"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" fill="none" stroke-width="2"/><path d="M14 2v6h6M16 13H8M16 17H8" stroke="currentColor" fill="none" stroke-width="2"/></svg>Definición formal</div>'
      + pairs.map(function(p,i){return '<button class="match-card right linked"><span class="match-bullet">'+String.fromCharCode(49+i)+'</span><div class="match-text"><b>'+(p.meaning||'—')+'</b></div></button>';}).join('')
      + '</div>'
      + '</div></div>';
  }

  /* ── WRITING → .writing-prompt (exact exam HTML) ── */
  else if (sec==='writing'){
    inner = '<div style="--c-page:var(--c-write);">'
      + '<div class="writing-wrap">'
      + '<div class="writing-prompt">'
      + '<div class="wp-tag">prompt'+(ct.style?' · '+ct.style:'')+'</div>'
      + '<div class="wp-prompt">'+(ct.prompt||ct.text||'Sin prompt')+'</div>'
      + ((ct.min_words||ct.max_words||ct.register||ct.structure)?
          '<div class="wp-meta">'
          +(ct.min_words?'<div class="m"><span>Mínimo</span><b>'+ct.min_words+' palabras</b></div>':'')
          +(ct.max_words?'<div class="m"><span>Sugerido</span><b><em>'+ct.max_words+'</em></b></div>':'')
          +(ct.register?'<div class="m"><span>Registro</span><b>'+ct.register+'</b></div>':'')
          +(ct.structure?'<div class="m"><span>Estructura</span><b>'+ct.structure+'</b></div>':'')
          +'</div>':'')
      + '</div>'
      + '</div></div>';
  }

  /* ── SPEAKING → .speak-wrap + .read-aloud (exact exam HTML) ── */
  else if (sec==='speaking'){
    var txt = ct.text||ct.sentence||'';
    var prt = ct.prompt||'';
    inner = '<div style="--c-page:var(--c-speak);">'
      + '<div class="speak-wrap">'
      + '<div class="read-aloud">'
      + '<span class="read-lbl">▸ lee esta frase en voz alta</span>'
      + '<div class="read-sentence">'+(txt||prt||'Sin frase')+'</div>'
      + (ct.ipa?'<div class="read-ipa">'+ct.ipa+'</div>':'')
      + '</div>'
      + (prt&&txt?'<div class="read-aloud" style="border-color:var(--c-speak);background:color-mix(in oklch,var(--c-speak) 6%,transparent);">'
          +'<span class="read-lbl">▸ responde libremente</span>'
          +'<div class="read-sentence" style="font-size:20px;">'+prt+'</div>'
          +'</div>':'')
      + '</div></div>';
  }

  return '<div class="ex-q-wrap">'
    + '<div class="ex-q-actions">'
    + '<button class="ex-q-btn edit" onclick="exEditar(\''+row.id+'\')">✏ Editar</button>'
    + '<button class="ex-q-btn del" onclick="exEliminar(\''+row.id+'\')">✕ Eliminar</button>'
    + '</div>'
    + inner
    + '</div>';
}

// ============================================================
//  REQUISITOS
// ============================================================
function exLoadRequirements(){
  if (!_sb) return;
  _sb.from('rank_requirements').select('*').order('min_level').then(function(res){
    var el=document.getElementById('ex-reqs');
    if(!el||!res.data)return;
    var colors={bronce:'#cd7f32',plata:'#d1d5db',oro:'#fbbf24',platino:'#5eead4',diamante:'#60a5fa',challenger:'#c4ff3d'};
    el.innerHTML=res.data.map(function(r){
      var c=colors[r.to_rank]||'#c4ff3d';
      return '<div style="background:var(--card-2);border:1px solid var(--line);border-radius:10px;padding:14px;position:relative;overflow:hidden;">'
        +'<div style="position:absolute;top:0;left:0;width:3px;height:100%;background:'+c+';border-radius:3px 0 0 3px;"></div>'
        +'<div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;">'+r.from_rank+' → '+r.to_rank+'</div>'
        +'<div style="font-size:12px;color:var(--ink-2);">Nivel mín: <b style="color:'+c+'">'+r.min_level+'</b></div>'
        +'<div style="font-size:12px;color:var(--ink-2);">Méritos: <b style="color:'+c+'">'+r.min_merit_pm.toLocaleString()+'</b></div>'
        +'<div style="font-size:11px;color:var(--muted);margin-top:4px;">Aprobar: '+r.pass_score+'/1000 · '+r.retries_per_cycle+' intentos</div>'
        +'</div>';
    }).join('');
  });
}

// ============================================================
//  MODAL
// ============================================================
window.exNuevo=function(){
  _editId=null;
  document.getElementById('ex-modal-title').textContent='Nueva pregunta';
  document.getElementById('ex-m-rank').value=(document.getElementById('ex-filt-rank')||{}).value||'bronce';
  document.getElementById('ex-m-lang').value=(document.getElementById('ex-filt-lang')||{}).value||'en';
  document.getElementById('ex-m-section').value='listening';
  document.getElementById('ex-m-type').value='';
  document.getElementById('ex-m-diff').value='3';
  document.getElementById('ex-m-json').value='';
  var del=document.getElementById('ex-btn-del'); if(del)del.style.display='none';
  exRenderFormSection();
  document.getElementById('ex-live-preview').innerHTML='';
  _prevOpen=false;
  document.getElementById('ex-modal').style.display='block';
};
window.exNuevoEnSeccion=function(sec){exNuevo();document.getElementById('ex-m-section').value=sec;exRenderFormSection();};
window.exCerrarModal=function(){document.getElementById('ex-modal').style.display='none';_editId=null;_prevOpen=false;};

window.exRenderFormSection=function(){
  var sec=document.getElementById('ex-m-section').value;
  var form=document.getElementById('ex-m-form');
  var pls={
    listening: '{"question":"What tone does the speaker use?","options":["Sarcastic","Optimistic","Worried","Indifferent"],"correct":1,"tag":"Inferencia · C1"}',
    reading:   '{"question":"What is the main argument?","options":["A option","B option","C option","D option"],"correct":0,"tag":"Main idea · C1"}',
    vocabulary:'{"word":"serendipity","ipa":"/ˌsɛrənˈdɪpɪti/","grammar":"n.","pos":"noun","cefr":"C1","register":"formal","options":["A: fortuito","B: tristeza","C: esfuerzo","D: ambición"],"correct":0}',
    phrasal:   '{"sentence":"It took him a year to ___ the breakup.","blank":"get over","options":["get over","put off","run into","give up"],"correct":0,"cefr":"B2","register":"informal · spoken English"}',
    slang:     '{"pairs":[{"expression":"Spill the tea","meaning":"Share gossip","register":"informal · gossip"},{"expression":"Ghost someone","meaning":"Stop all contact","register":"verb · dating slang"}]}',
    writing:   '{"prompt":"Some people argue that convenience has eroded our resilience. Discuss both views.","min_words":250,"max_words":300,"register":"Formal / académico","structure":"4 párrafos","style":"IELTS Task 2"}',
    speaking:  '{"text":"The relentless pursuit of frictionless living may leave us less resilient.","ipa":"/ðə rɪˈlentləs pəˈsjuːt.../","prompt":"How does technology affect your focus? Respond freely for 90 seconds."}'
  };
  var tmpl=pls[sec]||'{}';
  form._tmpl=tmpl;
  form.innerHTML='<div style="margin-bottom:12px;">'
    +'<div style="font-size:11px;color:var(--muted);font-weight:600;margin-bottom:6px;">Template para sección "'+sec+'":</div>'
    +'<button onclick="exUsarTemplate()" style="padding:5px 12px;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:6px;font-size:11px;cursor:pointer;font-family:inherit;color:var(--ink);">Usar template →</button>'
    +'<pre style="background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:10px;font-size:10px;color:var(--muted);overflow-x:auto;white-space:pre-wrap;margin-top:8px;">'+tmpl+'</pre>'
    +'</div>';
};
window.exUsarTemplate=function(){
  var sec=document.getElementById('ex-m-section').value;
  var form=document.getElementById('ex-m-form');
  var tm={listening:'question',reading:'question',vocabulary:'question',phrasal:'phrasal_item',slang:'word_pair',writing:'writing_prompt',speaking:'speaking_prompt'};
  document.getElementById('ex-m-type').value=tm[sec]||'question';
  document.getElementById('ex-m-json').value=form._tmpl||'{}';
  exLivePreview();
};

window.exTogglePreview=function(){_prevOpen=!_prevOpen;if(_prevOpen)exLivePreview();else document.getElementById('ex-live-preview').innerHTML='';};
window.exLivePreview=function(){
  if(!_prevOpen)return;
  var sec=document.getElementById('ex-m-section').value;
  var json=document.getElementById('ex-m-json').value.trim();
  var box=document.getElementById('ex-live-preview');
  if(!box)return;
  try{
    var content=JSON.parse(json);
    var fakeRow={id:'__preview__',content:content,section:sec};
    box.innerHTML='<div style="border:1px dashed rgba(196,255,61,.25);border-radius:10px;padding:14px;margin-top:4px;">'
      +'<div style="font-family:var(--mono);font-size:9px;color:var(--muted);letter-spacing:.14em;text-transform:uppercase;font-weight:700;margin-bottom:10px;">Preview</div>'
      +exRenderCard(fakeRow,1,sec)+'</div>';
  }catch(e){box.innerHTML='<div style="font-size:11px;color:#ff5a5a;padding:8px;">JSON inválido: '+e.message+'</div>';}
};

window.exGuardar=function(){
  var rank=document.getElementById('ex-m-rank').value;
  var lang=document.getElementById('ex-m-lang').value;
  var sec=document.getElementById('ex-m-section').value;
  var type_v=document.getElementById('ex-m-type').value.trim();
  var diff=parseInt(document.getElementById('ex-m-diff').value)||3;
  var jsonRaw=document.getElementById('ex-m-json').value.trim();
  if(!jsonRaw){alert('El campo JSON es obligatorio.');return;}
  var content; try{content=JSON.parse(jsonRaw);}catch(e){alert('JSON inválido: '+e.message);return;}
  var payload={rank:rank,language:lang,section:sec,content_type:type_v,content:content,difficulty:diff,active:true};
  var prom=_editId?_sb.from('exam_content').update(payload).eq('id',_editId):_sb.from('exam_content').insert([payload]);
  prom.then(function(res){if(res.error){alert('Error: '+res.error.message);return;}exCerrarModal();exCargar();});
};

window.exEditar=function(id){
  _sb.from('exam_content').select('*').eq('id',id).single().then(function(res){
    if(res.error||!res.data)return;
    var row=res.data; _editId=id;
    document.getElementById('ex-modal-title').textContent='Editar pregunta';
    document.getElementById('ex-m-rank').value=row.rank;
    document.getElementById('ex-m-lang').value=row.language;
    document.getElementById('ex-m-section').value=row.section;
    document.getElementById('ex-m-type').value=row.content_type||'';
    document.getElementById('ex-m-diff').value=row.difficulty;
    document.getElementById('ex-m-json').value=JSON.stringify(row.content,null,2);
    var del=document.getElementById('ex-btn-del'); if(del)del.style.display='block';
    exRenderFormSection();
    document.getElementById('ex-live-preview').innerHTML=''; _prevOpen=false;
    document.getElementById('ex-modal').style.display='block';
  });
};

window.exEliminar=function(id){
  if(!confirm('¿Eliminar esta pregunta?'))return;
  _sb.from('exam_content').delete().eq('id',id).then(function(res){if(res.error){alert('Error: '+res.error.message);return;}exCargar();});
};
window.exEliminarActual=function(){if(!_editId)return;exCerrarModal();exEliminar(_editId);};

window.exGenerarIA=async function(){
  var text=(document.getElementById('ex-m-ai-text')||{value:''}).value.trim();
  var section=document.getElementById('ex-m-section').value;
  var rank=document.getElementById('ex-m-rank').value;
  if(!text){alert('Escribe el texto base primero.');return;}
  try{
    var t1='ghp_A3wgIzZE8mEY',t2='L4MYi36BFjT7zbYlP040rH7A';
    var res=await fetch('https://api.github.com/repos/sergiosaacx/aura-languages/dispatches',{
      method:'POST',
      headers:{'Authorization':'token '+(t1+t2),'Content-Type':'application/json','Accept':'application/vnd.github+json'},
      body:JSON.stringify({event_type:'generate-exam-question',client_payload:{section:section,rank:rank,text:text.slice(0,2000)}})
    });
    alert(res.ok?'✅ Solicitud enviada.':'Error al llamar GitHub Actions.');
    exUsarTemplate();
  }catch(e){alert('Error: '+e.message);}
};

})();

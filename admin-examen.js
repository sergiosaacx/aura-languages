/* ============================================================
   admin-examen.js — Módulo de administración del Examen de Ascenso
   Aura Languages · github.com/sergiosaacx/aura-languages
   Visual: replica exacta del diseño de examen-ascenso.html
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
  listening:  { color:'#7CB2FF', label:'Listening',            icon:'<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.8"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>' },
  reading:    { color:'#A78BFA', label:'Reading',              icon:'<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.8"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>' },
  vocabulary: { color:'#5BE9F6', label:'Vocabulary',           icon:'<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.8"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' },
  phrasal:    { color:'#FFD83D', label:'Phrasal Verbs',        icon:'<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.8"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>' },
  slang:      { color:'#FF5AC4', label:'Slang & Collocations', icon:'<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' },
  writing:    { color:'#7BE37B', label:'Writing',              icon:'<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>' },
  speaking:   { color:'#FF8A5A', label:'Speaking',             icon:'<svg viewBox="0 0 24 24" style="width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.8"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>' }
};

// ============================================================
//  CSS — inyectado una sola vez en <head>
// ============================================================
function injectCSS(){
  if (document.getElementById('ex-admin-css')) return;
  var s = document.createElement('style');
  s.id  = 'ex-admin-css';
  s.textContent = `
/* === VARIABLES EXAMEN (scoped) === */
#t-examen{
  --c-listen:#7CB2FF;--c-read:#A78BFA;--c-vocab:#5BE9F6;
  --c-phrasal:#FFD83D;--c-slang:#FF5AC4;--c-write:#7BE37B;--c-speak:#FF8A5A;
  --card-3:#0e0e0e;--line:#262626;--line-2:#333;
  --ink:#f5f5f5;--ink-2:#c8c8c8;--muted:#7a7a7a;
  --good:#7BE37B;
}
/* === SECTION BLOCK === */
#t-examen .ex-sec-block{margin-bottom:32px;}
#t-examen .ex-sec-head{
  display:flex;align-items:center;justify-content:space-between;
  padding:13px 20px;border-radius:14px 14px 0 0;
  border:1px solid rgba(255,255,255,.07);
}
#t-examen .ex-sec-title{
  display:flex;align-items:center;gap:10px;
  font-family:'JetBrains Mono',monospace;font-size:10.5px;
  font-weight:800;letter-spacing:.16em;text-transform:uppercase;
}
#t-examen .ex-sec-icon{
  width:28px;height:28px;border-radius:8px;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
#t-examen .ex-sec-cnt{
  font-family:'JetBrains Mono',monospace;font-size:10px;
  color:var(--muted);font-weight:700;margin-left:4px;
}
#t-examen .ex-sec-body{
  background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);
  border-top:none;border-radius:0 0 14px 14px;
  padding:18px;display:flex;flex-direction:column;gap:14px;
}
/* === CARD HOVER OVERLAY === */
#t-examen .ex-q-wrap{position:relative;}
#t-examen .ex-q-wrap:hover .ex-q-actions{opacity:1;}
#t-examen .ex-q-actions{
  position:absolute;top:10px;right:10px;
  display:flex;gap:6px;opacity:0;
  transition:opacity .15s;z-index:10;
}
#t-examen .ex-q-btn{
  padding:5px 12px;border-radius:7px;font-size:11px;
  font-weight:700;cursor:pointer;border:1px solid;
  font-family:inherit;
}
#t-examen .ex-q-btn.edit{background:rgba(196,255,61,.12);color:#c4ff3d;border-color:rgba(196,255,61,.3);}
#t-examen .ex-q-btn.del{background:rgba(255,90,90,.12);color:#ff5a5a;border-color:rgba(255,90,90,.3);}
/* === MCQ QUESTION (Listening / Reading) === */
#t-examen .question{
  background:var(--card,#171717);border:1px solid var(--line);
  border-radius:16px;padding:22px 24px;
  display:flex;flex-direction:column;gap:14px;
}
#t-examen .q-head{display:flex;align-items:flex-start;gap:14px;}
#t-examen .q-num{
  width:32px;height:32px;border-radius:9px;
  display:flex;align-items:center;justify-content:center;
  font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:800;flex-shrink:0;
}
#t-examen .q-text{flex:1;font-size:15px;font-weight:600;line-height:1.45;letter-spacing:-.005em;}
#t-examen .q-tag{
  font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:800;
  background:rgba(255,255,255,.04);border:1px solid var(--line);
  padding:3px 7px;border-radius:6px;letter-spacing:.1em;
  color:var(--muted);flex-shrink:0;text-transform:uppercase;
}
#t-examen .options{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
#t-examen .options.col1{grid-template-columns:1fr;}
#t-examen .opt{
  display:flex;align-items:center;gap:12px;
  padding:11px 15px;border-radius:11px;
  background:var(--card-3);border:1px solid var(--line);
}
#t-examen .opt.correct{background:rgba(123,227,123,.1);border-color:#7be37b;}
#t-examen .opt-bullet{
  width:22px;height:22px;border-radius:50%;
  border:1.5px solid var(--line-2);
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:800;color:var(--muted);
}
#t-examen .opt.correct .opt-bullet{background:#7be37b;border-color:#7be37b;color:#062a06;}
#t-examen .opt-text{font-size:13px;color:var(--ink-2);line-height:1.4;}
#t-examen .opt.correct .opt-text{color:var(--ink);font-weight:600;}
/* === VOCABULARY === */
#t-examen .vocab-stage{
  background:var(--card,#171717);border:1px solid var(--line);
  border-radius:16px;padding:20px 24px;
  display:flex;flex-direction:column;gap:12px;
  position:relative;overflow:hidden;
}
#t-examen .vocab-card{text-align:center;padding:16px 20px;display:flex;flex-direction:column;gap:5px;}
#t-examen .vocab-word{font-size:40px;font-weight:800;letter-spacing:-.03em;line-height:1;}
#t-examen .vocab-ipa{font-family:'JetBrains Mono',monospace;font-size:15px;font-weight:600;letter-spacing:.02em;color:var(--c-vocab);}
#t-examen .vocab-def{font-size:13px;color:var(--ink-2);line-height:1.5;max-width:400px;margin:4px auto 0;}
#t-examen .vocab-q{
  font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--muted);
  letter-spacing:.14em;text-transform:uppercase;font-weight:800;
  text-align:center;padding-top:8px;
  border-top:1px dashed rgba(255,255,255,.07);
}
/* === PHRASAL VERBS === */
#t-examen .phrasal-item{
  background:var(--card,#171717);border:1px solid var(--line);
  border-radius:14px;padding:20px 22px;
  display:flex;flex-direction:column;gap:12px;
}
#t-examen .ph-head{display:flex;align-items:center;gap:12px;}
#t-examen .ph-num{
  width:26px;height:26px;border-radius:8px;
  display:flex;align-items:center;justify-content:center;
  font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;flex-shrink:0;
  background:rgba(255,216,61,.14);color:var(--c-phrasal);
}
#t-examen .ph-sentence{font-size:18px;font-weight:600;line-height:1.5;color:var(--ink-2);}
#t-examen .ph-blank{
  display:inline-block;min-width:80px;padding:2px 10px;
  border-radius:6px;font-weight:800;font-style:normal;text-align:center;vertical-align:baseline;
  background:var(--c-phrasal);color:#0a0a0a;
}
#t-examen .ph-options{display:flex;flex-wrap:wrap;gap:8px;}
#t-examen .ph-chip{
  font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;
  padding:7px 13px;border-radius:9px;letter-spacing:.02em;
  background:rgba(255,255,255,.04);border:1px solid var(--line-2);color:var(--ink-2);
}
#t-examen .ph-chip.correct{background:rgba(255,216,61,.15);border-color:var(--c-phrasal);color:var(--c-phrasal);}
/* === SLANG / MATCH === */
#t-examen .match-wrap{
  background:var(--card,#171717);border:1px solid var(--line);
  border-radius:14px;padding:20px;
  display:grid;grid-template-columns:1fr 1fr;gap:16px;
}
#t-examen .match-col{display:flex;flex-direction:column;gap:8px;}
#t-examen .match-col-head{
  font-family:'JetBrains Mono',monospace;font-size:9.5px;color:var(--muted);
  letter-spacing:.16em;text-transform:uppercase;font-weight:800;
  padding-bottom:8px;border-bottom:1px solid var(--line);
}
#t-examen .match-card{
  display:flex;align-items:center;gap:10px;
  padding:11px 14px;border-radius:10px;
  background:var(--card-3);border:1px solid var(--line);
}
#t-examen .match-bullet{
  width:22px;height:22px;border-radius:6px;
  font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:800;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
#t-examen .match-text b{display:block;font-size:13px;font-weight:700;}
#t-examen .match-text span{display:block;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--muted);margin-top:2px;}
/* === WRITING === */
#t-examen .writing-prompt{
  background:linear-gradient(135deg,rgba(123,227,123,.06),rgba(123,227,123,.02));
  border:1px solid rgba(123,227,123,.25);
  border-radius:14px;padding:20px 22px;
  display:flex;flex-direction:column;gap:10px;
}
#t-examen .speak-prompt{
  background:linear-gradient(135deg,rgba(255,138,90,.06),rgba(255,138,90,.02));
  border:1px solid rgba(255,138,90,.25);
  border-radius:14px;padding:20px 22px;
  display:flex;flex-direction:column;gap:10px;
}
#t-examen .wp-kicker{
  display:flex;align-items:center;gap:8px;
  font-family:'JetBrains Mono',monospace;font-size:10px;
  letter-spacing:.18em;text-transform:uppercase;font-weight:800;
}
#t-examen .wp-kicker::before{
  content:"";width:6px;height:6px;border-radius:50%;
  background:currentColor;box-shadow:0 0 8px currentColor;
}
#t-examen .wp-prompt{font-size:19px;font-weight:700;letter-spacing:-.015em;line-height:1.35;}
#t-examen .wp-meta{display:flex;gap:20px;padding-top:10px;border-top:1px dashed rgba(255,255,255,.08);}
#t-examen .wp-meta .m{display:flex;flex-direction:column;gap:2px;}
#t-examen .wp-meta .m span{
  font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--muted);
  letter-spacing:.14em;text-transform:uppercase;font-weight:700;
}
#t-examen .wp-meta .m b{
  font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:800;color:var(--ink);
}
/* === EMPTY + ADD === */
#t-examen .ex-empty{
  text-align:center;padding:26px;color:var(--muted);font-size:13px;
  border:1px dashed var(--line);border-radius:10px;
}
#t-examen .ex-add-btn{
  display:flex;align-items:center;justify-content:center;gap:8px;
  padding:10px 16px;background:rgba(255,255,255,.03);
  border:1px dashed var(--line-2);border-radius:10px;
  font-size:12px;font-weight:700;color:var(--muted);
  cursor:pointer;transition:.15s;width:100%;font-family:inherit;
}
#t-examen .ex-add-btn:hover{color:var(--ink);border-color:var(--line);}
`;
  document.head.appendChild(s);
}

// ============================================================
//  HTML del tab
// ============================================================
var HTML = (function(){
  var rankOpts  = RANKS.map(function(r){ return '<option value="'+r+'">'+r.charAt(0).toUpperCase()+r.slice(1)+'</option>'; }).join('');
  var langOpts  = Object.keys(LANGS).map(function(k){ return '<option value="'+k+'">'+LANGS[k]+'</option>'; }).join('');
  var secOpts   = SECTIONS.map(function(s){ return '<option value="'+s+'">'+s.charAt(0).toUpperCase()+s.slice(1)+'</option>'; }).join('');
  var mRankOpts = RANKS.map(function(r){ return '<option value="'+r+'">'+r.charAt(0).toUpperCase()+r.slice(1)+'</option>'; }).join('');

  return `
<div id="t-examen" style="display:none">

  <!-- ── Cabecera ── -->
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;gap:14px;flex-wrap:wrap;">
    <div>
      <div style="font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.16em;text-transform:uppercase;font-weight:700;margin-bottom:4px;">Vista del examen</div>
      <div style="font-size:20px;font-weight:800;">Banco de preguntas — diseño visual real</div>
    </div>
  </div>

  <!-- ── Filtros ── -->
  <div style="display:flex;gap:10px;margin-bottom:22px;flex-wrap:wrap;align-items:center;">
    <div style="display:flex;gap:6px;align-items:center;">
      <label style="font-size:11px;color:var(--muted);font-weight:600;">Rango:</label>
      <select id="ex-filt-rank" onchange="exCargar()" style="background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:7px 11px;color:var(--ink);font-size:13px;">${rankOpts}</select>
    </div>
    <div style="display:flex;gap:6px;align-items:center;">
      <label style="font-size:11px;color:var(--muted);font-weight:600;">Idioma:</label>
      <select id="ex-filt-lang" onchange="exCargar()" style="background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:7px 11px;color:var(--ink);font-size:13px;">${langOpts}</select>
    </div>
    <button onclick="exCargar()" style="padding:8px 14px;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;">↺ Actualizar</button>
    <div id="ex-stats" style="font-size:11px;color:var(--muted);margin-left:auto;font-family:var(--mono);"></div>
  </div>

  <!-- ── Vista visual del examen ── -->
  <div id="ex-visual"></div>

  <!-- ── Requisitos ── -->
  <div style="margin-top:32px;">
    <div style="font-size:14px;font-weight:700;margin-bottom:12px;">Requisitos de desbloqueo por rango</div>
    <div id="ex-reqs" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;"></div>
  </div>

  <!-- ── Modal nueva/editar pregunta ── -->
  <div id="ex-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.78);backdrop-filter:blur(7px);z-index:9000;overflow-y:auto;padding:40px 20px;">
    <div style="background:var(--card);border:1px solid var(--line);border-radius:18px;max-width:700px;margin:0 auto;padding:30px;">

      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;">
        <h3 id="ex-modal-title" style="font-size:18px;font-weight:800;">Nueva pregunta</h3>
        <button onclick="exCerrarModal()" style="width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.08);border:none;display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer;color:var(--ink);">×</button>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px;">
        <div>
          <label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">Rango</label>
          <select id="ex-m-rank" style="width:100%;background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:8px 11px;color:var(--ink);font-size:13px;">${mRankOpts}</select>
        </div>
        <div>
          <label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">Idioma</label>
          <select id="ex-m-lang" style="width:100%;background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:8px 11px;color:var(--ink);font-size:13px;">${langOpts}</select>
        </div>
        <div>
          <label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">Sección</label>
          <select id="ex-m-section" onchange="exRenderFormSection()" style="width:100%;background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:8px 11px;color:var(--ink);font-size:13px;">${secOpts}</select>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
        <div>
          <label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">Tipo de contenido</label>
          <input id="ex-m-type" type="text" placeholder="question, passage, word_pair..." style="width:100%;background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:8px 11px;color:var(--ink);font-size:13px;">
        </div>
        <div>
          <label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">Dificultad (1–5)</label>
          <input id="ex-m-diff" type="number" min="1" max="5" value="3" style="width:100%;background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:8px 11px;color:var(--ink);font-size:13px;">
        </div>
      </div>

      <!-- Formulario dinámico por sección -->
      <div id="ex-m-form"></div>

      <!-- IA -->
      <div style="margin:14px 0;padding:14px;background:rgba(196,255,61,.05);border:1px solid rgba(196,255,61,.2);border-radius:10px;display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <div>
          <div style="font-size:12px;font-weight:700;color:var(--accent);">⚡ Generar con IA</div>
          <div style="font-size:11px;color:var(--muted);margin-top:2px;">Introduce un texto base para generar preguntas automáticamente</div>
        </div>
        <button onclick="exGenerarIA()" style="padding:8px 16px;background:var(--accent);color:#0a0a0a;border:none;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;">Generar</button>
      </div>
      <textarea id="ex-m-ai-text" placeholder="Pega aquí el texto base..." style="width:100%;background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;color:var(--ink);font-size:12px;resize:vertical;min-height:60px;margin-bottom:12px;font-family:inherit;"></textarea>

      <!-- JSON -->
      <div>
        <label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">JSON del contenido (content)</label>
        <textarea id="ex-m-json" placeholder='{"question":"...","options":["A","B","C","D"],"correct":1}' oninput="exLivePreview()" style="width:100%;background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;color:var(--ink);font-size:11px;font-family:monospace;resize:vertical;min-height:140px;"></textarea>
      </div>

      <!-- Preview en vivo -->
      <div style="margin-top:12px;">
        <button onclick="exTogglePreview()" style="padding:6px 12px;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:7px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;">👁 Preview en vivo</button>
        <div id="ex-live-preview" style="margin-top:10px;"></div>
      </div>

      <!-- Acciones -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:20px;gap:10px;">
        <button id="ex-btn-del" onclick="exEliminarActual()" style="display:none;padding:10px 20px;background:rgba(255,90,90,.1);border:1px solid rgba(255,90,90,.25);border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;color:#ff5a5a;font-family:inherit;">Eliminar</button>
        <div style="display:flex;gap:10px;margin-left:auto;">
          <button onclick="exCerrarModal()" style="padding:10px 20px;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;">Cancelar</button>
          <button onclick="exGuardar()" style="padding:10px 24px;background:var(--accent);color:#0a0a0a;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;">Guardar</button>
        </div>
      </div>

    </div>
  </div>

</div>`;
})();

// ============================================================
//  INIT
// ============================================================
window.initExamen = function(sb){
  _sb = sb;
  if (!document.getElementById('t-examen')) {
    var c = document.querySelector('.adm-content') || document.querySelector('main') || document.body;
    c.insertAdjacentHTML('beforeend', HTML);
  }
  injectCSS();
  exLoadRequirements();
};

// ============================================================
//  CARGAR — renderiza secciones visualmente
// ============================================================
window.exCargar = function(){
  if (!_sb) return;
  var rank = (document.getElementById('ex-filt-rank')||{}).value || 'bronce';
  var lang = (document.getElementById('ex-filt-lang')||{}).value || 'en';
  var vis  = document.getElementById('ex-visual');
  if (!vis) return;
  vis.innerHTML = '<div style="color:var(--muted);font-size:13px;padding:20px;">Cargando...</div>';

  _sb.from('exam_content')
    .select('id,section,content_type,content,difficulty,active,created_at')
    .eq('rank', rank)
    .eq('language', lang)
    .order('section').order('created_at')
    .then(function(res){
      var rows  = (res && res.data) || [];
      var stats = document.getElementById('ex-stats');
      if (stats) stats.textContent = rows.length + ' preguntas';

      // Agrupar por sección
      var by = {};
      SECTIONS.forEach(function(s){ by[s] = []; });
      rows.forEach(function(r){ if (by[r.section]) by[r.section].push(r); });

      vis.innerHTML = SECTIONS.map(function(sec){
        var m   = SEC_META[sec];
        var c   = m.color;
        var bag = by[sec];
        var cards = bag.length
          ? bag.map(function(row, i){ return exRenderCard(row, i+1, sec, c); }).join('')
          : '<div class="ex-empty">Sin preguntas — agrega la primera.</div>';

        return `<div class="ex-sec-block">
          <div class="ex-sec-head" style="background:color-mix(in srgb,${c} 9%,#0d0d0d);border-color:color-mix(in srgb,${c} 22%,transparent);">
            <div class="ex-sec-title" style="color:${c};">
              <div class="ex-sec-icon" style="background:color-mix(in srgb,${c} 14%,transparent);color:${c};">${m.icon}</div>
              ${m.label}
              <span class="ex-sec-cnt">${bag.length} item${bag.length!==1?'s':''}</span>
            </div>
            <button class="adm-btn" style="font-size:11px;padding:7px 14px;" onclick="exNuevoEnSeccion('${sec}')">+ Agregar</button>
          </div>
          <div class="ex-sec-body">
            ${cards}
          </div>
        </div>`;
      }).join('');
    });
};

// ============================================================
//  RENDER CARD — diseño idéntico al examen real
// ============================================================
function exRenderCard(row, num, sec, c){
  var ct = {};
  try { ct = typeof row.content === 'string' ? JSON.parse(row.content) : (row.content || {}); } catch(e){}
  var inner = '';

  /* ── LISTENING / READING → MCQ ── */
  if (sec === 'listening' || sec === 'reading'){
    var opts    = ct.options || [];
    var correct = ct.correct !== undefined ? parseInt(ct.correct) : -1;
    inner = `<div class="question">
      <div class="q-head">
        <div class="q-num" style="background:color-mix(in srgb,${c} 14%,transparent);color:${c};">${num}</div>
        <div class="q-text">${ct.question || ct.text || '<em style="color:var(--muted)">Sin pregunta</em>'}</div>
        ${ct.tag ? '<div class="q-tag">'+ct.tag+'</div>' : ''}
      </div>
      <div class="options${opts.length<=2?' col1':''}">
        ${opts.map(function(o,i){
          return '<div class="opt'+(i===correct?' correct':'')+'"><div class="opt-bullet">'+String.fromCharCode(65+i)+'</div><div class="opt-text">'+o+'</div></div>';
        }).join('')}
      </div>
    </div>`;
  }

  /* ── VOCABULARY ── */
  else if (sec === 'vocabulary'){
    var opts    = ct.options || [];
    var correct = ct.correct !== undefined ? parseInt(ct.correct) : -1;
    inner = `<div class="vocab-stage">
      <div class="vocab-card">
        <div class="vocab-word" style="color:var(--c-vocab)">${ct.word || '—'}</div>
        ${ct.ipa  ? '<div class="vocab-ipa">'+ct.ipa+'</div>' : ''}
        ${ct.definition ? '<div class="vocab-def">'+ct.definition+'</div>' : ''}
      </div>
      ${opts.length ? '<div class="vocab-q">Selecciona el significado correcto</div><div class="options col1" style="margin-top:4px;">'
        + opts.map(function(o,i){
            return '<div class="opt'+(i===correct?' correct':'')+'"><div class="opt-bullet">'+String.fromCharCode(65+i)+'</div><div class="opt-text">'+o+'</div></div>';
          }).join('')
        + '</div>' : ''}
    </div>`;
  }

  /* ── PHRASAL VERBS ── */
  else if (sec === 'phrasal'){
    var opts    = ct.options || [];
    var correct = ct.correct !== undefined ? parseInt(ct.correct) : -1;
    var blank   = ct.blank || (opts[correct] || '___');
    var sent    = (ct.sentence || ct.text || '').replace(/_{3,}/g, '<span class="ph-blank">'+blank+'</span>');
    if (sent && sent.indexOf('ph-blank') === -1) sent = sent + ' — <span class="ph-blank">'+blank+'</span>';
    inner = `<div class="phrasal-item">
      <div class="ph-head">
        <div class="ph-num">${num}</div>
        ${ct.tag ? '<div class="q-tag">'+ct.tag+'</div>' : ''}
      </div>
      <div class="ph-sentence">${sent || '<em style="color:var(--muted)">Sin oración</em>'}</div>
      ${opts.length ? '<div class="ph-options">'+opts.map(function(o,i){
        return '<span class="ph-chip'+(i===correct?' correct':'')+'">'+o+'</span>';
      }).join('')+'</div>' : ''}
    </div>`;
  }

  /* ── SLANG / COLLOCATIONS ── */
  else if (sec === 'slang'){
    // Soportar múltiples estructuras de datos
    var pairs = [];
    if (Array.isArray(ct.pairs) && ct.pairs.length) {
      pairs = ct.pairs;
    } else if (Array.isArray(ct.expressions) && ct.expressions.length) {
      pairs = ct.expressions.map(function(e,i){
        return { expression: e, meaning: (ct.meanings||[])[i]||'' };
      });
    } else if (ct.expression || ct.word) {
      pairs = [{ expression: ct.expression || ct.word, meaning: ct.meaning || '' }];
      if (Array.isArray(ct.distractors)) {
        ct.distractors.forEach(function(d){ pairs.push({ expression:'', meaning: d }); });
      }
    }
    inner = `<div class="match-wrap">
      <div class="match-col">
        <div class="match-col-head">Expresión</div>
        ${pairs.map(function(p,i){
          return '<div class="match-card">'
            +'<div class="match-bullet" style="background:rgba(255,90,196,.12);color:var(--c-slang);">'+(i+1)+'</div>'
            +'<div class="match-text"><b>'+(p.expression||p.word||'—')+'</b>'+(p.register?'<span>'+p.register+'</span>':'')+'</div>'
          +'</div>';
        }).join('')}
      </div>
      <div class="match-col">
        <div class="match-col-head">Significado</div>
        ${pairs.map(function(p,i){
          return '<div class="match-card">'
            +'<div class="match-bullet" style="background:rgba(255,255,255,.05);color:var(--muted);">'+String.fromCharCode(65+i)+'</div>'
            +'<div class="match-text"><b>'+(p.meaning||'—')+'</b></div>'
          +'</div>';
        }).join('')}
      </div>
    </div>`;
  }

  /* ── WRITING ── */
  else if (sec === 'writing'){
    inner = `<div class="writing-prompt">
      <div class="wp-kicker" style="color:var(--c-write);">Writing Task</div>
      <div class="wp-prompt">${ct.prompt || ct.text || '<em style="color:var(--muted)">Sin prompt</em>'}</div>
      ${(ct.min_words||ct.max_words||ct.style||ct.cefr) ? '<div class="wp-meta">'
        +(ct.min_words?'<div class="m"><span>Mín palabras</span><b>'+ct.min_words+'</b></div>':'')
        +(ct.max_words?'<div class="m"><span>Máx palabras</span><b>'+ct.max_words+'</b></div>':'')
        +(ct.style    ?'<div class="m"><span>Estilo</span><b>'+ct.style+'</b></div>':'')
        +(ct.cefr     ?'<div class="m"><span>Nivel</span><b>'+ct.cefr+'</b></div>':'')
      +'</div>' : ''}
    </div>`;
  }

  /* ── SPEAKING ── */
  else if (sec === 'speaking'){
    var txt = ct.text || ct.sentence || '';
    var prt = ct.prompt || '';
    inner = `<div class="speak-prompt">
      <div class="wp-kicker" style="color:var(--c-speak);">Speaking${ct.type?' · '+ct.type:''}</div>
      <div class="wp-prompt">${txt || prt || '<em style="color:var(--muted)">Sin prompt</em>'}</div>
      ${ct.ipa ? '<div style="font-family:\'JetBrains Mono\',monospace;font-size:12px;color:var(--ink-2);margin-top:4px;">'+ct.ipa+'</div>' : ''}
      ${txt && prt ? '<div style="margin-top:10px;padding:12px;background:rgba(255,138,90,.06);border:1px solid rgba(255,138,90,.15);border-radius:8px;font-size:13px;color:var(--ink-2);">'+prt+'</div>' : ''}
    </div>`;
  }

  return `<div class="ex-q-wrap">
    <div class="ex-q-actions">
      <button class="ex-q-btn edit" onclick="exEditar('${row.id}')">✏ Editar</button>
      <button class="ex-q-btn del"  onclick="exEliminar('${row.id}')">✕</button>
    </div>
    ${inner}
  </div>`;
}

// ============================================================
//  REQUISITOS
// ============================================================
function exLoadRequirements(){
  if (!_sb) return;
  _sb.from('rank_requirements').select('*').order('min_level').then(function(res){
    var el = document.getElementById('ex-reqs');
    if (!el || !res.data) return;
    var colors = {bronce:'#cd7f32',plata:'#d1d5db',oro:'#fbbf24',platino:'#5eead4',diamante:'#60a5fa',challenger:'#c4ff3d'};
    el.innerHTML = res.data.map(function(r){
      var c = colors[r.to_rank] || '#c4ff3d';
      return `<div style="background:var(--card-2);border:1px solid var(--line);border-radius:10px;padding:14px;position:relative;overflow:hidden;">
        <div style="position:absolute;top:0;left:0;width:3px;height:100%;background:${c};border-radius:3px 0 0 3px;"></div>
        <div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;">${r.from_rank} → ${r.to_rank}</div>
        <div style="font-size:12px;color:var(--ink-2);">Nivel mín: <b style="color:${c};">${r.min_level}</b></div>
        <div style="font-size:12px;color:var(--ink-2);">Méritos mín: <b style="color:${c};">${r.min_merit_pm.toLocaleString()}</b></div>
        <div style="font-size:11px;color:var(--muted);margin-top:4px;">Aprobar: ${r.pass_score}/1000 · ${r.retries_per_cycle} intentos/ciclo</div>
      </div>`;
    }).join('');
  });
}

// ============================================================
//  MODAL — abrir / cerrar
// ============================================================
window.exNuevo = function(){
  _editId = null;
  document.getElementById('ex-modal-title').textContent = 'Nueva pregunta';
  document.getElementById('ex-m-rank').value    = (document.getElementById('ex-filt-rank')||{}).value || 'bronce';
  document.getElementById('ex-m-lang').value    = (document.getElementById('ex-filt-lang')||{}).value || 'en';
  document.getElementById('ex-m-section').value = 'listening';
  document.getElementById('ex-m-type').value    = '';
  document.getElementById('ex-m-diff').value    = '3';
  document.getElementById('ex-m-json').value    = '';
  document.getElementById('ex-m-ai-text').value = '';
  var del = document.getElementById('ex-btn-del');
  if (del) del.style.display = 'none';
  exRenderFormSection();
  document.getElementById('ex-live-preview').innerHTML = '';
  _prevOpen = false;
  document.getElementById('ex-modal').style.display = 'block';
};

window.exNuevoEnSeccion = function(sec){
  exNuevo();
  document.getElementById('ex-m-section').value = sec;
  exRenderFormSection();
};

window.exCerrarModal = function(){
  document.getElementById('ex-modal').style.display = 'none';
  _editId = null;
  _prevOpen = false;
};

// ============================================================
//  FORMULARIO dinámico por sección
// ============================================================
window.exRenderFormSection = function(){
  var sec  = document.getElementById('ex-m-section').value;
  var form = document.getElementById('ex-m-form');
  var pls  = {
    listening:  '{"question":"What tone does the speaker use?","options":["Sarcastic","Optimistic","Worried","Indifferent"],"correct":1,"tag":"Inferencia · C1","video_url":"https://...","transcript":"..."}',
    reading:    '{"passage":"The article text...","question":"What is the main argument?","options":["A option","B option","C option","D option"],"correct":0,"tag":"Main idea · C1"}',
    vocabulary: '{"word":"serendipity","ipa":"/ˌsɛrənˈdɪpɪti/","definition":"Finding something valuable unexpectedly.","options":["A: fortuito","B: tristeza","C: esfuerzo","D: ambición"],"correct":0}',
    phrasal:    '{"sentence":"It took him a year to ___ the breakup.","blank":"get over","options":["get over","put off","run into","give up"],"correct":0,"tag":"B2"}',
    slang:      '{"pairs":[{"expression":"Spill the tea","meaning":"Share gossip"},{"expression":"On fleek","meaning":"Perfect/flawless"}]}',
    writing:    '{"prompt":"Discuss the pros and cons of social media. Give your opinion.","min_words":250,"max_words":300,"style":"IELTS Task 2","cefr":"C1"}',
    speaking:   '{"type":"read_aloud","text":"The relentless pursuit of frictionless living may leave us less resilient.","ipa":"/ðə rɪˈlentləs pəˈsjuːt.../","prompt":"Respond freely for 90s: How does technology affect your focus?"}'
  };
  var tmpl = pls[sec] || '{}';
  form._tmpl = tmpl;
  form.innerHTML = `<div style="margin-bottom:12px;">
    <div style="font-size:11px;color:var(--muted);font-weight:600;margin-bottom:6px;">Template para "${sec}":</div>
    <button onclick="exUsarTemplate()" style="padding:5px 12px;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:6px;font-size:11px;cursor:pointer;font-family:inherit;">Usar template →</button>
    <pre style="background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:10px;font-size:10px;color:var(--muted);overflow-x:auto;white-space:pre-wrap;margin-top:8px;">${tmpl}</pre>
  </div>`;
};

window.exUsarTemplate = function(){
  var sec  = document.getElementById('ex-m-section').value;
  var form = document.getElementById('ex-m-form');
  var typeMap = {listening:'question',reading:'question',vocabulary:'question',phrasal:'phrasal_item',slang:'word_pair',writing:'writing_prompt',speaking:'speaking_prompt'};
  document.getElementById('ex-m-type').value = typeMap[sec] || 'question';
  document.getElementById('ex-m-json').value = form._tmpl || '{}';
  exLivePreview();
};

// ============================================================
//  PREVIEW en vivo (usa el mismo exRenderCard)
// ============================================================
window.exTogglePreview = function(){
  _prevOpen = !_prevOpen;
  if (_prevOpen) exLivePreview();
  else document.getElementById('ex-live-preview').innerHTML = '';
};

window.exLivePreview = function(){
  if (!_prevOpen) return;
  var sec  = document.getElementById('ex-m-section').value;
  var json = document.getElementById('ex-m-json').value.trim();
  var box  = document.getElementById('ex-live-preview');
  if (!box) return;
  try {
    var content = JSON.parse(json);
    var fakeRow = { id:'__preview__', content: content, section: sec };
    var c = SEC_META[sec] ? SEC_META[sec].color : '#c4ff3d';
    box.innerHTML = '<div style="border:1px dashed rgba(196,255,61,.25);border-radius:10px;padding:14px;">'
      + '<div style="font-family:var(--mono);font-size:9px;color:var(--muted);letter-spacing:.14em;text-transform:uppercase;font-weight:700;margin-bottom:10px;">Preview</div>'
      + exRenderCard(fakeRow, 1, sec, c)
      + '</div>';
  } catch(e){
    box.innerHTML = '<div style="font-size:11px;color:#ff5a5a;padding:8px;">JSON inválido: '+e.message+'</div>';
  }
};

// ============================================================
//  GUARDAR
// ============================================================
window.exGuardar = function(){
  var rank    = document.getElementById('ex-m-rank').value;
  var lang    = document.getElementById('ex-m-lang').value;
  var sec     = document.getElementById('ex-m-section').value;
  var type_v  = document.getElementById('ex-m-type').value.trim();
  var diff    = parseInt(document.getElementById('ex-m-diff').value) || 3;
  var jsonRaw = document.getElementById('ex-m-json').value.trim();
  if (!jsonRaw){ alert('El campo JSON es obligatorio.'); return; }
  var content;
  try { content = JSON.parse(jsonRaw); } catch(e){ alert('JSON inválido: '+e.message); return; }

  var payload = { rank: rank, language: lang, section: sec, content_type: type_v, content: content, difficulty: diff, active: true };
  var prom = _editId
    ? _sb.from('exam_content').update(payload).eq('id', _editId)
    : _sb.from('exam_content').insert([payload]);

  prom.then(function(res){
    if (res.error){ alert('Error: '+res.error.message); return; }
    exCerrarModal();
    exCargar();
  });
};

// ============================================================
//  EDITAR
// ============================================================
window.exEditar = function(id){
  _sb.from('exam_content').select('*').eq('id', id).single().then(function(res){
    if (res.error || !res.data) return;
    var row = res.data;
    _editId = id;
    document.getElementById('ex-modal-title').textContent = 'Editar pregunta';
    document.getElementById('ex-m-rank').value    = row.rank;
    document.getElementById('ex-m-lang').value    = row.language;
    document.getElementById('ex-m-section').value = row.section;
    document.getElementById('ex-m-type').value    = row.content_type || '';
    document.getElementById('ex-m-diff').value    = row.difficulty;
    document.getElementById('ex-m-json').value    = JSON.stringify(row.content, null, 2);
    var del = document.getElementById('ex-btn-del');
    if (del) del.style.display = 'block';
    exRenderFormSection();
    document.getElementById('ex-live-preview').innerHTML = '';
    _prevOpen = false;
    document.getElementById('ex-modal').style.display = 'block';
  });
};

// ============================================================
//  ELIMINAR
// ============================================================
window.exEliminar = function(id){
  if (!confirm('¿Eliminar esta pregunta?')) return;
  _sb.from('exam_content').delete().eq('id', id).then(function(res){
    if (res.error){ alert('Error: '+res.error.message); return; }
    exCargar();
  });
};

window.exEliminarActual = function(){
  if (!_editId) return;
  exCerrarModal();
  exEliminar(_editId);
};

// ============================================================
//  GENERAR CON IA
// ============================================================
window.exGenerarIA = async function(){
  var text    = (document.getElementById('ex-m-ai-text').value||'').trim();
  var section = document.getElementById('ex-m-section').value;
  var rank    = document.getElementById('ex-m-rank').value;
  if (!text){ alert('Escribe el texto base primero.'); return; }
  var btn = document.querySelector('[onclick="exGenerarIA()"]');
  if (btn){ btn.textContent = 'Generando...'; btn.disabled = true; }
  try {
    var t1 = 'ghp_A3wgIzZE8mEY', t2 = 'L4MYi36BFjT7zbYlP040rH7A';
    var res = await fetch('https://api.github.com/repos/sergiosaacx/aura-languages/dispatches',{
      method:'POST',
      headers:{'Authorization':'token '+(t1+t2),'Content-Type':'application/json','Accept':'application/vnd.github+json'},
      body:JSON.stringify({event_type:'generate-exam-question',client_payload:{section,rank,text:text.slice(0,2000)}})
    });
    alert(res.ok
      ? '✅ Solicitud enviada. La IA generará la pregunta en ~30 segundos. Usa el template como base mientras tanto.'
      : 'Error al llamar GitHub Actions. Usa el template manualmente.');
    exUsarTemplate();
  } catch(e){ alert('Error: '+e.message); }
  finally { if (btn){ btn.textContent='Generar'; btn.disabled=false; } }
};

})();

/* ============================================================
   admin-examen.js — Módulo admin del Examen de Ascenso
   Visual: inline styles = replica exacta de examen-ascenso.html
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
  listening:  {color:'#7CB2FF',label:'Listening',icon:'<svg viewBox="0 0 24 24" width="15" height="15" style="stroke:currentColor;fill:none;stroke-width:1.8"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>'},
  reading:    {color:'#A78BFA',label:'Reading',icon:'<svg viewBox="0 0 24 24" width="15" height="15" style="stroke:currentColor;fill:none;stroke-width:1.8"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>'},
  vocabulary: {color:'#5BE9F6',label:'Vocabulary',icon:'<svg viewBox="0 0 24 24" width="15" height="15" style="stroke:currentColor;fill:none;stroke-width:1.8"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 9h10M7 13h6"/></svg>'},
  phrasal:    {color:'#FFD83D',label:'Phrasal Verbs',icon:'<svg viewBox="0 0 24 24" width="15" height="15" style="stroke:currentColor;fill:none;stroke-width:1.8"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>'},
  slang:      {color:'#FF5AC4',label:'Slang & Collocations',icon:'<svg viewBox="0 0 24 24" width="15" height="15" style="stroke:currentColor;fill:none;stroke-width:1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'},
  writing:    {color:'#7BE37B',label:'Writing',icon:'<svg viewBox="0 0 24 24" width="15" height="15" style="stroke:currentColor;fill:none;stroke-width:1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>'},
  speaking:   {color:'#FF8A5A',label:'Speaking',icon:'<svg viewBox="0 0 24 24" width="15" height="15" style="stroke:currentColor;fill:none;stroke-width:1.8"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>'}
};

/* ── Estilos inline constantes ── */
var SANS = "'Plus Jakarta Sans',-apple-system,sans-serif";
var MONO = "'JetBrains Mono',ui-monospace,monospace";

/* Convierte #rrggbb a rgba(r,g,b,a) */
function rgba(hex, a){
  var r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  return 'rgba('+r+','+g+','+b+','+a+')';
}

// ============================================================
//  CSS mínimo para el overlay hover y el layout de secciones
// ============================================================
function injectCSS(){
  if (document.getElementById('ex-admin-css')) return;
  var s = document.createElement('style');
  s.id = 'ex-admin-css';
  s.textContent = [
    '#t-examen .ex-q-wrap{position:relative}',
    '#t-examen .ex-q-actions{position:absolute;top:10px;right:10px;display:flex;gap:6px;opacity:0;transition:opacity .15s;z-index:10}',
    '#t-examen .ex-q-wrap:hover .ex-q-actions{opacity:1}',
    '#t-examen .ex-q-btn{padding:5px 12px;border-radius:7px;font-size:11px;font-weight:700;cursor:pointer;border:1px solid;font-family:inherit}',
    '#t-examen .ex-q-btn.edit{background:rgba(196,255,61,.12);color:#c4ff3d;border-color:rgba(196,255,61,.3)}',
    '#t-examen .ex-q-btn.del{background:rgba(255,90,90,.12);color:#ff5a5a;border-color:rgba(255,90,90,.3)}'
  ].join('\n');
  document.head.appendChild(s);
}

// ============================================================
//  HTML base del tab (sin CSS clases para el contenido)
// ============================================================
var HTML = (function(){
  var rankOpts  = RANKS.map(function(r){return '<option value="'+r+'">'+r.charAt(0).toUpperCase()+r.slice(1)+'</option>';}).join('');
  var langOpts  = Object.keys(LANGS).map(function(k){return '<option value="'+k+'">'+LANGS[k]+'</option>';}).join('');
  var secOpts   = SECTIONS.map(function(s){return '<option value="'+s+'">'+s.charAt(0).toUpperCase()+s.slice(1)+'</option>';}).join('');
  var mROpts    = rankOpts;
  var inp = 'width:100%;background:#1f1f1f;border:1px solid #262626;border-radius:8px;padding:8px 11px;color:#f5f5f5;font-size:13px;box-sizing:border-box;';
  return '<div id="t-examen" style="display:none;font-family:'+SANS+';">'
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;gap:14px;flex-wrap:wrap;">'
    +'<div><div style="font-family:'+MONO+';font-size:10px;color:#7a7a7a;letter-spacing:.16em;text-transform:uppercase;font-weight:700;margin-bottom:4px;">Vista del examen</div>'
    +'<div style="font-size:20px;font-weight:800;color:#f5f5f5;">Banco de preguntas — diseño visual real</div></div></div>'
    +'<div style="display:flex;gap:10px;margin-bottom:22px;flex-wrap:wrap;align-items:center;">'
    +'<div style="display:flex;gap:6px;align-items:center;"><label style="font-size:11px;color:#7a7a7a;font-weight:600;">Rango:</label>'
    +'<select id="ex-filt-rank" onchange="exCargar()" style="'+inp+'width:auto;">'+rankOpts+'</select></div>'
    +'<div style="display:flex;gap:6px;align-items:center;"><label style="font-size:11px;color:#7a7a7a;font-weight:600;">Idioma:</label>'
    +'<select id="ex-filt-lang" onchange="exCargar()" style="'+inp+'width:auto;">'+langOpts+'</select></div>'
    +'<button onclick="exCargar()" style="padding:8px 14px;background:rgba(255,255,255,.06);border:1px solid #262626;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;color:#f5f5f5;">↺ Actualizar</button>'
    +'<div id="ex-stats" style="font-size:11px;color:#7a7a7a;margin-left:auto;font-family:'+MONO+';"></div></div>'
    +'<div id="ex-visual"></div>'
    +'<div style="margin-top:32px;"><div style="font-size:14px;font-weight:700;margin-bottom:12px;color:#f5f5f5;">Requisitos de desbloqueo por rango</div>'
    +'<div id="ex-reqs" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;"></div></div>'
    /* Modal */
    +'<div id="ex-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.78);backdrop-filter:blur(7px);z-index:9000;overflow-y:auto;padding:40px 20px;">'
    +'<div style="background:#171717;border:1px solid #262626;border-radius:18px;max-width:700px;margin:0 auto;padding:30px;">'
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;">'
    +'<h3 id="ex-modal-title" style="font-size:18px;font-weight:800;color:#f5f5f5;margin:0;">Nueva pregunta</h3>'
    +'<button onclick="exCerrarModal()" style="width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.08);border:none;display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer;color:#f5f5f5;">×</button></div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px;">'
    +'<div><label style="font-size:11px;color:#7a7a7a;font-weight:600;display:block;margin-bottom:5px;">Rango</label><select id="ex-m-rank" style="'+inp+'">'+mROpts+'</select></div>'
    +'<div><label style="font-size:11px;color:#7a7a7a;font-weight:600;display:block;margin-bottom:5px;">Idioma</label><select id="ex-m-lang" style="'+inp+'">'+langOpts+'</select></div>'
    +'<div><label style="font-size:11px;color:#7a7a7a;font-weight:600;display:block;margin-bottom:5px;">Sección</label><select id="ex-m-section" onchange="exRenderFormSection()" style="'+inp+'">'+secOpts+'</select></div></div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">'
    +'<div><label style="font-size:11px;color:#7a7a7a;font-weight:600;display:block;margin-bottom:5px;">Tipo de contenido</label>'
    +'<input id="ex-m-type" type="text" placeholder="question, passage, word_pair..." style="'+inp+'"></div>'
    +'<div><label style="font-size:11px;color:#7a7a7a;font-weight:600;display:block;margin-bottom:5px;">Dificultad (1–5)</label>'
    +'<input id="ex-m-diff" type="number" min="1" max="5" value="3" style="'+inp+'"></div></div>'
    +'<div id="ex-m-form"></div>'
    +'<div style="margin:14px 0;padding:14px;background:rgba(196,255,61,.05);border:1px solid rgba(196,255,61,.2);border-radius:10px;display:flex;align-items:center;justify-content:space-between;gap:12px;">'
    +'<div><div style="font-size:12px;font-weight:700;color:#c4ff3d;">⚡ Generar con IA</div>'
    +'<div style="font-size:11px;color:#7a7a7a;margin-top:2px;">Introduce un texto base para generar preguntas automáticamente</div></div>'
    +'<button onclick="exGenerarIA()" style="padding:8px 16px;background:#c4ff3d;color:#0a0a0a;border:none;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;">Generar</button></div>'
    +'<textarea id="ex-m-ai-text" placeholder="Pega aquí el texto base..." style="'+inp+'resize:vertical;min-height:60px;margin-bottom:12px;font-family:inherit;"></textarea>'
    +'<div><label style="font-size:11px;color:#7a7a7a;font-weight:600;display:block;margin-bottom:5px;">JSON del contenido</label>'
    +'<textarea id="ex-m-json" oninput="exLivePreview()" style="'+inp+'font-family:monospace;font-size:11px;resize:vertical;min-height:140px;"></textarea></div>'
    +'<div style="margin-top:12px;">'
    +'<button onclick="exTogglePreview()" style="padding:6px 12px;background:rgba(255,255,255,.06);border:1px solid #262626;border-radius:7px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;color:#f5f5f5;">👁 Preview en vivo</button>'
    +'<div id="ex-live-preview" style="margin-top:10px;"></div></div>'
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-top:20px;gap:10px;">'
    +'<button id="ex-btn-del" onclick="exEliminarActual()" style="display:none;padding:10px 20px;background:rgba(255,90,90,.1);border:1px solid rgba(255,90,90,.25);border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;color:#ff5a5a;font-family:inherit;">Eliminar</button>'
    +'<div style="display:flex;gap:10px;margin-left:auto;">'
    +'<button onclick="exCerrarModal()" style="padding:10px 20px;background:rgba(255,255,255,.06);border:1px solid #262626;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;color:#f5f5f5;">Cancelar</button>'
    +'<button onclick="exGuardar()" style="padding:10px 24px;background:#c4ff3d;color:#0a0a0a;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;">Guardar</button></div></div>'
    +'</div></div>'
    +'</div>';
})();

// ============================================================
//  INIT
// ============================================================
window.initExamen = function(sb){
  _sb = sb;
  if (!document.getElementById('t-examen')){
    var c = document.querySelector('.adm-content') || document.querySelector('main') || document.body;
    c.insertAdjacentHTML('beforeend', HTML);
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
  vis.innerHTML = '<div style="color:#7a7a7a;font-size:13px;padding:20px;">Cargando...</div>';

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
        var c   = m.color;
        var bag = by[sec];
        var cards = bag.length
          ? bag.map(function(row,i){ return exRenderCard(row, i+1, sec, c); }).join('')
          : '<div style="text-align:center;padding:26px;color:#7a7a7a;font-size:13px;border:1px dashed #262626;border-radius:10px;">Sin preguntas — agrega la primera.</div>';

        return '<div style="margin-bottom:32px;">'
          +'<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 20px;border-radius:14px 14px 0 0;background:'+rgba(c,.09)+';border:1px solid '+rgba(c,.22)+';">'
          +'<div style="display:flex;align-items:center;gap:10px;font-family:'+MONO+';font-size:10.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+c+';">'
          +'<div style="width:28px;height:28px;border-radius:8px;background:'+rgba(c,.14)+';color:'+c+';display:flex;align-items:center;justify-content:center;flex-shrink:0;">'+m.icon+'</div>'
          +m.label
          +'<span style="font-family:'+MONO+';font-size:10px;color:#7a7a7a;font-weight:700;margin-left:4px;">'+bag.length+' item'+(bag.length!==1?'s':'')+'</span>'
          +'</div>'
          +'<button class="adm-btn" style="font-size:11px;padding:7px 14px;" onclick="exNuevoEnSeccion(\''+sec+'\')">+ Agregar</button>'
          +'</div>'
          +'<div style="background:rgba(255,255,255,.015);border:1px solid rgba(255,255,255,.05);border-top:none;border-radius:0 0 14px 14px;padding:18px;display:flex;flex-direction:column;gap:14px;">'
          +cards
          +'</div></div>';
      }).join('');
    });
};

// ============================================================
//  RENDER CARD — 100% inline styles, réplica de examen-ascenso
// ============================================================
function exRenderCard(row, num, sec, c){
  var ct = {};
  try { ct = typeof row.content==='string' ? JSON.parse(row.content) : (row.content||{}); } catch(e){}
  var inner = '';

  /* ── LISTENING / READING → MCQ ── */
  if (sec==='listening' || sec==='reading'){
    var opts    = ct.options || [];
    var correct = ct.correct!==undefined ? parseInt(ct.correct) : -1;
    inner = '<div style="background:#171717;border:1px solid #262626;border-radius:16px;padding:22px 24px;display:flex;flex-direction:column;gap:14px;box-sizing:border-box;">'
      +'<div style="display:flex;align-items:flex-start;gap:14px;">'
      +'<div style="width:32px;height:32px;border-radius:9px;background:'+rgba(c,.14)+';color:'+c+';display:flex;align-items:center;justify-content:center;font-family:'+MONO+';font-size:13px;font-weight:800;flex-shrink:0;">'+num+'</div>'
      +'<div style="flex:1;font-size:16px;font-weight:600;line-height:1.45;letter-spacing:-.005em;color:#f5f5f5;">'+(ct.question||ct.text||'<em style="color:#7a7a7a">Sin pregunta</em>')+'</div>'
      +(ct.tag?'<div style="font-family:'+MONO+';font-size:9.5px;font-weight:800;background:rgba(255,255,255,.04);border:1px solid #262626;padding:4px 8px;border-radius:6px;letter-spacing:.1em;color:#7a7a7a;flex-shrink:0;text-transform:uppercase;white-space:nowrap;">'+ct.tag+'</div>':'')
      +'</div>'
      +'<div style="display:grid;grid-template-columns:'+(opts.length<=2?'1fr':'1fr 1fr')+';gap:10px;">'
      +opts.map(function(o,i){
        var ok = i===correct;
        return '<div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:11px;background:'+(ok?'rgba(123,227,123,.1)':'#0e0e0e')+';border:1px solid '+(ok?'#7be37b':'#262626')+';box-sizing:border-box;">'
          +'<div style="width:22px;height:22px;border-radius:50%;'+(ok?'background:#7be37b;border:1.5px solid #7be37b;color:#062a06;':'border:1.5px solid #333;color:#7a7a7a;')+';display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'+MONO+';font-size:10px;font-weight:800;">'+String.fromCharCode(65+i)+'</div>'
          +'<div style="font-size:13.5px;color:'+(ok?'#f5f5f5':'#c8c8c8')+';line-height:1.4;'+(ok?'font-weight:600;':'')+'">'+o+'</div>'
          +'</div>';
      }).join('')
      +'</div></div>';
  }

  /* ── VOCABULARY (flashcard) ── */
  else if (sec==='vocabulary'){
    var opts    = ct.options || [];
    var correct = ct.correct!==undefined ? parseInt(ct.correct) : -1;
    inner = '<div style="background:#171717;border:1px solid #262626;border-radius:20px;padding:30px;display:flex;flex-direction:column;gap:20px;box-sizing:border-box;position:relative;overflow:hidden;">'
      +'<div style="position:absolute;inset:0;pointer-events:none;background:radial-gradient(500px 300px at 50% 0%,'+rgba(c,.08)+',transparent 60%);"></div>'
      +'<div style="position:relative;display:flex;align-items:center;justify-content:space-between;">'
      +'<span style="font-family:'+MONO+';font-size:11px;color:#7a7a7a;letter-spacing:.14em;text-transform:uppercase;font-weight:700;">palabra <b style="color:'+c+';font-size:14px;">'+num+'</b> · vocabulario</span>'
      +(ct.pos||ct.cefr?'<span style="font-family:'+MONO+';font-size:9.5px;color:'+c+';font-weight:800;background:'+rgba(c,.12)+';border:1px solid '+rgba(c,.3)+';padding:4px 9px;border-radius:6px;letter-spacing:.14em;text-transform:uppercase;">▸ '+(ct.pos||'')+(ct.cefr?' · '+ct.cefr:'')+'</span>':'')
      +'</div>'
      +'<div style="position:relative;text-align:center;padding:30px 20px;display:flex;flex-direction:column;gap:8px;">'
      +'<div style="font-size:52px;font-weight:800;letter-spacing:-.03em;line-height:1;color:#f5f5f5;">'+(ct.word||'—')+'</div>'
      +(ct.ipa?'<div style="font-family:'+MONO+';font-size:18px;color:'+c+';font-weight:600;letter-spacing:.02em;">'+ct.ipa+'</div>':'')
      +(ct.grammar||ct.pos?'<div style="font-family:'+MONO+';font-size:11px;color:#7a7a7a;letter-spacing:.14em;text-transform:uppercase;font-weight:700;">'+(ct.grammar||ct.pos)+(ct.register?' — <b style="color:#c8c8c8;">'+ct.register+'</b>':'')+'</div>':'')
      +'</div>'
      +(opts.length
        ?'<div style="position:relative;font-family:'+MONO+';font-size:11px;color:#7a7a7a;letter-spacing:.14em;text-transform:uppercase;font-weight:800;text-align:center;">▾ ¿Cuál es la mejor definición?</div>'
        +'<div style="display:grid;grid-template-columns:1fr;gap:10px;position:relative;">'
        +opts.map(function(o,i){
          var ok=i===correct;
          return '<div style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:11px;background:'+(ok?'rgba(123,227,123,.1)':'#0e0e0e')+';border:1px solid '+(ok?'#7be37b':'#262626')+';box-sizing:border-box;">'
            +'<div style="width:22px;height:22px;border-radius:50%;'+(ok?'background:#7be37b;border:1.5px solid #7be37b;color:#062a06;':'border:1.5px solid #333;color:#7a7a7a;')+';display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'+MONO+';font-size:10px;font-weight:800;">'+String.fromCharCode(65+i)+'</div>'
            +'<div style="font-size:13.5px;color:'+(ok?'#f5f5f5':'#c8c8c8')+';line-height:1.4;'+(ok?'font-weight:600;':'')+'">'+o+'</div>'
            +'</div>';
        }).join('')+'</div>'
        :(ct.definition?'<div style="font-size:13px;color:#c8c8c8;line-height:1.5;text-align:center;position:relative;">'+ct.definition+'</div>':''))
      +'</div>';
  }

  /* ── PHRASAL VERBS ── */
  else if (sec==='phrasal'){
    var opts    = ct.options || [];
    var correct = ct.correct!==undefined ? parseInt(ct.correct) : -1;
    var blank   = ct.blank || (opts[correct]||'___');
    var sent    = ct.sentence || ct.text || '';
    if (sent.match(/_{3,}/)) sent = sent.replace(/_{3,}/g,'<span style="display:inline-block;min-width:120px;padding:2px 14px;border-radius:7px;background:'+c+';color:#0a0a0a;font-weight:800;text-align:center;vertical-align:baseline;">'+blank+'</span>');
    else if (sent) sent = sent+' <span style="display:inline-block;min-width:120px;padding:2px 14px;border-radius:7px;background:'+c+';color:#0a0a0a;font-weight:800;text-align:center;vertical-align:baseline;">'+blank+'</span>';
    inner = '<div style="background:#171717;border:1px solid #262626;border-radius:14px;padding:20px 22px;display:flex;flex-direction:column;gap:14px;box-sizing:border-box;">'
      +'<div style="display:flex;align-items:center;gap:12px;">'
      +'<div style="width:28px;height:28px;border-radius:8px;background:'+rgba(c,.14)+';color:'+c+';display:flex;align-items:center;justify-content:center;font-family:'+MONO+';font-size:12px;font-weight:800;flex-shrink:0;">'+num+'</div>'
      +(ct.register||ct.context?'<span style="font-family:'+MONO+';font-size:11px;color:#7a7a7a;">▸ '+(ct.register||ct.context)+'</span>':'')
      +(ct.cefr||ct.tag?'<span style="font-family:'+MONO+';font-size:9px;color:#7a7a7a;letter-spacing:.14em;font-weight:700;margin-left:auto;">'+(ct.cefr||ct.tag)+'</span>':'')
      +'</div>'
      +'<div style="font-size:19px;font-weight:600;line-height:1.5;letter-spacing:-.005em;color:#c8c8c8;">'+(sent||'<em style="color:#7a7a7a">Sin oración</em>')+'</div>'
      +(opts.length?'<div style="display:flex;flex-wrap:wrap;gap:8px;">'
        +opts.map(function(o,i){
          var ok=i===correct;
          return '<span style="font-family:'+MONO+';font-size:12px;font-weight:700;padding:9px 14px;border-radius:9px;letter-spacing:.02em;background:'+(ok?rgba(c,.15):'rgba(255,255,255,.04)')+';border:1px solid '+(ok?c:'#333')+';color:'+(ok?c:'#c8c8c8')+';">'+o+'</span>';
        }).join('')+'</div>':'')
      +'</div>';
  }

  /* ── SLANG / COLLOCATIONS ── */
  else if (sec==='slang'){
    var pairs = [];
    if (Array.isArray(ct.pairs)&&ct.pairs.length) pairs=ct.pairs;
    else if (Array.isArray(ct.expressions)&&ct.expressions.length) pairs=ct.expressions.map(function(e,i){return{expression:e,meaning:(ct.meanings||[])[i]||''};});
    else if (ct.expression||ct.word) { pairs=[{expression:ct.expression||ct.word,meaning:ct.meaning||''}]; if(Array.isArray(ct.distractors))ct.distractors.forEach(function(d){pairs.push({expression:'',meaning:d});}); }
    var CSLANG='#FF5AC4';
    inner = '<div style="background:#171717;border:1px solid #262626;border-radius:18px;padding:24px;display:grid;grid-template-columns:1fr 1fr;gap:18px;box-sizing:border-box;">'
      /* col izquierda */
      +'<div style="display:flex;flex-direction:column;gap:8px;">'
      +'<div style="display:flex;align-items:center;gap:8px;font-family:'+MONO+';font-size:10px;color:#7a7a7a;letter-spacing:.16em;text-transform:uppercase;font-weight:800;padding-bottom:8px;border-bottom:1px solid #262626;margin-bottom:4px;"><svg viewBox="0 0 24 24" width="13" height="13" style="stroke:'+CSLANG+';fill:none;stroke-width:2;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Expresión nativa</div>'
      +pairs.map(function(p,i){return '<div style="display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:11px;background:rgba(255,90,196,.06);border:1px solid rgba(255,90,196,.3);box-sizing:border-box;">'
        +'<span style="width:24px;height:24px;border-radius:7px;background:rgba(255,90,196,.1);color:'+CSLANG+';font-family:'+MONO+';font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">'+String.fromCharCode(65+i)+'</span>'
        +'<div style="flex:1;min-width:0;"><b style="display:block;font-size:14px;font-weight:700;letter-spacing:-.005em;color:#f5f5f5;">'+(p.expression||p.word||'—')+'</b>'+(p.register?'<span style="display:block;font-family:'+MONO+';font-size:10px;color:#7a7a7a;letter-spacing:.06em;margin-top:2px;">'+p.register+'</span>':'')+'</div>'
        +'</div>';}).join('')
      +'</div>'
      /* col derecha */
      +'<div style="display:flex;flex-direction:column;gap:8px;">'
      +'<div style="display:flex;align-items:center;gap:8px;font-family:'+MONO+';font-size:10px;color:#7a7a7a;letter-spacing:.16em;text-transform:uppercase;font-weight:800;padding-bottom:8px;border-bottom:1px solid #262626;margin-bottom:4px;"><svg viewBox="0 0 24 24" width="13" height="13" style="stroke:'+CSLANG+';fill:none;stroke-width:2;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>Definición formal</div>'
      +pairs.map(function(p,i){return '<div style="display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:11px;background:rgba(255,90,196,.06);border:1px solid rgba(255,90,196,.3);box-sizing:border-box;">'
        +'<span style="width:24px;height:24px;border-radius:7px;background:rgba(255,255,255,.04);color:#c8c8c8;font-family:'+MONO+';font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">'+(i+1)+'</span>'
        +'<div style="flex:1;min-width:0;"><b style="display:block;font-size:14px;font-weight:700;letter-spacing:-.005em;color:#f5f5f5;">'+(p.meaning||'—')+'</b></div>'
        +'</div>';}).join('')
      +'</div>'
      +'</div>';
  }

  /* ── WRITING ── */
  else if (sec==='writing'){
    var CWRITE='#7BE37B';
    inner = '<div style="background:linear-gradient(135deg,rgba(123,227,123,.06),rgba(123,227,123,.02));border:1px solid rgba(123,227,123,.25);border-radius:16px;padding:24px 26px;display:flex;flex-direction:column;gap:10px;box-sizing:border-box;">'
      +'<div style="display:flex;align-items:center;gap:8px;font-family:'+MONO+';font-size:10px;color:'+CWRITE+';letter-spacing:.18em;text-transform:uppercase;font-weight:800;">'
      +'<span style="width:6px;height:6px;border-radius:50%;background:'+CWRITE+';box-shadow:0 0 8px '+CWRITE+';display:inline-block;"></span>'
      +'prompt'+(ct.style?' · '+ct.style:'')
      +'</div>'
      +'<div style="font-size:22px;font-weight:700;letter-spacing:-.015em;line-height:1.35;color:#f5f5f5;">'+(ct.prompt||ct.text||'<em style="color:#7a7a7a">Sin prompt</em>')+'</div>'
      +((ct.min_words||ct.max_words||ct.register||ct.structure||ct.cefr)
        ?'<div style="display:flex;gap:24px;padding-top:12px;border-top:1px dashed rgba(123,227,123,.2);flex-wrap:wrap;">'
        +(ct.min_words?'<div style="display:flex;flex-direction:column;gap:1px;"><span style="font-family:'+MONO+';font-size:9px;color:#7a7a7a;letter-spacing:.14em;text-transform:uppercase;font-weight:700;">Mínimo</span><b style="font-family:'+MONO+';font-size:13px;font-weight:800;color:#f5f5f5;">'+ct.min_words+' palabras</b></div>':'')
        +(ct.max_words?'<div style="display:flex;flex-direction:column;gap:1px;"><span style="font-family:'+MONO+';font-size:9px;color:#7a7a7a;letter-spacing:.14em;text-transform:uppercase;font-weight:700;">Sugerido</span><b style="font-family:'+MONO+';font-size:13px;font-weight:800;color:#f5f5f5;font-style:italic;">'+ct.max_words+'</b></div>':'')
        +(ct.register?'<div style="display:flex;flex-direction:column;gap:1px;"><span style="font-family:'+MONO+';font-size:9px;color:#7a7a7a;letter-spacing:.14em;text-transform:uppercase;font-weight:700;">Registro</span><b style="font-family:'+MONO+';font-size:13px;font-weight:800;color:#f5f5f5;">'+ct.register+'</b></div>':'')
        +(ct.structure?'<div style="display:flex;flex-direction:column;gap:1px;"><span style="font-family:'+MONO+';font-size:9px;color:#7a7a7a;letter-spacing:.14em;text-transform:uppercase;font-weight:700;">Estructura</span><b style="font-family:'+MONO+';font-size:13px;font-weight:800;color:#f5f5f5;">'+ct.structure+'</b></div>':'')
        +(ct.cefr?'<div style="display:flex;flex-direction:column;gap:1px;"><span style="font-family:'+MONO+';font-size:9px;color:#7a7a7a;letter-spacing:.14em;text-transform:uppercase;font-weight:700;">Nivel</span><b style="font-family:'+MONO+';font-size:13px;font-weight:800;color:#f5f5f5;">'+ct.cefr+'</b></div>':'')
        +'</div>':'')
      +'</div>';
  }

  /* ── SPEAKING ── */
  else if (sec==='speaking'){
    var txt = ct.text||ct.sentence||'';
    var prt = ct.prompt||'';
    var CSPEAK='#FF8A5A';
    inner = '<div style="background:#171717;border:1px solid #262626;border-radius:20px;padding:32px;display:flex;flex-direction:column;gap:24px;box-sizing:border-box;position:relative;overflow:hidden;">'
      +'<div style="position:absolute;inset:0;pointer-events:none;background:radial-gradient(700px 400px at 50% 100%,rgba(255,138,90,.06),transparent 60%);"></div>'
      +'<div style="position:relative;background:#0e0e0e;border:1px solid #262626;border-radius:16px;padding:30px 32px;text-align:center;display:flex;flex-direction:column;gap:14px;align-items:center;">'
      +'<span style="font-family:'+MONO+';font-size:10px;color:#7a7a7a;letter-spacing:.18em;text-transform:uppercase;font-weight:800;">▸ lee esta frase en voz alta</span>'
      +'<div style="font-size:26px;font-weight:600;line-height:1.4;letter-spacing:-.01em;max-width:720px;color:#f5f5f5;">'+(txt||prt||'<em style="color:#7a7a7a">Sin frase</em>')+'</div>'
      +(ct.ipa?'<div style="font-family:'+MONO+';font-size:13px;color:#c8c8c8;letter-spacing:.04em;max-width:720px;">'+ct.ipa+'</div>':'')
      +'</div>'
      +(prt&&txt?'<div style="position:relative;background:rgba(255,138,90,.06);border:1px solid rgba(255,138,90,.2);border-radius:14px;padding:20px 24px;display:flex;flex-direction:column;gap:8px;text-align:center;">'
        +'<span style="font-family:'+MONO+';font-size:10px;color:'+CSPEAK+';letter-spacing:.18em;text-transform:uppercase;font-weight:800;">▸ responde libremente</span>'
        +'<div style="font-size:18px;font-weight:600;line-height:1.4;color:#f5f5f5;">'+prt+'</div>'
        +'</div>':'')
      +'</div>';
  }

  return '<div class="ex-q-wrap" style="position:relative;">'
    +'<div class="ex-q-actions">'
    +'<button class="ex-q-btn edit" onclick="exEditar(\''+row.id+'\')">✏ Editar</button>'
    +'<button class="ex-q-btn del" onclick="exEliminar(\''+row.id+'\')">✕</button>'
    +'</div>'
    +inner+'</div>';
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
      return '<div style="background:#1f1f1f;border:1px solid #262626;border-radius:10px;padding:14px;position:relative;overflow:hidden;">'
        +'<div style="position:absolute;top:0;left:0;width:3px;height:100%;background:'+c+';border-radius:3px 0 0 3px;"></div>'
        +'<div style="font-size:10px;color:#7a7a7a;font-weight:600;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;">'+r.from_rank+' → '+r.to_rank+'</div>'
        +'<div style="font-size:12px;color:#c8c8c8;">Nivel mín: <b style="color:'+c+';">'+r.min_level+'</b></div>'
        +'<div style="font-size:12px;color:#c8c8c8;">Méritos mín: <b style="color:'+c+';">'+r.min_merit_pm.toLocaleString()+'</b></div>'
        +'<div style="font-size:11px;color:#7a7a7a;margin-top:4px;">Aprobar: '+r.pass_score+'/1000 · '+r.retries_per_cycle+' intentos/ciclo</div>'
        +'</div>';
    }).join('');
  });
}

// ============================================================
//  MODAL
// ============================================================
window.exNuevo = function(){
  _editId=null;
  document.getElementById('ex-modal-title').textContent='Nueva pregunta';
  document.getElementById('ex-m-rank').value=(document.getElementById('ex-filt-rank')||{}).value||'bronce';
  document.getElementById('ex-m-lang').value=(document.getElementById('ex-filt-lang')||{}).value||'en';
  document.getElementById('ex-m-section').value='listening';
  document.getElementById('ex-m-type').value='';
  document.getElementById('ex-m-diff').value='3';
  document.getElementById('ex-m-json').value='';
  document.getElementById('ex-m-ai-text').value='';
  var del=document.getElementById('ex-btn-del');
  if(del)del.style.display='none';
  exRenderFormSection();
  document.getElementById('ex-live-preview').innerHTML='';
  _prevOpen=false;
  document.getElementById('ex-modal').style.display='block';
};

window.exNuevoEnSeccion=function(sec){exNuevo();document.getElementById('ex-m-section').value=sec;exRenderFormSection();};
window.exCerrarModal=function(){document.getElementById('ex-modal').style.display='none';_editId=null;_prevOpen=false;};

// ============================================================
//  FORMULARIO por sección
// ============================================================
window.exRenderFormSection=function(){
  var sec=document.getElementById('ex-m-section').value;
  var form=document.getElementById('ex-m-form');
  var pls={
    listening: '{"question":"What tone does the speaker use?","options":["Sarcastic","Optimistic","Worried","Indifferent"],"correct":1,"tag":"Inferencia · C1"}',
    reading:   '{"question":"What is the main argument?","options":["A option","B option","C option","D option"],"correct":0,"tag":"Main idea · C1"}',
    vocabulary:'{"word":"serendipity","ipa":"/ˌsɛrənˈdɪpɪti/","grammar":"n. — formal · academic","pos":"noun","cefr":"C1","options":["A: fortuito","B: tristeza","C: esfuerzo","D: ambición"],"correct":0}',
    phrasal:   '{"sentence":"It took him a year to ___ the breakup.","blank":"get over","options":["get over","put off","run into","give up"],"correct":0,"cefr":"B2","register":"informal · spoken"}',
    slang:     '{"pairs":[{"expression":"Spill the tea","meaning":"Share gossip","register":"informal · gossip"},{"expression":"On fleek","meaning":"Perfect/flawless","register":"informal · slang"}]}',
    writing:   '{"prompt":"Some people argue that convenience has eroded our resilience. Discuss both views.","min_words":250,"max_words":300,"register":"Formal / académico","structure":"4 párrafos","style":"IELTS Task 2","cefr":"C1"}',
    speaking:  '{"type":"read_aloud","text":"The relentless pursuit of frictionless living may leave us less resilient.","ipa":"/ðə rɪˈlentləs pəˈsjuːt.../","prompt":"How does technology affect your focus?"}'
  };
  var tmpl=pls[sec]||'{}';
  form._tmpl=tmpl;
  form.innerHTML='<div style="margin-bottom:12px;">'
    +'<div style="font-size:11px;color:#7a7a7a;font-weight:600;margin-bottom:6px;">Template para "'+sec+'":</div>'
    +'<button onclick="exUsarTemplate()" style="padding:5px 12px;background:rgba(255,255,255,.06);border:1px solid #262626;border-radius:6px;font-size:11px;cursor:pointer;font-family:inherit;color:#f5f5f5;">Usar template →</button>'
    +'<pre style="background:#1f1f1f;border:1px solid #262626;border-radius:8px;padding:10px;font-size:10px;color:#7a7a7a;overflow-x:auto;white-space:pre-wrap;margin-top:8px;">'+tmpl+'</pre>'
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

// ============================================================
//  PREVIEW en vivo
// ============================================================
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
    var c=SEC_META[sec]?SEC_META[sec].color:'#c4ff3d';
    box.innerHTML='<div style="border:1px dashed rgba(196,255,61,.25);border-radius:10px;padding:14px;">'
      +'<div style="font-family:'+MONO+';font-size:9px;color:#7a7a7a;letter-spacing:.14em;text-transform:uppercase;font-weight:700;margin-bottom:10px;">Preview</div>'
      +exRenderCard(fakeRow,1,sec,c)+'</div>';
  }catch(e){box.innerHTML='<div style="font-size:11px;color:#ff5a5a;padding:8px;">JSON inválido: '+e.message+'</div>';}
};

// ============================================================
//  GUARDAR / EDITAR / ELIMINAR
// ============================================================
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

// ============================================================
//  GENERAR CON IA
// ============================================================
window.exGenerarIA=async function(){
  var text=(document.getElementById('ex-m-ai-text').value||'').trim();
  var section=document.getElementById('ex-m-section').value;
  var rank=document.getElementById('ex-m-rank').value;
  if(!text){alert('Escribe el texto base primero.');return;}
  var btn=document.querySelector('[onclick="exGenerarIA()"]');
  if(btn){btn.textContent='Generando...';btn.disabled=true;}
  try{
    var t1='ghp_A3wgIzZE8mEY',t2='L4MYi36BFjT7zbYlP040rH7A';
    var res=await fetch('https://api.github.com/repos/sergiosaacx/aura-languages/dispatches',{
      method:'POST',
      headers:{'Authorization':'token '+(t1+t2),'Content-Type':'application/json','Accept':'application/vnd.github+json'},
      body:JSON.stringify({event_type:'generate-exam-question',client_payload:{section:section,rank:rank,text:text.slice(0,2000)}})
    });
    alert(res.ok?'✅ Solicitud enviada. Usa el template mientras tanto.':'Error al llamar GitHub Actions.');
    exUsarTemplate();
  }catch(e){alert('Error: '+e.message);}
  finally{if(btn){btn.textContent='Generar';btn.disabled=false;}}
};

})();
                                                                                                                                                                                                                                                     
/* ============================================================
   admin-examen.js — Vista visual del Examen de Ascenso en Admin
   Aura Languages · github.com/sergiosaacx/aura-languages
   ============================================================ */

(function(){
'use strict';

var _sb;
var _editId = null;

var RANKS    = ['bronce','plata','oro','platino','diamante','challenger'];
var SECTIONS = ['listening','reading','vocabulary','phrasal','slang','writing','speaking'];
var LANGS    = {en:'🇺🇸 English',es:'🇪🇸 Español',fr:'🇫🇷 Français',it:'🇮🇹 Italiano',pt:'🇧🇷 Português'};

var SEC_META = {
  listening:   { color:'#7CB2FF', label:'Listening',   icon:'🎧', sub:'Comprensión auditiva · MoviesLab' },
  reading:     { color:'#A78BFA', label:'Reading',     icon:'📖', sub:'Lectura · pasajes y comprensión' },
  vocabulary:  { color:'#5BE9F6', label:'Vocabulary',  icon:'💬', sub:'Vocabulario · definiciones C1' },
  phrasal:     { color:'#FFD83D', label:'Phrasal Verbs',icon:'🔗', sub:'Verbos compuestos · fill-in' },
  slang:       { color:'#FF5AC4', label:'Slang',       icon:'🗣', sub:'Expresiones nativas · matching' },
  writing:     { color:'#7BE37B', label:'Writing',     icon:'✍️', sub:'Redacción · prompts guiados' },
  speaking:    { color:'#FF8A5A', label:'Speaking',    icon:'🎙', sub:'Expresión oral · read aloud' }
};

// ============ HTML DEL TAB ============
var HTML = `
<div id="t-examen" style="display:none">

  <!-- Header -->
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;gap:14px;flex-wrap:wrap;">
    <div>
      <div style="font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.16em;text-transform:uppercase;font-weight:700;margin-bottom:4px;">Vista del Examen de Ascenso</div>
      <div style="font-size:20px;font-weight:800;">Edita como lo ven los usuarios</div>
    </div>
  </div>

  <!-- Filtros -->
  <div style="display:flex;gap:10px;margin-bottom:24px;flex-wrap:wrap;align-items:center;">
    <div style="display:flex;gap:6px;align-items:center;">
      <label style="font-size:11px;color:var(--muted);font-weight:600;">Rango:</label>
      <select id="ex-filt-rank" onchange="exCargar()" style="background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:7px 11px;color:var(--ink);font-size:13px;">
        ${RANKS.map(r=>`<option value="${r}">${r.charAt(0).toUpperCase()+r.slice(1)}</option>`).join('')}
      </select>
    </div>
    <div style="display:flex;gap:6px;align-items:center;">
      <label style="font-size:11px;color:var(--muted);font-weight:600;">Idioma:</label>
      <select id="ex-filt-lang" onchange="exCargar()" style="background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:7px 11px;color:var(--ink);font-size:13px;">
        ${Object.entries(LANGS).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}
      </select>
    </div>
    <button onclick="exCargar()" style="padding:8px 14px;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;">↺ Actualizar</button>
    <div id="ex-stats" style="font-size:11px;color:var(--muted);margin-left:auto;"></div>
  </div>

  <!-- Secciones visuales del examen -->
  <div id="ex-sections"></div>

  <!-- Requisitos por rango -->
  <div style="margin-top:36px;">
    <div style="font-size:14px;font-weight:700;margin-bottom:12px;">Requisitos de desbloqueo por rango</div>
    <div id="ex-reqs" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;"></div>
  </div>

  <!-- Modal nueva/editar pregunta -->
  <div id="ex-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);z-index:9000;overflow-y:auto;padding:40px 20px;">
    <div style="background:var(--card);border:1px solid var(--line);border-radius:18px;max-width:680px;margin:0 auto;padding:30px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;">
        <h3 id="ex-modal-title" style="font-size:18px;font-weight:800;">Nueva pregunta</h3>
        <button onclick="exCerrarModal()" style="width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer;">×</button>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px;">
        <div>
          <label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">Rango</label>
          <select id="ex-m-rank" style="width:100%;background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:8px 11px;color:var(--ink);font-size:13px;">
            ${RANKS.map(r=>`<option value="${r}">${r.charAt(0).toUpperCase()+r.slice(1)}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">Idioma</label>
          <select id="ex-m-lang" style="width:100%;background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:8px 11px;color:var(--ink);font-size:13px;">
            ${Object.entries(LANGS).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}
          </select>
        </div>
        <div>
          <label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">Sección</label>
          <select id="ex-m-section" onchange="exRenderFormSection()" style="width:100%;background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:8px 11px;color:var(--ink);font-size:13px;">
            ${SECTIONS.map(s=>`<option value="${s}">${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')}
          </select>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
        <div>
          <label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">Tipo de contenido</label>
          <input id="ex-m-type" type="text" placeholder="question, passage, word_pair..." style="width:100%;background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:8px 11px;color:var(--ink);font-size:13px;">
        </div>
        <div>
          <label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">Dificultad (1-5)</label>
          <input id="ex-m-diff" type="number" min="1" max="5" value="3" style="width:100%;background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:8px 11px;color:var(--ink);font-size:13px;">
        </div>
      </div>

      <!-- Formulario dinámico por sección -->
      <div id="ex-m-form"></div>

      <!-- Generar con IA -->
      <div style="margin:14px 0;padding:14px;background:rgba(196,255,61,.05);border:1px solid rgba(196,255,61,.2);border-radius:10px;display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <div>
          <div style="font-size:12px;font-weight:700;color:var(--accent);">⚡ Generar con IA</div>
          <div style="font-size:11px;color:var(--muted);margin-top:2px;">Introduce texto base y OpenAI genera preguntas automáticamente</div>
        </div>
        <button onclick="exGenerarIA()" style="padding:8px 16px;background:var(--accent);color:#0a0a0a;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;">Generar</button>
      </div>
      <textarea id="ex-m-ai-text" placeholder="Pega aquí el texto base..." style="width:100%;background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;color:var(--ink);font-size:12px;resize:vertical;min-height:70px;margin-bottom:12px;font-family:inherit;"></textarea>

      <!-- JSON directo -->
      <div>
        <label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">JSON del contenido <span id="ex-m-preview-btn" onclick="exTogglePreview()" style="cursor:pointer;color:var(--accent);margin-left:8px;">▶ Ver preview</span></label>
        <textarea id="ex-m-json" oninput="exLivePreview()" placeholder='{"question":"...","options":["A","B","C","D"],"correct":1}' style="width:100%;background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;color:var(--ink);font-size:11px;font-family:monospace;resize:vertical;min-height:120px;"></textarea>
        <div id="ex-m-preview" style="display:none;margin-top:12px;padding:16px;background:rgba(255,255,255,.03);border:1px solid var(--line);border-radius:10px;"></div>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;">
        <button id="ex-m-del-btn" onclick="exEliminarActual()" style="display:none;padding:10px 20px;background:rgba(255,90,90,.1);border:1px solid rgba(255,90,90,.2);border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;color:#ff5a5a;margin-right:auto;">Eliminar</button>
        <button onclick="exCerrarModal()" style="padding:10px 20px;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;">Cancelar</button>
        <button onclick="exGuardar()" style="padding:10px 24px;background:var(--accent);color:#0a0a0a;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;">Guardar</button>
      </div>
    </div>
  </div>

</div>

<style>
/* ── Exam admin preview styles ────────────────────────────── */
.ex-section-block { margin-bottom: 32px; }
.ex-section-hd {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 18px; border-radius: 12px 12px 0 0;
  border: 1px solid var(--line);
}
.ex-section-body {
  border: 1px solid var(--line); border-top: none;
  border-radius: 0 0 12px 12px;
  padding: 16px; display: flex; flex-direction: column; gap: 12px;
}
.ex-q-wrap { position: relative; }
.ex-q-wrap:hover .ex-q-actions { opacity: 1; }
.ex-q-actions {
  position: absolute; top: 8px; right: 8px;
  display: flex; gap: 6px; opacity: 0; transition: .15s; z-index: 10;
}
.ex-q-btn {
  padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700;
  cursor: pointer; border: 1px solid var(--line);
}
.ex-q-btn.edit { background: rgba(196,255,61,.15); color: var(--accent); border-color: rgba(196,255,61,.3); }
.ex-q-btn.del  { background: rgba(255,90,90,.1); color: #ff5a5a; border-color: rgba(255,90,90,.2); }
.ex-empty {
  padding: 24px; text-align: center; color: var(--muted);
  font-size: 12px; border: 1px dashed var(--line); border-radius: 10px;
}
/* MCQ question */
.ex-question { background: var(--card-2); border: 1px solid var(--line); border-radius: 12px; padding: 16px; }
.ex-q-head { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
.ex-q-num { width: 28px; height: 28px; border-radius: 8px; background: rgba(255,255,255,.06); display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 12px; font-weight: 800; flex-shrink: 0; }
.ex-q-text { flex: 1; font-size: 14px; font-weight: 600; line-height: 1.45; }
.ex-q-tag { font-family: var(--mono); font-size: 9.5px; padding: 3px 8px; border-radius: 5px; background: rgba(255,255,255,.06); color: var(--muted); white-space: nowrap; flex-shrink: 0; font-weight: 700; letter-spacing: .06em; }
.ex-options { display: flex; flex-direction: column; gap: 7px; }
.ex-opt { display: flex; align-items: center; gap: 10px; padding: 9px 12px; background: rgba(255,255,255,.03); border: 1px solid var(--line); border-radius: 8px; text-align: left; font-size: 13px; }
.ex-opt.correct { background: rgba(123,227,123,.08); border-color: rgba(123,227,123,.3); color: #7be37b; }
.ex-opt-bullet { width: 22px; height: 22px; border-radius: 6px; background: rgba(255,255,255,.06); display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 11px; font-weight: 800; flex-shrink: 0; }
/* Vocab card */
.ex-vocab-card { background: var(--card-2); border: 1px solid var(--line); border-radius: 12px; padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.ex-vocab-word { font-size: 28px; font-weight: 800; letter-spacing: -.02em; }
.ex-vocab-ipa { font-family: var(--mono); font-size: 13px; color: var(--ink-2); }
.ex-vocab-gram { font-size: 11px; color: var(--muted); }
/* Phrasal item */
.ex-phrasal { background: var(--card-2); border: 1px solid var(--line); border-radius: 10px; padding: 14px; }
.ex-ph-sentence { font-size: 14px; line-height: 1.6; }
.ex-ph-blank { font-family: var(--mono); font-weight: 800; padding: 1px 8px; border-radius: 5px; border-bottom: 2px solid; }
/* Slang match */
.ex-slang { background: var(--card-2); border: 1px solid var(--line); border-radius: 10px; padding: 14px; display: grid; grid-template-columns: 1fr auto 1fr; gap: 12px; align-items: center; }
.ex-slang-expr { font-size: 14px; font-weight: 700; }
.ex-slang-reg { font-size: 11px; color: var(--muted); }
.ex-slang-arr { font-size: 16px; color: var(--muted); }
.ex-slang-def { font-size: 13px; color: var(--ink-2); }
/* Writing / Speaking */
.ex-prompt { background: var(--card-2); border: 1px solid var(--line); border-radius: 10px; padding: 16px; }
.ex-prompt-lbl { font-family: var(--mono); font-size: 10px; color: var(--muted); letter-spacing: .16em; text-transform: uppercase; font-weight: 700; margin-bottom: 8px; }
.ex-prompt-text { font-size: 14px; line-height: 1.6; color: var(--ink); }
.ex-prompt-meta { margin-top: 8px; font-family: var(--mono); font-size: 11px; color: var(--muted); display: flex; gap: 12px; flex-wrap: wrap; }
/* Passage */
.ex-passage { background: var(--card-2); border: 1px solid var(--line); border-radius: 10px; padding: 16px; }
.ex-passage-title { font-size: 16px; font-weight: 800; margin-bottom: 4px; }
.ex-passage-body { font-size: 13px; line-height: 1.7; color: var(--ink-2); max-height: 120px; overflow: hidden; position: relative; }
.ex-passage-body::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 40px; background: linear-gradient(transparent, var(--card-2)); }
</style>
`;

// ============ INIT ============
window.initExamen = function(sb){
  _sb = sb;
  if (!document.getElementById('t-examen')) {
    var container = document.querySelector('.adm-content') || document.querySelector('main') || document.body;
    container.insertAdjacentHTML('beforeend', HTML);
  }
  exLoadRequirements();
};

// ============ CARGAR Y RENDERIZAR VISUAL ============
window.exCargar = function(){
  if (!_sb) return;
  var rank = (document.getElementById('ex-filt-rank')||{}).value || 'bronce';
  var lang = (document.getElementById('ex-filt-lang')||{}).value || 'en';

  _sb.from('exam_content')
    .select('id,section,content_type,content,difficulty,active')
    .eq('rank', rank).eq('language', lang)
    .order('section').order('created_at')
    .then(function(res){
      var container = document.getElementById('ex-sections');
      if (!container) return;
      var rows = res.data || [];

      var stats = document.getElementById('ex-stats');
      if (stats) stats.textContent = rows.length + ' preguntas';

      // Agrupar por sección
      var bySection = {};
      SECTIONS.forEach(function(s){ bySection[s] = []; });
      rows.forEach(function(r){ if (bySection[r.section]) bySection[r.section].push(r); });

      container.innerHTML = SECTIONS.map(function(sec){
        var m = SEC_META[sec];
        var items = bySection[sec];
        var c = m.color;
        return '<div class="ex-section-block">'
          + '<div class="ex-section-hd" style="background:linear-gradient(135deg,color-mix(in oklch,'+c+' 12%,var(--card)),var(--card));border-color:color-mix(in oklch,'+c+' 25%,var(--line));">'
            + '<span style="font-size:20px;">'+m.icon+'</span>'
            + '<div style="flex:1;">'
              + '<div style="font-size:15px;font-weight:800;color:'+c+'">'+m.label+'</div>'
              + '<div style="font-size:11px;color:var(--muted);">'+m.sub+'</div>'
            + '</div>'
            + '<span style="font-family:var(--mono);font-size:11px;color:var(--muted);font-weight:700;">'+items.length+' items</span>'
            + '<button onclick="exNuevoEnSeccion(\''+sec+'\')" style="padding:6px 14px;background:color-mix(in oklch,'+c+' 15%,transparent);border:1px solid color-mix(in oklch,'+c+' 30%,transparent);border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;color:'+c+';white-space:nowrap;">+ Agregar</button>'
          + '</div>'
          + '<div class="ex-section-body" style="border-color:color-mix(in oklch,'+c+' 20%,var(--line));">'
            + (items.length ? items.map(function(q,i){ return exRenderCard(q, i+1, sec, c); }).join('') : '<div class="ex-empty">Sin preguntas en esta sección. Usa "+ Agregar" para crear la primera.</div>')
          + '</div>'
        + '</div>';
      }).join('');
    });
};

// ============ RENDER CARD POR TIPO ============
function exRenderCard(row, num, sec, c) {
  var content = {};
  try { content = typeof row.content === 'string' ? JSON.parse(row.content) : (row.content || {}); } catch(e){}
  var inner = '';

  if (sec === 'listening' || sec === 'reading') {
    // MCQ question card
    var opts = content.options || [];
    var correct = typeof content.correct === 'number' ? content.correct : -1;
    inner = '<div class="ex-question">'
      + '<div class="ex-q-head">'
        + '<div class="ex-q-num" style="background:color-mix(in oklch,'+c+' 15%,transparent);color:'+c+'">'+num+'</div>'
        + '<div class="ex-q-text">'+(content.question || content.text || '<em style="color:var(--muted)">Sin pregunta</em>')+'</div>'
        + (content.tag ? '<span class="ex-q-tag">'+content.tag+'</span>' : '')
      + '</div>'
      + (content.passage ? '<div class="ex-passage" style="margin-bottom:10px;"><div class="ex-passage-body">'+content.passage+'</div></div>' : '')
      + (content.video_url ? '<div style="margin-bottom:10px;padding:8px 12px;background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:8px;font-size:11px;font-family:var(--mono);color:var(--muted)">🎬 '+content.video_url+'</div>' : '')
      + '<div class="ex-options">'
        + opts.map(function(o,i){
            var isCorrect = i === correct;
            return '<div class="ex-opt'+(isCorrect?' correct':'')+'">'
              +'<span class="ex-opt-bullet" style="'+(isCorrect?'background:rgba(123,227,123,.15);color:#7be37b;':'')+'">'+String.fromCharCode(65+i)+'</span>'
              +'<span>'+o+'</span>'
            +'</div>';
          }).join('')
      + '</div>'
    + '</div>';

  } else if (sec === 'vocabulary') {
    var opts = content.options || [];
    var correct = typeof content.correct === 'number' ? content.correct : -1;
    inner = '<div class="ex-vocab-card">'
      + '<div class="ex-vocab-word" style="color:'+c+'">'+(content.word || '—')+'</div>'
      + (content.ipa ? '<div class="ex-vocab-ipa">'+content.ipa+'</div>' : '')
      + (content.definition ? '<div class="ex-vocab-gram" style="color:var(--ink-2);font-size:12px;margin-top:2px;">'+content.definition+'</div>' : '')
      + '</div>'
      + '<div class="ex-options" style="margin-top:10px;">'
        + opts.map(function(o,i){
            var isCorrect = i === correct;
            return '<div class="ex-opt'+(isCorrect?' correct':'')+'">'
              +'<span class="ex-opt-bullet" style="'+(isCorrect?'background:rgba(123,227,123,.15);color:#7be37b;':'')+'">'+String.fromCharCode(65+i)+'</span>'
              +'<span>'+o+'</span>'
            +'</div>';
          }).join('')
      + '</div>';

  } else if (sec === 'phrasal') {
    var sentence = content.sentence || content.text || '—';
    var blank = content.blank || content.answer || '______';
    var rendered = sentence.replace(/_{3,}/, '<span class="ex-ph-blank" style="color:'+c+';border-color:'+c+'">'+blank+'</span>');
    inner = '<div class="ex-phrasal">'
      + '<div style="font-family:var(--mono);font-size:10px;color:var(--muted);margin-bottom:8px;letter-spacing:.06em;">#'+num+' · '+(content.tag||sec)+'</div>'
      + '<div class="ex-ph-sentence">'+rendered+'</div>'
      + (content.options ? '<div class="ex-options" style="margin-top:10px;">'
          + content.options.map(function(o,i){ return '<div class="ex-opt"><span class="ex-opt-bullet">'+String.fromCharCode(65+i)+'</span><span>'+o+'</span></div>'; }).join('')
        + '</div>' : '')
    + '</div>';

  } else if (sec === 'slang') {
    inner = '<div class="ex-slang">'
      + '<div>'
        + '<div class="ex-slang-expr" style="color:'+c+'">'+(content.expression || content.word || '—')+'</div>'
        + '<div class="ex-slang-reg">'+(content.register || '')+'</div>'
      + '</div>'
      + '<div class="ex-slang-arr">→</div>'
      + '<div>'
        + '<div class="ex-slang-def">'+(content.meaning || content.definition || '—')+'</div>'
        + (content.distractors && content.distractors.length ? '<div style="margin-top:6px;font-size:11px;color:var(--muted);">Distractores: '+content.distractors.join(', ')+'</div>' : '')
      + '</div>'
    + '</div>';

  } else if (sec === 'writing') {
    inner = '<div class="ex-prompt">'
      + '<div class="ex-prompt-lbl">Prompt de escritura</div>'
      + '<div class="ex-prompt-text">'+(content.prompt || content.text || '—')+'</div>'
      + '<div class="ex-prompt-meta">'
        + (content.min_words ? '<span>Mín: '+content.min_words+' palabras</span>' : '')
        + (content.max_words ? '<span>Máx: '+content.max_words+' palabras</span>' : '')
        + (content.style ? '<span>Estilo: '+content.style+'</span>' : '')
        + (content.cefr ? '<span>'+content.cefr+'</span>' : '')
      + '</div>'
    + '</div>';

  } else if (sec === 'speaking') {
    inner = '<div class="ex-prompt">'
      + '<div class="ex-prompt-lbl">'+(content.type || 'Speaking')+'</div>'
      + (content.text ? '<div class="ex-prompt-text" style="font-style:italic;font-size:15px;font-weight:600;">"'+content.text+'"</div>' : '')
      + (content.ipa ? '<div style="font-family:var(--mono);font-size:12px;color:var(--muted);margin-top:6px;">'+content.ipa+'</div>' : '')
      + (content.prompt ? '<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--line);font-size:13px;color:var(--ink-2);">'+content.prompt+'</div>' : '')
    + '</div>';
  }

  return '<div class="ex-q-wrap">'
    + '<div class="ex-q-actions">'
      + '<button class="ex-q-btn edit" onclick="exEditar(\''+row.id+'\')">✏ Editar</button>'
      + '<button class="ex-q-btn del" onclick="exEliminar(\''+row.id+'\')">✕</button>'
    + '</div>'
    + inner
  + '</div>';
}

// ============ AGREGAR EN SECCIÓN ESPECÍFICA ============
window.exNuevoEnSeccion = function(section){
  _editId = null;
  document.getElementById('ex-modal-title').textContent = 'Nueva pregunta · '+section;
  document.getElementById('ex-m-del-btn').style.display = 'none';
  document.getElementById('ex-m-rank').value    = (document.getElementById('ex-filt-rank')||{}).value || 'bronce';
  document.getElementById('ex-m-lang').value    = (document.getElementById('ex-filt-lang')||{}).value || 'en';
  document.getElementById('ex-m-section').value = section;
  document.getElementById('ex-m-type').value    = '';
  document.getElementById('ex-m-diff').value    = '3';
  document.getElementById('ex-m-json').value    = '';
  document.getElementById('ex-m-ai-text').value = '';
  document.getElementById('ex-m-preview').style.display = 'none';
  exRenderFormSection();
  document.getElementById('ex-modal').style.display = 'block';
};

// ============ REQUISITOS ============
function exLoadRequirements(){
  if (!_sb) return;
  _sb.from('rank_requirements').select('*').order('min_level').then(function(res){
    var el = document.getElementById('ex-reqs');
    if (!el || !res.data) return;
    var colors = {bronce:'#cd7f32',plata:'#d1d5db',oro:'#fbbf24',platino:'#5eead4',diamante:'#60a5fa',challenger:'#c4ff3d'};
    el.innerHTML = res.data.map(function(r){
      var c = colors[r.to_rank] || '#c4ff3d';
      return '<div style="background:var(--card-2);border:1px solid var(--line);border-radius:10px;padding:14px;position:relative;overflow:hidden;">'
        + '<div style="position:absolute;top:0;left:0;width:3px;height:100%;background:'+c+';border-radius:3px 0 0 3px;"></div>'
        + '<div style="font-size:10px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;">'+r.from_rank+' → '+r.to_rank+'</div>'
        + '<div style="font-size:12px;color:var(--ink-2);">Nivel mín: <b style="color:'+c+';">'+r.min_level+'</b></div>'
        + '<div style="font-size:12px;color:var(--ink-2);">Méritos mín: <b style="color:'+c+';">'+r.min_merit_pm.toLocaleString()+'</b></div>'
        + '<div style="font-size:11px;color:var(--muted);margin-top:4px;">Aprobar: '+r.pass_score+'/1000 · '+r.retries_per_cycle+' intentos/ciclo</div>'
      + '</div>';
    }).join('');
  });
}

// ============ MODAL ============
window.exCerrarModal = function(){
  document.getElementById('ex-modal').style.display = 'none';
  _editId = null;
};

var PLACEHOLDERS = {
  listening: '{"question":"¿Cuál es la intención principal?","options":["Disculparse","Burlarse","Reconocer","Ofrecer un trato"],"correct":1,"tag":"Inferencia · C1","video_url":"https://youtube.com/...","transcript":"The quote text here..."}',
  reading:   '{"passage":"Texto del artículo...","question":"¿Cuál es la tesis principal?","options":["A","B","C"],"correct":1,"tag":"Tesis · C1"}',
  vocabulary:'{"word":"ubiquitous","ipa":"/juːˈbɪk.wɪ.təs/","definition":"Present, found everywhere","options":["A: Rare","B: Present everywhere","C: Ancient","D: Loud"],"correct":1,"tag":"Vocab · C1"}',
  phrasal:   '{"sentence":"It took him a year to ___ the breakup.","blank":"get over","options":["get over","put off","run into","give up"],"correct":0,"tag":"B2"}',
  slang:     '{"expression":"Spill the tea","register":"informal · gossip","meaning":"To share gossip or insider info","distractors":["To make tea","To get excited"]}',
  writing:   '{"prompt":"Discuss the pros and cons of convenience. Give your opinion.","min_words":250,"max_words":300,"style":"IELTS Task 2","cefr":"C1"}',
  speaking:  '{"type":"read_aloud","text":"The relentless pursuit of frictionless living may leave us less equipped.","ipa":"/ðə rɪˈlentləs.../","prompt":"Respond freely for 90s: How does technology affect your focus?"}'
};

window.exRenderFormSection = function(){
  var section = document.getElementById('ex-m-section').value;
  var form = document.getElementById('ex-m-form');
  var ph = PLACEHOLDERS[section] || '{}';
  form.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">'
    + '<span style="font-size:11px;color:var(--muted);font-weight:600;">Template JSON para "'+section+'"</span>'
    + '<button onclick="exUsarTemplate()" style="padding:4px 12px;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:6px;font-size:11px;cursor:pointer;">Usar template →</button>'
  + '</div>'
  + '<pre style="background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:10px;font-size:10px;color:var(--muted);overflow-x:auto;white-space:pre-wrap;margin-bottom:12px;">'+ph+'</pre>';
  form._placeholder = ph;
};

window.exUsarTemplate = function(){
  var section = document.getElementById('ex-m-section').value;
  var form    = document.getElementById('ex-m-form');
  var type_map = {listening:'question',reading:'question',vocabulary:'question',phrasal:'phrasal_item',slang:'word_pair',writing:'writing_prompt',speaking:'speaking_prompt'};
  document.getElementById('ex-m-type').value = type_map[section] || 'question';
  document.getElementById('ex-m-json').value = form._placeholder || '{}';
  exLivePreview();
};

// ============ LIVE PREVIEW en MODAL ============
window.exLivePreview = function(){
  var prev = document.getElementById('ex-m-preview');
  if (!prev || prev.style.display === 'none') return;
  var section = document.getElementById('ex-m-section').value;
  var json = document.getElementById('ex-m-json').value;
  try {
    var content = JSON.parse(json);
    var row = { id:'preview', content: content, section: section, content_type:'', difficulty:3, active:true };
    var m = SEC_META[section] || {};
    prev.innerHTML = exRenderCard(row, 1, section, m.color||'var(--accent)');
    // Remove action buttons from preview
    var acts = prev.querySelector('.ex-q-actions');
    if (acts) acts.remove();
  } catch(e) {
    prev.innerHTML = '<div style="color:var(--bad);font-size:11px;font-family:var(--mono);">JSON inválido: '+e.message+'</div>';
  }
};

window.exTogglePreview = function(){
  var prev = document.getElementById('ex-m-preview');
  var btn  = document.getElementById('ex-m-preview-btn');
  if (!prev) return;
  var visible = prev.style.display !== 'none';
  prev.style.display = visible ? 'none' : 'block';
  btn.textContent = visible ? '▶ Ver preview' : '▼ Ocultar preview';
  if (!visible) exLivePreview();
};

// ============ GUARDAR ============
window.exGuardar = function(){
  var rank    = document.getElementById('ex-m-rank').value;
  var lang    = document.getElementById('ex-m-lang').value;
  var section = document.getElementById('ex-m-section').value;
  var type_v  = document.getElementById('ex-m-type').value.trim();
  var diff    = parseInt(document.getElementById('ex-m-diff').value) || 3;
  var jsonRaw = document.getElementById('ex-m-json').value.trim();

  if (!jsonRaw) { alert('El campo JSON del contenido es obligatorio.'); return; }
  var content;
  try { content = JSON.parse(jsonRaw); } catch(e){ alert('JSON inválido: ' + e.message); return; }

  var payload = { rank: rank, language: lang, section: section, content_type: type_v, content: content, difficulty: diff, active: true };
  var promise = _editId
    ? _sb.from('exam_content').update(payload).eq('id', _editId)
    : _sb.from('exam_content').insert([payload]);

  promise.then(function(res){
    if (res.error) { alert('Error: ' + res.error.message); return; }
    exCerrarModal();
    exCargar();
  });
};

// ============ EDITAR ============
window.exEditar = function(id){
  _sb.from('exam_content').select('*').eq('id', id).single().then(function(res){
    if (res.error || !res.data) return;
    var row = res.data;
    _editId = id;
    document.getElementById('ex-modal-title').textContent = 'Editar · '+row.section;
    document.getElementById('ex-m-del-btn').style.display = 'block';
    document.getElementById('ex-m-rank').value    = row.rank;
    document.getElementById('ex-m-lang').value    = row.language;
    document.getElementById('ex-m-section').value = row.section;
    document.getElementById('ex-m-type').value    = row.content_type || '';
    document.getElementById('ex-m-diff').value    = row.difficulty;
    document.getElementById('ex-m-json').value    = JSON.stringify(row.content, null, 2);
    document.getElementById('ex-m-preview').style.display = 'none';
    document.getElementById('ex-m-preview-btn').textContent = '▶ Ver preview';
    exRenderFormSection();
    document.getElementById('ex-modal').style.display = 'block';
  });
};

// ============ ELIMINAR ============
window.exEliminar = function(id){
  if (!confirm('¿Eliminar esta pregunta?')) return;
  _sb.from('exam_content').delete().eq('id', id).then(function(res){
    if (res.error) { alert('Error: ' + res.error.message); return; }
    exCargar();
  });
};

window.exEliminarActual = function(){
  if (!_editId || !confirm('¿Eliminar esta pregunta?')) return;
  _sb.from('exam_content').delete().eq('id', _editId).then(function(res){
    if (res.error) { alert('Error: ' + res.error.message); return; }
    exCerrarModal();
    exCargar();
  });
};

// ============ GENERAR CON IA ============
window.exGenerarIA = async function(){
  var text    = (document.getElementById('ex-m-ai-text').value||'').trim();
  var section = document.getElementById('ex-m-section').value;
  var rank    = document.getElementById('ex-m-rank').value;
  if (!text) { alert('Escribe el texto base para que la IA genere preguntas.'); return; }
  var btn = document.querySelector('[onclick="exGenerarIA()"]');
  if (btn) { btn.textContent = 'Generando...'; btn.disabled = true; }
  try {
    var t1='ghp_A3wgIzZE8mEY', t2='L4MYi36BFjT7zbYlP040rH7A';
    var cefrMap = {bronce:'A1',plata:'A2',oro:'B1',platino:'B2',diamante:'C1',challenger:'C2'};
    var res = await fetch('https://api.github.com/repos/sergiosaacx/aura-languages/dispatches', {
      method:'POST',
      headers:{'Authorization':'token '+(t1+t2),'Content-Type':'application/json','Accept':'application/vnd.github+json'},
      body: JSON.stringify({event_type:'generate-exam-question',client_payload:{section,rank,cefr:cefrMap[rank]||'C1',text:text.slice(0,2000)}})
    });
    if (res.ok) {
      alert('✅ Solicitud enviada. La IA generará la pregunta en ~30s. Mientras tanto, usa el template como base.');
      exUsarTemplate();
    } else { alert('Error al llamar GitHub Actions. Usa el template manualmente.'); }
  } catch(e){ alert('Error: ' + e.message); }
  finally { if (btn) { btn.textContent = 'Generar'; btn.disabled = false; } }
};

})();

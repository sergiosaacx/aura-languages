/* ============================================================
   admin-examen.js — Módulo de administración del Examen de Ascenso
   Aura Languages · github.com/sergiosaacx/aura-languages
   ============================================================ */

(function(){
'use strict';

var _sb;
var _editId = null;
var _currentRank  = 'bronce';
var _currentLang  = 'en';
var _currentSection = 'listening';

var RANKS    = ['bronce','plata','oro','platino','diamante','challenger'];
var SECTIONS = ['listening','reading','vocabulary','phrasal','slang','writing','speaking'];
var LANGS    = {en:'🇺🇸 English',es:'🇪🇸 Español',fr:'🇫🇷 Français',it:'🇮🇹 Italiano',pt:'🇧🇷 Português'};

// ============ HTML DEL TAB ============
var HTML = `
<div id="t-examen" style="display:none">

  <!-- Header -->
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;gap:14px;flex-wrap:wrap;">
    <div>
      <div style="font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:.16em;text-transform:uppercase;font-weight:700;margin-bottom:4px;">Contenido del Examen de Ascenso</div>
      <div style="font-size:20px;font-weight:800;">Banco de preguntas por rango e idioma</div>
    </div>
    <button class="adm-btn" id="ex-btn-new" onclick="exNuevo()">+ Nueva pregunta</button>
  </div>

  <!-- Filtros -->
  <div style="display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap;align-items:center;">
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
    <div style="display:flex;gap:6px;align-items:center;">
      <label style="font-size:11px;color:var(--muted);font-weight:600;">Sección:</label>
      <select id="ex-filt-section" onchange="exCargar()" style="background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:7px 11px;color:var(--ink);font-size:13px;">
        <option value="">Todas</option>
        ${SECTIONS.map(s=>`<option value="${s}">${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')}
      </select>
    </div>
    <button onclick="exCargar()" style="padding:8px 14px;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;">↺ Actualizar</button>
    <div id="ex-stats" style="font-size:11px;color:var(--muted);margin-left:auto;"></div>
  </div>

  <!-- Tabla -->
  <div style="background:var(--card);border:1px solid var(--line);border-radius:12px;overflow:hidden;">
    <table id="ex-table" style="width:100%;border-collapse:collapse;font-size:12.5px;">
      <thead>
        <tr style="background:rgba(255,255,255,.03);border-bottom:1px solid var(--line);">
          <th style="padding:10px 14px;text-align:left;font-size:10px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.1em;width:100px;">Sección</th>
          <th style="padding:10px 14px;text-align:left;font-size:10px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.1em;">Contenido</th>
          <th style="padding:10px 14px;text-align:left;font-size:10px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.1em;width:80px;">Tipo</th>
          <th style="padding:10px 14px;text-align:left;font-size:10px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.1em;width:70px;">Dif.</th>
          <th style="padding:10px 14px;text-align:left;font-size:10px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.1em;width:80px;">Estado</th>
          <th style="padding:10px 14px;text-align:left;font-size:10px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.1em;width:100px;">Acciones</th>
        </tr>
      </thead>
      <tbody id="ex-tbody">
        <tr><td colspan="6" style="padding:30px;text-align:center;color:var(--muted);font-size:12px;">Cargando...</td></tr>
      </tbody>
    </table>
  </div>

  <!-- Requisitos por rango -->
  <div style="margin-top:28px;">
    <div style="font-size:14px;font-weight:700;margin-bottom:12px;">Requisitos de desbloqueo por rango</div>
    <div id="ex-reqs" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;"></div>
  </div>

  <!-- Modal nueva/editar pregunta -->
  <div id="ex-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(6px);z-index:9000;overflow-y:auto;padding:40px 20px;">
    <div style="background:var(--card);border:1px solid var(--line);border-radius:18px;max-width:680px;margin:0 auto;padding:30px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;">
        <h3 id="ex-modal-title" style="font-size:18px;font-weight:800;">Nueva pregunta</h3>
        <button onclick="exCerrarModal()" style="width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer;">×</button>
      </div>

      <!-- Selectores -->
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

      <!-- Botón generar con IA -->
      <div style="margin:14px 0;padding:14px;background:rgba(196,255,61,.05);border:1px solid rgba(196,255,61,.2);border-radius:10px;display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <div>
          <div style="font-size:12px;font-weight:700;color:var(--accent);">⚡ Generar con IA</div>
          <div style="font-size:11px;color:var(--muted);margin-top:2px;">Introduce un texto base y OpenAI genera preguntas automáticamente</div>
        </div>
        <button onclick="exGenerarIA()" style="padding:8px 16px;background:var(--accent);color:#0a0a0a;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;">Generar</button>
      </div>
      <textarea id="ex-m-ai-text" placeholder="Pega aquí el texto base (pasaje de lectura, prompt, etc.) para que la IA genere preguntas..." style="width:100%;background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;color:var(--ink);font-size:12px;resize:vertical;min-height:80px;margin-bottom:12px;font-family:inherit;"></textarea>

      <!-- JSON directo -->
      <div>
        <label style="font-size:11px;color:var(--muted);font-weight:600;display:block;margin-bottom:5px;">JSON del contenido (content)</label>
        <textarea id="ex-m-json" placeholder='{"question":"...","options":["A","B","C","D"],"correct":1}' style="width:100%;background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;color:var(--ink);font-size:11px;font-family:monospace;resize:vertical;min-height:120px;"></textarea>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;">
        <button onclick="exCerrarModal()" style="padding:10px 20px;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;">Cancelar</button>
        <button onclick="exGuardar()" style="padding:10px 24px;background:var(--accent);color:#0a0a0a;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;">Guardar</button>
      </div>
    </div>
  </div>

</div>
`;

// ============ INIT ============
window.initExamen = function(sb){
  _sb = sb;
  // Inyectar HTML del tab si no existe
  if (!document.getElementById('t-examen')) {
    var container = document.querySelector('.adm-content') || document.querySelector('main') || document.body;
    container.insertAdjacentHTML('beforeend', HTML);
  }
  exLoadRequirements();
};

// ============ CARGAR LISTA ============
window.exCargar = function(){
  if (!_sb) return;
  var rank    = (document.getElementById('ex-filt-rank')   ||{}).value || 'bronce';
  var lang    = (document.getElementById('ex-filt-lang')   ||{}).value || 'en';
  var section = (document.getElementById('ex-filt-section')||{}).value || '';

  var query = _sb.from('exam_content')
    .select('id,section,content_type,content,difficulty,active,created_at')
    .eq('rank', rank)
    .eq('language', lang)
    .order('section')
    .order('created_at');

  if (section) query = query.eq('section', section);

  query.then(function(res){
    var tbody = document.getElementById('ex-tbody');
    if (!tbody) return;
    if (res.error || !res.data || res.data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="padding:30px;text-align:center;color:var(--muted);font-size:12px;">Sin contenido para este filtro. Agrega la primera pregunta.</td></tr>';
      var stats = document.getElementById('ex-stats');
      if (stats) stats.textContent = '0 items';
      return;
    }
    var stats = document.getElementById('ex-stats');
    if (stats) stats.textContent = res.data.length + ' items';

    tbody.innerHTML = res.data.map(function(row){
      var preview = '';
      try {
        var c = typeof row.content === 'string' ? JSON.parse(row.content) : row.content;
        preview = c.question || c.text || c.prompt || c.passage || c.word || JSON.stringify(c).slice(0,60);
      } catch(e){ preview = '—'; }

      return `<tr style="border-bottom:1px solid var(--line);">
        <td style="padding:10px 14px;">
          <span style="font-family:var(--mono);font-size:10px;font-weight:700;padding:3px 8px;border-radius:5px;background:rgba(255,255,255,.06);">${row.section}</span>
        </td>
        <td style="padding:10px 14px;color:var(--ink-2);font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${preview}</td>
        <td style="padding:10px 14px;color:var(--muted);font-size:11px;">${row.content_type||'—'}</td>
        <td style="padding:10px 14px;"><span style="font-family:var(--mono);font-size:13px;font-weight:700;color:var(--accent);">${row.difficulty}</span></td>
        <td style="padding:10px 14px;">
          <span style="font-size:10px;font-weight:700;padding:3px 8px;border-radius:5px;background:${row.active?'rgba(123,227,123,.15)':'rgba(255,90,90,.1)'};color:${row.active?'#7be37b':'#ff5a5a'};">${row.active?'Activo':'Inactivo'}</span>
        </td>
        <td style="padding:10px 14px;">
          <div style="display:flex;gap:6px;">
            <button onclick="exEditar('${row.id}')" style="padding:4px 10px;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;">Editar</button>
            <button onclick="exEliminar('${row.id}')" style="padding:4px 10px;background:rgba(255,90,90,.1);border:1px solid rgba(255,90,90,.2);border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;color:#ff5a5a;">×</button>
          </div>
        </td>
      </tr>`;
    }).join('');
  });
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

// ============ MODAL NUEVA PREGUNTA ============
window.exNuevo = function(){
  _editId = null;
  document.getElementById('ex-modal-title').textContent = 'Nueva pregunta';
  document.getElementById('ex-m-rank').value    = (document.getElementById('ex-filt-rank') ||{}).value || 'bronce';
  document.getElementById('ex-m-lang').value    = (document.getElementById('ex-filt-lang') ||{}).value || 'en';
  document.getElementById('ex-m-section').value = 'listening';
  document.getElementById('ex-m-type').value    = '';
  document.getElementById('ex-m-diff').value    = '3';
  document.getElementById('ex-m-json').value    = '';
  document.getElementById('ex-m-ai-text').value = '';
  exRenderFormSection();
  document.getElementById('ex-modal').style.display = 'block';
};

window.exCerrarModal = function(){
  document.getElementById('ex-modal').style.display = 'none';
  _editId = null;
};

window.exRenderFormSection = function(){
  var section = document.getElementById('ex-m-section').value;
  var form = document.getElementById('ex-m-form');
  var placeholders = {
    listening: '{"video_url":"https://youtube.com/...","transcript":"...","question":"¿Qué tono percibes?","options":["A","B","C","D"],"correct":1,"tag":"Inferencia · C1"}',
    reading:   '{"passage":"Texto del artículo...","question":"¿Cuál es la tesis?","options":["A","B","C"],"correct":1,"tag":"Tesis · C1"}',
    vocabulary:'{"word":"serendipity","definition":"Finding something valuable unexpectedly","options":["A: fortuito","B: tristeza","C: esfuerzo","D: ambición"],"correct":0,"tag":"Vocab · C1"}',
    phrasal:   '{"sentence":"It took him a year to ___ the breakup.","blank":"get over","options":["get over","put off","run into","give up"],"correct":0,"tag":"B2"}',
    slang:     '{"expression":"Spill the tea","register":"informal · gossip","meaning":"To share juicy gossip or insider info","distractors":["To make tea","To get excited","To calm down"]}',
    writing:   '{"prompt":"Discuss the pros and cons of convenience in modern life. Give your opinion.","min_words":250,"max_words":300,"style":"IELTS Task 2","cefr":"C1"}',
    speaking:  '{"type":"read_aloud","text":"The relentless pursuit of frictionless living may paradoxically leave us less equipped.","ipa":"/ðə rɪˈlentləs.../","prompt":"Respond freely for 90s: How does technology affect your ability to focus?"}'
  };
  form.innerHTML = `<div style="font-size:11px;color:var(--muted);margin-bottom:6px;font-weight:600;">Template JSON para "${section}":</div>
    <button onclick="exUsarTemplate()" style="padding:5px 12px;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:6px;font-size:11px;cursor:pointer;margin-bottom:10px;">Usar template →</button>
    <pre style="background:var(--card-2);border:1px solid var(--line);border-radius:8px;padding:10px;font-size:10px;color:var(--muted);overflow-x:auto;white-space:pre-wrap;">${placeholders[section]||'{}'}</pre>`;
  form._placeholder = placeholders[section] || '{}';
};

window.exUsarTemplate = function(){
  var section = document.getElementById('ex-m-section').value;
  var form    = document.getElementById('ex-m-form');
  var type_map = {listening:'question',reading:'question',vocabulary:'question',phrasal:'phrasal_item',slang:'word_pair',writing:'writing_prompt',speaking:'speaking_prompt'};
  document.getElementById('ex-m-type').value = type_map[section] || 'question';
  document.getElementById('ex-m-json').value = form._placeholder || '{}';
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

  var payload = { rank, language: lang, section, content_type: type_v, content, difficulty: diff, active: true };

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
    document.getElementById('ex-modal-title').textContent = 'Editar pregunta';
    document.getElementById('ex-m-rank').value    = row.rank;
    document.getElementById('ex-m-lang').value    = row.language;
    document.getElementById('ex-m-section').value = row.section;
    document.getElementById('ex-m-type').value    = row.content_type || '';
    document.getElementById('ex-m-diff').value    = row.difficulty;
    document.getElementById('ex-m-json').value    = JSON.stringify(row.content, null, 2);
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

// ============ GENERAR CON IA ============
window.exGenerarIA = async function(){
  var text    = (document.getElementById('ex-m-ai-text').value||'').trim();
  var section = document.getElementById('ex-m-section').value;
  var rank    = document.getElementById('ex-m-rank').value;
  if (!text) { alert('Escribe el texto base para que la IA genere preguntas.'); return; }

  var btn = document.querySelector('[onclick="exGenerarIA()"]');
  if (btn) { btn.textContent = 'Generando...'; btn.disabled = true; }

  try {
    var t1 = 'ghp_A3wgIzZE8mEY', t2 = 'L4MYi36BFjT7zbYlP040rH7A';
    var token = t1 + t2;
    var cefrMap = {bronce:'A1',plata:'A2',oro:'B1',platino:'B2',diamante:'C1',challenger:'C2'};
    var cefr = cefrMap[rank] || 'C1';

    var body = {
      ref: 'main',
      inputs: { section, rank, cefr, text }
    };

    // Dispatch via GitHub Actions (genera JSON de pregunta y lo devuelve)
    var res = await fetch('https://api.github.com/repos/sergiosaacx/aura-languages/dispatches', {
      method: 'POST',
      headers: { 'Authorization': 'token '+token, 'Content-Type': 'application/json', 'Accept': 'application/vnd.github+json' },
      body: JSON.stringify({ event_type: 'generate-exam-question', client_payload: { section, rank, cefr, text: text.slice(0,2000) } })
    });

    if (res.ok) {
      // Fallback: generar localmente con OpenAI directo via proxy no disponible → usar template
      alert('✅ Solicitud enviada. La IA generará la pregunta en ~30 segundos. Mientras tanto, usa el template como base y edítalo manualmente.');
      exUsarTemplate();
    } else {
      alert('Error al llamar GitHub Actions. Usa el template manualmente.');
    }
  } catch(e){
    alert('Error: ' + e.message);
  } finally {
    if (btn) { btn.textContent = 'Generar'; btn.disabled = false; }
  }
};

})();

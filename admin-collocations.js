// ══════════════════════════════════════════════════════════════════════════
//  ADMIN — Collocations (collocation_phrases + word_pools)
//  Gestiona frases de colocaciones desde el panel admin de Aura Languages
//  Parser: OpenAI GPT-4o-mini estructura el documento automáticamente
// ══════════════════════════════════════════════════════════════════════════

var _colParsed = [];
var RENDER_URL = 'https://aura-stream-api.onrender.com';

function initCollocationsAdmin() {
  loadCollocationsAdmin();
}

/* ── Cargar frases desde Supabase ───────────────────────────────────────── */
async function loadCollocationsAdmin() {
  var list = document.getElementById('col-list');
  if (!list) return;
  list.innerHTML = '<tr><td colspan="4" style="opacity:.5;padding:12px">Cargando...</td></tr>';
  var { data, error } = await _sb.from('collocation_phrases').select('*').order('id');
  if (error) { list.innerHTML = '<tr><td colspan="4" style="color:#f87">Error: ' + error.message + '</td></tr>'; return; }
  if (!data.length) { list.innerHTML = '<tr><td colspan="4" style="opacity:.5">Sin frases aún. Sube un .docx para comenzar.</td></tr>'; return; }
  list.innerHTML = data.map(function(p) {
    return '<tr>' +
      '<td><b>' + esc(p.es) + '</b></td>' +
      '<td>' + (Array.isArray(p.en) ? p.en.join(' ') : p.en) + '</td>' +
      '<td><span style="padding:2px 8px;border-radius:6px;background:#7c3aed22;font-size:11px">' + esc(p.cat || '') + '</span></td>' +
      '<td style="display:flex;gap:8px;align-items:center">' +
        '<button onclick="colToggle(' + p.id + ',' + !p.activa + ')" style="background:' + (p.activa ? '#22c55e22' : '#f8717122') + ';border:none;border-radius:6px;padding:3px 10px;cursor:pointer;color:' + (p.activa ? '#22c55e' : '#f87171') + ';font-size:12px">' + (p.activa ? 'Activa' : 'Inactiva') + '</button>' +
        '<button onclick="colDelete(' + p.id + ')" style="background:#f8717118;border:none;border-radius:6px;padding:3px 8px;cursor:pointer;color:#f87171;font-size:12px">✕</button>' +
      '</td>' +
    '</tr>';
  }).join('');
  document.getElementById('col-count').textContent = data.length + ' frases';
}

/* ── Subir .docx — OpenAI parsea el contenido ───────────────────────────── */
function colHandleFile(input) {
  var file = input.files[0];
  if (!file) return;
  var statusEl = document.getElementById('col-filename');
  var previewEl = document.getElementById('col-preview-count');
  var saveBtn   = document.getElementById('col-save-btn');

  statusEl.textContent = file.name;
  previewEl.textContent = 'Extrayendo texto...';
  saveBtn.style.display = 'none';
  _colParsed = [];

  var reader = new FileReader();
  reader.onload = function(e) {
    mammoth.extractRawText({ arrayBuffer: e.target.result }).then(async function(result) {
      var rawText = result.value.trim();
      if (!rawText) { previewEl.textContent = 'El archivo parece estar vacío.'; return; }

      previewEl.textContent = 'Analizando con OpenAI...';

      try {
        var res = await fetch(RENDER_URL + '/api/parse-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'collocations', rawText: rawText })
        });
        var json = await res.json();
        if (!json.ok || !json.data) throw new Error(json.error || 'Sin respuesta');

        _colParsed = json.data;
        previewEl.textContent = '✓ ' + _colParsed.length + ' frases listas para guardar';
        saveBtn.style.display = 'inline-block';

        // Preview de las primeras 3
        if (_colParsed.length > 0) {
          var preview = _colParsed.slice(0, 3).map(function(p) {
            return '<li><b>' + esc(p.es) + '</b> → ' + (Array.isArray(p.en) ? p.en.join(' ') : p.en) + '</li>';
          }).join('');
          previewEl.innerHTML = '✓ ' + _colParsed.length + ' frases detectadas por OpenAI:<ul style="margin:6px 0 0 16px;opacity:.8">' + preview + (_colParsed.length > 3 ? '<li style="opacity:.5">...y ' + (_colParsed.length - 3) + ' más</li>' : '') + '</ul>';
        }
      } catch(err) {
        previewEl.textContent = '✗ Error: ' + err.message;
      }
    });
  };
  reader.readAsArrayBuffer(file);
}

/* ── Guardar: genera pool con OpenAI y guarda frases en Supabase ─────────── */
async function colSaveAll() {
  if (!_colParsed.length) return;
  var btn = document.getElementById('col-save-btn');
  btn.textContent = 'Generando pool de palabras...';
  btn.disabled = true;

  try {
    // 1. Generar pool de 300 distractores con OpenAI
    var phrases = _colParsed.map(function(p){ return Array.isArray(p.en) ? p.en.join(' ') : p.en; });
    var poolRes = await fetch(RENDER_URL + '/api/generate-pool', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'collocations', context: 'colocaciones en inglés', phrases: phrases })
    });
    var poolData = await poolRes.json();
    var pool = poolData.words || [];

    // 2. Guardar pool en word_pools
    if (pool.length) {
      await _sb.from('word_pools').upsert(
        { context: 'collocations/general', words: pool, generated_at: new Date().toISOString() },
        { onConflict: 'context' }
      );
    }

    // 3. Insertar frases en collocation_phrases
    btn.textContent = 'Guardando frases...';
    var rows = _colParsed.map(function(r) { return Object.assign({ activa: true }, r); });
    var { error } = await _sb.from('collocation_phrases').insert(rows);
    if (error) throw new Error(error.message);

    _colParsed = [];
    document.getElementById('col-preview-count').textContent = pool.length ? '✓ Pool de ' + pool.length + ' palabras generado' : '✓ Guardado';
    document.getElementById('col-filename').textContent = 'Ningún archivo seleccionado';
    loadCollocationsAdmin();
  } catch(e) {
    alert('Error: ' + e.message);
  }

  btn.textContent = 'Guardar frases';
  btn.disabled = false;
  btn.style.display = 'none';
}

/* ── Toggle / Eliminar ──────────────────────────────────────────────────── */
async function colToggle(id, activa) {
  await _sb.from('collocation_phrases').update({ activa: activa }).eq('id', id);
  loadCollocationsAdmin();
}
async function colDelete(id) {
  if (!confirm('¿Eliminar esta frase?')) return;
  await _sb.from('collocation_phrases').delete().eq('id', id);
  loadCollocationsAdmin();
}
function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

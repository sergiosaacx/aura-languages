// ══════════════════════════════════════════════════════════════════════════
//  ADMIN — Flashcards (slang_cards)
//  Gestiona vocab slang desde el panel admin de Aura Languages
//  Parser: OpenAI GPT-4o-mini estructura el documento automáticamente
// ══════════════════════════════════════════════════════════════════════════

var _fcParsed = [];
var RENDER_URL = RENDER_URL || 'https://aura-stream-api.onrender.com';

function initFlashcardsAdmin() {
  loadSlangCards();
}

/* ── Cargar tarjetas desde Supabase ─────────────────────────────────────── */
async function loadSlangCards() {
  var list = document.getElementById('fc-list');
  if (!list) return;
  list.innerHTML = '<tr><td colspan="5" style="opacity:.5;padding:12px">Cargando...</td></tr>';
  var { data, error } = await _sb.from('slang_cards').select('*').order('id');
  if (error) { list.innerHTML = '<tr><td colspan="5" style="color:#f87">Error: ' + error.message + '</td></tr>'; return; }
  if (!data.length) { list.innerHTML = '<tr><td colspan="5" style="opacity:.5">Sin tarjetas aún. Sube un .docx para comenzar.</td></tr>'; return; }
  list.innerHTML = data.map(function(c) {
    return '<tr>' +
      '<td><b>' + esc(c.word) + '</b></td>' +
      '<td>' + esc(c.example || '') + '</td>' +
      '<td>' + esc(c.definition || '') + '</td>' +
      '<td><span style="padding:2px 8px;border-radius:6px;background:#7c3aed22;font-size:11px">' + esc(c.cat || '') + '</span></td>' +
      '<td style="display:flex;gap:8px;align-items:center">' +
        '<button onclick="fcToggle(' + c.id + ',' + !c.activa + ')" style="background:' + (c.activa ? '#22c55e22' : '#f8717122') + ';border:none;border-radius:6px;padding:3px 10px;cursor:pointer;color:' + (c.activa ? '#22c55e' : '#f87171') + ';font-size:12px">' + (c.activa ? 'Activa' : 'Inactiva') + '</button>' +
        '<button onclick="fcDelete(' + c.id + ')" style="background:#f8717118;border:none;border-radius:6px;padding:3px 8px;cursor:pointer;color:#f87171;font-size:12px">✕</button>' +
      '</td>' +
    '</tr>';
  }).join('');
  document.getElementById('fc-count').textContent = data.length + ' tarjetas';
}

/* ── Subir .docx — OpenAI parsea el contenido ───────────────────────────── */
function fcHandleFile(input) {
  var file = input.files[0];
  if (!file) return;
  var statusEl  = document.getElementById('fc-filename');
  var previewEl = document.getElementById('fc-preview-count');
  var saveBtn   = document.getElementById('fc-save-btn');

  statusEl.textContent = file.name;
  previewEl.textContent = 'Extrayendo texto...';
  saveBtn.style.display = 'none';
  _fcParsed = [];

  var reader = new FileReader();
  reader.onload = function(e) {
    mammoth.extractRawText({ arrayBuffer: e.target.result }).then(async function(result) {
      var rawText = result.value.trim();
      if (!rawText) { previewEl.textContent = 'El archivo parece estar vacío.'; return; }

      previewEl.textContent = 'Analizando con OpenAI...';

      try {
        var res = await fetch('https://aura-stream-api.onrender.com/api/parse-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'flashcards', rawText: rawText })
        });
        var json = await res.json();
        if (!json.ok || !json.data) throw new Error(json.error || 'Sin respuesta');

        _fcParsed = json.data;

        // Preview de las primeras 3
        var preview = _fcParsed.slice(0, 3).map(function(c) {
          return '<li><b>' + esc(c.word) + '</b>: ' + esc((c.definition||'').slice(0,60)) + '</li>';
        }).join('');
        previewEl.innerHTML = '✓ ' + _fcParsed.length + ' tarjetas detectadas por OpenAI:<ul style="margin:6px 0 0 16px;opacity:.8">' + preview + (_fcParsed.length > 3 ? '<li style="opacity:.5">...y ' + (_fcParsed.length - 3) + ' más</li>' : '') + '</ul>';
        saveBtn.style.display = 'inline-block';

      } catch(err) {
        previewEl.textContent = '✗ Error: ' + err.message;
      }
    });
  };
  reader.readAsArrayBuffer(file);
}

/* ── Guardar en Supabase ─────────────────────────────────────────────────── */
async function fcSaveAll() {
  if (!_fcParsed.length) return;
  var btn = document.getElementById('fc-save-btn');
  btn.textContent = 'Guardando...';
  btn.disabled = true;

  var rows = _fcParsed.map(function(r) { return Object.assign({ activa: true }, r); });
  var { error } = await _sb.from('slang_cards').insert(rows);
  if (error) {
    alert('Error: ' + error.message);
  } else {
    _fcParsed = [];
    document.getElementById('fc-preview-count').textContent = '✓ Guardado correctamente';
    document.getElementById('fc-filename').textContent = 'Ningún archivo seleccionado';
    loadSlangCards();
  }
  btn.textContent = 'Guardar tarjetas';
  btn.disabled = false;
  btn.style.display = 'none';
}

/* ── Toggle / Eliminar ──────────────────────────────────────────────────── */
async function fcToggle(id, activa) {
  await _sb.from('slang_cards').update({ activa: activa }).eq('id', id);
  loadSlangCards();
}
async function fcDelete(id) {
  if (!confirm('¿Eliminar esta tarjeta?')) return;
  await _sb.from('slang_cards').delete().eq('id', id);
  loadSlangCards();
}
function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

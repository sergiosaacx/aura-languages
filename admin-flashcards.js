// ══════════════════════════════════════════════════════════════════════════
//  ADMIN — Flashcards (slang_cards)
//  Gestiona el vocab slang desde el panel admin de Aura Languages
// ══════════════════════════════════════════════════════════════════════════

var _fcParsed = [];   // filas parseadas del .docx antes de guardar

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

/* ── Parsear .docx ──────────────────────────────────────────────────────── */
function fcHandleFile(input) {
  var file = input.files[0];
  if (!file) return;
  document.getElementById('fc-filename').textContent = file.name;
  var reader = new FileReader();
  reader.onload = function(e) {
    mammoth.extractRawText({ arrayBuffer: e.target.result }).then(function(result) {
      var lines = result.value.split('\n').map(function(l){ return l.trim(); }).filter(Boolean);
      _fcParsed = [];
      lines.forEach(function(line) {
        // Formato: WORD\tEXAMPLE\tDISTRACTOR\tDEFINITION\tCAT  (tab-separado)
        var parts = line.split('\t');
        if (parts.length >= 2) {
          _fcParsed.push({
            word:       parts[0] ? parts[0].trim() : '',
            example:    parts[1] ? parts[1].trim() : '',
            distractor: parts[2] ? parts[2].trim() : '',
            definition: parts[3] ? parts[3].trim() : '',
            cat:        parts[4] ? parts[4].trim() : ''
          });
        }
      });
      document.getElementById('fc-preview-count').textContent = _fcParsed.length + ' tarjetas detectadas';
      document.getElementById('fc-save-btn').style.display = _fcParsed.length ? 'inline-block' : 'none';
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
  var rows = _fcParsed.map(function(r){ return Object.assign({ activa: true }, r); });
  var { error } = await _sb.from('slang_cards').insert(rows);
  if (error) {
    alert('Error: ' + error.message);
  } else {
    _fcParsed = [];
    document.getElementById('fc-preview-count').textContent = '';
    document.getElementById('fc-filename').textContent = 'Ningún archivo seleccionado';
    loadSlangCards();
  }
  btn.textContent = 'Guardar tarjetas';
  btn.disabled = false;
  btn.style.display = 'none';
}

/* ── Toggle activa/inactiva ─────────────────────────────────────────────── */
async function fcToggle(id, activa) {
  await _sb.from('slang_cards').update({ activa: activa }).eq('id', id);
  loadSlangCards();
}

/* ── Eliminar ───────────────────────────────────────────────────────────── */
async function fcDelete(id) {
  if (!confirm('¿Eliminar esta tarjeta?')) return;
  await _sb.from('slang_cards').delete().eq('id', id);
  loadSlangCards();
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

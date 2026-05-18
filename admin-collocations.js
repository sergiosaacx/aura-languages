// ══════════════════════════════════════════════════════════════════════════
//  ADMIN — Collocations (collocation_phrases + word_pools)
//  Gestiona frases de colocaciones desde el panel admin de Aura Languages
// ══════════════════════════════════════════════════════════════════════════

var _colParsed = [];   // filas parseadas del .docx antes de guardar

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

/* ── Parsear .docx ──────────────────────────────────────────────────────── */
function colHandleFile(input) {
  var file = input.files[0];
  if (!file) return;
  document.getElementById('col-filename').textContent = file.name;
  var reader = new FileReader();
  reader.onload = function(e) {
    mammoth.extractRawText({ arrayBuffer: e.target.result }).then(function(result) {
      // Mammoth saca cada celda de la tabla en su propia línea (con líneas vacías entre ellas).
      // Formato tabla: ES | EN | CAT | HINT | TRAPS | EXPLANATION  → 6 líneas por frase.
      var lines = result.value.split('\n').map(function(l){ return l.trim(); }).filter(Boolean);
      // Buscar donde empieza la data (primera línea con comillas o primera frase)
      var start = 0;
      for (var i = 0; i < lines.length; i++) {
        // Saltar encabezados de tabla (Español, Ingles, Categoria, Pista, Trampas, Explicacion)
        if (lines[i].charAt(0) === '"' || (lines[i].length > 2 && i > 3)) { start = i; break; }
      }
      // Agrupar en chunks de 6 líneas = 1 frase
      var dataLines = lines.slice(start);
      _colParsed = [];
      for (var j = 0; j < dataLines.length; j += 6) {
        var chunk = dataLines.slice(j, j + 6);
        if (chunk.length < 2) continue;
        var enWords  = (chunk[1] || '').trim().split(/\s+/).filter(Boolean);
        var trapsRaw = (chunk[4] || '').split(',').map(function(w){ return w.trim(); }).filter(Boolean);
        _colParsed.push({
          es:          (chunk[0] || '').trim(),
          en:          enWords,
          cat:         (chunk[2] || '').trim(),
          hint:        (chunk[3] || '').trim(),
          traps:       trapsRaw,
          explanation: (chunk[5] || '').trim(),
          tag:         (chunk[2] || '').trim()
        });
      }
      document.getElementById('col-preview-count').textContent = _colParsed.length + ' frases detectadas';
      document.getElementById('col-save-btn').style.display = _colParsed.length ? 'inline-block' : 'none';
    });
  };
  reader.readAsArrayBuffer(file);
}

/* ── Guardar: genera pool con OpenAI y luego inserta en Supabase ─────────── */
async function colSaveAll() {
  if (!_colParsed.length) return;
  var btn = document.getElementById('col-save-btn');
  btn.textContent = 'Generando pool de palabras...';
  btn.disabled = true;

  try {
    // 1. Generar pool de 300 distractores con OpenAI
    var phrases = _colParsed.map(function(p){ return p.en.join(' '); });
    var poolRes = await fetch('https://aura-stream-api.onrender.com/api/generate-pool', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'collocations', context: 'colocaciones en inglés', phrases: phrases })
    });
    var poolData = await poolRes.json();
    var pool = poolData.words || [];

    // 2. Guardar pool en word_pools
    if (pool.length) {
      await _sb.from('word_pools').upsert({ context: 'collocations/general', words: pool, generated_at: new Date().toISOString() }, { onConflict: 'context' });
    }

    // 3. Insertar frases en collocation_phrases
    btn.textContent = 'Guardando frases...';
    var rows = _colParsed.map(function(r){ return Object.assign({ activa: true }, r); });
    var { error } = await _sb.from('collocation_phrases').insert(rows);
    if (error) throw new Error(error.message);

    _colParsed = [];
    document.getElementById('col-preview-count').textContent = pool.length ? '✓ Pool de ' + pool.length + ' palabras generado' : '';
    document.getElementById('col-filename').textContent = 'Ningún archivo seleccionado';
    loadCollocationsAdmin();
  } catch(e) {
    alert('Error: ' + e.message);
  }

  btn.textContent = 'Guardar frases';
  btn.disabled = false;
  btn.style.display = 'none';
}

/* ── Toggle activa/inactiva ─────────────────────────────────────────────── */
async function colToggle(id, activa) {
  await _sb.from('collocation_phrases').update({ activa: activa }).eq('id', id);
  loadCollocationsAdmin();
}

/* ── Eliminar ───────────────────────────────────────────────────────────── */
async function colDelete(id) {
  if (!confirm('¿Eliminar esta frase?')) return;
  await _sb.from('collocation_phrases').delete().eq('id', id);
  loadCollocationsAdmin();
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

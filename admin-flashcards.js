/* admin-flashcards.js */
(function () {
  'use strict';
  var _parsed    = [];
  var _allCards  = [];
  var _page      = 0;
  var _pageSize  = 50;
  var _filterCat   = '';
  var _filterDiff  = '';
  var _filterLabel = '';
  var _filterWord  = '';

  function _getSb()  { return window._aura && window._aura.sb; }
  function _getKey() { return localStorage.getItem('_aura_oai_key') || ''; }

  async function _oaiCall(prompt, maxTokens) {
    var key = _getKey();
    if (!key) throw new Error('OpenAI key no configurada.');
    var res = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},
      body:JSON.stringify({model:'gpt-4o-mini',messages:[{role:'user',content:prompt}],temperature:0.2,max_tokens:maxTokens||16000})
    });
    var data = await res.json();
    if (data.error) throw new Error(data.error.message);
    var text  = data.choices[0].message.content.trim();
    var match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('OpenAI no devolvio JSON valido:\n' + text.slice(0,300));
    return JSON.parse(match[0]);
  }

  window.initFlashcardsAdmin = function () { _refreshKeyStatus(); _injectFilterUI(); _loadExisting(); };

  function _refreshKeyStatus() {
    var el = document.getElementById('oai-key-status');
    if (!el) return;
    var stored = _getKey();
    el.textContent = stored ? 'Key configurada' : 'Sin key — OpenAI no funcionara';
    el.style.color  = stored ? '#4ade80' : '#f97316';
  }

  window.saveOaiKey = function () {
    var input = document.getElementById('oai-key-input');
    var val   = input ? input.value.trim() : '';
    if (!val.startsWith('sk-')) { alert('Ingresa un API key valido (empieza con sk-)'); return; }
    localStorage.setItem('_aura_oai_key', val);
    if (input) input.value = '';
    _refreshKeyStatus();
  };

  /* ────────── FILTER UI ────────── */
  function _injectFilterUI() {
    if (document.getElementById('fc-filter-bar')) return;
    var tbody = document.getElementById('fc-list');
    if (!tbody) return;
    var table = tbody.closest('table');
    var tableWrapper = table ? table.parentElement : null;
    if (!tableWrapper) return;

    var bar = document.createElement('div');
    bar.id = 'fc-filter-bar';
    bar.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:12px 0;padding:12px 14px;background:#ffffff08;border-radius:10px;border:1px solid #ffffff0f;';
    bar.innerHTML =
      '<input id="fc-f-word" placeholder="Buscar palabra..." '
      + 'style="flex:1;min-width:130px;background:#ffffff10;border:1px solid #ffffff22;border-radius:8px;'
      + 'padding:6px 12px;color:#f0ede6;font-size:13px;outline:none;" />'
      + '<select id="fc-f-cat" style="background:#0a0a1a;border:1px solid #ffffff22;border-radius:8px;padding:6px 12px;color:#f0ede6;font-size:13px;cursor:pointer;">'
      + '<option value="">Todas las categorias</option>'
      + '<option value="slang">Slang</option>'
      + '<option value="idioms">Idioms</option>'
      + '<option value="phrasal_verbs">Phrasal Verbs</option>'
      + '<option value="business">Business</option>'
      + '</select>'
      + '<select id="fc-f-diff" style="background:#0a0a1a;border:1px solid #ffffff22;border-radius:8px;padding:6px 12px;color:#f0ede6;font-size:13px;cursor:pointer;">'
      + '<option value="">Todas las dificultades</option>'
      + '<option value="easy">Easy</option>'
      + '<option value="med">Med</option>'
      + '<option value="hard">Hard</option>'
      + '<option value="leg">Legendary</option>'
      + '</select>'
      + '<select id="fc-f-label" style="background:#0a0a1a;border:1px solid #ffffff22;border-radius:8px;padding:6px 12px;color:#f0ede6;font-size:13px;cursor:pointer;">'
      + '<option value="">Todas las etiquetas</option>'
      + '</select>'
      + '<button onclick="fcClearFilters()" style="background:#7c3aed33;border:1px solid #7c3aed66;border-radius:8px;'
      + 'padding:6px 14px;color:#c084fc;font-size:13px;cursor:pointer;">Limpiar</button>';

    tableWrapper.parentElement.insertBefore(bar, tableWrapper);

    var pager = document.createElement('div');
    pager.id = 'fc-pager';
    pager.style.cssText = 'display:flex;gap:10px;align-items:center;justify-content:center;margin:10px 0 4px;';
    tableWrapper.parentElement.insertBefore(pager, tableWrapper.nextSibling);

    document.getElementById('fc-f-word').addEventListener('input', function () {
      _filterWord = this.value.toLowerCase(); _page = 0; _applyFiltersAndRender();
    });
    document.getElementById('fc-f-cat').addEventListener('change', function () {
      _filterCat = this.value; _page = 0; _applyFiltersAndRender();
    });
    document.getElementById('fc-f-diff').addEventListener('change', function () {
      _filterDiff = this.value; _page = 0; _applyFiltersAndRender();
    });
    document.getElementById('fc-f-label').addEventListener('change', function () {
      _filterLabel = this.value; _page = 0; _applyFiltersAndRender();
    });
  }

  window.fcClearFilters = function () {
    _filterCat = ''; _filterDiff = ''; _filterLabel = ''; _filterWord = ''; _page = 0;
    var fw = document.getElementById('fc-f-word');  if (fw) fw.value = '';
    var fc = document.getElementById('fc-f-cat');   if (fc) fc.value = '';
    var fd = document.getElementById('fc-f-diff');  if (fd) fd.value = '';
    var fl = document.getElementById('fc-f-label'); if (fl) fl.value = '';
    _applyFiltersAndRender();
  };

  function _updateLabelDropdown(cards) {
    var sel = document.getElementById('fc-f-label');
    if (!sel) return;
    var seen = {}, labels = [];
    cards.forEach(function (c) { var l = (c.label || '').trim(); if (l && !seen[l]) { seen[l] = 1; labels.push(l); } });
    labels.sort();
    var current = sel.value;
    sel.innerHTML = '<option value="">Todas las etiquetas</option>'
      + labels.map(function (l) { return '<option value="' + _esc(l) + '">' + _esc(l) + '</option>'; }).join('');
    if (current) sel.value = current;
  }

  function _applyFiltersAndRender() {
    var filtered = _allCards.filter(function (c) {
      if (_filterCat   && c.cat !== _filterCat)             return false;
      if (_filterDiff  && c.difficulty !== _filterDiff)     return false;
      if (_filterLabel && (c.label || '') !== _filterLabel) return false;
      if (_filterWord  && !(c.word || '').toLowerCase().includes(_filterWord)) return false;
      return true;
    });
    var countEl = document.getElementById('fc-count');
    if (countEl) countEl.textContent = filtered.length + ' de ' + _allCards.length + ' tarjetas';
    _renderTablePage(filtered);
    _renderPager(filtered.length);
  }

  function _renderTablePage(filtered) {
    var tbody = document.getElementById('fc-list');
    if (!tbody) return;
    var slice = filtered.slice(_page * _pageSize, (_page + 1) * _pageSize);
    if (!slice.length) {
      tbody.innerHTML = '<tr><td colspan="6" style="padding:20px;text-align:center;opacity:.5">Sin resultados</td></tr>';
      return;
    }
    var dc = { easy:'#4ade80', med:'#facc15', hard:'#f97316', leg:'#f87171' };
    tbody.innerHTML = slice.map(function (c, i) {
      var col = dc[c.difficulty] || '#a855f7';
      return '<tr style="background:' + (i % 2 === 0 ? 'transparent' : '#ffffff08') + '">'
        + '<td style="padding:8px 12px;font-weight:700;color:#c084fc">' + _esc(c.word) + '</td>'
        + '<td style="padding:8px 12px;font-size:12px;opacity:.5" colspan="2">guardado</td>'
        + '<td style="padding:8px 12px"><span style="background:#7c3aed33;color:#a855f7;padding:2px 8px;border-radius:20px;font-size:11px">' + _esc(c.cat) + '</span></td>'
        + '<td style="padding:8px 12px"><span style="color:' + col + ';font-size:11px;font-weight:700">' + _esc(c.difficulty || '') + '</span></td>'
        + '<td style="padding:8px 12px"><button onclick="fcDelete(\'' + c.id + '\')" '
        + 'style="background:#7f1d1d22;color:#f87171;border:1px solid #7f1d1d44;border-radius:6px;padding:3px 10px;cursor:pointer;font-size:11px">Borrar</button></td>'
        + '</tr>';
    }).join('');
  }

  function _renderPager(total) {
    var pager = document.getElementById('fc-pager');
    if (!pager) return;
    var totalPages = Math.max(1, Math.ceil(total / _pageSize));
    if (totalPages <= 1) { pager.innerHTML = ''; return; }
    var start = _page * _pageSize + 1;
    var end   = Math.min((_page + 1) * _pageSize, total);
    var btn = 'background:#7c3aed33;border:1px solid #7c3aed66;border-radius:8px;padding:5px 14px;color:#c084fc;font-size:13px;cursor:pointer;';
    var dis = 'background:#ffffff08;border:1px solid #ffffff11;border-radius:8px;padding:5px 14px;color:#ffffff33;font-size:13px;cursor:default;';
    pager.innerHTML =
      '<button style="' + (_page === 0 ? dis : btn) + '" ' + (_page === 0 ? 'disabled' : '') + ' onclick="fcPagePrev()">← Anterior</button>'
      + '<span style="color:#a0a0b8;font-size:13px;padding:0 10px">' + start + ' – ' + end + ' de ' + total + '</span>'
      + '<button style="' + (_page >= totalPages - 1 ? dis : btn) + '" ' + (_page >= totalPages - 1 ? 'disabled' : '') + ' onclick="fcPageNext()">Siguiente →</button>';
  }

  window.fcPagePrev = function () { if (_page > 0) { _page--; _applyFiltersAndRender(); } };
  window.fcPageNext = function () { _page++; _applyFiltersAndRender(); };

  /* ────────── SECTIONS & PROMPTS ────────── */
  function _splitBySections(text) {
    var catMap = [
      { re:/\bBUSINESS\b/i,            cat:'business' },
      { re:/\bPHRASAL[\s_-]*VERBS?\b/i, cat:'phrasal_verbs' },
      { re:/\bIDIOMS?\b/i,             cat:'idioms' },
      { re:/\bSLANG\b/i,              cat:'slang' }
    ];
    var hits = [];
    catMap.forEach(function (cm) { var idx = text.search(cm.re); if (idx >= 0) hits.push({ idx:idx, cat:cm.cat }); });
    hits.sort(function (a, b) { return a.idx - b.idx; });
    if (hits.length < 2) {
      var lines = text.split('\n'), size = Math.ceil(lines.length / 4), out = [];
      for (var i = 0; i < 4; i++) { var c = lines.slice(i * size, (i + 1) * size).join('\n').trim(); if (c) out.push({ text:c, cat:null }); }
      return out;
    }
    var sections = [];
    for (var j = 0; j < hits.length; j++) {
      var start = hits[j].idx, end = j + 1 < hits.length ? hits[j + 1].idx : text.length;
      var chunk = text.slice(start, end).trim();
      if (chunk) sections.push({ text:chunk, cat:hits[j].cat });
    }
    return sections;
  }

  function _buildPrompt(text, forcedCat) {
    var catLine = forcedCat
      ? 'IMPORTANTE: Todas las tarjetas de este bloque son de categoria "' + forcedCat + '". Usa ese valor exacto en "cat" para TODAS.\n\n'
      : '';
    return 'Eres un experto en linguistica y diseno de material didactico para ingles.\n\n'
      + catLine
      + 'Extrae TODAS las tarjetas del texto y devuelve un array JSON con:\n'
      + '- "word": expresion en ingles\n'
      + '- "example": oracion de ejemplo en ingles\n'
      + '- "definition": significado en ESPANOL, max 20 palabras\n'
      + '- "label": etiqueta corta en ingles, max 3 palabras\n'
      + '- "cat": exactamente uno de: "slang","idioms","phrasal_verbs","business"\n'
      + '- "difficulty": exactamente uno de: "easy","med","hard","leg"\n\n'
      + 'Devuelve SOLO el array JSON. No omitas ninguna tarjeta.\n\n'
      + 'Texto:\n' + text + '\n\nArray JSON:';
  }

  /* ────────── FILE UPLOAD ────────── */
  window.fcHandleFile = async function (input) {
    var file = input.files[0];
    if (!file) return;
    document.getElementById('fc-filename').textContent = file.name;
    document.getElementById('fc-preview-count').textContent = 'Extrayendo texto...';
    document.getElementById('fc-save-btn').style.display = 'none';
    try {
      var ab     = await file.arrayBuffer();
      var result = await mammoth.extractRawText({ arrayBuffer:ab });
      var raw    = result.value.trim();
      if (!raw) { document.getElementById('fc-preview-count').textContent = 'Documento vacio'; return; }
      var sections = _splitBySections(raw);
      var allCards = [];
      for (var i = 0; i < sections.length; i++) {
        document.getElementById('fc-preview-count').textContent = 'Analizando seccion ' + (i + 1) + ' de ' + sections.length + '...';
        var batch = await _oaiCall(_buildPrompt(sections[i].text, sections[i].cat), 16000);
        if (sections[i].cat) batch = batch.map(function (c) { c.cat = sections[i].cat; return c; });
        allCards = allCards.concat(batch);
      }
      allCards = allCards.map(function (c) { c.distractor = ''; c.distractors = []; return c; });
      _parsed = allCards;
      _renderPreview(allCards);
    } catch (err) {
      document.getElementById('fc-preview-count').textContent = 'Error: ' + err.message;
      console.error(err);
    }
  };

  function _renderPreview(cards) {
    var countEl   = document.getElementById('fc-count');
    var previewEl = document.getElementById('fc-preview-count');
    var saveBtn   = document.getElementById('fc-save-btn');
    var tbody     = document.getElementById('fc-list');
    if (countEl)   countEl.textContent   = cards.length + ' tarjetas (vista previa)';
    if (previewEl) previewEl.textContent = cards.length + ' tarjetas listas para guardar';
    if (saveBtn)   saveBtn.style.display = 'inline-flex';
    if (tbody) {
      tbody.innerHTML = cards.map(function (c, i) {
        var dc = { easy:'#4ade80', med:'#facc15', hard:'#f97316', leg:'#f87171' };
        var col = dc[c.difficulty] || '#a855f7';
        return '<tr style="background:' + (i % 2 === 0 ? 'transparent' : '#ffffff08') + '">'
          + '<td style="padding:8px 12px;font-weight:700;color:#c084fc">' + _esc(c.word) + '</td>'
          + '<td style="padding:8px 12px;font-size:12px">' + _esc(c.example) + '</td>'
          + '<td style="padding:8px 12px;font-size:12px">' + _esc(c.definition) + '</td>'
          + '<td style="padding:8px 12px"><span style="background:#7c3aed33;color:#a855f7;padding:2px 8px;border-radius:20px;font-size:11px">' + _esc(c.cat) + '</span></td>'
          + '<td style="padding:8px 12px"><span style="color:' + col + ';font-size:11px;font-weight:700">' + _esc(c.difficulty || 'med') + '</span></td>'
          + '<td style="padding:8px 12px"><span style="color:#4ade80;font-size:12px">OK</span></td>'
          + '</tr>';
      }).join('');
    }
  }

  /* ────────── DISTRACTORS ────────── */
  async function _generateDistractors(cards, progressCb) {
    var BATCH = 12, result = {};
    for (var i = 0; i < cards.length; i += BATCH) {
      var batch = cards.slice(i, i + BATCH);
      if (progressCb) progressCb(i, cards.length);
      var items = batch.map(function (c) {
        return '{"id":' + JSON.stringify(c.id) + ',"word":' + JSON.stringify(c.word) + ',"definition":' + JSON.stringify(c.definition) + '}';
      }).join(',\n');
      var prompt = 'Dado este array de expresiones en ingles, genera 10 significados FALSOS en ESPANOL para cada una.\n'
        + 'Deben: estar en ESPANOL, parecer plausibles, relacionarse con las palabras o contexto, max 10 palabras cada uno.\n'
        + 'Devuelve SOLO un array JSON donde cada elemento tiene "id" y "distractors" (array de 10 strings en ESPANOL).\n\n'
        + 'Input:\n[' + items + ']\n\nArray JSON:';
      try {
        var br = await _oaiCall(prompt, 6000);
        br.forEach(function (r) { if (r.id && Array.isArray(r.distractors)) result[r.id] = r.distractors.slice(0, 10); });
      } catch (e) { console.warn('Lote distractores:', e.message); }
    }
    return result;
  }

  /* ────────── SAVE ────────── */
  window.fcSaveAll = async function () {
    if (!_parsed.length) return;
    var sb = _getSb();
    if (!sb) { alert('Supabase no disponible'); return; }
    var saveBtn   = document.getElementById('fc-save-btn');
    var previewEl = document.getElementById('fc-preview-count');
    if (saveBtn) { saveBtn.textContent = 'Guardando...'; saveBtn.disabled = true; }
    var validCats  = ['slang','idioms','phrasal_verbs','business'];
    var validDiffs = ['easy','med','hard','leg'];
    var rows = _parsed.map(function (c) {
      return {
        word:       (c.word       || '').trim(),
        example:    (c.example    || '').trim(),
        distractor: '', distractors: [],
        definition: (c.definition || '').trim(),
        label:      (c.label      || '').trim() || 'Slang',
        cat:        validCats.includes(c.cat)       ? c.cat       : 'slang',
        difficulty: validDiffs.includes(c.difficulty) ? c.difficulty : 'med'
      };
    }).filter(function (r) { return r.word; });
    try {
      if (previewEl) previewEl.textContent = 'Verificando duplicados...';
      var words    = rows.map(function (r) { return r.word; });
      var existRes = await sb.from('slang_cards').select('id,word').in('word', words);
      var existingMap = {};
      (existRes.data || []).forEach(function (e) { existingMap[e.word] = e.id; });
      var toInsert   = rows.filter(function (r) { return !existingMap[r.word]; });
      var toUpdate   = rows.filter(function (r) { return  existingMap[r.word]; });
      var savedCards = [];
      if (toInsert.length) {
        var _admLangIns = window.admLang || 'en';
        toInsert = toInsert.map(function(r){ return Object.assign({language: _admLangIns}, r); });
        var insRes = await sb.from('slang_cards').insert(toInsert).select('id,word,definition');
        if (insRes.error) throw new Error('Insert: ' + insRes.error.message);
        savedCards = savedCards.concat(insRes.data || []);
      }
      if (toUpdate.length) {
        var upOps = toUpdate.map(function (r) {
          return sb.from('slang_cards').update({
            example:r.example, definition:r.definition, label:r.label,
            cat:r.cat, difficulty:r.difficulty, distractor:'', distractors:[]
          }).eq('id', existingMap[r.word]).select('id,word,definition');
        });
        var upRes = await Promise.all(upOps);
        upRes.forEach(function (res) { if (res.data) savedCards = savedCards.concat(res.data); });
      }
      if (previewEl) previewEl.textContent = toInsert.length + ' nuevas + ' + toUpdate.length + ' actualizadas. Generando distractores...';
      var dmap = await _generateDistractors(savedCards, function (done, total) {
        if (previewEl) previewEl.textContent = 'Generando distractores: ' + done + ' / ' + total + '...';
      });
      var dops = Object.keys(dmap).map(function (id) {
        return sb.from('slang_cards').update({ distractors:dmap[id] }).eq('id', id);
      });
      await Promise.all(dops);
      if (previewEl) previewEl.textContent = toInsert.length + ' nuevas + ' + toUpdate.length + ' actualizadas — distractores en Espanol listos';
    } catch (err) {
      alert('Error: ' + err.message);
      console.error(err);
    }
    if (saveBtn) { saveBtn.style.display = 'none'; saveBtn.textContent = 'Guardar tarjetas'; saveBtn.disabled = false; }
    _parsed = [];
    _loadExisting();
  };

  /* ────────── LOAD EXISTING ────────── */
  async function _loadExisting() {
    var sb    = _getSb(); if (!sb) return;
    var tbody = document.getElementById('fc-list'); if (!tbody) return;
    var _admLang = window.admLang || 'en';
    var res = await sb.from('slang_cards')
      .select('id,word,label,cat,difficulty,created_at')
      .eq('language', _admLang)
      .order('created_at', { ascending:false })
      .limit(2000);
    // Si falla por columna inexistente, reintentar sin filtro de idioma
    if (res.error && res.error.message && res.error.message.includes('language')) {
      res = await sb.from('slang_cards')
        .select('id,word,label,cat,difficulty,created_at')
        .order('created_at', { ascending:false })
        .limit(2000);
    }
    if (res.error || !res.data || !res.data.length) {
      if (!_parsed.length) tbody.innerHTML = '<tr><td colspan="6" style="padding:20px;text-align:center;opacity:.5">No hay tarjetas aun</td></tr>';
      return;
    }
    if (_parsed.length) return;
    _allCards = res.data;
    _page     = 0;
    _updateLabelDropdown(_allCards);
    _applyFiltersAndRender();
  }

  /* ────────── DELETE ────────── */
  window.fcDelete = async function (id) {
    if (!confirm('Eliminar esta tarjeta?')) return;
    var sb  = _getSb(); if (!sb) return;
    var res = await sb.from('slang_cards').delete().eq('id', id);
    if (res.error) { alert('Error: ' + res.error.message); return; }
    _allCards = _allCards.filter(function (c) { return c.id !== id; });
    _applyFiltersAndRender();
  };

  function _esc(str) {
    return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
})();

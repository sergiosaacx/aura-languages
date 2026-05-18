/* admin-flashcards.js — Slang Cards con OpenAI directo (key en localStorage) */
(function () {
  'use strict';

  var _parsed = [];

  function _getSb()  { return window._aura && window._aura.sb; }
  function _getKey() { return localStorage.getItem('_aura_oai_key') || ''; }

  /* OpenAI caller */
  async function _oaiCall(prompt, maxTokens) {
    var key = _getKey();
    if (!key) throw new Error('OpenAI key no configurada. Ingresa tu key en el campo de arriba.');
    var res = await fetch('https://api.openai.com/v1/chat/completions', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
      body   : JSON.stringify({
        model      : 'gpt-4o-mini',
        messages   : [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens : maxTokens || 16000
      })
    });
    var data = await res.json();
    if (data.error) throw new Error(data.error.message);
    var text  = data.choices[0].message.content.trim();
    var match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('OpenAI no devolvio JSON valido:\n' + text.slice(0, 300));
    return JSON.parse(match[0]);
  }

  /* Init */
  window.initFlashcardsAdmin = function () {
    _refreshKeyStatus();
    _loadExisting();
  };

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
    if (!val.startsWith('sk-')) {
      alert('Ingresa un API key de OpenAI valido (empieza con sk-)');
      return;
    }
    localStorage.setItem('_aura_oai_key', val);
    if (input) input.value = '';
    _refreshKeyStatus();
  };

  /* Split text into N roughly-equal chunks by lines */
  function _splitIntoChunks(text, n) {
    var lines  = text.split('\n');
    var size   = Math.ceil(lines.length / n);
    var chunks = [];
    for (var i = 0; i < n; i++) {
      var chunk = lines.slice(i * size, (i + 1) * size).join('\n').trim();
      if (chunk) chunks.push(chunk);
    }
    return chunks;
  }

  /* Extraction prompt — NO distractors (se generan despues por workflow) */
  function _buildPrompt(text) {
    return 'Eres un experto en linguistica y diseno de material didactico para ingles.\n\n' +
      'El siguiente texto viene de un documento Word con flashcards de vocabulario en ingles.\n' +
      'Extrae TODAS las tarjetas visibles y devuelve un array JSON con exactamente estos campos:\n' +
      '- "word": la palabra o expresion en ingles\n' +
      '- "example": oracion de ejemplo en ingles (si no hay, genera una natural)\n' +
      '- "definition": significado correcto en ESPANOL, max 20 palabras\n' +
      '- "label": etiqueta corta del tipo de expresion en ingles, max 3 palabras (ej: "Gen Z Slang", "Business Idiom", "Phrasal Verb")\n' +
      '- "cat": EXACTAMENTE uno de: "slang", "idioms", "phrasal_verbs", "business"\n' +
      '- "difficulty": EXACTAMENTE uno de: "easy", "med", "hard", "leg"\n\n' +
      'Reglas:\n' +
      '1. Devuelve SOLO el array JSON sin texto adicional ni markdown\n' +
      '2. definition debe estar en ESPANOL\n' +
      '3. No omitas ninguna tarjeta visible en el texto\n\n' +
      'Texto:\n' + text + '\n\nArray JSON:';
  }

  /* File handler — procesa en 4 lotes para no exceder limite de tokens */
  window.fcHandleFile = async function (input) {
    var file = input.files[0];
    if (!file) return;
    document.getElementById('fc-filename').textContent = file.name;
    document.getElementById('fc-preview-count').textContent = 'Extrayendo texto...';
    document.getElementById('fc-save-btn').style.display = 'none';

    try {
      var ab     = await file.arrayBuffer();
      var result = await mammoth.extractRawText({ arrayBuffer: ab });
      var raw    = result.value.trim();
      if (!raw) {
        document.getElementById('fc-preview-count').textContent = 'Documento vacio';
        return;
      }

      var chunks   = _splitIntoChunks(raw, 4);
      var allCards = [];

      for (var i = 0; i < chunks.length; i++) {
        document.getElementById('fc-preview-count').textContent =
          'Analizando lote ' + (i + 1) + ' de ' + chunks.length + '...';
        var batch = await _oaiCall(_buildPrompt(chunks[i]), 16000);
        allCards  = allCards.concat(batch);
      }

      /* Normalizar: distractor y distractors vacios — se generan luego por workflow */
      allCards = allCards.map(function (c) {
        c.distractor  = c.distractor  || '';
        c.distractors = Array.isArray(c.distractors) ? c.distractors : [];
        return c;
      });

      _parsed = allCards;
      _renderPreview(allCards);

    } catch (err) {
      document.getElementById('fc-preview-count').textContent = 'Error: ' + err.message;
      console.error(err);
    }
  };

  /* Preview */
  function _renderPreview(cards) {
    var countEl   = document.getElementById('fc-count');
    var previewEl = document.getElementById('fc-preview-count');
    var saveBtn   = document.getElementById('fc-save-btn');
    var tbody     = document.getElementById('fc-list');

    if (countEl)   countEl.textContent   = cards.length + ' tarjetas';
    if (previewEl) previewEl.textContent = cards.length + ' tarjetas listas para guardar';
    if (saveBtn)   saveBtn.style.display = 'inline-flex';

    if (tbody) {
      tbody.innerHTML = cards.map(function (c, i) {
        var diffColors = { easy: '#4ade80', med: '#facc15', hard: '#f97316', leg: '#f87171' };
        var diffColor  = diffColors[c.difficulty] || '#a855f7';
        return '<tr style="background:' + (i % 2 === 0 ? 'transparent' : '#ffffff08') + '">' +
          '<td style="padding:8px 12px;font-weight:700;color:#c084fc">'  + _esc(c.word)       + '</td>' +
          '<td style="padding:8px 12px;font-size:12px">'                 + _esc(c.example)    + '</td>' +
          '<td style="padding:8px 12px;font-size:12px">'                 + _esc(c.definition) + '</td>' +
          '<td style="padding:8px 12px"><span style="background:#7c3aed33;color:#a855f7;padding:2px 8px;border-radius:20px;font-size:11px">' + _esc(c.cat) + '</span></td>' +
          '<td style="padding:8px 12px"><span style="color:' + diffColor + ';font-size:11px;font-weight:700">' + _esc(c.difficulty || 'med') + '</span></td>' +
          '<td style="padding:8px 12px"><span style="color:#4ade80;font-size:12px">OK</span></td>' +
          '</tr>';
      }).join('');
    }
  }

  /* Save */
  window.fcSaveAll = async function () {
    if (!_parsed.length) return;
    var sb = _getSb();
    if (!sb) { alert('Supabase no disponible'); return; }

    var saveBtn = document.getElementById('fc-save-btn');
    if (saveBtn) { saveBtn.textContent = 'Guardando...'; saveBtn.disabled = true; }

    var validCats  = ['slang', 'idioms', 'phrasal_verbs', 'business'];
    var validDiffs = ['easy', 'med', 'hard', 'leg'];

    var rows = _parsed.map(function (c) {
      return {
        word       : (c.word       || '').trim(),
        example    : (c.example    || '').trim(),
        distractor : (c.distractor || '').trim(),
        distractors: Array.isArray(c.distractors) ? c.distractors : [],
        definition : (c.definition || '').trim(),
        label      : (c.label || '').trim() || 'Slang',
        cat        : validCats.includes(c.cat)        ? c.cat        : 'slang',
        difficulty : validDiffs.includes(c.difficulty) ? c.difficulty : 'med'
      };
    });

    var { error } = await sb.from('slang_cards').insert(rows);

    if (error) {
      alert('Error al guardar: ' + error.message);
      if (saveBtn) { saveBtn.textContent = 'Guardar tarjetas'; saveBtn.disabled = false; }
      return;
    }

    document.getElementById('fc-preview-count').textContent = rows.length + ' tarjetas guardadas';
    if (saveBtn) { saveBtn.style.display = 'none'; saveBtn.textContent = 'Guardar tarjetas'; saveBtn.disabled = false; }
    _parsed = [];
    _loadExisting();
  };

  /* Load existing */
  async function _loadExisting() {
    var sb    = _getSb();
    if (!sb) return;
    var tbody = document.getElementById('fc-list');
    if (!tbody) return;

    var { data, error } = await sb.from('slang_cards')
      .select('id,word,cat,difficulty,created_at')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error || !data || !data.length) {
      if (!_parsed.length) tbody.innerHTML = '<tr><td colspan="6" style="padding:20px;text-align:center;opacity:.5">No hay tarjetas aun</td></tr>';
      return;
    }

    if (_parsed.length) return;

    var countEl = document.getElementById('fc-count');
    if (countEl) countEl.textContent = data.length + ' tarjetas';

    var diffColors = { easy: '#4ade80', med: '#facc15', hard: '#f97316', leg: '#f87171' };
    tbody.innerHTML = data.map(function (c, i) {
      var diffColor = diffColors[c.difficulty] || '#a855f7';
      return '<tr style="background:' + (i % 2 === 0 ? 'transparent' : '#ffffff08') + '">' +
        '<td style="padding:8px 12px;font-weight:700;color:#c084fc">' + _esc(c.word) + '</td>' +
        '<td style="padding:8px 12px;font-size:12px;opacity:.5" colspan="2">guardado</td>' +
        '<td style="padding:8px 12px"><span style="background:#7c3aed33;color:#a855f7;padding:2px 8px;border-radius:20px;font-size:11px">' + _esc(c.cat) + '</span></td>' +
        '<td style="padding:8px 12px"><span style="color:' + diffColor + ';font-size:11px;font-weight:700">' + _esc(c.difficulty || '') + '</span></td>' +
        '<td style="padding:8px 12px"><button onclick="fcDelete(\'' + c.id + '\')" style="background:#7f1d1d22;color:#f87171;border:1px solid #7f1d1d44;border-radius:6px;padding:3px 10px;cursor:pointer;font-size:11px">Borrar</button></td>' +
        '</tr>';
    }).join('');
  }

  /* Delete */
  window.fcDelete = async function (id) {
    if (!confirm('Eliminar esta tarjeta?')) return;
    var sb = _getSb();
    if (!sb) return;
    var { error } = await sb.from('slang_cards').delete().eq('id', id);
    if (error) { alert('Error: ' + error.message); return; }
    _loadExisting();
  };

  function _esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

})();

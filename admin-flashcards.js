/* admin-flashcards.js — Slang Cards con OpenAI directo (key en localStorage) */
(function () {
  'use strict';

  var _parsed = [];

  function _getSb()  { return window._aura && window._aura.sb; }
  function _getKey() { return localStorage.getItem('_aura_oai_key') || ''; }

  /* ── OpenAI caller ── */
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
        max_tokens : maxTokens || 6000
      })
    });
    var data = await res.json();
    if (data.error) throw new Error(data.error.message);
    var text  = data.choices[0].message.content.trim();
    var match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('OpenAI no devolvio JSON valido:\n' + text.slice(0, 300));
    return JSON.parse(match[0]);
  }

  /* ── Init (called by showTab) ── */
  window.initFlashcardsAdmin = function () {
    _refreshKeyStatus();
    _loadExisting();
  };

  function _refreshKeyStatus() {
    var el = document.getElementById('oai-key-status');
    if (!el) return;
    var stored = _getKey();
    el.textContent = stored ? '✓ Key configurada' : '⚠ Sin key — OpenAI no funcionara';
    el.style.color  = stored ? '#4ade80' : '#f97316';
  }

  /* ── Save key helper (called from admin.html inline) ── */
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

  /* ── File handler ── */
  window.fcHandleFile = async function (input) {
    var file = input.files[0];
    if (!file) return;
    document.getElementById('fc-filename').textContent = file.name;
    document.getElementById('fc-preview-count').textContent = '⏳ Extrayendo texto...';
    document.getElementById('fc-save-btn').style.display = 'none';

    try {
      var ab     = await file.arrayBuffer();
      var result = await mammoth.extractRawText({ arrayBuffer: ab });
      var raw    = result.value.trim();
      if (!raw) { document.getElementById('fc-preview-count').textContent = '❌ Documento vacio'; return; }

      document.getElementById('fc-preview-count').textContent = '🤖 Analizando con OpenAI...';

      var prompt =
        'Eres un experto en linguistica y diseno de material didactico para ingles (nivel B2-C1).\n\n' +
        'El siguiente texto viene de un documento Word con flashcards de vocabulario en ingles.\n' +
        'Extrae TODAS las tarjetas y devuelve un array JSON con exactamente estos campos por tarjeta:\n' +
        '- "word": la palabra o expresion en ingles\n' +
        '- "example": oracion de ejemplo natural y autentica en ingles\n' +
        '- "definition": significado correcto en ESPAÑOL, claro y conciso, max 20 palabras\n' +
        '- "distractor": significado FALSO en ESPAÑOL — debe parecer plausible pero ser incorrecto. Idealmente la traduccion literal de las palabras (que no es el significado real), o un concepto relacionado que confunda\n' +
        '- "distractors": array de 10 significados FALSOS en ESPAÑOL, cada uno diferente. Mezcla: traducciones literales, conceptos parecidos, significados de palabras relacionadas. Deben confundir de verdad — no deben ser obviamente incorrectos\n' +
        '- "label": etiqueta descriptiva corta del tipo de expresion, en ingles, max 3 palabras (ej: "Gen Z Slang", "Internet Slang", "Business Idiom", "Phrasal Verb")\n' +
        '- "cat": categoria de agrupacion — usa EXACTAMENTE uno de estos valores:\n' +
        '    "slang"         = jerga informal, expresiones coloquiales del habla diaria\n' +
        '    "idioms"        = expresiones idiomaticas cuyo significado NO es literal (ej: "kick the bucket")\n' +
        '    "phrasal_verbs" = verbos con particula que cambian significado (ej: "give up", "look after")\n' +
        '    "business"      = vocabulario formal de negocios, reuniones, correos, presentaciones\n' +
        '- "difficulty": nivel de dificultad — usa EXACTAMENTE uno de estos valores:\n' +
        '    "easy" = palabra comun, reconocible por estudiantes A2-B1\n' +
        '    "med"  = expresion de nivel B1-B2, usada frecuentemente pero no obvia\n' +
        '    "hard" = expresion avanzada B2-C1, requiere contexto para entenderse\n' +
        '    "leg"  = expresion muy nativa o de nicho, nivel C1-C2 o cultura especifica\n\n' +
        'Reglas:\n' +
        '1. Devuelve SOLO el array JSON, sin texto adicional\n' +
        '2. Si un campo falta, infiere el valor mas adecuado pedagogicamente\n' +
        '3. definition y distractor/distractors deben estar en ESPAÑOL\n' +
        '4. No omitas ninguna entrada del documento\n\n' +
        'Texto del documento:\n' + raw + '\n\nResponde UNICAMENTE con el array JSON:';

      var cards  = await _oaiCall(prompt, 8000);
      _parsed    = cards;
      _renderPreview(cards);

    } catch (err) {
      document.getElementById('fc-preview-count').textContent = '❌ ' + err.message;
      console.error(err);
    }
  };

  /* ── Preview ── */
  function _renderPreview(cards) {
    var countEl   = document.getElementById('fc-count');
    var previewEl = document.getElementById('fc-preview-count');
    var saveBtn   = document.getElementById('fc-save-btn');
    var tbody     = document.getElementById('fc-list');

    if (countEl)   countEl.textContent   = cards.length + ' tarjetas';
    if (previewEl) previewEl.textContent = '✓ ' + cards.length + ' tarjetas listas para guardar';
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
          '<td style="padding:8px 12px"><span style="color:#4ade80;font-size:12px">✓</span></td>' +
          '</tr>';
      }).join('');
    }
  }

  /* ── Save ── */
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
        word      : (c.word       || '').trim(),
        example   : (c.example    || '').trim(),
        distractor : (c.distractor  || '').trim(),
        distractors: Array.isArray(c.distractors) ? c.distractors : [(c.distractor || '').trim()].filter(Boolean),
        definition: (c.definition || '').trim(),
        label     : (c.label || '').trim() || 'Slang',
        cat       : validCats.includes(c.cat)        ? c.cat        : 'slang',
        difficulty: validDiffs.includes(c.difficulty) ? c.difficulty : 'med'
      };
    });

    var { error } = await sb.from('slang_cards').insert(rows);

    if (error) {
      alert('Error al guardar: ' + error.message);
      if (saveBtn) { saveBtn.textContent = 'Guardar tarjetas'; saveBtn.disabled = false; }
      return;
    }

    document.getElementById('fc-preview-count').textContent = '✅ ' + rows.length + ' tarjetas guardadas';
    if (saveBtn) { saveBtn.style.display = 'none'; saveBtn.textContent = 'Guardar tarjetas'; saveBtn.disabled = false; }
    _parsed = [];
    _loadExisting();
  };

  /* ── Load existing ── */
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
        '<td style="padding:8px 12px;font-size:12px;opacity:.5" colspan="2">—</td>' +
        '<td style="padding:8px 12px"><span style="background:#7c3aed33;color:#a855f7;padding:2px 8px;border-radius:20px;font-size:11px">' + _esc(c.cat) + '</span></td>' +
        '<td style="padding:8px 12px"><span style="color:' + diffColor + ';font-size:11px;font-weight:700">' + _esc(c.difficulty || '—') + '</span></td>' +
        '<td style="padding:8px 12px"><button onclick="fcDelete(\'' + c.id + '\')" style="background:#7f1d1d22;color:#f87171;border:1px solid #7f1d1d44;border-radius:6px;padding:3px 10px;cursor:pointer;font-size:11px">Borrar</button></td>' +
        '</tr>';
    }).join('');
  }

  /* ── Delete ── */
  window.fcDelete = async function (id) {
    if (!confirm('¿Eliminar esta tarjeta?')) return;
    var sb = _getSb();
    if (!sb) return;
    var { error } = await sb.from('slang_cards').delete().eq('id', id);
    if (error) { alert('Error: ' + error.message); return; }
    _loadExisting();
  };

  /* ── Helpers ── */
  function _esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

})();

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

  /* ── Init ── */
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
    if (!val.startsWith('sk-')) { alert('Ingresa un API key de OpenAI valido (empieza con sk-)'); return; }
    localStorage.setItem('_aura_oai_key', val);
    if (input) input.value = '';
    _refreshKeyStatus();
  };

  /* ── Dividir texto por marcadores de seccion del Word ──
     Detecta SLANG / IDIOMS / PHRASAL VERBS / BUSINESS y separa cada bloque
     con su categoria correcta. Si no hay marcadores, divide en 4 trozos iguales. */
  function _splitBySections(text) {
    var catMap = [
      { re: /\bBUSINESS\b/i,                   cat: 'business' },
      { re: /\bPHRASAL[\s_-]*VERBS?\b/i,       cat: 'phrasal_verbs' },
      { re: /\bIDIOMS?\b/i,                     cat: 'idioms' },
      { re: /\bSLANG\b/i,                       cat: 'slang' },
    ];

    /* Encontrar posiciones de cada marcador en el texto */
    var hits = [];
    catMap.forEach(function (cm) {
      var m = text.match(cm.re);
      if (m) hits.push({ idx: text.search(cm.re), cat: cm.cat });
    });
    hits.sort(function (a, b) { return a.idx - b.idx; });

    if (hits.length < 2) {
      /* Sin marcadores claros → dividir en 4 trozos iguales, cat='auto' */
      var lines = text.split('\n');
      var size  = Math.ceil(lines.length / 4);
      var out   = [];
      for (var i = 0; i < 4; i++) {
        var chunk = lines.slice(i * size, (i + 1) * size).join('\n').trim();
        if (chunk) out.push({ text: chunk, cat: null });
      }
      return out;
    }

    /* Cortar texto en secciones por posicion */
    var sections = [];
    for (var j = 0; j < hits.length; j++) {
      var start = hits[j].idx;
      var end   = (j + 1 < hits.length) ? hits[j + 1].idx : text.length;
      var chunk = text.slice(start, end).trim();
      if (chunk) sections.push({ text: chunk, cat: hits[j].cat });
    }
    return sections;
  }

  /* ── Prompt de extraccion (con categoria forzada si se conoce) ── */
  function _buildPrompt(text, forcedCat) {
    var catLine = forcedCat
      ? 'IMPORTANTE: Todas las tarjetas de este bloque pertenecen a la categoria "' + forcedCat + '". ' +
        'Usa ese valor exacto en el campo "cat" para TODAS las tarjetas de este bloque.\n\n'
      : '';
    return (
      'Eres un experto en linguistica y diseno de material didactico para ingles.\n\n' +
      catLine +
      'El siguiente texto viene de un documento Word con flashcards de vocabulario en ingles.\n' +
      'Extrae TODAS las tarjetas visibles y devuelve un array JSON con exactamente estos campos:\n' +
      '- "word": la palabra o expresion en ingles\n' +
      '- "example": oracion de ejemplo en ingles (si no hay, genera una natural)\n' +
      '- "definition": significado correcto en ESPANOL, max 20 palabras\n' +
      '- "label": etiqueta corta del tipo de expresion en ingles, max 3 palabras\n' +
      '- "cat": EXACTAMENTE uno de: "slang", "idioms", "phrasal_verbs", "business"\n' +
      '- "difficulty": EXACTAMENTE uno de: "easy", "med", "hard", "leg"\n\n' +
      'Reglas:\n' +
      '1. Devuelve SOLO el array JSON sin texto adicional ni markdown\n' +
      '2. definition debe estar en ESPANOL\n' +
      '3. No omitas ninguna tarjeta visible\n\n' +
      'Texto:\n' + text + '\n\nArray JSON:'
    );
  }

  /* ── File handler ── */
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
      if (!raw) { document.getElementById('fc-preview-count').textContent = 'Documento vacio'; return; }

      var sections = _splitBySections(raw);
      var allCards = [];

      for (var i = 0; i < sections.length; i++) {
        document.getElementById('fc-preview-count').textContent =
          'Analizando seccion ' + (i + 1) + ' de ' + sections.length + '...';
        var batch = await _oaiCall(_buildPrompt(sections[i].text, sections[i].cat), 16000);
        /* Si la seccion tiene categoria forzada, sobreescribir cat en cada card */
        if (sections[i].cat) {
          batch = batch.map(function (c) { c.cat = sections[i].cat; return c; });
        }
        allCards = allCards.concat(batch);
      }

      allCards = allCards.map(function (c) {
        c.distractor  = c.distractor  || '';
        c.distractors = [];
        return c;
      });

      _parsed = allCards;
      _renderPreview(allCards);

    } catch (err) {
      document.getElementById('fc-preview-count').textContent = 'Error: ' + err.message;
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

  /* ── Generar distractores en Espanol para un lote de tarjetas ──
     Llama a OpenAI con hasta 15 tarjetas a la vez y devuelve
     { id -> distractors[] } para actualizarlas en Supabase.         */
  async function _generateDistractors(cards, progressCb) {
    var BATCH = 12;
    var result = {};

    for (var i = 0; i < cards.length; i += BATCH) {
      var batch = cards.slice(i, i + BATCH);
      if (progressCb) progressCb(i, cards.length);

      var items = batch.map(function (c) {
        return '{"id":' + JSON.stringify(c.id) + ',"word":' + JSON.stringify(c.word) +
               ',"definition":' + JSON.stringify(c.definition) + '}';
      }).join(',\n');

      var prompt =
        'Dado este array de expresiones en ingles, genera 10 significados FALSOS en ESPANOL para cada una.\n' +
        'Los significados falsos deben:\n' +
        '- Estar en ESPANOL (nunca en ingles)\n' +
        '- Parecer plausibles y confundir a alguien que no sabe el significado real\n' +
        '- Relacionarse con las palabras individuales o el contexto, no ser obviamente incorrectos\n' +
        '- Ser frases cortas, max 10 palabras cada una\n\n' +
        'Devuelve SOLO un array JSON donde cada elemento tiene:\n' +
        '- "id": el mismo id del input\n' +
        '- "distractors": array de exactamente 10 strings en ESPANOL\n\n' +
        'Input:\n[' + items + ']\n\nArray JSON:';

      try {
        var batchResult = await _oaiCall(prompt, 6000);
        batchResult.forEach(function (r) {
          if (r.id && Array.isArray(r.distractors)) {
            result[r.id] = r.distractors.slice(0, 10);
          }
        });
      } catch (e) {
        console.warn('Error en lote de distractores:', e.message);
      }
    }
    return result;
  }

  /* ── Save + deduplicar + generar distractores automaticamente ── */
  window.fcSaveAll = async function () {
    if (!_parsed.length) return;
    var sb = _getSb();
    if (!sb) { alert('Supabase no disponible'); return; }

    var saveBtn   = document.getElementById('fc-save-btn');
    var previewEl = document.getElementById('fc-preview-count');
    if (saveBtn) { saveBtn.textContent = 'Guardando...'; saveBtn.disabled = true; }

    var validCats  = ['slang', 'idioms', 'phrasal_verbs',
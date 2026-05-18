/* admin-collocations.js — Collocations con OpenAI directo (key en localStorage) */
(function () {
  'use strict';

  var _parsed = [];

  function _getSb()  { return window._aura && window._aura.sb; }
  function _getKey() { return localStorage.getItem('_aura_oai_key') || ''; }

  /* ── OpenAI caller ── */
  async function _oaiCall(prompt, maxTokens) {
    var key = _getKey();
    if (!key) throw new Error('OpenAI key no configurada. Ve a la pestana Flashcards y guarda tu key.');
    var res = await fetch('https://api.openai.com/v1/chat/completions', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
      body   : JSON.stringify({
        model      : 'gpt-4o-mini',
        messages   : [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens : maxTokens || 8000
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
  window.initCollocationsAdmin = function () {
    _loadExisting();
  };

  /* ── File handler ── */
  window.colHandleFile = async function (input) {
    var file = input.files[0];
    if (!file) return;
    document.getElementById('col-filename').textContent = file.name;
    document.getElementById('col-preview-count').textContent = '⏳ Extrayendo texto...';
    document.getElementById('col-save-btn').style.display = 'none';

    try {
      var ab     = await file.arrayBuffer();
      var result = await mammoth.extractRawText({ arrayBuffer: ab });
      var raw    = result.value.trim();
      if (!raw) { document.getElementById('col-preview-count').textContent = '❌ Documento vacio'; return; }

      document.getElementById('col-preview-count').textContent = '🤖 Analizando con OpenAI...';

      var prompt =
        'Eres un experto linguista especializado en colocaciones del ingles para hispanohablantes (nivel B2-C1).\n\n' +
        'El texto siguiente proviene de un documento Word con frases de colocaciones (collocation phrases).\n' +
        'Extrae TODAS las frases y devuelve un array JSON con exactamente estos campos:\n' +
        '- "es": la frase o traduccion en espanol (string)\n' +
        '- "en": array de strings con TODAS las palabras individuales de la frase en ingles (ej: ["make","a","decision"])\n' +
        '- "cat": categoria tematica en ingles, una de: ["business","daily_life","academic","social","emotions","travel","technology","health","food","sports"] (string)\n' +
        '- "tag": etiqueta breve descriptiva en ingles, 2-3 palabras, snake_case (string, ej: "workplace_verbs")\n' +
        '- "hint": pista pedagogica breve en espanol, max 10 palabras (string)\n' +
        '- "traps": array de 5-8 palabras en ingles que son distractores falsos — palabras plausibles pero INCORRECTAS para completar los espacios en blanco del juego (array of strings)\n' +
        '- "explanation": explicacion breve de por que estas palabras van juntas en ingles, max 25 palabras (string)\n\n' +
        'Reglas importantes:\n' +
        '1. Devuelve SOLO el array JSON, sin texto adicional antes o despues\n' +
        '2. Las "traps" deben ser palabras que el estudiante podria confundir con las correctas — mismo campo semantico pero incorrectas\n' +
        '3. "en" debe incluir TODAS las palabras (articulos, preposiciones, etc.)\n' +
        '4. Si algo no esta claro, infiere el valor mas pedagogicamente apropiado\n' +
        '5. No omitas ninguna frase del documento\n\n' +
        'Texto del documento:\n' + raw + '\n\nResponde UNICAMENTE con el array JSON:';

      var phrases = await _oaiCall(prompt, 12000);
      _parsed     = phrases;
      _renderPreview(phrases);

    } catch (err) {
      document.getElementById('col-preview-count').textContent = '❌ ' + err.message;
      console.error(err);
    }
  };

  /* ── Preview ── */
  function _renderPreview(phrases) {
    var countEl   = document.getElementById('col-count');
    var previewEl = document.getElementById('col-preview-count');
    var saveBtn   = document.getElementById('col-save-btn');
    var tbody     = document.getElementById('col-list');

    if (countEl)   countEl.textContent   = phrases.length + ' frases';
    if (previewEl) previewEl.textContent = '✓ ' + phrases.length + ' frases listas para guardar';
    if (saveBtn)   saveBtn.style.display = 'inline-flex';

    if (tbody) {
      tbody.innerHTML = phrases.map(function (p, i) {
        var enStr = Array.isArray(p.en) ? p.en.join(' ') : (p.en || '');
        return '<tr style="background:' + (i % 2 === 0 ? 'transparent' : '#ffffff08') + '">' +
          '<td style="padding:8px 12px;font-size:13px">'                 + _esc(p.es)  + '</td>' +
          '<td style="padding:8px 12px;font-weight:700;color:#c084fc">'  + _esc(enStr) + '</td>' +
          '<td style="padding:8px 12px"><span style="background:#7c3aed33;color:#a855f7;padding:2px 8px;border-radius:20px;font-size:11px">' + _esc(p.cat) + '</span></td>' +
          '<td style="padding:8px 12px"><span style="color:#4ade80;font-size:12px">✓ Listo</span></td>' +
          '</tr>';
      }).join('');
    }
  }

  /* ── Save ── */
  window.colSaveAll = async function () {
    if (!_parsed.length) return;
    var sb = _getSb();
    if (!sb) { alert('Supabase no disponible'); return; }

    var saveBtn   = document.getElementById('col-save-btn');
    var previewEl = document.getElementById('col-preview-count');
    if (saveBtn) { saveBtn.textContent = 'Guardando...'; saveBtn.disabled = true; }

    try {
      var rows = _parsed.map(function (p) {
        return {
          es         : (p.es || '').trim(),
          en         : Array.isArray(p.en) ? p.en : String(p.en || '').split(/\s+/).filter(Boolean),
          cat        : (p.cat || 'daily_life').trim(),
          tag        : (p.tag || '').trim(),
          hint       : (p.hint || '').trim(),
          traps      : Array.isArray(p.traps) ? p.traps : [],
          explanation: (p.explanation || '').trim()
        };
      });

      var { error: insertError } = await sb.from('collocation_phrases').insert(rows);
      if (insertError) throw insertError;

      if (previewEl) previewEl.textContent = '💡 Generando pool de palabras...';

      /* Collect all unique words from phrases + traps */
      var allWords = [];
      rows.forEach(function (r) {
        r.en.forEach(function (w) {
          var wl = w.toLowerCase();
          if (!allWords.includes(wl)) allWords.push(wl);
        });
        r.traps.forEach(function (w) {
          var wl = w.toLowerCase();
          if (!allWords.includes(wl)) allWords.push(wl);
        });
      });

      /* Ask OpenAI to expand pool */
      var poolPrompt =
        'Tengo un juego de colocaciones en ingles. Las palabras clave son:\n' +
        allWords.join(', ') + '\n\n' +
        'Genera un pool de vocabulario para el juego: devuelve un array JSON de 300 palabras en ingles.\n' +
        'Incluye las palabras clave de arriba mas palabras relacionadas del mismo campo semantico.\n' +
        'Las palabras deben ser utiles como distractores en un juego de "completa la colocacion".\n' +
        'Mezcla sustantivos, verbos, adjetivos y preposiciones comunes.\n' +
        'Devuelve SOLO el array JSON de strings. Ejemplo: ["make","decision","important","take",...]';

      var poolWords = await _oaiCall(poolPrompt, 3000);

      if (Array.isArray(poolWords) && poolWords.length > 0) {
        await sb.from('word_pools').upsert(
          { context: 'collocations/general', words: poolWords },
          { onConflict: 'context' }
        );
      }

      if (previewEl) previewEl.textContent = '✅ ' + rows.length + ' frases guardadas + pool de ' + (poolWords ? poolWords.length : 0) + ' palabras actualizado';
      if (saveBtn) { saveBtn.style.display = 'none'; saveBtn.textContent = 'Guardar frases'; saveBtn.disabled = false; }
      _parsed = [];
      _loadExisting();

    } catch (err) {
      alert('Error: ' + err.message);
      if (saveBtn) { saveBtn.textContent = 'Guardar frases'; saveBtn.disabled = false; }
    }
  };

  /* ── Load existing ── */
  async function _loadExisting() {
    var sb    = _getSb();
    if (!sb) return;
    var tbody = document.getElementById('col-list');
    if (!tbody) return;

    var { data, error } = await sb.from('collocation_phrases')
      .select('id,es,en,cat,created_at')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error || !data || !data.length) {
      if (!_parsed.length) tbody.innerHTML = '<tr><td colspan="4" style="padding:20px;text-align:center;opacity:.5">No hay frases aun</td></tr>';
      return;
    }

    if (_parsed.length) return;

    var countEl = document.getElementById('col-count');
    if (countEl) countEl.textContent = data.length + ' frases';

    tbody.innerHTML = data.map(function (p, i) {
      var enStr = Array.isArray(p.en) ? p.en.join(' ') : (p.en || '');
      return '<tr style="background:' + (i % 2 === 0 ? 'transparent' : '#ffffff08') + '">' +
        '<td style="padding:8px 12px;font-size:13px">'                + _esc(p.es)  + '</td>' +
        '<td style="padding:8px 12px;font-weight:700;color:#c084fc">' + _esc(enStr) + '</td>' +
        '<td style="padding:8px 12px"><span style="background:#7c3aed33;color:#a855f7;padding:2px 8px;border-radius:20px;font-size:11px">' + _esc(p.cat) + '</span></td>' +
        '<td style="padding:8px 12px"><button onclick="colDelete(\'' + p.id + '\')" style="background:#7f1d1d22;color:#f87171;border:1px solid #7f1d1d44;border-radius:6px;padding:3px 10px;cursor:pointer;font-size:11px">Borrar</button></td>' +
        '</tr>';
    }).join('');
  }

  /* ── Delete ── */
  window.colDelete = async function (id) {
    if (!confirm('¿Eliminar esta frase?')) return;
    var sb = _getSb();
    if (!sb) return;
    var { error } = await sb.from('collocation_phrases').delete().eq('id', id);
    if (error) { alert('Error: ' + error.message); return; }
    _loadExisting();
  };

  /* ── Helpers ── */
  function _esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

})();

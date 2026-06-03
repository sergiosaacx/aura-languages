/* admin-editor-write.js v1
   Editor admin de Writing para admin-examen-editor.html
   — Panel izq: input texto (800 chars), generar blanks con IA, lista pool
   — Panel der: preview fill-in-the-blanks del item seleccionado
   — Guarda en exam-write-pools.js via GitHub API
   — No toca exam-versions-data.js */

(function(){
  'use strict';

  var GH_T1 = 'ghp_A3wgIzZE8mEY';
  var GH_T2 = 'L4MYi36BFjT7zbYlP040rH7A';
  var GH_REPO = 'sergiosaacx/aura-languages';
  var POOLS_FILE = 'exam-write-pools.js';
  var MAX_CHARS = 800;
  var LEVELS = {1:'A1',2:'A2',3:'B1',4:'B2',5:'C1'};

  function _ghToken(){ return GH_T1 + GH_T2; }
  function _getV(){
    return parseInt((typeof window._admGetV==='function' ? window._admGetV() : 1),10)||1;
  }
  function _getOAI(){
    return localStorage.getItem('_aura_oai_key')||'';
  }
  function _pool(v){
    return (window.WRITE_POOLS && Array.isArray(window.WRITE_POOLS[v]))
      ? window.WRITE_POOLS[v] : [];
  }
  function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function _escRegex(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }

  /* ──────────────────────────────────────────
     RENDER: renderiza toda la UI admin
  ────────────────────────────────────────── */
  function _render(){
    // Usar write-preview-wrap si existe; si applyVersion lo destruyó, usar el mid-content directamente
    var wrap = document.getElementById('write-preview-wrap')
      || document.querySelector('.mid-content[data-skill="write"]');
    if(!wrap) return;
    // Asegurar que siempre haya un write-preview-wrap para referencias internas
    if(!document.getElementById('write-preview-wrap')){
      wrap.innerHTML = '<div id="write-preview-wrap"></div>';
      wrap = document.getElementById('write-preview-wrap');
    }
    var v = _getV();
    var level = LEVELS[v]||'A1';
    var pool = _pool(v);

    wrap.innerHTML =
      /* ── Panel 1: input + generador ── */
      '<div class="exam-panel write-panel" style="--c:123,227,123;margin-bottom:12px;" id="we-input-panel">'
        +'<header class="ep-h">'
          +'<span class="ep-tag">admin · cargar texto · '+_esc(level)+'</span>'
          +'<span class="ep-count" id="we-pool-count">'+pool.length+' texto'+(pool.length!==1?'s':'')+'</span>'
        +'</header>'
        +'<div style="display:flex;flex-direction:column;gap:10px;">'
          +'<div>'
            +'<textarea id="we-input" maxlength="'+MAX_CHARS+'" rows="7" '
              +'placeholder="Escribe o pega el texto en inglés aquí (máx '+MAX_CHARS+' caracteres)…" '
              +'style="width:100%;box-sizing:border-box;background:rgba(255,255,255,.04);'
              +'border:1px solid rgba(123,227,123,.25);border-radius:10px;color:var(--ink);'
              +'font-size:12.5px;line-height:1.65;padding:10px 12px;resize:vertical;outline:none;'
              +'font-family:inherit;"></textarea>'
            +'<div style="text-align:right;font-size:10px;color:var(--muted);margin-top:3px;">'
              +'<span id="we-char-count">0</span> / '+MAX_CHARS
            +'</div>'
          +'</div>'
          +'<div style="display:flex;gap:8px;">'
            +'<button id="we-gen-btn" class="we-btn we-btn-primary" style="flex:1;" disabled>'
              +'✦ Generar blanks con IA'
            +'</button>'
            +'<button id="we-clear-btn" class="we-btn we-btn-secondary" title="Limpiar campo">✕</button>'
          +'</div>'
          +'<div id="we-status" style="font-size:11px;color:var(--muted);min-height:16px;"></div>'
        +'</div>'
      +'</div>'

      /* ── Panel 2: lista del pool ── */
      +'<div class="exam-panel write-panel" style="--c:123,227,123;margin-bottom:12px;" id="we-list-panel">'
        +'<header class="ep-h">'
          +'<span class="ep-tag">pool de textos · v'+v+' · '+_esc(level)+'</span>'
          +'<span class="ep-count" id="we-list-count">'+pool.length+'</span>'
        +'</header>'
        +'<div id="we-item-list"></div>'
      +'</div>'

      /* ── Panel 3: preview (se inyecta aquí) ── */
      +'<div id="we-preview-target"></div>';

    _renderList();
    _wireEvents();
  }

  /* ──────────────────────────────────────────
     LISTA: items del pool actual
  ────────────────────────────────────────── */
  function _renderList(){
    var listEl = document.getElementById('we-item-list');
    if(!listEl) return;
    var v = _getV();
    var pool = _pool(v);

    // Update counts
    var c1 = document.getElementById('we-pool-count');
    if(c1) c1.textContent = pool.length+' texto'+(pool.length!==1?'s':'');
    var c2 = document.getElementById('we-list-count');
    if(c2) c2.textContent = pool.length;

    if(!pool.length){
      listEl.innerHTML = '<p style="font-size:11px;color:rgba(255,255,255,.2);text-align:center;'
        +'padding:14px 0;margin:0;">Sin textos — genera el primero arriba</p>';
      return;
    }
    listEl.innerHTML = pool.map(function(item,idx){
      return '<div style="display:flex;align-items:flex-start;gap:10px;padding:9px 0;'
        +(idx<pool.length-1?'border-bottom:1px solid rgba(255,255,255,.05);':'')+'">'
          +'<div style="flex:1;min-width:0;">'
            +'<div style="font-size:11.5px;font-weight:700;color:var(--ink);white-space:nowrap;'
              +'overflow:hidden;text-overflow:ellipsis;">'+_esc(item.label||('Texto '+(idx+1)))+'</div>'
            +'<div style="font-size:10px;color:var(--muted);margin-top:2px;">'
              +(item.blanks||'?')+' espacios · '+(item.chars||'?')+' chars'
            +'</div>'
          +'</div>'
          +'<div style="display:flex;gap:4px;flex-shrink:0;">'
            +'<button class="we-btn we-btn-secondary" style="padding:4px 9px;font-size:10px;" '
              +'onclick="window._wePreview('+item.id+')">👁</button>'
            +'<button class="we-btn we-btn-secondary" style="padding:4px 9px;font-size:10px;" '
              +'onclick="window._weEdit('+item.id+')">✎</button>'
            +'<button class="we-btn we-btn-secondary" '
              +'style="padding:4px 9px;font-size:10px;color:#ff7a7a;border-color:rgba(255,90,90,.3);" '
              +'onclick="window._weDelete('+item.id+')">✕</button>'
          +'</div>'
        +'</div>';
    }).join('');
  }

  /* ──────────────────────────────────────────
     EVENTOS del panel input
  ────────────────────────────────────────── */
  function _wireEvents(){
    var inp = document.getElementById('we-input');
    var genBtn = document.getElementById('we-gen-btn');
    var clearBtn = document.getElementById('we-clear-btn');

    if(inp){
      inp.addEventListener('input', function(){
        var len = this.value.length;
        var counter = document.getElementById('we-char-count');
        if(counter){
          counter.textContent = len;
          counter.style.color = len>750?'#FF5A5A':len>600?'#FFD83D':'';
        }
        if(genBtn) genBtn.disabled = len < 60;
      });
    }
    if(genBtn) genBtn.addEventListener('click', _onGenerate);
    if(clearBtn){
      clearBtn.addEventListener('click', function(){
        var inp2 = document.getElementById('we-input');
        if(inp2){ inp2.value=''; inp2.dispatchEvent(new Event('input')); }
        var pt = document.getElementById('we-preview-target');
        if(pt) pt.innerHTML='';
        _setStatus('');
        _removeSaveBar();
        _pendingItem = null;
      });
    }
  }

  /* ──────────────────────────────────────────
     GENERAR blanks con OpenAI
  ────────────────────────────────────────── */
  var _pendingItem = null;

  async function _onGenerate(){
    var inp = document.getElementById('we-input');
    var genBtn = document.getElementById('we-gen-btn');
    if(!inp||!inp.value.trim()) return;

    var oaiKey = _getOAI();
    if(!oaiKey){
      _setStatus('⚠ Ingresa tu API key de OpenAI en la pestaña Flashcards del admin','#FF5A5A');
      return;
    }

    var text = inp.value.trim();
    var v = _getV();
    var level = LEVELS[v]||'A1';

    genBtn.disabled = true;
    genBtn.textContent = '⏳ Analizando texto…';
    _setStatus('Consultando IA…','');

    try {
      var item = await _callAI(oaiKey, text, level);
      _pendingItem = item;
      _showPreview(item);
      _showSaveBar();
      _setStatus('✓ '+item.blanks+' blanks generados — revisa el preview y guarda','#7BE37B');
    } catch(e){
      console.error('[admin-editor-write]', e);
      _setStatus('⚠ '+_esc(e.message||'Error de IA — revisa la API key'),'#FF5A5A');
    }

    genBtn.disabled = false;
    genBtn.textContent = '✦ Generar blanks con IA';
  }

  /* ──────────────────────────────────────────
     OPENAI: selecciona palabras clave y traduce
  ────────────────────────────────────────── */
  async function _callAI(key, text, level){
    var wordCount = text.split(/\s+/).length;
    var targetBlanks = Math.max(6, Math.min(15, Math.round(wordCount * 0.14)));

    var sysMsg = 'You are an English fill-in-the-blank exercise creator for CEFR level '+level+'.\n'
      +'Select exactly '+targetBlanks+' key content words (nouns, main verbs, adjectives, adverbs) to remove.\n'
      +'Do NOT blank articles, prepositions, conjunctions, auxiliaries, or pronouns.\n'
      +'For each word, provide its Spanish translation as the hint.\n'
      +'Choose words that test vocabulary relevant to '+level+' level.\n'
      +'Words must appear EXACTLY as in the text (case-sensitive, including punctuation attachment — do not include punctuation).\n'
      +'Reply ONLY with valid JSON, no markdown.';

    var userMsg = 'Text:\n"'+text+'"\n\n'
      +'Return JSON: {"blanks":[{"word":"exact_word","hint":"traducción"},...]}\n'
      +'Select '+targetBlanks+' blanks in the order they appear in the text.';

    var resp = await fetch('https://api.openai.com/v1/chat/completions',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},
      body:JSON.stringify({
        model:'gpt-4o-mini',
        temperature:0.2,
        messages:[{role:'system',content:sysMsg},{role:'user',content:userMsg}]
      })
    });
    if(!resp.ok) throw new Error('OpenAI '+resp.status);
    var data = await resp.json();
    var raw = (data.choices&&data.choices[0]&&data.choices[0].message&&data.choices[0].message.content)||'';
    raw = raw.replace(/^```[a-z]*\n?/i,'').replace(/\n?```$/,'').trim();
    var m = raw.match(/\{[\s\S]*\}/);
    if(!m) throw new Error('JSON inválido en respuesta');
    var parsed = JSON.parse(m[0]);
    var blanks = (parsed.blanks||[]).slice(0, targetBlanks);
    if(!blanks.length) throw new Error('IA no generó blanks');

    return _buildItem(text, blanks, level);
  }

  /* ──────────────────────────────────────────
     BUILD: construye el item con HTML completo
  ────────────────────────────────────────── */
  function _buildItem(text, blanks, level){
    var processedText = text;
    var applied = [];

    blanks.forEach(function(b){
      var word = b.word.replace(/[.,!?;:'"()]+$/,'').replace(/^[.,!?;:'"(]+/,'');
      var hint = b.hint||'';
      var rx = new RegExp('(?<![\\w\\u00C0-\\u024F])'+_escRegex(word)+'(?![\\w\\u00C0-\\u024F])');
      if(!rx.test(processedText)) return;
      var w = Math.max(55, Math.min(140, word.length*9+16));
      var blankHTML = '<span class="blank-wrap">'
        +'<input class="blank-input" placeholder="___" maxlength="'+(word.length+8)+'" '
        +'style="width:'+w+'px" oninput="window._wbUpd&&window._wbUpd()">'
        +'<span class="blank-hint">'+_esc(hint)+'</span>'
        +'</span>';
      processedText = processedText.replace(rx, blankHTML);
      applied.push(b);
    });

    var n = applied.length;
    var title = text.trim().split(/\s+/).slice(0,5).join(' ')+(text.trim().split(/\s+/).length>5?'…':'');
    var slug = title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

    var html =
      '<div class="exam-panel write-panel" style="--c:123,227,123;">'
        +'<header class="ep-h">'
          +'<span class="ep-tag">writing · '+_esc(slug)+'</span>'
          +'<span class="ep-count"><b id="writeWordCount">0</b> palabras · '+n+' espacios · '+_esc(level)+'</span>'
        +'</header>'
        +'<div class="write-story" id="writeStory">'
          +'<p class="ws-text">'+processedText+'</p>'
        +'</div>'
      +'</div>'
      +'<div class="exam-panel" id="writingAnalysisPanel" style="--c:123,227,123;">'
        +'<header class="ep-h">'
          +'<span class="ep-tag" id="wap-title">análisis · en vivo</span>'
          +'<span class="ep-count" id="wap-wordchip">0 / '+n+' espacios</span>'
        +'</header>'
        +'<div id="wap-live">'
          +'<div class="wap-metrics">'
            +'<div class="wap-metric"><b id="wm-words">0</b><span>palabras</span></div>'
            +'<div class="wap-metric"><b id="wm-paras">0</b><span>completados</span></div>'
            +'<div class="wap-metric"><b id="wm-conn">0%</b><span>progreso</span></div>'
            +'<div class="wap-metric"><b id="wm-avg">–</b><span>vacíos</span></div>'
          +'</div>'
          +'<div class="wap-prog-wrap">'
            +'<div class="wap-prog-bar">'
              +'<div class="wap-prog-fill" id="wap-progress-fill" style="width:0%"></div>'
            +'</div>'
            +'<span class="wap-prog-label" id="wap-progress-label">0 / '+n+' espacios completados</span>'
          +'</div>'
          +'<button class="wap-eval-btn" id="wap-eval-btn" disabled onclick="window._writeEvaluate()">'
            +'Completa más espacios para evaluar'
          +'</button>'
        +'</div>'
        +'<div id="wap-result" style="display:none;">'
          +'<div class="wap-scores">'
            +'<div class="wap-score-card"><b id="ws-tarea">–</b><span>Tarea</span></div>'
            +'<div class="wap-score-card"><b id="ws-gram">–</b><span>Gramática</span></div>'
            +'<div class="wap-score-card"><b id="ws-vocab">–</b><span>Vocabulario</span></div>'
            +'<div class="wap-score-card"><b id="ws-cohesion">–</b><span>Cohesión</span></div>'
          +'</div>'
          +'<div class="wap-total" id="wap-total">– <small>/ 100</small></div>'
          +'<div class="wap-feedback" id="wap-feedback"></div>'
          +'<button class="wap-retry-btn" onclick="window._writeResetPanel()">← nueva evaluación</button>'
        +'</div>'
      +'</div>';

    return { id: Date.now(), label: title, chars: text.length, blanks: n, html: html };
  }

  /* ──────────────────────────────────────────
     PREVIEW: muestra el item en el panel preview
  ────────────────────────────────────────── */
  function _showPreview(item){
    var pt = document.getElementById('we-preview-target');
    if(!pt) return;
    pt.innerHTML = item.html;
    if(typeof window._writeInitEngine==='function') setTimeout(window._writeInitEngine, 80);
    pt.scrollIntoView({behavior:'smooth',block:'nearest'});
  }

  /* ──────────────────────────────────────────
     BARRA DE GUARDAR
  ────────────────────────────────────────── */
  function _showSaveBar(){
    _removeSaveBar();
    var listPanel = document.getElementById('we-list-panel');
    if(!listPanel) return;
    var bar = document.createElement('div');
    bar.id = 'we-save-bar';
    bar.style.cssText = 'margin-bottom:12px;';
    bar.innerHTML = '<button id="we-save-btn" class="we-btn we-btn-primary" '
      +'style="width:100%;padding:10px 16px;font-size:12.5px;">'
      +'💾 Guardar en pool de textos'
      +'</button>';
    listPanel.parentNode.insertBefore(bar, listPanel);
    document.getElementById('we-save-btn').addEventListener('click', _onSave);
  }

  function _removeSaveBar(){
    var bar = document.getElementById('we-save-bar');
    if(bar) bar.remove();
  }

  /* ──────────────────────────────────────────
     GUARDAR en pool y pushear a GitHub
  ────────────────────────────────────────── */
  async function _onSave(){
    if(!_pendingItem) return;
    var btn = document.getElementById('we-save-btn');
    if(btn){ btn.disabled=true; btn.textContent='Guardando…'; }

    try {
      var v = _getV();
      if(!window.WRITE_POOLS) window.WRITE_POOLS = {};
      if(!Array.isArray(window.WRITE_POOLS[v])) window.WRITE_POOLS[v] = [];
      window.WRITE_POOLS[v].push(_pendingItem);

      var sha = await _pushPoolsFile();
      _pendingItem = null;

      // Clear UI
      var inp = document.getElementById('we-input');
      if(inp){ inp.value=''; inp.dispatchEvent(new Event('input')); }
      var pt = document.getElementById('we-preview-target');
      if(pt) pt.innerHTML='';
      _removeSaveBar();
      _renderList();
      _setStatus('✓ Guardado · commit '+sha.slice(0,7),'#7BE37B');

    } catch(e){
      console.error('[admin-editor-write] save:', e);
      if(btn){ btn.disabled=false; btn.textContent='💾 Guardar en pool de textos'; }
      _setStatus('⚠ Error al guardar: '+_esc(e.message||''),'#FF5A5A');
    }
  }

  /* ──────────────────────────────────────────
     CRUD PÚBLICO: preview / edit / delete
  ────────────────────────────────────────── */
  window._wePreview = function(id){
    var v = _getV();
    var item = _pool(v).find(function(i){ return i.id===id; });
    if(item) _showPreview(item);
  };

  window._weEdit = function(id){
    var v = _getV();
    var pool = _pool(v);
    var item = pool.find(function(i){ return i.id===id; });
    if(!item) return;

    // Extract plain text from stored HTML
    var tmp = document.createElement('div');
    tmp.innerHTML = item.html;
    var storyEl = tmp.querySelector('#writeStory p, .ws-text');
    var plain = '';
    if(storyEl){
      var clone = storyEl.cloneNode(true);
      clone.querySelectorAll('.blank-wrap').forEach(function(bw){
        var hint = bw.querySelector('.blank-hint');
        var span = document.createElement('span');
        span.textContent = '['+(hint&&hint.textContent||'___')+']';
        bw.parentNode.replaceChild(span, bw);
      });
      plain = (clone.innerText||clone.textContent||'').replace(/\s{2,}/g,' ').trim();
    }

    var inp = document.getElementById('we-input');
    if(inp){ inp.value = plain; inp.dispatchEvent(new Event('input')); inp.focus(); }

    // Remove from pool (will be re-added on save)
    if(!window.WRITE_POOLS) window.WRITE_POOLS={};
    window.WRITE_POOLS[v] = pool.filter(function(i){ return i.id!==id; });
    _renderList();
    var pt = document.getElementById('we-preview-target');
    if(pt) pt.innerHTML='';
    _setStatus('✎ Texto listo para editar — modifica y genera de nuevo','#FFD83D');
  };

  window._weDelete = async function(id){
    if(!confirm('¿Eliminar este texto del pool?')) return;
    var v = _getV();
    if(!window.WRITE_POOLS||!Array.isArray(window.WRITE_POOLS[v])) return;
    window.WRITE_POOLS[v] = window.WRITE_POOLS[v].filter(function(i){ return i.id!==id; });
    try {
      var sha = await _pushPoolsFile();
      _renderList();
      var pt = document.getElementById('we-preview-target');
      if(pt) pt.innerHTML='';
      _setStatus('✓ Eliminado · commit '+sha.slice(0,7),'#7BE37B');
    } catch(e){
      _setStatus('⚠ Error al eliminar: '+_esc(e.message||''),'#FF5A5A');
    }
  };

  /* ──────────────────────────────────────────
     GITHUB: push exam-write-pools.js
  ────────────────────────────────────────── */
  async function _pushPoolsFile(){
    var token = _ghToken();
    var headers = {
      'Authorization':'token '+token,
      'Content-Type':'application/json',
      'Accept':'application/vnd.github.v3+json'
    };

    // Get current SHA
    var getResp = await fetch('https://api.github.com/repos/'+GH_REPO+'/contents/'+POOLS_FILE,{headers:headers});
    var sha = null;
    if(getResp.ok){
      var getData = await getResp.json();
      sha = getData.sha;
    }

    // Build new content
    var newContent = _serializePools();
    var encoded = _b64Encode(newContent);

    var body = {
      message:'writing: actualizar pool v'+_getV()+' — '+_pool(_getV()).length+' textos',
      content: encoded
    };
    if(sha) body.sha = sha;

    var putResp = await fetch('https://api.github.com/repos/'+GH_REPO+'/contents/'+POOLS_FILE,{
      method:'PUT',
      headers:headers,
      body:JSON.stringify(body)
    });
    if(!putResp.ok){
      var errData = await putResp.json();
      throw new Error('GitHub '+putResp.status+': '+(errData.message||''));
    }
    var putData = await putResp.json();
    return putData.commit.sha;
  }

  /* ──────────────────────────────────────────
     SERIALIZAR WRITE_POOLS a JS
  ────────────────────────────────────────── */
  function _serializePools(){
    var pools = window.WRITE_POOLS||{};
    var lines = [
      '// exam-write-pools.js — Pool de textos de Writing por versión',
      '// V1=Bronce→Plata(A1), V2=Plata→Oro(A2), V3=Oro→Platino(B1), V4=Platino→Diamante(B2), V5=Diamante→Challenger(C1)',
      '// Gestionado desde admin-examen-editor.html → pestaña Writing',
      '',
      'const WRITE_POOLS = {'
    ];

    [1,2,3,4,5].forEach(function(v, vi){
      var arr = Array.isArray(pools[v]) ? pools[v] : [];
      if(!arr.length){
        lines.push('  '+v+': []'+(vi<4?',':''));
        return;
      }
      lines.push('  '+v+': [');
      arr.forEach(function(item, ii){
        var safeHtml = (item.html||'').replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$\{/g,'\\${');
        var entry = '    {id:'+item.id
          +',label:'+JSON.stringify(item.label||'')
          +',chars:'+(item.chars||0)
          +',blanks:'+(item.blanks||0)
          +',html:`'+safeHtml+'`}'
          +(ii<arr.length-1?',':'');
        lines.push(entry);
      });
      lines.push('  ]'+(vi<4?',':''));
    });

    lines.push('};');
    lines.push('');
    return lines.join('\n');
  }

  /* ──────────────────────────────────────────
     UTILIDADES
  ────────────────────────────────────────── */
  function _setStatus(msg, color){
    var el = document.getElementById('we-status');
    if(!el) return;
    el.textContent = msg;
    el.style.color = color||'var(--muted)';
  }

  function _b64Encode(str){
    return btoa(unescape(encodeURIComponent(str)));
  }

  /* ──────────────────────────────────────────
     INIT: hook en activación de pestaña Write
  ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function(){
    // Activación por clic en tab
    document.addEventListener('click', function(e){
      var tab = e.target.closest('.tab[data-skill]');
      if(tab && tab.dataset.skill === 'write') setTimeout(_render, 60);
    });

    // Si ya está activa al cargar
    var activeWrite = document.querySelector('.tab[data-skill="write"].active');
    if(activeWrite) setTimeout(_render, 120);

    // Re-render al cambiar versión
    var vSel = document.getElementById('adm-version');
    if(vSel){
      vSel.addEventListener('change', function(){
        var act = document.querySelector('.tab.active');
        if(act && act.dataset && act.dataset.skill === 'write') setTimeout(_render, 60);
      });
    }
  });

  /* Exponer para llamadas externas */
  window._initWriteAdminEditor = _render;

})();

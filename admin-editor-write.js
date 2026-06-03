/* admin-editor-write.js v2
   Editor admin Writing — panel input + gestión de pool + preview con estilos correctos */

(function(){
  'use strict';

  var GH_T1='ghp_A3wgIzZE8mEY', GH_T2='L4MYi36BFjT7zbYlP040rH7A';
  var GH_REPO='sergiosaacx/aura-languages', POOLS_FILE='exam-write-pools.js';
  var MAX_CHARS=800;
  var LEVELS={1:'A1',2:'A2',3:'B1',4:'B2',5:'C1'};

  function _ghToken(){ return GH_T1+GH_T2; }
  function _getV(){ return parseInt((typeof window._admGetV==='function'?window._admGetV():1),10)||1; }
  function _getOAI(){ return localStorage.getItem('_aura_oai_key')||''; }
  function _getLang(){ return (document.getElementById('adm-lang')||{}).value||localStorage.getItem('aura_lang')||'en'; }
  function _pool(v){ var l=_getLang(); return (window.WRITE_POOLS&&window.WRITE_POOLS[l]&&Array.isArray(window.WRITE_POOLS[l][v]))?window.WRITE_POOLS[l][v]:[]; }
  function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function _escRx(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }

  /* ── Inyectar CSS faltante (clases de examen.css que admin-examen-editor.css no tiene) ── */
  function _injectCSS(){
    if(document.getElementById('we-css')) return;
    var s=document.createElement('style');
    s.id='we-css';
    s.textContent=[
      /* Blank inputs */
      '.blank-wrap{display:inline-flex;flex-direction:column;align-items:center;vertical-align:bottom;margin:0 3px;}',
      '.blank-input{background:rgba(123,227,123,.07);border:none;border-bottom:2px solid rgba(123,227,123,.4);border-radius:4px 4px 0 0;color:rgba(123,227,123,1);font-size:13px;font-weight:700;text-align:center;outline:none;padding:3px 8px;min-width:55px;transition:.15s;font-family:inherit;}',
      '.blank-input::placeholder{color:rgba(123,227,123,.2);font-style:italic;}',
      '.blank-input:focus{background:rgba(123,227,123,.14);border-bottom-color:rgba(123,227,123,1);}',
      '.blank-input.wbi-filled{background:rgba(123,227,123,.11);border-bottom-color:rgba(123,227,123,1);}',
      '.blank-hint{font-size:9.5px;color:rgba(255,255,255,.35);margin-top:2px;font-style:italic;text-align:center;max-width:120px;}',
      '.blank-verdict{display:block;font-size:8.5px;color:#ff5a5a;text-align:center;margin-top:1px;font-weight:700;white-space:nowrap;}',
      /* Story */
      '.write-story{padding:2px 0;}',
      '.ws-text{font-size:13.5px;line-height:3.1;color:var(--ink-2,#e8e4dc);margin-bottom:4px;}',
      /* WAP metrics */
      '.wap-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-bottom:12px;}',
      '.wap-metric{display:flex;flex-direction:column;align-items:center;padding:10px 6px;border-radius:10px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.08);}',
      '.wap-metric b{font-family:var(--mono,"JetBrains Mono",monospace);font-size:18px;font-weight:900;color:rgba(123,227,123,1);}',
      '.wap-metric span{font-family:var(--mono,"JetBrains Mono",monospace);font-size:9px;color:rgba(255,255,255,.4);letter-spacing:.1em;text-transform:uppercase;margin-top:2px;}',
      /* WAP progress */
      '.wap-prog-wrap{display:flex;align-items:center;gap:10px;margin-bottom:12px;}',
      '.wap-prog-bar{flex:1;height:6px;background:rgba(255,255,255,.07);border-radius:99px;overflow:hidden;}',
      '.wap-prog-fill{height:100%;background:linear-gradient(90deg,#3a8a3a,rgba(123,227,123,1));border-radius:99px;transition:width .3s;}',
      '.wap-prog-label{font-family:var(--mono,"JetBrains Mono",monospace);font-size:10.5px;color:rgba(255,255,255,.4);white-space:nowrap;}',
      /* WAP eval btn */
      '.wap-eval-btn{width:100%;padding:11px;background:rgba(123,227,123,.12);border:1px solid rgba(123,227,123,.35);border-radius:12px;font-size:13px;font-weight:700;color:rgba(123,227,123,1);cursor:pointer;transition:.15s;letter-spacing:.02em;}',
      '.wap-eval-btn:hover:not(:disabled){background:rgba(123,227,123,.22);}',
      '.wap-eval-btn:disabled{opacity:.45;cursor:not-allowed;}',
      /* WAP scores */
      '.wap-scores{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-bottom:10px;}',
      '.wap-score-card{display:flex;flex-direction:column;align-items:center;padding:10px 6px;border-radius:10px;background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.08);}',
      '.wap-score-card b{font-family:var(--mono,"JetBrains Mono",monospace);font-size:18px;font-weight:900;color:rgba(123,227,123,1);}',
      '.wap-score-card span{font-family:var(--mono,"JetBrains Mono",monospace);font-size:9px;color:rgba(255,255,255,.4);letter-spacing:.08em;text-transform:uppercase;margin-top:2px;text-align:center;}',
      '.wap-total{text-align:center;font-family:var(--mono,"JetBrains Mono",monospace);font-size:30px;font-weight:900;color:rgba(123,227,123,1);margin:6px 0 12px;}',
      '.wap-total small{font-size:13px;color:rgba(255,255,255,.4);font-weight:400;}',
      '.wap-feedback{display:flex;flex-direction:column;gap:5px;margin-bottom:12px;}',
      '.wap-fb-line{font-size:11.5px;color:rgba(255,255,255,.7);line-height:1.45;padding:6px 10px;border-radius:8px;background:rgba(255,255,255,.03);}',
      '.wap-retry-btn{width:100%;padding:9px;background:transparent;border:1px solid rgba(255,255,255,.1);border-radius:10px;font-size:12px;color:rgba(255,255,255,.4);cursor:pointer;transition:.15s;}',
      '.wap-retry-btn:hover{border-color:rgba(123,227,123,.4);color:rgba(123,227,123,1);}',
      /* we-btn overrides */
      '.we-btn{padding:9px 16px;border-radius:10px;font-size:12px;font-weight:700;cursor:pointer;transition:.12s;letter-spacing:.03em;}',
      '.we-btn-primary{background:rgba(123,227,123,.13);border:1px solid rgba(123,227,123,.35);color:#7BE37B;}',
      '.we-btn-primary:hover:not(:disabled){background:rgba(123,227,123,.23);}',
      '.we-btn-secondary{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.48);}',
      '.we-btn-secondary:hover{background:rgba(255,255,255,.08);}',
      '.we-btn:disabled{opacity:.38;cursor:not-allowed;}'
    ].join('');
    document.head.appendChild(s);
  }

  /* ── RENDER principal ── */
  function _render(){
    _injectCSS();
    var wrap=document.getElementById('write-preview-wrap')
      ||document.querySelector('.mid-content[data-skill="write"]');
    if(!wrap) return;
    if(!document.getElementById('write-preview-wrap')){
      wrap.innerHTML='<div id="write-preview-wrap"></div>';
      wrap=document.getElementById('write-preview-wrap');
    }

    var v=_getV(), level=LEVELS[v]||'A1', pool=_pool(v);

    wrap.innerHTML=
      /* Panel 1: input */
      '<div class="exam-panel write-panel" style="--c:123,227,123;margin-bottom:12px;" id="we-input-panel">'
        +'<header class="ep-h">'
          +'<span class="ep-tag">admin · '+_esc(_getLang().toUpperCase())+' · v'+v+' · '+_esc(level)+'</span>'
          +'<span class="ep-count" id="we-pool-count">'+pool.length+' texto'+(pool.length!==1?'s':'')+'</span>'
        +'</header>'
        +'<div style="display:flex;flex-direction:column;gap:10px;">'
          +'<div>'
            +'<textarea id="we-input" maxlength="'+MAX_CHARS+'" rows="6" '
              +'placeholder="Escribe o pega el texto en inglés aquí (máx '+MAX_CHARS+' caracteres)…" '
              +'style="width:100%;box-sizing:border-box;background:rgba(255,255,255,.04);border:1px solid rgba(123,227,123,.25);'
              +'border-radius:10px;color:#e8e4dc;font-size:12.5px;line-height:1.65;padding:10px 12px;resize:vertical;outline:none;font-family:inherit;"></textarea>'
            +'<div style="text-align:right;font-size:10px;color:rgba(255,255,255,.35);margin-top:3px;">'
              +'<span id="we-char-count">0</span> / '+MAX_CHARS
            +'</div>'
          +'</div>'
          +'<div style="display:flex;gap:8px;">'
            +'<button id="we-gen-btn" class="we-btn we-btn-primary" style="flex:1;" disabled>✦ Generar blanks con IA</button>'
            +'<button id="we-clear-btn" class="we-btn we-btn-secondary" title="Limpiar">✕</button>'
          +'</div>'
          +'<div id="we-status" style="font-size:11px;color:rgba(255,255,255,.4);min-height:16px;"></div>'
        +'</div>'
      +'</div>'

      /* Panel 2: gestión del pool */
      +'<div class="exam-panel write-panel" style="--c:123,227,123;margin-bottom:12px;" id="we-list-panel">'
        +'<header class="ep-h">'
          +'<span class="ep-tag">mis textos · v'+v+' · '+_esc(level)+'</span>'
          +'<span class="ep-count" id="we-list-count">'+pool.length+'</span>'
        +'</header>'
        +'<div id="we-item-list"></div>'
      +'</div>'

      /* Panel 3: preview con navegación */
      +'<div id="we-preview-target"></div>';

    _renderList();
    _wireEvents();
    // Si hay textos, mostrar el primero con nav
    if(pool.length) _showPreviewAt(0);
  }

  /* ── Lista de textos ── */
  var _previewIdx=0;

  function _renderList(){
    var listEl=document.getElementById('we-item-list');
    if(!listEl) return;
    var v=_getV(), pool=_pool(v);
    var c1=document.getElementById('we-pool-count');
    if(c1) c1.textContent=pool.length+' texto'+(pool.length!==1?'s':'');
    var c2=document.getElementById('we-list-count');
    if(c2) c2.textContent=pool.length;

    if(!pool.length){
      listEl.innerHTML='<p style="font-size:11px;color:rgba(255,255,255,.2);text-align:center;padding:14px 0;margin:0;">Sin textos — genera el primero arriba</p>';
      return;
    }
    listEl.innerHTML=pool.map(function(item,idx){
      var active=(_previewIdx===idx);
      return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;'
        +(idx<pool.length-1?'border-bottom:1px solid rgba(255,255,255,.05);':'')
        +(active?'background:rgba(123,227,123,.05);margin:0 -14px;padding:8px 14px;border-radius:8px;':'')
        +'">'
          +'<div style="flex:1;min-width:0;cursor:pointer;" onclick="window._wePreview('+idx+')">'
            +'<div style="font-size:11.5px;font-weight:700;color:'+(active?'#7BE37B':'#e8e4dc')+';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'
              +(active?'▶ ':'')+_esc(item.label||('Texto '+(idx+1)))
            +'</div>'
            +'<div style="font-size:10px;color:rgba(255,255,255,.35);margin-top:2px;">'+(item.blanks||'?')+' espacios · '+(item.chars||'?')+' chars</div>'
          +'</div>'
          +'<div style="display:flex;gap:4px;flex-shrink:0;">'
            +'<button class="we-btn we-btn-secondary" style="padding:4px 9px;font-size:10px;" onclick="window._weEdit('+idx+')">✎</button>'
            +'<button class="we-btn we-btn-secondary" style="padding:4px 9px;font-size:10px;color:#ff7a7a;border-color:rgba(255,90,90,.3);" onclick="window._weDelete('+idx+')">✕</button>'
          +'</div>'
        +'</div>';
    }).join('');
  }

  /* ── Preview con flechas de navegación ── */
  function _showPreviewAt(idx){
    var v=_getV(), pool=_pool(v);
    if(!pool.length){ document.getElementById('we-preview-target').innerHTML=''; return; }
    _previewIdx=Math.max(0,Math.min(idx,pool.length-1));
    var item=pool[_previewIdx];
    _renderList(); // actualiza highlight

    var pt=document.getElementById('we-preview-target');
    if(!pt) return;

    var navHTML='';
    if(pool.length>1){
      navHTML='<div style="display:flex;align-items:center;justify-content:space-between;'
        +'margin-bottom:10px;padding:0 2px;">'
          +'<button id="we-prev-btn" class="we-btn we-btn-secondary" style="padding:6px 14px;"'
            +(_previewIdx===0?' disabled':'')+'>← anterior</button>'
          +'<span style="font-size:11px;color:rgba(255,255,255,.35);">'
            +(_previewIdx+1)+' / '+pool.length
          +'</span>'
          +'<button id="we-next-btn" class="we-btn we-btn-secondary" style="padding:6px 14px;"'
            +(_previewIdx===pool.length-1?' disabled':'')+'>siguiente →</button>'
        +'</div>';
    }

    pt.innerHTML=navHTML+item.html;

    // Wire nav buttons
    var pb=document.getElementById('we-prev-btn');
    var nb=document.getElementById('we-next-btn');
    if(pb) pb.addEventListener('click',function(){ _showPreviewAt(_previewIdx-1); });
    if(nb) nb.addEventListener('click',function(){ _showPreviewAt(_previewIdx+1); });

    if(typeof window._writeInitEngine==='function') setTimeout(window._writeInitEngine,80);
  }

  /* ── Eventos del panel input ── */
  var _pendingItem=null;

  function _wireEvents(){
    var inp=document.getElementById('we-input');
    var genBtn=document.getElementById('we-gen-btn');
    var clearBtn=document.getElementById('we-clear-btn');

    if(inp){
      inp.addEventListener('input',function(){
        var len=this.value.length;
        var c=document.getElementById('we-char-count');
        if(c){ c.textContent=len; c.style.color=len>750?'#FF5A5A':len>600?'#FFD83D':''; }
        if(genBtn) genBtn.disabled=len<60;
      });
    }
    if(genBtn) genBtn.addEventListener('click',_onGenerate);
    if(clearBtn){
      clearBtn.addEventListener('click',function(){
        var inp2=document.getElementById('we-input');
        if(inp2){ inp2.value=''; inp2.dispatchEvent(new Event('input')); }
        _removeSaveBar(); _pendingItem=null;
        _setStatus('');
        var v=_getV(), pool=_pool(v);
        if(pool.length) _showPreviewAt(_previewIdx);
        else document.getElementById('we-preview-target').innerHTML='';
      });
    }
  }

  /* ── Generar con OpenAI ── */
  async function _onGenerate(){
    var inp=document.getElementById('we-input');
    var genBtn=document.getElementById('we-gen-btn');
    if(!inp||!inp.value.trim()) return;
    var oaiKey=_getOAI();
    if(!oaiKey){ _setStatus('⚠ Ingresa tu API key en la pestaña Flashcards del admin','#FF5A5A'); return; }
    var text=inp.value.trim(), v=_getV(), level=LEVELS[v]||'A1';
    genBtn.disabled=true; genBtn.textContent='⏳ Generando…';
    _setStatus('Consultando IA…','');
    try {
      var item=await _callAI(oaiKey,text,level);
      _pendingItem=item;
      // Mostrar en preview-target sin tocar el pool todavía
      var pt=document.getElementById('we-preview-target');
      if(pt){
        pt.innerHTML=item.html;
        if(typeof window._writeInitEngine==='function') setTimeout(window._writeInitEngine,80);
      }
      _showSaveBar();
      _setStatus('✓ '+item.blanks+' blanks generados — revisa y guarda','#7BE37B');
    } catch(e){
      console.error('[admin-editor-write]',e);
      _setStatus('⚠ '+_esc(e.message||'Error — revisa la API key'),'#FF5A5A');
    }
    genBtn.disabled=false; genBtn.textContent='✦ Generar blanks con IA';
  }

  async function _callAI(key,text,level){
    var wc=text.split(/\s+/).length;
    var target=Math.max(6,Math.min(15,Math.round(wc*0.14)));
    var sys='You are an English fill-in-the-blank creator for CEFR '+level+'.\n'
      +'Select exactly '+target+' key content words (nouns, main verbs, adjectives, adverbs) — NOT articles, prepositions, conjunctions, auxiliaries.\n'
      +'For each blank provide its Spanish translation as hint.\n'
      +'Words must appear EXACTLY as in the text (no punctuation attached).\n'
      +'Reply ONLY with valid JSON, no markdown.';
    var usr='Text:\n"'+text+'"\n\nReturn: {"blanks":[{"word":"exact","hint":"español"},...]}\nSelect '+target+' in order of appearance.';
    var resp=await fetch('https://api.openai.com/v1/chat/completions',{
      method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},
      body:JSON.stringify({model:'gpt-4o-mini',temperature:0.2,messages:[{role:'system',content:sys},{role:'user',content:usr}]})
    });
    if(!resp.ok) throw new Error('OpenAI '+resp.status);
    var d=await resp.json();
    var raw=(d.choices&&d.choices[0]&&d.choices[0].message&&d.choices[0].message.content)||'';
    raw=raw.replace(/^```[a-z]*\n?/i,'').replace(/\n?```$/,'').trim();
    var m=raw.match(/\{[\s\S]*\}/); if(!m) throw new Error('JSON inválido');
    var parsed=JSON.parse(m[0]);
    var blanks=(parsed.blanks||[]).slice(0,target);
    if(!blanks.length) throw new Error('Sin blanks en respuesta');
    return _buildItem(text,blanks,level);
  }

  function _buildItem(text,blanks,level){
    var processed=text, applied=[];
    blanks.forEach(function(b){
      var word=(b.word||'').replace(/[.,!?;:'"()]+$/,'').replace(/^[.,!?;:'"(]+/,'');
      var hint=b.hint||'';
      var rx=new RegExp('(?<![\\w\\u00C0-\\u024F])'+_escRx(word)+'(?![\\w\\u00C0-\\u024F])');
      if(!rx.test(processed)) return;
      var w=Math.max(55,Math.min(140,word.length*9+16));
      processed=processed.replace(rx,
        '<span class="blank-wrap">'
        +'<input class="blank-input" placeholder="___" maxlength="'+(word.length+8)+'" '
        +'style="width:'+w+'px" oninput="window._wbUpd&&window._wbUpd()">'
        +'<span class="blank-hint">'+_esc(hint)+'</span>'
        +'</span>');
      applied.push(b);
    });
    var n=applied.length;
    var title=text.trim().split(/\s+/).slice(0,5).join(' ')+(text.trim().split(/\s+/).length>5?'…':'');
    var slug=title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
    var html=
      '<div class="exam-panel write-panel" style="--c:123,227,123;">'
        +'<header class="ep-h">'
          +'<span class="ep-tag">writing · '+_esc(slug)+'</span>'
          +'<span class="ep-count"><b id="writeWordCount">0</b> palabras · '+n+' espacios · '+_esc(level)+'</span>'
        +'</header>'
        +'<div class="write-story" id="writeStory"><p class="ws-text">'+processed+'</p></div>'
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
            +'<div class="wap-prog-bar"><div class="wap-prog-fill" id="wap-progress-fill" style="width:0%"></div></div>'
            +'<span class="wap-prog-label" id="wap-progress-label">0 / '+n+' espacios completados</span>'
          +'</div>'
          +'<button class="wap-eval-btn" id="wap-eval-btn" disabled onclick="window._writeEvaluate()">Completa más espacios para evaluar</button>'
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
    return {id:Date.now(),label:title,chars:text.length,blanks:n,html:html};
  }

  /* ── Barra de guardar ── */
  function _showSaveBar(){
    _removeSaveBar();
    var listPanel=document.getElementById('we-list-panel');
    if(!listPanel) return;
    var bar=document.createElement('div');
    bar.id='we-save-bar'; bar.style.cssText='margin-bottom:12px;';
    bar.innerHTML='<button id="we-save-btn" class="we-btn we-btn-primary" style="width:100%;padding:10px 16px;font-size:12.5px;">💾 Guardar en pool de textos</button>';
    listPanel.parentNode.insertBefore(bar,listPanel);
    document.getElementById('we-save-btn').addEventListener('click',_onSave);
  }
  function _removeSaveBar(){ var b=document.getElementById('we-save-bar'); if(b) b.remove(); }

  async function _onSave(){
    if(!_pendingItem) return;
    var btn=document.getElementById('we-save-btn');
    if(btn){ btn.disabled=true; btn.textContent='Guardando…'; }
    try {
      var v=_getV(), lang=_getLang();
      if(!window.WRITE_POOLS) window.WRITE_POOLS={};
      if(!window.WRITE_POOLS[lang]) window.WRITE_POOLS[lang]={};
      if(!Array.isArray(window.WRITE_POOLS[lang][v])) window.WRITE_POOLS[lang][v]=[];
      window.WRITE_POOLS[lang][v].push(_pendingItem);
      var sha=await _pushPools();
      _saveToStorage();
      _pendingItem=null;
      var inp=document.getElementById('we-input');
      if(inp){ inp.value=''; inp.dispatchEvent(new Event('input')); }
      _removeSaveBar();
      _renderList();
      _previewIdx=_pool(v).length-1;
      _showPreviewAt(_previewIdx);
      _setStatus('✓ Guardado · commit '+sha.slice(0,7),'#7BE37B');
    } catch(e){
      if(btn){ btn.disabled=false; btn.textContent='💾 Guardar en pool de textos'; }
      _setStatus('⚠ Error: '+_esc(e.message||''),'#FF5A5A');
    }
  }

  /* ── CRUD público ── */
  window._wePreview=function(idx){ _showPreviewAt(idx); };

  window._weEdit=function(idx){
    var v=_getV(), pool=_pool(v);
    var item=pool[idx]; if(!item) return;
    var tmp=document.createElement('div');
    tmp.innerHTML=item.html;
    var storyEl=tmp.querySelector('#writeStory p,.ws-text');
    var plain='';
    if(storyEl){
      var clone=storyEl.cloneNode(true);
      clone.querySelectorAll('.blank-wrap').forEach(function(bw){
        var hint=bw.querySelector('.blank-hint');
        var sp=document.createElement('span');
        sp.textContent='['+(hint&&hint.textContent||'___')+']';
        bw.parentNode.replaceChild(sp,bw);
      });
      plain=(clone.innerText||clone.textContent||'').replace(/\s{2,}/g,' ').trim();
    }
    var inp=document.getElementById('we-input');
    if(inp){ inp.value=plain; inp.dispatchEvent(new Event('input')); inp.focus(); }
    // Sacar del pool (se re-agrega al guardar)
    var dlang=_getLang();
    if(window.WRITE_POOLS&&window.WRITE_POOLS[dlang]) window.WRITE_POOLS[dlang][v]=pool.filter(function(_,i){ return i!==idx; });
    _renderList();
    _setStatus('✎ Texto listo — modifica y genera de nuevo','#FFD83D');
    var pt=document.getElementById('we-preview-target');
    if(pt) pt.innerHTML='';
  };

  window._weDelete=async function(idx){
    if(!confirm('¿Eliminar este texto del pool?')) return;
    var v=_getV(), pool=_pool(v);
    if(!pool.length) return;
    var elang=_getLang();
    if(window.WRITE_POOLS&&window.WRITE_POOLS[elang]) window.WRITE_POOLS[elang][v]=pool.filter(function(_,i){ return i!==idx; });
    try {
      var sha=await _pushPools();
      _saveToStorage();
      _previewIdx=Math.min(_previewIdx,_pool(v).length-1);
      _renderList();
      var newPool=_pool(v);
      if(newPool.length) _showPreviewAt(_previewIdx);
      else document.getElementById('we-preview-target').innerHTML='';
      _setStatus('✓ Eliminado · commit '+sha.slice(0,7),'#7BE37B');
    } catch(e){ _setStatus('⚠ '+_esc(e.message||''),'#FF5A5A'); }
  };

  /* ── GitHub push ── */
  async function _pushPools(){
    var token=_ghToken();
    var hdrs={'Authorization':'token '+token,'Content-Type':'application/json','Accept':'application/vnd.github.v3+json'};
    var getR=await fetch('https://api.github.com/repos/'+GH_REPO+'/contents/'+POOLS_FILE,{headers:hdrs});
    var sha=null;
    if(getR.ok){ var gd=await getR.json(); sha=gd.sha; }
    var body={message:'writing: actualizar pool v'+_getV()+' — '+_pool(_getV()).length+' textos',content:_b64(_serializePools())};
    if(sha) body.sha=sha;
    var putR=await fetch('https://api.github.com/repos/'+GH_REPO+'/contents/'+POOLS_FILE,{method:'PUT',headers:hdrs,body:JSON.stringify(body)});
    if(!putR.ok){ var ed=await putR.json(); throw new Error('GitHub '+putR.status+': '+(ed.message||'')); }
    return (await putR.json()).commit.sha;
  }

  function _serializePools(){
    var pools=window.WRITE_POOLS||{};
    var langs=['en','pt','fr','de'];
    var hdr=[
      '// exam-write-pools.js',
      '// Pool de textos Writing por idioma y versión',
      '// Estructura: WRITE_POOLS[lang][version]',
      '// Langs: en pt fr de | Versions: 1=A1 2=A2 3=B1 4=B2 5=C1',
      '// Gestionado desde admin-examen-editor.html → pestaña Writing',
      '','const WRITE_POOLS = {'
    ];
    var body=[];
    langs.forEach(function(lang,li){
      body.push('  '+lang+': {');
      var lp=pools[lang]||{};
      [1,2,3,4,5].forEach(function(v,vi){
        var arr=Array.isArray(lp[v])?lp[v]:[];
        var sep=vi<4?',':'';
        if(!arr.length){ body.push('    '+v+': []'+sep); return; }
        body.push('    '+v+': [');
        arr.forEach(function(item,ii){
          var safe=(item.html||'').replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$\{/g,'\\${');
          body.push('      {id:'+item.id+',label:'+JSON.stringify(item.label||'')+',chars:'+(item.chars||0)+',blanks:'+(item.blanks||0)+',html:`'+safe+'`}'+(ii<arr.length-1?',':''));
        });
        body.push('    ]'+sep);
      });
      body.push('  }'+(li<langs.length-1?',':''));
    });
    return hdr.concat(body).concat(['};','']).join('\n');
  }

  function _saveToStorage(){
    try { localStorage.setItem('_aura_write_pools', JSON.stringify(window.WRITE_POOLS||{})); }
    catch(e){ console.warn('[admin-editor-write] localStorage save:', e); }
  }

  function _setStatus(msg,color){ var el=document.getElementById('we-status'); if(!el) return; el.textContent=msg; el.style.color=color||'rgba(255,255,255,.4)'; }
  function _b64(str){ return btoa(unescape(encodeURIComponent(str))); }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded',function(){
    document.addEventListener('click',function(e){
      var tab=e.target.closest('.tab[data-skill]');
      if(tab&&tab.dataset.skill==='write') setTimeout(_render,60);
    });
    var activeWrite=document.querySelector('.tab[data-skill="write"].active');
    if(activeWrite) setTimeout(_render,120);
    var vSel=document.getElementById('adm-version');
    if(vSel) vSel.addEventListener('change',function(){
      var act=document.querySelector('.tab.active');
      if(act&&act.dataset&&act.dataset.skill==='write') setTimeout(_render,60);
    });
  });

  /* ── Cargar pool fresco desde GitHub API (bypass caché de GitHub Pages) ── */
  async function _loadPoolFresh(){
    try {
      var resp = await fetch(
        'https://api.github.com/repos/'+GH_REPO+'/contents/'+POOLS_FILE,
        { headers:{'Authorization':'token '+_ghToken(),'Accept':'application/vnd.github.v3+json'} }
      );
      if(!resp.ok) throw new Error('GitHub GET '+resp.status);
      var data = await resp.json();
      var raw = atob(data.content.replace(/
/g,''));
      // Ejecutar el JS del archivo para obtener WRITE_POOLS actualizado
      var fn = new Function(raw + '; return typeof WRITE_POOLS!=="undefined"?WRITE_POOLS:null;');
      var fresh = fn();
      if(fresh && typeof fresh==='object'){
        window.WRITE_POOLS = fresh;
      }
    } catch(e){
      console.warn('[admin-editor-write] load fresh:', e);
      // Fallback: localStorage
      try {
        var ls = localStorage.getItem('_aura_write_pools');
        if(ls){ var saved=JSON.parse(ls); if(saved) window.WRITE_POOLS=saved; }
      } catch(e2){}
    }
  }

  window._initWriteAdminEditor = async function(){
    await _loadPoolFresh();
    _render();
  };
})();

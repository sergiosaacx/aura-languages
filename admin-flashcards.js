/* admin-flashcards.js */
(function () {
  'use strict';
  var _parsed = [];
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

  window.initFlashcardsAdmin = function () { _refreshKeyStatus(); _loadExisting(); };

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

  function _splitBySections(text) {
    var catMap = [
      {re:/\bBUSINESS\b/i,           cat:'business'},
      {re:/\bPHRASAL[\s_-]*VERBS?\b/i,cat:'phrasal_verbs'},
      {re:/\bIDIOMS?\b/i,            cat:'idioms'},
      {re:/\bSLANG\b/i,             cat:'slang'}
    ];
    var hits = [];
    catMap.forEach(function(cm){ var idx=text.search(cm.re); if(idx>=0) hits.push({idx:idx,cat:cm.cat}); });
    hits.sort(function(a,b){return a.idx-b.idx;});
    if (hits.length < 2) {
      var lines=text.split('\n'), size=Math.ceil(lines.length/4), out=[];
      for(var i=0;i<4;i++){var c=lines.slice(i*size,(i+1)*size).join('\n').trim();if(c)out.push({text:c,cat:null});}
      return out;
    }
    var sections=[];
    for(var j=0;j<hits.length;j++){
      var start=hits[j].idx, end=j+1<hits.length?hits[j+1].idx:text.length;
      var chunk=text.slice(start,end).trim();
      if(chunk) sections.push({text:chunk,cat:hits[j].cat});
    }
    return sections;
  }

  function _buildPrompt(text, forcedCat) {
    var catLine = forcedCat
      ? 'IMPORTANTE: Todas las tarjetas de este bloque son de categoria "'+forcedCat+'". Usa ese valor exacto en "cat" para TODAS.\n\n'
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

  window.fcHandleFile = async function (input) {
    var file = input.files[0];
    if (!file) return;
    document.getElementById('fc-filename').textContent = file.name;
    document.getElementById('fc-preview-count').textContent = 'Extrayendo texto...';
    document.getElementById('fc-save-btn').style.display = 'none';
    try {
      var ab     = await file.arrayBuffer();
      var result = await mammoth.extractRawText({arrayBuffer:ab});
      var raw    = result.value.trim();
      if (!raw) { document.getElementById('fc-preview-count').textContent='Documento vacio'; return; }
      var sections = _splitBySections(raw);
      var allCards = [];
      for (var i=0; i<sections.length; i++) {
        document.getElementById('fc-preview-count').textContent = 'Analizando seccion '+(i+1)+' de '+sections.length+'...';
        var batch = await _oaiCall(_buildPrompt(sections[i].text, sections[i].cat), 16000);
        if (sections[i].cat) batch = batch.map(function(c){c.cat=sections[i].cat;return c;});
        allCards = allCards.concat(batch);
      }
      allCards = allCards.map(function(c){c.distractor='';c.distractors=[];return c;});
      _parsed = allCards;
      _renderPreview(allCards);
    } catch(err) {
      document.getElementById('fc-preview-count').textContent = 'Error: '+err.message;
      console.error(err);
    }
  };

  function _renderPreview(cards) {
    var countEl=document.getElementById('fc-count');
    var previewEl=document.getElementById('fc-preview-count');
    var saveBtn=document.getElementById('fc-save-btn');
    var tbody=document.getElementById('fc-list');
    if(countEl)   countEl.textContent   = cards.length+' tarjetas';
    if(previewEl) previewEl.textContent = cards.length+' tarjetas listas para guardar';
    if(saveBtn)   saveBtn.style.display = 'inline-flex';
    if(tbody) {
      tbody.innerHTML = cards.map(function(c,i){
        var dc={easy:'#4ade80',med:'#facc15',hard:'#f97316',leg:'#f87171'};
        var col=dc[c.difficulty]||'#a855f7';
        return '<tr style="background:'+(i%2===0?'transparent':'#ffffff08')+'">'
          +'<td style="padding:8px 12px;font-weight:700;color:#c084fc">'+_esc(c.word)+'</td>'
          +'<td style="padding:8px 12px;font-size:12px">'+_esc(c.example)+'</td>'
          +'<td style="padding:8px 12px;font-size:12px">'+_esc(c.definition)+'</td>'
          +'<td style="padding:8px 12px"><span style="background:#7c3aed33;color:#a855f7;padding:2px 8px;border-radius:20px;font-size:11px">'+_esc(c.cat)+'</span></td>'
          +'<td style="padding:8px 12px"><span style="color:'+col+';font-size:11px;font-weight:700">'+_esc(c.difficulty||'med')+'</span></td>'
          +'<td style="padding:8px 12px"><span style="color:#4ade80;font-size:12px">OK</span></td>'
          +'</tr>';
      }).join('');
    }
  }

  async function _generateDistractors(cards, progressCb) {
    var BATCH=12, result={};
    for (var i=0; i<cards.length; i+=BATCH) {
      var batch=cards.slice(i,i+BATCH);
      if(progressCb) progressCb(i,cards.length);
      var items=batch.map(function(c){
        return '{"id":'+JSON.stringify(c.id)+',"word":'+JSON.stringify(c.word)+',"definition":'+JSON.stringify(c.definition)+'}';
      }).join(',\n');
      var prompt='Dado este array de expresiones en ingles, genera 10 significados FALSOS en ESPANOL para cada una.\n'
        +'Deben: estar en ESPANOL, parecer plausibles, relacionarse con las palabras o contexto, max 10 palabras cada uno.\n'
        +'Devuelve SOLO un array JSON donde cada elemento tiene "id" y "distractors" (array de 10 strings en ESPANOL).\n\n'
        +'Input:\n['+items+']\n\nArray JSON:';
      try {
        var br=await _oaiCall(prompt,6000);
        br.forEach(function(r){ if(r.id&&Array.isArray(r.distractors)) result[r.id]=r.distractors.slice(0,10); });
      } catch(e) { console.warn('Lote distractores:',e.message); }
    }
    return result;
  }

  window.fcSaveAll = async function () {
    if (!_parsed.length) return;
    var sb=_getSb();
    if (!sb) { alert('Supabase no disponible'); return; }
    var saveBtn=document.getElementById('fc-save-btn');
    var previewEl=document.getElementById('fc-preview-count');
    if(saveBtn){saveBtn.textContent='Guardando...';saveBtn.disabled=true;}
    var validCats=['slang','idioms','phrasal_verbs','business'];
    var validDiffs=['easy','med','hard','leg'];
    var rows=_parsed.map(function(c){
      return {
        word:(c.word||'').trim(), example:(c.example||'').trim(),
        distractor:'', distractors:[],
        definition:(c.definition||'').trim(),
        label:(c.label||'').trim()||'Slang',
        cat:validCats.includes(c.cat)?c.cat:'slang',
        difficulty:validDiffs.includes(c.difficulty)?c.difficulty:'med'
      };
    }).filter(function(r){return r.word;});
    try {
      if(previewEl) previewEl.textContent='Verificando duplicados...';
      var words=rows.map(function(r){return r.word;});
      var existRes=await sb.from('slang_cards').select('id,word').in('word',words);
      var existingMap={};
      (existRes.data||[]).forEach(function(e){existingMap[e.word]=e.id;});
      var toInsert=rows.filter(function(r){return !existingMap[r.word];});
      var toUpdate=rows.filter(function(r){return  existingMap[r.word];});
      var savedCards=[];
      if(toInsert.length){
        var insRes=await sb.from('slang_cards').insert(toInsert).select('id,word,definition');
        if(insRes.error) throw new Error('Insert: '+insRes.error.message);
        savedCards=savedCards.concat(insRes.data||[]);
      }
      if(toUpdate.length){
        var upOps=toUpdate.map(function(r){
          return sb.from('slang_cards').update({
            example:r.example,definition:r.definition,label:r.label,
            cat:r.cat,difficulty:r.difficulty,distractor:'',distractors:[]
          }).eq('id',existingMap[r.word]).select('id,word,definition');
        });
        var upRes=await Promise.all(upOps);
        upRes.forEach(function(res){if(res.data) savedCards=savedCards.concat(res.data);});
      }
      if(previewEl) previewEl.textContent=toInsert.length+' nuevas + '+toUpdate.length+' actualizadas. Generando distractores...';
      var dmap=await _generateDistractors(savedCards,function(done,total){
        if(previewEl) previewEl.textContent='Generando distractores: '+done+' / '+total+'...';
      });
      var dops=Object.keys(dmap).map(function(id){
        return sb.from('slang_cards').update({distractors:dmap[id]}).eq('id',id);
      });
      await Promise.all(dops);
      if(previewEl) previewEl.textContent=toInsert.length+' nuevas + '+toUpdate.length+' actualizadas — distractores en Espanol listos';
    } catch(err){
      alert('Error: '+err.message);
      console.error(err);
    }
    if(saveBtn){saveBtn.style.display='none';saveBtn.textContent='Guardar tarjetas';saveBtn.disabled=false;}
    _parsed=[];
    _loadExisting();
  };

  async function _loadExisting() {
    var sb=_getSb(); if(!sb) return;
    var tbody=document.getElementById('fc-list'); if(!tbody) return;
    var res=await sb.from('slang_cards').select('id,word,cat,difficulty,created_at').order('created_at',{ascending:false}).limit(2000);
    if(res.error||!res.data||!res.data.length){
      if(!_parsed.length) tbody.innerHTML='<tr><td colspan="6" style="padding:20px;text-align:center;opacity:.5">No hay tarjetas aun</td></tr>';
      return;
    }
    if(_parsed.length) return;
    var countEl=document.getElementById('fc-count');
    var total=res.data.length; if(countEl) countEl.textContent=total+(total>=2000? '+':'')+' tarjetas';
    var dc={easy:'#4ade80',med:'#facc15',hard:'#f97316',leg:'#f87171'};
    tbody.innerHTML=res.data.map(function(c,i){
      var col=dc[c.difficulty]||'#a855f7';
      return '<tr style="background:'+(i%2===0?'transparent':'#ffffff08')+'">'
        +'<td style="padding:8px 12px;font-weight:700;color:#c084fc">'+_esc(c.word)+'</td>'
        +'<td style="padding:8px 12px;font-size:12px;opacity:.5" colspan="2">guardado</td>'
        +'<td style="padding:8px 12px"><span style="background:#7c3aed33;color:#a855f7;padding:2px 8px;border-radius:20px;font-size:11px">'+_esc(c.cat)+'</span></td>'
        +'<td style="padding:8px 12px"><span style="color:'+col+';font-size:11px;font-weight:700">'+_esc(c.difficulty||'')+'</span></td>'
        +'<td style="padding:8px 12px"><button onclick="fcDelete(\''+c.id+'\')" style="background:#7f1d1d22;color:#f87171;border:1px solid #7f1d1d44;border-radius:6px;padding:3px 10px;cursor:pointer;font-size:11px">Borrar</button></td>'
        +'</tr>';
    }).join('');
  }

  window.fcDelete = async function (id) {
    if(!confirm('Eliminar esta tarjeta?')) return;
    var sb=_getSb(); if(!sb) return;
    var res=await sb.from('slang_cards').delete().eq('id',id);
    if(res.error){alert('Error: '+res.error.message);return;}
    _loadExisting();
  };

  function _esc(str){
    return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
})();

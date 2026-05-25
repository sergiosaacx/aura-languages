/* ════════════════════════════════════════════════════════════════
   admin-examen-editor-pool.js
   Editor de pool de Listening (video + cloze) para admin-examen-editor.html
   - Pool VIDEO: clips para panel izq (hero card) con pregunta MC
   - Pool CLOZE: clips para panel central (audio + blanks)
   - Datos: tabla exam_content, una fila por clip
   - Aleatorización: examen-ascenso.html escoge 1 random de cada pool
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var RANK_BY_V = {1:'bronce', 2:'plata', 3:'oro', 4:'platino', 5:'diamante'};

var _videoPool = [];
var _clozePool = [];
var _peliculasCache = {};
var _escenasCache = {};
var _curV = 1;
var _curLang = 'en';

function _sb(){ return (window._aura && window._aura.sb) ? window._aura.sb : null; }
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function _fmtT(s){ s = +s||0; var m = Math.floor(s/60), r = Math.floor(s%60); return m+':'+String(r).padStart(2,'0'); }
function _toast(msg){ if(typeof window.admShowToast==='function') window.admShowToast(msg); }

async function _loadPeliculas(lang){
  if(_peliculasCache[lang]) return _peliculasCache[lang];
  var sb = _sb(); if(!sb) return [];
  var q = sb.from('peliculas').select('id,slug,titulo_main,titulo_sub,language').eq('activo',true).order('orden');
  if(lang === 'en') q = q.or('language.eq.en,language.is.null');
  else q = q.eq('language', lang);
  var res = await q;
  _peliculasCache[lang] = res.data || [];
  return _peliculasCache[lang];
}

async function _loadEscenas(pelId){
  if(!pelId) return [];
  if(_escenasCache[pelId]) return _escenasCache[pelId];
  var sb = _sb(); if(!sb) return [];
  var res = await sb.from('escenas').select('id,numero,youtube_id,start_time,end_time,phrase,speaker').eq('pelicula_id', pelId).order('numero');
  _escenasCache[pelId] = res.data || [];
  return _escenasCache[pelId];
}

async function _loadPools(rank, lang){
  _videoPool = []; _clozePool = [];
  var sb = _sb(); if(!sb) return;
  var res = await sb.from('exam_content').select('*').eq('section','listening').eq('rank', rank).eq('language', lang);
  if(res.error){ console.warn('loadPools', res.error); return; }
  (res.data||[]).forEach(function(row){
    var c = row.content;
    if(typeof c === 'string'){ try{ c = JSON.parse(c); }catch(e){ c = {}; } }
    if(!c) c = {};
    var item = Object.assign({_id: row.id}, c);
    if(row.content_type === 'listening_video') _videoPool.push(item);
    else if(row.content_type === 'listening_cloze') _clozePool.push(item);
  });
}

function _newVideoClip(){
  return {pelicula_id:'', escena_id:'', youtube_id:'', start:0, end:0, phrase:'', speaker:'',
    question:'', options:[{l:'A',t:''},{l:'B',t:''},{l:'C',t:''},{l:'D',t:''}], correct:'A'};
}

function _newClozeClip(){
  return {pelicula_id:'', escena_id:'', youtube_id:'', start:0, end:0, phrase:'', speaker:'',
    blanks:[], distractors:[]};
}

// ═══════════ PUBLIC API ═══════════

window.admRenderListeningPools = async function(sd, version, lang){
  _curV = version || 1;
  _curLang = lang || 'en';
  var rank = RANK_BY_V[_curV] || 'bronce';

  var body = document.getElementById('adm-dw-body');
  body.innerHTML = '<div style="font-size:12px;color:#a78bfa;text-align:center;padding:24px;">Cargando pools…</div>';

  var pels = await _loadPeliculas(_curLang);
  await _loadPools(rank, _curLang);

  body.innerHTML = '';

  // Hero card common fields (only chip + rating)
  if(sd){
    var hs = document.createElement('div');
    hs.innerHTML = '<div class="adm-section-label">Hero Card · campos comunes</div>';
    var hg = document.createElement('div'); hg.className = 'adm-hero-grid';
    [{key:'chip',label:'Chip label'},{key:'rating',label:'Rating (CEFR)'}].forEach(function(f){
      var w = document.createElement('div'); w.className = 'adm-field';
      w.innerHTML = '<label>'+f.label+'</label><input type="text" data-key="'+f.key+'" value="'+_esc(sd[f.key]||'')+'">';
      hg.appendChild(w);
    });
    hs.appendChild(hg); body.appendChild(hs);
  }

  // Pool VIDEO
  var vs = document.createElement('div'); vs.className = 'adm-pool-section video';
  vs.innerHTML = '<div class="adm-pool-label" style="color:#7CB2FF;">' +
    '<span class="pdot" style="background:#7CB2FF;"></span>' +
    '<span id="adm-pool-video-count">POOL VIDEO · panel izquierdo · '+_videoPool.length+' clips</span>' +
    '</div>' +
    '<div id="adm-pool-video-cards"></div>' +
    '<button class="adm-pool-add-btn video" onclick="admAddVideoClip()">+ Agregar clip al pool de video</button>';
  body.appendChild(vs);

  // Pool CLOZE
  var cs = document.createElement('div'); cs.className = 'adm-pool-section cloze';
  cs.innerHTML = '<div class="adm-pool-label" style="color:#a78bfa;">' +
    '<span class="pdot" style="background:#a78bfa;"></span>' +
    '<span id="adm-pool-cloze-count">POOL CLOZE · panel central · '+_clozePool.length+' clips</span>' +
    '</div>' +
    '<div id="adm-pool-cloze-cards"></div>' +
    '<button class="adm-pool-add-btn cloze" onclick="admAddClozeClip()">+ Agregar clip al pool cloze</button>';
  body.appendChild(cs);

  _renderAllClips(pels);
};

function _renderAllClips(pels){
  var vw = document.getElementById('adm-pool-video-cards');
  var cw = document.getElementById('adm-pool-cloze-cards');
  if(vw){
    vw.innerHTML = _videoPool.length ? '' : '<div class="adm-pool-empty">Sin clips · agrega al menos uno</div>';
    _videoPool.forEach(function(c, i){ vw.appendChild(_renderVideoCard(c, i, pels)); });
  }
  if(cw){
    cw.innerHTML = _clozePool.length ? '' : '<div class="adm-pool-empty">Sin clips · agrega al menos uno</div>';
    _clozePool.forEach(function(c, i){ cw.appendChild(_renderClozeCard(c, i, pels)); });
  }
  var vc = document.getElementById('adm-pool-video-count');
  if(vc) vc.textContent = 'POOL VIDEO · panel izquierdo · '+_videoPool.length+' clips';
  var cc = document.getElementById('adm-pool-cloze-count');
  if(cc) cc.textContent = 'POOL CLOZE · panel central · '+_clozePool.length+' clips';
}

function _pelOptions(pels, selectedId){
  return pels.map(function(p){
    var sel = String(p.id) === String(selectedId) ? ' selected' : '';
    return '<option value="'+p.id+'"'+sel+'>'+_esc(p.titulo_main)+(p.titulo_sub?' · '+_esc(p.titulo_sub):'')+'</option>';
  }).join('');
}

function _renderVideoCard(clip, idx, pels){
  var card = document.createElement('div');
  card.className = 'adm-clip-card';
  card.dataset.clip = 'video-'+idx;
  var html = '';
  html += '<div class="adm-clip-head">';
  html += '<span class="adm-clip-num" style="color:#7CB2FF;">CLIP #'+(idx+1)+'</span>';
  html += '<button class="adm-clip-del" onclick="admDelClip(\'video\','+idx+')">×</button>';
  html += '</div>';
  html += '<div class="adm-clip-row">';
  html += '<div class="adm-field"><label>Película</label><select data-key="pelicula_id" onchange="admOnPelChange(\'video\','+idx+',this.value)"><option value="">— elige —</option>'+_pelOptions(pels, clip.pelicula_id)+'</select></div>';
  html += '<div class="adm-field"><label>Escena</label><select data-key="escena_id" class="esc-sel" onchange="admOnEscChange(\'video\','+idx+',this.value)"><option value="">— elige película —</option></select></div>';
  html += '</div>';
  html += '<div class="adm-clip-hint">Autocompleta youtube_id, start, end, phrase, speaker al elegir escena</div>';
  html += '<div class="adm-field" style="margin-bottom:8px;"><label>Pregunta</label><input type="text" data-key="question" value="'+_esc(clip.question||'')+'" placeholder="ej: ¿qué es la publicidad según Don?"></div>';
  ['A','B','C','D'].forEach(function(L, i){
    var o = (clip.options||[])[i] || {l:L, t:''};
    var ok = clip.correct === L;
    html += '<div class="adm-clip-opt-row">';
    html += '<input type="radio" name="correct-video-'+idx+'" value="'+L+'" data-key="correct"'+(ok?' checked':'')+'>';
    html += '<span class="lbl" style="color:'+(ok?'#7CB2FF':'#a78bfa')+';">'+L+'</span>';
    html += '<input type="text" data-key="opt-'+L+'" value="'+_esc(o.t||'')+'" placeholder="opción '+L+'">';
    html += '</div>';
  });
  card.innerHTML = html;
  if(clip.pelicula_id){
    setTimeout(function(){ _popEsc(card.querySelector('.esc-sel'), clip.pelicula_id, clip.escena_id); }, 0);
  }
  return card;
}

function _renderClozeCard(clip, idx, pels){
  var card = document.createElement('div');
  card.className = 'adm-clip-card';
  card.dataset.clip = 'cloze-'+idx;
  var html = '';
  html += '<div class="adm-clip-head">';
  html += '<span class="adm-clip-num" style="color:#a78bfa;">CLIP #'+(idx+1)+'</span>';
  html += '<button class="adm-clip-del" onclick="admDelClip(\'cloze\','+idx+')">×</button>';
  html += '</div>';
  html += '<div class="adm-clip-row">';
  html += '<div class="adm-field"><label>Película</label><select data-key="pelicula_id" onchange="admOnPelChange(\'cloze\','+idx+',this.value)"><option value="">— elige —</option>'+_pelOptions(pels, clip.pelicula_id)+'</select></div>';
  html += '<div class="adm-field"><label>Escena</label><select data-key="escena_id" class="esc-sel" onchange="admOnEscChange(\'cloze\','+idx+',this.value)"><option value="">— elige película —</option></select></div>';
  html += '</div>';
  html += '<div class="adm-field" style="margin-bottom:10px;">';
  html += '<label>Frase del cloze · click en cada palabra para ocultar/mostrar</label>';
  html += '<div class="adm-cloze-editor" data-key="phrase-editor"></div>';
  html += '<div style="font-size:10px;color:#6b7280;margin-top:6px;">Azul = blanks (palabras a adivinar). Sin formato = visibles.</div>';
  html += '</div>';
  html += '<div class="adm-field"><label>Distractores del banco (separados por coma)</label><input type="text" data-key="distractors" value="'+_esc((clip.distractors||[]).join(', '))+'" placeholder="ej: said, talked, felt"></div>';
  card.innerHTML = html;
  setTimeout(function(){
    _renderClozeWords(card.querySelector('.adm-cloze-editor'), clip.phrase, clip.speaker, clip.blanks||[]);
    if(clip.pelicula_id) _popEsc(card.querySelector('.esc-sel'), clip.pelicula_id, clip.escena_id);
  }, 0);
  return card;
}

async function _popEsc(sel, pelId, curEscId){
  if(!sel) return;
  sel.innerHTML = '<option value="">cargando…</option>';
  var escs = await _loadEscenas(pelId);
  var opts = ['<option value="">— elige escena —</option>'];
  escs.forEach(function(e){
    var sn = (e.phrase||'').slice(0,40);
    var dots = (e.phrase && e.phrase.length > 40) ? '…' : '';
    var s = String(curEscId) === String(e.id) ? ' selected' : '';
    opts.push('<option value="'+e.id+'"'+s+'>'+e.numero+' · "'+_esc(sn)+dots+'" · '+_fmtT(e.start_time)+'-'+_fmtT(e.end_time)+'</option>');
  });
  sel.innerHTML = opts.join('');
}

window.admOnPelChange = async function(pool, idx, pelId){
  var arr = pool === 'video' ? _videoPool : _clozePool;
  arr[idx].pelicula_id = pelId;
  arr[idx].escena_id = '';
  var card = document.querySelector('[data-clip="'+pool+'-'+idx+'"]');
  if(card) await _popEsc(card.querySelector('.esc-sel'), pelId, '');
};

window.admOnEscChange = async function(pool, idx, escId){
  var arr = pool === 'video' ? _videoPool : _clozePool;
  arr[idx].escena_id = escId;
  var escs = await _loadEscenas(arr[idx].pelicula_id);
  var esc = escs.find(function(e){ return String(e.id) === String(escId); });
  if(esc){
    arr[idx].youtube_id = esc.youtube_id || '';
    arr[idx].start = esc.start_time || 0;
    arr[idx].end = esc.end_time || 0;
    arr[idx].phrase = esc.phrase || '';
    arr[idx].speaker = esc.speaker || '';
    if(pool === 'cloze'){
      arr[idx].blanks = [];
      var card = document.querySelector('[data-clip="cloze-'+idx+'"]');
      if(card) _renderClozeWords(card.querySelector('.adm-cloze-editor'), esc.phrase, esc.speaker, []);
    }
  }
};

function _renderClozeWords(container, phrase, speaker, blanks){
  if(!container) return;
  container.innerHTML = '';
  if(!phrase){
    container.innerHTML = '<span style="color:#6b7280;font-style:italic;">Selecciona escena para cargar frase</span>';
    return;
  }
  if(speaker){
    var s = document.createElement('span');
    s.className = 'adm-cloze-speaker';
    s.textContent = speaker + ': ';
    container.appendChild(s);
  }
  var tokens = phrase.match(/[\w'\-]+|[.,!?;:"]+|—|–|\s+/g) || [];
  var wi = 0;
  tokens.forEach(function(tok){
    if(/^\s+$/.test(tok) || /^[.,!?;:"—–]+$/.test(tok)){
      container.appendChild(document.createTextNode(tok));
    } else {
      var w = document.createElement('span');
      w.className = 'adm-cloze-word' + (blanks.indexOf(wi) >= 0 ? ' blank' : '');
      w.dataset.widx = wi;
      w.textContent = tok;
      w.onclick = function(){
        w.classList.toggle('blank');
        var card = w.closest('[data-clip]'); if(!card) return;
        var parts = card.dataset.clip.split('-');
        var pool = parts[0], idx = parseInt(parts[1]);
        var arr = pool === 'video' ? _videoPool : _clozePool;
        var blanksArr = [];
        container.querySelectorAll('.adm-cloze-word.blank').forEach(function(x){
          blanksArr.push(parseInt(x.dataset.widx));
        });
        arr[idx].blanks = blanksArr;
      };
      container.appendChild(w);
      wi++;
    }
  });
}

window.admAddVideoClip = async function(){
  _videoPool.push(_newVideoClip());
  var pels = await _loadPeliculas(_curLang);
  _renderAllClips(pels);
};

window.admAddClozeClip = async function(){
  _clozePool.push(_newClozeClip());
  var pels = await _loadPeliculas(_curLang);
  _renderAllClips(pels);
};

window.admDelClip = async function(pool, idx){
  if(!confirm('¿Eliminar este clip del pool?')) return;
  var arr = pool === 'video' ? _videoPool : _clozePool;
  var removed = arr.splice(idx, 1)[0];
  if(removed && removed._id){
    var sb = _sb();
    if(sb) await sb.from('exam_content').delete().eq('id', removed._id);
  }
  var pels = await _loadPeliculas(_curLang);
  _renderAllClips(pels);
};

function _harvestPools(){
  document.querySelectorAll('[data-clip^="video-"]').forEach(function(card){
    var idx = parseInt(card.dataset.clip.split('-')[1]);
    var c = _videoPool[idx]; if(!c) return;
    card.querySelectorAll('input, select').forEach(function(inp){
      var k = inp.dataset.key; if(!k) return;
      if(k === 'correct'){ if(inp.checked) c.correct = inp.value; }
      else if(k.indexOf('opt-') === 0){
        var L = k.split('-')[1];
        c.options = c.options || [{l:'A',t:''},{l:'B',t:''},{l:'C',t:''},{l:'D',t:''}];
        var o = c.options.find(function(x){ return x.l === L; });
        if(o) o.t = inp.value;
      } else {
        c[k] = inp.value;
      }
    });
  });
  document.querySelectorAll('[data-clip^="cloze-"]').forEach(function(card){
    var idx = parseInt(card.dataset.clip.split('-')[1]);
    var c = _clozePool[idx]; if(!c) return;
    card.querySelectorAll('input, select').forEach(function(inp){
      var k = inp.dataset.key; if(!k) return;
      if(k === 'distractors'){
        c.distractors = inp.value.split(',').map(function(s){ return s.trim(); }).filter(Boolean);
      } else if(k === 'pelicula_id' || k === 'escena_id'){
        c[k] = inp.value;
      }
    });
  });
}

window.admSaveListeningPools = async function(version, lang){
  _curV = version || _curV;
  _curLang = lang || _curLang;
  var sb = _sb();
  if(!sb){ _toast('❌ Sin conexión Supabase'); return; }
  _harvestPools();
  for(var i = 0; i < _videoPool.length; i++){
    if(!_videoPool[i].escena_id){ _toast('❌ Hay un clip de video sin escena elegida'); return; }
  }
  for(var j = 0; j < _clozePool.length; j++){
    if(!_clozePool[j].escena_id){ _toast('❌ Hay un clip cloze sin escena elegida'); return; }
  }
  var rank = RANK_BY_V[_curV] || 'bronce';

  // Persist hero common fields (chip, rating) into VERSION_SD if present
  var heroData = {};
  document.querySelectorAll('#adm-dw-body input[data-key]').forEach(function(inp){
    var k = inp.dataset.key;
    if(k === 'chip' || k === 'rating') heroData[k] = inp.value;
  });
  if(typeof window.VERSION_SD !== 'undefined'){
    if(!window.VERSION_SD[_curV]) window.VERSION_SD[_curV] = {};
    window.VERSION_SD[_curV].listen = Object.assign(window.VERSION_SD[_curV].listen || {}, heroData);
  }

  _toast('Guardando ' + (_videoPool.length + _clozePool.length) + ' clips…');

  var ops = [];
  _videoPool.forEach(function(c){
    var row = {
      section: 'listening', content_type: 'listening_video',
      rank: rank, language: _curLang, active: true, difficulty: 3,
      content: {
        pelicula_id: c.pelicula_id, escena_id: c.escena_id,
        youtube_id: c.youtube_id, start: c.start, end: c.end,
        phrase: c.phrase, speaker: c.speaker,
        question: c.question, options: c.options, correct: c.correct
      }
    };
    ops.push(c._id ? sb.from('exam_content').update(row).eq('id', c._id) : sb.from('exam_content').insert(row));
  });
  _clozePool.forEach(function(c){
    var row = {
      section: 'listening', content_type: 'listening_cloze',
      rank: rank, language: _curLang, active: true, difficulty: 3,
      content: {
        pelicula_id: c.pelicula_id, escena_id: c.escena_id,
        youtube_id: c.youtube_id, start: c.start, end: c.end,
        phrase: c.phrase, speaker: c.speaker,
        blanks: c.blanks || [], distractors: c.distractors || []
      }
    };
    ops.push(c._id ? sb.from('exam_content').update(row).eq('id', c._id) : sb.from('exam_content').insert(row));
  });

  try {
    var results = await Promise.all(ops);
    var errs = results.filter(function(r){ return r && r.error; });
    if(errs.length){ _toast('❌ '+errs.length+' errores al guardar'); console.error(errs); return; }
    _toast('✓ '+(_videoPool.length + _clozePool.length)+' clips guardados');
    if(typeof window.admCloseDrawer === 'function') window.admCloseDrawer();
  } catch(e){
    _toast('❌ '+(e.message || e));
  }
};

})();

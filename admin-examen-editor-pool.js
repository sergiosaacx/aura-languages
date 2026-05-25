/* ════════════════════════════════════════════════════════════════
   admin-examen-editor-pool.js
   Editor del pool de Listening para admin-examen-editor.html.
   Un solo pool: lista de clips (película + escena). El motor
   examen-listening-engine.js elige uno al azar al cargar el examen.
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var RANK_BY_V = {1:'bronce', 2:'plata', 3:'oro', 4:'platino', 5:'diamante'};

var _pool = [];
var _peliculasCache = {};
var _escenasCache = {};
var _peliculasTitle = {}; // id → titulo_main para previews

function _sb(){ return (window._aura && window._aura.sb) ? window._aura.sb : null; }
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function _fmtT(s){ s=+s||0; var m=Math.floor(s/60), r=Math.floor(s%60); return m+':'+String(r).padStart(2,'0'); }
function _toast(msg){ if(typeof window.admShowToast==='function') window.admShowToast(msg); }

async function _loadPeliculas(lang){
  if(_peliculasCache[lang]) return _peliculasCache[lang];
  var sb = _sb(); if(!sb) return [];
  var q = sb.from('peliculas').select('id,slug,titulo_main,titulo_sub,language').eq('activo',true).order('orden');
  if(lang === 'en') q = q.or('language.eq.en,language.is.null');
  else q = q.eq('language', lang);
  var res = await q;
  _peliculasCache[lang] = res.data || [];
  (res.data||[]).forEach(function(p){ _peliculasTitle[p.id] = p.titulo_main; });
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

async function _loadPool(rank, lang){
  _pool = [];
  var sb = _sb(); if(!sb) return;
  var res = await sb.from('exam_content').select('*').eq('section','listening').eq('rank', rank).eq('language', lang);
  if(res.error){ console.warn(res.error); return; }
  (res.data||[]).forEach(function(row){
    var c = row.content;
    if(typeof c === 'string'){ try{ c = JSON.parse(c); }catch(e){ c = {}; } }
    if(!c) c = {};
    // Acepta legacy 'listening_video' / 'listening_cloze' como 'listening_scene'
    if(['listening_scene','listening_video','listening_cloze'].indexOf(row.content_type) >= 0){
      _pool.push(Object.assign({_id: row.id, _ctype: row.content_type}, c));
    }
  });
}

function _newClip(){
  return {pelicula_id:'', pelicula_slug:'', pelicula_titulo:'', escena_id:'', escena_numero:'', youtube_id:'', start:0, end:0, phrase:'', speaker:''};
}

// ══════════════════════════════════════════════ PUBLIC API ══════════════════════════════════════════════

window.admRenderListeningPools = async function(sd, version, lang){
  var rank = RANK_BY_V[version || 1] || 'bronce';
  lang = lang || 'en';
  var body = document.getElementById('adm-dw-body');
  body.innerHTML = '<div style="font-size:12px;color:#a78bfa;text-align:center;padding:24px;">Cargando pool…</div>';

  var pels = await _loadPeliculas(lang);
  await _loadPool(rank, lang);

  body.innerHTML = '';

  // Header info
  var info = document.createElement('div');
  info.innerHTML = '<div class="adm-section-label">Pool de Listening · ' + rank + ' · ' + lang.toUpperCase() + '</div>' +
    '<div style="font-size:11px;color:#a78bfa;margin-bottom:10px;">El estudiante recibirá UNO al azar de este pool. Sin pregunta MC ni blanks manuales — los blanks son aleatorios (30%) en runtime.</div>';
  body.appendChild(info);

  var sec = document.createElement('div');
  sec.className = 'adm-pool-section video';
  sec.innerHTML = '<div class="adm-pool-label" style="color:#7CB2FF;">' +
    '<span class="pdot" style="background:#7CB2FF;"></span>' +
    '<span id="adm-pool-count">' + _pool.length + ' clip' + (_pool.length===1?'':'s') + ' en el pool</span>' +
    '</div>' +
    '<div id="adm-pool-cards"></div>' +
    '<button class="adm-pool-add-btn video" onclick="admAddClip()">+ Agregar clip al pool</button>';
  body.appendChild(sec);

  _renderCards(pels);
};

function _renderCards(pels){
  var wrap = document.getElementById('adm-pool-cards');
  if(!wrap) return;
  wrap.innerHTML = _pool.length ? '' : '<div class="adm-pool-empty">Sin clips · agrega al menos uno</div>';
  _pool.forEach(function(c, i){ wrap.appendChild(_renderCard(c, i, pels)); });
  var c = document.getElementById('adm-pool-count');
  if(c) c.textContent = _pool.length + ' clip' + (_pool.length===1?'':'s') + ' en el pool';
}

function _renderCard(clip, idx, pels){
  var card = document.createElement('div');
  card.className = 'adm-clip-card';
  card.dataset.clip = 'p-' + idx;
  var pelOpts = pels.map(function(p){
    var s = String(p.id) === String(clip.pelicula_id) ? ' selected' : '';
    return '<option value="'+p.id+'"'+s+'>'+_esc(p.titulo_main)+(p.titulo_sub?' · '+_esc(p.titulo_sub):'')+'</option>';
  }).join('');
  var html = '';
  html += '<div class="adm-clip-head">';
  html += '<span class="adm-clip-num" style="color:#7CB2FF;">CLIP #'+(idx+1)+'</span>';
  html += '<button class="adm-clip-del" onclick="admDelClip('+idx+')">×</button>';
  html += '</div>';
  html += '<div class="adm-clip-row">';
  html += '<div class="adm-field"><label>Película</label><select data-key="pelicula_id" onchange="admOnPelChange('+idx+',this.value)"><option value="">— elige —</option>'+pelOpts+'</select></div>';
  html += '<div class="adm-field"><label>Escena</label><select data-key="escena_id" class="esc-sel" onchange="admOnEscChange('+idx+',this.value)"><option value="">— elige película —</option></select></div>';
  html += '</div>';
  if(clip.phrase){
    html += '<div class="adm-clip-hint">Frase actual: <i style="color:#cbc7da;">' + _esc((clip.phrase||'').slice(0,140)) + ((clip.phrase||'').length>140?'…':'') + '</i></div>';
  } else {
    html += '<div class="adm-clip-hint">Elige escena → autocompleta youtube_id, start, end, phrase, speaker</div>';
  }
  card.innerHTML = html;
  if(clip.pelicula_id){
    setTimeout(function(){ _popEsc(card.querySelector('.esc-sel'), clip.pelicula_id, clip.escena_id); }, 0);
  }
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

window.admOnPelChange = async function(idx, pelId){
  _pool[idx].pelicula_id = pelId;
  _pool[idx].pelicula_titulo = _peliculasTitle[pelId] || '';
  _pool[idx].escena_id = '';
  var card = document.querySelector('[data-clip="p-'+idx+'"]');
  if(card) await _popEsc(card.querySelector('.esc-sel'), pelId, '');
};

window.admOnEscChange = async function(idx, escId){
  _pool[idx].escena_id = escId;
  var escs = await _loadEscenas(_pool[idx].pelicula_id);
  var esc = escs.find(function(e){ return String(e.id) === String(escId); });
  if(esc){
    _pool[idx].youtube_id = esc.youtube_id || '';
    _pool[idx].start = esc.start_time || 0;
    _pool[idx].end = esc.end_time || 0;
    _pool[idx].phrase = esc.phrase || '';
    _pool[idx].speaker = esc.speaker || '';
    _pool[idx].escena_numero = esc.numero || '';
    // Re-render the clip card to show frase autocompletada
    var pels = await _loadPeliculas(document.getElementById('adm-lang')?.value || 'en');
    _renderCards(pels);
    // Live preview en el panel central si la pestaña Listening está activa
    if(typeof window.previewExamListening === 'function'){
      window.previewExamListening(_pool[idx]);
    }
  }
};

window.admAddClip = async function(){
  _pool.push(_newClip());
  var pels = await _loadPeliculas(document.getElementById('adm-lang')?.value || 'en');
  _renderCards(pels);
};

window.admDelClip = async function(idx){
  if(!confirm('¿Eliminar este clip del pool?')) return;
  var removed = _pool.splice(idx, 1)[0];
  if(removed && removed._id){
    var sb = _sb();
    if(sb) await sb.from('exam_content').delete().eq('id', removed._id);
  }
  var pels = await _loadPeliculas(document.getElementById('adm-lang')?.value || 'en');
  _renderCards(pels);
};

window.admSaveListeningPools = async function(version, lang){
  var sb = _sb();
  if(!sb){ _toast('❌ Sin conexión Supabase'); return; }
  for(var i = 0; i < _pool.length; i++){
    if(!_pool[i].escena_id){ _toast('❌ Hay un clip sin escena'); return; }
  }
  var rank = RANK_BY_V[version || 1] || 'bronce';
  _toast('Guardando ' + _pool.length + ' clips…');
  var ops = [];
  _pool.forEach(function(c){
    var row = {
      section: 'listening',
      content_type: 'listening_scene',
      rank: rank,
      language: lang || 'en',
      active: true,
      difficulty: 3,
      content: {
        pelicula_id: c.pelicula_id,
        pelicula_slug: c.pelicula_slug || '',
        pelicula_titulo: c.pelicula_titulo || '',
        escena_id: c.escena_id,
        escena_numero: c.escena_numero,
        youtube_id: c.youtube_id,
        start: c.start, end: c.end,
        phrase: c.phrase, speaker: c.speaker
      }
    };
    ops.push(c._id ? sb.from('exam_content').update(row).eq('id', c._id) : sb.from('exam_content').insert(row));
  });
  try {
    var results = await Promise.all(ops);
    var errs = results.filter(function(r){ return r && r.error; });
    if(errs.length){ _toast('❌ '+errs.length+' errores'); console.error(errs); return; }
    _toast('✓ '+_pool.length+' clips guardados');
    if(typeof window.admCloseDrawer === 'function') window.admCloseDrawer();
    // Re-cargar preview
    if(typeof window.initExamListening === 'function'){
      window.initExamListening({rank: rank, lang: lang || 'en'});
    }
  } catch(e){
    _toast('❌ '+(e.message || e));
  }
};

})();

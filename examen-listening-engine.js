/* ════════════════════════════════════════════════════════════════
   examen-listening-engine.js
   Motor del Listening del examen: replica play-movies (player sin
   controles, lyrics con blanks aleatorios al 30%, word bank,
   verificación con Levenshtein).
   Compartido por examen-ascenso.html y admin-examen-editor.html.
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var RANK_BY_V = {1:'bronce', 2:'plata', 3:'oro', 4:'platino', 5:'diamante'};

var _pool = [];           // clips cargados
var _current = null;      // clip activo
var _player = null;       // YT.Player instancia
var _ytApiReady = false;
var _ytApiPending = false;
var _blanksFilled = 0;
var _blanksNeeded = 0;
var _activeBlank = null;  // input que recibirá la próxima palabra del bank
var _onPickCb = null;     // callback para info del lado izquierdo
var _container = null;    // .mid-content[data-skill="listen"]

function _sb(){ return (window._aura && window._aura.sb) ? window._aura.sb : null; }
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function _fmtT(s){ s = +s||0; var m = Math.floor(s/60), r = Math.floor(s%60); return m+':'+String(r).padStart(2,'0'); }

// ── Carga YouTube IFrame API una sola vez
function _ensureYTAPI(){
  if(_ytApiReady) return Promise.resolve();
  if(_ytApiPending) return new Promise(function(res){
    var iv = setInterval(function(){ if(_ytApiReady){ clearInterval(iv); res(); } }, 80);
  });
  _ytApiPending = true;
  return new Promise(function(res){
    if(window.YT && window.YT.Player){ _ytApiReady = true; res(); return; }
    window.onYouTubeIframeAPIReady = function(){ _ytApiReady = true; res(); };
    var s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(s);
  });
}

// ── Carga clips desde Supabase
async function _loadPool(rank, lang){
  _pool = [];
  var sb = _sb(); if(!sb) return;
  var res = await sb.from('exam_content').select('*').eq('section','listening').eq('rank', rank).eq('language', lang).eq('active', true);
  if(res.error){ console.warn('listening pool', res.error); return; }
  (res.data||[]).forEach(function(row){
    if(row.content_type !== 'listening_scene' && row.content_type !== 'listening_video' && row.content_type !== 'listening_cloze') return;
    var c = row.content;
    if(typeof c === 'string'){ try{ c = JSON.parse(c); }catch(e){ c = {}; } }
    if(!c || !c.youtube_id) return;
    _pool.push(c);
  });
}

function _pickRandom(){
  if(!_pool.length) return null;
  return _pool[Math.floor(Math.random() * _pool.length)];
}

// ── Render del shell HTML del Listening dentro del .mid-content[data-skill="listen"]
function _renderShell(container){
  container.innerHTML =
    '<div class="exam-panel listening-panel" style="--c:124,178,255;">' +
      '<header class="ep-h">' +
        '<span class="ep-tag" id="exl-tag">listening · cargando…</span>' +
        '<span class="ep-count"><b id="exl-blank-count">— palabras</b></span>' +
      '</header>' +
      '<div class="exl-player-wrap"><div id="exl-yt"></div></div>' +
      '<div class="exl-phrase glass-line" id="exl-phrase-row"></div>' +
      '<div class="exl-bank" id="exl-bank"></div>' +
      '<div class="exl-actions">' +
        '<button class="exl-btn-verify" id="exl-verify">Verificar</button>' +
        '<button class="exl-btn-replay" id="exl-replay" title="Repetir clip">↻</button>' +
      '</div>' +
    '</div>';
  document.getElementById('exl-verify').onclick = window.examListeningVerify;
  document.getElementById('exl-replay').onclick = function(){
    if(_player && _current){ try{ _player.seekTo(_current.start||0); _player.playVideo(); }catch(e){} }
  };
  // Re-add admin ✏ Editar button if we're in the admin editor
  if(typeof window.admAddEditBtns === 'function') try{ window.admAddEditBtns(); }catch(e){}
}

// ── Inicializa YT.Player con controles ocultos (replica play-movies)
async function _initPlayer(clip){
  await _ensureYTAPI();
  if(_player){
    try{ _player.destroy(); }catch(e){}
    _player = null;
  }
  // Recrear el div #exl-yt porque YT.Player lo reemplaza
  var wrap = document.querySelector('.exl-player-wrap');
  if(wrap) wrap.innerHTML = '<div id="exl-yt"></div>';
  _player = new YT.Player('exl-yt', {
    videoId: clip.youtube_id,
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
      fs: 0,
      disablekb: 1,
      start: clip.start||0,
      playsinline: 1,
      mute: 1
    },
    events: {
      onReady: function(e){
        try{ e.target.seekTo(clip.start||0); e.target.playVideo(); }catch(err){}
        // unmute after a beat
        setTimeout(function(){ try{ e.target.unMute(); }catch(err){} }, 600);
        _startLoop(clip);
      },
      onStateChange: function(e){
        if(e.data === YT.PlayerState.ENDED){
          try{ _player.seekTo(clip.start||0); _player.playVideo(); }catch(err){}
        }
      }
    }
  });
}

var _loopTimer = null;
function _startLoop(clip){
  if(_loopTimer) clearInterval(_loopTimer);
  if(!clip || !clip.end) return;
  _loopTimer = setInterval(function(){
    if(!_player || typeof _player.getCurrentTime !== 'function') return;
    var t = _player.getCurrentTime();
    if(t >= clip.end){
      try{ _player.seekTo(clip.start||0); _player.playVideo(); }catch(err){}
    }
  }, 400);
}

// ── buildPhrase: 30% random blanks (igual play-movies)
function _buildPhrase(phrase){
  var row = document.getElementById('exl-phrase-row');
  if(!row){ return; }
  row.innerHTML = '';
  if(!phrase){ row.innerHTML = '<span style="opacity:.4;font-size:11px;">Sin frase</span>'; return; }

  // Strip leading SPEAKER: from phrase if present, show it as a label
  var speakerMatch = phrase.match(/^([A-Z][A-Z\s&]+):\s*(.*)/s);
  var speakerLabel = '';
  var text = phrase;
  if(speakerMatch){ speakerLabel = speakerMatch[1]; text = speakerMatch[2]; }
  if(speakerLabel){
    var sp = document.createElement('span');
    sp.className = 'exl-speaker';
    sp.textContent = speakerLabel + ': ';
    row.appendChild(sp);
  }

  var words = text.split(/\s+/).filter(Boolean);
  var numBlanks = Math.min(Math.max(1, Math.floor(words.length * 0.3)), 8, words.length);
  var indices = [];
  while(indices.length < numBlanks){
    var i = Math.floor(Math.random() * words.length);
    if(indices.indexOf(i) < 0) indices.push(i);
  }
  _blanksNeeded = numBlanks;
  _blanksFilled = 0;

  words.forEach(function(w, i){
    if(indices.indexOf(i) >= 0){
      var clean = w.replace(/[^a-zA-Z'\-]/g, '');
      var tail = w.slice(clean.length);
      var wrap = document.createElement('span');
      wrap.className = 'exl-blank-wrap';
      var inp = document.createElement('input');
      inp.type = 'text';
      inp.className = 'exl-blank-inp';
      inp.dataset.answer = clean;
      inp.style.width = Math.max(60, clean.length * 11) + 'px';
      inp.placeholder = '___';
      inp.addEventListener('focus', function(){ _activeBlank = inp; });
      inp.addEventListener('keydown', function(e){ if(e.key === 'Enter') window.examListeningVerify(); });
      wrap.appendChild(inp);
      if(tail){
        var t = document.createElement('span'); t.className = 'exl-w'; t.textContent = tail + ' ';
        wrap.appendChild(t);
      } else {
        wrap.appendChild(document.createTextNode(' '));
      }
      row.appendChild(wrap);
    } else {
      var span = document.createElement('span');
      span.className = 'exl-w';
      span.textContent = w + ' ';
      row.appendChild(span);
    }
  });

  var bc = document.getElementById('exl-blank-count');
  if(bc) bc.textContent = numBlanks + (numBlanks === 1 ? ' palabra' : ' palabras');

  // Auto-focus primer blank
  var first = row.querySelector('.exl-blank-inp');
  if(first){ first.focus(); _activeBlank = first; }
}

// ── Word bank: palabras correctas (de los inputs) + distractores
async function _renderWordBank(clip){
  var bank = document.getElementById('exl-bank');
  if(!bank) return;
  // correctas
  var correct = [];
  document.querySelectorAll('#exl-phrase-row .exl-blank-inp').forEach(function(i){
    var w = i.dataset.answer; if(w) correct.push(w);
  });
  // distractores: de escena.word_bank_json + word_pools si existe
  var distractors = [];
  var sb = _sb();
  if(sb && clip.escena_id){
    try{
      var er = await sb.from('escenas').select('word_bank_json').eq('id', clip.escena_id).single();
      if(er.data && er.data.word_bank_json){
        var wbj = er.data.word_bank_json;
        if(typeof wbj === 'string'){ try{ wbj = JSON.parse(wbj); }catch(e){ wbj = []; } }
        if(Array.isArray(wbj)) distractors = distractors.concat(wbj);
      }
    }catch(e){}
    // word_pools — opcional
    try{
      var pelSlug = clip.pelicula_slug || '';
      if(pelSlug){
        var pr = await sb.from('word_pools').select('words').eq('context', 'movies/'+pelSlug+'/'+clip.youtube_id).maybeSingle();
        if(pr && pr.data && Array.isArray(pr.data.words)) distractors = distractors.concat(pr.data.words);
      }
    }catch(e){}
  }
  // Mezclar correctas + distractores, dedup, shuffle, max 12
  var seen = {}, all = [];
  correct.concat(distractors).forEach(function(w){
    var k = (w||'').toLowerCase().trim();
    if(!k || seen[k]) return; seen[k] = 1; all.push(w);
  });
  for(var i = all.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = all[i]; all[i] = all[j]; all[j] = tmp;
  }
  all = all.slice(0, 12);
  bank.innerHTML = '<span class="exl-bank-lbl">elige</span>' +
    all.map(function(w){ return '<button class="exl-bank-opt" data-w="'+_esc(w)+'">'+_esc(w)+'</button>'; }).join('');
  bank.querySelectorAll('.exl-bank-opt').forEach(function(btn){
    btn.onclick = function(){
      if(!_activeBlank){
        _activeBlank = document.querySelector('#exl-phrase-row .exl-blank-inp:not(.correct):not(.wrong)');
      }
      if(_activeBlank){
        _activeBlank.value = btn.dataset.w;
        btn.classList.add('used');
        // pasar al siguiente blank
        var inputs = Array.from(document.querySelectorAll('#exl-phrase-row .exl-blank-inp'));
        var idx = inputs.indexOf(_activeBlank);
        for(var k = idx + 1; k < inputs.length; k++){
          if(!inputs[k].classList.contains('correct') && !inputs[k].classList.contains('wrong')){
            inputs[k].focus(); _activeBlank = inputs[k]; return;
          }
        }
      }
    };
  });
}

// ── Levenshtein
function _lev(a, b){
  var m = a.length, n = b.length, dp = [];
  for(var i = 0; i <= m; i++){ dp[i] = []; for(var j = 0; j <= n; j++) dp[i][j] = i===0 ? j : j===0 ? i : 0; }
  for(var i2 = 1; i2 <= m; i2++) for(var j2 = 1; j2 <= n; j2++)
    dp[i2][j2] = a[i2-1] === b[j2-1] ? dp[i2-1][j2-1] : 1 + Math.min(dp[i2-1][j2], dp[i2][j2-1], dp[i2-1][j2-1]);
  return dp[m][n];
}

window.examListeningVerify = function(){
  var inputs = document.querySelectorAll('#exl-phrase-row .exl-blank-inp:not(.correct)');
  if(!inputs.length) return;
  var newlyCorrect = 0;
  inputs.forEach(function(inp){
    var ans = (inp.dataset.answer||'').toLowerCase().trim();
    var typed = (inp.value||'').toLowerCase().trim();
    if(!typed) return;
    inp.classList.remove('wrong','partial');
    if(typed === ans){ inp.classList.add('correct'); inp.disabled = true; newlyCorrect++; _blanksFilled++; }
    else if(_lev(typed, ans) <= Math.max(1, Math.floor(ans.length * 0.3))){ inp.classList.add('partial'); }
    else { inp.classList.add('wrong'); }
  });
  if(_blanksFilled >= _blanksNeeded){
    var btn = document.getElementById('exl-verify');
    if(btn){ btn.textContent = '✓ Completado'; btn.classList.add('done'); }
  }
};

// ── Entrada principal: llamada por la tab al activarse Listening
window.initExamListening = async function(opts){
  opts = opts || {};
  var rank = opts.rank || 'bronce';
  var lang = opts.lang || (localStorage.getItem('aura_lang') || 'en');
  _container = document.querySelector('.mid-content[data-skill="listen"]');
  if(!_container) return;

  _renderShell(_container);

  // Carga + pickeo
  await _loadPool(rank, lang);
  _current = _pickRandom();

  if(!_current){
    _container.querySelector('#exl-tag').textContent = 'listening · sin clips configurados para este examen';
    var pw = _container.querySelector('.exl-player-wrap');
    if(pw) pw.innerHTML = '<div style="padding:32px;text-align:center;color:rgba(255,255,255,.4);font-size:12px;">Configurar clips desde el admin</div>';
    if(typeof _onPickCb === 'function') _onPickCb(null);
    return;
  }

  // Tag header
  var movieTitle = _current.pelicula_titulo || 'clip';
  _container.querySelector('#exl-tag').textContent = 'listening · ' + movieTitle + ' · ' + _fmtT(_current.start) + '–' + _fmtT(_current.end);

  // Player + phrase + bank
  await _initPlayer(_current);
  _buildPhrase(_current.phrase || '');
  await _renderWordBank(_current);

  // Callback para que el hero card del lado izq se actualice con info de la película
  if(typeof _onPickCb === 'function') _onPickCb(_current);
};

// ── Hook para que el examen/editor se entere de la película pickeada
window.onExamListeningPick = function(cb){ _onPickCb = cb; };

// ── Preview-only para el admin editor: forzar render de un clip específico
window.previewExamListening = async function(clip){
  _container = document.querySelector('.mid-content[data-skill="listen"]');
  if(!_container) return;
  _renderShell(_container);
  _current = clip;
  if(!clip){ return; }
  var t = _container.querySelector('#exl-tag');
  if(t) t.textContent = 'listening · preview · ' + (clip.pelicula_titulo||'clip');
  await _initPlayer(clip);
  _buildPhrase(clip.phrase || '');
  await _renderWordBank(clip);
};

// ── Cleanup al cambiar de pestaña
window.stopExamListening = function(){
  if(_loopTimer){ clearInterval(_loopTimer); _loopTimer = null; }
  if(_player){
    try{ _player.stopVideo(); _player.destroy(); }catch(e){}
    _player = null;
  }
};

})();

// movies-data.js loaded via <script src>

// ── ESTADO ────────────────────────────────────────────────────────────────
var player, isPlaying = true, loopTimer = null;
var _ytApiReady   = false;  // YouTube IFrame API lista
var _movieReady   = false;  // datos de Supabase listos
var _movieYtId    = null;   // youtube_id de la película a cargar
var currentVideoId = null;
var currentStart = 0, currentEnd = 0;
var currentPhrase = '';
var blankedIndices = [];
var totalScore = 0;
var combo = 1;
var errorCount = 0;
var sceneCount = 1;

// ── KARAOKE STATE ─────────────────────────────────────────────────────────
var karaoState = {
  enabled: false,
  lines: [],
  gaps: [],
  currentIdx: -1,
  challengeActive: false,
  challengeLineIdx: -1,
  blanksNeeded: 0,
  blanksFilled: 0,
  lineLoopStart: 0,
  lineLoopEnd: 0,
  inGap: false,
  completedLines: {}
};

var SCENE_DATA_CACHE = {};

// ── YOUTUBE PLAYER ────────────────────────────────────────────────────────
// ── TÍTULO DINÁMICO DESDE YOUTUBE ─────────────────────────────────────────
function updateTitleFromYouTube() {
  if (!player || typeof player.getVideoData !== 'function') return;
  var data = player.getVideoData();
  var title = (data && data.title) ? data.title : '';
  if (!title) return;
  // Separar por ":" o "-" para main/subtítulo
  var parts = title.split(/\s*[:\-–—]\s*/);
  var main = (parts[0] || title).trim().toUpperCase();
  var sub  = parts[1] ? parts[1].trim().toUpperCase() : '';
  var elMain = document.getElementById('movieTitleMain');
  var elSub  = document.getElementById('movieTitleSub');
  if (elMain) elMain.textContent = main;
  if (elSub)  elSub.textContent  = sub;
  var elCrumb = document.getElementById('breadcrumbMovie');
  if (elCrumb) elCrumb.textContent = main.toLowerCase();
}

// ── VISIBILIDAD INFO PELÍCULA ──────────────────────────────────────────────
function setMovieInfoPlaying(playing) {
  var info = document.querySelector('.movie-info');
  if (!info) return;
  if (playing) info.classList.add('playing');
  else         info.classList.remove('playing');
}

// ── Sincronización YouTube + Supabase ─────────────────────────────────────
function _tryInitPlayer() {
  if (!_ytApiReady || !_movieReady || !_movieYtId) return;
  if (player) return; // ya creado
  currentVideoId = _movieYtId;
  var d = MOVIES[_movieYtId] || {};
  currentStart  = d.start || 0;
  currentEnd    = d.end   || 0;
  currentPhrase = d.phrase || '';
  player = new YT.Player('ytPlayer', {
    width: window.innerWidth,
    height: window.innerHeight,
    videoId: _movieYtId,
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
      fs: 0,
      disablekb: 1,
      start: currentStart,
      playsinline: 1,
      mute: 1
    },
    events: {
      onReady: function(e) {
        e.target.mute();
        e.target.seekTo(currentStart);
        e.target.playVideo();
        startLoopWatcher();
        updateMovieInfo(currentVideoId);
        if (MOVIES[currentVideoId] && MOVIES[currentVideoId].hasKaraoke) {
          loadAndInitKaraoke(currentVideoId);
        } else {
          buildPhrase();
        }
        startAdCountdown();
        // updateTitleFromYouTube removido — título viene del admin
      },
      onStateChange: function(e) {
        if (e.data === YT.PlayerState.ENDED) {
          player.seekTo(currentStart);
          player.playVideo();
        }
        if (e.data === YT.PlayerState.PLAYING && adWaitingForVideo) {
          // Video started playing after reload — check time to unmute
          setTimeout(function() {
            var t = player.getCurrentTime ? player.getCurrentTime() : 0;
            if (t >= currentStart - 1) {
              adWaitingForVideo = false;
              if (player.unMute) player.unMute();
            }
          }, 600);
        }
        var playing = (e.data === YT.PlayerState.PLAYING);
        setMovieInfoPlaying(playing);
        updatePPIcon();
      }
    }
  });
}

function onYouTubeIframeAPIReady() {
  _ytApiReady = true;
  _tryInitPlayer();
}


// ── AD OVERLAY ────────────────────────────────────────────────────────────────
var adOverlayActive = true; // El HTML ya arranca con class="ad-overlay active"
var adWaitingForVideo = false;
var adSkipTimer = null;
var adTipTimer  = null;
var adTipIdx    = 0;
// adPlayerReady removed — overlay now shows on player ready

var AD_TIPS_KEYS = ['play_tip_0','play_tip_1','play_tip_2','play_tip_3','play_tip_4'];
var AD_TIPS = [{
  icon: '🎯', get text(){ var _t=window.auraT||function(k){return k;}; return _t('play_tip_0'); }},
  { icon: '🎬', text: 'Ver escenas en inglés 20 min al día puede acelerar tu fluidez hasta 3×.' },
  { icon: '🧠', text: 'Las emociones de las escenas ayudan a anclar vocabulario nuevo en tu memoria.' },
  { icon: '🎤', text: '"Shadowing": repite en voz alta junto al personaje para mejorar pronunciación.' },
  { icon: '⚡', text: 'En Aura, cada palabra correcta suma aura y sube tu combo — ¡apunta al ×9!' },
  { icon: '🔑', text: 'Las phrasal verbs son clave en el inglés real. Aura te las enseña en contexto.' },
  { icon: '🏆', text: 'Los mejores políglotas ven la misma escena varias veces — cada vez con más detalle.' }
];

function showAdOverlay() {
  adOverlayActive = true;
  var ov = document.getElementById('adOverlay');
  if (!ov) return;
  ov.classList.add('active');
  var bg = document.getElementById('adBg');
  if (bg) bg.style.backgroundImage = 'url(https://img.youtube.com/vi/' + currentVideoId + '/maxresdefault.jpg)';
  var m = MOVIES[currentVideoId];
  if (m) {
    var tel = document.getElementById('adMovieTitle');
    if (tel) tel.textContent = (m.titleMain||'') + (m.titleSub ? ' ' + m.titleSub : '');
    var sel = document.getElementById('adSceneLabel');
    if (sel) sel.textContent = (window.auraT?window.auraT('play_scene_label'):'Escena') + ' ' + sceneCount + (m.speaker ? ' · ' + m.speaker : '');
  }
  ov.classList.add('active');
  // Tips rotation already started by DOMContentLoaded
  // Show skip button immediately
  var skipBtn = document.getElementById('adSkipBtn');
  if (skipBtn) { skipBtn.classList.remove('ready'); skipBtn.disabled = true; }
  var waitRow = document.getElementById('adWait');
  if (waitRow) waitRow.style.display = '';
  var waitEl = document.getElementById('adWaitTxt');
  if (waitEl) waitEl.textContent = (window.auraT?window.auraT('play_preparing'):'preparando en 5s…');
  var hint = document.getElementById('adSkipHint');
  if (hint) hint.classList.remove('visible');
}

function startAdCountdown() {
  var countdown = 5;
  var waitEl = document.getElementById('adWaitTxt');
  var waitRow = document.getElementById('adWait');
  var btn = document.getElementById('adSkipBtn');
  if (waitEl) waitEl.textContent = (window.auraT?window.auraT('play_preparing').replace('5',countdown):'preparando en ' + countdown + 's…');
  if (adSkipTimer) clearInterval(adSkipTimer);
  adSkipTimer = setInterval(function() {
    countdown--;
    if (countdown > 0) {
      if (waitEl) waitEl.textContent = (window.auraT?window.auraT('play_preparing').replace('5',countdown):'preparando en ' + countdown + 's…');
    } else {
      clearInterval(adSkipTimer); adSkipTimer = null;
      if (waitRow) waitRow.style.display = 'none';
      if (btn) { btn.classList.add('ready'); btn.disabled = false; }
      var lbl = document.getElementById('adSkipLabel');
      if (lbl) lbl.textContent = (window.auraT?window.auraT('play_start'):'Comenzar escena');
    }
  }, 1000);
}

function hideAdOverlay() {
  adOverlayActive = false; // Siempre ocultar, sin importar el estado previo
  var ov = document.getElementById('adOverlay');
  if (ov) ov.classList.remove('active');
  if (adTipTimer) { clearInterval(adTipTimer); adTipTimer = null; }
  if (adSkipTimer) { clearInterval(adSkipTimer); adSkipTimer = null; }
  restorePlayerInteraction();
}

function restorePlayerInteraction() {
  var ytEl = document.getElementById('ytPlayer');
  if (ytEl) ytEl.style.pointerEvents = '';
  var vo = document.getElementById('vidOverlay');
  if (vo) vo.style.display = '';
  var hint = document.getElementById('adSkipHint');
  if (hint) hint.classList.remove('visible');
}

function renderAdTip(idx) {
  var tip = AD_TIPS[idx];
  var iconEl = document.getElementById('adTipIcon');
  var textEl = document.getElementById('adTipText');
  if (iconEl) iconEl.textContent = tip.icon;
  if (textEl) {
    textEl.style.opacity = '0';
    setTimeout(function(){ textEl.textContent = tip.text; textEl.style.opacity = '1'; }, 220);
  }
}

function doSkipAd() {
  var btn = document.getElementById('adSkipBtn');
  if (btn && !btn.classList.contains('ready')) return;

  hideAdOverlay();
  var ytEl = document.getElementById('ytPlayer');
  if (ytEl) ytEl.style.pointerEvents = '';
  var vo = document.getElementById('vidOverlay');
  if (vo) vo.style.display = '';

  // Reset puntos de partida al iniciar escena
  totalScore = 0; combo = 1; errorCount = 0;
  document.getElementById('statGamePts').textContent = '0';
  var _cv=document.getElementById('comboVal');if(_cv)_cv.textContent='×1';
  var _se=document.getElementById('statErrors');if(_se)_se.textContent='0';
  // Reset karaoke state so loop watcher picks it up from the start
  karaoState.currentIdx   = -1;
  karaoState.challengeActive = false;
  karaoState.inGap        = false;
  karaoState.completedLines = {};

  if (player && typeof player.seekTo === 'function') {
    // Player ya existe — unmute, seek al inicio, play
    player.unMute();
    player.setVolume(100);
    player.seekTo(currentStart, true);
    player.playVideo();
    startLoopWatcher();
    setTimeout(function() {
      if (player && player.unMute) { player.unMute(); player.setVolume(100); }
    }, 500);
  }
  _sceneStartTime = Date.now();
  saveMovieProgress();
}

function startLoopWatcher() {
  if (loopTimer) clearInterval(loopTimer);
  loopTimer = setInterval(function() {
    if (!player || typeof player.getCurrentTime !== 'function') return;
    var t = player.getCurrentTime();

    // ── Karaoke logic
    if (karaoState.enabled) {
      updateKaraoke(t);
      // Challenge loop: if time passed line end and blanks not filled, loop back
      if (karaoState.challengeActive && t >= karaoState.lineLoopEnd) {
        player.seekTo(karaoState.lineLoopStart);
        if (isPlaying) player.playVideo();
        return;
      }
    }

    // ── Auto-unmute when video reaches start position after ad skip
    if (adWaitingForVideo) {
      if (t >= currentStart - 0.5 && t <= currentStart + 8) {
        adWaitingForVideo = false;
        if (player && typeof player.unMute === 'function') player.unMute();
        isPlaying = true; updatePPIcon();
      }
    }

    // ── Scene boundary loop (skip if ad is active or times not configured)
    if (!adOverlayActive && currentEnd > currentStart && (t >= currentEnd || t < currentStart - 1)) {
      player.seekTo(currentStart);
      karaoState.currentIdx = -1;
      karaoState.challengeActive = false;
      karaoState.completedLines = {};
      if (isPlaying) player.playVideo();
    }

    // ── Scene time display
    var remaining = Math.max(0, currentEnd - t);
    var min = Math.floor(remaining / 60);
    var sec = Math.floor(remaining % 60);
    var el = document.getElementById('sceneTime');
    if (el) el.textContent = (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;
  }, 300);
}

function togglePlay() {
  if (!player) return;
  var state = player.getPlayerState();
  if (state === YT.PlayerState.PLAYING) {
    player.pauseVideo(); isPlaying = false;
    setMovieInfoPlaying(false);
  } else {
    player.playVideo(); isPlaying = true;
    setMovieInfoPlaying(true);
  }
  updatePPIcon();
}

function updatePPIcon() {
  var icon = document.getElementById('ppIcon');
  if (!player || typeof player.getPlayerState !== 'function' || !icon) return;
  var playing = player.getPlayerState() === YT.PlayerState.PLAYING;
  icon.innerHTML = playing
    ? '<line x1="10" y1="15" x2="10" y2="9"/><line x1="14" y1="15" x2="14" y2="9"/>'
    : '<polygon points="5 3 19 12 5 21 5 3"/>';
}

// ── ACTUALIZAR INFO PELÍCULA ──────────────────────────────────────────────
function updateMovieInfo(videoId) {
  var d = MOVIES[videoId];
  if (!d) return;

  document.getElementById('movieStudio').textContent = d.studio;
  document.getElementById('movieTitleMain').textContent = d.titleMain;
  document.getElementById('movieTitleSub').textContent = d.titleSub;
  document.getElementById('movieMeta').textContent = d.meta;
  document.getElementById('movieDesc').textContent = d.desc;
  document.getElementById('speakerName').textContent = d.speaker;
  var _crumbEl = document.getElementById('breadcrumbMovie');
  if (_crumbEl) _crumbEl.textContent = d.breadcrumb;
  // Cargar récord guardado para esta escena
  try {
    var saved = localStorage.getItem('aura_rec_' + videoId);
    var recEl = document.getElementById('statRecord');
    if (recEl) recEl.textContent = saved ? parseInt(saved) : 0;
  } catch(e) {}

  // Badges
  var badgeEl = document.getElementById('movieBadges');
  badgeEl.innerHTML = d.badges.map(function(b) {
    return '<span class="bdg' + (b.accent ? ' accent' : '') + '">' + b.text + '</span>';
  }).join('');

  // Scenes
  var shelfMore = document.getElementById('shelfMore');
  if (shelfMore) {
    var total = d.scenes.length;
    shelfMore.textContent = total + (total === 1 ? ' escena' : ' escenas');
    shelfMore.style.cursor = 'default';
    shelfMore.onclick = null;
  }
  var shelf = document.getElementById('shelfList');
  shelf.innerHTML = d.scenes.map(function(s, i) {
    var isNow = s.ytId === videoId || (i === 0 && !d.scenes.some(function(x){return x.ytId===videoId;}));
    var imgHtml = s.portada
      ? '<div class="shelf-img" style="background-image:url('+s.portada+')"></div>'
      : '<div class="shelf-no-img"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="4"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>';
    return '<div class="shelf-item' + (isNow ? ' now' : '') + (s.ytId ? ' scene-nav' : '') + '" data-ytid="' + (s.ytId||'') + '">'
      + imgHtml
      + '<div class="shelf-item-body">'
      + '<span class="shelf-tm">' + s.tm + '</span>'
      + '<span class="shelf-tag">' + s.tag + '</span>'
      + '</div></div>';
  }).join('');
  // Activar clicks en escenas
  shelf.querySelectorAll('.scene-nav').forEach(function(el) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function() { switchScene(this.getAttribute('data-ytid')); });
  });

  // Word bank — cargado desde pool OpenAI (se aplica en buildPhrase vía _updateWordBankFromPool)
  _loadPool(videoId);
}

function switchScene(ytId) {
  if (!ytId || ytId === currentVideoId) return;
  if (!MOVIES[ytId]) return;
  var d = MOVIES[ytId];
  // Reset puntos de partida
  totalScore = 0; combo = 1; errorCount = 0;
  document.getElementById('statGamePts').textContent = '0';
  var _cv=document.getElementById('comboVal');if(_cv)_cv.textContent='×1';
  var _se2=document.getElementById('statErrors');if(_se2)_se2.textContent='0';
  // Reset karaoke
  karaoState.enabled = false;
  karaoState.lines = [];
  karaoState.gaps = [];
  karaoState.currentIdx = -1;
  karaoState.challengeActive = false;
  karaoState.inGap = false;
  karaoState.completedLines = {};
  if (loopTimer) { clearInterval(loopTimer); loopTimer = null; }
  // Actualizar estado global
  currentVideoId = ytId;
  currentStart   = d.start  || 0;
  currentEnd     = d.end    || 0;
  currentPhrase  = d.phrase || '';
  // Info overlay desde admin
  updateMovieInfo(ytId);
  // Cargar nuevo video
  if (player && typeof player.loadVideoById === 'function') {
    player.mute();
    player.loadVideoById({ videoId: ytId, startSeconds: currentStart });
    showAdOverlay();
    var ytEl = document.getElementById('ytPlayer');
    if (ytEl) ytEl.style.pointerEvents = 'none';
    startAdCountdown();
    if (d.hasKaraoke && d.dataUrl) {
      loadAndInitKaraoke(ytId);
    } else {
      buildPhrase();
    }
  }
}

function toggleAllScenes(scenes) {
  var panel = document.getElementById('allScenesPanel');
  if (!panel) return;
  if (panel.classList.contains('open')) { panel.classList.remove('open'); return; }
  panel.innerHTML = scenes.map(function(s, i) {
    var isNow = s.ytId === currentVideoId || (i === 0 && !scenes.some(function(x){return x.ytId===currentVideoId;}));
    var thumbStyle = s.portada ? 'background-image:url('+s.portada+')' : '';
    return '<div class="all-scenes-row' + (isNow?' now':'') + (s.ytId?' scene-nav':'') + '" data-ytid="'+(s.ytId||'')+'">'
      + '<div class="all-scenes-thumb" style="'+thumbStyle+'"></div>'
      + '<div class="all-scenes-info">'
      + '<span class="all-scenes-tm">'+s.tm+'</span>'
      + '<span class="all-scenes-tag">'+s.tag+'</span>'
      + '</div></div>';
  }).join('');
  panel.querySelectorAll('.scene-nav').forEach(function(el) {
    el.addEventListener('click', function() {
      panel.classList.remove('open');
      switchScene(this.getAttribute('data-ytid'));
    });
  });
  panel.classList.add('open');
  // Cerrar al click fuera
  setTimeout(function() {
    document.addEventListener('click', function _close(e) {
      if (!panel.contains(e.target) && e.target.id !== 'shelfMore') {
        panel.classList.remove('open');
        document.removeEventListener('click', _close);
      }
    });
  }, 50);
}

// ── Pool de palabras del movie actual ────────────────────────────────────
var _currentPool = [];

function _levenshtein(a, b) {
  var m = a.length, n = b.length, dp = [], i, j;
  for (i = 0; i <= m; i++) { dp[i] = [i]; }
  for (j = 0; j <= n; j++) { dp[0][j] = j; }
  for (i = 1; i <= m; i++) {
    for (j = 1; j <= n; j++) {
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[m][n];
}

function _pickDistractors(correctWords, pool, totalCount) {
  // Filtrar palabras correctas del pool y deduplicar
  var correct = correctWords.map(function(w){ return w.toUpperCase(); });
  var available = pool.map(function(w){ return w.toUpperCase(); })
    .filter(function(w,i,arr){ return !correct.includes(w) && arr.indexOf(w) === i; });
  if (!available.length) return correct.slice(0, totalCount);

  // Puntuar cada palabra por similitud mínima a las palabras correctas
  var scored = available.map(function(w) {
    var minDist = correct.reduce(function(mn, cw) {
      return Math.min(mn, _levenshtein(w, cw));
    }, Infinity);
    return { w: w, d: minDist };
  });
  scored.sort(function(a, b) { return a.d - b.d; });

  // 50% palabras similares (menor distancia), 50% aleatorias
  var simCount  = Math.ceil(totalCount * 0.5);
  var randCount = totalCount - simCount;

  // Pool de similares: top 20 más parecidas, elegir al azar entre ellas
  var simPool = scored.slice(0, Math.min(20, scored.length)).map(function(x){ return x.w; });
  for (var i = simPool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = simPool[i]; simPool[i] = simPool[j]; simPool[j] = t;
  }
  var result = simPool.slice(0, simCount);

  // Pool de aleatorias: resto del array barajado
  var randPool = scored.slice(20).map(function(x){ return x.w; });
  for (var i = randPool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = randPool[i]; randPool[i] = randPool[j]; randPool[j] = t;
  }
  result = result.concat(randPool.slice(0, randCount));

  // Completar si faltan
  var allShuffled = scored.map(function(x){ return x.w; });
  for (var i = allShuffled.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = allShuffled[i]; allShuffled[i] = allShuffled[j]; allShuffled[j] = t;
  }
  var k = 0;
  while (result.length < totalCount && k < allShuffled.length) {
    if (!result.includes(allShuffled[k])) result.push(allShuffled[k]);
    k++;
  }
  return result.slice(0, totalCount);
}

function _updateWordBankFromPool() {
  if (!_currentPool.length) return;
  // Recoger las respuestas correctas de los blancos actuales
  var blanks = document.querySelectorAll('.blank-inp');
  var correctWords = [];
  blanks.forEach(function(inp) {
    var ans = (inp.dataset.answer || '').replace(/[^a-zA-ZÀ-ɏ']/g,'').toUpperCase();
    if (ans && ans.length > 1) correctWords.push(ans);
  });
  if (!correctWords.length) return;
  // Distractores: correct + extras del pool
  var extraCount = Math.min(8, Math.max(3, correctWords.length + 2));
  var distractors = _pickDistractors(correctWords, _currentPool, extraCount);
  // Mezclar correctas + distractoras
  var all = correctWords.concat(distractors);
  for (var i = all.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = all[i]; all[i] = all[j]; all[j] = t;
  }
  updateWordBank(all);
}

async function _loadPool(videoId) {
  if (typeof loadMoviesPool !== 'function') return;
  try {
    _currentPool = (await loadMoviesPool(videoId)) || [];
    console.log('[WordBank] Pool cargado:', _currentPool.length, 'palabras');
  } catch(e) {
    _currentPool = [];
    console.warn('[WordBank] Error cargando pool:', e);
  }
}

function updateWordBank(words) {
  var list = document.getElementById('bankList');
  if (!list) return;
  if (!words || !words.length) return;
  list.innerHTML = words.map(function(w, i) {
    var locked = i >= 3;
    return '<span class="bank-word' + (locked ? ' locked' : '') + '">' + w + '</span>';
  }).join('');
  document.getElementById('bankPts').textContent = '+' + (words.length * 8) + ' aura';
}

// ── FRASE Y BLANCOS ───────────────────────────────────────────────────────
function buildPhrase() {
  hintUsed = false;
  if (!currentPhrase) {
    var row = document.getElementById('phraseRow');
    if (row) row.innerHTML = '<span style="color:rgba(255,255,255,.25);font-size:.85rem;">'+(window.auraT?window.auraT('play_loading'):'cargando frase…')+'</span>';
    return;
  }
  var words = currentPhrase.split(' ');
  // numBlanks nunca puede superar la cantidad de palabras (evita loop infinito)
  var numBlanks = Math.min(Math.max(1, Math.floor(words.length * 0.3)), 8, words.length);

  var indices = [];
  while (indices.length < numBlanks) {
    var i = Math.floor(Math.random() * words.length);
    if (!indices.includes(i)) indices.push(i);
  }
  blankedIndices = indices;

  var row = document.getElementById('phraseRow');
  row.innerHTML = '';
  words.forEach(function(word, i) {
    if (indices.includes(i)) {
      var cleanWord = word.replace(/[^a-zA-Z']/g, '');
      var after = word.slice(cleanWord.length);
      var wrap = document.createElement('span');
      wrap.className = 'blank-wrap';
      var inp = document.createElement('input');
      inp.type = 'text';
      inp.className = 'blank-inp';
      inp.dataset.answer = cleanWord;
      inp.dataset.idx = i;
      inp.style.width = Math.max(60, cleanWord.length * 12) + 'px';
      inp.placeholder = '...';
      inp.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') checkAnswers();
      });
      inp.addEventListener('focus', function() {
        if (isPlaying && player) { player.pauseVideo(); isPlaying = false; updatePPIcon(); }
      });
      wrap.appendChild(inp);
      if (after) {
        var sp = document.createElement('span');
        sp.className = 'w';
        sp.textContent = after + ' ';
        wrap.appendChild(sp);
      }
      row.appendChild(wrap);
    } else {
      var sp = document.createElement('span');
      sp.className = 'w';
      sp.textContent = word + ' ';
      row.appendChild(sp);
    }
  });

  // Blank count label
  document.getElementById('blankCount').textContent = numBlanks + (numBlanks === 1 ? ' palabra' : ' palabras');
  // Actualizar banco de palabras con distractores inteligentes desde el pool
  setTimeout(_updateWordBankFromPool, 50);

  // Progress bar
  var prog = document.getElementById('glassProg');
  prog.innerHTML = '';
  for (var p = 0; p < Math.min(numBlanks + 4, 12); p++) {
    var sp = document.createElement('span');
    if (p < sceneCount - 1) sp.className = 'done';
    else if (p === sceneCount - 1) sp.className = 'now';
    prog.appendChild(sp);
  }

  // Dynamically update word bank from phrase
  var d = MOVIES[currentVideoId];
  if (d) updateWordBank(d.wordBank);
}

var hintUsed = false;

// ── VERIFICAR ─────────────────────────────────────────────────────────────
function levenshtein(a, b) {
  var m = a.length, n = b.length, dp = [];
  for (var i = 0; i <= m; i++) { dp[i] = []; for (var j = 0; j <= n; j++) dp[i][j] = i === 0 ? j : j === 0 ? i : 0; }
  for (var i = 1; i <= m; i++) for (var j = 1; j <= n; j++)
    dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

function checkAnswers() {
  if (karaoState.enabled && karaoState.challengeActive) { checkKaraAnswers(); return; }
  var inputs = document.querySelectorAll('.blank-inp:not(.correct):not(.partial):not(.wrong)');
  if (!inputs.length) return;
  var gained = 0;
  inputs.forEach(function(inp) {
    var answer = inp.dataset.answer.toLowerCase().trim();
    var typed = inp.value.toLowerCase().trim();
    if (!typed) return;
    if (typed === answer) {
      inp.classList.add('correct'); inp.disabled = true; gained += 10;
    } else if (levenshtein(typed, answer) <= Math.max(1, Math.floor(answer.length * 0.3))) {
      inp.classList.add('partial'); inp.disabled = true; gained += 5;
    } else {
      inp.classList.add('wrong');
    }
  });
  totalScore += gained;
  document.getElementById('statGamePts').textContent = totalScore;
  if (gained > 0 && window.AuraXP) {
    AuraXP.addXP(Math.floor(gained / 10));
    AuraXP.addPM(Math.floor(gained / 20));
    AuraXP.addAP(Math.floor(gained / 50));
    var _mvThumb = 'https://img.youtube.com/vi/' + (currentVideoId||'') + '/mqdefault.jpg';
    var _mvAcc   = totalScore > 0 ? Math.min(100, Math.round((gained / Math.max(1, totalScore)) * 100)) : 0;
    AuraXP.logSession({ tool:'play-movies', skill:'Listening',
      xp: Math.floor(gained/10), pm: Math.floor(gained/20),
      ap: Math.floor(gained/50), accuracy: _mvAcc,
      thumbnail: _mvThumb });
  }
  // Récord: guardar máximo en localStorage
  var _recEl = document.getElementById('statRecord');
  if (_recEl && totalScore > parseInt(_recEl.textContent || '0')) {
    _recEl.textContent = totalScore;
    try { localStorage.setItem('aura_rec_' + (currentVideoId||''), totalScore); } catch(e) {}
  }
  if (gained > 0) { showPopup('+' + gained + ' aura 🎯'); }
}

// ── NUEVA ESCENA ──────────────────────────────────────────────────────────
function newPhrase() {
  sceneCount++;
  document.querySelectorAll('.blank-inp').forEach(function(inp) {
    inp.classList.remove('correct','partial','wrong');
    inp.disabled = false;
    inp.value = '';
  });
  buildPhrase();
  if (player && typeof player.seekTo === 'function') {
    player.seekTo(currentStart);
    player.playVideo();
    isPlaying = true;
    updatePPIcon();
  }
}

// ── PISTA ─────────────────────────────────────────────────────────────────
function showHint() {
  var unanswered = Array.from(document.querySelectorAll('.blank-inp:not(.correct):not(.partial)'));
  if (!unanswered.length) return;
  var inp = unanswered[Math.floor(Math.random() * unanswered.length)];
  var ans = inp.dataset.answer;
  inp.value = ans[0] + '_'.repeat(Math.max(0, ans.length - 1));
  inp.focus();
  showPopup('Primera letra: ' + ans[0].toUpperCase());
}

// ── CAMBIAR PELÍCULA ──────────────────────────────────────────────────────
function changeMovie(videoId) {
  var d = MOVIES[videoId];
  if (!d) return;
  // Ocultar overlay de carga si estaba activo por la película anterior
  hideAdOverlay();
  currentVideoId = videoId;
  currentStart = d.start;
  currentEnd = d.end;
  currentPhrase = d.phrase;
  sceneCount = 1;
  combo = 1;
  var _cv=document.getElementById('comboVal');if(_cv)_cv.textContent='×1';

  if (player && typeof player.loadVideoById === 'function') {
    player.loadVideoById({ videoId: videoId, startSeconds: d.start });
    isPlaying = true;
    startLoopWatcher();
  }

  updateMovieInfo(videoId);
  if (MOVIES[videoId] && MOVIES[videoId].hasKaraoke) {
    loadAndInitKaraoke(videoId);
  } else {
    buildPhrase();
  }
  closeMoviePanel();
}

function toggleMoviePanel() { document.getElementById('moviePanel').classList.toggle('open'); }
function closeMoviePanel() { document.getElementById('moviePanel').classList.remove('open'); }

document.addEventListener('click', function(e) {
  var panel = document.getElementById('moviePanel');
  if (panel && panel.classList.contains('open') && !panel.contains(e.target) && !e.target.closest('.bot-card.change')) {
    closeMoviePanel();
  }
});

// Spacebar = play/pause (cuando no hay input enfocado)
document.addEventListener('keydown', function(e) {
  if (e.code === 'Space' && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault();
    togglePlay();
  }
  if (e.code === 'Enter' && document.activeElement.tagName !== 'INPUT') {
    checkAnswers();
  }
});

// ── POPUP ─────────────────────────────────────────────────────────────────
function showPopup(msg) {
  var p = document.getElementById('scorePopup');
  p.textContent = msg;
  p.classList.add('show');
  setTimeout(function() { p.classList.remove('show'); }, 2200);
}

// ── FOTO DE PERFIL ────────────────────────────────────────────────────────
var _photoInput = document.createElement('input');
_photoInput.type = 'file'; _photoInput.accept = 'image/*'; _photoInput.style.display = 'none';
document.body.appendChild(_photoInput);

function triggerPhotoUpload() { _photoInput.click(); }

_photoInput.addEventListener('change', function(e) {
  var file = e.target.files[0]; if (!file) return;
  var reader = new FileReader();
  reader.onload = function(ev) {
    var src = ev.target.result;
    ['tbAvatar', 'srProfile'].forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = '<img src="' + src + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
    });
    try { localStorage.setItem('aura_profile_photo', src); } catch(e) {}
  };
  reader.readAsDataURL(file);
});

// karaoke.js loaded via <script src>
// popup-gover.js loaded via <script src>

// ── CERRAR SESIÓN ─────────────────────────────────────────────────────────
function cerrarSesion() {
  try { localStorage.clear(); sessionStorage.clear(); } catch(e) {}
  window.location.href = 'login.html';
}

// ── INIT ──────────────────────────────────────────────────────────────────
window.addEventListener('load', function() {
  // Cargar foto guardada
  try {
    var saved = localStorage.getItem('aura_profile_photo');
    if (saved) {
      ['tbAvatar', 'srProfile'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.innerHTML = '<img src="' + saved + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
      });
    }
  } catch(e) {}

  // Cargar info inicial de película
  updateMovieInfo(currentVideoId);
  if (MOVIES[currentVideoId] && MOVIES[currentVideoId].hasKaraoke) {
    loadAndInitKaraoke(currentVideoId);
  } else {
    buildPhrase();
  }

  // Conectar Supabase y cargar perfil
  if (window._aura) {
    window._aura.checkAuth().then(function(user) {
      if (!user) return;
      window._aura.loadProfile(user.id).then(function() {
        // Actualizar breadcrumb con nombre del usuario
        var profile = window._aura.profile;
        if (profile && profile.nombre) {
          var el = document.getElementById('breadcrumbUser');
          if (el) el.textContent = profile.nombre.toLowerCase().split(' ')[0];
        }
      });
    });
  }
});

// ── PROGRESS SAVING ──────────────────────────────────────────────────────────
var _sceneStartTime = 0;

function saveMovieProgress() {
  try {
    if (!window._aura || !window._aura.sb || !window._aura.userId) return;
    var d = MOVIES[currentVideoId] || {};
    var remaining = 0;
    if (player && typeof player.getCurrentTime === 'function' && currentEnd > 0) {
      remaining = Math.max(0, currentEnd - Math.floor(player.getCurrentTime()));
    }
    window._aura.sb.from('profiles').update({
      ultima_pelicula_titulo : (d.titleMain || '') + (d.titleSub ? ' ' + d.titleSub : ''),
      ultima_pelicula_slug   : d._peliculaSlug || '',
      ultima_escena_num      : d._orden || 1,
      ultima_escena_frase    : d.phrase || '',
      ultima_escena_accent   : d.speaker || '',
      ultimo_tiempo_restante : remaining
    }).eq('id', window._aura.userId).then(function(){});
  } catch(e) {}
}

window.addEventListener('beforeunload', function() { saveMovieProgress(); });
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'hidden') saveMovieProgress();
});

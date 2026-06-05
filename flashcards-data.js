// ── DECK DATA — cargado desde Supabase con fallback a slangs.json ─────────────
var ALL_SLANGS  = [];   // todas las tarjetas, sin filtrar
var CARDS       = [];   // mazo activo de la sesión
var _activeType = 'slang'; // tab activa

var _CAT_LABELS = {
  slang         : 'Slang',
  idioms        : 'Idioms',
  phrasal_verbs : 'Phrasal Verbs',
  business      : 'Business'
};

/* ── Carga desde Supabase (o slangs.json como fallback) ── */
async function loadFlashcards() {
  try {
    var sb = window._aura && window._aura.sb;
    if (sb) {
      // Leer idioma desde localStorage primero (evita race condition con _aura async)
      var _lang = null;
      try { _lang = localStorage.getItem('aura_lang'); } catch(e) {}
      _lang = _lang || (window._aura && (window._aura.lang || window._aura.active_language)) || 'en';
      var { data, error } = await sb.from('slang_cards')
        .select('id,word,example,distractor,distractors,definition,label,cat,difficulty')
        .eq('language', _lang)
        .order('created_at', { ascending: false });
      if (!error && data && data.length) {
        ALL_SLANGS = data;
        return;
      }
      // Sin datos para este idioma
      ALL_SLANGS = [];
      // Solo usar fallback estático para inglés (idioma base)
      if (_lang !== 'en') return;
    }
  } catch (e) {
    console.warn('[Aura] Supabase flashcards error:', e);
  }
  // Fallback slangs.json — solo llega aquí si lang === 'en' y Supabase falló
  try {
    var r    = await fetch('slangs.json');
    var data = await r.json();
    ALL_SLANGS = data;
  } catch (e) {
    console.warn('[Aura] slangs.json no disponible:', e);
    ALL_SLANGS = [];
  }
}

/* ── Obtener tarjetas filtradas por tipo ── */
function getCardsByType(type) {
  if (!type || type === 'all') return ALL_SLANGS;
  return ALL_SLANGS.filter(function (c) { return c.cat === type; });
}

/* ── Construir mazo aleatorio (max 15) ── */
function buildRandomDeck(source) {
  var pool     = (source || ALL_SLANGS).slice();
  var shuffled = pool.sort(function () { return Math.random() - 0.5; });
  var selected = shuffled.slice(0, 15);
  return selected.map(function (c) {
    var side     = Math.random() < 0.5 ? 'left' : 'right';
    var distPool = Array.isArray(c.distractors) && c.distractors.length
      ? c.distractors : (c.distractor ? [c.distractor] : null);
    var trap;
    if (distPool) {
      trap = distPool[Math.floor(Math.random() * distPool.length)];
    } else {
      // Sin distractor guardado: usar la definición de otra carta del pool
      var others = pool.filter(function(o){ return o.word !== c.word && o.definition; });
      trap = others.length
        ? others[Math.floor(Math.random() * others.length)].definition
        : 'Expresión usada de forma figurada o informal.';
    }
    var trans = _FC_TRANS && _FC_TRANS[c.word];
    var def   = trans ? trans.definition : c.definition;
    // If translated distractors available, pick randomly from them; else use original trap
    var trapFinal = trap;
    if (trans && trans.distractors && trans.distractors.length) {
      trapFinal = trans.distractors[Math.floor(Math.random() * trans.distractors.length)];
    }
    return {
      label      : c.label || c.cat,
      cat        : c.cat,
      difficulty : c.difficulty || 'med',
      word       : c.word,
      pron       : '',
      ctx        : c.example,
      q          : (window.auraT ? window.auraT('fc_question') : '¿cuál es la definición de esta expresión?'),
      optL       : side === 'left'  ? def : trapFinal,
      optR       : side === 'right' ? def : trapFinal,
      defShort   : def,
      correctSide: side
    };
  });
}

/* ── Cambiar tab / tipo activo ── */
function switchTab(type, labelEl) {
  _activeType = type;

  // Actualizar botones activos
  document.querySelectorAll('.tb-tab').forEach(function (btn) {
    btn.classList.toggle('active', btn.dataset.type === type);
  });

  // Actualizar título de sección
  var h1 = document.querySelector('.cat-head h1');
  if (h1) {
    var label = _CAT_LABELS[type] || type;
    h1.innerHTML = label + ' <em>USA · 2026</em>';
  }

  // Resetear estado de sesión
  cardIdx       = 0;
  sessionPts    = 0;
  combo         = 0;
  bestCombo     = 0;
  totalAnswered = 0;
  totalCorrect  = 0;

  // Reconstruir mazo con el tipo seleccionado
  var filtered = getCardsByType(type);
  if (!filtered.length) filtered = ALL_SLANGS.slice(); // fallback: slangs.json tiene cats distintos
  CARDS = buildRandomDeck(filtered);
  buildDeck();
}

// ── TRANSLATION CACHE ────────────────────────────────────────────────────────────
var _FC_TRANS = null; // null = not loaded yet

async function _loadFcTranslations() {
  var uiLang = localStorage.getItem('aura_ui_lang') || 'es';
  if (uiLang === 'es') { _FC_TRANS = {}; return; }
  var sb = window._aura && window._aura.sb;
  if (!sb) { _FC_TRANS = {}; return; }
  var { data } = await sb.from('flashcard_translations')
    .select('word,definition,distractor,distractors')
    .eq('lang', uiLang);
  _FC_TRANS = {};
  if (data) data.forEach(function(r){
    _FC_TRANS[r.word] = {
      definition:  r.definition,
      distractor:  r.distractor,
      distractors: Array.isArray(r.distractors) && r.distractors.length ? r.distractors : null
    };
  });
}

// ── BUILD DECK ─────────────────────────────────────────────────────────────────
async function buildDeck(){
  if (_FC_TRANS === null) await _loadFcTranslations();
  var deck = document.getElementById('deck');
  if(!deck) return;
  deck.innerHTML = '';
  var numEl = document.getElementById('deckNum');
  var totEl = document.getElementById('deckTotal');
  if(numEl) numEl.textContent = totalAnswered + 1;
  if(totEl) totEl.textContent = (MAX_ERRORS - totalErrors);
  // sessTot removed (replaced by livesRow)

  var slots   = ['s3','s2','s1'];
  var indices = [cardIdx+2, cardIdx+1, cardIdx];
  for(var i=0; i<3; i++){
    var ci = indices[i];
    if(ci >= CARDS.length) continue;
    var c   = CARDS[ci];
    var art = document.createElement('article');
    art.className = 'swipe ' + slots[i];
    var isTop     = (slots[i]==='s1');
    var globalNum = totalAnswered + (ci - cardIdx) + 1;
    var livesRemain = MAX_ERRORS - totalErrors;
    var inner = '<div class=swipe-head><span class=swipe-cat>'+(c.label||c.cat)+'</span><span class=swipe-num style="color:#f87171;">♥'+livesRemain+'</span></div>';
    inner += '<div class=swipe-mid><span class=swipe-word>'+c.word+'</span>';
    if(isTop && c.pron) inner += '<span class=swipe-pron>'+c.pron+'</span>';
    if(isTop && c.ctx)  inner += '<span class=swipe-context>'+c.ctx+'</span>';
    inner += '</div>';
    if(isTop){
      art.id = 'topCard';
      art.innerHTML =
        '<span class="swipe-label false">←</span>' +
        '<span class="swipe-label true">→</span>' +
        inner +
        '<div class=swipe-foot>' +
          '<div class=swipe-q>'+c.q+'</div>' +
          '<div class=swipe-opts>' +
            '<button class="swipe-opt left" onclick="answerOpt(\'left\')">' +
              '<span class=swipe-opt-arrow>← ' + (window.auraT ? window.auraT('fc_left') : 'izquierda') + '</span>' +
              '<span class=swipe-opt-text>'+c.optL+'</span>' +
            '</button>' +
            '<button class="swipe-opt right" onclick="answerOpt(\'right\')">' +
              '<span class=swipe-opt-arrow>' + (window.auraT ? window.auraT('fc_right') : 'derecha') + ' →</span>' +
              '<span class=swipe-opt-text>'+c.optR+'</span>' +
            '</button>' +
          '</div>' +
        '</div>';
      initDrag(art);
    } else {
      art.innerHTML = inner + '<div class=swipe-foot></div>';
    }
    deck.appendChild(art);
  }
  updatePanels();
}

function pad2(n){ return n<10?'0'+n:String(n); }

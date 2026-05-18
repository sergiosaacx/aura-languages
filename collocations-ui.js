// ── Actualiza tarjetas de la derecha ───────────────────────────────────────
function updateTiles() {
  setText('energyVal', GAME.energy);
  setText('energyFoot', Math.max(0, GAME.energy));
  setText('streakVal', GAME.streak);
  setText('gamePts', GAME.totalPoints);
  setText('comboLbl', '×' + GAME.combo + ' combo');

  var acc = GAME.totalAttempts === 0 ? 100 : Math.round((GAME.totalCorrect / GAME.totalAttempts) * 100);
  setText('accuracyVal', acc);
  setText('accuracyFoot', GAME.totalCorrect + ' de ' + GAME.totalAttempts);

  var donut = $('streakDonut');
  if (donut) {
    var pct = Math.min(100, GAME.streak * 10);
    donut.setAttribute('stroke-dashoffset', String(100 - pct));
  }

  var energyTile = $('tileEnergy');
  if (energyTile) {
    var w = Math.round((GAME.energy / 15) * 100);
    energyTile.style.setProperty('--energy-w', w + '%');
    var existing = energyTile.querySelector('.energy-bar-inline');
    if (!existing) {
      var bar = document.createElement('div');
      bar.className = 'energy-bar-inline';
      bar.style.cssText = 'position:absolute;left:0;bottom:0;height:4px;background:linear-gradient(90deg,#ff5a5a,#ffae5a);width:' + w + '%;transition:width .4s;z-index:2';
      energyTile.appendChild(bar);
    } else {
      existing.style.width = w + '%';
    }
  }
}

// ── Barra superior ─────────────────────────────────────────────────────────
function updateTopbar() {
  setText('tbPoints', GAME.roundPoints);
  var fg = $('tbDonutFg');
  if (fg) {
    var modPts = GAME.roundPoints % 100;
    var offset = 264 * (1 - modPts / 100);
    fg.setAttribute('stroke-dashoffset', String(offset));
  }
  setText('tbRec', GAME.record);
  var mins = Math.floor((Date.now() - GAME.startTime) / 60000);
  setText('sessionTime', mins + ' min');
}

function renderXpBar() {
  var xp    = GAME.xpSessionEarned;
  var xpMax = 100;
  var pct   = Math.min(100, Math.round((xp / xpMax) * 100));
  setText('tbXpLvl', 'XP · partida');
  setText('tbXpCur', xp);
  setText('tbXpNext', xpMax);
  var fill = $('tbXpFill');
  if (fill) fill.style.width = pct + '%';
}

// ── Atajos de teclado ──────────────────────────────────────────────────────
document.addEventListener('keydown', function(e) {
  // Modal — teclas 1-4 y Enter
  var overlay = document.getElementById('col-diff-overlay');
  if (overlay && overlay.style.display !== 'none') {
    var keys = { '1':'easy', '2':'med', '3':'hard', '4':'leg' };
    if (keys[e.key]) { colDiffSelect(keys[e.key]); return; }
    if (e.key === 'Enter') { colDiffStart(); return; }
    return;
  }
  // Juego
  if (e.key === 'Enter' && GAME.completedRound) nextPhrase();
  if (e.key === 'Backspace') {
    var p = currentPhrase();
    for (var i = p.en.length - 1; i >= 0; i--) {
      if (GAME.filledSlots[i]) {
        var word = GAME.filledSlots[i];
        delete GAME.filledSlots[i];
        GAME.usedChips.delete(word);
        var slot = document.querySelectorAll('#slots .slot')[i];
        slot.classList.remove('filled'); slot.classList.add('empty');
        slot.textContent = ''; slot.style.background = ''; slot.style.borderColor = ''; slot.style.color = '';
        document.querySelectorAll('.chip').forEach(function(c) {
          if (c.dataset.w === word) { c.style.opacity = ''; c.style.pointerEvents = ''; }
        });
        $('next').disabled = true;
        GAME.completedRound = false;
        setActiveSlot();
        break;
      }
    }
  }
});

function updateNextButton() {
  var p = currentPhrase();
  var allFilled = p.en.every(function(_, i) { return GAME.filledSlots[i]; });
  $('next').disabled = !allFilled;
  if (!allFilled) {
    GAME.completedRound = false;
    $('tipText').innerHTML = 'Selecciona las palabras correctas del banco para completar la frase.';
  }
  setActiveSlot();
}

// ── Modal de dificultad ────────────────────────────────────────────────────
var _colDiffSelected = 'med';

var _DIFF_MULT     = { easy: 1,   med: 1.5, hard: 2,   leg: 3   };
var _DIFF_PREVIEWS = {
  easy: {
    es: 'Tomé una <b>ducha</b>.',
    en: 'I <span style="display:inline-block;min-width:44px;height:1.1em;vertical-align:-3px;background:rgba(196,255,61,.1);border-bottom:2px solid var(--accent);border-radius:4px;margin:0 2px"></span> a shower.',
    note: '➜ mismo verbo · <b style="color:#7ee787;text-transform:uppercase;letter-spacing:.1em">tomar → take</b>'
  },
  med: {
    es: 'Voy a <b>tomar</b> una decisión mañana.',
    en: "I'm going to <span style=\"display:inline-block;min-width:44px;height:1.1em;vertical-align:-3px;background:rgba(196,255,61,.1);border-bottom:2px solid var(--accent);border-radius:4px;margin:0 2px\"></span> a decision tomorrow.",
    note: '➜ verbo distinto · <b style="color:#fbbf24;text-transform:uppercase;letter-spacing:.1em">tomar → make</b>, no "take"'
  },
  hard: {
    es: '<b>Tengo</b> mucha hambre.',
    en: "I <span style=\"display:inline-block;min-width:44px;height:1.1em;vertical-align:-3px;background:rgba(196,255,61,.1);border-bottom:2px solid var(--accent);border-radius:4px;margin:0 2px\"></span> very hungry.",
    note: '➜ estructura distinta · <b style="color:#ff6464;text-transform:uppercase;letter-spacing:.1em">tener → be</b>'
  },
  leg: {
    es: '<b>Está lloviendo a cántaros.</b>',
    en: "It's raining <span style=\"display:inline-block;min-width:44px;height:1.1em;vertical-align:-3px;background:rgba(196,255,61,.1);border-bottom:2px solid var(--accent);border-radius:4px;margin:0 2px\"></span> and dogs.",
    note: '➜ sin equivalente · <b style="color:#c084fc;text-transform:uppercase;letter-spacing:.1em">idiom puro</b>'
  }
};

function colDiffSelect(key) {
  _colDiffSelected = key;
  document.querySelectorAll('.col-diff-opt').forEach(function(b) {
    b.classList.toggle('col-diff-selected', b.dataset.key === key);
  });
  _colDiffUpdatePreview(key);
}

function _colDiffUpdatePreview(key) {
  var pv    = _DIFF_PREVIEWS[key];
  var prevEl = document.getElementById('col-diff-preview');
  if (!prevEl || !pv) return;
  prevEl.innerHTML =
    '<div style="display:flex;align-items:flex-start;gap:10px;line-height:1.4">' +
      '<span style="font-family:var(--mono);font-size:8.5px;font-weight:800;letter-spacing:.18em;padding:3px 6px;border-radius:5px;flex-shrink:0;margin-top:3px;color:var(--muted);background:rgba(255,255,255,.05);border:1px solid var(--line)">ES</span>' +
      '<span style="font-size:13px;font-style:italic;color:var(--muted)">' + pv.es + '</span>' +
    '</div>' +
    '<div style="display:flex;align-items:flex-start;gap:10px;line-height:1.4">' +
      '<span style="font-family:var(--mono);font-size:8.5px;font-weight:800;letter-spacing:.18em;padding:3px 6px;border-radius:5px;flex-shrink:0;margin-top:3px;color:var(--accent-ink);background:var(--accent);box-shadow:0 0 12px rgba(196,255,61,.25)">EN</span>' +
      '<span style="font-size:15px;font-weight:600;color:var(--ink-2);letter-spacing:-.01em">' + pv.en + '</span>' +
    '</div>' +
    '<div style="margin-top:4px;font-family:var(--mono);font-size:10px;color:var(--muted);padding-left:38px">' + pv.note + '</div>';
}

function _colDiffUpdateCounts() {
  var diffs = ['easy','med','hard','leg'];
  var secPerPhrase = { easy: 20, med: 30, hard: 40, leg: 50 };
  diffs.forEach(function(d) {
    var count = getPhrasesForDifficulty(d).length;
    var nEl   = document.getElementById('col-n-' + d);
    var tEl   = document.getElementById('col-t-' + d);
    if (nEl) nEl.textContent = count;
    if (tEl) tEl.textContent = '~' + Math.max(1, Math.round(count * secPerPhrase[d] / 60));
  });
  var sub = document.getElementById('col-diff-subtitle');
  if (sub) sub.textContent = PHRASES.length + ' colocaciones · 4 niveles';
}

function _colDiffUpdateNivel() {
  var profile = window._aura && window._aura.profile;
  if (!profile) return;
  var nivel = profile.nivel || 1;
  var cefr = nivel <= 3 ? 'A2 · Básico'
           : nivel <= 7 ? 'B1 · Pre-Intermedio'
           : nivel <= 12 ? 'B2 · Intermedio'
           : nivel <= 17 ? 'C1 · Avanzado' : 'C2 · Experto';
  var el = document.getElementById('col-diff-nivel');
  if (el) el.textContent = cefr;
}

function colDiffCancel() {
  // Volver al dashboard
  window.location.href = 'dashboard.html';
}

async function colDiffStart() {
  var diff = _colDiffSelected;
  var mult = _DIFF_MULT[diff] || 1;

  // Verificar que haya frases para este nivel
  if (getPhrasesForDifficulty(diff).length === 0) {
    alert('No hay frases disponibles para este nivel todavía. Prueba con Medio.');
    return;
  }

  // Configurar el juego
  GAME.difficulty    = diff;
  GAME.xpMultiplier  = mult;
  GAME.activePhrases = [];

  // Ocultar modal
  var overlay = document.getElementById('col-diff-overlay');
  if (overlay) {
    overlay.style.opacity    = '0';
    overlay.style.transition = 'opacity .25s';
    setTimeout(function() { overlay.style.display = 'none'; }, 260);
  }

  // Cargar progreso + generar orden + renderizar
  await loadColProgress(diff);
  generateOrder();
  renderPhrase();
  setTimeout(renderXpBar, 800);
  updateTiles();
  updateTopbar();
}

// ── Fotos de perfil ────────────────────────────────────────────────────────
function triggerPhotoUpload() { $('photoInput').click(); }
document.getElementById('photoInput').addEventListener('change', async function(e) {
  var file = e.target.files[0];
  if (!file) return;
  if (window._aura && window._aura.userId) await window._aura.uploadAvatar(file);
});

// ── Navegación sidebars ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function() {
  // Navegación izquierda
  var leftBtns = document.querySelectorAll('nav.aura-sl .aura-sl-btn');
  var routes   = ['home.html','dashboard.html',null,null,null,null];
  leftBtns.forEach(function(b, i) {
    if (routes[i]) b.addEventListener('click', function() { window.location.href = routes[i]; });
  });

  // Reloj de sesión
  setInterval(updateTopbar, 30000);

  // Cargar frases desde Supabase
  await loadCollocations();

  // Actualizar modal con datos dinámicos
  _colDiffUpdateCounts();
  _colDiffUpdateNivel();
  _colDiffUpdatePreview('med');   // preview inicial = medio
  colDiffSelect('med');            // selección inicial

  // Cargar récord del usuario (primero med como default)
  if (window._aura && window._aura.userId) {
    await loadColProgress('med');
  } else {
    // Esperar a que _aura cargue
    var waitAura = setInterval(async function() {
      if (window._aura && window._aura.userId) {
        clearInterval(waitAura);
        _colDiffUpdateNivel();
        await loadColProgress('med');
      }
    }, 300);
  }

  // Mostrar modal (ya está visible por defecto; solo asegurar)
  var overlay = document.getElementById('col-diff-overlay');
  if (overlay) overlay.style.display = 'flex';
});

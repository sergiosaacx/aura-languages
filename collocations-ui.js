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

  // Donut streak (max 10 para llenar)
  var donut = $('streakDonut');
  if (donut) {
    var pct = Math.min(100, GAME.streak * 10);
    donut.setAttribute('stroke-dashoffset', String(100 - pct));
  }

  // Energy bar (línea inferior de la tile)
  var energyTile = $('tileEnergy');
  if (energyTile) {
    var w = Math.round((GAME.energy / 15) * 100);
    energyTile.style.setProperty('--energy-w', w + '%');
    // Inline style hack para el ::after
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

// ── Actualiza la barra superior (puntos, récord, XP) ───────────────────────
function updateTopbar() {
  // Donut de puntos de la partida — el número acumula sin reset.
  // El anillo cicla cada 100 pts (porque cada 100 pts = +10 XP).
  setText('tbPoints', GAME.roundPoints);
  var fg = $('tbDonutFg');
  if (fg) {
    var modPts = GAME.roundPoints % 100; // progreso dentro del chunk actual de 100
    var offset = 264 * (1 - modPts / 100);
    fg.setAttribute('stroke-dashoffset', String(offset));
  }
  setText('tbRec', GAME.record);

  // Sesión de tiempo
  var mins = Math.floor((Date.now() - GAME.startTime) / 60000);
  setText('sessionTime', mins + ' min');

  // ⚠ La barra XP NO se actualiza aquí. Solo en renderXpBar() llamado:
  //   1. Al cargar la página (estado inicial del perfil)
  //   2. Cuando se cruza el umbral de 100 puntos del juego (+10 XP otorgado)
}

// ── XP visual: solo puntos ganados en esta partida ─────────────────────────
// Cada 100 puntos de la partida = 10 XP. La barra va de 0 a 100 XP (= 1000 pts).
function renderXpBar() {
  var xp    = GAME.xpSessionEarned; // XP acumulado esta sesión (0, 10, 20, …)
  var xpMax = 100;                  // la barra se llena al llegar a 100 XP de sesión
  var pct   = Math.min(100, Math.round((xp / xpMax) * 100));
  setText('tbXpLvl', 'XP · partida');
  setText('tbXpCur', xp);
  setText('tbXpNext', xpMax);
  var fill = $('tbXpFill');
  if (fill) fill.style.width = pct + '%';
  console.log('[Aura] renderXpBar — XP sesión:', xp, '/', xpMax, '=', pct + '%');
}


// ── Atajos de teclado ──────────────────────────────────────────────────────
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && GAME.completedRound) {
    nextPhrase();
  }
  if (e.key === 'Backspace') {
    // Vaciar el último slot lleno
    var p = PHRASES[currentPhraseIdx()];
    for (var i = p.en.length - 1; i >= 0; i--) {
      if (GAME.filledSlots[i]) {
        var word = GAME.filledSlots[i];
        delete GAME.filledSlots[i];
        GAME.usedChips.delete(word);
        var slot = document.querySelectorAll('#slots .slot')[i];
        slot.classList.remove('filled');
        slot.classList.add('empty');
        slot.textContent = '';
        slot.style.background = '';
        slot.style.borderColor = '';
        slot.style.color = '';
        document.querySelectorAll('.chip').forEach(function(c) {
          if (c.dataset.w === word) {
            c.style.opacity = '';
            c.style.pointerEvents = '';
          }
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
  var p = PHRASES[currentPhraseIdx()];
  var allFilled = p.en.every(function(_, i) { return GAME.filledSlots[i]; });
  $('next').disabled = !allFilled;
  if (!allFilled) {
    GAME.completedRound = false;
    $('tipText').innerHTML = 'Selecciona las palabras correctas del banco para completar la frase.';
  }
  setActiveSlot();
}

// ── Navegación sidebar izquierdo ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function() {
  var leftBtns = document.querySelectorAll('nav.sl .sl-btn');
  var routes = ['dashboard.html', 'index.html', null, 'movies.html', 'lyriclab.html', null];
  leftBtns.forEach(function(b, i) {
    if (routes[i]) b.addEventListener('click', function() { window.location.href = routes[i]; });
  });

  // Sidebar derecho
  var rightBtns = document.querySelectorAll('aside.right-col .sr:first-of-type .sr-c:not(.profile)');
  var rRoutes = ['speakmaster.html', 'slanglab.html', 'lyriclab.html', 'movies.html', null];
  rightBtns.forEach(function(b, i) {
    if (rRoutes[i]) b.addEventListener('click', function() { window.location.href = rRoutes[i]; });
  });

  // Cargar frases desde Supabase (con fallback estático)
  await loadCollocations();

  // Iniciar juego — orden aleatorio cada carga
  generateOrder();
  renderPhrase();
  // Esperar a que _aura cargue el perfil y luego pintar la barra XP UNA VEZ
  setTimeout(renderXpBar, 800);
  updateTiles();
  updateTopbar();

  // Reloj de sesión cada 30s
  setInterval(updateTopbar, 30000);
});

// ── Cambio de foto de perfil (Supabase Storage) ────────────────────────────
function triggerPhotoUpload() {
  $('photoInput').click();
}
document.getElementById('photoInput').addEventListener('change', async function(e) {
  var file = e.target.files[0];
  if (!file) return;
  if (window._aura && window._aura.userId) {
    await window._aura.uploadAvatar(file);
  }
});

// ── Navegación sidebar izquierdo ──
document.addEventListener('DOMContentLoaded', function () {
  var leftBtns = document.querySelectorAll('nav.sl .sl-btn');
  // Orden: Dashboard, Inicio, Colocaciones(active), MovieLab, LyricLab, Ajustes
  var routes = ['dashboard.html', 'index.html', null, 'movies.html', 'lyriclab.html', null];
  leftBtns.forEach(function (b, i) {
    if (routes[i]) b.addEventListener('click', function(){ window.location.href = routes[i]; });
  });

  // ── Navegación sidebar derecho ──
  var rightBtns = document.querySelectorAll('aside.right-col .sr:first-of-type .sr-c:not(.profile)');
  var rRoutes = ['speakmaster.html', 'slanglab.html', 'lyriclab.html', 'movies.html', null];
  rightBtns.forEach(function (b, i) {
    if (rRoutes[i]) b.addEventListener('click', function(){ window.location.href = rRoutes[i]; });
  });
});

// ── Cambio de foto de perfil (Supabase Storage) ──
function triggerPhotoUpload() {
  document.getElementById('photoInput').click();
}
document.getElementById('photoInput').addEventListener('change', async function (e) {
  var file = e.target.files[0];
  if (!file) return;
  if (window._aura && window._aura.userId) {
    await window._aura.uploadAvatar(file);
  }
});

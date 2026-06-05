// ── Renderiza la frase actual ──────────────────────────────────────────────
function renderPhrase() {
  var p = currentPhrase();
  GAME.filledSlots  = {};
  GAME.usedChips    = new Set();
  GAME.completedRound = false;

  setText('arenaTag', 'ronda ' + String(GAME.orderPos + 1).padStart(2,'0') + ' · ' + p.cat);
  setText('arenaIdx', '#' + String(GAME.orderPos + 1).padStart(2,'0'));
  setText('arenaHoles', p.en.length + ' huecos');

  setText('promptEs', p.es);
  $('promptHint').innerHTML = 'pista · ' + p.hint;

  // Slots
  var slotsEl = $('slots');
  slotsEl.innerHTML = '';
  p.en.forEach(function(w, i) {
    var s = document.createElement('div');
    s.className = 'slot empty' + (i === 0 ? ' active' : '');
    s.dataset.i   = String(i + 1).padStart(2, '0');
    s.dataset.idx = i;
    s.addEventListener('click', function() {
      if (GAME.filledSlots[i]) {
        var word = GAME.filledSlots[i];
        delete GAME.filledSlots[i];
        GAME.usedChips.delete(word);
        s.classList.remove('filled');
        s.classList.add('empty');
        s.textContent = '';
        s.style.background  = '';
        s.style.borderColor = '';
        s.style.color       = '';
        document.querySelectorAll('.chip').forEach(function(c) {
          if (c.dataset.w === word) {
            c.style.opacity       = '';
            c.style.pointerEvents = '';
          }
        });
        updateNextButton();
      }
    });
    slotsEl.appendChild(s);
  });

  var nextBtn = document.createElement('button');
  nextBtn.className = 'btn-next';
  nextBtn.id = 'next';
  nextBtn.disabled = true;
  nextBtn.innerHTML = 'Siguiente <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  nextBtn.addEventListener('click', nextPhrase);
  slotsEl.appendChild(nextBtn);

  // Banco de chips
  var allWords = shuffle(p.en.concat(p.traps));
  var chipsEl  = $('chips');
  chipsEl.innerHTML = '';
  allWords.forEach(function(w) {
    var b = document.createElement('button');
    b.className  = 'chip';
    b.dataset.w  = w;
    b.textContent = w;
    b.addEventListener('click', function() { onChipClick(b, w); });
    chipsEl.appendChild(b);
  });

  setText('bankCount',   allWords.length + ' palabras');
  setText('bankCorrect', p.en.length);
  setText('bankTrick',   'cuidado · ' + p.traps.length + ' trampas');
  setText('masteryCat',  p.cat);
  $('tipText').innerHTML = 'Selecciona las palabras correctas del banco para completar la frase.';

  updateTopbar();
}

// ── Próxima ranura vacía ───────────────────────────────────────────────────
function nextEmptySlotIdx() {
  var p = currentPhrase();
  for (var i = 0; i < p.en.length; i++) {
    if (!GAME.filledSlots[i]) return i;
  }
  return -1;
}

function setActiveSlot() {
  var nextI = nextEmptySlotIdx();
  document.querySelectorAll('#slots .slot').forEach(function(s, i) {
    if (i === nextI) s.classList.add('active');
    else s.classList.remove('active');
  });
}

// ── Click en ficha ─────────────────────────────────────────────────────────
function onChipClick(chipBtn, word) {
  if (GAME.completedRound) return;
  var p       = currentPhrase();
  var slotIdx = nextEmptySlotIdx();
  if (slotIdx === -1) return;
  if (GAME.usedChips.has(word)) return;

  GAME.totalAttempts++;
  var expected  = p.en[slotIdx];
  var isCorrect = (word === expected);
  var slot      = document.querySelectorAll('#slots .slot')[slotIdx];

  if (isCorrect) {
    GAME.totalCorrect++;
    GAME.streak++;
    GAME.bestStreak = Math.max(GAME.bestStreak || 0, GAME.streak);
    GAME.combo = Math.min(5, 1 + Math.floor(GAME.streak / 3));

    var earned         = 10;
    var prevMilestone  = Math.floor(GAME.roundPoints / 100);
    GAME.roundPoints  += earned;
    GAME.totalPoints  += earned;
    GAME.record        = Math.max(GAME.record, GAME.roundPoints);

    slot.textContent = word;
    slot.classList.remove('empty', 'active');
    slot.classList.add('filled');
    slot.style.background  = 'var(--good)';
    slot.style.borderColor = 'var(--good)';
    slot.style.color       = 'rgb(12,12,12)';

    GAME.filledSlots[slotIdx] = word;
    GAME.usedChips.add(word);
    chipBtn.style.opacity       = '0.35';
    chipBtn.style.pointerEvents = 'none';
    chipBtn.style.borderColor   = 'var(--good)';
    chipBtn.style.color         = 'var(--good)';
    chipBtn.style.background    = 'rgba(124,255,180,0.06)';

    // XP — aplicar multiplicador de dificultad
    var newMilestone = Math.floor(GAME.roundPoints / 100);
    if (newMilestone > prevMilestone) {
      var mult     = GAME.xpMultiplier || 1;
      var xpGanado = Math.round((newMilestone - prevMilestone) * 10 * mult);
      GAME.xpSessionEarned += xpGanado;
      console.log('[Aura] +' + xpGanado + ' XP (x' + mult + ' ' + (GAME.difficulty||'med') + ')');
      try {
        if (window.AuraXP) AuraXP.addXP(xpGanado);
      } catch(e) { console.warn('[Aura] addXP error:', e); }
      renderXpBar();
      showXpToast();
    }

    document.querySelectorAll('.chip.is-wrong').forEach(function(c) {
      c.classList.remove('is-wrong');
      c.style.background  = '';
      c.style.borderColor = '';
      c.style.color       = '';
    });

    setActiveSlot();
    checkRoundComplete();
  } else {
    GAME.streak = 0;
    GAME.combo  = 1;
    GAME.energy = Math.max(0, GAME.energy - 1);
    if (GAME.energy <= 0) {
      updateTiles();
      updateTopbar();
      setTimeout(showColDefeat, 650);
      return;
    }

    chipBtn.classList.add('is-wrong');
    chipBtn.style.background  = 'var(--bad-bg)';
    chipBtn.style.borderColor = 'var(--bad)';
    chipBtn.style.color       = 'var(--bad)';

    chipBtn.animate(
      [{transform:'translateX(0)'},{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'translateX(0)'}],
      {duration: 280}
    );
  }

  updateTiles();
  updateTopbar();
}

function checkRoundComplete() {
  var p        = currentPhrase();
  var allFilled = p.en.every(function(_, i) { return GAME.filledSlots[i]; });
  if (allFilled) {
    GAME.completedRound = true;
    GAME.masteryDone++;
    if (GAME.masteryDone >= (GAME.activePhrases || PHRASES).length) {
      var nextBtn2 = $('next');
      if (nextBtn2) nextBtn2.disabled = false;
      setTimeout(showColVictory, 800);
      return;
    }
    var nextBtn = $('next');
    if (nextBtn) nextBtn.disabled = false;
    $('tipText').innerHTML = p.explanation;

    var pct = Math.min(100, Math.round((GAME.masteryDone / (GAME.activePhrases || PHRASES).length) * 100));
    setText('masterySub', GAME.masteryDone + ' / ' + (GAME.activePhrases || PHRASES).length);
    setText('masteryPct', pct);
    var bar = $('masteryBar');
    if (bar) bar.style.width = pct + '%';

    // Guardar progreso en Supabase
    markPhraseSeen(p.es, GAME.difficulty || 'med');

    // Guardar precisión si mejoró
    var acc = GAME.totalAttempts === 0 ? 100
      : Math.round((GAME.totalCorrect / GAME.totalAttempts) * 100);
    saveColAccuracy(GAME.difficulty || 'med', acc);
  }
}

// ── Siguiente frase ────────────────────────────────────────────────────────
function nextPhrase() {
  GAME.orderPos++;
  if (GAME.orderPos >= GAME.order.length) {
    generateOrder(); // re-baraja (o nueva tanda sin vistas)
  }
  renderPhrase();
}

// ── Popups Derrota / Victoria ───────────────────────────────────────────────

var _CL_LOSE_TITLES = [
  ['Se te <em>escaparon</em> las palabras, ',''],
  ['El inglés te ganó esta vez, ',''],
  ['La energía no <em>alcanzó</em>, ',''],
  ['Casi lo logras, <em>','</em>'],
  ['Las trampas te vencieron, ',''],
  ['El combo se <em>rompió</em>, ',''],
  ['Mañana te revanchas, <em>','</em>'],
  ['Falta práctica, <em>','</em>'],
  ['El idioma ganó hoy, ',''],
  ['Las colocaciones te <em>ganaron</em>, ','']
];

function _clGetName() {
  try {
    var p = window._aura && window._aura.profile;
    if (p && p.nombre) return p.nombre.split(' ')[0];
    if (p && p.email) return p.email.split('@')[0];
  } catch(e) {}
  return 'crack';
}

function _calcColPM(acc, diff, bestStreak, totalCorrect) {
  var BASE = { easy: 4, med: 10, hard: 18, leg: 32 };
  var LOSE = { easy: -1, med: -2, hard: -3, leg: -5 };
  var base = BASE[diff] || 10;
  if (acc < 50) return LOSE[diff] || -2;
  var mult = acc >= 95 ? 1.6 : acc >= 90 ? 1.3 : acc >= 80 ? 1.0 : acc >= 70 ? 0.8 : 0.6;
  var pm = Math.round(base * mult);
  if (bestStreak >= 25) pm += 8;
  else if (bestStreak >= 15) pm += 4;
  else if (bestStreak >= 8)  pm += 2;
  if (totalCorrect >= 20) pm += 5;
  else if (totalCorrect >= 10) pm += 3;
  else if (totalCorrect >= 5)  pm += 1;
  return pm;
}

function _clPmHint(acc, diff, bestStreak, totalCorrect) {
  var BASE = { easy: 4, med: 10, hard: 18, leg: 32 };
  var base = BASE[diff] || 10;
  var mult = acc >= 95 ? 1.6 : acc >= 90 ? 1.3 : acc >= 80 ? 1.0 : acc >= 70 ? 0.8 : 0.6;
  var parts = ['base ' + base + ' · acc ×' + mult];
  if (bestStreak >= 25) parts.push('racha +8');
  else if (bestStreak >= 15) parts.push('racha +4');
  else if (bestStreak >= 8)  parts.push('racha +2');
  if (totalCorrect >= 20) parts.push('pares +5');
  else if (totalCorrect >= 10) parts.push('pares +3');
  else if (totalCorrect >= 5)  parts.push('pares +1');
  return parts.join(' · ');
}

function _clBuildCurrencyRow(auraGained, pm, pmPositive) {
  return '<div class="cl-go-currency">' +
    '<div class="cl-go-coin cl-go-coin-aura">' +
      '<div class="cl-go-coin-ic"><svg viewBox="0 0 24 24"><circle cx=12 cy=12 r=9></circle><path d="M12 7v10"></path><path d="M9 10c0-1.5 1.3-3 3-3s3 1.5 3 3-1.3 2.5-3 2.5-3 1-3 2.5 1.3 3 3 3 3-1.5 3-3"></path></svg></div>' +
      '<div class="cl-go-coin-meta">' +
        '<span class="cl-go-coin-lbl">puntos aura</span>' +
        '<div class="cl-go-coin-row"><span class="cl-go-coin-val">+' + auraGained + '</span></div>' +
      '</div>' +
    '</div>' +
    '<div class="cl-go-coin ' + (pmPositive ? 'cl-go-coin-merit' : 'cl-go-coin-lost') + '">' +
      '<div class="cl-go-coin-ic"><svg viewBox="0 0 24 24"><circle cx=12 cy=9 r=6></circle><path d="M8 14l-2 8 6-3 6 3-2-8"></path></svg></div>' +
      '<div class="cl-go-coin-meta">' +
        '<span class="cl-go-coin-lbl">' + (pmPositive ? 'mérito ganado' : 'mérito perdido') + '</span>' +
        '<div class="cl-go-coin-row"><span class="cl-go-coin-val">' + (pmPositive ? '+' : '') + pm + '</span></div>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function showColDefeat() {
  var ov = document.getElementById('cl-go-overlay');
  if (!ov) return;

  var acc = GAME.totalAttempts === 0 ? 0 : Math.round((GAME.totalCorrect / GAME.totalAttempts) * 100);
  var diff = GAME.difficulty || 'med';
  var bestStreak = GAME.bestStreak || 0;
  var pm = _calcColPM(acc, diff, bestStreak, GAME.totalCorrect);
  var pmPositive = pm >= 0;
  var name = _clGetName();
  var mins = Math.round((Date.now() - GAME.startTime) / 60000);
  var xpGained = GAME.xpSessionEarned || 0;
  var auraGained = Math.max(1, GAME.totalCorrect * 2);
  var diffToPass = 60 - acc;

  var ti = _CL_LOSE_TITLES[Math.floor(Math.random() * _CL_LOSE_TITLES.length)];
  var titleHtml = ti[0] + name + ti[1];

  ov.innerHTML =
    '<div class="cl-go-particles cl-go-ashes" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
    '<div class="cl-go-modal" role="dialog">' +
      '<button class="cl-go-close" onclick="clGoClose()"><svg viewBox="0 0 24 24"><line x1=6 y1=6 x2=18 y2=18></line><line x1=18 y1=6 x2=6 y2=18></line></svg></button>' +
      '<header class="cl-go-hero">' +
        '<span class="cl-go-kicker cl-go-kicker-bad">ronda fallida</span>' +
        '<h2 class="cl-go-title">' + titleHtml + '</h2>' +
        '<div class="cl-go-sub"><b>' + diff.toUpperCase() + '</b><span class="cl-go-dot"></span><span>' + GAME.totalAttempts + ' intentos</span><span class="cl-go-dot"></span><span>' + mins + ' min</span></div>' +
      '</header>' +
      '<div class="cl-go-score cl-go-score-bad">' +
        '<div class="cl-go-score-side"><span class="cl-go-s-lbl">tu récord precisión</span><span class="cl-go-s-val">' + GAME.record + ' <small>pts</small></span></div>' +
        '<div class="cl-go-score-center">' +
          '<span class="cl-go-sc-lbl cl-go-sc-lbl-bad">precisión esta ronda</span>' +
          '<span class="cl-go-sc-big cl-go-sc-big-bad">' + acc + '<span style="font-size:36px">%</span></span>' +
          (acc < 60 ? '<span class="cl-go-sc-delta cl-go-sc-delta-bad">▼ ' + diffToPass + ' pts bajo el mínimo</span>' : '') +
        '</div>' +
        '<div class="cl-go-score-side cl-go-score-right"><span class="cl-go-s-lbl">mínimo aprobado</span><span class="cl-go-s-val">60 <small>%</small></span></div>' +
      '</div>' +
      '<div class="cl-go-stats">' +
        '<div class="cl-go-stat cl-go-stat-good"><div class="cl-go-stat-head"><div class="cl-go-stat-ic"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg></div><span class="cl-go-stat-lbl">pares correctos</span></div><span class="cl-go-stat-val">' + GAME.totalCorrect + '</span><span class="cl-go-stat-sub">de <b>' + GAME.masteryDone + '</b> frases</span></div>' +
        '<div class="cl-go-stat cl-go-stat-bad"><div class="cl-go-stat-head"><div class="cl-go-stat-ic"><svg viewBox="0 0 24 24"><line x1=6 y1=6 x2=18 y2=18></line><line x1=18 y1=6 x2=6 y2=18></line></svg></div><span class="cl-go-stat-lbl">pares fallados</span></div><span class="cl-go-stat-val">' + (GAME.totalAttempts - GAME.totalCorrect) + '</span><span class="cl-go-stat-sub">repasa la <b>guía</b></span></div>' +
        '<div class="cl-go-stat cl-go-stat-acc"><div class="cl-go-stat-head"><div class="cl-go-stat-ic"><svg viewBox="0 0 24 24"><circle cx=12 cy=12 r=9></circle><circle cx=12 cy=12 r=3></circle></svg></div><span class="cl-go-stat-lbl">precisión</span></div><span class="cl-go-stat-val">' + acc + '<small style="font-size:16px;color:var(--muted)">%</small></span><span class="cl-go-stat-sub">racha máx <b>' + bestStreak + '</b></span></div>' +
      '</div>' +
      '<div class="cl-go-fail-strip">' +
        '<div class="cl-go-fail-ic"><svg viewBox="0 0 24 24"><path d="M3 12h4l3-9 4 18 3-9h4"></path></svg></div>' +
        '<div class="cl-go-fail-meta"><span class="cl-go-fail-lbl">energía agotada</span><span class="cl-go-fail-txt">Se acabaron las <b>15 vidas</b> · practica más para aguantar más errores</span></div>' +
      '</div>' +
      '<div class="cl-go-xp">' +
        '<div class="cl-go-xp-head"><span class="cl-go-xp-l"><b>XP</b> · esta sesión</span><span class="cl-go-xp-r"><b>+' + xpGained + '</b> XP ganados</span></div>' +
        '<div class="cl-go-xp-track"><div class="cl-go-xp-fill" id="clGoXpFill" style="width:0%;transition:width 1.2s cubic-bezier(.4,0,.2,1)"></div></div>' +
      '</div>' +
      _clBuildCurrencyRow(auraGained, pm, pmPositive) +
      '<div class="cl-go-actions">' +
        '<button class="cl-go-btn cl-go-btn-primary" onclick="clGoRestart()"><svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.5 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>Reintentar</button>' +
        '<button class="cl-go-btn cl-go-btn-secondary" onclick="clGoNewDiff()"><svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.5 15a9 9 0 1 1-2.13-9.36L23 10"></path></svg>Cambiar nivel</button>' +
        '<button class="cl-go-btn cl-go-btn-ghost" onclick="auraNav(\'dashboard.html\')"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>Inicio</button>' +
      '</div>' +
    '</div>';

  ov.style.display = 'flex';
  setTimeout(function() {
    var f = document.getElementById('clGoXpFill');
    if (f) f.style.width = Math.min(90, Math.round((xpGained / 150) * 100)) + '%';
  }, 400);

  // Guardar recompensas reales al usuario
  try {
    if (window.AuraXP) {
      AuraXP.addAP(auraGained);
      if (pm < 0) AuraXP.addPM(pm);
      AuraXP.logSession({ tool: 'collocations', skill: 'Vocabulary' });
    }
  } catch(e) { console.warn('[Collocations] rewards error:', e); }
}

function showColVictory() {
  var ov = document.getElementById('cl-go-overlay');
  if (!ov) return;

  var acc = GAME.totalAttempts === 0 ? 100 : Math.round((GAME.totalCorrect / GAME.totalAttempts) * 100);
  var diff = GAME.difficulty || 'med';
  var bestStreak = GAME.bestStreak || 0;
  var pm = _calcColPM(acc, diff, bestStreak, GAME.totalCorrect);
  var name = _clGetName();
  var mins = Math.round((Date.now() - GAME.startTime) / 60000);
  var xpGained = GAME.xpSessionEarned || 0;
  var auraGained = Math.max(10, Math.round(GAME.totalPoints / 3));

  ov.innerHTML =
    '<div class="cl-go-particles cl-go-confetti" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
    '<div class="cl-go-modal cl-go-modal-win" role="dialog">' +
      '<button class="cl-go-close" onclick="clGoClose()"><svg viewBox="0 0 24 24"><line x1=6 y1=6 x2=18 y2=18></line><line x1=18 y1=6 x2=6 y2=18></line></svg></button>' +
      '<header class="cl-go-hero">' +
        '<span class="cl-go-kicker cl-go-kicker-win">ronda completada</span>' +
        '<h2 class="cl-go-title">¡Suenas como <em class="cl-go-em-win">nativo</em>!</h2>' +
        '<div class="cl-go-sub"><b>' + name + '</b><span class="cl-go-dot"></span><span>' + GAME.masteryDone + ' frases</span><span class="cl-go-dot"></span><span>' + mins + ' min</span></div>' +
      '</header>' +
      '<div class="cl-go-score cl-go-score-win">' +
        '<div class="cl-go-score-side"><span class="cl-go-s-lbl">tu récord</span><span class="cl-go-s-val">' + GAME.record + ' <small>pts</small></span></div>' +
        '<div class="cl-go-score-center">' +
          '<span class="cl-go-sc-lbl cl-go-sc-lbl-win">puntos ganados</span>' +
          '<span class="cl-go-sc-big cl-go-sc-big-win">' + GAME.totalPoints + '</span>' +
          (GAME.totalPoints >= GAME.record ? '<span class="cl-go-sc-delta cl-go-sc-delta-win">▲ nuevo récord</span>' : '') +
        '</div>' +
        '<div class="cl-go-score-side cl-go-score-right"><span class="cl-go-s-lbl">precisión</span><span class="cl-go-s-val">' + acc + ' <small>%</small></span></div>' +
      '</div>' +
      '<div class="cl-go-stats">' +
        '<div class="cl-go-stat cl-go-stat-good"><div class="cl-go-stat-head"><div class="cl-go-stat-ic"><svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></div><span class="cl-go-stat-lbl">pares acertados</span></div><span class="cl-go-stat-val">' + GAME.totalCorrect + '</span><span class="cl-go-stat-sub">de <b>' + GAME.totalAttempts + '</b> intentos</span></div>' +
        '<div class="cl-go-stat" style="--c:#60a5fa"><div class="cl-go-stat-head"><div class="cl-go-stat-ic" style="background:rgba(96,165,250,.14);color:#60a5fa"><svg viewBox="0 0 24 24"><line x1=12 y1=5 x2=12 y2=19></line><line x1=5 y1=12 x2=19 y2=12></line></svg></div><span class="cl-go-stat-lbl">racha máxima</span></div><span class="cl-go-stat-val" style="color:#60a5fa">' + bestStreak + '</span><span class="cl-go-stat-sub">seguidas <b>sin error</b></span></div>' +
        '<div class="cl-go-stat cl-go-stat-acc"><div class="cl-go-stat-head"><div class="cl-go-stat-ic"><svg viewBox="0 0 24 24"><circle cx=12 cy=12 r=9></circle><circle cx=12 cy=12 r=3></circle></svg></div><span class="cl-go-stat-lbl">precisión</span></div><span class="cl-go-stat-val">' + acc + '<small style="font-size:16px;color:var(--muted)">%</small></span><span class="cl-go-stat-sub">nivel <b>' + diff.toUpperCase() + '</b></span></div>' +
      '</div>' +
      '<div class="cl-go-xp cl-go-xp-win">' +
        '<div class="cl-go-xp-head"><span class="cl-go-xp-l"><b>XP</b> · ganados esta sesión</span><span class="cl-go-xp-r cl-go-xp-r-win"><b>+' + xpGained + '</b> XP</span></div>' +
        '<div class="cl-go-xp-track"><div class="cl-go-xp-fill cl-go-xp-fill-win" id="clGoXpFill" style="width:0%;transition:width 1.2s cubic-bezier(.4,0,.2,1)"></div></div>' +
      '</div>' +
      _clBuildCurrencyRow(auraGained, pm, true) +
      '<div class="cl-go-actions">' +
        '<button class="cl-go-btn cl-go-btn-primary" onclick="clGoRestart()"><svg viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>Jugar de nuevo</button>' +
        '<button class="cl-go-btn cl-go-btn-secondary" onclick="clGoNewDiff()"><svg viewBox="0 0 24 24"><rect x=2 y=3 width=6 height=6></rect><rect x=16 y=3 width=6 height=6></rect><rect x=2 y=15 width=6 height=6></rect><rect x=16 y=15 width=6 height=6></rect></svg>Cambiar nivel</button>' +
        '<button class="cl-go-btn cl-go-btn-ghost" onclick="auraNav(\'dashboard.html\')"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>Inicio</button>' +
      '</div>' +
    '</div>';

  ov.style.display = 'flex';
  setTimeout(function() {
    var f = document.getElementById('clGoXpFill');
    if (f) f.style.width = Math.min(90, Math.round((xpGained / 200) * 100)) + '%';
  }, 400);

  // Guardar recompensas reales al usuario
  try {
    if (window.AuraXP) {
      AuraXP.addAP(auraGained);
      if (pm > 0) AuraXP.addPM(pm);
      AuraXP.logSession({ tool: 'collocations', skill: 'Vocabulary' });
    }
  } catch(e) { console.warn('[Collocations] rewards error:', e); }
}

function clGoClose() {
  var ov = document.getElementById('cl-go-overlay');
  if (ov) ov.style.display = 'none';
}

function clGoRestart() {
  GAME.energy = 15;
  GAME.streak = 0;
  GAME.combo = 1;
  GAME.totalAttempts = 0;
  GAME.totalCorrect = 0;
  GAME.totalPoints = 0;
  GAME.roundPoints = 0;
  GAME.record = 0;
  GAME.masteryDone = 0;
  GAME.xpSessionEarned = 0;
  GAME.bestStreak = 0;
  GAME.startTime = Date.now();
  GAME.filledSlots = {};
  GAME.usedChips = new Set();
  GAME.completedRound = false;
  GAME.orderPos = 0;
  clGoClose();
  generateOrder();
  renderPhrase();
  updateTiles();
  updateTopbar();
}

function clGoNewDiff() {
  clGoClose();
  var overlay = document.getElementById('col-diff-overlay');
  if (overlay) overlay.style.display = 'flex';
}

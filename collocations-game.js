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
  if (GAME.usedChips.has(chipBtn)) return;

  GAME.totalAttempts++;
  var expected  = p.en[slotIdx];
  var isCorrect = (word === expected);
  var slot      = document.querySelectorAll('#slots .slot')[slotIdx];

  if (isCorrect) {
    GAME.totalCorrect++;
    GAME.streak++;
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
    GAME.usedChips.add(chipBtn);
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
        if (window._aura && window._aura.saveScore) window._aura.saveScore(xpGanado);
      } catch(e) { console.warn('[Aura] saveScore error:', e); }
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

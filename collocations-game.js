// ── Renderiza la frase actual ──────────────────────────────────────────────
function renderPhrase() {
  var p = PHRASES[currentPhraseIdx()];
  GAME.filledSlots = {};
  GAME.usedChips = new Set();
  GAME.completedRound = false;

  // Header arena
  setText('arenaTag', 'ronda ' + String(GAME.orderPos + 1).padStart(2,'0') + ' · ' + p.cat);
  setText('arenaIdx', '#' + String(GAME.orderPos + 1).padStart(2,'0'));
  setText('arenaHoles', p.en.length + ' huecos');

  // Prompt
  setText('promptEs', p.es);
  $('promptHint').innerHTML = 'pista · ' + p.hint;

  // Slots
  var slotsEl = $('slots');
  slotsEl.innerHTML = '';
  p.en.forEach(function(w, i) {
    var s = document.createElement('div');
    s.className = 'slot empty' + (i === 0 ? ' active' : '');
    s.dataset.i = String(i + 1).padStart(2, '0');
    s.dataset.idx = i;
    s.addEventListener('click', function() {
      // Click en slot lleno → vaciarlo
      if (GAME.filledSlots[i]) {
        var word = GAME.filledSlots[i];
        delete GAME.filledSlots[i];
        GAME.usedChips.delete(word);
        s.classList.remove('filled');
        s.classList.add('empty');
        s.textContent = '';
        s.style.background = '';
        s.style.borderColor = '';
        s.style.color = '';
        // Reactivar la ficha
        document.querySelectorAll('.chip').forEach(function(c) {
          if (c.dataset.w === word) {
            c.style.opacity = '';
            c.style.pointerEvents = '';
          }
        });
        updateNextButton();
      }
    });
    slotsEl.appendChild(s);
  });

  // Botón Siguiente
  var nextBtn = document.createElement('button');
  nextBtn.className = 'btn-next';
  nextBtn.id = 'next';
  nextBtn.disabled = true;
  nextBtn.innerHTML = 'Siguiente <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>';
  nextBtn.addEventListener('click', nextPhrase);
  slotsEl.appendChild(nextBtn);

  // Banco de chips
  var allWords = shuffle(p.en.concat(p.traps));
  var chipsEl = $('chips');
  chipsEl.innerHTML = '';
  allWords.forEach(function(w) {
    var b = document.createElement('button');
    b.className = 'chip';
    b.dataset.w = w;
    b.textContent = w;
    b.addEventListener('click', function() { onChipClick(b, w); });
    chipsEl.appendChild(b);
  });

  setText('bankCount', allWords.length + ' palabras');
  setText('bankCorrect', p.en.length);
  setText('bankTrick', 'cuidado · ' + p.traps.length + ' trampas');

  // Mastery category
  setText('masteryCat', p.cat);
  // Tip reset
  $('tipText').innerHTML = 'Selecciona las palabras correctas del banco para completar la frase.';

  // ⚠ NO reseteamos los puntos de la partida — acumulan durante toda la sesión
  updateTopbar();
}

// ── Próxima palabra esperada ───────────────────────────────────────────────
function nextEmptySlotIdx() {
  var p = PHRASES[currentPhraseIdx()];
  for (var i = 0; i < p.en.length; i++) {
    if (!GAME.filledSlots[i]) return i;
  }
  return -1;
}

function setActiveSlot() {
  var p = PHRASES[currentPhraseIdx()];
  var nextI = nextEmptySlotIdx();
  document.querySelectorAll('#slots .slot').forEach(function(s, i) {
    if (i === nextI) s.classList.add('active');
    else s.classList.remove('active');
  });
}

// ── Click en una ficha del banco ───────────────────────────────────────────
function onChipClick(chipBtn, word) {
  if (GAME.completedRound) return;
  var p = PHRASES[currentPhraseIdx()];
  var slotIdx = nextEmptySlotIdx();
  if (slotIdx === -1) return;

  // Si la chip ya fue usada correctamente en otro slot, no se puede volver a usar
  if (GAME.usedChips.has(chipBtn)) return;

  GAME.totalAttempts++;
  var expected = p.en[slotIdx];
  var isCorrect = word === expected; // estricta (mayúsculas/minúsculas importan)

  var slot = document.querySelectorAll('#slots .slot')[slotIdx];

  if (isCorrect) {
    GAME.totalCorrect++;
    GAME.streak++;
    GAME.combo = Math.min(5, 1 + Math.floor(GAME.streak / 3));
    // ── PUNTOS DEL JUEGO: SIEMPRE +10 por acierto (sin combo) ──
    // ── XP: cada 100 puntos de la partida = +10 XP ──
    var earned = 10;
    var prevMilestone = Math.floor(GAME.roundPoints / 100);
    GAME.roundPoints += earned;
    GAME.totalPoints += earned;
    GAME.record = Math.max(GAME.record, GAME.roundPoints);

    // Pintar slot verde con la palabra
    slot.textContent = word;
    slot.classList.remove('empty', 'active');
    slot.classList.add('filled');
    slot.style.background = 'var(--good)';
    slot.style.borderColor = 'var(--good)';
    slot.style.color = 'rgb(12,12,12)';

    GAME.filledSlots[slotIdx] = word;
    GAME.usedChips.add(chipBtn);

    // Marcar la chip como usada (verde + sin pointer)
    chipBtn.style.opacity = '0.35';
    chipBtn.style.pointerEvents = 'none';
    chipBtn.style.borderColor = 'var(--good)';
    chipBtn.style.color = 'var(--good)';
    chipBtn.style.background = 'rgba(124,255,180,0.06)';

    // ── XP: cada vez que los puntos de la partida crucen un múltiplo de 100 = +10 XP ──
    var newMilestone = Math.floor(GAME.roundPoints / 100);
    if (newMilestone > prevMilestone) {
      var xpGanado = (newMilestone - prevMilestone) * 10;
      GAME.xpSessionEarned += xpGanado;
      console.log('[Aura] 🎉 +' + xpGanado + ' XP cargados a la barra. Partida:', GAME.roundPoints, '| Sesión total XP:', GAME.xpSessionEarned);
      try {
        if (window._aura && window._aura.saveScore) {
          window._aura.saveScore(xpGanado); // persiste en Supabase (async, no bloquea)
        }
      } catch(e) { console.warn('[Aura] saveScore error:', e); }
      renderXpBar(); // redibuja barra con baseline + xpSessionEarned
      showXpToast();
    }

    // Limpiar cualquier estado rojo de las demás chips equivocadas para este slot
    document.querySelectorAll('.chip.is-wrong').forEach(function(c) {
      c.classList.remove('is-wrong');
      c.style.background = '';
      c.style.borderColor = '';
      c.style.color = '';
    });

    setActiveSlot();
    checkRoundComplete();
  } else {
    // Palabra incorrecta → SOLO se pinta roja, sigue clickable
    GAME.streak = 0;
    GAME.combo = 1;
    GAME.energy = Math.max(0, GAME.energy - 1);

    chipBtn.classList.add('is-wrong');
    chipBtn.style.background = 'var(--bad-bg)';
    chipBtn.style.borderColor = 'var(--bad)';
    chipBtn.style.color = 'var(--bad)';

    // Shake animation
    chipBtn.animate(
      [{transform:'translateX(0)'},{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'translateX(0)'}],
      {duration: 280}
    );
    // ⚠ NO se inhabilita — el usuario puede seguir intentando
  }

  updateTiles();
  updateTopbar();
}

function checkRoundComplete() {
  var p = PHRASES[currentPhraseIdx()];
  var allFilled = p.en.every(function(_, i) { return GAME.filledSlots[i]; });
  if (allFilled) {
    GAME.completedRound = true;
    GAME.masteryDone++;
    var nextBtn = $('next');
    if (nextBtn) nextBtn.disabled = false;

    // Mostrar explicación
    $('tipText').innerHTML = p.explanation;

    // Actualiza mastery
    var pct = Math.min(100, Math.round((GAME.masteryDone / 12) * 100));
    setText('masterySub', GAME.masteryDone + ' / 12');
    setText('masteryPct', pct);
    var bar = $('masteryBar');
    if (bar) bar.style.width = pct + '%';
  }
}

// ── Siguiente frase ────────────────────────────────────────────────────────
function nextPhrase() {
  GAME.orderPos++;
  if (GAME.orderPos >= GAME.order.length) {
    // se acabó la lista → re-barajar para nueva tanda
    generateOrder();
  }
  renderPhrase();
}


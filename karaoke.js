// ── KARAOKE SYSTEM — play-movies ────────────────────────────────────────────
// Depends on globals: player, karaoState, errorCount, totalScore, combo,
//                     currentVideoId, isPlaying, updatePPIcon, _triggerGameOver, _triggerWin

// ── KARAOKE SYSTEM ────────────────────────────────────────────────────────

function loadAndInitKaraoke(videoId) {
  var d = MOVIES[videoId];
  if (!d || !d.hasKaraoke || !d.dataUrl) { buildPhrase(); return; }
  // Served from cache
  if (SCENE_DATA_CACHE[videoId]) { initKaraoFromData(videoId, SCENE_DATA_CACHE[videoId]); return; }
  // Loading state
  var row = document.getElementById('phraseRow');
  if (row) row.innerHTML = '<span style="color:rgba(255,255,255,.3);font-size:.85rem;letter-spacing:.06em;">cargando escena&hellip;</span>';
  fetch(d.dataUrl)
    .then(function(r){ return r.json(); })
    .then(function(data){
      SCENE_DATA_CACHE[videoId] = data;
      initKaraoFromData(videoId, data);
    })
    .catch(function(){ buildPhrase(); });
}

function initKaraoFromData(videoId, data) {
  karaoState.enabled = true;
  karaoState.lines = data.lyrics || [];
  karaoState.gaps  = data.gaps  || [];
  karaoState.currentIdx = -1;
  karaoState.challengeActive = false;
  karaoState.inGap = false;
  karaoState.completedLines = {};
  var row = document.getElementById('phraseRow');
  if (row) row.innerHTML = '<span style="color:rgba(255,255,255,.35);font-size:.9rem;letter-spacing:.05em;">♪ &nbsp; esperando diálogo &nbsp; ♪</span>';
  document.getElementById('blankCount').textContent = '';
  document.getElementById('speakerName').textContent = '';
  var prog = document.getElementById('glassProg');
  if (prog) {
    prog.innerHTML = '';
    var total = Math.min(karaoState.lines.length, 16);
    for (var p = 0; p < total; p++) {
      var sp = document.createElement('span'); prog.appendChild(sp);
    }
  }
}

function updateKaraoke(t) {
  if (!karaoState.enabled) return;
  var lines = karaoState.lines;
  var gaps  = karaoState.gaps;

  // ── Check music gap (pre-defined + between lines)
  var inGap = false, skipNextT = null;
  var skipBtn = document.getElementById('skipGapBtn');

  // 1) Pre-defined gaps del JSON
  for (var g = 0; g < gaps.length; g++) {
    if (t >= gaps[g].start && t < gaps[g].end) {
      inGap = true;
      skipNextT = gaps[g].nextT;
      break;
    }
  }

  // 2) Silencios dinámicos entre líneas (umbral: >2s entre fin de línea y siguiente)
  if (!inGap && !karaoState.challengeActive && lines.length > 0) {
    var MIN_GAP = 2.0; // segundos mínimos para considerar silencio
    for (var li = 0; li < lines.length - 1; li++) {
      var lineEnd  = lines[li].end  || lines[li].t + 2;
      var nextStart = lines[li + 1].t;
      if (nextStart - lineEnd >= MIN_GAP && t >= lineEnd && t < nextStart) {
        inGap = true;
        skipNextT = nextStart;
        break;
      }
    }
    // También detectar silencio antes de la primera línea si no hay gap definido
    if (!inGap && lines[0] && t < lines[0].t && lines[0].t - t >= MIN_GAP) {
      var yaDefinido = gaps.some(function(g){ return t >= g.start && t < g.end; });
      if (!yaDefinido) {
        inGap = true;
        skipNextT = lines[0].t;
      }
    }
  }

  // Mostrar/ocultar botón
  if (inGap && !adOverlayActive && skipBtn) {
    if (!karaoState.inGap) {
      skipBtn._nextT = skipNextT;
      skipBtn.style.display = 'flex';
    }
  }
  if (!inGap && karaoState.inGap && skipBtn) {
    skipBtn.style.display = 'none';
  }

  if (inGap && !karaoState.challengeActive) {
    var row = document.getElementById('phraseRow');
    if (row && !karaoState.inGap) {
      row.innerHTML = '<span style="color:rgba(255,255,255,.3);font-size:.9rem;">♪ &nbsp; ♪ &nbsp; ♪</span>';
    }
  }
  karaoState.inGap = inGap;

  // ── If challenge active, don't advance lines
  if (karaoState.challengeActive) return;

  // ── Find current line
  var newIdx = -1;
  for (var i = lines.length - 1; i >= 0; i--) {
    if (t >= lines[i].t) { newIdx = i; break; }
  }
  if (newIdx !== karaoState.currentIdx && newIdx >= 0) {
    karaoState.currentIdx = newIdx;
    showKaraoLine(newIdx);
    // Update progress dots
    var dots = document.querySelectorAll('#glassProg span');
    dots.forEach(function(d, di) {
      d.className = di < newIdx ? 'done' : (di === newIdx ? 'now' : '');
    });
  }
}

function getKaraoSpeaker(idx) {
  var line = karaoState.lines[idx];
  if (!line) return '';
  // Use speaker from the line data, or fall back to movie-level speaker
  if (line.speaker) return line.speaker;
  var d = MOVIES[currentVideoId];
  return (d && d.speaker) ? d.speaker : '';
}

function showKaraoLine(idx) {
  var line = karaoState.lines[idx];
  var text = line.text;
  var words = text.split(' ');

  // Update speaker
  document.getElementById('speakerName').textContent = getKaraoSpeaker(idx);

  // Next line time (loop end for challenge)
  var nextT = (idx + 1 < karaoState.lines.length) ? karaoState.lines[idx + 1].t : currentEnd;

  // Challenge: lines with 5+ words that aren't completed
  var isChallenge = words.length >= 1 && !karaoState.completedLines[idx];
  if (isChallenge) {
    karaoState.challengeActive = true;
    karaoState.lineLoopStart = Math.max(currentStart, line.t - 3);
    karaoState.lineLoopEnd   = nextT + 1.5;
    buildKaraChallenge(text, idx);
  } else {
    // Just display text
    var row = document.getElementById('phraseRow');
    row.innerHTML = words.map(function(w) {
      return '<span class="w">' + w + '&nbsp;</span>';
    }).join('');
    document.getElementById('blankCount').textContent = '';
  }
}

function buildKaraChallenge(text, lineIdx) {
  var words = text.split(' ');
  var diff = (window.karaoState && karaoState.difficulty) || 'medio';
  var diffMult = {facil:1, medio:1.5, dificil:2, legendario:3}[diff] || 1;
  var minBlanks = diff==='facil'?1 : diff==='medio'?2 : diff==='dificil'?3 : words.length;
  var maxBlanks = diff==='facil'?2 : diff==='medio'?4 : diff==='dificil'?5 : words.length;

  var eligible = [];
  var blankIdx;
  if (diff === 'legendario') {
    // All words with at least 1 letter
    for (var i = 0; i < words.length; i++) {
      if (words[i].replace(/[^a-zA-Z]/g,'').length >= 1) eligible.push(i);
    }
    blankIdx = eligible.slice();
  } else {
    // Primary: 3+ letter words (skip first/last for long lines)
    var rangeStart = words.length > 4 ? 1 : 0;
    var rangeEnd   = words.length > 4 ? words.length - 1 : words.length;
    for (var i = rangeStart; i < rangeEnd; i++) {
      if (words[i].replace(/[^a-zA-Z]/g,'').length >= 3) eligible.push(i);
    }
    // Fallback: 2+ letter words
    if (eligible.length < minBlanks) {
      for (var i = 0; i < words.length; i++) {
        if (eligible.indexOf(i) < 0 && words[i].replace(/[^a-zA-Z]/g,'').length >= 2) eligible.push(i);
      }
    }
    // Last resort: any word that has at least 1 letter (NEVER blank pure punctuation)
    if (eligible.length === 0) {
      for (var i = 0; i < words.length; i++) {
        if (words[i].replace(/[^a-zA-Z]/g,'').length >= 1) eligible.push(i);
      }
    }
    eligible.sort(function() { return Math.random() - 0.5; });
    var numBlanks = Math.min(eligible.length, Math.max(minBlanks, Math.min(maxBlanks, eligible.length)));
    blankIdx = eligible.slice(0, numBlanks).sort(function(a,b){ return a-b; });
  }

  // Safety guard: if no blankable words (e.g. line is all punctuation), show as plain text
  if (blankIdx.length === 0) {
    karaoState.challengeActive = false;
    var _row = document.getElementById('phraseRow');
    if (_row) _row.innerHTML = words.map(function(w){ return '<span class="w">'+w+'&nbsp;</span>'; }).join('');
    document.getElementById('blankCount').textContent = '';
    return;
  }

  karaoState.blanksNeeded   = blankIdx.length;
  karaoState.blanksFilled   = 0;
  karaoState.challengeLineIdx = lineIdx;

  // Correct words
  var correctWords = blankIdx.map(function(i) {
    return words[i].replace(/[^a-zA-Z]/g,'').toUpperCase();
  });

  // Build option pool — use movie-specific pool if available, else generic fallback
  var _moviePool = (window.MOVIES && window.currentVideoId &&
                    MOVIES[currentVideoId] && MOVIES[currentVideoId].wordPool &&
                    MOVIES[currentVideoId].wordPool.length >= 10)
                 ? MOVIES[currentVideoId].wordPool
                 : ['SUPERHERO','ILLEGAL','PERIMETER','FORGET','MISSION','SPECIAL','DANGER',
                    'FAMILY','SECRET','STRANGE','TRAINING','NORMAL','POWER','TOGETHER',
                    'PROBLEM','REMEMBER','CONTROL','BELIEVE','PROTECT','FREEDOM','CHOICE',
                    'SILENCE','WEAPON','EXPLAIN','PROMISE','JUSTICE','REASON','SURVIVE'];
  var opts;
  if (diff === 'legendario') {
    // All words of the line shuffled — user reconstructs the sentence
    // Add 3 random distractors from pool so not all options are correct
    var _legWords = words.map(function(w){ return w.replace(/[^a-zA-Z']/g,'').toUpperCase(); })
                        .filter(function(w){ return w.length >= 1; });
    var _legPool = _moviePool.map(function(w){ return w.toUpperCase(); })
                             .filter(function(w){ return _legWords.indexOf(w) < 0; });
    _legPool.sort(function(){ return Math.random()-.5; });
    opts = _legWords.concat(_legPool.slice(0, 3));
    opts.sort(function(){ return Math.random()-.5; });
  } else {
    // Always add minimum 4 distractors so bank isn't just the answers
    opts = correctWords.slice();
    var _distPool = _moviePool.map(function(w){ return w.toUpperCase(); })
                              .filter(function(d){ return opts.indexOf(d) < 0; });
    _distPool.sort(function(){ return Math.random()-.5; });
    var _minTotal = Math.max(opts.length + 4, 8);
    while (opts.length < _minTotal && _distPool.length > 0) opts.push(_distPool.pop());
    opts.sort(function(){ return Math.random()-.5; });
  }

  // Word bank
  var list = document.getElementById('bankList');
  if (list) {
    list.innerHTML = '';
    opts.forEach(function(w) {
      var btn = document.createElement('button');
      btn.className = 'chall-opt';
      btn.textContent = w;
      btn.addEventListener('click', (function(_w){ return function(){ selectKaraOpt(btn, _w); }; })(w));
      list.appendChild(btn);
    });
  }
  document.getElementById('bankPts').textContent = '+' + Math.round(blankIdx.length * 10 * diffMult) + ' pts';
  document.getElementById('blankCount').textContent = blankIdx.length + (blankIdx.length === 1 ? ' palabra' : ' palabras');

  // Build phrase row
  var row = document.getElementById('phraseRow');
  row.innerHTML = '';
  words.forEach(function(word, i) {
    if (blankIdx.indexOf(i) >= 0) {
      var clean = word.replace(/[^a-zA-Z']/g,'');
      var punct = word.slice(clean.length);
      var bubble = document.createElement('span');
      bubble.className = 'blank-bubble';
      bubble.dataset.answer = clean;
      bubble.dataset.idx = i;
      var wrap = document.createElement('span');
      wrap.style.cssText = 'display:inline;white-space:nowrap';
      wrap.appendChild(bubble);
      if (punct) { var s=document.createElement('span'); s.className='w'; s.textContent=punct+' '; wrap.appendChild(s); }
      row.appendChild(wrap);
    } else {
      var s = document.createElement('span');
      s.className = 'w';
      s.textContent = word + ' ';
      row.appendChild(s);
    }
  });
}

function selectKaraOpt(el, word) {
  if (el.classList.contains('correct')) return;
  var wordUp = word.replace(/[^a-zA-Z]/g,'').toUpperCase();
  // Find target bubble: not yet correct; prefer matching answer
  var allBubbles = document.querySelectorAll('.blank-bubble:not(.correct)');
  var target = null;
  allBubbles.forEach(function(b) {
    if (!target && b.dataset.answer.replace(/[^a-zA-Z]/g,'').toUpperCase() === wordUp) target = b;
  });
  if (!target) {
    allBubbles.forEach(function(b) { if (!target && !b.classList.contains('filled') && !b.classList.contains('wrong')) target = b; });
    if (!target && allBubbles.length) target = allBubbles[0];
  }
  if (!target) return;
  // If replacing a previously wrong/filled bubble, restore its old button
  if ((target.classList.contains('wrong') || target.classList.contains('filled')) && target._btn && target._btn !== el) {
    target._btn.classList.remove('wrong','correct');
    target._btn.disabled = false;
  }
  target.classList.remove('wrong','filled');
  target.textContent = word;
  target.classList.add('filled');
  target._btn = el;
  el.disabled = true;
  checkKaraAnswers();
}

function checkKaraAnswers() {
  var bubbles = document.querySelectorAll('.blank-bubble');
  var gained = 0;
  bubbles.forEach(function(b) {
    if (b.classList.contains('correct') || b.classList.contains('wrong')) return;
    if (!b.classList.contains('filled')) return;
    var ans = b.dataset.answer.toLowerCase().trim();
    var val = b.textContent.replace(/[^a-zA-Z']/g,'').toLowerCase().trim();
    if (val === ans || levenshtein(val, ans) <= Math.max(1, Math.floor(ans.length * 0.3))) {
      b.classList.remove('filled'); b.classList.add('correct');
      if (b._btn) { b._btn.classList.remove('wrong'); b._btn.classList.add('correct'); b._btn.disabled = true; }
      var _dm={facil:1,medio:1.5,dificil:2,legendario:3}[(window.karaoState&&karaoState.difficulty)||'medio']||1;
      gained += Math.round(10*_dm);
      karaoState.blanksFilled++;
    } else {
      b.classList.remove('filled'); b.classList.add('wrong');
      if (b._btn) { b._btn.classList.remove('correct'); b._btn.classList.add('wrong'); b._btn.disabled = false; }
      errorCount++;
      var errEl = document.getElementById('statErrors');
      if (errEl) errEl.textContent = errorCount;
      if (errorCount >= 15) { setTimeout(_triggerGameOver, 300); return; }
    }
  });
  totalScore += gained;
  if (gained > 0) {
    document.getElementById('statGamePts').textContent = totalScore;
    if (window.AuraXP) {
      AuraXP.addXP(Math.floor(gained / 10));
      AuraXP.addPM(Math.floor(gained / 20));
      AuraXP.addAP(Math.floor(gained / 50));
    }
    showPopup('+' + gained + ' aura 🎯');
    var _recKEl = document.getElementById('statRecord');
    if (_recKEl && totalScore > parseInt(_recKEl.textContent || '0')) {
      _recKEl.textContent = totalScore;
      try { localStorage.setItem('aura_rec_' + (currentVideoId||''), totalScore); } catch(e) {}
    }
  }
  if (karaoState.blanksFilled >= karaoState.blanksNeeded) {
    karaoState.challengeActive = false;
    karaoState.completedLines[karaoState.challengeLineIdx] = true;
    if (!isPlaying && player) { player.playVideo(); isPlaying = true; updatePPIcon(); }
    var _cl=karaoState.lines.filter(function(l){return l.text&&l.text.split(' ').length>=1;});
    if(_cl.length>0&&Object.keys(karaoState.completedLines).length>=_cl.length){setTimeout(_triggerWin,1200);}
  }
}

// getKaraoSpeaker (duplicate removed — see definition above)

function skipGap() {
  var btn = document.getElementById('skipGapBtn');
  var nextT = btn ? btn._nextT : null;
  if (nextT !== null && nextT !== undefined && player && typeof player.seekTo === 'function') {
    player.seekTo(nextT);
    if (!isPlaying) { player.playVideo(); isPlaying = true; updatePPIcon(); }
    btn.style.display = 'none';
  }
}

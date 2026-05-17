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
  var isChallenge = (words.length >= 5) && !karaoState.completedLines[idx];
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
  var numBlanks = words.length >= 10 ? 3 : words.length >= 7 ? 2 : 1;

  // Pick eligible word indices (length ≥ 3 letters, not first/last for long phrases)
  var eligible = [];
  var rangeStart = words.length > 4 ? 1 : 0;
  var rangeEnd   = words.length > 4 ? words.length - 1 : words.length;
  for (var i = rangeStart; i < rangeEnd; i++) {
    if (words[i].replace(/[^a-zA-Z]/g,'').length >= 3) eligible.push(i);
  }
  if (eligible.length < numBlanks) {
    for (var i = 0; i < words.length; i++) {
      if (!eligible.includes(i) && words[i].replace(/[^a-zA-Z]/g,'').length >= 3) eligible.push(i);
    }
  }
  eligible.sort(function() { return Math.random() - 0.5; });
  var blankIdx = eligible.slice(0, numBlanks).sort(function(a,b){ return a-b; });

  karaoState.blanksNeeded   = blankIdx.length;
  karaoState.blanksFilled   = 0;
  karaoState.challengeLineIdx = lineIdx;

  // Correct words
  var correctWords = blankIdx.map(function(i) {
    return words[i].replace(/[^a-zA-Z]/g,'').toUpperCase();
  });

  // Build option pool: correct + random distractors
  var pool = ['SUPERHERO','ILLEGAL','PERIMETER','FORGET','MISSION','SPECIAL','DANGER',
              'FAMILY','SECRET','STRANGE','TRAINING','NORMAL','POWER','TOGETHER','PROBLEM'];
  var opts = correctWords.slice();
  var shuffled = pool.filter(function(d){ return opts.indexOf(d) < 0; });
  shuffled.sort(function(){ return Math.random()-.5; });
  while (opts.length < 6 && shuffled.length > 0) opts.push(shuffled.pop());
  opts.sort(function(){ return Math.random()-.5; });

  // Word bank
  var list = document.getElementById('bankList');
  if (list) list.innerHTML = opts.map(function(w) {
    return '<button class="chall-opt" onclick="selectKaraOpt(this,\'' + w + '\')">' + w + '</button>';
  }).join('');
  document.getElementById('bankPts').textContent = '+' + (blankIdx.length * 10) + ' aura';
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
      gained += 10;
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
    var _cl=karaoState.lines.filter(function(l){return l.text&&l.text.split(' ').length>=5;});
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

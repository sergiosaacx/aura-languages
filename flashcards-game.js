// ── ADVANCE AFTER SWIPE ─────────────────────────────────────────────────────
function advance(dir){
  var c = CARDS[cardIdx];
  var isCorrect = (dir === c.correctSide);
  totalAnswered++;
  var pts = 0;

  if(isCorrect){
    totalCorrect++;
    combo++;
    if(combo > bestCombo) bestCombo = combo;
    pts = PTS_CORRECT + (combo >= 5 ? combo : 0); // bonus at ×5+
    sessionPts += pts;
    // combo flash
    if(combo >= 5){
      var comboEl = document.querySelector('.combo');
      if(comboEl){ comboEl.style.background='rgba(196,255,61,.12)'; setTimeout(function(){ comboEl.style.background=''; },600); }
    }
    // Global XP
    if(window.AuraXP && pts > 0) AuraXP.addXP(pts).catch(function(){});
  } else {
    combo = 0;
    totalErrors++;
    // Flash deck red on error
    var deckEl = document.getElementById('deck');
    if(deckEl){ deckEl.style.background='rgba(239,68,68,.1)'; setTimeout(function(){ deckEl.style.background=''; },400); }
    if(totalErrors >= MAX_ERRORS){
      addToRecent(c, false, 0);
      updatePanels();
      showGameOver();
      return;
    }
  }

  addToRecent(c, isCorrect, pts);
  cardIdx++;

  // ── Mazo infinito: reshuffle cuando se agota ──
  if(cardIdx >= CARDS.length){
    var pool = getCardsByType(_activeType).filter(function(x){ return x.difficulty === FC_GAME.difficulty; });
    if(!pool.length) pool = getCardsByType(_activeType);
    CARDS    = buildRandomDeck(pool);
    cardIdx  = 0;
  }

  buildDeck();
}

// ── RECENT LIST ─────────────────────────────────────────────────────────────
function addToRecent(c, ok, pts){
  var list = document.getElementById('recentList');
  if(!list) return;
  var placeholder = list.querySelector('.rec-placeholder');
  if(placeholder) placeholder.remove();

  var item = document.createElement('div');
  item.className = 'rec-item';
  item.style.cssText = 'opacity:0;transform:translateY(-8px);transition:all .3s';
  item.innerHTML =
    '<div class="rec-status '+(ok?'ok':'no')+'">'+(ok?'✓':'✕')+'</div>' +
    '<div class=rec-meta><b>'+c.word+'</b><span>'+c.defShort+'</span></div>' +
    '<span class="rec-pts'+(ok?'':' no')+'">'+(ok?'+'+pts+' pts':'repasar')+'</span>';
  list.insertBefore(item, list.firstChild);
  requestAnimationFrame(function(){ item.style.opacity='1'; item.style.transform='translateY(0)'; });
}

// ── DRAG / SWIPE ─────────────────────────────────────────────────────────────
function initDrag(el){
  var startX, startY, curX, curY, dragging = false;
  function getPoint(e){ return e.touches ? e.touches[0] : e; }

  function onStart(e){
    e.preventDefault();
    dragging = true; curX = undefined;
    var pt = getPoint(e); startX = pt.clientX; startY = pt.clientY;
    el.style.transition = 'none';
  }
  function onMove(e){
    if(!dragging) return;
    e.preventDefault();
    var pt = getPoint(e);
    curX = pt.clientX - startX; curY = pt.clientY - startY;
    var rot = curX * 0.08;
    el.style.transform = 'translate('+curX+'px,'+curY+'px) rotate('+rot+'deg)';
    var ratio = Math.min(Math.abs(curX) / 80, 1);
    var lblT = el.querySelector('.swipe-label.true');
    var lblF = el.querySelector('.swipe-label.false');
    if(curX > 0){ if(lblT) lblT.style.opacity=ratio; if(lblF) lblF.style.opacity=0; }
    else         { if(lblF) lblF.style.opacity=ratio; if(lblT) lblT.style.opacity=0; }
  }
  function onEnd(){
    if(!dragging) return;
    dragging = false; el.style.transition = '';
    if(curX === undefined) return;
    if(Math.abs(curX) > 90){
      flyOut(el, curX > 0 ? 'right' : 'left', function(){ advance(curX > 0 ? 'right' : 'left'); });
    } else {
      el.style.transform = '';
      ['swipe-label true','swipe-label false'].forEach(function(cls){
        var e2 = el.querySelector('.'+cls.split(' ').join('.'));
        if(e2) e2.style.opacity = 0;
      });
      curX = undefined;
    }
  }
  el.addEventListener('mousedown', onStart);
  el.addEventListener('touchstart', onStart, {passive:false});
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, {passive:false});
  window.addEventListener('mouseup', onEnd);
  window.addEventListener('touchend', onEnd);
}

function flyOut(el, dir, cb){
  var tx = dir === 'right' ? window.innerWidth+200 : -window.innerWidth-200;
  el.style.transition = 'transform .4s cubic-bezier(.5,0,.7,.4), opacity .4s';
  el.style.transform  = 'translate('+tx+'px,'+(dir==='right'?-80:80)+'px) rotate('+(dir==='right'?30:-30)+'deg)';
  el.style.opacity    = '0';
  setTimeout(cb, 400);
}

function answerOpt(side){ doSwipe(side); }

function doSwipe(dir){
  var top = document.getElementById('topCard'); if(!top) return;
  flyOut(top, dir, function(){ advance(dir); });
}

// ── GAME OVER (10 errores) ───────────────────────────────────────────────────
function showGameOver(){
  var acc = totalAnswered > 0 ? Math.round(totalCorrect / totalAnswered * 100) : 0;
  var deck = document.getElementById('deck');
  if(!deck) return;
  deck.innerHTML =
    '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:14px;text-align:center;padding:24px;">' +
    '<div style="font-size:2.8rem;">💀</div>' +
    '<div style="font-size:1.15rem;font-weight:800;color:var(--ink);">10 errores · ¡juego terminado!</div>' +
    '<div style="font-size:.88rem;color:var(--ink-2);line-height:1.6;">' +
      totalCorrect + ' correctas · '+sessionPts+' aura ganados<br>mejor combo ×'+bestCombo+' · '+acc+'% precisión' +
    '</div>' +
    '<button onclick="restartDeck()" style="margin-top:10px;background:var(--accent);color:var(--accent-ink);border:none;padding:12px 28px;border-radius:999px;font-weight:700;font-size:.9rem;cursor:pointer;">Jugar de nuevo</button>' +
    '</div>';
  // Log session en AuraXP
  if(window.AuraXP && sessionPts > 0){
    AuraXP.logSession({
      tool:'flashcards', skill:'Vocabulary',
      xp: sessionPts,
      pm: Math.floor(sessionPts / 5),
      ap: Math.floor(sessionPts / 10),
      accuracy: acc
    }).catch(function(){});
  }
  if(window._aura && sessionPts > 0) try{ _aura.saveScore(sessionPts); }catch(e){}
}

function restartDeck(){
  var pool = getCardsByType(_activeType).filter(function(c){ return c.difficulty === FC_GAME.difficulty; });
  if(!pool.length) pool = getCardsByType(_activeType);
  CARDS         = buildRandomDeck(pool);
  cardIdx       = 0;
  sessionPts    = 0;
  combo         = 0;
  bestCombo     = 0;
  totalAnswered = 0;
  totalCorrect  = 0;
  totalErrors   = 0;
  buildDeck();
}

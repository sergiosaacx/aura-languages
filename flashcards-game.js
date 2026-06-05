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
    pts = PTS_CORRECT + (combo >= 5 ? combo : 0);
    sessionPts += pts;
    if(combo >= 5){
      var comboEl = document.querySelector('.combo');
      if(comboEl){ comboEl.style.background='rgba(196,255,61,.12)'; setTimeout(function(){ comboEl.style.background=''; },600); }
    }
    if(window.AuraXP && pts > 0) AuraXP.addXP(pts).catch(function(){});
  } else {
    combo = 0;
    totalErrors++;
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

  if(cardIdx >= CARDS.length){
    var pool = getCardsByType(_activeType).filter(function(x){ return x.difficulty === FC_GAME.difficulty; });
    if(!pool.length) pool = getCardsByType(_activeType);
    if(!pool.length) pool = ALL_SLANGS.slice();
    CARDS   = buildRandomDeck(pool);
    cardIdx = 0;
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
    '<span class="rec-pts'+(ok?'':' no')+'">'+(ok?'+'+pts+' pts':(window.auraT?window.auraT('fc_review_btn'):'repasar'))+'</span>';
  list.insertBefore(item, list.firstChild);
  requestAnimationFrame(function(){ item.style.opacity='1'; item.style.transform='translateY(0)'; });
}

// ── DRAG / SWIPE ─────────────────────────────────────────────────────────────
function initDrag(el){
  var startX, startY, curX, curY, dragging = false;
  function getPoint(e){ return e.touches ? e.touches[0] : e; }
  function onStart(e){
    e.preventDefault(); dragging = true; curX = undefined;
    var pt = getPoint(e); startX = pt.clientX; startY = pt.clientY;
    el.style.transition = 'none';
  }
  function onMove(e){
    if(!dragging) return; e.preventDefault();
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
    if(!dragging) return; dragging = false; el.style.transition = '';
    if(curX === undefined) return;
    if(Math.abs(curX) > 90){
      flyOut(el, curX > 0 ? 'right' : 'left', function(){ advance(curX > 0 ? 'right' : 'left'); });
    } else {
      el.style.transform = '';
      ['swipe-label true','swipe-label false'].forEach(function(cls){
        var e2 = el.querySelector('.'+cls.split(' ').join('.')); if(e2) e2.style.opacity = 0;
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

// ── GAME OVER POPUP ──────────────────────────────────────────────────────────
var _GO_TITLE_KEYS = ['fc_go_t0','fc_go_t1','fc_go_t2','fc_go_t3','fc_go_t4',
                      'fc_go_t5','fc_go_t6','fc_go_t7','fc_go_t8','fc_go_t9'];

function _goGetName(){
  try{ if(window._aura && window._aura.profile && window._aura.profile.nombre)
    return window._aura.profile.nombre.split(' ')[0]; }catch(e){}
  var _t = window.auraT || function(k){return k;};
  return _t('fc_go_champ');
}
function _goBuildTitle(nombre){
  var _t = window.auraT || function(k){return k;};
  var key = _GO_TITLE_KEYS[Math.floor(Math.random() * _GO_TITLE_KEYS.length)];
  return _t(key).replace('{name}', nombre);
}

// ── PM CALCULATION ────────────────────────────────────────────────────────────
function _calcPM(acc, diff, bestCombo, totalAnswered){
  var BASE  = {easy:5, med:12, hard:22, leg:38};
  var LOSE  = {easy:-1, med:-2, hard:-3, leg:-4};
  var base  = BASE[diff] || 12;

  if(acc < 60) return LOSE[diff] || -2;

  // Accuracy multiplier
  var mult = acc >= 95 ? 1.6 : acc >= 90 ? 1.3 : acc >= 80 ? 1.0 : acc >= 70 ? 0.8 : 0.6;
  var pm   = Math.round(base * mult);

  // Combo bonus
  if(bestCombo >= 35)     pm += 10;
  else if(bestCombo >= 20) pm +=  5;
  else if(bestCombo >= 10) pm +=  2;

  // Cards played bonus
  if(totalAnswered >= 60)      pm += 5;
  else if(totalAnswered >= 40) pm += 3;
  else if(totalAnswered >= 20) pm += 1;

  return pm;
}

function showGameOver(){
  var prev = parseInt(localStorage.getItem('_fc_best_acc') || '0');
  var acc  = totalAnswered > 0 ? Math.round(totalCorrect / totalAnswered * 100) : 0;
  if(acc > prev) localStorage.setItem('_fc_best_acc', acc);
  var bestAcc = Math.max(acc, prev);

  var pm = _calcPM(acc, FC_GAME.difficulty, bestCombo, totalAnswered);
  var pmPositive = pm > 0;

  // Apply PM
  if(window.AuraXP){
    if(pmPositive) AuraXP.addPM(pm).catch(function(){});
    // On loss, just don't add (don't subtract — could go negative and block exams)
  }

  // XP state
  var xpState  = window.AuraXP ? AuraXP.getState() : null;
  var xpPct    = xpState ? xpState.percent : 0;
  var xpNeeded = xpState ? (xpState.xpForNext - xpState.xpIntoLevel) : 0;
  var curLevel = xpState ? xpState.level : 1;
  var xpIn     = xpState ? xpState.xpIntoLevel : 0;
  var xpFor    = xpState ? xpState.xpForNext : 1200;

  var ap = Math.round(acc / 100 * 50);  // mismo patrón que ShadowLab: máx 50 AP sesión perfecta
  var nombre     = _goGetName();
  var catLabel   = {slang:'Slang',idioms:'Idioms',phrasal_verbs:'Phrasal Verbs',business:'Business'}[_activeType] || _activeType;
  var _t = window.auraT || function(k){return k;};
  var diffLabel  = {easy:_t('diff_facil'),med:_t('diff_medio'),hard:_t('diff_dificil'),leg:_t('diff_legendario')}[FC_GAME.difficulty] || FC_GAME.difficulty;
  var deltaVsMin = acc - 70;

  var html =
    '<div id="fc-go-wrap" onclick="if(event.target===this)fcGoClose()">' +
    '<div class="fc-go-ashes" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
    '<div class="fc-go-modal" role="dialog" aria-modal="true">' +

    '<button class="fc-go-close" onclick="fcGoClose()" aria-label="Cerrar">' +
    '<svg viewBox="0 0 24 24"><line x1=6 y1=6 x2=18 y2=18></line><line x1=18 y1=6 x2=6 y2=18></line></svg></button>' +

    '<header class="fc-go-hero">' +
    '<span class="fc-go-kicker">' + _t('fc_go_kicker') + '</span>' +
    '<h2 class="fc-go-title">'+_goBuildTitle(nombre)+'</h2>' +
    '<div class="fc-go-sub"><b>'+catLabel+' · '+diffLabel+'</b>' +
    '<span class="fc-go-dot"></span><span>'+totalAnswered+' '+_t('fc_go_cards_lbl')+'</span>' +
    '<span class="fc-go-dot"></span><span>'+_t('fc_go_combo_lbl')+bestCombo+'</span></div>' +
    '</header>' +

    '<div class="fc-go-score">' +
    '<div class="fc-go-score-side">' +
    '<span class="fc-go-lbl">' + _t('fc_go_best_ret') + '</span>' +
    '<span class="fc-go-val">'+bestAcc+'<small>%</small></span>' +
    '</div>' +
    '<div class="fc-go-score-center">' +
    '<span class="fc-go-lbl" style="color:var(--fcgo-bad)">' + _t('fc_go_sess_ret') + '</span>' +
    '<span class="fc-go-big">'+acc+'<span style="font-size:36px">%</span></span>' +
    '<span class="fc-go-delta">'+(deltaVsMin >= 0 ? '+'+deltaVsMin+' '+_t('fc_go_above_min') : Math.abs(deltaVsMin)+' '+_t('fc_go_below_min'))+'</span>' +
    '</div>' +
    '<div class="fc-go-score-side fc-go-score-right">' +
    '<span class="fc-go-lbl">' + _t('fc_go_min_pass') + '</span>' +
    '<span class="fc-go-val">70<small>%</small></span>' +
    '</div>' +
    '</div>' +

    '<div class="fc-go-stats">' +
    '<div class="fc-go-stat fc-go-stat-good">' +
    '<div class="fc-go-stat-head"><div class="fc-go-stat-ic">' +
    '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>' +
    '</div><span class="fc-go-stat-lbl">' + _t('fc_go_remembered') + '</span></div>' +
    '<span class="fc-go-stat-val">'+totalCorrect+'</span>' +
    '<span class="fc-go-stat-sub">' + _t('fc_go_of') + ' <b>'+totalAnswered+'</b> '+_t('fc_go_cards_lbl')+'</span>' +
    '</div>' +
    '<div class="fc-go-stat fc-go-stat-bad">' +
    '<div class="fc-go-stat-head"><div class="fc-go-stat-ic">' +
    '<svg viewBox="0 0 24 24"><line x1=6 y1=6 x2=18 y2=18></line><line x1=18 y1=6 x2=6 y2=18></line></svg>' +
    '</div><span class="fc-go-stat-lbl">' + _t('fc_go_forgotten') + '</span></div>' +
    '<span class="fc-go-stat-val">'+totalErrors+'</span>' +
    '<span class="fc-go-stat-sub">' + _t('fc_go_review_soon') + '</span>' +
    '</div>' +
    '<div class="fc-go-stat fc-go-stat-acc">' +
    '<div class="fc-go-stat-head"><div class="fc-go-stat-ic">' +
    '<svg viewBox="0 0 24 24"><circle cx=12 cy=12 r=9></circle><circle cx=12 cy=12 r=3></circle></svg>' +
    '</div><span class="fc-go-stat-lbl">' + _t('fc_retention') + '</span></div>' +
    '<span class="fc-go-stat-val">'+acc+'<small style="font-size:16px;color:#7a7a7a">%</small></span>' +
    '<span class="fc-go-stat-sub">' + _t('fc_go_best_combo') + ' <b>'+bestCombo+'</b></span>' +
    '</div>' +
    '</div>' +

    (xpState ?
    '<div class="fc-go-nearup">' +
    '<div class="fc-go-nu-badge">'+curLevel+'<small>' + _t('fc_go_nv') + '</small></div>' +
    '<div class="fc-go-nu-meta">' +
    '<span class="fc-go-nu-kicker">' + _t('fc_go_so_close') + '</span>' +
    '<span class="fc-go-nu-title">' + _t('fc_go_xp_to_level') + ' <em>'+xpNeeded.toLocaleString()+' XP</em> ' + _t('fc_go_to_reach') + ' '+(curLevel+1)+'</span>' +
    '</div>' +
    '<div class="fc-go-nu-gap"><b>'+xpNeeded.toLocaleString()+'</b> XP</div>' +
    '</div>' +
    '<div class="fc-go-xp">' +
    '<div class="fc-go-xp-head">' +
    '<span class="fc-go-xp-l"><b>XP</b> · '+curLevel+' → '+(curLevel+1)+'</span>' +
    '<span class="fc-go-xp-r"><b>+'+sessionPts+'</b> ' + _t('fc_go_xp_earned') + ' · '+xpIn.toLocaleString()+'/'+xpFor.toLocaleString()+'</span>' +
    '</div>' +
    '<div class="fc-go-xp-track">' +
    '<div class="fc-go-xp-fill-old" style="width:'+(xpPct > 4 ? xpPct-4 : 0)+'%"></div>' +
    '<div class="fc-go-xp-fill" style="width:'+xpPct+'%"></div>' +
    '</div></div>'
    : '') +

    // Currency: Aura + PM (ganado o perdido)
    '<div class="fc-go-currency">' +
    '<div class="fc-go-coin fc-go-coin-aura">' +
    '<div class="fc-go-coin-ic"><svg viewBox="0 0 24 24"><circle cx=12 cy=12 r=9></circle>' +
    '<path d="M12 7v10"></path><path d="M9 10c0-1.5 1.3-3 3-3s3 1.5 3 3-1.3 2.5-3 2.5-3 1-3 2.5 1.3 3 3 3 3-1.5 3-3"></path></svg></div>' +
    '<div class="fc-go-coin-meta"><span class="fc-go-coin-lbl">' + _t('fc_go_aura_earned') + '</span>' +
    '<div class="fc-go-coin-row"><span class="fc-go-coin-val">+'+ap+'</span>' +
    '<span class="fc-go-coin-total">' + _t('fc_go_session') + ' <b>'+sessionPts+'</b></span></div></div></div>' +

    // PM coin — color cambia según ganado/perdido
    '<div class="fc-go-coin '+(pmPositive ? 'fc-go-coin-pm-win' : 'fc-go-coin-pm-lose')+'">' +
    '<div class="fc-go-coin-ic"><svg viewBox="0 0 24 24"><circle cx=12 cy=9 r=6></circle>' +
    '<path d="M8 14l-2 8 6-3 6 3-2-8"></path></svg></div>' +
    '<div class="fc-go-coin-meta">' +
    '<span class="fc-go-coin-lbl">'+(pmPositive ? _t('fc_go_merit_won') : _t('fc_go_merit_lost'))+'</span>' +
    '<div class="fc-go-coin-row">' +
    '<span class="fc-go-coin-val '+(pmPositive ? '' : 'fc-go-coin-neg')+'">'+(pmPositive ? pm : Math.abs(pm))+'</span>' +
    '<span class="fc-go-coin-total">' + _t('fc_go_for_exam') + '</span>' +
    '</div>' +
    '<span class="fc-go-coin-hint">'+(pmPositive
      ? _pmHint(acc, FC_GAME.difficulty, bestCombo, totalAnswered)
      : 'accuracy mín. 60% para ganar PM')+'</span>' +
    '</div></div>' +
    '</div>' +

    '<div class="fc-go-actions">' +
    '<button class="fc-go-btn fc-go-btn-primary" onclick="restartDeck();">' +
    '<svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.5 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>' +
    _t('fc_go_play_again')+'</button>' +
    '<button class="fc-go-btn fc-go-btn-secondary" onclick="fcGoClose();_fcOpenModal();">' +
    '<svg viewBox="0 0 24 24"><circle cx=12 cy=12 r=9></circle><polyline points="12 7 12 12 15 14"></polyline></svg>' +
    _t('fc_go_change_level')+'</button>' +
    '<button class="fc-go-btn fc-go-btn-ghost" onclick="window.location.href=\'dashboard.html\'">' +
    '<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>' +
    _t('fc_go_home')+'</button>' +
    '</div>' +
    '</div></div>';

  var container = document.createElement('div');
  container.id  = 'fc-go-container';
  container.innerHTML = html;
  document.body.appendChild(container);

  var wrap = document.getElementById('fc-go-wrap');
  if(wrap){ wrap.style.opacity='0'; requestAnimationFrame(function(){ wrap.style.transition='opacity .35s'; wrap.style.opacity='1'; }); }

  if(window.AuraXP){
    /* Patrón ShadowLab: addAP y addPM explícitos, logSession solo registra historial con xp:0 */
    if(ap > 0) AuraXP.addAP(ap).catch(function(){});
    AuraXP.logSession({
      tool:'flashcards', skill:'Vocabulary',
      thumbnail:'assets/home/tool-flashcards.jpg',
      xp: 0,                        // XP ya sumado carta por carta con addXP()
      pm: pmPositive ? pm : 0,
      ap: ap,
      accuracy: acc
    }).catch(function(){});
  }
  if(window._aura && sessionPts > 0) try{ _aura.saveScore(sessionPts); }catch(e){}
}

// Builds a short hint explaining the PM breakdown
function _pmHint(acc, diff, bestCombo, totalAnswered){
  var parts = [];
  var BASE = {easy:5, med:12, hard:22, leg:38};
  parts.push('base '+BASE[diff]);
  var mult = acc >= 95 ? '×1.6' : acc >= 90 ? '×1.3' : acc >= 80 ? '×1.0' : acc >= 70 ? '×0.8' : '×0.6';
  parts.push('acc '+mult);
  if(bestCombo >= 10) parts.push('combo +' + (bestCombo >= 35 ? 10 : bestCombo >= 20 ? 5 : 2));
  if(totalAnswered >= 20) parts.push('cartas +' + (totalAnswered >= 60 ? 5 : totalAnswered >= 40 ? 3 : 1));
  return parts.join(' · ');
}

function fcGoClose(){
  var c = document.getElementById('fc-go-container'); if(!c) return;
  var wrap = document.getElementById('fc-go-wrap');
  if(wrap){ wrap.style.pointerEvents='none'; wrap.style.opacity='0'; wrap.style.transition='opacity .25s'; }
  setTimeout(function(){ if(c && c.parentNode) c.parentNode.removeChild(c); }, 260);
}

function restartDeck(){
  fcGoClose();
  var pool = getCardsByType(_activeType).filter(function(c){ return c.difficulty === FC_GAME.difficulty; });
  if(!pool.length) pool = getCardsByType(_activeType);
  if(!pool.length) pool = ALL_SLANGS.slice();
  CARDS=buildRandomDeck(pool); cardIdx=0; sessionPts=0; combo=0; bestCombo=0;
  totalAnswered=0; totalCorrect=0; totalErrors=0;
  buildDeck();
}

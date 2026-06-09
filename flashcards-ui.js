
// ── DIFFICULTY MODAL ─────────────────────────────────────────────────────────
var _fcDiffSelected = 'med';
var _FC_DIFF_MULT   = { easy:1, med:1.5, hard:2, leg:3 };
var FC_GAME = { difficulty:'med', xpMultiplier:1.5 };

function _fcNivelLabel(nivel) {
  var n = parseInt(nivel) || 1;
  var p = window._aura && window._aura.profile;
  var rng = (p && p.rango) || 'Bronce';
  return 'Lv ' + n + ' · ' + rng;
}



function fcDiffSelect(diff) {
  _fcDiffSelected = diff;
  document.querySelectorAll('#fc-diff-overlay .opt').forEach(function(el){
    el.classList.toggle('selected', el.dataset.diff === diff);
  });
  var byCat  = getCardsByType(_activeType || 'slang');
  var pool   = byCat.filter(function(c){ return c.difficulty === diff; });
  // Fallback: si la categoría está vacía (slangs.json u otro), usar ALL_SLANGS
  var dispPool = pool.length ? pool : (byCat.length ? byCat : ALL_SLANGS.slice());
  var pts  = { easy:40, med:90, hard:170, leg:300 };
  var base = pts[diff] || 90;
  var el = document.getElementById('fc-pts-' + diff);
  if (el) el.textContent = Math.round(Math.min(15, dispPool.length) * base / 15);
  var art = document.getElementById('fc-head-artist');
  if (art) art.textContent = dispPool.length + (window.auraT?window.auraT('fc_cards_avail'):' tarjetas disponibles · nivel ')+'  ' + diff;
}

function fcDiffCancel() {
  var ov = document.getElementById('fc-diff-overlay');
  if (ov) { ov.style.opacity='0'; ov.style.transition='opacity .25s'; setTimeout(function(){ ov.style.display='none'; },250); }
}

function fcDiffStart() {
  if(window.AuraSounds)AuraSounds.play('ui-click');
  if (!_fcDiffSelected) return;
  FC_GAME.difficulty   = _fcDiffSelected;
  FC_GAME.xpMultiplier = _FC_DIFF_MULT[_fcDiffSelected] || 1;
  fcDiffCancel();
  var pool = getCardsByType(_activeType || 'slang').filter(function(c){ return c.difficulty === _fcDiffSelected; });
  if (!pool.length) pool = getCardsByType(_activeType || 'slang');
  if (!pool.length) pool = ALL_SLANGS.slice();
  cardIdx=0; sessionPts=0; combo=0; bestCombo=0; totalAnswered=0; totalCorrect=0; totalErrors=0;
  CARDS = buildRandomDeck(pool);
  buildDeck();
}

function _fcOpenModal() {
  var ov = document.getElementById('fc-diff-overlay');
  if (!ov) return;
  /* move to body so iOS position:fixed isn't clipped by .main overflow:hidden */
  if (ov.parentNode !== document.body) document.body.appendChild(ov);
  var nivel = window._aura && window._aura.profile && window._aura.profile.nivel;
  var nivelEl = document.getElementById('fc-user-nivel');
  if (nivelEl) nivelEl.textContent = _fcNivelLabel(nivel);
  var byCatOpen = getCardsByType(_activeType || 'slang');
  var total   = byCatOpen.length || ALL_SLANGS.length;
  var headArt = document.getElementById('fc-head-artist');
  if (headArt) headArt.textContent = total + (window.auraT?window.auraT('fc_cards_avail'):'tarjetas · 4 categorías');
  fcDiffSelect('med');
  ov.style.display = 'flex';
  ov.style.opacity = '1';
}

// Keyboard shortcuts: 1/2/3/4 = easy/med/hard/leg, Enter = start
document.addEventListener('keydown', function(e) {
  var ov = document.getElementById('fc-diff-overlay');
  if (!ov || ov.style.display === 'none') return;
  var map = {'1':'easy','2':'med','3':'hard','4':'leg'};
  if (map[e.key]) { fcDiffSelect(map[e.key]); e.preventDefault(); }
  if (e.key === 'Enter') { fcDiffStart(); e.preventDefault(); }
});


// ── PANEL UPDATES ─────────────────────────────────────────────────────────────
function updatePanels(){
  var livesLeft = MAX_ERRORS - totalErrors;

  // Barra XP global — actualizar si AuraXP está listo
  if(window.AuraXP) AuraXP.refreshBars();

  // Lives row (corazones)
  var livesRow = document.getElementById('livesRow');
  if(livesRow){
    var hearts = '';
    for(var h = 0; h < MAX_ERRORS; h++){
      hearts += h < livesLeft
        ? '<span style="color:#f87171;font-size:15px;">♥</span>'
        : '<span style="color:#ffffff18;font-size:15px;">♡</span>';
    }
    livesRow.innerHTML = hearts;
  }

  // Sesión info
  var sessAura = document.getElementById('sessAura');
  var sessLbl  = document.getElementById('sessComboLabel');
  if(sessAura) sessAura.textContent = '+' + sessionPts + ' aura';
  var _t0 = window.auraT || function(k){return k;};
  var _cMsg0 = combo>=3 ? _t0('fc_combo_streak') : combo>=1 ? _t0('fc_combo_go') : _t0('fc_combo_play');
  if(sessLbl)  sessLbl.textContent  = 'combo ×' + Math.max(combo,1) + ' · ' + _cMsg0;

  // Error badge en la barra del mazo
  var totEl = document.getElementById('deckTotal');
  if(totEl) totEl.textContent = livesLeft;

  // Mini stats
  var ptEl   = document.getElementById('statPts');
  var ptDEl  = document.getElementById('statPtsDelta');
  var recEl  = document.getElementById('statRec');
  var recDEl = document.getElementById('statRecDelta');
  var accEl  = document.getElementById('statAcc');
  var accDEl = document.getElementById('statAccDelta');
  if(ptEl)  ptEl.textContent  = sessionPts;
  if(ptDEl) ptDEl.textContent = sessionPts > 0 ? ('↑ +' + sessionPts + ' ' + (window.auraT?window.auraT('fc_this_session'):'esta sesión')) : (window.auraT?window.auraT('fc_start_playing'):'— empieza a jugar');
  if(recEl) recEl.textContent = bestCombo > 0 ? sessionPts : 0;
  if(recDEl) recDEl.textContent = totalAnswered > 0 ? totalAnswered + ' ' + (window.auraT?window.auraT('fc_cards_played'):'cartas jugadas') : (window.auraT?window.auraT('fc_no_session'):'— sin jugar aún');
  var acc = totalAnswered > 0 ? Math.round(totalCorrect / totalAnswered * 100) : null;
  if(accEl) accEl.childNodes[0].textContent = acc !== null ? acc : '—';
  var _t1 = window.auraT || function(k){return k;};
  if(accDEl) accDEl.textContent = acc !== null ? (acc >= 80 ? _t1('fc_acc_excellent') : acc >= 60 ? _t1('fc_acc_good') : _t1('fc_acc_keep')) : _t1('fc_no_answers');

  // Combo widget
  var cMult = document.getElementById('comboMult');
  var cMsg  = document.getElementById('comboMsg');
  var cSub  = document.getElementById('comboSub');
  var cBest = document.getElementById('comboBest');
  if(cMult) cMult.textContent = '×' + Math.max(combo,1);
  if(cMsg){
    if(combo === 0)      cMsg.textContent = (window.auraT?window.auraT('fc_combo_play'):'¡a jugar!');
    else if(combo < 3)   cMsg.textContent = (window.auraT?window.auraT('fc_combo_go'):'¡sigue así!');
    else if(combo < 5)   cMsg.textContent = (window.auraT?window.auraT('fc_combo_streak'):'¡racha viva!');
    else if(combo < 10)  cMsg.textContent = (window.auraT?window.auraT('fc_combo_unstop'):'¡imparable!');
    else                 cMsg.textContent = '¡legendario!';
  }
  if(cSub){
    if(combo === 0)            cSub.textContent = (window.auraT?window.auraT('fc_combo_start'):'responde correctamente para empezar el combo');
    else if(combo < 5){
      var need = 5 - combo;
      cSub.textContent = need + +(window.auraT?window.auraT('fc_combo_unlock'):' más para desbloquear bonificación ×5');
    } else                     cSub.textContent = (window.auraT?window.auraT('fc_combo_active'):'¡bonificación activa!') +'+' + combo + ' pts extra por acierto';
  }
  if(cBest) cBest.textContent = '×' + bestCombo;
}


// ── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async function(){
  // Inicializar AuraXP
  if(window.AuraXP){
    AuraXP.init().then(function(){ AuraXP.refreshBars(); }).catch(function(e){ console.warn('[FC] AuraXP init error:',e); });
  }

  await loadFlashcards();
  _fcOpenModal();
  var btnNo  = document.getElementById('btnNo');
  var btnYes = document.getElementById('btnYes');
  if(btnNo)  btnNo.addEventListener('click',  function(){ doSwipe('left'); });
  if(btnYes) btnYes.addEventListener('click', function(){ doSwipe('right'); });
});

// Flechas del teclado
document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
    e.preventDefault();
    if(!document.getElementById('topCard')) return;
    doSwipe(e.key === 'ArrowLeft' ? 'left' : 'right');
  }
});

// ── PROFILE MENU ──────────────────────────────────────────────────────────────
function toggleProfileMenu(e){
  e.stopPropagation();
  var menu = document.getElementById('profileMenu');
  if(!menu.style.display || menu.style.display==='none'){
    var rect = e.currentTarget.getBoundingClientRect();
    menu.style.display='block'; menu.style.right='70px'; menu.style.top=(rect.bottom+8)+'px';
  } else { menu.style.display='none'; }
}
document.addEventListener('click', function(){
  var m = document.getElementById('profileMenu'); if(m) m.style.display='none';
});
async function cerrarSesion(){
  if(window._aura) await _aura.signOut(); else window.location.href='login.html';
}

// ── FOTO DE PERFIL ────────────────────────────────────────────────────────────
function triggerPhotoUpload(){ document.getElementById('photoInput').click(); }
document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('photoInput').addEventListener('change', function(e){
    var file=e.target.files[0]; if(!file) return;
    var reader=new FileReader();
    reader.onload=function(ev){
      var src=ev.target.result;
      ['tbAvatar','srProfile','pmAvatar'].forEach(function(id){
        var el=document.getElementById(id); if(!el) return;
        el.innerHTML='<img src="'+src+'" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">';
        el.style.backgroundImage='';
      });
    };
    reader.readAsDataURL(file);
    if(window._aura) _aura.uploadAvatar(file);
  });
});


// ── Sync usuario ──────────────────────────────────────────────────────────────
async function syncUserData(){
  try {
    if(!window._aura) return;
    if(window._aura.profile){
      applyUserProfile(window._aura.profile);
      return;
    }
    var r = await window._aura.sb.auth.getSession();
    if(!r || !r.data || !r.data.session) return;
    var uid = r.data.session.user.id;
    await window._aura.loadProfile(uid);
    if(window._aura.profile) applyUserProfile(window._aura.profile);
  } catch(e){ console.warn('[Aura Flashcards] sync error:', e); }
}

function applyUserProfile(p){
  if(!p) return;
  var nombre = p.nombre || '—';
  var xp     = p.xp || 0;
  var rango  = p.rango || 'Bronce';
  var nivel  = p.nivel || 1;
  var rango  = p.rango || 'Bronce';

  var tbB = document.querySelector('.tb-name b');
  if(tbB) tbB.textContent = nombre;
  var tbS = document.querySelector('.tb-name span');
  if(tbS) tbS.textContent = 'Lv ' + nivel + ' · ' + rango;

  var foto = p.foto_url || null;
  var initials = nombre.split(' ').filter(Boolean).map(function(w){return w[0];}).join('').toUpperCase().slice(0,2)||'US';
  var imgHtml = foto ? '<img src="'+foto+'" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">' : null;
  ['tbAvatar','srProfile','pmAvatar'].forEach(function(id){
    var el=document.getElementById(id); if(!el) return;
    if(imgHtml){ el.innerHTML=imgHtml; el.style.backgroundImage=''; }
    else { el.textContent=initials; }
  });

  var pmN = document.getElementById('pmName');
  if(pmN) pmN.innerHTML = nombre+'<span style="color:#c4ff3d;">#LAN</span>';
}

document.addEventListener('DOMContentLoaded', function(){
  syncUserData();
  setTimeout(syncUserData, 500);
  setTimeout(syncUserData, 1500);
});


// ── FEEDBACK VISUAL (vignette + borde + partículas + toast Aura) ─────────────
function _fcFeedback(type, word) {
  var DUR = 1400;
  var isRight = type === 'right';

  // --- vignette overlay ---
  var vig = document.getElementById('fc-fb-vignette');
  if (vig) {
    vig.className = 'fc-fb-vig fc-fb-vig-' + type;
    vig.style.transition = 'opacity .08s';
    vig.style.opacity = '1';
    setTimeout(function() {
      vig.style.transition = 'opacity ' + Math.round(DUR * 0.85) + 'ms ease-out';
      vig.style.opacity = '0';
    }, 120);
  }

  // --- border overlay ---
  var brd = document.getElementById('fc-fb-border');
  if (brd) {
    brd.className = 'fc-fb-brd fc-fb-brd-' + type;
    brd.style.transition = 'opacity .06s';
    brd.style.opacity = '1';
    setTimeout(function() {
      brd.style.transition = 'opacity ' + Math.round(DUR * 0.75) + 'ms ease-out';
      brd.style.opacity = '0';
    }, 100);
  }

  // --- toast ---
  var toast = document.getElementById('fc-fb-toast');
  if (toast) {
    // clear previous hide timer
    if (toast._fbTimer) clearTimeout(toast._fbTimer);

    // update variant class
    toast.className = 'fc-fb-toast fc-fb-toast-' + type;

    // update icon
    var ic = toast.querySelector('.fc-fb-toast-ic svg');
    if (ic) {
      ic.innerHTML = isRight
        ? '<polyline points="20 6 9 17 4 12"/>'
        : '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';
    }

    // update text
    var titleEl = toast.querySelector('.fc-fb-toast-title');
    var subEl   = toast.querySelector('.fc-fb-toast-sub');
    if (titleEl) titleEl.textContent = isRight ? '¡Correcto!' : 'Incorrecto';
    if (subEl) {
      if (isRight) {
        subEl.innerHTML = '<b>+10 XP</b> · ¡sigue así!';
      } else {
        subEl.textContent = word ? 'Repasa: ' + word : 'Revisa esta tarjeta';
      }
    }

    // reset & animate timer bar
    var bar = toast.querySelector('.fc-fb-timer');
    if (bar) {
      bar.style.transition = 'none';
      bar.style.transform  = 'scaleX(1)';
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          bar.style.transition = 'transform ' + (DUR + 400) + 'ms linear';
          bar.style.transform  = 'scaleX(0)';
        });
      });
    }

    // show
    requestAnimationFrame(function() { toast.classList.add('fc-fb-toast--visible'); });

    // hide after duration
    toast._fbTimer = setTimeout(function() {
      toast.classList.remove('fc-fb-toast--visible');
    }, DUR + 600);
  }

  // --- particles ---
  _fcFeedbackParticles(type, DUR);
}

function _fcFeedbackParticles(type, dur) {
  var cont = document.getElementById('fc-fb-particles');
  if (!cont) return;
  var color = type === 'right' ? '#c4ff3d' : '#ff5a5a';
  var n     = type === 'right' ? 18 : 8;

  // Use deck area as origin, or fall back to center
  var deck = document.getElementById('deck');
  var rect = deck
    ? deck.getBoundingClientRect()
    : { left: window.innerWidth / 2 - 85, top: window.innerHeight / 2 - 125, width: 170, height: 250 };

  for (var i = 0; i < n; i++) {
    (function() {
      var p  = document.createElement('div');
      p.className = 'fc-fb-particle';
      var sz = type === 'right' ? (3 + Math.random() * 5) : 5;
      p.style.cssText = 'position:absolute;border-radius:50%;pointer-events:none;opacity:.9;' +
        'width:' + sz + 'px;height:' + sz + 'px;background:' + color + ';' +
        'left:' + (rect.left + 20 + Math.random() * (rect.width  - 40)) + 'px;' +
        'top:'  + (rect.top  + rect.height * 0.35 + Math.random() * rect.height * 0.4) + 'px;';
      cont.appendChild(p);

      var dx = (Math.random() - 0.5) * 130;
      var dy = -65 - Math.random() * 150;
      requestAnimationFrame(function() {
        p.style.transition = 'transform ' + (dur + 400) + 'ms ease-out, opacity ' + (dur + 200) + 'ms ease-out';
        p.style.transform  = 'translate(' + dx + 'px,' + dy + 'px) scale(0)';
        p.style.opacity    = '0';
      });
      setTimeout(function() { if (p.parentNode) p.parentNode.removeChild(p); }, dur + 500);
    })();
  }
}

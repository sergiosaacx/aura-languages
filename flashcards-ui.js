
// ── DIFFICULTY MODAL ─────────────────────────────────────────────────────────
var _fcDiffSelected = 'med';
var _FC_DIFF_MULT   = { easy:1, med:1.5, hard:2, leg:3 };
var FC_GAME = { difficulty:'med', xpMultiplier:1.5 };

function _fcNivelLabel(nivel) {
  var n = parseInt(nivel) || 1;
  if (n <= 3)  return 'A2 · Básico';
  if (n <= 7)  return 'B1 · Intermedio';
  if (n <= 12) return 'B2 · Intermedio';
  if (n <= 17) return 'C1 · Avanzado';
  return 'C2 · Experto';
}

function fcDiffSelect(diff) {
  _fcDiffSelected = diff;
  document.querySelectorAll('#fc-diff-overlay .opt').forEach(function(el){
    el.classList.toggle('selected', el.dataset.diff === diff);
  });
  var pool = getCardsByType(_activeType || 'slang').filter(function(c){ return c.difficulty === diff; });
  var pts  = { easy:40, med:90, hard:170, leg:300 };
  var base = pts[diff] || 90;
  var el = document.getElementById('fc-pts-' + diff);
  if (el) el.textContent = Math.round(Math.min(15, pool.length) * base / 15);
  var art = document.getElementById('fc-head-artist');
  if (art) art.textContent = pool.length + ' tarjetas disponibles · nivel ' + diff;
}

function fcDiffCancel() {
  var ov = document.getElementById('fc-diff-overlay');
  if (ov) { ov.style.opacity='0'; ov.style.transition='opacity .25s'; setTimeout(function(){ ov.style.display='none'; },250); }
}

function fcDiffStart() {
  if (!_fcDiffSelected) return;
  FC_GAME.difficulty   = _fcDiffSelected;
  FC_GAME.xpMultiplier = _FC_DIFF_MULT[_fcDiffSelected] || 1;
  fcDiffCancel();
  var pool = getCardsByType(_activeType || 'slang').filter(function(c){ return c.difficulty === _fcDiffSelected; });
  if (!pool.length) pool = getCardsByType(_activeType || 'slang');
  cardIdx=0; sessionPts=0; combo=0; bestCombo=0; totalAnswered=0; totalCorrect=0; totalErrors=0;
  CARDS = buildRandomDeck(pool);
  buildDeck();
}

function _fcOpenModal() {
  var ov = document.getElementById('fc-diff-overlay');
  if (!ov) return;
  var nivel = window._aura && window._aura.profile && window._aura.profile.nivel;
  var nivelEl = document.getElementById('fc-user-nivel');
  if (nivelEl) nivelEl.textContent = _fcNivelLabel(nivel);
  var total   = ALL_SLANGS.length;
  var headArt = document.getElementById('fc-head-artist');
  if (headArt) headArt.textContent = total + ' tarjetas · 4 categorías';
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
  if(sessLbl)  sessLbl.textContent  = 'combo ×' + Math.max(combo,1) + (combo>=3?' · ¡racha viva!':combo>=1?' · sigue así':'· ¡a jugar!');

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
  if(ptDEl) ptDEl.textContent = sessionPts > 0 ? '↑ +' + sessionPts + ' esta sesión' : '— empieza a jugar';
  if(recEl) recEl.textContent = bestCombo > 0 ? sessionPts : 0;
  if(recDEl) recDEl.textContent = totalAnswered > 0 ? totalAnswered + ' cartas jugadas' : '— sin jugar aún';
  var acc = totalAnswered > 0 ? Math.round(totalCorrect / totalAnswered * 100) : null;
  if(accEl) accEl.childNodes[0].textContent = acc !== null ? acc : '—';
  if(accDEl) accDEl.textContent = acc !== null ? (acc >= 80 ? '↑ excelente precisión' : acc >= 60 ? '↑ buen ritmo' : '— sigue practicando') : '— sin respuestas';

  // Combo widget
  var cMult = document.getElementById('comboMult');
  var cMsg  = document.getElementById('comboMsg');
  var cSub  = document.getElementById('comboSub');
  var cBest = document.getElementById('comboBest');
  if(cMult) cMult.textContent = '×' + Math.max(combo,1);
  if(cMsg){
    if(combo === 0)      cMsg.textContent = '¡a jugar!';
    else if(combo < 3)   cMsg.textContent = '¡sigue así!';
    else if(combo < 5)   cMsg.textContent = '¡racha viva!';
    else if(combo < 10)  cMsg.textContent = '¡imparable!';
    else                 cMsg.textContent = '¡legendario!';
  }
  if(cSub){
    if(combo === 0)            cSub.textContent = 'responde correctamente para empezar el combo';
    else if(combo < 5){
      var need = 5 - combo;
      cSub.textContent = need + ' más para desbloquear bonificación ×5';
    } else                     cSub.textContent = '¡bonificación activa! +' + combo + ' pts extra por acierto';
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
  var nivMap = {1:'A1',2:'A2',3:'B1',4:'B2',5:'C1',6:'C2'};
  var nivel  = nivMap[p.nivel||1] || 'A1';
  var rango  = p.rango || 'Bronce';

  var tbB = document.querySelector('.tb-name b');
  if(tbB) tbB.textContent = nombre;
  var tbS = document.querySelector('.tb-name span');
  if(tbS) tbS.textContent = nivel + ' · ' + rango;

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

// ── PANEL UPDATES ──────────────────────────────────────────────────────────────
function updatePanels(){
  // Sesión de hoy
  var sessCards = document.getElementById('sessCards');
  var sessAura  = document.getElementById('sessAura');
  var sessLbl   = document.getElementById('sessComboLabel');
  var sessBar   = document.getElementById('sessBar');
  if(sessCards) sessCards.textContent = totalCorrect;
  if(sessAura)  sessAura.textContent  = '+' + sessionPts + ' aura';
  if(sessLbl)   sessLbl.textContent   = 'combo ×' + Math.max(combo,1) + (combo>=3?' · ¡racha viva!':combo>=1?' · sigue así':'· ¡a jugar!');
  var pct = CARDS.length > 0 ? (totalCorrect / CARDS.length * 100) : 0;
  if(sessBar)   sessBar.style.width   = pct + '%';

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

  // Combo
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


// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function(){
  // Fetch slangs.json y armar mazo aleatorio
  fetch('slangs.json')
    .then(function(r){ return r.json(); })
    .then(function(data){
      ALL_SLANGS = data;
      CARDS = buildRandomDeck(ALL_SLANGS);
      buildDeck();
    })
    .catch(function(e){
      console.warn('[Aura] Error cargando slangs.json:', e);
      buildDeck(); // fallback deck vacío
    });

  var btnNo  = document.getElementById('btnNo');
  var btnYes = document.getElementById('btnYes');
  if(btnNo)  btnNo.addEventListener('click',  function(){ doSwipe('left'); });
  if(btnYes) btnYes.addEventListener('click', function(){ doSwipe('right'); });



});

// Flechas del teclado — fuera de DOMContentLoaded para registro inmediato
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



// ── Sync usuario — idéntico al dashboard ─────────────────────────────────────
async function syncUserData(){
  try {
    if(!window._aura) return;

    // Caso 1: aura-supabase.js ya cargó el perfil → usarlo directo
    if(window._aura.profile){
      applyUserProfile(window._aura.profile);
      return;
    }

    // Caso 2: cargar perfil manualmente usando el cliente ya inicializado
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
  function rango(x){ return x>=5000?'Maestro':x>=2000?'Diamante':x>=1000?'Platino':x>=500?'Oro':x>=250?'Plata':x>=100?'Bronce':'Aprendiz'; }

  var tbB = document.querySelector('.tb-name b');
  if(tbB) tbB.textContent = nombre;

  var tbS = document.querySelector('.tb-name span');
  if(tbS) tbS.textContent = nivel + ' · ' + rango(xp);

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

// Intentar sync inmediato, y de nuevo a los 500ms y 1500ms por si aura-supabase.js tarda
document.addEventListener('DOMContentLoaded', function(){
  syncUserData();
  setTimeout(syncUserData, 500);
  setTimeout(syncUserData, 1500);
});

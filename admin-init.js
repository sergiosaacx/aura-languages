var _sb, _userId, _profile;
var allUsers = [], novedadesData = [];

/* ── INIT ────────────────────────────────── */
function startAdmin() {
  var t = setInterval(function() {
    if (window._aura && window._aura.sb && window._aura.userId && window._aura.profile) {
      clearInterval(t);
      _sb = window._aura.sb;
      _userId = window._aura.userId;
      _profile = window._aura.profile;
      checkAdmin();
    }
  }, 300);
}

function checkAdmin() {
  if (!_profile || _profile.role !== 'admin') {
    document.getElementById('ld').style.display = 'none';
    document.getElementById('dn').style.display = 'flex';
    setTimeout(function() { window.location.href = 'home.html'; }, 4000);
    return;
  }
  document.getElementById('ld').style.display = 'none';
  document.getElementById('mb').style.display = 'block';
  var n = _profile.nombre || 'Admin';
  var ini = n.split(' ').map(function(w){return w[0];}).join('').toUpperCase().slice(0,2);
  var _n = document.getElementById('adm-name'); if(_n) _n.textContent = n;
  document.getElementById('adm-crumb-user').textContent = n.split(' ')[0].toLowerCase();
  if (_profile.foto_url) {
    var _av = document.getElementById('adm-av'); if(_av) _av.innerHTML = '<img src="' + _profile.foto_url + '">';
  } else {
    var _av2 = document.getElementById('adm-av'); if(_av2) _av2.textContent = ini;
  }
  loadUsers();
  loadNovedades();
}

/* ── TABS ────────────────────────────────── */
// ── Keep-alive ping a Render cada 4 min para evitar spin-down ──
(function() {
  var RENDER = 'https://aura-stream-api.onrender.com/health';
  function ping() { fetch(RENDER).catch(function(){}); }
  ping();
  setInterval(ping, 4 * 60 * 1000);
})();


function saveOaiKey() {
  var input = document.getElementById('oai-key-input');
  var val   = input ? input.value.trim() : '';
  if (!val.startsWith('sk-')) { alert('Ingresa un API key de OpenAI valido (empieza con sk-)'); return; }
  localStorage.setItem('_aura_oai_key', val);
  if (input) input.value = '';
  var el = document.getElementById('oai-key-status');
  if (el) { el.textContent = '✓ Key guardada'; el.style.color = '#4ade80'; }
}

function showTab(name) {
  var tabs = ['usuarios','novedades','estadisticas','anuncios','peliculas','lyriclab','flashcards','collocations','temas','examen','tucamino','pagos'];
  var langTabs = ['flashcards','collocations'];
  if (name === 'peliculas') loadPeliculas();
  if (name === 'examen') { if (window.initExamen) window.initExamen(_sb); setTimeout(function(){ if(window.exCargar) exCargar(); }, 200); }
  if (name === 'tucamino') { if (window.admProgresoInit) window.admProgresoInit(); }
  if (name === 'lyriclab') loadLLSongs();
  if (name === 'flashcards') initFlashcardsAdmin();
  if (name === 'collocations') initCollocationsAdmin();
  tabs.forEach(function(t) {
    document.getElementById('t-' + t).style.display = t === name ? 'block' : 'none';
    var btn = document.querySelector('[data-tab="' + t + '"]');
    if (btn) btn.classList.toggle('active', t === name);
  });
  if (name === 'estadisticas') loadStats();
  // La barra de idioma siempre es visible
}



// ── Admin Language Selector ────────────────────────────────────────────────
window.admLang = 'en';

function admSetLang(code) {
  window.admLang = code;
  document.querySelectorAll('.adm-lang-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.lang === code);
  });
  var badge = document.getElementById('adm-lang-badge');
  if (badge) badge.textContent = code.toUpperCase();
  // Reload the active content tab
  var activeTab = document.querySelector('.adm-tab.active');
  if (activeTab) {
    var tab = activeTab.dataset.tab;
    if (tab === 'flashcards')   initFlashcardsAdmin();
    if (tab === 'collocations') initCollocationsAdmin();
    if (tab === 'peliculas')    loadPeliculas();
    if (tab === 'lyriclab')     loadLLSongs();
    if (tab === 'temas')       tmHighlightLang(code);
    if (tab === 'tucamino')    { if (window.admProgresoLangChange) window.admProgresoLangChange(code); }
  }
}
/* ── ESTADÍSTICAS ────────────────────────── */
function loadStats() {
  if (!allUsers.length) return;
  var xp = allUsers.reduce(function(a,u){return a+(u.xp||0);},0);
  var ap = allUsers.reduce(function(a,u){return a+(u.aura_points||0);},0);
  var maxStreak = Math.max.apply(null, allUsers.map(function(u){return u.streak_maximo||0;}));
  document.getElementById('st-xp').textContent = xp.toLocaleString();
  document.getElementById('st-ap').textContent = ap.toLocaleString();
  document.getElementById('st-streak').textContent = maxStreak;
  var nivelesCount = {};
  allUsers.forEach(function(u){var n='Nv '+(u.nivel||1); nivelesCount[n]=(nivelesCount[n]||0)+1;});
  var maxN = Math.max.apply(null, Object.values(nivelesCount));
  document.getElementById('st-niveles').innerHTML = Object.entries(nivelesCount).sort().map(function(e){
    return '<div class="bar-item"><div class="bar-label"><span>'+e[0]+'</span><b>'+e[1]+'</b></div><div class="bar-track"><div class="bar-fill" style="width:'+Math.round(e[1]/maxN*100)+'%"></div></div></div>';
  }).join('');
  var rangosCount = {};
  allUsers.forEach(function(u){var r=u.rango||'Bronce'; rangosCount[r]=(rangosCount[r]||0)+1;});
  var maxR = Math.max.apply(null, Object.values(rangosCount));
  document.getElementById('st-rangos').innerHTML = Object.entries(rangosCount).map(function(e){
    return '<div class="bar-item"><div class="bar-label"><span>'+e[0]+'</span><b>'+e[1]+'</b></div><div class="bar-track"><div class="bar-fill" style="width:'+Math.round(e[1]/maxR*100)+'%"></div></div></div>';
  }).join('');
}

/* ── ANUNCIOS ────────────────────────────── */
function sendAnuncio() {
  var msg = document.getElementById('an-msg').value.trim();
  if (!msg) { showToast('Escribe un mensaje primero', true); return; }
  var tipo = document.getElementById('an-tipo').value;
  var url = document.getElementById('an-url').value.trim();
  var payload = { tipo: tipo, mensaje: msg, url: url||null, creado_por: _userId, created_at: new Date().toISOString(), activo: true };
  _sb.from('anuncios').insert(payload).then(function(res) {
    if (res.error) {
      showToast('Tabla anuncios pendiente de crear en SQL', true);
    } else {
      document.getElementById('an-msg').value = '';
      showToast('Anuncio publicado ✓');
    }
  });
}

/* ── MODALS ──────────────────────────────── */
function openModal(id) { document.getElementById(id).style.display='flex'; }
function closeModal(id) { document.getElementById(id).style.display='none'; }

/* ── TOAST ───────────────────────────────── */
function showToast(msg, isErr) {
  var t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  if (isErr) { t.style.background = 'var(--bad)'; t.style.color = '#fff'; }
  document.body.appendChild(t);
  setTimeout(function(){ if(t.parentNode)t.parentNode.removeChild(t); }, 3000);
}

/* ── LOGOUT ──────────────────────────────── */
function auraLogout() {
  try { if(window._aura&&window._aura.sb)window._aura.sb.auth.signOut(); } catch(e){}
  window.location.href = 'login.html';
}

/* ── START ───────────────────────────────── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startAdmin);
} else {
  startAdmin();
}

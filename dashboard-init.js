// ============================================================
//  dashboard-init.js
//  Inicialización inline del dashboard:
//  status toggle, cerrar sesión, cambio de foto de perfil.
//  Se carga después de aura-supabase.js y aura-dashboard.js.
// ============================================================

// ── Init AuraXP para barra de nivel en card YOU ──
if (window.AuraXP) { AuraXP.init().then(function(){ AuraXP.refreshBars(); }); }

// ── Status toggle ──
var _status = 'online';
function toggleStatus(e) {
  if (e) e.stopPropagation();
  _status = _status === 'online' ? 'away' : 'online';
  var dot  = document.getElementById('statusDot');
  var txt  = document.getElementById('statusText');
  var pill = document.getElementById('statusPill');
  var label = _status === 'online' ? 'En línea' : 'Ausente';
  if (dot)  { dot.className = 'tb-dd-status-dot ' + _status; }
  if (txt)  { txt.textContent = label; }
  if (pill) { pill.textContent = label; pill.className = 'status-pill' + (_status === 'away' ? ' away' : ''); }
}

// ── Cerrar sesión ──
function cerrarSesion() {
  if (window._aura) { _aura.signOut(); }
  else { localStorage.clear(); window.location.href = 'login.html'; }
}

// ── Cambio de foto de perfil ──
function triggerPhotoUpload() {
  var el = document.getElementById('photoInput');
  if (el) el.click();
}

document.addEventListener('DOMContentLoaded', function () {
  var photoInput = document.getElementById('photoInput');
  if (photoInput) {
    photoInput.addEventListener('change', function (e) {
      var file = e.target.files[0];
      if (!file) return;
      if (window._aura) _aura.uploadAvatar(file);
    });
  }
});

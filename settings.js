(function() {
  var _sb, _profile, _userId;
  var _confirmAction = null;

  /* ── INIT ── */
  function waitForAura(cb, tries) {
    tries = tries || 0;
    if (window._aura && window._aura.sb && window._aura.profile) {
      _sb = window._aura.sb;
      _profile = window._aura.profile;
      _userId = window._aura.userId;
      cb();
    } else if (tries < 60) {
      setTimeout(function() { waitForAura(cb, tries + 1); }, 150);
    } else {
      window.location.href = 'login.html';
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    waitForAura(function() {
      document.getElementById('ld').style.display = 'none';
      document.getElementById('mb').style.display = 'flex';
      populateAll();
    });
  });

  /* ── POPULATE ── */
  function populateAll() {
    var p = _profile;

    // Perfil
    document.getElementById('pf-nombre').value = p.nombre || '';
    document.getElementById('pf-usuario').value = p.usuario || p.username || '';
    document.getElementById('pf-email').value = (window._aura.user && window._aura.user.email) || p.email || '';

    // Avatar
    if (p.foto_url) {
      document.getElementById('av-circle').innerHTML = '<img src="' + p.foto_url + '">';
    } else {
      var nm = p.nombre || 'U';
      var ini = nm.split(' ').map(function(w){return w[0]||'';}).join('').toUpperCase().slice(0,2) || nm[0].toUpperCase();
      document.getElementById('av-circle').textContent = ini;
    }

    // Aprendizaje
    setSelect('ap-nativo', p.idioma_nativo || 'es');
    setSelect('ap-objetivo', p.idioma_objetivo || 'en');
    setSelect('ap-nivel', p.nivel_idioma || 'b1');
    setSelect('ap-meta', p.meta_diaria || '10');

    // Notificaciones (localStorage)
    var notifs = JSON.parse(localStorage.getItem('aura_notifs') || '{}');
    document.getElementById('n-repaso').checked   = notifs.repaso   !== false;
    document.getElementById('n-torneos').checked  = notifs.torneos  !== false;
    document.getElementById('n-novedades').checked = !!notifs.novedades;
    document.getElementById('n-logros').checked   = notifs.logros   !== false;
    if (notifs.hora) document.getElementById('notif-hora').value = notifs.hora;
    if (notifs.repaso !== false) {
      document.getElementById('hora-wrap').style.display = 'flex';
    }

    // Suscripción
    var status = p.plan_status || 'free';
    var planMain = p.plan || 'free';
    var planLabels = {solo:'Solo (1 idioma)', combo:'Combo (3 idiomas)', maestro:'Maestro (5 idiomas)', free:'Free', gratis:'Free'};
    var statusLabels = {active:'Activo ✓', trial:'Período de prueba', payment_failed:'Pago fallido — actualiza tu tarjeta', free:'Gratuito'};
    var statusColors = {active:'var(--good)', trial:'#ffaa3d', payment_failed:'var(--bad)', free:'var(--muted)'};
    document.getElementById('sb-plan-lbl').textContent = planLabels[planMain] || planMain;
    var estadoEl = document.getElementById('sb-estado');
    estadoEl.textContent = statusLabels[status] || status;
    estadoEl.style.color = statusColors[status] || 'var(--muted)';
    var expDate = p.plan_expires_at || p.next_billing_date;
    document.getElementById('sb-fecha').textContent = expDate ? expDate.split('T')[0] : '—';
    document.getElementById('sb-desde').textContent = p.subscribed_at ? p.subscribed_at.split('T')[0] : (p.created_at ? p.created_at.split('T')[0] : '—');

  }

  function setSelect(id, val) {
    var el = document.getElementById(id);
    for (var i = 0; i < el.options.length; i++) {
      if (el.options[i].value === val) { el.selectedIndex = i; break; }
    }
  }

  /* ── TABS ── */
  window.showTab = function(name, el) {
    document.querySelectorAll('.st-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelectorAll('.st-nav-item').forEach(function(i) { i.classList.remove('active'); });
    document.getElementById('tab-' + name).classList.add('active');
    el.classList.add('active');
  };

  /* ── PASSWORD ── */
  window.checkPwStrength = function(val) {
    var bar = document.getElementById('pw-bar');
    var strength = 0;
    if (val.length >= 8) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;
    var w = [0, 25, 50, 75, 100][strength];
    var c = ['', '#ff5a5a', '#ffaa3d', '#c4ff3d', '#4caf50'][strength];
    bar.style.width = w + '%';
    bar.style.background = c;
  };

  window.checkPwMatch = function() {
    var pw1 = document.getElementById('pf-pw1').value;
    var pw2 = document.getElementById('pf-pw2').value;
    var f1 = document.getElementById('field-pw1');
    var f2 = document.getElementById('field-pw2');

    // Clear errors
    f1.classList.remove('has-error');
    f2.classList.remove('has-error');

    if (pw1 && pw1.length < 8) {
      f1.classList.add('has-error');
    }
    if (pw2 && pw1 !== pw2) {
      f2.classList.add('has-error');
    }
  };

  /* ── SAVE PERFIL ── */
  window.savePerfil = async function() {
    var nombre  = document.getElementById('pf-nombre').value.trim();
    var usuario = document.getElementById('pf-usuario').value.trim();
    var pw1     = document.getElementById('pf-pw1').value;
    var pw2     = document.getElementById('pf-pw2').value;

    // Validar contraseña
    if (pw1 || pw2) {
      if (pw1.length < 8) {
        document.getElementById('field-pw1').classList.add('has-error');
        showToast('La contraseña debe tener al menos 8 caracteres', 'error');
        return;
      }
      if (pw1 !== pw2) {
        document.getElementById('field-pw2').classList.add('has-error');
        showToast('Las contraseñas no coinciden', 'error');
        return;
      }
    }

    try {
      // Actualizar perfil
      var updates = { nombre: nombre };
      if (usuario) updates.usuario = usuario;
      var { error } = await _sb.from('profiles').update(updates).eq('id', _userId);
      if (error) throw error;

      // Cambiar contraseña si se llenó
      if (pw1) {
        var { error: pwErr } = await _sb.auth.updateUser({ password: pw1 });
        if (pwErr) throw pwErr;
        document.getElementById('pf-pw1').value = '';
        document.getElementById('pf-pw2').value = '';
        document.getElementById('pw-bar').style.width = '0%';
      }

      _profile.nombre = nombre;
      showToast('Perfil actualizado', 'success');
    } catch(e) {
      showToast(e.message || 'Error al guardar', 'error');
    }
  };

  /* ── SAVE APRENDIZAJE ── */
  window.saveAprendizaje = async function() {
    try {
      var updates = {
        idioma_nativo  : document.getElementById('ap-nativo').value,
        idioma_objetivo: document.getElementById('ap-objetivo').value,
        nivel_idioma   : document.getElementById('ap-nivel').value,
        meta_diaria    : document.getElementById('ap-meta').value
      };
      var { error } = await _sb.from('profiles').update(updates).eq('id', _userId);
      if (error) throw error;
      showToast('Preferencias de aprendizaje guardadas', 'success');
    } catch(e) {
      showToast(e.message || 'Error al guardar', 'error');
    }
  };

  /* ── SAVE NOTIFICACIONES ── */
  window.saveNotificaciones = function() {
    var notifs = {
      repaso   : document.getElementById('n-repaso').checked,
      hora     : document.getElementById('notif-hora').value,
      torneos  : document.getElementById('n-torneos').checked,
      novedades: document.getElementById('n-novedades').checked,
      logros   : document.getElementById('n-logros').checked
    };
    localStorage.setItem('aura_notifs', JSON.stringify(notifs));
    showToast('Preferencias de notificación guardadas', 'success');
  };

  /* ── TOGGLE HORA ── */
  window.toggleHora = function(on) {
    document.getElementById('hora-wrap').style.display = on ? 'flex' : 'none';
  };

  /* ── AVATAR UPLOAD ── */
  window.uploadAvatar = async function(input) {
    var file = input.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { showToast('La imagen debe pesar menos de 2 MB', 'error'); return; }
    try {
      var ext = file.name.split('.').pop();
      var path = _userId + '/avatar.' + ext;
      var { error: upErr } = await _sb.storage.from('avatars').upload(path, file, { upsert: true });
      if (upErr) throw upErr;
      var { data } = _sb.storage.from('avatars').getPublicUrl(path);
      var url = data.publicUrl + '?t=' + Date.now();
      await _sb.from('profiles').update({ foto_url: url }).eq('id', _userId);
      document.getElementById('av-circle').innerHTML = '<img src="' + url + '">';
      showToast('Foto actualizada', 'success');
    } catch(e) {
      showToast(e.message || 'Error al subir la foto', 'error');
    }
  };

  /* ── GESTIÓN HOTMART ── */

  /* ── EXPORT DATA ── */
  window.exportData = async function() {
    try {
      var { data } = await _sb.from('profiles').select('*').eq('id', _userId).single();
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'aura-mis-datos.json';
      a.click();
      showToast('Datos exportados correctamente', 'success');
    } catch(e) {
      showToast('Error al exportar datos', 'error');
    }
  };

  /* ── CONFIRM MODAL ── */
  window.confirmCancel = function() {
    openConfirm(
      '¿Cancelar suscripción?',
      'Serás redirigido al portal de Hotmart para cancelar tu suscripción. Mantendrás el acceso hasta el final del período pagado.',
      null, null,
      function() {
        closeConfirm();
        window.open('https://app-vlc.hotmart.com/subscription', '_blank', 'noopener');
      }
    );
  };

  window.confirmDelete = function() {
    openConfirm(
      'Eliminar cuenta permanentemente',
      'Escribe tu correo electrónico para confirmar. Esta acción borra todos tus datos y no se puede deshacer.',
      'Escribe tu correo para confirmar',
      (window._aura.user && window._aura.user.email) || '',
      async function() {
        var input = document.getElementById('confirm-input').value.trim();
        var email = (window._aura.user && window._aura.user.email) || '';
        if (input !== email) {
          showToast('El correo no coincide', 'error');
          return;
        }
        try {
          await _sb.from('profiles').delete().eq('id', _userId);
          await _sb.auth.signOut();
          window.location.href = 'login.html';
        } catch(e) {
          showToast(e.message || 'Error al eliminar', 'error');
        }
      }
    );
  };

  function openConfirm(title, text, inputPlaceholder, inputExpected, action) {
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-text').textContent  = text;
    var iw = document.getElementById('confirm-input-wrap');
    var ii = document.getElementById('confirm-input');
    if (inputPlaceholder) {
      iw.style.display = 'block';
      ii.placeholder = inputPlaceholder;
      ii.value = '';
    } else {
      iw.style.display = 'none';
    }
    _confirmAction = action;
    var ov = document.getElementById('confirm-overlay');
    ov.style.display = 'flex';
  }

  window.closeConfirm = function() {
    document.getElementById('confirm-overlay').style.display = 'none';
    _confirmAction = null;
  };

  window.confirmOk = function() {
    if (_confirmAction) _confirmAction();
  };

  /* ── TOAST ── */
  function showToast(msg, type) {
    var t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast ' + (type || '');
    t.classList.add('show');
    setTimeout(function() { t.classList.remove('show'); }, 3000);
  }

  /* ── AURA LOGOUT ── */
  // (auraLogout defined below with full implementation)

})();
</script>

window.auraLogout=function(){
  try{if(window._aura&&window._aura.sb)window._aura.sb.auth.signOut();}catch(e){}
  try{localStorage.clear();sessionStorage.clear();}catch(e){}
  window.location.href='login.html';
};
</script>

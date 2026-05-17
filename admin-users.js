// ── ADMIN USERS — gestión de usuarios y uploads ─────────────────────────────
// Globals: _sb, allUsers, novedadesData

/* ── USERS ───────────────────────────────── */
function loadUsers() {
  _sb.from('profiles').select('*').order('created_at', {ascending: false}).then(function(res) {
    allUsers = res.data || [];
    renderUsers(allUsers);
    updateMetrics(allUsers);
    _sb.channel('adm-profiles')
      .on('postgres_changes', {event: '*', schema: 'public', table: 'profiles'}, function() { loadUsers(); })
      .subscribe();
  });
}

function renderUsers(users) {
  var tbody = document.getElementById('u-tbody');
  if (!users.length) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;color:var(--muted);padding:24px">Sin resultados</td></tr>';
    return;
  }
  tbody.innerHTML = users.map(function(u) {
    var plan = u.plan_status || 'free';
    var planCls = plan === 'premium' ? 'plan-pr' : plan === 'pro' ? 'plan-po' : 'plan-fr';
    var planLbl = plan === 'premium' ? 'Premium' : plan === 'pro' ? 'Pro' : 'Free';
    var expira = u.next_billing_date ? u.next_billing_date.split('T')[0] : '—';
    var expStyle = u.next_billing_date && new Date(u.next_billing_date) < new Date(Date.now()+7*86400000) ? ' style="color:var(--bad)"' : '';
    var nm = u.nombre || '?';
    var ini = nm.split(' ').map(function(w){return w[0]||'';}).join('').toUpperCase().slice(0,2);
    var col = ['#c4ff3d','#3d9fff','#ff6b3d','#b03dff','#3dffb0'][(u.id||'').charCodeAt(0)%5];
    var avHtml = u.foto_url
      ? '<div class="u-av" style="background:'+col+'"><img src="'+u.foto_url+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%;"></div>'
      : '<div class="u-av" style="background:'+col+';color:#0a0a0a">'+ini+'</div>';
    return '<tr>' +
      '<td><div class="u-cell">'+avHtml+nm+'</div></td>' +
      '<td class="mu">'+(u.email||'—')+'</td>' +
      '<td><span class="nv-pill">Nv '+(u.nivel||1)+'</span></td>' +
      '<td class="mu">'+(u.rango||'Bronce')+'</td>' +
      '<td>'+(u.aura_points||0)+'</td>' +
      '<td>'+(u.merit_pm||0)+'</td>' +
      '<td>'+(u.lecciones_completadas||0)+'</td>' +
      '<td><span class="plan-badge '+planCls+'">'+planLbl+'</span></td>' +
      '<td'+expStyle+'>'+expira+'</td>' +
      '<td><button class="act-btn" onclick="openUser(\''+u.id+'\')"><i class="ti ti-dots"></i></button></td>' +
      '</tr>';
  }).join('');
}

function filterUsers() {
  var q = (document.getElementById('u-search').value||'').toLowerCase();
  var plan = document.getElementById('u-plan').value;
  renderUsers(allUsers.filter(function(u) {
    var mq = !q || (u.nombre||'').toLowerCase().includes(q) || (u.email||'').toLowerCase().includes(q);
    var mp = !plan || (u.plan_status||'free') === plan;
    return mq && mp;
  }));
}

function updateMetrics(users) {
  document.getElementById('m-total').textContent = users.length;
  document.getElementById('m-pro').textContent = users.filter(function(u){return u.plan_status && u.plan_status!=='free';}).length;
  var week = new Date(Date.now()+7*86400000).toISOString();
  document.getElementById('m-expira').textContent = users.filter(function(u){return u.next_billing_date && u.next_billing_date <= week && u.next_billing_date >= new Date().toISOString();}).length;
  var streaks = users.map(function(u){return u.streak_actual||0;});
  var avg = streaks.length ? Math.round(streaks.reduce(function(a,b){return a+b;},0)/streaks.length) : 0;
  document.getElementById('m-racha').textContent = avg;
}

function exportCSV() {
  var hdr = 'Nombre,Email,Nivel,Rango,Aura Points,Merito,Plan,Vence\n';
  var rows = allUsers.map(function(u){
    return [u.nombre,u.email,u.nivel,u.rango,u.aura_points,u.merit_pm,u.plan_status,u.next_billing_date?u.next_billing_date.split('T')[0]:''].join(',');
  }).join('\n');
  var a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([hdr+rows],{type:'text/csv'}));
  a.download = 'usuarios-aura-' + new Date().toISOString().split('T')[0] + '.csv';
  a.click();
}

function openUser(id) {
  var u = allUsers.find(function(x){return x.id===id;});
  if (!u) return;
  document.getElementById('um-name').textContent = u.nombre || '—';
  document.getElementById('um-plan').value = u.plan_status || 'free';
  document.getElementById('um-expira').value = u.next_billing_date ? u.next_billing_date.split('T')[0] : '';
  document.getElementById('um-role').value = u.role || 'user';
  document.getElementById('um-id').value = id;
  openModal('u-modal');
}

function saveUser() {
  var id = document.getElementById('um-id').value;
  var payload = {
    plan_status: document.getElementById('um-plan').value,
    role: document.getElementById('um-role').value
  };
  var exp = document.getElementById('um-expira').value;
  if (exp) payload.next_billing_date = exp;
  _sb.from('profiles').update(payload).eq('id', id).then(function(res) {
    if (res.error) { showToast('Error: '+res.error.message, true); return; }
    closeModal('u-modal');
    showToast('Usuario actualizado ✓');
    loadUsers();
  });
}

/* ── UPLOAD IMAGEN A SUPABASE STORAGE ───── */
function uploadNovedadImg(input, hiddenId, prevId, lblId) {
  var file = input.files[0];
  if (!file) return;
  var lbl = document.getElementById(lblId);

  // Guard: _sb debe estar listo
  if (!_sb || !_userId) {
    if (lbl) lbl.textContent = 'Error: sesión no lista, recarga la página';
    return;
  }

  if (lbl) { lbl.textContent = 'Subiendo...'; lbl.style.color = 'var(--accent, #c4ff3d)'; }

  var ext = file.name.split('.').pop().toLowerCase().replace(/[^a-z0-9]/g,'') || 'jpg';
  // Path dentro de la carpeta del usuario → respeta RLS del bucket avatars
  var path = _userId + '/novedades/' + Date.now() + '.' + ext;

  _sb.storage.from('avatars').upload(path, file, { upsert: true, contentType: file.type || 'image/jpeg' })
    .then(function(res) {
      if (res.error) {
        console.error('[Admin] Upload error:', res.error);
        if (lbl) { lbl.textContent = '✗ Error: ' + res.error.message; lbl.style.color = '#f43f5e'; }
        return;
      }
      var publicUrl = _sb.storage.from('avatars').getPublicUrl(path).data.publicUrl;
      // Guardar URL en el campo oculto
      document.getElementById(hiddenId).value = publicUrl;
      // Mostrar preview
      var prev = document.getElementById(prevId);
      if (prev) {
        var img = prev.querySelector('img') || prev;
        if (img.tagName === 'IMG') img.src = publicUrl + '?t=' + Date.now();
        prev.style.display = 'block';
      }
      if (lbl) { lbl.textContent = '✓ Imagen lista'; lbl.style.color = '#c4ff3d'; }
      // Reset input para permitir subir el mismo archivo de nuevo
      input.value = '';
    })
    .catch(function(err) {
      console.error('[Admin] Upload catch:', err);
      if (lbl) { lbl.textContent = '✗ Error inesperado'; lbl.style.color = '#f43f5e'; }
    });
}


/* ── UPLOAD IMAGEN A SUPABASE STORAGE ───── */
function uploadNovedadImg(input, hiddenId, prevId, lblId) {
  var file = input.files[0];
  if (!file) return;
  var lbl = document.getElementById(lblId);

  // Guard: _sb debe estar listo
  if (!_sb || !_userId) {
    if (lbl) lbl.textContent = 'Error: sesión no lista, recarga la página';
    return;
  }

  if (lbl) { lbl.textContent = 'Subiendo...'; lbl.style.color = 'var(--accent, #c4ff3d)'; }

  var ext = file.name.split('.').pop().toLowerCase().replace(/[^a-z0-9]/g,'') || 'jpg';
  // Path dentro de la carpeta del usuario → respeta RLS del bucket avatars
  var path = _userId + '/novedades/' + Date.now() + '.' + ext;

  _sb.storage.from('avatars').upload(path, file, { upsert: true, contentType: file.type || 'image/jpeg' })
    .then(function(res) {
      if (res.error) {
        console.error('[Admin] Upload error:', res.error);
        if (lbl) { lbl.textContent = '✗ Error: ' + res.error.message; lbl.style.color = '#f43f5e'; }
        return;
      }
      var publicUrl = _sb.storage.from('avatars').getPublicUrl(path).data.publicUrl;
      // Guardar URL en el campo oculto
      document.getElementById(hiddenId).value = publicUrl;
      // Mostrar preview
      var prev = document.getElementById(prevId);
      if (prev) {
        var img = prev.querySelector('img') || prev;
        if (img.tagName === 'IMG') img.src = publicUrl + '?t=' + Date.now();
        prev.style.display = 'block';
      }
      if (lbl) { lbl.textContent = '✓ Imagen lista'; lbl.style.color = '#c4ff3d'; }
      // Reset input para permitir subir el mismo archivo de nuevo
      input.value = '';
    })
    .catch(function(err) {
      console.error('[Admin] Upload catch:', err);
      if (lbl) { lbl.textContent = '✗ Error inesperado'; lbl.style.color = '#f43f5e'; }
    });
}

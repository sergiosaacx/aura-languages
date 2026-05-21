// ── ADMIN USERS — gestión de usuarios y uploads ─────────────────────────────
// Globals: _sb, allUsers, novedadesData

const SUPABASE_URL  = 'https://vceuxruenbepzflopkbw.supabase.co';
const SUPABASE_ANON = 'sb_publishable_5ZVQnLFhMRYxbI2D77LTxg_WaNPhdUV';

const PLAN_LABELS = { solo:'Solo', combo:'Combo', maestro:'Maestro', free:'Free', gratis:'Free' };
const STATUS_LABELS = { active:'Activo', trial:'Trial', payment_failed:'Fallido', free:'Free' };
const STATUS_CLS = { active:'plan-pr', trial:'plan-tr', payment_failed:'plan-err', free:'plan-fr' };

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
    tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;color:var(--muted);padding:24px">Sin resultados</td></tr>';
    return;
  }
  tbody.innerHTML = users.map(function(u) {
    var status   = u.plan_status || 'free';
    var planMain = u.plan || 'free';
    var badgeCls = STATUS_CLS[status] || 'plan-fr';
    var badgeLbl = status === 'active'
      ? (PLAN_LABELS[planMain] || planMain) + ' ✓'
      : (STATUS_LABELS[status] || status);

    var expDate  = u.plan_expires_at || u.next_billing_date;
    var expira   = expDate ? expDate.split('T')[0] : '—';
    var isExpired = expDate && new Date(expDate) < new Date();
    var expStyle  = isExpired ? ' style="color:var(--bad)"'
      : (expDate && new Date(expDate) < new Date(Date.now()+7*86400000)) ? ' style="color:#ff9800"' : '';

    var nm = u.nombre || '?';
    var ini = nm.split(' ').map(function(w){return w[0]||'';}).join('').toUpperCase().slice(0,2);
    var col = ['#c4ff3d','#3d9fff','#ff6b3d','#b03dff','#3dffb0'][(u.id||'').charCodeAt(0)%5];
    var avHtml = u.foto_url
      ? '<div class="u-av" style="background:'+col+'"><img src="'+u.foto_url+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%;"></div>'
      : '<div class="u-av" style="background:'+col+';color:#0a0a0a">'+ini+'</div>';

    var chargeBtn = '';
    if ((status === 'trial' || status === 'active' || status === 'payment_failed') && u.mp_card_id) {
      var canCharge = isExpired || status === 'payment_failed';
      chargeBtn = '<button class="act-btn" style="'
        + (canCharge ? 'color:var(--accent);border-color:rgba(196,255,61,.4)' : 'color:var(--muted);cursor:not-allowed;opacity:.5')
        + '" onclick="chargeUserNow(\''+u.id+'\')" title="'
        + (canCharge ? 'Cobrar ahora' : 'Plan vigente hasta '+expira)+'">⚡</button>';
    }

    return '<tr>'
      +'<td><div class="u-cell">'+avHtml+nm+'</div></td>'
      +'<td class="mu">'+(u.email||'—')+'</td>'
      +'<td><span class="nv-pill">Nv '+(u.nivel||1)+'</span></td>'
      +'<td class="mu">'+(u.rango||'Bronce')+'</td>'
      +'<td>'+(u.aura_points||0)+'</td>'
      +'<td>'+(u.merit_pm||0)+'</td>'
      +'<td>'+(u.lecciones_completadas||0)+'</td>'
      +'<td><span class="plan-badge '+badgeCls+'">'+badgeLbl+'</span></td>'
      +'<td'+expStyle+'>'+expira+'</td>'
      +'<td style="display:flex;gap:4px;align-items:center">'
        +'<button class="act-btn" onclick="openUser(\''+u.id+'\')"><i class="ti ti-dots"></i></button>'
        +chargeBtn
      +'</td>'
      +'</tr>';
  }).join('');
}

async function chargeUserNow(userId) {
  var u = allUsers.find(function(x){return x.id===userId;});
  if (!u) return;

  var expDate   = u.plan_expires_at || u.next_billing_date;
  var isExpired = expDate && new Date(expDate) < new Date();
  var isFailed  = u.plan_status === 'payment_failed';

  if (!isExpired && !isFailed) {
    showToast('El plan de '+(u.nombre||'este usuario')+' vence el '+(expDate?expDate.split('T')[0]:'—')+'. Aún no se puede cobrar.', true);
    return;
  }

  var planLabel = (PLAN_LABELS[u.plan]||u.plan||'solo') + ' · ' + (u.billing_period||'monthly');
  if (!confirm('¿Cobrar a ' + (u.nombre||'este usuario') + '?\n\nPlan: ' + planLabel)) return;

  showToast('Procesando cobro...');
  try {
    var sessionData = await _sb.auth.getSession();
    var token = (sessionData.data && sessionData.data.session && sessionData.data.session.access_token)
      || SUPABASE_ANON;

    var res = await fetch(SUPABASE_URL + '/functions/v1/charge-single', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ userId: userId }),
    });
    var data = await res.json();

    if (data.success) {
      showToast('✓ Cobro exitoso: ' + (u.nombre||'usuario'));
      loadUsers();
    } else if (data.canCharge === false) {
      showToast(data.message || 'Plan aún vigente', true);
    } else {
      showToast('✗ ' + (data.message || 'Cobro fallido'), true);
    }
  } catch(e) {
    showToast('Error de conexión: ' + e.message, true);
  }
}

function filterUsers() {
  var q    = (document.getElementById('u-search').value||'').toLowerCase();
  var plan = document.getElementById('u-plan').value;
  renderUsers(allUsers.filter(function(u) {
    var mq = !q || (u.nombre||'').toLowerCase().includes(q) || (u.email||'').toLowerCase().includes(q);
    var mp = !plan || (u.plan_status||'free') === plan;
    return mq && mp;
  }));
}

function updateMetrics(users) {
  document.getElementById('m-total').textContent = users.length;
  document.getElementById('m-pro').textContent = users.filter(function(u){
    return u.plan_status === 'active' || u.plan_status === 'trial';
  }).length;
  var week = new Date(Date.now()+7*86400000).toISOString();
  var now  = new Date().toISOString();
  document.getElementById('m-expira').textContent = users.filter(function(u){
    return u.plan_expires_at && u.plan_expires_at <= week && u.plan_expires_at >= now;
  }).length;
  var streaks = users.map(function(u){return u.streak_actual||0;});
  var avg = streaks.length ? Math.round(streaks.reduce(function(a,b){return a+b;},0)/streaks.length) : 0;
  document.getElementById('m-racha').textContent = avg;
}

function exportCSV() {
  var hdr  = 'Nombre,Email,Nivel,Rango,Aura Points,Merito,Plan,Estado,Vence\n';
  var rows = allUsers.map(function(u){
    return [u.nombre,u.email,u.nivel,u.rango,u.aura_points,u.merit_pm,
            u.plan,u.plan_status,u.plan_expires_at?u.plan_expires_at.split('T')[0]:''].join(',');
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
  document.getElementById('um-expira').value = u.plan_expires_at ? u.plan_expires_at.split('T')[0] : '';
  document.getElementById('um-role').value = u.role || 'user';
  document.getElementById('um-id').value = id;
  openModal('u-modal');
}

function saveUser() {
  var id      = document.getElementById('um-id').value;
  var payload = {
    plan_status: document.getElementById('um-plan').value,
    role:        document.getElementById('um-role').value
  };
  var exp = document.getElementById('um-expira').value;
  if (exp) payload.plan_expires_at = new Date(exp + 'T00:00:00').toISOString();
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
  if (!_sb || !_userId) {
    if (lbl) lbl.textContent = 'Error: sesión no lista, recarga la página';
    return;
  }
  if (lbl) { lbl.textContent = 'Subiendo...'; lbl.style.color = 'var(--accent, #c4ff3d)'; }
  var ext  = file.name.split('.').pop().toLowerCase().replace(/[^a-z0-9]/g,'') || 'jpg';
  var path = _userId + '/novedades/' + Date.now() + '.' + ext;
  _sb.storage.from('avatars').upload(path, file, { upsert: true, contentType: file.type || 'image/jpeg' })
    .then(function(res) {
      if (res.error) {
        if (lbl) { lbl.textContent = '✗ Error: ' + res.error.message; lbl.style.color = '#f43f5e'; }
        return;
      }
      var publicUrl = _sb.storage.from('avatars').getPublicUrl(path).data.publicUrl;
      document.getElementById(hiddenId).value = publicUrl;
      var prev = document.getElementById(prevId);
      if (prev) {
        var img = prev.querySelector('img') || prev;
        if (img.tagName === 'IMG') img.src = publicUrl + '?t=' + Date.now();
        prev.style.display = 'block';
      }
      if (lbl) { lbl.textContent = '✓ Imagen lista'; lbl.style.color = '#c4ff3d'; }
      input.value = '';
    })
    .catch(function(err) {
      if (lbl) { lbl.textContent = '✗ Error inesperado'; lbl.style.color = '#f43f5e'; }
    });
}

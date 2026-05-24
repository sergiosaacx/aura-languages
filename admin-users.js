// ── ADMIN USERS — gestión de usuarios y uploads ─────────────────────────────
// Globals: _sb, allUsers, novedadesData

const SUPABASE_URL  = 'https://vceuxruenbepzflopkbw.supabase.co';
const SUPABASE_ANON = 'sb_publishable_5ZVQnLFhMRYxbI2D77LTxg_WaNPhdUV';

const PLAN_LABELS   = { solo:'Solo', combo:'Combo', maestro:'Maestro', courtesy:'Cortesía' };
const MRR_MAP = {
  solo:    { monthly:18,   quarterly:49/3,  annual:199/12 },
  combo:   { monthly:24,   quarterly:69/3,  annual:249/12 },
  maestro: { monthly:49,   quarterly:139/3, annual:499/12 },
};
const LANG_FLAGS   = { en:'🇬🇧', fr:'🇫🇷', it:'🇮🇹', pt:'🇧🇷', es:'🇪🇸' };
const EVENT_LABELS = {
  PURCHASE_APPROVED:        '✅ Pago',
  PURCHASE_REFUNDED:        '↩️ Reembolso',
  PURCHASE_CHARGEBACK:      '⚠️ Chargeback',
  SUBSCRIPTION_CANCELLATION:'❌ Cancelación',
  SUBSCRIPTION_REACTIVATED: '🔄 Reactivación',
  PURCHASE_EXPIRED:         '⏰ Vencido',
};
const PERIOD_LABELS = { monthly:'Mensual', quarterly:'Trimestral', annual:'Anual' };
const STATUS_LABELS = {
  active:          'Activo',
  trial:           'Trial',
  cancelled:       'Cancelado',

  payment_failed:  'Pago fallido',
  refunded:        'Reembolsado',
  chargeback:      'Chargeback',
  expired:         'Vencido',
  pending:         'Pendiente',
};
const STATUS_CLS = {
  active:          'st-active',
  trial:           'st-trial',
  cancelled:       'st-cancelled',
  free:            'st-free',
  payment_failed:  'st-failed',
  refunded:        'st-refunded',
  chargeback:      'st-refunded',
  expired:         'st-cancelled',
  pending:         'st-pending',
};

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
    tbody.innerHTML = '<tr><td colspan="11" style="text-align:center;color:var(--muted);padding:24px">Sin resultados</td></tr>';
    return;
  }
  tbody.innerHTML = users.map(function(u) {
    var status   = u.plan_status || 'sin-plan';
    var planMain = u.plan || null;
    var stCls    = STATUS_CLS[status] || 'st-free';
    var stLbl    = STATUS_LABELS[status] || status;
    var planLbl  = PLAN_LABELS[planMain] || planMain;

    var expDate  = u.plan_expires_at;
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
    if (status === 'trial' || status === 'active') {
      var canCharge = isExpired || status === 'payment_failed';
      chargeBtn = '<button class="act-btn" style="'
        + (canCharge ? 'color:var(--accent);border-color:rgba(196,255,61,.4)' : 'color:var(--muted);cursor:not-allowed;opacity:.5')
        + '" onclick="chargeUserNow(\''+u.id+'\')" title="'
        + (canCharge ? 'Cobrar ahora' : 'Plan vigente hasta '+expira)+'">⚡</button>';
    }

    var langs = Array.isArray(u.selected_languages) && u.selected_languages.length
      ? u.selected_languages.map(function(c){ return LANG_FLAGS[c]||c; }).join(' ')
      : '—';
    var desde = u.created_at ? u.created_at.split('T')[0] : '—';

    return '<tr>'
      +'<td><div class="u-cell">'+avHtml+nm+'</div></td>'
      +'<td class="mu">'+(u.email||'—')+'</td>'
      +'<td style="font-size:16px;letter-spacing:2px">'+langs+'</td>'
      +'<td class="mu" style="font-size:11px">'+desde+'</td>'
      +'<td><span class="nv-pill">Nv '+(u.nivel||1)+'</span></td>'
      +'<td>'+(u.aura_points||0)+'</td>'
      +'<td style="font-size:12px;font-weight:700;color:var(--ink-2);line-height:1.3">'+planLbl
        +(u.billing_period?'<br><span style="font-size:10px;font-weight:600;color:var(--muted);letter-spacing:.04em">'+(PERIOD_LABELS[u.billing_period]||u.billing_period)+'</span>':'')
      +'</td>'
      +'<td><span class="st-badge '+stCls+'">'+stLbl+'</span></td>'
      +'<td'+expStyle+'>'+expira+'</td>'
      +'<td style="display:flex;gap:4px;align-items:center">'
        +'<button class="act-btn" onclick="openUser(''+u.id+'')"><i class="ti ti-dots"></i></button>'
        +chargeBtn
      +'</td>'
      +'</tr>';
  }).join('');
}

async function chargeUserNow(userId) {
  var u = allUsers.find(function(x){return x.id===userId;});
  if (!u) return;

  var expDate   = u.plan_expires_at;
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
    var mp = !plan || u.plan === plan;
    return mq && mp;
  }));
}

function updateMetrics(users) {
  document.getElementById('m-total').textContent = users.length;
  var pagos = users.filter(function(u){ return u.plan_status==='active'||u.plan_status==='trial'; });
  document.getElementById('m-pro').textContent = pagos.length;

  var mrr = 0;
  pagos.forEach(function(u) {
    var pm = MRR_MAP[u.plan]; if (!pm) return;
    mrr += (pm[u.billing_period||'monthly'] || pm.monthly || 0);
  });
  var mrrEl = document.getElementById('m-mrr');
  if (mrrEl) mrrEl.textContent = '$' + mrr.toFixed(0);

  var el = function(id){ return document.getElementById(id); };
  if (el('m-trial'))     el('m-trial').textContent     = users.filter(function(u){ return u.plan_status==='trial'; }).length;
  if (el('m-cancelled')) el('m-cancelled').textContent = users.filter(function(u){ return u.plan_status==='cancelled'; }).length;
  if (el('m-refunded'))  el('m-refunded').textContent  = users.filter(function(u){ return u.plan_status==='refunded'; }).length;

  var now = new Date();
  var alerts = [];
  var trials48 = users.filter(function(u){
    if (u.plan_status!=='trial'||!u.plan_expires_at) return false;
    var d=new Date(u.plan_expires_at); return d>now && d<=new Date(now.getTime()+2*86400000);
  });
  if (trials48.length) alerts.push({ cls:'alert-info', msg:'⏱ <b>'+trials48.length+' trial(s)</b> vencen en menos de 48h — oportunidad de convertir' });
  var venc = users.filter(function(u){ return u.plan_expires_at && new Date(u.plan_expires_at)<now && (u.plan_status==='active'||u.plan_status==='trial'); });
  if (venc.length) alerts.push({ cls:'alert-warn', msg:'⚠️ <b>'+venc.length+' usuario(s)</b> con plan vencido sin actualizar' });
  var canc = users.filter(function(u){ return u.plan_status==='cancelled'; });
  if (canc.length) alerts.push({ cls:'alert-danger', msg:'❌ <b>'+canc.length+' suscripción(es)</b> cancelada(s)' });

  var aw=document.getElementById('alerts-wrap'), ai=document.getElementById('alerts-inner');
  if (aw && ai) {
    aw.style.display = alerts.length ? 'block' : 'none';
    ai.innerHTML = alerts.map(function(a){ return '<div class="alert-card '+a.cls+'">'+a.msg+'</div>'; }).join('');
  }

  document.getElementById('m-expira').textContent = users.filter(function(u){
    if (!u.plan_expires_at) return false;
    var d=new Date(u.plan_expires_at); return d>now && d<new Date(now.getTime()+7*86400000);
  }).length;
  var streaks = users.map(function(u){return u.streak_actual||0;});
  document.getElementById('m-racha').textContent = streaks.length
    ? Math.round(streaks.reduce(function(a,b){return a+b;},0)/streaks.length) : 0;
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
  document.getElementById('um-plan').value = u.plan_status || '';
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

window.loadPaymentHistory = async function() {
  var tbody = document.getElementById('ph-tbody');
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:24px">Cargando...</td></tr>';
  try {
    var res = await _sb.from('payment_history').select('*').order('created_at',{ascending:false}).limit(300);
    var rows = res.data || [];
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:24px">Sin registros aún. Los pagos aparecerán aquí a medida que se procesen.</td></tr>';
      return;
    }
    tbody.innerHTML = rows.map(function(r) {
      var evtLbl  = EVENT_LABELS[r.event]          || r.event;
      var planLbl = PLAN_LABELS[r.plan]            || r.plan  || '—';
      var perLbl  = PERIOD_LABELS[r.billing_period]|| r.billing_period || '—';
      var fecha   = r.created_at ? r.created_at.replace('T',' ').slice(0,16) : '—';
      var monto   = r.amount_usd != null ? '$'+Number(r.amount_usd).toFixed(2) : '—';
      var isNeg   = r.event && (r.event.includes('REFUND')||r.event.includes('CHARGE')||r.event.includes('CANCEL'));
      return '<tr>'
        +'<td style="font-size:12px;font-weight:700">'+(r.nombre||'—')+'</td>'
        +'<td class="mu" style="font-size:11px">'+(r.email||'—')+'</td>'
        +'<td style="font-size:12px;font-weight:700">'+planLbl+'</td>'
        +'<td style="font-size:11px;color:var(--muted)">'+perLbl+'</td>'
        +'<td>'+evtLbl+'</td>'
        +'<td style="font-size:12px;font-weight:800;'+(isNeg?'color:#ef4444':'color:#c4ff3d')+'">'+monto+'</td>'
        +'<td style="font-size:11px;color:var(--muted)">'+fecha+'</td>'
        +'</tr>';
    }).join('');
  } catch(e) {
    console.error('loadPaymentHistory:', e);
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:24px">Error cargando historial</td></tr>';
  }
};

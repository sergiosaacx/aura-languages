// aura-friends.js — Sistema de amigos y chat en tiempo real · Aura Languages
// Depende de: aura-supabase.js (window._aura.sb, window._aura.userId)
(function () {
  'use strict';

  var sb, ME;
  var chatChannel = null;
  var currentChatWith = null;
  var panelOpen = false;
  var activeTab = 'friends';

  // ─── ESTILOS ────────────────────────────────────────────────────────────────
  function injectStyles() {
    var css = [
      /* ── Panel de amigos ── */
      '#af-panel{',
        'position:fixed;top:0;right:82px;width:290px;height:100vh;',
        'background:rgba(8,7,26,0.97);border-left:1px solid rgba(124,58,237,0.3);',
        'z-index:9998;display:flex;flex-direction:column;',
        'transform:translateX(400px);transition:transform .3s cubic-bezier(.4,0,.2,1);',
        'backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);',
        'box-shadow:-8px 0 40px rgba(0,0,0,0.5);',
      '}',
      '#af-panel.af-open{transform:translateX(0);}',

      '.af-header{display:flex;align-items:center;justify-content:space-between;',
        'padding:18px 16px 14px;border-bottom:1px solid rgba(124,58,237,0.2);}',
      '.af-header h3{margin:0;font-family:Inter,sans-serif;font-size:15px;font-weight:800;',
        'color:#f0ede6;letter-spacing:.02em;}',
      '.af-close{background:none;border:none;color:#666;font-size:17px;cursor:pointer;',
        'padding:4px 6px;line-height:1;border-radius:6px;transition:all .2s;}',
      '.af-close:hover{color:#f0ede6;background:rgba(255,255,255,.08);}',

      /* Tabs */
      '.af-tabs{display:flex;border-bottom:1px solid rgba(124,58,237,0.2);}',
      '.af-tab{flex:1;padding:10px 4px;background:none;border:none;color:#666;',
        'font-family:Open Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;',
        'transition:color .2s;border-bottom:2px solid transparent;',
        'letter-spacing:.04em;text-transform:uppercase;}',
      '.af-tab.active{color:#a855f7;border-bottom-color:#a855f7;}',
      '.af-tab:hover:not(.active){color:#c084fc;}',

      /* Content */
      '.af-content{flex:1;overflow-y:auto;padding:10px;}',
      '.af-content::-webkit-scrollbar{width:3px;}',
      '.af-content::-webkit-scrollbar-thumb{background:rgba(124,58,237,.4);border-radius:2px;}',

      /* Search */
      '.af-search-wrap{position:relative;margin-bottom:10px;}',
      '.af-search{width:100%;background:rgba(255,255,255,.05);',
        'border:1px solid rgba(124,58,237,.25);border-radius:8px;',
        'padding:9px 36px 9px 12px;color:#f0ede6;',
        'font-family:Open Sans,sans-serif;font-size:13px;outline:none;',
        'box-sizing:border-box;transition:border-color .2s;}',
      '.af-search:focus{border-color:rgba(168,85,247,.6);}',
      '.af-search::placeholder{color:#444;}',
      '.af-search-btn{position:absolute;right:8px;top:50%;transform:translateY(-50%);',
        'background:none;border:none;color:#a855f7;cursor:pointer;font-size:15px;padding:0;}',

      /* User rows */
      '.af-user-row{display:flex;align-items:center;gap:10px;padding:9px 8px;',
        'border-radius:10px;transition:background .2s;}',
      '.af-user-row:hover{background:rgba(124,58,237,.1);}',
      '.af-avatar{width:40px;height:40px;border-radius:50%;',
        'background:linear-gradient(135deg,#7c3aed,#a855f7);',
        'display:flex;align-items:center;justify-content:center;',
        'font-weight:700;color:#fff;font-size:13px;flex-shrink:0;overflow:hidden;',
        'font-family:Inter,sans-serif;}',
      '.af-avatar img{width:100%;height:100%;object-fit:cover;}',
      '.af-user-info{flex:1;min-width:0;}',
      '.af-user-name{font-family:Inter,sans-serif;font-size:13px;font-weight:600;',
        'color:#f0ede6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
      '.af-user-sub{font-family:Open Sans,sans-serif;font-size:11px;color:#666;margin-top:1px;}',
      '.af-actions{display:flex;gap:5px;flex-shrink:0;}',

      /* Buttons */
      '.af-btn{padding:5px 11px;border-radius:7px;font-family:Open Sans,sans-serif;',
        'font-size:11px;font-weight:700;cursor:pointer;transition:all .2s;border:none;}',
      '.af-btn-primary{background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;}',
      '.af-btn-primary:hover{opacity:.85;}',
      '.af-btn-secondary{background:rgba(255,255,255,.07);color:#999;',
        'border:1px solid rgba(255,255,255,.1);}',
      '.af-btn-secondary:hover{background:rgba(255,255,255,.12);color:#f0ede6;}',
      '.af-btn-danger{background:rgba(239,68,68,.15);color:#f87171;',
        'border:1px solid rgba(239,68,68,.2);}',
      '.af-btn-danger:hover{background:rgba(239,68,68,.28);}',
      '.af-btn-chat{background:rgba(124,58,237,.2);color:#c084fc;',
        'border:1px solid rgba(124,58,237,.3);}',
      '.af-btn-chat:hover{background:rgba(124,58,237,.35);}',
      '.af-btn-icon{width:28px;height:28px;padding:0;display:flex;align-items:center;',
        'justify-content:center;font-size:13px;}',

      /* Empty / section */
      '.af-empty{text-align:center;padding:30px 16px;color:#555;',
        'font-family:Open Sans,sans-serif;font-size:13px;}',
      '.af-empty-icon{font-size:30px;margin-bottom:8px;}',
      '.af-section-title{font-family:Open Sans,sans-serif;font-size:10px;font-weight:700;',
        'color:#555;text-transform:uppercase;letter-spacing:.08em;margin:8px 8px 4px;}',
      '.af-divider{height:1px;background:rgba(124,58,237,.15);margin:8px 0;}',
      '.af-badge{display:inline-block;min-width:16px;height:16px;background:#ef4444;',
        'color:#fff;border-radius:8px;font-size:10px;font-weight:700;',
        'text-align:center;line-height:16px;padding:0 4px;margin-left:4px;}',

      /* ── Chat window ── */
      '#af-chat{position:fixed;bottom:80px;right:90px;width:300px;height:420px;',
        'background:rgba(8,7,26,0.97);border:1px solid rgba(124,58,237,.35);',
        'border-radius:16px;z-index:9997;display:flex;flex-direction:column;',
        'transform:scale(.9) translateY(20px);opacity:0;pointer-events:none;',
        'transition:all .25s cubic-bezier(.4,0,.2,1);',
        'backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);',
        'box-shadow:0 20px 60px rgba(0,0,0,.6),0 0 0 1px rgba(168,85,247,.1);}',
      '#af-chat.af-chat-open{transform:scale(1) translateY(0);opacity:1;pointer-events:auto;}',

      '.af-chat-header{display:flex;align-items:center;gap:10px;padding:12px 14px;',
        'border-bottom:1px solid rgba(124,58,237,.2);border-radius:16px 16px 0 0;}',
      '.af-chat-av{width:32px;height:32px;border-radius:50%;',
        'background:linear-gradient(135deg,#7c3aed,#a855f7);',
        'display:flex;align-items:center;justify-content:center;',
        'font-weight:700;color:#fff;font-size:12px;flex-shrink:0;overflow:hidden;}',
      '.af-chat-av img{width:100%;height:100%;object-fit:cover;}',
      '.af-chat-name{flex:1;font-family:Inter,sans-serif;font-size:13px;font-weight:700;color:#f0ede6;}',
      '.af-chat-close{background:none;border:none;color:#555;font-size:15px;',
        'cursor:pointer;padding:3px;border-radius:5px;transition:all .2s;}',
      '.af-chat-close:hover{color:#f0ede6;background:rgba(255,255,255,.08);}',

      '.af-chat-msgs{flex:1;overflow-y:auto;padding:12px;',
        'display:flex;flex-direction:column;gap:7px;}',
      '.af-chat-msgs::-webkit-scrollbar{width:3px;}',
      '.af-chat-msgs::-webkit-scrollbar-thumb{background:rgba(124,58,237,.4);border-radius:2px;}',

      '.af-msg{max-width:78%;padding:7px 11px;border-radius:12px;',
        'font-family:Open Sans,sans-serif;font-size:12px;line-height:1.5;word-break:break-word;}',
      '.af-msg-out{align-self:flex-end;',
        'background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;',
        'border-bottom-right-radius:3px;}',
      '.af-msg-in{align-self:flex-start;background:rgba(255,255,255,.07);',
        'color:#e2e8f0;border-bottom-left-radius:3px;}',
      '.af-msg-time{font-size:9px;opacity:.45;margin-top:2px;display:block;text-align:right;}',

      '.af-chat-input-wrap{display:flex;gap:7px;padding:10px 12px;',
        'border-top:1px solid rgba(124,58,237,.2);border-radius:0 0 16px 16px;}',
      '.af-chat-input{flex:1;background:rgba(255,255,255,.05);',
        'border:1px solid rgba(124,58,237,.25);border-radius:8px;',
        'padding:7px 10px;color:#f0ede6;font-family:Open Sans,sans-serif;',
        'font-size:12px;outline:none;resize:none;transition:border-color .2s;}',
      '.af-chat-input:focus{border-color:rgba(168,85,247,.5);}',
      '.af-chat-input::placeholder{color:#444;}',
      '.af-chat-send{background:linear-gradient(135deg,#7c3aed,#a855f7);border:none;',
        'border-radius:8px;padding:7px 13px;color:#fff;cursor:pointer;',
        'font-size:14px;transition:opacity .2s;flex-shrink:0;}',
      '.af-chat-send:hover{opacity:.85;}',

      /* Loading spinner */
      '.af-spinner{text-align:center;padding:24px;color:#555;font-size:22px;}',
    ].join('');

    var s = document.createElement('style');
    s.id = 'af-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ─── AVATAR HELPER ──────────────────────────────────────────────────────────
  function makeAvatarHtml(user, size) {
    var initials = ((user && user.nombre) || 'U')
      .split(' ').filter(Boolean).map(function(w){return w[0];}).join('').toUpperCase().slice(0,2);
    if (user && user.foto_url) {
      return '<img src="' + user.foto_url + '" alt="' + initials + '">';
    }
    return initials;
  }

  function fmtTime(iso) {
    var d = new Date(iso);
    return d.getHours() + ':' + String(d.getMinutes()).padStart(2,'0');
  }

  // ─── BUILD PANEL ────────────────────────────────────────────────────────────
  function buildPanel() {
    if (document.getElementById('af-panel')) return;
    var el = document.createElement('div');
    el.id = 'af-panel';
    el.innerHTML =
      '<div class="af-header">' +
        '<h3>👥 Amigos</h3>' +
        '<button class="af-close" id="af-close-btn">✕</button>' +
      '</div>' +
      '<div class="af-tabs">' +
        '<button class="af-tab active" data-tab="friends">Amigos</button>' +
        '<button class="af-tab" data-tab="requests">Solicitudes' +
          '<span id="af-req-badge" class="af-badge" style="display:none">0</span>' +
        '</button>' +
        '<button class="af-tab" data-tab="add">Agregar</button>' +
      '</div>' +
      '<div class="af-content" id="af-content"><div class="af-spinner">⏳</div></div>';
    document.body.appendChild(el);

    el.querySelectorAll('.af-tab').forEach(function(btn) {
      btn.addEventListener('click', function() {
        el.querySelectorAll('.af-tab').forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        renderTab(btn.dataset.tab);
      });
    });
    document.getElementById('af-close-btn').addEventListener('click', closePanel);
  }

  // ─── BUILD CHAT WINDOW ──────────────────────────────────────────────────────
  function buildChat() {
    if (document.getElementById('af-chat')) return;
    var el = document.createElement('div');
    el.id = 'af-chat';
    el.innerHTML =
      '<div class="af-chat-header">' +
        '<div class="af-chat-av" id="af-chat-av"></div>' +
        '<span class="af-chat-name" id="af-chat-name">Chat</span>' +
        '<button class="af-chat-close" id="af-chat-close-btn">✕</button>' +
      '</div>' +
      '<div class="af-chat-msgs" id="af-chat-msgs"></div>' +
      '<div class="af-chat-input-wrap">' +
        '<textarea class="af-chat-input" id="af-chat-input" rows="1" placeholder="Escribe un mensaje..."></textarea>' +
        '<button class="af-chat-send" id="af-chat-send-btn">➤</button>' +
      '</div>';
    document.body.appendChild(el);

    document.getElementById('af-chat-close-btn').addEventListener('click', closeChat);
    document.getElementById('af-chat-send-btn').addEventListener('click', sendMessage);
    document.getElementById('af-chat-input').addEventListener('keydown', function(e){
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
  }

  // ─── PANEL CONTROL ──────────────────────────────────────────────────────────
  function openPanel(tab) {
    activeTab = tab || activeTab;
    var panel = document.getElementById('af-panel');
    if (!panel) return;
    panel.classList.add('af-open');
    panelOpen = true;
    panel.querySelectorAll('.af-tab').forEach(function(b){
      b.classList.toggle('active', b.dataset.tab === activeTab);
    });
    renderTab(activeTab);
  }

  function closePanel() {
    var panel = document.getElementById('af-panel');
    if (panel) panel.classList.remove('af-open');
    panelOpen = false;
  }

  function togglePanel(tab) {
    if (panelOpen && activeTab === tab) { closePanel(); }
    else { openPanel(tab); }
  }

  // ─── TAB ROUTER ─────────────────────────────────────────────────────────────
  function renderTab(tab) {
    activeTab = tab;
    var content = document.getElementById('af-content');
    if (!content) return;
    content.innerHTML = '<div class="af-spinner">⏳</div>';
    if (tab === 'friends')  renderFriends(content);
    else if (tab === 'requests') renderRequests(content);
    else if (tab === 'add')      renderAdd(content);
  }

  // ─── FRIENDS TAB ────────────────────────────────────────────────────────────
  async function renderFriends(content) {
    var res = await sb.from('friendships')
      .select(
        'id, requester_id, addressee_id, status,' +
        'requester:profiles!friendships_requester_id_fkey(id,nombre,foto_url,nivel,rango),' +
        'addressee:profiles!friendships_addressee_id_fkey(id,nombre,foto_url,nivel,rango)'
      )
      .eq('status', 'accepted')
      .or('requester_id.eq.' + ME + ',addressee_id.eq.' + ME);

    var data = res.data || [];
    if (data.length === 0) {
      content.innerHTML =
        '<div class="af-empty">' +
          '<div class="af-empty-icon">🤝</div>' +
          'Aún no tienes amigos.<br>¡Agrega uno para empezar!' +
        '</div>';
      return;
    }
    content.innerHTML = '';
    data.forEach(function(f) {
      var friend = f.requester_id === ME ? f.addressee : f.requester;
      if (!friend) return;
      content.appendChild(buildUserRow(friend, 'friend'));
    });
  }

  // ─── REQUESTS TAB ───────────────────────────────────────────────────────────
  async function renderRequests(content) {
    var resRec = await sb.from('friendships')
      .select('id, requester:profiles!friendships_requester_id_fkey(id,nombre,foto_url,nivel,rango)')
      .eq('addressee_id', ME)
      .eq('status', 'pending');

    var resSent = await sb.from('friendships')
      .select('id, addressee:profiles!friendships_addressee_id_fkey(id,nombre,foto_url,nivel,rango)')
      .eq('requester_id', ME)
      .eq('status', 'pending');

    var received = resRec.data || [];
    var sent     = resSent.data || [];

    if (received.length === 0 && sent.length === 0) {
      content.innerHTML =
        '<div class="af-empty">' +
          '<div class="af-empty-icon">📭</div>No hay solicitudes pendientes.' +
        '</div>';
      return;
    }
    content.innerHTML = '';

    if (received.length > 0) {
      var t1 = document.createElement('div');
      t1.className = 'af-section-title';
      t1.textContent = 'Recibidas';
      content.appendChild(t1);
      received.forEach(function(f) {
        if (f.requester) content.appendChild(buildUserRow(f.requester, 'received', f.id));
      });
    }
    if (sent.length > 0) {
      if (received.length > 0) {
        var div = document.createElement('div'); div.className = 'af-divider';
        content.appendChild(div);
      }
      var t2 = document.createElement('div');
      t2.className = 'af-section-title';
      t2.textContent = 'Enviadas';
      content.appendChild(t2);
      sent.forEach(function(f) {
        if (f.addressee) content.appendChild(buildUserRow(f.addressee, 'sent', f.id));
      });
    }
  }

  // ─── ADD FRIEND TAB ─────────────────────────────────────────────────────────
  function renderAdd(content) {
    content.innerHTML =
      '<div class="af-search-wrap">' +
        '<input class="af-search" id="af-search-input" type="text" placeholder="Buscar usuario por nombre...">' +
        '<button class="af-search-btn" id="af-search-btn">🔍</button>' +
      '</div>' +
      '<div id="af-search-results"></div>' +
      '<div id="af-sug-wrap">' +
        '<div class="af-section-title" id="af-sug-title">Sugerencias</div>' +
        '<div id="af-suggestions"><div class="af-spinner">⏳</div></div>' +
      '</div>';

    document.getElementById('af-search-btn').addEventListener('click', doSearch);
    document.getElementById('af-search-input').addEventListener('keydown', function(e){
      if (e.key === 'Enter') doSearch();
    });
    // Ocultar sugerencias al escribir, mostrar al borrar
    document.getElementById('af-search-input').addEventListener('input', function() {
      var wrap = document.getElementById('af-sug-wrap');
      var results = document.getElementById('af-search-results');
      if (this.value.trim()) {
        if (wrap) wrap.style.display = 'none';
      } else {
        if (wrap) wrap.style.display = 'block';
        if (results) results.innerHTML = '';
      }
    });
    loadSuggestions();
  }

  async function loadSuggestions() {
    var sugEl = document.getElementById('af-suggestions');
    if (!sugEl) return;

    // IDs a excluir: yo + relaciones existentes
    var resF = await sb.from('friendships')
      .select('requester_id,addressee_id')
      .or('requester_id.eq.' + ME + ',addressee_id.eq.' + ME);

    var excluded = {};
    excluded[ME] = true;
    (resF.data || []).forEach(function(f) {
      excluded[f.requester_id] = true;
      excluded[f.addressee_id] = true;
    });

    // Traer hasta 100 perfiles y filtrar excluidos
    var res = await sb.from('profiles')
      .select('id,nombre,foto_url,nivel,rango')
      .limit(100);

    var users = (res.data || []).filter(function(u) { return !excluded[u.id]; });

    // Fisher-Yates shuffle → tomar 10
    for (var i = users.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = users[i]; users[i] = users[j]; users[j] = tmp;
    }
    users = users.slice(0, 10);

    sugEl.innerHTML = '';
    if (users.length === 0) {
      sugEl.innerHTML = '<div class="af-empty"><div class="af-empty-icon">👥</div>No hay más usuarios por descubrir.</div>';
      return;
    }
    users.forEach(function(u) { sugEl.appendChild(buildUserRow(u, 'search', null, undefined)); });
  }

  async function doSearch() {
    var query = ((document.getElementById('af-search-input') || {}).value || '').trim();
    var results = document.getElementById('af-search-results');
    if (!results) return;
    if (!query) {
      results.innerHTML = '';
      var wrap = document.getElementById('af-sug-wrap');
      if (wrap) wrap.style.display = 'block';
      return;
    }
    // Ocultar sugerencias mientras se busca
    var sugWrap = document.getElementById('af-sug-wrap');
    if (sugWrap) sugWrap.style.display = 'none';

    results.innerHTML = '<div class="af-empty">⏳ Buscando...</div>';

    var res = await sb.from('profiles')
      .select('id,nombre,foto_url,nivel,rango')
      .ilike('nombre', '%' + query + '%')
      .neq('id', ME)
      .limit(12);

    var users = res.data || [];
    if (users.length === 0) {
      results.innerHTML = '<div class="af-empty"><div class="af-empty-icon">🔍</div>Sin resultados.</div>';
      return;
    }

    // Fetch existing relationships with these users
    var ids = users.map(function(u){ return u.id; });
    var resF = await sb.from('friendships')
      .select('requester_id,addressee_id,status')
      .or('requester_id.eq.' + ME + ',addressee_id.eq.' + ME);

    var statusMap = {};
    (resF.data || []).forEach(function(f) {
      var other = f.requester_id === ME ? f.addressee_id : f.requester_id;
      statusMap[other] = f.status;
    });

    results.innerHTML = '';
    users.forEach(function(u) {
      results.appendChild(buildUserRow(u, 'search', null, statusMap[u.id]));
    });
  }

  // ─── USER ROW BUILDER ───────────────────────────────────────────────────────
  function buildUserRow(user, type, friendshipId, existingStatus) {
    var row = document.createElement('div');
    row.className = 'af-user-row';

    var avHtml = makeAvatarHtml(user);
    var actions = '';

    if (type === 'friend') {
      actions =
        '<button class="af-btn af-btn-chat af-btn-icon" title="Chatear" ' +
          'data-uid="' + user.id + '" data-name="' + (user.nombre||'') + '" ' +
          'data-foto="' + (user.foto_url||'') + '">💬</button>';
    } else if (type === 'received') {
      actions =
        '<button class="af-btn af-btn-primary af-btn-icon" data-action="accept" data-fid="' + friendshipId + '" title="Aceptar">✓</button>' +
        '<button class="af-btn af-btn-danger  af-btn-icon" data-action="reject" data-fid="' + friendshipId + '" title="Rechazar">✕</button>';
    } else if (type === 'sent') {
      actions = '<span style="font-size:10px;color:#555;font-family:Open Sans,sans-serif;">Pendiente</span>';
    } else if (type === 'search') {
      if (existingStatus === 'accepted') {
        actions = '<span style="font-size:10px;color:#22c55e;font-family:Open Sans,sans-serif;font-weight:700;">✓ Amigos</span>';
      } else if (existingStatus === 'pending') {
        actions = '<span style="font-size:10px;color:#555;font-family:Open Sans,sans-serif;">Enviada</span>';
      } else {
        actions = '<button class="af-btn af-btn-primary" data-action="add" data-uid="' + user.id + '">+ Agregar</button>';
      }
    }

    row.innerHTML =
      '<div class="af-avatar">' + avHtml + '</div>' +
      '<div class="af-user-info">' +
        '<div class="af-user-name">' + (user.nombre || 'Usuario') + '</div>' +
        '<div class="af-user-sub">Lv ' + (user.nivel||1) + ' · ' + (user.rango||'Bronce') + '</div>' +
      '</div>' +
      '<div class="af-actions">' + actions + '</div>';

    // Wire buttons
    row.querySelectorAll('[data-action]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var act = btn.dataset.action;
        if (act === 'add')    sendFriendRequest(btn.dataset.uid, btn);
        if (act === 'accept') respondRequest(btn.dataset.fid, 'accepted');
        if (act === 'reject') respondRequest(btn.dataset.fid, 'rejected');
      });
    });

    // Chat button
    var chatBtn = row.querySelector('[data-uid][title="Chatear"]');
    if (chatBtn) {
      chatBtn.addEventListener('click', function() {
        openChat({
          id: chatBtn.dataset.uid,
          nombre: chatBtn.dataset.name,
          foto_url: chatBtn.dataset.foto || null
        });
      });
    }
    return row;
  }

  // ─── FRIEND ACTIONS ─────────────────────────────────────────────────────────
  async function sendFriendRequest(userId, btn) {
    btn.disabled = true;
    btn.textContent = '⏳';

    var res = await sb.from('friendships').insert({
      requester_id: ME,
      addressee_id: userId,
      status: 'pending'
    });

    if (res.error) {
      console.warn('[Friends] Error al enviar solicitud:', res.error.message);
      btn.disabled = false;
      btn.textContent = '+ Agregar';
    } else {
      btn.textContent = 'Enviada ✓';
      btn.className = 'af-btn af-btn-secondary';
      btn.disabled = true;
    }
  }

  async function respondRequest(friendshipId, status) {
    await sb.from('friendships').update({ status: status }).eq('id', friendshipId);
    var content = document.getElementById('af-content');
    if (content) renderRequests(content);
    checkPendingRequests();
  }

  // ─── CHAT ───────────────────────────────────────────────────────────────────
  async function openChat(friend) {
    currentChatWith = friend;
    var chat = document.getElementById('af-chat');
    if (!chat) return;

    // Header
    var avEl   = document.getElementById('af-chat-av');
    var nameEl = document.getElementById('af-chat-name');
    if (avEl)   avEl.innerHTML  = makeAvatarHtml(friend);
    if (nameEl) nameEl.textContent = friend.nombre || 'Chat';

    // Load history + subscribe
    await loadMessages(friend.id);
    subscribeToChat(friend.id);

    chat.classList.add('af-chat-open');
  }

  function closeChat() {
    var chat = document.getElementById('af-chat');
    if (chat) chat.classList.remove('af-chat-open');
    if (chatChannel) { try { sb.removeChannel(chatChannel); } catch(e){} chatChannel = null; }
    currentChatWith = null;
  }

  async function loadMessages(friendId) {
    var msgs = document.getElementById('af-chat-msgs');
    if (!msgs) return;
    msgs.innerHTML = '<div class="af-spinner">⏳</div>';

    var res = await sb.from('messages')
      .select('*')
      .or(
        'and(sender_id.eq.' + ME + ',receiver_id.eq.' + friendId + '),' +
        'and(sender_id.eq.' + friendId + ',receiver_id.eq.' + ME + ')'
      )
      .order('created_at', { ascending: true })
      .limit(60);

    msgs.innerHTML = '';
    if (!res.data || res.data.length === 0) {
      msgs.innerHTML =
        '<div style="text-align:center;color:#555;font-size:12px;' +
        'font-family:Open Sans,sans-serif;padding:24px;">¡Di hola! 👋</div>';
      return;
    }
    res.data.forEach(function(m){ appendMessage(m, false); });
    msgs.scrollTop = msgs.scrollHeight;
  }

  function appendMessage(msg, scroll) {
    var msgs = document.getElementById('af-chat-msgs');
    if (!msgs) return;

    // Remove placeholder
    var ph = msgs.querySelector('div[style*="Di hola"]');
    if (ph) ph.remove();

    var isOut = msg.sender_id === ME;
    var div = document.createElement('div');
    div.className = 'af-msg ' + (isOut ? 'af-msg-out' : 'af-msg-in');

    var escaped = msg.content
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    div.innerHTML = escaped + '<span class="af-msg-time">' + fmtTime(msg.created_at) + '</span>';
    msgs.appendChild(div);

    if (scroll !== false) msgs.scrollTop = msgs.scrollHeight;
  }

  async function sendMessage() {
    if (!currentChatWith) return;
    var input = document.getElementById('af-chat-input');
    if (!input) return;
    var content = input.value.trim();
    if (!content) return;
    input.value = '';

    var res = await sb.from('messages').insert({
      sender_id:   ME,
      receiver_id: currentChatWith.id,
      content:     content
    });
    if (res.error) {
      console.warn('[Friends] Error enviando mensaje:', res.error.message);
      input.value = content;
    }
    // Realtime subscription will render the message
  }

  function subscribeToChat(friendId) {
    if (chatChannel) { try { sb.removeChannel(chatChannel); } catch(e){} }

    chatChannel = sb
      .channel('af-chat-' + [ME, friendId].sort().join('-'))
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'messages',
        filter: 'receiver_id=eq.' + ME
      }, function(payload) {
        if (payload.new && payload.new.sender_id === friendId) {
          appendMessage(payload.new);
        }
      })
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'messages',
        filter: 'sender_id=eq.' + ME
      }, function(payload) {
        if (payload.new && payload.new.receiver_id === friendId) {
          appendMessage(payload.new);
        }
      })
      .subscribe();
  }

  // ─── BADGE ──────────────────────────────────────────────────────────────────
  async function checkPendingRequests() {
    try {
      var res = await sb.from('friendships')
        .select('*', { count: 'exact', head: true })
        .eq('addressee_id', ME)
        .eq('status', 'pending');

      var count = res.count || 0;
      var badge = document.getElementById('af-req-badge');
      if (badge) {
        badge.style.display = count > 0 ? 'inline-block' : 'none';
        badge.textContent = count;
      }
    } catch(e) {}
  }

  // ─── WIRE SIDEBAR BUTTONS ───────────────────────────────────────────────────
  function wireSidebarButtons() {
    var attempts = 0;
    var t = setInterval(function() {
      attempts++;
      var addBtn  = document.querySelector('[title="Agregar amigo"]');
      var chatBtn = document.querySelector('[title="Chat"]');
      if (addBtn || chatBtn || attempts > 60) {
        clearInterval(t);
        if (addBtn) addBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          togglePanel('add');
        });
        if (chatBtn) chatBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          togglePanel('friends');
        });
      }
    }, 250);
  }

  // ─── INIT ────────────────────────────────────────────────────────────────────
  function init() {
    sb = window._aura.sb;
    ME = window._aura.userId;
    injectStyles();
    buildPanel();
    buildChat();
    wireSidebarButtons();
    checkPendingRequests();
    setInterval(checkPendingRequests, 60000);
  }

  document.addEventListener('DOMContentLoaded', function() {
    var t = setInterval(function() {
      if (window._aura && window._aura.sb && window._aura.userId) {
        clearInterval(t);
        init();
      }
    }, 300);
  });

})();

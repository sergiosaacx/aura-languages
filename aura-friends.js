// aura-friends.js — Sistema de amigos y chat v2 · Aura Languages
// Requiere: aura-supabase.js (window._aura.sb, window._aura.userId)
(function () {
  'use strict';

  var sb, ME;
  var activePanel   = null;       // 'friends' | 'chat' | null
  var activeFriend  = null;       // { id, nombre, foto_url } — conversación activa
  var chatChannel   = null;       // canal realtime activo
  var friendsCache  = [];         // amigos aceptados
  var unreadCounts  = {};         // { friendId: N }
  var TOAST_TIMER   = null;

  // ═══════════════════════════════════════════════════════════════════════════
  //  ESTILOS
  // ═══════════════════════════════════════════════════════════════════════════
  function injectStyles() {
    var css = '\
/* ── Panel base glass ───────────────────────────────────────────────────── */\
.af-panel{\
  position:fixed;top:0;right:82px;width:290px;height:100vh;\
  background:rgba(8,6,24,0.80);\
  backdrop-filter:blur(28px) saturate(180%);\
  -webkit-backdrop-filter:blur(28px) saturate(180%);\
  border-left:1px solid rgba(124,58,237,0.28);\
  box-shadow:-6px 0 40px rgba(0,0,0,0.55),\
             inset 1px 0 0 rgba(168,85,247,0.07),\
             inset 0 1px 0 rgba(168,85,247,0.05);\
  z-index:9998;display:flex;flex-direction:column;\
  transform:translateX(400px);\
  transition:transform .32s cubic-bezier(.4,0,.2,1);\
}\
.af-panel.af-open{transform:translateX(0);}\
\
/* ── Header ──────────────────────────────────────────────────────────────── */\
.af-ph{\
  display:flex;align-items:center;justify-content:space-between;\
  padding:17px 15px 13px;\
  border-bottom:1px solid rgba(124,58,237,0.18);\
  background:linear-gradient(180deg,rgba(124,58,237,0.10) 0%,rgba(124,58,237,0.03) 100%);\
  flex-shrink:0;\
}\
.af-ph h3{\
  margin:0;font-family:Inter,sans-serif;font-size:14px;font-weight:800;\
  color:#f0ede6;letter-spacing:.03em;\
}\
.af-ph-x{\
  background:none;border:none;color:#555;font-size:15px;cursor:pointer;\
  padding:4px 7px;border-radius:7px;transition:all .2s;line-height:1;\
}\
.af-ph-x:hover{color:#f0ede6;background:rgba(255,255,255,0.08);}\
\
/* ── Tabs (panel amigos) ─────────────────────────────────────────────────── */\
.af-tabs{display:flex;border-bottom:1px solid rgba(124,58,237,0.15);background:rgba(0,0,0,0.18);flex-shrink:0;}\
.af-tab{\
  flex:1;padding:10px 3px;background:none;border:none;color:#555;\
  font-family:Open Sans,sans-serif;font-size:10px;font-weight:700;cursor:pointer;\
  transition:color .2s;border-bottom:2px solid transparent;\
  letter-spacing:.06em;text-transform:uppercase;\
}\
.af-tab.active{color:#a855f7;border-bottom-color:#a855f7;}\
.af-tab:hover:not(.active){color:#c084fc;}\
\
/* ── Scroll content ──────────────────────────────────────────────────────── */\
.af-content{\
  flex:1;overflow-y:auto;padding:10px;\
  scrollbar-width:thin;scrollbar-color:rgba(124,58,237,.4) transparent;\
}\
.af-content::-webkit-scrollbar{width:3px;}\
.af-content::-webkit-scrollbar-thumb{background:rgba(124,58,237,.4);border-radius:2px;}\
\
/* ── Search ─────────────────────────────────────────────────────────────── */\
.af-sw{position:relative;margin-bottom:10px;}\
.af-si{\
  width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(124,58,237,.22);\
  border-radius:9px;padding:9px 34px 9px 12px;color:#f0ede6;\
  font-family:Open Sans,sans-serif;font-size:13px;outline:none;\
  box-sizing:border-box;transition:border-color .2s,background .2s;\
}\
.af-si:focus{border-color:rgba(168,85,247,.55);background:rgba(124,58,237,.08);}\
.af-si::placeholder{color:#444;}\
.af-sb{position:absolute;right:8px;top:50%;transform:translateY(-50%);\
  background:none;border:none;color:#a855f7;cursor:pointer;font-size:14px;padding:0;}\
\
/* ── User rows ───────────────────────────────────────────────────────────── */\
.af-row{display:flex;align-items:center;gap:10px;padding:9px 8px;border-radius:10px;transition:background .2s;}\
.af-row:hover{background:rgba(124,58,237,.13);}\
.af-av{\
  width:40px;height:40px;border-radius:50%;\
  background:linear-gradient(135deg,#7c3aed,#a855f7);\
  display:flex;align-items:center;justify-content:center;\
  font-weight:700;color:#fff;font-size:13px;flex-shrink:0;overflow:hidden;\
  font-family:Inter,sans-serif;\
}\
.af-av img{width:100%;height:100%;object-fit:cover;}\
.af-ui{flex:1;min-width:0;}\
.af-un{font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#f0ede6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}\
.af-us{font-family:Open Sans,sans-serif;font-size:11px;color:#666;margin-top:1px;}\
.af-ac{display:flex;gap:5px;flex-shrink:0;}\
\
/* ── Buttons ─────────────────────────────────────────────────────────────── */\
.af-btn{padding:5px 11px;border-radius:7px;font-family:Open Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;transition:all .2s;border:none;}\
.af-bp{background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;}\
.af-bp:hover{opacity:.85;}\
.af-bs{background:rgba(255,255,255,.07);color:#999;border:1px solid rgba(255,255,255,.1);}\
.af-bs:hover{background:rgba(255,255,255,.12);color:#f0ede6;}\
.af-bd{background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(239,68,68,.2);}\
.af-bd:hover{background:rgba(239,68,68,.28);}\
.af-bc{background:rgba(124,58,237,.2);color:#c084fc;border:1px solid rgba(124,58,237,.3);}\
.af-bc:hover{background:rgba(124,58,237,.38);}\
.af-bi{width:28px;height:28px;padding:0;display:flex;align-items:center;justify-content:center;font-size:13px;}\
\
/* ── Misc ────────────────────────────────────────────────────────────────── */\
.af-empty{text-align:center;padding:28px 16px;color:#555;font-family:Open Sans,sans-serif;font-size:13px;}\
.af-empty-icon{font-size:28px;margin-bottom:8px;}\
.af-sec{font-family:Open Sans,sans-serif;font-size:10px;font-weight:700;color:#555;text-transform:uppercase;letter-spacing:.08em;margin:8px 8px 4px;}\
.af-div{height:1px;background:rgba(124,58,237,.15);margin:8px 0;}\
.af-badge{display:inline-block;min-width:16px;height:16px;background:#ef4444;color:#fff;border-radius:8px;font-size:10px;font-weight:700;text-align:center;line-height:16px;padding:0 4px;margin-left:4px;}\
.af-spin{text-align:center;padding:24px;color:#555;font-size:20px;}\
\
/* ═══════════════════════════════════════════════════════════════════════════\
   PANEL DE CHAT\
   ═══════════════════════════════════════════════════════════════════════════ */\
\
/* Tira de avatares ────────────────────────────────────────────────────────── */\
.af-convos{\
  display:flex;gap:10px;padding:12px 14px;\
  overflow-x:auto;border-bottom:1px solid rgba(124,58,237,.18);\
  background:rgba(0,0,0,.18);scrollbar-width:none;flex-shrink:0;\
}\
.af-convos::-webkit-scrollbar{display:none;}\
.af-cav-wrap{\
  display:flex;flex-direction:column;align-items:center;gap:4px;\
  cursor:pointer;flex-shrink:0;position:relative;\
}\
.af-cav{\
  width:46px;height:46px;border-radius:50%;\
  background:linear-gradient(135deg,#7c3aed,#a855f7);\
  display:flex;align-items:center;justify-content:center;\
  font-weight:700;color:#fff;font-size:15px;overflow:hidden;\
  border:2px solid transparent;transition:border-color .2s,transform .15s,box-shadow .2s;\
  font-family:Inter,sans-serif;\
}\
.af-cav img{width:100%;height:100%;object-fit:cover;}\
.af-cav-wrap.active .af-cav{\
  border-color:#a855f7;\
  box-shadow:0 0 12px rgba(168,85,247,.5);\
}\
.af-cav-wrap:hover .af-cav{transform:scale(1.08);border-color:rgba(168,85,247,.5);}\
.af-cav-name{font-family:Open Sans,sans-serif;font-size:9px;color:#777;max-width:46px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;}\
.af-unread-dot{\
  position:absolute;top:-2px;right:-2px;\
  min-width:16px;height:16px;background:#ef4444;\
  border-radius:8px;border:2px solid #09071a;\
  font-size:9px;font-weight:700;color:#fff;\
  display:flex;align-items:center;justify-content:center;padding:0 3px;\
  font-family:Inter,sans-serif;\
}\
\
/* Mensajes ────────────────────────────────────────────────────────────────── */\
.af-msgs{\
  flex:1;overflow-y:auto;padding:12px;\
  display:flex;flex-direction:column;gap:7px;\
  scrollbar-width:thin;scrollbar-color:rgba(124,58,237,.4) transparent;\
}\
.af-msgs::-webkit-scrollbar{width:3px;}\
.af-msgs::-webkit-scrollbar-thumb{background:rgba(124,58,237,.4);border-radius:2px;}\
.af-msg{\
  max-width:78%;padding:8px 12px;border-radius:14px;\
  font-family:Open Sans,sans-serif;font-size:12px;line-height:1.5;word-break:break-word;\
}\
.af-out{\
  align-self:flex-end;\
  background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;\
  border-bottom-right-radius:3px;\
}\
.af-in{\
  align-self:flex-start;\
  background:rgba(255,255,255,.07);color:#e2e8f0;\
  border:1px solid rgba(124,58,237,.15);border-bottom-left-radius:3px;\
}\
.af-mtime{font-size:9px;opacity:.45;margin-top:2px;display:block;text-align:right;}\
\
/* Input ───────────────────────────────────────────────────────────────────── */\
.af-iw{\
  display:flex;gap:7px;padding:10px 12px;\
  border-top:1px solid rgba(124,58,237,.18);\
  background:rgba(0,0,0,.18);flex-shrink:0;\
}\
.af-ci{\
  flex:1;background:rgba(255,255,255,.05);\
  border:1px solid rgba(124,58,237,.22);border-radius:9px;\
  padding:8px 10px;color:#f0ede6;\
  font-family:Open Sans,sans-serif;font-size:12px;\
  outline:none;resize:none;transition:border-color .2s,background .2s;\
}\
.af-ci:focus{border-color:rgba(168,85,247,.5);background:rgba(124,58,237,.07);}\
.af-ci::placeholder{color:#444;}\
.af-cs{\
  background:linear-gradient(135deg,#7c3aed,#a855f7);\
  border:none;border-radius:9px;padding:8px 13px;\
  color:#fff;cursor:pointer;font-size:14px;\
  transition:opacity .2s;flex-shrink:0;\
}\
.af-cs:hover{opacity:.85;}\
\
/* Empty state chat ────────────────────────────────────────────────────────── */\
.af-ce{\
  flex:1;display:flex;flex-direction:column;\
  align-items:center;justify-content:center;\
  color:#444;font-family:Open Sans,sans-serif;font-size:13px;text-align:center;\
}\
.af-ce-icon{font-size:38px;margin-bottom:10px;opacity:.4;}\
\
/* ═══════════════════════════════════════════════════════════════════════════\
   SIDEBAR BADGE\
   ═══════════════════════════════════════════════════════════════════════════ */\
.af-sbadge{\
  position:absolute;top:3px;right:3px;\
  min-width:16px;height:16px;\
  background:#ef4444;color:#fff;\
  border-radius:8px;border:2px solid #08071a;\
  font-size:9px;font-weight:700;\
  display:flex;align-items:center;justify-content:center;\
  padding:0 2px;pointer-events:none;\
  font-family:Inter,sans-serif;\
  transition:transform .2s;\
}\
.af-sbadge.af-pop{transform:scale(1.4);}\
\
/* ═══════════════════════════════════════════════════════════════════════════\
   TOAST\
   ═══════════════════════════════════════════════════════════════════════════ */\
.af-toast{\
  position:fixed;bottom:88px;right:88px;\
  max-width:248px;min-width:180px;\
  background:rgba(8,6,24,0.90);\
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);\
  border:1px solid rgba(168,85,247,0.38);\
  border-radius:14px;padding:11px 14px;\
  display:flex;align-items:center;gap:10px;\
  z-index:10001;\
  box-shadow:0 8px 36px rgba(0,0,0,.55),0 0 0 1px rgba(168,85,247,.08);\
  cursor:pointer;\
  animation:af-tin .3s cubic-bezier(.34,1.56,.64,1) forwards;\
}\
.af-toast.af-tout{animation:af-tout .28s ease forwards;}\
@keyframes af-tin{\
  from{transform:translateY(18px) scale(.88);opacity:0;}\
  to{transform:translateY(0) scale(1);opacity:1;}\
}\
@keyframes af-tout{\
  from{transform:translateY(0) scale(1);opacity:1;}\
  to{transform:translateY(-14px) scale(.9);opacity:0;}\
}\
.af-tav{\
  width:34px;height:34px;border-radius:50%;\
  background:linear-gradient(135deg,#7c3aed,#a855f7);\
  display:flex;align-items:center;justify-content:center;\
  font-weight:700;color:#fff;font-size:12px;\
  overflow:hidden;flex-shrink:0;font-family:Inter,sans-serif;\
}\
.af-tav img{width:100%;height:100%;object-fit:cover;}\
.af-tbody{min-width:0;}\
.af-tname{font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:#c084fc;margin-bottom:2px;}\
.af-ttext{font-family:Open Sans,sans-serif;font-size:11px;color:#bbb;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:175px;}\
';
    var s = document.createElement('style');
    s.id = 'af-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  HELPERS
  // ═══════════════════════════════════════════════════════════════════════════
  function ini(nombre) {
    return ((nombre||'U').split(' ').filter(Boolean).map(function(w){return w[0];}).join('').toUpperCase().slice(0,2))||'U';
  }
  function avHtml(user) {
    return (user&&user.foto_url)
      ? '<img src="'+user.foto_url+'" alt="">'
      : ini(user&&user.nombre);
  }
  function fmtT(iso) {
    var d=new Date(iso);
    return d.getHours()+':'+String(d.getMinutes()).padStart(2,'0');
  }
  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  BUILD PANELS
  // ═══════════════════════════════════════════════════════════════════════════
  function buildFriendsPanel() {
    if (document.getElementById('af-fp')) return;
    var el=document.createElement('div');
    el.id='af-fp'; el.className='af-panel';
    el.innerHTML=
      '<div class="af-ph">'+
        '<h3>👥 Amigos</h3>'+
        '<button class="af-ph-x" id="af-fp-x">✕</button>'+
      '</div>'+
      '<div class="af-tabs">'+
        '<button class="af-tab active" data-tab="friends">Amigos</button>'+
        '<button class="af-tab" data-tab="requests">Solicitudes<span id="af-req-badge" class="af-badge" style="display:none">0</span></button>'+
        '<button class="af-tab" data-tab="add">Agregar</button>'+
      '</div>'+
      '<div class="af-content" id="af-fp-body"><div class="af-spin">⏳</div></div>';
    document.body.appendChild(el);

    el.querySelectorAll('.af-tab').forEach(function(btn){
      btn.addEventListener('click',function(){
        el.querySelectorAll('.af-tab').forEach(function(b){b.classList.remove('active');});
        btn.classList.add('active');
        renderFTab(btn.dataset.tab);
      });
    });
    document.getElementById('af-fp-x').addEventListener('click',function(){setPanel(null);});
  }

  function buildChatPanel() {
    if (document.getElementById('af-cp')) return;
    var el=document.createElement('div');
    el.id='af-cp'; el.className='af-panel';
    el.innerHTML=
      '<div class="af-ph">'+
        '<h3>💬 Mensajes</h3>'+
        '<button class="af-ph-x" id="af-cp-x">✕</button>'+
      '</div>'+
      '<div class="af-convos" id="af-convos"><div class="af-spin" style="padding:8px 0">⏳</div></div>'+
      '<div class="af-ce" id="af-ce">'+
        '<div class="af-ce-icon">💬</div>'+
        'Selecciona una conversación'+
      '</div>'+
      '<div class="af-msgs" id="af-msgs" style="display:none"></div>'+
      '<div class="af-iw" id="af-iw" style="display:none">'+
        '<textarea class="af-ci" id="af-ci" rows="1" placeholder="Escribe un mensaje..."></textarea>'+
        '<button class="af-cs" id="af-cs">➤</button>'+
      '</div>';
    document.body.appendChild(el);

    document.getElementById('af-cp-x').addEventListener('click',function(){setPanel(null);});
    document.getElementById('af-cs').addEventListener('click',sendMsg);
    document.getElementById('af-ci').addEventListener('keydown',function(e){
      if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMsg();}
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  PANEL CONTROL
  // ═══════════════════════════════════════════════════════════════════════════
  function setPanel(which) {
    activePanel=which;
    var fp=document.getElementById('af-fp');
    var cp=document.getElementById('af-cp');
    if(fp) fp.classList.toggle('af-open', which==='friends');
    if(cp) cp.classList.toggle('af-open', which==='chat');
    if(which==='friends') renderFTab('friends');
    if(which==='chat')    loadChatPanel();
  }

  function togglePanel(which) {
    setPanel(activePanel===which ? null : which);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  FRIENDS PANEL — TABS
  // ═══════════════════════════════════════════════════════════════════════════
  function renderFTab(tab) {
    var body=document.getElementById('af-fp-body');
    if(!body) return;
    body.innerHTML='<div class="af-spin">⏳</div>';
    if(tab==='friends')  renderFriends(body);
    if(tab==='requests') renderRequests(body);
    if(tab==='add')      renderAdd(body);
  }

  async function renderFriends(body) {
    var res=await sb.from('friendships')
      .select('requester_id,addressee_id,'+
        'req:profiles!friendships_requester_id_fkey(id,nombre,foto_url,nivel,rango),'+
        'adr:profiles!friendships_addressee_id_fkey(id,nombre,foto_url,nivel,rango)')
      .eq('status','accepted')
      .or('requester_id.eq.'+ME+',addressee_id.eq.'+ME);
    var data=res.data||[];
    friendsCache=data.map(function(f){return f.requester_id===ME?f.adr:f.req;}).filter(Boolean);
    if(!friendsCache.length){
      body.innerHTML='<div class="af-empty"><div class="af-empty-icon">🤝</div>Aún no tienes amigos.<br>¡Agrega uno!</div>';
      return;
    }
    body.innerHTML='';
    friendsCache.forEach(function(f){body.appendChild(buildRow(f,'friend'));});
  }

  async function renderRequests(body) {
    var rR=await sb.from('friendships')
      .select('id,req:profiles!friendships_requester_id_fkey(id,nombre,foto_url,nivel,rango)')
      .eq('addressee_id',ME).eq('status','pending');
    var rS=await sb.from('friendships')
      .select('id,adr:profiles!friendships_addressee_id_fkey(id,nombre,foto_url,nivel,rango)')
      .eq('requester_id',ME).eq('status','pending');
    var rec=rR.data||[], sent=rS.data||[];
    if(!rec.length&&!sent.length){
      body.innerHTML='<div class="af-empty"><div class="af-empty-icon">📭</div>No hay solicitudes pendientes.</div>';
      return;
    }
    body.innerHTML='';
    if(rec.length){
      var t=document.createElement('div');t.className='af-sec';t.textContent='Recibidas';body.appendChild(t);
      rec.forEach(function(f){if(f.req) body.appendChild(buildRow(f.req,'received',f.id));});
    }
    if(sent.length){
      if(rec.length){var d=document.createElement('div');d.className='af-div';body.appendChild(d);}
      var t2=document.createElement('div');t2.className='af-sec';t2.textContent='Enviadas';body.appendChild(t2);
      sent.forEach(function(f){if(f.adr) body.appendChild(buildRow(f.adr,'sent',f.id));});
    }
  }

  function renderAdd(body) {
    body.innerHTML=
      '<div class="af-sw">'+
        '<input class="af-si" id="af-si" type="text" placeholder="Buscar usuario...">'+
        '<button class="af-sb" id="af-sb">🔍</button>'+
      '</div>'+
      '<div id="af-sr"></div>'+
      '<div id="af-sug-wrap">'+
        '<div class="af-sec">Sugerencias</div>'+
        '<div id="af-sug"><div class="af-spin">⏳</div></div>'+
      '</div>';
    document.getElementById('af-sb').addEventListener('click',doSearch);
    document.getElementById('af-si').addEventListener('keydown',function(e){if(e.key==='Enter')doSearch();});
    document.getElementById('af-si').addEventListener('input',function(){
      var w=document.getElementById('af-sug-wrap'),r=document.getElementById('af-sr');
      if(this.value.trim()){if(w)w.style.display='none';}
      else{if(w)w.style.display='block';if(r)r.innerHTML='';}
    });
    loadSuggestions();
  }

  async function loadSuggestions() {
    var el=document.getElementById('af-sug');
    if(!el) return;
    var rF=await sb.from('friendships').select('requester_id,addressee_id').or('requester_id.eq.'+ME+',addressee_id.eq.'+ME);
    var ex={};ex[ME]=true;
    (rF.data||[]).forEach(function(f){ex[f.requester_id]=true;ex[f.addressee_id]=true;});
    var res=await sb.from('profiles').select('id,nombre,foto_url,nivel,rango').limit(100);
    var users=(res.data||[]).filter(function(u){return!ex[u.id];});
    for(var i=users.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=users[i];users[i]=users[j];users[j]=t;}
    users=users.slice(0,10);
    el.innerHTML='';
    if(!users.length){el.innerHTML='<div class="af-empty"><div class="af-empty-icon">👥</div>No hay más usuarios.</div>';return;}
    users.forEach(function(u){el.appendChild(buildRow(u,'search',null,undefined));});
  }

  async function doSearch() {
    var q=((document.getElementById('af-si')||{}).value||'').trim();
    var r=document.getElementById('af-sr'),w=document.getElementById('af-sug-wrap');
    if(!r) return;
    if(!q){r.innerHTML='';if(w)w.style.display='block';return;}
    if(w)w.style.display='none';
    r.innerHTML='<div class="af-empty">⏳ Buscando...</div>';
    var res=await sb.from('profiles').select('id,nombre,foto_url,nivel,rango').ilike('nombre','%'+q+'%').neq('id',ME).limit(12);
    var users=res.data||[];
    if(!users.length){r.innerHTML='<div class="af-empty"><div class="af-empty-icon">🔍</div>Sin resultados.</div>';return;}
    var rF=await sb.from('friendships').select('requester_id,addressee_id,status').or('requester_id.eq.'+ME+',addressee_id.eq.'+ME);
    var sm={};(rF.data||[]).forEach(function(f){var o=f.requester_id===ME?f.addressee_id:f.requester_id;sm[o]=f.status;});
    r.innerHTML='';
    users.forEach(function(u){r.appendChild(buildRow(u,'search',null,sm[u.id]));});
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  ROW BUILDER
  // ═══════════════════════════════════════════════════════════════════════════
  function buildRow(user, type, fid, existStatus) {
    var row=document.createElement('div');
    row.className='af-row';
    var actions='';
    if(type==='friend'){
      actions='<button class="af-btn af-bc af-bi" data-uid="'+user.id+'" data-name="'+(user.nombre||'')+'" data-foto="'+(user.foto_url||'')+'" title="Chat">💬</button>';
    } else if(type==='received'){
      actions='<button class="af-btn af-bp af-bi" data-action="accept" data-fid="'+fid+'" title="Aceptar">✓</button>'+
              '<button class="af-btn af-bd af-bi" data-action="reject" data-fid="'+fid+'" title="Rechazar">✕</button>';
    } else if(type==='sent'){
      actions='<span style="font-size:10px;color:#555;font-family:Open Sans,sans-serif;">Enviada</span>';
    } else if(type==='search'){
      if(existStatus==='accepted') actions='<span style="font-size:10px;color:#22c55e;font-family:Open Sans,sans-serif;font-weight:700;">✓ Amigos</span>';
      else if(existStatus==='pending') actions='<span style="font-size:10px;color:#555;font-family:Open Sans,sans-serif;">Enviada</span>';
      else actions='<button class="af-btn af-bp" data-action="add" data-uid="'+user.id+'">+ Agregar</button>';
    }
    row.innerHTML=
      '<div class="af-av">'+avHtml(user)+'</div>'+
      '<div class="af-ui">'+
        '<div class="af-un">'+(user.nombre||'Usuario')+'</div>'+
        '<div class="af-us">Lv '+(user.nivel||1)+' · '+(user.rango||'Bronce')+'</div>'+
      '</div>'+
      '<div class="af-ac">'+actions+'</div>';

    row.querySelectorAll('[data-action]').forEach(function(btn){
      btn.addEventListener('click',function(){
        var a=btn.dataset.action;
        if(a==='add')    sendReq(btn.dataset.uid,btn);
        if(a==='accept') respondReq(btn.dataset.fid,'accepted');
        if(a==='reject') respondReq(btn.dataset.fid,'rejected');
      });
    });
    var cb=row.querySelector('[title="Chat"]');
    if(cb){
      cb.addEventListener('click',function(){
        selectConvo({id:cb.dataset.uid,nombre:cb.dataset.name,foto_url:cb.dataset.foto||null});
        setPanel('chat');
      });
    }
    return row;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  FRIEND ACTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  async function sendReq(uid,btn) {
    btn.disabled=true;btn.textContent='⏳';
    var r=await sb.from('friendships').insert({requester_id:ME,addressee_id:uid,status:'pending'});
    if(r.error){btn.disabled=false;btn.textContent='+ Agregar';}
    else{btn.textContent='Enviada ✓';btn.className='af-btn af-bs';btn.disabled=true;}
  }

  async function respondReq(fid,status) {
    await sb.from('friendships')
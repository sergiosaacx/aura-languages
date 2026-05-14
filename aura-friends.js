// aura-friends.js — Sistema de amigos y chat · Aura Languages
(function(){
'use strict';

var sb,ME;
var activePanel=null;
var activeFriend=null;
var chatOpen=false;
var chatChannel=null;
var friendsCache=[];
var unreadCounts={};
var TOAST_TIMER=null;

// ── ESTILOS (glass idéntico al sidebar) ─────────────────────────────────────
function injectStyles(){
  var c=
// Panel lateral glass
'.af-panel{position:fixed;top:0;right:82px;width:288px;height:100vh;'+
'background:rgba(23,23,23,0.62);'+
'backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);'+
'border-left:1px solid rgba(255,255,255,.07);'+
'box-shadow:-6px 0 32px rgba(0,0,0,.65);'+
'z-index:9998;display:flex;flex-direction:column;'+
'transform:translateX(400px);transition:transform .3s cubic-bezier(.4,0,.2,1);}'+
'.af-panel.af-open{transform:translateX(0);}'+
// Header
'.af-ph{display:flex;align-items:center;justify-content:space-between;'+
'padding:16px 14px 12px;border-bottom:1px solid rgba(255,255,255,.06);'+
'background:rgba(255,255,255,.03);flex-shrink:0;}'+
'.af-ph h3{margin:0;font-family:Inter,sans-serif;font-size:14px;font-weight:800;'+
'color:#f0ede6;letter-spacing:.02em;}'+
'.af-ph-x{background:none;border:none;color:#666;font-size:15px;cursor:pointer;'+
'padding:4px 7px;border-radius:7px;transition:all .2s;line-height:1;}'+
'.af-ph-x:hover{color:#f0ede6;background:rgba(255,255,255,.08);}'+
// Tabs
'.af-tabs{display:flex;border-bottom:1px solid rgba(255,255,255,.06);'+
'background:rgba(0,0,0,.2);flex-shrink:0;}'+
'.af-tab{flex:1;padding:10px 3px;background:none;border:none;color:#666;'+
'font-family:Open Sans,sans-serif;font-size:10px;font-weight:700;cursor:pointer;'+
'transition:color .2s;border-bottom:2px solid transparent;'+
'letter-spacing:.05em;text-transform:uppercase;}'+
'.af-tab.active{color:#a855f7;border-bottom-color:#a855f7;}'+
'.af-tab:hover:not(.active){color:#ccc;}'+
// Content
'.af-content{flex:1;overflow-y:auto;padding:10px;'+
'scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.1) transparent;}'+
'.af-content::-webkit-scrollbar{width:3px;}'+
'.af-content::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px;}'+
// Search
'.af-sw{position:relative;margin-bottom:10px;}'+
'.af-si{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);'+
'border-radius:9px;padding:9px 34px 9px 12px;color:#f0ede6;'+
'font-family:Open Sans,sans-serif;font-size:13px;outline:none;'+
'box-sizing:border-box;transition:border-color .2s;}'+
'.af-si:focus{border-color:rgba(168,85,247,.5);background:rgba(255,255,255,.07);}'+
'.af-si::placeholder{color:#444;}'+
'.af-sb{position:absolute;right:8px;top:50%;transform:translateY(-50%);'+
'background:none;border:none;color:#888;cursor:pointer;font-size:14px;padding:0;}'+
// User rows
'.af-row{display:flex;align-items:center;gap:10px;padding:9px 8px;border-radius:10px;transition:background .2s;}'+
'.af-row:hover{background:rgba(255,255,255,.05);}'+
'.af-av{width:40px;height:40px;border-radius:50%;'+
'background:linear-gradient(135deg,#7c3aed,#a855f7);'+
'display:flex;align-items:center;justify-content:center;'+
'font-weight:700;color:#fff;font-size:13px;flex-shrink:0;overflow:hidden;font-family:Inter,sans-serif;}'+
'.af-av img{width:100%;height:100%;object-fit:cover;}'+
'.af-ui{flex:1;min-width:0;}'+
'.af-un{font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:#f0ede6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}'+
'.af-us{font-family:Open Sans,sans-serif;font-size:11px;color:#666;margin-top:1px;}'+
'.af-ac{display:flex;gap:5px;flex-shrink:0;}'+
// Buttons
'.af-btn{padding:5px 11px;border-radius:7px;font-family:Open Sans,sans-serif;font-size:11px;font-weight:700;cursor:pointer;transition:all .2s;border:none;}'+
'.af-bp{background:rgba(124,58,237,.8);color:#fff;}'+
'.af-bp:hover{background:rgba(168,85,247,.9);}'+
'.af-bs{background:rgba(255,255,255,.07);color:#999;border:1px solid rgba(255,255,255,.1);}'+
'.af-bs:hover{background:rgba(255,255,255,.12);color:#f0ede6;}'+
'.af-bd{background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(239,68,68,.2);}'+
'.af-bd:hover{background:rgba(239,68,68,.28);}'+
'.af-bc{background:rgba(255,255,255,.06);color:#ccc;border:1px solid rgba(255,255,255,.1);}'+
'.af-bc:hover{background:rgba(255,255,255,.12);}'+
'.af-bi{width:28px;height:28px;padding:0;display:flex;align-items:center;justify-content:center;font-size:13px;}'+
// Misc
'.af-empty{text-align:center;padding:28px 16px;color:#555;font-family:Open Sans,sans-serif;font-size:13px;}'+
'.af-empty-icon{font-size:28px;margin-bottom:8px;}'+
'.af-sec{font-family:Open Sans,sans-serif;font-size:10px;font-weight:700;color:#555;text-transform:uppercase;letter-spacing:.08em;margin:8px 8px 4px;}'+
'.af-div{height:1px;background:rgba(255,255,255,.06);margin:8px 0;}'+
'.af-badge{display:inline-block;min-width:16px;height:16px;background:#ef4444;color:#fff;border-radius:8px;font-size:10px;font-weight:700;text-align:center;line-height:16px;padding:0 4px;margin-left:4px;}'+
'.af-spin{text-align:center;padding:20px;color:#555;font-size:18px;}'+
// ── CHAT FLOTANTE PEQUEÑO ───────────────────────────────────────────────────
'#af-chat{position:fixed;bottom:76px;right:88px;width:298px;'+
'background:rgba(23,23,23,0.88);'+
'backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);'+
'border:1px solid rgba(255,255,255,.08);border-radius:14px;'+
'z-index:9997;display:flex;flex-direction:column;'+
'transform:scale(.9) translateY(16px);opacity:0;pointer-events:none;'+
'transition:all .22s cubic-bezier(.4,0,.2,1);'+
'box-shadow:0 16px 48px rgba(0,0,0,.7);}'+
'#af-chat.af-open{transform:scale(1) translateY(0);opacity:1;pointer-events:auto;}'+
// Chat header
'.af-ch{display:flex;align-items:center;gap:9px;padding:11px 13px;'+
'border-bottom:1px solid rgba(255,255,255,.06);border-radius:14px 14px 0 0;'+
'background:rgba(255,255,255,.03);flex-shrink:0;}'+
'.af-chav{width:30px;height:30px;border-radius:50%;'+
'background:linear-gradient(135deg,#7c3aed,#a855f7);'+
'display:flex;align-items:center;justify-content:center;'+
'font-weight:700;color:#fff;font-size:11px;flex-shrink:0;overflow:hidden;font-family:Inter,sans-serif;}'+
'.af-chav img{width:100%;height:100%;object-fit:cover;}'+
'.af-chn{flex:1;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:#f0ede6;}'+
'.af-chx{background:none;border:none;color:#555;font-size:14px;cursor:pointer;padding:2px 5px;border-radius:5px;transition:all .2s;}'+
'.af-chx:hover{color:#f0ede6;background:rgba(255,255,255,.08);}'+
// Tira avatares
'.af-convos{display:flex;gap:8px;padding:10px 12px;overflow-x:auto;'+
'border-bottom:1px solid rgba(255,255,255,.06);background:rgba(0,0,0,.15);'+
'scrollbar-width:none;flex-shrink:0;}'+
'.af-convos::-webkit-scrollbar{display:none;}'+
'.af-cav-w{display:flex;flex-direction:column;align-items:center;gap:3px;'+
'cursor:pointer;flex-shrink:0;position:relative;}'+
'.af-cav{width:38px;height:38px;border-radius:50%;'+
'background:linear-gradient(135deg,#7c3aed,#a855f7);'+
'display:flex;align-items:center;justify-content:center;'+
'font-weight:700;color:#fff;font-size:12px;overflow:hidden;'+
'border:2px solid transparent;transition:border-color .2s,transform .15s;font-family:Inter,sans-serif;}'+
'.af-cav img{width:100%;height:100%;object-fit:cover;}'+
'.af-cav-w.active .af-cav{border-color:#a855f7;}'+
'.af-cav-w:hover .af-cav{transform:scale(1.08);}'+
'.af-cav-name{font-family:Open Sans,sans-serif;font-size:9px;color:#666;max-width:38px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;}'+
'.af-udot{position:absolute;top:-1px;right:-1px;min-width:14px;height:14px;'+
'background:#ef4444;border-radius:7px;border:2px solid #181818;'+
'font-size:8px;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:center;padding:0 2px;font-family:Inter,sans-serif;}'+
// Mensajes
'.af-msgs{overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:6px;height:220px;'+
'scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.08) transparent;}'+
'.af-msgs::-webkit-scrollbar{width:3px;}'+
'.af-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px;}'+
'.af-msg{max-width:80%;padding:7px 10px;border-radius:12px;font-family:Open Sans,sans-serif;font-size:12px;line-height:1.5;word-break:break-word;}'+
'.af-out{align-self:flex-end;background:rgba(124,58,237,.85);color:#fff;border-bottom-right-radius:3px;}'+
'.af-in{align-self:flex-start;background:rgba(255,255,255,.07);color:#e2e8f0;border:1px solid rgba(255,255,255,.08);border-bottom-left-radius:3px;}'+
'.af-mtime{font-size:9px;opacity:.4;margin-top:2px;display:block;text-align:right;}'+
// Input chat
'.af-iw{display:flex;gap:6px;padding:9px 11px;'+
'border-top:1px solid rgba(255,255,255,.06);border-radius:0 0 14px 14px;'+
'background:rgba(0,0,0,.15);flex-shrink:0;}'+
'.af-ci{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);'+
'border-radius:8px;padding:7px 9px;color:#f0ede6;'+
'font-family:Open Sans,sans-serif;font-size:12px;outline:none;resize:none;transition:border-color .2s;}'+
'.af-ci:focus{border-color:rgba(168,85,247,.4);}'+
'.af-ci::placeholder{color:#444;}'+
'.af-cs{background:rgba(124,58,237,.8);border:none;border-radius:8px;'+
'padding:7px 11px;color:#fff;cursor:pointer;font-size:13px;transition:opacity .2s;flex-shrink:0;}'+
'.af-cs:hover{opacity:.85;}'+
// Badge sidebar
'.af-sbadge{position:absolute;top:2px;right:2px;min-width:15px;height:15px;'+
'background:#ef4444;color:#fff;border-radius:8px;border:2px solid #171717;'+
'font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;'+
'padding:0 2px;pointer-events:none;font-family:Inter,sans-serif;'+
'transition:transform .15s;}'+
'.af-sbadge.af-pop{transform:scale(1.4);}'+
// Toast
'#af-toast{position:fixed;bottom:84px;right:86px;max-width:240px;min-width:180px;'+
'background:rgba(23,23,23,0.95);'+
'backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);'+
'border:1px solid rgba(255,255,255,.1);border-radius:12px;'+
'padding:10px 13px;display:flex;align-items:center;gap:9px;'+
'z-index:10001;box-shadow:0 8px 32px rgba(0,0,0,.6);cursor:pointer;'+
'animation:af-tin .28s cubic-bezier(.34,1.56,.64,1) forwards;}'+
'#af-toast.af-tout{animation:af-tout .25s ease forwards;}'+
'@keyframes af-tin{from{transform:translateY(16px) scale(.9);opacity:0;}to{transform:translateY(0) scale(1);opacity:1;}}'+
'@keyframes af-tout{from{transform:translateY(0) scale(1);opacity:1;}to{transform:translateY(-12px) scale(.92);opacity:0;}}'+
'.af-tav{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#a855f7);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:11px;overflow:hidden;flex-shrink:0;font-family:Inter,sans-serif;}'+
'.af-tav img{width:100%;height:100%;object-fit:cover;}'+
'.af-tbody{min-width:0;}'+
'.af-tname{font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:#f0ede6;margin-bottom:2px;}'+
'.af-ttext{font-family:Open Sans,sans-serif;font-size:11px;color:#999;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:170px;}';
  var s=document.createElement('style');s.id='af-styles';s.textContent=c;document.head.appendChild(s);
}

// ── HELPERS ──────────────────────────────────────────────────────────────────
function ini(n){return((n||'U').split(' ').filter(Boolean).map(function(w){return w[0];}).join('').toUpperCase().slice(0,2))||'U';}
function avHtml(u){return(u&&u.foto_url)?'<img src="'+u.foto_url+'" alt="">':ini(u&&u.nombre);}
function fmtT(iso){var d=new Date(iso);return d.getHours()+':'+String(d.getMinutes()).padStart(2,'0');}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

// ── BUILD PANEL AMIGOS ───────────────────────────────────────────────────────
function buildFriendsPanel(){
  if(document.getElementById('af-fp')) return;
  var el=document.createElement('div');
  el.id='af-fp';el.className='af-panel';
  el.innerHTML=
    '<div class="af-ph"><h3>👥 Amigos</h3><button class="af-ph-x" id="af-fp-x">✕</button></div>'+
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
      btn.classList.add('active');renderFTab(btn.dataset.tab);
    });
  });
  document.getElementById('af-fp-x').addEventListener('click',function(){setPanel(null);});
}

// ── BUILD CHAT FLOTANTE PEQUEÑO ──────────────────────────────────────────────
function buildChatWin(){
  if(document.getElementById('af-chat')) return;
  var el=document.createElement('div');
  el.id='af-chat';
  el.innerHTML=
    '<div class="af-ch">'+
      '<div class="af-chav" id="af-chav"></div>'+
      '<span class="af-chn" id="af-chn">Chat</span>'+
      '<button class="af-chx" id="af-chx">✕</button>'+
    '</div>'+
    '<div class="af-convos" id="af-convos"></div>'+
    '<div class="af-msgs" id="af-msgs"></div>'+
    '<div class="af-iw">'+
      '<textarea class="af-ci" id="af-ci" rows="1" placeholder="Escribe..."></textarea>'+
      '<button class="af-cs" id="af-cs">➤</button>'+
    '</div>';
  document.body.appendChild(el);
  document.getElementById('af-chx').addEventListener('click',closeChat);
  document.getElementById('af-cs').addEventListener('click',sendMsg);
  document.getElementById('af-ci').addEventListener('keydown',function(e){
    if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMsg();}
  });
}

// ── PANEL CONTROL ────────────────────────────────────────────────────────────
function setPanel(which){
  activePanel=which;
  var fp=document.getElementById('af-fp');
  if(fp) fp.classList.toggle('af-open',which==='friends');
  if(which==='friends') renderFTab('friends');
  // Cerrar chat si se abre el panel amigos
  if(which==='friends') closeChat();
}
function togglePanel(which){setPanel(activePanel===which?null:which);}

// ── CHAT CONTROL ─────────────────────────────────────────────────────────────
function openChatWin(){
  // Cerrar panel amigos si está abierto
  var fp=document.getElementById('af-fp');
  if(fp) fp.classList.remove('af-open');
  activePanel=null;
  chatOpen=true;
  var c=document.getElementById('af-chat');
  if(c) c.classList.add('af-open');
  loadConvos();
}
function closeChat(){
  chatOpen=false;
  var c=document.getElementById('af-chat');
  if(c) c.classList.remove('af-open');
  if(chatChannel){try{sb.removeChannel(chatChannel);}catch(e){}chatChannel=null;}
}

// ── TABS PANEL AMIGOS ────────────────────────────────────────────────────────
function renderFTab(tab){
  var body=document.getElementById('af-fp-body');
  if(!body) return;
  body.innerHTML='<div class="af-spin">⏳</div>';
  if(tab==='friends') renderFriends(body);
  if(tab==='requests') renderRequests(body);
  if(tab==='add') renderAdd(body);
}

async function renderFriends(body){
  var res=await sb.from('friendships')
    .select('requester_id,addressee_id,req:profiles!friendships_requester_id_fkey(id,nombre,foto_url,nivel,rango),adr:profiles!friendships_addressee_id_fkey(id,nombre,foto_url,nivel,rango)')
    .eq('status','accepted').or('requester_id.eq.'+ME+',addressee_id.eq.'+ME);
  var data=res.data||[];
  friendsCache=data.map(function(f){return f.requester_id===ME?f.adr:f.req;}).filter(Boolean);
  if(!friendsCache.length){body.innerHTML='<div class="af-empty"><div class="af-empty-icon">🤝</div>Aún no tienes amigos.</div>';return;}
  body.innerHTML='';
  friendsCache.forEach(function(f){body.appendChild(buildRow(f,'friend'));});
}

async function renderRequests(body){
  var rR=await sb.from('friendships').select('id,req:profiles!friendships_requester_id_fkey(id,nombre,foto_url,nivel,rango)').eq('addressee_id',ME).eq('status','pending');
  var rS=await sb.from('friendships').select('id,adr:profiles!friendships_addressee_id_fkey(id,nombre,foto_url,nivel,rango)').eq('requester_id',ME).eq('status','pending');
  var rec=rR.data||[],sent=rS.data||[];
  if(!rec.length&&!sent.length){body.innerHTML='<div class="af-empty"><div class="af-empty-icon">📭</div>No hay solicitudes pendientes.</div>';return;}
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

function renderAdd(body){
  body.innerHTML=
    '<div class="af-sw"><input class="af-si" id="af-si" type="text" placeholder="Buscar usuario..."><button class="af-sb" id="af-sb">🔍</button></div>'+
    '<div id="af-sr"></div>'+
    '<div id="af-sug-wrap"><div class="af-sec">Sugerencias</div><div id="af-sug"><div class="af-spin">⏳</div></div></div>';
  document.getElementById('af-sb').addEventListener('click',doSearch);
  document.getElementById('af-si').addEventListener('keydown',function(e){if(e.key==='Enter')doSearch();});
  document.getElementById('af-si').addEventListener('input',function(){
    var w=document.getElementById('af-sug-wrap'),r=document.getElementById('af-sr');
    if(this.value.trim()){if(w)w.style.display='none';}
    else{if(w)w.style.display='block';if(r)r.innerHTML='';}
  });
  loadSuggestions();
}

async function loadSuggestions(){
  var el=document.getElementById('af-sug');if(!el) return;
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

async function doSearch(){
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

// ── ROW BUILDER ──────────────────────────────────────────────────────────────
function buildRow(user,type,fid,existStatus){
  var row=document.createElement('div');row.className='af-row';
  var actions='';
  if(type==='friend'){
    actions='<button class="af-btn af-bc af-bi" data-uid="'+user.id+'" data-name="'+(user.nombre||'')+'" data-foto="'+(user.foto_url||'')+'" title="Chat">💬</button>';
  }else if(type==='received'){
    actions='<button class="af-btn af-bp af-bi" data-action="accept" data-fid="'+fid+'" title="Aceptar">✓</button>'+
            '<button class="af-btn af-bd af-bi" data-action="reject" data-fid="'+fid+'" title="Rechazar">✕</button>';
  }else if(type==='sent'){
    actions='<span style="font-size:10px;color:#555;font-family:Open Sans,sans-serif;">Enviada</span>';
  }else if(type==='search'){
    if(existStatus==='accepted') actions='<span style="font-size:10px;color:#22c55e;font-family:Open Sans,sans-serif;font-weight:700;">✓ Amigos</span>';
    else if(existStatus==='pending') actions='<span style="font-size:10px;color:#555;font-family:Open Sans,sans-serif;">Enviada</span>';
    else actions='<button class="af-btn af-bp" data-action="add" data-uid="'+user.id+'">+ Agregar</button>';
  }
  row.innerHTML='<div class="af-av">'+avHtml(user)+'</div>'+
    '<div class="af-ui"><div class="af-un">'+(user.nombre||'Usuario')+'</div><div class="af-us">Lv '+(user.nivel||1)+' · '+(user.rango||'Bronce')+'</div></div>'+
    '<div class="af-ac">'+actions+'</div>';
  row.querySelectorAll('[data-action]').forEach(function(btn){
    btn.addEventListener('click',function(){
      var a=btn.dataset.action;
      if(a==='add') sendReq(btn.dataset.uid,btn);
      if(a==='accept') respondReq(btn.dataset.fid,'accepted');
      if(a==='reject') respondReq(btn.dataset.fid,'rejected');
    });
  });
  var cb=row.querySelector('[title="Chat"]');
  if(cb){
    cb.addEventListener('click',function(){
      openChatWin();
      selectConvo({id:cb.dataset.uid,nombre:cb.dataset.name,foto_url:cb.dataset.foto||null});
    });
  }
  return row;
}

// ── FRIEND ACTIONS ───────────────────────────────────────────────────────────
async function sendReq(uid,btn){
  btn.disabled=true;btn.textContent='⏳';
  var r=await sb.from('friendships').insert({requester_id:ME,addressee_id:uid,status:'pending'});
  if(r.error){btn.disabled=false;btn.textContent='+ Agregar';}
  else{btn.textContent='Enviada ✓';btn.className='af-btn af-bs';btn.disabled=true;}
}
async function respondReq(fid,status){
  await sb.from('friendships').update({status:status}).eq('id',fid);
  var body=document.getElementById('af-fp-body');
  if(body) renderRequests(body);
  checkReqs();
}

// ── CHAT FLOTANTE ────────────────────────────────────────────────────────────
async function loadConvos(){
  var res=await sb.from('friendships')
    .select('requester_id,addressee_id,req:profiles!friendships_requester_id_fkey(id,nombre,foto_url),adr:profiles!friendships_addressee_id_fkey(id,nombre,foto_url)')
    .eq('status','accepted').or('requester_id.eq.'+ME+',addressee_id.eq.'+ME);
  friendsCache=(res.data||[]).map(function(f){return f.requester_id===ME?f.adr:f.req;}).filter(Boolean);
  var rU=await sb.from('messages').select('sender_id').eq('receiver_id',ME).is('read_at',null);
  unreadCounts={};
  (rU.data||[]).forEach(function(m){unreadCounts[m.sender_id]=(unreadCounts[m.sender_id]||0)+1;});
  renderConvos();
  if(activeFriend) selectConvo(activeFriend);
  else if(friendsCache.length>0) selectConvo(friendsCache[0]);
}

function renderConvos(){
  var el=document.getElementById('af-convos');if(!el) return;
  el.innerHTML='';
  if(!friendsCache.length){
    el.innerHTML='<div style="color:#555;font-size:11px;font-family:Open Sans,sans-serif;padding:2px 4px;">Sin amigos aún</div>';
    return;
  }
  friendsCache.forEach(function(f){
    var div=document.createElement('div');
    div.className='af-cav-w'+(activeFriend&&activeFriend.id===f.id?' active':'');
    div.dataset.uid=f.id;
    var un=unreadCounts[f.id]||0;
    div.innerHTML=(un>0?'<div class="af-udot">'+(un>9?'9+':un)+'</div>':'')+
      '<div class="af-cav">'+avHtml(f)+'</div>'+
      '<div class="af-cav-name">'+(f.nombre||'').split(' ')[0]+'</div>';
    div.addEventListener('click',function(){selectConvo(f);});
    el.appendChild(div);
  });
}

function selectConvo(friend){
  activeFriend=friend;
  document.querySelectorAll('.af-cav-w').forEach(function(el){el.classList.toggle('active',el.dataset.uid===friend.id);});
  // Actualizar header
  var av=document.getElementById('af-chav'),nm=document.getElementById('af-chn');
  if(av) av.innerHTML=avHtml(friend);
  if(nm) nm.textContent=friend.nombre||'Chat';
  loadMessages(friend.id);
  subscribeChat(friend.id);
  markRead(friend.id);
}

async function loadMessages(fid){
  var el=document.getElementById('af-msgs');if(!el) return;
  el.innerHTML='<div class="af-spin">⏳</div>';
  var res=await sb.from('messages').select('*')
    .or('and(sender_id.eq.'+ME+',receiver_id.eq.'+fid+'),and(sender_id.eq.'+fid+',receiver_id.eq.'+ME+')')
    .order('created_at',{ascending:true}).limit(60);
  el.innerHTML='';
  if(!res.data||!res.data.length){
    el.innerHTML='<div style="text-align:center;color:#555;font-size:11px;font-family:Open Sans,sans-serif;padding:16px;">Di hola! 👋</div>';
    return;
  }
  res.data.forEach(function(m){appendMsg(m,false);});
  el.scrollTop=el.scrollHeight;
}

function appendMsg(msg,scroll){
  var el=document.getElementById('af-msgs');if(!el) return;
  var ph=el.querySelector('div[style*="Di hola"]');if(ph) ph.remove();
  var out=msg.sender_id===ME;
  var div=document.createElement('div');
  div.className='af-msg '+(out?'af-out':'af-in');
  div.innerHTML=esc(msg.content)+'<span class="af-mtime">'+fmtT(msg.created_at)+'</span>';
  el.appendChild(div);
  if(scroll!==false) el.scrollTop=el.scrollHeight;
}

async function sendMsg(){
  if(!activeFriend) return;
  var ci=document.getElementById('af-ci');if(!ci) return;
  var content=ci.value.trim();if(!content) return;
  ci.value='';
  var r=await sb.from('messages').insert({sender_id:ME,receiver_id:activeFriend.id,content:content});
  if(r.error) ci.value=content;
}

async function markRead(fid){
  await sb.from('messages').update({read_at:new Date().toISOString()}).eq('sender_id',fid).eq('receiver_id',ME).is('read_at',null);
  if(unreadCounts[fid]){delete unreadCounts[fid];renderConvos();updateBadge();}
}

function subscribeChat(fid){
  if(chatChannel){try{sb.removeChannel(chatChannel);}catch(e){}}
  chatChannel=sb.channel('af-chat-'+[ME,fid].sort().join('-'))
    .on('postgres_changes',{event:'INSERT',schema:'public',table:'messages',filter:'receiver_id=eq.'+ME},function(p){
      if(p.new&&p.new.sender_id===fid){appendMsg(p.new);markRead(fid);}
    })
    .on('postgres_changes',{event:'INSERT',schema:'public',table:'messages',filter:'sender_id=eq.'+ME},function(p){
      if(p.new&&p.new.receiver_id===fid) appendMsg(p.new);
    })
    .subscribe();
}

// ── GLOBAL REALTIME ──────────────────────────────────────────────────────────
function subscribeGlobal(){
  sb.channel('af-global-'+ME)
    .on('postgres_changes',{event:'INSERT',schema:'public',table:'messages',filter:'receiver_id=eq.'+ME},async function(p){
      if(!p.new) return;
      var sid=p.new.sender_id;
      unreadCounts[sid]=(unreadCounts[sid]||0)+1;
      updateBadge();
      if(chatOpen&&activeFriend&&activeFriend.id===sid){
        appendMsg(p.new);markRead(sid);
      } else if(chatOpen){
        renderConvos();
      } else {
        var sender=friendsCache.find(function(f){return f.id===sid;});
        if(!sender){
          var r=await sb.from('profiles').select('id,nombre,foto_url').eq('id',sid).single();
          sender=r.data||{id:sid,nombre:'Mensaje nuevo',foto_url:null};
        }
        showToast(sender,p.new.content);
      }
    })
    .subscribe();
}

// ── TOAST ────────────────────────────────────────────────────────────────────
function showToast(friend,text){
  var old=document.getElementById('af-toast');if(old) old.remove();
  var t=document.createElement('div');t.id='af-toast';t.className='af-toast';
  t.innerHTML='<div class="af-tav">'+avHtml(friend)+'</div>'+
    '<div class="af-tbody"><div class="af-tname">'+(friend.nombre||'Mensaje')+'</div>'+
    '<div class="af-ttext">'+esc(text.slice(0,60))+'</div></div>';
  t.addEventListener('click',function(){t.remove();openChatWin();selectConvo(friend);});
  document.body.appendChild(t);
  clearTimeout(TOAST_TIMER);
  TOAST_TIMER=setTimeout(function(){
    if(!t.parentNode) return;
    t.classList.add('af-tout');
    setTimeout(function(){if(t.parentNode)t.remove();},280);
  },4500);
}

// ── BADGE SIDEBAR ────────────────────────────────────────────────────────────
function updateBadge(){
  var total=0;Object.keys(unreadCounts).forEach(function(k){total+=unreadCounts[k];});
  var b=document.getElementById('af-sbadge');if(!b) return;
  b.textContent=total>9?'9+':total;
  b.style.display=total>0?'flex':'none';
  if(total>0){b.classList.add('af-pop');setTimeout(function(){b.classList.remove('af-pop');},220);}
}

function injectBadge(){
  var t=setInterval(function(){
    var btn=document.querySelector('[title="Chat"]');if(!btn) return;
    clearInterval(t);
    if(document.getElementById('af-sbadge')) return;
    btn.style.position='relative';
    var b=document.createElement('div');b.id='af-sbadge';b.className='af-sbadge';b.style.display='none';b.textContent='0';
    btn.appendChild(b);
  },250);
}

// ── SOLICITUDES BADGE ────────────────────────────────────────────────────────
async function checkReqs(){
  try{
    var r=await sb.from('friendships').select('*',{count:'exact',head:true}).eq('addressee_id',ME).eq('status','pending');
    var n=r.count||0;
    var b=document.getElementById('af-req-badge');
    if(b){b.style.display=n>0?'inline-block':'none';b.textContent=n;}
  }catch(e){}
}

// ── WIRE SIDEBAR ─────────────────────────────────────────────────────────────
function wireSidebar(){
  var attempts=0;
  var t=setInterval(function(){
    attempts++;
    var addBtn=document.querySelector('[title="Agregar amigo"]');
    var chatBtn=document.querySelector('[title="Chat"]');
    if(addBtn||chatBtn||attempts>60){
      clearInterval(t);
      if(addBtn) addBtn.addEventListener('click',function(e){e.stopPropagation();togglePanel('friends');});
      if(chatBtn) chatBtn.addEventListener('click',function(e){e.stopPropagation();if(chatOpen){closeChat();}else{openChatWin();}});
    }
  },250);
}

// ── INIT ─────────────────────────────────────────────────────────────────────
function init(){
  sb=window._aura.sb;ME=window._aura.userId;
  injectStyles();buildFriendsPanel();buildChatWin();
  wireSidebar();injectBadge();checkReqs();subscribeGlobal();
  setInterval(checkReqs,60000);
}

function startWhenReady(){
  var t=setInterval(function(){
    if(window._aura&&window._aura.sb&&window._aura.userId){clearInterval(t);init();}
  },300);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',startWhenReady);}
else{startWhenReady();}

})();

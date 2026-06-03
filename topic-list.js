/* ═══════════════════════════════════════════════════════════════
   topic-list.js — Vista lista de temas  |  Aura Languages
   Depende de: STATE, TOPICS, enterTopic (globals de topic.html)
   ═══════════════════════════════════════════════════════════════ */

/* Chips de actividades por tipo de juego */
var ACT_CHIPS={
  translate: { l:'Traducir',   c:'#5eead4' },
  mc:        { l:'Quiz',       c:'#60a5fa' },
  match:     { l:'Emparejar',  c:'#c084fc' },
  fill:      { l:'Completar',  c:'#34d36b' },
  order:     { l:'Ordenar',    c:'#fbbf24' },
  fix:       { l:'Corregir',   c:'#ff5a5a' },
  scramble:  { l:'Descifra',   c:'#fb923c' },
  truefalse: { l:'V / F',      c:'#a3e635' },
  dialogue:  { l:'Diálogo',    c:'#e879f9' },
  sort:      { l:'Clasificar', c:'#38bdf8' },
  transform: { l:'Transforma', c:'#f472b6' },
  listen:    { l:'Escuchar',   c:'#4ade80' },
};

var NODE_HTML={
  done:'<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
  current:'<svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  locked:'<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
};

/* ── renderList ──────────────────────────────────────────────── */
function renderList(){
  STATE.view='list';
  document.title='Mi Ruta — Aura Languages';

  /* Ocultar game, mostrar list */
  var vGame=document.getElementById('viewGame');
  var vList=document.getElementById('viewList');
  if(vGame) vGame.style.display='none';
  if(vList) vList.style.display='';

  var _isAdmin=window._aura&&window._aura.profile&&window._aura.profile.role==='admin';
  var completedCount=_isAdmin?2:0; /* Tarjeta demo: 1 done, 1 current, resto locked */

  var totalXp=TOPICS.reduce(function(s,t){return s+t.xp;},0);
  var completedXp=_isAdmin?350:0;

  vList.innerHTML=
    /* Greeting */
    '<div class="tp-hello">'+
      '<div class="tp-hello-l">'+
        '<h1>Tu <em>ruta</em> de aprendizaje</h1>'+
        '<p>nivel <b>bronce · a1</b> · <b>'+completedCount+' de '+TOPICS.length+'</b> temas completados</p>'+
      '</div>'+
      '<div class="tp-hello-r"><div>siguiente meta</div><b>Completar Bronce</b></div>'+
    '</div>'+

    /* Section header Bronce */
    '<div class="sec-hd">'+
      '<div class="sec-hd-l">'+
        '<span class="rank-badge" style="--rk:var(--bronce)"><span class="rdot"></span>Bronce · A1</span>'+
        '<h2>Fundamentos <em>esenciales</em></h2>'+
      '</div>'+
      '<div class="meta">'+
        '<div class="mini-track"><i style="width:'+Math.round((completedXp/totalXp)*100)+'%"></i></div>'+
        '<b>'+completedXp+'</b> / '+totalXp+' XP'+
      '</div>'+
    '</div>'+

    /* Topic cards */
    '<div class="topics" id="topicCards"></div>'+

    /* Locked section — Plata */
    '<div class="sec-hd" style="margin-top:16px">'+
      '<div class="sec-hd-l">'+
        '<span class="rank-badge" style="--rk:var(--plata)"><span class="rdot"></span>Plata · A2</span>'+
        '<h2>El siguiente <em>nivel</em></h2>'+
      '</div>'+
      '<div class="meta">se desbloquea al <b>completar Bronce</b></div>'+
    '</div>'+
    '<div class="locked-row">'+
      '<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'+
      '<span><b>10 temas nuevos</b> · Pasado Simple, Comparativos, Presente Perfecto y más</span>'+
    '</div>';

  /* Render topic cards */
  var wrap=document.getElementById('topicCards');
  TOPICS.forEach(function(t,i){
    var hasGames=!!getGames(t.id);
    var _unlocked=i===0||_isAdmin;

    /* Status:
       'current' → primer tema disponible (resaltado verde)
       'available' → desbloqueado pero sin emphasis
       'locked' → bloqueado
    */
    var status;
    if(!_unlocked){
      status='locked';
    } else if(i===0){
      status='current'; /* siempre el primero como activo */
    } else {
      status='available'; /* admin: resto disponibles pero sin verde */
    }

    /* CSS class: current solo para el primero; el resto available = sin clase extra */
    var cssClass='topic'+(status==='current'?' current':status==='locked'?' locked':'');
    var el=document.createElement('div');
    el.className=cssClass;

    /* Chips de actividades */
    var games=getGames(t.id);
    var chips='';
    if(games){
      games.slice(0,4).forEach(function(g){
        var ac=ACT_CHIPS[g.id]||{l:g.id,c:'#7a7a7a'};
        chips+='<span class="chip"><span class="cdot" style="background:'+ac.c+'"></span>'+ac.l+'</span>';
      });
      if(games.length>4) chips+='<span class="chip">+' +(games.length-4)+'</span>';
    } else {
      chips='<span class="chip"><span class="cdot" style="background:#525252"></span>'+t.steps+' juegos</span>';
    }

    /* Node icon */
    var nodeHtml=status==='locked'
      ?NODE_HTML.locked
      :status==='current'
        ?NODE_HTML.current
        :String(i+1).padStart(2,'0');

    /* Status badge */
    var badgeHtml=status==='locked'
      ?'<span class="t-status lk">Bloqueado</span>'
      :status==='current'
        ?'<span class="t-status go">Empezar</span>'
        :'<span class="t-status go">Empezar</span>';

    var lines=t.title.split('\n');
    el.innerHTML=
      '<div class="t-node">'+nodeHtml+'</div>'+
      '<div class="t-text">'+
        '<div class="t-cat">'+t.cefr+' · '+t.rank+'</div>'+
        '<div class="t-ti">'+lines.join(' ')+'</div>'+
        '<div class="t-chips">'+chips+'</div>'+
      '</div>'+
      '<div class="t-right">'+
        '<div class="t-stats">'+
          '<div class="t-frac"><b>0</b>/'+t.steps+' juegos</div>'+
          '<div class="t-bar"><i style="width:0%"></i></div>'+
          '<div class="t-xp"><b>+'+t.xp+'</b> XP</div>'+
        '</div>'+
        badgeHtml+
        '<div class="t-go"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></div>'+
      '</div>';

    if(status!=='locked'){
      el.style.cursor='pointer';
      el.addEventListener('click',function(){enterTopic(t);});
    }
    wrap.appendChild(el);
  });
}

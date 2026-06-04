/* ═══════════════════════════════════════════════════════════════
   topic-list.js — Vista lista de temas  |  Aura Languages
   ═══════════════════════════════════════════════════════════════ */

var ACT_CHIPS={
  translate:{l:'Traducir',c:'#5eead4'},mc:{l:'Seleccion',c:'#60a5fa'},
  match:{l:'Emparejar',c:'#c084fc'},fill:{l:'Completar',c:'#34d36b'},
  order:{l:'Ordenar',c:'#fbbf24'},fix:{l:'Corregir',c:'#ff5a5a'},
  scramble:{l:'Descifra',c:'#fb923c'},truefalse:{l:'V / F',c:'#a3e635'},
  dialogue:{l:'Dialogo',c:'#e879f9'},sort:{l:'Clasificar',c:'#38bdf8'},
  transform:{l:'Transforma',c:'#f472b6'},listen:{l:'Escuchar',c:'#4ade80'},
};
var NODE_SVG={
  done:'<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
  current:'<svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  locked:'<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
};

function _emLastWord(str){
  var w=str.split(' ');
  if(w.length<2) return '<em>'+str+'</em>';
  var last=w.pop();
  return w.join(' ')+' <em>'+last+'</em>';
}

/* ── Caché de progreso (se actualiza en background) ─────────── */
var _progMap={};

function renderList(){
  STATE.view='list';
  document.title='Mi Ruta - Aura Languages';

  var vGame=document.getElementById('viewGame');
  var vList=document.getElementById('viewList');
  if(vGame) vGame.style.display='none';
  if(vList) vList.style.display='';

  /* Renderizar de inmediato con datos en caché (puede ser vacío) */
  _doRenderList();

  /* Luego buscar datos reales en Supabase y re-renderizar */
  var sb=window._aura&&window._aura.sb;
  var userId=window._aura&&window._aura.userId;
  var lang=(localStorage.getItem('aura_lang')||'en');
  if(sb&&userId){
    sb.from('topic_progress').select('*')
      .eq('user_id',userId).eq('language',lang)
      .then(function(res){
        if(res.error) return;
        _progMap={};
        (res.data||[]).forEach(function(r){ _progMap[r.topic_id]=r; });
        _doRenderList();
      });
  }
}

function _doRenderList(){
  var vList=document.getElementById('viewList');
  if(!vList) return;

  var totalXp=TOPICS.reduce(function(s,t){return s+t.xp;},0);
  var completedCount=0;
  var completedXp=0;
  TOPICS.forEach(function(t){
    if(_progMap[t.id]&&_progMap[t.id].completed){ completedCount++; completedXp+=t.xp; }
  });

  function topicStatus(t,i){
    var p=_progMap[t.id];
    if(p&&p.completed) return 'done';
    if(p&&p.games_done>0) return 'current';
    if(i===0) return 'current';
    var prev=TOPICS[i-1];
    if(_progMap[prev.id]&&_progMap[prev.id].completed) return 'current';
    return 'locked';
  }

  /* Hero: último topic en progreso, o el primero no completado */
  var heroTopic=null;
  var inProg=Object.keys(_progMap).filter(function(id){
    var r=_progMap[id]; return !r.completed&&r.games_done>0;
  });
  if(inProg.length>0){
    inProg.sort(function(a,b){
      return new Date(_progMap[b].last_played)-new Date(_progMap[a].last_played);
    });
    var found=TOPICS.filter(function(t){return t.id===parseInt(inProg[0]);})[0];
    if(found) heroTopic=found;
  }
  if(!heroTopic){
    heroTopic=TOPICS.filter(function(t){return !_progMap[t.id]||!_progMap[t.id].completed;})[0]||TOPICS[0];
  }

  var heroIdx=TOPICS.indexOf(heroTopic);
  var hGames=getGames(heroTopic.id);
  var hTotal=hGames?hGames.length:heroTopic.steps;
  var hProg=_progMap[heroTopic.id];
  var hDone=hProg?hProg.games_done:0;
  var heroBgUrl='https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&q=80';
  var heroLabel=hDone>0?'Continuar':'Empezar';

  var heroHtml=
    '<section class="cont">'+
      '<div class="cont-bg" style="background-image:url(\''+heroBgUrl+'\')"></div>'+
      '<div class="cont-in">'+
        '<div class="cont-tag">Continua donde lo dejaste</div>'+
        '<div class="cont-ti">'+_emLastWord(heroTopic.title)+'</div>'+
        '<div class="cont-meta">'+
          '<span>tema '+String(heroIdx+1).padStart(2,'0')+'</span>'+
          '<span class="dot"></span>'+
          '<span>'+heroTopic.sub.toLowerCase()+'</span>'+
          '<span class="dot"></span>'+
          '<span>'+hTotal+' actividades</span>'+
          '<span class="dot"></span>'+
          '<span>~'+(hTotal*3)+' min</span>'+
        '</div>'+
        '<div class="cont-prog">'+
          '<div class="track"><div class="fill" style="width:'+Math.round(hDone/hTotal*100)+'%"></div></div>'+
          '<span class="pct">'+hDone+'/'+hTotal+'</span>'+
        '</div>'+
      '</div>'+
      '<button class="cont-btn" onclick="enterTopic(TOPICS['+heroIdx+'])">'+
        heroLabel+' <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>'+
      '</button>'+
    '</section>';

  vList.innerHTML=
    '<div class="tp-hello">'+
      '<div class="tp-hello-l">'+
        '<h1>Tu <em>ruta</em> de aprendizaje</h1>'+
        '<p>nivel <b>bronce · a1</b> · <b>'+completedCount+' de '+TOPICS.length+'</b> temas completados</p>'+
      '</div>'+
      '<div class="tp-hello-r"><div>siguiente meta</div><b>Completar Bronce</b></div>'+
    '</div>'+
    heroHtml+
    '<div class="sec-hd">'+
      '<div class="sec-hd-l">'+
        '<span class="rank-badge" style="--rk:var(--bronce)"><span class="rdot"></span>Bronce · A1</span>'+
        '<h2>Fundamentos <em>esenciales</em></h2>'+
      '</div>'+
      '<div class="meta">'+
        '<div class="mini-track"><i style="width:'+Math.round(completedXp/totalXp*100)+'%"></i></div>'+
        '<b>'+completedXp+'</b> / '+totalXp+' XP'+
      '</div>'+
    '</div>'+
    '<div class="topics" id="topicCards"></div>'+
    '<div class="sec-hd" style="margin-top:16px">'+
      '<div class="sec-hd-l">'+
        '<span class="rank-badge" style="--rk:var(--plata)"><span class="rdot"></span>Plata · A2</span>'+
        '<h2>El siguiente <em>nivel</em></h2>'+
      '</div>'+
      '<div class="meta">se desbloquea al <b>completar Bronce</b></div>'+
    '</div>'+
    '<div class="locked-row">'+
      '<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'+
      '<span><b>10 temas nuevos</b> · Pasado Simple, Comparativos, Presente Perfecto y mas</span>'+
    '</div>';

  var wrap=document.getElementById('topicCards');
  TOPICS.forEach(function(t,i){
    var st=topicStatus(t,i);
    var unlocked=(st!=='locked');
    var games=getGames(t.id);

    var chips='';
    if(games){
      games.slice(0,4).forEach(function(g){
        var ac=ACT_CHIPS[g.id]||{l:g.id,c:'#7a7a7a'};
        chips+='<span class="chip"><span class="cdot" style="background:'+ac.c+'"></span>'+ac.l+'</span>';
      });
      if(games.length>4) chips+='<span class="chip">+'+(games.length-4)+'</span>';
    } else {
      chips='<span class="chip"><span class="cdot" style="background:#525252"></span>'+t.steps+' juegos</span>';
    }

    var tProg=
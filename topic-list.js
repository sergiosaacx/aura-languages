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

/* ── Progreso real del usuario (se carga una vez por sesión) ─── */
var _progMap={};
var _progLoaded=false;
var _bannerImg='https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&q=80';

function renderList(){
  STATE.view='list';
  document.title='Mi Ruta - Aura Languages';

  var vGame=document.getElementById('viewGame');
  var vList=document.getElementById('viewList');
  if(vGame) vGame.style.display='none';
  if(vList) vList.style.display='';

  /* Filtrar topics por idioma activo */
  var _lang=localStorage.getItem('aura_lang')||'en';
  var _topics=TOPICS.filter(function(t){return t.language===_lang;});

  /* Tarjeta activa (de la URL ?id=N) */
  var _params=new URLSearchParams(location.search);
  var _tarjetaId=parseInt(_params.get('id')||'1');
  var _tarjeta=_topics.find(function(t){return t.id===_tarjetaId;})||_topics[0];
  var _gStart=(_tarjetaId-1)*7+1;

  /* Si no hay temas para este idioma, mostrar estado vacío */
  if(!_topics.length){
    vList.innerHTML=
      '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;gap:16px;text-align:center;padding:40px 20px">'+
        '<svg viewBox="0 0 24 24" style="width:48px;height:48px;stroke:var(--muted);fill:none;stroke-width:1.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>'+
        '<h2 style="color:var(--ink);margin:0;font-size:20px">Contenido próximamente</h2>'+
        '<p style="color:var(--muted);font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;margin:0">Estamos preparando los temas para este idioma</p>'+
      '</div>';
    return;
  }

  /* Fetch progreso desde Supabase (solo una vez; re-renderiza al llegar) */
  if(!_progLoaded){
    var sb=window._aura&&window._aura.sb;
    var uid=window._aura&&window._aura.userId;
    if(sb&&uid){
      _progLoaded=true;
      var lang=localStorage.getItem('aura_lang')||'en';
      /* Leer imagen del banner desde admin_hero_config */
      sb.from('admin_hero_config').select('imagen_url').eq('id','topic_featured').maybeSingle()
        .then(function(bcfg){
          if(bcfg.data&&bcfg.data.imagen_url){
            _bannerImg=bcfg.data.imagen_url;
            var bg=document.querySelector('.cont-bg');
            if(bg) bg.style.backgroundImage='url('+_bannerImg+')';
          }
        });
      sb.from('topic_progress').select('*').eq('user_id',uid).eq('language',lang)
        .then(function(res){
          if(res.error||!res.data) return;
          _progMap={};
          res.data.forEach(function(r){_progMap[r.topic_id]=r;});
          if(STATE.view==='list') renderList();
        });
    }
  }

  /* ── Calcular estado usando _progMap ───────────────────────── */
  var totalXp=_topics.reduce(function(s,t){return s+t.xp;},0);
  var completedCount=0, completedXp=0;
  _topics.forEach(function(t){
    if(_progMap[t.id]&&_progMap[t.id].completed){completedCount++;completedXp+=t.xp;}
  });

  function topicStatus(i){
    /* Admin: todas las tarjetas disponibles */
    var _isAdmin=window._aura&&window._aura.profile&&window._aura.profile.role==='admin';
    if(_isAdmin) return 'current';
    var t=TOPICS[i];
    var p=_progMap[t.id];
    if(p&&p.completed) return 'done';
    if(p&&p.games_done>0) return 'current';
    if(i===0) return 'current';
    var prev=_topics[i-1];
    if(_progMap[prev.id]&&_progMap[prev.id].completed) return 'current';
    return 'locked';
  }

  /* Hero: último topic en progreso, o el primero no completado */
  var heroIdx=0;
  var latestTime=0;
  _topics.forEach(function(t,i){
    var p=_progMap[t.id];
    if(p&&!p.completed&&p.games_done>0){
      var ts=new Date(p.last_played).getTime();
      if(ts>latestTime){latestTime=ts;heroIdx=i;}
    }
  });
  if(latestTime===0){
    /* ninguno en progreso: primer topic no completado */
    for(var fi=0;fi<_topics.length;fi++){
      var fp=_progMap[_topics[fi].id];
      if(!fp||!fp.completed){heroIdx=fi;break;}
    }
  }

  var h=_topics[heroIdx];
  var hGames=getGames((h.id-1)*7+1);
  var hTotal=hGames?hGames.length:h.steps;
  var hProg=_progMap[h.id];
  var hDone=hProg?hProg.games_done:0;
  var heroLabel=hDone>0?'Continuar':'Empezar';
  var heroBgUrl=_bannerImg;

  var heroHtml=
    '<section class="cont">'+
      '<div class="cont-bg" style="background-image:url(\''+heroBgUrl+'\')"></div>'+
      '<div class="cont-in">'+
        '<div class="cont-tag">Continua donde lo dejaste</div>'+
        '<div class="cont-ti">'+_emLastWord(h.title)+'</div>'+
        '<div class="cont-meta">'+
          '<span>tema '+String(heroIdx+1).padStart(2,'0')+'</span>'+
          '<span class="dot"></span>'+
          '<span>'+h.sub.toLowerCase()+'</span>'+
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
      '<button class="cont-btn" onclick="enterTopic(_topics['+heroIdx+'])">'+
        heroLabel+' <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>'+
      '</button>'+
    '</section>';

  vList.innerHTML=
    '<div class="tp-hello">'+
      '<div class="tp-hello-l">'+
        '<h1>Tu <em>ruta</em> de aprendizaje</h1>'+
        '<p>nivel <b>bronce · a1</b> · <b>'+completedCount+' de '+_topics.length+'</b> temas completados</p>'+
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

  /* Cargar los 7 juegos de esta tarjeta, luego renderizar slots */
  var wrap=document.getElementById('topicCards');
  loadTarjetaJuegos(_tarjetaId, function(){
    for(var _pos=1;_pos<=7;_pos++){
      var juegoId=_gStart+_pos-1;
      var jTitle=getJuegoTitle(juegoId);
      if(!jTitle||typeof jTitle!=='string') jTitle='Juego '+_pos+' de 7';

      var _jProg=_progMap[juegoId];
      var _isAdmin=window._aura&&window._aura.profile&&window._aura.profile.role==='admin';
      var isDone=!!(_jProg&&_jProg.completed);
      var prevDone=_pos===1||!!(_progMap[_gStart+_pos-2]&&_progMap[_gStart+_pos-2].completed);
      var st=isDone?'done':(_isAdmin||_pos===1||prevDone)?'current':'locked';
      var unlocked=(st!=='locked');

      var games=getGames(juegoId);
      var chips='';
      if(games&&games.length){
        games.slice(0,4).forEach(function(g){
          var ac=ACT_CHIPS[g.id]||{l:g.id,c:'#7a7a7a'};
          chips+='<span class="chip"><span class="cdot" style="background:'+ac.c+'"></span>'+ac.l+'</span>';
        });
        if(games.length>4) chips+='<span class="chip">+'+(games.length-4)+'</span>';
      } else {
        chips='<span class="chip"><span class="cdot" style="background:#525252"></span>7 actividades</span>';
      }

      var done2=isDone?7:(_jProg?_jProg.games_done:0);
      var pct=Math.round(done2/7*100);
      var nodeHtml=isDone?NODE_SVG.done:st==='current'?NODE_SVG.current:unlocked?String(_pos).padStart(2,'0'):NODE_SVG.locked;

      var badge=st==='done'
        ?'<span class="t-status dn">Completado</span>'
        :st==='current'
          ?'<span class="t-status go">Continuar</span>'
          :unlocked
            ?'<span class="t-status go">Empezar</span>'
            :'<span class="t-status lk">Bloqueado</span>';

      var el=document.createElement('div');
      el.className='topic'+(st==='current'?' current':st==='done'?' done':st==='locked'?' locked':'');
      el.innerHTML=
        '<div class="t-node">'+nodeHtml+'</div>'+
        '<div class="t-text">'+
          '<div class="t-cat">'+_tarjeta.cat+'</div>'+
          '<div class="t-ti">'+jTitle+'</div>'+
          '<div class="t-chips">'+chips+'</div>'+
        '</div>'+
        '<div class="t-right">'+
          '<div class="t-stats">'+
            '<div class="t-frac"><b>'+done2+'</b>/7 actividades</div>'+
            '<div class="t-bar"><i style="width:'+pct+'%"></i></div>'+
            '<div class="t-xp"><b>+175</b> XP</div>'+
          '</div>'+
          badge+
          '<div class="t-go"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></div>'+
        '</div>';

      if(unlocked){
        el.style.cursor='pointer';
        (function(jid,tarj){
          el.addEventListener('click',function(){if(window.AuraSounds)AuraSounds.play('ui-click');enterJuego(jid,tarj);});
        })(juegoId,_tarjeta);
      }
      wrap.appendChild(el);
    }
  });
}

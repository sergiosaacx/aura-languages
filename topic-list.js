/* ═══════════════════════════════════════════════════════════════
   topic-list.js — Vista lista de juegos de una tarjeta
   Lee ?id=N de la URL → muestra los 7 juegos de tarjeta N
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

/* ── Progreso por juego ──────────────────────────────────────── */
var _progMap={};
var _progLoaded=false;

function _emLastWord(str){
  var w=str.split(' ');
  if(w.length<2) return '<em>'+str+'</em>';
  var last=w.pop();
  return w.join(' ')+' <em>'+last+'</em>';
}

/* ── renderList ──────────────────────────────────────────────── */
function renderList(){
  STATE.view='list';

  var vGame=document.getElementById('viewGame');
  var vList=document.getElementById('viewList');
  if(vGame) vGame.style.display='none';
  if(vList) vList.style.display='';

  /* Leer tarjeta de la URL */
  var params=new URLSearchParams(location.search);
  var tarjetaId=parseInt(params.get('id')||'1');
  var tarjeta=TOPICS.find(function(t){return t.id===tarjetaId;})||TOPICS[0];
  var _lang=localStorage.getItem('aura_lang')||'en';

  document.title=tarjeta.title+' — Aura Languages';

  /* Cargar progreso desde Supabase */
  if(!_progLoaded){
    var sb=window._aura&&window._aura.sb;
    var uid=window._aura&&window._aura.userId;
    if(sb&&uid){
      _progLoaded=true;
      var start=(tarjetaId-1)*7+1;
      var ids=[];for(var x=start;x<start+7;x++) ids.push(x);
      sb.from('topic_progress').select('*').eq('user_id',uid).eq('language',_lang).in('topic_id',ids)
        .then(function(res){
          if(res.error||!res.data) return;
          _progMap={};
          res.data.forEach(function(r){_progMap[r.topic_id]=r;});
          if(STATE.view==='list') renderList();
        });
    }
  }

  /* Mostrar loading mientras carga los juegos */
  vList.innerHTML='<div class="tp-list-view"><div style="color:var(--muted);font-family:var(--mono);font-size:12px;padding:40px;text-align:center;letter-spacing:.1em">Cargando juegos…</div></div>';

  /* Cargar los 7 archivos de juego de esta tarjeta */
  loadTarjetaJuegos(tarjetaId, function(){
    _renderJuegoList(tarjeta, tarjetaId, _lang);
  });
}

function _renderJuegoList(tarjeta, tarjetaId, lang){
  var vList=document.getElementById('viewList');
  var rc=RM[tarjeta.rank]||'#cd7f32';
  var start=(tarjetaId-1)*7+1;
  var _isAdmin=window._aura&&window._aura.profile&&window._aura.profile.role==='admin';

  /* Contar juegos completados */
  var totalDone=0;
  for(var i=start;i<start+7;i++){
    if(_progMap[i]&&_progMap[i].completed) totalDone++;
  }
  var totalXp=tarjeta.xp;

  /* Hero */
  var heroHtml=
    '<section class="cont">'+
      '<div class="cont-bg" style="background-image:url(\''+tarjeta.img+'\')"></div>'+
      '<div class="cont-in">'+
        '<div class="cont-tag">'+tarjeta.cat+'</div>'+
        '<div class="cont-ti">'+_emLastWord(tarjeta.title)+'</div>'+
        '<div class="cont-meta">'+
          '<span>'+tarjeta.sub+'</span>'+
          '<span class="dot"></span>'+
          '<span>7 juegos</span>'+
          '<span class="dot"></span>'+
          '<span>'+totalDone+'/7 completados</span>'+
        '</div>'+
        '<div class="cont-prog">'+
          '<div class="track"><div class="fill" style="width:'+Math.round(totalDone/7*100)+'%"></div></div>'+
          '<span class="pct">'+totalDone+'/7</span>'+
        '</div>'+
      '</div>'+
      '<button class="cont-btn" onclick="enterTopic(TOPICS.find(function(t){return t.id==='+tarjetaId+';}))">'+
        (totalDone===0?'Empezar':'Continuar')+' <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>'+
      '</button>'+
    '</section>';

  /* Lista de 7 juegos */
  var juegosHtml='<div class="topics" id="juegoCards"></div>';

  vList.innerHTML=
    '<div class="tp-list-view">'+
      '<div class="tp-hello">'+
        '<div class="tp-hello-l">'+
          '<h1>'+_emLastWord(tarjeta.title)+'</h1>'+
          '<p><span class="rank-badge" style="--rk:'+rc+'"><span class="rdot"></span>'+tarjeta.rank+' · '+tarjeta.cefr+'</span></p>'+
        '</div>'+
        '<div class="tp-hello-r"><div>progreso</div><b>'+totalDone+' / 7 juegos</b></div>'+
      '</div>'+
      heroHtml+
      '<div class="sec-hd">'+
        '<div class="sec-hd-l"><h2>Juegos de <em>esta tarjeta</em></h2></div>'+
        '<div class="meta"><b>'+totalXp+'</b> XP total</div>'+
      '</div>'+
      juegosHtml+
    '</div>';

  var wrap=document.getElementById('juegoCards');
  for(var pos=1;pos<=7;pos++){
    var juegoId=start+pos-1;
    var p=_progMap[juegoId];
    var isDone=p&&p.completed;
    var prevDone=pos===1||(!!(_progMap[start+pos-2]&&_progMap[start+pos-2].completed));
    var st=isDone?'done':(_isAdmin||pos===1||prevDone)?'current':'locked';
    var unlocked=(st!=='locked');

    var jTitle=getJuegoTitle(juegoId)||('Juego '+pos+'/7');
    var games=getGames(juegoId);
    var chips='';
    if(games){
      games.slice(0,4).forEach(function(g){
        var ac=ACT_CHIPS[g.id]||{l:g.id,c:'#7a7a7a'};
        chips+='<span class="chip"><span class="cdot" style="background:'+ac.c+'"></span>'+ac.l+'</span>';
      });
      if(games.length>4) chips+='<span class="chip">+'+(games.length-4)+'</span>';
    } else {
      chips='<span class="chip"><span class="cdot" style="background:#525252"></span>7 actividades</span>';
    }

    var nodeHtml=st==='done'?NODE_SVG.done:st==='current'?NODE_SVG.current:NODE_SVG.locked;
    var badge=st==='done'
      ?'<span class="t-status dn">Completado</span>'
      :st==='current'
        ?'<span class="t-status go">'+(isDone||pos===1&&totalDone===0?'Empezar':'Continuar')+'</span>'
        :'<span class="t-status lk">Bloqueado</span>';

    var el=document.createElement('div');
    el.className='topic'+(st==='current'?' current':st==='done'?' done':' locked');
    el.innerHTML=
      '<div class="t-node">'+nodeHtml+'</div>'+
      '<div class="t-text">'+
        '<div class="t-cat">Juego '+pos+' / 7</div>'+
        '<div class="t-ti">'+jTitle+'</div>'+
        '<div class="t-chips">'+chips+'</div>'+
      '</div>'+
      '<div class="t-right">'+
        '<div class="t-stats">'+
          '<div class="t-frac"><b>7</b> actividades</div>'+
          '<div class="t-bar"><i style="width:'+(isDone?'100':'0')+'%"></i></div>'+
          '<div class="t-xp"><b>+175</b> XP</div>'+
        '</div>'+
        badge+
        '<div class="t-go"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></div>'+
      '</div>';

    if(unlocked){
      el.style.cursor='pointer';
      (function(jid, tarj){
        el.addEventListener('click', function(){ enterJuego(jid, tarj); });
      })(juegoId, tarjeta);
    }
    wrap.appendChild(el);
  }
}

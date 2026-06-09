
var cur=0,N=5;
var _movieData=[];
function go(idx){
  cur=((idx%N)+N)%N;
  var ids=['c0','c1','c2','c3','c4'];
  var pos=['pos-l2','pos-l1','pos-c','pos-r1','pos-r2'];
  ids.forEach(function(id,i){
    var el=document.getElementById(id);
    if(el){el.className='mcard '+pos[((i-cur+N)%N)];}
  });
  var dots=document.querySelectorAll('.dot');
  dots.forEach(function(d,i){d.classList.remove('on');d.classList.toggle('on',i===cur);});
  // Center card is always (cur+2)%N
  var centerIdx=(cur+2)%N;
  var m=_movieData[centerIdx];
  if(m){
    var ct=document.getElementById('cur-ti');
    if(ct) ct.textContent=m.titulo_main+(m.titulo_sub?' '+m.titulo_sub:'');
    var cl=document.getElementById('cur-len');
    if(cl) cl.textContent=(m.escenas_count||'?')+' '+(window.auraT?window.auraT('movies_scenes'):'escenas');
    _updateDetail(m);
  }
}

function _updateDetail(m){
  var dt=document.getElementById('detail-ti'); if(dt) dt.textContent=m.titulo_main;
  var dc=document.getElementById('detail-cat'); if(dc) dc.textContent=(m.genero||'')+(m['año']?' · '+m['año']:'');
  var dd=document.getElementById('detail-desc');
  if(dd){
    var _ul=localStorage.getItem('aura_ui_lang')||'es';
    var _td=(m.meta&&m.meta['desc_'+_ul])||m.descripcion||'';
    dd.textContent=_td;
  }
  var di=document.getElementById('detail-img');
  if(di && m.portada_url) di.src=m.portada_url;
  var pb=document.querySelector('.detail-play');
  if(pb) pb.onclick=function(){ window.location.href='play-movies.html?movie='+encodeURIComponent(m.slug); };
  _loadScenes(m.id);
}

function _loadScenes(movieId){
  if(!window._aura||!window._aura.sb) return;
  window._aura.sb.from('escenas')
    .select('shelf_tm,shelf_line,shelf_tag')
    .eq('pelicula_id',movieId).order('orden').limit(5)
    .then(function(res){
      var list=document.querySelector('.scenes-list'); if(!list) return;
      var scenes=(res.error||!res.data)?[]:res.data;
      var more=document.querySelector('.scenes-more');
      if(more) more.textContent=scenes.length+' '+(window.auraT?window.auraT('movies_total'):'totales →');
      if(!scenes.length){
        list.innerHTML='<div style="color:var(--muted);font-size:11px;padding:10px;">'+(window.auraT?window.auraT('movies_no_scenes'):'Sin escenas configuradas')+'</div>';
        return;
      }
      list.innerHTML=scenes.map(function(s,i){
        var tag=(s.shelf_tag||'').toLowerCase();
        var dc=tag==='fácil'||tag==='facil'?'easy':tag==='difícil'||tag==='dificil'?'hard':'';
        return '<div class="scene'+(i===0?' active':'')+'">'+
          '<span class="scene-tm">'+(s.shelf_tm||'')+'</span>'+
          '<div class="scene-mt"><b>'+(s.shelf_line||'Escena '+(i+1))+'</b>'+
          '<span>'+(s.shelf_tag||'')+'</span></div>'+
          '<span class="scene-diff '+dc+'">'+(s.shelf_tag||'Intermedio')+'</span>'+
          '</div>';
      }).join('');
    });
}

function _activeLangMovies(){
  var l=null;
  try{l=localStorage.getItem('aura_lang');}catch(e){}
  return l||(window._aura&&(window._aura.lang||window._aura.active_language))||'en';
}

function _loadCarrusel(){
  if(!window._aura||!window._aura.sb){setTimeout(_loadCarrusel,500);return;}
  var _lang=_activeLangMovies();
  // Para inglés: incluir películas con language='en' O language IS NULL (compatibilidad con registros anteriores)
  var _pelQuery=window._aura.sb.from('peliculas')
    .select('id,slug,titulo_main,titulo_sub,portada_url,genero,año,descripcion,activo')
    .eq('activo',true).order('orden').limit(5);
  if(_lang==='en'){
    _pelQuery=_pelQuery.or('language.eq.en,language.is.null');
  } else {
    _pelQuery=_pelQuery.eq('language',_lang);
  }
  _pelQuery
    .then(function(res){
      var data=(res.error||!res.data)?[]:res.data;
      var ids=['c0','c1','c2','c3','c4'];
      var PH='<div class="mcard-ph"><span class="mcard-ph-icon">🎬</span><span class="mcard-ph-txt" data-i18n="movies_coming_soon">Próximamente</span></div>';
      // Reset todos a placeholder primero
      ids.forEach(function(id){ var el=document.getElementById(id); if(el) el.innerHTML=PH; });
      data.forEach(function(p,i){
        _movieData[i]=p;
        var el=document.getElementById(ids[i]); if(!el) return;
        if(p.portada_url){
          el.innerHTML='<img src="'+p.portada_url+'" style="width:100%;height:100%;object-fit:cover;border-radius:22px;" alt="'+p.titulo_main+'">';
        } else {
          el.innerHTML=PH;
        }
        el.setAttribute('title',p.titulo_main||'');
      });
      if(data.length){
        var firstIdx=0;
        var initCur=((firstIdx-2)%5+5)%5;
        go(initCur);
      } else if(_lang==='en'){
        // Solo para inglés: fallback a JSON hardcodeado
        _loadMoviesFromJson();
      }
      // Otros idiomas sin películas configuradas: quedan como Próximamente
    });
}

function _loadMoviesFromJson(){
  var slugs=['incredibles-2','avengers-end-game'];
  var loaded=0;
  slugs.forEach(function(slug,i){
    fetch('data/movies/'+slug+'.json?_='+Date.now())
      .then(function(r){ return r.ok?r.json():null; })
      .then(function(data){
        if(!data) return;
        _movieData[loaded]={
          id: data.slug,
          slug: data.slug,
          titulo_main: data.titleMain||'',
          titulo_sub: data.titleSub||'',
          portada_url: data.portada_url||'',
          genero: data.meta||'',
          descripcion: data.desc||'',
          activo: true
        };
        var el=document.getElementById('c'+loaded);
        if(el && data.portada_url){
          el.innerHTML='<img src="'+data.portada_url+'" style="width:100%;height:100%;object-fit:cover;border-radius:22px;" alt="'+data.titleMain+'">';
        }
        loaded++;
        if(loaded===1){
          var initCur=((0-2)%5+5)%5;
          go(initCur);
        }
      }).catch(function(){});
  });
}

document.addEventListener('click',function(e){
  var el=e.target.closest('.mcard');
  if(!el) return;
  var ids=['c0','c1','c2','c3','c4'];
  var idx=ids.indexOf(el.id);
  if(idx<0) return;
  var centerIdx=(cur+2)%N;
  if(idx===centerIdx){
    var m=_movieData[centerIdx];
    if(m && m.slug){
      window.location.href='play-movies.html?movie='+encodeURIComponent(m.slug);
    }
  } else {
    go((idx-2+N)%N);
  }
});

document.addEventListener('keydown',function(e){
  if(e.key==='ArrowLeft') go(cur-1);
  if(e.key==='ArrowRight') go(cur+1);
});

(function autoSetupDots(){
  var dots=document.querySelectorAll('.dot');
  dots.forEach(function(d,i){ d.addEventListener('click',function(){ go(i); }); });
})();




// ── Auto-rotate carrusel ──────────────────────────────────────────────────
var _autoT=null;
function _startAuto(){ _autoT=setInterval(function(){go(cur+1);},4000); }
function _stopAuto(){ clearInterval(_autoT); }
_startAuto();
var _cw=document.querySelector('.carousel-wrap');
if(_cw){
  _cw.addEventListener('mouseenter',_stopAuto);
  _cw.addEventListener('mouseleave',_startAuto);
}
var _bp=document.getElementById('carPrev');
var _bn=document.getElementById('carNext');
if(_bp) _bp.addEventListener('click',function(){ if(window.AuraSounds)AuraSounds.play('ui-click');_stopAuto();go(cur-1);_startAuto(); });
if(_bn) _bn.addEventListener('click',function(){ if(window.AuraSounds)AuraSounds.play('ui-click');_stopAuto();go(cur+1);_startAuto(); });

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',_loadCarrusel);
} else { setTimeout(_loadCarrusel,100); }

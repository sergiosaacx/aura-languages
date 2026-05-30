/* ════════════════════════════════════════════════════════════════
   examen-speaking-engine.js  v1
   Engine del Speaking del examen de ascenso.
   · Carga N líneas al azar del pool (Supabase exam_content section='speaking')
   · Reproduce el clip de YouTube como fondo semitransparente del panel ShadowLab
   · Micrófono real (getUserMedia) con timer y estado visual
   · Navegación entre líneas con dots
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

/* ── Estado ── */
var _pool     = [];
var _lpe      = 5;
var _queue    = [];
var _idx      = 0;
var _ytPlayer = null;
var _ytReady  = false;
var _micStream= null;
var _recTimer = null;
var _recSecs  = 0;
var _recActive= false;

/* ── Supabase ── */
function _sb(){
  if(window._aura&&window._aura.sb) return window._aura.sb;
  if(window.auraSupabase) return window.auraSupabase;
  return null;
}

/* ── Shuffle ── */
function _shuffle(arr){
  var a=[].concat(arr);
  for(var i=a.length-1;i>0;i--){
    var j=Math.floor(Math.random()*(i+1));
    var t=a[i];a[i]=a[j];a[j]=t;
  }
  return a;
}

/* ── Formatear tiempo ── */
function _fmtT(s){
  s=Math.floor(+s||0);
  var m=Math.floor(s/60),r=s%60;
  return m+':'+String(r).padStart(2,'0');
}

/* ── Cargar pool desde Supabase ── */
async function _loadPool(rank,lang){
  var sb=_sb(); if(!sb) return false;
  var res=await sb.from('exam_content').select('*')
    .eq('section','speaking').eq('rank',rank).eq('language',lang).eq('active',true);
  if(res.error||!res.data) return false;
  _pool=[]; _lpe=5;
  res.data.forEach(function(row){
    var c=row.content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c={};}}
    if(row.content_type==='speaking_config') _lpe=+(c&&c.lines_per_exam)||5;
    else if(row.content_type==='speaking_scene'&&c&&c.youtube_id) _pool.push(c);
  });
  return _pool.length>0;
}

/* ── Asegurar YouTube IFrame API ── */
function _ensureYT(cb){
  if(window.YT&&window.YT.Player){ cb(); return; }
  var prev=window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady=function(){
    if(typeof prev==='function') prev();
    cb();
  };
  if(!document.querySelector('script[src*="youtube.com/iframe_api"]')){
    var s=document.createElement('script');
    s.src='https://www.youtube.com/iframe_api';
    document.head.appendChild(s);
  }
}

/* ── Construir HTML del panel ── */
function _buildHTML(){
  var waveSpans='';
  for(var i=0;i<20;i++) waveSpans+='<span></span>';

  var dots='';
  for(var d=0;d<_queue.length;d++){
    dots+='<span class="spk-dot" data-di="'+d+'" style="display:inline-block;width:7px;height:7px;border-radius:50%;'+
      'background:'+(d===0?'rgba(255,154,108,1)':'rgba(255,255,255,.2)')+';transition:.2s;cursor:pointer;"></span>';
  }

  var navHTML = _queue.length>1
    ? '<div id="spk-nav" style="display:flex;align-items:center;gap:10px;margin-top:10px;">'+
        '<button id="spk-prev" onclick="window._speakPrev()" style="background:none;border:1px solid rgba(255,154,108,.3);'+
          'border-radius:50%;width:28px;height:28px;color:rgba(255,154,108,.7);font-size:14px;cursor:pointer;'+
          'display:flex;align-items:center;justify-content:center;transition:.15s;" title="Anterior">&#8592;</button>'+
        '<div id="spk-dots" style="display:flex;gap:5px;">'+dots+'</div>'+
        '<button id="spk-next" onclick="window._speakNext()" style="background:none;border:1px solid rgba(255,154,108,.3);'+
          'border-radius:50%;width:28px;height:28px;color:rgba(255,154,108,.7);font-size:14px;cursor:pointer;'+
          'display:flex;align-items:center;justify-content:center;transition:.15s;" title="Siguiente">&#8594;</button>'+
      '</div>'
    : '';

  return '<!-- Panel 1: ShadowLab con video de fondo -->'+
  '<div class="exam-panel shadow-panel" id="spk-main-panel" style="--c:255,154,108;position:relative;overflow:hidden;">'+

    /* ── Video de fondo ── */
    '<div id="spk-video-bg" style="position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden;">'+
      '<div id="spk-yt-wrap" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);'+
        'width:177.78%;height:177.78%;min-width:100%;min-height:100%;"></div>'+
      /* Overlay oscuro sobre el video */
      '<div style="position:absolute;inset:0;background:rgba(10,9,22,.62);"></div>'+
    '</div>'+

    /* ── Contenido (encima del video) ── */
    '<header class="ep-h" style="position:relative;z-index:1;">'+
      '<span class="ep-tag" id="spk-tag">shadowlab · lectura en voz alta</span>'+
      '<span class="ep-count" id="spk-count">línea 1 / '+_queue.length+'</span>'+
    '</header>'+
    '<div class="shadow-stage" style="position:relative;z-index:1;">'+
      '<p class="shadow-sentence" id="spk-sentence"></p>'+
      '<p class="shadow-ipa" id="spk-ipa" style="margin-top:2px;"></p>'+
      '<div class="shadow-wave" id="spk-wave">'+waveSpans+'</div>'+
      '<button class="shadow-mic" id="spk-mic-btn" onclick="window._speakToggleMic()">'+
        '<svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z"/>'+
        '<path d="M19 11a7 7 0 01-14 0"/><line x1="12" y1="18" x2="12" y2="22"/>'+
        '<line x1="8" y1="22" x2="16" y2="22"/></svg>'+
      '</button>'+
      '<div class="shadow-meta">'+
        '<b id="spk-meta-lbl">toca para grabar</b>'+
        '<span id="spk-meta-tmr">00:00 / 00:30</span>'+
      '</div>'+
      navHTML+
    '</div>'+
  '</div>'+

  /* ── Panel 2: Switcher A / B ── */
  '<div class="exam-panel" style="--c:255,154,108;">'+
    '<header class="ep-h">'+
      '<span class="ep-tag">dos partes · cambia cuando quieras</span>'+
      '<span class="ep-count" id="spk-ab-count">A en curso · B pendiente</span>'+
    '</header>'+
    '<div class="speak-switch">'+
      '<button class="ss-tab active" id="spk-tab-a">'+
        '<span class="ss-num">A</span>'+
        '<div class="ss-meta">'+
          '<b>Lectura en voz alta</b>'+
          '<span>en curso · pronunciación, ritmo, fluidez</span>'+
        '</div>'+
        '<span class="ss-status live" id="spk-status-a">en curso</span>'+
      '</button>'+
      '<button class="ss-tab" id="spk-tab-b">'+
        '<span class="ss-num">B</span>'+
        '<div class="ss-meta">'+
          '<b>Respuesta libre · 90s</b>'+
          '<span>pendiente · tema improvisado</span>'+
        '</div>'+
        '<span class="ss-status">disponible 90s</span>'+
      '</button>'+
    '</div>'+
  '</div>';
}

/* ── Mostrar línea N ── */
function _showLine(i){
  var line=_queue[i];
  if(!line) return;

  /* Texto */
  var sentEl=document.getElementById('spk-sentence');
  var ipaEl =document.getElementById('spk-ipa');
  var cntEl =document.getElementById('spk-count');
  if(sentEl) sentEl.textContent='"'+line.phrase+'"';
  if(ipaEl)  ipaEl.textContent=line.pelicula_titulo ? '— '+line.pelicula_titulo : '';
  if(cntEl)  cntEl.textContent='línea '+(i+1)+' / '+_queue.length;

  /* Dots */
  document.querySelectorAll('.spk-dot').forEach(function(dot,di){
    dot.style.background = di===i ? 'rgba(255,154,108,1)' : 'rgba(255,255,255,.2)';
    dot.style.transform  = di===i ? 'scale(1.3)' : 'scale(1)';
  });

  /* Flechas */
  var prev=document.getElementById('spk-prev');
  var next=document.getElementById('spk-next');
  if(prev) prev.style.opacity=i>0?'1':'.3';
  if(next) next.style.opacity=i<_queue.length-1?'1':'.3';

  /* Resetear mic */
  _stopMic();
  var lblEl=document.getElementById('spk-meta-lbl');
  var tmrEl=document.getElementById('spk-meta-tmr');
  if(lblEl) lblEl.textContent='toca para grabar';
  if(tmrEl) tmrEl.textContent='00:00 / 00:30';

  /* Reproducir clip en YouTube */
  _playClip(line);
}

/* ── Reproducir clip YouTube ── */
function _playClip(line){
  if(!line||!line.youtube_id) return;
  if(!_ytReady||!_ytPlayer) return;
  try{
    _ytPlayer.loadVideoById({
      videoId: line.youtube_id,
      startSeconds: line.start||0,
      endSeconds: (line.end||0)+0.5
    });
  }catch(e){ console.warn('[speaking-engine] YT loadVideoById',e); }
}

/* ── Crear YouTube Player ── */
function _createYTPlayer(firstLine){
  var wrap=document.getElementById('spk-yt-wrap');
  if(!wrap) return;

  /* contenedor del player */
  var div=document.createElement('div');
  div.id='spk-yt-player';
  div.style.cssText='width:100%;height:100%;';
  wrap.appendChild(div);

  _ensureYT(function(){
    _ytPlayer=new YT.Player('spk-yt-player',{
      width:'100%', height:'100%',
      videoId: firstLine.youtube_id,
      playerVars:{
        start: Math.floor(firstLine.start||0),
        end:   Math.ceil((firstLine.end||0)+0.5),
        autoplay:1, controls:0, modestbranding:1,
        rel:0, showinfo:0, iv_load_policy:3,
        playsinline:1
      },
      events:{
        onReady: function(e){
          _ytReady=true;
          e.target.setVolume(100);
          _playClip(_queue[_idx]);
        },
        onStateChange: function(e){
          /* Al terminar el clip, rebobinar y repetir */
          if(e.data===YT.PlayerState.ENDED){
            var line=_queue[_idx];
            if(line&&_ytPlayer){
              _ytPlayer.seekTo(line.start||0, true);
              _ytPlayer.playVideo();
            }
          }
        }
      }
    });
  });
}

/* ── Mic: toggle ── */
window._speakToggleMic=function(){
  if(_recActive){ _stopMic(); return; }
  _startMic();
};

function _startMic(){
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia) return;
  navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
    _micStream=stream;
    _recActive=true;
    _recSecs=0;

    var btn=document.getElementById('spk-mic-btn');
    var lbl=document.getElementById('spk-meta-lbl');
    var tmr=document.getElementById('spk-meta-tmr');
    var wave=document.getElementById('spk-wave');

    if(btn)  btn.style.boxShadow='0 0 0 6px rgba(255,154,108,.25)';
    if(lbl)  lbl.textContent='grabando · habla ahora';
    if(wave) wave.style.animationPlayState='running';

    _recTimer=setInterval(function(){
      _recSecs++;
      if(tmr) tmr.textContent=_fmtT(_recSecs)+' / 00:30';
      if(_recSecs>=30) _stopMic();
    },1000);

    /* Pausa el video mientras graba */
    try{ if(_ytPlayer&&_ytReady) _ytPlayer.pauseVideo(); }catch(e){}

  }).catch(function(err){
    console.warn('[speaking-engine] mic',err);
  });
}

function _stopMic(){
  if(!_recActive&&!_micStream) return;
  _recActive=false;
  clearInterval(_recTimer);
  _recTimer=null;

  if(_micStream){
    _micStream.getTracks().forEach(function(t){ t.stop(); });
    _micStream=null;
  }

  var btn=document.getElementById('spk-mic-btn');
  var lbl=document.getElementById('spk-meta-lbl');
  if(btn) btn.style.boxShadow='';
  if(lbl) lbl.textContent='toca para grabar';

  /* Reanuda el video */
  try{ if(_ytPlayer&&_ytReady) _ytPlayer.playVideo(); }catch(e){}
}

/* ── Navegación ── */
window._speakNext=function(){
  if(_idx<_queue.length-1){ _idx++; _showLine(_idx); }
};
window._speakPrev=function(){
  if(_idx>0){ _idx--; _showLine(_idx); }
};

/* ── Detener engine (al salir de pestaña) ── */
window.stopExamSpeaking=function(){
  _stopMic();
  try{ if(_ytPlayer&&_ytReady){ _ytPlayer.stopVideo(); } }catch(e){}
};

/* ── Entry point principal ── */
window.initExamSpeaking=async function(opts){
  var rank=(opts&&opts.rank)||'bronce';
  var lang=(opts&&opts.lang)||'en';

  var host=document.querySelector('.mid-content[data-skill="speak"]');
  if(!host) return;

  /* Limpiar estado anterior */
  _stopMic();
  if(_ytPlayer){ try{ _ytPlayer.destroy(); }catch(e){} _ytPlayer=null; _ytReady=false; }

  host.innerHTML='<div style="display:flex;align-items:center;justify-content:center;'+
    'min-height:300px;color:rgba(255,154,108,.5);font-size:12px;">Cargando speaking…</div>';

  var ok=await _loadPool(rank,lang);
  if(!ok){
    host.innerHTML='<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;'+
      'min-height:300px;gap:10px;padding:20px;text-align:center;">'+
      '<span style="font-size:24px;">🎙️</span>'+
      '<span style="color:rgba(255,154,108,.6);font-size:12px;">Sin contenido configurado para Speaking.</span>'+
      '<span style="color:rgba(255,255,255,.25);font-size:10px;">El administrador debe seleccionar líneas desde el editor.</span>'+
      '</div>';
    return;
  }

  /* Seleccionar N líneas al azar */
  _queue=_shuffle(_pool).slice(0,Math.min(_lpe,_pool.length));
  _idx=0;

  /* Renderizar panel */
  host.innerHTML=_buildHTML();

  /* Dots — click directo */
  document.querySelectorAll('.spk-dot').forEach(function(dot){
    dot.addEventListener('click',function(){
      var di=parseInt(dot.dataset.di)||0;
      if(di!==_idx){ _idx=di; _showLine(_idx); }
    });
  });

  /* Mostrar primera línea (texto) */
  _showLine(_idx);

  /* Crear YouTube player */
  _createYTPlayer(_queue[0]);
};

})();

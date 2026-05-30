/* ════════════════════════════════════════════════════════════════
   examen-speaking-engine.js  v2
   Speaking engine del examen de ascenso — replica el flujo de ShadowLab:
   · Pantalla "Iniciar" antes de comenzar
   · Video como fondo semitransparente (sin loop — se detiene al terminar)
   · Micrófono automático al terminar el clip (SpeechRecognition)
   · Calificación con LCS igual que ShadowLab
   · Botón "Repetir" para volver a ver el clip
   · Navegación entre líneas con dots
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

/* ── Estado ── */
var _pool      = [];
var _lpe       = 5;
var _queue     = [];
var _idx       = 0;
var _ytPlayer  = null;
var _ytReady   = false;
var _recog     = null;
var _micStream = null;
var _audioCtx  = null;
var _analyser  = null;
var _audioSrc  = null;
var _waveRaf   = null;
var _cdIv      = null;
var _phase     = 'idle'; /* idle | playing | listening | result */
var _listenStart = 0;
var MIC_TIMEOUT  = 15; /* seg máx. de escucha */

/* ── SVGs ── */
var MIC_SVG  = '<svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z"/>'+
               '<path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="18" x2="12" y2="22"/>'+
               '<line x1="8" y1="22" x2="16" y2="22"/></svg>';
var STOP_SVG = '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor"/></svg>';
var NEXT_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'+
               '<path d="M5 12h14M13 5l7 7-7 7"/></svg>';
var REP_SVG  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'+
               '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>';

/* ── Supabase ── */
function _sb(){
  if(window._aura&&window._aura.sb) return window._aura.sb;
  if(window.auraSupabase) return window.auraSupabase;
  return null;
}

/* ── Helpers ── */
function _shuffle(arr){
  var a=[].concat(arr);
  for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}
  return a;
}
function _fmtT(s){s=Math.floor(+s||0);var m=Math.floor(s/60),r=s%60;return m+':'+String(r).padStart(2,'0');}
function _$(id){return document.getElementById(id);}

/* ── Cargar pool ── */
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

/* ── YouTube API ── */
function _ensureYT(cb){
  if(window.YT&&window.YT.Player){cb();return;}
  var prev=window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady=function(){if(typeof prev==='function')prev();cb();};
  if(!document.querySelector('script[src*="youtube.com/iframe_api"]')){
    var s=document.createElement('script');s.src='https://www.youtube.com/iframe_api';document.head.appendChild(s);
  }
}

/* ── Wave con mic (Web Audio) ── */
function _connectWave(stream){
  try{
    if(!_audioCtx) _audioCtx=new(window.AudioContext||window.webkitAudioContext)();
    _analyser=_audioCtx.createAnalyser(); _analyser.fftSize=64;
    _audioSrc=_audioCtx.createMediaStreamSource(stream); _audioSrc.connect(_analyser);
    (function loop(){
      _waveRaf=requestAnimationFrame(loop);
      var data=new Uint8Array(_analyser.frequencyBinCount);
      _analyser.getByteFrequencyData(data);
      var spans=document.querySelectorAll('#spk-wave span');
      spans.forEach(function(b,i){
        var h=Math.max(10,(data[i%data.length]/255)*90);
        b.style.height=h+'%'; b.style.animation='none';
      });
    })();
  }catch(e){}
}
function _stopWave(){
  cancelAnimationFrame(_waveRaf); _waveRaf=null;
  try{if(_audioSrc)_audioSrc.disconnect();}catch(e){}
  _analyser=null;
  /* Restaurar animación CSS */
  document.querySelectorAll('#spk-wave span').forEach(function(b){
    b.style.height=''; b.style.animation='';
  });
}

/* ── SpeechRecognition ── */
function _hasSpeech(){return !!(window.SpeechRecognition||window.webkitSpeechRecognition);}

function _startListen(onResult,onFail){
  var Rec=window.SpeechRecognition||window.webkitSpeechRecognition;
  var rec=new Rec(); rec.lang='en-US'; rec.interimResults=false; rec.maxAlternatives=1;
  _recog=rec; var done=false;
  _listenStart=Date.now();

  /* Timeout */
  var to=setTimeout(function(){if(!done){done=true;try{rec.stop();}catch(e){}onFail('timeout');}},MIC_TIMEOUT*1000);

  /* Mic stream para waveform */
  if(navigator.mediaDevices) navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
    _micStream=stream; _connectWave(stream);
  }).catch(function(){});

  rec.onresult=function(e){
    if(done)return; done=true; clearTimeout(to);
    var t=e.results[0][0].transcript||'';
    onResult(t);
  };
  rec.onerror=function(e){if(done)return; done=true; clearTimeout(to); onFail(e.error);};
  rec.onend=function(){
    if(_micStream){_micStream.getTracks().forEach(function(t){t.stop();});_micStream=null;}
    _stopWave();
  };
  rec.start();
}

function _stopListen(){
  if(_recog){try{_recog.abort();}catch(e){}_recog=null;}
  if(_micStream){_micStream.getTracks().forEach(function(t){t.stop();});_micStream=null;}
  _stopWave();
  clearInterval(_cdIv);
}

/* ── Texto de normalización y LCS (igual que ShadowLab) ── */
function _expandContr(t){
  return t.replace(/\bdon't\b/gi,'do not').replace(/\bdoesn't\b/gi,'does not')
    .replace(/\bdidn't\b/gi,'did not').replace(/\bcan't\b|\bcannot\b/gi,'can not')
    .replace(/\bwon't\b/gi,'will not').replace(/\bwouldn't\b/gi,'would not')
    .replace(/\bshouldn't\b/gi,'should not').replace(/\bcouldn't\b/gi,'could not')
    .replace(/\bisn't\b/gi,'is not').replace(/\baren't\b/gi,'are not')
    .replace(/\bi'm\b/gi,'i am').replace(/\byou're\b/gi,'you are')
    .replace(/\bit's\b/gi,'it is').replace(/\bthat's\b/gi,'that is')
    .replace(/\bi'll\b/gi,'i will').replace(/\bgonna\b/gi,'going to')
    .replace(/\bwanna\b/gi,'want to');
}
function _norm(t){return t.toLowerCase().replace(/[^a-z0-9\s]/g,'').trim().split(/\s+/).filter(Boolean);}
function _normCmp(t){return _expandContr(t).toLowerCase().replace(/[^a-z0-9\s]/g,'').trim().split(/\s+/).filter(Boolean);}
function _lcs(a,b){
  var m=a.length,n=b.length,dp=[],i,j;
  for(i=0;i<=m;i++){dp[i]=[];for(j=0;j<=n;j++)dp[i][j]=0;}
  for(i=1;i<=m;i++)for(j=1;j<=n;j++)
    dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
  var set={};i=m;j=n;
  while(i>0&&j>0){if(a[i-1]===b[j-1]){set[i-1]=true;i--;j--;}else if(dp[i-1][j]>dp[i][j-1])i--;else j--;}
  return set;
}
function _compare(original,spoken){
  var owD=_norm(original), owC=_normCmp(original), swC=_normCmp(spoken);
  var matchedC=_lcs(owC,swC);
  var ok=Object.keys(matchedC).length;
  var score=owC.length?Math.round(ok/owC.length*100):0;
  var matchedD=_lcs(owD,_norm(spoken));
  var words=owD.map(function(w,i){return{word:w,status:matchedD[i]?'ok':'miss'};});
  return{words:words,score:score,ok:ok,total:owC.length};
}

/* ── UI helpers ── */
function _setMicUI(mode){
  var btn=_$('spk-mic-btn');
  if(!btn) return;
  if(mode==='playing'){
    btn.disabled=true; btn.style.opacity='0.25'; btn.style.cursor='not-allowed';
    btn.style.boxShadow=''; btn.innerHTML=MIC_SVG;
  } else if(mode==='listening'){
    btn.disabled=false; btn.style.opacity='1'; btn.style.cursor='pointer';
    btn.style.boxShadow='0 0 0 8px rgba(255,154,108,.2)';
    btn.innerHTML=STOP_SVG; btn.style.color='#FF9A6C';
    btn.onclick=function(){_stopListen();_phase='idle';_setMicUI('idle');};
  } else if(mode==='idle'){
    btn.disabled=false; btn.style.opacity='1'; btn.style.cursor='pointer';
    btn.style.boxShadow=''; btn.innerHTML=MIC_SVG; btn.style.color='';
    btn.onclick=function(){ if(_phase==='result'||_phase==='idle') _startListenNow(); };
  } else { /* result / default */
    btn.disabled=true; btn.style.opacity='0.3'; btn.style.cursor='not-allowed';
    btn.style.boxShadow=''; btn.innerHTML=MIC_SVG;
  }
}
function _setMeta(label,timer){
  var l=_$('spk-meta-lbl'), t=_$('spk-meta-tmr');
  if(l) l.textContent=label||'';
  if(t) t.textContent=timer||'';
}
function _setTag(tag,count){
  var tg=_$('spk-tag'), ct=_$('spk-count');
  if(tg&&tag) tg.textContent=tag;
  if(ct&&count) ct.textContent=count;
}

/* ── Mostrar resultado en el texto ── */
function _showResult(phrase,result){
  var el=_$('spk-sentence'); if(!el) return;
  var html=result.words.map(function(w){
    return '<span style="color:'+(w.status==='ok'?'rgba(123,227,123,1)':'rgba(255,90,90,.9)')+';">'+w.word+'</span>';
  }).join(' ');
  el.innerHTML=html;

  /* Badge de score */
  var badge=_$('spk-score-badge');
  if(badge){
    badge.textContent=result.score+'%';
    badge.style.color=result.score>=80?'#7BE37B':result.score>=50?'#FFD83D':'#FF6B6B';
    badge.style.display='inline-block';
  }
}

/* ── Escuchar (flujo automático) ── */
function _startListenNow(){
  var line=_queue[_idx]; if(!line) return;
  _phase='listening';
  _setMicUI('listening');
  _setMeta('🎤 habla ahora · repite la línea','');

  /* Pausa el video mientras escucha */
  try{if(_ytPlayer&&_ytReady) _ytPlayer.pauseVideo();}catch(e){}

  if(!_hasSpeech()){
    _setMeta('Sin reconocimiento de voz · usa Chrome','');
    _phase='result'; _setMicUI('idle'); return;
  }
  _startListen(
    function(transcript){ _handleResult(line, transcript); },
    function(){ _handleResult(line, ''); }
  );
}

function _handleResult(line,transcript){
  _phase='result';
  _stopListen();
  var res=_compare(line.phrase||'',transcript);
  _showResult(line.phrase,res);
  _setMicUI('idle');

  var label=res.score>=80?'✓ excelente · '+res.score+'%':
            res.score>=50?'~ bien · '+res.score+'%':'✗ inténtalo de nuevo · '+res.score+'%';
  _setMeta(label,'');

  /* Mostrar botón "Siguiente" si hay más líneas */
  var nextBtn=_$('spk-next-btn');
  if(nextBtn) nextBtn.style.display='flex';
}

/* ── Reproducir clip actual ── */
function _playClip(){
  var line=_queue[_idx]; if(!line||!line.youtube_id) return;
  if(!_ytReady||!_ytPlayer) return;
  _phase='playing';
  _setMicUI('playing');
  _setMeta('▶ reproduciendo · escucha la línea','');

  /* Ocultar resultado previo */
  var badge=_$('spk-score-badge');
  if(badge) badge.style.display='none';
  var sentEl=_$('spk-sentence');
  if(sentEl) sentEl.textContent='"'+(line.phrase||'')+'"';

  /* Ocultar botón siguiente */
  var nextBtn=_$('spk-next-btn');
  if(nextBtn) nextBtn.style.display='none';

  try{
    _ytPlayer.loadVideoById({
      videoId: line.youtube_id,
      startSeconds: line.start||0,
      endSeconds: (line.end||0)+0.5
    });
  }catch(e){console.warn('[speaking-engine] loadVideoById',e);}
}

/* ── Construir HTML del panel ── */
function _buildHTML(){
  var waveSpans='';
  for(var i=0;i<20;i++) waveSpans+='<span></span>';

  var dots='';
  if(_queue.length>1){
    for(var d=0;d<_queue.length;d++){
      dots+='<span class="spk-dot" data-di="'+d+'" style="display:inline-block;width:7px;height:7px;'+
        'border-radius:50%;background:'+(d===0?'rgba(255,154,108,1)':'rgba(255,255,255,.2)')+
        ';transition:.2s;cursor:pointer;margin:0 2px;"></span>';
    }
  }

  return (
    '<!-- Panel 1: ShadowLab con video de fondo -->'+
    '<div class="exam-panel shadow-panel" id="spk-main-panel" style="--c:255,154,108;position:relative;overflow:hidden;">'+

      /* Video de fondo */
      '<div id="spk-video-bg" style="position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden;">'+
        '<div id="spk-yt-wrap" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);'+
          'width:177.78%;height:177.78%;min-width:100%;min-height:100%;"></div>'+
        '<div style="position:absolute;inset:0;background:rgba(10,9,22,.65);"></div>'+
      '</div>'+

      /* Pantalla de inicio (overlay) */
      '<div id="spk-start-overlay" style="position:absolute;inset:0;z-index:10;display:flex;'+
        'flex-direction:column;align-items:center;justify-content:center;gap:16px;'+
        'background:rgba(10,9,22,.82);border-radius:inherit;">'+
        '<span style="font-size:36px;">🎙️</span>'+
        '<p style="font-family:var(--mono,monospace);font-size:11px;color:rgba(255,255,255,.5);'+
          'text-align:center;max-width:220px;line-height:1.6;">'+
          'Lee cada línea en voz alta<br>y repite lo que escuchas</p>'+
        '<button id="spk-start-btn" onclick="window._speakStart()" style="'+
          'padding:12px 32p
/* examen-speaking-engine.js v3 */
(function(){
'use strict';

var _pool=[],_lpe=5,_queue=[],_idx=0;
var _ytPlayer=null,_ytReady=false;
var _recog=null,_micStream=null;
var _audioCtx=null,_analyser=null,_audioSrc=null,_waveRaf=null;
var _phase='idle',_listenStart=0,_clipLoadTime=0;
var MIC_TIMEOUT=15;

var MIC_SVG='<svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>';
var STOP_SVG='<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor"/></svg>';
var NEXT_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';
var REP_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>';

function _sb(){
  if(window._aura&&window._aura.sb)return window._aura.sb;
  if(window.auraSupabase)return window.auraSupabase;
  return null;
}
function _shuffle(a){a=[].concat(a);for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function _$(i){return document.getElementById(i);}

async function _loadPool(rank,lang){
  var sb=_sb();if(!sb)return false;
  var res=await sb.from('exam_content').select('*')
    .eq('section','speaking').eq('rank',rank).eq('language',lang).eq('active',true);
  if(res.error||!res.data)return false;
  _pool=[];_lpe=5;
  res.data.forEach(function(row){
    var c=row.content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c={};}}
    if(row.content_type==='speaking_config')_lpe=+(c&&c.lines_per_exam)||5;
    else if(row.content_type==='speaking_scene'&&c&&c.youtube_id)_pool.push(c);
  });
  return _pool.length>0;
}

function _ensureYT(cb){
  if(window.YT&&window.YT.Player){cb();return;}
  var prev=window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady=function(){if(typeof prev==='function')prev();cb();};
  if(!document.querySelector('script[src*="youtube.com/iframe_api"]')){
    var s=document.createElement('script');s.src='https://www.youtube.com/iframe_api';document.head.appendChild(s);
  }
}

function _connectWave(stream){
  try{
    if(!_audioCtx)_audioCtx=new(window.AudioContext||window.webkitAudioContext)();
    _analyser=_audioCtx.createAnalyser();_analyser.fftSize=64;
    _audioSrc=_audioCtx.createMediaStreamSource(stream);_audioSrc.connect(_analyser);
    (function loop(){
      _waveRaf=requestAnimationFrame(loop);
      var data=new Uint8Array(_analyser.frequencyBinCount);
      _analyser.getByteFrequencyData(data);
      document.querySelectorAll('#spk-wave span').forEach(function(b,i){
        b.style.height=Math.max(10,(data[i%data.length]/255)*90)+'%';
        b.style.animation='none';
      });
    })();
  }catch(e){}
}
function _stopWave(){
  cancelAnimationFrame(_waveRaf);_waveRaf=null;
  try{if(_audioSrc)_audioSrc.disconnect();}catch(e){}
  _analyser=null;
  document.querySelectorAll('#spk-wave span').forEach(function(b){b.style.height='';b.style.animation='';});
}

function _hasSpeech(){return !!(window.SpeechRecognition||window.webkitSpeechRecognition);}

function _startListen(onResult,onFail){
  var Rec=window.SpeechRecognition||window.webkitSpeechRecognition;
  var rec=new Rec();rec.lang='en-US';rec.interimResults=false;rec.maxAlternatives=1;
  _recog=rec;var done=false;
  _listenStart=Date.now();
  var to=setTimeout(function(){if(!done){done=true;try{rec.stop();}catch(e){}onFail('timeout');}},MIC_TIMEOUT*1000);
  if(navigator.mediaDevices)navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){_micStream=stream;_connectWave(stream);}).catch(function(){});
  rec.onresult=function(e){if(done)return;done=true;clearTimeout(to);onResult(e.results[0][0].transcript||'');};
  rec.onerror=function(e){if(done)return;done=true;clearTimeout(to);onFail(e.error);};
  rec.onend=function(){if(_micStream){_micStream.getTracks().forEach(function(t){t.stop();});_micStream=null;}_stopWave();};
  rec.start();
}
function _stopListen(){
  if(_recog){try{_recog.abort();}catch(e){}_recog=null;}
  if(_micStream){_micStream.getTracks().forEach(function(t){t.stop();});_micStream=null;}
  _stopWave();
}

function _expandContr(t){
  return t.replace(/\bdon't\b/gi,'do not').replace(/\bdoesn't\b/gi,'does not')
    .replace(/\bdidn't\b/gi,'did not').replace(/\bcan't\b/gi,'can not')
    .replace(/\bwon't\b/gi,'will not').replace(/\bisn't\b/gi,'is not')
    .replace(/\bi'm\b/gi,'i am').replace(/\byou're\b/gi,'you are')
    .replace(/\bit's\b/gi,'it is').replace(/\bthat's\b/gi,'that is')
    .replace(/\bi'll\b/gi,'i will').replace(/\bgonna\b/gi,'going to');
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
  var owD=_norm(original),owC=_normCmp(original),swC=_normCmp(spoken);
  var matchedC=_lcs(owC,swC),ok=Object.keys(matchedC).length;
  var score=owC.length?Math.round(ok/owC.length*100):0;
  var matchedD=_lcs(owD,_norm(spoken));
  var words=owD.map(function(w,i){return{word:w,status:matchedD[i]?'ok':'miss'};});
  return{words:words,score:score,ok:ok,total:owC.length};
}

function _setMicUI(mode){
  var btn=_$('spk-mic-btn');if(!btn)return;
  if(mode==='playing'){
    btn.disabled=true;btn.style.opacity='0.25';btn.style.cursor='not-allowed';
    btn.style.boxShadow='';btn.innerHTML=MIC_SVG;btn.style.color='';
  }else if(mode==='listening'){
    btn.disabled=false;btn.style.opacity='1';btn.style.cursor='pointer';
    btn.style.boxShadow='0 0 0 8px rgba(255,154,108,.2)';
    btn.innerHTML=STOP_SVG;btn.style.color='#FF9A6C';
    btn.onclick=function(){_stopListen();_phase='idle';_setMicUI('idle');};
  }else if(mode==='idle'){
    btn.disabled=false;btn.style.opacity='1';btn.style.cursor='pointer';
    btn.style.boxShadow='';btn.innerHTML=MIC_SVG;btn.style.color='';
    btn.onclick=function(){if(_phase==='result'||_phase==='idle')_startListenNow();};
  }else{
    btn.disabled=true;btn.style.opacity='0.3';btn.style.cursor='not-allowed';
    btn.style.boxShadow='';btn.innerHTML=MIC_SVG;
  }
}
function _setMeta(label,timer){
  var l=_$('spk-meta-lbl'),t=_$('spk-meta-tmr');
  if(l)l.textContent=label||'';if(t)t.textContent=timer||'';
}

function _showResult(phrase,result){
  var el=_$('spk-sentence');if(!el)return;
  el.innerHTML=result.words.map(function(w){
    var c=w.status==='ok'?'rgba(123,227,123,1)':'rgba(255,90,90,.9)';
    return '<span style="color:'+c+';">'+w.word+'</span>';
  }).join(' ');
  var badge=_$('spk-score-badge');
  if(badge){
    badge.textContent=result.score+'%';
    badge.style.color=result.score>=80?'#7BE37B':result.score>=50?'#FFD83D':'#FF6B6B';
    badge.style.display='inline-block';
  }
}

function _startListenNow(){
  var line=_queue[_idx];if(!line)return;
  _phase='listening';_setMicUI('listening');
  _setMeta('Habla ahora · repite la linea','');
  try{if(_ytPlayer&&_ytReady)_ytPlayer.pauseVideo();}catch(e){}
  if(!_hasSpeech()){_setMeta('Sin reconocimiento de voz · usa Chrome','');_phase='result';_setMicUI('idle');return;}
  _startListen(
    function(t){_handleResult(line,t);},
    function(){_handleResult(line,'');}
  );
}

function _handleResult(line,transcript){
  _phase='result';_stopListen();
  var res=_compare(line.phrase||'',transcript);
  _showResult(line.phrase,res);_setMicUI('idle');
  var label=res.score>=80?'Excelente '+res.score+'%':res.score>=50?'Bien '+res.score+'%':'Intentalo de nuevo '+res.score+'%';
  _setMeta(label,'');
  var nextBtn=_$('spk-next-btn');
  if(nextBtn)nextBtn.style.display='flex';
}

function _playClip(){
  var line=_queue[_idx];if(!line||!line.youtube_id)return;
  if(!_ytReady||!_ytPlayer)return;
  _phase='playing';_setMicUI('playing');_setMeta('Reproduciendo · escucha la linea','');
  var badge=_$('spk-score-badge');if(badge)badge.style.display='none';
  var sentEl=_$('spk-sentence');if(sentEl)sentEl.textContent='"'+(line.phrase||'')+'"';
  var nextBtn=_$('spk-next-btn');if(nextBtn)nextBtn.style.display='none';
  try{
    _clipLoadTime=Date.now();
    _ytPlayer.loadVideoById({videoId:line.youtube_id,startSeconds:line.start||0,endSeconds:(line.end||0)+0.5});
    setTimeout(function(){try{_ytPlayer.playVideo();}catch(e){}},300);
  }catch(e){console.warn('[speaking-engine]',e);}
}

function _buildHTML(){
  var waveSpans='';for(var i=0;i<20;i++)waveSpans+='<span></span>';
  var dots='';
  if(_queue.length>1){
    for(var d=0;d<_queue.length;d++){
      dots+='<span class="spk-dot" data-di="'+d+'" style="display:inline-block;width:7px;height:7px;border-radius:50%;background:'+(d===0?'rgba(255,154,108,1)':'rgba(255,255,255,.2)')+';transition:.2s;cursor:pointer;margin:0 2px;"></span>';
    }
  }
  var panel1='<div class="exam-panel shadow-panel" id="spk-main-panel" style="--c:255,154,108;position:relative;overflow:hidden;flex:1;display:flex;flex-direction:column;">';
  var videoBg='<div id="spk-video-bg" style="position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden;"><div id="spk-yt-wrap" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:177.78%;height:177.78%;min-width:100%;min-height:100%;"></div><div style="position:absolute;inset:0;background:rgba(10,9,22,.65);"></div></div>';
  var startOverlay='<div id="spk-start-overlay" style="position:absolute;inset:0;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:rgba(10,9,22,.82);border-radius:inherit;"><span style="font-size:36px;">&#127909;</span><p style="font-family:var(--mono,monospace);font-size:11px;color:rgba(255,255,255,.5);text-align:center;max-width:220px;line-height:1.6;">Lee cada linea en voz alta<br>y repite lo que escuchas</p><button id="spk-start-btn" onclick="window._speakStart()" style="padding:12px 32px;border-radius:40px;border:none;cursor:pointer;font-size:13px;font-weight:800;background:rgba(255,154,108,1);color:#0a0916;letter-spacing:.04em;">Iniciar Speaking</button></div>';
  var header='<header class="ep-h" style="position:relative;z-index:1;"><span class="ep-tag" id="spk-tag">shadowlab lectura en voz alta</span><span class="ep-count" id="spk-count">linea 1 / '+_queue.length+'</span></header>';
  var stage='<div class="shadow-stage" style="position:relative;z-index:1;"><p class="shadow-sentence" id="spk-sentence"></p><div style="display:flex;align-items:center;gap:8px;justify-content:center;"><span id="spk-ipa" style="font-family:var(--mono,monospace);font-size:11px;color:var(--ink-2);"></span><span id="spk-score-badge" style="display:none;font-family:var(--mono,monospace);font-size:12px;font-weight:800;background:rgba(255,255,255,.08);border-radius:20px;padding:2px 10px;"></span></div><div class="shadow-wave" id="spk-wave">'+waveSpans+'</div><button class="shadow-mic" id="spk-mic-btn" style="opacity:.3;cursor:not-allowed;">'+MIC_SVG+'</button><div class="shadow-meta"><b id="spk-meta-lbl">toca Iniciar para comenzar</b><span id="spk-meta-tmr"></span></div><div id="spk-controls" style="display:flex;align-items:center;gap:10px;margin-top:12px;flex-wrap:wrap;justify-content:center;"><button id="spk-rep-btn" onclick="window._speakRepeat()" style="display:flex;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;border:1px solid rgba(255,154,108,.35);background:rgba(255,154,108,.07);color:rgba(255,154,108,.8);font-size:11px;font-weight:700;cursor:pointer;">'+REP_SVG+'<span>Repetir</span></button>'+(dots?'<div id="spk-dots" style="display:flex;gap:4px;align-items:center;">'+dots+'</div>':'')+'<button id="spk-next-btn" onclick="window._speakNext()" style="display:none;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;border:1px solid rgba(123,227,123,.35);background:rgba(123,227,123,.07);color:rgba(123,227,123,.8);font-size:11px;font-weight:700;cursor:pointer;">'+NEXT_SVG+'<span>Siguiente</span></button></div></div>';
  var panel1end='</div>';
  return panel1+videoBg+startOverlay+header+stage+panel1end;
}

function _showLine(i){
  var line=_queue[i];if(!line)return;
  var sentEl=_$('spk-sentence'),ipaEl=_$('spk-ipa'),cntEl=_$('spk-count');
  if(sentEl)sentEl.textContent='"'+(line.phrase||'')+'"';
  if(ipaEl)ipaEl.textContent=line.pelicula_titulo||'';
  if(cntEl)cntEl.textContent='linea '+(i+1)+' / '+_queue.length;
  var badge=_$('spk-score-badge');if(badge)badge.style.display='none';
  document.querySelectorAll('.spk-dot').forEach(function(dot,di){
    dot.style.background=di===i?'rgba(255,154,108,1)':'rgba(255,255,255,.2)';
    dot.style.transform=di===i?'scale(1.4)':'scale(1)';
  });
  _stopListen();_setMicUI('playing');_setMeta('Reproduciendo...','');
  var nextBtn=_$('spk-next-btn');if(nextBtn)nextBtn.style.display='none';
}

function _createYTPlayer(firstLine){
  var wrap=_$('spk-yt-wrap');if(!wrap)return;
  var div=document.createElement('div');div.id='spk-yt-player';div.style.cssText='width:100%;height:100%;';
  wrap.appendChild(div);
  _ensureYT(function(){
    _ytPlayer=new YT.Player('spk-yt-player',{
      width:'100%',height:'100%',
      videoId:firstLine.youtube_id,
      playerVars:{start:Math.floor(firstLine.start||0),autoplay:0,controls:0,modestbranding:1,rel:0,playsinline:1},
      events:{
        onReady:function(e){_ytReady=true;e.target.setVolume(100);},
        onStateChange:function(e){
          if(e.data===YT.PlayerState.ENDED&&_phase==='playing'&&(Date.now()-_clipLoadTime)>1500){
            _phase='idle';_setMicUI('idle');_setMeta('Tu turno repite la linea','');
            setTimeout(function(){_startListenNow();},400);
          }
        }
      }
    });
  });
}

window._speakStart=function(){
  var overlay=_$('spk-start-overlay');if(overlay)overlay.style.display='none';
  _setMicUI('playing');_showLine(0);_playClip();
};
window._speakRepeat=function(){if(_phase==='playing')return;_stopListen();_playClip();};
window._speakNext=function(){
  if(_idx<_queue.length-1){_idx++;_stopListen();_showLine(_idx);_playClip();}
};
window.stopExamSpeaking=function(){_stopListen();try{if(_ytPlayer&&_ytReady)_ytPlayer.stopVideo();}catch(e){} _phase='idle';var _hero=document.querySelector('.hero-card');var _mid=document.querySelector('.mid');if(_hero)_hero.style.display='';if(_mid){_mid.style.gridColumn='';_mid.style.gap='';}};

window.initExamSpeaking=async function(opts){
  var rank=(opts&&opts.rank)||'bronce';
  var lang=(opts&&opts.lang)||'en';
  var host=document.querySelector('.mid-content[data-skill="speak"]');
  if(!host)return;
  _stopListen();
  if(_ytPlayer){try{_ytPlayer.destroy();}catch(e){}_ytPlayer=null;_ytReady=false;}
  _phase='idle';_idx=0;
  host.innerHTML='<div style="display:flex;align-items:center;justify-content:center;min-height:300px;color:rgba(255,154,108,.5);font-size:12px;">Cargando speaking...</div>';
  var ok=await _loadPool(rank,lang);
  if(!ok){
    host.innerHTML='<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:300px;gap:10px;padding:20px;text-align:center;"><span style="font-size:28px;">&#127909;</span><span style="color:rgba(255,154,108,.6);font-size:12px;">Sin contenido configurado para Speaking.</span><span style="color:rgba(255,255,255,.25);font-size:10px;">Configura lineas desde el editor.</span></div>';
    return;
  }
  _queue=_shuffle(_pool).slice(0,Math.min(_lpe,_pool.length));_idx=0;
  var _hero=document.querySelector('.hero-card');
  var _mid=document.querySelector('.mid');
  if(_hero)_hero.style.display='none';
  if(_mid){_mid.style.gridColumn='1 / 3';_mid.style.gap='0';}
  host.style.cssText='display:flex;flex-direction:column;';
  host.innerHTML=_buildHTML();
  /* Medir espacio real y estirar el panel */
  setTimeout(function(){
    var gallery=document.querySelector('.gallery');
    var panel=_$('spk-main-panel');
    if(gallery&&panel){
      var gh=gallery.getBoundingClientRect().height;
      panel.style.minHeight=Math.max(gh,400)+'px';
    }
  },80);
  document.querySelectorAll('.spk-dot').forEach(function(dot){
    dot.addEventListener('click',function(){
      var di=parseInt(dot.dataset.di)||0;
      if(di!==_idx&&_phase!=='playing'){_idx=di;_stopListen();_showLine(_idx);_playClip();}
    });
  });
  var sentEl=_$('spk-sentence'),ipaEl=_$('spk-ipa'),cntEl=_$('spk-count');
  if(sentEl)sentEl.textContent='"'+(_queue[0].phrase||'')+'"';
  if(ipaEl)ipaEl.textContent=_queue[0].pelicula_titulo||'';
  if(cntEl)cntEl.textContent='linea 1 / '+_queue.length;
  _createYTPlayer(_queue[0]);
};
})();

/* ════════════════════════════════════════════════════════════════
   examen-listening-engine.js  v6
   · Todas las líneas del pool mezcladas aleatoriamente
   · TODAS las líneas llevan hueco (sin límite de palabras)
   · Cada loop del video genera huecos DIFERENTES (como play-movies)
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var _pool=[], _shuffledPool=[], _poolIdx=0;
var _current=null, _currentYtId='', _player=null;
var _ytApiReady=false, _ytApiPending=false;
var _loopTimer=null, _karaoTimer=null;
var _lyrics=[], _wbPool=[];
var _container=null, _onPickCb=null, _onQuestionCb=null;
var _lastKaraoIdx=-1;
var _challengeActive=false, _challengeLineIdx=-1;
var _completedLines={};
var _clipStart=0, _clipEnd=0;
var _lineLoopStart=0, _lineLoopEnd=0;
var _started=false;
var _phase=1;
var _phase2Questions=[];
var _currentRank='bronce', _currentLang='en';

/* ─── Helpers ─── */
function _sb(){
  if(window._aura&&window._aura.sb) return window._aura.sb;
  if(window.auraSupabase) return window.auraSupabase;
  return null;
}
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function _fmtT(s){ s=+s||0; var m=Math.floor(s/60),r=Math.floor(s%60); return m+':'+String(r).padStart(2,'0'); }
function _shuffle(a){ var b=a.slice(); for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t;} return b; }
function _lev(a,b){
  var m=a.length,n=b.length,dp=[];
  for(var i=0;i<=m;i++){dp[i]=[];for(var j=0;j<=n;j++)dp[i][j]=i===0?j:j===0?i:0;}
  for(var i=1;i<=m;i++)for(var j=1;j<=n;j++)
    dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
  return dp[m][n];
}
function _getWords(line){
  if(!line) return [];
  if(line.text) return line.text.split(' ').filter(Boolean);
  if(line.words) return line.words.map(function(w){return w.w||'';}).filter(Boolean);
  return [];
}

/* ─── CSS ─── */
function _injectCSS(){
  if(document.getElementById('exl-bubble-css')) return;
  var s=document.createElement('style'); s.id='exl-bubble-css';
  s.textContent=[
    '@keyframes blankSpin{to{transform:rotate(360deg)}}',
    '@keyframes exlFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}',
    '.exl-karao-box{font-family:var(--sans,"Plus Jakarta Sans",sans-serif);font-size:1.05rem;font-weight:600;color:#fff;letter-spacing:-.005em;line-height:2;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:4px 6px;min-height:52px;padding:14px 10px;text-align:center}',
    '.exl-karao-box .exl-w{color:#fff}',
    '.exl-speaker{font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.38);width:100%;text-align:center;margin-bottom:2px}',
    '.exl-karao-wait{color:rgba(255,255,255,.28);font-size:.88rem;letter-spacing:.06em}',
    '.exl-phase2-banner{display:flex;align-items:center;gap:10px;background:rgba(196,255,61,.07);border:1px solid rgba(196,255,61,.25);border-radius:12px;padding:12px 18px;font-size:.9rem;font-weight:700;color:#c4ff3d;letter-spacing:.02em;animation:exlFadeIn .4s ease;width:100%;justify-content:center;}',
    '.exl-p2-icon{font-size:1.3rem;}',
    '.blank-bubble{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;min-width:28px;border-radius:50%;background:rgba(196,255,61,.05);border:2.5px solid rgba(196,255,61,.15);border-top-color:#c4ff3d;color:transparent;font-size:.8rem;font-weight:700;padding:0;transition:all .45s cubic-bezier(.34,1.56,.64,1);vertical-align:middle;animation:blankSpin .75s linear infinite;cursor:default}',
    '.blank-bubble.filled{border-radius:16px;min-width:56px;width:auto;height:26px;padding:0 10px;border:1.5px solid rgba(255,255,255,.2);border-top-color:rgba(255,255,255,.2);background:rgba(255,255,255,.07);color:rgba(255,255,255,.55);animation:none;transform:none}',
    '.blank-bubble.correct{border-radius:16px;min-width:56px;width:auto;height:26px;padding:0 10px;border:1.5px solid #34d399;border-top-color:#34d399;background:rgba(52,211,153,.15);color:#34d399;animation:none;transform:none}',
    '.blank-bubble.wrong{border-radius:16px;min-width:56px;width:auto;height:26px;padding:0 10px;border:1.5px solid #f87171;border-top-color:#f87171;background:rgba(248,113,113,.1);color:#f87171;animation:none;transform:none}',
    '.exl-bank{display:flex;flex-wrap:wrap;gap:6px;padding:10px 8px;justify-content:center;min-height:44px;border-top:1px solid rgba(255,255,255,.06)}',
    '.exl-bank-lbl{font-size:9px;color:rgba(255,255,255,.28);text-transform:uppercase;letter-spacing:.1em;width:100%;text-align:center;margin-bottom:2px}',
    '.chall-opt{padding:7px 14px;background:#1a1a1a;border:1px solid transparent;border-radius:10px;font-family:var(--sans,"Plus Jakarta Sans",sans-serif);font-size:11px;font-weight:700;color:#f0ede6;letter-spacing:.04em;cursor:pointer;transition:all .15s}',
    '.chall-opt:hover:not([disabled]){background:#222;border-color:rgba(255,255,255,.15);transform:translateX(2px)}',
    '.chall-opt.correct{background:rgba(196,255,61,.12)!important;border-color:#c4ff3d!important;color:#c4ff3d!important}',
    '.chall-opt.wrong{background:rgba(248,113,113,.1)!important;border-color:#f87171!important;color:#f87171!important}',
    '.chall-opt[disabled]:not(.correct):not(.wrong){opacity:.35;cursor:default}',
    '.exl-start-overlay{position:absolute;inset:0;border-radius:12px;background:rgba(0,0,0,.72);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;z-index:20;backdrop-filter:blur(3px);}',
    '.exl-start-btn{display:flex;align-items:center;gap:10px;padding:14px 28px;background:rgba(196,255,61,.12);border:1.5px solid rgba(196,255,61,.5);border-radius:16px;color:#c4ff3d;font-size:15px;font-weight:800;cursor:pointer;letter-spacing:.03em;transition:all .2s;}',
    '.exl-start-btn:hover{background:rgba(196,255,61,.22);transform:scale(1.04);}',
    '.exl-start-hint{font-size:10px;color:rgba(255,255,255,.3);letter-spacing:.06em;text-align:center;}',
    '.exl-progress{display:flex;align-items:center;gap:5px;padding:6px 10px;justify-content:center;flex-wrap:wrap;}',
    '.exl-dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.15);border:1.5px solid rgba(255,255,255,.2);transition:.3s;}',
    '.exl-dot.done{background:#34d399;border-color:#34d399;}',
    '.exl-dot.active{background:#7CB2FF;border-color:#7CB2FF;transform:scale(1.25);}',
    '.exl-questions-panel{display:none;flex-direction:column;gap:8px;margin-top:10px;padding-top:10px;border-top:1px dashed rgba(124,178,255,.2);max-height:300px;overflow-y:auto;}',
    '.exl-q-panel-title{font-size:9px;font-family:var(--mono,"JetBrains Mono",monospace);color:rgba(124,178,255,.55);text-transform:uppercase;letter-spacing:.15em;font-weight:800;margin-bottom:4px;}',
    'body.exl-phase2 .exl-questions-panel{display:flex!important;}',
    '.exl-q-card{background:rgba(124,178,255,.06);border:1px solid rgba(124,178,255,.18);border-radius:13px;padding:12px 14px;animation:exlFadeIn .35s ease;display:flex;flex-direction:column;gap:7px;}',
    '.exl-q-num{font-size:9px;font-family:var(--mono,"JetBrains Mono",monospace);color:rgba(124,178,255,.6);text-transform:uppercase;letter-spacing:.15em;font-weight:800;}',
    '.exl-q-text{font-size:12.5px;font-weight:700;color:#f0ede6;line-height:1.45;}',
    '.exl-q-opt{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:9px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);text-align:left;cursor:pointer;transition:.15s;width:100%;}',
    '.exl-q-opt:hover:not([disabled]){background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.14);}',
    '.exl-q-opt b{width:20px;height:20px;border-radius:50%;background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:900;color:rgba(255,255,255,.5);flex-shrink:0;}',
    '.exl-q-opt span{font-size:11.5px;color:rgba(255,255,255,.75);line-height:1.4;}',
    '.exl-q-opt.correct{background:rgba(52,211,153,.12)!important;border-color:#34d399!important;}',
    '.exl-q-opt.correct b{background:#34d399;border-color:#34d399;color:#0a1a0a;}',
    '.exl-q-opt.wrong{background:rgba(248,113,113,.08)!important;border-color:rgba(248,113,113,.4)!important;opacity:.55;}',
    '.exl-q-opt[disabled]{cursor:default;}',
  ].join('');
  document.head.appendChild(s);
}

/* ─── YouTube IFrame API ─── */
function _ensureYTAPI(){
  if(_ytApiReady) return Promise.resolve();
  if(_ytApiPending) return new Promise(function(res){
    var iv=setInterval(function(){ if(_ytApiReady){clearInterval(iv);res();} },80);
  });
  _ytApiPending=true;
  return new Promise(function(res){
    if(window.YT&&window.YT.Player){ _ytApiReady=true; res(); return; }
    var prev=window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady=function(){ _ytApiReady=true; if(typeof prev==='function')prev(); res(); };
    if(!document.querySelector('script[src*="youtube.com/iframe_api"]')){
      var s=document.createElement('script'); s.src='https://www.youtube.com/iframe_api'; document.head.appendChild(s);
    }
  });
}

/* ─── Pool: carga TODAS las líneas + transcripts ─── */
async function _loadPool(rank,lang){
  _pool=[]; _shuffledPool=[]; _poolIdx=0; _wbPool=[];
  var sb=_sb(); if(!sb) return;
  var res=await sb.from('exam_content').select('*')
    .eq('section','listening').eq('rank',rank).eq('language',lang)
    .eq('active',true).eq('content_type','listening_scene');
  if(res.error){ console.warn('[ExamListening]',res.error); return; }
  var items=[];
  (res.data||[]).forEach(function(row){
    var c=row.content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c={};}}
    if(c&&c.escena_id) items.push(c);
  });
  if(!items.length) return;
  var escenaIds=[];
  items.forEach(function(item){
    if(escenaIds.indexOf(item.escena_id)<0) escenaIds.push(item.escena_id);
  });
  var transcripts={}, wordBanks={};
  var tr=await sb.from('escenas').select('id,transcript_json,word_bank_json').in('id',escenaIds);
  (tr.data||[]).forEach(function(esc){
    var tj=esc.transcript_json;
    if(typeof tj==='string'){try{tj=JSON.parse(tj);}catch(e){tj={};}}
    transcripts[esc.id]=(tj&&tj.lyrics)||[];
    var wb=esc.word_bank_json;
    if(typeof wb==='string'){try{wb=JSON.parse(wb);}catch(e){wb=[];}}
    var wbArr=Array.isArray(wb)?wb:[];
    wordBanks[esc.id]=wbArr;
    _wbPool=_wbPool.concat(wbArr);
  });
  items.forEach(function(item){
    var lyrics=transcripts[item.escena_id]||[];
    var lineData=null;
    lyrics.forEach(function(l){
      if(!lineData&&Math.abs(+(l.t||0)-item.start)<0.6) lineData=l;
    });
    if(!lineData){
      var wds=(item.phrase||'').split(/\s+/).filter(Boolean);
      lineData={t:item.start,end:item.end,text:item.phrase,
        words:wds.map(function(w){return {w:w,t:item.start};})};
    }
    item._lineData=lineData;
    _pool.push(item);
  });
  _shuffledPool=_shuffle(_pool);
}

/* ─── Shell HTML ─── */
function _renderShell(cont){
  cont.innerHTML=
    '<div class="exam-panel listening-panel" style="--c:124,178,255;">'+
      '<header class="ep-h">'+
        '<span class="ep-tag" id="exl-tag">listening · cargando…</span>'+
        '<span class="ep-count" id="exl-blank-count"></span>'+
        '<button class="adm-ep-btn" id="exl-edit-btn" style="display:none" onclick="typeof window.admOpenDrawer===\'function\'&&window.admOpenDrawer(\'listen\')">✏ Editar</button>'+
      '</header>'+
      '<div class="exl-player-wrap" style="position:relative"><div id="exl-yt"></div></div>'+
      '<div class="exl-progress" id="exl-progress"></div>'+
      '<div class="exl-karao-box" id="exl-karao-box">'+
        '<span class="exl-karao-wait">♪ esperando diálogo ♪</span>'+
      '</div>'+
      '<div class="exl-bank" id="exl-bank">'+
        '<span class="exl-bank-lbl">banco de palabras</span>'+
      '</div>'+
    '</div>';
  var eb=document.getElementById('exl-edit-btn');
  if(eb) eb.style.display=(document.body.classList.contains('adm-mode')?'':'none');
}

function _renderProgress(){
  var wrap=document.getElementById('exl-progress'); if(!wrap) return;
  wrap.innerHTML='';
  _shuffledPool.forEach(function(item,i){
    var dot=document.createElement('div');
    dot.className='exl-dot'+(i<_poolIdx?' done':i===_poolIdx?' active':'');
    dot.title=(item.pelicula_titulo||'línea '+(i+1));
    wrap.appendChild(dot);
  });
}

/* ─── Crear player ─── */
async function _initPlayer(clip){
  await _ensureYTAPI();
  if(_player){try{_player.destroy();}catch(e){} _player=null;}
  var wrap=document.querySelector('.exl-player-wrap');
  if(wrap) wrap.innerHTML='<div id="exl-yt"></div>';
  _clipStart=+(clip.start||clip.start_time||0);
  _clipEnd=+(clip.end||clip.end_time||0);
  _currentYtId=clip.youtube_id;
  _player=new YT.Player('exl-yt',{
    videoId:clip.youtube_id,
    playerVars:{
      autoplay:0,controls:0,modestbranding:1,showinfo:0,
      rel:0,iv_load_policy:3,fs:0,disablekb:1,
      start:Math.floor(_clipStart),playsinline:1,mute:0
    },
    events:{
      onReady:function(e){
        try{e.target.seekTo(_clipStart);}catch(err){}
        _startLoop();
        _showStartOverlay();
      },
      onStateChange:function(e){
        if(!_started&&e.data===YT.PlayerState.PLAYING){
          try{e.target.pauseVideo();e.target.mute();}catch(err){}
          return;
        }
        if(_started&&e.data===YT.PlayerState.ENDED&&_phase===1){
          try{_player.seekTo(_clipStart);_player.playVideo();}catch(err){}
          /* FIX: generar huecos diferentes en cada loop */
          if(!_completedLines[_challengeLineIdx]){
            _challengeActive=false; _lastKaraoIdx=-1; _clearBank();
          }
        }
      }
    }
  });
}

/* ─── Loop principal (solo Fase 1) ─── */
function _startLoop(){
  if(_loopTimer) clearInterval(_loopTimer);
  _loopTimer=setInterval(function(){
    if(!_player||typeof _player.getCurrentTime!=='function'||!_started||_phase!==1) return;
    var t=_player.getCurrentTime();
    var end=_clipEnd, start=_clipStart;
    if(end>0&&t>=end){
      try{_player.seekTo(start);_player.playVideo();}catch(e){}
      /* FIX: resetear challenge para generar huecos nuevos en el siguiente loop */
      if(!_completedLines[_challengeLineIdx]){
        _challengeActive=false;
        _lastKaraoIdx=-1;
        _clearBank();
      }
    }
  },300);
}

/* ─── Overlay "Iniciar" ─── */
function _showStartOverlay(){
  var wrap=document.querySelector('.exl-player-wrap'); if(!wrap) return;
  var prev=wrap.querySelector('.exl-start-overlay'); if(prev) prev.remove();
  var overlay=document.createElement('div'); overlay.className='exl-start-overlay';
  var total=_shuffledPool.length;
  overlay.innerHTML=
    '<button class="exl-start-btn" id="exl-start-btn">'+
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>'+
      'Iniciar listening'+
    '</button>'+
    '<span class="exl-start-hint">'+total+' '+(total===1?'línea':'líneas')+' · orden aleatorio · completa los huecos</span>';
  wrap.appendChild(overlay);
  overlay.querySelector('#exl-start-btn').onclick=function(){
    _started=true; overlay.remove();
    if(_player){
      try{_player.seekTo(_clipStart);_player.unMute();_player.setVolume(100);_player.playVideo();}catch(e){}
    }
    _startKarao();
  };
}

/* ─── Karaoke timer ─── */
function _startKarao(){
  if(_karaoTimer) clearInterval(_karaoTimer);
  _lastKaraoIdx=-1;
  _karaoTimer=setInterval(function(){
    if(!_player||typeof _player.getCurrentTime!=='function') return;
    if(_challengeActive) return;
    var t=_player.getCurrentTime();
    var idx=-1;
    for(var i=_lyrics.length-1;i>=0;i--){
      if(t>=_lyrics[i].t){ idx=i; break; }
    }
    if(idx===_lastKaraoIdx) return;
    _lastKaraoIdx=idx;
    _showLine(idx);
  },200);
}

/* ─── Mostrar línea ─── */
function _showLine(idx){
  var box=document.getElementById('exl-karao-box'); if(!box) return;
  if(idx<0){
    box.innerHTML='<span class="exl-karao-wait">♪ esperando diálogo ♪</span>';
    _clearBank(); return;
  }
  var line=_lyrics[idx];
  var words=_getWords(line);
  if(!words.length) return;

  /* FIX: TODAS las líneas llevan challenge — sin límite mínimo de palabras */
  if(_phase===1&&!_completedLines[idx]){
    _buildChallenge(line,idx,words);
  } else {
    /* Línea ya completada o Fase 2: solo mostrar texto */
    box.innerHTML='';
    if(line.speaker){
      var sp=document.createElement('div');sp.className='exl-speaker';sp.textContent=line.speaker;box.appendChild(sp);
    }
    var row=document.createElement('div');
    row.style.cssText='display:flex;flex-wrap:wrap;gap:4px 6px;justify-content:center;align-items:center;';
    words.forEach(function(w){
      var s=document.createElement('span');s.className='exl-w';s.textContent=w;row.appendChild(s);
    });
    box.appendChild(row);
    _clearBank();
  }
}

/* ─── Construir challenge ─── */
function _buildChallenge(line,lineIdx,words){
  /* Número de huecos según longitud */
  var numBlanks=words.length>=10?3:words.length>=6?2:1;

  /* Elegir posiciones candidatas */
  var eligible=[];
  /* Intentar primero palabras con 3+ letras */
  for(var i=0;i<words.length;i++){
    if(words[i].replace(/[^a-zA-Z]/g,'').length>=3) eligible.push(i);
  }
  /* Fallback: palabras con 2+ letras */
  if(eligible.length<numBlanks){
    for(var i=0;i<words.length;i++){
      if(eligible.indexOf(i)<0&&words[i].replace(/[^a-zA-Z]/g,'').length>=2) eligible.push(i);
    }
  }
  /* Último fallback: cualquier palabra */
  if(!eligible.length){
    for(var i=0;i<words.length;i++) eligible.push(i);
  }

  eligible=_shuffle(eligible);
  var blankIdx=eligible.slice(0,numBlanks).sort(function(a,b){return a-b;});

  _challengeActive=true;
  _challengeLineIdx=lineIdx;
  _lineLoopStart=_clipStart;
  _lineLoopEnd=_clipEnd>0?_clipEnd:((line.t||0)+8);

  var correctWords=blankIdx.map(function(i){
    return words[i].replace(/[^a-zA-ZÀ-ɏ']/g,'').toUpperCase();
  });
  var FALLBACK=['SUPERHERO','ILLEGAL','PERIMETER','FORGET','MISSION',
                'SPECIAL','DANGER','FAMILY','SECRET','STRANGE',
                'TRAINING','NORMAL','POWER','TOGETHER','PROBLEM'];
  var distPool=(_wbPool&&_wbPool.length)?
    _wbPool.map(function(w){return String(w).toUpperCase();}):FALLBACK;
  var dists=_shuffle(distPool.filter(function(w){return correctWords.indexOf(w)<0;}));
  var distCount=Math.min(8,Math.max(3,correctWords.length+2));
  var opts=_shuffle(correctWords.concat(dists.slice(0,distCount)));

  var box=document.getElementById('exl-karao-box'); if(!box) return;
  box.innerHTML='';
  if(line.speaker){
    var sp=document.createElement('div');sp.className='exl-speaker';sp.textContent=line.speaker;box.appendChild(sp);
  }
  var row=document.createElement('div');
  row.style.cssText='display:flex;flex-wrap:wrap;gap:4px 6px;justify-content:center;align-items:center;';
  words.forEach(function(word,i){
    if(blankIdx.indexOf(i)>=0){
      var clean=word.replace(/[^a-zA-ZÀ-ɏ']/g,'');
      var punct=word.slice(clean.length);
      var bubble=document.createElement('span');
      bubble.className='blank-bubble';
      bubble.dataset.answer=clean;
      bubble.dataset.wi=String(i);
      var wEl=document.createElement('span');
      wEl.style.cssText='display:inline-flex;align-items:center;gap:2px;';
      wEl.appendChild(bubble);
      if(punct){var ps=document.createElement('span');ps.className='exl-w';ps.textContent=punct+' ';wEl.appendChild(ps);}
      row.appendChild(wEl);
    } else {
      var s=document.createElement('span');s.className='exl-w';s.textContent=word+' ';row.appendChild(s);
    }
  });
  box.appendChild(row);

  var bc=document.getElementById('exl-blank-count');
  if(bc) bc.textContent=blankIdx.length+(blankIdx.length===1?' hueco':' huecos');

  var bank=document.getElementById('exl-bank'); if(!bank) return;
  bank.innerHTML='<div class="exl-bank-lbl">banco · elige la palabra</div>'+
    opts.map(function(w){
      return '<button class="chall-opt" data-exl-word="'+_esc(w)+'">'+_esc(w)+'</button>';
    }).join('');
  bank.querySelectorAll('.chall-opt').forEach(function(btn){
    btn.addEventListener('click',function(){ window._exlSelectOpt(btn,btn.dataset.exlWord); });
  });
}

/* ─── Click banco de palabras ─── */
window._exlSelectOpt=function(el,word){
  if(el.classList.contains('correct')) return;
  var wordUp=(word||'').replace(/[^a-zA-Z]/g,'').toUpperCase();
  var all=Array.from(document.querySelectorAll('#exl-karao-box .blank-bubble:not(.correct)'));
  var target=null;
  all.forEach(function(b){
    if(!target&&b.dataset.answer.replace(/[^a-zA-Z]/g,'').toUpperCase()===wordUp) target=b;
  });
  if(!target) all.forEach(function(b){
    if(!target&&!b.classList.contains('filled')&&!b.classList.contains('wrong')) target=b;
  });
  if(!target&&all.length) target=all[0];
  if(!target) return;
  if((target.classList.contains('wrong')||target.classList.contains('filled'))&&target._btn&&target._btn!==el){
    target._btn.classList.remove('wrong','correct'); target._btn.disabled=false;
  }
  target.classList.remove('wrong','filled');
  target.textContent=word; target.classList.add('filled');
  target._btn=el; el.disabled=true;
  _checkChallenge();
};

/* ─── Verificar burbujas ─── */
function _checkChallenge(){
  var bubbles=Array.from(document.querySelectorAll('#exl-karao-box .blank-bubble'));
  bubbles.forEach(function(b){
    if(b.classList.contains('correct')) return;
    if(!b.classList.contains('filled')) return;
    var ans=b.dataset.answer.toLowerCase().trim();
    var val=b.textContent.replace(/[^a-zA-ZÀ-ɏ']/g,'').toLowerCase().trim();
    if(val===ans||_lev(val,ans)<=Math.max(1,Math.floor(ans.length*0.3))){
      b.classList.remove('filled'); b.classList.add('correct');
      if(b._btn){b._btn.classList.remove('wrong');b._btn.classList.add('correct');b._btn.disabled=true;}
    } else {
      b.classList.remove('filled'); b.classList.add('wrong');
      if(b._btn){b._btn.classList.remove('correct');b._btn.classList.add('wrong');b._btn.disabled=false;}
    }
  });
  var allOk=bubbles.length>0&&bubbles.every(function(b){return b.classList.contains('correct');});
  if(allOk){
    _challengeActive=false;
    _completedLines[_challengeLineIdx]=true;
    var bc=document.getElementById('exl-blank-count'); if(bc) bc.textContent='';
    setTimeout(_advanceLine,900);
  }
}

window.examListeningVerify=function(){ _checkChallenge(); };

function _clearBank(){
  var bank=document.getElementById('exl-bank'); if(!bank) return;
  bank.innerHTML='<span class="exl-bank-lbl">banco de palabras</span>';
}

/* ─── Avanzar a siguiente línea ─── */
async function _advanceLine(){
  _poolIdx++;
  _renderProgress();
  if(_poolIdx>=_shuffledPool.length){
    setTimeout(_startPhase2,600);
    return;
  }
  var prevYtId=_currentYtId;
  _current=_shuffledPool[_poolIdx];
  _currentYtId=_current.youtube_id;
  _lyrics=_current._lineData?[_current._lineData]:[];
  _clipStart=+(_current.start||0);
  _clipEnd=+(_current.end||0);
  _completedLines={}; _challengeActive=false; _lastKaraoIdx=-1; _challengeLineIdx=-1;

  var tag=document.getElementById('exl-tag');
  if(tag) tag.textContent='listening · '+(_current.pelicula_titulo||'clip')+' · '+_fmtT(_clipStart)+'–'+_fmtT(_clipEnd);
  var bc=document.getElementById('exl-blank-count'); if(bc) bc.textContent='';
  var box=document.getElementById('exl-karao-box');
  if(box) box.innerHTML='<span class="exl-karao-wait">♪ siguiente línea ♪</span>';
  _clearBank();

  if(_currentYtId!==prevYtId){
    if(_player&&typeof _player.loadVideoById==='function'){
      try{ _player.loadVideoById({videoId:_currentYtId,startSeconds:Math.floor(_clipStart)}); }catch(e){}
    }
  } else {
    if(_player){ try{_player.seekTo(_clipStart);_player.playVideo();}catch(e){} }
  }
}

/* ─── Fase 2 ─── */
async function _startPhase2(){
  _phase=2;
  _challengeActive=false;
  if(_karaoTimer){clearInterval(_karaoTimer);_karaoTimer=null;}
  if(_loopTimer){clearInterval(_loopTimer);_loopTimer=null;}
  if(_player) try{_player.pauseVideo();}catch(e){}
  _clearBank();

  var box=document.getElementById('exl-karao-box');
  if(box){
    box.innerHTML='<div class="exl-phase2-banner">'+
      '<span class="exl-p2-icon">🎯</span>'+
      '<span><b>Fase 2</b> · Responde las preguntas de comprensión</span>'+
    '</div>';
  }
  var bc=document.getElementById('exl-blank-count'); if(bc) bc.textContent='';

  await _loadPhase2Questions();

  if(typeof _onQuestionCb==='function'){
    _onQuestionCb({phase:2,started:true,total:_phase2Questions.length});
  }
  var panel=document.getElementById('exl-questions-panel');
  if(panel) panel.innerHTML=_phase2Questions.length
    ?'<div class="exl-q-panel-title">🎯 Preguntas · Fase 2</div>'
    :'';
  document.body.classList.add('exl-phase2');
  _phase2Questions.forEach(function(qData,i){
    setTimeout(function(){ _showQuestion(qData,i); },i*400);
  });
}

async function _loadPhase2Questions(){
  _phase2Questions=[];
  var sb=_sb(); if(!sb) return;
  var poolEscIds=_shuffledPool.map(function(p){return String(p.escena_id);});
  var res=await sb.from('exam_content').select('*')
    .eq('section','listening').eq('rank',_currentRank).eq('language',_currentLang)
    .eq('content_type','listening_question').eq('active',true);
  if(res.error||!res.data) return;
  res.data.forEach(function(row){
    var c=row.content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c={};}}
    if(!c||!c.question) return;
    if(poolEscIds.indexOf(String(c.escena_id))<0) return;
    _phase2Questions.push(c);
  });
  _phase2Questions.sort(function(a,b){return (a.start||0)-(b.start||0);});
}

function _showQuestion(qData,idx){
  if(typeof _onQuestionCb==='function'){
    _onQuestionCb({phase:2,question:qData.question,idx:idx,total:_phase2Questions.length,phrase:qData.phrase});
  }
  var panel=document.getElementById('exl-questions-panel');
  if(panel) _injectQuestion(panel,qData.question,idx,_phase2Questions.length);
}

function _injectQuestion(panel,q,idx,total){
  if(!q||!q.q) return;
  var card=document.createElement('div'); card.className='exl-q-card'; card.dataset.idx=idx;
  var optsHtml=(q.opts||[]).map(function(opt){
    return '<button class="exl-q-opt" data-l="'+_esc(opt.l)+'" data-correct="'+(opt.l===q.correct?'1':'0')+'">'+
      '<b>'+_esc(opt.l)+'</b><span>'+_esc(opt.t)+'</span></button>';
  }).join('');
  card.innerHTML='<div class="exl-q-num">Pregunta '+(idx+1)+' de '+total+'</div>'+
    '<div class="exl-q-text">'+_esc(q.q)+'</div>'+optsHtml;
  card.querySelectorAll('.exl-q-opt').forEach(function(btn){
    btn.addEventListener('click',function(){
      if(card.dataset.answered) return;
      card.dataset.answered='1';
      card.querySelectorAll('.exl-q-opt').forEach(function(b){
        if(b.dataset.correct==='1') b.classList.add('correct'); else b.classList.add('wrong');
        b.disabled=true;
      });
    });
  });
  var first=panel.querySelector('.exl-q-card');
  if(first) panel.insertBefore(card,first); else panel.appendChild(card);
  setTimeout(function(){ card.scrollIntoView({behavior:'smooth',block:'nearest'}); },50);
}

/* ─── Boot ─── */
async function _boot(clip){
  if(!_container) return;
  _current=clip; _currentYtId=clip.youtube_id;
  _lyrics=clip._lineData?[clip._lineData]:[];
  _completedLines={}; _challengeActive=false; _lastKaraoIdx=-1;
  _phase=1; _phase2Questions=[];
  _clipStart=+(clip.start||clip.start_time||0);
  _clipEnd=+(clip.end||clip.end_time||0);
  var tag=document.getElementById('exl-tag');
  if(tag) tag.textContent='listening · '+(clip.pelicula_titulo||'clip')+' · '+_fmtT(_clipStart)+'–'+_fmtT(_clipEnd);
  var qp=document.getElementById('exl-questions-panel');
  if(qp) qp.innerHTML='';
  document.body.classList.remove('exl-phase2');
  _renderProgress();
  _started=false;
  await _initPlayer(clip);
  if(typeof _onPickCb==='function') _onPickCb(clip);
}

/* ─── API pública ─── */
window.initExamListening=async function(opts){
  opts=opts||{};
  _currentRank=opts.rank||'bronce';
  _currentLang=opts.lang||(localStorage.getItem('aura_lang')||'en');
  _container=document.querySelector('.mid-content[data-skill="listen"]'); if(!_container) return;
  _injectCSS(); _renderShell(_container);
  await _loadPool(_currentRank,_currentLang);
  if(!_shuffledPool.length){
    var t2=_container.querySelector('#exl-tag');
    if(t2) t2.textContent='listening · sin líneas configuradas para este nivel';
    var pw=_container.querySelector('.exl-player-wrap');
    if(pw) pw.innerHTML='<div style="padding:32px;text-align:center;color:rgba(255,255,255,.4);font-size:12px;">✏ Configura líneas desde el editor admin</div>';
    return;
  }
  _poolIdx=0;
  await _boot(_shuffledPool[0]);
};

window.previewExamListening=async function(clip){
  _container=document.querySelector('.mid-content[data-skill="listen"]'); if(!_container) return;
  _injectCSS(); _renderShell(_container);
  _current=clip; if(!clip) return;
  _shuffledPool=[clip]; _poolIdx=0;
  if(!clip._lineData){
    var sb=_sb();
    if(sb&&clip.escena_id){
      var er=await sb.from('escenas').select('transcript_json,word_bank_json').eq('id',clip.escena_id).single();
      if(!er.error&&er.data){
        var tj=er.data.transcript_json;
        if(typeof tj==='string'){try{tj=JSON.parse(tj);}catch(e){tj={};}}
        var lyrics=(tj&&tj.lyrics)||[];
        var ld=null;
        lyrics.forEach(function(l){ if(!ld&&Math.abs(+(l.t||0)-clip.start)<0.6) ld=l; });
        if(ld) clip._lineData=ld;
        var wb=er.data.word_bank_json;
        if(typeof wb==='string'){try{wb=JSON.parse(wb);}catch(e){wb=[];}}
        _wbPool=Array.isArray(wb)?wb:[];
      }
    }
  }
  await _boot(clip);
};

window.onExamListeningPick=function(cb){ _onPickCb=cb; };
window.onExamListeningQuestion=function(cb){ _onQuestionCb=cb; };

window.stopExamListening=function(){
  if(_loopTimer){clearInterval(_loopTimer);_loopTimer=null;}
  if(_karaoTimer){clearInterval(_karaoTimer);_karaoTimer=null;}
  if(_player){try{_player.stopVideo();_player.destroy();}catch(e){} _player=null;}
  _challengeActive=false; _phase=1;
  document.body.classList.remove('exl-phase2');
};

})();

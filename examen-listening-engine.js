/* ════════════════════════════════════════════════════════════════
   examen-listening-engine.js  v4
   Fase 1: blank-bubble + chall-opt (karaoke línea a línea)
   Fase 2: replay completo + preguntas A/B/C/D en panel izquierdo
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var _pool=[],_current=null,_player=null;
var _ytApiReady=false,_ytApiPending=false;
var _loopTimer=null,_karaoTimer=null,_phase2Timer=null;
var _lyrics=[],_wbPool=[];
var _container=null,_onPickCb=null,_onQuestionCb=null;
var _lastKaraoIdx=-1;
var _challengeActive=false,_challengeLineIdx=-1;
var _completedLines={};
var _clipStart=0,_clipEnd=0;
var _lineLoopStart=0,_lineLoopEnd=0;
var _started=false;
var _phase=1;               /* 1=rellenar huecos, 2=comprensión */
var _totalChallengeLines=0; /* líneas con 5+ palabras */
var _phase2Questions=[];    /* filas de listening_question */
var _phase2ShownIdx=-1;
var _currentRank='bronce',_currentLang='en';

/* ── Helpers ── */
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

/* ── CSS: blank-bubble + chall-opt + Fase 2 ── */
function _injectCSS(){
  if(document.getElementById('exl-bubble-css')) return;
  var s=document.createElement('style'); s.id='exl-bubble-css';
  s.textContent=[
    '@keyframes blankSpin{to{transform:rotate(360deg)}}',
    '@keyframes exlFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}',
    /* karao box */
    '.exl-karao-box{font-family:var(--sans,"Plus Jakarta Sans",sans-serif);font-size:1.05rem;font-weight:600;color:#fff;letter-spacing:-.005em;line-height:2;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:4px 6px;min-height:52px;padding:14px 10px;text-align:center}',
    '.exl-karao-box .exl-w{color:#fff}',
    '.exl-speaker{font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.38);width:100%;text-align:center;margin-bottom:2px}',
    '.exl-karao-wait{color:rgba(255,255,255,.28);font-size:.88rem;letter-spacing:.06em}',
    /* Fase 2 banner */
    '.exl-phase2-banner{display:flex;align-items:center;gap:10px;background:rgba(196,255,61,.07);border:1px solid rgba(196,255,61,.25);border-radius:12px;padding:12px 18px;font-size:.9rem;font-weight:700;color:#c4ff3d;letter-spacing:.02em;animation:exlFadeIn .4s ease;width:100%;justify-content:center;}',
    '.exl-p2-icon{font-size:1.3rem;}',
    /* blank-bubble — copia exacta de play-movies.css */
    '.blank-bubble{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;min-width:28px;border-radius:50%;background:rgba(196,255,61,.05);border:2.5px solid rgba(196,255,61,.15);border-top-color:#c4ff3d;color:transparent;font-size:.8rem;font-weight:700;padding:0;transition:all .45s cubic-bezier(.34,1.56,.64,1);vertical-align:middle;animation:blankSpin .75s linear infinite;cursor:default}',
    '.blank-bubble.filled{border-radius:16px;min-width:56px;width:auto;height:26px;padding:0 10px;border:1.5px solid rgba(255,255,255,.2);border-top-color:rgba(255,255,255,.2);background:rgba(255,255,255,.07);color:rgba(255,255,255,.55);animation:none;transform:none}',
    '.blank-bubble.correct{border-radius:16px;min-width:56px;width:auto;height:26px;padding:0 10px;border:1.5px solid #34d399;border-top-color:#34d399;background:rgba(52,211,153,.15);color:#34d399;animation:none;transform:none}',
    '.blank-bubble.wrong{border-radius:16px;min-width:56px;width:auto;height:26px;padding:0 10px;border:1.5px solid #f87171;border-top-color:#f87171;background:rgba(248,113,113,.1);color:#f87171;animation:none;transform:none}',
    /* banco de palabras */
    '.exl-bank{display:flex;flex-wrap:wrap;gap:6px;padding:10px 8px;justify-content:center;min-height:44px;border-top:1px solid rgba(255,255,255,.06)}',
    '.exl-bank-lbl{font-size:9px;color:rgba(255,255,255,.28);text-transform:uppercase;letter-spacing:.1em;width:100%;text-align:center;margin-bottom:2px}',
    /* chall-opt — copia exacta de play-movies.css */
    '.chall-opt{padding:7px 14px;background:#1a1a1a;border:1px solid transparent;border-radius:10px;font-family:var(--sans,"Plus Jakarta Sans",sans-serif);font-size:11px;font-weight:700;color:#f0ede6;letter-spacing:.04em;cursor:pointer;transition:all .15s}',
    '.chall-opt:hover:not([disabled]){background:#222;border-color:rgba(255,255,255,.15);transform:translateX(2px)}',
    '.chall-opt.correct{background:rgba(196,255,61,.12)!important;border-color:#c4ff3d!important;color:#c4ff3d!important}',
    '.chall-opt.wrong{background:rgba(248,113,113,.1)!important;border-color:#f87171!important;color:#f87171!important}',
    '.chall-opt[disabled]:not(.correct):not(.wrong){opacity:.35;cursor:default}',
    /* actions */
    '.exl-actions{display:flex;gap:8px;padding:8px 10px 12px;justify-content:center}',
    '.exl-btn-verify{padding:8px 20px;background:rgba(196,255,61,.1);border:1px solid rgba(196,255,61,.28);border-radius:10px;color:#c4ff3d;font-weight:700;font-size:12px;cursor:pointer;transition:all .15s}',
    '.exl-btn-verify:hover{background:rgba(196,255,61,.18)}',
    '.exl-btn-replay{padding:8px 14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;color:rgba(255,255,255,.4);font-size:11px;cursor:pointer}',
    /* overlay iniciar */
    '.exl-start-overlay{position:absolute;inset:0;border-radius:12px;background:rgba(0,0,0,.72);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;z-index:20;backdrop-filter:blur(3px);}',
    '.exl-start-btn{display:flex;align-items:center;gap:10px;padding:14px 28px;background:rgba(196,255,61,.12);border:1.5px solid rgba(196,255,61,.5);border-radius:16px;color:#c4ff3d;font-size:15px;font-weight:800;cursor:pointer;letter-spacing:.03em;transition:all .2s;}',
    '.exl-start-btn:hover{background:rgba(196,255,61,.22);transform:scale(1.04);}',
    '.exl-start-hint{font-size:10px;color:rgba(255,255,255,.3);letter-spacing:.06em;text-align:center;}',
    /* Fase 2: question cards inyectadas en #exl-questions-panel */
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

/* ── YouTube IFrame API ── */
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

/* ── Pool desde exam_content ── */
async function _loadPool(rank,lang){
  _pool=[]; var sb=_sb(); if(!sb) return;
  var res=await sb.from('exam_content').select('*')
    .eq('section','listening').eq('rank',rank).eq('language',lang).eq('active',true)
    .eq('content_type','listening_scene');
  if(res.error){ console.warn('[ExamListening]',res.error); return; }
  (res.data||[]).forEach(function(row){
    var c=row.content; if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c={};}}
    if(c&&c.escena_id) _pool.push(c);
  });
}
function _pickRandom(){ return _pool.length ? _pool[Math.floor(Math.random()*_pool.length)] : null; }

/* ── Fetch escena desde Supabase ── */
async function _fetchEscena(id){
  var sb=_sb(); if(!sb||!id) return null;
  var res=await sb.from('escenas')
    .select('transcript_json,word_bank_json,phrase,speaker,start_time,end_time,youtube_id')
    .eq('id',id).single();
  return res.error ? null : res.data;
}

/* ── Shell HTML ── */
function _renderShell(cont){
  cont.innerHTML=
    '<div class="exam-panel listening-panel" style="--c:124,178,255;">'+
      '<header class="ep-h">'+
        '<span class="ep-tag" id="exl-tag">listening · cargando…</span>'+
        '<span class="ep-count" id="exl-blank-count"></span>'+
        '<button class="adm-ep-btn" id="exl-edit-btn" style="display:none" onclick="typeof window.admOpenDrawer===\'function\'&&window.admOpenDrawer(\'listen\')">✏ Editar</button>'+
      '</header>'+
      '<div class="exl-player-wrap" style="position:relative"><div id="exl-yt"></div></div>'+
      '<div class="exl-karao-box" id="exl-karao-box">'+
        '<span class="exl-karao-wait">♪ esperando diálogo ♪</span>'+
      '</div>'+
      '<div class="exl-bank" id="exl-bank">'+
        '<span class="exl-bank-lbl">banco de palabras</span>'+
      '</div>'+
      '<div class="exl-actions">'+
        '<button class="exl-btn-verify" id="exl-verify">Verificar</button>'+
        '<button class="exl-btn-replay" id="exl-replay">↻ Repetir clip</button>'+
      '</div>'+
    '</div>';
  document.getElementById('exl-verify').onclick=window.examListeningVerify;
  document.getElementById('exl-replay').onclick=function(){
    if(_player&&_clipStart!=null){
      try{_player.seekTo(_clipStart);_player.playVideo();}catch(e){}
    }
  };
  var _eb=document.getElementById('exl-edit-btn');
  if(_eb) _eb.style.display=(document.body.classList.contains('adm-mode')?'':'none');
}

/* ── YT.Player sin controles ── */
async function _initPlayer(clip){
  await _ensureYTAPI();
  if(_player){try{_player.destroy();}catch(e){} _player=null;}
  var wrap=document.querySelector('.exl-player-wrap');
  if(wrap) wrap.innerHTML='<div id="exl-yt"></div>';
  _clipStart=+(clip.start||clip.start_time||0);
  _clipEnd=+(clip.end||clip.end_time||0);
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
        if(!_started && e.data===YT.PlayerState.PLAYING){
          try{e.target.pauseVideo();e.target.mute();}catch(err){}
          return;
        }
        if(_started && e.data===YT.PlayerState.ENDED){
          try{_player.seekTo(_clipStart);_player.playVideo();}catch(err){}
        }
      }
    }
  });
}

/* ── Loop principal ── */
function _startLoop(){
  if(_loopTimer) clearInterval(_loopTimer);
  _loopTimer=setInterval(function(){
    if(!_player||typeof _player.getCurrentTime!=='function'||!_started) return;
    var t=_player.getCurrentTime();
    if(_phase===1&&_challengeActive){
      /* Fase 1: loop dentro de la línea durante challenge */
      if(t>=_lineLoopEnd) try{_player.seekTo(_lineLoopStart);_player.playVideo();}catch(e){}
    } else {
      /* Fase 1 normal o Fase 2: loop del clip completo */
      if(_clipEnd>0&&t>=_clipEnd) try{_player.seekTo(_clipStart);_player.playVideo();}catch(e){}
    }
  },300);
}

/* ── Overlay "Iniciar" ── */
function _showStartOverlay(){
  var wrap=document.querySelector('.exl-player-wrap'); if(!wrap) return;
  var prev=wrap.querySelector('.exl-start-overlay'); if(prev) prev.remove();
  var overlay=document.createElement('div'); overlay.className='exl-start-overlay';
  overlay.innerHTML=
    '<button class="exl-start-btn" id="exl-start-btn">'+
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>'+
      'Iniciar listening'+
    '</button>'+
    '<span class="exl-start-hint">Escucha el diálogo y completa los huecos</span>';
  wrap.appendChild(overlay);
  overlay.querySelector('#exl-start-btn').onclick=function(){
    _started=true;
    overlay.remove();
    if(_player){
      try{_player.seekTo(_clipStart);_player.unMute();_player.setVolume(100);_player.playVideo();}catch(e){}
    }
    _startKarao();
  };
}

/* ── Karaoke timer ── */
function _startKarao(){
  if(_karaoTimer) clearInterval(_karaoTimer);
  _lastKaraoIdx=-1;
  _karaoTimer=setInterval(function(){
    if(!_player||typeof _player.getCurrentTime!=='function') return;
    if(_phase===1&&_challengeActive) return;
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

/* ── Mostrar línea (Fase 1: con challenge | Fase 2: solo texto) ── */
function _showLine(idx){
  var box=document.getElementById('exl-karao-box'); if(!box) return;
  if(idx<0){
    box.innerHTML='<span class="exl-karao-wait">♪ esperando diálogo ♪</span>';
    _clearBank(); return;
  }
  var line=_lyrics[idx];
  var words=[];
  if(line.text){ words=line.text.split(' ').filter(Boolean); }
  else if(line.words){ words=line.words.map(function(w){return w.w||'';}).filter(Boolean); }
  if(!words.length) return;

  var isChallenge=(_phase===1)&&(words.length>=5)&&!_completedLines[idx];
  if(isChallenge){
    _buildChallenge(line,idx,words);
  } else {
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
    if(_phase===1) _clearBank();
  }
}

/* ── Construir challenge de línea ── */
function _buildChallenge(line,lineIdx,words){
  var numBlanks=words.length>=10?3:words.length>=7?2:1;
  var eligible=[], rStart=words.length>4?1:0, rEnd=words.length>4?words.length-1:words.length;
  for(var i=rStart;i<rEnd;i++){
    if(words[i].replace(/[^a-zA-Z]/g,'').length>=3) eligible.push(i);
  }
  if(eligible.length<numBlanks){
    for(var i=0;i<words.length;i++){
      if(eligible.indexOf(i)<0&&words[i].replace(/[^a-zA-Z]/g,'').length>=3) eligible.push(i);
    }
  }
  eligible=_shuffle(eligible);
  var blankIdx=eligible.slice(0,numBlanks).sort(function(a,b){return a-b;});

  _challengeActive=true;
  _challengeLineIdx=lineIdx;
  _lineLoopStart=Math.max(_clipStart,(line.t||0)-2);
  var nextT=(lineIdx+1<_lyrics.length)?_lyrics[lineIdx+1].t:_clipEnd;
  _lineLoopEnd=Math.min(_clipEnd>0?_clipEnd:999999, nextT+1.5);

  var correctWords=blankIdx.map(function(i){
    return words[i].replace(/[^a-zA-ZÀ-ɏ']/g,'').toUpperCase();
  });

  var FALLBACK=['SUPERHERO','ILLEGAL','PERIMETER','FORGET','MISSION',
                'SPECIAL','DANGER','FAMILY','SECRET','STRANGE',
                'TRAINING','NORMAL','POWER','TOGETHER','PROBLEM'];
  var distPool=(_wbPool&&_wbPool.length)?
    _wbPool.map(function(w){return String(w).toUpperCase();}):FALLBACK;
  var dists=_shuffle(distPool.filter(function(w){return correctWords.indexOf(w)<0;}));
  var distCount=Math.min(8,Math.max(3,correctWords.length+3));
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

/* ── Click en banco de palabras ── */
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
    target._btn.classList.remove('wrong','correct');
    target._btn.disabled=false;
  }
  target.classList.remove('wrong','filled');
  target.textContent=word;
  target.classList.add('filled');
  target._btn=el;
  el.disabled=true;
  _checkChallenge();
};

/* ── Verificar burbujas ── */
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
    if(_started) setTimeout(function(){ if(_player) try{_player.playVideo();}catch(e){} },600);
    /* Comprobar si todas las líneas challenge están completas */
    var done=Object.keys(_completedLines).length;
    if(_phase===1&&_totalChallengeLines>0&&done>=_totalChallengeLines){
      setTimeout(_startPhase2, 900);
    }
  }
}

window.examListeningVerify=function(){ _checkChallenge(); };

function _clearBank(){
  var bank=document.getElementById('exl-bank'); if(!bank) return;
  bank.innerHTML='<span class="exl-bank-lbl">banco de palabras</span>';
}

/* ══════════════════════════════════════════════════════
   FASE 2: replay completo + preguntas A/B/C/D
   ══════════════════════════════════════════════════════ */

async function _startPhase2(){
  _phase=2;
  _challengeActive=false;
  if(_karaoTimer){clearInterval(_karaoTimer);_karaoTimer=null;}
  if(_phase2Timer){clearInterval(_phase2Timer);_phase2Timer=null;}
  _clearBank();

  /* Banner transición */
  var box=document.getElementById('exl-karao-box');
  if(box){
    box.innerHTML='<div class="exl-phase2-banner">'+
      '<span class="exl-p2-icon">🎯</span>'+
      '<span><b>Fase 2</b> · Escucha y responde las preguntas</span>'+
    '</div>';
  }
  var bc=document.getElementById('exl-blank-count'); if(bc) bc.textContent='';

  /* Cargar preguntas */
  await _loadPhase2Questions();

  /* Notificar panel izquierdo: Fase 2 comenzó */
  if(typeof _onQuestionCb==='function'){
    _onQuestionCb({phase:2, started:true, total:_phase2Questions.length});
  }

  /* Pausa 1.5s → replay desde inicio */
  setTimeout(function(){
    if(_player){
      try{_player.seekTo(_clipStart);_player.playVideo();}catch(e){}
    }
    _startKarao();
    if(_phase2Questions.length) _startPhase2Timer();
  },1500);
}

async function _loadPhase2Questions(){
  _phase2Questions=[];
  _phase2ShownIdx=-1;
  var sb=_sb(); if(!sb||!_current) return;
  var escenaId=_current.escena_id; if(!escenaId) return;

  var res=await sb.from('exam_content').select('*')
    .eq('section','listening')
    .eq('rank',_currentRank)
    .eq('language',_currentLang)
    .eq('content_type','listening_question')
    .eq('active',true);

  if(res.error||!res.data) return;

  res.data.forEach(function(row){
    var c=row.content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c={};}}
    if(!c||!c.question) return;
    if(String(c.escena_id)!==String(escenaId)) return;
    _phase2Questions.push(c);
  });

  /* Ordenar por timestamp de la línea */
  _phase2Questions.sort(function(a,b){ return (a.start||0)-(b.start||0); });
}

function _startPhase2Timer(){
  if(_phase2Timer) clearInterval(_phase2Timer);
  _phase2ShownIdx=-1;
  _phase2Timer=setInterval(function(){
    if(!_player||typeof _player.getCurrentTime!=='function'||_phase!==2) return;
    var t=_player.getCurrentTime();
    for(var i=_phase2ShownIdx+1;i<_phase2Questions.length;i++){
      /* Mostrar la pregunta 0.5s antes del timestamp de la línea */
      if(t>=((_phase2Questions[i].start||0)-0.5)){
        _phase2ShownIdx=i;
        _showQuestion(_phase2Questions[i],i);
      } else break;
    }
  },300);
}

function _showQuestion(qData,idx){
  /* Callback para página (panel izquierdo) */
  if(typeof _onQuestionCb==='function'){
    _onQuestionCb({
      phase:2, question:qData.question,
      idx:idx, total:_phase2Questions.length, phrase:qData.phrase
    });
  }
  /* Inyección directa en #exl-questions-panel si existe */
  var panel=document.getElementById('exl-questions-panel');
  if(panel) _injectQuestion(panel,qData.question,idx,_phase2Questions.length);
}

function _injectQuestion(panel,q,idx,total){
  if(!q||!q.q) return;
  var card=document.createElement('div');
  card.className='exl-q-card';
  card.dataset.idx=idx;
  var optsHtml=(q.opts||[]).map(function(opt){
    return '<button class="exl-q-opt" data-l="'+_esc(opt.l)+'" data-correct="'+(opt.l===q.correct?'1':'0')+'">'+
      '<b>'+_esc(opt.l)+'</b><span>'+_esc(opt.t)+'</span>'+
    '</button>';
  }).join('');
  card.innerHTML=
    '<div class="exl-q-num">Pregunta '+(idx+1)+' de '+total+'</div>'+
    '<div class="exl-q-text">'+_esc(q.q)+'</div>'+optsHtml;
  card.querySelectorAll('.exl-q-opt').forEach(function(btn){
    btn.addEventListener('click',function(){
      if(card.dataset.answered) return;
      card.dataset.answered='1';
      card.querySelectorAll('.exl-q-opt').forEach(function(b){
        if(b.dataset.correct==='1') b.classList.add('correct');
        else b.classList.add('wrong');
        b.disabled=true;
      });
    });
  });
  /* Insertar al principio (pregunta más reciente primero) */
  var first=panel.querySelector('.exl-q-card');
  if(first) panel.insertBefore(card,first);
  else panel.appendChild(card);
  /* Scroll suave hacia la nueva pregunta */
  setTimeout(function(){ card.scrollIntoView({behavior:'smooth',block:'nearest'}); },50);
}

/* ── Boot: carga datos y prepara motor ── */
async function _boot(clip,escenaData){
  if(!_container) return;
  _lyrics=[]; _wbPool=[]; _completedLines={}; _challengeActive=false; _lastKaraoIdx=-1;
  _phase=1; _phase2Questions=[]; _phase2ShownIdx=-1; _totalChallengeLines=0;
  _clipStart=+(clip.start||clip.start_time||0);
  _clipEnd=+(clip.end||clip.end_time||0);

  if(escenaData){
    var tj=escenaData.transcript_json;
    if(typeof tj==='string'){try{tj=JSON.parse(tj);}catch(e){tj={};}}
    _lyrics=(tj&&tj.lyrics)||[];
    var wb=escenaData.word_bank_json;
    if(typeof wb==='string'){try{wb=JSON.parse(wb);}catch(e){wb=[];}}
    _wbPool=Array.isArray(wb)?wb:[];
  }

  /* Contar líneas challenge (5+ palabras) */
  _totalChallengeLines=_lyrics.filter(function(l){
    var wds=l.text?l.text.split(' ').filter(Boolean):
             l.words?l.words.map(function(w){return w.w||'';}).filter(Boolean):[];
    return wds.length>=5;
  }).length;

  var tag=_container.querySelector('#exl-tag');
  if(tag) tag.textContent='listening · '+(clip.pelicula_titulo||'clip')+
    ' · '+_fmtT(_clipStart)+'–'+_fmtT(_clipEnd);

  /* Reset panel preguntas */
  var qp=document.getElementById('exl-questions-panel');
  if(qp) qp.innerHTML='';
  document.body.classList.remove('exl-phase2');

  _started=false;
  await _initPlayer(clip);
  if(typeof _onPickCb==='function') _onPickCb(clip);
}

/* ── API pública ── */
window.initExamListening=async function(opts){
  opts=opts||{};
  _currentRank=opts.rank||'bronce';
  _currentLang=opts.lang||(localStorage.getItem('aura_lang')||'en');
  _container=document.querySelector('.mid-content[data-skill="listen"]'); if(!_container) return;
  _injectCSS(); _renderShell(_container);
  await _loadPool(_currentRank,_currentLang); _current=_pickRandom();
  if(!_current){
    var t2=_container.querySelector('#exl-tag');
    if(t2) t2.textContent='listening · sin escenas configuradas para este nivel';
    var pw=_container.querySelector('.exl-player-wrap');
    if(pw) pw.innerHTML='<div style="padding:32px;text-align:center;color:rgba(255,255,255,.4);font-size:12px;">✏ Configura escenas desde el editor admin</div>';
    return;
  }
  await _boot(_current, _current.escena_id ? await _fetchEscena(_current.escena_id) : null);
};

window.previewExamListening=async function(clip){
  _container=document.querySelector('.mid-content[data-skill="listen"]'); if(!_container) return;
  _injectCSS(); _renderShell(_container); _current=clip; if(!clip) return;
  await _boot(clip, clip.escena_id ? await _fetchEscena(clip.escena_id) : null);
};

window.onExamListeningPick=function(cb){ _onPickCb=cb; };
window.onExamListeningQuestion=function(cb){ _onQuestionCb=cb; };

window.stopExamListening=function(){
  if(_loopTimer){clearInterval(_loopTimer);_loopTimer=null;}
  if(_karaoTimer){clearInterval(_karaoTimer);_karaoTimer=null;}
  if(_phase2Timer){clearInterval(_phase2Timer);_phase2Timer=null;}
  if(_player){try{_player.stopVideo();_player.destroy();}catch(e){} _player=null;}
  _challengeActive=false; _phase=1;
  document.body.classList.remove('exl-phase2');
};

})();

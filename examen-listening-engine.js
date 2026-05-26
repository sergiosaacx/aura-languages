/* ════════════════════════════════════════════════════════════════
   examen-listening-engine.js  v2
   Motor del Listening del examen — replica play-movies:
   · YT.Player sin controles (controls:0)
   · Loop entre clip.start y clip.end
   · Karaoke en tiempo real con transcript_json.lyrics
   · Blanks aleatorios ~30% + banco de palabras
   · Pool aleatorio desde exam_content (Supabase)
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var _pool=[], _current=null, _player=null;
var _ytApiReady=false, _ytApiPending=false;
var _loopTimer=null, _karaoTimer=null;
var _lyrics=[], _gaps=[], _blankedIdx=[];
var _container=null, _onPickCb=null, _lastKaraoIdx=-1;

function _sb(){
  if(window._aura&&window._aura.sb) return window._aura.sb;
  if(window.auraSupabase) return window.auraSupabase;
  return null;
}
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function _fmtT(s){ s=+s||0; var m=Math.floor(s/60),r=Math.floor(s%60); return m+':'+String(r).padStart(2,'0'); }
function _shuffle(a){ for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }

/* YouTube API */
function _ensureYTAPI(){
  if(_ytApiReady) return Promise.resolve();
  if(_ytApiPending) return new Promise(function(res){ var iv=setInterval(function(){ if(_ytApiReady){clearInterval(iv);res();} },80); });
  _ytApiPending=true;
  return new Promise(function(res){
    if(window.YT&&window.YT.Player){ _ytApiReady=true; res(); return; }
    var prev=window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady=function(){ _ytApiReady=true; if(typeof prev==='function')prev(); res(); };
    var s=document.createElement('script'); s.src='https://www.youtube.com/iframe_api'; document.head.appendChild(s);
  });
}

/* Pool desde exam_content */
async function _loadPool(rank,lang){
  _pool=[]; var sb=_sb(); if(!sb) return;
  var res=await sb.from('exam_content').select('*').eq('section','listening').eq('rank',rank).eq('language',lang).eq('active',true);
  if(res.error){ console.warn('[ExamListening]',res.error); return; }
  (res.data||[]).forEach(function(row){
    var c=row.content; if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c={};}}
    if(c&&c.escena_id) _pool.push(c);
  });
}
function _pickRandom(){ return _pool.length ? _pool[Math.floor(Math.random()*_pool.length)] : null; }

/* Fetch escena completa */
async function _fetchEscena(id){
  var sb=_sb(); if(!sb||!id) return null;
  var res=await sb.from('escenas').select('transcript_json,word_bank_json,phrase,speaker,start_time,end_time,youtube_id').eq('id',id).single();
  return res.error ? null : res.data;
}

/* Shell HTML */
function _renderShell(cont){
  cont.innerHTML=
    '<div class="exam-panel listening-panel" style="--c:124,178,255;">'+
      '<header class="ep-h">'+
        '<span class="ep-tag" id="exl-tag">listening · cargando…</span>'+
        '<span class="ep-count" id="exl-blank-count"></span>'+
      '</header>'+
      '<div class="exl-player-wrap"><div id="exl-yt"></div></div>'+
      '<div class="exl-karao-box" id="exl-karao-box">'+
        '<span class="exl-karao-wait">♪ esperando diálogo ♪</span>'+
      '</div>'+
      '<div class="exl-bank" id="exl-bank"></div>'+
      '<div class="exl-actions">'+
        '<button class="exl-btn-verify" id="exl-verify">Verificar</button>'+
        '<button class="exl-btn-replay" id="exl-replay">↻ Repetir clip</button>'+
      '</div>'+
    '</div>';
  document.getElementById('exl-verify').onclick=window.examListeningVerify;
  document.getElementById('exl-replay').onclick=function(){
    if(_player&&_current){ try{_player.seekTo(+(_current.start||_current.start_time||0));_player.playVideo();}catch(e){} }
  };
  if(typeof window.admAddEditBtns==='function') setTimeout(window.admAddEditBtns,100);
}

/* YT.Player sin controles */
async function _initPlayer(clip){
  await _ensureYTAPI();
  if(_player){try{_player.destroy();}catch(e){} _player=null;}
  var wrap=document.querySelector('.exl-player-wrap');
  if(wrap) wrap.innerHTML='<div id="exl-yt"></div>';
  var startT=+(clip.start||clip.start_time||0);
  _player=new YT.Player('exl-yt',{
    videoId:clip.youtube_id,
    playerVars:{autoplay:1,controls:0,modestbranding:1,showinfo:0,rel:0,iv_load_policy:3,fs:0,disablekb:1,start:startT,playsinline:1,mute:1},
    events:{
      onReady:function(e){
        try{e.target.seekTo(startT);e.target.playVideo();}catch(err){}
        setTimeout(function(){try{e.target.unMute();e.target.setVolume(100);}catch(err){}},800);
        _startLoop(clip);
      },
      onStateChange:function(e){
        if(e.data===YT.PlayerState.ENDED){try{_player.seekTo(startT);_player.playVideo();}catch(err){}}
      }
    }
  });
}

/* Loop start→end */
function _startLoop(clip){
  if(_loopTimer) clearInterval(_loopTimer);
  var endT=+(clip.end||clip.end_time||0), startT=+(clip.start||clip.start_time||0);
  if(!endT) return;
  _loopTimer=setInterval(function(){
    if(!_player||typeof _player.getCurrentTime!=='function') return;
    if(_player.getCurrentTime()>=endT){try{_player.seekTo(startT);_player.playVideo();}catch(e){}}
  },400);
}

/* Karaoke real-time */
function _startKarao(lyrics,gaps,blankedIdx){
  if(_karaoTimer) clearInterval(_karaoTimer);
  _lyrics=lyrics||[]; _gaps=gaps||[]; _blankedIdx=blankedIdx||[]; _lastKaraoIdx=-1;
  _karaoTimer=setInterval(function(){
    if(!_player||typeof _player.getCurrentTime!=='function') return;
    var t=_player.getCurrentTime(), idx=-1;
    for(var i=0;i<_lyrics.length;i++){
      var l=_lyrics[i]; if(t>=l.t) idx=i;
      if(t>=l.t&&t<(l.end||l.t+3)){idx=i;break;}
    }
    if(idx===_lastKaraoIdx) return;
    _lastKaraoIdx=idx;
    _renderKaraoLine(idx);
  },200);
}

function _renderKaraoLine(idx){
  var box=document.getElementById('exl-karao-box'); if(!box) return;
  if(idx<0){box.innerHTML='<span class="exl-karao-wait">♪ esperando diálogo ♪</span>';return;}
  var line=_lyrics[idx]; box.innerHTML='';
  if(line.speaker){var sp=document.createElement('span');sp.className='exl-speaker';sp.textContent=line.speaker+': ';box.appendChild(sp);}
  var words=line.words||[{w:line.text,t:line.t}];
  words.forEach(function(word,wi){
    var key=idx+'-'+wi;
    if(_blankedIdx.indexOf(key)>=0){
      var clean=word.w.replace(/[^a-zA-Z'\-]/g,'');
      var wrap2=document.createElement('span'); wrap2.className='exl-blank-wrap';
      var inp=document.createElement('input'); inp.type='text'; inp.className='exl-blank-inp';
      inp.dataset.answer=clean; inp.style.width=Math.max(64,clean.length*11)+'px'; inp.placeholder='___';
      inp.addEventListener('keydown',function(e){if(e.key==='Enter'&&window.examListeningVerify)window.examListeningVerify();});
      wrap2.appendChild(inp); box.appendChild(wrap2);
    } else {
      var sp2=document.createElement('span'); sp2.className='exl-w'; sp2.textContent=word.w+' '; box.appendChild(sp2);
    }
  });
}

function _computeBlankedIdx(lyrics){
  var cands=[];
  (lyrics||[]).forEach(function(line,li){
    (line.words||[]).forEach(function(word,wi){ if(word.w.replace(/[^a-zA-Z'\-]/g,'').length>=3) cands.push(li+'-'+wi); });
  });
  var n=Math.min(Math.max(2,Math.floor(cands.length*0.3)),10);
  return _shuffle(cands.slice()).slice(0,n);
}

function _renderWordBank(wbArr,blankedWords){
  var bank=document.getElementById('exl-bank'); if(!bank) return;
  var seen={},all=[];
  blankedWords.concat(wbArr||[]).forEach(function(w){ var k=(w||'').toLowerCase().trim(); if(!k||seen[k]) return; seen[k]=1; all.push(w); });
  _shuffle(all); all=all.slice(0,12);
  bank.innerHTML='<span class="exl-bank-lbl">banco · elige</span>'+all.map(function(w){return '<button class="exl-bank-opt" data-w="'+_esc(w)+'">'+_esc(w)+'</button>';}).join('');
  bank.querySelectorAll('.exl-bank-opt').forEach(function(btn){
    btn.onclick=function(){
      var target=document.querySelector('#exl-karao-box .exl-blank-inp:not(.correct):not([disabled])');
      if(target){ target.value=btn.dataset.w; btn.classList.add('used'); var all2=Array.from(document.querySelectorAll('#exl-karao-box .exl-blank-inp:not(.correct)')); var i=all2.indexOf(target); if(all2[i+1]) all2[i+1].focus(); }
    };
  });
}

window.examListeningVerify=function(){
  document.querySelectorAll('#exl-karao-box .exl-blank-inp:not(.correct)').forEach(function(inp){
    var ans=(inp.dataset.answer||'').toLowerCase().trim(), typed=(inp.value||'').toLowerCase().trim();
    if(!typed) return;
    inp.classList.remove('wrong','partial');
    if(typed===ans){inp.classList.add('correct');inp.disabled=true;} else {inp.classList.add('wrong');}
  });
};

/* Boot interno */
async function _boot(clip,escenaData){
  if(!_container) return;
  var lyrics=[],gaps=[],wbArr=[];
  if(escenaData){
    var tj=escenaData.transcript_json; if(typeof tj==='string'){try{tj=JSON.parse(tj);}catch(e){tj={};}}
    lyrics=(tj&&tj.lyrics)||[]; gaps=(tj&&tj.gaps)||[];
    var wb=escenaData.word_bank_json; if(typeof wb==='string'){try{wb=JSON.parse(wb);}catch(e){wb=[];}}
    wbArr=Array.isArray(wb)?wb:[];
  }
  var tag=_container.querySelector('#exl-tag');
  if(tag) tag.textContent='listening · '+(clip.pelicula_titulo||'clip')+' · '+_fmtT(+(clip.start||clip.start_time||0))+'–'+_fmtT(+(clip.end||clip.end_time||0));
  var blankedIdx=_computeBlankedIdx(lyrics);
  var bc=_container.querySelector('#exl-blank-count'); if(bc) bc.textContent=blankedIdx.length+' huecos';
  await _initPlayer(clip);
  if(lyrics.length>0){
    _startKarao(lyrics,gaps,blankedIdx);
    var bWords=blankedIdx.map(function(key){ var p=key.split('-'),li=+p[0],wi=+p[1]; var w=lyrics[li]&&lyrics[li].words&&lyrics[li].words[wi]; return w?w.w.replace(/[^a-zA-Z'\-]/g,''):''; }).filter(Boolean);
    _renderWordBank(wbArr,bWords);
  }
  if(typeof _onPickCb==='function') _onPickCb(clip);
}

/* Entrada pública: examen */
window.initExamListening=async function(opts){
  opts=opts||{}; var rank=opts.rank||'bronce', lang=opts.lang||(localStorage.getItem('aura_lang')||'en');
  _container=document.querySelector('.mid-content[data-skill="listen"]'); if(!_container) return;
  _renderShell(_container);
  await _loadPool(rank,lang); _current=_pickRandom();
  if(!_current){
    var t2=_container.querySelector('#exl-tag'); if(t2) t2.textContent='listening · sin escenas configuradas para este nivel';
    var pw=_container.querySelector('.exl-player-wrap'); if(pw) pw.innerHTML='<div style="padding:32px;text-align:center;color:rgba(255,255,255,.4);font-size:12px;">✏ Configura escenas desde el editor admin</div>';
    return;
  }
  await _boot(_current, _current.escena_id ? await _fetchEscena(_current.escena_id) : null);
};

/* Entrada pública: preview admin */
window.previewExamListening=async function(clip){
  _container=document.querySelector('.mid-content[data-skill="listen"]'); if(!_container) return;
  _renderShell(_container); _current=clip; if(!clip) return;
  await _boot(clip, clip.escena_id ? await _fetchEscena(clip.escena_id) : null);
};

window.onExamListeningPick=function(cb){ _onPickCb=cb; };

window.stopExamListening=function(){
  if(_loopTimer){clearInterval(_loopTimer);_loopTimer=null;}
  if(_karaoTimer){clearInterval(_karaoTimer);_karaoTimer=null;}
  if(_player){try{_player.stopVideo();_player.destroy();}catch(e){} _player=null;}
};

})();

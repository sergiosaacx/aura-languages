/* ═══════════════════════════════════════════════════════════
   SHADOWLAB — Lógica completa  v1.0
   Stack: HTML/CSS/JS vanilla · Supabase · YouTube IFrame API
   Datos: /data/movies/incredibles-2/escena-N.json
   Formato: { videoId, lyrics:[{ t, text }] }
═══════════════════════════════════════════════════════════ */
(function () {
'use strict';

/* ── Integración con popup-dificultad.js ───────────────────── */
/* Definir ANTES de DOMContentLoaded para que el popup pueda envolver esta función */
window.karaoState = { difficulty: 'medio' };
window.loadAndInitKaraoke = function(videoId){
  /* El popup llama a esta función tras elegir dificultad.
     Sincronizamos S.diff y los pills, luego arrancamos la sesión. */
  var sel = (window.karaoState && window.karaoState.difficulty) || 'medio';
  /* Mapear claves del popup (español) a las del filtro (inglés) */
  var _dm = {facil:'easy', medio:'medium', dificil:'hard', legendario:'legendary'};
  S.diff = _dm[sel] || sel;
  var pillMap = {facil:'diffEasy', medio:'diffMed', dificil:'diffHard', legendario:'diffLegend'};
  document.querySelectorAll('.diff-pill').forEach(function(p){ p.classList.remove('active'); });
  var pid = pillMap[sel]; if(pid){ var pb=document.getElementById(pid); if(pb) pb.classList.add('active'); }
  startSession();
};

/* ── Estado ─────────────────────────────────────────────── */
/* ── Mapa idioma Aura → código BCP-47 para SpeechRecognition ── */
var LANG_MAP = {en:'en-US',fr:'fr-FR',it:'it-IT',es:'es-ES',pt:'pt-BR'};
function getRecLang(){
  var l=localStorage.getItem('aura_lang')||(window._aura&&window._aura.active_language)||'en';
  return LANG_MAP[l]||'en-US';
}

var S = {
  movie:null, session:[], idx:0, scores:[], missed:{}, sessionPoints:0, sessionRecord:0,
  diff:'medium', phase:'idle', currentMovieIdx:0,
  micTimeout:8, micGain:1.0,
  player:null, endIv:null, recog:null, micStream:null,
  audioCtx:null, analyser:null, audioSrc:null, waveRaf:null, cdIv:null,
  spokenDetected:false,
  karaokeIv:null,
};
function $(id){ return document.getElementById(id); }

/* ── Navegación ─────────────────────────────────────────── */
function initNav(){
  var map={navHome:'home.html',navDashboard:'dashboard.html',navMovies:'movies.html',navLyric:'lyriclab.html',navSocial:'#',navShop:'#',navSettings:'#'};
  Object.keys(map).forEach(function(id){ var b=$(id); if(b&&map[id]!=='#')b.onclick=function(){location.href=map[id];}; });
}

/* ── Carga de datos JSON (misma fuente que play-movies.html) ─ */
/* Los JSON son la fuente de verdad — cualquier corrección en los
   archivos data/movies/ se refleja automáticamente aquí también.  */

/* MOVIE_SCENES ya no es estático — se carga dinámicamente desde Supabase en loadMovieIndex() */
var MOVIE_SCENES = []; /* se llena en init() */

function parseScene(data){
  /* data = objeto JSON: { videoId/vid, gaps:[], lyrics:[{t, text}] } */
  var vid = data.videoId || data.vid || '';
  var gaps = (data.gaps || []).slice();
  /* Normalizar gaps: JSON usa {start,end}, legado usa {s,e} */
  gaps = gaps.map(function(g){ return { s: g.start!=null?g.start:g.s, e: g.end!=null?g.end:g.e }; });

  /* Ordenar lyrics por timestamp — algún JSON puede tener entradas fuera de orden */
  var lyrics = (data.lyrics || []).slice().sort(function(a,b){ return a.t - b.t; });
  var out = [];

  lyrics.forEach(function(item, i){
    var txt = (item.text || '').trim();
    if(txt.length < 4) return;
    var t = item.t;

    /* Omitir si cae dentro de un gap (música sin diálogo) */
    if(gaps.some(function(g){ return t >= g.s && t < g.e; })) return;

    var nxt = lyrics[i + 1];
    var wc  = txt.split(/\s+/).length;

    /* Próximo gap después de esta línea */
    var nextGap = null;
    gaps.forEach(function(g){
      if(g.s > t && (!nextGap || g.s < nextGap.s)) nextGap = g;
    });

    /* Fin natural: próxima línea (si está ≤12 s) o estimado por palabras */
    var naturalEnd;
    if(nxt && (nxt.t - t) > 0 && (nxt.t - t) <= 12){
      naturalEnd = nxt.t - 0.1;
    } else {
      naturalEnd = t + wc * 0.52 + 1.8;
    }
    if(nextGap && nextGap.s < naturalEnd) naturalEnd = nextGap.s - 0.1;
    naturalEnd = Math.max(naturalEnd, t + 2);

    /* Pre-roll 5 s para que YouTube alcance el keyframe correcto antes del timestamp.
       Post-roll 1.5 s de margen tras el fin del diálogo. */
    var seekStart = Math.max(0, t - 5);
    var stopAt    = naturalEnd + 1.5;

    /* Si el JSON tiene timestamps por palabra (WhisperX), pasarlos al segmento */
    var wordTs = null;
    if(item.words && item.words.length === wc){
      wordTs = item.words.map(function(w){ return w.t || w.start || t; });
    }

    out.push({
      text       : txt,
      start      : seekStart,
      lineStart  : t,
      end        : stopAt,
      videoId    : vid,
      wordTs     : wordTs,
      translation: item.translation || null,
      wc         : wc,
      difficulty : wc >= 11 ? 'legendary' : wc >= 7 ? 'hard' : wc >= 4 ? 'medium' : 'easy'
    });
  });
  return out;
}

/* ── Carga dinámica de películas desde Supabase (filtrada por idioma) ── */
async function loadMovieIndex(){
  var lang = localStorage.getItem('aura_lang') || (window._aura && window._aura.active_language) || 'en';
  var sb = window._aura && window._aura.sb;
  if(!sb){ console.warn('[ShadowLab] Supabase no disponible'); return []; }
  var q = sb.from('peliculas')
    .select('slug,titulo_main,titulo_sub,studio,portada_url,language')
    .eq('activo', true).order('orden');
  if(lang === 'en'){
    q = q.or('language.eq.en,language.is.null');
  } else {
    q = q.eq('language', lang);
  }
  var res = await q;
  if(res.error || !res.data || !res.data.length) return [];

  var movies = [];
  for(var i = 0; i < res.data.length; i++){
    var row = res.data[i];
    try{
      var r = await fetch('https://raw.githubusercontent.com/sergiosaacx/aura-languages/main/data/movies/'+row.slug+'.json');
      if(!r.ok) continue;
      var data = await r.json();
      /* Solo incluir películas con al menos una escena karaoke con transcript */
      var karaoke = (data.scenes||[]).filter(function(s){return s.has_karaoke && s.transcript_json;});
      if(!karaoke.length) continue;
      movies.push({
        title  : (row.titulo_main||row.slug) + (row.titulo_sub ? ' '+row.titulo_sub : ''),
        studio : row.studio || '',
        poster : row.portada_url || null,
        slug   : row.slug,
        _scenes: karaoke /* escenas con karaoke ya filtradas */
      });
    } catch(e){ console.warn('[ShadowLab] No se pudo cargar', row.slug, e); }
  }
  return movies;
}

async function loadMovie(movieObj){
  if(!movieObj) return [];
  var all = [];
  /* Las escenas ya están en _scenes (filtradas en loadMovieIndex) */
  var karaoke = movieObj._scenes || [];
  for(var i = 0; i < karaoke.length; i++){
    try{
      var sceneData = typeof karaoke[i].transcript_json === 'string'
        ? JSON.parse(karaoke[i].transcript_json)
        : karaoke[i].transcript_json;
      all = all.concat(parseScene(sceneData));
    } catch(e){ console.warn('[ShadowLab] Error parseando escena', i, e); }
  }
  return all;
}

function shuffle(arr){
  for(var i=arr.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=arr[i];arr[i]=arr[j];arr[j]=t;}
  return arr;
}

/* Deck por dificultad: garantiza ver todas las líneas antes de repetir */
function buildDecks(all){
  /* Mazo único con todas las líneas — evita repetición prematura.
     75 líneas = 5 sesiones de 15 sin ninguna repetición. */
  return { unified: { lines: shuffle(all.slice()), ptr: 0 } };
}

function nextBatch(decks, diff, n){
  n = n || 15;
  /* Filtro por percentil de longitud — se adapta a cualquier película.
     Ordenar todas las líneas por wc (word count) y cortar por percentil:
       easy      → 25% más cortas
       medium    → 50% centrales (p25 a p75)
       hard      → 25% más largas
       legendary → 10% más largas
     Siempre habrá líneas en cada nivel sin importar la película. */
  var sorted = decks.unified.lines.slice().sort(function(a,b){ return a.wc - b.wc; });
  var total  = sorted.length;
  var p25    = Math.floor(total * 0.25);
  var p50    = Math.floor(total * 0.50);
  var p75    = Math.floor(total * 0.75);
  var p90    = Math.floor(total * 0.90);
  var pool;
  if(diff === 'easy')           pool = sorted.slice(0, Math.max(p25, 3));
  else if(diff === 'hard')      pool = sorted.slice(p75);
  else if(diff === 'legendary') pool = sorted.slice(p90);
  else                          pool = sorted.slice(p25, p75); /* medium: rango central */
  if(pool.length < 3)           pool = sorted.slice(); /* fallback de seguridad */
  pool = shuffle(pool.slice());
  var result = [];
  var ptr = 0;
  while(result.length < n){
    if(ptr >= pool.length){ shuffle(pool); ptr = 0; }
    result.push(pool[ptr++]);
  }
  return result;
}

/* ── YouTube IFrame API ─────────────────────────────────── */
function loadYTAPI(){
  if(window.YT&&window.YT.Player)return Promise.resolve();
  return new Promise(function(resolve){
    var s=document.createElement('script');s.src='https://www.youtube.com/iframe_api';
    document.head.appendChild(s);window.onYouTubeIframeAPIReady=resolve;
  });
}

function buildPlayer(videoId){
  return new Promise(function(resolve,reject){
    /* Insertar dentro de .scene-bg para que el video sea el fondo real */
    var bg=document.querySelector('.scene-bg');
    var w=document.getElementById('slYTWrap');
    if(!w){
      w=document.createElement('div');
      w.id='slYTWrap';
      /* Cubre todo el scene-bg; el ::after overlay queda encima */
      w.style.cssText='position:absolute;inset:0;overflow:hidden;z-index:0;pointer-events:none;';
      if(bg) bg.appendChild(w); else document.body.appendChild(w);
    }
    w.innerHTML='<div id="slYTDiv"></div>';
    new YT.Player('slYTDiv',{
      width:'100%',height:'100%',
      videoId:videoId,
      playerVars:{autoplay:0,controls:0,disablekb:1,fs:0,modestbranding:1,rel:0,enablejsapi:1,origin:window.location.origin},
      events:{
        onReady:function(e){
          /* Estilizar el iframe para cubrir el contenedor como fondo */
          try{
            var fr=w.querySelector('iframe');
            if(fr){fr.style.cssText='position:absolute;top:50%;left:50%;'
              +'transform:translate(-50%,-50%);width:300%;height:300%;'
              +'pointer-events:none;border:none;';}
          }catch(x){}
          try{e.target.unMute();e.target.setVolume(100);}catch(x){}
          resolve(e.target);
        },
        onStateChange:function(e){
          if(e.data===1){try{e.target.unMute();e.target.setVolume(100);}catch(x){}}
        },
        onError:function(e){reject(e);}
      }
    });
  });
}

function playSegment(player,line,onEnd){
  clearInterval(S.endIv);
  stopKaraoke();

  /* Mostrar palabras en pending — se activan cuando el video llega al timestamp */
  var el=$('lineText');
  var words=norm(line.text); var wc=words.length;
  if(el&&wc>0){
    el.innerHTML=words.map(function(w){
      return'<span class="word pending">'+w+'</span>';
    }).join(' ');
  }

  /* MUTE durante pre-roll para que el usuario no oiga audio de otra línea.
     Se hace unmute exactamente cuando currentTime >= lineStart. */
  try{player.mute();}catch(e){}

  var curVid='';
  try{curVid=player.getVideoData().video_id;}catch(e){}
  if(curVid&&curVid===line.videoId){
    player.seekTo(line.start,true);player.playVideo();
  } else {
    player.loadVideoById({videoId:line.videoId,startSeconds:line.start});
  }

  var started=false;
  var unmuted=false;
  var speechDur=Math.max(1.5,(line.end-1.5)-line.lineStart);

  S.endIv=setInterval(function(){
    try{
      var ct=player.getCurrentTime();
      var st=player.getPlayerState();
      if(st===1){
        started=true;

        /* Unmute exactamente cuando el video llega al timestamp de la línea */
        if(!unmuted&&ct>=line.lineStart){
          unmuted=true;
          try{player.unMute();player.setVolume(100);}catch(x){}
        }

        /* Karaoke: resaltar palabras cuando ya estamos en la línea.
           Si el JSON tiene timestamps por palabra (WhisperX), usar esos.
           Si no, estimar dividiendo la duración entre el número de palabras. */
        if(unmuted&&el&&wc>0){
          var spans=el.querySelectorAll('.word');
          var ai;
          if(line.wordTs&&line.wordTs.length===wc){
            /* Timestamps exactos por palabra — precisión WhisperX */
            ai=0;
            for(var wi=0;wi<wc;wi++){if(ct>=line.wordTs[wi])ai=wi+1;}
            ai=Math.min(wc-1,Math.max(0,ai-1));
            /* Determinar cuál está sonando ahora */
            var now=-1;
            for(var wi2=0;wi2<wc;wi2++){
              if(ct>=line.wordTs[wi2]&&(wi2===wc-1||ct<line.wordTs[wi2+1])){now=wi2;break;}
            }
            spans.forEach(function(sp,i){
              sp.className='word'+(i<now?' done':i===now?' now':'');
            });
          } else {
            /* Estimación uniforme por duración */
            var elapsed=ct-line.lineStart;
            var spw=speechDur/wc;
            ai=Math.min(wc-1,Math.floor(elapsed/spw));
            spans.forEach(function(sp,i){
              sp.className='word'+(i<ai?' done':i===ai?' now':'');
            });
          }
        }

        if(ct>=line.end){clearInterval(S.endIv);player.pauseVideo();onEnd();}
      } else if((st===0||st===-1)&&started){
        clearInterval(S.endIv);onEnd();
      } else if(st===3||st===5||st===2){
        try{player.playVideo();}catch(x){}
      }
    }catch(e){}
  },80);
}

/* ── Web Audio Waveform ─────────────────────────────────── */
function connectWave(stream){
  try{
    if(!S.audioCtx)S.audioCtx=new(window.AudioContext||window.webkitAudioContext)();
    S.analyser=S.audioCtx.createAnalyser();S.analyser.fftSize=64;
    S.audioSrc=S.audioCtx.createMediaStreamSource(stream);S.audioSrc.connect(S.analyser);
    (function loop(){
      S.waveRaf=requestAnimationFrame(loop);
      var data=new Uint8Array(S.analyser.frequencyBinCount);S.analyser.getByteFrequencyData(data);
      document.querySelectorAll('.wave-bar').forEach(function(b,i){b.style.height=Math.max(8,(data[i%data.length]/255)*90)+'%';b.style.animation='none';});
    })();
  }catch(e){}
}

function stopWave(){
  cancelAnimationFrame(S.waveRaf);S.waveRaf=null;
  try{if(S.audioSrc)S.audioSrc.disconnect();}catch(e){}S.analyser=null;
  document.querySelectorAll('.wave-bar').forEach(function(b){b.style.height='';b.style.animation='';});
}

/* ── Web Speech API ─────────────────────────────────────── */
function hasSpeech(){return !!(window.SpeechRecognition||window.webkitSpeechRecognition);}

function startListen(onResult,onFail){
  var Rec=window.SpeechRecognition||window.webkitSpeechRecognition;
  var rec=new Rec();rec.lang=getRecLang();rec.interimResults=true;rec.maxAlternatives=1;
  S.recog=rec;var done=false;
  var to=setTimeout(function(){if(!done){done=true;try{rec.stop();}catch(e){}onFail('timeout');}},S.micTimeout*1000);
  startCd(S.micTimeout);
  if(navigator.mediaDevices)navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){S.micStream=stream;connectWave(stream);}).catch(function(){});
  rec.onresult=function(e){
    var transcript='';
    for(var i=0;i<e.results.length;i++)transcript+=e.results[i][0].transcript+' ';
    transcript=transcript.trim();
    if(!e.results[e.results.length-1].isFinal){
      /* Resultado intermedio: resaltar en tiempo real */
      S.spokenDetected=true;
      var line=S.session[S.idx];if(line)renderInterim(line,transcript);
      return;
    }
    if(done)return;done=true;S.spokenDetected=true;clearTimeout(to);stopCd();onResult(transcript);
  };
  rec.onerror=function(e){if(done)return;done=true;clearTimeout(to);stopCd();onFail(e.error);};
  rec.onend=function(){if(S.micStream){S.micStream.getTracks().forEach(function(t){t.stop();});S.micStream=null;}stopWave();};
  S.listenStartTime = Date.now();
  rec.start();
}

function stopListen(){
  if(S.recog){try{S.recog.abort();}catch(e){}S.recog=null;}
  if(S.micStream){S.micStream.getTracks().forEach(function(t){t.stop();});S.micStream=null;}
  stopWave();stopCd();
}

/* ── Countdown ──────────────────────────────────────────── */
function startCd(n){var el=$('countdown');if(!el)return;var r=n;el.textContent='0:'+(r<10?'0':'')+r;S.cdIv=setInterval(function(){r--;if(r<=0){clearInterval(S.cdIv);el.textContent='0:00';}else el.textContent='0:'+(r<10?'0':'')+r;},1000);}
function stopCd(){clearInterval(S.cdIv);var el=$('countdown');if(el)el.textContent='0:00';}

/* ── Comparación ────────────────────────────────────────── */
function norm(t){return t.toLowerCase().replace(/[^a-z0-9\s]/g,'').trim().split(/\s+/).filter(Boolean);}

/* ── Expansor de contracciones (iguala original vs SR) ──────── */
function expandContr(t){
  return t
    .replace(/\bdon't\b/gi,'do not').replace(/\bdoesn't\b/gi,'does not')
    .replace(/\bdidn't\b/gi,'did not').replace(/\bcan't\b|\bcannot\b/gi,'can not')
    .replace(/\bwon't\b/gi,'will not').replace(/\bwouldn't\b/gi,'would not')
    .replace(/\bshouldn't\b/gi,'should not').replace(/\bcouldn't\b/gi,'could not')
    .replace(/\bisn't\b/gi,'is not').replace(/\baren't\b/gi,'are not')
    .replace(/\bwasn't\b/gi,'was not').replace(/\bweren't\b/gi,'were not')
    .replace(/\bhaven't\b/gi,'have not').replace(/\bhasn't\b/gi,'has not')
    .replace(/\bhadn't\b/gi,'had not').replace(/\bi'm\b/gi,'i am')
    .replace(/\byou're\b/gi,'you are').replace(/\bhe's\b/gi,'he is')
    .replace(/\bshe's\b/gi,'she is').replace(/\bit's\b/gi,'it is')
    .replace(/\bwe're\b/gi,'we are').replace(/\bthey're\b/gi,'they are')
    .replace(/\bi've\b/gi,'i have').replace(/\byou've\b/gi,'you have')
    .replace(/\bwe've\b/gi,'we have').replace(/\bthey've\b/gi,'they have')
    .replace(/\bi'll\b/gi,'i will').replace(/\byou'll\b/gi,'you will')
    .replace(/\bhe'll\b/gi,'he will').replace(/\bshe'll\b/gi,'she will')
    .replace(/\bwe'll\b/gi,'we will').replace(/\bthey'll\b/gi,'they will')
    .replace(/\bthat's\b/gi,'that is').replace(/\bwhat's\b/gi,'what is')
    .replace(/\bwho's\b/gi,'who is').replace(/\bthere's\b/gi,'there is')
    .replace(/\bgonna\b/gi,'going to').replace(/\bwanna\b/gi,'want to')
    .replace(/\bgotta\b/gi,'got to').replace(/\blemme\b/gi,'let me')
    .replace(/\bgimme\b/gi,'give me').replace(/\bkinda\b/gi,'kind of')
    .replace(/\bcoulda\b/gi,'could have').replace(/\bwoulda\b/gi,'would have');
}
function normCmp(t){return expandContr(t).toLowerCase().replace(/[^a-z0-9\s]/g,'').trim().split(/\s+/).filter(Boolean);}

/* ── LCS (Longest Common Subsequence) — comparación flexible ── */
function lcsMatch(a,b){
  var m=a.length,n=b.length,dp=[],i,j;
  for(i=0;i<=m;i++){dp[i]=[];for(j=0;j<=n;j++)dp[i][j]=0;}
  for(i=1;i<=m;i++)for(j=1;j<=n;j++)
    dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
  var set={};i=m;j=n;
  while(i>0&&j>0){
    if(a[i-1]===b[j-1]){set[i-1]=true;i--;j--;}
    else if(dp[i-1][j]>dp[i][j-1])i--;else j--;
  }
  return set;
}

function compare(original,spoken){
  /* Palabras originales para display (sin expandir) */
  var owD=norm(original);
  /* Formas expandidas para score preciso (maneja contracciones) */
  var owC=normCmp(original),swC=normCmp(spoken);
  /* Score con LCS sobre formas expandidas */
  var matchedC=lcsMatch(owC,swC);
  var ok=Object.keys(matchedC).length;
  var score=owC.length?Math.round(ok/owC.length*100):0;
  /* Status visual con LCS sobre palabras originales */
  var matchedD=lcsMatch(owD,swC);
  var swSet={};swC.forEach(function(w){swSet[w]=true;});
  var words=owD.map(function(w,i){
    if(matchedD[i])return{word:w,status:'ok'};
    return{word:w,status:swSet[w]?'bad':'miss'};
  });
  var spokenCount=swC.length;
  var fluency=owC.length?Math.round(Math.min(spokenCount,owC.length)/owC.length*100):0;
  return{words:words,score:score,ok:ok,total:owC.length,fluency:fluency,spokenCount:spokenCount};
}

/* ── UI ─────────────────────────────────────────────────── */
function renderLine(line,result){
  var el=$('lineText');if(!el)return;
  var ws=result?result.words:norm(line.text).map(function(w){return{word:w,status:''};});
  el.innerHTML=ws.map(function(w){return'<span class="word '+w.status+'">'+w.word+'</span>';}).join(' ');
}

function updateRing(score,ok,total,flu,rhy){
  var ring=$('scoreRing');if(ring)ring.style.strokeDashoffset=Math.round(264*(1-score/100));
  var num=$('scoreNum');if(num)num.innerHTML=score+'<sup>%</sup>';
  var _ts=window.auraT||function(k){return k;};var okEl=$('okWords');if(okEl)okEl.textContent=ok;var badEl=$('badWords');if(badEl)badEl.textContent=total-ok;
  flu=flu!=null?flu:score;
  rhy=rhy!=null?rhy:score;
  setBrk('.brk.acc',score);setBrk('.brk.flu',flu);setBrk('.brk.rhy',rhy);
}
function setBrk(sel,pct){var f=document.querySelector(sel+' .brk-fill');if(f)f.style.width=pct+'%';var b=document.querySelector(sel+' .brk-row b');if(b)b.textContent=pct+'%';}

function updateHeader(){
  var n=S.idx+1,tot=S.session.length;
  var avg=S.scores.length?Math.round(S.scores.reduce(function(a,b){return a+b;},0)/S.scores.length):0;
  var _t=window.auraT||function(k){return k;};var p=document.querySelector('.head-l p');if(p)p.innerHTML=_t('shadow_session')+' <b>01</b> · '+_t('shadow_line')+' <b>'+n+'</b> / <b>'+tot+'</b> · '+_t('shadow_avg')+' <b>'+avg+'%</b>';
  var tc=$('tbLineCount');if(tc)tc.textContent=n;
  var bar=document.querySelector('.session-bar-f');if(bar)bar.style.width=((S.idx/tot)*100)+'%';
  var rs=document.querySelector('.session-bar-row span:last-child');if(rs)rs.innerHTML='<b>'+S.idx+'</b> / '+tot+' '+_t('shadow_lines');
  var line=S.session[S.idx];var dur=line?Math.round(line.end-line.start):0;
  var pl=document.querySelector('.phase-line');if(pl)pl.innerHTML=_t('shadow_line')+' <b>'+n+'</b> / '+tot+' · ~'+dur+'s';
}

function updateRecent(){
  var list=$('recentList');if(!list)return;list.innerHTML='';
  S.session.forEach(function(line,i){
    var div=document.createElement('div');var sc=S.scores[i];var isCur=i===S.idx;
    div.className='rline'+(isCur?' now':'');
    var cls='pending',txt='—';
    if(i<S.idx&&sc!==undefined){cls=sc>=80?'ok':sc>=50?'warn':'bad';txt=sc+'%';}
    div.innerHTML='<span class="rline-num">'+String(i+1).padStart(2,'0')+'</span>'+'<span class="rline-text">"'+line.text.substring(0,38)+(line.text.length>38?'…':'')+'"</span>'+'<span class="rline-score '+cls+'">'+txt+'</span>';
    list.appendChild(div);
  });
}

function updateMissed(words){
  words.forEach(function(w){if(w.status!=='ok')S.missed[w.word]=(S.missed[w.word]||0)+1;});
  var list=$('missList');if(!list)return;
  var sorted=Object.keys(S.missed).sort(function(a,b){return S.missed[b]-S.missed[a];}).slice(0,8);
  list.innerHTML=sorted.length?sorted.map(function(w){return'<span class="miss-chip">'+w+' <b>×'+S.missed[w]+'</b></span>';}).join(''):'<span class="miss-chip" style="color:var(--good)">'+(_t||window.auraT||function(k){return k;})('shadow_none_yet')+'</span>';
}

function setPhase(txt,listen){var el=$('phaseTag');if(!el)return;el.textContent=txt;if(listen)el.classList.add('listening');else el.classList.remove('listening');}
var MIC_SVG='<svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1=12 y1=19 x2=12 y2=23/><line x1=8 y1=23 x2=16 y2=23/></svg>';
var STOP_SVG='<svg viewBox="0 0 24 24"><rect x=4 y=4 width=16 height=16 rx=3 fill="currentColor"/></svg>';
var RETRY_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>';

function setMicUI(mode){
  var btn=$('micButton'),wave=$('waveform'),alert=$('micAlert');
  if(mode==='playing'){
    if(alert)alert.style.display='none';
    if(btn){btn.disabled=true;btn.style.opacity='0.25';btn.style.cursor='not-allowed';
      btn.innerHTML=MIC_SVG;btn.style.color='';}
    if(wave)wave.style.display='flex';
  } else if(mode==='listening'){
    /* Activo escuchando → mostrar icono STOP */
    if(alert)alert.style.display='flex';
    if(btn){btn.disabled=false;btn.style.opacity='1';btn.style.cursor='pointer';
      btn.innerHTML=STOP_SVG;btn.style.color='#ff5a5a';}
    if(wave)wave.style.display='flex';
  } else if(mode==='retry'){
    if(alert)alert.style.display='none';
    /* Sin voz detectada → mostrar REINTENTAR */
    if(btn){btn.disabled=false;btn.style.opacity='1';btn.style.cursor='pointer';
      btn.innerHTML=RETRY_SVG;btn.style.color='var(--accent)';}
    if(wave)wave.style.display='none';
  } else if(mode==='result'){
    if(alert)alert.style.display='none';
    /* Ya se corrigió → solo siguiente línea, mic bloqueado */
    if(btn){btn.disabled=true;btn.style.opacity='0.25';btn.style.cursor='not-allowed';
      btn.innerHTML=MIC_SVG;btn.style.color='';}
    if(wave)wave.style.display='none';
  } else {
    if(btn){btn.disabled=true;btn.style.opacity='0.4';btn.style.cursor='not-allowed';
      btn.innerHTML=MIC_SVG;btn.style.color='';}
    if(wave)wave.style.display='none';
  }
}
function showXP(v){var el=$('xpBubble');if(el){el.textContent='+'+v+' AURA';el.style.display='block';}}
function hideXP(){var el=$('xpBubble');if(el)el.style.display='none';}

function toast(msg,color){
  var d=document.getElementById('slToast');
  if(!d){d=document.createElement('div');d.id='slToast';d.style.cssText='position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:var(--card-2);border-radius:12px;font-family:var(--mono);font-size:12px;padding:12px 22px;z-index:99999;white-space:nowrap;border:1px solid var(--line-2);transition:opacity .3s;';document.body.appendChild(d);}
  d.style.color=color||'var(--ink)';d.textContent=msg;d.style.opacity='1';
  clearTimeout(d._to);d._to=setTimeout(function(){d.style.opacity='0';},5000);
}

/* ── Flujo de juego ─────────────────────────────────────── */
async function startSession(){
  S.idx=0;S.scores=[];S.missed={};S.sessionPoints=0;
  var sp=$('statPoints');if(sp)sp.textContent='0';
  var pool=nextBatch(S.movie.decks,S.diff,15);
  S.session=pool;updateHeader();updateRecent();
  await playLine();
}

/* ── Karaoke de video: resalta palabras mientras habla el personaje ─ */
function startKaraoke(player,line){
  stopKaraoke();
  var el=$('lineText'); if(!el)return;
  var words=norm(line.text); var wc=words.length; if(!wc)return;
  /* Duración estimada del habla = desde lineStart hasta naturalEnd (sin post-roll) */
  var lineDur=Math.max(1,(line.end-2.0)-line.lineStart);
  var secPerWord=lineDur/wc;
  S.karaokeIv=setInterval(function(){
    try{
      var ct=player.getCurrentTime();
      if(ct<line.lineStart)return; /* esperar pre-roll */
      var elapsed=ct-line.lineStart;
      var idx=Math.min(wc-1,Math.floor(elapsed/secPerWord));
      var spans=el.querySelectorAll('.word');
      spans.forEach(function(sp,i){
        sp.className='word'+(i<idx?' done':i===idx?' now':'');
      });
    }catch(e){}
  },80);
}
function stopKaraoke(){
  if(S.karaokeIv){clearInterval(S.karaokeIv);S.karaokeIv=null;}
}
/* ── Resaltado en tiempo real mientras el usuario habla ──── */
function renderInterim(line,partial){
  var el=$('lineText'); if(!el)return;
  var orig=norm(line.text); var spoken=norm(partial);
  var spans=el.querySelectorAll('.word');
  spans.forEach(function(sp,i){
    if(i<spoken.length) sp.className='word '+(spoken[i]===orig[i]?'ok':'bad');
    else sp.className='word';
  });
}

async function playLine(){
  if(S.idx>=S.session.length){await endSession();return;}
  var line=S.session[S.idx];S.phase='playing';
  setPhase('▶ reproduciendo...');setMicUI('playing');hideXP();
  var cn=$('characterName');if(cn)cn.textContent=S.movie&&S.movie.title?S.movie.title:'—';
  var cc=$('characterContext');if(cc)cc.textContent=(S.movie&&S.movie.studio?S.movie.studio:'—')+' · '+line.difficulty;
  var lt=$('lineTranslate');
  if(lt){
    lt.style.opacity='0';
    if(line.translation){
      lt.textContent=line.translation;
      lt.style.opacity='0.7';
    } else {
      lt.textContent='';
      /* Intentar traducción automática en background */
      fetchTranslation(line.text).then(function(tr){
        if(tr){line.translation=tr;lt.textContent=tr;lt.style.opacity='0.7';}
      });
    }
  }
  updateHeader();
  if(!line.videoId){toast('Video no disponible.','var(--bad)');handleResult(line,'');return;}
  if(!S.player){
    setPhase('⏳ cargando video...');
    try{await loadYTAPI();S.player=await buildPlayer(line.videoId);}
    catch(e){toast('Error al cargar YouTube. Verifica tu conexión.','var(--bad)');handleResult(line,'');return;}
  }
  setPhase('▶ reproduciendo...');
  playSegment(S.player,line,function(){onEnd(line);});
}

function onEnd(line){
  stopKaraoke();
  S.phase='listening';S.spokenDetected=false;
  /* Resetear palabras a blanco: esperando que el usuario hable */
  var el=$('lineText');
  if(el){el.querySelectorAll('.word').forEach(function(sp){sp.className='word';});}
  setPhase('🎤 tu turno · repite', true);setMicUI('listening');
  if(!hasSpeech()){toast('Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.','var(--bad)');handleResult(line,'');return;}
  startListen(function(t){handleResult(line,t);},function(){handleResult(line,'');});
}

function handleResult(line,transcript){
  S.phase='result';stopListen();setMicUI('result');
  var res=compare(line.text,transcript);

  /* Ritmo real: compara duración del usuario vs duración esperada de la línea */
  var userDur=(S.listenStartTime?(Date.now()-S.listenStartTime)/1000:0);
  var expectedDur=Math.max(1,(line.end-1.5)-line.lineStart);
  var rhythm=0;
  if(userDur>0.3){
    var ratio=userDur/expectedDur;
    /* ratio≈1 → perfecto; <0.5 muy rápido; >2 muy lento */
    rhythm=Math.max(0,Math.round(100-Math.abs(1-ratio)*90));
  }

  S.scores.push(res.score);
  renderLine(line,res);updateRing(res.score,res.ok,res.total,res.fluency,rhythm);updateMissed(res.words);updateRecent();
  /* Puntos: 10 por cada palabra correcta */
  var earned=res.ok*10;
  S.sessionPoints=(S.sessionPoints||0)+earned;
  var sp=$('statPoints');if(sp)sp.textContent=S.sessionPoints;
  /* Récord: actualizar si se supera */
  if(S.sessionPoints>S.sessionRecord){
    S.sessionRecord=S.sessionPoints;
    localStorage.setItem('sl_record',S.sessionRecord);
    var sr=$('statRecord');if(sr)sr.textContent=S.sessionRecord;
  }
  /* XP en tiempo real: cada 10 puntos de partida = 1 XP para la barra */
  var xpNow=Math.max(0,Math.floor(earned/10));
  if(xpNow>0){
    try{
      window.AuraXP.addXP(xpNow).then(function(){updateXPBar();}).catch(function(){});
    }catch(e){}
  }
  showXP(earned>0?'+'+earned+' pts':0);
  if(res.score>=80)setPhase('✓ excelente · '+res.score+'%');
  else if(res.score>=50)setPhase('~ bien · '+res.score+'%');
  else setPhase('✗ sigue practicando · '+res.score+'%');
}

function advance(){
  if(S.scores.length<=S.idx)S.scores.push(0);
  S.idx++;hideXP();
  var ring=$('scoreRing');if(ring)ring.style.strokeDashoffset=264;
  var num=$('scoreNum');if(num)num.innerHTML='—<sup>%</sup>';
  setBrk('.brk.acc',0);setBrk('.brk.flu',0);setBrk('.brk.rhy',0);
  playLine();
}

async function endSession(){
  S.phase='ended';clearInterval(S.endIv);
  var avg=S.scores.length?Math.round(S.scores.reduce(function(a,b){return a+b;},0)/S.scores.length):0;
  /* AuraPoints: 50 AP si sesión perfecta, proporcional si no.
     Fórmula: ap = round(avg / 100 * 50) */
  var ap=Math.round(avg/100*50);
  /* ── Puntos de Mérito — fórmula global (merit-config.json) ──────
     pm = round(floor(accuracy/20) × diff_multiplier)
     Multiplicadores: easy=0.7 · medium=1.0 · hard=1.5 · legendary=2.0
     Threshold mínimo: accuracy >= 30% para ganar PM              */
  var _diffMult={easy:0.7,medium:1.0,hard:1.5,legendary:2.0};
  var pm = avg >= 30 ? Math.round(Math.floor(avg/20) * (_diffMult[S.diff] || 1.0)) : 0;
  try{
    /* XP ya fue añadido línea a línea — aquí solo registramos AP, PM y sesión */
    if(ap>0) await window.AuraXP.addAP(ap);
    if(pm>0) await window.AuraXP.addPM(pm);
    await window.AuraXP.logSession({tool:'shadowlab',skill:'Speaking',xp:0,ap:ap,pm:pm,accuracy:avg,thumbnail:'assets/home/tool-movies.jpg'});
    updateXPBar();
  }
  catch(e){console.warn('[ShadowLab] logSession',e);}
  /* sesión contada en Supabase via logSession → lecciones_completadas */
  var c=document.querySelector('.scene-content');if(!c)return;
  c.innerHTML='<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1;gap:22px;text-align:center;padding:32px;">'
    +'<div style="font-size:3.5rem">🎤</div>'
    +'<h2 style="font-size:2rem;font-weight:800;color:var(--accent);margin:0">Sesión completada</h2>'
    +'<p style="font-family:var(--mono);color:var(--muted);font-size:11px;text-transform:uppercase;letter-spacing:.16em;margin:0">'+S.session.length+' líneas · acierto promedio</p>'
    +'<div style="font-size:5rem;font-weight:900;color:var(--accent);line-height:1;letter-spacing:-.04em">'+avg+'<sup style="font-size:2rem">%</sup></div>'
    +'<div style="display:flex;gap:14px;">'
    +'<div style="background:rgba(196,255,61,.1);border:1px solid rgba(196,255,61,.3);border-radius:14px;padding:16px 26px;"><div style="font-family:var(--mono);color:var(--accent);font-size:2rem;font-weight:900;line-height:1">+'+S.sessionPoints+'</div><div style="font-family:var(--mono);color:var(--muted);font-size:10px;text-transform:uppercase;letter-spacing:.12em;margin-top:4px">puntos</div></div>'
    +'<div style="background:rgba(168,85,247,.1);border:1px solid rgba(168,85,247,.3);border-radius:14px;padding:16px 26px;"><div style="font-family:var(--mono);color:#c084fc;font-size:2rem;font-weight:900;line-height:1">+'+ap+'</div><div style="font-family:var(--mono);color:var(--muted);font-size:10px;text-transform:uppercase;letter-spacing:.12em;margin-top:4px">Aura Points</div></div>'
    +'</div>'
    +(ap===50?'<p style="font-family:var(--mono);font-size:11px;color:#c084fc;letter-spacing:.12em">⭐ SESIÓN PERFECTA — +50 AP</p>':'')
    +'<button onclick="location.reload()" style="background:var(--accent);color:var(--accent-ink);padding:14px 30px;border-radius:12px;font-family:var(--mono);font-size:13px;font-weight:800;letter-spacing:.1em;border:none;cursor:pointer;margin-top:6px;">↺ NUEVA SESIÓN</button>'
    +'</div>';
}

/* ── Botones ────────────────────────────────────────────── */
function initButtons(){
  var mic=$('micButton');
  if(mic)mic.onclick=function(){
    if(S.phase==='listening'){
      /* Detener mic — sin voz detectada → modo reintentar */
      stopListen();
      if(!S.spokenDetected){
        S.phase='retry';
        setPhase('↺ presiona para reintentar');
        setMicUI('retry');
      } else {
        handleResult(S.session[S.idx],'');
      }
    } else if(S.phase==='retry'){
      /* Reintentar escucha */
      var line=S.session[S.idx];
      S.phase='listening';S.spokenDetected=false;
      setPhase('🎤 tu turno · repite', true);setMicUI('listening');
      startListen(function(t){handleResult(line,t);},function(){handleResult(line,'');});
    }
  };
  document.addEventListener('keydown',function(e){
    if(e.code==='Space'&&e.target.tagName!=='INPUT'){e.preventDefault();
      if(S.phase==='listening'){stopListen();handleResult(S.session[S.idx],'');}
      else if(S.phase==='result'){advance();}}
  });
  var replay=$('btnReplay');
  if(replay)replay.onclick=function(){
    if(S.phase==='result'||S.phase==='playing'||S.phase==='listening'||S.phase==='retry'){
      stopListen();
      var line=S.session[S.idx];if(!line||!S.player)return;
      S.phase='playing';setPhase('▶ reproduciendo...');setMicUI('playing');
      playSegment(S.player,line,function(){onEnd(line);});
    }
  };
  var nxt=$('btnNextLine');
  if(nxt)nxt.onclick=function(){
    if(S.phase==='result'){advance();}
    else if(S.phase==='listening'){stopListen();handleResult(S.session[S.idx],'');}
  };
  var end=$('btnEndSession');
  if(end)end.onclick=function(){stopListen();clearInterval(S.endIv);endSession();};
  var stg=$('btnSettings');
  if(stg)stg.onclick=function(){openSettings();};
}

/* ── Difficulty pills ───────────────────────────────────── */
function initDiff(){
  var map={diffEasy:'easy',diffMed:'medium',diffHard:'hard',diffLegend:'legendary'};
  Object.keys(map).forEach(function(id){
    var b=$(id);if(!b)return;
    b.onclick=function(){
      if(!S.movie) return;
      /* Limpiar estado del juego actual antes de cambiar dificultad */
      stopListen();
      stopKaraoke();
      clearInterval(S.endIv);
      if(S.player){try{S.player.pauseVideo();}catch(e){}}
      /* Activar pill seleccionado */
      document.querySelectorAll('.diff-pill').forEach(function(p){p.classList.remove('active');});
      b.classList.add('active');
      /* Aplicar dificultad y reiniciar sesión */
      S.diff = map[id];
      startSession();
    };
  });
  var chg=$('btnChangeMovie');if(chg)chg.onclick=function(){openMovieModal();};
}

/* ── Perfil ─────────────────────────────────────────────── */
function loadProfile(){
  var p=window._aura&&window._aura.profile;if(!p)return;
  var name=p.nombre||p.nombre_completo||p.email||'U';
  var inits=name.split(' ').map(function(n){return n[0]||'';}).join('').toUpperCase().slice(0,2);
  var av=document.querySelector('.tb-avatar');if(av){if(p.foto_url){av.innerHTML='<img src="'+p.foto_url+'" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">';}else{av.textContent=inits;}}
  var nb=document.querySelector('.tb-name b');if(nb)nb.textContent=name;
  var cu=document.querySelector('.crumb-user');if(cu)cu.textContent=name.split(' ')[0].toLowerCase();
  var st=window.AuraXP?AuraXP.getState():null;var nivel=st?st.level:(p.nivel||1);var rank=st?st.rank:(p.rango||'Bronce');var ns=document.querySelector('.tb-name span');if(ns)ns.textContent='Lv '+nivel+' · '+rank;
  /* Récord desde localStorage */
  var rec=parseInt(localStorage.getItem('sl_record')||'0',10);
  S.sessionRecord=rec;
  var el=$('statRecord');if(el)el.textContent=rec;
  /* Renderizar XP bar con datos de AuraXP */
  updateXPBar();
}

function updateXPBar(){
  try{
    var calc=window.AuraXP&&window.AuraXP.calcLevel&&window.AuraXP.calcLevel(
      (window._aura&&window._aura.profile&&window._aura.profile.xp)||0
    );
    if(!calc)return;
    var lv=$('xpLevel');if(lv)lv.textContent=calc.level;
    var cf=$('xpCefr');if(cf)cf.textContent=calc.cefr;
    var pts=$('xpPts');if(pts)pts.textContent=calc.xpIntoLevel.toLocaleString()+' / '+calc.xpForNext.toLocaleString()+' XP';
    var fill=$('xpFill');if(fill)fill.style.width=calc.percent+'%';
  }catch(e){}
}

/* ── Traducción automática (OpenAI) ─────────────────────────── */
async function fetchTranslation(text){
  var cacheKey='sl_tr_'+btoa(unescape(encodeURIComponent(text))).slice(0,24);
  var cached=localStorage.getItem(cacheKey);
  if(cached)return cached;
  var key=localStorage.getItem('_aura_oai_key');
  if(!key)return null;
  try{
    var resp=await fetch('https://api.openai.com/v1/chat/completions',{
      method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},
      body:JSON.stringify({model:'gpt-4o-mini',max_tokens:80,temperature:0,
        messages:[{role:'user',content:'Traduce al español natural y conciso, solo devuelve la traducción sin comillas: '+text}]})
    });
    var data=await resp.json();
    var tr=(data.choices&&data.choices[0]&&data.choices[0].message.content)||null;
    if(tr){localStorage.setItem(cacheKey,tr);return tr;}
  }catch(e){}
  return null;
}

/* ── Movie Selector ─────────────────────────────────────────── */
function openMovieModal(){
  var m=$('movieModal');if(!m)return;
  /* Render movie cards */
  var grid=$('movieGrid');if(!grid)return;
  grid.innerHTML='';
  MOVIE_SCENES.forEach(function(mov,i){
    var card=document.createElement('div');
    var isActive=i===S.currentMovieIdx;
    card.style.cssText='background:rgba(255,255,255,.04);border:1px solid '+(isActive?'rgba(196,255,61,.4)':'var(--line)')+';border-radius:14px;padding:12px 14px;cursor:pointer;transition:.15s;display:flex;flex-direction:row;gap:12px;align-items:center;';
    var posterHtml = mov.poster
      ? '<img src="'+mov.poster+'" style="width:44px;height:62px;object-fit:cover;border-radius:8px;flex-shrink:0;">'
      : '<div style="width:44px;height:62px;background:var(--card-2);border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:18px;">🎬</div>';
    card.innerHTML=posterHtml
      +'<div style="display:flex;flex-direction:column;gap:4px;flex:1;min-width:0;">'
      +'<b style="font-size:13px;font-weight:700;color:'+(isActive?'var(--accent)':'var(--ink)')+'">'+mov.title+'</b>'
      +'<span style="font-family:var(--mono);font-size:9px;color:var(--muted);text-transform:uppercase;letter-spacing:.1em">'+mov.studio+'</span>'
      +(isActive?'<span style="font-family:var(--mono);font-size:9px;color:var(--accent);font-weight:700">▶ activa</span>':'')
      +'</div>';
    card.onmouseenter=function(){if(!isActive)card.style.background='rgba(255,255,255,.07)';};
    card.onmouseleave=function(){if(!isActive)card.style.background='rgba(255,255,255,.04)';};
    card.onclick=function(){selectMovie(i);};
    grid.appendChild(card);
  });
  m.style.display='flex';
}
function closeMovieModal(){var m=$('movieModal');if(m)m.style.display='none';}
async function selectMovie(idx){
  if(idx===S.currentMovieIdx){closeMovieModal();return;}
  closeMovieModal();
  S.currentMovieIdx=idx;
  if(S.player){try{S.player.stopVideo();}catch(e){}S.player=null;}
  stopListen();clearInterval(S.endIv);
  toast('Cargando película…','var(--ink)');
  try{
    var movieObj=MOVIE_SCENES[idx]; /* ya cargado con _scenes en memoria */
    var lines=await loadMovie(movieObj);
    if(!lines.length){toast('Sin líneas disponibles.','var(--bad)');return;}
    S.movie={title:movieObj.title,studio:movieObj.studio,lines:lines,decks:buildDecks(lines)};
    var si=document.querySelector('.sel-info b');if(si)si.textContent=S.movie.title;
    var sm=document.querySelector('.sel-info span');if(sm)sm.innerHTML=(movieObj.studio||'—')+' · <b style="color:var(--accent)">'+lines.length+'</b> líneas';
    var _sv = '';
    try{
      var _stj = movieObj._scenes[0].transcript_json;
      var _std = typeof _stj==='string'?JSON.parse(_stj):_stj;
      _sv = (_std && _std.videoId) || '';
    }catch(_e){}
    window.loadAndInitKaraoke(_sv);
  }catch(e){toast('Error al cargar la película.','var(--bad)');}}

/* ── Audio Settings ──────────────────────────────────────────── */
function openSettings(){
  var m=document.getElementById('settingsModal');if(!m)return;
  m.style.display='flex';
  var tEl=document.getElementById('settingTimeout');if(tEl)tEl.value=S.micTimeout;
  var tLbl=document.getElementById('settingTimeoutLbl');if(tLbl)tLbl.textContent=S.micTimeout+'s';
  var gEl=document.getElementById('settingGain');if(gEl)gEl.value=Math.round(S.micGain*100);
  var gLbl=document.getElementById('settingGainLbl');if(gLbl)gLbl.textContent=Math.round(S.micGain*100)+'%';
  var lEl=document.getElementById('settingLang');if(lEl)lEl.value=getRecLang();
}
function closeSettings(){
  var m=document.getElementById('settingsModal');if(m)m.style.display='none';
}
function saveSettings(){
  var tEl=document.getElementById('settingTimeout');if(tEl)S.micTimeout=parseInt(tEl.value)||8;
  var gEl=document.getElementById('settingGain');if(gEl)S.micGain=parseInt(gEl.value)/100||1.0;
  closeSettings();
  toast('Ajustes guardados','var(--good)');
}

async function init(){
  initNav();initButtons();initDiff();
  function waitAura(cb){if(window._aura&&window._aura.userId)return cb();setTimeout(function(){waitAura(cb);},150);}
  waitAura(async function(){
    try{
      await window.AuraXP.init();
      /* Exponer calcLevel para la barra XP del topbar */
      if(!window.AuraXP.calcLevel)window.AuraXP.calcLevel=function(xp){
        var lvXp=[0],x=0,lv=1;
        var costs=[0,1200,1200,1200,2000,2000,3000,5000,8000,12000];
        while(lv<100){var c=lv<=20?1200:lv<=40?2000:lv<=55?3000:lv<=70?5000:lv<=85?8000:12000;if(x+c>xp)break;x+=c;lv++;}
        var next=lv<=20?1200:lv<=40?2000:lv<=55?3000:lv<=70?5000:lv<=85?8000:12000;
        var rem=xp-x;
        return{level:lv,xpIntoLevel:rem,xpForNext:next,percent:Math.round(rem/next*100),
          cefr:lv<=20?'A1':lv<=40?'A2':lv<=55?'B1':lv<=70?'B2':lv<=85?'C1':'C2'};
      };
      loadProfile();
    }catch(e){}
  });
  try{
    setPhase('⏳ cargando películas...');
    var movies = await loadMovieIndex();
    if(!movies.length){toast('No hay películas para este idioma.','var(--bad)');setPhase('sin películas');return;}
    MOVIE_SCENES.length = 0;
    movies.forEach(function(m){ MOVIE_SCENES.push(m); });
    S.currentMovieIdx = 0;
    var currentMovieObj = MOVIE_SCENES[0];
    var lines = await loadMovie(currentMovieObj);
    if(!lines.length){toast('Sin líneas disponibles.','var(--bad)');setPhase('error');return;}
    S.movie={title:currentMovieObj.title,studio:currentMovieObj.studio,lines:lines,decks:buildDecks(lines)};
    var si=document.querySelector('.sel-info b');if(si)si.textContent=S.movie.title||'—';
    var sm=document.querySelector('.sel-info span');if(sm)sm.innerHTML=(currentMovieObj.studio||'—')+' · <b style="color:var(--accent)">'+lines.length+'</b> líneas';
    /* Extraer el primer videoId para que el popup muestre el thumbnail correcto */
    var _firstVid = '';
    try{
      var _tj = currentMovieObj._scenes[0].transcript_json;
      var _td = typeof _tj==='string' ? JSON.parse(_tj) : _tj;
      _firstVid = (_td && _td.videoId) || '';
    }catch(_e){}
    window.loadAndInitKaraoke(_firstVid);
  }catch(e){console.error('[ShadowLab]',e);toast('Error al inicializar.','var(--bad)');setPhase('error');}
}

document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();

/* Exponer funciones de modales al scope global para los onclick inline del HTML */
window.closeSettings  = closeSettings;
window.saveSettings   = saveSettings;
window.openSettings   = openSettings;
window.closeMovieModal = closeMovieModal;
window.openMovieModal  = openMovieModal;
window.selectMovie     = selectMovie;
})();
</script>

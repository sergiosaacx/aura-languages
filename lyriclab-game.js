// ── LYRICLAB GAME — karaoke engine, challenges, scoring, YouTube player ─────
// Globals: player, karaoState, currentSong, totalScore, xp, SONGS, _POOL, SKIP_WORDS


// ── DIFFICULTY / BLANKS ──────────────────────────────────────────────────────
const SKIP_WORDS = new Set(['OH','OOH','OOO','WOO','AH','UH','HA','THE','A','AN','AND','OF','TO','IN','IT','IS','I','MY','ME','YOU','HE','SHE','WE','OR','BUT','SO','AT','BY','BE']);

function isChallengeLine(text){
  if(!text||!text.trim()) return false;
  const words = text.trim().split(/\s+/);
  const real = words.filter(w=>!SKIP_WORDS.has(w.replace(/[^A-Z]/g,'')));
  return real.length >= 3;
}

function pickBlanks(text, difficulty){
  const words = text.trim().split(/\s+/);
  // candidates: words not in skip set and long enough
  const candidates = [];
  words.forEach((w,i)=>{
    const clean = w.replace(/[^A-Z]/g,'');
    if(clean.length>=3 && !SKIP_WORDS.has(clean)) candidates.push(i);
  });
  if(!candidates.length) return [];
  let count;
  if(difficulty==='principiante') count=1;
  else if(difficulty==='intermedio') count=Math.min(3,Math.max(2,Math.floor(candidates.length*0.4)));
  else count=Math.min(4,Math.max(3,Math.floor(candidates.length*0.6)));
  count=Math.min(count,candidates.length);
  // Pick evenly spaced candidates
  const step=Math.max(1,Math.floor(candidates.length/count));
  const picked=[];
  for(let i=0;i<count;i++) picked.push(candidates[Math.min(i*step,candidates.length-1)]);
  return [...new Set(picked)];
}

function optionCount(blankCount){
  if(blankCount<=1) return 4;
  if(blankCount===2) return 6;
  return Math.min(9,blankCount*2+3);
}

// ── BUILD SONG LIST ──────────────────────────────────────────────────────────
function buildList(){
  const el=document.getElementById('videoList');
  el.innerHTML='';
  const userLvl=(window._aura&&window._aura.profile)?window._aura.profile.nivel||1:1;
  SONGS.forEach((s,i)=>{
    const thumb='https://img.youtube.com/vi/'+s.id+'/mqdefault.jpg';
    const locked=s.levelRequired>userLvl;
    const div=document.createElement('div');
    div.className='song-item'+(i===currentSong?' active':'')+(locked?' locked':'');
    const diffPill='<span class="diff-pill '+s.difficulty+'">'+s.difficulty+'</span>';
    const lockIcon=locked?'<span class="song-lock-icon">🔒</span>':'';
    div.innerHTML=`
      <div class="song-thumb"><img src="${thumb}" alt="${s.title}" loading="lazy" onerror="this.style.background='rgba(196,255,61,.1)'"></div>
      <div class="song-info">
        <div class="song-title">${s.title}${lockIcon}</div>
        <div class="song-artist">${s.artist||'—'} ${diffPill}</div>
      </div>
      ${i===currentSong?'<div class="song-playing"><div class="sp-bar"></div><div class="sp-bar"></div><div class="sp-bar"></div></div>':'<span class="song-arrow">›</span>'}
    `;
    if(!locked) div.addEventListener('click',()=>loadSong(i));
    el.appendChild(div);
  });
}

// ── LOAD SONG ────────────────────────────────────────────────────────────────
function loadSong(idx){
  currentSong=idx;
  buildList();
  const s=SONGS[idx];
  document.getElementById('lyrThumb').src='https://img.youtube.com/vi/'+s.id+'/mqdefault.jpg';
  document.getElementById('lyrTitle').textContent=s.title;
  document.getElementById('lyrArtist').textContent=s.artist||'—';
  const badge=document.getElementById('diffBadge');
  badge.textContent=s.difficulty; badge.className='diff-badge '+s.difficulty;
  karaoState.difficulty=s.difficulty;

  karaoState.challengeActive=false;
  if(s.mode==='karaoke'){
    buildKaraoke(s);
    if(player&&player.loadVideoById){
      clearInterval(checkInterval);
      player.loadVideoById({videoId:s.id,startSeconds:0});
    }
  } else {
    // fragment mode
    buildKaraoke(null);
    const frag=s.fragments[0];
    document.getElementById('karaScroll').innerHTML='';
    buildFragmentPhrase(frag.phrase, s.difficulty);
    if(player&&player.loadVideoById){
      player.loadVideoById({videoId:s.id,startSeconds:frag.start});
      startLoop(frag.start,frag.end);
    }
  }
}

// ── BUILD KARAOKE ─────────────────────────────────────────────────────────────
function buildKaraoke(song){
  const scroll=document.getElementById('karaScroll');
  scroll.innerHTML='';
  karaoState.lineEls=[];
  karaoState.currentIdx=-1;
  karaoState.challengeActive=false;
  karaoState.blanks=[];
  karaoState.blanksFilled=0;
  clearOptionsPanel();

  if(!song){
    scroll.innerHTML='<div style="color:rgba(255,255,255,.2);font-size:.82rem;text-align:center;padding:30px 0;">♪ Selecciona una canción para comenzar ♪</div>';
    return;
  }

  song.lyrics.forEach((line,i)=>{
    const div=document.createElement('div');
    if(!line.text){
      div.className='kara-line empty';
    } else {
      div.className='kara-line';
      div.dataset.idx=i;
      div.dataset.text=line.text;
      const ws=line.text.split(/\s+/);
      const bi=isChallengeLine(line.text)?pickBlanks(line.text,karaoState.difficulty):[];
      if(bi.length>0){
        ws.forEach((w,wi)=>{
          if(bi.includes(wi)){
            const bub=document.createElement('span');
            bub.className='blank-bubble';
            bub.dataset.answer=w.replace(/[^A-Za-z]/g,'').toUpperCase();
            bub.dataset.filled='0';
            div.appendChild(bub);
          } else {
            const sp=document.createElement('span');
            sp.className='kara-word';
            sp.textContent=w;
            div.appendChild(sp);
          }
          if(wi<ws.length-1) div.appendChild(document.createTextNode(' '));
        });
      } else {
        div.textContent=line.text;
      }
    }
    karaoState.lineEls.push(div);
    scroll.appendChild(div);
  });

  // Start timer to advance lines
  clearInterval(karaTimer);
  karaTimer=setInterval(()=>{
    if(!player||typeof player.getCurrentTime!=='function') return;
    const pState=player.getPlayerState?player.getPlayerState():-1;
    if(pState===-1||pState===5) return;
    const t=player.getCurrentTime();
    if(karaoState.challengeActive){
      if(karaoState.loopEnd>0&&t>=karaoState.loopEnd){
        karaoState.loopCount++;
        player.seekTo(karaoState.loopStart,true);
        if(pState!==1) player.playVideo();
      }
      return;
    }
    updateKaraoke(t, song);
  },300);
}

// ── UPDATE KARAOKE (called every 300ms) ──────────────────────────────────────
function updateKaraoke(t, song){
  const lyrics=song.lyrics;
  // Find current line
  let idx=lyrics.length-1;
  for(let i=0;i<lyrics.length;i++){
    if(i+1<lyrics.length && t<lyrics[i+1].t){ idx=i; break; }
  }
  if(idx===karaoState.currentIdx) return; // no change

  // Mark previous line as past
  if(karaoState.currentIdx>=0){
    const prev=karaoState.lineEls[karaoState.currentIdx];
    if(prev){ prev.classList.remove('active'); prev.classList.add('past'); }
  }

  karaoState.currentIdx=idx;
  const lineEl=karaoState.lineEls[idx];
  if(!lineEl) return;

  lineEl.classList.remove('past');
  lineEl.classList.add('active');

  // Auto-scroll
  lineEl.scrollIntoView({behavior:'smooth',block:'center'});

  const text=lineEl.dataset.text||'';
  const shouldChallenge=isChallengeLine(text);

  if(shouldChallenge && !karaoState.challengeActive){
    karaoState.challengeActive=true;
    // Pause video and set up challenge
    if(player&&player.pauseVideo) player.pauseVideo();
    buildChallengeOnLine(lineEl, text, song, idx);
  }
}

// ── BUILD CHALLENGE ON LINE ───────────────────────────────────────────────────
function buildChallengeOnLine(lineEl, text, song, lineIdx){
  // Collect pre-rendered blank bubbles from the line element
  karaoState.blanks=[];
  karaoState.blanksFilled=0;
  karaoState.loopCount=0;
  karaoState.challengeStart=Date.now();
  lineEl.querySelectorAll('.blank-bubble').forEach(bub=>{
    karaoState.blanks.push({el:bub, answer:bub.dataset.answer});
  });
  if(!karaoState.blanks.length){ karaoState.challengeActive=false; return; }
  // Set loop bounds (karaTimer handles seeking)
  const loopStart=song.lyrics[lineIdx].t;
  const rawEnd=(lineIdx+1<song.lyrics.length)?song.lyrics[lineIdx+1].t:loopStart+5;
  karaoState.loopStart=loopStart;
  karaoState.loopEnd=Math.max(rawEnd, loopStart+3);
  // Build options panel
  const correct=karaoState.blanks.map(b=>b.answer);
  buildOptionsPanel(correct, song);
  if(player&&player.playVideo) player.playVideo();
}

// ── BUILD OPTIONS PANEL ───────────────────────────────────────────────────────
function buildOptionsPanel(correctWords, song){
  const grid=document.getElementById('optionsGrid');
  const hint=document.getElementById('optHint');
  if(!grid) return;

  const total=optionCount(correctWords.length);
  const distractors=[];
  // Pull distractors from pool (not already in correct)
  const pool=_POOL.filter(w=>!correctWords.includes(w));
  // shuffle pool
  for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  while(distractors.length<total-correctWords.length && pool.length) distractors.push(pool.shift());

  const all=[...correctWords,...distractors];
  // shuffle all
  for(let i=all.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[all[i],all[j]]=[all[j],all[i]];}

  grid.innerHTML='';
  all.forEach(word=>{
    const btn=document.createElement('button');
    btn.className='chall-opt';
    btn.textContent=word;
    btn.onclick=()=>selectOption(btn, word, correctWords);
    grid.appendChild(btn);
  });

  if(hint) hint.textContent=correctWords.length+' palabra'+(correctWords.length>1?'s':'')+' oculta'+(correctWords.length>1?'s':'')+' en esta línea';
}

function clearOptionsPanel(){
  const grid=document.getElementById('optionsGrid');
  const hint=document.getElementById('optHint');
  if(grid) grid.innerHTML='<div id="optsPlaceholder" style="color:rgba(255,255,255,.2);font-size:.78rem;text-align:center;padding:20px 0;">Reproduce una canción para ver las opciones</div>';
  if(hint) hint.textContent='';
}

// ── SELECT OPTION ─────────────────────────────────────────────────────────────
function selectOption(btn, word, correctWords){
  if(btn.disabled) return;
  btn.disabled=true;

  // Find the blank that matches this exact word (any order)
  const matchBlank=karaoState.blanks.find(b=>b.el.dataset.filled==='0'&&b.answer===word);
  if(matchBlank){
    // Correct word → fill its specific blank
    matchBlank.el.textContent=word;
    matchBlank.el.dataset.filled='1';
    karaoState.blanksFilled++;
    btn.classList.add('correct');
    matchBlank.el.classList.remove('blank-bubble');
    matchBlank.el.classList.add('blank-bubble','correct');
    addScore(10);
  } else {
    // Wrong word — mark button wrong, no blank filled
    btn.classList.add('wrong');
    const hint=document.getElementById('optHint');
    if(hint) hint.textContent='✗ "'+word+'" no pertenece a esta frase';
    // Error counter
    errorCount++;
    var errEl=document.getElementById('errorCount');
    if(errEl) errEl.textContent=errorCount;
    if(errorCount>=10){ setTimeout(llShowGameOver,400); return; }
  }

  // Loop continues until ALL blanks filled
  if(karaoState.blanksFilled>=karaoState.blanks.length){
    document.querySelectorAll('.chall-opt:not([disabled])').forEach(b=>{b.disabled=true;});
    showSpeedMessage(karaoState.loopCount);
    setTimeout(()=>{
      karaoState.challengeActive=false;
      karaoState.loopStart=0;
      karaoState.loopEnd=0;
    },800);
  }
}

// ── SKIP CHALLENGE ────────────────────────────────────────────────────────────
function skipChallenge(){
  if(karaoState.blanks.length){
    karaoState.blanks.forEach(b=>{
      b.el.textContent=b.answer;
      b.el.classList.remove('blank-bubble');
      b.el.classList.add('blank-bubble','filled');
      b.el.dataset.filled='1';
    });
    karaoState.blanksFilled=karaoState.blanks.length;
    karaoState.challengeActive=false;
    document.querySelectorAll('.chall-opt:not([disabled])').forEach(b=>{b.disabled=true;});
  }
  karaoState.challengeActive=false;
  karaoState.loopStart=0;
  karaoState.loopEnd=0;
  if(player&&player.playVideo) player.playVideo();
}

// ── FRAGMENT MODE ─────────────────────────────────────────────────────────────
function buildFragmentPhrase(phrase, difficulty){
  const scroll=document.getElementById('karaScroll');
  scroll.innerHTML='';
  const words=phrase.split(' ');
  const blankIdxs=pickBlanks(phrase.toUpperCase(), difficulty);
  const blanksCount=blankIdxs.length||1;
  karaoState.blanks=[];
  karaoState.blanksFilled=0;
  karaoState.challengeActive=true;

  const lineDiv=document.createElement('div');
  lineDiv.className='kara-line active';
  words.forEach((w,i)=>{
    if(blankIdxs.includes(i)){
      const bubble=document.createElement('span');
      bubble.className='blank-bubble';
      bubble.dataset.answer=w.replace(/[^A-Za-z]/g,'').toUpperCase();
      bubble.dataset.filled='0';
      karaoState.blanks.push({el:bubble,answer:w.replace(/[^A-Za-z]/g,'').toUpperCase()});
      lineDiv.appendChild(bubble);
    } else {
      const span=document.createElement('span');
      span.className='kara-word';
      span.textContent=w;
      lineDiv.appendChild(span);
    }
    if(i<words.length-1) lineDiv.appendChild(document.createTextNode(' '));
  });
  scroll.appendChild(lineDiv);

  const correct=karaoState.blanks.map(b=>b.answer);
  buildOptionsPanel(correct, SONGS[currentSong]);
}

// ── SPEED MESSAGE (v2: Airstrike, fixed+centered sobre el video) ────────────
const _FAST_MSGS=['🔥 INCREDIBLE!','⚡ AMAZING!','🌟 AWESOME!','💥 PERFECT!','🎯 FLAWLESS!','🚀 UNSTOPPABLE!'];
const _MED_MSGS=['👍 Nice!','✨ Good job!','🎵 Keep it up!','💪 Not bad!'];
function showSpeedMessage(loops){
  var msgs=loops===0?_FAST_MSGS:loops<=1?_MED_MSGS:null;
  if(!msgs) return;
  var txt=msgs[Math.floor(Math.random()*msgs.length)];
  var cls=loops===0?'fast':'medium';
  var el=document.createElement('div');
  el.className='speed-msg '+cls;
  el.textContent=txt;
  var anchor=document.querySelector('.player-vid-yt')||document.querySelector('.card.player');
  if(anchor){var r=anchor.getBoundingClientRect();el.style.left=(r.left+r.width/2)+'px';el.style.top=(r.top+r.height/2)+'px';}
  document.body.appendChild(el);
  setTimeout(()=>el.remove(),900);
}

// ── SCORE ──────────────────────────────────────────────────────────────────────
function addScore(pts){
  const prevBuckets=Math.floor(totalScore/100);
  totalScore+=pts;
  const newBuckets=Math.floor(totalScore/100);
  const xpGained=(newBuckets-prevBuckets)*10;
  if(xpGained>0) xp+=xpGained;
  // Update donut (session score)
  var el=document.getElementById('currentScore'); if(el) el.textContent=totalScore;
  var donut=document.getElementById('donutFill');
  if(donut){var pct=Math.min(1,(totalScore%100)/100);donut.style.strokeDashoffset=264-(264*pct);}
  // Update XP bar (experience)
  var xpEl=document.getElementById('xpValue'); if(xpEl) xpEl.textContent=xp+' / 1000';
  var xpBar=document.getElementById('xpBar'); if(xpBar) xpBar.style.width=Math.min(100,(xp/1000)*100)+'%';
  // Update record
  var recEl=document.getElementById('recordScore'); if(recEl&&totalScore>parseInt(recEl.textContent||0)) recEl.textContent=totalScore;
  showScorePopup(pts);
  if(window._aura&&pts>0) _aura.saveScore(pts);
}

function showScorePopup(pts){
  const popup=document.getElementById('scorePopup');
  popup.style.left='50%'; popup.style.top='38%'; popup.style.transform='translateX(-50%)';
  popup.className='score-popup '+(pts>=10?'pop-10':'pop-5');
  popup.textContent='+'+pts;
  popup.style.display='block'; popup.style.fontSize='2.5rem';
  setTimeout(()=>{popup.style.display='none';popup.style.transform='';popup.style.fontSize='';},2000);
}

// ── LOOP (fragment mode) ──────────────────────────────────────────────────────
function startLoop(start,end){
  clearInterval(checkInterval);
  checkInterval=setInterval(()=>{
    if(!player||typeof player.getCurrentTime!=='function') return;
    if(player.getCurrentTime()>=end){player.seekTo(start,true);player.playVideo();}
  },300);
}

function togglePlay(){
  if(!player||!player.getPlayerState) return;
  if(player.getPlayerState()===1) player.pauseVideo(); else player.playVideo();
}

// ── YOUTUBE API ───────────────────────────────────────────────────────────────
var tag=document.createElement('script');
tag.src='https://www.youtube.com/iframe_api';
document.head.appendChild(tag);

function onYouTubeIframeAPIReady(){
  const s=SONGS[currentSong];
  player=new YT.Player('ytPlayer',{
    width:'100%',height:'100%',
    videoId:s.id,
    playerVars:{autoplay:0,controls:0,modestbranding:1,rel:0,showinfo:0,iv_load_policy:3,playsinline:1,disablekb:1,fs:0,cc_load_policy:0},
    events:{
      onReady:e=>{
        const cs=SONGS[currentSong];
        if(cs.mode==='karaoke') buildKaraoke(cs);
      },
      onStateChange:e=>{
        if(e.data===YT.PlayerState.ENDED && SONGS[currentSong].mode==='fragment'){
          const f=SONGS[currentSong].fragments[0];
          player.seekTo(f.start,true);player.playVideo();
        }
      }
    }
  });
}


// ── GAME OVER / RETRY ─────────────────────────────────────────────────────────
function llShowGameOver(){
  if(player&&player.pauseVideo) player.pauseVideo();
  document.querySelectorAll('.chall-opt').forEach(function(b){b.disabled=true;});
  // Fill popup stats
  var sc=document.getElementById('llGovScore');
  var co=document.getElementById('llGovCorrect');
  if(sc) sc.textContent=totalScore;
  if(co) co.textContent=karaoState.blanksFilled||0;
  // Shake animation on card
  var card=document.getElementById('llGovCard');
  if(card){card.style.animation='none';void card.offsetWidth;card.style.animation='p2Shk .45s ease';}
  var ov=document.getElementById('llGov');
  if(ov) ov.style.display='flex';
}

function llGovRetry(){
  var ov=document.getElementById('llGov');
  if(ov) ov.style.display='none';
  errorCount=0;
  var errEl=document.getElementById('errorCount');
  if(errEl) errEl.textContent='0';
  loadSong(currentSong);
}

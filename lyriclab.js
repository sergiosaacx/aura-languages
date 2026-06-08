// ── WORD POOL (distractors) ───────────────────────────────────────────────
const _POOL = ['HEART','MIND','SOUL','FIRE','RAIN','LIGHT','DARK','LOVE','HOPE','DREAM',
  'FALL','RISE','LOST','FOUND','GOLD','TIME','WORLD','BLOOD','VOICE','STRONG',
  'BRAVE','FREE','WILD','YOUNG','OLD','NEW','FIRST','LAST','WORDS','HANDS',
  'EYES','FACE','TRUTH','FAITH','GRACE','POWER','STORY','NIGHT','SPEED','CHANCE',
  'SONG','ROAD','BRIDGE','STONE','FLAME','WIND','WAVE','BREAK','BUILD','MOVE'];
// Pool activo para la canción/idioma actual (se carga desde Supabase)
let _activePool = _POOL.slice();
let _currentSongId = null;

// Carga pool de distractores desde Supabase por canción e idioma
async function loadLyriclabPool(songId, lang) {
  var language = lang || 'en';
  console.log('[LyricLab] Buscando pool para:', songId, '| idioma:', language);
  try {
    var sb = window._aura && window._aura.sb;
    if (!sb) throw new Error('no sb');
    // Buscar con idioma: lyriclab/<id>/<lang> — usar limit(1) para evitar error por duplicados
    var key1 = 'lyriclab/' + songId + '/' + language;
    var res = await sb.from('word_pools')
      .select('words')
      .eq('context', key1)
      .order('id', {ascending: false})
      .limit(1);
    console.log('[LyricLab] Query1 (' + key1 + '):', res.error || (res.data ? res.data.length + ' filas' : 'null'));
    if (!res.error && res.data && res.data.length > 0 && res.data[0].words && res.data[0].words.length > 0) {
      console.log('[LyricLab] Pool (' + language + '): ' + res.data[0].words.length + ' palabras ✅');
      return res.data[0].words;
    }
    // Fallback: context sin idioma (pools legacy)
    var key2 = 'lyriclab/' + songId;
    var res2 = await sb.from('word_pools')
      .select('words')
      .eq('context', key2)
      .order('id', {ascending: false})
      .limit(1);
    console.log('[LyricLab] Query2 (' + key2 + '):', res2.error || (res2.data ? res2.data.length + ' filas' : 'null'));
    if (!res2.error && res2.data && res2.data.length > 0 && res2.data[0].words && res2.data[0].words.length > 0) {
      console.log('[LyricLab] Pool legacy: ' + res2.data[0].words.length + ' palabras ✅');
      return res2.data[0].words;
    }
  } catch(e) {
    console.warn('[LyricLab] Pool error:', e.message);
  }
  console.log('[LyricLab] ⚠️ Sin pool en Supabase — usando fallback estático (inglés)');
  return _POOL.slice();
}

// ── BELIEVER LYRICS ──────────────────────────────────────────────────────────
const BELIEVER_LYRICS = [
  {t:0,   text:''},
  {t:7,   text:'FIRST THINGS FIRST'},
  {t:9,   text:"I'M GONNA SAY ALL THE WORDS INSIDE MY HEAD"},
  {t:11,  text:"I'M FIRED UP AND TIRED OF THE WAY THAT THINGS HAVE BEEN"},
  {t:15,  text:'OH WOO'},
  {t:17,  text:'THE WAY THAT THINGS HAVE BEEN'},
  {t:19,  text:'OH OOH'},
  {t:22,  text:'SECOND THINGS SECOND'},
  {t:24,  text:"DON'T YOU TELL ME WHAT YOU THINK THAT I COULD BE"},
  {t:27,  text:"I'M THE ONE AT THE SAIL I'M THE MASTER OF MY SEA"},
  {t:31,  text:'OH OOH'},
  {t:33,  text:'THE MASTER OF MY SEA'},
  {t:34,  text:'OH OOH'},
  {t:37,  text:'I WAS BROKEN FROM A YOUNG AGE'},
  {t:39,  text:'TAKEN MY SULKING TO THE MASSES'},
  {t:41,  text:'WRITING MY POEMS FOR THE FEW'},
  {t:43,  text:'THAT LOOK TO ME TOOK TO ME SHOOK TO ME FEELING ME'},
  {t:45,  text:'SINGING FROM HEARTACHE FROM THE PAIN'},
  {t:47,  text:'TAKING MY MESSAGE FROM THE VEINS'},
  {t:49,  text:'SPEAKING MY LESSON FROM THE BRAIN'},
  {t:51,  text:'SEEING THE BEAUTY THROUGH THE'},
  {t:54,  text:'PAIN'},
  {t:55,  text:'YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER'},
  {t:62,  text:'PAIN'},
  {t:63,  text:'YOU BREAK ME DOWN YOU BUILD ME UP BELIEVER BELIEVER'},
  {t:68,  text:'PAIN'},
  {t:70,  text:'LET THE BULLETS FLY OH LET THEM RAIN'},
  {t:74,  text:'MY LIFE MY LOVE MY DRIVE IT CAME FROM'},
  {t:77,  text:'PAIN'},
  {t:78,  text:'YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER'},
  {t:84,  text:'THIRD THINGS THIRD'},
  {t:85,  text:'SEND A PRAYER TO THE ONES UP ABOVE'},
  {t:88,  text:"ALL THE HATE THAT YOU'VE HEARD HAS TURNED YOUR SPIRIT TO A DOVE"},
  {t:92,  text:'OH OOO'},
  {t:94,  text:'YOUR SPIRIT UP ABOVE'},
  {t:96,  text:'OH OOO'},
  {t:99,  text:'I WAS CHOKING IN THE CROWD'},
  {t:100, text:'BUILDING MY RAIN UP IN THE CLOUD'},
  {t:102, text:'FALLING LIKE ASHES TO THE GROUND'},
  {t:104, text:'HOPING MY FEELINGS THEY WOULD DROWN'},
  {t:106, text:'BUT THEY NEVER DID EVER LIVED EBBING AND FLOWING'},
  {t:108, text:'INHIBITED LIMITED TILL IT BROKE OPEN'},
  {t:110, text:'AND RAINED DOWN YOU RAINED DOWN LIKE'},
  {t:115, text:'PAIN'},
  {t:117, text:'YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER'},
  {t:123, text:'PAIN'},
  {t:125, text:'YOU BREAK ME DOWN YOU BUILD ME UP BELIEVER BELIEVER'},
  {t:130, text:'PAIN'},
  {t:132, text:'LET THE BULLETS FLY OH LET THEM RAIN'},
  {t:135, text:'MY LIFE MY LOVE MY DRIVE IT CAME FROM'},
  {t:138, text:'PAIN'},
  {t:140, text:'YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER'},
  {t:145, text:'LAST THINGS LAST'},
  {t:146, text:'BY THE GRACE OF THE FIRE AND THE FLAME'},
  {t:149, text:"YOU'RE THE FACE OF THE FUTURE"},
  {t:152, text:'THE BLOOD IN MY VEINS'},
  {t:153, text:'OH OOH'},
  {t:155, text:'THE BLOOD IN MY VEINS'},
  {t:157, text:'OH OOH'},
  {t:160, text:'BUT THEY NEVER DID EVER LIVED EBBING AND FLOWING'},
  {t:162, text:'INHIBITED LIMITED TILL IT BROKE OPEN'},
  {t:164, text:'AND RAINED DOWN YOU RAINED DOWN LIKE'},
  {t:173, text:'I WANT TO STOP'},
  {t:177, text:"WE CAN'T"},
  {t:179, text:'PAIN'},
  {t:180, text:'YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER'},
  {t:187, text:'PAIN'},
  {t:188, text:'YOU BREAK ME DOWN YOU BUILD ME UP BELIEVER BELIEVER'},
  {t:194, text:'PAIN'},
  {t:195, text:'LET THE BULLETS FLY OH LET THEM RAIN'},
  {t:199, text:'MY LIFE MY LOVE MY DRIVE IT CAME FROM'},
  {t:202, text:'PAIN'},
  {t:203, text:'YOU MADE ME A YOU MADE ME A BELIEVER BELIEVER'}
];

// ── SONGS ────────────────────────────────────────────────────────────────────
let SONGS = [
  {id:'7wtfhZwyrcc', title:'Believer', artist:'Imagine Dragons', difficulty:'intermedio', levelRequired:1, mode:'karaoke', lyrics:BELIEVER_LYRICS},
  {id:'mWRsgZuwf_8', title:'Demons', artist:'Imagine Dragons', difficulty:'principiante', levelRequired:1, mode:'fragment',
    fragments:[{start:8,end:23,phrase:'When the days are cold and the cards all fold and the saints we see are all made of gold'},{start:22,end:34,phrase:'When your dreams all fail and the ones we hail are the worst of all and the bloods run stale'}]},
  {id:'wDjeBNv6ip0', title:'Cargando...', artist:'', difficulty:'intermedio', levelRequired:2, mode:'fragment',
    fragments:[{start:15,end:30,phrase:'When you get older plainer saner will you remember all the danger we came from'},{start:30,end:40,phrase:'Burning like embers falling tender long before the days of no surrender years ago'}]},
  {id:'RB-RcX5DS5A', title:'Cargando...', artist:'', difficulty:'avanzado', levelRequired:3, mode:'fragment', fragments:[{start:34,end:62,phrase:'listen carefully and fill in the missing words'}]},
  {id:'e-fA-gBCkj0', title:'Cargando...', artist:'', difficulty:'principiante', levelRequired:1, mode:'fragment', fragments:[{start:34,end:62,phrase:'listen carefully and fill in the missing words'}]},
  {id:'fV4DiAyExN0', title:'Cargando...', artist:'', difficulty:'intermedio', levelRequired:2, mode:'fragment', fragments:[{start:34,end:62,phrase:'listen carefully and fill in the missing words'}]},
  {id:'EkHTsc9PU2A', title:'Cargando...', artist:'', difficulty:'avanzado', levelRequired:4, mode:'fragment', fragments:[{start:34,end:62,phrase:'listen carefully and fill in the missing words'}]},
  {id:'pXRviuL6vMY', title:'Cargando...', artist:'', difficulty:'principiante', levelRequired:1, mode:'fragment', fragments:[{start:34,end:62,phrase:'listen carefully and fill in the missing words'}]},
  {id:'9gWIIIr2Asw', title:'Cargando...', artist:'', difficulty:'intermedio', levelRequired:3, mode:'fragment', fragments:[{start:34,end:62,phrase:'listen carefully and fill in the missing words'}]}
];

// ── STATE ────────────────────────────────────────────────────────────────────
let currentSong = 0, totalScore = 0, errorCount = 0, combo = 0, maxStreak = 0, curStreak = 0;
let _pendingSongIdx = 0;
let player, checkInterval, karaTimer;
let karaoState = {
  lineEls: [],         // DOM elements for each lyric line
  currentIdx: -1,      // current lyric index
  challengeActive: false,
  blanks: [],          // [{el, answer}]
  blanksFilled: 0,
  difficulty: 'intermedio',
  loopCount: 0,        // how many times the line looped
  challengeStart: 0,  // timestamp when challenge began
  lineScore: 0         // pts earned on current challenge line
};

// ── LAYOUT ───────────────────────────────────────────────────────────────────
function adjustLayout(){
  const leftCol = document.querySelector('.left-col');
  const content = document.querySelector('.content');
  if(!leftCol||!content) return;
  const totalH = content.getBoundingClientRect().height;
  const videoW = (totalH*0.68)*(16/9);
  leftCol.style.width = videoW+'px';
}
window.addEventListener('resize',adjustLayout);
document.addEventListener('DOMContentLoaded',()=>{adjustLayout();setTimeout(adjustLayout,100);});

// ── GREETING ─────────────────────────────────────────────────────────────────
(function(){var h=new Date().getHours();var g=h<12?'Buenos días':h<19?'Buenas tardes':'Buenas noches';var el=document.getElementById('greeting');if(el)el.textContent=g;})();

// ── DIFFICULTY MULTIPLIER ────────────────────────────────────────────────────
function diffMultiplier(){
  var d=karaoState.difficulty;
  if(d==='legendario') return 4;
  if(d==='dificil')    return 2.5;
  if(d==='medio')      return 1.5;
  return 1; // facil + default
}

function updateComboDisplay(){
  var box=document.getElementById('comboBox');
  var cnt=document.getElementById('comboCount');
  if(cnt) cnt.textContent=combo;
  if(box){
    box.style.opacity=combo>0?'1':'0.4';
    if(combo>0){
      box.classList.add('pop');
      setTimeout(function(){box.classList.remove('pop');},200);
    }
  }
}

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
  const candidates = [];
  words.forEach((w,i)=>{
    const clean = w.replace(/[^A-Z]/g,'');
    if(clean.length>=3 && !SKIP_WORDS.has(clean)) candidates.push(i);
  });
  if(!candidates.length) return [];
  let count;
  if(difficulty==='facil'){
    count=Math.min(2, candidates.length);
  } else if(difficulty==='medio'){
    const lo=3, hi=5;
    count=Math.min(candidates.length, Math.max(lo, Math.min(hi, Math.floor(candidates.length*0.45))));
  } else if(difficulty==='dificil'){
    count=Math.max(1, Math.round(candidates.length*0.9));
    count=Math.min(count, candidates.length);
    // Return 90%: just slice candidates directly (evenly spaced)
    const step=Math.max(1,Math.floor(candidates.length/count));
    const picked=[];
    for(let i=0;i<count;i++) picked.push(candidates[Math.min(i*step,candidates.length-1)]);
    return [...new Set(picked)];
  } else if(difficulty==='legendario'){
    // EVERY word in the line hidden (including skip words)
    return words.map((_,i)=>i);
  } else {
    // legacy fallback (principiante/intermedio)
    if(difficulty==='principiante') count=1;
    else count=Math.min(3,Math.max(2,Math.floor(candidates.length*0.4)));
  }
  count=Math.min(count,candidates.length);
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
  _pendingSongIdx=idx;
  const s=SONGS[idx];
  // Show difficulty selector overlay
  var ov=document.getElementById('diffSelOv');
  if(ov){
    var th=document.getElementById('diffSelThumb');
    var ti=document.getElementById('diffSelTitle');
    var ar=document.getElementById('diffSelArtist');
    if(th) th.src='https://img.youtube.com/vi/'+s.id+'/mqdefault.jpg';
    if(ti) ti.textContent=s.title;
    if(ar) ar.textContent=s.artist||'—';
    // record & level
    var recEl2=document.getElementById('diffSelRecord');
    if(recEl2){ var recEl=document.getElementById('recordScore'); recEl2.textContent=recEl?recEl.textContent:'0'; }
    var lvlEl=document.getElementById('diffSelLevel');
    if(lvlEl){ var prof2=(window._aura&&window._aura.profile)||{}; var niv=prof2.nivel||1; var ran=prof2.rango||'Bronce'; lvlEl.textContent='Lv '+niv+' · '+ran; }
    ov.classList.add('active');
  } else {
    selectDifficulty(karaoState.difficulty||'facil');
  }
}

function selectDifficulty(level){
  var ov=document.getElementById('diffSelOv');
  if(ov) ov.classList.remove('active');
  karaoState.difficulty=level;
  _doLoadSong(_pendingSongIdx);
}

function _doLoadSong(idx){
  currentSong=idx;
  _currentSongId=null;
  buildList();
  const s=SONGS[idx];
  _currentSongId=s.id;
  // Cargar pool por idioma activo en segundo plano
  (async function(){
    var _lang=(localStorage.getItem('aura_lang'))||
              (window._aura&&window._aura.active_language)||'en';
    _activePool = await loadLyriclabPool(s.id, _lang);
  })();
  document.getElementById('lyrThumb').src='https://img.youtube.com/vi/'+s.id+'/mqdefault.jpg';
  document.getElementById('lyrTitle').textContent=s.title;
  document.getElementById('lyrArtist').textContent=s.artist||'—';
  const badge=document.getElementById('diffBadge');
  badge.textContent=karaoState.difficulty; badge.className='diff-badge '+karaoState.difficulty;
  // reset score, errors & combo
  totalScore=0;
  var _sc=document.getElementById('currentScore'); if(_sc) _sc.textContent='0';
  errorCount=0; combo=0; maxStreak=0; curStreak=0;
  var errEl=document.getElementById('errorCount'); if(errEl) errEl.textContent='0';
  updateComboDisplay();

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
    var _ts=window.auraT||function(k){return k;}; scroll.innerHTML='<div style="color:rgba(255,255,255,.2);font-size:.82rem;text-align:center;padding:30px 0;">'+_ts('lyric_select_start')+'</div>';
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
  karaoState.lineScore=0;
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
  const pool=_activePool.filter(w=>!correctWords.includes(w));
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

  var _t=window.auraT||function(k){return k;}; if(hint) hint.textContent=correctWords.length+' '+(correctWords.length>1?_t('lyric_words_p'):_t('lyric_word_s'))+' '+(correctWords.length>1?_t('lyric_hidden_p'):_t('lyric_hidden_s'))+' '+_t('lyric_in_line');
}

function clearOptionsPanel(){
  const grid=document.getElementById('optionsGrid');
  const hint=document.getElementById('optHint');
  var _tg=window.auraT||function(k){return k;}; if(grid) grid.innerHTML='<div id="optsPlaceholder" style="color:rgba(255,255,255,.2);font-size:.78rem;text-align:center;padding:20px 0;">'+_tg('lyric_play_to_see')+'</div>';
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
    var _pts=Math.round(10*diffMultiplier()*(1+combo*0.1));
    karaoState.lineScore=(karaoState.lineScore||0)+_pts;
    addScore(_pts);
    curStreak++;
    if(curStreak>maxStreak) maxStreak=curStreak;
  } else {
    // Wrong word — mark button wrong, track error
    btn.classList.add('wrong');
    const hint=document.getElementById('optHint');
    var _tw=window.auraT||function(k){return k;}; if(hint) hint.textContent=_tw('lyric_wrong_pre')+' "'+word+'" '+_tw('lyric_wrong_post');
    errorCount++;
    curStreak=0;
    combo=0;
    updateComboDisplay();
    var errEl=document.getElementById('errorCount');
    if(errEl) errEl.textContent=errorCount;
    if(errorCount>=10){ setTimeout(llShowGameOver,400); return; }
  }

  // Loop continues until ALL blanks filled
  if(karaoState.blanksFilled>=karaoState.blanks.length){
    document.querySelectorAll('.chall-opt:not([disabled])').forEach(b=>{b.disabled=true;});
    // Speed bonus: +20% if completed on first loop
    if(karaoState.loopCount===0){
      var _spBonus=Math.round((karaoState.lineScore||0)*0.2);
      if(_spBonus>0) addScore(_spBonus);
    }
    // Combo increment
    combo++;
    updateComboDisplay();
    showSpeedMessage(karaoState.loopCount);
    setTimeout(()=>{
      karaoState.challengeActive=false;
      karaoState.loopStart=0;
      karaoState.loopEnd=0;
    },800);
  }
}

// ── GAME OVER / DIFFICULTY ──────────────────────────────────────────────────
function reopenDiffSelector(){
  var ov=document.getElementById('diffSelOv');
  if(!ov) return;
  var s=SONGS[currentSong];
  var th=document.getElementById('diffSelThumb');
  var ti=document.getElementById('diffSelTitle');
  var ar=document.getElementById('diffSelArtist');
  if(th) th.src='https://img.youtube.com/vi/'+s.id+'/mqdefault.jpg';
  if(ti) ti.textContent=s.title;
  if(ar) ar.textContent=s.artist||'—';
  var recElR=document.getElementById('diffSelRecord');
  if(recElR){ var recElRr=document.getElementById('recordScore'); recElR.textContent=recElRr?recElRr.textContent:'0'; }
  var lvlElR=document.getElementById('diffSelLevel');
  if(lvlElR){ var profR=(window._aura&&window._aura.profile)||{}; var nivR=profR.nivel||1; var ranR=profR.rango||'Bronce'; lvlElR.textContent='Lv '+nivR+' · '+ranR; }
  _pendingSongIdx=currentSong;
  // Pause while choosing
  if(player&&player.pauseVideo) player.pauseVideo();
  ov.classList.add('active');
}

// ── POPUP HELPERS ────────────────────────────────────────────────────────────
function _t(id,val){var el=document.getElementById(id);if(el)el.textContent=val;}
function _pct(id,pct){var el=document.getElementById(id);if(el)el.style.width=Math.max(0,Math.min(100,pct))+'%';}
function _fmt(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,' ');}

function _llPopupData(){
  var prof=(window._aura&&window._aura.profile)||{};
  var nombre=prof.nombre||'tú';
  var s=SONGS[currentSong]||{};
  var total=karaoState.blanks?karaoState.blanks.length:0;
  var filled=karaoState.blanksFilled||0;
  var errs=errorCount||0;
  var acc=total>0?Math.round((filled/total)*100):0;
  var streak=maxStreak||0;
  var diff=karaoState.difficulty||'medio';
  var diffLabel={'facil':'Fácil','medio':'Medio','dificil':'Difícil','legendario':'Legendario'}[diff]||diff;
  var xpState=window.AuraXP?AuraXP.getState():null;
  var recEl=document.getElementById('recordScore');
  var record=recEl?parseInt(recEl.textContent||0):0;
  return {nombre,s,total,filled,errs,acc,streak,diffLabel,diff,xpState,record,prof};
}

// ── DIFFICULTY MODAL HELPERS ──────────────────────────────────────────────────
var _dmoSelected='medio';
function dmoSelect(el,key){
  document.querySelectorAll('.dopt').forEach(function(o){o.classList.remove('selected');});
  el.classList.add('selected');
  _dmoSelected=key;
  var previews={
    facil:'<span class="word">Pain!</span> You made me a, you made me a <span class="blank"></span>, believer',
    medio:'<span class="word">Pain!</span> You made me <span class="blank"></span>, you made me a <span class="blank"></span>, <span class="blank"></span>',
    dificil:'<span class="word">Pain!</span> You <span class="blank"></span> <span class="blank"></span> <span class="blank"></span>, you <span class="blank"></span> <span class="blank"></span> <span class="blank"></span>, <span class="blank"></span>',
    legendario:'<span class="blank"></span>! <span class="blank"></span> <span class="blank"></span> <span class="blank"></span> <span class="blank"></span>, <span class="blank"></span> <span class="blank"></span> <span class="blank"></span> <span class="blank"></span>, <span class="blank"></span>'
  };
  var prev=document.getElementById('diffPreview');
  if(prev&&previews[key]) prev.innerHTML=previews[key];
}
function closeDiffSelector(){
  var ov=document.getElementById('diffSelOv'); if(ov) ov.classList.remove('active');
}
function startFromDiff(){
  selectDifficulty(_dmoSelected||'medio');
}
(function(){
  document.addEventListener('keydown',function(e){
    var ov=document.getElementById('diffSelOv');
    if(!ov||!ov.classList.contains('active')) return;
    var map={'1':'facil','2':'medio','3':'dificil','4':'legendario'};
    if(map[e.key]){
      var btn=document.querySelector('.dopt[data-key="'+map[e.key]+'"]');
      if(btn) dmoSelect(btn,map[e.key]);
    }
    if(e.key==='Enter') startFromDiff();
    if(e.key==='Escape') closeDiffSelector();
  });
})();

// ── GAME OVER ─────────────────────────────────────────────────────────────────
function llShowGameOver(){
  if(player&&player.pauseVideo) player.pauseVideo();
  clearInterval(checkInterval);
  document.querySelectorAll('.chall-opt').forEach(function(b){b.disabled=true;});
  var d=_llPopupData();
  _t('llGovName',d.nombre);
  _t('llGovSong',d.s.title||'—');
  _t('llGovArtist',d.s.artist||'—');
  _t('llGovDiff',d.diffLabel);
  var score=totalScore;
  var prev=d.record;
  var diff2=Math.max(0,prev-score);
  _t('llGovRecord',prev);
  _t('llGovScore',score);
  var _tll=window.auraT||function(k){return k;}; _t('llGovDelta',(prev>0?(diff2+' '+_tll('lyric_less_record')):_tll('lyric_first_game')));
  _t('llGovMin',Math.max(60,Math.round(prev*0.6)||60));
  _t('llGovCorrect',d.filled);
  _t('llGovTotal',d.total);
  _t('llGovErrors',d.errs);
  _t('llGovAcc',d.acc);
  _t('llGovStreak',d.streak);
  if(d.xpState){
    var xs=d.xpState;
    _t('llGovLvl',xs.nivel);
    _t('llGovLvlRange',xs.nivel+' → '+(xs.nivel+1));
    var xpGain=Math.floor(score/12);
    var nextXp=xs.xpParaSiguiente||1000;
    var curXp=xs.xpActual||0;
    var newXp=Math.min(nextXp,curXp+xpGain);
    var gap=nextXp-newXp;
    _t('llGovXpGained','+'+xpGain);
    _t('llGovXpProgress',newXp+'/'+nextXp);
    _t('llGovXpGap',gap+' XP');
    _t('llGovXpGapN','−'+gap);
    var nu=document.getElementById('llGovNearup');
    if(nu) nu.style.display=(gap<300&&gap>0)?'flex':'none';
    setTimeout(function(){
      _pct('llGovXpOld',Math.round((curXp/nextXp)*100));
      _pct('llGovXpFill',Math.round((newXp/nextXp)*100));
    },250);
  }
  var apGain=Math.max(5,Math.floor(score/60));
  var mpLost=Math.max(0,Math.floor(d.errs/2));
  _t('llGovAura',apGain);
  _t('llGovAuraTotal',_fmt((d.prof.aura_points||0)+apGain));
  _t('llGovMerit',mpLost);
  _t('llGovMeritTotal',_fmt(Math.max(0,(d.prof.merit_pm||0)-mpLost)));
  var ashes=document.getElementById('llAshes'); if(ashes) ashes.style.display='block';
  var ov=document.getElementById('llGov'); if(ov) ov.style.display='flex';
  _llLogSession();
}

function llGovRetry(){
  var ov=document.getElementById('llGov'); if(ov) ov.style.display='none';
  var ashes=document.getElementById('llAshes'); if(ashes) ashes.style.display='none';
  errorCount=0; maxStreak=0; curStreak=0;
  var errEl=document.getElementById('errorCount'); if(errEl) errEl.textContent='0';
  _doLoadSong(currentSong);
}
function llGovChangeDiff(){
  var ov=document.getElementById('llGov'); if(ov) ov.style.display='none';
  var ashes=document.getElementById('llAshes'); if(ashes) ashes.style.display='none';
  loadSong(currentSong);
}

// ── RESULTADO FINAL (WIN) ─────────────────────────────────────────────────────
function llShowResult(){
  if(player&&player.pauseVideo) player.pauseVideo();
  document.querySelectorAll('.chall-opt').forEach(function(b){b.disabled=true;});
  var d=_llPopupData();
  _t('llResName',d.nombre);
  _t('llResSong',d.s.title||'—');
  _t('llResArtist',d.s.artist||'—');
  _t('llResDiff',d.diffLabel);
  var score=totalScore;
  var prev=d.record;
  var delta=score-prev;
  var isNew=score>prev;
  _t('llResRecordOld',prev);
  _t('llResScore',score);
  _t('llResDelta',(delta>=0?'+':'')+delta+' vs récord');
  _t('llResRecordNew',isNew?score:prev);
  _t('llResCorrect',d.filled);
  _t('llResTotal',d.total);
  _t('llResErrors',d.errs);
  _t('llResAcc',d.acc);
  _t('llResStreak',d.streak);
  if(d.xpState){
    var xs=d.xpState;
    var multMap={facil:1,medio:1.5,dificil:2,legendario:3};
    var mult=multMap[d.diff]||1;
    var xpGain=Math.round(Math.floor(score/8)*mult);
    var nextXp=xs.xpParaSiguiente||1000;
    var curXp=xs.xpActual||0;
    var newXp=curXp+xpGain;
    var leveledUp=newXp>=nextXp;
    var newLvl=leveledUp?xs.nivel+1:xs.nivel;
    var newXpMod=leveledUp?newXp-nextXp:newXp;
    _t('llResLvlRange',newLvl+' → '+(newLvl+1));
    _t('llResXpGained','+'+xpGain);
    _t('llResXpProgress',Math.min(newXpMod,nextXp)+'/'+nextXp);
    setTimeout(function(){
      _pct('llResXpOld',Math.round((curXp/nextXp)*100));
      _pct('llResXpFill',Math.round((Math.min(newXpMod,nextXp)/nextXp)*100));
    },300);
    var lu=document.getElementById('llResLevelup');
    if(lu){
      lu.style.display=leveledUp?'flex':'none';
      if(leveledUp){
        _t('llResLuBadge',newLvl);
        _t('llResLuTitle','Nivel '+newLvl);
        _t('llResLuFrom',xs.nivel);
        _t('llResLuTo',newLvl);
      }
    }
  }
  var multMap2={facil:1,medio:1.5,dificil:2,legendario:3};
  var mult2=multMap2[d.diff]||1;
  var apGain=Math.round(Math.floor(score/50)*mult2);
  var mpGain=Math.round(Math.floor(score/30)*mult2);
  _t('llResAura',apGain);
  _t('llResAuraTotal',_fmt((d.prof.aura_points||0)+apGain));
  _t('llResMerit',mpGain);
  _t('llResMeritTotal',_fmt((d.prof.merit_pm||0)+mpGain));
  var conf=document.getElementById('llConfetti'); if(conf) conf.style.display='block';
  var ov=document.getElementById('llRes'); if(ov) ov.style.display='flex';
  _llLogSession();
}

function llResClose(){
  var ov=document.getElementById('llRes'); if(ov) ov.style.display='none';
  var conf=document.getElementById('llConfetti'); if(conf) conf.style.display='none';
}
function llResShare(){
  var d=_llPopupData();
  var txt='¡Completé "'+( d.s.title||'una canción')+'" en LyricLab con '+totalScore+' puntos y '+d.acc+'% de precisión! 🎵 #AuraLanguages';
  if(navigator.share){navigator.share({text:txt}).catch(function(){});}
  else if(navigator.clipboard){navigator.clipboard.writeText(txt);}
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

// ── RÉCORD PERSISTENTE ────────────────────────────────────────────────────────
async function loadRecord(songId, difficulty){
  const recEl=document.getElementById('recordScore');
  if(!recEl) return;
  recEl.textContent='0';
  if(!window._aura||!_aura.userId||!_aura.sb) return;
  const {data,error}=await _aura.sb
    .from('lyriclab_scores')
    .select('best_score')
    .eq('user_id',_aura.userId)
    .eq('song_id',songId)
    .eq('difficulty',difficulty)
    .maybeSingle();
  if(!error&&data) recEl.textContent=data.best_score;
}

async function saveRecord(songId, difficulty, score){
  if(!window._aura||!_aura.userId||!_aura.sb) return;
  await _aura.sb.from('lyriclab_scores').upsert({
    user_id: _aura.userId,
    song_id: songId,
    difficulty: difficulty,
    best_score: score,
    updated_at: new Date().toISOString()
  },{onConflict:'user_id,song_id,difficulty'});
}

function addScore(pts){
  const prevBuckets=Math.floor(totalScore/100);
  totalScore+=pts;
  const newBuckets=Math.floor(totalScore/100);
  const xpGained=(newBuckets-prevBuckets)*10;
  // Delegar XP al sistema global AuraXP
  if(xpGained>0 && window.AuraXP) AuraXP.addXP(xpGained);
  // Update donut (session score)
  var el=document.getElementById('currentScore'); if(el) el.textContent=totalScore;
  var donut=document.getElementById('donutFill');
  if(donut){var pct=Math.min(1,(totalScore%100)/100);donut.style.strokeDashoffset=264-(264*pct);}
  // Update record
  var recEl=document.getElementById('recordScore'); if(recEl&&totalScore>parseInt(recEl.textContent||0)){recEl.textContent=totalScore; if(_currentSongId) saveRecord(_currentSongId,karaoState.difficulty,totalScore);}
  showScorePopup(pts);
  if(window._aura&&pts>0) _aura.saveScore(pts);
}

function showScorePopup(pts){
  const popup=document.getElementById('scorePopup');
  popup.style.left='50%'; popup.style.top='38%'; popup.style.transform='translateX(-50%)';
  popup.className='score-popup '+(pts>=40?'pop-leg':pts>=25?'pop-dif':pts>=15?'pop-med':'pop-5');
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
        if(e.data===YT.PlayerState.ENDED){
          if(SONGS[currentSong].mode==='fragment'){
            const f=SONGS[currentSong].fragments[0];
            player.seekTo(f.start,true);player.playVideo();
          } else {
            // Karaoke song ended → show result
            llShowResult();
          }
        }
      }
    }
  });
}

// ── FETCH TITLES ──────────────────────────────────────────────────────────────
async function fetchTitles(){
  for(let i=1;i<SONGS.length;i++){
    if(SONGS[i].title!=='Cargando...') continue;
    try{
      const url='https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v='+SONGS[i].id+'&format=json';
      const res=await fetch(url);
      if(res.ok){
        const d=await res.json();
        SONGS[i].title=d.title||SONGS[i].title;
        SONGS[i].artist=d.author_name||'';
        buildList();
      }
    }catch(e){}
  }
}

// ── LOAD SONGS FROM SUPABASE ─────────────────────────────────────────────────
async function loadSongsFromSupabase(){
  try{
    const sb=window._aura&&window._aura.sb;
    if(!sb) return;
    // Detectar idioma activo
    const lang=(localStorage.getItem('aura_lang'))||
               (window._aura&&window._aura.active_language)||'en';
    const {data,error}=await sb.from('lyriclab_songs')
      .select('*').eq('activo',true).eq('language',lang).order('orden');
    if(error) { console.warn('LyricLab Supabase error:',error); return; }
    if(!data||!data.length){
      // Sin canciones para este idioma — mostrar lista vacía
      SONGS=[];
      buildList();
      return;
    }
    const dbSongs=data.map(row=>({
      id: row.youtube_id,
      title: row.title||'Sin título',
      artist: row.artist||'',
      difficulty: row.difficulty||'intermedio',
      levelRequired: row.level_required||1,
      mode: 'karaoke',
      lyrics: Array.isArray(row.lyrics_json)?row.lyrics_json:[]
    }));
    // Reemplazar SONGS completamente con las del idioma activo
    SONGS=dbSongs;
    for(let _i=SONGS.length-1;_i>0;_i--){const _j=Math.floor(Math.random()*(_i+1));[SONGS[_i],SONGS[_j]]=[SONGS[_j],SONGS[_i]];}
    currentSong=0;
    buildList();
    // Iniciar la primera canción del idioma correcto a través de loadSong
    // (esto muestra el selector de dificultad y carga el player con el video correcto)
    loadSong(0);
  }catch(e){console.warn('LyricLab: no se pudo cargar desde Supabase',e);}
}

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  buildList();
  fetchTitles();
  // NO iniciamos loadSong(0) aquí — lo hace loadSongsFromSupabase con el idioma correcto
  // Init AuraXP (carga XP global del usuario y actualiza la barra)
  setTimeout(function(){
    if(window.AuraXP) AuraXP.init();
  }, 1000);
  // Load DB songs after a short delay to allow aura-supabase.js to init
  setTimeout(loadSongsFromSupabase, 800);
});

// Recargar canciones al cambiar de idioma
document.addEventListener('aura:session', function(){
  loadSongsFromSupabase();
});

// ── TAB HELPERS ───────────────────────────────────────────────────────────────
function closeTab(xBtn){
  const tab=xBtn.parentElement;
  if(tab.classList.contains('active')) return;
  tab.remove();
}
function openTab(label,href){
  const bar=document.getElementById('tabBar');
  const existing=bar.querySelector('[data-href="'+href+'"]');
  if(existing){bar.querySelectorAll('.tb-tab').forEach(t=>t.classList.remove('active'));existing.classList.add('active');return;}
  const sep=document.createElement('span');sep.className='tb-sep';sep.textContent='›';
  const tab=document.createElement('div');tab.className='tb-tab active';tab.dataset.href=href;
  tab.innerHTML='<span class="tb-tab-label">'+label+'</span><span class="tb-tab-x" onclick="closeTab(this)">×</span>';
  tab.querySelector('.tb-tab-label').addEventListener('click',()=>window.location.href=href);
  bar.querySelectorAll('.tb-tab').forEach(t=>t.classList.remove('active'));
  bar.appendChild(sep);bar.appendChild(tab);
}

function toggleProfileMenu(e){
  e.stopPropagation();
  var menu=document.getElementById('profileMenu');
  if(menu.style.display==='none'){
    var rect=e.currentTarget.getBoundingClientRect();
    menu.style.display='block';menu.style.right='70px';menu.style.top=(rect.bottom+8)+'px';
  } else { menu.style.display='none'; }
}
document.addEventListener('click',function(){
  var menu=document.getElementById('profileMenu');
  if(menu) menu.style.display='none';
});

async function cerrarSesion(){
  if(window._aura) await _aura.signOut();
  else window.location.href='login.html';
}

function triggerPhotoUpload(){
  var inp=document.getElementById('photoInput');
  if(!inp){
    inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.id='photoInput';inp.style.display='none';document.body.appendChild(inp);
    inp.onchange=function(){
      if(!inp.files[0]) return;
      var reader=new FileReader();
      reader.onload=function(ev){
        var src=ev.target.result;
        _applyAvatar(src);
        try{localStorage.setItem('aura_profile_photo',src);}catch(e){}
        if(window._aura) _aura.uploadAvatar(inp.files[0]);
      };
      reader.readAsDataURL(inp.files[0]);
    };
  }
  inp.click();
}
function _applyAvatar(src){
  ['tbAvatar','srProfile'].forEach(function(id){
    var el=document.getElementById(id);
    if(el){el.textContent='';el.style.backgroundImage='url('+src+')';el.style.backgroundSize='cover';el.style.backgroundPosition='center';}
  });
}
// Cargar foto guardada (sincronizada con dashboard)
(function(){
  try{
    var saved=localStorage.getItem('aura_profile_photo');
    if(saved) _applyAvatar(saved);
  }catch(e){}
})();

(function(){
  function auraToggleProfile(e){e&&e.stopPropagation();var dd=document.getElementById('auraProfileDropdown');if(!dd)return;dd.style.display=dd.style.display==='flex'?'none':'flex';}
  window.auraToggleProfile=auraToggleProfile;
  document.addEventListener('click',function(){var dd=document.getElementById('auraProfileDropdown');if(dd)dd.style.display='none';});
  var pw=document.getElementById('auraProfileWidget');if(pw)pw.addEventListener('click',function(e){e.stopPropagation();});
  var _st='online';
  window.auraToggleStatus=function(e){e&&e.stopPropagation();_st=_st==='online'?'away':'online';var dot=document.getElementById('auraStatusDot');var txt=document.getElementById('auraStatusText');var pill=document.getElementById('auraStatusPill');var lbl=_st==='online'?'En línea':'Ausente';if(dot){dot.style.background=_st==='online'?'#7be37b':'#f59e0b';dot.style.boxShadow=_st==='online'?'0 0 6px rgba(123,227,123,.5)':'0 0 6px rgba(245,158,11,.5)';}if(txt)txt.textContent=lbl;if(pill){pill.textContent=lbl;pill.style.background=_st==='online'?'rgba(123,227,123,.12)':'rgba(245,158,11,.12)';pill.style.borderColor=_st==='online'?'rgba(123,227,123,.25)':'rgba(245,158,11,.25)';pill.style.color=_st==='online'?'#7be37b':'#f59e0b';}};
  window.auraLogout=function(){try{localStorage.clear();sessionStorage.clear();}catch(e){}window.location.href='login.html';};
})();

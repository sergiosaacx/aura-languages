/* admin-examen-shell.js — lógica del shell del editor: tabs, hero card, navegación */

function applyVersion(v){
  // 1. Update CEFR pill
  const meta = VERSION_META[v];
  const pill = document.querySelector('.cefr-pill span:last-child');
  if(pill) pill.innerHTML = `<span class="lvl">${meta.lvl}</span> · ${meta.label}`;

  // 2. Inject mid content (skip V5 — hardcoded)
  if(VERSION_MID[v]){
    const mid = VERSION_MID[v];
    document.querySelectorAll('.mid-content').forEach(el=>{
      const skill = el.dataset.skill;
      if(skill === 'listen') return; // skip: handled by examen-listening-engine.js
      if(mid[skill]){
        el.innerHTML = mid[skill];
        // Force-reload iframes (innerHTML blocks iframe loading in Chrome)
        el.querySelectorAll('iframe').forEach(iframe=>{
          const ni = document.createElement('iframe');
          Array.from(iframe.attributes).forEach(a=>ni.setAttribute(a.name,a.value));
          iframe.parentNode.replaceChild(ni, iframe);
        });
      }
    });
  }

  // 3. Override skillData with version-specific data
  if(VERSION_SD[v]){
    Object.keys(VERSION_SD[v]).forEach(k=>{ skillData[k] = VERSION_SD[v][k]; });
  }

  // 4. Re-apply active skill to hero card
  const activeSkill = document.querySelector('.tab.active')?.dataset.skill || 'vocab';
  applySkill(activeSkill);
  // examListeningInitialHook
  if(activeSkill === "listen" && typeof window.initExamListening === "function"){
    document.body.classList.add("exl-listen-active");
    var _ar = (typeof getCurrentRank==="function") ? getCurrentRank() : (document.body.dataset.examRank || "bronce");
    setTimeout(function(){ window.initExamListening({rank:_ar, lang: localStorage.getItem("aura_lang")||"en"}); }, 100);
  }
  updateRightSlot();

  // 5. Re-init tinder cards
  document.querySelectorAll('.tinder-panel').forEach(panel=>{
    const card = panel.querySelector('.tc-front');
    const btnNo = panel.querySelector('.tc-btn.no');
    const btnYes = panel.querySelector('.tc-btn.yes');
    if(!card||!btnNo||!btnYes) return;
    btnNo.onclick = ()=>{card.classList.add('swipe-out-no');setTimeout(()=>card.classList.remove('swipe-out-no','swiping-no'),420);};
    btnYes.onclick = ()=>{card.classList.add('swipe-out-yes');setTimeout(()=>card.classList.remove('swipe-out-yes','swiping-yes'),420);};
    btnNo.onmouseenter=()=>card.classList.add('swiping-no');
    btnNo.onmouseleave=()=>card.classList.remove('swiping-no');
    btnYes.onmouseenter=()=>card.classList.add('swiping-yes');
    btnYes.onmouseleave=()=>card.classList.remove('swiping-yes');
  });
}

// Auto-apply version on load

const heroCard = document.querySelector('.hero-card');
const tabs = document.querySelectorAll('.tab');

function applySkill(key){
  const d = skillData[key];
  if(!d) return;

  // typography poster (background bigword)
  const typo = heroCard.querySelector('.hc-typo b');
  typo.textContent = d.typo;
  typo.style['-webkit-text-stroke'] = `1.5px ${d.color}30`;

  // word
  const word = heroCard.querySelector('.hc-word');
  word.textContent = d.word;
  word.style.background = `linear-gradient(180deg,#fff 30%,${d.color})`;
  word.style.webkitBackgroundClip='text';word.style.backgroundClip='text';
  word.style.filter = `drop-shadow(0 6px 30px ${d.color}50)`;

  // ipa, pos, chip, rating
  heroCard.querySelector('.hc-ipa').textContent = d.ipa;
  heroCard.querySelector('.hc-ipa').style.color = d.color;
  heroCard.querySelector('.hc-pos').innerHTML = d.pos;
  heroCard.querySelector('.hc-chip').innerHTML = `<span class="icon">≡</span> ${d.chip.replace('≡','').trim()}`;
  heroCard.querySelector('.hc-chip .icon').style.color = d.color;
  heroCard.querySelector('.hc-rating b').textContent = d.rating;

  // audio btn color
  const audio = heroCard.querySelector('.hc-audio');
  audio.style.color = d.color;
  audio.style.background = `${d.color}1a`;
  audio.style.borderColor = `${d.color}50`;

  // question label + opts
  heroCard.querySelector('.hc-q-label').textContent = d.qLabel;
  const optsContainer = heroCard.querySelector('.hc-quiz');
  // keep label as first child, remove existing opt buttons
  optsContainer.querySelectorAll('.hc-opt').forEach(o=>o.remove());
  d.opts.forEach(opt=>{
    const btn = document.createElement('button');
    btn.className = 'hc-opt' + (opt.sel ? ' selected' : '');
    btn.innerHTML = `<b>${opt.l}</b><span>${opt.t}</span>`;
    if(opt.sel){
      btn.style.background = `${d.color}22`;
      btn.style.borderColor = `${d.color}80`;
      btn.style.boxShadow = `0 0 0 3px ${d.color}1f`;
      btn.querySelector('b').style.background = d.color;
      btn.querySelector('b').style.borderColor = d.color;
      btn.querySelector('b').style.color = '#0a0a0a';
    }
    optsContainer.appendChild(btn);

    btn.addEventListener('click',()=>{
      optsContainer.querySelectorAll('.hc-opt').forEach(o=>{
        o.classList.remove('selected');
        o.style.background='';o.style.borderColor='';o.style.boxShadow='';
        const bb=o.querySelector('b'); bb.style.background='';bb.style.borderColor='';bb.style.color='';
      });
      btn.classList.add('selected');
      btn.style.background = `${d.color}22`;
      btn.style.borderColor = `${d.color}80`;
      btn.style.boxShadow = `0 0 0 3px ${d.color}1f`;
      const bb=btn.querySelector('b'); bb.style.background=d.color;bb.style.borderColor=d.color;bb.style.color='#0a0a0a';
    });
  });

  // hero card background tint
  heroCard.querySelector('.hc-typo').style.opacity = '.85';
  // pulse dot color in tab
  const activeTabDot = document.querySelector('.tab.active .dot');
  if(activeTabDot){
    activeTabDot.style.background = d.color;
    activeTabDot.style.boxShadow = `0 0 8px ${d.color}`;
  }
}

tabs.forEach(t=>{
  t.addEventListener('click',()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    // ensure pulse dot exists on active tab
    if(!t.querySelector('.dot')){
      const dot = document.createElement('span');
      dot.className='dot';
      t.prepend(dot);
    }
    // remove dots from others
    tabs.forEach(x=>{
      if(x!==t){
        const d = x.querySelector('.dot');
        if(d) d.remove();
      }
    });
    const skill = t.dataset.skill;
    applySkill(skill);
    swapMidContent(skill);
    if(skill==='listen' && typeof window.initExamListening==='function'){
      document.body.classList.add('exl-listen-active');
      var _r = (typeof getCurrentRank==='function') ? getCurrentRank() : (document.body.dataset.examRank || 'bronce');
      window.initExamListening({rank:_r, lang: localStorage.getItem('aura_lang')||'en'});
    } else {
      document.body.classList.remove('exl-listen-active');
      if(typeof window.stopExamListening==='function') window.stopExamListening();
    }
    updateRightSlot();
  });
});

// ====== MID content swap ======
const midContents = [...document.querySelectorAll('.mid-content')];
function swapMidContent(skill){
  midContents.forEach(c=>c.classList.toggle('active', c.dataset.skill === skill));
}

// ====== RIGHT next-slot — replaces the FAB ======
const tabList = [...tabs];
const nextSlot = document.querySelector('.next-slot');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const nbSub = document.getElementById('nbSub');
const nextDots = document.getElementById('nextDots');
const slotHeader = document.querySelector('.next-slot .r-card-h h5');

function activeIndex(){
  return tabList.findIndex(t=>t.classList.contains('active'));
}
function updateRightSlot(){
  const idx = activeIndex();
  const t = tabList[idx];
  const skill = t.dataset.skill;
  const d = skillData[skill];

  // mark passed tabs as done
  tabList.forEach((x,i)=>{
    if(i < idx) x.classList.add('done');
    else x.classList.remove('done');
  });

  // slot color + header
  nextSlot.style.setProperty('--c', d.color);
  slotHeader.textContent = `Avance · paso ${idx + 1} / ${tabList.length}`;

  // dots
  nextDots.innerHTML = '';
  tabList.forEach((_,i)=>{
    const dot = document.createElement('div');
    dot.className = 'nd' + (i < idx ? ' done' : i === idx ? ' now' : '');
    nextDots.appendChild(dot);
  });

  // prev btn label
  if(idx > 0){
    const prev = tabList[idx-1];
    prevBtn.disabled = false;
    prevBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M19 12H5M11 19l-7-7 7-7"/></svg> Anterior · ${prev.dataset.skill}`;
  } else {
    prevBtn.disabled = true;
    prevBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M19 12H5M11 19l-7-7 7-7"/></svg> primera prueba`;
  }

  // next btn label + sub
  const last = idx === tabList.length - 1;
  const nextSkill = !last ? tabList[idx+1].dataset.skill : null;
  const nextTimes = {listen:'8 min',read:'10 min',vocab:'6 min',phrasal:'5 min',slang:'5 min',write:'12 min',speak:'6 min'};
  if(last){
    nextBtn.classList.add('last');
    nextBtn.querySelector('.nb-label').textContent = 'Terminar examen';
    nbSub.textContent = 'ver resultados · top 1 %';
  } else {
    nextBtn.classList.remove('last');
    nextBtn.querySelector('.nb-label').textContent = 'Siguiente';
    nbSub.textContent = `${nextSkill} · ${nextTimes[nextSkill] || ''}`;
  }
}

prevBtn.addEventListener('click', ()=>{
  const idx = activeIndex();
  if(idx > 0) tabList[idx-1].click();
});
nextBtn.addEventListener('click', ()=>{
  const idx = activeIndex();
  if(idx < tabList.length - 1){
    tabList[idx+1].click();
    window.scrollTo({top:0, behavior:'smooth'});
  } else {
    nextBtn.style.transform='scale(.96)';
    setTimeout(()=>nextBtn.style.transform='',180);
  }
});

// ====== Scoreboard timer (cronómetro en vivo) ======
const examElapsed = document.getElementById('examElapsed');
let elapsedSec = 0;
setInterval(()=>{
  elapsedSec++;
  const m = String(Math.floor(elapsedSec/60)).padStart(2,'0');
  const s = String(elapsedSec%60).padStart(2,'0');
  if(examElapsed) examElapsed.textContent = `${m}:${s}`;
},1000);

// ====== Option clicks within mid panels ======
document.addEventListener('click', e=>{
  // sentence MC (vocab)
  const smc = e.target.closest('.smc-btn');
  if(smc){
    smc.closest('.sentence-mc').querySelectorAll('.smc-btn').forEach(b=>b.classList.remove('selected'));
    smc.classList.add('selected');
  }
  // family pill (vocab)
  const fp = e.target.closest('.fam-pill');
  if(fp){
    fp.closest('.fam-pills').querySelectorAll('.fam-pill').forEach(b=>b.classList.remove('selected'));
    fp.classList.add('selected');
  }
  // tf button (reading)
  const tf = e.target.closest('.tf-btn');
  if(tf){
    tf.closest('.tf-btns').querySelectorAll('.tf-btn').forEach(b=>b.classList.remove('selected'));
    tf.classList.add('selected');
  }
});

// ====== Tinder flashcard swipe (Phrasal / Slang) ======
document.querySelectorAll('.tinder-panel').forEach(panel=>{
  const card = panel.querySelector('.tc-front');
  const btnNo = panel.querySelector('.tc-btn.no');
  const btnYes = panel.querySelector('.tc-btn.yes');
  if(!card) return;
  btnNo.addEventListener('mouseenter',()=>card.classList.add('swiping-no'));
  btnNo.addEventListener('mouseleave',()=>card.classList.remove('swiping-no'));
  btnYes.addEventListener('mouseenter',()=>card.classList.add('swiping-yes'));
  btnYes.addEventListener('mouseleave',()=>card.classList.remove('swiping-yes'));
  btnNo.addEventListener('click',()=>{card.classList.add('swipe-out-no');setTimeout(()=>{card.classList.remove('swipe-out-no','swiping-no');},420);});
  btnYes.addEventListener('click',()=>{card.classList.add('swipe-out-yes');setTimeout(()=>{card.classList.remove('swipe-out-yes','swiping-yes');},420);});
});

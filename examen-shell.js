/* examen-shell.js — lógica compartida del examen: tabs, hero card, navegación, timer */

// Tab switching — swap LEFT hero card content per skill
const skillData = {
  listen:{
    word:'Mad Men · pitch',
    typo:'Listening',
    ipa:'audio 03 · 0:54 / 1:24',
    pos:'C1 · cinema · monologue',
    chip:'≡ 03 / 05',
    rating:'C1',
    color:'#7CB2FF',
    qLabel:'¿qué es la publicidad según Don?',
    opts:[
      {l:'A',t:'Una forma de vender productos nuevos.'},
      {l:'B',t:'Una promesa de felicidad y aprobación.',sel:true},
      {l:'C',t:'Una manipulación de los miedos del consumidor.'},
      {l:'D',t:'Una herramienta para informar al público.'}
    ],
    bg:'radial-gradient(380px 600px at 90% 10%,rgba(124,178,255,.22),transparent 60%),radial-gradient(420px 500px at 0% 100%,rgba(167,139,250,.16),transparent 55%)'
  },
  read:{
    word:'Quiet Tyranny',
    typo:'Reading',
    ipa:'The Atlantic · ensayo · 642 palabras',
    pos:'C1 · essay · long-form',
    chip:'≡ 1 lectura',
    rating:'C1',
    color:'#A78BFA',
    qLabel:'¿cuál es la tesis principal?',
    opts:[
      {l:'A',t:'La tecnología es enemiga de la productividad.'},
      {l:'B',t:'La conveniencia moldea silenciosamente nuestras aspiraciones.',sel:true},
      {l:'C',t:'Los smartphones son herramientas dañinas.'},
      {l:'D',t:'La friction es necesaria para el deseo humano.'}
    ],
    bg:'radial-gradient(380px 600px at 90% 10%,rgba(167,139,250,.32),transparent 60%),radial-gradient(420px 500px at 0% 100%,rgba(91,233,246,.10),transparent 55%)'
  },
  vocab:{
    word:'Ubiquitous',
    typo:'Ubiquitous',
    ipa:'/juːˈbɪk.wɪ.təs/',
    pos:'adj. · formal · academic',
    chip:'≡ 07 / 20',
    rating:'C1',
    color:'#5BE9F6',
    qLabel:'elige la mejor definición',
    opts:[
      {l:'A',t:'Extremely rare or hard to find.'},
      {l:'B',t:'Present, appearing, or found everywhere.',sel:true},
      {l:'C',t:'Pertaining to ancient cultures.'},
      {l:'D',t:'Loud, attention-grabbing, or boisterous.'}
    ],
    bg:'radial-gradient(380px 600px at 90% 10%,rgba(91,233,246,.20),transparent 60%),radial-gradient(420px 500px at 0% 100%,rgba(167,139,250,.22),transparent 55%)'
  },
  phrasal:{
    word:'come across',
    typo:'Phrasal',
    ipa:'inf. + obj · serendipity',
    pos:'verb · informal · discovery',
    chip:'≡ 03 / 10',
    rating:'B2',
    color:'#FFD83D',
    qLabel:'completa la frase correctamente',
    opts:[
      {l:'A',t:'I _ a fascinating article last night.',sel:true},
      {l:'B',t:'She _ the deal against all odds.'},
      {l:'C',t:'He _ the breakup eventually.'},
      {l:'D',t:'I\'m _ the weekend.'}
    ],
    bg:'radial-gradient(380px 600px at 90% 10%,rgba(255,216,61,.20),transparent 60%),radial-gradient(420px 500px at 0% 100%,rgba(255,154,108,.10),transparent 55%)'
  },
  slang:{
    word:'spill the tea',
    typo:'Slang',
    ipa:'gen-z · social media',
    pos:'verb · informal · gossip',
    chip:'≡ 01 / 10',
    rating:'B2',
    color:'#FF73C9',
    qLabel:'¿qué le pide a su amiga?',
    opts:[
      {l:'A',t:'Contarle el chisme con detalles.',sel:true},
      {l:'B',t:'Que le pase su taza de té.'},
      {l:'C',t:'Que deje de hablar.'},
      {l:'D',t:'Que pida disculpas.'}
    ],
    bg:'radial-gradient(380px 600px at 90% 10%,rgba(255,115,201,.22),transparent 60%),radial-gradient(420px 500px at 0% 100%,rgba(167,139,250,.16),transparent 55%)'
  },
  write:{
    word:'Writing',
    typo:'Writing',
    ipa:'IELTS Task 2 · 250–300 palabras',
    pos:'essay · 4 párrafos · formal',
    chip:'≡ 1 ensayo',
    rating:'C1',
    color:'#7BE37B',
    rubric:[
      {dot:'#7BE37B',name:'Tarea',desc:'¿Discutiste ambas vistas y diste tu opinión?',pts:'25'},
      {dot:'#7CB2FF',name:'Gramática',desc:'Estructuras complejas y registro académico',pts:'25'},
      {dot:'#A78BFA',name:'Vocabulario',desc:'Vocabulario C1–C2, variado y preciso',pts:'25'},
      {dot:'#FF9A6C',name:'Cohesión',desc:'Contraargumento, conectores formales y lógica',pts:'25'}
    ],
    wordRange:'250 – 300',
    bg:'radial-gradient(380px 600px at 90% 10%,rgba(123,227,123,.18),transparent 60%),radial-gradient(420px 500px at 0% 100%,rgba(91,233,246,.08),transparent 55%)'
  },
  speak:{
    word:'Frictionless',
    typo:'Speaking',
    ipa:'/ˈfrɪkʃ.ən.ləs ˈlɪv.ɪŋ/',
    pos:'lectura + libre · 90s',
    chip:'≡ 2 partes',
    rating:'C1',
    color:'#FF9A6C',
    qLabel:'lee y luego responde libre',
    opts:[
      {l:'A',t:'Parte A — lectura en voz alta.'},
      {l:'B',t:'Parte B — respuesta libre 90s.',sel:true},
      {l:'C',t:'Pronunciación + ritmo + fluidez.'},
      {l:'D',t:'Acento opcional.'}
    ],
    bg:'radial-gradient(380px 600px at 90% 10%,rgba(255,154,108,.22),transparent 60%),radial-gradient(420px 500px at 0% 100%,rgba(255,115,201,.10),transparent 55%)'
  }
};


// ════════════════════════════════════════════════════════════
//  MULTI-VERSION SUPPORT — 5 rank transitions
//  V5 content (C1→C2) is already hardcoded in HTML above.
//  V1–V4 are injected here when AURA_EXAM_VERSION is set.
// ════════════════════════════════════════════════════════════
var EXAM_VERSION = window.AURA_EXAM_VERSION || 5; // se sobreescribe tras auth

const VERSION_META = {
  1:{cefr:'A1 → A2', lvl:'A1', label:'Bronce → Plata'},
  2:{cefr:'A2 → B1', lvl:'A2', label:'Plata → Oro'},
  3:{cefr:'B1 → B2', lvl:'B1', label:'Oro → Platino'},
  4:{cefr:'B2 → C1', lvl:'B2', label:'Platino → Diamante'},
  5:{cefr:'C1 → C2', lvl:'C1', label:'Diamante → Challenger'},
};

// skillData per version (hero card)
// applyVersion — swap mid content + skillData for selected version
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
      if(skill === 'vocab') return;  // skip: handled by examen-vocab-engine.js
      if(skill === 'phrasal'){ if(window._pvReload) window._pvReload(v); return; } // skip: phrasal engine dinámico
      if(skill === 'slang'){ if(window._svReload) window._svReload(v); return; } // skip: manejado por examen-slang-hooks.js

      if(skill === 'read') return; // skip: handled by examen-reading-engine.js
      if(skill === 'write'){ _applyWriteRandom(v); return; } // pick random text from pool
      if(mid[skill]){
        el.innerHTML = mid[skill];
        // Force-reload iframes (innerHTML injection blocks iframe loading in Chrome)
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
  if(activeSkill !== 'listen') applySkill(activeSkill); // listen engine maneja su propia hero card
  // examVocabInitialHook
  if(activeSkill === "vocab" && typeof window.initExamVocab === "function"){
    var _arv = (typeof getCurrentRank==="function") ? getCurrentRank() : (document.body.dataset.examRank || "bronce");
    setTimeout(function(){ window.initExamVocab({rank:_arv, lang: localStorage.getItem("aura_lang")||"en"}); }, 200);
  }
  // examReadingInitialHook
  if(activeSkill === "read" && typeof window.initExamReading === "function"){
    var _arr = (typeof getCurrentRank==="function") ? getCurrentRank() : (document.body.dataset.examRank || "bronce");
    setTimeout(function(){ window.initExamReading({rank:_arr, lang: localStorage.getItem("aura_lang")||"en"}); }, 150);
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



  // question label + opts (write = rubric, others = A/B/C/D)
  const optsContainer = heroCard.querySelector('.hc-quiz');
  delete optsContainer.dataset.answered;
  optsContainer.querySelectorAll('.hc-opt,.hc-rubric-item,.hc-word-range').forEach(o=>o.remove());
  if(key==='write' && d.rubric){
    heroCard.querySelector('.hc-q-label').textContent = 'así te evaluamos';
    d.rubric.forEach(r=>{
      const item=document.createElement('div');
      item.className='hc-rubric-item';
      item.innerHTML=`<div class="hc-rubric-dot" style="background:${r.dot};"></div><div style="flex:1;"><div class="hc-rubric-name">${r.name}</div><div class="hc-rubric-desc">${r.desc}</div></div><div class="hc-rubric-pts">${r.pts} pts</div>`;
      optsContainer.appendChild(item);
    });
    const wr=document.createElement('div');
    wr.className='hc-word-range';
    wr.innerHTML=`<span class="hc-word-range-lbl">objetivo de palabras</span><span class="hc-word-range-val">${d.wordRange} palabras</span>`;
    optsContainer.appendChild(wr);
  } else {
  heroCard.querySelector('.hc-q-label').textContent = d.qLabel;
  if(d.opts) d.opts.forEach(opt=>{
    const btn = document.createElement('button');
    btn.className = 'hc-opt';
    btn.innerHTML = `<b>${opt.l}</b><span>${opt.t}</span>`;
    if(opt.sel) btn.dataset.correct = '1';
    optsContainer.appendChild(btn);

    if(key === 'vocab'){
      btn.addEventListener('click',()=>{
        if(optsContainer.dataset.answered) return;
        optsContainer.dataset.answered = '1';
        optsContainer.querySelectorAll('.hc-opt').forEach(o=>{
          o.style.pointerEvents = 'none';
          if(o.dataset.correct==='1'){ o.classList.add('vc-correct'); }
        });
        if(btn.dataset.correct!=='1'){ btn.classList.add('vc-wrong'); }
        const vt1 = document.getElementById('vtask1');
        if(vt1) vt1.classList.remove('vocab-task-locked');
        const sv1 = document.getElementById('vsb1');
        if(sv1){ sv1.classList.remove('vsb-active'); sv1.classList.add('vsb-done'); }
        const sv2 = document.getElementById('vsb2');
        if(sv2){ sv2.classList.add('vsb-active'); }
        if(window.AuraRightPanel) AuraRightPanel.recordAnswer(btn.dataset.correct==='1');
      });
    } else if(key === 'read'){
      btn.addEventListener('click',()=>{
        if(optsContainer.dataset.answered) return;
        optsContainer.dataset.answered = '1';
        optsContainer.querySelectorAll('.hc-opt').forEach(o=>{
          o.style.pointerEvents = 'none';
          if(o.dataset.correct==='1'){ o.classList.add('vc-correct'); }
        });
        if(btn.dataset.correct!=='1'){ btn.classList.add('vc-wrong'); }
        if(window.AuraRightPanel) AuraRightPanel.recordAnswer(btn.dataset.correct==='1');
        // Desbloquear panel V/F
        var tfPanel = document.querySelector('.mid-content[data-skill="read"] .exam-panel.tf-locked');
        if(tfPanel) tfPanel.classList.remove('tf-locked');
      });
    } else {
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
    }
  });
  } // end else (non-write)
  // vocab: lock vtask1 + vtask2 and reset step bar on each render
  if(key === 'vocab'){
    const vt1 = document.getElementById('vtask1');
    if(vt1) vt1.classList.add('vocab-task-locked');
    const vt2 = document.getElementById('vtask2');
    if(vt2) vt2.classList.add('vocab-task-locked');
    const sv1 = document.getElementById('vsb1');
    if(sv1){ sv1.classList.add('vsb-active'); sv1.classList.remove('vsb-done'); }
    const sv2 = document.getElementById('vsb2');
    if(sv2){ sv2.classList.remove('vsb-active'); sv2.classList.remove('vsb-done'); }
    const sv3 = document.getElementById('vsb3');
    if(sv3){ sv3.classList.remove('vsb-active'); sv3.classList.remove('vsb-done'); }
  }

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
    document.body.classList.toggle('write-active', skill==='write');
    if(window.AuraRightPanel) AuraRightPanel.update({correct:0, incorrect:0});
    if(skill !== 'listen') try { applySkill(skill); } catch(e){ console.warn('[applySkill]',e); } // listen engine maneja su propia hero card
    if(skill === 'phrasal' && window._pvRender) window._pvRender();
    if(skill === 'slang' && window._svRender){
      var _spk=document.querySelector('.mid-content[data-skill="speak"]');
      if(_spk) _spk.style.cssText=''; // limpiar inline styles residuales del Speaking engine
      window._svRender();
    }

    swapMidContent(skill);
    if(skill==='vocab' && typeof window.initExamVocab==='function'){
      var _rv = (typeof getCurrentRank==='function') ? getCurrentRank() : (document.body.dataset.examRank||'bronce');
      window.initExamVocab({rank:_rv, lang: localStorage.getItem('aura_lang')||'en'});
    }
    if(skill==='read' && typeof window.initExamReading==='function'){
      var _rr = (typeof getCurrentRank==='function') ? getCurrentRank() : (document.body.dataset.examRank||'bronce');
      setTimeout(function(){ window.initExamReading({rank:_rr, lang:localStorage.getItem('aura_lang')||'en'}); }, 100);
    }
    if(window.AuraRightPanel) AuraRightPanel.switchSkill(skill);
    if(skill==='vocab') setTimeout(_vocabInitTasks, 50);
    if(skill==='write'){ setTimeout(function(){ if(window._writeInitEngine) window._writeInitEngine(); },150); }
    /* Speaking: manejado por examen-speaking-hooks.js */
    updateRightSlot();
  });
});

// ====== MID content swap ======
const midContents = [...document.querySelectorAll('.mid-content')];
function swapMidContent(skill){
  midContents.forEach(c=>c.classList.toggle('active', c.dataset.skill === skill));
}

// ====== RIGHT next-slot — replaces the FAB ======
// Panel derecho: inicializar ANTES de que se capturen los const del DOM
if(window.AuraRightPanel && !window._erpInited){
  window._erpInited = true;
  AuraRightPanel.init({ currentSkill:'vocab', rankLabel:'A1 · Bronce', targetLabel:'A2 · Plata', wordsTotal:5 });
}
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


// ====== Vocabulary — inicializar evaluación por tareas ======

// ====== Option clicks within mid panels ======
document.addEventListener('click', e=>{
  // tf button (reading)
  const tf = e.target.closest('.tf-btn');
  if(tf){
    var tfBtns = tf.closest('.tf-btns');
    if(tfBtns.dataset.answered) return;
    tfBtns.dataset.answered = '1';
    tfBtns.querySelectorAll('.tf-btn').forEach(b=>{
      b.style.pointerEvents = 'none';
      b.classList.remove('selected');
      if(b.dataset.correct==='1') b.classList.add('vc-correct');
    });
    if(tf.dataset.correct!=='1') tf.classList.add('vc-wrong');
    else tf.classList.add('vc-correct');
    tf.classList.add('selected');
    if(window.AuraRightPanel) AuraRightPanel.recordAnswer(tf.dataset.correct==='1');
  }
});

// ====== Tinder flashcard swipe — Slang (Phrasal handled separately below) ======
document.querySelectorAll('.tinder-panel').forEach(panel=>{
  if(panel.closest('[data-skill="phrasal"]')||panel.closest('[data-skill="slang"]')) return;
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





(function(){
  var btn = document.getElementById('filterBtn');
  var drop = document.getElementById('versionDrop');
  if(!btn || !drop) return;

  btn.addEventListener('click', function(e){
    e.stopPropagation();
    drop.classList.toggle('open');
  });
  document.addEventListener('click', function(){
    drop.classList.remove('open');
  });
  drop.querySelectorAll('.vd-btn').forEach(function(b){
    b.addEventListener('click', function(e){
      e.stopPropagation();
      var v = parseInt(b.dataset.v);
      drop.querySelectorAll('.vd-btn').forEach(function(x){ x.classList.remove('active'); });
      b.classList.add('active');
      drop.classList.remove('open');
      applyVersion(v);
      _loadVocabSession(v);
      _loadPublishedContent(v);
    });
  });
})();

// ── Carga contenido publicado desde Supabase (sobrescribe hardcoded si hay datos) ──
async function _loadPublishedContent(v){
  var sb = window._aura && window._aura.sb;
  if(!sb) return;
  var rank = (typeof RANK_BY_V_EXAM !== 'undefined' ? RANK_BY_V_EXAM[v] : null) || 'diamante';
  var lang = localStorage.getItem('aura_lang') || 'en';
  try{
    var res = await sb.from('exam_content').select('section,content')
      .eq('rank',rank).eq('language',lang)
      .in('section',['read','phrasal','slang','write'])
      .eq('active',true);
    if(res.error || !res.data || !res.data.length) return;
    var updated = false;
    res.data.forEach(function(row){
      var c = row.content;
      if(typeof c==='string'){ try{ c=JSON.parse(c); }catch(e){ return; } }
      if(!c) return;
      if(!VERSION_MID[v]) VERSION_MID[v]={};
      if(!VERSION_SD[v])  VERSION_SD[v]={};
      if(c.mid !== undefined){ VERSION_MID[v][row.section] = c.mid; updated=true; }
      if(c.sd  !== undefined){ VERSION_SD[v][row.section]  = c.sd;  updated=true; }
    });
    if(updated) applyVersion(v); // re-render con contenido publicado
  }catch(e){ console.warn('[published content]',e); }
}

// ── getCurrentRank: lee el rango real del usuario desde _aura ──
function getCurrentRank(){
  var lp = window._aura && window._aura.lang_progress;
  if(lp && lp.rango) return lp.rango.toLowerCase();
  var p = window._aura && window._aura.profile;
  if(p && p.rango) return p.rango.toLowerCase();
  return 'bronce';
}

// ── Ajustar EXAM_VERSION al rango del usuario tras cargar auth ──
var _RANK_TO_V = {bronce:1,plata:2,oro:3,platino:4,diamante:5,challenger:5};
function _setVersionFromRank(){
  var rank = getCurrentRank();
  var v = _RANK_TO_V[rank] || 5;
  if(v !== EXAM_VERSION){
    EXAM_VERSION = v;
    applyVersion(v);
    if(typeof _loadVocabSession === 'function') _loadVocabSession(v);
  }
}
// Primer render con el default (o AURA_EXAM_VERSION si viene inyectado)
applyVersion(EXAM_VERSION);
_applyWriteRandom(EXAM_VERSION);
// Cargar sesión vocab desde Supabase
setTimeout(function(){ _loadVocabSession(EXAM_VERSION); }, 300);
// Cargar contenido publicado por el admin (sobrescribe hardcoded si hay datos en Supabase)
setTimeout(function(){ _loadPublishedContent(EXAM_VERSION); }, 600);
// Cuando el perfil esté listo, ajustar al rango real del usuario
setTimeout(_setVersionFromRank, 2200);

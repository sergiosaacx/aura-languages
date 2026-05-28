/* ════════════════════════════════════════════════════════════════
   examen-vocab-engine.js  v1
   Motor del examen de vocabulario para examen-ascenso.html.
   · Carga palabras de Supabase (section='vocabulary', content_type='vocab_word')
   · Carga config (words_per_exam)
   · Selección aleatoria de N palabras del pool
   · Muestra una palabra a la vez con 3 pasos secuenciales:
       Paso 1 — Definición (en hero card, via skillData)
       Paso 2 — Contexto (vtask1 en mid panel)
       Paso 3 — Familia (vtask2 en mid panel)
   · Al completar los 3 pasos → siguiente palabra con reset total
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var RANK_BY_V = {1:'bronce',2:'plata',3:'oro',4:'platino',5:'diamante'};
var C_VOCAB = '#5BE9F6';
var C_VOCAB_RGB = '91,233,246';

/* ── Estado interno ──────────────────────────────────────────── */
var _words    = [];
var _config   = {words_per_exam: 5};
var _current  = 0;
var _running  = false;
var _defDone  = false;

/* ── Helper ──────────────────────────────────────────────────── */
function _sb(){ return (window._aura && window._aura.sb) ? window._aura.sb : null; }
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function _shuffle(arr){
  var a = arr.slice();
  for(var i = a.length-1; i > 0; i--){
    var j = Math.floor(Math.random()*(i+1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

/* ── Init ────────────────────────────────────────────────────── */
window.initExamVocab = async function(opts){
  opts = opts || {};
  var ver  = window.EXAM_VERSION || window.AURA_EXAM_VERSION || 1;
  var rank = opts.rank || RANK_BY_V[ver] || 'bronce';
  var lang = opts.lang || localStorage.getItem('aura_lang') || 'en';
  var sb   = _sb();
  if(!sb){ console.warn('[VocabEngine] Sin Supabase'); return; }

  // Config
  var cfgRes = await sb.from('exam_content').select('content')
    .eq('section','vocabulary').eq('content_type','vocab_config')
    .eq('rank',rank).eq('language',lang).maybeSingle();
  if(cfgRes.data && cfgRes.data.content){
    var c = cfgRes.data.content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c={};}}
    _config = c || {words_per_exam:5};
  }

  // Words
  var res = await sb.from('exam_content').select('content')
    .eq('section','vocabulary').eq('content_type','vocab_word')
    .eq('rank',rank).eq('language',lang).eq('active',true);
  if(res.error){ console.warn('[VocabEngine] load:', res.error); return; }

  var allWords = (res.data||[]).map(function(row){
    var c = row.content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){return null;}}
    return c;
  }).filter(function(w){ return w && (w.word||'').trim(); });

  if(!allWords.length){
    console.warn('[VocabEngine] No hay palabras en el pool para', rank, lang);
    return;
  }

  var N = Math.min(_config.words_per_exam || 5, allWords.length);
  _words  = _shuffle(allWords).slice(0, N);
  _current = 0;
  _running = true;

  _renderWord(_current);
};

/* ── Render de una palabra ───────────────────────────────────── */
function _renderWord(idx){
  var w = _words[idx];
  if(!w) return;
  _defDone = false;

  // Actualizar hero card via skillData + applySkill
  if(typeof skillData !== 'undefined'){
    skillData.vocab = {
      word  : w.word   || '',
      typo  : w.word   || '',
      ipa   : w.ipa    || '',
      pos   : w.pos    || '',
      chip  : String(idx+1).padStart(2,'0')+' / '+String(_words.length).padStart(2,'0'),
      rating: '',
      color : C_VOCAB,
      bg    : 'radial-gradient(380px 600px at 90% 10%,rgba('+C_VOCAB_RGB+',.18),transparent 60%),'+
              'radial-gradient(420px 500px at 0% 100%,rgba(167,139,250,.14),transparent 55%)',
      qLabel: _words.length > 0 ? (idx < _words.length ? 'elige la mejor definición' : '') : 'elige la mejor definición',
      opts  : _buildHeroOpts(w)
    };
  }
  if(typeof applySkill === 'function') applySkill('vocab');

  // Inyectar mid panel
  _renderMidPanel(w, idx);

  // Hookear clicks del hero card → avanzar a paso 2
  setTimeout(function(){
    var opts = document.querySelectorAll('.hc-quiz .hc-opt');
    opts.forEach(function(btn){
      btn.addEventListener('click', function(){
        if(!_defDone){ _defDone = true; _vocabDefAnswered(); }
      }, {once: true});
    });
  }, 80);
}

/* ── Opciones hero card (definición) ─────────────────────────── */
function _buildHeroOpts(w){
  var def = w.definition || {options:['','','',''], answer:'A'};
  return ['A','B','C','D'].map(function(l, i){
    return { l: l, t: def.options[i] || '', sel: def.answer === l };
  });
}

/* ── Mid panel: step bar + vtask1 + vtask2 ───────────────────── */
function _renderMidPanel(w, idx){
  var midEl = document.querySelector('.mid-content[data-skill="vocab"]');
  if(!midEl) return;

  var ctx = w.context || {options:['','','',''], answer:'A'};
  var fam = w.family  || {sentence1:'',options1:['','',''],answer1:'A',sentence2:'',options2:['','',''],answer2:'A'};
  var hasNext = idx < _words.length - 1;

  var SVG_ARROW = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

  // Step bar (Def=active, Ctx+Fam pending)
  var html =
    '<div class="vocab-step-bar">'+
    '<span class="vsb-step vsb-active" id="vsb1"><span class="vsb-dot"></span><span class="vsb-label">Definición</span></span>'+
    '<span class="vsb-sep"></span>'+
    '<span class="vsb-step" id="vsb2"><span class="vsb-dot"></span><span class="vsb-label">Contexto</span></span>'+
    '<span class="vsb-sep"></span>'+
    '<span class="vsb-step" id="vsb3"><span class="vsb-dot"></span><span class="vsb-label">Familia</span></span>'+
    '</div>';

  // vtask1 — Contexto (hidden until def answered)
  html += '<div class="exam-panel vocab-task-hidden" id="vtask1" style="--c:'+C_VOCAB_RGB+';">'+
    '<header class="ep-h">'+
    '<span class="ep-tag">tarea 2 · uso en contexto</span>'+
    '<span style="font-size:10px;color:var(--muted);">¿en cuál se usa correctamente <b style="color:var(--ink)">'+_esc(w.word)+'</b>?</span>'+
    '</header>'+
    '<div style="display:flex;flex-direction:column;gap:7px;">';
  ['A','B','C','D'].forEach(function(l,i){
    html += '<button class="hc-opt" data-correct="'+(ctx.answer===l?'1':'0')+'" onclick="window._vocabCtxClick(this)">'+
      '<b>'+l+'</b><span>'+_esc(ctx.options[i]||'')+'</span></button>';
  });
  html += '</div>'+
    '<div class="vocab-next-wrap">'+
    '<button class="vocab-next-btn" id="vocabNextBtn" onclick="vocabNext()" disabled>'+
    'Siguiente tarea '+SVG_ARROW+'</button>'+
    '</div></div>';

  // vtask2 — Familia (hidden until ctx answered)
  html += '<div class="exam-panel vocab-task-hidden" id="vtask2" style="--c:'+C_VOCAB_RGB+';">'+
    '<header class="ep-h">'+
    '<span class="ep-tag">tarea 3 · familia de palabras</span>'+
    '<span style="font-size:10px;color:var(--muted);">elige la forma correcta</span>'+
    '</header>';

  var s1disp = _esc(fam.sentence1||'').replace('___','<span class="blank">_____</span>');
  html += '<p style="font-size:12.5px;line-height:1.6;margin-bottom:8px;">"'+s1disp+'"</p>'+
    '<div class="fam-pills" id="fam-pills-1">';
  (fam.options1||['','','']).forEach(function(opt, i){
    var l = String.fromCharCode(65+i);
    html += '<button class="fam-pill" data-correct="'+(fam.answer1===l?'1':'0')+'" onclick="window._vocabFamClick(this,\'1\')">'+_esc(opt)+'</button>';
  });
  html += '</div>';

  var s2disp = _esc(fam.sentence2||'').replace('___','<span class="blank">_____</span>');
  html += '<p style="font-size:12.5px;line-height:1.6;margin:10px 0 8px;">"'+s2disp+'"</p>'+
    '<div class="fam-pills" id="fam-pills-2">';
  (fam.options2||['','','']).forEach(function(opt, i){
    var l = String.fromCharCode(65+i);
    html += '<button class="fam-pill" data-correct="'+(fam.answer2===l?'1':'0')+'" onclick="window._vocabFamClick(this,\'2\')">'+_esc(opt)+'</button>';
  });
  html += '</div>';

  var nextLabel = hasNext
    ? 'Siguiente palabra '+SVG_ARROW
    : 'Finalizar vocabulario ✓';
  html += '<div class="vocab-next-wrap" style="margin-top:14px;">'+
    '<button class="vocab-next-btn" id="vocabFinishBtn" onclick="window._vocabNextWord()" disabled>'+nextLabel+'</button>'+
    '</div></div>';

  midEl.innerHTML = html;
}

/* ── Paso 1 → 2: definición respondida en hero card ─────────── */
function _vocabDefAnswered(){
  var vsb1 = document.getElementById('vsb1');
  var vsb2 = document.getElementById('vsb2');
  var vtask1 = document.getElementById('vtask1');
  if(vsb1){ vsb1.classList.remove('vsb-active'); vsb1.classList.add('vsb-done'); }
  if(vsb2){ vsb2.classList.add('vsb-active'); }
  if(vtask1){
    vtask1.classList.remove('vocab-task-hidden');
    vtask1.classList.add('vocab-task-reveal');
    setTimeout(function(){ vtask1.scrollIntoView({behavior:'smooth',block:'nearest'}); }, 50);
  }
}

/* ── Click en opción de contexto ─────────────────────────────── */
window._vocabCtxClick = function(btn){
  var panel = btn.closest('.exam-panel');
  if(!panel) return;
  panel.querySelectorAll('.hc-opt').forEach(function(b){
    b.classList.remove('selected');
    b.style.background=''; b.style.borderColor=''; b.style.boxShadow='';
    var bb=b.querySelector('b'); if(bb){bb.style.background='';bb.style.borderColor='';bb.style.color='';}
  });
  btn.classList.add('selected');
  btn.style.background = C_VOCAB+'22';
  btn.style.borderColor = C_VOCAB+'80';
  btn.style.boxShadow = '0 0 0 3px '+C_VOCAB+'1f';
  var bb = btn.querySelector('b');
  if(bb){ bb.style.background=C_VOCAB; bb.style.borderColor=C_VOCAB; bb.style.color='#0a1a1e'; }
  var nb = document.getElementById('vocabNextBtn');
  if(nb) nb.disabled = false;
};

/* ── vocabNext: paso 2 → 3 ───────────────────────────────────── */
window.vocabNext = function(){
  var vsb2  = document.getElementById('vsb2');
  var vsb3  = document.getElementById('vsb3');
  var vtask2 = document.getElementById('vtask2');
  var btn   = document.getElementById('vocabNextBtn');
  if(vsb2){ vsb2.classList.remove('vsb-active'); vsb2.classList.add('vsb-done'); }
  if(vsb3){ vsb3.classList.add('vsb-active'); }
  if(vtask2){
    vtask2.classList.remove('vocab-task-hidden');
    vtask2.classList.add('vocab-task-reveal');
    setTimeout(function(){ vtask2.scrollIntoView({behavior:'smooth',block:'nearest'}); }, 50);
  }
  if(btn) btn.disabled = true;
};

/* ── Click en pill de familia ────────────────────────────────── */
window._vocabFamClick = function(btn, group){
  var row = document.getElementById('fam-pills-'+group);
  if(!row) return;
  row.querySelectorAll('.fam-pill').forEach(function(b){
    b.classList.remove('selected');
  });
  btn.classList.add('selected');
  // Revisar si ambas oraciones tienen selección
  setTimeout(_checkFamilyComplete, 20);
};

function _checkFamilyComplete(){
  var p1 = document.getElementById('fam-pills-1');
  var p2 = document.getElementById('fam-pills-2');
  var sel1 = p1 && p1.querySelector('.fam-pill.selected');
  var sel2 = p2 && p2.querySelector('.fam-pill.selected');
  if(sel1 && sel2){
    var fb = document.getElementById('vocabFinishBtn');
    if(fb) fb.disabled = false;
  }
}

/* ── Siguiente palabra ───────────────────────────────────────── */
window._vocabNextWord = function(){
  var vsb3 = document.getElementById('vsb3');
  if(vsb3){ vsb3.classList.remove('vsb-active'); vsb3.classList.add('vsb-done'); }
  _current++;
  if(_current >= _words.length){
    _vocabComplete();
    return;
  }
  _renderWord(_current);
};

/* ── Vocabulario completo ────────────────────────────────────── */
function _vocabComplete(){
  var midEl = document.querySelector('.mid-content[data-skill="vocab"]');
  if(midEl){
    midEl.innerHTML =
      '<div style="text-align:center;padding:40px 20px;">'+
      '<div style="font-size:40px;margin-bottom:14px;filter:drop-shadow(0 0 18px '+C_VOCAB+')">✓</div>'+
      '<div style="font-family:var(--mono);font-size:13px;font-weight:900;color:'+C_VOCAB+';letter-spacing:.08em;">VOCABULARIO COMPLETO</div>'+
      '<div style="font-size:11.5px;color:var(--muted);margin-top:8px;">'+_words.length+' '+(_words.length===1?'palabra':'palabras')+' completadas</div>'+
      '</div>';
  }
}

})();

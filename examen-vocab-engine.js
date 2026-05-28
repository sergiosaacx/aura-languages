/* ════════════════════════════════════════════════════════════════
   examen-vocab-engine.js  v2
   · Carga palabras de Supabase para el rango/idioma actual
   · Selección aleatoria de N palabras (words_per_exam)
   · Flujo por palabra: hero card (def) → vtask1 (ctx) → vtask2 (fam)
   · FIX v2: EXAM_VERSION accesible como global const (no window.*)
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var RANK_BY_V = {1:'bronce',2:'plata',3:'oro',4:'platino',5:'diamante'};
var C_VOCAB    = '#5BE9F6';
var C_VOCAB_R  = '91,233,246';

/* ── Estado ─────────────────────────────────────────────────── */
var _words   = [];
var _config  = {words_per_exam:5};
var _current = 0;
var _defDone = false;

/* ── Helpers ─────────────────────────────────────────────────── */
function _sb(){ return (window._aura && window._aura.sb) ? window._aura.sb : null; }
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function _shuffle(arr){
  var a=arr.slice();
  for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}
  return a;
}

/* ── Init ────────────────────────────────────────────────────── */
window.initExamVocab = async function(opts){
  // DEBUG: visible indicator
  var _midDbg = document.querySelector('.mid-content[data-skill="vocab"]');
  if(_midDbg) _midDbg.innerHTML = '<div style="color:#5BE9F6;text-align:center;padding:30px;font-family:monospace;font-size:12px;">⏳ VocabEngine iniciando...</div>';
  opts = opts||{};
  // EXAM_VERSION es const en el HTML — acceder por nombre, NO via window.*
  var ver  = (typeof EXAM_VERSION!=='undefined' ? EXAM_VERSION : null) || window.AURA_EXAM_VERSION || 5;
  var rank = opts.rank || RANK_BY_V[ver] || 'bronce';
  var lang = opts.lang || localStorage.getItem('aura_lang') || 'en';
  var sb   = _sb();
  if(!sb){ console.warn('[VocabEngine] Sin Supabase'); return; }

  // Config
  var cfgRes = await sb.from('exam_content').select('content')
    .eq('section','vocabulary').eq('content_type','vocab_config')
    .eq('rank',rank).eq('language',lang).limit(1);
  if(cfgRes.data && cfgRes.data.length > 0 && cfgRes.data[0].content){
    var c = cfgRes.data[0].content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c={};}}
    _config = c||{words_per_exam:5};
  }

  // Words
  var res = await sb.from('exam_content').select('content')
    .eq('section','vocabulary').eq('content_type','vocab_word')
    .eq('rank',rank).eq('language',lang).eq('active',true);
  if(res.error){ console.warn('[VocabEngine] load:',res.error); return; }

  var all = (res.data||[]).map(function(row){
    var c=row.content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){return null;}}
    return c;
  }).filter(function(w){return w&&(w.word||'').trim();});

  if(!all.length){
    var _midDbg2 = document.querySelector('.mid-content[data-skill="vocab"]');
    if(_midDbg2) _midDbg2.innerHTML = '<div style="color:#ff6b6b;text-align:center;padding:30px;font-family:monospace;font-size:12px;">❌ Sin palabras para rank='+rank+' lang='+lang+'</div>';
    console.warn('[VocabEngine] Sin palabras para rank='+rank+' lang='+lang); return;
  }

  var N = Math.min(_config.words_per_exam||5, all.length);
  _words   = _shuffle(all).slice(0,N);
  _current = 0;
  _defDone = false;

  // DEBUG: show word count briefly
  var _midDbg3 = document.querySelector('.mid-content[data-skill="vocab"]');
  if(_midDbg3) _midDbg3.innerHTML = '<div style="color:#5BE9F6;text-align:center;padding:30px;font-family:monospace;font-size:12px;">✓ '+_words.length+' palabras · rank='+rank+'</div>';
  setTimeout(function(){ _renderWord(_current); }, 800);
};

/* ── Render una palabra ──────────────────────────────────────── */
function _renderWord(idx){
  var w = _words[idx]; if(!w)return;
  _defDone = false;

  // Actualizar hero card via skillData + applySkill
  if(typeof skillData !== 'undefined'){
    skillData.vocab = {
      word  : w.word||'',
      typo  : w.word||'',
      ipa   : w.ipa||'',
      pos   : w.pos||'',
      chip  : String(idx+1).padStart(2,'0')+' / '+String(_words.length).padStart(2,'0'),
      rating: '',
      color : C_VOCAB,
      bg    : 'radial-gradient(380px 600px at 90% 10%,rgba('+C_VOCAB_R+',.18),transparent 60%)',
      qLabel: 'elige la mejor definición',
      opts  : _buildDefOpts(w)
    };
  }
  if(typeof applySkill==='function') applySkill('vocab');

  // Mid panel con vtask1 + vtask2
  _renderMidPanel(w, idx);

  // Hook click del hero card → paso 2
  setTimeout(function(){
    document.querySelectorAll('.hc-quiz .hc-opt').forEach(function(btn){
      btn.addEventListener('click', function(){
        if(!_defDone){ _defDone=true; _onDefAnswered(); }
      }, {once:true});
    });
  }, 80);
}

/* ── Opciones definición para hero card (texto en ESPAÑOL) ───── */
function _buildDefOpts(w){
  var def = w.definition||{options:['','','',''],answer:'A'};
  return ['A','B','C','D'].map(function(l,i){
    return {l:l, t:def.options[i]||'', sel:def.answer===l};
  });
}

/* ── Mid panel ───────────────────────────────────────────────── */
function _renderMidPanel(w, idx){
  var midEl = document.querySelector('.mid-content[data-skill="vocab"]'); if(!midEl)return;
  var ctx = w.context||{options:['','','',''],answer:'A'};
  var fam = w.family||{sentence1:'',options1:['','',''],answer1:'A',sentence2:'',options2:['','',''],answer2:'A'};
  var hasNext = idx < _words.length-1;
  var ARR = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

  // Step bar: Def=active, Ctx+Fam=pending
  var html =
    '<div class="vocab-step-bar">'+
    '<span class="vsb-step vsb-active" id="vsb1"><span class="vsb-dot"></span><span class="vsb-label">Definición</span></span>'+
    '<span class="vsb-sep"></span>'+
    '<span class="vsb-step" id="vsb2"><span class="vsb-dot"></span><span class="vsb-label">Contexto</span></span>'+
    '<span class="vsb-sep"></span>'+
    '<span class="vsb-step" id="vsb3"><span class="vsb-dot"></span><span class="vsb-label">Familia</span></span>'+
    '</div>';

  // vtask1 — Contexto en INGLÉS (oculto hasta que def sea respondida)
  html +=
    '<div class="exam-panel vocab-task-hidden" id="vtask1" style="--c:'+C_VOCAB_R+';">'+
    '<header class="ep-h">'+
    '<span class="ep-tag">tarea 2 · uso en contexto</span>'+
    '<span style="font-size:10px;color:var(--muted);">¿en cuál se usa correctamente <b style="color:var(--ink)">'+_esc(w.word)+'</b>?</span>'+
    '</header><div style="display:flex;flex-direction:column;gap:7px;">';
  ['A','B','C','D'].forEach(function(l,i){
    html+='<button class="hc-opt" onclick="window._vceCtx(this)"><b>'+l+'</b><span>'+_esc(ctx.options[i]||'')+'</span></button>';
  });
  html+=
    '</div><div class="vocab-next-wrap">'+
    '<button class="vocab-next-btn" id="vocabNextBtn" onclick="vocabNext()" disabled>'+
    'Siguiente tarea '+ARR+'</button></div></div>';

  // vtask2 — Familia en INGLÉS (oculto hasta que ctx sea respondida)
  html +=
    '<div class="exam-panel vocab-task-hidden" id="vtask2" style="--c:'+C_VOCAB_R+';">'+
    '<header class="ep-h">'+
    '<span class="ep-tag">tarea 3 · familia de palabras</span>'+
    '<span style="font-size:10px;color:var(--muted);">elige la forma correcta</span>'+
    '</header>';

  var s1 = _esc(fam.sentence1||'').replace('___','<span class="blank">_____</span>');
  html += '<p style="font-size:12.5px;line-height:1.6;margin-bottom:8px;">"'+s1+'"</p>'+
    '<div class="fam-pills" id="fam-pills-1">';
  (fam.options1||['','','']).forEach(function(opt,i){
    html+='<button class="fam-pill" onclick="window._vceFam(this,\'1\')">'+_esc(opt)+'</button>';
  });
  html+='</div>';

  var s2 = _esc(fam.sentence2||'').replace('___','<span class="blank">_____</span>');
  html += '<p style="font-size:12.5px;line-height:1.6;margin:10px 0 8px;">"'+s2+'"</p>'+
    '<div class="fam-pills" id="fam-pills-2">';
  (fam.options2||['','','']).forEach(function(opt,i){
    html+='<button class="fam-pill" onclick="window._vceFam(this,\'2\')">'+_esc(opt)+'</button>';
  });
  html+='</div>';

  html +=
    '<div class="vocab-next-wrap" style="margin-top:14px;">'+
    '<button class="vocab-next-btn" id="vocabFinishBtn" onclick="window._vceNext()" disabled>'+
    (hasNext?'Siguiente palabra '+ARR:'Finalizar vocabulario ✓')+
    '</button></div></div>';

  midEl.innerHTML = html;
}

/* ── Paso 1 → 2: def respondida en hero card ─────────────────── */
function _onDefAnswered(){
  var s1=document.getElementById('vsb1');var s2=document.getElementById('vsb2');var t1=document.getElementById('vtask1');
  if(s1){s1.classList.remove('vsb-active');s1.classList.add('vsb-done');}
  if(s2) s2.classList.add('vsb-active');
  if(t1){t1.classList.remove('vocab-task-hidden');t1.classList.add('vocab-task-reveal');setTimeout(function(){t1.scrollIntoView({behavior:'smooth',block:'nearest'});},50);}
}

/* ── Click opción contexto ───────────────────────────────────── */
window._vceCtx = function(btn){
  var panel=btn.closest('.exam-panel'); if(!panel)return;
  panel.querySelectorAll('.hc-opt').forEach(function(b){
    b.classList.remove('selected');
    b.style.background='';b.style.borderColor='';b.style.boxShadow='';
    var bb=b.querySelector('b');if(bb){bb.style.background='';bb.style.borderColor='';bb.style.color='';}
  });
  btn.classList.add('selected');
  btn.style.background=C_VOCAB+'22';btn.style.borderColor=C_VOCAB+'80';btn.style.boxShadow='0 0 0 3px '+C_VOCAB+'1f';
  var bb=btn.querySelector('b');if(bb){bb.style.background=C_VOCAB;bb.style.borderColor=C_VOCAB;bb.style.color='#0a1a1e';}
  var nb=document.getElementById('vocabNextBtn');if(nb)nb.disabled=false;
};

/* ── vocabNext: paso 2 → 3 ───────────────────────────────────── */
window.vocabNext = function(){
  var s2=document.getElementById('vsb2');var s3=document.getElementById('vsb3');var t2=document.getElementById('vtask2');var nb=document.getElementById('vocabNextBtn');
  if(s2){s2.classList.remove('vsb-active');s2.classList.add('vsb-done');}
  if(s3) s3.classList.add('vsb-active');
  if(t2){t2.classList.remove('vocab-task-hidden');t2.classList.add('vocab-task-reveal');setTimeout(function(){t2.scrollIntoView({behavior:'smooth',block:'nearest'});},50);}
  if(nb) nb.disabled=true;
};

/* ── Click pill familia ──────────────────────────────────────── */
window._vceFam = function(btn, group){
  var row=document.getElementById('fam-pills-'+group); if(!row)return;
  row.querySelectorAll('.fam-pill').forEach(function(b){b.classList.remove('selected');});
  btn.classList.add('selected');
  setTimeout(_checkFamDone,20);
};

function _checkFamDone(){
  var p1=document.getElementById('fam-pills-1');var p2=document.getElementById('fam-pills-2');
  if(p1&&p1.querySelector('.fam-pill.selected')&&p2&&p2.querySelector('.fam-pill.selected')){
    var fb=document.getElementById('vocabFinishBtn');if(fb)fb.disabled=false;
  }
}

/* ── Siguiente palabra ───────────────────────────────────────── */
window._vceNext = function(){
  var s3=document.getElementById('vsb3');if(s3){s3.classList.remove('vsb-active');s3.classList.add('vsb-done');}
  _current++;
  if(_current>=_words.length){_vocabDone();return;}
  _renderWord(_current);
};

function _vocabDone(){
  var midEl=document.querySelector('.mid-content[data-skill="vocab"]'); if(!midEl)return;
  midEl.innerHTML=
    '<div style="text-align:center;padding:40px 20px;">'+
    '<div style="font-size:40px;margin-bottom:14px;filter:drop-shadow(0 0 18px '+C_VOCAB+')">✓</div>'+
    '<div style="font-family:var(--mono);font-size:13px;font-weight:900;color:'+C_VOCAB+';letter-spacing:.08em;">VOCABULARIO COMPLETO</div>'+
    '<div style="font-size:11.5px;color:var(--muted);margin-top:8px;">'+_words.length+' '+(_words.length===1?'palabra':'palabras')+' completadas</div>'+
    '</div>';
}

})();

/* ════════════════════════════════════════════════════════════════
   examen-vocab-engine.js  v3
   · Carga palabras aleatorias de Supabase
   · Flujo secuencial bloqueado: def → ctx → fam
   · Un intento por paso — verde correcto / rojo incorrecto
   · Auto-avance automático sin botones
   · 5 palabras → sesión completada
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var RANK_BY_V = {1:'bronce',2:'plata',3:'oro',4:'platino',5:'diamante'};
var C_VOCAB   = '#5BE9F6';
var C_VOCAB_R = '91,233,246';
var C_OK      = '#4ade80';
var C_ERR     = '#f87171';

/* ── Estado ─────────────────────────────────────────────────── */
var _words   = [];
var _config  = {words_per_exam:5};
var _current = 0;
var _w       = null;
var _famDone = {'1':false,'2':false};

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
  opts = opts||{};
  var ver  = (typeof EXAM_VERSION!=='undefined' ? EXAM_VERSION : null) || window.AURA_EXAM_VERSION || 5;
  var rank = opts.rank || RANK_BY_V[ver] || 'bronce';
  var lang = opts.lang || localStorage.getItem('aura_lang') || 'en';
  var sb   = _sb();
  if(!sb){ console.warn('[VocabEngine] Sin Supabase'); return; }

  /* Config */
  var cfgRes = await sb.from('exam_content').select('content')
    .eq('section','vocabulary').eq('content_type','vocab_config')
    .eq('rank',rank).eq('language',lang).limit(1);
  if(cfgRes.data && cfgRes.data.length>0 && cfgRes.data[0].content){
    var c=cfgRes.data[0].content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c={};}}
    _config=c||{words_per_exam:5};
  }

  /* Palabras */
  var res = await sb.from('exam_content').select('content')
    .eq('section','vocabulary').eq('content_type','vocab_word')
    .eq('rank',rank).eq('language',lang).eq('active',true);
  if(res.error){ console.warn('[VocabEngine]',res.error); return; }

  var all = (res.data||[]).map(function(row){
    var c=row.content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){return null;}}
    return c;
  }).filter(function(w){return w&&(w.word||'').trim();});

  if(!all.length){ console.warn('[VocabEngine] Sin palabras rank='+rank+' lang='+lang); return; }

  var N = Math.min(_config.words_per_exam||5, all.length);
  _words   = _shuffle(all).slice(0, N);
  _current = 0;
  _renderWord(0);
};

/* ── Render palabra ──────────────────────────────────────────── */
function _renderWord(idx){
  _w = _words[idx]; if(!_w) return;
  _famDone = {'1':false, '2':false};

  /* Hero card */
  if(typeof skillData !== 'undefined'){
    skillData.vocab = {
      word  : _w.word||'', typo : _w.word||'',
      ipa   : _w.ipa||'',  pos  : _w.pos||'',
      chip  : String(idx+1).padStart(2,'0')+' / '+String(_words.length).padStart(2,'0'),
      rating: '', color: C_VOCAB,
      bg    : 'radial-gradient(380px 600px at 90% 10%,rgba('+C_VOCAB_R+',.18),transparent 60%)',
      qLabel: 'elige la mejor definición',
      opts  : _buildDefOpts(_w)
    };
  }
  if(typeof applySkill==='function') applySkill('vocab');

  _renderMidPanel(_w);

  /* Hook clicks definición (hero card) — después de que applySkill recree los botones */
  setTimeout(function(){
    document.querySelectorAll('.hc-quiz .hc-opt').forEach(function(btn){
      btn.addEventListener('click', function(){ _onDefClick(btn); }, {once:true});
    });
  }, 80);
}

/* ── Opciones definición (sin pre-seleccionar) ───────────────── */
function _buildDefOpts(w){
  var def = w.definition||{options:['','','',''],answer:'A'};
  return ['A','B','C','D'].map(function(l,i){
    return {l:l, t:def.options[i]||'', sel:false};
  });
}

/* ── Feedback visual botón MC ────────────────────────────────── */
function _feedbackBtn(btn, isCorrect){
  var col = isCorrect ? C_OK : C_ERR;
  btn.classList.add('selected');
  btn.style.background=col+'22'; btn.style.borderColor=col+'80'; btn.style.boxShadow='0 0 0 3px '+col+'1f';
  var b=btn.querySelector('b');
  if(b){ b.style.background=col; b.style.borderColor=col; b.style.color='#0a0a0a'; }
}

/* ── Feedback visual pill familia ────────────────────────────── */
function _feedbackPill(pill, isCorrect){
  var col = isCorrect ? C_OK : C_ERR;
  pill.style.background=col; pill.style.color='#0a0a0a';
  pill.style.borderColor=col; pill.style.fontWeight='700';
  pill.style.boxShadow='0 0 0 3px '+col+'40';
}

/* ── Mostrar respuesta correcta (hint) ───────────────────────── */
function _hintCorrectBtn(container, correctLabel){
  container.querySelectorAll('.hc-opt').forEach(function(b){
    if((b.dataset.label||(b.querySelector('b')||{}).textContent)===correctLabel){
      b.style.opacity='.6';
      var bb=b.querySelector('b');
      if(bb){ bb.style.background='rgba(74,222,128,.3)'; bb.style.color='#4ade80'; }
    }
  });
}

function _hintCorrectPill(row, correctIdx){
  row.querySelectorAll('.fam-pill').forEach(function(p,i){
    if(i===correctIdx){
      p.style.background='rgba(74,222,128,.25)';
      p.style.color='#4ade80'; p.style.borderColor='rgba(74,222,128,.5)';
    }
  });
}

/* ── PASO 1: Definición (hero card) ──────────────────────────── */
function _onDefClick(btn){
  if(!_w) return;
  var correctAnswer = (_w.definition||{}).answer||'A';
  var label = (btn.querySelector('b')||{}).textContent||'';
  var isCorrect = label===correctAnswer;

  /* Bloquear todos los botones */
  document.querySelectorAll('.hc-quiz .hc-opt').forEach(function(b){
    b.style.pointerEvents='none'; b.style.cursor='default';
  });

  _feedbackBtn(btn, isCorrect);
  if(!isCorrect) _hintCorrectBtn(document.querySelector('.hc-quiz'), correctAnswer);

  setTimeout(_unlockStep2, 700);
}

/* ── Desbloquear paso 2 ──────────────────────────────────────── */
function _unlockStep2(){
  var vsb1=document.getElementById('vsb1'); var vsb2=document.getElementById('vsb2'); var t1=document.getElementById('vtask1');
  if(vsb1){vsb1.classList.remove('vsb-active');vsb1.classList.add('vsb-done');}
  if(vsb2){vsb2.style.opacity='';vsb2.style.filter='';vsb2.classList.add('vsb-active');}
  if(t1){
    t1.style.opacity=''; t1.style.pointerEvents=''; t1.style.filter='';
    t1.classList.add('vocab-task-reveal');
    setTimeout(function(){t1.scrollIntoView({behavior:'smooth',block:'nearest'});},60);
  }
}

/* ── PASO 2: Contexto ────────────────────────────────────────── */
window._vceCtx = function(btn){
  if(!_w) return;
  var correctAnswer = (_w.context||{}).answer||'A';
  var label = btn.dataset.label||(btn.querySelector('b')||{}).textContent||'';
  var isCorrect = label===correctAnswer;

  var container = document.getElementById('vtask1');
  if(container) container.querySelectorAll('.hc-opt').forEach(function(b){
    b.style.pointerEvents='none'; b.style.cursor='default';
  });

  _feedbackBtn(btn, isCorrect);
  if(!isCorrect && container) _hintCorrectBtn(container, correctAnswer);

  setTimeout(_unlockStep3, 700);
};

/* ── Desbloquear paso 3 ──────────────────────────────────────── */
function _unlockStep3(){
  var vsb2=document.getElementById('vsb2'); var vsb3=document.getElementById('vsb3'); var t2=document.getElementById('vtask2');
  if(vsb2){vsb2.classList.remove('vsb-active');vsb2.classList.add('vsb-done');}
  if(vsb3){vsb3.style.opacity='';vsb3.style.filter='';vsb3.classList.add('vsb-active');}
  if(t2){
    t2.style.opacity=''; t2.style.pointerEvents=''; t2.style.filter='';
    t2.classList.add('vocab-task-reveal');
    setTimeout(function(){t2.scrollIntoView({behavior:'smooth',block:'nearest'});},60);
  }
}

/* ── PASO 3: Familia ─────────────────────────────────────────── */
window._vceFam = function(btn, group){
  if(!_w || _famDone[group]) return;
  var fam = _w.family||{};
  var ansKey = group==='1' ? (fam.answer1||'A') : (fam.answer2||'A');
  var opts   = group==='1' ? (fam.options1||[]) : (fam.options2||[]);
  var correctIdx = ['A','B','C'].indexOf(ansKey);
  var clickedIdx = parseInt(btn.dataset.idx||'0');
  var isCorrect  = (clickedIdx===correctIdx);

  var row = document.getElementById('fam-pills-'+group);
  if(row) row.querySelectorAll('.fam-pill').forEach(function(p){p.style.pointerEvents='none';p.style.cursor='default';});

  _feedbackPill(btn, isCorrect);
  if(!isCorrect && row) _hintCorrectPill(row, correctIdx);

  _famDone[group] = true;

  /* Si ambas oraciones respondidas → auto-avanzar */
  if(_famDone['1'] && _famDone['2']){
    var vsb3=document.getElementById('vsb3');
    if(vsb3){vsb3.classList.remove('vsb-active');vsb3.classList.add('vsb-done');}
    setTimeout(function(){
      _current++;
      if(_current>=_words.length){ _vocabDone(); return; }
      _renderWord(_current);
    }, 1100);
  }
};

/* ── Render mid panel ────────────────────────────────────────── */
function _renderMidPanel(w){
  var midEl=document.querySelector('.mid-content[data-skill="vocab"]'); if(!midEl)return;
  var ctx = w.context||{options:['','','',''],answer:'A'};
  var fam = w.family||{sentence1:'',options1:['','',''],answer1:'A',sentence2:'',options2:['','',''],answer2:'A'};
  var LOCK = 'opacity:0.3;pointer-events:none;filter:grayscale(.5);transition:opacity .4s,filter .4s;';

  /* Step bar */
  var html =
    '<div class="vocab-step-bar">'+
    '<span class="vsb-step vsb-active" id="vsb1"><span class="vsb-dot"></span><span class="vsb-label">Definición</span></span>'+
    '<span class="vsb-sep"></span>'+
    '<span class="vsb-step" id="vsb2" style="opacity:.3;filter:grayscale(.5);transition:opacity .4s,filter .4s;"><span class="vsb-dot"></span><span class="vsb-label">Contexto</span></span>'+
    '<span class="vsb-sep"></span>'+
    '<span class="vsb-step" id="vsb3" style="opacity:.3;filter:grayscale(.5);transition:opacity .4s,filter .4s;"><span class="vsb-dot"></span><span class="vsb-label">Familia</span></span>'+
    '</div>';

  /* vtask1 — Contexto (bloqueado) */
  html +=
    '<div class="exam-panel" id="vtask1" style="--c:'+C_VOCAB_R+';'+LOCK+'">'+
    '<header class="ep-h">'+
    '<span class="ep-tag">tarea 2 · uso en contexto</span>'+
    '<span style="font-size:10px;color:var(--muted);">¿en cuál se usa correctamente <b style="color:var(--ink)">'+_esc(w.word)+'</b>?</span>'+
    '</header><div style="display:flex;flex-direction:column;gap:7px;">';
  ['A','B','C','D'].forEach(function(l,i){
    html+='<button class="hc-opt" data-label="'+l+'" onclick="window._vceCtx(this)"><b>'+l+'</b><span>'+_esc(ctx.options[i]||'')+'</span></button>';
  });
  html+='</div></div>';

  /* vtask2 — Familia (bloqueado) */
  var s1=_esc(fam.sentence1||'').replace('___','<span class="blank">_____</span>');
  var s2=_esc(fam.sentence2||'').replace('___','<span class="blank">_____</span>');
  html +=
    '<div class="exam-panel" id="vtask2" style="--c:'+C_VOCAB_R+';'+LOCK+'">'+
    '<header class="ep-h">'+
    '<span class="ep-tag">tarea 3 · familia de palabras</span>'+
    '<span style="font-size:10px;color:var(--muted);">elige la forma correcta</span>'+
    '</header>'+
    '<p style="font-size:12.5px;line-height:1.6;margin-bottom:8px;">"'+s1+'"</p>'+
    '<div class="fam-pills" id="fam-pills-1">';
  (fam.options1||['','','']).forEach(function(opt,i){
    html+='<button class="fam-pill" data-idx="'+i+'" onclick="window._vceFam(this,\'1\')">'+_esc(opt)+'</button>';
  });
  html+=
    '</div><p style="font-size:12.5px;line-height:1.6;margin:10px 0 8px;">"'+s2+'"</p>'+
    '<div class="fam-pills" id="fam-pills-2">';
  (fam.options2||['','','']).forEach(function(opt,i){
    html+='<button class="fam-pill" data-idx="'+i+'" onclick="window._vceFam(this,\'2\')">'+_esc(opt)+'</button>';
  });
  html+='</div></div>';

  midEl.innerHTML = html;
}

/* ── Sesión completada ───────────────────────────────────────── */
function _vocabDone(){
  var midEl=document.querySelector('.mid-content[data-skill="vocab"]'); if(!midEl)return;
  midEl.innerHTML=
    '<div style="text-align:center;padding:40px 20px;">'+
    '<div style="font-size:44px;margin-bottom:14px;filter:drop-shadow(0 0 20px '+C_VOCAB+')">✓</div>'+
    '<div style="font-family:var(--mono);font-size:13px;font-weight:900;color:'+C_VOCAB+';letter-spacing:.08em;">VOCABULARIO COMPLETO</div>'+
    '<div style="font-size:11.5px;color:var(--muted);margin-top:8px;">'+_words.length+' '+(_words.length===1?'palabra':'palabras')+' completadas</div>'+
    '</div>';
}

/* Compatibilidad hacia atrás */
window.vocabNext = function(){};

})();

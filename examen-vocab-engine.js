/* examen-vocab-engine.js  v5
   Auto-init: no depende del hook del HTML
   Espera auth, reintenta si 0 palabras, se engancha al tab directamente */
(function(){

var RANK_BY_V = {1:'bronce',2:'plata',3:'oro',4:'platino',5:'diamante'};
var C_VOCAB   = '#5BE9F6';
var C_VOCAB_R = '91,233,246';
var C_OK      = '#4ade80';
var C_ERR     = '#f87171';
var _words=[], _config={words_per_exam:5}, _current=0, _w=null, _famDone={'1':false,'2':false};
var _initialized = false;

function _sb(){ return (window._aura && window._aura.sb) ? window._aura.sb : null; }
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function _shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }
function _getMid(){ return document.querySelector('.mid-content[data-skill="vocab"]'); }
function _showMsg(html){ var el=_getMid(); if(el) el.innerHTML=html; }

/* ── Init ─────────────────────────────────────────────────────── */
window.initExamVocab = async function(opts, _retryCount){
  opts = opts||{};
  _retryCount = _retryCount||0;
  _initialized = false;

  var rank = opts.rank || 'bronce';
  var lang = opts.lang || localStorage.getItem('aura_lang') || 'en';
  var sb   = _sb();

  if(!sb){
    if(_retryCount < 5){
      setTimeout(function(){ window.initExamVocab(opts, _retryCount+1); }, 500);
    } else {
      _showMsg('<div style="padding:20px;color:#f87171;font-size:12px;font-family:monospace;">✗ Sin conexión Supabase</div>');
    }
    return;
  }

  try {
    var cfgRes = await sb.from('exam_content').select('content')
      .eq('section','vocabulary').eq('content_type','vocab_config')
      .eq('rank',rank).eq('language',lang).limit(1);
    if(cfgRes.data && cfgRes.data.length>0 && cfgRes.data[0].content){
      var c=cfgRes.data[0].content;
      if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c={};}}
      _config=c||{words_per_exam:5};
    }

    var res = await sb.from('exam_content').select('content')
      .eq('section','vocabulary').eq('content_type','vocab_word')
      .eq('rank',rank).eq('language',lang).eq('active',true);

    if(res.error){ _showMsg('<div style="padding:20px;color:#f87171;font-size:12px;font-family:monospace;">✗ Error: '+_esc(String(res.error.message||''))+'</div>'); return; }

    var all=(res.data||[]).map(function(row){
      var c=row.content;
      if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){return null;}}
      return c;
    }).filter(function(w){return w&&(w.word||'').trim();});

    if(!all.length){
      if(_retryCount < 3){
        // Auth might not be ready yet — retry
        setTimeout(function(){ window.initExamVocab(opts, _retryCount+1); }, 700);
      } else {
        _showMsg('<div style="padding:20px;color:#f87171;font-size:12px;font-family:monospace;">✗ Sin palabras (rank='+rank+' lang='+lang+')</div>');
      }
      return;
    }

    var N=Math.min(_config.words_per_exam||5, all.length);
    _words=_shuffle(all).slice(0,N);
    _current=0;
    _initialized=true;
    _renderWord(0);

  } catch(e){
    _showMsg('<div style="padding:20px;color:#f87171;font-size:12px;font-family:monospace;">✗ Excepción: '+_esc(String(e))+'</div>');
  }
};

/* ── Render palabra ───────────────────────────────────────────── */
function _renderWord(idx){
  _w=_words[idx]; if(!_w) return;
  _famDone={'1':false,'2':false};
  if(typeof skillData!=='undefined'){
    skillData.vocab={
      word:_w.word||'', typo:_w.word||'',
      ipa:_w.ipa||'', pos:_w.pos||'',
      chip:String(idx+1).padStart(2,'0')+' / '+String(_words.length).padStart(2,'0'),
      rating:'', color:C_VOCAB,
      bg:'radial-gradient(380px 600px at 90% 10%,rgba('+C_VOCAB_R+',.18),transparent 60%)',
      qLabel:'elige la mejor definición',
      opts:_buildDefOpts(_w)
    };
  }
  if(typeof applySkill==='function') applySkill('vocab');
  _renderMidPanel(_w);
  setTimeout(function(){
    document.querySelectorAll('.hc-quiz .hc-opt').forEach(function(btn){
      btn.addEventListener('click',function(){ _onDefClick(btn); },{once:true});
    });
  },80);
}

function _buildDefOpts(w){
  var def=w.definition||{options:['','','',''],answer:'A'};
  return ['A','B','C','D'].map(function(l,i){ return {l:l,t:def.options[i]||'',sel:false}; });
}

/* ── Feedback ─────────────────────────────────────────────────── */
function _feedbackBtn(btn,ok){
  var col=ok?C_OK:C_ERR;
  btn.classList.add('selected');
  btn.style.background=col+'22'; btn.style.borderColor=col+'80'; btn.style.boxShadow='0 0 0 3px '+col+'1f';
  var b=btn.querySelector('b');
  if(b){b.style.background=col;b.style.borderColor=col;b.style.color='#0a0a0a';}
}
function _feedbackPill(pill,ok){
  var col=ok?C_OK:C_ERR;
  pill.style.background=col; pill.style.color='#0a0a0a';
  pill.style.borderColor=col; pill.style.fontWeight='700'; pill.style.boxShadow='0 0 0 3px '+col+'40';
}
function _hintBtn(container,correctLabel){
  (container||document).querySelectorAll('.hc-opt').forEach(function(b){
    var lbl=(b.dataset.label)||(b.querySelector('b')||{}).textContent||'';
    if(lbl===correctLabel){
      b.style.opacity='.6';
      var bb=b.querySelector('b');
      if(bb){bb.style.background='rgba(74,222,128,.3)';bb.style.color='#4ade80';}
    }
  });
}
function _hintPill(row,idx){
  (row||document).querySelectorAll('.fam-pill').forEach(function(p,i){
    if(i===idx){p.style.background='rgba(74,222,128,.25)';p.style.color='#4ade80';p.style.borderColor='rgba(74,222,128,.5)';}
  });
}

/* ── Pasos ────────────────────────────────────────────────────── */
function _onDefClick(btn){
  if(!_w) return;
  var correct=(_w.definition||{}).answer||'A';
  var label=(btn.querySelector('b')||{}).textContent||'';
  document.querySelectorAll('.hc-quiz .hc-opt').forEach(function(b){b.style.pointerEvents='none';b.style.cursor='default';});
  _feedbackBtn(btn,label===correct);
  if(label!==correct) _hintBtn(document.querySelector('.hc-quiz'),correct);
  setTimeout(_unlockStep2,700);
}

function _unlockStep2(){
  var s1=document.getElementById('vsb1'), s2=document.getElementById('vsb2'), t1=document.getElementById('vtask1');
  if(s1){s1.classList.remove('vsb-active');s1.classList.add('vsb-done');}
  if(s2){s2.style.opacity='';s2.style.filter='';s2.classList.add('vsb-active');}
  if(t1){t1.style.opacity='';t1.style.pointerEvents='';t1.style.filter='';t1.classList.add('vocab-task-reveal');setTimeout(function(){t1.scrollIntoView({behavior:'smooth',block:'nearest'});},60);}
}

window._vceCtx=function(btn){
  if(!_w) return;
  var correct=(_w.context||{}).answer||'A';
  var label=btn.dataset.label||(btn.querySelector('b')||{}).textContent||'';
  var t1=document.getElementById('vtask1');
  if(t1) t1.querySelectorAll('.hc-opt').forEach(function(b){b.style.pointerEvents='none';b.style.cursor='default';});
  _feedbackBtn(btn,label===correct);
  if(label!==correct&&t1) _hintBtn(t1,correct);
  setTimeout(_unlockStep3,700);
};

function _unlockStep3(){
  var s2=document.getElementById('vsb2'), s3=document.getElementById('vsb3'), t2=document.getElementById('vtask2');
  if(s2){s2.classList.remove('vsb-active');s2.classList.add('vsb-done');}
  if(s3){s3.style.opacity='';s3.style.filter='';s3.classList.add('vsb-active');}
  if(t2){t2.style.opacity='';t2.style.pointerEvents='';t2.style.filter='';t2.classList.add('vocab-task-reveal');setTimeout(function(){t2.scrollIntoView({behavior:'smooth',block:'nearest'});},60);}
}

window._vceFam=function(btn,group){
  if(!_w||_famDone[group]) return;
  var fam=_w.family||{};
  var ansKey=group==='1'?(fam.answer1||'A'):(fam.answer2||'A');
  var correctIdx=['A','B','C'].indexOf(ansKey);
  var clickedIdx=parseInt(btn.dataset.idx||'0');
  var row=document.getElementById('fam-pills-'+group);
  if(row) row.querySelectorAll('.fam-pill').forEach(function(p){p.style.pointerEvents='none';p.style.cursor='default';});
  _feedbackPill(btn,clickedIdx===correctIdx);
  if(clickedIdx!==correctIdx&&row) _hintPill(row,correctIdx);
  _famDone[group]=true;
  if(_famDone['1']&&_famDone['2']){
    var s3=document.getElementById('vsb3');
    if(s3){s3.classList.remove('vsb-active');s3.classList.add('vsb-done');}
    setTimeout(function(){ _current++; if(_current>=_words.length){_done();}else{_renderWord(_current);} },1100);
  }
};

/* ── Mid panel ────────────────────────────────────────────────── */
function _renderMidPanel(w){
  var el=_getMid(); if(!el) return;
  var ctx=w.context||{options:['','','',''],answer:'A'};
  var fam=w.family||{sentence1:'',options1:['','',''],answer1:'A',sentence2:'',options2:['','',''],answer2:'A'};
  var LK='opacity:0.3;pointer-events:none;filter:grayscale(.5);transition:opacity .4s,filter .4s;';
  var C=C_VOCAB_R;
  var h=
    '<div class="vocab-step-bar">'+
    '<span class="vsb-step vsb-active" id="vsb1"><span class="vsb-dot"></span><span class="vsb-label">Definición</span></span>'+
    '<span class="vsb-sep"></span>'+
    '<span class="vsb-step" id="vsb2" style="opacity:.3;filter:grayscale(.5);transition:opacity .4s,filter .4s;"><span class="vsb-dot"></span><span class="vsb-label">Contexto</span></span>'+
    '<span class="vsb-sep"></span>'+
    '<span class="vsb-step" id="vsb3" style="opacity:.3;filter:grayscale(.5);transition:opacity .4s,filter .4s;"><span class="vsb-dot"></span><span class="vsb-label">Familia</span></span>'+
    '</div>'+
    '<div class="exam-panel" id="vtask1" style="--c:'+C+';'+LK+'">'+
    '<header class="ep-h"><span class="ep-tag">tarea 2 · uso en contexto</span>'+
    '<span style="font-size:10px;color:var(--muted);">¿en cuál se usa correctamente <b style="color:var(--ink)">'+_esc(w.word)+'</b>?</span></header>'+
    '<div style="display:flex;flex-direction:column;gap:7px;">';
  ['A','B','C','D'].forEach(function(l,i){
    h+='<button class="hc-opt" data-label="'+l+'" onclick="window._vceCtx(this)"><b>'+l+'</b><span>'+_esc(ctx.options[i]||'')+'</span></button>';
  });
  var s1=_esc(fam.sentence1||'').replace('___','<span style="color:'+C_VOCAB+';font-weight:700;">_____</span>');
  var s2=_esc(fam.sentence2||'').replace('___','<span style="color:'+C_VOCAB+';font-weight:700;">_____</span>');
  h+='</div></div>'+
    '<div class="exam-panel" id="vtask2" style="--c:'+C+';'+LK+'">'+
    '<header class="ep-h"><span class="ep-tag">tarea 3 · familia de palabras</span>'+
    '<span style="font-size:10px;color:var(--muted);">elige la forma correcta</span></header>'+
    '<p style="font-size:12.5px;line-height:1.6;margin-bottom:8px;">"'+s1+'"</p>'+
    '<div class="fam-pills" id="fam-pills-1">';
  (fam.options1||['','','']).forEach(function(o,i){
    h+='<button class="fam-pill" data-idx="'+i+'" onclick="window._vceFam(this,\'1\')">'+_esc(o)+'</button>';
  });
  h+='</div><p style="font-size:12.5px;line-height:1.6;margin:10px 0 8px;">"'+s2+'"</p>'+
    '<div class="fam-pills" id="fam-pills-2">';
  (fam.options2||['','','']).forEach(function(o,i){
    h+='<button class="fam-pill" data-idx="'+i+'" onclick="window._vceFam(this,\'2\')">'+_esc(o)+'</button>';
  });
  h+='</div></div>';
  el.innerHTML=h;
}

function _done(){
  _showMsg('<div style="text-align:center;padding:40px 20px;">'+
    '<div style="font-size:44px;margin-bottom:14px;filter:drop-shadow(0 0 20px '+C_VOCAB+')">✓</div>'+
    '<div style="font-family:var(--mono,monospace);font-size:13px;font-weight:900;color:'+C_VOCAB+';letter-spacing:.08em;">VOCABULARIO COMPLETO</div>'+
    '<div style="font-size:11.5px;color:var(--muted,#888);margin-top:8px;">'+_words.length+' palabras completadas</div>'+
    '</div>');
}

/* ── AUTO-INIT: no depende del hook del HTML ──────────────────── */
function _getRank(){
  if(typeof getCurrentRank==='function') return getCurrentRank();
  return document.body.dataset.examRank || 'bronce';
}
function _getLang(){
  return localStorage.getItem('aura_lang')||'en';
}

// 1. Auto-init cuando la pestaña vocab esté activa al cargar la página
function _autoInit(){
  var activeTab = document.querySelector('.tab.active');
  if(activeTab && activeTab.dataset && activeTab.dataset.skill === 'vocab'){
    window.initExamVocab({rank:_getRank(), lang:_getLang()});
  }
}

// 2. Hook en cada clic de pestaña vocab (directo, independiente del HTML)
function _hookTabs(){
  document.querySelectorAll('.tab[data-skill="vocab"]').forEach(function(tab){
    tab.addEventListener('click', function(){
      // Pequeño delay para que swapMidContent corra primero
      setTimeout(function(){
        window.initExamVocab({rank:_getRank(), lang:_getLang()});
      }, 50);
    });
  });
}

// Esperar 1200ms para que auth y aura-shell terminen
setTimeout(function(){
  _hookTabs();
  _autoInit();
}, 1200);

window.vocabNext=function(){};

})();

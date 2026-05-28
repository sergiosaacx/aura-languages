/* ════════════════════════════════════════════════════════════════
   admin-examen-vocab-ai.js  v2
   · Tabs por palabra + botón "+"
   · NUEVO: entrada en lote + "Generar todo con IA"
   · Idioma FIJO: Definición → ESPAÑOL · Contexto+Familia → INGLÉS
   · Guarda en Supabase exam_content (vocab_word + vocab_config)
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var RANK_BY_V = {1:'bronce',2:'plata',3:'oro',4:'platino',5:'diamante'};

/* ── Estado ─────────────────────────────────────────────────── */
var _words = [];
var _config = {words_per_exam: 5};
var _activeTab = 0;

/* ── Helpers ─────────────────────────────────────────────────── */
function _sb(){ return (window._aura && window._aura.sb) ? window._aura.sb : null; }
function _toast(msg){ if(typeof window.admShowToast==='function') window.admShowToast(msg); }
function _v(){ return window._admCurrV || 1; }
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/* ── Blank word ──────────────────────────────────────────────── */
function _blankWord(word){
  return {
    word: word||'', ipa:'', pos:'',
    definition:{ options:['','','',''], answer:'A' },
    context:{ options:['','','',''], answer:'A' },
    family:{ sentence1:'', options1:['','',''], answer1:'A',
             sentence2:'', options2:['','',''], answer2:'A' }
  };
}

/* ── Cargar pool ─────────────────────────────────────────────── */
async function _loadPool(ver, lang){
  _words = []; _config = {words_per_exam:5};
  var sb = _sb(); if(!sb) return;
  var rank = RANK_BY_V[ver||1]||'bronce';

  var cfgRes = await sb.from('exam_content').select('content')
    .eq('section','vocabulary').eq('content_type','vocab_config')
    .eq('rank',rank).eq('language',lang).limit(1);
  if(cfgRes.data && cfgRes.data.length > 0 && cfgRes.data[0].content){
    var c = cfgRes.data[0].content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c={};}}
    _config = c||{words_per_exam:5};
  }

  var res = await sb.from('exam_content').select('*')
    .eq('section','vocabulary').eq('content_type','vocab_word')
    .eq('rank',rank).eq('language',lang).eq('active',true)
    .order('created_at',{ascending:true});
  if(res.error){ console.warn('[VocabPool] load:',res.error); return; }
  _words = (res.data||[]).map(function(row){
    var c=row.content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c=null;}}
    return c||_blankWord('');
  });
  if(!_words.length) _words.push(_blankWord(''));
}

/* ── Guardar pool ────────────────────────────────────────────── */

/* ── Sincronizar preview del admin con el pool en memoria ─────── */
function _syncAdminPreview(ver, lang){
  if(!_words.length) return;
  var w = null;
  for(var i=0;i<_words.length;i++){ if((_words[i].word||'').trim()){w=_words[i];break;} }
  if(!w) return;
  var rank = RANK_BY_V[ver||1]||'bronce';

  // 1. skillData.vocab
  var newSd = {
    word : w.word, typo : w.word,
    ipa  : w.ipa||'', pos : w.pos||'',
    chip : '01 / '+String(_words.filter(function(x){return(x.word||'').trim();}).length).padStart(2,'0'),
    rating: rank.charAt(0).toUpperCase()+rank.slice(1),
    color : '#5BE9F6',
    qLabel: 'elige la mejor definición',
    opts  : (w.definition&&w.definition.options||['','','','']).map(function(t,i){
      var l=['A','B','C','D'][i];
      return {l:l,t:t,sel:!!(w.definition&&w.definition.answer===l)};
    }),
    bg    : 'radial-gradient(380px 600px at 90% 10%,rgba(91,233,246,.20),transparent 60%),radial-gradient(420px 500px at 0% 100%,rgba(167,139,250,.22),transparent 55%)'
  };
  if(typeof skillData!=='undefined') skillData.vocab = newSd;

  // 2. VERSION_SD
  if(typeof VERSION_SD!=='undefined'){
    if(!VERSION_SD[ver]) VERSION_SD[ver]={};
    VERSION_SD[ver].vocab = newSd;
  }

  // 3. Construir HTML del mid panel
  var ctx = w.context||{options:['','','',''],answer:'A'};
  var fam = w.family||{sentence1:'',options1:['','',''],answer1:'A',sentence2:'',options2:['','',''],answer2:'A'};
  var C = '91,233,246';
  var ARR = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

  var stepBar =
    '<div class="vocab-step-bar">'+
    '<span class="vsb-step vsb-done"><span class="vsb-dot"></span><span class="vsb-label">Definición</span></span>'+
    '<span class="vsb-sep"></span>'+
    '<span class="vsb-step vsb-done"><span class="vsb-dot"></span><span class="vsb-label">Contexto</span></span>'+
    '<span class="vsb-sep"></span>'+
    '<span class="vsb-step vsb-done"><span class="vsb-dot"></span><span class="vsb-label">Familia</span></span>'+
    '</div>';

  // Context panel
  var ctxHtml = '<div class="exam-panel" style="--c:'+C+';"><header class="ep-h">'+
    '<span class="ep-tag">tarea 1 · uso en contexto</span>'+
    '<span style="font-size:10px;color:var(--muted);">¿en cuál se usa correctamente "<b style=\'color:var(--ink)\'>'+_esc(w.word)+'</b>"?</span>'+
    '</header><div style="display:flex;flex-direction:column;gap:7px;">';
  ['A','B','C','D'].forEach(function(l,i){
    var sel = ctx.answer===l?' selected':'';
    ctxHtml+='<button class="hc-opt'+sel+'"><b>'+l+'</b><span>'+_esc(ctx.options[i]||'')+'</span></button>';
  });
  ctxHtml+='</div></div>';

  // Family panel
  var s1=_esc(fam.sentence1||'').replace('___','<span class=\'blank\'>_____</span>');
  var s2=_esc(fam.sentence2||'').replace('___','<span class=\'blank\'>_____</span>');
  var famHtml = '<div class="exam-panel" style="--c:'+C+';"><header class="ep-h">'+
    '<span class="ep-tag">tarea 2 · familia de palabras</span>'+
    '<span style="font-size:10px;color:var(--muted);">elige la forma correcta</span>'+
    '</header><p style="font-size:12.5px;line-height:1.6;margin-bottom:8px;">"'+s1+'"</p>'+
    '<div class="fam-pills">';
  (fam.options1||['','','']).forEach(function(opt,i){
    var sel=fam.answer1===['A','B','C'][i]?' selected':'';
    famHtml+='<button class="fam-pill'+sel+'">'+_esc(opt)+'</button>';
  });
  famHtml+='</div><p style="font-size:12.5px;line-height:1.6;margin:10px 0 8px;">"'+s2+'"</p><div class="fam-pills">';
  (fam.options2||['','','']).forEach(function(opt,i){
    var sel=fam.answer2===['A','B','C'][i]?' selected':'';
    famHtml+='<button class="fam-pill'+sel+'">'+_esc(opt)+'</button>';
  });
  famHtml+='</div></div>';

  var midHtml = stepBar + ctxHtml + famHtml;

  // 4. VERSION_MID + DOM
  if(typeof VERSION_MID!=='undefined'){
    if(!VERSION_MID[ver]) VERSION_MID[ver]={};
    VERSION_MID[ver].vocab = midHtml;
  }
  var midEl=document.querySelector('.mid-content[data-skill="vocab"]');
  if(midEl) midEl.innerHTML = midHtml;

  // 5. Re-renderizar hero card
  if(typeof applySkill==='function') applySkill('vocab');
}

window.admSaveVocabPool = async function(ver, lang){
  var sb=_sb(); if(!sb){_toast('❌ Sin Supabase');return;}
  var rank=RANK_BY_V[ver||1]||'bronce';
  _readActiveTab(); _readConfig();
  _toast('⏳ Guardando pool…');
  await sb.from('exam_content').delete()
    .eq('section','vocabulary').eq('content_type','vocab_word').eq('rank',rank).eq('language',lang);
  await sb.from('exam_content').delete()
    .eq('section','vocabulary').eq('content_type','vocab_config').eq('rank',rank).eq('language',lang);
  await sb.from('exam_content').insert({
    section:'vocabulary',content_type:'vocab_config',rank:rank,language:lang,active:true,difficulty:1,content:_config
  });
  var rows=_words.filter(function(w){return(w.word||'').trim();})
    .map(function(w){return{section:'vocabulary',content_type:'vocab_word',rank:rank,language:lang,active:true,difficulty:3,content:w};});
  if(!rows.length){_toast('⚠ No hay palabras con contenido');return;}
  var ins=await sb.from('exam_content').insert(rows);
  if(ins.error){_toast('❌ Error: '+ins.error.message);return;}
  _toast('✓ Pool guardado · '+rows.length+' palabra(s)');
  _syncAdminPreview(ver, lang);
  if(typeof window.admCloseDrawer==='function') window.admCloseDrawer();
};

/* ── Leer tab activo ─────────────────────────────────────────── */
function _readActiveTab(){
  var body=document.getElementById('adm-dw-body'); if(!body)return;
  var ti=_activeTab; if(ti<0||ti>=_words.length)return;
  var w=_words[ti];
  var nameEl=body.querySelector('[data-key="vocab_word_name"]');
  if(nameEl) w.word=(nameEl.value||'').trim();
  var ipaEl=body.querySelector('[data-key="vocab_ipa"]');
  var posEl=body.querySelector('[data-key="vocab_pos"]');
  if(ipaEl) w.ipa=(ipaEl.value||'').trim();
  if(posEl) w.pos=(posEl.value||'').trim();
  ['a','b','c','d'].forEach(function(l,i){
    var el=body.querySelector('[data-key="def_opt_'+l+'"]');
    if(el) w.definition.options[i]=(el.value||'').trim();
  });
  var defAns=body.querySelector('input[name="def_answer"]:checked');
  if(defAns) w.definition.answer=defAns.value;
  ['a','b','c','d'].forEach(function(l,i){
    var el=body.querySelector('[data-key="ctx_opt_'+l+'"]');
    if(el) w.context.options[i]=(el.value||'').trim();
  });
  var ctxAns=body.querySelector('input[name="ctx_answer"]:checked');
  if(ctxAns) w.context.answer=ctxAns.value;
  var s1=body.querySelector('[data-key="fam_s1"]'); if(s1) w.family.sentence1=(s1.value||'').trim();
  var s2=body.querySelector('[data-key="fam_s2"]'); if(s2) w.family.sentence2=(s2.value||'').trim();
  ['a','b','c'].forEach(function(l,i){
    var e1=body.querySelector('[data-key="fam1_opt_'+l+'"]');
    var e2=body.querySelector('[data-key="fam2_opt_'+l+'"]');
    if(e1) w.family.options1[i]=(e1.value||'').trim();
    if(e2) w.family.options2[i]=(e2.value||'').trim();
  });
  var a1=body.querySelector('input[name="fam1_answer"]:checked');
  var a2=body.querySelector('input[name="fam2_answer"]:checked');
  if(a1) w.family.answer1=a1.value;
  if(a2) w.family.answer2=a2.value;
}

function _readConfig(){
  var el=document.getElementById('adm-vocab-wpe');
  if(el) _config.words_per_exam=Math.max(1,parseInt(el.value)||5);
}

/* ── Render principal ────────────────────────────────────────── */
window.admRenderVocabPool = async function(sd, ver, lang){
  var body=document.getElementById('adm-dw-body'); if(!body)return;
  body.innerHTML='<div style="font-size:12px;color:#5BE9F6;text-align:center;padding:24px;opacity:.6;">Cargando pool…</div>';
  await _loadPool(ver,lang);
  _activeTab=0;
  _syncAdminPreview(ver, lang);
  _renderPoolUI(ver,lang);
};

/* ── UI del pool ─────────────────────────────────────────────── */
function _renderPoolUI(ver, lang){
  var body=document.getElementById('adm-dw-body'); if(!body)return;
  var totalW=_words.filter(function(w){return(w.word||'').trim();}).length;
  var needsGen=_words.filter(function(w){return(w.word||'').trim()&&!w.ipa;}).length;

  /* Config */
  var html=
    '<div class="adm-section-label">Configuración del pool</div>'+
    '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:4px;">'+
    '<div class="adm-field" style="flex:0 0 auto;"><label>Palabras por examen</label>'+
    '<input type="number" id="adm-vocab-wpe" min="1" max="100" value="'+(_config.words_per_exam||5)+'" style="max-width:72px;"></div>'+
    '<div style="font-size:10.5px;color:#6b7280;padding-top:18px;">de '+totalW+' en el pool</div>'+
    '</div>';

  /* Botón lote */
  html+=
    '<button onclick="window._admVocabToggleBatch()" '+
    'style="background:rgba(167,139,250,.08);border:1px solid rgba(167,139,250,.35);border-radius:7px;color:#a78bfa;font-size:11px;font-weight:700;padding:5px 13px;cursor:pointer;margin-bottom:6px;">'+
    '📋 Agregar en lote</button>'+

    '<div id="adm-vocab-batch-area" style="display:none;margin-bottom:8px;background:rgba(167,139,250,.05);border:1px solid rgba(167,139,250,.2);border-radius:8px;padding:10px;">'+
    '<div class="adm-field" style="margin-bottom:6px;"><label>Palabras (una por línea o separadas por coma)</label>'+
    '<textarea id="adm-vocab-batch-ta" rows="4" style="font-size:12px;background:#0d0720;border:1px solid #2d1854;border-radius:7px;padding:7px 10px;color:#e0d6ff;width:100%;box-sizing:border-box;resize:vertical;" placeholder="nervous\nstressful\ncontroversial\npragmatic"></textarea></div>'+
    '<button onclick="window._admVocabBatchAdd()" '+
    'style="background:rgba(167,139,250,.18);border:1px solid rgba(167,139,250,.5);color:#a78bfa;padding:7px 16px;border-radius:7px;font-size:11px;font-weight:700;cursor:pointer;">'+
    '＋ Agregar palabras</button>'+
    '</div>';

  /* Banner generar todo */
  if(needsGen > 0){
    html+=
      '<div style="background:rgba(91,233,246,.06);border:1px solid rgba(91,233,246,.25);border-radius:8px;padding:8px 12px;margin-bottom:6px;display:flex;align-items:center;gap:10px;">'+
      '<span style="font-size:11px;color:#5BE9F6;flex:1;">'+needsGen+' palabra(s) sin contenido</span>'+
      '<button id="adm-vocab-gen-all-btn" onclick="window._admVocabGenAll()" '+
      'style="background:rgba(91,233,246,.15);border:1px solid rgba(91,233,246,.5);color:#5BE9F6;padding:6px 14px;border-radius:7px;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;">'+
      '✨ Generar todo con IA</button>'+
      '</div>';
  }

  /* Tabs */
  html+='<div class="adm-section-label" style="margin-top:8px;">Palabras</div>'+
    '<div class="adm-read-tabs" id="adm-vocab-tab-bar">';
  _words.forEach(function(w,i){
    var raw=(w.word||'').trim();
    var label=raw?(raw.length>14?raw.substring(0,12)+'…':raw):('P'+(i+1));
    var active=i===_activeTab?' adm-rt-active':'';
    var dot=raw&&!w.ipa?' style="position:relative;"':'';
    html+='<button class="adm-rt-tab'+active+'"'+dot+' onclick="window._admVocabSwitchTab('+i+')">'+_esc(label)+'</button>';
  });
  html+='<button class="adm-rt-add" onclick="window._admVocabAddTab()" title="Agregar palabra">＋</button></div>';

  /* Editor */
  html+=_buildWordEditor(_words[_activeTab]||_blankWord(''),_activeTab,ver);

  /* Del */
  if(_words.length>1){
    html+='<button class="adm-rt-del" onclick="window._admVocabDelTab('+_activeTab+')">🗑 Eliminar esta palabra</button>';
  }

  body.innerHTML=html;
}

/* ── Editor de una palabra ───────────────────────────────────── */
function _buildWordEditor(w, idx, ver){
  var def=w.definition||{options:['','','',''],answer:'A'};
  var ctx=w.context||{options:['','','',''],answer:'A'};
  var fam=w.family||{sentence1:'',options1:['','',''],answer1:'A',sentence2:'',options2:['','',''],answer2:'A'};

  var html=
    '<div class="adm-section-label" style="margin-top:12px;">'+_esc((w.word||'Palabra '+(idx+1)))+'</div>'+
    '<div class="adm-field"><label>Palabra</label>'+
    '<input type="text" data-key="vocab_word_name" value="'+_esc(w.word||'')+'" '+
    'oninput="window._admVocabWordRename('+idx+',this.value)" placeholder="ej: nervous"></div>'+

    '<div class="adm-hero-grid" style="margin-bottom:8px;">'+
    '<div class="adm-field"><label>IPA <span style="color:#5BE9F6;font-size:9px;font-weight:900;">✨ IA</span></label>'+
    '<input type="text" data-key="vocab_ipa" value="'+_esc(w.ipa||'')+'" placeholder="/ˈnɜːvəs/" style="font-family:monospace;"></div>'+
    '<div class="adm-field"><label>Categoría <span style="color:#5BE9F6;font-size:9px;font-weight:900;">✨ IA</span></label>'+
    '<input type="text" data-key="vocab_pos" value="'+_esc(w.pos||'')+'" placeholder="adj. · feelings · everyday"></div>'+
    '</div>'+

    '<div class="adm-mode-row">'+
    '<button class="adm-mode-btn active" id="adm-vocab-mode-manual" onclick="admVocabMode(\'manual\')">✏️ Manual</button>'+
    '<button class="adm-mode-btn" id="adm-vocab-mode-ai" onclick="admVocabMode(\'ai\')">✨ Generar con IA</button>'+
    '</div>'+

    '<div id="adm-vocab-manual-sec">';

  /* Tarea 1 — Definición (ESPAÑOL) */
  html+=
    '<div class="adm-q-block">'+
    '<div class="adm-q-block-title">Tarea 1 — Elige la mejor definición '+
    '<span style="font-size:9.5px;color:#FFD83D;font-weight:900;">🇪🇸 ESPAÑOL</span></div>'+
    '<div class="adm-mc-opts">';
  ['a','b','c','d'].forEach(function(l,i){
    html+='<div class="adm-field"><label>Opción '+l.toUpperCase()+'</label>'+
      '<input type="text" data-key="def_opt_'+l+'" value="'+_esc(def.options[i]||'')+'"></div>';
  });
  html+='</div><div class="adm-mc-ans"><span style="font-size:11px;color:#5BE9F6;margin-right:4px;">Correcta:</span>';
  ['A','B','C','D'].forEach(function(l){
    html+='<label><input type="radio" name="def_answer" value="'+l+'"'+((def.answer||'A')===l?' checked':'')+'>'+l+'</label>';
  });
  html+='</div></div>';

  /* Tarea 2 — Contexto (ENGLISH) */
  html+=
    '<div class="adm-q-block">'+
    '<div class="adm-q-block-title">Tarea 2 — Choose the correct usage '+
    '<span style="font-size:9.5px;color:#5BE9F6;font-weight:900;">🇺🇸 ENGLISH</span></div>'+
    '<div class="adm-mc-opts">';
  ['a','b','c','d'].forEach(function(l,i){
    html+='<div class="adm-field"><label>Sentence '+l.toUpperCase()+'</label>'+
      '<textarea data-key="ctx_opt_'+l+'" rows="2" style="font-size:12px;background:#0d0720;border:1px solid #2d1854;border-radius:7px;padding:7px 10px;color:#e0d6ff;width:100%;box-sizing:border-box;resize:vertical;">'+_esc(ctx.options[i]||'')+'</textarea></div>';
  });
  html+='</div><div class="adm-mc-ans"><span style="font-size:11px;color:#5BE9F6;margin-right:4px;">Correct:</span>';
  ['A','B','C','D'].forEach(function(l){
    html+='<label><input type="radio" name="ctx_answer" value="'+l+'"'+((ctx.answer||'A')===l?' checked':'')+'>'+l+'</label>';
  });
  html+='</div></div>';

  /* Tarea 3 — Familia (ENGLISH) */
  html+=
    '<div class="adm-q-block">'+
    '<div class="adm-q-block-title">Tarea 3 — Word Family '+
    '<span style="font-size:9.5px;color:#5BE9F6;font-weight:900;">🇺🇸 ENGLISH</span></div>'+
    '<div class="adm-field" style="margin-bottom:6px;"><label>Sentence 1 <span style="font-size:10px;color:#6b7280;">(use ___ for the blank)</span></label>'+
    '<input type="text" data-key="fam_s1" value="'+_esc(fam.sentence1||'')+'" placeholder="The ___ was overwhelming."></div>'+
    '<div class="adm-mc-opts">';
  ['a','b','c'].forEach(function(l,i){
    html+='<div class="adm-field"><label>Option '+l.toUpperCase()+'</label>'+
      '<input type="text" data-key="fam1_opt_'+l+'" value="'+_esc(fam.options1[i]||'')+'"></div>';
  });
  html+='</div><div class="adm-mc-ans"><span style="font-size:11px;color:#5BE9F6;margin-right:4px;">Correct:</span>';
  ['A','B','C'].forEach(function(l){
    html+='<label><input type="radio" name="fam1_answer" value="'+l+'"'+((fam.answer1||'A')===l?' checked':'')+'>'+l+'</label>';
  });
  html+='</div>'+
    '<div class="adm-field" style="margin-top:10px;margin-bottom:6px;"><label>Sentence 2 <span style="font-size:10px;color:#6b7280;">(use ___ for the blank)</span></label>'+
    '<input type="text" data-key="fam_s2" value="'+_esc(fam.sentence2||'')+'" placeholder="He waited ___ outside."></div>'+
    '<div class="adm-mc-opts">';
  ['a','b','c'].forEach(function(l,i){
    html+='<div class="adm-field"><label>Option '+l.toUpperCase()+'</label>'+
      '<input type="text" data-key="fam2_opt_'+l+'" value="'+_esc(fam.options2[i]||'')+'"></div>';
  });
  html+='</div><div class="adm-mc-ans"><span style="font-size:11px;color:#5BE9F6;margin-right:4px;">Correct:</span>';
  ['A','B','C'].forEach(function(l){
    html+='<label><input type="radio" name="fam2_answer" value="'+l+'"'+((fam.answer2||'A')===l?' checked':'')+'>'+l+'</label>';
  });
  html+='</div></div>';

  html+='</div>'; /* #adm-vocab-manual-sec */

  html+=
    '<div id="adm-vocab-ai-sec" style="display:none;">'+
    '<div class="adm-q-block"><div class="adm-q-block-title">Generar todo el contenido con IA</div>'+
    '<p style="font-size:11px;color:#5BE9F6;margin-bottom:10px;">'+
    'Genera IPA, categoría, definición (español), uso en contexto (inglés) y familia de palabras (inglés).</p>'+
    '<button id="adm-vocab-ai-gen-btn" onclick="admGenerateVocabAI()" '+
    'style="background:rgba(91,233,246,.15);border:1px solid rgba(91,233,246,.5);color:#5BE9F6;padding:9px 18px;'+
    'border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;width:100%;">'+
    '✨ Generar con IA — "'+_esc(w.word||'...')+'"</button></div></div>';

  return html;
}

/* ── Navegación de tabs ──────────────────────────────────────── */
window._admVocabSwitchTab=function(idx){_readActiveTab();_readConfig();_activeTab=idx;_renderPoolUI(_v(),(document.getElementById('adm-lang')||{}).value||'en');};
window._admVocabAddTab=function(){_readActiveTab();_readConfig();_words.push(_blankWord(''));_activeTab=_words.length-1;_renderPoolUI(_v(),(document.getElementById('adm-lang')||{}).value||'en');};
window._admVocabDelTab=function(idx){if(_words.length<=1){_toast('⚠ Debe quedar al menos una palabra');return;}_words.splice(idx,1);_activeTab=Math.min(_activeTab,_words.length-1);_renderPoolUI(_v(),(document.getElementById('adm-lang')||{}).value||'en');};
window._admVocabWordRename=function(idx,val){if(_words[idx])_words[idx].word=val;var tabs=document.querySelectorAll('#adm-vocab-tab-bar .adm-rt-tab');if(tabs[idx]){var l=val.trim()||('P'+(idx+1));tabs[idx].textContent=l.length>14?l.substring(0,12)+'…':l;}};

/* ── Batch ───────────────────────────────────────────────────── */
window._admVocabToggleBatch=function(){
  var a=document.getElementById('adm-vocab-batch-area');
  if(a) a.style.display=a.style.display==='none'?'block':'none';
};

window._admVocabBatchAdd=function(){
  var ta=document.getElementById('adm-vocab-batch-ta'); if(!ta)return;
  var raw=ta.value||'';
  var words=raw.split(/[\n,;]/).map(function(w){return w.trim();}).filter(function(w){return w.length>0;});
  if(!words.length){_toast('⚠ No se detectaron palabras');return;}
  _readActiveTab();_readConfig();
  // Eliminar palabras placeholder vacías antes de agregar
  _words=_words.filter(function(w){return(w.word||'').trim();});
  words.forEach(function(w){_words.push(_blankWord(w));});
  _activeTab=Math.max(0,_words.length-words.length);
  ta.value='';
  _renderPoolUI(_v(),(document.getElementById('adm-lang')||{}).value||'en');
  _toast('✓ '+words.length+' palabra(s) agregadas');
};

/* ── Generar todas sin contenido ─────────────────────────────── */
window._admVocabGenAll=async function(){
  var btn=document.getElementById('adm-vocab-gen-all-btn');
  if(btn){btn.disabled=true;btn.textContent='⏳ Generando...';}
  var indices=[];
  _words.forEach(function(w,i){if((w.word||'').trim()&&!w.ipa)indices.push(i);});
  for(var i=0;i<indices.length;i++){
    var idx=indices[i];
    var wordName=_words[idx].word.trim();
    _toast('⏳ ('+( i+1)+'/'+indices.length+') Generando "'+wordName+'"…');
    await _silentGenerate(idx);
    await new Promise(function(r){setTimeout(r,400);});
  }
  _activeTab=indices[0]>=0?indices[0]:0;
  _renderPoolUI(_v(),(document.getElementById('adm-lang')||{}).value||'en');
  _toast('✓ '+indices.length+' palabras generadas · revisa y guarda');
};

/* ── Generación silenciosa (sin UI) ──────────────────────────── */
async function _silentGenerate(idx){
  var sb=_sb(); if(!sb)return;
  var w=_words[idx]; if(!w||(!(w.word||'').trim()))return;
  try{
    var resp=await sb.functions.invoke('teacher-chat',{body:{system:_buildPrompt(),messages:[{role:'user',content:'Word: '+w.word.trim()}]}});
    if(resp.error)throw resp.error;
    var raw=resp.data&&resp.data.choices&&resp.data.choices[0]&&resp.data.choices[0].message&&resp.data.choices[0].message.content;
    if(!raw)throw new Error('empty');
    raw=raw.replace(/^```[a-z]*\n?/i,'').replace(/\n?```$/,'').trim();
    var m=raw.match(/\{[\s\S]*\}/); if(!m)throw new Error('no JSON');
    var d=JSON.parse(m[0]);
    if(d.ipa)w.ipa=d.ipa;
    if(d.pos)w.pos=d.pos;
    if(d.definition)w.definition=d.definition;
    if(d.context)w.context=d.context;
    if(d.family)w.family=d.family;
  }catch(e){console.error('[VocabAI silent]',w.word,e);}
}

/* ── Modo Manual / IA ────────────────────────────────────────── */
window.admVocabMode=function(mode){
  var mb=document.getElementById('adm-vocab-mode-manual');
  var ab=document.getElementById('adm-vocab-mode-ai');
  var ms=document.getElementById('adm-vocab-manual-sec');
  var as=document.getElementById('adm-vocab-ai-sec');
  if(!mb||!ab||!ms||!as)return;
  if(mode==='ai'){ab.classList.add('active');mb.classList.remove('active');ms.style.display='none';as.style.display='block';}
  else{mb.classList.add('active');ab.classList.remove('active');ms.style.display='block';as.style.display='none';}
};

/* ── Generar con IA (un tab) ─────────────────────────────────── */
window.admGenerateVocabAI=async function(){
  var sb=_sb(); if(!sb){_toast('❌ Sin Supabase');return;}
  var w=_words[_activeTab];
  if(!w||!(w.word||'').trim()){_toast('❌ Escribe la palabra primero');return;}
  var btn=document.getElementById('adm-vocab-ai-gen-btn');
  if(btn){btn.disabled=true;btn.textContent='⏳ Generando…';}
  _toast('⏳ Generando "'+w.word.trim()+'"…');
  try{
    var resp=await sb.functions.invoke('teacher-chat',{body:{system:_buildPrompt(),messages:[{role:'user',content:'Word: '+w.word.trim()}]}});
    if(resp.error)throw resp.error;
    var raw=resp.data&&resp.data.choices&&resp.data.choices[0]&&resp.data.choices[0].message&&resp.data.choices[0].message.content;
    if(!raw)throw new Error('Respuesta vacía');
    raw=raw.replace(/^```[a-z]*\n?/i,'').replace(/\n?```$/,'').trim();
    var m=raw.match(/\{[\s\S]*\}/); if(!m)throw new Error('JSON no encontrado');
    _fillVocabForm(JSON.parse(m[0]));
    window.admVocabMode('manual');
    _toast('✓ Contenido generado · revisa y guarda');
  }catch(e){_toast('❌ '+(e.message||e));console.error('[VocabAI]',e);}
  finally{if(btn){btn.disabled=false;btn.textContent='✨ Generar con IA — "'+w.word.trim()+'"';}}
};

/* ── System prompt (idioma fijo) ─────────────────────────────── */
function _buildPrompt(){
  return(
    'You are an English vocabulary exam creator.\n'+
    'Given an English word, generate structured exam content.\n\n'+
    'Respond ONLY with valid JSON — no markdown, no explanation:\n'+
    '{\n'+
    '  "ipa": "/phonetic/",\n'+
    '  "pos": "pos_abbr · field1 · field2",\n'+
    '  "definition": {\n'+
    '    "options": ["A) ...","B) ...","C) ...","D) ..."],\n'+
    '    "answer": "B"\n'+
    '  },\n'+
    '  "context": {\n'+
    '    "options": ["A) English sentence.","B) ...","C) ...","D) ..."],\n'+
    '    "answer": "A"\n'+
    '  },\n'+
    '  "family": {\n'+
    '    "sentence1": "English sentence with ___ blank.",\n'+
    '    "options1": ["word1","word2","word3"],\n'+
    '    "answer1": "A",\n'+
    '    "sentence2": "Another English sentence with ___ blank.",\n'+
    '    "options2": ["word1","word2","word3"],\n'+
    '    "answer2": "B"\n'+
    '  }\n'+
    '}\n\n'+
    'LANGUAGE RULES — strictly follow:\n'+
    '- definition.options: 4 definitions/explanations IN SPANISH. Only 1 is the correct/best definition of the word.\n'+
    '- context.options: 4 complete sentences IN ENGLISH. Only 1 uses the word correctly in context.\n'+
    '- family sentences and options: IN ENGLISH. 3 word-family forms (e.g. for "nervous": ["nervousness","nervously","nervous"]).\n'+
    '- ipa: standard IPA notation (e.g. "/ˈnɜːvəs/").\n'+
    '- pos: "pos_abbr · semantic_field · register" IN ENGLISH (e.g. "adj. · feelings · everyday").\n'+
    '- definition.answer and context.answer: exactly "A","B","C" or "D".\n'+
    '- family.answer1 and family.answer2: exactly "A","B" or "C".'
  );
}

/* ── Rellenar formulario ─────────────────────────────────────── */
function _fillVocabForm(d){
  if(!d)return;
  var body=document.getElementById('adm-dw-body'); if(!body)return;
  var ipaEl=body.querySelector('[data-key="vocab_ipa"]'); var posEl=body.querySelector('[data-key="vocab_pos"]');
  if(ipaEl&&d.ipa){ipaEl.value=d.ipa;if(_words[_activeTab])_words[_activeTab].ipa=d.ipa;}
  if(posEl&&d.pos){posEl.value=d.pos;if(_words[_activeTab])_words[_activeTab].pos=d.pos;}
  if(d.definition){
    ['a','b','c','d'].forEach(function(l,i){var el=body.querySelector('[data-key="def_opt_'+l+'"]');if(el)el.value=d.definition.options?(d.definition.options[i]||''):'';});
    var r=body.querySelector('input[name="def_answer"][value="'+(d.definition.answer||'A').toUpperCase()+'"]');if(r)r.checked=true;
  }
  if(d.context){
    ['a','b','c','d'].forEach(function(l,i){var el=body.querySelector('[data-key="ctx_opt_'+l+'"]');if(el)el.value=d.context.options?(d.context.options[i]||''):'';});
    var cr=body.querySelector('input[name="ctx_answer"][value="'+(d.context.answer||'A').toUpperCase()+'"]');if(cr)cr.checked=true;
  }
  if(d.family){
    var s1=body.querySelector('[data-key="fam_s1"]');var s2=body.querySelector('[data-key="fam_s2"]');
    if(s1)s1.value=d.family.sentence1||'';if(s2)s2.value=d.family.sentence2||'';
    ['a','b','c'].forEach(function(l,i){
      var e1=body.querySelector('[data-key="fam1_opt_'+l+'"]');var e2=body.querySelector('[data-key="fam2_opt_'+l+'"]');
      if(e1)e1.value=d.family.options1?(d.family.options1[i]||''):'';if(e2)e2.value=d.family.options2?(d.family.options2[i]||''):'';
    });
    var fr1=body.querySelector('input[name="fam1_answer"][value="'+(d.family.answer1||'A').toUpperCase()+'"]');if(fr1)fr1.checked=true;
    var fr2=body.querySelector('input[name="fam2_answer"][value="'+(d.family.answer2||'A').toUpperCase()+'"]');if(fr2)fr2.checked=true;
  }
}

})();

/* ════════════════════════════════════════════════════════════════
   admin-examen-vocab-ai.js  v1
   Pool manager para Vocabulary en admin-examen-editor.html.
   · Tabs por palabra + botón "+" para agregar palabras
   · Config: words_per_exam (cuántas palabras aleatorias en el examen)
   · Cada palabra: IPA, pos (✨ IA), definición MC, contexto MC, familia
   · Generación completa con IA via Supabase Edge Function teacher-chat
   · Guarda pool en Supabase (content_type='vocab_word' + 'vocab_config')
   · V1–V2 → contenido en ESPAÑOL · V3–V4–V5 → en INGLÉS
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var RANK_BY_V = {1:'bronce',2:'plata',3:'oro',4:'platino',5:'diamante'};

/* ── Estado del pool en memoria ─────────────────────────────── */
var _words = [];
var _config = {words_per_exam: 5};
var _activeTab = 0;

/* ── Helpers ─────────────────────────────────────────────────── */
function _sb(){ return (window._aura && window._aura.sb) ? window._aura.sb : null; }
function _toast(msg){ if(typeof window.admShowToast==='function') window.admShowToast(msg); }
function _v(){ return window._admCurrV || 1; }
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function _useEN(ver){ return (ver||_v()) >= 3; }

/* ── Blank word factory ──────────────────────────────────────── */
function _blankWord(word){
  return {
    word: word || '',
    ipa: '',
    pos: '',
    definition: { options: ['','','',''], answer: 'A' },
    context: { options: ['','','',''], answer: 'A' },
    family: {
      sentence1: '', options1: ['','',''], answer1: 'A',
      sentence2: '', options2: ['','',''], answer2: 'A'
    }
  };
}

/* ── Cargar pool desde Supabase ──────────────────────────────── */
async function _loadPool(ver, lang){
  _words = [];
  _config = {words_per_exam: 5};
  var sb = _sb(); if(!sb) return;
  var rank = RANK_BY_V[ver||1] || 'bronce';

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
  var res = await sb.from('exam_content').select('*')
    .eq('section','vocabulary').eq('content_type','vocab_word')
    .eq('rank',rank).eq('language',lang).eq('active',true)
    .order('created_at',{ascending:true});
  if(res.error){ console.warn('[VocabPool] load:', res.error); return; }
  _words = (res.data||[]).map(function(row){
    var c = row.content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c=null;}}
    return c || _blankWord('');
  });
  if(!_words.length) _words.push(_blankWord(''));
}

/* ── Guardar pool en Supabase ────────────────────────────────── */
window.admSaveVocabPool = async function(ver, lang){
  var sb = _sb();
  if(!sb){ _toast('❌ Sin Supabase'); return; }
  var rank = RANK_BY_V[ver||1] || 'bronce';

  _readActiveTab();
  _readConfig();
  _toast('⏳ Guardando pool…');

  // Borrar existentes
  await sb.from('exam_content').delete()
    .eq('section','vocabulary').eq('content_type','vocab_word')
    .eq('rank',rank).eq('language',lang);
  await sb.from('exam_content').delete()
    .eq('section','vocabulary').eq('content_type','vocab_config')
    .eq('rank',rank).eq('language',lang);

  // Insertar config
  var cfgIns = await sb.from('exam_content').insert({
    section:'vocabulary', content_type:'vocab_config',
    rank:rank, language:lang, active:true, difficulty:1,
    content: _config
  });
  if(cfgIns.error) console.warn('[VocabPool] config insert:', cfgIns.error);

  // Insertar palabras con contenido
  var rows = _words
    .filter(function(w){ return (w.word||'').trim(); })
    .map(function(w){
      return { section:'vocabulary', content_type:'vocab_word', rank:rank,
               language:lang, active:true, difficulty:3, content:w };
    });

  if(!rows.length){ _toast('⚠ No hay palabras con contenido'); return; }

  var ins = await sb.from('exam_content').insert(rows);
  if(ins.error){ _toast('❌ Error: '+ins.error.message); return; }

  _toast('✓ Pool guardado · '+rows.length+' palabra(s)');
  if(typeof window.admCloseDrawer==='function') window.admCloseDrawer();
};

/* ── Leer tab activo → _words[_activeTab] ───────────────────── */
function _readActiveTab(){
  var body = document.getElementById('adm-dw-body');
  if(!body) return;
  var ti = _activeTab;
  if(ti < 0 || ti >= _words.length) return;
  var w = _words[ti];

  var nameEl = body.querySelector('[data-key="vocab_word_name"]');
  if(nameEl) w.word = (nameEl.value||'').trim();

  var ipaEl = body.querySelector('[data-key="vocab_ipa"]');
  var posEl = body.querySelector('[data-key="vocab_pos"]');
  if(ipaEl) w.ipa = (ipaEl.value||'').trim();
  if(posEl) w.pos = (posEl.value||'').trim();

  // Definicion MC
  ['a','b','c','d'].forEach(function(l,i){
    var el = body.querySelector('[data-key="def_opt_'+l+'"]');
    if(el) w.definition.options[i] = (el.value||'').trim();
  });
  var defAns = body.querySelector('input[name="def_answer"]:checked');
  if(defAns) w.definition.answer = defAns.value;

  // Contexto MC
  ['a','b','c','d'].forEach(function(l,i){
    var el = body.querySelector('[data-key="ctx_opt_'+l+'"]');
    if(el) w.context.options[i] = (el.value||'').trim();
  });
  var ctxAns = body.querySelector('input[name="ctx_answer"]:checked');
  if(ctxAns) w.context.answer = ctxAns.value;

  // Familia
  var s1 = body.querySelector('[data-key="fam_s1"]');
  var s2 = body.querySelector('[data-key="fam_s2"]');
  if(s1) w.family.sentence1 = (s1.value||'').trim();
  if(s2) w.family.sentence2 = (s2.value||'').trim();
  ['a','b','c'].forEach(function(l,i){
    var e1 = body.querySelector('[data-key="fam1_opt_'+l+'"]');
    var e2 = body.querySelector('[data-key="fam2_opt_'+l+'"]');
    if(e1) w.family.options1[i] = (e1.value||'').trim();
    if(e2) w.family.options2[i] = (e2.value||'').trim();
  });
  var a1 = body.querySelector('input[name="fam1_answer"]:checked');
  var a2 = body.querySelector('input[name="fam2_answer"]:checked');
  if(a1) w.family.answer1 = a1.value;
  if(a2) w.family.answer2 = a2.value;
}

/* ── Leer config ─────────────────────────────────────────────── */
function _readConfig(){
  var el = document.getElementById('adm-vocab-wpe');
  if(el) _config.words_per_exam = Math.max(1, parseInt(el.value)||5);
}

/* ── Render completo del pool en el drawer ───────────────────── */
window.admRenderVocabPool = async function(sd, ver, lang){
  var body = document.getElementById('adm-dw-body');
  if(!body) return;
  body.innerHTML = '<div style="font-size:12px;color:#5BE9F6;text-align:center;padding:24px;opacity:.6;">Cargando pool de vocabulario…</div>';
  await _loadPool(ver, lang);
  _activeTab = 0;
  _renderPoolUI(ver, lang);
};

/* ── Construir UI del pool ───────────────────────────────────── */
function _renderPoolUI(ver, lang){
  var body = document.getElementById('adm-dw-body');
  if(!body) return;

  var totalWords = _words.filter(function(w){ return (w.word||'').trim(); }).length;

  var configHtml =
    '<div class="adm-section-label">Configuración del pool</div>'+
    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:4px;">'+
    '<div class="adm-field" style="flex:1;"><label>Palabras por examen</label>'+
    '<input type="number" id="adm-vocab-wpe" min="1" max="100" value="'+(_config.words_per_exam||5)+'" style="max-width:80px;"></div>'+
    '<div style="font-size:10.5px;color:#6b7280;padding-top:18px;">de '+totalWords+' en el pool</div>'+
    '</div>';

  var tabsHtml = '<div class="adm-section-label" style="margin-top:10px;">Palabras</div>'+
    '<div class="adm-read-tabs" id="adm-vocab-tab-bar">';
  _words.forEach(function(w,i){
    var raw = (w.word||'').trim();
    var label = raw ? (raw.length > 14 ? raw.substring(0,12)+'…' : raw) : ('P'+(i+1));
    var active = i === _activeTab ? ' adm-rt-active' : '';
    tabsHtml += '<button class="adm-rt-tab'+active+'" onclick="window._admVocabSwitchTab('+i+')">'+_esc(label)+'</button>';
  });
  tabsHtml += '<button class="adm-rt-add" onclick="window._admVocabAddTab()" title="Agregar palabra">＋</button></div>';

  var editorHtml = _buildWordEditor(_words[_activeTab] || _blankWord(''), _activeTab, ver);

  var delBtn = _words.length > 1
    ? '<button class="adm-rt-del" onclick="window._admVocabDelTab('+_activeTab+')">🗑 Eliminar esta palabra</button>'
    : '';

  body.innerHTML = configHtml + tabsHtml + editorHtml + delBtn;
}

/* ── Editor HTML de una palabra ─────────────────────────────── */
function _buildWordEditor(w, idx, ver){
  var useEN = _useEN(ver);
  var def = w.definition || {options:['','','',''], answer:'A'};
  var ctx = w.context   || {options:['','','',''], answer:'A'};
  var fam = w.family    || {sentence1:'',options1:['','',''],answer1:'A',sentence2:'',options2:['','',''],answer2:'A'};

  var langNote = useEN ? 'Contenido en INGLÉS (V3–V5)' : 'Contenido en ESPAÑOL (V1–V2)';
  var defLabel = useEN ? 'Choose the best definition' : 'Elige la mejor definición';
  var ctxLabel = useEN ? 'Choose the sentence where the word is used correctly' : 'Elige la oración donde se usa correctamente';
  var famLabel = useEN ? 'Word Family — fill in the blanks' : 'Familia de palabras — completa los espacios';

  var html = '<div class="adm-section-label" style="margin-top:12px;">'+
    _esc((w.word||'Palabra '+(idx+1)))+
    ' <span style="font-size:10px;color:#6b7280;">['+langNote+']</span></div>';

  html += '<div class="adm-field"><label>Palabra</label>'+
    '<input type="text" data-key="vocab_word_name" value="'+_esc(w.word||'')+'" '+
    'oninput="window._admVocabWordRename('+idx+',this.value)" placeholder="ej: nervous"></div>';

  html += '<div class="adm-hero-grid" style="margin-bottom:8px;">'+
    '<div class="adm-field"><label>IPA <span style="color:#5BE9F6;font-size:9px;font-weight:900;">✨ IA</span></label>'+
    '<input type="text" data-key="vocab_ipa" value="'+_esc(w.ipa||'')+'" placeholder="/ˈnɜːvəs/" style="font-family:monospace;"></div>'+
    '<div class="adm-field"><label>Categoría <span style="color:#5BE9F6;font-size:9px;font-weight:900;">✨ IA</span></label>'+
    '<input type="text" data-key="vocab_pos" value="'+_esc(w.pos||'')+'" placeholder="adj. · feelings · everyday"></div>'+
    '</div>';

  html += '<div class="adm-mode-row">'+
    '<button class="adm-mode-btn active" id="adm-vocab-mode-manual" onclick="admVocabMode(\'manual\')">✏️ Manual</button>'+
    '<button class="adm-mode-btn" id="adm-vocab-mode-ai" onclick="admVocabMode(\'ai\')">✨ Generar con IA</button>'+
    '</div>';

  html += '<div id="adm-vocab-manual-sec">';

  // Definicion
  html += '<div class="adm-q-block"><div class="adm-q-block-title">Tarea 1 — '+defLabel+'</div><div class="adm-mc-opts">';
  ['a','b','c','d'].forEach(function(l,i){
    html += '<div class="adm-field"><label>Opción '+l.toUpperCase()+'</label>'+
      '<input type="text" data-key="def_opt_'+l+'" value="'+_esc(def.options[i]||'')+'"></div>';
  });
  html += '</div><div class="adm-mc-ans"><span style="font-size:11px;color:#5BE9F6;margin-right:4px;">Correcta:</span>';
  ['A','B','C','D'].forEach(function(l){
    var chk = (def.answer||'A') === l ? ' checked' : '';
    html += '<label><input type="radio" name="def_answer" value="'+l+'"'+chk+'>'+l+'</label>';
  });
  html += '</div></div>';

  // Contexto
  html += '<div class="adm-q-block"><div class="adm-q-block-title">Tarea 2 — '+ctxLabel+'</div><div class="adm-mc-opts">';
  ['a','b','c','d'].forEach(function(l,i){
    html += '<div class="adm-field"><label>Oración '+l.toUpperCase()+'</label>'+
      '<textarea data-key="ctx_opt_'+l+'" rows="2" style="font-size:12px;background:#0d0720;border:1px solid #2d1854;border-radius:7px;padding:7px 10px;color:#e0d6ff;width:100%;box-sizing:border-box;resize:vertical;">'+_esc(ctx.options[i]||'')+'</textarea></div>';
  });
  html += '</div><div class="adm-mc-ans"><span style="font-size:11px;color:#5BE9F6;margin-right:4px;">Correcta:</span>';
  ['A','B','C','D'].forEach(function(l){
    var chk = (ctx.answer||'A') === l ? ' checked' : '';
    html += '<label><input type="radio" name="ctx_answer" value="'+l+'"'+chk+'>'+l+'</label>';
  });
  html += '</div></div>';

  // Familia
  html += '<div class="adm-q-block"><div class="adm-q-block-title">Tarea 3 — '+famLabel+'</div>';
  html += '<div class="adm-field" style="margin-bottom:6px;"><label>Oración 1 <span style="font-size:10px;color:#6b7280;">(usa ___ para el espacio)</span></label>'+
    '<input type="text" data-key="fam_s1" value="'+_esc(fam.sentence1||'')+'" placeholder="The ___ was overwhelming."></div><div class="adm-mc-opts">';
  ['a','b','c'].forEach(function(l,i){
    html += '<div class="adm-field"><label>Opción '+l.toUpperCase()+'</label>'+
      '<input type="text" data-key="fam1_opt_'+l+'" value="'+_esc(fam.options1[i]||'')+'"></div>';
  });
  html += '</div><div class="adm-mc-ans"><span style="font-size:11px;color:#5BE9F6;margin-right:4px;">Correcta:</span>';
  ['A','B','C'].forEach(function(l){
    var chk = (fam.answer1||'A') === l ? ' checked' : '';
    html += '<label><input type="radio" name="fam1_answer" value="'+l+'"'+chk+'>'+l+'</label>';
  });
  html += '</div>';

  html += '<div class="adm-field" style="margin-top:10px;margin-bottom:6px;"><label>Oración 2 <span style="font-size:10px;color:#6b7280;">(usa ___ para el espacio)</span></label>'+
    '<input type="text" data-key="fam_s2" value="'+_esc(fam.sentence2||'')+'" placeholder="He waited ___ outside."></div><div class="adm-mc-opts">';
  ['a','b','c'].forEach(function(l,i){
    html += '<div class="adm-field"><label>Opción '+l.toUpperCase()+'</label>'+
      '<input type="text" data-key="fam2_opt_'+l+'" value="'+_esc(fam.options2[i]||'')+'"></div>';
  });
  html += '</div><div class="adm-mc-ans"><span style="font-size:11px;color:#5BE9F6;margin-right:4px;">Correcta:</span>';
  ['A','B','C'].forEach(function(l){
    var chk = (fam.answer2||'A') === l ? ' checked' : '';
    html += '<label><input type="radio" name="fam2_answer" value="'+l+'"'+chk+'>'+l+'</label>';
  });
  html += '</div></div>';

  html += '</div>'; // #adm-vocab-manual-sec

  html += '<div id="adm-vocab-ai-sec" style="display:none;">'+
    '<div class="adm-q-block"><div class="adm-q-block-title">Generar todo el contenido con IA</div>'+
    '<p style="font-size:11px;color:#5BE9F6;margin-bottom:10px;">La IA generará: IPA, categoría, definición MC, uso en contexto MC y familia de palabras. Contenido en <b>'+(useEN?'inglés':'español')+'</b>.</p>'+
    '<button id="adm-vocab-ai-gen-btn" onclick="admGenerateVocabAI()" '+
    'style="background:rgba(91,233,246,.15);border:1px solid rgba(91,233,246,.5);color:#5BE9F6;padding:9px 18px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;width:100%;">'+
    '✨ Generar con IA — "'+_esc(w.word||'...')+'"</button></div></div>';

  return html;
}

/* ── Cambiar tab ─────────────────────────────────────────────── */
window._admVocabSwitchTab = function(idx){
  _readActiveTab(); _readConfig();
  _activeTab = idx;
  _renderPoolUI(_v(), (document.getElementById('adm-lang')||{}).value||'en');
};

/* ── Agregar tab ─────────────────────────────────────────────── */
window._admVocabAddTab = function(){
  _readActiveTab(); _readConfig();
  _words.push(_blankWord(''));
  _activeTab = _words.length - 1;
  _renderPoolUI(_v(), (document.getElementById('adm-lang')||{}).value||'en');
};

/* ── Eliminar tab ────────────────────────────────────────────── */
window._admVocabDelTab = function(idx){
  if(_words.length <= 1){ _toast('⚠ Debe quedar al menos una palabra'); return; }
  _words.splice(idx, 1);
  _activeTab = Math.min(_activeTab, _words.length - 1);
  _renderPoolUI(_v(), (document.getElementById('adm-lang')||{}).value||'en');
};

/* ── Rename en vivo ──────────────────────────────────────────── */
window._admVocabWordRename = function(idx, val){
  if(_words[idx]) _words[idx].word = val;
  var tabs = document.querySelectorAll('#adm-vocab-tab-bar .adm-rt-tab');
  if(tabs[idx]){
    var label = val.trim() || ('P'+(idx+1));
    if(label.length > 14) label = label.substring(0,12)+'…';
    tabs[idx].textContent = label;
  }
};

/* ── Modo Manual / IA ────────────────────────────────────────── */
window.admVocabMode = function(mode){
  var manualBtn = document.getElementById('adm-vocab-mode-manual');
  var aiBtn     = document.getElementById('adm-vocab-mode-ai');
  var manualSec = document.getElementById('adm-vocab-manual-sec');
  var aiSec     = document.getElementById('adm-vocab-ai-sec');
  if(!manualBtn||!aiBtn||!manualSec||!aiSec) return;
  if(mode === 'ai'){
    aiBtn.classList.add('active'); manualBtn.classList.remove('active');
    manualSec.style.display = 'none'; aiSec.style.display = 'block';
  } else {
    manualBtn.classList.add('active'); aiBtn.classList.remove('active');
    manualSec.style.display = 'block'; aiSec.style.display = 'none';
  }
};

/* ── Generar con IA ──────────────────────────────────────────── */
window.admGenerateVocabAI = async function(){
  var sb = _sb();
  if(!sb){ _toast('❌ Sin conexión Supabase'); return; }
  var ver  = _v();
  var useEN = _useEN(ver);
  var w    = _words[_activeTab];
  if(!w || !(w.word||'').trim()){ _toast('❌ Escribe la palabra primero'); return; }
  var word = w.word.trim();

  var btn = document.getElementById('adm-vocab-ai-gen-btn');
  if(btn){ btn.disabled = true; btn.textContent = '⏳ Generando…'; }
  _toast('⏳ Generando contenido para "'+word+'"…');

  var qLang = useEN ? 'ENGLISH' : 'SPANISH';
  var qNote = useEN
    ? 'Generate ALL content IN ENGLISH.'
    : 'Generate ALL definitions, options and sentences IN SPANISH. The target word stays in English but all explanations and sentences must be in Spanish.';
  var famNote = useEN
    ? 'options1 and options2: exactly 3 word-family forms (e.g. for "nervous": ["nervousness","nervously","nervous"]). Use ___ as blank in sentences.'
    : 'options1 y options2: exactamente 3 formas de la familia lexica. Usa ___ como espacio en blanco.';

  var systemMsg =
    'You are an English vocabulary exam creator.\n'+
    'Given an English word, generate structured exam content.\n'+qNote+'\n\n'+
    'Respond ONLY with valid JSON — no markdown, no explanation:\n'+
    '{\n  "ipa": "/phonetic/",\n  "pos": "pos_abbr · field1 · field2",\n'+
    '  "definition": {"options":["A) ...","B) ...","C) ...","D) ..."],"answer":"B"},\n'+
    '  "context": {"options":["A) sentence using the word correctly","B) wrong usage","C) wrong usage","D) wrong usage"],"answer":"A"},\n'+
    '  "family": {"sentence1":"Sentence with ___ blank.","options1":["w1","w2","w3"],"answer1":"A",\n'+
    '             "sentence2":"Another sentence with ___ blank.","options2":["w1","w2","w3"],"answer2":"B"}\n'+
    '}\n\nRules:\n'+
    '- ipa: standard IPA (e.g. "/ˈnɜːvəs/").\n'+
    '- pos: "pos_abbr · semantic_field · register" (e.g. "adj. · feelings · everyday").\n'+
    '- definition.options: 4 options, only 1 correct. definition.answer: "A","B","C" or "D".\n'+
    '- context.options: 4 complete sentences. Only 1 uses the word correctly. context.answer: "A","B","C" or "D".\n'+
    '- '+famNote+'\n'+
    '- family.answer1 and family.answer2: "A","B" or "C".\n'+
    '- All content in '+qLang+'.';

  try{
    var resp = await sb.functions.invoke('teacher-chat',{
      body:{ system: systemMsg, messages: [{role:'user',content:'Word: '+word}] }
    });
    if(resp.error) throw resp.error;
    var raw = resp.data && resp.data.choices && resp.data.choices[0] &&
              resp.data.choices[0].message && resp.data.choices[0].message.content;
    if(!raw) throw new Error('Respuesta vacía de la IA');
    raw = raw.replace(/^```[a-z]*\n?/i,'').replace(/\n?```$/,'').trim();
    var m = raw.match(/\{[\s\S]*\}/);
    if(!m) throw new Error('JSON no encontrado');
    var parsed = JSON.parse(m[0]);
    _fillVocabForm(parsed);
    window.admVocabMode('manual');
    _toast('✓ Contenido generado · revisa y guarda');
  }catch(e){
    _toast('❌ '+(e.message||e));
    console.error('[VocabAI]',e);
  }finally{
    if(btn){ btn.disabled = false; btn.textContent = '✨ Generar con IA — "'+word+'"'; }
  }
};

/* ── Rellenar formulario con datos de IA ─────────────────────── */
function _fillVocabForm(d){
  if(!d) return;
  var body = document.getElementById('adm-dw-body');
  if(!body) return;

  var ipaEl = body.querySelector('[data-key="vocab_ipa"]');
  var posEl = body.querySelector('[data-key="vocab_pos"]');
  if(ipaEl && d.ipa){ ipaEl.value = d.ipa; if(_words[_activeTab]) _words[_activeTab].ipa = d.ipa; }
  if(posEl && d.pos){ posEl.value = d.pos; if(_words[_activeTab]) _words[_activeTab].pos = d.pos; }

  if(d.definition){
    ['a','b','c','d'].forEach(function(l,i){
      var el = body.querySelector('[data-key="def_opt_'+l+'"]');
      if(el) el.value = d.definition.options ? (d.definition.options[i]||'') : '';
    });
    var radio = body.querySelector('input[name="def_answer"][value="'+(d.definition.answer||'A').toUpperCase()+'"]');
    if(radio) radio.checked = true;
  }

  if(d.context){
    ['a','b','c','d'].forEach(function(l,i){
      var el = body.querySelector('[data-key="ctx_opt_'+l+'"]');
      if(el) el.value = d.context.options ? (d.context.options[i]||'') : '';
    });
    var cradio = body.querySelector('input[name="ctx_answer"][value="'+(d.context.answer||'A').toUpperCase()+'"]');
    if(cradio) cradio.checked = true;
  }

  if(d.family){
    var s1 = body.querySelector('[data-key="fam_s1"]'); if(s1) s1.value = d.family.sentence1||'';
    var s2 = body.querySelector('[data-key="fam_s2"]'); if(s2) s2.value = d.family.sentence2||'';
    ['a','b','c'].forEach(function(l,i){
      var e1 = body.querySelector('[data-key="fam1_opt_'+l+'"]');
      var e2 = body.querySelector('[data-key="fam2_opt_'+l+'"]');
      if(e1) e1.value = d.family.options1 ? (d.family.options1[i]||'') : '';
      if(e2) e2.value = d.family.options2 ? (d.family.options2[i]||'') : '';
    });
    var fr1 = body.querySelector('input[name="fam1_answer"][value="'+(d.family.answer1||'A').toUpperCase()+'"]');
    if(fr1) fr1.checked = true;
    var fr2 = body.querySelector('input[name="fam2_answer"][value="'+(d.family.answer2||'A').toUpperCase()+'"]');
    if(fr2) fr2.checked = true;
  }
}

})();

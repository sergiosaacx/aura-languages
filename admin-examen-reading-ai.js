/* ════════════════════════════════════════════════════════════════
   admin-examen-reading-ai.js  v2
   Pool manager para Reading en admin-examen-editor.html.
   · Tabs (Texto 1, Texto 2 …) + botón "+" para agregar textos
   · Cada texto: título, cuerpo, MC, V/F
   · Generación con IA por texto (via Supabase Edge Function)
   · Guarda pool completo en Supabase (content_type='reading_text')
   · No usa localStorage — fuente de verdad: Supabase
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var RANK_BY_V = {1:'bronce',2:'plata',3:'oro',4:'platino',5:'diamante'};

/* ── Estado del pool en memoria ─────────────────────────────── */
var _pool = [];
var _activeTab = 0;

/* ── Helpers ─────────────────────────────────────────────────── */
function _sb(){ return (window._aura && window._aura.sb) ? window._aura.sb : null; }
function _toast(msg){ if(typeof window.admShowToast==='function') window.admShowToast(msg); }
function _v(){ return window._admCurrV || 1; }
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function _useNM(ver){ return (ver||_v()) >= 3; }

/* ── Blank text factory ─────────────────────────────────────── */
function _blankText(){
  return {
    title:'',
    body:'',
    mc:{instruction:'Read the text and choose the best answer.',question:'',options:['','','',''],answer:'A'},
    tf:[{statement:'',answer:'V'},{statement:'',answer:'V'},{statement:'',answer:'F'},{statement:'',answer:'F'}]
  };
}

/* ── Cargar pool desde Supabase ──────────────────────────────── */
async function _loadPool(ver, lang){
  _pool = [];
  var sb=_sb(); if(!sb) return;
  var rank=RANK_BY_V[ver||1]||'bronce';
  var res=await sb.from('exam_content').select('*')
    .eq('section','reading')
    .eq('content_type','reading_text')
    .eq('rank',rank)
    .eq('language',lang)
    .eq('active',true)
    .order('created_at',{ascending:true});
  if(res.error){ console.warn('[ReadPool] carga:', res.error); return; }
  _pool = (res.data||[]).map(function(row){
    var c=row.content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c=null;}}
    return c || _blankText();
  });
  if(!_pool.length) _pool.push(_blankText());
}

/* ── Guardar pool en Supabase ────────────────────────────────── */
window.admSaveReadPool = async function(ver, lang){
  var sb=_sb();
  if(!sb){ _toast('❌ Sin Supabase'); return; }
  var rank=RANK_BY_V[ver||1]||'bronce';

  // Capturar estado del tab activo antes de guardar
  _readActiveTab();

  _toast('⏳ Guardando pool…');

  // 1. Borrar todas las filas existentes para este rank+lang
  var del=await sb.from('exam_content')
    .delete()
    .eq('section','reading')
    .eq('content_type','reading_text')
    .eq('rank',rank)
    .eq('language',lang);
  if(del.error){ console.warn('[ReadPool] borrar:', del.error); }

  // 2. Insertar solo textos con contenido
  var rows=_pool
    .filter(function(t){ return (t.title||'').trim() || (t.body||'').trim(); })
    .map(function(t){
      return {
        section:'reading',
        content_type:'reading_text',
        rank:rank,
        language:lang,
        active:true,
        difficulty:3,
        content:t
      };
    });

  if(!rows.length){
    _toast('⚠ No hay textos con contenido para guardar');
    return;
  }

  var ins=await sb.from('exam_content').insert(rows);
  if(ins.error){ _toast('❌ Error: '+ins.error.message); return; }

  _toast('✓ Pool guardado · '+rows.length+' texto(s)');
  if(typeof window.admCloseDrawer==='function') window.admCloseDrawer();
  // Refrescar el panel con el texto recién guardado
  if(typeof window.initExamReading==='function'){
    var _cv=window._admCurrV||1;
    setTimeout(function(){ window.initExamReading({version:_cv, lang:lang}); }, 200);
  }
};

/* ── Leer tab activo → _pool[_activeTab] ─────────────────────── */
function _readActiveTab(){
  var body=document.getElementById('adm-dw-body');
  if(!body) return;
  var ti=_activeTab;
  if(ti < 0 || ti >= _pool.length) return;

  var titleEl=body.querySelector('[data-key="read_title"]');
  var bodyEl =body.querySelector('[data-key="read_body"]');
  if(titleEl) _pool[ti].title=(titleEl.value||'').trim();
  if(bodyEl)  _pool[ti].body =(bodyEl.value||'').trim();

  // MC
  var mcInstr=body.querySelector('[data-key="mc_instruction"]');
  var mcQ    =body.querySelector('[data-key="mc_question"]');
  var mcAns  =body.querySelector('input[name="mc_answer"]:checked');
  if(mcInstr) _pool[ti].mc.instruction=(mcInstr.value||'').trim();
  if(mcQ)     _pool[ti].mc.question   =(mcQ.value||'').trim();
  if(mcAns)   _pool[ti].mc.answer     =mcAns.value;
  ['a','b','c','d'].forEach(function(l,i){
    var el=body.querySelector('[data-key="mc_opt_'+l+'"]');
    if(el) _pool[ti].mc.options[i]=(el.value||'').trim();
  });

  // TF
  for(var i=0;i<4;i++){
    var stmtEl=body.querySelector('[data-key="tf_stmt_'+i+'"]');
    var ansEl =body.querySelector('input[name="tf_ans_'+i+'"]:checked');
    if(stmtEl) _pool[ti].tf[i].statement=(stmtEl.value||'').trim();
    if(ansEl)  _pool[ti].tf[i].answer   =ansEl.value;
  }
}

/* ── Render completo del pool en el drawer ───────────────────── */
window.admRenderReadPool = async function(sd, ver, lang){
  var body=document.getElementById('adm-dw-body');
  if(!body) return;
  body.innerHTML='<div style="font-size:12px;color:#a78bfa;text-align:center;padding:24px;opacity:.6;">Cargando textos del pool…</div>';

  await _loadPool(ver, lang);
  _activeTab=0;
  _renderPoolUI(ver, lang);
};

/* ── Construir UI del pool ───────────────────────────────────── */
function _renderPoolUI(ver, lang){
  var body=document.getElementById('adm-dw-body');
  if(!body) return;

  // Tabs header
  var tabsHtml='<div class="adm-read-tabs" id="adm-read-tab-bar">';
  _pool.forEach(function(t,i){
    var raw=(t.title||'').trim();
    var label=raw ? (raw.length>18 ? raw.substring(0,16)+'…' : raw) : ('Texto '+(i+1));
    var active=i===_activeTab?' adm-rt-active':'';
    tabsHtml+='<button class="adm-rt-tab'+active+'" onclick="window._admReadSwitchTab('+i+')">'+_esc(label)+'</button>';
  });
  tabsHtml+='<button class="adm-rt-add" onclick="window._admReadAddTab()" title="Agregar texto">＋</button>';
  tabsHtml+='</div>';

  // Editor del tab activo
  var editorHtml=_buildTabEditor(_pool[_activeTab]||_blankText(), _activeTab, ver);

  // Botón eliminar (solo si hay más de 1)
  var delBtn=_pool.length>1
    ? '<button class="adm-rt-del" onclick="window._admReadDelTab('+_activeTab+')">🗑 Eliminar este texto</button>'
    : '';

  body.innerHTML=tabsHtml+editorHtml+delBtn;
}

/* ── Editor HTML de un texto ─────────────────────────────────── */
function _buildTabEditor(text, idx, ver){
  var useNM=_useNM(ver);
  var mc=text.mc||{instruction:'Read the text and choose the best answer.',question:'',options:['','','',''],answer:'A'};
  var tf=text.tf||[{statement:'',answer:'V'},{statement:'',answer:'V'},{statement:'',answer:'F'},{statement:'',answer:'F'}];

  // Texto
  var html='<div class="adm-section-label" style="margin-top:12px;">Texto '+(idx+1)+'</div>';
  html+='<div class="adm-field"><label>Título</label><input type="text" data-key="read_title" value="'+_esc(text.title||'')+'"></div>';
  html+='<div class="adm-field"><label>Texto (separa párrafos con línea en blanco)</label><textarea data-key="read_body" rows="8" placeholder="Escribe el texto aquí…">'+_esc(text.body||'')+'</textarea></div>';

  // Modo Manual / IA
  html+='<div class="adm-section-label" style="margin-top:14px;">Preguntas</div>'+
    '<div class="adm-mode-row">'+
    '<button class="adm-mode-btn active" id="adm-read-mode-manual" onclick="admReadMode(\'manual\')">✏️ Manual</button>'+
    '<button class="adm-mode-btn" id="adm-read-mode-ai" onclick="admReadMode(\'ai\')">✨ Generar con IA</button>'+
    '</div>';

  // Sección Manual
  html+='<div id="adm-read-manual-sec">';

  // MC
  var opts=mc.options||['','','',''];
  html+='<div class="adm-q-block"><div class="adm-q-block-title">Comprensión — Opción Múltiple</div>'+
    '<div class="adm-field"><label>Instrucción</label><input type="text" data-key="mc_instruction" value="'+_esc(mc.instruction||'Read the text and choose the best answer.')+'"></div>'+
    '<div class="adm-field" style="margin-top:8px;"><label>Pregunta</label><input type="text" data-key="mc_question" value="'+_esc(mc.question||'')+'"></div>'+
    '<div class="adm-mc-opts">';
  ['a','b','c','d'].forEach(function(l,i){
    html+='<div class="adm-field"><label>Opción '+l.toUpperCase()+'</label><input type="text" data-key="mc_opt_'+l+'" value="'+_esc(opts[i]||'')+'"></div>';
  });
  html+='</div><div class="adm-mc-ans"><span style="font-size:11px;color:#a78bfa;margin-right:4px;">Correcta:</span>';
  ['A','B','C','D'].forEach(function(l){
    var chk=(mc.answer||'A')===l?' checked':'';
    html+='<label><input type="radio" name="mc_answer" value="'+l+'"'+chk+'>'+l+'</label>';
  });
  html+='</div></div>';

  // TF
  html+='<div class="adm-q-block"><div class="adm-q-block-title">Verdadero / Falso'+(useNM?' / No Mencionado':'')+'</div>';
  tf.forEach(function(item,i){
    var vchk=item.answer==='V'?' checked':'';
    var fchk=item.answer==='F'?' checked':'';
    var nmchk=item.answer==='NM'?' checked':'';
    html+='<div class="adm-tf-row">'+
      '<span style="font-size:10px;color:#6b7280;width:12px;flex-shrink:0;">'+(i+1)+'.</span>'+
      '<input type="text" class="adm-field" data-key="tf_stmt_'+i+'" style="flex:1;background:#0d0720;border:1px solid #2d1854;border-radius:7px;padding:7px 10px;color:#e0d6ff;font-size:12px;" value="'+_esc(item.statement||'')+'">'+
      '<div class="adm-tf-radios">'+
      '<label><input type="radio" name="tf_ans_'+i+'" value="V"'+vchk+'>V</label>'+
      '<label><input type="radio" name="tf_ans_'+i+'" value="F"'+fchk+'>F</label>'+
      (useNM?'<label><input type="radio" name="tf_ans_'+i+'" value="NM"'+nmchk+'>NM</label>':'')+
      '</div></div>';
  });
  html+='</div>';

  html+='</div>'; // #adm-read-manual-sec

  // Sección IA
  html+='<div id="adm-read-ai-sec" style="display:none;">'+
    '<div class="adm-q-block">'+
    '<div class="adm-q-block-title">Generar preguntas con GPT-4o-mini</div>'+
    '<p style="font-size:11px;color:#a78bfa;margin-bottom:10px;">Se usará el Título y el Texto que escribiste arriba.</p>'+
    '<button id="adm-read-ai-gen-btn" onclick="admGenerateReadingAI()">✨ Generar preguntas con IA</button>'+
    '</div></div>';

  return html;
}

/* ── Cambiar de tab ──────────────────────────────────────────── */
window._admReadSwitchTab = function(idx){
  _readActiveTab();
  _activeTab=idx;
  _renderPoolUI(_v(), (document.getElementById('adm-lang')||{}).value||'en');
};

/* ── Agregar tab ─────────────────────────────────────────────── */
window._admReadAddTab = function(){
  _readActiveTab();
  _pool.push(_blankText());
  _activeTab=_pool.length-1;
  _renderPoolUI(_v(), (document.getElementById('adm-lang')||{}).value||'en');
};

/* ── Eliminar tab ────────────────────────────────────────────── */
window._admReadDelTab = function(idx){
  if(_pool.length<=1){ _toast('⚠ Debe quedar al menos un texto'); return; }
  _pool.splice(idx,1);
  _activeTab=Math.min(_activeTab, _pool.length-1);
  _renderPoolUI(_v(), (document.getElementById('adm-lang')||{}).value||'en');
};

/* ── Modo Manual / IA ─────────────────────────────────────────── */
window.admReadMode = function(mode){
  var manualBtn=document.getElementById('adm-read-mode-manual');
  var aiBtn    =document.getElementById('adm-read-mode-ai');
  var manualSec=document.getElementById('adm-read-manual-sec');
  var aiSec    =document.getElementById('adm-read-ai-sec');
  if(!manualBtn||!aiBtn||!manualSec||!aiSec) return;
  if(mode==='ai'){
    aiBtn.classList.add('active'); manualBtn.classList.remove('active');
    manualSec.style.display='none'; aiSec.style.display='block';
  } else {
    manualBtn.classList.add('active'); aiBtn.classList.remove('active');
    manualSec.style.display='block'; aiSec.style.display='none';
  }
};

/* ── Generar con IA ───────────────────────────────────────────── */
window.admGenerateReadingAI = async function(){
  var sb=_sb();
  if(!sb){ _toast('❌ Sin conexión Supabase'); return; }
  var ver=_v();
  var body=document.getElementById('adm-dw-body');
  var titleEl=body&&body.querySelector('[data-key="read_title"]');
  var bodyEl =body&&body.querySelector('[data-key="read_body"]');
  var btn    =document.getElementById('adm-read-ai-gen-btn');
  if(!titleEl||!bodyEl){ _toast('❌ No se encontraron los campos'); return; }
  var title   =(titleEl.value||'').trim();
  var textBody=(bodyEl.value||'').trim();
  if(!textBody){ _toast('❌ El texto de lectura está vacío'); return; }

  var useNM   =_useNM(ver);
  var tfLabels =useNM?'"V", "F" o "NM"':'"V" o "F"';
  var tfOptions=useNM?'Verdadero, Falso o No Mencionado':'Verdadero o Falso';
  var qLang   =(ver<=2)?'SPANISH':'ENGLISH';
  var qNote   =(ver<=2)?'Generate ALL questions, options and statements IN SPANISH.':'Generate ALL questions, options and statements IN ENGLISH.';

  var systemMsg=
    'You are an English reading comprehension exam creator for Spanish-speaking students.\n'+
    'Given a reading text in English, generate comprehension questions.\n'+qNote+'\n\n'+
    'Respond ONLY with valid JSON — no markdown, no explanation:\n'+
    '{\n  "mc":{\n    "instruction":"Read the text and choose the best answer.",\n'+
    '    "question":"According to the text, ...",\n'+
    '    "options":["A) ...","B) ...","C) ...","D) ..."],\n'+
    '    "answer":"A"\n  },\n'+
    '  "tf":[\n    {"statement":"...","answer":"V"},\n'+
    '    {"statement":"...","answer":"F"},\n'+
    '    {"statement":"...","answer":"V"},\n'+
    '    {"statement":"...","answer":"F"}\n  ]\n}\n\n'+
    'Rules:\n- mc.answer must be exactly "A","B","C" or "D".\n'+
    '- tf must have exactly 4 statements. Each answer is '+tfLabels+'.\n'+
    '- All content in '+qLang+'.';

  var userMsg='Title: '+title+'\n\nText:\n'+textBody;

  if(btn){ btn.disabled=true; btn.textContent='⏳ Generando…'; }
  _toast('⏳ Generando preguntas con IA…');

  try{
    var resp=await sb.functions.invoke('teacher-chat',{
      body:{system:systemMsg, messages:[{role:'user',content:userMsg}]}
    });
    if(resp.error) throw resp.error;
    var raw=resp.data&&resp.data.choices&&resp.data.choices[0]&&resp.data.choices[0].message&&resp.data.choices[0].message.content;
    if(!raw) throw new Error('Respuesta vacía de la IA');
    raw=raw.replace(/^```[a-z]*\n?/i,'').replace(/\n?```$/,'').trim();
    var m=raw.match(/\{[\s\S]*\}/);
    if(!m) throw new Error('JSON no encontrado en la respuesta');
    var parsed=JSON.parse(m[0]);
    _fillReadForm(parsed);
    window.admReadMode('manual');
    _toast('✓ Preguntas generadas · revisa y guarda');
  }catch(e){
    _toast('❌ '+(e.message||e));
    console.error('[ReadingAI]',e);
  }finally{
    if(btn){ btn.disabled=false; btn.textContent='✨ Generar preguntas con IA'; }
  }
};

/* ── Rellenar formulario con datos de IA ─────────────────────── */
function _fillReadForm(d){
  if(!d) return;
  var body=document.getElementById('adm-dw-body');
  if(!body) return;
  if(d.mc){
    var instr=body.querySelector('[data-key="mc_instruction"]');
    var quest=body.querySelector('[data-key="mc_question"]');
    if(instr) instr.value=d.mc.instruction||'';
    if(quest) quest.value=d.mc.question||'';
    ['a','b','c','d'].forEach(function(l,i){
      var el=body.querySelector('[data-key="mc_opt_'+l+'"]');
      if(el) el.value=d.mc.options?d.mc.options[i]||'':'';
    });
    var ans=(d.mc.answer||'A').toUpperCase();
    var radio=body.querySelector('input[name="mc_answer"][value="'+ans+'"]');
    if(radio) radio.checked=true;
  }
  if(d.tf&&Array.isArray(d.tf)){
    d.tf.forEach(function(item,i){
      var stmtEl=body.querySelector('[data-key="tf_stmt_'+i+'"]');
      if(stmtEl) stmtEl.value=item.statement||'';
      var ans=(item.answer||'V').toUpperCase();
      var radio=body.querySelector('input[name="tf_ans_'+i+'"][value="'+ans+'"]');
      if(radio) radio.checked=true;
    });
  }
}

})();

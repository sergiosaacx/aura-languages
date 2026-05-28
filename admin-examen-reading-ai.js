/* ════════════════════════════════════════════════════════════════
   admin-examen-reading-ai.js
   Funciones auxiliares del editor Reading para admin-examen-editor.html.
   Maneja: modo Manual/IA, campos de preguntas MC + V/F,
   generación con GPT-4o-mini, persistencia en Supabase.
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var RANK_BY_V = {1:'bronce',2:'plata',3:'oro',4:'platino',5:'diamante'};

function _sb(){ return (window._aura && window._aura.sb) ? window._aura.sb : null; }
function _toast(msg){ if(typeof window.admShowToast==='function') window.admShowToast(msg); }
function _v(){ return window._admCurrV || 1; }
function _lang(){ return (document.getElementById('adm-lang') ? document.getElementById('adm-lang').value : null) || 'en'; }
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/* ── Supabase helpers ─────────────────────────────────────────── */

window._saveReadToSupabase = async function(version, lang, payload){
  var sb = _sb();
  if(!sb){ console.warn('[Reading AI] Sin Supabase'); return; }
  var rank = RANK_BY_V[version] || 'bronce';
  // Busca fila existente
  var res = await sb.from('exam_content')
    .select('id')
    .eq('section','reading')
    .eq('content_type','reading_content')
    .eq('rank', rank)
    .eq('language', lang)
    .maybeSingle();
  if(res.error){ console.warn('[Reading AI] Error al buscar fila:', res.error); }
  var row = {
    section: 'reading',
    content_type: 'reading_content',
    rank: rank,
    language: lang,
    active: true,
    difficulty: 3,
    content: payload
  };
  if(res.data && res.data.id){
    var upd = await sb.from('exam_content').update(row).eq('id', res.data.id);
    if(upd.error) console.warn('[Reading AI] Error al actualizar:', upd.error);
  } else {
    var ins = await sb.from('exam_content').insert(row);
    if(ins.error) console.warn('[Reading AI] Error al insertar:', ins.error);
  }
};

window._loadReadFromSupabase = async function(version, lang){
  var sb = _sb();
  if(!sb) return null;
  var rank = RANK_BY_V[version] || 'bronce';
  var res = await sb.from('exam_content')
    .select('content')
    .eq('section','reading')
    .eq('content_type','reading_content')
    .eq('rank', rank)
    .eq('language', lang)
    .maybeSingle();
  if(res.error || !res.data) return null;
  var c = res.data.content;
  if(typeof c === 'string'){ try{ c = JSON.parse(c); }catch(e){ c = null; } }
  return c;
};

/* ── Modo Manual / IA ─────────────────────────────────────────── */

window.admReadMode = function(mode){
  var manualBtn = document.getElementById('adm-read-mode-manual');
  var aiBtn     = document.getElementById('adm-read-mode-ai');
  var manualSec = document.getElementById('adm-read-manual-sec');
  var aiSec     = document.getElementById('adm-read-ai-sec');
  if(!manualBtn || !aiBtn || !manualSec || !aiSec) return;
  if(mode === 'ai'){
    aiBtn.classList.add('active');
    manualBtn.classList.remove('active');
    manualSec.style.display = 'none';
    aiSec.style.display = 'block';
  } else {
    manualBtn.classList.add('active');
    aiBtn.classList.remove('active');
    manualSec.style.display = 'block';
    aiSec.style.display = 'none';
  }
};

/* ── Generar con IA ───────────────────────────────────────────── */

window.admGenerateReadingAI = async function(){
  var titleEl = document.querySelector('#adm-dw-body input[data-key="read_title"]');
  var bodyEl  = document.querySelector('#adm-dw-body textarea[data-key="read_body"]');
  var btn     = document.getElementById('adm-read-ai-gen-btn');
  var ver     = _v();

  if(!titleEl || !bodyEl){ _toast('❌ Completa primero el texto de lectura'); return; }
  var title = (titleEl.value||'').trim();
  var body  = (bodyEl.value||'').trim();
  if(!body){ _toast('❌ El texto de lectura está vacío'); return; }

  var apiKey = localStorage.getItem('_aura_oai_key');
  if(!apiKey){ _toast('❌ API key de OpenAI no configurada (Admin › Flashcards)'); return; }

  // V/F con NM para niveles 3-5
  var useNM = ver >= 3;
  var tfOptions = useNM ? 'Verdadero, Falso o No Mencionado' : 'Verdadero o Falso';
  var tfLabels  = useNM ? '"V", "F" o "NM"' : '"V" o "F"';

  var prompt = 'Dado este texto en inglés, genera preguntas de comprensión en el MISMO idioma (inglés).\n\n' +
    'Texto título: ' + title + '\n\n' +
    'Texto:\n' + body + '\n\n' +
    'Genera EXACTAMENTE este JSON (sin markdown, sin explicación, solo JSON):\n' +
    '{\n' +
    '  "mc": {\n' +
    '    "instruction": "Read the text and choose the best answer.",\n' +
    '    "question": "According to the text, ...",\n' +
    '    "options": ["A) ...", "B) ...", "C) ...", "D) ..."],\n' +
    '    "answer": "A"\n' +
    '  },\n' +
    '  "tf": [\n' +
    '    {"statement": "...", "answer": "V"},\n' +
    '    {"statement": "...", "answer": "F"},\n' +
    '    {"statement": "...", "answer": "V"},\n' +
    '    {"statement": "...", "answer": "F"}\n' +
    '  ]\n' +
    '}\n\n' +
    'Reglas:\n' +
    '- mc.answer debe ser solo "A", "B", "C" o "D".\n' +
    '- tf tiene exactamente 4 afirmaciones. Cada answer es ' + tfLabels + '.\n' +
    '- Usa ' + tfOptions + ' en las afirmaciones de tf.\n' +
    '- Todo en inglés.';

  if(btn){ btn.disabled = true; btn.textContent = '⏳ Generando…'; }
  _toast('⏳ Generando preguntas con IA…');

  try {
    var resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 700
      })
    });
    var data = await resp.json();
    if(!resp.ok){ throw new Error(data.error ? data.error.message : resp.status); }
    var raw = (data.choices[0].message.content || '').trim();
    // Quitar posibles bloques ```json
    raw = raw.replace(/^```[a-z]*\n?/i,'').replace(/\n?```$/,'').trim();
    var parsed = JSON.parse(raw);
    _fillReadForm(parsed, ver);
    // Cambiar a modo manual para que el usuario vea / edite
    window.admReadMode('manual');
    _toast('✓ Preguntas generadas · revisa y guarda');
  } catch(e){
    _toast('❌ ' + (e.message || e));
    console.error('[Reading AI] Error:', e);
  } finally {
    if(btn){ btn.disabled = false; btn.textContent = '✨ Generar preguntas con IA'; }
  }
};

/* ── Rellenar formulario con datos (carga o IA) ──────────────── */

window._fillReadForm = function(d, ver){
  if(!d) return;
  // MC
  if(d.mc){
    var instr = document.querySelector('#adm-dw-body input[data-key="mc_instruction"]');
    var quest = document.querySelector('#adm-dw-body input[data-key="mc_question"]');
    var optA  = document.querySelector('#adm-dw-body input[data-key="mc_opt_a"]');
    var optB  = document.querySelector('#adm-dw-body input[data-key="mc_opt_b"]');
    var optC  = document.querySelector('#adm-dw-body input[data-key="mc_opt_c"]');
    var optD  = document.querySelector('#adm-dw-body input[data-key="mc_opt_d"]');
    if(instr) instr.value = d.mc.instruction || '';
    if(quest) quest.value = d.mc.question   || '';
    if(optA)  optA.value  = d.mc.options    ? (d.mc.options[0]||'') : '';
    if(optB)  optB.value  = d.mc.options    ? (d.mc.options[1]||'') : '';
    if(optC)  optC.value  = d.mc.options    ? (d.mc.options[2]||'') : '';
    if(optD)  optD.value  = d.mc.options    ? (d.mc.options[3]||'') : '';
    // Marcar radio correcto
    var ans = (d.mc.answer||'A').toUpperCase();
    var radio = document.querySelector('#adm-dw-body input[name="mc_answer"][value="'+ans+'"]');
    if(radio) radio.checked = true;
  }
  // TF
  if(d.tf && Array.isArray(d.tf)){
    d.tf.forEach(function(item, i){
      var stmtEl = document.querySelector('#adm-dw-body input[data-key="tf_stmt_'+i+'"]');
      if(stmtEl) stmtEl.value = item.statement || '';
      var ans = (item.answer||'V').toUpperCase();
      var radio = document.querySelector('#adm-dw-body input[name="tf_ans_'+i+'"][value="'+ans+'"]');
      if(radio) radio.checked = true;
    });
  }
};

/* ── Leer formulario de preguntas ────────────────────────────── */

window._readQuestionsFromForm = function(ver){
  var mc = {
    instruction: (document.querySelector('#adm-dw-body input[data-key="mc_instruction"]')?.value||'').trim(),
    question:    (document.querySelector('#adm-dw-body input[data-key="mc_question"]')?.value||'').trim(),
    options: [
      (document.querySelector('#adm-dw-body input[data-key="mc_opt_a"]')?.value||'').trim(),
      (document.querySelector('#adm-dw-body input[data-key="mc_opt_b"]')?.value||'').trim(),
      (document.querySelector('#adm-dw-body input[data-key="mc_opt_c"]')?.value||'').trim(),
      (document.querySelector('#adm-dw-body input[data-key="mc_opt_d"]')?.value||'').trim()
    ],
    answer: ''
  };
  var mcAns = document.querySelector('#adm-dw-body input[name="mc_answer"]:checked');
  if(mcAns) mc.answer = mcAns.value;

  var tf = [];
  for(var i = 0; i < 4; i++){
    var stmtEl = document.querySelector('#adm-dw-body input[data-key="tf_stmt_'+i+'"]');
    var ansEl  = document.querySelector('#adm-dw-body input[name="tf_ans_'+i+'"]:checked');
    tf.push({
      statement: stmtEl ? stmtEl.value.trim() : '',
      answer:    ansEl  ? ansEl.value         : 'V'
    });
  }
  return { mc: mc, tf: tf };
};

})();

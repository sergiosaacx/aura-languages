/* ══════════════════════════════════════════════════════════════════
   examen-vocab-hooks.js
   ⚠️  PESTAÑA VOCABULARY — APROBADA — NO MODIFICAR SIN INSTRUCCIÓN
   ══════════════════════════════════════════════════════════════════
   Contiene TODO el motor de Vocabulary del examen de ascenso:
   CSS, engine (renderVocabWord, loadVocabSession, avance de palabras),
   handlers de interacción (smc-btn, fam-pill) y vocabNext.

   Si examen-ascenso.html se sobreescribe, basta conservar:
     <script src="examen-vocab-engine.js?v=3"></script>
     <script src="examen-vocab-hooks.js"></script>

   Si necesitas modificar algo aquí, confirma primero con Sergio.
   ══════════════════════════════════════════════════════════════════ */

/* ── 1. CSS INJECTION ───────────────────────────────────────────────── */
(function(){
  if(document.getElementById('examen-vocab-hooks-css')) return;
  var _s = document.createElement('style');
  _s.id = 'examen-vocab-hooks-css';
  _s.textContent = `
.vocab-task-locked{opacity:.35;pointer-events:none;user-select:none;}
.fam-pill.vc-correct{background:rgba(34,197,94,.22)!important;border-color:#22c55e!important;color:#22c55e!important;box-shadow:0 0 0 3px rgba(34,197,94,.14)!important;}
.fam-pill.vc-wrong{background:rgba(239,68,68,.18)!important;border-color:#ef4444!important;color:#ef4444!important;box-shadow:0 0 0 3px rgba(239,68,68,.12)!important;}

/* SENTENCE MC — Vocabulary */
.sentence-mc{list-style:none;display:flex;flex-direction:column;gap:9px;}
.smc-btn{
  display:flex;align-items:flex-start;gap:12px;width:100%;text-align:left;
  padding:13px 16px;border-radius:13px;
  background:rgba(255,255,255,.025);border:1.5px solid var(--line);transition:.15s;
}
.smc-btn:hover{background:rgba(var(--c),.06);border-color:rgba(var(--c),.4);transform:translateY(-1px);}
.smc-btn .b{
  width:24px;height:24px;border-radius:50%;flex-shrink:0;
  border:1.5px solid var(--line-2);background:rgba(255,255,255,.04);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--mono);font-size:11px;font-weight:900;color:var(--muted);
}
.smc-btn .t{font-size:13.5px;line-height:1.5;color:var(--ink-2);font-weight:500;}
.smc-btn .t em{font-style:italic;color:rgba(var(--c),1);font-weight:800;}
.smc-btn.selected{background:rgba(var(--c),.12);border-color:rgba(var(--c),1);box-shadow:0 0 0 3px rgba(var(--c),.14);}
.smc-btn.selected .b{background:rgba(var(--c),1);border-color:rgba(var(--c),1);color:#0a1a1e;}
.smc-btn.selected .t{color:var(--ink);font-weight:600;}
.smc-btn.vc-correct,.smc-btn.vc-correct:hover{background:rgba(34,197,94,.18)!important;border-color:rgba(34,197,94,.7)!important;box-shadow:0 0 0 3px rgba(34,197,94,.12)!important;}
.smc-btn.vc-correct .b{background:#22c55e!important;border-color:#22c55e!important;color:#0a0a0a!important;}
.smc-btn.vc-wrong,.smc-btn.vc-wrong:hover{background:rgba(239,68,68,.18)!important;border-color:rgba(239,68,68,.7)!important;box-shadow:0 0 0 3px rgba(239,68,68,.12)!important;}
.smc-btn.vc-wrong .b{background:#ef4444!important;border-color:#ef4444!important;color:#fff!important;}

/* FAMILY (vocab) */
.family-list{list-style:none;display:flex;flex-direction:column;gap:12px;}
.family-list li{display:flex;flex-direction:column;gap:9px;padding:13px 16px;border-radius:13px;background:rgba(255,255,255,.025);border:1px solid var(--line);}
.fam-stmt{font-size:14px;line-height:1.5;color:var(--ink-2);}
.fam-blank{display:inline-block;min-width:80px;padding:1px 12px;background:rgba(var(--c),.06);border:2px dashed rgba(var(--c),.4);border-radius:var(--r-pill);color:rgba(var(--c),1);font-family:var(--mono);font-style:italic;font-weight:800;text-align:center;font-size:12.5px;}
.fam-pills{display:flex;gap:7px;flex-wrap:wrap;}
.fam-pill{font-family:var(--mono);font-size:11.5px;font-weight:800;padding:7px 13px;border-radius:var(--r-pill);background:rgba(255,255,255,.03);border:1.5px solid var(--line-2);color:var(--ink-2);transition:.15s;letter-spacing:.04em;}
.fam-pill:hover{border-color:rgba(var(--c),.5);color:rgba(var(--c),1);}
.fam-pill.selected{background:rgba(var(--c),1);color:#0a1a1e;border-color:rgba(var(--c),1);box-shadow:0 4px 14px rgba(var(--c),.32);}
  `;
  (document.head || document.documentElement).appendChild(_s);
})();

/* ── 2. ENGINE (funciones globales) ─────────────────────────────────── */
// initial apply (vocab is preselected)

// ====== Version picker dropdown ======
var RANK_BY_V_EXAM = {1:'bronce',2:'plata',3:'oro',4:'platino',5:'diamante'};

function _escV(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function _renderVocabWord(c){
  var def = c.definition || {};
  var ctx = c.context || {};
  var fam = c.family || {};

  // Hero card — solo actualizar si listen NO está activo (listen engine gestiona su propia hero card)
  var _listenIsActive = !!document.querySelector('.tab[data-skill="listen"].active');
  if(!_listenIsActive){
    var typo = document.querySelector('.hc-typo b');
    if(typo) typo.textContent = c.word || '';
    var hcWord = document.querySelector('.hc-word');
    if(hcWord) hcWord.textContent = c.word || '';
    var hcIpa = document.querySelector('.hc-ipa');
    if(hcIpa) hcIpa.textContent = c.pronunciation || '';
    var hcPos = document.querySelector('.hc-pos');
    if(hcPos) hcPos.innerHTML = '<b>'+_escV(c.pos||'')+'</b>'+(c.register?' · '+_escV(c.register):'')+(c.level?' · '+_escV(c.level):'');
    var hcRating = document.querySelector('.hc-rating b');
    if(hcRating) hcRating.textContent = c.level || '';
  }

  // Hero card — opciones definición
  var hcQuiz = document.querySelector('.hc-quiz');
  if(hcQuiz && def.options){
    var ql = hcQuiz.querySelector('.hc-q-label');
    if(ql) ql.textContent = def.question || 'elige la mejor definición';
    var opts = hcQuiz.querySelectorAll('.hc-opt');
    var letters = ['A','B','C','D'];
    opts.forEach(function(opt, i){
      var ltr = letters[i];
      opt.querySelector('span').textContent = def.options[i] || '';
      opt.dataset.correct = (def.answer === ltr) ? '1' : '';
      opt.classList.remove('selected','vc-correct','vc-wrong');
      opt.style.pointerEvents = '';
    });
    if(opts[0] && opts[0].parentElement) delete opts[0].parentElement.dataset.answered;
  }

  // vtask1 — re-lock on new word
  var vt1r = document.getElementById('vtask1');
  if(vt1r){ vt1r.classList.add('vocab-task-locked'); delete vt1r.dataset.answered; }

  // vtask1 — uso en contexto (sentence-mc)
  var vt1 = document.getElementById('vtask1');
  if(vt1 && ctx.options){
    var ec = vt1.querySelector('.ep-count');
    if(ec) ec.innerHTML = '¿en cuál se usa correctamente "<b>'+_escV(c.word)+'</b>"?';
    var smcList = vt1.querySelector('.sentence-mc');
    if(!smcList){ smcList = document.createElement('ul'); smcList.className='sentence-mc'; vt1.appendChild(smcList); }
    smcList.innerHTML = '';
    delete smcList.dataset.answered;
    delete vt1.dataset.answered;
    ['A','B','C','D'].forEach(function(ltr, i){
      var li = document.createElement('li');
      var btn2 = document.createElement('button');
      btn2.className = 'smc-btn';
      if(ctx.answer === ltr) btn2.dataset.correct = '1';
      btn2.innerHTML = '<span class="b">'+ltr+'</span><span class="t">'+_escV(ctx.options[i]||'')+'</span>';
      li.appendChild(btn2);
      smcList.appendChild(li);
    });
  }

  // vtask2 — familia de palabras — re-lock on new word
  var vt2 = document.getElementById('vtask2');
  if(vt2) vt2.classList.add('vocab-task-locked');
  var vt2 = document.getElementById('vtask2');
  if(vt2){
    var famItems = vt2.querySelectorAll('.family-list li');
    var grps = vt2.querySelectorAll('.fam-pills');
    // Grupo 1
    if(famItems[0] && fam.options1){
      var s1 = famItems[0].querySelector('.fam-stmt');
      if(s1) s1.innerHTML = '"'+_escV(fam.sentence1||'').replace(/\[BLANK\]/g,'<span class="fam-blank">_____</span>')+'"';
      if(grps[0]){
        grps[0].innerHTML = '';
        delete grps[0].dataset.answered;
        (fam.options1||[]).forEach(function(opt, i){
          var pb = document.createElement('button');
          pb.className = 'fam-pill';
          pb.textContent = opt;
          if(fam.answer1 === ['A','B','C'][i]) pb.dataset.correct = '1';
          grps[0].appendChild(pb);
        });
      }
    }
    // Grupo 2
    if(famItems[1] && fam.options2){
      var s2 = famItems[1].querySelector('.fam-stmt');
      if(s2) s2.innerHTML = '"'+_escV(fam.sentence2||'').replace(/\[BLANK\]/g,'<span class="fam-blank">_____</span>')+'"';
      if(grps[1]){
        grps[1].innerHTML = '';
        delete grps[1].dataset.answered;
        (fam.options2||[]).forEach(function(opt, i){
          var pb = document.createElement('button');
          pb.className = 'fam-pill';
          pb.textContent = opt;
          if(fam.answer2 === ['A','B','C'][i]) pb.dataset.correct = '1';
          grps[1].appendChild(pb);
        });
      }
    }
  }
}

// ── Vocab session state ──────────────────────────────────────────────────────
var _vocabSession = { words:[], current:0, total:5 };

function _updateWordCounter(){
  var chip = document.querySelector('.hc-chip');
  if(chip) chip.innerHTML = '<span class="icon">≡</span> '+(_vocabSession.current+1)+' / '+_vocabSession.total;
}

function _showCurrentWord(){
  var w = _vocabSession.words[_vocabSession.current];
  if(!w) return;
  _renderVocabWord(w);
  _updateWordCounter();
  if(window.AuraRightPanel) AuraRightPanel.setProgress(_vocabSession.current, _vocabSession.total);
}

function _vocabAdvanceWord(){
  _vocabSession.current++;
  if(window.AuraRightPanel) AuraRightPanel.setProgress(_vocabSession.current, _vocabSession.total);
  if(_vocabSession.current >= _vocabSession.total){
    _showVocabComplete(); return;
  }
  _showCurrentWord();
}

function _showVocabComplete(){
  // Auto-advance to Phrasal tab
  var phrasalTab = document.querySelector('.tab[data-skill="phrasal"]');
  if(phrasalTab) phrasalTab.click();
}

async function _loadVocabSession(v){
  window._examCurrentVersion = v;
  var sb = window._aura && window._aura.sb;
  if(!sb){ console.warn('[vocab session] Sin Supabase'); return; }
  var rank = RANK_BY_V_EXAM[v] || 'diamante';
  var lang = localStorage.getItem('aura_lang') || 'en';
  var res = await sb.from('exam_content').select('*')
    .eq('section','vocabulary').eq('rank',rank).eq('language',lang).eq('active',true);
  if(res.error || !res.data || !res.data.length){
    console.warn('[vocab session] Sin datos para', rank, lang, res.error); return;
  }
  // Parse + filter valid words
  var words = res.data.map(function(row){
    var c = row.content;
    if(typeof c==='string'){ try{ c=JSON.parse(c); }catch(e){ return null; } }
    return (c && c.word) ? c : null;
  }).filter(Boolean);
  // Shuffle
  for(var i=words.length-1;i>0;i--){
    var j=Math.floor(Math.random()*(i+1)); var tmp=words[i]; words[i]=words[j]; words[j]=tmp;
  }
  // Pick 5
  _vocabSession.words = words.slice(0,5);
  _vocabSession.total = _vocabSession.words.length;
  _vocabSession.current = 0;
  // Restore hero card opacity if was dimmed
  var hc = document.querySelector('.hero-card');
  if(hc) hc.style.opacity = '';
  // Init shared right panel (first load only)
  if(window.AuraRightPanel) AuraRightPanel.setProgress(0, _vocabSession.total);
  _showCurrentWord();
}

/* ── 3. TASKS INIT & vocabNext ──────────────────────────────────────── */
function _vocabInitTasks(){
  // Tarea 2 — contexto (vtask1): leer respuesta correcta y limpiar selected
  var vt1 = document.getElementById('vtask1');
  if(vt1){
    var opts = vt1.querySelectorAll('.hc-opt');
    var optsContainer = opts.length ? opts[0].parentElement : null;
    if(optsContainer){
      delete optsContainer.dataset.answered;
      opts.forEach(function(o){
        if(o.classList.contains('selected') && !o.dataset.correct) o.dataset.correct='1';
        o.classList.remove('selected','vc-correct','vc-wrong');
        o.style.background=o.style.borderColor=o.style.boxShadow=o.style.pointerEvents='';
      });
    }
  }
  // Tarea 3 — familia (vtask2): leer respuesta correcta y limpiar selected por grupo
  var vt2 = document.getElementById('vtask2');
  if(vt2){
    vt2.classList.add('vocab-task-locked');
    vt2.querySelectorAll('.fam-pills').forEach(function(grp){
      delete grp.dataset.answered;
      grp.querySelectorAll('.fam-pill').forEach(function(p){
        if(p.classList.contains('selected') && !p.dataset.correct) p.dataset.correct='1';
        p.classList.remove('selected','vc-correct','vc-wrong');
        p.style.background=p.style.color=p.style.border=p.style.fontWeight=p.style.pointerEvents='';
      });
    });
  }
}
window._vocabInitTasks = _vocabInitTasks;

// ====== Vocabulary — flujo secuencial por pasos ======
window.vocabNext = function(){
  var vsb2 = document.getElementById('vsb2');
  var vsb3 = document.getElementById('vsb3');
  var vtask2 = document.getElementById('vtask2');
  var btn = document.getElementById('vocabNextBtn');
  if(!vtask2) return;
  if(vsb2){ vsb2.classList.remove('vsb-active'); vsb2.classList.add('vsb-done'); }
  if(vsb3){ vsb3.classList.add('vsb-active'); }
  // vtask2 always visible — no button needed
};


/* ── 4. CLICK HANDLERS (vocab: smc-btn, vtask1 .hc-opt, fam-pill) ─── */
// ====== Option clicks within mid panels ======
document.addEventListener('click', e=>{
  // sentence MC (vocab) — uso en contexto con evaluación correcto/incorrecto
  const smc = e.target.closest('.smc-btn');
  if(smc){
    var smcList = smc.closest('.sentence-mc');
    if(smcList && !smcList.dataset.answered){
      smcList.dataset.answered = '1';
      smcList.querySelectorAll('.smc-btn').forEach(function(b){
        b.style.pointerEvents = 'none';
        if(b.dataset.correct==='1') b.classList.add('vc-correct');
      });
      if(smc.dataset.correct!=='1') smc.classList.add('vc-wrong');
      if(window.AuraRightPanel) AuraRightPanel.recordAnswer(smc.dataset.correct==='1');
      var vt2unlock = document.getElementById('vtask2');
      if(vt2unlock) vt2unlock.classList.remove('vocab-task-locked');
    }
  }
  // vtask1 — contexto: hc-opt dentro del mid panel (no hero card)
  const vop = e.target.closest('#vtask1 .hc-opt');
  if(vop){
    var vcon = vop.parentElement;
    if(!vcon.dataset.answered){
      vcon.dataset.answered='1';
      vcon.querySelectorAll('.hc-opt').forEach(function(o){
        o.style.pointerEvents='none';
        if(o.dataset.correct==='1') o.classList.add('vc-correct');
      });
      if(vop.dataset.correct!=='1') vop.classList.add('vc-wrong');
    }
  }
  // family pill (vocab) — con evaluación correcto/incorrecto
  const fp = e.target.closest('.fam-pill');
  if(fp){
    var grp = fp.closest('.fam-pills');
    if(!grp.dataset.answered){
      grp.dataset.answered='1';
      grp.querySelectorAll('.fam-pill').forEach(function(b){
        b.style.pointerEvents='none';
        if(b.dataset.correct==='1') b.classList.add('vc-correct');
      });
      if(fp.dataset.correct!=='1') fp.classList.add('vc-wrong');
      if(window.AuraRightPanel) AuraRightPanel.recordAnswer(fp.dataset.correct==='1');
      // Check if ALL family groups answered → advance to next word
      var allGrps = document.querySelectorAll('#vtask2 .fam-pills');
      var allDone = allGrps.length > 0 && Array.from(allGrps).every(function(g){ return g.dataset.answered==='1'; });
      if(allDone) setTimeout(_vocabAdvanceWord, 1400);
    }
  }
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


/* examen-vocab-engine.js v9 */
(function(){

  function _sb(){ return window._aura && window._aura.sb; }

  function _waitForSb(cb, n){
    n = n||0;
    if(_sb()) return cb(_sb());
    if(n > 80) return;
    setTimeout(function(){ _waitForSb(cb, n+1); }, 100);
  }

  function _esc(s){
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  window.initExamVocab = function(opts){
    var rank = (opts&&opts.rank)||'bronce';
    var lang = (opts&&opts.lang)||'en';

    _waitForSb(async function(sb){
      try {
        var res = await sb.from('exam_content').select('content')
          .eq('section','vocabulary').eq('content_type','vocab_word')
          .eq('rank',rank).eq('language',lang).eq('active',true);

        if(res.error||!res.data||!res.data.length) return;

        var words = res.data.map(function(row){
          var c=row.content;
          if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){return null;}}
          return c;
        }).filter(function(w){ return w&&(w.word||'').trim(); });

        if(!words.length) return;

        var w = words[Math.floor(Math.random()*words.length)];
        var rankLabel = rank.charAt(0).toUpperCase()+rank.slice(1);

        /* ── 1. Actualizar skillData.vocab ── */
        var newSd = {
          word:w.word, typo:w.word,
          ipa:w.ipa||'', pos:w.pos||'',
          chip:'01 / '+String(words.length).padStart(2,'0'),
          rating:rankLabel, color:'#5BE9F6',
          qLabel:'elige la mejor definición',
          opts:(w.definition&&w.definition.options||['','','','']).map(function(t,i){
            var l=['A','B','C','D'][i];
            return {l:l,t:t,sel:!!(w.definition&&w.definition.answer===l)};
          }),
          bg:'radial-gradient(380px 600px at 90% 10%,rgba(91,233,246,.20),transparent 60%),radial-gradient(420px 500px at 0% 100%,rgba(167,139,250,.22),transparent 55%)'
        };
        if(typeof skillData!=='undefined') skillData.vocab = newSd;

        /* ── 2. Re-renderizar hero card ── */
        if(typeof applySkill==='function') applySkill('vocab');

        /* ── 3. Construir mid-content con datos reales ── */
        var ctx = w.context||{options:['','','',''],answer:'A'};
        var fam = w.family||{sentence1:'',options1:['','',''],answer1:'A',sentence2:'',options2:['','',''],answer2:'A'};
        var C='91,233,246';
        var ARR='<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';

        var stepBar=
          '<div class="vocab-step-bar">'+
          '<span class="vsb-step vsb-active" id="vsb1"><span class="vsb-dot"></span><span class="vsb-label">Definición</span></span>'+
          '<span class="vsb-sep"></span>'+
          '<span class="vsb-step" id="vsb2"><span class="vsb-dot"></span><span class="vsb-label">Contexto</span></span>'+
          '<span class="vsb-sep"></span>'+
          '<span class="vsb-step" id="vsb3"><span class="vsb-dot"></span><span class="vsb-label">Familia</span></span>'+
          '</div>';

        /* vtask1 — contexto */
        var ctxHtml='<div class="exam-panel vocab-task-locked" id="vtask1" style="--c:'+C+';"><header class="ep-h">'+
          '<span class="ep-tag">tarea 1 · uso en contexto</span>'+
          '<span style="font-size:10px;color:var(--muted);">¿en cuál se usa correctamente "<b style=\'color:var(--ink)\'>'+_esc(w.word)+'</b>"?</span>'+
          '</header><div style="display:flex;flex-direction:column;gap:7px;">';
        ['A','B','C','D'].forEach(function(l,i){
          var isCorr=ctx.answer===l;
          ctxHtml+='<button class="hc-opt"'+(isCorr?' data-correct="1"':'')+'>'+
            '<b>'+l+'</b><span>'+_esc(ctx.options[i]||'')+'</span></button>';
        });
        ctxHtml+='</div>'+
          '<div class="vocab-next-wrap">'+
          '<button class="vocab-next-btn" id="vocabNextBtn" onclick="vocabNext()">Siguiente tarea '+ARR+'</button>'+
          '</div></div>';

        /* vtask2 — familia */
        var s1=_esc(fam.sentence1||'').replace('___','<span class="blank">_____</span>');
        var s2=_esc(fam.sentence2||'').replace('___','<span class="blank">_____</span>');
        var famHtml='<div class="exam-panel vocab-task-hidden" id="vtask2" style="--c:'+C+';"><header class="ep-h">'+
          '<span class="ep-tag">tarea 2 · familia de palabras</span>'+
          '<span style="font-size:10px;color:var(--muted);">elige la forma correcta</span>'+
          '</header><p style="font-size:12.5px;line-height:1.6;margin-bottom:8px;">"'+s1+'"</p>'+
          '<div class="fam-pills" style="display:flex;gap:7px;flex-wrap:wrap;">';
        (fam.options1||['','','']).forEach(function(opt){
          famHtml+='<button class="fam-pill">'+_esc(opt)+'</button>';
        });
        famHtml+='</div><p style="font-size:12.5px;line-height:1.6;margin:10px 0 8px;">"'+s2+'"</p>'+
          '<div class="fam-pills" style="display:flex;gap:7px;flex-wrap:wrap;">';
        (fam.options2||['','','']).forEach(function(opt){
          famHtml+='<button class="fam-pill">'+_esc(opt)+'</button>';
        });
        famHtml+='</div></div>';

        /* ── 4. Inyectar en el DOM ── */
        var midEl=document.querySelector('.mid-content[data-skill="vocab"]');
        if(midEl) midEl.innerHTML = stepBar+ctxHtml+famHtml;

        /* ── 5. Agregar click handlers a vtask1 ── */
        var vt1=document.getElementById('vtask1');
        if(vt1){
          var vt1Opts=vt1.querySelectorAll('.hc-opt');
          vt1Opts.forEach(function(btn){
            btn.addEventListener('click',function(){
              if(vt1.dataset.answered) return;
              vt1.dataset.answered='1';
              vt1Opts.forEach(function(o){
                o.style.pointerEvents='none';
                if(o.dataset.correct==='1') o.classList.add('vc-correct');
              });
              if(btn.dataset.correct!=='1') btn.classList.add('vc-wrong');
              /* unlock step bar */
              var sv1=document.getElementById('vsb1');
              if(sv1){sv1.classList.remove('vsb-active');sv1.classList.add('vsb-done');}
              var sv2=document.getElementById('vsb2');
              if(sv2) sv2.classList.add('vsb-active');
            });
          });
        }

      } catch(e){ console.warn('[VocabEngine v9]',e); }
    });
  };

})();

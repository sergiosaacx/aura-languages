/* examen-writing-hooks.js — motor de Writing: fill-in-the-blanks + evaluación IA */
// WRITING ENGINE v2 — fill-in-the-blanks + evaluación IA
(function(){
  var _timer=null;

  function _blanks(){ return [...(document.querySelectorAll('#writeStory .blank-input')||[])]; }
  function _total(){ return _blanks().length; }
  function _filled(){ return _blanks().filter(function(i){return i.value.trim().length>0;}).length; }
  function _wc(){
    return _blanks().reduce(function(a,i){
      var v=i.value.trim(); return a+(v?v.split(/\s+/).filter(function(w){return w.length>0;}).length:0);
    },0);
  }

  function _getFullStory(){
    var story=document.getElementById('writeStory'); if(!story) return '';
    var clone=story.cloneNode(true);
    clone.querySelectorAll('.blank-input').forEach(function(inp){
      var s=document.createElement('strong');
      s.textContent=inp.value.trim()||'_____';
      inp.parentNode.replaceChild(s,inp);
    });
    clone.querySelectorAll('.blank-hint,.blank-wrap').forEach(function(el){
      if(el.tagName==='SPAN'&&el.classList.contains('blank-wrap')){
        var strong=el.querySelector('strong');
        if(strong){ el.parentNode.replaceChild(strong,el); }
      }
    });
    return (clone.innerText||clone.textContent||'').replace(/\s{2,}/g,' ').trim();
  }

  function _update(){
    var f=_filled(), t=_total(), w=_wc();
    var pct=t>0?Math.round((f/t)*100):0;
    var minFill=Math.ceil(t*0.7);
    var el;
    el=document.getElementById('writeWordCount'); if(el) el.textContent=w;
    el=document.getElementById('wm-words'); if(el) el.textContent=w;
    el=document.getElementById('wm-paras'); if(el) el.textContent=f;
    el=document.getElementById('wm-conn'); if(el) el.textContent=pct+'%';
    el=document.getElementById('wm-avg'); if(el) el.textContent=t-f;
    el=document.getElementById('wap-progress-fill'); if(el) el.style.width=pct+'%';
    el=document.getElementById('wap-progress-label'); if(el) el.textContent=f+' / '+t+' espacios completados';
    el=document.getElementById('wap-wordchip'); if(el) el.textContent=f+' / '+t+' espacios';
    // Sync right panel progress live as blanks are filled
    if(window.AuraRightPanel) AuraRightPanel.setProgress(f, t);
    var btn=document.getElementById('wap-eval-btn');
    if(btn){
      btn.disabled=f<minFill;
      btn.textContent=f<minFill?('Completa '+(minFill-f)+' espacio'+(minFill-f===1?'':'s')+' más'):'Evaluar con IA';
    }
  }

  function _attach(){
    var story=document.getElementById('writeStory'); if(!story) return;
    if(story._wh) story.removeEventListener('input',story._wh);
    story._wh=function(){ clearTimeout(_timer); _timer=setTimeout(_update,200); };
    story.addEventListener('input',story._wh);
    _blanks().forEach(function(inp){
      inp.classList.remove('wbi-filled');
      inp.addEventListener('input',function(){ this.classList.toggle('wbi-filled',this.value.trim().length>0); });
    });
    _update();
  }

  window._wbUpd=function(){ clearTimeout(_timer); _timer=setTimeout(_update,200); };

  window._writeInitEngine=function(){
    if(window.AuraRightPanel) AuraRightPanel.switchSkill('write');
    window._writeResetPanel();
    setTimeout(_attach,120);
  };

  window._writeEvaluate=async function(){
    var f=_filled(),t=_total(),minFill=Math.ceil(t*0.7);
    if(f<minFill) return;
    var sb=window._aura&&window._aura.sb;
    var btn=document.getElementById('wap-eval-btn');
    if(btn){btn.disabled=true;btn.textContent='Evaluando con IA…';}
    var sd=window.skillData&&window.skillData.write;
    var level=(sd&&sd.rating)||'A1';
    var fullText=_getFullStory();
    var blankInputs=_blanks();
    var blanksData=blankInputs.map(function(inp){
      var wrap=inp.closest?inp.closest('.blank-wrap'):inp.parentNode;
      var hint=wrap?wrap.querySelector('.blank-hint'):null;
      return {entered:(inp.value||'').trim(), hint:hint?hint.textContent.trim():''};
    });
    var sysMsg='You are an expert English fill-in-the-blank examiner for CEFR level '+level+'. '
      +'Evaluate holistically (4 criteria 0-25 each) AND evaluate every blank individually. '
      +'A blank is CORRECT if the student entered the right English word matching the Spanish hint and context. '
      +'Reply ONLY with valid JSON no markdown.';
    var userMsg='Story text:'+"\n"+fullText+"\n\n"
      +'Blanks (entered=student answer, hint=Spanish translation of expected word):'+"\n"+JSON.stringify(blanksData)+"\n\n"
      +'Return exactly this JSON structure (feedback in Spanish, max 12 words each):'+"\n"
      +'{"tarea":{"score":0,"feedback":"..."},"gramatica":{"score":0,"feedback":"..."},'
      +'"vocabulario":{"score":0,"feedback":"..."},"cohesion":{"score":0,"feedback":"..."},'
      +'"blanks":[{"correct":true,"expected":"word"},...]}'+"\n"
      +'The blanks array MUST have exactly '+blanksData.length+' items in same order.';
    try{
      if(!sb) throw new Error('No Supabase');
      var resp=await sb.functions.invoke('teacher-chat',{
        body:{system:sysMsg, messages:[{role:'user',content:userMsg}]}
      });
      if(resp.error) throw resp.error;
      var raw=resp.data&&resp.data.choices&&resp.data.choices[0]&&resp.data.choices[0].message&&resp.data.choices[0].message.content;
      if(!raw) throw new Error('Respuesta vacia');
      raw=raw.replace(/^```[a-z]*\n?/i,'').replace(/\n?```$/,'').trim();
      var m=raw.match(/\{[\s\S]*\}/);
      if(!m) throw new Error('JSON no encontrado');
      var scores=JSON.parse(m[0]);
      _showResult(scores, fullText, blankInputs);
    }catch(e){
      console.error('[WriteEngine v2]',e);
      if(btn){btn.disabled=false;btn.textContent='Error — intenta de nuevo';}
    }
  };

  function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function _showResult(s, txt, blankInputs){
    var live=document.getElementById('wap-live'); if(live) live.style.display='none';
    var res=document.getElementById('wap-result'); if(res) res.style.display='';
    var el;
    el=document.getElementById('wap-title'); if(el) el.textContent='calificación ia · writing';
    var total=(+s.tarea.score||0)+(+s.gramatica.score||0)+(+s.vocabulario.score||0)+(+s.cohesion.score||0);
    el=document.getElementById('wap-wordchip'); if(el) el.textContent=total+' / 100';
    el=document.getElementById('ws-tarea'); if(el) el.textContent=(+s.tarea.score||0)+'/25';
    el=document.getElementById('ws-gram'); if(el) el.textContent=(+s.gramatica.score||0)+'/25';
    el=document.getElementById('ws-vocab'); if(el) el.textContent=(+s.vocabulario.score||0)+'/25';
    el=document.getElementById('ws-cohesion'); if(el) el.textContent=(+s.cohesion.score||0)+'/25';
    el=document.getElementById('wap-total'); if(el) el.innerHTML=total+'<small> / 100</small>';
    var icons={tarea:'📝',gramatica:'📐',vocabulario:'📚',cohesion:'🔗'};
    var labels={tarea:'Tarea',gramatica:'Gramática',vocabulario:'Vocabulario',cohesion:'Cohesión'};
    el=document.getElementById('wap-feedback');
    if(el) el.innerHTML=['tarea','gramatica','vocabulario','cohesion'].map(function(k){
      return '<div class="wap-fb-line">'+icons[k]+' <b>'+labels[k]+':</b> '+_esc((s[k]&&s[k].feedback)||'')+'</div>';
    }).join('');
    /* Per-blank visual marking */
    var blankResults=s.blanks||[];
    var nCorrect=0, nWrong=0;
    if(blankInputs&&blankInputs.length){
      blankInputs.forEach(function(inp,i){
        var bres=blankResults[i];
        var wrap=inp.closest?inp.closest('.blank-wrap'):inp.parentNode;
        inp.style.borderBottomColor='';
        inp.style.color='';
        if(wrap){var old=wrap.querySelector('.blank-verdict');if(old)old.remove();}
        if(!bres) return;
        if(bres.correct){
          nCorrect++;
          inp.style.borderBottomColor='#7BE37B';
          inp.style.color='#7BE37B';
        } else {
          nWrong++;
          inp.style.borderBottomColor='#ff5a5a';
          inp.style.color='#ff5a5a';
          if(wrap&&bres.expected){
            var vd=document.createElement('span');
            vd.className='blank-verdict';
            vd.style.cssText='display:block;font-size:8.5px;color:#ff5a5a;text-align:center;margin-top:1px;font-weight:700;white-space:nowrap;';
            vd.textContent='✕ '+bres.expected;
            wrap.appendChild(vd);
          }
        }
      });
    } else {
      nCorrect=Math.round(total/100*(blankInputs?blankInputs.length:4));
      nWrong=(blankInputs?blankInputs.length:4)-nCorrect;
    }
    /* Right panel: one recordAnswer per blank */
    if(window.AuraRightPanel){
      for(var ci=0;ci<nCorrect;ci++) AuraRightPanel.recordAnswer(true);
      for(var wi=0;wi<nWrong;wi++) AuraRightPanel.recordAnswer(false);
    }
    _saveResult(s,txt,total);
  }

  window._writeResetPanel=function(){
    var el;
    el=document.getElementById('wap-live'); if(el) el.style.display='';
    el=document.getElementById('wap-result'); if(el) el.style.display='none';
    el=document.getElementById('wap-title'); if(el) el.textContent='análisis · en vivo';
    _update();
  };

  async function _saveResult(scores,txt,total){
    try{
      var sb=window._aura&&window._aura.sb; if(!sb) return;
      var ud=await sb.auth.getUser();
      var uid=ud&&ud.data&&ud.data.user&&ud.data.user.id; if(!uid) return;
      await sb.from('exam_results').insert({
        user_id:uid,section:'writing',score:total,
        answers:{text:txt,scores:{tarea:scores.tarea.score,gramatica:scores.gramatica.score,vocabulario:scores.vocabulario.score,cohesion:scores.cohesion.score}},
        ai_feedback:scores.tarea.feedback+' | '+scores.gramatica.feedback+' | '+scores.vocabulario.feedback+' | '+scores.cohesion.feedback
      });
    }catch(e){ console.warn('[WriteEngine v2] save:',e); }
  }

  document.addEventListener('DOMContentLoaded',function(){
    var wr=document.querySelector('.tab[data-skill="write"]');
    if(wr&&wr.classList.contains('active')) setTimeout(function(){ if(window._writeInitEngine) window._writeInitEngine(); },300);
  });
})();


  /* ── Write: random text selection from pool ── */
  /* Prioridad: WRITE_POOLS (admin-editor-write) > VERSION_MID (fallback) */
  function _applyWriteRandom(v){
    var pool = (typeof WRITE_POOLS!=='undefined' && Array.isArray(WRITE_POOLS[v]) && WRITE_POOLS[v].length)
      ? WRITE_POOLS[v]
      : (typeof VERSION_MID!=='undefined' && VERSION_MID[v] && Array.isArray(VERSION_MID[v].write))
        ? VERSION_MID[v].write : [];
    var wrap = document.getElementById('write-preview-wrap');
    if(!wrap) return;
    if(!pool.length){
      wrap.innerHTML = '<p style="color:rgba(255,255,255,.25);font-size:12px;text-align:center;padding:24px 0;">Sin textos disponibles para esta versión.</p>';
      return;
    }
    var item = pool[Math.floor(Math.random() * pool.length)];
    wrap.innerHTML = item.html;
    // Re-init write engine
    if(typeof window._writeInitEngine==='function') setTimeout(window._writeInitEngine, 100);
    // Update analysis panel blank count
    var blanks = wrap.querySelectorAll('.blank-input');
    var wc = wrap.querySelector('#wap-wordchip');
    var pl = wrap.querySelector('#wap-progress-label');
    if(wc) wc.textContent = '0 / ' + blanks.length + ' espacios';
    if(pl) pl.textContent = '0 / ' + blanks.length + ' espacios completados';
  }
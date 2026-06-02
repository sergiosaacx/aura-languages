/* =================================================================
   examen-slang-hooks.js
   PESTANA SLANG - APROBADA - NO MODIFICAR
   =================================================================
   Contiene TODO el comportamiento de la pestana Slang:
   CSS, drag engine, Slang Engine (carga dinamica desde slang_cards),
   wrap de applyVersion y sincronizacion con hero card.

   Si examen-ascenso.html se sobreescribe, basta conservar:
     <script src="examen-slang-hooks.js?v=1"></script>
   ================================================================= */
(function () {
  'use strict';

  /* 1. CSS INJECTION */
  if (!document.getElementById('examen-slang-hooks-css')) {
    var _style = document.createElement('style');
    _style.id = 'examen-slang-hooks-css';
    _style.textContent = '/* Slang: swipe card redesign (igual que Phrasal) */\n/* Slang: nextBtn pulsa al completar */\n/* Slang: mazo bloqueado hasta responder panel izquierdo */\n[data-skill="slang"] .tinder-panel.pv-locked .tc-deck,\n[data-skill="slang"] .tinder-panel.pv-locked .pv-deck-actions{\n  pointer-events:none;opacity:.55;filter:blur(.6px);\n}\n[data-skill="slang"] .tinder-panel:not(.pv-locked) .tc-deck,\n[data-skill="slang"] .tinder-panel:not(.pv-locked) .pv-deck-actions{\n  pointer-events:auto;opacity:1;filter:none;\n}\n[data-skill="slang"].active{flex:1;min-height:0;}\n[data-skill="slang"] .tinder-panel{flex:1;}\n[data-skill="slang"] .tc-deck{flex:1;height:auto;min-height:0;display:flex;align-items:center;justify-content:center;perspective:1200px;overflow:visible;margin:4px 0;}\n[data-skill="slang"] .tc{position:absolute;inset:auto;height:96%;max-height:480px;aspect-ratio:7/9;border-radius:22px;background:linear-gradient(180deg,#1c1a2e 0%,#0e0b1e 100%);border:1px solid rgba(var(--c),.25);box-shadow:0 24px 64px rgba(0,0,0,.65),0 0 0 1px rgba(255,255,255,.025) inset;padding:18px 18px 16px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;transition:transform .35s cubic-bezier(.34,1.56,.64,1),opacity .25s;user-select:none;}\n[data-skill="slang"] .tc.back3{transform:translate(28px,22px) scale(.88) rotate(2.5deg);opacity:.35;z-index:1;}\n[data-skill="slang"] .tc.back2{transform:translate(14px,11px) scale(.94) rotate(1.2deg);opacity:.65;z-index:2;}\n[data-skill="slang"] .tc-front{background:linear-gradient(155deg,#1f1b35 0%,#0f0c1f 100%);box-shadow:0 24px 64px rgba(0,0,0,.65),0 0 0 1.5px rgba(var(--c),.35) inset;z-index:3;cursor:grab;}\n[data-skill="slang"] .tc-front:active{cursor:grabbing;}\n[data-skill="slang"] .tc-front.swiping-no{transform:translate(-6px,0) rotate(-2.5deg);box-shadow:0 24px 64px rgba(255,90,90,.2),0 0 0 1.5px rgba(255,90,90,.5) inset;}\n[data-skill="slang"] .tc-front.swiping-yes{transform:translate(6px,0) rotate(2.5deg);box-shadow:0 24px 64px rgba(var(--c),.2),0 0 0 1.5px rgba(var(--c),.5) inset;}\n[data-skill="slang"] .tc-front.swipe-out-no{transform:translateX(-130%) rotate(-28deg);opacity:0;transition:transform .4s ease-in,opacity .3s;}\n[data-skill="slang"] .tc-front.swipe-out-yes{transform:translateX(130%) rotate(28deg);opacity:0;transition:transform .4s ease-in,opacity .3s;}\n[data-skill="slang"] .pv-head{display:flex;align-items:center;justify-content:space-between;gap:4px;flex-shrink:0;}\n[data-skill="slang"] .pv-cat{font-family:var(--mono);font-size:9.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,115,201,.75);}\n[data-skill="slang"] .pv-lives{font-family:var(--mono);font-size:11px;color:rgba(255,115,201,.6);}\n[data-skill="slang"] .pv-mid{display:flex;flex-direction:column;gap:6px;flex:1;justify-content:center;}\n[data-skill="slang"] .pv-word{font-size:clamp(20px,4vw,28px);font-weight:800;line-height:1.15;color:#fff;}\n[data-skill="slang"] .pv-pron{font-family:var(--mono);font-size:10.5px;color:var(--muted);}\n[data-skill="slang"] .pv-ctx{font-size:12.5px;line-height:1.55;color:rgba(255,255,255,.75);font-style:italic;}\n[data-skill="slang"] .pv-ctx mark{background:rgba(255,115,201,.25);color:#fff;border-radius:3px;padding:0 2px;font-style:normal;}\n[data-skill="slang"] .pv-foot{display:flex;flex-direction:column;gap:8px;flex-shrink:0;}\n[data-skill="slang"] .pv-q{font-family:var(--sans);font-size:11.5px;color:var(--muted);text-align:center;}\n[data-skill="slang"] .pv-opts{display:grid;grid-template-columns:1fr 1fr;gap:6px;}\n[data-skill="slang"] .pv-opt-no,[data-skill="slang"] .pv-opt-yes{border:none;border-radius:12px;padding:9px 10px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;font-family:var(--sans);transition:background .18s,transform .12s;min-height:52px;justify-content:center;}\n[data-skill="slang"] .pv-opt-no{background:rgba(255,80,80,.12);color:rgba(255,120,120,.9);}\n[data-skill="slang"] .pv-opt-no:hover{background:rgba(255,80,80,.22);transform:scale(1.03);}\n[data-skill="slang"] .pv-opt-yes{background:rgba(255,115,201,.12);color:rgba(255,115,201,.9);}\n[data-skill="slang"] .pv-opt-yes:hover{background:rgba(255,115,201,.22);transform:scale(1.03);}\n[data-skill="slang"] .pv-opt-arrow{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.7;}\n[data-skill="slang"] .pv-opt-text{font-size:11px;line-height:1.3;text-align:center;}\n[data-skill="slang"] .pv-deck-actions{display:flex;align-items:center;justify-content:center;gap:24px;padding:6px 0 2px;flex-shrink:0;}\n[data-skill="slang"] .pv-da-btn{width:44px;height:44px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .15s,box-shadow .15s;}\n[data-skill="slang"] .pv-da-no{background:rgba(255,80,80,.15);color:rgba(255,100,100,.9);}\n[data-skill="slang"] .pv-da-no:hover{background:rgba(255,80,80,.28);transform:scale(1.12);box-shadow:0 0 0 2px rgba(255,80,80,.4);}\n[data-skill="slang"] .pv-da-yes{background:rgba(255,115,201,.15);color:rgba(255,115,201,.9);}\n[data-skill="slang"] .pv-da-yes:hover{background:rgba(255,115,201,.28);transform:scale(1.12);box-shadow:0 0 0 2px rgba(255,115,201,.4);}\n[data-skill="slang"] .pv-da-btn svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;}\n[data-skill="slang"] .pv-da-hint{font-family:var(--mono);font-size:9px;color:var(--muted);letter-spacing:.12em;text-transform:uppercase;}\n[data-skill="slang"] .tc-deck.pv-advancing .tc.back3{transform:translate(14px,11px) scale(.94) rotate(1.2deg);opacity:.65;}\n[data-skill="slang"] .tc-deck.pv-advancing .tc.back2{transform:translate(4px,3px) scale(.985) rotate(.4deg);opacity:.9;}\n@keyframes svCardIn{from{transform:scale(.88) translateY(18px);opacity:0;}to{transform:none;opacity:1;}}\n[data-skill="slang"] .tc-front.sv-card-in{animation:svCardIn .38s cubic-bezier(.34,1.56,.64,1) forwards;}\n/* MATCHING — Slang */';
    document.head.appendChild(_style);
  }

  /* 2. DRAG ENGINE */
// ====== Slang: drag + teclado + deck-actions (igual que Phrasal) ======
(function(){
  var panel=document.querySelector('.mid-content[data-skill="slang"] .tinder-panel');
  if(!panel) return;
  var card=panel.querySelector('.tc-front');
  if(!card) return;

  function doSwipeNo(){
    var deck=panel.querySelector('.tc-deck');
    card.classList.remove('swiping-no','swiping-yes');
    card.style.transform='';
    card.classList.add('swipe-out-no');
    if(deck) deck.classList.add('pv-advancing');
    var lblNo=card.querySelector('.tc-stamp.no');
    if(lblNo) lblNo.style.opacity=0;
    setTimeout(function(){
      if(window._svNext) window._svNext('no');
      card.style.transition='none';
      card.classList.remove('swipe-out-no','swiping-no');
      card.style.transform=''; card.style.opacity='';
      if(deck){
        var b2=deck.querySelector('.tc.back2'),b3=deck.querySelector('.tc.back3');
        if(b2){b2.style.transition='none';b2.style.transform='';b2.style.opacity='';}
        if(b3){b3.style.transition='none';b3.style.transform='';b3.style.opacity='';}
        deck.classList.remove('pv-advancing');
      }
      requestAnimationFrame(function(){
        card.style.transition='';
        if(deck){
          var b2=deck.querySelector('.tc.back2'),b3=deck.querySelector('.tc.back3');
          if(b2) b2.style.transition='';
          if(b3) b3.style.transition='';
        }
        card.classList.add('sv-card-in');
        setTimeout(function(){ card.classList.remove('sv-card-in'); },400);
      });
    },420);
  }
  function doSwipeYes(){
    var deck=panel.querySelector('.tc-deck');
    card.classList.remove('swiping-no','swiping-yes');
    card.style.transform='';
    card.classList.add('swipe-out-yes');
    if(deck) deck.classList.add('pv-advancing');
    var lblYes=card.querySelector('.tc-stamp.yes');
    if(lblYes) lblYes.style.opacity=0;
    setTimeout(function(){
      if(window._svNext) window._svNext('yes');
      card.style.transition='none';
      card.classList.remove('swipe-out-yes','swiping-yes');
      card.style.transform=''; card.style.opacity='';
      if(deck){
        var b2=deck.querySelector('.tc.back2'),b3=deck.querySelector('.tc.back3');
        if(b2){b2.style.transition='none';b2.style.transform='';b2.style.opacity='';}
        if(b3){b3.style.transition='none';b3.style.transform='';b3.style.opacity='';}
        deck.classList.remove('pv-advancing');
      }
      requestAnimationFrame(function(){
        card.style.transition='';
        if(deck){
          var b2=deck.querySelector('.tc.back2'),b3=deck.querySelector('.tc.back3');
          if(b2) b2.style.transition='';
          if(b3) b3.style.transition='';
        }
        card.classList.add('sv-card-in');
        setTimeout(function(){ card.classList.remove('sv-card-in'); },400);
      });
    },420);
  }

  var optNo=panel.querySelector('.pv-opt-no');
  var optYes=panel.querySelector('.pv-opt-yes');
  if(optNo) optNo.addEventListener('click',function(){ if(!panel.classList.contains('pv-locked')) doSwipeNo(); });
  if(optYes) optYes.addEventListener('click',function(){ if(!panel.classList.contains('pv-locked')) doSwipeYes(); });

  var daNo=panel.querySelector('.pv-da-no');
  var daYes=panel.querySelector('.pv-da-yes');
  if(daNo){
    daNo.addEventListener('mouseenter',function(){ card.classList.add('swiping-no'); });
    daNo.addEventListener('mouseleave',function(){ card.classList.remove('swiping-no'); });
    daNo.addEventListener('click',doSwipeNo);
  }
  if(daYes){
    daYes.addEventListener('mouseenter',function(){ card.classList.add('swiping-yes'); });
    daYes.addEventListener('mouseleave',function(){ card.classList.remove('swiping-yes'); });
    daYes.addEventListener('click',doSwipeYes);
  }

  var sx,sy,cx,dragging=false;
  function dragStart(e){
    if(panel.classList.contains('pv-locked')) return;
    e.preventDefault(); dragging=true; cx=undefined;
    var pt=e.touches?e.touches[0]:e; sx=pt.clientX; sy=pt.clientY;
    card.style.transition='none';
  }
  function dragMove(e){
    if(!dragging) return; if(e.cancelable) e.preventDefault();
    var pt=e.touches?e.touches[0]:e;
    cx=pt.clientX-sx; var cy=pt.clientY-sy;
    var rot=cx*0.07;
    card.style.transform='translate('+cx+'px,'+cy+'px) rotate('+rot+'deg)';
    var ratio=Math.min(Math.abs(cx)/80,1);
    var lblNo=card.querySelector('.tc-stamp.no');
    var lblYes=card.querySelector('.tc-stamp.yes');
    if(cx>0){ if(lblYes) lblYes.style.opacity=ratio; if(lblNo) lblNo.style.opacity=0; }
    else     { if(lblNo)  lblNo.style.opacity=ratio;  if(lblYes) lblYes.style.opacity=0; }
  }
  function dragEnd(){
    if(!dragging) return; dragging=false;
    card.style.transition='';
    if(cx!==undefined && Math.abs(cx)>90){
      if(cx>0) doSwipeYes(); else doSwipeNo();
    } else {
      card.style.transform='';
      var lblNo=card.querySelector('.tc-stamp.no');
      var lblYes=card.querySelector('.tc-stamp.yes');
      if(lblNo)  lblNo.style.opacity=0;
      if(lblYes) lblYes.style.opacity=0;
    }
  }
  card.addEventListener('mousedown',dragStart);
  card.addEventListener('touchstart',dragStart,{passive:false});
  window.addEventListener('mousemove',dragMove);
  window.addEventListener('touchmove',dragMove,{passive:false});
  window.addEventListener('mouseup',dragEnd);
  window.addEventListener('touchend',dragEnd);

  document.addEventListener('keydown',function(e){
    var mc=document.querySelector('.mid-content[data-skill="slang"]');
    if(!mc||!mc.classList.contains('active')) return;
    var _locked=document.querySelector('.mid-content[data-skill="slang"] .tinder-panel');
    if(_locked&&_locked.classList.contains('pv-locked')) return;
    if(e.key==='ArrowLeft'){ doSwipeNo(); e.preventDefault(); }
    else if(e.key==='ArrowRight'){ doSwipeYes(); e.preventDefault(); }
  });
})();

  /* 3. SLANG ENGINE */
// ====== Slang Engine — carga desde slang_cards (cat=slang) ======
(function(){
  var _svDeck=[], _svIdx=0;

  function svEl(sel){ return document.querySelector('.mid-content[data-skill="slang"] .tinder-panel '+sel); }
  function svEscape(s){
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function svBuildDeck(raw,ver){
    var VCF={
      1:{count:6, diffs:['easy']},
      2:{count:6, diffs:['easy','med']},
      3:{count:8, diffs:['med']},
      4:{count:10,diffs:['med','hard']},
      5:{count:10,diffs:['hard','legendary']}
    };
    var cfg=VCF[ver]||VCF[1];
    var filtered=raw.filter(function(c){ return cfg.diffs.indexOf(c.difficulty)!==-1; });
    if(filtered.length<3) filtered=raw.slice();
    var pool=filtered.slice().sort(function(){ return Math.random()-.5; }).slice(0,cfg.count);
    return pool.map(function(c){
      var side=Math.random()<.5?'left':'right';
      var trap;
      if(ver>=3){
        var others=filtered.filter(function(o){ return o.id!==c.id&&o.definition!==c.definition; });
        if(others.length){
          var pick=others[Math.floor(Math.random()*others.length)];
          trap=pick.definition;
        }
      }
      if(!trap){
        var dp=Array.isArray(c.distractors)&&c.distractors.length?c.distractors:[c.distractor||'—'];
        trap=dp[Math.floor(Math.random()*dp.length)];
      }
      return {
        label:c.label||'Slang',
        word:c.word,
        ctx:c.example||'',
        q:'&#191;se usa correctamente en este contexto?',
        optL:side==='left'?c.definition:trap,
        optR:side==='right'?c.definition:trap,
        defShort:c.definition,
        difficulty:c.difficulty||'',
        use_cases:c.use_cases||null,
        correct:side
      };
    });
  }

  function svRender(){
    var card=svEl('.tc-front');
    var countEl=svEl('.ep-count');
    if(!card||!_svDeck.length) return;
    var c=_svDeck[_svIdx];
    if(!c) return;
    if(countEl){
      var left=_svDeck.length-_svIdx-1;
      countEl.innerHTML='card <b>'+((_svIdx+1))+'</b> / '+_svDeck.length+' · quedan '+left;
    }
    var catEl=card.querySelector('.pv-cat');
    var wordEl=card.querySelector('.pv-word');
    var ctxEl=card.querySelector('.pv-ctx');
    var qEl=card.querySelector('.pv-q');
    var optNoText=card.querySelector('.pv-opt-no .pv-opt-text');
    var optYesText=card.querySelector('.pv-opt-yes .pv-opt-text');
    if(catEl) catEl.textContent=c.label;
    if(wordEl) wordEl.innerHTML='<em>'+svEscape(c.word)+'</em>';
    if(ctxEl){
      var ctx=svEscape(c.ctx);
      var re=new RegExp('('+c.word.replace(/[-\/^$*+?.()|[\]{}]/g,'\$&')+')','gi');
      ctx=ctx.replace(re,'<mark>$1</mark>');
      ctxEl.innerHTML=c.ctx?('"'+ctx+'"'):'';
    }
    if(qEl) qEl.innerHTML=c.q;
    if(optNoText) optNoText.textContent=c.optL;
    if(optYesText) optYesText.textContent=c.optR;
    var _tp=document.querySelector('.mid-content[data-skill="slang"] .tinder-panel');
    if(_tp) _tp.classList.add('pv-locked');
    var hc=document.querySelector('.hero-card');
    if(hc && document.querySelector('.tab[data-skill="slang"].active')){
      var color='#FF73C9';
      var typo=hc.querySelector('.hc-typo b');
      var hcWord=hc.querySelector('.hc-word');
      var hcIpa=hc.querySelector('.hc-ipa');
      var hcChip=hc.querySelector('.hc-chip');
      var hcRating=hc.querySelector('.hc-rating b');
      if(typo){ typo.textContent=c.word; typo.style['-webkit-text-stroke']='1.5px '+color+'30'; }
      if(hcWord){
        hcWord.textContent=c.word;
        hcWord.style.background='linear-gradient(180deg,#fff 30%,'+color+')';
        hcWord.style.webkitBackgroundClip='text';
        hcWord.style.backgroundClip='text';
        hcWord.style.filter='drop-shadow(0 6px 30px '+color+'50)';
      }
      if(hcIpa){ hcIpa.textContent=''; }
      if(hcChip) hcChip.innerHTML='<span class="icon" style="color:'+color+'">&#8801;</span> '+(_svIdx+1)+' / '+_svDeck.length;
      if(hcRating) hcRating.textContent=c.difficulty||'';
      var hcQuiz=hc.querySelector('.hc-quiz');
      var hcQLabel=hc.querySelector('.hc-q-label');
      if(hcQuiz && c.use_cases && c.use_cases.correct && Array.isArray(c.use_cases.wrong) && c.use_cases.wrong.length>=3){
        var opts=[
          {t:c.use_cases.correct, ok:true},
          {t:c.use_cases.wrong[0], ok:false},
          {t:c.use_cases.wrong[1], ok:false},
          {t:c.use_cases.wrong[2], ok:false}
        ].sort(function(){ return Math.random()-.5; });
        if(hcQLabel) hcQLabel.textContent='choose the correct usage';
        delete hcQuiz.dataset.answered;
        hcQuiz.querySelectorAll('.hc-opt').forEach(function(o){ o.remove(); });
        var letters=['A','B','C','D'];
        opts.forEach(function(opt,i){
          var btn=document.createElement('button');
          btn.className='hc-opt';
          btn.innerHTML='<b>'+letters[i]+'</b><span>'+svEscape(opt.t)+'</span>';
          if(opt.ok) btn.dataset.correct='1';
          btn.addEventListener('click',function(){
            if(hcQuiz.dataset.answered) return;
            hcQuiz.dataset.answered='1';
            hcQuiz.querySelectorAll('.hc-opt').forEach(function(o){
              o.style.pointerEvents='none';
              if(o.dataset.correct==='1') o.classList.add('vc-correct');
            });
            if(!btn.dataset.correct) btn.classList.add('vc-wrong');
            if(window.AuraRightPanel) AuraRightPanel.recordAnswer(!!opt.ok);
            var _tp=document.querySelector('.mid-content[data-skill="slang"] .tinder-panel');
            if(_tp) _tp.classList.remove('pv-locked');
          });
          hcQuiz.appendChild(btn);
        });
      }
    }
  }

  window._svReload=function(ver){ _svIdx=0; svLoad(ver); };
  window._svRender=svRender;
  window._svNext=function(dir){
    var c=_svDeck[_svIdx];
    var ok=c&&(dir==='no'?c.correct==='left':c.correct==='right');
    if(window.AuraRightPanel){
      AuraRightPanel.recordAnswer(ok);
      AuraRightPanel.setProgress(_svIdx+1, _svDeck.length);
    }
    _svIdx++;
    if(_svIdx>=_svDeck.length){ _svShowComplete(); return; }
    svRender();
  };

  function _svShowComplete(){
    if(window.AuraRightPanel) AuraRightPanel.update({skillsDone:['slang']});
    var card=document.querySelector('.mid-content[data-skill="slang"] .tc-front');
    var tp=document.querySelector('.mid-content[data-skill="slang"] .tinder-panel');
    var countEl=document.querySelector('.mid-content[data-skill="slang"] .ep-count');
    if(countEl) countEl.innerHTML='<b>'+_svDeck.length+'</b> / '+_svDeck.length+' · completado';
    if(card){
      card.style.transition='none';
      card.classList.remove('pv-locked');
      card.innerHTML=
        '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;text-align:center;">' +
        '<div style="font-size:48px;">\u2713</div>' +
        '<div style="font-family:var(--mono);font-size:11px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,115,201,1);">Slang completado</div>' +
        '<div style="font-family:var(--sans);font-size:13px;color:var(--muted);">Pulsa Siguiente para continuar</div>' +
        '</div>';
    }
    if(tp) tp.classList.remove('pv-locked');
    var nb=document.getElementById('nextBtn');
    if(nb){ nb.classList.add('pv-pulse'); }
  }

  async function svLoad(ver){
    ver=ver||window._examCurrentVersion||window._admCurrV||1;
    var sb=window._aura&&window._aura.sb;
    if(!sb){ console.warn('[slang] Sin Supabase'); return; }
    var lang=localStorage.getItem('aura_lang')||'en';
    try{
      var res=await sb.from('slang_cards')
        .select('id,word,example,distractor,distractors,definition,label,cat,difficulty,use_cases')
        .eq('cat','slang')
        .eq('language',lang)
        .not('use_cases','is',null);
      if(!res.error&&res.data&&res.data.length){
        _svDeck=svBuildDeck(res.data,ver);
        _svIdx=0;
        svRender();
        return;
      }
      console.warn('[slang] Sin tarjetas para lang='+lang);
    }catch(e){ console.warn('[slang] Error:',e); }
  }

  document.addEventListener('click',function(e){
    var t=e.target.closest('.tab[data-skill="slang"]');
    if(t&&!_svDeck.length) svLoad(window._examCurrentVersion||window._admCurrV||1);
  });

  function tryInit(){
    if(window._aura&&window._aura.sb){ svLoad(window._examCurrentVersion||window._admCurrV||1); }
    else { setTimeout(tryInit,600); }
  }
  setTimeout(tryInit,800);
})();

  /* 4. WRAP applyVersion — proteger mid-content de Slang */
  (function wrapApplyVersion() {
    var _orig = window.applyVersion;
    if (typeof _orig !== 'function') { setTimeout(wrapApplyVersion, 200); return; }
    window.applyVersion = function (v) {
      /* Quitar slang de VERSION_MID temporalmente para que applyVersion
         no sobreescriba el panel pv-* con el HTML viejo */
      var mid = window.VERSION_MID && window.VERSION_MID[v];
      var savedSlang = mid && mid.slang;
      if (mid && mid.slang) delete mid.slang;
      _orig.call(this, v);
      if (mid && savedSlang !== undefined) mid.slang = savedSlang;
      /* Recargar deck y re-sincronizar hero card */
      if (window._svReload) window._svReload(v);
      setTimeout(function () { if (window._svRender) window._svRender(); }, 80);
    };
  })();

  /* 5. TAB CLICK — sincronizar hero card */
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.tab[data-skill="slang"]');
    if (tab) { setTimeout(function () { if (window._svRender) window._svRender(); }, 20); }
  }, true);

})();

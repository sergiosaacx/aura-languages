/* ══════════════════════════════════════════════════════════════════
   examen-phrasal-hooks.js
   ⚠️  PESTAÑA PHRASAL — APROBADA — NO MODIFICAR
   ══════════════════════════════════════════════════════════════════
   Contiene TODO el comportamiento de la pestaña Phrasal:
   CSS específico, drag/swipe handler y engine de carga desde Supabase.

   Si examen-ascenso.html se sobreescribe, basta conservar:
     <script src="examen-phrasal-hooks.js"></script>
   ══════════════════════════════════════════════════════════════════ */

/* ── 1. CSS INJECTION ───────────────────────────────────────────────── */
(function () {
  if (document.getElementById('examen-phrasal-hooks-css')) return;
  var _style = document.createElement('style');
  _style.id = 'examen-phrasal-hooks-css';
  _style.textContent = "/* Phrasal: swipe card redesign (flashcards.html style) */\n\n/* Phrasal: nextBtn pulsa al completar */\n@keyframes pvNextPulse{0%,100%{box-shadow:0 10px 28px color-mix(in oklch,var(--c) 32%,transparent);}50%{box-shadow:0 0 0 6px rgba(255,216,61,.35),0 10px 28px color-mix(in oklch,var(--c) 50%,transparent);transform:translateY(-2px);}}\n.next-btn.pv-pulse{animation:pvNextPulse 1.2s ease-in-out infinite;}\n/* Phrasal: mazo bloqueado hasta responder panel izquierdo */\n[data-skill=\"phrasal\"] .tinder-panel.pv-locked .tc-deck,\n[data-skill=\"phrasal\"] .tinder-panel.pv-locked .pv-deck-actions{\n  pointer-events:none; opacity:.3; filter:grayscale(.7);\n  transition:opacity .3s,filter .3s;\n}\n[data-skill=\"phrasal\"] .tinder-panel:not(.pv-locked) .tc-deck,\n[data-skill=\"phrasal\"] .tinder-panel:not(.pv-locked) .pv-deck-actions{\n  opacity:1; filter:none; transition:opacity .35s,filter .35s;\n}\n\n\n[data-skill=\"phrasal\"].active{flex:1;min-height:0;}\n[data-skill=\"phrasal\"] .tinder-panel{flex:1;}\n[data-skill=\"phrasal\"] .tc-deck{flex:1;height:auto;min-height:0;display:flex;align-items:center;justify-content:center;perspective:1200px;overflow:visible;margin:4px 0;}\n[data-skill=\"phrasal\"] .tc{position:absolute;inset:auto;height:96%;max-height:480px;aspect-ratio:7/9;border-radius:22px;background:linear-gradient(180deg,#1c1a2e 0%,#0e0b1e 100%);border:1px solid rgba(var(--c),.25);box-shadow:0 24px 64px rgba(0,0,0,.65),0 0 0 1px rgba(255,255,255,.025) inset;padding:18px 18px 16px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;transition:transform .35s cubic-bezier(.34,1.56,.64,1),opacity .25s;user-select:none;}\n[data-skill=\"phrasal\"] .tc.back3{transform:translate(28px,22px) scale(.88) rotate(2.5deg);opacity:.35;z-index:1;}\n[data-skill=\"phrasal\"] .tc.back2{transform:translate(14px,11px) scale(.94) rotate(1.2deg);opacity:.65;z-index:2;}\n[data-skill=\"phrasal\"] .tc-front{background:linear-gradient(155deg,#1f1b35 0%,#0f0c1f 100%);box-shadow:0 24px 64px rgba(0,0,0,.65),0 0 0 1.5px rgba(var(--c),.35) inset;z-index:3;cursor:grab;}\n[data-skill=\"phrasal\"] .tc-front:active{cursor:grabbing;}\n[data-skill=\"phrasal\"] .tc-front.swiping-no{transform:translate(-6px,0) rotate(-2.5deg);box-shadow:0 24px 64px rgba(255,90,90,.2),0 0 0 1.5px rgba(255,90,90,.5) inset;}\n[data-skill=\"phrasal\"] .tc-front.swiping-yes{transform:translate(6px,0) rotate(2.5deg);box-shadow:0 24px 64px rgba(var(--c),.2),0 0 0 1.5px rgba(var(--c),.5) inset;}\n[data-skill=\"phrasal\"] .tc-front.swipe-out-no{transform:translateX(-130%) rotate(-28deg);opacity:0;transition:transform .4s ease-in,opacity .3s;}\n[data-skill=\"phrasal\"] .tc-front.swipe-out-yes{transform:translateX(130%) rotate(28deg);opacity:0;transition:transform .4s ease-in,opacity .3s;}\n.pv-head{display:flex;justify-content:space-between;align-items:center;flex-shrink:0;}\n.pv-cat{font-family:var(--mono);font-size:10px;color:rgba(var(--c),1);text-transform:uppercase;letter-spacing:.16em;font-weight:700;background:rgba(var(--c),.08);padding:6px 10px;border-radius:8px;border:1px solid rgba(var(--c),.2);}\n.pv-lives{font-family:var(--mono);font-size:11px;color:var(--muted);font-weight:600;}\n.pv-lives b{color:#f87171;}\n.pv-mid{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:6px 4px;}\n.pv-word{font-family:var(--sans);font-size:2rem;font-weight:800;color:var(--ink);letter-spacing:-.03em;line-height:1;text-wrap:balance;}\n.pv-word em{font-style:italic;color:rgba(var(--c),1);font-weight:700;}\n.pv-pron{font-family:var(--mono);font-size:11px;color:var(--ink-2);letter-spacing:.04em;}\n.pv-ctx{font-family:var(--sans);font-size:12px;color:var(--muted);font-style:italic;line-height:1.5;text-wrap:pretty;max-width:90%;}\n.pv-ctx mark{background:rgba(var(--c),.15);color:rgba(var(--c),1);font-style:normal;font-weight:600;padding:1px 5px;border-radius:4px;}\n.pv-foot{display:flex;flex-direction:column;gap:8px;flex-shrink:0;}\n.pv-q{text-align:center;font-family:var(--mono);font-size:9.5px;color:var(--muted);text-transform:uppercase;letter-spacing:.16em;font-weight:600;}\n.pv-opts{display:flex;gap:8px;}\n.pv-opt-no,.pv-opt-yes{flex:1;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.03);display:flex;flex-direction:column;gap:4px;transition:.15s;cursor:pointer;width:auto;height:auto;min-width:0;}\n.pv-opt-no{border:1.5px solid rgba(255,90,90,.35);text-align:left;}\n.pv-opt-yes{border:1.5px solid rgba(var(--c),.35);text-align:right;}\n.pv-opt-no:hover{background:rgba(255,90,90,.08);}\n.pv-opt-yes:hover{background:rgba(var(--c),.08);}\n.pv-opt-arrow{font-family:var(--mono);font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;display:flex;align-items:center;gap:4px;}\n.pv-opt-no .pv-opt-arrow{color:var(--bad);}\n.pv-opt-yes .pv-opt-arrow{color:rgba(var(--c),1);justify-content:flex-end;}\n.pv-opt-text{font-family:var(--sans);font-size:11.5px;font-weight:600;color:var(--ink);line-height:1.3;}\n\n/* Phrasal: back cards avanzan cuando la frontal sale */\n[data-skill=\"phrasal\"] .tc-deck.pv-advancing .tc.back3{transform:translate(14px,11px) scale(.94) rotate(1.2deg);opacity:.65;}\n[data-skill=\"phrasal\"] .tc-deck.pv-advancing .tc.back2{transform:translate(4px,3px) scale(.985) rotate(.4deg);opacity:.9;}\n/* Phrasal: entrada de nueva carta */\n@keyframes pvCardIn{from{transform:scale(.93) translateY(10px);opacity:0;}to{transform:none;opacity:1;}}\n[data-skill=\"phrasal\"] .tc-front.pv-card-in{animation:pvCardIn .38s cubic-bezier(.34,1.56,.64,1) forwards;}\n\n/* Phrasal: deck-actions circular buttons */\n.pv-deck-actions{display:flex;align-items:center;justify-content:center;gap:14px;flex-shrink:0;padding-top:4px;}\n.pv-da-btn{width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,.04);border:1.5px solid var(--line);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s;}\n.pv-da-btn:hover{transform:translateY(-2px);}\n.pv-da-no{color:var(--bad);border-color:rgba(255,90,90,.35);background:rgba(255,90,90,.05);}\n.pv-da-no:hover{background:var(--bad);color:#fff;border-color:var(--bad);}\n.pv-da-yes{color:rgba(var(--c),1);border-color:rgba(var(--c),.35);background:rgba(var(--c),.05);}\n.pv-da-yes:hover{background:rgba(var(--c),1);color:#0a0a0a;border-color:rgba(var(--c),1);}\n.pv-da-btn svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;}\n.pv-da-hint{font-family:var(--mono);font-size:9.5px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;}\n\n\n/* BANK CHIPS \u2014 Phrasal */\n.bank-chips{display:flex;flex-wrap:wrap;gap:7px;}\n.bchip{font-family:var(--mono);font-size:11.5px;font-weight:800;padding:8px 13px;border-radius:var(--r-pill);background:rgba(255,255,255,.03);border:1.5px solid var(--line-2);color:var(--ink-2);transition:.15s;letter-spacing:.02em;}\n.bchip:hover{background:rgba(var(--c),.08);border-color:rgba(var(--c),.5);color:rgba(var(--c),1);}\n.bchip.used{opacity:.32;text-decoration:line-through;cursor:not-allowed;background:transparent;}\n.bchip.active{background:rgba(var(--c),1);color:#0a0a0a;border-color:rgba(var(--c),1);box-shadow:0 4px 14px rgba(var(--c),.34);}\n.bank-note{font-family:var(--mono);font-size:10.5px;color:var(--muted);letter-spacing:.04em;}";
  document.head.appendChild(_style);
})();

// ====== Phrasal: drag + teclado + deck-actions (estilo flashcards.html) ======
(function(){
  var panel=document.querySelector('.mid-content[data-skill="phrasal"] .tinder-panel');
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
      if(window._pvNext) window._pvNext('no');
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
        card.classList.add('pv-card-in');
        setTimeout(function(){ card.classList.remove('pv-card-in'); },400);
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
      if(window._pvNext) window._pvNext('yes');
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
        card.classList.add('pv-card-in');
        setTimeout(function(){ card.classList.remove('pv-card-in'); },400);
      });
    },420);
  }

  // Botones dentro de la carta
  var optNo=panel.querySelector('.pv-opt-no');
  var optYes=panel.querySelector('.pv-opt-yes');
  if(optNo) optNo.addEventListener('click',function(){ if(!panel.querySelector('.tinder-panel').classList.contains('pv-locked')) doSwipeNo(); });
  if(optYes) optYes.addEventListener('click',function(){ if(!panel.querySelector('.tinder-panel').classList.contains('pv-locked')) doSwipeYes(); });

  // Botones circulares (deck-actions)
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

  // Drag con mouse y touch
  var sx,sy,cx,dragging=false;
  function dragStart(e){
    if(panel.querySelector('.tinder-panel').classList.contains('pv-locked')) return;
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

  // Flechas del teclado
  document.addEventListener('keydown',function(e){
    var mc=document.querySelector('.mid-content[data-skill="phrasal"]');
    if(!mc||!mc.classList.contains('active')) return;
    var _locked=document.querySelector('.mid-content[data-skill="phrasal"] .tinder-panel');
    if(_locked&&_locked.classList.contains('pv-locked')) return;
    if(e.key==='ArrowLeft'){ doSwipeNo(); e.preventDefault(); }
    else if(e.key==='ArrowRight'){ doSwipeYes(); e.preventDefault(); }
  });
})();
// ====== Phrasal Engine — carga desde slang_cards (cat=phrasal_verbs) ======
(function(){
  var _pvDeck=[], _pvIdx=0;

  function pvEl(sel){ return document.querySelector('.mid-content[data-skill="phrasal"] .tinder-panel '+sel); }

  function pvEscape(s){
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function pvBuildDeck(raw,ver){
    // Configuración por versión
    var VCF={
      1:{count:6, diffs:['easy']},
      2:{count:6, diffs:['easy','med']},
      3:{count:8, diffs:['med']},
      4:{count:10,diffs:['med','hard']},
      5:{count:10,diffs:['hard','legendary']}
    };
    var cfg=VCF[ver]||VCF[1];

    // Filtrar por dificultad; fallback a todo si no hay suficientes
    var filtered=raw.filter(function(c){ return cfg.diffs.indexOf(c.difficulty)!==-1; });
    if(filtered.length<3) filtered=raw.slice();

    var pool=filtered.slice().sort(function(){ return Math.random()-.5; }).slice(0,cfg.count);

    return pool.map(function(c){
      var side=Math.random()<.5?'left':'right';
      var trap;

      // V3+: distractor = definición de otra tarjeta del mismo pool (más difícil)
      if(ver>=3){
        var others=filtered.filter(function(o){ return o.id!==c.id&&o.definition!==c.definition; });
        if(others.length){
          var pick=others[Math.floor(Math.random()*others.length)];
          trap=pick.definition;
        }
      }
      // V1-V2 (o fallback): distractor propio de la tarjeta
      if(!trap){
        var dp=Array.isArray(c.distractors)&&c.distractors.length?c.distractors:[c.distractor||'—'];
        trap=dp[Math.floor(Math.random()*dp.length)];
      }

      return {
        label:c.label||'Phrasal Verb',
        word:c.word,
        ctx:c.example||'',
        q:'¿cuál es la definición de esta expresión?',
        optL:side==='left'?c.definition:trap,
        optR:side==='right'?c.definition:trap,
        defShort:c.definition,
        difficulty:c.difficulty||'',
        use_cases:c.use_cases||null,
        correct:side
      };
    });
  }

  function pvRender(){
    var card=pvEl('.tc-front');
    var countEl=pvEl('.ep-count');
    if(!card||!_pvDeck.length) return;
    var c=_pvDeck[_pvIdx];
    if(!c) return;

    // Contador
    if(countEl){
      var left=_pvDeck.length-_pvIdx-1;
      countEl.innerHTML='card <b>'+((_pvIdx+1))+'</b> / '+_pvDeck.length+' · quedan '+left;
    }

    // Contenido
    var catEl=card.querySelector('.pv-cat');
    var wordEl=card.querySelector('.pv-word');
    var ctxEl=card.querySelector('.pv-ctx');
    var qEl=card.querySelector('.pv-q');
    var optNoText=card.querySelector('.pv-opt-no .pv-opt-text');
    var optYesText=card.querySelector('.pv-opt-yes .pv-opt-text');

    if(catEl) catEl.textContent=c.label;
    if(wordEl) wordEl.innerHTML='<em>'+pvEscape(c.word)+'</em>';
    if(ctxEl){
      var ctx=pvEscape(c.ctx);
      var re=new RegExp('('+c.word.replace(/[-\/\^$*+?.()|[\]{}]/g,'\$&')+')','gi');
      ctx=ctx.replace(re,'<mark>$1</mark>');
      ctxEl.innerHTML=c.ctx?('“'+ctx+'”'):'';
    }
    if(qEl) qEl.textContent=c.q;
    if(optNoText) optNoText.textContent=c.optL;
    if(optYesText) optYesText.textContent=c.optR;

    // ── Bloquear mazo hasta que el usuario responda el panel izquierdo ──
    var _tp=document.querySelector('.mid-content[data-skill="phrasal"] .tinder-panel');
    if(_tp) _tp.classList.add('pv-locked');

    // ── Sincronizar panel izquierdo (hero card) ──
    var hc=document.querySelector('.hero-card');
    if(hc && document.querySelector('.tab[data-skill="phrasal"].active')){
      var color='#FFD83D';
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
      if(hcChip) hcChip.innerHTML='<span class="icon" style="color:'+color+'">&#8801;</span> '+(_pvIdx+1)+' / '+_pvDeck.length;
      if(hcRating) hcRating.textContent=c.difficulty||'';

      // ── Actualizar quiz con use_cases (4 frases: 1 correcta + 3 incorrectas) ──
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
          btn.innerHTML='<b>'+letters[i]+'</b><span>'+pvEscape(opt.t)+'</span>';
          if(opt.ok) btn.dataset.correct='1';
          btn.addEventListener('click',function(){
            if(hcQuiz.dataset.answered) return;
            hcQuiz.dataset.answered='1';
            hcQuiz.querySelectorAll('.hc-opt').forEach(function(o){
              o.style.pointerEvents='none';
              if(o.dataset.correct==='1') o.classList.add('vc-correct');
            });
            if(!btn.dataset.correct) btn.classList.add('vc-wrong');
            // Reportar al panel derecho
            if(window.AuraRightPanel) AuraRightPanel.recordAnswer(!!opt.ok);
            // Desbloquear mazo
            var _tp=document.querySelector('.mid-content[data-skill="phrasal"] .tinder-panel');
            if(_tp) _tp.classList.remove('pv-locked');
          });
          hcQuiz.appendChild(btn);
        });
      }
    }
  }

  // Avanzar al siguiente
  window._pvReload=function(ver){ _pvIdx=0; pvLoad(ver); };
  window._pvRender=function(){ pvRender(); };
  window._pvNext=function(dir){
    var c=_pvDeck[_pvIdx];
    var ok=c&&(dir==='no'?c.correct==='left':c.correct==='right');
    if(window.AuraRightPanel){
      AuraRightPanel.recordAnswer(ok);
      AuraRightPanel.setProgress(_pvIdx+1, _pvDeck.length);
    }
    _pvIdx++;
    if(_pvIdx>=_pvDeck.length){
      _pvShowComplete();
      return;
    }
    pvRender();
  };

  function _pvShowComplete(){
    // Marcar skill como completado en el panel derecho
    if(window.AuraRightPanel) AuraRightPanel.update({skillsDone:['phrasal']});

    // Mostrar carta de completado en el mazo
    var card=document.querySelector('.mid-content[data-skill="phrasal"] .tc-front');
    var tp=document.querySelector('.mid-content[data-skill="phrasal"] .tinder-panel');
    var countEl=document.querySelector('.mid-content[data-skill="phrasal"] .ep-count');
    if(countEl) countEl.innerHTML='<b>'+_pvDeck.length+'</b> / '+_pvDeck.length+' · completado';
    if(card){
      card.style.transition='none';
      card.classList.remove('pv-locked');
      card.innerHTML=
        '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;text-align:center;">' +
        '<div style="font-size:48px;">✓</div>' +
        '<div style="font-family:var(--mono);font-size:11px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,216,61,1);">Phrasal completado</div>' +
        '<div style="font-family:var(--sans);font-size:13px;color:var(--muted);">Pulsa Siguiente para continuar</div>' +
        '</div>';
    }
    if(tp) tp.classList.remove('pv-locked');

    // Pulsar el botón Siguiente para llamar la atención
    var nb=document.getElementById('nextBtn');
    if(nb){ nb.classList.add('pv-pulse'); }
  }

  // Carga desde Supabase
  async function pvLoad(ver){
    ver=ver||window._examCurrentVersion||window._admCurrV||1;
    var sb=window._aura&&window._aura.sb;
    if(!sb){ console.warn('[phrasal] Sin Supabase'); return; }
    var lang=localStorage.getItem('aura_lang')||'en';
    try{
      var res=await sb.from('slang_cards')
        .select('id,word,example,distractor,distractors,definition,label,cat,difficulty,use_cases')
        .eq('cat','phrasal_verbs')
        .eq('language',lang);
      if(!res.error&&res.data&&res.data.length){
        _pvDeck=pvBuildDeck(res.data,ver);
        _pvIdx=0;
        pvRender();
        return;
      }
      console.warn('[phrasal] Sin tarjetas para lang='+lang);
    }catch(e){ console.warn('[phrasal] Error:',e); }
  }

  // Cargar cuando el tab Phrasal se activa
  document.addEventListener('click',function(e){
    var t=e.target.closest('.tab[data-skill="phrasal"]');
    if(t&&!_pvDeck.length) pvLoad(window._examCurrentVersion||window._admCurrV||1);
  });

  // Intentar cargar al iniciar (puede que ya esté en la pestaña Phrasal)
  function tryInit(){
    if(window._aura&&window._aura.sb){ pvLoad(window._examCurrentVersion||window._admCurrV||1); }
    else { setTimeout(tryInit,600); }
  }
  setTimeout(tryInit,800);
})();

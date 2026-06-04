/* ═══════════════════════════════════════════════════════════════
   topic-game.js — Motor de juego  |  Aura Languages
   Depende de: STATE, _gameSeq, shuffle, I, ISA (globals)
   ═══════════════════════════════════════════════════════════════ */

var MAX_LIVES=5;

/* ── enterTopic ──────────────────────────────────────────────── */
function enterTopic(t){
  STATE={view:'game',topic:t,step:0,score:0,lives:MAX_LIVES,correct:0,checked:false};
  _gameSeq=null;_mcSel=null;_mSel=null;_mDone=0;_efDone={};
  _mcCorrect=0;_orderSents=[];_fixSents=[];_scrWords=[];_trItems=[];
  _trSel={};_trPage=0;_tfSel={};_tfStmts=[];
  _listenSel={};_sortSel={};_tfmItems=[];_tfmSel={};_dlgSel={};_dlgBlanks=[];

  var raw=getGames(t.id);
  _gameSeq=raw?shuffle(raw.slice()):null;

  /* Mostrar game view, ocultar list */
  var vGame=document.getElementById('viewGame');
  var vList=document.getElementById('viewList');
  if(vList) vList.style.display='none';
  if(vGame){ vGame.style.display='flex'; }

  document.title=t.sub+' — Aura Languages';

  /* Bind close button */
  var closeBtn=document.getElementById('hudClose');
  if(closeBtn) closeBtn.onclick=function(){renderList();};

  /* Bind action button */
  var actionBtn=document.getElementById('gameActionBtn');
  if(actionBtn) actionBtn.onclick=onAction;

  showStart();
}

/* ── HUD ─────────────────────────────────────────────────────── */
var _heartSvg='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2 5 5.3 5c2 0 3.4 1.2 4.2 2.4C10.3 6.2 11.7 5 13.7 5 17 5 18.6 8.4 17 11.7 14.5 16.4 12 21 12 21z"/></svg>';

function renderHud(){
  if(!_gameSeq) return;
  var total=_gameSeq.length;

  /* Progress segments */
  var segs='';
  for(var i=0;i<total;i++){
    var cls=i<STATE.step?'done':i===STATE.step?'active':'';
    segs+='<div class="seg '+cls+'"><i></i></div>';
  }
  var hudProg=document.getElementById('hudProg');
  if(hudProg) hudProg.innerHTML=segs;

  /* Lives */
  var h='';
  for(var j=0;j<MAX_LIVES;j++){
    h+='<span class="heart '+(j>=STATE.lives?'lost':'')+'">'+_heartSvg+'</span>';
  }
  var hudLives=document.getElementById('hudLives');
  if(hudLives) hudLives.innerHTML=h;

  /* XP */
  var hudXp=document.getElementById('hudXpVal');
  if(hudXp) hudXp.textContent=STATE.score+' XP';
}

/* ── Action button helpers ───────────────────────────────────── */
function setAction(label,enabled){
  var btn=document.getElementById('gameActionBtn');
  if(!btn) return;
  btn.innerHTML=label;
  btn.disabled=!enabled;
  btn.className='gm-btn gm-btn-accent';
}
function enableAction(){
  var btn=document.getElementById('gameActionBtn');
  if(btn) btn.disabled=false;
}

/* ── Show start screen ───────────────────────────────────────── */
function showStart(){
  var t=STATE.topic;
  var games=_gameSeq;
  var total=games?games.length:t.steps;
  var totalXp=games?games.reduce(function(s,g){return s+g.xp;},0):t.xp;
  var rc=RM[t.rank]||'#cd7f32';

  renderHud();
  _setFooterVisible(false);

  var stage=document.getElementById('gameStage');
  stage.innerHTML=
    '<div class="gm-start">'+
      '<div class="gm-start-pills">'+
        '<span class="gm-pill"><span class="pdot" style="background:'+rc+';color:'+rc+'"></span>'+t.rank+'</span>'+
        '<span class="gm-pill cefr" style="background:'+rc+'">'+t.cefr+'</span>'+
        '<span class="gm-pill">Tarjeta '+String(t.id).padStart(2,'0')+'</span>'+
      '</div>'+
      '<div class="gm-glyph"><svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>'+
      '<h1>'+_emTitle(t.title)+'</h1>'+
      '<div class="sub">'+t.sub+'</div>'+
      '<div class="gm-start-stats">'+
        '<div class="gm-start-stat"><div class="v">'+total+'</div><div class="l">Juegos</div></div>'+
        '<div class="gm-start-stat"><div class="v accent">+'+totalXp+'</div><div class="l">XP máx</div></div>'+
        '<div class="gm-start-stat"><div class="v">'+MAX_LIVES+'</div><div class="l">Vidas</div></div>'+
      '</div>'+
      '<button class="gm-btn gm-btn-accent" id="startBtn" style="width:100%">'+
        'Empezar <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>'+
      '</button>'+
    '</div>';

  document.getElementById('startBtn').onclick=function(){
    STATE.step=0;
    loadStep();
  };
}

function _emTitle(title){
  var parts=title.split('\n');
  if(parts.length<2) return title;
  return parts[0]+' <em>'+parts[1]+'</em>';
}

/* ── Load a step ─────────────────────────────────────────────── */
function loadStep(){
  if(!_gameSeq){
    _noGames();
    return;
  }
  if(STATE.step>=_gameSeq.length){
    showResult();
    return;
  }
  STATE.checked=false;
  _mcSel=null;_mSel=null;_mDone=0;_efDone={};
  _trSel={};_trPage=0;

  var g=_gameSeq[STATE.step];
  renderHud();
  _resetFooter();

  var inner='';
  if(g.id==='mc')        inner=buildMC(g);
  else if(g.id==='match')     inner=buildMatch(g);
  else if(g.id==='fill')      inner=buildFill(g);
  else if(g.id==='order')     inner=buildOrder(g);
  else if(g.id==='fix')       inner=buildFix(g);
  else if(g.id==='translate') inner=buildTranslate(g);
  else if(g.id==='scramble')  inner=buildScramble(g);
  else if(g.id==='truefalse') inner=buildTrueFalse(g);
  else if(g.id==='listen')    inner=buildListen(g);
  else if(g.id==='sort')      inner=buildSort(g);
  else if(g.id==='transform') inner=buildTransform(g);
  else if(g.id==='dialogue')  inner=buildDialogue(g);
  else inner='<p style="color:var(--muted)">Tipo de juego: '+g.id+'</p>';

  var qTagIcon=_ICONS[g.id]||_ICONS.mc;
  var stage=document.getElementById('gameStage');
  stage.scrollTop=0;
  stage.innerHTML=
    '<div class="panel">'+
      '<div class="q-tag">'+
        '<svg viewBox="0 0 24 24">'+qTagIcon+'</svg>'+
        'Juego '+(STATE.step+1)+' de '+_gameSeq.length+' · '+g.label+
      '</div>'+
      inner+
    '</div>';

  /* Match y sort: no check button hasta completar */
  if(g.id==='match'||g.id==='sort'){
    _setFooterVisible(false);
  } else {
    _setFooterVisible(true);
    setAction('Comprobar <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',false);
  }
}

function _noGames(){
  var stage=document.getElementById('gameStage');
  stage.innerHTML=
    '<div class="panel" style="text-align:center;padding:40px 20px">'+
      '<svg viewBox="0 0 24 24" style="width:48px;height:48px;stroke:var(--muted);fill:none;stroke-width:1.4;margin-bottom:16px"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'+
      '<h2 style="color:var(--ink);margin-bottom:8px">Próximamente</h2>'+
      '<p style="color:var(--muted);font-family:var(--mono);font-size:12px">Los juegos de este tema estarán disponibles pronto.</p>'+
      '<button class="gm-btn-ghost" style="margin-top:20px" onclick="renderList()">← Volver a temas</button>'+
    '</div>';
  _setFooterVisible(false);
}

/* ── Icon map ────────────────────────────────────────────────── */
var _ICONS={
  mc:       '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
  match:    '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  fill:     '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>',
  order:    '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="9" y2="18"/>',
  fix:      '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  translate:'<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
  scramble: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
  truefalse:'<polyline points="20 6 9 17 4 12"/>',
  listen:   '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
  sort:     '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  transform:'<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  dialogue: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
};

/* ── Footer helpers ──────────────────────────────────────────── */
function _setFooterVisible(v){
  var f=document.getElementById('gameFooter');
  if(f) f.style.display=v?'block':'none';
}
function _resetFooter(){
  var f=document.getElementById('gameFooter');
  if(f){ f.className='gm-footer'; f.style.display='block'; }
  var fbIco=document.getElementById('gameFbIco');
  var fbTitle=document.getElementById('gameFbTitle');
  var fbDetail=document.getElementById('gameFbDetail');
  var fb=document.getElementById('gameFeedback');
  if(fbIco) fbIco.innerHTML='';
  if(fbTitle) fbTitle.textContent='';
  if(fbDetail) fbDetail.textContent='';
  if(fb) fb.style.display='none';
}

/* ── Reveal feedback ─────────────────────────────────────────── */
function reveal(ok,xpGain,detail){
  STATE.checked=true;
  var f=document.getElementById('gameFooter');
  var fbIco=document.getElementById('gameFbIco');
  var fbTitle=document.getElementById('gameFbTitle');
  var fbDetail=document.getElementById('gameFbDetail');
  var fb=document.getElementById('gameFeedback');

  if(ok){
    STATE.score+=xpGain;
    STATE.correct++;
    if(f) f.className='gm-footer correct';
    if(fbIco) fbIco.innerHTML='<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>';
    if(fbTitle) fbTitle.textContent='¡Correcto!';
    if(fbDetail) fbDetail.innerHTML=(detail||'')+'&nbsp;<b style="color:var(--accent)">+'+xpGain+' XP</b>';
  } else {
    STATE.lives=Math.max(0,STATE.lives-1);
    if(f) f.className='gm-footer wrong';
    if(fbIco) fbIco.innerHTML='<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    if(fbTitle) fbTitle.textContent='Casi…';
    if(fbDetail) fbDetail.innerHTML=detail||'';
  }
  if(fb) fb.style.display='flex';

  var label=STATE.lives<=0
    ?'Ver resultados <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>'
    :STATE.step<_gameSeq.length-1
      ?'Continuar <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>'
      :'Ver resultados <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>';
  setAction(label,true);
  renderHud();
}

/* ── Guardar progreso en Supabase ────────────────────────────── */
function _saveTopicProgress(gamesDone, completed){
  try{
    var sb=window._aura&&window._aura.sb;
    var userId=window._aura&&window._aura.userId;
    var lang=(localStorage.getItem('aura_lang')||'en');
    if(!sb||!userId) return;
    sb.from('topic_progress').upsert({
      user_id: userId,
      topic_id: STATE.topic.id,
      language: lang,
      games_done: gamesDone,
      completed: completed,
      last_played: new Date().toISOString()
    },{onConflict:'user_id,topic_id,language'}).then(function(){});
  }catch(e){}
}

/* ── onAction (action button click) ─────────────────────────── */
function onAction(){
  if(!_gameSeq) return;
  var g=_gameSeq[STATE.step];
  if(!STATE.checked){
    gmVerify(g);
    return;
  }
  if(STATE.lives<=0){
    showResult();
    return;
  }
  STATE.step++;
  if(STATE.step>=_gameSeq.length){
    _saveTopicProgress(_gameSeq.length, true);
    showResult();
  } else {
    _saveTopicProgress(STATE.step, false);
    loadStep();
  }
}

/* ═══════════════════════════════════════════════════════════════
   BUILD FUNCTIONS
   ═══════════════════════════════════════════════════════════════ */

/* ── MC ──────────────────────────────────────────────────────── */
function buildMC(g){
  var L=['A','B','C','D'];
  var _ans=g.opts[g.correct];
  var opts=shuffle(g.opts.slice());
  _mcCorrect=opts.indexOf(_ans);
  var grid=opts.length<=4?'grid2':'';
  var html='<div class="q-title">'+g.q+'</div><div class="q-sub"></div>'+
    '<div class="opts '+grid+'">';
  opts.forEach(function(o,i){
    html+='<div class="opt" data-i="'+i+'" onclick="_mcClick('+i+')">'+
      '<div class="opt-key">'+L[i]+'</div>'+
      '<div class="opt-txt">'+o+'</div>'+
      '<div class="opt-mark"><svg viewBox="0 0 24 24"></svg></div>'+
    '</div>';
  });
  html+='</div>';
  return html;
}
window._mcClick=function(i){
  if(STATE.checked) return;
  _mcSel=i;
  var opts=document.querySelectorAll('#gameStage .opt');
  opts.forEach(function(el,j){el.classList.toggle('sel',j===i);});
  enableAction();
};

/* ── Match ───────────────────────────────────────────────────── */
var _PAIR_COLORS=['#60a5fa','#c084fc','#34d36b','#fbbf24','#5eead4','#fb923c'];
function buildMatch(g){
  var right=shuffle(g.pairs.map(function(p,i){return{t:p[1],i:i};}));
  var leftCol=g.pairs.map(function(p,i){
    return '<div class="mtile" data-side="L" data-i="'+i+'" onclick="_mClick(this)">'+
      '<span class="mdot"></span>'+p[0]+'</div>';
  }).join('');
  var rightCol=right.map(function(r){
    return '<div class="mtile" data-side="R" data-i="'+r.i+'" onclick="_mClick(this)">'+
      '<span class="mdot"></span>'+r.t+'</div>';
  }).join('');
  return '<div class="q-title">'+g.instr+'</div>'+
    '<div class="match-grid">'+
      '<div class="match-col"><div class="match-head">Inglés</div>'+leftCol+'</div>'+
      '<div class="match-col"><div class="match-head">Español</div>'+rightCol+'</div>'+
    '</div>';
}
window._mClick=function(el){
  if(el.classList.contains('matched')) return;
  var side=el.dataset.side;
  if(!_mSel){
    document.querySelectorAll('#gameStage .mtile').forEach(function(e){e.classList.remove('sel');});
    el.classList.add('sel');_mSel=el;return;
  }
  if(_mSel===el){el.classList.remove('sel');_mSel=null;return;}
  if(_mSel.dataset.side===side){
    document.querySelectorAll('#gameStage .mtile').forEach(function(e){e.classList.remove('sel');});
    el.classList.add('sel');_mSel=el;return;
  }
  var ia=parseInt(_mSel.dataset.i),ib=parseInt(el.dataset.i);
  if(ia===ib){
    var c=_PAIR_COLORS[ia%_PAIR_COLORS.length];
    [_mSel,el].forEach(function(tile){
      tile.classList.remove('sel');tile.classList.add('matched');
      tile.style.setProperty('--pair-color',c);
    });
    _mDone++;_mSel=null;
    var total=document.querySelectorAll('#gameStage .mtile[data-side="L"]').length;
    if(_mDone>=total){
      STATE.score+=30;STATE.checked=true;
      reveal(true,30,'¡Todos los pares correctos!');
      _setFooterVisible(true);
    }
  } else {
    var a=_mSel,b=el;
    [a,b].forEach(function(t){t.classList.add('flash-bad');});
    setTimeout(function(){[a,b].forEach(function(t){t.classList.remove('flash-bad','sel');});a===_mSel&&(_mSel=null);},400);
    _mSel=null;
  }
};

/* ── Fill ────────────────────────────────────────────────────── */
function buildFill(g){
  var sents=shuffle(g.sents.slice());
  var html='<div class="q-sub" style="margin-bottom:18px">'+g.instr+'</div>';
  sents.forEach(function(s,i){
    html+='<div class="fill-group">'+
      '<div class="fill-num">Oración '+(i+1)+'</div>'+
      '<div class="sentence">'+
        s.pre+
        '<span class="blank empty" id="fbB'+i+'" data-ans="'+s.ans+'" data-i="'+i+'" onclick="_fbClear('+i+')">____</span>'+
        s.post+
      '</div>'+
      '<div class="fill-bank" id="fbBnk'+i+'">'+
        shuffle(s.bank.slice()).map(function(w){
          return '<div class="tok" data-w="'+w+'" onclick="_fbPick('+i+',this)">'+w+'</div>';
        }).join('')+
      '</div>'+
    '</div>';
  });
  return html;
}
window._fbPick=function(gi,wordEl){
  if(STATE.checked) return;
  var blank=document.getElementById('fbB'+gi);
  if(!blank||blank.dataset.filled==='1') return;
  blank.textContent=wordEl.dataset.w;
  blank.dataset.filled='1';
  blank.classList.remove('empty');blank.classList.add('filled');
  wordEl.classList.add('spent');
  /* Check all filled */
  var allFilled=true;
  document.querySelectorAll('#gameStage .blank').forEach(function(b){
    if(b.dataset.filled!=='1') allFilled=false;
  });
  if(allFilled) enableAction();
};
window._fbClear=function(gi){
  if(STATE.checked) return;
  var blank=document.getElementById('fbB'+gi);
  if(!blank||blank.dataset.filled!=='1') return;
  var w=blank.textContent;
  blank.textContent='____';blank.dataset.filled='0';
  blank.classList.add('empty');blank.classList.remove('filled','ok','bad');
  var bank=document.getElementById('fbBnk'+gi);
  if(bank){
    var wd=bank.querySelector('.tok[data-w="'+w+'"]');
    if(wd) wd.classList.remove('spent');
  }
};

/* ── Order ───────────────────────────────────────────────────── */
function buildOrder(g){
  _orderSents=shuffle(g.sents.slice());
  var html='<div class="q-sub" style="margin-bottom:18px">'+g.instr+'</div>';
  _orderSents.forEach(function(s,i){
    html+='<div style="margin-bottom:18px">'+
      '<div class="build-zone" id="woA'+i+'"></div>'+
      '<div class="build-line"></div>'+
      '<div class="bank" id="woB'+i+'">'+
        shuffle(s.words.slice()).map(function(w){
          return '<div class="tok" data-w="'+w+'" onclick="_woClick(this,'+i+',\'b\')">'+w+'</div>';
        }).join('')+
      '</div>'+
    '</div>';
  });
  return html;
}
window._woClick=function(el,gi,zone){
  if(STATE.checked) return;
  var w=el.dataset.w;el.remove();
  var dest;
  if(zone==='b'){
    dest=document.getElementById('woA'+gi);
    var t=document.createElement('div');
    t.className='tok placed';t.dataset.w=w;t.textContent=w;
    t.setAttribute('onclick','_woClick(this,'+gi+',\'a\')');
    dest.appendChild(t);
    dest.classList.add('has-words');
  } else {
    dest=document.getElementById('woB'+gi);
    var t2=document.createElement('div');
    t2.className='tok';t2.dataset.w=w;t2.textContent=w;
    t2.setAttribute('onclick','_woClick(this,'+gi+',\'b\')');
    dest.appendChild(t2);
    var az=document.getElementById('woA'+gi);
    if(az&&!az.querySelector('.tok')) az.classList.remove('has-words');
  }
  /* Enable if any zone has words */
  var anyFilled=false;
  _orderSents.forEach(function(_,i){
    var az=document.getElementById('woA'+i);
    if(az&&az.querySelector('.tok')) anyFilled=true;
  });
  if(anyFilled) enableAction();
};

/* ── Fix ─────────────────────────────────────────────────────── */
function buildFix(g){
  _fixSents=shuffle(g.sents.slice());
  var html='<div class="q-sub" style="margin-bottom:18px">'+g.instr+'</div>';
  _fixSents.forEach(function(s,si){
    html+='<div class="ef-group" id="efG'+si+'">'+
      '<div class="ef-sentence">'+
        s.words.map(function(w,wi){
          var cls='ef-word-btn'+(wi===s.wi?' hint':'');
          return '<button class="'+cls+'" data-si="'+si+'" data-wi="'+wi+'" onclick="_efClick('+si+','+wi+')">'+w+'</button>';
        }).join('')+
      '</div>'+
      '<div class="ef-choices" id="efC'+si+'">'+
        s.choices.map(function(c){
          return '<div class="ef-choice" onclick="_efPick('+si+',\''+c+'\',\''+s.correct+'\')">'+c+'</div>';
        }).join('')+
      '</div>'+
    '</div>';
  });
  return html;
}
window._efClick=function(si,wi){
  var g=_gameSeq[STATE.step];
  if(wi!==_fixSents[si].wi) return;
  document.querySelectorAll('[data-si="'+si+'"].ef-word-btn').forEach(function(b){b.classList.remove('selected');});
  var btn=document.querySelector('[data-si="'+si+'"][data-wi="'+wi+'"]');
  if(btn) btn.classList.add('selected');
  var ch=document.getElementById('efC'+si);if(ch) ch.classList.add('show');
};
window._efPick=function(si,chosen,correct){
  if(_efDone[si]) return;
  var btn=document.querySelector('[data-si="'+si+'"].selected');
  if(!btn) return;
  if(chosen===correct){
    btn.textContent=chosen;btn.classList.remove('selected','hint');btn.classList.add('fixed');
    var ch=document.getElementById('efC'+si);if(ch) ch.classList.remove('show');
    _efDone[si]=true;
    /* Check if all done */
    var allDone=_fixSents.every(function(_,i){return _efDone[i];});
    if(allDone) enableAction();
  } else {
    btn.style.animation='none';
    requestAnimationFrame(function(){btn.style.animation='ef-shake .36s ease';});
  }
};

/* ── Translate ───────────────────────────────────────────────── */
function buildTranslate(g){
  _trSel={};
  _trItems=shuffle(g.items.slice());
  return _renderTrPage(g);
}
function _renderTrPage(g){
  var start=_trPage*_TR_PAGE;
  var items=_trItems.slice(start,start+_TR_PAGE);
  var pages=Math.ceil(_trItems.length/_TR_PAGE);
  var pageTag=pages>1?'<div class="tr-pager">Grupo '+(_trPage+1)+' de '+pages+'</div>':'';
  var html='<div class="q-sub" style="margin-bottom:14px">'+g.instr+'</div>'+pageTag;
  items.forEach(function(it,i){
    var gi=start+i;
    html+='<div class="tr-item" id="trItem'+gi+'">'+
      '<div class="tr-src">'+it.src+'</div>'+
      '<div class="tr-opts">'+
        it.opts.map(function(o,oi){
          return '<button class="tr-opt" data-i="'+gi+'" data-oi="'+oi+'" onclick="_trClick('+gi+','+oi+')">'+o+'</button>';
        }).join('')+
      '</div></div>';
  });
  return html;
}
window._trClick=function(i,oi){
  if(STATE.checked) return;
  _trSel[i]=oi;
  document.querySelectorAll('[data-i="'+i+'"].tr-opt').forEach(function(el,idx){
    el.classList.toggle('selected',idx===oi);
  });
  /* Enable if current page all selected */
  var start=_trPage*_TR_PAGE;
  var pageItems=_trItems.slice(start,start+_TR_PAGE);
  var allSel=pageItems.every(function(_,j){return _trSel[start+j]!==undefined;});
  if(allSel) enableAction();
};

/* ── Scramble ────────────────────────────────────────────────── */
function buildScramble(g){
  _scrWords=shuffle(g.words.slice());
  var html='<div class="q-sub" style="margin-bottom:14px">'+g.instr+'</div>';
  _scrWords.forEach(function(w,i){
    html+='<div class="scr-item">'+
      '<div class="scr-hint">💡 '+w.hint+'</div>'+
      '<div class="scr-answer" id="scrAns'+i+'"></div>'+
      '<div class="scr-bank" id="scrBank'+i+'">'+
        w.scrambled.map(function(l,li){
          return '<button class="scr-tile" data-li="'+li+'" onclick="_scrPlace('+i+','+li+',this)">'+l+'</button>';
        }).join('')+
      '</div></div>';
  });
  return html;
}
window._scrPlace=function(wi,li,btn){
  if(STATE.checked) return;
  var ans=document.getElementById('scrAns'+wi);
  var tile=document.createElement('button');
  tile.className='scr-tile placed';
  tile.textContent=btn.textContent;
  tile.dataset.li=li;
  tile.onclick=function(){_scrRemove(wi,li,this);};
  ans.appendChild(tile);
  btn.style.visibility='hidden';btn.disabled=true;
  /* Enable if all words have at least one tile placed */
  var allFilled=_scrWords.every(function(_,i){
    var a=document.getElementById('scrAns'+i);
    return a&&a.querySelectorAll('.scr-tile').length>0;
  });
  if(allFilled) enableAction();
};
window._scrRemove=function(wi,li,tile){
  if(STATE.checked) return;
  var orig=document.querySelector('#scrBank'+wi+' [data-li="'+li+'"]');
  if(orig){orig.style.visibility='visible';orig.disabled=false;}
  tile.remove();
};

/* ── True / False ────────────────────────────────────────────── */
function buildTrueFalse(g){
  _tfStmts=g.stmts.slice();
  _tfSel={};
  var html='<div class="q-sub" style="margin-bottom:14px">'+g.instr+'</div>';
  _tfStmts.forEach(function(s,i){
    html+='<div class="tf-item" id="tfItem'+i+'">'+
      '<div class="tf-text">'+s.text+'</div>'+
      '<div class="tf-btns">'+
        '<button class="tf-btn tf-v" data-i="'+i+'" onclick="_tfClick('+i+',true)">✓ Verdadero</button>'+
        '<button class="tf-btn" data-i="'+i+'" onclick="_tfClick('+i+',false)">✗ Falso</button>'+
      '</div>'+
      '<div class="tf-expl" id="tfExpl'+i+'"></div>'+
    '</div>';
  });
  return html;
}
window._tfClick=function(i,val){
  if(STATE.checked) return;
  _tfSel[i]=val;
  document.querySelectorAll('[data-i="'+i+'"].tf-btn').forEach(function(b){
    b.classList.toggle('sel',b.classList.contains('tf-v')?val:!val);
  });
  var allSel=_tfStmts.every(function(_,j){return _tfSel[j]!==undefined;});
  if(allSel) enableAction();
};

/* ── Listen ──────────────────────────────────────────────────── */
function buildListen(g){
  _listenSel={};
  var html='<div class="q-sub" style="margin-bottom:14px">'+g.instr+'</div>';
  g.items.forEach(function(item,i){
    var L=['A','B','C','D'];
    var ansText=item.opts[item.correct];
    var opts=shuffle(item.opts.slice());
    window._listenSel['_c'+i]=opts.indexOf(ansText);
    html+='<div class="ls-item" id="lsItem'+i+'">'+
      '<button class="ls-play" onclick="_lsPlay(\''+item.tts.replace(/'/g,"\\'")+'\')" title="Reproducir">'+
        '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>'+
        ' Escuchar'+
      '</button>'+
      '<div class="ls-opts">';
    opts.forEach(function(o,oi){
      html+='<div class="opt" data-li="'+i+'" data-oi="'+oi+'" onclick="_lsClick('+i+','+oi+')">'+
        '<div class="opt-key">'+L[oi]+'</div>'+
        '<div class="opt-txt">'+o+'</div>'+
        '<div class="opt-mark"><svg viewBox="0 0 24 24"></svg></div>'+
      '</div>';
    });
    html+='</div></div>';
  });
  return html;
}
window._lsPlay=function(text){
  if(window.speechSynthesis){
    window.speechSynthesis.cancel();
    var u=new SpeechSynthesisUtterance(text);
    u.lang='en-US';u.rate=0.88;
    window.speechSynthesis.speak(u);
  }
};
window._lsClick=function(i,oi){
  if(STATE.checked) return;
  _listenSel[i]=oi;
  document.querySelectorAll('[data-li="'+i+'"].opt').forEach(function(el,j){
    el.classList.toggle('sel',j===oi);
  });
  var total=document.querySelectorAll('.ls-item').length;
  var allSel=true;
  for(var k=0;k<total;k++){if(_listenSel[k]===undefined){allSel=false;break;}}
  if(allSel) enableAction();
};

/* ── Sort ────────────────────────────────────────────────────── */
function buildSort(g){
  _sortSel={};
  var shuffled=shuffle(g.items.slice());
  var html='<div class="q-sub" style="margin-bottom:14px">'+g.instr+'</div>'+
    '<div class="sort-cats">';
  g.categories.forEach(function(cat,ci){
    html+='<div class="sort-cat">'+
      '<div class="sort-cat-label">'+cat+'</div>'+
      '<div class="sort-drop" id="sortDrop'+ci+'"></div>'+
    '</div>';
  });
  html+='</div>'+
    '<div class="sort-bank" id="sortBank">';
  shuffled.forEach(function(item,i){
    var origIdx=g.items.indexOf(item);
    html+='<div class="tok sort-tok" data-idx="'+origIdx+'" data-correct="'+item.correct+'" onclick="_sortClick(this)">'+item.text+'</div>';
  });
  html+='</div>';
  window._sortData=g;
  return html;
}
window._sortClick=function(el){
  if(STATE.checked) return;
  /* Cycle through categories on each click */
  var idx=parseInt(el.dataset.idx);
  var numCats=window._sortData.categories.length;
  var cur=_sortSel[idx];
  if(cur===undefined){
    /* Move to first category */
    _sortSel[idx]=0;
    el.dataset.cat='0';
    el.classList.add('sort-assigned');
    document.getElementById('sortDrop0').appendChild(el);
  } else {
    var next=cur+1;
    if(next>=numCats){
      /* Return to bank */
      delete _sortSel[idx];
      el.dataset.cat='';
      el.classList.remove('sort-assigned');
      document.getElementById('sortBank').appendChild(el);
    } else {
      _sortSel[idx]=next;
      el.dataset.cat=String(next);
      document.getElementById('sortDrop'+next).appendChild(el);
    }
  }
  /* Check if all items placed */
  var total=window._sortData.items.length;
  var placed=Object.keys(_sortSel).length;
  if(placed>=total){
    _setFooterVisible(true);
    setAction('Comprobar <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',true);
  }
};

/* ── Transform ───────────────────────────────────────────────── */
function buildTransform(g){
  _tfmSel={};
  _tfmItems=g.transforms.slice();
  /* Store shuffled opts and corrected correct index */
  _tfmItems=_tfmItems.map(function(t){
    var ansText=t.opts[t.correct];
    var opts=shuffle(t.opts.slice());
    return {original:t.original,task:t.task,opts:opts,correct:opts.indexOf(ansText)};
  });
  var html='<div class="q-sub" style="margin-bottom:14px">'+g.instr+'</div>';
  _tfmItems.forEach(function(t,i){
    html+='<div class="tfm-item" id="tfmItem'+i+'">'+
      '<div class="tfm-original">'+t.original+'</div>'+
      '<div class="tfm-task">'+t.task+'</div>'+
      '<div class="opts grid2">';
    t.opts.forEach(function(o,oi){
      html+='<div class="opt" data-ti="'+i+'" data-oi="'+oi+'" onclick="_tfmClick('+i+','+oi+')">'+
        '<div class="opt-txt">'+o+'</div>'+
        '<div class="opt-mark"><svg viewBox="0 0 24 24"></svg></div>'+
      '</div>';
    });
    html+='</div></div>';
  });
  return html;
}
window._tfmClick=function(ti,oi){
  if(STATE.checked) return;
  _tfmSel[ti]=oi;
  document.querySelectorAll('[data-ti="'+ti+'"].opt').forEach(function(el,j){
    el.classList.toggle('sel',j===oi);
  });
  var allSel=_tfmItems.every(function(_,i){return _tfmSel[i]!==undefined;});
  if(allSel) enableAction();
};

/* ── Dialogue ────────────────────────────────────────────────── */
function buildDialogue(g){
  _dlgSel={};_dlgBlanks=[];
  var html='<div class="q-sub" style="margin-bottom:14px">'+g.instr+'</div>'+
    '<div class="dlg-chat">';
  g.lines.forEach(function(line,li){
    var side=line.speaker===0?'left':'right';
    var name=g.speakers[line.speaker];
    if(!line.blank){
      html+='<div class="dlg-bubble dlg-'+side+'">'+
        '<div class="dlg-name">'+name+'</div>'+
        '<div class="dlg-text">'+line.text+'</div>'+
      '</div>';
    } else {
      _dlgBlanks.push({li:li,correct:line.correct,opts:line.opts,speaker:line.speaker});
      var bidx=_dlgBlanks.length-1;
      html+='<div class="dlg-bubble dlg-'+side+' dlg-blank" id="dlgBub'+li+'">'+
        '<div class="dlg-name">'+name+'</div>'+
        '<div class="dlg-text dlg-ph" id="dlgTxt'+li+'">…</div>'+
      '</div>'+
      '<div class="dlg-opts" id="dlgOpts'+li+'">';
      line.opts.forEach(function(o,oi){
        html+='<div class="dlg-opt" data-bi="'+bidx+'" data-oi="'+oi+'" onclick="_dlgClick('+bidx+','+oi+')">'+o+'</div>';
      });
      html+='</div>';
    }
  });
  html+='</div>';
  return html;
}
window._dlgClick=function(bi,oi){
  if(STATE.checked) return;
  var b=_dlgBlanks[bi];
  _dlgSel[bi]=oi;
  /* Highlight selected option */
  document.querySelectorAll('[data-bi="'+bi+'"].dlg-opt').forEach(function(el,j){
    el.classList.toggle('sel',j===oi);
  });
  /* Update bubble preview */
  var txt=document.getElementById('dlgTxt'+b.li);
  if(txt){txt.textContent=b.opts[oi];txt.classList.remove('dlg-ph');}
  /* Enable if all blanks filled */
  var allSel=_dlgBlanks.every(function(_,i){return _dlgSel[i]!==undefined;});
  if(allSel) enableAction();
};

/* ═══════════════════════════════════════════════════════════════
   VERIFY
   ═══════════════════════════════════════════════════════════════ */
function gmVerify(g){
  if(STATE.checked) return;
  g=g||_gameSeq[STATE.s
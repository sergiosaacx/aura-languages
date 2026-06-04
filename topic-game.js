/* ═══════════════════════════════════════════════════════════════
   topic-game.js — Motor de juego  |  Aura Languages
   Depende de: STATE, _gameSeq, shuffle, I, ISA (globals)
   ═══════════════════════════════════════════════════════════════ */

var MAX_LIVES=5;
var _TR_PAGE=3;

/* ── Variables de estado ─────────────────────────────────────── */
var _gameSeq=null;
var _mcSel=null,_mSel=null,_mDone=0,_efDone={};
var _mcCorrect=0,_orderSents=[],_fixSents=[],_scrWords=[],_trItems=[];
var _trSel={},_trPage=0,_tfSel={},_tfStmts=[];
var _listenItems=[],_listenSel={};
var _sortCats=[],_sortItems2=[],_sortPlaced={},_sortHeld=-1;
var _transformItems=[],_transformSel={};
var _dlgLines=[],_dlgSel={},_dlgBlankIdx=[];

/* ── enterTopic — punto de entrada desde la lista ────────────── */
function enterTopic(t){
  /* Calcular qué juego toca: (tarjetaId-1)*7 + juegosDone + 1 */
  var progData=_progMap[t.id];
  var gamesDone=progData?(progData.games_done||0):0;
  if(gamesDone>=7) gamesDone=0; /* tarjeta completa → replay desde el 1 */
  var juegoNum=(t.id-1)*7+gamesDone+1;

  STATE={view:'game',tarjeta:t,topic:t,juegoNum:null,step:0,score:0,lives:MAX_LIVES,correct:0,checked:false};
  _gameSeq=null;

  var vGame=document.getElementById('viewGame');
  var vList=document.getElementById('viewList');
  if(vList) vList.style.display='none';
  if(vGame){ vGame.style.display='flex'; }

  document.title=t.title+' — Aura Languages';

  var closeBtn=document.getElementById('hudClose');
  if(closeBtn) closeBtn.onclick=function(){renderList();};

  _setFooterVisible(false);
  _clearHud();

  var stage=document.getElementById('gameStage');
  stage.innerHTML='<div class="gm-loading">Cargando…</div>';

  _loadJuego(juegoNum,function(){
    var entry=_GAMES_REGISTRY[juegoNum];
    var acts=entry?(entry.actividades||entry):null;
    if(!acts||!acts.length){ _noGames(); return; }
    enterJuego(juegoNum,t);
  });
}

/* ── HUB de tarjeta ─────────────────────────────────────────── */
function showTarjetaHub(t){
  STATE.view='hub';
  var juegos=getJuegosForTarjeta(t.id);
  var progData=_progMap[t.id];
  var gamesDone=progData?(progData.games_done||0):0;
  var rc=RM[t.rank]||'#cd7f32';

  _setFooterVisible(false);
  _clearHud();

  var closeBtn=document.getElementById('hudClose');
  if(closeBtn) closeBtn.onclick=function(){renderList();};

  var totalXpTarjeta=0;
  juegos.forEach(function(j){
    if(j.data) j.data.forEach(function(a){totalXpTarjeta+=(a.xp||0);});
  });

  var html=
    '<div class="hub-wrap">'+
      '<div class="hub-header">'+
        '<div class="hub-pills">'+
          '<span class="gm-pill"><span class="pdot" style="background:'+rc+';color:'+rc+'"></span>'+t.rank+'</span>'+
          '<span class="gm-pill cefr" style="background:'+rc+'">'+t.cefr+'</span>'+
          '<span class="gm-pill">Tarjeta '+String(t.id).padStart(2,'0')+'</span>'+
        '</div>'+
        '<h1>'+_emTitle(t.title)+'</h1>'+
        '<div class="hub-sub">'+t.sub+'</div>'+
        '<div class="hub-meta">'+
          '<span>7 juegos</span><span class="hdot"></span>'+
          '<span class="hub-xp-total">+'+totalXpTarjeta+' XP total</span>'+
          '<span class="hdot"></span>'+
          '<span>'+gamesDone+'/7 completados</span>'+
        '</div>'+
      '</div>'+
      '<div class="hub-juegos">';

  juegos.forEach(function(j,i){
    var pos=i+1;
    var isDone=pos<=gamesDone;
    var isCurrent=pos===gamesDone+1;
    var isLocked=pos>gamesDone+1;
    var hasData=!!j.data;
    var canPlay=hasData&&!isLocked;

    var jXp=0;
    var chips='';
    if(j.data){
      j.data.forEach(function(a){jXp+=(a.xp||0);});
      j.data.slice(0,4).forEach(function(a){
        var ac=ACT_CHIPS[a.id]||{l:a.id,c:'#7a7a7a'};
        chips+='<span class="chip"><span class="cdot" style="background:'+ac.c+'"></span>'+ac.l+'</span>';
      });
      if(j.data.length>4) chips+='<span class="chip">+'+(j.data.length-4)+'</span>';
    } else {
      chips='<span class="chip" style="color:var(--muted-2)">Próximamente</span>';
    }

    var nodeIco=isDone?NODE_SVG.done:isCurrent?NODE_SVG.current:NODE_SVG.locked;
    var nodeCls=isDone?'hjn-done':isCurrent?'hjn-current':'hjn-locked';
    var rowCls='hub-juego'+(isDone?' hj-done':isCurrent?' hj-current':' hj-locked');

    html+=
      '<div class="'+rowCls+'"'+(canPlay?' onclick="enterJuego('+j.num+',STATE.tarjeta)"':'')+'>'+
        '<div class="hj-node '+nodeCls+'">'+nodeIco+'</div>'+
        '<div class="hj-body">'+
          '<div class="hj-num">Juego <b>'+pos+'</b><span class="hj-of">/7</span></div>'+
          '<div class="hj-chips">'+chips+'</div>'+
        '</div>'+
        '<div class="hj-right">'+
          (jXp?'<span class="hj-xp">+'+jXp+' XP</span>':'')+
          (isDone?'<span class="hj-badge done">Completado</span>':
           isCurrent?'<span class="hj-badge go">'+(gamesDone===0&&pos===1?'Empezar':'Continuar')+'</span>':
           hasData?'<span class="hj-badge locked">Bloqueado</span>':
           '<span class="hj-badge prox">Pronto</span>')+
          (canPlay?'<div class="hj-arrow"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></div>':'')+
        '</div>'+
      '</div>';
  });

  html+='</div></div>';

  var stage=document.getElementById('gameStage');
  stage.innerHTML=html;
  stage.scrollTop=0;
}

/* ── enterJuego — inicia un juego específico ─────────────────── */
function enterJuego(juegoNum,tarjeta){
  var entry=_GAMES_REGISTRY[juegoNum];
  if(!entry) return;
  var data=entry.actividades||entry;

  _mcSel=null;_mSel=null;_mDone=0;_efDone={};
  _mcCorrect=0;_orderSents=[];_fixSents=[];_scrWords=[];_trItems=[];
  _trSel={};_trPage=0;_tfSel={};_tfStmts=[];
  _listenItems=[];_listenSel={};
  _sortCats=[];_sortItems2=[];_sortPlaced={};_sortHeld=-1;
  _transformItems=[];_transformSel={};
  _dlgLines=[];_dlgSel={};_dlgBlankIdx=[];

  STATE.view='game';
  STATE.juegoNum=juegoNum;
  STATE.tarjeta=tarjeta;
  STATE.topic=tarjeta;
  STATE.step=0;STATE.score=0;STATE.lives=MAX_LIVES;STATE.correct=0;STATE.checked=false;

  _gameSeq=shuffle((data||[]).slice());

  var closeBtn=document.getElementById('hudClose');
  if(closeBtn) closeBtn.onclick=function(){showTarjetaHub(STATE.tarjeta);};

  var actionBtn=document.getElementById('gameActionBtn');
  if(actionBtn) actionBtn.onclick=onAction;

  showStart();
}

/* ── HUD ─────────────────────────────────────────────────────── */
var _heartSvg='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2 5 5.3 5c2 0 3.4 1.2 4.2 2.4C10.3 6.2 11.7 5 13.7 5 17 5 18.6 8.4 17 11.7 14.5 16.4 12 21 12 21z"/></svg>';

function _clearHud(){
  var hudProg=document.getElementById('hudProg');
  var hudLives=document.getElementById('hudLives');
  var hudXp=document.getElementById('hudXpVal');
  if(hudProg) hudProg.innerHTML='';
  if(hudLives) hudLives.innerHTML='';
  if(hudXp) hudXp.textContent='';
}

function renderHud(){
  if(!_gameSeq) return;
  var total=_gameSeq.length;
  var segs='';
  for(var i=0;i<total;i++){
    var cls=i<STATE.step?'done':i===STATE.step?'active':'';
    segs+='<div class="seg '+cls+'"><i></i></div>';
  }
  var hudProg=document.getElementById('hudProg');
  if(hudProg) hudProg.innerHTML=segs;

  var h='';
  for(var j=0;j<MAX_LIVES;j++){
    h+='<span class="heart '+(j>=STATE.lives?'lost':'')+'">'+_heartSvg+'</span>';
  }
  var hudLives=document.getElementById('hudLives');
  if(hudLives) hudLives.innerHTML=h;

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
  var t=STATE.tarjeta;
  var games=_gameSeq;
  var total=games?games.length:7;
  var totalXp=games?games.reduce(function(s,g){return s+g.xp;},0):0;
  var rc=RM[t.rank]||'#cd7f32';
  var juegoPos=STATE.juegoNum?((STATE.juegoNum-1)%7)+1:1;

  renderHud();
  _setFooterVisible(false);

  var stage=document.getElementById('gameStage');
  stage.innerHTML=
    '<div class="gm-start">'+
      '<div class="gm-start-pills">'+
        '<span class="gm-pill"><span class="pdot" style="background:'+rc+';color:'+rc+'"></span>'+t.rank+'</span>'+
        '<span class="gm-pill cefr" style="background:'+rc+'">'+t.cefr+'</span>'+
        '<span class="gm-pill">Tarjeta '+String(t.id).padStart(2,'0')+' · Juego '+juegoPos+'/7</span>'+
      '</div>'+
      '<div class="gm-glyph"><svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>'+
      '<h1>'+(_emTitle(getJuegoTitle(STATE.juegoNum)||t.title))+'</h1>'+
      '<div class="sub">'+t.sub+'</div>'+
      '<div class="gm-start-stats">'+
        '<div class="gm-start-stat"><div class="v">'+total+'</div><div class="l">Actividades</div></div>'+
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
  var last=parts.pop();
  return parts.join('\n')+' <em>'+last+'</em>';
}

/* ── Load a step ─────────────────────────────────────────────── */
function loadStep(){
  if(!_gameSeq){ _noGames(); return; }
  if(STATE.step>=_gameSeq.length){ showResult(); return; }
  STATE.checked=false;
  _mcSel=null;_mSel=null;_mDone=0;_efDone={};
  _trSel={};_trPage=0;
  _listenSel={};
  _sortPlaced={};_sortHeld=-1;
  _transformSel={};
  _dlgSel={};

  var g=_gameSeq[STATE.step];
  renderHud();
  _resetFooter();

  var inner='';
  if(g.id==='mc')          inner=buildMC(g);
  else if(g.id==='match')      inner=buildMatch(g);
  else if(g.id==='fill')       inner=buildFill(g);
  else if(g.id==='order')      inner=buildOrder(g);
  else if(g.id==='fix')        inner=buildFix(g);
  else if(g.id==='translate')  inner=buildTranslate(g);
  else if(g.id==='scramble')   inner=buildScramble(g);
  else if(g.id==='truefalse')  inner=buildTrueFalse(g);
  else if(g.id==='listen')     inner=buildListen(g);
  else if(g.id==='sort')       inner=buildSort(g);
  else if(g.id==='transform')  inner=buildTransform(g);
  else if(g.id==='dialogue')   inner=buildDialogue(g);
  else inner='<p style="color:var(--muted)">Tipo: '+g.id+'</p>';

  var qTagIcon=_ICONS[g.id]||_ICONS.mc;
  var stage=document.getElementById('gameStage');
  stage.scrollTop=0;
  stage.innerHTML=
    '<div class="panel">'+
      '<div class="q-tag">'+
        '<svg viewBox="0 0 24 24">'+qTagIcon+'</svg>'+
        'Actividad '+(STATE.step+1)+' de '+_gameSeq.length+' · '+g.label+
      '</div>'+
      inner+
    '</div>';

  if(g.id==='match'){
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
      '<button class="gm-btn-ghost" style="margin-top:20px" onclick="showTarjetaHub(STATE.tarjeta)">← Volver</button>'+
    '</div>';
  _setFooterVisible(false);
}

/* ── Icon map (12 tipos) ─────────────────────────────────────── */
var _ICONS={
  mc:        '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
  match:     '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  fill:      '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>',
  order:     '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="9" y2="18"/>',
  fix:       '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  translate: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
  scramble:  '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
  truefalse: '<polyline points="20 6 9 17 4 12"/>',
  listen:    '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
  sort:      '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  transform: '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>',
  dialogue:  '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
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
    STATE.score+=xpGain;STATE.correct++;
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

/* ── Guardar progreso ────────────────────────────────────────── */
function _saveTopicProgress(gamesDone,completed){
  try{
    var sb=window._aura&&window._aura.sb;
    var userId=window._aura&&window._aura.userId;
    var lang=(localStorage.getItem('aura_lang')||'en');
    if(!sb||!userId) return;
    sb.from('topic_progress').upsert({
      user_id:userId,
      topic_id:STATE.tarjeta.id,
      language:lang,
      games_done:gamesDone,
      completed:completed,
      last_played:new Date().toISOString()
    },{onConflict:'user_id,topic_id,language'}).then(function(){});
  }catch(e){}
}

/* ── onAction ────────────────────────────────────────────────── */
function onAction(){
  if(!_gameSeq) return;
  var g=_gameSeq[STATE.step];
  if(!STATE.checked){ gmVerify(g); return; }
  if(STATE.lives<=0){ showResult(); return; }
  STATE.step++;
  var juegoPos=STATE.juegoNum?((STATE.juegoNum-1)%7)+1:1;
  if(STATE.step>=_gameSeq.length){
    _saveTopicProgress(juegoPos,juegoPos>=7);
    showResult();
  } else {
    loadStep();
  }
}

/* ═══════════════════════════════════════════════════════════════
   BUILD FUNCTIONS — tipos existentes
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
  blank.textContent=wordEl.dataset.w;blank.dataset.filled='1';
  blank.classList.remove('empty');blank.classList.add('filled');
  wordEl.classList.add('spent');
  var allFilled=true;
  document.querySelectorAll('#gameStage .blank').forEach(function(b){if(b.dataset.filled!=='1') allFilled=false;});
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
  if(bank){ var wd=bank.querySelector('.tok[data-w="'+w+'"]'); if(wd) wd.classList.remove('spent'); }
};

/* ── Order ───────────────────────────────────────────────────── */
function buildOrder(g){
  _orderSents=shuffle(g.sents.slice());
  var html='<div class="q-sub" style="margin-bottom:18px">'+g.instr+'</div>';
  _orderSents.forEach(function(s,i){
    html+='<div class="order-sent">'+
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
    dest.appendChild(t);dest.classList.add('has-words');
  } else {
    dest=document.getElementById('woB'+gi);
    var t2=document.createElement('div');
    t2.className='tok';t2.dataset.w=w;t2.textContent=w;
    t2.setAttribute('onclick','_woClick(this,'+gi+',\'b\')');
    dest.appendChild(t2);
    var az=document.getElementById('woA'+gi);
    if(az&&!az.querySelector('.tok')) az.classList.remove('has-words');
  }
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
    var allDone=_fixSents.every(function(_,i){return _efDone[i];});
    if(allDone) enableAction();
  } else {
    btn.style.animation='none';
    requestAnimationFrame(function(){btn.style.animation='ef-shake .36s ease';});
  }
};

/* ── Translate ───────────────────────────────────────────────── */
function buildTranslate(g){
  _trSel={};_trItems=shuffle(g.items.slice());
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
  document.querySelectorAll('[data-i="'+i+'"].tr-opt').forEach(function(el,idx){el.classList.toggle('selected',idx===oi);});
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
  tile.className='scr-tile placed';tile.textContent=btn.textContent;tile.dataset.li=li;
  tile.onclick=function(){_scrRemove(wi,li,this);};
  ans.appendChild(tile);btn.style.visibility='hidden';btn.disabled=true;
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
  _tfStmts=g.stmts.slice();_tfSel={};
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

/* ═══════════════════════════════════════════════════════════════
   BUILD FUNCTIONS — 4 tipos nuevos
   ═══════════════════════════════════════════════════════════════ */

/* ── Listen ──────────────────────────────────────────────────── */
function buildListen(g){
  /* Barajar ítems Y opciones dentro de cada ítem */
  _listenItems=shuffle(g.items.slice()).map(function(it){
    var ans=it.opts[it.correct];
    var shuffled=shuffle(it.opts.slice());
    return {tts:it.tts,type:it.type,opts:shuffled,correct:shuffled.indexOf(ans)};
  });
  _listenSel={};
  var html='<div class="q-sub" style="margin-bottom:18px">'+g.instr+'</div>';
  _listenItems.forEach(function(it,i){
    html+='<div class="li-group" id="liGroup'+i+'">'+
      '<button class="li-play-btn" onclick="_listenPlay('+i+')">'+
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>'+
        'Escuchar'+
      '</button>'+
      '<div class="li-opts">'+
        it.opts.map(function(o,oi){
          return '<button class="li-opt" data-li="'+i+'" data-oi="'+oi+'" onclick="_liClick('+i+','+oi+')">'+o+'</button>';
        }).join('')+
      '</div>'+
    '</div>';
  });
  return html;
}
window._listenPlay=function(i){
  var it=_listenItems[i];
  if(!it||!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  var utt=new SpeechSynthesisUtterance(it.tts);
  utt.lang='en-US';utt.rate=0.85;utt.pitch=1;
  window.speechSynthesis.speak(utt);
  var btn=document.querySelector('#liGroup'+i+' .li-play-btn');
  if(btn){btn.classList.add('playing');setTimeout(function(){btn.classList.remove('playing');},2500);}
};
window._liClick=function(li,oi){
  if(STATE.checked) return;
  _listenSel[li]=oi;
  document.querySelectorAll('[data-li="'+li+'"].li-opt').forEach(function(el,idx){el.classList.toggle('selected',idx===oi);});
  var allSel=_listenItems.every(function(_,i){return _listenSel[i]!==undefined;});
  if(allSel) enableAction();
};

/* ── Sort ────────────────────────────────────────────────────── */
function buildSort(g){
  _sortCats=g.categories.slice();
  _sortItems2=shuffle(g.items.slice());
  _sortPlaced={};_sortHeld=-1;
  var html='<div class="q-sub" style="margin-bottom:14px">'+g.instr+'</div>'+
    '<div class="sort-zones">';
  _sortCats.forEach(function(cat,ci){
    html+='<div class="sort-zone" id="sortZone'+ci+'" onclick="_sortDrop('+ci+')">'+
      '<div class="sort-zone-label">'+cat+'</div>'+
      '<div class="sort-zone-items" id="sortZoneItems'+ci+'"></div>'+
    '</div>';
  });
  html+='</div>'+
    '<div class="sort-bank" id="sortBank">';
  _sortItems2.forEach(function(it,i){
    html+='<div class="sort-token" id="sortTok'+i+'" onclick="_sortGrab('+i+')">'+it.text+'</div>';
  });
  html+='</div>';
  return html;
}
window._sortGrab=function(si){
  if(STATE.checked) return;
  // If already placed, return to bank
  if(_sortPlaced.hasOwnProperty(si)){
    var oldCi=_sortPlaced[si];
    delete _sortPlaced[si];
    var oldZone=document.getElementById('sortZoneItems'+oldCi);
    if(oldZone){var t=oldZone.querySelector('[data-si="'+si+'"]');if(t) t.remove();}
    var bank=document.getElementById('sortBank');
    if(bank){
      var tok=document.createElement('div');
      tok.className='sort-token';tok.id='sortTok'+si;tok.textContent=_sortItems2[si].text;
      tok.setAttribute('onclick','_sortGrab('+si+')');
      bank.appendChild(tok);
    }
    _sortHeld=-1;
    document.querySelectorAll('.sort-token').forEach(function(el){el.classList.remove('held');});
    return;
  }
  // Select token
  _sortHeld=si;
  document.querySelectorAll('.sort-token').forEach(function(el){el.classList.remove('held');});
  var tok=document.getElementById('sortTok'+si);
  if(tok) tok.classList.add('held');
  document.querySelectorAll('.sort-zone').forEach(function(el){el.classList.add('accepting');});
};
window._sortDrop=function(ci){
  if(STATE.checked||_sortHeld===-1) return;
  var si=_sortHeld;
  _sortPlaced[si]=ci;
  // Remove from bank
  var tok=document.getElementById('sortTok'+si);
  if(tok) tok.remove();
  // Add to zone
  var zone=document.getElementById('sortZoneItems'+ci);
  if(zone){
    var el=document.createElement('div');
    el.className='sort-token sort-placed';el.dataset.si=si;el.textContent=_sortItems2[si].text;
    el.setAttribute('onclick','_sortGrab('+si+')');
    zone.appendChild(el);
  }
  _sortHeld=-1;
  document.querySelectorAll('.sort-zone').forEach(function(el){el.classList.remove('accepting');});
  // Enable if all placed
  if(Object.keys(_sortPlaced).length>=_sortItems2.length) enableAction();
};

/* ── Transform ───────────────────────────────────────────────── */
function buildTransform(g){
  _transformItems=shuffle(g.transforms.slice());_transformSel={};
  var html='<div class="q-sub" style="margin-bottom:18px">'+g.instr+'</div>';
  _transformItems.forEach(function(tr,i){
    html+='<div class="tfm-group">'+
      '<div class="tfm-original">'+tr.original+'</div>'+
      '<div class="tfm-task">'+tr.task+'</div>'+
      '<div class="tfm-opts">'+
        tr.opts.map(function(o,oi){
          return '<button class="tr-opt" data-ti="'+i+'" data-oi="'+oi+'" onclick="_tfmClick('+i+','+oi+')">'+o+'</button>';
        }).join('')+
      '</div>'+
    '</div>';
  });
  return html;
}
window._tfmClick=function(ti,oi){
  if(STATE.checked) return;
  _transformSel[ti]=oi;
  document.querySelectorAll('[data-ti="'+ti+'"].tr-opt').forEach(function(el,idx){el.classList.toggle('selected',idx===oi);});
  var allSel=_transformItems.every(function(_,i){return _transformSel[i]!==undefined;});
  if(allSel) enableAction();
};

/* ── Dialogue ────────────────────────────────────────────────── */
function buildDialogue(g){
  _dlgLines=g.lines.slice();_dlgSel={};
  _dlgBlankIdx=[];
  _dlgLines.forEach(function(l,li){if(l.blank) _dlgBlankIdx.push(li);});
  var speakers=g.speakers||['A','B'];
  var html='<div class="q-sub" style="margin-bottom:14px">'+g.instr+'</div>'+
    '<div class="dlg-wrap">';
  _dlgLines.forEach(function(line,li){
    var si=typeof line.speaker==='number'?line.speaker:0;
    var isRight=si===1;
    if(line.blank){
      html+='<div class="dlg-line dlg-blank'+(isRight?' dlg-right':'')+'" id="dlgLine'+li+'">'+
        '<div class="dlg-speaker">'+speakers[si]+'</div>'+
        '<div class="dlg-opts">'+
          line.opts.map(function(o,oi){
            return '<button class="dlg-opt" data-dli="'+li+'" data-oi="'+oi+'" onclick="_dlgClick('+li+','+oi+')">'+o+'</button>';
          }).join('')+
        '</div>'+
      '</div>';
    } else {
      html+='<div class="dlg-line'+(isRight?' dlg-right':'')+'">'+
        '<div class="dlg-speaker">'+speakers[si]+'</div>'+
        '<div class="dlg-bubble">'+line.text+'</div>'+
      '</div>';
    }
  });
  html+='</div>';
  return html;
}
window._dlgClick=function(li,oi){
  if(STATE.checked) return;
  _dlgSel[li]=oi;
  document.querySelectorAll('[data-dli="'+li+'"].dlg-opt').forEach(function(el,idx){el.classList.toggle('selected',idx===oi);});
  var allFilled=_dlgBlankIdx.every(function(i){return _dlgSel[i]!==undefined;});
  if(allFilled) enableAction();
};

/* ═══════════════════════════════════════════════════════════════
   VERIFY — todos los tipos
   ═══════════════════════════════════════════════════════════════ */
function gmVerify(g){
  if(STATE.checked) return;
  g=g||_gameSeq[STATE.step];

  if(g.id==='mc'){
    if(_mcSel===null) return;
    var ok=_mcSel===_mcCorrect;
    document.querySelectorAll('#gameStage .opt').forEach(function(el,i){
      el.classList.add('locked');
      if(i===_mcCorrect){el.classList.add('correct');el.querySelector('.opt-mark svg').innerHTML='<polyline points="20 6 9 17 4 12"/>';}
      else if(i===_mcSel&&!ok){el.classList.add('wrong');el.querySelector('.opt-mark svg').innerHTML='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';}
    });
    reveal(ok,g.xp,ok?'':'La respuesta correcta era: <b>'+g.opts[g.correct]+'</b>');

  } else if(g.id==='fill'){
    var allFilled2=true;
    document.querySelectorAll('#gameStage .blank').forEach(function(b){if(b.dataset.filled!=='1') allFilled2=false;});
    if(!allFilled2) return;
    var cor=0,tot=0;
    document.querySelectorAll('#gameStage .blank').forEach(function(b){
      tot++;if(b.textContent===b.dataset.ans){b.classList.add('ok');cor++;}else b.classList.add('bad');
    });
    reveal(cor===tot,g.xp,cor===tot?'¡Todos correctos!':cor+' de '+tot+' correctos.');

  } else if(g.id==='order'){
    var allOk=true;
    _orderSents.forEach(function(s,si){
      var az=document.getElementById('woA'+si);if(!az) return;
      var got=Array.from(az.querySelectorAll('.tok')).map(function(t){return t.textContent;});
      var ok2=got.join(' ')===s.ans.join(' ');
      if(!ok2) allOk=false;
      az.querySelectorAll('.tok').forEach(function(t){t.classList.add(ok2?'ok':'bad');});
    });
    reveal(allOk,g.xp,allOk?'¡Orden perfecto!':'Alguna oración no está en el orden correcto.');

  } else if(g.id==='fix'){
    var allDone2=_fixSents.every(function(_,i){return _efDone[i];});
    if(!allDone2) return;
    reveal(true,g.xp,'¡Todos los errores corregidos!');

  } else if(g.id==='translate'){
    var start2=_trPage*_TR_PAGE;
    var pageItems=_trItems.slice(start2,start2+_TR_PAGE);
    if(Object.keys(_trSel).length<start2+pageItems.length) return;
    var cor2=0;
    pageItems.forEach(function(it,i){
      var gi=start2+i;var sel=_trSel[gi];
      document.querySelectorAll('[data-i="'+gi+'"].tr-opt').forEach(function(el,oi){
        if(oi===it.correct) el.classList.add('correct');
        else if(oi===sel&&sel!==it.correct) el.classList.add('wrong');
      });
      if(sel===it.correct) cor2++;
    });
    var hasMore=(start2+_TR_PAGE)<_trItems.length;
    if(cor2===pageItems.length&&hasMore){
      STATE.checked=true;
      var f=document.getElementById('gameFooter');
      if(f) f.className='gm-footer correct';
      var fbTitle=document.getElementById('gameFbTitle');var fb=document.getElementById('gameFeedback');
      if(fbTitle) fbTitle.textContent='¡Correcto! Siguiente grupo →';
      if(fb) fb.style.display='flex';
      setAction('Siguiente grupo <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>',true);
      var btn=document.getElementById('gameActionBtn');
      if(btn) btn.onclick=function(){
        _trPage++;STATE.checked=false;
        var innerEl=document.querySelector('#gameStage .panel');
        if(innerEl){var qTag=innerEl.querySelector('.q-tag');innerEl.innerHTML=(qTag?qTag.outerHTML:'')+_renderTrPage(g);}
        _resetFooter();
        setAction('Comprobar <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',false);
        btn.onclick=onAction;
      };
    } else {
      reveal(cor2===pageItems.length,g.xp,cor2===pageItems.length?'¡Perfecto!':cor2+' de '+pageItems.length+' correctos.');
    }

  } else if(g.id==='truefalse'){
    if(Object.keys(_tfSel).length<_tfStmts.length) return;
    var tfCor=0;
    _tfStmts.forEach(function(s,i){
      var sel2=_tfSel[i];var ok3=(sel2===s.ans);if(ok3) tfCor++;
      var item=document.getElementById('tfItem'+i);if(item) item.classList.add(ok3?'tf-ok':'tf-bad');
      document.querySelectorAll('[data-i="'+i+'"].tf-btn').forEach(function(btn){
        var isV=btn.classList.contains('tf-v');
        if(isV===s.ans) btn.classList.add('correct');else if(sel2!==s.ans) btn.classList.add('wrong');
      });
      var expl=document.getElementById('tfExpl'+i);
      if(expl){expl.textContent=s.expl;expl.style.display='block';}
    });
    reveal(tfCor===_tfStmts.length,g.xp,tfCor===_tfStmts.length?'¡Perfecto!':tfCor+' de '+_tfStmts.length+' correctos.');

  } else if(g.id==='scramble'){
    var allScr=_scrWords.every(function(_,i){
      var a=document.getElementById('scrAns'+i);return a&&a.querySelectorAll('.scr-tile').length>0;
    });
    if(!allScr) return;
    var allScrOk=true;
    _scrWords.forEach(function(w,i){
      var placed=Array.from(document.querySelectorAll('#scrAns'+i+' .scr-tile')).map(function(t){return t.textContent;});
      var ok4=placed.join('')===w.ans;if(!ok4) allScrOk=false;
      document.querySelectorAll('#scrAns'+i+' .scr-tile').forEach(function(t){t.classList.add(ok4?'ok':'bad');});
    });
    reveal(allScrOk,g.xp,allScrOk?'¡Perfecto!':'Alguna palabra no es correcta.');

  } else if(g.id==='listen'){
    if(Object.keys(_listenSel).length<_listenItems.length) return;
    var liCor=0;
    _listenItems.forEach(function(it,i){
      var sel=_listenSel[i];
      document.querySelectorAll('[data-li="'+i+'"].li-opt').forEach(function(el,oi){
        if(oi===it.correct) el.classList.add('correct');
        else if(oi===sel&&sel!==it.correct) el.classList.add('wrong');
      });
      if(sel===it.correct) liCor++;
    });
    reveal(liCor===_listenItems.length,g.xp,liCor===_listenItems.length?'¡Perfecto!':liCor+' de '+_listenItems.length+' correctos.');

  } else if(g.id==='sort'){
    if(Object.keys(_sortPlaced).length<_sortItems2.length) return;
    var sortCor=0;
    _sortItems2.forEach(function(it,i){
      var placed=_sortPlaced[i];var ok5=(placed===it.correct);if(ok5) sortCor++;
      var el=document.querySelector('[data-si="'+i+'"].sort-placed');
      if(el) el.classList.add(ok5?'sort-ok':'sort-bad');
    });
    reveal(sortCor===_sortItems2.length,g.xp,sortCor===_sortItems2.length?'¡Clasificación perfecta!':sortCor+' de '+_sortItems2.length+' correctos.');

  } else if(g.id==='transform'){
    if(Object.keys(_transformSel).length<_transformItems.length) return;
    var tfmCor=0;
    _transformItems.forEach(function(tr,i){
      var sel=_transformSel[i];
      document.querySelectorAll('[data-ti="'+i+'"].tr-opt').forEach(function(el,oi){
        if(oi===tr.correct) el.classList.add('correct');
        else if(oi===sel&&sel!==tr.correct) el.classList.add('wrong');
      });
      if(sel===tr.correct) tfmCor++;
    });
    reveal(tfmCor===_transformItems.length,g.xp,tfmCor===_transformItems.length?'¡Transformaciones correctas!':tfmCor+' de '+_transformItems.length+' correctos.');

  } else if(g.id==='dialogue'){
    if(_dlgBlankIdx.some(function(li){return _dlgSel[li]===undefined;})) return;
    var dlgCor=0;
    _dlgBlankIdx.forEach(function(li){
      var line=_dlgLines[li];var sel=_dlgSel[li];var ok6=(sel===line.correct);if(ok6) dlgCor++;
      document.querySelectorAll('[data-dli="'+li+'"].dlg-opt').forEach(function(el,oi){
        if(oi===line.correct) el.classList.add('correct');
        else if(oi===sel&&sel!==line.correct) el.classList.add('wrong');
      });
    });
    reveal(dlgCor===_dlgBlankIdx.length,g.xp,dlgCor===_dlgBlankIdx.length?'¡Diálogo completado!':dlgCor+' de '+_dlgBlankIdx.length+' correctos.');
  }
}

/* ═══════════════════════════════════════════════════════════════
   RESULT SCREEN
   ═══════════════════════════════════════════════════════════════ */
function showResult(){
  var games=_gameSeq||[];
  var maxXp=games.reduce(function(s,g){return s+g.xp;},0);
  var acc=games.length>0?Math.round((STATE.correct/games.length)*100):0;
  var passed=STATE.lives>0&&acc>=60;
  var mins=Math.max(1,Math.round(games.length*0.8));
  var juegoPos=STATE.juegoNum?((STATE.juegoNum-1)%7)+1:1;
  var hasNextJuego=juegoPos<7&&STATE.juegoNum&&_GAMES_REGISTRY[STATE.juegoNum+1];

  /* ── Calificación — igual que ShadowLab ─────────────────────
     XP  = STATE.score (acumulado por actividad)
     AP  = round(acc/100 × 50)   → máx 50 AuraPoints
     PM  = round(floor(acc/20) × diff)  → mín 30% de precisión
     diff: Bronce=0.7 · Plata=1.0 · Oro/Platino=1.5 · Diamante/Challenger=2.0 */
  var _diffMult={Bronce:0.7,Plata:1.0,Oro:1.5,Platino:1.5,Diamante:2.0,Challenger:2.0};
  var xp=STATE.score;
  var ap=Math.round(acc/100*50);
  var diff=_diffMult[STATE.tarjeta.rank]||1.0;
  var pm=acc>=30?Math.round(Math.floor(acc/20)*diff):0;

  (function(){
    try{
      var A=window.AuraXP;if(!A) return;
      var p=[];
      if(xp>0) p.push(A.addXP(xp));
      if(ap>0) p.push(A.addAP(ap));
      if(pm>0) p.push(A.addPM(pm));
      p.push(A.logSession({tool:'topic',skill:STATE.tarjeta.cat,xp:xp,ap:ap,pm:pm,accuracy:acc,thumbnail:'assets/home/tool-topic.jpg'}));
      Promise.all(p).catch(function(e){console.warn('[Topic] scoring',e);});
    }catch(e){console.warn('[Topic] scoring',e);}
  })();

  renderHud();_setFooterVisible(false);

  var stage=document.getElementById('gameStage');
  stage.innerHTML=
    '<div class="gm-result">'+
      '<div class="gm-medal">'+
        (passed
          ?'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/></svg>'
          :'<svg viewBox="0 0 24 24"><path d="M12 9v4"/><path d="M12 17h.01"/><circle cx="12" cy="12" r="10"/></svg>')+
      '</div>'+
      '<div class="eyebrow">'+(passed?'Juego completado':'Sigue practicando')+'</div>'+
      '<h1>'+(passed?'¡Bien <em>hecho!</em>':'Casi lo <em>logras</em>')+'</h1>'+
      '<div class="gm-result-cards">'+
        '<div class="rcard xp"><div class="ic"><svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" stroke="none"/></svg></div><div class="v">+'+STATE.score+'</div><div class="l">XP ganado</div></div>'+
        '<div class="rcard acc"><div class="ic"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="v">'+acc+'%</div><div class="l">Precisión</div></div>'+
        '<div class="rcard time"><div class="ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><div class="v">~'+mins+'m</div><div class="l">Duración</div></div>'+
      '</div>'+
      '<div class="gm-result-actions">'+
        (hasNextJuego
          ?'<button class="gm-btn gm-btn-accent" onclick="enterJuego('+(STATE.juegoNum+1)+',STATE.tarjeta)">Siguiente juego <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></button>'
          :'')+
        '<button class="gm-btn-ghost" onclick="showTarjetaHub(STATE.tarjeta)">← Volver a la tarjeta</button>'+
        '<button class="gm-btn-ghost" onclick="renderList()">Ver todas las tarjetas</button>'+
      '</div>'+
    '</div>';
}

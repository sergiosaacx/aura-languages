// popup-gover.js v2 - MoviesLab result popups
// Globals used: karaoState, errorCount, totalScore, player, isPlaying,
//               currentVideoId, currentStart, updatePPIcon, loadAndInitKaraoke,
//               AuraXP, window._aura, MOVIES

(function(){

  function _injectCSS(){
    if(document.getElementById('pg2css'))return;
    var s=document.createElement('style');s.id='pg2css';
    s.textContent=
      '#p2ov{position:fixed;inset:0;z-index:9000;display:none;'+
      'align-items:center;justify-content:center;'+
      'padding:24px;overflow-y:auto;'+
      'background:rgba(5,5,5,.92);'+
      'backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);}'+
      '#p2ov.p2on{display:flex;}'+
      '.pg2{font-family:"Plus Jakarta Sans",-apple-system,sans-serif;font-size:14px;color:#f5f5f5;'+
      'width:min(720px,100%);margin:auto;position:relative;background:#171717;'+
      'border:1px solid #262626;border-radius:24px;padding:24px;'+
      'box-shadow:0 30px 90px rgba(0,0,0,.75),0 0 0 1px rgba(255,255,255,.02);'+
      'animation:pg2In .3s cubic-bezier(.22,1,.36,1) both;}'+
      '@keyframes pg2In{from{opacity:0;transform:translateY(18px) scale(.97);}to{opacity:1;transform:none;}}'+
      '.pg2-close{position:absolute;top:18px;right:18px;width:34px;height:34px;border-radius:50%;'+
      'background:rgba(255,255,255,.04);color:#7a7a7a;border:none;cursor:pointer;'+
      'display:flex;align-items:center;justify-content:center;transition:all .15s;}'+
      '.pg2-close:hover{background:rgba(255,255,255,.08);color:#f5f5f5;}'+
      '.pg2-close svg{width:14px;height:14px;}'+
      '.pg2-pts{position:absolute;inset:0;overflow:hidden;pointer-events:none;}'+
      '.pg2-pt{position:absolute;width:5px;height:5px;border-radius:50%;'+
      'animation:pg2fall 7s linear infinite;}'+
      '@keyframes pg2fall{0%{transform:translateY(-20px);opacity:0;}'+
      '10%{opacity:.8;}90%{opacity:.7;}100%{transform:translateY(110vh);opacity:0;}}'+
      '.pg2-hero{text-align:center;padding:6px 0 18px;display:flex;flex-direction:column;'+
      'align-items:center;gap:6px;}'+
      '.pg2-kicker{font-family:"JetBrains Mono",monospace;font-size:10px;font-weight:700;'+
      'letter-spacing:.28em;text-transform:uppercase;display:flex;align-items:center;gap:8px;}'+
      '.pg2-kicker.win{color:#c4ff3d;}.pg2-kicker.loss{color:#ff6464;}'+
      '.pg2-kicker::before,.pg2-kicker::after{content:"";width:24px;height:1px;}'+
      '.pg2-kicker.win::before{background:linear-gradient(90deg,transparent,#c4ff3d);}'+
      '.pg2-kicker.win::after{background:linear-gradient(90deg,#c4ff3d,transparent);}'+
      '.pg2-kicker.loss::before{background:linear-gradient(90deg,transparent,#ff6464);}'+
      '.pg2-kicker.loss::after{background:linear-gradient(90deg,#ff6464,transparent);}'+
      '.pg2-title{font-size:26px;font-weight:800;letter-spacing:-.02em;line-height:1.1;}'+
      '.pg2-title em{font-style:normal;}'+
      '.pg2-title.win em{color:#c4ff3d;}.pg2-title.loss em{color:#ff6464;}'+
      '.pg2-song{font-family:"JetBrains Mono",monospace;font-size:11px;color:#7a7a7a;'+
      'display:flex;align-items:center;gap:8px;margin-top:2px;}'+
      '.pg2-song b{color:#c8c8c8;font-weight:700;}'+
      '.pg2-dot{width:3px;height:3px;border-radius:50%;background:#333;}'+
      '.pg2-score{margin:14px 0 18px;background:#0a0a0a;border:1px solid #262626;'+
      'border-radius:20px;padding:18px 22px;display:grid;grid-template-columns:1fr auto 1fr;'+
      'gap:14px;align-items:center;position:relative;overflow:hidden;}'+
      '.pg2-score::before{content:"";position:absolute;inset:0;pointer-events:none;}'+
      '.pg2-score.win::before{background:radial-gradient(400px 200px at 50% 100%,rgba(196,255,61,.12),transparent 70%);}'+
      '.pg2-score.loss::before{background:radial-gradient(400px 200px at 50% 100%,rgba(255,100,100,.1),transparent 70%);}'+
      '.pg2-side{display:flex;flex-direction:column;gap:4px;position:relative;z-index:1;}'+
      '.pg2-side.right{align-items:flex-end;text-align:right;}'+
      '.pg2-side .lbl{font-family:"JetBrains Mono",monospace;font-size:9.5px;font-weight:700;'+
      'color:#7a7a7a;letter-spacing:.18em;text-transform:uppercase;}'+
      '.pg2-side .val{font-size:18px;font-weight:800;letter-spacing:-.01em;'+
      'display:flex;align-items:baseline;gap:6px;}'+
      '.pg2-side .val small{font-size:11px;color:#7a7a7a;font-family:"JetBrains Mono",monospace;font-weight:500;}'+
      '.pg2-center{display:flex;flex-direction:column;align-items:center;gap:4px;'+
      'position:relative;z-index:1;padding:0 20px;}'+
      '.pg2-center .lbl{font-family:"JetBrains Mono",monospace;font-size:10px;font-weight:700;'+
      'letter-spacing:.22em;text-transform:uppercase;}'+
      '.pg2-center.win .lbl{color:#c4ff3d;}.pg2-center.loss .lbl{color:#ff6464;}'+
      '.pg2-center .big{font-size:72px;font-weight:900;line-height:1;'+
      'letter-spacing:-.04em;font-feature-settings:"tnum";}'+
      '.pg2-center.win .big{color:#c4ff3d;text-shadow:0 0 30px rgba(196,255,61,.6);}'+
      '.pg2-center.loss .big{color:#ff6464;text-shadow:0 0 30px rgba(255,100,100,.45);}'+
      '.pg2-center .delta{font-family:"JetBrains Mono",monospace;font-size:11px;'+
      'font-weight:700;display:flex;align-items:center;gap:4px;}'+
      '.pg2-center.win .delta{color:#c4ff3d;}.pg2-center.loss .delta{color:#ff6464;}'+
      '.pg2-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:14px;}'+
      '.pg2-stat{background:#0e0e0e;border:1px solid #262626;border-radius:14px;'+
      'padding:14px;display:flex;flex-direction:column;gap:6px;position:relative;overflow:hidden;}'+
      '.pg2-stat::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;'+
      'background:var(--sc,#c4ff3d);opacity:.7;}'+
      '.pg2-stat.good{--sc:#7ee787;}.pg2-stat.bad{--sc:#ff6464;}'+
      '.pg2-stat.acc{--sc:#c4ff3d;}.pg2-stat.warn{--sc:#fbbf24;}'+
      '.pg2-stat-head{display:flex;align-items:center;justify-content:space-between;}'+
      '.pg2-stat-ic{width:28px;height:28px;border-radius:8px;'+
      'background:rgba(128,128,128,.1);color:var(--sc,#c4ff3d);'+
      'display:flex;align-items:center;justify-content:center;}'+
      '.pg2-stat-ic svg{width:14px;height:14px;stroke:currentColor;fill:none;'+
      'stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;}'+
      '.pg2-stat-lbl{font-family:"JetBrains Mono",monospace;font-size:9px;font-weight:700;'+
      'color:#7a7a7a;letter-spacing:.16em;text-transform:uppercase;}'+
      '.pg2-stat-val{font-size:26px;font-weight:800;letter-spacing:-.02em;'+
      'font-feature-settings:"tnum";line-height:1;}'+
      '.pg2-stat-sub{font-size:11px;color:#7a7a7a;font-family:"JetBrains Mono",monospace;}'+
      '.pg2-stat-sub b{color:var(--sc,#c4ff3d);}'+
      '.pg2-levelup{background:rgba(192,132,252,.06);border:1px solid rgba(192,132,252,.2);'+
      'border-radius:16px;padding:14px 16px;margin-bottom:10px;'+
      'display:flex;align-items:center;gap:14px;}'+
      '.pg2-lu-badge{width:54px;height:54px;border-radius:14px;flex-shrink:0;'+
      'background:linear-gradient(135deg,#c084fc,#7c3aed);color:#fff;'+
      'display:flex;align-items:center;justify-content:center;'+
      'font-weight:900;font-size:22px;box-shadow:0 8px 28px rgba(192,132,252,.4);}'+
      '.pg2-lu-meta{flex:1;display:flex;flex-direction:column;gap:2px;}'+
      '.pg2-lu-kicker{font-family:"JetBrains Mono",monospace;font-size:9.5px;font-weight:800;'+
      'color:#c084fc;letter-spacing:.22em;text-transform:uppercase;}'+
      '.pg2-lu-title{font-size:15px;font-weight:800;}'+
      '.pg2-lu-title em{font-style:normal;color:#c084fc;}'+
      '.pg2-nearup{background:rgba(251,191,36,.04);border:1px solid rgba(251,191,36,.18);'+
      'border-radius:16px;padding:14px 16px;margin-bottom:10px;'+
      'display:flex;align-items:center;gap:14px;}'+
      '.pg2-nu-badge{width:54px;height:54px;border-radius:14px;flex-shrink:0;'+
      'background:#0e0e0e;border:1px dashed rgba(251,191,36,.4);'+
      'color:#fbbf24;display:flex;align-items:center;justify-content:center;'+
      'font-weight:900;font-size:20px;}'+
      '.pg2-nu-meta{flex:1;display:flex;flex-direction:column;gap:2px;}'+
      '.pg2-nu-kicker{font-family:"JetBrains Mono",monospace;font-size:9.5px;font-weight:800;'+
      'color:#fbbf24;letter-spacing:.22em;text-transform:uppercase;}'+
      '.pg2-nu-title{font-size:15px;font-weight:800;}'+
      '.pg2-nu-title em{font-style:normal;color:#fbbf24;}'+
      '.pg2-nu-gap{font-family:"JetBrains Mono",monospace;font-size:11px;font-weight:800;'+
      'padding:6px 12px;border-radius:8px;'+
      'background:rgba(251,191,36,.1);color:#fbbf24;border:1px solid rgba(251,191,36,.2);}'+
      '.pg2-failstrip{margin-bottom:14px;background:rgba(255,100,100,.04);'+
      'border:1px solid rgba(255,100,100,.15);border-radius:14px;'+
      'padding:10px 14px;display:flex;align-items:center;gap:12px;}'+
      '.pg2-fail-ic{width:30px;height:30px;border-radius:8px;flex-shrink:0;'+
      'background:rgba(255,100,100,.1);color:#ff6464;'+
      'display:flex;align-items:center;justify-content:center;}'+
      '.pg2-fail-ic svg{width:14px;height:14px;stroke:currentColor;fill:none;'+
      'stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}'+
      '.pg2-fail-meta{flex:1;display:flex;flex-direction:column;gap:2px;}'+
      '.pg2-fail-lbl{font-family:"JetBrains Mono",monospace;font-size:9px;font-weight:700;'+
      'color:#ff6464;letter-spacing:.18em;text-transform:uppercase;}'+
      '.pg2-fail-txt{font-size:12.5px;color:#c8c8c8;line-height:1.35;}'+
      '.pg2-fail-txt b{color:#f5f5f5;font-weight:700;}'+
      '.pg2-xp{background:#0e0e0e;border:1px solid #262626;border-radius:14px;'+
      'padding:12px 14px;margin-bottom:14px;display:flex;flex-direction:column;gap:8px;}'+
      '.pg2-xp-head{display:flex;align-items:center;justify-content:space-between;'+
      'font-family:"JetBrains Mono",monospace;}'+
      '.pg2-xp-l{font-size:10px;font-weight:700;color:#7a7a7a;'+
      'letter-spacing:.16em;text-transform:uppercase;display:flex;align-items:center;gap:8px;}'+
      '.pg2-xp-l b{color:#f5f5f5;font-weight:800;}'+
      '.pg2-xp-r{font-size:11px;color:#7a7a7a;font-feature-settings:"tnum";}'+
      '.pg2-xp-r.win b{color:#c4ff3d;font-weight:800;}'+
      '.pg2-xp-r.loss b{color:#fbbf24;font-weight:800;}'+
      '.pg2-xp-track{height:12px;background:rgba(255,255,255,.04);'+
      'border-radius:999px;border:1px solid #262626;overflow:hidden;position:relative;}'+
      '.pg2-xp-old{position:absolute;top:0;left:0;bottom:0;border-radius:999px;}'+
      '.pg2-xp-old.win{background:rgba(196,255,61,.2);}'+
      '.pg2-xp-old.loss{background:rgba(251,191,36,.15);}'+
      '.pg2-xp-fill{position:absolute;top:0;left:0;bottom:0;border-radius:999px;width:0%;'+
      'transition:width 1.2s cubic-bezier(.4,0,.2,1);}'+
      '.pg2-xp-fill.win{background:linear-gradient(90deg,#a8e02f,#c4ff3d);'+
      'box-shadow:0 0 14px rgba(196,255,61,.5);}'+
      '.pg2-xp-fill.loss{background:linear-gradient(90deg,#a07014,#fbbf24);'+
      'box-shadow:0 0 12px rgba(251,191,36,.35);}'+
      '.pg2-currency{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px;}'+
      '.pg2-coin{background:#0e0e0e;border:1px solid #262626;border-radius:14px;'+
      'padding:12px 14px;display:flex;align-items:center;gap:12px;}'+
      '.pg2-coin-ic{width:40px;height:40px;border-radius:50%;flex-shrink:0;'+
      'display:flex;align-items:center;justify-content:center;}'+
      '.pg2-coin-ic svg{width:18px;height:18px;stroke:currentColor;fill:none;'+
      'stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;}'+
      '.pg2-coin.aura .pg2-coin-ic{background:rgba(126,231,135,.1);'+
      'border:1px solid rgba(126,231,135,.22);color:#7ee787;}'+
      '.pg2-coin.merit .pg2-coin-ic{background:rgba(251,191,36,.1);'+
      'border:1px solid rgba(251,191,36,.22);color:#fbbf24;}'+
      '.pg2-coin.lost .pg2-coin-ic{background:rgba(255,100,100,.1);'+
      'border:1px solid rgba(255,100,100,.22);color:#ff6464;}'+
      '.pg2-coin-meta{flex:1;display:flex;flex-direction:column;gap:2px;}'+
      '.pg2-coin-lbl{font-family:"JetBrains Mono",monospace;font-size:9.5px;font-weight:700;'+
      'color:#7a7a7a;letter-spacing:.18em;text-transform:uppercase;}'+
      '.pg2-coin-row{display:flex;align-items:baseline;gap:8px;}'+
      '.pg2-coin-val{font-size:20px;font-weight:800;letter-spacing:-.02em;'+
      'font-feature-settings:"tnum";line-height:1;}'+
      '.pg2-coin.aura .pg2-coin-val{color:#7ee787;}'+
      '.pg2-coin.merit .pg2-coin-val{color:#fbbf24;}'+
      '.pg2-coin.lost .pg2-coin-val{color:#ff6464;}'+
      '.pg2-coin-total{font-family:"JetBrains Mono",monospace;font-size:10px;'+
      'color:#7a7a7a;margin-left:auto;flex-shrink:0;}'+
      '.pg2-coin-total b{color:#f5f5f5;font-weight:700;}'+
      '.pg2-actions{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;}'+
      '.pg2-btn{font-family:"Plus Jakarta Sans",-apple-system,sans-serif;font-size:13px;'+
      'font-weight:700;padding:13px 14px;border-radius:12px;border:none;cursor:pointer;'+
      'display:flex;align-items:center;justify-content:center;gap:8px;'+
      'transition:all .15s;letter-spacing:.01em;}'+
      '.pg2-btn svg{width:14px;height:14px;stroke:currentColor;fill:none;'+
      'stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}'+
      '.pg2-btn-primary{background:#c4ff3d;color:#0c0c0c;box-shadow:0 8px 26px rgba(196,255,61,.28);}'+
      '.pg2-btn-primary:hover{transform:translateY(-1px);box-shadow:0 12px 32px rgba(196,255,61,.45);}'+
      '.pg2-btn-secondary{background:#1a1a1a;color:#f5f5f5;border:1px solid #262626;}'+
      '.pg2-btn-secondary:hover{background:#222;border-color:#333;}'+
      '.pg2-btn-ghost{background:transparent;color:#c8c8c8;border:1px solid #262626;}'+
      '.pg2-btn-ghost:hover{background:rgba(255,255,255,.04);color:#f5f5f5;border-color:#333;}';
    document.head.appendChild(s);
  }

  var _SVG_CLOSE='<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';
  var _SVG_DIALOG='<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  var _SVG_BOOK='<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
  var _SVG_EYE='<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
  var _SVG_CHECK='<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>';
  var _SVG_X='<svg viewBox="0 0 24 24"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';
  var _SVG_TARGET='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>';
  var _SVG_WAVE='<svg viewBox="0 0 24 24"><path d="M3 12h4l3-9 4 18 3-9h4"/></svg>';
  var _SVG_PLAY='<svg viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"/></svg>';
  var _SVG_HOME='<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>';
  var _SVG_SHARE='<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg>';
  var _SVG_RETRY='<svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.5 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>';
  var _SVG_SUBS='<svg viewBox="0 0 24 24"><path d="M3 8h18"/><path d="M3 12h18"/><path d="M3 16h12"/></svg>';

  function _coin(cls, lbl, val, prefix, total){
    var ic = cls==='aura'
      ? '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v10"/><path d="M9 10c0-1.5 1.3-3 3-3s3 1.5 3 3-1.3 2.5-3 2.5-3 1-3 2.5 1.3 3 3 3 3-1.5 3-3"/></svg>'
      : '<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="6"/><path d="M8 14l-2 8 6-3 6 3-2-8"/></svg>';
    return '<div class="pg2-coin '+cls+'">'+
      '<div class="pg2-coin-ic" style="stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;">'+ic+'</div>'+
      '<div class="pg2-coin-meta">'+
      '<span class="pg2-coin-lbl">'+lbl+'</span>'+
      '<div class="pg2-coin-row">'+
      '<span class="pg2-coin-val">'+prefix+val+'</span>'+
      '<span class="pg2-coin-total">total <b>'+total+'</b></span>'+
      '</div></div></div>';
  }

  function _xpBar(mode, level, xpG, xpInto, xpFor, oldPct, newPct){
    return '<div class="pg2-xp">'+
      '<div class="pg2-xp-head">'+
      '<span class="pg2-xp-l"><b>XP</b> &middot; Nivel '+level+'</span>'+
      '<span class="pg2-xp-r '+mode+'"><b>+'+xpG+'</b> XP '+(mode==='win'?'ganados':'consolaci&oacute;n')+' &middot; '+xpInto+'/'+xpFor+'</span>'+
      '</div>'+
      '<div class="pg2-xp-track">'+
      '<div class="pg2-xp-old '+mode+'" style="width:'+oldPct+'%;"></div>'+
      '<div id="pg2-xp-fill" class="pg2-xp-fill '+mode+'" style="width:'+oldPct+'%;"></div>'+
      '</div></div>';
  }

  function _buildWin(d){
    var isNew = d.score > d.recOld && d.score > 0;
    var shownRec = isNew ? d.score : d.recOld;
    return '<div class="pg2" role="dialog">'+
      '<div class="pg2-pts" aria-hidden="true">'+
      '<div class="pg2-pt" style="left:8%;animation-delay:-1s;background:#c4ff3d;box-shadow:0 0 10px #c4ff3d;"></div>'+
      '<div class="pg2-pt" style="left:22%;animation-delay:-3s;background:#c084fc;box-shadow:0 0 10px #c084fc;"></div>'+
      '<div class="pg2-pt" style="left:40%;animation-delay:-5s;background:#fbbf24;box-shadow:0 0 10px #fbbf24;"></div>'+
      '<div class="pg2-pt" style="left:60%;animation-delay:-2s;background:#7ee787;box-shadow:0 0 10px #7ee787;"></div>'+
      '<div class="pg2-pt" style="left:78%;animation-delay:-4s;background:#c4ff3d;box-shadow:0 0 10px #c4ff3d;"></div>'+
      '</div>'+
      '<button class="pg2-close" onclick="closeGover()" aria-label="Cerrar">'+_SVG_CLOSE+'</button>'+
      '<header class="pg2-hero">'+
      '<span class="pg2-kicker win">escena completada</span>'+
      '<h2 class="pg2-title win">Buen ojo, <em>'+d.nombre+'</em></h2>'+
      '<div class="pg2-song">'+
      '<b>'+d.titulo+'</b>'+
      (d.subtitulo?'<span class="pg2-dot"></span><span>'+d.subtitulo+'</span>':'')+
      '</div></header>'+
      '<div class="pg2-score win">'+
      '<div class="pg2-side">'+
      '<span class="lbl">tu r&eacute;cord</span>'+
      '<span class="val">'+d.recOld+' <small>pts</small></span>'+
      '</div>'+
      '<div class="pg2-center win">'+
      '<span class="lbl">puntos ganados</span>'+
      '<span class="big">'+d.score+'</span>'+
      '<span class="delta">&#9650; '+(isNew?'+'+Math.abs(d.score-d.recOld)+' vs r&eacute;cord':'primera partida')+'</span>'+
      '</div>'+
      '<div class="pg2-side right">'+
      '<span class="lbl">'+(isNew?'nuevo r&eacute;cord':'r&eacute;cord actual')+'</span>'+
      '<span class="val">'+shownRec+' <small>pts</small></span>'+
      '</div>'+
      '</div>'+
      '<div class="pg2-stats">'+
      '<div class="pg2-stat good">'+
      '<div class="pg2-stat-head"><div class="pg2-stat-ic">'+_SVG_DIALOG+'</div>'+
      '<span class="pg2-stat-lbl">di&aacute;logos</span></div>'+
      '<span class="pg2-stat-val">'+d.corr+'</span>'+
      '<span class="pg2-stat-sub">de <b>'+d.tot+'</b> l&iacute;neas</span>'+
      '</div>'+
      '<div class="pg2-stat" style="--sc:#fbbf24;">'+
      '<div class="pg2-stat-head">'+
      '<div class="pg2-stat-ic" style="background:rgba(251,191,36,.1);color:#fbbf24;">'+_SVG_BOOK+'</div>'+
      '<span class="pg2-stat-lbl">slang</span></div>'+
      '<span class="pg2-stat-val" style="color:#fbbf24;">'+d.errs+'</span>'+
      '<span class="pg2-stat-sub">frases en <b>vocab</b></span>'+
      '</div>'+
      '<div class="pg2-stat acc">'+
      '<div class="pg2-stat-head"><div class="pg2-stat-ic">'+_SVG_EYE+'</div>'+
      '<span class="pg2-stat-lbl">comprensi&oacute;n</span></div>'+
      '<span class="pg2-stat-val">'+d.prec+'<small style="font-size:16px;color:#7a7a7a;">%</small></span>'+
      '<span class="pg2-stat-sub">precisi&oacute;n total</span>'+
      '</div>'+
      '</div>'+
      '<div class="pg2-levelup">'+
      '<div class="pg2-lu-badge">'+d.xs.level+'</div>'+
      '<div class="pg2-lu-meta">'+
      '<span class="pg2-lu-kicker">nivel actual</span>'+
      '<span class="pg2-lu-title">Nivel <em>'+d.xs.level+'</em> &middot; '+(d.xs.cefr||'B1')+'</span>'+
      '</div></div>'+
      _xpBar('win',d.xs.level,d.xpG,d.xs.xpIntoLevel,d.xs.xpForNext,d.xpOldPct,d.xpPct)+
      '<div class="pg2-currency">'+
      _coin('aura','puntos aura',d.apG,'+',d.auraPoints)+
      _coin('merit','puntos m&eacute;rito',d.pmG,'+',d.meritPoints)+
      '</div>'+
      '<div class="pg2-actions">'+
      '<button class="pg2-btn pg2-btn-primary" onclick="_p2Retry()">'+_SVG_PLAY+'Jugar de nuevo</button>'+
      '<button class="pg2-btn pg2-btn-secondary" onclick="closeGover();window.location.href=\'movies.html\'">'+_SVG_HOME+'Ir al inicio</button>'+
      '<button class="pg2-btn pg2-btn-ghost" onclick="_pg2Share()">'+_SVG_SHARE+'Compartir</button>'+
      '</div></div>';
  }

  function _buildLoss(d){
    var xpNeed=Math.max(1,d.xs.xpForNext-d.xs.xpIntoLevel);
    return '<div class="pg2" role="dialog">'+
      '<button class="pg2-close" onclick="closeGover()" aria-label="Cerrar">'+_SVG_CLOSE+'</button>'+
      '<header class="pg2-hero">'+
      '<span class="pg2-kicker loss">escena fallida</span>'+
      '<h2 class="pg2-title loss">Se te escap&oacute; la <em>escena</em>, '+d.nombre+'</h2>'+
      '<div class="pg2-song">'+
      '<b>'+d.titulo+'</b>'+
      (d.subtitulo?'<span class="pg2-dot"></span><span>'+d.subtitulo+'</span>':'')+
      '</div></header>'+
      '<div class="pg2-score loss">'+
      '<div class="pg2-side">'+
      '<span class="lbl">tu r&eacute;cord</span>'+
      '<span class="val">'+(d.recOld||0)+' <small>pts</small></span>'+
      '</div>'+
      '<div class="pg2-center loss">'+
      '<span class="lbl">comprensi&oacute;n esta escena</span>'+
      '<span class="big">'+d.prec+'<span style="font-size:36px;color:#ff6464;">%</span></span>'+
      '<span class="delta">&#9660; bajo el m&iacute;nimo</span>'+
      '</div>'+
      '<div class="pg2-side right">'+
      '<span class="lbl">m&iacute;nimo aprobado</span>'+
      '<span class="val">60 <small>%</small></span>'+
      '</div>'+
      '</div>'+
      '<div class="pg2-stats">'+
      '<div class="pg2-stat good">'+
      '<div class="pg2-stat-head"><div class="pg2-stat-ic">'+_SVG_CHECK+'</div>'+
      '<span class="pg2-stat-lbl">comprendidos</span></div>'+
      '<span class="pg2-stat-val">'+d.corr+'</span>'+
      '<span class="pg2-stat-sub">de <b>'+d.tot+'</b> di&aacute;logos</span>'+
      '</div>'+
      '<div class="pg2-stat bad">'+
      '<div class="pg2-stat-head"><div class="pg2-stat-ic">'+_SVG_X+'</div>'+
      '<span class="pg2-stat-lbl">perdidos</span></div>'+
      '<span class="pg2-stat-val">'+d.errs+'</span>'+
      '<span class="pg2-stat-sub">en <b>review</b></span>'+
      '</div>'+
      '<div class="pg2-stat warn">'+
      '<div class="pg2-stat-head">'+
      '<div class="pg2-stat-ic" style="background:rgba(251,191,36,.1);color:#fbbf24;">'+_SVG_TARGET+'</div>'+
      '<span class="pg2-stat-lbl">comprensi&oacute;n</span></div>'+
      '<span class="pg2-stat-val" style="color:#fbbf24;">'+d.prec+'<small style="font-size:16px;color:#7a7a7a;">%</small></span>'+
      '<span class="pg2-stat-sub">racha m&aacute;x <b>'+d.errs+'</b></span>'+
      '</div>'+
      '</div>'+
      '<div class="pg2-failstrip">'+
      '<div class="pg2-fail-ic">'+_SVG_WAVE+'</div>'+
      '<div class="pg2-fail-meta">'+
      '<span class="pg2-fail-lbl">se te escap&oacute;</span>'+
      '<span class="pg2-fail-txt">Completaste <b>'+d.corr+' de '+d.tot+'</b> di&aacute;logos &middot; Sigue intentando</span>'+
      '</div></div>'+
      '<div class="pg2-nearup">'+
      '<div class="pg2-nu-badge">'+d.xs.level+'</div>'+
      '<div class="pg2-nu-meta">'+
      '<span class="pg2-nu-kicker">tan cerca</span>'+
      '<span class="pg2-nu-title">Te faltan <em>'+xpNeed+' XP</em> para el nivel '+(d.xs.level+1)+'</span>'+
      '</div>'+
      '<div class="pg2-nu-gap"><b>'+xpNeed+'</b> XP</div>'+
      '</div>'+
      _xpBar('loss',d.xs.level,d.xpG,d.xs.xpIntoLevel,d.xs.xpForNext,d.xpOldPct,d.xpPct)+
      '<div class="pg2-currency">'+
      _coin('aura','aura &middot; consolaci&oacute;n',d.apG,'+',d.auraPoints)+
      _coin('lost','m&eacute;rito perdido',d.pmG,'',d.meritPoints)+
      '</div>'+
      '<div class="pg2-actions">'+
      '<button class="pg2-btn pg2-btn-primary" onclick="_p2Retry()">'+_SVG_RETRY+'Volver a ver</button>'+
      '<button class="pg2-btn pg2-btn-secondary" onclick="_p2Retry()">'+_SVG_SUBS+'Activar subs</button>'+
      '<button class="pg2-btn pg2-btn-ghost" onclick="closeGover();window.location.href=\'movies.html\'">'+_SVG_HOME+'Inicio</button>'+
      '</div></div>';
  }

  var _goverActive=false;

  function _p2Open(mode){
    _injectCSS();
    var ov=document.getElementById('p2ov');if(!ov)return;
    var corr=(window.karaoState&&karaoState.blanksFilled)||0;
    var tot=(window.karaoState&&karaoState.blanks&&karaoState.blanks.length)||Math.max(corr+(window.errorCount||0),1);
    var errs=window.errorCount||0;
    var score=window.totalScore||0;
    var xs=(window.AuraXP&&AuraXP.getState)?AuraXP.getState():{level:1,xpIntoLevel:0,xpForNext:1000,percent:0,cefr:'B1'};
    var prof=(window._aura&&_aura.profile)||{};
    var nombre=prof.nombre||'Jugador';
    var auraPoints=prof.aura_points||0;
    var meritPoints=prof.merit_pm||0;
    var movData=(window.MOVIES&&window.currentVideoId&&MOVIES[window.currentVideoId])||{};
    var titulo=movData.titleMain||'MoviesLab';
    var subtitulo=movData.titleSub||'';
    var recKey='aura_rec_'+(window.currentVideoId||'');
    var recOld=parseInt(localStorage.getItem(recKey)||'0',10);
    var isLoss=mode==='loss';
    var prec=tot>0?Math.round(corr/tot*100):0;
    var xpG=isLoss?Math.max(5,Math.floor(score/20)):Math.max(10,Math.floor(score/10));
    var apG=isLoss?Math.max(2,Math.floor(score/100)):Math.max(5,Math.floor(score/50));
    var pmG=isLoss?Math.min(5,Math.floor(score/20)):Math.max(1,Math.floor(score/20));
    var xpPct=Math.round((xs.percent||0)*100);
    var xpForNext=xs.xpForNext||1000;
    var xpOldPct=Math.max(0,xpPct-Math.round(xpG/xpForNext*100));
    if(!isLoss&&score>recOld&&score>0)localStorage.setItem(recKey,String(score));
    var d={nombre:nombre,titulo:titulo,subtitulo:subtitulo,
      corr:corr,tot:tot,errs:errs,score:score,prec:prec,recOld:recOld,
      xpG:xpG,apG:apG,pmG:pmG,xs:xs,xpPct:xpPct,xpOldPct:xpOldPct,
      auraPoints:auraPoints,meritPoints:meritPoints};
    ov.innerHTML=isLoss?_buildLoss(d):_buildWin(d);
    ov.className='p2on';
    setTimeout(function(){
      var f=document.getElementById('pg2-xp-fill');
      if(f)f.style.width=xpPct+'%';
    },350);
  }

  window._goverActive=_goverActive;

  window._triggerGameOver=function(){
    if(_goverActive)return;_goverActive=true;window._goverActive=true;
    if(window.player&&player.pauseVideo)player.pauseVideo();
    window.isPlaying=false;if(typeof updatePPIcon==='function')updatePPIcon();
    document.querySelectorAll('.blank-bubble,.kara-opt-btn').forEach(function(e){e.disabled=true;});
    _p2Open('loss');
  };

  window._triggerWin=function(){
    if(_goverActive)return;_goverActive=true;window._goverActive=true;
    if(window.player&&player.pauseVideo)player.pauseVideo();
    window.isPlaying=false;if(typeof updatePPIcon==='function')updatePPIcon();
    _p2Open('win');
  };

  window._p2Retry=function(){
    _goverActive=false;window._goverActive=false;
    var ov=document.getElementById('p2ov');if(ov)ov.className='';
    window.errorCount=0;
    var se=document.getElementById('statErrors');if(se)se.textContent='0';
    if(typeof loadAndInitKaraoke==='function')loadAndInitKaraoke(window.currentVideoId);
    if(window.player){
      player.seekTo(window.currentStart||0,true);
      player.playVideo();
      window.isPlaying=true;
      if(typeof updatePPIcon==='function')updatePPIcon();
    }
  };

  window.closeGover=function(){
    _goverActive=false;window._goverActive=false;
    var ov=document.getElementById('p2ov');if(ov)ov.className='';
  };

  window._pg2Share=function(){
    if(navigator.share){
      navigator.share({title:'Aura Languages',text:'Completé una escena!',url:location.href});
    }else{
      try{navigator.clipboard.writeText(location.href);}catch(e){}
    }
  };

})();

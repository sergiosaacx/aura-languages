// popup-dificultad.js — difficulty selector for MoviesLab
// Wraps loadAndInitKaraoke to show picker first on every game start

(function(){

  // ── CSS ───────────────────────────────────────────────────────────────────
  function _injectCSS(){
    if(document.getElementById('pmd-css'))return;
    var s=document.createElement('style');s.id='pmd-css';
    s.textContent=
      '#pmd-ov{position:fixed;inset:0;z-index:9001;display:none;'+
      'align-items:flex-start;justify-content:center;'+
      'padding:16px;overflow-y:auto;'+
      'background:rgba(5,5,5,.92);'+
      'backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);}'+
      '#pmd-ov.pmd-on{display:flex;}'+
      '.pmd{font-family:"Plus Jakarta Sans",-apple-system,sans-serif;font-size:14px;'+
      'color:#f5f5f5;width:min(720px,100%);margin:auto;position:relative;'+
      'background:#171717;border:1px solid #262626;border-radius:20px;padding:18px;'+
      'box-shadow:0 30px 90px rgba(0,0,0,.75),0 0 0 1px rgba(255,255,255,.02);'+
      'animation:pmdIn .3s cubic-bezier(.22,1,.36,1) both;}'+
      '@keyframes pmdIn{from{opacity:0;transform:translateY(14px) scale(.98);}to{opacity:1;transform:none;}}'+
      '.pmd-close{position:absolute;top:14px;right:14px;width:30px;height:30px;border-radius:50%;'+
      'background:rgba(255,255,255,.04);color:#7a7a7a;border:none;cursor:pointer;'+
      'display:flex;align-items:center;justify-content:center;transition:all .15s;}'+
      '.pmd-close:hover{background:rgba(255,255,255,.08);color:#f5f5f5;}'+
      '.pmd-close svg{width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;}'+
      '.pmd-head{display:flex;align-items:center;gap:12px;padding:10px 12px;background:#0e0e0e;'+
      'border:1px solid #262626;border-radius:14px;margin-bottom:16px;}'+
      '.pmd-thumb{width:48px;height:48px;border-radius:10px;flex-shrink:0;object-fit:cover;background:#1f1f1f;}'+
      '.pmd-meta{flex:1;display:flex;flex-direction:column;gap:2px;min-width:0;overflow:hidden;}'+
      '.pmd-tag{font-family:"JetBrains Mono",monospace;font-size:9px;font-weight:700;color:#c4ff3d;'+
      'letter-spacing:.18em;text-transform:uppercase;display:flex;align-items:center;gap:5px;}'+
      '.pmd-tag::before{content:"";width:5px;height:5px;border-radius:50%;background:#c4ff3d;'+
      'box-shadow:0 0 8px #c4ff3d;animation:pmdPulse 2s infinite;}'+
      '@keyframes pmdPulse{0%,100%{opacity:.5;}50%{opacity:1;}}'+
      '.pmd-movie{font-size:15px;font-weight:800;color:#f5f5f5;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}'+
      '.pmd-scene{font-size:10px;color:#7a7a7a;font-family:"JetBrains Mono",monospace;}'+
      '.pmd-rec-strip{display:flex;flex-direction:column;align-items:flex-end;gap:2px;'+
      'padding-left:12px;border-left:1px solid #262626;flex-shrink:0;}'+
      '.pmd-rec-strip b{font-size:13px;font-weight:800;color:#f5f5f5;}'+
      '.pmd-rec-strip span{font-family:"JetBrains Mono",monospace;font-size:8.5px;color:#7a7a7a;'+
      'text-transform:uppercase;letter-spacing:.12em;}'+
      '.pmd-sec{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:12px;gap:10px;}'+
      '.pmd-sec-l{display:flex;flex-direction:column;gap:3px;}'+
      '.pmd-kicker{font-family:"JetBrains Mono",monospace;font-size:9px;font-weight:700;'+
      'color:#7a7a7a;letter-spacing:.2em;text-transform:uppercase;}'+
      '.pmd-h2{font-size:20px;font-weight:800;color:#f5f5f5;letter-spacing:-.02em;line-height:1.1;}'+
      '.pmd-h2 em{font-style:normal;color:#c4ff3d;}'+
      '.pmd-nivel{font-family:"JetBrains Mono",monospace;font-size:10px;color:#7a7a7a;'+
      'display:flex;align-items:center;gap:5px;flex-shrink:0;}'+
      '.pmd-nivel b{color:#f5f5f5;background:rgba(255,255,255,.06);padding:2px 6px;border-radius:5px;font-size:9.5px;}'+
      '.pmd-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;}'+
      '.pmd-opt{--c:#7ee787;--g:rgba(126,231,135,.14);position:relative;background:#0e0e0e;'+
      'border:1px solid #262626;border-radius:14px;padding:13px;text-align:left;'+
      'display:flex;flex-direction:column;gap:8px;cursor:pointer;'+
      'transition:transform .15s,border-color .15s,background .15s;overflow:hidden;font:inherit;color:inherit;}'+
      '.pmd-opt::before{content:"";position:absolute;inset:0;border-radius:14px;'+
      'background:radial-gradient(150px 110px at 0% 0%,var(--g),transparent 70%);'+
      'opacity:.3;pointer-events:none;transition:opacity .2s;}'+
      '.pmd-opt:hover{border-color:var(--c);transform:translateY(-1px);background:#111;}'+
      '.pmd-opt:hover::before,.pmd-opt.selected::before{opacity:1;}'+
      '.pmd-opt.selected{border-color:var(--c);background:#111;'+
      'box-shadow:0 0 0 1px var(--c) inset,0 8px 24px rgba(0,0,0,.5);}'+
      '.pmd-opt.med{--c:#fbbf24;--g:rgba(251,191,36,.14);}'+
      '.pmd-opt.hard{--c:#ff6464;--g:rgba(255,100,100,.14);}'+
      '.pmd-opt.leg{--c:#c084fc;--g:rgba(192,132,252,.14);}'+
      '.pmd-opt-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}'+
      '.pmd-opt-ic{width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,.03);'+
      'border:1px solid #262626;display:flex;align-items:center;justify-content:center;'+
      'color:var(--c);flex-shrink:0;}'+
      '.pmd-opt-ic svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;}'+
      '.pmd-opt-pill{font-family:"JetBrains Mono",monospace;font-size:8.5px;font-weight:700;'+
      'color:var(--c);letter-spacing:.12em;text-transform:uppercase;'+
      'padding:4px 7px;border-radius:5px;background:var(--g);border:1px solid rgba(255,255,255,.06);}'+
      '.pmd-opt-name{font-size:17px;font-weight:800;color:var(--c);letter-spacing:-.01em;line-height:1;}'+
      '.pmd-opt-desc{font-size:11px;color:#c8c8c8;line-height:1.35;}'+
      '.pmd-opt-stats{display:flex;align-items:center;gap:8px;padding-top:8px;'+
      'border-top:1px dashed #262626;font-family:"JetBrains Mono",monospace;'+
      'font-size:9px;color:#7a7a7a;text-transform:uppercase;letter-spacing:.06em;}'+
      '.pmd-opt-stat{display:flex;align-items:center;gap:4px;}'+
      '.pmd-opt-stat svg{width:10px;height:10px;stroke:currentColor;fill:none;stroke-width:2;}'+
      '.pmd-opt-stat b{color:#f5f5f5;}'+
      '.pmd-rec-badge{position:absolute;top:0;right:12px;font-family:"JetBrains Mono",monospace;'+
      'font-size:7.5px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;'+
      'color:#0c0c0c;background:#c4ff3d;padding:2px 8px;border-radius:0 0 7px 7px;'+
      'box-shadow:0 3px 10px rgba(196,255,61,.4);}'+
      '.pmd-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;}'+
      '.pmd-hint{font-family:"JetBrains Mono",monospace;font-size:10px;color:#7a7a7a;'+
      'display:flex;align-items:center;gap:4px;}'+
      '.pmd-kbd{display:inline-flex;align-items:center;justify-content:center;'+
      'min-width:18px;height:18px;border:1px solid #333;border-radius:4px;'+
      'font-size:9px;font-weight:700;color:#7a7a7a;padding:0 3px;background:#0e0e0e;}'+
      '.pmd-acts{display:flex;align-items:center;gap:8px;}'+
      '.pmd-btn{font-family:"Plus Jakarta Sans",-apple-system,sans-serif;font-size:12px;'+
      'font-weight:700;padding:10px 16px;border-radius:10px;border:none;cursor:pointer;'+
      'display:flex;align-items:center;gap:7px;transition:all .15s;letter-spacing:.01em;}'+
      '.pmd-btn svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}'+
      '.pmd-btn-ghost{background:transparent;color:#7a7a7a;}'+
      '.pmd-btn-ghost:hover{color:#f5f5f5;background:rgba(255,255,255,.04);}'+
      '.pmd-btn-primary{background:#c4ff3d;color:#0c0c0c;box-shadow:0 6px 20px rgba(196,255,61,.28);}'+
      '.pmd-btn-primary:hover{transform:translateY(-1px);box-shadow:0 10px 28px rgba(196,255,61,.45);}'+
      /* ── MOBILE ──────────────────────────────────── */
      '@media(max-width:768px){#pmd-ov{padding:10px;align-items:flex-start;}.pmd{padding:14px;border-radius:18px;}.pmd-head{padding:8px 10px;gap:9px;}.pmd-thumb{width:40px;height:40px;border-radius:8px;}.pmd-movie{font-size:13px;}.pmd-scene{font-size:9px;}.pmd-tag{font-size:8px;}.pmd-rec-strip b{font-size:12px;}.pmd-rec-strip span{font-size:7.5px;}.pmd-sec{margin-bottom:10px;}.pmd-kicker{font-size:8px;}.pmd-h2{font-size:17px;}.pmd-nivel{font-size:9px;}.pmd-nivel b{font-size:9px;}.pmd-grid{gap:7px;margin-bottom:12px;}.pmd-opt{padding:11px 10px;border-radius:12px;gap:7px;}.pmd-opt-ic{width:28px;height:28px;border-radius:7px;}.pmd-opt-ic svg{width:13px;height:13px;}.pmd-opt-pill{font-size:7.5px;padding:3px 6px;}.pmd-opt-name{font-size:15px;}.pmd-opt-desc{font-size:10px;}.pmd-opt-stats{font-size:8px;gap:10px;padding-top:7px;}.pmd-opt-stat svg{width:9px;height:9px;}.pmd-rec-badge{font-size:6.5px;padding:2px 7px;}.pmd-foot{flex-direction:column;gap:8px;align-items:stretch;}.pmd-hint{display:none;}.pmd-acts{justify-content:flex-end;gap:8px;}.pmd-btn{font-size:13px;padding:12px 18px;border-radius:12px;}.pmd-btn-primary{flex:1;justify-content:center;}}'
;
    document.head.appendChild(s);
  }

  // ── State ─────────────────────────────────────────────────────────────────
  var _pmdSel = 'medio';
  var _pmdCb  = null;

  // ── Option data ───────────────────────────────────────────────────────────
  /* Descripciones según el modo de la página (window.pmdMode) */
  var _OPTS_MOVIES = [
    {key:'facil', cls:'',
     icon:'<svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
     pill:'&times;1 XP', nameKey:'diff_facil',
     descKey:'pmd_movies_desc_facil',
     time:'~5', pts:'40', rec:false},
    {key:'medio', cls:'med',
     icon:'<svg viewBox="0 0 24 24"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>',
     pill:'&times;1.5 XP', nameKey:'diff_medio',
     descKey:'pmd_movies_desc_medio',
     time:'~8', pts:'90', rec:true},
    {key:'dificil', cls:'hard',
     icon:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>',
     pill:'&times;2 XP', nameKey:'diff_dificil',
     descKey:'pmd_movies_desc_dificil',
     time:'~12', pts:'160', rec:false},
    {key:'legendario', cls:'leg',
     icon:'<svg viewBox="0 0 24 24"><path d="M12 2l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1.5z"/></svg>',
     pill:'&times;3 XP', nameKey:'diff_leg',
     descKey:'pmd_movies_desc_leg',
     time:'~18', pts:'280', rec:false}
  ];
  var _OPTS_SHADOW = [
    {key:'facil', cls:'',
     icon:'<svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
     pill:'&times;1 XP', nameKey:'diff_facil',
     descKey:'pmd_shadow_desc_facil',
     time:'~5', pts:'40', rec:false},
    {key:'medio', cls:'med',
     icon:'<svg viewBox="0 0 24 24"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>',
     pill:'&times;1.5 XP', nameKey:'diff_medio',
     descKey:'pmd_shadow_desc_medio',
     time:'~8', pts:'90', rec:true},
    {key:'dificil', cls:'hard',
     icon:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>',
     pill:'&times;2 XP', nameKey:'diff_dificil',
     descKey:'pmd_shadow_desc_dificil',
     time:'~12', pts:'160', rec:false},
    {key:'legendario', cls:'leg',
     icon:'<svg viewBox="0 0 24 24"><path d="M12 2l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1.5z"/></svg>',
     pill:'&times;3 XP', nameKey:'diff_leg',
     descKey:'pmd_shadow_desc_leg',
     time:'~18', pts:'280', rec:false}
  ];
  var _OPTS = (window.pmdMode === 'shadowlab') ? _OPTS_SHADOW : _OPTS_MOVIES;

  // ── HTML builder ─────────────────────────────────────────────────────────
  function _buildHTML(thumb, titulo, subtitulo, rec, nivel){
    var _t=window.auraT||function(k){return k;};
    var svgClose='<svg viewBox="0 0 24 24"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>';
    var svgArrow='<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
    var svgClock='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>';
    var svgStar='<svg viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>';

    var grid='';
    for(var i=0;i<_OPTS.length;i++){
      var o=_OPTS[i];
      grid+='<button class="pmd-opt '+o.cls+'" data-key="'+o.key+'" onclick="pmdSel(this,\''+o.key+'\')">'+
        (o.rec?'<span class="pmd-rec-badge">'+_t('pmd_recommended')+'</span>':'')+
        '<div class="pmd-opt-top">'+
          '<div class="pmd-opt-ic">'+o.icon+'</div>'+
          '<span class="pmd-opt-pill">'+o.pill+'</span>'+
        '</div>'+
        '<div class="pmd-opt-name">'+_t(o.nameKey)+'</div>'+
        '<p class="pmd-opt-desc">'+_t(o.descKey)+'</p>'+
        '<div class="pmd-opt-stats">'+
          '<span class="pmd-opt-stat">'+svgClock+'<b>'+o.time+'</b>'+_t('pmd_min')+'</span>'+
          '<span class="pmd-opt-stat">'+svgStar+'<b>'+o.pts+'</b>'+_t('pmd_pts')+'</span>'+
        '</div>'+
      '</button>';
    }

    return '<div class="pmd" role="dialog" aria-modal="true">'+
      '<button class="pmd-close" onclick="pmdClose()" aria-label="Cerrar">'+svgClose+'</button>'+
      '<div class="pmd-head">'+
        '<img class="pmd-thumb" src="'+thumb+'" alt="" onerror="this.style.display=\'none\'">'+
        '<div class="pmd-meta">'+
          '<span class="pmd-tag">'+_t('pmd_ready')+'</span>'+
          '<span class="pmd-movie">'+titulo+'</span>'+
          (subtitulo?'<span class="pmd-scene">'+subtitulo+'</span>':'')+
        '</div>'+
        '<div class="pmd-rec-strip">'+
          '<b>'+rec+'</b>'+
          '<span>'+_t('pmd_record')+'</span>'+
        '</div>'+
      '</div>'+
      '<div class="pmd-sec">'+
        '<div class="pmd-sec-l">'+
          '<span class="pmd-kicker">'+_t('pmd_choose_mode')+'</span>'+
          '<h2 class="pmd-h2">'+_t('pmd_select_diff')+' <em>'+_t('pmd_difficulty')+'</em></h2>'+
        '</div>'+
        '<div class="pmd-nivel"><span>'+_t('pmd_nivel')+'</span><b>'+nivel+'</b></div>'+
      '</div>'+
      '<div class="pmd-grid">'+grid+'</div>'+
      '<footer class="pmd-foot">'+
        '<span class="pmd-hint">'+
          '<span class="pmd-kbd">1</span>'+
          '<span class="pmd-kbd">2</span>'+
          '<span class="pmd-kbd">3</span>'+
          '<span class="pmd-kbd">4</span>'+
          '&nbsp;'+_t('pmd_choose')+' &nbsp;&middot;&nbsp; <span class="pmd-kbd">&#x23CE;</span> '+_t('pmd_start_kbd')+
        '</span>'+
        '<div class="pmd-acts">'+
          '<button class="pmd-btn pmd-btn-ghost" onclick="pmdClose()">'+_t('lyric_cancel')+'</button>'+
          '<button class="pmd-btn pmd-btn-primary" onclick="pmdStart()">'+
            _t('pmd_start')+' '+svgArrow+
          '</button>'+
        '</div>'+
      '</footer>'+
    '</div>';
  }

  // ── Show popup ────────────────────────────────────────────────────────────
  function _showPopup(videoId, cb){
    _injectCSS();
    _pmdCb  = cb;
    _pmdSel = 'medio';

    var ov = document.getElementById('pmd-ov');
    if(!ov){ ov=document.createElement('div'); ov.id='pmd-ov'; document.body.appendChild(ov); }

    var mov = (window.MOVIES&&videoId&&MOVIES[videoId])||{};
    var thumb = 'https://img.youtube.com/vi/'+(videoId||'')+'/mqdefault.jpg';
    var titulo = mov.titleMain || 'MoviesLab';
    var subtitulo = mov.titleSub || '';
    var rec = (function(){ try{ return localStorage.getItem('aura_rec_'+(videoId||''))||'0'; }catch(e){ return '0'; } })();
    var xs = (window.AuraXP&&AuraXP.getState)?AuraXP.getState():{level:1,cefr:'B1'};
    var nivel = 'Nv '+xs.level+' &middot; '+(xs.cefr||'B1');

    ov.innerHTML = _buildHTML(thumb, titulo, subtitulo, rec, nivel);
    ov.className = 'pmd-on';
    document.addEventListener('keydown', _key);

    // Select default
    var defBtn = ov.querySelector('.pmd-opt[data-key="medio"]');
    if(defBtn){ defBtn.classList.add('selected'); }
  }

  // ── Key handler ───────────────────────────────────────────────────────────
  function _key(e){
    var ov = document.getElementById('pmd-ov');
    if(!ov||!ov.classList.contains('pmd-on')) return;
    var map={'1':'facil','2':'medio','3':'dificil','4':'legendario'};
    if(map[e.key]){
      var btn=document.querySelector('.pmd-opt[data-key="'+map[e.key]+'"]');
      if(btn) window.pmdSel(btn, map[e.key]);
    }
    if(e.key==='Enter')  window.pmdStart();
    if(e.key==='Escape') window.pmdClose();
  }

  // ── Public API ────────────────────────────────────────────────────────────
  window.pmdSel = function(el, key){
    document.querySelectorAll('.pmd-opt').forEach(function(o){ o.classList.remove('selected'); });
    if(el) el.classList.add('selected');
    _pmdSel = key;
  };

  window.pmdStart = function(){
    var ov=document.getElementById('pmd-ov');
    if(ov) ov.className='';
    document.removeEventListener('keydown', _key);
    if(window.karaoState) karaoState.difficulty = _pmdSel;
    if(_pmdCb){ var cb=_pmdCb; _pmdCb=null; cb(_pmdSel); }
  };

  window.pmdClose = function(){
    var ov=document.getElementById('pmd-ov');
    if(ov) ov.className='';
    document.removeEventListener('keydown', _key);
    _pmdCb = null;
  };

  // ── Wrap loadAndInitKaraoke ───────────────────────────────────────────────
  var _origLAIK = null;

  function _wrap(){
    if(typeof loadAndInitKaraoke==='function' && loadAndInitKaraoke !== _wrapped){
      _origLAIK = loadAndInitKaraoke;
      window.loadAndInitKaraoke = _wrapped;
    }
  }

  function _wrapped(videoId){
    if(!videoId){ if(_origLAIK) _origLAIK(videoId); return; }
    _showPopup(videoId, function(){
      if(_origLAIK) _origLAIK(videoId);
    });
  }

  // Wrap immediately (karaoke.js loads before this)
  _wrap();
  // Safety net: also wrap on DOM ready
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', _wrap);
  }

})();

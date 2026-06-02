// exam-gate.js — popup de requisitos del examen
// Cargado por aura-shell.js. Intercepta clics en el boton Examen (cualquier pagina).
(function () {
  if (window._examGate) return;
  window._examGate = true;

  /* 1. Interceptar clic en el boton Examen via captura — funciona sin modificar onclick */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.aura-sl-btn, ._mob-tab');
    if (!btn) return;
    var oc = btn.getAttribute('onclick') || '';
    if (oc.indexOf('examen-ascenso.html') === -1) return;
    e.stopPropagation();
    if (window.openExamGate) { window.openExamGate(); return; }
    // Fallback: si el modal aun no cargo, navegar normal
  }, true);

  /* 2. CSS */
  var _st = document.createElement('style');
  _st.textContent =
    '#_egov{position:fixed;inset:0;z-index:10000;background:rgba(5,5,5,.97);' +
    'backdrop-filter:blur(20px);display:none;align-items:center;justify-content:center;padding:24px;}' +
    '#_egov::before{content:"";position:absolute;inset:0;pointer-events:none;' +
    'background-image:repeating-linear-gradient(45deg,transparent 0,transparent 22px,' +
    'rgba(255,255,255,.012) 22px,rgba(255,255,255,.012) 23px);}' +
    '#_egcard{position:relative;width:min(460px,100%);background:#171717;border:1px solid #262626;' +
    'border-radius:22px;padding:26px 24px 22px;overflow:hidden;' +
    'box-shadow:0 30px 90px rgba(0,0,0,.75),0 0 0 1px rgba(255,255,255,.02);' +
    'font-family:"Plus Jakarta Sans",-apple-system,sans-serif;color:#f5f5f5;font-size:14px;box-sizing:border-box;}' +
    '#_egcard::before{content:"";position:absolute;inset:0;pointer-events:none;' +
    'background:radial-gradient(280px 200px at 100% 0%,rgba(229,231,235,.05),transparent 60%),' +
    'radial-gradient(280px 200px at 0% 100%,rgba(205,127,50,.04),transparent 60%);}' +
    '#_egcard>*{position:relative;}' +
    '#_egclose{position:absolute;top:16px;right:16px;width:32px;height:32px;border-radius:50%;' +
    'background:rgba(255,255,255,.04);color:#7a7a7a;display:flex;align-items:center;' +
    'justify-content:center;border:none;cursor:pointer;transition:.15s;}' +
    '#_egclose:hover{background:rgba(255,255,255,.08);color:#f5f5f5;}' +
    '#_egclose svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;}' +
    '.egk{display:inline-flex;align-items:center;gap:8px;font-family:"JetBrains Mono",monospace;' +
    'font-size:9.5px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:#9ca3af;margin-bottom:6px;}' +
    '.egk::before{content:"";width:6px;height:6px;border-radius:50%;background:#e5e7eb;box-shadow:0 0 8px #e5e7eb;}' +
    '.egt{font-size:28px;font-weight:800;letter-spacing:-.025em;line-height:1.05;margin-bottom:4px;}' +
    '.egt em{font-style:normal;background:linear-gradient(135deg,#fff 0%,#9ca3af 80%);' +
    '-webkit-background-clip:text;background-clip:text;color:transparent;}' +
    '.egsb{font-size:13px;color:#c8c8c8;line-height:1.5;margin-bottom:18px;}' +
    '.egprog{background:linear-gradient(180deg,rgba(0,0,0,.4),rgba(0,0,0,.15));border:1px solid #262626;' +
    'border-radius:14px;padding:14px;display:grid;grid-template-columns:1fr auto 1fr;' +
    'gap:10px;align-items:center;margin-bottom:14px;position:relative;overflow:hidden;}' +
    '.egprog::before{content:"";position:absolute;inset:0;pointer-events:none;' +
    'background:radial-gradient(200px 120px at 50% 50%,rgba(229,231,235,.06),transparent 60%);}' +
    '.egrk{display:flex;align-items:center;gap:10px;padding:6px;border-radius:10px;position:relative;}' +
    '.egrk.tgt{background:rgba(229,231,235,.05);box-shadow:inset 0 0 0 1px rgba(229,231,235,.18);}' +
    '.egsh{width:36px;height:42px;flex-shrink:0;filter:drop-shadow(0 4px 10px rgba(0,0,0,.5));}' +
    '.egmt{display:flex;flex-direction:column;gap:1px;}' +
    '.egmt .eglb{font-family:"JetBrains Mono",monospace;font-size:8.5px;color:#7a7a7a;' +
    'letter-spacing:.16em;text-transform:uppercase;font-weight:800;}' +
    '.egmt .egnm{font-size:14px;font-weight:800;letter-spacing:-.01em;}' +
    '.egrk.tgt .egnm{background:linear-gradient(135deg,#fff,#9ca3af);' +
    '-webkit-background-clip:text;background-clip:text;color:transparent;}' +
    '.egmt .egcf{font-family:"JetBrains Mono",monospace;font-size:9px;color:#7a7a7a;letter-spacing:.06em;font-weight:700;}' +
    '.egar{display:flex;flex-direction:column;align-items:center;gap:4px;}' +
    '.egar .ara{width:22px;height:22px;border-radius:50%;background:rgba(229,231,235,.08);color:#e5e7eb;' +
    'display:flex;align-items:center;justify-content:center;border:1px solid rgba(229,231,235,.18);}' +
    '.egar .ara svg{width:11px;height:11px;stroke:currentColor;fill:none;stroke-width:2.4;}' +
    '.egar span{font-family:"JetBrains Mono",monospace;font-size:8px;color:#9ca3af;letter-spacing:.16em;text-transform:uppercase;font-weight:800;}' +
    '.egst{display:flex;align-items:center;gap:10px;border-radius:11px;padding:10px 14px;' +
    'margin-bottom:12px;background:rgba(255,90,90,.06);border:1px solid rgba(255,90,90,.22);}' +
    '.egst.ok{background:rgba(123,227,123,.06);border-color:rgba(123,227,123,.25);}' +
    '.egsic{width:24px;height:24px;border-radius:7px;flex-shrink:0;display:flex;align-items:center;' +
    'justify-content:center;background:rgba(255,90,90,.12);color:#ff7a8a;}' +
    '.egst.ok .egsic{background:rgba(123,227,123,.12);color:#7BE37B;}' +
    '.egsic svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2.2;}' +
    '.egstx{flex:1;display:flex;flex-direction:column;gap:1px;}' +
    '.egstx b{font-size:13px;font-weight:800;color:#ff7a8a;}' +
    '.egst.ok .egstx b{color:#7BE37B;}' +
    '.egstx span{font-family:"JetBrains Mono",monospace;font-size:10px;color:#7a7a7a;letter-spacing:.04em;}' +
    '.egpc{font-family:"JetBrains Mono",monospace;font-size:14px;font-weight:800;color:#ff7a8a;}' +
    '.egst.ok .egpc{color:#7BE37B;}' +
    '.egpc em{font-style:normal;color:#7a7a7a;font-size:10px;}' +
    '.egqs{display:flex;flex-direction:column;gap:8px;margin-bottom:18px;}' +
    '.egrq{--ec:#ff7a8a;display:grid;grid-template-columns:36px 1fr;gap:12px;padding:13px 14px;' +
    'border-radius:12px;background:#0e0e0e;border:1px solid #262626;position:relative;overflow:hidden;box-sizing:border-box;}' +
    '.egrq.met{--ec:#7BE37B;background:rgba(123,227,123,.04);border-color:rgba(123,227,123,.22);}' +
    '.egrq::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--ec);opacity:.7;}' +
    '.egri{width:36px;height:36px;border-radius:9px;background:rgba(255,122,138,.12);color:var(--ec);' +
    'display:flex;align-items:center;justify-content:center;flex-shrink:0;align-self:flex-start;position:relative;}' +
    '.egrq.met .egri{background:rgba(123,227,123,.12);}' +
    '.egri svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;}' +
    '.egri.fi svg{fill:currentColor;stroke:none;}' +
    '.eglk{position:absolute;right:-3px;bottom:-3px;width:14px;height:14px;border-radius:50%;' +
    'background:#0e0e0e;border:1.5px solid var(--ec);display:flex;align-items:center;justify-content:center;}' +
    '.eglk svg{width:8px;height:8px;stroke:var(--ec);fill:none;stroke-width:2.4;}' +
    '.egrq.met .eglk{background:#7BE37B;border-color:#7BE37B;}' +
    '.egrq.met .eglk svg{stroke:#062a06;}' +
    '.egbd{display:flex;flex-direction:column;gap:6px;min-width:0;}' +
    '.egtp{display:flex;align-items:center;justify-content:space-between;gap:10px;}' +
    '.egrn{font-size:13.5px;font-weight:700;color:#f5f5f5;}' +
    '.egrv{font-family:"JetBrains Mono",monospace;font-size:13px;font-weight:800;color:var(--ec);white-space:nowrap;}' +
    '.egrv .of{color:#7a7a7a;font-weight:700;}' +
    '.egbdg{display:inline-flex;align-items:center;padding:3px 8px;border-radius:6px;font-size:10.5px;letter-spacing:.08em;border:1px solid transparent;}' +
    '.egbr{height:6px;background:rgba(255,255,255,.05);border-radius:3px;overflow:hidden;}' +
    '.egbf{height:100%;border-radius:3px;background:linear-gradient(90deg,rgba(255,90,90,.5),var(--ec));transition:width .8s cubic-bezier(.4,0,.2,1);}' +
    '.egrq.met .egbr{display:none;}' +
    '.egnt{font-family:"JetBrains Mono",monospace;font-size:10px;color:#7a7a7a;letter-spacing:.02em;display:flex;align-items:center;gap:6px;flex-wrap:wrap;}' +
    '.egnt .dl{color:var(--ec);font-weight:800;}' +
    '.egrq.met .egnt{color:#7BE37B;}' +
    '.egrq.met .egnt b{color:#f5f5f5;font-weight:700;}' +
    '.egac{display:flex;gap:10px;margin-bottom:14px;}' +
    '.egbt{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:13px 16px;' +
    'border-radius:11px;font-size:13px;font-weight:700;transition:.15s;' +
    'font-family:"Plus Jakarta Sans",-apple-system,sans-serif;border:none;cursor:pointer;box-sizing:border-box;}' +
    '.egbt svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2.4;}' +
    '.eggh{background:#1a1a1a;color:#f5f5f5;border:1px solid #333!important;}' +
    '.eggh:hover{background:#222;}' +
    '.egloc{flex:1.6;background:rgba(255,122,138,.08);border:1px dashed rgba(255,122,138,.4)!important;color:#ff7a8a;cursor:not-allowed;}' +
    '.egloc .li{width:22px;height:22px;border-radius:6px;background:rgba(255,122,138,.18);display:flex;align-items:center;justify-content:center;}' +
    '.egloc .li svg{width:11px;height:11px;}' +
    '.egloc .lm{display:flex;flex-direction:column;align-items:flex-start;line-height:1.15;}' +
    '.egloc b{font-size:13px;font-weight:800;}' +
    '.egloc span{font-family:"JetBrains Mono",monospace;font-size:9px;color:rgba(255,122,138,.7);letter-spacing:.1em;text-transform:uppercase;font-weight:700;}' +
    '.eggo{flex:1.6;background:#c4ff3d;color:#0c0c0c;font-weight:800;}' +
    '.eggo:hover{background:#a8e02f;}' +
    '.eggo svg{stroke:#0c0c0c;}' +
    '.egft{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding-top:14px;border-top:1px dashed #262626;}' +
    '.egch{display:flex;flex-direction:column;gap:2px;padding:8px 10px;background:rgba(255,255,255,.02);border-radius:9px;}' +
    '.egci{display:flex;align-items:center;gap:6px;font-family:"JetBrains Mono",monospace;font-size:9px;color:#7a7a7a;letter-spacing:.14em;text-transform:uppercase;font-weight:700;}' +
    '.egci svg{width:11px;height:11px;stroke:currentColor;fill:none;stroke-width:2;}' +
    '.egch b{font-family:"JetBrains Mono",monospace;font-size:12px;font-weight:800;color:#f5f5f5;}' +
    '.egch b em{color:#c4ff3d;font-style:normal;}';
  document.head.appendChild(_st);

  /* 3. SVG defs */
  var _df = document.createElement('div');
  _df.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';
  _df.innerHTML = '<svg><defs><symbol id="egsh" viewBox="0 0 60 68">' +
    '<path d="M30,3 L54,11 L54,32 Q54,52 30,65 Q6,52 6,32 L6,11 Z" fill="currentColor" stroke="rgba(0,0,0,.55)" stroke-width="2"/>' +
    '<path d="M30,3 L54,11 L54,32 Q54,52 30,65 Q6,52 6,32 L6,11 Z" fill="url(#egshine)"/>' +
    '<path d="M30,9 L50,16 L50,32 Q50,49 30,60 Q10,49 10,32 L10,16 Z" fill="none" stroke="rgba(0,0,0,.4)" stroke-width="1"/>' +
    '</symbol><linearGradient id="egshine" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#fff" stop-opacity="0.45"/>' +
    '<stop offset="0.5" stop-color="#fff" stop-opacity="0"/>' +
    '</linearGradient></defs></svg>';
  document.body.appendChild(_df);

  /* 4. HTML */
  var _ov = document.createElement('div');
  _ov.id = '_egov';
  _ov.innerHTML =
    '<div id="_egcard" role="dialog" aria-modal="true">' +
      '<button id="_egclose"><svg viewBox="0 0 24 24"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button>' +
      '<div class="egk">examen de ascenso</div>' +
      '<div class="egt">Sube a <em id="eg_tn">-</em></div>' +
      '<div class="egsb">Cumple los requisitos para habilitar tu examen de ascenso.</div>' +
      '<div class="egprog">' +
        '<div class="egrk"><svg class="egsh" id="eg_fs"><use href="#egsh"/></svg>' +
          '<div class="egmt"><span class="eglb">rango actual</span><span class="egnm" id="eg_fn">-</span><span class="egcf" id="eg_fc">-</span></div></div>' +
        '<div class="egar"><div class="ara"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg></div><span>asciende</span></div>' +
        '<div class="egrk tgt"><svg class="egsh" id="eg_ts"><use href="#egsh"/></svg>' +
          '<div class="egmt"><span class="eglb">proximo rango</span><span class="egnm" id="eg_ton">-</span><span class="egcf" id="eg_tc">-</span></div></div>' +
      '</div>' +
      '<div class="egst" id="eg_st">' +
        '<div class="egsic"><svg id="eg_sv" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>' +
        '<div class="egstx"><b id="eg_sm">Verificando...</b><span id="eg_sh">cargando perfil</span></div>' +
        '<div class="egpc" id="eg_sc">-</div>' +
      '</div>' +
      '<div class="egqs">' +
        '<article class="egrq" id="eg_niv"><div class="egri fi">' +
          '<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" stroke="none"/></svg>' +
          '<div class="eglk"><svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div></div>' +
          '<div class="egbd"><div class="egtp"><span class="egrn">Nivel minimo</span>' +
            '<span class="egrv"><span id="eg_nc">-</span><span class="of"> / <span id="eg_nr">-</span></span></span></div>' +
            '<div class="egbr"><div class="egbf" id="eg_nb" style="width:0%"></div></div>' +
            '<span class="egnt"><span class="dl" id="eg_nd">- -</span><span id="eg_nn"></span></span></div></article>' +
        '<article class="egrq" id="eg_pm"><div class="egri fi">' +
          '<svg viewBox="0 0 24 24"><path d="M12 2l3 6 6 1-4.5 4.5L18 19l-6-3-6 3 1.5-6.5L3 8l6-1z"/></svg>' +
          '<div class="eglk"><svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div></div>' +
          '<div class="egbd"><div class="egtp"><span class="egrn">Puntos de Merito</span>' +
            '<span class="egrv"><span id="eg_pc">-</span><span class="of"> / <span id="eg_pr">-</span></span></span></div>' +
            '<div class="egbr"><div class="egbf" id="eg_pb" style="width:0%"></div></div>' +
            '<span class="egnt"><span class="dl" id="eg_pd">- -</span><span id="eg_pn"></span></span></div></article>' +
        '<article class="egrq met" id="eg_rng"><div class="egri">' +
          '<svg viewBox="0 0 60 68" style="width:20px;height:20px"><use href="#egsh"/></svg>' +
          '<div class="eglk"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div></div>' +
          '<div class="egbd"><div class="egtp"><span class="egrn">Rango actual</span>' +
            '<span class="egrv"><span class="egbdg" id="eg_bdg">-</span></span></div>' +
            '<span class="egnt">- <b>Cumplido</b> - estas en el rango requerido</span></div></article>' +
      '</div>' +
      '<div class="egac">' +
        '<button class="egbt eggh" id="eg_bk"><svg viewBox="0 0 24 24"><path d="M19 12H5M11 19l-7-7 7-7"/></svg>Volver</button>' +
        '<button class="egbt egloc" id="eg_lok" aria-disabled="true">' +
          '<div class="li"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>' +
          '<div class="lm"><b>Examen bloqueado</b><span id="eg_bh">completa los requisitos</span></div></button>' +
        '<button class="egbt eggo" id="eg_go" style="display:none">' +
          '<svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none"/></svg>Comenzar examen</button>' +
      '</div>' +
      '<div class="egft">' +
        '<div class="egch"><span class="egci"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9c-2.5 0-4.8 1-6.5 2.7L3 8M3 3v5h5"/></svg>Intentos</span><b><em>3</em> / ciclo</b></div>' +
        '<div class="egch"><span class="egci"><svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M21 12c0 5-3.5 8-9 9-5.5-1-9-4-9-9V5l9-4 9 4z"/></svg>Aprobar</span><b><em>720</em> / 1000</b></div>' +
        '<div class="egch"><span class="egci"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>Cooldown</span><b><em>7</em> dias</b></div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(_ov);

  /* 5. Cerrar */
  document.getElementById('_egclose').onclick = function () { _ov.style.display = 'none'; };
  document.getElementById('eg_bk').onclick    = function () { _ov.style.display = 'none'; };
  _ov.onclick = function (e) { if (e.target === _ov) _ov.style.display = 'none'; };

  /* 6. Datos */
  var REQS = {1:{n:20,p:5000},2:{n:40,p:15000},3:{n:55,p:28000},4:{n:70,p:45000},5:{n:85,p:75000}};
  var RNKS = {
    bronce:    {name:'Bronce',    cefr:'A1 - basico',     color:'#cd7f32',h:'#f4b86b'},
    plata:     {name:'Plata',     cefr:'A2 - elemental',  color:'#c0c0c0',h:'#e5e7eb'},
    oro:       {name:'Oro',       cefr:'B1 - intermedio', color:'#fbbf24',h:'#fde68a'},
    platino:   {name:'Platino',   cefr:'B2 - avanzado',   color:'#a78bfa',h:'#c4b5fd'},
    diamante:  {name:'Diamante',  cefr:'C1 - competente', color:'#67e8f9',h:'#a5f3fc'},
    challenger:{name:'Challenger',cefr:'C2 - maestria',   color:'#c4ff3d',h:'#c4ff3d'}
  };
  var VR = {1:{f:'bronce',t:'plata'},2:{f:'plata',t:'oro'},3:{f:'oro',t:'platino'},4:{f:'platino',t:'diamante'},5:{f:'diamante',t:'challenger'}};
  var RV = {'Bronce':1,'Plata':2,'Oro':3,'Platino':4,'Diamante':5,'Challenger':5};
  function _fmt(n){return Number(n).toLocaleString('es-CO');}
  function _g(id){return document.getElementById(id);}

  function _render(nivel, pm, rango) {
    var v=RV[rango]||1, req=REQS[v], vr=VR[v], fr=RNKS[vr.f], tr=RNKS[vr.t];
    if(!fr||!tr||!req) return;
    _g('eg_tn').textContent=tr.name; _g('eg_ton').textContent=tr.name;
    _g('eg_fs').style.color=fr.color;
    var fn=_g('eg_fn'); fn.textContent=fr.name; fn.style.color=fr.h;
    _g('eg_fc').textContent=fr.cefr;
    _g('eg_ts').style.color=tr.color;
    _g('eg_ts').style.filter='drop-shadow(0 4px 14px '+tr.color+'4d)';
    _g('eg_tc').textContent=tr.cefr;
    var mL=nivel>=req.n, mP=pm>=req.p, ms=(!mL?1:0)+(!mP?1:0);
    var st=_g('eg_st');
    if(ms===0){
      st.className='egst ok';
      _g('eg_sv').innerHTML='<polyline points="20 6 9 17 4 12"/>';
      _g('eg_sm').textContent='Listo! cumples todos los requisitos';
      _g('eg_sh').textContent='puedes presentar tu examen de ascenso';
      _g('eg_sc').innerHTML='<em>2</em> / 2'; _g('eg_sc').style.color='#7BE37B';
      _g('eg_lok').style.display='none'; _g('eg_go').style.display='flex';
    } else {
      st.className='egst';
      _g('eg_sv').innerHTML='<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>';
      _g('eg_sm').textContent='Bloqueado - '+(ms===1?'te falta 1 requisito':'te faltan '+ms+' requisitos');
      _g('eg_sh').textContent='completa los marcados en rojo para desbloquear';
      _g('eg_sc').innerHTML='<em>'+(2-ms)+'</em> / 2'; _g('eg_sc').style.color='';
      _g('eg_lok').style.display='flex'; _g('eg_go').style.display='none';
      _g('eg_bh').textContent='completa '+ms+' requisito'+(ms>1?'s':'');
    }
    var lp=Math.min(100,Math.round((nivel/req.n)*100));
    _g('eg_nc').textContent=nivel; _g('eg_nr').textContent=req.n; _g('eg_nb').style.width=lp+'%';
    _g('eg_niv').className='egrq'+(mL?' met':'');
    if(mL){_g('eg_nd').textContent='Nivel alcanzado';_g('eg_nn').textContent='';}
    else{var fl=req.n-nivel;_g('eg_nd').textContent='Faltan '+fl+' nivel'+(fl!==1?'es':'');_g('eg_nn').textContent=' - tienes '+nivel+', necesitas '+req.n;}
    var pp=Math.min(100,Math.round((pm/req.p)*100));
    _g('eg_pc').textContent=_fmt(pm); _g('eg_pr').textContent=_fmt(req.p); _g('eg_pb').style.width=pp+'%';
    _g('eg_pm').className='egrq'+(mP?' met':'');
    if(mP){_g('eg_pd').textContent='Puntos de Merito suficientes';_g('eg_pn').textContent='';}
    else{var fp=req.p-pm;_g('eg_pd').textContent='Faltan '+_fmt(fp)+' PM';_g('eg_pn').textContent=' - tienes '+_fmt(pm)+', necesitas '+_fmt(req.p);}
    var bdg=_g('eg_bdg');
    bdg.textContent='- '+fr.name; bdg.style.color=fr.h;
    bdg.style.background=fr.color+'1f'; bdg.style.borderColor=fr.color+'4d';
    _g('eg_go').onclick=function(){window.location.href='examen-ascenso.html?v='+v;};
  }

  var _att=0;
  function _load(){
    var p=window._aura&&window._aura.profile, lp=window._aura&&window._aura.lang_progress;
    _att++;
    if(!p){setTimeout(_load,300);return;}
    if(!lp&&_att<12){setTimeout(_load,250);return;}
    _render(parseInt((lp?lp.nivel:p.nivel)||1,10)||1,parseInt((lp?lp.merit_pm:p.merit_pm)||0,10)||0,(lp?lp.rango:p.rango)||'Bronce');
  }

  window.openExamGate=function(){
    _ov.style.display='flex';
    var p=window._aura&&window._aura.profile, lp=window._aura&&window._aura.lang_progress;
    if(p&&(lp||_att>=12)){
      _render(parseInt((lp?lp.nivel:p.nivel)||1,10)||1,parseInt((lp?lp.merit_pm:p.merit_pm)||0,10)||0,(lp?lp.rango:p.rango)||'Bronce');
    } else {_att=0;_load();}
  };

})();

// exam-gate.js — Modal de requisitos del examen, inyectado desde aura-shell.js
// Patrón: igual que aura-toast.js. Todo el código aquí, cero riesgo al shell.
(function () {
  if (window._examGateInited) return;
  window._examGateInited = true;

  /* ── CSS ─────────────────────────────────────────────────────────────── */
  var st = document.createElement('style');
  st.textContent =
    '#_egov{position:fixed;inset:0;z-index:10000;background:rgba(5,5,5,.97);' +
    'backdrop-filter:blur(20px);display:none;align-items:center;justify-content:center;padding:24px;}' +
    '#_egov::before{content:"";position:absolute;inset:0;pointer-events:none;' +
    'background-image:repeating-linear-gradient(45deg,transparent 0,transparent 22px,' +
    'rgba(255,255,255,.012) 22px,rgba(255,255,255,.012) 23px);}' +
    '#_egcard{position:relative;width:min(460px,100%);background:#171717;border:1px solid #262626;' +
    'border-radius:22px;padding:26px 24px 22px;' +
    'box-shadow:0 30px 90px rgba(0,0,0,.75),0 0 0 1px rgba(255,255,255,.02);' +
    'overflow:hidden;font-family:"Plus Jakarta Sans",-apple-system,sans-serif;' +
    'color:#f5f5f5;font-size:14px;box-sizing:border-box;}' +
    '#_egcard::before{content:"";position:absolute;inset:0;pointer-events:none;' +
    'background:radial-gradient(280px 200px at 100% 0%,rgba(229,231,235,.05),transparent 60%),' +
    'radial-gradient(280px 200px at 0% 100%,rgba(205,127,50,.04),transparent 60%);}' +
    '#_egcard>*{position:relative;}' +
    '#_egclose{position:absolute;top:16px;right:16px;width:32px;height:32px;border-radius:50%;' +
    'background:rgba(255,255,255,.04);color:#7a7a7a;display:flex;align-items:center;' +
    'justify-content:center;border:none;cursor:pointer;transition:.15s;}' +
    '#_egclose:hover{background:rgba(255,255,255,.08);color:#f5f5f5;}' +
    '#_egclose svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;}' +
    '.eg2kick{display:inline-flex;align-items:center;gap:8px;font-family:"JetBrains Mono",monospace;' +
    'font-size:9.5px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:#9ca3af;margin-bottom:6px;}' +
    '.eg2kick::before{content:"";width:6px;height:6px;border-radius:50%;background:#e5e7eb;box-shadow:0 0 8px #e5e7eb;}' +
    '.eg2title{font-size:28px;font-weight:800;letter-spacing:-.025em;line-height:1.05;margin-bottom:4px;}' +
    '.eg2title em{font-style:normal;background:linear-gradient(135deg,#fff 0%,#9ca3af 80%);' +
    '-webkit-background-clip:text;background-clip:text;color:transparent;}' +
    '.eg2sub{font-size:13px;color:#c8c8c8;line-height:1.5;margin-bottom:18px;}' +
    '.eg2prog{background:linear-gradient(180deg,rgba(0,0,0,.4),rgba(0,0,0,.15));' +
    'border:1px solid #262626;border-radius:14px;padding:14px;' +
    'display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;' +
    'margin-bottom:14px;position:relative;overflow:hidden;}' +
    '.eg2prog::before{content:"";position:absolute;inset:0;pointer-events:none;' +
    'background:radial-gradient(200px 120px at 50% 50%,rgba(229,231,235,.06),transparent 60%);}' +
    '.eg2rank{display:flex;align-items:center;gap:10px;padding:6px;border-radius:10px;position:relative;}' +
    '.eg2rank.tgt{background:rgba(229,231,235,.05);box-shadow:inset 0 0 0 1px rgba(229,231,235,.18);}' +
    '.eg2shield{width:36px;height:42px;flex-shrink:0;filter:drop-shadow(0 4px 10px rgba(0,0,0,.5));}' +
    '.eg2meta{display:flex;flex-direction:column;gap:1px;}' +
    '.eg2meta .eg2lbl{font-family:"JetBrains Mono",monospace;font-size:8.5px;color:#7a7a7a;' +
    'letter-spacing:.16em;text-transform:uppercase;font-weight:800;}' +
    '.eg2meta .eg2nm{font-size:14px;font-weight:800;letter-spacing:-.01em;}' +
    '.eg2rank.tgt .eg2nm{background:linear-gradient(135deg,#fff,#9ca3af);' +
    '-webkit-background-clip:text;background-clip:text;color:transparent;}' +
    '.eg2meta .eg2cefr{font-family:"JetBrains Mono",monospace;font-size:9px;color:#7a7a7a;letter-spacing:.06em;font-weight:700;}' +
    '.eg2arrow{display:flex;flex-direction:column;align-items:center;gap:4px;}' +
    '.eg2arrow .eg2ar{width:22px;height:22px;border-radius:50%;background:rgba(229,231,235,.08);' +
    'color:#e5e7eb;display:flex;align-items:center;justify-content:center;border:1px solid rgba(229,231,235,.18);}' +
    '.eg2arrow .eg2ar svg{width:11px;height:11px;stroke:currentColor;fill:none;stroke-width:2.4;}' +
    '.eg2arrow span{font-family:"JetBrains Mono",monospace;font-size:8px;color:#9ca3af;' +
    'letter-spacing:.16em;text-transform:uppercase;font-weight:800;}' +
    '.eg2stat{display:flex;align-items:center;gap:10px;border-radius:11px;padding:10px 14px;' +
    'margin-bottom:12px;background:rgba(255,90,90,.06);border:1px solid rgba(255,90,90,.22);}' +
    '.eg2stat.ok{background:rgba(123,227,123,.06);border-color:rgba(123,227,123,.25);}' +
    '.eg2sic{width:24px;height:24px;border-radius:7px;flex-shrink:0;display:flex;align-items:center;' +
    'justify-content:center;background:rgba(255,90,90,.12);color:#ff7a8a;}' +
    '.eg2stat.ok .eg2sic{background:rgba(123,227,123,.12);color:#7BE37B;}' +
    '.eg2sic svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2.2;}' +
    '.eg2stxt{flex:1;display:flex;flex-direction:column;gap:1px;}' +
    '.eg2stxt b{font-size:13px;font-weight:800;color:#ff7a8a;}' +
    '.eg2stat.ok .eg2stxt b{color:#7BE37B;}' +
    '.eg2stxt span{font-family:"JetBrains Mono",monospace;font-size:10px;color:#7a7a7a;letter-spacing:.04em;}' +
    '.eg2spct{font-family:"JetBrains Mono",monospace;font-size:14px;font-weight:800;color:#ff7a8a;}' +
    '.eg2stat.ok .eg2spct{color:#7BE37B;}' +
    '.eg2spct em{font-style:normal;color:#7a7a7a;font-size:10px;}' +
    '.eg2reqs{display:flex;flex-direction:column;gap:8px;margin-bottom:18px;}' +
    '.eg2req{--egc:#ff7a8a;display:grid;grid-template-columns:36px 1fr;gap:12px;' +
    'padding:13px 14px;border-radius:12px;background:#0e0e0e;border:1px solid #262626;' +
    'position:relative;overflow:hidden;box-sizing:border-box;}' +
    '.eg2req.met{--egc:#7BE37B;background:rgba(123,227,123,.04);border-color:rgba(123,227,123,.22);}' +
    '.eg2req::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--egc);opacity:.7;}' +
    '.eg2ric{width:36px;height:36px;border-radius:9px;background:rgba(255,122,138,.12);color:var(--egc);' +
    'display:flex;align-items:center;justify-content:center;flex-shrink:0;align-self:flex-start;position:relative;}' +
    '.eg2req.met .eg2ric{background:rgba(123,227,123,.12);}' +
    '.eg2ric svg{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;}' +
    '.eg2ric.fill svg{fill:currentColor;stroke:none;}' +
    '.eg2lk{position:absolute;right:-3px;bottom:-3px;width:14px;height:14px;border-radius:50%;' +
    'background:#0e0e0e;border:1.5px solid var(--egc);display:flex;align-items:center;justify-content:center;}' +
    '.eg2lk svg{width:8px;height:8px;stroke:var(--egc);fill:none;stroke-width:2.4;}' +
    '.eg2req.met .eg2lk{background:#7BE37B;border-color:#7BE37B;}' +
    '.eg2req.met .eg2lk svg{stroke:#062a06;}' +
    '.eg2body{display:flex;flex-direction:column;gap:6px;min-width:0;}' +
    '.eg2top{display:flex;align-items:center;justify-content:space-between;gap:10px;}' +
    '.eg2rname{font-size:13.5px;font-weight:700;color:#f5f5f5;}' +
    '.eg2rval{font-family:"JetBrains Mono",monospace;font-size:13px;font-weight:800;color:var(--egc);white-space:nowrap;}' +
    '.eg2rval .of{color:#7a7a7a;font-weight:700;}' +
    '.eg2rval .bdg{display:inline-flex;align-items:center;padding:3px 8px;border-radius:6px;font-size:10.5px;letter-spacing:.08em;border:1px solid transparent;}' +
    '.eg2bar{height:6px;background:rgba(255,255,255,.05);border-radius:3px;overflow:hidden;}' +
    '.eg2fill{height:100%;border-radius:3px;background:linear-gradient(90deg,rgba(255,90,90,.5),var(--egc));transition:width .8s cubic-bezier(.4,0,.2,1);}' +
    '.eg2req.met .eg2bar{display:none;}' +
    '.eg2note{font-family:"JetBrains Mono",monospace;font-size:10px;color:#7a7a7a;' +
    'letter-spacing:.02em;display:flex;align-items:center;gap:6px;flex-wrap:wrap;}' +
    '.eg2note .dl{color:var(--egc);font-weight:800;}' +
    '.eg2req.met .eg2note{color:#7BE37B;}' +
    '.eg2req.met .eg2note b{color:#f5f5f5;font-weight:700;}' +
    '.eg2acts{display:flex;gap:10px;margin-bottom:14px;}' +
    '.eg2btn{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;' +
    'padding:13px 16px;border-radius:11px;font-size:13px;font-weight:700;transition:.15s;' +
    'font-family:"Plus Jakarta Sans",-apple-system,sans-serif;border:none;cursor:pointer;box-sizing:border-box;}' +
    '.eg2btn svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2.4;}' +
    '.eg2gho{background:#1a1a1a;color:#f5f5f5;border:1px solid #333 !important;}' +
    '.eg2gho:hover{background:#222;}' +
    '.eg2lok{flex:1.6;background:rgba(255,122,138,.08);border:1px dashed rgba(255,122,138,.4) !important;color:#ff7a8a;cursor:not-allowed;}' +
    '.eg2lok .li{width:22px;height:22px;border-radius:6px;background:rgba(255,122,138,.18);display:flex;align-items:center;justify-content:center;}' +
    '.eg2lok .li svg{width:11px;height:11px;}' +
    '.eg2lok .lm{display:flex;flex-direction:column;align-items:flex-start;line-height:1.15;}' +
    '.eg2lok b{font-size:13px;font-weight:800;}' +
    '.eg2lok span{font-family:"JetBrains Mono",monospace;font-size:9px;color:rgba(255,122,138,.7);letter-spacing:.1em;text-transform:uppercase;font-weight:700;}' +
    '.eg2sta{flex:1.6;background:#c4ff3d;color:#0c0c0c;font-weight:800;}' +
    '.eg2sta:hover{background:#a8e02f;}' +
    '.eg2sta svg{stroke:#0c0c0c;}' +
    '.eg2foot{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding-top:14px;border-top:1px dashed #262626;}' +
    '.eg2chip{display:flex;flex-direction:column;gap:2px;padding:8px 10px;background:rgba(255,255,255,.02);border-radius:9px;}' +
    '.eg2chic{display:flex;align-items:center;gap:6px;font-family:"JetBrains Mono",monospace;' +
    'font-size:9px;color:#7a7a7a;letter-spacing:.14em;text-transform:uppercase;font-weight:700;}' +
    '.eg2chic svg{width:11px;height:11px;stroke:currentColor;fill:none;stroke-width:2;}' +
    '.eg2chip b{font-family:"JetBrains Mono",monospace;font-size:12px;font-weight:800;color:#f5f5f5;}' +
    '.eg2chip b em{color:#c4ff3d;font-style:normal;}';
  document.head.appendChild(st);

  /* ── SVG defs para escudos ───────────────────────────────────────────── */
  var defs = document.createElement('div');
  defs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';
  defs.innerHTML =
    '<svg><defs>' +
    '<symbol id="eg2sh" viewBox="0 0 60 68">' +
    '<path d="M30,3 L54,11 L54,32 Q54,52 30,65 Q6,52 6,32 L6,11 Z" fill="currentColor" stroke="rgba(0,0,0,.55)" stroke-width="2"/>' +
    '<path d="M30,3 L54,11 L54,32 Q54,52 30,65 Q6,52 6,32 L6,11 Z" fill="url(#eg2shine)"/>' +
    '<path d="M30,9 L50,16 L50,32 Q50,49 30,60 Q10,49 10,32 L10,16 Z" fill="none" stroke="rgba(0,0,0,.4)" stroke-width="1"/>' +
    '</symbol>' +
    '<linearGradient id="eg2shine" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#fff" stop-opacity="0.45"/>' +
    '<stop offset="0.5" stop-color="#fff" stop-opacity="0"/>' +
    '</linearGradient></defs></svg>';
  document.body.appendChild(defs);

  /* ── HTML del modal ──────────────────────────────────────────────────── */
  var ov = document.createElement('div');
  ov.id = '_egov';
  ov.innerHTML =
    '<div id="_egcard" role="dialog" aria-modal="true">' +
      '<button id="_egclose"><svg viewBox="0 0 24 24"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button>' +
      '<div class="eg2kick">examen de ascenso</div>' +
      '<div class="eg2title">Sube a <em id="eg2tn">—</em></div>' +
      '<div class="eg2sub">Cumple los requisitos para habilitar tu examen de ascenso.</div>' +
      '<div class="eg2prog">' +
        '<div class="eg2rank">' +
          '<svg class="eg2shield" id="eg2fs"><use href="#eg2sh"/></svg>' +
          '<div class="eg2meta"><span class="eg2lbl">rango actual</span><span class="eg2nm" id="eg2fn">—</span><span class="eg2cefr" id="eg2fc">—</span></div>' +
        '</div>' +
        '<div class="eg2arrow"><div class="eg2ar"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg></div><span>asciende</span></div>' +
        '<div class="eg2rank tgt">' +
          '<svg class="eg2shield" id="eg2ts"><use href="#eg2sh"/></svg>' +
          '<div class="eg2meta"><span class="eg2lbl">próximo rango</span><span class="eg2nm" id="eg2ton">—</span><span class="eg2cefr" id="eg2tc">—</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="eg2stat" id="eg2st">' +
        '<div class="eg2sic"><svg id="eg2sv" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>' +
        '<div class="eg2stxt"><b id="eg2sm">Verificando…</b><span id="eg2sh2">cargando perfil</span></div>' +
        '<div class="eg2spct" id="eg2sc">—</div>' +
      '</div>' +
      '<div class="eg2reqs">' +
        '<article class="eg2req" id="eg2nivel">' +
          '<div class="eg2ric fill"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" stroke="none"/></svg><div class="eg2lk"><svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div></div>' +
          '<div class="eg2body"><div class="eg2top"><span class="eg2rname">Nivel mínimo</span><span class="eg2rval"><span id="eg2nc">—</span><span class="of"> / <span id="eg2nr">—</span></span></span></div>' +
          '<div class="eg2bar"><div class="eg2fill" id="eg2nb" style="width:0%"></div></div>' +
          '<span class="eg2note"><span class="dl" id="eg2nd">▸ —</span><span id="eg2nn"></span></span></div>' +
        '</article>' +
        '<article class="eg2req" id="eg2pm">' +
          '<div class="eg2ric fill"><svg viewBox="0 0 24 24"><path d="M12 2l3 6 6 1-4.5 4.5L18 19l-6-3-6 3 1.5-6.5L3 8l6-1z"/></svg><div class="eg2lk"><svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div></div>' +
          '<div class="eg2body"><div class="eg2top"><span class="eg2rname">Puntos de Mérito</span><span class="eg2rval"><span id="eg2pc">—</span><span class="of"> / <span id="eg2pr">—</span></span></span></div>' +
          '<div class="eg2bar"><div class="eg2fill" id="eg2pb" style="width:0%"></div></div>' +
          '<span class="eg2note"><span class="dl" id="eg2pd">▸ —</span><span id="eg2pn"></span></span></div>' +
        '</article>' +
        '<article class="eg2req met" id="eg2rng">' +
          '<div class="eg2ric"><svg viewBox="0 0 60 68" style="width:20px;height:20px"><use href="#eg2sh"/></svg><div class="eg2lk"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div></div>' +
          '<div class="eg2body"><div class="eg2top"><span class="eg2rname">Rango actual</span><span class="eg2rval"><span class="bdg" id="eg2bdg">—</span></span></div>' +
          '<span class="eg2note">▸ <b>Cumplido</b> · estás en el rango requerido</span></div>' +
        '</article>' +
      '</div>' +
      '<div class="eg2acts">' +
        '<button class="eg2btn eg2gho" id="eg2bk"><svg viewBox="0 0 24 24"><path d="M19 12H5M11 19l-7-7 7-7"/></svg>Volver</button>' +
        '<button class="eg2btn eg2lok" id="eg2lok" aria-disabled="true"><div class="li"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div><div class="lm"><b>Examen bloqueado</b><span id="eg2bh">completa los requisitos</span></div></button>' +
        '<button class="eg2btn eg2sta" id="eg2sta" style="display:none"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none"/></svg>Comenzar examen</button>' +
      '</div>' +
      '<div class="eg2foot">' +
        '<div class="eg2chip"><span class="eg2chic"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9c-2.5 0-4.8 1-6.5 2.7L3 8M3 3v5h5"/></svg>Intentos</span><b><em>3</em> / ciclo</b></div>' +
        '<div class="eg2chip"><span class="eg2chic"><svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M21 12c0 5-3.5 8-9 9-5.5-1-9-4-9-9V5l9-4 9 4z"/></svg>Aprobar</span><b><em>720</em> / 1000</b></div>' +
        '<div class="eg2chip"><span class="eg2chic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>Cooldown</span><b><em>7</em> días</b></div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(ov);

  /* ── Cerrar ──────────────────────────────────────────────────────────── */
  document.getElementById('_egclose').onclick = function () { ov.style.display = 'none'; };
  document.getElementById('eg2bk').onclick    = function () { ov.style.display = 'none'; };
  ov.onclick = function (e) { if (e.target === ov) ov.style.display = 'none'; };

  /* ── Datos ───────────────────────────────────────────────────────────── */
  var REQS = {
    1: {nivel:20,  pm:5000},
    2: {nivel:40,  pm:15000},
    3: {nivel:55,  pm:28000},
    4: {nivel:70,  pm:45000},
    5: {nivel:85,  pm:75000}
  };
  var RKS = {
    bronce:    {name:'Bronce',    cefr:'A1 · básico',     color:'#cd7f32', colorH:'#f4b86b'},
    plata:     {name:'Plata',     cefr:'A2 · elemental',  color:'#c0c0c0', colorH:'#e5e7eb'},
    oro:       {name:'Oro',       cefr:'B1 · intermedio', color:'#fbbf24', colorH:'#fde68a'},
    platino:   {name:'Platino',   cefr:'B2 · avanzado',   color:'#a78bfa', colorH:'#c4b5fd'},
    diamante:  {name:'Diamante',  cefr:'C1 · competente', color:'#67e8f9', colorH:'#a5f3fc'},
    challenger:{name:'Challenger',cefr:'C2 · maestría',   color:'#c4ff3d', colorH:'#c4ff3d'}
  };
  var VR = {1:{f:'bronce',t:'plata'},2:{f:'plata',t:'oro'},3:{f:'oro',t:'platino'},4:{f:'platino',t:'diamante'},5:{f:'diamante',t:'challenger'}};
  var RV = {'Bronce':1,'Plata':2,'Oro':3,'Platino':4,'Diamante':5,'Challenger':5};

  function fmt(n) { return Number(n).toLocaleString('es-CO'); }
  function g(id)  { return document.getElementById(id); }

  function render(nivel, pm, rango) {
    var v   = RV[rango] || 1;
    var req = REQS[v];
    var vr  = VR[v];
    var fr  = RKS[vr.f];
    var tr  = RKS[vr.t];
    if (!fr || !tr || !req) return;

    g('eg2tn').textContent  = tr.name;
    g('eg2ton').textContent = tr.name;
    g('eg2fs').style.color  = fr.color;
    var fn = g('eg2fn'); fn.textContent = fr.name; fn.style.color = fr.colorH;
    g('eg2fc').textContent  = fr.cefr;
    g('eg2ts').style.color  = tr.color;
    g('eg2ts').style.filter = 'drop-shadow(0 4px 14px ' + tr.color + '4d)';
    g('eg2tc').textContent  = tr.cefr;

    var metLvl  = nivel >= req.nivel;
    var metPM   = pm    >= req.pm;
    var missing = (!metLvl ? 1 : 0) + (!metPM ? 1 : 0);
    var met     = 2 - missing;

    var st = g('eg2st');
    if (missing === 0) {
      st.className = 'eg2stat ok';
      g('eg2sv').innerHTML   = '<polyline points="20 6 9 17 4 12"/>';
      g('eg2sm').textContent = '¡Listo! cumples todos los requisitos';
      g('eg2sh2').textContent = 'puedes presentar tu examen de ascenso';
      g('eg2sc').innerHTML   = '<em>2</em> / 2';
      g('eg2sc').style.color = '#7BE37B';
      g('eg2lok').style.display = 'none';
      g('eg2sta').style.display = 'flex';
    } else {
      st.className = 'eg2stat';
      g('eg2sv').innerHTML    = '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>';
      g('eg2sm').textContent  = 'Bloqueado · ' + (missing === 1 ? 'te falta 1 requisito' : 'te faltan ' + missing + ' requisitos');
      g('eg2sh2').textContent = 'completa los marcados en rojo para desbloquear';
      g('eg2sc').innerHTML    = '<em>' + met + '</em> / 2';
      g('eg2sc').style.color  = '';
      g('eg2lok').style.display = 'flex';
      g('eg2sta').style.display = 'none';
      g('eg2bh').textContent  = 'completa ' + missing + ' requisito' + (missing > 1 ? 's' : '');
    }

    var lvlPct = Math.min(100, Math.round((nivel / req.nivel) * 100));
    g('eg2nc').textContent = nivel;
    g('eg2nr').textContent = req.nivel;
    g('eg2nb').style.width = lvlPct + '%';
    g('eg2nivel').className = 'eg2req' + (metLvl ? ' met' : '');
    if (metLvl) {
      g('eg2nd').textContent = '▸ Nivel alcanzado';
      g('eg2nn').textContent = '';
    } else {
      var fl = req.nivel - nivel;
      g('eg2nd').textContent = '▸ Faltan ' + fl + ' nivel' + (fl !== 1 ? 'es' : '');
      g('eg2nn').textContent = ' · tienes ' + nivel + ', necesitas ' + req.nivel;
    }

    var pmPct = Math.min(100, Math.round((pm / req.pm) * 100));
    g('eg2pc').textContent = fmt(pm);
    g('eg2pr').textContent = fmt(req.pm);
    g('eg2pb').style.width = pmPct + '%';
    g('eg2pm').className   = 'eg2req' + (metPM ? ' met' : '');
    if (metPM) {
      g('eg2pd').textContent = '▸ Puntos de Mérito suficientes';
      g('eg2pn').textContent = '';
    } else {
      var fp = req.pm - pm;
      g('eg2pd').textContent = '▸ Faltan ' + fmt(fp) + ' PM';
      g('eg2pn').textContent = ' · tienes ' + fmt(pm) + ', necesitas ' + fmt(req.pm);
    }

    var bdg = g('eg2bdg');
    bdg.textContent    = '● ' + fr.name;
    bdg.style.color    = fr.colorH;
    bdg.style.background  = fr.color + '1f';
    bdg.style.borderColor = fr.color + '4d';

    g('eg2sta').onclick = function () {
      window.location.href = 'examen-ascenso.html?v=' + v;
    };
  }

  var _att = 0;
  function load() {
    var p  = window._aura && window._aura.profile;
    var lp = window._aura && window._aura.lang_progress;
    _att++;
    if (!p) { setTimeout(load, 300); return; }
    if (!lp && _att < 12) { setTimeout(load, 250); return; }
    var nivel = parseInt((lp ? lp.nivel : p.nivel) || 1, 10) || 1;
    var pm    = parseInt((lp ? lp.merit_pm : p.merit_pm) || 0, 10) || 0;
    var rango = (lp ? lp.rango : p.rango) || 'Bronce';
    render(nivel, pm, rango);
  }

  /* ── API pública ─────────────────────────────────────────────────────── */
  window.openExamGate = function () {
    ov.style.display = 'flex';
    var p  = window._aura && window._aura.profile;
    var lp = window._aura && window._aura.lang_progress;
    if (p && (lp || _att >= 12)) {
      var nivel = parseInt((lp ? lp.nivel : p.nivel) || 1, 10) || 1;
      var pm    = parseInt((lp ? lp.merit_pm : p.merit_pm) || 0, 10) || 0;
      var rango = (lp ? lp.rango : p.rango) || 'Bronce';
      render(nivel, pm, rango);
    } else {
      _att = 0;
      load();
    }
  };

  /* ── Cablear botón Examen en sidebar (índice 4) y mobile tab (último) ── */
  function wireButtons() {
    var slBtns = document.querySelectorAll('.aura-sl-btn');
    if (slBtns[4]) slBtns[4].onclick = function () { window.openExamGate(); };
    var mobTabs = document.querySelectorAll('._mob-tab');
    if (mobTabs.length) mobTabs[mobTabs.length - 1].onclick = function () { window.openExamGate(); };
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireButtons);
  } else {
    wireButtons();
  }

})();

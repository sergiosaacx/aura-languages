(function(){
  var REQS = {
    1:{nivel:20,  pm:5000,  label:'Bronce → Plata'},
    2:{nivel:40,  pm:15000, label:'Plata → Oro'},
    3:{nivel:55,  pm:28000, label:'Oro → Platino'},
    4:{nivel:70,  pm:45000, label:'Platino → Diamante'},
    5:{nivel:85,  pm:75000, label:'Diamante → Challenger'},
  };
  var RANKS = {
    bronce:    {name:'Bronce',    cefr:'A1 · básico',     color:'#cd7f32', colorH:'#f4b86b'},
    plata:     {name:'Plata',     cefr:'A2 · elemental',  color:'#c0c0c0', colorH:'#e5e7eb'},
    oro:       {name:'Oro',       cefr:'B1 · intermedio', color:'#fbbf24', colorH:'#fde68a'},
    platino:   {name:'Platino',   cefr:'B2 · avanzado',   color:'#a78bfa', colorH:'#c4b5fd'},
    diamante:  {name:'Diamante',  cefr:'C1 · competente', color:'#67e8f9', colorH:'#a5f3fc'},
    challenger:{name:'Challenger',cefr:'C2 · maestría',   color:'#c4ff3d', colorH:'#c4ff3d'},
  };
  var V_RANKS = {
    1:{f:'bronce',    t:'plata'},
    2:{f:'plata',     t:'oro'},
    3:{f:'oro',       t:'platino'},
    4:{f:'platino',   t:'diamante'},
    5:{f:'diamante',  t:'challenger'},
  };

  // Leer versión del examen desde ?v=N
  var params = new URLSearchParams(window.location.search);
  var examV = parseInt(params.get('v'), 10) || 0; // 0 = auto-detectar desde rango
  var examURL = examV ? 'examen-ascenso.html?v=' + examV : '';

  function fmt(n){ return Number(n).toLocaleString('es-CO'); }
  function g(id){ return document.getElementById(id); }

  function irAlExamen(){
    window.AURA_EXAM_VERSION = examV;
    window.location.href = examURL;
  }

  function hideLoader(){
    var ld = g('aura-gate-loader');
    if(ld){ ld.style.opacity='0'; setTimeout(function(){ ld.style.display='none'; }, 400); }
  }

  function render(nivel, pm){
    var req = REQS[examV];
    if(!req){ hideLoader(); return; }

    var vr  = V_RANKS[examV] || V_RANKS[5];
    var fr  = RANKS[vr.f];
    var tr  = RANKS[vr.t];
    if(!fr || !tr){ hideLoader(); return; }

    var metLvl = nivel >= req.nivel;
    var metPM  = pm    >= req.pm;
    var missing = (!metLvl ? 1 : 0) + (!metPM ? 1 : 0);
    var met     = 2 - missing;

    // Título
    g('to-name').textContent  = tr.name;
    g('to-name2').textContent = tr.name;

    // Escudos
    g('from-shield').style.color   = fr.color;
    g('from-name').textContent     = fr.name;
    g('from-name').style.color     = fr.colorH;
    g('from-cefr').textContent     = fr.cefr;
    g('to-shield').style.color     = tr.color;
    g('to-shield').style.filter    = 'drop-shadow(0 4px 14px ' + tr.color + '4d)';
    g('to-cefr').textContent       = tr.cefr;

    // Banner de estado
    var banner = g('status-banner');
    if(missing === 0){
      banner.className = 'status ok';
      g('status-icon').innerHTML = '<polyline points="20 6 9 17 4 12"/>';
      g('status-main').textContent = '¡Listo! cumples todos los requisitos';
      g('status-hint').textContent = 'puedes presentar tu examen de ascenso';
      g('status-count').innerHTML  = '<em>2</em> / 2';
      g('status-count').style.color = 'var(--good)';
    } else {
      banner.className = 'status';
      g('status-icon').innerHTML = '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>';
      g('status-main').textContent = 'Bloqueado · ' + (missing === 1 ? 'te falta 1 requisito' : 'te faltan ' + missing + ' requisitos');
      g('status-hint').textContent = 'completa los marcados en rojo para desbloquear';
      g('status-count').innerHTML  = '<em>' + met + '</em> / 2';
    }

    // Tarjeta NIVEL
    var lvlPct = Math.min(100, Math.round((nivel / req.nivel) * 100));
    g('nivel-curr').textContent = nivel;
    g('nivel-req').textContent  = req.nivel;
    g('nivel-bar').style.width  = lvlPct + '%';
    g('req-nivel').className    = 'req' + (metLvl ? ' met' : '');
    if(metLvl){
      g('nivel-delta').textContent = '▸ Nivel alcanzado';
      g('nivel-note').textContent  = '';
    } else {
      var faltanLvl = req.nivel - nivel;
      g('nivel-delta').textContent = '▸ Faltan ' + faltanLvl + ' nivel' + (faltanLvl !== 1 ? 'es' : '');
      g('nivel-note').textContent  = ' · tienes nivel ' + nivel + ' y necesitas ' + req.nivel;
    }

    // Tarjeta PM
    var pmPct = Math.min(100, Math.round((pm / req.pm) * 100));
    g('pm-curr').textContent = fmt(pm);
    g('pm-req').textContent  = fmt(req.pm);
    g('pm-bar').style.width  = pmPct + '%';
    g('req-pm').className    = 'req' + (metPM ? ' met' : '');
    if(metPM){
      g('pm-delta').textContent = '▸ Puntos de Mérito suficientes';
      g('pm-note').textContent  = '';
    } else {
      var faltanPM = req.pm - pm;
      g('pm-delta').textContent = '▸ Faltan ' + fmt(faltanPM) + ' PM';
      g('pm-note').textContent  = ' · tienes ' + fmt(pm) + ' y necesitas ' + fmt(req.pm);
    }

    // Badge de rango
    var b = g('rango-badge');
    b.textContent    = '● ' + fr.name;
    b.style.color    = fr.colorH;
    b.style.background  = fr.color + '1f';
    b.style.borderColor = fr.color + '4d';

    // Botones
    if(missing === 0){
      g('btn-locked').style.display = 'none';
      g('btn-start').style.display  = 'flex';
    } else {
      g('btn-locked').style.display = 'flex';
      g('btn-start').style.display  = 'none';
      g('btn-hint').textContent = 'completa ' + missing + ' requisito' + (missing > 1 ? 's' : '');
    }

    hideLoader();
  }

  // Esperar a que _aura cargue el perfil
  var _att = 0;
  function tryRender(){
    var p  = window._aura && window._aura.profile;
    var lp = window._aura && window._aura.lang_progress;
    _att++;
    if(!p){ setTimeout(tryRender, 300); return; }
    // Esperar lang_progress hasta 3s, luego usar profile como fallback
    if(!lp && _att < 12){ setTimeout(tryRender, 250); return; }

    var nivel = parseInt((lp ? lp.nivel : p.nivel) || 1, 10) || 1;
    var pm    = parseInt((lp ? lp.merit_pm : p.merit_pm) || 0, 10) || 0;
    var rango = (lp ? lp.rango : p.rango) || 'Bronce';
    // Auto-detectar versión del examen si no vino por URL
    if (!examV) {
      var _rangoV = {Bronce:1, Plata:2, Oro:3, Platino:4, Diamante:5, Challenger:5};
      examV   = _rangoV[rango] || 1;
      examURL = 'examen-ascenso.html?v=' + examV;
    }
    render(nivel, pm);
  }

  document.addEventListener('DOMContentLoaded', function(){ setTimeout(tryRender, 400); });
})();

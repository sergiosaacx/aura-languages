// Aplicar color de acento inmediatamente desde localStorage (síncrono, antes de auth)
(function(){
  var _D={en:'#c4ff3d',fr:'#5BE9F6',it:'#7CFFB2',es:'#FFD83D',pt:'#FF8A5A'};
  var lang=null;try{lang=localStorage.getItem('aura_lang');}catch(e){}
  lang=lang||'en';
  var c=_D[lang]||'#c4ff3d';
  if(c==='#c4ff3d') return; // inglés: no necesita override
  var hex=c.replace('#','');
  var r=parseInt(hex.slice(0,2),16),g=parseInt(hex.slice(2,4),16),b=parseInt(hex.slice(4,6),16);
  var lum=(0.299*r+0.587*g+0.114*b)/255;
  var ink=lum>0.55?'#0c0c0c':'#f5f5f5';
  var _rgb=r+','+g+','+b;
  document.documentElement.style.setProperty('--accent',c);
  document.documentElement.style.setProperty('--accent-d',c);
  document.documentElement.style.setProperty('--accent-ink',ink);
  document.documentElement.style.setProperty('--accent-rgb',_rgb);
  var st=document.createElement('style');
  st.id='_aura_accent_dyn';
  st.textContent=[
    '.sl-logo{text-shadow:0 0 10px rgba('+_rgb+',.4)!important;color:'+c+'!important}',
    '.sl-btn.active{background:'+c+'!important;color:'+ink+'!important}',
    '.sl-btn.active svg{stroke:'+ink+'!important}',
    '.aura-sl-logo{color:'+c+'!important;text-shadow:0 0 10px rgba('+_rgb+',.4)!important}',
    '.aura-sl-btn.active{background:'+c+'!important;color:'+ink+'!important}',
    '.aura-sl-btn.active .aura-sl-lbl{color:'+ink+'!important}',
    '.aura-sl-btn.active svg{stroke:'+ink+'!important}',
    '.aura-sr-active{background:'+c+'!important;color:'+ink+'!important}',
    '.aura-sr-active svg{stroke:'+ink+'!important}',
    '.aura-sr-active .aura-sr-lbl{color:'+ink+'!important}',
    '.sr-c.profile,.sr-c.active{background:'+c+'!important;color:'+ink+'!important}',
    '.tb-name span{color:'+c+'!important}',
    '.hero-dot.active{background:'+c+'!important}',
    '.act-dot{background:rgba('+_rgb+',.5)!important}',
  ].join('');
  document.head.appendChild(st);
})();
// aura-supabase.js — Cliente Supabase compartido para Aura Languages
(function () {
  var SUPABASE_URL = 'https://vceuxruenbepzflopkbw.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_5ZVQnLFhMRYxbI2D77LTxg_WaNPhdUV';
  var _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);



  function setAvatar(id, fotoUrl, initials) {
    var el = document.getElementById(id);
    if (!el) return;
    if (fotoUrl) {
      el.innerHTML = '<img src="' + fotoUrl + '" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">';
    } else {
      el.textContent = initials;
    }
  }

  // ── Cache helper: aplica datos de perfil al DOM instantáneamente ──────────
  function _quickApply(d) {
    var nombre   = d.nombre || '···';
    var initials = nombre.split(' ').filter(Boolean).map(function(w){ return w[0]; }).join('').toUpperCase().slice(0,2) || '··';
    var nivelNum = d.nivel || 1;
    var rango    = d.rango || '···';
    var streak   = d.streak_actual || 0;
    var xp       = d.xp || 0;
    var xpNext   = d.xp_siguiente_nivel || 1000;
    var aura     = d.aura_points || 0;
    var foto     = d.foto_url || null;

    // Avatares
    setAvatar('tbAvatar',  foto, initials);
    setAvatar('srProfile', foto, initials);
    setAvatar('c1Avatar',  foto, initials);

    // Topbar .tb-name (selector genérico — funciona en todas las páginas)
    var tbB = document.querySelector('.tb-name b');
    if (tbB) tbB.textContent = nombre;
    var tbS = document.querySelector('.tb-name span');
    if (tbS) tbS.textContent = 'Lv ' + nivelNum + ' · ' + rango;

    // Dashboard c1
    var c1n = document.getElementById('c1BName');
    if (c1n) c1n.textContent = nombre;
    var c1Lv = document.getElementById('c1StatsLevel');
    if (c1Lv) c1Lv.textContent = 'Lv ' + nivelNum;
    var c1Str = document.getElementById('c1StatsStreak');
    if (c1Str) c1Str.textContent = streak;

    // Dashboard stats
    var elStreak = document.getElementById('statStreak');
    if (elStreak) elStreak.textContent = streak;
    var elStreakBig = document.getElementById('statStreakBig');
    if (elStreakBig) elStreakBig.textContent = streak;
    var elNivel = document.getElementById('statLevel');
    if (elNivel) elNivel.textContent = nivelNum;
    var elAura = document.getElementById('statAura');
    if (elAura) elAura.textContent = aura;
    var elAura2 = document.getElementById('statAura2');
    if (elAura2) elAura2.textContent = aura;

    // XP bar
    var xpVal = document.getElementById('xpValue');
    if (xpVal) xpVal.textContent = xp + ' / ' + xpNext;
    var xpBar = document.getElementById('xpBar');
    if (xpBar) xpBar.style.width = Math.min(100, (xp / xpNext) * 100) + '%';

    // LyricLab IDs específicos
    var tbName = document.getElementById('tbName');
    if (tbName) tbName.textContent = nombre;
    var tbLevel = document.getElementById('tbLevel');
    if (tbLevel) tbLevel.textContent = 'Lv ' + nivelNum + ' · ' + rango;
    var lvBadge = document.querySelector('.level-number');
    if (lvBadge) lvBadge.textContent = 'Nv. ' + nivelNum;

    // Home IDs específicos
    var hmName = document.getElementById('hm-name');
    if (hmName) hmName.textContent = nombre;
    var hmRank = document.getElementById('hm-rank');
    if (hmRank) hmRank.textContent = 'Lv ' + nivelNum + ' · ' + rango;
    var hmHello = document.getElementById('hm-hello-name');
    if (hmHello) hmHello.textContent = (nombre.split(' ')[0] || nombre) + '.';

    // Profile menu
    var pmN = document.getElementById('pmUserName');
    if (pmN) pmN.textContent = nombre;

    // Breadcrumb username (.crumb-user en todas las páginas)
    var first = nombre.split(' ').filter(Boolean)[0] || nombre;
    document.querySelectorAll('.crumb-user').forEach(function(el){
      el.textContent = first.toLowerCase();
    });

    // Dashboard rank badge
    var RANK_COLORS = {'Bronce':'#cd7f32','Plata':'#94a3b8','Oro':'#fbbf24','Platino':'#67e8f9','Diamante':'#818cf8','Challenger':'#c084fc'};
    var RANK_EMOJI  = {'Bronce':'🥉','Plata':'🥈','Oro':'🥇','Platino':'💠','Diamante':'💎','Challenger':'👑'};
    var c1Badge = document.getElementById('c1RankBadge');
    if (c1Badge) {
      c1Badge.textContent = (RANK_EMOJI[rango] || '') + ' ' + rango;
      c1Badge.style.background = RANK_COLORS[rango] || '#cd7f32';
    }
    var c1Lv2 = document.getElementById('c1StatsLevel');
    if (c1Lv2) c1Lv2.textContent = 'Lv ' + nivelNum;
  }

  // Calcula y guarda la racha de días consecutivos
  async function updateStreak(userId, currentStreak, maxStreak, ultimaConexion) {
    var hoy  = new Date().toISOString().split('T')[0];  // YYYY-MM-DD
    var ayer = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    var newStreak;
    if (!ultimaConexion || ultimaConexion < ayer) {
      newStreak = 1;              // Sin conexión >1 día → reiniciar
    } else if (ultimaConexion === ayer) {
      newStreak = currentStreak + 1;  // Se conectó ayer → sumar
    } else {
      newStreak = currentStreak;  // Ya se conectó hoy → no cambiar
    }

    var newMax = Math.max(maxStreak || 0, newStreak);

    if (ultimaConexion !== hoy) {
      await _sb.from('profiles').update({
        streak_actual    : newStreak,
        streak_maximo    : newMax,
        ultima_conexion  : hoy
      }).eq('id', userId);
    }
    return { streak: newStreak, max: newMax };
  }

  window._aura = {
    sb: _sb,
    profile: null,
    userId: null,

    checkAuth: async function () {
      // Intento 1: getSession desde localStorage
      var res = await _sb.auth.getSession();
      if (res.data && res.data.session) return res.data.session.user;

      // Intento 2: getUser vía red (token puede estar válido aunque localStorage falle)
      try {
        var ur = await _sb.auth.getUser();
        if (ur.data && ur.data.user) return ur.data.user;
      } catch(e) {}

      // Intento 3: esperar refresh del token y reintentar
      await new Promise(function(r){ setTimeout(r, 600); });
      res = await _sb.auth.getSession();
      if (res.data && res.data.session) return res.data.session.user;
      try {
        var ur2 = await _sb.auth.getUser();
        if (ur2.data && ur2.data.user) return ur2.data.user;
      } catch(e) {}

      // Sin sesión real → redirigir solo páginas protegidas
      var pub = ['login.html', 'index.html'];
      var page = window.location.pathname.split('/').pop() || 'index.html';
      if (pub.indexOf(page) === -1) {
        window.location.href = 'login.html';
      }
      return null;
    },

    loadProfile: async function (userId) {
      var self = this;
      // ── Cache: mostrar datos previos al instante ─────────────────────────
      var _cacheKey = 'aura_p_' + userId;
      try {
        var _cached = JSON.parse(localStorage.getItem(_cacheKey));
        if (_cached) {
          _quickApply(_cached);
          // Pre-populate profile so home-init.js no quede esperando
          if (!this.profile) this.profile = _cached;
          if (!this.userId)  this.userId  = userId;
        }
      } catch(e) {}
      // ── Supabase (fuente de verdad) ──────────────────────────────────────
      var res = await _sb.from('profiles').select('*').eq('id', userId).single();
      var data = res.data;
      var err  = res.error;

      // Si no existe el perfil, crearlo (usuario nuevo)
      if (err && (err.code === 'PGRST116' || !data)) {
        var userRes = await _sb.auth.getUser();
        var meta = (userRes.data.user && userRes.data.user.user_metadata) || {};
        var fullName = meta.full_name || meta.nombre || 'Usuario';
        var ins = await _sb.from('profiles').insert({
          id: userId,
          nombre: fullName,
          nivel: 1,
          xp: 0,
          xp_siguiente_nivel: 100,
          aura_points: 0,
          streak_actual: 0,
          streak_maximo: 0
        }).select().single();
        data = ins.data;
        if (!data) return null;
      } else if (err || !data) {
        console.warn('[Aura] Error cargando perfil:', err);
        return null;
      }

      this.profile = data;
      this.userId  = userId;

      var nombre   = data.nombre || 'Usuario';
      var initials = nombre.split(' ').filter(Boolean).map(function(w){ return w[0]; }).join('').toUpperCase().slice(0,2) || 'US';
      var nivelNum = data.nivel || 1;
      var rango    = data.rango  || 'Bronce';
      var xp       = data.xp || 0;
      var xpNext   = data.xp_siguiente_nivel || 1000;
      var aura     = data.aura_points || 0;
      var streakRaw = data.streak_actual  || 0;
      var streakMax = data.streak_maximo   || 0;
      var ultCon    = data.ultima_conexion || null;
      var streakRes = await updateStreak(userId, streakRaw, streakMax, ultCon);
      var streak    = streakRes.streak;
          streakMax = streakRes.max;
      var foto     = data.foto_url || null;

      // Avatares
      setAvatar('tbAvatar',  foto, initials);
      setAvatar('srProfile', foto, initials);
      setAvatar('c1Avatar',   foto, initials);
      // c1 Opción B: foto como fondo completo del card
      var c1Bg = document.getElementById('c1Bg');
      if (c1Bg) {
        if (foto) {
          c1Bg.innerHTML = '<img src="' + foto + '" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">';
        } else {
          c1Bg.innerHTML = '<span style="font-size:80px;font-weight:800;color:rgba(255,255,255,.06);font-family:monospace;user-select:none">' + initials + '</span>';
        }
      }

      // Topbar nombre + nivel
      var tbB = document.querySelector('.tb-name b');
      if (tbB) tbB.textContent = nombre;
      var tbS = document.querySelector('.tb-name span');
      if (tbS) tbS.textContent = 'Lv ' + nivelNum + ' · ' + rango;

      // Dashboard – card perfil (Opción B)
      var c1n = document.getElementById('c1BName');
      if (c1n) c1n.textContent = nombre;
      // ── C1 card: rango visual ──────────────────────────────
      var RANK_COLORS = { 'Bronce':'#cd7f32','Plata':'#94a3b8','Oro':'#fbbf24','Platino':'#67e8f9','Diamante':'#818cf8','Challenger':'#c084fc' };
      var RANK_EMOJI  = { 'Bronce':'🥉','Plata':'🥈','Oro':'🥇','Platino':'💠','Diamante':'💎','Challenger':'👑' };
      var rankColor = RANK_COLORS[rango] || '#cd7f32';
      // Badge
      var c1Badge = document.getElementById('c1RankBadge');
      if (c1Badge) { c1Badge.textContent = (RANK_EMOJI[rango]||'') + ' ' + rango; c1Badge.style.background = rankColor; }
      // Stats row
      var c1Lv = document.getElementById('c1StatsLevel');
      if (c1Lv) c1Lv.textContent = 'Lv ' + nivelNum;
      var c1Str = document.getElementById('c1StatsStreak');
      if (c1Str) c1Str.textContent = streak;


      // Dashboard – stats topbar
      var elStreak = document.getElementById('statStreak');
      if (elStreak) elStreak.textContent = streak;
      // c6 card — racha grande + barra
      var elStreakBig = document.getElementById('statStreakBig');
      if (elStreakBig) elStreakBig.textContent = streak;
      var maxBar = Math.max(streakMax, 30);
      var pct = Math.min(100, Math.round((streak / maxBar) * 100));
      var c6f = document.getElementById('c6Fill');
      if (c6f) c6f.style.width = pct + '%';
      var c6i = document.getElementById('c6Icon');
      if (c6i) c6i.style.left = 'calc(' + pct + '% - 14px)';
      var ax1=document.getElementById('c6Ax1'); if(ax1) ax1.textContent=Math.round(maxBar*0.25)+'d';
      var ax2=document.getElementById('c6Ax2'); if(ax2) ax2.textContent=Math.round(maxBar*0.5)+'d';
      var ax3=document.getElementById('c6Ax3'); if(ax3) ax3.textContent=Math.round(maxBar*0.75)+'d';
      var axM=document.getElementById('c6Max'); if(axM) axM.textContent=maxBar+'d';
      var elNivel  = document.getElementById('statLevel');
      if (elNivel)  elNivel.textContent  = nivelNum;
      var elAura   = document.getElementById('statAura');
      if (elAura)   elAura.textContent   = aura;
      var elAura2  = document.getElementById('statAura2');
      if (elAura2)  elAura2.textContent  = aura;

      // XP bar (lyriclab / dashboard)
      var xpVal = document.getElementById('xpValue');
      if (xpVal) xpVal.textContent = xp + ' / ' + xpNext;
      var xpBar = document.getElementById('xpBar');
      if (xpBar) xpBar.style.width = Math.min(100, (xp / xpNext) * 100) + '%';

      // Level badge lyriclab
      var lvBadge = document.querySelector('.level-number');
      if (lvBadge) lvBadge.textContent = 'Nv. ' + nivelNum;

      // Score avatar lyriclab
      var saImg = document.querySelector('.score-avatar img');
      if (saImg && foto) saImg.src = foto;
      else if (document.querySelector('.score-avatar') && !foto) {
        var saEl = document.querySelector('.score-avatar');
        saEl.innerHTML = '<div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#c4ff3d,#a8e02f);display:flex;align-items:center;justify-content:center;font-weight:800;color:#0c0c0c;font-size:14px;">' + initials + '</div>';
      }

      // Profile menu nombre
      var pmN = document.getElementById('pmUserName');
      if (pmN) pmN.textContent = nombre;

      // ── Guardar en cache para la próxima visita ──────────────────────────
      try {
        localStorage.setItem(_cacheKey, JSON.stringify({
          nombre            : data.nombre,
          nivel             : data.nivel,
          rango             : data.rango,
          role              : data.role || 'user',
          xp                : data.xp,
          xp_siguiente_nivel: data.xp_siguiente_nivel,
          aura_points       : data.aura_points,
          streak_actual     : streak,
          streak_maximo     : streakMax,
          foto_url          : data.foto_url || null,
          ultima_conexion   : data.ultima_conexion
        }));
      } catch(e) {}

      // Idioma activo: localStorage tiene prioridad sobre Supabase
      // (evita race condition: el UPDATE de active_language puede no estar committed aún al recargar)
      var _storedLang = null;
      try { _storedLang = localStorage.getItem('aura_lang'); } catch(e) {}
      var activeLang = _storedLang || data.active_language || 'en';
      self.active_language = activeLang;
      // Solo pisar localStorage si no venía ya fijado por el dropdown
      if (!_storedLang) {
        try { localStorage.setItem('aura_lang', activeLang); } catch(e) {}
      }
      // Si el stored difiere del DB, actualizarlo en background para consistencia
      if (_storedLang && _storedLang !== (data.active_language || 'en')) {
        try { _sb.from('profiles').update({active_language:_storedLang}).eq('id',userId); } catch(e) {}
      }
      await self.loadLanguageProgress(activeLang);

      return data;
    },

    // ── Cargar progreso por idioma + aplicar color de acento ──────────────
    loadLanguageProgress: async function(lang) {
      var self = this;
      var userId = this.userId;
      if (!userId || !lang) return;

      // 1. Color de acento desde language_settings (con fallback por idioma)
      var _ACCENT_DEFAULTS = { en:'#c4ff3d', fr:'#5BE9F6', it:'#7CFFB2', es:'#FFD83D', pt:'#FF8A5A' };
      try {
        var colorRes = await _sb.from('language_settings')
          .select('accent_color').eq('lang', lang).single();
        var _rawColor = (colorRes.data && colorRes.data.accent_color) || _ACCENT_DEFAULTS[lang] || '#c4ff3d';
        if (_rawColor) {
          var c = _rawColor;
          var hex = c.replace('#','');
          var r = parseInt(hex.slice(0,2),16);
          var g = parseInt(hex.slice(2,4),16);
          var b = parseInt(hex.slice(4,6),16);
          var lum = (0.299*r + 0.587*g + 0.114*b) / 255;
          var ink = lum > 0.55 ? '#0c0c0c' : '#f5f5f5';
          document.documentElement.style.setProperty('--accent', c);
          document.documentElement.style.setProperty('--accent-d', c);
          document.documentElement.style.setProperty('--accent-ink', ink);
          document.documentElement.style.setProperty('--accent-rgb', r+','+g+','+b);
          self.accentColor = c;
          // Actualizar barra de carga si aún está visible
          var ldBar = document.getElementById('aura-ld-bar');
          if (ldBar) ldBar.style.background = c;
          // Actualizar gradientes de avatar hardcodeados
          document.querySelectorAll('.tb-avatar,.c1-img,.aura-dd-av,.p-thumb').forEach(function(el){
            el.style.backgroundImage = 'linear-gradient(135deg,var(--accent),var(--accent-d))';
          });
          // Inyectar overrides CSS para rgba hardcodeados en barras de navegación y otros
          var _dynSt = document.getElementById('_aura_accent_dyn');
          if (!_dynSt) { _dynSt = document.createElement('style'); _dynSt.id = '_aura_accent_dyn'; document.head.appendChild(_dynSt); }
          var _rgb = r + ',' + g + ',' + b;
          _dynSt.textContent = [
            '.sl-logo{text-shadow:0 0 10px rgba('+_rgb+',.4)!important;color:'+c+'!important}',
            '.sl-btn.active{background:'+c+'!important;color:'+ink+'!important}',
            '.sl-btn.active svg{stroke:'+ink+'!important}',
            '.sr-c.profile,.sr-c.active,.aura-sr-c.active{background:'+c+'!important;color:'+ink+'!important}',
            '.tb-name span{color:'+c+'!important}',
            '.tb-caret{color:rgba('+_rgb+',.6)!important}',
            '.aura-dd-lv{color:'+c+'!important;background:rgba('+_rgb+',.12)!important;border-color:rgba('+_rgb+',.2)!important}',
            '.aura-dd-lang.active{background:rgba('+_rgb+',.08)!important}',
            '.aura-dd-lang.active .aura-dd-lang-name b{color:'+c+'!important}',
            '.aura-dd-lang.active .aura-dd-lang-prog b{color:'+c+'!important}',
            '.aura-dd-lang.active .aura-dd-chk{background:'+c+'!important;border-color:'+c+'!important;color:'+ink+'!important;box-shadow:0 0 10px rgba('+_rgb+',.4)!important}',
            '.donut-fill{stroke:'+c+'!important;filter:drop-shadow(0 0 6px rgba('+_rgb+',.5))!important}',
            '.c4-bar.peak{background:linear-gradient(180deg,'+c+','+c+')!important;box-shadow:0 0 18px rgba('+_rgb+',.3)!important}',
            '.c4-bar.peak::before{background:'+c+'!important;color:'+ink+'!important}',
            '.c4-bar.peak::after{border-top-color:'+c+'!important}',
            '.pin{background:'+c+'!important;box-shadow:0 0 0 4px rgba('+_rgb+',.2),0 0 12px rgba('+_rgb+',.6)!important}',
            '.pin::after{border-color:'+c+'!important}',
            '.swipe-cat{color:'+c+'!important;background:rgba('+_rgb+',.08)!important;border-color:rgba('+_rgb+',.18)!important}',
            '.today-bar-f,.c6-fill,.c1-xp-fill,.pc-fill{background:linear-gradient(90deg,'+c+','+c+')!important;box-shadow:0 0 10px rgba('+_rgb+',.4)!important}',
            '.mini-ic{background:rgba('+_rgb+',.08)!important;color:'+c+'!important}',
          ].join('');
        }
      } catch(e) {}

      // 2. Progreso de idioma desde language_progress
      try {
        var lpRes = await _sb.from('language_progress')
          .select('*').eq('user_id', userId).eq('language', lang).single();
        var lp = lpRes.data;

        var p = self.profile || {};
        if (!lp) {
          // Para 'en': migrar datos actuales de profiles (progreso existente)
          // Para otros idiomas: empezar desde cero
          var defaults = lang === 'en'
            ? { nivel: p.nivel || 1, xp: p.xp || 0,
                xp_siguiente_nivel: p.xp_siguiente_nivel || 1200,
                aura_points: p.aura_points || 0, merit_pm: p.merit_pm || 0,
                rango: p.rango || 'Bronce',
                streak_actual: p.streak_actual || 0, streak_maximo: p.streak_maximo || 0 }
            : { nivel: 1, xp: 0, xp_siguiente_nivel: 1200,
                aura_points: 0, merit_pm: 0, rango: 'Bronce',
                streak_actual: 0, streak_maximo: 0 };
          var ins = await _sb.from('language_progress').insert(
            Object.assign({ user_id: userId, language: lang }, defaults)
          ).select().single();
          lp = ins.data || defaults;
        } else if (lang === 'en' && lp.xp === 0 && lp.nivel === 1 && (p.xp || 0) > 0) {
          // Registro de inglés existe pero está vacío — migrar desde profiles
          var migrate = {
            nivel: p.nivel || 1, xp: p.xp || 0,
            xp_siguiente_nivel: p.xp_siguiente_nivel || 1200,
            aura_points: p.aura_points || 0, merit_pm: p.merit_pm || 0,
            rango: p.rango || 'Bronce',
            streak_actual: p.streak_actual || 0, streak_maximo: p.streak_maximo || 0,
            updated_at: new Date().toISOString()
          };
          await _sb.from('language_progress').update(migrate)
            .eq('user_id', userId).eq('language', 'en');
          lp = Object.assign({}, lp, migrate);
        }

        if (lp && self.profile) {
          self.profile.nivel              = lp.nivel              || 1;
          self.profile.xp                 = lp.xp                 || 0;
          self.profile.xp_siguiente_nivel = lp.xp_siguiente_nivel || 1200;
          self.profile.aura_points        = lp.aura_points        || 0;
          self.profile.merit_pm           = lp.merit_pm           || 0;
          self.profile.rango              = lp.rango              || 'Bronce';
          self.profile.streak_actual      = lp.streak_actual      || 0;
          self.profile.streak_maximo      = lp.streak_maximo      || 0;
          self.lang_progress              = lp;
          self.active_language            = lang;
          self.lang                       = lang;
          // Re-aplicar todos los valores al DOM
          _quickApply(self.profile);
        }
      } catch(e) { console.warn('[Aura] language_progress:', e); }
    },

    // Guardar puntos ganados en Supabase
    saveScore: async function (pts) {
      if (!this.userId || !pts || pts <= 0) return;
      var p       = this.profile || {};
      var newAura = (p.aura_points || 0) + pts;
      var newXp   = (p.xp || 0) + pts;
      var res = await this.sb.from('profiles').update({
        aura_points: newAura,
        xp: newXp
      }).eq('id', this.userId);
      if (!res.error && this.profile) {
        this.profile.aura_points = newAura;
        this.profile.xp = newXp;
      }
    },

    // Subir foto de perfil a Supabase Storage y guardar URL
    uploadAvatar: async function (file) {
      if (!this.userId || !file) return null;
      var ext  = file.name.split('.').pop() || 'jpg';
      var path = this.userId + '/avatar.' + ext;
      var res  = await this.sb.storage.from('avatars').upload(path, file, {
        upsert: true,
        contentType: file.type || 'image/jpeg'
      });
      if (res.error) { console.warn('[Aura] Upload error:', res.error.message); return null; }
      var urlRes = this.sb.storage.from('avatars').getPublicUrl(path);
      var url = urlRes.data.publicUrl;
      // Guardar en profiles
      await this.sb.from('profiles').update({ foto_url: url }).eq('id', this.userId);
      if (this.profile) this.profile.foto_url = url;
      // Actualizar avatares en pantalla
      var img = '<img src="' + url + '?t=' + Date.now() + '" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">';
      ['tbAvatar','srProfile','c1Avatar'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) { el.innerHTML = img; el.style.backgroundImage = ''; }
      });
      var c1BgUp = document.getElementById('c1Bg');
      if (c1BgUp) c1BgUp.innerHTML = '<img src="' + url + '?t=' + Date.now() + '" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">';
      return url;
    },

    // Cerrar sesión
    signOut: async function () {
      await this.sb.auth.signOut();
      try { localStorage.clear(); sessionStorage.clear(); } catch(e) {}
      window.location.href = 'login.html';
    }
  };

  // Auto-init
  document.addEventListener('DOMContentLoaded', async function () {

    // ── Pantalla de carga global ──────────────────────────────────────────
    (function(){
      var s = document.createElement('style');
      s.textContent = [
        '#aura-ld{position:fixed;inset:0;background:#0a0a0a;display:flex;',
        'align-items:center;justify-content:center;flex-direction:column;',
        'gap:14px;z-index:9999;transition:opacity .35s}',
        '#aura-ld-bar{height:100%;width:0;background:#c4ff3d;border-radius:2px;',
        'animation:_ld 1.8s ease-in-out infinite}',
        '@keyframes _ld{0%{width:0;margin-left:0}50%{width:80px}100%{width:0;margin-left:120px}}'
      ].join('');
      document.head.appendChild(s);
      var el = document.createElement('div');
      el.id = 'aura-ld';
      el.innerHTML = [
        '<div style="font-size:2.4rem;font-weight:900;color:#c4ff3d;',
        'text-shadow:0 0 20px rgba(196,255,61,.4);letter-spacing:-.02em">A</div>',
        '<div style="width:120px;height:3px;background:#262626;border-radius:2px;overflow:hidden">',
        '<div id="aura-ld-bar"></div></div>',
        '<div style="font-size:10px;color:#7a7a7a;text-transform:uppercase;',
        'letter-spacing:.2em;font-family:monospace">Cargando...</div>'
      ].join('');
      document.body.insertBefore(el, document.body.firstChild);
    })();

    // Función pública para ocultar el loader (páginas con datos extra pueden llamarla)
    window._aura_hideLoader = function() {
      var ld = document.getElementById('aura-ld');
      if (!ld || ld._removed) return;
      ld._removed = true;
      ld.style.opacity = '0';
      setTimeout(function(){ if(ld.parentNode) ld.parentNode.removeChild(ld); }, 380);
    };

    var user = await window._aura.checkAuth();
    if (user) await window._aura.loadProfile(user.id);

    // Ocultar loader: inmediato si la página no lo retiene, máx 4s de fallback
    if (!window._aura_hold_load) {
      setTimeout(window._aura_hideLoader, 80);
    }
    setTimeout(window._aura_hideLoader, 4000); // fallback absoluto

    // ── NAVEGACIÓN GLOBAL ──────────────────────────────────────────────
    // Navegación simple — checkAuth() en cada página ya verifica la sesión
    window.auranav = function(dest) {
      window.location.href = dest;
    };
    window.auraNav = window.auranav;

    // Mapa de navegación izquierdo (por texto del label)
    var _LEFT_MAP = {
      'home':        'home.html',
      'dashboard':   'dashboard.html',
      'configuraci': '__config__',
      'ajustes':     '__config__',
      'historial':   null,
      'ranking':     null,
      'comunidad':   null,
      'tienda':      null
    };

    // Mapa de navegación derecho (por title o label)
    var _RIGHT_MAP = {
      'movies':       'movies.html',
      'lyriclab':     'lyriclab.html',
      'flashcards':   'flashcards.html',
      'collocations': 'collocations.html',
      'shadowlab':    'shadowlab.html',
      'slanglab':     'slanglab.html',
      'salir':        '__logout__',
      'cerrar':       '__logout__',
      'logout':       '__logout__'
    };

    function _wireBtn(btn, map) {
      var txt = ((btn.textContent || '') + ' ' + (btn.getAttribute('title') || '')).trim().toLowerCase();
      for (var k in map) {
        if (txt.indexOf(k) >= 0) {
          var _dest = map[k];
          if (!_dest) return;
          if (_dest === '__logout__') {
            btn.onclick = function() { if (window._aura) window._aura.signOut(); };
          } else if (_dest === '__config__') {
            (function() {
              var _p = window._aura && window._aura.profile;
              btn.onclick = function(e) { e.preventDefault(); e.stopPropagation(); window.auranav((_p && _p.role === 'admin') ? 'admin.html' : 'settings.html'); };
            })();
          } else {
            (function(d) {
              btn.onclick = function(e) { e.preventDefault(); e.stopPropagation(); window.auranav(d); };
            })(_dest);
          }
          return;
        }
      }
    }

    setTimeout(function() {
      // Cablear sidebar izquierdo
      document.querySelectorAll('.aura-sl-btn, .sl-btn').forEach(function(btn) {
        _wireBtn(btn, _LEFT_MAP);
      });

      // Cablear sidebar derecho (todas las variantes de clase)
      document.querySelectorAll('.aura-sr-c, .sr-c').forEach(function(btn) {
        _wireBtn(btn, _RIGHT_MAP);
      });

      // Inyectar ShadowLab si falta en el sidebar derecho
      if (!document.querySelector('[title="ShadowLab"]')) {
        var srMain = document.querySelector('.aura-sr, .sr');
        if (srMain) {
          var btnCls = srMain.querySelector('.aura-sr-c') ? 'aura-sr-c' : 'sr-c';
          var lblCls = srMain.querySelector('.aura-sr-lbl') ? 'aura-sr-lbl' : 'sr-lbl';
          var sdBtn = document.createElement('button');
          sdBtn.className = btnCls;
          sdBtn.title = 'ShadowLab';
          sdBtn.innerHTML = '<svg viewBox="0 0 24 24" style="flex-shrink:0;width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg><span class="' + lblCls + '">ShadowLab</span>';
          sdBtn.onclick = function() { window.auranav('shadowlab.html'); };
          var srDiv = srMain.querySelector('.aura-sr-div, .sr-div');
          if (srDiv) srMain.insertBefore(sdBtn, srDiv);
          else {
            var logoutBtn = srMain.querySelector('.aura-logout');
            if (logoutBtn) srMain.insertBefore(sdBtn, logoutBtn);
            else srMain.appendChild(sdBtn);
          }
        }
      }
    }, 500);
  });
})();

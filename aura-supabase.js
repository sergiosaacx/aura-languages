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
      var res = await _sb.auth.getSession();
      var session = res.data.session;
      if (!session) { window.location.href = 'login.html'; return null; }
      return session.user;
    },

    loadProfile: async function (userId) {
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
      setAvatar('c1Avatar',  foto, initials);

      // Topbar nombre + nivel
      var tbB = document.querySelector('.tb-name b');
      if (tbB) tbB.textContent = nombre;
      var tbS = document.querySelector('.tb-name span');
      if (tbS) tbS.textContent = 'Lv ' + nivelNum + ' · ' + rango;

      // Dashboard – card perfil
      var c1n = document.querySelector('.c1-name');
      if (c1n) c1n.textContent = nombre;
      // ── C1 card: rango visual ──────────────────────────────
      var RANK_COLORS = { 'Bronce':'#cd7f32','Plata':'#94a3b8','Oro':'#fbbf24','Platino':'#67e8f9','Diamante':'#818cf8','Challenger':'#c084fc' };
      var RANK_EMOJI  = { 'Bronce':'🥉','Plata':'🥈','Oro':'🥇','Platino':'💠','Diamante':'💎','Challenger':'👑' };
      var rankColor = RANK_COLORS[rango] || '#cd7f32';
      // Badge
      var c1Badge = document.getElementById('c1RankBadge');
      if (c1Badge) { c1Badge.textContent = (RANK_EMOJI[rango]||'') + ' ' + rango; c1Badge.style.background = rankColor; }
      // Anillo del avatar
      var c1Av = document.getElementById('c1Avatar');
      if (c1Av) { c1Av.style.borderColor = rankColor; c1Av.style.boxShadow = '0 0 0 3px var(--card),0 0 18px ' + rankColor + '44'; }
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

      return data;
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
    var user = await window._aura.checkAuth();
    if (user) await window._aura.loadProfile(user.id);
  });
})();

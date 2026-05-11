// aura-supabase.js — Cliente Supabase compartido para Aura Languages
(function () {
  var SUPABASE_URL = 'https://vceuxruenbepzflopkbw.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_5ZVQnLFhMRYxbI2D77LTxg_WaNPhdUV';
  var _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  function _nivelLabel(n) {
    var map = {1:'A1',2:'A2',3:'B1',4:'B2',5:'C1',6:'C2'};
    return map[n] || 'A1';
  }

  function getLevelTitle(xp) {
    if (xp >= 5000) return 'Maestro';
    if (xp >= 2000) return 'Diamante';
    if (xp >= 1000) return 'Platino';
    if (xp >= 500)  return 'Oro';
    if (xp >= 250)  return 'Plata';
    if (xp >= 100)  return 'Bronce';
    return 'Aprendiz';
  }

  function setAvatar(id, fotoUrl, initials) {
    var el = document.getElementById(id);
    if (!el) return;
    if (fotoUrl) {
      el.innerHTML = '<img src="' + fotoUrl + '" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">';
    } else {
      el.textContent = initials;
    }
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
      var nivel    = _nivelLabel(nivelNum);
      var xp       = data.xp || 0;
      var xpNext   = data.xp_siguiente_nivel || 1000;
      var aura     = data.aura_points || 0;
      var streak   = data.streak_actual || 0;
      var foto     = data.foto_url || null;

      // Avatares
      setAvatar('tbAvatar',  foto, initials);
      setAvatar('srProfile', foto, initials);
      setAvatar('c1Avatar',  foto, initials);

      // Topbar nombre + nivel
      var tbB = document.querySelector('.tb-name b');
      if (tbB) tbB.textContent = nombre;
      var tbS = document.querySelector('.tb-name span');
      if (tbS) tbS.textContent = nivel + ' · ' + getLevelTitle(xp);

      // Dashboard – card perfil
      var c1n = document.querySelector('.c1-name');
      if (c1n) c1n.textContent = nombre;

      // Dashboard – stats topbar
      var elStreak = document.getElementById('statStreak');
      if (elStreak) elStreak.textContent = streak;
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

// ── DATOS DINÁMICOS — "Continúa" y stats ────────────────────────────────────
(function loadDynamicStats() {
  function tryLoad() {
    if (!window._aura || !window._aura.sb || !window._aura.userId) {
      setTimeout(tryLoad, 500);
      return;
    }
    var sb = window._aura.sb;
    var uid = window._aura.userId;

    // ── "Continúa donde lo dejaste" ────────────────────────────────────────
    sb.from('profiles')
      .select('ultima_pelicula_titulo,ultima_pelicula_slug,ultima_escena_num,ultima_escena_frase,ultima_escena_accent,ultimo_tiempo_restante')
      .eq('id', uid).single()
      .then(function(res) {
        var d = res.data;
        if (!d || !d.ultima_pelicula_titulo) return;
        // Title
        var tiEl = document.getElementById('feat-ti');
        if (tiEl) tiEl.innerHTML = d.ultima_pelicula_titulo + ' <em>· escena ' + String(d.ultima_escena_num || 1).padStart(2,'0') + '</em>';
        // Subtitle
        var subEl = document.getElementById('feat-sub');
        if (subEl) {
          var sub = '';
          if (d.ultima_escena_frase) sub += '"' + d.ultima_escena_frase + '"';
          if (d.ultima_escena_accent) sub += (sub ? ' · ' : '') + d.ultima_escena_accent;
          if (d.ultimo_tiempo_restante) {
            var m = Math.floor(d.ultimo_tiempo_restante / 60);
            var s = String(d.ultimo_tiempo_restante % 60).padStart(2,'0');
            sub += (sub ? ' · ' : '') + m + ':' + s + ' restantes';
          }
          if (sub) subEl.textContent = sub;
        }
        // Button slug
        if (d.ultima_pelicula_slug) window._featSlug = d.ultima_pelicula_slug;
      });

    // ── Películas este mes ─────────────────────────────────────────────────
    var now = new Date();
    var monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    sb.from('session_history')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', uid).eq('tool', 'movies').gte('played_at', monthStart)
      .then(function(res) {
        var el = document.getElementById('stat-vistas');
        if (el) el.childNodes[0].textContent = res.count != null ? res.count : '0';
      });

    // ── Tiempo en escenas hoy ──────────────────────────────────────────────
    var todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    sb.from('session_history')
      .select('duracion_min')
      .eq('user_id', uid).eq('tool', 'movies').gte('played_at', todayStart)
      .then(function(res) {
        var el = document.getElementById('stat-tiempo');
        if (el && res.data) {
          var total = res.data.reduce(function(s, r) { return s + (r.duracion_min || 0); }, 0);
          el.childNodes[0].textContent = total || '0';
        }
      });

    // ── Comprensión promedio ───────────────────────────────────────────────
    sb.from('session_history')
      .select('accuracy')
      .eq('user_id', uid).eq('tool', 'movies')
      .then(function(res) {
        var el = document.getElementById('stat-comp');
        if (el && res.data && res.data.length) {
          var avg = Math.round(res.data.reduce(function(s,r){ return s+(r.accuracy||0); },0) / res.data.length);
          el.childNodes[0].textContent = avg;
        }
      });
  }
  tryLoad();
})();
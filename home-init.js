(function(){
  var DAYS   = ["dom","lun","mar","mie","jue","vie","sab"];
  var MONTHS = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  var TOOLS  = {
    flashcards:"Flashcards", lyriclab:"LyricLab", "play-movies":"MoviesLab",
    collocations:"Collocations", speakmaster:"SpeakMaster", slanglab:"SlangLab"
  };

  function greeting(){
    var h = new Date().getHours();
    return h < 12 ? "Buenos dias" : h < 18 ? "Buenas tardes" : "Buenas noches";
  }

  function todayLabel(){
    var d = new Date();
    return DAYS[d.getDay()] + " · " + d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear();
  }

  function relTime(s){
    var now = new Date(), t = new Date(s), diff = Math.floor((now - t) / 60000);
    if(diff < 1)  return "ahora";
    if(diff < 60) return "hace " + diff + " min";
    var h = Math.floor(diff / 60);
    if(h < 24)  return "hoy " + t.toLocaleTimeString("es", {hour:"2-digit", minute:"2-digit"});
    if(h < 48)  return "ayer";
    return t.getDate() + " " + MONTHS[t.getMonth()];
  }

  function set(id, v){ var e = document.getElementById(id); if(e) e.textContent = v; }
  function setH(id, v){ var e = document.getElementById(id); if(e) e.innerHTML = v; }

  function renderWeekly(rows){
    var now = new Date(), start = new Date(now);
    start.setHours(0,0,0,0);
    var wd = now.getDay() || 7;
    start.setDate(now.getDate() - (wd - 1));
    var mins = 0;
    (rows || []).forEach(function(r){ if(new Date(r.played_at) >= start) mins += 5; });
    var pct = Math.min(100, Math.round((mins / 300) * 100));
    set("hm-weekly-pct", pct);
    setTimeout(function(){
      var f = document.getElementById("hm-weekly-fill");
      if(f) f.style.width = pct + "%";
    }, 400);
  }

  function renderActivity(rows){
    var list = document.getElementById("hm-activity-list");
    if(!list) return;
    // Quitar hardcodeados
    var wrap = document.getElementById("hm-activity-list-wrap");
    if(wrap) wrap.remove();
    list.querySelectorAll(".act-line").forEach(function(e){ e.remove(); });
    if(!rows || !rows.length){
      list.insertAdjacentHTML("beforeend",
        '<div class=act-line style="color:var(--muted);font-family:var(--mono);font-size:11px">Sin actividad reciente</div>');
      return;
    }
    var alphas = [1, .55, .35, .2];
    var html = rows.slice(0, 4).map(function(r, i){
      var dot = i === 0
        ? "background:var(--accent);box-shadow:0 0 8px rgba(196,255,61,.5)"
        : "background:rgba(196,255,61," + (alphas[i] || .15) + ");box-shadow:none";
      var name = TOOLS[r.tool] || r.tool;
      var lbl  = r.skill ? name + " · " + r.skill : name;
      return '<div class=act-line>'
        + '<span class=act-dot style="' + dot + '"></span>'
        + '<b>' + lbl + '</b>'
        + '<span class=ago>' + relTime(r.played_at) + '</span>'
        + '<span class=pts>+' + (r.xp_earned || 0) + '</span>'
        + '</div>';
    }).join("");
    list.insertAdjacentHTML("beforeend", html);
  }

  function applyXP(p){
    if(!window.AuraXP || !AuraXP.calcLevel) return;
    var c = AuraXP.calcLevel(p.xp || 0);
    set("hm-xp-label", "XP · " + c.level + "→" + (c.level + 1));
    setTimeout(function(){
      var f = document.getElementById("hm-xp-fill");
      if(f) f.style.width = c.percent + "%";
    }, 500);
    setH("hm-xp-val", "<b>" + c.xpIntoLevel.toLocaleString() + "</b>/" + c.xpForNext.toLocaleString());
    set("hm-hello-goal", (c.xpForNext - c.xpIntoLevel).toLocaleString() + " XP para Lv " + (c.level + 1));
    set("hm-rank", c.cefr + " · " + (p.rango || "Bronce"));
  }

  function initHome(){
    var aura = window._aura;
    // Esperar a que loadProfile() termine (userId + profile quedan seteados juntos)
    if(!aura || !aura.userId || !aura.profile){
      setTimeout(initHome, 200);
      return;
    }

    var p       = aura.profile;
    var nombre  = p.nombre  || "";
    var first   = nombre.split(" ").filter(Boolean)[0] || "...";
    var initials = nombre.split(" ").filter(Boolean)
                         .map(function(w){ return w[0]; })
                         .join("").slice(0, 2).toUpperCase() || "?";

    // Campos correctos de Supabase:
    var streak = p.streak_actual || 0;   // ← streak_actual, NO streak
    var ap     = p.aura_points   || 0;   // ← aura_points,   NO merit_pm
    var rango  = p.rango || "Bronce";
    var nivel  = p.nivel || 1;

    // ── Topbar crumb ──
    set("hm-crumb-user", first.toLowerCase());

    // ── Saludo dinámico ──
    var helloH1 = document.querySelector(".hello-l h1");
    if(helloH1) helloH1.innerHTML = greeting() + ", <em>" + first + ".</em>";

    // ── Fecha de hoy (se actualiza cada visita) ──
    set("hm-hello-date", todayLabel());

    // ── Avatar ──
    var foto = p.foto_url || null;
    var av   = document.getElementById("hm-avatar");
    if(av){
      if(foto) av.innerHTML = '<img src="' + foto + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
      else     av.textContent = initials;
    }

    // ── Nombre ──
    set("hm-name", nombre || "...");

    // ── Rango (provisional; se sobreescribe con CEFR cuando carga AuraXP) ──
    set("hm-rank", "Lv " + nivel + " · " + rango);

    // ── AuraPoints ──
    set("hm-ap-num", ap.toLocaleString());

    // ── Racha donut ──
    set("hm-streak-num", streak);
    var arc = document.getElementById("hm-streak-arc");
    if(arc){
      var pct = Math.min(streak / 100, 1);
      arc.setAttribute("stroke-dashoffset", (264 * (1 - pct)).toFixed(1));
    }

    // ── XP — directo desde profile ya cargado por aura-supabase.js ──
    applyXP(p);

    // ── Historial de sesiones ──
    aura.sb.from("session_history")
      .select("tool, skill, xp_earned, played_at")
      .eq("user_id", aura.userId)
      .order("played_at", { ascending: false })
      .limit(30)
      .then(function(res){
        var rows = (res && res.data) ? res.data : [];
        renderActivity(rows);
        renderWeekly(rows);
      });
    // ── Hero slider + novedades (home-hero.js) ──
    if(window.initHeroSlider) initHeroSlider(aura);
  }

  // Arrancar cuando el DOM esté listo
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", initHome);
  } else {
    initHome();
  }

  // Re-ejecutar cuando se loguee una sesión nueva
  window.addEventListener("aura:session", initHome);
})();

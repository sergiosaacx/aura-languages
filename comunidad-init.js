/* ============================================================
   comunidad-init.js — Feed real de la Comunidad
   Publicar texto · imagen · frase del día
   Datos: window._aura (aura-supabase.js)
   ============================================================ */
(function () {
  'use strict';

  /* ── Utilidades ──────────────────────────────────────────── */
  function set(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function avatarColor(id) {
    if (!id) return 'a';
    var s = 0;
    for (var i = 0; i < Math.min(id.length, 8); i++) s += id.charCodeAt(i);
    return String.fromCharCode(97 + (s % 5)); // 'a'–'e'
  }

  function timeAgo(iso) {
    var d = Date.now() - new Date(iso).getTime();
    var m = Math.floor(d / 60000);
    if (m < 1)  return 'ahora';
    if (m < 60) return 'hace ' + m + ' min';
    var h = Math.floor(m / 60);
    if (h < 24) return 'hace ' + h + ' h';
    var days = Math.floor(h / 24);
    return 'hace ' + days + (days === 1 ? ' día' : ' días');
  }

  /* ── Topbar — XP ─────────────────────────────────────────── */
  function applyXP(p) {
    if (!window.AuraXP || !AuraXP.calcLevel) return;
    var c = AuraXP.calcLevel(p.xp || 0);
    set('cm-xp-label', 'XP · ' + c.level + '→' + (c.level + 1));
    setTimeout(function () {
      var fill = document.getElementById('cm-xp-fill');
      if (fill) fill.style.width = c.percent + '%';
    }, 400);
    var val = document.getElementById('cm-xp-val');
    if (val) val.innerHTML = '<b>' + c.xpIntoLevel.toLocaleString() + '</b>/' + c.xpForNext.toLocaleString();
  }

  /* ── Stats en vivo ───────────────────────────────────────── */
  function loadStats(sb) {
    var now      = new Date();
    var todayISO = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    var h24ago   = new Date(now.getTime() - 86400000).toISOString();

    Promise.all([
      sb.from('profiles').select('id', { count: 'exact', head: true }),
      sb.from('language_progress').select('user_id', { count: 'exact', head: true }).gte('updated_at', h24ago),
      sb.from('community_posts').select('id', { count: 'exact', head: true }).gte('created_at', todayISO)
    ]).then(function (r) {
      if (r[0].count !== null) set('cm-members',    r[0].count.toLocaleString('es-CO'));
      if (r[1].count !== null) set('cm-online',     r[1].count.toLocaleString('es-CO'));
      if (r[2].count !== null) set('cm-posts-today',r[2].count.toLocaleString('es-CO'));
    }).catch(function () {});
  }

  /* ── Render post ─────────────────────────────────────────── */
  var HEART_SVG  = '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  var BUBBLE_SVG = '<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  var SHARE_SVG  = '<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';
  var BOOK_SVG   = '<svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';

  function renderPost(post) {
    var prof   = post.profiles || {};
    var nombre = esc(prof.nombre || 'Usuario');
    var ini    = nombre.charAt(0).toUpperCase();
    var rango  = prof.rango || '';
    var col    = avatarColor(post.user_id);
    var isGold = rango === 'Platino' || rango === 'Diamante' || rango === 'Challenger';
    var tagHtml = rango
      ? '<span class="post-tag' + (isGold ? ' gold' : '') + '">' + esc(rango) + '</span>'
      : '';
    var isMe = post.user_id === (window._aura && window._aura.userId);

    var header = '<header class="post-hd">'
      + '<div class="post-av ' + col + '">' + ini + '</div>'
      + '<div class="post-meta">'
      +   '<span class="post-name"><b>' + nombre + '</b>' + tagHtml + '</span>'
      +   '<span class="post-info">' + timeAgo(post.created_at) + '</span>'
      + '</div>'
      + (isMe
          ? '<button class="post-more" onclick="cmDeletePost(this,\'' + esc(post.id) + '\')">⋯</button>'
          : '')
      + '</header>';

    var body = '';
    var meta = post.metadata || {};

    if (post.post_type === 'image') {
      body = (post.content
        ? '<p class="post-text">' + esc(post.content) + '</p>'
        : '')
        + '<div class="post-img"><img src="' + esc(post.media_url) + '" alt="" loading="lazy"></div>';

    } else if (post.post_type === 'phrase') {
      var pEn = esc(meta.phrase_en || post.content || '');
      var pEs = esc(meta.phrase_es || '');
      var lvl = esc(meta.level || 'B2');
      body = '<div class="phrase">'
        + '<p class="phrase-en">&ldquo;' + pEn + '&rdquo;</p>'
        + (pEs ? '<p class="phrase-es">&rarr; &ldquo;' + pEs + '&rdquo;</p>' : '')
        + '<div class="phrase-meta">'
        +   '<span>idiom &middot; <b>' + lvl + '</b></span>'
        +   '<span>uso &middot; ' + esc(meta.usage || 'general') + '</span>'
        + '</div>'
        + '</div>';

    } else if (post.post_type === 'achievement') {
      var title  = esc(meta.achievement_title || 'Logro desbloqueado');
      var sub    = esc(meta.achievement_sub   || '');
      var rNum   = meta.rank_num;
      var rTot   = meta.rank_total;
      body = (post.content ? '<p class="post-text">' + esc(post.content) + '</p>' : '')
        + '<div class="achv">'
        +   '<div class="achv-medal"><svg viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg></div>'
        +   '<div class="achv-meta"><span class="ti">' + title + '</span>'
        +     (sub ? '<span class="sub">' + sub + '</span>' : '')
        +   '</div>'
        +   (rNum !== undefined
                ? '<div class="achv-num"><b>#' + rNum + '</b>'
                  + (rTot ? '<span>de ' + rTot + '</span>' : '') + '</div>'
                : '')
        + '</div>';

    } else { // text
      body = '<p class="post-text">' + esc(post.content || '') + '</p>';
    }

    var actions = '<div class="post-actions">'
      + '<button class="pa">' + HEART_SVG  + 'me gusta</button>'
      + '<button class="pa">' + BUBBLE_SVG + 'comentar</button>'
      + '<button class="pa">' + SHARE_SVG  + 'compartir</button>'
      + '<button class="pa">' + BOOK_SVG   + 'guardar</button>'
      + '</div>';

    return '<article class="post" data-id="' + esc(post.id) + '">'
      + header + body + actions + '</article>';
  }

  /* ── Cargar feed ─────────────────────────────────────────── */
  function loadFeed(sb) {
    var feed = document.getElementById('cm-feed');
    if (!feed) return;

    sb.from('community_posts')
      .select('*, profiles(nombre, rango)')
      .order('created_at', { ascending: false })
      .limit(20)
      .then(function (res) {
        if (res.error) {
          feed.innerHTML = '<p class="cm-empty">No se pudieron cargar las publicaciones.</p>';
          return;
        }
        var posts = res.data || [];
        if (!posts.length) {
          feed.innerHTML = '<p class="cm-empty">Sé el primero en publicar algo en la comunidad 🚀</p>';
          return;
        }
        feed.innerHTML = posts.map(renderPost).join('');
      })
      .catch(function () {
        feed.innerHTML = '<p class="cm-empty">Error de conexión. Recarga la página.</p>';
      });
  }

  /* ── Eliminar post (solo el autor) ──────────────────────── */
  window.cmDeletePost = function (btn, postId) {
    if (!confirm('¿Eliminar esta publicación?')) return;
    window._aura.sb.from('community_posts').delete().eq('id', postId)
      .then(function (res) {
        if (!res.error) {
          var art = btn.closest('article');
          if (art) art.remove();
          var el = document.getElementById('cm-posts-today');
          if (el) el.textContent = Math.max(0, (parseInt(el.textContent.replace(/\D/g, '')) || 1) - 1);
        }
      });
  };

  /* ── Composer ────────────────────────────────────────────── */
  function initComposer(sb, userId, profile) {
    // Avatar del usuario logueado
    var av = document.getElementById('cm-composer-av');
    if (av && profile && profile.nombre) av.textContent = profile.nombre.charAt(0).toUpperCase();

    var activeType  = 'text';
    var fotoFile    = null;

    var textEl      = document.getElementById('cm-text');
    var btnFoto     = document.getElementById('cmp-foto-btn');
    var btnFrase    = document.getElementById('cmp-frase-btn');
    var panelFoto   = document.getElementById('cm-foto-panel');
    var panelFrase  = document.getElementById('cm-frase-panel');
    var fotoInput   = document.getElementById('cm-foto-input');
    var fotoPreview = document.getElementById('cm-foto-preview');
    var fotoPh      = document.getElementById('cm-foto-placeholder');
    var pubBtn      = document.getElementById('cm-publish-btn');
    var errEl       = document.getElementById('cm-pub-error');

    function showErr(msg) {
      if (!errEl) return;
      errEl.textContent = msg;
      errEl.style.display = msg ? 'block' : 'none';
    }

    function setType(t) {
      activeType = t;
      if (panelFoto)  panelFoto.style.display  = 'none';
      if (panelFrase) panelFrase.style.display  = 'none';
      if (btnFoto)    btnFoto.classList.remove('active');
      if (btnFrase)   btnFrase.classList.remove('active');
      if (textEl)     textEl.style.display = '';
      showErr('');

      if (t === 'image') {
        if (panelFoto) panelFoto.style.display = 'block';
        if (btnFoto)   btnFoto.classList.add('active');
        if (textEl)    textEl.placeholder = 'Describe la foto (opcional)…';
      } else if (t === 'phrase') {
        if (panelFrase) panelFrase.style.display = 'flex';
        if (btnFrase)   btnFrase.classList.add('active');
        if (textEl)     textEl.style.display = 'none';
      } else {
        if (textEl) textEl.placeholder = '¿Qué quieres compartir hoy?';
      }
    }

    if (btnFoto)  btnFoto.addEventListener('click',  function () { setType(activeType === 'image'  ? 'text' : 'image');  });
    if (btnFrase) btnFrase.addEventListener('click', function () { setType(activeType === 'phrase' ? 'text' : 'phrase'); });

    // Auto-resize textarea
    if (textEl) textEl.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 160) + 'px';
    });

    // Preview de imagen
    if (fotoInput) fotoInput.addEventListener('change', function () {
      var file = this.files[0];
      if (!file) return;
      fotoFile = file;
      var reader = new FileReader();
      reader.onload = function (e) {
        if (fotoPreview) { fotoPreview.src = e.target.result; fotoPreview.style.display = 'block'; }
        if (fotoPh)      fotoPh.style.display = 'none';
      };
      reader.readAsDataURL(file);
    });

    function resetComposer() {
      fotoFile = null;
      if (textEl)      { textEl.value = ''; textEl.style.height = 'auto'; }
      if (fotoPreview) { fotoPreview.src = ''; fotoPreview.style.display = 'none'; }
      if (fotoPh)      fotoPh.style.display = '';
      if (fotoInput)   fotoInput.value = '';
      var enEl = document.getElementById('cm-frase-en');
      var esEl = document.getElementById('cm-frase-es');
      if (enEl) enEl.value = '';
      if (esEl) esEl.value = '';
      setType('text');
    }

    function setBusy(busy) {
      if (!pubBtn) return;
      pubBtn.disabled = busy;
      pubBtn.textContent = busy ? 'publicando…' : 'publicar';
    }

    function doInsert(data) {
      sb.from('community_posts')
        .insert([data])
        .select('*, profiles(nombre, rango)')
        .then(function (res) {
          setBusy(false);
          if (res.error) { showErr('DB: ' + (res.error.message || res.error.code || JSON.stringify(res.error))); console.error('insert error', res.error); return; }

          var newPost = res.data && res.data[0];
          if (newPost) {
            var feed = document.getElementById('cm-feed');
            if (feed) {
              var empty = feed.querySelector('.cm-empty, .cm-loading');
              if (empty) empty.remove();
              feed.insertAdjacentHTML('afterbegin', renderPost(newPost));
            }
            // Incrementar counter
            var el = document.getElementById('cm-posts-today');
            if (el) el.textContent = (parseInt(el.textContent.replace(/\D/g, '')) || 0) + 1;
          }
          resetComposer();
        })
        .catch(function () { setBusy(false); showErr('Error de conexión.'); });
    }

    if (pubBtn) pubBtn.addEventListener('click', function () {
      showErr('');
      setBusy(true);

      if (activeType === 'image') {
        if (!fotoFile) { setBusy(false); showErr('Selecciona una foto primero.'); return; }
        var caption = textEl ? textEl.value.trim() : '';
        // Comprimir imagen con canvas (max 900px, JPEG 82%) → base64 en media_url
        var reader = new FileReader();
        reader.onload = function (ev) {
          var img = new Image();
          img.onload = function () {
            var MAX = 900;
            var ratio = Math.min(1, MAX / img.width, MAX / img.height);
            var canvas = document.createElement('canvas');
            canvas.width  = Math.round(img.width  * ratio);
            canvas.height = Math.round(img.height * ratio);
            canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
            var dataUrl = canvas.toDataURL('image/jpeg', 0.82); console.log('canvas OK, base64 length:', dataUrl.length);
            doInsert({ user_id: userId, post_type: 'image', content: caption, media_url: dataUrl });
          };
          img.src = ev.target.result;
        };
        reader.readAsDataURL(fotoFile);

      } else if (activeType === 'phrase') {
        var enEl  = document.getElementById('cm-frase-en');
        var esEl  = document.getElementById('cm-frase-es');
        var lvlEl = document.getElementById('cm-frase-lvl');
        var pEn   = enEl  ? enEl.value.trim()  : '';
        var pEs   = esEl  ? esEl.value.trim()  : '';
        var lvl   = lvlEl ? lvlEl.value        : 'B2';
        if (!pEn) { setBusy(false); showErr('Escribe la frase en inglés primero.'); return; }
        doInsert({
          user_id: userId, post_type: 'phrase', content: pEn,
          metadata: { phrase_en: pEn, phrase_es: pEs, level: lvl, usage: 'general' }
        });

      } else { // text
        var txt = textEl ? textEl.value.trim() : '';
        if (!txt) { setBusy(false); showErr('Escribe algo primero.'); return; }
        doInsert({ user_id: userId, post_type: 'text', content: txt });
      }
    });
  }

  /* ── Init principal ──────────────────────────────────────── */
  function initComunidad() {
    var aura = window._aura;
    if (!aura || !aura.userId || !aura.profile || !aura.lang_progress) {
      setTimeout(initComunidad, 200);
      return;
    }

    var p      = aura.profile;
    var streak = p.streak_actual || 0;
    var ap     = p.aura_points   || 0;

    // Fecha
    var dateLabel = window.auraTodayLabel ? window.auraTodayLabel() : (function () {
      var D = ['dom','lun','mar','mié','jue','vie','sáb'];
      var M = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
      var d = new Date();
      return D[d.getDay()] + ' · ' + d.getDate() + ' ' + M[d.getMonth()];
    })();
    set('cm-hello-date', dateLabel);

    // Racha
    set('cm-streak-num', streak);
    var arc = document.getElementById('cm-streak-arc');
    if (arc) arc.setAttribute('stroke-dashoffset', (264 * (1 - Math.min(streak / 100, 1))).toFixed(1));

    // Aura Points + XP
    set('cm-ap-num', ap.toLocaleString());
    applyXP(p);

    // Stats + Feed + Composer
    if (aura.sb) {
      loadStats(aura.sb);
      loadFeed(aura.sb);
      initComposer(aura.sb, aura.userId, p);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComunidad);
  } else {
    initComunidad();
  }

})();

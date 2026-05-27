/* ============================================================
   comunidad-init.js — Feed real de la Comunidad
   Me gusta · Comentar · Compartir (redes + repost) · Guardar
   ============================================================ */
(function () {
  'use strict';

  /* ── Estado de filtro ──────────────────────────────────────── */
  var _activeFilter = 'all';
  var _friendIds    = null;   // cache de IDs de amigos, cargado on-demand

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
    return String.fromCharCode(97 + (s % 5));
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

  /* ── SVG Icons ──────────────────────────────────────────── */
  var HEART_SVG  = '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  var BUBBLE_SVG = '<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  var SHARE_SVG  = '<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';
  var BOOK_SVG   = '<svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
  var WA_SVG     = '<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C9 3 3 9 3 16c0 2.3.6 4.4 1.6 6.3L3 29l6.9-1.8c1.7.9 3.7 1.4 5.8 1.4 7 0 13-6 13-13S23 3 16 3zm5.5 17.8c-.3.8-1.6 1.5-2.2 1.6-.6.1-1.1.1-1.7-.1-.4-.1-1-.3-1.8-.7-3.1-1.3-5.2-4.4-5.3-4.6-.2-.2-1.2-1.6-1.2-3s.7-2.1 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.5.8 2 .9 2.1.1.2.1.4 0 .6-.1.2-.2.3-.3.5-.2.2-.3.3-.5.5-.1.2 0 .4.1.6.3.4 1 1.4 1.9 2.1 1.1.9 2 1.2 2.4 1.4.3.1.6.1.8-.1.2-.2.7-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.8.9 2.1 1 .3.2.5.3.6.4.1.3.1 1.1-.2 1.9z"/></svg>';
  var X_SVG      = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>';
  var TG_SVG     = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.7 8.02c-.12.54-.46.67-.93.42l-2.57-1.9-1.24 1.2c-.14.14-.26.26-.52.26l.18-2.6 4.73-4.27c.21-.18-.04-.28-.32-.1L7.84 14.3l-2.5-.78c-.54-.17-.55-.54.11-.8l9.81-3.78c.46-.17.86.11.38.86z"/></svg>';
  var COPY_SVG   = '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
  var REPOST_SVG = '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>';
  var SEND_SVG   = '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';

  /* ── Avatar del usuario actual (para comentarios) ─────── */
  var _currentUserAv = '<div class="post-av a" style="width:28px;height:28px;font-size:11px;flex-shrink:0">?</div>';

  function buildCurrentUserAv(profile) {
    if (!profile) return;
    var col = avatarColor(window._aura && window._aura.userId);
    if (profile.foto_url) {
      _currentUserAv = '<div class="post-av ' + col + '" style="width:28px;height:28px;padding:0;overflow:hidden;flex-shrink:0;">'
        + '<img src="' + esc(profile.foto_url) + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt=""></div>';
    } else {
      var ini = (profile.nombre || '?').charAt(0).toUpperCase();
      _currentUserAv = '<div class="post-av ' + col + '" style="width:28px;height:28px;font-size:11px;flex-shrink:0;">' + ini + '</div>';
    }
  }

  /* ── Cargar comentarios ──────────────────────────────────── */
  function loadComments(postId) {
    var sb = window._aura && window._aura.sb;
    if (!sb) return;
    var listEl = document.getElementById('clist-' + postId);
    if (!listEl) return;
    listEl.innerHTML = '<p class="cm-comments-empty">Cargando…</p>';
    sb.from('post_comments')
      .select('*, profiles(nombre, rango, foto_url)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
      .limit(30)
      .then(function (res) {
        if (res.error || !res.data || !res.data.length) {
          listEl.innerHTML = '<p class="cm-comments-empty">Sé el primero en comentar 💬</p>';
          return;
        }
        listEl.innerHTML = res.data.map(renderCommentItem).join('');
      })
      .catch(function () {
        listEl.innerHTML = '<p class="cm-comments-empty">Error al cargar comentarios.</p>';
      });
  }

  /* ── Helper: un item de comentario ────────────────────────── */
  function renderCommentItem(c) {
    var cp    = c.profiles || {};
    var cName = esc(cp.nombre || 'Usuario');
    var cIni  = cName.charAt(0).toUpperCase();
    var cCol  = avatarColor(c.user_id);
    var cFoto = cp.foto_url;
    var cAv   = cFoto
      ? '<div class="post-av ' + cCol + '" style="width:28px;height:28px;padding:0;overflow:hidden;flex-shrink:0;">'
        + '<img src="' + esc(cFoto) + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt="" onerror="this.parentNode.innerHTML=\'' + cIni + '\'" >'
        + '</div>'
      : '<div class="post-av ' + cCol + '" style="width:28px;height:28px;font-size:11px;flex-shrink:0">' + cIni + '</div>';
    return '<div class="cm-comment">'
      + cAv
      + '<div class="cm-comment-body">'
      +   '<div class="cm-comment-name">' + cName + '</div>'
      +   '<div class="cm-comment-text">' + esc(c.content) + '</div>'
      + '</div></div>';
  }

  /* ── Render post ─────────────────────────────────────────── */
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
    var foto = (isMe && window._aura.profile && window._aura.profile.foto_url)
             ? window._aura.profile.foto_url
             : (prof.foto_url || null);
    var avHtml = foto
      ? '<div class="post-av ' + col + '" style="padding:0;overflow:hidden;"><img src="' + esc(foto) + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt="" onerror="this.parentNode.innerHTML=\'' + ini + '\'"></div>'
      : '<div class="post-av ' + col + '">' + ini + '</div>';

    var pid = esc(post.id);

    var header = '<header class="post-hd">'
      + avHtml
      + '<div class="post-meta">'
      +   '<span class="post-name"><b>' + nombre + '</b>' + tagHtml + '</span>'
      +   '<span class="post-info">' + timeAgo(post.created_at) + '</span>'
      + '</div>'
      + (isMe
          ? '<div class="post-more-wrap">'
            + '<button class="post-more" onclick="cmOpenMenu(event,this)">⋯</button>'
            + '<div class="post-menu">'
            + '<button class="post-menu-item danger" onclick="cmDeletePost(this,\'' + pid + '\')">'
            + '<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>'
            + 'eliminar publicación</button>'
            + '</div></div>'
          : '')
      + '</header>';

    var body = '';
    var meta = post.metadata || {};

    if (post.post_type === 'image') {
      body = (post.content ? '<p class="post-text">' + esc(post.content) + '</p>' : '')
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
        + '</div></div>';

    } else if (post.post_type === 'achievement') {
      var title = esc(meta.achievement_title || 'Logro desbloqueado');
      var sub   = esc(meta.achievement_sub   || '');
      var rNum  = meta.rank_num;
      var rTot  = meta.rank_total;
      body = (post.content ? '<p class="post-text">' + esc(post.content) + '</p>' : '')
        + '<div class="achv">'
        +   '<div class="achv-medal"><svg viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg></div>'
        +   '<div class="achv-meta"><span class="ti">' + title + '</span>'
        +     (sub ? '<span class="sub">' + sub + '</span>' : '')
        +   '</div>'
        +   (rNum !== undefined
                ? '<div class="achv-num"><b>#' + rNum + '</b>' + (rTot ? '<span>de ' + rTot + '</span>' : '') + '</div>'
                : '')
        + '</div>';

    } else if (post.post_type === 'repost') {
      var orig     = post._original || null;
      var origProf = orig ? (orig.profiles || {}) : {};
      var origName = esc(origProf.nombre || meta.original_author || 'Usuario');
      var origIni  = origName.charAt(0).toUpperCase();
      var origCol  = avatarColor(orig ? orig.user_id : (meta.original_id || ''));

      // Render del contenido original según su tipo
      var origBody = '';
      if (orig) {
        if (orig.post_type === 'image') {
          origBody = (orig.content ? '<p class="prq-text">' + esc(orig.content) + '</p>' : '')
            + '<img src="' + esc(orig.media_url || '') + '" style="width:auto;max-width:100%;max-height:400px;border-radius:8px;display:block;margin:8px auto 0;">';
        } else if (orig.post_type === 'phrase') {
          var oMeta = orig.metadata || {};
          origBody = '<p class="prq-text" style="font-style:italic;">&ldquo;' + esc(oMeta.phrase_en || orig.content || '') + '&rdquo;</p>'
            + (oMeta.phrase_es ? '<p class="prq-text" style="font-size:11px;opacity:.6;margin-top:3px;">' + esc(oMeta.phrase_es) + '</p>' : '');
        } else if (orig.post_type === 'achievement') {
          var oMeta = orig.metadata || {};
          origBody = '<p class="prq-text">🏆 ' + esc(oMeta.achievement_title || orig.content || 'Logro desbloqueado') + '</p>';
        } else {
          origBody = '<p class="prq-text">' + esc(orig.content || '') + '</p>';
        }
      } else {
        // Fallback a metadata guardado
        origBody = '<p class="prq-text">' + esc(meta.original_content || '') + '</p>';
      }

      body = (post.content ? '<p class="post-text">' + esc(post.content) + '</p>' : '')
        + '<div class="post-repost-quote">'
        +   '<div class="prq-header">'
        +     (origProf.foto_url
               ? '<div class="post-av ' + origCol + '" style="width:24px;height:24px;padding:0;overflow:hidden;flex-shrink:0;"><img src="' + esc(origProf.foto_url) + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt=""></div>'
               : '<div class="post-av ' + origCol + '" style="width:24px;height:24px;font-size:10px;flex-shrink:0">' + origIni + '</div>')
        +     '<span class="prq-name">' + origName + '</span>'
        +   '</div>'
        +   origBody
        + '</div>';

    } else {
      body = '<p class="post-text">' + esc(post.content || '') + '</p>';
    }

    /* Actions */
    var likeCount    = post._likeCount    || 0;
    var commentCount = post._commentCount || 0;
    var isLiked = post._isLiked ? ' liked' : '';
    var isSaved = post._isSaved ? ' saved' : '';
    var likeLabel    = likeCount    > 0 ? String(likeCount)    : 'me gusta';
    var commentLabel = commentCount > 0 ? String(commentCount) : 'comentar';

    var actions = '<div class="post-actions">'
      + '<button class="pa like-btn' + isLiked + '" onclick="cmToggleLike(this,\'' + pid + '\')">'
      + HEART_SVG + '<span class="like-count">' + likeLabel + '</span></button>'

      + '<button class="pa comment-btn" onclick="cmToggleComments(this,\'' + pid + '\')">'
      + BUBBLE_SVG + '<span class="comment-label">' + commentLabel + '</span></button>'

      + '<div class="share-wrap">'
      +   '<button class="pa" onclick="cmOpenShare(event,this)">' + SHARE_SVG + 'compartir</button>'
      +   '<div class="share-menu" data-post-id="' + pid + '" data-content="' + esc(post.content || '') + '">'
      +     '<div class="share-socials">'
      +       '<a class="share-icon wa-icon" href="#" target="_blank" rel="noopener" title="WhatsApp">' + WA_SVG + '</a>'
      +       '<a class="share-icon x-icon"  href="#" target="_blank" rel="noopener" title="X / Twitter">' + X_SVG + '</a>'
      +       '<a class="share-icon tg-icon" href="#" target="_blank" rel="noopener" title="Telegram">' + TG_SVG + '</a>'
      +       '<button class="share-icon cp-icon" onclick="cmCopyLink(this)" title="Copiar link">' + COPY_SVG + '</button>'
      +     '</div>'
      +     '<button class="share-repost-btn" onclick="cmOpenRepost(\'' + pid + '\')">' + REPOST_SVG + ' Repostear en Aura</button>'
      +   '</div>'
      + '</div>'

      + '<button class="pa save-btn' + isSaved + '" onclick="cmToggleSave(this,\'' + pid + '\')">'
      + BOOK_SVG + 'guardar</button>'
      + '</div>';

    var _cmtData   = post._commentsData || [];
    var SHOW_MAX   = 3;
    var _shown     = _cmtData.slice(0, SHOW_MAX);
    var _remaining = _cmtData.length - _shown.length;
    var _listHtml  = _shown.length
      ? _shown.map(renderCommentItem).join('')
      : '<p class="cm-comments-empty">Sé el primero en comentar 💬</p>';
    var _verMasBtn = _remaining > 0
      ? '<button class="cm-ver-mas" onclick="cmLoadMoreComments(this,\'\'' + pid + '\'\')" data-offset="' + SHOW_MAX + '">ver más (' + _remaining + ') ▾</button>'
      : '';

    var commentsSection = '<div class="cm-comments" id="comments-' + pid + '">'
      + '<div class="cm-comments-list" id="clist-' + pid + '">' + _listHtml + '</div>'
      + _verMasBtn
      + '<div class="cm-comment-input">'
      + _currentUserAv
      + '<input type="text" class="cm-comment-field" placeholder="Escribe un comentario…" '
      + 'onkeydown="if(event.key===\'Enter\'){cmSendComment(this.nextElementSibling,\'' + pid + '\');event.preventDefault();}">' 
      + '<button class="cm-comment-send" onclick="cmSendComment(this,\'' + pid + '\')">' + SEND_SVG + '</button>'
      + '</div></div>';

    return '<article class="post" data-id="' + pid + '">'
      + header + body + actions + commentsSection + '</article>';
  }

  /* ── Cargar feed ─────────────────────────────────────────── */
  function loadFeed(sb, filter) {
    var feed   = document.getElementById('cm-feed');
    if (!feed) return;
    var userId = window._aura && window._aura.userId;
    feed.innerHTML = '<p class="cm-loading" style="opacity:.5;text-align:center;padding:32px 0">Cargando…</p>';

    var _filter = filter || _activeFilter;

    // Filtros que requieren lista de amigos primero
    if (_filter === 'amigos') {
      var userId = window._aura && window._aura.userId;
      if (!userId) { _filter = 'all'; }
      else if (_friendIds === null) {
        // Cargar amigos una sola vez y relanzar
        sb.from('friendships')
          .select('requester_id, addressee_id')
          .or('requester_id.eq.' + userId + ',addressee_id.eq.' + userId)
          .eq('status', 'accepted')
          .then(function (fr) {
            _friendIds = (fr.data || []).map(function (f) {
              return f.requester_id === userId ? f.addressee_id : f.requester_id;
            });
            _friendIds.push(userId); // incluir posts propios
            loadFeed(sb, 'amigos');
          })
          .catch(function () { _friendIds = []; loadFeed(sb, 'amigos'); });
        return;
      }
    }

    // Construir query base
    var _q = sb.from('community_posts')
      .select('*, profiles(nombre, rango, foto_url)')
      .order('created_at', { ascending: false })
      .limit(20);

    // Aplicar filtros
    if (_filter === 'amigos' && _friendIds && _friendIds.length) {
      _q = _q.in('user_id', _friendIds);
    } else if (_filter === 'phrase') {
      _q = _q.eq('post_type', 'phrase');
    } else if (_filter === 'achievement') {
      _q = _q.eq('post_type', 'achievement');
    } else if (_filter === 'preguntas') {
      _q = _q.eq('post_type', 'text').ilike('content', '%?%');
    } else if (_filter === 'audio' || _filter === 'grupos_b2') {
      feed.innerHTML = '<p class="cm-empty" style="text-align:center;padding:40px 0;opacity:.5;">'
        + (_filter === 'audio' ? '🎙️ Audio · pronunciación' : '👥 Grupos B2')
        + '<br><span style="font-size:12px;">próximamente</span></p>';
      return;
    }

    _q.then(function (res) {
        if (res.error) {
          feed.innerHTML = '<p class="cm-empty">No se pudieron cargar las publicaciones.</p>';
          return;
        }
        var posts = res.data || [];
        if (!posts.length) {
          feed.innerHTML = '<p class="cm-empty">Sé el primero en publicar algo en la comunidad 🚀</p>';
          return;
        }
        var postIds = posts.map(function (p) { return p.id; });

        Promise.all([
          sb.from('post_likes').select('post_id').in('post_id', postIds),
          userId ? sb.from('post_likes').select('post_id').in('post_id', postIds).eq('user_id', userId)   : Promise.resolve({ data: [] }),
          userId ? sb.from('saved_posts').select('post_id').in('post_id', postIds).eq('user_id', userId)  : Promise.resolve({ data: [] }),
          sb.from('post_comments').select('*, profiles(nombre, rango, foto_url)').in('post_id', postIds).order('created_at', { ascending: true })
        ]).then(function (r) {
          var likeCounts    = {};
          (r[0].data || []).forEach(function (l) { likeCounts[l.post_id] = (likeCounts[l.post_id] || 0) + 1; });
          var likedSet      = {};
          (r[1].data || []).forEach(function (l) { likedSet[l.post_id] = true; });
          var savedSet      = {};
          (r[2].data || []).forEach(function (s) { savedSet[s.post_id] = true; });
          var commentsByPost = {};
          (r[3].data || []).forEach(function (c) {
            if (!commentsByPost[c.post_id]) commentsByPost[c.post_id] = [];
            commentsByPost[c.post_id].push(c);
          });

          posts.forEach(function (p) {
            p._likeCount    = likeCounts[p.id]    || 0;
            p._isLiked      = !!likedSet[p.id];
            p._isSaved      = !!savedSet[p.id];
            p._commentCount = (commentsByPost[p.id] || []).length;
            p._commentsData = commentsByPost[p.id] || [];
          });
          // Cargar posts originales para reposts
          var repostOrigIds = [];
          posts.forEach(function (p) { if (p.shared_from) repostOrigIds.push(p.shared_from); });

          if (repostOrigIds.length) {
            sb.from('community_posts')
              .select('*, profiles(nombre, rango, foto_url)')
              .in('id', repostOrigIds)
              .then(function (origRes) {
                var origMap = {};
                (origRes.data || []).forEach(function (o) { origMap[o.id] = o; });
                posts.forEach(function (p) { if (p.shared_from) p._original = origMap[p.shared_from] || null; });
                feed.innerHTML = posts.map(renderPost).join('');
              })
              .catch(function () { feed.innerHTML = posts.map(renderPost).join(''); });
          } else {
            feed.innerHTML = posts.map(renderPost).join('');
          }
        }).catch(function () {
          feed.innerHTML = posts.map(renderPost).join('');
        });
      })
      .catch(function () {
        feed.innerHTML = '<p class="cm-empty">Error de conexión. Recarga la página.</p>';
      });
  }

  /* ── Menú ⋯ ─────────────────────────────────────────────── */
  window.cmOpenMenu = function (e, btn) {
    e.stopPropagation();
    var menu   = btn.nextElementSibling;
    var isOpen = menu.classList.contains('open');
    document.querySelectorAll('.post-menu.open,.share-menu.open').forEach(function (m) { m.classList.remove('open'); });
    if (!isOpen) menu.classList.add('open');
  };

  document.addEventListener('click', function () {
    document.querySelectorAll('.post-menu.open,.share-menu.open').forEach(function (m) { m.classList.remove('open'); });
  });

  /* ── Eliminar post ──────────────────────────────────────── */
  window.cmDeletePost = function (btn, postId) {
    var menu = btn.closest('.post-menu');
    if (menu) menu.classList.remove('open');
    window._aura.sb.from('community_posts').delete().eq('id', postId)
      .then(function (res) {
        if (!res.error) {
          var art = btn.closest('article');
          if (art) art.remove();
          var el = document.getElementById('cm-posts-today');
          if (el) el.textContent = Math.max(0, (parseInt(el.textContent.replace(/\D/g,'')) || 1) - 1);
        }
      });
  };

  /* ── Me gusta ───────────────────────────────────────────── */
  window.cmToggleLike = function (btn, postId) {
    var sb = window._aura && window._aura.sb;
    var userId = window._aura && window._aura.userId;
    if (!sb || !userId) return;
    var isLiked = btn.classList.contains('liked');
    var countEl = btn.querySelector('.like-count');
    var raw     = countEl ? countEl.textContent : '0';
    var current = /^\d+$/.test(raw) ? parseInt(raw) : 0;
    if (isLiked) {
      btn.classList.remove('liked');
      if (countEl) countEl.textContent = current <= 1 ? 'me gusta' : String(current - 1);
      sb.from('post_likes').delete().eq('post_id', postId).eq('user_id', userId)
        .then(function (res) {
          if (res.error) {
            console.error('[like] delete error:', res.error);
            btn.classList.add('liked');
            if (countEl) countEl.textContent = current > 0 ? String(current) : 'me gusta';
          }
        })
        .catch(function (e) {
          console.error('[like] delete catch:', e);
          btn.classList.add('liked');
          if (countEl) countEl.textContent = current > 0 ? String(current) : 'me gusta';
        });
    } else {
      btn.classList.add('liked');
      if (countEl) countEl.textContent = String(current + 1);
      var newId = (typeof crypto !== 'undefined' && crypto.randomUUID)
        ? crypto.randomUUID()
        : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){var r=Math.random()*16|0;return(c==='x'?r:(r&0x3|0x8)).toString(16);});
      sb.from('post_likes').insert([{ id: newId, post_id: postId, user_id: userId }])
        .then(function (res) {
          if (res.error) {
            console.error('[like] insert error:', res.error);
            btn.classList.remove('liked');
            if (countEl) countEl.textContent = current > 0 ? String(current) : 'me gusta';
          }
        })
        .catch(function (e) {
          console.error('[like] insert catch:', e);
          btn.classList.remove('liked');
          if (countEl) countEl.textContent = current > 0 ? String(current) : 'me gusta';
        });
    }
  };

  /* ── Guardar ────────────────────────────────────────────── */
  window.cmToggleSave = function (btn, postId) {
    var sb = window._aura && window._aura.sb;
    var userId = window._aura && window._aura.userId;
    if (!sb || !userId) return;
    var isSaved = btn.classList.contains('saved');
    if (isSaved) {
      btn.classList.remove('saved');
      sb.from('saved_posts').delete().eq('post_id', postId).eq('user_id', userId);
    } else {
      btn.classList.add('saved');
      var _sId = (typeof crypto !== 'undefined' && crypto.randomUUID)
        ? crypto.randomUUID()
        : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){var r=Math.random()*16|0;return(c==='x'?r:(r&0x3|0x8)).toString(16);});
      sb.from('saved_posts').insert([{ id: _sId, post_id: postId, user_id: userId }]);
    }
  };

  /* ── Compartir ──────────────────────────────────────────── */
  window.cmOpenShare = function (e, btn) {
    e.stopPropagation();
    var wrap   = btn.parentNode;
    var menu   = wrap.querySelector('.share-menu');
    var isOpen = menu.classList.contains('open');
    document.querySelectorAll('.post-menu.open,.share-menu.open').forEach(function (m) { m.classList.remove('open'); });
    if (!isOpen) {
      var postId  = menu.dataset.postId;
      var content = menu.dataset.content || '';
      var postUrl = window.location.origin + window.location.pathname + '?post=' + postId;
      var waLink  = menu.querySelector('.wa-icon');
      var xLink   = menu.querySelector('.x-icon');
      var tgLink  = menu.querySelector('.tg-icon');
      if (waLink) waLink.href = 'https://wa.me/?text=' + encodeURIComponent((content ? content + '\n' : '') + postUrl);
      if (xLink)  xLink.href  = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(content) + '&url=' + encodeURIComponent(postUrl);
      if (tgLink) tgLink.href = 'https://t.me/share/url?url=' + encodeURIComponent(postUrl) + '&text=' + encodeURIComponent(content);
      menu.classList.add('open');
    }
  };

  window.cmCopyLink = function (btn) {
    var menu   = btn.closest('.share-menu');
    if (!menu) return;
    var postId = menu.dataset.postId;
    var url    = window.location.origin + window.location.pathname + '?post=' + postId;
    navigator.clipboard.writeText(url).then(function () {
      var orig = btn.innerHTML;
      btn.innerHTML = '<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
      setTimeout(function () { btn.innerHTML = orig; }, 2000);
    }).catch(function () {});
    menu.classList.remove('open');
  };

  /* ── Comentarios ────────────────────────────────────────── */
  window.cmToggleComments = function (btn, postId) {
    var section = document.getElementById('comments-' + postId);
    if (!section) return;
    var input = section.querySelector('.cm-comment-field');
    if (input) { input.focus(); }
  };

  window.cmSendComment = function (btn, postId) {
    var sb     = window._aura && window._aura.sb;
    var userId = window._aura && window._aura.userId;
    if (!sb || !userId) return;
    var input = btn.previousElementSibling;
    if (!input) return;
    var text = input.value.trim();
    if (!text) return;
    input.disabled = true;
    btn.disabled   = true;
    sb.from('post_comments')
      .insert([{ post_id: postId, user_id: userId, content: text }])
      .select('*, profiles(nombre, rango, foto_url)')
      .then(function (res) {
        input.disabled = false;
        btn.disabled   = false;
        if (res.error) return;
        input.value = '';
        var listEl = document.getElementById('clist-' + postId);
        if (listEl) {
          var emptyMsg = listEl.querySelector('.cm-comments-empty');
          if (emptyMsg) emptyMsg.remove();
          var profile = window._aura.profile || {};
          var uName   = esc(profile.nombre || 'Usuario');
          var uIni    = uName.charAt(0).toUpperCase();
          var uCol    = avatarColor(userId);
          var _uFoto = window._aura.profile && window._aura.profile.foto_url;
          var _uAv = _uFoto
            ? '<div class="post-av ' + uCol + '" style="width:28px;height:28px;padding:0;overflow:hidden;flex-shrink:0;"><img src="' + esc(_uFoto) + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt=""></div>'
            : '<div class="post-av ' + uCol + '" style="width:28px;height:28px;font-size:11px;flex-shrink:0">' + uIni + '</div>';
          listEl.insertAdjacentHTML('beforeend',
            '<div class="cm-comment">'
            + _uAv
            + '<div class="cm-comment-body">'
            +   '<div class="cm-comment-name">' + uName + '</div>'
            +   '<div class="cm-comment-text">' + esc(text) + '</div>'
            + '</div></div>'
          );
          listEl.scrollTop = listEl.scrollHeight;
        }
        var article = document.querySelector('article[data-id="' + postId + '"]');
        if (article) {
          var labelEl = article.querySelector('.comment-btn .comment-label');
          if (labelEl) {
            var cnt = parseInt(labelEl.textContent) || 0;
            labelEl.textContent = String(cnt + 1);
          }
        }
      })
      .catch(function () { input.disabled = false; btn.disabled = false; });
  };

  /* ── Ver más comentarios ───────────────────────────────────── */
  window.cmLoadMoreComments = function (btn, postId) {
    var sb = window._aura && window._aura.sb;
    if (!sb) return;
    var offset = parseInt(btn.dataset.offset) || 3;
    btn.disabled = true;
    btn.textContent = 'cargando…';
    sb.from('post_comments')
      .select('*, profiles(nombre, rango)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
      .range(offset, offset + 9)
      .then(function (res) {
        btn.remove();
        var listEl = document.getElementById('clist-' + postId);
        if (!listEl || res.error || !res.data || !res.data.length) return;
        var empty = listEl.querySelector('.cm-comments-empty');
        if (empty) empty.remove();
        listEl.insertAdjacentHTML('beforeend', res.data.map(renderCommentItem).join(''));
      })
      .catch(function () { btn.disabled = false; btn.textContent = 'ver más ▾'; });
  };

    /* ── Repostear ──────────────────────────────────────────── */
  var _repostPostId = null;
  var _repostMeta   = {};

  window.cmOpenRepost = function (postId) {
    document.querySelectorAll('.share-menu.open').forEach(function (m) { m.classList.remove('open'); });
    _repostPostId = postId;
    var article = document.querySelector('article[data-id="' + postId + '"]');
    var preview = document.getElementById('cm-repost-preview');
    if (article && preview) {
      var nameEl     = article.querySelector('.post-name b');
      var authorName = nameEl ? nameEl.textContent.trim() : 'Usuario';

      // Extracción inteligente según tipo de post
      var textEl = article.querySelector('.post-text')
                || article.querySelector('.phrase-en')
                || article.querySelector('.achv-meta .ti')
                || article.querySelector('.prq-text');
      var content = textEl ? textEl.textContent.trim() : '';

      // Detectar tipo por clases presentes en el article
      var postType = 'text';
      if (article.querySelector('.post-img'))           postType = 'image';
      else if (article.querySelector('.phrase'))        postType = 'phrase';
      else if (article.querySelector('.achv'))          postType = 'achievement';
      else if (article.querySelector('.post-repost-quote')) postType = 'repost';

      // Fallback legible si no hay texto
      if (!content) {
        var fallbacks = { image: '📷 imagen', phrase: '💬 frase del día', achievement: '🏆 logro', repost: '🔁 repost' };
        content = fallbacks[postType] || '[publicación]';
      }

      _repostMeta = { original_id: postId, original_content: content, original_author: authorName, original_type: postType };
      preview.innerHTML = '<div class="rq-author">🔁 ' + esc(authorName) + '</div>'
        + '<div class="rq-text">' + esc(content) + '</div>';
    }
    var ta = document.getElementById('cm-repost-text');
    if (ta) ta.value = '';
    var modal = document.getElementById('cm-repost-modal');
    if (modal) modal.style.display = 'flex';
  };

  window.cmCloseRepost = function () {
    var modal = document.getElementById('cm-repost-modal');
    if (modal) modal.style.display = 'none';
    _repostPostId = null;
  };

  window.cmDoRepost = function () {
    var sb     = window._aura && window._aura.sb;
    var userId = window._aura && window._aura.userId;
    if (!sb || !userId || !_repostPostId) return;
    var ta  = document.getElementById('cm-repost-text');
    var btn = document.getElementById('cm-repost-btn');
    var text = ta ? ta.value.trim() : '';
    if (btn) { btn.disabled = true; btn.textContent = 'reposteando…'; }
    sb.from('community_posts')
      .insert([{ user_id: userId, post_type: 'repost', content: text, shared_from: _repostPostId, metadata: _repostMeta }])
      .select('*, profiles(nombre, rango, foto_url)')
      .then(function (res) {
        if (btn) { btn.disabled = false; btn.textContent = 'Repostear'; }
        if (res.error) return;
        cmCloseRepost();
        // Recargar feed para que el repost muestre el contenido original completo
        if (window._aura && window._aura.sb) loadFeed(window._aura.sb);
      })
      .catch(function () { if (btn) { btn.disabled = false; btn.textContent = 'Repostear'; } });
  };

  /* ── Filtro de feed ────────────────────────────────────────── */
  window.cmSetFilter = function (btn) {
    var newFilter = btn.dataset.filter || 'all';
    if (newFilter === _activeFilter) return;
    _activeFilter = newFilter;
    // reset cache amigos si cambia a "todo" para que se recargue si vuelven
    if (newFilter !== 'amigos') _friendIds = null;
    // actualizar botones activos
    document.querySelectorAll('#cm-filters .ff').forEach(function (b) {
      b.classList.toggle('active', b === btn);
    });
    var sb = window._aura && window._aura.sb;
    if (sb) loadFeed(sb, newFilter);
  };

    /* ── Ranking ───────────────────────────────────────────────── */
  var _rankTab = 'amigos';

  function renderRankList(users, myId) {
    var listEl = document.getElementById('cm-rank-list');
    if (!listEl) return;
    if (!users || !users.length) {
      listEl.innerHTML = '<p style="text-align:center;padding:20px 0;opacity:.45;font-size:13px;">Sin datos aún</p>';
      return;
    }
    var myPos = -1;
    var html = users.map(function (u, i) {
      var pos   = i + 1;
      var isMe  = u.id === myId;
      if (isMe) myPos = pos;
      var col   = avatarColor(u.id);
      var ini   = (u.nombre || '?').charAt(0).toUpperCase();
      var avHtml = u.foto_url
        ? '<div class="rank-av ' + col + (isMe ? ' me' : '') + '" style="padding:0;overflow:hidden;"><img src="' + esc(u.foto_url) + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt=""></div>'
        : '<div class="rank-av ' + col + (isMe ? ' me' : '') + '">' + ini + '</div>';
      var pts = (u.aura_points || 0).toLocaleString('es-CO');
      var sub = u.rango || 'Bronce';
      return '<div class="rank-row' + (isMe ? ' me' : '') + '" data-pos="' + pos + '">'
        + '<span class="rank-pos">' + pos + '</span>'
        + avHtml
        + '<div class="rank-name"><b>' + esc(u.nombre || 'Usuario') + (isMe ? ' · tú' : '') + '</b><span>' + esc(sub) + '</span></div>'
        + '<span class="rank-pts">' + pts + '</span>'
        + '</div>';
    }).join('');

    // Si el usuario no aparece en el top, agregar fila separada al final
    if (myId && myPos === -1) {
      var me = window._aura && window._aura.profile;
      if (me) {
        var mePts = (me.aura_points || 0).toLocaleString('es-CO');
        var meCol = avatarColor(myId);
        var meIni = (me.nombre || '?').charAt(0).toUpperCase();
        var meAv = me.foto_url
          ? '<div class="rank-av me" style="padding:0;overflow:hidden;"><img src="' + esc(me.foto_url) + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt=""></div>'
          : '<div class="rank-av ' + meCol + ' me">' + meIni + '</div>';
        html += '<div class="rank-row me" style="margin-top:8px;border-top:1px solid rgba(255,255,255,.08);padding-top:8px;">'
          + '<span class="rank-pos">…</span>'
          + meAv
          + '<div class="rank-name"><b>' + esc(me.nombre || 'tú') + ' · tú</b><span>' + esc(me.rango || 'Bronce') + '</span></div>'
          + '<span class="rank-pts">' + mePts + '</span>'
          + '</div>';
      }
    }
    listEl.innerHTML = html;
  }

  function loadRanking(sb, tab) {
    var listEl = document.getElementById('cm-rank-list');
    if (!listEl) return;
    var myId = window._aura && window._aura.userId;
    listEl.innerHTML = '<p style="text-align:center;padding:20px 0;opacity:.45;font-size:13px;">cargando…</p>';

    if (tab === 'pais') {
      listEl.innerHTML = '<p style="text-align:center;padding:24px 0;opacity:.45;font-size:13px;">🌎 Ranking por país<br><span style="font-size:11px;">próximamente</span></p>';
      return;
    }

    if (tab === 'amigos') {
      if (!myId) { renderRankList([], null); return; }
      sb.from('friendships')
        .select('requester_id, addressee_id')
        .or('requester_id.eq.' + myId + ',addressee_id.eq.' + myId)
        .eq('status', 'accepted')
        .then(function (fr) {
          var ids = (fr.data || []).map(function (f) {
            return f.requester_id === myId ? f.addressee_id : f.requester_id;
          });
          ids.push(myId);
          return sb.from('profiles')
            .select('id, nombre, foto_url, aura_points, rango')
            .in('id', ids)
            .order('aura_points', { ascending: false })
            .limit(10);
        })
        .then(function (res) { renderRankList(res.data || [], myId); })
        .catch(function () { renderRankList([], myId); });
    } else {
      // global
      sb.from('profiles')
        .select('id, nombre, foto_url, aura_points, rango')
        .order('aura_points', { ascending: false })
        .limit(10)
        .then(function (res) { renderRankList(res.data || [], myId); })
        .catch(function () { renderRankList([], myId); });
    }
  }

  window.cmRankTab = function (btn) {
    var tab = btn.dataset.rtab || 'global';
    if (tab === _rankTab) return;
    _rankTab = tab;
    document.querySelectorAll('#cm-rank-tabs .rank-tab').forEach(function (b) {
      b.classList.toggle('active', b === btn);
    });
    var sb = window._aura && window._aura.sb;
    if (sb) loadRanking(sb, tab);
  };

    /* ── Amigos ─────────────────────────────────────────────────── */
  function loadFriendsPanel(sb) {
    var grid    = document.getElementById('cm-friends-grid');
    var countEl = document.getElementById('cm-friends-count');
    if (!grid) return;
    var myId = window._aura && window._aura.userId;
    if (!myId) { grid.innerHTML = '<p style="opacity:.45;font-size:12px;padding:8px 0;">Inicia sesión para ver tus amigos</p>'; return; }

    sb.from('friendships')
      .select('requester_id, addressee_id, req:profiles!friendships_requester_id_fkey(id,nombre,foto_url), adr:profiles!friendships_addressee_id_fkey(id,nombre,foto_url)')
      .or('requester_id.eq.' + myId + ',addressee_id.eq.' + myId)
      .eq('status', 'accepted')
      .limit(20)
      .then(function (res) {
        var friends = (res.data || []).map(function (f) {
          return f.requester_id === myId ? f.adr : f.req;
        }).filter(Boolean);

        if (countEl) countEl.textContent = friends.length ? friends.length + ' amigos →' : '';

        if (!friends.length) {
          grid.innerHTML = '<p style="opacity:.45;font-size:12px;padding:8px 0;width:100%;">Aún no tienes amigos. ¡Agrega a alguien! 🤝</p>';
          return;
        }

        var MAX_SHOW = 7;
        var shown    = friends.slice(0, MAX_SHOW);
        var extra    = friends.length - shown.length;

        var html = shown.map(function (f) {
          var col = avatarColor(f.id);
          var ini = (f.nombre || '?').charAt(0).toUpperCase();
          var firstName = (f.nombre || 'amigo').split(' ')[0].toLowerCase();
          var avInner = f.foto_url
            ? '<img src="' + esc(f.foto_url) + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt="">'
            : ini;
          var avStyle = f.foto_url ? 'padding:0;overflow:hidden;' : '';
          return '<div class="fr">'
            + '<div class="fr-av ' + col + '" style="' + avStyle + '">' + avInner + '</div>'
            + '<span class="fr-name">' + esc(firstName) + '</span>'
            + '</div>';
        }).join('');

        if (extra > 0) {
          html += '<div class="fr"><div class="fr-av" style="background:rgba(255,255,255,.1);color:rgba(255,255,255,.6);font-size:11px;font-weight:700;">+' + extra + '</div><span class="fr-name">más</span></div>';
        }

        grid.innerHTML = html;
      })
      .catch(function () {
        grid.innerHTML = '<p style="opacity:.45;font-size:12px;padding:8px 0;">Error al cargar amigos</p>';
      });
  }

    /* ── Composer ────────────────────────────────────────────── */
  function initComposer(sb, userId, profile) {
    var av = document.getElementById('cm-composer-av');
    if (av && profile) {
      if (profile.foto_url) {
        av.style.padding = '0'; av.style.overflow = 'hidden';
        av.innerHTML = '<img src="' + esc(profile.foto_url) + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt="">';
      } else {
        av.textContent = profile.nombre ? profile.nombre.charAt(0).toUpperCase() : '?';
      }
    }

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

    if (textEl) textEl.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 160) + 'px';
    });

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
        .select('*, profiles(nombre, rango, foto_url)')
        .then(function (res) {
          setBusy(false);
          if (res.error) { showErr('DB: ' + (res.error.message || res.error.code || JSON.stringify(res.error))); return; }
          var newPost = res.data && res.data[0];
          if (newPost) {
            var feed = document.getElementById('cm-feed');
            if (feed) {
              var empty = feed.querySelector('.cm-empty,.cm-loading');
              if (empty) empty.remove();
              feed.insertAdjacentHTML('afterbegin', renderPost(newPost));
            }
            var el = document.getElementById('cm-posts-today');
            if (el) el.textContent = (parseInt(el.textContent.replace(/\D/g,'')) || 0) + 1;
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
            var dataUrl = canvas.toDataURL('image/jpeg', 0.82);
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
        doInsert({ user_id: userId, post_type: 'phrase', content: pEn,
          metadata: { phrase_en: pEn, phrase_es: pEs, level: lvl, usage: 'general' } });
      } else {
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

    buildCurrentUserAv(p);
    /* -- Avatar VS + Ranking me -- */
    (function applyUserVsPanel() {
      var userId = aura.userId;
      var col = (function(id){
        if (!id) return 'a';
        var s = 0;
        for (var i = 0; i < Math.min(id.length,8); i++) s += id.charCodeAt(i);
        return String.fromCharCode(97 + (s % 5));
      })(userId);
      var ini    = (p.nombre || '?').charAt(0).toUpperCase();
      var nombre = p.nombre || 'tu';
      var foto   = p.foto_url || null;
      var ap     = (p.aura_points || 0).toLocaleString('es-CO');

      // vs-face.me
      var vsFace = document.getElementById('cm-vs-me-face');
      if (vsFace) {
        if (foto) {
          vsFace.style.padding = '0'; vsFace.style.overflow = 'hidden';
          vsFace.innerHTML = '<img src="' + foto + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt="">';
        } else {
          vsFace.textContent = ini;
        }
      }

      // rank-av.me + nombre + pts
      var rkAv  = document.getElementById('cm-rank-me-av');
      var rkNm  = document.getElementById('cm-rank-me-name');
      var rkXp  = document.getElementById('cm-rank-me-xp');
      var rkPts = document.getElementById('cm-rank-me-pts');
      if (rkAv) {
        if (foto) {
          rkAv.style.padding = '0'; rkAv.style.overflow = 'hidden';
          rkAv.innerHTML = '<img src="' + foto + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt="">';
        } else {
          rkAv.textContent = ini;
        }
      }
      if (rkNm)  rkNm.textContent  = nombre + ' · tu';
      if (rkXp)  rkXp.textContent  = (p.xp || 0).toLocaleString('es-CO') + ' XP';
      if (rkPts) rkPts.textContent = ap;
    })();


    var dateLabel = window.auraTodayLabel ? window.auraTodayLabel() : (function () {
      var D = ['dom','lun','mar','mié','jue','vie','sáb'];
      var M = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
      var d = new Date();
      return D[d.getDay()] + ' · ' + d.getDate() + ' ' + M[d.getMonth()];
    })();
    set('cm-hello-date', dateLabel);
    set('cm-streak-num', streak);
    var arc = document.getElementById('cm-streak-arc');
    if (arc) arc.setAttribute('stroke-dashoffset', (264 * (1 - Math.min(streak / 100, 1))).toFixed(1));
    set('cm-ap-num', ap.toLocaleString());
    applyXP(p);

    if (aura.sb) {
      loadStats(aura.sb);
      loadFeed(aura.sb);
      loadRanking(aura.sb, 'amigos');
      loadFriendsPanel(aura.sb);
      initComposer(aura.sb, aura.userId, p);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComunidad);
  } else {
    initComunidad();
  }

})();

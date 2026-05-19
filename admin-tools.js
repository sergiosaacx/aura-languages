// ── ADMIN TOOLS — herramientas del home ──────────────────────────────────────
// Globals: _sb, _userId (from aura-supabase.js)

var _toolsData = [];
var _toolImgNew = null;

/* SVG paths por herramienta */
var _TOOL_ICONS = {
  movieslab:   '<polygon points="23 7 16 12 23 17 23 7"></polygon><rect x=1 y=5 width=15 height=14 rx=2 ry=2></rect>',
  lyriclab:    '<path d="M9 18V5l12-2v13"></path><circle cx=6 cy=18 r=3></circle><circle cx=18 cy=16 r=3></circle>',
  flashcards:  '<path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"></path><polyline points="3 7 12 13 21 7"></polyline><path d="M3 7l9-4 9 4"></path>',
  collocations:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
  social:      '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx=9 cy=7 r=4></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>'
};

/* ── CARGA ── */
function loadTools() {
  var lang = window.admLang || 'en';
  _sb.from('home_tools').select('*').eq('lang', lang).order('orden', {ascending: true}).then(function(res) {
    if (res.error) {
      showToast('Error cargando herramientas: ' + res.error.message, true);
      return;
    }
    _toolsData = res.data || [];
    renderToolsAdmin(_toolsData);
  });
}

/* ── RENDER LISTA ── */
function renderToolsAdmin(items) {
  var list = document.getElementById('adm-tools-list');
  if (!list) return;
  if (!items.length) {
    list.innerHTML = '<div style="text-align:center;color:var(--muted);padding:24px;font-size:13px;background:var(--card);border-radius:var(--r-sm)">Sin herramientas para este idioma. Agrega una con el bot\u00f3n de arriba.</div>';
    return;
  }
  list.innerHTML = items.map(function(t) {
    var imgHtml = t.imagen_url
      ? '<img src="' + t.imagen_url + '" style="width:100%;height:100%;object-fit:cover;border-radius:8px">'
      : '<div style="width:100%;height:100%;background:var(--card-2);border-radius:8px;display:flex;align-items:center;justify-content:center"><i class="ti ti-photo" style="font-size:22px;color:var(--muted)"></i></div>';
    var badge = t.destacado
      ? '<span style="margin-left:6px;font-size:9px;background:var(--accent);color:var(--accent-ink,#0a0a0a);padding:1px 6px;border-radius:3px;font-weight:700;vertical-align:middle">DESTACADA</span>'
      : '';
    var linkHint = t.link_url
      ? '<span style="font-size:10px;color:var(--muted);font-family:monospace">' + t.link_url + '</span>'
      : '';
    return '<div class="nv-item" onclick="openToolModal(\'' + t.id + '\')">'
      + '<div class="nv-thumb">' + imgHtml + '</div>'
      + '<div class="nv-meta">'
        + '<div class="nv-cat">' + (t.categoria || '') + badge + '</div>'
        + '<div class="nv-ti">' + (t.titulo || '') + '</div>'
        + '<div class="nv-de">' + (t.descripcion || '') + '</div>'
      + '</div>'
      + '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0">'
        + linkHint
        + '<span style="font-size:10px;color:var(--muted)">#' + (t.orden || 0) + '</span>'
      + '</div>'
      + '<div class="nv-edit-pill"><i class="ti ti-edit" style="font-size:13px"></i>Editar</div>'
    + '</div>';
  }).join('');
}

/* ── ABRIR MODAL ── */
function openToolModal(id) {
  var t = _toolsData.find(function(x) { return x.id === id; }) || {};
  _toolImgNew = null;

  document.getElementById('atm-id').value    = id;
  document.getElementById('atm-img').value   = t.imagen_url  || '';
  document.getElementById('atm-cat').value   = t.categoria   || '';
  document.getElementById('atm-titulo').value= t.titulo      || '';
  document.getElementById('atm-desc').value  = t.descripcion || '';
  document.getElementById('atm-stat-num').value = t.stat_num || '';
  document.getElementById('atm-stat-lbl').value = t.stat_lbl || '';
  document.getElementById('atm-nivel').value = t.nivel_lbl   || '';
  document.getElementById('atm-link').value  = t.link_url    || '';
  document.getElementById('atm-orden').value = t.orden       || 0;
  document.getElementById('atm-destacado').checked = !!t.destacado;

  var prev    = document.getElementById('atm-img-prev');
  var prevImg = document.getElementById('atm-img-prev-img');
  var lbl     = document.getElementById('atm-img-lbl');
  if (t.imagen_url && prev && prevImg) {
    prevImg.src = t.imagen_url;
    prev.style.display = 'block';
    if (lbl) lbl.textContent = 'Imagen actual';
  } else if (prev) {
    prev.style.display = 'none';
    if (lbl) lbl.textContent = 'Sin imagen';
  }

  openModal('tool-modal');
}

/* ── GUARDAR ── */
function saveTool() {
  var id = document.getElementById('atm-id').value;
  var lang = window.admLang || 'en';
  if (!id) return;

  var payload = {
    id:          id,
    lang:        lang,
    imagen_url:  document.getElementById('atm-img').value,
    categoria:   document.getElementById('atm-cat').value,
    titulo:      document.getElementById('atm-titulo').value,
    descripcion: document.getElementById('atm-desc').value,
    stat_num:    document.getElementById('atm-stat-num').value,
    stat_lbl:    document.getElementById('atm-stat-lbl').value,
    nivel_lbl:   document.getElementById('atm-nivel').value,
    link_url:    document.getElementById('atm-link').value,
    orden:       parseInt(document.getElementById('atm-orden').value) || 0,
    destacado:   document.getElementById('atm-destacado').checked,
    updated_at:  new Date().toISOString()
  };

  _sb.from('home_tools').upsert(payload, {onConflict: 'id,lang'}).then(function(res) {
    if (res.error) { showToast('Error: ' + res.error.message, true); return; }
    closeModal('tool-modal');
    showToast('Herramienta actualizada \u2713');
    loadTools();
  });
}

/* ── SUBIR IMAGEN ── */
function uploadToolImg(input) {
  var file = input.files[0];
  if (!file || !_sb || !_userId) return;
  var lbl = document.getElementById('atm-img-lbl');
  if (lbl) { lbl.textContent = 'Subiendo...'; lbl.style.color = 'var(--accent)'; }
  var ext  = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
  var path = _userId + '/tools/' + document.getElementById('atm-id').value + '-' + Date.now() + '.' + ext;
  _sb.storage.from('avatars').upload(path, file, {upsert: true, contentType: file.type || 'image/jpeg'})
    .then(function(res) {
      if (res.error) {
        if (lbl) { lbl.textContent = '\u2717 ' + res.error.message; lbl.style.color = '#f43f5e'; }
        return;
      }
      var purl = _sb.storage.from('avatars').getPublicUrl(path).data.publicUrl;
      document.getElementById('atm-img').value = purl;
      var prev    = document.getElementById('atm-img-prev');
      var prevImg = document.getElementById('atm-img-prev-img');
      if (prev && prevImg) { prevImg.src = purl + '?t=' + Date.now(); prev.style.display = 'block'; }
      if (lbl) { lbl.textContent = '\u2713 Imagen lista'; lbl.style.color = 'var(--accent)'; }
      input.value = '';
    });
}

/* ═══ THUMB PICKER ═════════════════════════════════════════════════════════ */
var _tpCallback = null;
var _tpAllItems = [];

function openThumbPicker(callback) {
  _tpCallback = callback;
  _tpAllItems = [];
  var grid = document.getElementById('tp-grid');
  var filter = document.getElementById('tp-filter');
  if (grid) grid.innerHTML = '<div style="color:var(--muted);font-size:12px;padding:20px;text-align:center">Cargando miniaturas...</div>';
  if (filter) filter.value = '';
  openModal('thumb-picker-modal');

  Promise.all([
    _sb.from('peliculas').select('titulo_main, portada_url').not('portada_url','is',null).neq('portada_url',''),
    _sb.from('lyriclab_songs').select('title, youtube_id').not('youtube_id','is',null).neq('youtube_id','')
  ]).then(function(results) {
    var movies = results[0].data || [];
    var songs  = results[1].data || [];
    _tpAllItems = [].concat(
      movies.map(function(m) { return { url: m.portada_url, label: m.titulo_main || 'Pel\u00edcula', badge: 'film' }; }),
      songs.map(function(s) { return { url: 'https://img.youtube.com/vi/' + s.youtube_id + '/mqdefault.jpg', label: s.title || 'Canci\u00f3n', badge: 'music' }; })
    );
    renderThumbGrid(_tpAllItems);
  });
}

function renderThumbGrid(items) {
  var grid = document.getElementById('tp-grid');
  if (!grid) return;
  if (!items.length) {
    grid.innerHTML = '<div style="color:var(--muted);font-size:12px;padding:20px;text-align:center">Sin miniaturas disponibles todav\u00eda.</div>';
    return;
  }
  grid.innerHTML = items.map(function(item) {
    var badgeIcon = item.badge === 'music' ? '\u266a' : '\u25b6';
    var badgeColor = item.badge === 'music' ? '#a855f7' : '#3b82f6';
    return '<div class="tp-item" onclick="selectThumb(this)" data-url="' + item.url + '" title="' + (item.label||'') + '">'
      + '<div class="tp-img-wrap">'
        + '<img src="' + item.url + '" loading="lazy">'
        + '<span class="tp-badge" style="background:' + badgeColor + '">' + badgeIcon + '</span>'
      + '</div>'
      + '<div class="tp-lbl">' + (item.label || '') + '</div>'
    + '</div>';
  }).join('');
}

function filterThumbs() {
  var q = (document.getElementById('tp-filter').value || '').toLowerCase();
  if (!q) { renderThumbGrid(_tpAllItems); return; }
  renderThumbGrid(_tpAllItems.filter(function(it) { return it.label.toLowerCase().indexOf(q) !== -1; }));
}

function selectThumb(el) {
  var url = el && el.dataset.url;
  if (!url) return;
  document.querySelectorAll('.tp-item').forEach(function(d){ d.classList.remove('tp-selected'); });
  el.classList.add('tp-selected');
  setTimeout(function() {
    if (_tpCallback) _tpCallback(url);
    closeModal('thumb-picker-modal');
  }, 180);
}

function pickThumbForTool() {
  openThumbPicker(function(url) {
    document.getElementById('atm-img').value = url;
    var prev    = document.getElementById('atm-img-prev');
    var prevImg = document.getElementById('atm-img-prev-img');
    var lbl     = document.getElementById('atm-img-lbl');
    if (prev && prevImg) { prevImg.src = url; prev.style.display = 'block'; }
    if (lbl) { lbl.textContent = '\u2713 Miniatura seleccionada'; lbl.style.color = 'var(--accent)'; }
  });
}

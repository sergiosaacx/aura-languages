// ── ADMIN NOVEDADES — novedades, hero slider y editor ───────────────────────
// Globals: _sb, novedadesData, _heroSlides, _heroSlide0Data, _activeSlideIdx

/* ── NOVEDADES ───────────────────────────── */
function loadNovedades() {
  loadLoginPanel();
  var lang = window.admLang || 'en';
  _sb.from('admin_hero_config').select('*').eq('id','hero_'+lang).single().then(function(res) {
    if (res.data) { populateHeroPreview(res.data); }
  });
  loadTopicFeatured();
  _sb.from('novedades').select('*').eq('lang', lang).order('orden',{ascending:true}).then(function(res) {
    novedadesData = res.data || [];
    renderNovedades(novedadesData);
  });
}

function populateHeroPreview(d) {
  document.getElementById('hp-tag').textContent = d.tag || '';
  document.getElementById('hp-ti').innerHTML = d.titulo || '';
  document.getElementById('hp-sub').textContent = d.subtitulo || '';
  document.getElementById('hp-b1').textContent = d.btn1_texto || '';
  document.getElementById('hp-b2').textContent = d.btn2_texto || '';
  document.getElementById('hp-sk').textContent = 'resultados beta';
  document.getElementById('hp-sv').textContent = d.stat_titulo || '';
  document.getElementById('hp-s1n').textContent = d.stat1_num || '';
  document.getElementById('hp-s1l').textContent = d.stat1_lbl || '';
  document.getElementById('hp-s2n').textContent = d.stat2_num || '';
  document.getElementById('hp-s2l').textContent = d.stat2_lbl || '';
  document.getElementById('hp-s3n').textContent = d.stat3_num || '';
  document.getElementById('hp-s3l').textContent = d.stat3_lbl || '';
  if (d.imagen_url) document.getElementById('hp-bg').style.backgroundImage = 'url('+d.imagen_url+')';
}

function openHeroModal() {
  var lang = window.admLang || 'en';
  _sb.from('admin_hero_config').select('*').eq('id','hero_'+lang).single().then(function(res) {
    var d = res.data || {};
    setHeroModo(d.modo || 'static');
    var hcol = document.getElementById('h-color');
    if (hcol) hcol.value = d.color_acento || '#c4ff3d';
    _heroSlides = [];
    _activeSlideIdx = 0;
    try { _heroSlides = JSON.parse(d.slides_json || '[]'); } catch(e) {}
    // Guardar datos del slide 0 (hero principal)
    _heroSlide0Data = {
      imagen_url: d.imagen_url || '',
      tag: d.tag || '', titulo: d.titulo || '', subtitulo: d.subtitulo || '',
      btn1_texto: d.btn1_texto || '', btn2_texto: d.btn2_texto || '',
      btn1_url: d.btn1_url || '', btn2_url: d.btn2_url || '',
      stat_titulo: d.stat_titulo || '', stat_valor: d.stat_valor || '',
      stat1_num: d.stat1_num || '', stat1_lbl: d.stat1_lbl || '',
      stat2_num: d.stat2_num || '', stat2_lbl: d.stat2_lbl || '',
      stat3_num: d.stat3_num || '', stat3_lbl: d.stat3_lbl || ''
    };
    _loadTabDataToForm(_heroSlide0Data);
    renderSlideTabs();
    openModal('hero-modal');
  });
}

function saveHero() {
  _saveCurrentTabToMemory(); // asegurar que el tab activo quede en memoria
  var lang = window.admLang || 'en';
  var s0 = _heroSlide0Data || {};
  var basePayload = {
    id: 'hero_'+lang,
    imagen_url: s0.imagen_url || '',
    tag: s0.tag || '',
    titulo: s0.titulo || '',
    subtitulo: s0.subtitulo || '',
    btn1_texto: s0.btn1_texto || '',
    btn2_texto: s0.btn2_texto || '',
    btn1_url: s0.btn1_url || '',
    btn2_url: s0.btn2_url || '',
    stat_titulo: s0.stat_titulo || '',
    stat1_num: s0.stat1_num || '',
    stat1_lbl: s0.stat1_lbl || '',
    stat2_num: s0.stat2_num || '',
    stat2_lbl: s0.stat2_lbl || '',
    stat3_num: s0.stat3_num || '',
    stat3_lbl: s0.stat3_lbl || '',
    updated_at: new Date().toISOString()
  };
  var fullPayload = Object.assign({}, basePayload, {
    modo: (document.getElementById('h-modo')||{value:'static'}).value || 'static',
    color_acento: (document.getElementById('h-color')||{value:'#c4ff3d'}).value,
    slides_json: JSON.stringify(_heroSlides)
  });

  _sb.from('admin_hero_config').upsert(fullPayload).then(function(res) {
    if (res.error) {
      var msg = res.error.message || '';
      if (msg.indexOf('color_acento') !== -1 || msg.indexOf('modo') !== -1 || msg.indexOf('slides_json') !== -1) {
        _sb.from('admin_hero_config').upsert(basePayload).then(function(r2) {
          if (r2.error) { showToast('Error: '+r2.error.message, true); return; }
          closeModal('hero-modal');
          showToast('Portada guardada — ejecuta el SQL en Supabase para activar slider y color');
          loadNovedades();
        });
      } else {
        showToast('Error: '+msg, true);
      }
      return;
    }
    closeModal('hero-modal');
    showToast('Portada actualizada ✓');
    loadNovedades();
  });
}

function renderNovedades(items) {
  var list = document.getElementById('nv-list');
  if (!items.length) {
    list.innerHTML = '<div style="text-align:center;color:var(--muted);padding:24px;font-size:13px;background:var(--card);border-radius:var(--r-sm)">Sin novedades para este idioma. Agrega una con el botón de arriba.</div>';
    return;
  }
  list.innerHTML = items.map(function(n) {
    var thumb = n.imagen_url ?
      '<img src="'+n.imagen_url+'" style="width:100%;height:100%;object-fit:cover;border-radius:8px">' :
      '<i class="ti ti-news" style="font-size:22px;color:var(--muted)"></i>';
    return '<div class="nv-item" onclick="openNovedad(\''+n.id+'\')">' +
      '<div class="nv-thumb">'+thumb+'</div>' +
      '<div class="nv-meta">' +
        '<div class="nv-cat">'+(n.categoria||'')+'</div>' +
        '<div class="nv-ti">'+(n.titulo||'')+'</div>' +
        '<div class="nv-de">'+(n.descripcion||'')+'</div>' +
      '</div>' +
      '<span class="nv-date">'+(n.fecha_display||'')+'</span>' +
      '<div class="nv-edit-pill"><i class="ti ti-edit" style="font-size:13px"></i>Editar</div>' +
      '</div>';
  }).join('');
}

function openNovedad(id) {
  var n = novedadesData.find(function(x){return x.id===id;}) || {};
  document.getElementById('nvm-title').textContent = 'Editar novedad';
  document.getElementById('nvm-delete-btn').style.display = 'flex';
  document.getElementById('nm-id').value = id;
  document.getElementById('nm-img').value = n.imagen_url || '';
  var _prevNm = document.getElementById('nm-img-prev');
  var _prevNmImg = document.getElementById('nm-img-prev-img');
  var _lblNm = document.getElementById('nm-img-lbl');
  if (n.imagen_url && _prevNm && _prevNmImg) {
    _prevNmImg.src = n.imagen_url; _prevNm.style.display = 'block';
    if (_lblNm) _lblNm.textContent = 'Imagen actual';
  } else if (_prevNm) {
    _prevNm.style.display = 'none';
    if (_lblNm) _lblNm.textContent = 'Sin imagen';
  }
  document.getElementById('nm-cat').value = n.categoria || '';
  document.getElementById('nm-fecha').value = n.fecha_display || '';
  document.getElementById('nm-titulo').innerHTML = n.titulo || '';
  document.getElementById('nm-desc').value = n.descripcion || '';
  openModal('nv-modal');
}

function openNewNovedad() {
  document.getElementById('nvm-title').textContent = 'Nueva novedad';
  document.getElementById('nvm-delete-btn').style.display = 'none';
  ['nm-id','nm-img','nm-cat','nm-fecha','nm-desc'].forEach(function(id){
    document.getElementById(id).value = '';
  });
  document.getElementById('nm-titulo').innerHTML = '';
  openModal('nv-modal');
}

function saveNovedad() {
  var id = document.getElementById('nm-id').value;
  var lang = window.admLang || 'en';
  var payload = {
    categoria: document.getElementById('nm-cat').value,
    fecha_display: document.getElementById('nm-fecha').value,
    titulo: document.getElementById('nm-titulo').innerHTML,
    descripcion: document.getElementById('nm-desc').value,
    imagen_url: document.getElementById('nm-img').value,
    tipo: 'novedad',
    updated_at: new Date().toISOString()
  };
  var prom = id ?
    _sb.from('novedades').update(payload).eq('id',id) :
    _sb.from('novedades').insert(Object.assign({activo:true, orden:novedadesData.length, lang: lang}, payload));
  prom.then(function(res) {
    if (res.error) { showToast('Error: '+res.error.message, true); return; }
    closeModal('nv-modal');
    showToast(id ? 'Novedad actualizada ✓' : 'Novedad publicada ✓');
    loadNovedades();
  });
}

function deleteNovedad() {
  var id = document.getElementById('nm-id').value;
  if (!id || !confirm('Eliminar esta novedad del home?')) return;
  _sb.from('novedades').delete().eq('id',id).then(function(res) {
    if (res.error) { showToast('Error', true); return; }
    closeModal('nv-modal');
    showToast('Novedad eliminada');
    loadNovedades();
  });
}


/* ══ HERO SLIDER ADMIN ═══════════════════════════════════════════════════════════════════════════ */
var _heroSlides      = [];
var _activeSlideIdx  = 0;
var _heroSlide0Data  = null;

// ── Renderiza las pestañas del slide editor ──────────────────────────────────
function renderSlideTabs() {
  var container = document.getElementById('h-slide-tabs');
  if (!container) return;
  var total = 1 + _heroSlides.length;
  var html  = '';
  for (var i = 0; i < total; i++) {
    var isActive = (i === _activeSlideIdx);
    var base = 'padding:6px 13px;border-radius:20px;font-size:12px;cursor:pointer;border:1px solid;' +
               'display:inline-flex;align-items:center;gap:5px;font-family:var(--mono);font-weight:700;transition:all .15s;';
    var style = base + (isActive
      ? 'background:var(--accent);color:#000;border-color:var(--accent);'
      : 'background:var(--card-2);color:var(--ink);border-color:var(--line);');
    if (i === 0) {
      html += '<button type="button" onclick="switchSlideTab(0)" style="' + style + '">Slide 1</button>';
    } else {
      var si = i - 1;
      html += '<button type="button" onclick="switchSlideTab(' + i + ')" style="' + style + '">' +
        'Slide ' + (i + 1) +
        '<span onclick="event.stopPropagation();removeHeroSlide(' + si + ')" ' +
        'title="Eliminar slide" ' +
        'style="width:15px;height:15px;border-radius:50%;background:#00000033;display:inline-flex;' +
        'align-items:center;justify-content:center;font-size:11px;line-height:1;cursor:pointer;' +
        (isActive ? 'opacity:.7' : 'opacity:.5') + '">×</span>' +
        '</button>';
    }
  }
  html += '<button type="button" onclick="addHeroSlide()" style="padding:6px 12px;border-radius:20px;' +
    'background:#16a34a22;border:1px solid #4ade8044;color:#4ade80;font-size:12px;cursor:pointer;' +
    'display:inline-flex;align-items:center;gap:5px;font-family:var(--mono);font-weight:700">' +
    '<i class="ti ti-plus"></i> Agregar</button>';
  container.innerHTML = html;
}

// ── Guarda h-* campos al store correcto ─────────────────────────────────────
function _saveCurrentTabToMemory() {
  function g(id) { var el = document.getElementById(id); return el ? el.value : ''; }
  var data = {
    imagen_url: g('h-img'),
    tag: g('h-tag'), titulo: g('h-titulo'), subtitulo: g('h-sub'),
    btn1_texto: g('h-btn1'), btn2_texto: g('h-btn2'),
    btn1_url: g('h-btn1-url'), btn2_url: g('h-btn2-url'),
    stat_titulo: g('h-stat-ti'), stat_valor: g('h-stat-val'),
    stat1_num: g('h-s1n'), stat1_lbl: g('h-s1l'),
    stat2_num: g('h-s2n'), stat2_lbl: g('h-s2l'),
    stat3_num: g('h-s3n'), stat3_lbl: g('h-s3l')
  };
  if (_activeSlideIdx === 0) {
    _heroSlide0Data = data;
  } else {
    var si = _activeSlideIdx - 1;
    if (_heroSlides[si]) Object.assign(_heroSlides[si], data);
  }
}

// ── Carga un objeto de datos al formulario h-* ───────────────────────────────
function _loadTabDataToForm(data) {
  function s(id, v) { var el = document.getElementById(id); if (el) el.value = v || ''; }
  data = data || {};
  s('h-img',     data.imagen_url);
  s('h-tag',     data.tag);
  s('h-titulo',  data.titulo);
  s('h-sub',     data.subtitulo);
  s('h-btn1',    data.btn1_texto);
  s('h-btn2',    data.btn2_texto);
  s('h-btn1-url',data.btn1_url);
  s('h-btn2-url',data.btn2_url);
  s('h-stat-ti', data.stat_titulo);
  s('h-stat-val',data.stat_valor);
  s('h-s1n', data.stat1_num); s('h-s1l', data.stat1_lbl);
  s('h-s2n', data.stat2_num); s('h-s2l', data.stat2_lbl);
  s('h-s3n', data.stat3_num); s('h-s3l', data.stat3_lbl);
  // Imagen preview
  var prev    = document.getElementById('h-img-prev');
  var prevImg = document.getElementById('h-img-prev-img');
  var lbl     = document.getElementById('h-img-lbl');
  if (data.imagen_url && prev && prevImg) {
    prevImg.src = data.imagen_url;
    prev.style.display = 'block';
    if (lbl) lbl.textContent = 'Imagen actual';
  } else if (prev) {
    prev.style.display = 'none';
    if (lbl) lbl.textContent = 'Sin imagen';
  }
  // Reset NB panel
  var nbPanel = document.getElementById('h-nb-panel');
  if (nbPanel) nbPanel.style.display = 'none';
  var nbArea  = document.getElementById('h-nb-preview-area');
  if (nbArea)  nbArea.style.display = 'none';
  var nbSt    = document.getElementById('h-nb-status');
  if (nbSt)    nbSt.textContent = '';
  var nbImg   = document.getElementById('h-nb-preview-img');
  if (nbImg)   { nbImg.dataset.dragInit = ''; nbImg.style.transform = 'translateY(0px)'; }
  if (window._nbDragOffset) window._nbDragOffset = {};
}

// ── Cambia de pestaña ────────────────────────────────────────────────────────
function switchSlideTab(tabIdx) {
  _saveCurrentTabToMemory();
  _activeSlideIdx = tabIdx;
  var data = (tabIdx === 0) ? _heroSlide0Data : (_heroSlides[tabIdx - 1] || {});
  _loadTabDataToForm(data);
  renderSlideTabs();
}

function setHeroModo(modo) {
  var inp = document.getElementById('h-modo');
  if (inp) inp.value = modo;
  var bs = document.getElementById('ht-btn-static');
  var bl = document.getElementById('ht-btn-slider');
  if (bs) bs.classList.toggle('ht-active', modo === 'static');
  if (bl) bl.classList.toggle('ht-active', modo === 'slider');
}

function addHeroSlide() {
  _saveCurrentTabToMemory();
  _heroSlides.push({imagen_url:'',tag:'',titulo:'',subtitulo:'',
    btn1_texto:'',btn2_texto:'',btn1_url:'',btn2_url:'',
    stat_titulo:'',stat_valor:'',
    stat1_num:'',stat1_lbl:'',stat2_num:'',stat2_lbl:'',stat3_num:'',stat3_lbl:''});
  _activeSlideIdx = _heroSlides.length; // = tab index of the new slide
  _loadTabDataToForm({});
  renderSlideTabs();
}

function removeHeroSlide(idx) {
  if (!confirm('\u00bfEliminar Slide ' + (idx + 2) + '?')) return;
  _heroSlides.splice(idx, 1);
  if (_activeSlideIdx > _heroSlides.length) {
    _activeSlideIdx = _heroSlides.length;
  }
  var data = (_activeSlideIdx === 0) ? _heroSlide0Data : (_heroSlides[_activeSlideIdx - 1] || {});
  _loadTabDataToForm(data);
  renderSlideTabs();
}


window.uploadLoginPanelImg = function(input) {
  var file = input.files[0];
  if (!file || !_sb || !_userId) return;
  var lbl  = document.getElementById('lp-img-lbl');
  var prev = document.getElementById('lp-img-prev');
  if (lbl) { lbl.textContent = 'Subiendo...'; lbl.style.color = '#c4ff3d'; }
  var ext  = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
  var path = _userId + '/login-panel/bg-' + Date.now() + '.' + ext;
  _sb.storage.from('avatars').upload(path, file, { upsert: true, contentType: file.type || 'image/jpeg' })
    .then(function(res) {
      if (res.error) {
        if (lbl) { lbl.textContent = '✗ ' + res.error.message; lbl.style.color = '#f43f5e'; }
        return;
      }
      var purl = _sb.storage.from('avatars').getPublicUrl(path).data.publicUrl;
      var hiddenInput = document.getElementById('lp-ed-img');
      if (hiddenInput) hiddenInput.value = purl;
      if (prev) { prev.src = purl + '?t=' + Date.now(); prev.style.display = 'block'; }
      if (lbl) { lbl.textContent = '✓ Imagen lista'; lbl.style.color = '#c4ff3d'; }
      input.value = '';
    });
};
// ── LOGIN PANEL CONFIG ────────────────────────────────────────
function loadLoginPanel() {
  _sb.from('login_panel_config').select('*').eq('id','main').maybeSingle().then(function(res) {
    var d = res.data;
    if (!d) return;
    var set = function(id, v) { var el = document.getElementById(id); if (el) el.value = v || ''; };
    (function(){ var el=document.getElementById('lp-ed-titulo'); if(el) el.innerHTML=d.titulo||''; })();
    set('lp-ed-img',     d.imagen_url);
    // Mostrar imagen actual si existe
    if (d.imagen_url) {
      var prev = document.getElementById('lp-img-prev');
      var lbl  = document.getElementById('lp-img-lbl');
      if (prev) { prev.src = d.imagen_url; prev.style.display = 'block'; }
      if (lbl)  { lbl.textContent = '✓ Con imagen'; lbl.style.color = '#c4ff3d'; }
    }
    set('lp-ed-sub',     d.subtitulo);
    set('lp-ed-s1v',     d.stat1_valor);
    set('lp-ed-s1l',     d.stat1_label);
    set('lp-ed-s2v',     d.stat2_valor);
    set('lp-ed-s2l',     d.stat2_label);
    set('lp-ed-s3v',     d.stat3_valor);
    set('lp-ed-s3l',     d.stat3_label);
    set('lp-ed-badge',   d.badge_count);
    set('lp-ed-version', d.version_label);
  });
}

window.saveLoginPanel = function() {
  var get = function(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
  var payload = {
    id:            'main',
    titulo:        (function(){ var el=document.getElementById('lp-ed-titulo'); return el?el.innerHTML.trim():''; })(),
    imagen_url:    get('lp-ed-img'),
    subtitulo:     get('lp-ed-sub'),
    stat1_valor:   get('lp-ed-s1v'),
    stat1_label:   get('lp-ed-s1l'),
    stat2_valor:   get('lp-ed-s2v'),
    stat2_label:   get('lp-ed-s2l'),
    stat3_valor:   get('lp-ed-s3v'),
    stat3_label:   get('lp-ed-s3l'),
    badge_count:   get('lp-ed-badge'),
    version_label: get('lp-ed-version'),
    updated_at:    new Date().toISOString(),
  };
  _sb.from('login_panel_config').upsert(payload, { onConflict: 'id' }).then(function(res) {
    var msg = document.getElementById('lp-save-msg');
    if (res.error) {
      if (msg) { msg.textContent = '❌ Error: ' + res.error.message; msg.style.display = 'inline'; }
    } else {
      if (msg) { msg.style.display = 'inline'; setTimeout(function(){ msg.style.display = 'none'; }, 3000); }
    }
  });
};


// ── TOPIC FEATURED BANNER ────────────────────────────────────
var _TF_RANK_COLORS = {
  Bronce:'#cd7f32', Plata:'#d1d5db', Oro:'#fbbf24',
  Platino:'#5eead4', Diamante:'#60a5fa', Challenger:'#c084fc'
};

window.tfUpdatePreview = function() {
  var t1   = (document.getElementById('tf-titulo1')||{value:''}).value.toUpperCase() || 'TÍTULO';
  var t2   = (document.getElementById('tf-titulo2')||{value:''}).value.toUpperCase();
  var sub  = (document.getElementById('tf-subtitulo')||{value:''}).value || 'Subtítulo';
  var rank = (document.getElementById('tf-rank')||{value:'Bronce'}).value;
  var cefr = (document.getElementById('tf-cefr')||{value:'A1'}).value;
  var tipo = (document.getElementById('tf-tipo')||{value:'Grammar'}).value;
  var col  = _TF_RANK_COLORS[rank] || '#cd7f32';

  var titleEl = document.getElementById('tf-prev-title');
  if (titleEl) titleEl.innerHTML = t2 ? (t1 + '<br>' + t2) : t1;

  var subEl = document.getElementById('tf-prev-sub');
  if (subEl) subEl.textContent = sub;

  var rankEl = document.getElementById('tf-prev-rank');
  if (rankEl) {
    rankEl.querySelector('span').style.background   = col;
    rankEl.querySelector('span').style.boxShadow    = '0 0 8px ' + col;
    rankEl.lastChild.textContent = rank;
  }

  var cefrEl = document.getElementById('tf-prev-cefr');
  if (cefrEl) { cefrEl.textContent = cefr; cefrEl.style.background = col; }

  var tipoEl = document.getElementById('tf-prev-tipo');
  if (tipoEl) tipoEl.textContent = '◎ ' + tipo;

  var preview = document.getElementById('tf-preview');
  if (preview) preview.style.setProperty('--tf-rk-color', col);
};

function loadTopicFeatured() {
  if (!_sb) return;
  var DEF_IMG = 'https://image.pollinations.ai/prompt/diverse%20silhouettes%20of%20faces%2C%20identity%2C%20portraits%2C%20minimalist%20abstract%20concept%20art%2C%20dark%20moody%20cinematic%20photography%2C%20deep%20shadows%2C%20dramatic%20lighting?width=1280&height=720&nologo=true&model=flux&seed=42';
  var DEFS = {titulo:'THE IDENTITY',subtitulo:'CODE',tag:'Personal Pronouns',
    imagen_url:DEF_IMG,stat1_num:'Bronce',stat1_lbl:'A1',stat2_num:'Grammar'};
  _sb.from('admin_hero_config').select('*').eq('id','topic_featured').maybeSingle().then(function(res) {
    var d = res.data || DEFS;
    var set = function(id,v){ var el=document.getElementById(id); if(el) el.value=v||''; };
    set('tf-titulo1',  d.titulo    || DEFS.titulo);
    set('tf-titulo2',  d.subtitulo || DEFS.subtitulo);
    set('tf-subtitulo',d.tag       || DEFS.tag);
    set('tf-img-url',  d.imagen_url|| DEFS.imagen_url);
    set('tf-rank',     d.stat1_num || 'Bronce');
    set('tf-cefr',     d.stat1_lbl || 'A1');
    set('tf-tipo',     d.stat2_num || 'Grammar');
    var imgUrl = d.imagen_url || DEFS.imagen_url;
    var bg = document.getElementById('tf-prev-bg');
    if (bg) bg.style.backgroundImage = 'url(' + imgUrl + ')';
    var thumb = document.getElementById('tf-img-prev');
    if (thumb) { thumb.src = imgUrl; thumb.style.display = 'block'; }
    var lbl = document.getElementById('tf-img-lbl');
    if (lbl) lbl.textContent = res.data ? 'Imagen guardada ✓' : 'Imagen por defecto';
    tfUpdatePreview();
  });
}

window.uploadTopicFeaturedImg = function(input) {
  var file = input.files[0];
  if (!file || !_sb || !_userId) return;
  var lbl = document.getElementById('tf-img-lbl');
  if (lbl) { lbl.textContent = 'Subiendo...'; lbl.style.color = '#c4ff3d'; }
  var ext  = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g,'');
  var path = _userId + '/topic-featured/banner-' + Date.now() + '.' + ext;
  _sb.storage.from('avatars').upload(path, file, { upsert: true, contentType: file.type || 'image/jpeg' })
    .then(function(res) {
      if (res.error) {
        if (lbl) { lbl.textContent = '✗ ' + res.error.message; lbl.style.color = '#f43f5e'; }
        return;
      }
      var purl = _sb.storage.from('avatars').getPublicUrl(path).data.publicUrl;
      var hidden = document.getElementById('tf-img-url');
      if (hidden) hidden.value = purl;
      var bg = document.getElementById('tf-prev-bg');
      if (bg) bg.style.backgroundImage = 'url(' + purl + '?t=' + Date.now() + ')';
      if (lbl) { lbl.textContent = '✓ Imagen lista'; lbl.style.color = '#c4ff3d'; }
      input.value = '';
    });
};

window.saveTopicFeatured = function() {
  if (!_sb) return;
  var get = function(id) { var el=document.getElementById(id); return el ? el.value.trim() : ''; };
  var payload = {
    id:         'topic_featured',
    imagen_url: get('tf-img-url'),
    titulo:     get('tf-titulo1').toUpperCase(),
    subtitulo:  get('tf-titulo2').toUpperCase(),
    tag:        get('tf-subtitulo'),
    stat1_num:  get('tf-rank'),
    stat1_lbl:  get('tf-cefr'),
    stat2_num:  get('tf-tipo'),
    updated_at: new Date().toISOString()
  };
  _sb.from('admin_hero_config').upsert(payload, { onConflict: 'id' }).then(function(res) {
    var msg = document.getElementById('tf-save-msg');
    if (res.error) {
      if (msg) { msg.textContent = '❌ ' + res.error.message; msg.style.display = 'inline'; }
    } else {
      if (msg) { msg.style.display = 'inline'; setTimeout(function(){ msg.style.display = 'none'; }, 3000); }
    }
  });
};

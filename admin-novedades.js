// ── ADMIN NOVEDADES — novedades, hero slider y editor ───────────────────────
// Globals: _sb, novedadesData, _heroSlides, _heroSlideImgs

/* ── NOVEDADES ───────────────────────────── */
function loadNovedades() {
  _sb.from('admin_hero_config').select('*').eq('id','hero_1').single().then(function(res) {
    if (res.data) { populateHeroPreview(res.data); }
  });
  _sb.from('novedades').select('*').order('orden',{ascending:true}).then(function(res) {
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
  _sb.from('admin_hero_config').select('*').eq('id','hero_1').single().then(function(res) {
    var d = res.data || {};
    setHeroModo(d.modo || 'static');
    var hcol = document.getElementById('h-color');
    if (hcol) hcol.value = d.color_acento || '#c4ff3d';
    _heroSlides = [];
    _heroSlideImgs = {};
    try { _heroSlides = JSON.parse(d.slides_json || '[]'); } catch(e) {}
    renderSlidesList();
    setHeroModo(d.modo || 'static');
    var hcol = document.getElementById('h-color');
    if (hcol) hcol.value = d.color_acento || '#c4ff3d';
    _heroSlides = [];
    _heroSlideImgs = {};
    try { _heroSlides = JSON.parse(d.slides_json || '[]'); } catch(e) {}
    renderSlidesList();
    document.getElementById('h-img').value = d.imagen_url || '';
    var _hPrev = document.getElementById('h-img-prev');
    var _hPrevImg = document.getElementById('h-img-prev-img');
    var _hLbl = document.getElementById('h-img-lbl');
    if (d.imagen_url && _hPrev && _hPrevImg) {
      _hPrevImg.src = d.imagen_url; _hPrev.style.display = 'block';
      if (_hLbl) _hLbl.textContent = 'Imagen actual';
    } else if (_hPrev) { _hPrev.style.display = 'none'; if (_hLbl) _hLbl.textContent = 'Sin imagen'; }
    var _hPrev = document.getElementById('h-img-prev');
    var _hPrevImg = document.getElementById('h-img-prev-img');
    var _hLbl = document.getElementById('h-img-lbl');
    if (d.imagen_url && _hPrev && _hPrevImg) {
      _hPrevImg.src = d.imagen_url; _hPrev.style.display = 'block';
      if (_hLbl) _hLbl.textContent = 'Imagen actual';
    } else if (_hPrev) { _hPrev.style.display = 'none'; if (_hLbl) _hLbl.textContent = 'Sin imagen'; }
    var _hPrev = document.getElementById('h-img-prev');
    var _hPrevImg = document.getElementById('h-img-prev-img');
    var _hLbl = document.getElementById('h-img-lbl');
    if (d.imagen_url && _hPrev && _hPrevImg) {
      _hPrevImg.src = d.imagen_url; _hPrev.style.display = 'block';
      if (_hLbl) _hLbl.textContent = 'Imagen actual';
    } else if (_hPrev) {
      _hPrev.style.display = 'none';
      if (_hLbl) _hLbl.textContent = 'Sin imagen';
    }
    document.getElementById('h-tag').value = d.tag || '';
    document.getElementById('h-titulo').value = d.titulo || '';
    document.getElementById('h-sub').value = d.subtitulo || '';
    document.getElementById('h-btn1').value = d.btn1_texto || '';
    document.getElementById('h-btn2').value = d.btn2_texto || '';
    document.getElementById('h-stat-ti').value = d.stat_titulo || '';
    document.getElementById('h-s1n').value = d.stat1_num || '';
    document.getElementById('h-s1l').value = d.stat1_lbl || '';
    document.getElementById('h-s2n').value = d.stat2_num || '';
    document.getElementById('h-s2l').value = d.stat2_lbl || '';
    document.getElementById('h-s3n').value = d.stat3_num || '';
    document.getElementById('h-s3l').value = d.stat3_lbl || '';
    openModal('hero-modal');
  });
}

function saveHero() {
  var slides = _heroSlides.map(function(s,i){ return getSlideData(i); });
  // Campos base — siempre existen en la tabla
  var basePayload = {
    id:'hero_1',
    imagen_url: document.getElementById('h-img').value,
    tag: document.getElementById('h-tag').value,
    titulo: document.getElementById('h-titulo').value,
    subtitulo: document.getElementById('h-sub').value,
    btn1_texto: document.getElementById('h-btn1').value,
    btn2_texto: document.getElementById('h-btn2').value,
    stat_titulo: document.getElementById('h-stat-ti').value,
    stat1_num: document.getElementById('h-s1n').value,
    stat1_lbl: document.getElementById('h-s1l').value,
    stat2_num: document.getElementById('h-s2n').value,
    stat2_lbl: document.getElementById('h-s2l').value,
    stat3_num: document.getElementById('h-s3n').value,
    stat3_lbl: document.getElementById('h-s3l').value,
    updated_at: new Date().toISOString()
  };
  // Campos nuevos — solo si existen las columnas en Supabase
  var fullPayload = Object.assign({}, basePayload, {
    modo: (document.getElementById('h-modo')||{value:'static'}).value || 'static',
    color_acento: (document.getElementById('h-color')||{value:'#c4ff3d'}).value,
    slides_json: JSON.stringify(slides)
  });

  _sb.from('admin_hero_config').upsert(fullPayload).then(function(res) {
    if (res.error) {
      var msg = res.error.message || '';
      // Si el error es por columnas faltantes, guardar solo campos base
      if (msg.indexOf('color_acento') !== -1 || msg.indexOf('modo') !== -1 || msg.indexOf('slides_json') !== -1) {
        _sb.from('admin_hero_config').upsert(basePayload).then(function(r2) {
          if (r2.error) { showToast('Error: '+r2.error.message, true); return; }
          closeModal('hero-modal');
          showToast('Portada guardada — ejecuta el SQL en Supabase para activar slider y color');
          openHeroModal();
        });
      } else {
        showToast('Error: '+msg, true);
      }
      return;
    }
    closeModal('hero-modal');
    showToast('Portada actualizada ✓');
    openHeroModal();
  });
}

function renderNovedades(items) {
  var list = document.getElementById('nv-list');
  if (!items.length) {
    list.innerHTML = '<div style="text-align:center;color:var(--muted);padding:24px;font-size:13px;background:var(--card);border-radius:var(--r-sm)">Sin novedades. Agrega una con el botón de arriba.</div>';
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
    _sb.from('novedades').insert(Object.assign({activo:true, orden:novedadesData.length}, payload));
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


/* ══ HERO SLIDER ADMIN ══════════════════════════════════════════════════════ */
var _heroSlides   = [];
var _heroSlideImgs = {};

function setHeroModo(modo) {
  var inp = document.getElementById('h-modo');
  if (inp) inp.value = modo;
  var bs = document.getElementById('ht-btn-static');
  var bl = document.getElementById('ht-btn-slider');
  if (bs) bs.classList.toggle('ht-active', modo === 'static');
  if (bl) bl.classList.toggle('ht-active', modo === 'slider');
  var sec = document.getElementById('h-slider-sec');
  if (sec) sec.style.display = modo === 'slider' ? 'block' : 'none';
}

function addHeroSlide() {
  _heroSlides.push({imagen_url:'',tag:'',titulo:'',subtitulo:'',
    btn1_texto:'',btn2_texto:'',stat_titulo:'',
    stat1_num:'',stat1_lbl:'',stat2_num:'',stat2_lbl:'',stat3_num:'',stat3_lbl:''});
  renderSlidesList();
  var last = document.querySelector('#h-slides-list .h-slide-card:last-child');
  if (last) last.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function removeHeroSlide(idx) {
  _heroSlides.splice(idx,1);
  delete _heroSlideImgs[idx];
  renderSlidesList();
}

function _esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }

function renderSlidesList() {
  var list = document.getElementById('h-slides-list');
  if (!list) return;
  list.innerHTML = _heroSlides.map(function(s,i){
    var imgUrl = _heroSlideImgs[i] || s.imagen_url || '';
    return '<div class="h-slide-card">'+
      '<div class="h-slide-card-hd">'+
        '<span><i class="ti ti-photo" style="margin-right:5px;color:var(--accent)"></i>Slide '+(i+2)+'</span>'+
        '<button class="h-slide-card-del" type="button" onclick="removeHeroSlide('+i+')"><i class="ti ti-trash"></i> Eliminar</button>'+
      '</div>'+
      '<div class="h-slide-body">'+
        '<div class="m-field full">'+
          '<label>Imagen</label>'+
          '<input type="file" id="hs-img-file-'+i+'" accept="image/*" style="display:none" onchange="uploadSlideImg(this,'+i+')">'+
          '<div style="display:flex;align-items:center;gap:8px;margin-top:4px">'+
            '<label for="hs-img-file-'+i+'" style="padding:6px 12px;border-radius:7px;background:var(--card-2);border:1px solid var(--line);color:var(--ink);font-size:11px;cursor:pointer;display:inline-flex;align-items:center;gap:5px;user-select:none"><i class="ti ti-upload"></i>Subir imagen</label>'+
            '<span id="hs-img-lbl-'+i+'" style="font-size:10px;color:var(--muted)">'+(imgUrl?'✓ Con imagen':'Sin imagen')+'</span>'+
          '</div>'+
          (imgUrl?'<img id="hs-img-prev-'+i+'" src="'+_esc(imgUrl)+'" style="margin-top:6px;width:100%;height:80px;object-fit:cover;border-radius:6px">':'<img id="hs-img-prev-'+i+'" style="display:none;margin-top:6px;width:100%;height:80px;object-fit:cover;border-radius:6px">')+
        '</div>'+
        '<div class="m-field full"><label>Tag</label><input type="text" id="hs-tag-'+i+'" value="'+_esc(s.tag)+'" placeholder="novedad · mayo 2026"></div>'+
        '<div class="m-field full"><label>Título</label><input type="text" id="hs-titulo-'+i+'" value="'+_esc(s.titulo)+'" placeholder="Título del slide"></div>'+
        '<div class="m-field full"><label>Descripción</label><input type="text" id="hs-sub-'+i+'" value="'+_esc(s.subtitulo)+'" placeholder="Descripción corta..."></div>'+
        '<div class="m-field"><label>Botón 1</label><input type="text" id="hs-btn1-'+i+'" value="'+_esc(s.btn1_texto)+'" placeholder="Probar ahora →"></div>'+
        '<div class="m-field"><label>Botón 2</label><input type="text" id="hs-btn2-'+i+'" value="'+_esc(s.btn2_texto)+'" placeholder="Ver demo"></div>'+
        '<div class="m-field full"><label>Etiqueta stat <small style="color:var(--muted);font-weight:400">(ej: resultados beta)</small></label><input type="text" id="hs-stat-ti-'+i+'" value="'+_esc(s.stat_titulo)+'" placeholder="resultados beta"></div>'+
        '<div class="m-field full"><label>Valor stat grande <small style="color:var(--muted);font-weight:400">(ej: +3.4× retención)</small></label><input type="text" id="hs-stat-val-'+i+'" value="'+_esc(s.stat_valor||'')+'" placeholder="+3.4× retención a 30 días"></div>'+
        '<div class="m-field"><label>Dato 1 núm</label><input type="text" id="hs-s1n-'+i+'" value="'+_esc(s.stat1_num)+'" placeholder="9 min"></div>'+
        '<div class="m-field"><label>Dato 1 etiq</label><input type="text" id="hs-s1l-'+i+'" value="'+_esc(s.stat1_lbl)+'" placeholder="al día"></div>'+
        '<div class="m-field"><label>Dato 2 núm</label><input type="text" id="hs-s2n-'+i+'" value="'+_esc(s.stat2_num)+'" placeholder="1.840"></div>'+
        '<div class="m-field"><label>Dato 2 etiq</label><input type="text" id="hs-s2l-'+i+'" value="'+_esc(s.stat2_lbl)+'" placeholder="palabras"></div>'+
        '<div class="m-field"><label>Dato 3 núm</label><input type="text" id="hs-s3n-'+i+'" value="'+_esc(s.stat3_num)+'" placeholder="92%"></div>'+
        '<div class="m-field"><label>Dato 3 etiq</label><input type="text" id="hs-s3l-'+i+'" value="'+_esc(s.stat3_lbl)+'" placeholder="recall"></div>'+
      '</div>'+
    '</div>';
  }).join('');
}

function getSlideData(i) {
  function g(id){ var el=document.getElementById(id); return el?el.value:''; }
  return {
    imagen_url: _heroSlideImgs[i] || (_heroSlides[i]&&_heroSlides[i].imagen_url) || '',
    tag:g('hs-tag-'+i), titulo:g('hs-titulo-'+i), subtitulo:g('hs-sub-'+i),
    btn1_texto:g('hs-btn1-'+i), btn2_texto:g('hs-btn2-'+i),
    stat_titulo:g('hs-stat-ti-'+i), stat_valor:g('hs-stat-val-'+i),
    stat1_num:g('hs-s1n-'+i), stat1_lbl:g('hs-s1l-'+i),
    stat2_num:g('hs-s2n-'+i), stat2_lbl:g('hs-s2l-'+i),
    stat3_num:g('hs-s3n-'+i), stat3_lbl:g('hs-s3l-'+i)
  };
}

function uploadSlideImg(input, idx) {
  var file = input.files[0];
  if (!file||!_sb||!_userId) return;
  var lbl = document.getElementById('hs-img-lbl-'+idx);
  if (lbl) { lbl.textContent='Subiendo...'; lbl.style.color='#c4ff3d'; }
  var ext = (file.name.split('.').pop()||'jpg').toLowerCase().replace(/[^a-z0-9]/g,'');
  var path = _userId+'/novedades/slide-'+idx+'-'+Date.now()+'.'+ext;
  _sb.storage.from('avatars').upload(path,file,{upsert:true,contentType:file.type||'image/jpeg'})
    .then(function(res){
      if(res.error){ if(lbl){lbl.textContent='✗ '+res.error.message;lbl.style.color='#f43f5e';} return; }
      var purl = _sb.storage.from('avatars').getPublicUrl(path).data.publicUrl;
      _heroSlideImgs[idx] = purl;
      var prev = document.getElementById('hs-img-prev-'+idx);
      if(prev){ prev.src=purl+'?t='+Date.now(); prev.style.display='block'; }
      if(lbl){ lbl.textContent='✓ Imagen lista'; lbl.style.color='#c4ff3d'; }
      input.value='';
    });
}

// ══════════════════════════════════════════════════════
//  PELÍCULAS — gestión completa
// ══════════════════════════════════════════════════════
var _pelEdit      = null;   // ID de la película en edición (null = nueva)
var _pelEscenas   = [];     // array de escenas en el modal
var _pelImgs      = {};     // portadas temporales: {pelicula: url, escena_0: url, ...}
var _pelTranscripts = {};   // transcripciones cargadas: {escena_0: jsonString, ...}
var _pelAudios      = {};   // audios subidos por el usuario: {e0: url, e1: url, ...}

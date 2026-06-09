// ── ADMIN NOVEDADES — novedades, hero slider y editor ───────────────────────
// Globals: _sb, novedadesData, _heroSlides, _heroSlideImgs

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
    } else if (_hPrev) {
      _hPrev.style.display = 'none';
      if (_hLbl) _hLbl.textContent = 'Sin imagen';
    }
    document.getElementById('h-tag').value = d.tag || '';
    document.getElementById('h-titulo').value = d.titulo || '';
    document.getElementById('h-sub').value = d.subtitulo || '';
    document.getElementById('h-btn1').value = d.btn1_texto || '';
    document.getElementById('h-btn2').value = d.btn2_texto || '';
    var _hb1u = document.getElementById('h-btn1-url'); if(_hb1u) _hb1u.value = d.btn1_url || '';
    var _hb2u = document.getElementById('h-btn2-url'); if(_hb2u) _hb2u.value = d.btn2_url || '';
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
  var lang = window.admLang || 'en';
  var slides = _heroSlides.map(function(s,i){ return getSlideData(i); });
  var basePayload = {
    id: 'hero_'+lang,
    imagen_url: document.getElementById('h-img').value,
    tag: document.getElementById('h-tag').value,
    titulo: document.getElementById('h-titulo').value,
    subtitulo: document.getElementById('h-sub').value,
    btn1_texto: document.getElementById('h-btn1').value,
    btn2_texto: document.getElementById('h-btn2').value,
    btn1_url: document.getElementById('h-btn1-url').value,
    btn2_url: document.getElementById('h-btn2-url').value,
    stat_titulo: document.getElementById('h-stat-ti').value,
    stat1_num: document.getElementById('h-s1n').value,
    stat1_lbl: document.getElementById('h-s1l').value,
    stat2_num: document.getElementById('h-s2n').value,
    stat2_lbl: document.getElementById('h-s2l').value,
    stat3_num: document.getElementById('h-s3n').value,
    stat3_lbl: document.getElementById('h-s3l').value,
    updated_at: new Date().toISOString()
  };
  var fullPayload = Object.assign({}, basePayload, {
    modo: (document.getElementById('h-modo')||{value:'static'}).value || 'static',
    color_acento: (document.getElementById('h-color')||{value:'#c4ff3d'}).value,
    slides_json: JSON.stringify(slides)
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
          '<div style="display:flex;align-items:center;gap:8px;margin-top:4px;flex-wrap:wrap">'+
            '<label for="hs-img-file-'+i+'" style="padding:6px 12px;border-radius:7px;background:var(--card-2);border:1px solid var(--line);color:var(--ink);font-size:11px;cursor:pointer;display:inline-flex;align-items:center;gap:5px;user-select:none"><i class="ti ti-upload"></i>Subir imagen</label>'+
            '<button type="button" onclick="showNbPanel('hs-nb-panel-'+i+'')" style="padding:6px 12px;border-radius:7px;background:#16a34a22;border:1px solid #4ade8044;color:#4ade80;font-size:11px;cursor:pointer;display:inline-flex;align-items:center;gap:5px;user-select:none"><i class="ti ti-sparkles"></i>Generar con IA</button>'+
            '<span id="hs-img-lbl-'+i+'" style="font-size:10px;color:var(--muted)">'+(imgUrl?'&#x2713; Con imagen':'Sin imagen')+'</span>'+
          '</div>'+
          '<div id="hs-nb-panel-'+i+'" style="display:none;margin-top:8px;background:#0a1a0a;border:1px solid #4ade8033;border-radius:8px;padding:10px">'+
            '<div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap">'+
              '<input id="hs-nb-prompt-'+i+'" type="text" placeholder="Describe la imagen..." style="flex:1;min-width:160px;background:#ffffff08;border:1px solid #4ade8033;color:#f0ede6;padding:6px 10px;font-size:11px;border-radius:6px;outline:none">'+
              '<select id="hs-nb-model-'+i+'" style="background:#111;border:1px solid #4ade8033;color:#f0ede6;padding:6px 8px;font-size:11px;border-radius:6px;outline:none">'+
                '<option value="gemini-2.5-flash-image">Nano Banana</option>'+
                '<option value="gemini-3.1-flash-image" selected>Nano Banana 2</option>'+
                '<option value="gemini-3-pro-image">Nano Banana Pro</option>'+
              '</select>'+
            '</div>'+
            '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">'+
              '<button type="button" onclick="generateImgNanoBanana('hs-nb-prompt-'+i+'','hs-nb-model-'+i+'','hs-nb-status-'+i+'','hs-nb-preview-area-'+i+'','hs-nb-preview-img-'+i+'')" style="background:#16a34a;color:#fff;border:none;border-radius:6px;padding:6px 14px;cursor:pointer;font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:5px"><i class="ti ti-sparkles"></i>Generar</button>'+
              '<button type="button" onclick="improveNbPrompt('hs-nb-prompt-'+i+'','hs-nb-status-'+i+'')" style="background:#7c3aed22;color:#c084fc;border:1px solid #7c3aed55;border-radius:6px;padding:6px 12px;cursor:pointer;font-size:11px;display:inline-flex;align-items:center;gap:5px"><i class="ti ti-wand"></i>Mejorar prompt</button>'+
              '<span id="hs-nb-status-'+i+'" style="font-size:10px;color:var(--muted)"></span>'+
            '</div>'+
            '<div id="hs-nb-preview-area-'+i+'" style="display:none;margin-top:10px;border-top:1px solid #4ade8022;padding-top:10px">'+
              '<div id="hs-nb-drag-wrap-'+i+'" style="position:relative;overflow:hidden;height:160px;border-radius:8px;margin-bottom:8px;cursor:grab;user-select:none;background:#000">'+
                '<div style="position:absolute;top:6px;right:6px;background:#00000099;color:#fff;font-size:10px;padding:3px 8px;border-radius:4px;pointer-events:none;z-index:2">&#8597; Arrastra para encuadrar</div>'+
                '<img id="hs-nb-preview-img-'+i+'" draggable="false" ondragstart="return false" style="width:100%;height:auto;display:block;position:absolute;top:0;left:0;will-change:transform;pointer-events:none" onload="initNbDrag('hs-nb-drag-wrap-'+i+'','hs-nb-preview-img-'+i+'')">'+
              '</div>'+
              '<div style="display:flex;gap:8px">'+
                '<button type="button" onclick="approveNbImageSlide('hs-nb-preview-img-'+i+'','+i+','hs-nb-status-'+i+'','hs-nb-preview-area-'+i+'')" style="background:#16a34a;color:#fff;border:none;border-radius:6px;padding:6px 14px;cursor:pointer;font-size:11px;font-weight:700;display:inline-flex;align-items:center;gap:5px"><i class="ti ti-check"></i>Usar esta imagen</button>'+
                '<button type="button" onclick="generateImgNanoBanana('hs-nb-prompt-'+i+'','hs-nb-model-'+i+'','hs-nb-status-'+i+'','hs-nb-preview-area-'+i+'','hs-nb-preview-img-'+i+'')" style="background:#1e293b;color:#94a3b8;border:1px solid #334155;border-radius:6px;padding:6px 12px;cursor:pointer;font-size:11px;display:inline-flex;align-items:center;gap:5px"><i class="ti ti-refresh"></i>Regenerar</button>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div id="hs-img-drag-wrap-'+i+'" style="position:relative;overflow:hidden;height:100px;border-radius:6px;margin-top:6px;cursor:grab;user-select:none;background:#000'+(imgUrl?'':';display:none')+'">'+
            '<div style="position:absolute;top:4px;right:4px;background:#00000099;color:#fff;font-size:10px;padding:2px 6px;border-radius:4px;pointer-events:none;z-index:2">&#8597; Arrastra</div>'+
            '<img id="hs-img-prev-'+i+'" '+(imgUrl?'src="'+_esc(imgUrl)+'"':'')+' draggable="false" ondragstart="return false" style="width:100%;height:auto;display:block;position:absolute;top:0;left:0;will-change:transform;pointer-events:none" onload="initNbDrag('hs-img-drag-wrap-'+i+'','hs-img-prev-'+i+'')">'+
          '</div>'+
          '<button id="hs-save-frame-'+i+'" type="button" onclick="saveImgFrameSlide('hs-img-drag-wrap-'+i+'','hs-img-prev-'+i+'','+i+','hs-img-lbl-'+i+'')" style="margin-top:4px;background:#1e293b;color:#94a3b8;border:1px solid #334155;border-radius:6px;padding:4px 12px;cursor:pointer;font-size:11px;'+(imgUrl?'':'display:none;')+'display:inline-flex;align-items:center;gap:5px"><i class="ti ti-crop"></i>Guardar encuadre</button>'+
        '</div>'+
        '<div class="m-field full"><label>Tag</label><input type="text" id="hs-tag-'+i+'" value="'+_esc(s.tag)+'" placeholder="novedad \xb7 mayo 2026"></div>'+
        '<div class="m-field full"><label>T\xedtulo</label><input type="text" id="hs-titulo-'+i+'" value="'+_esc(s.titulo)+'" placeholder="T\xedtulo del slide"></div>'+
        '<div class="m-field full"><label>Descripci\xf3n</label><input type="text" id="hs-sub-'+i+'" value="'+_esc(s.subtitulo)+'" placeholder="Descripci\xf3n corta..."></div>'+
        '<div class="m-field"><label>Bot\xf3n 1</label><input type="text" id="hs-btn1-'+i+'" value="'+_esc(s.btn1_texto)+'" placeholder="Probar ahora →"></div>'+
        '<div class="m-field"><label>Bot\xf3n 2</label><input type="text" id="hs-btn2-'+i+'" value="'+_esc(s.btn2_texto)+'" placeholder="Ver demo"></div>'+
        '<div class="m-field full"><label>Etiqueta stat <small style="color:var(--muted);font-weight:400">(ej: resultados beta)</small></label><input type="text" id="hs-stat-ti-'+i+'" value="'+_esc(s.stat_titulo)+'" placeholder="resultados beta"></div>'+
        '<div class="m-field full"><label>Valor stat grande <small style="color:var(--muted);font-weight:400">(ej: +3.4\xd7 retenci\xf3n)</small></label><input type="text" id="hs-stat-val-'+i+'" value="'+_esc(s.stat_valor||'')+'" placeholder="+3.4\xd7 retenci\xf3n a 30 d\xedas"></div>'+
        '<div class="m-field"><label>Dato 1 n\xfam</label><input type="text" id="hs-s1n-'+i+'" value="'+_esc(s.stat1_num)+'" placeholder="9 min"></div>'+
        '<div class="m-field"><label>Dato 1 etiq</label><input type="text" id="hs-s1l-'+i+'" value="'+_esc(s.stat1_lbl)+'" placeholder="al d\xeda"></div>'+
        '<div class="m-field"><label>Dato 2 n\xfam</label><input type="text" id="hs-s2n-'+i+'" value="'+_esc(s.stat2_num)+'" placeholder="1.840"></div>'+
        '<div class="m-field"><label>Dato 2 etiq</label><input type="text" id="hs-s2l-'+i+'" value="'+_esc(s.stat2_lbl)+'" placeholder="palabras"></div>'+
        '<div class="m-field"><label>Dato 3 n\xfam</label><input type="text" id="hs-s3n-'+i+'" value="'+_esc(s.stat3_num)+'" placeholder="92%"></div>'+
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
      var wrap = document.getElementById('hs-img-drag-wrap-'+idx);
      var saveBtn = document.getElementById('hs-save-frame-'+idx);
      if(prev){ delete prev.dataset.dragInit; prev.src=purl+'?t='+Date.now(); }
      if(wrap){ delete wrap.dataset.dragInit; wrap.style.display='block'; }
      if(saveBtn){ saveBtn.style.display='inline-flex'; }
      if(lbl){ lbl.textContent='✓ Imagen lista'; lbl.style.color='#c4ff3d'; }
      input.value='';
    });
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

function approveNbImageSlide(previewImgId, slideIdx, statusId, previewAreaId) {
  var img = document.getElementById(previewImgId);
  if (!img || !img.src || img.src === window.location.href) { alert('No hay imagen pendiente'); return; }
  var statusEl = document.getElementById(statusId);
  if (statusEl) { statusEl.textContent = '⏳ Subiendo...'; statusEl.style.color = '#4ade80'; }
  var wrap = img.parentElement;
  var cw = wrap ? wrap.offsetWidth : 800;
  var ch = wrap ? wrap.offsetHeight : 160;
  var canvas = document.createElement('canvas');
  canvas.width = cw; canvas.height = ch;
  var ctx = canvas.getContext('2d');
  var offset = (typeof _nbDragOffset !== 'undefined' ? _nbDragOffset[previewImgId] : 0) || 0;
  var scale = img.naturalWidth > 0 ? cw / img.naturalWidth : 1;
  ctx.drawImage(img, 0, -offset / scale, img.naturalWidth, ch / scale, 0, 0, cw, ch);
  canvas.toBlob(function(blob) {
    var path = _userId + '/novedades/slide-ai-' + slideIdx + '-' + Date.now() + '.png';
    _sb.storage.from('avatars').upload(path, blob, { upsert: true, contentType: 'image/png' })
      .then(function(res) {
        if (res.error) {
          if (statusEl) { statusEl.textContent = '✗ Error subiendo'; statusEl.style.color = '#f43f5e'; }
          return;
        }
        var publicUrl = _sb.storage.from('avatars').getPublicUrl(path).data.publicUrl;
        _heroSlideImgs[slideIdx] = publicUrl;
        var prevImg = document.getElementById('hs-img-prev-'+slideIdx);
        var wrap2 = document.getElementById('hs-img-drag-wrap-'+slideIdx);
        var saveBtn = document.getElementById('hs-save-frame-'+slideIdx);
        var lbl = document.getElementById('hs-img-lbl-'+slideIdx);
        if (prevImg) { delete prevImg.dataset.dragInit; prevImg.src = publicUrl; }
        if (wrap2) { delete wrap2.dataset.dragInit; wrap2.style.display = 'block'; }
        if (saveBtn) saveBtn.style.display = 'inline-flex';
        if (lbl) { lbl.textContent = '✓ Imagen aplicada'; lbl.style.color = '#c4ff3d'; }
        if (statusEl) { statusEl.textContent = '✓ Aplicada'; statusEl.style.color = '#c4ff3d'; }
        document.getElementById(previewAreaId).style.display = 'none';
      });
  }, 'image/png');
}

function saveImgFrameSlide(wrapperId, imgId, slideIdx, lblId) {
  var wrap = document.getElementById(wrapperId);
  var img = document.getElementById(imgId);
  if (!img || !img.src || img.src === window.location.href) return;
  var cw = wrap ? wrap.offsetWidth : 800;
  var ch = wrap ? wrap.offsetHeight : 100;
  var canvas = document.createElement('canvas');
  canvas.width = cw; canvas.height = ch;
  var ctx = canvas.getContext('2d');
  var offset = (typeof _nbDragOffset !== 'undefined' ? _nbDragOffset[imgId] : 0) || 0;
  var scale = img.naturalWidth > 0 ? cw / img.naturalWidth : 1;
  ctx.drawImage(img, 0, -offset / scale, img.naturalWidth, ch / scale, 0, 0, cw, ch);
  canvas.toBlob(function(blob) {
    var path = _userId + '/novedades/slide-framed-' + slideIdx + '-' + Date.now() + '.png';
    _sb.storage.from('avatars').upload(path, blob, { upsert: true, contentType: 'image/png' })
      .then(function(res) {
        if (res.error) { alert('Error al guardar encuadre'); return; }
        var publicUrl = _sb.storage.from('avatars').getPublicUrl(path).data.publicUrl;
        _heroSlideImgs[slideIdx] = publicUrl;
        img.src = publicUrl;
        if (typeof _nbDragOffset !== 'undefined') { _nbDragOffset[imgId] = 0; }
        img.style.transform = '';
        var lbl = document.getElementById(lblId);
        if (lbl) { lbl.textContent = '✓ Encuadre guardado'; lbl.style.color = '#c4ff3d'; }
      });
  }, 'image/png');
}

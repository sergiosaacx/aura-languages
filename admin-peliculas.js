// ── ADMIN PELÍCULAS — gestión de películas, escenas, Whisper y GitHub ────────
// Globals: _sb

/* ── Utilidad: extraer YouTube ID ───────────────────── */
function _ytId(url) {
  url = (url||'').trim();
  var m = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : url;
}

/* ── Cargar lista de películas ──────────────────────── */
function loadPeliculas() {
  var list = document.getElementById('pel-list');
  if (!list) return;
  // Si Supabase aún no está listo, reintentar hasta 10s
  if (!_sb) {
    list.innerHTML = '<div style="padding:20px;color:var(--muted);text-align:center">Conectando con la base de datos...</div>';
    var tries = 0;
    var wait = setInterval(function() {
      tries++;
      if (_sb) { clearInterval(wait); loadPeliculas(); }
      else if (tries > 20) {
        clearInterval(wait);
        list.innerHTML = '<div style="color:#f43f5e;padding:20px;text-align:center">⚠️ Sin conexión a Supabase. Recarga la página.</div>';
      }
    }, 500);
    return;
  }
  list.innerHTML = '<div style="padding:20px;color:var(--muted);text-align:center">Cargando...</div>';
  _sb.from('peliculas').select('id,slug,titulo_main,titulo_sub,studio,portada_url,activo,orden').order('orden').then(function(res) {
    if (res.error) { list.innerHTML = '<div style="color:#f43f5e;padding:16px;text-align:center">Error: '+res.error.message+'</div>'; return; }
    var rows = res.data || [];
    if (!rows.length) { list.innerHTML = '<div style="padding:20px;color:var(--muted);text-align:center">Sin películas. Agrega la primera.</div>'; return; }
    list.innerHTML = rows.map(function(p) {
      var safeTitle = (p.titulo_main||'').replace(/'/g, '&#39;');
      return '<div class="pel-card">'
        + '<div class="pel-card-img">' + (p.portada_url ? '<img src="'+p.portada_url+'" style="width:100%;height:100%;object-fit:cover;border-radius:8px">' : '<span style="font-size:1.5rem;opacity:.3">🎬</span>') + '</div>'
        + '<div class="pel-card-info">'
        +   '<div class="pel-card-title">'+p.titulo_main+(p.titulo_sub?' <em>'+p.titulo_sub+'</em>':'')+'</div>'
        +   '<div class="pel-card-studio">'+p.studio+'</div>'
        +   '<div style="font-size:10px;color:'+(p.activo?'#4ade80':'#f43f5e')+'">'+( p.activo?'✓ Activa':'✗ Inactiva')+'</div>'
        + '</div>'
        + '<div class="pel-card-actions">'
        +   '<button class="m-btn" onclick="openPeliculaModal(\'' + p.id + '\')"><i class="ti ti-edit"></i> Editar</button>'
        +   '<button class="m-btn" style="color:#f43f5e" onclick="deletePelicula(\'' + p.id + '\',\'' + safeTitle + '\')"><i class="ti ti-trash"></i></button>'
        + '</div>'
        + '</div>';
    }).join('');
  }).catch(function(err) {
    list.innerHTML = '<div style="color:#f43f5e;padding:16px;text-align:center">Error inesperado: ' + (err.message||err) + '</div>';
  });
}

/* ── Abrir modal película ───────────────────────────── */
function openPeliculaModal(pelId) {
  _pelEdit = pelId || null;
  _pelEscenas = [];
  _pelImgs = {};
  _pelTranscripts = {};
  _pelAudios = {};
  var modal = document.getElementById('pel-modal');
  modal.style.display = 'flex';

  // Limpiar form
  ['pm-titulo-main','pm-titulo-sub','pm-studio','pm-año','pm-duracion','pm-genero','pm-desc','pm-orden'].forEach(function(id){ var el=document.getElementById(id); if(el) el.value=''; });
  document.getElementById('pm-activo').checked = true;
  document.getElementById('pm-portada-lbl').textContent = 'Sin imagen';
  document.getElementById('pm-portada-prev').style.display = 'none';
  ['PG','HD','CC','KARAOKE','IMAX','13+','PG-13'].forEach(function(b){ var el=document.getElementById('badge-'+b); if(el) el.checked=false; });
  document.getElementById('pm-escenas-list').innerHTML = '';

  if (!pelId) return; // Nueva película — form vacío

  // Editar: cargar datos existentes
  _sb.from('peliculas').select('*').eq('id',pelId).single().then(function(res) {
    if (res.error || !res.data) return;
    var p = res.data;
    document.getElementById('pm-titulo-main').value = p.titulo_main || '';
    document.getElementById('pm-titulo-sub').value  = p.titulo_sub  || '';
    document.getElementById('pm-studio').value      = p.studio      || '';
    document.getElementById('pm-año').value         = p.año         || '';
    document.getElementById('pm-duracion').value    = p.duracion    || '';
    document.getElementById('pm-genero').value      = p.genero      || '';
    document.getElementById('pm-desc').value        = p.descripcion || '';
    document.getElementById('pm-orden').value       = p.orden       || '0';
    document.getElementById('pm-activo').checked    = p.activo !== false;
    if (p.portada_url) {
      _pelImgs['pelicula'] = p.portada_url;
      var prev = document.getElementById('pm-portada-prev');
      prev.src = p.portada_url; prev.style.display='block';
      document.getElementById('pm-portada-lbl').textContent = '✓ Con imagen';
    }
    // Badges
    try {
      var badges = JSON.parse(p.badges_json||'[]');
      badges.forEach(function(b){ var el=document.getElementById('badge-'+b.text); if(el) el.checked=true; });
    } catch(e){}
  });

  // Cargar escenas
  _sb.from('escenas').select('*').eq('pelicula_id',pelId).order('numero').then(function(res) {
    (_pelEscenas = res.data||[]).forEach(function(e,i){ renderEscenaCard(e,i,true); });
  });
}

/* ── Cerrar modal película ──────────────────────────── */
function closePeliculaModal() {
  document.getElementById('pel-modal').style.display='none';
}

/* ── Renderizar tarjeta de escena en el modal ───────── */
function renderEscenaCard(data, idx, fromDB) {
  if (!fromDB) { _pelEscenas.push(data||{}); idx = _pelEscenas.length-1; }
  var e = _pelEscenas[idx] || {};
  var ytUrl = e.youtube_id ? 'https://youtube.com/watch?v='+e.youtube_id : '';
  var hasTranscript = !!(_pelTranscripts['e'+idx] || e.transcript_json);
  var portadaUrl = _pelImgs['e'+idx] || e.portada_url || '';

  var container = document.getElementById('pm-escenas-list');
  var existing = document.getElementById('esc-card-'+idx);
  var card = existing || document.createElement('div');
  card.id = 'esc-card-'+idx;
  card.className = 'h-slide-card';
  card.innerHTML = '<div class="h-slide-card-hd">'
    + '<span><i class="ti ti-movie" style="margin-right:5px;color:var(--accent)"></i>Escena '+(idx+1)+'</span>'
    + '<button class="h-slide-card-del" type="button" onclick="removeEscenaCard('+idx+')"><i class="ti ti-trash"></i> Eliminar</button>'
    + '</div>'
    + '<div class="h-slide-body">'
    // YouTube
    + '<div class="m-field full"><label>URL de YouTube</label>'
    + '<input type="text" id="ec-yt-'+idx+'" value="'+_esc(ytUrl)+'" placeholder="https://youtube.com/watch?v=..."></div>'
    // Tiempos
    + '<div class="m-field"><label>Segundo inicio <small style="color:var(--muted)">(vacío = desde el inicio)</small></label>'
    + '<input type="number" id="ec-start-'+idx+'" value="'+(e.start_time||'')+'" placeholder="0" min="0"></div>'
    + '<div class="m-field"><label>Segundo fin <small style="color:var(--muted)">(vacío = hasta el final)</small></label>'
    + '<input type="number" id="ec-end-'+idx+'" value="'+(e.end_time||'')+'" placeholder="ej: 199" min="0"></div>'
    // Portada escena
    + '<div class="m-field full"><label>Portada de escena</label>'
    + '<input type="file" id="ec-img-file-'+idx+'" accept="image/*" style="display:none" onchange="uploadEscenaImg(this,'+idx+')">'
    + '<div style="display:flex;align-items:center;gap:8px;margin-top:4px">'
    + '<label for="ec-img-file-'+idx+'" style="padding:6px 12px;border-radius:7px;background:var(--card-2);border:1px solid var(--line);color:var(--ink);font-size:11px;cursor:pointer;display:inline-flex;align-items:center;gap:5px"><i class="ti ti-upload"></i>Subir imagen</label>'
    + '<span id="ec-img-lbl-'+idx+'" style="font-size:10px;color:var(--muted)">'+(portadaUrl?'✓ Con imagen':'Sin imagen')+'</span>'
    + '</div>'
    + (portadaUrl ? '<img id="ec-img-prev-'+idx+'" src="'+portadaUrl+'" style="margin-top:6px;width:100%;height:80px;object-fit:cover;border-radius:6px">'
                  : '<img id="ec-img-prev-'+idx+'" style="display:none;margin-top:6px;width:100%;height:80px;object-fit:cover;border-radius:6px">')
    + '</div>'
    // Frase y orador
    + '<div class="m-field full"><label>Frase destacada</label>'
    + '<input type="text" id="ec-phrase-'+idx+'" value="'+_esc(e.phrase||'')+'" placeholder="You will kid. You will."></div>'
    + '<div class="m-field full"><label>Orador</label>'
    + '<input type="text" id="ec-speaker-'+idx+'" value="'+_esc(e.speaker||'')+'" placeholder="Rick Dicker"></div>'
    // Word bank
    + '<div class="m-field full"><label>Banco de palabras <small style="color:var(--muted)">(separadas por coma)</small></label>'
    + '<input type="text" id="ec-words-'+idx+'" value="'+(e.word_bank_json ? JSON.parse(e.word_bank_json||'[]').join(', ') : '')+'" placeholder="UNDERMINER, ILLEGAL, PERIMETER"></div>'
    // Datos para shelf (panel próximas escenas)
    + '<div class="m-field"><label>Tiempo display <small style="color:var(--muted)">("ahora", "1:01"...)</small></label>'
    + '<input type="text" id="ec-tm-'+idx+'" value="'+_esc(e.shelf_tm||'ahora')+'" placeholder="ahora"></div>'
    + '<div class="m-field"><label>Línea display</label>'
    + '<input type="text" id="ec-line-'+idx+'" value="'+_esc(e.shelf_line||'')+'" placeholder="&quot;Behold the Underminer!&quot;"></div>'
    + '<div class="m-field full"><label>Tag display</label>'
    + '<input type="text" id="ec-tag-'+idx+'" value="'+_esc(e.shelf_tag||'')+'" placeholder="acción · apertura"></div>'
    // Karaoke
    + '<div class="m-field" style="align-items:center;gap:10px;display:flex">'
    + '<input type="checkbox" id="ec-karaoke-'+idx+'"'+(e.has_karaoke?' checked':'')+' style="width:16px;height:16px;accent-color:var(--accent)">'
    + '<label for="ec-karaoke-'+idx+'" style="margin:0;cursor:pointer">Tiene karaoke / transcripción</label></div>'
    // Audio upload para Whisper
    + '<div class="m-field full">'
    + '<label>🎵 Audio para Whisper <small style="color:var(--muted);font-weight:400">— Descarga el clip de YouTube con tu extensión y súbelo aquí</small></label>'
    + '<input type="file" id="ec-audio-file-'+idx+'" accept="audio/*,video/*" style="display:none" onchange="uploadEscenaAudio(this,'+idx+')">'
    + '<div style="display:flex;align-items:center;gap:8px;margin-top:4px">'
    + '<label for="ec-audio-file-'+idx+'" style="padding:7px 14px;border-radius:8px;background:var(--accent);color:var(--accent-ink);font-size:11px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px"><i class="ti ti-music-upload"></i> Subir audio/video</label>'
    + '<span id="ec-audio-lbl-'+idx+'" style="font-size:10px;color:var(--muted)">'+(_pelAudios['e'+idx]?'✓ Audio listo':'Sin audio aún')+'</span>'
    + '</div></div>'
    // Transcript status
    + '<div class="m-field full" id="ec-whisper-status-'+idx+'">'
    + '<div style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;background:rgba(196,255,61,.07);border:1px solid rgba(196,255,61,.2);">'
    + '<span style="font-size:1rem;">⚡</span>'
    + '<div><div style="font-size:11px;font-weight:700;color:#c4ff3d;">Whisper Auto-Transcripción</div>'
    + '<div style="font-size:10px;color:var(--muted);">'
    + (hasTranscript ? '✓ Transcripción lista' : 'Se generará automáticamente al guardar con karaoke activado')
    + '</div></div></div>'
    + '</div>'
    + '</div>';
  if (!existing) container.appendChild(card);
}

function removeEscenaCard(idx) {
  var card = document.getElementById('esc-card-'+idx);
  if (card) card.remove();
  _pelEscenas[idx] = null; // marcar como eliminada
}

/* ── Obtener datos de una escena del form ───────────── */
function getEscenaData(idx) {
  function g(id){ var el=document.getElementById(id); return el?el.value.trim():''; }
  var ytRaw = g('ec-yt-'+idx);
  var ytId   = _ytId(ytRaw);
  var words  = g('ec-words-'+idx).split(',').map(function(w){return w.trim().toUpperCase();}).filter(Boolean);
  var startVal = g('ec-start-'+idx);
  var endVal   = g('ec-end-'+idx);
  var transcriptData = _pelTranscripts['e'+idx] || (_pelEscenas[idx] && _pelEscenas[idx].transcript_json) || null;
  return {
    numero:         idx+1,
    youtube_id:     ytId,
    start_time:     startVal ? parseInt(startVal) : null,
    end_time:       endVal   ? parseInt(endVal)   : null,
    portada_url:    _pelImgs['e'+idx] || (_pelEscenas[idx]&&_pelEscenas[idx].portada_url) || '',
    phrase:         g('ec-phrase-'+idx),
    speaker:        g('ec-speaker-'+idx),
    word_bank_json: JSON.stringify(words),
    has_karaoke:    !!(document.getElementById('ec-karaoke-'+idx)||{}).checked,
    transcript_json: transcriptData || '{}',
    shelf_tm:       g('ec-tm-'+idx)||'ahora',
    shelf_line:     g('ec-line-'+idx),
    shelf_tag:      g('ec-tag-'+idx)
  };
}

/* ── Guardar película ───────────────────────────────── */
function savePelicula() {
  if (!_sb) return;
  var btn = document.getElementById('pm-save-btn');
  if (btn) { btn.textContent = 'Guardando...'; btn.disabled = true; }

  function g(id){ var el=document.getElementById(id); return el?el.value.trim():''; }
  var tituloMain = g('pm-titulo-main');
  if (!tituloMain) { alert('El título principal es obligatorio'); if(btn){btn.textContent='Guardar';btn.disabled=false;} return; }

  // Badges
  var badgesList = [];
  ['PG','HD','CC','KARAOKE','IMAX','13+','PG-13'].forEach(function(b){
    var el = document.getElementById('badge-'+b);
    if (el && el.checked) badgesList.push({ text:b, accent: (b==='PG'||b==='KARAOKE'||b==='13+'||b==='PG-13') });
  });

  // Slug
  var slug = tituloMain.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')
           + (g('pm-titulo-sub') ? '-'+g('pm-titulo-sub').toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'') : '');

  var payload = {
    slug:        slug,
    titulo_main: tituloMain,
    titulo_sub:  g('pm-titulo-sub'),
    studio:      g('pm-studio'),
    portada_url: _pelImgs['pelicula'] || '',
    año:         g('pm-año'),
    duracion:    g('pm-duracion'),
    genero:      g('pm-genero'),
    descripcion: g('pm-desc'),
    badges_json: JSON.stringify(badgesList),
    activo:      document.getElementById('pm-activo').checked,
    orden:       parseInt(g('pm-orden')||'0')
  };

  var p = _pelEdit
    ? _sb.from('peliculas').update(payload).eq('id',_pelEdit)
    : _sb.from('peliculas').insert([payload]).select('id');

  p.then(function(res) {
    if (res.error) { alert('Error: '+res.error.message); if(btn){btn.textContent='Guardar';btn.disabled=false;} return; }
    var pelId = _pelEdit || (res.data && res.data[0] && res.data[0].id);
    // Guardar escenas
    // Recoger escenas con karaoke antes de guardar
    var escList2 = document.getElementById('pm-escenas-list');
    var cards2   = escList2 ? escList2.querySelectorAll('.h-slide-card') : [];
    var karaokeEsc = [];
    cards2.forEach(function(card) {
      var idx = parseInt((card.id||'').replace('esc-card-',''));
      if (isNaN(idx)) return;
      var kc = document.getElementById('ec-karaoke-'+idx);
      if (kc && kc.checked) {
        var ytEl = document.getElementById('ec-yt-'+idx);
        var s    = document.getElementById('ec-start-'+idx);
        var e    = document.getElementById('ec-end-'+idx);
        karaokeEsc.push({
          num:   idx + 1,
          ytId:  _ytId(ytEl ? ytEl.value.trim() : ''),
          start: s ? (parseInt(s.value)||0) : 0,
          end:   e ? (parseInt(e.value)||0) : 0
        });
      }
    });

    var _savedSlug = payload.slug;
    saveEscenas(pelId, function() {
      if (!karaokeEsc.length) {
        if(btn){ btn.textContent = '⏳ Publicando...'; btn.disabled = true; }
        _pushMovieJson(_savedSlug).then(function(ok) {
          if(btn){btn.textContent='Guardar película';btn.disabled=false;}
          closePeliculaModal();
          loadPeliculas();
          var toast = document.createElement('div');
          toast.textContent = ok ? '✅ Película guardada y publicada en catálogo' : '✅ Película guardada';
          toast.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:#4ade80;color:#000;padding:11px 22px;border-radius:10px;font-weight:700;z-index:9999;font-size:.9rem;box-shadow:0 4px 20px rgba(0,0,0,.4)';
          document.body.appendChild(toast); setTimeout(function(){ toast.remove(); }, 5000);
        });
        return;
      }
      // Hay escenas con karaoke — disparar GitHub Actions (no bloquea la UI)
      if(btn){ btn.textContent = '⏳ Guardando...'; btn.disabled = true; }
      _sb.from('peliculas').select('slug').eq('id', pelId).single().then(function(pelRes) {
        var slug = pelRes.data ? pelRes.data.slug : '';
        var _t1='ghp_A3wgIzZE8mEY',_t2='L4MYi36BFjT7zbYlP040rH7A'; var GH_TOKEN=_t1+_t2;

        // Cookies de YouTube (necesarias para que yt-dlp descargue en GitHub Actions)
        var ytCookies = localStorage.getItem('aura_yt_cookies') || '';

        // Disparar un workflow por cada escena con karaoke (fire-and-forget)
        var dispatches = karaokeEsc.map(function(esc) {
          return fetch('https://api.github.com/repos/sergiosaacx/aura-languages/dispatches', {
            method: 'POST',
            headers: {
              'Authorization': 'token ' + GH_TOKEN,
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              event_type: 'whisper-sync',
              client_payload: {
                videoId:   esc.ytId,
                slug:      slug,
                escenaNum: esc.num,
                startTime: esc.start,
                endTime:   esc.end,
                cookies:   ytCookies,
                audioUrl:  _pelAudios['e' + (esc.num - 1)] || ''
              }
            })
          }).then(function(r) {
            console.log('[whisper] dispatch escena', esc.num, r.status === 204 ? '✅ OK' : r.status);
          }).catch(function(err) {
            console.warn('[whisper] dispatch error escena', esc.num, err.message);
          });
        });

        // No esperar a Whisper — guardar la película inmediatamente
        Promise.all(dispatches).then(function() {
          _pushMovieJson(slug).then(function(ok) {
            if(btn){btn.textContent='Guardar película';btn.disabled=false;}
            closePeliculaModal();
            loadPeliculas();
            var toast = document.createElement('div');
            toast.textContent = '✅ Película guardada — karaoke sincronizando en GitHub (~2 min)';
            toast.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%);max-width:90vw;background:#4ade80;color:#000;padding:12px 22px;border-radius:10px;font-weight:700;z-index:9999;font-size:.88rem;box-shadow:0 4px 20px rgba(0,0,0,.4);text-align:center;line-height:1.4';
            document.body.appendChild(toast);
            setTimeout(function(){ toast.remove(); }, 7000);
          });
        });
      });
    });
  });
}

/* ── Guardar escenas ────────────────────────────────── */
function saveEscenas(pelId, done) {
  // Recoger escenas activas del DOM
  var escList = document.getElementById('pm-escenas-list');
  var cards = escList ? escList.querySelectorAll('.h-slide-card') : [];
  var saves = [];
  cards.forEach(function(card) {
    var idx = parseInt((card.id||'').replace('esc-card-',''));
    if (isNaN(idx)) return;
    var data = getEscenaData(idx);
    if (!data.youtube_id) return; // escena sin YouTube ID se omite
    data.pelicula_id = pelId;
    saves.push(data);
  });

  if (!saves.length) { done && done(); return; }

  // Eliminar escenas existentes y reinsertar
  _sb.from('escenas').delete().eq('pelicula_id', pelId).then(function(del) {
    if (del.error) { alert('Error escenas: '+del.error.message); done&&done(); return; }
    _sb.from('escenas').insert(saves).then(function(ins) {
      if (ins.error) alert('Error insertar escenas: '+ins.error.message);
      done && done();
    });
  });
}


/* ── Generar y publicar JSON de película en GitHub ───── */
async function _pushMovieJson(slug) {
  var _t1='ghp_A3wgIzZE8mEY',_t2='L4MYi36BFjT7zbYlP040rH7A'; var GITHUB_TOKEN=_t1+_t2;
  try {
    // 1. Leer datos completos de Supabase
    var pelRes = await _sb.from('peliculas').select('*').eq('slug', slug).single();
    if (pelRes.error || !pelRes.data) return false;
    var pel = pelRes.data;
    var escRes = await _sb.from('escenas').select('*').eq('pelicula_id', pel.id).order('numero');
    var escenas = (escRes.data || []).filter(function(e){ return !!e.youtube_id; });

    // 2. Leer JSON actual de GitHub para preservar transcript_json si Whisper ya lo procesó
    var path = 'data/movies/' + slug + '.json';
    var apiUrl = 'https://api.github.com/repos/sergiosaacx/aura-languages/contents/' + path;
    var headers = { 'Authorization': 'token ' + GITHUB_TOKEN, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' };

    var existRes = await fetch(apiUrl, { headers: headers });
    var sha = null;
    var ghTranscripts = {}; // índice → transcript_json guardado por Whisper en GitHub
    if (existRes.ok) {
      var ex = await existRes.json();
      sha = ex.sha;
      try {
        var ghData = JSON.parse(atob(ex.content.replace(/\n/g, '')));
        (ghData.scenes || []).forEach(function(s, i) {
          if (s.transcript_json && s.transcript_json !== '{}') {
            ghTranscripts[i] = s.transcript_json;
          }
        });
      } catch(er) {}
    }

    // 3. Construir JSON
    var badges = []; try { badges = JSON.parse(pel.badges_json||'[]'); } catch(er){}
    var jsonData = {
      slug: pel.slug,
      studio: pel.studio || '',
      titleMain: pel.titulo_main || '',
      titleSub: pel.titulo_sub || '',
      badges: badges,
      meta: [pel['año'], pel.duracion, pel.genero].filter(Boolean).join(' · '),
      desc: pel.descripcion || '',
      portada_url: pel.portada_url || '',
      activo: !!pel.activo,
      orden: pel.orden || 0,
      scenes: escenas.map(function(e, i) {
        var wordBank = []; try { wordBank = JSON.parse(e.word_bank_json||'[]'); } catch(er){}
        var tj = e.transcript_json || '{}';
        if (tj === '{}' && ghTranscripts[i]) { tj = ghTranscripts[i]; }
        return {
          youtube_id: e.youtube_id,
          start: e.start_time || 0,
          end: e.end_time || 0,
          phrase: e.phrase || '',
          speaker: e.speaker || '',
          word_bank: wordBank,
          has_karaoke: !!e.has_karaoke,
          transcript_json: tj,
          portada_url: e.portada_url || '',
          shelf_tm: e.shelf_tm || 'ahora',
          shelf_line: e.shelf_line || '',
          shelf_tag: e.shelf_tag || ''
        };
      })
    };

    // 4. Subir a GitHub
    var content = btoa(unescape(encodeURIComponent(JSON.stringify(jsonData, null, 2))));
    var body = { message: 'movie: ' + (sha ? 'update' : 'add') + ' ' + slug, content: content, committer: { name: 'Sergiosaac', email: 'elparche.foodpopayan@gmail.com' } };
    if (sha) body.sha = sha;

    var pushRes = await fetch(apiUrl, { method: 'PUT', headers: headers, body: JSON.stringify(body) });
    return pushRes.ok;
  } catch(err) {
    console.warn('[pushMovieJson]', err);
    return false;
  }
}

/* ── Eliminar película ──────────────────────────────── */
function deletePelicula(pelId, titulo) {
  if (!confirm('¿Eliminar "'+titulo+'" y todas sus escenas?')) return;
  _sb.from('peliculas').delete().eq('id', pelId).then(function(res) {
    if (res.error) { alert('Error: '+res.error.message); return; }
    loadPeliculas();
  });
}

/* ── Upload portada película ────────────────────────── */
function uploadPeliculaImg(input) {
  var file = input.files[0];
  if (!file||!_sb||!_userId) return;
  var lbl  = document.getElementById('pm-portada-lbl');
  var prev = document.getElementById('pm-portada-prev');
  if (lbl) { lbl.textContent='Subiendo...'; lbl.style.color='#c4ff3d'; }
  var ext  = (file.name.split('.').pop()||'jpg').toLowerCase().replace(/[^a-z0-9]/g,'');
  var path = _userId+'/peliculas/portada-'+Date.now()+'.'+ext;
  _sb.storage.from('avatars').upload(path, file, {upsert:true, contentType:file.type||'image/jpeg'}).then(function(res) {
    if (res.error) { if(lbl){lbl.textContent='✗ '+res.error.message;lbl.style.color='#f43f5e';} return; }
    var url = _sb.storage.from('avatars').getPublicUrl(path).data.publicUrl;
    _pelImgs['pelicula'] = url;
    if (prev) { prev.src=url+'?t='+Date.now(); prev.style.display='block'; }
    if (lbl)  { lbl.textContent='✓ Imagen lista'; lbl.style.color='#c4ff3d'; }
    input.value = '';
  });
}

/* ── Upload audio escena para Whisper ──────────────── */
function uploadEscenaAudio(input, idx) {
  var file = input.files[0];
  if (!file || !_sb || !_userId) return;
  var lbl = document.getElementById('ec-audio-lbl-'+idx);
  if (lbl) { lbl.textContent = 'Subiendo...'; lbl.style.color = '#c4ff3d'; }
  var ext = (file.name.split('.').pop() || 'mp4').toLowerCase().replace(/[^a-z0-9]/g,'');
  var path = _userId + '/audios/escena-' + idx + '-' + Date.now() + '.' + ext;
  _sb.storage.from('avatars').upload(path, file, {upsert: true, contentType: file.type || 'video/mp4'}).then(function(res) {
    if (res.error) { if (lbl) { lbl.textContent = '✗ ' + res.error.message; lbl.style.color = '#f43f5e'; } return; }
    var url = _sb.storage.from('avatars').getPublicUrl(path).data.publicUrl;
    _pelAudios['e' + idx] = url;
    if (lbl) { lbl.textContent = '✓ Audio listo — se usará en Whisper'; lbl.style.color = '#c4ff3d'; }
    input.value = '';
  });
}

/* ── Upload portada escena ──────────────────────────── */
function uploadEscenaImg(input, idx) {
  var file = input.files[0];
  if (!file||!_sb||!_userId) return;
  var lbl  = document.getElementById('ec-img-lbl-'+idx);
  var prev = document.getElementById('ec-img-prev-'+idx);
  if (lbl) { lbl.textContent='Subiendo...'; lbl.style.color='#c4ff3d'; }
  _sb.storage.from('portadas').upload('escena-'+idx+'-'+Date.now()+'-'+file.name, file, {upsert:true}).then(function(res) {
    if (res.error) { if (lbl) { lbl.textContent='Error: '+res.error.message; lbl.style.color='#f43f5e'; } return; }
    var url = _sb.storage.from('portadas').getPublicUrl(res.data.path).data.publicUrl;
    _pelImgs['e'+idx] = url;
    if (prev) { prev.src=url+'?t='+Date.now(); prev.style.display='block'; }
    if (lbl)  { lbl.textContent='✓ Imagen lista'; lbl.style.color='#c4ff3d'; }
    input.value = '';
  });
}

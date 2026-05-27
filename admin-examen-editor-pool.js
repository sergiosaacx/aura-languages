/* ════════════════════════════════════════════════════════════════
   admin-examen-editor-pool.js  v3
   Pool picker de Listening para admin-examen-editor.html.
   · Muestra las LÍNEAS DE DIÁLOGO individuales de cada escena
     (desde transcript_json.lyrics) para que el admin elija cuáles
     aparecen en el examen.
   · Cada línea seleccionada se guarda como un pool item con
     youtube_id, start=line.t, end=line.end de esa línea exacta.
   · En exam_content (una fila por línea elegida).
   · El engine elige una aleatoriamente al cargar el examen.
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var RANK_MAP = {1:'bronce',2:'plata',3:'oro',4:'platino',5:'diamante'};

var _pool_items = [];
var _sel_movie  = null;

function _sb(){
  if(window._aura && window._aura.sb) return window._aura.sb;
  if(window.auraSupabase) return window.auraSupabase;
  return null;
}
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function _fmtT(s){ s=+s||0; var m=Math.floor(s/60),r=Math.floor(s%60); return m+':'+String(r).padStart(2,'0'); }
function _toast(msg){ if(typeof window.admShowToast==='function') window.admShowToast(msg); }

/* ── Cargar pool existente desde exam_content ── */
async function _loadExistingPool(rank, lang){
  var sb=_sb(); if(!sb) return [];
  var res = await sb.from('exam_content')
    .select('*').eq('section','listening').eq('rank',rank).eq('language',lang).eq('active',true);
  if(res.error) return [];
  return (res.data||[]).map(function(row){
    var c=row.content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c={};}}
    return (c&&c.escena_id) ? c : null;
  }).filter(Boolean);
}

/* ── Render lista de pool (panel superior) ── */
function _renderPoolList(container){
  container.innerHTML='';
  if(!_pool_items.length){
    container.innerHTML='<div style="font-size:11px;color:rgba(255,255,255,.3);text-align:center;padding:12px 0;">Sin líneas. Agrega desde el picker ↓</div>';
    return;
  }
  _pool_items.forEach(function(item, idx){
    var div=document.createElement('div'); div.className='exl-pool-item';
    var img=document.createElement('img'); img.className='exl-pool-thumb';
    img.src=item.portada_url||''; img.onerror=function(){this.style.opacity='.3';};
    var info=document.createElement('div'); info.className='exl-pool-info';
    info.innerHTML='<b>'+(item.pelicula_titulo||'Película')+'</b>'+
      '<span style="font-size:10px;color:rgba(255,255,255,.5);white-space:normal;line-height:1.3;">'+(item.phrase||'(sin texto)')+'</span>'+
      '<span style="font-size:9px;font-family:var(--mono);color:rgba(255,255,255,.3);">'+_fmtT(item.start||0)+' – '+_fmtT(item.end||0)+'</span>';
    var rm=document.createElement('button'); rm.className='exl-pool-rm'; rm.textContent='✕';
    var capturedIdx=idx;
    rm.onclick=function(){ _pool_items.splice(capturedIdx,1); _renderPoolList(container); };
    div.appendChild(img); div.appendChild(info); div.appendChild(rm);
    container.appendChild(div);
  });
}

/* ── Render principal del drawer ── */
window.admRenderListeningPools = async function(sd, version, lang){
  var body=document.getElementById('adm-dw-body'); if(!body) return;
  body.innerHTML='<div style="padding:20px;text-align:center;color:rgba(255,255,255,.35);font-size:12px;">Cargando pool…</div>';

  var rank=RANK_MAP[version]||'bronce';
  _pool_items = await _loadExistingPool(rank, lang);
  _sel_movie  = null;
  body.innerHTML='';

  /* Label */
  var lbl=document.createElement('div'); lbl.className='adm-section-label';
  lbl.textContent='Banco de líneas · V'+version+' · '+rank.toUpperCase()+' · '+lang.toUpperCase();
  body.appendChild(lbl);

  /* Lista pool */
  var poolList=document.createElement('div'); poolList.className='exl-pool-list'; poolList.id='exl-pool-list';
  body.appendChild(poolList);
  _renderPoolList(poolList);

  /* Botón agregar */
  var addBtn=document.createElement('button'); addBtn.className='exl-add-scene-btn';
  addBtn.textContent='＋ Agregar línea de diálogo';
  addBtn.onclick=function(){
    var picker=document.getElementById('exl-picker');
    if(!picker) return;
    picker.classList.toggle('open');
    if(picker.classList.contains('open') && !picker.dataset.loaded){
      _loadMovies(lang);
      picker.dataset.loaded='1';
    }
  };
  body.appendChild(addBtn);

  /* Picker container */
  var picker=document.createElement('div'); picker.className='exl-picker'; picker.id='exl-picker';
  picker.innerHTML=
    '<div class="exl-picker-title">1. Elige película</div>'+
    '<div class="exl-movie-grid" id="exl-movie-grid"><div class="exl-picker-loading">Cargando películas…</div></div>'+
    '<div id="exl-lines-section" style="display:none;">'+
      '<div class="exl-picker-title" id="exl-lines-title" style="margin-top:10px;">2. Elige líneas de diálogo</div>'+
      '<div style="font-size:10px;color:rgba(255,255,255,.3);margin-bottom:6px;">Solo aparecen líneas con diálogo real (5+ palabras). Toca para agregar al banco.</div>'+
      '<div class="exl-scene-list" id="exl-lines-list"></div>'+
    '</div>';
  body.appendChild(picker);

  /* Nota */
  var note=document.createElement('p');
  note.style.cssText='font-size:10px;color:rgba(255,255,255,.28);margin-top:10px;line-height:1.5;';
  note.textContent='Cada estudiante verá una línea aleatoria del banco. Agrega varias para mayor variedad.';
  body.appendChild(note);
};

/* ── Cargar películas ── */
async function _loadMovies(lang){
  var grid=document.getElementById('exl-movie-grid'); if(!grid) return;
  var sb=_sb();
  if(!sb){ grid.innerHTML='<div class="exl-picker-loading">Sin conexión a Supabase</div>'; return; }

  var res=await sb.from('peliculas').select('id,slug,titulo_main,titulo_sub,portada_url,language').eq('activo',true).order('orden');
  if(res.error||!res.data||!res.data.length){
    grid.innerHTML='<div class="exl-picker-loading">No hay películas disponibles</div>'; return;
  }

  grid.innerHTML='';
  res.data.forEach(function(pel){
    var card=document.createElement('div'); card.className='exl-movie-card';
    card.innerHTML=
      '<img src="'+(pel.portada_url||'')+'" onerror="this.style.opacity=\'.2\'">'+
      '<div class="exl-mc-name">'+(pel.titulo_main||pel.slug)+'</div>';
    card.onclick=function(){
      document.querySelectorAll('.exl-movie-card.sel').forEach(function(c){c.classList.remove('sel');});
      card.classList.add('sel');
      _sel_movie=pel;
      _loadLines(pel);
    };
    grid.appendChild(card);
  });
}

/* ── Cargar líneas de diálogo de una película ── */
async function _loadLines(pel){
  var section=document.getElementById('exl-lines-section');
  var titleEl=document.getElementById('exl-lines-title');
  var list=document.getElementById('exl-lines-list');
  if(!section||!list) return;

  section.style.display='';
  if(titleEl) titleEl.textContent='2. Líneas de diálogo · '+(pel.titulo_main||pel.slug);
  list.innerHTML='<div class="exl-picker-loading">Cargando líneas…</div>';

  var sb=_sb(); if(!sb) return;

  /* Traer todas las escenas de esta película con transcript */
  var res=await sb.from('escenas')
    .select('id,numero,youtube_id,start_time,end_time,portada_url,transcript_json')
    .eq('pelicula_id',pel.id)
    .order('numero');

  if(res.error){
    list.innerHTML='<div class="exl-picker-loading">Error: '+_esc(res.error.message)+'</div>'; return;
  }
  if(!res.data||!res.data.length){
    list.innerHTML='<div class="exl-picker-loading">Sin escenas para esta película.<br><small>Verifica que existan escenas en Supabase con pelicula_id correcto.</small></div>'; return;
  }

  /* Extraer todas las líneas de todos los transcripts */
  list.innerHTML='';
  var totalLines=0;

  res.data.forEach(function(esc){
    var tj=esc.transcript_json;
    if(typeof tj==='string'){try{tj=JSON.parse(tj);}catch(e){tj={};}}
    var lyrics=(tj&&tj.lyrics)||[];

    /* Filtrar solo líneas con diálogo real (texto no vacío) */
    var dialogLines=lyrics.filter(function(l){
      var text=(l.text||'').trim();
      return text.length>0 && text.split(' ').length>=1;
    });

    if(!dialogLines.length) return; /* escena sin transcript — omitir */

    /* Separador de escena */
    var escHeader=document.createElement('div');
    escHeader.style.cssText='font-size:9px;font-family:var(--mono);color:rgba(255,255,255,.3);'+
      'text-transform:uppercase;letter-spacing:.08em;padding:8px 4px 4px;border-top:1px solid rgba(255,255,255,.06);margin-top:4px;';
    escHeader.textContent='Escena #'+esc.numero+' · '+_fmtT(esc.start_time||0)+' – '+_fmtT(esc.end_time||0);
    list.appendChild(escHeader);

    dialogLines.forEach(function(line){
      var text=(line.text||'').trim();
      var lineStart=+(line.t||0);
      var lineEnd=+(line.end||lineStart+3);

      var item=document.createElement('div'); item.className='exl-scene-item';
      item.style.cssText='cursor:pointer;padding:7px 10px;border-radius:8px;margin-bottom:3px;'+
        'background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);'+
        'display:flex;flex-direction:column;gap:3px;transition:background .15s;';

      var words=text.split(' ').length;
      var wordTag=words>=5?
        '<span style="font-size:8px;color:#c4ff3d;flex-shrink:0;">'+words+' palabras</span>':
        '<span style="font-size:8px;color:rgba(255,255,255,.25);flex-shrink:0;">'+words+' palabras</span>';

      item.innerHTML=
        '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">'+
          '<span style="font-size:11.5px;color:#f0ede6;line-height:1.4;flex:1;">'+_esc(text)+'</span>'+
          wordTag+
        '</div>'+
        '<div style="font-size:9px;font-family:var(--mono);color:rgba(255,255,255,.3);">'+
          _fmtT(lineStart)+' – '+_fmtT(lineEnd)+
        '</div>';

      item.onmouseover=function(){item.style.background='rgba(124,178,255,.1)';};
      item.onmouseout=function(){
        if(!item.classList.contains('added')) item.style.background='rgba(255,255,255,.03)';
      };

      item.onclick=function(){
        /* Verificar duplicado */
        var key=esc.id+'-'+lineStart;
        if(_pool_items.some(function(p){ return p._key===key; })){
          item.style.background='rgba(196,255,61,.1)';
          setTimeout(function(){item.style.background='rgba(255,255,255,.03)';},600);
          _toast('Esta línea ya está en el banco');
          return;
        }
        _pool_items.push({
          _key           : key,
          escena_id      : esc.id,
          youtube_id     : esc.youtube_id,
          start          : lineStart,
          end            : lineEnd,
          phrase         : text,
          pelicula_titulo: pel.titulo_main||pel.slug,
          pelicula_id    : pel.id,
          pelicula_slug  : pel.slug,
          portada_url    : esc.portada_url||'',
          escena_numero  : esc.numero
        });
        var poolList=document.getElementById('exl-pool-list');
        if(poolList) _renderPoolList(poolList);
        item.classList.add('added');
        item.style.background='rgba(124,178,255,.18)';
        item.style.borderColor='rgba(124,178,255,.4)';
        _toast('✓ Línea agregada al banco');
      };

      list.appendChild(item);
      totalLines++;
    });
  });

  if(totalLines===0){
    list.innerHTML='<div class="exl-picker-loading">'+
      'Las escenas de esta película no tienen transcript (karaoke) cargado aún.<br>'+
      '<small>Usa Whisper en el admin de películas para cargar el transcript.</small>'+
    '</div>';
  }
}

/* ── Guardar pool en exam_content ── */
window.admSaveListeningPools = async function(version, lang){
  var sb=_sb();
  if(!sb){ _toast('❌ Sin conexión Supabase'); return; }
  var rank=RANK_MAP[version]||'bronce';
  _toast('Guardando banco…');

  /* Borrar filas existentes */
  await sb.from('exam_content').delete()
    .eq('section','listening').eq('rank',rank).eq('language',lang);

  if(!_pool_items.length){
    if(typeof window.admCloseDrawer==='function') window.admCloseDrawer();
    _toast('✓ Banco vaciado · V'+version);
    return;
  }

  /* Insertar nuevas filas (una por línea elegida) */
  var rows=_pool_items.map(function(item){
    var clean={
      escena_id      : item.escena_id,
      youtube_id     : item.youtube_id,
      start          : item.start,
      end            : item.end,
      phrase         : item.phrase,
      pelicula_titulo: item.pelicula_titulo,
      pelicula_id    : item.pelicula_id,
      pelicula_slug  : item.pelicula_slug,
      portada_url    : item.portada_url,
      escena_numero  : item.escena_numero
    };
    return {
      section      : 'listening',
      content_type : 'listening_scene',
      rank         : rank,
      language     : lang,
      active       : true,
      difficulty   : version,
      content      : clean
    };
  });

  var res=await sb.from('exam_content').insert(rows);
  if(res.error){ _toast('❌ Error: '+res.error.message); return; }

  /* Preview inmediato */
  if(typeof window.previewExamListening==='function' && _pool_items.length){
    var pick=_pool_items[Math.floor(Math.random()*_pool_items.length)];
    window.previewExamListening(pick);
  }

  if(typeof window.admCloseDrawer==='function') window.admCloseDrawer();
  _toast('✅ '+_pool_items.length+' línea(s) guardadas · V'+version+' · '+rank);
};

})();

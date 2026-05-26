/* ════════════════════════════════════════════════════════════════
   admin-examen-editor-pool.js  v2
   Pool picker de Listening para admin-examen-editor.html.
   · Elige varias películas y varias escenas por película
   · Guardado en exam_content (una fila por escena)
   · El engine elige una aleatoriamente al cargar el examen
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var RANK_MAP = {1:'bronce',2:'plata',3:'oro',4:'platino',5:'diamante'};

/* Pool en memoria: [{escena_id, youtube_id, start, end, phrase,
                      pelicula_titulo, pelicula_id, pelicula_slug,
                      portada_url, escena_numero}] */
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

/* ── Render lista de pool ── */
function _renderPoolList(container){
  container.innerHTML='';
  if(!_pool_items.length){
    container.innerHTML='<div style="font-size:11px;color:rgba(255,255,255,.3);text-align:center;padding:12px 0;">Sin escenas. Agrega desde el picker ↓</div>';
    return;
  }
  _pool_items.forEach(function(item, idx){
    var div=document.createElement('div'); div.className='exl-pool-item';
    var img=document.createElement('img'); img.className='exl-pool-thumb';
    img.src=item.portada_url||''; img.onerror=function(){this.style.opacity='.3';};
    var info=document.createElement('div'); info.className='exl-pool-info';
    info.innerHTML='<b>'+(item.pelicula_titulo||'Película')+'</b>' +
      '<span>Escena '+(item.escena_numero||'?')+' · '+_fmtT(item.start||0)+' – '+_fmtT(item.end||0)+'</span>';
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
  lbl.textContent='Banco de escenas · V'+version+' · '+rank.toUpperCase()+' · '+lang.toUpperCase();
  body.appendChild(lbl);

  /* Lista pool */
  var poolList=document.createElement('div'); poolList.className='exl-pool-list'; poolList.id='exl-pool-list';
  body.appendChild(poolList);
  _renderPoolList(poolList);

  /* Botón agregar */
  var addBtn=document.createElement('button'); addBtn.className='exl-add-scene-btn';
  addBtn.textContent='＋ Agregar escena de película';
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
    '<div class="exl-picker-title">Elige película</div>'+
    '<div class="exl-movie-grid" id="exl-movie-grid"><div class="exl-picker-loading">Cargando películas…</div></div>'+
    '<div class="exl-picker-title" id="exl-scene-title" style="display:none;margin-top:8px;">Escenas disponibles</div>'+
    '<div class="exl-scene-list" id="exl-scene-list"></div>';
  body.appendChild(picker);

  /* Nota */
  var note=document.createElement('p');
  note.style.cssText='font-size:10px;color:rgba(255,255,255,.28);margin-top:10px;line-height:1.5;';
  note.textContent='Cada estudiante verá una escena aleatoria del banco. Agrega varias para más variedad.';
  body.appendChild(note);
};

/* ── Cargar películas en el picker ── */
async function _loadMovies(lang){
  var grid=document.getElementById('exl-movie-grid'); if(!grid) return;
  var sb=_sb();
  if(!sb){ grid.innerHTML='<div class="exl-picker-loading">Sin conexión a Supabase</div>'; return; }

  var q=sb.from('peliculas').select('id,slug,titulo_main,titulo_sub,portada_url,language').eq('activo',true).order('orden');
  var res=await q;
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
      _loadScenes(pel);
    };
    grid.appendChild(card);
  });
}

/* ── Cargar escenas de una película ── */
async function _loadScenes(pel){
  var titleEl=document.getElementById('exl-scene-title');
  var list=document.getElementById('exl-scene-list');
  if(!titleEl||!list) return;
  titleEl.style.display='';
  titleEl.textContent='Escenas · '+(pel.titulo_main||pel.slug);
  list.innerHTML='<div class="exl-picker-loading">Cargando escenas…</div>';

  var sb=_sb(); if(!sb) return;
  var res=await sb.from('escenas')
    .select('id,numero,youtube_id,start_time,end_time,phrase,portada_url,has_karaoke')
    .eq('pelicula_id',pel.id).order('numero');

  if(res.error||!res.data||!res.data.length){
    list.innerHTML='<div class="exl-picker-loading">Sin escenas para esta película</div>'; return;
  }

  list.innerHTML='';
  res.data.forEach(function(esc){
    var item=document.createElement('div'); item.className='exl-scene-item';
    var karaoTag=esc.has_karaoke?'<span style="color:#c4ff3d;font-size:9px;margin-left:4px;flex-shrink:0;">♪ karaoke</span>':'';
    item.innerHTML=
      '<b style="font-family:var(--mono);font-size:9px;color:rgba(255,255,255,.4);flex-shrink:0;">#'+esc.numero+'</b>'+
      '<span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;">'+(esc.phrase||'(sin frase)')+'</span>'+
      '<span style="flex-shrink:0;color:rgba(255,255,255,.35);font-size:9px;font-family:var(--mono);">'+_fmtT(esc.start_time||0)+'–'+_fmtT(esc.end_time||0)+'</span>'+
      karaoTag;

    item.onclick=function(){
      /* Verificar duplicado */
      if(_pool_items.some(function(p){ return p.escena_id===esc.id; })){
        item.style.background='rgba(196,255,61,.1)';
        setTimeout(function(){item.style.background='';},500);
        _toast('Ya está en el banco');
        return;
      }
      _pool_items.push({
        escena_id      : esc.id,
        youtube_id     : esc.youtube_id,
        start          : esc.start_time||0,
        end            : esc.end_time||0,
        phrase         : esc.phrase||'',
        pelicula_titulo: pel.titulo_main||pel.slug,
        pelicula_id    : pel.id,
        pelicula_slug  : pel.slug,
        portada_url    : esc.portada_url||pel.portada_url||'',
        escena_numero  : esc.numero
      });
      var poolList=document.getElementById('exl-pool-list');
      if(poolList) _renderPoolList(poolList);
      item.style.background='rgba(124,178,255,.18)';
      setTimeout(function(){item.style.background='';},500);
      _toast('✓ Escena '+esc.numero+' agregada');
    };
    list.appendChild(item);
  });
}

/* ── Guardar pool en exam_content ── */
window.admSaveListeningPools = async function(version, lang){
  var sb=_sb();
  if(!sb){ _toast('❌ Sin conexión Supabase'); return; }
  var rank=RANK_MAP[version]||'bronce';
  _toast('Guardando pool…');

  /* Borrar filas existentes para este rank/lang/listening */
  await sb.from('exam_content').delete()
    .eq('section','listening').eq('rank',rank).eq('language',lang);

  if(!_pool_items.length){
    if(typeof window.admCloseDrawer==='function') window.admCloseDrawer();
    _toast('✓ Pool vaciado · V'+version);
    return;
  }

  /* Insertar nuevas filas (una por escena) */
  var rows=_pool_items.map(function(item){
    return {
      section      : 'listening',
      content_type : 'listening_scene',
      rank         : rank,
      language     : lang,
      active       : true,
      difficulty   : version,
      content      : item
    };
  });

  var res=await sb.from('exam_content').insert(rows);
  if(res.error){ _toast('❌ Error: '+res.error.message); return; }

  /* Preview inmediato con una escena aleatoria */
  if(typeof window.previewExamListening==='function' && _pool_items.length){
    var pick=_pool_items[Math.floor(Math.random()*_pool_items.length)];
    window.previewExamListening(pick);
  }

  if(typeof window.admCloseDrawer==='function') window.admCloseDrawer();
  _toast('✅ '+_pool_items.length+' escena(s) guardadas · V'+version+' · '+rank);
};

})();

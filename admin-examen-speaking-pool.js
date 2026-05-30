/* ════════════════════════════════════════════════════════════════
   admin-examen-speaking-pool.js  v1
   Pool picker para Speaking del examen de ascenso.
   · Selección de líneas de películas para el pool de ShadowLab
   · Filtros: rank + language (independientes)
   · Config: líneas_por_examen (default 5)
   · Storage: Supabase exam_content section='speaking'
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var RANK_MAP = {1:'bronce',2:'plata',3:'oro',4:'platino',5:'diamante'};

var _selected  = {};   /* key → lineData */
var _sel_movie = null;
var _saving    = false;
var _cur_rank  = 'bronce';
var _cur_lang  = 'en';
var _lines_per_exam = 5;

function _sb(){
  if(window._aura&&window._aura.sb) return window._aura.sb;
  if(window.auraSupabase) return window.auraSupabase;
  return null;
}
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function _fmtT(s){ s=+s||0; var m=Math.floor(s/60),r=Math.floor(s%60); return m+':'+String(r).padStart(2,'0'); }
function _toast(msg){ if(typeof window.admShowToast==='function') window.admShowToast(msg); }

/* ── Cargar pool existente desde Supabase ── */
async function _loadExistingPool(rank, lang){
  var sb=_sb(); if(!sb) return;
  _selected={};
  _lines_per_exam=5;

  var res = await sb.from('exam_content').select('*')
    .eq('section','speaking').eq('rank',rank).eq('language',lang).eq('active',true);
  if(res.error) return;

  (res.data||[]).forEach(function(row){
    var c = row.content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c={};}}
    if(!c) return;
    if(row.content_type==='speaking_config'){
      _lines_per_exam = c.lines_per_exam || 5;
    } else if(row.content_type==='speaking_scene' && c.escena_id){
      var key = c.escena_id+'-'+c.start;
      _selected[key] = c;
    }
  });
}

/* ── Actualizar barra resumen ── */
function _updateSummary(){
  var el=document.getElementById('exsp-summary'); if(!el) return;
  var n = Object.keys(_selected).length;
  el.textContent = n+' '+(n===1?'línea':'líneas')+' en el pool';
  el.style.color = n>0 ? 'rgba(255,154,108,.9)' : 'rgba(255,255,255,.3)';

  /* Actualizar campo N */
  var inp=document.getElementById('exsp-lines-per-exam');
  if(inp) inp.value = _lines_per_exam;
}

/* ── Render pool actual ── */
function _renderCurrentPool(){
  var wrap=document.getElementById('exsp-current-pool'); if(!wrap) return;
  var keys=Object.keys(_selected);
  wrap.innerHTML='';

  if(!keys.length){
    wrap.innerHTML='<div style="color:rgba(255,255,255,.22);font-size:10px;padding:4px 2px;text-align:center;">Sin líneas — elige desde abajo</div>';
    return;
  }

  /* Agrupar por película */
  var byPel={};
  keys.forEach(function(k){
    var it=_selected[k];
    var pk=it.pelicula_titulo||it.pelicula_slug||'?';
    if(!byPel[pk]) byPel[pk]=[];
    byPel[pk].push({key:k,item:it});
  });

  Object.keys(byPel).forEach(function(pelName){
    var grp=byPel[pelName];
    var hdr=document.createElement('div');
    hdr.style.cssText='font-size:8.5px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;'+
      'color:rgba(255,154,108,.55);padding:5px 2px 2px;';
    hdr.textContent=pelName+' ('+grp.length+')';
    wrap.appendChild(hdr);

    grp.forEach(function(entry){
      var it=entry.item, k=entry.key;
      var row=document.createElement('div');
      row.style.cssText='display:flex;align-items:center;gap:6px;padding:4px 6px;border-radius:7px;'+
        'background:rgba(255,154,108,.06);border:1px solid rgba(255,154,108,.13);margin-bottom:3px;';

      var dot=document.createElement('div');
      dot.style.cssText='width:6px;height:6px;border-radius:50%;flex-shrink:0;background:#FF9A6C;';

      var txt=document.createElement('div');
      txt.style.cssText='flex:1;min-width:0;font-size:10px;color:rgba(240,237,230,.85);'+
        'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
      txt.textContent=_esc((it.phrase||'').slice(0,50));

      var del=document.createElement('button');
      del.textContent='×';
      del.title='Quitar del pool';
      del.style.cssText='flex-shrink:0;background:none;border:none;color:rgba(255,90,90,.55);'+
        'font-size:15px;line-height:1;cursor:pointer;padding:0 2px;transition:.12s;';
      del.onmouseenter=function(){ this.style.color='rgba(255,90,90,.9)'; };
      del.onmouseleave=function(){ this.style.color='rgba(255,90,90,.55)'; };
      del.onclick=(function(key){ return function(e){
        e.stopPropagation();
        delete _selected[key];
        _renderCurrentPool();
        _updateSummary();
        if(_sel_movie) _loadLines(_sel_movie);
      }; })(k);

      row.appendChild(dot); row.appendChild(txt); row.appendChild(del);
      wrap.appendChild(row);
    });
  });
}

/* ── Render principal ── */
window.admRenderSpeakingPool = async function(sd, version, lang){
  var body=document.getElementById('adm-dw-body'); if(!body) return;
  body.innerHTML='<div style="padding:20px;text-align:center;color:rgba(255,255,255,.35);font-size:12px;">Cargando…</div>';

  _cur_rank = RANK_MAP[version]||'bronce';
  _cur_lang = lang||'en';
  _sel_movie = null;

  await _loadExistingPool(_cur_rank, _cur_lang);
  body.innerHTML='';

  /* ── Barra resumen ── */
  var summary=document.createElement('div');
  summary.id='exsp-summary';
  summary.style.cssText='font-size:11px;font-weight:800;padding:8px 12px;border-radius:8px;'+
    'background:rgba(255,154,108,.06);border:1px solid rgba(255,154,108,.15);'+
    'margin-bottom:10px;text-align:center;transition:.2s;';
  body.appendChild(summary);

  /* ── Config: líneas por examen ── */
  var configRow=document.createElement('div');
  configRow.style.cssText='display:flex;align-items:center;gap:8px;margin-bottom:10px;'+
    'padding:8px 10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:8px;';
  configRow.innerHTML=
    '<span style="font-size:10px;color:rgba(255,255,255,.55);flex:1;">Líneas por examen (al azar)</span>'+
    '<input id="exsp-lines-per-exam" type="number" min="1" max="20" value="'+_lines_per_exam+'" '+
    'style="width:48px;background:rgba(255,154,108,.1);border:1px solid rgba(255,154,108,.35);'+
    'border-radius:6px;color:#FF9A6C;font-size:13px;font-weight:700;text-align:center;padding:3px 6px;outline:none;">'+
    '<span style="font-size:9px;color:rgba(255,255,255,.25);">máx. 20</span>';
  var lpeInp=configRow.querySelector('#exsp-lines-per-exam');
  if(lpeInp) lpeInp.onchange=function(){
    var v=parseInt(this.value)||5;
    v=Math.max(1,Math.min(20,v));
    this.value=v; _lines_per_exam=v;
  };
  body.appendChild(configRow);

  /* ── Pool actual ── */
  var poolSection=document.createElement('div');
  poolSection.style.cssText='margin-bottom:10px;';
  var poolHdr=document.createElement('div');
  poolHdr.style.cssText='display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;';

  var poolTitle=document.createElement('div');
  poolTitle.style.cssText='font-size:9px;font-weight:800;text-transform:uppercase;'+
    'letter-spacing:.1em;color:rgba(255,154,108,.6);';
  poolTitle.textContent='Pool actual';

  var clearBtn=document.createElement('button');
  clearBtn.textContent='🗑 Limpiar todo';
  clearBtn.style.cssText='background:none;border:1px solid rgba(255,90,90,.3);border-radius:6px;'+
    'color:rgba(255,90,90,.6);font-size:8.5px;font-weight:700;cursor:pointer;padding:2px 7px;transition:.15s;';
  clearBtn.onmouseenter=function(){ this.style.borderColor='rgba(255,90,90,.7)'; this.style.color='rgba(255,90,90,.9)'; };
  clearBtn.onmouseleave=function(){ this.style.borderColor='rgba(255,90,90,.3)'; this.style.color='rgba(255,90,90,.6)'; };
  clearBtn.onclick=function(){
    if(!Object.keys(_selected).length) return;
    if(!confirm('¿Limpiar todo el pool? No borra la DB hasta que guardes.')) return;
    _selected={};
    _renderCurrentPool(); _updateSummary();
    if(_sel_movie) _loadLines(_sel_movie);
  };

  poolHdr.appendChild(poolTitle); poolHdr.appendChild(clearBtn);
  var poolList=document.createElement('div'); poolList.id='exsp-current-pool';
  poolSection.appendChild(poolHdr); poolSection.appendChild(poolList);
  body.appendChild(poolSection);
  _renderCurrentPool();
  _updateSummary();

  /* ── Picker: películas ── */
  var pickerWrap=document.createElement('div');
  pickerWrap.style.cssText='display:flex;flex-direction:column;gap:8px;';

  var movieSection=document.createElement('div');
  movieSection.innerHTML='<div style="font-size:9px;font-weight:800;text-transform:uppercase;'+
    'letter-spacing:.1em;color:rgba(255,154,108,.6);margin-bottom:6px;">1. Elige película</div>';
  var movieGrid=document.createElement('div');
  movieGrid.className='exl-movie-grid'; movieGrid.id='exsp-movie-grid';
  movieGrid.innerHTML='<div class="exl-picker-loading">Cargando películas…</div>';
  movieSection.appendChild(movieGrid);
  pickerWrap.appendChild(movieSection);

  var linesSection=document.createElement('div');
  linesSection.id='exsp-lines-section'; linesSection.style.display='none';
  var linesTitle=document.createElement('div');
  linesTitle.id='exsp-lines-title';
  linesTitle.style.cssText='font-size:9px;font-weight:800;text-transform:uppercase;'+
    'letter-spacing:.1em;color:rgba(255,154,108,.6);margin:8px 0 6px;';
  linesTitle.textContent='2. Elige líneas';
  var linesList=document.createElement('div');
  linesList.className='exl-scene-list'; linesList.id='exsp-lines-list';
  linesSection.appendChild(linesTitle); linesSection.appendChild(linesList);
  pickerWrap.appendChild(linesSection);

  body.appendChild(pickerWrap);

  _loadMovies(lang);
};

/* ── Cargar películas desde Supabase ── */
async function _loadMovies(lang){
  var grid=document.getElementById('exsp-movie-grid'); if(!grid) return;
  var sb=_sb();
  if(!sb){ grid.innerHTML='<div class="exl-picker-loading">Sin Supabase</div>'; return; }

  var res=await sb.from('peliculas').select('id,slug,titulo_main,portada_url').eq('activo',true).order('orden');
  if(res.error||!res.data||!res.data.length){
    grid.innerHTML='<div class="exl-picker-loading">No hay películas activas</div>'; return;
  }
  grid.innerHTML='';
  res.data.forEach(function(pel){
    var card=document.createElement('div'); card.className='exl-movie-card';
    card.innerHTML='<img src="'+(pel.portada_url||'')+'" onerror="this.style.opacity=\'.2\'">'+
      '<div class="exl-mc-name">'+(pel.titulo_main||pel.slug)+'</div>';
    card.onclick=function(){
      document.querySelectorAll('#exsp-movie-grid .exl-movie-card.sel').forEach(function(c){ c.classList.remove('sel'); });
      card.classList.add('sel');
      _sel_movie=pel;
      _loadLines(pel);
    };
    grid.appendChild(card);
  });
}

/* ── Cargar líneas de una película ── */
async function _loadLines(pel){
  var section=document.getElementById('exsp-lines-section');
  var titleEl=document.getElementById('exsp-lines-title');
  var list=document.getElementById('exsp-lines-list');
  if(!section||!list) return;
  section.style.display='';
  if(titleEl) titleEl.textContent='2. Líneas · '+(pel.titulo_main||pel.slug);
  list.innerHTML='<div class="exl-picker-loading">Cargando…</div>';

  var sb=_sb(); if(!sb) return;
  var res=await sb.from('escenas')
    .select('id,numero,youtube_id,start_time,end_time,portada_url,transcript_json')
    .eq('pelicula_id',pel.id).order('numero');

  if(res.error||!res.data||!res.data.length){
    list.innerHTML='<div class="exl-picker-loading">Sin escenas para esta película.</div>'; return;
  }

  list.innerHTML='';
  var totalLines=0;

  res.data.forEach(function(esc){
    var tj=esc.transcript_json;
    if(typeof tj==='string'){try{ tj=JSON.parse(tj); }catch(e){ tj={}; }}
    var lyrics=(tj&&tj.lyrics)||[];
    var dialogLines=lyrics.filter(function(l){ return (l.text||'').trim().length>4; });
    if(!dialogLines.length) return;

    /* Cabecera de escena */
    var hdr=document.createElement('div');
    hdr.style.cssText='font-size:9px;font-family:var(--mono,monospace);color:rgba(255,255,255,.28);'+
      'text-transform:uppercase;padding:8px 4px 4px;border-top:1px solid rgba(255,255,255,.06);'+
      'margin-top:4px;letter-spacing:.08em;';
    hdr.textContent='Escena #'+esc.numero+' · '+_fmtT(esc.start_time||0)+' – '+_fmtT(esc.end_time||0);
    list.appendChild(hdr);

    dialogLines.forEach(function(line){
      var text=(line.text||'').trim();
      var lineStart=+(line.t||0), lineEnd=+(line.end||lineStart+4);
      var key=esc.id+'-'+lineStart;
      var isSel=!!_selected[key];

      var row=document.createElement('div');
      row.className='exl-line-row'+(isSel?' selected':'');
      row.dataset.key=key;
      row.style.cssText='display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:8px;'+
        'border:1px solid '+(isSel?'rgba(255,154,108,.35)':'rgba(255,255,255,.05)')+';'+
        'background:'+(isSel?'rgba(255,154,108,.1)':'rgba(255,255,255,.02)')+';'+
        'margin-bottom:3px;cursor:pointer;transition:all .15s;';

      var dot=document.createElement('div');
      dot.style.cssText='width:8px;height:8px;border-radius:50%;flex-shrink:0;transition:.15s;'+
        'background:'+(isSel?'#FF9A6C':'rgba(255,255,255,.15)')+';'+
        'border:1.5px solid '+(isSel?'#FF9A6C':'rgba(255,255,255,.25)')+';';

      var info=document.createElement('div');
      info.style.cssText='flex:1;min-width:0;';
      info.innerHTML=
        '<div style="font-size:11.5px;color:#f0ede6;line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+
          _esc(text)+'</div>'+
        '<div style="font-size:8.5px;color:rgba(255,255,255,.3);margin-top:1px;">'+
          _fmtT(lineStart)+' · '+text.split(/\s+/).length+' palabras</div>';

      var lineData={
        escena_id: esc.id,
        youtube_id: esc.youtube_id,
        start: lineStart,
        end: lineEnd,
        phrase: text,
        pelicula_titulo: pel.titulo_main||pel.slug,
        pelicula_id: pel.id,
        pelicula_slug: pel.slug,
        portada_url: esc.portada_url||'',
        escena_numero: esc.numero
      };

      row.onclick=function(){
        var k=row.dataset.key;
        if(_selected[k]){
          delete _selected[k];
          row.classList.remove('selected');
          row.style.background='rgba(255,255,255,.02)';
          row.style.borderColor='rgba(255,255,255,.05)';
          dot.style.background='rgba(255,255,255,.15)';
          dot.style.borderColor='rgba(255,255,255,.25)';
        } else {
          _selected[k]=lineData;
          row.classList.add('selected');
          row.style.background='rgba(255,154,108,.1)';
          row.style.borderColor='rgba(255,154,108,.35)';
          dot.style.background='#FF9A6C';
          dot.style.borderColor='#FF9A6C';
        }
        _updateSummary();
        _renderCurrentPool();
      };

      row.appendChild(dot);
      row.appendChild(info);
      list.appendChild(row);
      totalLines++;
    });
  });

  if(!totalLines){
    list.innerHTML='<div class="exl-picker-loading">Sin transcript. Usa Whisper primero.</div>';
  }
}

/* ── Guardar pool ── */
window.admSaveSpeakingPool = async function(version, lang){
  if(_saving){ _toast('Guardando, espera…'); return; }
  var sb=_sb();
  if(!sb){ _toast('❌ Sin Supabase'); return; }

  var rank=RANK_MAP[version]||'bronce';
  var lpe=parseInt(document.getElementById('exsp-lines-per-exam')&&
    document.getElementById('exsp-lines-per-exam').value)||_lines_per_exam||5;
  lpe=Math.max(1,Math.min(20,lpe));

  _saving=true;
  _toast('Guardando…');

  /* Borrar filas anteriores */
  await sb.from('exam_content').delete()
    .eq('section','speaking').eq('rank',rank).eq('language',lang);

  var rows=[];

  /* Fila de config */
  rows.push({
    section:'speaking', content_type:'speaking_config',
    rank:rank, language:lang, active:true, difficulty:version,
    content:{ lines_per_exam: lpe }
  });

  /* Filas de líneas */
  Object.keys(_selected).forEach(function(key){
    var it=_selected[key];
    rows.push({
      section:'speaking', content_type:'speaking_scene',
      rank:rank, language:lang, active:true, difficulty:version,
      content:{
        escena_id: it.escena_id,
        youtube_id: it.youtube_id,
        start: it.start,
        end: it.end,
        phrase: it.phrase,
        pelicula_titulo: it.pelicula_titulo,
        pelicula_id: it.pelicula_id,
        pelicula_slug: it.pelicula_slug,
        portada_url: it.portada_url,
        escena_numero: it.escena_numero
      }
    });
  });

  var res=await sb.from('exam_content').insert(rows);
  _saving=false;

  if(res.error){ _toast('❌ '+res.error.message); return; }

  var n=Object.keys(_selected).length;
  _toast('✅ '+n+' líneas · '+lpe+' por examen · '+rank+'/'+lang);
};

})();

/* ════════════════════════════════════════════════════════════════
   admin-examen-editor-pool.js  v5
   Pool picker simplificado:
   · Clic en línea = seleccionar como hueco (blank-bubble Fase 1)
   · Checkbox ❓   = además genera pregunta A/B/C/D en Fase 2
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var RANK_MAP = {1:'bronce',2:'plata',3:'oro',4:'platino',5:'diamante'};

var _blank_items  = {};  /* key → datos de la línea (huecos) */
var _question_keys = {}; /* key → true (líneas con checkbox ❓) */
var _sel_movie    = null;
var _saving       = false;
var _cur_rank     = 'bronce';
var _cur_lang     = 'en';

function _sb(){
  if(window._aura&&window._aura.sb) return window._aura.sb;
  if(window.auraSupabase) return window.auraSupabase;
  return null;
}
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function _fmtT(s){ s=+s||0; var m=Math.floor(s/60),r=Math.floor(s%60); return m+':'+String(r).padStart(2,'0'); }
function _toast(msg){ if(typeof window.admShowToast==='function') window.admShowToast(msg); }

/* ── Cargar pool existente ── */
async function _loadExistingPool(rank,lang){
  var sb=_sb(); if(!sb) return;
  var res=await sb.from('exam_content').select('*')
    .eq('section','listening').eq('rank',rank).eq('language',lang).eq('active',true);
  if(res.error) return;
  _blank_items={}; _question_keys={};
  (res.data||[]).forEach(function(row){
    var c=row.content; if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c={};}}
    if(!c||!c.escena_id) return;
    var key=c.escena_id+'-'+c.start;
    if(row.content_type==='listening_scene'){
      _blank_items[key]=c;
    } else if(row.content_type==='listening_question'){
      /* Solo guardar datos de la línea como hueco previo —
         _question_keys siempre empieza vacío para que el usuario
         re-seleccione qué líneas llevan pregunta sin bloqueos */
      if(!_blank_items[key]) _blank_items[key]=c;
    }
  });
}

/* ── Actualizar barra de resumen ── */
function _updateSummary(){
  var el=document.getElementById('exl-summary'); if(!el) return;
  var nb=Object.keys(_blank_items).length;
  var nq=Object.keys(_question_keys).length;
  el.textContent=nb+' '+(nb===1?'hueco':'huecos')+' · '+nq+' '+(nq===1?'pregunta':'preguntas')+' seleccionados';
  el.style.color=nb>0?'rgba(124,178,255,.9)':'rgba(255,255,255,.3)';
}

/* ── Render principal del drawer ── */
window.admRenderListeningPools=async function(sd,version,lang){
  var body=document.getElementById('adm-dw-body'); if(!body) return;
  body.innerHTML='<div style="padding:20px;text-align:center;color:rgba(255,255,255,.35);font-size:12px;">Cargando…</div>';
  _cur_rank=RANK_MAP[version]||'bronce';
  _cur_lang=lang||'en';
  await _loadExistingPool(_cur_rank,_cur_lang);
  _sel_movie=null;
  body.innerHTML='';

  /* ── Barra resumen ── */
  var summary=document.createElement('div');
  summary.id='exl-summary';
  summary.style.cssText='font-size:11px;font-weight:800;padding:8px 12px;border-radius:8px;'+
    'background:rgba(124,178,255,.06);border:1px solid rgba(124,178,255,.15);'+
    'margin-bottom:10px;text-align:center;transition:.2s;';
  body.appendChild(summary);
  _updateSummary();

  /* ── Nota de uso ── */
  var hint=document.createElement('div');
  hint.style.cssText='font-size:9.5px;color:rgba(255,255,255,.3);line-height:1.6;margin-bottom:10px;padding:0 2px;';
  hint.innerHTML='<b style="color:rgba(124,178,255,.7);">Clic en línea</b> = hueco con banco de palabras &nbsp;·&nbsp; '+
    '<b style="color:rgba(196,255,61,.7);">☑ ❓</b> = además genera pregunta A/B/C/D en Fase 2 (máx. 5)';
  body.appendChild(hint);

  /* ── Picker: película ── */
  var pickerWrap=document.createElement('div');
  pickerWrap.style.cssText='display:flex;flex-direction:column;gap:8px;';

  /* grid de películas */
  var movieSection=document.createElement('div');
  movieSection.innerHTML='<div class="exl-picker-title" style="margin-bottom:6px;">1. Elige película</div>';
  var movieGrid=document.createElement('div'); movieGrid.className='exl-movie-grid'; movieGrid.id='exl-movie-grid';
  movieGrid.innerHTML='<div class="exl-picker-loading">Cargando películas…</div>';
  movieSection.appendChild(movieGrid);
  pickerWrap.appendChild(movieSection);

  /* sección de líneas */
  var linesSection=document.createElement('div');
  linesSection.id='exl-lines-section'; linesSection.style.display='none';
  linesSection.innerHTML='<div class="exl-picker-title" id="exl-lines-title" style="margin:8px 0 6px;">2. Elige líneas</div>';
  var linesList=document.createElement('div'); linesList.className='exl-scene-list'; linesList.id='exl-lines-list';
  linesSection.appendChild(linesList);
  pickerWrap.appendChild(linesSection);

  body.appendChild(pickerWrap);

  /* nota GPT */
  var note=document.createElement('p');
  note.style.cssText='font-size:9px;color:rgba(255,255,255,.2);margin-top:10px;line-height:1.5;';
  note.textContent='Al guardar, GPT-4o-mini genera automáticamente las preguntas (❓) vía Supabase.';
  body.appendChild(note);

  _loadMovies(lang);
};

/* ── Cargar películas ── */
async function _loadMovies(lang){
  var grid=document.getElementById('exl-movie-grid'); if(!grid) return;
  var sb=_sb();
  if(!sb){grid.innerHTML='<div class="exl-picker-loading">Sin Supabase</div>';return;}
  var res=await sb.from('peliculas').select('id,slug,titulo_main,portada_url').eq('activo',true).order('orden');
  if(res.error||!res.data||!res.data.length){
    grid.innerHTML='<div class="exl-picker-loading">No hay películas activas</div>';return;
  }
  grid.innerHTML='';
  res.data.forEach(function(pel){
    var card=document.createElement('div'); card.className='exl-movie-card';
    card.innerHTML='<img src="'+(pel.portada_url||'')+'" onerror="this.style.opacity=\'.2\'">'+
      '<div class="exl-mc-name">'+(pel.titulo_main||pel.slug)+'</div>';
    card.onclick=function(){
      document.querySelectorAll('.exl-movie-card.sel').forEach(function(c){c.classList.remove('sel');});
      card.classList.add('sel'); _sel_movie=pel; _loadLines(pel);
    };
    grid.appendChild(card);
  });
}

/* ── Cargar líneas de diálogo ── */
async function _loadLines(pel){
  var section=document.getElementById('exl-lines-section');
  var titleEl=document.getElementById('exl-lines-title');
  var list=document.getElementById('exl-lines-list');
  if(!section||!list) return;
  section.style.display='';
  if(titleEl) titleEl.textContent='2. Líneas · '+(pel.titulo_main||pel.slug);
  list.innerHTML='<div class="exl-picker-loading">Cargando…</div>';

  var sb=_sb(); if(!sb) return;
  var res=await sb.from('escenas')
    .select('id,numero,youtube_id,start_time,end_time,portada_url,transcript_json')
    .eq('pelicula_id',pel.id).order('numero');

  if(res.error||!res.data||!res.data.length){
    list.innerHTML='<div class="exl-picker-loading">Sin escenas para esta película.</div>';return;
  }

  list.innerHTML='';
  var totalLines=0;

  res.data.forEach(function(esc){
    var tj=esc.transcript_json;
    if(typeof tj==='string'){try{tj=JSON.parse(tj);}catch(e){tj={};}}
    var lyrics=(tj&&tj.lyrics)||[];
    var dialogLines=lyrics.filter(function(l){ return (l.text||'').trim().length>0; });
    if(!dialogLines.length) return;

    /* Separador escena */
    var hdr=document.createElement('div');
    hdr.style.cssText='font-size:9px;font-family:var(--mono,monospace);color:rgba(255,255,255,.28);'+
      'text-transform:uppercase;padding:8px 4px 4px;border-top:1px solid rgba(255,255,255,.06);margin-top:4px;letter-spacing:.08em;';
    hdr.textContent='Escena #'+esc.numero+' · '+_fmtT(esc.start_time||0)+' – '+_fmtT(esc.end_time||0);
    list.appendChild(hdr);

    dialogLines.forEach(function(line){
      var text=(line.text||'').trim();
      var lineStart=+(line.t||0), lineEnd=+(line.end||lineStart+3);
      var words=text.split(/\s+/).filter(Boolean);
      var wcount=words.length;
      var key=esc.id+'-'+lineStart;
      var isBlank=!!_blank_items[key];
      var isQ=!!_question_keys[key];
      var hasEnoughWords=wcount>=5;

      /* Fila de línea */
      var row=document.createElement('div');
      row.className='exl-line-row'+(isBlank?' selected':'');
      row.dataset.key=key;
      row.style.cssText='display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:8px;'+
        'border:1px solid '+(isBlank?'rgba(124,178,255,.35)':'rgba(255,255,255,.05)')+';'+
        'background:'+(isBlank?'rgba(124,178,255,.1)':'rgba(255,255,255,.02)')+';'+
        'margin-bottom:3px;cursor:pointer;transition:all .15s;';

      /* Indicador de selección */
      var dot=document.createElement('div');
      dot.style.cssText='width:8px;height:8px;border-radius:50%;flex-shrink:0;transition:.15s;'+
        'background:'+(isBlank?'#7CB2FF':'rgba(255,255,255,.15)')+';'+
        'border:1.5px solid '+(isBlank?'#7CB2FF':'rgba(255,255,255,.25)')+';';

      /* Texto + meta */
      var info=document.createElement('div');
      info.style.cssText='flex:1;min-width:0;';
      info.innerHTML=
        '<div style="font-size:11.5px;color:#f0ede6;line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+_esc(text)+'</div>'+
        '<div style="font-size:8.5px;color:'+(hasEnoughWords?'rgba(196,255,61,.5)':'rgba(255,255,255,.25)')+';margin-top:1px;">'+
          wcount+' pal.'+(hasEnoughWords?'':' · sin huecos')+' · '+_fmtT(lineStart)+
        '</div>';

      /* Checkbox ❓ */
      var qLabel=document.createElement('label');
      qLabel.style.cssText='display:flex;align-items:center;gap:3px;flex-shrink:0;cursor:pointer;'+
        'font-size:10px;font-weight:700;padding:3px 6px;border-radius:6px;transition:.15s;'+
        'border:1px solid '+(isQ?'rgba(196,255,61,.45)':'rgba(255,255,255,.15)')+';'+
        'background:'+(isQ?'rgba(196,255,61,.1)':'rgba(255,255,255,.03)')+';'+
        'color:'+(isQ?'#c4ff3d':'rgba(255,255,255,.55)')+';';
      var chk=document.createElement('input');
      chk.type='checkbox'; chk.style.cssText='display:none;';
      chk.checked=isQ;
      qLabel.appendChild(chk);
      qLabel.appendChild(document.createTextNode('❓'));
      qLabel.title='Marcar para generar pregunta en Fase 2';

      /* Click en fila → toggle blank */
      var lineData={
        escena_id:esc.id, youtube_id:esc.youtube_id,
        start:lineStart, end:lineEnd, phrase:text,
        pelicula_titulo:pel.titulo_main||pel.slug,
        pelicula_id:pel.id, pelicula_slug:pel.slug,
        portada_url:esc.portada_url||'', escena_numero:esc.numero
      };

      row.onclick=function(e){
        if(e.target===chk||e.target===qLabel||qLabel.contains(e.target)) return;
        var k=row.dataset.key;
        if(_blank_items[k]){
          delete _blank_items[k];
          /* si se deselecciona hueco, quitar pregunta también */
          /* (opcional — mantenemos la pregunta independiente) */
          row.classList.remove('selected');
          row.style.background='rgba(255,255,255,.02)';
          row.style.borderColor='rgba(255,255,255,.05)';
          dot.style.background='rgba(255,255,255,.15)';
          dot.style.borderColor='rgba(255,255,255,.25)';
        } else {
          _blank_items[k]=lineData;
          row.classList.add('selected');
          row.style.background='rgba(124,178,255,.1)';
          row.style.borderColor='rgba(124,178,255,.35)';
          dot.style.background='#7CB2FF';
          dot.style.borderColor='#7CB2FF';
        }
        _updateSummary();
      };

      /* Click en checkbox ❓ → toggle question */
      qLabel.onclick=function(e){
        e.stopPropagation();
        var k=row.dataset.key;
        var currently=!!_question_keys[k];
        if(currently){
          delete _question_keys[k];
          chk.checked=false;
          qLabel.style.borderColor='rgba(255,255,255,.15)';
          qLabel.style.background='rgba(255,255,255,.03)';
          qLabel.style.color='rgba(255,255,255,.55)';
        } else {
          /* Límite 5 preguntas */
          if(Object.keys(_question_keys).length>=5){
            _toast('Máximo 5 preguntas'); return;
          }
          _question_keys[k]=true;
          if(!_blank_items[k]) _blank_items[k]=lineData; /* auto-seleccionar como hueco */
          chk.checked=true;
          qLabel.style.borderColor='rgba(196,255,61,.45)';
          qLabel.style.background='rgba(196,255,61,.1)';
          qLabel.style.color='#c4ff3d';
          /* actualizar estilos de la fila si se auto-seleccionó */
          if(!row.classList.contains('selected')){
            row.classList.add('selected');
            row.style.background='rgba(124,178,255,.1)';
            row.style.borderColor='rgba(124,178,255,.35)';
            dot.style.background='#7CB2FF';
            dot.style.borderColor='#7CB2FF';
          }
        }
        _updateSummary();
      };

      row.appendChild(dot);
      row.appendChild(info);
      row.appendChild(qLabel);
      list.appendChild(row);
      totalLines++;
    });
  });

  if(totalLines===0){
    list.innerHTML='<div class="exl-picker-loading">Sin transcript. Usa Whisper primero.</div>';
  }
}

/* ── Generar pregunta con GPT-4o-mini (vía Edge Function teacher-chat) ── */
async function _generateQuestion(phrase){
  var sb=_sb(); if(!sb) return null;
  var system=
    'You are an English comprehension exam creator for Spanish-speaking students.\n'+
    'Generate ONE comprehension question in SPANISH about what is semantically happening in the movie dialog line.\n'+
    'The question must have exactly 4 options (A, B, C, D). Only one is correct.\n'+
    'IMPORTANT: Respond ONLY with valid JSON, no extra text. Format:\n'+
    '{"q":"¿...?","opts":[{"l":"A","t":"..."},{"l":"B","t":"..."},{"l":"C","t":"..."},{"l":"D","t":"..."}],"correct":"B"}';
  try{
    var resp=await sb.functions.invoke('teacher-chat',{
      body:{
        system:system,
        messages:[{role:'user',content:'Movie dialog line in English: "'+phrase+'"'}]
      }
    });
    if(resp.error) throw resp.error;
    var raw=resp.data&&resp.data.choices&&resp.data.choices[0]&&
            resp.data.choices[0].message&&resp.data.choices[0].message.content;
    if(!raw) return null;
    var m=raw.match(/\{[\s\S]*\}/);
    if(!m) return null;
    return JSON.parse(m[0]);
  }catch(e){ console.warn('[generate-question]',e); return null; }
}

/* ── Guardar pools ── */
window.admSaveListeningPools=async function(version,lang){
  if(_saving){_toast('Guardando, espera…');return;}
  var sb=_sb(); if(!sb){_toast('❌ Sin Supabase');return;}
  var rank=RANK_MAP[version]||'bronce';
  _saving=true;
  _toast('Guardando…');

  /* Borrar filas existentes del mismo rank+lang */
  await sb.from('exam_content').delete()
    .eq('section','listening').eq('rank',rank).eq('language',lang);

  var rows=[];

  /* Filas de huecos */
  Object.keys(_blank_items).forEach(function(key){
    var item=_blank_items[key];
    rows.push({
      section:'listening', content_type:'listening_scene',
      rank:rank, language:lang, active:true, difficulty:version,
      content:{
        escena_id:item.escena_id, youtube_id:item.youtube_id,
        start:item.start, end:item.end, phrase:item.phrase,
        pelicula_titulo:item.pelicula_titulo, pelicula_id:item.pelicula_id,
        pelicula_slug:item.pelicula_slug, portada_url:item.portada_url,
        escena_numero:item.escena_numero
      }
    });
  });

  /* Filas de preguntas — generar con GPT */
  var qKeys=Object.keys(_question_keys);
  if(qKeys.length){
    _toast('Generando '+qKeys.length+' pregunta(s) con GPT…');
    for(var i=0;i<qKeys.length;i++){
      var key=qKeys[i];
      var qi=_blank_items[key]; if(!qi) continue;
      _toast('GPT: pregunta '+(i+1)+'/'+qKeys.length+'…');
      var q=await _generateQuestion(qi.phrase);
      rows.push({
        section:'listening', content_type:'listening_question',
        rank:rank, language:lang, active:true, difficulty:version,
        content:{
          escena_id:qi.escena_id, youtube_id:qi.youtube_id,
          start:qi.start, end:qi.end, phrase:qi.phrase,
          pelicula_titulo:qi.pelicula_titulo, pelicula_id:qi.pelicula_id,
          pelicula_slug:qi.pelicula_slug, portada_url:qi.portada_url,
          escena_numero:qi.escena_numero, question:q
        }
      });
    }
  }

  var res=await sb.from('exam_content').insert(rows);
  _saving=false;
  if(res.error){_toast('❌ '+res.error.message);return;}

  /* Preview del primer hueco */
  if(typeof window.previewExamListening==='function'){
    var firstKey=Object.keys(_blank_items)[0];
    if(firstKey) window.previewExamListening(_blank_items[firstKey]);
  }

  if(typeof window.admCloseDrawer==='function') window.admCloseDrawer();
  var nb=Object.keys(_blank_items).length;
  var nqOk=rows.filter(function(r){return r.content_type==='listening_question'&&r.content&&r.content.question;}).length;
  _toast('✅ '+nb+' huecos · '+nqOk+'/'+qKeys.length+' preguntas · '+rank);
};

})();

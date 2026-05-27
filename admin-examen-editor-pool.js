/* ════════════════════════════════════════════════════════════════
   admin-examen-editor-pool.js  v10
   Pool picker simplificado:
   · Clic en línea = seleccionar como hueco (blank-bubble Fase 1)
   · Botón ❓      = además genera pregunta A/B/C/D en Fase 2
   FIX: reemplazado <label>+<input> por <div> para evitar
        doble-disparo de click que anulaba la selección.
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var RANK_MAP = {1:'bronce',2:'plata',3:'oro',4:'platino',5:'diamante'};

var _blank_items  = {};  /* key → datos de la línea (huecos) */
var _question_keys = {}; /* key → true (líneas con botón ❓ activo) */
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
    /* listening_question NO se carga en _blank_items — evita filas fantasma */
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

/* ── Render lista "Pool actual" — todas las líneas seleccionadas ── */
function _renderCurrentPool(){
  var wrap=document.getElementById('exl-current-pool'); if(!wrap) return;
  var keys=Object.keys(_blank_items);
  wrap.innerHTML='';
  if(!keys.length){
    wrap.innerHTML='<div style="color:rgba(255,255,255,.22);font-size:10px;padding:3px 2px;text-align:center;">Sin líneas — elige desde abajo</div>';
    return;
  }
  /* Agrupar por película */
  var byPel={};
  keys.forEach(function(k){
    var it=_blank_items[k];
    var pk=it.pelicula_titulo||it.pelicula_slug||'?';
    if(!byPel[pk]) byPel[pk]=[];
    byPel[pk].push({key:k,item:it});
  });
  Object.keys(byPel).forEach(function(pelName){
    var grp=byPel[pelName];
    var hdr=document.createElement('div');
    hdr.style.cssText='font-size:8.5px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;'+
      'color:rgba(124,178,255,.55);padding:5px 2px 2px;';
    hdr.textContent=pelName+' ('+grp.length+')';
    wrap.appendChild(hdr);
    grp.forEach(function(entry){
      var it=entry.item, k=entry.key;
      var row=document.createElement('div');
      row.style.cssText='display:flex;align-items:center;gap:6px;padding:4px 6px;border-radius:7px;'+
        'background:rgba(124,178,255,.06);border:1px solid rgba(124,178,255,.13);margin-bottom:3px;';
      var isQ=!!_question_keys[k];
      var dot=document.createElement('div');
      dot.style.cssText='width:6px;height:6px;border-radius:50%;flex-shrink:0;background:'+(isQ?'#c4ff3d':'#7CB2FF')+';';
      var txt=document.createElement('div');
      txt.style.cssText='flex:1;min-width:0;font-size:10px;color:rgba(240,237,230,.85);'+
        'white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
      txt.textContent=(isQ?'❓ ':'')+_esc((it.phrase||'').slice(0,48));
      var del=document.createElement('button');
      del.textContent='×';
      del.title='Quitar del pool';
      del.style.cssText='flex-shrink:0;background:none;border:none;color:rgba(255,90,90,.55);'+
        'font-size:15px;line-height:1;cursor:pointer;padding:0 2px;transition:.12s;';
      del.onmouseenter=function(){this.style.color='rgba(255,90,90,.9)';};
      del.onmouseleave=function(){this.style.color='rgba(255,90,90,.55)';};
      del.onclick=(function(key){return function(e){
        e.stopPropagation();
        delete _blank_items[key]; delete _question_keys[key];
        _renderCurrentPool(); _updateSummary();
        /* Si hay una película abierta, refrescar sus líneas */
        if(_sel_movie) _loadLines(_sel_movie);
      };})(k);
      row.appendChild(dot); row.appendChild(txt); row.appendChild(del);
      wrap.appendChild(row);
    });
  });
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
    '<b style="color:rgba(196,255,61,.7);">❓</b> = además genera pregunta A/B/C/D en Fase 2 (máx. 5)';
  body.appendChild(hint);

  /* ── Picker: película ── */
  /* ── Sección "Pool actual" ── */
  var poolActualSection=document.createElement('div');
  poolActualSection.style.cssText='margin-bottom:8px;';
  var poolActualHdr=document.createElement('div');
  poolActualHdr.style.cssText='display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;';
  var poolActualTitle=document.createElement('div');
  poolActualTitle.style.cssText='font-size:9px;font-weight:800;text-transform:uppercase;'+
    'letter-spacing:.1em;color:rgba(124,178,255,.6);';
  poolActualTitle.textContent='Pool actual';
  var clearBtn=document.createElement('button');
  clearBtn.textContent='🗑 Limpiar todo';
  clearBtn.style.cssText='background:none;border:1px solid rgba(255,90,90,.3);border-radius:6px;'+
    'color:rgba(255,90,90,.6);font-size:8.5px;font-weight:700;cursor:pointer;padding:2px 7px;transition:.15s;';
  clearBtn.onmouseenter=function(){this.style.borderColor='rgba(255,90,90,.7)';this.style.color='rgba(255,90,90,.9)';};
  clearBtn.onmouseleave=function(){this.style.borderColor='rgba(255,90,90,.3)';this.style.color='rgba(255,90,90,.6)';};
  clearBtn.onclick=function(){
    if(!Object.keys(_blank_items).length) return;
    if(!confirm('¿Limpiar todo el pool? Esto no borra la DB hasta que guardes.')) return;
    _blank_items={}; _question_keys={};
    _renderCurrentPool(); _updateSummary();
    if(_sel_movie) _loadLines(_sel_movie);
  };
  poolActualHdr.appendChild(poolActualTitle);
  poolActualHdr.appendChild(clearBtn);
  var poolList=document.createElement('div');
  poolList.id='exl-current-pool';
  poolActualSection.appendChild(poolActualHdr);
  poolActualSection.appendChild(poolList);
  body.appendChild(poolActualSection);
  _renderCurrentPool();

  var pickerWrap=document.createElement('div');
  pickerWrap.style.cssText='display:flex;flex-direction:column;gap:8px;';

  var movieSection=document.createElement('div');
  movieSection.innerHTML='<div class="exl-picker-title" style="margin-bottom:6px;">1. Elige película</div>';
  var movieGrid=document.createElement('div'); movieGrid.className='exl-movie-grid'; movieGrid.id='exl-movie-grid';
  movieGrid.innerHTML='<div class="exl-picker-loading">Cargando películas…</div>';
  movieSection.appendChild(movieGrid);
  pickerWrap.appendChild(movieSection);

  var linesSection=document.createElement('div');
  linesSection.id='exl-lines-section'; linesSection.style.display='none';
  linesSection.innerHTML='<div class="exl-picker-title" id="exl-lines-title" style="margin:8px 0 6px;">2. Elige líneas</div>';
  var linesList=document.createElement('div'); linesList.className='exl-scene-list'; linesList.id='exl-lines-list';
  linesSection.appendChild(linesList);
  pickerWrap.appendChild(linesSection);

  body.appendChild(pickerWrap);

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
      var isQ=!!_question_keys[key]; /* siempre false al abrir drawer */
      var hasEnoughWords=wcount>=5;

      /* ── Fila ── */
      var row=document.createElement('div');
      row.className='exl-line-row'+(isBlank?' selected':'');
      row.dataset.key=key;
      row.style.cssText='display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:8px;'+
        'border:1px solid '+(isBlank?'rgba(124,178,255,.35)':'rgba(255,255,255,.05)')+';'+
        'background:'+(isBlank?'rgba(124,178,255,.1)':'rgba(255,255,255,.02)')+';'+
        'margin-bottom:3px;cursor:pointer;transition:all .15s;';

      var dot=document.createElement('div');
      dot.style.cssText='width:8px;height:8px;border-radius:50%;flex-shrink:0;transition:.15s;'+
        'background:'+(isBlank?'#7CB2FF':'rgba(255,255,255,.15)')+';'+
        'border:1.5px solid '+(isBlank?'#7CB2FF':'rgba(255,255,255,.25)')+';';

      var info=document.createElement('div');
      info.style.cssText='flex:1;min-width:0;';
      info.innerHTML=
        '<div style="font-size:11.5px;color:#f0ede6;line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+_esc(text)+'</div>'+
        '<div style="font-size:8.5px;color:'+(hasEnoughWords?'rgba(196,255,61,.5)':'rgba(255,255,255,.25)')+';margin-top:1px;">'+
          wcount+' pal.'+(hasEnoughWords?'':' · sin huecos')+' · '+_fmtT(lineStart)+
        '</div>';

      /* ── Botón ❓ — usa <div> para evitar doble-disparo de click ── */
      var qBtn=document.createElement('div');
      qBtn.style.cssText='display:flex;align-items:center;gap:3px;flex-shrink:0;cursor:pointer;'+
        'font-size:10px;font-weight:700;padding:3px 6px;border-radius:6px;transition:.15s;user-select:none;'+
        'border:1px solid '+(isQ?'rgba(196,255,61,.45)':'rgba(255,255,255,.2)')+';'+
        'background:'+(isQ?'rgba(196,255,61,.1)':'rgba(255,255,255,.05)')+';'+
        'color:'+(isQ?'#c4ff3d':'rgba(255,255,255,.65)')+';';
      qBtn.textContent='❓';
      qBtn.title='Marcar para generar pregunta en Fase 2';

      var lineData={
        escena_id:esc.id, youtube_id:esc.youtube_id,
        start:lineStart, end:lineEnd, phrase:text,
        pelicula_titulo:pel.titulo_main||pel.slug,
        pelicula_id:pel.id, pelicula_slug:pel.slug,
        portada_url:esc.portada_url||'', escena_numero:esc.numero
      };

      /* ── Click en fila → toggle blank ── */
      row.onclick=function(e){
        if(qBtn===e.target||qBtn.contains(e.target)) return;
        var k=row.dataset.key;
        if(_blank_items[k]){
          delete _blank_items[k];
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
        _updateSummary(); _renderCurrentPool();
      };

      /* ── Click en ❓ → toggle question (SIN doble-disparo) ── */
      qBtn.onclick=function(e){
        e.stopPropagation();
        var k=row.dataset.key;
        if(_question_keys[k]){
          /* desmarcar */
          delete _question_keys[k];
          qBtn.style.borderColor='rgba(255,255,255,.2)';
          qBtn.style.background='rgba(255,255,255,.05)';
          qBtn.style.color='rgba(255,255,255,.65)';
        } else {
          /* marcar */
          if(Object.keys(_question_keys).length>=5){
            _toast('Máximo 5 preguntas'); return;
          }
          _question_keys[k]=true;
          /* auto-seleccionar línea como hueco si no estaba */
          if(!_blank_items[k]){
            _blank_items[k]=lineData;
            row.classList.add('selected');
            row.style.background='rgba(124,178,255,.1)';
            row.style.borderColor='rgba(124,178,255,.35)';
            dot.style.background='#7CB2FF';
            dot.style.borderColor='#7CB2FF';
          }
          qBtn.style.borderColor='rgba(196,255,61,.45)';
          qBtn.style.background='rgba(196,255,61,.1)';
          qBtn.style.color='#c4ff3d';
        }
        _updateSummary(); _renderCurrentPool();
      };

      row.appendChild(dot);
      row.appendChild(info);
      row.appendChild(qBtn);
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
    'You are an English listening comprehension exam creator for Spanish-speaking students (B1-B2 level).\n'+
    'Given a movie dialog line in English, generate ONE multiple-choice question IN SPANISH.\n'+
    '\n'+
    'CRITICAL RULES — follow strictly:\n'+
    '1. NEVER translate the phrase or any word from it. NEVER reveal its meaning in the question or options.\n'+
    '2. Ask ONLY about context: what situation the characters are in, what the speaker wants,\n'+
    '   the emotion/attitude expressed, the relationship between characters, or what action is taking place.\n'+
    '3. All 4 options must be plausible; only ONE is correct. Avoid obvious/silly distractors.\n'+
    '4. GOOD question types: situational (¿Qué está ocurriendo?), intentional (¿Qué intenta el personaje?),\n'+
    '   emotional (¿Cómo se siente el hablante?), relational (¿Qué relación tienen los personajes?).\n'+
    '5. FORBIDDEN: translating words, explaining vocabulary, asking about the literal meaning of phrases.\n'+
    '\n'+
    'Respond ONLY with valid JSON — no extra text, no markdown:\n'+
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

  await sb.from('exam_content').delete()
    .eq('section','listening').eq('rank',rank).eq('language',lang);

  var rows=[];

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

  /* FIX v8: usar initExamListening en lugar de previewExamListening para que
     _shuffledPool tenga TODAS las líneas guardadas y no solo 1 (causaba Fase 2 temprana) */
  if(typeof window.admCloseDrawer==='function') window.admCloseDrawer();
  if(typeof window.initExamListening==='function'){
    setTimeout(function(){ window.initExamListening({rank:rank, lang:lang||'en'}); }, 300);
  }
  var nb=Object.keys(_blank_items).length;
  var nqOk=rows.filter(function(r){return r.content_type==='listening_question'&&r.content&&r.content.question;}).length;
  _toast('✅ '+nb+' huecos · '+nqOk+'/'+qKeys.length+' preguntas · '+rank);
};

})();

/* ════════════════════════════════════════════════════════════════
   admin-examen-editor-pool.js  v4
   Pool picker — Listening exam.
   · Líneas de HUECOS (blank-bubble): el estudiante rellena palabras
   · Líneas de PREGUNTAS (A/B/C/D): GPT genera pregunta al guardar
   · Dos pools separados, guardados en exam_content
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var RANK_MAP = {1:'bronce',2:'plata',3:'oro',4:'platino',5:'diamante'};

var _blank_items    = [];   /* líneas para huecos */
var _question_items = [];   /* líneas para preguntas A/B/C/D */
var _sel_movie      = null;
var _saving         = false;

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
  var sb=_sb(); if(!sb) return {blanks:[],questions:[]};
  var res=await sb.from('exam_content').select('*')
    .eq('section','listening').eq('rank',rank).eq('language',lang).eq('active',true);
  if(res.error) return {blanks:[],questions:[]};
  var blanks=[],questions=[];
  (res.data||[]).forEach(function(row){
    var c=row.content; if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c={};}}
    if(!c||!c.escena_id) return;
    if(row.content_type==='listening_question') questions.push(c);
    else blanks.push(c);
  });
  return {blanks:blanks,questions:questions};
}

/* ── Render pool de huecos ── */
function _renderBlankList(container){
  container.innerHTML='';
  if(!_blank_items.length){
    container.innerHTML='<div class="exl-pool-empty">Sin líneas de huecos. Agrega con "＋ Hueco"</div>';
    return;
  }
  _blank_items.forEach(function(item,idx){
    var div=document.createElement('div'); div.className='exl-pool-item';
    var img=document.createElement('img'); img.className='exl-pool-thumb';
    img.src=item.portada_url||''; img.onerror=function(){this.style.opacity='.2';};
    var info=document.createElement('div'); info.className='exl-pool-info';
    info.innerHTML='<b>'+(item.pelicula_titulo||'')+'</b>'+
      '<span class="exl-pool-phrase">'+(item.phrase||'')+'</span>'+
      '<span class="exl-pool-time">'+_fmtT(item.start)+' – '+_fmtT(item.end)+'</span>';
    var rm=document.createElement('button'); rm.className='exl-pool-rm'; rm.textContent='✕';
    rm.onclick=function(){ _blank_items.splice(idx,1); _renderBlankList(container); };
    div.appendChild(img); div.appendChild(info); div.appendChild(rm);
    container.appendChild(div);
  });
}

/* ── Render pool de preguntas ── */
function _renderQuestionList(container){
  container.innerHTML='';
  if(!_question_items.length){
    container.innerHTML='<div class="exl-pool-empty">Sin líneas de preguntas. Agrega con "❓ Pregunta"</div>';
    return;
  }
  _question_items.forEach(function(item,idx){
    var div=document.createElement('div'); div.className='exl-pool-item';
    var badge=document.createElement('div');
    badge.style.cssText='width:34px;height:34px;border-radius:8px;background:rgba(196,255,61,.1);border:1px solid rgba(196,255,61,.25);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;';
    badge.textContent='❓';
    var info=document.createElement('div'); info.className='exl-pool-info';
    /* Si ya tiene pregunta generada, mostrarla */
    var qText=item.question?item.question.q:'(GPT generará la pregunta al guardar)';
    info.innerHTML='<b style="font-size:10px;color:rgba(255,255,255,.5);">'+(item.pelicula_titulo||'')+'</b>'+
      '<span class="exl-pool-phrase">'+(item.phrase||'')+'</span>'+
      '<span style="font-size:9px;color:rgba(196,255,61,.6);font-style:italic;">'+_esc(qText)+'</span>';
    var rm=document.createElement('button'); rm.className='exl-pool-rm'; rm.textContent='✕';
    rm.onclick=function(){ _question_items.splice(idx,1); _renderQuestionList(container); };
    div.appendChild(badge); div.appendChild(info); div.appendChild(rm);
    container.appendChild(div);
  });
}

/* ── Render drawer principal ── */
window.admRenderListeningPools=async function(sd,version,lang){
  var body=document.getElementById('adm-dw-body'); if(!body) return;
  body.innerHTML='<div style="padding:20px;text-align:center;color:rgba(255,255,255,.35);font-size:12px;">Cargando…</div>';

  var rank=RANK_MAP[version]||'bronce';
  var existing=await _loadExistingPool(rank,lang);
  _blank_items=existing.blanks;
  _question_items=existing.questions;
  _sel_movie=null;
  body.innerHTML='';

  /* ── Sección HUECOS ── */
  var s1=document.createElement('div'); s1.className='adm-section-label';
  s1.innerHTML='🔵 Huecos (blank-bubble) · V'+version+' · '+rank.toUpperCase();
  body.appendChild(s1);
  var blankList=document.createElement('div'); blankList.className='exl-pool-list'; blankList.id='exl-blank-list';
  body.appendChild(blankList);
  _renderBlankList(blankList);

  /* ── Sección PREGUNTAS ── */
  var s2=document.createElement('div'); s2.className='adm-section-label';
  s2.style.marginTop='14px';
  s2.innerHTML='❓ Preguntas A/B/C/D · máx. 5 · GPT las genera al guardar';
  body.appendChild(s2);
  var qList=document.createElement('div'); qList.className='exl-pool-list'; qList.id='exl-q-list';
  body.appendChild(qList);
  _renderQuestionList(qList);

  /* ── Botón abrir picker ── */
  var addBtn=document.createElement('button'); addBtn.className='exl-add-scene-btn';
  addBtn.style.marginTop='12px';
  addBtn.textContent='＋ Agregar líneas de diálogo';
  addBtn.onclick=function(){
    var picker=document.getElementById('exl-picker');
    if(!picker) return;
    picker.classList.toggle('open');
    if(picker.classList.contains('open')&&!picker.dataset.loaded){
      _loadMovies(lang); picker.dataset.loaded='1';
    }
  };
  body.appendChild(addBtn);

  /* ── Picker ── */
  var picker=document.createElement('div'); picker.className='exl-picker'; picker.id='exl-picker';
  picker.innerHTML=
    '<div class="exl-picker-title">1. Elige película</div>'+
    '<div class="exl-movie-grid" id="exl-movie-grid"><div class="exl-picker-loading">Cargando películas…</div></div>'+
    '<div id="exl-lines-section" style="display:none;">'+
      '<div class="exl-picker-title" id="exl-lines-title" style="margin-top:10px;">2. Elige líneas</div>'+
      '<div style="font-size:10px;color:rgba(255,255,255,.3);margin-bottom:6px;">'+
        '<b style="color:rgba(124,178,255,.8);">Hueco</b> = palabra oculta con banco · '+
        '<b style="color:rgba(196,255,61,.8);">Pregunta</b> = GPT genera A/B/C/D (máx. 5)'+
      '</div>'+
      '<div class="exl-scene-list" id="exl-lines-list"></div>'+
    '</div>';
  body.appendChild(picker);

  var note=document.createElement('p');
  note.style.cssText='font-size:10px;color:rgba(255,255,255,.25);margin-top:10px;line-height:1.5;';
  note.textContent='Al guardar, GPT-4o-mini genera automáticamente las preguntas de comprensión (clave en Supabase).';
  body.appendChild(note);
};

/* ── Cargar películas ── */
async function _loadMovies(lang){
  var grid=document.getElementById('exl-movie-grid'); if(!grid) return;
  var sb=_sb();
  if(!sb){grid.innerHTML='<div class="exl-picker-loading">Sin Supabase</div>';return;}
  var res=await sb.from('peliculas').select('id,slug,titulo_main,portada_url').eq('activo',true).order('orden');
  if(res.error||!res.data||!res.data.length){
    grid.innerHTML='<div class="exl-picker-loading">No hay películas</div>';return;
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
    hdr.style.cssText='font-size:9px;font-family:var(--mono);color:rgba(255,255,255,.3);'+
      'text-transform:uppercase;padding:8px 4px 4px;border-top:1px solid rgba(255,255,255,.06);margin-top:4px;';
    hdr.textContent='Escena #'+esc.numero+' · '+_fmtT(esc.start_time||0)+' – '+_fmtT(esc.end_time||0);
    list.appendChild(hdr);

    dialogLines.forEach(function(line){
      var text=(line.text||'').trim();
      var lineStart=+(line.t||0), lineEnd=+(line.end||lineStart+3);
      var words=text.split(' ').length;
      var key=esc.id+'-'+lineStart;

      var item=document.createElement('div');
      item.style.cssText='padding:7px 8px;border-radius:8px;margin-bottom:3px;'+
        'background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);'+
        'display:flex;flex-direction:column;gap:5px;';

      /* Texto de la línea */
      var textRow=document.createElement('div');
      textRow.style.cssText='display:flex;align-items:flex-start;justify-content:space-between;gap:8px;';
      textRow.innerHTML=
        '<span style="font-size:11.5px;color:#f0ede6;line-height:1.4;flex:1;">'+_esc(text)+'</span>'+
        '<span style="font-size:8px;color:'+(words>=5?'#c4ff3d':'rgba(255,255,255,.25)')+';flex-shrink:0;">'+words+' pal.</span>';

      /* Botones acción */
      var btns=document.createElement('div');
      btns.style.cssText='display:flex;gap:6px;';

      var btnB=document.createElement('button');
      btnB.style.cssText='flex:1;padding:4px 0;font-size:10px;font-weight:700;border-radius:7px;cursor:pointer;'+
        'background:rgba(124,178,255,.1);border:1px solid rgba(124,178,255,.3);color:rgba(124,178,255,.9);transition:.15s;';
      btnB.textContent='＋ Hueco';
      btnB.onclick=function(){
        if(_blank_items.some(function(p){return p._key===key;})){
          _toast('Esta línea ya está en huecos'); return;
        }
        _blank_items.push({
          _key:key, escena_id:esc.id, youtube_id:esc.youtube_id,
          start:lineStart, end:lineEnd, phrase:text,
          pelicula_titulo:pel.titulo_main||pel.slug,
          pelicula_id:pel.id, pelicula_slug:pel.slug,
          portada_url:esc.portada_url||'', escena_numero:esc.numero
        });
        var bl=document.getElementById('exl-blank-list');
        if(bl) _renderBlankList(bl);
        btnB.style.background='rgba(124,178,255,.3)';
        setTimeout(function(){btnB.style.background='rgba(124,178,255,.1)';},600);
        _toast('✓ Hueco agregado');
      };

      var btnQ=document.createElement('button');
      btnQ.style.cssText='flex:1;padding:4px 0;font-size:10px;font-weight:700;border-radius:7px;cursor:pointer;'+
        'background:rgba(196,255,61,.08);border:1px solid rgba(196,255,61,.25);color:rgba(196,255,61,.9);transition:.15s;';
      btnQ.textContent='❓ Pregunta';
      btnQ.onclick=function(){
        if(_question_items.length>=5){
          _toast('Máximo 5 preguntas por clip'); return;
        }
        if(_question_items.some(function(p){return p._key===key+'_q';})){
          _toast('Esta línea ya tiene pregunta'); return;
        }
        _question_items.push({
          _key:key+'_q', escena_id:esc.id, youtube_id:esc.youtube_id,
          start:lineStart, end:lineEnd, phrase:text,
          pelicula_titulo:pel.titulo_main||pel.slug,
          pelicula_id:pel.id, pelicula_slug:pel.slug,
          portada_url:esc.portada_url||'', escena_numero:esc.numero,
          question:null /* se genera al guardar */
        });
        var ql=document.getElementById('exl-q-list');
        if(ql) _renderQuestionList(ql);
        btnQ.style.background='rgba(196,255,61,.2)';
        setTimeout(function(){btnQ.style.background='rgba(196,255,61,.08)';},600);
        _toast('❓ Pregunta agregada (GPT al guardar)');
      };

      btns.appendChild(btnB); btns.appendChild(btnQ);
      item.appendChild(textRow); item.appendChild(btns);
      list.appendChild(item);
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

  /* Borrar filas existentes */
  await sb.from('exam_content').delete()
    .eq('section','listening').eq('rank',rank).eq('language',lang);

  var rows=[];

  /* Filas de huecos */
  _blank_items.forEach(function(item){
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
  if(_question_items.length){
    _toast('Generando preguntas con GPT… ('+_question_items.length+')');
    var hasDismissed=false;
    for(var i=0;i<_question_items.length;i++){
      var qi=_question_items[i];
      if(!hasDismissed){ _toast('GPT generando pregunta '+(i+1)+'/'+_question_items.length+'…'); }
      var q=await _generateQuestion(qi.phrase);
      if(q) qi.question=q;
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

  /* Preview */
  if(typeof window.previewExamListening==='function'&&_blank_items.length){
    var pick=_blank_items[Math.floor(Math.random()*_blank_items.length)];
    window.previewExamListening(pick);
  }

  if(typeof window.admCloseDrawer==='function') window.admCloseDrawer();
  var qOk=_question_items.filter(function(qi){return qi.question;}).length;
  _toast('✅ '+_blank_items.length+' huecos · '+qOk+'/'+_question_items.length+' preguntas generadas · '+rank);
};

})();

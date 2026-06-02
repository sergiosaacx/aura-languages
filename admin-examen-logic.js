/* admin-examen-logic.js — lógica del editor admin: drawer, publicar, toast */
// ── Sync hero card (se ejecuta justo después de cargar el shell) ──
// ── Sync hero card con el clip real cargado por el engine desde Supabase
if(typeof window.onExamListeningPick === 'function'){
  window.onExamListeningPick(function(clip){
    if(!clip) return;
    var title = clip.pelicula_titulo || clip.pelicula_slug || 'clip';
    var fT = function(s){ s=+s||0; return Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0'); };
    var ipa = 'audio · ' + fT(clip.start||0) + ' / ' + fT(clip.end||0);
    skillData.listen.word = title;
    skillData.listen.ipa = ipa;
    if(document.querySelector('.tab.active')?.dataset.skill === 'listen'){
      var wEl = heroCard.querySelector('.hc-word');
      var ipaEl = heroCard.querySelector('.hc-ipa');
      if(wEl){ wEl.textContent = title; }
      if(ipaEl){ ipaEl.textContent = ipa; }
    }
  });
}

// initial apply (vocab is preselected)
applyVersion(EXAM_VERSION);

// ── Admin drawer, publicar y toast ──
(function(){
  'use strict';
  document.body.classList.add('adm-mode');
  let _v = 1, _skill = null;

  function fixIframes(container){
    container.querySelectorAll('iframe').forEach(iframe=>{
      const ni = document.createElement('iframe');
      Array.from(iframe.attributes).forEach(a=>ni.setAttribute(a.name,a.value));
      iframe.parentNode.replaceChild(ni, iframe);
    });
  }

  function admAddEditBtns(){
    document.querySelectorAll('.mid-content[data-skill]').forEach(panel=>{
      if(panel.querySelector('.adm-ep-btn')) return;
      const skill = panel.dataset.skill;
      const btn = document.createElement('button');
      btn.className = 'adm-ep-btn';
      btn.textContent = '✏ Editar';
      btn.onclick = e=>{ e.stopPropagation(); admOpenDrawer(skill); };
      panel.appendChild(btn);
    });
  }

  window.admSetVersion = function(v){
    _v = v;
    document.querySelectorAll('.adm-vtab').forEach(t=>t.classList.toggle('active', parseInt(t.dataset.v)===v));
    document.getElementById('adm-status').textContent = 'Editando V'+v;
    if(typeof applyVersion==='function') applyVersion(v);
    setTimeout(admAddEditBtns, 150);
  };

  window.admSetLang = function(lang){ admShowToast('Idioma: '+lang); };
  window.admSetScore = function(val){};

  window.admOpenDrawer = function(skill){
    _skill = skill;
    document.getElementById('adm-dw-title').textContent = 'Editar · '+skill.toUpperCase();
    let sd = null;
    if(typeof VERSION_SD!=='undefined' && VERSION_SD[_v] && VERSION_SD[_v][skill]) sd = VERSION_SD[_v][skill];
    else if(typeof skillData!=='undefined' && skillData[skill]) sd = skillData[skill];
    let midHtml = '';
    if(typeof VERSION_MID!=='undefined' && VERSION_MID[_v] && VERSION_MID[_v][skill]) midHtml = VERSION_MID[_v][skill];
    else { const el = document.querySelector('.mid-content[data-skill="'+skill+'"]'); if(el) midHtml = el.innerHTML; }
    const body = document.getElementById('adm-dw-body');
    body.innerHTML = '';
    if(skill==='listen' && typeof window.admRenderListeningPools==='function'){
      document.getElementById('adm-overlay').classList.add('open');
      document.getElementById('adm-drawer').classList.add('open');
      window.admRenderListeningPools(sd, _v, (document.getElementById('adm-lang')||{}).value||'en');
      return;
    }
    if(sd){
      const sec = document.createElement('div');
      sec.innerHTML = '<div class="adm-section-label">Hero Card</div>';
      const grid = document.createElement('div'); grid.className = 'adm-hero-grid';
      [{key:'word',label:'Título'},{key:'ipa',label:'IPA / Subtítulo'},{key:'pos',label:'Categoría'},{key:'chip',label:'Chip'},{key:'rating',label:'Rating'},{key:'qLabel',label:'Instrucción'}].forEach(f=>{
        const w = document.createElement('div'); w.className = 'adm-field';
        w.innerHTML = '<label>'+f.label+'</label><input type="text" data-key="'+f.key+'" value="'+(sd[f.key]||'').replace(/"/g,'&quot;')+'">';
        grid.appendChild(w);
      });
      if(sd.opts){ const w=document.createElement('div'); w.className='adm-field'; w.style.gridColumn='1/-1'; w.innerHTML='<label>Opciones (separar con |)</label><input type="text" data-key="opts" value="'+sd.opts.map(o=>o.t||o).join('|')+'">'; grid.appendChild(w); }
      sec.appendChild(grid); body.appendChild(sec);
    }
    if(skill==='read'){
      const tmp=document.createElement('div'); tmp.innerHTML=midHtml;
      const h3=tmp.querySelector('.read-article h3');
      const bodyPs=tmp.querySelectorAll('.read-body p');
      const titleVal=h3?h3.textContent.trim():'';
      const bodyVal=Array.from(bodyPs).map(p=>p.textContent.trim()).join('\n\n');
      const rsec=document.createElement('div');
      rsec.innerHTML='<div class="adm-section-label">Contenido de lectura</div>';
      const titleF=document.createElement('div'); titleF.className='adm-field';
      titleF.innerHTML='<label>Título</label><input type="text" data-key="read_title" value="'+(titleVal.replace(/"/g,'&quot;'))+'">';
      rsec.appendChild(titleF);
      const bodyF=document.createElement('div'); bodyF.className='adm-field';
      bodyF.innerHTML='<label>Texto (separa párrafos con una línea en blanco)</label><textarea data-key="read_body" rows="12" placeholder="Escribe el texto aquí...">'+bodyVal.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</textarea>';
      rsec.appendChild(bodyF);
      body.appendChild(rsec);
      document.getElementById('adm-overlay').classList.add('open');
      document.getElementById('adm-drawer').classList.add('open');
      return;
    }
    const msec2 = document.createElement('div');
    msec2.innerHTML = '<div class="adm-section-label">Contenido Central (HTML)</div>';
    const mf = document.createElement('div'); mf.className = 'adm-field';
    mf.innerHTML = '<label>HTML del panel</label><textarea data-key="midHtml" rows="10">'+midHtml.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</textarea>';
    msec2.appendChild(mf); body.appendChild(msec2);
    document.getElementById('adm-overlay').classList.add('open');
    document.getElementById('adm-drawer').classList.add('open');
  };

  window.admCloseDrawer = function(){
    document.getElementById('adm-overlay').classList.remove('open');
    document.getElementById('adm-drawer').classList.remove('open');
    _skill = null;
  };

  window.admSaveDrawer = function(){
    if(!_skill) return;
    if(_skill==='listen' && typeof window.admSaveListeningPools==='function'){
      window.admSaveListeningPools(_v, (document.getElementById('adm-lang')||{}).value||'en');
      return;
    }
    if(_skill==='read'){
      const rtitle=(document.querySelector('#adm-dw-body input[data-key="read_title"]')?.value||'').trim();
      const rbody=(document.querySelector('#adm-dw-body textarea[data-key="read_body"]')?.value||'').trim();
      const paras=rbody.split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean);
      const parasHtml=paras.map(p=>'<p>'+p.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</p>').join('');
      const articleHtml='<div class="exam-panel" style="--c:167,139,250;"><header class="ep-h"><span class="ep-tag">lectura · '+rtitle+'</span><span class="ep-count">texto de lectura</span></header><article class="read-article"><h3>'+rtitle+'</h3><div class="read-body">'+parasHtml+'</div></article></div>';
      let existingMid='';
      if(typeof VERSION_MID!=='undefined'&&VERSION_MID[_v]&&VERSION_MID[_v]['read']) existingMid=VERSION_MID[_v]['read'];
      else{ const elr=document.querySelector('.mid-content[data-skill="read"]'); if(elr) existingMid=elr.innerHTML; }
      const tmp2=document.createElement('div'); tmp2.innerHTML=existingMid;
      const tfPanels=tmp2.querySelectorAll('.exam-panel');
      const tfHtml=tfPanels.length>1?tfPanels[1].outerHTML:'';
      const midHtmlR=articleHtml+tfHtml;
      if(typeof VERSION_MID!=='undefined'){ if(!VERSION_MID[_v]) VERSION_MID[_v]={}; VERSION_MID[_v]['read']=midHtmlR; }
      const elrd=document.querySelector('.mid-content[data-skill="read"]');
      if(elrd){ elrd.innerHTML=midHtmlR; if(typeof fixIframes==='function') fixIframes(elrd); }
      if(typeof applyVersion==='function') applyVersion(_v);
      admCloseDrawer();
      admShowToast('✓ Cambios aplicados · V'+_v+' · reading');
      return;
    }
    const heroData = {};
    document.querySelectorAll('#adm-dw-body input[data-key]').forEach(inp=>{
      const k = inp.dataset.key;
      if(['yt_id','yt_start','yt_end'].includes(k)) return;
      heroData[k] = k==='opts' ? inp.value.split('|').map(s=>s.trim()) : inp.value;
    });
    const midTa = document.querySelector('#adm-dw-body textarea[data-key="midHtml"]');
    let midHtml = midTa ? midTa.value : '';
    if(_skill==='listen'){
      const ytId = (document.querySelector('#adm-dw-body input[data-key="yt_id"]')?.value||'').trim();
      const ytStart = (document.querySelector('#adm-dw-body input[data-key="yt_start"]')?.value||'0').trim();
      if(ytId){ midHtml = midHtml.replace(/https:\/\/www\.youtube\.com\/embed\/[^?]*\?start=\d+/g, 'https://www.youtube.com/embed/'+ytId+'?start='+ytStart); if(midTa) midTa.value = midHtml; }
    }
    if(typeof VERSION_SD!=='undefined'){ if(!VERSION_SD[_v]) VERSION_SD[_v]={}; VERSION_SD[_v][_skill]=Object.assign(VERSION_SD[_v][_skill]||{}, heroData); }
    if(typeof VERSION_MID!=='undefined'){ if(!VERSION_MID[_v]) VERSION_MID[_v]={}; VERSION_MID[_v][_skill]=midHtml; }
    const el = document.querySelector('.mid-content[data-skill="'+_skill+'"]');
    if(el){ el.innerHTML=midHtml; fixIframes(el); }
    if(typeof applyVersion==='function') applyVersion(_v);
    admCloseDrawer();
    admShowToast('✓ Cambios aplicados · V'+_v+' · '+_skill);
  };

  window.admPreview = function(){
    admShowToast('Abriendo preview…');
    window.open('https://auralanguage.app/examen-ascenso.html', '_blank');
  };

  window.admPublish = function(){
    const payload = { section:'full', rank:['bronce','plata','oro','platino','diamante','challenger'][_v]||'diamante', language: document.getElementById('adm-lang')?.value||'en', content: JSON.stringify({version:_v, sd:(typeof VERSION_SD!=='undefined')?VERSION_SD[_v]:{}, mid:(typeof VERSION_MID!=='undefined')?VERSION_MID[_v]:{}}), active:true };
    if(typeof window.auraSupabase!=='undefined' && window.auraSupabase){ window.auraSupabase.from('exam_content').upsert(payload,{onConflict:'section,rank,language'}).then(({error})=>{ admShowToast(error?'❌ '+error.message:'✅ Publicado V'+_v); }); }
    else { navigator.clipboard?.writeText(JSON.stringify(payload,null,2)).then(()=>admShowToast('📋 JSON copiado')).catch(()=>admShowToast('⚠ Sin Supabase')); }
  };

  window.admShowToast = function(msg){
    const t = document.getElementById('adm-toast'); if(!t) return;
    t.textContent=msg; t.classList.add('show'); clearTimeout(t._tid);
    t._tid = setTimeout(()=>t.classList.remove('show'), 2800);
  };

  // Apply V1 immediately on load
  function initAdmin(){
    admAddEditBtns();
    admSetVersion(1);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', initAdmin);
  else initAdmin();

})();
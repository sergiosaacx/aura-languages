/* admin-examen-logic.js -- dispatcher del editor admin */

window.admEditorRender = window.admEditorRender || {};
window.admEditorSave   = window.admEditorSave   || {};

if (typeof window.onExamListeningPick === 'function') {
  window.onExamListeningPick(function (clip) {
    if (!clip) return;
    var title = clip.pelicula_titulo || clip.pelicula_slug || 'clip';
    var fT = function (s) { s = +s || 0; return Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0'); };
    var ipa = 'audio ' + fT(clip.start||0) + ' / ' + fT(clip.end||0);
    skillData.listen.word = title;
    skillData.listen.ipa  = ipa;
    if (document.querySelector('.tab.active')?.dataset.skill === 'listen') {
      var wEl = heroCard.querySelector('.hc-word');
      var ipaEl = heroCard.querySelector('.hc-ipa');
      if (wEl) wEl.textContent = title;
      if (ipaEl) ipaEl.textContent = ipa;
    }
  });
}

applyVersion(EXAM_VERSION);

(function () {
  'use strict';
  document.body.classList.add('adm-mode');
  var _v = 1, _skill = null;

  function fixIframes(container) {
    container.querySelectorAll('iframe').forEach(function (iframe) {
      var ni = document.createElement('iframe');
      Array.from(iframe.attributes).forEach(function (a) { ni.setAttribute(a.name, a.value); });
      iframe.parentNode.replaceChild(ni, iframe);
    });
  }

  window._admRenderHeroCard = function (sd, body) {
    if (!sd) return;
    var sec = document.createElement('div');
    sec.innerHTML = '<div class="adm-section-label">Hero Card</div>';
    var grid = document.createElement('div');
    grid.className = 'adm-hero-grid';
    [{key:'word',label:'Titulo'},{key:'ipa',label:'IPA'},{key:'pos',label:'Categoria'},
     {key:'chip',label:'Chip'},{key:'rating',label:'Rating'},{key:'qLabel',label:'Instruccion'}
    ].forEach(function (f) {
      var w = document.createElement('div');
      w.className = 'adm-field';
      w.innerHTML = '<label>'+f.label+'</label><input type="text" data-key="'+f.key+'" value="'+(sd[f.key]||'').replace(/"/g,'&quot;')+'">';
      grid.appendChild(w);
    });
    if (sd.opts) {
      var w = document.createElement('div');
      w.className = 'adm-field';
      w.style.gridColumn = '1/-1';
      w.innerHTML = '<label>Opciones (separar con |)</label><input type="text" data-key="opts" value="'+sd.opts.map(function(o){return o.t||o;}).join('|')+'">';
      grid.appendChild(w);
    }
    sec.appendChild(grid);
    body.appendChild(sec);
  };

  window._admGetV     = function () { return _v; };
  window._admGetSkill = function () { return _skill; };

  function admAddEditBtns() {
    document.querySelectorAll('.mid-content[data-skill]').forEach(function (panel) {
      if (panel.querySelector('.adm-ep-btn')) return;
      var skill = panel.dataset.skill;
      var btn = document.createElement('button');
      btn.className = 'adm-ep-btn';
      btn.textContent = 'Editar';
      btn.onclick = function (e) { e.stopPropagation(); window.admOpenDrawer(skill); };
      panel.appendChild(btn);
    });
  }

  function _admLoadLangContent(v, lang) {
    var sb = window._aura && window._aura.sb;
    if (!sb) return;
    var RANKS = {1:'bronce',2:'plata',3:'oro',4:'platino',5:'diamante'};
    var rank = RANKS[v] || 'diamante';
    sb.from('exam_content').select('content')
      .eq('section','full').eq('rank',rank).eq('language',lang).eq('active',true)
      .single()
      .then(function (res) {
        if (res.error || !res.data) {
          window.admShowToast('Sin contenido en '+lang.toUpperCase()+' V'+v);
          return;
        }
        var c = res.data.content;
        if (typeof c==='string') { try { c=JSON.parse(c); } catch(e) { return; } }
        if (!c) return;
        if (typeof VERSION_MID !== 'undefined') {
          if (!VERSION_MID[v]) VERSION_MID[v] = {};
          if (c.mid) Object.assign(VERSION_MID[v], c.mid);
        }
        if (typeof VERSION_SD !== 'undefined') {
          if (!VERSION_SD[v]) VERSION_SD[v] = {};
          if (c.sd) Object.assign(VERSION_SD[v], c.sd);
        }
        if (typeof applyVersion === 'function') applyVersion(v);
        window.admShowToast('Idioma '+lang.toUpperCase()+' cargado');
      });
  }

  window.admSetVersion = function (v) {
    _v = v;
    document.querySelectorAll('.adm-vtab').forEach(function (t) {
      t.classList.toggle('active', parseInt(t.dataset.v)===v);
    });
    var st = document.getElementById('adm-status');
    if (st) st.textContent = 'Editando V'+v;
    if (typeof applyVersion === 'function') applyVersion(v);
    var lang = (document.getElementById('adm-lang')||{}).value||'en';
    _admLoadLangContent(v, lang);
    setTimeout(admAddEditBtns, 150);
  };

  window.admSetLang = function (lang) {
    window.admShowToast('Cargando '+lang.toUpperCase()+'...');
    _admLoadLangContent(_v, lang);
  };

  window.admSetScore = function () {};

  window.admOpenDrawer = function (skill) {
    _skill = skill;
    var titleEl = document.getElementById('adm-dw-title');
    if (titleEl) titleEl.textContent = 'Editar '+skill.toUpperCase();
    var sd = null, midHtml = '';
    if (typeof VERSION_SD !== 'undefined' && VERSION_SD[_v] && VERSION_SD[_v][skill]) sd = VERSION_SD[_v][skill];
    else if (typeof skillData !== 'undefined' && skillData[skill]) sd = skillData[skill];
    if (typeof VERSION_MID !== 'undefined' && VERSION_MID[_v] && VERSION_MID[_v][skill]) midHtml = VERSION_MID[_v][skill];
    else { var el = document.querySelector('.mid-content[data-skill="'+skill+'"]'); if (el) midHtml = el.innerHTML; }
    var body = document.getElementById('adm-dw-body');
    body.innerHTML = '';
    var handled = false;
    if (typeof window.admEditorRender[skill]==='function') handled = window.admEditorRender[skill](sd, midHtml, body, _v);
    if (!handled) {
      window._admRenderHeroCard(sd, body);
      var msec = document.createElement('div');
      msec.innerHTML = '<div class="adm-section-label">Contenido Central (HTML)</div>';
      var mf = document.createElement('div');
      mf.className = 'adm-field';
      mf.innerHTML = '<label>HTML del panel</label><textarea data-key="midHtml" rows="10">'+midHtml.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</textarea>';
      msec.appendChild(mf);
      body.appendChild(msec);
    }
    document.getElementById('adm-overlay').classList.add('open');
    document.getElementById('adm-drawer').classList.add('open');
  };

  window.admCloseDrawer = function () {
    document.getElementById('adm-overlay').classList.remove('open');
    document.getElementById('adm-drawer').classList.remove('open');
    _skill = null;
  };

  window.admSaveDrawer = function () {
    if (!_skill) return;
    if (typeof window.admEditorSave[_skill]==='function') { window.admEditorSave[_skill](_v, _skill, fixIframes); return; }
    var heroData = {};
    document.querySelectorAll('#adm-dw-body input[data-key]').forEach(function (inp) {
      var k = inp.dataset.key;
      if (['yt_id','yt_start','yt_end'].indexOf(k)!==-1) return;
      heroData[k] = k==='opts' ? inp.value.split('|').map(function(s){return s.trim();}) : inp.value;
    });
    var midTa = document.querySelector('#adm-dw-body textarea[data-key="midHtml"]');
    var midHtml = midTa ? midTa.value : '';
    if (typeof VERSION_SD!=='undefined') { if (!VERSION_SD[_v]) VERSION_SD[_v]={}; VERSION_SD[_v][_skill]=Object.assign(VERSION_SD[_v][_skill]||{},heroData); }
    if (typeof VERSION_MID!=='undefined') { if (!VERSION_MID[_v]) VERSION_MID[_v]={}; VERSION_MID[_v][_skill]=midHtml; }
    var el = document.querySelector('.mid-content[data-skill="'+_skill+'"]');
    if (el) { el.innerHTML = midHtml; fixIframes(el); }
    if (typeof applyVersion==='function') applyVersion(_v);
    window.admCloseDrawer();
    window.admShowToast('Cambios aplicados V'+_v+' '+_skill);
  };

  window.admPreview = function () {
    window.admShowToast('Abriendo preview...');
    window.open('https://sergiosaacx.github.io/aura-languages/examen-ascenso.html','_blank');
  };

  window.admPublish = function () {
    var lang = (document.getElementById('adm-lang')||{}).value||'en';
    var ranks = ['bronce','plata','oro','platino','diamante','challenger'];
    var payload = {
      section: 'full',
      rank: ranks[_v]||'diamante',
      language: lang,
      content: JSON.stringify({version:_v, sd:(typeof VERSION_SD!=='undefined')?VERSION_SD[_v]:{}, mid:(typeof VERSION_MID!=='undefined')?VERSION_MID[_v]:{}}),
      active: true
    };
    if (typeof window.auraSupabase!=='undefined' && window.auraSupabase) {
      window.auraSupabase.from('exam_content').upsert(payload,{onConflict:'section,rank,language'})
        .then(function(r){ window.admShowToast(r.error?'Error: '+r.error.message:'Publicado V'+_v+' '+lang.toUpperCase()); });
    } else {
      navigator.clipboard.writeText(JSON.stringify(payload,null,2))
        .then(function(){ window.admShowToast('JSON copiado'); })
        .catch(function(){ window.admShowToast('Sin Supabase'); });
    }
  };

  window.admShowToast = function (msg) {
    var t = document.getElementById('adm-toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._tid);
    t._tid = setTimeout(function(){ t.classList.remove('show'); }, 2800);
  };

  function initAdmin() { admAddEditBtns(); window.admSetVersion(1); }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', initAdmin);
  else initAdmin();

})();

/* ════════════════════════════════════════════════════════════════
   examen-reading-engine.js
   Motor de lectura para el examen de ascenso.
   · Carga pool desde Supabase (content_type='reading_text')
   · Shuffle sin repetir: todos aparecen antes de volver a empezar
   · Renderiza texto + panel V/F en .mid-content[data-skill="read"]
   · Actualiza la hero card (skillData['read'])
   ════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var RANK_MAP  = {1:'bronce',2:'plata',3:'oro',4:'platino',5:'diamante',6:'challenger'};
var RANK_LVL  = {bronce:'A1',plata:'A2',oro:'B1',platino:'B2',diamante:'C1',challenger:'C2'};
var RANK_ORD  = {bronce:1,plata:2,oro:3,platino:4,diamante:5,challenger:6};

var _pool=[], _currentRank='bronce', _currentLang='en', _currentVersion=1;

/* ─── Helpers ─── */
function _sb(){
  if(window._aura&&window._aura.sb) return window._aura.sb;
  if(window.auraSupabase) return window.auraSupabase;
  return null;
}
function _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function _shuffle(a){
  var b=a.slice();
  for(var i=b.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=b[i];b[i]=b[j];b[j]=t; }
  return b;
}

/* ─── Shuffle queue sin repetir ─── */
function _qKey(rank,lang){ return 'aura_read_seq_'+rank+'_'+lang; }

function _pickNext(poolLen, rank, lang){
  if(poolLen<=0) return 0;
  if(poolLen===1) return 0;
  var key=_qKey(rank,lang), queue=[];
  try{ queue=JSON.parse(localStorage.getItem(key)||'[]'); }catch(e){ queue=[]; }
  queue=queue.filter(function(i){ return i>=0&&i<poolLen; });
  if(!queue.length){ var all=[]; for(var i=0;i<poolLen;i++) all.push(i); queue=_shuffle(all); }
  var chosen=queue.shift();
  try{ localStorage.setItem(key,JSON.stringify(queue)); }catch(e){}
  return chosen;
}

/* ─── Cargar pool desde Supabase ─── */
async function _loadPool(rank,lang){
  _pool=[];
  var sb=_sb(); if(!sb) return;
  var res=await sb.from('exam_content').select('*')
    .eq('section','reading').eq('content_type','reading_text')
    .eq('rank',rank).eq('language',lang).eq('active',true);
  if(res.error){ console.warn('[ExamReading]',res.error); return; }
  (res.data||[]).forEach(function(row){
    var c=row.content;
    if(typeof c==='string'){try{c=JSON.parse(c);}catch(e){c={};}}
    if(c&&c.title) _pool.push(c);
  });
}

/* ─── HTML del panel de texto ─── */
function _textPanel(item){
  var paras=(item.body||'').split(/\n\s*\n/).map(function(s){return s.trim();}).filter(Boolean);
  var pH=paras.map(function(p){ return '<p>'+_esc(p)+'</p>'; }).join('');
  return '<div class="exam-panel" style="--c:167,139,250;">'+
    '<header class="ep-h"><span class="ep-tag">lectura · '+_esc(item.title)+'</span>'+
    '<span class="ep-count">texto de lectura</span></header>'+
    '<article class="read-article"><h3>'+_esc(item.title)+'</h3>'+
    '<div class="read-body">'+pH+'</div></article></div>';
}

/* ─── HTML del panel V/F ─── */
function _tfPanel(item, rank){
  if(!item.tf||!item.tf.length) return '';
  var useNM=(RANK_ORD[rank]||1)>=3;
  var tag=useNM?'verdadero / falso / no mencionado':'verdadero / falso';
  var lis=item.tf.map(function(t){
    var stmt=_esc(t.statement||'');
    return '<li><span class="tf-stmt">'+stmt+'</span>'+
      '<div class="tf-btns">'+
      '<button class="tf-btn" data-answer="V">V</button>'+
      '<button class="tf-btn" data-answer="F">F</button>'+
      (useNM?'<button class="tf-btn" data-answer="NM">NM</button>':'')+
      '</div></li>';
  }).join('');
  return '<div class="exam-panel" style="--c:167,139,250;">'+
    '<header class="ep-h"><span class="ep-tag">tarea 2 · '+tag+'</span>'+
    '<span class="ep-count">'+item.tf.length+' afirmaciones</span></header>'+
    '<ul class="tf-list">'+lis+'</ul></div>';
}

/* ─── Actualizar hero card ─── */
function _updateHero(item, rank, version){
  var wc=(item.body||'').trim().split(/\s+/).filter(Boolean).length;
  var lvl=RANK_LVL[rank]||'A1';
  var sd={};
  if(typeof skillData!=='undefined'&&skillData['read']) sd=JSON.parse(JSON.stringify(skillData['read']));
  sd.word=item.title||'Reading'; sd.ipa='texto · '+wc+' palabras · '+lvl;
  sd.chip='1 texto'; sd.rating=lvl;
  if(item.mc){
    if(item.mc.question) sd.qLabel=item.mc.question;
    if(item.mc.options&&item.mc.options.length===4&&item.mc.answer){
      sd.opts=item.mc.options.map(function(t,i){
        var l=['A','B','C','D'][i]; var o={l:l,t:t}; if(l===item.mc.answer) o.sel=true; return o;
      });
    }
  }
  if(typeof skillData!=='undefined') skillData['read']=sd;
  if(typeof applySkill==='function') applySkill('read');
}

/* ─── Punto de entrada público ─── */
window.initExamReading = async function(opts){
  opts=opts||{};
  _currentVersion  = opts.version||1;
  _currentRank     = opts.rank||RANK_MAP[_currentVersion]||'bronce';
  _currentLang     = opts.lang||(typeof localStorage!=='undefined'&&localStorage.getItem('aura_lang'))||'en';

  var container=document.querySelector('.mid-content[data-skill="read"]');
  if(!container) return;

  // Limpiar hero card inmediatamente — evita flash de contenido hardcodeado
  if(typeof skillData!=='undefined'&&skillData['read']){
    skillData['read'].word='…';
    skillData['read'].ipa='cargando texto…';
    skillData['read'].chip='';
  }
  if(typeof applySkill==='function') applySkill('read');

  container.innerHTML='<div style="font-size:12px;color:#a78bfa;text-align:center;padding:32px;opacity:.6;">Cargando texto…</div>';

  await _loadPool(_currentRank,_currentLang);

  if(!_pool.length){
    // Fallback al HTML estático de VERSION_MID
    if(typeof VERSION_MID!=='undefined'&&VERSION_MID[_currentVersion]&&VERSION_MID[_currentVersion]['read']){
      container.innerHTML=VERSION_MID[_currentVersion]['read'];
    } else {
      container.innerHTML='<div style="font-size:12px;color:#a78bfa;text-align:center;padding:32px;">Sin textos en el pool · agrega al menos uno.</div>';
    }
    // Restaurar botón ✏ Editar también en el fallback
    if(typeof window.admAddEditBtns==='function') setTimeout(window.admAddEditBtns, 0);
    return;
  }

  var idx=_pickNext(_pool.length,_currentRank,_currentLang);
  var item=_pool[idx];
  container.innerHTML=_textPanel(item)+_tfPanel(item,_currentRank);
  _updateHero(item,_currentRank,_currentVersion);
  // Restaurar botón ✏ Editar (innerHTML lo elimina)
  if(typeof window.admAddEditBtns==='function') setTimeout(window.admAddEditBtns, 0);
};

})();

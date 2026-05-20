/* ============================================================
   admin-examen.js — Solo lógica modal + Supabase
   El HTML del examen ya está embebido en admin.html
   ============================================================ */
(function(){
'use strict';
var _sb;
var _editId = null;

// initExamen: solo guarda referencia a Supabase
window.initExamen = function(sb){
  _sb = sb;
  // Cargar conteo desde BD al abrir tab
  setTimeout(exLoadFromDB, 300);
};

window.exCargar = function(){ exLoadFromDB(); };

window.exLoadFromDB = function(){
  if(!_sb) return;
  var rank = (document.getElementById('ex-rank')||{}).value || 'bronce';
  var lang = (document.getElementById('ex-lang')||{}).value || 'en';
  var status = document.getElementById('ex-db-status');
  if(status) status.textContent = 'Consultando BD...';
  _sb.from('exam_content')
    .select('id,section', {count:'exact'})
    .eq('rank', rank).eq('language', lang)
    .then(function(res){
      var count = (res && res.data) ? res.data.length : 0;
      if(status) status.textContent = count + ' en BD · mostrando plantilla';
    });
};

window.exOpenNew = function(section){
  _editId = null;
  document.getElementById('ex-modal-title').textContent = 'Nueva pregunta · ' + section;
  var sel = document.getElementById('ex-m-section'); if(sel) sel.value = section;
  var r = document.getElementById('ex-rank'); var mr = document.getElementById('ex-m-rank');
  if(r && mr) mr.value = r.value;
  var l = document.getElementById('ex-lang'); var ml = document.getElementById('ex-m-lang');
  if(l && ml) ml.value = l.value;
  var t = document.getElementById('ex-m-type'); if(t) t.value = '';
  var d = document.getElementById('ex-m-diff'); if(d) d.value = '3';
  var a = document.getElementById('ex-m-active'); if(a) a.checked = true;
  var j = document.getElementById('ex-m-json'); if(j) j.value = '{}';
  var del = document.getElementById('ex-btn-del'); if(del) del.style.display = 'none';
  document.getElementById('ex-modal').style.display = 'flex';
};

window.exOpenEdit = function(section, btn){
  exOpenNew(section);
  document.getElementById('ex-modal-title').textContent = 'Editar · ' + section;
  var del = document.getElementById('ex-btn-del'); if(del) del.style.display = 'inline-block';
};

window.exCloseModal = function(){
  document.getElementById('ex-modal').style.display = 'none';
  _editId = null;
};

window.exSave = function(){
  if(!_sb){ exToast('❌ Sin conexión Supabase'); return; }
  var section = document.getElementById('ex-m-section').value;
  var rank    = document.getElementById('ex-m-rank').value;
  var lang    = document.getElementById('ex-m-lang').value;
  var type    = document.getElementById('ex-m-type').value.trim();
  var diff    = parseInt(document.getElementById('ex-m-diff').value) || 3;
  var active  = document.getElementById('ex-m-active').checked;
  var jsonRaw = document.getElementById('ex-m-json').value;
  var content = {};
  try { content = JSON.parse(jsonRaw); } catch(e){ exToast('❌ JSON inválido'); return; }
  var row = {section:section, rank:rank, language:lang, content_type:type, content:content, difficulty:diff, active:active};
  var p = _editId
    ? _sb.from('exam_content').update(row).eq('id', _editId)
    : _sb.from('exam_content').insert(row);
  p.then(function(res){
    if(res.error){ exToast('❌ ' + res.error.message); }
    else { exCloseModal(); exToast('✓ Guardado'); exLoadFromDB(); }
  });
};

window.exDeleteCurrent = function(){
  if(!_editId || !_sb){ exToast('Sin ID'); return; }
  if(!confirm('¿Eliminar esta pregunta?')) return;
  _sb.from('exam_content').delete().eq('id', _editId).then(function(res){
    if(res.error) exToast('❌ ' + res.error.message);
    else { exCloseModal(); exToast('✓ Eliminado'); exLoadFromDB(); }
  });
};

window.exToast = function(msg){
  var t = document.getElementById('ex-toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); }, 2800);
};

})();

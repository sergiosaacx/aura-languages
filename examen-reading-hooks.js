/* ══════════════════════════════════════════════════════════════════
   ⚠️  ARCHIVO APROBADO — NO MODIFICAR SIN INSTRUCCIÓN EXPLÍCITA
   ══════════════════════════════════════════════════════════════════
   examen-reading-hooks.js
   Hooks de Reading para examen-ascenso.html — archivo SEPARADO
   para que los cambios en otras pestañas no destruyan Reading.

   CÓMO FUNCIONA:
   · Todo vía event delegation en document — sobrevive a cualquier
     reemplazo del HTML interior de examen-ascenso.html
   · Envuelve window.applyVersion para evitar flash de contenido
     hardcodeado y llamar initExamReading al cambiar versión
   · El único requisito en examen-ascenso.html es este script tag

   PROTEGIDO: no tocar sin instrucción de Sergio.
   ══════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

/* ── CSS ─────────────────────────────────────────────────────── */
(function(){
  if(document.getElementById('rh-css')) return;
  var s = document.createElement('style');
  s.id = 'rh-css';
  s.textContent =
    '.exam-panel.tf-locked{opacity:.32;pointer-events:none;filter:saturate(.15);transition:opacity .35s,filter .35s;}' +
    '.exam-panel.tf-locked .tf-btn{cursor:not-allowed;}' +
    '.tf-btn.vc-correct,.tf-btn.vc-correct:hover{background:#22c55e!important;border-color:#22c55e!important;color:#0a0a0a!important;box-shadow:0 0 0 3px rgba(34,197,94,.25)!important;}' +
    '.tf-btn.vc-correct.selected::after{content:" ✓";font-size:10px;font-weight:700;}' +
    '.tf-btn.vc-wrong,.tf-btn.vc-wrong:hover{background:#ef4444!important;border-color:#ef4444!important;color:#fff!important;box-shadow:0 0 0 3px rgba(239,68,68,.25)!important;}' +
    '.tf-btn.vc-wrong.selected::after{content:" ✗";font-size:10px;font-weight:700;}';
  (document.head || document.documentElement).appendChild(s);
})();

/* ── Helpers ─────────────────────────────────────────────────── */
function _activeSkill(){
  var t = document.querySelector('.tab.active[data-skill]');
  return t ? t.dataset.skill : null;
}
function _getRank(){
  return (typeof getCurrentRank === 'function')
    ? getCurrentRank()
    : (document.body.dataset.examRank || 'bronce');
}
function _getLang(){
  return (typeof localStorage !== 'undefined' && localStorage.getItem('aura_lang')) || 'en';
}

/* Debounce para evitar doble llamada si examen-ascenso.html
   también tiene el hook (ambos conviven sin problema) */
var _lastReadInit = 0;
function _callInitReading(){
  var now = Date.now();
  if(now - _lastReadInit < 600) return;
  _lastReadInit = now;
  if(typeof window.initExamReading === 'function'){
    window.initExamReading({rank: _getRank(), lang: _getLang()});
  }
}

/* ── 1. tf-btn evaluation — delegation ──────────────────────── */
document.addEventListener('click', function(e){
  var tf = e.target.closest('.tf-btn');
  if(!tf) return;
  var tfBtns = tf.closest('.tf-btns');
  if(!tfBtns || tfBtns.dataset.answered) return;
  tfBtns.dataset.answered = '1';
  tfBtns.querySelectorAll('.tf-btn').forEach(function(b){
    b.style.pointerEvents = 'none';
    b.classList.remove('selected');
    if(b.dataset.correct === '1') b.classList.add('vc-correct');
  });
  if(tf.dataset.correct !== '1') tf.classList.add('vc-wrong');
  else tf.classList.add('vc-correct');
  tf.classList.add('selected');
  if(window.AuraRightPanel) AuraRightPanel.recordAnswer(tf.dataset.correct === '1');
}, false);

/* ── 2. MC 'read' evaluation — delegation ────────────────────── */
document.addEventListener('click', function(e){
  if(_activeSkill() !== 'read') return;
  var btn = e.target.closest('.hc-opt');
  if(!btn) return;
  var container = btn.parentElement;
  if(!container || container.dataset.answered) return;
  container.dataset.answered = '1';
  container.querySelectorAll('.hc-opt').forEach(function(o){
    o.style.pointerEvents = 'none';
    if(o.dataset.correct === '1') o.classList.add('vc-correct');
  });
  if(btn.dataset.correct !== '1') btn.classList.add('vc-wrong');
  if(window.AuraRightPanel) AuraRightPanel.recordAnswer(btn.dataset.correct === '1');
  var tfPanel = document.querySelector('.mid-content[data-skill="read"] .exam-panel.tf-locked');
  if(tfPanel) tfPanel.classList.remove('tf-locked');
}, false);

/* ── 3. Tab click — initExamReading + switchSkill ────────────── */
document.addEventListener('click', function(e){
  var tab = e.target.closest('.tab[data-skill]');
  if(!tab) return;
  var skill = tab.dataset.skill;
  if(window.AuraRightPanel && AuraRightPanel.switchSkill) AuraRightPanel.switchSkill(skill);
  if(skill === 'read') setTimeout(_callInitReading, 120);
}, false);

/* ── 4. Envolver applyVersion ────────────────────────────────── */
function _patchApplyVersion(){
  var _orig = window.applyVersion;
  if(typeof _orig !== 'function' || _orig._rhPatched) return;
  window.applyVersion = function(v){
    /* Ocultar temporalmente VERSION_MID['read'] para evitar flash
       de contenido hardcodeado — initExamReading lo reemplaza */
    var _saved;
    if(typeof VERSION_MID !== 'undefined' && VERSION_MID[v]){
      _saved = VERSION_MID[v]['read'];
      if(_saved !== undefined) delete VERSION_MID[v]['read'];
    }
    _orig(v);
    if(typeof VERSION_MID !== 'undefined' && VERSION_MID[v] && _saved !== undefined){
      VERSION_MID[v]['read'] = _saved;
    }
    if(_activeSkill() === 'read') setTimeout(_callInitReading, 150);
  };
  window.applyVersion._rhPatched = true;
}

/* Intentar ahora (script está al final del body, applyVersion ya definida) */
_patchApplyVersion();
/* Fallback por si acaso */
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', _patchApplyVersion);
}

})();

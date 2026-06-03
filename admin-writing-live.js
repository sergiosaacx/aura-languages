/* admin-writing-live.js v3 — writing real en el editor, idéntico a la vista previa

   Dos problemas que corrige:
   1. "Sin textos disponibles": el pool de writing está en exam_content con
      section='write' (no 'full'). El editor solo carga 'full' y nunca
      encontraba el pool. Este script lo carga por separado.
   2. Hero card visible en Writing: el examen usa body.write-active para
      ocultarlo. Este script inyecta el CSS y alterna la clase igual que
      examen-shell.js. */

(function () {
  'use strict';

  /* ── CSS: write-active oculta el hero card (igual que examen.css) ── */
  if (!document.getElementById('awl-css')) {
    var _s = document.createElement('style');
    _s.id = 'awl-css';
    _s.textContent =
      'body.write-active .hero-card{display:none!important;}' +
      'body.write-active .gallery{grid-template-columns:1.6fr .85fr!important;}';
    (document.head || document.documentElement).appendChild(_s);
  }

  /* ── Helpers ── */
  var RANKS = { 1:'bronce', 2:'plata', 3:'oro', 4:'platino', 5:'diamante' };

  function _getV() {
    return typeof window._admGetV === 'function' ? window._admGetV() : 1;
  }
  function _getLang() {
    return (document.getElementById('adm-lang') || {}).value
        || localStorage.getItem('aura_lang') || 'en';
  }
  function _getSb() {
    return (window._aura && window._aura.sb) || window.auraSupabase || null;
  }

  /* ── Cargar pool desde exam_content section='write' ──
     El pool es un array [{html:"...fill-in-blanks..."}] publicado
     por el admin desde el drawer de Writing. */
  async function _loadWritePool(v) {
    var sb = _getSb();
    if (!sb) return false;
    var rank = RANKS[v] || 'diamante';
    var lang = _getLang();
    try {
      var res = await sb.from('exam_content').select('content')
        .eq('section', 'write').eq('rank', rank).eq('language', lang).eq('active', true)
        .single();
      if (res.error || !res.data) return false;
      var c = res.data.cont
/* admin-writing-live.js v4
   Hace que Writing en el editor se vea idéntico a la vista previa:
   1. Oculta el hero card (display:none directo, igual que examen)
   2. Expande el área central a 2 columnas (quita columna izquierda)
   3. Carga el pool de ejercicios desde exam_content section='write' */

(function () {
  'use strict';

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

  /* ── Ocultar hero card y expandir layout (igual que examen con write-active) ── */
  function _enterWriteMode() {
    var hero = document.querySelector('.hero-card');
    if (hero) hero.style.setProperty('display', 'none', 'important');
    var gallery = document.querySelector('.gallery');
    if (gallery) gallery.style.setProperty('grid-template-columns', '1.6fr .85fr', 'important');
  }

  /* ── Restaurar hero card y layout normal al salir de Writing ── */
  function _exitWriteMode() {
    var hero = document.querySelector('.hero-card');
    if (hero) hero.style.removeProperty('display');
    var gallery = document.querySelector('.gallery');
    if (gallery) gallery.style.removeProperty('grid-template-columns');
  }

  /* ── Cargar pool desde exam_content section='write' ──
     El pool es [{html:"...fill-in-blanks..."}] publicado por el admin.
     El examen lo carga con _loadPublishedContent (in 'write' section). */
  async function _loadWritePool(v) {
    var sb = _getSb();
    if (!sb) { console.warn('[writing-live] Sin Supabase'); return false; }
    var rank = RANKS[v] || 'diamante';
    var lang = _getLang();
    try {
      var res = await sb.from('exam_content').select('content')
        .eq(
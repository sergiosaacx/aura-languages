/* admin-editor-listen.js — editor de la pestaña Listening
   Delega al sistema de pools ya existente en admin-examen-editor-pool.js.
   Para cambiar cómo se edita Listening, solo toca este archivo.
   ─────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  window.admEditorRender = window.admEditorRender || {};
  window.admEditorSave   = window.admEditorSave   || {};

  /* Render: delega a admRenderListeningPools (definido en admin-examen-editor-pool.js) */
  window.admEditorRender.listen = function (sd, midHtml, body, v) {
    var lang = (document.getElementById('adm-lang') || {}).value || 'en';
    if (typeof window.admRenderListeningPools === 'function') {
      window.admRenderListeningPools(sd, v, lang);
    } else {
      body.innerHTML = '<p style="color:rgba(255,255,255,.4);padding:16px;">Pool de Listening no disponible.</p>';
    }
    return true; // handled — el pool abre el drawer por su cuenta
  };

  /* Save: delega a admSaveListeningPools */
  window.admEditorSave.listen = function (v, skill, fixIframes) {
    var lang = (document.getElementById('adm-lang') || {}).value || 'en';
    if (typeof window.admSaveListeningPools === 'function') {
      window.admSaveListeningPools(v, lang);
    }
  };

})();

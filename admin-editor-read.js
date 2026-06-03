/* admin-editor-read.js — editor de la pestaña Reading
   Render: muestra Hero Card + campos de Título y Texto del artículo.
   Save: reconstruye el HTML del panel de lectura y actualiza VERSION_MID.
   Para cambiar cómo se edita Reading, solo toca este archivo.
   ─────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  window.admEditorRender = window.admEditorRender || {};
  window.admEditorSave   = window.admEditorSave   || {};

  /* Render */
  window.admEditorRender.read = function (sd, midHtml, body, v) {
    // Hero Card compartido
    if (typeof window._admRenderHeroCard === 'function') {
      window._admRenderHeroCard(sd, body);
    }

    // Extraer título y párrafos del HTML actual
    var tmp    = document.createElement('div');
    tmp.innerHTML = midHtml;
    var h3     = tmp.querySelector('.read-article h3');
    var bodyPs = tmp.querySelectorAll('.read-body p');
    var titleVal = h3 ? h3.textContent.trim() : '';
    var bodyVal  = Array.from(bodyPs).map(function (p) { return p.textContent.trim(); }).join('\n\n');

    // Sección de contenido de lectura
    var rsec = document.createElement('div');
    rsec.innerHTML = '<div class="adm-section-label">Contenido de lectura</div>';

    var titleF = document.createElement('div');
    titleF.className = 'adm-field';
    titleF.innerHTML = '<label>Título del artículo</label>' +
      '<input type="text" data-key="read_title" value="' + titleVal.replace(/"/g, '&quot;') + '">';
    rsec.appendChild(titleF);

    var bodyF = document.createElement('div');
    bodyF.className = 'adm-field';
    bodyF.innerHTML = '<label>Texto (separa párrafos con una línea en blanco)</label>' +
      '<textarea data-key="read_body" rows="14" placeholder="Escribe el texto del artículo aquí...">' +
      bodyVal.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</textarea>';
    rsec.appendChild(bodyF);

    body.appendChild(rsec);
    return true; // handled
  };

  /* Save */
  window.admEditorSave.read = function (v, skill, fixIframes) {
    var rtitle = (document.querySelector('#adm-dw-body input[data-key="read_title"]')?.value || '').trim();
    var rbody  = (document.querySelector('#adm-dw-body textarea[data-key="read_body"]')?.value || '').trim();

    // Reconstruir HTML del artículo
    var paras     = rbody.split(/\n\s*\n/).map(function (s) { return s.trim(); }).filter(Boolean);
    var parasHtml = paras.map(function (p) {
      return '<p>' + p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</p>';
    }).join('');
    var articleHtml =
      '<div class="exam-panel" style="--c:167,139,250;">' +
        '<header class="ep-h">' +
          '<span class="ep-tag">lectura · ' + rtitle + '</span>' +
          '<span class="ep-count">texto de lectura</span>' +
        '</header>' +
        '<article class="read-article">' +
          '<h3>' + rtitle + '</h3>' +
          '<div class="read-body">' + parasHtml + '</div>' +
        '</article>' +
      '</div>';

    // Preservar el panel de T/F que sigue al artículo
    var existingMid = '';
    if (typeof VERSION_MID !== 'undefined' && VERSION_MID[v] && VERSION_MID[v]['read']) {
      existingMid = VERSION_MID[v]['read'];
    } else {
      var elr = document.querySelector('.mid-content[data-skill="read"]');
      if (elr) existingMid = elr.innerHTML;
    }
    var tmp2     = document.createElement('div');
    tmp2.innerHTML = existingMid;
    var tfPanels  = tmp2.querySelectorAll('.exam-panel');
    var tfHtml    = tfPanels.length > 1 ? tfPanels[1].outerHTML : '';
    var midHtmlR  = articleHtml + tfHtml;

    // Guardar en VERSION_MID y actualizar DOM
    if (typeof VERSION_MID !== 'undefined') {
      if (!VERSION_MID[v]) VERSION_MID[v] = {};
      VERSION_MID[v]['read'] = midHtmlR;
    }
    var elrd = document.querySelector('.mid-content[data-skill="read"]');
    if (elrd) {
      elrd.innerHTML = midHtmlR;
      if (typeof fixIframes === 'function') fixIframes(elrd);
    }
    if (typeof applyVersion === 'function') applyVersion(v);
    if (typeof window.admCloseDrawer  === 'function') window.admCloseDrawer();
    if (typeof window.admShowToast    === 'function') window.admShowToast('✓ Cambios aplicados · V' + v + ' · reading');
  };

})();

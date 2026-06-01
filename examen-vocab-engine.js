/* ══════════════════════════════════════════════════════════════════
   ⚠️  ARCHIVO APROBADO — NO MODIFICAR SIN INSTRUCCIÓN EXPLÍCITA
   ══════════════════════════════════════════════════════════════════
   La pestaña Vocabulary del examen de ascenso fue revisada y aprobada
   en junio 2026. Este motor está funcionando correctamente.

   PROTEGIDO:
   · _renderVocabWord — hero card (patrón Reading: skillData + applySkill)
   · vtask1 y vtask2 siempre limpian antes de renderizar (sin cruce de datos)
   · _loadVocabSession — carga pool desde Supabase, shuffle, pick 5
   · _vocabAdvanceWord — avance entre palabras del pool
   · skillData['vocab'] siempre actualizado con la palabra actual

   La lógica real está en examen-ascenso.html (sección vocab engine).
   Este archivo solo define el hook vacío para no causar errores.
   Si necesitas modificar algo, confirma primero con Sergio.
   ══════════════════════════════════════════════════════════════════ */
/* examen-vocab-engine.js v12
   El sistema _loadVocabSession → _renderVocabWord → _vocabAdvanceWord
   en examen-ascenso.html maneja todo el flujo de vocab.
   Este archivo solo define el hook vacío para no causar errores. */
(function(){
  window.initExamVocab = function(){ /* no-op: handled by _loadVocabSession in HTML */ };
})();

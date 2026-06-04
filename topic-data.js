/* ═══════════════════════════════════════════════════════════════
   topic-data.js — Registro de temas y juegos  |  Aura Languages
   ═══════════════════════════════════════════════════════════════
   TOMACORRIENTE — no modificar este archivo directamente.
   Los juegos viven en topic-data-NNN.js (350 archivos, 1 por juego)
   y se registran con: _registerGames(juegoId, [...actividades])
   ═══════════════════════════════════════════════════════════════ */

/* ── Registro central ────────────────────────────────────────── */
var _GAMES_REGISTRY = {};

/* Formato: _registerGames(id, 'Título del Juego', [actividades]) */
function _registerGames(juegoId, titulo, actividades) {
  _GAMES_REGISTRY[juegoId] = { titulo: titulo, actividades: actividades };
}

function getGames(id) {
  var entry = _GAMES_REGISTRY[id];
  return entry ? entry.actividades : null;
}

function getJuegoTitle(id) {
  var entry = _GAMES_REGISTRY[id];
  return entry ? entry.titulo : null;
}

/* ── Cargador dinámico ───────────────────────────────────────── */
function _loadJuego(num, cb) {
  if (_GAMES_REGISTRY.hasOwnProperty(num)) { cb(); return; }
  var s = document.createElement('script');
  s.src = 'topic-data-' + String(num).padStart(3,'0') + '.js?v=1';
  s.onload = cb;
  s.onerror = function() { _GAMES_REGISTRY[num] = null; cb(); };
  document.head.appendChild(s);
}

function loadTarjetaJuegos(tarjetaId, cb) {
  var start = (tarjetaId - 1) * 7 + 1;
  var nums = [];
  for (var i = start; i < start + 7; i++) nums.push(i);
  var idx = 0;
  function next() {
    if (idx >= nums.length) { cb(); return; }
    _loadJuego(nums[idx++], next);
  }
  next();
}

function getJuegosForTarjeta(tarjetaId) {
  var start = (tarjetaId - 1) * 7 + 1;
  var result = [];
  for (var i = start; i < start + 7; i++) {
    result.push({ num: i, data: _GAMES_REGISTRY.hasOwnProperty(i) ? _GAMES_REGISTRY[i] : undefined });
  }
  return result;
}

/* ── Lista de juegos disponibles (se amplía con cada enchufe) ── */
var TOPICS=[
  /* ── TARJETA 1 — THE IDENTITY CODE ── */
  {id:1,rank:'Bronce',cefr:'A1',language:'en',title:'Pronombres Sujeto · Reconocimiento',cat:'Grammar · Pronombres',sub:'The Identity Code',img:IMG('diverse silhouettes of faces identity characters dark background'),xp:175,steps:7},
  {id:2,rank:'Bronce',cefr:'A1',language:'en',title:'Pronombres Sujeto · En Contexto',cat:'Grammar · Pronombres',sub:'The Identity Code',img:IMG('diverse silhouettes of faces identity characters dark background'),xp:175,steps:7},
  {id:3,rank:'Bronce',cefr:'A1',language:'en',title:'Pronombres Objeto · Reconocimiento',cat:'Grammar · Pronombres',sub:'The Identity Code',img:IMG('diverse silhouettes of faces identity characters dark background'),xp:175,steps:7},
  {id:4,rank:'Bronce',cefr:'A1',language:'en',title:'Sujeto vs Objeto · Diferenciación',cat:'Grammar · Pronombres',sub:'The Identity Code',img:IMG('diverse silhouettes of faces identity characters dark background'),xp:175,steps:7},
  {id:5,rank:'Bronce',cefr:'A1',language:'en',title:'Pronombres Sujeto · En Oraciones',cat:'Grammar · Pronombres',sub:'The Identity Code',img:IMG('diverse silhouettes of faces identity characters dark background'),xp:175,steps:7},
  {id:6,rank:'Bronce',cefr:'A1',language:'en',title:'Pronombres Objeto · En Contexto',cat:'Grammar · Pronombres',sub:'The Identity Code',img:IMG('diverse silhouettes of faces identity characters dark background'),xp:175,steps:7},
  {id:7,rank:'Bronce',cefr:'A1',language:'en',title:'Sujeto vs Objeto · Errores Típicos',cat:'Grammar · Pronombres',sub:'The Identity Code',img:IMG('diverse silhouettes of faces identity characters dark background'),xp:175,steps:7},
  /* ── TARJETA 2 — AM IS ARE ── */
  {id:8,rank:'Bronce',cefr:'A1',language:'en',title:'To Be Afirmativo · Conjugación',cat:'Grammar · Verbo To Be',sub:'Am, Is, Are',img:'https://image.pollinations.ai/prompt/to-be-verb-present-english-learning,vibrant,flat-design?width=400&height=220&nologo=true',xp:175,steps:7},
  {id:9,rank:'Bronce',cefr:'A1',language:'en',title:'To Be Afirmativo · Regla de Uso',cat:'Grammar · Verbo To Be',sub:'Am, Is, Are',img:'https://image.pollinations.ai/prompt/to-be-verb-present-english-learning,vibrant,flat-design?width=400&height=220&nologo=true',xp:175,steps:7},
  {id:10,rank:'Bronce',cefr:'A1',language:'en',title:'To Be Afirmativo · Pronombre-Verbo',cat:'Grammar · Verbo To Be',sub:'Am, Is, Are',img:'https://image.pollinations.ai/prompt/to-be-verb-present-english-learning,vibrant,flat-design?width=400&height=220&nologo=true',xp:175,steps:7},
  {id:11,rank:'Bronce',cefr:'A1',language:'en',title:"To Be Negativo · Isn't / Aren't",cat:'Grammar · Verbo To Be',sub:'Am, Is, Are',img:'https://image.pollinations.ai/prompt/to-be-verb-present-english-learning,vibrant,flat-design?width=400&height=220&nologo=true',xp:175,steps:7},
  {id:12,rank:'Bronce',cefr:'A1',language:'en',title:'To Be Afirmativo y Negativo · Estructura',cat:'Grammar · Verbo To Be',sub:'Am, Is, Are',img:'https://image.pollinations.ai/prompt/to-be-verb-present-english-learning,vibrant,flat-design?width=400&height=220&nologo=true',xp:175,steps:7},
  {id:13,rank:'Bronce',cefr:'A1',language:'en',title:'To Be Preguntas · Am I? / Is he?',cat:'Grammar · Verbo To Be',sub:'Am, Is, Are',img:'https://image.pollinations.ai/prompt/to-be-verb-present-english-learning,vibrant,flat-design?width=400&height=220&nologo=true',xp:175,steps:7},
  {id:14,rank:'Bronce',cefr:'A1',language:'en',title:'To Be · Errores Típicos',cat:'Grammar · Verbo To Be',sub:'Am, Is, Are',img:'https://image.pollinations.ai/prompt/to-be-verb-present-english-learning,vibrant,flat-design?width=400&height=220&nologo=true',xp:175,steps:7},
  /* ── TARJETA 3 — NAME THE WORLD ── */
  {id:15,rank:'Bronce',cefr:'A1',language:'en',title:'Sustantivos · Singular y Plural',cat:'Vocab · Sustantivos',sub:'Name the World',img:IMG('everyday objects labeled nouns vocabulary classroom bright colors'),xp:175,steps:7},
  {id:16,rank:'Bronce',cefr:'A1',language:'en',title:'This/That/These/Those · Regla de Uso',cat:'Vocab · Sustantivos',sub:'Name the World',img:IMG('everyday objects labeled nouns vocabulary classroom bright colors'),xp:175,steps:7},
  {id:17,rank:'Bronce',cefr:'A1',language:'en',title:'This/That/These/Those · Asociación',cat:'Vocab · Sustantivos',sub:'Name the World',img:IMG('everyday objects labeled nouns vocabulary classroom bright colors'),xp:175,steps:7},
  {id:18,rank:'Bronce',cefr:'A1',language:'en',title:'Plurales Regulares e Irregulares',cat:'Vocab · Sustantivos',sub:'Name the World',img:IMG('everyday objects labeled nouns vocabulary classroom bright colors'),xp:175,steps:7},
  {id:19,rank:'Bronce',cefr:'A1',language:'en',title:'There is / There are · Estructura',cat:'Vocab · Sustantivos',sub:'Name the World',img:IMG('everyday objects labeled nouns vocabulary classroom bright colors'),xp:175,steps:7},
  {id:20,rank:'Bronce',cefr:'A1',language:'en',title:'This/That/These/Those · En Contexto',cat:'Vocab · Sustantivos',sub:'Name the World',img:IMG('everyday objects labeled nouns vocabulary classroom bright colors'),xp:175,steps:7},
  {id:21,rank:'Bronce',cefr:'A1',language:'en',title:'Sustantivos y Determinantes · Errores Típicos',cat:'Vocab · Sustantivos',sub:'Name the World',img:IMG('everyday objects labeled nouns vocabulary classroom bright colors'),xp:175,steps:7},
  /* ── TARJETA 4 — A OR THE? ── */
  {id:22,rank:'Bronce',cefr:'A1',language:'en',title:'A vs An · Regla Fonética',cat:'Grammar · Artículos',sub:'A or The?',img:IMG('golden letters typography dark surface articles grammar'),xp:175,steps:7},
  {id:23,rank:'Bronce',cefr:'A1',language:'en',title:'A/An vs The · Primera Mención vs Conocida',cat:'Grammar · Artículos',sub:'A or The?',img:IMG('golden letters typography dark surface articles grammar'),xp:175,steps:7},
  {id:24,rank:'Bronce',cefr:'A1',language:'en',title:'Some y Any · Contextos de Uso',cat:'Grammar · Artículos',sub:'A or The?',img:IMG('golden letters typography dark surface articles grammar'),xp:175,steps:7},
  {id:25,rank:'Bronce',cefr:'A1',language:'en',title:'Zero Article · Sin Artículo',cat:'Grammar · Artículos',sub:'A or The?',img:IMG('golden letters typography dark surface articles grammar'),xp:175,steps:7},
];

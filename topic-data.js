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

/* ── Lista de tarjetas — 50 en total, una por unidad temática ── */
var TOPICS=[
  {id:1,rank:'Bronce',cefr:'A1',language:'en',
   title:'The Identity Code',cat:'Grammar · Pronombres',sub:'Personal Pronouns',
   img:IMG('diverse silhouettes of faces identity characters dark background'),xp:1225,steps:7},
  {id:2,rank:'Bronce',cefr:'A1',language:'en',
   title:'Am, Is, Are',cat:'Grammar · Verbo To Be',sub:'am / is / are',
   img:'https://image.pollinations.ai/prompt/to-be-verb-present-english-learning,vibrant,flat-design?width=400&height=220&nologo=true',xp:1225,steps:7},
  {id:3,rank:'Bronce',cefr:'A1',language:'en',
   title:'Name the World',cat:'Vocab · Sustantivos',sub:'Nouns & Determiners',
   img:IMG('everyday objects labeled vocabulary classroom colorful'),xp:1225,steps:7},
  {id:4,rank:'Bronce',cefr:'A1',language:'en',
   title:'A or The?',cat:'Grammar · Artículos',sub:'Articles',
   img:IMG('golden letters typography dark surface'),xp:1225,steps:7},
  {id:5,rank:'Bronce',cefr:'A1',language:'en',
   title:'Count the World',cat:'Vocab · Números',sub:'Numbers & Counting',
   img:IMG('floating numbers digits geometric'),xp:1225,steps:7},
  {id:6,rank:'Bronce',cefr:'A1',language:'en',
   title:'Mine & Yours',cat:'Grammar · Posesivos',sub:'Possessives',
   img:IMG('hands sharing objects possessives ownership'),xp:1225,steps:7},
  {id:7,rank:'Bronce',cefr:'A1',language:'en',
   title:'Color Your Words',cat:'Grammar · Adjetivos',sub:'Basic Adjectives',
   img:IMG('colorful paint splash dark background'),xp:1225,steps:7},
  {id:8,rank:'Bronce',cefr:'A1',language:'en',
   title:'Daily Habits',cat:'Grammar · Presente Simple',sub:'Present Simple',
   img:IMG('morning routine coffee book'),xp:1225,steps:7},
  {id:9,rank:'Bronce',cefr:'A1',language:'en',
   title:'Here & There',cat:'Grammar · Preposiciones',sub:'Prepositions of Place',
   img:IMG('compass map navigation location'),xp:1225,steps:7},
  {id:10,rank:'Bronce',cefr:'A1',language:'en',
   title:'Ask Away',cat:'Grammar · Preguntas WH',sub:'WH Questions',
   img:IMG('neon question mark glowing dark'),xp:1225,steps:7},
];

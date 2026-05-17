// ── MOVIES DATA — datos de películas + carga desde Supabase/JSON ─────────────

// ── DATOS POR PELÍCULA ────────────────────────────────────────────────────
var MOVIES_FALLBACK = {
  '6tvW_gVcidg': {
    _peliculaSlug: 'incredibles-2',
    studio: 'Pixar Animation Studios',
    titleMain: 'INCREDIBLES',
    titleSub: '2',
    badges: [{ text:'PG', accent:true }, { text:'HD' }, { text:'CC' }, { text:'KARAOKE', accent:true }],
    meta: '2018 · 1h 58m · Infantil · Acción',
    desc: 'La familia Parr lucha por recuperar la confianza pública en los superhéroes. Mientras Elastigirl es reclutada para una misión, Mr. Incredible se queda en casa.',
    start: 0, end: 199,
    phrase: "You will kid. You will.",
    speaker: 'Rick Dicker',
    wordBank: ['UNDERMINER','ILLEGAL','PERIMETER','SUPERHEROES','FORGET'],
    breadcrumb: 'incredibles 2',
    hasKaraoke: true,
    dataUrl: 'data/movies/incredibles-2/escena-1.json',
    scenes: [
      { tm: 'ahora', line: '"Behold the Underminer!"', tag: 'acción · apertura' },
      { tm: '1:01', line: '"State your name, please."', tag: 'drama · interrogación' },
      { tm: '3:08', line: '"You will, kid. You will."', tag: 'drama · cierre' }
    ]
  },
  'Lr5yJYlWMao': {
    studio: 'Marvel Studios',
    titleMain: 'AVENGERS',
    titleSub: 'Infinity War',
    badges: [{ text:'13+', accent:true }, { text:'HD' }, { text:'IMAX' }],
    meta: '2018 · 2h 35m · Super Heroes, Action & Adventure',
    desc: 'The Avengers must be willing to sacrifice all to defeat Thanos.',
    start: 30, end: 55,
    phrase: "I thought by eliminating half of life the other half would thrive but you have shown me that is impossible.",
    speaker: 'Thanos',
    wordBank: ['ELIMINATING','HALF','THRIVE','SHOWN','IMPOSSIBLE'],
    breadcrumb: 'infinity war',
    scenes: [
      { tm:'ahora', line:'"I thought by eliminating…"', tag:'drama · villain' },
      { tm:'28:05', line:'"We\'re in the endgame now"', tag:'drama · monólogo' },
      { tm:'47:18', line:'"I am inevitable"', tag:'villano · iconic' }
    ]
  },
  'gqhoznbABFY': {
    studio: 'Warner Bros.',
    titleMain: 'THE DARK',
    titleSub: 'Knight',
    badges: [{ text:'PG-13', accent:true }, { text:'HD' }, { text:'IMAX' }],
    meta: '2008 · 2h 32m · Action, Crime, Drama',
    desc: 'Batman faces his greatest psychological test when the Joker emerges.',
    start: 15, end: 40,
    phrase: "Why so serious let us put a smile on that face you know why I use a knife.",
    speaker: 'The Joker',
    wordBank: ['SERIOUS','SMILE','KNIFE','CHAOS','PLANS'],
    breadcrumb: 'the dark knight',
    scenes: [
      { tm:'ahora', line:'"Why so serious?"', tag:'villano · iconic' },
      { tm:'35:20', line:'"Some men just want to watch…"', tag:'drama · monólogo' },
      { tm:'1:12:00', line:'"You complete me"', tag:'action · confrontation' }
    ]
  },
  '5PSNL1qE6VY': {
    studio: 'New Line Cinema',
    titleMain: 'LORD OF',
    titleSub: 'The Rings',
    badges: [{ text:'PG-13', accent:true }, { text:'HD' }],
    meta: '2001 · 3h 28m · Fantasy, Adventure',
    desc: 'A hobbit and his companions set out on a quest to destroy a powerful ring.',
    start: 20, end: 45,
    phrase: "My precious we wants it we needs it must have the precious they stole it from us.",
    speaker: 'Gollum',
    wordBank: ['PRECIOUS','STOLEN','RING','NEEDS','WANTS'],
    breadcrumb: 'lord of the rings',
    scenes: [
      { tm:'ahora', line:'"My precious…"', tag:'drama · iconic' },
      { tm:'45:00', line:'"You shall not pass!"', tag:'action · epic' },
      { tm:'1:30:00', line:'"Even the smallest person"', tag:'drama · inspirational' }
    ]
  },
  'm8e-FF8MsqU': {
    studio: 'Paramount Pictures',
    titleMain: 'FORREST',
    titleSub: 'Gump',
    badges: [{ text:'PG-13', accent:true }, { text:'HD' }],
    meta: '1994 · 2h 22m · Drama, Romance',
    desc: 'The presidencies of Kennedy and Johnson through the eyes of an Alabama man.',
    start: 10, end: 35,
    phrase: "Life is like a box of chocolates you never know what you are gonna get.",
    speaker: 'Forrest Gump',
    wordBank: ['LIFE','CHOCOLATES','NEVER','GONNA','GET'],
    breadcrumb: 'forrest gump',
    scenes: [
      { tm:'ahora', line:'"Life is like a box of chocolates"', tag:'drama · iconic' },
      { tm:'30:00', line:'"Run, Forrest, run!"', tag:'action · motivational' },
      { tm:'1:15:00', line:'"Jenny and me was like peas…"', tag:'romance · emotional' }
    ]
  }
};

// ── Carga dinámica desde Supabase (fallback al objeto hardcodeado) ──
var MOVIES = Object.assign({}, MOVIES_FALLBACK);


function _applyMovie(firstId) {
  if (!firstId) {
    hideAdOverlay();
    var phraseRow = document.getElementById('phraseRow');
    if (phraseRow) phraseRow.innerHTML = '<span style="color:rgba(255,255,255,.35);font-size:.9rem;letter-spacing:.06em;">🎬 Película en preparación — pronto disponible</span>';
    return;
  }
  _movieYtId     = firstId;
  _movieReady    = true;
  currentVideoId = firstId;
  var d = MOVIES[firstId] || {};
  currentStart  = d.start  || 0;
  currentEnd    = d.end    || 0;
  currentPhrase = d.phrase || '';
  // Overlay stays visible — cubre anuncios de YouTube hasta que usuario presione "Comenzar escena"
  _tryInitPlayer();
}

function _loadMovieFromJson() {
  var urlParams = new URLSearchParams(window.location.search);
  var movieSlug = urlParams.get('movie');
  if (!movieSlug) { window.location.href = 'movies.html'; return; }

  fetch('data/movies/' + movieSlug + '.json?_=' + Date.now())
    .then(function(r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(function(data) {
      var sceneList = data.scenes || [];
      sceneList.forEach(function(scene) {
        if (!scene.youtube_id) return;
        var dataUrl = null;
        var tj = scene.transcript_json;
        var tjStr = typeof tj === 'string' ? tj : JSON.stringify(tj || {});
        if (scene.has_karaoke && tjStr && tjStr !== '{}') {
          try { dataUrl = URL.createObjectURL(new Blob([tjStr], {type:'application/json'})); } catch(er) {}
        }
        // Si transcript_json está vacío pero hay karaoke_url apuntando a archivo externo
        if (scene.has_karaoke && !dataUrl && scene.karaoke_url) {
          dataUrl = scene.karaoke_url;
        }
        MOVIES[scene.youtube_id] = {
          _peliculaSlug: data.slug,
          studio:        data.studio     || '',
          titleMain:     data.titleMain  || '',
          titleSub:      data.titleSub   || '',
          badges:        data.badges     || [],
          meta:          data.meta       || '',
          desc:          data.desc       || '',
          start:         scene.start     || 0,
          end:           scene.end       || 0,
          phrase:        scene.phrase    || '',
          speaker:       scene.speaker   || '',
          wordBank:      scene.word_bank || [],
          breadcrumb:    (data.titleMain + ' ' + (data.titleSub || '')).toLowerCase().trim(),
          hasKaraoke:    !!(scene.has_karaoke && dataUrl),
          dataUrl:       dataUrl,
          portada_url:   scene.portada_url || data.portada_url || '',
          _orden:        sceneList.indexOf(scene) + 1,
          scenes: sceneList.map(function(s, si) {
            return {
              ytId:    s.youtube_id  || '',
              tm:      s.shelf_tm    || ('Escena ' + (si+1)),
              line:    s.shelf_line  || s.phrase || '',
              tag:     s.shelf_tag   || (s.speaker ? s.speaker : ''),
              portada: s.portada_url || ''
            };
          })
        };
      });
      var firstId = sceneList.length && sceneList[0].youtube_id ? sceneList[0].youtube_id : null;
      _applyMovie(firstId);
    })
    .catch(function() {
      // Fallback: buscar en MOVIES_FALLBACK por slug
      var urlParams2 = new URLSearchParams(window.location.search);
      var slug2 = urlParams2.get('movie');
      var found = null;
      for (var ytId in MOVIES_FALLBACK) {
        if (MOVIES_FALLBACK[ytId]._peliculaSlug === slug2) { found = ytId; break; }
      }
      _applyMovie(found);
    });
}

// Iniciar carga del JSON de la película
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _loadMovieFromJson);
} else {
  setTimeout(_loadMovieFromJson, 0);
}


// ════════════════════════════════════════════════════════════════════════
//  COLLOCATIONS GAME — Aura Languages
// ════════════════════════════════════════════════════════════════════════
//
//  difficulty: 'easy'  → traducción directa, mismo verbo/orden
//              'med'   → el verbo cambia (tomar→make, hacer→pay...)
//              'hard'  → estructura distinta (tener→be, gustar invertido)
//              'leg'   → idioms que no existen en español

const PHRASES = [
  {
    es: '"Tomé una decisión"',
    en: ['I','made','a','decision'],
    cat: 'make + noun', tag: 'make · noun',
    hint: 'usa <b>MAKE</b> no TAKE para una decisión',
    traps: ['took','have','the','an','decided','choice'],
    explanation: '<em>Take a decision</em> es calco del español. En inglés natural se dice <b>made a decision</b>. MAKE se usa para: decisions, money, mistakes, plans, effort.',
    difficulty: 'med'
  },
  {
    es: '"Hice mi tarea"',
    en: ['I','did','my','homework'],
    cat: 'do + noun', tag: 'do · noun',
    hint: 'usa <b>DO</b> no MAKE para tareas',
    traps: ['made','have','the','your','exercise','job'],
    explanation: 'En inglés se usa <b>do</b> para actividades y tareas (do homework, do the dishes), mientras que <b>make</b> es para crear o producir algo.',
    difficulty: 'easy'
  },
  {
    es: '"Por favor presta atención"',
    en: ['Please','pay','attention'],
    cat: 'pay + noun', tag: 'pay · noun',
    hint: 'la atención se <b>paga</b> no se da',
    traps: ['give','put','focus','listen','sir','your'],
    explanation: 'En inglés la atención se <b>paga</b>: <em>pay attention</em>. También: <em>pay a visit</em>, <em>pay a compliment</em>.',
    difficulty: 'med'
  },
  {
    es: '"Tengo mucha hambre"',
    en: ['I','am','very','hungry'],
    cat: 'be + adjective', tag: 'be · adj',
    hint: 'el hambre se <b>es</b> no se <b>tiene</b>',
    traps: ['have','much','hunger','many','feel','too'],
    explanation: 'En español "tenemos" hambre, sed, sueño, calor. En inglés son <b>be + adjective</b>: <em>I am hungry / thirsty / sleepy / hot</em>.',
    difficulty: 'hard'
  },
  {
    es: '"Ella rompió una promesa"',
    en: ['She','broke','a','promise'],
    cat: 'break + noun', tag: 'break · noun',
    hint: 'las promesas se <b>rompen</b> con BREAK',
    traps: ['cut','made','her','the','word','swear'],
    explanation: '<b>Break</b> se usa con promesas, reglas, corazones, récords y silencios. La correcta: <em>break a promise</em>.',
    difficulty: 'med'
  },
  {
    es: '"Él dio un discurso"',
    en: ['He','gave','a','speech'],
    cat: 'give + noun', tag: 'give · noun',
    hint: 'el discurso se <b>da</b> con GIVE',
    traps: ['made','did','the','his','presentation','talk'],
    explanation: 'En inglés <b>give a speech</b>, <em>give a presentation</em>, <em>give a hand</em>. Lo natural es <b>give</b>.',
    difficulty: 'med'
  },
  {
    es: '"Cometí un error"',
    en: ['I','made','a','mistake'],
    cat: 'make + noun', tag: 'make · noun',
    hint: 'los errores se <b>hacen</b> con MAKE',
    traps: ['did','took','the','an','fault','error'],
    explanation: '<em>Do a mistake</em> es uno de los errores más comunes de hispanohablantes. La forma correcta es siempre <b>make a mistake</b>.',
    difficulty: 'med'
  },
  {
    es: '"Tomé una ducha"',
    en: ['I','took','a','shower'],
    cat: 'take + noun', tag: 'take · noun',
    hint: 'la ducha se <b>toma</b> con TAKE',
    traps: ['had','made','the','my','bath','wash'],
    explanation: 'TAKE se usa con: shower, break, nap, look, photo. En inglés americano: <b>take a shower</b>.',
    difficulty: 'easy'
  },
  {
    es: '"Hago ejercicio todos los días"',
    en: ['I','do','exercise','every','day'],
    cat: 'do + noun', tag: 'do · noun',
    hint: 'el ejercicio se <b>do</b> no <b>make</b>',
    traps: ['make','take','some','an','sport','daily'],
    explanation: '<b>Do exercise</b>, <em>do sports</em>, <em>do yoga</em>. Las actividades físicas van con DO. <em>Make exercise</em> es incorrecto.',
    difficulty: 'easy'
  },
  {
    es: '"Estoy de acuerdo contigo"',
    en: ['I','agree','with','you'],
    cat: 'verb collocation', tag: 'verb',
    hint: '<b>agree</b> ya es el verbo, sin AM',
    traps: ['am','to','of','for','accord','your'],
    explanation: 'En inglés es solo <b>I agree</b> — agree YA es el verbo. Decir <em>I am agree</em> es un error muy común.',
    difficulty: 'hard'
  },
  {
    es: '"Te extraño"',
    en: ['I','miss','you'],
    cat: 'verb collocation', tag: 'verb',
    hint: 'existe el verbo <b>miss</b> exacto',
    traps: ['throw','of','less','to','feel','remember'],
    explanation: 'En inglés <b>miss</b> = extrañar / echar de menos. Ejemplos: <em>I miss my family</em>, <em>I miss home</em>.',
    difficulty: 'hard'
  },
  {
    es: '"Tienes razón"',
    en: ['You','are','right'],
    cat: 'be + adjective', tag: 'be · adj',
    hint: 'la razón se <b>es</b> no se <b>tiene</b>',
    traps: ['have','your','reason','correct','truth','got'],
    explanation: 'En español "tenemos" razón. En inglés <b>be right</b> / <b>be wrong</b>. <em>Have reason</em> es calco.',
    difficulty: 'hard'
  },
  {
    es: '"Voy a tomar un descanso"',
    en: ['I','will','take','a','break'],
    cat: 'take + noun', tag: 'take · noun',
    hint: 'el descanso se <b>toma</b> con TAKE',
    traps: ['have','make','rest','some','am','going'],
    explanation: '<b>Take a break</b> es la colocación natural. También: <em>take a nap</em>, <em>take a look</em>, <em>take a chance</em>.',
    difficulty: 'easy'
  },
  {
    es: '"Ellos hicieron un trato"',
    en: ['They','made','a','deal'],
    cat: 'make + noun', tag: 'make · noun',
    hint: 'los tratos se <b>hacen</b> con MAKE',
    traps: ['did','took','the','their','agreement','contract'],
    explanation: '<b>Make a deal</b>, <em>make an agreement</em>. MAKE se usa para acuerdos y compromisos.',
    difficulty: 'med'
  },
  {
    es: '"Tengo veinte años"',
    en: ['I','am','twenty','years','old'],
    cat: 'be + age', tag: 'be · age',
    hint: 'la edad se <b>es</b> no se <b>tiene</b>',
    traps: ['have',"twenty's",'old','year','of','age'],
    explanation: 'En español "tenemos" años. En inglés <b>be + número + years old</b>. <em>I have 20 years</em> es incorrecto.',
    difficulty: 'hard'
  }
];

// ── Carga frases desde Supabase (con fallback al array estático) ─────────────
async function loadCollocations() {
  try {
    var sb = window._aura && window._aura.sb;
    if (!sb) throw new Error('no sb');

    var res = await sb.from('collocation_phrases')
      .select('es,en,cat,tag,hint,traps,explanation,difficulty')
      .eq('activa', true)
      .order('id');
    if (!res.data || res.data.length === 0) throw new Error('no data');

    var poolRes = await sb.from('word_pools')
      .select('words')
      .eq('context', 'collocations/general')
      .maybeSingle();
    var generalPool = (poolRes.data && poolRes.data.words) ? poolRes.data.words : [];

    // Replace static array with Supabase data
    PHRASES.length = 0;
    res.data.forEach(function(row) {
      var phraseTraps = Array.isArray(row.traps) ? row.traps : [];
      var poolSample  = generalPool.length > 0
        ? shuffle(generalPool).slice(0, 12).map(function(w){ return w.toLowerCase(); })
        : [];
      var combined = phraseTraps.concat(
        poolSample.filter(function(w){ return !phraseTraps.includes(w); })
      );
      PHRASES.push({
        es:          row.es,
        en:          Array.isArray(row.en) ? row.en : row.en.split(' '),
        cat:         row.cat        || '',
        tag:         row.tag        || '',
        hint:        row.hint       || '',
        traps:       combined,
        explanation: row.explanation || '',
        difficulty:  row.difficulty  || 'med'
      });
    });
    console.log('[Collocations] Supabase: ' + PHRASES.length + ' frases cargadas');
  } catch(e) {
    console.warn('[Collocations] Supabase no disponible, usando fallback:', e.message);
  }
}

// ── Progress tracking ─────────────────────────────────────────────────────────
var _colSeenEs = [];  // frases vistas este ciclo (array de strings "es")

async function loadColProgress(difficulty) {
  _colSeenEs = [];
  try {
    var sb     = window._aura && window._aura.sb;
    var userId = window._aura && window._aura.userId;
    if (!sb || !userId) return;

    var { data } = await sb.from('col_progress')
      .select('seen_es, best_accuracy')
      .eq('user_id', userId)
      .eq('difficulty', difficulty)
      .maybeSingle();

    if (data) {
      _colSeenEs = data.seen_es || [];
      var recEl  = document.getElementById('col-diff-record');
      if (recEl && data.best_accuracy) recEl.textContent = data.best_accuracy + '%';
    }
  } catch(e) {
    console.warn('[ColProgress] load error:', e.message);
  }
}

async function markPhraseSeen(esText, difficulty) {
  try {
    if (!_colSeenEs.includes(esText)) _colSeenEs.push(esText);
    var sb     = window._aura && window._aura.sb;
    var userId = window._aura && window._aura.userId;
    if (!sb || !userId) return;
    await sb.from('col_progress').upsert(
      { user_id: userId, difficulty: difficulty, seen_es: _colSeenEs, last_played: new Date().toISOString() },
      { onConflict: 'user_id,difficulty' }
    );
  } catch(e) {
    console.warn('[ColProgress] mark error:', e.message);
  }
}

async function saveColAccuracy(difficulty, accuracy) {
  try {
    var sb     = window._aura && window._aura.sb;
    var userId = window._aura && window._aura.userId;
    if (!sb || !userId) return;
    var { data } = await sb.from('col_progress')
      .select('best_accuracy')
      .eq('user_id', userId)
      .eq('difficulty', difficulty)
      .maybeSingle();
    var best = data ? (data.best_accuracy || 0) : 0;
    if (accuracy > best) {
      await sb.from('col_progress').upsert(
        { user_id: userId, difficulty: difficulty, best_accuracy: accuracy },
        { onConflict: 'user_id,difficulty' }
      );
    }
  } catch(e) {
    console.warn('[ColProgress] accuracy error:', e.message);
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getPhrasesForDifficulty(difficulty) {
  return PHRASES.filter(function(p) { return p.difficulty === difficulty; });
}

function currentPhraseIdx() {
  if (GAME.order.length === 0) return 0;
  return GAME.order[GAME.orderPos];
}

// currentPhrase() — usa GAME.activePhrases (filtrado por difficulty)
function currentPhrase() {
  return (GAME.activePhrases || PHRASES)[currentPhraseIdx()];
}

function generateOrder() {
  var difficulty = GAME.difficulty || 'med';
  var allForDiff = getPhrasesForDifficulty(difficulty);

  if (allForDiff.length === 0) {
    GAME.activePhrases = PHRASES.slice(); // fallback: todas
  } else {
    var unseen = allForDiff.filter(function(p) {
      return !_colSeenEs.includes(p.es);
    });
    if (unseen.length === 0) {
      // Ciclo completo — reset y empezar de nuevo
      _colSeenEs = [];
      unseen = allForDiff;
    }
    GAME.activePhrases = unseen;
  }

  var indices = [];
  for (var i = 0; i < GAME.activePhrases.length; i++) indices.push(i);
  GAME.order    = shuffle(indices);
  GAME.orderPos = 0;
}

// ── DOM helpers ───────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
function setText(id, val) { var e = $(id); if (e) e.textContent = val; }

function showXpToast() {
  var bar = document.querySelector('.tb-xp-inline');
  if (!bar) return;
  var mult  = GAME.xpMultiplier || 1;
  var toast = document.createElement('div');
  toast.textContent = '+' + (10 * mult) + ' XP';
  toast.style.cssText = 'position:absolute;top:-26px;left:50%;transform:translateX(-50%);background:var(--accent);color:var(--accent-ink);font-family:var(--mono);font-size:11px;font-weight:800;padding:4px 10px;border-radius:8px;box-shadow:0 4px 14px rgba(196,255,61,.5);pointer-events:none;z-index:10;animation:xpToast 1.6s ease-out forwards';
  bar.style.position = 'relative';
  bar.appendChild(toast);
  setTimeout(function() { toast.remove(); }, 1700);
}

function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

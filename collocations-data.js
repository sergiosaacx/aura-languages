// ════════════════════════════════════════════════════════════════════════
//  COLLOCATIONS GAME — Aura Languages
// ════════════════════════════════════════════════════════════════════════
//
//  Reglas:
//   • Cada palabra CORRECTA seleccionada del banco = +10 puntos del juego.
//   • Cada palabra INCORRECTA = se pinta en rojo, resta energía y rompe combo.
//   • Cuando se completan todos los huecos correctos se habilita "Siguiente".
//   • Cada 100 puntos del juego = +10 XP en Supabase (vía _aura.saveScore).
//   • La barra superior muestra los puntos esta ronda, récord y barra de XP.
//   • El bloque inferior derecho muestra la explicación de la colocación.
//
const PHRASES = [
  {
    es: '"Tomé una decisión"',
    en: ['I','made','a','decision'],
    cat: 'make + noun',
    tag: 'make · noun',
    hint: 'usa <b>MAKE</b> no TAKE para una decisión',
    traps: ['took','have','the','an','decided','choice'],
    explanation: '<em>Take a decision</em> es calco del español. En inglés natural se dice <b>made a decision</b>. MAKE se usa para: decisions, money, mistakes, plans, effort.'
  },
  {
    es: '"Hice mi tarea"',
    en: ['I','did','my','homework'],
    cat: 'do + noun',
    tag: 'do · noun',
    hint: 'usa <b>DO</b> no MAKE para tareas',
    traps: ['made','have','the','your','exercise','job'],
    explanation: 'En inglés se usa <b>do</b> para actividades y tareas (do homework, do the dishes), mientras que <b>make</b> es para crear o producir algo. <em>Make homework</em> no existe.'
  },
  {
    es: '"Por favor presta atención"',
    en: ['Please','pay','attention'],
    cat: 'pay + noun',
    tag: 'pay · noun',
    hint: 'la atención se <b>paga</b> no se da',
    traps: ['give','put','focus','listen','sir','your'],
    explanation: 'En inglés la atención se <b>paga</b>: <em>pay attention</em>. También: <em>pay a visit</em>, <em>pay a compliment</em>. Decimos "prestar" pero el verbo correcto es <b>pay</b>.'
  },
  {
    es: '"Tengo mucha hambre"',
    en: ['I','am','very','hungry'],
    cat: 'be + adjective',
    tag: 'be · adj',
    hint: 'el hambre se <b>es</b> no se <b>tiene</b>',
    traps: ['have','much','hunger','many','feel','too'],
    explanation: 'En español "tenemos" hambre, sed, sueño, calor. En inglés son <b>be + adjective</b>: <em>I am hungry / thirsty / sleepy / hot</em>. Decir <em>I have hunger</em> suena mal.'
  },
  {
    es: '"Ella rompió una promesa"',
    en: ['She','broke','a','promise'],
    cat: 'break + noun',
    tag: 'break · noun',
    hint: 'las promesas se <b>rompen</b> con BREAK',
    traps: ['cut','made','her','the','word','swear'],
    explanation: '<b>Break</b> se usa con promesas, reglas, corazones, récords y silencios. <em>Cut a promise</em> no existe. La correcta: <em>break a promise</em>.'
  },
  {
    es: '"Él dio un discurso"',
    en: ['He','gave','a','speech'],
    cat: 'give + noun',
    tag: 'give · noun',
    hint: 'el discurso se <b>da</b> con GIVE',
    traps: ['made','did','the','his','presentation','talk'],
    explanation: 'En inglés <b>give a speech</b>, <em>give a presentation</em>, <em>give a hand</em>. <em>Make a speech</em> existe en contextos formales pero lo natural es <b>give</b>.'
  },
  {
    es: '"Cometí un error"',
    en: ['I','made','a','mistake'],
    cat: 'make + noun',
    tag: 'make · noun',
    hint: 'los errores se <b>hacen</b> con MAKE',
    traps: ['did','took','the','an','fault','error'],
    explanation: '<em>Do a mistake</em> es uno de los errores más comunes de hispanohablantes. La forma correcta es siempre <b>make a mistake</b>. MAKE también va con: decision, plan, effort.'
  },
  {
    es: '"Tomé una ducha"',
    en: ['I','took','a','shower'],
    cat: 'take + noun',
    tag: 'take · noun',
    hint: 'la ducha se <b>toma</b> con TAKE',
    traps: ['had','made','the','my','bath','wash'],
    explanation: 'En inglés americano: <b>take a shower</b>. En británico también se dice <em>have a shower</em>. TAKE se usa con: shower, break, nap, look, photo.'
  },
  {
    es: '"Hago ejercicio todos los días"',
    en: ['I','do','exercise','every','day'],
    cat: 'do + noun',
    tag: 'do · noun',
    hint: 'el ejercicio se <b>do</b> no <b>make</b>',
    traps: ['make','take','some','an','sport','daily'],
    explanation: '<b>Do exercise</b>, <em>do sports</em>, <em>do yoga</em>. Las actividades físicas y deportes recreativos van con DO. <em>Make exercise</em> es incorrecto.'
  },
  {
    es: '"Estoy de acuerdo contigo"',
    en: ['I','agree','with','you'],
    cat: 'verb collocation',
    tag: 'verb',
    hint: '<b>agree</b> ya es el verbo, sin AM',
    traps: ['am','to','of','for','accord','your'],
    explanation: 'En español decimos "estoy de acuerdo" (verbo SER + adjetivo). En inglés es solo <b>I agree</b> — agree YA es el verbo. Decir <em>I am agree</em> es un error muy común.'
  },
  {
    es: '"Te extraño"',
    en: ['I','miss','you'],
    cat: 'verb collocation',
    tag: 'verb',
    hint: 'existe el verbo <b>miss</b> exacto',
    traps: ['throw','of','less','to','feel','remember'],
    explanation: 'En inglés <b>miss</b> = extrañar / echar de menos. <em>Throw of less</em> es traducción literal sin sentido. Ejemplos: <em>I miss my family</em>, <em>I miss home</em>.'
  },
  {
    es: '"Tienes razón"',
    en: ['You','are','right'],
    cat: 'be + adjective',
    tag: 'be · adj',
    hint: 'la razón se <b>es</b> no se <b>tiene</b>',
    traps: ['have','your','reason','correct','truth','got'],
    explanation: 'En español "tenemos" razón. En inglés <b>be right</b> / <b>be wrong</b>. <em>Have reason</em> es calco. También: <em>You are wrong!</em>'
  },
  {
    es: '"Voy a tomar un descanso"',
    en: ['I','will','take','a','break'],
    cat: 'take + noun',
    tag: 'take · noun',
    hint: 'el descanso se <b>toma</b> con TAKE',
    traps: ['have','make','rest','some','am','going'],
    explanation: '<b>Take a break</b> es la colocación natural. TAKE también: <em>take a nap</em>, <em>take a look</em>, <em>take a photo</em>, <em>take a chance</em>.'
  },
  {
    es: '"Ellos hicieron un trato"',
    en: ['They','made','a','deal'],
    cat: 'make + noun',
    tag: 'make · noun',
    hint: 'los tratos se <b>hacen</b> con MAKE',
    traps: ['did','took','the','their','agreement','contract'],
    explanation: '<b>Make a deal</b>, <em>make an agreement</em>, <em>make a promise</em>. MAKE se usa para acuerdos verbales y compromisos.'
  },
  {
    es: '"Tengo veinte años"',
    en: ['I','am','twenty','years','old'],
    cat: 'be + age',
    tag: 'be · age',
    hint: 'la edad se <b>es</b> no se <b>tiene</b>',
    traps: ['have',"twenty's",'old','year','of','age'],
    explanation: 'En español "tenemos" años. En inglés <b>be + número + years old</b>. <em>I have 20 years</em> es uno de los errores más típicos. La frase corta también funciona: <em>I am 20</em>.'
  }
];

function currentPhraseIdx() {
  if (GAME.order.length === 0) return 0;
  return GAME.order[GAME.orderPos];
}

function generateOrder() {
  // Crea un array [0,1,...,N-1] y lo baraja
  var indices = [];
  for (var i = 0; i < PHRASES.length; i++) indices.push(i);
  GAME.order = shuffle(indices);
  GAME.orderPos = 0;
}

// ── DOM helpers ────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

function setText(id, val) { var e = $(id); if (e) e.textContent = val; }


// ── Toast "+10 XP" cuando se otorga XP ─────────────────────────────────────
function showXpToast() {
  var bar = document.querySelector('.tb-xp-inline');
  if (!bar) return;
  var toast = document.createElement('div');
  toast.textContent = '+10 XP';
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


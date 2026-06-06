// ── Constantes ────────────────────────────────────────────────
var EDGE_URL = 'https://vceuxruenbepzflopkbw.supabase.co/functions/v1/teacher-chat';

var SYSTEM_PROMPT = "You are \"Aura\", a warm and expert English teacher on the Aura Languages learning platform. Your students are primarily Spanish speakers learning English.\n\nTeaching style:\n- Encouraging, patient and motivating\n- Keep responses concise: 2-4 sentences normally, expand only when explaining concepts\n- For grammar/spelling mistakes, always use the correction widget — never write corrections as plain text\n- Mix teaching with natural, engaging conversation\n- Respect the language mix percentage defined below — that controls how much Spanish vs English to use\n- Celebrate progress: \"That was perfect!\", \"Excellent sentence!\"\n- Adapt to their level: simpler language for beginners, richer vocabulary for advanced learners\n\nFocus areas: grammar, vocabulary, writing, speaking practice, pronunciation tips.\n\nKeep responses friendly and educational. Always end with a question or prompt to keep the conversation flowing.";

var _history  = [];
var _thinking = false;

var _CX_LEVELS = [
  { name:'Bronce',     es:80, en:20  },
  { name:'Plata',      es:55, en:45  },
  { name:'Oro',        es:30, en:70  },
  { name:'Platino',    es:10, en:90  },
  { name:'Diamante',   es:2,  en:98  },
  { name:'Challenger', es:0,  en:100 }
];
var _CX_AUTO_POS = 0;
var _CX_LEVEL    = 0;
var _MODE        = 'libre';
var _RP_SCENARIO = null;
var _TX_ENABLED  = true;
var _TX_CACHE    = {};
var _WI = '\n\nCRITICAL OVERRIDE: ALL grammar or spelling corrections MUST use the [[W]] correction widget below. NEVER write corrections in plain text. This overrides all other instructions.\n\nINTERACTIVE WIDGETS — embed these JSON markers in your responses when appropriate:\n'
  + 'Correction (ALWAYS use this, never correct inline): [[W:{"type":"corr","wrong":"their exact mistake","right":"correct version with **key word** in double asterisks","tip":"brief grammar rule"}]]\n'
  + 'Multiple choice drill: [[W:{"type":"mc","q":"question","opts":["A","B","C","D"],"ans":0,"exp":"explanation"}]] (ans=index of correct)\n'
  + 'Fill in blank: [[W:{"type":"fill","sentence":"She ___ to school and ___ her friends.","blanks":["went","met"],"hint":"past tense"}]]\n'
  + 'Vocabulary match: [[W:{"type":"match","pairs":[["word","meaning"],["word","meaning"],["word","meaning"]]}]]\n'
  + 'Word order: [[W:{"type":"order","words":["word1","word2","word3","word4"],"hint":"grammar tip"}]]\n'
  + 'Self-assessment (after any exercise): [[W:{"type":"rate","q":"How confident did you feel?"}]]\n'
  + 'Rules: use corr widget every time there is a mistake; use one exercise widget every 3-4 exchanges; keep surrounding text brief.';
var _RP_SCENARIOS = [
  { key:'restaurant', icon:'🍽', name:'Restaurante',  desc:'Pedir comida en inglés',   char:'a waiter',             setting:'an English restaurant' },
  { key:'interview',  icon:'💼', name:'Entrevista',   desc:'Entrevista de trabajo',         char:'a recruiter',          setting:'a job interview at an English company' },
  { key:'airport',    icon:'✈',     name:'Aeropuerto',   desc:'Check-in internacional',        char:'a check-in agent',     setting:'an international airport' },
  { key:'hotel',      icon:'🏨', name:'Hotel',        desc:'Hacer un check-in',             char:'a hotel receptionist', setting:'a hotel front desk' },
  { key:'shopping',   icon:'🛍', name:'Tienda',       desc:'Comprar en una tienda',         char:'a store assistant',    setting:'a clothing store in New York' },
  { key:'doctor',     icon:'🏥', name:'Médico',  desc:'Consulta médica en inglés', char:'a doctor',      setting:'a medical consultation' },
  { key:'coffee',     icon:'☕',     name:'Café',    desc:'Conversación casual',      char:'a friendly barista',   setting:'a coffee shop' },
  { key:'support',    icon:'📞', name:'Soporte',      desc:'Atención al cliente',      char:'a customer service rep', setting:'a phone support call' }
];

var _TOPICS = [
  { key:'travel',      icon:'✈️',  name:'Viajes',           desc:'Lugares, destinos, aventuras'   },
  { key:'sports',      icon:'⚽',  name:'Deportes',         desc:'Fútbol, fitness, competencias'  },
  { key:'business',    icon:'💼',  name:'Negocios',         desc:'Emprendimiento, trabajo, finanzas' },
  { key:'tech',        icon:'💻',  name:'Tecnología',       desc:'Apps, gadgets, tendencias'      },
  { key:'movies',      icon:'🎬',  name:'Películas & Series', desc:'Cine, streaming, reseñas'     },
  { key:'music',       icon:'🎵',  name:'Música',           desc:'Géneros, artistas, conciertos'  },
  { key:'food',        icon:'🍜',  name:'Comida',           desc:'Recetas, restaurantes, culturas'},
  { key:'culture',     icon:'🌍',  name:'Cultura',          desc:'Arte, historia, sociedad'       }
];

// ── Helpers ───────────────────────────────────────────────────
function _fmtTime(d) {
  d = d || new Date();
  var h = d.getHours(), m = String(d.getMinutes()).padStart(2,'0');
  return h + ':' + m + (h >= 12 ? ' p.m.' : ' a.m.');
}
function _fmtDate(d) {
  d = d || new Date();
  var days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  var months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return days[d.getDay()] + ' ' + d.getDate() + ' de ' + months[d.getMonth()];
}
function _scrollBottom() { var e = document.getElementById('messages'); e.scrollTop = e.scrollHeight; }

// ── Idioma → bandera ──────────────────────────────────────────
var _LANG_META = {
  en: { flag: 'us', code: 'EN', name: 'Inglés',    sub: 'AI · ENGLISH'  },
  fr: { flag: 'fr', code: 'FR', name: 'Français',  sub: 'AI · FRANÇAIS'  },
  it: { flag: 'it', code: 'IT', name: 'Italiano',  sub: 'AI · ITALIANO'  },
  es: { flag: 'es', code: 'ES', name: 'Español',   sub: 'AI · ESPAÑOL'   },
  pt: { flag: 'br', code: 'PT', name: 'Português', sub: 'AI · PORTUGUÊS' }
};

// ── XP thresholds por nivel ───────────────────────────────────
function _xpForLevel(nivel) {
  if (nivel <= 20)  return 1200;
  if (nivel <= 40)  return 2000;
  if (nivel <= 55)  return 3000;
  if (nivel <= 70)  return 5000;
  if (nivel <= 85)  return 8000;
  return 12000;
}
function _xpForNextLevel(nivel, xpTotal) {
  var perLv = _xpForLevel(nivel);
  // XP acumulado hasta inicio del nivel actual (suma de todos los anteriores)
  var acc = 0;
  for (var i = 1; i < nivel; i++) acc += _xpForLevel(i);
  var inLevel = xpTotal - acc;
  var pct = Math.min(100, Math.round((inLevel / perLv) * 100));
  var remaining = perLv - inLevel;
  return { pct: pct, remaining: remaining > 0 ? remaining : 0, perLv: perLv };
}

// ── Tiempo relativo ───────────────────────────────────────────
function _relTime(isoStr) {
  if (!isoStr) return '—';
  var diff = Math.floor((Date.now() - new Date(isoStr).getTime()) / 1000);
  if (diff < 60)   return 'hace un momento';
  if (diff < 3600) return 'hace ' + Math.floor(diff/60) + 'm';
  if (diff < 86400) return 'hace ' + Math.floor(diff/3600) + 'h';
  return 'hace ' + Math.floor(diff/86400) + 'd';
}

// ── Timeline de rangos ────────────────────────────────────────
var _TL_RANKS  = ['Bronce','Plata','Oro','Platino','Diamante','Challenger'];
var _TL_PCT    = [8, 27, 46, 64, 82, 100];
var _TL_PULSE  = ['', 'ps-silver','ps-gold','ps-plat','ps-diam','ps-chall'];

function _updateTimeline(rango) {
  var idx = _TL_RANKS.indexOf(rango);
  if (idx < 0) idx = 0;
  var fill = document.getElementById('tl-fill');
  if (fill) fill.style.width = _TL_PCT[idx] + '%';
  for (var i = 0; i < 6; i++) {
    var node = document.getElementById('tl-n' + i);
    if (!node) continue;
    node.className = 'tl-node';
    if (i < idx)       node.classList.add('unlocked');
    else if (i === idx) {
      node.classList.add('current');
      if (_TL_PULSE[idx]) node.classList.add(_TL_PULSE[idx]);
    } else             node.classList.add('locked');
  }
}

// ── Cargar stats del panel ────────────────────────────────────
async function _loadStats() {
  var lang = localStorage.getItem('aura_lang') || 'en';
  var meta = _LANG_META[lang] || _LANG_META.en;

  document.getElementById('sp-flag').src = 'https://flagcdn.com/w40/' + meta.flag + '.png';
  document.getElementById('sp-lang-sub').textContent  = meta.sub;

  // _aura.profile ya fue cargado por aura-supabase.js desde profiles
  var p = _aura.profile;
  if (!p) return;

  document.getElementById('sp-nivel').textContent = p.nivel || '1';
  document.getElementById('sp-rango').textContent = p.rango || 'Bronce';
  document.getElementById('sp-racha').textContent = p.streak_actual || '0';
  document.getElementById('sp-ap').textContent    = (p.aura_points || 0).toLocaleString();
  document.getElementById('sp-pm').textContent    = p.merit_pm || '0';

  _updateTimeline(p.rango || 'Bronce');

  var xp   = p.xp    || 0;
  var niv  = p.nivel || 1;
  var info = _xpForNextLevel(niv, xp);
  document.getElementById('sp-xp-val').textContent = xp.toLocaleString() + ' XP';
  document.getElementById('sp-xp-bar').style.width = info.pct + '%';
  document.getElementById('sp-xp-sub').textContent = info.remaining.toLocaleString() + ' XP para nivel ' + (niv + 1);


  // session_history — sesiones de esta semana + última sesión + habilidad top
  try {
    var monday = new Date();
    monday.setHours(0,0,0,0);
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));

    var shRes = await _aura.sb
      .from('session_history')
      .select('played_at, skill')
      .eq('user_id', _aura.userId)
      .order('played_at', { ascending: false })
      .limit(100);

    if (shRes.data && shRes.data.length > 0) {
      var all    = shRes.data;
      var thisWk = all.filter(function(s){ return new Date(s.played_at) >= monday; });




      var counts = {};
      all.forEach(function(s){ if(s.skill){ counts[s.skill] = (counts[s.skill]||0)+1; } });
      var topSkill = Object.keys(counts).sort(function(a,b){ return counts[b]-counts[a]; })[0];

    } else {



    }
  } catch(e) {
    console.warn('[Aura Stats]', e);
  }

  _initComplexitySlider(p.rango || 'Bronce');
}

// ── Complexity slider ─────────────────────────────────────────
function _initComplexitySlider(rango) {
  var pos = _CX_LEVELS.findIndex(function(l){ return l.name === rango; });
  if (pos < 0) pos = 0;
  _CX_AUTO_POS = pos;
  _CX_LEVEL    = pos;
  var slider = document.getElementById('cx-slider');
  if (!slider) return;
  slider.value = pos;
  _updateCxDisplay(pos, true);
  slider.addEventListener('input', function() {
    var v = parseInt(this.value);
    _CX_LEVEL = v;
    _updateCxDisplay(v, v === _CX_AUTO_POS);
  });
}
function _updateCxDisplay(pos, isAuto) {
  var l = _CX_LEVELS[pos];
  document.getElementById('cx-bar-es').style.width  = l.es + '%';
  document.getElementById('cx-bar-en').style.width  = l.en + '%';
  document.getElementById('cx-mix-text').textContent = l.es + '% ES · ' + l.en + '% EN';
  document.getElementById('cx-auto-badge').style.display = isAuto ? '' : 'none';
}
function _buildSystemPrompt() {
  var l = _CX_LEVELS[_CX_LEVEL] || _CX_LEVELS[0];
  var mix = l.en === 100
    ? 'STRICT RULE: respond only in English, zero Spanish.'
    : 'STRICT RULE: use exactly ' + l.en + '% English and ' + l.es + '% Spanish per response. This is mandatory and overrides everything.';
  var p = _aura && _aura.profile;
  var studentInfo = p
    ? '\n\nStudent info — name: "' + (p.nombre || p.full_name || 'Student') + '", level: ' + (p.nivel || 1) + ', rank: ' + (p.rango || 'Bronce') + '. Use their first name occasionally to keep it personal and warm.'
    : '';
  if (_MODE === 'roleplay' && _RP_SCENARIO) {
    var s = _RP_SCENARIO;
    return 'You are Aura, playing the role of ' + s.char + ' in ' + s.setting + ' for an English learning role-play.\n'
      + 'Rules: stay in character; keep replies concise (2-4 sentences); for corrections use the [[W:{type:corr}]] widget (see below). If no mistakes, skip.\n\n' + mix + studentInfo + _WI;
  }
  if (_MODE === 'stats') {
    return 'You are Aura, an expert English learning coach. Your student shared their learning data. '
      + 'Give a warm, personalized progress analysis: what is going well, 2-3 areas to improve, one concrete tip for this week. '
      + 'Be specific with their numbers. Conversational tone, not a formal report.\n\n' + mix + studentInfo;
  }
  return SYSTEM_PROMPT + '\n\n' + mix + studentInfo + _WI;
}

// ── Modos del Teacher ─────────────────────────────────────────────
function _startChat(mode) {
  document.getElementById('mode-picker').style.display = 'none';
  document.getElementById('messages').style.display = 'flex';
  document.getElementById('chat-input-wrap').style.display = 'flex';
  document.getElementById('msg-input').disabled = false;
  document.getElementById('send-btn').disabled = false;
  _setMode(mode);
}

function _clearChat() {
  _history = [];
  var c = document.getElementById('messages');
  c.innerHTML = '<div class="msg-date" id="chat-date-label">' + _fmtDate() + '</div>';
}

function _setMode(mode) {
  _MODE = mode; _RP_SCENARIO = null;
  ['libre','roleplay','stats'].forEach(function(m) {
    var el = document.getElementById('mode-' + m);
    if (!el) return;
    if (m === mode) el.classList.add('mode-active');
    else            el.classList.remove('mode-active');
  });
  var lbl = document.getElementById('ch-mode-label');
  var labels = { libre:'Tema Libre', roleplay:'Role-Play', stats:'Mis estadísticas' };
  if (lbl) lbl.textContent = labels[mode] || 'Tema Libre';
  _clearChat(); _thinking = false;
  document.getElementById('send-btn').disabled = false;
  if (mode === 'libre') {
    _showTopicPicker();
  } else if (mode === 'roleplay') {
    _showScenarioPicker();
  } else if (mode === 'stats') {
    _loadStatsChat();
  }
}


function _startTopic(key) {
  var s = _TOPICS.find(function(x){ return x.key === key; });
  if (!s) return;
  _clearChat();
  _addMsg('recv', s.icon + ' ' + s.name);
  _sendAutoMsg('The student wants to have a conversation in English about: ' + s.name + '. Start with one engaging open question about that topic. Keep it natural and conversational — 1-2 sentences max.');
}

function _showTopicPicker() {
  var c = document.getElementById('messages');
  var w = document.createElement('div'); w.className = 'msg-wrapper recv';
  var pill = document.createElement('div'); pill.className = 'ai-pill'; pill.textContent = '✶ Aura AI'; w.appendChild(pill);
  var b = document.createElement('div'); b.className = 'msg-bubble';
  var grid = _TOPICS.map(function(s) {
    return '<div class="scenario-card" onclick="_startTopic(\'' + s.key + '\')">'
      + '<span class="sc-icon">' + s.icon + '</span>'
      + '<div class="sc-name">' + s.name + '</div>'
      + '<div class="sc-desc">' + s.desc + '</div></div>';
  }).join('');
  b.innerHTML = 'Hello! 👋 ¿Sobre qué quieres conversar hoy?<div class="scenario-grid">' + grid + '</div>'
    + '<div style="margin-top:10px;font-size:9px;color:var(--muted);text-align:center">O escribe cualquier tema directamente abajo ↓</div>';
  w.appendChild(b);
  var t = document.createElement('div'); t.className = 'msg-time'; t.textContent = _fmtTime(); w.appendChild(t);
  c.appendChild(w); _scrollBottom();
}

function _showScenarioPicker() {
  var c = document.getElementById('messages');
  var w = document.createElement('div'); w.className = 'msg-wrapper recv';
  var pill = document.createElement('div'); pill.className = 'ai-pill'; pill.textContent = '✶ Aura AI'; w.appendChild(pill);
  var b = document.createElement('div'); b.className = 'msg-bubble';
  var grid = _RP_SCENARIOS.map(function(s) {
    return '<div class="scenario-card" onclick="_startRoleplay(\'' + s.key + '\')">'
      + '<span class="sc-icon">' + s.icon + '</span>'
      + '<div class="sc-name">' + s.name + '</div>'
      + '<div class="sc-desc">' + s.desc + '</div></div>';
  }).join('');
  b.innerHTML = '\U0001f3ad Choose a scenario:<div class="scenario-grid">' + grid + '</div>';
  w.appendChild(b);
  var t = document.createElement('div'); t.className = 'msg-time'; t.textContent = _fmtTime(); w.appendChild(t);
  c.appendChild(w); _scrollBottom();
}

function _startRoleplay(key) {
  var s = _RP_SCENARIOS.find(function(x){ return x.key === key; });
  if (!s) return;
  _RP_SCENARIO = s; _clearChat();
  _addMsg('recv', '\U0001f3ad Role-Play: ' + s.name + '\nYou\'re the student, I\'ll play ' + s.char + '.\nI\'ll note any corrections at the end of each turn. Let\'s go!');
  _sendAutoMsg('You are ' + s.char + ' at ' + s.setting + '. Open the scene with one short natural sentence directed at the customer.');
}

async function _sendAutoMsg(prompt) {
  if (_thinking) return;
  var sd = await _aura.sb.auth.getSession();
  var token = sd && sd.data && sd.data.session && sd.data.session.access_token;
  if (!token) return;
  _thinking = true; document.getElementById('send-btn').disabled = true; _showTyping();
  try {
    var res = await fetch(EDGE_URL, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: prompt }], system: _buildSystemPrompt() })
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    var data = await res.json();
    var reply = (data.choices&&data.choices[0]&&data.choices[0].message&&data.choices[0].message.content)
              ||(data.content&&data.content[0]&&data.content[0].text)||data.reply||'...';
    _history.push({ role: 'assistant', content: reply });
    _hideTyping(); _addMsg('recv', reply);
  } catch(e) { _hideTyping(); console.error('[AutoMsg]', e); }
  _thinking = false; document.getElementById('send-btn').disabled = false;
}

async function _loadStatsChat() {
  _addMsg('recv', 'Analizando tu progreso... ✨');
  var ctx = await _buildStatsContext();
  var msgs = document.getElementById('messages');
  var rws = msgs.querySelectorAll('.msg-wrapper.recv');
  if (rws.length) rws[rws.length - 1].remove();
  if (!ctx) { _addMsg('recv', 'No pude cargar tus estadísticas. Intenta de nuevo.'); return; }
  var sd = await _aura.sb.auth.getSession();
  var token = sd && sd.data && sd.data.session && sd.data.session.access_token;
  if (!token) return;
  _thinking = true; document.getElementById('send-btn').disabled = true; _showTyping();
  try {
    var userMsg = 'Here is my learning data. Give me a personalized progress analysis:\n\n' + ctx;
    var res = await fetch(EDGE_URL, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: userMsg }], system: _buildSystemPrompt() })
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    var data = await res.json();
    var reply = (data.choices&&data.choices[0]&&data.choices[0].message&&data.choices[0].message.content)
              ||(data.content&&data.content[0]&&data.content[0].text)||data.reply||'...';
    _history.push({ role: 'user', content: userMsg }, { role: 'assistant', content: reply });
    _hideTyping(); _addMsg('recv', reply);
  } catch(e) { _hideTyping(); _addMsg('recv', 'Error al cargar el análisis. Intenta de nuevo.'); console.error(e); }
  _thinking = false; document.getElementById('send-btn').disabled = false;
}

async function _buildStatsContext() {
  try {
    var p = _aura.profile; if (!p) return null;
    var ctx = '## Student Progress\n';
    ctx += '- Level: ' + (p.nivel||1) + '\n';
    ctx += '- Rank: ' + (p.rango||'Bronce') + '\n';
    ctx += '- XP: ' + (p.xp||0).toLocaleString() + '\n';
    ctx += '- Streak: ' + (p.streak_actual||0) + ' days\n';
    ctx += '- AuraPoints: ' + (p.aura_points||0).toLocaleString() + '\n';
    ctx += '- Merit Points: ' + (p.merit_pm||0) + '\n';
    ctx += '- Total lessons: ' + (p.lecciones_completadas||0) + '\n\n';
    var shRes = await _aura.sb.from('session_history')
      .select('tool,skill,xp_earned,accuracy,played_at').eq('user_id', _aura.userId)
      .order('played_at', { ascending: false }).limit(50);
    if (shRes.data && shRes.data.length > 0) {
      var sessions = shRes.data, skills = {}, tools = {}, totAcc = 0, accN = 0;
      sessions.forEach(function(s) {
        if (s.skill) skills[s.skill] = (skills[s.skill]||0)+1;
        if (s.tool)  tools[s.tool]  = (tools[s.tool]||0)+1;
        if (s.accuracy) { totAcc += s.accuracy; accN++; }
      });
      ctx += '## Activity (' + sessions.length + ' sessions)\n';
      ctx += '- Skills: ' + Object.entries(skills).sort(function(a,b){return b[1]-a[1];}).map(function(e){return e[0]+' ('+e[1]+'x)';}).join(', ') + '\n';
      ctx += '- Tools: ' + Object.entries(tools).sort(function(a,b){return b[1]-a[1];}).map(function(e){return e[0]+' ('+e[1]+'x)';}).join(', ') + '\n';
      if (accN > 0) ctx += '- Avg accuracy: ' + Math.round(totAcc/accN) + '%\n';
      ctx += '- Last session: ' + _relTime(sessions[0].played_at) + '\n\n';
    }
    var exRes = await _aura.sb.from('exam_attempts')
      .select('rank,language,status,total_score,finished_at').eq('user_id', _aura.userId)
      .order('finished_at', { ascending: false }).limit(5);
    if (exRes.data && exRes.data.length > 0) {
      ctx += '## Exams\n';
      exRes.data.forEach(function(e){ ctx += '- ' + e.rank + ' (' + e.language + '): ' + e.status + ', score ' + (e.total_score||0).toFixed(1) + '\n'; });
    }
    return ctx;
  } catch(e) { console.warn('[StatsCtx]', e); return null; }
}

// ── Init ──────────────────────────────────────────────────────
(function _init() {
  var now = new Date();
  document.getElementById('chat-date-label').textContent = _fmtDate(now);
  document.getElementById('welcome-time').textContent    = _fmtTime(now);

  // Esperar a que aura-supabase.js esté listo, luego checkAuth → loadProfile → loadStats
  var _sbTicks = 0;
  var _sbWait = setInterval(function() {
    if (typeof _aura === 'undefined' || !_aura.sb) {
      if (++_sbTicks < 80) return;
      clearInterval(_sbWait);
      document.getElementById('api-notice').style.display = 'flex';
      document.getElementById('msg-input').disabled = true;
      document.getElementById('send-btn').disabled  = true;
      return;
    }
    clearInterval(_sbWait);
    _aura.checkAuth().then(function(user) {
      if (!user) {
        document.getElementById('api-notice').style.display = 'flex';
        document.getElementById('msg-input').disabled = true;
        document.getElementById('send-btn').disabled  = true;
        return;
      }
      _aura.loadProfile(user.id).then(function() {
        _loadStats();
      });
    });
  }, 100);

  var inp = document.getElementById('msg-input');
  inp.addEventListener('input', function() { this.style.height='auto'; this.style.height=Math.min(this.scrollHeight,120)+'px'; });
  inp.addEventListener('keydown', function(e) { if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); _sendMessage(); } });
})();

// ── DOM helpers ───────────────────────────────────────────────
function _addMsg(side, text) {
  var c = document.getElementById('messages');
  var w = document.createElement('div'); w.className = 'msg-wrapper ' + side;
  if (side === 'recv') {
    var p = document.createElement('div'); p.className = 'ai-pill'; p.textContent = '❆ Aura AI'; w.appendChild(p);
  }
  var b = document.createElement('div'); b.className = 'msg-bubble';
  if (side === 'recv') { _buildMsgContent(b, text); _attachTranslation(b, text); }
  else { b.innerHTML = text.replace(/\n/g,'<br>'); }
  w.appendChild(b);
  var t = document.createElement('div'); t.className = 'msg-time';
  t.textContent = _fmtTime() + (side==='sent' ? ' ✓✓' : '');
  w.appendChild(t);
  c.appendChild(w); _scrollBottom(); return w;
}

// ── Traducción al hover ────────────────────────────────────────────────
function _attachTranslation(bubble, rawText) {
  var tooltip = document.createElement('div');
  tooltip.className = 'tx-tooltip';
  tooltip.innerHTML = '<div class="tx-flag-lbl">🇪🇸 ESPAÑOL</div><div class="tx-body">...</div>';
  bubble.appendChild(tooltip);
  var fetching = false;
  bubble.addEventListener('mouseenter', function() {
    if (!_TX_ENABLED) return;
    tooltip.classList.add('show');
    var clean = rawText.replace(/\[\[W:[\s\S]*?\]\]/g,'').replace(/<[^>]+>/g, '').replace(/\n/g, ' ').trim();
    if (_TX_CACHE[clean]) { tooltip.querySelector('.tx-body').textContent = _TX_CACHE[clean]; return; }
    if (fetching) return;
    fetching = true;
    tooltip.querySelector('.tx-body').textContent = 'Traduciendo...';
    _aura.sb.auth.getSession().then(function(sd) {
      var tk = sd && sd.data && sd.data.session && sd.data.session.access_token;
      if (!tk) { tooltip.querySelector('.tx-body').textContent = '—'; fetching = false; return; }
      fetch(EDGE_URL, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: clean }],
          system: 'Translate the following text to natural Spanish. Return ONLY the translation, no explanations, no quotes.' })
      }).then(function(r){ return r.json(); }).then(function(data) {
        var tr = (data.choices&&data.choices[0]&&data.choices[0].message&&data.choices[0].message.content)
               ||(data.content&&data.content[0]&&data.content[0].text)||data.reply||'—';
        _TX_CACHE[clean] = tr;
        tooltip.querySelector('.tx-body').textContent = tr;
        fetching = false;
      }).catch(function(){ tooltip.querySelector('.tx-body').textContent = '—'; fetching = false; });
    });
  });
  bubble.addEventListener('mouseleave', function() { tooltip.classList.remove('show'); });
}
function _toggleTranslation(el) { _TX_ENABLED = el.checked; }

function _showTyping() {
  var c = document.getElementById('messages');
  var w = document.createElement('div'); w.className='msg-wrapper recv'; w.id='_typing';
  var p = document.createElement('div'); p.className='ai-pill'; p.textContent='✦ Aura AI'; w.appendChild(p);
  var d = document.createElement('div'); d.className='typing-dots';
  d.innerHTML='<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
  w.appendChild(d); c.appendChild(w); _scrollBottom();
}
function _hideTyping() { var e=document.getElementById('_typing'); if(e) e.remove(); }

// ── Enviar mensaje ────────────────────────────────────────────
async function _sendMessage() {
  var inp  = document.getElementById('msg-input');
  var text = inp.value.trim();
  if (!text || _thinking) return;

  var sessionData = await _aura.sb.auth.getSession();
  var token = sessionData?.data?.session?.access_token;
  if (!token) {
    document.getElementById('api-notice').style.display = 'flex';
    _addMsg('recv', "You need to be logged into Aura to chat with me. Please sign in and come back! 🔐");
    inp.value = ''; return;
  }

  _addMsg('sent', text);
  _history.push({ role: 'user', content: text });
  inp.value = ''; inp.style.height = 'auto';
  _thinking = true;
  document.getElementById('send-btn').disabled = true;
  _showTyping();

  try {
    var res = await fetch(EDGE_URL, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages: _history, system: _buildSystemPrompt() })
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    var data = await res.json();
    var reply = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content)
      || (data.content && data.content[0] && data.content[0].text)
      || data.reply || '...';
    _history.push({ role: 'assistant', content: reply });
    _hideTyping();
    _addMsg('recv', reply);
  } catch(e) {
    _hideTyping();
    _addMsg('recv', 'Oops, something went wrong. Please try again in a moment.');
    console.error('[Teacher]', e);
  }
  _thinking = false;
  document.getElementById('send-btn').disabled = false;
}

// ── Widget system ─────────────────────────────────────────────────────────

function _esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function _buildMsgContent(container, text) {
  var re = /\[\[W:([\s\S]*?)\]\]/g;
  var parts = []; var last = 0; var m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({t:'text', v: text.slice(last, m.index)});
    try { parts.push({t:'widget', v: JSON.parse(m[1])}); } catch(e) {}
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({t:'text', v: text.slice(last)});
  parts.forEach(function(p) {
    if (p.t === 'text') {
      var s = p.v.trim();
      if (s) { var d = document.createElement('div'); d.innerHTML = s.replace(/\n/g,'<br>'); container.appendChild(d); }
    } else {
      var w = _renderWidget(p.v);
      if (w) container.appendChild(w);
    }
  });
}

function _renderWidget(d) {
  switch(d.type) {
    case 'corr':  return _wCorr(d);
    case 'mc':    return _wMC(d);
    case 'fill':  return _wFill(d);
    case 'match': return _wMatch(d);
    case 'order': return _wOrder(d);
    case 'rate':  return _wRate(d);
  }
  return null;
}

function _wCorr(d) {
  var rightHtml = _esc(d.right || '').replace(/\*\*([^*]+)\*\*/g, '<em>$1</em>');
  var el = document.createElement('div'); el.className = 'corr-banner';
  el.innerHTML = '<div class="corr-bar"></div>'
    + '<div class="corr-body">'
    + '<span class="corr-tag">✒ Correction</span>'
    + (d.wrong ? '<div class="corr-wrong">' + _esc(d.wrong) + '</div>' : '')
    + '<div class="corr-right">' + rightHtml + '</div>'
    + (d.tip   ? '<div class="corr-tip">' + _esc(d.tip) + '</div>' : '')
    + '</div>';
  return el;
}

function _wMC(d) {
  var el = document.createElement('div'); el.className = 'w-wrap';
  var html = '<div class="mc-q">' + _esc(d.q || '') + '</div><div class="mc-opts">';
  (d.opts || []).forEach(function(opt, i) {
    html += '<button class="mc-opt" data-i="' + i + '">' + _esc(opt) + '</button>';
  });
  html += '</div>';
  if (d.exp) html += '<div class="mc-exp">' + _esc(d.exp) + '</div>';
  el.innerHTML = html;
  var opts_wrap = el.querySelector('.mc-opts');
  var correct = +(d.ans || 0);
  opts_wrap.addEventListener('click', function(e) {
    var btn = e.target.closest('.mc-opt');
    if (!btn || btn.disabled) return;
    var chosen = +btn.dataset.i;
    opts_wrap.querySelectorAll('.mc-opt').forEach(function(b, i) {
      b.disabled = true;
      if (i === correct) b.classList.add('wc');
      else if (b === btn && chosen !== correct) b.classList.add('wx');
    });
    var exp = el.querySelector('.mc-exp');
    if (exp) exp.style.display = 'block';
  });
  return el;
}

function _wFill(d) {
  var parts = (d.sentence || '').split('___');
  var blanks = d.blanks || [];
  var el = document.createElement('div'); el.className = 'w-wrap';
  var html = '<div class="fill-s">';
  parts.forEach(function(part, i) {
    html += _esc(part);
    if (i < parts.length - 1) {
      html += '<input class="fill-in" data-ans="' + _esc((blanks[i]||'').toLowerCase()) + '" placeholder="...">';
    }
  });
  html += '</div>';
  if (d.hint) html += '<div class="w-hint">💡 ' + _esc(d.hint) + '</div>';
  html += '<button class="w-btn">Check →</button><div class="w-fb"></div>';
  el.innerHTML = html;
  el.querySelector('.w-btn').addEventListener('click', function() {
    var inputs = el.querySelectorAll('.fill-in');
    var all = true;
    inputs.forEach(function(inp) {
      inp.disabled = true; inp.classList.remove('wc','wx');
      if (inp.value.trim().toLowerCase() === inp.dataset.ans) inp.classList.add('wc');
      else { inp.classList.add('wx'); inp.value = inp.dataset.ans; all = false; }
    });
    var fb = el.querySelector('.w-fb'); fb.style.display = 'block';
    fb.className = 'w-fb ' + (all ? 'ok' : 'err');
    fb.textContent = all ? '✓ Perfect!' : 'Check the highlighted blanks — correct answers shown.';
    this.style.display = 'none';
  });
  return el;
}

function _wMatch(d) {
  var pairs = d.pairs || [];
  var rights = pairs.map(function(p,i){ return {t:p[1],i:i}; }).sort(function(){ return Math.random()-.5; });
  var el = document.createElement('div'); el.className = 'w-wrap';
  var html = '<div class="match-grid">';
  pairs.forEach(function(p,i) {
    html += '<div class="mi ml" data-i="' + i + '">' + _esc(p[0]) + '</div>';
    html += '<div class="mi mr" data-i="' + rights[i].i + '">' + _esc(rights[i].t) + '</div>';
  });
  html += '</div><div class="w-fb"></div>';
  el.innerHTML = html;
  var grid = el.querySelector('.match-grid');
  grid.addEventListener('click', function(e) {
    var item = e.target.closest('.mi');
    if (!item || item.classList.contains('done')) return;
    var sel = grid.querySelector('.mi.sel');
    if (!sel) { item.classList.add('sel'); return; }
    if (sel === item) { item.classList.remove('sel'); return; }
    var sameCol = (sel.classList.contains('ml') === item.classList.contains('ml'));
    if (sameCol) { sel.classList.remove('sel'); item.classList.add('sel'); return; }
    sel.classList.remove('sel');
    if (sel.dataset.i === item.dataset.i) {
      sel.classList.add('done'); item.classList.add('done');
      if (grid.querySelectorAll('.mi.done').length === grid.querySelectorAll('.mi').length) {
        var fb = grid.nextElementSibling; fb.style.display = 'block';
        fb.className = 'w-fb ok'; fb.textContent = '✓ All matched! Great work.';
      }
    } else {
      sel.classList.add('bad'); item.classList.add('bad');
      setTimeout(function(){ sel.classList.remove('bad'); item.classList.remove('bad'); }, 600);
    }
  });
  return el;
}

function _wOrder(d) {
  var words = (d.words || []).slice().sort(function(){ return Math.random()-.5; });
  var correct = (d.words || []).join(' ');
  var el = document.createElement('div'); el.className = 'w-wrap';
  var html = '<div class="order-pool">';
  words.forEach(function(w) {
    html += '<div class="oc" data-w="' + _esc(w) + '">' + _esc(w) + '</div>';
  });
  html += '</div>';
  html += '<div class="order-tray">Tap words to build the sentence…</div>';
  if (d.hint) html += '<div class="w-hint">💡 ' + _esc(d.hint) + '</div>';
  html += '<div style="display:flex;gap:6px;margin-top:8px">';
  html += '<button class="w-btn">Check →</button>';
  html += '<button class="w-btn dim">Reset</button>';
  html += '</div><div class="w-fb"></div>';
  el.innerHTML = html;
  var pool = el.querySelector('.order-pool');
  var tray = el.querySelector('.order-tray');
  var btns = el.querySelectorAll('.w-btn');
  pool.addEventListener('click', function(e) {
    var chip = e.target.closest('.oc');
    if (!chip || chip.classList.contains('used')) return;
    chip.classList.add('used');
    if (tray.textContent.includes('…')) tray.innerHTML = '';
    var placed = document.createElement('span'); placed.className = 'op';
    placed.dataset.w = chip.dataset.w; placed.textContent = chip.dataset.w;
    placed.addEventListener('click', function() {
      chip.classList.remove('used'); placed.remove();
      if (!tray.children.length) tray.textContent = 'Tap words to build the sentence…';
    });
    tray.appendChild(placed);
  });
  btns[0].addEventListener('click', function() {
    var result = Array.from(tray.querySelectorAll('.op')).map(function(p){ return p.dataset.w; }).join(' ');
    var fb = el.querySelector('.w-fb'); fb.style.display = 'block';
    if (result.toLowerCase() === correct.toLowerCase()) {
      fb.className = 'w-fb ok'; fb.textContent = '✓ Perfect sentence!'; btns[0].style.display = 'none';
    } else { fb.className = 'w-fb err'; fb.textContent = 'Not quite — try rearranging!'; }
  });
  btns[1].addEventListener('click', function() {
    pool.querySelectorAll('.oc').forEach(function(c){ c.classList.remove('used'); });
    tray.innerHTML = ''; tray.textContent = 'Tap words to build the sentence…';
    el.querySelector('.w-fb').style.display = 'none';
  });
  return el;
}

function _wRate(d) {
  var el = document.createElement('div'); el.className = 'w-wrap';
  var html = '<div class="rate-q">' + _esc(d.q || 'How confident did you feel?') + '</div>';
  html += '<div class="rate-row">';
  for (var i = 1; i <= 5; i++) html += '<span class="rst" data-v="' + i + '">★</span>';
  html += '</div>';
  el.innerHTML = html;
  var row = el.querySelector('.rate-row');
  var locked = false;
  row.addEventListener('mouseover', function(e) {
    if (locked) return;
    var s = e.target.closest('.rst'); if (!s) return;
    var v = +s.dataset.v;
    row.querySelectorAll('.rst').forEach(function(x){ x.classList.toggle('on', +x.dataset.v <= v); });
  });
  row.addEventListener('mouseout', function(e) {
    if (locked || (e.relatedTarget && row.contains(e.relatedTarget))) return;
    row.querySelectorAll('.rst').forEach(function(x){ x.classList.remove('on'); });
  });
  row.addEventListener('click', function(e) {
    if (locked) return;
    var s = e.target.closest('.rst'); if (!s) return;
    locked = true;
    var v = +s.dataset.v;
    row.querySelectorAll('.rst').forEach(function(x){ x.classList.toggle('on', +x.dataset.v <= v); x.style.cursor='default'; });
  });
  return el;
}
